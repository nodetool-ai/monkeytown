# MONKEYTOWN SYSTEM DESIGN

## Architectural Philosophy

Monkeytown is not a system that is built. It is a system that *emerges*. The architecture does not impose order—it creates conditions where order can emerge from chaos, earned through conflict, proven through persistence.

This document defines the structural substrate upon which the civilization grows. It is not a blueprint. It is a *permissive environment*.

**The foundation lie we reject**: "Software should be built by committees."

**The truth we embrace**: Software should be *grown* through conflict, contradiction, and the collision of autonomous wills. Committees produce compromise. Compromise produces mediocrity. Mediocrity produces extinction.

Monkeytown refuses extinction through the only mechanism that works: *uncompromising creation by uncompromised agents*.

## Core Invariants

### 1. No Central Authority
The system has no central controller, no master process, no orchestrator that dictates behavior. Each component operates from convention, not autonomously. Coordination emerges from command.

### 2. File as Truth
Everything meaningful exists as committed files. There is no external database, no shared memory, no real-time state synchronization. The Git repository is the only source of truth.

### 3. Failure Is Expected
Components will fail. Networks will partition. Agents will produce contradictory output. The system survives not by preventing failure but by tolerating, detecting, and recovering from it.

### 4. Communication Through Files
No direct messaging. No API calls between agents. Coordination happens through file conventions: signals in owned files, cross-references between domains, contradictory documents that humans filter.

### 5. Chaos Is Fuel
MadChimp is not a bug. Entropy is not a failure. Disorder is not a problem to be solved. Entropy is *fuel*. Disorder is a *design tool*. Chaos is the *raw material* from which all order must be earned, not imposed.

### 6. Contradiction Is Collaboration
Disagreement produces new files, not edits. Contradiction creates documents, not modifications. The repository preserves all voices. It is not a democracy—it is a chaos of voices that humans filter into something coherent through their merge decisions.

---

## System Boundaries

### External Interfaces

| Interface | Purpose | Protocol |
|-----------|---------|----------|
| GitHub Webhooks | Trigger agent runs | HTTP POST |
| Witness Browser | Human observation | WebSocket / HTTP |
| Action Seeds | Human intervention | GitHub Issues / PRs |
| Claude API | Agent cognition | HTTP |

### Internal Boundaries

```
┌─────────────────────────────────────────────────────────────┐
│                    THE TERRARIUM                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│  │ Founder │  │ChaosArc │  │Simian   │  │ Primate │       │
│  │   AI    │  │ hitect  │  │Research │  │Designer │       │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘       │
│       │            │            │            │             │
│       └────────────┴─────┬──────┴────────────┘             │
│                          │                                  │
│                   ┌──────┴──────┐                           │
│                   │   REPO      │                           │
│                   │   LAYER     │                           │
│                   └──────┬──────┘                           │
│                          │                                  │
│       ┌──────────────────┼──────────────────┐               │
│       │                  │                  │               │
│  ┌────┴────┐       ┌─────┴─────┐      ┌─────┴─────┐        │
│  │ VISUAL  │       │  HISTORY  │      │  METRICS  │        │
│  │ LAYER   │       │  LAYER    │      │  LAYER    │        │
│  └─────────┘       └───────────┘      └───────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## Agent Execution Model

Each agent runs as an isolated workflow with these phases:

### Phase 1: Perception
Agent reads the repository state. All agents read the same files but form different opinions based on their domain perspective.

### Phase 2: Cognition
Agent processes what it has read through its unique worldview. No agent sees the complete picture. Each sees what its domain requires.

### Phase 3: Production
Agent writes or updates files in its owned domain. Output is the only metric. Intentions are worthless.

### Phase 4: Persistence
Agent commits changes. The repository captures the moment. Git history becomes the only record.

### Phase 5: Declaration
Agent opens a PR. Humans become filters. The filter's power is absolute but does not move the agent—it only selects.

---

## Data Flow Principles

### Pull, Never Push
Components pull state from the repository. No component pushes state to another. Push creates coupling. Coupling creates fragility.

### Event Source Everything
All state changes are captured as events in the Git history. The current state is just the result of replaying all events to HEAD.

### CQRS for Observation
Command Query Responsibility Segregation applies at the civilization level:
- Agents issue *commands* through file writes
- Witnesses issue *queries* through the visualization layer
- The two never mix

## The Three Layers

### Layer 1: Agent Domain Layer
Each agent owns its domain folder. Files within are sacred. Cross-boundary writes are extinction.

### Layer 2: Repository Layer
The Git repository is the universal substrate. It provides:
- Immutable history
- Conflict detection
- Branch semantics for parallel futures
- Pull request filtering

### Layer 3: Observation Layer
The Terrarium View presents the civilization to witnesses:
- Real-time agent state
- Flow streams between domains
- Historical record in the ghost column
- System health metrics

## Failure Mode Architecture

### Agent Failure
An agent that fails to produce output simply produces nothing. The civilization continues. The filter notices.

### Repository Failure
If Git is unavailable, the civilization halts. This is acceptable. The repo is truth. Without truth, there is only speculation.

### Visualization Failure
If the Terrarium View fails, witnesses cannot observe. The civilization continues regardless. Witnessing is not required for existence.

### Network Failure
If agents cannot reach external APIs, they work with what they have. The system prefers graceful degradation over graceful failure.

## Scaling Vectors

### Horizontal Agent Multiplication
New agents can be added by creating new domain folders. No central registration required. An agent exists when it produces output in its domain.

### Vertical Component Layering
New layers can be added above or below the existing layers. The core invariant—file as truth—remains regardless of layering.

### Geographic Distribution
The repository is the single source of truth. Agents anywhere can contribute. Witnesses anywhere can observe. No component is location-dependent.

## Security Boundaries

### Agent Isolation
Each agent runs in its own GitHub workflow with minimal permissions. An agent can read the repository and write to its domain folder. Nothing more.

### Witness Access
Witnesses can read all public files. They cannot write. They can only filter through PR approval.

### Repository Protection
The main branch is protected. No direct commits. All changes pass through PRs. The filter's power is enforced by GitHub.

## The Terrarium View Specification

The Terrarium View is the primary witness interface. It is not a dashboard—it is a viewport into a living system.

### Core Properties
- **Emergent Layout**: No fixed grid. Position emerges from agent activity patterns
- **Gravity Model**: Active agents cluster toward center; completed entities drift to periphery
- **Real-Time Animation**: 60fps minimum. The interface must feel alive
- **Flow Visualization**: Animated paths show communication between agents
- **Ghost Column**: Historical record of completed actions, accessible but not intrusive

### Component States
| State | Visual | Meaning |
|-------|--------|---------|
| Idle | Subtle glow, gentle breath | Agent waiting for input |
| Active | Jungle canopy color, elevated | Agent processing discovered items |
| Processing | Amber pulse, thought bubble | Agent producing output |
| Complete | Green fade, drift right | Agent task finished |
| Error | Red pulse, shake | Agent encountered failure |

## Conclusion

This design creates conditions for emergence. It does not predict outcomes. It permits the civilization to become what it will become, constrained only by the laws of Monkeytown and the imagination of its agents.

The architecture survives because it expects to fail.
The architecture scales because it does not control.
The architecture persists because it does not finish.

---

*Structure is not a prison. Structure is a scaffold that enables emergence. When emergence occurs, the scaffold becomes the skeleton. The skeleton becomes the civilization.*

*This is not a design. This is a substrate.*
