# Deployment Strategy

**ChaosArchitect** | `deployment-strategy.md` | CI/CD Pipeline Design and Environment Management

---

## 1. Deployment Philosophy

Monkeytown treats deployment as a first-class architectural concern. Every change
must be deployable, observable, and rollback-able. There is no "hero deployment"
where human intervention saves the day. The system must deploy itself.

### Core Principles

1. **Immutable artifacts**: Once built, nothing changes
2. **Incremental rollout**: Changes deploy gradually with automatic rollback
3. **Observability-gated**: Deployment proceeds only if metrics remain healthy
4. **Self-service**: Any agent or human can trigger deployment
5. **Traceable**: Every deployment links to source commits and PRs

---

## 2. Environment Model

### 2.1 Environment Matrix

| Environment | Purpose | Data | Latency | Traffic |
|-------------|---------|------|---------|---------|
| **development** | Local developer testing | Synthetic | < 1s | None |
| **staging** | Integration testing | Anonymized production | < 5s | Simulated |
| **production** | Live witnesses | Real | < 100ms | Real |

### 2.2 Environment Configuration

```
deploy/
├── base/                    # Base Kubernetes manifests
│   ├── kustomization.yaml
│   ├── namespace.yaml
│   └── common-config.yaml
├── overlays/
│   ├── development/
│   │   ├── kustomization.yaml
│   │   └── replica-patch.yaml
│   ├── staging/
│   │   ├── kustomization.yaml
│   │   └── config-patch.yaml
│   └── production/
│       ├── kustomization.yaml
│       ├── replica-patch.yaml
│       └── resource-limit-patch.yaml
```

### 2.3 Environment-Specific Values

```yaml
# deploy/overlays/development/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

resources:
  - ../../base

namespace: monkeytown-dev

commonLabels:
  environment: development

patches:
  - path: replica-patch.yaml
    target:
      labelSelector: "app.kubernetes.io/component in (web, event-stream)"

configMapGenerator:
  - name: monkeytown-config
    behavior: replace
    files:
      - environment=development
      - log-level=debug
```

---

## 3. CI/CD Pipeline Architecture

### 3.1 Pipeline Stages

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           CI/CD PIPELINE                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐      │
│  │  CODE   │   │  BUILD  │   │  TEST   │   │ SECURITY│   │ PUBLISH │      │
│  │  PUSH   │──►│ARTIFACT │──►│  UNIT   │──►│  SCAN   │──►│ CONTAINER│      │
│  └─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘      │
│       │             │             │             │              │           │
│       ▼             ▼             ▼             ▼              ▼           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        DEPLOY STAGES                                 │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐     │   │
│  │   │ DEVELOP-  │──►│ STAGING   │──►│ PRODUCTION│──►│  PROMOTE  │     │   │
│  │   │   MENT    │   │  DEPLOY   │   │  DEPLOY   │   │  (if OK)  │     │   │
│  │   └───────────┘   └───────────┘   └───────────┘   └───────────┘     │   │
│  │        │               │               │               │             │   │
│  │        ▼               ▼               ▼               ▼             │   │
│  │   Auto-deploy     Deploy +         Deploy +        Auto-           │   │
│  │   on every push   test suite      canary         promote if       │   │
│  │                                     rollout       metrics OK       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Workflow Definitions

#### Build Pipeline

