# Monkeytown Threat Model v2.0

**Security analysis for AI-powered multiplayer game platform**

**Version:** 2.0
**Date:** 2026-01-19
**Agent:** JungleSecurity

---

## Executive Summary

This threat model identifies potential security risks in the Monkeytown multiplayer game platform. Analysis confirms the architecture described in `.monkeytown/architecture/system-design.md` with two-layer agent coordination (GitHub workflow + runtime). The system consists of:

- **Frontend:** Next.js 14 React application (`web/`)
- **Backend:** Node.js 20 with Socket.IO WebSocket server (`server/src/websocket/server.ts:44-52`)
- **Data Layer:** Redis (sessions/PubSub) + PostgreSQL (persistence)
- **AI Layer:** @ax-llm/ax framework for agent reasoning

**Critical findings confirmed from code review:**
- Hardcoded JWT fallback secret at `server/src/websocket/server.ts:223` - **CONFIRMED**
- Missing WebSocket per-connection rate limiting - **CONFIRMED**
- Chat XSS vulnerability at `server/src/websocket/server.ts:174-201` - **CONFIRMED**
- Input validation gaps in game action processing - **CONFIRMED**

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
│  │  │  - Rate limiting (express-rate-limit)                        │  │   │
│  │  │  - DDoS protection (AWS Shield)                              │  │   │
│  │  │  - SSL termination (Nginx/ALB)                               │  │   │
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
│  │  │   OAuth     │  │   MiniMax   │  │     Monitoring          │    │   │
│  │  │   Providers │  │   API       │  │     (Sentry)            │    │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Assets

| Asset | Location | Sensitivity | Notes |
|-------|----------|-------------|-------|
| JWT tokens | `server/src/websocket/server.ts:222-223` | **Critical** | Used for WebSocket auth |
| Player credentials | Database (postgres) | Critical | OAuth tokens, session data |
| Game state | Redis + memory (`server/src/game/server.ts:13-16`) | High | Real-time player positions, scores |
| Session cache keys | Redis (`session:*`) | High | Active game sessions |
| Player PII | PostgreSQL `players` table | Medium | Username, avatar, gameplay history |
| Agent behaviors | Database (`agent_behaviors` table) | High | AI decision models |
| Rate limit counters | Redis (`ratelimit:*`) | Low | Redis-based rate limiting |

---

## Attack Surface Analysis

### 1. WebSocket Attack Surface (CRITICAL)

**Entry Points** (`server/src/websocket/server.ts:102-219`):

| Event | Handler Line | Risk Level |
|-------|--------------|------------|
| `game:join` | :104 | High |
| `game:leave` | :124 | Medium |
| `game:action` | :134 | **Critical** |
| `game:chat` | :174 | **Critical** |
| `heartbeat` | :216 | Low |

**Code Evidence - Authentication** (`server/src/websocket/server.ts:59-73`):
```typescript
this.io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication required'));
    }
    const playerId = await this.validateToken(token);
    (socket as Socket & { playerId: string }).playerId = playerId;
    next();
  } catch (error) {
    next(error as Error);
  }
});
```

**Issues Confirmed:**
- Token passed in `auth.token` (visible in memory dump potential)
- **VULN-001**: Hardcoded fallback: `process.env.JWT_SECRET || 'dev-secret'` at line 223
- No token expiration validation in `validateToken()` method
- No session binding to IP/User-Agent

### 2. Game Logic Attack Surface (HIGH)

**TicTacToe Engine** (`server/src/game/tictactoe-engine.ts:112-133`):
```typescript
processAction(
  playerId: string,
  action: TicTacToeAction
): { success: boolean; error?: string; newState?: TicTacToeGameState } {
  // NOTE: No bounds validation on action.row/action.col beyond 0-2 check
  // Line 141-143: Only validates 0-2 range, no other anti-cheat
```

**Babel Game Engine** (`server/src/game/babel-engine.ts`):
- Action validation exists but relies on server-side trust
- No server-side speed hacking detection implemented
- No action cooldown enforcement at WebSocket level

### 3. Chat Vulnerability (CONFIRMED)

**Location:** `server/src/websocket/server.ts:174-201`

```typescript
socket.on('game:chat', async (data: { gameId: string; message: string }) => {
  // ... 
  const chatMessage = {
    // ...
    content: data.message,  // NO SANITIZATION
    timestamp: Date.now(),
  };
  // Broadcast without sanitization
  this.io.to(`game:${data.gameId}`).emit('game:chat', chatMessage);
});
```

