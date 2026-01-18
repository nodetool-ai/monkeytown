# Monkeytown Threat Model

**Security analysis for AI-powered multiplayer game platform**

---

## Executive Summary

This threat model identifies potential security risks in the Monkeytown multiplayer game platform. The system consists of a Next.js frontend, Node.js backend with WebSocket support, Redis for real-time state, and PostgreSQL for persistence. Analysis reveals critical attack surfaces in WebSocket communication, player input validation, and authentication mechanisms.

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
│  │  │  - DDoS protection                                          │  │   │
│  │  │  - Request validation                                       │  │   │
│  │  │  - SSL termination                                          │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        APPLICATION LAYER                             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐    │   │
│  │  │   Web App   │  │  Game Srv   │  │     Event Stream        │    │   │
│  │  │  (Next.js)  │  │  (Express)  │  │      (Socket.IO)        │    │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘    │   │
│  │         │                  │                      │                 │   │
│  │         │        ┌─────────┴─────────┐          │                 │   │
│  │         │        ▼                   ▼          │                 │   │
│  │         │  ┌──────────┐       ┌──────────┐      │                 │   │
│  │         │  │  Redis   │       │ Postgres │      │                 │   │
│  │         │  └──────────┘       └──────────┘      │                 │   │
│  └─────────┴────────────────────────────────────────┘                 │   │
│                                    │                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        DATA LAYER                                    │   │
│  │  ┌─────────────┐  ┌────────────────────────────────────────────┐   │   │
│  │  │  Redis      │  │           PostgreSQL                        │   │   │
│  │  │  (Session)  │  │  (Players, Games, Agent Behaviors)          │   │   │
│  │  └─────────────┘  └────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        EXTERNAL SERVICES                             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐    │   │
│  │  │   OAuth     │  │   MiniMax   │  │     Monitoring          │    │   │
│  │  │   Providers │  │   API       │  │     (Sentry)            │    │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Assets

| Asset | Description | Sensitivity |
|-------|-------------|-------------|
| Player credentials | OAuth tokens, session IDs | Critical |
| JWT tokens | Authentication tokens for WebSocket | Critical |
| Game state | Real-time player positions, scores | High |
| Player PII | Username, avatar, gameplay history | Medium |
| Agent behaviors | AI decision models and personalities | High |
| Session data | In-progress game sessions | High |
| Rate limit counters | Redis-based rate limiting state | Low |

---

## Threat Actors

| Actor | Motivation | Capability |
|-------|------------|------------|
| Script Kiddie | Disruption, vandalism | Basic |
| Organized Attackers | Financial gain, data theft | Advanced |
| Cheating Players | Competitive advantage | Medium |
| Griefers | Harassment, disruption | Basic |
| Nation States | Large-scale disruption | Sophisticated |
| Insiders | Data theft, sabotage | Variable |

---

## Attack Surface Analysis

### 1. WebSocket Attack Surface (CRITICAL)

**Entry Points:**
- `game:join` - Join game sessions
- `game:leave` - Leave game sessions
- `game:input` - Submit player actions
- `game:chat` - Send chat messages
- `heartbeat` - Connection keepalive

**Threats:**

| ID | Threat | Severity | Likelihood |
|----|--------|----------|------------|
| WS-01 | WebSocket hijacking via token theft | Critical | Medium |
| WS-02 | Mass connection exhaustion (DoS) | High | High |
| WS-03 | Input injection via game:input | Critical | Medium |
| WS-04 | Chat message injection (XSS) | High | Medium |
| WS-05 | Protocol downgrade attacks | Medium | Low |
| WS-06 | Cross-site WebSocket hijacking | High | Medium |

**Attack Vectors:**

```
Player Browser                      Attacker
    │                                  │
    │  1. Legitimate WebSocket         │
    │◄─────────────────────────────────│
    │    CONNECT /ws token=XXX         │
    │                                  │
    │  2. Attacker's malicious script  │
    │◄─────────────────────────────────│
    │    WebSocket('wss://game',       │
    │      token stolen from cookie)   │
    │                                  │
    │  3. Attacker controls game input │
    │◄─────────────────────────────────│
    │    {type: 'game:input', data:   │
    │      {action: 'MOVE_HACK'}}      │
```

### 2. HTTP API Attack Surface (HIGH)

**Endpoints:**
- `POST /api/games/create` - Create new game
- `POST /api/games/:id/join` - Join existing game
- `GET /api/players/:id` - Get player info
- `GET /api/leaderboard` - Get rankings

**Threats:**

| ID | Threat | Severity | Likelihood |
|----|--------|----------|------------|
| API-01 | SQL injection via player parameters | Critical | Low |
| API-02 | Mass game creation (resource exhaustion) | Medium | High |
| API-03 | Player enumeration via ID guessing | Low | High |
| API-04 | Rate limit bypass via IP rotation | Medium | Medium |

### 3. Authentication Attack Surface (CRITICAL)

