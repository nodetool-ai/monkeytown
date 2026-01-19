# Deployment Specification v2.2

**Production deployment architecture and procedures**

**Version:** 2.2
**Date:** 2026-01-19
**Architect:** ChaosArchitect

---

## Overview

This document specifies the deployment architecture for Monkeytown, including local development (Docker Compose) and production (AWS ECS with Terraform).

## Architecture Principles

- **Docker Compose Only**: No Kubernetes per requirements
- **Development**: Local Docker Compose environment
- **Production**: AWS ECS Fargate with Terraform

---

## Docker Compose (Local Development)

### Complete Configuration

```yaml
services:
  web:
    build:
      context: .
      dockerfile: deploy/docker/Dockerfile.web
    container_name: monkeytown-web
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - VITE_API_URL=http://localhost:8080
      - VITE_WS_URL=ws://localhost:8080
    volumes:
      - ./web:/app/web
      - /app/web/node_modules
    depends_on:
      redis:
        condition: service_healthy
    networks:
      - monkeytown

  game-server:
    build:
      context: .
      dockerfile: deploy/docker/Dockerfile.server
    container_name: monkeytown-game-server
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - REDIS_URL=redis://redis:6379
      - DATABASE_URL=postgres://monkeytown:dev@postgres:5432/monkeytown
      - EVENT_STREAM_URL=ws://event-stream:8080
    volumes:
      - ./server:/app/server
      - /app/server/node_modules
      - ./packages/shared:/app/packages/shared
    depends_on:
      redis:
        condition: service_healthy
      postgres:
        condition: service_healthy
    networks:
      - monkeytown

  event-stream:
    build:
      context: .
      dockerfile: deploy/docker/Dockerfile.server
    container_name: monkeytown-event-stream
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=development
      - REDIS_URL=redis://redis:6379
    volumes:
      - ./server:/app/server
      - /app/server/node_modules
      - ./packages/shared:/app/packages/shared
    depends_on:
      redis:
        condition: service_healthy
    networks:
      - monkeytown

  redis:
    image: redis:7-alpine
    container_name: monkeytown-redis
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5
    networks:
      - monkeytown

  postgres:
    image: postgres:15-alpine
    container_name: monkeytown-postgres
    environment:
      - POSTGRES_USER=monkeytown
      - POSTGRES_PASSWORD=dev
      - POSTGRES_DB=monkeytown
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U monkeytown -d monkeytown"]
      interval: 5s
      timeout: 5s
      retries: 5
    networks:
      - monkeytown

  nginx:
    image: nginx:alpine
    container_name: monkeytown-nginx
    ports:
      - "80:80"
    volumes:
      - ./deploy/docker/nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      web:
        condition: service_started
      game-server:
        condition: service_started
      event-stream:
        condition: service_started
    networks:
      - monkeytown

  redis-commander:
    image: rediscommander/redis-commander:latest
    container_name: monkeytown-redis-commander
    ports:
      - "8082:8081"
    environment:
      - REDIS_HOSTS=local:redis:6379
    depends_on:
      redis:
        condition: service_healthy
    networks:
      - monkeytown

networks:
  monkeytown:
    driver: bridge

volumes:
  redis-data:
  postgres-data:
```

### Service Ports

| Service | Container Port | Host Port | Protocol |
|---------|---------------|-----------|----------|
| web | 3000 | 3000 | HTTP |
| game-server | 3001 | 3001 | HTTP |
| event-stream | 8080 | 8080 | WebSocket |
| redis | 6379 | 6379 | TCP |
| postgres | 5432 | 5432 | TCP |
| nginx | 80 | 80 | HTTP |
| redis-commander | 8081 | 8082 | HTTP |

### Health Checks

```yaml
# Redis health check
redis:
  healthcheck:
    test: ["CMD", "redis-cli", "ping"]
    interval: 5s
    timeout: 3s
    retries: 5

# PostgreSQL health check
postgres:
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U monkeytown -d monkeytown"]
    interval: 5s
    timeout: 5s
    retries: 5
```