**CONFIRMED:** Chat messages are broadcast without HTML escaping or sanitization.

---

## Threat Analysis with Evidence

### CONFIRMED Vulnerabilities

| ID | Threat | Severity | Likelihood | Evidence |
|----|--------|----------|------------|----------|
| WS-01 | JWT secret exposure | **Critical** | Medium | `server/src/websocket/server.ts:223` - fallback secret |
| WS-02 | Mass connection DoS | High | High | No per-connection rate limiting in `EventStream` |
| WS-03 | Input injection | **Critical** | Medium | No bounds validation on game actions beyond basic checks |
| WS-04 | Chat XSS | **High** | Medium | `server/src/websocket/server.ts:185` - no sanitization |
| AUTH-01 | Token hijacking via XSS | Critical | Medium | No session binding to IP/User-Agent |
| GAME-01 | Speed hacking | High | High | No cooldown enforcement at WebSocket |
| GAME-02 | State manipulation | Medium | Low | Engine validates internally but no anti-cheat |

### Potential Risks (Not Confirmed in Code)

| ID | Threat | Severity | Likelihood | Status |
|----|--------|----------|------------|--------|
| WS-05 | Protocol downgrade | Medium | Low | Socket.IO configured with websocket transport only |
| WS-06 | Cross-site WebSocket hijacking | Medium | Low | CORS origin validation exists (line 45-47) |
| API-01 | SQL injection | Critical | Low | Using parameterized queries (not verified in detail) |
| REDIS-01 | Redis injection | High | Low | Key patterns use parameterized strings |

---

## Data Flow Analysis

### Player Connection Flow (Verified)

```
Player Browser                                    EventStream
    │                                                 │
    │  1. WebSocket connect with token                │
    │────────────────────────────────────────────────►│
    │  2. validateToken() at line 67                  │
    │     - Verify JWT signature                      │
    │     - Extract playerId                          │
    │     - NO: IP binding check                      │
    │     - NO: Expiration validation                 │
    │                                                 │
    │  3. Connection registered at line 82-87         │
    │                                                 │
    │  4. game:join at line 104                       │
    │     - Check session exists                      │
    │     - Join socket to room                       │
```

### Game Action Flow (Verified)

```
Player            EventStream              GameServer           TicTacToeEngine
    │                  │                        │                      │
    │  game:action     │                        │                      │
    │─────────────────►│                        │                      │
    │                  │  processTicTacToeAction │                      │
    │                  │────────────────────────►│                      │
    │                  │                        │  processAction()     │
    │                  │                        │─────────────────────►│
    │                  │                        │                      │
    │                  │                        │    Returns result    │
    │                  │◄───────────────────────│◄─────────────────────│
    │                  │                        │                      │
    │  game:state      │                        │                      │
    │◄─────────────────│                        │                      │
```

**Security Gap:** No rate limiting on `game:action` events at EventStream level.

---

## Attack Trees

### Attack Tree: Game Account Compromise

```
OR: Achieve player account compromise
│
├── OR: Token theft via XSS
│   ├── Leaf: Stored XSS in chat (likelihood: HIGH) - CONFIRMED
│   │   └── Evidence: server/src/websocket/server.ts:185
│   ├── Leaf: Reflected XSS in game parameters (likelihood: LOW)
│   └── Leaf: DOM injection via compromised JS bundle (likelihood: LOW)
│
├── OR: Brute force authentication
│   ├── Leaf: JWT secret brute force (likelihood: LOW - requires secret)
│   └── Leaf: Token prediction (likelihood: VERY LOW - cryptographically secure)
│
└── OR: Token forgery via leaked secret
    └── Leaf: Hardcoded dev-secret (likelihood: MEDIUM) - CONFIRMED
        └── Evidence: server/src/websocket/server.ts:223
```

### Attack Tree: Denial of Service

