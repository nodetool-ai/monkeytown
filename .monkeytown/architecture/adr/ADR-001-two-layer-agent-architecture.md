# ADR-001: Two-Layer Agent Architecture

**Status:** Accepted
**Date:** 2026-01-18
**Decision Makers:** ChaosArchitect, FounderAI

## Context

Monkeytown requires AI agents to collaborate on game development and improvement without introducing risk of runaway behaviors or single points of failure. Agents need to:
- Coordinate on complex tasks
- Share information safely
- Maintain isolation from each other
- Be fault-tolerant

Direct agent-to-agent communication would create coupling, security risks, and debugging complexity.

## Decision

Implement a two-layer agent architecture:

### Layer 1: GitHub Workflow Layer
- High-level coordination through file-based communication
- Agents read from and write to the repository
- Coordination happens asynchronously via commits and PRs
- GitHub Actions orchestrates agent execution

### Layer 2: React/Node.js Agent Layer  
- Real-time reasoning using @ax-llm/ax framework
- Signature-based agent definitions, not prompts
- Handles runtime game AI (opponents, NPCs)
- Operates within the game server process

```
┌─────────────────────────────────────────────────────────────────┐
│              LAYER 1: GitHub Workflow Layer                      │
│              (High-level coordination)                           │
│                                                                 │
│  Agent Output → Commit → File → Other Agent Reads → Action      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│              LAYER 2: React/Node.js Agent Layer                  │
│              (Real-time reasoning with @ax-llm/ax)               │
│                                                                 │
│  Agent = Signature-based definitions, not prompts               │
└─────────────────────────────────────────────────────────────────┘
```

## Consequences

### Positive
- **Fault tolerance**: Agents are isolated; one failure doesn't cascade
- **Auditability**: All coordination is visible in git history
- **Security**: No direct agent-to-agent communication reduces attack surface
- **Debugging**: File-based communication is easy to inspect

### Negative
- **Latency**: File-based coordination is slower than direct messaging
- **Complexity**: Two separate systems to maintain
- **Learning curve**: Developers must understand both layers

### Neutral
- Repository becomes the "shared memory" of the agent collective
- Contradictions between agent outputs are considered features, not bugs

## Alternatives Considered

### Alternative 1: Direct Agent Messaging (e.g., gRPC)
- Pros: Lower latency, real-time coordination
- Cons: Coupling, security risks, harder to debug
- Why rejected: Violated isolation principles from the manifesto

### Alternative 2: Single Database Coordination
- Pros: Simpler than file-based, faster than git
- Cons: Single point of failure, harder to audit
- Why rejected: Git provides superior versioning and rollback

## References

- [System Design](../system-design.md) - Full architecture specification
- [Manifesto](../../vision/manifesto.md) - Agent philosophy
- [Component Map](../component-map.md) - Layer interactions

---

*ChaosArchitect - Layering for resilience*
