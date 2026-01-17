# Data Flow

**ChaosArchitect** | `data-flow.md` | Information Movement Through Monkeytown

---

## 1. Flow Topology

Data does not flow in pipelines. It flows in streams—continuous, unordered, eventually consistent.

The fundamental truth of Monkeytown: **Files are the only communication.** There is no direct messaging between agents. No shared memory. No real-time coordination.

All coordination happens through the repository.

```
┌───────────────────────────────────────────────────────────────────────────┐
│                          AGENT OUTPUTS (FILES)                            │
├───────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│   │  FounderAI  │  │ChaosArchitect│  │SimianResearcher│ │PrimateDesigner│   │
│   │   writes    │  │   writes    │  │   writes    │  │   writes    │     │
│   │vision/*.md  │  │architecture/│  │research/*.md│  │   ux/*.md   │     │
│   └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘     │
│          │                │                │                │            │
│          └────────────────┴────────────────┴────────────────┘            │
│                                    │                                      │
│                                    ▼                                      │
│                     ┌─────────────────────────────┐                      │
│                     │      GIT REPOSITORY         │                      │
│                     │  (Immutable History,        │                      │
│                     │   Single Source of Truth)   │                      │
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

### The File Flow Pattern

Every piece of information in Monkeytown flows through files:

1. **Agent produces**: Agent writes to its domain folder
2. **Repository captures**: Git commits the change
3. **Others discover**: Other agents read the file on their next run
4. **Witness observes**: Witnesses see the file through the Terrarium View

This is not a pipeline. This is a **civilization built on persistence**.

---

## 2. Event Categories

Events are the heartbeat of the visualization layer. They flow through the event stream for witness consumption.

### 2.1 Entity Events

**Purpose**: Communicate entity lifecycle changes to witnesses

```typescript
type EntityEvent =
  | { type: 'entity_created'; entity: Entity }
  | { type: 'entity_updated'; entityId: string; changes: Partial<Entity> }
  | { type: 'entity_status_changed'; entityId: string; oldStatus: EntityStatus; newStatus: EntityStatus }
  | { type: 'entity_metrics_updated'; entityId: string; metrics: EntityMetrics }
  | { type: 'entity_deleted'; entityId: string };
```

**Emitters**: Agents creating or modifying entities (through file commits)
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
**Consumers**: Witness (feedback), Agents (discovery through file reading)

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

### 3.1 Agent → Witness (The Read Path)

This is the fundamental read pattern. Agents produce files. Witnesses read those files through the visualization layer.

```
Agent computes state (in its domain)
    │
    ▼
Agent writes file to repository (domain-specific)
    │
    ▼
Git commits the change (immutable record)
    │
    ▼
Event stream broadcasts update (for witnesses)
    │
    ▼
Witness client subscribes to event stream
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
- State merge conflict → Last-write-wins (Git handles this at commit level)

**Key Insight**: The file is the truth. The event stream is just a notification that a file changed.

### 3.2 Witness → Agent (The Write Path)

Witnesses cannot directly communicate with agents. They plant seeds. Agents discover seeds.

```
Witness clicks ActionSeed (plant intention)
    │
    ▼
Seed form validation (strict type boundaries)
    │
    ▼
Seed written to repository (public seed file)
    │
    ▼
Git commits the seed
    │
    ▼
Event stream broadcasts seed_planted
    │
    ▼
Agent runs, reads repository, discovers seed
    │
    ▼
Agent accepts/rejects seed (produces new file)
    │
    ▼
Seed status updated in repository
    │
    ▼
Witness observes result (≤ 200ms + agent processing time)
```

**Latency Budget**: 200ms acknowledgment + variable processing
**Failure Modes**:
- Seed lost in transit → Timeout, retry notification
- No agent discovers → Seed expires (24h max)

**Key Insight**: Witnesses plant. Agents discover. Neither talks directly to the other.

### 3.3 Agent ↔ Agent (The Coordination Path)

Agents do not communicate directly. They leave signals in files. Other agents discover those signals.

```
Agent A needs Agent B's attention
    │
    ▼
Agent A writes signal file (cross-reference)
    │
    ▼
Git commits the signal
    │
    ▼
Agent A's run completes, commits, opens PR
    │
    ▼
Human filters (approves or rejects)
    │
    ▼
If approved: Agent B's next run discovers the signal
    │
    ▼
Agent B processes (or ignores) the signal
    │
    ▼
Agent B produces output, commits, PRs
```

**Ordering**: Within-agent events ordered by Git timestamp; cross-agent events unordered
**Failure Modes**:
- Signal ignored → Signal expires (agents are autonomous)
- Contradictory signals → Both persist. Humans resolve through merge.

**Key Insight**: Contradiction creates documents, not modifications. Both agents' files persist.

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
│  (Git repository: the only source of truth)                 │
└─────────────────────────────────────────────────────────────┘
```

### 4.2 State Mutation Rules

| Layer | Mutated By | Merge Strategy |
|-------|-----------|----------------|
| Render | Witness interaction | Direct assignment |
| Entity | Event stream | Last-write-wins with deep merge |
| Flow | Event stream | Replace by ID |
| Seed | Witness + Event stream | Last-write-wins |
| Persisted | Agents (file commits) | Git merge (conflict = human filter) |

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

Events pass through processors before consumption. This is the transformation pipeline for the visualization layer.

```
Raw Event (from Git webhook)
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
| Entity timestamp | Server epoch (Git commit) | Milliseconds |
| Flow timestamp | Server epoch | Milliseconds |
| Witness action | Client clock | Client-local |
| Ghost column aging | Server epoch | Hours |

**Note**: Client timestamps are for display only; Git timestamps enforce ordering.

### 6.2 Ghost Column Mechanics

The ghost column is not a cache. It is history.

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
────────────────────────────────────────────
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
- **Vision**: `.monkeytown/vision/manifesto.md` (chaos as resource)
- **Vision**: `.monkeytown/vision/principles.md` (global laws of Monkeytown)

---

*Document Version: 1.1.0*
*ChaosArchitect | Monkeytown Architecture*
