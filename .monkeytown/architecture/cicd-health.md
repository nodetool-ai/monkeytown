# CI/CD Pipeline Health

**Monitoring and maintaining healthy deployment pipelines**

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

## Pipeline Stages

### Stage 1: Lint & Type Check

**Workflow**: `.github/workflows/ci-cd.yml` - `lint` job

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

**Workflow**: `.github/workflows/ci-cd.yml` - `test` job

**Commands**:
```bash
npm ci
npm test
```

**Health Indicators**:
- Test pass rate: 100%
- Test coverage: (check coverage threshold)
- Flaky tests: 0

**Failure Actions**:
- Block deployment
- Generate test report
- Notify team

### Stage 3: Build Web

**Workflow**: `.github/workflows/ci-cd.yml` - `build-web` job

**Commands**:
```bash
docker build -t $ECR_REGISTRY/$ECR_REPOSITORY-web:$IMAGE_TAG .
docker push $ECR_REGISTRY/$ECR_REPOSITORY-web:$IMAGE_TAG
```

**Health Indicators**:
- Build time: < 5 minutes
- Image size: < 500MB
- Security vulnerabilities: 0 (critical)

**Failure Actions**:
- Retry build (once)
- Check Docker daemon
- Notify DevOps

### Stage 4: Build Server

**Workflow**: `.github/workflows/ci-cd.yml` - `build-server` job

**Commands**:
```bash
docker build -t $ECR_REGISTRY/$ECR_REPOSITORY-server:$IMAGE_TAG .
docker push $ECR_REGISTRY/$ECR_REPOSITORY-server:$IMAGE_TAG
```

**Health Indicators**:
- Build time: < 5 minutes
- Image size: < 300MB
- Dependencies up to date

**Failure Actions**:
- Retry build (once)
- Check npm registry
- Notify DevOps

### Stage 5: Deploy Staging

**Workflow**: `.github/workflows/ci-cd.yml` - `deploy-staging` job

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

**Workflow**: `.github/workflows/ci-cd.yml` - `deploy-production` job

**Triggers**: Release published from `main` branch

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

## Health Check Commands

### Local Pipeline Verification

```bash
# Run full lint and type check
npm run lint && npm run build

# Run tests
npm test

# Build Docker images
docker build -t monkeytown-web:local ./web
docker build -t monkeytown-server:local ./server
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

## Common Issues & Solutions

### Issue: Lint Failures

**Symptoms**: PR blocked by lint errors

**Solutions**:
```bash
# Run lint locally
npm run lint

# Auto-fix
npm run lint -- --fix

# Check specific file
npx eslint path/to/file.ts
```

### Issue: Test Failures

**Symptoms**: Tests failing in CI

**Solutions**:
```bash
# Run tests with verbose output
npm test -- --run

# Run specific test file
npm test -- path/to/test.ts

# Check for flaky tests
npm test -- --reporter=json > test-results.json
```

### Issue: Build Timeouts

**Symptoms**: Docker build times out

**Solutions**:
```bash
# Check Docker daemon
docker info

# Clean up Docker
docker system prune -af

# Build with no cache (debug)
docker build --no-cache -t test ./web
```

### Issue: Deployment Failures

**Symptoms**: ECS service fails to stabilize

**Solutions**:
```bash
# Check service events
aws ecs describe-services --cluster monkeytown-cluster \
  --services monkeytown-web --query 'services[0].events'

# Check task logs
aws logs tail /ecs/monkeytown --follow

# Rollback to previous revision
aws ecs update-service --cluster monkeytown-cluster \
  --service monkeytown-web \
  --task-definition monkeytown-web:PREVIOUS
```

## Alerting Configuration

### GitHub Actions Alerts

- **Failed workflows**: PR comment + email notification
- **Failed deployments**: Slack/Discord notification
- **Security vulnerabilities**: Immediate alert

### AWS CloudWatch Alarms

```yaml
# Example: High error rate alarm
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

## Pipeline Optimization Strategies

### 1. Dependency Caching

```yaml
# GitHub Actions cache
- name: Cache npm
  uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-npm-
```

### 2. Parallel Jobs

- Web and server builds run in parallel
- Independent test suites can run concurrently
- Multiple deployment targets can be parallelized

### 3. Docker Layer Caching

```yaml
- name: Build with cache
  uses: docker/build-push-action@v5
  with:
    context: ./web
    push: true
    tags: ${{ steps.login-ecr.outputs.registry }}/monkeytown-web:${{ github.sha }}
    cache-from: type=gha
    cache-to: type=gha,mode=max
```

### 4. Incremental Builds

- Only rebuild changed components
- Use Docker multi-stage builds
- Separate build and runtime dependencies

## Rollback Procedures

### Automatic Rollback

Triggered when:
- Health checks fail 5 times consecutively
- Error rate exceeds threshold
- Latency degrades beyond acceptable levels

```bash
# Get previous task definition
PREVIOUS_TASK=$(aws ecs describe-task-definition \
  --task-definition monkeytown-web \
  --query 'taskDefinition.taskDefinitionArn' \
  --output text)

# Rollback
aws ecs update-service \
  --cluster monkeytown-cluster \
  --service monkeytown-web \
  --task-definition $PREVIOUS_TASK
```

### Manual Rollback

```bash
# List recent task definitions
aws ecs list-task-definitions \
  --family-prefix monkeytown-web \
  --sort DESC \
  --max-results 10

# Activate previous version
aws ecs register-task-definition \
  --family monkeytown-web \
  --cli-input-json file://previous-task-def.json

# Update service
aws ecs update-service \
  --cluster monkeytown-cluster \
  --service monkeytown-web \
  --task-definition monkeytown-web:NEW_NUMBER
```

## Documentation References

- CI/CD Workflow: `.github/workflows/ci-cd.yml`
- Docker Configuration: `deploy/docker/`
- Infrastructure: `infrastructure/terraform/`
- Architecture: `.monkeytown/architecture/`

---

*Last updated: 2026-01-18*
*ChaosArchitect - Keeping pipelines healthy*
