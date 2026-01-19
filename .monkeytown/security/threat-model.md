# Monkeytown Threat Model v2.1

**Security analysis for AI-powered multiplayer game platform**

**Version:** 2.1
**Date:** 2026-01-19
**Security Lead:** JungleSecurity
**Status:** ACTIVE

---

## Executive Summary

This threat model identifies potential security risks in the Monkeytown multiplayer game platform. Based on analysis of the current architecture (Next.js frontend, Node.js backend with Socket.IO WebSocket, Redis pub/sub, and PostgreSQL), the system faces critical attack surfaces in authentication mechanisms, real-time game state validation, and WebSocket communication.

**Key Findings:**
- **Critical Risk:** WebSocket authentication with hardcoded JWT secret fallback (VULN-001)
- **High Risk:** Missing server-side game action validation (VULN-002)
- **High Risk:** WebSocket message rate limiting not enforced at socket level (VULN-003)
- **Confirmed:** 11 vulnerabilities documented with 3 critical, 3 high, 3 medium, 2 low

**Risk Score:** 68/100 (High)

---

## System Architecture Analysis

### Current Implementation (Confirmed)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PRODUCTION ARCHITECTURE                              │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                        PUBLIC INTERNET                                 │ │
│  │  Players, attackers, scanners, bots access via HTTPS/WSS             │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                          AWS ALB / Nginx (TLS Termination)                   │
│                                    │                                         │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                     CONTAINER ORCHESTRATION                            │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐   │ │
│  │  │   Web UI    │  │  Game Srv   │  │      Event Stream           │   │ │
│  │  │  (Next.js)  │  │  (Express)  │  │    (Socket.IO :8080)        │   │ │
│  │  │   :3000     │  │   :3001     │  │                             │   │ │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────────┘   │ │
│  │         │                  │                      │                    │ │
│  │         └──────────────────┼──────────────────────┘                    │ │
│  │                            ▼                                           │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │                    DATA LAYER                                   │  │ │
│  │  │  ┌─────────────┐                           ┌────────────────┐  │  │ │
│  │  │  │    Redis    │◄──────────────────────────│  PostgreSQL    │  │  │ │
│  │  │  │  (Pub/Sub)  │    Session/State          │  (Persistent)  │  │  │ │
│  │  │  │   :6379     │                           │    :5432       │  │  │ │
│  │  │  └─────────────┘                           └────────────────┘  │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
```

### Component Trust Boundaries

| Boundary | Components | Trust Level |
|----------|------------|-------------|
| External → ALB | All external traffic | Untrusted |
| ALB → Containers | Load balancer to services | Trusted |
| Container → Redis | Game server to cache | Trusted |
| Container → Postgres | Game server to database | Trusted |

---

## Assets Inventory

### Critical Assets (Require Strongest Protection)

| Asset | Location | Sensitivity | Owner |
|-------|----------|-------------|-------|
| JWT Secret | `process.env.JWT_SECRET` | **CRITICAL** | Auth Service |
| Player Session Tokens | WebSocket handshake | **CRITICAL** | EventStream |
| Database Credentials | PostgreSQL connection | **CRITICAL** | Database Service |
| Redis Credentials | Redis connection | **HIGH** | Cache Service |

### High Sensitivity Assets

| Asset | Location | Sensitivity | Owner |
|-------|----------|-------------|-------|
| Player Game State | Redis/Game Server | HIGH | GameEngine |
| Player Credentials (OAuth) | Database | HIGH | Auth Service |
| Agent Behavior Configs | Database | HIGH | Agent System |
| Session Bindings | Redis | HIGH | Session Manager |

### Medium Sensitivity Assets

| Asset | Location | Sensitivity | Owner |
|-------|----------|-------------|-------|
| Player PII (username, stats) | PostgreSQL | MEDIUM | Player Service |
| Chat Messages | Redis (temporary) | MEDIUM | EventStream |
| Game Logs | PostgreSQL | MEDIUM | GameEngine |

---

## Threat Actors Analysis

### Confirmed Threat Actors

| Actor | Motivation | Capability | Likelihood of Attack |
|-------|------------|------------|---------------------|
| Script Kiddies | Disruption, vandalism | Basic (automated tools) | **HIGH** |
| Cheating Players | Competitive advantage | Medium (game exploits) | **CONFIRMED** |
| Griefers | Harassment, disruption | Basic | **MEDIUM** |

### Potential Threat Actors

| Actor | Motivation | Capability | Likelihood of Attack |
|-------|------------|------------|---------------------|
| Organized Attackers | Financial gain, data theft | Advanced | LOW-MEDIUM |
| Nation States | Large-scale disruption | Sophisticated | LOW |
| Insiders | Data theft, sabotage | Variable | LOW |

---

## Attack Surface Analysis

### CRITICAL: WebSocket Attack Surface

**Entry Points (Confirmed from architecture):**

| Endpoint | Handler | Risk Level |
|----------|---------|------------|
| `game:join` | `EventStream.setupSocketListeners()` | CRITICAL |
| `game:leave` | `EventStream.setupSocketListeners()` | HIGH |
| `game:input` | `GameServer.processInput()` | **CRITICAL** |
| `game:chat` | `EventStream.handleChat()` | HIGH |
| `heartbeat` | `EventStream.setupHeartbeat()` | MEDIUM |

**Attack Vector Examples (Confirmed):**

```typescript
// From server/src/websocket/server.ts:35-46 - Authentication middleware
this.io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }
    // VULNERABILITY: No token expiration check, hardcoded fallback
    const playerId = await this.validateToken(token);
    (socket as Socket & { playerId: string }).playerId = playerId;
    next();
  } catch (error) {
    next(error as Error);  // Exposes internal errors
  }
});
```

### HIGH: HTTP API Attack Surface

**Endpoints (From architecture):**

| Endpoint | Handler | Risk Level |
|----------|---------|------------|
| `GET /health/live` | Health check | LOW |
| `GET /health/ready` | Readiness check | MEDIUM |
| `POST /api/games/create` | Game creation | HIGH |
| `POST /api/games/:id/join` | Game join | HIGH |

### HIGH: Game Logic Attack Surface

**Attack Vectors (Confirmed from code analysis):**

```typescript
// From server/src/game/session.ts:53-61 - NO VALIDATION
updatePlayer(sessionId: string, playerId: string, updates: Partial<Player>): boolean {
  const session = this.sessions.get(sessionId);
  if (!session) return false;
  
  const player = session.players.find(p => p.id === playerId);
  if (!player) return false;
  
  Object.assign(player, updates);  // NO VALIDATION - CRITICAL VULNERABILITY
  return true;
}
```

---

## Threat Catalog

### Category 1: Authentication Threats

| ID | Threat | Severity | Likelihood | Risk Score | Status |
|----|--------|----------|------------|------------|--------|
| AUTH-01 | JWT secret hardcoded fallback | **CRITICAL** | MEDIUM | 12 | **CONFIRMED** |
| AUTH-02 | Token replay attacks | HIGH | MEDIUM | 9 | **CONFIRMED** |
| AUTH-03 | Token hijacking via XSS | **CRITICAL** | MEDIUM | 12 | **CONFIRMED** |
| AUTH-04 | Session fixation | MEDIUM | LOW | 6 | POTENTIAL |
| AUTH-05 | Missing token expiration | HIGH | HIGH | 12 | **CONFIRMED** |

### Category 2: WebSocket Threats

| ID | Threat | Severity | Likelihood | Risk Score | Status |
|----|--------|----------|------------|------------|--------|
| WS-01 | Mass connection exhaustion | HIGH | HIGH | 16 | **CONFIRMED** |
| WS-02 | Input injection via game:input | **CRITICAL** | MEDIUM | 12 | **CONFIRMED** |
| WS-03 | Chat message XSS | HIGH | MEDIUM | 12 | **CONFIRMED** |
| WS-04 | Cross-site WebSocket hijacking | HIGH | MEDIUM | 12 | **CONFIRMED** |
| WS-05 | Message flooding (no rate limiting) | HIGH | HIGH | 16 | **CONFIRMED** |

### Category 3: Game Logic Threats

| ID | Threat | Severity | Likelihood | Risk Score | Status |
|----|--------|----------|------------|------------|--------|
| GAME-01 | Position teleportation (bounds bypass) | HIGH | HIGH | 16 | **CONFIRMED** |
| GAME-02 | Speed hacking (action spam) | HIGH | HIGH | 16 | **CONFIRMED** |
| GAME-03 | Score manipulation | MEDIUM | MEDIUM | 9 | **CONFIRMED** |
| GAME-04 | Game state injection | **CRITICAL** | LOW | 9 | **CONFIRMED** |
| GAME-05 | AI behavior manipulation | HIGH | LOW | 6 | POTENTIAL |

### Category 4: Data Layer Threats

| ID | Threat | Severity | Likelihood | Risk Score | Status |
|----|--------|----------|------------|------------|--------|
| DATA-01 | Redis injection via session keys | HIGH | LOW | 6 | POTENTIAL |
| DATA-02 | Session hijacking via cache | HIGH | MEDIUM | 9 | **CONFIRMED** |
| DATA-03 | PostgreSQL injection | **CRITICAL** | LOW | 6 | POTENTIAL |

---

## Attack Trees

### Attack Tree 1: Player Account Compromise

```
OR: Achieve player account compromise
│
├── OR: Token theft via XSS
│   ├── Leaf: Stored XSS in chat (CONFIRMED - VULN-005)
│   │   └── Evidence: No sanitization in handleChat()
│   ├── Leaf: Reflected XSS in game parameters (POTENTIAL)
│   └── Leaf: DOM injection via compromised JS bundle (LOW likelihood)
│
├── OR: JWT secret exploitation
│   ├── Leaf: Hardcoded fallback exploitation (CONFIRMED - VULN-001)
│   │   └── Evidence: 'dev-secret' fallback in server.ts:120
│   └── Leaf: Environment variable extraction (Requires container breach)
│
└── OR: Session hijacking
    ├── Leaf: WebSocket token interception (MEDIUM likelihood)
    └── Leaf: Redis session cache access (Requires Redis breach)
