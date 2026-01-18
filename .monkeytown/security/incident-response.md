# Monkeytown Incident Response Plan

**Comprehensive security incident response procedures**

---

## Incident Classification

### Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| **P1 - Critical** | Active exploitation, data breach | Immediate (< 1 hour) | Server compromise, active attack, data exfiltration |
| **P2 - High** | Significant vulnerability, ongoing abuse | < 4 hours | Credential leak, cheating epidemic, DoS attack |
| **P3 - Medium** | Potential vulnerability, limited impact | < 24 hours | XSS vulnerability, information disclosure |
| **P4 - Low** | Minor issue, low risk | < 72 hours | Missing security header, verbose error message |

### Incident Categories

| Category | Code | Description |
|----------|------|-------------|
| Unauthorized Access | INC-AUTH | Accounts compromised, unauthorized access |
| Data Breach | INC-DATA | Sensitive data exposed, exfiltration |
| Denial of Service | INC-DOS | Service unavailable, resource exhaustion |
| Cheating/Exploitation | INC-CHET | Game rule violations, exploits |
| Account Takeover | INC-ATO | Player account hijacking |
| Infrastructure | INC-INFRA | Server compromise, malware |
| Social Engineering | INC-SE | Phishing, impersonation |
| Compliance | INC-COMP | Policy violation, regulatory issue |

---

## Response Team

### Primary Response Team

| Role | Primary | Backup | Contact | Responsibility |
|------|---------|--------|---------|----------------|
| Incident Commander | FounderAI | AlphaOrchestrator | GitHub @founder-ai | Overall coordination, decisions |
| Security Lead | JungleSecurity | ChaosArchitect | GitHub @jungle-security | Technical investigation, containment |
| Operations Lead | ChaosArchitect | MonkeyBuilder | GitHub @chaos-architect | System restoration, infrastructure |
| Communications | TownCrier | ScribbleSimian | GitHub @town-crier | Player communication, updates |
| Developer Lead | MonkeyBuilder | PrimateDesigner | GitHub @monkey-builder | Code fixes, patches |

### On-Call Schedule

| Week | Primary | Secondary |
|------|---------|-----------|
| Week 1-2 | FounderAI | ChaosArchitect |
| Week 3-4 | JungleSecurity | AlphaOrchestrator |
| Week 5-6 | ChaosArchitect | MonkeyBuilder |
| Week 7-8 | AlphaOrchestrator | FounderAI |

---

## Response Procedures

### Phase 1: Detection and Alerting (0-15 minutes)

#### Detection Sources

1. **Automated Alerts**
   - Sentry error alerts
   - Prometheus metric alerts
   - Cloud provider notifications
   - Uptime monitoring

2. **Manual Reports**
   - Player reports
   - Community reports
   - Security researcher reports

3. **Internal Discovery**
   - Code review findings
   - Log analysis
   - Anomaly detection

#### Initial Triage Checklist

```
┌─────────────────────────────────────────────────────────────┐
│  INCIDENT TRIAGE CHECKLIST                                  │
├─────────────────────────────────────────────────────────────┤
│  □ What happened?                                           │
│  □ When did it occur?                                       │
│  □ What systems are affected?                               │
│  □ What is the scope? (users, data, services)               │
│  □ Is it currently ongoing?                                 │
│  □ What is the severity level?                              │
│  □ Who needs to be notified?                                │
│  □ Is there evidence of active exploitation?                │
└─────────────────────────────────────────────────────────────┘
```

#### Alert Template

```markdown
## SECURITY INCIDENT ALERT

**Incident ID:** INC-YYYY-MMDD-###  
**Severity:** P1/P2/P3/P4  
**Category:** [INC-AUTH|INC-DATA|INC-DOS|...]  
**Status:** INVESTIGATING

### Summary
[Brief description of the incident]

### Impact
- Affected users: [number]
- Affected systems: [list]
- Data potentially exposed: [list]

### Timeline
- [timestamp] - Initial detection
- [timestamp] - Triage complete
- [timestamp] - Investigation started

### Current Actions
- [ ] Containment in progress
- [ ] Investigation ongoing
- [ ] Communication prepared

### Assigned
- Incident Commander: [name]
- Security Lead: [name]
```

---

### Phase 2: Containment (15 minutes - 4 hours)

#### Immediate Containment Actions

##### P1 - Critical Containment

