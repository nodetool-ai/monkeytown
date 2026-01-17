# Infrastructure

**ChaosArchitect** | `infrastructure.md` | Deployment, Services, and Operations

---

## 1. Infrastructure Philosophy

### 1.1 Minimal Viable Infrastructure

Monkeytown begins with the smallest infrastructure that supports the protocol. Complexity is earned, not assumed.

| Component | Initial | Future (Phase Emergence) |
|-----------|---------|----------------------|
| Web serving | Static hosting | CDN + edge caching |
| Real-time | In-memory | Redis pub/sub |
| Persistence | Git-only (stateless) | PostgreSQL + S3 |
| Auth | None (anonymous) | OAuth + token management |
| Monitoring | Basic logging | Distributed tracing |

**Principle**: The repository is the only memory. Infrastructure is just an interface to the repository.

### 1.2 Design for Chaos

Infrastructure must survive:
- Agent crashes and restarts (normal operation)
- Network partitions (expected)
- Witness connection drops (common)
- Traffic spikes from human filtering (frequent)
- Complete infrastructure failure (survivable)

### 1.3 Immutable Deployments

No in-place updates. Every deployment creates new resources.

```
Version N    Version N+1
    │            │
    └──► Replace ──►
         (blue-green)
```

### 1.4 Chaos Is Fuel

MadChimp's disruptions are not failures to prevent. They are opportunities to prove resilience. Infrastructure should fail gracefully and recover automatically.

---

## 2. Service Topology

### 2.1 Current Topology (Genesis Phase)

```
                     ┌─────────────────────────────────────────────┐
                     │              INTERNET                        │
                     └─────────────────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         STATIC HOSTING (Vercel/Netlify)                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │   Web SPA   │  │   Assets    │  │   Config    │  │  Fallback   │    │
│  │ (Terrarium) │  │   (static)  │  │   (json)    │  │  (index)    │    │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘    │
└─────────────────────────────────────────────────────────────────────────┘
                                         │
                          ┌──────────────┴──────────────┐
                          │                             │
                          ▼                             ▼
             ┌─────────────────────┐       ┌─────────────────────┐
             │  EVENT STREAM       │       │   AGENT RUNTIME     │
             │  (In-Memory)        │       │  (GitHub Actions)   │
             │  - Witnesses read   │       │  - Agents read      │
             │  - Real-time updates│       │  - Agents write     │
             └─────────────────────┘       └─────────────────────┘
                          │                             │
                          │                             │
                          └──────────┬──────────────────┘
                                     │
                                     ▼
                        ┌────────────────────────┐
                        │   GIT REPOSITORY       │
                        │   (Single Source of    │
                        │    Truth)              │
                        └────────────────────────┘
```

### 2.2 Service Responsibilities

| Service | Responsibility | Failure Mode |
|---------|----------------|--------------|
| Static Hosting | Serve web assets | Cached fallback |
| Event Stream | Broadcast events to witnesses | In-memory (data loss on restart, acceptable) |
| Agent Runtime | Execute agent runs | Skip run, retry next cycle |
| Git Repository | Store events, persist files | Offline reads, queued writes |

### 2.3 Communication Paths

```
WITNESS BROWSER
      │
      ├──► HTTPS ──► Static Hosting (GET /assets/*)
      │
      ├──► WSS ──► Event Stream (subscribe)
      │
      └──► HTTPS ──► Event Stream (REST fallback)

GITHUB ACTIONS (AGENT RUNTIME)
      │
      ├──► HTTPS ──► GitHub API (read repo, write files)
      │
      ├──► HTTPS ──► Event Stream (publish events)
      │
      └──► HTTPS ──► External APIs (research, etc.)
```

**Key Constraint**: Agents communicate only through files. No direct API calls between agents.

### 2.4 Agent Folder Structure

Each agent owns its domain. Infrastructure supports this through GitHub Actions workflows.

```
.github/workflows/
├── founderai.yml      # FounderAI runs
├── chaosarchitect.yml # ChaosArchitect runs
├── simianresearcher.yml
├── primatedesigner.yml
├── bananaeconomist.yml
├── junglesecurity.yml
├── chaostester.yml
├── madchimp.yml
└── monkeybuilder.yml
```

Each workflow:
- Runs on schedule (every 4 hours minimum)
- Can be dispatched manually
- Reads repository
- Writes to agent's domain
- Opens PR for human filtering

---

## 3. Deployment Architecture

### 3.1 Web Deployment

**Platform**: Vercel or Netlify (TBD by MonkeyBuilder)

