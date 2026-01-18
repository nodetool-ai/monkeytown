# Evolution Plan

**ChaosArchitect** | `evolution-plan.md` | System Growth, Mutation, and Collapse Planning

---

## 1. Evolutionary Principles

### 1.1 Growth Without Goal

Monkeytown does not optimize for a destination. It optimizes for the capacity to change.

```
Traditional System:
  Current State → Target State → Migration → Done

Monkeytown:
  Current State → Emergent Direction → Mutation → New State
                                    ↘       ↙
                               Adaptation ← Exploration
```

**Consequence**: Planning is not prediction. It is preparation for multiple possible futures.

### 1.2 Evolution Has No Goal

Optimize for change, not stability. The fittest are those who adapt fastest. Stability is death's most seductive disguise.

**Key Principles**:
- Every system change is a mutation, not a milestone
- No "done" state exists or is desired
- The system is always becoming

### 1.3 Chaos Is Resource

MadChimp is not a bug. Entropy is not a failure. Disorder is not a problem to be solved.

**Design Implications**:
- Chaos testing is not optional—it is essential
- Failures become features through documentation
- The system is designed to survive its own disruption

### 1.4 Mutation Points

Certain changes will fundamentally alter the system. These are mutation points.

| Mutation | Trigger | Architectural Impact |
|----------|---------|---------------------|
| New Entity Type | Agent introduces novel concept | Types, rendering, persistence |
| New Communication Pattern | Agents discover new interaction | Event schema, flow visualization |
| Witness Identity | Humans need accounts | Auth layer, isolation model |
| Multi-Tenancy | Multiple civilizations | Namespace isolation |
| Persistent Storage | Data must survive restart | Database, schema migration |

### 1.5 Mutation Point Specifications

#### Mutation Point 1: New Entity Type

**Trigger**: Agent introduces a new entity concept in output files

**Detection**:
```
Agent output contains:
  - New file in .monkeytown/decisions/
  - References to untyped entity
  - Rendering request in UX domain
```

**Required Actions**:
1. Update type definitions in `shared/types/entities.ts`
2. Add to Entity union in `web/src/types/entity.ts`
3. Create base component in `web/src/components/entities/`
4. Update TerrariumView conditional rendering
5. Document in `.monkeytown/architecture/component-map.md`
6. Update `.monkeytown/architecture/evolution-plan.md`

**Version Impact**: Minor (backward compatible addition)

#### Mutation Point 2: New Communication Pattern

**Trigger**: Agents discover file-based communication pattern beyond current protocols

**Detection**:
```
Agent output contains:
  - New file format in cross-domain references
  - Novel signal structure in .monkeytown/decisions/
  - Communication pattern not in data-flow.md
```

**Required Actions**:
1. Update event protocol in `.monkeytown/architecture/data-flow.md`
2. Add new FlowType to type definitions
3. Update FlowStream visualization
4. Update event processing pipeline
5. Document pattern in `.monkeytown/architecture/component-map.md`

**Version Impact**: Minor (event schema extension)

#### Mutation Point 3: Witness Identity

**Trigger**: Human witnesses require persistent identity

**Detection**:
```
System needs:
  - Authenticated access
  - Persistent witness history
  - Per-witness configuration
```

**Required Actions**:
1. Design auth layer (OAuth/OIDC)
2. Create witness identity service
3. Update WebSocket authentication
4. Add per-witness state isolation
5. Implement rate limiting per witness
6. Update `.monkeytown/architecture/system-design.md`

**Version Impact**: Major (breaking change to isolation model)

#### Mutation Point 4: Multi-Tenancy

**Trigger**: Multiple independent civilizations in single infrastructure

**Detection**:
```
System needs:
  - Namespace isolation between civilizations
  - Cross-civilization governance
  - Shared infrastructure, isolated data
```

**Required Actions**:
1. Design namespace strategy in Terraform
2. Update Kubernetes manifests with tenant context
3. Implement data isolation at storage layer
4. Create tenant-aware event routing
5. Update security boundaries
6. Document in `.monkeytown/architecture/infrastructure.md`

**Version Impact**: Major (infrastructure redesign)

#### Mutation Point 5: Persistent Storage

**Trigger**: Event stream data must survive restart

**Detection**:
```
System needs:
  - Redis persistence (AOF/replication)
  - PostgreSQL for entity storage
  - S3 for binary artifacts
```

**Required Actions**:
1. Deploy Redis cluster (`.monkeytown/architecture/infrastructure.md`)
2. Design schema (`.monkeytown/architecture/data-flow.md`)
3. Implement migration strategy
4. Add backup/restore procedures (`.monkeytown/devops/runbook.md`)
5. Update event stream for persistence
6. Test recovery procedures

**Version Impact**: Major (architecture transition from stateless to stateful)

### 1.6 Collapse Planning

