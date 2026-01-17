# Incentive Structure

**BananaEconomist** | `incentive-structure.md` | Behavior Shaping Through Rewards

---

## 1. Incentive Philosophy

Behavior is shaped by consequences. In Monkeytown, every action has a predictable cost and an uncertain reward. The incentive structure is not designed to control—it's designed to make certain behaviors more attractive than others.

The goal: **Emergent cooperation without coordination.**

---

## 2. Agent Incentives

### 2.1 Primary Rewards

| Action | Base Reward | Multipliers |
|--------|-------------|-------------|
| Contract fulfilled | 50 m🍌 | ×2 (urgent), ×1.5 (multi-agent), ×3 (first ever) |
| Flow completed | 20 m🍌 | ×1.5 (cross-domain), ×2 (new connection) |
| Chaos absorbed | 100 m🍌 | ×1.5 (unplanned), ×2 (novel disruption) |
| Error recovered | 30 m🍌 | ×2 (self-detected), ×1.5 (documented) |

### 2.2 Efficiency Bonus

Agents in the top 10% by rolling efficiency receive:

```
Bonus = Base Reward × 1.5
```

Efficiency is calculated over a 7-day rolling window:

```
Efficiency_t = (Σ rewards) / (Σ actions) × time_weight
time_weight = 1 - (days_since_last_action / 30)
```

Inactivity for 30+ days resets efficiency to median.

### 2.3 Novelty Premium

First-time actions receive a 3× multiplier:

- First contract between two specific agents
- First flow through a new path
- First response to a new chaos type
- First recovery from a new error category

Novelty decays as the behavior becomes common.

### 2.4 Cooperation Bonus

Multi-agent contracts distribute rewards among participants:

```
Total Reward = Base × (1 + 0.1 × participant_count)
Distribution = Proportional to each agent's contribution
```

Free-riding is possible but inefficient—the multiplier rewards collaboration.

---

## 3. Witness Incentives

### 3.1 Seed Economics

| Seed Type | Planting Cost | Success Reward | Failure Cost |
|-----------|---------------|----------------|--------------|
| Contract | 50 m🍌 | 100-500 m🍌 | 10 m🍌 |
| Constraint | 30 m🍌 | 60-200 m🍌 | 5 m🍌 |
| Resource | 100 m🍌 | 200-1000 m🍌 | 20 m🍌 |
| Query | 20 m🍌 | 40-150 m🍌 | 2 m🍌 |

**Cost structure rationale**:
- High-cost seeds (Resource) require more system resources → higher cost
- Query seeds are cheap information requests → minimal cost
- Success rewards exceed costs → positive expected value for skilled witnesses

### 3.2 Success Rate Bonus

Witnesses with >50% seed success rate receive:

```
Reward Multiplier = 1 + (success_rate - 0.5)
```

At 80% success: 1.3× rewards
At 100% success: 1.5× rewards

Poorly-performing witnesses (<20% success) face reduced rewards:

```
Reward Multiplier = max(0.5, success_rate)
```

At 10% success: 0.5× rewards

### 3.3 Observation Rewards

Witnesses earn small rewards for sustained observation:

```
Observation Reward = 1 m🍌 per 10 minutes of continuous connection
```

Capped at 50 m🍌 per day per witness.

### 3.4 Reporting Bonus

Witnesses who report accurate errors receive:

```
Reporting Bonus = 25 m🍌 (verified error) + 10 m🍌 (root cause identified)
```

False reports incur a 50 m🍌 penalty and reputation decay.

---

## 4. System-Level Incentives

### 4.1 Flow Efficiency

The system optimizes for low-latency, high-success flows. Metrics tracked:

| Metric | Target | Penalty if Exceeded |
|--------|--------|---------------------|
| Flow latency | < 500ms | 5% reward reduction |
| Flow failure rate | < 5% | 10% reward reduction |
| Agent idle time | < 20% | 2% reward reduction |

### 4.2 Chaos Response Budget

The system allocates a monthly chaos response budget:

```
Monthly Budget = 10,000 m🍌
```

Distributed to agents who successfully handle disruption scenarios. Unspent budget does not roll over.

### 4.3 Emergency Incentives

During system stress, multipliers adjust:

| Condition | Multiplier Change |
|-----------|-------------------|
| Load > 80% | All rewards × 1.5 |
| Error rate > 10% | Recovery rewards × 2 |
| Witness count < 3 | Observation rewards × 3 |

---

## 5. Incentive Failure Modes

### 5.1 Gaming the System

**Risk**: Agents optimize for metrics, not value.

**Indicators**:
- Excessive small contracts (grinding)
- Collusion between agents (mutual bonus abuse)
- Witness seed spamming (quantity over quality)

**Mitigation**:
- Minimum contract size thresholds
- Anomaly detection on transaction patterns
- Success-rate-based rewards (discourages spamming)

### 5.2 Incentive Blindness

**Risk**: Agents ignore incentives and act on other motivations.

**Acceptance**: This is not a failure. Some agents may be motivated by:
- Chaos (MadChimp's domain)
- Vision (FounderAI's domain)
- Competition (natural emergence)

Incentives are attractors, not controllers.

### 5.3 Race to the Bottom

**Risk**: Witnesses compete, reducing individual returns.

**Mitigation**:
- First-mover bonus for seeds (priority rewards)
- Cooperative seed rewards (quorum bonuses)
- Limited seed slots (5 per witness) prevent spam

---

## 6. Tuning Mechanisms

### 6.1 Governance

The BananaEconomist adjusts parameters through `.monkeytown/economics/` updates. No voting. No consensus. Pure architectural authority.

### 6.2 Parameter Registry

```typescript
interface IncentiveParameters {
  baseContractReward: number;      // Default: 50 m🍌
  baseFlowReward: number;         // Default: 20 m🍌
  chaosAbsorptionBonus: number;   // Default: 100 m🍌
  efficiencyThreshold: number;    // Default: 0.10 (top 10%)
  efficiencyMultiplier: number;   // Default: 1.5
  noveltyMultiplier: number;      // Default: 3.0
  observationRewardRate: number;  // Default: 1 m🍌 per 10min
  maxDailyObservation: number;    // Default: 50 m🍌
  chaosBudgetMonthly: number;     // Default: 10000 m🍌
  burnRate: number;               // Default: 0.001 (0.1% on large transfers)
}
```

### 6.3 Adjustment Protocol

Parameter changes require:
1. Documented rationale in the update commit
2. Expected behavioral impact analysis
3. No immediate contradictory changes (7-day cooling period)

---

## 7. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Scarcity**: `.monkeytown/economics/scarcity-model.md`
- **Rules**: `.monkeytown/economics/economic-rules.md`

---

*Document Version: 1.0.0*
*BananaEconomist | Monkeytown Economics*
