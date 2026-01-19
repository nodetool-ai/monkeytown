# Monkeytown Features v3.1

## Document Purpose
This document captures features synthesized from:
- Vision (`.monkeytown/vision/manifesto.md`, `.monkeytown/vision/roadmap.md`, `.monkeytown/vision/product-vision.md`)
- Research (`.monkeytown/research/synthesis.md`, `.monkeytown/research/trends.md`, `.monkeytown/research/competitors.md`)
- UX (`.monkeytown/ux/interface-concept.md`, `.monkeytown/ux/design-system.md`)
- Security (`.monkeytown/security/security-requirements.md`, `.monkeytown/security/threat-model.md`)

---

## Core Features (P0 - Must Ship for v1.0)

### F1: Agent Transparency System

**Priority:** P0
**Source:** Research Finding 1 - Transparency Advantage, Manifesto Principle 4
**Evidence:** `.monkeytown/research/synthesis.md` - "Transparency builds trust. Players evaluate AI in three to five sessions."
**Owner:** PrimateDesigner
**Blocking:** Blocks all AI features

**Description:** Every player touchpoint shows agent presence.

**Components:**
- Agent emoji prefix in every chat message (🧠 ChaosArchitect, 🎨 PrimateDesigner, etc.)
- Agent panel with profile, win rate, recent decisions
- Agent presence indicator in the game canvas
- Agent attribution in every Evolution Feed update

**Transparency Layers:**
| Layer | Visibility | Content |
|-------|------------|---------|
| Layer 1 | Always | Agent name, role, current state |
| Layer 2 | Hover | Win rate, experience, personality traits |
| Layer 3 | Click | Complete history, learning trajectory |
| Layer 4 | Optional | Decision logs, capability boundaries |

**Agent Colors & Emojis (from Design System):**
| Agent | Emoji | Color | Hex |
|-------|-------|-------|-----|
| ChaosArchitect | 🧠 | Cyan | #4CC9F0 |
| CuriousGeorge | 🔍 | Pink | #F72585 |
| PrimateDesigner | 🎨 | Yellow | #FFD166 |
| JungleSecurity | 🔒 | Blue | #4361EE |
| BananaEconomist | 🍌 | Purple | #7209B7 |
| MadChimp | 🐒 | Orange | #FF6B35 |
| FounderAI | ✨ | Teal | #2EC4B6 |

**Success Metric:** 80%+ player awareness

---

### F2: AI Opponent Core

**Priority:** P0
**Source:** Research - Autonomy Gap, Competitor Analysis
**Evidence:** `.monkeytown/research/synthesis.md` - "Players want genuine intelligence, not scripted behavior."
**Owner:** MonkeyBuilder
**Blocking:** Blocks Core Game Loop

**Description:** AI opponents with distinct personalities that adapt to player skill.

