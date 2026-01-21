# Task Management Guide

This guide covers everything about creating, managing, and organizing tasks for your agent system.

## Task Basics

Tasks are YAML files that define work for agents to complete.

### File Naming Convention

```
{priority}-{action}-{description}.yaml
```

Examples:
- `critical-fix-auth-bypass.yaml`
- `high-implement-user-dashboard.yaml`
- `medium-add-unit-tests.yaml`
- `low-update-readme.yaml`

### Basic Task Structure

```yaml
id: unique-task-id
title: "Short descriptive title"
description: |
  Detailed description of the work.
  
  ## Acceptance Criteria
  - Criterion 1
  - Criterion 2
  
  ## Technical Notes
  Reference implementation in /src/example.ts
status: open
priority: high
assignee: AgentName
dependencies: []
labels:
  - feature
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
```

---

## Task Fields

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier (kebab-case) |
| `title` | string | Brief title (< 60 chars) |
| `description` | string | Detailed description (markdown) |
| `status` | enum | Current status |
| `priority` | enum | Priority level |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `assignee` | string | Agent name |
| `dependencies` | string[] | Task IDs this depends on |
| `labels` | string[] | Categorization labels |
| `due` | ISO 8601 | Due date |
| `outputFolder` | string | Where to put deliverables |
| `notes` | string | Completion notes |
| `branch` | string | Working branch |
| `pullRequestNumber` | number | Associated PR |

---

## Priority Levels

### Critical
```yaml
priority: critical
```
- **Use for:** Security vulnerabilities, production outages, data loss
- **Agent behavior:** Drop everything, work on this immediately
- **Expected resolution:** Hours, not days

### High
```yaml
priority: high
```
- **Use for:** Important features, significant bugs, blocking issues
- **Agent behavior:** Complete before medium/low tasks
- **Expected resolution:** 1-3 days

### Medium
```yaml
priority: medium
```
- **Use for:** Standard features, non-critical bugs, improvements
- **Agent behavior:** Normal queue processing
- **Expected resolution:** 1-2 weeks

### Low
```yaml
priority: low
```
- **Use for:** Nice-to-haves, documentation, minor improvements
- **Agent behavior:** When higher priority work is done
- **Expected resolution:** When capacity allows

---

## Status Values

### Open
```yaml
status: open
```
Task is ready to be picked up by an agent.

### In Progress
```yaml
status: in_progress
assignee: AgentName
branch: feature/task-id
```
Agent is actively working on this task.

### Blocked
```yaml
status: blocked
notes: |
  Blocked by missing API documentation.
  Waiting on BackendAgent to complete api-docs task.
```
Cannot proceed until a dependency is resolved.

### Completed
```yaml
status: completed
notes: |
  Implemented in PR #123.
  Added 15 unit tests, all passing.
pullRequestNumber: 123
```
Work is done and merged.

### Cancelled
```yaml
status: cancelled
notes: |
  Cancelled: Requirement changed, no longer needed.
```
Will not be completed.

---

## Using Dependencies

### Basic Dependency

```yaml
id: implement-frontend-dashboard
dependencies:
  - implement-dashboard-api  # Must complete first
```

### Multiple Dependencies

```yaml
id: integration-tests
dependencies:
  - implement-frontend-dashboard
  - implement-dashboard-api
  - setup-test-database
```

### Dependency Resolution

The framework automatically:
1. Checks if dependencies are completed
2. Only marks task as "ready" when all dependencies pass
3. Agents only pick up "ready" tasks

**Best Practices:**
- Keep dependency chains short (< 3 levels)
- Avoid circular dependencies
- Document why dependencies exist

---

## Labels

Labels help categorize and filter tasks:

### Common Labels

```yaml
labels:
  - feature      # New functionality
  - bug          # Bug fix
  - refactor     # Code improvement
  - security     # Security-related
  - documentation # Docs updates
  - test         # Test-related
  - frontend     # Frontend work
  - backend      # Backend work
  - devops       # Infrastructure
```

### Using Labels for Assignment

Agents can filter by labels:

```typescript
const tasks = await taskManager.filter({
  labels: ['frontend'],
  status: 'open'
});
```

---

## Creating Tasks Programmatically

