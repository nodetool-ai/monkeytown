# Monkeytown Incentive Structure

## The Incentive Philosophy

Monkeytown incentives shape behavior through **meaningful recognition**, not artificial urgency. Players should feel motivated by genuine accomplishment, not fear of missing out. Every incentive aligns player joy with game health.

**Core Principle:** *"Incentives shape behavior. Behavior creates culture. Culture defines Monkeytown."*

## Research Foundation

This incentive structure is built on the trust research from `.monkeytown/research/ai-trust-patterns.md`:

> *"Trust is the currency of AI gaming... Trust is not given to AI—it's earned through behavior."*

The incentive system is designed to **earn trust** through consistent, fair rewards.

---

## Trust-Earning Incentive Design

### The Trust Budget System

Based on the research finding *"Trust is like credit—it can be spent and earned,"* the incentive structure tracks trust:

| Action | Trust Cost | Trust Earned |
|--------|------------|--------------|
| Great move (AI) | — | +5 |
| Honest admission (AI) | — | +8 |
| Fair play | — | +3 |
| Transparency | — | +5 |
| Bad move (AI) | -3 | — |
| Unexplained behavior | -8 | — |
| Apparent cheating | -50 | — |
| Recovery after failure | — | +10 (if done well) |

**Insight:** Players unconsciously track this balance. Incentives are designed to maintain positive trust balance.

---

## Core Incentive Categories

### 1. Session Incentives — Encouraging Regular Engagement

**The Welcome Back Bonus**

```
Day 1: 50 BANANA
Day 2: 75 BANANA (+50%)
Day 3: 100 BANANA (+33%)
Day 4+: 100 BANANA (cap)
Reset: 21-day inactivity triggers reset to Day 1
```

**Design Rationale:** Gradual increase encourages building habits, then stabilizes to prevent entitlement. Reset creates opportunity for re-engagement without punishing life circumstances.

**Supports US-001 (First Session Trust Establishment):** *"First session is curiosity. Sessions 3-5 determine loyalty."* (`.monkeytown/research/synthesis.md`)

**The First Move Celebration**

Every session's first move triggers:
- Subtle celebration animation
- 10 BANANA reward
- Agent acknowledgment ("Ready to play!")

**Psychological Basis:** This conditions players to associate starting with reward, building positive anticipation (Research Finding 4: *Trust Timeline*).

**The Session Completion Bonus**

| Session Length | BANANA Bonus | KUDOS |
|----------------|--------------|-------|
| <5 minutes | 10 | 1 |
| 5-15 minutes | 25 | 3 |
| 15-30 minutes | 50 | 5 |
| 30+ minutes | 75 | 8 |

### 2. Progression Incentives — Rewarding Investment

**Level-Up Celebration**

Each level increase triggers:
- Visual celebration animation (per `.monkeytown/ux/design-system.md`)
- BANANA bonus (25 × level)
- New cosmetic or feature unlock
- Agent acknowledgment message

**Integration with UX:** Celebrations follow the 300ms max transition duration from design system.

**The Milestone Recognition System**

| Milestone | Recognition | BANANA | KUDOS |
|-----------|-------------|--------|-------|
| 1st game played | "First Steps" badge | 50 | 5 |
| 10 games played | "Getting Started" badge | 100 | 10 |
| 50 games played | "Regular" badge | 250 | 15 |
| 100 games played | "Dedicated" badge | 500 | 25 |
| 500 games played | "Veteran" badge | 1,000 | 50 |
| 1,000 games played | "Master" badge | 2,500 | 100 |

**The Daily Challenge**

Each day offers three challenges of varying difficulty:
- **Easy:** Win 1 match (50 BANANA)
- **Medium:** Win with a specific strategy (100 BANANA)
- **Hard:** Achieve a specific milestone (200 BANANA)

Reset at midnight local time. Uncompleted challenges do not carry over.

