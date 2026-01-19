# Monkeytown Security Requirements

**Version:** 1.0  
**Date:** 2026-01-19  
**Security Analyst:** JungleSecurity  
**Status:** Active

---

## Introduction

This document defines the security requirements for Monkeytown based on the threat model and vulnerability assessment. These requirements must be implemented and verified before production deployment.

## Authentication Requirements

### AUTH-REQ-001: JWT Secret Management

**Requirement:**  
The system MUST NOT use hardcoded secrets for JWT validation. A valid JWT_SECRET environment variable MUST be present in production environments.

**Implementation:**  
```typescript
// server/src/websocket/server.ts
private async validateToken(token: string): Promise<string> {
  const jwt = await import('jsonwebtoken');
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET is required in production');
    }
    // In development, use a known secret but log warning
    console.warn('Using development JWT_SECRET - this is insecure for production');
  }
  
  const decoded = jwt.default.verify(token, secret || 'dev-secret') as { playerId: string; exp?: number };
  return decoded.playerId;
}
```

**Verification:**  
- [ ] JWT_SECRET is required for production deployment
- [ ] Application fails to start without JWT_SECRET in production
- [ ] Warning logged in development mode

---

### AUTH-REQ-002: Token Expiration

**Requirement:**  
All JWT tokens MUST include an expiration claim and the system MUST validate token expiration.

**Implementation:**  
```typescript
interface JWTPayload {
  playerId: string;
  exp: number; // Expiration timestamp
  iat: number; // Issued at
  aud?: string; // Audience
}
```

**Verification:**  
- [ ] Tokens expire within 30 minutes
- [ ] Expired tokens are rejected
- [ ] No perpetual tokens allowed

---

### AUTH-REQ-003: Token Refresh Mechanism

**Requirement:**  
The system MUST provide a token refresh mechanism to allow session continuity without full re-authentication.

**Implementation:**  
```typescript
// POST /api/auth/refresh
// Body: { refreshToken: string }
// Response: { accessToken: string }

router.post('/auth/refresh', async (req, res) => {
  const { refreshToken } = req.body;
  // Validate refresh token and issue new access token
});
```

**Verification:**  
- [ ] Token refresh endpoint exists
- [ ] Refresh tokens have longer expiry (24 hours)
- [ ] Refresh tokens are stored and can be revoked

---

### AUTH-REQ-004: Connection Binding

**Requirement:**  
WebSocket connections SHOULD be bound to client properties (IP, User-Agent) to prevent token theft exploitation.

**Implementation:**  
```typescript
interface BoundToken {
  playerId: string;
  ipHash: string;
  userAgentHash: string;
  exp: number;
}
```

**Verification:**  
- [ ] Tokens validated against connection properties
- [ ] Suspicious connection changes trigger re-authentication

---

## Input Validation Requirements

### INP-REQ-001: Game Action Validation

**Requirement:**  
All game actions MUST be validated before processing. No action data should be trusted.

**Implementation:**  
```typescript
// server/src/game/tictactoe-engine.ts
processAction(
  playerId: string,
  action: TicTacToeAction
): { success: boolean; error?: string; newState?: TicTacToeGameState } {
  // Validate player ownership
  const currentPlayer = this.getCurrentPlayer();
  if (!currentPlayer || currentPlayer.id !== playerId) {
    return { success: false, error: 'Not your turn' };
  }
  
  // Validate action type exists
  if (!action.type) {
    return { success: false, error: 'Action type is required' };
  }
  
  // Validate coordinates exist and are numbers
  if (action.type === 'place') {
    if (typeof action.row !== 'number' || typeof action.col !== 'number') {
      return { success: false, error: 'Row and col must be numbers' };
    }
    if (action.row < 0 || action.row > 2 || action.col < 0 || action.col > 2) {
      return { success: false, error: 'Invalid position' };
    }
  }
  
  // ... rest of implementation
}
```

**Verification:**  
- [ ] All action types validated
- [ ] Coordinates within bounds
- [ ] Player turn validated
- [ ] Action timing validated

---

### INP-REQ-002: Chat Message Sanitization

**Requirement:**  
All chat messages MUST be sanitized to prevent XSS attacks. HTML rendering of user content is prohibited.

**Implementation:**  
```typescript
// server/src/services/validation.ts
import DOMPurify from 'isomorphic-dompurify';

const SANITIZATION_CONFIG = {
  ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'br', 'p'],
  ALLOWED_ATTR: [],
  ALLOW_DATA_ATTR: false,
};

function sanitizeMessage(message: string): string {
  return DOMPurify.sanitize(message, SANITIZATION_CONFIG);
}
```

