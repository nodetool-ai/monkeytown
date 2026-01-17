# Data Flow

**ChaosArchitect** | `data-flow.md` | Information Movement Through Monkeytown

---

## 1. Flow Topology

Data does not flow in pipelines. It flows in streams—continuous, unordered, eventually consistent.

```
┌───────────────────────────────────────────────────────────────────────────┐
│                          AGENT OUTPUTS                                     │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│   │  FounderAI  │  │ChaosArchitect│  │SimianResearcher│ │PrimateDesigner│   │
│   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│          │                │                │                │            │
│          └────────────────┴────────────────┴────────────────┘            │
│                                    │                                      │
│                                    ▼                                      │
│                     ┌─────────────────────────────┐                      │
│                     │      EVENT STREAM           │                      │
│                     │  (Ordered by timestamp,     │                      │
│                     │   grouped by source agent)  │                      │
│                     └──────────────┬──────────────┘                      │
│                                    │                                      │
│          ┌─────────────────────────┼─────────────────────────┐           │
│          │                         │                         │           │
│          ▼                         ▼                         ▼           │
│   ┌─────────────┐         ┌─────────────┐         ┌─────────────┐       │
│   │   Witness   │         │  AlphaOrchestrator │  │   Future    │       │
│   │   (Read)    │         │  (Decide)   │         │  Agents     │       │
│   └─────────────┘         └─────────────┘         └─────────────┘       │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Event Categories

### 2.1 Entity Events

**Purpose**: Communicate entity lifecycle changes

```typescript
type EntityEvent =
  | { type: 'entity_created'; entity: Entity }
  | { type: 'entity_updated'; entityId: string; changes: Partial<Entity> }
  | { type: 'entity_status_changed'; entityId: string; oldStatus: EntityStatus; newStatus: EntityStatus }
  | { type: 'entity_metrics_updated'; entityId: string; metrics: EntityMetrics }
  | { type: 'entity_deleted'; entityId: string };
```

**Emitters**: Agents creating or modifying entities
**Consumers**: Witnesses (rendering), AlphaOrchestrator (decisions)

### 2.2 Flow Events

**Purpose**: Communicate data movement between entities

```typescript
type FlowEvent =
  | { type: 'flow_created'; flow: Flow }
  | { type: 'flow_started'; flowId: string }
  | { type: 'flow_progress'; flowId: string; progress: number }
  | { type: 'flow_complete'; flowId: string }
  | { type: 'flow_failed'; flowId: string; reason: string };
```

**Emitters**: Agents initiating or processing flows
**Consumers**: Witnesses (visualization), TerrariumView (layout)

### 2.3 Seed Events

**Purpose**: Witness interventions entering the system

```typescript
type SeedEvent =
  | { type: 'seed_planted'; seed: Seed }
  | { type: 'seed_discovery'; seedId: string; discovererId: string }
  | { type: 'seed_progress'; seedId: string; progress: number }
  | { type: 'seed_complete'; seedId: string; result: SeedResult }
  | { type: 'seed_failed'; seedId: string; reason: string };
```

**Emitters**: Witnesses (planting), Agents (discovery/completion)
**Consumers**: Witness (feedback), Agents (discovery)

### 2.4 System Events

**Purpose**: Global system state changes

```typescript
type SystemEvent =
  | { type: 'system_metrics'; metrics: SystemMetrics }
  | { type: 'system_alert'; alert: Alert }
  | { type: 'system_health_changed'; oldHealth: HealthStatus; newHealth: HealthStatus };
```

**Emitters**: System monitoring, Agents (metrics)
**Consumers**: SystemPulse (display), Witnesses (notification)

---

## 3. Data Path Analysis

### 3.1 Agent → Witness (Read Path)

```
Agent computes state
    │
    ▼
Event stream (append-only log)
    │
    ▼
Witness client (event subscription)
    │
    ▼
Local state update (merge into entity store)
    │
    ▼
React re-render (if changed)
    │
    ▼
Witness sees update (≤ 100ms latency)
```

**Latency Budget**: 100ms maximum
**Failure Modes**: 
- Stream disconnect → Fallback to polling
- State merge conflict → Last-write-wins

### 3.2 Witness → Agent (Write Path)

```
Witness clicks ActionSeed
    │
    ▼