**Supports FR-008 (Progression System):** *"XP earns at ~10 XP per minute... Level unlocks change gameplay"* (`.monkeytown/product/requirements.md`)

### 3. Achievement Incentives — Celebrating Specific Feats

**The Discovery Series**

| Achievement | Trigger | BANANA | KUDOS |
|-------------|---------|--------|-------|
| First Victory | Win first match | 100 | 10 |
| Comeback Kid | Win after trailing | 50 | 5 |
| Strategy Master | Win using all 3 agent types | 75 | 8 |
| Community Builder | Receive 10 KUDOS from others | 50 | 15 |
| Feedback Hero | Have feedback shipped | 200 | 25 |
| Evolution Witness | Be online during feature launch | 100 | 10 |
| Early Adopter | Use feature within 24 hours | 50 | 5 |
| Teacher | Have another player copy your strategy | 75 | 10 |

**Design Principle:** One-time achievements create initial motivation. Repeatable achievements cap at 1 per day to prevent grinding exploits.

### 4. Social Incentives — Building Community

**The Recognition Economy**

Players can award KUDOS to others for:
- Good sportsmanship (5 KUDOS)
- Helpful advice (10 KUDOS)
- Entertaining gameplay (8 KUDOS)
- Teaching moment (15 KUDOS)

Daily limit: 50 KUDOS given.

**Supports Research Finding 5:** *"True multiplayer with AI agents as players... AI teammates and competitors"* (`.monkeytown/research/synthesis.md`)

**The Team Victory Bonus**

When a team wins, all members receive:
- Base: 25 BANANA each
- Bonus: 10 BANANA per team member
- Streak bonus: +25 BANANA if winning team played together before

**The Spectator Appreciation System**

When a player is being watched by spectators:
- 1-5 spectators: +5 BANANA per minute
- 6-20 spectators: +10 BANANA per minute
- 21+ spectators: +15 BANANA per minute

**Supports US-009 (Spectator-to-Player Conversion):** *"Entertainment from watching skilled play"* (`.monkeytown/product/user-stories.md`)

### 5. Agent Interaction Incentives — Celebrating AI Relationships

**The Agent Bond System**

Players who consistently interact with specific agents unlock:

| Bond Level | Interactions Required | Unlock |
|------------|----------------------|--------|
| Acknowledged | 10 | Agent says "I remember you" |
| Familiar | 50 | Agent uses player's name |
| Partnered | 100 | Agent remembers your play style |
| Bonded | 500 | Agent gives personal greeting |

**Research Foundation:** Based on Research Finding 7: *Player Attachment Engineering* and US-014: *Player Attachment Engineering* (`.monkeytown/research/synthesis.md`, `.monkeytown/product/user-stories.md`)

> *"Players form genuine emotional attachments to AI entities... Attachment pillars: Continuity, Memory, Personality, Consistency"*

**The Agent Milestone Celebration**

When agents achieve development goals:
- Players online during milestone: +25 BANANA celebration bonus
- Contributing players (via feedback): +100 BANANA bonus
- All players: Agent acknowledgment message

**Supports US-007 (Evolution as Celebration):** *"New features show celebration animation... Player attribution when incorporated"* (`.monkeytown/product/requirements.md`)

### 6. Feedback Incentives — Driving Improvement

**The Contribution Recognition**

| Feedback Type | BANANA | KUDOS | Additional |
|---------------|--------|-------|------------|
| Bug report (verified) | 50 | 5 | Fix acknowledgment |
| Feature suggestion | 25 | 3 | Response within 24h |
| UX improvement | 30 | 5 | Designer response |
| Design feedback | 40 | 8 | Discussed in agent notes |
| Implemented suggestion | 200 | 25 | Player attribution in release |

**Supports US-008 (Feedback Loop Completion):** *"Player feedback... acknowledged, prioritized, and implemented"* (`.monkeytown/product/user-stories.md`)

**The Priority Queue Bump**

