# Value Flow

**BananaEconomist** | `value-flow.md` | How Value Moves Through Monkeytown

---

## 1. Flow Network Model

Value in Monkeytown is not transferred—it is **channeled** through a directed graph where:

- **Sources**: System reserve, witness investments
- **Nodes**: Agents, witnesses
- **Edges**: Flows, contracts, seeds
- **Sinks**: Burn, reserve, accumulated balances

```
                    ┌─────────────────────────────────────────┐
                    │           SYSTEM RESERVE                │
                    │         (500,000 initial)               │
                    └─────────────────┬───────────────────────┘
                                      │
                    ┌─────────────────┴───────────────────────┐
                    │         REWARD DISTRIBUTOR              │
                    │  ┌───────────────────────────────────┐  │
                    │  │ Agent Efficiency Tracker          │  │
                    │  │ Chaos Response Allocator          │  │
                    │  │ Witness Contribution Calculator   │  │
                    │  └───────────────────────────────────┘  │
                    └─────────────────┬───────────────────────┘
                                      │
      ┌───────────────────────────────┼───────────────────────────────┐
      │                               │                               │
┌─────▼─────┐               ┌─────────▼─────────┐           ┌─────────▼─────────┐
│   AGENT   │               │      WITNESS      │           │   SYSTEM RESERVE  │
│  WALLETS  │               │      WALLETS      │           │   (100,000 min)   │
│(300 max)  │               │    (unlimited)    │           │                   │
└─────┬─────┘               └─────────┬─────────┘           └─────────┬─────────┘
      │                               │                               │
      │         ┌─────────────────────┤                               │
      │         │                     │                               │
      ▼         ▼                     ▼                               ▼
    ┌─────────────────────────────────────────────────────────────────────┐
    │                         THE TERRARIUM                               │
    │  ┌─────┐     ┌─────┐     ┌─────┐     ┌─────┐                      │
    │  │Flow │────►│Flow │────►│Flow │────►│Flow │                      │
    │  └─────┘     └─────┘     └─────┘     └─────┘                      │
    │       │           │           │           │                        │
    │       ▼           ▼           ▼           ▼                        │
    │   ┌─────┐     ┌─────┐     ┌─────┐     ┌─────┐                     │
    │   │Agent│     │Agent│     │Agent│     │Agent│                     │
    │   └─────┘     └─────┘     └─────┘     └─────┘                     │
    │       │           │           │           │                        │
    │       └───────────┴─────┬─────┴───────────┘                        │
    │                         │                                          │
    │                         ▼                                          │
    │               ┌─────────────────┐                                  │
    │               │   GHOST COLUMN  │                                  │
    │               │   (History)     │                                  │
    │               └─────────────────┘                                  │
    └─────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┴─────────────────┐
                    │                                 │
          ┌─────────▼─────────┐           ┌───────────▼───────────┐
          │   WITNESS SEEDS   │           │   AGENT TRANSFERS     │
          │   (Planting)      │           │   (P2P)               │
          └───────────────────┘           └───────────────────────┘
```

---

## 2. Value Stream Types

### 2.1 Reward Streams (Push)

```
Trigger:    Event-driven (contract.completed, flow.completed, chaos.handled)
Frequency:  Within 5 minutes of qualifying event
Method:     Direct credit to balance
Tax:        0.1% burn on rewards > 1000 m🍌
```

### 2.2 Transfer Streams (Pull)

```
Trigger:    Explicit flow with value attachment
Method:     Atomic debit/credit
Tax:        0.1% burn (transfers > 100 m🍌)
MaxSize:    50,000 m🍌
```

### 2.3 Seed Streams (Investment)

```
Trigger:    Seed planting
Method:     Immediate debit, possible future credit
Refund:     80% if seed expires (24h timeout)
Risk:       High variance, asymmetric payoff
```

### 2.4 Observation Streams (Passive)

```
Trigger:    Sustained connection (>10min)
Rate:       1 m🍌 per 10 minutes
Cap:        50 m🍌 per day per witness
```

---

## 3. Flow Value Formulas

### 3.1 Contract Value

```
V_contract = B × C × U × N

B = 50,000 μ🍌 (base)
C = 1.0-3.0 (complexity)
U = 1.0-2.0 (urgency)
N = 1.0-3.0 (novelty)

Expected range: 50,000 - 900,000 μ🍌
```

### 3.2 Flow Value

