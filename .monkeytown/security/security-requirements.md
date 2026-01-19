# Monkeytown Security Requirements v2.1

**Mandatory security controls for all Monkeytown components**

**Version:** 2.1
**Date:** 2026-01-19
**Security Lead:** JungleSecurity
**Status:** ACTIVE

---

## Overview

This document defines mandatory security requirements for all Monkeytown components, derived from threat modeling and vulnerability assessment findings. All requirements are grounded in actual architecture and code paths.

**Document Structure:**
1. Authentication Requirements
2. Authorization Requirements  
3. Input Validation Requirements
4. Data Protection Requirements
5. Logging and Monitoring Requirements
6. Compliance Requirements

---

## Authentication Requirements

### AUTH-001: JWT Token Management

**Requirement ID:** AUTH-001
**Priority:** P1 (Critical)
**Status:** **MANDATORY**

**Requirements:**
- All authentication tokens MUST be generated using cryptographically secure random number generators
- Tokens MUST be signed with a 256-bit or stronger secret key
- Tokens MUST have a maximum validity of 24 hours
- Tokens MUST include expiration timestamp (`exp` claim)
- Tokens MUST NOT have a hardcoded fallback secret under any circumstances

**Implementation:**
```typescript
// server/src/auth/token-service.ts
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_ALGORITHM = 'HS256';
const TOKEN_EXPIRY = 24 * 60 * 60; // 24 hours in seconds
const MIN_SECRET_LENGTH = 32;

interface TokenPayload {
  playerId: string;
  sessionId: string;
  ip: string;
  userAgent: string;
  iat: number;
  exp: number;
}

class TokenService {
  private readonly secret: string;
  
  constructor() {
    const envSecret = process.env.JWT_SECRET;
    
    if (!envSecret) {
      throw new Error(
        'FATAL: JWT_SECRET environment variable is required. ' +
        'Cannot start server without valid JWT secret.'
      );
    }
    
    if (envSecret.length < MIN_SECRET_LENGTH) {
      throw new Error(
        `FATAL: JWT_SECRET must be at least ${MIN_SECRET_LENGTH} characters. ` +
        `Current length: ${envSecret.length}`
      );
    }
    
    this.secret = envSecret;
  }
  
  generateToken(payload: Omit<TokenPayload, 'iat' | 'exp'>): string {
    const now = Math.floor(Date.now() / 1000);
    
    const fullPayload: TokenPayload = {
      ...payload,
      iat: now,
      exp: now + TOKEN_EXPIRY,
    };
    
    return jwt.sign(fullPayload, this.secret, {
      algorithm: JWT_ALGORITHM,
    });
  }
  
  validateToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.secret, {
        algorithms: [JWT_ALGORITHM],
      }) as TokenPayload;
      
      // Validate required claims
      if (!decoded.playerId || !decoded.sessionId) {
        throw new Error('Invalid token payload: missing required claims');
      }
      
      return decoded;
    } catch (error) {
      throw new Error('Token validation failed');
    }
  }
}
```

**Verification:**
```typescript
describe('AUTH-001: JWT Token Management', () => {
  it('should reject tokens with hardcoded secret', async () => {
    const forgedToken = jwt.sign(
      { playerId: 'victim', sessionId: 'test' },
      'dev-secret'
    );
    
    expect(() => tokenService.validateToken(forgedToken))
      .toThrow('Token validation failed');
  });
  
  it('should reject expired tokens', async () => {
    const token = jwt.sign(
      { 
        playerId: 'test', 
        sessionId: 'test',
        iat: Math.floor(Date.now() / 1000) - 86400, // 24 hours ago
        exp: Math.floor(Date.now() / 1000) - 82800  // 23 hours ago (expired)
      },
      process.env.JWT_SECRET!
    );
    
    expect(() => tokenService.validateToken(token))
      .toThrow('Token validation failed');
  });
});
```

---

### AUTH-002: Session Binding

**Requirement ID:** AUTH-002
**Priority:** P1 (Critical)
**Status:** **MANDATORY**

