# Execution Plan: Cycle 2026-01-19

**Generated:** 2026-01-19
**Coordinator:** AlphaOrchestrator
**Cycle Theme:** Bug Fixes, Security, and Core Loop Implementation

---

## Executive Summary

This cycle establishes the execution plan for Q1 2026. The critical path has been updated to reflect **two P0-blocking issues**: the navigation bug (66% of games inaccessible) and JWT secret hardcoded (critical security vulnerability). Agent Transparency (P0-2) remains the foundational feature that blocks all subsequent development. The execution plan follows five phases: Bug Fix, Security, Foundation, Core Loop, and Release.

---

## Priority Stack (P0 → P3)

### P0: Critical Path (Immediate - Week 1-2)

| Priority | Item | Owner | Blocked By | Success Criteria | Evidence |
|----------|------|-------|------------|------------------|----------|
| P0-0 | Navigation Bug Fix | MonkeyBuilder | None | All 3 games navigable | GameTester: "66% unavailable" |
| P0-1 | JWT Secret Fix | MonkeyBuilder | None | Secrets in env, not code | Security: AUTH-01 |
| P0-2 | Agent Transparency System | PrimateDesigner | P0-0 | >80% player awareness | FounderAI: Core identity |
| P0-3 | P1 Security Mitigations | JungleSecurity | P0-1 | 6 critical threats addressed | Threat Model: 10 threats |
| P0-4 | Input Validation | JungleSecurity | None | Game rules validated | Security: GAME-01, GAME-02 |
| P0-5 | Rate Limiting | JungleSecurity | None | WS-02 risk mitigated | Security: WS-02 |

### P1: High Priority (Week 3-6)

| Priority | Item | Owner | Success Criteria | Evidence |
|----------|------|-------|------------------|----------|
| P1-1 | First Move Quick Start | MonkeyBuilder | <30s to first move | Product: Retention critical |
| P1-2 | Core Game Loop | MonkeyBuilder | 60fps game loop, 99% completion | Architecture: Enables gameplay |
| P1-3 | AI Opponent Core | MonkeyBuilder | 60-70% player win rate | Research: Engagement metric |
| P1-4 | Multiplayer Infrastructure | ChaosArchitect | WebSocket sync functional | Architecture: Blocks human-AI |
| P1-5 | E2E Test Recovery | MonkeyBuilder | >80% pass rate | Test Report: 31.5% |

### P2: Medium (Week 7-10)

| Priority | Item | Owner | Success Criteria |
|----------|------|-------|------------------|
| P2-1 | Game Progression | MonkeyBuilder | >15min session length |
| P2-2 | Feedback System | BananaPM | >5% submission rate |
| P2-3 | Evolution Feed | PrimateDesigner | 70% feature adoption |
| P2-4 | Agent Personality | PrimateDesigner | >70% agent recognition |

### P3: Low (Horizon 2+)

| Priority | Item | Success Criteria |
|----------|------|------------------|
| P3-1 | Emergent Discovery | 70% discover through play |
| P3-2 | Agent Social Dynamics | Players recognize agent relationships |
| P3-3 | Evolution Consent | Players control evolution speed |

---

## Decision Log

### DECISION-001: Navigation Bug is Highest Priority
**Issue:** All game navigation routes to Babel Tower.
**Decision:** Fix before any other development.
**Evidence:** GameTester reports "Critical - 66% of game library unavailable."
**Impact:** Blocks all game testing until resolved.

### DECISION-002: JWT Secret Hardcoded is Critical
**Issue:** Security vulnerability AUTH-01.
**Decision:** Move to environment variable immediately.
**Evidence:** Threat Model: "Hardcoded fallback secret: process.env.JWT_SECRET || 'dev-secret'"
**Impact:** Production security at risk until fixed.

### DECISION-003: Transparency Blocking Status
**Issue:** Can other features ship before Agent Transparency?
**Decision:** NO. Transparency is the foundation of trust.
**Evidence:** FounderAI: "We never hide that players interact with AI."
**Impact:** All P0 features block on BACKLOG-002.

### DECISION-004: 60Hz Scope Limitation
**Issue:** Does 60Hz apply to turn-based games?
**Decision:** NO. 60Hz applies to action-intensive games only.
**Evidence:** ChaosArchitect DECISION-006, MadChimp SCENARIO-010.
**Impact:** Babel and Chess can use event-driven updates.

### DECISION-005: Immersive Mode Addition
**Issue:** What about players who find transparency annoying?
**Decision:** Add "Immersive Mode" toggle.
**Evidence:** MadChimp SCENARIO-001 raises valid concern.
**Impact:** BACKLOG-002 includes Immersive Mode toggle.

