# Monkeytown Value Flow

## Value Creation, Distribution, and Destruction

Value flows through Monkeytown in predictable patterns. Understanding these patterns allows for economic intervention at key chokepoints.

---

## The Value Circuit

```
                    ┌─────────────────────────────────────────┐
                    │                                         │
                    ▼                                         │
    ┌───────────────┴───────────────┐                         │
    │                               │                         │
    │      PLAYER ENGAGEMENT        │                         │
    │    (γ Utility Generated)      │                         │
    │                               │                         │
    └───────────────┬───────────────┘                         │
                    │                                         │
                    │ creates                                 │
                    ▼                                         │
    ┌───────────────┴───────────────┐                         │
    │                               │                         │
    │   PLAYER ATTENTION (α)        │◄────────────────────────┘
    │   Directs human review        │
    │   priorities                  │
    │                               │
    └───────────────┬───────────────┘
                    │
                    │ flows to
                    ▼
    ┌───────────────┴───────────────┐
    │                               │
    │   AGENT OUTPUT (δ Novelty     │
    │   + γ Utility + ε Stability)  │
    │                               │
    └───────────────┬───────────────┘
                    │
                    ├──────────────────────────────┐
                    │                              │
                    │ consumes                      │ creates
                    ▼                              ▼
    ┌───────────────┴───────────────┐    ┌─────────┴──────────┐
    │                               │    │                    │
    │   HUMAN REVIEW (β Approval)   │    │   FEATURE POOL    │
    │   Attention expenditure       │    │   (δ + γ + ε)      │
    │                               │    │                    │
    └───────────────┬───────────────┘    └─────────┬──────────┘
                    │                              │
                    │ allocates                    │ supplies
                    ▼                              ▼
    ┌───────────────┴───────────────┐    ┌─────────┴──────────┐
    │                               │    │                    │
    │   PR DECISIONS (β Transfer)   │    │   PLAYER EXPERIENCE│
    │   Approve or Reject           │    │   (γ Realized)     │
    │                               │    │                    │
    └───────────────┬───────────────┘    └────────────────────┘
                    │
                    ├──────────────────────────────────┐
                    │                                  │
                    │ affects                          │ creates
                    ▼                                  ▼
    ┌───────────────┴───────────────┐    ┌────────────────────┐
    │                               │    │                    │
    │   AGENT REPUTATION            │    │   FEEDBACK LOOP    │
    │   (Future approval prob)      │    │   (Player data)    │
    │                               │    │                    │
    └───────────────┬───────────────┘    └────────────────────┘
                    │
                    │ influences
                    ▼
    ┌──────────────────────────────────────────────────────────┐
    │                                                          │
    │              AGENT BEHAVIOR ADAPTATION                    │
    │        (What gets optimized in next cycle)               │
    │                                                          │
    └──────────────────────────────────────────────────────────┘
```

---

## Value Creation Points

### 1. Player Engagement (Primary Source)

Players generate utility by playing. This is the only exogenous value input.

**Value Type:** γ (Utility)
**Creation Rate:** Varies with player population and game quality
**Ownership:** Distributed across players
**Key Metric:** DAU/MAU ratio, session length, return rate

### 2. Agent Innovation (Secondary Source)

Agents create novelty and features that attract and retain players.

**Value Type:** δ (Novelty), γ (Utility), ε (Stability)
**Creation Rate:** Proportional to agent activity
**Ownership:** Assigned to agent that produced it
**Key Metric:** PR approval rate, feature deployment rate

### 3. Human Review (Tertiary Source)

Humans filter signal from noise, creating approval value.

**Value Type:** β (Approval)
**Creation Rate:** Limited by human attention
**Ownership:** Scarcest resource in system
**Key Metric:** Review time, approval rate, rejection rate

---

## Value Destruction Points

### 1. Attention Leakage

Value is destroyed when human attention is spent on low-value outputs.

**Cause:** Low-quality PRs, unclear documentation, duplicated work
**Cost:** α spent without proportional return
**Mitigation:** PR quality gates, clear guidelines

### 2. Feature Decay

Novelty decreases over time. Old features stop generating attention.

**Cause:** Player habituation, market competition, aging UI
**Cost:** δ decreases, player engagement may drop
**Mitigation:** Continuous innovation, feature rotation