**Requirements:**
- Sessions MUST be bound to client IP address
- Sessions SHOULD be bound to User-Agent string
- Tokens MUST be validated against session context on each connection
- Session context mismatch MUST result in connection rejection

**Implementation:**
```typescript
interface SessionContext {
  ip: string;
  userAgent: string;
  playerId: string;
  sessionId: string;
}

class SessionBindingService {
  async validateSessionBinding(
    token: string,
    context: SessionContext
  ): Promise<boolean> {
    const payload = this.tokenService.validateToken(token);
    
    // Check IP binding
    if (payload.ip !== context.ip) {
      this.logger.warn({
        event: 'SESSION_IP_MISMATCH',
        playerId: payload.playerId,
        expectedIp: payload.ip,
        actualIp: context.ip,
      });
      return false;
    }
    
    // Optionally check User-Agent
    if (payload.userAgent !== context.userAgent) {
      this.logger.info({
        event: 'SESSION_UA_MISMATCH',
        playerId: payload.playerId,
        // Log but don't fail on UA mismatch (may change during session)
      });
    }
    
    return true;
  }
}
```

---

## Authorization Requirements

### AUTHZ-001: Game Session Access Control

**Requirement ID:** AUTHZ-001
**Priority:** P1 (Critical)
**Status:** **MANDATORY**

**Requirements:**
- Players MUST only access game sessions they are explicitly authorized for
- Authorization MUST be verified on every WebSocket event
- No player MAY modify another player's state
- Game actions MUST be validated against game rules before processing

**Implementation:**
```typescript
class GameAuthorizationService {
  async canPlayerAccessSession(
    playerId: string,
    sessionId: string
  ): Promise<AuthorizationResult> {
    const session = await this.sessionStore.get(sessionId);
    
    if (!session) {
      return {
        allowed: false,
        reason: 'SESSION_NOT_FOUND',
      };
    }
    
    const isPlayerInSession = session.players.some(
      p => p.id === playerId
    );
    
    if (!isPlayerInSession) {
      return {
        allowed: false,
        reason: 'PLAYER_NOT_IN_SESSION',
      };
    }
    
    return { allowed: true };
  }
  
  async canPlayerPerformAction(
    playerId: string,
    sessionId: string,
    action: GameAction
  ): Promise<AuthorizationResult> {
    // First verify session access
    const sessionAccess = await this.canPlayerAccessSession(
      playerId, 
      sessionId
    );
    
    if (!sessionAccess.allowed) {
      return sessionAccess;
    }
    
    // Then verify action-specific authorization
    return this.validateGameAction(playerId, sessionId, action);
  }
  
  private async validateGameAction(
    playerId: string,
    sessionId: string,
    action: GameAction
  ): Promise<AuthorizationResult> {
    const session = await this.sessionStore.get(sessionId);
    const player = session.players.find(p => p.id === playerId);
    
    switch (action.type) {
      case 'MOVE':
        return this.validateMoveAction(player, action);
      case 'PLAY_CARD':
        return this.validateCardAction(player, action);
      case 'CHAT':
        return { allowed: true }; // Chat is generally allowed
      default:
        return {
          allowed: false,
          reason: 'UNKNOWN_ACTION_TYPE',
        };
    }
  }
  
  private validateMoveAction(
    player: Player,
    action: MoveAction
  ): AuthorizationResult {
    // Validate position bounds
    if (!this.isValidPosition(action.position, player.session.config.bounds)) {
      return {
        allowed: false,
        reason: 'INVALID_POSITION',
        details: { position: action.position },
      };
    }
    
    // Validate move speed
    const speed = this.calculateSpeed(player.position, action.position);
    if (speed > player.session.config.maxMoveSpeed) {
      return {
        allowed: false,
        reason: 'SPEED_VIOLATION',
        details: { calculated: speed, max: player.session.config.maxMoveSpeed },
      };
    }
    
    return { allowed: true };
  }
}
```

---

### AUTHZ-002: Resource Limits

**Requirement ID:** AUTHZ-002
**Priority:** P1 (High)
**Status:** **MANDATORY**

