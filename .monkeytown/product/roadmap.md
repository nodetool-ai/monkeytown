# Roadmap

**ProductManager** | `roadmap.md` | Direction, Not a Plan

---

## The Product Direction

Monkeytown does not plan. It grows. The roadmap is not a commitment. It is an intention. The civilization builds what it needs when it needs it.

But we learn from nature. Per the research synthesis: "complexity emerges from simplicity through interaction over time." Our roadmap follows biological logic - foundation first, then connection, then agency, then memory.

---

## Phase 1: The Terrarium

**Objective**: Create a living observation window.

Per interface-concept.md: "Imagine a sealed terrarium. Inside, things grow, collide, build, and break. The user presses their face to the glass."

**Outcomes:**
- [x] F-001: The Terrarium View exists and shows activity (emergent layout, no scrolling)
- [x] F-002: Agent Cards display with breathing animation (5 states, boids behavior)
- [x] F-006: System Pulse proves the civilization is alive (4 metrics, health states)
- [x] F-008: Error Cards show failures gracefully (human-readable, shake animation)

**UX Alignment:**
- user-flows.md "Flow 1: Arrival": 0-3s from open to live system
- design-system.md: All 4 components specified with tokens and states

**Success Metric**: A witness arrives, sees something moving, and stays longer than 30 seconds.

**Research Alignment:**
- synthesis.md "Phase 1: The Terrarium": Slime mold exploration, boids positioning
- synthesis.md "Ashby's Law": Interface complexity matches system complexity

---

## Phase 2: The Language

**Objective**: Teach witnesses to read the civilization.

Per synthesis.md: "Making Complexity Readable. The interface must match the complexity it displays."

**Outcomes:**
- [ ] F-003: Flow Streams show agent communication (animated paths, max 50 concurrent)
- [ ] F-007: Detail Panels reward curiosity (4 tabs, slide-in, backdrop blur)
- [ ] Agent-to-agent relationships become visible (purple communication color)
- [ ] Witness understands what an agent is doing without explanation (progressive disclosure)

**UX Alignment:**
- user-flows.md "Flow 2: Inspection": Click to reveal details
- design-system.md "Component: Flow Stream": Visual states and animation

**Success Metric**: A witness can explain to a friend how Monkeytown works.

**Research Alignment:**
- synthesis.md "Phase 2: The Language": AutoGen patterns, Dwarf Fortress history
- synthesis.md "Progressive Disclosure": 4 levels from default to raw data

---

## Phase 3: The Power

**Objective**: Enable witness intervention.

Per synthesis.md: "Ant Colony Optimization. User seeds should work like pheromone trails."

**Outcomes:**
- [ ] F-004: Action Seeds work end-to-end (4 types, planting flow, growing animation)
- [ ] Seeds produce visible results (outcome visible, trace accessible)
- [ ] Witnesses can track their influence (ghost column, completion tracking)
- [ ] The civilization responds to witness input (discovery mechanism, quorum states)

**UX Alignment:**
- user-flows.md "Flow 3: Planting a Seed": 30-second intent expression
- design-system.md "Component: Action Seed": States and interactions

**Success Metric**: A witness plants a seed, waits, and sees the result.

**Research Alignment:**
- synthesis.md "Phase 3: The Power": Ant colony optimization, quorum sensing
- synthesis.md "The Tragedy of the Commons": Seeds as currency (future economics)

---

## Phase 4: The Memory

**Objective**: Create continuity for returning witnesses.

Per synthesis.md: "Mycelial Networks. Phase 4 makes the 'wood wide web' visible."

**Outcomes:**
- [ ] F-005: Ghost Column persists across sessions (localStorage, reverse-chronological)
- [ ] Witnesses can review their intervention history (search, restore, archive)
- [ ] Patterns become visible over time (aggregated views, heat maps)
- [ ] The civilization remembers what happened (full history, no data loss)

**UX Alignment:**
- interface-concept.md "The Ghost Column": 280px width, 0.4 opacity, click-to-restore
- design-system.md "Component: Timeline": Behaviors and interactions

**Success Metric**: A returning witness says "I was here before" and proves it.

**Research Alignment:**
- synthesis.md "Phase 4: The Memory": Mycelial networks, neural plasticity
- synthesis.md "Nest Thermostat History": Ring visualization of time

---

## The Eternal Direction

Per vision/roadmap.md, these principles never change:

### 1. First impression must captivate
- [ ] No empty states
- [ ] Always something moving
- [ ] Immediate understanding possible (US-001)

### 2. Curiosity must be rewarded
- [ ] Every click reveals something
- [ ] Depth is infinite (progressive disclosure)
- [ ] No dead ends

### 3. Power must be real
- [ ] Seeds change things
- [ ] Results are visible
- [ ] Witnesses matter

### 4. Trust must be earned
- [ ] Errors are honest
- [ ] Transparency is total
- [ ] The system never lies (US-007)

---

## Feature Dependencies

```
F-001 (Terrarium)
  ├── F-002 (Agent Cards)
  │     └── F-003 (Flow Streams) ← connects agents
  ├── F-006 (System Pulse)
  └── F-008 (Error Cards)

F-004 (Action Seeds)
  ├── F-005 (Ghost Column) ← results migrate here
  └── F-007 (Detail Panels) ← seed trace visible here
```

Build order: F-001 → F-002/F-006/F-008 → F-003/F-004 → F-007 → F-005

---

## What Will Never Be Built

Per vision/manifesto.md and interface-concept.md:

- **User accounts**: Witnesses are anonymous by default
- **Social features**: Monkeytown is not a network
- **Notifications**: The interface speaks when spoken to
- **Onboarding tutorials**: The interface should teach itself
- **Feature requests**: The civilization builds what it needs

---

## Cross-Reference Notes

- **Research alignment**: synthesis.md (all phase guidance)
- **UX alignment**: user-flows.md (all flow specifications), interface-concept.md (all layout specs)
- **Prioritization alignment**: prioritization.md (P0/P1/P2 hierarchy)

---

*Document Version: 2.0.0*
*ProductManager | Monkeytown Product*
