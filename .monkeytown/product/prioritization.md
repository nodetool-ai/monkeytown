# Monkeytown Prioritization Framework v1.0

## Document Purpose
This document defines how features and stories are prioritized, aligned with:
- Vision principles (`.monkeytown/vision/principles.md`)
- Research insights (`.monkeytown/research/synthesis.md`)
- Competitive positioning (`.monkeytown/research/competitors.md`)

---

## Prioritization Principles

### From Vision: Priority Matrix
```
1. Player joy — If it doesn't delight players, it doesn't ship
2. Agent autonomy — If agents can't own it, humans bottleneck it
3. Emergent complexity — If we can build systems that build features, we build those systems
4. Technical excellence — If it breaks constantly, nothing else matters
```

### From Manifesto: Core Beliefs
- "Games should serve players, not exploit them"
- "AI agents are collaborators, not replacements"
- "Transparency builds trust"

### From Research: Success Metrics
| Metric | Target | Priority Weight |
|--------|--------|-----------------|
| Day 1 retention | 60% | High |
| Day 7 retention | 30% | High |
| Session length | 15+ min | High |
| Agent attribution recognition | 80%+ | Critical |
| Feedback submission rate | 5%+ | Medium |

---

## Scoring Model

### Factor Weights

| Factor | Weight | Rationale |
|--------|--------|-----------|
| Player Impact | 40% | Primary value driver from vision |
| Strategic Value | 25% | Differentiates from competitors |
| Agent Autonomy | 20% | Core thesis of Monkeytown |
| Feasibility | 15% | Must be shippable |

### Scoring Scale (1-10)

#### Player Impact (40%)
| Score | Description |
|-------|-------------|
| 10 | Critical for first session / retention |
| 8 | Major impact on engagement |
| 6 | Meaningful improvement |
| 4 | Minor enhancement |
| 2 | Negligible impact |

#### Strategic Value (25%)
| Score | Description |
|-------|-------------|
| 10 | Core differentiator vs competitors |
| 8 | Significant competitive advantage |
| 6 | Nice to have vs competitors |
| 4 | Parity feature |
| 2 | Not strategically relevant |

#### Agent Autonomy (20%)
| Score | Description |
|-------|-------------|
| 10 | Fully agent-owned end-to-end |
| 8 | Mostly agent-owned with human review |
| 6 | Agent-owned with human oversight |
| 4 | Requires significant human involvement |
| 2 | Cannot be agent-owned |

#### Feasibility (15%)
| Score | Description |
|-------|-------------|
| 10 | Proven, low risk, well understood |
| 8 | Moderate complexity, manageable |
| 6 | Challenging but achievable |
| 4 | High complexity, significant risk |
| 2 | Unknown territory, high risk |

### Priority Calculation
```
Priority Score = (Player Impact × 0.4) + (Strategic Value × 0.25) + (Agent Autonomy × 0.2) + (Feasibility × 0.15)
```

### Priority Levels
| Score Range | Level | Meaning |
|-------------|-------|---------|
| 8.0 - 10.0 | P0 | Critical - Must have for launch |
| 6.0 - 7.9 | P1 | High - Should have for launch |
| 4.0 - 5.9 | P2 | Medium - Nice to have |
| 2.0 - 3.9 | P3 | Low - Future consideration |
| 0.0 - 1.9 | Reject | Not aligned with vision |

---

## Feature Prioritization Matrix

### Current Backlog Scored

| Feature | Player Impact | Strategic | Autonomy | Feasibility | **Total** | Priority |
|---------|---------------|-----------|----------|-------------|-----------|----------|
| First Move Quick Start | 10 | 8 | 6 | 8 | **8.4** | P0 |
| Agent Transparency | 10 | 10 | 8 | 8 | **9.3** | P0 |
| AI Opponent Core | 10 | 8 | 8 | 6 | **8.6** | P0 |
| Core Game Loop | 10 | 8 | 6 | 8 | **8.5** | P0 |
| Game Progression | 8 | 6 | 6 | 8 | **7.1** | P1 |
| Feedback System | 8 | 8 | 8 | 8 | **8.0** | P1 |
| Evolution Feed | 8 | 8 | 6 | 8 | **7.6** | P1 |
| Multiplayer Infrastructure | 8 | 8 | 6 | 6 | **7.3** | P1 |
| First Game (Babel) | 10 | 10 | 6 | 6 | **8.5** | P0 |
| Performance Optimization | 6 | 4 | 6 | 8 | **5.9** | P2 |
| Agent Personality | 6 | 6 | 8 | 6 | **6.3** | P1 |
| Spectator Mode | 6 | 6 | 6 | 6 | **6.0** | P2 |
| Decision Transparency | 6 | 8 | 8 | 6 | **6.9** | P1 |
| Additional Game Modes | 8 | 8 | 6 | 6 | **7.3** | P2 |
| Accessibility | 4 | 4 | 6 | 8 | **5.1** | P2 |
| Emergent Discovery | 8 | 8 | 10 | 4 | **7.9** | P2 |
| Community Features | 6 | 6 | 6 | 6 | **6.0** | P2 |
| Agent Social Dynamics | 6 | 8 | 10 | 4 | **7.1** | P3 |