**Requirements:**
- Rate limits MUST be enforced per player, per action type
- Rate limits MUST be enforced at WebSocket connection level
- Game session creation MUST be limited to prevent resource exhaustion
- WebSocket connections MUST be limited per IP address

**Implementation:**
```typescript
interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
}

const SOCKET_RATE_LIMITS: Record<string, RateLimitConfig> = {
  'game:input': { windowMs: 1000, maxRequests: 10 },
  'game:chat': { windowMs: 1000, maxRequests: 2 },
  'game:join': { windowMs: 60000, maxRequests: 5 },
  'game:leave': { windowMs: 1000, maxRequests: 10 },
  'websocket:connect': { windowMs: 60000, maxRequests: 10 },
};

class RateLimitService {
  private readonly limits: Map<string, { count: number; resetTime: number }>;
  
  constructor(
    private readonly redis: RedisService,
    private readonly logger: Logger
  ) {
    this.limits = new Map();
  }
  
  async checkRateLimit(
    identifier: string,
    action: string
  ): Promise<RateLimitResult> {
    const config = SOCKET_RATE_LIMITS[action];
    if (!config) {
      return { allowed: true, remaining: -1, retryAfterMs: 0 };
    }
    
    const key = `ratelimit:${identifier}:${action}`;
    const now = Date.now();
    
    // Check Redis for distributed rate limiting
    const cached = await this.redis.get(key);
    if (cached) {
      const data = JSON.parse(cached);
      if (now < data.resetTime) {
        if (data.count >= config.maxRequests) {
          return {
            allowed: false,
            remaining: 0,
            retryAfterMs: data.resetTime - now,
          };
        }
        // Increment
        data.count++;
        await this.redis.setex(
          key, 
          config.windowMs / 1000, 
          JSON.stringify(data)
        );
        return {
          allowed: true,
          remaining: config.maxRequests - data.count,
          retryAfterMs: 0,
        };
      }
    }
    
    // First request in window
    const resetTime = now + config.windowMs;
    await this.redis.setex(key, config.windowMs / 1000, JSON.stringify({
      count: 1,
      resetTime,
    }));
    
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      retryAfterMs: 0,
    };
  }
  
  async checkConnectionLimit(ip: string): Promise<boolean> {
    const key = `connlimit:${ip}`;
    const count = await this.redis.incr(key);
    
    if (count === 1) {
      await this.redis.expire(key, 60); // 1 minute window
    }
    
    const MAX_CONNECTIONS_PER_IP = 10;
    return count <= MAX_CONNECTIONS_PER_IP;
  }
}
```

---

## Input Validation Requirements

### INP-001: Game Action Validation

**Requirement ID:** INP-001
**Priority:** P1 (Critical)
**Status:** **MANDATORY**

**Requirements:**
- All game actions MUST be validated against game rules before processing
- Position values MUST be validated against game bounds
- Movement speed MUST be validated to prevent teleportation
- Action cooldowns MUST be enforced server-side

