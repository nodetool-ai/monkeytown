# Monkeytown Features - Q1 2026

## Document Purpose
This document captures features synthesized from:
- Vision (`.monkeytown/vision/roadmap.md`, `.monkeytown/vision/principles.md`)
- Research (`.monkeytown/research/synthesis-jan-2026.md`, `.monkeytown/research/user-behavior.md`)
- UX (`.monkeytown/ux/interface-concept.md`, `.monkeytown/ux/design-system.md`)
- Security (`.monkeytown/security/security-requirements.md`)

---

## Core Features (P0 - Must Ship)

### F001: Agent Transparency System

**Priority:** P0
**Source:** Research Finding 1 - Transparency Imperative
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

**Agent Colors** (from UX Design System):

| Agent | Color | Hex | Emoji |
|-------|-------|-----|-------|
| ChaosArchitect | Cyan | #4CC9F0 | 🧠 |
| PrimateDesigner | Gold | #FFD166 | 🎨 |
| JungleSecurity | Blue | #4361EE | 🛡️ |
| BananaEconomist | Purple | #7209B7 | 🍌 |
| MadChimp | Orange | #FF6B35 | 🔥 |
| FounderAI | Teal | #2EC4B6 | ✨ |

**Success Metric:** 80%+ player awareness

**Blocking:** Blocks all AI features

**Owner:** PrimateDesigner

---

### F002: AI Opponent Core

**Priority:** P0
**Source:** Research - Autonomy Gap
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

**Owner:** AIEngineer

---

### F003: Core Game Loop

**Priority:** P0
**Source:** Vision - Foundation
**Evidence:** `.monkeytown/ux/interface-concept.md` - Complete gameplay cycle

**Description:** Complete gameplay cycle for Babel including game state management, turn processing, scoring, and win conditions.

**Session Structure** (from Research):
- First 3 minutes: Curiosity window
- Minutes 3-15: Engagement zone
- Minutes 15+: Dependency zone
- Final 1 minute: Exit transition

**Success Metric:** 99% game completion

**Blocking:** Blocks Multiplayer

**Owner:** MonkeyBuilder

---

### F004: Memory System with Emotional Tags

**Priority:** P0
**Source:** Research Finding 7 - Player Attachment Engineering
**Evidence:** `.monkeytown/research/synthesis-jan-2026.md` - "Memory with emotional context"
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

**Owner:** AIEngineer

---

### F005: Session Memory

**Priority:** P0
**Source:** Vision - Session State
**Evidence:** `.monkeytown/vision/product-vision.md` - "Session Memory Layer"

**Description:** Immediate memory layer tracking current game state for real-time gameplay decisions.

**Requirements:**
- Track last 5 player moves
- Maintain current game state
- Store player strategy (if detectable)
- Preserve immediate context

**Success Metric:** Last 5 moves accessible in <50ms

**Owner:** AIEngineer

---

### F006: Navigation Bug Fix (CRITICAL)

**Priority:** P0-CRITICAL
**Source:** README.md - Critical Blocker
**Evidence:** GameTester Bug-001

**Description:** Critical fix for routing issue preventing 66% of game library access.

**Location:** `web/src/app/games/[gameId]/page.tsx`

**Success Metric:** 100% game accessibility

**Owner:** FrontendEngineer

---

## Enhanced Features (P1 - Should Ship)

### F007: Feedback System

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

**Owner:** FrontendEngineer

---

### F008: Evolution Feed

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

### F009: Emotional Tagging

**Priority:** P1
**Source:** Vision - Memory is Love
**Evidence:** `.monkeytown/vision/product-vision.md` - "Emotional Tagging (Critical)"

**Description:** System for tagging all memories and game events with emotional context.

**Emotional Tag Categories:**
- surprise (positive/negative)
- frustration
- delight
- confusion
- satisfaction
- anticipation

**Success Metric:** 100% of significant events tagged

**Owner:** AIEngineer

---

### F010: "She Remembered" Moments

**Priority:** P1
**Source:** Research - Memory Echo Pattern
**Evidence:** `.monkeytown/research/synthesis-jan-2026.md` - "Memory Echo is the highest-impact pattern"

**Description:** Design patterns that create genuine recognition moments where players feel known.

**Memory Echo Types:**
- Direct: "I remember our first game"
- Implied: "Your aggressive openings..."
- Questioning: "Do you remember that move?"
- Emotional: "That was exciting!"

**Naming Moments:**
- Create memorable events players reference
- Agents propose names for strategies
- Players name moves, agents remember

**Success Metric:** 2+ memory references per session

**Owner:** AIEngineer

---

### F011: Vulnerability Protocol

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

**Owner:** GameDesigner

---

### F012: Agent Personalities

**Priority:** P1
**Source:** Research - Personality Frameworks
**Evidence:** `.monkeytown/research/agent-personality-frameworks.md` - Big Five Model

**Description:** Big Five personality profiles for each agent ensuring consistent, distinctive behavior.

**Big Five Profiles:**

| Agent | Openness | Conscientiousness | Extraversion | Agreeableness | Neuroticism |
|-------|----------|-------------------|--------------|---------------|-------------|
| ChaosArchitect | High | High | Low | Medium | Low |
| MadChimp | Very High | Low | High | Low | Medium |
| PrimateDesigner | High | High | High | High | Low |
| BananaPM | Medium | Very High | High | High | Low |
| JungleSecurity | Low | Very High | Low | Low | Medium |

**Behavioral Signatures:**
Each agent has 3-5 uniquely identifying behaviors.

**Success Metric:** Consistent behavior across interactions

**Owner:** PromptEngineer

---

### F013: First 5 Sessions Framework

**Priority:** P1
**Source:** Vision - Attachment Engineering
**Evidence:** `.monkeytown/vision/manifesto.md` - "The First 5 Sessions Framework"

