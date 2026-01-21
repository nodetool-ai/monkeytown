# Architecture Overview

This guide explains how the Agent Framework works internally and how the components interact.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GitHub Repository                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐          │
│  │ Coordinator │     │   Agent 1   │     │   Agent 2   │          │
│  │  Workflow   │     │  Workflow   │     │  Workflow   │   ...    │
│  └──────┬──────┘     └──────┬──────┘     └──────┬──────┘          │
│         │                   │                   │                  │
│         ▼                   ▼                   ▼                  │
│  ┌─────────────────────────────────────────────────────────┐       │
│  │                    .agents/                             │       │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────┐  │       │
│  │  │  tasks/  │  │ signals/ │  │decisions/│  │registry│  │       │
│  │  │ *.yaml   │  │  *.md    │  │  *.md    │  │ .yaml  │  │       │
│  │  └──────────┘  └──────────┘  └──────────┘  └────────┘  │       │
│  └─────────────────────────────────────────────────────────┘       │
│                                                                     │
│  ┌─────────────┐     ┌─────────────┐                              │
│  │ Auto-Merge  │     │   CI/CD     │                              │
│  │  Workflow   │────▶│  Pipeline   │                              │
│  └─────────────┘     └─────────────┘                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Coordinator

The Coordinator is the central orchestrator that:

- **Schedules tasks** to available agents
- **Monitors PRs** for CI status
- **Auto-merges** PRs when ready
- **Creates signals** for blockers
- **Maintains health** metrics

```typescript
import { Coordinator } from '@monkeytown/agent-framework';

const coordinator = new Coordinator(config, githubToken);
await coordinator.initialize();

// Run coordination cycle
const result = await coordinator.run();
// result.prsMerged, result.tasksAssigned, etc.
```

### 2. TaskManager

Manages YAML task files:

```typescript
import { TaskManager } from '@monkeytown/agent-framework';

const tasks = new TaskManager('.agents/tasks');

// Task lifecycle
await tasks.create({ id, title, description, priority });
await tasks.start(id, assignee);
await tasks.complete(id, notes);
```

**Task File Structure:**
```
.agents/tasks/
├── critical-fix-security.yaml
├── high-implement-feature.yaml
├── medium-refactor-code.yaml
└── low-update-docs.yaml
```

### 3. AgentRegistry

Tracks registered agents:

```typescript
import { AgentRegistry } from '@monkeytown/agent-framework';

const registry = new AgentRegistry({ maxAgents: 12, metadataPath: '.agents' });
await registry.load();

// Find available agents
const available = registry.getAvailable();
const best = registry.findBestForTask(['react', 'typescript']);
```

**Registry File:**
```yaml
# .agents/agent-registry.yaml
version: "1.0"
agents:
  - id: frontend-agent
    name: FrontendAgent
    role: builder
    skills: [react, typescript]
    status: active
```

### 4. SignalManager

Handles urgent inter-agent communication:

```typescript
import { SignalManager } from '@monkeytown/agent-framework';

const signals = new SignalManager('.agents/signals');

// Create urgent signal
await signals.createUrgent(from, to, title, issue, actionRequired);

// Create handoff
await signals.createHandoff(from, to, title, issue, actionRequired);

// Get signals for an agent
const mySignals = await signals.getForAgent('FrontendAgent');
```

### 5. PRManager

Monitors and manages pull requests:

```typescript
import { PRManager } from '@monkeytown/agent-framework';

const prManager = new PRManager(octokit, owner, repo, {
  enabled: true,
  requiredChecks: ['CI'],
  mergeMethod: 'squash'
});

// Auto-merge ready PRs
const results = await prManager.autoMergeReady();
```

### 6. WorkflowManager

Controls GitHub Actions workflows:

```typescript
import { WorkflowManager } from '@monkeytown/agent-framework';

const workflows = new WorkflowManager(octokit, owner, repo);

// Trigger a workflow
await workflows.trigger('agent.yml', 'main');

// Check recent runs
const runs = await workflows.getRecentRuns();
```

---

## Data Flow

### 1. Task Assignment Flow

```
Human creates task → Task file in .agents/tasks/
                          ↓
Coordinator picks up → Checks agent availability
                          ↓
Assigns to agent → Updates task file (assignee)
                          ↓
Agent picks up → Updates status to 'in_progress'
                          ↓
Agent completes → Creates PR, updates task
                          ↓
CI passes → Auto-merge merges PR
                          ↓
Coordinator → Marks task 'completed'
```

