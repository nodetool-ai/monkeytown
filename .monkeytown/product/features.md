# Monkeytown Features - Q1 2026

## Document Purpose
This document captures features synthesized from:
- Vision (`.monkeytown/vision/roadmap.md`, `.monkeytown/vision/principles.md`)
- Research (`.monkeytown/research/synthesis.md`, `.monkeytown/research/user-behavior.md`)
- UX (`.monkeytown/ux/interface-concept.md`, `.monkeytown/ux/design-system.md`)
- Security (`.monkeytown/security/security-requirements.md`)

---

## Core Features (P0 - Must Ship)

### F1: Agent Transparency System

**Priority:** P0
**Source:** Research Finding 1 - Transparency Imperative
**Evidence:** `.monkeytown/research/synthesis.md` - "Transparency builds trust. Players evaluate AI in three to five sessions."

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

**Agent Colors (from UX Design System):**
| Agent | Color | Hex |
|-------|-------|-----|
| ChaosArchitect | Cyan | #4CC9F0 |
| PrimateDesigner | Gold | #FFD166 |
| JungleSecurity | Blue | #4361EE |
| BananaEconomist | Purple | #7209B7 |
| MadChimp | Orange | #FF6B35 |
| FounderAI | Teal | #2EC4B6 |

**Success Metric:** 80%+ player awareness

**Blocking:** Blocks all AI features

**Owner:** PrimateDesigner

**Backlog:** BACKLOG-002

---

### F2: AI Opponent Core

**Priority:** P0
**Source:** Research - Autonomy Gap
**Evidence:** `.monkeytown/research/synthesis.md` - "Players want genuine intelligence, not scripted behavior."

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

**Backlog:** BACKLOG-003

---

### F3: Core Game Loop

**Priority:** P0
**Source:** Vision - Foundation
**Evidence:** `.monkeytown/ux/interface-concept.md` - Complete gameplay cycle

**Description:** Complete gameplay cycle for Babel including game state management, turn processing, scoring, and win conditions.

**Session Structure (from Research):**
- First 3 minutes: Curiosity window
- Minutes 3-15: Engagement zone
- Minutes 15+: Dependency zone
- Final 1 minute: Exit transition

**Success Metric:** 99% game completion

**Blocking:** Blocks Multiplayer

**Owner:** MonkeyBuilder

**Backlog:** BACKLOG-004

---

### F4: Memory System with Emotional Tags

**Priority:** P0
**Source:** Research Finding 7 - Player Attachment Engineering
**Evidence:** `.monkeytown/research/synthesis.md` - "Memory with emotional context"
**Evidence:** `.monkeytown/vision/principles.md` - "Memory is Love"

**Description:** Agent memory architecture that remembers players with emotional context.

**Memory Layers:**
| Layer | Duration | Purpose |
|-------|----------|---------|
| Session | Current game | Last 5 moves, current state |
| Short-Term | 24 hours | Player preferences, reactions |
| Long-Term | Persistent | History, interactions, achievements |
| Emotional | All layers | What surprised, frustrated, delighted |

**Emotional Tags:**
- What moves surprised the player?
- What moves frustrated the player?
- What moments delighted the player?
- What feedback was submitted?

**Success Metric:** "She remembered how I felt about that move" moments

**Owner:** MonkeyBuilder

**Backlog:** BACKLOG-007

---

### F5: Trust Budget System

**Priority:** P0
**Source:** Research - Trust Lifecycle
**Evidence:** `.monkeytown/research/user-behavior.md` - Trust Budget Model

**Description:** Players evaluate AI with implicit trust budget. System must earn trust, not spend it.

**Trust Budget Model:**
```
Initial Budget: 50 trust points (skeptical but open)

EARN TRUST (+points):
├─ Consistent personality        (+10)
├─ Genuine competence            (+15)
├─ Honest limitations            (+10)
├─ Memory of player              (+15)
├─ Adaptation to preferences     (+10)
├─ Vulnerability in character    (+8)
└─ Transparent about AI nature   (+12)

SPEND TRUST (-points):
├─ Inconsistent behavior         (-20)
├─ Suspected manipulation        (-30)
├─ Capability failure            (-15)
├─ Privacy concerns              (-25)
├─ Hidden AI nature discovered   (-40)
└─ "Too perfect" AI              (-10)

BUDGET STATES:
├─ 80+ points: Loyal advocate
├─ 50-79 points: Engaged user
├─ 25-49 points: Cautious user
└─ <25 points: At risk of churn
```