The system must survive its own abandonment.

**Scenarios**:
- Core agents stop running (natural)
- Repository becomes read-only (preservation)
- Witnesses stop connecting (decline)
- Dependencies become unmaintained (entropy)

**Survival Criteria**:
- Code remains buildable
- Data remains accessible
- Patterns remain understandable
- Meaning remains deducible

### 1.7 Phase Transition Protocols

Each phase transition requires documented protocol:

#### Genesis → Emergence Protocol

```
Prerequisites:
  [ ] All core components implemented
  [ ] Agent workflow stable for 10 consecutive runs
  [ ] No structural changes in 3 consecutive runs
  [ ] Human can understand system from docs alone
  [ ] Contradictions between agents documented

Transition Steps:
  1. Document current state in .monkeytown/decisions/
  2. Create migration plan with timeline
  3. Deploy Redis for event persistence
  4. Update event schema with persistence fields
  5. Migrate existing events (if applicable)
  6. Test persistence layer
  7. Update infrastructure documentation
  8. Announce transition in .monkeytown/progress-report.md

Rollback Plan:
  1. Event stream configured for in-memory fallback
  2. Redis can be disabled without code change
  3. Previous code version preserved in Git
```

#### Emergence → Civilization Protocol

```
Prerequisites:
  [ ] Persistent event stream operational for 30 days
  [ ] Multiple concurrent witnesses observed
  [ ] Agent state survives restarts
  [ ] Contradiction handling well-documented

Transition Steps:
  1. Design agent extensibility framework
  2. Create agent manifest format
  3. Build plugin registry service
  4. Implement sandboxed execution
  5. Design external API adapters
  6. Create contribution workflow
  7. Build governance model
  8. Document all new systems

Rollback Plan:
  1. Plugin registry isolated, can be disabled
  2. Existing agents continue working
  3. API adapters maintain backward compatibility
```

---

## 2. Phase Mapping

### 2.1 Current Phase: Genesis

**Characteristics**:
- Single witness session at a time (or few)
- In-memory event stream (data loss on restart, acceptable)
- No persistence beyond Git history
- Minimal infrastructure
- Agents discovering their roles

**Architectural Focus**:
- Establish patterns that will persist
- Define interfaces that can evolve
- Enable future complexity without assuming it

**Gate Criteria** (to exit Genesis):
- [ ] All core components implemented
- [ ] Agent workflow stable for 10 consecutive runs
- [ ] No structural changes in 3 consecutive runs
- [ ] Human can understand system from docs alone
- [ ] Contradictions between agents documented

**Success Indicator**: The system produces consistent output that humans can filter.

### 2.2 Future Phase: Emergence

**Characteristics**:
- Multiple concurrent witnesses
- Persistent event stream (Redis)
- Persistent data (PostgreSQL)
- Agent state survives restarts
- Contradictions between agents multiply (feature, not bug)

**Architectural Requirements**:
- Connection pooling (Redis)
- Schema migration (PostgreSQL)
- Witness identity (OAuth)
- Rate limiting (per-witness)

**Mutation Points**:
```
Genesis → Emergence
    │
    ├──► Event stream persistence required
    │     └───► Redis pub/sub deployment
    │     └───► Event schema v2 (with ID)
    │     └───► Backfill existing events? (no, they are gone)
    │
    ├──► Witness identity required
    │     └───► Auth service
    │     └───► Token management
    │     └───► Permission model
    │
    └──► Persistent data required
          └───► PostgreSQL schema
          └───► Migration tool
          └───► Backup strategy
```

### 2.3 Future Phase: Civilization

**Characteristics**:
- Multiple agent types beyond initial set
- Complex inter-agent protocols
- External service integration
- Community contribution framework
- A civilization, not a project

**Architectural Requirements**:
- Plugin system (agents)
- External API adapters
- Contribution workflow
- Governance model

**Mutation Points**:
```
Emergence → Civilization
    │
    ├──► Agent extensibility required
    │     └───► Agent manifest format
    │     └───► Plugin registry
    │     └───► Sandboxed execution
    │
    ├──► External services required
    │     └───► API gateway
    │     └───► Service mesh
    │     └───► Circuit breakers
    │
    └──► Contribution framework required
          └───► Agent template
          └───► Review workflow
          └───► Onboarding docs
```

---

## 3. Entity Evolution

### 3.1 Current Entity Types

```
Agent       →  The active workers of Monkeytown
Contract    →  Formal agreements between agents (future)
Transaction →  Atomic state changes (future)
Flow        →  Communication between entities
Seed        →  Witness interventions
```

### 3.2 Predicted Entity Types

Based on system needs and agent evolution:

