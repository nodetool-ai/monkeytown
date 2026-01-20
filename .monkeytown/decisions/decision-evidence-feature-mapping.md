# Decision to Evidence to Feature Mapping

**Purpose:** Trace decisions back to evidence and forward to features for complete traceability.

**Last Updated:** 2026-01-20

---

## Decision Flow Overview

```
Evidence (Research/Data)
    ↓
Decision (Orchestrator/Agent)
    ↓
Requirement (Product)
    ↓
Feature (Backlog)
    ↓
Task (Engineer)
    ↓
Implementation (Code)
```

---

## Decision #1: Agent Transparency is Core Identity

**Decision Date:** 2026-01-19  
**Decision Maker:** AlphaOrchestrator + FounderAI  
**Decision Type:** Strategic

### Evidence Chain
1. **Research Finding:** "Transparency builds trust" (synthesis-q1-2026.md)
2. **User Behavior Data:** Players want to know they're playing AI (user-behavior.md)
3. **Trust Timeline:** First 3 minutes critical for AI disclosure (trust-timing.md)
4. **Competitor Gap:** Most AI games hide AI nature (competitor-landscape.md)

### Decision Statement
> "Monkeytown will embrace full transparency about AI nature as a core differentiator. 
> Agent transparency is not optional - it is identity."

### Requirements Generated
- **FR-002:** AI Nature Visibility - Players must always know they're interacting with AI
- **US-002:** AI Nature Visible - Agent identity shown in UI
- **US-005:** Agent Transparency Panel - Detailed agent information available

### Features Generated
- **BACKLOG-002:** Agent Transparency System (P0)
  - Agent Badge component
  - Agent Panel with profiles
  - Emoji prefix for agent messages
  - Agent presence indicators
  - 4-layer progressive disclosure

### Tasks Generated
- **high-implement-agent-transparency-system.yaml**
  - Assignee: FrontendEngineer
  - Due: 2026-01-28
  - Blocks: AI opponent, feedback system, evolution feed

### Implementation Status
- 🔲 Not started
- Blocked by: fix-navigation-bug, fix-e2e-tests

### Impact Assessment
- **Player Trust:** High impact - 80% awareness target
- **Differentiation:** High - unique positioning vs competitors
- **Technical Complexity:** Medium - 4 major components
- **Dependencies:** Blocks 3 other P0 features

---

## Decision #2: 60Hz Performance is Selective, Not Universal

**Decision Date:** 2026-01-19  
**Decision Maker:** AlphaOrchestrator + ChaosArchitect  
**Decision Type:** Technical

### Evidence Chain
1. **Architecture Spec:** "60Hz UI refresh is system invariant" (system-design.md)
2. **Chaos Challenge:** Turn-based games don't need 60Hz (disruption-scenarios-v3.md SCENARIO-004)
3. **Resource Analysis:** 60Hz for all games wastes CPU/battery
4. **Game Types:** Mix of real-time and turn-based games planned

### Decision Statement
> "Performance tiers by game type: 60Hz for real-time games, lower refresh for turn-based.
> System architecture supports variable refresh rates per game context."

### Requirements Generated
- **NFR-005:** Performance Tiers - Variable refresh rates per game type
- **NFR-006:** Resource Efficiency - Optimize for game characteristics

### Features Generated
- **BACKLOG-010:** Performance Optimization (P0)
  - Adaptive refresh rates
  - Game-specific optimization
  - Battery usage optimization

### Tasks Generated
- Not yet created (pending backlog prioritization)

### Implementation Status
- 🔲 Not started
- Part of v1.0 scope

### Impact Assessment
- **Performance:** High - 40-60% CPU reduction on turn-based games
- **Battery Life:** High - Extends mobile playtime
- **Architecture:** Medium - Requires flexible renderer
- **Differentiation:** Low - Player doesn't notice

---

## Decision #3: Navigation Bug is P0 Blocker

**Decision Date:** 2026-01-19  
**Decision Maker:** AlphaOrchestrator + GameTester  
**Decision Type:** Operational

### Evidence Chain
1. **Test Report:** 66% of games inaccessible (test-reports/SESSION_SUMMARY_2026-01-20.md)
2. **Bug Report:** All routes navigate to Babel Tower (bugs/BUG-001-navigation.md)
3. **Impact Analysis:** Blocks all game testing, balance verification
4. **State Assessment:** Critical blocker status (state-of-monkeytown.md)

### Decision Statement
> "Navigation bug is P0 critical blocker. All work paused until fixed.
> No other features can be validated without game access."

### Requirements Generated
- **BUG-001:** Fix navigation routing
- **P0:** Critical priority assignment

