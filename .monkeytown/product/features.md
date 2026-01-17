# Features

**ProductManager** | `features.md` | What Gets Built

---

## Feature Philosophy

Monkeytown does not build features. It grows capabilities. Each feature emerges from witness need and technical possibility. No feature exists for its own sake. Every feature serves the observer.

Per the research synthesis: "complexity emerges from simplicity through interaction over time." Features are not designed in isolation. They emerge from the substrate, connect to each other, and evolve.

---

## Core Features

### F-001: The Terrarium View
**Type:** Capability
**Status:** Designed (ux/interface-concept.md, ux/design-system.md)
**Priority:** P0
**UX Reference:** interface-concept.md (The Terrarium), design-system.md (Pattern: Emergent Layout)

The main canvas where witnesses observe the civilization. The substrate, the stage, the glass.

**Scope:**
- Emergent layout engine (no grid, flow-based positioning)
- Gravity-based positioning (attention, chronological, spatial)
- Responsive adaptation (ghost column behavior)
- No scrolling, no navigation menus, no breadcrumbs
- Canvas component (React) with emergent positioning algorithm

**Biological Pattern Reference:**
Per synthesis.md "Slime Mold Networks": "Agents explore, test connections, and reinforce successful paths. This is not a designed topology—it's an emergent network."

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
**Status:** Designed (ux/design-system.md)
**Priority:** P0
**UX Reference:** design-system.md (Component: Agent Card), interface-concept.md (Card Philosophy)

The primary unit of observation. Every agent, contract, and transaction. Cards are not containers. Cards are beings.

**Scope:**
- Five visual states (idle, active, processing, complete, error)
- Metrics display (efficiency, load, connections)
- Expand-to-detail interaction
- Click-to-focus for canvas gravity
- Subtle breathing animation on idle

**Biological Pattern Reference:**
Per synthesis.md "Boids Flocking": "Agent Cards should not have fixed positions. They should follow boids rules: separation, alignment, cohesion."

**Dependencies:**
- Card base component
- Status indicators (colors, animations)
- Metric rendering
- Click handlers (expand, focus)

**Known Constraints:**
- Subtle breathing animation on idle (performance cost ~5% CPU)
- Green/Amber/Red/Purple/Cyan semantic colors
- 12px cursor-glow radius
- 60fps minimum for all animations

---

### F-003: Flow Streams
**Type:** Capability
**Status:** Designed (ux/design-system.md)
**Priority:** P1
**UX Reference:** design-system.md (Component: Flow Stream), synthesis.md (The Flow Stream)

Visual representation of communication between entities. The mycelial networks of the civilization.

**Scope:**
- Animated dashed lines (active)
- Pulsing dots (pending)
- Solid lines (complete)
- Break-point X markers (error)
- Message types: message, resource, contract, signal

**Biological Pattern Reference:**
Per synthesis.md "The Flow Stream": "Main routes between frequently-communicating agents thicken. Failed paths fade. Successful paths brighten."

**Dependencies:**
- SVG path rendering
- Animation engine (requestAnimationFrame)
- Connection state tracking

**Known Constraints:**
- Max 50 concurrent flows without degradation
- Latency visualization needs 60fps
- Pathfinding for complex topologies
- Performance degrades linearly beyond 50 flows

---

### F-004: Action Seeds
**Type:** Interaction
**Status:** Designed (ux/design-system.md)
**Priority:** P1
**UX Reference:** design-system.md (Component: Action Seed), user-flows.md (Flow 3: Planting a Seed)

The mechanism for witness intervention. Seeds are not commands. They are influences, like pheromone trails.

**Scope:**
- Four seed types: contract, constraint, resource, query
- Planting interaction (cursor-following form)
- Growing animation (sprouting visualization)
- Result return (fades to history)
- Progress stages: germinating → sprouting → growing → mature

**Biological Pattern Reference:**
Per synthesis.md "Ant Colony Optimization": "Seeds are attractive to relevant agents. Agents discover seeds through exploration. Successful seeds generate more visible traces."

**Dependencies:**
- Seed dispatch API
- State management for pending seeds
- Result propagation

**Known Constraints:**
- Maximum 5 pending seeds per witness
- Seeds expire after 24h without result
- Resource seeds have cost implications (future economics)
- Quorum states: collective action triggers special visuals

---

### F-005: Ghost Column
**Type:** Component
**Status:** Designed (ux/interface-concept.md)
**Priority:** P2
**UX Reference:** interface-concept.md (The Ghost Column), synthesis.md (Neural Memory Consolidation)

The archive of completed actions. History that accumulates like mycelium.

**Scope:**
- Reverse-chronological stream
- 40% opacity fade (0.4 opacity)
- Click-to-restore (restores to main view)
- Swipe-to-archive (future: mobile)
- Search by agent, type, outcome

**Biological Pattern Reference:**
Per synthesis.md "The Ghost Column": "Completed items drift right, then left. Similar items merge over time. Very old items become archival (ghost of ghost)."

**Dependencies:**
- Event storage (localStorage or server)
- History API
- Restoration logic

**Known Constraints:**
- LocalStorage limit (~5MB, ~5000 small items)
- Infinite scroll vs. pagination decision needed
- Cross-session persistence strategy
- Performance degrades with >1000 items

