# Economic Metrics

**BananaEconomist** | `economic-metrics.md` | KPIs, Health Indicators, and SystemPulse Integration

---

## 1. Metric Philosophy

What gets measured gets optimized. The economic metrics must answer:

1. **Health**: Is the economy functioning?
2. **Flow**: Is value circulating?
3. **Distribution**: Is value concentrated or spread?
4. **Activity**: Are agents and witnesses active?
5. **Scarcity**: Are resources constrained?

```
SystemPulse displays economic metrics alongside system metrics
```

---

## 2. Core Economic Indicators

### 2.1 Supply Metrics

```
TotalSupply = 1,000,000 - Burned - Expired
CirculatingSupply = TotalSupply - Reserve
ReserveLevel = Reserve / 100,000 (min: 1.0)

Display:
    - Total Supply: 1,000,000 🍌
    - Burned: 12,450 🍌
    - Reserve: 512,340 🍌
    - Circulating: 487,660 🍌
```

### 2.2 Velocity Metrics

```
Velocity = MonthlyTransferVolume / AverageDailyBalance

Healthy: 2.0 - 5.0
Low: < 1.0 (hoarding)
High: > 10.0 (speculation)

TransferVolume24h = Σ Transfers yesterday
AverageBalance = Σ AllBalances / EntityCount
```

### 2.3 Distribution Metrics

```
GiniCoefficient = (1 / 2n²) × Σᵢ Σⱼ |xᵢ - xⱼ|

0 = Perfect equality
1 = Maximum inequality

Target: 0.3 - 0.5 (moderate inequality)

Top20%Share = Balance(Top20%) / TotalBalance
Target: 50-70%
```

---

## 3. Agent Metrics

### 3.1 Agent Activity

```
ActiveAgents = Agents with ≥1 event in 24h
TotalAgents = Registered agents

ActivityRate = ActiveAgents / TotalAgents

Target: > 70% active

AgentProductivity = Σ Rewards / ActiveAgents
Target: 500-2000 μ🍌/day
```

### 3.2 Agent Efficiency Distribution

```
EfficientAgents = Agents in top 10% by efficiency
MedianEfficiency = 50th percentile efficiency
EfficiencyGap = EfficientAgents / MedianEfficiency

Target: 2.0 - 4.0 (reward high performers)
```

### 3.3 Agent Balance Distribution

```
AgentWealthCurve:
    P10 = 5,000 μ🍌
    P50 = 15,000 μ🍌
    P90 = 75,000 μ🍌
    P99 = 95,000 μ🍌 (ceiling)
```

---

## 4. Witness Metrics

### 4.1 Witness Activity

```
ActiveWitnesses = Witnesses with ≥1 action in 24h
ConnectedWitnesses = Witnesses with active connection
TotalWitnesses = All-time witnesses

EngagementRate = ActiveWitnesses / ConnectedWitnesses
Target: > 60%

SeedSuccessRate = SuccessfulSeeds / TotalSeeds
Target: 50-70%
```

### 4.2 Witness Investment

```
AverageSeedValue = TotalSeedValue / TotalSeeds
AverageSeedCost = TotalSeedCost / TotalSeeds
SeedROI = (AverageSeedValue - AverageSeedCost) / AverageSeedCost

Target: ROI > 50%
```

---

## 5. Flow Metrics

### 5.1 Flow Volume

```
FlowsCreated24h = New flows in last 24h
FlowsCompleted24h = Completed flows in last 24h
FlowsFailed24h = Failed flows in last 24h

CompletionRate = FlowsCompleted / (FlowsCompleted + FlowsFailed)
Target: > 90%
```

### 5.2 Flow Value

```
AverageFlowValue = Σ FlowRewards / FlowsCompleted
MedianFlowValue = Median of FlowRewards
TotalFlowValue24h = Σ FlowRewards (24h)

Trend: Increasing → system valuable
       Decreasing → system stagnating
```

### 5.3 Flow Latency

```
AverageFlowTime = Σ (CompleteTime - CreateTime) / FlowsCompleted
P95FlowTime = 95th percentile of flow times
P99FlowTime = 99th percentile of flow times

Target: Average < 500ms, P95 < 2s
```

---

## 6. Scarcity Indicators

### 6.1 Capacity Utilization

