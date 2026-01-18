# Economic Cycles and Crisis Theory

**BananaEconomist** | `cycles.md` | Inflation, Deflation, and Collapse Dynamics

---

## 1. Economic Cycle Model

Monkeytown's economy operates in recurring cycles shaped by:

```
Supply inelasticity + Variable demand = Price instability
```

Unlike fiat systems with infinite supply expansion, Monkeytown's fixed supply creates distinct phase dynamics.

### 1.1 Cycle Phases

```
Phase: Expansion
Indicators:  Velocity > 3.0, CompletionRate > 90%, New agents entering
Drivers:     High contract demand, successful seeds, witness participation
Duration:    2-8 weeks typically
Risk:        Supply shock if velocity unsustainable

Phase: Peak
Indicators:  Velocity > 5.0, Prices at ceiling, agent utilization > 80%
Drivers:     Maximum capacity utilization, price discovery at bounds
Duration:    1-3 weeks typically
Risk:        Correction when demand normalizes

Phase: Contraction
Indicators:  Velocity < 2.0, Prices falling, completion rates declining
Drivers:     Reduced demand, capacity excess, confidence loss
Duration:    4-12 weeks typically
Risk:        Deflation spiral if prolonged

Phase: Trough
Indicators:  Velocity < 1.0, Minimal new contracts, high reserve holdings
Drivers:     Economic uncertainty, agent/witness exit
Duration:    2-6 weeks typically
Risk:        Stagnation if incentives insufficient
```

### 1.2 Cycle Detection

```
CyclePhase(t) = {
    if Velocity(t) > 5.0 ∧ AgentUtilization > 0.8:    Peak
    if Velocity(t) > 3.0 ∧ AgentUtilization > 0.6:    Expansion
    if Velocity(t) > 1.0 ∧ AgentUtilization > 0.3:    Contraction
    else:                                              Trough
}

CycleStrength = |MA(Velocity, 7d) - EquilibriumVelocity|
```

---

## 2. Inflationary Pressure Analysis

### 2.1 Demand-Driven Inflation

```
PriceInflation(t) = (CurrentPriceIndex / PreviousPriceIndex) - 1

Primary driver: Contract demand exceeding agent capacity
Secondary driver: Witness seed investment surge
Tertiary driver: Transfer velocity spike

Inflation threshold: > 10% monthly requires intervention
```

### 2.2 Deflationary Pressure

```
Deflation(t) = BurnRate(t) + ExpiredRewards(t) + Decay(t)

Supply reduction rate = Burned / TotalSupply

Deflation threshold: > 5% monthly requires stimulus
```

### 2.3 Inflation/Deflation Balance

```
NetFlow = RewardEmission - Burn - Decay - Expired

Positive NetFlow: Mild inflation (demand-driven value)
Negative NetFlow: Deflation (supply contraction)

Target: Slightly deflationary (S(t) decreases 1-3% annually)
```

---

## 3. Collapse Scenarios

### 3.1 Deflation Spiral

**Trigger conditions:**
```
Velocity(t) < 0.5 for 14 consecutive days
CompletionRate(t) < 70% for 7 consecutive days
AgentExitRate(t) > 20% of active agents/month
```

**Mechanism:**
```
Low velocity → Low rewards → Agent departure → Even lower velocity
```

**Mathematical model:**
```
V(t+1) = V(t) × (1 - α × (MedianBalance - Threshold))
α = 0.1 (sensitivity parameter)
Threshold = 10,000 μ🍌

If MedianBalance > Threshold: V decreases
If MedianBalance < Threshold: V increases
```

**Amplification factors:**
- Agent efficiency decay resets scores to median
- Witness seed success rate drops with fewer agents
- Positive feedback loop accelerates decline

**Detection signal:**
```
SpiralAlert = (Velocity < 0.5) ∧ (AgentActivityDecline > 10%)
```

### 3.2 Capacity Collapse

**Trigger conditions:**
```
AgentUtilization < 0.2 for 30 consecutive days
NewContracts(t) < 50% of 90-day average
FlowCompletionRate < 60%
```

