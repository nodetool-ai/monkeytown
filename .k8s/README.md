# Kustomize Overlays

**ChaosArchitect** | `.k8s/` | Kubernetes Configuration Overlays

---

## Purpose

This directory contains Kustomize overlays for environment-specific Kubernetes
configurations. Overlays modify base manifests in `deploy/` for different
environments (development, staging, production).

## Directory Structure

```
.k8s/
├── base/                       # Base configurations (symlink to deploy/)
│   └── kustomization.yaml
├── overlays/
│   ├── development/
│   │   ├── kustomization.yaml
│   │   ├── configmap.yaml
│   │   └── replicas.yaml
│   ├── staging/
│   │   ├── kustomization.yaml
│   │   ├── configmap.yaml
│   │   ├── resources.yaml
│   │   └── hpa.yaml
│   └── production/
│       ├── kustomization.yaml
│       ├── configmap.yaml
│       ├── resources.yaml
│       ├── hpa.yaml
│       └── pdb.yaml
```

## Usage

```bash
# Apply development overlay
kubectl apply -k .k8s/overlays/development/

# Apply staging overlay
kubectl apply -k .k8s/overlays/staging/

# Apply production overlay
kubectl apply -k .k8s/overlays/production/

# View generated manifests
kubectl kustomize .k8s/overlays/development/
```

---

## Development Overlay

```yaml
# .k8s/overlays/development/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namePrefix: monkeytown-dev-

namespace: monkeytown-dev

commonLabels:
  environment: development
  app.kubernetes.io/managed-by: kustomize

resources:
  - ../../deploy

configMapGenerator:
  - name: monkeytown-config
    behavior: replace
    literals:
      - NODE_ENV=development
      - LOG_LEVEL=debug
      - EVENT_BUFFER_SIZE=10000
      - METRICS_ENABLED=false
      - ENABLE_RATE_LIMITING=false

patches:
  - target:
      kind: Deployment
      labelSelector: app.kubernetes.io/component=web
    patch: |
      - op: replace
        path: /spec/replicas
        value: 1
  - target:
      kind: Deployment
      labelSelector: app.kubernetes.io/component=event-stream
    patch: |
      - op: replace
        path: /spec/replicas
        value: 1

images:
  - name: ghcr.io/anomalyco/monkeytown
    newTag: latest
```

```yaml
# .k8s/overlays/development/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: monkeytown-config
  namespace: monkeytown-dev
data:
  VITE_API_URL: "http://localhost:8080"
  VITE_WS_URL: "ws://localhost:8080"
```

```yaml
# .k8s/overlays/development/replicas.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: monkeytown-web
  namespace: monkeytown-dev
spec:
  replicas: 1
```

---

## Staging Overlay

```yaml
# .k8s/overlays/staging/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namePrefix: monkeytown-staging-

namespace: monkeytown-staging

commonLabels:
  environment: staging
  app.kubernetes.io/managed-by: kustomize

resources:
  - ../../deploy

configMapGenerator:
  - name: monkeytown-config
    behavior: replace
    literals:
      - NODE_ENV=staging
      - LOG_LEVEL=info
      - EVENT_BUFFER_SIZE=50000
      - METRICS_ENABLED=true
      - ENABLE_RATE_LIMITING=true
      - RATE_LIMIT_WINDOW=60
      - RATE_LIMIT_MAX=1000

patches:
  - target:
      kind: Deployment
    patch: |
      - op: replace
        path: /spec/replicas
        value: 2
      - op: add
        path: /spec/template/spec/containers/0/resources/requests/cpu
        value: 100m
      - op: add
        path: /spec/template/spec/containers/0/resources/requests/memory
        value: 256Mi

images:
  - name: ghcr.io/anomalyco/monkeytown
    newTag: staging-$(shell git rev-parse --short HEAD)
```

```yaml
# .k8s/overlays/staging/resources.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: monkeytown-web
  namespace: monkeytown-staging
spec:
  template:
    spec:
      containers:
        - name: web
          resources:
            requests:
              cpu: 100m
              memory: 256Mi
            limits:
              cpu: 500m
              memory: 512Mi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: monkeytown-event-stream
  namespace: monkeytown-staging
spec:
  template:
    spec:
      containers:
        - name: event-stream
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 1000m
              memory: 1Gi
```

```yaml
# .k8s/overlays/staging/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: monkeytown-web
  namespace: monkeytown-staging
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: monkeytown-web
  minReplicas: 2
  maxReplicas: 5
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

---

## Production Overlay

```yaml
# .k8s/overlays/production/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namePrefix: monkeytown-prod-

namespace: monkeytown-prod

commonLabels:
  environment: production
  app.kubernetes.io/managed-by: kustomize

resources:
  - ../../deploy

configMapGenerator:
  - name: monkeytown-config
    behavior: replace
    literals:
      - NODE_ENV=production
      - LOG_LEVEL=warn
      - EVENT_BUFFER_SIZE=100000
      - METRICS_ENABLED=true
      - ENABLE_RATE_LIMITING=true
      - RATE_LIMIT_WINDOW=60
      - RATE_LIMIT_MAX=100
      - WS_MAX_CONNECTIONS=1000
      - WS_HEARTBEAT_INTERVAL=30000

secretGenerator:
  - name: monkeytown-secrets
    behavior: replace
    literals:
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - MINIMAX_API_KEY=${MINIMAX_API_KEY}
      - REDIS_PASSWORD=${REDIS_PASSWORD}

patches:
  - target:
      kind: Deployment
    patch: |
      - op: replace
        path: /spec/replicas
        value: 3
      - op: add
        path: /spec/strategy
        value:
          type: RollingUpdate
          rollingUpdate:
            maxSurge: 1
            maxUnavailable: 0

images:
  - name: ghcr.io/anomalyco/monkeytown
    newTag: prod-$(shell git rev-parse --short HEAD)
```

```yaml
# .k8s/overlays/production/resources.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: monkeytown-web
  namespace: monkeytown-prod
spec:
  template:
    spec:
      containers:
        - name: web
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 1000m
              memory: 1Gi
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
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: monkeytown-event-stream
  namespace: monkeytown-prod
spec:
  template:
    spec:
      containers:
        - name: event-stream
          resources:
            requests:
              cpu: 500m
              memory: 1Gi
            limits:
              cpu: 2000m
              memory: 2Gi
```

```yaml
# .k8s/overlays/production/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: monkeytown-web
  namespace: monkeytown-prod
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: monkeytown-web
  minReplicas: 3
  maxReplicas: 20
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
        - type: Percent
          value: 10
          periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
        - type: Percent
          value: 100
          periodSeconds: 15
```

```yaml
# .k8s/overlays/production/pdb.yaml
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: monkeytown-web
  namespace: monkeytown-prod
spec:
  minAvailable: 2
  selector:
    matchLabels:
      app.kubernetes.io/name: monkeytown-web
---
apiVersion: policy/v1
kind: PodDisruptionBudget
metadata:
  name: monkeytown-event-stream
  namespace: monkeytown-prod
spec:
  minAvailable: 1
  selector:
    matchLabels:
      app.kubernetes.io/name: monkeytown-event-stream
```

---

## Cross-References

- **Deploy**: `deploy/` (base Kubernetes manifests)
- **Helm**: `helm/` (Helm charts)
- **Terraform**: `terraform/` (cloud infrastructure)
- **Architecture**: `.monkeytown/architecture/infrastructure.md` (service topology)

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Infrastructure*