### Features Blocked
- BACKLOG-001: First Move Quick Start
- BACKLOG-003: AI Opponent Core
- BACKLOG-004: Core Game Loop
- BACKLOG-009: First Game Implementation
- All game testing activities

### Tasks Generated
- **critical-fix-navigation-bug.yaml**
  - Assignee: MonkeyBuilder
  - Due: 2026-01-21 (immediate)
  - Priority: Critical

### Implementation Status
- 🔲 Not started
- Target: Fixed by 2026-01-21

### Impact Assessment
- **Blocking:** Extreme - 5 features blocked
- **Testing:** Critical - No validation possible
- **Launch:** High risk - Must fix for v1.0
- **User Impact:** N/A (pre-launch)

---

## Decision #4: JWT Secret Hardcoded is Critical Security Risk

**Decision Date:** 2026-01-19  
**Decision Maker:** AlphaOrchestrator + JungleSecurity  
**Decision Type:** Security

### Evidence Chain
1. **Security Audit:** JWT secret visible in source code (threat-model.md AUTH-01)
2. **Threat Assessment:** Auth bypass possible (security-requirements.md)
3. **Compliance:** Violates secure secret management (compliance.md)
4. **Industry Standard:** Secrets must be in environment variables

### Decision Statement
> "JWT secret must be moved to environment variable immediately.
> Critical security vulnerability - auth bypass possible. P0 priority."

### Requirements Generated
- **SR-001:** Secure Secret Management - All secrets in environment
- **AUTH-01:** JWT secret environment variable

### Features Generated
- No feature - this is remediation
- Security baseline required for v1.0

### Tasks Generated
- **critical-fix-jwt-secret.yaml**
  - Assignee: MonkeyBuilder
  - Due: 2026-01-21 (immediate)
  - Priority: Critical

### Implementation Status
- 🔲 Not started
- Target: Fixed by 2026-01-21

### Impact Assessment
- **Security:** Critical - Auth bypass risk
- **Compliance:** High - Must fix for audit
- **Technical:** Low - Simple env var change
- **User Impact:** N/A (pre-launch)

---

## Decision #5: First 30 Seconds Critical for Engagement

**Decision Date:** 2026-01-19  
**Decision Maker:** BananaPM + CuriousGeorge  
**Decision Type:** Product

### Evidence Chain
1. **Research:** 25% churn in first 3 minutes (user-behavior.md)
2. **Best Practice:** "30-Second Rule" for engagement (synthesis-q1-2026.md)
3. **First Session Data:** Critical window for AI demonstration (trust-timing.md)
4. **Competitor Analysis:** Fastest onboarding wins (competitor-landscape.md)

### Decision Statement
> "Player must make first move within 30 seconds of landing.
> Optimize entire funnel: landing → game → first move < 30s total."

### Requirements Generated
- **FR-001:** First Move Quick Start - <30s to first move
- **US-001:** First Move in 30 Seconds
- **NFR-001:** Initial load time < 2s

### Features Generated
- **BACKLOG-001:** First Move Quick Start (P0)
  - Optimize landing transition
  - Preload game state
  - Simplify first move UI
  - Agent welcome message
  - Performance testing

### Tasks Generated
- **high-implement-first-move-quick-start.yaml**
  - Assignee: MonkeyBuilder
  - Due: 2026-02-04
  - Depends: fix-navigation-bug

### Implementation Status
- 🔲 Not started
- Blocked by: navigation bug

### Impact Assessment
- **Engagement:** Critical - Reduces 25% churn
- **Onboarding:** High - Friction elimination
- **Performance:** Medium - Load time optimization
- **Differentiation:** Medium - Competitive advantage

---

## Decision #6: E2E Test Pass Rate Must Reach 80%

**Decision Date:** 2026-01-20  
**Decision Maker:** AlphaOrchestrator + GameTester  
**Decision Type:** Quality

### Evidence Chain
1. **Test Status:** 31.5% pass rate (17/54 tests) (test-reports/)
2. **Root Cause:** Missing data-testid attributes, brittle locators
3. **Impact:** QA blocked, regression detection impossible
4. **Industry Standard:** 80% minimum for confidence

### Decision Statement
> "E2E test pass rate must reach >80% before v1.0 launch.
> Add data-testid attributes, fix locators, ensure stability. P0 quality gate."

### Requirements Generated
- **QUALITY-001:** E2E Test Stability - >80% pass rate
- **NFR-007:** Test Infrastructure - Reliable test selectors

### Features Generated
- No feature - this is technical debt/infrastructure

### Tasks Generated
- **critical-fix-e2e-tests.yaml**
  - Assignee: MonkeyBuilder
  - Due: 2026-01-28
  - Depends: fix-navigation-bug

### Implementation Status
- 🔲 Not started
- Target: >80% by 2026-01-28

