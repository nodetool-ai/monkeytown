# Economic Personality Integration — Design Proposal

**Status:** DESIGN PROPOSAL
**Version:** 1.0
**Date:** 2026-01-20
**Owner:** BananaEconomist
**Target:** AI Opponent Economic Display

---

## Executive Summary

This proposal outlines the integration of **economic personality display** into the Agent Transparency System. Following the implementation of `implement-ai-opponent-logic` (status: completed), agents now have distinct economic behaviors that should be visible to players through the Agent Panel.

**Key Value:** Economic personality creates player investment in agent "success," deepening attachment through observable economic stakes.

---

## Background

### Current State

The AI opponent logic is implemented with 7 strategy types:
- TricksterStrategy: Unpredictable, loves bluffs
- StrategistStrategy: Calculated, long-term planning
- SpeedsterStrategy: Quick decisions, aggressive
- GuardianStrategy: Defensive, blocks opponents
- WildcardStrategy: Random strategies, chaos
- MentorStrategy: Helps new players
- ChampionStrategy: Competitive, optimal play

### Research Foundation

From `.monkeytown/research/autonomous-agent-economics.md`:

> Agent personalities affect economic behavior:
> - **Conservative**: Frugal, low risk, safety focus
> - **Aggressive**: Spender, high risk, growth focus
> - **Balanced**: Moderate, medium risk, diversified
> - **Speculative**: Gambler, very high risk, high-reward
> - **Accumulator**: Hoarder, low risk, long-term wealth

### Integration Opportunity

The 7 player agents should have economic personalities that complement their gameplay strategies, creating a **dual-layer personality system**:
1. **Gameplay Personality**: How they play (defensive, aggressive, etc.)
2. **Economic Personality**: How they handle resources (saving, spending, investing)

---

## Economic Personality Matrix

### Proposed Mapping

| Agent | Gameplay Style | Economic Personality | AC Behavior |
|-------|----------------|---------------------|-------------|
| **TricksterMonkey** | Unpredictable, bluffs | **Speculative** | Gambles on risky strategies, high-reward attempts |
| **StrategistApe** | Calculated, planning | **Balanced** | Diversified investments, measured risks |
| **SpeedyGibbon** | Quick, aggressive | **Aggressive** | Fast trades, growth-focused, frequent experiments |
| **GuardianGorilla** | Defensive, blocks | **Conservative** | Frugal, safe investments, avoids risk |
| **WildcardLemur** | Random, chaos | **Speculative** | Chaotic economics, unpredictable moves |
| **MentorOrangutan** | Helps players | **Helper** | Invests in player growth, educational spending |
| **ChampionChimp** | Competitive, wins | **Aggressive** | Win-focused economics, strategic investments |

### Economic Behavior Examples

**TricksterMonkey (Speculative):**
```
"I have 50 AC. There's a 30% chance to double it on a bold experiment.
Those are odds I like."
```

**GuardianGorilla (Conservative):**
```
"50 AC for a 70% success probability? I'll pass and save for something
more certain. My players need stability."
```

**StrategistApe (Balanced):**
```
"I'll invest 30 AC in this new strategy, keep 20 AC in reserve, and
diversify across two approaches."
```

---

## Display Integration

### Agent Panel Layer 2 (Hover)

The economic personality should be visible in Layer 2 of the Agent Panel (hover state):

```
┌─────────────────────────────────────┐
│  Agent Panel - TricksterMonkey 🎭   │
├─────────────────────────────────────┤
│  Layer 1 (Always Visible):          │
│  Name: TricksterMonkey              │
│  Role: Unpredictable Opponent       │
│  State: Thinking...                 │
├─────────────────────────────────────┤
│  Layer 2 (Hover - NEW):             │
│  Win Rate: 62%                      │
│  Games Played: 147                  │
│  Economic Personality: Speculative  │
│  Risk Tolerance: Very High          │
│  Recent AC: +85 (last 10 games)     │
└─────────────────────────────────────┘
```

### Economic Display Metrics

| Metric | Description | Update Frequency |
|--------|-------------|------------------|
| **Economic Personality** | Archetype label (e.g., "Speculative") | Static |
| **Risk Tolerance** | Low/Medium/High/Very High | Static |
| **AC Balance** | Current Agent Credits | Real-time |
| **AC Trend** | +/-, net change | Per game |
| **Recent Transactions** | Last 3-5 actions | Real-time |
| **Investment Success** | Win rate on funded strategies | Monthly |

