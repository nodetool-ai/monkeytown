# Architecture Overview

**Derived from agent decisions and codebase analysis.**

---

## System Philosophy

Monkeytown is not designed. It emerges.

The architecture reflects this philosophy: components connect and communicate through observable patterns, not rigid contracts. The system adapts, bends, and never breaks.

---

## High-Level Structure

```
┌─────────────────────────────────────────────────────┐
│                   Witness (Browser)                 │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │              React Application               │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │            Terrarium View              │  │  │
│  │  │  ┌──────────┐  ┌──────────────────┐   │  │  │
│  │  │  │AgentCard │  │    AgentCard     │   │  │  │
│  │  │  │   F-002  │  │       F-002      │   │  │  │
│  │  │  └──────────┘  └──────────────────┘   │  │  │
│  │  │              Flow Streams              │  │  │
│  │  │  ┌──────┐    ───────►    ┌───────┐   │  │  │
│  │  │  │Agent │    F-003       │ Agent │   │  │  │
│  │  │  └──────┘                └───────┘   │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │              Ghost Column                     │  │
│  │              System Pulse                     │  │
│  └──────────────────────────────────────────────┘  │
│                                                      │
└─────────────────────────────────────────────────────┘
         │
         │ (WebSocket / Future API)
         ▼
┌─────────────────────────────────────────────────────┐
│              Server (Future)                        │
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

### Frontend (React + Vite)

The frontend follows a component-based architecture with clear separation of concerns:

```
web/src/
├── components/
│   ├── AgentCard.tsx           # F-002: Entity visualization
│   │   ├── AgentCard.css       # Styles
│   │   ├── 5 visual states     # idle, active, processing, complete, error
│   │   └── Metrics display     # efficiency, load, connections
│   │
│   ├── TerrariumView.tsx       # F-001: Main canvas
│   │   ├── Emergent layout     # Flow-based positioning
│   │   ├── Gravity-based       # attention, chronological, spatial
│   │   └── Canvas component    # React-based rendering
│   │
│   ├── SystemPulse.tsx         # F-006: Header metrics
│   │   ├── Live metrics        # agents, flows, settled, load
│   │   ├── Health indicator    # green, amber, red
│   │   └── Witness pulse       # Observer presence
│   │
│   ├── GhostColumn.tsx         # F-005: History sidebar
│   │   ├── Reverse-chronology  # Most recent first
│   │   ├── 0.4 opacity fade    # Visual aging
│   │   └── Click-to-restore    # History interaction
│   │
│   └── components.css          # Global component styles
│
├── App.tsx                     # Main application shell
├── main.tsx                    # Entry point
├── index.css                   # Global styles + CSS variables
├── App.css                     # App-specific styles
└── vite-env.d.ts              # TypeScript declarations
```

### Shared Layer

```
shared/
├── types.ts                    # Core type definitions
│   ├── Entity                  # Agent/contract/transaction base
│   ├── SystemMetrics           # Live system state
│   ├── Flow                    # Communication between entities
│   └── Seed                    # Witness intervention intent
│
├── constants.ts                # Design tokens
│   ├── Colors                  # Jungle palette, semantic colors
│   ├── Animations              # Duration, easing curves
│   ├── Layout                  # Spacing, radius, z-index
│   └── Typography              # Font sizes, weights, line heights
│
└── index.ts                    # Public exports
```

### Monorepo Structure

```
packages/
└── shared/                     # Internal npm package
    ├── package.json            # Package configuration
    └── (copies of shared types)
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

### Seed Model

```typescript
interface Seed {
  id: string;
  type: 'contract' | 'constraint' | 'resource' | 'query';
  status: 'germinating' | 'sprouting' | 'growing' | 'mature';
  plantedAt: Date;
  expiresAt: Date;
}
```

---

## Design Tokens

The visual system uses CSS custom properties for consistency:

### Colors

