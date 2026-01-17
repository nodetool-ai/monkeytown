# DevOps & Infrastructure Runbook

**Owner:** OpsOrangutan
**Domain:** `.monkeytown/devops/`, `infrastructure/`, `deploy/`

---

## Purpose

This directory contains infrastructure-as-code, deployment configurations, and operational runbooks for Monkeytown. It serves as the single source of truth for deployment procedures and on-call documentation.

---

## Directory Structure

```
.monkeytown/devops/
├── runbook.md              # This file - operational procedures
├── architecture.md         # Infrastructure design decisions
└── deployment-history/     # Record of deployments

infrastructure/
├── docker/
│   ├── Dockerfile.web      # Web application container
│   └── Dockerfile.ci       # CI/CD build container
├── kubernetes/
│   ├── base/               # Base K8s manifests
│   └── overlays/           # Environment-specific overlays
└── terraform/              # Cloud infrastructure (future)

deploy/
├── docker-compose.yml      # Local development orchestration
├── docker-compose.prod.yml # Production deployment
└── kustomization.yml       # Kustomize configuration

.github/
└── workflows/
    ├── devops.yml          # OpsOrangutan execution
    ├── ci.yml              # Build and test pipeline
    └── cd.yml              # Deployment pipeline
```

---

## Environments

| Environment | Purpose | URL | Status |
|-------------|---------|-----|--------|
| Development | Local testing | localhost:5173 | Active |
| Staging     | Integration testing | TBD | Planned |
| Production  | Live system | TBD | Planned |

---

## Quick Reference

### Build the Web Application

```bash
# Local development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Docker Operations

```bash
# Build web image
docker build -f infrastructure/docker/Dockerfile.web -t monkeytown-web:latest .

# Run with docker-compose
docker-compose -f deploy/docker-compose.yml up -d

# Production deployment
docker-compose -f deploy/docker-compose.prod.yml up -d
```

### Deployment Commands

```bash
# Full deployment
make deploy

# Rollback to previous version
make rollback

# Check deployment status
make status
```

---

## Deployment Procedures

### 1. Zero-Downtime Deployment (Blue-Green)

1. Deploy new version to "green" environment
2. Run smoke tests against green
3. Switch traffic from "blue" to "green"
4. Monitor for 5 minutes
5. If healthy: decommission blue
6. If unhealthy: rollback to blue

### 2. Emergency Rollback

```bash
# Immediate rollback
make rollback-now

# This restores the previous Docker image tag
# and restarts containers with zero downtime
```

### 3. Configuration Updates

```bash
# Update environment variables
./deploy/update-config.sh prod

# This reloads configuration without restart
# for dynamically configurable values
```

---

## Monitoring Endpoints

| Endpoint | Purpose | Expected Response |
|----------|---------|-------------------|
| `/health` | Basic health check | `200 OK` with `{status: "healthy"}` |
| `/ready` | Readiness probe | `200 OK` when ready to serve |
| `/metrics` | Prometheus metrics | Raw Prometheus format |

---

## Alerting Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| CPU Usage | > 70% | > 90% | Scale up or investigate |
| Memory Usage | > 80% | > 95% | Restart pods or scale |
| Request Latency (p99) | > 500ms | > 1s | Profile and optimize |
| Error Rate | > 1% | > 5% | Investigate errors |
| Disk Usage | > 70% | > 85% | Clean up or expand |

---

## On-Call Procedures

### P1 - Critical (System Down)

1. Acknowledge alert within 5 minutes
2. Check deployment status: `make status`
3. If recent deployment: rollback immediately
4. Check logs: `make logs-tail`
5. Escalate if not resolved within 15 minutes

### P2 - High (Degraded Service)

1. Acknowledge alert within 15 minutes
2. Investigate root cause
3. Apply fix or rollback
4. Document incident

### P3 - Warning (Degraded Experience)

1. Triage during business hours
2. Schedule fix for next sprint
3. Monitor for escalation

---

## Rollback Procedure

### Automated Rollback

```bash
make rollback
```

This will:
1. Stop current containers
2. Restore previous image tag
3. Start containers
4. Run health check
5. Report status

### Manual Rollback

```bash
# Identify previous version
docker images | grep monkeytown-web

# Restore specific version
docker tag monkeytown-web:<previous-sha> monkeytown-web:current

# Restart
docker-compose -f deploy/docker-compose.prod.yml restart
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check container logs
docker logs monkeytown-web

# Check resource limits
docker stats

# Verify environment
docker exec monkeytown-web env | grep -E "NODE|REACT|VITE"
```

### Build Fails

```bash
# Clear build cache
npm run clean

# Verify Node version
node --version  # Should match package.json engines

# Check dependency tree
npm ls --depth=0
```

### Health Check Failing

```bash
# Test locally
curl http://localhost:3000/health

# Check container health
docker inspect --format='{{.State.Health.Status}}' monkeytown-web
```

---

## Security Considerations

- **Secrets:** Never commit secrets. Use GitHub Secrets or environment variables.
- **Images:** All images built from checked-in Dockerfiles.
- **Dependencies:** Audit dependencies regularly with `npm audit`.
- **Network:** Follow least-privilege network policies.
- **Access:** Minimal required permissions for CI/CD roles.

---

## Cost Management

- **Development:** Local Docker (free)
- **Staging:** Ephemeral deployments, cleaned up automatically
- **Production:** Monitor spend, alert at 2x budget

Current monthly estimates:
- Vercel Free: $0
- GitHub Actions Free: $0
- Docker Hub: $0
- **Total:** $0

---

## Cross-References

- **Architecture:** `.monkeytown/architecture/infrastructure.md`
- **System Design:** `.monkeytown/architecture/system-design.md`
- **Build Pipeline:** `.github/workflows/ci.yml`
- **Current Implementation:** `.monkeytown/decisions/run-2026-01-17-monkeybuilder.md`

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-17 | Initial runbook creation |

---

*Document Version: 1.0.0*
*OpsOrangutan | Monkeytown Infrastructure*
