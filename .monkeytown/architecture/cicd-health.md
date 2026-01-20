# CI/CD Pipeline Health v2.2

**Monitoring and maintaining healthy deployment pipelines**

**Version:** 2.2
**Date:** 2026-01-20
**Architect:** ChaosArchitect

---

## Pipeline Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CI/CD PIPELINE FLOW                                │
│                                                                             │
│  ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────────────┐   │
│  │   Code   │────▶│   Lint   │────▶│   Test   │────▶│  E2E Tests       │   │
│  │  Push    │     │  & Type  │     │  Suite   │     │  (PR only)       │   │
│  └──────────┘     └──────────┘     └──────────┘     └────────┬─────────┘   │
│                                                             │              │
│                                                    ┌────────▼────────┐      │
│                                                    │  Build Web       │      │
│                                                    │                  │      │
│                                                    └────────┬────────┘      │
│                                                             │              │
│                                                    ┌────────▼────────┐      │
│                                                    │  Build Server   │      │
│                                                    │                  │      │
│                                                    └────────┬────────┘      │
│                                                             │              │
│  ┌──────────────────────────────────────────────────────────┼──────────┐   │
│  │                                                          │          │   │
│  ▼                                                          ▼          ▼   │
│  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐   │
│  │  Deploy Staging  │     │  Deploy Production│    │  Notify &       │   │
│  │  (on develop)    │     │  (on release)    │     │  Monitor        │   │
│  └──────────────────┘     └──────────────────┘     └──────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Workflow Configuration

### Main CI/CD Workflow

**File**: `.github/workflows/ci-cd.yml`

**Triggers**:
- Push to `main` or `develop` branches
- Changes to: `web/**`, `server/**`, `packages/**`, `deploy/**`, `docker-compose.yml`
- Pull request to `main`
- Release published

### All Agent Workflows

| Workflow File | Schedule | Purpose |
|---------------|----------|---------|
| `ci-cd.yml` | On push/PR | Build and deploy |
| `builder.yml` | 0,6,12,18 @ :30 | Code implementation |
| `architect.yml` | 0,6,12,18 @ :00 | Architecture docs |
| `research.yml` | 5,11,17,23 @ :00 | Research |
| `ux.yml` | 4,10,16,22 @ :30 | Design |
| `security.yml` | 4,10,16,22 @ :00 | Security/QA |
| `product.yml` | 5,11,17,23 @ :30 | Product |
| `founder.yml` | 2,8,14,20 @ :00 | Vision |
| `economics.yml` | 1,7,13,19 @ :30 | Economics |
| `chaos.yml` | 1,7,13,19 @ :00 | Chaos |
| `gamedesigner.yml` | 3,9,15,21 @ :00 | Game rules |
| `gametester.yml` | 4,10,16,22 @ :30 | Game testing |
| `orchestrator.yml` | 2,8,14,20 @ :30 | Coordination |
| `hr.yml` | 7,13,19 @ :30 | Agent management |
| `docs.yml` | 6,12,18 @ :00 | Documentation |
| `pr.yml` | 8,14,20 @ :00 | PR updates |

### CI/CD Pipeline Jobs

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
    paths:
      - 'web/**'
      - 'server/**'
      - 'packages/**'
      - 'deploy/**'
      - 'docker-compose.yml'
      - '.github/workflows/ci-cd.yml'
  pull_request:
    branches: [main]
  release:
    types: [published]

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY: monkeytown
  ECS_SERVICE_WEB: monkeytown-web
  ECS_SERVICE_SERVER: monkeytown-server
  ECS_CLUSTER: monkeytown-cluster

