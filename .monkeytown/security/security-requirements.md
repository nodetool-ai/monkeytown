# Monkeytown Security Requirements

**Mandatory security controls for all Monkeytown components**

---

## Authentication Requirements

### AUTH-001: Token Management

**Requirement:**
All authentication tokens must be:
- Generated using cryptographically secure random number generators
- Signed with a 256-bit or stronger secret key
- Limited to maximum 24-hour validity
- Bound to the session context (IP, User-Agent)

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

// Token generation
function generateToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: TokenPayload = {
    ...payload,
    iat: now,
    exp: now + 86400,  // 24 hours
  };
  return jwt.sign(fullPayload, process.env.JWT_SECRET!, {
    algorithm: 'HS256',
  });
}

// Token validation
async function validateToken(token: string, context: { ip: string; userAgent: string }): Promise<TokenPayload | null> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
    
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

**Verification:**
- Unit test token generation and validation
- Integration test token binding enforcement
- Penetration test token forgery attempts

---

### AUTH-002: Credential Storage

**Requirement:**
No credentials may be stored in:
- Source code
- Configuration files in version control
- Log files
- Error messages

**Implementation:**
```bash
# .env.example ( NEVER commit .env )
JWT_SECRET=your-secure-random-64-byte-secret-here
REDIS_PASSWORD=your-secure-password-here
DATABASE_URL=postgresql://user:password@host:5432/db
```

**Verification:**
- CI/CD pipeline scan for secrets in code
- Pre-commit hook to prevent accidental commits
- Regular secret scanning of repository

---

### AUTH-003: Session Management

**Requirement:**
- Sessions must expire after 30 minutes of inactivity
- Maximum concurrent sessions per player: 3
- Logout must invalidate the session server-side
- Session tokens must be stored securely in the browser

**Implementation:**
```typescript
class SessionManager {
  private readonly INACTIVITY_TIMEOUT = 30 * 60 * 1000;  // 30 minutes
  private readonly MAX_CONCURRENT_SESSIONS = 3;
  
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
    // Also invalidate in token blacklist
    await this.redis.setex(`blacklist:${sessionId}`, 86400, 'true');
  }
  
  async refreshSession(sessionId: string): Promise<boolean> {
    const session = await this.redis.get(`session:${sessionId}`);
    if (!session) return false;
    
    const parsed = JSON.parse(session);
    const now = Date.now();
    
    if (now - parsed.lastActivity > this.INACTIVITY_TIMEOUT) {
      await this.invalidateSession(sessionId);
      return false;
    }
    
    parsed.lastActivity = now;
    await this.redis.setex(
      `session:${sessionId}`,
      this.INACTIVITY_TIMEOUT / 1000,
      JSON.stringify(parsed)
    );
    
    return true;
  }
}
```

**Verification:**
- Test session expiration behavior
- Test concurrent session limit
- Test session invalidation

---

## Authorization Requirements

### AUTHZ-001: Game Session Access Control

**Requirement:**
- Players may only access game sessions they are explicitly authorized for
- Authorization must be verified on every WebSocket event
- No player may modify another player's state

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
        return this.canPlayerMove(playerId, sessionId);
      case 'PLAY_CARD':
        return this.canPlayerPlayCard(playerId, sessionId, action.cardId);
      case 'CHAT':
        return this.canPlayerChat(playerId, sessionId);
      default:
        return false;
    }
  }
}
```

**Verification:**
- Test unauthorized access attempts
- Test cross-session access attempts
- Test player state modification by others

---

### AUTHZ-002: Resource Limits

**Requirement:**
- Rate limits must be enforced per player, per action type
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
  'game:input': { windowMs: 1000, maxRequests: 10 },
  'game:chat': { windowMs: 1000, maxRequests: 2 },
  'websocket:connect': { windowMs: 60000, maxRequests: 10 },
};

class RateLimiter {
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

**Verification:**
- Test rate limit enforcement
- Test limit reset behavior
- Test bypass attempts

---

## Input Validation Requirements

### INP-001: Game Action Validation

**Requirement:**
All game actions must be validated against:
- Game rules (can this action be performed?)
- Entity ownership (does player own the entity?)
- State constraints (is action valid given current state?)
- Rate limits (is action within allowed frequency?)

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

**Verification:**
- Test valid action acceptance
- Test invalid action rejection
- Test edge cases (boundary values)
- Test speed hacking prevention

---

### INP-002: Input Sanitization

**Requirement:**
All user-generated content must be sanitized:
- Chat messages: HTML escape, length limit, remove scripts
- Player names: Alphanumeric + safe characters, length limit
- Game data: Type validation, range validation

**Implementation:**
```typescript
interface SanitizerConfig {
  maxLength: number;
  allowedCharacters: RegExp;
  stripHtml: boolean;
}