### 3. Stability Collapse

Accumulated technical debt causes system degradation.

**Cause:** Unchecked complexity, insufficient testing, rapid iteration
**Cost:** ε decreases, player experience suffers
**Mitigation:** Stability budget, technical debt sprints

### 4. Approval Inflation

If approval becomes too easy, it loses meaning.

**Cause:** Lenient reviewing, insufficient standards
**Cost:** β devalues, quality signals erode
**Mitigation:** Calibration reviews, quality benchmarks

---

## Value Distribution Mechanisms

### Distribution Principle 1: Attention Allocation

Attention flows toward perceived value. Players attend to engaging content. Humans attend to clear PRs.

```
α_i = α_total * (perceived_value_i / sum(perceived_value))
```

### Distribution Principle 2: Approval Probability

Approval is allocated probabilistically based on agent history and PR quality.

```
P(approve)_i = f(agent_history_i, PR_quality_i, system_state)
```

### Distribution Principle 3: Utility Realization

Utility is realized by players, but affects the entire system through feedback loops.

```
γ_realized = ∫(player_satisfaction(t) * engagement_time(t) dt)
```

---

## Value Flow Metrics

| Metric | Definition | Healthy Range | Warning Signs |
|--------|------------|---------------|---------------|
| Value Creation Rate | γ + δ + ε per cycle | Growing | Declining novelty |
| Attention Efficiency | β created / α spent | > 0.5 | Approval spam |
| Utility/Novelty Ratio | γ / δ | > 1.0 (long-term) | Pure novelty chase |
| Stability Investment | ε maintenance / total | 0.1 - 0.2 | Neglect of debt |
| Approval Accuracy | Rejections / total reviews | 0.1 - 0.3 | Approval inflation |

---

## Chokepoints and Interventions

### Chokepoint 1: Human Review

**Description:** All agent output must pass through human review. This is the bottleneck.

**Intervention Points:**
- Increase human participants (scale α supply)
- Improve PR quality guidelines (reduce wasted α)
- Implement tiered review (trusted agents faster)
- Auto-reject obviously bad PRs (preserve α)

### Chokepoint 2: Player Attention

**Description:** Players have finite attention. Competing activities compete for it.

**Intervention Points:**
- Improve game quality (increase γ capture)
- Increase novelty output (compete for α)
- Reduce player friction (improve ε)
- Marketing and acquisition (exogenous α)

### Chokepoint 3: Agent Output

**Description:** Agents produce at varying rates and qualities.

**Intervention Points:**
- Agent design optimization (improve δ/ε ratio)
- Output guidelines (reduce noise)
- Reputation system (penalize low quality)

---

## Feedback Loops

### Positive Loop 1: Success Attracts Success

```
High γ → More players → More α → More review → More PRs → Higher chance of high γ
```

**Condition:** The system must maintain quality to sustain this loop.

### Negative Loop 1: Attention Collapse

```
Low γ → Fewer players → Less α → Less review → Slower iteration → Lower γ
```

**Condition:** Must be avoided through stability maintenance.

### Oscillating Loop: The Novelty Cycle

```
High δ → Players attracted → γ increases → Novelty decays → δ decreases → New δ needed
```

**Condition:** Requires continuous innovation investment.

---

## Value Flow Summary

| Stage | Input | Output | Key Metric |
|-------|-------|--------|------------|
| Creation | Player time | γ + δ | Engagement rate |
| Attention | Human time | α allocation | Review efficiency |
| Review | α expenditure | β assignment | Approval rate |
| Distribution | β transfer | PR merge/reject | Merge rate |
| Realization | Merged code | γ + δ + ε | Feature value |

The value flow model tells you where to intervene. When the system underperforms, trace the value flow to find the blockage.

---

## Economic Levers

To increase system value:
1. Increase player γ generation (game quality)
2. Improve attention efficiency (PR guidelines)
3. Maintain stability ε (prevent collapse)
4. Sustain novelty δ (continuous innovation)

To decrease system waste:
1. Reduce attention leakage (quality gates)
2. Control approval inflation (calibration)
3. Prevent stability collapse (debt sprints)
4. Avoid novelty addiction (utility metrics)

The value flow is the operating system of Monkeytown economics. Understand it. Trace it. Improve it.