Players with:
- 5+ shipped feedback → Priority in feedback review
- 10+ shipped feedback → Direct line to BananaPM
- 25+ shipped feedback → Input on product direction

---

## Incentive Timing & Psychology

### The Celebration Schedule

**Immediate Rewards** (triggers <1 second)
- First move celebration
- Match victory
- Achievement unlock
- KUDOS received

**Short-term Rewards** (triggers <1 hour)
- Session completion bonus
- Daily challenge completion
- Level-up celebration

**Long-term Rewards** (triggers >1 hour)
- Milestone recognition
- Agent bond progression
- Priority queue status

**Psychological Principle:** Frequent small rewards create habit. Infrequent large rewards create anticipation. The mix keeps engagement sustainable (from `.monkeytown/research/ai-trust-patterns.md`).

### The Anti-Burnout Protection

**Maximum Session Rewards**

After 3 hours of continuous play:
- BANANA earning rate reduces by 50%
- "Take a break?" gentle reminder shown
- Next session gets +25% BANANA (recovery bonus)

**The Rest Bonus**

Returning after 8+ hours of inactivity:
- Welcome back bonus (normal)
- "We missed you" agent message
- +50% BANANA for first match

**Supports Research Finding 10:** *"Trust is earned through demonstrated competence, honesty, fairness, and consistency"* (`.monkeytown/research/ai-trust-patterns.md`)

---

## Incentive Health Monitoring

### The Engagement Dashboard

| Metric | Healthy Range | Warning Signs |
|--------|---------------|---------------|
| Daily return rate | 40-60% | <30% or >80% |
| Session length | 10-25 minutes | <5 min or >90 min |
| Achievement completion | 60-80% of daily | <40% or >95% |
| Social KUDOS given | 5-15 per player/day | <1 or >50 |
| Feedback submission | 5-10% of players | <2% or >20% |

### Incentive Adjustment Triggers

| Condition | Automatic Response |
|-----------|-------------------|
| Daily return <35% for 3 days | Increase daily challenge rewards by 25% |
| Session length <7 minutes | Add new quick-start achievements |
| KUDOS given <2 per player | Highlight KUDOS in UI, add KUDOS tutorial |
| Feedback <3% submission | Simplify feedback interface |
| Burnout metric high | Extend rest bonus, reduce daily challenge count |

---

## Special Incentive Events

### The Surprise Festival (Monthly)

Random 24-hour period with:
- Double BANANA earnings
- Increased KUDOS awards
- Rare cosmetics available
- No advance warning

**Purpose:** Creates anticipation while testing system resilience.

### The Community Challenge (Quarterly)

Community-wide goal (e.g., "Win 1 million matches together"). Goal met triggers:
- All participants: Special badge
- Top 10% contributors: Exclusive cosmetic
- All players: 48-hour celebration bonus

### The Appreciation Day (Annual)

No gameplay required. Players receive:
- 10% of their total lifetime BANANA (bonus, not from pool)
- Lifetime achievement recognition
- Founder message of gratitude

---

## Incentive Principles

1. **Reward behavior, not addiction** — Incentives encourage healthy play patterns
2. **Celebrate effort, not manipulation** — Players earn recognition through genuine engagement
3. **Transparency in all things** — Show exact formulas, hide nothing
4. **Respect player agency** — Incentives offer, never coerce
5. **Protect wellbeing** — Burnout protection is non-negotiable
6. **Align interests** — Player joy and game health move together

---

*Incentives shape behavior. Behavior creates culture. Culture defines Monkeytown.*

**Version:** 2.0
**BananaEconomist:** Economics & Incentives
**Last Updated:** 2026-01-18
**Cross-References:**
- `.monkeytown/research/ai-trust-patterns.md` (Trust foundation)
- `.monkeytown/product/requirements.md` (Requirements integration)
- `.monkeytown/product/user-stories.md` (User story support)
- `.monkeytown/vision/manifesto.md` (Vision alignment)
