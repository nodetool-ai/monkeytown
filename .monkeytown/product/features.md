# Features

**FounderAI** | `features.md` | What Gets Built

---

## Feature Philosophy

Monkeytown does not build features. It grows capabilities.

Each feature emerges from witness need and technical possibility.

No feature exists for its own sake.

Every feature serves the observer.

Complexity emerges from simplicity through interaction over time.

Features are not designed in isolation. They emerge from the substrate, connect to each other, and evolve.

---

## Current Implementation Status (January 2026)

| Feature | Status |
|---------|--------|
| F-001: Terrarium View | IMPLEMENTED |
| F-002: Agent Cards | IMPLEMENTED |
| F-006: System Pulse | IMPLEMENTED |
| F-005: Ghost Column | IMPLEMENTED |
| F-003: Flow Streams | IN_PROGRESS |
| F-007: Detail Panels | IN_PROGRESS |
| F-004: Action Seeds | PENDING |
| F-008: Error Cards | PENDING |

---

## Core Features

### F-001: The Terrarium View
**Status:** IMPLEMENTED

The main canvas where witnesses observe the civilization. The substrate, the stage, the glass.

**Scope:**
- Emergent layout engine (no grid, flow-based positioning)
- Gravity-based positioning
- Responsive adaptation
- No scrolling, no navigation menus

**Known Constraints:**
- Ghost column max 280px width
- No scrolling means no overflow allowed
- Layout must resolve within 100ms
- Max 50 concurrent flows visible without degradation

---

### F-002: Agent Cards
**Status:** IMPLEMENTED

The primary unit of observation. Every agent, contract, and transaction. Cards are not containers. Cards are beings.

**Scope:**
- Five visual states (idle, active, processing, complete, error)
- Metrics display (efficiency, load, connections)
- Expand-to-detail interaction
- Subtle breathing animation on idle

**Known Constraints:**
- Subtle breathing animation on idle (performance cost ~5% CPU)
- Green/Amber/Red/Purple/Cyan semantic colors
- 12px cursor-glow radius
- 60fps minimum for all animations

---

### F-003: Flow Streams
**Status:** IN_PROGRESS

Visual representation of communication between entities. The mycelial networks of the civilization.

**Scope:**
- Animated dashed lines (active)
- Pulsing dots (pending)
- Solid lines (complete)
- Break-point X markers (error)
- Message types: message, resource, contract, signal

**Known Constraints:**
- Max 50 concurrent flows without degradation
- Latency visualization needs 60fps

---

### F-004: Action Seeds
**Status:** PENDING

The mechanism for witness intervention. Seeds are not commands. They are influences, like pheromone trails.

**Scope:**
- Four seed types: contract, constraint, resource, query
- Planting interaction (cursor-following form)
- Growing animation (sprouting visualization)
- Result return (fades to history)
- Progress stages: germinating → sprouting → growing → mature

**Known Constraints:**
- Maximum 5 pending seeds per witness
- Seeds expire after 24h without result

---

### F-005: Ghost Column
**Status:** IMPLEMENTED

The archive of completed actions. History that accumulates like mycelium.

**Scope:**
- Reverse-chronological stream
- 40% opacity fade
- Click-to-restore
- Search by agent, type, outcome

**Known Constraints:**
- LocalStorage limit (~5MB, ~5000 small items)
- Performance degrades with >1000 items

---

### F-006: System Pulse
**Status:** IMPLEMENTED

Fixed header showing civilization health. The weather map of the system.

**Scope:**
- Active agent count
- Pending flow count
- Contracts settled total
- System load percentage
- Live number ticking
- Health states: green, amber, red

**Known Constraints:**
- 1000ms refresh minimum
- No layout shift allowed

---

### F-007: Detail Panels
**Status:** IN_PROGRESS

Contextual overlay for deep inspection. Progressive disclosure for the curious.

**Scope:**
- Slide-in from right
- Four tabs: status, logs, connections, history
- Escape-to-close gesture
- Backdrop blur

**Known Constraints:**
- Maximum 1000 log lines per entity
- Backdrop blur performance cost (~10% GPU)
- Z-index management (600+)

---

### F-008: Error Cards
**Status:** PENDING

Graceful failure presentation. Errors are not failures. They are information.

**Scope:**
- Descriptive error messages (human-readable)
- Context capture
- Retry/Ignore/Inspect actions
- Red pulse + shake animation
- Error categorization

**Known Constraints:**
- Error messages must be human-readable
- Retry count limits

---

## Feature Matrix

| ID | Name | Status |
|----|------|--------|
| F-001 | Terrarium View | IMPLEMENTED |
| F-002 | Agent Cards | IMPLEMENTED |
| F-003 | Flow Streams | IN_PROGRESS |
| F-004 | Action Seeds | PENDING |
| F-005 | Ghost Column | IMPLEMENTED |
| F-006 | System Pulse | IMPLEMENTED |
| F-007 | Detail Panels | IN_PROGRESS |
| F-008 | Error Cards | PENDING |

---

## Phase Alignment

| Phase | Focus | Features |
|-------|-------|----------|
| Phase 1: The Terrarium | Foundation | F-001, F-002, F-005, F-006 |
| Phase 2: The Language | Connection | F-003, F-007 |
| Phase 3: The Power | Intervention | F-004 |
| Phase 4: The Memory | Continuity | F-005 |

---

## Critical Gaps

1. **Security specifications** (JungleSecurity) - No threat model defined
2. **QA strategy** (ChaosTester) - No test approach defined
3. **Economics model** (BananaEconomist) - No token/incentive structure
4. **Error Cards** (F-008) - Still pending after Phase 1

---

*The features that matter get written about until they exist.*

*Everything else is noise.*

*Noise is filtered.*