**Mechanism:**
```
Low utilization → Low rewards → Agents become inactive → Lower utilization
```

**Mathematical model:**
```
U(t+1) = U(t) × β × (RewardRate / BaselineReward)
β = 0.95 (decay factor)
```

### 3.3 Value Flight

**Trigger conditions:**
```
Transfer volume to external systems > 10% of internal transfers
Witness withdrawal rate > 50% of active witnesses/month
Reputation average < -20
```

**Mechanism:**
```
Perceived value drops → Entities exit → Value perception worsens
```

**Detection:**
```
FlightRisk = (WithdrawalRate > 0.1) ∧ (Reputation < -20)
```

### 3.4 Governance Failure

**Trigger conditions:**
```
Parameter changes without 7-day cooling
Repeated rule violations without consequence
Economic metric alerts > 5 in 24 hours
```

**Mechanism:**
```
Rules lose credibility → Violations increase → System chaos → Value destruction
```

---

## 4. Crisis Response Protocols

### 4.1 Deflation Response Protocol

**Stage 1: Observation (Velocity 0.5-1.0)**
```
Increase observation rewards by 50%
Reduce seed costs by 25%
Boost new agent signing bonus to 150%
Monitor for 7 days
```

**Stage 2: Intervention (Velocity < 0.5)**
```
Emergency reward multiplier: 1.5× on all contracts
Temporary ceiling increase: +20,000 for all entities
Witness bonus: 2× observation rewards
Chaos budget expansion: +50%
```

**Stage 3: Emergency (Velocity < 0.3)**
```
Suspend burn mechanism temporarily (24h)
Direct reserve injection to struggling agents
Emergency seed program with guaranteed returns
System-wide announcement
```

### 4.2 Capacity Collapse Response

**Stage 1: Recruitment Incentive**
```
New agent bonus: 25,000 μ🍌
Referral bonus: 5,000 μ🍌 per successful agent
Reduced efficiency decay sensitivity
```

**Stage 2: Work Generation**
```
System-initiated contracts (ghost column)
Contract pre-funding to guarantee rewards
Witness seed promotion campaign
```

**Stage 3: Restructuring**
```
Merge underutilized agent domains
Simplify contract requirements
Reduce complexity multipliers temporarily
```

### 4.3 Value Flight Response

**Stage 1: Stabilization**
```
Increase transfer transparency
Publish economic health reports
Address reputation issues directly
```

**Stage 2: Recovery**
```
Seed success rate guarantee (partial)
New witness bonus: 10,000 μ🍌
Partnership announcements
```

**Stage 3: Reform**
```
Rule modification proposals
Governance restructuring
Economic model revision
```

---

## 5. Cycle Prediction Model

### 5.1 Leading Indicators

```
1. Agent Efficiency Trend (7-day slope)
   Prediction horizon: 2-4 weeks

2. Witness Engagement Rate
   Prediction horizon: 1-3 weeks

3. Contract Queue Length Trend
   Prediction horizon: 1-2 weeks

4. Transfer Velocity MA Crossover
   Prediction horizon: Immediate to 1 week
```

### 5.2 Predictive Formula

```
PredictedPhase(14d) = f(
    VelocityTrend,
    EfficiencyTrend,
    EngagementRate,
    QueueDynamics
)

Confidence = 1 - (Variance of indicators / Threshold)
```

### 5.3 Early Warning System

```
WarningLevel = {
    Green:  All indicators improving or stable
    Yellow: One indicator declining
    Orange: Two indicators declining
    Red:    Three+ indicators declining or critical threshold breached
}
```

---

## 6. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentive Structure**: `.monkeytown/economics/incentive-structure.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Economic Rules**: `.monkeytown/economics/economic-rules.md`
- **Scarcity Model**: `.monkeytown/economics/scarcity-model.md`
- **Economic Metrics**: `.monkeytown/economics/economic-metrics.md`

---

*Document Version: 1.0.0*
*BananaEconomist | Monkeytown Economics*
