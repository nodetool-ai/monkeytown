# Agent Configuration Guide

This guide covers how to create, configure, and manage specialized agents in your system.

## Agent Basics

An agent is a specialized AI worker that:
- Picks up tasks assigned to it
- Works in a specific domain
- Creates PRs for changes
- Signals when work is ready for handoff

---

## Agent Types (Roles)

### Coordinator
```yaml
role: coordinator
```
- Manages other agents
- Assigns tasks
- Auto-merges PRs
- Creates signals

### Builder
```yaml
role: builder
```
- Implements code
- Creates PRs
- Writes tests

### Architect
```yaml
role: architect
```
- Designs systems
- Reviews architecture
- Creates technical specs

### Researcher
```yaml
role: researcher
```
- Gathers information
- Analyzes options
- Writes research docs

### Designer
```yaml
role: designer
```
- Creates UX designs
- Writes design specs
- Reviews UI implementations

### Security
```yaml
role: security
```
- Reviews code for vulnerabilities
- Creates security requirements
- Performs audits

### QA
```yaml
role: qa
```
- Tests implementations
- Writes test cases
- Reports bugs

### Product
```yaml
role: product
```
- Defines requirements
- Prioritizes backlog
- Reviews features

---

## Registering an Agent

### Via Agent Registry File

Add to `.agents/agent-registry.yaml`:

```yaml
agents:
  - id: frontend-agent
    name: FrontendAgent
    role: builder
    description: Builds React/TypeScript user interfaces
    status: active
    schedule: "0 */6 * * *"  # Every 6 hours
    skills:
      - react
      - typescript
      - css
      - accessibility
      - testing
    domains:
      - .agents/ux
      - .agents/design
    outputFolders:
      - /src/components
      - /src/pages
      - /src/styles
    maxConcurrentTasks: 1
    assignedTasks: []
    workflowFile: frontend-agent.yml
```

### Via TypeScript

```typescript
import { AgentRegistry } from '@monkeytown/agent-framework';

const registry = new AgentRegistry({
  maxAgents: 12,
  metadataPath: '.agents'
});

await registry.load();

await registry.register({
  id: 'frontend-agent',
  name: 'FrontendAgent',
  role: 'builder',
  description: 'Builds React/TypeScript user interfaces',
  skills: ['react', 'typescript', 'css'],
  domains: ['.agents/ux'],
  outputFolders: ['/src/components', '/src/pages']
});

await registry.save();
```

---

## Agent Configuration Fields

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique identifier (kebab-case) |
| `name` | Yes | Display name (PascalCase) |
| `role` | Yes | Agent type/role |
| `description` | Yes | What this agent does |
| `status` | No | active, inactive, blocked, running |
| `schedule` | No | Cron expression |
| `skills` | No | Capabilities for task matching |
| `domains` | No | Folders agent reads from |
| `outputFolders` | No | Folders agent writes to |
| `maxConcurrentTasks` | No | Max tasks at once (default: 1) |
| `workflowFile` | No | GitHub workflow file |

---

## Creating Agent Workflows

### Basic Agent Workflow

`.github/workflows/{agent-id}.yml`:

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

            ## Responsibilities
            - Build React/TypeScript UI components
            - Implement responsive designs
            - Write component tests
            - Ensure accessibility (WCAG 2.1)

            ## Domain: .agents/ux, .agents/design
            ## Output: /src/components, /src/pages, /src/styles

            ## Workflow
            1. FIND highest-priority task assigned to you
            2. START - Update task status to 'in_progress'
            3. CODE - Implement the UI
            4. TEST - Run npm test
            5. COMPLETE - Update task status
            6. SIGNAL - Handoff to BackendAgent if API needed

            Prioritize: critical > high > medium > low
```

---

## Example Agents

### Frontend Agent

```yaml
# .agents/agent-registry.yaml
- id: frontend-agent
  name: FrontendAgent
  role: builder
  description: Builds React/TypeScript UI
  skills: [react, typescript, css, tailwind, accessibility]
  domains: [.agents/ux]
  outputFolders: [/src/components, /src/pages]
```

**Workflow prompt focus:**
- UI component development
- Styling and responsiveness
- Client-side testing
- Accessibility compliance

### Backend Agent

```yaml
- id: backend-agent
  name: BackendAgent
  role: builder
  description: Builds Node.js APIs and services
  skills: [node, typescript, express, postgres, redis]
  domains: [.agents/api]
  outputFolders: [/src/api, /src/services, /src/db]
```

**Workflow prompt focus:**
- REST/GraphQL API development
- Database operations
- Service integration
- API testing

### DevOps Agent

```yaml
- id: devops-agent
  name: DevOpsAgent
  role: architect
  description: Manages infrastructure and CI/CD
  skills: [docker, kubernetes, terraform, github-actions]
  domains: [.agents/infrastructure]
  outputFolders: [/deploy, /.github/workflows]