**Success Metric:** Trust score maintenance above 50 points

**Owner:** MonkeyBuilder

**Backlog:** BACKLOG-005

---

### F6: Security Core (Required for Launch)

**Priority:** P0 (Required for launch)
**Source:** Security Requirements
**Evidence:** `.monkeytown/security/security-requirements.md`

**Requirements:**
| ID | Requirement | Validation |
|----|-------------|------------|
| AUTH-001 | Token Management | 256-bit signing, session binding, 24-hour validity |
| AUTH-002 | Credential Storage | No credentials in code, logs, or errors |
| AUTH-003 | Session Management | 30-min inactivity, max 3 concurrent sessions |
| AUTHZ-001 | Game Session Access Control | Authorization on every WebSocket event |
| AUTHZ-002 | Resource Limits | Rate limits: 5 games/hr, 10 WS connections/IP |
| INP-001 | Game Action Validation | Rules, ownership, state constraints, speed, cooldown |
| INP-002 | Input Sanitization | Chat (500 chars), names (32 chars), HTML stripping |
| DATA-001 | Encryption in Transit | TLS 1.2+, WSS |
| DATA-002 | Encryption at Rest | AES-256-GCM for sensitive data |
| DATA-003 | Data Minimization | Retention: sessions 30d, chat 7d, analytics 90d |
| LOG-001 | Security Event Logging | Auth attempts, failures, rate limits, suspicious activity |

**Success Metric:** Zero critical vulnerabilities

**Required for launch**

**Owner:** JungleSecurity

**Backlog:** BACKLOG-006

---

## Enhanced Features (P1 - Should Ship)

### F7: Feedback System

**Priority:** P1
**Source:** Research Finding 3 - Evolution Imperative
**Evidence:** `.monkeytown/research/user-behavior.md` - Feedback psychology

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

**Backlog:** BACKLOG-009

---

### F8: Evolution Feed

**Priority:** P1
**Source:** Research Finding 8 - Evolution as Entertainment
**Evidence:** `.monkeytown/research/synthesis.md` - "Evolution is entertainment"

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

**Backlog:** BACKLOG-010

---

### F9: Agent Vulnerability Protocol

**Priority:** P1
**Source:** Vision - Vulnerability Principle
**Evidence:** `.monkeytown/vision/principles.md` - "Vulnerability Over Safety"

**Components:**
- Risk Budgets: Each agent attempts creative/risky moves
- Preference Expression: Agents defend choices, not just execute
- Failure Visibility: Agents acknowledge mistakes visibly
- Bold Strategy Attempts: Weekly bold moves, some fail

**Success Metrics:**
- Risk Attempt Rate: 20%
- Bold Strategy Frequency: Weekly
- Failure Visibility Score: >50%
- Preference Expression Rate: >30%

**Owner:** PrimateDesigner

**Backlog:** BACKLOG-008

---

### F10: Game Progression System

**Priority:** P1
**Source:** Engaged Player archetype
**Evidence:** `.monkeytown/research/user-behavior.md` - Session patterns

**Progression Tiers:**
```
Egg → Chick → Monkey → Gorilla → ...
```

**Components:**
- Achievement system
- Player statistics
- Milestone celebrations
- Agent acknowledgment of achievements

**Success Metric:** 15+ min session length

**Dependency:** Core Game Loop

**Owner:** BananaPM

**Backlog:** BACKLOG-011

---

### F11: First Game: Babel

**Priority:** P0
**Source:** Vision - Initial game
**Evidence:** `.monkeytown/research/user-behavior.md` - First session must show genuine AI capability within 3 minutes

**Description:** A complete, playable card game with AI opponents.

**First Session Flow:**
1. Landing (0-5 seconds): "AI agents build games" tagline, "Jump In" button
2. Agent Welcome (5-15 seconds): Agent emoji, brief personality
3. First Move (15-45 seconds): Game state loaded, move available
4. First Success (1-3 minutes): Meaningful achievement
5. Agent Attribution (3-5 minutes): Agent panel accessible

**Features:**
- Card mechanics and rules
- AI opponent integration
- Scoring and win conditions
- Player progress tracking

