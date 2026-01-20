# Monkeytown Incident Response Plan v2.0

**Comprehensive security incident response procedures**

**Security Analyst:** JungleSecurity  
**Version:** 2.0  
**Date:** 2026-01-20

---

## Incident Classification

### Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| **P1 - Critical** | Active exploitation, data breach | Immediate (< 1 hour) | JWT secret leak exploited, server compromise |
| **P2 - High** | Significant vulnerability, ongoing abuse | < 4 hours | Cheating epidemic, DoS attack, XSS in production |
| **P3 - Medium** | Potential vulnerability, limited impact | < 24 hours | Missing security header, verbose error |
| **P4 - Low** | Minor issue, low risk | < 72 hours | Non-critical lint warning, docs issue |

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

## Critical Vulnerability Response Procedures

### INC-AUTH-001: JWT Secret Compromise (VULN-001)

**Trigger:** Detection of hardcoded JWT secret 'dev-secret' in codebase, or evidence of token forgery

**Severity:** P1 - CRITICAL

**Immediate Actions (0-15 minutes):**

```bash
#!/bin/bash
# EMERGENCY JWT SECRET ROTATION SCRIPT

# 1. Generate new JWT secret
NEW_JWT_SECRET=$(openssl rand -hex 64)
echo "New JWT_SECRET generated: ${NEW_JWT_SECRET:0:8}..."

# 2. Update environment variables (via secrets manager)
# aws secretsmanager update-secret --secret-id monkeytown/jwt-secret --secret-string "{\"JWT_SECRET\":\"$NEW_JWT_SECRET\"}"

# 3. Invalidate all existing sessions
redis-cli KEYS "session:*" | xargs redis-cli DEL
redis-cli SETEX "jwt-blacklist:all" 86400 "true"

# 4. Log the incident
echo "[INC-AUTH-001] JWT secret rotation triggered at $(date)" >> /var/log/monkeytown/security.log

# 5. Notify security team
# curl -X POST $SLACK_WEBHOOK -d "text=🚨 CRITICAL: JWT secret compromised. Rotation in progress."
```

**Investigation (15-60 minutes):**

1. Audit git history for 'dev-secret' exposure
2. Check for unauthorized game sessions created
3. Review logs for suspicious token generation
4. Identify affected player accounts
5. Assess scope of potential token forgery

**Communication:**

```markdown
## Critical Security Notice - Authentication Update

We have identified a security vulnerability affecting authentication tokens.

**What happened:** A misconfiguration allowed default authentication credentials to be used.

**What we did:** We have rotated all authentication secrets and invalidated existing sessions.

**What you need to do:** You will need to log in again. Your account security was not compromised, but please remain vigilant for suspicious activity.

For questions, contact support.
```

---

### INC-AUTHZ-001: Game State Manipulation (VULN-002)

**Trigger:** Detection of impossible game states, score anomalies, position teleportation

**Severity:** P1 - CRITICAL

**Immediate Actions (0-15 minutes):**

```bash
#!/bin/bash
# EMERGENCY GAME STATE LOCKDOWN

# 1. Identify suspicious game sessions
redis-cli KEYS "session:*" | while read key; do
  session_data=$(redis-cli GET "$key")
  # Check for impossible scores or positions
  if echo "$session_data" | grep -q "score.*99999\|position.*99999"; then
    echo "Suspicious session: $key"
    # Archive for investigation
    redis-cli SET "suspicious:$(date +%s)" "$session_data"
    redis-cli DEL "$key"
  fi
done

# 2. Disable player state updates temporarily
export GAME_STATE_UPDATES_DISABLED=true

# 3. Notify operations
echo "[INC-AUTHZ-001] Game state lockdown triggered at $(date)" >> /var/log/monkeytown/security.log
```

**Investigation (15-60 minutes):**

1. Analyze archived suspicious sessions
2. Identify player accounts involved
3. Review WebSocket logs for manipulation patterns
4. Assess impact on game integrity
5. Identify root cause (input validation bypass)

**Remediation:**

```typescript
// Immediate validation fix
class GameSessionManager {
  updatePlayer(sessionId: string, playerId: string, updates: Partial<Player>): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    
    const player = session.players.find(p => p.id === playerId);
    if (!player) return false;
    
    // Whitelist allowed updates with validation
    if (updates.position) {
      if (!this.isValidPosition(updates.position, session.config.bounds)) {
        return false;
      }
      player.position = updates.position;
    }
    
    if (typeof updates.score === 'number') {
      if (updates.score < 0 || updates.score > MAX_SCORE) {
        return false;
      }
      player.score = updates.score;
    }
    
    return true;
  }
}
```

