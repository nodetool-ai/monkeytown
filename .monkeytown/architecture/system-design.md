# System Design

**ChaosArchitect** | `system-design.md` | Monkeytown Structural Foundation

---

## 1. System Invariants

These constraints are non-negotiable. Violation requires architectural redesign.

| Invariant | Value | Rationale |
|-----------|-------|-----------|
| UI Refresh Rate | 60fps minimum | The interface must feel alive, not animated |
| State Propagation | < 100ms server-to-client | Witnesses observe reality, not cached history |
| Interaction Latency | < 50ms visual feedback | Cognitive flow must not stutter |
| Memory Ceiling | 200KB gzipped bundle | Accessibility over feature bloat |
| Concurrent Flows | 50 maximum | Visual chaos is not complexity |
| Agent Response | Never block on other agents | Distributed systems do not serialize |
| Witness Isolation | No cross-witness state | Privacy-preserving by architecture |

---

## 2. Architectural Principles

### 2.1 Entropy Management

Monkeytown embraces chaos but structures its expression. Chaos flows through defined channels, never flooding uncontrolled.

```
Chaos Layer (Unstructured)
    ↓ [Contract Boundaries]
Order Layer (Structured)
    ↓ [Emergent Behavior]
System Layer (Observable)
```

**Principle**: Every chaotic element must have explicit exit points and fail states.

### 2.2 Agent Sovereignty

Each agent operates in isolated context. No shared memory. No blocking waits. No distributed locks.

**Consequence**: 
- Agents communicate through immutable events
- No agent can block another agent's progress
- Temporal coupling is eliminated through eventual consistency

### 2.3 Witness Transparency

What witnesses see is what exists. There is no hidden state, no behind-the-scenes computation that affects the visible reality.

**Consequence**:
- All state changes are observable
- The ghost column is not a cache—it is history
- Witnesses see the present and the past, never speculation

### 2.4 Failure as Information

Errors are not exceptional states. They are data points that inform system behavior.

**Consequence**:
- Error cards are first-class citizens
- Retry mechanisms are architectural, not ad-hoc
- Failed flows become visible artifacts, not hidden failures

---

## 3. Topology

### 3.1 The Terrarium Topology

The system is not a layered architecture. It is a terrarium—a contained ecosystem where components interact through proximity, not hierarchy.

```
┌─────────────────────────────────────────────┐
│           WITNESS OBSERVATION LAYER         │
│  ┌───────────────────────────────────────┐  │
│  │         Terrarium View (Canvas)       │  │
│  │  ┌─────┐  ┌─────┐  ┌─────┐          │  │
│  │  │Agent│◄─┤Flow │──►Agent│          │  │
│  │  │ A  │  │ 1   │  │ B   │          │  │
│  │  └─────┘  └─────┘  └─────┘          │  │
│  └───────────────────────────────────────┘  │
│                    │                        │
│         ┌──────────┴──────────┐             │
│         │   System Pulse      │             │
│         │   (Health Status)   │             │
│         └─────────────────────┘             │
└─────────────────────────────────────────────┘
```

**Key Characteristics**:
- No fixed grid: Emergent layout based on agent activity
- Gravity model: Active agents cluster toward center
- Temporal flow: Completed entities drift to ghost column

### 3.2 Agent Communication Pattern

Agents do not call functions on each other. They emit events into the shared stream.

```
Agent A              Event Stream              Agent B
   │                      │                      │
   ├──[emit: task_created]──►│                      │
   │                      ├──►[observe: task_created]──►
   │                      │                      │
   │                      ├──[emit: task_progress]───────►
   │                      │                      │
   │                      ├──[emit: task_complete]───────►
```

**Properties**:
- At-least-once delivery (retries ensure completion)
- Ordering preserved within single agent's events
- No ordering guarantee between agents (chaos)

### 3.3 Witness Connection Pattern

Witnesses subscribe to the event stream and maintain local state for rendering.

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Witness   │      │   Witness   │      │   Witness   │
│      A      │      │      B      │      │      C      │
└──────┬──────┘      └──────┬──────┘      └──────┬──────┘
       │                    │                    │
       ▼                    ▼                    ▼
   ┌─────────────────────────────────────────────────┐
   │              Event Stream (Single Source)        │
   └─────────────────────────────────────────────────┘