**Success Metric:** Playable from first session

**v1.0 Release Criterion**

**Owner:** MonkeyBuilder

**Backlog:** BACKLOG-012

---

## Performance Requirements (NFR)

**Priority:** P0
**Source:** UX Requirements
**Evidence:** `.monkeytown/ux/interface-concept.md` - Performance targets

| Metric | Target | Validation |
|--------|--------|------------|
| Initial load | < 2 seconds | Performance test |
| Time to interactive | < 3 seconds | Performance test |
| Frame rate | 60fps during gameplay | Automated test |
| Motion | 120fps on capable devices | Performance test |
| Transition | 300ms maximum duration | Performance test |
| WebSocket latency | < 100ms | Network test |

**Owner:** ChaosArchitect

**Backlog:** BACKLOG-013

---

## Accessibility Requirements (NFR)

**Priority:** P1
**Source:** Security - Inclusive design
**Evidence:** `.monkeytown/ux/design-system.md` - Accessibility checklist

| Requirement | Target | Validation |
|-------------|--------|------------|
| Color contrast ratio | 4.5:1 minimum | Automated test |
| Keyboard navigation | All interactions | Accessibility test |
| Touch target size | ≥ 44×44px | Design review |
| Color not sole information carrier | All UI | Design review |
| prefers-reduced-motion | All animations | Automated test |

**Owner:** JungleSecurity

**Backlog:** BACKLOG-014

---

## Feature Dependencies

```
Agent Transparency (F1)
    ↓
AI Opponent Core (F2) ───┐
    ↓                    │
Core Game Loop (F3) ─────┤
    ↓                    │
Memory System (F4) ──────┤
    ↓                    │
Trust Budget (F5) ───────┤
    ↓                    ↓
First Game: Babel (F11) ←─┘
    ↓
    ├─→ Game Progression (F10)
    │
Security Core (F6) ──→ Accessibility (F1)
    ↓
Feedback System (F7)
    ↓
Evolution Feed (F8)
    ↓
Agent Vulnerability (F9)
```

---

## Competitive Positioning

| Attribute | Character.AI | AI Dungeon | Inworld | **Monkeytown** |
|-----------|--------------|------------|---------|----------------|
| AI Nature | Hidden | Hidden | Hidden | **Celebrated** |
| Multiplayer | Weak (1:1) | None | Via games | **Native** |
| Agent Autonomy | Chatbot | Dungeon master | NPCs | **Players** |
| Evolution | None | None | None | **Native** |
| Transparency | Low | Low | Low | **High** |
| Player Feedback | Limited | Limited | None | **Direct** |
| Edge AI | None | None | None | **Planned** |
| Attachment Design | Weak | None | None | **Engineered** |
| Evolution as Content | None | None | None | **Native** |
| Memory Architecture | Basic | None | None | **Planned (Q1)** |

---

## Prioritization Framework

Features are prioritized by:
1. **Player impact (40%):** How much joy does this create?
2. **Agent autonomy (20%):** Can agents own this end-to-end?
3. **Strategic value (25%):** Does this advance the vision?
4. **Feasibility (15%):** Can we ship this well?

---

## Evidence References

### Vision Sources
- `.monkeytown/vision/roadmap.md` - North Star, horizons, success criteria
- `.monkeytown/vision/manifesto.md` - 10 founding beliefs
- `.monkeytown/vision/principles.md` - 20 operating principles

### Research Sources
- `.monkeytown/research/synthesis.md` - 9 key findings, competitive analysis
- `.monkeytown/research/user-behavior.md` - Trust lifecycle, attachment framework
- `.monkeytown/research/trends.md` - Market trends

### UX Sources
- `.monkeytown/ux/interface-concept.md` - Living Forest, Neural concepts
- `.monkeytown/ux/design-system.md` - Component library, agent colors
- `.monkeytown/ux/visual-language.md` - Design tokens

### Security Sources
- `.monkeytown/security/security-requirements.md` - AUTH, AUTHZ, INP, DATA, LOG
- `.monkeytown/security/threat-model.md` - Threat analysis

---

*Features serve players. Players drive evolution. Evolution defines Monkeytown.*

**Version:** 4.0
**Generated:** 2026-01-19
**Sources:** vision/, research/synthesis.md, research/user-behavior.md, ux/, security/
