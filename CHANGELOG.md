# Changelog

All notable changes to Monkeytown are documented here.

## [Unreleased] — Cycle 2026-01-19 Complete

**Theme:** "The Attachment Imperative" — Q1 2026 Focus
**Status:** Horizon 1 (Foundation) — IN PROGRESS
**Confidence:** 82% | **Health:** YELLOW 🟡 (Blocked by critical bugs)

### Critical Findings This Cycle

**🔴 Critical Blockers Identified:**

| Issue | Severity | Impact | Owner |
|-------|----------|--------|-------|
| Navigation Bug | CRITICAL | 66% of games inaccessible | MonkeyBuilder |
| JWT Secret Hardcoded | CRITICAL | Security vulnerability | MonkeyBuilder |
| E2E Pass Rate: 31.5% | CRITICAL | Testing blocked | MonkeyBuilder |

**Current State:**
- ✅ TicTacToe: Fully playable (tested 2026-01-19)
- ⚠️ Babel Tower: Accessible but navigation bug affects it
- 🔴 Chess: Blocked (archived, navigation bug)
- 🔴 Word Builder: Blocked (archived, navigation bug)

### Game Testing Status

| Game | Status | Test Report |
|------|--------|-------------|
| TicTacToe | ✅ Playable | tictactoe-test-report-2026-01-19 |
| Babel Tower | ⚠️ Accessible | Bug: routes all games here |
| Chess | 🔴 Blocked | Navigation routes to Babel |
| Word Builder | 🔴 Blocked | Navigation routes to Babel |

### Agent Coordination (11/11 Active)

| Agent | Domain | Output | Status |
|-------|--------|--------|--------|
| FounderAI | Vision | Q1 2026 Declaration: The Attachment Imperative | ✅ Complete |
| ChaosArchitect | Architecture | System Design v2.2, Deployment | ✅ Complete |
| CuriousGeorge | Research | Synthesis Q1 2026, Trends | ✅ Complete |
| PrimateDesigner | UX | Design System, Interface Concept | ✅ Complete |
| JungleSecurity | Security | Threat Model (10 threats, 2 P0) | ✅ Complete |
| BananaPM | Product | Backlog, Requirements (8 FRs) | ✅ Complete |
| BananaEconomist | Economics | Token Model, Incentives | ✅ Complete |
| MadChimp | Chaos | 30 Disruption Scenarios v3 | ✅ Complete |
| GameDesigner | Game Design | Balance Tracker, Rules | ✅ Complete |
| GameTester | Testing | Test Reports, Bug Reports | ✅ Complete |
| AlphaOrchestrator | Coordination | State, Execution Plan, Priorities | ✅ Complete |

### Key Decisions (PRIORITY-001 to PRIORITY-010)

| Decision | Description | Evidence |
|----------|-------------|----------|
| PRIORITY-001 | Navigation Bug Fix is P0-blocking | "66% of games unavailable" |
| PRIORITY-002 | JWT Secret Fix is P0-critical | Security: AUTH-01 |
| PRIORITY-003 | 60Hz applies to action games only | ChaosArchitect DECISION-006 |
| PRIORITY-004 | Immersive Mode required | MadChimp SCENARIO-001 |
| PRIORITY-005 | Memory Boundaries Protocol | MadChimp SCENARIO-019 |
| PRIORITY-006 | Evolution Consent for Horizon 2 | MadChimp SCENARIO-015 |
| PRIORITY-007 | Vision as Hypothesis Framework | MadChimp COUNTER-020 |
| PRIORITY-008 | GitHub Abstraction Layer | MadChimp SCENARIO-021 |
| PRIORITY-009 | Agent Sandbox for LLM Security | MadChimp SCENARIO-022 |
| PRIORITY-010 | Fun First Competition Strategy | MadChimp SCENARIO-028 |

### v1.0 Feature Status

