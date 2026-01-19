# Task-Based Agent Scheduling

All agents in Monkeytown schedule work via tasks in this folder. Each task is a YAML file with task attributes modeled after GitHub issues/tasks.

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
```

## Assignees

| Agent | Responsibility |
|-------|----------------|
| FrontendEngineer | React/TypeScript UI components, pages, styling |
| BackendEngineer | Node.js/TypeScript APIs, services, database |
| AIEngineer | AI agent logic, LLM integrations, game AI |
| PromptEngineer | Prompt design, agent personalities, LLM tuning |
| MonkeyBuilder | General code implementation |

## Task Lifecycle

1. **Created**: Any agent can create tasks in their run
2. **Assigned**: Task is assigned to appropriate engineer
3. **In Progress**: Engineer picks up task during their run
4. **Blocked**: Waiting on dependencies
5. **Completed**: Work is done, PR created

## File Naming

Tasks use the format: `{priority}-{id}.yaml`

Examples:
- `high-implement-multiplayer-lobby.yaml`
- `medium-fix-websocket-disconnect.yaml`
- `low-add-loading-animation.yaml`