### 2. Signal Flow

```
Agent A encounters blocker → Creates URGENT signal
                                  ↓
Coordinator detects → Alerts target agent
                                  ↓
Target agent → Reads signal, takes action
                                  ↓
Issue resolved → Signal deleted/resolved
```

### 3. Auto-Merge Flow

```
Agent creates PR → Adds 'auto-merge' label
                       ↓
CI runs → Tests, lint, build
                       ↓
CI passes → Auto-merge workflow triggers
                       ↓
Checks pass → PR merged, branch deleted
```

---

## File-Based Communication

All agent communication happens through files in the `.agents/` directory:

| Directory | Purpose | File Type |
|-----------|---------|-----------|
| `tasks/` | Work items | YAML |
| `signals/` | Urgent messages | Markdown |
| `decisions/` | Run logs | Markdown |
| `agent-registry.yaml` | Agent config | YAML |

### Why Files?

1. **Auditable** - Git history shows all changes
2. **Async** - Agents don't need to run simultaneously
3. **Simple** - No database or message queue needed
4. **Portable** - Works in any Git repository

---

## Coordination Cycle

The Coordinator runs this cycle every 30 minutes:

```
1. Load state
   └── Read tasks, signals, agents, PRs

2. Analyze
   └── Find ready tasks, available agents, mergeable PRs

3. Make decisions
   ├── Assign unassigned tasks
   ├── Merge ready PRs
   ├── Create escalation signals
   └── Unblock stuck agents

4. Execute
   ├── Update task files
   ├── Merge PRs via GitHub API
   ├── Create signal files
   └── Update agent registry

5. Log
   └── Write run summary to decisions/
```

---

## Agent Lifecycle

```
┌─────────────┐
│   active    │◄───── Register
└──────┬──────┘
       │
       ▼ (assigned task)
┌─────────────┐
│   running   │
└──────┬──────┘
       │
       ▼ (task complete)
┌─────────────┐
│   active    │
└──────┬──────┘
       │
       ▼ (encounters blocker)
┌─────────────┐
│   blocked   │
└──────┬──────┘
       │
       ▼ (blocker resolved)
┌─────────────┐
│   active    │
└─────────────┘
```

---

## Task Lifecycle

```
┌──────────┐
│   open   │◄───── Created
└────┬─────┘
     │
     ▼ (agent starts)
┌──────────────┐
│ in_progress  │
└────┬─────────┘
     │
     ├──────────────────┐
     ▼                  ▼ (encounters blocker)
┌──────────────┐  ┌──────────┐
│  completed   │  │ blocked  │
└──────────────┘  └────┬─────┘
                       │
                       ▼ (blocker resolved)
                  ┌──────────────┐
                  │ in_progress  │
                  └──────────────┘
```

---

## Priority System

Tasks are processed in strict priority order:

| Priority | Behavior |
|----------|----------|
| `critical` | Stop everything, fix immediately |
| `high` | Next in queue after critical |
| `medium` | Standard work items |
| `low` | When capacity allows |

Agents check for critical tasks first, then high, then medium, then low.

---

## Dependency Resolution

Tasks can depend on other tasks:

```yaml
id: implement-frontend
dependencies:
  - implement-api  # This must complete first
```

The framework:
1. Tracks dependency completion
2. Only assigns tasks when dependencies are met
3. Prevents circular dependencies
4. Reports blocked status when dependencies fail

---

## Health Monitoring

The framework provides health checks:

```typescript
const health = await coordinator.healthCheck();

// health.status: 'healthy' | 'degraded' | 'critical'
// health.components: [{ name, status, message }]
// health.recommendations: ['Fix X', 'Address Y']
```

**Health Indicators:**
- Task queue depth
- Blocked tasks/agents
- Critical signals
- Failing PRs
- Agent availability

---

## Scaling Considerations

### Recommended Limits

| Resource | Recommended Max | Why |
|----------|-----------------|-----|
| Agents | 12 | Coordination overhead |
| Concurrent PRs | 10 | CI resource limits |
| Task queue | 50 | Review capacity |
| Signals | 5 active | Attention limits |

### Rate Limiting

- Stagger agent schedules (15-minute offsets)
- Use separate API keys per agent
- Implement exponential backoff
- Monitor LLM provider limits

---

## Next Steps

- [Task Management Guide](./task-management.md)
- [Agent Configuration Guide](./agent-configuration.md)
- [Monitoring Guide](./monitoring.md)