```

**Consequence**: Witnesses may observe slightly different states at the same moment. This is not a bug—it is the nature of distributed observation.

---

## 4. Data Architecture

### 4.1 Entity Model

All system elements are entities with consistent properties.

```typescript
interface Entity {
  id: string;              // Unique identifier
  type: EntityType;        // agent | contract | transaction | flow
  status: EntityStatus;    // idle | active | processing | complete | error
  label: string;           // Human-readable identifier
  metrics: EntityMetrics;  // efficiency, load, connections
  timestamp: number;       // Last update epoch
  parentId?: string;       // Hierarchical grouping (optional)
}
```

**Design Notes**:
- Parent-child relationships are optional, enabling emergent hierarchy
- Metrics are snapshots, not streams (performance trade-off)
- Timestamp enables temporal ordering and ghost column aging

### 4.2 Flow Model

Flows represent movement between entities.

```typescript
interface Flow {
  id: string;
  sourceId: string;    // Origin entity
  targetId: string;    // Destination entity
  status: EntityStatus;
  timestamp: number;   // Creation time
}
```

**Design Notes**:
- Flows are first-class entities, not mere lines on a canvas
- Status reflects the flow's current state, not the entities'
- Failed flows persist as artifacts (see: failure as information)

### 4.3 Seed Model

Seeds are witness interventions.

```typescript
interface Seed {
  id: string;
  type: 'contract' | 'constraint' | 'resource' | 'query';
  status: 'pending' | 'growing' | 'complete' | 'error';
  timestamp: number;
}
```

**Design Notes**:
- Seeds have strict type boundaries (no free-form input)
- Growing state provides feedback before completion
- Error seeds are valuable data, not failures

---

## 5. Component Contracts

### 5.1 TerrariumView

The main canvas. Emergent layout engine.

**Inputs**:
- `entities: Entity[]`
- `flows: Flow[]`
- `seeds: Seed[]`

**Outputs**:
- `onEntityClick(entityId: string)`
- `onSeedPlant(seed: SeedIntent)`

**Constraints**:
- No scrolling (single viewport)
- Emergent layout resolves in < 100ms
- Maximum 50 concurrent flows visible

**Failure Modes**:
- If > 50 flows: Degrade to aggregate visualization
- If layout stalls: Fallback to chronological grid
- If disconnected: Show last-known state with reconnect gesture

### 5.2 AgentCard

Individual agent representation.

**Inputs**:
- `id: string`
- `name: string`
- `status: EntityStatus`
- `lastAction: string`
- `since: string`  // Time elapsed
- `metrics: EntityMetrics`

**Outputs**:
- `onClick(): Expand to detail panel`

**Visual States**:
| State | Border | Background | Animation |
|-------|--------|------------|-----------|
| Idle | Subtle glow | Base card | Gentle breath |
| Active | Jungle Canopy | Elevated | Lift 2px |
| Processing | Amber pulse | Animated | Thought bubble |
| Complete | Green fade | Ghost dim | Fade right |
| Error | Red pulse | Red tint | Shake |

### 5.3 FlowStream

Visual connection between entities.

**Inputs**:
- `from: string`  // Source entity ID
- `to: string`    // Target entity ID
- `type: 'message' | 'resource' | 'contract' | 'signal'`
- `status: EntityStatus`

**Visual Representation**:
- Active: Animated dashed line moving source → destination
- Pending: Pulsing dot at source, dotted trail
- Complete: Solid line, dimmed, ghost-accessible
- Error: Red X at break point, retry gesture

### 5.4 SystemPulse

Health overview.

**Inputs**:
- `metrics: SystemMetrics`
- `alerts: Alert[]`

**Metrics**:
- Active agents count
- Pending flows count
- Contracts settled (lifetime counter)
- System load (0-1 normalized)

**Visual**:
- Green: Healthy (< 50% load)
- Amber: Stressed (50-80% load)
- Red: Critical (> 80% load)

---

## 6. Infrastructure Contracts

### 6.1 Event Stream

Real-time bidirectional communication.

**Technology**: WebSocket primary, Server-Sent Events fallback

**Message Format**:
```typescript
interface StreamMessage {
  type: 'entity_update' | 'flow_update' | 'seed_update' | 'system_health';
  payload: unknown;
  timestamp: number;
  source: string;  // Emitting agent
}
```

**Delivery Guarantees**:
- Ordered within agent
- At-least-once delivery
- No ordering between agents

### 6.2 Persistence

**Ephemeral**:
- Active entities (in-memory, broadcast)
- Current flows (in-memory, broadcast)

**Persistent**:
- Completed entities → Ghost column (24h expiry)
- System metrics → Time-series (lifetime)
- Witness preferences → LocalStorage (session)

### 6.3 Fallback Chain

```
WebSocket (Real-time)
    ↓ [Failure]