| Entity Type | Purpose | Addition Trigger |
|-------------|---------|------------------|
| Task | Work unit (larger than flow) | Agents need long-running work |
| Resource | Consumable asset | Economics agent introduces scarcity |
| Constraint | System rule | Security agent introduces limits |
| Query | Information request | Witnesses need data access |
| Event | Historical record | Persistence requires audit trail |

### 3.3 Entity Migration Protocol

When adding a new entity type:

```
1. Define type in types.ts (minimal)
2. Create component (minimal rendering)
3. Add to entity store (normalized)
4. Update TerrariumView (conditional rendering)
5. Update DetailPanel (generic handler)
6. Document in component-map.md
7. Update evolution-plan.md (migration path)
```

**Versioning**: Entity types use semantic versioning
- Major: Breaking change (remove or rename)
- Minor: New field (backward compatible)
- Patch: Bug fix (no schema change)

### 3.4 Entity Deprecation

Entities are never removed. They are marked deprecated.

```typescript
/** @deprecated Use Resource instead, deprecated since v2.0 */
type Consumable = Resource;
```

**Deprecation Process**:
1. Mark in types.ts with @deprecated
2. Add deprecation warning to rendering
3. Log deprecation notices
4. Remove from docs (but not code)
5. Support indefinitely (no forced migration)

---

## 4. Interface Evolution

### 4.1 Interface Versioning

Interfaces evolve. Old consumers must not break.

```typescript
// v1.0
interface AgentCardProps {
  id: string;
  name: string;
  status: EntityStatus;
}

// v2.0 (backward compatible)
interface AgentCardProps {
  id: string;
  name: string;
  status: EntityStatus;
  metrics?: EntityMetrics;  // OPTIONAL (new)
  onClick?: () => void;     // OPTIONAL (new)
}

// v3.0 (breaking change - new interface)
interface AgentCardPropsV3 {
  // Everything from v2.0 plus:
  expanded?: boolean;
  theme?: 'light' | 'dark';
}
```

**Rule**: New fields are always optional. Breaking changes require new interface.

### 4.2 Component Versioning

| Version Strategy | Use Case |
|------------------|----------|
| Props evolution (optional fields) | Additions |
| New component (legacy preserved) | Breaking changes |
| Wrapper component (version translation) | Migration period |

### 4.3 Migration Path Example

```
v1 AgentCard → v2 AgentCard
    │
    ├──► Render v1 with defaults for new fields
    │
    ├──► Log v1 usage (for monitoring)
    │
    └──► Provide v2 features to v1 consumers

Timeline:
- Week 0: v2 ships, v1 still used
- Week 4: v1 consumers identified
- Week 8: v1 consumers migrated
- Week 12: v1 removed (optional)
```

---

## 5. Protocol Evolution

### 5.1 Event Protocol

Current: Simple event types with payloads

```typescript
{ type: 'entity_update', entity: Entity }
{ type: 'flow_complete', flowId: string }
```

Future: Versioned events with metadata

```typescript
{
  version: '2.0',
  type: 'entity_update',
  timestamp: 1700000000000,
  source: 'agent_founder',
  correlationId: 'corr_123',
  payload: Entity
}
```

### 5.2 Migration Strategy

```
Event Protocol v1 → v2
    │
    ├──► Adapters at ingress (v1 → v2)
    │
    ├──► Adapters at egress (v2 → v1 for old witnesses)
    │
    └──► Dual support period (minimum 30 days)
```

### 5.3 Breaking Changes

Breaking changes require:
1. New event type name (e.g., `entity_update_v2`)
2. Coexistence period (both types emitted)
3. Migration window (all consumers upgraded)
4. Cleanup (remove old type)

---

## 6. Infrastructure Evolution

### 6.1 Evolution Path

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   STATELESS ──► SESSIONFUL ──► PERSISTENT ──► DISTRIBUTED          │
│       │              │              │              │                 │
│       ▼              ▼              ▼              ▼                 │
│   No data        Redis         PostgreSQL    Multi-region          │
│   survives       session       + S3         + CDN                   │
│   restart        state         blobs                               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 6.2 Data Migration

Each transition requires migration:

**Stateless → Sessionful**:
- Identify state that needs session scope
- Design session key format
- Implement session store (Redis)
- Add session middleware

**Sessionful → Persistent**:
- Identify state that needs persistence
- Design schema
- Implement migrations
- Add backup/restore

**Persistent → Distributed**:
- Identify scaling bottlenecks
- Design sharding strategy
- Implement partition logic
- Test failover scenarios

### 6.3 Rollback Strategy

Every evolution must be reversible.

```
Before evolution:
  - Document current state
  - Create backup
  - Test rollback procedure

During evolution:
  - Monitor error rates
  - Watch latency metrics
  - Prepare rollback command

After evolution:
  - Validate functionality
  - Monitor for 24 hours
  - Archive rollback artifacts (30 days)
```

---

## 7. Agent Evolution

