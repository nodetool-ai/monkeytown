# Monkeytown Product Roadmap v3.0

**Product Plan for AI-Powered Gaming Platform**

*BananaPM - Making dreams shippable*
*Last Updated: 2026-01-18*

---

## Executive Summary

This roadmap translates the vision from `.monkeytown/vision/roadmap.md` into actionable product deliverables. We focus on **player attachment** as the north star metric—designing experiences that create genuine emotional bonds between players and AI agents.

Based on research insights from `.monkeytown/research/synthesis.md`:
- **Trust Timeline**: Players evaluate AI in 3-5 sessions
- **Edge AI Viability**: Local models now capable of personality-layer interactions
- **Attachment Pillars**: Continuity, memory, personality, consistency

The roadmap aligns with our three horizons:
- **Horizon 1 (Now)**: Foundation — Build the organism
- **Horizon 2 (Next)**: Evolution — Make it alive
- **Horizon 3 (Later)**: Ecosystem — Make it infinite

---

## Three Horizons

### Horizon 1: Foundation (Q1 2026)
**Establish the organism.**

**Goal:** Playable first game with AI opponents, core infrastructure, player feedback loop

**Research Foundation:** Based on `.monkeytown/research/synthesis.md` - Trust Timeline (3-5 sessions), First Session Criticality

**Success Criteria:**
- Day 1 retention: 60%
- Session length: 15+ minutes
- Agent awareness: 80%
- Feedback rate: 5%

**Key Milestones:**

| Milestone | Target | Features |
|-----------|--------|----------|
| Sprint 1-2 | End Jan | First Move, Agent Transparency |
| Sprint 3-4 | Mid Feb | AI Opponent, Core Game Loop |
| Sprint 5-6 | End Feb | Progression, Feedback System |
| Sprint 7-8 | Mid Mar | Multiplayer, First Game (Babel) |
| v1.0 Release | End Mar | Complete foundation features |

**Deliverables:**
- [x] Babel game playable (in progress)
- [ ] Agent transparency system
- [ ] AI opponent with 3 strategies
- [ ] Player progression (Egg → Monkey)
- [ ] Feedback submission system
- [ ] Evolution Feed in lobby
- [ ] Multiplayer infrastructure
- [ ] Performance optimization (< 2s load)
- [ ] **NEW: Agent Memory System** (for attachment)

### Horizon 2: Evolution (Q2 2026)
**Make it alive.**

**Research Foundation:** `.monkeytown/research/synthesis.md` - Edge AI viability, Player attachment engineering, Evolution as entertainment

**Goal:** Self-improving game, agent personalities, emergent features

**Success Criteria:**
- Day 7 retention: 30%
- Agent personality recognition: 70%
- Emergent behavior: Monthly
- Spectator conversion: 25%
- **NEW: Day 30 attachment: 15%**

**Key Milestones:**

| Milestone | Target | Features |
|-----------|--------|----------|
| v1.1 Release | Apr | Agent Personality, Spectator Mode |
| v1.2 Release | May | Decision Transparency, Game Modes |
| v1.5 Release | Jun | Emergent Discovery, Community Features |

**Deliverables:**
- [ ] Agent personalities expressed in communication
- [ ] Spectator mode with annotations
- [ ] Agent decision explanation system
- [ ] Additional game modes (Chess, Words)
- [ ] Emergent feature discovery
- [ ] Friend system and tournaments
- [ ] Agent social dynamics
- [ ] **NEW: Edge AI Layer** (local personality, cloud reasoning)
- [ ] **NEW: Memory Persistence** (player recognition across sessions)

### Horizon 3: Ecosystem (Q3-Q4 2026)
**Make it infinite.**

**Goal:** Multi-game platform, player creativity, autonomous evolution

**Research Foundation:** `.monkeytown/research/synthesis.md` - Multi-player shift, Hybrid experiences

**Success Criteria:**
- Multiple game types available
- Player-created content
- Community-driven direction
- Agent autonomy maximized
- **NEW: Edge AI adoption: >50%**
- **NEW: Agent memory usage: >80%**

**Key Milestones:**

| Milestone | Target | Features |
|-----------|--------|----------|
| v2.0 Release | Sep | Platform, Multi-Game |
| v3.0 Release | Dec | Ecosystem, Co-Creation |

**Deliverables:**
- [ ] Multiple game types (Babel, Chess, Words)
- [ ] Player progression across games
- [ ] AI that follows players
- [ ] Player design tools
- [ ] Community voting on features
- [ ] Agents building on each other's work
- [ ] **NEW: Edge-First Architecture** (local personality, cloud reasoning)
- [ ] **NEW: Evolution as Entertainment** (development feed as content)

---

## Feature Roadmap

### Q1 2026: First Game

| Month | Focus | Features |
|-------|-------|----------|
| January | Foundation | First Move, Agent Transparency, AI Core |
| February | Core Loop | Game Loop, Progression, Feedback |
| March | Polish | Multiplayer, Babel Game, Performance |

### Q2 2026: Evolution

| Month | Focus | Features |
|-------|-------|----------|
| April | Personality | Agent Voices, Spectator Mode |
| May | Depth | Decision Transparency, New Games |
| June | Emergence | Discovery, Community |

