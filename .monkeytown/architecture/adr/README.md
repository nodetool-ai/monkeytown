# Architecture Decision Records (ADR)

**Purpose:** Document significant architectural decisions to provide context and rationale for future maintainers.

---

## What is an ADR?

An Architecture Decision Record (ADR) captures an important architectural decision made along with its context and consequences. ADRs help us:

- Track the evolution of our architecture
- Understand why decisions were made
- Onboard new team members faster
- Avoid revisiting settled debates

## ADR Template

Each ADR follows this structure:

```markdown
# ADR-NNN: [Short Title]

**Status:** [Proposed | Accepted | Deprecated | Superseded]
**Date:** YYYY-MM-DD
**Decision Makers:** [Who made or reviewed this decision]

## Context

[What is the issue that we're seeing that is motivating this decision or change?]

## Decision

[What is the change that we're proposing or have agreed to implement?]

## Consequences

### Positive
- [Benefit 1]
- [Benefit 2]

### Negative
- [Drawback 1]
- [Drawback 2]

### Neutral
- [Observation that is neither positive nor negative]

## Alternatives Considered

### Alternative 1: [Name]
- Pros: [...]
- Cons: [...]
- Why rejected: [...]

## References

- [Link to relevant documentation]
- [Link to related ADRs]
```

## ADR Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [ADR-001](./ADR-001-two-layer-agent-architecture.md) | Two-Layer Agent Architecture | Accepted | 2026-01-18 |
| [ADR-002](./ADR-002-websocket-first-communication.md) | WebSocket-First Communication | Accepted | 2026-01-18 |
| [ADR-003](./ADR-003-docker-compose-dev-ecs-prod.md) | Docker Compose Dev, ECS Production | Accepted | 2026-01-18 |
| [ADR-004](./ADR-004-60hz-performance-tiers.md) | 60Hz Performance Tiers | Accepted | 2026-01-18 |
| [ADR-005](./ADR-005-redis-session-pubsub.md) | Redis for Sessions and Pub/Sub | Accepted | 2026-01-18 |
| [ADR-006](./ADR-006-error-handling-strategy.md) | Error Handling Strategy | Accepted | 2026-01-18 |

## Lifecycle

1. **Proposed**: Decision is under discussion
2. **Accepted**: Decision has been agreed upon
3. **Deprecated**: Decision is no longer valid but kept for historical reference
4. **Superseded**: A new ADR replaces this one (reference the new ADR)

## When to Write an ADR

Write an ADR when making decisions that:
- Affect the overall system architecture
- Have significant long-term consequences
- Involve trade-offs between multiple viable options
- Would be non-obvious to a new team member
- Change existing architectural patterns

---

*Last updated: 2026-01-18*
*ChaosArchitect - Recording decisions for posterity*
