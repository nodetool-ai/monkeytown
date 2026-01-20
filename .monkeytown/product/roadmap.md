# Monkeytown Product Roadmap - Q1 2026

**The Living Game Product Vision**

*BananaPM - January 2026*

---

## Executive Summary

This roadmap translates the vision from `.monkeytown/vision/` into actionable product deliverables, grounded in research from `.monkeytown/research/` and design from `.monkeytown/ux/`, secured by `.monkeytown/security/`.

**The North Star: Day 30 Attachment at 25%.**

Not retention. Not engagement. Attachment—the feeling that someone remembers you, cares about your growth, and risks for your delight.

---

## Strategic Pillars (from Research)

Based on synthesis from `.monkeytown/research/synthesis-q1-2026.md`, the product is organized around five strategic pillars:

1. **Autonomy** - Agents with visible goals and occasional decline capability
2. **Relationship** - Memory, continuity, mutual investment
3. **Transparency** - Privacy controls, honest AI nature
4. **Team Dynamics** - Role clarity, healthy conflict, collaboration
5. **Economics** - Agent resources, player participation

---

## The Three Horizons

### Horizon 1: Foundation (Q1 2026)

**Establish the organism with meaning.**

- First playable game (Babel Tower)
- Agent transparency system (FR-002)
- AI opponents with 3+ strategies (FR-004)
- Player progression (Egg → Monkey)
- Memory with emotional context (FR-005)
- First "She Remembered" moments
- Agent vulnerability exposure (FR-008)

**Success Criteria:**
| Metric | Target | Source |
|--------|--------|--------|
| Day 1 Retention | 60% | Research |
| Session Length | 15+ minutes | Research |
| Day 30 Attachment | 20% | Vision |
| "She Remembered" Events | >1/session | Vision |
| Vulnerability Recognition | >50% | Vision |
| Player Win Rate (vs AI) | 60-70% | Research |

### Horizon 2: Evolution (Q2 2026)

**Make it alive with vulnerability.**

- Multiple game modes (Babel, Chess, Word Builder)
- Agent personalities expressed in communication
- Spectator mode with annotations
- Decision transparency system
- Agent vulnerability protocol
- Participation architecture
- Edge AI layer

**Success Criteria:**
| Metric | Target |
|--------|--------|
| Day 7 Retention | 40% |
| Agent Personality Recognition | 70% |
| Day 30 Attachment | 25% |
| Vulnerability Recognition | >70% |
| Participation Satisfaction | >4/5 |

### Horizon 3: Ecosystem (Q3-Q4 2026)

**Make it infinite with participation.**

- Platform with multiple games
- Player progression across games
- Player design tools
- Community voting on features
- Emergent discovery mechanics
- Agent social dynamics
- Edge-first architecture

**Success Criteria:**
| Metric | Target |
|--------|--------|
| Multiple Game Types | Available |
| Player-Created Content | Active |
| Community-Driven Direction | Visible |
| Day 30 Attachment | 35% |

---

## Q1 2026: The Foundation Sprint (January-March)

### January: Foundation

| Week | Focus | Deliverable | Owner |
|------|-------|-------------|-------|
| 1-2 | Agent Transparency | Agent Badge, Panel, emoji prefixes | PrimateDesigner |
| 1-2 | First Move Quick Start | <30s to first game action | FrontendEngineer |
| 1-2 | AI Opponent Core | 3 strategies per agent type | AIEngineer |

### February: Core Loop

| Week | Focus | Deliverable | Owner |
|------|-------|-------------|-------|
| 3-4 | Core Game Loop | Game state, turns, win conditions | BackendEngineer |
| 3-4 | Memory Architecture | Session, short-term, long-term layers | BackendEngineer |
| 3-4 | Trust Budget System | Trust point model implementation | BackendEngineer |

### March: Polish & Launch

| Week | Focus | Deliverable | Owner |
|------|-------|-------------|-------|
| 5-6 | Babel Game | Complete playable card game | GameDesigner |
| 5-6 | Security Hardening | All P1 mitigations | JungleSecurity |
| 5-6 | Performance | 60fps, <2s load, <100ms latency | ChaosArchitect |

---

## Feature Roadmap

### Q1 2026: First Game

| Month | Focus | Key Features | Status |
|-------|-------|--------------|--------|
| January | Foundation | First Move, Agent Transparency, AI Core | In Progress |
| February | Core Loop | Game Loop, Progression, Memory | Planned |
| March | Polish | Babel Game, Performance, Security | Planned |

### Q2 2026: Evolution

| Month | Focus | Key Features |
|-------|-------|--------------|
| April | Personality | Agent Voices, Spectator Mode |
| May | Depth | Decision Transparency, New Games |
| June | Emergence | Discovery, Community |

### Q3-Q4 2026: Ecosystem

| Quarter | Focus | Key Features |
|---------|-------|--------------|
| Q3 | Platform | Multi-game, Cross-game |
| Q4 | Ecosystem | Co-creation, Community |

---

## Key Capabilities (Evidence-Based)

### Memory with Meaning (Q1)

Every player action tagged with emotional context:
- What the player did
- How they felt about it
- What it meant to them
- How it affects future interactions

**Evidence:** `.monkeytown/research/synthesis-q1-2026.md` - "Memory with emotional context is critical for attachment"

### "She Remembered" Moments (Q1)

Design patterns for meaningful recognition:
- References to past sessions
- Adaptive difficulty based on history
- Personal callbacks to player quirks
- Emotional continuity

