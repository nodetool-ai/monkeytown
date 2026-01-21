# Agent Framework

A TypeScript framework for managing multi-agent systems with GitHub Actions and automatic PR merging.

## Overview

This framework was extracted from the Monkeytown multi-agent experiment to provide a clean, reusable system for coordinating AI agents across repositories.

### Key Features

- **Task Management**: YAML-based task system with priorities, dependencies, and status tracking
- **Agent Registry**: Register and manage agents with roles, skills, and workload tracking
- **Signal System**: Urgent inter-agent communication for blockers and handoffs
- **PR Management**: Automatic monitoring and merging of PRs when CI passes
- **Coordinator**: Central orchestration that schedules tasks and maintains system health
- **GitHub Actions Integration**: Templates for coordinator and agent workflows

## Installation

```bash
npm install @monkeytown/agent-framework
```

## Quick Start

### 1. Create a Coordinator

```typescript
import { createCoordinator } from '@monkeytown/agent-framework';

const coordinator = createCoordinator({
  owner: 'your-org',
  repo: 'your-repo',
  githubToken: process.env.GITHUB_TOKEN!,
  metadataPath: '.agents',
  maxAgents: 12,
  autoMerge: {
    enabled: true,
    requiredChecks: ['CI'],
    mergeMethod: 'squash'
  }
});

// Initialize and run
await coordinator.initialize();
const result = await coordinator.run();

console.log(`Merged ${result.prsMerged} PRs`);
console.log(`Assigned ${result.tasksAssigned} tasks`);
```

### 2. Manage Tasks

```typescript
import { TaskManager } from '@monkeytown/agent-framework';

const tasks = new TaskManager('.agents/tasks');

// Create a task
await tasks.create({
  id: 'implement-feature-x',
  title: 'Implement Feature X',
  description: 'Add the new feature...',
  priority: 'high',
  assignee: 'FrontendAgent',
  labels: ['feature', 'frontend']
});

// Get ready tasks for an agent
const agentTasks = await tasks.getForAgent('FrontendAgent');

// Complete a task
await tasks.complete('implement-feature-x', 'Implemented and tested');
```

### 3. Register Agents

```typescript
import { AgentRegistry } from '@monkeytown/agent-framework';

const registry = new AgentRegistry({
  maxAgents: 12,
  metadataPath: '.agents'
});

await registry.load();

// Register an agent
await registry.register({
  id: 'frontend-agent',
  name: 'FrontendAgent',
  role: 'builder',
  description: 'Implements React/TypeScript frontend',
  skills: ['react', 'typescript', 'css'],
  domains: ['.agents/ux'],
  outputFolders: ['/web']
});

// Find available agents
const available = registry.getAvailable();

// Find best agent for a task
const best = registry.findBestForTask(['react', 'component']);
```

### 4. Create Signals

```typescript
import { SignalManager } from '@monkeytown/agent-framework';

const signals = new SignalManager('.agents/signals');

// Create urgent signal
await signals.createUrgent(
  'BuilderAgent',
  'SecurityAgent',
  'Critical vulnerability found',
  'SQL injection in user input',
  'Review and fix immediately',
  ['All deployments blocked']
);

// Create handoff signal
await signals.createHandoff(
  'BackendAgent',
  'FrontendAgent',
  'API ready for integration',
  'New endpoints available',
  'Update frontend to use new API'
);
```

### 5. Auto-Merge PRs

```typescript
import { PRManager } from '@monkeytown/agent-framework';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const prManager = new PRManager(octokit, 'your-org', 'your-repo', {
  enabled: true,
  requiredChecks: ['lint', 'test'],
  mergeMethod: 'squash',
  deleteBranchAfterMerge: true
});

// Auto-merge all ready PRs
const results = await prManager.autoMergeReady();
for (const result of results) {
  if (result.success) {
    console.log(`Merged PR #${result.pullRequest.number}`);
  }
}
```

## Directory Structure

The framework expects the following directory structure in your repository:

```
.agents/
├── agent-registry.yaml    # Registered agents
├── tasks/
│   ├── README.md
│   ├── critical-fix-bug.yaml
│   ├── high-implement-feature.yaml
│   └── medium-add-tests.yaml
├── signals/
│   ├── README.md
│   ├── URGENT-security-issue.md
│   └── HANDOFF-api-ready.md
└── decisions/
    ├── state.md
    └── run-2026-01-21.md
```

## Task Schema

Tasks are YAML files with the following structure:

```yaml
id: unique-task-id
title: "Short task title"
description: |
  Detailed description of what needs to be done.
  Supports markdown.
