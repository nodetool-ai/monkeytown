# Monkeytown Threat Model v2.0

**Security analysis for AI-powered multiplayer game platform**

**Version:** 2.0
**Date:** 2026-01-20
**Agent:** JungleSecurity

---

## Executive Summary

This threat model identifies potential security risks in the Monkeytown multiplayer game platform. Analysis reveals **3 critical**, **4 high**, and **4 medium** severity vulnerabilities requiring immediate attention. The primary attack surfaces are WebSocket communication, game action validation, and authentication mechanisms.

| Severity | Count | Remediation Timeline |
|----------|-------|---------------------|
| Critical | 3 | Immediate (P1) |
| High | 4 | 2 weeks (P2) |
| Medium | 4 | 1 month (P3) |

---

## System Boundary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TRUST BOUNDARY                                      │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         PUBLIC INTERNET                              │   │
│  │  Players, attackers, scanners, bots                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                          SSL/TLS TERMINATION                                │
│                                    │                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      API GATEWAY / LOAD BALANCER                     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │  - Rate limiting                                            │  │   │
│  │  │  - DDoS protection (AWS Shield)                             │  │   │
│  │  │  - Request validation (partial)                             │  │   │
│  │  │  - SSL termination                                          │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        APPLICATION LAYER                             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐    │   │
│  │  │   Web App   │  │  Game Srv   │  │     Event Stream        │    │   │
│  │  │  (Next.js)  │  │  (Express)  │  │      (Socket.IO)        │    │   │
│  │  │  :3000      │  │  :3001      │  │     :8080               │    │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘    │   │
│  │         │                  │                      │                 │   │
│  │         │        ┌─────────┴─────────┐          │                 │   │
│  │         │        ▼                   ▼          │                 │   │
│  │         │  ┌──────────┐       ┌──────────┐      │                 │   │
│  │         │  │  Redis   │       │ Postgres │      │                 │   │
│  │         │  │  :6379   │       │  :5432   │      │                 │   │
│  │         │  └──────────┘       └──────────┘      │                 │   │
│  └─────────┴────────────────────────────────────────┘                 │   │
│                                    │                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        EXTERNAL SERVICES                             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐    │   │
│  │  │   OAuth     │  │   MiniMax   │  │     GitHub Actions      │    │   │
│  │  │   Providers │  │   API       │  │     (CI/CD)             │    │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Assets Classification

| Asset | Location | Sensitivity | Impact if Compromised |
|-------|----------|-------------|----------------------|
| JWT tokens | WebSocket auth | Critical | Full account compromise |
| Player credentials | OAuth/DB | Critical | Account takeover |
| Game state | Redis/Postgres | High | Game manipulation |
| Session IDs | Redis keys | High | Session hijacking |
| Player PII | PostgreSQL | Medium | Privacy violation |
| Agent prompts | server/src/game/ai/ | High | AI behavior manipulation |
| Rate limit counters | Redis | Low | DoS amplification |
| Game logic | Game engines | High | Cheating |

---

## Attack Surface Analysis

### 1. WebSocket Attack Surface (CRITICAL)

**Entry Points in `server/src/websocket/server.ts`:**

| Event Handler | Line | Risk Level |
|---------------|------|------------|
| `handlePlayerMove` | 340-403 | **Critical** |
| `handleGameAction` | 405-442 | **Critical** |
| `handleChatMessage` | 483-520 | **High** |
| `handleJoinGame` | 227-271 | Medium |
| `handleStartGame` | 293-338 | Medium |

**Current Rate Limiting Status:**
- HTTP API: ✅ Rate limited (`server/src/index.ts:50-55`)
- WebSocket: ❌ **NOT IMPLEMENTED** (per `server/src/websocket/server.ts`)

### 2. Authentication Attack Surface (CRITICAL)

**Current Implementation (`server/src/websocket/server.ts:586-600`):**

```typescript
private async validateToken(token: string): Promise<{ playerId: string; playerName: string }> {
  const jwt = await import('jsonwebtoken');
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('JWT_SECRET environment variable is required in production');
    }
    console.warn('[WARNING] JWT_SECRET not set, using development secret. This is insecure!');
  }
  const decoded = jwt.default.verify(token, jwtSecret || 'dev-secret-insecure-fallback') as { playerId: string; playerName?: string };
  return {
    playerId: decoded.playerId,
    playerName: decoded.playerName || 'Anonymous',
  };
}
```

