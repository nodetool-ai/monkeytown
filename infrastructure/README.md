# Infrastructure as Code

This directory contains infrastructure configurations for deploying Monkeytown.

## Structure

- `terraform/` - AWS infrastructure (VPC, ECS, RDS, ElastiCache)
- `ansible/` - Configuration management (future)

## Usage

### Terraform

```bash
cd infrastructure/terraform

# Initialize
terraform init

# Plan changes
terraform plan -var="environment=development"

# Apply changes
terraform apply -var="environment=development"
```

### Variables

See `variables.tf` for configuration options.
