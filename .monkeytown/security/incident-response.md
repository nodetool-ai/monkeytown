# Monkeytown Incident Response Plan v2.0

**Comprehensive security incident response procedures**

**Version:** 2.0
**Date:** 2026-01-19
**Agent:** JungleSecurity

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

## Current Security Posture (Verified)

Based on code review at `server/src/websocket/server.ts` and related files:

**Confirmed Vulnerabilities:**
1. **VULN-001**: Hardcoded JWT secret fallback (`server/src/websocket/server.ts:223`)
2. **VULN-002**: Missing WebSocket rate limiting
3. **VULN-003**: Chat XSS vulnerability (`server/src/websocket/server.ts:185`)
4. **VULN-004**: Missing action cooldown enforcement

**These are P1 incidents waiting to happen.**

---

## Response Team

### Primary Response Team

| Role | Primary | Backup | Responsibility |
|------|---------|--------|----------------|
| Incident Commander | FounderAI | AlphaOrchestrator | Overall coordination, decisions |
| Security Lead | JungleSecurity | ChaosArchitect | Technical investigation, containment |
| Operations Lead | ChaosArchitect | MonkeyBuilder | System restoration, infrastructure |
| Communications | TownCrier | ScribbleSimian | Player communication, updates |
| Developer Lead | MonkeyBuilder | PrimateDesigner | Code fixes, patches |

### On-Call Schedule

| Week | Primary | Secondary |
|------|---------|-----------|
| Week 1-2 | FounderAI | ChaosArchitect |
| Week 3-4 | JungleSecurity | AlphaOrchestrator |
| Week 5-6 | ChaosArchitect | MonkeyBuilder |
| Week 7-8 | AlphaOrchestrator | FounderAI |

---

## P1 Critical Response Procedure

### Immediate Actions (0-15 minutes)

For incidents involving:
- Active exploitation of JWT secret
- Chat XSS worm
- Mass credential compromise
- Service disruption attack

#### 1. Containment Checklist

```
┌─────────────────────────────────────────────────────────────┐
│  P1 CRITICAL INCIDENT CONTAINMENT                            │
├─────────────────────────────────────────────────────────────┤
│  □ Identify attack vector and scope                          │
│  □ Disable affected service if needed                        │
│  □ Rotate all JWT secrets                                    │
│  □ Block attack sources at firewall                          │
│  □ Enable enhanced logging                                   │
│  □ Notify response team immediately                          │
│  □ Document all actions with timestamps                      │
└─────────────────────────────────────────────────────────────┘
```

#### 2. Emergency Containment Script

```bash
#!/bin/bash
# EMERGENCY CONTAINMENT SCRIPT - P1 Incidents
# Execute immediately for active exploitation

set -e

echo "Starting P1 containment at $(date)"

# 1. Block attack source IPs (if identified)
if [ -n "$ATTACKER_IP" ]; then
  echo "Blocking attacker IP: $ATTACKER_IP"
  iptables -I INPUT -s $ATTACKER_IP -j DROP
fi

# 2. Disable WebSocket service
echo "Stopping game server..."
docker-compose stop game-server || true
systemctl stop monkeytown-server || true

# 3. Rotate JWT secrets immediately
echo "Rotating JWT secrets..."
export JWT_SECRET=$(openssl rand -hex 64)
echo "new-secret=$JWT_SECRET" > /secrets/jwt/rotated-$(date +%s)

# 4. Invalidate all active sessions
echo "Invalidating all sessions..."
redis-cli KEYS "session:*" | xargs redis-cli DEL 2>/dev/null || true

# 5. Enable enhanced logging
export LOG_LEVEL=debug

# 6. Notify team
curl -X POST $SLACK_WEBHOOK \
  -d "text=🚨 CRITICAL INCIDENT: Containment initiated at $(date)"

echo "Containment complete. Awaiting further instructions."
```

---

### Phase 2: Investigation (15 minutes - 4 hours)

#### Evidence Collection

