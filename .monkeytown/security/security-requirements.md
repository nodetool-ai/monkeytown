# Monkeytown Security Requirements v2.0

**Mandatory security controls for all Monkeytown components**

**Version:** 2.0
**Date:** 2026-01-19
**Agent:** JungleSecurity

---

## Overview

This document specifies security requirements based on verified code review findings in `.monkeytown/security/vulnerability-assessment.md`. Requirements are categorized by implementation priority and mapped to specific code locations.

**Key Findings:**
- JWT secret hardcoded fallback at `server/src/websocket/server.ts:223` ⚠️
- Missing WebSocket rate limiting ⚠️
- Chat XSS vulnerability at `server/src/websocket/server.ts:185` ⚠️
- No action cooldown enforcement ⚠️

---

## Authentication Requirements

### AUTH-001: Token Management ⚠️ CRITICAL

**Requirement:**
All authentication tokens must be:
- Generated using cryptographically secure random number generators
- Signed with a 256-bit or stronger secret key
- **CRITICAL:** No hardcoded fallback secrets in production
- Token expiration must be validated on every request

**Implementation Location:** `server/src/websocket/server.ts:221-225`

**Code Requirement:**
```typescript
private async validateToken(token: string): Promise<string> {
  const jwt = await import('jsonwebtoken');
  
  // CRITICAL: No fallback secret allowed
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required for production');
  }
  
  // Verify and decode - jwt.verify() automatically checks 'exp' claim
  const decoded = jwt.default.verify(token, JWT_SECRET) as { 
    playerId: string; 
    exp: number;
  };
  
  return decoded.playerId;
}
```

**Verification:**
- Unit test token generation and validation
- Integration test token expiration
- Penetration test token forgery attempts
- **CI/CD check:** Fail build if 'dev-secret' string found in websocket/server.ts

---

### AUTH-002: Credential Storage

**Requirement:**
No credentials may be stored in:
- Source code (checked by pre-commit hooks)
- Configuration files in version control
- Log files
- Error messages

**Verification:**
- CI/CD pipeline scan for secrets in code
- Pre-commit hook to prevent accidental commits
- Regular secret scanning of repository

---

### AUTH-003: Session Binding

**Requirement:**
- Sessions must be bound to client IP and User-Agent
- Token validation must verify context matches
- Session tokens must be stored securely in the browser

**Implementation Location:** `server/src/websocket/server.ts:59-73`

**Code Requirement:**
```typescript
this.io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }

    const playerId = await this.validateToken(token);
    
    // Session binding validation
    const clientIp = socket.handshake.address;
    const clientUa = socket.handshake.headers['user-agent'];
    
    // Verify token contains expected context
    const jwt = await import('jsonwebtoken');
    const decoded = jwt.decode(token) as { ip?: string; userAgent?: string };
    
    if (decoded.ip && decoded.ip !== clientIp) {
      console.warn(`[Security] IP mismatch for player ${playerId}`);
      return next(new Error('Session context mismatch'));
    }
    
    if (decoded.userAgent && decoded.userAgent !== clientUa) {
      console.warn(`[Security] User-Agent mismatch for player ${playerId}`);
      return next(new Error('Session context mismatch'));
    }
    
    (socket as Socket & { playerId: string }).playerId = playerId;
    next();
  } catch (error) {
    next(error as Error);
  }
});
```

**Verification:**
- Test unauthorized access attempts from different IP
- Test session hijacking prevention

---

## Authorization Requirements

### AUTHZ-001: Rate Limiting per Connection ⚠️ CRITICAL

**Requirement:**
Rate limits must be enforced per WebSocket connection:
- `game:action`: Maximum 10 per second
- `game:chat`: Maximum 1 per second
- `game:join`: Maximum 5 per minute
- `heartbeat`: Maximum 1 per second

**Implementation Location:** `server/src/websocket/server.ts` (new method)

**Code Requirement:**
```typescript
interface RateLimitConfig {
  max: number;
  windowMs: number;
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  'game:action': { max: 10, windowMs: 1000 },
  'game:chat': { max: 1, windowMs: 1000 },
  'game:join': { max: 5, windowMs: 60000 },
  'heartbeat': { max: 1, windowMs: 1000 },
};

private connectionRateLimits = new Map<string, Map<string, { count: number; resetTime: number }>>();

private checkRateLimit(playerId: string, eventType: string): boolean {
  const limit = RATE_LIMITS[eventType];
  if (!limit) return true;
  
  const now = Date.now();
  const playerLimits = this.connectionRateLimits.get(playerId) || new Map();
  
  let eventLimit = playerLimits.get(eventType);
  if (!eventLimit || now > eventLimit.resetTime) {
    eventLimit = { count: 1, resetTime: now + limit.windowMs };
    playerLimits.set(eventType, eventLimit);
    this.connectionRateLimits.set(playerId, playerLimits);
    return true;
  }
  
  if (eventLimit.count >= limit.max) {
    console.warn(`[RateLimit] Player ${playerId} exceeded limit for ${eventType}`);
    return false;
  }
  
  eventLimit.count++;
  return true;
}
```

