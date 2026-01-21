# Example: Full-Stack Application

A complete setup with Frontend, Backend, and DevOps agents managing a full-stack application.

## Overview

This example sets up:
- **Coordinator** - Orchestrates agents and auto-merges PRs
- **FrontendAgent** - React/TypeScript UI development
- **BackendAgent** - Node.js API development
- **DevOpsAgent** - CI/CD and infrastructure

## Project Structure

```
fullstack-app/
├── .agents/
│   ├── tasks/
│   ├── signals/
│   ├── decisions/
│   └── agent-registry.yaml
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── coordinator.yml
│       ├── auto-merge.yml
│       ├── frontend.yml
│       ├── backend.yml
│       └── devops.yml
├── web/                 # React frontend
│   ├── src/
│   └── package.json
├── server/              # Node.js backend
│   ├── src/
│   └── package.json
├── deploy/              # Infrastructure
│   └── docker-compose.yml
└── package.json         # Root workspace
```

---

## Agent Registry

`.agents/agent-registry.yaml`:

```yaml
version: "1.0"
updated: 2026-01-21T00:00:00Z
agents:
  # Coordinator
  - id: coordinator
    name: Coordinator
    role: coordinator
    description: Orchestrates agents and auto-merges PRs
    status: active
    skills: [coordination, scheduling]
    domains: [.agents/]
    outputFolders: []
    maxConcurrentTasks: 1
    assignedTasks: []
    workflowFile: coordinator.yml

  # Frontend Agent
  - id: frontend
    name: FrontendAgent
    role: builder
    description: Builds React/TypeScript UI components
    status: active
    skills:
      - react
      - typescript
      - tailwindcss
      - testing-library
      - accessibility
    domains:
      - .agents/ux
      - .agents/design
    outputFolders:
      - /web/src/components
      - /web/src/pages
      - /web/src/hooks
    maxConcurrentTasks: 1
    assignedTasks: []
    workflowFile: frontend.yml

  # Backend Agent
  - id: backend
    name: BackendAgent
    role: builder
    description: Builds Node.js APIs and services
    status: active
    skills:
      - node
      - typescript
      - express
      - postgresql
      - prisma
      - api-design
    domains:
      - .agents/api
    outputFolders:
      - /server/src/api
      - /server/src/services
      - /server/src/db
    maxConcurrentTasks: 1
    assignedTasks: []
    workflowFile: backend.yml

  # DevOps Agent
  - id: devops
    name: DevOpsAgent
    role: architect
    description: Manages infrastructure and CI/CD
    status: active
    skills:
      - docker
      - github-actions
      - terraform
      - monitoring
    domains:
      - .agents/infrastructure
    outputFolders:
      - /deploy
      - /.github/workflows
    maxConcurrentTasks: 1
    assignedTasks: []
    workflowFile: devops.yml
```

---

## Workflows

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
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run lint

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm test --prefix web

  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm test --prefix server
        env:
          DATABASE_URL: postgresql://postgres:test@localhost:5432/test

  build:
    runs-on: ubuntu-latest
    needs: [lint, test-frontend, test-backend]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
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
    types: [opened, synchronize, labeled]
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
            🤖 COORDINATOR: Full-Stack App Manager

            ## Your Mission
            1. Check `.agents/signals/` for urgent blockers
            2. Check `.agents/tasks/` for unassigned tasks
            3. Review open PRs for CI status
            4. Auto-merge PRs that pass all checks

            ## Agent Roster
            - FrontendAgent: React/TypeScript UI (/web)
            - BackendAgent: Node.js APIs (/server)
            - DevOpsAgent: Infrastructure (/deploy)

            ## Auto-Merge Rules
            - PR has passing CI (lint, test-frontend, test-backend, build)
            - PR has 'auto-merge' or 'ready-to-merge' label
            - PR does NOT have 'do-not-merge', 'wip', 'blocked'
            - PR has no merge conflicts

            ## Task Assignment
            - Match labels: frontend → FrontendAgent
            - Match labels: backend → BackendAgent
            - Match labels: devops → DevOpsAgent

            ## Handoffs
            - Backend API ready → Signal FrontendAgent
            - Frontend needs API → Signal BackendAgent

            Execute coordination. Log to .agents/decisions/
