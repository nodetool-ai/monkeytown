# Deployment Specification

**Production deployment architecture and procedures**

**Version:** 1.0
**Date:** 2026-01-18
**Architect:** ChaosArchitect

---

## Overview

This document specifies the production deployment architecture for Monkeytown, including infrastructure requirements, deployment procedures, and operational guidelines.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION ARCHITECTURE                              │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                           AWS REGION                                   │ │
│  │                                                                       │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐ │ │
│  │  │                         VPC (10.0.0.0/16)                        │ │ │
│  │  │                                                                 │ │ │
│  │  │  ┌───────────────────────────────────────────────────────────┐ │ │ │
│  │  │  │                   PUBLIC SUBNETS                           │ │ │ │
│  │  │  │  ┌─────────────────────────────────────────────────────┐  │ │ │ │
│  │  │  │  │           Application Load Balancer (ALB)            │  │ │ │ │
│  │  │  │  │  HTTPS:443 → HTTP:80 → Web:3000, Game:3001, WS:8080  │  │ │ │ │
│  │  │  │  └─────────────────────────────────────────────────────┘  │ │ │ │
│  │  │  └───────────────────────────────────────────────────────────┘ │ │ │
│  │  │                                                                 │ │ │
│  │  │  ┌───────────────────────────────────────────────────────────┐ │ │ │
│  │  │  │                  PRIVATE SUBNETS (a, b)                    │ │ │ │
│  │  │  │                                                           │ │ │ │
│  │  │  │  ┌───────────────┐  ┌───────────────┐                    │ │ │ │
│  │  │  │  │  ECS Cluster  │  │  ECS Cluster  │                    │ │ │ │
│  │  │  │  │  (Web)        │  │  (Game Srv)   │                    │ │ │ │
│  │  │  │  │  FARGATE      │  │  FARGATE      │                    │ │ │ │
│  │  │  │  └───────────────┘  └───────────────┘                    │ │ │ │
│  │  │  └───────────────────────────────────────────────────────────┘ │ │ │
│  │  │                                                                 │ │ │
│  │  │  ┌───────────────────────────────────────────────────────────┐ │ │ │
│  │  │  │                   DATABASE SUBNETS                         │ │ │ │
│  │  │  │  ┌───────────────┐  ┌───────────────┐                    │ │ │ │
│  │  │  │  │     RDS       │  │  ElastiCache  │                    │ │ │ │
│  │  │  │  │  PostgreSQL   │  │    Redis      │                    │ │ │ │
│  │  │  │  │  Multi-AZ     │  │   Cluster     │                    │ │ │ │
│  │  │  │  └───────────────┘  └───────────────┘                    │ │ │ │
│  │  │  └───────────────────────────────────────────────────────────┘ │ │ │
│  │  │                                                                 │ │ │
│  │  └─────────────────────────────────────────────────────────────────┘ │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## AWS Resources

### VPC Configuration

```hcl
# infrastructure/terraform/vpc.tf
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "monkeytown-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["${var.aws_region}a", "${var.aws_region}b", "${var.aws_region}c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]
  database_subnets = ["10.0.201.0/24", "10.0.202.0/24", "10.0.203.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = false
  enable_dns_hostnames   = true
  enable_dns_support     = true

  tags = {
    Name        = "monkeytown-vpc"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
```

### ECS Cluster

```hcl
# infrastructure/terraform/ecs.tf
module "ecs" {
  source  = "terraform-aws-modules/ecs/aws"
  version = "~> 5.0"

  cluster_name = "monkeytown-${var.environment}"

  cluster_settings = {
    name  = "containerInsights"
    value = "enabled"
  }

  fargate_capacity_providers = {
    FARGATE = {
      default = true
    }
  }

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
```

### RDS PostgreSQL

```hcl
module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 6.0"

  identifier = "monkeytown-${var.environment}"

  engine               = "postgres"
  engine_version       = "15.4"
  family               = "postgres15"
  major_engine_version = "15"

  instance_class    = var.rds_instance_class
  allocated_storage = 20
  storage_encrypted = true

  db_name  = "monkeytown"
  username = var.rds_username
  password = var.rds_password
  port     = 5432

  vpc_security_group_ids = [module.security_group.rds_sg_id]
  db_subnet_group_name   = module.vpc.database_subnet_group_name

  backup_retention_period = var.environment == "production" ? 7 : 1

  monitoring_interval = 30
  monitoring_role_arn = aws_iam_role.rds_monitoring.arn

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
```

### ElastiCache Redis

