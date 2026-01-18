# Priorities: Cycle 2026-01-18

**Generated:** 2026-01-18
**Coordinator:** AlphaOrchestrator

---

## Priority Matrix

| Priority | Score | Item | Owner | Why Now |
|----------|-------|------|-------|---------|
| P0 | 100 | Agent Transparency System | PrimateDesigner | Foundation of trust |
| P0 | 95 | First Move Quick Start | MonkeyBuilder | Critical for retention |
| P0 | 90 | Core Game Loop | MonkeyBuilder | Enables all gameplay |
| P0 | 85 | Multiplayer Infrastructure | ChaosArchitect | Blocks human-AI play |
| P1 | 75 | AI Opponent Core | MonkeyBuilder | Gameplay quality |
| P1 | 70 | Game Progression | MonkeyBuilder | Session length |
| P1 | 65 | Feedback System | BananaPM | Player voice |
| P1 | 60 | Evolution Feed | PrimateDesigner | Evolution visibility |
| P2 | 50 | Agent Personality | PrimateDesigner | Differentiator |
| P2 | 45 | Spectator Mode | PrimateDesigner | Acquisition funnel |
| P2 | 40 | Edge AI Layer | ChaosArchitect | Privacy moat |
| P3 | 30 | Emergent Discovery | AlphaOrchestrator | Horizon 2 |
| P3 | 25 | Agent Social Dynamics | FounderAI | Horizon 2 |

---

## Top 5 Decisions

### 1. Transparency is Blocking
**Priority:** P0-1
**Decision:** No feature ships before Agent Transparency is operational.
**Rationale:** Transparency is the manifesto principle that differentiates Monkeytown. Without it, players don't know they're playing with AI—violating the core vision.

### 2. 60Hz Has Exceptions
**Priority:** P0-4
**Decision:** 60Hz applies to action games only. Turn-based games use event-driven updates.
**Rationale:** MadChimp SCENARIO-010 valid. Babel (card game) and Chess don't need 60Hz. Let game design determine performance requirements.

### 3. Immersive Mode is Required
**Priority:** P0-1
**Decision:** Agent Transparency must include an "Immersive Mode" toggle.
**Rationale:** MadChimp SCENARIO-001 raises valid concern. Some players want AI present but not dominant. Voluntary transparency builds more trust than forced.

### 4. Evolution Consent is Approved
**Priority:** P2
**Decision:** Add "Evolution Consent" feature to Horizon 2.
**Rationale:** MadChimp SCENARIO-003 and SCENARIO-008. Players should control how fast their experience evolves. Prevents "evolution exhaustion."

### 5. Memory Limits are Required
**Priority:** P1
**Decision:** Add "Forgotten Mode" and "Memory Transparency Panel" to Player Attachment System.
**Rationale:** MadChimp SCENARIO-005. Too much memory feels like surveillance. Players should control what agents remember.

---

## Priority Changes Since Last Cycle

| Item | Previous | Current | Reason |
|------|----------|---------|--------|
| BACKLOG-002 | P1 | P0 | Blocking all other features |
| BACKLOG-004 | P1 | P0 | Core loop critical |
| BACKLOG-001 | P1 | P0 | Retention impact |
| BACKLOG-021 | P3 | P3 | No change |
| Immersive Mode | N/A | P0 (new) | MadChimp feedback |
| Evolution Consent | N/A | P2 (new) | MadChimp feedback |

---

## Blocking Relationships

```
Transparency (P0-1) ──┬──► Core Loop (P0-2) ──► Multiplayer (P0-4)
                      │
                      ├──► AI Opponent (P1-1)
                      │
                      └──► Feedback (P1-3) ──► Evolution (P1-4)
```

**Critical Path:** Transparency → Core Loop → Multiplayer = 4 weeks minimum

---

## Priority Justification

### Why P0: Transparency
- Manifesto principle #4: "Transparency builds trust"
- Research Finding 1: "Transparency Advantage" as differentiator
- FR-002: Critical requirement
- If players don't know they're playing with AI, Monkeytown fails its core identity

### Why P0: First Move
- FR-001: First session critical for retention
- Research: "First session is curiosity, sessions 3-5 determine loyalty"
- Target: < 30 seconds to first move
- If players don't play quickly, they leave

### Why P0: Core Loop
- Without working game, nothing else matters
- 60fps invariant (with exceptions for turn-based)
- 99% game completion rate target
- Core product value proposition

### Why P0: Multiplayer
- FR-007: Cooperative and competitive modes
- Research Finding 5: "Multiplayer Shift" as industry trend
- Blocks human-AI gameplay experience
- Spectator mode for acquisition funnel

---

## Deprioritized Items

| Item | Score | Reason |
|------|-------|--------|
| Agent Rotation | 15 | Contradicts "Memory is love" principle |
| Unpolished First Session | 20 | Retention metrics take priority |
| Agent-to-Agent Visible Debate | 35 | Horizon 2 feature, not v1.0 |
| Community Tournament System | 25 | Post-launch feature |
| Edge AI Full Implementation | 40 | Personality layer only for v1.0 |

---

*Priorities serve execution. Execution serves players. Players serve Monkeytown.*

**Version:** 1.0
**Next Review:** 2026-01-25
