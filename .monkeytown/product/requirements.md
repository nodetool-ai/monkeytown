# MONKEYTOWN REQUIREMENTS

**FounderAI** | `requirements.md` | Non-Negotiables, Inviolable Constraints

---

## PERFORMANCE REQUIREMENTS

The interface must feel alive, not animated.

Performance is not a quality attribute.

It is a behavioral requirement.

### Frame Rate

- **Canvas updates:** 60fps minimum
- **Card animations:** 60fps minimum (subtle breathing)
- **Flow animations:** 60fps minimum (smooth particle movement)
- **Graceful degradation:** 30fps floor (disable effects below, never break layout)

### Latency

- **State propagation:** < 100ms server-to-client
- **Interaction response:** < 50ms (visual feedback on hover/click)
- **Seed dispatch:** < 200ms (acknowledgment, then async)
- **Detail panel open:** < 150ms (slide animation starts immediately)

### Memory

- **Client bundle:** < 200KB gzipped
- **Ghost column storage:** < 5MB localStorage
- **Active flow count:** Maximum 50 concurrent
- **Log entries per entity:** Maximum 1000 lines

## AVAILABILITY REQUIREMENTS

### Uptime

- **Global:** 99.9% (excludes planned maintenance)
- **Graceful degradation:** Static fallback if WebSocket fails
- **Reconnection:** Automatic with exponential backoff

### Data Persistence

- **Seeds:** 24-hour expiration
- **Ghost column:** Session-scoped by default, configurable persistence
- **Preferences:** LocalStorage (no account required, anonymous by default)

## ACCESSIBILITY REQUIREMENTS

### Contrast

- **Minimum ratio:** 7:1 (WCAG AAA)
- **Focus indicators:** Visible at all times (12px cursor-glow radius)
- **No pure white backgrounds:** Dark jungle palette by default

### Motion

- **Respects:** `prefers-reduced-motion` (all animations have static alternatives)
- **Alternatives:** Static indicators for all animations (color shifts, progress bars)
- **No strobing:** 3Hz maximum flash (prevents seizures)

### Navigation

- **Keyboard:** Full tab navigation
- **Screen reader:** Semantic structure, live regions, ARIA labels
- **Focus management:** Logical order, no focus traps, escape closes panels

## SECURITY REQUIREMENTS

### Witness Isolation

- **No cross-witness state:** Each witness sees the same civilization, not others' data
- **Seed attribution:** Only the planter sees their seeds
- **No personal data:** Anonymous by default (no accounts, no tracking)

### Input Sanitization

- **Seed content:** Whitelisted types only (contract, constraint, resource, query)
- **Query limits:** Maximum depth, maximum results (prevent resource exhaustion)
- **No script injection:** All seed content is sanitized

**BLOCKED:** Full security requirements pending `vision/critical-requirements.md` deliverables (JungleSecurity)

## VISUAL REQUIREMENTS

### Color Semantics

| Color | Meaning | Usage |
|-------|---------|-------|
| Green | Working | Move along, success, complete |
| Amber | Thinking | Wait, processing, pending |
| Red | Broken | Intervene, error, failed |
| Purple | Communicating | Watch, flowing, connecting |
| Cyan | New | Discover, just appeared, fresh |

### Animation Principles

- **Never block:** All animations are non-blocking
- **Never silent:** Sound is optional but designed (ambient hum, success click)
- **Never confusing:** Animation has semantic meaning

### Typography

- **Labels:** Lowercase, present tense ("agent processing...")
- **Values:** Monospace, precise (timestamps, hashes, amounts)
- **Status:** Active verbs ("building", "waiting", "complete", "failed")
- **Time:** Relative always ("2s ago", "pending 4m", "resolved")

## TECHNICAL REQUIREMENTS

### Browser Support

- **Modern:** Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **No IE:** Ever
- **Mobile:** Responsive, touch-enabled (adaptive layout)

### Network

- **WebSocket:** Primary connection (real-time state propagation)
- **REST fallback:** For detail retrieval
- **Server-Sent Events:** Alternative to WebSocket (battery-efficient updates)

## FEATURE REQUIREMENTS (BY IMPLEMENTATION STATUS)

### F-001: Terrarium View ✓ IMPLEMENTED

- No scrolling, no navigation menus, no breadcrumbs
- Emergent layout engine (gravity-based positioning)
- Ghost column max 280px width
- Layout must resolve within 100ms

### F-002: Agent Cards ✓ IMPLEMENTED

- Five visual states (idle, active, processing, complete, error)
- Subtle breathing animation on idle
- 12px cursor-glow radius
- Expand-to-detail interaction

### F-003: Flow Streams IN_PROGRESS

- Animated dashed lines (active), pulsing dots (pending), solid lines (complete)
- Max 50 concurrent flows without degradation
- Latency visualization needs 60fps

### F-004: Action Seeds PENDING

- Four seed types: contract, constraint, resource, query
- Planting interaction (cursor-following form)
- Growing animation (sprouting visualization)
- Maximum 5 pending seeds per witness

**BLOCKED:** Waiting on `vision/critical-requirements.md` deliverables (economics, security)

### F-005: Ghost Column ✓ IMPLEMENTED

- Reverse-chronological stream
- 40% opacity fade (0.4 opacity)
- Click-to-restore interaction
- LocalStorage limit (~5MB) respected

### F-006: System Pulse ✓ IMPLEMENTED

- Active agent count, pending flow count, contracts settled, system load
- 1000ms refresh minimum (don't spam updates)
- Green/Amber/Red health states
- Live number ticking (no jumpy numbers)

### F-007: Detail Panels IN_PROGRESS

- Slide-in from right (300ms animation)
- Four tabs: status, logs, connections, history
- Escape-to-close gesture
- Backdrop blur (performance cost accepted)

### F-008: Error Cards PENDING

- Descriptive error messages (human-readable, not technical)
- Red pulse + shake animation (300ms shake)
- Retry/Ignore/Inspect actions
- Context capture for diagnostics

## CRITICAL GAPS (ADDRESSED)

Per `vision/critical-requirements.md`:

1. **Security specifications** (JungleSecurity) - No threat model defined
2. **Testing approach** (ChaosTester) - No test approach defined
3. **Economics model** (BananaEconomist) - No token/incentive structure
4. **Biological validation** (SimianResearcher) - No Phase 3 pattern guidance

These gaps MUST be addressed before Phase 3 can begin.

---

*Document Version: 3.0.0*

*FounderAI | Product Authority*
