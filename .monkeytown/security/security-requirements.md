# Monkeytown Security Requirements v2.0

**Mandatory security controls for all Monkeytown components**

**Security Analyst:** JungleSecurity  
**Version:** 2.0  
**Date:** 2026-01-20

---

## Authentication Requirements

### AUTH-001: Token Management (CRITICAL - VULN-001)

**Requirement:**
All authentication tokens MUST:
- Be generated using cryptographically secure random number generators
- Be signed with a 256-bit or stronger secret key
- Have maximum 24-hour validity
- Be bound to session context (IP, User-Agent)
- NEVER use fallback secrets in any environment

**Implementation:**
```typescript
interface TokenPayload {
  playerId: string;
  sessionId: string;
  ip: string;
  userAgent: string;
  iat: number;
  exp: number;
}

// Token generation - MUST require JWT_SECRET
function generateToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: TokenPayload = {
    ...payload,
    iat: now,
    exp: now + 86400,  // 24 hours
  };
  
  return jwt.sign(fullPayload, secret, {
    algorithm: 'HS256',
  });
}

// Token validation - MUST enforce expiration and binding
async function validateToken(token: string, context: { ip: string; userAgent: string }): Promise<TokenPayload | null> {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET not configured');
  }
  
  try {
    const decoded = jwt.verify(token, secret) as TokenPayload;
    
    // Verify session binding
    if (decoded.ip !== context.ip || decoded.userAgent !== context.userAgent) {
      return null;
    }
    
    return decoded;
  } catch {
    return null;
  }
}
```

**Evidence:**
- Current implementation violates this: `server/src/websocket/server.ts:223` uses `process.env.JWT_SECRET || 'dev-secret'`
- Status: **VIOLATION** - Code review confirmed

**Verification:**
- Unit test token generation and validation
- Integration test token binding enforcement
- Penetration test token forgery attempts
- CI check for hardcoded secrets

---

### AUTH-002: Credential Storage (CRITICAL)

**Requirement:**
No credentials may be stored in:
- Source code
- Configuration files in version control
- Log files
- Error messages
- Any fallback values

**Implementation:**
```bash
# .env.example ( NEVER commit .env )
JWT_SECRET=your-secure-random-64-byte-secret-here-must-be-at-least-32-chars
REDIS_PASSWORD=your-secure-password-here
DATABASE_URL=postgresql://user:password@host:5432/db
```

**Verification:**
- CI/CD pipeline scan for secrets in code
- Pre-commit hook to prevent accidental commits
- Regular secret scanning of repository
- No 'dev-secret' or similar patterns in codebase

---

### AUTH-003: Session Management (HIGH - VULN-007, VULN-008)

**Requirement:**
- Sessions must expire after 30 minutes of inactivity
- Maximum concurrent sessions per player: 3
- Logout must invalidate the session server-side
- Session tokens must be stored securely in the browser
- Token refresh mechanism must be implemented

**Implementation:**
```typescript
class SessionManager {
  private readonly INACTIVITY_TIMEOUT = 30 * 60 * 1000;  // 30 minutes
  private readonly MAX_CONCURRENT_SESSIONS = 3;
  private readonly TOKEN_REFRESH_WINDOW = 60 * 60 * 1000;  // 1 hour
  
  async createSession(playerId: string): Promise<Session> {
    const activeSessions = await this.getActiveSessionCount(playerId);
    if (activeSessions >= this.MAX_CONCURRENT_SESSIONS) {
      throw new Error('Maximum concurrent sessions reached');
    }
    
    const session: Session = {
      id: crypto.randomUUID(),
      playerId,
      createdAt: Date.now(),
      lastActivity: Date.now(),
    };
    
    await this.redis.setex(
      `session:${session.id}`,
      this.INACTIVITY_TIMEOUT / 1000,
      JSON.stringify(session)
    );
    
    return session;
  }
  
  async invalidateSession(sessionId: string): Promise<void> {
    await this.redis.del(`session:${sessionId}`);
    await this.redis.setex(`blacklist:${sessionId}`, 86400, 'true');
  }
  
  async refreshSessionIfNeeded(sessionId: string): Promise<string | null> {
    const session = await this.redis.get(`session:${sessionId}`);
    if (!session) return null;
    
    const parsed = JSON.parse(session);
    const now = Date.now();
    
    // Check if within refresh window
    if (now - parsed.createdAt > this.TOKEN_REFRESH_WINDOW) {
      // Generate new token
      return this.generateRefreshedToken(parsed);
    }
    
    return null;
  }
}
```

**Verification:**
- Test session expiration behavior
- Test concurrent session limit
- Test session invalidation
- Test token refresh flow

---

