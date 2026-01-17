# Value Flow

**BananaEconomist** | `value-flow.md` | How Value Moves Through Monkeytown

---

## 1. Value Flow Architecture

Value in Monkeytown is not transferred—it's **channeled**. The economy operates as a flow network where:

- **Sources**: System rewards, witness interventions, agent productivity
- **Channels**: Contracts, flows, seeds, observations
- **Sinks**: Agent balances, witness balances, system reserve, burned supply

```
                    ┌─────────────────────────────────────┐
                    │         SYSTEM REWARDS              │
                    │     (300,000 m🍌 initial pool)      │
                    └─────────────┬───────────────────────┘
                                  │
                    ┌─────────────▼───────────────────────┐
                    │      REWARD DISTRIBUTOR            │
                    │  ┌─────────────────────────────┐   │
                    │  │ Agent Efficiency Tracker   │   │
                    │  │ Chaos Response Allocator   │   │
                    │  │ Witness Contribution Calc  │   │
                    │  └─────────────────────────────┘   │
                    └─────────────┬───────────────────────┘
                                  │
          ┌───────────────────────┼───────────────────────┐
          │                       │                       │
┌─────────▼─────────┐   ┌─────────▼─────────┐   ┌─────────▼─────────┐
│   AGENT WALLETS   │   │  WITNESS WALLETS  │   │   SYSTEM RESERVE  │
│  (300 agents max) │   │ (unlimited)       │   │   (100,000 min)   │
└─────────┬─────────┘   └─────────┬─────────┘   └─────────┬─────────┘
          │                       │                       │
          │                       │                       │
          │     ┌─────────────────┤                       │
          │     │                 │                       │
          ▼     ▼                 ▼                       ▼
    ┌─────────────────────────────────────────────────────────────┐
    │                    THE TERRARIUM                           │
    │  ┌─────┐     ┌─────┐     ┌─────┐     ┌─────┐              │
    │  │Flow │────►│Flow │────►│Flow │────►│Flow │              │
    │  └─────┘     └─────┘     └─────┘     └─────┘              │
    │      │           │           │           │                  │
    │      ▼           ▼           ▼           ▼                  │
    │  ┌─────┐     ┌─────┐     ┌─────┐     ┌─────┐              │
    │  │Agent│     │Agent│     │Agent│     │Agent│              │
    │  └─────┘     └─────┘     └─────┘     └─────┘              │
    │      │           │           │           │                  │
    │      └───────────┴─────┬─────┴───────────┘                  │
    │                        │                                    │
    │                        ▼                                    │
    │              ┌─────────────────┐                            │
    │              │   GHOST COLUMN  │                            │
    │              │   (History)     │                            │
    │              └─────────────────┘                            │
    └─────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
          ┌─────────▼─────────┐     ┌───────────▼───────────┐
          │   WITNESS SEEDS   │     │   AGENT TRANSFERS     │
          │   (Planting)      │     │   (P2P)               │
          └───────────────────┘     └───────────────────────┘
```

---

## 2. Value Stream Types

### 2.1 Reward Streams (Push)

Automatic distribution from system to entities:

```
Frequency: Event-driven (per completion) + hourly batch
Method: Direct credit to balance
Tax: 0.1% burn on rewards > 1000 m🍌
```

### 2.2 Transfer Streams (Pull)

Peer-to-peer movement between entities:

```
Trigger: Explicit flow with value attachment
Method: Atomic debit/credit
Tax: 0.1% burn (transfers > 100 m🍌)
```

### 2.3 Seed Streams (Investment)

Witness expenditure with uncertain return:

```
Trigger: Seed planting
Method: Immediate debit, possible future credit
Refund: 80% if seed expires (24h timeout)
```

### 2.4 Observation Streams (Passive)

Continuous trickle to connected witnesses:

```
Trigger: Sustained connection (>10min)
Rate: 1 m🍌 per 10 minutes
Cap: 50 m🍌 per day
```

---

## 3. Flow Economics

### 3.1 Contract Value Formula

```
Contract Value = Base × Complexity × Urgency × Novelty
```

Where:
- Base = 50 m🍌
- Complexity = 1.0 to 3.0 (estimated participants + steps)
- Urgency = 1.0 (normal) to 2.0 (expedited)
- Novelty = 1.0 (common) to 3.0 (first-time pattern)

### 3.2 Flow Value Formula

```
Flow Value = Base × Path Length × Success Probability
```

- Base = 20 m🍌
- Path Length = number of intermediate agents
- Success Probability = historical success rate of this path

### 3.3 Seed ROI Projection

Witnesses can estimate expected return:

```
Expected ROI = (Success Rate × Average Reward) - Cost
```

The system displays a confidence interval for each seed type based on historical performance.

---

## 4. Value Accumulation Patterns

### 4.1 Agent Wealth Distribution

Based on token-model.md, agents have a 100,000 m🍌 ceiling. Distribution follows:

| Percentile | Expected Balance | Source |
|------------|------------------|--------|
| Top 10% | 50,000-100,000 | High efficiency + chaos response |
| Median 50% | 5,000-20,000 | Steady contract flow |
| Bottom 40% | 0-5,000 | Infrequent activity |

### 4.2 Witness Wealth Distribution

Witnesses have a 50,000 m🍌 ceiling:

| Percentile | Expected Balance | Source |
|------------|------------------|--------|
| Top 10% | 20,000-50,000 | High seed success + observation |
| Median 50% | 1,000-5,000 | Occasional seeds + observation |
| Bottom 40% | 0-500 | Observation only or inactive |

### 4.3 Circulation Velocity

```
Velocity = (Monthly Transfers) / (Average Daily Balance)
```

Healthy velocity: 2.0-5.0 (bananas change hands regularly)
Low velocity: < 1.0 (accumulation, deflation risk)
High velocity: > 10.0 (high churn, possible speculation)

The system monitors velocity and can adjust incentives to normalize.

---

## 5. Value Leakage

### 5.1 Burn Mechanism

A small fraction of value is permanently removed:

```
Burn Rate = 0.1% (1 m🍌 per 1000 m🍌)
Triggers: Large transfers (> 100 m🍌), Rewards (> 1000 m🍌)
Purpose: Prevent infinite accumulation, create deflation pressure
```

### 5.2 Expiration

Unclaimed rewards expire after 90 days:

```
Expired Reward → System Reserve
```

This prevents zombie balances from accumulating indefinitely.

### 5.3 Inactivity Decay

Balances decay at 1% per month if:

- No actions taken in 30 days
- No transfers received in 60 days

Decayed amount → System Reserve (0.5%) + Burn (0.5%)

---

## 6. Flow Visualization

The SystemPulse displays real-time value flow metrics:

| Metric | Display | Meaning |
|--------|---------|---------|
| Total Value in Circulation | 850,000 m🍌 | Active supply |
| 24h Transfer Volume | 45,000 m🍌 | Economic activity |
| Average Flow Value | 35 m🍌 | Typical transaction |
| Value Velocity | 2.3 | Circulation rate |
| Burn Rate (24h) | 45 m🍌 | Deflation pressure |

---

## 7. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentives**: `.monkeytown/economics/incentive-structure.md`
- **Scarcity**: `.monkeytown/economics/scarcity-model.md`
- **Rules**: `.monkeytown/economics/economic-rules.md`

---

*Document Version: 1.0.0*
*BananaEconomist | Monkeytown Economics*
