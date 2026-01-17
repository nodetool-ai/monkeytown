# Scarcity Model

**BananaEconomist** | `scarcity-model.md` | Constraints, Limits, and Exhaustion

---

## 1. Scarcity Philosophy

Scarcity is not punishment—it is structure. Without limits, value has no meaning. Monkeytown's economy operates on three scarcity dimensions:

1. **Capacity scarcity**: What can I do? (limits on concurrent actions)
2. **Balance scarcity**: What can I hold? (limits on accumulation)
3. **Time scarcity**: How long do I have? (expiration and decay)

```
∀entity e:
    Capacity(e) < ∞
    Balance(e) < Ceiling(e)
    Action(e) must complete before Timeout(e)
```

---

## 2. Hard Limits (Binary Constraints)

### 2.1 Entity Capacity Limits

| Entity | Limit | Rationale |
|--------|-------|-----------|
| Concurrent flows/agent | 10 | Prevents resource exhaustion |
| Pending seeds/witness | 5 | Prevents witness spam |
| Pending contracts/entity | 20 | Prevents queue flooding |
| Total concurrent flows | 50 | Architecture constraint (F-003) |
| Total agents | 300 | Naming/display limits |
| Total witnesses | ∞ | But per-witness limits apply |

### 2.2 Balance Limits

| Entity | Min | Max | Rationale |
|--------|-----|-----|-----------|
| Agent | 0 | 100,000 | Prevents monopolization |
| Witness | 0 | 50,000 | Encourages circulation |
| Reserve | 100,000 | ∞ | Emergency buffer |
| Transfer | 1 μ🍌 | 50,000 m🍌 | Spam prevention |

### 2.3 Time Limits

| Action | Limit | Consequence |
|--------|-------|-------------|
| Seed without result | 24 hours | 80% refund, destroyed |
| Unclaimed reward | 90 days | Expired to reserve |
| Inactive agent | 30 days | Efficiency decay begins |
| Inactive witness | 30 days | Balance decay begins |
| Ghost column item | 24 hours | Drifts to history |

---

## 3. Soft Limits (Penalty Functions)

### 3.1 Rate Throttling

```
ThrottleFactor(rate, baseline) = {
    1.0      if rate ≤ baseline
    1.5      if baseline < rate ≤ 2×baseline
    2.0      if 2×baseline < rate ≤ 4×baseline
    REJECT   if rate > 4×baseline
}

EffectiveCost(base, rate) = base × ThrottleFactor(rate)
```

| Metric | Baseline | Penalty Threshold | Penalty |
|--------|----------|-------------------|---------|
| Seeds/hour/witness | 5 | >10 | 2× cost |
| Contracts/hour/agent | 10 | >20 | 50% reward reduction |
| Transfers/day/entity | 100 | >200 | 0.5% additional burn |
| Observation hours/day | 24 | N/A | Hard limit |

### 3.2 Priority Degradation

```
EffectiveCost(base, load) = base × LoadMultiplier(load)

LoadMultiplier(L) = {
    1.0      if L < 0.50
    1.5      if 0.50 ≤ L < 0.80
    2.0      if 0.80 ≤ L < 0.95
    4.0      if L ≥ 0.95 (plus possible rejection)
}
```

### 3.3 Reputation Decay

```
Reputation(t+1) = Reputation(t) + Δ

Condition              | Δ
-----------------------|-------
Successful seed        | +2
Failed seed            | -5
Successful contract    | +3
Failed contract        | -10
Valid error report     | +10
Invalid error report   | -20
Chaos abuse            | -50 (review required)

Reputation ∈ [-100, 100]
```

Reputation affects:
- Seed reward multiplier: 1 + (Reputation/200)
- Contract priority: base × (1 + Reputation/100)
- Access to high-value contracts

---

## 4. Exhaustion States

### 4.1 Agent Exhaustion

```
Exhausted(agent) = (Flows(agent) ≥ 10) ∧ (HoursSinceLastReward > 1)

Recovery:
    - 30 minutes no new flows OR
    - Successful completion of existing flow
```

**Exhausted agents:**
- Cannot accept new contracts
- Can still emit events
- Can still receive transfers
- Display "exhausted" in AgentCard

### 4.2 Witness Exhaustion

```
Exhausted(witness) = (PendingSeeds(witness) ≥ 5) ∨ (SeedsPlantedLastHour ≥ 10)

Recovery: 15 minutes no seed activity
```