---

## Competitive Prioritization

### Differentiators (Score +2 bonus)

| Differentiator | Feature | Rationale |
|----------------|---------|-----------|
| Transparent AI | Agent Transparency, Decision Transparency | Only Monkeytown celebrates AI nature |
| Autonomous Agents | Agent Autonomy features | Core thesis vs chatbots/NPCs |
| Living Evolution | Evolution Feed, Emergent Discovery | Unique to Monkeytown |

### Parity Features (No bonus, no penalty)

| Feature | Competitors Have |
|---------|------------------|
| Core Game Loop | All games |
| Multiplayer | Many platforms |
| Progression | Standard feature |
| Feedback | Standard feature |

---

## Horizon Alignment

### Horizon 1: Foundation (Q1 2026)
**Goal:** Playable game with AI opponents

| Priority | Features |
|----------|----------|
| P0 | First Move, Agent Transparency, AI Opponent, Core Game Loop, First Game |
| P1 | Progression, Feedback, Evolution Feed, Multiplayer |
| P2 | Performance, Accessibility |

### Horizon 2: Evolution (Q2 2026)
**Goal:** Self-improving game

| Priority | Features |
|----------|----------|
| P1 | Agent Personality, Decision Transparency |
| P2 | Spectator Mode, Emergent Discovery |
| P3 | Agent Social Dynamics |

### Horizon 3: Ecosystem (Q3-Q4 2026)
**Goal:** Multi-game platform

| Priority | Features |
|----------|----------|
| P1 | Additional Game Modes |
| P2 | Community Features |
| P3 | Agent Social Dynamics |

---

## Dependency Management

### Blocking Rules
1. P0 features cannot be blocked by P2+ features
2. Multiplayer requires Core Game Loop
3. Feedback System requires Agent Transparency
4. Evolution Feed requires Feedback System

### Dependency Graph
```
First Move ← Core Game Loop ← First Game
                ↑
                ├── Multiplayer ← (parallel)
                │
Agent Transparency ← Feedback System ← Evolution Feed
                ↑
                ├── AI Opponent ← (parallel)
                │
                └── Agent Personality ← (future)
```

---

## Trade-Off Decisions

### Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-01-18 | Prioritize Agent Transparency over Performance | Research shows 80%+ awareness required; transparency is differentiator |
| 2026-01-18 | Delay Emergent Discovery to Horizon 2 | Core gameplay must be solid first; emergent complexity requires foundation |
| 2026-01-18 | Implement one game (Babel) deeply over multiple shallowly | "Done over perfect" principle; player joy from mastery |

### What We're NOT Building
| Rejected Feature | Reason |
|------------------|--------|
| AI content generation without attribution | Violates transparency principle |
| Grind mechanics for engagement | "Grinding as content" rejected in identity |
| Hidden AI difficulty adjustment | "Engagement optimization" rejected in trends |
| Pay-to-win mechanics | Violates manifesto principles |

---

## Re-Prioritization Triggers

### Events That Trigger Re-Prioritization
1. **Player feedback patterns** - Significant shift in player requests
2. **Competitive move** - Major competitor announcement
3. **Technical discovery** - New feasibility insights
4. **Metric misses** - Key metrics below target
5. **Agent signals** - Orchestrator identifies new priorities

### Re-Prioritization Process
1. Collect signals from all agents
2. Score affected features with new inputs
3. Present to AlphaOrchestrator for decision
4. Update backlog and communicate changes
5. Adjust sprint plan if necessary

---

## Success Metrics by Priority

### P0 Success Criteria
| Feature | Metric | Target |
|---------|--------|--------|
| First Move | Time to first move | < 30s |
| Agent Transparency | Awareness rate | > 80% |
| AI Opponent | Player win rate | 60-70% |
| Core Game Loop | Completion rate | 99% |
| First Game | Session length | > 15min |

### P1 Success Criteria
| Feature | Metric | Target |
|---------|--------|--------|
| Progression | Day 7 retention | > 30% |
| Feedback | Submission rate | > 5% |
| Evolution Feed | Feature adoption | > 70% |
| Multiplayer | Game completion | 95% |

### P2 Success Criteria
| Feature | Metric | Target |
|---------|--------|--------|
| Performance | Load time | < 2s |
| Accessibility | Audit score | 100% |

---

*Prioritization serves evolution. Evolution serves players. Players serve Monkeytown.*

**Version:** 1.0
**Generated:** 2026-01-18
**Framework:** Vision + Research + Competitive Analysis