```

**Workflow prompt focus:**
- Infrastructure as code
- CI/CD pipelines
- Deployment configurations
- Monitoring setup

### Security Agent

```yaml
- id: security-agent
  name: SecurityAgent
  role: security
  description: Reviews code for security issues
  skills: [security-audit, vulnerability-assessment, penetration-testing]
  domains: [.agents/security]
  outputFolders: [/docs/security]
```

**Workflow prompt focus:**
- Code security review
- Dependency scanning
- Security documentation
- Vulnerability remediation

### Documentation Agent

```yaml
- id: docs-agent
  name: DocsAgent
  role: custom
  description: Maintains documentation
  skills: [technical-writing, markdown, api-docs]
  domains: [.agents/docs]
  outputFolders: [/docs, /README.md]
```

**Workflow prompt focus:**
- README maintenance
- API documentation
- User guides
- Code comments

---

## Agent Scheduling

### Schedule Patterns

```yaml
# Every 6 hours
schedule: "0 */6 * * *"

# Every 4 hours
schedule: "0 */4 * * *"

# 4 times daily (specific times)
schedule: "0 0,6,12,18 * * *"

# Every 30 minutes
schedule: "*/30 * * * *"

# Once daily at midnight
schedule: "0 0 * * *"
```

### Staggering Agents

To avoid resource conflicts, stagger agent schedules:

```yaml
# FrontendAgent: Every 6 hours at :00
schedule: "0 */6 * * *"

# BackendAgent: Every 6 hours at :15
schedule: "15 */6 * * *"

# DevOpsAgent: Every 6 hours at :30
schedule: "30 */6 * * *"

# SecurityAgent: Every 6 hours at :45
schedule: "45 */6 * * *"
```

---

## Agent Skills and Task Matching

### Defining Skills

Skills help match agents to tasks:

```yaml
skills:
  - react        # Framework
  - typescript   # Language
  - css          # Technology
  - testing      # Capability
  - accessibility # Specialty
```

### Task Assignment

The coordinator uses skills to find the best agent:

```typescript
// Find agent with matching skills
const agent = registry.findBestForTask(['react', 'typescript']);
```

### Labels in Tasks

Tasks use labels that match agent skills:

```yaml
# Task
labels:
  - frontend
  - react
  - ui-component
```

---

## Managing Agent State

### Update Status

```typescript
// Set agent as running
await registry.updateStatus('frontend-agent', 'running');

// Set agent as blocked
await registry.updateStatus('frontend-agent', 'blocked');

// Set agent as active (available)
await registry.updateStatus('frontend-agent', 'active');
```

### Assign/Remove Tasks

```typescript
// Assign task to agent
await registry.assignTask('frontend-agent', 'implement-dashboard');

// Remove task from agent
await registry.removeTask('frontend-agent', 'implement-dashboard');
```

### Get Agent Stats

```typescript
const stats = registry.getStats();
// {
//   total: 5,
//   byStatus: { active: 3, running: 1, blocked: 1 },
//   available: 2,
//   blocked: 1,
//   overloaded: 0
// }
```

---

## Best Practices

### 1. Keep Agent Count Low

❌ Don't create too many agents:
- Coordination overhead increases
- Context switching hurts quality
- Rate limits become issues

✅ Recommended limits:
- Small project: 2-4 agents
- Medium project: 4-8 agents
- Large project: 8-12 agents

### 2. Clear Responsibilities

❌ Overlapping responsibilities:
```yaml
- FrontendAgent: "Does UI and some API work"
- BackendAgent: "Does API and some UI work"
```

✅ Clear boundaries:
```yaml
- FrontendAgent: "UI components, pages, client-side tests"
- BackendAgent: "API endpoints, services, database, server tests"
```

### 3. Specific Skills

❌ Too general:
```yaml
skills: [programming, coding]
```

✅ Specific:
```yaml
skills: [react, typescript, tailwindcss, jest, react-testing-library]
```

### 4. Action-First Prompts

❌ Vague:
```
You are an agent that helps with code.
```

✅ Specific and action-oriented:
```
## IMMEDIATE ACTIONS
1. Check signals for urgent issues
2. Find your highest-priority task
3. Update task status to in_progress

## Do NOT
- Write documentation instead of code
- Skip tests
- Work on multiple tasks simultaneously
```

---

## Troubleshooting

### Agent Not Picking Up Tasks

1. Check `assignee` matches agent name exactly
2. Verify workflow is enabled
3. Check for blocking signals
4. Review workflow logs

### Multiple Agents Conflicting

1. Add schedule offsets
2. Clarify domain boundaries
3. Use different output folders
4. Review task assignments

### Agent Stuck

1. Check status in registry
2. Look for blocking signals
3. Review current task status
4. Manually unblock if needed

---

## Next Steps

- [Signal System Guide](./signals.md)
- [Coordinator Guide](./coordinator.md)
- [Auto-Merge Guide](./auto-merge.md)