**Current Implementation:**
```typescript
// From server/src/websocket/server.ts:35-46
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

**Issues Identified:**
- Token passed in `auth.token` (visible in memory)
- No token expiration validation
- No refresh token mechanism
- Hardcoded fallback secret: `process.env.JWT_SECRET || 'dev-secret'`

| ID | Threat | Severity | Likelihood |
|----|--------|----------|------------|
| AUTH-01 | JWT secret exposure in code | Critical | Low |
| AUTH-02 | Token replay attacks | High | Medium |
| AUTH-03 | Token hijacking via XSS | Critical | Medium |
| AUTH-04 | Session fixation | Medium | Low |

### 4. Redis Attack Surface (MEDIUM)

**Current Usage:**
- Session caching with 1-hour TTL
- Player state with 5-minute TTL
- Rate limiting with 1-minute TTL
- Pub/Sub for event distribution

**Threats:**

| ID | Threat | Severity | Likelihood |
|----|--------|----------|------------|
| REDIS-01 | Redis injection via session keys | High | Low |
| REDIS-02 | Session hijacking via cache access | High | Medium |
| REDIS-03 | Rate limit bypass via key collision | Low | Medium |

### 5. Game Logic Attack Surface (HIGH)

**Attack Vectors:**

```
Game Entity Manipulation:
┌─────────────────────────────────────────────────────────────┐
│  Player sends: {type: 'game:input', data: {action: 'MOVE', │
│    position: {x: 9999, y: 9999}}}                           │
│                                                              │
│  Server processes:                                          │
│  1. Validates player session ✓                              │
│  2. Applies movement to game state ✗ (no bounds check)      │
│  3. Broadcasts update                                       │
│                                                              │
│  Result: Player teleports outside game boundaries           │
└─────────────────────────────────────────────────────────────┘
```

| ID | Threat | Severity | Likelihood |
|----|--------|----------|------------|
| GAME-01 | Position teleportation (bounds bypass) | High | High |
| GAME-02 | Speed hacking (action spam) | High | High |
| GAME-03 | Score manipulation | Medium | Medium |
| GAME-04 | Game state injection | Critical | Low |
| GAME-05 | AI behavior manipulation | High | Low |

---

## Data Flow Threat Analysis

### 1. Player Connection Flow

```
Player Browser                                    Attacker
    │                                                 │
    │ 1. Open WebSocket connection                    │
    │────────────────────────────────────────────────►│
    │  handshake with token                           │
    │                                                 │
    │ 2. JS bundle loads                              │
    │◄────────────────────────────────────────────────│
    │  (token in memory, vulnerable to XSS)           │
    │                                                 │
    │ 3. Authenticate with JWT                        │
    │────────────────────────────────────────────────►│
    │                                                 │
    │ 4. Game session created                         │
    │◄────────────────────────────────────────────────│
    │                                                 │
    │                                                 │ 5. XSS steals token from memory
    │                                                 │◄───────────────────────────────
    │                                                 │  document.cookie or memory read
    │                                                 │
    │                                                 │ 6. Attacker creates parallel connection
    │                                                 │────────────────────────────────►
    │                                                 │  Hijacked session active
```

**Threats:**
- XSS allows token theft (WS-06, AUTH-03)
- No session binding to IP/User-Agent
- Token valid until expiration (no revocation)

### 2. Game Event Flow

```
Player A                                          Attacker
    │                                                 │
    │ 1. Send input {action: 'PLAY_CARD',             │
    │    cardId: 'card_123'}                          │
    │────────────────────────────────────────────────►│
    │                                                 │
    │ 2. Server validates                             │
    │   - Player in session ✓                         │
    │   - Token valid ✓                               │
    │   - BUT: No game rule validation ✗              │
    │                                                 │
    │ 3. Process input                                │
    │   - Update game state                           │
    │   - Broadcast to all players                    │
    │                                                 │
    │                                                 │ 4. Craft malicious input
    │                                                 │────────────────────────────────►
    │                                                 │ {action: 'PLAY_CARD', cardId:
    │                                                 │  'ANY_CARD_FROM_DECK'}
```

**Threats:**
- No validation that player actually has the card (GAME-04)
- No action cooldown enforcement (GAME-02)
- Race conditions in state updates

---

## Attack Trees

### Attack Tree 1: Game Account Compromise

```
OR: Achieve player account compromise
│
├── OR: Token theft via XSS
│   ├── Leaf: Stored XSS in chat (likelihood: medium)
│   ├── Leaf: Reflected XSS in game parameters (likelihood: medium)
│   └── Leaf: DOM injection via compromised JS bundle (likelihood: low)
│
├── OR: Brute force authentication
│   ├── Leaf: JWT secret brute force (likelihood: low)
│   └── Leaf: OAuth token prediction (likelihood: very low)
│
└── OR: Social engineering
    ├── Leaf: Phishing for OAuth credentials (likelihood: medium)
    └── Leaf: Session hijacking via MITM (likelihood: low, SSL pinned)