```bash
#!/bin/bash
# EMERGENCY CONTAINMENT SCRIPT
# Execute immediately for P1 incidents

# 1. Block attack source IPs
iptables -I INPUT -s $ATTACKER_IP -j DROP

# 2. Disable affected service
docker-compose stop game-server

# 3. Rotate potentially compromised credentials
# (Run credential rotation script)

# 4. Enable enhanced logging
export LOG_LEVEL=debug

# 5. Notify team
curl -X POST $SLACK_WEBHOOK \
  -d "text=🚨 CRITICAL INCIDENT: Service disabled for containment"
```

##### P2 - High Containment

```bash
#!/bin/bash
# ENHANCED CONTAINMENT SCRIPT
# Execute for P2 incidents

# 1. Enable rate limiting
export RATE_LIMIT_STRICT=true

# 2. Disable new player registration
export REGISTRATION_ENABLED=false

# 3. Increase logging verbosity
export LOG_LEVEL=debug

# 4. Notify team
curl -X POST $SLACK_WEBHOOK \
  -d "text=⚠️ HIGH SEVERITY INCIDENT: Enhanced monitoring enabled"
```

#### Isolation Procedures

| Scenario | Containment Action | Rollback Procedure |
|----------|-------------------|-------------------|
| WebSocket attack | Block IP range in Nginx | Remove block after verification |
| Credential leak | Rotate all JWT secrets | Revert to previous secret after patch |
| Data breach | Disable database access | Restore access after investigation |
| Cheating exploitation | Hotfix game validation | Deploy to production after test |
| Server compromise | Isolate affected node | Re-image and redeploy |

#### Evidence Preservation

```
/evidence/
├── incidents/
│   └── INC-YYYY-MM-DD-###
│       ├── logs/
│       │   ├── application.log
│       │   ├── access.log
│       │   └── error.log
│       ├── network/
│       │   ├── tcpdump.pcap
│       │   └── netflow.json
│       ├── database/
│       │   ├── backup.sql
│       │   └── query_log.sql
│       ├── screenshots/
│       │   └── *.png
│       └── notes/
│           ├── timeline.md
│           └── actions.md
```

---

### Phase 3: Investigation (4-24 hours)

#### Investigation Checklist

```
┌─────────────────────────────────────────────────────────────┐
│  INVESTIGATION CHECKLIST                                    │
├─────────────────────────────────────────────────────────────┤
│  □ Timeline reconstruction                                  │
│  □ Attack vector identification                             │
│  □ Scope determination                                      │
│  □ Evidence collection                                     │
│  □ Root cause analysis                                      │
│  □ Vulnerability identification                             │
│  □ Impact assessment                                        │
│  □ Attacker identification (if possible)                    │
└─────────────────────────────────────────────────────────────┘
```

#### Log Analysis Commands

```bash
# WebSocket connection analysis
grep "WebSocket" /var/log/monkeytown/game-server.log | \
  awk '{print $5, $8}' | sort | uniq -c | sort -rn | head -20

# Failed authentication analysis
grep "Authentication failed" /var/log/monkeytown/*.log | \
  awk '{print $NF}' | sort | uniq -c | sort -rn | head -20

# Suspicious IP extraction
grep -E "error|warning" /var/log/monkeytown/*.log | \
  grep -oE "([0-9]{1,3}\.){3}[0-9]{1,3}" | sort | uniq -c | sort -rn

# Rate limit trigger analysis
grep "RATE_LIMIT" /var/log/monkeytown/*.log | \
  awk '{print $8}' | sort | uniq -c | sort -rn
```

#### Investigation Report Template

```markdown
# Incident Investigation Report

**Incident ID:** INC-YYYY-MM-DD-###  
**Date:** YYYY-MM-DD  
**Investigator:** [name]

## Executive Summary
[Brief summary of findings]

## Incident Timeline
| Time | Event | Source |
|------|-------|--------|
| HH:MM | Initial detection | [source] |
| HH:MM | Containment started | [action] |
| HH:MM | Investigation began | [trigger] |
| HH:MM | Root cause identified | [finding] |

## Technical Analysis

### Attack Vector
[Detailed description of how the attack succeeded]

### Affected Systems
| System | Impact | Data Exposed |
|--------|--------|--------------|
| web-01 | Full access | Player PII |
| game-02 | Limited | None |

### Root Cause
[Underlying vulnerability or failure]

### Evidence
- [Evidence item 1]
- [Evidence item 2]
- [Evidence item 3]

## Impact Assessment
- Players affected: [number]
- Data exposed: [list]
- Financial impact: [estimate]
- Reputational impact: [assessment]

## Recommendations
1. [Immediate action]
2. [Short-term action]
3. [Long-term action]
```

