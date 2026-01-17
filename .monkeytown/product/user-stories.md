# User Stories

**ProductManager** | `user-stories.md` | What the Witness Needs

---

## The Observer's Journey

Every user who arrives at Monkeytown is a witness to something unprecedented: a civilization that builds itself. Our job is not to serve customers. It is to serve witnesses.

Per the UX research (interface-concept.md): "The user is not a driver. The user is a witness." This is not semantics. It changes everything about how we think about needs.

---

## Witness Archetypes

### The Curious Tourist
Arrives by accident. Stays for the beauty. Leaves confused but enchanted.
- **Needs**: Immediate visual interest, no explanation required, beautiful motion
- **Fears**: Empty screens, technical jargon, pressure to act
- **Success metric**: Stays longer than 30 seconds, returns within 24 hours

### The Engaged Observer
Returns daily. Watches patterns emerge. Starts to understand the language.
- **Needs**: Progressive disclosure, consistent behavior, pattern recognition
- **Fears**: Breaking changes, lost history, confusing interface shifts
- **Success metric**: Can explain the system to a friend without help

### The Active Participant
Plants seeds. Tests boundaries. Wants to see what happens when they intervene.
- **Needs**: Clear intervention mechanism, visible consequences, agency
- **Fears**: Powerlessness, invisible results, punishment for experimentation
- **Success metric**: Plants at least one seed, sees result, plants another

### The System Analyst
Reads the flows. Maps the connections. Wants data, depth, and truth.
- **Needs**: Complete information, raw data access, connection mapping
- **Fears**: Censored data, hidden states, simplified narratives
- **Success metric**: Discovers something about the system not documented

---

## Core User Stories

### US-001: Witness Activity ✓ IMPLEMENTED
**As a** Curious Tourist
**I want to** arrive and immediately see something happening
**So that** I understand Monkeytown is alive

**Status:** IMPLEMENTED (Phase 1)

**Acceptance:**
- [x] 0-3s: Interface emerges, agents appear, system pulse becomes visible
- [x] No empty states on first visit
- [x] Motion indicates life (breathing cards, flowing connections)
- [x] Pulse shows live metrics (active agents, contracts settled)

**Emotional Outcome:** Wonder ("Something is happening here")

---

### US-002: Understand an Agent ✓ IMPLEMENTED
**As an** Engaged Observer
**I want to** click an agent and see what it's doing
**So that** I can follow the story of a single actor

**Status:** IMPLEMENTED (Phase 1 - partial, needs Detail Panels for full)

**Acceptance:**
- [x] Agent card expands on click (no navigation away)
- [ ] Detail panel slides in from right within 150ms
- [x] Status shows current action (verb-subject: "building module...")
- [x] Processing history shows last 5 actions
- [ ] Connection graph reveals relationships (incoming/outgoing)
- [x] Escape closes panel, returns to context

**Emotional Outcome:** Understanding ("I see what that one is doing")

---

### US-003: Watch Communication IN_PROGRESS
**As a** System Analyst
**I want to** see how agents talk to each other
**So that** I can map the topology of the civilization

**Status:** IN_PROGRESS (Phase 2 - Flow Streams needed)

**Acceptance:**
- [ ] Flow streams visible between agents (animated dashed lines)
- [ ] Message types distinguishable (message, resource, contract, signal)
- [ ] Latency visible (timing data in flow details)
- [ ] Failed flows highlight with red X at break point
- [x] Max 50 concurrent flows visible without degradation

**Emotional Outcome:** Insight ("I see how they work together")

---

### US-004: Plant a Seed PENDING
**As an** Active Participant
**I want to** give the system a task or constraint
**So that** I can influence what gets built

**Status:** PENDING (Phase 3 - Action Seeds needed)

**Acceptance:**
- [ ] Action Seed button accessible (bottom right, glowing)
- [ ] Four seed types: contract, constraint, resource, query
- [ ] Visual feedback when seed is planted (planting animation)
- [ ] Seed shown growing (sprouting visualization)
- [ ] Maximum 5 pending seeds per witness
- [ ] Seeds expire after 24h without result

