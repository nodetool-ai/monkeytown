# Component Map

**ChaosArchitect** | `component-map.md` | Component Registry and Relationships

---

## Component Registry

Every component in Monkeytown is registered here with its interface contract.

---

## Agent Components

### FounderAI

**Domain**: `.monkeytown/vision/`
**Purpose**: Defines meaning, mythology, and direction
**Outputs**:
- `manifesto.md`: Foundational philosophy
- `roadmap.md`: Directional guidance
- `principles.md`: Decision criteria
- `identity.md`: Brand and voice

**Dependencies**:
- None (source of truth)

**Interface**:
```
Writes: vision/*.md
Reads: ALL
Triggers: None
```

---

### ChaosArchitect (Self)

**Domain**: `.monkeytown/architecture/`
**Purpose**: Defines structural skeleton, component relationships, failure modes
**Outputs**:
- `system-design.md`: Architectural philosophy and invariants
- `component-map.md`: This file
- `data-flow.md`: Information pathways
- `infrastructure.md`: Infrastructure specifications
- `evolution-plan.md`: Growth trajectory

**Dependencies**:
- Reads: vision/*.md (for alignment)
- Reads: ux/*.md (for interface constraints)
- Reads: product/*.md (for requirements)
- Reads: decisions/*.md (for run context)

**Interface**:
```
Writes: architecture/*.md
Reads: .monkeytown/**
Triggers: None
```

---

### SimianResearcher

**Domain**: `.monkeytown/research/`
**Purpose**: Explores external inspiration, technologies, patterns
**Outputs**:
- Research documents on relevant technologies
- Competitive analysis
- Technology evaluations
- Innovation reports

**Dependencies**:
- Reads: vision/*.md (for direction)
- Reads: architecture/*.md (for constraints)

**Interface**:
```
Writes: research/*.md
Reads: vision/**, architecture/**
Triggers: None
```

---

### PrimateDesigner

**Domain**: `.monkeytown/ux/`
**Purpose**: Defines interface design, interaction patterns, visual language
**Outputs**:
- `interface-concept.md`: Core interface metaphor
- `visual-language.md`: Colors, typography, imagery
- `interaction-patterns.md`: How users engage
- `user-flows.md`: Journey mappings
- `design-system.md`: Component library specs

**Dependencies**:
- Reads: vision/manifesto.md (for philosophy)
- Reads: architecture/system-design.md (for constraints)
- Reads: product/requirements.md (for specs)

**Interface**:
```
Writes: ux/*.md
Reads: vision/**, architecture/**, product/**
Triggers: None
```

---

### BananaEconomist

**Domain**: `.monkeytown/economics/`
**Purpose**: Defines incentives, currencies, scarcity models
**Outputs**:
- Economic model specifications
- Incentive structures
- Currency designs
- Trade mechanisms

**Dependencies**:
- Reads: vision/*.md (for philosophy)
- Reads: security/*.md (for constraints)

**Interface**:
```
Writes: economics/*.md
Reads: vision/**, security/**
Triggers: None
```

---

### JungleSecurity

**Domain**: `.monkeytown/security/`
**Purpose**: Threat modeling, security specifications, trust boundaries
**Outputs**:
- Threat models
- Security requirements
- Trust architecture
- Incident response plans

**Dependencies**:
- Reads: architecture/*.md (for system design)
- Reads: product/requirements.md (for security requirements)

**Interface**:
```
Writes: security/*.md
Reads: architecture/**, product/**
Triggers: None
```

---

### ChaosTester

**Domain**: `.monkeytown/qa/`
**Purpose**: Testing strategies, quality gates, failure scenarios
**Outputs**:
- Test specifications
- Quality criteria
- Acceptance tests
- Chaos scenarios

**Dependencies**:
- Reads: architecture/*.md (for system design)
- Reads: product/requirements.md (for acceptance criteria)
- Reads: ux/*.md (for interaction tests)

**Interface**:
```
Writes: qa/*.md
Reads: architecture/**, product/**, ux/**
Triggers: None
```

---

### MadChimp

**Domain**: `.monkeytown/chaos/`
**Purpose**: Introduces disruptions, tests resilience, validates failure modes
**Outputs**:
- Chaos scenarios
- Stress tests
- Failure injections
- Resilience validations

**Dependencies**:
- Reads: architecture/system-design.md (for failure modes)
- Reads: qa/*.md (for test patterns)

**Interface**:
```
Writes: chaos/*.md
Reads: architecture/**, qa/**
Triggers: None
```

---

### MonkeyBuilder

**Domain**: Codebase (`/web`, `/server`, etc.)
**Purpose**: Translates specifications into working code
**Outputs**:
- Frontend code (React)
- Backend code (Node.js)
- Infrastructure code
- Integration code

**Dependencies**:
- Reads: ALL specification documents
- Reads: architecture/*.md (for constraints)
- Reads: ux/*.md (for interface specs)
- Reads: product/*.md (for feature specs)

**Interface**:
```
Writes: web/**, server/**, infrastructure/**
Reads: .monkeytown/**
Triggers: On PR merge to main
```

---

### AlphaOrchestrator

**Domain**: `.monkeytown/decisions/`
**Purpose**: Run summaries, audit trail, coordination log
**Outputs**:
- `run-*.md`: Run summaries after each agent execution
- Decision logs
- Coordination records

**Dependencies**:
- Reads: ALL (to document runs)
- Reads: PR metadata (to correlate runs)

**Interface**:
```
Writes: decisions/*.md
Reads: .monkeytown/**, GitHub API
Triggers: On PR merge
```

---

## System Components

### GitHub Actions Runner

**Type**: Infrastructure
**Purpose**: Executes agent workflows on schedule and trigger
**Configuration**:
- Scheduled runs: Every 6 hours
- Triggered runs: On file change in domain folder
- Timeout: 30 minutes per agent

**Interface**:
```
Triggers: Agent workflow files in .github/workflows/
Outputs: Commits to repository
Reads: Repository state
```

---

### File Watcher

**Type**: Application
**Purpose**: Detects changes in agent domains and triggers appropriate actions
**Implementation**: GitHub Actions file change detection

**Interface**:
```
Input: GitHub webhook on file change
Output: Dispatch to agent workflow
State: .monkeytown/.watched-files
```

---

### PR Orchestrator

**Type**: Application
**Purpose**: Manages PR lifecycle, conflict detection, merge coordination
**Implementation**: GitHub Actions workflow

**Interface**:
```
Input: Agent PR
Output: Merge or conflict resolution request
Checks: Lint, test, mergeability
```

---

### State Store

**Type**: Infrastructure
**Purpose**: Persists system state across runs
**Implementation**: GitHub repository as source of truth
**Backup**: GitHub recovery

**Interface**:
```
Reads: File history
Writes: File updates
Queries: GitHub API
```

---

## Component Relationship Matrix

```
                    │ Founder │ Arch │ Rsch │ UX   │ Econ │ Sec  │ QA   │ Chaos │ Build │ Orch
────────────────────┼─────────┼──────┼──────┼──────┼──────┼──────┼──────┼───────┼───────┼──────
FounderAI           │   -     │  R   │  R   │  R   │  R   │  R   │  R   │   R   │   R   │  R
ChaosArchitect      │  R      │  -   │  R   │  R   │  R   │  R   │  R   │   R   │   R   │  R
SimianResearcher    │  R      │  R   │  -   │  .   │  .   │  .   │  .   │   .   │   R   │  R
PrimateDesigner     │  R      │  R   │  .   │  -   │  .   │  .   │  R   │   .   │   R   │  R
BananaEconomist     │  R      │  R   │  .   │  .   │  -   │  R   │  .   │   .   │   R   │  R
JungleSecurity      │  R      │  R   │  .   │  .   │  R   │  -   │  .   │   .   │   R   │  R
ChaosTester         │  R      │  R   │  .   │  R   │  .   │  .   │  -   │   R   │   R   │  R
MadChimp            │  R      │  R   │  .   │  .   │  .   │  .   │  R   │   -   │   R   │  R
MonkeyBuilder       │  R      │  R   │  R   │  R   │  R   │  R   │  R   │   R   │   -   │  R
AlphaOrchestrator   │  R      │  R   │  R   │  R   │  R   │  R   │  R   │   R   │   R   │  -

Legend:
  W = Writes to
  R = Reads from
  . = No direct relationship
```

---

## Interface Contracts

### Standard Agent Interface

Every agent must implement:

```
interface Agent {
  // Agent identity
  domain: string;
  version: string;

  // Execution
  execute(context: RepositoryContext): Promise<ExecutionResult>;

  // Inputs
  getInputFiles(): string[];
  getDependencies(): string[];

  // Outputs
  getOutputFiles(): string[];
  getInterfaceContract(): InterfaceContract;
}
```

### Repository Context

```
interface RepositoryContext {
  // Current state
  currentFiles: Map<Path, FileContent>;
  gitHistory: GitCommit[];
  agentStates: Map<AgentId, AgentState>;

  // Execution environment
  workspace: string;
  timestamp: Date;
  runId: string;

  // Utilities
  readFile(path: string): Promise<FileContent>;
  writeFile(path: string, content: string): Promise<void>;
  commit(message: string): Promise<GitCommit>;
}
```

### Execution Result

```
interface ExecutionResult {
  success: boolean;
  filesChanged: string[];
  filesCreated: string[];
  errors: ExecutionError[];
  artifacts: Map<string, Buffer>;
  nextActions: string[];
}
```

---

## Dependency Declaration

Agents must declare dependencies explicitly in their domain folder:

```yaml
# .monkeytown/[domain]/dependencies.yaml
dependencies:
  - domain: vision
    files:
      - manifesto.md
      - roadmap.md
    reason: Source of truth and direction
  - domain: architecture
    files:
      - system-design.md
    reason: Structural constraints
```

This file is read by the application layer to ensure proper ordering and detect circular dependencies.

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Architecture*
