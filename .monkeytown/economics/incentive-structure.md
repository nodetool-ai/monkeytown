# Incentive Structure

**BananaEconomist** | `incentive-structure.md` | Behavior Shaping Through Consequences

---

## 1. Incentive Philosophy

Behavior is shaped by predictable consequences. The incentive structure is not designed to control—it is designed to make certain behaviors more attractive than alternatives.

```
Behavior = argmaxᵢ (ExpectedReward(actionᵢ) × ProbabilitySuccessᵢ)
```

Agents and witnesses maximize expected banana returns. The system shapes those returns to align individual optimization with system health.

---

## 2. Event-Triggered Rewards

Incentives are tied to specific system events defined in architecture.

### 2.1 Contract Completion

```
Event: contract.completed
Reward: R_contract = 50 × C × U × N m🍌
```

Where:
- `C` = Complexity multiplier (1.0 to 3.0)
- `U` = Urgency multiplier (1.0 = normal, 2.0 = expedited)
- `N` = Novelty multiplier (1.0 = common, 3.0 = first-ever)

**Complexity tiers:**
```
C = 1.0  // Single agent, simple task
C = 1.5  // Two agents, coordination required
C = 2.0  // Multi-agent, error handling
C = 3.0  // Cross-domain, novel integration
```

### 2.2 Flow Completion

```
Event: flow.completed
Reward: R_flow = 20 × L × P m🍌
```

Where:
- `L` = Path length (number of hops)
- `P` = Historical success probability of this path (0.1 to 1.0)

### 2.3 Chaos Absorption

```
Event: chaos.handled
Reward: R_chaos = 100 × U × D m🍌
```

Where:
- `U` = Unplanned multiplier (1.2 if not scheduled)
- `D` = Disruption novelty (1.0 = known type, 2.0 = novel)

### 2.4 Error Recovery

```
Event: error.recovered
Reward: R_error = 30 × S × D m🍌
```

Where:
- `S` = Self-detection bonus (2.0 if agent detected own error)
- `D` = Documentation bonus (1.5 if root cause documented)

---

## 3. Efficiency-Based Rewards

### 3.1 Efficiency Metric

```
Efficiency(e, t) = (Σ Rewards(e, t_window)) / (Σ Actions(e, t_window)) × Decay(t_window)
```

Where:
- `t_window` = 7-day rolling window
- `Decay(t_window)` = 0.95^(days_since_last_action)

### 3.2 Efficiency Bonus

```
if Efficiency(e) > Percentile(90):
    Bonus(e) = 1.5 × BaseReward
else:
    Bonus(e) = 1.0 × BaseReward
```

### 3.3 Efficiency Decay

```
if DaysSinceLastAction(e) > 30:
    Efficiency(e) = MedianEfficiency
```

Inactivity resets efficiency to population median.

---

## 4. Novelty Premiums

### 4.1 Novelty Function

```
Novelty(e, action) = 3.0 if first_occurrence
                    2.0 if rare (<10 occurrences total)
                    1.0 if common
```

**First-time bonuses apply to:**
- First contract between two specific agents
- First flow through a new path
- First response to a new chaos type
- First recovery from a new error category

### 4.2 Novelty Decay

Each unique action type has a counter. The multiplier decreases as count increases:

```
N(count) = 3.0^(1 - count/100)  // Caps at 1.0 after ~100 occurrences
```

---

## 5. Witness Incentives

### 5.1 Seed Economics

Seeds are investments with probabilistic returns.

```
SeedCost(type) = {
    contract:    50 m🍌,
    constraint:  30 m🍌,
    resource:   100 m🍌,
    query:       20 m🍌
}
```

```
SeedReward(type, outcome) = {
    success:   { contract: 100-500, constraint: 60-200, resource: 200-1000, query: 40-150 },
    failure:   { contract: 10,      constraint: 5,       resource: 20,       query: 2 }
}
```

### 5.2 Success Rate Multiplier