**Usage in handlers:**
```typescript
socket.on('game:action', async (data) => {
  if (!this.checkRateLimit(playerId, 'game:action')) {
    socket.emit('error', { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many actions' });
    return;
  }
  // ... existing handler
});
```

**Verification:**
- Test rate limit enforcement
- Test limit reset behavior
- Test bypass attempts

---

## Input Validation Requirements

### INP-001: Game Action Validation ⚠️ CRITICAL

**Requirement:**
All game actions must be validated at the WebSocket entry point before reaching the game engine:
- Type validation
- Parameter bounds checking
- Ownership verification
- Rate limit enforcement

**Implementation Location:** `server/src/websocket/server.ts:134-171`

**Code Requirement:**
```typescript
socket.on('game:action', async (data: GameActionMessage) => {
  // 1. Rate limit check
  if (!this.checkRateLimit(playerId, 'game:action')) {
    socket.emit('error', { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many actions' });
    return;
  }
  
  // 2. Basic structure validation
  if (!data.gameId || typeof data.gameId !== 'string') {
    socket.emit('error', { code: 'INVALID_GAME_ID', message: 'Invalid game ID' });
    return;
  }
  
  // 3. Action validation based on type
  const action = data.action;
  if (!action || typeof action.type !== 'string') {
    socket.emit('error', { code: 'INVALID_ACTION', message: 'Invalid action format' });
    return;
  }
  
  // 4. Game-specific validation
  try {
    const session = await this.gameServer.getSession(data.gameId);
    if (!session) {
      socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
      return;
    }
    
    // ... existing handler
  } catch (error) {
    console.error('[EventStream] Action error:', error);
    socket.emit('error', { code: 'ACTION_FAILED', message: 'Failed to process action' });
  }
});
```

**Verification:**
- Test valid action acceptance
- Test invalid action rejection
- Test edge cases (boundary values)

---

### INP-002: Chat Message Sanitization ⚠️ CRITICAL

**Requirement:**
All chat messages must be sanitized before broadcast:
- HTML escape all content
- Remove script tags and event handlers
- Limit message length to 500 characters
- Allow only safe formatting tags

**Implementation Location:** `server/src/websocket/server.ts:174-201`

**Code Requirement:**
```typescript
import DOMPurify from 'isomorphic-dompurify';

socket.on('game:chat', async (data: { gameId: string; message: string }) => {
  try {
    // 1. Validate message format
    if (!data.message || typeof data.message !== 'string') {
      socket.emit('error', { code: 'INVALID_MESSAGE', message: 'Invalid message' });
      return;
    }
    
    // 2. Length validation
    if (data.message.length > 500) {
      socket.emit('error', { code: 'MESSAGE_TOO_LONG', message: 'Message exceeds 500 characters' });
      return;
    }
    
    // 3. Sanitize with strict allowlist
    const sanitized = DOMPurify.sanitize(data.message, {
      ALLOWED_TAGS: ['b', 'i', 'u', 'em', 'strong', 'br'],
      ALLOWED_ATTR: [],
      ALLOW_DATA_ATTR: false,
    });
    
    // 4. Get player info
    const session = await this.gameServer.getSession(data.gameId);
    const player = session?.players.find(p => p.id === playerId);
    
    // 5. Create sanitized message
    const chatMessage = {
      id: uuid(),
      gameId: data.gameId,
      senderId: playerId,
      senderName: player?.name || 'Anonymous',
      senderType: (player?.type || 'human') as 'human' | 'agent',
      content: sanitized,
      timestamp: Date.now(),
    };
    
    // 6. Broadcast sanitized message
    this.io.to(`game:${data.gameId}`).emit('game:chat', chatMessage);
  } catch (error) {
    console.error('[EventStream] Chat error:', error);
    socket.emit('error', { code: 'CHAT_FAILED', message: 'Failed to send chat message' });
  }
});
```

**Verification:**
- Test XSS payload sanitization
- Test length limits
- Test character whitelist enforcement

---

### INP-003: Action Cooldown Enforcement ⚠️ CRITICAL

**Requirement:**
All game actions must enforce a minimum cooldown period between actions from the same player.

**Implementation Location:** `server/src/game/server.ts`

