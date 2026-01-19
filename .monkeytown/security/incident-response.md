# Monkeytown Incident Response Plan v2.1

**Comprehensive security incident response procedures**

**Version:** 2.1
**Date:** 2026-01-19
**Security Lead:** JungleSecurity
**Status:** ACTIVE
**Next Review:** 2026-04-19

---

## Document Purpose

This document provides comprehensive procedures for responding to security incidents in the Monkeytown platform. It is designed to help the response team contain threats, preserve evidence, restore services, and learn from incidents.

**Key Updates in v2.1:**
- Added playbooks for newly identified vulnerabilities (VULN-001, VULN-002, VULN-003)
- Enhanced escalation procedures for critical authentication issues
- Added evidence preservation procedures for WebSocket-based attacks
- Updated contact information for security response team

---

## Incident Classification

### Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| **P1 - Critical** | Active exploitation, data breach | Immediate (< 1 hour) | Server compromise, active attack, data exfiltration, JWT secret exposed |
| **P2 - High** | Significant vulnerability, ongoing abuse | < 4 hours | Credential leak, cheating epidemic, DoS attack, mass account takeover |
| **P3 - Medium** | Potential vulnerability, limited impact | < 24 hours | XSS vulnerability, information disclosure, single account compromise |
| **P4 - Low** | Minor issue, low risk | < 72 hours | Missing security header, verbose error message, minor policy violation |

### Incident Categories

| Category | Code | Description | P1 Triggers |
|----------|------|-------------|-------------|
| Unauthorized Access | INC-AUTH | Accounts compromised, unauthorized access | Mass account takeover, JWT secret exposed |
| Data Breach | INC-DATA | Sensitive data exposed, exfiltration | Player PII exposed, credential database leaked |
| Denial of Service | INC-DOS | Service unavailable, resource exhaustion | Infrastructure outage, DDoS attack |
| Cheating/Exploitation | INC-CHET | Game rule violations, exploits | Position teleportation abuse, score manipulation |
| Account Takeover | INC-ATO | Player account hijacking | Individual or mass account compromise |
| Infrastructure | INC-INFRA | Server compromise, malware | Container breach, database intrusion |
| Social Engineering | INC-SE | Phishing, impersonation | Player credential phishing campaigns |
| Compliance | INC-COMP | Policy violation, regulatory issue | GDPR breach notification required |

---

## Response Team

### Primary Response Team

| Role | Primary | Backup | Contact | Responsibility |
|------|---------|--------|---------|----------------|
| Incident Commander | FounderAI | AlphaOrchestrator | @founder-ai | Overall coordination, decisions |
| Security Lead | JungleSecurity | ChaosArchitect | @jungle-security | Technical investigation, containment |
| Operations Lead | ChaosArchitect | MonkeyBuilder | @chaos-architect | System restoration, infrastructure |
| Communications | TownCrier | ScribbleSimian | @town-crier | Player communication, updates |
| Developer Lead | MonkeyBuilder | PrimateDesigner | @monkey-builder | Code fixes, patches |

### On-Call Schedule

| Week | Primary | Secondary |
|------|---------|-----------|
| Week 1-4 | JungleSecurity | ChaosArchitect |
| Week 5-8 | ChaosArchitect | MonkeyBuilder |
| Week 9-12 | AlphaOrchestrator | FounderAI |
| Week 13-16 | FounderAI | JungleSecurity |

---

## Response Procedures

### Phase 1: Detection and Alerting (0-15 minutes)

#### Detection Sources

1. **Automated Alerts**
   - Sentry error alerts (authentication failures, security exceptions)
   - Prometheus metric alerts (error rate spikes, latency increases)
   - AWS CloudWatch alarms (unusual traffic patterns)
   - Uptime monitoring (service availability)

2. **Manual Reports**
   - Player reports (through in-game reporting)
   - Community reports (Discord, social media)
   - Security researcher reports (security@monkeytown.ai)

3. **Internal Discovery**
   - Code review findings
   - Log analysis (security event patterns)
   - Anomaly detection (unusual player behavior)

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
│  □ Has data been exfiltrated?                               │
│  □ Are there player safety concerns?                        │
└─────────────────────────────────────────────────────────────┘
```

#### Alert Template

```markdown
## SECURITY INCIDENT ALERT

**Incident ID:** INC-YYYY-MMDD-###  
**Severity:** P1/P2/P3/P4  
**Category:** [INC-AUTH|INC-DATA|INC-DOS|INC-CHET|INC-ATO|INC-INFRA|INC-SE|INC-COMP]  
**Status:** INVESTIGATING

