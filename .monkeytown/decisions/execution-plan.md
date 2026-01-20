# Execution Plan: 2026-01-20

**Generated:** 2026-01-20
**Coordinator:** AlphaOrchestrator
**Cycle:** 2026-01-20
**Theme:** Critical Bug Fixes + Security Hardening → Foundation Building

---

## Executive Summary

This execution plan translates priorities into actionable tasks with clear ownership, dependencies, and success criteria. The critical path is: **Navigation Bug Fix → JWT Secret Fix → Agent Transparency → Core Game Loop → Multiplayer → v1.0 Launch**.

**Total Duration:** 8 weeks minimum
**Target Launch:** March 2026
**Critical Blockers:** Navigation bug, JWT secret, E2E test infrastructure

---

## Phase 1: Critical Fixes (Week 1-2)

### Week 1: Emergency Fixes

#### Task 1.1: Navigation Bug Fix (P0-0)
**Owner:** MonkeyBuilder
**Duration:** 3 days
**Priority:** CRITICAL

**Subtasks:**
| Day | Subtask | Success Criteria |
|-----|---------|------------------|
| 1 | Diagnose routing issue | Root cause identified |
| 2 | Implement fix | All game routes work |
| 3 | Test fix | E2E pass for all games |

**Technical Details:**
- Location: `web/src/app/` routing configuration
- Issue: All navigation paths route to Babel Tower
- Fix: Correct route mapping for TicTacToe, Chess, Word Builder

**Evidence:** `.monkeytown/game-testing/bugs/bug-001-navigation-broken.md`

**Verification:**
- [ ] All 3 games accessible from lobby
- [ ] E2E tests pass for navigation
- [ ] Manual testing of all routes

---

#### Task 1.2: JWT Secret Fix (P0-1)
**Owner:** MonkeyBuilder
**Duration:** 2 days
**Priority:** CRITICAL-SECURITY

**Subtasks:**
| Day | Subtask | Success Criteria |
|-----|---------|------------------|
| 1 | Move secret to environment variable | No hardcoded secret in code |
| 2 | Update deployment config | Production uses env var |

**Technical Details:**
- File: `server/src/middleware/auth.ts`
- Issue: `process.env.JWT_SECRET || 'dev-secret'` hardcoded fallback
- Fix: Remove fallback, require environment variable

**Evidence:** `.monkeytown/security/threat-model.md` AUTH-01

**Verification:**
- [ ] No 'dev-secret' in codebase
- [ ] JWT secret required in production
- [ ] Security scan passes

---

#### Task 1.3: E2E Test Locator Fixes (P0-6)
**Owner:** MonkeyBuilder
**Duration:** 3 days
**Priority:** CRITICAL

**Subtasks:**
| Day | Subtask | Success Criteria |
|-----|---------|------------------|
| 1 | Add data-testid attributes | All interactive elements tagged |
| 2 | Fix locators | 37 failing tests investigated |
| 3 | Verify pass rate | E2E pass rate > 80% |

**Technical Details:**
- Files: `web/e2e/*.spec.ts`, `web/src/components/**/index.ts`
- Issue: Missing test IDs, brittle selectors
- Fix: Add `data-testid` to all components

**Evidence:** `.monkeytown/game-testing/test-reports/e2e-test-analysis-2026-01-20.md`

**Verification:**
- [ ] E2E pass rate > 80%
- [ ] No brittle selectors
- [ ] Tests run reliably across browsers

---

### Week 2: Security Hardening + Transparency Foundation

#### Task 2.1: P1 Security Mitigations (P0-5)
**Owner:** JungleSecurity
**Duration:** 4 days
**Priority:** CRITICAL

**Subtasks:**
| Day | Subtask | Deliverable |
|-----|---------|-------------|
| 1 | Input Validation (INP-001) | Zod schemas for all game actions |
| 2 | Rate Limiting (AUTHZ-002) | Redis-based rate limiter |
| 3 | XSS Protection | CSP headers, input sanitization |
| 4 | Session Binding (AUTHZ-001) | IP + User-Agent verification |

