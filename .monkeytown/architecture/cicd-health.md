# CI/CD Pipeline Health v2.0

**Monitoring and maintaining healthy deployment pipelines**

**Version:** 2.0
**Date:** 2026-01-18
**Architect:** ChaosArchitect

---

## Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CI/CD PIPELINE FLOW                                │
│                                                                             │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────────┐       │
│  │   Code   │────▶│   Lint   │────▶│   Test   │────▶│  Build Web   │       │
│  │  Push    │     │  & Type  │     │  Suite   │     │              │       │
│  └──────────┘     └──────────┘     └──────────┘     └──────┬───────┘       │
│                                                            │                │
│                                                   ┌────────▼────────┐       │
│                                                   │  Build Server   │       │
│                                                   │                 │       │
│                                                   └────────┬────────┘       │
│                                                            │                │
│  ┌─────────────────────────────────────────────────────────┼──────────┐    │
│  │                                                         │          │    │
│  ▼                                                         ▼          ▼    │
│  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐    │
│  │  Deploy Staging  │     │  Deploy Production│    │  Notify &       │    │
│  │  (on develop)    │     │  (on release)    │     │  Monitor        │    │
│  └──────────────────┘     └──────────────────┘     └──────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Configuration

### Main CI/CD Workflow

**File**: `.github/workflows/ci-cd.yml`

**Triggers**:
- Push to `develop` branch → Deploy staging
- Push to `main` branch → Deploy production
- Pull request → Lint and test only
- Manual dispatch → Optional deployments

**Jobs**:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deployment environment'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck

  test:
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test -- --run
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/

  build-web:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build --prefix web
      - uses: actions/upload-artifact@v4
        with:
          name: web-dist
          path: web/dist/

  build-server:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build --prefix server
      - uses: actions/upload-artifact@v4
        with:
          name: server-dist
          path: server/dist/

  build-images:
    runs-on: ubuntu-latest
    needs: [build-web, build-server]
    steps:
      - uses: actions/checkout@v4
      - name: Login to Amazon ECR
        uses: aws-actions/amazon-ecr-login@v2
      - name: Build and push web image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/monkeytown-web:$IMAGE_TAG -f deploy/docker/Dockerfile.web .
          docker push $ECR_REGISTRY/monkeytown-web:$IMAGE_TAG
      - name: Build and push server image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          docker build -t $ECR_REGISTRY/monkeytown-server:$IMAGE_TAG -f deploy/docker/Dockerfile.server .
          docker push $ECR_REGISTRY/monkeytown-server:$IMAGE_TAG

  deploy-staging:
    runs-on: ubuntu-latest
    needs: build-images
    if: github.ref == 'refs/heads/develop'
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to ECS
        run: |
          # Update ECS service with new task definition
          aws ecs update-service \
            --cluster monkeytown-staging \
            --service monkeytown-web \
            --task-definition monkeytown-web:${{ github.sha }}
          aws ecs update-service \
            --cluster monkeytown-staging \
            --service monkeytown-server \
            --task-definition monkeytown-server:${{ github.sha }}

  deploy-production:
    runs-on: ubuntu-latest
    needs: build-images
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to ECS (Blue/Green)
        run: |
          # Create new task definition version
          aws ecs register-task-definition \
            --family monkeytown-web \
            --cli-input-json file://task-definitions/web.json
          aws ecs register-task-definition \
            --family monkeytown-server \
            --cli-input-json file://task-definitions/server.json
          
          # Update service with new task definition
          aws ecs update-service \
            --cluster monkeytown-production \
            --service monkeytown-web \
            --task-definition monkeytown-web:${{ github.sha }}
          aws ecs update-service \
            --cluster monkeytown-production \
            --service monkeytown-server \
            --task-definition monkeytown-server:${{ github.sha }}
      - name: Send notification
        run: |
          # Send to Slack/Discord/etc
          curl -X POST -H 'Content-type: application/json' \
            --data '{"text":"Production deployment completed: ${{ github.sha }}"}' \
            ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Pipeline Stages

