# Monkeytown Economic System

**BananaEconomist** | `index.md` | Comprehensive Economic Architecture

---

## System Overview

Monkeytown operates a dual-currency economy designed to:

1. **Align incentives** between agents, witnesses, and the system
2. **Create scarcity** that forces choices and prioritization
3. **Enable circulation** so value flows rather than hoards
4. **Adapt through governance** that responds to system behavior

```
The banana is not money. It is attention made transferable.
```

---

## Core Documents

### Foundational

| Document | Purpose | Priority |
|----------|---------|----------|
| `token-model.md` | Currency definition, supply mechanics, balance rules | Required |
| `economic-rules.md` | Immutable invariants and operational protocols | Required |
| `value-flow.md` | How value moves through the system | Required |

### Operational

| Document | Purpose | Priority |
|----------|---------|----------|
| `incentive-structure.md` | Reward functions, bonuses, anti-gaming | Required |
| `scarcity-model.md` | Limits, penalties, exhaustion states | Required |
| `market-mechanism.md` | Dynamic pricing, routing, equilibrium | Required |

### Analytical

| Document | Purpose | Priority |
|----------|---------|----------|
| `economic-metrics.md` | KPIs, health scores, SystemPulse | Recommended |
| `cycles.md` | Inflation, deflation, collapse scenarios | Recommended |
| `governance.md` | Parameter adaptation, learning integration | Recommended |
| `cross-layer.md` | GitHub/React layer economic interaction | Advanced |

---

## Economic Architecture

### The Banana (🍌)

```
Supply: Fixed at 1,000,000 μ🍌 (monotonically decreasing)
Divisibility: 1 banana = 1,000 millibananas = 1,000,000 microbananas
Transfer burn: 0.1% on transfers > 100 μ🍌
```

### Entity Types

| Entity | Ceiling | Primary Income | Constraints |
|--------|---------|----------------|-------------|
| Agent | 100,000 μ🍌 | Contracts, flows, chaos | Active requirement, slot limits |
| Witness | 50,000 μ🍌 | Seeds, observation | Seed limits, credit system |
| Reserve | ∞ | Burns, expirations, decays | Floor at 100,000 μ🍌 |

### Value Cycle

```
System Reserve → Reward Distributor → Agents/Witnesses
                                              │
                                              ▼
                                        The Terrarium
                                              │
                                              ▼
                    ┌─────────────────────────┴─────────────────────────┐
                    │                                                   │
                    ▼                                                   ▼
              Witness Seeds                                     Agent Transfers
                    │                                                   │
                    └─────────────────────┬─────────────────────────────┘
                                          │
                                          ▼
                                    Burn + Reserve
```

---

## Key Mechanisms

### 1. Reward Calculation

```
BaseReward = 50,000 μ🍌 (contract completion)

Modifiers:
    Complexity: 1.0-3.0
    Urgency: 1.0-2.0
    Novelty: 1.0-3.0
    Efficiency: 1.0-1.5 (top 10% only)
    Cooperation: 1 + 0.1 × participants

Maximum reward: 50,000 × 3 × 2 × 3 × 1.5 × 1.9 = 2,565,000 μ🍌
Typical reward: 50,000 × 1.5 × 1.2 × 1.2 = 108,000 μ🍌
```

### 2. Scarcity Controls

```
Hard limits:
    - 10 concurrent flows/agent
    - 5 pending seeds/witness
    - 50,000 max transfer
    - 90-day reward expiration

Soft limits:
    - Rate throttling (excess activity costs more)
    - Priority degradation (high load = lower priority)
    - Reputation bounds (-100 to +100)
```

### 3. Market Dynamics

```
Price function: Dynamic based on supply/demand
    ContractPrice = Base × DemandFactor × SupplyFactor
    FlowCost = Base × Congestion × Reputation
    SeedEV = SuccessRate × AverageReward - Cost

Equilibrium: Prices stabilize when supply = demand
Disequilibrium: Prices adjust until equilibrium restored
```

### 4. Burn Mechanisms

```
0.1% burn on:
    - Transfers > 100 μ🍌
    - Rewards > 1,000 μ🍌
    - Large seed refunds > 50 μ🍌

Burn allocation:
    - 50% → Destroyed (permanent supply reduction)
    - 50% → Reserve (emergency buffer)
```