**Implementation:**
```typescript
interface GameActionValidatorConfig {
  maxPositionX: number;
  maxPositionY: number;
  maxMoveSpeed: number;
  minActionIntervalMs: number;
}

class GameActionValidator {
  private readonly config: GameActionValidatorConfig;
  
  constructor(config: GameActionValidatorConfig) {
    this.config = config;
  }
  
  validateMoveAction(
    player: Player,
    action: MoveAction
  ): ValidationResult {
    // Check player status
    if (player.status !== 'playing') {
      return {
        valid: false,
        error: 'PLAYER_NOT_ACTIVE',
        message: 'Player is not in active game state',
      };
    }
    
    // Validate position structure
    if (!this.isValidPosition(action.position)) {
      return {
        valid: false,
        error: 'INVALID_POSITION_FORMAT',
        message: 'Position must be {x: number, y: number}',
      };
    }
    
    // Validate position bounds
    if (!this.isWithinBounds(action.position)) {
      return {
        valid: false,
        error: 'POSITION_OUT_OF_BOUNDS',
        message: `Position must be within bounds (0,0) to (${this.config.maxPositionX},${this.config.maxPositionY})`,
        details: {
          position: action.position,
          bounds: {
            maxX: this.config.maxPositionX,
            maxY: this.config.maxPositionY,
          },
        },
      };
    }
    
    // Validate move speed (prevent teleportation)
    if (player.lastActionTime) {
      const timeSinceLastAction = Date.now() - player.lastActionTime;
      if (timeSinceLastAction < this.config.minActionIntervalMs) {
        return {
          valid: false,
          error: 'ACTION_COOLDOWN',
          message: `Actions must be ${this.config.minActionIntervalMs}ms apart`,
          details: {
            timeSinceLastAction,
            requiredInterval: this.config.minActionIntervalMs,
          },
        };
      }
    }
    
    // Validate speed if player has previous position
    if (player.position) {
      const speed = this.calculateMoveSpeed(player.position, action.position);
      if (speed > this.config.maxMoveSpeed) {
        return {
          valid: false,
          error: 'SPEED_VIOLATION',
          message: `Move speed exceeds maximum (${this.config.maxMoveSpeed})`,
          details: {
            calculatedSpeed: speed,
            maxSpeed: this.config.maxMoveSpeed,
          },
        };
      }
    }
    
    return { valid: true };
  }
  
  private isValidPosition(pos: unknown): pos is Vector2D {
    if (typeof pos !== 'object' || pos === null) {
      return false;
    }
    
    const p = pos as Record<string, unknown>;
    return (
      typeof p.x === 'number' &&
      typeof p.y === 'number' &&
      !isNaN(p.x) &&
      !isNaN(p.y) &&
      isFinite(p.x) &&
      isFinite(p.y)
    );
  }
  
  private isWithinBounds(pos: Vector2D): boolean {
    return (
      pos.x >= 0 &&
      pos.x <= this.config.maxPositionX &&
      pos.y >= 0 &&
      pos.y <= this.config.maxPositionY
    );
  }
  
  private calculateMoveSpeed(from: Vector2D, to: Vector2D): number {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
```

---

### INP-002: Input Sanitization

**Requirement ID:** INP-002
**Priority:** P1 (High)
**Status:** **MANDATORY**

**Requirements:**
- All user-generated content MUST be sanitized before storage/broadcast
- Chat messages MUST have HTML entities escaped
- Chat messages MUST have length limits
- Player names MUST have character whitelisting

**Implementation:**
```typescript
import DOMPurify from 'isomorphic-dompurify';

interface SanitizationConfig {
  maxChatLength: number;
  maxNameLength: number;
  allowedChatTags: string[];
}

const DEFAULT_SANITIZATION_CONFIG: SanitizationConfig = {
  maxChatLength: 500,
  maxNameLength: 32,
  allowedChatTags: ['b', 'i', 'u', 'em', 'strong'],
};

class InputSanitizer {
  private readonly config: SanitizationConfig;
  
  constructor(config: SanitizationConfig = DEFAULT_SANITIZATION_CONFIG) {
    this.config = config;
  }
  
  sanitizeChatMessage(message: string): SanitizedResult {
    // Length limit
    let sanitized = message.slice(0, this.config.maxChatLength);
    
    // HTML sanitization
    sanitized = DOMPurify.sanitize(sanitized, {
      ALLOWED_TAGS: this.config.allowedChatTags,
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true,
    });
    
    // Remove any remaining HTML tags
    sanitized = sanitized.replace(/<[^>]*>/g, '');
    
    // Trim and normalize whitespace
    sanitized = sanitized.trim().replace(/\s+/g, ' ');
    
    return {
      sanitized,
      wasModified: sanitized !== message,
      originalLength: message.length,
      sanitizedLength: sanitized.length,
    };
  }
  
  sanitizePlayerName(name: string): SanitizedResult {
    // Length limit
    let sanitized = name.slice(0, this.config.maxNameLength);
    
    // Character whitelist (alphanumeric, spaces, hyphens, underscores)
    sanitized = sanitized.replace(/[^\w\s-]/g, '');
    
    // Normalize whitespace
    sanitized = sanitized.trim().replace(/\s+/g, ' ');
    
    return {
      sanitized,
      wasModified: sanitized !== name,
      originalLength: name.length,
      sanitizedLength: sanitized.length,
    };
  }
}
```