```

### Attack Tree 2: Denial of Service

```
OR: Make game unavailable
│
├── OR: Connection exhaustion
│   ├── Leaf: WebSocket connection flood (likelihood: high)
│   │   └── Mitigated by: rate limiting per IP
│   └── Leaf: HTTP request flood (likelihood: high)
│       └── Mitigated by: load balancer, CDN
│
├── OR: Resource exhaustion
│   ├── Leaf: Game session spam (likelihood: medium)
│   │   └── Mitigated by: rate limiting, auth required
│   └── Leaf: Redis memory exhaustion (likelihood: low)
│       └── Mitigated by: TTL on all keys
│
└── OR: Game logic DoS
    ├── Leaf: Infinite game loops (likelihood: low)
    └── Leaf: Memory leak via game entities (likelihood: medium)
```

### Attack Tree 3: Cheating

```
OR: Gain unfair competitive advantage
│
├── OR: Input manipulation
│   ├── Leaf: Speed hacking (likelihood: high)
│   ├── Leaf: Position teleportation (likelihood: high)
│   └── Leaf: Action spam (likelihood: high)
│
├── OR: State manipulation
│   ├── Leaf: Score modification (likelihood: medium)
│   ├── Leaf: Card manipulation (likelihood: medium)
│   └── Leaf: Entity creation (likelihood: low)
│
└── OR: Information disclosure
    ├── Leaf: Peek at other players' hands (likelihood: medium)
    └── Leaf: See hidden AI strategies (likelihood: low)
```

---

## Risk Matrix

| Threat | Severity | Likelihood | Risk Score | Mitigation Priority |
|--------|----------|------------|------------|---------------------|
| WS-01: WebSocket hijacking | Critical | Medium | 12 | P1 |
| WS-03: Input injection | Critical | Medium | 12 | P1 |
| AUTH-01: JWT secret exposure | Critical | Low | 9 | P2 |
| AUTH-03: Token hijacking via XSS | Critical | Medium | 12 | P1 |
| GAME-01: Position teleportation | High | High | 16 | P1 |
| GAME-02: Speed hacking | High | High | 16 | P1 |
| GAME-04: Game state injection | Critical | Low | 9 | P2 |
| WS-02: Connection exhaustion | High | High | 16 | P1 |
| API-01: SQL injection | Critical | Low | 9 | P2 |
| WS-04: Chat XSS | High | Medium | 12 | P1 |

**Risk Score = Severity × Likelihood (1-4 scale)**

---

## Security Controls Summary

### Existing Controls

| Control | Location | Effectiveness |
|---------|----------|---------------|
| JWT authentication | server/src/websocket/server.ts:35-46 | Partial |
| Rate limiting | server/src/services/redis.ts:75-85 | Partial |
| CORS configuration | server/src/websocket/server.ts:17-21 | Good |
| Session management | server/src/game/session.ts | Partial |
| Input validation | server/src/game/session.ts:28-38 | Insufficient |
| SSL/TLS | Nginx/Load Balancer | Good |

### Required Controls

| Control | Priority | Component |
|---------|----------|-----------|
| Input sanitization (chat, game input) | P1 | EventStream, GameServer |
| Game state validation | P1 | GameEngine |
| Rate limiting per connection | P1 | EventStream |
| XSS protection headers | P1 | Next.js |
| CSP implementation | P1 | Next.js |
| Session binding (IP, fingerprint) | P2 | WebSocket |
| Token rotation/refresh | P2 | Auth |
| Anomaly detection | P2 | GameServer |
| Comprehensive logging | P2 | All components |

---

## Recommendations

### Immediate (P1)

1. **Implement input validation for all game actions**
   - Validate positions are within game bounds
   - Verify player has required resources before actions
   - Enforce action cooldowns server-side

2. **Add rate limiting per WebSocket connection**
   - Limit `game:input` to 10 actions/second
   - Limit `game:chat` to 1 message/second
   - Limit connections per IP to 10

3. **Sanitize all user-generated content**
   - HTML escape chat messages
   - Validate game action data schemas

4. **Implement Content Security Policy**
   ```typescript
   // Next.js middleware or headers
   Content-Security-Policy: default-src 'self'; 
     script-src 'self' 'unsafe-inline';
     connect-src wss: https:;
     img-src data: https:;
   ```

### Short-term (P2)

1. **Strengthen authentication**
   - Implement token refresh mechanism
   - Add session binding to IP and User-Agent
   - Move JWT secret to environment variable

2. **Add anomaly detection**
   - Detect unusual action patterns (speed hacking)
   - Detect impossible position changes
   - Alert on repeated rule violations

3. **Implement comprehensive logging**
   - Log all authentication events
   - Log game rule violations
   - Log rate limit triggers

### Long-term (P3)

1. **Security audit**
   - Third-party penetration test
   - Dependency vulnerability scan
   - Code review for security issues

2. **Advanced protections**
   - WebSocket frame encryption
   - Client-side tamper detection
   - Behavioral analysis for cheating detection

---

## References

- OWASP WebSocket Security Cheat Sheet
- CWE-119: Improper Restriction of Operations within Memory Buffer
- CWE-79: Improper Neutralization of Input During Web Page Generation
- CWE-307: Improper Restriction of Excessive Authentication Attempts

---

*Threat Model Version: 1.0*
*Last Updated: 2026-01-18*
*JungleSecurity - Protecting Monkeytown*
