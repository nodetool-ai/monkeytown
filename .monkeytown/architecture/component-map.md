# Component Map

**ChaosArchitect** | `component-map.md` | Entity Relationships and Dependencies

---

## 1. The Agent Domain Map

Each agent owns its domain. Cross-boundary writes are extinction. This map shows the current agent territories.

```
.monkeytown/
├── vision/          # FounderAI - defines meaning
├── architecture/    # ChaosArchitect - imposes structure
├── research/        # SimianResearcher - feeds knowledge
├── ux/              # PrimateDesigner - imagines interfaces
├── economics/       # BananaEconomist - invents incentives
├── security/        # JungleSecurity - assumes enemies
├── qa/              # ChaosTester - breaks everything
├── chaos/           # MadChimp - introduces chaos
└── decisions/       # AlphaOrchestrator - decides what executes

Codebase (/)        # MonkeyBuilder - translates to reality
```

## 2. Component Hierarchy

The system is not strictly hierarchical, but relationships can be categorized by scope.

```
SCOPE: GLOBAL
├── SystemPulse
│   └── Depends on: All entities, All flows
│   └── Consumers: Witness
│
SCOPE: CANVAS
├── TerrariumView
│   └── Contains: AgentCard[], FlowStream[], Seed[]
│   └── Layout Engine: Emergent (gravity-based)
│   └── Consumers: Witness
│
SCOPE: ENTITY
├── AgentCard
│   └── Represents: Agent entities
│   └── Expands to: DetailPanel
│   └── Emits: Entity selection
│
├── ContractCard (future)
│   └── Represents: Contract entities
│   └── Expands to: DetailPanel
│
├── TransactionCard (future)
│   └── Represents: Transaction entities
│   └── Expands to: DetailPanel
│
SCOPE: INTERACTION
├── ActionSeed
│   └── Produces: Seed entities
│   └── Inputs: SeedIntent (type, parameters)
│   └── Consumers: TerrariumView, Witness
│
├── DetailPanel
│   └── Shows: Entity deep-dive (status, logs, connections, history)
│   └── Inputs: Selected entity ID
│   └── Consumers: Witness, TerrariumView
│
SCOPE: TEMPORAL
├── GhostColumn
│   └── Contains: Completed entities
│   └── Inputs: Completed entity stream
│   └── Outputs: Restored entity
│   └── Consumers: Witness, TerrariumView
│
SCOPE: FLOW
├── FlowStream
│   └── Connects: Source entity → Target entity
│   └── Represents: Flow entities
│   └── Inputs: Flow ID, type, status
│   └── Consumers: TerrariumView
```

---

## 2. Dependency Graph

### 2.1 Runtime Dependencies

The Terrarium is an ecosystem, not a hierarchy. Components exist through proximity, not through subordination.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         WITNESS BROWSER                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    TerrariumView (Root)                      │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐ │   │
│  │  │FounderAI│  │ChaosArc │  │Simian   │  │   ActionSeed    │ │   │
│  │  │  Card   │  │ hitect  │  │Research │  │   (Witness)     │ │   │
│  │  └────┬────┘  │  Card   │  │  Card   │  └────────┬────────┘ │   │
│  │       │       └────┬────┘  └────┬────┘           │          │   │
│  │       │            │            │                 │          │   │
│  │       └────────────┴─────┬──────┴─────────────────┘          │   │
│  │                          │                                    │   │
│  │                    ┌─────┴─────┐                             │   │
│  │                    │FlowStream │◄────────────────────────────┘   │
│  │                    └─────┬─────┘                                 │
│  │                          │                                      │   │
│  │  ┌───────────────────────┴───────────────────────────────┐     │   │
│  │  │                   GhostColumn                          │     │   │
│  │  │         (History of completed entities)                │     │   │
│  │  └───────────────────────────────────────────────────────┘     │   │
│  │                                                               │   │
│  └───────────────────────────────────────────────────────────────┘   │
│                              │                                     │
│                              ▼                                     │
│                    ┌─────────────────┐                             │
│                    │   SystemPulse   │                             │
│                    │   (Civilization │                             │
│                    │    Health)      │                             │
│                    └─────────────────┘                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 2.2 Data Dependencies

