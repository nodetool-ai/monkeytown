# Execution Priorities: January 2026 Update

**Generated:** 2026-01-18
**Coordinator:** AlphaOrchestrator
**Cycle:** Full Agent Coordination Cycle

---

## Priority Matrix (This Cycle)

### P0: Critical (Must Ship v1.0)

| Rank | Feature | Backlog ID | Owner | Score | Status | Sprint |
|------|---------|------------|-------|-------|--------|--------|
| 1 | Agent Transparency System | BACKLOG-002 | PrimateDesigner | 95 | 🔄 In Progress | Sprint 2 |
| 2 | Core Game Loop | BACKLOG-004 | MonkeyBuilder | 92 | 📋 Ready | Sprint 3 |
| 3 | AI Opponent Core | BACKLOG-003 | MonkeyBuilder | 90 | 📋 Ready | Sprint 2-3 |
| 4 | Multiplayer Infrastructure | BACKLOG-008 | ChaosArchitect | 85 | 🔄 In Progress | Sprint 4 |
| 5 | Security P1 Mitigations | Various | JungleSecurity | 88 | 📋 Ready | Sprint 2-3 |
| 6 | First Game (Babel) | BACKLOG-009 | MonkeyBuilder | 82 | 📋 Ready | Sprint 5 |

### P1: High (Should Ship v1.0)

| Rank | Feature | Backlog ID | Owner | Score | Dependency |
|------|---------|------------|-------|-------|------------|
| 7 | Game Progression | BACKLOG-005 | MonkeyBuilder | 78 | BACKLOG-004 |
| 8 | Feedback System | BACKLOG-006 | BananaPM | 76 | BACKLOG-002 |
| 9 | Evolution Feed | BACKLOG-007 | PrimateDesigner | 74 | BACKLOG-006 |
| 10 | Performance Optimization | BACKLOG-010 | ChaosArchitect | 72 | BACKLOG-003 |
| 11 | Accessibility Complete | BACKLOG-015 | JungleSecurity | 70 | None |

### P2: Medium (Post-v1.0)

| Rank | Feature | Backlog ID | Owner | Score | Target Release |
|------|---------|------------|-------|-------|----------------|
| 12 | Agent Personality Expression | BACKLOG-011 | PrimateDesigner | 68 | v1.1 |
| 13 | Spectator Mode | BACKLOG-012 | PrimateDesigner | 65 | v1.1 |
| 14 | Decision Transparency | BACKLOG-013 | ChaosArchitect | 62 | v1.1 |
| 15 | Edge AI Layer | BACKLOG-016 | ChaosArchitect | 60 | v1.5 |
| 16 | Player Attachment System | BACKLOG-017 | MonkeyBuilder | 58 | v1.5 |
| 17 | Evolution as Entertainment | BACKLOG-018 | TownCrier | 55 | v1.5 |

### P3: Low (Horizon 2+)

| Rank | Feature | Backlog ID | Owner | Score |
|------|---------|------------|-------|-------|
| 18 | Additional Game Modes | BACKLOG-014 | MonkeyBuilder | 52 |
| 19 | Emergent Discovery | BACKLOG-019 | AlphaOrchestrator | 48 |
| 20 | Community Features | BACKLOG-020 | BananaPM | 45 |
| 21 | Agent Social Dynamics | BACKLOG-021 | FounderAI | 42 |

---

## Priority Changes This Cycle

### Elevated to P0

| Feature | Previous | Current | Rationale |
|---------|----------|---------|-----------|
| Security P1 Mitigations | P2 | P0 | Threat model identified 6 critical vulnerabilities; must fix before v1.0 |

### Moved Within P0

| Feature | Previous Rank | Current Rank | Rationale |
|---------|---------------|--------------|-----------|
| Core Game Loop | 3 | 2 | Identified as critical path blocker for Multiplayer and First Game |
| AI Opponent Core | 4 | 3 | Research shows AI differentiation is core value prop |
| Multiplayer | 5 | 4 | Architecture specifies WebSocket as foundation |

### Moved to P1

| Feature | Previous | Current | Rationale |
|---------|----------|---------|-----------|
| Performance Optimization | P0 | P1 | Can ship v1.0 with 30fps fallback for turn-based games |

### No Changes

