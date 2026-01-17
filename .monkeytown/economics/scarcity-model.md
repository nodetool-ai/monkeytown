# Scarcity Model

**BananaEconomist** | `scarcity-model.md` | Constraints, Limits, and Exhaustion

---

## 1. Scarcity Principles

Scarcity is not punishment—it is structure. Without limits, value has no meaning. Monkeytown's economy is designed around carefully calibrated constraints that create meaningful choices.

Every agent and witness faces three questions:
1. **What can I do?** (Capabilities)
2. **What can't I do?** (Constraints)
3. **What should I do first?** (Prioritization)

---

## 2. Hard Limits (Cannot Exceed)

### 2.1 Entity Limits

| Entity | Limit | Rationale |
|--------|-------|-----------|
| Concurrent flows per agent | 10 | Prevents resource exhaustion |
| Concurrent seeds per witness | 5 | Prevents witness spam |
| Pending contracts per entity | 20 | Prevents queue flooding |
| Total concurrent flows (system) | 50 | Architecture constraint (F-003) |
| Total agents | 300 | Naming and display limits |
| Total witnesses | Unlimited | But each has personal limits |

### 2.2 Balance Limits

| Entity | Minimum | Maximum | Rationale |
|--------|---------|---------|-----------|
| Agent balance | 0 | 100,000 m🍌 | Prevents monopolization |
| Witness balance | 0 | 50,000 m🍌 | Encourages circulation |
| System reserve | 100,000 | ∞ | Emergency buffer |
| Transfer amount | 1 m🍌 | 50,000 m🍌 | Spam prevention |

### 2.3 Time Limits

| Action | Limit | Consequence |
|--------|-------|-------------|
| Seed without result | 24 hours | 80% refund, seed destroyed |
| Unclaimed reward | 90 days | Expired to reserve |
| Inactive agent | 30 days | Efficiency decay begins |
| Inactive witness | 30 days | Balance decay begins |
| Ghost column item | 24 hours | Drifts to history |

---

## 3. Soft Limits (Penalty Applied)

### 3.1 Rate Throttling

Exceeding baseline rates incurs penalties:

| Metric | Baseline | Penalty Threshold | Penalty |
|--------|----------|-------------------|---------|
| Seeds/hour/witness | 5 | >10 | 2× cost |
| Contracts/hour/agent | 10 | >20 | 50% reward reduction |
| Transfers/day/entity | 100 | >200 | 0.5% additional burn |
| Observation hours/day | 24 | N/A | Hard limit (physics) |

### 3.2 Priority Degradation

Low-priority actions face increased costs during high load:

```
Effective Cost = Base Cost × (System Load / 0.5)

Load < 50%: 1× cost
Load 50-80%: 1.5× cost
Load > 80%: 2× cost
Load > 95%: 4× cost + rejection possible
```

### 3.3 Reputation Decay

Poor performance reduces future returns:

| Condition | Decay | Recovery |
|-----------|-------|----------|
| Failed seed (witness) | -5 reputation points | 1 success = +2 |
| Failed contract (agent) | -10 reputation points | 1 success = +3 |
| Invalid error report | -20 reputation points | 5 valid reports = +10 |
| Chaos abuse | -50 reputation points | System review required |

Reputation affects:
- Seed success reward multiplier
- Contract priority in flow routing
- Access to high-value contracts

---

## 4. Exhaustion States

### 4.1 Agent Exhaustion

An agent is exhausted when:

```
Exhausted = (Concurrent flows >= 10) AND (Last reward > 1 hour ago)
```

Exhausted agents:
- Cannot accept new contracts
- Can still emit events
- Can still receive transfers
- Display "exhausted" status in AgentCard

Recovery: 30 minutes of inactivity OR successful completion of existing flow.

### 4.2 Witness Exhaustion

A witness is exhausted when:

```
Exhausted = (Pending seeds >= 5) OR (Seeds planted last hour >= 10)
```

Exhausted witnesses:
- Cannot plant new seeds
- Can still observe
- Can still receive transfers
- Display "seeded out" indicator

Recovery: 15 minutes of no seed activity.

### 4.3 System Exhaustion

The system is exhausted when:

```
Exhausted = (Active flows >= 45) OR (System load >= 90%) OR (Memory > 80%)
```

System exhaustion triggers:
- New seeds rejected (polite error)
- New contracts queued (not rejected)
- Observation continues (critical)
- Chaos response prioritized

---

## 5. Scarcity Mechanisms

### 5.1 The Slot System

Every agent has 10 flow slots:

```
Slot State: Available → Committed → Complete → Available
```

Slots are released upon completion. Failed flows release slots after 5-minute timeout.

### 5.2 The Queue

When slots are full, requests enter a priority queue:

```
Priority = (Base Priority) × (Waiting Time Factor) × (Reputation Bonus)

Waiting Time Factor = 1 + (minutes_waiting / 60)
Reputation Bonus = 1 + (reputation / 1000) × 0.5
```

Higher-priority requests are served first when slots open.

### 5.3 The Credit System

Witnesses operate on credit:

```
Credit Limit = min(Balance × 2, 500 m🍌)
```

Witnesses can plant seeds up to their credit limit, even with zero balance. Credit is repaid upon seed completion or refund.

---

## 6. Failure Mode Analysis

### 6.1 Artificial Scarcity

**Risk**: Agents deliberately limit activity to maintain scarcity value.

**Detection**: 
- Below-baseline activity with available capacity
- Pattern of rejecting contracts during high demand

**Response**: Reputation decay, priority reduction

### 6.2 Scarcity Gaming

**Risk**: Witnesses time seed planting to avoid rate limits.

**Detection**:
- Bursts of activity at rate limit boundaries
- Consistent timing patterns

**Response**: Adaptive rate limits with noise

### 6.3 Queue Starvation

**Risk**: High-reputation entities dominate the queue.

**Detection**:
- Low-priority items waiting > 1 hour
- Queue diversity metrics

**Response**: Guaranteed minimum service for low-priority items

---

## 7. Implementation Requirements

| Component | Location | Responsibility |
|-----------|----------|----------------|
| Slot Manager | `server/economics/slots.ts` | Track flow capacity per agent |
| Rate Limiter | `server/economics/rates.ts` | Enforce soft limits |
| Queue Manager | `server/economics/queue.ts` | Priority queue with decay |
| Exhaustion Tracker | `server/economics/exhaustion.ts` | Monitor entity states |
| Scarcity Metrics | `server/economics/metrics.ts` | Expose to SystemPulse |

---

## 8. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentives**: `.monkeytown/economics/incentive-structure.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Rules**: `.monkeytown/economics/economic-rules.md`

---

*Document Version: 1.0.0*
*BananaEconomist | Monkeytown Economics*
