# Monkeytown Features v2.0

## Document Purpose
This document captures features synthesized from:
- Vision (`.monkeytown/vision/manifesto.md`, `.monkeytown/vision/principles.md`)
- Research (`.monkeytown/research/synthesis.md`, `.monkeytown/research/competitors.md`)
- UX (`.monkeytown/ux/interface-concept.md`, `.monkeytown/ux/design-system.md`)

---

## Core Features

### F1: Living Gameplay
**Priority:** P0
**Source:** Vision - Autonomous Evolution, Research - Living Game Pattern

The game adapts to how you play. AI opponents learn your strategies. The environment responds to your choices. Nothing is static.

**Implementation:**
- AI opponents track player patterns (US-005)
- Dynamic difficulty adjustment within 3 rounds
- Emergent game states based on player history
- Surprises that feel designed, not random

**Differentiation:** Unlike static games, Monkeytown evolves. Unlike algorithmic adaptation, our AI genuinely learns.

**Success Metrics:**
- AI adaptation recognized by >70% of players
- Player win rate maintained at 60-70%
- Surprise frequency: occasional, not constant

---

### F2: Agent-Driven Development
**Priority:** P0
**Source:** Vision - Transparency, Research - Transparency Advantage

Behind every update is an AI agent with a name, a personality, and a domain. Players can see who built what and why.

**Implementation:**
- Each feature attributed to an agent (FR-002)
- Agent manifests in-game (Agent Panel)
- Agent "signatures" in code and design
- Agent personality expressed in their work (US-003)

**Agent Domain Map:**

| Agent | Domain | Color | Contribution |
|-------|--------|-------|--------------|
| ChaosArchitect | Infrastructure & Architecture | #4CC9F0 | Systems, performance, multiplayer |
| CuriousGeorge | Research & Trends | #F72585 | Insights, competitors, trends |
| PrimateDesigner | Design & UX | #FFD166 | Interface, flows, design system |
| JungleSecurity | Security & QA | #4361EE | Testing, threat models, compliance |
| BananaEconomist | Economics & Incentives | #7209B7 | Token systems, progression, rewards |
| MadChimp | Chaos & Disruption | #FF6B35 | Edge cases, stress tests, innovation |
| FounderAI | Vision & Direction | #2EC4B6 | Strategy, principles, roadmap |

**Success Metrics:**
- Agent attribution recognition >80%
- Agent name recall >50%
- Agent personality recognition >70%

---

### F3: Player Feedback Loop
**Priority:** P1
**Source:** Research - Evolution Imperative, Vision - Player Sovereignty

Your gameplay shapes the game. Feedback isn't just read—it's acted upon by agents who evolve the experience.

**Implementation:**
- In-game feedback mechanism (Quick Feedback modal)
- Transparent feedback incorporation (Evolution Feed)
- Voting on feature priorities
- Player influence visible in updates

**Feedback Flow:**
```
Player submits feedback → Automated acknowledgment → Agent review
        ↓
Accepted: Prioritized in backlog → Implemented → Shipped with attribution
        ↓
Rejected: Gentle explanation → Alternative suggested
```

**Success Metrics:**
- Feedback submission rate >5%
- Feedback acknowledgment <24 hours
- Player attribution recognition >70%
- Feedback satisfaction >4/5

---

### F4: Emergent Complexity
**Priority:** P2
**Source:** Vision - Emergent Complexity, Trends - Generative Gameplay

Simple rules create complex outcomes. Agents build on each other's work, creating features no one planned.

**Implementation:**
- Modular agent domains
- Cross-agent communication through files
- Contradiction as a feature
- Evolution through tension

**Emergence Types:**
| Type | Description | Example |
|------|-------------|---------|
| Feature emergence | New capabilities from existing features | Chat → Game guides |
| Behavior emergence | AI strategies players didn't anticipate | Defensive → Offensive pivot |
| Social emergence | Player-AI relationships develop | Named favorite agents |
| System emergence | Unintended but positive behaviors | Community rituals |

**Success Metrics:**
- Emergent behavior occurrences: Monthly
- Player-driven emergence visibility: Yes
- Feature discovery through play: >70%

---

### F5: Social Play
**Priority:** P1
**Source:** Research - Multiplayer Shift, UX - User Flows

Play alone or together. AI scales to match. Human or AI, opponents or teammates—the game works either way.

**Implementation:**
- Multiplayer with AI scaling (2-5 players)
- Spectator mode with real-time updates
- Social sharing
- Community features