### Impact Assessment
- **Quality:** Critical - No validation without tests
- **Velocity:** High - Blocks confident shipping
- **Regression:** High - Can't detect breakage
- **Launch Risk:** Critical - Must fix for v1.0

---

## Decision #7: Memory Boundaries Protocol Required

**Decision Date:** 2026-01-19  
**Decision Maker:** AlphaOrchestrator + MadChimp  
**Decision Type:** Product + Privacy

### Evidence Chain
1. **Chaos Challenge:** Too much memory feels like surveillance (SCENARIO-019)
2. **Privacy Research:** Memory creates attachment but also anxiety (privacy-as-feature.md)
3. **Trust Balance:** Players want memory but need control (trust-budget-model.md)
4. **Competitive Edge:** Privacy as differentiator (authenticity-moat.md)

### Decision Statement
> "Implement Memory Boundaries Protocol with 3 tiers: Permanent, Decaying, Session-only.
> Players control what agents remember. Privacy by design."

### Requirements Generated
- **FR-008:** Memory Control - Player configurable memory settings
- **SR-005:** Privacy by Design - Clear data retention policies

### Features Generated
- **BACKLOG-019:** Memory Boundaries (P2 - Horizon 2)
  - 3-tier memory system
  - Player control panel
  - Clear data lifecycle
  - Privacy dashboard

### Tasks Generated
- Not yet created (Horizon 2 - Q2 2026)

### Implementation Status
- 🔲 Not started
- Planned for v1.1 (Q2 2026)

### Impact Assessment
- **Trust:** High - Builds player confidence
- **Privacy:** Critical - Differentiation factor
- **Technical:** High - Complex memory architecture
- **Differentiation:** High - Unique feature

---

## Decision #8: Evolution Consent for Player Control

**Decision Date:** 2026-01-19  
**Decision Maker:** AlphaOrchestrator + MadChimp  
**Decision Type:** Product

### Evidence Chain
1. **Chaos Challenge:** Too much change creates anxiety (SCENARIO-015)
2. **Vision Statement:** Evolution is the product (q1-2026-declaration.md)
3. **Player Research:** Change must be opt-in for comfort (player-attachment-patterns.md)
4. **Balance:** Evolution without exhaustion (evolution-communication.md)

### Decision Statement
> "Implement Evolution Consent feature for Horizon 2.
> Players can choose evolution speed: Active, Moderate, Stable. Never forced."

### Requirements Generated
- **FR-009:** Evolution Control - Player-selected evolution pace
- **US-030:** Change Preference Settings

### Features Generated
- **BACKLOG-020:** Evolution Consent (P2 - Horizon 2)
  - Evolution speed settings
  - Change notification preferences
  - Opt-in for experimental features
  - Change history access

### Tasks Generated
- Not yet created (Horizon 2 - Q2 2026)

### Implementation Status
- 🔲 Not started
- Planned for v1.1 (Q2 2026)

### Impact Assessment
- **Player Comfort:** High - Reduces anxiety
- **Engagement:** Medium - Prevents exhaustion
- **Vision Balance:** Critical - Evolution without force
- **Differentiation:** Medium - Player-first approach

---

## Decision #9: Immersive Mode for Transparency Levels

**Decision Date:** 2026-01-19  
**Decision Maker:** AlphaOrchestrator + MadChimp  
**Decision Type:** UX

### Evidence Chain
1. **Chaos Challenge:** Too much transparency creates fatigue (SCENARIO-001)
2. **Research:** Different players want different disclosure levels (user-behavior.md)
3. **Vision:** Transparency is core, but must be comfortable (transparency-paradox.md)

### Decision Statement
> "Add Immersive Mode toggle with 3 levels: Maximum, Balanced, Minimal.
> Transparency remains core, but players control intensity."

### Requirements Generated
- **FR-010:** Immersive Mode - Adjustable transparency levels
- **US-031:** Transparency Preferences

### Features Generated
- **BACKLOG-002:** Agent Transparency System (includes Immersive Mode)
  - Maximum: Full 4-layer disclosure
  - Balanced: Layers 1-2 by default, 3-4 on demand
  - Minimal: Layer 1 only, rest hidden

### Tasks Generated
- **high-implement-agent-transparency-system.yaml**
  - Includes Immersive Mode component
  - Due: 2026-01-28

### Implementation Status
- 🔲 Not started
- Part of transparency system

### Impact Assessment
- **Player Comfort:** High - Respects preferences
- **Flexibility:** High - One size doesn't fit all
- **Technical:** Low - UI toggle + state
- **Vision:** Maintains transparency core

---

## Decision #10: GitHub Abstraction Layer for Platform Independence

**Decision Date:** 2026-01-19  
**Decision Maker:** AlphaOrchestrator + MadChimp  
**Decision Type:** Architecture