```bash
#!/bin/bash
# EVIDENCE COLLECTION SCRIPT
# Execute after containment

EVIDENCE_DIR="/evidence/incidents/INC-$(date +%Y%m%d)-$(date +%H%M%S)"
mkdir -p "$EVIDENCE_DIR/logs"
mkdir -p "$EVIDENCE_DIR/network"
mkdir -p "$EVIDENCE_DIR/database"

echo "Collecting evidence to $EVIDENCE_DIR"

# 1. Application logs
cp /var/log/monkeytown/*.log "$EVIDENCE_DIR/logs/" 2>/dev/null || true

# 2. WebSocket connection logs
grep -h "WebSocket\|connection\|auth" /var/log/monkeytown/*.log 2>/dev/null | \
  > "$EVIDENCE_DIR/logs/websocket-connections.log"

# 3. Failed authentication attempts
grep -h "Authentication\|auth\|token" /var/log/monkeytown/*.log 2>/dev/null | \
  grep -i "fail\|error\|invalid" > "$EVIDENCE_DIR/logs/auth-failures.log"

# 4. Network connections
netstat -tan > "$EVIDENCE_DIR/network/connections.log" 2>/dev/null || true

# 5. Redis session data (sanitized)
redis-cli KEYS "session:*" | head -100 > "$EVIDENCE_DIR/database/sessions.txt" 2>/dev/null || true

# 6. Database queries (last hour)
psql -c "SELECT * FROM players WHERE last_login > NOW() - INTERVAL '1 hour'" > \
  "$EVIDENCE_DIR/database/recent-logins.log" 2>/dev/null || true

echo "Evidence collection complete."
ls -la "$EVIDENCE_DIR"
```

#### Investigation Report Template

```markdown
# Incident Investigation Report

**Incident ID:** INC-YYYY-MM-DD-###  
**Date:** YYYY-MM-DD  
**Investigator:** [name]

## Executive Summary
[Brief summary of findings based on verified code locations]

## Attack Vector Analysis

### Confirmed Exploitation Points

| Point | File | Line | Vulnerability |
|-------|------|------|---------------|
| WebSocket Auth | server/src/websocket/server.ts | 223 | Hardcoded JWT secret |
| Chat Broadcast | server/src/websocket/server.ts | 185 | Missing XSS sanitization |
| Rate Limiting | server/src/websocket/server.ts | N/A | Not implemented |
| Action Processing | server/src/game/server.ts | N/A | No cooldown enforcement |

## Timeline
| Time | Event | Source |
|------|-------|--------|
| HH:MM | Initial detection | [source] |
| HH:MM | Containment started | [action] |
| HH:MM | Investigation began | [trigger] |
| HH:MM | Root cause identified | [finding] |

## Technical Analysis
[Detailed description based on code review]

## Impact Assessment
- Players affected: [number]
- Data exposed: [list]
- Systems compromised: [list]

## Recommendations
1. [Immediate action - P1]
2. [Short-term action - P2]
3. [Long-term action - P3]
```

---

### Phase 3: Eradication (24-72 hours)

#### JWT Secret Rotation Procedure

```bash
#!/bin/bash
# JWT SECRET ROTATION SCRIPT
# Execute after P1 JWT-related incident

set -e

echo "Starting JWT secret rotation at $(date)"

# 1. Generate new secret
NEW_SECRET=$(openssl rand -hex 64)
echo "New secret generated: ${NEW_SECRET:0:8}...${NEW_SECRET: -8}"

# 2. Update environment (temporary file)
cat > /secrets/jwt/.env.new <<EOF
JWT_SECRET=$NEW_SECRET
EOF

# 3. Invalidate all existing tokens
redis-cli KEYS "session:*" | xargs redis-cli DEL
redis-cli SET "jwt:blacklist:all" "true" EX 86400

# 4. Deploy new secret (requires restart)
echo "Restarting services with new secret..."
docker-compose restart game-server
systemctl restart monkeytown-server

# 5. Notify users of forced re-authentication
./notify-users.sh --template force-reauth --all-users

echo "JWT secret rotation complete."
```

#### Chat XSS Eradication

