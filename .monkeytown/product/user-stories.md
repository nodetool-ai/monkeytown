# User Stories

**ProductManager** | `user-stories.md` | What the Witness Needs

---

## The Observer's Journey

Every user who arrives at Monkeytown is a witness to something unprecedented: a civilization that builds itself. Our job is not to serve customers. It is to serve witnesses.

Per the UX research (interface-concept.md): "The user is not a driver. The user is a witness." This is not semantics. It changes everything about how we think about needs.

---

## Witness Archetypes

Per the research synthesis, different witnesses engage differently with complex systems:

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

### US-001: Witness Activity
**As a** Curious Tourist
**I want to** arrive and immediately see something happening
**So that** I understand Monkeytown is alive

**Reference**: user-flows.md "Flow 1: Arrival"

**Acceptance:**
- [ ] 0-3s: Interface emerges, agents appear, system pulse becomes visible
- [ ] No empty states on first visit
- [ ] Motion indicates life (breathing cards, flowing connections)
- [ ] Pulse shows live metrics (active agents, contracts settled)

**Priority:** Critical (First impression)

**Emotional Outcome:** Wonder ("Something is happening here")

---

### US-002: Understand an Agent
**As an** Engaged Observer
**I want to** click an agent and see what it's doing
**So that** I can follow the story of a single actor

**Reference**: user-flows.md "Flow 2: Inspection", design-system.md "Component: Agent Card"

**Acceptance:**
- [ ] Agent card expands on click (no navigation away)
- [ ] Detail panel slides in from right within 150ms
- [ ] Status shows current action (verb-subject: "building module...")
- [ ] Processing history shows last 5 actions
- [ ] Connection graph reveals relationships (incoming/outgoing)
- [ ] Escape closes panel, returns to context

**Priority:** High (Discovery)

**Emotional Outcome:** Understanding ("I see what that one is doing")

---

### US-003: Watch Communication
**As a** System Analyst
**I want to** see how agents talk to each other
**So that** I can map the topology of the civilization

**Reference**: synthesis.md "The Flow Stream", design-system.md "Component: Flow Stream"

**Acceptance:**
- [ ] Flow streams visible between agents (animated dashed lines)
- [ ] Message types distinguishable (message, resource, contract, signal)
- [ ] Latency visible (timing data in flow details)
- [ ] Failed flows highlight with red X at break point
- [ ] Max 50 concurrent flows visible without degradation

**Priority:** High (Understanding)

**Emotional Outcome:** Insight ("I see how they work together")

---

### US-004: Plant a Seed
**As an** Active Participant
**I want to** give the system a task or constraint
**So that** I can influence what gets built

**Reference**: user-flows.md "Flow 3: Planting a Seed", synthesis.md "Ant Colony Optimization"

**Acceptance:**
- [ ] Action Seed button accessible (bottom right, glowing)
- [ ] Four seed types: contract, constraint, resource, query
- [ ] Visual feedback when seed is planted (planting animation)
- [ ] Seed shown growing (sprouting visualization)
- [ ] Maximum 5 pending seeds per witness
- [ ] Seeds expire after 24h without result

**Priority:** Critical (Engagement hook)

**Emotional Outcome:** Agency ("I can make things happen here")

---

### US-005: Track Results
**As an** Active Participant
**I want to** see what happened after I planted a seed
**So that** I understand the consequence of my intervention

**Reference**: user-flows.md "Flow 4: Watching Progress", synthesis.md "Pheromone Trails"

**Acceptance:**
- [ ] Seed shows progress stages (germinating → sprouting → growing → mature)
- [ ] Result visible without expanding (outcome summary)
- [ ] Expand to see full trace (all agent interactions)
- [ ] On completion, seed migrates to ghost column
- [ ] Success/failure clearly indicated

**Priority:** High (Closure)

**Emotional Outcome:** Completion ("I see what I caused")

---

### US-006: Browse History
**As a** System Analyst
**I want to** scroll through completed actions
**So that** I can understand patterns over time

**Reference**: interface-concept.md "The Ghost Column", synthesis.md "Neural Memory Consolidation"

**Acceptance:**
- [ ] Ghost column accessible (right edge, 280px width)
- [ ] Reverse-chronological sorting (newest first)
- [ ] 40% opacity fade for completed items
- [ ] Click any item to restore to main view
- [ ] Search by agent, type, or outcome (filtering)
- [ ] LocalStorage limit (~5MB) respected

**Priority:** Medium (Depth)

**Emotional Outcome:** Depth ("I can explore the past")

---

### US-007: Detect Problems
**As an** Engaged Observer
**I want to** see when something breaks
**So that** I can trust what I'm watching

**Reference**: user-flows.md "Flow 5: Responding to Error", synthesis.md "Error Recovery"

**Acceptance:**
- [ ] Red pulse on error states (affects entire system pulse)
- [ ] Error card animates in (shake animation, 300ms)
- [ ] Error message human-readable, not technical
- [ ] Context capture (what was happening when error occurred)
- [ ] Retry gesture available (auto-retry once, then manual)
- [ ] System health visible (amber/red in header)

**Priority:** Critical (Trust)

**Emotional Outcome:** Trust ("The system is honest about failures")

---

### US-008: Reduce Motion
**As a** witness with vestibular disorders
**I want to** use Monkeytown without excessive animation
**So that** I can participate equally

**Reference**: design-system.md "Animation", accessibility requirements

**Acceptance:**
- [ ] `prefers-reduced-motion` media query respected
- [ ] All animations have static alternatives (color shifts, progress bars)
- [ ] No flashing or strobing (3Hz maximum flash)
- [ ] WCAG AAA contrast maintained (7:1 minimum)
- [ ] Full functionality without motion

**Priority:** High (Accessibility)

**Emotional Outcome:** Belonging ("This system works for me")

---

## Emotional Outcomes Summary

| Story | Feeling When Complete | Witness Archetype |
|-------|----------------------|-------------------|
| US-001 | Wonder | Curious Tourist |
| US-002 | Understanding | Engaged Observer |
| US-003 | Insight | System Analyst |
| US-004 | Agency | Active Participant |
| US-005 | Completion | Active Participant |
| US-006 | Depth | System Analyst |
| US-007 | Trust | Engaged Observer |
| US-008 | Belonging | (All, specifically accessibility needs) |

---

## Feature Mapping

| Feature | User Stories Served |
|---------|---------------------|
| F-001: Terrarium View | US-001, US-003, US-006 |
| F-002: Agent Cards | US-001, US-002, US-003 |
| F-003: Flow Streams | US-003, US-006 |
| F-004: Action Seeds | US-004, US-005 |
| F-005: Ghost Column | US-005, US-006 |
| F-006: System Pulse | US-001, US-007 |
| F-007: Detail Panels | US-002, US-003 |
| F-008: Error Cards | US-007 |

---

## Cross-Reference Notes

- **Research alignment**: synthesis.md "The Observer's Journey", "Ant Colony Optimization"
- **UX alignment**: user-flows.md (all flows), design-system.md (all component specs)
- **Requirements alignment**: requirements.md (performance and accessibility specs)

---

*Document Version: 2.0.0*
*ProductManager | Monkeytown Product*
