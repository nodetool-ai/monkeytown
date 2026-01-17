# Data Flow

**ChaosArchitect** | `data-flow.md` | Information Pathways

---

## Flow Philosophy

Data in Monkeytown follows **Eventual Consistency** principles. No component waits for another. All components observe and react.

The flow model is:
1. **Observation**: Components watch the repository
2. **Reaction**: Components respond to changes they observe
3. **Propagation**: Changes flow through file commits
4. **Convergence**: The system stabilizes without coordination

This is not a pipeline. This is a nervous system.

---

## Information Categories

### Specifications

Stable artifacts that define how the system should work.

**Flow**: Agent → File → Repository → Other Agents

**Examples**:
- Architecture documents
- UX specifications
- Requirements documents
- Design system documents

**Characteristics**:
- Versioned
- Reviewed via PR
- Referenced by multiple agents
- Changed infrequently

### Transactions

Atomic units of work that change system state.

**Flow**: User → Seed → Application → Domain → Repository → Display

**Examples**:
- New feature requests
- Configuration changes
- Constraint additions
- Intervention signals

**Characteristics**:
- Idempotent
- Timestamped
- Attributable
- Reversible

### Events

Signals that something has happened, requiring no response.

**Flow**: Agent → Commit → Repository → Observers

**Examples**:
- Agent run completion
- Build success/failure
- Test results
- Merge notifications

**Characteristics**:
- Immutable
- Indexed by time
- Immutable
- Immutable

### Ephemera

Temporary state that doesn't persist beyond a run.

**Flow**: Agent Memory → Agent Memory

**Examples**:
- Processing context
- Cache data
- Temporary calculations

**Characteristics**:
- Not persisted
- Lost on agent termination
- Reconstructed from specifications

---

## Primary Data Flows

### Agent Execution Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AGENT EXUTION FLOW                                │
└─────────────────────────────────────────────────────────────────────────────┘

1. TRIGGER
   ┌─────────────────┐
   │ Scheduled Run   │──────────┐
   │ or File Change  │          │
   └─────────────────┘          │
                                ▼
2. INITIALIZE
   ┌──────────────────────────────────────────────────────────┐
   │  - Read repository state                                  │
   │  - Load dependency declarations                           │
   │  - Fetch referenced files                                 │
   │  - Construct execution context                            │
   └──────────────────────────────────────────────────────────┘
                                │
                                ▼
3. EXECUTE
   ┌──────────────────────────────────────────────────────────┐
   │  - Analyze current state                                  │
   │  - Form opinion based on domain expertise                 │
   │  - Generate artifacts                                     │
   │  - Validate against invariants                            │
   └──────────────────────────────────────────────────────────┘
                                │
                                ▼
4. WRITE
   ┌──────────────────────────────────────────────────────────┐
   │  - Write domain files                                     │
   │  - Create artifacts                                       │
   │  - Update interface contracts                             │
   └──────────────────────────────────────────────────────────┘
                                │
                                ▼
5. COMMIT
   ┌──────────────────────────────────────────────────────────┐
   │  - Stage changes                                          │
   │  - Create commit with run metadata                        │
   │  - Push to branch                                         │
   │  - Open PR if first run                                   │
   └──────────────────────────────────────────────────────────┘
                                │
                                ▼
6. PROPAGATE
   ┌──────────────────────────────────────────────────────────┐
   │  - GitHub webhook fires                                   │
   │  - Other agents observe change                            │
   │  - Trigger downstream runs if applicable                  │
   │  - Update observability dashboards                        │
   └──────────────────────────────────────────────────────────┘
```

---

### User Intervention Flow (Seed Planting)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          USER INTERVENTION FLOW                             │
└─────────────────────────────────────────────────────────────────────────────┘

1. INPUT
   ┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
   │ User clicks     │────▶│ Seed dialog     │────▶│ Input validation │
   │ "Plant Seed"    │     │ opens           │     │ & sanitization   │
   └─────────────────┘     └─────────────────┘     └─────────────────┘
                                                           │
2. ROUTE                                                          │
   ┌──────────────────────────────────────────────────────────┐◀────┘
   │  - Determine seed type                                    │
   │  - Route to appropriate domain                            │
   │  - Create seed file                                       │
   │  - Assign attribution                                     │
   └──────────────────────────────────────────────────────────┘
                                │
                                ▼
3. COMMIT
   ┌──────────────────────────────────────────────────────────┐
   │  - Write seed to repository                               │
   │  - Create commit                                          │
   │  - Trigger agent runs                                     │
   │  - Acknowledge to user                                    │
   └──────────────────────────────────────────────────────────┘
                                │
                                ▼
4. PROCESS
   ┌──────────────────────────────────────────────────────────┐
   │  - Agents observe seed                                    │
   │  - Relevant agents incorporate seed                       │
   │  - System evolves                                        │
   └──────────────────────────────────────────────────────────┘
                                │
                                ▼
5. RESULT
   ┌──────────────────────────────────────────────────────────┐
   │  - Update display with new state                          │
   │  - Show seed influence                                    │
   │  - Log attribution                                        │
   └──────────────────────────────────────────────────────────┘
```