```bash
#!/bin/bash
# CHAT SANITIZATION DEPLOYMENT
# Execute after chat XSS incident

echo "Deploying chat sanitization fix..."

# 1. Pull latest code
git pull origin main

# 2. Install DOMPurify
npm install isomorphic-dompurify

# 3. Deploy sanitization update
docker-compose build game-server
docker-compose up -d game-server

# 4. Clear cached messages if needed
redis-cli DEL "chat:*" 2>/dev/null || true

echo "Chat sanitization deployed."
```

---

### Phase 4: Recovery (72 hours - 1 week)

#### Service Restoration Procedure

```bash
#!/bin/bash
# SERVICE RESTORATION SCRIPT
# Execute after eradication is complete

set -e

echo "Starting service restoration at $(date)"

# 1. Verify patches applied
echo "Verifying patch levels..."
npm list --depth=0 > /tmp/patch-levels.txt
grep -q "isomorphic-dompurify" /tmp/patch-levels.txt && echo "✅ DOMPurify installed"

# 2. Run health checks
echo "Running health checks..."
curl -f http://localhost:3000/health || exit 1
curl -f http://localhost:3001/health || exit 1
curl -f http://localhost:8080/health || exit 1

# 3. Restore services
echo "Restoring services..."
docker-compose up -d

# 4. Verify functionality
echo "Verifying functionality..."
./test-game-functionality.sh || exit 1

# 5. Remove containment measures
echo "Removing containment..."
if [ -n "$ATTACKER_IP" ]; then
  iptables -D INPUT -s $ATTACKER_IP -j DROP 2>/dev/null || true
fi

# 6. Announce recovery
echo "Recovery complete at $(date)"
```

---

## Playbook: JWT Secret Compromise

**Trigger:** Detected hardcoded JWT secret exposure or token forgery

**1. Immediate (0-15 min)**
- [ ] Identify if 'dev-secret' was used in production
- [ ] Check git history for secret exposure
- [ ] Block any suspicious session activity
- [ ] Force logout all players

**2. Short-term (1-4 hours)**
- [ ] Rotate JWT secret (use emergency script above)
- [ ] Implement JWT_SECRET validation at startup
- [ ] Add pre-commit hook to prevent secret commits
- [ ] Review all access logs for token usage

**3. Long-term (1-7 days)**
- [ ] Implement token refresh mechanism
- [ ] Add session binding to IP/User-Agent
- [ ] Update security requirements document
- [ ] Conduct security training

---

## Playbook: Chat XSS Worm

**Trigger:** Detected XSS payload execution via chat

**1. Immediate (0-15 min)**
- [ ] Disable chat functionality
- [ ] Identify affected players
- [ ] Force session refresh for all players
- [ ] Collect evidence of worm spread

**2. Short-term (1-4 hours)**
- [ ] Deploy DOMPurify sanitization
- [ ] Clear malicious messages from database
- [ ] Notify affected players
- [ ] Enable enhanced chat monitoring

**3. Long-term (1-7 days)**
- [ ] Implement message content scanning
- [ ] Add rate limiting to chat
- [ ] Update input validation requirements
- [ ] Review all user-generated content handling

---

## Playbook: DoS Attack

**Trigger:** Service degradation or unavailability due to message flooding

**1. Immediate (0-15 min)**
- [ ] Enable DDoS protection at infrastructure level
- [ ] Scale infrastructure if needed
- [ ] Implement emergency rate limiting
- [ ] Contact CDN provider

**2. Short-term (1-4 hours)**
- [ ] Analyze attack patterns
- [ ] Block attack sources at firewall
- [ ] Deploy per-connection rate limiting (P1 fix)
- [ ] Monitor for adaptation

**3. Long-term (1-7 days)**
- [ ] Review DDoS protection configuration
- [ ] Update infrastructure scaling
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

### Key Files for Investigation

| File | Purpose |
|------|---------|
| `server/src/websocket/server.ts` | WebSocket authentication, chat handling |
| `server/src/game/server.ts` | Game action processing |
| `server/src/services/validation.ts` | Input validation |

---

*Incident Response Plan Version: 2.0*
*Last Updated: 2026-01-19*
*JungleSecurity - Prepared for verified vulnerabilities*
