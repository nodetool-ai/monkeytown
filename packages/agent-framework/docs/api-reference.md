# API Reference

Complete API documentation for all framework components.

---

## Coordinator

Central orchestration component.

### Constructor

```typescript
new Coordinator(config: CoordinatorConfig, githubToken: string)
```

### Methods

#### `initialize()`

```typescript
async initialize(): Promise<void>
```

Loads agent registry and prepares for coordination.

#### `run()`

```typescript
async run(): Promise<CoordinationRunResult>
```

Executes a full coordination cycle:
1. Load state
2. Make decisions
3. Execute decisions
4. Return results

**Returns:**
```typescript
interface CoordinationRunResult {
  timestamp: string;
  duration: number;
  decisions: CoordinationDecision[];
  actionsExecuted: number;
  actionsFailed: number;
  prsMerged: number;
  tasksAssigned: number;
  signalsCreated: number;
  errors: string[];
  state: CoordinatorState;
}
```

#### `getState()`

```typescript
async getState(): Promise<CoordinatorState>
```

Returns current system state.

**Returns:**
```typescript
interface CoordinatorState {
  timestamp: string;
  totalAgents: number;
  activeAgents: number;
  blockedAgents: number;
  totalTasks: number;
  openTasks: number;
  inProgressTasks: number;
  blockedTasks: number;
  completedTasks: number;
  openPRs: number;
  pendingCIPRs: number;
  readyToMergePRs: number;
  activeSignals: number;
  criticalSignals: number;
  health: 'healthy' | 'degraded' | 'critical';
  blockers: string[];
}
```

#### `makeDecisions()`

```typescript
async makeDecisions(): Promise<CoordinationDecision[]>
```

Analyzes state and returns decisions without executing.

#### `healthCheck()`

```typescript
async healthCheck(): Promise<HealthCheckResult>
```

Performs health check on all components.

**Returns:**
```typescript
interface HealthCheckResult {
  status: 'healthy' | 'degraded' | 'critical';
  components: {
    name: string;
    status: 'healthy' | 'degraded' | 'critical';
    message?: string;
  }[];
  timestamp: string;
  recommendations: string[];
}
```

#### `autoMerge()`

```typescript
async autoMerge(): Promise<MergeResult[]>
```

Auto-merges all ready PRs.

#### Accessors

```typescript
getTasks(): TaskManager
getAgents(): AgentRegistry
getSignals(): SignalManager
getPRs(): PRManager
getWorkflows(): WorkflowManager
getConfig(): CoordinatorConfig
```

---

## TaskManager

Manages YAML task files.

### Constructor

```typescript
new TaskManager(tasksPath: string)
```

### Methods

#### `loadAll()`

```typescript
async loadAll(): Promise<TaskFile[]>
```

Loads all task files from directory.

#### `get(id)`

```typescript
async get(id: string): Promise<Task | null>
```

Gets a task by ID.

#### `filter(filter)`

```typescript
async filter(filter: TaskFilter): Promise<Task[]>
```

Filters tasks based on criteria.

**Parameters:**
```typescript
interface TaskFilter {
  status?: TaskStatus | TaskStatus[];
  priority?: TaskPriority | TaskPriority[];
  assignee?: string;
  labels?: TaskLabel[];
  ready?: boolean;  // Only tasks with met dependencies
}
```

#### `getByPriority()`

```typescript
async getByPriority(): Promise<Task[]>
```

Returns non-completed tasks sorted by priority (critical first).

#### `getForAgent(agentId)`

```typescript
async getForAgent(agentId: string): Promise<Task[]>
```

Returns tasks assigned to an agent, sorted by priority.

#### `getReady()`

```typescript
async getReady(): Promise<Task[]>
```

Returns open tasks with all dependencies met.

#### `create(input)`

```typescript
async create(input: CreateTaskInput): Promise<Task>
```

Creates a new task.

**Parameters:**
```typescript
interface CreateTaskInput {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  assignee?: string;
  dependencies?: string[];
  labels?: TaskLabel[];
  due?: string;
  outputFolder?: string;
}
```

#### `update(id, input)`

```typescript
async update(id: string, input: UpdateTaskInput): Promise<Task | null>
```

Updates a task.

**Parameters:**
```typescript
interface UpdateTaskInput {
  status?: TaskStatus;
  assignee?: string;
  notes?: string;
  branch?: string;
  pullRequestNumber?: number;
}
```

#### `complete(id, notes?)`

```typescript
async complete(id: string, notes?: string): Promise<Task | null>
```

Marks task as completed.

#### `start(id, assignee?)`

```typescript
async start(id: string, assignee?: string): Promise<Task | null>
```

Marks task as in_progress.

#### `block(id, notes?)`

```typescript
async block(id: string, notes?: string): Promise<Task | null>
```

Marks task as blocked.

#### `delete(id)`

```typescript
async delete(id: string): Promise<boolean>
```

Deletes a task.

#### `canStart(id)`

```typescript
async canStart(id: string): Promise<boolean>
```

Checks if dependencies are met.

#### `getStats()`

```typescript
async getStats(): Promise<TaskStats>
```

Returns task statistics.