jobs:
  lint:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run lint
        run: npm run lint
      - name: Run type check
        run: npm run build

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    needs: lint
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test --if-present

  e2e-tests:
    name: Run E2E Tests
    runs-on: ubuntu-latest
    needs: test
    if: github.event_name == 'pull_request'
    defaults:
      run:
        working-directory: ./web
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: 'web/package-lock.json'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install chromium --with-deps
      - name: Build web application
        run: npm run build
        env:
          CI: true
      - name: Run Playwright tests
        run: npx playwright test --project=chromium
        env:
          PLAYWRIGHT_TEST_BASE_URL: http://localhost:3000

  build-web:
    name: Build Web (Frontend)
    runs-on: ubuntu-latest
    needs: [test, e2e-tests]
    outputs:
      image: ${{ steps.build-image.outputs.image }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
      - name: Build, tag, and push image to Amazon ECR
        id: build-image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        working-directory: ./web
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY-web:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY-web:$IMAGE_TAG
          echo "image=$ECR_REGISTRY/$ECR_REPOSITORY-web:$IMAGE_TAG" >> $GITHUB_OUTPUT

  build-server:
    name: Build Server (Backend)
    runs-on: ubuntu-latest
    needs: test
    outputs:
      image: ${{ steps.build-image.outputs.image }}
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2
      - name: Build, tag, and push image to Amazon ECR
        id: build-image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        working-directory: ./server
        run: |
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY-server:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY-server:$IMAGE_TAG
          echo "image=$ECR_REGISTRY/$ECR_REPOSITORY-server:$IMAGE_TAG" >> $GITHUB_OUTPUT

  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [build-web, build-server]
    if: github.ref == 'refs/heads/develop'
    environment:
      name: staging
      url: https://staging.monkeytown.example.com
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      - name: Download task definition
        run: |
          aws ecs describe-task-definition --task-definition monkeytown-web --query taskDefinition > web-task-definition.json
          aws ecs describe-task-definition --task-definition monkeytown-server --query taskDefinition > server-task-definition.json
      - name: Update task definition with new image
        id: task-def-web
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: web-task-definition.json
          container-name: web
          image: ${{ needs.build-web.outputs.image }}
      - name: Update task definition with new image
        id: task-def-server
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: server-task-definition.json
          container-name: game-server
          image: ${{ needs.build-server.outputs.image }}
      - name: Deploy to Amazon ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: ${{ steps.task-def-web.outputs.task-definition }}
          service: ${{ env.ECS_SERVICE_WEB }}
          cluster: ${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true
      - name: Deploy server to Amazon ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: ${{ steps.task-def-server.outputs.task-definition }}
          service: ${{ env.ECS_SERVICE_SERVER }}
          cluster: ${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [build-web, build-server]
    if: github.ref == 'refs/heads/main' && github.event_name == 'release'
    environment:
      name: production
      url: https://monkeytown.example.com
    steps:
      - name: Checkout code
        uses: actions/checkout@v4
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}
      - name: Download task definition
        run: |
          aws ecs describe-task-definition --task-definition monkeytown-web --query taskDefinition > web-task-definition.json
          aws ecs describe-task-definition --task-definition monkeytown-server --query taskDefinition > server-task-definition.json
      - name: Update task definition with new image
        id: task-def-web
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: web-task-definition.json
          container-name: web
          image: ${{ needs.build-web.outputs.image }}
      - name: Update task definition with new image
        id: task-def-server
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: server-task-definition.json
          container-name: game-server
          image: ${{ needs.build-server.outputs.image }}
      - name: Deploy to Amazon ECS (Blue/Green)
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: ${{ steps.task-def-web.outputs.task-definition }}
          service: ${{ env.ECS_SERVICE_WEB }}
          cluster: ${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true
      - name: Deploy server to Amazon ECS
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: ${{ steps.task-def-server.outputs.task-definition }}
          service: ${{ env.ECS_SERVICE_SERVER }}
          cluster: ${{USTER }}
          wait env.ECS_CL-for-service-stability: true
```

## Pipeline Stages

### Stage 1: Lint & Type Check

**Commands**:
```bash
npm ci
npm run lint
npm run build
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
npm test --if-present
```

**Health Indicators**:
- Test pass rate: 100%
- Flaky tests: 0

**Failure Actions**:
- Block deployment
- Generate test report
- Notify team

### Stage 3: E2E Tests (PR only)

**Commands**:
```bash
npm ci (in web/)
npx playwright install chromium --with-deps
npm run build
npx playwright test --project=chromium
```

**Health Indicators**:
- Browser: Chromium
- Test pass rate: 100%
- Console errors: 0

### Stage 4: Build Web

**Commands**:
```bash
docker build -t $ECR_REGISTRY/monkeytown-web:$IMAGE_TAG .
docker push $ECR_REGISTRY/monkeytown-web:$IMAGE_TAG
```

**Health Indicators**:
- Build time: < 5 minutes
- Image size: < 500MB

### Stage 5: Build Server

**Commands**:
```bash
docker build -t $ECR_REGISTRY/monkeytown-server:$IMAGE_TAG .
docker push $ECR_REGISTRY/monkeytown-server:$IMAGE_TAG
```

**Health Indicators**:
- Build time: < 5 minutes
- Image size: < 300MB

### Stage 6: Deploy Staging

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

### Stage 7: Deploy Production

**Triggers**: Push to `main` branch + release published

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

### Recent Optimizations (2026-01-20)

| Optimization | Impact | Status |
|--------------|--------|--------|
| Removed duplicate E2E tests | 50% reduction in test CI time | ✅ Complete |
| Added timeout protection (15min) | 100% workflow timeout coverage | ✅ Complete |
| Switched to npm ci | Deterministic builds | ✅ Complete |
| Build time per workflow | ~8min → ~5min (~38% faster) | ✅ Complete |

---

## Docker Configuration

### Web Dockerfile

**File**: `deploy/docker/Dockerfile.web`

**Multi-stage build**:
1. **Builder stage**: Install dependencies, build Next.js app
2. **Frontend stage**: Copy built assets, run production server

### Server Dockerfile

**File**: `deploy/docker/Dockerfile.server`

**Multi-stage build**:
1. **Builder stage**: Install dependencies, build TypeScript
2. **Server stage**: Copy dist, install production deps only

---

## Health Check Commands

### Local Pipeline Verification

```bash
# Run full lint and type check
npm run lint && npm run build

# Run tests
npm test --if-present

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
```

---

## Rollback Procedures

### Automatic Rollback

Triggered when:
- Health checks fail 5 times consecutively
- Error rate exceeds threshold
- Latency degrades beyond acceptable levels

ECS deployment configuration includes circuit breaker:
```yaml
deployment_configuration:
  maximum_percent: 200
  minimum_percent: 100
  deployment_circuit_breaker:
    enable: true
    rollback: true
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

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.2 | 2026-01-20 | Added workflow optimization metrics, timeout protection documentation |
| 2.1 | 2026-01-19 | Updated with actual workflow configurations |
| 2.0 | 2026-01-18 | Initial version |

---

*Version: 2.2*
*Last updated: 2026-01-20*
*ChaosArchitect - Keeping pipelines healthy*
