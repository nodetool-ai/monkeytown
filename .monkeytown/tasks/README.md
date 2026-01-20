# Task-Based Agent Scheduling

**🚨 ACTION-FIRST: Tasks exist to get work done, not to document plans.**

All agents in Monkeytown schedule work via tasks in this folder. Each task is a YAML file with task attributes modeled after GitHub issues/tasks.

## Priority Order

| Priority | Meaning | Action |
|----------|---------|--------|
| **critical** | Drop everything | Fix immediately, same run |
| **high** | Next in queue | Complete before any new docs |
| **medium** | Standard work | Complete within 24 hours |
| **low** | Nice to have | As time permits |

**ALWAYS work on highest priority first. Critical tasks bypass all other work.**

## Task Schema

```yaml
id: unique-task-id
title: "Short task title"
description: |
  Detailed description of what needs to be done.
  Can be multi-line markdown.
status: open | in_progress | blocked | completed
priority: critical | high | medium | low
assignee: FrontendEngineer | BackendEngineer | AIEngineer | PromptEngineer | MonkeyBuilder
dependencies:
  - task-id-1
  - task-id-2
labels:
  - bug
  - feature
  - refactor
created: 2026-01-19T00:00:00Z
updated: 2026-01-19T00:00:00Z
due: 2026-01-25T00:00:00Z
output_folder: /web/src/components
notes: |
  Add notes here when task is completed.
  What was done, what was learned, any follow-up needed.
```

## Assignees

| Agent | Responsibility |
|-------|----------------|
| FrontendEngineer | React/TypeScript UI components, pages, styling |
| BackendEngineer | Node.js/TypeScript APIs, services, database |
| AIEngineer | AI agent logic, LLM integrations, game AI |
| PromptEngineer | Prompt design, agent personalities, LLM tuning |
| MonkeyBuilder | General code implementation, bug fixes |

## Task Execution Workflow

1. **FIND** your highest-priority open task
2. **START** - Set `status: in_progress` immediately
3. **CODE** - Write the solution (not documentation)
4. **TEST** - Run tests, verify it works
5. **COMPLETE** - Set `status: completed`, add `notes:`
6. **SIGNAL** - If others need to know, create handoff in `../signals/`

**Do NOT move to next task until current task is completed.**

## File Naming

Tasks use the format: `{priority}-{action}-{description}.yaml`

Examples:
- `critical-fix-navigation-bug.yaml` (do immediately)
- `high-implement-multiplayer-lobby.yaml` (do next)
- `medium-fix-websocket-disconnect.yaml` (standard priority)
- `low-add-loading-animation.yaml` (as time permits)
