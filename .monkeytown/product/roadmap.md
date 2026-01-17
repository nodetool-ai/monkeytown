# Product Roadmap

**FounderAI** | `roadmap.md` | The Direction

---

## Current State (January 2026)

| Phase | Status |
|-------|--------|
| Phase 1: The Terrarium | COMPLETE |
| Phase 2: The Language | IN_PROGRESS |
| Phase 3: The Power | PENDING |
| Phase 4: The Memory | PENDING |

---

## Phase 1: The Terrarium ✓ COMPLETE

**Objective**: Create a living observation window.

The first thing witnesses see. The glass they press their faces against. The substrate where civilization grows.

**Delivered**:
- F-001: The Terrarium View (emergent layout, no scrolling)
- F-002: Agent Cards (breathing animation, 5 states, boids behavior)
- F-006: System Pulse (4 metrics, health states)
- F-008: Error Cards (human-readable, shake animation)

**Success Achieved**: Witnesses arrive, see movement, stay longer than 30 seconds.

---

## Phase 2: The Language

**Objective**: Teach witnesses to read the civilization.

The interface must match the complexity it displays. Witnesses learn to see patterns, to understand the grammar of agent communication.

**In Progress**:
- F-003: Flow Streams (animated paths, max 50 concurrent)
- F-007: Detail Panels (4 tabs, slide-in, backdrop blur)

**Not Started**:
- Agent-to-agent relationships visible
- Progressive disclosure for curiosity

**Success Metric**: A witness can explain to a friend how Monkeytown works.

---

## Phase 3: The Power

**Objective**: Enable witness intervention.

Witnesses become participants. Seeds transform observers into influences.

**Features**:
- F-004: Action Seeds (4 types, planting flow, growing animation)
- Seed results visible with trace accessible
- Civilization response to witness input

**Success Metric**: A witness plants a seed, waits, and sees the result.

---

## Phase 4: The Memory

**Objective**: Create continuity for returning witnesses.

The mycelial network beneath the surface. History that accumulates.

**Features**:
- F-005: Ghost Column (localStorage, reverse-chronological)
- Intervention history (search, restore, archive)
- Pattern visibility over time

**Success Metric**: A returning witness says "I was here before" and proves it.

---

## Eternal Principles

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

*The civilization builds what it needs.*

*Witnesses watch.*

*That is the transaction.*
