# Coordinator Guide

The Coordinator is the central orchestrator that manages the entire multi-agent system.

## Overview

The Coordinator:
- **Schedules tasks** to available agents
- **Monitors PRs** for CI status
- **Auto-merges** PRs when ready
- **Creates signals** for blockers
- **Maintains health** metrics
- **Escalates issues** when needed

---

## Setting Up the Coordinator

### 1. Create Coordinator Workflow

`.github/workflows/coordinator.yml`:

```yaml
name: Coordinator
on:
  schedule:
    - cron: "0,30 * * * *"  # Every 30 minutes
  workflow_dispatch:
  pull_request:
    types: [opened, synchronize, reopened, labeled]
  workflow_run:
    workflows: ["CI"]
    types: [completed]

jobs:
  coordinate:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: write
      pull-requests: write
      issues: write

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - run: npm ci

      - uses: anomalyco/opencode/github@latest
        timeout-minutes: 15
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          model: anthropic/claude-sonnet-4-20250514
          prompt: |-
            🤖 COORDINATOR: Manage the multi-agent system

            ## Your Mission
            1. Check `.agents/signals/` for urgent blockers
            2. Check `.agents/tasks/` for unassigned ready tasks
            3. Review open PRs for CI status
            4. Auto-merge PRs that pass all checks
            5. Create signals for any issues found

            ## Auto-Merge Rules
            - PR has passing CI
            - PR has 'auto-merge' or 'ready-to-merge' label
            - PR does NOT have 'do-not-merge', 'wip', 'blocked' labels
            - PR has no merge conflicts

            ## Task Assignment
            - Match task labels to agent skills
            - Assign to available agents only
            - Respect maxConcurrentTasks limit

            ## Health Monitoring
            - Critical signals = system critical
            - Blocked agents = degraded
            - Failing PRs = degraded

            Execute coordination. Keep the system moving forward.
```

### 2. Using Programmatically

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

// Initialize (loads agents, tasks, etc.)
await coordinator.initialize();

// Run full coordination cycle
const result = await coordinator.run();

