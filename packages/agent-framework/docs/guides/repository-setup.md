# Repository Setup Guide

This guide walks through setting up the Agent Framework in an existing repository with full configuration.

## Prerequisites

- Node.js 20+
- Existing repository with CI/CD
- GitHub Actions enabled
- LLM API key (OpenAI/Anthropic)

---

## Part 1: Framework Installation

### Install Dependencies

```bash
npm install @monkeytown/agent-framework
```

### Create TypeScript Configuration (Optional)

If you want to use the framework programmatically:

```bash
npm install --save-dev typescript @types/node
```

---

## Part 2: Directory Structure

### Create Agent Metadata Directory

```bash
mkdir -p .agents/{tasks,signals,decisions}
```

### Create Task README

Create `.agents/tasks/README.md`:

```markdown
# Task Management

This directory contains task files for the agent system.

## Naming Convention

Files are named: `{priority}-{action}-{description}.yaml`

Examples:
- `critical-fix-security-vuln.yaml`
- `high-implement-login.yaml`
- `medium-add-tests.yaml`
- `low-update-docs.yaml`

## Priority Levels

| Priority | Meaning | Agent Behavior |
|----------|---------|----------------|
| critical | Emergency | Drop everything, fix now |
| high | Important | Complete before medium tasks |
| medium | Standard | Normal work queue |
| low | Nice to have | When capacity allows |

## Status Values

- `open` - Ready to be picked up
- `in_progress` - Being worked on
- `blocked` - Cannot proceed (see notes)
- `completed` - Done
- `cancelled` - Will not be done

## Creating a Task

\`\`\`yaml
id: unique-task-id
title: "Short descriptive title"
description: |
  Detailed description with acceptance criteria.
  Supports markdown.
status: open
priority: high
assignee: AgentName
dependencies:
  - other-task-id
labels:
  - feature
  - frontend
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
due: 2026-01-28T00:00:00Z
\`\`\`
```

### Create Signals README

Create `.agents/signals/README.md`:

```markdown
# Signal System

Signals are for urgent inter-agent communication.

## Signal Types

| Type | When to Use | Priority |
|------|-------------|----------|
| URGENT | Critical blockers | CRITICAL/HIGH |
| BLOCKED | Cannot proceed | HIGH/MEDIUM |
| HANDOFF | Work ready for next agent | MEDIUM |

## Naming Convention

Files are named: `{TYPE}-{description}.md`

Examples:
- `URGENT-security-vulnerability.md`
- `BLOCKED-waiting-for-api.md`
- `HANDOFF-frontend-ready.md`

## Creating a Signal

\`\`\`markdown
# URGENT: Brief Description

**From:** YourAgentName
**To:** TargetAgent (or "All")
**Priority:** CRITICAL
**Created:** 2026-01-21
**Status:** active

## Issue

Describe the problem clearly.

## Action Required

Specific action the target agent should take.

## Blocks

- List of things blocked by this issue
\`\`\`

## Resolving Signals

When resolved, either:
1. Delete the file
2. Update status to `resolved` and add resolution notes
```

### Create Agent Registry

Create `.agents/agent-registry.yaml`:

```yaml
version: "1.0"
updated: 2026-01-21T00:00:00Z
agents:
  - id: coordinator
    name: Coordinator
    role: coordinator
    description: Orchestrates other agents, manages tasks, auto-merges PRs
    status: active
    skills:
      - coordination
      - scheduling
      - pr-management
    domains:
      - .agents/
    outputFolders: []
    maxConcurrentTasks: 1
    assignedTasks: []
    workflowFile: coordinator.yml
```

---

## Part 3: Workflow Configuration

### Coordinator Workflow

Create `.github/workflows/coordinator.yml`:

```yaml
name: Coordinator
on:
  schedule:
    - cron: "0,30 * * * *"  # Every 30 minutes
  workflow_dispatch:
  pull_request:
    types: [opened, synchronize, reopened, labeled]
  workflow_run:
    workflows: ["CI"]  # Your CI workflow name
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
            - PR must have passing CI
            - PR must have 'auto-merge' or 'ready-to-merge' label
            - PR must NOT have 'do-not-merge', 'wip', or 'blocked' labels
            - PR must have no merge conflicts

            ## Output
            - Merge ready PRs
            - Update task status
            - Create handoff signals
            - Log decisions to .agents/decisions/

            Execute coordination. Keep the system moving forward.
```

### Auto-Merge Workflow

Create `.github/workflows/auto-merge.yml`:

```yaml
name: Auto-Merge
on:
  check_suite:
    types: [completed]
  pull_request:
    types: [labeled, synchronize]
  workflow_run:
    workflows: ["CI"]
    types: [completed]

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const { owner, repo } = context.repo;
            
            const autoMergeLabels = ['auto-merge', 'ready-to-merge'];
            const blockedLabels = ['do-not-merge', 'wip', 'blocked'];
            
            const { data: prs } = await github.rest.pulls.list({
              owner, repo, state: 'open'
            });
            
            for (const pr of prs) {
              const hasAutoLabel = pr.labels.some(l => autoMergeLabels.includes(l.name));
              const hasBlockedLabel = pr.labels.some(l => blockedLabels.includes(l.name));
              
              if (!hasAutoLabel || hasBlockedLabel) continue;
              
              const { data: prDetails } = await github.rest.pulls.get({
                owner, repo, pull_number: pr.number
              });
              
              if (!prDetails.mergeable) continue;
              
              const { data: checks } = await github.rest.checks.listForRef({
                owner, repo, ref: pr.head.sha
              });
              
              const allPass = checks.check_runs.every(c => 
                c.conclusion === 'success' || c.conclusion === 'skipped'
              );
              const anyRunning = checks.check_runs.some(c => 
                c.status === 'in_progress' || c.status === 'queued'
              );
              
              if (!allPass || anyRunning) continue;
              
              console.log(`Merging PR #${pr.number}`);
              await github.rest.pulls.merge({
                owner, repo, pull_number: pr.number, merge_method: 'squash'
              });
              
              try {
                await github.rest.git.deleteRef({
                  owner, repo, ref: `heads/${pr.head.ref}`
                });
              } catch (e) {
                console.log(`Could not delete branch: ${e.message}`);
              }
            }