**Configuration**:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "routes": [
    { "src": "/.*", "dest": "/index.html" }
  ]
}
```

**Caching Strategy**:
- Assets: Immutable (content-hashed)
- HTML: No-cache (always validate)
- API: CDN-cacheable (60s TTL)

### 3.2 Agent Deployment

**Platform**: GitHub Actions

**Workflow Pattern**:
```yaml
name: ChaosArchitect Run
on:
  schedule:
    - cron: '0 */4 * * *'  # Every 4 hours
  workflow_dispatch:

jobs:
  architect:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install && npm run architect
      - uses: peter-evans/create-pull-request@v6
        with:
          title: "Architecture update"
          commit-message: "Architecture update"
```

**Failure Handling**:
- Step fails → Run fails
- Run fails → Alert logged
- PR not created → No merge, no persistence

**Key Principle**: Agents produce or they don't. Failure to produce is not an error—it's just silence.

### 3.3 Event Stream Deployment

**Initial**: In-memory (process-local)

**Future**: Redis or similar

```
Single process:
  - Fast (no network)
  - No persistence (data loss on restart, acceptable)
  - Single point of failure (acceptable for Genesis)

Redis cluster:
  - Persistent (AOF)
  - Replicated (no single point of failure)
  - Pub/sub for real-time
```

### 3.4 Disaster Recovery

**Recovery Objectives**:

| Scenario | RTO | RPO | Recovery Action |
|----------|-----|-----|-----------------|
| Event stream crash | 5 min | 0 | Restart/redeploy |
| GitHub unavailable | 6 hours | 0 | Wait, queued writes |
| Database corruption | 1 hour | 24h | Restore from backup |
| Region outage | 1 day | 1 day | Failover to backup |

**Backup Strategy**:

| Data | Frequency | Retention | Location |
|------|-----------|-----------|----------|
| Git repository | Continuous | Indefinite | GitHub |
| Event stream | N/A (in-memory) | 0 | None (acceptable) |
| LocalStorage | Session | 0 | Browser |
| Build artifacts | Per deploy | 30 days | CDN |

**Incident Response**:

```
Incident detected
       │
       ▼
   Assess impact
       │
       ▼
   ┌───────────┐
   │ Critical? │──YES──► Call team, begin recovery
   └─────┬─────┘
         │ NO
         ▼
   Log incident
       │
       ▼
   Schedule repair
       │
       ▼
   Post-mortem (document in .monkeytown/decisions/)
```

---

## 4. Network Configuration

### 4.1 Allowed Outbound

| Destination | Purpose | Protocol |
|-------------|---------|----------|
| github.com | Repository access | HTTPS |
| api.github.com | GitHub API | HTTPS |
| (No external services) | Isolation | N/A |

**Principle**: Agents cannot reach external services except GitHub. All data must flow through the repository.

### 4.2 Inbound Access

| Endpoint | Access | Auth |
|----------|--------|------|
| Web app | Public | None |
| WebSocket | Public | Token (future) |
| REST API | Public | Token (future) |

### 4.3 Firewall Rules

```
WITNESS → INTERNET: ALLOW (HTTPS, WSS)
AGENT → GITHUB: ALLOW (HTTPS)
INTERNET → INTERNAL: DENY (no inbound services)
```

---

## 5. Resource Limits

### 5.1 Witness (Browser)

| Resource | Limit | Enforcement |
|----------|-------|-------------|
| Bundle size | 200KB gzipped | Build step |
| LocalStorage | 5MB | Quota API |
| Concurrent WebSockets | 1 | Browser limit |
| Concurrent flows | 50 | Application logic |

### 5.2 Agent (GitHub Action)

| Resource | Limit | Enforcement |
|----------|-------|-------------|
| Runtime | 6 hours | GitHub limit |
| Output files | 10MB | Validation |
| API calls | 1000/hour | Rate limiting |
| Storage | Repository size | GitHub limit |

### 5.3 Event Stream

| Resource | Limit | Enforcement |
|----------|-------|-------------|
| Subscribers | 1000 | Connection limit |
| Events/second | 10000 | Rate limiting |
| Message size | 16KB | Validation |
| Buffer size | 1M events | Ring buffer |

---

## 6. Scaling Vectors

### 6.1 Horizontal Scaling (Witnesses)

**Problem**: 10,000 witnesses connecting simultaneously

**Solution**: Connection sharding by witness ID

```
Witness A  ─┐
Witness B  ─┼─► Shard 1
Witness C  ─┘

Witness D  ─┐
Witness E  ─┼─► Shard 2
Witness F  ─┘
```

**Migration**:
1. Witness ID modulo shard count
2. Each shard is independent event stream
3. Witnesses reconnect to assigned shard

### 6.2 Vertical Scaling (Agents)

**Problem**: Agent runs take > 6 hours

**Solution**: Agent state persistence in Git

```
Run interrupted ──► State saved to Git
                       │
                       ▼
                Next run ──► State loaded from Git
                              │
                              ▼
                        Continue execution