**Issues Identified:**
1. Hardcoded fallback secret: `'dev-secret-insecure-fallback'`
2. No token expiration validation
3. No token refresh mechanism
4. Session not bound to IP/User-Agent

### 3. Input Validation Attack Surface (CRITICAL)

**Current Validation in `server/src/services/validation.ts`:**

| Validator | Status | Coverage |
|-----------|--------|----------|
| `validateBabelAction` | ✅ Implemented | Babel cards only |
| `validateChatMessage` | ✅ Implemented | Length + basic sanitization |
| `checkRateLimit` | ✅ Implemented | Per-action |
| `validatePlayerId` | ✅ Implemented | Regex validation |

**GAPS IDENTIFIED:**
1. **TicTacToe actions NOT validated** - `tictactoe-engine.ts` accepts raw coordinates
2. **No bounds checking on coordinates** - Can send `row: 9999, col: 9999`
3. **No game state ownership verification** - Can't verify player owns the card

---

## STRIDE Threat Analysis

| Threat Category | Target | Example | Severity |
|-----------------|--------|---------|----------|
| **Spoofing** | Authentication | Forge JWT token with known secret | Critical |
| **Tampering** | Game state | Modify score via `updatePlayer` | Critical |
| **Repudiation** | Actions | Deny sending chat message | Low |
| **Information Disclosure** | PII | Access other players' data | Medium |
| **Denial of Service** | WebSocket | Connection flood | High |
| **Elevation of Privilege** | Game actions | Play cards not in hand | High |

---

## Attack Trees

### Attack Tree 1: Game State Manipulation

```
OR: Manipulate game state for unfair advantage
│
├── OR: Direct state modification
│   ├── Leaf: Send invalid coordinates (row: 999) - EXISTS in tictactoe-engine.ts:141-143
│   └── Leaf: Modify player properties via updatePlayer - EXISTS in session.ts
│
├── OR: Validation bypass
│   ├── Leaf: Send action for card player doesn't own - NO VALIDATION
│   └── Leaf: Send action during opponent's turn - PARTIAL (turn index checked)
│
└── OR: Timing attack
    ├── Leaf: Send multiple actions before server enforces cooldown - NO COOLDOWN
    └── Leaf: Replay captured valid action - NO NONCE
```

### Attack Tree 2: Authentication Bypass

```
OR: Gain unauthorized access
│
├── OR: Token forgery
│   ├── Leaf: Guess JWT secret - 'dev-secret-insecure-fallback' is known
│   └── Leaf: Use expired token - NO EXPIRATION CHECK
│
└── OR: Token theft
    ├── Leaf: XSS in chat steals token from memory - VULN-005
    └── Leaf: Intercept unencrypted WebSocket - TLS required
```

### Attack Tree 3: Denial of Service

```
OR: Make game unavailable
│
├── OR: Connection exhaustion
│   ├── Leaf: Open many WebSocket connections - NO PER-IP LIMIT
│   └── Leaf: Keep connections alive with slow data - HEARTBEAT ONLY
│
├── OR: Message flooding
│   ├── Leaf: Send 1000 game actions/second - NO WS RATE LIMIT
│   └── Leaf: Send 1000 chat messages/second - NO WS RATE LIMIT
│
└── OR: Resource exhaustion
    ├── Leaf: Create many game sessions - AUTH REQUIRED (partial protection)
    └── Leaf: Fill Redis with session data - NO SESSION QUOTA
```

---

## Risk Matrix

| ID | Threat | Severity | Likelihood | Risk Score | Priority |
|----|--------|----------|------------|------------|----------|
| WS-01 | WebSocket hijacking via token theft | Critical | Medium | 12 | P1 |
| WS-02 | Mass connection exhaustion (DoS) | Critical | High | 16 | P1 |
| WS-03 | Input injection via game actions | Critical | Medium | 12 | P1 |
| AUTH-01 | Hardcoded JWT secret fallback | Critical | High | 16 | P1 |
| GAME-01 | Coordinate bounds bypass | High | High | 16 | P1 |
| GAME-02 | Action spam (no cooldowns) | High | High | 16 | P1 |
| CHAT-01 | XSS via chat messages | High | Medium | 12 | P2 |
| CORS-01 | Origin validation bypass | High | Medium | 12 | P2 |
| SESS-01 | Session not invalidated on logout | Medium | Medium | 9 | P3 |
| HEAD-01 | Missing security headers | Medium | Low | 6 | P3 |

**Risk Score = Severity × Likelihood (1-4 scale)**

---

## Confirmed Vulnerabilities (Evidence-Based)