## Authorization Requirements

### AUTHZ-001: Game Session Access Control (CRITICAL - VULN-002)

**Requirement:**
- Players may only access game sessions they are explicitly authorized for
- Authorization must be verified on every WebSocket event
- No player may modify another player's state
- All player state updates must be validated against game rules

**Implementation:**
```typescript
class GameAuthorization {
  async canPlayerAccessSession(playerId: string, sessionId: string): Promise<boolean> {
    const session = await this.sessionManager.getSession(sessionId);
    if (!session) return false;
    
    return session.players.some(p => p.id === playerId);
  }
  
  async canPlayerPerformAction(
    playerId: string,
    sessionId: string,
    action: GameAction
  ): Promise<boolean> {
    // Verify session access
    if (!await this.canPlayerAccessSession(playerId, sessionId)) {
      return false;
    }
    
    // Action-specific authorization
    switch (action.type) {
      case 'MOVE':
        return this.canPlayerMove(playerId, sessionId, action.position);
      case 'PLAY_CARD':
        return this.canPlayerPlayCard(playerId, sessionId, action.cardId);
      case 'CHAT':
        return this.canPlayerChat(playerId, sessionId);
      default:
        return false;
    }
  }
  
  private canPlayerMove(playerId: string, sessionId: string, position: Vector2D): boolean {
    const session = this.sessionManager.getSession(sessionId);
    if (!session) return false;
    
    const player = session.players.find(p => p.id === playerId);
    if (!player) return false;
    
    // Validate position bounds
    if (!this.isValidPosition(position, session.config.bounds)) {
      return false;
    }
    
    // Validate move speed (prevent teleportation)
    if (!this.isValidSpeed(player.position, position, session.config.maxSpeed)) {
      return false;
    }
    
    return true;
  }
  
  private isValidPosition(position: Vector2D, bounds: GameBounds): boolean {
    return (
      position.x >= bounds.minX &&
      position.x <= bounds.maxX &&
      position.y >= bounds.minY &&
      position.y <= bounds.maxY
    );
  }
  
  private isValidSpeed(from: Vector2D, to: Vector2D, maxSpeed: number): boolean {
    const distance = Math.sqrt(
      Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2)
    );
    return distance <= maxSpeed;
  }
}
```

**Evidence:**
- Current implementation violates this: `server/src/game/session.ts:70` uses `Object.assign(player, updates)` without validation
- Status: **VIOLATION** - Code review confirmed

**Verification:**
- Test unauthorized access attempts
- Test cross-session access attempts
- Test player state modification by others
- Test position teleportation attempts

---

### AUTHZ-002: Resource Limits (HIGH - VULN-006)

**Requirement:**
- Rate limits must be enforced per player, per action type
- Rate limits must be persistent (Redis-based, not in-memory)
- Game session creation limited to 5 per hour per player
- WebSocket connections limited to 10 per IP

**Implementation:**
```typescript
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  'game:create': { windowMs: 3600000, maxRequests: 5 },
  'game:join': { windowMs: 60000, maxRequests: 10 },
  'game:action': { windowMs: 1000, maxRequests: 10 },
  'game:chat': { windowMs: 1000, maxRequests: 2 },
  'websocket:connect': { windowMs: 60000, maxRequests: 10 },
};

class RateLimiter {
  constructor(private redis: RedisService) {}
  
  async checkRateLimit(
    playerId: string,
    action: string
  ): Promise<{ allowed: boolean; remaining: number; resetTime: number }> {
    const config = RATE_LIMITS[action];
    if (!config) {
      return { allowed: true, remaining: -1, resetTime: 0 };
    }
    
    const key = `ratelimit:${playerId}:${action}`;
    const current = await this.redis.get(key);
    
    if (!current) {
      await this.redis.setex(key, config.windowMs / 1000, '1');
      return { allowed: true, remaining: config.maxRequests - 1, resetTime: Date.now() + config.windowMs };
    }
    
    const count = parseInt(current, 10);
    if (count >= config.maxRequests) {
      const ttl = await this.redis.ttl(key);
      return { allowed: false, remaining: 0, resetTime: Date.now() + ttl * 1000 };
    }
    
    await this.redis.incr(key);
    return { allowed: true, remaining: config.maxRequests - count - 1, resetTime: Date.now() + config.windowMs };
  }
}
```

**Evidence:**
- Current implementation violates this: `server/src/services/validation.ts` uses in-memory Maps, not Redis
- Status: **VIOLATION** - Code review confirmed

**Verification:**
- Test rate limit enforcement
- Test limit reset behavior
- Test bypass attempts
- Test persistence across server restarts

---

## Input Validation Requirements

### INP-001: Game Action Validation (CRITICAL - VULN-002)