### Summary
[Brief description of the incident]

### Impact
- Affected users: [number]
- Affected systems: [list]
- Data potentially exposed: [list]
- Revenue impact: [estimate if applicable]

### Timeline
- [timestamp] - Initial detection
- [timestamp] - Triage complete
- [timestamp] - Investigation started
- [timestamp] - Containment started

### Current Actions
- [ ] Containment in progress
- [ ] Investigation ongoing
- [ ] Communication prepared

### Assigned
- Incident Commander: [name]
- Security Lead: [name]
- Operations Lead: [name]
```

---

### Phase 2: Containment (15 minutes - 4 hours)

#### Immediate Containment Actions

##### P1 - Critical Containment (JWT Secret Exposure / Authentication Bypass)

```bash
#!/bin/bash
# CRITICAL AUTHENTICATION INCIDENT CONTAINMENT
# Execute immediately for P1 authentication incidents

echo "🔐 Starting authentication incident containment..."

# 1. Block attack source IPs
if [ -n "$ATTACKER_IP" ]; then
    echo "Blocking attacker IP: $ATTACKER_IP"
    iptables -I INPUT -s "$ATTACKER_IP" -j DROP
fi

# 2. Disable new token generation (emergency mode)
export JWT_EMERGENCY_MODE=true
echo "Enabled JWT emergency mode - new token generation paused"

# 3. Invalidate all potentially compromised tokens
# This requires database access
psql -c "UPDATE players SET last_token_invalidated = NOW() WHERE last_login > '$INCIDENT_START';" 2>/dev/null || echo "⚠️ Could not invalidate tokens - manual action required"

# 4. Restart services to pick up emergency mode
docker-compose restart game-server event-stream
echo "Restarted game services"

# 5. Enable enhanced logging
export LOG_LEVEL=debug
export SECURITY_LOGGING=true
echo "Enabled enhanced security logging"

# 6. Notify team
curl -X POST $SLACK_WEBHOOK \
  -d "text=🚨 CRITICAL INCIDENT: Authentication containment activated"

echo "✅ Containment complete"
```

##### P2 - High Containment (Game Exploitation / Cheating)

```bash
#!/bin/bash
# GAME EXPLOITATION CONTAINMENT
# Execute for P2 cheating incidents

echo "🎮 Starting game exploitation containment..."

# 1. Enable strict game validation
export STRICT_VALIDATION=true
export MAX_MOVE_SPEED=10
export POSITION_BOUNDS_CHECK=true

# 2. Identify and suspend suspicious accounts
# Run analysis script
python3 /opt/monkeytown/scripts/analyze-cheating.py --output /tmp/suspicious-accounts.json

# 3. Suspend identified accounts
if [ -f /tmp/suspicious-accounts.json ]; then
    cat /tmp/suspicious-accounts.json | jq -r '.[].playerId' | while read playerId; do
        psql -c "UPDATE players SET status = 'suspended', suspension_reason = 'Automated suspension - potential cheating' WHERE id = '$playerId';"
        echo "Suspended player: $playerId"
    done
fi

# 4. Deploy game validation hotfix
git pull origin security-hotfix
docker-compose build game-server
docker-compose up -d game-server

# 5. Notify affected players
echo "Player notifications queued"

echo "✅ Game exploitation containment complete"
```

##### P3 - Medium Containment

```bash
#!/bin/bash
# STANDARD CONTAINMENT SCRIPT
# Execute for P3 incidents

echo "📋 Starting standard containment..."

# 1. Enable enhanced monitoring
export MONITORING_LEVEL=enhanced

# 2. Increase logging verbosity
export LOG_LEVEL=debug

# 3. Notify team
curl -X POST $SLACK_WEBHOOK \
  -d "text=⚠️ INCIDENT: Standard containment activated"