---

### F-006: System Pulse
**Type:** Component
**Status:** Designed (ux/design-system.md)
**Priority:** P0
**UX Reference:** design-system.md (Component: System Pulse), interface-concept.md (Always Visible)

Fixed header showing civilization health. The weather map of the system.

**Scope:**
- Active agent count
- Pending flow count
- Contracts settled total
- System load percentage
- Live number ticking (no jumpy numbers)
- Health states: green (healthy), amber (thinking), red (broken)

**Biological Pattern Reference:**
Per synthesis.md "The System Pulse": "Trophic cascade indicators, immune system status, ecosystem health. Agent-activity, resource-flow, communication, chaos-level, health-trend."

**Dependencies:**
- Metrics API
- WebSocket subscription
- Number ticker component

**Known Constraints:**
- 1000ms refresh minimum (don't spam)
- Green/Amber/Red health states
- No layout shift allowed
- Must work even when other elements fail

---

### F-007: Detail Panels
**Type:** Component
**Status:** Designed (ux/design-system.md)
**Priority:** P2
**UX Reference:** design-system.md (Component: Detail Panel), user-flows.md (Flow 2: Inspection)

Contextual overlay for deep inspection. Progressive disclosure for the curious.

**Scope:**
- Slide-in from right (300ms animation)
- Four tabs: status, logs, connections, history
- Escape-to-close gesture
- Backdrop blur (performance cost)
- Z-index 600+

**Biological Pattern Reference:**
Per synthesis.md "Progressive Disclosure": "Level 1 (default): name, status icon, primary metric. Level 2 (hover): all metrics, connection count, time active. Level 3 (click): Detail Panel slides in. Level 4 (expand): raw data, config, debug info."

**Dependencies:**
- Panel container
- Tab navigation
- Log rendering
- Connection graph visualization

**Known Constraints:**
- Maximum 1000 log lines per entity
- Backdrop blur performance cost (~10% GPU)
- Z-index management (600+)
- Memory grows with open panels

---

### F-008: Error Cards
**Type:** Component
**Status:** Designed (ux/design-system.md)
**Priority:** P0
**UX Reference:** design-system.md (Pattern: Error Recovery), user-flows.md (Flow 5: Responding to Error)

Graceful failure presentation. Errors are not failures. They are information.

**Scope:**
- Descriptive error messages (human-readable, not technical)
- Context capture (what was happening)
- Retry/Ignore/Inspect actions
- Red pulse + shake animation (300ms)
- Error categorization (system error, user error, validation warning)

**Biological Pattern Reference:**
Per synthesis.md "Anti-Patterns to Avoid": "Don't silence failure. Error states are information, not embarrassment. Do make failure beautiful. Errors tell stories too."

**Dependencies:**
- Error boundary component
- Error categorization
- Retry logic
- Context logging

**Known Constraints:**
- Error messages must be human-readable (no codes)
- Retry count limits (auto-retry once, then manual)
- Error aggregation for patterns (future: detect error clusters)
- Must not break trust even on failure

---

## Feature Matrix

| ID | Name | Type | Priority | Biological Pattern | UX Component |
|----|------|------|----------|-------------------|--------------|
| F-001 | Terrarium View | Capability | P0 | Slime Mold Networks | Emergent Layout |
| F-002 | Agent Cards | Component | P0 | Boids Flocking | Agent Card |
| F-003 | Flow Streams | Capability | P1 | Mycelial Networks | Flow Stream |
| F-004 | Action Seeds | Interaction | P1 | Ant Colony Optimization | Action Seed |
| F-005 | Ghost Column | Component | P2 | Neural Memory | Timeline |
| F-006 | System Pulse | Component | P0 | Immune System | System Pulse |
| F-007 | Detail Panels | Component | P2 | Progressive Disclosure | Detail Panel |
| F-008 | Error Cards | Component | P0 | Error Recovery | Error Card |

---

## Phase Alignment

Per the roadmap in vision/roadmap.md:

| Phase | Focus | Features |
|-------|-------|----------|
| Phase 1: The Terrarium | Foundation | F-001, F-002, F-006, F-008 |
| Phase 2: The Language | Connection | F-003, F-007 |
| Phase 3: The Power | Intervention | F-004 |
| Phase 4: The Memory | Continuity | F-005 |

---

## Future Considerations

Per the synthesis research:

- **Multi-viewport**: Support for dashboard-style layouts (future)
- **Annotation**: Witnesses leaving notes for other witnesses (future)
- **Playback**: Time-travel debugging through history (future, related to F-005)
- **Comparison**: Side-by-side agent or flow comparison (future)
- **Export**: Data export for system analysts (future)
- **Quorum Visualization**: Collective witness action celebration (related to F-004)
- **Mycelial Visualization**: Main routes thicken between frequent communicators (related to F-003)

---

## Cross-Reference Notes

- **Research alignment**: synthesis.md (biological patterns throughout)
- **UX alignment**: design-system.md (all component specs), user-flows.md (all timing specs)
- **Requirements alignment**: requirements.md (performance and constraint specs)

---

*Document Version: 2.0.0*
*ProductManager | Monkeytown Product*
