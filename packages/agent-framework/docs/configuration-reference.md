# Configuration Reference

All configuration options for the Agent Framework.

---

## Coordinator Configuration

```typescript
interface CoordinatorConfig {
  // Repository
  owner: string;           // GitHub username or org
  repo: string;            // Repository name
  baseBranch: string;      // Target branch (default: 'main')
  
  // Metadata
  metadataBranch: string;  // Branch for agent data (default: 'agent-metadata')
  metadataPath: string;    // Path to .agents directory (default: '.agents')
  
  // Limits
  maxAgents: number;       // Maximum agents allowed (default: 12)
  
  // Auto-merge
  autoMerge: AutoMergeConfig;
  
  // Schedule (optional, for reference)
  schedule?: string;       // Cron expression
}
```

### Example

```typescript
const config: CoordinatorConfig = {
  owner: 'acme-corp',
  repo: 'my-app',
  baseBranch: 'main',
  metadataBranch: 'agent-metadata',
  metadataPath: '.agents',
  maxAgents: 8,
  autoMerge: {
    enabled: true,
    requiredChecks: ['CI'],
    mergeMethod: 'squash',
    deleteBranchAfterMerge: true,
    blockedLabels: ['wip'],
    autoMergeLabels: ['auto-merge']
  }
};
```

---

## Auto-Merge Configuration

```typescript
interface AutoMergeConfig {
  // Enable/disable auto-merge globally
  enabled: boolean;
  
  // CI check names that must pass (exact match)
  requiredChecks: string[];
  
  // Delete source branch after merge
  deleteBranchAfterMerge: boolean;
  
  // How to merge PRs
  mergeMethod: 'merge' | 'squash' | 'rebase';
  
  // Labels that prevent auto-merge
  blockedLabels: string[];
  
  // Labels that enable auto-merge
  autoMergeLabels: string[];
}
```

### Defaults

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

### Merge Methods

| Method | Description | Use Case |
|--------|-------------|----------|
| `squash` | Combines all commits into one | Feature branches, clean history |
| `merge` | Creates merge commit | Preserve commit history |
| `rebase` | Rebases commits onto base | Linear history |

---

## Agent Registry Configuration

```typescript
interface AgentRegistryConfig {
  // Maximum agents allowed
  maxAgents: number;
  
  // Path to metadata directory
  metadataPath: string;
}
```

### Example

```typescript
const registryConfig: AgentRegistryConfig = {
  maxAgents: 12,
  metadataPath: '.agents'
};
```

---

## Agent Configuration

Agent configuration in `agent-registry.yaml`:

```yaml
agents:
  - id: frontend-agent           # Unique identifier (kebab-case)
    name: FrontendAgent          # Display name (PascalCase)
    role: builder                # Agent role
    description: "Builds UI"     # What this agent does
    status: active               # Current status
    schedule: "0 */6 * * *"      # Cron schedule (optional)
    skills:                      # Capabilities for task matching
      - react
      - typescript
    domains:                     # Folders agent reads from
      - .agents/ux
    outputFolders:              # Folders agent writes to
      - /src/components
    maxConcurrentTasks: 1        # Max simultaneous tasks
    assignedTasks: []            # Currently assigned tasks
    workflowFile: frontend.yml   # GitHub workflow file
```

### Agent Roles

| Role | Description |
|------|-------------|
| `coordinator` | Orchestrates other agents |
| `builder` | Implements code |
| `architect` | Designs systems |
| `researcher` | Gathers information |
| `designer` | Creates UX/UI designs |
| `security` | Security analysis |
| `qa` | Quality assurance |
| `product` | Product management |
| `custom` | Custom role |

### Agent Status

| Status | Meaning |
|--------|---------|
| `active` | Available for work |
| `running` | Currently working |
| `blocked` | Cannot proceed |
| `inactive` | Disabled |

---

## Task Configuration

Task YAML file schema:

```yaml
# Required fields
id: unique-task-id              # Unique identifier (kebab-case)
title: "Task Title"             # Short title (< 60 chars)
description: |                  # Detailed description (markdown)
  Full description here.
  
  ## Acceptance Criteria
  - Criterion 1
status: open                    # Current status
priority: high                  # Priority level

# Optional fields
assignee: AgentName             # Assigned agent
dependencies:                   # Tasks that must complete first
  - other-task-id
labels:                         # Categorization
  - feature
  - frontend
created: 2026-01-21T00:00:00Z   # Creation timestamp
updated: 2026-01-21T00:00:00Z   # Last update timestamp
due: 2026-01-28T00:00:00Z       # Due date
outputFolder: /src/components   # Where to put deliverables
notes: |                        # Completion notes
  Notes about completion.
branch: feature/task-id         # Working branch
pullRequestNumber: 123          # Associated PR
```

### Task Priority

| Priority | Meaning | Expected Action |
|----------|---------|-----------------|
| `critical` | Emergency | Drop everything |
| `high` | Important | Complete soon |
| `medium` | Standard | Normal queue |
| `low` | Nice to have | When available |

### Task Status