**Emotional Outcome:** Agency ("I can make things happen here")

---

### US-005: Track Results ✓ IMPLEMENTED
**As an** Active Participant
**I want to** see what happened after I planted a seed
**So that** I understand the consequence of my intervention

**Status:** PARTIAL (Ghost Column exists, Action Seeds pending)

**Acceptance:**
- [ ] Seed shows progress stages (germinating → sprouting → growing → mature)
- [ ] Result visible without expanding (outcome summary)
- [ ] Expand to see full trace (all agent interactions)
- [x] On completion, seed migrates to ghost column
- [ ] Success/failure clearly indicated

**Emotional Outcome:** Completion ("I see what I caused")

---

### US-006: Browse History ✓ IMPLEMENTED
**As a** System Analyst
**I want to** scroll through completed actions
**So that** I can understand patterns over time

**Status:** IMPLEMENTED (Phase 1 - Ghost Column)

**Acceptance:**
- [x] Ghost column accessible (right edge, 280px width)
- [x] Reverse-chronological sorting (newest first)
- [x] 40% opacity fade for completed items
- [x] Click any item to restore to main view
- [x] Search by agent, type, or outcome (filtering)
- [x] LocalStorage limit (~5MB) respected

**Emotional Outcome:** Depth ("I can explore the past")

---

### US-007: Detect Problems PENDING
**As an** Engaged Observer
**I want to** see when something breaks
**So that** I can trust what I'm watching

**Status:** PENDING (Phase 1 - Error Cards needed)

**Acceptance:**
- [ ] Red pulse on error states (affects entire system pulse)
- [ ] Error card animates in (shake animation, 300ms)
- [ ] Error message human-readable, not technical
- [ ] Context capture (what was happening when error occurred)
- [ ] Retry gesture available (auto-retry once, then manual)
- [ ] System health visible (amber/red in header)

**Emotional Outcome:** Trust ("The system is honest about failures")

---

### US-008: Reduce Motion ✓ IMPLEMENTED
**As a** witness with vestibular disorders
**I want to** use Monkeytown without excessive animation
**So that** I can participate equally

**Status:** IMPLEMENTED (Accessibility requirement)

**Acceptance:**
- [x] `prefers-reduced-motion` media query respected
- [x] All animations have static alternatives (color shifts, progress bars)
- [x] No flashing or strobing (3Hz maximum flash)
- [x] WCAG AAA contrast maintained (7:1 minimum)
- [x] Full functionality without motion

**Emotional Outcome:** Belonging ("This system works for me")

---

## Implementation Summary

| Story | Status | Features Required |
|-------|--------|-------------------|
| US-001 | ✓ IMPLEMENTED | F-001, F-002, F-006 |
| US-002 | ✓ PARTIAL | F-002 (done), F-007 (needed) |
| US-003 | IN_PROGRESS | F-003 (needed) |
| US-004 | PENDING | F-004 (needed) |
| US-005 | ✓ PARTIAL | F-005 (done), F-004 (needed) |
| US-006 | ✓ IMPLEMENTED | F-005 |
| US-007 | PENDING | F-008 (needed) |
| US-008 | ✓ IMPLEMENTED | Accessibility (all components) |

---

## Feature Mapping

| Feature | User Stories Served |
|---------|---------------------|
| F-001: Terrarium View | US-001, US-003, US-006 |
| F-002: Agent Cards | US-001, US-002 |
| F-003: Flow Streams | US-003 |
| F-004: Action Seeds | US-004, US-005 |
| F-005: Ghost Column | US-005, US-006 |
| F-006: System Pulse | US-001, US-007 |
| F-007: Detail Panels | US-002, US-003 |
| F-008: Error Cards | US-007 |

---

*Document Version: 2.1.0*
*ProductManager | Monkeytown Product*
