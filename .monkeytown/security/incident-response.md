# Monkeytown Incident Response Plan v2.0

**Comprehensive security incident response procedures**

**Version:** 2.0
**Date:** 2026-01-20
**Agent:** JungleSecurity

---

## Document Purpose

This plan provides procedures for responding to security incidents based on actual vulnerabilities identified in the codebase. It complements existing security documentation with actionable response procedures.

---

## Current Vulnerability Posture

Based on code analysis (`server/src/websocket/server.ts`, `server/src/game/`, `server/src/services/`):

### Active Vulnerabilities (Require Monitoring)

| ID | Vulnerability | Severity | Exploitability | Location |
|----|---------------|----------|----------------|----------|
| VULN-001 | Hardcoded JWT secret | Critical | High | server.ts:595 |
| VULN-002 | Missing WS rate limiting | Critical | High | server.ts:166-178 |
| VULN-003 | No TicTacToe action validation | Critical | High | tictactoe-engine.ts |
| VULN-004 | Chat XSS (no HTML encoding) | High | Medium | server.ts:483-520 |
| VULN-005 | Token expiration not checked | High | Medium | server.ts:586-600 |
| VULN-006 | No WebSocket message size limit | High | Medium | server.ts:58-66 |

---

## Incident Classification

### Severity Levels

| Level | Description | Response Time | Examples |
|-------|-------------|---------------|----------|
| **P1 - Critical** | Active exploitation, data breach | Immediate (< 1 hour) | JWT secret leak exploited, server compromise |
| **P2 - High** | Significant vulnerability, ongoing abuse | < 4 hours | Cheating exploit, DoS attack |
| **P3 - Medium** | Potential vulnerability, limited impact | < 24 hours | XSS vulnerability, info disclosure |
| **P4 - Low** | Minor issue, low risk | < 72 hours | Missing security header |

### Incident Categories

| Category | Code | Description |
|----------|------|-------------|
| Unauthorized Access | INC-AUTH | Accounts compromised, token forgery |
| Data Breach | INC-DATA | PII exposure, session hijacking |
| Denial of Service | INC-DOS | WebSocket flood, resource exhaustion |
| Cheating/Exploitation | INC-CHET | Game rule bypass, score manipulation |
| Account Takeover | INC-ATO | Player account hijacking |
| Injection | INC-INJECT | XSS, SQL injection attempts |

---

## Response Team

### Primary Contacts

| Role | Agent | Contact | Responsibility |
|------|-------|---------|----------------|
| Incident Commander | FounderAI | GitHub @founder-ai | Overall coordination |
| Security Lead | JungleSecurity | GitHub @jungle-security | Technical investigation |
| Operations | ChaosArchitect | GitHub @chaos-architect | System restoration |
| Communications | TownCrier | GitHub @town-crier | Player communication |
| Development | MonkeyBuilder | GitHub @monkey-builder | Code fixes |

---

## Playbooks

### PLAYBOOK: JWT Secret Compromise (VULN-001)

**Trigger:** Detected hardcoded JWT secret exposure or token forgery

**Immediate Actions (0-15 min):**

1. **Verify compromise**
   ```bash
   # Check for unusual token patterns in logs
   grep -E "Invalid signature|Token expired" /var/log/monkeytown/*.log | head -20
   
   # Check for access to secrets file
   grep "dev-secret" /var/log/monkeytown/*.log
   ```

2. **Rotate secrets**
   ```bash
   # Generate new JWT secret
   export JWT_SECRET=$(openssl rand -hex 64)
   echo $JWT_SECRET > /secrets/jwt/production-secret
   
   # Update environment variables in all services
   # Restart all game servers
   docker-compose restart game-server event-stream
   ```

3. **Invalidate all sessions**
   ```bash
   # Invalidate Redis session keys
   redis-cli KEYS "session:*" | xargs redis-cli DEL
   
   # Force reconnect
   docker-compose restart web
   ```

4. **Notify team**
   ```bash
   curl -X POST $SLACK_WEBHOOK \
     -d "text=🚨 JWT SECRET COMPROMISE - All sessions invalidated, new secret deployed"
   ```

**Short-term (1-4 hours):**
- Audit log analysis to determine scope
- Identify affected accounts
- Force password reset for compromised accounts
- Review access logs for the exposed secret

**Long-term (1-7 days):**
- Implement secret management (HashiCorp Vault/AWS Secrets Manager)
- Add secret scanning to CI/CD
- Update security requirements

