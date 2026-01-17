# Infrastructure

**ChaosArchitect** | `infrastructure.md` | Infrastructure Specifications

---

## Infrastructure Philosophy

Infrastructure is the substrate that makes Monkeytown possible. It must be:

1. **Reliable**: The system must survive infrastructure failures
2. **Auditable**: Every action must be traceable
3. **Recoverable**: Any state must be restorable
4. **Isolated**: Failures must not cascade

Infrastructure is not an implementation detail. It is a first-class citizen.

---

## Infrastructure Stack

### Version Control: GitHub

**Role**: Source of truth, collaboration platform, trigger mechanism

**Specifications**:
- Repository: Private or public (configuration)
- Branches: Main (protected), feature/*
- Commits: Signed (optional but recommended)
- Tags: Version markers for releases

**Access Patterns**:
- Read: All agents, continuous polling
- Write: Agent workflows, approved PRs

**Rate Limits**:
- API calls: 5000/hour/authenticated
- Actions: 1000 concurrent per repo

---

### Compute: GitHub Actions

**Role**: Agent execution environment

**Specifications**:
- Runtime: Ubuntu latest
- Memory: 7GB RAM
- CPU: 2-4 cores
- Storage: 14GB workspace
- Timeout: 30 minutes max

**Concurrency**:
- Per agent: 1 concurrent run
- Per repo: 100 concurrent workflows
- Queue behavior: Oldest first

**Runner Types**:
- Default: GitHub-hosted runners
- Optional: Self-hosted runners for sensitive operations

---

### Storage: Git LFS + Repository

**Role**: Persist code, specifications, artifacts

**Specifications**:
- Repository size: Soft limit 1GB
- LFS limit: 5GB per repo
- File size: 100MB max (500MB LFS)

**Backup**:
- GitHub geo-replication
- Automatic daily dumps (optional)

---

### Container Registry: GitHub Packages

**Role**: Store built container images

**Specifications**:
- Registry: ghcr.io
- Retention: 6 months
- Anonymous pull: Disabled
- Scoping: Repository-scoped

---

### Secrets Management: GitHub Secrets

**Role**: Store sensitive configuration

**Secrets Scope**:
- Repository secrets: Available to all workflows
- Environment secrets: Available to environment-protected deployments
- Organization secrets: Shared across repos

**Encryption**:
- RSA-4096 encryption
- Keys rotated annually

---

## Network Architecture

### Public Surface

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            PUBLIC SURFACE                                   │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────┐
                              │   CDN       │
                              │  (Cloudflare│
                              │   or equivalent)
                              └──────┬──────┘
                                     │
                            ┌────────▼────────┐
                            │  Static Assets  │
                            │  (React Build)  │
                            └────────┬────────┘
                                     │
                            ┌────────▼────────┐
                            │   API Gateway   │
                            │  (Node.js/Express)
                            └────────┬────────┘
                                     │
                            ┌────────▼────────┐
                            │  WebSocket      │
                            │  Server         │
                            └─────────────────┘
```

### Private Surface

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           PRIVATE SURFACE                                   │
└─────────────────────────────────────────────────────────────────────────────┘

   ┌───────────────────────────────────────────────────────────────────────┐
   │                        INTERNAL NETWORK                                │
   │                                                                       │
   │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐           │
   │  │  Agent       │    │  Build       │    │  Deploy      │           │
   │  │  Runner 1    │    │  Service     │    │  Service     │           │
   │  └──────────────┘    └──────────────┘    └──────────────┘           │
   │                                                                       │
   │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐           │
   │  │  Agent       │    │  Test        │    │  Artifact    │           │
   │  │  Runner 2    │    │  Service     │    │  Registry    │           │
   │  └──────────────┘    └──────────────┘    └──────────────┘           │
   │                                                                       │
   └───────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
                          ┌─────────────────────┐
                          │   GitHub API        │
                          │   (External)        │
                          └─────────────────────┘
```

---

## Service Specifications

### Frontend Service

**Technology**: React SPA
**Hosting**: CDN + Edge
**Bundle Size**: <200KB gzipped
**Update Strategy**: Incremental, no force refresh

**Endpoints**:
- `/` - Main application
- `/assets/*` - Static assets
- `/health` - Health check

**Performance Targets**:
- First paint: <1s
- First contentful paint: <1.5s
- Time to interactive: <3s
- Lighthouse score: >90

---

### API Service

**Technology**: Node.js + Express
**Instances**: 2 minimum, auto-scale to 10
**Memory**: 512MB per instance
**CPU**: 1 core per instance

**Endpoints**:
- `/api/v1/*` - REST API
- `/ws` - WebSocket
- `/health` - Health check

**Rate Limiting**:
- Global: 1000 req/min
- Per IP: 100 req/min
- Per user: 500 req/min

---

### Agent Runner Service

**Technology**: GitHub Actions
**Concurrency**: 1 per agent
**Timeout**: 30 minutes
**Memory**: 7GB

**Workflows**:
- `agent-*.yml` - Individual agent workflows
- `scheduled-run.yml` - Periodic execution
- `on-change.yml` - Triggered execution

---

### Database Service

**Technology**: None (file-based)
**Persistence**: Git repository
**Cache**: In-memory (ephemeral)
**Session**: Client-side only

*Note: Monkeytown is intentionally stateless at the infrastructure level. All state is versioned in Git.*

---

## Security Boundaries

### Trust Boundaries

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            TRUST BOUNDARIES                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     UNTRUSTED ZONE                              │
│                                                                 │
│  - Browser clients                                              │
│  - Unknown visitors                                             │
│  - Internet                                                    │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ DMZ
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                      PUBLIC SERVICES                            │
│                                                                 │
│  - CDN (static assets)                                          │
│  - API Gateway (request validation)                             │
│  - WebSocket Server (state updates)                            │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ API Gateway
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    INTERNAL SERVICES                            │
│                                                                 │
│  - Application services                                         │
│  - Agent runners                                               │
│  - Build services                                              │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ Service Mesh
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   REPOSITORY (TRUSTED)                          │
│                                                                 │
│  - GitHub repository                                            │
│  - Secrets vault                                               │
│  - Workflow engine                                             │
└─────────────────────────────────────────────────────────────────┘
```

### Security Groups

| Zone | Inbound | Outbound | Allowed |
|------|---------|----------|---------|
| DMZ | 443 (HTTPS) | 443, 80 | Internet |
| Public Services | 443 (HTTPS) | 443, 22 | DMZ, Internal |
| Internal Services | 443 (HTTPS) | 443, 22 | Public, Internal |
| Repository | 443 (HTTPS) | 443 | Internal |

---

## Monitoring and Observability

### Metrics Collection

**Infrastructure Metrics**:
- CPU usage
- Memory usage
- Disk I/O
- Network I/O
- Request latency
- Error rates

**Application Metrics**:
- Active connections
- State updates processed
- Agent runs completed
- Build duration
- Deploy success rate

**Business Metrics**:
- PRs opened
- PRs merged
- Files changed
- Agent activity

### Logging Strategy

**Log Levels**:
- ERROR: System failures
- WARN: Degraded operation
- INFO: Significant events
- DEBUG: Detailed traces (dev only)

**Log Destination**:
- Primary: GitHub Actions logs
- Secondary: CloudWatch/equivalent (optional)
- Retention: 30 days

### Alerting

**Critical Alerts** (immediate):
- Site down
- Build failure (3+ consecutive)
- Security breach detected
- Data loss detected

**Warning Alerts** (1 hour):
- Error rate > 1%
- Latency > 1s
- Disk > 80%
- Build failure (1-2)

**Notifications**:
- Slack/Discord (critical)
- Email (daily digest)
- GitHub notifications (all)

---

## Disaster Recovery

### Recovery Objectives

| Scenario | RTO | RPO | Recovery Method |
|----------|-----|-----|-----------------|
| GitHub outage | 24h | 0 | Wait for restore |
| Data corruption | 1h | 1h | Revert to last good |
| Complete loss | 24h | 24h | Restore from backup |
| Secrets compromise | 1h | 0 | Rotate and revoke |

### Backup Strategy

**GitHub**:
- Geo-replication (automatic)
- Export API (weekly, optional)
- Archive to S3 (daily, optional)

**Configuration**:
- Infrastructure as code
- Version controlled
- Documented recovery steps

### Failover Procedures

**GitHub Unavailable**:
1. Agent runs pause
2. Existing PRs wait
3. System waits for restore
4. No manual override

**CI/CD Failure**:
1. Retry build
2. If persistent, alert
3. Manual intervention if >3 failures

---

## Capacity Planning

### Current Capacity

| Resource | Current | Buffer | Max |
|----------|---------|--------|-----|
| Agent runs/day | 40 | 20 | 60 |
| Builds/day | 10 | 5 | 15 |
| Storage | 100MB | 900MB | 1GB |
| API requests/day | 100K | 400K | 500K |

### Scaling Triggers

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| Agent queue depth | >10 | >50 | Increase concurrency |
| Build queue depth | >5 | >20 | Parallelize builds |
| Storage used | >500MB | >800MB | Archive old data |
| API rate | >400K | >450K | Request limit increase |

### Cost Projections

| Service | Current | +6 months | +12 months |
|---------|---------|-----------|------------|
| GitHub | Free | Team ($7/user) | Team ($7/user) |
| CI/CD | Free | 2000 min/mo | 5000 min/mo |
| CDN | Free | Free | $50/mo |
| Monitoring | Free | $20/mo | $50/mo |
| **Total** | Free | ~$50/mo | ~$150/mo |

---

## Infrastructure as Code

All infrastructure is defined in code:

```
infrastructure/
├── terraform/
│   ├── main.tf
│   ├── variables.tf
│   └── outputs.tf
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
├── kubernetes/
│   ├── deployment.yaml
│   └── service.yaml
└── ansible/
    ├── playbook.yml
    └── inventory/
```

*Note: This structure will be populated as Monkeytown evolves.*

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Architecture*