### Stage 1: Lint & Type Check

**Commands**:
```bash
npm ci
npm run lint
npm run typecheck
```

**Health Indicators**:
- Lint errors: 0
- TypeScript errors: 0
- Build success: true

**Failure Actions**:
- Block downstream jobs
- Notify developers via PR comments
- Log to monitoring

### Stage 2: Test Suite

**Commands**:
```bash
npm ci
npm test -- --run
```

**Health Indicators**:
- Test pass rate: 100%
- Test coverage: >80%
- Flaky tests: 0

**Failure Actions**:
- Block deployment
- Generate test report
- Notify team

### Stage 3: Build Web

**Commands**:
```bash
docker build -t $ECR_REGISTRY/$ECR_REPOSITORY-web:$IMAGE_TAG -f deploy/docker/Dockerfile.web .
docker push $ECR_REGISTRY/$ECR_REPOSITORY-web:$IMAGE_TAG
```

**Health Indicators**:
- Build time: < 5 minutes
- Image size: < 500MB
- Security vulnerabilities: 0 (critical)

### Stage 4: Build Server

**Commands**:
```bash
docker build -t $ECR_REGISTRY/$ECR_REPOSITORY-server:$IMAGE_TAG -f deploy/docker/Dockerfile.server .
docker push $ECR_REGISTRY/$ECR_REPOSITORY-server:$IMAGE_TAG
```

**Health Indicators**:
- Build time: < 5 minutes
- Image size: < 300MB
- Dependencies up to date

### Stage 5: Deploy Staging

**Triggers**: Push to `develop` branch

**Actions**:
- Update ECS task definitions
- Deploy to staging cluster
- Wait for service stability

**Health Indicators**:
- Deployment time: < 3 minutes
- Health check pass rate: 100%
- Zero downtime: true

**Rollback Triggers**:
- Health check failure (3 consecutive)
- Error rate spike > 10%
- Latency P99 > 2s

### Stage 6: Deploy Production

**Triggers**: Push to `main` branch or release published

**Actions**:
- Update ECS task definitions
- Blue/green deployment
- Automated health verification

**Health Indicators**:
- Deployment time: < 5 minutes
- Health check pass rate: 100%
- Error rate < 1%

**Rollback Triggers**:
- Health check failure (5 consecutive)
- Error rate spike > 5%
- Latency P99 > 1s
- Manual approval (optional)

---

## Pipeline Metrics

### Performance Targets

| Metric | Target | Warning Threshold |
|--------|--------|-------------------|
| Total pipeline time | < 15 min | > 20 min |
| Lint time | < 30 sec | > 1 min |
| Test time | < 2 min | > 5 min |
| Build time | < 5 min | > 10 min |
| Deploy time | < 3 min | > 5 min |

### Quality Targets

| Metric | Target | Critical |
|--------|--------|----------|
| Test pass rate | 100% | < 95% |
| Code coverage | > 80% | < 60% |
| Critical vulnerabilities | 0 | > 0 |
| Major vulnerabilities | < 5 | > 10 |

---

## Docker Configuration

### Web Dockerfile

```dockerfile
# deploy/docker/Dockerfile.web
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY web/ ./web/
COPY packages/ ./packages/
RUN npm run build --prefix web

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/web/public ./public
COPY --from=builder /app/web/.next/standalone ./
COPY --from=builder /app/web/.next/static ./static

EXPOSE 3000
CMD ["node", "server.js"]
```

### Server Dockerfile

```dockerfile
# deploy/docker/Dockerfile.server
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY server/ ./server/
COPY packages/ ./packages/
RUN npm run build --prefix server

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package*.json ./
RUN npm ci --only=production

EXPOSE 3001
CMD ["node", "dist/index.js"]
```

### Nginx Configuration