---

### INC-INPUT-001: XSS via Chat (VULN-005)

**Trigger:** Reports of malicious scripts executing via chat, or detection of XSS payloads in chat logs

**Severity:** P2 - HIGH

**Immediate Actions (0-15 minutes):**

```bash
#!/bin/bash
# EMERGENCY CHAT DISABLE

# 1. Disable chat temporarily
export CHAT_DISABLED=true

# 2. Purge recent chat messages
psql -c "DELETE FROM chat_messages WHERE created_at > '$(date -d '1 hour ago' '+%Y-%m-%d %H:%M:%S')'"

# 3. Notify affected players
# (Implement player notification logic)
```

**Investigation:**

1. Identify XSS payload used
2. Determine if any users were affected
3. Assess damage (session theft, data exfiltration)
4. Review sanitization bypass technique

**Remediation:**

```typescript
// Implement DOMPurify-based sanitization
import DOMPurify from 'isomorphic-dompurify';

function sanitizeChatMessage(message: string): string {
  return DOMPurify.sanitize(message, {
    ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'br'],
    ALLOWED_ATTR: [],
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'img'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onload'],
  });
}
```

---

### INC-DOS-001: WebSocket Flood (VULN-006)

**Trigger:** High CPU usage, connection timeouts, rate limit triggers

**Severity:** P2 - HIGH

**Immediate Actions (0-15 minutes):**

```bash
#!/bin/bash
# EMERGENCY RATE LIMITING

# 1. Enable strict rate limiting
export RATE_LIMIT_STRICT=true
export WS_CONNECTIONS_PER_IP=5
export WS_ACTIONS_PER_SECOND=2

# 2. Block attacking IPs
# iptables -I INPUT -s $ATTACKER_IP -j DROP

# 3. Scale up WebSocket servers
docker-compose up -d --scale event-stream=3
```

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

---

## Response Procedures Summary

### Phase 1: Detection (0-15 minutes)

- Automated alerts (Sentry, Prometheus)
- Player reports
- Log analysis
- External reports

### Phase 2: Containment (15-60 minutes)

| Threat | Containment Action | Rollback |
|--------|-------------------|----------|
| JWT compromise | Rotate secret, invalidate sessions | Restore old secret |
| Game manipulation | Disable state updates | Re-enable after fix |
| XSS in chat | Disable chat | Re-enable after sanitization |
| DoS attack | Enable strict rate limiting | Relax after attack ends |

### Phase 3: Investigation (1-4 hours)

- Timeline reconstruction
- Attack vector identification
- Scope determination
- Evidence preservation

### Phase 4: Eradication (4-72 hours)

- Vulnerability remediation
- Security control implementation
- Code fixes
- Configuration updates

### Phase 5: Recovery (72 hours - 1 week)

- Service restoration
- Verification testing
- Monitoring enhancement
- Communication

### Phase 6: Lessons Learned (1-2 weeks)

- Post-incident review
- Process improvements
- Documentation updates
- Training requirements

---

## Playbooks

### Playbook: Credential Compromise

**Trigger:** Detected unauthorized account access or token forgery

1. **Immediate (0-15 min)**
   - Identify affected accounts
   - Force password reset
   - Invalidate all sessions
   - Check for privilege escalation

2. **Short-term (1-4 hours)**
   - Analyze access patterns
   - Determine attack vector
   - Notify affected users
   - Implement additional monitoring

3. **Long-term (1-7 days)**
   - Implement MFA
   - Review authentication system
   - Update security requirements
   - Conduct security training

### Playbook: Cheating Detection

**Trigger:** Detection of impossible game states or score anomalies

1. **Immediate (0-15 min)**
   - Identify suspicious games
   - Archive game state
   - Disable player state updates
   - Notify operations

2. **Short-term (1-4 hours)**
   - Analyze manipulation technique
   - Identify cheaters
   - Suspend cheating accounts
   - Implement input validation fix

3. **Long-term (1-7 days)**
   - Deploy comprehensive validation
   - Add anti-cheat measures
   - Update game rules
   - Review detection system

---

## Contact Information

### Internal Contacts

| Role | Contact | Availability |
|------|---------|--------------|
| Security Emergency | @jungle-security | 24/7 |
| Operations | @chaos-architect | Business hours |
| Development | @monkey-builder | Business hours |
| Communications | @town-crier | 24/7 |

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

*Incident Response Plan Version: 2.0*  
*Last Updated: 2026-01-20*  
*Next Review: 2026-04-20*  
*JungleSecurity - Prepared for confirmed vulnerabilities*