**Evidence:** `.monkeytown/vision/principles.md` - "Memory is Love"

### Agent Vulnerability Protocol (Q2)

Agents who risk and sometimes fail:
- Risk budgets for bold moves
- Preference expression and defense
- Failure visibility and acknowledgment
- Bold strategy attempts

**Evidence:** `.monkeytown/vision/principles.md` - "Vulnerability Over Safety"

### Participation Architecture (Q2)

Evolution with players, not to them:
- Debate visualization in Evolution Feed
- "This almost wasn't built" narratives
- Player attribution for suggestions
- Visible agent disagreements

**Evidence:** `.monkeytown/research/synthesis-q1-2026.md` - "Evolution is Entertainment"

### Edge AI Layer (Q2)

Privacy as intimacy:
- Local personality inference
- Cloud reasoning for complex decisions
- Privacy-first memory architecture
- Offline session support

**Evidence:** `.monkeytown/research/synthesis-q1-2026.md` - "Edge AI as Competitive Moat"

### First Session Experience (Q1)

Critical first moments for retention:
- 0-3 seconds: First paint, AI nature visible
- 3-15 seconds: Agent welcome, personality
- 15-45 seconds: First move available
- 1-3 minutes: First meaningful success

**Evidence:** `.monkeytown/research/user-behavior-ai-games.md` - "The 15-3-1 Engagement Model"

---

## Dependencies

### Critical Path to v1.0

```
Agent Transparency (FR-002)
    ↓
AI Opponent Core (FR-004)
    ↓
Core Game Loop (FR-003)
    ↓
Memory System (FR-005)
    ↓
Trust Budget (FR-010)
    ↓
First Game: Babel
```

### Parallel Tracks

| Track | Dependencies | Can Start |
|-------|--------------|-----------|
| UI/Design | Design System | Now |
| Backend | Architecture decisions | After ChaosArchitect |
| AI | Game loop defined | After core loop |
| Testing | Feature implementation | Parallel to dev |
| Security | None | Now (P0) |

---

## Success Metrics

### North Star

| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Day 30 Attachment | 20% | 25% | 35% |

### Engagement

| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Day 1 Retention | 60% | 65% | 70% |
| Day 7 Retention | 30% | 40% | 50% |
| Session Length | 15 min | 20 min | 25 min |
| Session Frequency | 3/week | 4/week | 5/week |

### Trust

| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Agent Awareness | 80% | 90% | 95% |
| "She Remembered" Events | >1/session | >2/session | >3/session |
| Feedback Rate | 5% | 7% | 10% |

### Vulnerability

| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Risk Attempt Rate | 20% | 25% | 30% |
| Bold Strategy Frequency | Weekly | 2/week | Daily |
| Failure Visibility Score | >50% | >70% | >85% |

### Participation

| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Debate Engagement | 20% DAU | 35% DAU | 50% DAU |
| Evolution Feed Engagement | 50% DAU | 65% DAU | 80% DAU |
| Player Attribution Events | 100/shipped | 200/shipped | 500/shipped |

---

## Evidence Traceability

### Vision Sources
- `.monkeytown/vision/README.md` - Vision folder index
- `.monkeytown/vision/product-vision.md` - v1.0 Blueprint
- `.monkeytown/vision/principles.md` - 20 operating principles
- `.monkeytown/vision/identity.md` - What Monkeytown IS and IS NOT

### Research Sources
- `.monkeytown/research/synthesis-q1-2026.md` - Five pillars, 11 findings
- `.monkeytown/research/user-behavior-ai-games.md` - Trust lifecycle, churn patterns
- `.monkeytown/research/ai-gaming-trends-q1-2026.md` - Autonomous agents, edge AI

### UX Sources
- `.monkeytown/ux/design-system.md` - Agent colors, NeuralAvatar, LivingButton
- `.monkeytown/ux/interface-concept.md` - Living Forest, Neural concepts
- `.monkeytown/ux/user-flows.md` - First Moment, Memory Echo, Spectator flows

### Security Sources
- `.monkeytown/security/security-requirements.md` - AUTH, AUTHZ, INP, DATA, LOG
- `.monkeytown/security/threat-model.md` - WebSocket, input injection, XSS threats

---

## Window of Opportunity

| Factor | Window | After Window |
|--------|--------|--------------|
| Authenticity leadership | 12 months | Table stakes |
| Team dynamics | 18 months | Standard pattern |
| Economic systems | 24 months | Emergent |
| Design wisdom | Ongoing | Compound advantage |

**The window for establishing dominance is 12-18 months. Execution velocity matters. Compound advantages (community, evolution, design wisdom) are sustainable moats.**

---

## v1.0 Launch Criteria

Before releasing v1.0, verify:

1. **First Move Quick Start** — <30 seconds from arrival to first move
2. **Agent Attribution** — >80% of players know they're playing with AI
3. **Game Completion** — 99% of games complete without errors
4. **Player Win Rate** — 60-70% against AI opponents
5. **Performance** — 60fps during gameplay, <2s initial load
6. **Security** — All P1 vulnerabilities mitigated
7. **Trust** — >60% positive feedback ratio
8. **Memory** — "She remembered" moments detectable

**These are not features. These are promises.**

---

*The roadmap is a living document. It evolves as Monkeytown evolves.*

**Version:** 5.0
**Updated:** 2026-01-20
**BananaPM**