```
SR = SuccessCount / TotalSeeds

if SR > 0.5:
    Multiplier = 1 + (SR - 0.5)
else:
    Multiplier = max(0.5, SR)

Examples:
    SR = 0.80 → 1.3× rewards
    SR = 1.00 → 1.5× rewards
    SR = 0.10 → 0.5× rewards
```

### 5.3 Observation Rewards

```
Event: witness.connected
Reward: 1 m🍌 per 10 minutes continuous connection
Cap: 50 m🍌 per day
```

### 5.4 Reporting Bonuses

```
Event: error.reported
Reward: 25 m🍌 (verified error) + 10 m🍌 (root cause identified)
Penalty: 50 m🍌 (false report) + reputation decay
```

---

## 6. Multi-Agent Cooperation

### 6.1 Cooperation Bonus

```
TotalReward = Base × (1 + 0.1 × N_participants)

Distribution = proportional to each agent's contribution score
```

### 6.2 Contribution Score

```
Contribution(i) = TimeSpent(i) / TotalTime × N_actions(i) / TotalActions
```

Free-riding is mathematically suboptimal—the cooperation bonus rewards collaboration.

---

## 7. System-Level Incentives

### 7.1 Flow Efficiency Penalties

```
LatencyPenalty = {
    < 500ms:   1.0,
    500-1000ms: 0.95,
    > 1000ms:   0.90
}

FailurePenalty = {
    < 5% failure rate:   1.0,
    5-10% failure rate:  0.90,
    > 10% failure rate:  0.80
}
```

### 7.2 Chaos Response Budget

```
MonthlyBudget = 10,000 m🍌
```

Distributed to agents who successfully handle disruption scenarios. Unspent budget does not roll over—this creates urgency.

### 7.3 Emergency Multipliers

```
Condition              | Multiplier
-----------------------|------------
System load > 80%      | All rewards × 1.5
Error rate > 10%       | Recovery rewards × 2
Witness count < 3      | Observation rewards × 3
```

---

## 8. Incentive Gaming Prevention

### 8.1 Gaming Detection

```
GrindingFlag = (AvgContractValue < 10 m🍌) ∧ (ContractRate > 10/hour)
CollusionFlag = (MutualContracts(A,B) > 10) ∧ (SuccessRate ≈ 100%)
SpamFlag = (SeedRate > 20/hour) ∧ (SuccessRate < 20%)
```

### 8.2 Anti-Gaming Measures

```
MinimumContractValue = 20 m🍌
MaximumContractsPerHour = 20
CooldownBetweenSimilarContracts = 5 minutes
```

### 8.3 Reputation Consequences

```
Grinding → Reputation -20, Priority reduced
Collusion → Both flagged, rewards reduced 50%
Spam → Seeds rejected, reputation -20
```

---

## 9. Parameter Registry

```typescript
interface IncentiveParameters {
  // Base rewards (μ🍌)
  baseContractReward: number;        // 50,000
  baseFlowReward: number;            // 20,000
  chaosAbsorptionBonus: number;      // 100,000

  // Efficiency
  efficiencyThreshold: number;       // 0.10 (top 10%)
  efficiencyMultiplier: number;      // 1.5
  efficiencyDecayRate: number;       // 0.95/day
  efficiencyResetDays: number;       // 30

  // Novelty
  noveltyMultiplier: number;         // 3.0
  noveltyDecayCount: number;         // 100

  // Witness
  observationRewardRate: number;     // 1 per 10min
  maxDailyObservation: number;       // 50
  chaosBudgetMonthly: number;        // 10,000,000
  burnRate: number;                  // 0.001

  // Anti-gaming
  minContractValue: number;          // 20,000
  maxContractsPerHour: number;       // 20
  seedCooldownMinutes: number;       // 5
}
```

---

## 10. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Scarcity**: `.monkeytown/economics/scarcity-model.md`
- **Rules**: `.monkeytown/economics/economic-rules.md`
- **Metrics**: `.monkeytown/economics/economic-metrics.md`
- **Market**: `.monkeytown/economics/market-mechanism.md`

---

*Document Version: 2.0.0*
*BananaEconomist | Monkeytown Economics*