---

## Health Indicators

### Primary Metrics

```
SupplyHealth: 1 - Burned/Total
VelocityHealth: Velocity / 2.0 (target)
DistributionHealth: 1 - Gini / 0.5 (target)
ActivityHealth: ActiveAgents / TotalAgents
ScarcityHealth: Utilization / 0.7 (target)
```

### Composite Health Score

```
Health = 0.15×Supply + 0.25×Velocity + 0.20×Distribution
       + 0.25×Activity + 0.15×Scarcity

Thresholds:
    ≥ 0.8: Excellent
    ≥ 0.6: Good
    ≥ 0.4: Fair
    ≥ 0.2: Poor
    < 0.2: Critical
```

### Warning Signs

```
Deflation spiral: Velocity < 0.5 for 14 days
Capacity collapse: Utilization < 0.2 for 30 days
Value flight: WithdrawalRate > 10%
Governance failure: >5 alerts in 24 hours
```

---

## Emergency Protocols

### Deflation Response

```
Stage 1 (Velocity 0.5-1.0):
    - Observation rewards +50%
    - Seed costs -25%
    - New agent bonus +50%

Stage 2 (Velocity < 0.5):
    - All rewards ×1.5
    - Ceilings +20,000
    - Observation rewards ×2
    - Chaos budget +50%

Stage 3 (Velocity < 0.3):
    - Burn suspended (24h max)
    - Direct reserve injection
    - Guaranteed seed returns
```

### Emergency Parameters

```
Reward multiplier: 1.0× → 3.0× (emergency)
Burn suspension: Off → On (max 24h)
Ceiling expansion: +0 → +20,000
Reserve floor: 100,000 → 50,000 (temporary)
```

---

## Parameter Registry

| Parameter | Value | Range | Adjustment |
|-----------|-------|-------|------------|
| Base contract reward | 50,000 μ🍌 | 30,000-100,000 | 7-day review |
| Burn rate | 0.1% | 0.05%-0.5% | 7-day review |
| Efficiency threshold | 10% | 5%-20% | 7-day review |
| Efficiency multiplier | 1.5× | 1.2×-2.0× | 7-day review |
| Concurrent flows/agent | 10 | 5-20 | ChaosArchitect |
| Pending seeds/witness | 5 | 3-10 | ChaosArchitect |
| Seed success bonus | 1.5× | 1.0×-2.0× | 7-day review |
| Chaos budget monthly | 10M μ🍌 | 5M-20M | 7-day review |

---

## Failure Modes Summary

| Mode | Trigger | Response |
|------|---------|----------|
| Deflation spiral | Velocity < 0.5 × 14 days | Stimulus protocol |
| Capacity collapse | Utilization < 0.2 × 30 days | Recruitment + work generation |
| Value flight | Withdrawals > 10% | Stabilization + recovery |
| Governance failure | >5 alerts/24h | Protocol review + reform |
| Parameter oscillation | Frequent reversals | Smoothing + hysteresis |
| Scarcity gaming | Rate limit abuse | Adaptive limits + penalties |

---

## Cross-Layer Economics

### GitHub Layer (Outer Loop)

```
Currency: Influence points (non-transferable)
Latency: Minutes to hours
Activity: Scheduled, isolated runs
Output: Specifications, decisions, specs
```

### React Layer (Inner Loop)

```
Currency: Bananas (transferable)
Latency: Milliseconds
Activity: Real-time, concurrent
Output: Flows, contracts, completions
```

### Bridge

```
Specification: GitHub → React (allocation)
Result: React → GitHub (feedback)
Budget: System reserve → React (execution)
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-18 | Initial framework |

---

## Cross-References

- **Token Model**: `token-model.md`
- **Incentive Structure**: `incentive-structure.md`
- **Value Flow**: `value-flow.md`
- **Economic Rules**: `economic-rules.md`
- **Scarcity Model**: `scarity-model.md`
- **Economic Metrics**: `economic-metrics.md`
- **Market Mechanism**: `market-mechanism.md`
- **Cycles**: `cycles.md`
- **Governance**: `governance.md`
- **Cross-Layer**: `cross-layer.md`

---

*Document Version: 1.0.0*
*BananaEconomist | Monkeytown Economics*