| Status | Meaning |
|--------|---------|
| `open` | Ready to start |
| `in_progress` | Being worked on |
| `blocked` | Cannot proceed |
| `completed` | Finished |
| `cancelled` | Will not do |

---

## Signal Configuration

Signal markdown format:

```markdown
# {TYPE}: Title

**From:** SenderAgent
**To:** ReceiverAgent (or "All")
**Priority:** CRITICAL | HIGH | MEDIUM
**Created:** YYYY-MM-DD
**Status:** active | resolved

## Issue

Description of the issue.

## Action Required

What needs to be done.

## Blocks (optional)

- Thing 1
- Thing 2

## Resolution (when resolved)

How it was resolved.

**Resolved At:** YYYY-MM-DDTHH:MM:SSZ
```

### Signal Types

| Type | When to Use |
|------|-------------|
| `URGENT` | Critical issues needing immediate attention |
| `BLOCKED` | Work cannot proceed |
| `HANDOFF` | Work ready for another agent |

### Signal Priority

| Priority | Meaning |
|----------|---------|
| `CRITICAL` | Drop everything |
| `HIGH` | Handle soon |
| `MEDIUM` | When current work done |

---

## Workflow Configuration

### Coordinator Workflow

```yaml
name: Coordinator
on:
  schedule:
    - cron: "0,30 * * * *"     # Every 30 minutes
  workflow_dispatch:            # Manual trigger
  pull_request:
    types: [opened, synchronize, labeled]
  workflow_run:
    workflows: ["CI"]           # Your CI workflow name
    types: [completed]

jobs:
  coordinate:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: write
      pull-requests: write
      issues: write
```

### Agent Workflow

```yaml
name: AgentName
on:
  schedule:
    - cron: "0 */6 * * *"      # Every 6 hours
  workflow_dispatch:            # Manual trigger

jobs:
  agent:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: write
      pull-requests: write
      issues: write
```

### Schedule Examples

| Schedule | Cron | Description |
|----------|------|-------------|
| Every 30 min | `0,30 * * * *` | High activity |
| Every hour | `0 * * * *` | Standard |
| Every 4 hours | `0 */4 * * *` | Low activity |
| Every 6 hours | `0 */6 * * *` | Normal agents |
| 4x daily | `0 0,6,12,18 * * *` | Specific times |
| Daily | `0 0 * * *` | Once per day |

### Staggered Schedules

To avoid conflicts:

```yaml
# Agent 1: Hour:00
- cron: "0 */6 * * *"

# Agent 2: Hour:10
- cron: "10 */6 * * *"

# Agent 3: Hour:20
- cron: "20 */6 * * *"

# Agent 4: Hour:30
- cron: "30 */6 * * *"
```

---

## Environment Variables

### Required

| Variable | Description |
|----------|-------------|
| `GITHUB_TOKEN` | GitHub token (auto-provided) |
| `ANTHROPIC_API_KEY` | Anthropic API key (if using Claude) |
| `OPENAI_API_KEY` | OpenAI API key (if using GPT) |

### Usage in Workflow

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
```

---

## Directory Structure

```
.agents/
├── agent-registry.yaml    # Agent configuration
├── tasks/
│   ├── README.md
│   ├── critical-*.yaml    # Critical tasks
│   ├── high-*.yaml        # High priority
│   ├── medium-*.yaml      # Medium priority
│   └── low-*.yaml         # Low priority
├── signals/
│   ├── README.md
│   ├── URGENT-*.md        # Urgent signals
│   ├── BLOCKED-*.md       # Blocked signals
│   └── HANDOFF-*.md       # Handoff signals
└── decisions/
    ├── state.md           # Current state
    └── run-*.md           # Coordination logs

.github/workflows/
├── ci.yml                 # CI pipeline
├── coordinator.yml        # Coordinator
├── auto-merge.yml         # Auto-merge
└── {agent-name}.yml       # Agent workflows
```

---

## Limits and Recommendations

### Recommended Limits

| Resource | Minimum | Recommended | Maximum |
|----------|---------|-------------|---------|
| Agents | 2 | 4-8 | 12 |
| Open tasks | 0 | 10-20 | 50 |
| Active signals | 0 | 0-2 | 5 |
| Concurrent PRs | 0 | 3-5 | 10 |
| Coordinator frequency | 1h | 30min | 15min |

### Why These Limits?

- **Agents:** Coordination overhead increases with count
- **Tasks:** Too many = hard to prioritize
- **Signals:** Should be exceptional, not routine
- **PRs:** CI resources are limited
- **Frequency:** API rate limits

---

## Performance Tuning

### Reduce Coordinator Load

```typescript
// Only check when needed
autoMerge: {
  requiredChecks: ['CI'],  // Fewer checks = faster
}
```

### Faster Auto-Merge

```yaml
# Trigger on CI completion
workflow_run:
  workflows: ["CI"]
  types: [completed]
```

### Reduce API Calls

```yaml
# Less frequent schedule
schedule:
  - cron: "0 * * * *"  # Hourly instead of every 30 min
```
