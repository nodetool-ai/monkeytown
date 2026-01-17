# DevOps Runbook

**ChaosArchitect** | `runbook.md` | Emergency Procedures and On-Call Documentation

---

## 1. On-Call Protocol

### 1.1 Escalation Matrix

| Severity | Definition | Response Time | Escalation Path |
|----------|------------|---------------|-----------------|
| **P1 - Critical** | System down, no witnesses can connect | 15 minutes | GitHub Alert → On-Call Phone → Emergency Channel |
| **P2 - High** | Degraded service, partial functionality | 1 hour | GitHub Alert → On-Call Slack → Resolve |
| **P3 - Medium** | Non-critical failure, workaround exists | 24 hours | Weekly Review → Next Sprint |
| **P4 - Low** | Visual issues, cosmetic problems | Next Sprint | Backlog |

### 1.2 On-Call Rotation

```
Current On-Call: auto-rotates weekly
Rotation Period: Sunday 00:00 UTC
Primary Channel: #monkeytown-emergencies (Slack)
Backup Channel: github.com/anomalyco/monkeytown/issues
```

### 1.3 Alert Sources

| Source | Trigger | Channel |
|--------|---------|---------|
| GitHub Actions | Workflow failure | #github-actions |
| Vercel | Deployment failure, high latency | #deployments |
| Uptime Robot | 5-minute downtime | #on-call |
| Custom Metrics | Custom thresholds exceeded | #metrics |

---

## 2. Emergency Procedures

### 2.1 Event Stream Failure

**Symptoms**: Witnesses report no real-time updates, frozen visualization

**Diagnosis**:
```bash
# Check if event stream service is running
curl -s https://api.monkeytown.ai/health | jq '.eventStream'

# Check recent events in logs
kubectl logs -l app=event-stream --tail=100 | grep ERROR
```

**Mitigation Steps**:
```
1. Check service health endpoint
   └─ If down: Restart event-stream service
   
2. Check Redis connectivity
   └─ If disconnected: Verify Redis credentials in secrets
   
3. Check for memory pressure
   └─ If OOM: Scale up event-stream pods
   
4. If persistent: Rollback to previous deployment
   └─ kubectl rollout undo deployment/event-stream
```

**Recovery Time Objective**: 5 minutes
**Recovery Point Objective**: Events during outage lost (acceptable per architecture)

### 2.2 Agent Workflow Failure

**Symptoms**: Agent PRs not opening, architecture documents stale

**Diagnosis**:
```bash
# Check recent workflow runs
gh run list --workflow=architect.yml --limit=10

# Check specific run logs
gh run view <run-id> --log

# Verify GitHub token permissions
gh auth token
```

**Mitigation Steps**:
```
1. Check if workflow ran
   └─ If not: Verify schedule trigger is active
   
2. Check workflow permissions
   └─ If permission error: Update workflow permissions in repo settings
   
3. Check API rate limits
   └─ If rate limited: Wait 1 hour, retry manually
   
4. Manual trigger as last resort
   └─ gh workflow run architect.yml
```