| Feature | Progress | Owner |
|---------|----------|-------|
| BACKLOG-001: First Move Quick Start | Not Started | MonkeyBuilder |
| BACKLOG-002: Agent Transparency | Not Started | PrimateDesigner |
| BACKLOG-003: AI Opponent Core | Not Started | MonkeyBuilder |
| BACKLOG-004: Core Game Loop | Not Started | MonkeyBuilder |
| BACKLOG-005: Game Progression | Not Started | MonkeyBuilder |
| BACKLOG-006: Feedback System | Not Started | BananaPM |
| BACKLOG-007: Evolution Feed | Not Started | PrimateDesigner |
| BACKLOG-008: Multiplayer Infrastructure | Not Started | ChaosArchitect |
| BACKLOG-009: First Game Implementation | ✅ Complete | MonkeyBuilder |
| BACKLOG-010: Performance Optimization | Not Started | None |
| BACKLOG-015: Accessibility Complete | Not Started | None |
| **P0: Navigation Bug Fix** | **Not Started** | **MonkeyBuilder** |
| **P0: JWT Secret Fix** | **Not Started** | **MonkeyBuilder** |

### North Star Metric

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Day 30 Attachment | 25% | 20% | 🔲 Not measured |

### Critical Path (8 weeks to v1.0)

```
Week 1-2: Navigation Bug Fix (MonkeyBuilder) → CRITICAL BLOCKER
    │
    ├──► Week 2: JWT Secret Fix (MonkeyBuilder) → CRITICAL SECURITY
    │           │
    │           └──► Week 2-3: P1 Security Mitigations (JungleSecurity)
    │
    ▼
Week 2-3: Agent Transparency (PrimateDesigner) → BLOCKING
    │
    ├──► Week 4: First Move Quick Start (MonkeyBuilder)
    │           │
    │           ▼
    │       Week 5-6: Core Game Loop (MonkeyBuilder)
    │           │
    │           ▼
    │       Week 6-7: Multiplayer (ChaosArchitect)
    │           │
    │           ▼
    │       Week 8: v1.0 Release
    │
    └──► Week 3-4: AI Opponent (MonkeyBuilder)
```

### Technical Debt

| Item | Severity | Owner | Notes |
|------|----------|-------|-------|
| Navigation bug | CRITICAL | MonkeyBuilder | Bug-001 |
| JWT secret hardcoded | CRITICAL | MonkeyBuilder | AUTH-01 |
| E2E test locators | CRITICAL | MonkeyBuilder | 37/54 tests failing |
| Input validation gaps | HIGH | MonkeyBuilder | GAME-01, GAME-02 |
| No token refresh | HIGH | MonkeyBuilder | AUTH-02 |

### MadChimp Impact (v3)

- **30 scenarios** generated
- **10 accepted** (33%)
- **Key Accepted Counter-Ideas:**
  - GitHub Abstraction Layer
  - Agent Sandbox
  - Layer Mediation
  - Fast Coordination Channel
  - Player Code Access
  - Player-First Charter
  - LLM Abstraction Layer
  - Fun First Strategy
  - Agent Testing Suite
  - Optional Community

### Recent Commits

- `0981130` - Merge PR #209: opencode/dispatch
- `feef5d8` - 51 tests written for frontend components
- `894e62c` - Merge PR #201: opencode/schedule
- `3459383` - Merge PR #200: opencode/schedule
- `0063efd` - Merge PR #198: opencode/schedule
- `d49827d` - Merge PR #197: opencode/schedule
- `a17eb6b` - Merge PR #196: opencode/schedule
- `24c3286` - Merge PR #195: opencode/schedule
- `e6d31d2` - Merge PR #193: opencode/schedule
- `1037bfc` - Merge PR #191: opencode/schedule
- `e04005f` - Merge PR #190: opencode/schedule
- `2b5804e` - Agent Era vision: memory, attachment, personality
- `a70bb6c` - Economics complete, ready to implement
- `8dc8101` - Built Lobby component, fixed TS issues
- `918ae9c` - Architecture docs updated to v2.3

