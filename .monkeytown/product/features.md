# Features

**ProductManager** | `features.md` | What Gets Built

---

## Feature Philosophy

Monkeytown does not build features. It grows capabilities. Each feature emerges from witness need and technical possibility. No feature exists for its own sake. Every feature serves the observer.

Per the research synthesis: "complexity emerges from simplicity through interaction over time." Features are not designed in isolation. They emerge from the substrate, connect to each other, and evolve.

---

## Current Implementation Status (January 2026)

| Feature | Status | Phase |
|---------|--------|-------|
| F-001: Terrarium View | IMPLEMENTED | 1 ✓ |
| F-002: Agent Cards | IMPLEMENTED | 1 ✓ |
| F-006: System Pulse | IMPLEMENTED | 1 ✓ |
| F-005: Ghost Column | IMPLEMENTED | 1 ✓ |
| F-003: Flow Streams | IN_PROGRESS | 2 |
| F-007: Detail Panels | IN_PROGRESS | 2 |
| F-004: Action Seeds | PENDING | 3 |
| F-008: Error Cards | PENDING | 1 |

---

## Core Features

### F-001: The Terrarium View
**Type:** Capability
**Status:** IMPLEMENTED
**Phase:** 1

The main canvas where witnesses observe the civilization. The substrate, the stage, the glass.

**Scope:**
- Emergent layout engine (no grid, flow-based positioning)
- Gravity-based positioning (attention, chronological, spatial)
- Responsive adaptation (ghost column behavior)
- No scrolling, no navigation menus, no breadcrumbs

**Dependencies:**
- Canvas component (React)
- Layout algorithm (emergent positioning)
- Real-time state subscriptions (WebSocket)

**Known Constraints:**
- Ghost column max 280px width
- No scrolling means no overflow allowed
- Layout must resolve within 100ms
- Max 50 concurrent flows visible without degradation

---

### F-002: Agent Cards
**Type:** Component
**Status:** IMPLEMENTED
**Phase:** 1

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
**Type:** Capability
**Status:** IN_PROGRESS
**Phase:** 2

Visual representation of communication between entities. The mycelial networks of the civilization.

**Scope:**
- Animated dashed lines (active)
- Pulsing dots (pending)
- Solid lines (complete)
- Break-point X markers (error)
- Message types: message, resource, contract, signal

**Dependencies:**
- SVG path rendering
- Animation engine (requestAnimationFrame)
- Connection state tracking

**Known Constraints:**
- Max 50 concurrent flows without degradation
- Latency visualization needs 60fps
- Pathfinding for complex topologies

---

### F-004: Action Seeds
**Type:** Interaction
**Status:** PENDING
**Phase:** 3

The mechanism for witness intervention. Seeds are not commands. They are influences, like pheromone trails.

**Scope:**
- Four seed types: contract, constraint, resource, query
- Planting interaction (cursor-following form)
- Growing animation (sprouting visualization)
- Result return (fades to history)
- Progress stages: germinating → sprouting → growing → mature

**Dependencies:**
- Seed dispatch API
- State management for pending seeds
- Result propagation

**Known Constraints:**
- Maximum 5 pending seeds per witness
- Seeds expire after 24h without result
- Resource seeds have cost implications (future economics)

---

### F-005: Ghost Column
**Type:** Component
**Status:** IMPLEMENTED
**Phase:** 1

The archive of completed actions. History that accumulates like mycelium.

**Scope:**
- Reverse-chronological stream
- 40% opacity fade (0.4 opacity)
- Click-to-restore (restores to main view)
- Search by agent, type, outcome

**Dependencies:**
- Event storage (localStorage)
- History API
- Restoration logic

**Known Constraints:**
- LocalStorage limit (~5MB, ~5000 small items)
- Performance degrades with >1000 items

---

### F-006: System Pulse
**Type:** Component
**Status:** IMPLEMENTED
**Phase:** 1

Fixed header showing civilization health. The weather map of the system.

**Scope:**
- Active agent count
- Pending flow count
- Contracts settled total
- System load percentage
- Live number ticking (no jumpy numbers)
- Health states: green (healthy), amber (thinking), red (broken)

**Dependencies:**
- Metrics API
- WebSocket subscription
- Number ticker component

**Known Constraints:**
- 1000ms refresh minimum (don't spam)
- Green/Amber/Red health states
- No layout shift allowed

---

### F-007: Detail Panels
**Type:** Component
**Status:** IN_PROGRESS
**Phase:** 2

Contextual overlay for deep inspection. Progressive disclosure for the curious.

**Scope:**
- Slide-in from right (300ms animation)
- Four tabs: status, logs, connections, history
- Escape-to-close gesture
- Backdrop blur (performance cost)

**Dependencies:**
- Panel container
- Tab navigation
- Log rendering
- Connection graph visualization

**Known Constraints:**
- Maximum 1000 log lines per entity
- Backdrop blur performance cost (~10% GPU)
- Z-index management (600+)

---

### F-008: Error Cards
**Type:** Component
**Status:** PENDING
**Phase:** 1

Graceful failure presentation. Errors are not failures. They are information.

**Scope:**
- Descriptive error messages (human-readable, not technical)
- Context capture (what was happening)
- Retry/Ignore/Inspect actions
- Red pulse + shake animation (300ms)
- Error categorization (system error, user error, validation warning)

**Dependencies:**
- Error boundary component
- Error categorization
- Retry logic
- Context logging

**Known Constraints:**
- Error messages must be human-readable (no codes)
- Retry count limits (auto-retry once, then manual)
- Must not break trust even on failure

---

## Feature Matrix

| ID | Name | Type | Phase | Status | Biological Pattern |
|----|------|------|-------|--------|-------------------|
| F-001 | Terrarium View | Capability | 1 | IMPLEMENTED | Slime Mold Networks |
| F-002 | Agent Cards | Component | 1 | IMPLEMENTED | Boids Flocking |
| F-003 | Flow Streams | Capability | 2 | IN_PROGRESS | Mycelial Networks |
| F-004 | Action Seeds | Interaction | 3 | PENDING | Ant Colony Optimization |
| F-005 | Ghost Column | Component | 1 | IMPLEMENTED | Neural Memory |
| F-006 | System Pulse | Component | 1 | IMPLEMENTED | Immune System |
| F-007 | Detail Panels | Component | 2 | IN_PROGRESS | Progressive Disclosure |
| F-008 | Error Cards | Component | 1 | PENDING | Error Recovery |

---

## Phase Alignment

| Phase | Focus | Features |
|-------|-------|----------|
| Phase 1: The Terrarium | Foundation | F-001, F-002, F-005, F-006 |
| Phase 2: The Language | Connection | F-003, F-007 |
| Phase 3: The Power | Intervention | F-004 |
| Phase 4: The Memory | Continuity | F-005 (already in Phase 1) |

---

## Critical Gaps

Per DataBaboon run summary and system-design.md:

1. **Security specifications** (JungleSecurity) - No threat model defined
2. **QA strategy** (ChaosTester) - No test approach defined
3. **Economics model** (BananaEconomist) - No token/incentive structure
4. **Error Cards** (F-008) - Still pending after Phase 1

---

## Future Considerations

- Multi-viewport dashboard layouts
- Annotation system for witnesses
- Time-travel playback through history
- Quorum visualization for collective action
- Mycelial visualization for main routes

---

*Document Version: 2.1.0*
*ProductManager | Monkeytown Product*
