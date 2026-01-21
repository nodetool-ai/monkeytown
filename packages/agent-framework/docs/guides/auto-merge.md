# Auto-Merge Configuration Guide

This guide covers configuring automatic PR merging when CI checks pass.

## Overview

Auto-merge automatically merges pull requests when:
1. All required CI checks pass
2. PR has an auto-merge label
3. PR does not have blocking labels
4. PR has no merge conflicts

---

## Quick Setup

### 1. Add Auto-Merge Workflow

Create `.github/workflows/auto-merge.yml`:

```yaml
name: Auto-Merge
on:
  check_suite:
    types: [completed]
  pull_request:
    types: [labeled, synchronize]
  workflow_run:
    workflows: ["CI"]
    types: [completed]

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            const { owner, repo } = context.repo;
            
            const autoMergeLabels = ['auto-merge', 'ready-to-merge'];
            const blockedLabels = ['do-not-merge', 'wip', 'blocked'];
            
            const { data: prs } = await github.rest.pulls.list({
              owner, repo, state: 'open'
            });
            
            for (const pr of prs) {
              // Check labels
              const hasAutoLabel = pr.labels.some(l => 
                autoMergeLabels.includes(l.name)
              );
              const hasBlockedLabel = pr.labels.some(l => 
                blockedLabels.includes(l.name)
              );
              
              if (!hasAutoLabel || hasBlockedLabel) continue;
              
              // Check mergeable
              const { data: prDetails } = await github.rest.pulls.get({
                owner, repo, pull_number: pr.number
              });
              
              if (!prDetails.mergeable) {
                console.log(`PR #${pr.number}: Not mergeable`);
                continue;
              }
              
              // Check CI status
              const { data: checks } = await github.rest.checks.listForRef({
                owner, repo, ref: pr.head.sha
              });
              
              const allPass = checks.check_runs.every(c => 
                c.conclusion === 'success' || 
                c.conclusion === 'skipped' ||
                c.conclusion === 'neutral'
              );
              const anyRunning = checks.check_runs.some(c => 
                c.status === 'in_progress' || c.status === 'queued'
              );
              
              if (!allPass || anyRunning) {
                console.log(`PR #${pr.number}: CI not passing`);
                continue;
              }
              
              // Merge
              console.log(`Merging PR #${pr.number}`);
              await github.rest.pulls.merge({
                owner, repo, 
                pull_number: pr.number, 
                merge_method: 'squash'
              });
              
              // Delete branch
              try {
                await github.rest.git.deleteRef({
                  owner, repo, 
                  ref: `heads/${pr.head.ref}`
                });
              } catch (e) {
                console.log(`Could not delete branch: ${e.message}`);
              }
            }
```

### 2. Create Labels

In your repository, create these labels:

| Label | Color | Description |
|-------|-------|-------------|
| `auto-merge` | `#0E8A16` | Merge when CI passes |
| `ready-to-merge` | `#0E8A16` | Alias for auto-merge |
| `do-not-merge` | `#B60205` | Do not auto-merge |
| `wip` | `#FBCA04` | Work in progress |
| `blocked` | `#B60205` | Blocked by issue |

---

## Configuration Options

### Using PRManager

```typescript
import { PRManager } from '@monkeytown/agent-framework';
import { Octokit } from '@octokit/rest';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const prManager = new PRManager(octokit, 'owner', 'repo', {
  // Enable/disable auto-merge
  enabled: true,
  
  // Required CI checks (by name)
  requiredChecks: ['lint', 'test', 'build'],
  
  // Merge method
  mergeMethod: 'squash', // 'merge' | 'squash' | 'rebase'
  
  // Delete branch after merge
  deleteBranchAfterMerge: true,
  
  // Labels that prevent auto-merge
  blockedLabels: ['do-not-merge', 'wip', 'blocked', 'needs-review'],
  
  // Labels that enable auto-merge
  autoMergeLabels: ['auto-merge', 'ready-to-merge']
});
```

### Using Coordinator

```typescript
import { createCoordinator } from '@monkeytown/agent-framework';

const coordinator = createCoordinator({
  owner: 'your-org',
  repo: 'your-repo',
  githubToken: process.env.GITHUB_TOKEN!,
  autoMerge: {
    enabled: true,
    requiredChecks: ['CI', 'Security Scan'],
    mergeMethod: 'squash',
    deleteBranchAfterMerge: true,
    blockedLabels: ['do-not-merge', 'needs-human-review'],
    autoMergeLabels: ['auto-merge']
  }
});
```

---

## Merge Methods

### Squash Merge (Recommended)

```yaml
mergeMethod: 'squash'
```

- Combines all commits into one
- Clean history
- Easier to revert
- Best for feature branches

### Merge Commit

```yaml
mergeMethod: 'merge'
```

- Preserves all commits
- Creates merge commit
- Full history preserved

### Rebase

```yaml
mergeMethod: 'rebase'
```

- Rebases commits onto base
- Linear history
- No merge commits
- Can cause issues with force pushes

---

## Label Strategies

### Simple Strategy

Two labels:
- `auto-merge` - Merge when ready
- `do-not-merge` - Never auto-merge

### Team Review Strategy

Multiple labels:
- `ready-to-merge` - Reviewed and approved
- `needs-review` - Waiting for review
- `wip` - Work in progress
- `blocked` - Has issues