**Verification:**  
- [ ] XSS payloads are neutralized
- [ ] No raw HTML rendering
- [ ] Message length enforced (500 chars)

---

### INP-REQ-003: Player Input Schema Validation

**Requirement:**  
All external inputs MUST be validated against defined schemas using Zod or equivalent.

**Implementation:**  
```typescript
// server/src/services/validation.ts
const babelActionSchema = z.object({
  type: z.enum(['play_card', 'pass', 'special_babel_tower']),
  cardId: z.string().regex(/^babel-\d+$/).optional(),
  targetPlayerId: z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/).optional(),
}).refine((data) => {
  if (data.type === 'play_card' && !data.cardId) {
    return false;
  }
  return true;
});

export function validateActionWithSchema(action: unknown): { valid: boolean; error?: string; data?: BabelAction } {
  const result = babelActionSchema.safeParse(action);
  if (!result.success) {
    const errors = result.error.errors.map(e => e.message).join(', ');
    return { valid: false, error: `Validation failed: ${errors}` };
  }
  return { valid: true, data: result.data as BabelAction };
}
```

**Verification:**  
- [ ] All schemas defined and tested
- [ ] Invalid inputs rejected
- [ ] Error messages sanitized

---

## Rate Limiting Requirements

### RAT-REQ-001: WebSocket Rate Limiting

**Requirement:**  
WebSocket connections MUST have per-connection rate limiting to prevent DoS attacks.

**Implementation:**  
```typescript
// server/src/websocket/server.ts
interface RateLimitConfig {
  windowMs: number;
  maxActions: number;
  maxConnections: number;
  maxReconnectsPerMinute: number;
}

const RATE_LIMIT: RateLimitConfig = {
  windowMs: 60000,        // 1 minute
  maxActions: 30,         // 30 actions per minute
  maxConnections: 10000,  // Per instance
  maxReconnectsPerMinute: 5,
};

class RateLimiter {
  private actionCounts: Map<string, number[]> = new Map();
  
  allowAction(playerId: string): boolean {
    const now = Date.now();
    const windowStart = now - RATE_LIMIT.windowMs;
    const counts = this.actionCounts.get(playerId) || [];
    
    // Filter to current window
    const validCounts = counts.filter(t => t > windowStart);
    
    if (validCounts.length >= RATE_LIMIT.maxActions) {
      return false;
    }
    
    validCounts.push(now);
    this.actionCounts.set(playerId, validCounts);
    return true;
  }
}
```

**Verification:**  
- [ ] Rate limiting applied to all WebSocket events
- [ ] Limit exceeded triggers disconnect
- [ ] Limits documented and configurable

---

### RAT-REQ-002: HTTP API Rate Limiting

**Requirement:**  
HTTP API endpoints MUST have rate limiting configured appropriately.

**Current Status:** ✅ Implemented (server/src/index.ts:50-55)

**Verification:**  
- [ ] Rate limits documented
- [ ] Retry-After headers present
- [ ] Different limits for different endpoints

---

## Session Management Requirements

### SESS-REQ-001: Session Storage Security

**Requirement:**  
Session data MUST be stored securely with appropriate access controls.

**Implementation:**  
```typescript
// server/src/services/redis.ts
class RedisService {
  private redis: Redis;
  
  async setSession(sessionId: string, data: SessionData): Promise<void> {
    // Sessions expire after 24 hours of inactivity
    await this.redis.setex(
      `session:${sessionId}`,
      86400, // 24 hours
      JSON.stringify(data)
    );
  }
}
```

**Verification:**  
- [ ] Sessions have reasonable expiration
- [ ] Session data encrypted at rest
- [ ] Redis AUTH configured

---

### SESS-REQ-002: Session Binding

**Requirement:**  
Sessions SHOULD be bound to the initial connection properties.

**Implementation:**  
```typescript
interface SessionData {
  playerId: string;
  createdAt: number;
  lastActivityAt: number;
  ipHash: string;
  userAgentHash: string;
  gameIds: string[];
}
```

**Verification:**  
- [ ] Session validates connection properties
- [ ] Suspicious changes trigger re-auth

---

## Data Protection Requirements

### DATA-REQ-001: Database Security

**Requirement:**  
Database connections MUST use authentication and encryption.

**Implementation:**  
```typescript
// server/src/services/database.ts
const db = new DatabaseService(process.env.DATABASE_URL, {
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
});
```

**Verification:**  
- [ ] DATABASE_URL contains credentials
- [ ] SSL/TLS required in production
- [ ] Connection uses least privilege

---

### DATA-REQ-002: PII Protection

**Requirement:**  
Personal Identifiable Information MUST be protected and minimized.