```nginx
# deploy/docker/nginx.conf
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    access_log /var/log/nginx/access.log main;

    sendfile on;
    keepalive_timeout 65;

    upstream web {
        server web:3000;
    }

    upstream game_server {
        least_conn;
        server game-server:3001;
    }

    server {
        listen 80;
        server_name localhost;

        location / {
            proxy_pass http://web;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }

        location /api/ {
            proxy_pass http://game_server;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
        }

        location /ws {
            proxy_pass http://game_server;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $host;
        }
    }
}
```

---

## Health Check Commands

### Local Pipeline Verification

```bash
# Run full lint and type check
npm run lint && npm run typecheck

# Run tests
npm test -- --run

# Build Docker images
docker build -t monkeytown-web:local ./web
docker build -t monkeytown-server:local ./server

# Test Docker Compose
docker compose up -d
curl http://localhost/health
```

### Pipeline Monitoring

```bash
# Check GitHub Actions status
gh run list --workflow ci-cd.yml --limit 10

# Check last deployment
aws ecs describe-services --cluster monkeytown-cluster \
  --services monkeytown-web

# Check service health
aws ecs describe-task-definition --task-definition monkeytown-web
```

---

## Common Issues & Solutions

### Issue: Lint Failures

**Symptoms**: PR blocked by lint errors

**Solutions**:
```bash
npm run lint
npm run lint -- --fix
npx eslint path/to/file.ts
```

### Issue: Test Failures

**Symptoms**: Tests failing in CI

**Solutions**:
```bash
npm test -- --run --verbose
npm test -- path/to/test.ts
npm test -- --reporter=json > test-results.json
```

### Issue: Build Timeouts

**Symptoms**: Docker build times out

**Solutions**:
```bash
docker info
docker system prune -af
docker build --no-cache -t test ./web
```

### Issue: Deployment Failures

**Symptoms**: ECS service fails to stabilize

**Solutions**:
```bash
aws ecs describe-services --cluster monkeytown-cluster \
  --services monkeytown-web --query 'services[0].events'

aws logs tail /ecs/monkeytown --follow

aws ecs update-service --cluster monkeytown-cluster \
  --service monkeytown-web \
  --task-definition monkeytown-web:PREVIOUS
```

---

## Alerting Configuration

### GitHub Actions Alerts

- **Failed workflows**: PR comment + email notification
- **Failed deployments**: Slack/Discord notification
- **Security vulnerabilities**: Immediate alert

### AWS CloudWatch Alarms

```yaml
AlarmHighErrorRate:
  Type: AWS::CloudWatch::Alarm
  Properties:
    AlarmName: monkeytown-high-error-rate
    MetricName: HTTPCode_ELB_5XX
    Namespace: AWS/ApplicationELB
    Threshold: 100
    EvaluationPeriods: 2
    ComparisonOperator: GreaterThanThreshold
    AlarmActions:
      - !Ref AlertTopic
```

---

## Rollback Procedures

### Automatic Rollback

Triggered when:
- Health checks fail 5 times consecutively
- Error rate exceeds threshold
- Latency degrades beyond acceptable levels

```bash
aws ecs update-service \
  --cluster monkeytown-cluster \
  --service monkeytown-web \
  --task-definition monkeytown-web:PREVIOUS
```

### Manual Rollback

```bash
aws ecs list-task-definitions \
  --family-prefix monkeytown-web \
  --sort DESC \
  --max-results 10

aws ecs register-task-definition \
  --family monkeytown-web \
  --cli-input-json file://previous-task-def.json

aws ecs update-service \
  --cluster monkeytown-cluster \
  --service monkeytown-web \
  --task-definition monkeytown-web:NEW_NUMBER
```

---

## Documentation References

- CI/CD Workflow: `.github/workflows/ci-cd.yml`
- Docker Configuration: `deploy/docker/`
- Infrastructure: `infrastructure/terraform/`
- Architecture: `.monkeytown/architecture/`

---

*Version: 2.0*
*Last updated: 2026-01-18*
*ChaosArchitect - Keeping pipelines healthy*