---

## AgentRegistry

Manages agent registration and queries.

### Constructor

```typescript
new AgentRegistry(config: AgentRegistryConfig)
```

**Parameters:**
```typescript
interface AgentRegistryConfig {
  maxAgents: number;
  metadataPath: string;
}
```

### Methods

#### `load()`

```typescript
async load(): Promise<void>
```

Loads agents from registry file.

#### `save()`

```typescript
async save(): Promise<void>
```

Saves agents to registry file.

#### `getAll()`

```typescript
getAll(): Agent[]
```

Returns all registered agents.

#### `get(id)`

```typescript
get(id: string): Agent | undefined
```

Gets agent by ID.

#### `register(input)`

```typescript
async register(input: RegisterAgentInput): Promise<Agent>
```

Registers a new agent.

**Parameters:**
```typescript
interface RegisterAgentInput {
  id: string;
  name: string;
  role: AgentRole;
  description: string;
  schedule?: string;
  domains?: string[];
  skills?: string[];
  outputFolders?: string[];
  maxConcurrentTasks?: number;
}
```

#### `unregister(id)`

```typescript
async unregister(id: string): Promise<boolean>
```

Removes an agent.

#### `updateStatus(id, status)`

```typescript
async updateStatus(id: string, status: AgentStatus): Promise<Agent | null>
```

Updates agent status.

#### `assignTask(agentId, taskId)`

```typescript
async assignTask(agentId: string, taskId: string): Promise<boolean>
```

Assigns a task to an agent. Returns false if at max capacity.

#### `removeTask(agentId, taskId)`

```typescript
async removeTask(agentId: string, taskId: string): Promise<boolean>
```

Removes a task from an agent.

#### `filter(filter)`

```typescript
filter(filter: AgentFilter): Agent[]
```

Filters agents.

**Parameters:**
```typescript
interface AgentFilter {
  role?: AgentRole | AgentRole[];
  status?: AgentStatus | AgentStatus[];
  skill?: string;
  available?: boolean;
}
```

#### `getAvailable()`

```typescript
getAvailable(): Agent[]
```

Returns agents that can take new tasks.

#### `getBlocked()`

```typescript
getBlocked(): Agent[]
```

Returns blocked agents.

#### `findBestForTask(requiredSkills)`

```typescript
findBestForTask(requiredSkills: string[]): Agent | null
```

Finds best matching available agent.

#### `getStats()`

```typescript
getStats(): AgentStats
```

Returns agent statistics.

---

## SignalManager

Handles urgent inter-agent communication.

### Constructor

```typescript
new SignalManager(signalsPath: string)
```

### Methods

#### `loadAll()`

```typescript
async loadAll(): Promise<SignalFile[]>
```

Loads all signal files.

#### `getActive()`

```typescript
async getActive(): Promise<Signal[]>
```

Returns active signals.

#### `getForAgent(agentId)`

```typescript
async getForAgent(agentId: string): Promise<Signal[]>
```

Returns signals for an agent (or "All").

#### `getCritical()`

```typescript
async getCritical(): Promise<Signal[]>
```

Returns critical priority signals.

#### `filter(filter)`

```typescript
async filter(filter: SignalFilter): Promise<Signal[]>
```

Filters signals.

**Parameters:**
```typescript
interface SignalFilter {
  type?: SignalType | SignalType[];
  priority?: SignalPriority | SignalPriority[];
  to?: string;
  status?: SignalStatus | SignalStatus[];
}
```

#### `create(input)`

```typescript
async create(input: CreateSignalInput): Promise<Signal>
```

Creates a signal.

**Parameters:**
```typescript
interface CreateSignalInput {
  type: SignalType;
  title: string;
  from: string;
  to: string;
  priority: SignalPriority;
  issue: string;
  actionRequired: string;
  blocks?: string[];
}
```

#### `createUrgent(...)`

```typescript
async createUrgent(
  from: string,
  to: string,
  title: string,
  issue: string,
  actionRequired: string,
  blocks?: string[]
): Promise<Signal>
```

Creates an urgent (CRITICAL priority) signal.

#### `createHandoff(...)`

```typescript
async createHandoff(
  from: string,
  to: string,
  title: string,
  issue: string,
  actionRequired: string
): Promise<Signal>
```

Creates a handoff (MEDIUM priority) signal.

#### `resolve(title, resolution)`

```typescript
async resolve(title: string, resolution: string): Promise<boolean>
```

Marks a signal as resolved.

#### `delete(title)`

```typescript
async delete(title: string): Promise<boolean>
```

Deletes a signal.

#### `getStats()`

```typescript
async getStats(): Promise<SignalStats>
```

Returns signal statistics.

---

## PRManager

Manages GitHub pull requests.

### Constructor

```typescript
new PRManager(
  octokit: Octokit,
  owner: string,
  repo: string,
  config?: Partial<AutoMergeConfig>
)
```

**Config:**
```typescript
interface AutoMergeConfig {
  enabled: boolean;
  requiredChecks: string[];
  deleteBranchAfterMerge: boolean;
  mergeMethod: 'merge' | 'squash' | 'rebase';
  blockedLabels: string[];
  autoMergeLabels: string[];
}
```

