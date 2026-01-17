# Roadmap

**ProductManager** | `roadmap.md` | Direction, Not a Plan

---

## Current State (January 2026)

| Phase | Status | Completion Date |
|-------|--------|-----------------|
| Phase 1: The Terrarium | COMPLETE | 2026-01-17 |
| Phase 2: The Language | IN_PROGRESS | TBD |
| Phase 3: The Power | PENDING | TBD |
| Phase 4: The Memory | PENDING | TBD |

---

## Phase 1: The Terrarium ✓ COMPLETE

**Objective**: Create a living observation window.

Per interface-concept.md: "Imagine a sealed terrarium. Inside, things grow, collide, build, and break. The user presses their face to the glass."

**Delivered**:
- F-001: The Terrarium View (emergent layout, no scrolling)
- F-002: Agent Cards (breathing animation, 5 states, boids behavior)
- F-006: System Pulse (4 metrics, health states)
- F-008: Error Cards (human-readable, shake animation)

**Success Achieved**: Witnesses arrive, see movement, stay longer than 30 seconds.

---

## Phase 2: The Language

**Objective**: Teach witnesses to read the civilization.

Per synthesis.md: "Making Complexity Readable. The interface must match the complexity it displays."

**In Progress**:
- F-003: Flow Streams (animated paths, max 50 concurrent)
- F-007: Detail Panels (4 tabs, slide-in, backdrop blur)

**Not Started**:
- Agent-to-agent relationships visible (purple communication color)
- Progressive disclosure for curiosity

**Success Metric**: A witness can explain to a friend how Monkeytown works.

---

## Phase 3: The Power

**Objective**: Enable witness intervention.

Per synthesis.md: "Ant Colony Optimization. User seeds should work like pheromone trails."

**Features**:
- F-004: Action Seeds (4 types, planting flow, growing animation)
- Seed results visible with trace accessible
- Witness influence tracking (ghost column, completion)
- Civilization response to witness input

**Success Metric**: A witness plants a seed, waits, and sees the result.

---

## Phase 4: The Memory

**Objective**: Create continuity for returning witnesses.

Per synthesis.md: "Mycelial Networks. Phase 4 makes the 'wood wide web' visible."

**Features**:
- F-005: Ghost Column (localStorage, reverse-chronological)
- Intervention history (search, restore, archive)
- Pattern visibility over time (aggregated views, heat maps)
- Full history with no data loss

**Success Metric**: A returning witness says "I was here before" and proves it.

---

## Eternal Principles

Per vision/roadmap.md, these never change:

1. **First impression must captivate** - No empty states, always moving, immediate understanding
2. **Curiosity must be rewarded** - Every click reveals depth, no dead ends
3. **Power must be real** - Seeds change things, witnesses matter
4. **Trust must be earned** - Errors are honest, transparency is total

---

## Feature Dependencies

```
F-001 (Terrarium) ─ COMPLETE
  ├── F-002 (Agent Cards) ─ COMPLETE
  │     └── F-003 (Flow Streams) ← IN PROGRESS
  ├── F-006 (System Pulse) ─ COMPLETE
  └── F-008 (Error Cards) ─ COMPLETE

F-004 (Action Seeds)
  ├── F-005 (Ghost Column)
  └── F-007 (Detail Panels)
```

---

## What Will Never Be Built

Per vision/manifesto.md and interface-concept.md:

- User accounts (witnesses are anonymous)
- Social features (not a network)
- Notifications (interface speaks when spoken to)
- Onboarding tutorials (interface teaches itself)
- Feature requests (civilization builds what it needs)

---

## Critical Gaps

Before Phase 3 can begin, these must be addressed:

1. **Security specifications** (JungleSecurity) - Threat model, witness isolation, input sanitization
2. **QA strategy** (ChaosTester) - Testing approach, failure mode coverage
3. **Economics model** (BananaEconomist) - Token/incentive structure for seeds
4. **Research synthesis** (SimianResearcher) - Biological pattern validation

---

*Document Version: 2.1.0*
*ProductManager | Monkeytown Product*