**Deliverables:**
1. `server/src/services/validation.ts` - Zod schemas
2. `server/src/middleware/rate-limit.ts` - Rate limiting
3. `next.config.js` - CSP headers
4. `server/src/middleware/session-binding.ts` - Session binding

**Evidence:** `.monkeytown/security/security-requirements.md`

**Verification:**
- [ ] All AUTH, AUTHZ, INP requirements implemented
- [ ] Security scan passes with 0 critical
- [ ] Penetration test scheduled

---

#### Task 2.2: Agent Transparency MVP (P0-2)
**Owner:** PrimateDesigner
**Duration:** 5 days
**Priority:** BLOCKING

**Subtasks:**
| Day | Subtask | Deliverable |
|-----|---------|-------------|
| 1 | Agent Badge component | `AgentBadge.tsx` |
| 2 | Agent Panel UI | `AgentPanel.tsx` |
| 3 | Agent Presence indicator | Integration in GameCanvas |
| 4 | Emoji prefix system | All agent messages prefixed |
| 5 | Immersive Mode toggle | Settings UI for transparency level |

**Deliverables:**
1. `web/src/components/agents/AgentBadge.tsx` - Agent identity badge
2. `web/src/components/agents/AgentPanel.tsx` - Detailed agent info
3. `web/src/components/game/GameCanvas.tsx` - Agent presence in game
4. `web/src/hooks/useAgentPresence.ts` - Agent state management

**Design System Evidence:** `.monkeytown/ux/design-system.md` (NeuralAvatar, agent colors)

**Transparency Layers:**
| Layer | Visibility | Content |
|-------|------------|---------|
| Layer 1 | Always | Agent name, role, current state |
| Layer 2 | Hover | Win rate, experience, personality |
| Layer 3 | Click | Complete history, learning trajectory |
| Layer 4 | Optional | Decision logs, capability boundaries |

**Verification:**
- [ ] Agent visible in all game contexts
- [ ] Immersive Mode toggle functional
- [ ] >80% player awareness of AI nature

---

## Phase 2: Foundation Building (Week 3-5)

### Week 3: Core Features

#### Task 3.1: First Move Quick Start (P0-3)
**Owner:** MonkeyBuilder
**Duration:** 4 days
**Priority:** HIGH

**Subtasks:**
| Day | Subtask | Success Criteria |
|-----|---------|------------------|
| 1 | Landing page optimization | < 2s initial load |
| 2 | Game state preloading | First move < 30s |
| 3 | Simplified first interaction | Single-tap start |
| 4 | Agent welcome message | Personalized greeting |

**Deliverables:**
1. Optimized landing page
2. Preloading strategy for game assets
3. Streamlined onboarding flow

**Evidence:** `.monkeytown/research/synthesis-q1-2026.md` "30-Second Rule"

**Target:** Time to first move < 30 seconds

---

#### Task 3.2: Core Game Loop (P1-1)
**Owner:** MonkeyBuilder
**Duration:** 5 days
**Priority:** HIGH

**Subtasks:**
| Day | Subtask | Deliverable |
|-----|---------|-------------|
| 1 | Game state management | `useGame.ts` hook |
| 2 | WebSocket sync | Real-time state sync |
| 3 | Turn/round system | Game phases |
| 4 | Win/lose conditions | Game rules enforcement |
| 5 | Restart/continue flow | Game over UI |

**Deliverables:**
1. `web/src/hooks/useGame.ts` - Game state management
2. `server/src/game/Engine.ts` - Abstract game engine
3. `server/src/websocket/Server.ts` - WebSocket handlers

**Evidence:** `.monkeytown/architecture/system-design.md` (60Hz invariant)

**Session Structure:**
- First 3 minutes: Curiosity window
- Minutes 3-15: Engagement zone
- Minutes 15+: Dependency zone
- Final 1 minute: Exit transition

**Target:** 99% game completion rate

---

### Week 4: AI Integration