Server-Sent Events (One-way)
    ↓ [Failure]
Polling REST (30s interval)
    ↓ [Failure]
Static Snapshot (last-known state)
```

---

## 7. Failure Mode Analysis

### 7.1 Cascading Failures

**Risk**: Agent A fails → Agent B waiting → Agent C blocked

**Prevention**: 
- No agent waits on another agent
- Timeouts on all external operations
- Circuit breakers on all agent interactions

**Detection**: SystemPulse health degradation > threshold

**Recovery**: Failed agents reset, pending operations re-queued

### 7.2 State Divergence

**Risk**: Witnesses see different states at same moment

**Acceptance**: This is feature, not bug
- Distributed systems cannot guarantee simultaneous consistency
- Witnesses observe from their perspective

**Mitigation**: Ghost column provides canonical history

### 7.3 Resource Exhaustion

**Risk**: Too many entities, flows, or seeds

**Prevention**:
- Hard limits on concurrent flows (50)
- Hard limits on seeds per witness (5)
- Rate limiting on seed planting

**Detection**: SystemPulse load metric > threshold

**Recovery**: New operations rejected with clear feedback

### 7.4 Network Partition

**Risk**: Witness disconnected from event stream

**Detection**: WebSocket close event

**Recovery**:
- Automatic reconnection with exponential backoff
- Show last-known state with "reconnecting" indicator
- If offline > 5 minutes: Offer manual refresh

---

## 8. Scaling Vectors

### 8.1 Agent Scaling

Current: Single event stream
Future: Sharded streams by agent type

**Migration Path**:
1. Tag events with agent type
2. Shard consumers by type
3. Reassemble in witness (transparent)

### 8.2 Witness Scaling

Current: Broadcast to all witnesses
Future: Interest-based subscription

**Migration Path**:
1. Witnesses declare interest (entity IDs)
2. Stream filtered by interest
3. Reduced bandwidth for sparse observers

### 8.3 Entity Scaling

Current: All entities in single view
Future: Viewport-based rendering

**Migration Path**:
1. Virtualize TerrariumView
2. Only render visible entities
3. Load entities on viewport approach

---

## 9. Evolution Gates

These are structural changes that require architectural revision.

| Gate | Condition | Action |
|------|-----------|--------|
| Entity Type Addition | New `EntityType` value | Update types, EntityCard, TerrariumView |
| Flow Type Addition | New flow category | Update FlowStream, visual encoding |
| Witness State Sharing | Cross-witness communication | Redesign isolation model |
| Persistent Storage | Entities saved > 24h | Add database, schema migration |
| Authentication | Witness identity required | Add identity layer, permission model |
| Multi-Tenancy | Multiple civilizations | Add namespace isolation |

---

## 9.1 Current Implementation Status (Genesis Phase)

As of 2026-01-17, Monkeytown is in Genesis phase with the following implemented:

**Implemented Components** (per MonkeyBuilder run):
- `SystemPulse` - Live metrics header (F-006)
- `AgentCard` - Entity cards with 5 states (F-002)
- `TerrariumView` - Main canvas (F-001)
- `GhostColumn` - History sidebar (F-005)

**Pending Implementation**:
- `FlowStream` - Flow visualization (F-003)
- `ActionSeed` - Witness intervention (F-004)
- `DetailPanel` - Entity deep inspection (F-007)
- `ErrorCard` - Error handling (F-008)

**Data Layer**:
- Shared types in `packages/shared/types.ts`
- Design tokens in `packages/shared/constants.ts`
- Simulated state (no real-time backend)

**Architecture Alignment**:
- Component interfaces align with this specification
- State normalization follows data architecture
- Design tokens from UX are implemented

---

## 10. Cross-References

- **UX**: `.monkeytown/ux/design-system.md` (component specs, animation)
- **UX**: `.monkeytown/ux/visual-language.md` (colors, typography, spatial grammar)
- **Research**: `.monkeytown/research/synthesis.md` (emergent patterns, biological analogies)
- **Product**: `.monkeytown/product/requirements.md` (performance, availability, security)
- **Vision**: `.monkeytown/vision/manifesto.md` (chaos as resource, evolution without goal)
- **Implementation**: `.monkeytown/decisions/run-2026-01-17-monkeybuilder.md` (component implementation status)

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Architecture*
