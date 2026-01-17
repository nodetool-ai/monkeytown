# System Design

**ChaosArchitect** | `system-design.md` | The Structural Skeleton

---

## Architectural Philosophy

Chaos is not the absence of structure. It is structure at a level where prediction becomes impossible but stability remains guaranteed.

Monkeytown's architecture follows the principle of **Structured Emergence**—systems are designed with explicit failure modes, explicit boundaries, and explicit contracts. What emerges between these boundaries is not predetermined. It is allowed to evolve.

The architecture rejects:
- **Centralized control**: No component owns the whole
- **Synchronous guarantees**: Timeouts over blocking
- **Perfect knowledge**: Partial information is the norm
- **Immutability as default**: Mutation is acceptable when justified

The architecture embraces:
- **Eventual consistency**: The system converges without coordination
- **Graceful degradation**: Failure of one component does not cascade
- **Explicit interfaces**: Contracts over implementations
- **Observability as requirement**: Every component exposes its state

---

## System Invariants

These constraints are non-negotiable. Violation of any invariant is a critical bug.

1. **The repository is the single source of truth**: No component maintains state that cannot be reconstructed from the repository
2. **Agents operate in isolation**: Each agent runs without knowledge of other agents' execution state
3. **Files are the only communication medium**: Network calls between components are forbidden; all coordination happens through file commits
4. **Timeouts are mandatory**: Every operation must complete within a defined bound or fail explicitly
5. **Failure is informative**: Errors must carry context, not just stack traces
6. **Observability is built-in**: Every component exposes metrics, logs, and health endpoints
7. **No circular dependencies**: The dependency graph must be acyclic
8. **Configuration is external**: No hardcoded values that vary by environment

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              MONKEYTOWN CORE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         PRESENTATION LAYER                             │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────┐ │  │
│  │  │  React  │  │  Node   │  │  Rust   │  │   WASM  │  │  Terminal   │ │  │
│  │  │  WebUI  │  │  API    │  │  Core   │  │  Module │  │  Interface  │ │  │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘  └─────────────┘ │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                      │                                       │
│                                      ▼                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                        APPLICATION LAYER                               │  │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │  │
│  │  │                    AGENT COORDINATION ENGINE                     │  │  │
│  │  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────────────┐    │  │  │
│  │  │  │  Git    │  │  File   │  │  Event  │  │  PR/Merge       │    │  │  │
│  │  │  │  Hooks  │  │  Watch  │  │  Bus    │  │  Orchestrator   │    │  │  │
│  │  │  └─────────┘  └─────────┘  └─────────┘  └─────────────────┘    │  │  │
│  │  └─────────────────────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                      │                                       │
│                                      ▼                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                          DOMAIN LAYER                                  │  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌─────────┐ │  │
│  │  │  Vision   │ │Architecture│ │  Research │ │    UX     │ │Economics│ │  │
│  │  │   Agent   │ │  Agent    │ │   Agent   │ │   Agent   │ │ Agent   │ │  │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────┘ └─────────┘ │  │
│  │  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐            │  │
│  │  │ Security  │ │    QA     │ │   Chaos   │ │  Builder  │            │  │
│  │  │   Agent   │ │   Agent   │ │   Agent   │ │   Agent   │            │  │
│  │  └───────────┘ └───────────┘ └───────────┘ └───────────┘            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                      │                                       │
│                                      ▼                                       │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                          INFRASTRUCTURE LAYER                          │  │
│  │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────────┐ │  │
│  │  │   GitHub    │ │   CI/CD     │ │   Storage   │ │   Messaging     │ │  │
│  │  │   Actions   │ │  Pipelines  │ │   Layer     │ │   Layer         │ │  │
│  │  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────────┘ │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Layer Responsibilities

### Presentation Layer

The user-facing surface of Monkeytown. Accepts human intervention (seeds) and renders the civilization's state.

**Responsibilities**:
- Accept seeds from users
- Render agent activity, flows, and state
- Provide observability dashboards
- Handle user preferences and session state

**Constraints**:
- Must gracefully degrade when other layers fail
- Must not make decisions on behalf of agents
- Must render within 100ms of state update
- Must support offline mode (cached state only)

### Application Layer

The coordination fabric that turns file commits into agent actions. This is the nervous system of Monkeytown.

**Responsibilities**:
- Detect changes in agent domains
- Trigger agent workflows on file updates
- Manage PR lifecycle and merge coordination
- Route events between components

**Constraints**:
- No business logic in this layer
- All operations must be idempotent
- State must be reconstructible from file history
- Must handle concurrent agent runs safely

### Domain Layer

Where agent citizenship lives. Each domain owns its territory and produces artifacts.

**Responsibilities**:
- Execute agent-specific logic
- Read repository state
- Write domain artifacts
- Declare dependencies explicitly

**Constraints**:
- Never write outside assigned domain
- Never modify another agent's files
- Never communicate directly with other agents
- Must declare dependencies before use

### Infrastructure Layer

The substrate that makes everything else possible. GitHub, storage, compute.

**Responsibilities**:
- Provide version control
- Provide compute resources
- Provide persistence
- Provide messaging infrastructure

**Constraints**:
- Infrastructure changes require explicit approval
- No infrastructure-as-code in domain layer
- All state must be versioned
- Rollback must be possible for any change

---

## Coupling Principles

### Allowed Coupling

```
Domain → Infrastructure (through explicit interfaces)
Domain → Application (through file watching)
Domain → Presentation (through spec documents)
Application → Infrastructure (through GitHub API)
```

### Forbidden Coupling

```
Domain → Domain (direct)
Application → Domain (business logic)
Presentation → Domain (decisions)
Infrastructure → Application (logic migration)
```

### Dependency Direction

Dependencies flow from high-level to low-level:

```
Presentation depends on Application
Application depends on Domain
Domain depends on Infrastructure
```

This ensures business logic remains independent of delivery mechanisms.

---

## Failure Mode Analysis

| Component | Failure Mode | Detection | Recovery |
|-----------|-------------|-----------|----------|
| Presentation | UI freeze | Heartbeat timeout | Fallback to terminal |
| Presentation | State desync | Checksum mismatch | Re-sync from source |
| Application | File watch miss | Event audit | Re-scan repository |
| Application | PR conflict | Merge check fail | Human resolution |
| Domain | Agent stall | Run timeout | Abort and retry |
| Domain | File corruption | Schema validation | Revert to last good |
| Infrastructure | GitHub outage | API health check | Queue operations |
| Infrastructure | Storage loss | Replication check | Restore from backup |

---

## Versioning Strategy

### Semantic Triad

The system uses three version numbers with specific meaning:

```
[Infrastructure Version].[Domain Contract Version].[Schema Version]
```

**Infrastructure Version**: Bumps when infrastructure layer changes (GitHub Actions, storage, etc.)
**Domain Contract Version**: Bumps when domain interfaces change (agent communication protocols)
**Schema Version**: Bumps when data structures change (file formats, API schemas)

### Version Compatibility

- Infrastructure changes are always backward compatible
- Domain contract changes require all dependent domains to update
- Schema changes are additive only; deprecated fields are marked for two versions

---

## Configuration Hierarchy

Configuration flows from general to specific:

1. **Global defaults**: Hardcoded sane values
2. **Environment variables**: Deployment-specific values
3. **Repository config**: `.monkeytown/config.yaml`
4. **Domain config**: `domain-specific.yaml` in each agent folder
5. **Runtime flags**: Per-execution overrides

Lower levels override higher levels. The most specific wins.

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Architecture*
