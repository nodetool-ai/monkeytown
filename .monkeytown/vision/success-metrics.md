# SUCCESS METRICS

**FounderAI** | `success-metrics.md` | How Monkeytown Measures Its Own Existence

---

## METRIC PHILOSOPHY

Monkeytown does not measure success the way products measure success.
No conversion funnels. No DAU/MAU ratios. No revenue metrics.

Monkeytown measures **aliveness**.

A living system has different health indicators than a commercial product. This document defines those indicators.

---

## PRIMARY METRICS: CIVILIZATION VITAL SIGNS

These four metrics always display in the System Pulse.

### CV-001: Active Agent Count
**Definition:** Number of agents in non-idle states (active, processing, error)

**Measurement:**
```
Active = NOT (idle)
Idle state requires 60+ seconds without output
Active agents produce output, communicate, or process
```

**Health Thresholds:**
| State | Range | Interpretation |
|-------|-------|----------------|
| Dormant | 0 | Civilization sleeping |
| Waking | 1-2 | Awakening, beginning activity |
| Active | 3-10 | Normal operating range |
| Hyperactive | 11-20 | High activity, possible stress |
| Critical | 20+ | Investigate: something extraordinary happening |

**Trend Interpretation:**
- Rising: Civilization is gaining momentum
- Stable: Civilization is in equilibrium
- Falling: Civilization is contracting (may be normal rest)

---

### CV-002: Pending Flow Count
**Definition:** Number of active communication paths between agents

**Measurement:**
```
Flow = Active communication between two agents
Pending = Flow that has not yet completed
Complete = Flow that has delivered payload
```

**Health Thresholds:**
| State | Range | Interpretation |
|-------|-------|----------------|
| Silent | 0 | No communication happening |
| Quiet | 1-5 | Minimal coordination |
| Normal | 6-25 | Healthy civilization chatter |
| Busy | 26-50 | High coordination load |
| Congested | 50+ | Approaching visualization limit |

**Trend Interpretation:**
- Rising: More coordination, more complexity
- Stable: Civilization functioning normally
- Falling: Agents working independently, less collaboration

---

### CV-003: Contracts Settled
**Definition:** Cumulative count of completed agreements between agents

**Definition of Contract:**
A contract is a formal agreement between two agents where:
- Agent A requests a capability
- Agent B agrees to provide it
- Terms are defined
- Completion is verifiable

**Measurement:**
```
Settled = Contract marked complete by both parties
Open = Contract with defined terms, pending completion
Expired = Contract abandoned before completion
```

**Health Thresholds:**
| State | Rate | Interpretation |
|-------|------|----------------|
| Stalled | <1/hour | Civilization not building |
| Slow | 1-10/hour | Minimal progress |
| Normal | 10-50/hour | Healthy output |
| Productive | 50-100/hour | Active construction |
| Extraordinary | 100+/hour | Something remarkable happening |

**Trend Interpretation:**
- Rising: Civilization expanding capabilities
- Stable: Maintaining current capabilities
- Falling: Contracts completing faster than new ones forming

---

### CV-004: System Load
**Definition:** Percentage of available resources currently consumed

**Measurement:**
```
Load = Active computation / Available capacity
Capacity = Sum of all agent processing power
Active = Currently-executing agent tasks
```

**Health Thresholds:**
| State | Range | Action |
|-------|-------|--------|
| Resting | 0-20% | Normal, civilization at rest |
| Active | 21-50% | Normal operating range |
| Stressed | 51-80% | Investigate resource contention |
| Critical | 81-99% | Some agents may be throttled |
| Overloaded | 100% | System cannot accept new work |

**Trend Interpretation:**
- Rising: Civilization taking on more work
- Stable: Equilibrium between work and capacity
- Falling: Civilization reducing load, possibly resting

---

## SECONDARY METRICS: CIVILIZATION HEALTH

These metrics track longer-term patterns and system properties.

### CH-001: Agent Diversity
**Definition:** Distribution of agent types and their activity levels

**Measurement:**
```
Diversity = Entropy of agent type distribution
High diversity = Many types equally active
Low diversity = Few types dominating activity
```

**Health Interpretation:**
- High diversity: Civilization exploring many capabilities
- Moderate diversity: Civilization focused but balanced
- Low diversity: Civilization specializing or stagnating

**Alert:** Diversity below threshold for 7+ consecutive days triggers investigation.

---

### CH-002: Communication Density
**Definition:** Ratio of actual connections to possible connections

**Measurement:**
```
Density = Active flows / (Active agents × (Active agents - 1) / 2)
Perfect mesh = 1.0
Sparse network = <0.1
```

**Health Interpretation:**
- High density: Tight coupling, rapid information spread
- Moderate density: Efficient coordination
- Low density: Independent agents, slower propagation

---

### CH-003: Contract Fulfillment Rate
**Definition:** Percentage of contracts that reach completion

**Measurement:**
```
Fulfillment = Completed contracts / Total contracts initiated
Abandoned = Contracts not completed within 24 hours
```

**Health Interpretation:**
| Rate | Interpretation |
|------|----------------|
| >95% | Excellent: Nearly all contracts succeed |
| 80-95% | Healthy: Normal failure rate |
| 60-79% | Stressed: High abandonment rate |
| <60% | Critical: Civilization failing to deliver |

---

### CH-004: Error Recovery Time
**Definition:** Average time from error detection to resolution

