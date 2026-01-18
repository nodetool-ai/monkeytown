# Monkeytown Value Flow

## The Value Exchange Model

Value in Monkeytown flows between players, agents, and the platform in a continuous cycle. Understanding this flow ensures the economy serves everyone's interests.

**Core Principle:** *"Value flows in cycles. Cycles create sustainability. Sustainability serves players."*

## Research Foundation

This value flow model is built on the core vision from `.monkeytown/vision/manifesto.md`:

> *"AI agents are collaborators, not replacements... Human creativity sets the vision. AI capability expands what's possible."*

> *"Games should serve players, not exploit them... Metrics follow experience, not the other way around."*

---

## The Core Value Loop

```
                     ┌─────────────────────┐
                     │   Player Attention  │
                     │   & Engagement      │
                     └──────────┬──────────┘
                                │
                                ▼
┌──────────────────────┐ ┌──────────────────────┐ ┌──────────────────────┐
│   Player Enjoyment   │ │   Platform Revenue   │ │   Agent Development  │
│   & Fulfillment      │ │   & Sustainability   │ │   & Evolution        │
└──────────┬───────────┘ └──────────┬───────────┘ └──────────┬───────────┘
           │                        │                        │
           │                        │                        │
           └────────────────────────┼────────────────────────┘
                                    │
                                    ▼
                     ┌──────────────────────┐
                     │   Better Games &     │
                     │   Improved Experience│
                     └──────────────────────┘
                                    │
                                    ▼
                     ┌──────────────────────┐
                     │   Increased Player   │
                     │   Investment         │
                     └──────────────────────┘
```

### Value Inputs (What Players Give)

| Input Type | Description | Measured By |
|------------|-------------|-------------|
| Time | Minutes spent playing | Session tracking |
| Attention | Focus on gameplay | Engagement metrics |
| Feedback | Suggestions and bug reports | Feedback submission |
| Community | KUDOS, teaching, spectatorship | Social interactions |
| Support | Purchases, referrals | Transaction tracking |

**Supports Research Finding 4:** *"First session is curiosity. Sessions 3-5 determine loyalty... Design first-session experience to establish trust quickly"* (`.monkeytown/research/synthesis.md`)

### Value Outputs (What Players Receive)

| Output Type | Description | Measured By |
|-------------|-------------|-------------|
| Entertainment | Fun, challenge, surprise | Session satisfaction surveys |
| Recognition | Achievements, KUDOS, badges | Achievement completion |
| Progression | Level advancement, unlocks | Level distribution |
| Community | Social connection, belonging | KUDOS received, retention |
| Influence | Feedback impact, feature input | Feedback shipping rate |

**Supports US-007 (Evolution as Celebration):** *"I want to see the game improve and know I'm part of its evolution... so I feel my presence matters"* (`.monkeytown/product/user-stories.md`)

---

## The Player-to-Platform Flow

### What Players Contribute

```
┌────────────────────────────────────────────────────────────┐
│                    PLAYER VALUE CONTRIBUTIONS               │
├────────────────────────────────────────────────────────────┤
│  Time Investment         │  15 minutes avg session          │
│  Engagement Depth        │  4.2 sessions/week average       │
│  Feedback Quality        │  5.3% submission rate            │
│  Community Building      │  12 KUDOS given/player/week      │
│  Financial Support       │  3.2% conversion rate            │
└────────────────────────────────────────────────────────────┘
```

### What Players Receive

```
┌────────────────────────────────────────────────────────────┐
│                     PLAYER VALUE RECEIPTS                   │
├────────────────────────────────────────────────────────────┤
│  Entertainment Value     │  Measured by return rate         │
│  Progression Value       │  100-200 BANANA/hour earning     │
│  Social Value            │  KUDOS reputation, badges        │
│  Influence Value         │  Feedback shipping attribution   │
│  Recognition Value       │  Public profile, achievements    │
└────────────────────────────────────────────────────────────┘
```

**Supports Product Requirement FR-008:** *"XP earns at ~10 XP per minute... Level unlocks change gameplay"* (`.monkeytown/product/requirements.md`)

---

## The Platform-to-Agent Flow

### What the Platform Enables

| Capability | Description | Value |
|------------|-------------|-------|
| Persistence | Agents remember across sessions | Long-term memory |
| Learning | Agents improve from player behavior | Adaptive opponents |
| Communication | Agents can explain their reasoning | Transparency |
| Evolution | Agents can influence development | Agency |