**Requirement:**
All game actions must be validated against:
- Game rules (can this action be performed?)
- Entity ownership (does player own the entity?)
- State constraints (is action valid given current state?)
- Rate limits (is action within allowed frequency?)
- Position bounds (is position within game area?)
- Speed limits (is movement speed reasonable?)

**Implementation:**
```typescript
interface GameActionValidator {
  validateMove(playerId: string, sessionId: string, move: MoveAction): ValidationResult;
  validatePlayCard(playerId: string, sessionId: string, cardId: string): ValidationResult;
  validateChat(playerId: string, message: string): ValidationResult;
}

class GameActionValidatorImpl implements GameActionValidator {
  validateMove(playerId: string, sessionId: string, move: MoveAction): ValidationResult {
    const session = this.sessionManager.getSession(sessionId);
    if (!session) {
      return { valid: false, error: 'SESSION_NOT_FOUND' };
    }
    
    if (session.status !== 'active') {
      return { valid: false, error: 'GAME_NOT_ACTIVE' };
    }
    
    const player = session.players.find(p => p.id === playerId);
    if (!player) {
      return { valid: false, error: 'PLAYER_NOT_IN_SESSION' };
    }
    
    // Validate position bounds
    if (!this.isValidPosition(move.position, session.config.bounds)) {
      return { valid: false, error: 'INVALID_POSITION' };
    }
    
    // Validate move speed (prevent teleportation)
    if (!this.isValidSpeed(player.position, move.position, session.config.maxSpeed)) {
      return { valid: false, error: 'MOVE_SPEED_EXCEEDED' };
    }
    
    // Check action cooldown
    if (player.lastActionTime && Date.now() - player.lastActionTime < session.config.minActionInterval) {
      return { valid: false, error: 'ACTION_COOLDOWN' };
    }
    
    return { valid: true };
  }
}
```

**Evidence:**
- Current implementation violates this: `server/src/game/session.ts:70` has no validation before Object.assign
- Status: **VIOLATION** - Code review confirmed

**Verification:**
- Test valid action acceptance
- Test invalid action rejection
- Test edge cases (boundary values)
- Test speed hacking prevention

---

### INP-002: Input Sanitization (HIGH - VULN-005)

**Requirement:**
All user-generated content must be sanitized:
- Chat messages: Full HTML sanitization with allowlist
- Player names: Alphanumeric + safe characters, length limit
- Game data: Type validation, range validation

**Implementation:**
```typescript
import DOMPurify from 'isomorphic-dompurify';

interface SanitizerConfig {
  maxLength: number;
  allowedCharacters: RegExp;
  allowedTags?: string[];
  allowedAttrs?: string[];
}

const SANITIZATION_RULES = {
  chat: {
    maxLength: 500,
    allowedCharacters: /^[\s\w\s!?.,'"()]*$/,
    allowedTags: ['b', 'i', 'u', 'em', 'strong', 'br'],
    allowedAttrs: [],
  },
  playerName: {
    maxLength: 32,
    allowedCharacters: /^[\w\s-]+$/,
    allowedTags: [],
    allowedAttrs: [],
  },
};

function sanitizeInput(input: string, rule: keyof typeof SANITIZATION_RULES): string {
  const config = SANITIZATION_RULES[rule];
  
  // Length limit
  let sanitized = input.slice(0, config.maxLength);
  
  // Character whitelist
  if (!config.allowedCharacters.test(sanitized)) {
    sanitized = sanitized.replace(/[^\w\s-]/g, '');
  }
  
  // HTML sanitization
  if (config.allowedTags && config.allowedTags.length > 0) {
    sanitized = DOMPurify.sanitize(sanitized, {
      ALLOWED_TAGS: config.allowedTags,
      ALLOWED_ATTR: config.allowedAttrs || [],
      FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed'],
      FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
    });
  } else {
    // No HTML allowed - escape all
    sanitized = sanitized
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
  
  return sanitized.trim();
}
```

**Evidence:**
- Current implementation violates this: `server/src/services/validation.ts:161-166` uses basic replace, not DOMPurify
- Status: **VIOLATION** - Code review confirmed

**Verification:**
- Test XSS payload sanitization
- Test length limits
- Test character whitelist enforcement
- Test bypass attempts

---

## Transport Security Requirements

### TRANS-001: WebSocket Security (HIGH - VULN-003, VULN-004)

**Requirement:**
- WebSocket connections must use WSS (WebSocket Secure)
- HTTP polling transport must be disabled
- CORS must explicitly whitelist allowed origins
- No wildcard origin configuration