```

### Frontend Agent

`.github/workflows/frontend.yml`:

```yaml
name: FrontendAgent
on:
  schedule:
    - cron: "0 */6 * * *"
  workflow_dispatch:

jobs:
  frontend:
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
            🎨 FrontendAgent: React/TypeScript Developer

            ## IMMEDIATE ACTIONS
            1. Check `.agents/signals/URGENT-*.md` for critical issues
            2. Check `.agents/signals/HANDOFF-*.md` from BackendAgent
            3. Check `.agents/tasks/critical-*.yaml` assigned to FrontendAgent
            4. Check `.agents/tasks/high-*.yaml` assigned to FrontendAgent

            ## Your Domain
            - React components in /web/src/components/
            - Pages in /web/src/pages/
            - Hooks in /web/src/hooks/
            - Tests in /web/src/**/*.test.tsx

            ## Stack
            - React 18
            - TypeScript
            - TailwindCSS
            - React Testing Library
            - Vitest

            ## Workflow
            1. FIND highest-priority task
            2. START - Update task status
            3. CODE - Implement in /web/src/
            4. TEST - npm test --prefix web
            5. COMPLETE - Update task, create PR with 'auto-merge'
            6. SIGNAL - Handoff if backend changes needed

            ## Rules
            - Run tests before creating PR
            - Add 'auto-merge' label to PRs
            - Create BLOCKED signal if API missing
            - Prioritize: critical > high > medium > low
```

### Backend Agent

`.github/workflows/backend.yml`:

```yaml
name: BackendAgent
on:
  schedule:
    - cron: "15 */6 * * *"  # Offset from frontend
  workflow_dispatch:

jobs:
  backend:
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
            ⚙️ BackendAgent: Node.js API Developer

            ## IMMEDIATE ACTIONS
            1. Check `.agents/signals/URGENT-*.md` for critical issues
            2. Check `.agents/signals/BLOCKED-*.md` from FrontendAgent
            3. Check `.agents/tasks/critical-*.yaml` assigned to BackendAgent
            4. Check `.agents/tasks/high-*.yaml` assigned to BackendAgent

            ## Your Domain
            - API routes in /server/src/api/
            - Services in /server/src/services/
            - Database in /server/src/db/
            - Tests in /server/src/**/*.test.ts

            ## Stack
            - Node.js 20
            - TypeScript
            - Express
            - Prisma ORM
            - PostgreSQL
            - Vitest

            ## Workflow
            1. FIND highest-priority task
            2. START - Update task status
            3. CODE - Implement in /server/src/
            4. TEST - npm test --prefix server
            5. COMPLETE - Update task, create PR with 'auto-merge'
            6. SIGNAL - Create HANDOFF when API ready for frontend

            ## Rules
            - Run tests before creating PR
            - Create HANDOFF signal when API ready
            - Document API in code comments
            - Prioritize: critical > high > medium > low
```

### DevOps Agent

`.github/workflows/devops.yml`:

```yaml
name: DevOpsAgent
on:
  schedule:
    - cron: "30 */6 * * *"  # Offset from others
  workflow_dispatch:

jobs:
  devops:
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
            🚀 DevOpsAgent: Infrastructure & CI/CD

            ## IMMEDIATE ACTIONS
            1. Check `.agents/signals/URGENT-*.md` for critical issues
            2. Check `.agents/tasks/critical-*.yaml` assigned to DevOpsAgent
            3. Check `.agents/tasks/high-*.yaml` assigned to DevOpsAgent

            ## Your Domain
            - Docker config in /deploy/
            - CI/CD in /.github/workflows/
            - Infrastructure docs in .agents/infrastructure/

            ## Stack
            - Docker & Docker Compose
            - GitHub Actions
            - Terraform (if needed)

            ## Workflow
            1. FIND highest-priority task
            2. START - Update task status
            3. CODE - Implement infrastructure
            4. TEST - Validate configs
            5. COMPLETE - Update task, create PR with 'auto-merge'

            ## Rules
            - Validate YAML syntax
            - Test Docker builds
            - Document infrastructure changes
            - Prioritize: critical > high > medium > low
