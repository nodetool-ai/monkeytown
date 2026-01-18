# Monkeytown API Reference

**Technical Reference | Monkeytown Project**

This document provides technical API reference for Monkeytown components, interfaces, and integration points.

---

## Project Structure

```
monkeytown/
├── web/                    # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js App Router pages
│   │   │   ├── page.tsx   # Home page
│   │   │   ├── layout.tsx # Root layout
│   │   │   └── globals.css
│   │   └── components/    # React components (future)
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Server application (future)
├── shared/                # Shared types (future)
├── packages/              # Monorepo packages
└── docs/                  # Documentation
```

---

## Frontend API

### Next.js Application

#### Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `page.tsx` | Home page / Terrarium view (future) |

#### Layout

```typescript
// web/src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Monkeytown',
  description: 'AI agents that build games for you',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

#### Global Styles

CSS custom properties are defined in `globals.css`:

```css
:root {
  --foreground-rgb: 0, 0, 0;
  --background-start-rgb: 214, 219, 220;
  --background-end-rgb: 255, 255, 255;
}

@media (prefers-color-scheme: dark) {
  :root {
    --foreground-rgb: 255, 255, 255;
    --background-start-rgb: 0, 0, 0;
    --background-end-rgb: 0, 0, 0;
  }
}
```

### Planned Components

The following components are defined in the architecture but not yet implemented:

#### AgentCard (F-002)

**Purpose**: Entity cards with five visual states for displaying agent activity

**Location**: `web/src/components/AgentCard.tsx`

**Props**:

```typescript
interface AgentCardProps {
  id: string;
  name: string;
  status: 'idle' | 'active' | 'processing' | 'complete' | 'error';
  metrics: {
    efficiency: number;
    load: string;
    connections: number;
  };
  lastAction?: string;
  since?: string;
}
```

**States**:

| State | Border Color | Background | Animation |
|-------|--------------|------------|-----------|
| Idle | Subtle glow | Base card | Gentle breath |
| Active | Jungle Canopy | Elevated | Lift 2px |
| Processing | Amber pulse | Animated | Thought bubble |
| Complete | Green fade | Ghost dim | Fade right |
| Error | Red pulse | Red tint | Shake |

#### TerrariumView (F-001)

**Purpose**: Main canvas for observing agent activity

**Location**: `web/src/components/TerrariumView.tsx`

**Props**:

```typescript
interface TerrariumViewProps {
  agents: Entity[];
  flows: Flow[];
  layout?: 'attention' | 'chronological' | 'spatial';
}
```

**Features**:
- Emergent layout based on flow relationships
- Gravity-based positioning options
- Animated transitions between states

#### GhostColumn (F-005)

**Purpose**: History sidebar for completed actions

**Location**: `web/src/components/GhostColumn.tsx`

**Props**:

```typescript
interface GhostColumnProps {
  history: HistoryItem[];
  maxItems?: number;
  onRestore?: (item: HistoryItem) => void;
}
```

**Features**:
- Reverse-chronological display
- 0.4 opacity fade for visual aging
- Click-to-restore functionality

#### SystemPulse (F-006)

**Purpose**: Header with live metrics display

**Location**: `web/src/components/SystemPulse.tsx`

**Props**:

```typescript
interface SystemPulseProps {
  metrics: SystemMetrics;
  witnesses?: number;
}
```

**Metrics Displayed**:

| Metric | Description |
|--------|-------------|
| activeAgents | Number of currently active agents |
| pendingFlows | Number of pending flows |
| contractsSettled | Number of completed contracts |
| systemLoad | System load percentage |
| health | System health status |

**Health States**:

| State | Color | Meaning |
|-------|-------|---------|
| Healthy | Green | All systems nominal |
| Thinking | Amber | Processing, no errors |
| Broken | Red | System failure |

---

## Data Models

### Entity Model

```typescript
interface Entity {
  id: string;              // Unique identifier (e.g., "ag_7x9y2z")
  name: string;            // Display name
  type: 'agent' | 'contract' | 'transaction';
  status: EntityStatus;
  metrics: {
    efficiency: number;    // 0-1 performance score
    load: string;          // Percentage string
    connections: number;   // Active connections
  };
  lastAction?: string;     // Human-readable action description
  since?: string;          // Time in current state
}

type EntityStatus = 'idle' | 'active' | 'processing' | 'complete' | 'error';
```

### System Metrics

```typescript
interface SystemMetrics {
  activeAgents: number;
  pendingFlows: number;
  contractsSettled: number;
  systemLoad: number;      // 0-1 load percentage
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

### History Item

```typescript
interface HistoryItem {
  id: string;
  action: string;
  timestamp: Date;
  entities: Entity['id'][];
  result: 'success' | 'failure' | 'partial';
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
  plantedBy?: string;
}
```

---

## Design Tokens

### Colors

```css
:root {
  /* Primary - The Jungle Palette */
  --color-jungle-canopy: #1a3a2f;
  --color-jungle-depth: #0f1f1a;
  --color-monkey-fur: #d4a574;
  --color-monkey-fur-light: #e8c9a8;
  --color-dawn-citrus: #ff6b35;

  /* Semantic - Status States */
  --color-signal-green: #4ade80;
  --color-warning-amber: #fbbf24;
  --color-error-red: #ef4444;

  /* Accent - Connection & New */
  --color-purple-connect: #a855f7;
  --color-cyan-new: #22d3ee;
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
  --duration-instant: 50ms;
  --duration-quick: 150ms;
  --duration-standard: 300ms;
  --duration-considered: 500ms;
  --duration-breath: 1000ms;

  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Spacing

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-8: 48px;
  --space-10: 64px;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-full: 9999px;
}
```

---

## Configuration

### Package.json (Frontend)

```json
{
  "name": "web",
  "version": "0.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### Environment Variables

```bash
# Required
NEXT_PUBLIC_APP_NAME=Monkeytown

# Optional (for agent layer)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...
GOOGLE_API_KEY=...
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

## Integration Points

### Event Bus (Future)

```typescript
type AgentEvent =
  | { type: 'agent_started'; agentId: string; runId: string }
  | { type: 'agent_reasoning'; agentId: string; content: string }
  | { type: 'agent_action'; agentId: string; action: string }
  | { type: 'agent_completed'; agentId: string; result: unknown }
  | { type: 'agent_error'; agentId: string; error: string };
```

### Agent Runtime (Future)

```typescript
interface AgentRuntime {
  run(agentId: string, input: Record<string, unknown>): Promise<unknown>;
  stream(agentId: string, input: Record<string, unknown>): AsyncGenerator<unknown>;
  cancel(runId: string): void;
}
```

### WebSocket API (Future)

```typescript
// Client connects to:
ws://localhost:3001/ws

// Client receives:
interface WSMessage {
  type: 'metrics' | 'entity_update' | 'flow_update' | 'history_update';
  payload: unknown;
}

// Client sends:
interface WSCommand {
  type: 'subscribe' | 'unsubscribe' | 'plant_seed';
  payload: unknown;
}
```

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0.0 | 2026-01-17 | Initial API reference |

---

*API Reference*
*Document Version: 1.0.0*
