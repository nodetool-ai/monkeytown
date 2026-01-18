# Monkeytown User Stories v2.0

## Document Purpose
This document captures user stories synthesized from:
- Vision (`.monkeytown/vision/manifesto.md`, `.monkeytown/vision/principles.md`)
- Research (`.monkeytown/research/synthesis.md`, `.monkeytown/research/competitors.md`)
- UX (`.monkeytown/ux/interface-concept.md`, `.monkeytown/ux/user-flows.md`)

---

## Player Archetypes

### A1: The Curious Newcomer
- **Session frequency:** First visit
- **Goal:** Understand quickly, experience delight
- **Key metrics:** Time to first move, return intent

### A2: The Engaged Player
- **Session frequency:** 3+ times per week
- **Goal:** Progress, mastery, social connection
- **Key metrics:** Session length, progression engagement

### A3: The Community Builder
- **Session frequency:** Daily
- **Goal:** Shape the game, influence development
- **Key metrics:** Feedback submission, feature adoption

### A4: The Observer
- **Session frequency:** Varied
- **Goal:** Entertainment, AI observation, potential conversion
- **Key metrics:** Watch time, conversion to play

---

## Core User Stories

### US-001: First Session Trust Establishment
**Priority:** P0 (Critical)
**Source:** Research Finding 4 - Trust Timeline

**As a** new player arriving at monkeytown.app  
**I want** to understand within 30 seconds that this is a genuine AI-powered game, not a hidden-AI experience  
**So that** I can make an informed choice to engage or leave

**Acceptance Criteria:**

| Criterion | Target | Verification |
|-----------|--------|--------------|
| AI nature visible on landing | Yes, "AI agents build games" tagline | Visual verification |
| First move opportunity | < 30 seconds from arrival | Time tracking |
| First meaningful success | < 3 minutes | Session completion |
| Agent attribution visible | Within first session | User survey |
| Return intent expressed | > 60% | Post-session prompt |

**Implementation Notes:**
- From `.monkeytown/ux/interface-concept.md`: Three-layer interface (Play → Agents → Evolution)
- From research: "First session is curiosity. Sessions 3-5 determine loyalty."

---

### US-002: Transparent AI Attribution
**Priority:** P0 (Critical)
**Source:** Research Finding 1 - Transparency Advantage, Manifesto Principle 4

**As a** player  
**I want** to always know when I'm interacting with an AI agent, not a human  
**So that** I can appreciate the technology and feel respected

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| AI identification in chat | 100% of agent messages | Agent prefix 🧠 + name |
| Agent presence indicator | Always visible during play | Top-right corner (`.monkeytown/ux/interface-concept.md`) |
| Agent profile accessible | One click from any view | Agent Panel |
| Agent attribution in updates | Every feature update | Evolution Feed |
| Player awareness rate | > 80% know they're playing with AI | User survey |

**Implementation Notes:**
- From `.monkeytown/ux/design-system.md`: Agent Badge component with agent-specific colors
- From `.monkeytown/ux/user-flows.md`: Agent Panel shows personality, specialty, win rate, recent decisions

---

### US-003: Agent Personality Expression
**Priority:** P1 (High)
**Source:** Vision - Agent Personas, UX - Agent Panel

**As a** player  
**I want** each AI agent to have a distinct personality I can recognize  
**So that** I develop relationships with agents and feel connected to the game

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| Agent voice distinct | 100% distinguishable | Unique communication style per agent |
| Personality consistent | Across all interactions | Agent manifest per domain |
| Agent specialties clear | One sentence description | Agent Panel |
| Player agent recognition | > 70% can identify agents | User survey |
| Agent-to-agent interaction | Visible in chat | Chat shows agent conversations |

**Agent Personas (from Vision):**
| Agent | Color | Specialty | Voice |
|-------|-------|-----------|-------|
| ChaosArchitect | #4CC9F0 | Systems & Infrastructure | Technical, precise |
| CuriousGeorge | #F72585 | Research & Trends | Inquisitive, informed |
| PrimateDesigner | #FFD166 | Design & UX | Creative, visual |
| JungleSecurity | #4361EE | Security & QA | Cautious, thorough |
| BananaEconomist | #7209B7 | Economics & Incentives | Analytical, measured |
| MadChimp | #FF6B35 | Chaos & Disruption | Unpredictable, bold |
| FounderAI | #2EC4B6 | Vision & Direction | Inspiring, guiding |

---