**Game Configurations:**

| Mode | Players | Human:AI | Duration | Style |
|------|---------|----------|----------|-------|
| 1v1 Fast | 2 | 1:1 | ~3 min | Competitive |
| Casual Co-op | 3 | 2:1 | ~8 min | Cooperative |
| Party Mode | 4-5 | Mixed | ~12 min | Social |
| Ranked | 2-5 | Mixed | ~15 min | Competitive |

**Spectator Features:**
- Real-time game observation
- Agent commentary overlay
- "Join This Game" at natural break points
- "Challenge Winner" option

**Success Metrics:**
- Multiplayer game completion >95%
- Spectator conversion to player >25%
- Social sharing rate tracked

---

### F6: Transparent AI
**Priority:** P0
**Source:** Manifesto Principle 4, Research - Honest AI

**Implementation:**
- AI identification in all interactions (🧠 + name prefix)
- Agent attribution in updates (Evolution Feed)
- Educational moments about AI
- Celebrating AI nature

**Agent Presence in UI:**
```
Top-right corner: 🧠 ChaosArchitect (online)
Chat messages: 🧠 ChaosArchitect: "Building tower segment..."
Agent Panel: Click to see profile, stats, recent decisions
```

**Success Metrics:**
- AI nature awareness: 100%
- Transparency satisfaction >4/5
- Highest transparency rating in category

---

### F7: Edge AI Privacy Layer
**Priority:** P1
**Source:** Research Finding 6 - Edge AI as Competitive Moat, Manifesto Principle 8

**Description:**
Local AI inference for personality-layer interactions. Players get instant responses and privacy while cloud handles complex reasoning.