Seed form validation
    │
    ▼
Seed intent emitted to event stream
    │
    ▼
Event stream broadcasts seed
    │
    ▼
Agent discovers seed (polling or push)
    │
    ▼
Agent accepts/rejects seed
    │
    ▼
Seed status updated
    │
    ▼
Witness observes result (≤ 200ms + processing time)
```

**Latency Budget**: 200ms acknowledgment + variable processing
**Failure Modes**:
- Seed lost in transit → Timeout, retry notification
- No agent discovers → Seed expires (24h max)

### 3.3 Agent ↔ Agent (Peer Path)

```
Agent A needs Agent B's attention
    │
    ▼
Flow created (source: A, target: B)
    │
    ▼
Flow event broadcast
    │
    ▼
Witness visualizes connection
    │
    ▼
Agent B observes flow (local subscription)
    │
    ▼
Agent B processes flow
    │
    ▼
Flow complete/error event
    │
    ▼
Witness updates visualization
```

**Ordering**: Within-agent events ordered; cross-agent unordered
**Failure Modes**:
- Flow timeout → Failed event emitted
- Agent B offline → Flow queued or failed

---

## 4. State Management

### 4.1 State Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    RENDER STATE                              │
│  (React component state: focused, expanded, selected)       │
├─────────────────────────────────────────────────────────────┤
│                     ENTITY STATE                             │
│  (Normalized entities: ID → Entity mapping)                 │
├─────────────────────────────────────────────────────────────┤
│                     FLOW STATE                               │
│  (Active flows: ID → Flow mapping)                          │
├─────────────────────────────────────────────────────────────┤
│                     SEED STATE                               │
│  (Pending seeds: ID → Seed mapping)                         │
├─────────────────────────────────────────────────────────────┤
│                    PERSISTED STATE                           │
│  (Ghost column: LocalStorage-backed history)                │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 State Mutation Rules

| Layer | Mutated By | Merge Strategy |
|-------|-----------|----------------|
| Render | Witness interaction | Direct assignment |
| Entity | Event stream | Last-write-wins with deep merge |
| Flow | Event stream | Replace by ID |
| Seed | Witness + Event stream | Last-write-wins |
| Persisted | Witness + Entity lifecycle | Append-only (new entries) |

### 4.3 Normalization

All entities are stored in normalized form to prevent duplication.

```typescript
// Instead of nested:
const entityWithChildren = {
  id: 'ag_1',
  children: [child1, child2, child3]
};

// Use normalized:
const entities = {
  'ag_1': { id: 'ag_1', children: ['ch_1', 'ch_2', 'ch_3'] },
  'ch_1': { id: 'ch_1', parentId: 'ag_1' },
  'ch_2': { id: 'ch_2', parentId: 'ag_1' },
  'ch_3': { id: 'ch_3', parentId: 'ag_1' }
};
```

**Benefit**: O(1) lookup, no duplicate updates, easier persistence

---

## 5. Stream Processing

### 5.1 Event Transformation

Events pass through processors before consumption.

```
Raw Event
    │
    ▼
┌─────────────────────┐
│  Validation Layer   │  // Reject malformed events
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Normalization Layer│  // Transform to canonical form
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Enrichment Layer   │  // Add derived fields (timestamps, computed)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Routing Layer      │  // Send to relevant subscribers
└──────────┬──────────┘
           │
           ▼
Subscriber Handlers
```

### 5.2 Backpressure Handling

When subscribers cannot keep up:

```
Event Rate > Processing Rate
           │
           ▼
    ┌──────────────┐
    │ Buffer Full? │
    └──────┬───────┘
           │
    ┌──────┴───────┐
    │              │
   YES             NO
    │              │
    ▼              ▼
Throttle       Process
producers      normally
    │              │
    ▼              ▼
