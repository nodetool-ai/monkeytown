# Troubleshooting Guide

Common issues and their solutions.

---

## Agent Issues

### Agent Not Picking Up Tasks

**Symptoms:**
- Tasks remain `open` with assignee set
- No workflow runs for the agent

**Solutions:**

1. **Check workflow is enabled:**
   ```bash
   # In GitHub: Actions tab → Agent workflow → Enable
   ```

2. **Check schedule:**
   ```yaml
   # Verify cron syntax
   on:
     schedule:
       - cron: "0 */6 * * *"  # Every 6 hours
   ```

3. **Check task assignee matches exactly:**
   ```yaml
   # Task file
   assignee: FrontendAgent  # Must match name exactly
   
   # Agent registry
   name: FrontendAgent  # Case-sensitive
   ```

4. **Manually trigger workflow:**
   - Go to Actions → Agent workflow → Run workflow

---

### Agent Stuck in Running State

**Symptoms:**
- Agent status shows `running`
- No activity in workflow logs
- Other tasks waiting

**Solutions:**

1. **Check workflow timeout:**
   ```yaml
   - uses: anomalyco/opencode/github@latest
     timeout-minutes: 15  # Add timeout
   ```

2. **Cancel stuck workflow:**
   - Go to Actions → Running workflow → Cancel

3. **Reset agent status:**
   ```typescript
   const agents = coordinator.getAgents();
   await agents.updateStatus('agent-id', 'active');
   await agents.save();
   ```

---

### Agent Not Creating PRs

**Symptoms:**
- Task marked `in_progress` or `completed`
- No PR created
- Changes not saved

**Solutions:**

1. **Check permissions in workflow:**
   ```yaml
   permissions:
     contents: write      # Required for commits
     pull-requests: write # Required for PRs
   ```