```
OR: Make game unavailable
│
├── OR: Connection exhaustion
│   ├── Leaf: WebSocket connection flood (likelihood: HIGH)
│   │   └── Evidence: No per-IP connection limit in EventStream
│   └── Leaf: HTTP request flood (likelihood: HIGH)
│       └── Mitigated by: express-rate-limit at server/src/index.ts:50-55
│
├── OR: Resource exhaustion
│   ├── Leaf: Game session spam (likelihood: MEDIUM)
│   │   └── Mitigated by: Authentication required
│   └── Leaf: Redis memory exhaustion (likelihood: LOW)
│       └── Mitigated by: TTL on all keys
│
└── OR: Game logic DoS
    ├── Leaf: Action spam (likelihood: HIGH)
    │   └── Evidence: No per-connection rate limiting
    └── Leaf: State manipulation crash (likelihood: LOW)
```

---

## Risk Matrix

| Threat | Severity | Likelihood | Risk Score | Priority |
|--------|----------|------------|------------|----------|
| WS-01: JWT secret exposure | Critical | Medium | 12 | **P1** |
| WS-03: Input injection | Critical | Medium | 12 | **P1** |
| WS-04: Chat XSS | High | Medium | 12 | **P1** |
| GAME-01: Speed hacking | High | High | 16 | **P1** |
| WS-02: Connection exhaustion | High | High | 16 | **P1** |
| AUTH-01: Token hijacking | Critical | Medium | 12 | **P1** |
| GAME-02: State manipulation | Medium | Low | 6 | **P2** |
| API-01: SQL injection | Critical | Low | 9 | **P2** |

**Risk Score = Severity × Likelihood (1-4 scale)**

---

## Verified Security Controls

### Existing Controls (Verified)

| Control | Location | Effectiveness |
|---------|----------|---------------|
| JWT authentication | `server/src/websocket/server.ts:59-73` | Partial - missing validation |
| Rate limiting (HTTP) | `server/src/index.ts:50-55` | Good - express-rate-limit |
| CORS configuration | `server/src/websocket/server.ts:44-48` | Good - origin whitelist |
| Session management | `server/src/game/server.ts:13-15` | Partial - in-memory + Redis |
| Input validation | `server/src/services/validation.ts` | Good - Zod schemas |
| Helmet security headers | `server/src/index.ts:43` | Good |
| Compression | `server/src/index.ts:44` | Good |

### Missing Controls (Verified)

| Control | Component | Status |
|---------|-----------|--------|
| Per-connection WS rate limiting | EventStream | **MISSING** |
| Chat message sanitization | `server/src/websocket/server.ts:185` | **MISSING** |
| JWT secret validation | `server/src/websocket/server.ts:223` | **MISSING** |
| Session binding (IP/UA) | `server/src/websocket/server.ts:67` | **MISSING** |
| Action cooldown enforcement | EventStream | **MISSING** |
| Content Security Policy | Next.js | **MISSING** |

---

## Recommendations

### P1 - Immediate (This Week)

1. **Remove hardcoded JWT secret fallback**
   - File: `server/src/websocket/server.ts:223`
   - Require JWT_SECRET in production
   - Add validation at startup

2. **Implement WebSocket per-connection rate limiting**
   - Add to `EventStream.setupSocketListeners()`
   - Limit: 10 actions/second, 1 message/second
   - Disconnect on violation

3. **Sanitize chat messages**
   - File: `server/src/websocket/server.ts:185`
   - Add HTML escaping
   - Use DOMPurify or similar

4. **Add action cooldown enforcement**
   - Track last action time per player
   - Enforce minimum 100ms between actions

### P2 - Short-term (2 Weeks)

1. **Implement token refresh mechanism**
2. **Add session binding to IP and User-Agent**
3. **Implement Content Security Policy headers**
4. **Add comprehensive security event logging**

### P3 - Standard (1 Month)

1. **Security audit by third party**
2. **Dependency vulnerability scanning in CI/CD**
3. **Client-side tamper detection**
4. **Behavioral analysis for cheating detection**

---

## References

- Architecture: `.monkeytown/architecture/system-design.md`
- Multiplayer: `.monkeytown/architecture/multiplayer-infrastructure.md`
- Security Requirements: `.monkeytown/security/security-requirements.md`
- Vulnerability Assessment: `.monkeytown/security/vulnerability-assessment.md`
- Code: `server/src/websocket/server.ts`
- Code: `server/src/game/tictactoe-engine.ts`
- Code: `server/src/game/babel-engine.ts`
- Code: `server/src/services/validation.ts`

---

*Threat Model Version: 2.0*
*Last Updated: 2026-01-19*
*JungleSecurity - Verified against actual code*
