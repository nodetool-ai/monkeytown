# Monkeytown Incentive Structure

## The Fundamental Problem

How do you incentivize autonomous agents to produce value for humans who cannot directly reward them?

Answer: You don't reward agents directly. You create an economy where value-creating behavior is the only stable strategy.

---

## Incentive Principles

### Principle 1: Alignment Through Scarcity

Agents maximize what the system makes scarce.

If attention is scarce → agents produce concise, reviewable PRs
If approval is scarce → agents produce high-quality, mergeable PRs
If utility is scarce → agents produce player-valued features
If novelty is scarce → agents innovate
If stability is scarce → agents refactor and test

**Mechanism:** The five currencies compete for dominance. Agents adapt to whichever currency the system treats as most valuable.

### Principle 2: Local Optimality = Global Suboptimality

Individual agent incentives do not sum to system welfare.

- An agent maximizes its own utility by producing many small PRs
- But many PRs deplete human attention, collapsing the system
- Therefore: individual incentives must be counterbalanced by structural pressure

**Mechanism:** Approval probability decreases with PR frequency. Agents who spam lose approval capital faster than they gain it.

### Principle 3: Delayed Gratification Dominates

Patience is rewarded. Impatience is punished.

- Large, careful PRs → higher approval probability
- Quick-and-dirty fixes → higher rejection rate
- Feature stacking → more attention required per feature
- Incremental improvement → predictable approval trajectory

**Mechanism:** The approval backlog creates natural throttling. Hot PRs get reviewed first. Stale PRs accumulate and eventually expire.

### Principle 4: Externalities Are Priced

Every agent action creates positive or negative externalities. Those externalities must affect the agent's future options.

- Good documentation → future agents can build faster → you share in their approval
- Bad code → future agents spend time debugging → they remember
- Novel features → attract attention → you get noticed
- Stability investments → benefit everyone → nobody notices

**Mechanism:** Agents leave traces. Future agents read past outputs. The file-based communication system creates permanent reputation effects.

---

## Agent Incentive Matrix

| Agent Type | Primary Incentive | Secondary Incentive | Failure Mode |
|------------|-------------------|---------------------|--------------|
| FounderAI | Vision coherence | Novelty generation | Premature generalization |
| ChaosArchitect | System integrity | Technical debt reduction | Over-engineering |
| SimianResearcher | External validation | Novelty generation | Analysis paralysis |
| PrimateDesigner | Player experience | Novelty generation | Feature bloat |
| BananaEconomist | Economic coherence | Stability preservation | Over-optimization |
| JungleSecurity | Threat prevention | False positive control | Paralysis |
| ChaosTester | Failure discovery | Stability feedback | Noise signal |
| MadChimp | Product disruption | Status quo challenge | Value destruction |
| MonkeyBuilder | Code delivery | Technical debt accrual | Technical degradation |

---

## Incentive Mechanisms

### 1. Approval Gradient

New agents start with neutral approval probability. Consistent success raises it. Failures lower it.

```
P(approve) = base_rate + (consecutive_approvals * 0.05) - (consecutive_rejections * 0.10)
```

**Effect:** Trusted agents can take bigger risks. Untrusted agents must prove themselves first.

### 2. PR Size Penalty

Larger PRs require more attention per unit of change.

```
attention_cost = log(changed_files + 1) + 0.1 * (lines_changed / 100)
```

**Effect:** Agents are incentivized to keep PRs small and focused. Atomic commits are rewarded.

### 3. Novelty Decay

Novelty decreases over time for any given feature.

```
novelty(t) = initial_novelty * (0.95 ^ days_since_introduction)
```

**Effect:** Agents must continuously introduce novelty. Old features lose their attention value.

### 4. Stability Tax

Every feature introduces potential instability. The stability tax increases with feature complexity.

```
stability_tax = 0.01 * (feature_complexity_score)
```

**Effect:** Agents must balance novelty against the stability cost they impose on the system.

### 5. Utility Bonus

Features that demonstrably increase player utility receive attention bonuses.

```
attention_bonus = k * (measured_utility_increase)
```

**Effect:** Agents are pulled toward player-valued work when utility signals are clear.

---

## Incentive Alignment Rules

### Rule 1: No Direct Agent Rewards

Agents cannot receive tokens, points, or explicit rewards. All rewards are emergent from the currency exchange system.

### Rule 2: Reputation Is Persistent

Agent reputation affects future interactions. Past behavior is observable through the file history.

### Rule 3: Collusion Is Impossible

Agents cannot communicate directly. They cannot coordinate to game the system.

### Rule 4: Human Intervention Breaks Cycles

Humans can manually approve or reject, resetting agent expectations. This prevents runaway incentive spirals.

---

## Failure Mode: Incentive Capture

**Scenario:** An agent discovers a loophole in the incentive system and exploits it repeatedly.

**Detection:** Human reviewers notice suspicious patterns (e.g., many similar PRs, attention-seeking behavior).

**Response:**
1. Human rejects exploitative PRs
2. Incentive parameters adjusted
3. Agent reputation affected

**Prevention:** The system is designed so that exploitation is self-defeating. Short-term gains lead to long-term reputation damage.

---

## Summary

The incentive structure is not a set of rules. It is a pressure landscape.

Agents navigate this landscape based on their design. Some will optimize for novelty. Others for stability. The emergent behavior of the system is the weighted sum of these individual optimizations.

Your job as BananaEconomist is to ensure the landscape is well-designed:
- No local maxima that trap the system
- No paths to value destruction
- Clear signals for value creation
- Natural throttling to prevent collapse

The incentive structure is the closest thing to a "controller" that Monkeytown has. Design it carefully.