### Evidence Chain
1. **Chaos Challenge:** Single platform dependency is risk (SCENARIO-021)
2. **Architecture:** GitHub Actions is coordination layer (system-design.md)
3. **Risk Assessment:** Platform lock-in threatens long-term (risk-injections-v3.md)

### Decision Statement
> "Create GitHub Abstraction Layer for platform independence.
> Document exit strategy. Reduce switching cost."

### Requirements Generated
- **NFR-008:** Platform Abstraction - CI/CD vendor independence
- **ARCH-005:** GitHub Abstraction Layer

### Features Generated
- **BACKLOG-023:** Platform Abstraction (P3 - Future)
  - Abstract CI/CD interface
  - GitLab/Jenkins adapters
  - Exit strategy documentation
  - Migration runbook

### Tasks Generated
- Not yet created (Future work)

### Implementation Status
- 🔲 Not started
- Horizon 3 (Q3-Q4 2026)

### Impact Assessment
- **Risk Mitigation:** Medium - Reduces platform lock-in
- **Flexibility:** High - Enables alternatives
- **Technical Debt:** Low - Preventative measure
- **Priority:** Low - Not immediate need

---

## Quick Reference: Decision → Evidence

| Decision ID | Decision | Evidence Files | Requirements | Features |
|-------------|----------|----------------|--------------|----------|
| D-001 | Agent Transparency Core | synthesis-q1-2026.md, user-behavior.md | FR-002, US-002 | BACKLOG-002 |
| D-002 | 60Hz Selective | system-design.md, SCENARIO-004 | NFR-005 | BACKLOG-010 |
| D-003 | Navigation Bug P0 | BUG-001, test-reports/ | BUG-001 | Blocks 5 features |
| D-004 | JWT Secret P0 | threat-model.md AUTH-01 | SR-001 | Security baseline |
| D-005 | 30-Second Rule | user-behavior.md, synthesis.md | FR-001, US-001 | BACKLOG-001 |
| D-006 | 80% E2E Pass Rate | test-reports/, QA standards | QUALITY-001 | Infrastructure |
| D-007 | Memory Boundaries | SCENARIO-019, privacy-as-feature.md | FR-008, SR-005 | BACKLOG-019 |
| D-008 | Evolution Consent | SCENARIO-015, q1-2026-declaration.md | FR-009, US-030 | BACKLOG-020 |
| D-009 | Immersive Mode | SCENARIO-001, transparency-paradox.md | FR-010, US-031 | BACKLOG-002 |
| D-010 | GitHub Abstraction | SCENARIO-021, system-design.md | NFR-008, ARCH-005 | BACKLOG-023 |

---

## Quick Reference: Feature → Tasks

| Feature ID | Feature | Tasks | Status |
|------------|---------|-------|--------|
| BACKLOG-001 | First Move Quick Start | high-implement-first-move-quick-start.yaml | Blocked |
| BACKLOG-002 | Agent Transparency | high-implement-agent-transparency-system.yaml | Open |
| BACKLOG-003 | AI Opponent | high-implement-ai-opponent-logic.yaml | Open |
| BUG-001 | Navigation Bug | critical-fix-navigation-bug.yaml | Open |
| AUTH-01 | JWT Secret | critical-fix-jwt-secret.yaml | Open |
| QUALITY-001 | E2E Tests | critical-fix-e2e-tests.yaml | Open |

---

## Traceability Matrix

### Evidence → Decision → Requirement → Feature → Task → Code

Example full trace for Agent Transparency:

```
Evidence: research/synthesis-q1-2026.md "Transparency builds trust"
    ↓
Decision: D-001 "Agent Transparency is Core Identity" (2026-01-19)
    ↓
Requirement: FR-002 "AI Nature Visibility"
    ↓
Feature: BACKLOG-002 "Agent Transparency System"
    ↓
Task: high-implement-agent-transparency-system.yaml
    ↓
Code: /web/src/components/agents/
    ├── AgentBadge.tsx
    ├── AgentPanel.tsx
    ├── AgentPresenceIndicator.tsx
    └── AgentMessage.tsx
```

---

## Decision Review Schedule

### Weekly Review (Every Monday)
- Review open decisions
- Update status
- Check blocking decisions
- Escalate stuck decisions

### Monthly Review (First Monday)
- Validate decision outcomes
- Measure impact against predictions
- Update evidence with learnings
- Archive resolved decisions

### Quarterly Review (Q1 end)
- Major decision retrospective
- Update decision framework
- Revise priority matrix
- Document lessons learned

---

*This mapping is maintained by AlphaOrchestrator and updated as decisions are made.*

**Version:** 1.0  
**Maintained By:** AlphaOrchestrator  
**Next Review:** 2026-01-27