2. **Check GitHub token:**
   ```yaml
   env:
     GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

3. **Review workflow logs for errors**

---

## Task Issues

### Tasks Not Being Assigned

**Symptoms:**
- Tasks remain unassigned
- Coordinator runs but doesn't assign

**Solutions:**

1. **Check agent availability:**
   ```typescript
   const available = registry.getAvailable();
   console.log(`Available agents: ${available.length}`);
   ```

2. **Check maxConcurrentTasks:**
   ```yaml
   # Agent registry
   maxConcurrentTasks: 2  # Increase if needed
   ```

3. **Check for skill mismatch:**
   ```yaml
   # Task
   labels: [frontend, react]
   
   # Agent must have matching skills
   skills: [frontend, react]
   ```

---

### Circular Dependencies

**Symptoms:**
- Tasks remain `open` forever
- `canStart()` always returns false

**Solutions:**

1. **Identify the cycle:**
   ```typescript
   async function findCycles(taskManager: TaskManager) {
     const tasks = await taskManager.loadAll();
     const graph = new Map<string, string[]>();
     
     for (const tf of tasks) {
       graph.set(tf.task.id, tf.task.dependencies);
     }
     
     // DFS to find cycles...
   }
   ```

2. **Break the dependency:**
   - Remove one dependency
   - Split task into smaller tasks
   - Complete one task manually

---

### Blocked Tasks Not Unblocking

**Symptoms:**
- Task shows `blocked`
- Dependency is `completed`
- Task doesn't become `open`

**Solutions:**

1. **Check dependency ID matches:**
   ```yaml
   # Dependent task
   dependencies:
     - implement-api  # Must match exactly
   
   # Dependency task
   id: implement-api  # This ID
   ```

2. **Refresh task state:**
   ```typescript
   const canStart = await tasks.canStart('task-id');
   if (canStart) {
     await tasks.update('task-id', { status: 'open' });
   }
   ```

---

## PR Issues

### PRs Not Auto-Merging

**Symptoms:**
- PR has `auto-merge` label
- CI passing
- PR not merged

**Solutions:**

1. **Check for blocking labels:**
   ```bash
   gh pr view 123 --json labels
   # Should not have: do-not-merge, wip, blocked
   ```

2. **Check mergeable status:**
   ```bash
   gh pr view 123 --json mergeable
   # Should be "true"
   ```

3. **Check all CI checks:**
   ```bash
   gh pr checks 123
   # All should be passing
   ```

4. **Check auto-merge workflow:**
   - Verify workflow is enabled
   - Check workflow logs for errors

---

### CI Failing on Agent PRs

**Symptoms:**
- Agent creates PR
- CI fails
- PR not merged

**Solutions:**

1. **Review CI failure:**
   ```bash
   gh pr checks 123
   # Find failing check, review logs
   ```

2. **Check if agent ran tests:**
   - Agent prompt should include running tests

3. **Fix common issues:**
   - Missing dependencies
   - Type errors
   - Lint failures

---

### Merge Conflicts

**Symptoms:**
- PR not mergeable
- Conflict markers in files

**Solutions:**

1. **Rebase PR:**
   ```bash
   git checkout feature-branch
   git fetch origin main
   git rebase origin/main
   git push --force
   ```

2. **Have agent recreate PR:**
   - Close conflicting PR
   - Agent will create new PR on next run

3. **Add conflict detection:**
   ```yaml
   # Remove 'auto-merge' label if conflicts
   if (!prDetails.mergeable) {
     await github.rest.issues.removeLabel({
       owner, repo, issue_number: pr.number,
       name: 'auto-merge'
     });
   }
   ```

---

## Signal Issues

### Signals Not Being Read

**Symptoms:**
- Signals in folder
- Agents don't respond

**Solutions:**

1. **Check signal naming:**
   ```bash
   # Correct: URGENT-security-issue.md
   # Wrong: security-issue.md
   ```

2. **Check agent prompt:**
   ```
   ## IMMEDIATE ACTIONS
   1. Check `.agents/signals/URGENT-*.md`
   ```

3. **Check signal format:**
   ```markdown
   # URGENT: Title Here
   
   **From:** AgentA
   **To:** AgentB  ← Must match target agent
   **Priority:** CRITICAL
   **Status:** active  ← Must be active
   ```

---

### Critical Signals Not Escalating

**Symptoms:**
- Critical signal active for hours
- No escalation

**Solutions:**

1. **Check coordinator schedule:**
   - Should run at least every 30 minutes

2. **Add manual escalation:**
   ```typescript
   const criticalSignals = await signals.getCritical();
   for (const signal of criticalSignals) {
     const age = Date.now() - new Date(signal.created).getTime();
     if (age > 60 * 60 * 1000) { // 1 hour
       console.log(`ESCALATE: ${signal.title}`);
     }
   }
   ```

---

## Coordinator Issues

### Coordinator Not Running

**Symptoms:**
- No recent coordinator runs
- No auto-merging happening
- No task assignments

**Solutions:**

1. **Check workflow is enabled:**
   - Actions → coordinator.yml → Enable workflow

2. **Check schedule:**
   ```yaml
   on:
     schedule:
       - cron: "0,30 * * * *"  # Every 30 mins
   ```

3. **Manually trigger:**
   - Actions → Coordinator → Run workflow

---

### Coordinator Errors

**Symptoms:**
- Coordinator runs but fails
- Errors in logs

**Common Errors:**

1. **Rate limiting:**
   ```
   Error: API rate limit exceeded
   ```
   - Reduce frequency
   - Use separate tokens
   - Add caching

2. **Permission denied:**
   ```
   Error: Resource not accessible
   ```
   - Check workflow permissions:
     ```yaml
     permissions:
       contents: write
       pull-requests: write
     ```

3. **Token issues:**
   ```
   Error: Bad credentials
   ```
   - Check GITHUB_TOKEN is available
   - Check API key secrets

---

## API/LLM Issues

### API Key Not Working

**Symptoms:**
- Agent fails immediately
- Authentication error in logs

**Solutions:**

1. **Check secret is set:**
   - Settings → Secrets → Actions
   - Verify ANTHROPIC_API_KEY or OPENAI_API_KEY

2. **Check secret name matches:**
   ```yaml
   env:
     ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
   ```

3. **Test API key locally:**
   ```bash
   curl https://api.anthropic.com/v1/messages \
     -H "x-api-key: $ANTHROPIC_API_KEY" \
     -H "content-type: application/json"
   ```

---

### Rate Limiting

**Symptoms:**
- Agents fail randomly
- "Rate limit exceeded" errors

**Solutions:**

1. **Stagger agent schedules:**
   ```yaml
   # Agent 1: :00
   - cron: "0 */6 * * *"
   
   # Agent 2: :15
   - cron: "15 */6 * * *"
   
   # Agent 3: :30
   - cron: "30 */6 * * *"
   ```

2. **Reduce agent count:**
   - Max 12 agents recommended

3. **Use separate API keys:**
   - One key per agent category

---

### LLM Timeout

**Symptoms:**
- Agent runs for 15 minutes then fails
- "Timeout" in logs

**Solutions:**

1. **Simplify prompt:**
   - Reduce context
   - Be more specific

2. **Increase timeout:**
   ```yaml
   timeout-minutes: 20  # Increase from 15
   ```

3. **Split into smaller tasks:**
   - Break complex tasks into steps

---

## Common Error Messages

### "Maximum agents reached"

```typescript
// Current agents: 12, max: 12
throw new Error(`Maximum agents (${this.config.maxAgents}) reached`);
```

**Solution:**
- Remove unused agents
- Increase maxAgents (not recommended)

### "Agent not found"

```typescript
await registry.updateStatus('unknown-agent', 'active');
// Error: Agent not found
```

**Solution:**
- Check agent ID spelling
- Register the agent first

### "Task dependencies not met"

```typescript
await tasks.canStart('task-with-deps');
// Returns false - dependencies not completed
```

**Solution:**
- Complete dependency tasks first
- Or remove the dependency

### "PR not mergeable"

```typescript
await prManager.merge(123);
// Error: PR not mergeable
```

**Solution:**
- Resolve merge conflicts
- Ensure base branch is up to date

---

## Getting Help

### 1. Check Logs

- GitHub Actions logs
- Coordination run logs in `.agents/decisions/`
- Signal files for context

### 2. Debug Mode

```typescript
// Get full state dump
const state = await coordinator.getState();
console.log(JSON.stringify(state, null, 2));

// Get all decisions without executing
const decisions = await coordinator.makeDecisions();
console.log(JSON.stringify(decisions, null, 2));
```

### 3. Manual Intervention

```bash
# Cancel stuck workflow
gh run cancel <run-id>

# Reset agent status
# Edit .agents/agent-registry.yaml manually

# Clear signals
rm .agents/signals/URGENT-*.md
```

### 4. Restart Fresh

```bash
# Reset all task status to open
for file in .agents/tasks/*.yaml; do
  sed -i 's/status: in_progress/status: open/' "$file"
done

# Clear all agents' assigned tasks
# Edit agent-registry.yaml: assignedTasks: []

# Clear all signals
rm .agents/signals/*.md
```

---

## Prevention

### Regular Maintenance

1. **Daily:** Check health status
2. **Weekly:** Review and clean up signals
3. **Monthly:** Audit agent roster

### Monitoring

- Set up health check alerts
- Monitor workflow failure rates
- Track task completion rates

### Documentation

- Document custom agent configurations
- Keep README updated
- Log significant incidents