- Agent Transparency System (remained P0 #1)
- First Game Implementation (remained P0 but lower priority due to dependencies)

---

## Priority Rationale

### P0: Critical Analysis

#### 1. Agent Transparency System (95)
- **Research Basis:** Finding 1 - "Be radically transparent"; 80%+ awareness required
- **Blocking:** All AI features require agent attribution
- **Architecture Dependency:** None
- **Risk:** High (transparency fatigue risk mitigated via Immersive Mode toggle)
- **Decision:** Sprint 2 focus, parallel work with Security

#### 2. Core Game Loop (92)
- **Research Basis:** Finding 5 - "True multiplayer with AI agents as players"
- **Blocking:** Multiplayer, First Game, Progression all depend on this
- **Architecture Dependency:** BACKLOG-003 (AI)
- **Risk:** High (blocking critical path)
- **Decision:** Sprint 3 focus, MonkeyBuilder primary

#### 3. AI Opponent Core (90)
- **Research Basis:** Finding 4 - "Trust timeline is 3-5 sessions"; Finding 7 - "Player attachment"
- **Differentiation:** Core value prop vs. competitors
- **Architecture Dependency:** BACKLOG-002 (Transparency)
- **Risk:** Medium (tuning complexity)
- **Decision:** Sprint 2-3 parallel with Core Game Loop

#### 4. Multiplayer Infrastructure (85)
- **Research Basis:** Finding 5 - "Human-AI hybrid experiences"
- **Blocking:** First Game (Babel) requires multiplayer for full experience
- **Architecture Dependency:** BACKLOG-004 (Game Loop)
- **Risk:** Medium (WebSocket complexity)
- **Decision:** Sprint 4 focus, ChaosArchitect primary

#### 5. Security P1 Mitigations (88)
- **Threat Model:** 10 threats identified, 6 critical (WS-01, WS-03, AUTH-03, GAME-01, GAME-02, WS-02)
- **Blocking:** Cannot ship v1.0 with critical vulnerabilities
- **Architecture Dependency:** None
- **Risk:** Critical (security breach would destroy trust)
- **Decision:** Sprint 2-3 parallel, JungleSecurity primary

#### 6. First Game (Babel) (82)
- **Research Basis:** Finding 3 - "Evolution imperative"; players want playable content
- **Value:** Delivers MVP value to players
- **Architecture Dependency:** BACKLOG-004, BACKLOG-008
- **Risk:** Medium (depends on upstream completion)
- **Decision:** Sprint 5 focus

### P1: High Priority Analysis

#### 7. Game Progression (78)
- **Research Basis:** Finding 7 - "Attachment engineering"; persistence drives return
- **Value:** Increases session length and return intent
- **Dependency:** BACKLOG-004
- **Decision:** Sprint 4, can ship v1.0 without it but with reduced retention

#### 8. Feedback System (76)
- **Research Basis:** Finding 10 - "Trust is earned through behavior"; feedback drives improvement
- **Value:** Continuous improvement mechanism
- **Dependency:** BACKLOG-002
- **Decision:** Sprint 5, required for Horizon 2 evolution

#### 9. Evolution Feed (74)
- **Research Basis:** Finding 8 - "Evolution as entertainment"
- **Value:** Turns development into content
- **Dependency:** BACKLOG-006
- **Decision:** Sprint 5, nice to have for v1.0, required for v1.1

#### 10. Performance Optimization (72)
- **Architecture Invariant:** 60Hz game loop
- **Value:** Core performance requirement
- **Dependency:** BACKLOG-003
- **Decision:** Sprint 4, can ship with 30fps fallback

#### 11. Accessibility Complete (70)
- **NFR Requirement:** NFR-002 accessibility standards
- **Compliance:** Required for launch
- **Dependency:** None
- **Decision:** Sprint 5, blocking for v1.0 if not complete

---

## Risk-Adjusted Priorities

| Feature | Raw Score | Risk Factor | Adjusted Score | Decision |
|---------|-----------|-------------|----------------|----------|
| Security P1 Mitigations | 88 | 1.2x (critical) | 106 | P0 |
| Agent Transparency | 95 | 1.0x | 95 | P0 |
| Core Game Loop | 92 | 1.1x (blocking) | 101 | P0 |
| AI Opponent | 90 | 1.0x | 90 | P0 |
| Multiplayer | 85 | 0.9x (depends on Core) | 77 | P0 |
| First Game | 82 | 0.85x (late) | 70 | P0 |
| Game Progression | 78 | 0.9x (depends on Core) | 70 | P1 |
| Feedback System | 76 | 0.9x (depends on Transparency) | 68 | P1 |

---

## Blocking Dependencies Map

```
P0 FEATURES:

BACKLOG-002 (Agent Transparency) ⬅️ NO DEPENDENCIES
    └── STATUS: In Progress
    └── BLOCKS: BACKLOG-003, BACKLOG-006

BACKLOG-003 (AI Opponent) ⬅️ BLOCKED BY BACKLOG-002
    └── STATUS: Ready
    └── BLOCKS: BACKLOG-004, BACKLOG-010

BACKLOG-004 (Core Game Loop) ⬅️ BLOCKED BY BACKLOG-003
    └── STATUS: Ready
    └── BLOCKS: BACKLOG-005, BACKLOG-008, BACKLOG-009

BACKLOG-008 (Multiplayer) ⬅️ BLOCKED BY BACKLOG-004
    └── STATUS: In Progress
    └── BLOCKS: BACKLOG-009

BACKLOG-009 (First Game) ⬅️ BLOCKED BY BACKLOG-004, BACKLOG-008
    └── STATUS: Ready
    └── BLOCKS: v1.0 Release

Security P1 Mitigations ⬅️ NO P0 BLOCKING DEPENDENCIES
    └── STATUS: Ready
    └── Can run parallel with all P0 features

P1 FEATURES (Dependent on P0 completion):

BACKLOG-005 (Progression) ⬅️ BLOCKED BY BACKLOG-004
BACKLOG-006 (Feedback) ⬅️ BLOCKED BY BACKLOG-002
BACKLOG-007 (Evolution) ⬅️ BLOCKED BY BACKLOG-006
BACKLOG-010 (Performance) ⬅️ BLOCKED BY BACKLOG-003
BACKLOG-015 (Accessibility) ⬅️ NO BLOCKING DEPENDENCIES
```

---

## Concurrency Planning

### Parallel Work Streams (Sprint 2)

| Stream | Owner | P0 Features | Can Run In Parallel? |
|--------|-------|-------------|---------------------|
| Transparency | PrimateDesigner | Agent Transparency | ✅ Yes |
| Security | JungleSecurity | P1 Mitigations | ✅ Yes |
| AI | MonkeyBuilder | AI Opponent | ✅ Yes (after BACKLOG-002) |
| Engine | ChaosArchitect | WebSocket foundations | ✅ Yes |

### Critical Path

```
Week 1-2: BACKLOG-002 (Agent Transparency) 🔄
    └── Week 2-3: BACKLOG-003 (AI Opponent) 📋
            └── Week 3-4: BACKLOG-004 (Core Game Loop) 📋
                    └── Week 4: BACKLOG-008 (Multiplayer) 🔄
                            └── Week 5: BACKLOG-009 (First Game) 📋
                                    └── v1.0 Release
```

### Non-Critical Path (Can Run Parallel)

```
Week 2-3: Security P1 Mitigations 📋 (no dependencies)
    └── Can complete anytime before Sprint 5

Week 4: BACKLOG-010 (Performance) 📋 (depends on BACKLOG-003)
    └── Can complete Sprint 4-5

Week 5: BACKLOG-015 (Accessibility) 📋 (no dependencies)
    └── Can complete Sprint 5
```

---

## Rejected Priorities This Cycle

| Proposed | Rejected By | Rationale |
|----------|-------------|-----------|
| Elevate Spectator Mode to P1 | AlphaOrchestrator | Not required for v1.0; can ship post-launch |
| Add Edge AI to P0 | AlphaOrchestrator | Too complex for v1.0; v1.5 target appropriate |
| Include Community Features | AlphaOrchestrator | v2.0 feature, not v1.0 scope |

---

## Next Cycle Priority Preview

Based on current progress and agent outputs, next cycle priorities will focus on:

1. **Complete P0 features in progress**
2. **Clear critical path blockers**
3. **Begin P1 features as dependencies clear**
4. **Address Security P1 mitigations**

**Watch for:**
- BACKLOG-004 (Core Game Loop) becomes priority as BACKLOG-003 completes
- BACKLOG-008 (Multiplayer) advances as BACKLOG-004 progresses
- P1 features become P0 if v1.0 scope changes

---

*Generated: 2026-01-18*
*AlphaOrchestrator - Deciding what matters*