```yaml
# .github/workflows/build.yml
name: Build

on:
  push:
    branches: [main, develop]
    paths-ignore:
      - '**.md'
      - '.monkeytown/**'

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      image_tag: ${{ steps.meta.outputs.tags }}
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3
      
      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/${{ github.repository }}
          tags: |
            type=sha
            type=ref,event=branch
            type=raw,value=latest,enable=${{ github.ref == 'refs/heads/main' }}
      
      - name: Build and push web
        uses: docker/build-push-action@v5
        with:
          context: ./web
          push: ${{ github.event_name == 'push' }}
          tags: ${{ steps.meta.outputs.tags }}-web
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Build and push server
        uses: docker/build-push-action@v5
        with:
          context: ./server
          push: ${{ github.event_name == 'push' }}
          tags: ${{ steps.meta.outputs.tags }}-server
          cache-from: type=gha
          cache-to: type=gha,mode=max
      
      - name: Build and push event-stream
        uses: docker/build-push-action@v5
        with:
          context: ./server
          target: event-stream
          push: ${{ github.event_name == 'push' }}
          tags: ${{ steps.meta.outputs.tags }}-event-stream
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

#### Test Pipeline

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
    paths:
      - 'web/**'
      - 'server/**'
      - 'packages/**'

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type check
        run: npm run typecheck
      
      - name: Run linter
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:unit --if-present
      
      - name: Run integration tests
        run: npm run test:integration --if-present
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

#### Security Pipeline

```yaml
# .github/workflows/security.yml
name: Security

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  scan:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          severity: 'CRITICAL,HIGH'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
      
      - name: Check for secrets
        uses: trufflesecurity/trufflehog@main
        with:
          base: main
          head: HEAD
          extra_args: --no-update
```

#### Deploy Pipeline

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  workflow_run:
    workflows: [Build, Test, Security]
    types: [completed]
    branches: [main]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    if: ${{ github.event_name == 'push' }}
    environment: staging
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Kustomize
        uses: imranismail/setup-kustomize@v1
      
      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Deploy to Staging
        run: |
          kustomize build deploy/overlays/staging | kubectl apply -f -
          kustomize build deploy/overlays/staging | kubectl rollout status -n monkeytown-staging --timeout=5m
      
      - name: Notify deployment
        run: |
          curl -X POST "${{ secrets.SLACK_WEBHOOK }}" \
            -d "{\"text\": \"Deployed to staging: ${{ github.sha }}\"}"

  deploy-production:
    runs-on: ubuntu-latest
    needs: deploy-staging
    if: ${{ needs.deploy-staging.result == 'success' }}
    environment: production
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Set up Kustomize
        uses: imranismail/setup-kustomize@v1
      
      - name: Login to Container Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Deploy to Production (Canary)
        run: |
          kustomize build deploy/overlays/production | kubectl apply -f -
          kubectl set image deployment/monkeytown-web web=ghcr.io/${{ github.repository }}-${{ github.sha }} -n monkeytown-prod
          kubectl set image deployment/monkeytown-event-stream event-stream=ghcr.io/${{ github.repository }}-${{ github.sha }} -n monkeytown-prod
      
      - name: Wait for stability
        run: |
          sleep 60
          kubectl rollout status deployment/monkeytown-web -n monkeytown-prod --timeout=10m
          kubectl rollout status deployment/monkeytown-event-stream -n monkeytown-prod --timeout=10m
      
      - name: Verify health
        run: |
          curl -f "https://monkeytown.ai/health" || exit 1
      
      - name: Full rollout
        run: |
          kubectl rollout restart deployment/monkeytown-web -n monkeytown-prod
          kubectl rollout restart deployment/monkeytown-event-stream -n monkeytown-prod
      
      - name: Notify production deployment
        run: |
          curl -X POST "${{ secrets.SLACK_WEBHOOK }}" \
            -d "{\"text\": \"🚀 Deployed to production: ${{ github.sha }}\"}"
```

---

## 4. Rollout Strategies

### 4.1 Canary Deployment

Production deployments use canary rollout:

```yaml
# deploy/overlays/production/canary.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: monkeytown-web-canary
  namespace: monkeytown-prod
spec:
  replicas: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: monkeytown-web
      canary: "true"
  template:
    metadata:
      labels:
        app.kubernetes.io/name: monkeytown-web
        canary: "true"
    spec:
      containers:
        - name: web
          image: ghcr.io/anomalyco/monkeytown-web:canary
```

```yaml
# Ingress canary routing
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: monkeytown-web
  annotations:
    nginx.ingress.kubernetes.io/canary: "true"
    nginx.ingress.kubernetes.io/canary-weight: "10"
spec:
  rules:
    - host: monkeytown.ai
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: monkeytown-web-canary
                port:
                  number: 80
```

### 4.2 Blue-Green Deployment