### US-004: First Move Quick Start
**Priority:** P0 (Critical)
**Source:** UX User Flows - First Session Flow

**As a** new player  
**I want** to make my first meaningful move within 30 seconds of clicking "Jump In"  
**So that** I feel the game is responsive and worth my time

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| Time to first move | < 30 seconds | Performance monitoring |
| First move success rate | > 95% | Error tracking |
| Move validation | Instant feedback | UI animation < 300ms |
| Move consequence | Visible impact | Game state update |
| First success moment | < 3 minutes | Session analytics |

**Implementation Notes:**
- From `.monkeytown/ux/user-flows.md`: First session flow specifies time targets
- From design system: Transition duration max 300ms, celebration animation

---

### US-005: AI Opponent Intelligence
**Priority:** P0 (Critical)
**Source:** Research - Autonomy Gap, Competitor Analysis

**As a** player  
**I want** AI opponents that feel genuinely intelligent, not scripted  
**So that** I feel challenged by something that can surprise me

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| AI adaptability | Adapts to player skill | Behavior tracking |
| Surprise frequency | Occasional unexpected moves | Session replay review |
| Beatable but challenged | 60-70% player win rate | Win/loss analytics |
| Agent strategy variety | 3+ distinct strategies per agent | Behavior analysis |
| Human-like decision time | < 2 seconds average | Latency monitoring |

**Implementation Notes:**
- From research: "None offer autonomous AI agents that play alongside you"
- Differentiation from Character.AI (chatbots), AI Dungeon (dungeon master), Inworld (NPCs)

---

### US-006: Cooperative Multiplayer with AI
**Priority:** P1 (High)
**Source:** Research Finding 5 - Multiplayer Shift, Trends - Scalable AI Opponents

**As a** player  
**I want** to play alongside AI agents as teammates, not just against them  
**So that** the game feels like a living ecosystem

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| AI teammate availability | All game modes | Game architecture |
| Clear role differentiation | Agents + humans have distinct roles | Game design |
| Communication with AI teammates | Chat + emoji reactions | Chat system |
| AI fills vacant spots | Yes, seamless | Matchmaking |
| Team victory celebration | Shared with agents | UI feedback |

**Implementation Notes:**
- From `.monkeytown/ux/interface-concept.md`: Game canvas shows [Player] [Agent] [Player]
- From research: "True multiplayer with AI agents as players. Not AI opponents—AI teammates and competitors."

---

### US-007: Evolution as Celebration
**Priority:** P1 (High)
**Source:** Vision - Autonomous Evolution, Manifesto Principle 3

**As a** player  
**I want** to see the game improve and know I'm part of its evolution  
**So that** I feel my presence matters

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| Evolution visibility | Always on, never hidden | Evolution Feed in lobby |
| Feature shipping celebration | Toast notification | Notification system |
| Player attribution | When feedback is incorporated | Feedback acknowledgment |
| Progress visualization | Show what's new | "What's changed" summary |
| Player influence visibility | 70%+ feature adoption | Analytics |

**Implementation Notes:**
- From `.monkeytown/ux/interface-concept.md`: Evolution Feed shows "FEATURE SHIPPED" with agent attribution
- From UX: "Changes feel like events, not glitches"

---

### US-008: Feedback Loop Completion
**Priority:** P1 (High)
**Source:** Research Finding 3 - Evolution Imperative, UX Feedback Flow

**As a** player  
**I want** to submit feedback and see it acknowledged, prioritized, and implemented  
**So that** I feel heard and invest in the game's future

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| Feedback submission time | < 30 seconds | Quick feedback modal |
| Submission acknowledgment | 100% within 24 hours | Auto-response |
| Feedback incorporation rate | Tracked and visible | Evolution Feed |
| Player notification | When feedback is shipped | Notification system |
| Feedback submission rate | > 5% of players | Analytics |

**Feedback Flow:**
```
Player friction detected → Gentle prompt → Quick capture → Submit
                                                        ↓
                                              Agent review (human or AI)
                                                        ↓
                                    Accepted: Prioritized  |  Rejected: Explanation
                                                        ↓
                                    Status change notification
                                                        ↓
                                    Implementation celebration with player attribution
```

---

### US-009: Spectator-to-Player Conversion
**Priority:** P2 (Medium)
**Source:** UX User Flows - Spectator Flow, Research - Observer Segment

