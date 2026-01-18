# Terraform Infrastructure

**ChaosArchitect** | `terraform/` | Cloud Infrastructure as Code

---

## Purpose

This directory contains Terraform configurations for provisioning cloud infrastructure
required by Monkeytown. Terraform defines the infrastructure layer that Docker and
Kubernetes sit upon.

## Directory Structure

```
terraform/
├── main.tf                 # Main configuration entry point
├── variables.tf            # Input variables
├── outputs.tf              # Output values
├── providers.tf            # Provider configuration
├── backend.tf              # Remote state backend
├── modules/
│   ├── networking/         # VPC, subnets, security groups
│   ├── kubernetes/         # GKE/EKS cluster configuration
│   ├── redis/              # Managed Redis (Cloud Memorystore/ElastiCache)
│   ├── storage/            # S3 buckets for artifacts
│   ├── dns/                # DNS records (Route53/Cloud DNS)
│   └── monitoring/         # CloudWatch/Cloud Monitoring
└── environments/
    ├── dev/                # Development environment
    ├── staging/            # Staging environment
    └── prod/               # Production environment
```

## Providers

```hcl
# Required providers
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
}
```

## State Management

State is stored remotely for collaboration and safety:

```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "monkeytown-terraform-state"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}
```

## Environment Variables

| Variable | Description | Default | Sensitive |
|----------|-------------|---------|-----------|
| `aws_region` | AWS region | `us-east-1` | No |
| `environment` | Deployment environment | `dev` | No |
| `cluster_name` | K8s cluster name | `monkeytown-${environment}` | No |
| `redis_node_type` | Redis node instance type | `cache.t3.micro` | No |
| `enable_monitoring` | Enable CloudWatch | `true` | No |

## Modules

### networking

Creates VPC with public/private subnets across availability zones.

```hcl
module "networking" {
  source = "./modules/networking"
  
  environment  = var.environment
  cidr_block   = "10.0.0.0/16"
  az_count     = 2
  
  tags = {
    ManagedBy = "terraform"
    Project   = "monkeytown"
  }
}
```

### kubernetes

Provisions GKE/EKS cluster with node pools.

```hcl
module "kubernetes" {
  source = "./modules/kubernetes"
  
  environment     = var.environment
  cluster_name    = var.cluster_name
  vpc_id          = module.networking.vpc_id
  subnet_ids      = module.networking.private_subnet_ids
  
  node_pools = {
    general = {
      instance_types = ["t3.medium"]
      min_size       = 1
      max_size       = 5
    }
    event_stream = {
      instance_types = ["t3.small"]
      min_size       = 1
      max_size       = 3
    }
  }
}
```

### redis

Deploys managed Redis for event stream persistence.

```hcl
module "redis" {
  source = "./modules/redis"
  
  environment  = var.environment
  vpc_id       = module.networking.vpc_id
  subnet_ids   = module.networking.private_subnet_ids
  
  node_type    = var.redis_node_type
  num_nodes    = 1  # Single node for dev, 3 for prod
}
```

## Deployment

### Initialize

```bash
cd terraform
terraform init
```

### Plan

```bash
# Plan for specific environment
terraform plan -var-file="environments/dev/terraform.tfvars"
```

### Apply

```bash
# Apply for specific environment
terraform apply -var-file="environments/dev/terraform.tfvars"
```

### Destroy

```bash
# WARNING: Destroys all infrastructure
terraform destroy -var-file="environments/dev/terraform.tfvars"
```

## Cross-References

- **Architecture**: `.monkeytown/architecture/infrastructure.md` (service topology)
- **Deploy**: `deploy/` (Kubernetes manifests)
- **Docker**: `infrastructure/Dockerfile` (container images)
- **Monitoring**: `.monkeytown/architecture/infrastructure-monitoring.md` (observability)

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Infrastructure*