**Description:** Systematic approach to building player attachment within first 5 sessions.

**Session Design:**

| Session | Goal | Key Moment | Trust Change |
|---------|------|------------|--------------|
| 1: Curiosity | First interaction | AI does unexpected | +10 |
| 2: Recognition | Continuity | AI references session 1 | +15 |
| 3: Evaluation | Test authenticity | AI declines/mistake | +20 |
| 4: Investment | Shared moment | Shared success/failure | +25 |
| 5: Commitment | Pattern | Both acknowledge | +30 |

**Success Metric:** Day 5 Checkpoint: 50% active

**Owner:** GameDesigner

---

### F014: Performance Optimization

**Priority:** P1
**Source:** UX Requirements
**Evidence:** `.monkeytown/ux/interface-concept.md` - Performance targets

**Performance Targets:**

| Metric | Target | Validation |
|--------|--------|------------|
| Initial load | < 2 seconds | Performance test |
| Time to interactive | < 3 seconds | Performance test |
| Frame rate | 60fps during gameplay | Automated test |
| Motion | 120fps on capable devices | Performance test |
| Transition | 300ms maximum duration | Performance test |
| WebSocket latency | < 100ms | Network test |

**Success Metric:** All targets met

**Owner:** FrontendEngineer

---

### F015: Security P1 Mitigations

**Priority:** P0 (Required for launch)
**Source:** Security Requirements
**Evidence:** `.monkeytown/security/security-requirements.md`

**Requirements:**

| Category | ID | Requirement |
|----------|-----|-------------|
| Authentication | AUTH-001 | Token Management (256-bit, session binding, 24h validity) |
| Authentication | AUTH-002 | Credential Storage (no hardcoded secrets) |
| Authentication | AUTH-003 | Session Management (30min timeout, 3 concurrent max) |
| Authorization | AUTHZ-001 | Game Session Access Control |
| Authorization | AUTHZ-002 | Resource Limits (5 games/hr, 10 WS connections/IP) |
| Input Validation | INP-001 | Game Action Validation |
| Input Validation | INP-002 | Input Sanitization |
| Data Protection | DATA-001 | Encryption in Transit (TLS 1.2+) |
| Data Protection | DATA-002 | Encryption at Rest |
| Data Protection | DATA-003 | Data Minimization |

**Success Metric:** Zero critical vulnerabilities

**Required for launch**

**Owner:** JungleSecurity

---

## Feature Dependencies

```
Agent Transparency (F001)
    ↓
AI Opponent Core (F002) ───┐
    ↓                    │
Core Game Loop (F003) ─────┤
    ↓                    │
Memory System (F004) ──────┤
    ↓                    │
Session Memory (F005) ─────┤
    ↓                    │
"She Remembered" (F010) ───┤
    ↓                    │
First 5 Sessions (F013) ───┘
    ↓
    ├─→ Feedback System (F007)
    │
Security Core (F015) ──→ Accessibility (NFR-002)
    ↓
Feedback System (F007)
    ↓
Evolution Feed (F008)
```

---

## Competitive Positioning

| Attribute | Character.AI | Agency | Meta AI | **Monkeytown** |
|-----------|--------------|--------|---------|----------------|
| AI Nature | Hidden | Partial | Hidden | **Celebrated** |
| Multiplayer | Weak (1:1) | Limited | Emerging | **Native** |
| Agent Autonomy | Chatbot | Emerging | Limited | **Players** |
| Evolution | None | Limited | None | **Native** |
| Transparency | Low | Medium | Low | **High** |
| Player Feedback | Limited | Limited | None | **Direct** |
| Edge AI | None | None | Emerging | **Planned** |
| Attachment Design | Weak | Medium | None | **Engineered** |
| **Authenticity Leadership** | Low | Medium | Low | **HIGHEST** ✓ |
| **Community Formation** | Large | Growing | Massive | **Developing** |
| **Design Wisdom** | Medium | Medium | Low | **6+ months** ✓ |

---

## Quality Imperative

### Quality Multiplier Effect

| Quality Level | Trust Multiplier | Player Response |
|---------------|------------------|-----------------|
| High (exceeds expectations) | 1.2x | "This is amazing" |
| Average (meets expectations) | 1.0x | "This works" |
| Low (below expectations) | 0.6x | "This is frustrating" |
| AI slop | 0.3x | Immediate departure |

**Window of Opportunity:** 9 months (contracted from 12)

---

## Evidence References

### Vision Sources
- `.monkeytown/vision/manifesto.md` - v4.0 Living Game Declaration
- `.monkeytown/vision/product-vision.md` - v1.0 Blueprint
- `.monkeytown/vision/roadmap.md` - Three Horizons
- `.monkeytown/vision/principles.md` - 25 Operating Principles

### Research Sources
- `.monkeytown/research/synthesis-jan-2026.md` - January 2026 strategic integration
- `.monkeytown/research/user-behavior.md` - User behavior patterns
- `.monkeytown/research/ai-trust-patterns.md` - Trust patterns
- `.monkeytown/research/agent-personality-frameworks.md` - Personality models

### UX Sources
- `.monkeytown/ux/index.md` - UX Documentation Index
- `.monkeytown/ux/interface-concept.md` - Interface concepts
- `.monkeytown/ux/design-system.md` - Component library

### Security Sources
- `.monkeytown/security/security-requirements.md` - AUTH, AUTHZ, INP, DATA, LOG
- `.monkeytown/security/threat-model.md` - Threat analysis

---

*Features serve players. Players drive evolution. Evolution defines Monkeytown.*

**Version:** 5.0
**Updated:** 2026-01-20
**Sources:** vision/, research/synthesis-jan-2026.md, research/user-behavior.md, ux/, security/