```hcl
module "redis" {
  source  = "terraform-aws-modules/elasticache/aws"
  version = "~> 1.0"

  cluster_id           = "monkeytown-${var.environment}"
  engine               = "redis"
  node_type            = var.redis_node_type
  number_of_replicas   = var.environment == "production" ? 2 : 0
  parameter_group_name = "default.redis7"
  engine_version       = "7.0"
  port                 = 6379

  subnet_group_name  = module.vpc.database_subnet_group_name
  security_group_ids = [module.security_group.redis_sg_id]

  auto_minor_version_upgrade = true

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
```

### Application Load Balancer

```hcl
module "alb" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 9.0"

  name = "monkeytown-${var.environment}"

  load_balancer_type = "application"
  vpc_id             = module.vpc.vpc_id
  subnets            = module.vpc.public_subnets
  security_groups    = [module.security_group.alb_sg_id]

  http_tcp_listeners = [
    {
      port        = 80
      protocol    = "HTTP"
      action_type = "redirect"
      redirect = {
        port        = "443"
        protocol    = "HTTPS"
        status_code = "HTTP_301"
      }
    },
    {
      port        = 443
      protocol    = "HTTPS"
      action_type = "forward"
      target_group_key = "web"
    }
  ]

  target_groups = {
    web = {
      name_prefix      = "web-"
      backend_protocol = "HTTP"
      backend_port     = 3000
      target_type      = "ip"
      health_check = {
        path                = "/health/live"
        healthy_threshold   = 2
        unhealthy_threshold = 10
        timeout             = 30
        interval            = 60
      }
    }
  }

  tags = {
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
```

---

## ECS Task Definitions

### Web Service

```json
{
  "family": "monkeytown-web",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/monkeytown-web:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "NEXT_PUBLIC_API_URL",
          "value": "https://api.monkeytown.example.com"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:monkeytown/db-url"
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health/live"],
        "interval": 60,
        "timeout": 30,
        "retries": 3,
        "startPeriod": 60
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/monkeytown-web",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### Game Server Service

```json
{
  "family": "monkeytown-server",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "1024",
  "memory": "2048",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "game-server",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/monkeytown-server:latest",
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3001,
          "protocol": "tcp"
        },
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        },
        {
          "name": "REDIS_URL",
          "value": "redis://monkeytown-redis.xxxxx.cache.amazonaws.com:6379"
        },
        {
          "name": "DATABASE_URL",
          "value": "postgres://monkeytown:xxxxx@monkeytown-db.xxxxx RDS.amazonaws.com:5432/monkeytown"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:monkeytown/db-password"
        },
        {
          "name": "JWT_SECRET",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:monkeytown/jwt-secret"
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3001/health/live"],
        "interval": 30,
        "timeout": 10,
        "retries": 3,
        "startPeriod": 60
      },
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/monkeytown-server",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

---

## Deployment Procedures

### Initial Deployment

```bash
# 1. Initialize Terraform
cd infrastructure/terraform
terraform init

# 2. Plan deployment
terraform plan -var="environment=production"

# 3. Apply infrastructure
terraform apply -var="environment=production"

# 4. Build and push Docker images
export AWS_REGION=us-east-1
aws ecr get-login-password | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

docker build -t monkeytown-web:latest ./web
docker tag monkeytown-web:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/monkeytown-web:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/monkeytown-web:latest

docker build -t monkeytown-server:latest ./server
docker tag monkeytown-server:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/monkeytown-server:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/monkeytown-server:latest

# 5. Register task definitions
aws ecs register-task-definition --cli-input-json file://task-definitions/web.json
aws ecs register-task-definition --cli-input-json file://task-definitions/server.json

# 6. Create ECS services
aws ecs create-service \
  --cluster monkeytown-production \
  --service-name monkeytown-web \
  --task-definition monkeytown-web \
  --desired-count 2 \
  --launch-type FARGATE \
  --deployment-configuration "maximumPercent=200,minimumHealthyPercent=100" \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=DISABLED}"

aws ecs create-service \
  --cluster monkeytown-production \
  --service-name monkeytown-server \
  --task-definition monkeytown-server \
  --desired-count 2 \
  --launch-type FARGATE \
  --deployment-configuration "maximumPercent=200,minimumHealthyPercent=100" \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx],assignPublicIp=DISABLED}"
```

### Blue/Green Deployment

```bash
# 1. Register new task definition version
aws ecs register-task-definition \
  --cli-input-json file://task-definitions/web-v2.json

# 2. Update service (automatically does blue/green)
aws ecs update-service \
  --cluster monkeytown-production \
  --service monkeytown-web \
  --task-definition monkeytown-web:latest

# 3. Monitor deployment
aws ecs wait services-stable \
  --cluster monkeytown-production \
  --services monkeytown-web

# 4. Verify health
curl -f https://api.monkeytown.example.com/health/live

# 5. If issues, rollback
aws ecs update-service \
  --cluster monkeytown-production \
  --service monkeytown-web \
  --task-definition monkeytown-web:previous-version
```

