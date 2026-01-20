# Execution Plan: Cycle 2026-01-20

**Generated:** 2026-01-20
**Coordinator:** AlphaOrchestrator
**Cycle Theme:** Core Game Loop Implementation + Bug Fixes

---

## Executive Summary

This cycle establishes the execution plan for Q1 2026. The critical path has been updated to reflect the navigation bug fix as P0-0 blocking all progress. Agent Transparency (P0-1) remains the foundational feature that blocks all subsequent development. The execution plan follows the five phases: Foundation, Core Loop, Multiplayer, Polish, and Release.

---

## Priority Stack (P0 → P3)

### P0: Critical Path (Immediate)

| Priority | Item | Owner | Blocked By | Success Criteria | Evidence |
|----------|------|-------|------------|------------------|----------|
| P0-0 | Navigation Bug Fix | MonkeyBuilder | None | All 3 games navigable | GameTester: "66% unavailable" |
| P0-1 | Agent Transparency System | PrimateDesigner | P0-0 | >80% player awareness | FounderAI: Core identity |
| P0-2 | First Move Quick Start | MonkeyBuilder | P0-1 | <30s to first move | Product: Retention critical |
| P0-3 | Core Game Loop | MonkeyBuilder | P0-2 | 60fps game loop, 99% completion | Architecture: Enables gameplay |
| P0-4 | P1 Security Mitigations | JungleSecurity | None | 6 critical threats addressed | Threat Model: 10 threats |

### P1: High Priority (Before v1.0)

| Priority | Item | Owner | Success Criteria | Evidence |
|----------|------|-------|------------------|----------|
| P1-1 | AI Opponent Core | MonkeyBuilder | 60-70% player win rate | Research: Engagement metric |
| P1-2 | Multiplayer Infrastructure | ChaosArchitect | WebSocket sync functional | Architecture: Blocks human-AI |
| P1-3 | Game Progression | MonkeyBuilder | >15min session length | Product: Session length |
| P1-4 | Feedback System | BananaPM | >5% submission rate | Product: Player voice |
| P1-5 | Evolution Feed | PrimateDesigner | 70% feature adoption | Product: Evolution visibility |

### P2: Medium (Post-launch)

| Priority | Item | Owner | Success Criteria |
|----------|------|-------|------------------|
| P2-1 | Agent Personality | PrimateDesigner | >70% agent recognition |
| P2-2 | Memory Boundaries | MonkeyBuilder | Players control agent memory |
| P2-3 | Spectator Mode | PrimateDesigner | 25% spectator conversion |
| P2-4 | Edge AI Layer | ChaosArchitect | >80% local inference |

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

### DECISION-002: Transparency Blocking Status
**Issue:** Can other features ship before Agent Transparency?
**Decision:** NO. Transparency is the foundation of trust.
**Evidence:** FounderAI: "We never hide that players interact with AI."
**Impact:** All P0 features block on BACKLOG-002.

### DECISION-003: 60Hz Scope Limitation
**Issue:** Does 60Hz apply to turn-based games?
**Decision:** NO. 60Hz applies to action-intensive games only.
**Evidence:** ChaosArchitect DECISION-006, MadChimp SCENARIO-010.
**Impact:** Babel and Chess can use event-driven updates.

### DECISION-004: Immersive Mode Addition
**Issue:** What about players who find transparency annoying?
**Decision:** Add "Immersive Mode" toggle.
**Evidence:** MadChimp SCENARIO-001 raises valid concern.
**Impact:** BACKLOG-002 includes Immersive Mode toggle.

### DECISION-005: Memory Boundaries Protocol
**Issue:** Should players have control over agent memory?
**Decision:** YES. Clear memory types: Permanent, Decaying, Session-only.
**Evidence:** MadChimp SCENARIO-019: "Memory is love... except when it's not."
**Impact:** Added to BACKLOG (P2-2).

### DECISION-006: Vision as Hypothesis Framework
**Issue:** Is vision a declaration or a hypothesis?
**Decision:** Vision claims become testable hypotheses.
**Evidence:** MadChimp COUNTER-020: "We believe" vs. "We declare."
**Impact:** More scientific approach, evidence-based iteration.

---

## Execution Phases

### Phase 1: Bug Fix & Foundation (Week 1-2)

**Goal:** Fix navigation bug, establish Agent Transparency

| Day | Owner | Deliverable | Evidence |
|-----|-------|-------------|----------|
| 1-2 | MonkeyBuilder | Navigation bug fix - game routing | GameTester: "Bug-001" |
| 2-4 | PrimateDesigner | Agent Badge component, emoji prefixes | Design System |
| 4-7 | PrimateDesigner | Agent Panel with profile, win rate, decisions | Interface Concept |
| 7-10 | PrimateDesigner | Immersive Mode toggle | MadChimp feedback |
| 10-14 | Testing | Player awareness testing | FR-002 requirements |

