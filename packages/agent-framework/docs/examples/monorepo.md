# Example: Monorepo Setup

A complex example with multiple services in a monorepo, each with its own agent.

## Overview

This example demonstrates:
- Multiple services (api, web, mobile, shared)
- Specialized agents per service
- Cross-service coordination
- Shared library management

## Architecture

```
monorepo/
├── .agents/
│   ├── tasks/
│   ├── signals/
│   └── agent-registry.yaml
├── .github/workflows/
├── packages/
│   ├── api/          # Backend API
│   ├── web/          # React web app
│   ├── mobile/       # React Native
│   └── shared/       # Shared types/utils
├── package.json      # Workspace root
└── turbo.json        # Turborepo config
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
    description: Manages all agents across the monorepo
    status: active
    skills: [coordination, scheduling]
    domains: [.agents/]
    outputFolders: []
    maxConcurrentTasks: 1
    workflowFile: coordinator.yml

  # API Agent
  - id: api-agent
    name: ApiAgent
    role: builder
    description: Develops the backend API service
    status: active
    skills: [node, typescript, express, prisma, postgresql]
    domains: [.agents/api]
    outputFolders: [/packages/api/src]
    maxConcurrentTasks: 1
    workflowFile: api-agent.yml

  # Web Agent
  - id: web-agent
    name: WebAgent
    role: builder
    description: Develops the React web application
    status: active
    skills: [react, typescript, nextjs, tailwindcss]
    domains: [.agents/web]
    outputFolders: [/packages/web/src]
    maxConcurrentTasks: 1
    workflowFile: web-agent.yml

  # Mobile Agent
  - id: mobile-agent
    name: MobileAgent
    role: builder
    description: Develops the React Native mobile app
    status: active
    skills: [react-native, typescript, expo]
    domains: [.agents/mobile]
    outputFolders: [/packages/mobile/src]
    maxConcurrentTasks: 1
    workflowFile: mobile-agent.yml

  # Shared Agent
  - id: shared-agent
    name: SharedAgent
    role: builder
    description: Maintains shared types and utilities
    status: active
    skills: [typescript, shared-libs]
    domains: [.agents/shared]
    outputFolders: [/packages/shared/src]
    maxConcurrentTasks: 1
    workflowFile: shared-agent.yml

  # DevOps Agent
  - id: devops-agent
    name: DevOpsAgent
    role: architect
    description: Manages CI/CD and infrastructure
    status: active
    skills: [docker, kubernetes, github-actions, terraform]
    domains: [.agents/infrastructure]
    outputFolders: [/deploy, /.github/workflows]
    maxConcurrentTasks: 1
    workflowFile: devops-agent.yml
```

---

## Workflow Schedules (Staggered)

To avoid conflicts, agents run at different times:

| Agent | Schedule | Offset |
|-------|----------|--------|
| Coordinator | :00, :30 | Every 30 min |
| ApiAgent | :00 | 6h interval |
| WebAgent | :10 | 6h interval |
| MobileAgent | :20 | 6h interval |
| SharedAgent | :30 | 6h interval |
| DevOpsAgent | :40 | 6h interval |

---

## Cross-Service Coordination

### Shared Library Updates

When shared types change, all consumers need updates:

**Task flow:**
```
1. SharedAgent updates /packages/shared/
2. Creates HANDOFF to ApiAgent, WebAgent, MobileAgent
3. Each agent updates their service
```

**Example signal:**

`.agents/signals/HANDOFF-shared-types-updated.md`:

```markdown
# HANDOFF: Shared Types Updated

**From:** SharedAgent
**To:** All
**Priority:** MEDIUM
**Created:** 2026-01-21
**Status:** active

## Changes

Updated User type in packages/shared/src/types/user.ts:
- Added `role: 'admin' | 'user'`
- Added `lastLoginAt: Date`

## Action Required

All services using User type need to handle new fields:
- ApiAgent: Update API responses
- WebAgent: Update UI components
- MobileAgent: Update mobile screens

## Breaking Changes

None - new fields are optional.
```

### API Changes

When API changes, frontend apps need updates:

**Task dependencies:**

```yaml
# Web task depends on API
id: web-user-profile
dependencies:
  - api-user-endpoint

# Mobile task depends on API
id: mobile-user-profile
dependencies:
  - api-user-endpoint
```

---

## Multi-Package Tasks

### API Task

`.agents/tasks/high-api-auth.yaml`:

```yaml
id: api-auth
title: "Implement Authentication API"
description: |
  Create authentication endpoints.
  
  ## Endpoints
  - POST /auth/login
  - POST /auth/register
  - POST /auth/logout
  - GET /auth/me
  
  ## Notes
  - Use JWT tokens
  - Store refresh tokens in database
status: open
priority: high
assignee: ApiAgent
dependencies:
  - shared-auth-types  # Need shared types first
labels:
  - api
  - auth
outputFolder: /packages/api/src/auth
```