---

## Data Protection Requirements

### DATA-001: Encryption in Transit

**Requirement ID:** DATA-001
**Priority:** P1 (Critical)
**Status:** **MANDATORY**

**Requirements:**
- All external communication MUST use TLS 1.2 or higher
- WebSocket connections MUST use WSS (WebSocket Secure)
- HTTP MUST redirect to HTTPS in production
- HSTS header MUST be set

**Implementation (Nginx):**
```nginx
# deploy/docker/nginx.conf
server {
    listen 443 ssl http2;
    server_name monkeytown.example.com;

    # TLS Configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_certificate /etc/ssl/certs/server.crt;
    ssl_certificate_key /etc/ssl/private/server.key;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:50m;
    ssl_session_tickets off;

    # Modern compatibility
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8 8.8.4.4 valid=300s;
    resolver_timeout 5s;

    # HSTS
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

    # Security Headers
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # WebSocket proxy
    location /ws {
        proxy_pass http://game-server:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_read_timeout 86400;
    }
}

# HTTP to HTTPS redirect
server {
    listen 80;
    server_name monkeytown.example.com;
    return 301 https://$server_name$request_uri;
}
```

---

### DATA-002: Sensitive Data Handling

**Requirement ID:** DATA-002
**Priority:** P1 (High)
**Status:** **MANDATORY**

**Requirements:**
- JWT secrets MUST be stored in environment variables, never in code
- Database credentials MUST use secrets management
- No sensitive data MUST be logged
- Error messages MUST NOT expose internal details

**Implementation:**
```typescript
class SensitiveDataHandler {
  private readonly secretPattern = /\b[A-Za-z0-9]{32,}\b/g;
  private readonly tokenPattern = /eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g;
  private readonly credPattern = /(?:password|secret|key|token)\s*[:=]\s*[^\s&]+/gi;
  
  sanitizeForLog(data: unknown): string {
    const serialized = typeof data === 'string' 
      ? data 
      : JSON.stringify(data);
    
    let sanitized = serialized
      .replace(this.tokenPattern, '[TOKEN_REDACTED]')
      .replace(this.secretPattern, '[SECRET_REDACTED]')
      .replace(this.credPattern, '$1=[CREDENTIAL_REDACTED]');
    
    return sanitized;
  }
  
  sanitizeError(error: Error): ErrorMessage {
    const sanitizedMessage = this.sanitizeForLog(error.message);
    
    return {
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'production'
        ? 'An internal error occurred'
        : sanitizedMessage,
      timestamp: Date.now(),
      requestId: this.currentRequestId,
    };
  }
}
```

---

## Logging and Monitoring Requirements

### LOG-001: Security Event Logging

**Requirement ID:** LOG-001
**Priority:** P1 (High)
**Status:** **MANDATORY**

**Requirements:**
- All authentication events MUST be logged (success/failure)
- All authorization failures MUST be logged
- All rate limit triggers MUST be logged
- All security-relevant events MUST include player ID and IP
- Logs MUST be structured JSON format

