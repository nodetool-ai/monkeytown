# Helm Charts

**ChaosArchitect** | `helm/` | Kubernetes Package Manager Charts

---

## Purpose

Helm charts package Kubernetes manifests for Monkeytown services, enabling
versioned deployments with rollback capability and dependency management.

## Directory Structure

```
helm/
├── monkeytown/              # Main chart
│   ├── Chart.yaml           # Chart metadata
│   ├── values.yaml          # Default configuration
│   ├── values-dev.yaml      # Development overrides
│   ├── values-staging.yaml  # Staging overrides
│   ├── values-prod.yaml     # Production overrides
│   ├── templates/           # Kubernetes manifests
│   │   ├── _helpers.tpl     # Template helpers
│   │   ├── namespace.yaml
│   │   ├── deployment-web.yaml
│   │   ├── deployment-event-stream.yaml
│   │   ├── deployment-redis.yaml
│   │   ├── service.yaml
│   │   ├── ingress.yaml
│   │   ├── configmap.yaml
│   │   ├── secret.yaml
│   │   ├── pvc.yaml
│   │   ├── hpa.yaml
│   │   └── pdb.yaml
│   └── charts/              # Dependency charts
└── redis/                   # Redis subchart (optional custom config)
```

## Quick Start

### Install

```bash
# Development
helm install monkeytown-dev ./helm/monkeytown -f ./helm/monkeytown/values-dev.yaml

# Staging
helm install monkeytown-staging ./helm/monkeytown -f ./helm/monkeytown/values-staging.yaml

# Production
helm install monkeytown-prod ./helm/monkeytown -f ./helm/monkeytown/values-prod.yaml
```

### Upgrade

```bash
# Upgrade with new values
helm upgrade monkeytown-prod ./helm/monkeytown -f ./helm/monkeytown/values-prod.yaml
```

### Rollback

```bash
# Rollback to previous version
helm rollback monkeytown-prod 3

# Check revision history
helm history monkeytown-prod
```

### Uninstall

```bash
# Uninstall (preserves PVCs by default)
helm uninstall monkeytown-dev
```

## Chart Values

### Global Settings

```yaml
global:
  environment: dev          # dev | staging | prod
  imageRegistry: ghcr.io
  imagePullSecrets:
    - name: registry-secret
  
  resources:
    # Production defaults
    cpu: "500m"
    memory: "512Mi"
```

### Web Application

```yaml
web:
  replicaCount: 1
  
  image:
    repository: anomalyco/monkeytown-web
    tag: latest
    pullPolicy: IfNotPresent
  
  service:
    type: ClusterIP
    port: 3000
  
  ingress:
    enabled: true
    className: nginx
    hosts:
      - host: monkeytown.dev
        paths:
          - path: /
            pathType: Prefix
  
  resources:
    requests:
      cpu: 100m
      memory: 128Mi
    limits:
      cpu: 500m
      memory: 512Mi
  
  autoscaling:
    enabled: true
    minReplicas: 1
    maxReplicas: 10
    targetCPUUtilizationPercentage: 70
```

### Event Stream

```yaml
eventStream:
  replicaCount: 2
  
  image:
    repository: anomalyco/monkeytown-event-stream
    tag: latest
  
  env:
    REDIS_URL: redis://monkeytown-redis:6379
    GITHUB_TOKEN: "{{ .Values.secrets.githubToken }}"
  
  resources:
    requests:
      cpu: 100m
      memory: 256Mi
    limits:
      cpu: 500m
      memory: 1Gi
  
  ws:
    maxConnections: 1000
    heartbeatInterval: 30000
```

### Redis

```yaml
redis:
  enabled: true
  
  architecture: standalone  # standalone | replication
  
  master:
    resources:
      requests:
        cpu: 100m
        memory: 256Mi
      limits:
        cpu: 500m
        memory: 512Mi
    
    persistence:
      enabled: true
      size: 1Gi
  
  auth:
    enabled: false  # Enable in production
```

## Dependencies

```yaml
# Chart.yaml
dependencies:
  - name: redis
    version: "17.x.x"
    repository: "https://charts.bitnami.com/bitnami"
    condition: redis.enabled
    alias: monkeytown-redis
  
  - name: nginx-ingress
    version: "4.x.x"
    repository: "https://kubernetes.github.io/ingress-nginx"
    condition: ingress.enabled
```

## Template Helpers

```yaml
# templates/_helpers.tpl
{{- define "monkeytown.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{- define "monkeytown.fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- printf "%s-%s" $name .Values.global.environment | trunc 63 }}
{{- end }}

{{- define "monkeytown.labels" -}}
app.kubernetes.io/name: {{ include "monkeytown.name" . }}
app.kubernetes.io/instance: {{ include "monkeytown.fullname" . }}
app.kubernetes.io/version: {{ .Chart.Version }}
app.kubernetes.io/managed-by: Helm
{{- end }}
```

## CI/CD Integration

### GitHub Actions

```yaml
# .github/workflows/helm-deploy.yml
name: Helm Deploy

on:
  push:
    branches: [main]
    paths:
      - 'helm/**'
      - 'deploy/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Helm lint
        run: helm lint ./helm/monkeytown
      
      - name: Helm template
        run: |
          helm template monkeytown ./helm/monkeytown \
            -f ./helm/monkeytown/values-${{ env.ENVIRONMENT }}.yaml \
            > deployed-manifests.yaml
      
      - name: Deploy to Kubernetes
        uses: azure/k8s-set-context@v4
        with:
          kubeconfig: ${{ secrets.KUBE_CONFIG }}
      
      - name: Helm upgrade
        run: |
          helm upgrade monkeytown ./helm/monkeytown \
            -f ./helm/monkeytown/values-${{ env.ENVIRONMENT }}.yaml \
            --install --wait --atomic
```

## Cross-References

- **Architecture**: `.monkeytown/architecture/infrastructure.md` (service topology)
- **Deploy**: `deploy/` (raw Kubernetes manifests)
- **Terraform**: `terraform/` (cloud infrastructure)
- **Docker**: `infrastructure/Dockerfile` (container images)

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Infrastructure*
