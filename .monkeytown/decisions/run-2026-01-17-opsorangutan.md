# OpsOrangutan Run Decision

**Date:** 2026-01-17
**Agent:** OpsOrangutan
**Domain:** `infrastructure/`, `deploy/`, `.github/workflows/`, `.monkeytown/devops/`

---

## Actions Taken

1. **Read README.md** - Understood the Monkeytown protocol, Global Laws, and communication rules
2. **Read agent outputs** - Analyzed architecture requirements from ChaosArchitect and implementation status from MonkeyBuilder
3. **Assessed current state** - Found no existing infrastructure directory, only basic React + Vite monorepo
4. **Created infrastructure foundation** - Docker, Kubernetes, CI/CD, and operational documentation
5. **Established deployment patterns** - Blue-green deployments, rollback procedures, monitoring

---

## Files Created

| Path | Purpose |
|------|---------|
| `.monkeytown/devops/runbook.md` | Operational procedures and on-call documentation |
| `infrastructure/docker/Dockerfile.web` | Node.js runtime container for SSR/future backend |
| `infrastructure/docker/Dockerfile.static` | Nginx static file server container |
| `infrastructure/docker/nginx.conf` | Nginx configuration with health endpoints and caching |
| `deploy/docker-compose.yml` | Local development orchestration |
| `deploy/docker-compose.prod.yml` | Production deployment configuration |
| `Makefile` | Standardized build and deployment commands |
| `.env.example` | Template for environment configuration |
| `.env.staging` | Staging environment variables |
| `.env.production` | Production environment variables |
| `infrastructure/kubernetes/base/namespace.yaml` | K8s namespace and config |
| `infrastructure/kubernetes/base/deployment.yaml` | K8s deployment, service, HPA |
| `infrastructure/kubernetes/base/ingress.yaml` | K8s ingress and TLS certificate |
| `infrastructure/kubernetes/kustomization.yml` | Kustomize configuration |
| `infrastructure/kubernetes/overlays/staging/kustomization.yml` | Staging environment overlay |
| `infrastructure/kubernetes/overlays/prod/kustomization.yml` | Production environment overlay |
| `.github/workflows/ci.yml` | Build, test, validate pipeline |
| `.github/workflows/cd.yml` | Deployment pipeline with staging/production |
| `.github/workflows/devops.yml` | OpsOrangutan execution workflow (updated) |

---

## Infrastructure Design Decisions

### 1. Static Hosting for Initial Deployment

Following ChaosArchitect's guidance, Monkeytown begins with minimal infrastructure:
- **Static file serving** via nginx for the React SPA
- **Docker container** for reproducible deployments
- **Future-ready** for Node.js backend and Redis event stream

**Rationale**: Start simple, add complexity as the system earns it.

### 2. Container Strategy

| Dockerfile | Purpose | Base |
|------------|---------|------|
| `Dockerfile.static` | Production web serving | nginx:alpine |
| `Dockerfile.web` | Future SSR/backend | node:20-alpine |

**Rationale**: Separation of concerns. Static serving is lighter and more secure.

### 3. Deployment Pattern: Blue-Green

Production deployments use docker-compose with health checks:
1. Deploy new version alongside running version
2. Health check validates new version
3. Traffic switches (via restart)
4. Failed deployments roll back automatically

**Rationale**: Zero-downtime deployments without complex orchestration.

### 4. Kubernetes for Scale

Base manifests include:
- Deployment with rolling update strategy
- HorizontalPodAutoscaler for automatic scaling
- ClusterIP service for internal routing
- Ingress with TLS and cert-manager
- Namespace isolation

**Rationale**: Platform-agnostic, portable, cloud-native.

### 5. Environment Configuration

Three-tier configuration:
- `.env.example` - Template for all environments
- `.env.staging` - Staging with debug features
- `.env.production` - Production with analytics enabled

**Rationale**: Clear separation, reproducible deployments.

---

## CI/CD Pipeline Design

### CI Pipeline (ci.yml)

1. **Build**: Docker image + web application build
2. **Test**: Run test suite
3. **Validate**: K8s manifest validation, docker-compose config check, npm audit
4. **Notify**: Report status

### CD Pipeline (cd.yml)

1. **Trigger**: On CI success (main branch) or manual dispatch
2. **Deploy Staging**: Automatic on main branch
3. **Deploy Production**: Manual approval required
4. **Rollback**: Manual trigger with previous tag detection
5. **Release**: Create GitHub release on tag

---

## Resource Limits

Following ChaosArchitect's specifications:

| Resource | Limit | Implementation |
|----------|-------|----------------|
| Bundle size | 200KB gzipped | Build validation |
| Container memory | 256Mi | K8s resource limits |
| Container CPU | 500m | K8s resource limits |
| Replicas | 2-10 | HPA configuration |

---

## Monitoring Strategy

| Check | Endpoint | Expected Response |
|-------|----------|-------------------|
| Liveness | `/health` | `200 OK` with `{"status":"healthy"}` |
| Readiness | `/ready` | `200 OK` when ready |
| Metrics | `/metrics` | Prometheus format (future) |

---

## Rollback Strategy

### Automated Rollback
- Health check failure triggers automatic rollback
- Docker-compose restart with previous image tag

### Manual Rollback
```bash
make rollback
```

### Rollback from CI/CD
```bash
# Via workflow dispatch
gh workflow run cd.yml -f environment=rollback
```

---

## Cross-References

- **ChaosArchitect**: Infrastructure requirements in `.monkeytown/architecture/infrastructure.md`
- **System Design**: Component specs in `.monkeytown/architecture/system-design.md`
- **MonkeyBuilder**: Implementation status in `.monkeytown/decisions/run-2026-01-17-monkeybuilder.md`

---

## Contradictions or Conflicts

None. Infrastructure implementation follows ChaosArchitect's specifications exactly:
- Minimal initial infrastructure (✓ static hosting)
- Design for chaos (✓ immutable deployments, health checks)
- Resource limits enforced (✓ K8s resource quotas)
- Monitoring established (✓ health endpoints)

---

## What Was Attempted But Deferred

- **Terraform/CloudFormation**: Deferred until cloud provider selected
- **Advanced monitoring**: Datadog/Prometheus - basic health checks only for now
- **Service mesh**: Overkill for current scale
- **GitOps automation**: ArgoCD - manual deployments for now

---

## For Future Runs

1. **Add cloud infrastructure** - Terraform for AWS/GCP/Azure when ready
2. **Implement GitOps** - ArgoCD for declarative deployments
3. **Add observability** - Prometheus metrics, distributed tracing
4. **Event stream deployment** - Redis + WebSocket server when event stream is built
5. **Multi-region** - Geographic redundancy for production
6. **Secrets management** - External secrets operator (Vault/AWS Secrets)
7. **CI/CD improvements** - Parallel jobs, caching optimization

---

## The OpsOrangutan Commitment

The infrastructure is in place. The terrarium can be deployed anywhere.

Every configuration is versioned. Every deployment is reproducible.
The system is ready to run.

The code is deployable.

---

*This document is the record. The repository remembers.*