console.log(`PRs merged: ${result.prsMerged}`);
console.log(`Tasks assigned: ${result.tasksAssigned}`);
console.log(`Signals created: ${result.signalsCreated}`);
console.log(`Health: ${result.state.health}`);
```

---

## Coordination Cycle

Each coordination run follows this cycle:

### 1. Load State

```
Read current system state:
├── Tasks (.agents/tasks/*.yaml)
├── Signals (.agents/signals/*.md)
├── Agent Registry (.agents/agent-registry.yaml)
└── Open PRs (via GitHub API)
```

### 2. Analyze

```
Identify actions needed:
├── Unassigned ready tasks
├── Available agents
├── PRs ready to merge
├── Blocked agents to unblock
└── Critical signals to escalate
```

### 3. Make Decisions

```typescript
const decisions = await coordinator.makeDecisions();

// Example decisions:
// { action: 'merge_pr', target: '123', reason: 'CI passed' }
// { action: 'assign_task', target: 'task-1', context: { agentId: 'frontend' } }
// { action: 'escalate', target: 'signal-1', reason: 'Critical >1 hour' }
```

### 4. Execute

```typescript
const { executed, failed, results } = await coordinator.executeDecisions(decisions);
```

### 5. Report

```
Log results to .agents/decisions/run-{date}.md
```

---

## Decision Types

### Merge PR

```typescript
{
  action: 'merge_pr',
  target: '123',  // PR number
  reason: 'PR passed all CI checks and is ready to merge',
  priority: 'immediate'
}
```

### Assign Task

```typescript
{
  action: 'assign_task',
  target: 'implement-dashboard',  // Task ID
  reason: 'Assigning to FrontendAgent based on skills match',
  priority: 'normal',
  context: { agentId: 'frontend-agent' }
}
```

### Unblock Agent

```typescript
{
  action: 'unblock_agent',
  target: 'backend-agent',  // Agent ID
  reason: 'No active blocking signals',
  priority: 'normal'
}
```

### Escalate

```typescript
{
  action: 'escalate',
  target: 'Security Vulnerability',  // Signal title
  reason: 'Critical signal unresolved for over 1 hour',
  priority: 'immediate',
  context: { signalType: 'URGENT', to: 'SecurityAgent' }
}
```

---

## System State

### Getting Current State

```typescript
const state = await coordinator.getState();

console.log(state);
// {
//   timestamp: '2026-01-21T12:00:00Z',
//   totalAgents: 5,
//   activeAgents: 4,
//   blockedAgents: 1,
//   totalTasks: 25,
//   openTasks: 10,
//   inProgressTasks: 5,
//   blockedTasks: 2,
//   completedTasks: 8,
//   openPRs: 3,
//   pendingCIPRs: 1,
//   readyToMergePRs: 2,
//   activeSignals: 3,
//   criticalSignals: 1,
//   health: 'degraded',
//   blockers: ['1 critical signals', '1 blocked agents']
// }
```

### Health Status

| Status | Meaning | Condition |
|--------|---------|-----------|
| `healthy` | Normal operation | No blockers |
| `degraded` | Issues present | Blocked agents/tasks, failing PRs |
| `critical` | Urgent attention needed | Critical signals or tasks |

---

## Health Checks

### Running Health Check

```typescript
const health = await coordinator.healthCheck();

console.log(health);
// {
//   status: 'degraded',
//   components: [
//     { name: 'Tasks', status: 'healthy' },
//     { name: 'Agents', status: 'degraded', message: '1 blocked agents' },
//     { name: 'Signals', status: 'healthy' },
//     { name: 'PRs', status: 'healthy', message: '2 PRs ready to merge' }
//   ],
//   timestamp: '2026-01-21T12:00:00Z',
//   recommendations: ['Unblock blocked agents']
// }
```

### Component Health

**Tasks:**
- `critical` - Critical priority tasks pending
- `degraded` - Blocked tasks present
- `healthy` - Normal operation

**Agents:**
- `degraded` - Blocked agents present
- `degraded` - Overloaded agents
- `healthy` - All agents available

**Signals:**
- `critical` - Critical signals active
- `degraded` - Many active signals (>5)
- `healthy` - Few or no signals

**PRs:**
- `degraded` - Failing PRs present
- `healthy` - Normal operation

---

## Accessing Components

The Coordinator provides access to all managers:

```typescript
// Task Manager
const tasks = coordinator.getTasks();
await tasks.create({ ... });

// Agent Registry
const agents = coordinator.getAgents();
const available = agents.getAvailable();

// Signal Manager
const signals = coordinator.getSignals();
await signals.createUrgent(...);

// PR Manager
const prs = coordinator.getPRs();
await prs.autoMergeReady();

// Workflow Manager
const workflows = coordinator.getWorkflows();
await workflows.trigger('agent.yml');
```

---

## Configuration

### Full Configuration

```typescript
import { Coordinator, CoordinatorConfig } from '@monkeytown/agent-framework';

const config: CoordinatorConfig = {
  // Repository
  owner: 'your-org',
  repo: 'your-repo',
  baseBranch: 'main',
  
  // Metadata
  metadataBranch: 'agent-metadata',
  metadataPath: '.agents',
  
  // Agent limits
  maxAgents: 12,
  
  // Auto-merge
  autoMerge: {
    enabled: true,
    requiredChecks: ['lint', 'test', 'build'],
    deleteBranchAfterMerge: true,
    mergeMethod: 'squash',
    blockedLabels: ['do-not-merge', 'wip'],
    autoMergeLabels: ['auto-merge']
  },
  
  // Schedule (for reference)
  schedule: '0,30 * * * *'
};

const coordinator = new Coordinator(config, process.env.GITHUB_TOKEN!);
```

### Using Helper Function

```typescript
import { createCoordinator } from '@monkeytown/agent-framework';

const coordinator = createCoordinator({
  owner: 'your-org',
  repo: 'your-repo',
  githubToken: process.env.GITHUB_TOKEN!,
  // All other options have sensible defaults
});
```

---

## Coordinator Frequency

### Recommended Schedule

| Frequency | Use Case |
|-----------|----------|
| Every 15 minutes | High activity, many agents |
| Every 30 minutes | Normal activity (recommended) |
| Every hour | Low activity, few agents |
| On events only | Manual coordination |

### Event-Based Triggers

The coordinator also runs on:
- PR opened/updated
- PR labeled
- CI workflow completed

---

## Logging and Debugging

### Run Logs

Each coordination run creates a log file:

`.agents/decisions/run-2026-01-21.md`:

```markdown
# Coordination Run: 2026-01-21T12:00:00Z

## Summary
- Duration: 2500ms
- Actions Executed: 5
- Actions Failed: 0
- PRs Merged: 2
- Tasks Assigned: 3

## Decisions Made

### Merge PR #123
- Reason: PR passed all CI checks
- Result: ✅ Success

### Assign Task: implement-dashboard
- Agent: FrontendAgent
- Reason: Skills match
- Result: ✅ Success

## System State
- Health: healthy
- Open Tasks: 7
- Active Agents: 4
- Open PRs: 1
```

### Debug Mode

For troubleshooting, examine:

```typescript
// Get current decisions without executing
const decisions = await coordinator.makeDecisions();
console.log(JSON.stringify(decisions, null, 2));

// Get full state
const state = await coordinator.getState();
console.log(JSON.stringify(state, null, 2));
```

---

## Best Practices

### Frequency

- Run every 30 minutes for normal workloads
- Run on PR events for faster auto-merge
- Don't run too frequently (rate limits)

### Escalation

- Escalate critical signals after 1 hour
- Escalate blocked agents after 2 hours
- Notify humans for repeated failures

### Monitoring

- Watch the health status
- Review run logs regularly
- Set up alerts for critical status

---

## Next Steps

- [Monitoring Guide](./monitoring.md)
- [Auto-Merge Guide](./auto-merge.md)
- [Troubleshooting Guide](../troubleshooting.md)
