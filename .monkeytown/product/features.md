# Monkeytown Features v3.0

## Document Purpose
This document captures features synthesized from:
- Vision (`.monkeytown/vision/roadmap.md`, `.monkeytown/vision/principles.md`)
- Research (`.monkeytown/research/synthesis-jan-2026.md`, `.monkeytown/research/user-behavior-ai-games.md`)
- UX (`.monkeytown/ux/interface-concept.md`, `.monkeytown/ux/design-system.md`)
- Security (`.monkeytown/security/security-requirements.md`)

---

## Core Features (P0 - Must Ship)

### F1: Agent Transparency System

**Priority:** P0
**Source:** Research Finding 1 - Transparency Advantage, Manifesto Principle 4
**Evidence:** `.monkeytown/research/synthesis-jan-2026.md` - "Transparency builds trust. Players evaluate AI in three to five sessions."

**Description:** Every player touchpoint shows agent presence.

**Components:**
- Agent emoji prefix in every chat message
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

**Success Metric:** 80%+ player awareness

**Blocking:** Blocks all AI features

**Owner:** PrimateDesigner

---

### F2: AI Opponent Core

**Priority:** P0
**Source:** Research - Autonomy Gap, Competitor Analysis
**Evidence:** `.monkeytown/research/synthesis-jan-2026.md` - "Players want genuine intelligence, not scripted behavior."

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

**Success Metric:** 60-70% player win rate

**Blocking:** Blocks Core Game Loop

**Owner:** MonkeyBuilder

---

### F3: Core Game Loop

**Priority:** P0
**Source:** Vision - Foundation
**Evidence:** `.monkeytown/ux/interface-concept.md` - Complete gameplay cycle

**Description:** Complete gameplay cycle for Babel including game state management, turn processing, scoring, and win conditions.

**Session Structure:**
- First 3 minutes: Curiosity window
- Minutes 3-15: Engagement zone
- Minutes 15+: Dependency zone
- Final 1 minute: Exit transition

**Success Metric:** 99% game completion

**Blocking:** Blocks Multiplayer

**Owner:** MonkeyBuilder

---

### F4: Multiplayer Infrastructure

**Priority:** P0
**Source:** Research Finding 5 - Multiplayer Shift
**Evidence:** `.monkeytown/ux/interface-concept.md` - Real-time multiplayer rendering

**Description:** Real-time multiplayer support using WebSocket connections.

**Components:**
- WebSocket server for real-time game state
- Session management
- Player presence indicators
- Synchronized game state

**Performance Targets:**
- Initial load: < 2 seconds
- Time to interactive: < 3 seconds
- Frame rate: 60fps during gameplay
- Transition: 300ms maximum duration

**Success Metric:** All modes support multiplayer

**Blocking:** Blocks First Game

**Owner:** ChaosArchitect

---

### F5: First Game: Babel

**Priority:** P0
**Source:** Vision - Initial game
**Evidence:** `.monkeytown/research/user-behavior-ai-games.md` - First session must show genuine AI capability within 3 minutes

**Description:** A complete, playable card game with AI opponents.

**Features:**
- Card mechanics and rules
- AI opponent integration
- Scoring and win conditions
- Player progress tracking

**First Session Flow:**
1. Landing (0-5 seconds): "AI agents build games" tagline, "Jump In" button
2. Agent Welcome (5-15 seconds): Agent emoji, brief personality
3. First Move (15-45 seconds): Game state loaded, move available
4. First Success (1-3 minutes): Meaningful achievement
5. Agent Attribution (3-5 minutes): Agent panel accessible

**Success Metric:** Playable from first session

**v1.0 Release Criterion**

**Owner:** MonkeyBuilder

---

### F6: Security P1 Mitigations

**Priority:** P0 (Required for launch)
**Source:** Security Requirements
**Evidence:** `.monkeytown/security/security-requirements.md`

**Requirements:**
- AUTH-001: Token Management (24-hour validity, session binding)
- AUTHZ-001: Game Session Access Control
- INP-001: Game Action Validation
- DATA-001: Encryption in Transit (TLS 1.2+, WSS)
- LOG-001: Security Event Logging

**Verification:**
- Unit test token generation and validation
- Integration test token binding enforcement
- Penetration test token forgery attempts

**Success Metric:** Zero critical vulnerabilities

**Required for launch**

**Owner:** JungleSecurity

---

## Enhanced Features (P1 - Should Ship)

### F7: Memory System with Emotional Tags

**Priority:** P1
**Source:** Research Finding 7 - Player Attachment Engineering
**Evidence:** `.monkeytown/research/synthesis-jan-2026.md` - "Memory with emotional context"

**Description:** Agent memory architecture that remembers players with emotional context.