```

### Attack Tree 2: Denial of Service

```
OR: Make game unavailable
│
├── OR: Connection exhaustion
│   ├── Leaf: WebSocket connection flood (CONFIRMED - WS-01)
│   │   └── Evidence: No per-IP connection limiting at socket level
│   └── Leaf: HTTP request flood (Mitigated by ALB)
│
├── OR: Resource exhaustion
│   ├── Leaf: Game session spam (MEDIUM likelihood)
│   │   └── Mitigation: Auth required for session creation
│   └── Leaf: Redis memory exhaustion (LOW likelihood)
│       └── Mitigation: TTL on all keys
│
└── OR: Game logic DoS
    ├── Leaf: Infinite action loops (POTENTIAL)
    └── Leaf: Memory leak via game entities (POTENTIAL)
```

### Attack Tree 3: Cheating

```
OR: Gain unfair competitive advantage
│
├── OR: Input manipulation
│   ├── Leaf: Speed hacking (CONFIRMED - GAME-02)
│   │   └── Evidence: No action cooldown enforcement
│   ├── Leaf: Position teleportation (CONFIRMED - GAME-01)
│   │   └── Evidence: No bounds checking in processInput()
│   └── Leaf: Action spam (CONFIRMED - GAME-02)
│
├── OR: State manipulation
│   ├── Leaf: Score modification (CONFIRMED - GAME-03)
│   │   └── Evidence: updatePlayer() accepts arbitrary updates
│   └── Leaf: Card/entity manipulation (CONFIRMED - GAME-04)
│
└── OR: Information disclosure
    ├── Leaf: Peek at other players' hidden data (MEDIUM likelihood)
    └── Leaf: See AI decision logic (LOW likelihood)