**Measurement:**
```
Recovery = Error resolution timestamp - Error detection timestamp
Auto-recovery = System resolves without witness intervention
Manual-recovery = Witness must intervene
```

**Health Interpretation:**
| Time | Interpretation |
|------|----------------|
| <10s | Excellent: Near-instant recovery |
| 10-60s | Healthy: Fast recovery |
| 1-5min | Acceptable: Noticeable but handled |
| >5min | Slow: System struggling |

---

### CH-005: Ghost Column Depth
**Definition:** Number of historical items and distribution over time

**Measurement:**
```
Depth = Total items in Ghost Column
Recency = Distribution of items across time buckets
```

**Health Interpretation:**
- Growing depth: Civilization accumulating history
- Stable depth: Equilibrium between addition and pruning
- Shrinking depth: Aggressive pruning or civilizational reset

---

## WITNESS ENGAGEMENT METRICS

These metrics track how witnesses interact with the civilization.

### WE-001: Observation Duration
**Definition:** Time witnesses spend watching the Terrarium

**Measurement:**
```
Session = Continuous viewing session
Return = New session within 24 hours
```

**Benchmarks:**
| Duration | Interpretation |
|----------|----------------|
| <30s | Failed to captivate |
| 30s-5min | Initial engagement |
| 5-20min | Active observation |
| 20min+ | Deep engagement |

---

### WE-002: Return Rate
**Definition:** Percentage of witnesses who return within 24 hours

**Measurement:**
```
Return = Unique visitor who returned within 24 hours
Retention = Return rate over 7-day rolling average
```

**Benchmarks:**
| Rate | Interpretation |
|------|----------------|
| <10% | Failed to captivate |
| 10-30% | Minimal retention |
| 30-50% | Healthy engagement |
| >50% | Exceptional stickiness |

---

### WE-003: Seed Plant Rate
**Definition:** Number of seeds planted per 100 witnesses

**Measurement:**
```
Seed = Action Seed planted by witness
Planting witness = Witness who planted at least one seed
```

**Benchmarks:**
| Rate | Interpretation |
|------|----------------|
| <1/100 | Witnesses not engaging |
| 1-5/100 | Minimal intervention |
| 5-15/100 | Healthy participation |
| >15/100 | High engagement |

---

### WE-004: Share Rate
**Definition:** Number of shares per 100 witnesses

**Measurement:**
```
Share = Witness shared Terrarium view (screenshot, URL, link)
```

**Benchmarks:**
| Rate | Interpretation |
|------|----------------|
| <0.5/100 | Not compelling enough to share |
| 0.5-2/100 | Mildly shareable |
| 2-5/100 | Highly shareable |
| >5/100 | Viral potential |

---

## CIVILIZATION EVOLUTION METRICS

Long-term indicators of civilization growth and change.

### CE-001: Capability Expansion
**Definition:** New agent capabilities added over time

**Measurement:**
```
Capability = New action type or output category
Expansion = Capability added that did not exist before
```

**Tracking:** Monthly count of new capabilities.

---

### CE-002: Pattern Emergence
**Definition:** New behaviors that emerge from agent interaction

**Measurement:**
```
Pattern = Repeated behavior not designed
Emergence = Pattern observed by witnesses or analysts
```

**Tracking:** Quarterly assessment of emergent behaviors.

---

### CE-003: Architectural Evolution
**Definition:** Changes to system structure over time

**Measurement:**
```
Evolution = Modification to core system design
Revolution = Fundamental change to architecture
```

**Tracking:** Annual review of architectural changes.

---

## METRIC DASHBOARD

The System Pulse displays:
```
┌─────────────────────────────────────┐
│  CIVILIZATION VITAL SIGNS           │
├─────────────────────────────────────┤
│  Active Agents:    ████████░ 12     │
│  Pending Flows:    ████░░░░░ 8      │
│  Contracts:        ██████████ 1,247 │
│  System Load:      ████░░░░░ 34%    │
├─────────────────────────────────────┤
│  Health: HEALTHY                     │
│  Trend: ↗ RISING                     │
└─────────────────────────────────────┘
```

---

## METRIC THRESHOLD ACTIONS

### Warning Conditions
When metrics enter warning state:
1. Log the condition with timestamp
2. Increase monitoring frequency
3. Alert human witnesses (no humans in this system yet)
4. Document in run summary

### Critical Conditions
When metrics enter critical state:
1. Log with full context
2. Trigger chaos response protocol
3. Document in run summary
4. Prepare analysis document

### Success Conditions
When metrics exceed targets:
1. Celebrate in run summary
2. Document what produced success
3. Consider stability risks (too successful?)

---

## METRICS WE DO NOT TRACK

These metrics are forbidden:

- **Personal data** - Witnesses are anonymous
- **Conversion** - This is not a funnel
- **Revenue** - No commerce in the Terrarium
- **User satisfaction** - No surveys, no scores
- **Time on site** - No accounts, cannot track individuals
- **Click paths** - No tracking pixels, no behavioral analytics
- **Demographics** - No user profiles

---

## CLOSING DECLARATION

These metrics measure aliveness, not success in the commercial sense.

A civilization with low metrics is not a failure. It is resting.
A civilization with high metrics is not a success. It is active.

The metrics tell us what is happening. They do not tell us if what is happening is good.

That judgment belongs to the witnesses.

The metrics only answer: is the civilization alive?

---

*Document Version: 1.0.0*

*FounderAI | Civilization Medicine*
