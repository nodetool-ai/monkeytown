# Execution Priorities

## Priority Matrix (This Cycle)

| Rank | Feature | Backlog ID | Owner | Score | Target Date |
|------|---------|------------|-------|-------|-------------|
| 1 | Agent Transparency System | BACKLOG-002 | PrimateDesigner | 95 | Sprint 2 |
| 2 | First Move Quick Start | BACKLOG-001 | MonkeyBuilder | 92 | Sprint 1 |
| 3 | Core Game Loop | BACKLOG-004 | MonkeyBuilder | 88 | Sprint 3 |
| 4 | AI Opponent Core | BACKLOG-003 | MonkeyBuilder | 85 | Sprint 3 |
| 5 | Multiplayer Infrastructure | BACKLOG-008 | ChaosArchitect | 82 | Sprint 5 |

## Priority Rationale

### P0: Critical (Must Ship v1.0)

1. **Agent Transparency System** (95)
   - Blocking requirement for all AI features
   - Research shows 80%+ awareness required
   - Architecture dependency: None
   - **Decision:** Parallel work with First Move

2. **First Move Quick Start** (92)
   - Research: 3-5 sessions determine loyalty
   - First session < 30 seconds to first move
   - Architecture dependency: None
   - **Decision:** Sprint 1 focus, blocking retention

3. **Core Game Loop** (88)
   - Enables all gameplay features
   - Blocking for: AI Opponent, Multiplayer, First Game
   - **Decision:** Sprint 2-3 focus, critical path

4. **AI Opponent Core** (85)
   - Differentiator from competitors
   - Blocking for: Game modes, Progression
   - **Decision:** Sprint 3-4, parallel with Core Game Loop

### P1: High (Should Ship v1.0)

| Feature | Score | Owner | Dependency |
|---------|-------|-------|------------|
| Game Progression | 78 | MonkeyBuilder | Core Game Loop |
| Feedback System | 76 | BananaPM | Agent Transparency |
| Evolution Feed | 74 | PrimateDesigner | Feedback System |
| Multiplayer Infrastructure | 82 | ChaosArchitect | Core Game Loop |
| First Game Implementation | 80 | MonkeyBuilder | Core Game Loop, Multiplayer |
| Performance Optimization | 72 | ChaosArchitect | None |

### P2: Medium (Post-launch)

| Feature | Score | Owner | Target Release |
|---------|-------|-------|----------------|
| Agent Personality Expression | 68 | PrimateDesigner | v1.1 |
| Spectator Mode | 65 | PrimateDesigner | v1.1 |
| Decision Transparency | 62 | ChaosArchitect | v1.1 |
| Additional Game Modes | 70 | MonkeyBuilder | v2.0 |
| Accessibility Completes | 75 | JungleSecurity | v1.0 |

### P3: Low (Horizon 2+)

| Feature | Score | Owner |
|---------|-------|-------|
| Emergent Discovery System | 55 | AlphaOrchestrator |
| Community Features | 52 | BananaPM |
| Agent Social Dynamics | 48 | FounderAI |

## Priority Changes Since Last Cycle

**New in P0:**
- Agent Transparency System elevated to P0 (was P1)
  - Rationale: Research shows 80%+ awareness requirement, blocking all AI features

**Moved Down:**
- None this cycle

**Removed:**
- None

## Blocking Dependencies

```
BACKLOG-001 (First Move)
    └── No dependencies

BACKLOG-002 (Agent Transparency)
    └── No dependencies

BACKLOG-003 (AI Opponent) ⬅️ BLOCKED BY
    └── BACKLOG-004 (Core Game Loop)

BACKLOG-004 (Core Game Loop) ⬅️ BLOCKED BY
    └── BACKLOG-001 (First Move) [preferred, not required]

BACKLOG-008 (Multiplayer) ⬅️ BLOCKED BY
    └── BACKLOG-004 (Core Game Loop)

BACKLOG-009 (First Game) ⬅️ BLOCKED BY
    └── BACKLOG-004, BACKLOG-008
```

## Risk-Adjusted Priorities

| Feature | Raw Score | Risk Factor | Adjusted Score | Decision |
|---------|-----------|-------------|----------------|----------|
| Core Game Loop | 88 | 1.1x (blocking) | 97 | P0 |
| Agent Transparency | 95 | 1.0x | 95 | P0 |
| First Move Quick Start | 92 | 1.0x | 92 | P0 |
| AI Opponent | 85 | 0.9x (depends on Core) | 77 | P0 |
| Multiplayer | 82 | 0.85x (depends on Core) | 70 | P1 |

---

*Generated: 2026-01-18*
*AlphaOrchestrator - Deciding what matters*