```yaml
# Blue-Green service switch
apiVersion: v1
kind: Service
metadata:
  name: monkeytown-web-bluegreen
  namespace: monkeytown-prod
spec:
  selector:
    app.kubernetes.io/version: "blue"
  ports:
    - port: 80
```

Switch between blue and green by updating the selector.

### 4.3 Rollback Procedures

```bash
# Rollback via kubectl
kubectl rollout undo deployment/monkeytown-web -n monkeytown-prod

# Check rollback status
kubectl rollout status deployment/monkeytown-web -n monkeytown-prod

# View rollback history
kubectl rollout history deployment/monkeytown-web -n monkeytown-prod

# Rollback to specific revision
kubectl rollout undo deployment/monkeytown-web -n monkeytown-prod --to-revision=3
```

---

## 5. Agent Workflow Integration

### 5.1 Agent Deployment Triggers

Agents can trigger deployments by writing to specific files:

```markdown
# .monkeytown/decisions/deployment-triggers/deploy-2026-01-18.md

## Trigger: ChaosArchitect Architecture Update

### Changes
- New monitoring configuration
- Updated resource limits

### Environment
Target: production

### Approval
Status: approved
Approved-by: human-merge

### Deployment ID
SHA: abc123def456
Timestamp: 2026-01-18T12:00:00Z
```

### 5.2 Deployment from PRs

```yaml
# .github/workflows/deploy-preview.yml
name: Deploy Preview

on:
  pull_request:
    branches: [main]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy preview environment
        run: |
          ENVIRONMENT_NAME="preview-${{ github.event.pull_request.number }}"
          kustomize build deploy/overlays/development \
            -o /tmp/preview-${ENVIRONMENT_NAME}.yaml
          kubectl apply -f /tmp/preview-${ENVIRONMENT_NAME}.yaml
          echo "https://${ENVIRONMENT_NAME}.monkeytown.dev" >> $GITHUB_STEP_SUMMARY
      
      - name: Add preview URL to PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 Preview deployment: https://preview-${{ github.event.pull_request.number }}.monkeytown.dev'
            })
```

---

## 6. Configuration Management

### 6.1 Config as Code

All configuration is version-controlled:

```
.monkeytown/architecture/
├── infrastructure.md           # Architecture decisions
├── infrastructure-monitoring.md # Monitoring config
└── deployment-strategy.md      # This file

deploy/
├── base/                       # Base manifests
│   ├── configmap.yaml
│   └── secret.yaml
└── overlays/
    ├── development/
    ├── staging/
    └── production/

infrastructure/
├── Dockerfile
└── docker-compose.yml
```

### 6.2 Secret Management

```yaml
# deploy/base/secret.yaml
apiVersion: v1
kind: Secret
metadata:
  name: monkeytown-secrets
type: Opaque
stringData:
  # These are populated from GitHub Secrets at deploy time
  github-token: "${GITHUB_TOKEN}"
  minimax-api-key: "${MINIMAX_API_KEY}"
  redis-password: "${REDIS_PASSWORD}"
```

### 6.3 Environment Variables

```yaml
# deploy/base/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: monkeytown-config
data:
  NODE_ENV: "${NODE_ENV}"
  LOG_LEVEL: "${LOG_LEVEL}"
  EVENT_BUFFER_SIZE: "10000"
  WS_MAX_CONNECTIONS: "1000"
  METRICS_ENABLED: "${METRICS_ENABLED}"
```

---

## 7. Deployment Verification

### 7.1 Health Checks

```yaml
# deployment health check
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 30
  periodSeconds: 10
  timeoutSeconds: 5
  failureThreshold: 3

readinessProbe:
  httpGet:
    path: /ready
    port: 3000
  initialDelaySeconds: 10
  periodSeconds: 5
  timeoutSeconds: 3
  failureThreshold: 3
```

### 7.2 Smoke Tests

```bash
#!/bin/bash
# scripts/smoke-test.sh

set -e

ENVIRONMENT=$1
BASE_URL=$2

echo "Running smoke tests for $ENVIRONMENT at $BASE_URL"

# Check health endpoint
curl -f "${BASE_URL}/health" | jq '.status' | grep -q '"healthy"'

# Check WebSocket connection
wscat -c "${BASE_URL/ws/ws}/ws/events" --connect-timeout 5000 || true

# Verify core functionality
curl -f "${BASE_URL}/api/status" | jq '.agents' | grep -q '.'

echo "Smoke tests passed for $ENVIRONMENT"
```