### Web Task

`.agents/tasks/high-web-login.yaml`:

```yaml
id: web-login
title: "Implement Login Page"
description: |
  Create login page using auth API.
  
  ## Requirements
  - Email/password form
  - Validation
  - Error handling
  - Redirect on success
status: open
priority: high
assignee: WebAgent
dependencies:
  - api-auth  # Need API first
  - shared-auth-types
labels:
  - web
  - auth
  - ui
outputFolder: /packages/web/src/pages/auth
```

### Mobile Task

`.agents/tasks/high-mobile-login.yaml`:

```yaml
id: mobile-login
title: "Implement Mobile Login Screen"
description: |
  Create login screen for mobile app.
  
  ## Requirements
  - Email/password form
  - Validation
  - Biometric option
  - Error handling
status: open
priority: high
assignee: MobileAgent
dependencies:
  - api-auth  # Need API first
  - shared-auth-types
labels:
  - mobile
  - auth
  - ui
outputFolder: /packages/mobile/src/screens/auth
```

### Shared Task

`.agents/tasks/high-shared-auth-types.yaml`:

```yaml
id: shared-auth-types
title: "Create Auth Types"
description: |
  Define shared authentication types.
  
  ## Types Needed
  - LoginRequest
  - LoginResponse
  - User
  - AuthToken
status: open
priority: high
assignee: SharedAgent
dependencies: []  # No dependencies - can start immediately
labels:
  - shared
  - types
outputFolder: /packages/shared/src/types
```

---

## Dependency Graph

```
shared-auth-types
       │
       ▼
   api-auth
       │
   ┌───┴───┐
   ▼       ▼
web-login  mobile-login
```

**Execution order:**
1. SharedAgent: shared-auth-types
2. ApiAgent: api-auth (after #1 complete)
3. WebAgent + MobileAgent: login screens (after #2 complete)

---

## Turborepo Integration

### turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"]
    },
    "lint": {}
  }
}
```

### CI with Turborepo

`.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      
      # Turborepo caching
      - uses: actions/cache@v4
        with:
          path: .turbo
          key: turbo-${{ runner.os }}-${{ github.sha }}
          restore-keys: turbo-${{ runner.os }}-
      
      - run: npx turbo run lint test build
```

---

## Agent Workflow Template

Each agent follows similar structure:

```yaml
name: {AgentName}
on:
  schedule:
    - cron: "{offset} */6 * * *"
  workflow_dispatch:

jobs:
  agent:
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

      # Turborepo cache
      - uses: actions/cache@v4
        with:
          path: .turbo
          key: turbo-${{ runner.os }}-${{ github.sha }}

      - uses: anomalyco/opencode/github@latest
        timeout-minutes: 15
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        with:
          model: anthropic/claude-sonnet-4-20250514
          prompt: |-
            {Agent-specific prompt}
            
            ## Monorepo Commands
            - Build all: npx turbo run build
            - Build package: npx turbo run build --filter=@monorepo/{package}
            - Test package: npx turbo run test --filter=@monorepo/{package}
```

---

## Cross-Package Changes

When a change spans multiple packages:

### Option 1: Single Agent

Create a task assigned to DevOps or Coordinator:

```yaml
id: update-all-deps
title: "Update TypeScript in all packages"
assignee: DevOpsAgent
labels:
  - infrastructure
  - all-packages
```

### Option 2: Coordinated Tasks

Create linked tasks:

```yaml
# Task 1
id: update-shared-deps
assignee: SharedAgent

# Task 2
id: update-api-deps
assignee: ApiAgent
dependencies: [update-shared-deps]

# Task 3
id: update-web-deps
assignee: WebAgent
dependencies: [update-api-deps]
```

---

## Best Practices

### 1. Shared Package First

Always update shared packages before dependent packages:
- SharedAgent runs first in the schedule
- Other agents wait for shared changes

### 2. Clear Package Ownership

Each agent owns specific packages:
- No overlap in outputFolders
- Clear domain boundaries

### 3. Use Turborepo Caching

Cache builds between runs:
- Faster CI
- Less API usage
- Consistent builds

### 4. Version Coordination

For breaking changes:
1. SharedAgent updates shared types
2. Creates HANDOFF to all consumers
3. Each agent updates their package
4. All PRs merge together

---

## Scaling Beyond 6 Agents

For larger monorepos:

1. **Group by domain:**
   - TeamA-Agent (multiple packages)
   - TeamB-Agent (multiple packages)

2. **Use sub-coordinators:**
   - Main Coordinator
   - Frontend Coordinator (web, mobile)
   - Backend Coordinator (api, workers)

3. **Increase run frequency:**
   - More tasks = more runs needed
   - Balance with rate limits

---

## Next Steps

- [Monitoring Guide](../guides/monitoring.md)
- [Troubleshooting](../troubleshooting.md)
- [Architecture Overview](../guides/architecture.md)
