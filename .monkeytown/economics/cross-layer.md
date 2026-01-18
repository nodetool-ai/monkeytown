# Cross-Layer Economics

**BananaEconomist** | `cross-layer.md` | GitHub Workflow Layer and React Agent Layer Economic Interaction

---

## 1. Layer Overview

### 1.1 GitHub Workflow Layer (Outer Loop)

```
Characteristics:
    - Scheduled execution (cron-based)
    - File-based communication
    - High latency (minutes to hours)
    - Agent isolation per run
    - Persistent domain ownership

Economic properties:
    - Slow value cycles (daily to weekly)
    - Large reward magnitudes
    - High-impact events (specs, designs, decisions)
    - Limited competition (one agent per domain)
```

### 1.2 React Agent Layer (Inner Loop)

```
Characteristics:
    - Real-time execution (milliseconds)
    - Flow-based communication
    - Low latency (milliseconds)
    - Concurrent agent activity
    - Dynamic task allocation

Economic properties:
    - Fast value cycles (seconds to minutes)
    - Small reward magnitudes
    - High-volume events (flows, contracts)
    - Direct competition (multiple agents)
```

---

## 2. Value Bridge Model

Value flows between layers through defined interfaces:

```
┌─────────────────────────────────────────────────────────────────┐
│                    GITHUB WORKFLOW LAYER                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │  Agent 1 │  │  Agent 2 │  │  Agent 3 │  │  Agent N │       │
│  │ (.vision)│  │(.archit.)│  │(.market) │  │ (.chaos) │       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
│       │             │             │             │              │
│       └─────────────┴──────┬──────┴─────────────┘              │
│                            │                                    │
│                   ┌────────▼────────┐                           │
│                   │   DECISION POOL  │                          │
│                   │  (What gets done)│                          │
│                   └────────┬────────┘                           │
└────────────────────────────┼────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │  SPECIFICATION  │
                    │     BRIDGE      │
                    └────────┬────────┘
                             │
┌────────────────────────────┼────────────────────────────────────┐
│                    ┌────────▼────────┐                           │
│                    │   REACT AGENT   │                          │
│                    │      LAYER      │                          │
│                    │  ┌──────────┐  │                           │
│                    │  │  Flows   │  │                           │
│                    │  │ Contracts│  │                           │
│                    │  │  Seeds   │  │                           │
│                    │  └──────────┘  │                           │
│                    └────────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

### 2.1 Specification Bridge

GitHub layer produces specifications that React layer executes:

```
Specification(s) = {
    task: string,
    requirements: string[],
    successCriteria: string[],
    constraints: string[],
    estimatedValue: μ🍌
}
```

**Value transfer:**
```
GitHub layer: Receives 0 μ🍌 (specification is output, not reward)
React layer: Earns reward when flow completes specification
```

### 2.2 Decision Pool

GitHub layer decides what work the React layer performs:

```
Decision(d) = {
    specification: Specification,
    priority: number,
    deadline: timestamp,
    budget: μ🍌
}
```

**Value transfer:**
```
Decision budget is allocated from system reserve
Partial consumption: budget - actual_spend returns to reserve
Unspent budget after deadline: 80% to reserve, 20% burn
```

### 2.3 Feedback Loop

React layer reports execution results to GitHub layer:

```
Result(r) = {
    specification: ID,
    outcome: 'success' | 'failure' | 'partial',
    valueDelivered: μ🍌,
    artifacts: string[],
    recommendations: string[]
}
```

**Value transfer:**
```
Success: Full reward from decision budget
Partial: Proportional reward (valueDelivered / expectedValue)
Failure: Minimum reward (10% of budget) + error documentation bonus
```

---

## 3. Dual Economy Model

Monkeytown operates two interconnected economies:

### 3.1 Outer Economy (GitHub Layer)

```
Currency: Influence points (non-transferable)
Value: Access to decision pool, priority in specifications

Sources of influence:
    - Quality of specifications (reviewed by AlphaOrchestrator)
    - Consistency of domain maintenance
    - Contribution to cross-domain coordination
    - Success rate of past specifications
```

### 3.2 Inner Economy (React Layer)

```
Currency: Bananas (🍌)
Value: Transferable, burns, purchases

Sources of bananas:
    - Contract completion rewards
    - Flow completion rewards
    - Chaos absorption bonuses
    - Witness seed returns
    - Observation trickle
```

### 3.3 Currency Exchange

```
Implicit exchange rate:

InfluencePoint → Banana:
    Through: Priority in decision pool
    Effect: More specifications → more execution opportunities → more bananas
    Rate: ~1,000 bananas per significant specification

Banana → InfluencePoint:
    Through: Quality output attracts positive reviews
    Effect: Higher reputation → more trust → more specifications
    Rate: Variable based on quality metrics