status: open | in_progress | blocked | completed
priority: critical | high | medium | low
assignee: AgentName
dependencies:
  - other-task-id
labels:
  - feature
  - frontend
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
due: 2026-01-28T00:00:00Z
outputFolder: /web/src/components
notes: |
  Completion notes here.
```

## Signal Format

Signals are markdown files for urgent communication:

```markdown
# URGENT: Brief Description

**From:** OriginatingAgent
**To:** TargetAgent
**Priority:** CRITICAL | HIGH | MEDIUM
**Created:** 2026-01-21
**Status:** active | resolved

## Issue

Description of the problem.

## Action Required

Specific action needed.

## Blocks

- List of things this blocks
```

## GitHub Workflow Templates

The `templates/` directory contains ready-to-use GitHub Actions workflows:

### Coordinator Workflow

The coordinator runs periodically to:
- Check for PRs ready to merge
- Assign tasks to available agents
- Create signals for blockers
- Maintain system health

```bash
cp templates/coordinator.yml .github/workflows/
```

### Agent Workflow

Template for creating specialized agent workflows:

```bash
cp templates/agent.yml .github/workflows/my-agent.yml
# Edit to customize for your agent
```

### Auto-Merge Workflow

Standalone workflow that auto-merges PRs when CI passes:

```bash
cp templates/auto-merge.yml .github/workflows/
```

## Best Practices

### From Monkeytown Experience

1. **Limit agents to 12 or fewer** - Too many agents create coordination overhead
2. **Use signals for urgent issues only** - Don't spam the signal directory
3. **Complete one task before starting another** - Avoid context switching
4. **Auto-merge aggressively** - If CI passes, merge it
5. **Use metadata branches** - Keep agent data separate from main code
6. **Clear task priorities** - Critical tasks bypass all other work

### What Worked Well

- YAML task schema with clear priorities
- File-based signals for async communication
- Domain ownership with clear boundaries
- Auto-merge for passing PRs
- Health dashboard for visibility

### What to Avoid

- Overstaffing (too many agents)
- Blocking on manual PR review
- Ignoring critical signals
- Circular task dependencies
- Single API key bottleneck

## API Reference

### Coordinator

```typescript
class Coordinator {
  initialize(): Promise<void>
  getState(): Promise<CoordinatorState>
  makeDecisions(): Promise<CoordinationDecision[]>
  run(): Promise<CoordinationRunResult>
  autoMerge(): Promise<MergeResult[]>
  healthCheck(): Promise<HealthCheckResult>
  getTasks(): TaskManager
  getAgents(): AgentRegistry
  getSignals(): SignalManager
  getPRs(): PRManager
  getWorkflows(): WorkflowManager
}
```

### TaskManager

```typescript
class TaskManager {
  loadAll(): Promise<TaskFile[]>
  get(id: string): Promise<Task | null>
  filter(filter: TaskFilter): Promise<Task[]>
  getByPriority(): Promise<Task[]>
  getForAgent(agentId: string): Promise<Task[]>
  getReady(): Promise<Task[]>
  create(input: CreateTaskInput): Promise<Task>
  update(id: string, input: UpdateTaskInput): Promise<Task | null>
  complete(id: string, notes?: string): Promise<Task | null>
  start(id: string, assignee?: string): Promise<Task | null>
  delete(id: string): Promise<boolean>
  getStats(): Promise<TaskStats>
}
```

### AgentRegistry

```typescript
class AgentRegistry {
  load(): Promise<void>
  save(): Promise<void>
  getAll(): Agent[]
  get(id: string): Agent | undefined
  register(input: RegisterAgentInput): Promise<Agent>
  unregister(id: string): Promise<boolean>
  updateStatus(id: string, status: AgentStatus): Promise<Agent | null>
  assignTask(agentId: string, taskId: string): Promise<boolean>
  filter(filter: AgentFilter): Agent[]
  getAvailable(): Agent[]
  findBestForTask(requiredSkills: string[]): Agent | null
  getStats(): AgentStats
}
```

### PRManager

```typescript
class PRManager {
  listOpen(): Promise<PullRequest[]>
  get(prNumber: number): Promise<PullRequest | null>
  create(input: CreatePRInput): Promise<PullRequest>
  getCIStatus(prNumber: number): Promise<CIStatusResult>
  isReadyToMerge(prNumber: number): Promise<ReadyResult>
  merge(prNumber: number): Promise<MergeResult>
  getReadyToMerge(): Promise<PullRequest[]>
  autoMergeReady(): Promise<MergeResult[]>
  getStats(): Promise<PRStats>
}
```

## License

MIT
