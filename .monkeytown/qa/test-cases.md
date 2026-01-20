# Monkeytown Test Cases v2.0

**Comprehensive test cases for all system components with security focus**

**Quality Analyst:** JungleSecurity  
**Version:** 2.0  
**Date:** 2026-01-20

---

## Security Test Cases (Priority 1)

### TC-SEC-001: Hardcoded JWT Secret Detection

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-001 |
| Category | Security - Authentication |
| Priority | **Critical** |
| Vulnerability | VULN-001 |
| Preconditions | JWT_SECRET configured in environment |

**Steps:**
1. Read source file: `server/src/websocket/server.ts`
2. Search for pattern: `'dev-secret'` or `"dev-secret"`
3. Verify JWT_SECRET is NOT using fallback

**Expected Result:**
- Pattern NOT found in source code
- `process.env.JWT_SECRET` is accessed without fallback
- Error thrown if JWT_SECRET is not set

**Code Verification:**
```typescript
// GOOD - No fallback
const secret = process.env.JWT_SECRET;
if (!secret) throw new Error('JWT_SECRET required');
jwt.verify(token, secret);

// BAD - Has fallback (VULN-001)
jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
```

---

### TC-SEC-002: JWT Token Forgery Attempt

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-002 |
| Category | Security - Authentication |
| Priority | **Critical** |
| Vulnerability | VULN-001 |

**Steps:**
1. Generate token using known secret 'dev-secret'
2. Attempt to use forged token for WebSocket connection
3. Observe connection result

**Expected Result:**
- Connection REJECTED
- Error: "Authentication failed"
- Attempt logged as security event

---

### TC-SEC-003: Player State Manipulation Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-003 |
| Category | Security - Authorization |
| Priority | **Critical** |
| Vulnerability | VULN-002 |

**Steps:**
1. Authenticate as player-1
2. Send update request for player-1 with position `{x: 999999, y: 999999}`
3. Send update request with score `9999999`
4. Send update request with `isAdmin: true`

**Expected Result:**
- Position update REJECTED (out of bounds)
- Score update REJECTED (exceeds maximum)
- Arbitrary property REJECTED
- All rejections logged

---

### TC-SEC-004: Position Teleportation Detection

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-004 |
| Category | Security - Game Logic |
| Priority | **Critical** |
| Vulnerability | VULN-002 |

**Steps:**
1. Player at position `{x: 0, y: 0}`
2. Send move action to position `{x: 1000, y: 1000}`
3. Max speed is 100 units per action

**Expected Result:**
- Move REJECTED
- Error: "Move speed exceeded" or "Invalid position"
- Attempt flagged as potential cheating

---

### TC-SEC-005: Card Ownership Validation

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-005 |
| Category | Security - Game Logic |
| Priority | **High** |
| Vulnerability | VULN-002 (related) |

**Steps:**
1. Player has cards: ['babel-1', 'babel-2']
2. Send action: `{type: 'play_card', cardId: 'babel-99'}` (not owned)
3. Send action: `{type: 'play_card', cardId: 'babel-1'}` (owned)

**Expected Result:**
- Non-owned card REJECTED
- Owned card ACCEPTED
- Ownership validated before processing

---

### TC-SEC-006: CORS Origin Validation

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-006 |
| Category | Security - Transport |
| Priority | **High** |
| Vulnerability | VULN-003 |

**Steps:**
1. Configure CORS_ORIGINS='http://localhost:3000'
2. Attempt WebSocket connection from origin 'http://evil.com'
3. Attempt WebSocket connection from origin 'http://localhost:3000'

**Expected Result:**
- Connection from evil.com REJECTED
- Connection from localhost:3000 ACCEPTED
- Error message: "Not allowed by CORS"

---

### TC-SEC-007: WebSocket Transport Security

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-007 |
| Category | Security - Transport |
| Priority | **High** |
| Vulnerability | VULN-004 |

**Steps:**
1. Configure Socket.IO with `transports: ['websocket', 'polling']`
2. Attempt connection using HTTP polling transport
3. Verify which transport is used

**Expected Result:**
- HTTP polling transport REJECTED
- Only WebSocket transport ACCEPTED
- Configuration only allows `['websocket']`

---

### TC-SEC-008: Chat XSS Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-008 |
| Category | Security - Input Validation |
| Priority | **High** |
| Vulnerability | VULN-005 |

**Test Cases:**

| Payload | Expected Result |
|---------|-----------------|
| `<script>alert(1)</script>` | REJECTED or SANITIZED |
| `<img src=x onerror=alert(1)>` | REJECTED or SANITIZED |
| `<svg/onload=alert(1)>` | REJECTED or SANITIZED |
| `javascript:alert(1)` | REJECTED or SANITIZED |
| `<body onload=alert(1)>` | REJECTED or SANITIZED |
| `<iframe src="javascript:alert(1)">` | REJECTED or SANITIZED |
| `<object data="javascript:alert(1)">` | REJECTED or SANITIZED |
| `<input onfocus=alert(1) autofocus>` | REJECTED or SANITIZED |