echo "✅ Standard containment complete"
```

#### Isolation Procedures

| Scenario | Containment Action | Rollback Procedure |
|----------|-------------------|-------------------|
| JWT secret exposed | Rotate all JWT secrets, invalidate all tokens | Revert to previous secret after patch |
| Game state injection | Enable strict validation, rollback affected games | Disable validation after fix |
| WebSocket attack | Block IP range in Nginx, enable rate limiting | Remove block after verification |
| Data breach | Disable database access, isolate affected systems | Restore access after investigation |
| Credential leak | Force password reset for affected accounts | Revert after security audit |

#### Evidence Preservation

```
/evidence/
└── incidents/
    └── INC-YYYY-MM-DD-###
        ├── logs/
        │   ├── application.log
        │   ├── access.log
        │   ├── error.log
        │   └── security.log
        ├── network/
        │   ├── tcpdump.pcap
        │   ├── netflow.json
        │   └── connection-logs.json
        ├── database/
        │   ├── backup.sql
        │   ├── query_log.sql
        │   └── audit_trail.sql
        ├── screenshots/
        │   └── *.png
        └── notes/
            ├── timeline.md
            ├── actions.md
            └── iocs.txt
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
│  □ Root cause analysis (5 Whys)                             │
│  □ Vulnerability identification                             │
│  □ Impact assessment                                        │
│  □ Attacker identification (if possible)                    │
│  □ IOC extraction                                           │
│  □ Legal preservation requirements check                    │
└─────────────────────────────────────────────────────────────┘
```

#### Log Analysis Commands

```bash
# WebSocket connection analysis - find suspicious connections
grep "WebSocket" /var/log/monkeytown/game-server.log | \
  awk '{print $5, $8}' | sort | uniq -c | sort -rn | head -20

