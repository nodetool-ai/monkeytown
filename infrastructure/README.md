# Infrastructure as Code

This directory contains infrastructure configurations for deploying Monkeytown.

## Structure

```
infrastructure/
├── terraform/
│   ├── main.tf              # Main Terraform configuration
│   ├── variables.tf         # Terraform variables
│   ├── outputs.tf           # Terraform outputs
│   ├── ecs.tf               # ECS cluster and services
│   ├── ecs-variables.tf     # ECS-specific variables
│   └── README.md            # This file
└── ansible/
    └── playbook.yml         # (Future) Configuration management
```

## Architecture Overview

### AWS Infrastructure

```
┌─────────────────────────────────────────────────────────────────┐
│                         AWS Region                               │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                      VPC (10.0.0.0/16)                     │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │               Public Subnets                         │  │  │
│  │  │  ┌───────────────────────────────────────────────┐  │  │  │
│  │  │  │           Application Load Balancer           │  │  │  │
│  │  │  └───────────────────────────────────────────────┘  │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Private Subnets                         │  │  │
│  │  │  ┌───────────────┐  ┌───────────────┐              │  │  │
│  │  │  │  ECS Tasks    │  │  ECS Tasks    │              │  │  │
│  │  │  │  (Web)        │  │  (Game Srv)   │              │  │  │
│  │  │  └───────────────┘  └───────────────┘              │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │  ┌─────────────────────────────────────────────────────┐  │  │
│  │  │              Database Subnets                        │  │  │
│  │  │  ┌───────────────┐  ┌───────────────┐              │  │  │
│  │  │  │    RDS        │  │  ElastiCache  │              │  │  │
│  │  │  │  (PostgreSQL) │  │    (Redis)    │              │  │  │
│  │  │  └───────────────┘  └───────────────┘              │  │  │
│  │  └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Components

#### VPC Networking
- **CIDR**: 10.0.0.0/16
- **Public Subnets**: 2 AZs for ALB
- **Private Subnets**: 2 AZs for ECS tasks
- **Database Subnets**: Isolated for RDS/ElastiCache
- **NAT Gateway**: For egress from private subnets (production)

#### ECS Cluster
- **Capacity Providers**: FARGATE for serverless compute
- **Services**:
  - `monkeytown-web`: Frontend Next.js application
  - `monkeytown-server`: Game server and event stream

#### Data Stores
- **RDS PostgreSQL**: Primary database with multi-AZ (production)
- **ElastiCache Redis**: Session storage and pub/sub with replication

#### Load Balancing
- **ALB**: Application Load Balancer with HTTPS termination
- **Target Groups**: Web and API target groups with health checks

### Terraform Modules

| Module | Source | Purpose |
|--------|--------|---------|
| VPC | terraform-aws-modules/vpc/aws | Network infrastructure |
| ECS | terraform-aws-modules/ecs/aws | Container orchestration |
| RDS | terraform-aws-modules/rds/aws | PostgreSQL database |
| Redis | terraform-aws-modules/elasticache/aws | Redis cluster |
| ALB | terraform-aws-modules/alb/aws | Load balancer |

## Usage

### Prerequisites

- AWS CLI configured with appropriate credentials
- Terraform >= 1.5.0
- S3 bucket for state storage (`monkeytown-tf-state`)
- DynamoDB table for state locking (`monkeytown-tf-locks`)

### Terraform Commands

```bash
cd infrastructure/terraform

# Initialize
terraform init

# Plan changes (development)
terraform plan -var="environment=development"

# Plan changes (production)
terraform plan -var="environment=production" -var="rds_instance_class=db.t3.medium"

# Apply changes
terraform apply -var="environment=development"
```

### Variables

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `environment` | string | `"development"` | Environment name |
| `aws_region` | string | `"us-east-1"` | AWS region |
| `availability_zones` | list | `["us-east-1a", "us-east-1b", "us-east-1c"]` | AZs to use |
| `redis_node_type` | string | `"cache.t3.micro"` | Redis instance size |
| `rds_instance_class` | string | `"db.t3.micro"` | RDS instance size |
| `rds_username` | string | `"monkeytown"` | Database username |
| `rds_password` | string | (secret) | Database password |

### State Management

State is stored in S3 with DynamoDB locking:

```hcl
backend "s3" {
  bucket         = "monkeytown-tf-state"
  key            = "infrastructure/terraform.tfstate"
  region         = "us-east-1"
  encrypt        = true
  dynamodb_table = "monkeytown-tf-locks"
}
```

## ECS Task Definitions

### Web Service

```json
{
  "family": "monkeytown-web",
  "containerDefinitions": [
    {
      "name": "web",
      "image": "${IMAGE_URL}",
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
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:..."
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health"],
        "interval": 60,
        "timeout": 30,
        "retries": 3
      }
    }
  ]
}
```

### Game Server Service

```json
{
  "family": "monkeytown-server",
  "containerDefinitions": [
    {
      "name": "game-server",
      "image": "${IMAGE_URL}",
      "portMappings": [
        {
          "containerPort": 3001,
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
          "value": "${REDIS_ENDPOINT}"
        },
        {
          "name": "DATABASE_URL",
          "value": "${DATABASE_ENDPOINT}"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_PASSWORD",
          "valueFrom": "arn:aws:secretsmanager:..."
        }
      ],
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3001/health"],
        "interval": 30,
        "timeout": 10,
        "retries": 3
      }
    }
  ]
}
```

## Security Considerations

### Network Security
- Security groups restrict traffic between components
- No public internet access for database/redis
- ALB only accepts HTTPS (redirects HTTP to HTTPS)

### Secrets Management
- Database credentials stored in AWS Secrets Manager
- Credentials encrypted with KMS
- ECS tasks retrieve secrets at runtime

### IAM Roles
- ECS tasks have minimal required permissions
- RDS monitoring role for enhanced monitoring
- Secrets access policy for task execution

## Cost Optimization

### Development
- Single RDS instance (db.t3.micro)
- Single Redis node (cache.t3.micro)
- No NAT gateway (public IPs for tasks)

### Production
- Multi-AZ RDS with automated backups
- Redis with replication and automatic failover
- NAT gateway for private egress
- Consider reserved instances for cost savings

## Monitoring

### CloudWatch Logs
- All container logs shipped to CloudWatch
- Log group: `/ecs/monkeytown`
- Retention: 7 days (dev) / 30 days (prod)

### Metrics
- ECS cluster metrics (CPU, memory, running tasks)
- RDS metrics (connections, iops, latency)
- Redis metrics (cpu, memory, network)

### Alarms
- High CPU utilization (>80%)
- High memory usage (>85%)
- Increased error rates
- Failed health checks

---

*Last updated: 2026-01-18*
*ChaosArchitect - Building resilient infrastructure*