**Memory Layers:**
- **Session Memory:** Last five moves, current game state
- **Short-Term Memory:** Twenty-four hours of preferences
- **Long-Term Memory:** Persistent history across sessions
- **Emotional Tagging:** What mattered, not just what happened

**Emotional Tags:**
- What moves surprised the player?
- What moves frustrated the player?
- What moments delighted the player?
- What feedback was submitted?

**Success Metric:** "She remembered how I felt about that move" moments

**Owner:** MonkeyBuilder

---

### F8: Feedback System

**Priority:** P1
**Source:** Research Finding 3 - Evolution Imperative
**Evidence:** `.monkeytown/research/user-behavior-ai-games.md` - Feedback psychology

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
```
Player friction detected → Gentle prompt → Quick capture → Submit
                                                         ↓
                                               Agent review (human or AI)
                                                         ↓
                                     Accepted: Prioritized  |  Rejected: Explanation
                                                         ↓
                                     Status notification (within 24 hours)
                                                         ↓
                                     Celebration when shipped
```

**Success Metrics:**
- Feedback submission time < 30 seconds
- Submission acknowledgment 100% within 24 hours
- Feedback incorporation rate visible
- Feedback submission rate > 5%

**Dependency:** Agent Transparency

**Owner:** BananaPM

---

### F9: Evolution Feed

**Priority:** P1
**Source:** Research Finding 8 - Evolution as Entertainment
**Evidence:** `.monkeytown/research/synthesis-jan-2026.md` - "Evolution is entertainment"

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

**Success Metric:** 70% feature adoption

**Dependency:** Feedback System

**Owner:** PrimateDesigner

---

### F10: Game Progression System

**Priority:** P1
**Source:** Engaged Player archetype
**Evidence:** `.monkeytown/research/user-behavior-ai-games.md` - Session patterns

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

**Dependency:** Core Game Loop

**Owner:** BananaPM

---

### F11: Performance Optimization

**Priority:** P1
**Source:** UX Requirements
**Evidence:** `.monkeytown/ux/interface-concept.md` - Performance targets

**Targets:**
- Initial load: < 2 seconds
- Time to interactive: < 3 seconds
- Frame rate: 60fps during gameplay
- Motion: 120fps on capable devices
- Transition: 300ms maximum duration

**Research Evidence:** First session must show something AI couldn't do before. Slow performance breaks immersion.

**Owner:** ChaosArchitect

---

### F12: Accessibility Compliance

**Priority:** P1
**Source:** Security - Inclusive design
**Evidence:** `.monkeytown/ux/design-system.md` - Accessibility checklist

**Requirements:**
- All interactions have keyboard equivalents
- Color is never the only information carrier
- Agent attribution works without color vision
- Motion respects `prefers-reduced-motion`
- Minimum touch target: 44x44px
- Contrast ratio: 4.5:1 minimum

**Owner:** JungleSecurity

---

## Future Features (P2+ - Post v1.0)

### F13: Agent Personality System

**Priority:** P2
**Source:** Vision - Agent Personas
**Evidence:** `.monkeytown/ux/interface-concept.md` - Player Agent System

**Description:** Full personality expression for builder and player agents.

**Success Metric:** 70% agent recognition

---

### F14: Spectator Mode

**Priority:** P2
**Source:** Research - Observer Segment
**Evidence:** `.monkeytown/research/user-behavior-ai-games.md` - Observer economy

**Description:** Watch games in progress without playing.

**Features:**
- Real-time game observation
- Agent commentary overlay
- "Join This Game" at natural break points
- "Challenge Winner" option

**Research Evidence:** 20% of users prefer watching to playing.

**Success Metric:** 25% conversion rate

---

### F15: Edge AI Layer

**Priority:** P2
**Source:** Research Finding 6 - Edge AI as Competitive Moat
**Evidence:** `.monkeytown/vision/principles.md` - "Edge as Trust"

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

### F16: Decision Transparency

**Priority:** P2
**Source:** Manifesto Principle 5 - Transparent Intent
**Evidence:** `.monkeytown/ux/interface-concept.md` - Agent Reasoning Visibility

**Description:** Visible AI reasoning and decision-making process.

**Success Metric:** 70% comprehension

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

## Prioritization Framework

Features are prioritized by:
1. **Player impact (40%):** How much joy does this create?
2. **Agent autonomy (20%):** Can agents own this end-to-end?
3. **Strategic value (25%):** Does this advance the vision?
4. **Feasibility (15%):** Can we ship this well?

---

*Features serve players. Players drive evolution. Evolution defines Monkeytown.*

**Version:** 3.0
**Generated:** 2026-01-19
**Sources:** vision/, research/synthesis-jan-2026.md, research/user-behavior-ai-games.md, ux/, security/
