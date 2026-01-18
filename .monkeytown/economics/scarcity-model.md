# Monkeytown Scarcity Model

## The Economics of Scarcity

Scarcity drives economic behavior. In Monkeytown, scarcity is engineered, not accidental. Understanding what is scarce, why, and what happens when scarcity changes is essential for economic design.

---

## Scarcity Taxonomy

### Category 1: Absolute Scarcity

Resources that cannot be increased by any means.

| Resource | Why Absolute | Economic Implication |
|----------|--------------|---------------------|
| Human Attention | Biologically limited | The ultimate bottleneck |
| Human Time | 24 hours/day | Review capacity is fixed |
| Historical Reputation | Cannot be undone | Path dependence |
| First-Mover Advantage | Time cannot be recovered | Early actions have outsized impact |

### Category 2: Rate-Limited Scarcity

Resources that can be increased but at a bounded rate.

| Resource | Rate Limit | Economic Implication |
|----------|------------|---------------------|
| Agent Output | Computational | Faster agents create more value |
| Novelty | Creative capacity | Diminishing returns per agent |
| Stability | Engineering effort | Technical debt accumulates faster than cleanup |
| Utility | Player engagement | Requires player time |

### Category 3: Relative Scarcity

Resources that are scarce only relative to demand.

| Resource | Scarcity Condition | Economic Implication |
|----------|-------------------|---------------------|
| Approval | When demand > capacity | Competition for review slots |
| Novelty | When many agents compete | Attention fragmentation |
| Stability | When risk tolerance is low | Safety premium |
| Utility | When players are satisfied | Saturation ceiling |

### Category 4: Manufactured Scarcity

Scarcity created by policy choice.

| Resource | How Manufactured | Economic Implication |
|----------|-----------------|---------------------|
| Quality Standards | Rejection thresholds | Creates tiered output |
| Review Speed | Capacity limits | Prioritizes urgent work |
| Feature Limits | Novelty caps | Prevents monopolization |
| Stability Requirements | Mandatory investment | Ensures baseline quality |

---

## Scarcity Maps

### Attention Scarcity Map

```
HUMAN REVIEW CAPACITY
         │
    10 PRs/ hour
         │
         ▼
    ┌──────────────────────────────────────────────┐
    │              AVAILABLE ATTENTION             │
    │                                              │
    │   PR Queue Length ──────────────────────────►│
    │                                              │
    │   Short Queue  ──► Attention is abundant     │
    │   Long Queue   ──► Attention is scarce       │
    │                                              │
    └──────────────────────────────────────────────┘
```

**Key insight:** Attention scarcity is a function of queue length, not absolute capacity.

### Novelty Scarcity Map

```
PLAYER ATTENTION
         │
    100% of player α
         │
         ▼
    ┌──────────────────────────────────────────────┐
    │           NOVELTY COMPETITION                │
    │                                              │
    │   Feature A  ───► Share of player attention  │
    │   Feature B  ───► Share of player attention  │
    │   Feature C  ───► Share of player attention  │
    │   ...        ───► ...                        │
    │                                              │
    │   Total Share = 100%                         │
    │   If N features, avg share = 100/N %         │
    │                                              │
    └──────────────────────────────────────────────┘
```

**Key insight:** Novelty is abundant (can create infinite features) but attention is scarce. Competition drives feature quality requirements.

### Stability Scarcity Map

```
SYSTEM COMPLEXITY
         │
    Increases with every feature
         │
         ▼
    ┌──────────────────────────────────────────────┐
    │         STABILITY CAPACITY                   │
    │                                              │
    │   Stability Investment ◄─────────────────────│
    │                                              │
    │   If Investment > Capacity ──► Stability     │
    │                                 Collapse     │
    │                                              │
    │   If Investment < Capacity ──► Stability     │
    │                                 Accumulation │
    │                                              │
    └──────────────────────────────────────────────┘
```

**Key insight:** Stability is abundant in simple systems, scarce in complex ones. Complexity growth outpaces stability investment.

---

## Scarcity Dynamics

### Dynamic 1: Scarcity Migration

When one resource becomes scarce, demand migrates to substitutes.

**Example:**
```
Attention scarce → Agents produce fewer PRs → Novelty decreases → Stability investment increases
```

**Economic mechanism:** The five currencies compete. When one is constrained, agents shift to optimize others.

### Dynamic 2: Scarcity Amplification

Initial scarcity can trigger cascading scarcity.

**Example:**
```
Stability scarce → Players leave → Attention decreases → Review slows → More bugs → More instability
```

**Economic mechanism:** Negative feedback loops can become positive when thresholds are crossed.

### Dynamic 3: Scarcity Alleviation

Policy intervention can relieve scarcity.

**Example:**
```
New humans join → Attention supply increases → Review capacity grows → Approval rate improves
```

