.PHONY: build build-web build-ci deploy deploy-prod rollback status logs clean test lint help

# Variables
TAG := $(shell git rev-parse --short HEAD)
REGISTRY := ghcr.io/monkeytown

# Default target
help:
	@echo "Monkeytown Deployment Commands"
	@echo ""
	@echo "Build Commands:"
	@echo "  build        - Build web application"
	@echo "  build-web    - Build web Docker image"
	@echo "  build-ci     - Build CI container image"
	@echo ""
	@echo "Deployment Commands:"
	@echo "  deploy       - Deploy to staging"
	@echo "  deploy-prod  - Deploy to production"
	@echo "  rollback     - Rollback to previous version"
	@echo "  status       - Check deployment status"
	@echo ""
	@echo "Debug Commands:"
	@echo "  logs         - Tail application logs"
	@echo "  clean        - Clean build artifacts"
	@echo ""
	@echo "Quality Commands:"
	@echo "  test         - Run test suite"
	@echo "  lint         - Run linters"
	@echo "  typecheck    - Run TypeScript type checker"

# Build commands
build:
	@echo "Building web application..."
	npm run build

build-web:
	@echo "Building web Docker image..."
	docker build -f infrastructure/docker/Dockerfile.static -t $(REGISTRY)/monkeytown-web:$(TAG) .
	docker tag $(REGISTRY)/monkeytown-web:$(TAG) $(REGISTRY)/monkeytown-web:latest

build-ci:
	@echo "Building CI Docker image..."
	docker build -f infrastructure/docker/Dockerfile.ci -t $(REGISTRY)/monkeytown-ci:$(TAG) .

# Deployment commands
deploy:
	@echo "Deploying to staging..."
	@read -p "Enter image tag [$(TAG)]: " INPUT_TAG; \
	if [ -z "$$INPUT_TAG" ]; then INPUT_TAG=$(TAG); fi; \
	sed -i "s/TAG=.*/TAG=$$INPUT_TAG/" .env.staging || true; \
	docker-compose -f deploy/docker-compose.prod.yml up -d

deploy-prod:
	@echo "Deploying to production..."
	@echo "WARNING: This will deploy to production!" >&2
	@read -p "Enter image tag to deploy: " INPUT_TAG; \
	if [ -z "$$INPUT_TAG" ]; then echo "Error: Tag required" >&2; exit 1; fi; \
	docker-compose -f deploy/docker-compose.prod.yml -p monkeytown-prod up -d $$INPUT_TAG

rollback:
	@echo "Initiating rollback..."
	@docker-compose -f deploy/docker-compose.prod.yml ps
	@echo "To rollback, run: docker-compose -f deploy/docker-compose.prod.yml down && docker-compose -f deploy/docker-compose.prod.yml up -d"

status:
	@echo "Checking deployment status..."
	@docker-compose -f deploy/docker-compose.prod.yml ps
	@echo ""
	@echo "Health check:"
	@-curl -s http://localhost/health | head -c 100 || echo "Health check failed"

# Debug commands
logs:
	@echo "Tailing application logs (Ctrl+C to exit)..."
	@docker-compose -f deploy/docker-compose.prod.yml logs -f

logs-web:
	@echo "Tailing web logs..."
	@docker-compose -f deploy/docker-compose.prod.yml logs -f web

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf dist node_modules/.vite
	@docker system prune -f

# Quality commands
test:
	@echo "Running tests..."
	@npm run test --prefix web

lint:
	@echo "Running linters..."
	@-npm run lint --prefix web 2>/dev/null || echo "No lint script configured"

typecheck:
	@echo "Running TypeScript type checker..."
	@npx tsc --noEmit

# Image management
push-web:
	@echo "Pushing web image to registry..."
	@docker push $(REGISTRY)/monkeytown-web:$(TAG)
	@docker push $(REGISTRY)/monkeytown-web:latest

pull-web:
	@echo "Pulling latest web image..."
	@docker pull $(REGISTRY)/monkeytown-web:latest