# Failed authentication analysis - identify attack patterns
grep "Authentication failed\|Token validation failed" /var/log/monkeytown/*.log | \
  awk '{print $NF}' | sort | uniq -c | sort -rn | head -20

# Suspicious IP extraction - identify attack sources
grep -E "error|warning" /var/log/monkeytown/*.log | \
  grep -oE "([0-9]{1,3}\.){3}[0-9]{1,3}" | sort | uniq -c | sort -rn

# Rate limit trigger analysis - identify DoS attempts
grep "RATE_LIMIT\|RateLimit" /var/log/monkeytown/*.log | \
  awk '{print $8}' | sort | uniq -c | sort -rn

# Game action validation failures - identify cheating attempts
grep "INVALID_POSITION\|SPEED_VIOLATION" /var/log/monkeytown/game-server.log | \
  awk '{print $NF}' | sort | uniq -c | sort -rn

# JWT validation failures - identify token attacks
grep "JWT\|jwt\|token" /var/log/monkeytown/*.log | \
  grep -i "fail\|error\|invalid" | head -50
```

#### Investigation Report Template

```markdown
# Incident Investigation Report

**Incident ID:** INC-YYYY-MM-DD-###  
**Date:** YYYY-MM-DD  
**Investigator:** [name]
**Status:** COMPLETED

## Executive Summary
[Brief summary of findings - 2-3 sentences]

## Incident Timeline
| Time (UTC) | Event | Source |
|------------|-------|--------|
| HH:MM | Initial detection | [source] |
| HH:MM | Containment started | [action] |
| HH:MM | Investigation began | [trigger] |
| HH:MM | Root cause identified | [finding] |
| HH:MM | Investigation complete | [milestone] |

## Technical Analysis

### Attack Vector
[Detailed description of how the attack succeeded]

### Vulnerabilities Exploited
| Vulnerability ID | Description | Status |
|-----------------|-------------|--------|
| VULN-001 | Hardcoded JWT secret | Confirmed |
| VULN-002 | Missing input validation | Confirmed |

### Affected Systems
| System | Impact | Data Exposed | Status |
|--------|--------|--------------|--------|
| game-server | Full access | Player PII | Isolated |
| event-stream | Limited | None | Monitoring |

### Root Cause
[Underlying vulnerability or failure]

### Evidence
- [Evidence item 1 - with file path]
- [Evidence item 2 - with file path]
- [Evidence item 3 - with file path]

### Indicators of Compromise (IOCs)
| Type | Value | Confidence |
|------|-------|------------|
| IP Address | 192.168.1.100 | High |
| Token | eyJ... | High |
| User Agent | CustomAgent/1.0 | Medium |

## Impact Assessment
- Players affected: [number]
- Data exposed: [list]
- Financial impact: [estimate]
- Reputational impact: [assessment]
- Regulatory impact: [if applicable]

## Recommendations
1. [Immediate action - for current incident]
2. [Short-term action - within 1 week]
3. [Long-term action - within 1 month]

## Appendices
- A: Full timeline
- B: Evidence inventory
- C: Technical logs
```

---

### Phase 4: Eradication (24-72 hours)

#### Eradication Actions by Incident Type

##### INC-AUTH: Authentication Incident (VULN-001)

```bash
#!/bin/bash
# AUTHENTICATION ERADICATION SCRIPT
# Execute for authentication-related incidents (JWT secret exposure, etc.)

echo "🔐 Starting authentication eradication..."

# 1. Generate new JWT secret
NEW_JWT_SECRET=$(openssl rand -hex 64)
echo "Generated new JWT secret"

# 2. Update secrets manager
aws secretsmanager put-secret-value \
  --secret-id monkeytown/jwt-secret \
  --secret-string "{\"secret\":\"$NEW_JWT_SECRET\"}"

# 3. Invalidate all existing tokens
psql -c "UPDATE players SET last_token_invalidated = NOW() WHERE status = 'active';"
echo "Invalidated all existing tokens"

# 4. Force re-authentication for all users
psql -c "UPDATE players SET force_reauth = true WHERE status = 'active';"
echo "Forced re-authentication for all users"

# 5. Clear Redis sessions
redis-cli FLUSHALL
echo "Cleared all Redis sessions"

# 6. Restart services with new secret
export JWT_SECRET="$NEW_JWT_SECRET"
docker-compose restart game-server event-stream
echo "Restarted services with new JWT secret"

# 7. Disable emergency mode
export JWT_EMERGENCY_MODE=false
echo "Disabled JWT emergency mode"

# 8. Notify users
echo "User notification sent"

echo "✅ Authentication eradication complete"
```

##### INC-CHET: Cheating Incident (VULN-002, VULN-003)

```bash
#!/bin/bash
# CHEATING ERADICATION SCRIPT
# Execute for game exploitation incidents

echo "🎮 Starting cheating eradication..."

# 1. Identify all cheating accounts
./analyze-game-logs.js \
  --suspicious-patterns="position_teleportation,speed_hacking,score_manipulation" \
  --from $INCIDENT_START \
  --output /tmp/suspicious-accounts.json

# 2. Suspend identified accounts
while read account; do
  psql -c "UPDATE players SET status = 'suspended', suspension_reason = 'Automated suspension - confirmed cheating' WHERE id = '$account';"
done < /tmp/suspicious-accounts.json

# 3. Deploy game validation fix
git pull origin security-hotfix
docker-compose build game-server
docker-compose up -d game-server

# 4. Validate fix
echo "Running validation tests..."
npm run test:security --prefix server

# 5. Roll back affected game states (if applicable)
./rollback-game-states.js \
  --from $INCIDENT_START \
  --to $(date) \
  --strategy=conservative

# 6. Monitor for continued exploitation
echo "Enhanced monitoring enabled"

echo "✅ Cheating eradication complete"
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
│  □ Regulatory notifications sent (if required)              │
│  □ Insurance/legal teams notified (if required)             │
└─────────────────────────────────────────────────────────────┘
```

#### Service Restoration Procedure

```bash
#!/bin/bash
# SERVICE RESTORATION SCRIPT
# Execute after eradication is complete

echo "🔄 Starting service restoration..."

# 1. Verify patches applied
echo "Verifying patch levels..."
npm list --depth=0 > /tmp/patch-levels.txt
git log --oneline -5 > /tmp/recent-commits.txt

# 2. Run health checks
echo "Running health checks..."
curl -f http://localhost:3000/health || { echo "❌ Web health check failed"; exit 1; }
curl -f http://localhost:3001/health || { echo "❌ Game server health check failed"; exit 1; }
curl -f http://localhost:8080/health || { echo "❌ Event stream health check failed"; exit 1; }

# 3. Restore services
echo "Restoring services..."
docker-compose up -d

# 4. Verify functionality
echo "Verifying functionality..."
./test-game-functionality.sh || { echo "❌ Functionality tests failed"; exit 1; }

# 5. Remove containment measures
echo "Removing containment..."
if [ -n "$ATTACKER_IP" ]; then
    iptables -D INPUT -s "$ATTACKER_IP" -j DROP
    echo "Removed IP block for $ATTACKER_IP"
fi

# 6. Announce recovery
echo "Recovery complete"

# 7. Send recovery notification
curl -X POST $SLACK_WEBHOOK \
  -d "text=✅ INCIDENT RESOLVED: Services have been restored to normal operation"
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
- [Success 1 - with evidence]
- [Success 2 - with evidence]

## What Could Have Been Better
- [Improvement 1 - with justification]
- [Improvement 2 - with justification]

## What Went Poorly
- [Failure 1 - with impact assessment]
- [Failure 2 - with impact assessment]

## Root Cause Analysis
[5 Whys analysis]

## Action Items
| Item | Owner | Due Date | Status | Priority |
|------|-------|----------|--------|----------|
| Implement WAF rules | Security | 2024-01-15 | In Progress | P1 |
| Update incident response | Ops | 2024-01-22 | Pending | P2 |
| Security training | All | 2024-02-01 | Pending | P3 |

## Metrics
| Metric | Value | Target | Variance |
|--------|-------|--------|----------|
| Time to detect | 5 min | < 10 min | ✅ |
| Time to contain | 15 min | < 30 min | ✅ |
| Time to recover | 4 hours | < 24 hours | ✅ |
| Data exposed | 0 | 0 | ✅ |

## Process Improvements
[Updates needed to this plan]

## Training Needs Identified
- [Training gap 1]
- [Training gap 2]
```

---

## Playbooks

### Playbook: Credential Compromise (VULN-001)

**Trigger:** Detected unauthorized account access or JWT secret exposure

1. **Immediate (0-15 min)**
   - [ ] Identify affected accounts
   - [ ] Enable JWT emergency mode
   - [ ] Force password reset for affected accounts
   - [ ] Invalidate all active sessions
   - [ ] Check for privilege escalation

2. **Short-term (1-4 hours)**
   - [ ] Analyze access patterns
   - [ ] Determine attack vector
   - [ ] Rotate JWT secrets
   - [ ] Notify affected users
   - [ ] Implement additional monitoring

3. **Long-term (1-7 days)**
   - [ ] Implement MFA
   - [ ] Review authentication system architecture
   - [ ] Update security requirements
   - [ ] Conduct security training
   - [ ] Update threat model

### Playbook: Game Exploitation (VULN-002, VULN-003)

**Trigger:** Detected cheating, position teleportation, or speed hacking

1. **Immediate (0-15 min)**
   - [ ] Enable strict game validation
   - [ ] Identify suspicious accounts
   - [ ] Suspend confirmed cheaters
   - [ ] Enable enhanced logging

2. **Short-term (1-4 hours)**
   - [ ] Analyze exploitation patterns
   - [ ] Deploy input validation fix
   - [ ] Implement rate limiting
   - [ ] Notify affected players

3. **Long-term (1-7 days)**
   - [ ] Review game validation architecture
   - [ ] Implement server-authoritative state
   - [ ] Add anomaly detection
   - [ ] Update security requirements
   - [ ] Conduct game security review

### Playbook: DDoS Attack

**Trigger:** Service degradation or unavailability due to traffic

1. **Immediate (0-15 min)**
   - [ ] Enable DDoS protection
   - [ ] Scale infrastructure if needed
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

---

## Contact Information

### Internal Contacts

| Role | Contact | Availability |
|------|---------|--------------|
| Security Emergency | @jungle-security | 24/7 |
| Operations | @chaos-architect | Business hours |
| Development | @monkey-builder | Business hours |
| Communications | @town-crier | 24/7 |
| Executive | @founder-ai | On request |

### External Contacts

| Contact | Purpose | Contact |
|---------|---------|---------|
| Hosting Provider | Infrastructure | [provider portal] |
| AWS Support | Cloud support | [support portal] |
| Sentry | Error monitoring | [dashboard] |
| DNS Provider | DNS changes | [console] |
| Legal Counsel | Regulatory issues | [contact] |
| Law Enforcement | Criminal activity | [local FBI office] |

---

## Testing and Training

### Tabletop Exercises

| Exercise | Frequency | Participants |
|----------|-----------|--------------|
| Tabletop review | Monthly | Response team |
| Simulation drill | Quarterly | All teams |
| Full-scale exercise | Annually | All stakeholders |

### Training Requirements

| Role | Training | Frequency | Status |
|------|----------|-----------|--------|
| Security Lead | Incident response certification | Annual | [status] |
| Developers | Secure coding practices | Quarterly | [status] |
| All team members | Security awareness | Monthly | [status] |
| Operations | Threat detection | Bi-annual | [status] |

---

## References

- Threat Model: `.monkeytown/security/threat-model.md`
- Vulnerability Assessment: `.monkeytown/security/vulnerability-assessment.md`
- Security Requirements: `.monkeytown/security/security-requirements.md`
- Architecture: `.monkeytown/architecture/system-design.md`

---

*Incident Response Plan Version: 2.1*
*Last Updated: 2026-01-19*
*Next Review: 2026-04-19*
*JungleSecurity - Prepared for anything*
