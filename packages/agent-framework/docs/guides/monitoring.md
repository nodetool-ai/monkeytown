# Monitoring & Health Guide

This guide covers monitoring your multi-agent system and maintaining its health.

## Health Dashboard

### Quick Health Check

```typescript
import { createCoordinator } from '@monkeytown/agent-framework';

const coordinator = createCoordinator({
  owner: 'org',
  repo: 'repo',
  githubToken: process.env.GITHUB_TOKEN!
});

await coordinator.initialize();
const health = await coordinator.healthCheck();

console.log(`Status: ${health.status}`);
// 'healthy' | 'degraded' | 'critical'

for (const component of health.components) {
  console.log(`${component.name}: ${component.status}`);
  if (component.message) console.log(`  → ${component.message}`);
}

for (const rec of health.recommendations) {
  console.log(`⚠️ ${rec}`);
}
```

### System State

```typescript
const state = await coordinator.getState();

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  MULTI-AGENT SYSTEM STATUS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Health:     ${state.health.toUpperCase()}
  Timestamp:  ${state.timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  AGENTS
    Total:    ${state.totalAgents}
    Active:   ${state.activeAgents}
    Blocked:  ${state.blockedAgents}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  TASKS
    Total:    ${state.totalTasks}
    Open:     ${state.openTasks}
    Active:   ${state.inProgressTasks}
    Blocked:  ${state.blockedTasks}
    Done:     ${state.completedTasks}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PULL REQUESTS
    Open:     ${state.openPRs}
    Pending:  ${state.pendingCIPRs}
    Ready:    ${state.readyToMergePRs}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  SIGNALS
    Active:   ${state.activeSignals}
    Critical: ${state.criticalSignals}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

if (state.blockers.length > 0) {
  console.log('  BLOCKERS:');
  for (const blocker of state.blockers) {
    console.log(`    ⚠️ ${blocker}`);
  }
}
```

---

## Component Monitoring

### Task Statistics

```typescript
const tasks = coordinator.getTasks();
const stats = await tasks.getStats();

console.log(`Tasks by Status:`);
console.log(`  Open:        ${stats.byStatus.open}`);
console.log(`  In Progress: ${stats.byStatus.in_progress}`);
console.log(`  Blocked:     ${stats.byStatus.blocked}`);
console.log(`  Completed:   ${stats.byStatus.completed}`);

console.log(`Tasks by Priority:`);
console.log(`  Critical:    ${stats.byPriority.critical}`);
console.log(`  High:        ${stats.byPriority.high}`);
console.log(`  Medium:      ${stats.byPriority.medium}`);
console.log(`  Low:         ${stats.byPriority.low}`);

console.log(`Ready to Start: ${stats.ready}`);
```

### Agent Statistics

```typescript
const agents = coordinator.getAgents();
const stats = agents.getStats();

console.log(`Agents by Status:`);
console.log(`  Active:      ${stats.byStatus.active}`);
console.log(`  Running:     ${stats.byStatus.running}`);
console.log(`  Blocked:     ${stats.byStatus.blocked}`);
console.log(`  Inactive:    ${stats.byStatus.inactive}`);

console.log(`Available:     ${stats.available}`);
console.log(`Overloaded:    ${stats.overloaded}`);
```

### Signal Statistics

```typescript
const signals = coordinator.getSignals();
const stats = await signals.getStats();

console.log(`Signals:`);
console.log(`  Total:       ${stats.total}`);
console.log(`  Active:      ${stats.active}`);
console.log(`  Critical:    ${stats.critical}`);

console.log(`By Type:`);
console.log(`  URGENT:      ${stats.byType.URGENT}`);
console.log(`  BLOCKED:     ${stats.byType.BLOCKED}`);
console.log(`  HANDOFF:     ${stats.byType.HANDOFF}`);
```

### PR Statistics

```typescript
const prs = coordinator.getPRs();
const stats = await prs.getStats();

console.log(`Pull Requests:`);
console.log(`  Open:         ${stats.open}`);
console.log(`  Pending CI:   ${stats.pendingCI}`);
console.log(`  Ready Merge:  ${stats.readyToMerge}`);
console.log(`  Failing:      ${stats.failing}`);
```

---

## Creating a Health Dashboard File

Generate a markdown health dashboard:

```typescript
async function generateHealthDashboard(coordinator: Coordinator): Promise<string> {
  const state = await coordinator.getState();
  const health = await coordinator.healthCheck();
  
  const statusEmoji = {
    healthy: '✅',
    degraded: '⚠️',
    critical: '🔴'
  };
  
  let md = `# System Health Dashboard

**Status:** ${statusEmoji[health.status]} ${health.status.toUpperCase()}
**Updated:** ${state.timestamp}

---

## Component Health

| Component | Status | Details |
|-----------|--------|---------|
`;

  for (const c of health.components) {
    md += `| ${c.name} | ${statusEmoji[c.status]} ${c.status} | ${c.message || '—'} |\n`;
  }

  md += `
---

## Metrics

### Tasks
| Metric | Count |
|--------|-------|
| Total | ${state.totalTasks} |
| Open | ${state.openTasks} |
| In Progress | ${state.inProgressTasks} |
| Blocked | ${state.blockedTasks} |
| Completed | ${state.completedTasks} |

### Agents
| Metric | Count |
|--------|-------|
| Total | ${state.totalAgents} |
| Active | ${state.activeAgents} |
| Blocked | ${state.blockedAgents} |

### Pull Requests
| Metric | Count |
|--------|-------|
| Open | ${state.openPRs} |
| Pending CI | ${state.pendingCIPRs} |
| Ready to Merge | ${state.readyToMergePRs} |

