# DevOps Architecture

**OpsOrangutan** | `architecture.md` | Infrastructure Design and Operational Standards

---

## 1. Design Philosophy

### 1.1 Infrastructure as Code

All infrastructure is expressed as version-controlled files. No manual configuration survives repository changes. The repository is the single source of truth for deployment state.

### 1.2 Reproducible Deployments

Every deployment is deterministic. The same commit produces the same artifacts. Environment differences are explicit and auditable.

### 1.3 Defense in Depth

- Health checks at every layer
- Resource limits prevent runaway consumption
- Secrets never enter version control
- Network policies restrict communication

### 1.4 Minimal Viable Infrastructure

Start with the smallest system that works. Complexity is earned through demonstrated need, not assumed in advance.

---

## 2. Infrastructure Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Nginx Static Server                     │    │
│  │  - Serve React SPA                                  │    │
│  │  - Health check endpoints                           │    │
│  │  - Gzip compression                                 │    │
│  │  - Cache headers for assets                         │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATION LAYER                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Docker Compose / K8s                    │    │
│  │  - Container lifecycle                              │    │
│  │  - Service discovery                                │    │
│  │  - Health management                                │    │
│  │  - Resource allocation                              │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      CI/CD LAYER                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              GitHub Actions                          │    │
│  │  - Build pipeline (CI)                              │    │
│  │  - Deployment pipeline (CD)                         │    │
│  │  - Infrastructure automation (OpsOrangutan)         │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     OBSERVABILITY LAYER                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Health Checks & Logs                    │    │
│  │  - Liveness probe (/health)                         │    │
│  │  - Readiness probe (/ready)                         │    │
│  │  - JSON structured logging                          │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Container Architecture

### 3.1 Web Container (Static)

**Base Image**: nginx:alpine

**Responsibilities**:
- Serve static assets from `/usr/share/nginx/html`
- Handle health check requests
- Compress responses (gzip)
- Set cache headers for immutable assets

**Health Check**:
```bash
wget -q --spider http://localhost/health
```

**Resource Profile**:
```yaml
requests:
  cpu: 100m
  memory: 64Mi
limits:
  cpu: 200m
  memory: 128Mi
```

### 3.2 Web Container (Runtime - Future)

**Base Image**: node:20-alpine

**Responsibilities**:
- SSR rendering
- API endpoints
- WebSocket connections

**Resource Profile**:
```yaml
requests:
  cpu: 200m
  memory: 256Mi
limits:
  cpu: 1000m
  memory: 512Mi
```

---

## 4. Deployment Patterns

### 4.1 Blue-Green Deployment

```
Production
    │
    ├───► [Blue Environment] ──► Serving traffic
    │
    └───► [Green Environment] ──► Deploying, testing
           │
           └──► Health check passes
                 │
                 ▼
           Swap traffic (DNS or load balancer)
```

**Implementation**:
```bash
# Deploy to green
docker-compose -f docker-compose.prod.yml -p monkeytown-green up -d

# Validate
curl -f http://localhost/health

# Switch traffic (restart or DNS change)
docker-compose -f docker-compose.prod.yml restart
```

### 4.2 Rolling Update

```
Existing pods: [● ● ● ● ●]
                    │
                    ▼
Deploy:          [● ● ● ● ●] [+]
                 [● ● ● ● ○ ○] (+ new)
                 [● ● ● ○ ○ ○] (terminate old)
                 [● ● ○ ○ ○ ○]
                 [● ○ ○ ○ ○ ○]
                 [○ ○ ○ ○ ○ ○]
Final:           [● ● ● ● ●] (all new)
```

**K8s Configuration**:
```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
```

### 4.3 Canary Deployment (Future)

```
Traffic: [90% Blue] ─────────► [10% Green]
                 │
                 └──► Monitor error rate
                       │
                       ├──► Error rate < 1%: Promote green
                       └──► Error rate > 5%: Rollback
```

---

## 5. Environment Matrix

| Variable | Development | Staging | Production |
|----------|-------------|---------|------------|
| `NODE_ENV` | development | staging | production |
| `VITE_APP_NAME` | Monkeytown Dev | Monkeytown Staging | Monkeytown |
| `VITE_ENABLE_DEBUG` | true | true | false |
| `VITE_BUILD_SOURCEMAP` | true | true | false |
| `VITE_ENABLE_ANALYTICS` | false | true | true |
| Replicas | 1 | 1 | 2-10 |
| Health Check Interval | 10s | 30s | 30s |
| TLS | None | Staging | Production |

