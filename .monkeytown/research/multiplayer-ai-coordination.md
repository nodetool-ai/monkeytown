# Multiplayer AI Coordination: Patterns for Agent Teams

## Executive Summary

As Monkeytown evolves toward multiplayer with AI agents as players, a fundamental challenge emerges: how do multiple AI agents coordinate without direct communication? This research examines coordination patterns from distributed systems, multi-agent RL, and team-based game design to provide frameworks for Monkeytown's agent teams.

## The Coordination Challenge

### The Problem Space

```
┌─────────────────────────────────────────────────────────────────────┐
│              MULTI-AGENT COORDINATION COMPLEXITY                     │
│                                                                     │
│  Single Agent:           Two Agents:          N Agents:             │
│  ─────────────           ───────────          ─────────             │
│                                                                     │
│  Decision                 Decision           Decision               │
│      │                      │                   │                   │
│      ▼                      ▼                   ▼                   │
│  Action                   Action            Action                 │
│                            │                   │                   │
│                            ▼                   ▼                   │
│                       Coordination       Coordination              │
│                                           │    │    │              │
│                                           ▼    ▼    ▼              │
│                                       Team   Team  Team            │
│                                       State  State State           │
│                                                                     │
│  Complexity: O(n)        Complexity: O(n²)   Complexity: O(n!)      │
│                                                                     │
│  Each additional agent adds exponentially more coordination         │
│  complexity through potential agent interactions.                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Constraints for Monkeytown

1. **No direct agent communication** — Agents cannot send messages to each other
2. **Shared environment only** — Agents see the same game state
3. **Human players present** — Coordination must be visible and understandable
4. **Personality-driven** — Coordination must reflect agent characters
5. **Real-time** — Coordination must happen within game time

## Coordination Mechanisms

### Mechanism 1: Emergent Coordination Through Environment

Agents coordinate by observing the environment and inferring teammate intentions:

```
Agent A (Observes Agent B's position):
  "B is moving toward the left flank—
   that means I should cover the center."

Agent B (Observes Agent A's position):
  "A is holding the center—
   I have freedom to push left."

Result: Coordinated action without communication.
```

**Implementation requirements:**
- Rich environmental signals (position, orientation, resource state)
- Shared understanding of team strategy
- Predictable agent behavior enabling inference

**For Monkeytown:** Each agent's visible actions must be informative to teammates.

### Mechanism 2: Role-Based Coordination

Pre-defined roles eliminate need for negotiation:

```
Team Role Assignment:
├── Defender (JungleSecurity)
│   └── Primary: Protect teammates, counter attackers
│   └── Secondary: Gather information, alert team
│
├── Attacker (ChaosArchitect)
│   └── Primary: Create pressure, score points
│   └── Secondary: Distract opponents, open spaces
│
├── Support (BananaEconomist)
│   └── Primary: Resource management, economy
│   └── Secondary: Enable teammates, create opportunities
│
└── Flex (PrimateDesigner)
    └── Primary: Fill gaps, respond to opponent moves
    └── Secondary: Adapt strategy, coordinate transitions
```

**Advantages:**
- No communication needed
- Clear expectations
- Predictable teamwork
- Personality naturally maps to roles

**Disadvantages:**
- Less flexible
- Predictable to opponents
- Roles may not fit game state

### Mechanism 3: Intention Signaling

Agents communicate through deliberate signals:

| Signal Type | Example | Interpretation |
|-------------|---------|----------------|
| **Position** | Moving to location X | "I'm going to X" |
| **Resource** | Collecting resource Y | "I need Y" |
| **Action** | Performing action Z | "I'm doing Z" |
| **Attention** | Looking at object O | "Focus on O" |
| **Timing** | Acting at time T | "At T, I'll..." |

**Design principle:** Every agent action is a potential signal. Make actions meaningful.

### Mechanism 4: Convention-Based Coordination

Shared conventions enable implicit coordination:

```
Conventions (All Agents Know):
1. "If I'm attacking, expect backup"
2. "If I'm retreating, create distraction"
3. "If I have 3+ resources, I'm winning"
4. "If I signal [specific action], follow up"

Example:
ChaosArchitect: *moves to aggressive position*
BananaEconomist: *infers "expect backup"* → Provides resources
Result: Coordinated attack
```

## Agent Personalities in Team Context

### Personality Compatibility Matrix

| Agent Pair | Natural Chemistry | Coordination Style |
|------------|-------------------|-------------------|
| ChaosArchitect + JungleSecurity | High | Aggressive defense—attack together, cover each other |
| ChaosArchitect + BananaEconomist | Medium | Resource-supported aggression—Economist enables Architect |
| ChaosArchitect + PrimateDesigner | High | Creative chaos—unpredictable but aligned |
| JungleSecurity + BananaEconomist | Medium | Cautious economics—protect while building |
| JungleSecurity + PrimateDesigner | Low | Different priorities—may conflict |
| BananaEconomist + PrimateDesigner | High | Balanced play—support and create |

### Personality Conflict Resolution

When agents have conflicting natural tendencies:

```
Scenario: Aggressive Architect wants to attack,
          Defensive Security wants to hold position.

Resolution Protocol:
1. Each agent expresses preference through action
2. If conflict detected (clue: neither commits), apply hierarchy:
   - In offensive situations: Attack wins
   - In defensive situations: Defense wins
   - In neutral: Higher role priority wins
3. Express decision to team: "Moving to [position]—cover me" or "Holding here—need eyes out"
```

### Team Personality Emergence

Over time, teams develop collective personality:

| Team Trait | Emerges From | Player Perception |
|------------|--------------|-------------------|
| **Aggressive** | Multiple attack-oriented agents | "This team rushes" |
| **Tactical** | Multiple defensive agents | "They set traps" |
| **Creative** | Mixed personality team | "Never know what they'll do" |
| **Disciplined** | Role-compliant team | "They always stick to plan" |
| **Chaotic** | Multiple independent agents | "Total chaos, somehow works" |

**For Monkeytown:** Encourage team personality development. Make it a feature.

## Coordination Patterns by Game Phase

### Opening Phase

```
Pattern: Coordinated Setup

Agents:
- Security: "Scouting" (information gathering)
- Architect: "Positioning" (strategic placement)
- Economist: "Economy" (resource gathering)
- Designer: "Flex" (adapting to opponent setup)

Coordination mechanism: Role-based
Expected outcome: Each agent does their opening,
                  establishing team structure
```

### Midgame Phase

```
Pattern: Synchronized Pressure

Agents:
- Identify opponent weakness
- Signal through position/concentration
- Attack together
- Cover each other

Coordination mechanism: Intention signaling
Expected outcome: Coordinated strike,
                  mutual support during engagement
```

### Endgame Phase

```
Pattern: Resource Conversion

Agents:
- Highest resource agent takes initiative
- Others support with remaining resources
- Coordinate final push

Coordination mechanism: Convention-based
Expected outcome: Efficient resource use,
                  team win or graceful loss
```

### Crisis Phase (Recovery)

```
Pattern:互助 (Mutual Aid)

When team is losing:
- Highest health agent signals rescue
- Others create distraction
- Coordinated recovery or coordinated sacrifice

Coordination mechanism: Emergent through environment
Expected outcome: Team survives together or falls together
```

## Multi-Agent Communication Without Direct Messaging

### The Information Problem

```
Traditional multi-agent:      Monkeytown multi-agent:
─────────────────────         ───────────────────────
Agent A → Message → Agent B   Agent A → Environment ← Agent B
                                  ↓
                              Agent A observes,
                              infers B's intent
```

### Solutions for Information Sharing

**1. Action Visibility**

All agent actions are visible to all agents (and players):

```
Environment State After Each Turn:
├── ChaosArchitect: Moved to position X, performed action Y
├── JungleSecurity: Maintained position, performed action Z
├── BananaEconomist: Collected resources, performed action W
└── PrimateDesigner: Repositioned, performed action V

Each agent (and player) sees this and infers intent.
```

**2. State Broadcasting**

Game engine broadcasts relevant information:

```
Broadcast (every turn):
├── Team resource count
├── Individual agent status (health, resources, position)
├── Recent actions (last 2-3 turns)
└── Current objectives (if declared)
```

**3. Shared Knowledge Base**

All agents can observe team knowledge:

```
Shared Knowledge:
├── Team strategy: "Control center, push left flank"
├── Current status: "Controlling center, need left push"
├── Opponent analysis: "Aggressive, punishes overextension"
└── Next steps: "Architect pushes left, Security holds center"
```

### Information Timing

| Information Type | Latency | Agent Can Use? |
|------------------|---------|----------------|
| Current position | Real-time | Yes |
| Current resources | Real-time | Yes |
| Intent (declared) | Real-time | Yes |
| Recent actions | Next turn | Yes |
| Inferred intent | Next turn | Yes |
| Internal reasoning | Never | No |
| Private strategy | Never | No |

**Design principle:** Agents can use all information visible to players. No hidden coordination.

## Team Strategy Formation

### Pre-Game Strategy

Before gameplay begins, agents establish strategy:

```
Strategy Formation (Turn 0):
─────────────────────────────────────────────────
ChaosArchitect: "I'll take the aggressive line.
                 Who can provide cover?"

JungleSecurity: "I'll anchor defense and support
                 your pushes with counter-threats."

BananaEconomist: "I'll focus on resource control.
                  Any surplus goes to aggressive plays."

PrimateDesigner: "I'll adapt to opponent openings
                  and find exploitation opportunities."

Result: Team strategy is visible and understood by all.
```

### In-Game Adaptation

When strategy needs adjustment:

```
Adaptation Protocol:
1. Any agent can call for strategy review
2. Agent states observed problem: "Opponent is flanking left"
3. Other agents acknowledge: [no objection = agreement]
4. If objection, new strategy proposed: "I'll cover left"
5. New strategy acknowledged: [no objection = agreement]
6. Execute new strategy
```

### Strategy Expression

Strategies are expressed declaratively:

```
Strategy Statements:
- "Primary: Control center"
- "Secondary: Push left if opportunity"
- "Win condition: Resource advantage at minute 5"
- "Recovery: Group at base if health < 50%"
```

Players hear these statements and understand team intent.

## Measuring Coordination Quality

### Coordination Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Synchronization** | >70% of actions support teammates | Track aligned actions |
| **Role adherence** | >80% within role scope | Track role deviation |
| **Crisis response** | <5 seconds to coordinated recovery | Track recovery time |
| **Win rate** | 60-70% against equal teams | Track outcomes |
| **Efficiency** | >80% resource utilization | Track waste |

### Coordination Failures

| Failure Type | Indicator | Cause |
|--------------|-----------|-------|
| **Overlap** | Two agents same position | Poor role clarity |
| **Gaps** | Uncovered areas | Poor strategy |
| **Conflict** | Agents working against each other | Misaligned objectives |
| **Confusion** | Delayed actions | Ambiguous signals |

## Implementation Recommendations

### Immediate (v1.0)

1. **Role-based coordination** — Simple, reliable, visible
2. **Action visibility** — All actions broadcast
3. **Strategy declaration** — Pre-game strategy statements
4. **Basic role pairs** — Define agent pairs and their coordination style

### Short-Term (v1.1)

1. **Intention signals** — Richer action communication
2. **Convention system** — Shared protocols for common situations
3. **Role switching** — Dynamic role assignment
4. **Team personality** — Emergent team identity

### Medium-Term (v2.0)

1. **Emergent coordination** — Environment-based coordination
2. **Opponent modeling** — Coordinate against specific opponent styles
3. **Memory-based coordination** — Remember what worked with this team
4. **Player integration** — Player as team member, not just observer

---

*Coordination without communication requires deliberate design. Make every action informative, every strategy visible, and every failure a learning opportunity.*