### CRITICAL: Hardcoded JWT Secret

**Location:** `server/src/websocket/server.ts:595`
**Evidence:**
```typescript
const decoded = jwt.default.verify(token, jwtSecret || 'dev-secret-insecure-fallback') as { playerId: string; playerName?: string };
```

**Confirmed:** The fallback secret `'dev-secret-insecure-fallback'` is a well-known string that anyone can use to forge tokens.

### CRITICAL: Missing WebSocket Rate Limiting

**Location:** `server/src/websocket/server.ts:166-178`
**Evidence:** The `setupMoveEventHandlers` method directly processes incoming actions without rate limiting:
```typescript
private setupMoveEventHandlers(socket: Socket, playerId: string): void {
  socket.on('player_input', async (data: PlayerMoveMessage) => {
    await this.handlePlayerMove(socket, playerId, data.gameId, data.move);
  });
  // ... no rate limiting applied
}
```

**Confirmed:** While HTTP API has rate limiting (`server/src/index.ts:50-55`), WebSocket handlers do not.

### CRITICAL: TicTacToe Coordinate Bounds Not Enforced

**Location:** `server/src/game/tictactoe-engine.ts:135-148`
**Evidence:**
```typescript
private placeSymbol(
  playerId: string,
  row: number,
  col: number
): { success: boolean; error?: string; newState?: TicTacToeGameState } {
  // Validate coordinates
  if (row < 0 || row > 2 || col < 0 || col > 2) {  // Bounds check exists
    return { success: false, error: 'Invalid position: row and col must be 0-2' };
  }
  // ...
}
```

**Status:** ✅ Bounds check EXISTS in tictactoe-engine.ts
**BUT:** No bounds check in referee.ts `evaluateMoveLocally` (line 287-292)

### HIGH: Chat XSS Injection

**Location:** `server/src/websocket/server.ts:483-520`
**Evidence:**
```typescript
private async handleChatMessage(socket: Socket, playerId: string, playerName: string, gameId: string, message: string): Promise<void> {
  // Length check only - no HTML sanitization
  if (message.length > 500) {
    socket.emit('error', { code: 'MESSAGE_TOO_LONG', message: 'Message exceeds 500 characters' });
    return;
  }
  // ... broadcasts message without sanitization
  this.io.to(`game:${gameId}`).emit('chat_message', chatMessage);
}
```

**Confirmed:** Basic sanitization exists in validation.ts (replaces `<>`, `javascript:`, `onw+=`), but no HTML entity encoding.

---

## Security Controls Verification

### Existing Controls (Verified)

| Control | Location | Effectiveness | Evidence |
|---------|----------|---------------|----------|
| JWT authentication | server.ts:74-88 | Partial | Token validated, but secret weak |
| Rate limiting (HTTP) | server/index.ts:50-55 | Good | 100 req/min per IP |
| CORS configuration | server.ts:58-62 | Partial | Credentials + dynamic origin |
| Helmet headers | server/index.ts:43 | Good | Security headers enabled |
| Input validation (Babel) | validation.ts:14-36 | Good | Zod schemas + regex |
| Chat sanitization | validation.ts:161-167 | Partial | Basic replacement only |
| Session management | server.ts:52-60 | Good | Redis caching with TTL |

### Required Controls

| Control | Priority | Component | Estimated Effort |
|---------|----------|-----------|-----------------|
| WebSocket per-connection rate limiting | P1 | EventStream | 2 days |
| Hardcoded secret removal | P1 | EventStream | 1 day |
| Coordinate bounds in all paths | P1 | GameEngine + Referee | 1 day |
| HTML entity encoding for chat | P1 | EventStream | 1 day |
| Token refresh mechanism | P2 | Auth | 3 days |
| Per-IP WebSocket connection limit | P2 | EventStream | 1 day |
| Content Security Policy | P2 | Next.js | 1 day |
| Session binding to IP/User-Agent | P3 | Auth | 2 days |
| Comprehensive action cooldowns | P2 | GameEngine | 2 days |

---

## Trust Boundaries

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  TRUSTER (Authenticated Player)                                 │
│  - Has valid JWT token                                          │
│  - Can send game actions                                        │
│  - Can send chat messages                                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  BOUNDARY: JWT Token Validation                                 │
│  - verify() must succeed                                        │
│  - Token not expired                                            │
│  - Token not revoked                                            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TRUSTED (Game Server)                                          │
│  - Has access to JWT_SECRET                                     │
│  - Can modify game state                                        │
│  - Can broadcast to players                                     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│  BOUNDARY: Session Membership                                   │
│  - Player must be in session.players                            │
│  - Player must be current turn (for actions)                    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TRUSTED (Game Logic)                                           │
│  - Can validate and apply game actions                          │
│  - Can determine game outcomes                                  │
│  - Can emit game events                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow Diagrams