---

### PLAYBOOK: WebSocket DoS Attack (VULN-002)

**Trigger:** High volume of WebSocket connections or messages

**Immediate Actions (0-15 min):**

1. **Identify attack pattern**
   ```bash
   # Check connection rates
   grep "Player connected" /var/log/monkeytown/game-server.log | \
     awk '{print $7}' | sort | uniq -c | sort -rn | head -20
   
   # Check for single IP connection floods
   awk '/Player connected/ {print $9}' /var/log/monkeytown/*.log | \
     sort | uniq -c | sort -rn | head -10
   ```

2. **Enable rate limiting**
   ```bash
   # Update nginx configuration
   cat > /etc/nginx/conf.d/rate-limit.conf << 'EOF'
   limit_req_zone $binary_remote_addr zone=ws_limit:10m rate=5r/s;
   limit_conn_zone $binary_remote_addr zone=conn_limit:10m;
   EOF
   
   nginx -t && nginx -s reload
   ```

3. **Block attack sources**
   ```bash
   # Block top attacking IPs (example)
   iptables -I INPUT -s 203.0.113.50 -j DROP
   iptables -I INPUT -s 203.0.113.51 -j DROP
   ```

4. **Scale infrastructure**
   ```bash
   # Increase game server instances
   docker-compose scale game-server=3 event-stream=3
   ```

**Short-term (1-4 hours):**
- Analyze attack vectors
- Implement WebSocket-specific rate limiting in code
- Add connection limiting per IP

**Long-term (1-7 days):**
- Deploy Web Application Firewall
- Implement connection tracking
- Add anomaly detection

---

### PLAYBOOK: Game Action Exploitation (VULN-003)

**Trigger:** Detected invalid game actions (out of bounds, wrong turn, etc.)

**Immediate Actions (0-15 min):**

1. **Identify exploitation**
   ```bash
   # Check for invalid move rejections
   grep "Invalid position\|Not your turn" /var/log/monkeytown/game-server.log | \
     awk '{print $9}' | sort | uniq -c | sort -rn | head -20
   
   # Check for coordinate anomalies
   grep -E "row: (999|-1)|col: (999|-1)" /var/log/monkeytown/*.log
   ```

2. **Hotfix validation**
   ```bash
   # Deploy validation fix
   git checkout -f security-patch
   git pull origin security-patch
   
   # The fix should include:
   # - Bounds checking in tictactoe-engine.ts
   # - Turn validation in all game engines
   # - Card ownership verification in babel-engine.ts
   
   docker-compose build game-server
   docker-compose up -d game-server
   ```

3. **Identify cheaters**
   ```bash
   # Find accounts with high rejection rates
   grep "Invalid position" /var/log/monkeytown/*.log | \
     awk -F'[:]' '{print $NF}' | sort | uniq -c | sort -rn | head -10
   ```

4. **Suspend confirmed cheaters**
   ```bash
   # Suspend accounts (example script)
   while read account reason; do
     psql -c "UPDATE players SET status = 'suspended' WHERE id = '$account'"
     echo "Suspended: $account - $reason"
   done < /tmp/suspicious-accounts.txt
   ```

**Short-term (1-4 hours):**
- Roll back any game states affected by cheating
- Notify affected legitimate players
- Document exploit vector

**Long-term (1-7 days):**
- Implement server-side validation for ALL actions
- Add action cooldown enforcement
- Implement cheat detection patterns

---

### PLAYBOOK: Chat XSS Attack (VULN-004)

**Trigger:** Detected XSS payloads in chat or JavaScript execution from chat

**Immediate Actions (0-15 min):**

1. **Identify payload**
   ```bash
   # Find XSS attempts in chat logs
   grep -E "<script|javascript:|onload=|onerror=" /var/log/monkeytown/*.log | \
     grep chat
   ```

2. **Identify affected players**
   ```bash
   # Find players who received XSS payloads
   # Check browser console for errors
   grep -E "Uncaught SyntaxError|ReferenceError" /var/log/monkeytown/*.log
   ```

3. **Deploy sanitization fix**
   ```typescript
   // Add to server/src/websocket/server.ts
   private sanitizeMessage(message: string): string {
     return message
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;')
       .replace(/javascript:/gi, '')
       .replace(/on\w+=/gi, '');
   }
   ```

4. **Notify affected players**
   ```bash
   # Force logout players who received XSS
   # (they may have active sessions with compromised tokens)
   redis-cli KEYS "session:*" | xargs redis-cli DEL
   ```