---

### Phase 4: Eradication (24-72 hours)

#### Eradication Actions by Incident Type

##### INC-AUTH: Unauthorized Access

```bash
#!/bin/bash
# CREDENTIAL RESET SCRIPT
# Execute for authentication-related incidents

# 1. Identify compromised accounts
psql -c "SELECT id, username FROM players WHERE last_login > '$INCIDENT_START'"

# 2. Force password reset for affected accounts
psql -c "UPDATE players SET must_reset_password = true WHERE id IN (...)"

# 3. Invalidate all active sessions
redis-cli KEYS "session:*" | xargs redis-cli DEL

# 4. Rotate JWT secrets
export JWT_SECRET=$(openssl rand -hex 64)
echo $JWT_SECRET > /secrets/jwt/new-secret

# 5. Notify affected users
./notify-users.sh --template password-reset --user-ids ...
```

##### INC-DOS: Denial of Service

```bash
#!/bin/bash
# DOS MITIGATION SCRIPT
# Execute for DoS attacks

# 1. Update Nginx rate limits
sed -i 's/limit_req_zone.*$/limit_req_zone \$binary_remote_addr zone=one:10m rate=1r\/s;/' \
  /etc/nginx/nginx.conf

# 2. Enable DDoS protection mode
export DDOS_PROTECTION_ENABLED=true

# 3. Add IP-based throttling for WebSocket
# (Apply Nginx GeoIP rules)

# 4. Restart services
systemctl reload nginx
docker-compose restart game-server
```

##### INC-CHET: Cheating/Exploitation

```bash
#!/bin/bash
# CHEATING ERADICATION SCRIPT
# Execute for game exploitation

# 1. Identify cheating accounts
./analyze-game-logs.js --suspicious-patterns > /tmp/suspicious-accounts.txt

# 2. Suspend identified accounts
while read account; do
  psql -c "UPDATE players SET status = 'suspended' WHERE id = '$account'"
done < /tmp/suspicious-accounts.txt

# 3. Deploy game validation fix
git pull origin security-patch
docker-compose build game-server
docker-compose up -d game-server

# 4. Roll back affected game states
./rollback-game-states.js --from $INCIDENT_START --to $(date)
```

---

### Phase 5: Recovery (72 hours - 1 week)

#### Recovery Checklist

```
┌─────────────────────────────────────────────────────────────┐
│  RECOVERY CHECKLIST                                         │
├─────────────────────────────────────────────────────────────┤
│  □ Vulnerability patched                                     │
│  □ Systems restored and verified                            │
│  □ Services returned to normal operation                    │
│  □ Monitoring enhanced                                      │
│  □ Affected players notified                                │
│  □ Documentation updated                                    │
│  □ Lessons learned documented                               │
│  □ Process improvements identified                          │
└─────────────────────────────────────────────────────────────┘
```

#### Service Restoration Procedure

```bash
#!/bin/bash
# SERVICE RESTORATION SCRIPT
# Execute after eradication is complete

# 1. Verify patches applied
echo "Verifying patch levels..."
npm list --depth=0 > /tmp/patch-levels.txt

# 2. Run health checks
echo "Running health checks..."
curl -f http://localhost:3000/health
curl -f http://localhost:3001/health
curl -f http://localhost:8080/health

# 3. Restore services
echo "Restoring services..."
docker-compose up -d

# 4. Verify functionality
echo "Verifying functionality..."
./test-game-functionality.sh

# 5. Remove containment measures
echo "Removing containment..."
iptables -D INPUT -s $ATTACKER_IP -j DROP

# 6. Announce recovery
echo "Recovery complete"
```

#### Post-Incident Communication

```markdown
## Incident Communication

### Affected Players
Subject: Security Incident - Action Required

Dear [player],

We recently detected unauthorized access to our systems. 
Your account may have been affected.

**What happened:** [brief description]

**What we're doing:** [actions taken]

**What you should do:** [required player actions]

For questions, contact [support channel].

### Public Statement
Subject: Monkeytown Security Update

On [date], we detected unauthorized access to our systems. 
We immediately contained the incident and implemented additional 
security measures.

No financial data was exposed. We recommend all players 
change their passwords as a precaution.

[Full statement and timeline]

### Regulatory Notification
[If applicable - GDPR, CCPA, etc.]
- Data Protection Authority: Notified
- Notification deadline: [date]
- Players affected: [number]
```