### Rollback Procedure

```bash
# Option 1: Use previous task definition
PREVIOUS_TASK=$(aws ecs describe-task-definition \
  --task-definition monkeytown-web \
  --query 'taskDefinition.taskDefinitionArn' \
  --output text)

aws ecs update-service \
  --cluster monkeytown-production \
  --service monkeytown-web \
  --task-definition $PREVIOUS_TASK

# Option 2: Scale down new version
aws ecs update-service \
  --cluster monkeytown-production \
  --service monkeytown-web \
  --desired-count 0
```

---

## Monitoring & Alerting

### CloudWatch Dashboards

```yaml
# CloudFormation template for dashboard
Resources:
  Dashboard:
    Type: AWS::CloudWatch::Dashboard
    Properties:
      DashboardName: monkeytown-production
      DashboardBody: |
        {
          "widgets": [
            {
              "type": "metric",
              "x": 0, "y": 0,
              "width": 12, "height": 6,
              "properties": {
                "title": "Request Count",
                "metrics": [
                  ["AWS/ApplicationELB", "RequestCount", "LoadBalancer", "app/monkeytown/xxx", {"label": "Requests"}]
                ],
                "period": 300,
                "stat": "Sum",
                "region": "us-east-1"
              }
            },
            {
              "type": "metric",
              "x": 12, "y": 0,
              "width": 12, "height": 6,
              "properties": {
                "title": "Latency P95",
                "metrics": [
                  ["AWS/ApplicationELB", "TargetResponseTime", "LoadBalancer", "app/monkeytown/xxx", {"label": "Latency"}]
                ],
                "period": 300,
                "stat": "p95",
                "region": "us-east-1"
              }
            }
          ]
        }
```

### Alarms

```yaml
# High Error Rate Alarm
Resources:
  HighErrorRateAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: monkeytown-high-error-rate
      MetricName: HTTPCode_ELB_5XX
      Namespace: AWS/ApplicationELB
      Dimensions:
        - Name: LoadBalancer
          Value: app/monkeytown/xxx
      Statistic: Sum
      Period: 300
      EvaluationPeriods: 2
      Threshold: 100
      ComparisonOperator: GreaterThanThreshold
      AlarmActions:
        - !Ref AlertTopic
      InsufficientDataActions:
        - !Ref AlertTopic

  # High Latency Alarm
  HighLatencyAlarm:
    Type: AWS::CloudWatch::Alarm
    Properties:
      AlarmName: monkeytown-high-latency
      MetricName: TargetResponseTime
      Namespace: AWS/ApplicationELB
      Dimensions:
        - Name: LoadBalancer
          Value: app/monkeytown/xxx
      Statistic: p95
      Period: 300
      EvaluationPeriods: 2
      Threshold: 2
      ComparisonOperator: GreaterThanThreshold
      AlarmActions:
        - !Ref AlertTopic
```

---

## Security Configuration

### Security Groups

```hcl
# ALB Security Group
resource "aws_security_group" "alb" {
  name        = "monkeytown-alb"
  description = "Security group for ALB"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }

  tags = {
    Name        = "monkeytown-alb"
    Environment = var.environment
  }
}

# ECS Security Group
resource "aws_security_group" "ecs" {
  name        = "monkeytown-ecs"
  description = "Security group for ECS tasks"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port       = 3000
    to_port         = 3000
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  ingress {
    from_port       = 3001
    to_port         = 3001
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "monkeytown-ecs"
    Environment = var.environment
  }
}
```

### IAM Roles

```hcl
# ECS Task Execution Role
resource "aws_iam_role" "ecs_task_execution" {
  name = "monkeytown-ecs-task-execution"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}
```

---

## Cost Optimization

### Development Environment

- Single RDS instance (db.t3.micro)
- Single Redis node (cache.t3.micro)
- No NAT gateway (public IPs for tasks)
- 2 ECS tasks per service

### Production Environment

- Multi-AZ RDS with automated backups (db.t3.medium)
- Redis with replication (cache.m5.large, 2 replicas)
- NAT gateway for private egress
- 4 ECS tasks per service
- Consider reserved instances for cost savings

---

## References

- Terraform configs: `infrastructure/terraform/`
- Docker configs: `deploy/docker/`
- CI/CD: `.github/workflows/ci-cd.yml`
- Architecture: `.monkeytown/architecture/system-design.md`

---

*Version: 1.0*
*Last updated: 2026-01-18*
*ChaosArchitect - Deploying with confidence*
