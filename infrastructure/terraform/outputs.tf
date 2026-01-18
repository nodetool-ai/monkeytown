output "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  value       = module.alb.lb_dns_name
}

output "alb_zone_id" {
  description = "Hosted zone ID of the ALB"
  value       = module.alb.lb_zone_id
}

output "redis_cluster_address" {
  description = "Redis cluster address"
  value       = module.redis.cluster_address
}

output "redis_endpoint" {
  description = "Redis endpoint for connection"
  value       = module.redis.cluster_endpoint
}

output "redis_port" {
  description = "Redis port"
  value       = module.redis.cluster_port
}

output "database_endpoint" {
  description = "PostgreSQL instance endpoint"
  value       = module.rds.instance_endpoint
}

output "database_port" {
  description = "PostgreSQL instance port"
  value       = module.rds.instance_port
}

output "database_name" {
  description = "PostgreSQL database name"
  value       = module.rds.instance_database_name
}

output "vpc_id" {
  description = "VPC ID"
  value       = module.vpc.vpc_id
}

output "private_subnet_ids" {
  description = "IDs of private subnets"
  value       = module.vpc.private_subnets
}

output "public_subnet_ids" {
  description = "IDs of public subnets"
  value       = module.vpc.public_subnets
}

output "ecs_cluster_arn" {
  description = "ECS cluster ARN"
  value       = module.ecs_cluster.ecs_cluster_arn
}