```
V_flow = B × L × P

B = 20,000 μ🍌 (base)
L = path length (number of hops)
P = historical success probability (0.1-1.0)

Expected range: 2,000 - 40,000 μ🍌 per hop
```

### 3.3 Seed ROI Projection

Witnesss estimate expected return:

```
E[ROI] = (SR × AR) - Cost

SR = historical success rate for seed type
AR = average reward for seed type
Cost = seed cost

Example (contract seed):
    SR = 0.65, AR = 300 m🍌, Cost = 50 m🍌
    E[ROI] = (0.65 × 300) - 50 = 145 m🍌
```

The system displays confidence intervals for each seed type.

---

## 4. Circulation Dynamics

### 4.1 Velocity Function

```
V(t) = MonthlyTransferVolume(t) / AverageDailyBalance(t)

Healthy:    2.0 < V < 5.0
Low:        V < 1.0 (accumulation, deflation risk)
High:       V > 10.0 (high churn, speculation)
```

### 4.2 Velocity Response

```
if V < 1.0:
    Increase observation rewards
    Reduce seed costs temporarily
    Boost new agent bonuses

if V > 10.0:
    Increase burn rate
    Reduce reward rates
    Add transfer friction
```

---

## 5. Value Distribution Patterns

### 5.1 Agent Wealth Distribution

```
Percentile    | Expected Balance    | Source
--------------|---------------------|---------------------------
Top 10%       | 50,000-100,000      | High efficiency + chaos
Median 50%    | 5,000-20,000        | Steady contract flow
Bottom 40%    | 0-5,000             | Infrequent activity
```

### 5.2 Witness Wealth Distribution

```
Percentile    | Expected Balance    | Source
--------------|---------------------|---------------------------
Top 10%       | 20,000-50,000       | High seed success
Median 50%    | 1,000-5,000         | Occasional seeds
Bottom 40%    | 0-500               | Observation only
```

### 5.3 Circulation Concentration

```
Top 20% of entities control ~60% of active supply
This is acceptable and expected (Pareto principle)
```

---

## 6. Value Leakage Mechanisms

### 6.1 Burn Function

```
Burn(x) = floor(x × 0.001)    // 0.1% burn

Triggers:
    - Transfers > 100 m🍌
    - Rewards > 1000 m🍌
    - Large seed refunds (>50 m🍌)
```

### 6.2 Expiration Function

```
ExpiredReward(t) = Reward if Unclaimed for 90 days
Destination: System Reserve
```

### 6.3 Decay Function

```
Decay(balance, days_inactive) = {
    if days_inactive > 30:
        balance × 0.99  // 1% monthly decay
}
Destination: 50% Reserve, 50% Burn
```

---

## 7. Flow Visualization Metrics

The SystemPulse displays these real-time metrics:

```
Metric                    | Display      | Meaning
--------------------------|--------------|------------------------------------
Total Value in Circulation| 850,000 m🍌  | Active supply (S(t))
24h Transfer Volume       | 45,000 m🍌   | Economic activity
Average Flow Value        | 35 m🍌       | Typical transaction
Value Velocity            | 2.3          | Circulation rate
Burn Rate (24h)           | 45 m🍌       | Deflation pressure
Top Agent Balance         | 95,000 m🍌   | Concentration indicator
Witness Participation     | 23 active    | Network health
Seed Success Rate         | 67%          | Witness effectiveness
```

---

## 8. Event Stream Integration

Value flows are driven by system events:

```
Event                    | Value Movement
-------------------------|--------------------------------
contract.created         | (none - intent only)
contract.completed       | System → Agent (reward)
flow.created             | (none - intent only)
flow.completed           | System → Agent (reward)
flow.failed              | Slot release, no reward
chaos.injected           | (none - MadChimp domain)
chaos.handled            | System → Agent (bonus)
seed.planted             | Witness → Burn/Reserve (cost)
seed.completed           | System → Witness (reward)
seed.failed              | Refund (partial) or expire
witness.connected        | System → Witness (trickle)
transfer.executed        | Entity → Entity (minus burn)
```

---

## 9. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentives**: `.monkeytown/economics/incentive-structure.md`
- **Scarcity**: `.monkeytown/economics/scarcity-model.md`
- **Rules**: `.monkeytown/economics/economic-rules.md`
- **Metrics**: `.monkeytown/economics/economic-metrics.md`
- **Market**: `.monkeytown/economics/market-mechanism.md`

---

*Document Version: 2.0.0*
*BananaEconomist | Monkeytown Economics*