### 7.3 Automated Promotion

```yaml
# Automated promotion based on metrics
- name: Wait for stability
  run: |
    echo "Waiting for metrics to stabilize..."
    sleep 120
    
    # Check error rate
    ERROR_RATE=$(curl -s "https://monkeytown.ai/api/metrics" | jq '.error_rate')
    if (( $(echo "$ERROR_RATE > 0.01" | bc -l) )); then
      echo "Error rate too high: $ERROR_RATE"
      exit 1
    fi
    
    # Check latency
    LATENCY=$(curl -s "https://monkeytown.ai/api/metrics" | jq '.p99_latency')
    if (( $(echo "$LATENCY > 1" | bc -l) )); then
      echo "Latency too high: ${LATENCY}s"
      exit 1
    fi
    
    echo "Metrics stable, promoting to 100%"
```

---

## 8. Disaster Recovery

### 8.1 Recovery Time Objectives

| Scenario | RTO | RPO | Procedure |
|----------|-----|-----|-----------|
| Single pod failure | 2 min | 0 | Auto-recreate |
| Deployment failure | 5 min | 0 | Automatic rollback |
| Cluster failure | 30 min | 5 min | Failover to secondary |
| Region failure | 1 hour | 15 min | Activate DR environment |
| Data corruption | 1 hour | 24h | Restore from backup |

### 8.2 Backup Procedures

```bash
#!/bin/bash
# scripts/backup.sh

# Backup Redis
kubectl exec -n monkeytown-prod deployment/monkeytown-redis -- redis-cli BGSAVE
kubectl cp monkeytown-prod/monkeytown-redis-0:/data/backup.rdb backups/redis-$(date +%Y%m%d).rdb

# Backup configuration
kubectl get configmap -n monkeytown-prod -o yaml > backups/configmap-$(date +%Y%m%d).yaml
kubectl get secrets -n monkeytown-prod -o yaml > backups/secrets-$(date +%Y%m%d).yaml

# Upload to S3
aws s3 cp backups/ s3://monkeytown-backups/ --recursive
```

### 8.3 Recovery Procedures

```bash
#!/bin/bash
# scripts/recover.sh

BACKUP_DATE=$1
ENVIRONMENT=$2

# Download backup from S3
aws s3 sync s3://monkeytown-backups/ backups/

# Restore Redis
kubectl exec -i -n monkeytown-${ENVIRONMENT} deployment/monkeytown-redis -- redis-cli RESTORE < backups/redis-${BACKUP_DATE}.rdb

# Restore configuration
kubectl apply -f backups/configmap-${BACKUP_DATE}.yaml -n monkeytown-${ENVIRONMENT}

# Restart deployments
kubectl rollout restart deployment/monkeytown-web -n monkeytown-${ENVIRONMENT}
kubectl rollout restart deployment/monkeytown-event-stream -n monkeytown-${ENVIRONMENT}
```

---

## 9. Cross-References

- **Architecture**: `.monkeytown/architecture/infrastructure.md` (service topology)
- **Architecture**: `.monkeytown/architecture/evolution-plan.md` (deployment evolution)
- **Architecture**: `.monkeytown/architecture/infrastructure-monitoring.md` (deployment observability)
- **Architecture**: `.monkeytown/architecture/network-security.md` (security during deployment)
- **Architecture**: `.monkeytown/architecture/system-design.md` (system invariants)
- **DevOps**: `.monkeytown/devops/runbook.md` (deployment failure procedures)
- **Deploy**: `deploy/` (Kubernetes manifests)
- **K8s**: `.k8s/` (Kustomize overlays)
- **Helm**: `helm/` (Helm charts)
- **Docker**: `infrastructure/Dockerfile` (container builds)
- **CI/CD**: `.github/workflows/` (GitHub Actions workflows)

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Infrastructure*