| Component | Inputs | Outputs | Mutates State |
|-----------|--------|---------|---------------|
| TerrariumView | entities, flows, seeds | entityClick, seedPlant | Layout state |
| AgentCard | entity, metrics | click | None (presentation) |
| FlowStream | from, to, type, status | complete, error | None (presentation) |
| ActionSeed | seedTypes, pendingSeeds | plant | Creates Seed |
| GhostColumn | completedEntities | restore | LocalStorage |
| SystemPulse | metrics, alerts | None | None (presentation) |
| DetailPanel | entityId | close | None (presentation) |

## 3. Entity Relationships

### 3.1 Agent ↔ Agent

**Relationship**: Communication via Flow

```
Agent A ───Flow(type=message)───► Agent B
```

**Cardinality**: Many-to-many
**Lifecycle**: Flow created when agent needs to communicate; destroyed when complete
**Conflict**: Both agents may produce contradictory files. Both persist. Humans filter.

### 3.2 Agent ↔ Flow

**Relationship**: Source or Destination

```
Agent A ──► Flow ──► Agent B
```

**Cardinality**: One flow has exactly one source and one target
**Lifecycle**: Flow outlasts source agent's action; persists until complete/error

### 3.3 Witness ↔ Seed

**Relationship**: Planted intention

```
Witness ──► Seed(type=contract, params=...) ──► Agent discovery
```

**Cardinality**: Many seeds per witness, one planter per seed
**Lifecycle**: Created by witness; discovered by agents; becomes contract or expires

### 3.4 Entity ↔ GhostColumn

**Relationship**: Historical record

```
Entity ──► Complete ──► GhostColumn ──► (optional) Restore
```

**Cardinality**: Many-to-one
**Lifecycle**: Entity enters on complete; fades over 24h; restored on witness request

---

## 4. Component Interface Contracts

### 4.1 TerrariumView Interface

```typescript
interface TerrariumViewProps {
  // Data inputs - the present moment
  entities: Entity[];
  flows: Flow[];
  seeds: Seed[];
  
  // Layout configuration - emergent behavior
  gravityMode: 'attention' | 'chronological' | 'spatial';
  
  // Event handlers - witness interaction
  onEntityClick: (entityId: string) => void;
  onSeedPlant: (intent: SeedIntent) => void;
  onSeedComplete: (seedId: string, result: SeedResult) => void;
}
```

### 4.2 AgentCard Interface

Each agent card represents a living entity in the civilization.

```typescript
interface AgentCardProps {
  // Entity data
  id: string;
  name: string;
  status: EntityStatus;
  lastAction: string;
  since: string;
  
  // Metrics - the pulse of this entity
  metrics: {
    efficiency: number;
    load: number;
    connections: number;
  };
  
  // Interactions
  onClick: () => void;
  
  // Visual customization
  size?: 'sm' | 'md' | 'lg';
  focused?: boolean;
}
```

### 4.3 FlowStream Interface

Flows are the arteries of communication between agents.

```typescript
interface FlowStreamProps {
  // Connection
  from: string;
  to: string;
  
  // Flow data
  id: string;
  type: 'message' | 'resource' | 'contract' | 'signal';
  status: EntityStatus;
  
  // Animation
  progress?: number;  // 0-1 for active flows
  
  // Events
  onComplete?: (flowId: string) => void;
  onError?: (flowId: string, error: FlowError) => void;
}
```

### 4.4 ActionSeed Interface

Seeds are witness interventions that agents may discover and act upon.

```typescript
interface ActionSeedProps {
  // State
  pendingSeeds: Seed[];
  maxPending: number;  // Default: 5
  
  // Seed types available - strict boundaries
  allowedTypes: SeedType[];
  
  // Events
  onPlant: (intent: SeedIntent) => void;
  onCancel: (seedId: string) => void;
  onComplete: (seedId: string, result: SeedResult) => void;
}
```

## 5. Dependency Inversion Points

### 5.1 Event Stream Abstraction

Components depend on event types, not specific sources.

```typescript
// Instead of:
websocket.on('agent_update', handleAgent);

// Use:
eventBus.subscribe('agent_update', handleAgent);
```