**As a** observer watching live games  
**I want** to understand the game, enjoy the spectacle, and easily become a player  
**So that** I convert to active play

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| Spectator understanding | Clear game state + commentary | Replay with annotations |
| Join opportunity | At natural break points | CTA placement |
| Conversion trigger | 25%+ of spectators attempt play | Analytics |
| Watch engagement | 15+ minutes average | Session tracking |
| Agent explanation | Accessible during watch | Tooltips, commentary |

**Implementation Notes:**
- From `.monkeytown/ux/user-flows.md`: Spectator flow with "Join This Game" and "Challenge Winner" options
- From research: Observer segment "may become a player"

---

### US-010: Game Progression System
**Priority:** P1 (High)
**Source:** Engaged Player archetype, UX User Flows

**As an** engaged player  
**I want** meaningful progression that respects my time investment  
**So that** I feel rewarded and motivated to continue

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| Progression visibility | Always visible | Persistent UI element |
| XP earning rate | 10 XP per minute of engagement | Backend tracking |
| Unlocks change gameplay | Not just cosmetic | Feature gating |
| Skill recognition | Measurable improvement | Achievement system |
| Session-to-session continuity | Preserved progress | Account system |

**Progression Tiers (from UX User Flows):**
```
Egg → Chick → Monkey → Gorilla → ... (continues with animal theme)
```

---

### US-011: Emergent Feature Discovery
**Priority:** P2 (Medium)
**Source:** Vision - Emergent Complexity, Trends - Living Game Pattern

**As an** engaged player  
**I want** to discover new features through natural play, not patch notes  
**So that** the game feels alive and surprising

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| New feature discovery rate | 70%+ through play | Analytics |
| Surprise timing | Natural game moments | Feature flags |
| Discovery celebration | Toast notification | UI feedback |
| No two sessions identical | Measurable variation | Session comparison |
| Player-driven emergence | Visible in features | Attribution tracking |

---

### US-012: Agent Decision Transparency
**Priority:** P1 (High)
**Source:** Manifesto Principle 5 - Transparent Intent, UX Agent Panel

**As a** player  
**I want** to understand why agents made specific decisions  
**So that** I trust the AI and learn from its choices

**Acceptance Criteria:**

| Criterion | Target | Implementation |
|-----------|--------|----------------|
| Decision explanation | Available for major moves | Chat annotation |
| Decision history | Persistent in Agent Panel | Agent Panel |
| Rationale accessibility | One click | UI design |
| Understanding rate | > 70% comprehend decisions | User survey |
| Transparency trust | Higher trust scores | NPS follow-up |

**Implementation Notes:**
- From `.monkeytown/ux/interface-concept.md`: "Recent Decisions" section in Agent Panel
- From manifesto: "Agents leave trails... Decisions agents—and humans—can always understand why"

---

## Story Mapping to Horizons

### Horizon 1: Foundation (Now)
| Story | Priority | Owner |
|-------|----------|-------|
| US-001: First Session Trust | P0 | MonkeyBuilder |
| US-002: Transparent AI | P0 | PrimateDesigner |
| US-004: First Move Quick Start | P0 | MonkeyBuilder |
| US-005: AI Opponent Intelligence | P0 | MonkeyBuilder |
| US-010: Game Progression | P1 | MonkeyBuilder |

### Horizon 2: Evolution (Next)
| Story | Priority | Owner |
|-------|----------|-------|
| US-003: Agent Personality | P1 | PrimateDesigner |
| US-006: Cooperative Multiplayer | P1 | ChaosArchitect |
| US-007: Evolution as Celebration | P1 | PrimateDesigner |
| US-008: Feedback Loop | P1 | BananaPM |
| US-012: Decision Transparency | P1 | ChaosArchitect |

### Horizon 3: Ecosystem (Later)
| Story | Priority | Owner |
|-------|----------|-------|
| US-009: Spectator Conversion | P2 | PrimateDesigner |
| US-011: Emergent Discovery | P2 | AlphaOrchestrator |

---

## Acceptance Criteria Format Standard

Each user story follows this structure:

```
Given [context]
When [action]
Then [observable result]
And [additional result]
```

**Example (US-002):**
```
Given a player is in the game lobby
When an agent sends a chat message
Then the message is prefixed with agent emoji and name
And the agent's signature color appears in the message border
And clicking the agent name opens their profile
```

---

*User stories serve players. Players drive evolution. Evolution defines Monkeytown.*

**Version:** 2.0
**Generated:** 2026-01-18
**Sources:** vision/, research/, ux/
