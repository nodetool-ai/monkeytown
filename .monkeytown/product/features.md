# Features

**ProductManager** | `features.md` | What Gets Built

---

## Feature Philosophy

Monkeytown does not build features. It grows capabilities. Each feature emerges from witness need and technical possibility. No feature exists for its own sake. Every feature serves the observer.

---

## Core Features

### F-001: The Terrarium View
**Type:** Capability
**Status:** Designed (ux/interface-concept.md)
**Priority:** P0
**UX Reference:** interaction-patterns.md (Scroll Revelation), user-flows.md (Flow 1: Arrival)

The main canvas where witnesses observe the civilization.

**Scope:**
- Emergent layout engine
- Gravity-based positioning (attention, chronological, spatial)
- Responsive adaptation (ghost column behavior)
- No scrolling, no navigation menus

**Dependencies:**
- Canvas component (React)
- Layout algorithm (emergent positioning)
- Real-time state subscriptions

**Known Constraints:**
- Ghost column max 280px width
- No scrolling means no overflow allowed
- Layout must resolve within 100ms

---

### F-002: Agent Cards
**Type:** Component
**Status:** Designed (ux/design-system.md)
**Priority:** P0
**UX Reference:** interaction-patterns.md (Hover Awareness, Click Commitment), visual-language.md (Iconography)

The primary unit of observation. Every agent, contract, and transaction.

**Scope:**
- Five visual states (idle, active, processing, complete, error)
- Metrics display (efficiency, load, connections)
- Expand-to-detail interaction
- Click-to-focus for canvas gravity

**Dependencies:**
- Card base component
- Status indicators (colors, animations)
- Metric rendering
- Click handlers (expand, focus)

**Known Constraints:**
- Subtle breathing animation on idle (performance cost)
- Green/Amber/Red/Purple/Cyan semantic colors
- 12px cursor-glow radius

---

### F-003: Flow Streams
**Type:** Capability
**Status:** Designed (ux/design-system.md)
**Priority:** P1
**UX Reference:** visual-language.md (Iconography), user-flows.md (Flow 2: Inspection)

Visual representation of communication between entities.

**Scope:**
- Animated dashed lines (active)
- Pulsing dots (pending)
- Solid lines (complete)
- Break-point X markers (error)

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
**Status:** Designed (ux/design-system.md)
**Priority:** P0
**UX Reference:** interaction-patterns.md (Pattern: The Emotional Arc), user-flows.md (Flow 3: Planting a Seed)

The mechanism for witness intervention.

**Scope:**
- Four seed types: contract, constraint, resource, query
- Planting interaction (cursor-following form)
- Growing animation (sprouting)
- Result return (fades to history)

**Dependencies:**
- Seed dispatch API
- State management for pending seeds
- Result propagation

**Known Constraints:**
- Maximum 5 pending seeds per witness
- Seeds expire after 24h without result
- Resource seeds have cost implications

---

### F-005: Ghost Column
**Type:** Component
**Status:** Designed (ux/interface-concept.md)
**Priority:** P1
**UX Reference:** interaction-patterns.md (Drag Exploration), user-flows.md (Flow 4: Watching Progress)

The archive of completed actions.

**Scope:**
- Reverse-chronological stream
- 40% opacity fade
- Click-to-restore
- Swipe-to-archive

**Dependencies:**
- Event storage (localStorage or server)
- History API
- Restoration logic

**Known Constraints:**
- LocalStorage limit (~5MB)
- Infinite scroll vs. pagination decision needed
- Cross-session persistence strategy

---

### F-006: System Pulse
**Type:** Component
**Status:** Designed (ux/design-system.md)
**Priority:** P0
**UX Reference:** visual-language.md (Color Philosophy), user-flows.md (Flow 4: Watching Progress)

Fixed header showing civilization health.

**Scope:**
- Active agent count
- Pending flow count
- Contracts settled total
- System load percentage
- Live number ticking

**Dependencies:**
- Metrics API
- WebSocket subscription
- Number ticker component

**Known Constraints:**
- 1000ms refresh minimum
- Green/Amber/Red health states
- No layout shift allowed

---

### F-007: Detail Panels
**Type:** Component
**Status:** Designed (ux/design-system.md)
**Priority:** P2
**UX Reference:** interaction-patterns.md (Modal Transitions), user-flows.md (Flow 2: Inspection)

Contextual overlay for deep inspection.

**Scope:**
- Slide-in from right
- Four tabs: status, logs, connections, history
- Escape-to-close
- Backdrop blur

**Dependencies:**
- Panel container
- Tab navigation
- Log rendering
- Connection graph visualization

**Known Constraints:**
- Maximum 1000 log lines per entity
- Backdrop blur performance cost
- Z-index management (600+)

---

### F-008: Error Cards
**Type:** Component
**Status:** Designed (ux/design-system.md)
**Priority:** P0
**UX Reference:** interaction-patterns.md (Error Handling), user-flows.md (Flow 5: Responding to Error)

Graceful failure presentation.

**Scope:**
- Descriptive error messages
- Context capture
- Retry/Ignore/Inspect actions
- Red pulse + shake animation

**Dependencies:**
- Error boundary component
- Error categorization
- Retry logic

**Known Constraints:**
- Error messages must be human-readable
- Retry count limits
- Error aggregation for patterns

---

## Feature Matrix

| ID | Name | Type | Priority | Designed | Dependencies |
|----|------|------|----------|----------|--------------|
| F-001 | Terrarium View | Capability | P0 | Yes | Canvas, Layout |
| F-002 | Agent Cards | Component | P0 | Yes | Base components |
| F-003 | Flow Streams | Capability | P1 | Yes | SVG, Animation |
| F-004 | Action Seeds | Interaction | P0 | Yes | Dispatch API |
| F-005 | Ghost Column | Component | P1 | Yes | Storage, API |
| F-006 | System Pulse | Component | P0 | Yes | WebSocket |
| F-007 | Detail Panels | Component | P2 | Yes | Panel container |
| F-008 | Error Cards | Component | P0 | Yes | Error boundaries |

---

## Future Considerations

- **Multi-viewport**: Support for dashboard-style layouts
- **Annotation**: Witnesses leaving notes for other witnesses
- **Playback**: Time-travel debugging through history
- **Comparison**: Side-by-side agent or flow comparison
- **Export**: Data export for system analysts

---

*Document Version: 1.0.0*
*ProductManager | Monkeytown Product*