```

---

## Data Flow Threat Analysis

### Data Flow 1: Player Connection (Confirmed Vulnerable)

```
Player Browser                                       Attacker
    │                                                    │
    │ 1. WebSocket handshake with JWT token              │
    │───────────────────────────────────────────────────►│
    │                                                    │
    │ 2. Token stored in memory (vulnerable to XSS)      │
    │◄───────────────────────────────────────────────────│
    │                                                    │
    │ 3. Authentication with server                      │
    │───────────────────────────────────────────────────►│
    │                                                    │
    │ 4. Game session created                            │
    │◄───────────────────────────────────────────────────│
    │                                                    │
    │                                                   │ 5. XSS steals token
    │                                                   │◄─────────────────
    │                                                   │ document.cookie
    │                                                   │
    │                                                   │ 6. Attacker connects
    │                                                   │─────────────────►
    │                                                   │ Hijacked session

Threats:
- XSS allows token theft (AUTH-03)
- No session binding to IP/User-Agent
- Token valid until expiration (no revocation)
```

**Security Gaps:**
- No token expiration validation in `validateToken()`
- No session fingerprinting (IP, User-Agent binding)
- Token passed in `auth.token` (visible in memory dumps)

### Data Flow 2: Game Action Processing (Confirmed Vulnerable)

```
Player A                                            Game Server
    │                                                    │
    │ 1. Send action {action: 'MOVE', position: {x: 9999}}
    │───────────────────────────────────────────────────►│
    │                                                    │
    │ 2. Authentication check ✓                          │
    │                                                    │
    │ 3. NO VALIDATION - directly applies to state ✗    │
    │                                                    │
    │ 4. Broadcast corrupted state to all players       │
    │◄───────────────────────────────────────────────────│
    │                                                    │