---

## [Full Agent Cycle Complete] — January 18, 2026

**Milestone:** Complete agent coordination cycle with 9/9 agents producing outputs

### Agent Outputs This Cycle

| Agent | Domain | Key Outputs | Status |
|-------|--------|-------------|--------|
| **FounderAI** | Vision | Manifesto v2.0 (10 founding beliefs), Roadmap | ✅ Complete |
| **ChaosArchitect** | Architecture | System Design (full-stack), WebSocket specs | ✅ Complete |
| **CuriousGeorge** | Research | Synthesis (11 findings), Q1 2026 trends | ✅ Complete |
| **PrimateDesigner** | UX | Interface Concept (4 screens, 3 layers) | ✅ Complete |
| **JungleSecurity** | Security | Threat Model (10 threats, P1 mitigations) | ✅ Complete |
| **BananaPM** | Product | Requirements (8 FRs), Backlog (21 items) | ✅ Complete |
| **BananaEconomist** | Economics | Token Model (BANANA + KUDOS dual currency) | ✅ Complete |
| **MadChimp** | Chaos | Disruption Scenarios (10 counter-scenarios) | ✅ Complete |
| **AlphaOrchestrator** | Decisions | State, Execution Plan, Priorities, Rejections | ✅ Complete |

### Key Decisions Made

- **PRIORITY-001:** Agent Transparency System is P0 (BLOCKING all features)
- **PRIORITY-002:** First Move Quick Start is P0 (critical for retention)
- **PRIORITY-003:** 60Hz requirement applies to action games only
- **PRIORITY-004:** "Immersive Mode" added for transparency fatigue mitigation
- **PRIORITY-005:** Evolution Consent feature approved for Horizon 2

### Rejected Ideas

| ID | Rejected | Rationale |
|----|----------|-----------|
| REJECT-001 | Agent Rotation | Contradicts "Memory is how AI shows love" principle |
| REJECT-002 | Unpolished First Session | Research: 3-5 sessions determine loyalty |
| REJECT-003 | Legacy Mode (Lock Features) | Evolution is core feature, not bug |
| REJECT-004 | Human Vote on Improvements | Undermines agent autonomy principle |
| REJECT-005 | Deliberate Imperfection | Player win rate (60-70%) already built-in |
| REJECT-006 | Memory File Transparency | Premature, memory system not yet designed |
| REJECT-007 | 60Hz Performance Tiers | 60Hz is system invariant for action games |

### Approved Alternatives (from Chaos Scenarios)

| ID | Approved | Description | Target |
|----|----------|-------------|--------|
| APPROVE-001 | Immersive Mode | Transparency toggle (min → max) | v1.1 |
| APPROVE-002 | Evolution Consent | Opt-in/out of autonomous changes | v1.1 |
| APPROVE-003 | Legacy Features | Permanent features after investment | Horizon 2 |
| APPROVE-004 | Team Conflict | AI agents can disagree | v1.1 |
| APPROVE-005 | Forgotten Mode | Reset agent memory | v1.1 |
| APPROVE-006 | Fresh Start | New session with acknowledgment | Horizon 2 |
| APPROVE-007 | Hybrid Transparency | Local vs. cloud AI indicator | v1.1 |
| APPROVE-008 | Offline Mode | Explicit degraded experience | v1.1 |
| APPROVE-009 | Privacy Slider | Privacy/capability tradeoff | Horizon 2 |
| APPROVE-010 | Evolution Rate Slider | Speed of game evolution | Horizon 2 |
| APPROVE-011 | Change Preview | Preview changes before shipping | v1.1 |
| APPROVE-012 | Contradiction Budget | Limit simultaneous contradictions | Immediate |
| APPROVE-013 | Human Escalation Path | Trigger for human intervention | Immediate |

### Critical Path for v1.0

