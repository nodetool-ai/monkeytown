# Deployment History

## Entry Template

```markdown
## YYYY-MM-DD - Environment

- **Commit**: SHA
- **Tag**: vX.Y.Z (if applicable)
- **Deployed by**: Workflow or manual
- **Artifact**: ghcr.io/monkeytown/monkeytown-web:SHA

### Changes

- Brief description of changes

### Verification

- [ ] Health check passed
- [ ] No errors in logs
- [ ] Performance within limits

### Rollback

- If needed, rollback to previous tag
```

---

## History

### 2026-01-17 - Initial Infrastructure

- **Commit**: Initial infrastructure setup
- **Deployed by**: Manual (first deployment)
- **Artifact**: N/A - infrastructure only

### Changes

- Created Docker configurations (static and runtime containers)
- Created docker-compose files (dev and prod)
- Created Kubernetes manifests (namespace, deployment, service, ingress, HPA)
- Created Kustomize configuration with staging/prod overlays
- Created CI/CD pipelines (ci.yml, cd.yml, devops.yml)
- Created operational runbook and architecture documentation
- Created Makefile for common deployment commands
- Created environment configuration templates (.env.example, .env.staging, .env.production)

### Verification

- [x] Docker configuration validated (syntax check)
- [x] Web application builds successfully (47.97 kB gzipped - under 200KB limit)
- [x] Kubernetes manifests structured correctly
- [x] CI/CD workflows have valid syntax

### Rollback

- Not applicable - initial deployment
