# Example: Simple Todo App

A minimal example with 2 agents managing a simple todo application.

## Overview

This example sets up:
- **BuilderAgent** - Implements features and fixes bugs
- **Coordinator** - Manages tasks and auto-merges PRs

## Project Structure

```
todo-app/
├── .agents/
│   ├── tasks/
│   │   └── README.md
│   ├── signals/
│   │   └── README.md
│   └── agent-registry.yaml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── coordinator.yml
│       ├── auto-merge.yml
│       └── builder.yml
├── src/
│   ├── index.ts
│   └── todo.ts
├── package.json
└── tsconfig.json
```

---

## Step 1: Set Up Agent Directory

```bash
mkdir -p .agents/tasks .agents/signals
```

### Agent Registry

`.agents/agent-registry.yaml`:

```yaml
version: "1.0"
updated: 2026-01-21T00:00:00Z
agents:
  - id: builder
    name: BuilderAgent
    role: builder
    description: Implements todo app features and fixes bugs
    status: active
    skills:
      - typescript
      - node
      - testing
    domains:
      - .agents/
    outputFolders:
      - /src
    maxConcurrentTasks: 1
    assignedTasks: []
    workflowFile: builder.yml
```

---

## Step 2: Create Workflows

### CI Workflow

`.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm test
      - run: npm run build
```

### Coordinator Workflow

`.github/workflows/coordinator.yml`:

```yaml
name: Coordinator
on:
  schedule:
    - cron: "0,30 * * * *"
  workflow_dispatch:
  pull_request:
    types: [labeled]
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
        timeout-minutes: 10
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          model: anthropic/claude-sonnet-4-20250514
          prompt: |-
            🤖 COORDINATOR for Todo App
            
            1. Check .agents/signals/ for blockers
            2. Check .agents/tasks/ for status
            3. Check open PRs - merge if CI passes and has 'auto-merge' label
            
            Auto-merge rules:
            - CI must be passing
            - Must have 'auto-merge' label
            - Must not have 'do-not-merge' label
```

### Auto-Merge Workflow

`.github/workflows/auto-merge.yml`:

```yaml
name: Auto-Merge
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]

jobs:
  merge:
    runs-on: ubuntu-latest
    if: github.event.workflow_run.conclusion == 'success'
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/github-script@v7
        with:
          script: |
            const { owner, repo } = context.repo;
            const { data: prs } = await github.rest.pulls.list({
              owner, repo, state: 'open'
            });
            
            for (const pr of prs) {
              if (!pr.labels.some(l => l.name === 'auto-merge')) continue;
              if (pr.labels.some(l => l.name === 'do-not-merge')) continue;
              
              const { data: checks } = await github.rest.checks.listForRef({
                owner, repo, ref: pr.head.sha
              });
              
              const allPass = checks.check_runs.every(c => 
                c.conclusion === 'success' || c.conclusion === 'skipped'
              );
              
              if (allPass) {
                console.log(`Merging PR #${pr.number}`);
                await github.rest.pulls.merge({
                  owner, repo, pull_number: pr.number
                });
              }
            }
```

### Builder Agent Workflow

`.github/workflows/builder.yml`:

```yaml
name: BuilderAgent
on:
  schedule:
    - cron: "0 */4 * * *"  # Every 4 hours
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: write
      pull-requests: write

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
            🔧 BuilderAgent for Todo App
            
            ## Check First
            1. .agents/signals/ for urgent issues
            2. .agents/tasks/critical-*.yaml assigned to BuilderAgent
            3. .agents/tasks/high-*.yaml assigned to BuilderAgent
            
            ## Your Job
            - Pick highest priority task assigned to you
            - Update task status to 'in_progress'
            - Implement the change in /src
            - Write tests
            - Run npm test
            - If tests pass, create PR with 'auto-merge' label
            - Update task status to 'completed'
            
            ## Output: /src
```

---

## Step 3: Create Initial Tasks

### Add Todo Feature

`.agents/tasks/high-add-todo.yaml`:

```yaml
id: add-todo
title: "Implement addTodo function"
description: |
  Create a function to add a new todo item.
  
  ## Acceptance Criteria
  - Function: addTodo(text: string): Todo
  - Returns new todo with id, text, completed: false
  - Adds to internal array
  
  ## Technical Notes
  - File: src/todo.ts
  - Test file: src/todo.test.ts
status: open
priority: high
assignee: BuilderAgent
dependencies: []
labels:
  - feature
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
```

### Complete Todo Feature

`.agents/tasks/high-complete-todo.yaml`:

```yaml
id: complete-todo
title: "Implement completeTodo function"
description: |
  Create a function to mark a todo as complete.
  
  ## Acceptance Criteria
  - Function: completeTodo(id: number): boolean
  - Sets completed: true for the todo
  - Returns true if found, false if not
  
  ## Technical Notes
  - File: src/todo.ts
status: open
priority: high
assignee: BuilderAgent
dependencies:
  - add-todo  # Must complete add-todo first
labels:
  - feature
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
```

---

## Step 4: Create Starter Code

### package.json

```json
{
  "name": "todo-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "tsc",
    "test": "vitest run"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "vitest": "^1.2.0"
  }
}
```

### src/todo.ts

```typescript
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Todo: Implement addTodo
// Todo: Implement completeTodo
```

### src/todo.test.ts

```typescript
import { describe, it, expect } from 'vitest';

describe('Todo', () => {
  it('placeholder test', () => {
    expect(true).toBe(true);
  });
});
```

---

## Step 5: Configure Secrets

In GitHub repository settings:

1. Go to Settings → Secrets → Actions
2. Add `ANTHROPIC_API_KEY` with your API key

---

## Expected Flow

1. **BuilderAgent runs** (every 4 hours or manual trigger)
   - Finds `add-todo` task (high priority, no dependencies)
   - Updates status to `in_progress`
   - Implements `addTodo` function
   - Adds tests
   - Creates PR with `auto-merge` label
   - Updates status to `completed`

2. **CI runs** on the PR
   - Runs tests
   - Builds TypeScript

3. **Auto-merge triggers** when CI passes
   - Merges the PR

4. **BuilderAgent runs again**
   - Finds `complete-todo` task (dependency met)
   - Implements `completeTodo` function
   - Creates PR, auto-merges

---

## Monitoring

### Check Task Status

```bash
cat .agents/tasks/high-add-todo.yaml | grep status
# status: completed
```

### Check Agent Activity

```bash
gh run list --workflow=builder.yml
```

### Check PRs

```bash
gh pr list
gh pr view <number>
```

---

## Troubleshooting

### Agent not running
- Check Actions tab → builder.yml workflow → Enable

### Tests failing
- Review PR checks
- Fix locally and push

### PR not merging
- Check has `auto-merge` label
- Check CI is passing
- Check no merge conflicts

---

## Next Steps

- Add more agents (Frontend, Testing)
- Add more tasks
- Set up monitoring
- See [Full-Stack Example](./fullstack-app.md) for a larger setup