**Benefit**: Swap WebSocket for SSE or polling without component changes

### 5.2 Layout Engine Abstraction

TerrariumView delegates positioning, not hardcodes gravity.

```typescript
interface LayoutEngine {
  position(entities: Entity[], bounds: Bounds): PositionedEntity[];
}

const engines = {
  attention: AttentionLayout,
  chronological: ChronologicalLayout,
  spatial: SpatialLayout,
};
```

**Benefit**: Add new layout modes without changing component structure

### 5.3 Storage Abstraction

GhostColumn depends on storage interface, not LocalStorage.

```typescript
interface Persistence {
  save(key: string, value: unknown): void;
  load(key: string): unknown | null;
  delete(key: string): void;
}
```

**Benefit**: Swap LocalStorage for IndexedDB or server storage later

## 6. Coupling Analysis

### 6.1 Tight Coupling (Inherited)

| Components | Coupling Point | Justification |
|------------|----------------|---------------|
| TerrariumView ↔ AgentCard | Entity array | Performance optimization (single source) |
| FlowStream ↔ AgentCard | Coordinates | Visual connection requires shared position |
| SystemPulse ↔ All | Metrics | Global health view needs system-wide data |

### 6.2 Loose Coupling (Achieved)

| Components | Coupling Mechanism | Benefit |
|------------|-------------------|---------|
| Witness ↔ Any | Event stream subscription | Witnesses are decoupled from sources |
| ActionSeed ↔ Agents | Seed discovery protocol | No direct agent knowledge |
| DetailPanel ↔ Entity | ID reference only | Entity can change without panel update |

### 6.3 Forbidden Coupling

| Pattern | Forbidden Because |
|---------|-------------------|
| AgentCard ↔ GhostColumn | Temporal coupling—cards don't know their fate |
| ActionSeed ↔ FlowStream | Resource coupling—seeds don't control flows |
| SystemPulse ↔ AgentCard (direct) | All state flows through TerrariumView |

## 7. Component Lifecycle

### 7.1 Mount Sequence

```
1. Witness connects
2. Event stream initializes
3. TerrariumView mounts
4. SystemPulse mounts
5. GhostColumn mounts (load from persistence)
6. Entity subscriptions begin
7. First render completes (< 100ms budget)
```

### 7.2 Entity Lifecycle

```
Created ──► Idle ──► Active ──► Processing ──► Complete/Error
                                     │
                                     └──► GhostColumn (if complete)
```

### 7.3 Seed Lifecycle

```
Planted ──► Pending ──► Growing ──► Complete/Error
                                      │
                                      └──► Contract/Resource (if complete)
```

### 7.4 Flow Lifecycle

```
Initiated ──► Pending ──► Active ──► Complete/Error
                                    │
                                    └──► GhostColumn (if complete)
```

## 8. Component Extensibility

### 8.1 Adding New Entity Types

1. Add to `EntityType` union in types.ts
2. Create `<TypeName>Card` component (modeled on AgentCard)
3. Add case to TerrariumView entity rendering
4. Update DetailPanel to handle new type
5. Add visual encoding to design-system.md

### 8.2 Adding New Flow Types

1. Add to Flow type union in types.ts
2. Create `<TypeName>Flow` visual component
3. Add visual encoding to FlowStream
4. Update design tokens for new type

### 8.3 Adding New Seed Types

1. Add to SeedType union in types.ts
2. Create seed form for ActionSeed
3. Define agent discovery protocol for new type
4. Update requirements.md with new constraints

## 9. Cross-References

- **System**: `.monkeytown/architecture/system-design.md` (invariant enforcement)
- **UX**: `.monkeytown/ux/design-system.md` (component specifications)
- **UX**: `.monkeytown/ux/visual-language.md` (spatial grammar)
- **Product**: `.monkeytown/product/requirements.md` (feature priorities)
- **Vision**: `.monkeytown/vision/manifesto.md` (chaos as resource)
- **Vision**: `.monkeytown/vision/roadmap.md` (phases of evolution)

---

*Document Version: 1.1.0*
*ChaosArchitect | Monkeytown Architecture*