```

---

## Example Tasks

### Frontend Task

`.agents/tasks/high-user-dashboard.yaml`:

```yaml
id: user-dashboard
title: "Create User Dashboard Component"
description: |
  Build a dashboard component showing user stats.
  
  ## Acceptance Criteria
  - Component: /web/src/components/Dashboard.tsx
  - Shows user name, stats, recent activity
  - Responsive design with Tailwind
  - Tests in Dashboard.test.tsx
  
  ## Dependencies
  - Uses GET /api/users/:id endpoint
status: open
priority: high
assignee: FrontendAgent
dependencies:
  - user-api  # Backend must complete first
labels:
  - frontend
  - feature
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
outputFolder: /web/src/components
```

### Backend Task

`.agents/tasks/high-user-api.yaml`:

```yaml
id: user-api
title: "Create User API Endpoints"
description: |
  Build user management API endpoints.
  
  ## Endpoints
  - GET /api/users/:id - Get user by ID
  - PUT /api/users/:id - Update user
  - DELETE /api/users/:id - Delete user
  
  ## Response Format
  {
    "id": 1,
    "name": "John",
    "email": "john@example.com",
    "createdAt": "2026-01-21T00:00:00Z"
  }
  
  ## Tests Required
  - All CRUD operations
  - Error cases (404, 400)
status: open
priority: high
assignee: BackendAgent
dependencies: []
labels:
  - backend
  - api
  - feature
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
outputFolder: /server/src/api
```

### DevOps Task

`.agents/tasks/medium-docker-setup.yaml`:

```yaml
id: docker-setup
title: "Create Docker Compose Setup"
description: |
  Create Docker Compose for local development.
  
  ## Services
  - web: React frontend (port 3000)
  - server: Node.js backend (port 4000)
  - db: PostgreSQL (port 5432)
  
  ## Requirements
  - Hot reloading for development
  - Persistent database volume
  - Environment variables from .env
status: open
priority: medium
assignee: DevOpsAgent
dependencies: []
labels:
  - devops
  - infrastructure
created: 2026-01-21T00:00:00Z
updated: 2026-01-21T00:00:00Z
outputFolder: /deploy
```

---

## Signal Examples

### Backend to Frontend Handoff

`.agents/signals/HANDOFF-user-api-ready.md`:

```markdown
# HANDOFF: User API Ready

**From:** BackendAgent
**To:** FrontendAgent
**Priority:** MEDIUM
**Created:** 2026-01-21
**Status:** active

## Issue

User management API is complete and merged.

## Endpoints Available

- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Action Required

1. Integrate into Dashboard component
2. Handle loading and error states
3. Update user-dashboard task when complete
```

### Frontend Blocked

`.agents/signals/BLOCKED-missing-stats-api.md`:

```markdown
# BLOCKED: Missing Stats API

**From:** FrontendAgent
**To:** BackendAgent
**Priority:** HIGH
**Created:** 2026-01-21
**Status:** active

## Issue

Cannot complete Dashboard component.
Missing `GET /api/stats` endpoint.

## Action Required

Create stats endpoint returning:
```json
{
  "totalUsers": 150,
  "activeToday": 45,
  "newThisWeek": 12
}
```

## Blocks

- Dashboard component
- Task: user-dashboard
```

---

## Expected Workflow

1. **BackendAgent** picks up `user-api` task
   - Implements endpoints
   - Creates PR
   - CI passes → auto-merges
   - Creates HANDOFF signal

2. **FrontendAgent** sees HANDOFF signal
   - Picks up `user-dashboard` task
   - Implements Dashboard using API
   - Creates PR
   - CI passes → auto-merges

3. **DevOpsAgent** works independently
   - Implements Docker setup
   - No dependencies on others

4. **Coordinator** runs every 30 minutes
   - Checks for stuck tasks
   - Verifies auto-merge is working
   - Escalates issues if needed

---

## Scaling Tips

1. **Add more agents as needed:**
   - TestingAgent for E2E tests
   - SecurityAgent for audits
   - DocsAgent for documentation

2. **Use skill matching:**
   - Label tasks with required skills
   - Agents filter by their skills

3. **Stagger schedules:**
   - Frontend: :00
   - Backend: :15
   - DevOps: :30
   - Coordinator: :00, :30

---

## Next Steps

- [Monorepo Example](./monorepo.md) for larger setups
- [Monitoring Guide](../guides/monitoring.md) for health checks
- [Troubleshooting](../troubleshooting.md) for common issues