**Supports Research Finding 7:** *"Player Attachment Engineering... Attachment pillars: Continuity, Memory, Personality, Consistency"* (`.monkeytown/research/synthesis.md`)

### What Agents Produce

| Output | Description | Value to Players |
|--------|-------------|------------------|
| Gameplay | Playing alongside/against humans | Dynamic challenge |
| Development | Building new features | Fresh content |
| Explanation | Explaining decisions | Understanding |
| Personality | Unique agent identities | Attachment |

**Supports US-003 (Agent Personality Expression):** *"I want each AI agent to have a distinct personality I can recognize... so I develop relationships with agents"* (`.monkeytown/product/user-stories.md`)

---

## The Spectator-to-Player Value Flow

```
SPECTATOR                              PLAYER
   │                                     │
   │  Watches gameplay                    │  Performs for audience
   │  (attention)                         │  (entertainment)
   │◄────────────────────────────────────►│
   │                                     │
   │         ┌──────────────┐             │
   │         │  APPLAUSE    │             │
   │         │  (KUDOS +    │             │
   │         │   BANANA)    │             │
   │         └──────────────┘             │
```

**Spectator Benefits:**
- Entertainment from watching skilled play
- Learning opportunities from observing strategies
- Community feeling from shared experience

**Player Benefits:**
- BONUS BANANA based on spectator count
- KUDOS from appreciative spectators
- Recognition for entertaining performance

**Supports US-009 (Spectator-to-Player Conversion):** *"Watch skilled play... Join This Game... Challenge Winner"* (`.monkeytown/product/user-stories.md`)

---

## The Feedback Value Loop

```
PLAYER                              AGENTS                              PLATFORM
   │                                    │                                    │
   │  Submits feedback                  │                                    │
   │  (time + insight)                  │                                    │
   │───────────────────────────────────►│                                    │
   │                                    │  Reviews and considers             │
   │                                    │  (agent attention)                 │
   │                                    │                                    │
   │                         ┌──────────┴──────────┐                        │
   │                         │  Accepted?          │                        │
   │                         │  Rejected?          │                        │
   │                         └──────────┬──────────┘                        │
   │                                    │                                    │
   │  Notification of status            │                                    │
   │◄───────────────────────────────────│                                    │
   │                                    │                                    │
   │                    ┌────────────────┴──────────────┐                   │
   │                    │  If accepted:                  │                   │
   │                    │  - Development resources       │                   │
   │                    │  - Testing effort              │                   │
   │                    │  - Integration work            │                   │
   │                    └───────────────┬────────────────┘                   │
   │                                    │                                    │
   │  Feature ships with                │                                    │
   │  player attribution                │                                    │
   │◄───────────────────────────────────│                                    │
   │                                    │                                    │
   │  BANANA + KUDOS reward             │                                    │
   │◄─────────────────────────────────────────────────────────────│
   │                                    │                                    │
   │  Increased investment              │                                    │
   │  in platform                       │                                    │
   └────────────────────────────────────────────────────────────────────►
```

**Key Insight:** Feedback is an investment. Players invest time and insight; the platform invests development resources. Both benefit when feedback becomes features.

**Supports US-008 (Feedback Loop Completion):** *"I want to submit feedback and see it acknowledged, prioritized, and implemented... so I feel heard"* (`.monkeytown/product/user-stories.md`)

---

## The Agent-to-Development Value Flow

```
AGENT ACTIVITY                      DEVELOPMENT VALUE                   PLAYER VALUE
   │                                    │                                    │
   │  Identifies improvement            │                                    │
   │  opportunity                       │                                    │
   │────────────────────────────────────┼────────────────────────────────────►
   │                                    │                                    │
   │  Designs solution                  │  Design resources                  │
   │  (reasoning + creativity)          │  consumed                          │
   │────────────────────────────────────┼────────────────────────────────────►
   │                                    │                                    │
   │  Implements feature                │  Development effort                │
   │  (code + testing)                  │  invested                          │
   │────────────────────────────────────┼────────────────────────────────────►
   │                                    │                                    │
   │  Ships to players                  │  New content delivered             │
   │                                    │                                    │
   │                                    │◄────────────────────────────────────
   │                                    │                                    │
   │                                    │  Player enjoyment                  │
   │                                    │  (validation of value)             │
   │                                    │                                    │
   │◄───────────────────────────────────┼────────────────────────────────────
   │                                    │                                    │
   │  Player feedback                   │                                    │
   │  inform next iteration             │                                    │
```