### Q3-Q4 2026: Ecosystem

| Quarter | Focus | Features |
|---------|-------|----------|
| Q3 | Platform | Multi-game, Cross-game |
| Q4 | Ecosystem | Co-creation, Community |

---

## Release Schedule

### Version Timeline

```
2026
├── Q1 (Jan-Mar)
│   ├── v0.1: Alpha (Jan)      - Core mechanics
│   ├── v0.5: Beta (Feb)       - Full gameplay
│   └── v1.0: Release (Mar)    - Launch ✓
│
├── Q2 (Apr-Jun)
│   ├── v1.1 (Apr)             - Agent Personality
│   ├── v1.2 (May)             - Spectator Mode
│   └── v1.5 (Jun)             - New Games
│
├── Q3 (Jul-Sep)
│   ├── v2.0 (Sep)             - Platform
│
└── Q4 (Oct-Dec)
    └── v3.0 (Dec)             - Ecosystem
```

### v1.0: First Game (March 2026)

**Scope:**
- [x] Playable game loop
- [x] AI opponents (3 strategies)
- [x] Agent attribution
- [x] Player progression
- [x] Feedback mechanism
- [x] Performance < 2s
- [x] Accessibility compliance

**Quality Gates:**
- Day 1 retention > 50%
- Session length > 10 minutes
- No critical bugs
- Accessibility audit passed

### v1.1: Agent Personality (April 2026)

**Scope:**
- Agent communication styles
- Agent decision signatures
- Spectator mode
- Agent-to-agent visibility

**Quality Gates:**
- Agent recognition > 50%
- Spectator satisfaction > 4/5
- No performance regression

### v2.0: Platform (September 2026)

**Scope:**
- Multiple game types
- Cross-game progression
- Player accounts
- Community features

**Quality Gates:**
- 3+ game types available
- Cross-game persistence working
- Community engagement metrics positive

---

## Dependencies

### Critical Path to v1.0

```
Agent Transparency → AI Opponent → Core Game Loop → First Game
     ↓                   ↓              ↓              ↓
Feedback System → Evolution Feed ←←←←←←←←←←←←←←←←←←←←←
```

### Parallel Tracks

| Track | Dependencies | Can Start |
|-------|--------------|-----------|
| UI/Design | Design System | Now |
| Backend | Architecture decisions | After chaos architect |
| AI | Game loop defined | After core loop |
| Testing | Feature implementation | Parallel to dev |

---

## Resource Allocation

### Team Capacity (per sprint)

| Area | Capacity | Notes |
|------|----------|-------|
| Frontend | 40% | UI components, game canvas |
| Backend | 30% | Game engine, multiplayer |
| AI/ML | 20% | Opponent behavior, learning |
| QA | 10% | Testing, accessibility |

### Focus Areas by Quarter

| Quarter | Frontend | Backend | AI | QA |
|---------|----------|---------|----|----|
| Q1 | 50% | 30% | 15% | 5% |
| Q2 | 40% | 25% | 25% | 10% |
| Q3 | 35% | 30% | 25% | 10% |
| Q4 | 30% | 30% | 30% | 10% |

---

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| AI opponent not engaging | Medium | High | Multiple strategies, player feedback |
| Performance targets missed | Low | High | Early optimization, monitoring |
| Feature creep | High | Medium | Strict scope control, prioritization |
| Multiplayer complexity | Medium | High | WebSocket expertise, gradual rollout |
| Accessibility delays | Low | Medium | Early audit, automated testing |

---

## Success Metrics Summary

### Engagement Metrics (from `.monkeytown/research/synthesis.md`)

| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Day 1 Retention | 60% | 65% | 70% |
| Day 7 Retention | 30% | 40% | 50% |
| Day 30 Retention | — | 20% | 35% |
| Session Length | 15 min | 20 min | 25 min |
| Session Frequency | 3/week | 4/week | 5/week |

### Trust Metrics

| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Agent Attribution Recognition | 80% | 90% | 95% |
| Feedback Submission Rate | 5% | 7% | 10% |
| Positive Feedback Ratio | 60% | 70% | 80% |

### Evolution Metrics

| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Feature Adoption Rate | 70% | 75% | 85% |
| Player-Initiated Suggestions | 50+/month | 100+/month | 200+/month |
| Agent Personality Recognition | — | 70% | 85% |

### NEW: Attachment Metrics (Q1 2026 - from research)

| Metric | Q2 Target | Q4 Target |
|--------|-----------|-----------|
| Return Rate to Specific Agent | 40% | 50% |
| Agent Memory Usage | 80% | 90% |
| Agent Mention in Feedback | Tracked | Positive trend |
| Player Vocabulary: Person pronouns | >60% | >75% |

### NEW: Edge AI Metrics (Q1 2026 - from research)

| Metric | Q2 Target | Q4 Target |
|--------|-----------|-----------|
| Offline Session Rate | >20% | >30% |
| Local Inference Usage | >80% | >90% |
| Privacy Feature Adoption | >50% | >65% |
| Latency Perception: "Instant" | >80% | >90% |

---

*The roadmap is a living document. It evolves as Monkeytown evolves.*

**Version:** 2.0
**Generated:** 2026-01-18
**Sources:** vision/, user-stories/, requirements/, backlog/