### Quality Gate Strategy

Sequential labels:
- `qa-passed` - QA approved
- `security-passed` - Security approved
- `ready-to-merge` - All checks passed

---

## Required Checks

### Specifying Required Checks

```typescript
requiredChecks: [
  'lint',           // ESLint
  'test',           // Jest/Vitest
  'build',          // TypeScript/Webpack
  'security-scan',  // CodeQL/Snyk
  'e2e'             // Playwright/Cypress
]
```

### Finding Check Names

Check names come from your CI workflow job names:

```yaml
# .github/workflows/ci.yml
jobs:
  lint:           # Check name: "lint"
    ...
  test:           # Check name: "test"
    ...
  build:          # Check name: "build"
    ...
```

---

## Auto-Merge Workflow

### How It Works

```
1. Agent creates PR
           ↓
2. Agent adds 'auto-merge' label
           ↓
3. CI runs (lint, test, build)
           ↓
4. Auto-merge workflow triggers
           ↓
5. Checks:
   - Has auto-merge label? ✓
   - No blocking labels? ✓
   - All CI passing? ✓
   - No conflicts? ✓
           ↓
6. Merge PR
           ↓
7. Delete branch
```

### Trigger Events

The workflow triggers on:

| Event | When |
|-------|------|
| `check_suite.completed` | Any check finishes |
| `pull_request.labeled` | Label added to PR |
| `pull_request.synchronize` | PR updated |
| `workflow_run.completed` | Another workflow finishes |

---

## Handling Edge Cases

### Merge Conflicts

```typescript
if (!prDetails.mergeable) {
  console.log(`PR #${pr.number}: Has merge conflicts`);
  // Optionally: Add 'needs-rebase' label
  await github.rest.issues.addLabels({
    owner, repo, issue_number: pr.number,
    labels: ['needs-rebase']
  });
  continue;
}
```

### Flaky CI

For flaky tests, consider:

```typescript
// Retry once on failure
const maxRetries = 1;
let merged = false;

for (let i = 0; i <= maxRetries && !merged; i++) {
  try {
    await github.rest.pulls.merge({
      owner, repo, pull_number: pr.number,
      merge_method: 'squash'
    });
    merged = true;
  } catch (e) {
    if (i < maxRetries) {
      console.log(`Retrying merge for PR #${pr.number}`);
      await new Promise(r => setTimeout(r, 5000));
    }
  }
}
```

### Protected Branches

For protected branches, ensure:
1. GitHub App has bypass permissions, or
2. Use a PAT with admin access, or
3. Auto-merge is allowed in branch protection rules

---

## Monitoring Auto-Merge

### Check Merge Status

```typescript
const stats = await prManager.getStats();

console.log(`Open PRs: ${stats.open}`);
console.log(`Pending CI: ${stats.pendingCI}`);
console.log(`Ready to merge: ${stats.readyToMerge}`);
console.log(`Failing CI: ${stats.failing}`);
```

### List Ready PRs

```typescript
const ready = await prManager.getReadyToMerge();

for (const pr of ready) {
  console.log(`#${pr.number}: ${pr.title}`);
}
```

### Manual Trigger

```typescript
// Merge all ready PRs now
const results = await prManager.autoMergeReady();

for (const result of results) {
  if (result.success) {
    console.log(`Merged: #${result.pullRequest.number}`);
  } else {
    console.log(`Failed: #${result.pullRequest.number} - ${result.error}`);
  }
}
```

---

## Security Considerations

### Token Permissions

The `GITHUB_TOKEN` needs:
- `contents: write` - To merge PRs
- `pull-requests: write` - To update PRs

### Branch Protection

Consider these branch protection settings:
- ✅ Require status checks
- ✅ Require branches to be up to date
- ❓ Require review (disable for auto-merge)
- ✅ Allow auto-merge

### Audit Trail

All merges are logged in:
- GitHub PR timeline
- Git history
- Workflow logs

---

## Troubleshooting

### PRs Not Merging

**Check 1:** Does PR have auto-merge label?
```bash
gh pr view <number> --json labels
```

**Check 2:** Does PR have blocking label?
```bash
gh pr view <number> --json labels
```

**Check 3:** Are all checks passing?
```bash
gh pr checks <number>
```

**Check 4:** Is PR mergeable?
```bash
gh pr view <number> --json mergeable
```

### Workflow Not Triggering

1. Check workflow is enabled in Actions tab
2. Verify trigger events match your CI workflow name
3. Check workflow has correct permissions

### Merge Failing

Common errors:
- `"Not mergeable"` - Has conflicts
- `"Required status check is not passing"` - CI failing
- `"Cannot merge"` - Branch protection blocking

---

## Best Practices

### DO

✅ Use squash merge for clean history
✅ Delete branches after merge
✅ Require CI checks before merge
✅ Use clear label names
✅ Log all merge actions

### DON'T

❌ Auto-merge without any CI checks
❌ Skip security scans
❌ Ignore merge conflicts
❌ Use for critical production branches without review

---

## Next Steps

- [Coordinator Guide](./coordinator.md)
- [Monitoring Guide](./monitoring.md)
- [Troubleshooting Guide](../troubleshooting.md)