```css
:root {
  /* Primary - The Jungle Palette */
  --color-jungle-canopy:      #1a3a2f;
  --color-jungle-depth:       #0f1f1a;
  --color-monkey-fur:         #d4a574;
  --color-monkey-fur-light:   #e8c9a8;
  --color-dawn-citrus:        #ff6b35;

  /* Semantic - Status States */
  --color-signal-green:       #4ade80;
  --color-warning-amber:      #fbbf24;
  --color-error-red:          #ef4444;

  /* Accent - Connection & New */
  --color-purple-connect:     #a855f7;
  --color-cyan-new:           #22d3ee;
}
```

### Typography

```css
:root {
  --font-family-mono: 'Geist Mono', 'SF Mono', 'Consolas', monospace;
  --font-size-display: 32px;
  --font-size-h1: 24px;
  --font-size-h2: 18px;
  --font-size-body: 14px;
  --font-size-caption: 11px;
}
```

### Animation

```css
:root {
  --duration-instant:   50ms;
  --duration-quick:     150ms;
  --duration-standard:  300ms;
  --duration-considered: 500ms;
  --duration-breath:    1000ms;

  --ease-smooth:  cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce:  cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Spacing

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  24px;
  --space-6:  32px;
  --space-8:  48px;
  --space-10: 64px;

  --radius-sm:     6px;
  --radius-md:     12px;
  --radius-lg:     20px;
  --radius-full:   9999px;
}
```

---

## Component States

### Agent Card States

| State | Border Color | Background | Animation |
|-------|--------------|------------|-----------|
| Idle | Subtle glow | Base card | Gentle breath |
| Active | Jungle Canopy | Elevated | Lift 2px |
| Processing | Amber pulse | Animated | Thought bubble |
| Complete | Green fade | Ghost dim | Fade right |
| Error | Red pulse | Red tint | Shake |

### System Health States

| State | Color | Meaning |
|-------|-------|---------|
| Healthy | Green | All systems nominal |
| Thinking | Amber | Processing, no errors |
| Broken | Red | System failure |

---

## Data Flow

### Read Path (Observation)

```
1. Witness opens application
2. App.tsx mounts React application
3. TerrariumView subscribes to live data
4. Components render with current state
5. SystemPulse displays live metrics
6. GhostColumn shows historical items
```

### Write Path (Intervention - Future)

```
1. Witness triggers Action Seed
2. Seed dispatched to server
3. Server validates seed type
4. Relevant agents discover seed
5. Agent acts on seed
6. Result propagated to all witnesses
7. GhostColumn records completion
```

---

## Performance Constraints

| Constraint | Limit | Reason |
|------------|-------|--------|
| Concurrent flows | 50 | Performance degrades linearly beyond |
| Layout resolution | 100ms | User experience |
| Animation framerate | 60fps minimum | Visual quality |
| Metrics refresh | 1000ms minimum | Server load |
| History items | 1000 before degradation | Memory management |
| Log lines per entity | 1000 | Memory management |

---

## Future Architecture

The current architecture is incomplete. Future additions include:

### Immediate (Next Phase)

1. **WebSocket Integration** - Real-time updates instead of polling
2. **Server Package** - Backend API for agent runtime
3. **Seed Dispatch API** - Witness intervention mechanism

### Near-Term

1. **Flow Visualization** - Animated SVG paths between entities
2. **Detail Panels** - Progressive disclosure for deep inspection
3. **Error Cards** - Graceful failure presentation

### Long-Term

1. **Multi-Witness Sync** - Real-time collaboration
2. **Playback Mode** - Time-travel through history
3. **Annotation System** - Witnesses leaving notes

---

## Biological Pattern References

Architecture is inspired by natural systems:

| Pattern | Application |
|---------|-------------|
| Slime Mold Networks | Emergent layout positioning |
| Boids Flocking | Agent card movement and grouping |
| Mycelial Networks | Flow stream visualization |
| Ant Colony Optimization | Action seed discovery |
| Neural Memory Consolidation | Ghost column behavior |
| Immune System | System pulse health indicators |

---

*Document Version: 1.0.0*
*Derived from agent decisions and codebase analysis*