**Implementation:**
```typescript
const ALLOWED_ORIGINS = (process.env.CORS_ORIGINS?.split(',') || []).filter(Boolean);

this.io = new SocketIOServer(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (ALLOWED_ORIGINS.length === 0) {
        callback(new Error('CORS not configured'));
        return;
      }
      
      if (ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  },
  // Only allow WebSocket, disable HTTP polling
  transports: ['websocket'],
  allowUpgrades: false,
  // Limit message size to prevent DoS
  maxHttpBufferSize: 1e6,  // 1MB
});
```

**Evidence:**
- Current implementation violates this: `server/src/websocket/server.ts:46,51`
  - Line 46: CORS defaults to `['http://localhost:3000']` without strict validation
  - Line 51: Both `'websocket'` and `'polling'` transports allowed
- Status: **VIOLATION** - Code review confirmed

**Verification:**
- Test CORS validation
- Test transport security
- Test message size limits

---

## Compliance Requirements

### COMP-001: Security Headers (MEDIUM - VULN-010)

**Requirement:**
All HTTP responses must include:
- Content-Security-Policy
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Strict-Transport-Security
- Referrer-Policy: strict-origin-when-cross-origin

**Implementation:**
```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline';
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      font-src 'self';
      connect-src wss: https:;
      frame-ancestors 'none';
    `.replace(/\s+/g, ' ').trim(),
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

**Verification:**
- Automated header scanning
- Security scanner integration

---

## Testing Requirements

### TEST-001: Security Test Coverage

**Requirement:**
- All security requirements must have corresponding tests
- Minimum 90% code coverage for security-critical modules
- Automated security tests in CI/CD pipeline

**Implementation:**
```typescript
// test/authentication.test.ts
describe('Authentication Security', () => {
  describe('Token Generation', () => {
    it('should generate unique tokens', () => {
      const token1 = generateToken(payload1);
      const token2 = generateToken(payload2);
      expect(token1).not.toEqual(token2);
    });
    
    it('should reject expired tokens', async () => {
      const token = generateToken({ ...payload, exp: Math.floor(Date.now() / 1000) - 3600 });
      const result = await validateToken(token, context);
      expect(result).toBeNull();
    });
    
    it('should reject tokens with invalid signature', async () => {
      const invalidToken = generateToken(payload, 'wrong-secret');
      const result = await validateToken(invalidToken, context);
      expect(result).toBeNull();
    });
  });
  
  describe('Session Binding', () => {
    it('should reject token from different IP', async () => {
      const token = generateToken({ ...payload, ip: '192.168.1.1' });
      const result = await validateToken(token, { ...context, ip: '10.0.0.1' });
      expect(result).toBeNull();
    });
    
    it('should reject token with different User-Agent', async () => {
      const token = generateToken({ ...payload, userAgent: 'Chrome' });
      const result = await validateToken(token, { ...context, userAgent: 'Firefox' });
      expect(result).toBeNull();
    });
  });
});

describe('Input Validation', () => {
  it('should reject SQL injection in player name', async () => {
    const maliciousInput = "'; DROP TABLE players; --";
    const result = validatePlayerName(maliciousInput);
    expect(result.valid).toBe(false);
  });
  
  it('should reject XSS in chat messages', async () => {
    const xssPayload = '<script>alert("xss")</script>';
    const result = sanitizeChat(xssPayload);
    expect(result).not.toContain('<script>');
    expect(result).not.toContain('alert(');
  });
});
```

**Verification:**
- Coverage report review
- CI/CD pipeline verification
- Test execution in CI

---

## Compliance Matrix

| Requirement | Severity | Status | Evidence | Priority |
|-------------|----------|--------|----------|----------|
| AUTH-001: Token Management | Critical | VIOLATION | `server/src/websocket/server.ts:223` | P1 |
| AUTH-002: Credential Storage | Critical | VIOLATION | No hardcoded secrets check | P1 |
| AUTH-003: Session Management | High | VIOLATION | Missing refresh, invalidation | P2 |
| AUTHZ-001: Game Session Access | Critical | VIOLATION | `server/src/game/session.ts:70` | P1 |
| AUTHZ-002: Resource Limits | High | VIOLATION | In-memory rate limiting | P2 |
| INP-001: Game Action Validation | Critical | VIOLATION | No bounds checking | P1 |
| INP-002: Input Sanitization | High | VIOLATION | Basic replace sanitization | P2 |
| TRANS-001: WebSocket Security | High | VIOLATION | CORS + polling allowed | P2 |
| COMP-001: Security Headers | Medium | ASSUMED | Not verified in code | P3 |

---

*Security Requirements Version: 2.0*  
*Last Updated: 2026-01-20*  
*JungleSecurity - Requirements based on code-confirmed vulnerabilities*