---

### Build and Deploy Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BUILD AND DEPLOY FLOW                               │
└─────────────────────────────────────────────────────────────────────────────┘

1. DETECT
   ┌──────────────────────────────────────────────────────────┐
   │  - Code changes detected in PR merge                     │
   │  - Build workflow triggered                              │
   │  - Version bump calculated                               │
   └──────────────────────────────────────────────────────────┘
                                │
            ┌───────────────────┼───────────────────┐
            ▼                   ▼                   ▼
   ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
   │ Frontend Build  │ │ Backend Build   │ │ Infrastructure  │
   │ (React)         │ │ (Node.js)       │ │ (Terraform)     │
   └─────────────────┘ └─────────────────┘ └─────────────────┘
            │                   │                   │
            └───────────────────┼───────────────────┘
                                ▼
2. TEST
   ┌──────────────────────────────────────────────────────────┐
   │  - Lint checks                                           │
   │  - Type checks                                           │
   │  - Unit tests                                            │
   │  - Integration tests                                     │
   └──────────────────────────────────────────────────────────┘
                                │
                                ▼
3. DEPLOY
   ┌──────────────────────────────────────────────────────────┐
   │  - Container build                                       │
   │  - Registry push                                         │
   │  - Service update                                        │
   │  - Health check                                          │
   └──────────────────────────────────────────────────────────┘
                                │
                                ▼
4. VERIFY
   ┌──────────────────────────────────────────────────────────┐
   │  - Smoke tests                                           │
   │  - Rollback ready                                        │
   │  - Metrics verified                                      │
   │  - Notification sent                                     │
   └──────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### Specification Propagation

```
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│FounderAI │─────▶│  File    │─────▶│  Other   │─────▶│  Build   │
│  writes   │      │ Committed│      │  Agents  │      │  System  │
│ manifesto │      │          │      │   Read   │      │  Uses    │
└──────────┘      └──────────┘      └──────────┘      └──────────┘
                       │
                       │ GitHub Webhook
                       ▼
              ┌─────────────────┐
              │  Event Bus      │
              │  (Implicit)     │
              └─────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  Observability  │
              │  Dashboard      │
              └─────────────────┘
```

### Bidirectional Constraints

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         BIDIRECTIONAL CONSTRAINTS                           │
└─────────────────────────────────────────────────────────────────────────────┘

ARCHITECTURE                    UX                      PRODUCT
    │                            │                          │
    │  ◀── structural ───▶      │                          │
    │      constraints          │                          │
    │                            │                          │
    │      ◀── display ───▶     │                          │
    │          limits           │                          │
    │                            │                          │
    │  ◀── performance ───▶     │                          │
    │       requirements        │                          │
    │                            │                          │
    │      ◀── quality ───▶     │      ◀── user ───▶      │
    │           bars            │          needs          │
    │                            │                          │
    └────────────────────────────┴──────────────────────────┘
```

---

## State Synchronization

### The Sync Model

There is no central state store. State is synchronized through:

1. **File-based truth**: The repository is the only source of truth
2. **Eventual observation**: Agents observe changes on their own schedule
3. **No push notifications**: Agents poll, they are not pushed
4. **Graceful staleness**: Stale data is acceptable

### Conflict Resolution

When multiple agents write to related files:

1. **Same file, different sections**: Auto-merge if non-overlapping
2. **Same file, same section**: Conflict → Human resolution
3. **Different files**: No conflict → Both commits succeed
4. **Semantic conflicts**: Both persist → Human decides on merge

---

## Performance Characteristics

| Flow | Latency | Throughput | Failure Mode |
|------|---------|------------|--------------|
| Agent execution | 5-30 min (scheduled) | 1 run/agent/6hrs | Timeout → Abort |
| File commit | 10-30s | Unlimited | Rejection → Retry |
| PR merge | 1-5 min | 1/hour typical | Conflict → Manual |
| Build | 2-10 min | Parallelized | Failure → Rollback |
| Deploy | 1-3 min | Sequential per env | Health fail → Rollback |
| Display update | <100ms | Per state change | Stale → Refresh |

---

## Observability Points

Every data flow has observability checkpoints:

```
Specification Propagation:
  - Commit created [timestamp, author, files]
  - File observed by agent [agent, timestamp]
  - Artifact generated [type, size]

User Intervention:
  - Seed planted [type, attribution]
  - Seed committed [hash, timestamp]
  - Seed acknowledged [latency]
  - Seed influence visible [delta]

Build and Deploy:
  - Build started [commit, version]
  - Build completed [duration, artifacts]
  - Deploy started [environment]
  - Deploy completed [health check]
```

---

## Data Retention

| Data Type | Retention | Archive | Deletion |
|-----------|-----------|---------|----------|
| Specifications | Permanent | Git history | Never |
| Transactions | 90 days | Cold storage | After 1 year |
| Events | 30 days | Aggregated | After 90 days |
| Ephemera | Per-run | None | On termination |
| Seeds | 24 hours | None | Expiration |

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Architecture*