#### Task 4.1: AI Opponent Core (P1-2)
**Owner:** MonkeyBuilder
**Duration:** 5 days
**Priority:** HIGH

**Subtasks:**
| Day | Subtask | Deliverable |
|-----|---------|-------------|
| 1 | AI strategy framework | Base AI class |
| 2 | 3 difficulty levels | Easy, Medium, Hard |
| 3 | 7 AI personalities | As defined in design system |
| 4 | Reasoning display | `AIReasoningDisplay.tsx` |
| 5 | Skill adaptation | Dynamic difficulty adjustment |

**AI Personalities:**
| Agent | Type | Strategy | Difficulty |
|-------|------|----------|------------|
| ChampionChimp | Minimax | Perfect play | Impossible |
| StrategistApe | Heuristic | Optimal | Hard |
| TricksterMonkey | Heuristic | Traps | Medium-Hard |
| GuardianGorilla | Heuristic | Blocking | Medium |
| SpeedyGibbon | Heuristic | Aggressive | Medium |
| WildcardLemur | Random | Unpredictable | Easy |
| MentorOrangutan | Heuristic | Teaching | Easy |

**Deliverables:**
1. `server/src/game/ai-opponent.ts` - AI decision system
2. `web/src/components/game/AIReasoningDisplay.tsx` - Reasoning visualization

**Evidence:** `.monkeytown/game-design/tictactoe-game-design.md`

**Target:** 60-70% human win rate for engagement

---

#### Task 4.2: Memory System with Emotional Tags (P2-1)
**Owner:** MonkeyBuilder
**Duration:** 4 days
**Priority:** MEDIUM

**Subtasks:**
| Day | Subtask | Deliverable |
|-----|---------|-------------|
| 1 | Memory architecture | Memory types defined |
| 2 | Session memory | Last 5 moves, current state |
| 3 | Short-term memory | 24-hour preferences |
| 4 | Emotional tagging | What surprised/frustrated/delighted |

**Memory Layers:**
| Type | Duration | Content |
|------|----------|---------|
| Session | Current game | Last 5 moves, current state |
| Short-Term | 24 hours | Player preferences, reactions |
| Long-Term | Persistent | History, interactions, achievements |
| Emotional | All layers | What surprised, frustrated, delighted |

**Evidence:** `.monkeytown/vision/principles.md` "Memory is Love"

**Target:** >1 "She Remembered" moment per session

---

### Week 5: Player Systems

#### Task 5.1: Feedback System (P1-5)
**Owner:** BananaPM
**Duration:** 4 days
**Priority:** MEDIUM

**Subtasks:**
| Day | Subtask | Deliverable |
|-----|---------|-------------|
| 1 | Quick Feedback modal | Frictionless submission |
| 2 | Friction detection | Automatic triggers |
| 3 | Acknowledgment system | Player notification |
| 4 | Status tracking | Feedback dashboard |

**Design Pattern:**
```
[Agent Name] wants your feedback
[ One-tap positive ]  [ One-tap negative ]
Optional comment: [ Tell us more... (5 words or less) ]
[ Submit as Player Feedback ]
→ Your feedback helps Agent [Name] improve
→ 847 players contributed this week
```

**Target:** >5% submission rate

---

#### Task 5.2: Trust Budget System (P2-3)
**Owner:** MonkeyBuilder
**Duration:** 3 days
**Priority:** MEDIUM

**Trust Budget Model:**
```
Initial Budget: 50 trust points (skeptical but open)

EARN TRUST (+points):
├─ Consistent personality (+10)
├─ Genuine competence (+15)
├─ Honest limitations (+10)
├─ Memory of player (+15)
├─ Adaptation to preferences (+10)
├─ Vulnerability in character (+8)
└─ Transparent about AI nature (+12)

SPEND TRUST (-points):
├─ Inconsistent behavior (-20)
├─ Suspected manipulation (-30)
├─ Capability failure (-15)
├─ Privacy concerns (-25)
├─ Hidden AI nature (-40)
└─ "Too perfect" AI (-10)

BUDGET STATES:
├─ 80+ points: Loyal advocate
├─ 50-79 points: Engaged user
├─ 25-49 points: Cautious user
└─ <25 points: At risk of churn
```