**Code Requirement:**
```typescript
interface GameSession {
  // ... existing fields ...
  playerLastAction: Map<string, number>;  // playerId -> timestamp
}

// In processTicTacToeAction()
const MIN_ACTION_INTERVAL = 100;  // 100ms cooldown

async processTicTacToeAction(sessionId: string, playerId: string, action: TicTacToeAction): Promise<GameEvent | null> {
  const session = await this.getSession(sessionId);
  if (!session) return null;
  
  // Check cooldown
  const now = Date.now();
  const lastAction = session.playerLastAction?.get(playerId) || 0;
  if (now - lastAction < MIN_ACTION_INTERVAL) {
    console.warn(`[Security] Cooldown violation for player ${playerId}`);
    return null;
  }
  
  // Update last action time
  if (!session.playerLastAction) {
    session.playerLastAction = new Map();
  }
  session.playerLastAction.set(playerId, now);
  
  // ... existing handler
}
```

**Verification:**
- Test cooldown enforcement
- Test rapid action rejection
- Test fair play enforcement

---

## Data Protection Requirements

### DATA-001: Encryption in Transit

**Requirement:**
- All external communication must use TLS 1.2 or higher
- WebSocket connections must use WSS (WebSocket Secure)
- No plain HTTP except for local development

**Implementation:** Configured at load balancer/Nginx level

**Verification:**
- TLS configuration scan
- SSL Labs test score A or higher
- HSTS header verification

---

### DATA-002: Error Message Sanitization

**Requirement:**
All error messages returned to clients must be sanitized:
- No stack traces
- No internal paths
- No library versions
- No sensitive data

**Implementation Location:** `server/src/websocket/server.ts` error handlers

**Code Requirement:**
```typescript
// Bad - exposes internal details
} catch (error) {
  next(error as Error);
}

// Good - sanitized errors
} catch (error) {
  console.error('[EventStream] Internal error:', error);
  next(new Error('An error occurred'));
}
```

**Verification:**
- Test error message content
- Ensure no sensitive data in responses

---

## Logging Requirements

### LOG-001: Security Event Logging

**Requirement:**
The following events must be logged:
- Authentication attempts (success/failure)
- Authorization failures
- Rate limit triggers
- Suspicious activity patterns
- Invalid action attempts

**Code Requirement:**
```typescript
private logSecurityEvent(eventType: string, playerId: string, details: Record<string, unknown>): void {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'security',
    eventType,
    playerId,
    ...details,
  }));
}

// Usage examples:
this.logSecurityEvent('AUTH_SUCCESS', playerId, { action: 'websocket_connect' });
this.logSecurityEvent('RATE_LIMIT_EXCEEDED', playerId, { event: 'game:action', count: 11 });
this.logSecurityEvent('INVALID_ACTION', playerId, { action: action.type, reason: 'not_your_turn' });
```

**Verification:**
- Test log completeness
- Test log aggregation
- Test alert triggering

---

## Compliance Requirements

### COMP-001: Security Headers

**Requirement:**
All HTTP responses must include:
- Content-Security-Policy
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Strict-Transport-Security

**Implementation:** Next.js headers in `next.config.js`

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

**Test Framework:** Vitest (already configured)

**Verification:**
- Coverage report review
- CI/CD pipeline verification
- Test execution in CI

---

## Implementation Status

| Requirement | Status | Location | Priority |
|-------------|--------|----------|----------|
| AUTH-001: Token Management | ❌ Missing | server/src/websocket/server.ts:221-225 | **P1** |
| AUTH-002: Credential Storage | ✅ OK | N/A | - |
| AUTH-003: Session Binding | ❌ Missing | server/src/websocket/server.ts:59-73 | P2 |
| AUTHZ-001: Rate Limiting | ❌ Missing | server/src/websocket/server.ts | **P1** |
| INP-001: Game Action Validation | ⚠️ Partial | server/src/websocket/server.ts:134-171 | P2 |
| INP-002: Chat Sanitization | ❌ Missing | server/src/websocket/server.ts:174-201 | **P1** |
| INP-003: Action Cooldown | ❌ Missing | server/src/game/server.ts | **P1** |
| DATA-001: Encryption | ✅ OK | Infrastructure | - |
| DATA-002: Error Sanitization | ⚠️ Partial | server/src/websocket/server.ts | P3 |
| LOG-001: Security Logging | ⚠️ Partial | server/src/websocket/server.ts | P2 |
| COMP-001: Security Headers | ❌ Missing | next.config.js | P2 |

---

*Security Requirements Version: 2.0*
*Last Updated: 2026-01-19*
*JungleSecurity - Based on verified code analysis*