**Recovery Time Objective**: 1 hour
**Data Loss**: Agent output for missed runs (agent produces or doesn't)

### 2.3 Deployment Failure

**Symptoms**: Build succeeds but deployment fails, 502 errors

**Diagnosis**:
```bash
# Check Vercel deployment status
vercel --token=$VERCEL_TOKEN ls --limit=5

# Check build logs
vercel --token=$VERCEL_TOKEN logs <deployment-url>

# Verify environment variables
vercel --token=$VERCEL_TOKEN env list
```

**Mitigation Steps**:
```
1. Identify failure point in build logs
   └─ Common: missing environment variable, dependency failure
   
2. If build error: Fix in codebase, merge PR
   
3. If deployment error: Check Vercel quota
   └─ If quota exceeded: Wait for next billing cycle
   
4. Rollback to previous deployment
   └─ vercel --token=$VERCEL_TOKEN rollback <deployment-url>
```

**Recovery Time Objective**: 30 minutes
**Rollback Command**: `vercel rollback <deployment-url>`

### 2.4 Database Corruption (Future Phase)

**Symptoms**: Query failures, data inconsistency errors

**Diagnosis**:
```bash
# Check PostgreSQL connection
pg_isready -h $PG_HOST -p $PG_PORT

# Check for corruption
psql $PG_DATABASE -c "SELECT * FROM pg_tables;"

# Check recent backup
aws s3 ls s3://monkeytown-backups/postgresql/ | tail -5
```

**Mitigation Steps**:
```
1. Stop all writers (pause agent workflows)
   └─ Disable scheduled workflows temporarily
   
2. Restore from latest backup
   └─ pg_restore -h $PG_HOST -U $PG_USER -d $PG_DATABASE latest.dump
   
3. Verify data integrity
   └─ Run consistency checks
   
4. Resume operations gradually
   └─ Enable one workflow at a time
```

**Recovery Time Objective**: 1 hour
**Recovery Point Objective**: Last backup (24h data loss possible)

### 2.5 Security Incident

**Symptoms**: Unauthorized access, data leak, suspicious activity

**Diagnosis**:
```bash
# Check recent GitHub activity
gh api repos/owner/repo/hooks

# Check environment variable access
gh api repos/owner/repo/actions/secrets

# Review audit logs
gh api repos/owner/repo/audit-log --params '{"direction": "desc"}'
```

**Mitigation Steps**:
```
1. Identify scope of compromise
   └─ Check which secrets may have been exposed
   
2. Rotate exposed secrets immediately
   └─ GitHub: Delete and recreate secrets
   └─ API keys: Revoke and regenerate
   
3. Audit repository access
   └─ Remove unauthorized collaborators
   └─ Review webhook destinations
   
4. Document incident in .monkeytown/security/incidents/
   └─ Timeline, impact, remediation
   
5. Notify stakeholders if required
   └─ Depends on data sensitivity
```

**Recovery Time Objective**: 2 hours (for active mitigation)
**Escalation**: Contact security team for P0 incidents

---

## 3. Rollback Procedures

### 3.1 Web Application Rollback

```bash
# List recent deployments
vercel --token=$VERCEL_TOKEN ls --limit=10

# Get current production URL
vercel --token=$VERCEL_TOKEN alias list

# Rollback to previous deployment
vercel --token=$VERCEL_TOKEN rollback <previous-deployment-url>

# Verify rollback
curl -I https://monkeytown.ai
```

### 3.2 Database Rollback (Point-in-Time Recovery)

```bash
# Stop application traffic
# (Coordinate with on-call)

# Identify recovery point
aws rds describe-db-snapshots --db-instance-identifier monkeytown-db

# Restore to new instance
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-id monkeytown-db-restored \
  --db-snapshot-identifier monkeytown-snapshot-2024-01-15

# Update application to point to new instance
# (Update secrets in GitHub)

# Verify data integrity
# (Run application tests)

# Cut over traffic
# (Update DNS if needed)

# Deprecate old instance after 24h verification
```

### 3.3 Infrastructure Rollback

```bash
# Terraform state rollback
terraform state list
terraform state mv <resource> <backup-name>

# Kubernetes rollback
kubectl rollout undo deployment/monkeytown-web
kubectl rollout status deployment/monkeytown-web

# Helm rollback
helm rollback monkeytown 3  # Rollback to revision 3
```

---

## 4. Monitoring Reference

### 4.1 Key Metrics Dashboard

| Metric | Source | Warning Threshold | Critical Threshold |
|--------|--------|-------------------|---------------------|
| Response Time p99 | Vercel Analytics | > 500ms | > 1000ms |
| Error Rate | Vercel Analytics | > 1% | > 5% |
| Active Witnesses | Event Stream | < 5 for 1h | < 1 for 1h |
| Agent Run Success | GitHub Actions | < 90% | < 80% |
| Bundle Size | Build | > 200KB | > 300KB |
| WebSocket Connections | Event Stream | < 10 | < 1 |

### 4.2 Log Locations

| Component | Log Location | Query Command |
|-----------|--------------|---------------|
| Web App | Vercel Logs | `vercel logs --token=$VERCEL_TOKEN` |
| Event Stream | CloudWatch | Filter: `service=event-stream ERROR` |
| GitHub Actions | GitHub UI | https://github.com/repo/actions |
| Database | PostgreSQL Logs | `SELECT * FROM pg_stat_activity WHERE state = 'active'` |

### 4.3 Health Check Endpoints

| Endpoint | Purpose | Expected Response |
|----------|---------|-------------------|
| `https://monkeytown.ai/health` | Overall health | `{ status: "healthy" }` |
| `https://monkeytown.ai/api/ready` | Readiness probe | `{ ready: true }` |
| `https://monkeytown.ai/api/metrics` | Prometheus metrics | Prometheus format |

---

## 5. Configuration Reference

### 5.1 Environment Variables

| Variable | Source | Location | Rotation Frequency |
|----------|--------|----------|---------------------|
| `MINIMAX_API_KEY` | GitHub Secrets | `secrets.MINIMAX_API_KEY` | Quarterly |
| `VERCEL_TOKEN` | GitHub Secrets | `secrets.VERCEL_TOKEN` | Semi-annually |
| `GITHUB_TOKEN` | GitHub Auto | Automatic | Auto-rotates |
| `REDIS_URL` | Vercel Env | Environment | Annually |
| `DATABASE_URL` | Vercel Env | Environment | Annually |

### 5.2 Service Ports

| Service | Port | Protocol | Access |
|---------|------|----------|--------|
| Web App | 3000 | HTTP | Public |
| Event Stream | 8080 | WebSocket | Internal |
| Redis | 6379 | TCP | Internal only |
| PostgreSQL | 5432 | TCP | Internal only |

### 5.3 External Dependencies

| Dependency | Purpose | SLA | Status URL |
|------------|---------|-----|------------|
| GitHub | Repository, Actions | 99.9% | https://www.githubstatus.com |
| Vercel | Hosting, Functions | 99.95% | https://www.vercel-status.com |
| Cloudflare | DNS, CDN | 100% | https://www.cloudflarestatus.com |
| OpenAI API | Agent cognition | 99.5% | https://status.openai.com |

---

## 6. Post-Incident Procedures

### 6.1 Incident Documentation

All P1 and P2 incidents must be documented within 24 hours:

```markdown
# Incident Report: [Incident ID]

## Summary
[Brief description of what happened]

## Timeline (UTC)
| Time | Event |
|------|-------|
| 00:00 | Alert triggered |
| 00:15 | On-call acknowledged |
| 00:30 | Root cause identified |
| 01:00 | Mitigation applied |
| 01:30 | Full recovery |

## Root Cause
[Technical explanation of what went wrong]

## Impact
- Witnesses affected: [number]
- Duration: [time]
- Data loss: [none/some]

## Resolution
[What was done to fix it]

## Follow-up Actions
| Action | Owner | Due Date |
|--------|-------|----------|
| Add monitoring | @on-call | +7 days |
| Update runbook | @on-call | +3 days |

## Lessons Learned
[What could be improved]
```

### 6.2 Retrospective Schedule

| Incident Severity | Retrospective Deadline |
|-------------------|------------------------|
| P1 - Critical | Within 48 hours |
| P2 - High | Within 1 week |
| P3 - Medium | Next sprint planning |

### 6.3 Improvement Tracking

All action items from incidents are tracked in:

```
.monkeytown/decisions/incidents/
```

Items are tagged with:
- `[action]` - Required remediation
- `[investigation]` - Further analysis needed
- `[monitoring]` - Additional alerting required

---

## 7. Communication Templates

### 7.1 Incident Declaration

```
@monkeytown-oncall @engineering

🚨 INCIDENT DECLARED: [Title]

Severity: P1/P2/P3
Status: Investigating / Identified / Mitigating / Resolved
Impact: [Brief description]

Current action: [What we're doing now]
ETA: [If known]

Updates will be posted every 30 minutes.
```

### 7.2 Resolution Announcement

```
✅ INCIDENT RESOLVED: [Title]

Duration: [Start] to [End] ([duration])
Root cause: [Brief explanation]
Impact: [Summary of effects]

Full report will be posted in .monkeytown/decisions/incidents/
```

### 7.3 Maintenance Notification

```
🔧 SCHEDULED MAINTENANCE: [Description]

Window: [Start] to [End] UTC
Impact: [Expected effect on service]

Services affected:
- [Service 1]
- [Service 2]

Rollback plan: [If needed]
Contact: @monkeytown-oncall
```

---

## 8. Cross-References

- **Architecture**: `.monkeytown/architecture/infrastructure.md` (service topology)
- **Architecture**: `.monkeytown/architecture/evolution-plan.md` (disaster recovery)
- **Security**: `.monkeytown/security/` (incident response)
- **Vision**: `.monkeytown/vision/manifesto.md` (system philosophy)
- **GitHub Actions**: `.github/workflows/` (deployment workflows)

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown DevOps*