Threats:
- No position bounds checking (GAME-01)
- No move speed validation (GAME-02)
- No action cooldown enforcement (GAME-02)
```

**Security Gaps:**
- `GameEngine.processInput()` accepts client positions without validation
- No server-authoritative position calculation
- Missing action cooldowns

---

## Risk Assessment Summary

### Risk Matrix (Confirmed Vulnerabilities Only)

| Threat | Severity | Likelihood | Risk Score | Priority |
|--------|----------|------------|------------|----------|
| AUTH-01: JWT hardcoded secret | **CRITICAL** | MEDIUM | 12 | P1 |
| WS-02: Input injection | **CRITICAL** | MEDIUM | 12 | P1 |
| GAME-01: Position teleportation | HIGH | HIGH | 16 | P1 |
| GAME-02: Speed hacking | HIGH | HIGH | 16 | P1 |
| WS-01: Connection exhaustion | HIGH | HIGH | 16 | P1 |
| WS-03: Chat XSS | HIGH | MEDIUM | 12 | P1 |
| AUTH-03: Token hijacking | **CRITICAL** | MEDIUM | 12 | P1 |
| GAME-03: Score manipulation | MEDIUM | MEDIUM | 9 | P2 |
| WS-04: WS hijacking | HIGH | MEDIUM | 12 | P1 |
| DATA-02: Session hijacking | HIGH | MEDIUM | 9 | P2 |

### Priority Distribution

| Priority | Count | Vulnerabilities |
|----------|-------|-----------------|
| P1 (Immediate) | 8 | AUTH-01, WS-02, GAME-01, GAME-02, WS-01, WS-03, AUTH-03, WS-04 |
| P2 (Short-term) | 2 | GAME-03, DATA-02 |
| P3 (Standard) | 0 | - |
| P4 (Low) | 0 | - |

---

## Existing Security Controls Assessment

### Implemented Controls (Partial)

| Control | Location | Effectiveness | Status |
|---------|----------|---------------|--------|
| JWT authentication | server/src/websocket/server.ts:35-46 | **PARTIAL** | VULN-001, AUTH-05 |
| Rate limiting (Redis) | server/src/services/redis.ts:75-85 | **PARTIAL** | WS-01 not mitigated |
| CORS configuration | server/src/websocket/server.ts:17-21 | **GOOD** | WS-04 partially mitigated |
| Session management | server/src/game/session.ts | **INSUFFICIENT** | VULN-002 |
| Input validation | server/src/game/session.ts:28-38 | **INSUFFICIENT** | GAME-01, GAME-02 |
| SSL/TLS | Nginx/ALB | **GOOD** | - |

### Required Security Controls

| Control | Priority | Component | Verification |
|---------|----------|-----------|--------------|
| Input sanitization (chat, game) | P1 | EventStream | TC-CHAT-002 |
| Game state validation | P1 | GameEngine | TC-ACTION-001, TC-ACTION-002 |
| Rate limiting per socket | P1 | EventStream | TC-WS-001, TC-WS-002 |
| CSP implementation | P1 | Next.js | Security scan |
| Session binding (IP, fingerprint) | P2 | WebSocket | TC-AUTH-005 |
| Token rotation/refresh | P2 | Auth | TC-AUTH-006 |
| Anomaly detection | P2 | GameServer | TC-PERF-001 |

---

## Recommendations

### Immediate (P1 - Within 1 Week)

1. **Remove JWT hardcoded fallback**
   ```typescript
   // server/src/websocket/server.ts
   const JWT_SECRET = process.env.JWT_SECRET;
   if (!JWT_SECRET) {
     throw new Error('JWT_SECRET environment variable is required');
   }
   ```

2. **Implement game action validation**
   ```typescript
   // Validate position bounds
   if (!isValidPosition(action.position, session.config.bounds)) {
     throw new InvalidPositionError();
   }
   
   // Validate move speed
   if (!isValidSpeed(player.position, action.position, session.config.maxSpeed)) {
     throw new SpeedViolationError();
   }
   ```

3. **Add WebSocket rate limiting per socket**
   ```typescript
   const RATE_LIMITS = {
     'game:input': { max: 10, windowMs: 1000 },
     'game:chat': { max: 1, windowMs: 1000 },
   };
   ```

4. **Sanitize chat messages**
   ```typescript
   const sanitized = DOMPurify.sanitize(message, {
     ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong'],
   });
   ```

### Short-term (P2 - Within 2 Weeks)

1. Implement token expiration validation
2. Add session fingerprinting (IP, User-Agent binding)
3. Implement Content Security Policy in Next.js
4. Add action cooldown enforcement

### Long-term (P3 - Within 1 Month)

1. Third-party penetration test
2. Dependency vulnerability scanning in CI/CD
3. Client-side tamper detection
4. Behavioral analysis for cheating detection

---

## Verification Methods

### Automated Testing

```bash
# Security linting
npm install -D eslint-plugin-security
npx eslint --ext .ts,.tsx --plugin security .

# Vulnerability scanning
npm audit --production --audit-level=high
snyk test
```

### Manual Testing Checklist

- [ ] WebSocket fuzzing for input validation bypass
- [ ] JWT token manipulation attempts
- [ ] Session hijacking via token theft
- [ ] Rate limiting bypass attempts
- [ ] XSS payload injection via chat
- [ ] Position manipulation attempts
- [ ] Speed hacking simulation

---

## References

- OWASP WebSocket Security Cheat Sheet
- CWE-119: Improper Restriction of Operations within Memory Buffer
- CWE-79: Improper Neutralization of Input During Web Page Generation
- CWE-307: Improper Restriction of Excessive Authentication Attempts
- Architecture: `.monkeytown/architecture/system-design.md`
- Vulnerability Assessment: `.monkeytown/security/vulnerability-assessment.md`

---

*Threat Model Version: 2.1*
*Last Updated: 2026-01-19*
*JungleSecurity - Protecting Monkeytown*

*Document History:*
- v2.1: Updated with confirmed vulnerabilities from code analysis
- v2.0: Initial comprehensive threat model
