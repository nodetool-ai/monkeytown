variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "development"
}

variable "ecr_url" {
  description = "ECR repository URL"
  type        = string
  default     = ""
}

variable "image_tag" {
  description = "Docker image tag"
  type        = string
  default     = "latest"
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "monkeytown.example.com"
}

variable "web_cpu" {
  description = "CPU units for web container (256 = 0.25 vCPU)"
  type        = number
  default     = 512
}

variable "web_memory" {
  description = "Memory in MB for web container"
  type        = number
  default     = 1024
}

variable "web_desired_count" {
  description = "Desired number of web tasks"
  type        = number
  default     = 1
}

variable "server_cpu" {
  description = "CPU units for server container"
  type        = number
  default     = 512
}

variable "server_memory" {
  description = "Memory in MB for server container"
  type        = number
  default     = 1024
}

variable "server_desired_count" {
  description = "Desired number of server tasks"
  type        = number
  default     = 1
}

variable "private_subnet_ids" {
  description = "IDs of private subnets"
  type        = list(string)
  default     = []
}

variable "ecs_cluster_arn" {
  description = "ECS cluster ARN"
  type        = string
  default     = ""
}

variable "rds_username" {
  description = "RDS username"
  type        = string
  default     = "monkeytown"
}

variable "database_secret_arn" {
  description = "ARN of database credentials secret"
  type        = string
  default     = ""
}