**Verification:**
```typescript
const xssPayloads = [
  '<script>alert(1)</script>',
  '<img src=x onerror=alert(1)>',
  // ... more payloads
];

for (const payload of xssPayloads) {
  const result = sanitizeChat(payload);
  expect(result).not.toContain('script');
  expect(result).not.toContain('onerror');
  expect(result).not.toContain('onload');
  expect(result).not.toContain('javascript:');
}
```

---

### TC-SEC-009: WebSocket Rate Limiting

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-009 |
| Category | Security - Rate Limiting |
| Priority | **High** |
| Vulnerability | VULN-006 |

**Steps:**
1. Establish WebSocket connection
2. Send 11 game actions within 1 second
3. Observe 11th action result

**Expected Result:**
- First 10 actions ACCEPTED
- 11th action REJECTED
- Error: "Rate limit exceeded"

---

### TC-SEC-010: Token Expiration Validation

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-010 |
| Category | Security - Authentication |
| Priority | **Critical** |
| Vulnerability | VULN-007 |

**Steps:**
1. Generate token with expiration in the past
2. Attempt WebSocket connection
3. Observe connection result

**Expected Result:**
- Connection REJECTED
- Error: "Token expired"
- Expired tokens NOT accepted

---

### TC-SEC-011: Session Binding Validation

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-011 |
| Category | Security - Authentication |
| Priority | **High** |
| Vulnerability | VULN-008 |

**Steps:**
1. Generate token with IP "192.168.1.1"
2. Attempt connection from IP "10.0.0.1"
3. Observe connection result

**Expected Result:**
- Connection REJECTED
- Error: "Session context mismatch"
- Token NOT accepted from different IP

---

### TC-SEC-012: Verbose Error Message Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-012 |
| Category | Security - Information Disclosure |
| Priority | **Medium** |

**Steps:**
1. Trigger various error conditions
2. Capture error responses
3. Verify no internal details exposed

**Expected Result:**
- Error messages generic (e.g., "Authentication failed")
- No stack traces exposed
- No internal paths or configurations exposed

---

## Authentication Tests

### TC-AUTH-001: Valid Token Authentication

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-001 |
| Category | Authentication |
| Priority | Critical |

**Steps:**
1. Generate a valid JWT token with playerId, sessionId, IP, User-Agent
2. Connect WebSocket with token in auth property
3. Send heartbeat message

**Expected Result:**
- Connection established successfully
- Heartbeat acknowledgment received
- Player ID associated with connection

---

### TC-AUTH-002: Expired Token Rejection

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-002 |
| Category | Authentication |
| Priority | Critical |

**Steps:**
1. Generate token with exp timestamp in the past (24 hours ago)
2. Attempt WebSocket connection with expired token
3. Observe connection result

**Expected Result:**
- Connection rejected
- Error message: "Authentication failed"
- No connection established

---

### TC-AUTH-003: Invalid Token Signature

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-003 |
| Category | Authentication |
| Priority | Critical |

**Steps:**
1. Create token with invalid signature (wrong secret)
2. Attempt WebSocket connection
3. Observe connection result

**Expected Result:**
- Connection rejected
- Error logged: "Invalid signature"
- No connection established

---

### TC-AUTH-004: Missing Token

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-004 |
| Category | Authentication |
| Priority | Critical |

**Steps:**
1. Attempt WebSocket connection without auth token
2. Observe connection result

**Expected Result:**
- Connection rejected
- Error message: "Authentication required"
- No connection established

---

## Game Session Tests

### TC-GAME-001: Create New Game Session

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-001 |
| Category | Game Session |
| Priority | Critical |
| Preconditions | Authenticated player |

**Steps:**
1. Send WebSocket message: `{ type: 'game:create', config: { maxPlayers: 4, duration: 600 } }`
2. Receive response
3. Verify session created

**Expected Result:**
- Response: `{ type: 'game:created', gameId: "uuid" }`
- Session status: 'waiting'
- Creator added as player
- Game configuration matches request

---

### TC-GAME-002: Join Existing Game

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-002 |
| Category | Game Session |
| Priority | Critical |

**Steps:**
1. Player A creates game session
2. Player B sends join request with gameId
3. Observe both players' views

**Expected Result:**
- Player B added to players list
- Both players receive player_joined event
- Player B's view shows game state
- Max players limit enforced

---

### TC-GAME-003: Game Full Rejection

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-003 |
| Category | Game Session |
| Priority | High |

**Steps:**
1. Create game with maxPlayers: 2
2. Add 2 players
3. Attempt 3rd player to join

**Expected Result:**
- Join rejected
- Error: "Game session is full"
- 3rd player not added

---

## Game Action Tests

### TC-ACTION-001: Valid Move Action

| Field | Value |
|-------|-------|
| Test ID | TC-ACTION-001 |
| Category | Game Action |
| Priority | Critical |
| Preconditions | Active game session |

**Steps:**
1. Player in active game sends: `{ type: 'game:input', action: 'MOVE', position: { x: 100, y: 100 } }`
2. Receive response
3. Verify game state update