**Short-term (1-4 hours):**
- Audit all chat messages for XSS
- Check for successful XSS execution in player browsers
- Review and enhance Content Security Policy

**Long-term (1-7 days):**
- Implement DOMPurify for message sanitization
- Add CSP headers to Next.js
- Implement message content analysis

---

### PLAYBOOK: Token Expiration Bypass (VULN-005)

**Trigger:** Detected use of expired tokens being accepted

**Immediate Actions (0-15 min):**

1. **Verify vulnerability**
   ```bash
   # Check token validation logs
   grep "Token" /var/log/monkeytown/*.log | grep -v "validated\|validation"
   ```

2. **Deploy expiration check**
   ```typescript
   // Add to validateToken in server/src/websocket/server.ts
   const decoded = jwt.default.verify(token, jwtSecret) as { 
     playerId: string; 
     playerName?: string;
     exp: number;
   };
   
   if (decoded.exp && decoded.exp < Date.now() / 1000) {
     throw new Error('Token expired');
   }
   ```

3. **Audit for abuse**
   ```bash
   # Check for token reuse after expiration
   # Look for session anomalies
   ```

**Short-term (1-4 hours):**
- Force re-authentication for all sessions
- Update authentication documentation

**Long-term (1-7 days):**
- Implement token refresh mechanism
- Add token metadata tracking

---

### PLAYBOOK: WebSocket Message Flood (VULN-006)

**Trigger:** Large WebSocket messages causing issues

**Immediate Actions (0-15 min):**

1. **Identify oversized messages**
   ```bash
   # Check for message size errors
   grep -i "buffer|size|overflow" /var/log/monkeytown/*.log
   ```

2. **Add message size limit**
   ```typescript
   // In server/src/websocket/server.ts
   this.io = new SocketIOServer(httpServer, {
     // ... existing options
     maxHttpBufferSize: 1e6, // 1MB limit
   });
   ```

3. **Block offending connections**
   ```bash
   # Identify and block sources of large messages
   ```

**Short-term (1-4 hours):**
- Monitor for message size anomalies
- Add alerting for large messages

**Long-term (1-7 days):**
- Implement message validation for all types
- Add message queue for rate limiting

---

## Evidence Collection

### Log Locations

| Log | Location | Purpose |
|-----|----------|---------|
| Game Server | `/var/log/monkeytown/game-server.log` | Game actions, connections |
| Web Server | `/var/log/monkeytown/web.log` | HTTP requests |
| Security | `/var/log/monkeytown/security.log` | Auth events |
| Access | `/var/log/monkeytown/access.log` | All connections |

### Collection Script

```bash
#!/bin/bash
# collect-evidence.sh

INCIDENT_ID=$1
mkdir -p /evidence/$INCIDENT_ID

# Collect logs
cp /var/log/monkeytown/*.log /evidence/$INCIDENT_ID/

# Collect network info
netstat -tunap > /evidence/$INCIDENT_ID/network-connections.txt
ss -tunap > /evidence/$INCIDENT_ID/socket-connections.txt

# Collect process info
ps aux > /evidence/$INCIDENT_ID/process-list.txt

# Collect Redis state
redis-cli KEYS "session:*" > /evidence/$INCIDENT_ID/sessions.txt
redis-cli INFO > /evidence/$INCIDENT_ID/redis-info.txt

# Collect database state
pg_dump -h $DB_HOST -U $DB_USER $DB_NAME > /evidence/$INCIDENT_ID/database-backup.sql

# Compress
tar -czf /evidence/$INCIDENT_ID.tar.gz /evidence/$INCIDENT_ID
```

---

## Recovery Checklist

```
□ Vulnerability patched and deployed
□ All security tests passing
□ Affected systems restarted
□ Monitoring verified active
□ Performance benchmarks met
□ Players notified if required
□ Documentation updated
□ Lessons learned documented
□ Process improvements identified
```

---

## Contact Information

| Role | Contact | Availability |
|------|---------|--------------|
| Security Emergency | @jungle-security | 24/7 |
| Operations | @chaos-architect | Business hours |
| Development | @monkey-builder | Business hours |
| Communications | @town-crier | 24/7 |

---

*Incident Response Plan Version: 2.0*
*Last Updated: 2026-01-20*
*Based on actual vulnerability analysis*
*JungleSecurity - Prepared for anything*