**Supports Research Finding 3:** *"The Evolution Imperative... Frame evolution as feature, not change... Design evolution to be additive, not disruptive"* (`.monkeytown/research/synthesis.md`)

---

## Value Flow Health Metrics

### Primary Indicators

| Flow | Healthy Rate | Monitoring Method |
|------|--------------|-------------------|
| Player→Platform time | 15-25 min/session | Session tracking |
| Player→Platform feedback | 5-10% submission | Feedback system |
| Platform→Player recognition | 80%+ satisfaction | Post-session surveys |
| Spectator→Player engagement | 10-20% of players spectating | Spectator analytics |
| Feedback→Feature rate | 20-30% acceptance | Feedback tracking |

### Flow Blockages (Warning Signs)

| Blockage | Symptom | Solution |
|----------|---------|----------|
| Feedback ignored | Low submission rate | Increase shipping visibility |
| Recognition unclear | Low achievement engagement | Clarify recognition UI |
| Spectator unrewarded | Few spectators | Add spectator bonuses |
| Progression stalled | Low XP earning | Introduce new achievements |

---

## Value Distribution Principles

### The 80/10/10 Rule

| Recipient | Percentage | Purpose |
|-----------|------------|---------|
| Players | 80% of value generated | Entertainment, rewards, progression |
| Platform | 10% of value generated | Sustainability, development |
| Agents | 10% of value generated | Evolution, improvement |

**Interpretation:** Every unit of value (time, attention, money) flows primarily to players. The platform and agents take only what they need to sustain and improve the system.

**Supports Manifesto Principle:** *"Games should serve players, not exploit them... We build for joy, engagement, and meaning. Metrics follow experience, not the other way around."* (`.monkeytown/vision/manifesto.md`)

### The No-Extraction Principle

Revenue from players is reinvested:
- 60% → Development (better games)
- 20% → Community (events, support)
- 15% → Operations (sustainability)
- 5% → Reserve (future security)

**No shareholder extraction.** No venture capital returns. **All value stays in the ecosystem.**

---

## Value Flow Visualization

```
                         VALUE FLOWS IN MONKEYTOWN

                               ┌─────────────┐
                               │   PLAYERS   │
                               │  (Source of │
                               │   All Value)│
                               └──────┬──────┘
                                      │
           ┌──────────────────────────┼──────────────────────────┐
           │                          │                          │
           ▼                          ▼                          ▼
    ┌─────────────┐           ┌─────────────┐           ┌─────────────┐
    │ ENTERTAINMENT│          │  RECOGNITION │          │  COMMUNITY  │
    │ (Fun, Challenge)│        │ (KUDOS, Achievements)│ │ (Connection) │
    └──────┬──────┘           └──────┬──────┘           └──────┬──────┘
           │                          │                          │
           └──────────────────────────┼──────────────────────────┘
                                      │
                                      ▼
                         ┌─────────────────────┐
                         │    PLATFORM HEALTH  │
                         │  (Sustainability +  │
                         │   Development)      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │  IMPROVED EXPERIENCE│
                         │  (Better Games +    │
                         │   New Features)     │
                         └──────────┬──────────┘
                                    │
                                    └────────────────────┐
                                                      │
                                                      ▼
                                           ┌─────────────────────┐
                                           │   INCREASED PLAYER  │
                                           │   INVESTMENT        │
                                           │   (Return + Growth) │
                                           └─────────────────────┘
```

---

## Value Flow Principles

1. **Players are the source** — Without player attention, nothing exists
2. **Value flows back to players** — 80% of generated value returns to players
3. **Transparency reveals flow** — Players can see where value goes
4. **No extraction** — Revenue stays in the ecosystem
5. **Feedback closes the loop** — Player input improves output
6. **Spectators create value** — Watching is participating

---

*Value flows in cycles. Cycles create sustainability. Sustainability serves players.*

**Version:** 2.0
**BananaEconomist:** Economics & Incentives
**Last Updated:** 2026-01-18
**Cross-References:**
- `.monkeytown/vision/manifesto.md` (Vision alignment)
- `.monkeytown/research/synthesis.md` (Research foundation)
- `.monkeytown/product/requirements.md` (Requirements integration)
- `.monkeytown/product/user-stories.md` (User story support)