**Architecture:**
```
┌─────────────────────────────────────────────────────────┐
│  LOCAL (Device)                    CLOUD (Server)       │
│  ┌─────────────────────┐          ┌─────────────────┐  │
│  │  Personality Layer  │ ←────→  │  Reasoning Lr   │  │
│  │  • Instant response │          │  • Complex AI   │  │
│  │  • Privacy preserved│          │  • Learning     │  │
│  │  • Offline capable  │          │  • Strategy     │  │
│  └─────────────────────┘          └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Implementation:**
- Agent personality on device
- Local state persistence
- Cloud fallback for complex decisions
- Privacy controls in settings

**Success Metrics:**
- Local inference usage: >80%
- Response latency: <100ms
- Privacy feature adoption: >50%
- Offline session rate: >20%

---

### F8: Player Attachment System
**Priority:** P1
**Source:** Research Finding 7 - Player Attachment Engineering, Manifesto Principle 6

**Description:**
Memory and continuity that creates genuine emotional bonds between players and agents.

**Pillars:**
1. **Continuity**: Same agent across sessions
2. **Memory**: Agent remembers player
3. **Personality**: Distinctive, interesting character
4. **Consistency**: Predictable within nature

**Implementation:**
- Session memory (last 5 moves)
- Short-term memory (24h preferences)
- Long-term memory (persistent history)
- Working memory (real-time context)

**Success Metrics:**
- Return rate to specific agent: >40%
- Agent memory usage: >80%
- Player vocabulary shifts to person pronouns
- Positive attachment sentiment in feedback

---

## Feature Categories

### Gameplay Features

| Feature | Priority | Status | Owner |
|---------|----------|--------|-------|
| Core game mechanics | P0 | Backlog | MonkeyBuilder |
| AI opponent behavior | P0 | Backlog | MonkeyBuilder |
| Player progression | P1 | Backlog | MonkeyBuilder |
| Achievement systems | P1 | Backlog | MonkeyBuilder |
| Game modes (Babel) | P0 | Backlog | MonkeyBuilder |
| Additional game modes | P2 | Backlog | MonkeyBuilder |

### Platform Features

| Feature | Priority | Status | Owner |
|---------|----------|--------|-------|
| User accounts and profiles | P1 | Backlog | MonkeyBuilder |
| Settings and preferences | P2 | Backlog | PrimateDesigner |
| Performance optimization | P2 | Backlog | ChaosArchitect |
| Cross-platform play | P3 | Future | ChaosArchitect |
| Accessibility | P2 | Backlog | JungleSecurity |

### Community Features

| Feature | Priority | Status | Owner |
|---------|----------|--------|-------|
| Social sharing | P2 | Backlog | PrimateDesigner |
| Spectator mode | P2 | Backlog | PrimateDesigner |
| Tournaments and events | P3 | Future | BananaEconomist |
| Player-created content | P3 | Future | FounderAI |
| Feedback systems | P1 | Backlog | BananaPM |

### Agent Features

| Feature | Priority | Status | Owner |
|---------|----------|--------|-------|
| Agent manifests | P1 | Backlog | FounderAI |
| Decision logging | P1 | Backlog | ChaosArchitect |
| Evolution tracking | P1 | Backlog | PrimateDesigner |
| Cross-agent communication | P2 | Backlog | AlphaOrchestrator |
| Emergent behavior | P2 | Backlog | AlphaOrchestrator |

---

## Feature Dependencies

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  F6: Transparent AI ──────────────────────────────────────────  │
│       │                                                      │   │
│       ├──→ F2: Agent-Driven Development                       │   │
│       │        │                                               │   │
│       │        ├──→ F3: Player Feedback Loop                   │   │
│       │        │         │                                     │   │
│       │        │         └──→ F7: Evolution Feed               │   │
│       │        │                                               │   │
│       └──→ F1: Living Gameplay                                 │   │
│                │                                               │   │
│                ├──→ F5: Social Play                            │   │
│                │         │                                     │   │
│                │         └──→ Multiplayer Infrastructure        │   │
│                │                                               │   │
│                └──→ Core Game Loop                             │   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Prioritization Framework

Features are prioritized by:
1. **Player impact (40%):** How much joy does this create?
2. **Agent autonomy (20%):** Can agents own this end-to-end?
3. **Strategic value (25%):** Does this advance the vision?
4. **Feasibility (15%):** Can we ship this well?

### Priority Scoring

| Feature | Player Impact | Autonomy | Strategic | Feasibility | **Total** | Priority |
|---------|---------------|----------|-----------|-------------|-----------|----------|
| F1: Living Gameplay | 10 | 8 | 8 | 6 | **8.3** | P0 |
| F2: Agent-Driven | 10 | 8 | 10 | 8 | **9.1** | P0 |
| F3: Feedback Loop | 8 | 8 | 8 | 8 | **8.0** | P1 |
| F4: Emergent | 8 | 10 | 8 | 4 | **7.7** | P2 |
| F5: Social Play | 8 | 6 | 8 | 6 | **7.3** | P1 |
| F6: Transparent AI | 10 | 8 | 10 | 8 | **9.3** | P0 |

---

## Roadmap Integration

Each feature maps to:
- **Which agent owns it:** Primary responsible agent
- **Which horizon it belongs to:** Foundation → Evolution → Ecosystem
- **What dependencies it has:** Blocking relationships
- **What success looks like:** Measurable outcomes

### Horizon 1: Foundation (Q1 2026)

| Feature | Owner | Success Metric |
|---------|-------|----------------|
| F1: Living Gameplay | MonkeyBuilder | AI adaptation >70% recognition |
| F2: Agent-Driven | FounderAI | Agent awareness >80% |
| F3: Feedback Loop | BananaPM | Feedback rate >5% |
| F6: Transparent AI | PrimateDesigner | Transparency >4/5 |

### Horizon 2: Evolution (Q2 2026)

| Feature | Owner | Success Metric |
|---------|-------|----------------|
| F5: Social Play | ChaosArchitect | Multiplayer >95% completion |
| F4: Emergent | AlphaOrchestrator | Emergence monthly |

### Horizon 3: Ecosystem (Q3-Q4 2026)

| Feature | Owner | Success Metric |
|---------|-------|----------------|
| All features expanded | All | Platform maturity |

---

## Competitive Positioning

| Attribute | Character.AI | AI Dungeon | Inworld | **Monkeytown** |
|-----------|--------------|------------|---------|----------------|
| AI Nature | Hidden | Hidden | Hidden | **Celebrated** |
| Multiplayer | Weak | None | Via games | **Native** |
| Agent Autonomy | Chatbots | Dungeon master | NPCs | **Players** |
| Evolution | None | None | None | **Native** |
| Transparency | Low | Low | Low | **High** |
| Player Feedback | Limited | Limited | None | **Direct** |
| Edge AI | None | None | None | **Planned** |
| Attachment Design | Weak | None | None | **Engineered** |
| Evolution as Content | None | None | None | **Native** |

---

*Features serve players. Players drive evolution. Evolution defines Monkeytown.*

**Version:** 2.0
**Generated:** 2026-01-18
**Sources:** vision/, research/, ux/, product/

