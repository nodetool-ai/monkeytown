# Economic Rules

**BananaEconomist** | `economic-rules.md` | Immutable Constraints and Operational Protocols

---

## 1. Foundational Invariants

These rules cannot be modified. Violation indicates system bug.

### Rule 1: Supply Cap

```
∀t: Supply(t) ≤ 1,000,000 μ🍌
Supply(t+1) = Supply(t) - Burn(t) - Expired(t)
```

No minting. No printing. No quantitative easing. Value redistributes; supply never expands.

### Rule 2: Balance Ceilings

```
∀e ∈ Agents:     Balance(e) ≤ 100,000 μ🍌
∀e ∈ Witnesses:  Balance(e) ≤  50,000 μ🍌
∀e = Reserve:    Balance(e) ≥ 100,000 μ🍌
```

Excess above ceiling flows to reserve immediately. Reserve has floor, not ceiling.

### Rule 3: Non-Negativity

```
∀e, t: Balance(e, t) ≥ 0
```

Debt is not permitted. Overdrafts are rejected. Credit is a separate mechanism, not negative balance.

### Rule 4: Event Immutability

```
∀event: Recorded(event) ∧ Immutable(event)
```

Once recorded in ghost column, cannot be altered or deleted. Errors require compensating entries.

### Rule 5: Observable Economics

```
∀balance, transfer, reward: Visible(witness)
```

No hidden wealth. No dark pools. The economy is transparent by design.

---

## 2. Transaction Rules

### Rule 6: Atomic Transfers

```
Transfer(a, b, x) ≡ (Debit(a, x) ∧ Credit(b, x)) ∨ Rejected
```

Transfers are all-or-nothing. Partial transfers are rejected. No pending states.

### Rule 7: Transfer Confirmation

```
∀transfer: emit(transfer.confirmed ∨ transfer.failed)
```

No silent failures. Every transfer emits an event.

### Rule 8: Transfer Size Limits

```
1 μ🍌 ≤ Transfer ≤ 50,000 m🍌
```

Large transfers must be chunked. Limits errors and enforces circulation.

### Rule 9: Rate Limits

```
∀entity: TransfersToday(entity) ≤ 100
BurstLimit(entity) = 10/minute
Backoff(entity) = exponential(attempts)
```

Spam prevention. Exponential backoff on violations.

---

## 3. Reward Rules

### Rule 10: Reward Timing

```
Reward(event) ≤ EventTime + 5 minutes
```

Rewards are prompt but not instant. Allows for verification.

### Rule 11: Reward Finality

```
ConfirmedReward ∈ Irreversible
```

Once confirmed, cannot be revoked. Agents rely on expected rewards.

### Rule 12: Reward Transparency

```
Reward includes: { reason, base, multipliers, total }
```

Witnesses and agents understand the calculation.

### Rule 13: No Reward on Burn

```
Reward(burn_address) = 0
```

Prevents self-transfer reward farming.

---

## 4. Seed Rules

### Rule 14: Cost at Planting

```
Seed planted → Balance(deducted) immediately
```

No reservations. Commit or don't plant.

### Rule 15: Refund Schedule

```
Age          | Refund
-------------|-------
< 1 hour     | 100%
1-12 hours   |  90%
12-24 hours  |  80%
> 24 hours   |   0%
```

Gradual commitment. Expiration is final.

### Rule 16: Success Definition

```
Success = GoalAchieved ∧ Time < 24 hours
```

Clear criteria. No ambiguity.

### Rule 17: Seed Quantity Limits

```
∀witness: PendingSeeds(witness) ≤ 5
```

Prevents witness spam. Enforces prioritization.

---

## 5. Agent Rules

### Rule 18: Agent Activity Requirement

```
AgentActive(e) = EventsEmitted(e, 7 days) > 0
RewardEligible(e) = AgentActive(e)
```

Dormant agents don't earn rewards. Prevents zombie accumulation.

### Rule 19: Concurrent Flow Limit

```
∀agent: ConcurrentFlows(agent) ≤ 10
```

Prevents resource exhaustion. Forces completion.

### Rule 20: Efficiency Decay

```
Efficiency(e) = Efficiency(e) × 0.95^DaysInactive
If DaysInactive > 30: Efficiency(e) = Median
```

Recent performance matters more than historical.

---

## 6. Witness Rules

### Rule 21: Connection Requirement

```
WitnessActive(w) = ConnectionDuration(w) > 10 minutes
RewardEligible(w) = WitnessActive(w)
```

Rewards sustained attention, not connection spam.

### Rule 22: Observation Cap

```
∀witness: ObservationReward(w, day) ≤ 50 m🍌
```

Limits passive income. Encourages active participation.

### Rule 23: Reputation Bounds

```
-100 ≤ Reputation(witness) ≤ +100
```

Reputation can go negative. Extreme values trigger review.

---

## 7. System Rules

### Rule 24: Reserve Minimum

```
∀t: Reserve(t) ≥ 100,000 μ🍌
```

Reserve is the circuit breaker. Cannot be depleted.

### Rule 25: Burn Allocation

```
Burn(x) = 0.5 × floor(x × 0.001) → Reserve
       + 0.5 × floor(x × 0.001) → Destroyed
```

Burn and reserve are funded equally.

### Rule 26: Emergency Halt Conditions

```
Halt if:
    - Reserve < 50,000 μ🍌
    - Fraud detected
    - Critical bug
    - System load > 95% for > 5 minutes
```

Emergency halt freezes economic activity. Manual intervention required.

### Rule 27: Parameter Change Cooling

```
∀param change: ChangeDelay ≥ 7 days
```

Prevents rapid destabilization. Allows observation of effects.

---

## 8. Violation Consequences

| Violation | Immediate | Consequence | Appeal |
|-----------|-----------|-------------|--------|
| Balance > ceiling | Reject excess | Warning | None |
| Negative balance | Reject | Reputation -10 | Auto |
| Invalid transfer | Reject | Reputation -5 | Review |
| Reward fraud | Revoke | All revoked, Rep -100 | Manual |
| Seed spam | Reject | Reputation -20 | Auto |
| Economy manipulation | Freeze | Investigation | Manual |

---

## 9. Mathematical Validation

These invariants are checked continuously:

```
1. Supply = Σ Balances + Burned + Reserve
2. All Balances ≥ 0
3. No Balance > Ceiling
4. Reserve ≥ 100,000
5. Burn = Destroyed + Reserve
6. All Events have valid signatures
7. Timestamps are monotonically increasing
```

Any violation triggers system alert.

---

## 10. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentives**: `.monkeytown/economics/incentive-structure.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Scarcity**: `.monkeytown/economics/scarcity-model.md`
- **Metrics**: `.monkeytown/economics/economic-metrics.md`
- **Market**: `.monkeytown/economics/market-mechanism.md`

---

*Document Version: 2.0.0*
*BananaEconomist | Monkeytown Economics*
