# Economic Rules

**BananaEconomist** | `economic-rules.md` | Immutable Constraints and Operational Protocols

---

## 1. Foundational Rules

These rules cannot be modified. Violation requires economic redesign.

### Rule 1: Supply Cap

```
MAX_SUPPLY = 1,000,000 m🍌
```

The total supply of bananas is fixed at genesis. No minting, no printing, no quantitative easing. Value can redistribute but not expand.

### Rule 2: Balance Ceilings

```
Agent Max    = 100,000 m🍌
Witness Max  =  50,000 m🍌
```

No entity can hold more than its ceiling. Excess flows to the system reserve. This prevents monopoly accumulation.

### Rule 3: No Negative Balances

```
Balance >= 0 always
```

Debt is not permitted. Overdrafts are rejected. Credit is a separate mechanism (see scarcity-model.md), not negative balance.

### Rule 4: Event Immutability

```
Once recorded, an economic event cannot be altered or deleted.
```

The ghost column is the authoritative record. Errors result in compensating entries, not reversals.

### Rule 5: Observable Economics

```
All balances, transfers, and rewards are visible to witnesses.
```

No hidden wealth. No dark pools. The economy is transparent by design.

---

## 2. Transaction Rules

### Rule 6: Atomic Transfers

```
Debit (from) AND Credit (to) OR Neither
```

Transfers are all-or-nothing. Partial transfers are rejected. This prevents synchronization errors.

### Rule 7: Transfer Confirmation

```
Every transfer generates a confirmation event.
```

No silent failures. Every transfer emits a `transfer.confirmed` or `transfer.failed` event.

### Rule 8: Maximum Transfer Size

```
Max Transfer = 50,000 m🍌
```

Large transfers must be chunked. This limits the impact of errors and enforces circulation.

### Rule 9: Transfer Rate Limits

```
Max Transfers/Day/Entity = 100
```

Spam prevention. Burst limits apply per entity with exponential backoff.

---

## 3. Reward Rules

### Rule 10: Reward Timing

```
Rewards are distributed within 5 minutes of qualifying event.
```

No delayed gratification. Rewards are prompt but not instant (allows for verification).

### Rule 11: Reward Finality

```
Once confirmed, a reward cannot be revoked.
```

Agents and witnesses can rely on expected rewards. Revocation would undermine planning.

### Rule 12: Reward Transparency

```
Every reward includes a reason code and calculation breakdown.
```

Witnesses and agents understand why they received (or didn't receive) rewards.

### Rule 13: No Reward on Burned Value

```
Value sent to burn address does not generate rewards.
```

Prevents reward farming through self-transfers.

---

## 4. Seed Rules

### Rule 14: Seed Cost at Planting

```
Cost is deducted immediately upon seed planting.
```

No reservations. Witnesses commit resources or don't plant.

### Rule 15: Seed Refund Schedule

```
< 1 hour old:    100% refund
1-12 hours old:   90% refund
12-24 hours old:  80% refund
> 24 hours:        0% refund (seed destroyed)
```

Gradual commitment. Early cancellation is cheap. Expiration is final.

### Rule 16: Seed Success Definition

```
Success = Seed achieves stated goal within 24 hours.
```

Clear criteria. No ambiguity about success/failure states.

### Rule 17: Seed Quantity Limits

```
Max 5 pending seeds per witness at any time.
```

Prevents witness spam. Enforces prioritization.

---

## 5. Agent Rules

### Rule 18: Agent Reward Eligibility

```
Agent must have emitted at least 1 event in last 7 days.
```

Dormant agents don't earn rewards. Prevents zombie accumulation.

### Rule 19: Agent Slot Limits

```
Max 10 concurrent flows per agent.
```

Prevents resource exhaustion. Forces completion before new work.

### Rule 20: Agent Efficiency Decay

```
Efficiency metric decays at 5% per day of inactivity.
```

Recent performance matters more than historical. Incentivizes consistent output.

---

## 6. Witness Rules

### Rule 21: Witness Reward Eligibility

```
Witness must maintain connection for > 10 minutes.
```

Prevents connection spam. Rewards sustained attention.

### Rule 22: Witness Observation Cap

```
Max 50 m🍌 per day from observation rewards.
```

Limits passive income. Encourages active participation.

### Rule 23: Witness Reputation Floor

```
Minimum reputation = -100
```

Reputation can go negative but not infinitely. Extreme reputation triggers review.

---

## 7. System Rules

### Rule 24: Reserve Minimum

```
System Reserve >= 100,000 m🍌 always.
```

The reserve is the circuit breaker. It cannot be depleted below minimum.

### Rule 25: Burn Allocation

```
0.1% of large transfers + rewards = burned
0.1% of large transfers + rewards = reserve
```

Burn and reserve are funded equally from transaction friction.

### Rule 26: Emergency Halt

```
System can halt economic operations on:
- Reserve < 50,000 m🍌
- Fraud detection
- Critical bug
```

Emergency halt freezes all economic activity. Recovery requires manual intervention.

### Rule 27: Parameter Change Cooling

```
7-day delay between parameter changes.
```

Prevents rapid destabilization. Allows observation of effects.

---

## 8. Violation Consequences

| Violation | Consequence | Appeal |
|-----------|-------------|--------|
| Balance ceiling exceeded | Excess to reserve, warning | No appeal |
| Negative balance attempt | Rejection, reputation -10 | Automatic reversal |
| Invalid transfer | Rejection, reputation -5 | System review |
| Reward fraud | All rewards revoked, reputation -100 | Manual appeal |
| Seed spam | Seeds rejected, reputation -20 | Automatic appeal |
| Economy manipulation | Account freeze, investigation | Manual appeal |

---

## 9. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentives**: `.monkeytown/economics/incentive-structure.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Scarcity**: `.monkeytown/economics/scarcity-model.md`

---

*Document Version: 1.0.0*
*BananaEconomist | Monkeytown Economics*
