# Quick Start Guide

Get a multi-agent system running in your repository in under 5 minutes.

## Prerequisites

- Node.js 20+
- A GitHub repository
- GitHub Actions enabled
- An LLM API key (OpenAI, Anthropic, or compatible)

## Step 1: Install the Framework

```bash
npm install @monkeytown/agent-framework
```

## Step 2: Create the Directory Structure

```bash
# Create agent metadata directories
mkdir -p .agents/tasks .agents/signals .agents/decisions

# Create README files
echo "# Tasks\n\nTask files live here. Named: {priority}-{action}-{description}.yaml" > .agents/tasks/README.md
echo "# Signals\n\nUrgent inter-agent signals. Named: {TYPE}-{description}.md" > .agents/signals/README.md
```

## Step 3: Add Workflow Templates

Copy the workflow templates to your `.github/workflows/` directory:

```bash
# Coordinator - runs every 30 minutes to coordinate agents
cp node_modules/@monkeytown/agent-framework/templates/coordinator.yml .github/workflows/

# Auto-merge - automatically merges PRs when CI passes
cp node_modules/@monkeytown/agent-framework/templates/auto-merge.yml .github/workflows/
```

## Step 4: Create Your First Agent

Copy and customize the agent template:

```bash
cp node_modules/@monkeytown/agent-framework/templates/agent.yml .github/workflows/builder.yml
```

Edit `.github/workflows/builder.yml`:

```yaml
name: BuilderAgent
on:
  schedule:
    - cron: "0 */6 * * *"  # Run every 6 hours
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
            🔧 BuilderAgent: Implement code changes

            ## IMMEDIATE ACTIONS
            1. Check `.agents/signals/URGENT-*.md` for critical issues
            2. Check `.agents/tasks/critical-*.yaml` assigned to BuilderAgent
            3. Check `.agents/tasks/high-*.yaml` assigned to BuilderAgent

            ## Your Responsibilities
            - Implement features and fix bugs
            - Write tests for changes
            - Create PRs with 'auto-merge' label

            ## Workflow
            1. FIND highest-priority open task assigned to you
            2. START - Update task status to 'in_progress'
            3. CODE - Implement the solution
            4. TEST - Run tests, verify it works
            5. COMPLETE - Update task status to 'completed'
            6. SIGNAL - Create handoff if others need to know

            Work on ONE task at a time. Prioritize: critical > high > medium > low
```

## Step 5: Configure Secrets

In your GitHub repository settings, add:

- `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` - Your LLM provider API key

## Step 6: Create Your First Task

Create `.agents/tasks/high-hello-world.yaml`:

```yaml
id: hello-world
title: "Create Hello World Feature"
description: |
  Add a simple hello world function to test the agent system.
  
  Acceptance criteria:
  - Create src/hello.ts with a greet() function
  - Add tests in src/hello.test.ts
  - Export from index.ts
status: open
priority: high
assignee: BuilderAgent
dependencies: []
labels:
  - feature
  - test
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
```

## Step 7: Trigger the Agent

You can either:

1. Wait for the scheduled run (every 6 hours)
2. Manually trigger from GitHub Actions:
   - Go to Actions → BuilderAgent → Run workflow

## Step 8: Monitor Progress

Watch your agent:

1. Check the GitHub Actions logs for the BuilderAgent workflow
2. Look for PRs created by the agent
3. Check `.agents/tasks/high-hello-world.yaml` for status updates
4. Review `.agents/signals/` for any handoff signals

## What Happens Next

1. **BuilderAgent** picks up the task and starts working
2. It updates the task status to `in_progress`
3. It creates a PR with the implementation
4. It adds the `auto-merge` label to the PR
5. When CI passes, **Auto-Merge** workflow merges the PR
6. BuilderAgent marks the task as `completed`

---

## Next Steps

- [Repository Setup Guide](./repository-setup.md) - Complete configuration
- [Agent Configuration](./agent-configuration.md) - Create specialized agents
- [Task Management](./task-management.md) - Learn the task system

---

## Troubleshooting

### Agent doesn't pick up tasks
- Check that `assignee` in the task matches the agent name
- Verify the agent workflow is enabled
- Check the GitHub Actions logs for errors

### PRs not auto-merging
- Ensure the PR has `auto-merge` or `ready-to-merge` label
- Check that all CI checks are passing
- Verify the auto-merge workflow is enabled

### LLM API errors
- Verify your API key is correctly set in secrets
- Check rate limits on your LLM provider
- Try reducing the timeout or simplifying the prompt