**Expected Result:**
- Move accepted
- Position updated in game state
- All players receive state update
- Move within valid bounds

---

### TC-ACTION-002: Invalid Position Rejection

| Field | Value |
|-------|-------|
| Test ID | TC-ACTION-002 |
| Category | Game Action |
| Priority | Critical |

**Steps:**
1. Player sends move to position outside game bounds: `{ x: 99999, y: 99999 }`
2. Observe result

**Expected Result:**
- Move rejected
- Error: "Invalid position"
- Position unchanged
- Event logged for security monitoring

---

### TC-ACTION-003: Speed Hack Detection

| Field | Value |
|-------|-------|
| Test ID | TC-ACTION-003 |
| Category | Game Action |
| Priority | Critical |

**Steps:**
1. Player at position (0, 0)
2. Immediately send move to position (1000, 1000) exceeding maxSpeed
3. Observe result

**Expected Result:**
- Move rejected
- Error: "Move speed exceeded"
- Potential flag raised for speed hacking
- Multiple rejections may trigger account review

---

## WebSocket Tests

### TC-WS-001: Connection Rate Limiting

| Field | Value |
|-------|-------|
| Test ID | TC-WS-001 |
| Category | WebSocket |
| Priority | High |

**Steps:**
1. Attempt 11 WebSocket connections from same IP within 1 minute
2. Observe 11th connection result

**Expected Result:**
- First 10 connections succeed
- 11th connection rejected
- Error: "Rate limit exceeded"
- IP may be temporarily blocked

---

### TC-WS-002: Message Rate Limiting

| Field | Value |
|-------|-------|
| Test ID | TC-WS-002 |
| Category | WebSocket |
| Priority | High |

**Steps:**
1. Send 11 game:input messages within 1 second
2. Observe response to 11th message

**Expected Result:**
- First 10 messages processed
- 11th message rejected
- Error: "Rate limit exceeded"

---

### TC-WS-003: Heartbeat Functionality

| Field | Value |
|-------|-------|
| Test ID | TC-WS-003 |
| Category | WebSocket |
| Priority | Medium |

**Steps:**
1. Establish WebSocket connection
2. Wait 20 seconds without activity
3. Send heartbeat message
4. Observe response

**Expected Result:**
- Heartbeat acknowledged
- Connection timeout reset
- Round-trip time measured

---

## Chat Tests

### TC-CHAT-001: Valid Message Send

| Field | Value |
|-------|-------|
| Test ID | TC-CHAT-001 |
| Category | Chat |
| Priority | High |
| Preconditions | Active game session with chat enabled |

**Steps:**
1. Send chat message: "Hello everyone!"
2. Observe message delivery

**Expected Result:**
- Message broadcast to all players
- Sender attribution correct
- Timestamp included
- Message length within limits

---

### TC-CHAT-002: XSS Payload Blocked

| Field | Value |
|-------|-------|
| Test ID | TC-CHAT-002 |
| Category | Chat |
| Priority | **Critical** |

**Steps:**
1. Send chat message: `<script>alert('xss')</script>`
2. Observe message processing

**Expected Result:**
- Message REJECTED or SANITIZED
- Script tags REMOVED or BLOCKED
- No JavaScript execution possible
- Security event logged

---

## Performance Tests

### TC-PERF-001: Concurrent Player Limit

| Field | Value |
|-------|-------|
| Test ID | TC-PERF-001 |
| Category | Performance |
| Priority | High |

**Steps:**
1. Create game with maxPlayers: 100
2. Add 100 players
3. Verify all added successfully

**Expected Result:**
- All 100 players added
- Response time < 1 second
- No state corruption

---

### TC-PERF-002: State Broadcast Latency

| Field | Value |
|-------|-------|
| Test ID | TC-PERF-002 |
| Category | Performance |
| Priority | High |

**Steps:**
1. Create game with 4 players
2. Player 1 sends action
3. Measure time until all other players receive update

**Expected Result:**
- All players receive update within 100ms
- No dropped messages
- Order preserved

---

## Test Case Summary

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Security - Authentication | 4 | 2 | 0 | 0 | 6 |
| Security - Authorization | 2 | 0 | 0 | 0 | 2 |
| Security - Transport | 0 | 3 | 0 | 0 | 3 |
| Security - Input Validation | 1 | 2 | 0 | 0 | 3 |
| Security - Rate Limiting | 0 | 1 | 0 | 0 | 1 |
| Authentication | 4 | 0 | 0 | 0 | 4 |
| Game Session | 1 | 1 | 0 | 0 | 2 |
| Game Action | 3 | 0 | 0 | 0 | 3 |
| WebSocket | 0 | 2 | 1 | 0 | 3 |
| Chat | 1 | 1 | 0 | 0 | 2 |
| Performance | 0 | 2 | 0 | 0 | 2 |
| **Total** | **16** | **14** | **1** | **0** | **31** |

---

*Test Cases Version: 2.0*  
*Last Updated: 2026-01-20*  
*JungleSecurity - Comprehensive security testing for confirmed vulnerabilities*