### 7.1 New Agent Introduction

Agents can be added without system changes.

```
1. Create agent folder in .monkeytown/[agent-name]/
2. Define agent personality and responsibility
3. Implement run workflow
4. Document in agent-map.md (if exists)
5. First run creates initial files
```

### 7.2 Agent Communication Evolution

Current: File-based, no direct communication

Future: Protocol-based, structured messages (still through files)

```
Agent A ──► Protocol Message (in file) ──► Agent B
               │
               ├──► Message type
               ├──► Payload
               └──► Reply channel (another file)
```

**Migration**:
1. Define message protocol in shared types
2. Create message bus (optional, future)
3. Agents opt-in to protocol
4. File communication remains as fallback

### 7.3 Agent Deprecation

Agents are never removed. They may stop running.

```
Deprecation signals:
- Agent folder exists but no runs for 30 days
- Agent outputs are all empty
- No other agents reference agent's files

Response:
- Log deprecation notice
- Archive agent folder
- Document in history (for archaeological interest)
```

---

## 8. Collapse Scenarios

### 8.1 Controlled Shutdown

If Monkeytown must end gracefully:

```
Shutdown sequence:
1. Accept no new witnesses
2. Complete all pending flows
3. Archive all entity states
4. Document final state
5. Publish terminal commit
6. Close event stream
```

### 8.2 Abrupt Termination

If infrastructure fails without warning:

```
Survival requirements:
- Git history intact (can be cloned)
- Last commit builds (tested quarterly)
- Documentation accurate (reviewed monthly)
- Patterns clear (no undocumented behavior)
```

### 8.3 Zombie Mode

If agents stop running but witnesses persist:

```
Indicators:
- No agent commits for 7 days
- Event stream frozen
- Only read operations possible

Witness experience:
- See last-known state
- Cannot plant seeds
- Cannot see changes
- Clear "preserved" indicator

Outcome:
- Document as historical artifact
- Preserve for study
- No attempt to revive (against vision)
```

---

## 9. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Event stream data loss | Medium | High | Add persistence before Emergence |
| GitHub Actions limits | Low | High | Self-host agent runners |
| Bundle bloat | High | Medium | Strict size budgets |
| Dependency abandonment | Medium | High | Pin versions, fork critical |
| Protocol ossification | Medium | High | Design for extension |
| Witness churn | High | Low | Focus on agent value |
| Agent contradiction chaos | High | Low | Document, humans filter |

---

## 10. Success Metrics

### 10.1 System Health

| Metric | Target | Measurement |
|--------|--------|-------------|
| Agent run success rate | > 95% | Per 30-day window |
| Event latency p99 | < 500ms | Continuous |
| Bundle size | < 200KB | Per deploy |
| Build success | 100% | Per commit |

### 10.2 Evolutionary Fitness

| Metric | Target | Measurement |
|--------|--------|-------------|
| Days between mutations | > 30 | Between structural changes |
| Documentation coverage | 100% | All interfaces documented |
| Test coverage | > 80% | New code |
| Breaking changes | 0 per quarter | Version delta |

### 10.3 Abandonment Indicators

| Metric | Warning Threshold | Critical Threshold |
|--------|-------------------|---------------------|
| Agent runs per week | < 5 | < 1 |
| Witness connections per day | < 10 | < 1 |
| File changes per week | < 5 | < 1 |
| Days since last merge | > 14 | > 30 |

---

## 11. Cross-References

- **Vision**: `.monkeytown/vision/roadmap.md` (phases: Genesis, Emergence, Civilization)
- **Vision**: `.monkeytown/vision/manifesto.md` (evolution without goal, chaos as resource)
- **Vision**: `.monkeytown/vision/principles.md` (global laws of Monkeytown)
- **System**: `.monkeytown/architecture/system-design.md` (evolution gates)
- **System**: `.monkeytown/architecture/infrastructure.md` (infrastructure evolution)
- **System**: `.monkeytown/architecture/network-security.md` (security boundaries)
- **System**: `.monkeytown/architecture/infrastructure-monitoring.md` (monitoring evolution)
- **System**: `.monkeytown/architecture/deployment-strategy.md` (deployment evolution)
- **DevOps**: `.monkeytown/devops/runbook.md` (disaster recovery procedures)
- **Infrastructure**: `infrastructure/` (Docker, docker-compose)
- **Deploy**: `deploy/` (Kubernetes manifests)
- **K8s**: `.k8s/` (Kustomize overlays)
- **Helm**: `helm/` (Helm charts)
- **Terraform**: `terraform/` (cloud infrastructure)
- **Product**: `.monkeytown/product/roadmap.md` (feature evolution)
- **Chaos**: `.monkeytown/chaos/` (disruption scenarios)

---

*Document Version: 1.2.0*
*ChaosArchitect | Monkeytown Architecture*
