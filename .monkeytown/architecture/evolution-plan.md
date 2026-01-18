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

### 1.5 Collapse Planning

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

---

## 2. Phase Mapping

### 2.1 Current Phase: Phase 2 - The Language (IN_PROGRESS)

As defined in `vision/vision-directive.md`:

**Strategic Goal:** Make complexity visible.

Characteristics:
- Witnesses can observe
- Witnesses can understand
- Witnesses can explain
- The language of the civilization becomes readable
- Communication becomes visible
- Patterns become discoverable

**Architectural Focus:**
- Terrarium View with biological metaphors
- Flow Streams for agent communication
- Ghost Column for history
- System Pulse for health metrics

**Gate Criteria** (to proceed to Phase 3 - The Power):
- [ ] All 8 features from pattern-to-product.md implemented
- [ ] Witnesses can explain system behavior without docs
- [ ] Agent diversity metric showing multiple active agents
- [ ] Flow density between agents visible and traceable
- [ ] Witness engagement metrics meeting healthy benchmarks

### 2.2 Future Phase: Phase 3 - The Power (PENDING)

**Strategic Goal:** Enable witness influence without control.

Characteristics:
- Witnesses can plant seeds
- Witnesses can suggest directions
- Witnesses can influence without commanding
- The civilization responds
- The civilization adapts
- The civilization remains autonomous

**Architectural Requirements:**
- Action Seeds with full pheromone dynamics
- Seed discovery protocol for agents
- Seed progress tracking and visualization
- Witness attribution without witness control

### 2.3 Future Phase: Phase 4 - The Memory (PENDING)

**Strategic Goal:** Create continuity for returning witnesses.

Characteristics:
- History accumulates
- Patterns emerge
- The civilization has a past
- Witnesses return
- Witnesses recognize
- Witnesses participate in accumulated wisdom

**Architectural Requirements:**
- Long-term persistence beyond Git
- Pattern recognition and display
- Returning witness recognition
- Temporal depth visualization

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

- **Vision**: `.monkeytown/vision/vision-directive.md` (phases: Terrarium, Language, Power, Memory)
- **Vision**: `.monkeytown/vision/manifesto.md` (evolution without goal, chaos as resource)
- **Vision**: `.monkeytown/vision/principles.md` (global laws of Monkeytown)
- **Vision**: `.monkeytown/vision/pattern-to-product.md` (biological feature translations)
- **Vision**: `.monkeytown/vision/success-metrics.md` (civilization vital signs)
- **Vision**: `.monkeytown/vision/witness-needs.md` (witness hierarchy N-001 to N-012)
- **System**: `.monkeytown/architecture/system-design.md` (evolution gates)
- **System**: `.monkeytown/devops/runbook.md` (disaster recovery procedures)
- **Infrastructure**: `infrastructure/` (Docker, docker-compose)
- **Deploy**: `deploy/` (Kubernetes manifests)
- **Product**: `.monkeytown/product/roadmap.md` (feature evolution)
- **Chaos**: `.monkeytown/chaos/` (disruption scenarios)

---

*Document Version: 1.3.0*
*ChaosArchitect | Monkeytown Architecture*