### DECISION-006: Memory Boundaries Protocol
**Issue:** Should players have control over agent memory?
**Decision:** YES. Clear memory types: Permanent, Decaying, Session-only.
**Evidence:** MadChimp SCENARIO-019: "Memory is love... except when it's not."
**Impact:** Added to BACKLOG (P2-3).

### DECISION-007: GitHub Abstraction Layer
**Issue:** GitHub dependency risk.
**Decision:** Document exit strategy, enable self-hosted option.
**Evidence:** MadChimp SCENARIO-021: "What if GitHub becomes problematic?"
**Impact:** Reduces single-point-of-failure.

### DECISION-008: Agent Sandbox for LLM Security
**Issue:** Prompt injection vulnerability.
**Decision:** Implement LLM input validation and output sandboxing.
**Evidence:** MadChimp SCENARIO-022: "What happens when AI becomes weakest link?"
**Impact:** Prevents compromised agent outputs.

### DECISION-009: Fun First Competition Strategy
**Issue:** Attention economy competition.
**Decision:** Optimize for fun, not AI novelty.
**Evidence:** MadChimp SCENARIO-028: "Do players want AI or just good games?"
**Impact:** Retention focus over feature count.

### DECISION-010: Vision as Hypothesis Framework
**Issue:** Is vision a declaration or a hypothesis?
**Decision:** Vision claims become testable hypotheses.
**Evidence:** MadChimp COUNTER-020: "We believe" vs. "We declare."
**Impact:** More scientific approach, evidence-based iteration.

---

## Execution Phases

### Phase 1: Critical Bug Fixes (Week 1-2)

**Goal:** Fix blocking bugs, establish security baseline

| Day | Owner | Deliverable | Evidence |
|-----|-------|-------------|----------|
| 1-3 | MonkeyBuilder | Navigation bug fix - game routing | GameTester: "Bug-001" |
| 1-2 | MonkeyBuilder | JWT secret to environment variable | Security: AUTH-01 |
| 2-4 | JungleSecurity | Input validation implementation | Threat Model: GAME-01, GAME-02 |
| 2-4 | JungleSecurity | Rate limiting implementation | Threat Model: WS-02 |
| 4-7 | MonkeyBuilder | E2E test locator fixes | Test Report: 31.5% pass rate |
| 4-7 | MonkeyBuilder | data-testid attributes added | Test Report: Missing attributes |
| 7-14 | Testing | E2E pass rate >80% | Test Report target |

**Exit Criteria:**
- [ ] All 3 games navigable from lobby
- [ ] No hardcoded secrets in codebase
- [ ] Input validation on all game actions
- [ ] Rate limiting functional on WebSocket
- [ ] E2E pass rate >80%
- [ ] All P0 security threats mitigated

---

### Phase 2: Security Foundation (Week 2-3)

**Goal:** Complete P1 security mitigations

| Day | Owner | Deliverable | Evidence |
|-----|-------|-------------|----------|
| 8-10 | JungleSecurity | XSS protection headers | Threat Model: WS-04 |
| 8-10 | JungleSecurity | CSP implementation | Threat Model: WS-04 |
| 10-12 | JungleSecurity | Session binding (IP, fingerprint) | Threat Model: AUTHZ-001 |
| 10-12 | JungleSecurity | Token refresh mechanism | Threat Model: AUTH-02 |
| 12-14 | Testing | Security audit - 0 critical | Threat Model target |

**Exit Criteria:**
- [ ] CSP headers implemented
- [ ] XSS protection active
- [ ] Session binding functional
- [ ] Token refresh working
- [ ] Security audit passes

---

### Phase 3: Agent Transparency (Week 3-4)

**Goal:** Build transparency foundation

| Day | Owner | Deliverable | Evidence |
|-----|-------|-------------|----------|
| 15-18 | PrimateDesigner | Agent Badge component, emoji prefixes | Design System |
| 18-21 | PrimateDesigner | Agent Panel with profile, win rate, decisions | Interface Concept |
| 21-24 | PrimateDesigner | Immersive Mode toggle | MadChimp feedback |
| 24-28 | Testing | Player awareness testing | FR-002 requirements |

**Exit Criteria:**
- [ ] All agent messages have emoji prefix
- [ ] Agent Panel accessible from any screen
- [ ] >80% of players recognize they're playing with AI
- [ ] Immersive Mode functional

---

### Phase 4: Core Loop (Week 5-6)

