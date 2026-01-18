# Monkeytown Economic Rules

## Foundational Laws

The following rules govern the Monkeytown economy. These are not suggestions. They are invariants.

---

## Law 1: Attention Is Finite

Human attention is the only truly scarce resource. All economic activity derives from attention allocation.

**Implications:**
- Every PR competes for finite review time
- Agents that waste attention reduce system capacity
- No economic policy can increase human attention supply

**Mathematical statement:**
```
Σ_i α_i(t) ≤ α_max(t) for all t
```

---

## Law 2: Approval Is Conditional

Approval exists only when paired with attention. You cannot approve what you don't attend to.

**Implications:**
- Approval supply is bounded by attention supply
- Agents can influence their approval probability but not the total supply
- Approval shopping (seeking lenient reviewers) is a rational strategy

**Mathematical statement:**
```
β_i ≤ α_i for all i, t
```

---

## Law 3: Utility Is Exogenous

Player utility comes from outside the agent system. Agents cannot generate utility directly—they can only create conditions for utility.

**Implications:**
- Agents optimize for proxy metrics (novelty, stability) when utility is unmeasurable
- Utility signals are noisy and delayed
- The system depends on player participation for core value

**Mathematical statement:**
```
γ(t) = f(game_quality(t), player_state(t), market_conditions(t))
```

---

## Law 4: Novelty Decays

All novelty is temporary. Features lose attention value over time.

**Implications:**
- Continuous innovation is required to maintain attention
- Old features become "invisible infrastructure"
- Novelty investment has diminishing returns

**Mathematical statement:**
```
δ(t+1) = δ(t) * decay_factor, 0 < decay_factor < 1
```

---

## Law 5: Stability Has Inertia

Stability is hard to gain, easy to lose.

**Implications:**
- Stability investments are under incentivized (public goods problem)
- One major failure can erase accumulated stability
- Conservative changes are more valuable than their immediate utility suggests

**Mathematical statement:**
```
ε(t+1) = ε(t) + improvement - degradation
where |improvement| < |degradation| typically
```

---

## Rule 1: PR Quality Thresholds

PRs that fall below quality thresholds are rejected without detailed review.

**Thresholds:**
- Minimum 80% test coverage for new features
- Maximum 500 lines changed per PR
- Required documentation for API changes
- No critical security vulnerabilities

**Effect:** Preserves attention for reviewable PRs.

---

## Rule 2: Approval Decay

Unused approval authority decays over time.

**Mechanism:**
- Approval probability decreases for agents with no recent activity
- Reviewers lose calibration if inactive for > 30 days

**Effect:** Prevents reputation hoarding and maintains active participation.

---

## Rule 3: Compound Reputation

Agent reputation compounds. Good agents gain advantage. Bad agents lose ground.

**Mechanism:**
```
reputation(t+1) = reputation(t) * (1 + success_rate - 0.5) * 0.9 + base_rate
```

**Effect:** Creates path dependence and rewards consistency.

---

## Rule 4: Stability Budget

A portion of development capacity must be allocated to stability maintenance.

**Mechanism:**
- 10% of agent effort must go to technical debt, testing, or refactoring
- Violations trigger automatic stability flag

**Effect:** Prevents stability neglect.

---

## Rule 5: Novelty Ceiling

No single feature can monopolize novelty resources.

**Mechanism:**
- Maximum 30% of novelty budget per feature
- Novelty allocation is competitive

**Effect:** Prevents single-feature dependency and encourages diversification.

---

## Rule 6: Attention Rebalancing

When attention is misallocated, the system naturally rebalances.

**Mechanism:**
- Under-attended areas accumulate work, eventually demanding attention
- Over-attended areas face diminishing returns

**Effect:** Self-correcting attention economy.

---

## Rule 7: External Shock Response

External events (player surge, competitor release, market crash) trigger economic adjustment.

**Response:**
- Parameters are not changed during normal operation
- Shocks require human intervention for adjustment

**Effect:** Prevents economic volatility from parameter instability.

---

## Economic Constants

| Constant | Value | Rationale |
|----------|-------|-----------|
| ATTENTION_HALFLIFE | 7 days | Human attention cycles |
| NOVELTY_DECAY | 0.95/day | Feature attention decay |
| STABILITY_INERTIA | 0.5 | Loss resistance |
| APPROVAL_VARIANCE | 0.2 | Reviewer disagreement |
| UTILITY_NOISE | 0.3 | Measurement error |

---

## Boundary Conditions

The economy operates within these bounds:

```
0.0 ≤ α_utilization ≤ 0.8   # Reserve 20% for emergencies
0.0 ≤ β_approval_rate ≤ 0.9 # Reject 10% automatically
0.5 ≤ γ_utility_floor ≥ 0.0  # Minimum viable utility
0.0 ≤ δ_novelty_cap ≤ 1.0   # Maximum novelty per feature
0.5 ≤ ε_stability_min ≥ 0.0  # Minimum stability threshold
```

---

## Emergency Protocols

### Attention Crisis (α utilization > 0.9)

1. Pause new agent runs
2. Increase human review capacity
3. Auto-reject low-confidence PRs

### Approval Collapse (β < 0.1)

1. Review calibration exercise
2. Reduce PR frequency guidelines
3. Require additional justification

### Utility Crash (γ < 0.3)

1. Investigate root cause
2. Emergency stability push
3. Player feedback solicitation

### Stability Emergency (ε < 0.3)

1. Feature freeze
2. Technical debt sprint
3. Regression testing

### Novelty Exhaustion (δ approaching 0)

1. Research sprint
2. Competitor analysis
3. Player survey

---

## Rule Modification Protocol

Economic rules are not fixed. They can be modified through:

1. Proposal document in `.monkeytown/economics/`
2. Human review and approval
3. Gradual rollout with monitoring
4. Rollback capability for 30 days

---

## Summary

The economic rules create a constrained environment where agent behavior emerges. The rules are:

1. **Laws** (invariants): Attention finiteness, approval conditionality, utility exogeneity, novelty decay, stability inertia
2. **Rules** (mechanisms): Quality thresholds, decay, compounding reputation, stability budget, novelty ceiling, attention rebalancing, shock response
3. **Constants** (parameters): Fixed values that shape the economy
4. **Boundaries** (limits): Operational constraints
5. **Protocols** (procedures): Emergency response and rule modification

Violations of laws are impossible. Violations of rules are punished. Breaching boundaries triggers emergency response.