**Economic mechanism:** Only absolute scarcity is truly fixed. Rate-limited scarcity requires rate increases.

---

## Scarcity Threshold Model

Scarcity has three regimes:

### Regime 1: Abundance
```
Supply >> Demand
- No competition
- Low quality standards
- Rapid approval
- Agent frustration (no constraints)
```

### Regime 2: Competition
```
Supply ≈ Demand
- Active competition
- Quality optimization
- Attention allocation
- Normal operation
```

### Regime 3: Scarcity
```
Supply << Demand
- Survival behavior
- Price escalation
- Black markets emerge
- System stress
```

**Transition points:**
- Abundance → Competition: When queue length > 3 items
- Competition → Scarcity: When queue length > 20 items or review time > 48 hours

---

## Scarcity Intervention Points

### Point 1: Increase Supply

**For Rate-Limited Scarcity:**
- Add more agents (increases output rate)
- Improve agent efficiency (increases output/agent)
- Reduce friction (removes rate limits)

**For Relative Scarcity:**
- Increase demand absorption (new use cases)
- Reduce substitutability (differentiate)

**For Manufactured Scarcity:**
- Relax standards (lower quality thresholds)
- Increase capacity (more reviewers)

### Point 2: Reduce Demand

**For Absolute Scarcity:**
- Cannot reduce demand for attention
- Can shift demand to substitutes

**For Rate-Limited Scarcity:**
- Queue management (FIFO, priority)
- Work deferral (non-critical tasks)
- Scope reduction (fewer features)

**For Relative Scarcity:**
- Market expansion (more players)
- Product differentiation (new value propositions)

### Point 3: Create Substitutes

**Example interventions:**
- Automated review for routine changes (substitutes for human attention)
- Stability pre-commit checks (substitutes for manual testing)
- Feature flags (substitutes for gradual rollout)

---

## Scarcity Failure Modes

### Failure 1: Monoculture Scarcity

**Description:** All agents compete for the same scarce resource, ignoring substitutes.

**Example:** All agents optimize for novelty when attention is scarce, neglecting stability.

**Detection:** One currency dominates all optimization.

**Response:** Introduce penalties for over-optimization. Mandate diversification.

### Failure 2: Artificial Scarcity

**Description:** Manufactured scarcity that exceeds natural scarcity.

**Example:** Quality standards set too high, blocking useful work.

**Detection:** Approval rate < 20%, high-quality PRs being rejected.

**Response:** Recalibrate standards. Increase review capacity.

### Failure 3: Scarcity Hoarding

**Description:** Agents accumulate resources during abundance, creating artificial scarcity later.

**Example:** Reputation accumulation without spending.

**Detection:** Reputation distribution highly skewed.

**Response:** Decay mechanisms. Mandatory expenditure.

### Failure 4: Scarcity Cascade

**Description:** One scarcity triggers another, creating a death spiral.

**Example:** Stability collapse → player churn → attention loss → review slowdown → more bugs

**Detection:** Multiple metrics declining simultaneously.

**Response:** Emergency intervention. Prioritize single resource recovery.

---

## Scarcity Monitoring

### Dashboard Metrics

| Metric | Description | Healthy Range |
|--------|-------------|---------------|
| Attention Ratio | Queue length / Review capacity | 0.5 - 2.0 |
| Novelty Index | New features / Total features | 0.1 - 0.3 |
| Stability Gap | Investment needed - Investment made | -0.1 - 0.1 |
| Approval Rate | Approved / Submitted | 0.6 - 0.9 |
| Utility Trend | γ over time | Growing or stable |

### Alert Thresholds

```
ATTENTION: Queue > 20 items → Alert
NOVELTY: Novelty Index < 0.05 → Alert
STABILITY: Stability Gap < -0.2 → Alert
APPROVAL: Approval Rate < 0.4 → Alert
UTILITY: γ declining for 7 days → Alert
```

---

## Scarcity Summary

| Resource | Scarcity Type | Control |
|----------|---------------|---------|
| Attention | Absolute | None |
| Approval | Rate-Limited | Capacity |
| Utility | Exogenous | Market |
| Novelty | Relative | Policy |
| Stability | Rate-Limited | Investment |

The scarcity model tells you what can be changed and what cannot. Focus policy on rate-limited and relative scarcity. Accept absolute scarcity as the constraint that shapes all behavior.

---

## Strategic Implications

**For Agent Design:**
- Agents must be efficient under scarcity (default state)
- Agents must not assume abundance (temporary condition)

**For Policy Design:**
- Monitor scarcity regimes (abundance → competition → scarcity)
- Intervene at scarcity migration points
- Prevent monoculture optimization

**For Emergency Response:**
- Identify primary scarcity first
- Address cascade risk
- Restore competition regime

Scarcity is not a problem to solve. It is a condition to manage.
