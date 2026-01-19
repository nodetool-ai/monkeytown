# Monkeytown Threat Model

**Version:** 1.0  
**Date:** 2026-01-19  
**Security Analyst:** JungleSecurity  
**Status:** Active Review

---

## Executive Summary

This threat model analyzes the security architecture of Monkeytown, an AI-powered multiplayer game platform. The system implements a two-layer architecture with GitHub workflow agents and real-time React/Node.js gameplay. This document identifies potential threats across all system components and provides risk assessments based on actual code analysis.

## System Scope

### In Scope
- Frontend: Next.js 14 React application (`web/`)
- Backend: Node.js 20 Express + Socket.IO server (`server/`)
- Real-time communication: WebSocket/Socket.IO
- Data stores: Redis (sessions/Pub/Sub), PostgreSQL (persistent data)
- Authentication: JWT-based authentication
- Agent layer: @ax-llm/ax framework integration

### Out of Scope
- GitHub Actions infrastructure (external)
- Third-party OAuth providers (external)
- End-user devices (client-side only)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PLAYERS (Browsers)                              │
│                         React Frontend - Next.js 14                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    API GATEWAY / LOAD BALANCER                               │
│                    (Nginx or AWS ALB)                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                        │
                      ┌─────────────────┼─────────────────┐
                      ▼                 ▼                 ▼
             ┌────────────────┐ ┌──────────────┐ ┌─────────────────┐
             │   Web Server   │ │  Game Server │ │  Event Stream   │
             │   (Next.js)    │ │  (Node/TS)   │ │  (Socket.IO)    │
             │    :3000       │ │    :3001     │ │     :8080       │
             └────────────────┘ └──────────────┘ └─────────────────┘
                      │                 │                 │
                      └─────────────────┼─────────────────┘
                                        ▼
                          ┌─────────────────────────┐
                          │    REDIS (Pub/Sub +     │
                          │    Session Store)       │
                          │      redis:6379         │
                          └─────────────────────────┘
                                        │
                                        ▼
                          ┌─────────────────────────┐
                          │   POSTGRESQL (Game      │
                          │   State + Agents)       │
                          │    postgres:5432        │
                          └─────────────────────────┘
```

## Trust Boundaries

| Boundary | Description | Trust Level |
|----------|-------------|-------------|
| Player → Load Balancer | External traffic | Untrusted |
| Load Balancer → Web Server | Internal traffic | Trusted |
| Web Server → Game Server | Internal API calls | Trusted |
| Game Server → Database | Database queries | Trusted |
| WebSocket Clients → Event Stream | Real-time game data | Authenticated |

## Data Flow Analysis

### Authentication Flow

```
Player → Web → OAuth Provider → Callback → JWT → WebSocket
```

**Current Implementation (server/src/websocket/server.ts:221-224):**
```typescript
private async validateToken(token: string): Promise<string> {
  const jwt = await import('jsonwebtoken');
  const decoded = jwt.default.verify(token, process.env.JWT_SECRET || 'dev-secret') as { playerId: string };
  return decoded.playerId;
}
```

**Security Concern:** Hardcoded fallback secret `dev-secret` enables token forgery if JWT_SECRET not set.

### Game Action Flow

```
Player Action → WebSocket → Game Server → Redis Pub/Sub → All Players
                            ↓
                     PostgreSQL (persistent)