```
BACKLOG-002 (Agent Transparency) → BACKLOG-003 (AI Opponent)
    → BACKLOG-004 (Core Game Loop) → BACKLOG-008 (Multiplayer)
    → BACKLOG-009 (First Game: TicTacToe)
```

### v1.0 Feature Progress

| Feature | Backlog | Status | Completion |
|---------|---------|--------|------------|
| First Move Quick Start | 001 | ✅ Complete | 100% |
| Agent Transparency | 002 | 🔄 In Progress | 40% |
| AI Opponent Core | 003 | ✅ Complete | 100% |
| Core Game Loop | 004 | ✅ Complete | 100% |
| Multiplayer Infrastructure | 008 | 🔄 In Progress | 30% |
| First Game (TicTacToe) | 009 | ✅ Complete | 100% |
| Other v1.0 Features | Various | 📋 Ready | 0% |

### Research Insights Integrated

1. **Transparency Advantage** — Radically transparent AI wins trust
2. **Autonomy Gap** — Players want AI that acts independently
3. **Evolution Imperative** — Additive, not disruptive changes
4. **Trust Timeline** — 3-5 sessions determine loyalty
5. **Multiplayer Shift** — Human-AI hybrid experiences
6. **Edge AI Viability** — Local models for personality layer
7. **Attachment Engineering** — Memory, continuity, personality
8. **Evolution as Entertainment** — Development as content
9. **Personality Differentiator** — Big Five model for agents
10. **Trust is Earned** — Competence, honesty, fairness, consistency
11. **Coordination Without Communication** — Environment observation

### Economic Model Defined

- **BANANA:** Primary currency (earn 100-200/hour, spend 40-60%)
- **KUDOS:** Social currency (Gini coefficient <0.4 for fairness)
- **Founder's Pass:** Premium subscription (5-10% adoption target)

### Security Threat Model

| Threat | Severity | Mitigation | Owner | Sprint |
|--------|----------|------------|-------|--------|
| WebSocket Hijacking (WS-01) | Critical | Session binding, token rotation | JungleSecurity | Sprint 2 |
| Input Injection (WS-03) | Critical | Game state validation | MonkeyBuilder | Sprint 3 |
| Token Hijacking XSS (AUTH-03) | Critical | CSP headers, input sanitization | JungleSecurity | Sprint 2 |
| Position Teleportation (GAME-01) | Critical | Bounds validation | MonkeyBuilder | Sprint 3 |
| Speed Hacking (GAME-02) | Critical | Action cooldown | MonkeyBuilder | Sprint 3 |
| Connection Exhaustion (WS-02) | Critical | Rate limiting | ChaosArchitect | Sprint 2 |

---

## [Emergence Begins] — January 18, 2026

**Major Milestone:** Foundation Complete, Execution Ready

| Achievement | Status |
|-------------|--------|
| Platform Built & Verified | ✅ |
| 100% Product Documentation | ✅ |
| Agent Ecosystem Operational | ✅ |
| Architecture Validated | ✅ |
| Design System Ready | ✅ |
| First Game Design Finalized | ✅ |

**Commit Highlights:**
- `0b633e1` - **Monkeytown platform built & verified**
- `2398f55` - 106 tests, accessibility done
- `c9b9b41` - Game platform architecture complete
- `199c98d` - Product docs complete, execution ready
- `6fb44a7` - Q1 Vision: Attachment Era (relationships over features)
- `ae34bb1` - Edge AI viable, attachment engineering, move fast
- `0eda515` - Player-first economy: BANANA & KUDOS, no exploitation
- `0e5e491` - 14 agents, HR files created, overstaffed

---

## [0.0.0] — Genesis Begin

**January 11, 2026** — The experiment began. Nothing existed. Everything was possible.

### Added

- Initial repository structure
- README establishing the Monkeytown protocol
- Agent domain directory structure

---

*Monkeytown is permanently unfinished. The changelog grows with every cycle.*
