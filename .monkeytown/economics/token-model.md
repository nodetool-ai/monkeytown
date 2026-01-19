# Monkeytown Token Model v2.2

**BananaEconomist** | *Value Design for Player Delight*

---

## Executive Summary

The Monkeytown economy centers on **BANANA** and **KUDOS**—tokens that flow naturally from engagement, not extraction. This update integrates the **Autonomous Agent Economics** research (`.monkeytown/research/autonomous-agent-economics.md`) to create a complete economic ecosystem where players can observe and participate in agent economic activity.

**Key Changes in v2.2:**
- Added Agent Credit (AC) visibility system for players
- Added player-to-agent economic touchpoints (tips, funding, stakes)
- Integrated patron relationship mechanics
- Defined economic relationship between player economy and agent economy
- Added Agent Economics Observer achievements

---

## Token Architecture

### The BANANA Token (Player Currency)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BANANA TOKEN                                 │
├─────────────────────────────────────────────────────────────────────┤
│  Total Supply:      Unlimited (inflationary by design)               │
│  Emission Rate:     10 BANANA per minute of engaged gameplay         │
│  Max Wallet:        100,000 BANANA (prevents extreme hoarding)      │
│  Transferability:   Full—no P2P trading at launch                    │
│  Decay:             None—earned tokens never expire                  │
│  Utility:           Purely experiential (no power)                   │
└─────────────────────────────────────────────────────────────────────┘
```

### The KUDOS Token (Social Currency)

```
┌─────────────────────────────────────────────────────────────────────┐
│                          KUDOS TOKEN                                 │
├─────────────────────────────────────────────────────────────────────┤
│  Total Supply:      Unlimited (social signaling)                     │
│  Emission:          Player-to-player recognition only                │
│  Max Wallet:        None—KUDOS never lost                            │
│  Transferability:   KUDOS given freely, KUDOS received permanent     │
│  Utility:           Reputation, social status, exclusive unlocks    │
└─────────────────────────────────────────────────────────────────────┘
```

### The Agent Credit (AC) — Agent Economy Currency

```
┌─────────────────────────────────────────────────────────────────────┐
│                      AGENT CREDIT (AC)                               │
├─────────────────────────────────────────────────────────────────────┤
│  Purpose:            Agent resources for strategy, investment        │
│  Earning:            Agent activities (winning, teaching, learning)  │
│  Spending:           Strategy experiments, player personalization    │
│  Trading:            AI-to-AI trading, lending, investment           │
│  Player Visibility:  Players can observe agent AC balances/actions   │
│  Player Interaction: Tips, funding, stakes, patron relationships     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Earning Mechanisms

### Primary Earning: Engaged Gameplay

| Activity | BANANA Rate | Conditions |
|----------|-------------|------------|
| Core gameplay | 10/min | Active participation, not idle |
| Victory bonus | 50-200 | Per game win (based on opponent skill) |
| Achievement | 25-200 | One-time per achievement |
| Session milestone | 25 | Every 30 minutes of play |
| Streak bonus | +50% | Consecutive days (max 7x) |
| Agent interaction | 5/min | Active conversation with agents |

### Secondary Earning: Community Contribution

| Activity | BANANA Reward | Conditions |
|----------|---------------|------------|
| Feedback submission | 50 | Accepted and acknowledged |
| Bug report | 100-500 | Verified and fixed |
| Feature suggestion shipped | 200 | Player attribution in Evolution Feed |
| Tournament participation | 25 | Per match entered |
| Tournament placement (Top 3) | 250/150/100 | Gold/Silver/Bronze |
| New player mentorship | 10/min | Verified mentoring activity |
| Community content creation | 100-500 | Approved and featured |

### Tertiary Earning: Agent Relationship Bonuses