```

**Current Implementation (server/src/websocket/server.ts:134-171):**
- Actions processed through `game:action` event
- Game-specific processing (TicTacToe/Babel)
- State broadcast to all players in game room

### Chat Message Flow

```
Player Input → Sanitization → Database → Redis Pub/Sub → All Players
```

**Current Implementation (server/src/websocket/server.ts:173-202):**
- Chat messages sanitized using basic HTML tag stripping
- Persisted to PostgreSQL
- Broadcast via Socket.IO room

## Threat Identification

### AUTH-001: JWT Secret Hardcoded Fallback

**Severity:** Critical  
**Status:** Confirmed  
**Component:** `server/src/websocket/server.ts:223`

**Description:**
The WebSocket authentication uses a hardcoded fallback JWT secret `dev-secret` when `JWT_SECRET` environment variable is not set. This allows any attacker to forge valid JWT tokens and authenticate as any player.

**Evidence:**
```typescript
const decoded = jwt.default.verify(token, process.env.JWT_SECRET || 'dev-secret') as { playerId: string };
```

**Impact:**
- Complete account takeover
- Unauthorized game access
- Player impersonation
- Potential data manipulation

**Affected Code:**
- `server/src/websocket/server.ts:223`

**Recommendation:**
1. Fail fast if JWT_SECRET not set in production
2. Enforce environment variable configuration
3. Implement JWT token rotation
4. Add token binding to IP/User-Agent

---

### AUTH-002: Weak Token Validation

**Severity:** High  
**Status:** Confirmed  
**Component:** `server/src/index.ts`

**Description:**
No token expiration checking or audience validation in the current implementation. JWT tokens are verified without checking standard JWT claims.

**Evidence:**
The `validateToken` function only extracts `playerId` without validating standard JWT claims like `exp`.

**Impact:**
- Stolen tokens remain valid indefinitely
- No token refresh mechanism
- Extended window for token replay attacks

**Recommendation:**
1. Implement `exp` claim validation
2. Add `aud` claim verification
3. Implement token refresh endpoint
4. Set reasonable token expiration (15-30 minutes)

---

### WS-001: Missing WebSocket Rate Limiting

**Severity:** High  
**Status:** Confirmed  
**Component:** `server/src/websocket/server.ts`

**Description:**
While HTTP API endpoints have rate limiting (`express-rate-limit`), WebSocket connections do not have per-connection rate limiting implemented. This allows resource exhaustion through message flooding.

**Current Rate Limiting (server/src/index.ts:50-55):**
```typescript
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  message: { error: 'Too many requests' },
});
app.use('/api/', limiter);
```

**Impact:**
- Denial of service through connection flooding
- Server resource exhaustion
- Degraded game performance for legitimate players

**Affected Code:**
- `server/src/websocket/server.ts` - No Socket.IO-level rate limiting

**Recommendation:**
1. Implement per-socket rate limiting using Socket.IO middleware
2. Limit action events to 30 per minute per player
3. Implement connection throttling
4. Add automatic disconnect for rate limit violators

---

### WS-002: No Connection Validation

**Severity:** Medium  
**Status:** Confirmed  
**Component:** `server/src/websocket/server.ts:59-74`

**Description:**
WebSocket connections accept tokens but do not validate connection properties like IP address consistency or User-Agent.

**Impact:**
- Token theft through man-in-the-middle
- Session hijacking
- No protection against connection hijacking

**Recommendation:**
1. Bind tokens to IP addresses
2. Validate User-Agent consistency
3. Implement connection tokens with short TTL

---

### INJ-001: Incomplete Chat Sanitization

**Severity:** Medium  
**Status:** Confirmed  
**Component:** `server/src/services/validation.ts:161-167`

**Description:**
Chat message sanitization only strips basic HTML tags but does not prevent all XSS vectors.

**Current Sanitization:**
```typescript
private sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}
```

**Bypass Examples:**
- Event handlers: `<svg onload=alert(1)>`
- CSS injection: `background:url(javascript:alert(1))`
- Data URLs: `data:text/html,<script>alert(1)</script>`

**Impact:**
- Cross-site scripting attacks
- Cookie theft
- Session hijacking
- Malicious redirects

**Recommendation:**
1. Use a well-tested sanitization library (DOMPurify, sanitize-html)
2. Implement Content Security Policy headers
3. Escape HTML entities properly
4. Consider markdown rendering instead of raw HTML

---

### INJ-002: Game Action Validation Gaps

**Severity:** Medium  
**Status:** Potential Risk  
**Component:** `server/src/game/tictactoe-engine.ts`

**Description:**
TicTacToe game actions are validated at the engine level, but there are potential gaps in validating action sequences and timing.

**Current Validation (server/src/game/tictactoe-engine.ts:140-143):**
```typescript
// Validate coordinates
if (row < 0 || row > 2 || col < 0 || col > 2) {
  return { success: false, error: 'Invalid position: row and col must be 0-2' };
}
```

**Potential Issues:**
- No validation of action timing (prevent rapid-fire moves)
- Race conditions in concurrent action processing
- No action cooldown enforcement

**Impact:**
- Game state corruption
- Unfair advantage through timing attacks
- Potential for game exploits

**Recommendation:**
1. Implement action timestamps and validate timing windows
2. Add action sequence numbering
3. Implement optimistic locking for game state
4. Add action cooldowns (minimum 500ms between actions)

---

### GAME-001: Missing Game State Integrity

**Severity:** Medium  
**Status:** Potential Risk  
**Component:** `server/src/game/session.ts`

**Description:**
Game state is updated without cryptographic integrity protection, allowing potential tampering if Redis is compromised.

**Impact:**
- Modified game state in transit
- Cheating through state manipulation
- Unfair game outcomes

**Recommendation:**
1. Implement state signing for critical game events
2. Use HMAC for state verification
3. Implement state version numbering
4. Add state conflict detection

---

### SEC-001: Missing Security Headers

**Severity:** Medium  
**Status:** Confirmed  
**Component:** `web/`

**Description:**
Frontend Next.js application lacks explicit Content Security Policy (CSP) headers and other security headers.

**Missing Headers:**
- Content-Security-Policy
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy

**Impact:**
- XSS attacks more effective
- Clickjacking vulnerabilities
- Information leakage through referrers

**Recommendation:**
1. Implement CSP headers in Next.js configuration
2. Add helmet middleware equivalent for frontend
3. Configure strict Content Security Policy
4. Enable HSTS in production

---

### CORS-001: Permissive CORS Configuration

**Severity:** Low  
**Status:** Confirmed (Development Only)  
**Component:** `server/src/index.ts:45-48`

**Description:**
CORS is configured to allow origins from environment variable, but default includes wildcard patterns in development.

**Current Configuration:**
```typescript
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
}));
```

**Risk:** If CORS_ORIGINS is misconfigured or empty, could allow unintended origins.

**Recommendation:**
1. Validate CORS_ORIGINS format
2. Reject wildcard patterns in production
3. Implement explicit origin whitelist
4. Add CORS preflight logging

---

### SEC-002: Information Disclosure in Error Messages

**Severity:** Low  
**Status:** Confirmed  
**Component:** `server/src/websocket/server.ts:117-120`

**Description:**
Error messages may disclose internal system information to players.

**Example:**
```typescript
socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
```

**Potential Issue:**
- Debug mode may expose stack traces
- Database errors could leak schema information

**Recommendation:**
1. Implement error message sanitization
2. Separate internal and external error messages
3. Log detailed errors server-side only
4. Use generic error codes for client responses

---

## Risk Summary

| Threat ID | Severity | Status | Remediation Priority |
|-----------|----------|--------|---------------------|
| AUTH-001 | Critical | Confirmed | P1 - Immediate |
| AUTH-002 | High | Confirmed | P1 - Immediate |
| WS-001 | High | Confirmed | P1 - Immediate |
| WS-002 | Medium | Confirmed | P2 - Short-term |
| INJ-001 | Medium | Confirmed | P2 - Short-term |
| INJ-002 | Medium | Potential | P2 - Short-term |
| GAME-001 | Medium | Potential | P2 - Short-term |
| SEC-001 | Medium | Confirmed | P2 - Short-term |
| CORS-001 | Low | Confirmed | P3 - Normal |
| SEC-002 | Low | Confirmed | P3 - Normal |

## Security Controls Matrix

| Control | Implemented | Effectiveness | Notes |
|---------|-------------|---------------|-------|
| JWT Authentication | ✅ | Medium | Needs secret hardening |
| Password Hashing | ✅ | High | Using bcryptjs |
| Input Validation | ⚠️ Partial | Medium | Zod schemas exist, gaps in game logic |
| Rate Limiting | ⚠️ Partial | Low | HTTP only, WebSocket missing |
| SSL/TLS | ✅ | High | At load balancer level |
| CORS | ✅ | Medium | Configurable, needs validation |
| Helmet Security Headers | ✅ | High | On Express backend |
| XSS Protection | ⚠️ Partial | Low | Basic sanitization only |
| Session Management | ⚠️ Partial | Medium | Redis sessions, no refresh |
| Audit Logging | ❌ | N/A | No audit trail implementation |

## Recommended Security Roadmap

### Immediate (P1)
1. Fix hardcoded JWT secret fallback
2. Implement WebSocket rate limiting
3. Add JWT expiration validation
4. Implement proper chat sanitization

### Short-term (P2)
5. Add Content Security Policy headers
6. Implement token refresh mechanism
7. Add connection binding (IP/User-Agent)
8. Implement game state integrity

### Normal (P3)
9. Add comprehensive audit logging
10. Implement anomaly detection
11. Add intrusion detection capabilities
12. Security headers for frontend
13. Implement bug bounty program

## Threat Model Maintenance

**Review Schedule:** Quarterly or after major architecture changes  
**Last Review:** 2026-01-19  
**Next Review:** 2026-04-19  
**Owner:** JungleSecurity

## References

- Architecture: `.monkeytown/architecture/system-design.md`
- Security Requirements: `.monkeytown/security/security-requirements.md`
- Vulnerability Assessment: `.monkeytown/security/vulnerability-assessment.md`
- Incident Response: `.monkeytown/security/incident-response.md`

---

*Document Version: 1.0*  
*Last Updated: 2026-01-19*  
*JungleSecurity - Protecting Monkeytown*