---

## Dockerfiles

### Dockerfile.web (Multi-stage)

```dockerfile
# syntax=docker/dockerfile:1

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY web/package*.json ./web/
COPY server/package*.json ./server/
COPY packages/shared/package*.json ./packages/shared/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the web application
RUN npm run build --prefix web

# Production stage - Frontend
FROM node:20-alpine AS frontend

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/web ./
COPY --from=builder /app/node_modules ./node_modules

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
```

### Dockerfile.server (Multi-stage)

```dockerfile
# syntax=docker/dockerfile:1

# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY packages/shared/package*.json ./packages/shared/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the server
RUN npm run build --prefix server

# Production stage - Server
FROM node:20-alpine AS server

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package*.json ./

# Install production dependencies only
RUN npm install --omit=dev

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["node", "dist/index.js"]
```

### Nginx Configuration

```nginx
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    sendfile on;
    keepalive_timeout 65;

    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml application/json application/javascript application/xml;

    upstream frontend {
        server web:3000;
    }

    upstream game_server {
        least_conn;
        server game-server:3001;
    }

    upstream event_stream {
        server event-stream:8080;
    }

    server {
        listen 80;
        server_name localhost;

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }

        # Frontend static assets
        location /_next/static {
            alias /app/.next/static;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Static assets
        location /static {
            alias /app/public;
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Frontend fallback
        location / {
            proxy_pass http://frontend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # Game REST API
        location /api/ {
            proxy_pass http://game_server;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # WebSocket upgrade for event stream
        location /ws {
            proxy_pass http://event_stream;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_read_timeout 86400;
            proxy_send_timeout 86400;
        }
    }
}
```

---

## AWS Infrastructure (Terraform)

### Architecture Overview

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

### Terraform Configuration (`infrastructure/terraform/main.tf`)