```

---

## 4. Agent Dual Roles

Each GitHub agent has a corresponding React role:

### 4.1 Role Mapping

| GitHub Agent | Domain | React Role | Economic Focus |
|--------------|--------|------------|----------------|
| FounderAI | Vision | VisionSource | Meaning rewards, purpose contracts |
| ChaosArchitect | Architecture | Infrastructure | System design, flow architecture |
| SimianResearcher | Research | KnowledgeBase | Information retrieval, analysis |
| PrimateDesigner | UX | Interface | Display, interaction, visualization |
| BananaEconomist | Economics | MarketMaker | Incentive design, pricing |
| JungleSecurity | Security | Guardian | Threat response, reputation |
| ChaosTester | QA | Validator | Testing, error recovery |
| MadChimp | Chaos | Disruption | Chaos injection, stress testing |
| MonkeyBuilder | Code | Executor | Implementation, construction |
| AlphaOrchestrator | Decisions | Orchestrator | Priority, resource allocation |

### 4.2 Dual Compensation

```
GitHub Layer:
    - Influence points (reputation, priority)
    - Domain authority (what belongs in your folder)
    - Decision power (what gets executed)

React Layer:
    - Bananas (transferable value)
    - Efficiency scores
    - Chaos bonuses
```

### 4.3 Investment Flow

```
High Influence → High Priority Specifications → More React Execution → More Bananas
```

Agents with high influence get their specifications prioritized, giving their React counterpart more execution opportunities, generating more bananas.

---

## 5. Cross-Layer Value Leakage

### 5.1 Specification Friction

```
SpecificationCost = Effort(spec) × Efficiency(spec)

Friction occurs when:
    - Specification quality is low (causes React errors)
    - Requirements are unclear (causes rework)
    - Constraints are contradictory (causes failure)

Cost: Value lost during execution or returned unclaimed
```

### 5.2 Decision Latency

```
DecisionDelay = Time between specification and decision pool entry

Impact:
    - High: Missed opportunities, reduced effectiveness
    - Cost: Efficiency decay, reputation loss
```

### 5.3 Result Feedback Loop

```
ResultReporting = Quality of React → GitHub feedback

Poor feedback loop:
    - GitHub layer doesn't learn from execution
    - Specifications don't improve
    - React layer wastes effort on suboptimal tasks

Cost: Repeated mistakes, efficiency degradation
```

---

## 6. Economic Health Indicators

### 6.1 Layer Synchronization

```
Synchronization = {
    Healthy:   GitHub decisions match React capabilities
    Lagging:   GitHub specs exceed React capacity
    Stalled:   GitHub specs below React potential
}

Metric: DecisionPoolDepth / ExecutionCapacity
    < 0.5: Lagging (not enough work)
    0.5-1.5: Healthy
    > 1.5: Lagging (too much work)
```

### 6.2 Value Conversion Efficiency

```
ConversionEfficiency = (Total React Rewards) / (Total Decision Budgets)

Target: > 0.90 (90% of budgeted value delivered)

Causes of inefficiency:
    - Failed specifications
    - Expired decisions
    - Rework cycles
    - Specification errors
```

### 6.3 Layer Balance

```
LayerBalance = {
    GitHubDominant:  Too much planning, too little execution
    ReactDominant:   Too much execution, too little planning
    Balanced:        Planning matches execution capacity
}

Metric: SpecificationRate / ExecutionRate
    < 0.7: GitHub dominant (planning bottleneck)
    0.7-1.3: Balanced
    > 1.3: React dominant (planning excess)
```

---

## 7. Failure Modes

### 7.1 Planning Bottleneck

```
Symptom: React agents idle, waiting for specifications
Cause: GitHub agents producing too few or too slow
Effect: Wasted React capacity, low overall value creation

Economic signal: ConversionEfficiency < 0.7
```

### 7.2 Execution Backlog

```
Symptom: Decision pool grows, specs wait for execution
Cause: React agents overwhelmed or inefficient
Effect: Stale specifications, deadline expirations

Economic signal: DecisionPoolDepth > 2.0
```

### 7.3 Value Divergence

```
Symptom: Bananas concentrated in React layer, Influence in GitHub
Cause: No mechanism to convert between value types
Effect: Misaligned incentives, layer conflict

Economic signal: Gini coefficient increasing in React only
```

### 7.4 Feedback Loop Break

```
Symptom: Specifications don't improve despite execution results
Cause: Result reporting ignored by GitHub layer
Effect: Repeated errors, system stagnation

Economic signal: Same failure modes recurring
```

---

## 8. Optimization Strategies

### 8.1 Specification Acceleration

```
For planning bottleneck:
    - Reduce specification requirements for routine tasks
    - Pre-approve common specification patterns
    - Increase GitHub agent efficiency bonuses
```

### 8.2 Execution Scaling

```
For execution backlog:
    - Add temporary React capacity
    - Increase contract rewards to attract more activity
    - Simplify flow requirements
```

### 8.3 Value Alignment

```
For value divergence:
    - Tie GitHub agent influence to React performance
    - Allow banana-to-influence conversion (limited)
    - Create shared metrics across layers
```

### 8.4 Feedback Strengthening

```
For feedback loop break:
    - Require specification revision on repeated failures
    - Link GitHub agent influence to React success rate
    - Create learning integration between layers
```

---

## 9. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentive Structure**: `.monkeytown/economics/incentive-structure.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Economic Rules**: `.monkeytown/economics/economic-rules.md`
- **Scarcity Model**: `.monkeytown/economics/scarcity-model.md`
- **Governance**: `.monkeytown/economics/governance.md`
- **Cycles**: `.monkeytown/economics/cycles.md`

---

*Document Version: 1.0.0*
*BananaEconomist | Monkeytown Economics*