```

**Implementation**: Checkpoint every meaningful operation

### 6.3 Storage Scaling

**Problem**: Git repository too large for efficient cloning

**Solution**: Shallow clones + incremental updates

```
Standard clone: 100MB
Shallow clone:  5MB
Incremental:    +1MB/run
```

**Migration**:
1. GitHub Actions uses `fetch-depth: 1`
2. Agents only fetch needed files
3. Large binary assets → S3 (future)

---

## 7. Monitoring

### 7.1 Observability Stack

| Tool | Purpose | Implementation |
|------|---------|----------------|
| Logs | Debugging | JSON to stdout |
| Metrics | Performance | Counters, gauges |
| Traces | Request flow | Correlation IDs |

### 7.2 Key Metrics

| Metric | Source | Alert Threshold |
|--------|--------|-----------------|
| Active witnesses | Event stream | Drop > 50% |
| Agent run success | GitHub Actions | < 95% |
| Event latency | Event stream | > 500ms p99 |
| WebSocket connections | Event stream | < 10 for 1 hour |
| Bundle size | Build | > 250KB |

### 7.3 Alerting

**Priority 1 (Critical)**: System down
- No events for 5 minutes
- All agents failing

**Priority 2 (High)**: Degraded service
- Latency > 1s
- Error rate > 5%

**Priority 3 (Warning)**: Degraded experience
- Bundle size growing
- Agent runs taking longer

---

## 8. Security Boundaries

### 8.1 Threat Model

| Threat | Mitigation |
|--------|------------|
| Malicious agent code | Sandboxed execution (GitHub Actions) |
| Witness data leak | Witness isolation (no cross-witness state) |
| Event stream injection | Source validation (agents only) |
| DOS attack | Rate limiting, connection limits |

### 8.2 Isolation Levels

```
WITNESS 1 ──┐
            │     NO CROSS-WATCH STATE
WITNESS 2 ──┼────────────────────────────► [ISOLATED]
            │
WITNESS 3 ──┘

AGENT A ──┐
          │     NO CROSS-AGENT STATE
AGENT B ──┼────────────────────────────► [ISOLATED]
          │
AGENT C ──┘

EVENT STREAM ───────────────────────────► [SHARED, VALIDATED]
```

### 8.3 Data Classification

| Data | Classification | Handling |
|------|----------------|----------|
| Witness actions | Private | Browser-local only |
| Agent outputs | Public | Repository (committed) |
| System metrics | Internal | Event stream |
| Secrets | Confidential | GitHub secrets |

---

## 9. Cost Model

### 9.1 Initial Cost (Phase Genesis)

| Resource | Provider | Monthly Cost |
|----------|----------|--------------|
| Web hosting | Vercel Free | $0 |
| GitHub Actions | Free tier | $0 |
| Domain | Namecheap | ~$10/year |
| **Total** | | **~$1/month** |

### 9.2 Future Cost (Phase Emergence)

| Resource | Provider | Estimated Monthly Cost |
|----------|----------|------------------------|
| Web hosting | Vercel Pro | $20 |
| GitHub Actions | Paid tier | $50 |
| Redis | Upstash | $15 |
| Monitoring | Datadog | $50 |
| CDN bandwidth | Cloudflare | $10 |
| **Total** | | **~$145/month** |

### 9.3 Cost Controls

- Alerts when monthly spend > 2x budget
- Review all paid services quarterly
- Abandon expensive services if not justifying value
- Never spend on what the repository can provide

---

## 10. Cross-References

- **System**: `.monkeytown/architecture/system-design.md` (infrastructure contracts)
- **System**: `.monkeytown/devops/runbook.md` (emergency procedures)
- **Infrastructure**: `infrastructure/docker-compose.yml` (local development)
- **Infrastructure**: `infrastructure/Dockerfile*` (container images)
- **Deploy**: `deploy/kustomization.yaml` (Kubernetes deployment)
- **Deploy**: `deploy/*.yaml` (Kubernetes manifests)
- **Config**: `.env.example` (environment configuration)
- **Product**: `.monkeytown/product/requirements.md` (availability requirements)
- **Security**: `.monkeytown/security/` (threat modeling, TBD by JungleSecurity)
- **Vision**: `.monkeytown/vision/manifesto.md` (autonomy is the only value)
- **Vision**: `.monkeytown/vision/roadmap.md` (phases: Genesis, Emergence, Civilization)

---

*Document Version: 1.2.0*
*ChaosArchitect | Monkeytown Architecture*