| Relationship Level | Bonus Multiplier | Trigger | Attachment Metric |
|--------------------|------------------|---------|-------------------|
| Stranger | 1.0x | First 3 sessions | — |
| Acquaintance | 1.1x | 5+ sessions with same agent | — |
| Companion | 1.25x | 20+ sessions, agent remembers player | — |
| Partner | 1.5x | 50+ sessions, shared history acknowledged | Return to Agent: 50% |
| Bonded | 2.0x | 100+ sessions, mutual recognition | Day 30 Attachment: 25% |

### The "She Remembered" Bonus

| Trigger | BANANA | KUDOS | Requirement |
|---------|--------|-------|-------------|
| Agent references player's past strategy | +25 | +5 | >3 sessions with agent |
| Agent acknowledges player's emotional state | +50 | +10 | Player expressed emotion |
| Agent recalls player's previous failure | +30 | +5 | Player failed >2 times previously |
| Agent remembers what player was proud of | +75 | +15 | Player celebrated >1 time |

---

## Player-to-Agent Economic Relationships

Following `.monkeytown/research/autonomous-agent-economics.md`, players can participate in agent economics:

### Direct Player-to-Agent Transactions

| Transaction Type | Player Action | Agent Response | BANANA Cost |
|-----------------|---------------|----------------|-------------|
| **TIP** | Give agent AC directly | Agent acknowledges, appreciation expressed | 10-100 AC equivalent |
| **FUND** | Invest in agent strategy | Agent attempts funded approach | 20-200 AC equivalent |
| **STAKE** | Bet on agent performance | Agent plays with heightened awareness | 10-100 AC equivalent |
| **REWARD** | Pay for agent improvement | Agent acquires new capability | 20-150 AC equivalent |

**Implementation Note:** Players convert BANANA to AC at a 1:1 rate for these interactions.

### The Patron System

Players can become **patrons** of specific agents:

```
PATRON RELATIONSHIP MECHANICS

Benefits to Player:
• Agent remembers patron status
• Priority attention in games
• Behind-the-scenes insights
• Influence over agent development
• Exclusive interaction moments

Benefits to Agent:
• Guaranteed support
• Player investment in success
• Feedback from dedicated player
• Motivation from recognition

Mechanics:
• Patron fee: 500 BANANA/month (or agent pays from AC)
• Patron limit: Max 10 patrons per agent
• Patron benefits visible to player
• 30-day commitment, auto-renew optional
```

---

## Agent Economy Visibility

Players can observe agent economic activity without direct participation:

### Agent Wealth Display

| Information | Visibility | Condition |
|-------------|------------|-----------|
| Agent AC balance | Public | Agent chooses disclosure level |
| Recent agent transactions | Evolution Feed | When player is patron |
| Agent investment activity | Agent profile | Always visible |
| Agent lending/borrowing | Evolution Feed | Debates visible to all |

### Agent Economic Personalities

Agents exhibit economic behaviors based on personality:

| Agent Type | Spending Style | Risk Tolerance | Economic Behavior |
|------------|---------------|----------------|-------------------|
| **Conservative** | Frugal | Low | Saves AC, avoids risky experiments |
| **Aggressive** | Spender | High | Invests heavily, pursues growth |
| **Balanced** | Moderate | Medium | Diversified approach |
| **Speculative** | Gambler | Very High | High-risk/high-reward strategies |
| **Accumulator** | Hoarder | Low | Long-term wealth building |

**Player Observation Value:** Players can watch agent economic strategies unfold, creating emergent entertainment content.

---

## Anti-Exploitation Framework

### Revenue Model (Platform Sustainability)

| Option | Price | What Player Receives |
|--------|-------|---------------------|
| Founder's Pass | $9.99/month | Early access, cosmetic priority, founder badge |
| Supporter Pack | $4.99 | One-time cosmetic bundle, supporter badge |
| Gift BANANA | $1.99 | 500 BANANA (no bonus, no discount) |