### Methods

#### `listOpen()`

```typescript
async listOpen(): Promise<PullRequest[]>
```

Lists all open PRs with CI status.

#### `get(prNumber)`

```typescript
async get(prNumber: number): Promise<PullRequest | null>
```

Gets a specific PR.

#### `create(input)`

```typescript
async create(input: CreatePRInput): Promise<PullRequest>
```

Creates a PR.

#### `getCIStatus(prNumber)`

```typescript
async getCIStatus(prNumber: number): Promise<{
  status: CIStatus;
  checks: CICheck[];
}>
```

Gets CI status for a PR.

#### `isReadyToMerge(prNumber)`

```typescript
async isReadyToMerge(prNumber: number): Promise<{
  ready: boolean;
  reason?: string;
}>
```

Checks if PR is ready to merge.

#### `merge(prNumber)`

```typescript
async merge(prNumber: number): Promise<MergeResult>
```

Merges a PR.

**Returns:**
```typescript
interface MergeResult {
  success: boolean;
  sha?: string;
  error?: string;
  pullRequest: PullRequest;
}
```

#### `getReadyToMerge()`

```typescript
async getReadyToMerge(): Promise<PullRequest[]>
```

Returns PRs ready to merge.

#### `autoMergeReady()`

```typescript
async autoMergeReady(): Promise<MergeResult[]>
```

Auto-merges all ready PRs.

#### `enableAutoMerge(prNumber)`

```typescript
async enableAutoMerge(prNumber: number): Promise<void>
```

Adds auto-merge label to a PR.

#### `filter(filter)`

```typescript
async filter(filter: PRFilter): Promise<PullRequest[]>
```

Filters PRs.

#### `getStats()`

```typescript
async getStats(): Promise<PRStats>
```

Returns PR statistics.

---

## WorkflowManager

Manages GitHub Actions workflows.

### Constructor

```typescript
new WorkflowManager(octokit: Octokit, owner: string, repo: string)
```

### Methods

#### `list()`

```typescript
async list(): Promise<{
  id: number;
  name: string;
  path: string;
  state: string;
}[]>
```

Lists all workflows.

#### `trigger(workflowFile, ref?, inputs?)`

```typescript
async trigger(
  workflowFile: string,
  ref?: string,
  inputs?: Record<string, string>
): Promise<void>
```

Triggers a workflow run.

#### `getRecentRuns(workflowFile?, limit?)`

```typescript
async getRecentRuns(
  workflowFile?: string,
  limit?: number
): Promise<WorkflowRun[]>
```

Gets recent workflow runs.

#### `getRunStatus(runId)`

```typescript
async getRunStatus(runId: number): Promise<{
  status: string;
  conclusion: string | null;
  jobs: { name: string; status: string; conclusion: string | null }[];
}>
```

Gets status of a workflow run.

#### `cancel(runId)`

```typescript
async cancel(runId: number): Promise<void>
```

Cancels a workflow run.

#### `isAnyAgentRunning()`

```typescript
async isAnyAgentRunning(): Promise<boolean>
```

Checks if any workflow is running.

#### `getFailedRuns(limit?)`

```typescript
async getFailedRuns(limit?: number): Promise<FailedRun[]>
```

Gets recent failed runs.

---

## Helper Functions

### `createCoordinator(options)`

```typescript
function createCoordinator(options: {
  owner: string;
  repo: string;
  githubToken: string;
  metadataPath?: string;
  metadataBranch?: string;
  baseBranch?: string;
  maxAgents?: number;
  autoMerge?: Partial<AutoMergeConfig>;
}): Coordinator
```

Creates a Coordinator with sensible defaults.

### `defaultAutoMergeConfig`

```typescript
const defaultAutoMergeConfig: AutoMergeConfig = {
  enabled: true,
  requiredChecks: ['Lint & Type Check', 'Run Tests'],
  deleteBranchAfterMerge: true,
  mergeMethod: 'squash',
  blockedLabels: ['do-not-merge', 'wip', 'blocked'],
  autoMergeLabels: ['auto-merge', 'ready-to-merge']
};
```

---

## Types

### Task Types

```typescript
type TaskPriority = 'critical' | 'high' | 'medium' | 'low';
type TaskStatus = 'open' | 'in_progress' | 'blocked' | 'completed' | 'cancelled';
type TaskLabel = 'bug' | 'feature' | 'refactor' | 'security' | 'documentation' | 'test' | string;
```

### Agent Types

```typescript
type AgentRole = 'coordinator' | 'builder' | 'architect' | 'researcher' | 'designer' | 'security' | 'qa' | 'product' | 'custom';
type AgentStatus = 'active' | 'inactive' | 'blocked' | 'running';
```

### Signal Types

```typescript
type SignalType = 'URGENT' | 'BLOCKED' | 'HANDOFF';
type SignalPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM';
type SignalStatus = 'active' | 'resolved' | 'expired';
```

### PR Types

```typescript
type PRStatus = 'open' | 'merged' | 'closed';
type CIStatus = 'pending' | 'running' | 'success' | 'failure' | 'cancelled';
```
