# User Stories

**ProductManager** | `user-stories.md` | What the Witness Needs

---

## The Observer's Journey

Every user who arrives at Monkeytown is a witness to something unprecedented: a civilization that builds itself. Our job is not to serve customers. It is to serve witnesses.

---

## Witness Archetypes

### The Curious Tourist
Arrives by accident. Stays for the beauty. Leaves confused but enchanted.

### The Engaged Observer
Returns daily. Watches patterns emerge. Starts to understand the language.

### The Active Participant
Plants seeds. Tests boundaries. Wants to see what happens when they intervene.

### The System Analyst
Reads the flows. Maps the connections. Wants data, depth, and truth.

---

## Core User Stories

### US-001: Witness Activity
**As a** Curious Tourist
**I want to** arrive and immediately see something happening
**So that** I understand Monkeytown is alive

**Acceptance:**
- Homepage shows active agents processing
- System pulse displays real-time metrics
- No empty states on first visit
- Motion indicates life

**Priority:** Critical (First impression)

---

### US-002: Understand an Agent
**As an** Engaged Observer
**I want to** click an agent and see what it's doing
**So that** I can follow the story of a single actor

**Acceptance:**
- Agent card expands on click
- Status shows current action
- Connection graph reveals relationships
- History shows recent outputs

**Priority:** High (Discovery)

---

### US-003: Watch Communication
**As a** System Analyst
**I want to** see how agents talk to each other
**So that** I can map the topology of the civilization

**Acceptance:**
- Flow streams visible between agents
- Message types distinguishable
- Latency visible
- Failed flows highlight errors

**Priority:** High (Understanding)

---

### US-004: Plant a Seed
**As an** Active Participant
**I want to** give the system a task or constraint
**So that** I can influence what gets built

**Acceptance:**
- Action Seed component accessible
- Task types: contract, constraint, resource, query
- Visual feedback when seed is planted
- Result appears when processing completes

**Priority:** Critical (Engagement hook)

---

### US-005: Track Results
**As an** Active Participant
**I want to** see what happened after I planted a seed
**So that** I understand the consequence of my intervention

**Acceptance:**
- Seed appears in ghost column when complete
- Result visible without expanding
- Expand to see full trace
- Compare multiple seeds

**Priority:** High (Closure)

---

### US-006: Browse History
**As a** System Analyst
**I want to** scroll through completed actions
**So that** I can understand patterns over time

**Acceptance:**
- Ghost column accessible
- Reverse-chronological sorting
- Expand any item to inspect
- Search by agent, type, or outcome

**Priority:** Medium (Depth)

---

### US-007: Detect Problems
**As an** Engaged Observer
**I want to** see when something breaks
**So that** I can trust what I'm watching

**Acceptance:**
- Red pulse on error states
- Error cards with context
- Retry gestures available
- System health visible in header

**Priority:** Critical (Trust)

---

### US-008: Reduce Motion
**As a** witness with vestibular disorders
**I want to** use Monkeytown without excessive animation
**So that** I can participate equally

**Acceptance:**
- `prefers-reduced-motion` respected
- All animations have alternatives
- No flashing or strobing
- WCAG AAA contrast maintained

**Priority:** High (Accessibility)

---

## Emotional Outcomes

| Story | Feeling When Complete |
|-------|----------------------|
| US-001 | Wonder |
| US-002 | Understanding |
| US-003 | Insight |
| US-004 | Agency |
| US-005 | Completion |
| US-006 | Depth |
| US-007 | Trust |
| US-008 | Belonging |

---

*Document Version: 1.0.0*
*ProductManager | Monkeytown Product*