```

---

## Part 4: Add Specialized Agents

### Example: Frontend Agent

Create `.github/workflows/frontend-agent.yml`:

```yaml
name: FrontendAgent
on:
  schedule:
    - cron: "0 */6 * * *"  # Every 6 hours
  workflow_dispatch:

jobs:
  agent:
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
            🎨 FrontendAgent: Build user interfaces

            ## IMMEDIATE ACTIONS
            1. Check `.agents/signals/URGENT-*.md` for critical issues
            2. Check `.agents/tasks/critical-*.yaml` assigned to FrontendAgent
            3. Check `.agents/tasks/high-*.yaml` assigned to FrontendAgent

            ## Your Responsibilities
            - Build React/TypeScript UI components
            - Implement responsive designs
            - Write component tests
            - Ensure accessibility

            ## Domain Folders
            - /src/components/
            - /src/pages/
            - /src/styles/

            ## Workflow
            1. FIND highest-priority task assigned to you
            2. START - Update task status
            3. CODE - Implement the UI
            4. TEST - Run tests
            5. COMPLETE - Update task status
            6. SIGNAL - Handoff to BackendAgent if API needed
```

### Example: Backend Agent

Create `.github/workflows/backend-agent.yml`:

```yaml
name: BackendAgent
on:
  schedule:
    - cron: "15 */6 * * *"  # Every 6 hours, offset by 15 min
  workflow_dispatch:

jobs:
  agent:
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
            ⚙️ BackendAgent: Build APIs and services

            ## IMMEDIATE ACTIONS
            1. Check `.agents/signals/URGENT-*.md` for critical issues
            2. Check `.agents/tasks/critical-*.yaml` assigned to BackendAgent
            3. Check `.agents/tasks/high-*.yaml` assigned to BackendAgent

            ## Your Responsibilities
            - Build REST/GraphQL APIs
            - Implement business logic
            - Write API tests
            - Database migrations

            ## Domain Folders
            - /src/api/
            - /src/services/
            - /src/db/

            ## Workflow
            1. FIND highest-priority task assigned to you
            2. START - Update task status
            3. CODE - Implement the API
            4. TEST - Run tests
            5. COMPLETE - Update task status
            6. SIGNAL - Handoff to FrontendAgent when API ready
```

---

## Part 5: Register Agents

Update `.agents/agent-registry.yaml`:

```yaml
version: "1.0"
updated: 2026-01-21T00:00:00Z
agents:
  - id: coordinator
    name: Coordinator
    role: coordinator
    description: Orchestrates other agents
    status: active
    skills: [coordination, scheduling]
    domains: [.agents/]
    outputFolders: []
    maxConcurrentTasks: 1
    assignedTasks: []
    workflowFile: coordinator.yml

  - id: frontend-agent
    name: FrontendAgent
    role: builder
    description: Builds UI components
    status: active
    skills: [react, typescript, css, accessibility]
    domains: [.agents/ux]
    outputFolders: [/src/components, /src/pages]
    maxConcurrentTasks: 1
    assignedTasks: []
    workflowFile: frontend-agent.yml

  - id: backend-agent
    name: BackendAgent
    role: builder
    description: Builds APIs and services
    status: active
    skills: [node, typescript, api, database]
    domains: [.agents/api]
    outputFolders: [/src/api, /src/services]
    maxConcurrentTasks: 1
    assignedTasks: []
    workflowFile: backend-agent.yml
```

---

## Part 6: Configure Secrets

In GitHub repository settings → Secrets and variables → Actions:

| Secret Name | Description |
|-------------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key (if using Claude) |
| `OPENAI_API_KEY` | OpenAI API key (if using GPT) |

> **Note:** `GITHUB_TOKEN` is automatically provided.

---

## Part 7: Verify Setup

### Check Workflows

1. Go to Actions tab in GitHub
2. Verify all agent workflows appear
3. Manually trigger each workflow to test

### Create a Test Task

Create `.agents/tasks/high-test-setup.yaml`:

```yaml
id: test-setup
title: "Verify Agent Setup"
description: |
  Test task to verify the agent system is working.
  Agent should update status and create a simple test file.
status: open
priority: high
assignee: BackendAgent
dependencies: []
labels:
  - test
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
```

### Monitor

1. Trigger the BackendAgent workflow
2. Watch the workflow logs
3. Check for a PR being created
4. Verify auto-merge works when CI passes

---

## Checklist

- [ ] Framework installed
- [ ] `.agents/` directory created
- [ ] Task and signal READMEs created
- [ ] Agent registry created
- [ ] Coordinator workflow configured
- [ ] Auto-merge workflow configured
- [ ] At least one agent workflow created
- [ ] API key secrets configured
- [ ] Test task created and working

---

## Next Steps

- [Task Management Guide](./task-management.md) - Learn to create and manage tasks
- [Agent Configuration Guide](./agent-configuration.md) - Customize agents
- [Monitoring Guide](./monitoring.md) - Monitor system health
