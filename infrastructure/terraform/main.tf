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