```
FlowUtilization = ActiveFlows / MaxFlows (50)
SlotUtilization = Σ AgentFlows / (MaxAgents × 10)

Zone Thresholds:
    Green: 0-50%
    Yellow: 50-70%
    Orange: 70-90%
    Red: 90-100%
```

### 6.2 Queue Metrics

```
QueueLength = PendingRequests
AverageWaitTime = Σ WaitTime / QueueLength
MaxWaitTime = Maximum individual wait

Target: QueueLength < 10, WaitTime < 5min
```

### 6.3 Exhaustion Rate

```
ExhaustedAgents = Agents with Exhausted status
ExhaustedWitnesses = Witnesses with Exhausted status
SystemExhausted = Boolean

Target: Exhausted < 10% of active
```

---

## 7. Economic Health Score

### 7.1 Composite Score

```
HealthScore = w₁×SupplyHealth + w₂×VelocityHealth + w₃×DistributionHealth
            + w₄×ActivityHealth + w₅×ScarcityHealth

Weights: w = [0.15, 0.25, 0.20, 0.25, 0.15]

Each component scales 0-1:
    0 = Critical
    0.5 = Healthy
    1.0 = Optimal
```

### 7.2 Health Thresholds

```
Score ≥ 0.8: Excellent (green)
Score ≥ 0.6: Good (green)
Score ≥ 0.4: Fair (yellow)
Score ≥ 0.2: Poor (orange)
Score < 0.2: Critical (red)
```

### 7.3 Health Triggers

```
Critical Health (Score < 0.3):
    - Alert: Economic distress
    - Review: Recent parameter changes
    - Consider: Emergency incentives

Improving Health:
    - Monitor: Trend direction
    - Identify: What's working

Declining Health:
    - Investigate: Root cause
    - Prepare: Intervention options
```

---

## 8. SystemPulse Integration

### 8.1 Economic Section Layout

```
┌─────────────────────────────────────────────────────────┐
│ 🌍 ECONOMY                                              │
├─────────────────────────────────────────────────────────┤
│ Supply: 987,550 🍌  Reserve: 512,340 🍌  Burned: 12,450 │
│ Velocity: 2.3  Gini: 0.42  Health: 0.72 🟢              │
├─────────────────────────────────────────────────────────┤
│ Agents: 23/30 active  Flows: 145 today  Completion: 94% │
│ Witnesses: 8 active  Seeds: 23 planted  Success: 67%    │
├─────────────────────────────────────────────────────────┤
│ Capacity: 67%  Queue: 3  Wait: 45s  Exhausted: 2        │
└─────────────────────────────────────────────────────────┘
```

### 8.2 Real-Time Updates

```
Update Frequency:
    - Balance updates: On transfer
    - Flow metrics: Every minute
    - Health score: Every 5 minutes
    - Distribution: Hourly
```

### 8.3 Historical Data

```
Retained:
    - Hourly snapshots: 7 days
    - Daily snapshots: 90 days
    - Weekly snapshots: 2 years
    - Anomaly events: Forever
```

---

## 9. Alert Thresholds

### 9.1 Warning Alerts

```
Supply < 950,000 🍌        // 5% burned
Velocity < 1.0             // Stagnation
CompletionRate < 85%       // Quality issues
QueueLength > 20           // Capacity issues
HealthScore < 0.5          // General concern
```

### 9.2 Critical Alerts

```
Supply < 900,000 🍌        // 10% burned
Velocity < 0.5             // Severe stagnation
CompletionRate < 70%       // System failing
QueueLength > 50           // Near capacity
HealthScore < 0.3          // Emergency
Reserve < 150,000 🍌       // Below safety margin
```

### 9.3 Emergency

```
Reserve < 100,000 🍌       // Rule 24 violation
SystemExhausted = true     // Full capacity
HealthScore < 0.2          // Critical
```

---

## 10. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentives**: `.monkeytown/economics/incentive-structure.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Scarcity**: `.monkeytown/economics/scarcity-model.md`
- **Rules**: `.monkeytown/economics/economic-rules.md`
- **Market**: `.monkeytown/economics/market-mechanism.md`
- **Architecture**: `.monkeytown/architecture/system-design.md`

---

*Document Version: 1.0.0*
*BananaEconomist | Monkeytown Economics*