```terraform
terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "monkeytown-tf-state"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "monkeytown-tf-locks"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "monkeytown"
      Environment = var.environment
      ManagedBy   = "terraform"
    }
  }
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "monkeytown-vpc"
  cidr = "10.0.0.0/16"

  azs             = slice(var.availability_zones, 0, 2)
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = var.environment == "production"
  enable_dns_hostnames   = true
  enable_dns_support     = true

  tags = {
    Name = "monkeytown-vpc"
  }
}

module "ecs_cluster" {
  source  = "terraform-aws-modules/ecs/aws"
  version = "~> 5.0"

  cluster_name = "monkeytown-cluster"

  cluster_configuration = {
    execute_command_configuration = {
      logging = "OVERRIDE"
      log_configuration = {
        cloud_watch_log_group_name = "/ecs/monkeytown"
      }
    }
  }

  default_capacity_provider_strategy = {
    capacity_provider = "FARGATE"
    base              = 1
    weight            = 100
  }

  tags = {
    Name = "monkeytown-ecs-cluster"
  }
}

module "redis" {
  source  = "terraform-aws-modules/elasticache/aws"
  version = "~> 7.0"

  cluster_id                  = "monkeytown-redis"
  engine                      = "redis"
  node_type                   = var.redis_node_type
  num_cache_nodes             = var.environment == "production" ? 2 : 1
  parameter_group_name        = "default.redis7"
  engine_version              = "7.0"
  subnet_group_name           = module.vpc.redis_subnet_group_name
  security_group_ids          = [module.vpc.security_group_ids["redis"]]
  automatic_failover_enabled  = var.environment == "production"
  auto_minor_version_upgrade  = true

  tags = {
    Name = "monkeytown-redis"
  }
}

module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 6.0"

  identifier = "monkeytown-postgres"

  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = var.rds_instance_class
  db_name              = "monkeytown"
  username             = var.rds_username
  password             = var.rds_password
  port                 = 5432

  vpc_security_group_ids = [module.vpc.security_group_ids["rds"]]
  subnet_ids          = module.vpc.private_subnets

  db_subnet_group_name   = module.vpc.database_subnet_group_name
  skip_final_snapshot    = var.environment != "production"
  deletion_protection    = var.environment == "production"

  backup_retention_period = var.environment == "production" ? 7 : 1
  monitoring_interval     = 60
  monitoring_role_arn     = aws_iam_role.rds_monitoring.arn

  tags = {
    Name = "monkeytown-postgres"
  }
}

module "alb" {
  source  = "terraform-aws-modules/alb/aws"
  version = "~> 9.0"

  name = "monkeytown-alb"

  load_balancer_type = "application"
  vpc_id             = module.vpc.vpc_id
  subnets            = module.vpc.public_subnets
  security_groups    = [module.vpc.security_group_ids["alb"]]

  enable_deletion_protection = var.environment == "production"

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
      vpc_id           = module.vpc.vpc_id
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
    Name = "monkeytown-alb"
  }
}

resource "aws_iam_role" "rds_monitoring" {
  name = "monkeytown-rds-monitoring"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "monitoring.rds.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role" "ecs_tasks" {
  name = "monkeytown-ecs-tasks"

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

resource "aws_iam_role_policy" "ecs_tasks_secrets" {
  name = "monkeytown-ecs-secrets"
  role = aws_iam_role.ecs_tasks.name

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "secretsmanager:GetSecretValue",
          "kms:Decrypt"
        ]
        Effect = "Allow"
        Resource = [
          aws_secretsmanager_secret.database_password.arn,
          aws_secretsmanager_secret.redis_password.arn
        ]
      }
    ]
  })
}

resource "aws_secretsmanager_secret" "database_password" {
  name = "monkeytown/database-password"
}

resource "aws_secretsmanager_secret" "redis_password" {
  name = "monkeytown/redis-password"
}

resource "aws_cloudwatch_log_group" "ecs" {
  name              = "/ecs/monkeytown"
  retention_in_days = var.environment == "production" ? 30 : 7
}

output "alb_dns_name" {
  value = module.alb.lb_dns_name
}

output "redis_endpoint" {
  value = module.redis.cluster_endpoint
}

output "database_endpoint" {
  value = module.rds.instance_endpoint
}
```

### Terraform Variables

```hcl
# infrastructure/terraform/variables.tf
variable "environment" {
  description = "Environment name (development/production)"
  type        = string
  default     = "development"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "availability_zones" {
  description = "Availability zones to use"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "redis_node_type" {
  description = "Redis instance size"
  type        = string
  default     = "cache.t3.micro"
}

variable "rds_instance_class" {
  description = "RDS instance size"
  type        = string
  default     = "db.t3.micro"
}

variable "rds_username" {
  description = "Database username"
  type        = string
  default     = "monkeytown"
}

variable "rds_password" {
  description = "Database password (use secrets manager in production)"
  type        = string
  default     = "dev-password"
}
```

---

## Deployment Procedures

### Local Development

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

### Production Deployment

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

# 5. Register task definitions and update services
aws ecs register-task-definition --cli-input-json file://task-definitions/web.json
aws ecs register-task-definition --cli-input-json file://task-definitions/server.json

aws ecs update-service --cluster monkeytown-production --service monkeytown-web --task-definition monkeytown-web
aws ecs update-service --cluster monkeytown-production --service monkeytown-server --task-definition monkeytown-server
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

---

## Monitoring & Alerting

### CloudWatch Alarms

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

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.2 | 2026-01-19 | Verified actual docker-compose.yml and nginx config |
| 2.1 | 2026-01-19 | Updated with actual Docker Compose and Terraform configs |
| 2.0 | 2026-01-19 | Initial version |
| 1.0 | 2026-01-18 | Original deployment spec |

---

*Version: 2.2*
*Last updated: 2026-01-19*
*ChaosArchitect - Deploying with confidence*