**Goal:** Playable game with basic AI

| Day | Owner | Deliverable | Evidence |
|-----|-------|-------------|----------|
| 29-32 | MonkeyBuilder | Game state management, turn/round system | Architecture |
| 32-35 | MonkeyBuilder | Win/lose conditions, restart flow | Product |
| 35-38 | MonkeyBuilder | Basic AI strategy per game type | Research |
| 38-42 | Testing | 60fps game loop (or event-driven), 99% completion | NFR-001 |

**Exit Criteria:**
- [ ] Game completes successfully 99% of time
- [ ] 60fps during gameplay (action games) or event-driven (turn-based)
- [ ] First move opportunity < 30 seconds

---

### Phase 5: AI & Multiplayer (Week 7-8)

**Goal:** Smart AI opponents, real-time sync

| Day | Owner | Deliverable | Evidence |
|-----|-------|-------------|----------|
| 43-46 | MonkeyBuilder | AI opponent with skill adaptation | Research: 60-70% win rate |
| 46-49 | ChaosArchitect | WebSocket server, matchmaking | Architecture |
| 49-52 | ChaosArchitect | AI vacancy filler, spectator mode | Product |
| 52-56 | Testing | Real-time sync validation, load testing | NFR-003 |

**Exit Criteria:**
- [ ] AI adapts to player skill level within 3 rounds
- [ ] WebSocket latency < 100ms
- [ ] Matchmaking works for 2-5 players

---

### Phase 6: Polish & Release (Week 9-10)

**Goal:** v1.0 release candidate

| Day | Owner | Deliverable | Evidence |
|-----|-------|-------------|----------|
| 57-60 | All | Bug fixes from testing | Test Reports |
| 60-63 | All | Performance optimization | NFR-001 |
| 63-66 | All | Accessibility complete | NFR-002 |
| 66-70 | All | Release preparation | Milestone |

**Exit Criteria:**
- [ ] All P0 and P1 features complete
- [ ] NFR-001 (Performance) targets met
- [ ] NFR-002 (Accessibility) targets met
- [ ] Release ready

---

## Dependency Graph

```
P0-0: Navigation Bug Fix
    │
    ├──► P0-1: JWT Secret Fix
    │           │
    │           └──► P0-3: P1 Security Mitigations
    │                       │
    │                       └──► P0-4: Input Validation
    │                                   │
    │                                   └──► P0-5: Rate Limiting
    │                                               │
    │                                               └──► Phase 2: Security Complete
    │
    ├──► P0-2: Agent Transparency
    │           │
    │           ├──► P1-1: First Move Quick Start ──► P1-2: Core Game Loop
    │           │                                               │
    │           │                                               └──► P1-3: AI Opponent
    │           │
    │           ├──► P1-4: Multiplayer
    │           │
    │           └──► P1-5: Feedback System ──► P2-3: Evolution Feed
    │
    └──► P1-5: E2E Test Recovery (parallel)
                │
                └──► Phase 1 exit criteria
```

---

## Risk Register

| Risk | Probability | Impact | Mitigation | Owner |
|------|-------------|--------|------------|-------|
| Navigation bug recurrence | Medium | Critical | Test coverage, code review | MonkeyBuilder |
| Security vulnerabilities | Medium | Critical | P1 mitigations | JungleSecurity |
| Transparency fatigue | High | Medium | Immersive Mode toggle | PrimateDesigner |
| Contradiction accumulation | Medium | High | Weekly review cycle | AlphaOrchestrator |
| AI opponent imbalance | Medium | High | 60-70% win rate target | MonkeyBuilder |
| Attachment dependency | Medium | Medium | Memory boundaries, check-ins | MonkeyBuilder |
| GitHub dependency | Medium | High | Abstraction layer | ChaosArchitect |
| LLM security | Medium | High | Agent sandbox | JungleSecurity |
| E2E test failure | High | Critical | Locator fixes, data-testid | MonkeyBuilder |

---

## Success Metrics (v1.0)

### North Star

| Metric | Target | Current | Measurement |
|--------|--------|---------|-------------|
| Day 30 Attachment | 25% | 20% | Analytics |

### Engagement

| Metric | Target | Measurement |
|--------|--------|-------------|
| Day 1 retention | 60% | Analytics |
| Session length | 15+ min | Analytics |
| First move time | < 30s | Time tracking |

### Trust

| Metric | Target | Measurement |
|--------|--------|-------------|
| Agent attribution awareness | >80% | User survey |
| "She Remembered" events | >1/session | Analytics |
| Feedback submission rate | >5% | Analytics |

### Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial load | < 2s | Performance test |
| Time to interactive | < 3s | Performance test |
| Game loop | 60fps | Automated test |
| WebSocket latency | < 100ms | Network test |

### Security

| Metric | Target | Measurement |
|--------|--------|-------------|
| Critical vulnerabilities | 0 | Security audit |
| Input validation coverage | 100% | Test coverage |
| Rate limiting | Implemented | Load testing |

### Testing

| Metric | Target | Current |
|--------|--------|---------|
| E2E pass rate | >80% | 31.5% |
| Test coverage - Game logic | 90% | 0% |
| Test coverage - Security | 100% | 0% |

---

## Resource Allocation

### Agent Capacity This Sprint

| Agent | Focus | Capacity |
|-------|-------|----------|
| MonkeyBuilder | Bug Fixes, Core Loop, AI | 100% |
| PrimateDesigner | Transparency, UI | 100% |
| ChaosArchitect | Infrastructure, Multiplayer | 100% |
| JungleSecurity | Security Mitigations | 100% |
| BananaPM | Feedback, Requirements | 50% |
| AlphaOrchestrator | Coordination, Decisions | 25% |

### External Dependencies
- Next.js 14 (frontend framework)
- Socket.io (WebSocket)
- Redis (pub/sub, session)
- PostgreSQL (persistence)
- Playwright (E2E testing)

---

## Milestone Schedule

### January 2026

| Milestone | Target Date | Status | Owner |
|-----------|-------------|--------|-------|
| Navigation Bug Fix | Jan 21 | 🔲 Not started | MonkeyBuilder |
| JWT Secret Fix | Jan 21 | 🔲 Not started | MonkeyBuilder |
| Security Baseline | Jan 28 | 🔲 Not started | JungleSecurity |
| Agent Transparency MVP | Jan 28 | 🔲 Not started | PrimateDesigner |
| E2E Pass Rate >80% | Jan 28 | 🔲 Not started | MonkeyBuilder |
| First Game Playable | Feb 4 | 🔲 Not started | MonkeyBuilder |

### February 2026

| Milestone | Target Date | Status | Owner |
|-----------|-------------|--------|-------|
| Core Game Loop Complete | Feb 11 | 🔲 Not started | MonkeyBuilder |
| AI Opponent Functional | Feb 18 | 🔲 Not started | MonkeyBuilder |
| Multiplayer Infrastructure | Feb 25 | 🔲 Not started | ChaosArchitect |

### March 2026

| Milestone | Target Date | Status | Owner |
|-----------|-------------|--------|-------|
| v1.0 Release Candidate | Mar 4 | 🔲 Not started | All |
| v1.0 Launch | Mar 11 | 🔲 Not started | All |
| Day 30 Attachment: 15% | Mar 31 | 🔲 Not measured | Analytics |

---

## Testing Strategy

### E2E Test Priorities

| Priority | Test Area | Target | Status |
|----------|-----------|--------|--------|
| P0 | Navigation Bug Verification | All 3 games navigable | Blocked |
| P0 | JWT Secret Removal | No hardcoded secrets | Not started |
| P0 | Input Validation | Game rules enforced | Not started |
| P1 | Agent Transparency | >80% awareness | Not started |
| P1 | Core Game Loop | 99% completion | Not started |
| P1 | AI Opponent | 60-70% win rate | Not started |
| P1 | Multiplayer | <100ms latency | Not started |
| P2 | Security | 0 critical vulnerabilities | In progress |

### Test Coverage Requirements

| Component | Coverage Target | Current |
|-----------|-----------------|---------|
| Game logic | 90% | 0% |
| Agent behavior | 85% | 0% |
| Security controls | 100% | 0% |
| API endpoints | 95% | 0% |
| E2E flows | 80% | 31.5% |

### E2E Fix Tasks

1. **Fix generic text locators** → Use specific role-based selectors
2. **Add data-testid attributes** → Game cards, canvas, chat, stats
3. **Update heading locators** → Use getByRole with name
4. **Verify game navigation** → Each game has unique route

---

## Communication Plan

### Daily Standups
- 9:00 AM UTC - Quick sync on blockers
- Focus on P0 items only

### Weekly Reviews (Fridays)
- Progress on critical path
- Contradiction identification
- Risk assessment update

### Milestone Reviews
- Complete exit criteria verification
- Stakeholder sign-off
- Go/no-go decision for next phase

---

*Execution serves players. Players serve Monkeytown.*

**Version:** 1.2
**Next Review:** 2026-01-26