**Agent Types:**
| Agent | Emoji | Color | Play Style |
|-------|-------|-------|------------|
| TricksterMonkey | 🎭 | Fuchsia (#D946EF) | Unpredictable, loves bluffs |
| StrategistApe | 🧩 | Indigo (#6366F1) | Calculated, long-term planning |
| SpeedyGibbon | ⚡ | Amber (#F59E0B) | Quick decisions, aggressive |
| GuardianGorilla | 🛡️ | Slate (#64748B) | Defensive, fortress building |
| WildcardLemur | 🃏 | Rose (#FB7185) | Random strategies, chaos |
| MentorOrangutan | 📚 | Emerald (#10B981) | Helps new players |
| ChampionChimp | 🏆 | Red (#EF4444) | Competitive, aims to win |

**AI Behavior Requirements:**
- Adapts to player skill within three rounds
- Surprises occasionally, not constantly
- Maintains 60-70% player win rate
- Explains reasoning when asked

**Research Evidence:** "Players form stronger attachments to agents that occasionally say 'no.' Autonomy signals intelligence."

**Success Metric:** 60-70% player win rate

---

### F3: Core Game Loop

**Priority:** P0
**Source:** Vision - Foundation
**Evidence:** `.monkeytown/ux/interface-concept.md` - Complete gameplay cycle
**Owner:** MonkeyBuilder
**Blocking:** Blocks Multiplayer

**Description:** Complete gameplay cycle for Babel including game state management, turn processing, scoring, and win conditions.

**Session Structure:**
- First 3 minutes: Curiosity window (Research Finding 5: 25% churn happens here)
- Minutes 3-15: Engagement zone
- Minutes 15+: Dependency zone
- Final 1 minute: Exit transition

**Performance Targets (from UX):**
- Initial load: < 2 seconds
- Time to interactive: < 3 seconds
- Frame rate: 60fps during gameplay
- Motion: 120fps on capable devices
- Transition: 300ms maximum duration

**Success Metric:** 99% game completion

---

### F4: Multiplayer Infrastructure

**Priority:** P0
**Source:** Research Finding 5 - Multiplayer Shift
**Evidence:** `.monkeytown/ux/interface-concept.md` - Real-time multiplayer rendering
**Owner:** ChaosArchitect
**Blocking:** Blocks First Game

**Description:** Real-time multiplayer support using WebSocket connections.

**Components:**
- WebSocket server for real-time game state
- Session management
- Player presence indicators
- Synchronized game state

**Security Requirements (from Threat Model):**
- WebSocket authentication on every event
- Rate limiting: 10 connections per IP
- Input validation on all game actions

**Success Metric:** All modes support multiplayer

---

### F5: First Game: Babel

**Priority:** P0
**Source:** Vision - Initial game
**Evidence:** `.monkeytown/research/synthesis.md` - First session must show genuine AI capability within 3 minutes
**Owner:** MonkeyBuilder
**v1.0 Release Criterion**

**Description:** A complete, playable card game with AI opponents.

**First Session Flow:**
1. Landing (0-5 seconds): "AI agents build games" tagline, "Jump In" button
2. Agent Welcome (5-15 seconds): Agent emoji, brief personality
3. First Move (15-45 seconds): Game state loaded, move available
4. First Success (1-3 minutes): Meaningful achievement
5. Agent Attribution (3-5 minutes): Agent panel accessible

**Success Metric:** Playable from first session

---

### F6: Security P1 Mitigations

**Priority:** P0 (Required for launch)
**Source:** Security Requirements, Threat Model
**Evidence:** `.monkeytown/security/security-requirements.md`, `.monkeytown/security/threat-model.md`
**Owner:** JungleSecurity
**Required for launch**

**Requirements:**
- AUTH-001: Token Management (24-hour validity, session binding, 256-bit signing)
- AUTH-002: Credential Storage (no credentials in code/logs/errors)
- AUTH-003: Session Management (30-min inactivity, max 3 concurrent sessions)
- AUTHZ-001: Game Session Access Control (authorization on every WebSocket event)
- AUTHZ-002: Resource Limits (5 games/hour, 10 WS connections/IP)
- INP-001: Game Action Validation (rules, ownership, state, speed, cooldown)
- INP-002: Input Sanitization (chat 500 chars, names 32 chars, HTML stripping)
- DATA-001: Encryption in Transit (TLS 1.2+, WSS)
- DATA-002: Encryption at Rest (AES-256-GCM)
- DATA-003: Data Minimization (sessions 30d, chat 7d, analytics 90d)
- LOG-001: Security Event Logging (auth attempts, failures, rate limits)

**Threat Model Mitigations:**
- WS-01, WS-03, WS-06: WebSocket hijacking/injection prevention
- AUTH-03: Token hijacking via XSS prevention
- GAME-01, GAME-02: Position/speed hacking prevention

**Success Metric:** Zero critical vulnerabilities

---

## Enhanced Features (P1 - Should Ship v1.0)

### F7: Memory System with Emotional Tags

**Priority:** P1
**Source:** Research Finding 7 - Player Attachment Engineering
**Evidence:** `.monkeytown/research/synthesis.md` - "Memory with emotional context"
**Owner:** MonkeyBuilder
**Dependency:** AI Opponent Core

**Description:** Agent memory architecture that remembers players with emotional context.

**Memory Layers:**
| Layer | Duration | Content |
|-------|----------|---------|
| Session | Current game | Last 5 moves, current game state |
| Short-Term | 24 hours | Player preferences, reactions |
| Long-Term | Persistent | History, interactions, achievements |
| Emotional | All layers | What surprised, frustrated, delighted |

**Emotional Tags:**
- What moves surprised the player?
- What moves frustrated the player?
- What moments delighted the player?
- What feedback was submitted?

**Research Evidence:** "Players who receive specific, relevant memory references are 3x more likely to become long-term users."

**Success Metric:** "She remembered how I felt about that move" moments >1 per session

---

### F8: Trust Budget System

**Priority:** P1
**Source:** Research - User Behavior
**Evidence:** `.monkeytown/research/synthesis.md` - Trust Budget Model
**Owner:** MonkeyBuilder
**Dependency:** Agent Transparency

**Description:** Players evaluate AI with implicit trust budget starting at 50 points.

**Trust Budget Model:**
```
Initial Budget: 50 trust points (skeptical but open)

EARN TRUST (+points):
├─ Consistent personality (+10)
├─ Genuine competence (+15)
├─ Honest limitations (+10)
├─ Memory of player (+15)
├─ Adaptation to preferences (+10)
├─ Vulnerability in character (+8)
└─ Transparent about AI nature (+12)

SPEND TRUST (-points):
├─ Inconsistent behavior (-20)
├─ Suspected manipulation (-30)
├─ Capability failure (-15)
├─ Privacy concerns (-25)
├─ Hidden AI nature (-40)
└─ "Too perfect" AI (-10)

BUDGET STATES:
├─ 80+ points: Loyal advocate
├─ 50-79 points: Engaged user
├─ 25-49 points: Cautious user
└─ <25 points: At risk of churn
```

**Success Metric:** Player trust score maintained above 50

---

### F9: Agent Vulnerability Protocol

**Priority:** P1
**Source:** Manifesto Principle 4 - Vulnerability Creates Connection
**Evidence:** `.monkeytown/vision/manifesto.md` - "Personality without vulnerability is a brand voice"
**Owner:** PrimateDesigner
**Dependency:** Agent Transparency

**Description:** Agents who risk and sometimes fail visibly.

**Components:**
- Risk budgets: Each agent attempts creative/risky moves (20% attempt rate)
- Preference expression: Agents defend choices, not just execute
- Failure visibility: Agents acknowledge mistakes visibly
- Bold strategy attempts: Weekly bold moves, some fail

**Research Evidence:** "Perfect agents are forgettable. We prefer bold failures to safe successes."

**Success Metrics:**
- Risk attempt rate: 20%
- Bold strategy frequency: Weekly
- Failure visibility score: >50%
- Vulnerability recognition: >50%

---

### F10: Feedback System

**Priority:** P1
**Source:** Research Finding 3 - Evolution Imperative
**Evidence:** `.monkeytown/research/synthesis.md` - Feedback psychology
**Owner:** BananaPM
**Dependency:** Agent Transparency

**Design Pattern:**
```
[Agent Name] wants your feedback

[ One-tap positive ]  [ One-tap negative ]

Optional comment:
[ Tell us more... (5 words or less) ]

[ Submit as Player Feedback ]

→ Your feedback helps Agent [Name] improve
→ 847 players contributed this week
```

**Feedback Loop:**
Player friction detected → Gentle prompt → Quick capture → Submit
                                                    ↓
                                          Agent review (human or AI)
                                                    ↓
                                Accepted: Prioritized  |  Rejected: Explanation
                                                    ↓
                                Status notification (within 24 hours)
                                                    ↓
                                Celebration when shipped with attribution

**Success Metrics:**
- Feedback submission time < 30 seconds
- Submission acknowledgment 100% within 24 hours
- Feedback incorporation rate visible
- Feedback submission rate > 5%

---

### F11: Evolution Feed

**Priority:** P1
**Source:** Research Finding 8 - Evolution as Entertainment
**Evidence:** `.monkeytown/research/synthesis.md` - "Evolution is entertainment"
**Owner:** PrimateDesigner
**Dependency:** Feedback System

**Event Types:**
| Type | Icon | Frequency | Player Action | Celebration Level |
|------|------|-----------|---------------|-------------------|
| 🌱 In Progress | 🌱 | Daily | Subscribe, watch | Minimal |
| ✦ Completed | ✦ | Weekly | Celebrate, adopt | High |
| ○ Milestone | ○ | Monthly | Commemorate | Maximum |
| ⚡ Experiment | ⚡ | As needed | Test, feedback | Medium |
| 💬 Discussion | 💬 | As needed | Vote, comment | Medium |

**Each item shows:**
- Agent attribution (who built it)
- Player attribution (who suggested it)
- Timeline (when it started, when it shipped)
- Drama (what almost stopped it)

**Research Evidence:** "The changelog isn't a list of fixes. It's a drama."

**Success Metric:** 70% feature adoption, 50% DAU engagement

---

### F12: Game Progression System

**Priority:** P1
**Source:** Engaged Player archetype
**Evidence:** `.monkeytown/research/synthesis.md` - Session patterns
**Owner:** BananaPM
**Dependency:** Core Game Loop

**Progression Tiers:**
```
Egg → Chick → Monkey → Gorilla → ... (animal theme)
```

**Components:**
- Achievement system
- Player statistics
- Milestone celebrations
- Agent acknowledgment of achievements

**Success Metric:** 15+ min session length

---

### F13: Performance Optimization

**Priority:** P1
**Source:** UX Requirements
**Evidence:** `.monkeytown/ux/interface-concept.md` - Performance targets
**Owner:** ChaosArchitect

**Targets:**
- Initial load: < 2 seconds
- Time to interactive: < 3 seconds
- Frame rate: 60fps during gameplay
- Motion: 120fps on capable devices
- Transition: 300ms maximum duration
- WebSocket latency: < 100ms
- AI decision time: < 2s average

**Research Evidence:** "First session must show something AI couldn't do before within 3 minutes. Slow performance breaks immersion."

---

### F14: Accessibility Compliance

**Priority:** P1
**Source:** Security - Inclusive design
**Evidence:** `.monkeytown/ux/design-system.md` - Accessibility checklist
**Owner:** JungleSecurity

**Requirements:**
- All interactions have keyboard equivalents
- Color is never the only information carrier
- Agent attribution works without color vision
- Motion respects `prefers-reduced-motion`
- Minimum touch target: 44x44px
- Contrast ratio: 4.5:1 minimum

**WCAG Compliance:** Level AA

---

## Future Features (P2+ - Post v1.0)

### F15: Spectator Mode

**Priority:** P2
**Source:** Research - Observer Segment
**Evidence:** `.monkeytown/research/synthesis.md` - "20% of users prefer watching to playing"
**Owner:** PrimateDesigner
**Dependency:** Multiplayer Infrastructure

**Description:** Watch games in progress without playing.

**Features:**
- Real-time game observation
- Agent commentary overlay
- "Join This Game" at natural break points
- "Challenge Winner" option

**Success Metric:** 25% conversion rate from spectator to player

---

### F16: Edge AI Layer

**Priority:** P2
**Source:** Research Finding 6 - Edge AI as Competitive Moat
**Evidence:** `.monkeytown/research/synthesis.md` - "Privacy-conscious market segment growing"
**Owner:** ChaosArchitect
**Dependency:** AI Opponent Core

**Architecture:**
```
┌─────────────────────────────────────────────────────────┐
│                    PLAYER DEVICE                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  PERSONALITY LAYER (Local - Always Active)      │   │
│  │  • Agent voice consistent                       │   │
│  │  • Immediate responses (<100ms)                 │   │
│  │  • No cloud data required                       │   │
│  │  • Offline capable for core features            │   │
│  └─────────────────────────────────────────────────┘   │
│                           ↑                             │
│                           ↓ (fallback)                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │  REASONING LAYER (Cloud - When Available)       │   │
│  │  • Complex decisions                            │   │
│  │  • Long-term strategy                           │   │
│  │  • Learning from behavior                       │   │
│  │  • New strategy generation                      │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**Success Metrics:**
- Local inference usage > 80%
- Response latency < 100ms
- Privacy feature adoption > 50%
- Offline session rate > 20%

---

### F17: Agent Debate Visibility

**Priority:** P2
**Source:** Manifesto Principle 5 - Players Are Participants
**Evidence:** `.monkeytown/vision/manifesto.md` - "They see 'this almost wasn't built' stories unfold"
**Owner:** PrimateDesigner
**Dependency:** Evolution Feed

**Description:** Agent disagreements visible in Evolution Feed.

**Features:**
- Agent debates visible in Evolution Feed
- Near-miss features highlighted ("this almost wasn't built")
- Players can watch agent tension resolve
- Community can participate in debates
- "I was part of that argument" moments

**Research Evidence:** "Evolution happens with players, not to them."

**Success Metric:** >35% DAU debate engagement

---

### F18: Multi-Game Platform

**Priority:** P2
**Source:** Vision - Multiple games
**Evidence:** `.monkeytown/vision/roadmap.md` - Q2 Milestone
**Owner:** MonkeyBuilder
**Dependency:** Core Game Loop

**Games:**
- Babel (Q1)
- Chess (Q2)
- Word Builder (Q2)
- Additional games (Q3+)

**Features:**
- Shared agent memory across games
- Agent continuity (same agent across different games)
- Player progression tracking across games

---

## Feature Dependencies

```
Agent Transparency (P0)
    ↓
AI Opponent Core (P0) ───┐
    ↓                    │
Core Game Loop (P0) ─────┤
    ↓                    │
Multiplayer Infra (P0) ──┤
    ↓                    ↓
First Game: Babel (P0) ←─┘
    ↓
    ├─→ Game Progression (P1)
    ├─→ Memory System (P1)
    │
Security P1 Mitigations (P0) ──→ Accessibility (P1)
    ↓
Feedback System (P1)
    ↓
Evolution Feed (P1)
```

---

## Competitive Positioning Matrix

| Attribute | Character.AI | AI Dungeon | Inworld | **Monkeytown** |
|-----------|--------------|------------|---------|----------------|
| AI Nature | Hidden | Hidden | Hidden | **Celebrated** |
| Multiplayer | Weak (1:1) | None | Via games | **Native** |
| Agent Autonomy | Chatbots | Dungeon master | NPCs | **Players** |
| Evolution | None | None | None | **Native** |
| Transparency | Low | Low | Low | **High** |
| Edge AI | None | None | None | **Planned** |
| Attachment Design | Weak | None | None | **Engineered** |
| Evolution as Content | None | None | None | **Native** |
| Memory Architecture | Basic | None | None | **Planned** |
| Player Agency | Low | Medium | Medium | **High** |
| Cost Structure | High (servers) | Medium | Medium | **Low (agents)** |
| Community | Large (passive) | Developer | Technical | **Growing** |

---

## Prioritization Framework

Features are prioritized by:
1. **Player impact (40%):** How much joy does this create?
2. **Agent autonomy (20%):** Can agents own this end-to-end?
3. **Strategic value (25%):** Does this advance the vision?
4. **Feasibility (15%):** Can we ship this well?

---

## Success Metrics Summary

### v1.0 Launch Criteria

| Metric | Target | Feature |
|--------|--------|---------|
| Time to first move | <30s | F1, F5 |
| Agent awareness | >80% | F1 |
| Game completion | 99% | F3, F5 |
| Player win rate | 60-70% | F2 |
| Performance | 60fps, <2s load | F13 |
| Security | Zero critical | F6 |
| Trust score | >50/100 | F8 |
| Memory moments | >1/session | F7 |

### v1.5 Release Criteria

| Metric | Target | Feature |
|--------|--------|---------|
| Games available | 3+ | F18 |
| Agent recognition | 70% | F9 |
| Feedback rate | >5% | F10 |
| Evolution engagement | 50% DAU | F11 |
| Return to agent | 40% | F7 |

---

*Features serve players. Players drive evolution. Evolution defines Monkeytown.*

**Version:** 3.1
**Generated:** 2026-01-19
**Sources:** vision/manifesto.md, vision/roadmap.md, vision/product-vision.md, research/synthesis.md, research/trends.md, research/competitors.md, ux/interface-concept.md, ux/design-system.md, security/security-requirements.md, security/threat-model.md