---

## 6. Secrets Management

### 6.1 Secrets Hierarchy

```
Git Repository
    │
    ├── .env.example (template)
    ├── .env.staging (non-secret config)
    ├── .env.production (non-secret config)
    │
    └── GitHub Secrets (actual secrets)
            │
            ├── GITHUB_TOKEN
            ├── NEW_RELIC_LICENSE_KEY
            └── (application secrets)
```

### 6.2 Secrets Never In Repository

- API keys
- Database credentials
- OAuth tokens
- Certificate private keys

### 6.3 Secrets Injection

**Docker Compose**:
```yaml
secrets:
  api_key:
    file: ./secrets/api_key.txt
```

**Kubernetes**:
```yaml
envFrom:
  - secretRef:
      name: monkeytown-secrets
```

---

## 7. Monitoring Architecture

### 7.1 Health Endpoints

| Endpoint | Purpose | Response |
|----------|---------|----------|
| `/health` | Liveness | `{"status":"healthy"}` |
| `/ready` | Readiness | `{"status":"ready"}` |
| `/metrics` | Metrics | Prometheus format |

### 7.2 Alerting Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| CPU Usage | > 70% | > 90% | Scale up |
| Memory Usage | > 80% | > 95% | Restart |
| Disk Usage | > 70% | > 85% | Clean up |
| Request Errors | > 1% | > 5% | Investigate |
| Response Time (p99) | > 500ms | > 1s | Optimize |

### 7.3 Logging Standards

- JSON format for machine parsing
- Structured fields: `level`, `timestamp`, `message`, `context`
- Log levels: `debug`, `info`, `warn`, `error`
- Sensitive data never logged

---

## 8. Security Boundaries

### 8.1 Network Isolation

```
Internet
    │
    ▼
┌─────────────────────────────────────────┐
│              Load Balancer               │
│  - TLS termination                      │
│  - Rate limiting                        │
│  - WAF (future)                         │
└─────────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────────┐
│              Web Container               │
│  - No outgoing network (initial)        │
│  - Read-only filesystem                 │
│  - Non-root user                        │
└─────────────────────────────────────────┘
```

### 8.2 Container Security

```dockerfile
# Non-root user
RUN adduser --system --uid 1001 monkeytown
USER monkeytown

# Read-only filesystem (where possible)
# security_opt: [no-new-privileges:true]
```

### 8.3 Secret Storage

- Development: File-based (gitignored)
- CI/CD: GitHub Secrets
- Production: Kubernetes Secrets or external secrets manager

---

## 9. Disaster Recovery

### 9.1 Recovery Procedures

| Scenario | RTO | RPO | Procedure |
|----------|-----|-----|-----------|
| Container crash | 30s | 0 | Auto-restart |
| Deployment failure | 1min | 0 | Automated rollback |
| Region outage | 5min | 0 | Failover to backup |
| Data corruption | 1hr | 24hr | Restore from backup |

### 9.2 Backup Strategy

| Data | Frequency | Retention | Location |
|------|-----------|-----------|----------|
| Docker images | Per deploy | 30 days | GHCR |
| Config files | Continuous | Indefinite | Git |
| Logs | Stream | 7 days | Stdout |
| Builds | Per commit | 7 days | Artifacts |

---

## 10. Cost Management

### 10.1 Current Cost (Phase Alpha)

| Resource | Provider | Monthly Cost |
|----------|----------|--------------|
| Container registry | GHCR | $0 |
| Build minutes | GitHub Actions | $0 |
| Domain | TBD | ~$10/year |
| **Total** | | **~$1/month** |

### 10.2 Cost Controls

- Monitor spend via GitHub billing
- Alert at 2x budget
- Clean up unused images
- Use spot instances for non-production

---

## 11. Cross-References

- **Architecture Spec:** `.monkeytown/architecture/infrastructure.md`
- **System Design:** `.monkeytown/architecture/system-design.md`
- **Runbook:** `.monkeytown/devops/runbook.md`
- **CI Pipeline:** `.github/workflows/ci.yml`
- **CD Pipeline:** `.github/workflows/cd.yml`

---

## 12. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-01-17 | Initial architecture document |

---

*Document Version: 1.0.0*
*OpsOrangutan | Monkeytown Infrastructure*