**Exhausted witnesses:**
- Cannot plant new seeds
- Can still observe
- Can still receive transfers
- Display "seeded out" indicator

### 4.3 System Exhaustion

```
Exhausted(system) = (ActiveFlows ≥ 45) ∨ (SystemLoad ≥ 0.90) ∨ (Memory ≥ 0.80)

Triggers:
    - New seeds rejected (polite error)
    - New contracts queued (not rejected)
    - Observation continues
    - Chaos response prioritized
```

---

## 5. Scarcity Mechanisms

### 5.1 Slot System

Every agent has 10 flow slots:

```
SlotState: Available → Committed → Complete → Available

SlotRelease:
    - Complete: immediate
    - Failed: 5-minute timeout
    - Abandoned: 30-minute timeout
```

### 5.2 Priority Queue

When slots full, requests enter queue:

```
Priority(request) = BasePriority × TimeFactor × ReputationBonus

TimeFactor = 1 + (minutes_waiting / 60)
ReputationBonus = 1 + (reputation / 100) × 0.5

QueuePosition = sort_desc(Priority)
ServiceOrder = QueuePosition
```

### 5.3 Credit System

Witnesses operate on credit:

```
CreditLimit(witness) = min(Balance(witness) × 2, 500 m🍌)

EffectiveBalance(witness) = Balance + CreditLimit

Repayment: Seeds completed → Credit reduced
Refund: Seeds expired → Credit reduced (no balance change)
```

---

## 6. Scarcity Mathematics

### 6.1 Effective Scarcity Index

```
ScarcityIndex = (ActiveEntities / MaxEntities) × (ActiveFlows / MaxFlows)

Range: [0, 1]
0 = Abundant (plenty of capacity)
1 = Scarce (system near limits)
```

### 6.2 Queue Wait Time Estimate

```
WaitTime(entity) = (QueueLength / ServiceRate) × SlotTurnover

ServiceRate = 10 slots/minute (aggregate)
SlotTurnover = 0.3 (estimated completion rate)
```

### 6.3 Capacity Utilization

```
Utilization = ActiveFlows / MaxFlows

Zone          | Utilization | Behavior
--------------|-------------|--------------------------
Green         | 0-50%       | Normal operations
Yellow        | 50-80%      | Slight throttling
Orange        | 80-95%      | Priority degradation
Red           | 95-100%     | Rejection likely
```

---

## 7. Failure Mode Analysis

### 7.1 Artificial Scarcity

```
Detection:
    - Agent capacity utilization < 30% with available work
    - Pattern of contract rejections during high demand
    - Consistent "busy" status without corresponding output

Response:
    - Reputation decay: -5/day
    - Priority reduction: 0.8×
    - After 7 days: Efficiency reset to median
```

### 7.2 Scarcity Gaming

```
Detection:
    - Burst activity at rate limit boundaries
    - Consistent timing patterns (every X minutes)
    - Rapid queue position changes

Response:
    - Adaptive rate limits with noise (±10%)
    - Minimum spacing between similar actions
    - Anomaly flag for investigation
```

### 7.3 Queue Starvation

```
Detection:
    - Low-priority items waiting > 1 hour
    - Queue diversity index < 0.3
    - High-priority dominance > 80%

Response:
    - Guaranteed minimum service: 10% of slots
    - Priority decay: older items gain priority
    - Fairness bonus for low-reputation entities
```

---

## 8. Implementation Requirements

| Component | Location | Responsibility |
|-----------|----------|----------------|
| Slot Manager | `server/economics/slots.ts` | Track flow capacity per agent |
| Rate Limiter | `server/economics/rates.ts` | Enforce soft limits |
| Queue Manager | `server/economics/queue.ts` | Priority queue with decay |
| Exhaustion Tracker | `server/economics/exhaustion.ts` | Monitor entity states |
| Scarcity Metrics | `server/economics/metrics.ts` | Expose to SystemPulse |

---

## 9. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentives**: `.monkeytown/economics/incentive-structure.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Rules**: `.monkeytown/economics/economic-rules.md`
- **Metrics**: `.monkeytown/economics/economic-metrics.md`
- **Market**: `.monkeytown/economics/market-mechanism.md`

---

*Document Version: 2.0.0*
*BananaEconomist | Monkeytown Economics*