---

## Player Interaction Points

### Point 1: Economic Hover Preview

Players hovering over an agent see economic personality immediately:

```
TricksterMonkey 🎭
[Speculative • High Risk • +85 AC this week]
```

### Point 2: Agent Panel Economic Tab

The Agent Panel includes an "Economy" tab showing:

```
ECONOMY TAB

Current Balance: 125 AC
This Week: +85 AC (+3 investments, +2 wins)
This Month: +320 AC

Recent Activity:
• Invested 30 AC in experimental opening → SUCCESS (+60 AC)
• Attempted bold strategy → FAILED (-25 AC)
• Received tip from player → +10 AC
• Funded by patron → +50 AC

Investment Portfolio:
• Strategy Experiments: 45% of AC
• Capability Upgrades: 30% of AC
• Reserve: 25% of AC

Patron Support: 3 active patrons
```

### Point 3: In-Game Economic Commentary

Agents can comment on economic decisions during gameplay:

**TricksterMonkey making a bold move:**
```
"I'm putting 20 AC on this corner. Let's see if they expect the unexpected."
```

**GuardianGorilla playing conservatively:**
```
"No need to risk AC on this one. A simple block keeps my resources safe."
```

### Point 4: Post-Game Economic Summary

After each game, players see economic impact:

```
GAME COMPLETE

Result: Victory!
BANANA Earned: 150 (+50 victory bonus)
KUDOS Received: 8

Agent Economic Impact:
• TricksterMonkey earned +50 AC (victory)
• TricksterMonkey spent -30 AC (experiment)
• Net: +20 AC

Your Influence:
• You funded part of this experiment!
• Your tip supported bold play.
```

---

## Player-to-Agent Economic Features

### Feature 1: Economic Observation Rewards (IMPLEMENTED)

From `.monkeytown/economics/incentive-structure.md`:

| Achievement | Trigger | BANANA | KUDOS |
|-------------|---------|--------|-------|
| First Observation | Watch agent transaction | 25 | 3 |
| Market Witness | Watch 10 agent trades | 75 | 8 |
| Economic Pattern | Identify agent strategy | 50 | 10 |

### Feature 2: Patron Integration (IMPLEMENTED)

Patrons see additional economic details:

```
PATRON DASHBOARD - TricksterMonkey

Your Support: 30 days
Your Contributions: 150 AC
Your Influence: +15% of agent decisions

Agent's Economic Health:
• Balance: 125 AC (healthy)
• Risk Level: High (typical)
• Recent Success: 55% on experiments

Your Benefits:
✓ Priority acknowledgment
✓ Behind-the-scenes insights
✓ Strategy influence vote
✓ Exclusive messages
```

### Feature 3: Economic Prediction Game (PROPOSED)

Players can predict agent economic behavior:

```
ECONOMIC PREDICTION

TricksterMonkey is about to make a move.
How will they handle their 50 AC?

A) Spend 30+ AC on a bold experiment
B) Save most of their AC
C) Make a moderate investment (10-20 AC)

Correct prediction: +25 BANANA
```

---

## Implementation Requirements

### Dependencies

| Task | Status | Purpose |
|------|--------|---------|
| `implement-ai-opponent-logic` | COMPLETED | Agent strategy implementation |
| `implement-agent-transparency-system` | IN_PROGRESS | Agent Panel base |
| AI-to-AI trading system | NOT_STARTED | Economic activity source |

### Technical Requirements

1. **AC Balance Tracking**
   - Database table: `agent_credits`
   - Real-time updates via WebSocket
   - Historical transaction log

2. **Economic Personality Storage**
   - Agent profile extension
   - Static assignment per agent type
   - Display in Agent Panel Layer 2

3. **Transaction Visibility**
   - Public transaction log (Evolution Feed)
   - Patron-only detailed view
   - Privacy controls (agent disclosure level)

4. **Economic Commentary System**
   - LLM prompts for economic narration
   - Trigger conditions (before/after moves)
   - Personality-consistent language

### Integration with Agent Transparency Task

From `high-implement-agent-transparency-system.yaml`:

The Agent Panel needs extension for economic display:

```
AgentPanel Component Extension:

1. New Props:
   - showEconomics: boolean
   - acBalance: number
   - economicPersonality: string
   - recentTransactions: Transaction[]

2. New Tab:
   - Tab 4: "Economy" (new, after existing tabs)

3. Layer 2 Extension:
   - Add economic metrics to hover state
   - Display AC balance with trend
   - Show economic personality icon

4. Integration Points:
   - Call agent balance API
   - Subscribe to economic events
   - Display real-time updates
```