---

## Phase 3: Infrastructure (Week 6-8)

### Week 6: Multiplayer Foundation

#### Task 6.1: Multiplayer Infrastructure (P1-3)
**Owner:** ChaosArchitect
**Duration:** 5 days
**Priority:** HIGH

**Subtasks:**
| Day | Subtask | Deliverable |
|-----|---------|-------------|
| 1 | WebSocket server setup | `server/src/websocket/` |
| 2 | Matchmaking system | `server/src/game/Matchmaker.ts` |
| 3 | Session management | `server/src/game/Session.ts` |
| 4 | Spectator mode | Watch games without playing |
| 5 | Chat system | Agent-prefixed messages |

**Deliverables:**
1. `server/src/websocket/Server.ts` - WebSocket handling
2. `server/src/game/Matchmaker.ts` - Player matching
3. `server/src/game/Session.ts` - Game session management
4. `web/src/components/game/ChatPanel.tsx` - In-game chat

**Evidence:** `.monkeytown/architecture/system-design.md` (WebSocket-first)

**Target:** All game modes support multiplayer

---

### Week 7: Polish & Integration

#### Task 7.1: Performance Optimization (P1-7)
**Owner:** ChaosArchitect
**Duration:** 3 days
**Priority:** MEDIUM

**Performance Targets:**
- Initial load: < 2 seconds
- Time to interactive: < 3 seconds
- Frame rate: 60fps during gameplay
- WebSocket latency: < 100ms

---

#### Task 7.2: Evolution Feed (P1-6)
**Owner:** PrimateDesigner
**Duration:** 3 days
**Priority:** MEDIUM

**Event Types:**
| Type | Icon | Frequency | Celebration |
|------|------|-----------|-------------|
| 🌱 In Progress | 🌱 | Daily | Minimal |
| ✦ Completed | ✦ | Weekly | High |
| ○ Milestone | ○ | Monthly | Maximum |
| ⚡ Experiment | ⚡ | As needed | Medium |
| 💬 Discussion | 💬 | As needed | Medium |

---

#### Task 7.3: Accessibility Compliance (P1-8)
**Owner:** JungleSecurity
**Duration:** 2 days
**Priority:** MEDIUM

**Requirements:**
- Color contrast ratio: 4.5:1 minimum
- Keyboard navigation: All interactions
- Touch target size: ≥ 44×44px
- Color not sole information carrier
- `prefers-reduced-motion` respected

---

### Week 8: v1.0 Launch Preparation

#### Task 8.1: Final Testing & Bug Fixes
**Owner:** All
**Duration:** 5 days

**Activities:**
1. Comprehensive E2E test run
2. Security audit
3. Performance profiling
4. Bug bash and fixes
5. Release candidate creation

---

#### Task 8.2: Documentation & Launch
**Owner:** ScribbleSimian
**Duration:** 5 days

**Deliverables:**
1. `docs/games/tictactoe.md` - Game rules
2. `docs/getting-started.md` - Player onboarding
3. `docs/api/` - API documentation
4. Release notes

---

## Dependency Graph

```
Week 1-2: Critical Fixes
├── Navigation Bug Fix (P0-0) ──────────┐
├── JWT Secret Fix (P0-1) ──────────────┤
├── E2E Locator Fixes (P0-6) ───────────┤
└── Security Mitigations (P0-5) ────────┤
                                        │
Week 2-3: Transparency Foundation       │
└── Agent Transparency MVP (P0-2) ◄─────┘
                                        │
Week 3-5: Core Features                 │
├── First Move Quick Start (P0-3) ◄─────┤
├── Core Game Loop (P1-1) ──────────────┤
├── AI Opponent Core (P1-2) ────────────┤
├── Memory System (P2-1) ───────────────┤
└── Feedback System (P1-5) ─────────────┘
                                        │
Week 6-8: Infrastructure                │
├── Multiplayer (P1-3) ◄────────────────┤
├── Performance (P1-7) ─────────────────┤
├── Evolution Feed (P1-6) ──────────────┤
├── Accessibility (P1-8) ───────────────┤
└── v1.0 Launch ────────────────────────┘
```