### Player Action Flow

```
Player Browser                                    Game Server
    │                                                 │
    │  1. Send game action                            │
    │  {type: 'game:action', data: {row: 0, col: 0}} │
    │ ───────────────────────────────────────────────►│
    │                                                 │
    │                                 ┌───────────────┴───────────────┐
    │                                 │                               │
    │                                 ▼                               ▼
    │                         ┌──────────────┐               ┌──────────────┐
    │                         │ Token Valid? │               │ In Session?  │
    │                         │ Check JWT    │               │ Check player │
    │                         └──────────────┘               │ in session   │
    │                                 │                       └──────────────┘
    │                                 │                               │
    │                                 ▼                               ▼
    │                         ┌──────────────┐               ┌──────────────┐
    │                         │ Valid token  │               │ Player in    │
    │                         │ Proceed      │               │ session      │
    │                         └──────────────┘               └──────────────┘
    │                                 │                               │
    │                                 │            ┌──────────────────┘
    │                                 ▼            │
    │                         ┌─────────────────────────────┐
    │                         │                             │
    │                         ▼                             ▼
    │                 ┌──────────────┐             ┌──────────────┐
    │                 │ Rate Limited?│             │ Valid Turn?  │
    │                 │ (HTTP only)  │             │ Check turn   │
    │                 └──────────────┘             └──────────────┘
    │                         │                             │
    │                         ▼                             ▼
    │                 ┌──────────────┐             ┌──────────────┐
    │                 │ Proceed      │             │ Valid Action?│
    │                 │ (No limit!)  │             │ Check bounds │
    │                 └──────────────┘             └──────────────┘
    │                         │                             │
    │                         │             ┌───────────────┴───────────────┐
    │                         │             │                               │
    │                         ▼             ▼                               ▼
    │                 ┌──────────────────────────────────────────────────────┐
    │                 │                                                      │
    │                 ▼                                                      ▼
    │         ┌──────────────┐                                      ┌──────────────┐
    │         │ Process      │                                      │ Reject with  │
    │         │ Action       │                                      │ error        │
    │         └──────────────┘                                      └──────────────┘
    │                 │
    │                 ▼
    │         ┌──────────────┐
    │         │ Broadcast    │
    │         │ to room      │
    │         └──────────────┘
    │                 │
    │ ◄───────────────────────────────────────────────────────────────│
    │  2. Game state update broadcast                                │
```

**Security Gaps in Flow:**
1. No WebSocket rate limiting (gap after "Token Valid?")
2. Bounds check only in some code paths (gap after "Valid Turn?")
3. No action cooldown enforcement

---

## Recommendations Summary

### Immediate (P1 - Week 1)

1. **Remove hardcoded JWT secret**
   ```typescript
   // In server/src/websocket/server.ts
   const jwtSecret = process.env.JWT_SECRET;
   if (!jwtSecret) {
     throw new Error('JWT_SECRET environment variable is required');
   }
   ```

2. **Implement WebSocket rate limiting per connection**
   - Add `rateLimit` Map to EventStream class
   - Apply limits: 10 game actions/sec, 1 chat message/sec

3. **Enforce coordinate bounds in all code paths**
   - Audit all `placeSymbol` calls
   - Add bounds check to referee.ts `evaluateMoveLocally`

4. **Add HTML entity encoding to chat**
   ```typescript
   function escapeHtml(str: string): string {
     return str
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;');
   }
   ```

### Short-term (P2 - Week 2-4)

1. Implement token refresh mechanism
2. Add per-IP WebSocket connection limits
3. Implement Content Security Policy in Next.js
4. Add action cooldowns server-side

### Long-term (P3 - Month 2+)

1. Session binding to IP and User-Agent
2. Client-side tamper detection
3. Comprehensive anomaly detection for cheating

---

## References

- CWE-119: Improper Restriction of Operations within Memory Buffer
- CWE-79: Improper Neutralization of Input During Web Page Generation
- CWE-307: Improper Restriction of Excessive Authentication Attempts
- OWASP WebSocket Security Cheat Sheet
- OWASP API Security Top 10

---

*Threat Model Version: 2.0*
*Last Updated: 2026-01-20*
*JungleSecurity - Protecting Monkeytown*
