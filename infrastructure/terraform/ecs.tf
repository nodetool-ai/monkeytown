locals {
  web_image      = "${var.ecr_url}/monkeytown-web:${var.image_tag}"
  server_image   = "${var.ecr_url}/monkeytown-server:${var.image_tag}"
}

resource "aws_ecs_task_definition" "web" {
  family                   = "monkeytown-web"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.web_cpu
  memory                   = var.web_memory
  execution_role_arn       = aws_iam_role.ecs_tasks.arn
  task_role_arn            = aws_iam_role.ecs_tasks.arn

  container_definitions = jsonencode([
    {
      name         = "web"
      image        = local.web_image
      essential    = true
      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "NODE_ENV", value = var.environment },
        { name = "VITE_API_URL", value = "https://${var.domain_name}/api" },
        { name = "VITE_WS_URL", value = "wss://${var.domain_name}/ws" }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "web"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:3000/health/live || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])
}

resource "aws_ecs_task_definition" "server" {
  family                   = "monkeytown-server"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.server_cpu
  memory                   = var.server_memory
  execution_role_arn       = aws_iam_role.ecs_tasks.arn
  task_role_arn            = aws_iam_role.ecs_tasks.arn

  container_definitions = jsonencode([
    {
      name         = "game-server"
      image        = local.server_image
      essential    = true
      portMappings = [
        {
          containerPort = 3001
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "NODE_ENV", value = var.environment },
        { name = "REDIS_URL", value = "redis://${module.redis.cluster_endpoint}:${module.redis.cluster_port}" },
        { name = "DATABASE_URL", value = "postgres://${var.rds_username}:placeholder@${module.rds.instance_endpoint}:${module.rds.instance_port}/${module.rds.instance_database_name}" }
      ]

      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = replace(var.database_secret_arn, "password", "encoded")
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "server"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:3001/health/ready || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    },
    {
      name         = "event-stream"
      image        = local.server_image
      essential    = true
      command      = ["node", "dist/event-stream.js"]
      portMappings = [
        {
          containerPort = 8080
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "NODE_ENV", value = var.environment },
        { name = "REDIS_URL", value = "redis://${module.redis.cluster_endpoint}:${module.redis.cluster_port}" },
        { name = "EVENT_STREAM_PORT", value = "8080" }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.ecs.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "event-stream"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:8080/health/live || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])
}

resource "aws_ecs_service" "web" {
  name            = "monkeytown-web"
  cluster         = var.ecs_cluster_arn
  task_definition = aws_ecs_task_definition.web.arn
  desired_count   = var.web_desired_count
  launch_type     = "FARGATE"

  network_configuration = {
    subnets          = var.private_subnet_ids
    security_groups  = [module.vpc.security_group_ids["ecs"]]
    assign_public_ip = false
  }

  load_balancer = {
    target_group_arn = module.alb.target_group_arns["web"]
    container_name   = "web"
    container_port   = 3000
  }

  deployment_configuration = {
    maximum_percent         = 200
    minimum_percent         = 100
    deployment_circuit_breaker = {
      enable   = true
      rollback = true
    }
  }

  scheduling_strategy = "REPLICA"
}

resource "aws_ecs_service" "server" {
  name            = "monkeytown-server"
  cluster         = var.ecs_cluster_arn
  task_definition = aws_ecs_task_definition.server.arn
  desired_count   = var.server_desired_count
  launch_type     = "FARGATE"

  network_configuration = {
    subnets          = var.private_subnet_ids
    security_groups  = [module.vpc.security_group_ids["ecs"]]
    assign_public_ip = false
  }

  deployment_configuration = {
    maximum_percent         = 200
    minimum_percent         = 100
    deployment_circuit_breaker = {
      enable   = true
      rollback = true
    }
  }

  scheduling_strategy = "REPLICA"
}