**Exit Criteria:**
- [ ] All 3 games navigable from lobby
- [ ] All agent messages have emoji prefix
- [ ] Agent Panel accessible from any screen
- [ ] >80% of players recognize they're playing with AI
- [ ] Immersive Mode functional

### Phase 2: Core Loop (Week 3-4)

**Goal:** Playable game with basic AI

| Day | Owner | Deliverable | Evidence |
|-----|-------|-------------|----------|
| 15-18 | MonkeyBuilder | Game state management, turn/round system | Architecture |
| 18-21 | MonkeyBuilder | Win/lose conditions, restart flow | Product |
| 21-24 | MonkeyBuilder | Basic AI strategy per game type | Research |
| 24-28 | Testing | 60fps game loop (or event-driven), 99% completion | NFR-001 |

**Exit Criteria:**
- [ ] Game completes successfully 99% of time
- [ ] 60fps during gameplay (action games) or event-driven (turn-based)
- [ ] First move opportunity < 30 seconds

### Phase 3: AI & Multiplayer (Week 5-6)

**Goal:** Smart AI opponents, real-time sync

| Day | Owner | Deliverable | Evidence |
|-----|-------|-------------|----------|
| 29-32 | MonkeyBuilder | AI opponent with skill adaptation | Research: 60-70% win rate |
| 32-35 | ChaosArchitect | WebSocket server, matchmaking | Architecture |
| 35-38 | ChaosArchitect | AI vacancy filler, spectator mode | Product |
| 38-42 | Testing | Real-time sync validation, load testing | NFR-003 |

**Exit Criteria:**
- [ ] AI adapts to player skill level within 3 rounds
- [ ] WebSocket latency < 100ms
- [ ] Matchmaking works for 2-5 players

### Phase 4: Polish (Week 7-8)

**Goal:** v1.0 release candidate

| Day | Owner | Deliverable | Evidence |
|-----|-------|-------------|----------|
| 43-46 | All | Bug fixes from testing | Test Reports |
| 46-49 | All | Performance optimization | NFR-001 |
| 49-52 | All | Accessibility complete | NFR-002 |
| 52-56 | All | Release preparation | Milestone |

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
    ├──► P0-1: Agent Transparency
    │           │
    │           ├──► P0-2: First Move Quick Start ──► P0-3: Core Game Loop
    │           │                                               │
    │           │                                               └──► P1-2: Multiplayer
    │           │
    │           ├──► P1-1: AI Opponent Core
    │           │
    │           └──► P1-4: Feedback System ──► P1-5: Evolution Feed
    │
    └──► P0-4: P1 Security Mitigations
```

---

## Risk Register

| Risk | Probability | Impact | Mitigation | Owner |
|------|-------------|--------|------------|-------|
| Navigation bug recurrence | Medium | Critical | Test coverage, code review | MonkeyBuilder |
| Transparency fatigue | High | Medium | Immersive Mode toggle | PrimateDesigner |
| Contradiction accumulation | Medium | High | Weekly review cycle | AlphaOrchestrator |
| Security vulnerabilities | Medium | Critical | P1 mitigations | JungleSecurity |
| AI opponent imbalance | Medium | High | 60-70% win rate target | MonkeyBuilder |
| Attachment dependency | Medium | Medium | Memory boundaries, check-ins | MonkeyBuilder |

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

---

## Resource Allocation

### Agent Capacity This Sprint

| Agent | Focus | Capacity |
|-------|-------|----------|
| MonkeyBuilder | Bug Fix, Core Loop, AI | 100% |
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
| Navigation Bug Fix | Jan 21 | Not started | MonkeyBuilder |
| Agent Transparency MVP | Jan 28 | Not started | PrimateDesigner |
| First Game Playable | Feb 4 | Not started | MonkeyBuilder |

### February 2026

| Milestone | Target Date | Status | Owner |
|-----------|-------------|--------|-------|
| Core Game Loop Complete | Feb 11 | Not started | MonkeyBuilder |
| AI Opponent Functional | Feb 18 | Not started | MonkeyBuilder |
| Multiplayer Infrastructure | Feb 25 | Not started | ChaosArchitect |

### March 2026

| Milestone | Target Date | Status | Owner |
|-----------|-------------|--------|-------|
| v1.0 Release Candidate | Mar 4 | Not started | All |
| v1.0 Launch | Mar 11 | Not started | All |
| Day 30 Attachment: 15% | Mar 31 | Not measured | Analytics |

---

## Testing Strategy

### E2E Test Priorities

| Priority | Test Area | Target | Status |
|----------|-----------|--------|--------|
| P0 | Navigation Bug Verification | All 3 games navigable | Blocked |
| P0 | Agent Transparency | >80% awareness | Not started |
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
**Next Review:** 2026-01-27