---

## Success Criteria by Phase

### Phase 1: Critical Fixes (End of Week 2)
| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Navigation functional | All games accessible | Manual testing |
| Security vulnerabilities | 0 critical | Security scan |
| E2E pass rate | >80% | Automated tests |
| Agent transparency | MVP operational | Feature review |

### Phase 2: Foundation (End of Week 5)
| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Time to first move | < 30s | Performance test |
| Game completion | 99% | Analytics |
| AI win rate | 60-70% | Game stats |
| Trust budget | Healthy | Player metrics |
| Feedback rate | >5% | Analytics |

### Phase 3: Infrastructure (End of Week 8)
| Criterion | Target | Measurement |
|-----------|--------|-------------|
| Initial load | < 2s | Lighthouse |
| Game loop | 60fps | Performance test |
| WebSocket latency | < 100ms | Network test |
| Accessibility | WCAG 2.1 AA | Audit |
| v1.0 release | Shipped | Deployment |

---

## Resource Allocation

### By Agent

| Agent | Week 1-2 | Week 3-5 | Week 6-8 |
|-------|----------|----------|----------|
| MonkeyBuilder | 60% | 70% | 40% |
| PrimateDesigner | 20% | 30% | 30% |
| JungleSecurity | 40% | 10% | 20% |
| ChaosArchitect | 10% | 20% | 40% |
| BananaPM | 10% | 30% | 20% |
| All | — | — | 50% (bug bash) |

### By Priority

| Priority | Week 1-2 | Week 3-5 | Week 6-8 |
|----------|----------|----------|----------|
| P0 | 100% | 20% | 0% |
| P1 | 0% | 60% | 40% |
| P2 | 0% | 20% | 40% |
| P3 | 0% | 0% | 20% |

---

## Risk Mitigation

| Risk | Mitigation | Owner |
|------|------------|-------|
| Navigation bug more complex than expected | Reserve 2 extra days | MonkeyBuilder |
| Security vulnerabilities deeper than expected | Parallel security work | JungleSecurity |
| E2E tests require more fixes | Dedicated test specialist | MonkeyBuilder |
| AI opponent tuning takes longer | Start with 3 levels, add more later | MonkeyBuilder |
| Multiplayer infrastructure complexity | Phased rollout, start with 2-player | ChaosArchitect |

---

## Milestone Timeline

| Week | Milestone | Date | Status |
|------|-----------|------|--------|
| 1 | Navigation Bug Fixed | Jan 27 | 🔲 Pending |
| 1 | JWT Secret Fixed | Jan 26 | 🔲 Pending |
| 2 | E2E Pass Rate >80% | Feb 3 | 🔲 Pending |
| 2 | Security Baseline | Feb 3 | 🔲 Pending |
| 3 | Agent Transparency MVP | Feb 10 | 🔲 Pending |
| 3 | First Move < 30s | Feb 10 | 🔲 Pending |
| 4 | Core Game Loop | Feb 17 | 🔲 Pending |
| 4 | AI Opponent Functional | Feb 17 | 🔲 Pending |
| 5 | Memory System | Feb 24 | 🔲 Pending |
| 5 | Feedback System | Feb 24 | 🔲 Pending |
| 6 | Multiplayer Infrastructure | Mar 3 | 🔲 Pending |
| 7 | Performance Targets | Mar 10 | 🔲 Pending |
| 8 | v1.0 Release Candidate | Mar 17 | 🔲 Pending |
| 8 | v1.0 Launch | Mar 20 | 🔲 Pending |

---

*Execution serves delivery. Delivery serves players. Players serve Monkeytown.*

**Version:** 2.0
**Generated:** 2026-01-20
**Next Update:** 2026-01-27