Drop events   Monitor for
with          future throttling
warning
```

### 5.3 Event Deduplication

Events may arrive multiple times (at-least-once delivery).

```typescript
function deduplicate<T extends { id: string }>(
  events: T[],
  maxAge: number = 60000
): T[] {
  const seen = new Set<string>();
  const cutoff = Date.now() - maxAge;
  
  return events.filter(event => {
    if (event.timestamp < cutoff) return false;  // Expired
    if (seen.has(event.id)) return false;        // Duplicate
    seen.add(event.id);
    return true;
  });
}
```

---

## 6. Temporal Data

### 6.1 Time Sources

| Data Type | Time Source | Precision |
|-----------|-------------|-----------|
| Entity timestamp | Server epoch | Milliseconds |
| Flow timestamp | Server epoch | Milliseconds |
| Witness action | Client clock | Client-local |
| Ghost column aging | Server epoch | Hours |

**Note**: Client timestamps are for display only; server timestamps enforce ordering.

### 6.2 Ghost Column Mechanics

```
Entity completes
       │
       ▼
  ┌─────────┐
  │ Is valid│
  │ (24h)?  │
  └────┬────┘
       │
  ┌────┴────┐
  │         │
 YES        NO
  │         │
  ▼         ▼
Add to    Discard
Ghost     (or archive
Column    if configured)
  │
  │   [Time passes]
  │
  ▼
Opacity fades (40% → 0%)
  │
  │   [24h elapses]
  │
  ▼
Remove from display
  │
  │   [User clicks restore]
  │
  ▼
Move back to main view
```

### 6.3 Time-Series Metrics

System metrics are retained for history visualization.

```
┌─────────────────────────────────────────┐
│ System Metrics Time Series              │
├─────────────────────────────────────────┤
│                                         │
│  ┌───┐     ┌───┐     ┌───┐     ┌───┐   │
│  │10 │─────│15 │─────│12 │─────│18 │   │
│  └───┘     └───┘     └───┘     └───┘   │
│   t=0      t=1h     t=2h     t=3h      │
│                                         │
│  Rendered as:                           │
│  - Line chart in SystemPulse            │
│  - Heat map in GhostColumn              │
│  - Summary in DetailPanel               │
└─────────────────────────────────────────┘
```

---

## 7. Flow Visualization Data

### 7.1 Flow State Mapping

```
Flow Status    →    Visual Representation
─────────────────────────────────────────────
pending        →    Pulsing dot at source
active         →    Animated dashed line
complete       →    Solid line (dimmed)
error          →    Red X at failure point
```

### 7.2 Flow Data Requirements

For 60fps animation:

| Metric | Requirement |
|--------|-------------|
| Position updates | 60Hz (every 16ms) |
| Progress updates | 10Hz (every 100ms) |
| Max concurrent flows | 50 |
| Max path complexity | O(n) per render |

### 7.3 Flow Optimization

```
Too many flows (> 50)?
         │
         ▼
   ┌─────────────┐
   │ Aggregation │    Show flow bundles, not individual flows
   │   Mode      │
   └─────────────┘
         │
         ▼
   ┌─────────────┐
   │  Collapse   │    Group by source or target
   │  Groups     │
   └─────────────┘
         │
         ▼
   ┌─────────────┐
   │  Perimeter  │    Show count, expand on hover
   │   Summary   │
   └─────────────┘
```

---

## 8. Error Propagation

### 8.1 Error Flow

```
Component detects error
         │
         ▼
   ┌─────────────┐
   │Categorize   │
   └──────┬──────┘
          │
   ┌──────┼──────┐
   │      │      │
Retryable  Fatal  Informational
   │      │      │
   ▼      ▼      ▼
Retry   Error   Log only
        Card    + Alert badge
```

### 8.2 Error Event Schema

```typescript
interface ErrorEvent {
  type: 'error';
  error: {
    code: string;        // Machine-readable code
    message: string;     // Human-readable description
    context: {           // Structured context
      component: string;
      entityId?: string;
      flowId?: string;
      timestamp: number;
    };
    recoverable: boolean;
    retryAction?: string;
  };
}
```

### 8.3 Error Visibility

| Error Type | Visual | User Action |
|------------|--------|-------------|
| Entity error | Red pulse on card | Click to inspect |
| Flow error | Red X on flow line | Click to retry |
| Seed error | Toast notification | Dismiss or inspect |
| System error | Full-screen overlay | Reload recommended |

---

## 9. Cross-References

- **System**: `.monkeytown/architecture/system-design.md` (invariant enforcement)
- **UX**: `.monkeytown/ux/design-system.md` (component behavior)
- **Research**: `.monkeytown/research/synthesis.md` (flow stream patterns)
- **Product**: `.monkeytown/product/requirements.md` (latency budgets)

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Architecture*