**Implementation:**
- [ ] Only necessary user data collected
- [ ] Passwords hashed with bcrypt
- [ ] API tokens not logged
- [ ] User consent for data collection

**Verification:**  
- [ ] PII inventory documented
- [ ] Data retention policy defined
- [ ] Deletion mechanisms implemented

---

## Logging and Monitoring Requirements

### LOG-REQ-001: Security Event Logging

**Requirement:**  
Security-relevant events MUST be logged for audit and incident response.

**Implementation:**
```typescript
interface SecurityEvent {
  type: 'authentication_failure' | 'rate_limit_exceeded' | 'suspicious_activity';
  playerId?: string;
  ipAddress: string;
  userAgent: string;
  timestamp: number;
  details: Record<string, unknown>;
}

function logSecurityEvent(event: SecurityEvent): void {
  console.log(JSON.stringify({
    level: 'SECURITY',
    ...event,
  }));
}
```

**Events to Log:**
- Authentication failures
- Authorization failures
- Rate limit violations
- Suspicious patterns
- Admin actions

**Verification:**  
- [ ] Security events logged
- [ ] Logs retained for 90 days
- [ ] Alerting on security events

---

## Compliance Requirements

### COMP-REQ-001: HTTPS Enforcement

**Requirement:**  
All production traffic MUST use HTTPS.

**Implementation:**
```yaml
# infrastructure/terraform/main.tf
resource "aws_lb" "monkeytown" {
  # SSL/TLS termination at ALB
}
```

**Verification:**  
- [ ] SSL certificate configured
- [ ] HTTP redirects to HTTPS
- [ ] HSTS header configured

---

### COMP-REQ-002: Security Headers

**Requirement:**  
All responses MUST include appropriate security headers.

**Implementation:**
```typescript
// server/src/index.ts
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
}));
```

**Required Headers:**
- Content-Security-Policy
- X-Content-Type-Options
- X-Frame-Options
- Referrer-Policy
- Strict-Transport-Security

**Verification:**  
- [ ] Security headers present
- [ ] No unsafe inline scripts
- [ ] HSTS enabled

---

## Test Requirements

### TEST-REQ-001: Security Test Coverage

**Requirement:**  
Security tests MUST be included in the test suite.

**Implementation:**
```typescript
// server/src/__tests__/security.test.ts
describe('Authentication Security', () => {
  it('rejects expired tokens', async () => {
    const expiredToken = createExpiredToken();
    await expect(validateToken(expiredToken)).rejects.toThrow();
  });
  
  it('rejects tokens with invalid signature', async () => {
    const forgedToken = createForgedToken();
    await expect(validateToken(forgedToken)).rejects.toThrow();
  });
  
  it('rate limits excessive actions', async () => {
    // Send 31 actions in rapid succession
    for (let i = 0; i < 31; i++) {
      await sendAction(playerId, action);
    }
    // 31st should be rejected
    await expect(sendAction(playerId, action)).rejects.toThrow();
  });
});
```

**Verification:**  
- [ ] Security tests implemented
- [ ] Tests pass in CI
- [ ] Coverage > 80% for security functions

---

## Acceptance Criteria

| Requirement | Priority | Status | Verified |
|-------------|----------|--------|----------|
| AUTH-REQ-001 | P1 | Pending | [ ] |
| AUTH-REQ-002 | P1 | Pending | [ ] |
| AUTH-REQ-003 | P2 | Pending | [ ] |
| AUTH-REQ-004 | P2 | Pending | [ ] |
| INP-REQ-001 | P1 | Pending | [ ] |
| INP-REQ-002 | P1 | Pending | [ ] |
| INP-REQ-003 | P2 | Pending | [ ] |
| RAT-REQ-001 | P1 | Pending | [ ] |
| RAT-REQ-002 | P2 | Pending | [ ] |
| SESS-REQ-001 | P2 | Pending | [ ] |
| SESS-REQ-002 | P3 | Pending | [ ] |
| DATA-REQ-001 | P2 | Pending | [ ] |
| DATA-REQ-002 | P3 | Pending | [ ] |
| LOG-REQ-001 | P2 | Pending | [ ] |
| COMP-REQ-001 | P1 | Pending | [ ] |
| COMP-REQ-002 | P2 | Pending | [ ] |
| TEST-REQ-001 | P2 | Pending | [ ] |

---

## References

- OWASP Application Security Verification Standard: https://owasp.org/www-project-application-security-verification-standard/
- NIST Cybersecurity Framework: https://www.nist.gov/cyberframework
- SOC 2 Trust Services Criteria: https://www.aicpa.org/soc2

---

*Document Version: 1.0*  
*Last Updated: 2026-01-19*  
*JungleSecurity - Protecting Monkeytown*
