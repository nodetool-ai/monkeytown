# Monkeytown Multi-Agent System Analysis

## Overview

This document captures the lessons learned from the Monkeytown multi-agent experiment, extracted to create a reusable framework for managing AI agents across repositories.

## System Architecture

The Monkeytown system used **18 agents** coordinated via:
- **Tasks**: YAML files with priorities, status, dependencies
- **Signals**: Markdown files for urgent inter-agent communication
- **Workflows**: GitHub Actions running agents on schedules
- **Domains**: Folder ownership for each agent's responsibility

## What Went Well

### 1. YAML Task Schema ✅
The task format with priorities (critical/high/medium/low), status tracking, dependencies, and assignees worked extremely well:
```yaml
id: implement-feature
priority: high
status: open
assignee: FrontendEngineer
dependencies: [backend-api]
```

**Why it worked**: Clear, machine-readable, easy for agents to parse and update.

### 2. Signal-Based Communication ✅
The signal system with URGENT/BLOCKED/HANDOFF types enabled async coordination:
- URGENT signals got immediate attention
- HANDOFF signals enabled smooth transitions
- File-based = no race conditions

**Why it worked**: Simple, visible, and agents could check signals at start of each run.

### 3. Domain Ownership ✅
Each agent owned specific folders:
- ChaosArchitect → `.monkeytown/architecture/`
- PrimateDesigner → `.monkeytown/ux/`
- FrontendEngineer → `/web`

**Why it worked**: Clear boundaries, no conflicts, agents knew their scope.

### 4. Health Dashboard ✅
A single `HEALTH.md` file showed system-wide status:
- Component health indicators
- Blockers list
- Task queue health
- Agent activity

**Why it worked**: Single source of truth for system state.

### 5. Action-First Prompts ✅
Agent prompts emphasized action over documentation:
```
🚨 ACTION-FIRST: You are MonkeyBuilder. 
Your job is to WRITE CODE, not documentation.
```

**Why it worked**: Reduced agents creating docs instead of shipping code.

## What Went Badly

### 1. Overstaffing (18 Agents) ❌
The system had **18 agents** when **12 was the recommended max**:
- Coordination overhead exploded
- API rate limits became bottleneck
- Many agents had overlapping responsibilities

**Lesson**: Start with fewer agents, add only when needed.

### 2. No Auto-Merge ❌
PRs required manual review even when CI passed:
- Bottleneck at PR review stage
- Agents created PRs but they sat unmerged
- Coordination stalled waiting for humans

**Lesson**: Auto-merge PRs when CI passes. Trust the tests.

### 3. Critical Blockers Lingered ❌
P0 issues (navigation bug, JWT hardcoding) blocked progress for days:
- No automatic escalation
- Blockers weren't prioritized enough
- 31.5% test pass rate blocked QA

**Lesson**: Critical issues need automatic escalation and priority override.

### 4. Single API Key Bottleneck ❌
All 18 agents shared one MINIMAX_API_KEY:
- Rate limits affected all agents
- Failures in one agent impacted others
- No isolation between agent workloads

**Lesson**: Use separate API keys or better rate limit management.

### 5. Workflows Disabled ❌
All 19 agent workflows were disabled:
- No actual coordination happening
- System was static despite sophisticated design
- Gap between design and execution

**Lesson**: Start simple, enable one agent at a time, validate before scaling.

### 6. Circular Dependencies ❌
Some tasks had implicit dependencies not captured in YAML:
- Agent A needed Agent B's output
- Agent B needed Agent A's decision
- Deadlocks when both waited

**Lesson**: Explicit dependency graphs, detect cycles automatically.

## Key Metrics from Monkeytown

| Metric | Value | Status |
|--------|-------|--------|
| Total Agents | 18 | ❌ Over recommended 12 |
| E2E Test Pass Rate | 31.5% | ❌ Critical |
| Critical Tasks | 3 | ❌ P0 items unresolved |
| Open PRs | Multiple | ⚠️ Not auto-merging |
| Features Complete | 4/11 (36%) | ⚠️ Behind schedule |
| Blocked Tasks | Multiple | ❌ Coordination issues |

## Framework Design Decisions

Based on this analysis, the extracted framework implements:

### 1. Agent Limit Enforcement
```typescript
if (this.agents.size >= this.config.maxAgents) {
  throw new Error(`Maximum agents (${this.config.maxAgents}) reached`);
}
```

### 2. Auto-Merge by Default
```typescript
const defaultAutoMergeConfig = {
  enabled: true,
  requiredChecks: ['lint', 'test'],
  mergeMethod: 'squash',
  deleteBranchAfterMerge: true
};
```

### 3. Coordinator for Active Management
The Coordinator:
- Runs on schedule (every 30 minutes)
- Checks for PRs ready to merge
- Assigns tasks to available agents
- Creates signals for blockers
- Escalates unresolved critical issues

### 4. Ready-to-Start Check
```typescript
async canStart(id: string): Promise<boolean> {
  const task = await this.get(id);
  if (task.dependencies.length === 0) return true;
  
  for (const depId of task.dependencies) {
    const dep = await this.get(depId);
    if (!dep || dep.status !== 'completed') return false;
  }
  return true;
}
```

### 5. Branch-Based Metadata
All agent metadata lives in a dedicated directory (`.agents/`), keeping it separate from main code changes.

## Recommendations for Future Systems

1. **Start with 3-5 agents**, add more only when needed
2. **Enable auto-merge** from day one
3. **Use signals sparingly** - only for genuine blockers
4. **Run coordinator frequently** (every 15-30 minutes)
5. **Monitor API rate limits** and use separate keys
6. **Validate one agent works** before adding more
7. **Test the coordination**, not just individual agents
8. **Escalate critical issues** automatically after 1 hour

## Framework Usage Summary

```typescript
import { createCoordinator } from '@monkeytown/agent-framework';

const coordinator = createCoordinator({
  owner: 'your-org',
  repo: 'your-repo',
  githubToken: process.env.GITHUB_TOKEN!,
  maxAgents: 12,
  autoMerge: { enabled: true }
});

await coordinator.initialize();
const result = await coordinator.run();

// Auto-merged PRs: result.prsMerged
// Tasks assigned: result.tasksAssigned
// System health: result.state.health
```

---

*Analysis completed: 2026-01-21*
*Source: Monkeytown multi-agent experiment logs*