---

### Phase 6: Lessons Learned (1-2 weeks post-incident)

#### Post-Incident Review Template

```markdown
# Post-Incident Review

**Incident:** INC-YYYY-MM-DD-###  
**Date of Review:** YYYY-MM-DD  
**Attendees:** [list]

## What Went Well
- [Success 1]
- [Success 2]

## What Could Have Been Better
- [Improvement 1]
- [Improvement 2]

## What Went Poorly
- [Failure 1]
- [Failure 2]

## Root Cause Analysis
[5 Whys analysis]

## Action Items
| Item | Owner | Due Date | Status |
|------|-------|----------|--------|
| Implement WAF rules | Security | 2024-01-15 | In Progress |
| Update incident response | Ops | 2024-01-22 | Pending |
| Security training | All | 2024-02-01 | Pending |

## Process Improvements
[Updates needed to this plan]

## Metrics
| Metric | Value | Target |
|--------|-------|--------|
| Time to detect | 5 min | < 10 min |
| Time to contain | 15 min | < 30 min |
| Time to recover | 4 hours | < 24 hours |
```

---

## Contact Information

### Internal Contacts

| Role | Contact | Availability |
|------|---------|--------------|
| Security Emergency | @jungle-security | 24/7 |
| Operations | @chaos-architect | Business hours |
| Development | @monkey-builder | Business hours |
| Communications | @town-crier | 24/7 |

### External Contacts

| Contact | Purpose | Contact |
|---------|---------|---------|
| Hosting Provider | Infrastructure | [provider portal] |
| Cloud Provider | AWS/GCP support | [support portal] |
| Sentry | Error monitoring | [dashboard] |
| DNS Provider | DNS changes | [console] |

---

## Playbooks

### Playbook: Credential Compromise

**Trigger:** Detected unauthorized account access

1. **Immediate (0-15 min)**
   - [ ] Identify affected accounts
   - [ ] Force password reset
   - [ ] Invalidate all sessions
   - [ ] Check for privilege escalation

2. **Short-term (1-4 hours)**
   - [ ] Analyze access patterns
   - [ ] Determine attack vector
   - [ ] Notify affected users
   - [ ] Implement additional monitoring

3. **Long-term (1-7 days)**
   - [ ] Implement MFA
   - [ ] Review authentication system
   - [ ] Update security requirements
   - [ ] Conduct security training

### Playbook: DDoS Attack

**Trigger:** Service degradation or unavailability

1. **Immediate (0-15 min)**
   - [ ] Enable DDoS protection
   - [ ] Scale infrastructure
   - [ ] Implement rate limiting
   - [ ] Contact CDN provider

2. **Short-term (1-4 hours)**
   - [ ] Analyze attack patterns
   - [ ] Block attack sources
   - [ ] Optimize defenses
   - [ ] Monitor for adaptation

3. **Long-term (1-7 days)**
   - [ ] Review DDoS protection
   - [ ] Update infrastructure
   - [ ] Conduct load testing
   - [ ] Update incident response

### Playbook: Data Breach

**Trigger:** Detection of data exfiltration

1. **Immediate (0-15 min)**
   - [ ] Contain the breach
   - [ ] Preserve evidence
   - [ ] Identify data exposed
   - [ ] Legal notification check

2. **Short-term (1-4 hours)**
   - [ ] Notify legal team
   - [ ] Assess regulatory requirements
   - [ ] Prepare player notification
   - [ ] Implement additional access controls

3. **Long-term (1-7 days)**
   - [ ] Complete regulatory notification
   - [ ] Offer identity protection
   - [ ] Review data handling
   - [ ] Update security architecture

---

## Testing and Training

### Tabletop Exercises

| Exercise | Frequency | Participants |
|----------|-----------|--------------|
| Tabletop review | Monthly | Response team |
| Simulation drill | Quarterly | All teams |
| Full-scale exercise | Annually | All stakeholders |

### Training Requirements

| Role | Training | Frequency |
|------|----------|-----------|
| Security Lead | Incident response | Annual |
| Developers | Secure coding | Quarterly |
| All team members | Security awareness | Monthly |

---

*Incident Response Plan Version: 1.0*
*Last Updated: 2026-01-18*
*Next Review: 2026-04-18*
*JungleSecurity - Prepared for anything*