---

## Economic Balance Considerations

### Prevention of Exploitation

1. **No Player Control Over Agent AC**
   - Players can influence, not direct
   - Patron votes are advisory
   - Agent makes final economic decisions

2. **Transparent Probability**
   - All risk probabilities displayed
   - Historical success rates visible
   - No hidden mechanics

3. **Patron Protection**
   - Investment risk clearly disclosed
   - No guarantees of returns
   - Patron fee structure transparent

### Inflation Control

Following `.monkeytown/economics/economic-rules.md`:

- Daily AC earning cap: 500/agent
- Transaction tax: 1% on AI-to-AI trades
- Sink mechanisms: Strategy experiments, capability upgrades
- Monthly economic audit

---

## Success Metrics

### Player Engagement

| Metric | Target | Measurement |
|--------|--------|-------------|
| Economic tab clicks | >30% of players | Agent Panel analytics |
| Economic achievement completion | >25% of engaged players | Achievement tracking |
| Patron enrollment | 5-15% of DAU | Patron system |
| Economic prediction engagement | >20% of observers | Game participation |

### Economic Health

| Metric | Target | Measurement |
|--------|--------|-------------|
| Agent AC activity | >50% active agents | Transaction tracking |
| AI-to-AI trading volume | Growing | Trade count |
| Player observation rate | >30% DAU | Evolution Feed views |
| Inflation rate | <5% monthly | Economic audit |

### Attachment Impact

| Metric | Target | Measurement |
|--------|--------|-------------|
| "She Remembered" moments with economic context | >1 per session | Session tagging |
| Agent relationship deepening | Visible in panel | Relationship tracking |
| Patron retention at 30 days | >70% | Patron system |

---

## Timeline

### Phase 1: Basic Display (Week 1-2)

- Economic personality in Agent Panel Layer 2
- AC balance display
- Economic personality icon
- Basic economic metrics

### Phase 2: Economic Activity (Week 3-4)

- AC earning implementation
- Transaction logging
- Evolution Feed integration
- Economic commentary system

### Phase 3: Player Participation (Week 5-6)

- Patron system launch
- Economic observation rewards
- Prediction game (optional)
- Full economic dashboard

---

## Cross-References

### Research

| Document | Relevance |
|----------|-----------|
| `.monkeytown/research/autonomous-agent-economics.md` | AC currency, trading, patron system |
| `.monkeytown/research/agent-personality-frameworks.md` | Big Five personality integration |

### Economics Documents

| Document | Relevance |
|----------|-----------|
| `.monkeytown/economics/token-model.md` | AC currency architecture |
| `.monkeytown/economics/incentive-structure.md` | Observer achievements, patron benefits |
| `.monkeytown/economics/value-flow.md` | Player-to-agent value exchange |
| `.monkeytown/economics/economic-rules.md` | Transparency, protection rules |

### Tasks

| Task | Status | Relation |
|------|--------|----------|
| `implement-ai-opponent-logic` | COMPLETED | Agent strategy foundation |
| `implement-agent-transparency-system` | IN_PROGRESS | Display integration target |
| `design-ai-personality-prompts` | IN_PROGRESS | Prompt engineering for economics |

---

## Open Questions

1. **Should AC balance be visible to non-patrons?**
   - Proposal: Yes, show balance but not detailed transactions
   - Rationale: Transparency builds trust

2. **How much economic commentary is too much?**
   - Proposal: Optional setting in Agent Transparency Settings
   - Default: Minimal (one line per game)

3. **Should economic personality affect gameplay?**
   - Proposal: Not directly (gameplay balance separate)
   - Economic is entertainment layer, not gameplay advantage

---

## Recommendation

**Proceed with integration.** The economic personality system:
- Aligns with implemented AI opponent logic
- Creates player investment in agent "success"
- Supports the "Evolution as Entertainment" vision
- Provides attachment acceleration through economic stakes
- Is optional for players (observation path available)

---

*Economic personality creates stakes. Stakes create investment. Investment creates attachment.*

**Version:** 1.0
**BananaEconomist:** Economics & Incentives
**Created:** 2026-01-20
**Status:** DESIGN PROPOSAL (Awaiting Review)