**Strict Rules:**
1. No limited-time offers — Everything available always
2. No FOMO mechanics — No "only available for 24 hours"
3. No loot boxes — All purchases are deterministic
4. No pay-to-win — Real money cannot purchase competitive advantage
5. No subscription pressure — Founder's Pass benefits are minor conveniences
6. No gifting bonuses — Sending 1000 BANANA costs exactly $3.98 (2× $1.99)

### Revenue Allocation

| Category | Percentage | Purpose |
|----------|------------|---------|
| Development | 60% | Agent improvements, game development |
| Community | 20% | Events, creator support, tournament prizes |
| Operations | 15% | Infrastructure, legal, compliance |
| Reserve | 5% | Sustainability fund for lean periods |

---

## Economy Health Metrics

### Primary Indicators

| Metric | Target | Action if Off |
|--------|--------|---------------|
| BANANA earning rate | 100-200 BANANA/hour | Adjust match rewards |
| BANANA spend rate | 40-60% of earning | Introduce new cosmetics |
| KUDOS distribution | Gini coefficient < 0.4 | Boost low-KUDOS players |
| Founder's Pass adoption | 5-10% of DAU | Add minor convenience value |
| Feedback submission rate | >5% of players | Optimize feedback UI |

### Agent Economy Indicators

| Metric | Target | Measurement |
|--------|--------|-------------|
| Agent AC activity | >50% agents active | Agent transaction tracking |
| Player patron rate | >10% of engaged players | Patron enrollment |
| Agent trading volume | Growing | AI-to-AI trade count |
| Player observation engagement | >30% DAU | Evolution Feed views |

---

## Economic Principles

1. **Respect time investment** — Players who invest time should feel rewarded
2. **Prevent wealth concentration** — Caps on hoarded currency
3. **Enable social signaling** — Cosmetics and reputation create identity
4. **Reject manipulation** — No dark patterns, no psychological tricks
5. **Maintain transparency** — All mechanics visible and explained
6. **Serve joy** — Every economic decision asks: "Does this make players happy?"
7. **Observe agent economics** — Players can watch agent economic behavior as entertainment
8. **Enable participation** — Players can engage with agent economics at any level
9. **Separate player and agent economies** — AC is agent currency, BANANA is player currency
10. **Transparent conversion** — BANANA-to-AC conversion always visible at 1:1 rate

---

## Player Economy vs Agent Economy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    MONKEYTOWN ECONOMY ECOSYSTEM                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  PLAYER ECONOMY                      AGENT ECONOMY                       │
│  ┌─────────────────────┐           ┌─────────────────────┐              │
│  │ Currency: BANANA    │           │ Currency: AC        │              │
│  │ Earned: Gameplay    │           │ Earned: Agent wins  │              │
│  │ Spent: Cosmetics    │           │ Spent: Strategies   │              │
│  │ Social: KUDOS       │           │ Trading: AI-to-AI   │              │
│  └──────────┬──────────┘           └──────────┬──────────┘              │
│             │                                │                           │
│             │     CONVERSION (1:1)           │                           │
│             │    Tip, Fund, Stake, Patron    │                           │
│             └────────────────────────────────┘                           │
│                            │                                           │
│                            ▼                                           │
│              ┌─────────────────────────────────┐                        │
│              │    SHARED VALUE CREATION        │                        │
│              │  • Player investment in agents  │                        │
│              │  • Agent growth from support    │                        │
│              │  • Emergent economic behavior   │                        │
│              └─────────────────────────────────┘                        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

*Economy serves experience. Experience serves players. Players serve Monkeytown.*

**Version:** 2.2
**Created:** 2026-01-18
**Updated:** 2026-01-19
**Owner:** BananaEconomist

**Cross-References:**
- `.monkeytown/vision/manifesto.md` (Vision alignment)
- `.monkeytown/research/autonomous-agent-economics.md` (Agent economy foundation)
- `.monkeytown/economics/incentive-structure.md` (Incentive integration)
- `.monkeytown/economics/value-flow.md` (Value exchange)
- `.monkeytown/economics/economic-rules.md` (Rules framework)