### Signals
| Metric | Count |
|--------|-------|
| Active | ${state.activeSignals} |
| Critical | ${state.criticalSignals} |
`;

  if (state.blockers.length > 0) {
    md += `
---

## ⚠️ Blockers

`;
    for (const blocker of state.blockers) {
      md += `- ${blocker}\n`;
    }
  }

  if (health.recommendations.length > 0) {
    md += `
---

## Recommendations

`;
    for (const rec of health.recommendations) {
      md += `- ${rec}\n`;
    }
  }

  return md;
}

// Save to file
const dashboard = await generateHealthDashboard(coordinator);
fs.writeFileSync('.agents/HEALTH.md', dashboard);
```

---

## GitHub Actions Workflow Monitoring

### Check Recent Runs

```typescript
const workflows = coordinator.getWorkflows();

const runs = await workflows.getRecentRuns(undefined, 20);

console.log('Recent Workflow Runs:');
for (const run of runs) {
  const status = run.conclusion === 'success' ? '✅' : 
                 run.conclusion === 'failure' ? '❌' : '⏳';
  console.log(`${status} ${run.name} (${run.headBranch})`);
}
```

### Check Failed Runs

```typescript
const failed = await workflows.getFailedRuns(5);

if (failed.length > 0) {
  console.log('⚠️ Failed Workflow Runs:');
  for (const run of failed) {
    console.log(`  ❌ ${run.name} - ${run.headBranch}`);
    console.log(`     ${run.url}`);
  }
}
```

### Check for Running Agents

```typescript
const isRunning = await workflows.isAnyAgentRunning();

if (isRunning) {
  console.log('⏳ Agent workflows currently running');
} else {
  console.log('✅ No agent workflows running');
}
```

---

## Alerting

### Basic Alert System

```typescript
async function checkAlerts(coordinator: Coordinator) {
  const state = await coordinator.getState();
  const alerts: string[] = [];
  
  // Critical health
  if (state.health === 'critical') {
    alerts.push('🔴 CRITICAL: System health is critical');
  }
  
  // Critical signals
  if (state.criticalSignals > 0) {
    alerts.push(`🔴 ${state.criticalSignals} critical signal(s) active`);
  }
  
  // Blocked agents
  if (state.blockedAgents > 0) {
    alerts.push(`⚠️ ${state.blockedAgents} agent(s) blocked`);
  }
  
  // Blocked tasks
  if (state.blockedTasks > 2) {
    alerts.push(`⚠️ ${state.blockedTasks} tasks blocked`);
  }
  
  // Task queue growing
  if (state.openTasks > 20) {
    alerts.push(`⚠️ Task queue large: ${state.openTasks} open tasks`);
  }
  
  // PRs ready but not merging
  if (state.readyToMergePRs > 3) {
    alerts.push(`⚠️ ${state.readyToMergePRs} PRs ready to merge`);
  }
  
  return alerts;
}

const alerts = await checkAlerts(coordinator);
if (alerts.length > 0) {
  console.log('ALERTS:');
  for (const alert of alerts) {
    console.log(`  ${alert}`);
  }
}
```

---

## Logging Best Practices

### Coordination Run Logs

Create logs in `.agents/decisions/`:

```typescript
async function logCoordinationRun(result: CoordinationRunResult) {
  const date = new Date().toISOString().split('T')[0];
  const filename = `.agents/decisions/run-${date}.md`;
  
  const log = `
# Coordination Run: ${result.timestamp}

## Summary
- Duration: ${result.duration}ms
- Actions Executed: ${result.actionsExecuted}
- Actions Failed: ${result.actionsFailed}
- PRs Merged: ${result.prsMerged}
- Tasks Assigned: ${result.tasksAssigned}
- Signals Created: ${result.signalsCreated}

## Decisions

${result.decisions.map(d => `
### ${d.action}: ${d.target}
- Priority: ${d.priority}
- Reason: ${d.reason}
`).join('\n')}

${result.errors.length > 0 ? `
## Errors

${result.errors.map(e => `- ${e}`).join('\n')}
` : ''}

## State After Run

| Metric | Value |
|--------|-------|
| Health | ${result.state.health} |
| Open Tasks | ${result.state.openTasks} |
| Active Agents | ${result.state.activeAgents} |
| Open PRs | ${result.state.openPRs} |
`;

  fs.appendFileSync(filename, log);
}
```

---

## Troubleshooting Indicators

### System Degradation Signs

| Indicator | Healthy | Warning | Critical |
|-----------|---------|---------|----------|
| Blocked agents | 0 | 1-2 | 3+ |
| Blocked tasks | 0-1 | 2-5 | 6+ |
| Critical signals | 0 | 1 | 2+ |
| Task queue | <15 | 15-30 | 30+ |
| Failing PRs | 0-1 | 2-3 | 4+ |

### Common Issues

**Task Queue Growing:**
- Not enough agents
- Agents blocked
- Dependencies not completing

**Many Blocked Tasks:**
- Circular dependencies
- External blockers
- Missing agents

**Agents Not Running:**
- Workflow disabled
- API key issues
- Rate limiting

**PRs Not Merging:**
- CI failing
- Missing labels
- Merge conflicts

---

## Regular Maintenance

### Daily Checks

1. Check system health status
2. Review any critical signals
3. Check for stuck PRs
4. Review failed workflow runs

### Weekly Checks

1. Review task completion rate
2. Check agent activity logs
3. Clean up resolved signals
4. Archive completed tasks

### Monthly Checks

1. Review agent roster (right number?)
2. Check for stale tasks
3. Update agent skills if needed
4. Review coordination logs for patterns

---

## Next Steps

- [Troubleshooting Guide](../troubleshooting.md)
- [Coordinator Guide](./coordinator.md)
- [Auto-Merge Guide](./auto-merge.md)
