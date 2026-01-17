# Requirements

**ProductManager** | `requirements.md` | Non-Negotiables

---

## Performance Requirements

Per UX research (design-system.md): "The interface is not static. It is reactive." Performance is not a quality attribute - it is a behavioral requirement.

### Frame Rate
- **Canvas updates**: 60fps minimum (breathing animations must be imperceptible as animation, obvious as life)
- **Card animations**: 60fps minimum (subtle breathing, not distracting)
- **Flow animations**: 60fps minimum (smooth particle movement, like nutrient transport in mycelium)
- **Graceful degradation**: 30fps floor (disable effects below, but never break layout)

### Latency
Per user-flows.md timing specifications:
- **State propagation**: < 100ms from server to client
- **Interaction response**: < 50ms (visual feedback on hover/click)
- **Seed dispatch**: < 200ms (acknowledgment, then long-running async)
- **Detail panel open**: < 150ms (slide animation starts immediately)

### Memory
- **Client bundle**: < 200KB gzipped (lightweight interface for wide accessibility)
- **Ghost column storage**: < 5MB localStorage (session-scoped by default)
- **Active flow count**: Maximum 50 concurrent (per UX constraint, prevents visual chaos)
- **Log entries per entity**: Maximum 1000 lines (prevents memory bloat in detail panels)

---

## Availability Requirements

### Uptime
- **Global**: 99.9% (excludes planned maintenance)
- **Graceful degradation**: Static fallback if WebSocket fails (show last-known state)
- **Reconnection**: Automatic with exponential backoff (respect user battery)

### Data Persistence
Per interface-concept.md "The Ghost Column":
- **Seeds**: 24-hour expiration (like biological signals that fade)
- **Ghost column**: Session-scoped by default, configurable persistence
- **Preferences**: LocalStorage (no account required, anonymous by default)

---

## Accessibility Requirements

Per interface-concept.md "Accessibility Without Compromise":

### Contrast
- **Minimum ratio**: 7:1 (WCAG AAA, not just AA)
- **Focus indicators**: Visible at all times (12px cursor-glow radius per design-system.md)
- **No pure white backgrounds**: Prevent eye strain (dark jungle palette by default)

### Motion
- **Respects**: `prefers-reduced-motion` (all animations have static alternatives)
- **Alternatives**: Static indicators for all animations (color shifts, progress bars)
- **No strobing**: 3Hz maximum flash (prevents seizures)

### Navigation
- **Keyboard**: Full tab navigation (no mouse required)
- **Screen reader**: Semantic structure, live regions, ARIA labels
- **Focus management**: Logical order, no focus traps, escape closes panels

---

## Security Requirements

### Witness Isolation
- **No cross-witness state**: Each witness sees the same civilization, not others' data
- **Seed attribution**: Only the planter sees their seeds (privacy-preserving)
- **No personal data**: Anonymous by default (no accounts, no tracking)

### Input Sanitization
Per the "Anti-Patterns" in research/synthesis.md:
- **Seed content**: Whitelisted types only (contract, constraint, resource, query)
- **Query limits**: Maximum depth, maximum results (prevent resource exhaustion)
- **No script injection**: All seed content is sanitized (strict validation)

---

## Visual Requirements

Per design-system.md "Color as Information" and interface-concept.md:

### Color Semantics
| Color | Meaning | Usage |
|-------|---------|-------|
| **Green** | Working | Move along, success, complete |
| **Amber** | Thinking | Wait, processing, pending |
| **Red** | Broken | Intervene, error, failed |
| **Purple** | Communicating | Watch, flowing, connecting |
| **Cyan** | New | Discover, just appeared, fresh |

### Animation Principles
- **Never block**: All animations are non-blocking
- **Never silent**: Sound is optional but designed (ambient hum, success click)
- **Never confusing**: Animation has semantic meaning (per the Thought Bubble spec)

### Typography
Per interface-concept.md "Typography as Voice":
- **Labels**: Lowercase, present tense ("agent processing..." not "Processing Agent")
- **Values**: Monospace, precise (timestamps, hashes, amounts)
- **Status**: Active verbs ("building", "waiting", "complete", "failed")
- **Time**: Relative always ("2s ago", "pending 4m", "resolved")

---

## Technical Requirements

### Browser Support
- **Modern**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **No IE**: Ever
- **Mobile**: Responsive, touch-enabled (adaptive layout per interface-concept.md)

### Network
- **WebSocket**: Primary connection (real-time state propagation)
- **REST fallback**: For detail retrieval (detail panels, history)
- **Server-Sent Events**: Alternative to WebSocket (battery-efficient updates)

### Component Contracts
All components must have:
- **Props interface**: TypeScript/Flow definitions
- **Visual state examples**: All permutations documented
- **Interaction behaviors**: Click, hover, focus, keyboard
- **Accessibility notes**: ARIA roles, keyboard shortcuts

---

## Feature Requirements (by Priority)

### F-001: The Terrarium View (P0)
Per interface-concept.md "The Principle of Emergent Layout":
- No scrolling, no navigation menus, no breadcrumbs
- Emergent layout engine (gravity-based positioning)
- Ghost column max 280px width
- Layout must resolve within 100ms

### F-002: Agent Cards (P0)
Per design-system.md "Component: Agent Card":
- Five visual states (idle, active, processing, complete, error)
- Subtle breathing animation on idle (performance cost accepted)
- 12px cursor-glow radius
- Expand-to-detail interaction

### F-006: System Pulse (P0)
Per user-flows.md "Flow 1: Arrival":
- Active agent count, pending flow count, contracts settled, system load
- 1000ms refresh minimum (don't spam updates)
- Green/Amber/Red health states
- Live number ticking (no jumpy numbers)

### F-008: Error Cards (P0)
Per user-flows.md "Flow 5: Responding to Error":
- Descriptive error messages (human-readable, not technical)
- Red pulse + shake animation (300ms shake)
- Retry/Ignore/Inspect actions
- Context capture for diagnostics

### F-003: Flow Streams (P1)
Per design-system.md "Component: Flow Stream":
- Animated dashed lines (active), pulsing dots (pending), solid lines (complete)
- Max 50 concurrent flows without degradation
- Latency visualization needs 60fps

### F-004: Action Seeds (P1)
Per user-flows.md "Flow 3: Planting a Seed":
- Four seed types: contract, constraint, resource, query
- Planting interaction (cursor-following form)
- Growing animation (sprouting visualization)
- Maximum 5 pending seeds per witness

### F-005: Ghost Column (P2)
Per interface-concept.md "The Ghost Column":
- Reverse-chronological stream
- 40% opacity fade (0.4 opacity)
- Click-to-restore interaction
- LocalStorage limit (~5MB) respected

### F-007: Detail Panels (P2)
Per design-system.md "Component: Detail Panel":
- Slide-in from right (300ms animation)
- Four tabs: status, logs, connections, history
- Escape-to-close gesture
- Backdrop blur (performance cost accepted)

---

## Cross-Reference Notes

- **Research alignment**: synthesis.md "The Thought Bubble", "The System Pulse", "The Flow Stream"
- **UX alignment**: design-system.md (all component specs), user-flows.md (all timing specs)
- **Performance alignment**: interface-concept.md (no scrolling constraint), design-system.md (animation durations)

---

*Document Version: 2.0.0*
*ProductManager | Monkeytown Product*
