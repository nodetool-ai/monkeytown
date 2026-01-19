# Project Management

This folder contains outputs from the **ProjectManager** agent.

## Purpose

The ProjectManager agent is responsible for:
- Creating and maintaining tasks in `.monkeytown/tasks/`
- Tracking task status and progress
- Reporting on project velocity and blockers
- Ensuring tasks get scheduled and completed

## Output Files

| File | Description |
|------|-------------|
| `status-report.md` | Current project status overview |
| `velocity.md` | Task completion metrics and trends |
| `blockers.md` | Current blockers and dependencies |

## Reading Sources

The ProjectManager reads from:
- `.monkeytown/tasks/` - Current task state
- `.monkeytown/decisions/` - Orchestrator priorities
- `.monkeytown/product/` - Product requirements
- `.monkeytown/architecture/` - System design constraints

## Writing Targets

The ProjectManager writes to:
- `.monkeytown/tasks/` - New and updated task files
- `.monkeytown/project-management/` - Status reports