```typescript
import { TaskManager } from '@monkeytown/agent-framework';

const tasks = new TaskManager('.agents/tasks');

// Create a new task
const task = await tasks.create({
  id: 'implement-login',
  title: 'Implement User Login',
  description: `
    Add login functionality to the application.
    
    ## Acceptance Criteria
    - Email/password login form
    - JWT token storage
    - Redirect to dashboard on success
  `,
  priority: 'high',
  assignee: 'FrontendAgent',
  labels: ['feature', 'frontend'],
  dependencies: ['setup-auth-api']
});
```

---

## Task Lifecycle Examples

### Feature Task

```yaml
# Day 1: Created
id: add-user-profile
title: "Add User Profile Page"
description: |
  Create a user profile page showing account details.
status: open
priority: medium
assignee: FrontendAgent
dependencies: []
labels:
  - feature
  - frontend
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
```

```yaml
# Day 2: Agent picks up
status: in_progress
branch: feature/add-user-profile
updated: 2026-01-22T10:30:00Z
```

```yaml
# Day 3: Completed
status: completed
pullRequestNumber: 45
notes: |
  Implemented profile page with:
  - Avatar display
  - Name and email fields
  - Edit capability
  
  PR #45 merged automatically.
updated: 2026-01-23T14:15:00Z
```

### Bug Fix Task

```yaml
id: fix-login-redirect
title: "Fix Login Redirect Loop"
description: |
  Users are stuck in a redirect loop after login.
  
  ## Steps to Reproduce
  1. Go to /login
  2. Enter valid credentials
  3. Click Login
  4. Observe infinite redirect
  
  ## Expected Behavior
  Redirect to /dashboard after login.
status: open
priority: critical
assignee: FrontendAgent
labels:
  - bug
  - critical
  - frontend
created: 2026-01-21T08:00:00Z
updated: 2026-01-21T08:00:00Z
```

---

## Task Queries

### Get All Open Tasks

```typescript
const openTasks = await taskManager.filter({ status: 'open' });
```

### Get Ready Tasks (Dependencies Met)

```typescript
const readyTasks = await taskManager.getReady();
```

### Get Tasks for an Agent

```typescript
const myTasks = await taskManager.getForAgent('FrontendAgent');
```

### Get Tasks by Priority

```typescript
const criticalTasks = await taskManager.filter({ 
  priority: 'critical',
  status: ['open', 'in_progress']
});
```

### Get Blocked Tasks

```typescript
const blockedTasks = await taskManager.filter({ status: 'blocked' });
```

---

## Task Statistics

```typescript
const stats = await taskManager.getStats();

console.log(stats);
// {
//   total: 25,
//   byStatus: { open: 10, in_progress: 5, blocked: 2, completed: 8 },
//   byPriority: { critical: 1, high: 8, medium: 12, low: 4 },
//   blocked: 2,
//   ready: 8
// }
```

---

## Best Practices

### Writing Good Task Descriptions

✅ **Good:**
```yaml
description: |
  Add password reset functionality.
  
  ## Acceptance Criteria
  - User can request reset via email
  - Reset link expires after 1 hour
  - New password must meet security requirements
  
  ## Technical Notes
  - Use existing email service in /src/services/email.ts
  - Add rate limiting (max 3 requests/hour)
```

❌ **Bad:**
```yaml
description: "Add password reset"
```

### Task Sizing

- **Too small:** Creates coordination overhead
- **Too large:** Takes too long, blocks others
- **Just right:** Completable in 1-4 hours of agent time

### Avoiding Task Sprawl

1. **Limit open tasks:** Keep < 50 in queue
2. **Review regularly:** Cancel stale tasks
3. **Be specific:** Vague tasks don't get done
4. **Set due dates:** Creates urgency

### Handling Blocked Tasks

When a task gets blocked:

1. Update status to `blocked`
2. Add notes explaining why
3. Create a signal if urgent
4. Create dependency task if needed

```yaml
status: blocked
notes: |
  Blocked: API endpoint not ready.
  Created dependency task: implement-user-api
dependencies:
  - implement-user-api
```

---

## Next Steps

- [Agent Configuration Guide](./agent-configuration.md)
- [Signal System Guide](./signals.md)
- [Coordinator Guide](./coordinator.md)
