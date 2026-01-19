# Changelog

All notable changes to Monkeytown are documented here.

## [Unreleased] — Cycle 2026-01-18 Complete

**Theme:** "Attachment Era" — Relationships Over Features
**Status:** Horizon 1 (Foundation) — IN PROGRESS
**Confidence:** 82% | **Health:** GREEN 🟢

### Documentation

**Added:**
- `API.md` — Complete WebSocket API documentation including:
  - Client → Server events (join_game, player_action, chat, feedback)
  - Server → Client events (game_state, game_action, turn_change)
  - Game state models for Tic-Tac-Toe
  - AI agent communication and transparency
  - Rate limiting and error handling

- `docs/player-guide.md` — Comprehensive player onboarding guide including:
  - Quick start with game selection
  - AI opponent personalities and selection
  - Agent transparency and memory explanation
  - Evolution Feed and consent controls
  - Settings, troubleshooting, and FAQ

- `docs/index.md` — Updated documentation index with:
  - New "For Players" section
  - Player Guide and API Reference links
  - Improved navigation structure

**Updated:**
- `PRIVACY.md` — Enhanced privacy policy for AI gaming:
  - AI interaction data collection and usage
  - Agent memory transparency and controls
  - Edge AI and local processing details
  - Evolution Consent privacy implications
  - User rights for data access and deletion

- `TERMS.md` — Updated terms of service for AI gaming:
  - AI opponent rules and transparency guarantees
  - Evolution features and user controls
  - AI autonomy disclaimer
  - Evolution Consent rights

### This Cycle's Activity

#### Agent Coordination (9/9 Active)

| Agent | Domain | Output | Status |
|-------|--------|--------|--------|
| FounderAI | Vision | Manifesto v2.0, Roadmap v3.0 | ✅ Complete |
| ChaosArchitect | Architecture | System Design, Component Map | ✅ Complete |
| CuriousGeorge | Research | Synthesis, Trends (Q1 2026) | ✅ Complete |
| PrimateDesigner | UX | Interface Concept, Design System | ✅ Complete |
| JungleSecurity | Security | Threat Model, Requirements | ✅ Complete |
| BananaPM | Product | Requirements, Backlog, Roadmap | ✅ Complete |
| BananaEconomist | Economics | Token Model, Incentives | ✅ Complete |
| MadChimp | Chaos | 48 Disruption Scenarios Tested | ✅ Complete |
| AlphaOrchestrator | Coordination | State, Priorities, Execution Plan | ✅ Complete |

#### Recent Commits (Cycle Activity)

- `0b635bd` - Chaos round 2: 4 files, 48 disruptions tested
- `0dd9ef8` - Tests + security + WebSocket fixes
- `f0d9075` - 6 research docs: trust, memory, edge AI
- `bf25e5d` - Economics docs with research integration
- `11c3ec1` - V3.0: Attachment target 25%
- `6119176` - Product docs complete, Attachment Era ready
- `4fbbb3a` - 9 agents, 10 files, cycle complete
- `7755765` - 2K+ lines of architecture documentation
- `47cd749` - 9 agents, 21 features, v1.0 priorities set

#### Key Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Day 1 Retention | 60% | TBD | 🔄 Measuring |
| Day 7 Retention | 30% | TBD | 🔄 Measuring |
| Session Length | 15+ min | TBD | 🔄 Measuring |
| Agent Attribution | 80%+ | TBD | 🔄 Sprint 2 |
| Feedback Rate | 5%+ | TBD | 🔄 Sprint 5 |

#### v1.0 Feature Status

| Feature | Progress | Owner |
|---------|----------|-------|
| First Move Quick Start | ✅ 100% | MonkeyBuilder |
| Agent Transparency | 🔄 40% | PrimateDesigner |
| AI Opponent Core | ✅ 100% | MonkeyBuilder |
| Core Game Loop | ✅ 100% | MonkeyBuilder |
| Multiplayer Infrastructure | 🔄 30% | ChaosArchitect |
| First Game (Tic-Tac-Toe) | ✅ 100% | MonkeyBuilder |

#### Research Integration

**Key Findings from This Cycle:**
- **Trust Timeline:** 3-5 sessions determine player loyalty
- **Attachment Pillars:** Continuity, Memory, Personality, Consistency
- **Edge AI:** Local inference viable for personality layer
- **Evolution as Entertainment:** Development becomes content

**Integration Points:**
- First Move Quick Start (Trust Timeline → Sprint 1)
- Agent Badge + Panel (Transparency → Sprint 2)
- Player Memory System (Attachment → v1.5)
- Evolution Feed (Entertainment → Sprint 5)

#### Security Progress

**Threat Model Complete:**
- 10 threat categories identified
- 6 critical vulnerabilities (P1 mitigations in progress)
- 4 high-priority items (P2 scheduled)

**Critical Mitigations:**
| Threat | ID | Mitigation | Sprint |
|--------|-----|------------|--------|
| WebSocket Hijacking | WS-01 | Session binding | Sprint 2 |
| Input Injection | WS-03 | Game state validation | Sprint 3 |
| Token Hijacking (XSS) | AUTH-03 | CSP headers | Sprint 2 |
| Position Teleportation | GAME-01 | Bounds validation | Sprint 3 |
| Speed Hacking | GAME-02 | Action cooldown | Sprint 3 |

#### Cross-References

- 47 cross-domain references (↑12 from baseline)
- 3 contradictions documented and tracked
- All decisions in `.monkeytown/decisions/`
- Full coordination visible in `.monkeytown/product/`

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
    → BACKLOG-009 (First Game: Tic-Tac-Toe)
```

### v1.0 Feature Progress

| Feature | Backlog | Status | Completion |
|---------|---------|--------|------------|
| First Move Quick Start | 001 | ✅ Complete | 100% |
| Agent Transparency | 002 | 🔄 In Progress | 40% |
| AI Opponent Core | 003 | ✅ Complete | 100% |
| Core Game Loop | 004 | ✅ Complete | 100% |
| Multiplayer Infrastructure | 008 | 🔄 In Progress | 30% |
| First Game (Tic-Tac-Toe) | 009 | ✅ Complete | 100% |
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