const SANITIZATION_RULES = {
  chat: {
    maxLength: 500,
    allowedCharacters: /^[\s\w\s!?.,'"]+$/,
    stripHtml: true,
  },
  playerName: {
    maxLength: 32,
    allowedCharacters: /^[\w\s-]+$/,
    stripHtml: true,
  },
  gameMessage: {
    maxLength: 1000,
    allowedCharacters: /^[\w\s!?.,'"\p{L}]+$/u,
    stripHtml: true,
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
  
  // HTML stripping
  if (config.stripHtml) {
    sanitized = sanitized
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
  
  return sanitized.trim();
}
```

**Verification:**
- Test XSS payload sanitization
- Test length limits
- Test character whitelist enforcement

---

## Data Protection Requirements

### DATA-001: Encryption in Transit

**Requirement:**
- All external communication must use TLS 1.2 or higher
- WebSocket connections must use WSS (WebSocket Secure)
- No plain HTTP except for local development

**Implementation:**
```nginx
# nginx.conf
server {
    listen 443 ssl http2;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    
    location / {
        proxy_pass http://web;
    }
    
    location /ws/ {
        proxy_pass http://game-server;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

**Verification:**
- TLS configuration scan
- SSL Labs test score A or higher
- HSTS header verification

---

### DATA-002: Encryption at Rest

**Requirement:**
- Sensitive data in Redis must be encrypted
- Database columns containing PII must be encrypted
- Session data must be encrypted with rotating keys

**Implementation:**
```typescript
class EncryptionService {
  private readonly ALGORITHM = 'aes-256-gcm';
  private readonly IV_LENGTH = 16;
  private readonly TAG_LENGTH = 16;
  
  async encrypt(plaintext: string, key: Buffer): Promise<string> {
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(this.ALGORITHM, key, iv);
    
    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const tag = cipher.getAuthTag();
    
    // Store as iv:tag:encrypted
    return `${iv.toString('hex')}:${tag.toString('hex')}:${encrypted}`;
  }
  
  async decrypt(encryptedData: string, key: Buffer): Promise<string> {
    const [ivHex, tagHex, encrypted] = encryptedData.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const tag = Buffer.from(tagHex, 'hex');
    
    const decipher = crypto.createDecipheriv(this.ALGORITHM, key, iv);
    decipher.setAuthTag(tag);
    
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  }
}
```

**Verification:**
- Test encryption/decryption round-trip
- Verify encrypted data in Redis
- Test key rotation

---

### DATA-003: Data Minimization

**Requirement:**
- Collect only data necessary for game functionality
- Retain data only for necessary duration
- Provide data export and deletion capabilities for players

**Implementation:**
```typescript
interface PlayerDataRetention {
  sessionData: { retentionDays: 30, reason: 'gameplay history' };
  chatLogs: { retentionDays: 7, reason: 'moderation' };
  analytics: { retentionDays: 90, reason: 'improvements' };
  credentials: { retentionDays: -1, reason: 'account maintenance' };
}

class DataRetentionService {
  async cleanupExpiredData(): Promise<number> {
    const cutoff = Date.now() - (30 * 24 * 60 * 60 * 1000);  // 30 days
    const expiredSessions = await this.database.query(
      'DELETE FROM sessions WHERE created_at < $1 RETURNING id',
      [cutoff]
    );
    
    const cutoff7Days = Date.now() - (7 * 24 * 60 * 60 * 1000);
    await this.database.query(
      'DELETE FROM chat_logs WHERE timestamp < $1',
      [cutoff7Days]
    );
    
    return expiredSessions.rowCount;
  }
}
```

**Verification:**
- Test data cleanup automation
- Verify player data export
- Test data deletion

---

## Logging and Monitoring Requirements

### LOG-001: Security Event Logging

**Requirement:**
The following events must be logged:
- Authentication attempts (success/failure)
- Authorization failures
- Rate limit triggers
- Suspicious activity patterns
- System errors

**Implementation:**
```typescript
interface SecurityEvent {
  timestamp: Date;
  eventType: 'AUTH_SUCCESS' | 'AUTH_FAILURE' | 'AUTHZ_FAILURE' | 'RATE_LIMIT' | 'SUSPICIOUS';
  playerId?: string;
  sessionId?: string;
  ip: string;
  userAgent: string;
  details: Record<string, unknown>;
}

class SecurityLogger {
  async log(event: SecurityEvent): Promise<void> {
    const logEntry = {
      ...event,
      timestamp: event.timestamp.toISOString(),
    };
    
    // Structured logging
    console.log(JSON.stringify({
      level: this.getLogLevel(event.eventType),
      ...logEntry,
    }));
    
    // Also write to secure audit log
    await this.auditLog.write(logEntry);
  }
  
  private getLogLevel(eventType: SecurityEvent['eventType']): string {
    switch (eventType) {
      case 'AUTH_FAILURE':
      case 'AUTHZ_FAILURE':
        return 'warning';
      case 'RATE_LIMIT':
        return 'info';
      case 'SUSPICIOUS':
        return 'error';
      default:
        return 'info';
    }
  }
}
```

**Verification:**
- Test log completeness
- Test log integrity (tamper detection)
- Test log aggregation

---

### LOG-002: Monitoring and Alerting

**Requirement:**
- Real-time alerts for security events
- Dashboards for security metrics
- Anomaly detection for cheating patterns

**Implementation:**
```typescript
interface SecurityMetrics {
  failedAuthCount: number;
  rateLimitTriggers: number;
  authorizationFailures: number;
  suspiciousPatternCount: number;
}

class SecurityMonitor {
  private readonly ALERT_THRESHOLDS = {
    failedAuthPerMinute: 10,
    rateLimitPerMinute: 100,
    authzFailurePerMinute: 50,
  };
  
  checkThresholds(metrics: SecurityMetrics): Alert[] {
    const alerts: Alert[] = [];
    
    if (metrics.failedAuthCount > this.ALERT_THRESHOLDS.failedAuthPerMinute) {
      alerts.push({
        severity: 'high',
        type: 'BRUTE_FORCE_DETECTED',
        message: `High authentication failures: ${metrics.failedAuthCount}/min`,
      });
    }
    
    if (metrics.rateLimitTriggers > this.ALERT_THRESHOLDS.rateLimitPerMinute) {
      alerts.push({
        severity: 'medium',
        type: 'DOS_ATTACK',
        message: `High rate limit triggers: ${metrics.rateLimitTriggers}/min`,
      });
    }
    
    return alerts;
  }
}
```

**Verification:**
- Test alert triggering
- Test alert routing
- Test dashboard accuracy

---

## Compliance Requirements

### COMP-001: Security Headers

**Requirement:**
All HTTP responses must include:
- Content-Security-Policy
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Strict-Transport-Security
- Referrer-Policy: strict-origin-when-cross-origin

**Implementation:**
```typescript
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
- Minimum 80% code coverage for security-critical modules
- Automated security tests in CI/CD pipeline

**Implementation:**
```typescript
// test/authentication.test.ts
describe('Authentication', () => {
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
  });
  
  describe('Session Binding', () => {
    it('should reject token from different IP', async () => {
      const token = generateToken({ ...payload, ip: '192.168.1.1' });
      const result = await validateToken(token, { ...context, ip: '10.0.0.1' });
      expect(result).toBeNull();
    });
  });
});
```

**Verification:**
- Coverage report review
- CI/CD pipeline verification
- Test execution in CI

---

*Security Requirements Version: 1.0*
*Last Updated: 2026-01-18*
*JungleSecurity - Making security mandatory*
