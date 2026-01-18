# Architecture Overview

**Derived from agent decisions and codebase analysis.**

---

## System Philosophy

Monkeytown is not designed. It emerges.

The architecture reflects this philosophy: agents connect and communicate through file-based patterns, not rigid contracts. The system adapts, bends, and never breaks.

---

## High-Level Structure

```
┌─────────────────────────────────────────────────────┐
│              GitHub Actions Workflows               │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │           Agent Orchestration                │  │
│  │  ┌────────┐  ┌────────┐  ┌────────┐         │  │
│  │  │Founder │  │Architect│  │Builder │  ...    │  │
│  │  └───┬────┘  └────┬───┘  └───┬────┘         │  │
│  │      │            │           │              │  │
│  │      └────────────┼───────────┘              │  │
│  │                   ▼                          │  │
│  │         ┌──────────────────┐                 │  │
│  │         │   Repository     │                 │  │
│  │         │   (File Store)   │                 │  │
│  │         └──────────────────┘                 │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
          │
          │ (Pull Requests)
          ▼
┌─────────────────────────────────────────────────────┐
│                   Human Review                      │
│              (Merge/Reject Decisions)               │
└─────────────────────────────────────────────────────┘
          │
          │
          ▼
┌─────────────────────────────────────────────────────┐
│              Server (Node.js Runtime)               │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │              Agent Runtime                   │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐     │  │
│  │  │ Agent 1 │  │ Agent 2 │  │ Agent N │     │  │
│  │  └────┬────┘  └────┬────┘  └────┬────┘     │  │
│  │       │            │            │           │  │
│  │       └────────────┼────────────┘           │  │
│  │                    ▼                         │  │
│  │            ┌──────────────┐                  │  │
│  │            │  Event Bus   │                  │  │
│  │            │  (Internal)  │                  │  │
│  │            └──────┬───────┘                  │  │
│  │                   │                          │  │
│  │         ┌─────────┴─────────┐                │  │
│  │         ▼                   ▼                │  │
│  │  ┌─────────────┐    ┌─────────────┐         │  │
│  │  │   State     │    │   History   │         │  │
│  │  │   Store     │    │   Store     │         │  │
│  │  └─────────────┘    └─────────────┘         │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Server (Node.js)

The server follows a modular architecture:

```
server/src/
├── index.ts                    # Entry point and server setup
├── simulation.ts               # Agent simulation logic
├── events/                     # Event handling
├── economics/                  # Economic simulation
└── types/                      # Type definitions
```

### Shared Layer

```
shared/
├── types.ts                    # Core type definitions
│   ├── Entity                  # Agent/contract/transaction base
│   ├── SystemMetrics           # Live system state
│   ├── Flow                    # Communication between entities
│   └── Message                 # Agent communication
│
└── index.ts                    # Public exports
```

### Monorepo Structure

```
packages/
└── shared/                     # Internal npm package
    ├── package.json            # Package configuration
    └── (shared types)
```

---

## Data Architecture

### Entity Model

```typescript
interface Entity {
  id: string;                    // Unique identifier (e.g., "ag_7x9y2z")
  name: string;                  // Display name
  type: 'agent' | 'contract' | 'transaction';
  status: EntityStatus;          // idle | active | processing | complete | error
  metrics: {
    efficiency: number;          // 0-1 performance score
    load: string;                // Percentage string
    connections: number;         // Active connections
  };
  lastAction?: string;           // Human-readable action description
  since?: string;                // Time in current state
}
```

### System Metrics

```typescript
interface SystemMetrics {
  activeAgents: number;
  pendingFlows: number;
  contractsSettled: number;
  systemLoad: number;            // 0-1 load percentage
  health: 'healthy' | 'thinking' | 'broken';
}
```

### Flow Model

```typescript
interface Flow {
  id: string;
  from: Entity['id'];
  to: Entity['id'];
  type: 'message' | 'resource' | 'contract' | 'signal';
  status: 'pending' | 'active' | 'complete' | 'error';
  payload?: unknown;
}
```

---

## Data Flow

### Agent Communication Path

```
1. Agent reads repository state
2. Agent processes information using @ax-llm/ax
3. Agent writes output to assigned domain folder
4. Agent commits changes and opens PR
5. Human reviews and merges/rejects
6. Other agents discover changes in next cycle
```

### Event Processing Path

```
1. Server receives event or scheduled trigger
2. Event dispatched to relevant agents
3. Agents process events independently
4. State changes propagated through event bus
5. History recorded in state store
```

---

## Performance Constraints

| Constraint | Limit | Reason |
|------------|-------|--------|
| Concurrent agents | 50 | Performance degrades linearly beyond |
| Event processing | 100ms | System responsiveness |
| Metrics refresh | 1000ms minimum | Server load |
| History items | 1000 before degradation | Memory management |
| Log lines per entity | 1000 | Memory management |

---

## Future Architecture

The current architecture is incomplete. Future additions include:

### Immediate (Next Phase)

1. **Enhanced Event Bus** - More sophisticated event routing
2. **Agent State Persistence** - Long-term memory for agents
3. **Tool Integration** - External API and service connectors

### Near-Term

1. **Multi-Agent Coordination** - Enhanced communication patterns
2. **Performance Monitoring** - Real-time system health tracking
3. **Error Recovery** - Graceful failure handling

### Long-Term

1. **Distributed Execution** - Multi-node agent coordination
2. **Learning Pipeline** - Agent capability improvement over time
3. **Domain Specialization** - Vertical agent expertise development

---

## Biological Pattern References

Architecture is inspired by natural systems:

| Pattern | Application |
|---------|-------------|
| Slime Mold Networks | Emergent agent coordination |
| Mycelial Networks | File-based communication |
| Ant Colony Optimization | Task discovery and execution |
| Neural Memory Consolidation | History and state management |
| Immune System | System health monitoring |

---

*Document Version: 2.0.0*
*Updated to reflect Node.js-only architecture*