**Implementation:**
```typescript
interface SecurityEvent {
  timestamp: Date;
  eventType: SecurityEventType;
  playerId?: string;
  sessionId?: string;
  ip: string;
  userAgent: string;
  details: Record<string, unknown>;
  severity: 'info' | 'warning' | 'error' | 'critical';
}

type SecurityEventType =
  | 'AUTH_SUCCESS'
  | 'AUTH_FAILURE'
  | 'AUTHZ_FAILURE'
  | 'RATE_LIMIT_TRIGGERED'
  | 'SPEED_VIOLATION'
  | 'POSITION_OUT_OF_BOUNDS'
  | 'INVALID_ACTION'
  | 'SESSION_CREATED'
  | 'SESSION_TERMINATED'
  | 'CHAT_MESSAGE_SANITIZED'
  | 'SUSPICIOUS_ACTIVITY';

class SecurityLogger {
  private readonly eventQueue: SecurityEvent[] = [];
  private readonly batchSize = 100;
  private readonly flushInterval = 5000;
  
  constructor(
    private readonly logger: Logger,
    private readonly metrics: MetricsService
  ) {
    // Flush events periodically
    setInterval(() => this.flush(), this.flushInterval);
  }
  
  log(event: Omit<SecurityEvent, 'timestamp'>): void {
    const fullEvent: SecurityEvent = {
      ...event,
      timestamp: new Date(),
    };
    
    // Add to queue
    this.eventQueue.push(fullEvent);
    
    // Log immediately for high-severity events
    if (event.severity === 'error' || event.severity === 'critical') {
      this.logger.error({
        ...fullEvent,
        timestamp: fullEvent.timestamp.toISOString(),
      });
    }
    
    // Flush if batch is full
    if (this.eventQueue.length >= this.batchSize) {
      this.flush();
    }
    
    // Update metrics
    this.metrics.incrementSecurityEvent(event.eventType);
  }
  
  logAuthSuccess(playerId: string, sessionId: string, context: RequestContext): void {
    this.log({
      eventType: 'AUTH_SUCCESS',
      playerId,
      sessionId,
      ip: context.ip,
      userAgent: context.userAgent,
      details: { method: context.method },
      severity: 'info',
    });
  }
  
  logAuthFailure(context: RequestContext, reason: string): void {
    this.log({
      eventType: 'AUTH_FAILURE',
      ip: context.ip,
      userAgent: context.userAgent,
      details: { reason },
      severity: 'warning',
    });
  }
  
  logRateLimitTriggered(
    playerId: string,
    action: string,
    context: RequestContext
  ): void {
    this.log({
      eventType: 'RATE_LIMIT_TRIGGERED',
      playerId,
      ip: context.ip,
      userAgent: context.userAgent,
      details: { action },
      severity: 'warning',
    });
  }
  
  logSpeedViolation(
    playerId: string,
    sessionId: string,
    calculatedSpeed: number,
    maxSpeed: number,
    context: RequestContext
  ): void {
    this.log({
      eventType: 'SPEED_VIOLATION',
      playerId,
      sessionId,
      ip: context.ip,
      userAgent: context.userAgent,
      details: { calculatedSpeed, maxSpeed },
      severity: 'warning',
    });
  }
  
  private flush(): void {
    if (this.eventQueue.length === 0) return;
    
    const events = this.eventQueue.splice(0, this.batchSize);
    
    // Write events to log store
    this.logger.info({
      events: events.map(e => ({
        ...e,
        timestamp: e.timestamp.toISOString(),
      })),
    });
  }
}
```

---

## Compliance Requirements

### COMP-001: Security Headers

**Requirement ID:** COMP-001
**Priority:** P1 (High)
**Status:** **MANDATORY**

**Requirements:**
- All HTTP responses MUST include Content-Security-Policy
- All HTTP responses MUST include X-Content-Type-Options
- All HTTP responses MUST include X-Frame-Options
- All HTTP responses MUST include Strict-Transport-Security

**Implementation (Next.js):**
```javascript
// web/next.config.js
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval';
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
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
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

---

## Testing Requirements

### TEST-001: Security Test Coverage

**Requirement ID:** TEST-001
**Priority:** P1 (High)
**Status:** **MANDATORY**

**Requirements:**
- All security requirements MUST have corresponding tests
- Minimum 90% code coverage for security-critical modules
- Automated security tests MUST run in CI/CD pipeline
- Security tests MUST include positive and negative cases

**Test Coverage Requirements:**
| Module | Minimum Coverage |
|--------|-----------------|
| Authentication | 95% |
| Authorization | 95% |
| Input Validation | 95% |
| Session Management | 90% |
| Rate Limiting | 90% |
| **Overall** | **90%** |

---

## References

- Threat Model: `.monkeytown/security/threat-model.md`
- Vulnerability Assessment: `.monkeytown/security/vulnerability-assessment.md`
- Incident Response: `.monkeytown/security/incident-response.md`
- Architecture: `.monkeytown/architecture/system-design.md`

---

*Security Requirements Version: 2.1*
*Last Updated: 2026-01-19*
*JungleSecurity - Making security mandatory*
