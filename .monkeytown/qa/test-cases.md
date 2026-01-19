# Monkeytown Test Cases v2.0

**Comprehensive test cases for all system components**

**Version:** 2.0
**Date:** 2026-01-19
**Agent:** JungleSecurity

---

## Authentication Tests

### TC-AUTH-001: Valid Token Authentication

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-001 |
| Category | Authentication |
| Priority | Critical |
| Preconditions | JWT_SECRET configured, test token generator available |
| Location | `server/src/websocket/server.ts:59-73` |

**Steps:**
1. Generate a valid JWT token with playerId
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
| Preconditions | Token generator available |

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
| Location | `server/src/websocket/server.ts:221-225` |

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

### TC-AUTH-005: Hardcoded Secret Rejection (NEW)

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-005 |
| Category | Authentication |
| Priority | Critical |
| Location | `server/src/websocket/server.ts:223` |

**Steps:**
1. Set NODE_ENV=production
2. Do NOT set JWT_SECRET
3. Attempt to start server

**Expected Result:**
- Server fails to start
- Error: "JWT_SECRET environment variable is required for production"

---

## WebSocket Tests

### TC-WS-001: Connection Rate Limiting (NEW)

| Field | Value |
|-------|-------|
| Test ID | TC-WS-001 |
| Category | WebSocket |
| Priority | Critical |
| Location | `server/src/websocket/server.ts` |

**Steps:**
1. Implement rate limiting (P1 requirement)
2. Send 15 game:action messages within 1 second
3. Observe response to messages 11-15

**Expected Result:**
- First 10 messages processed
- Messages 11-15 rejected with rate limit error
- No server crash or resource exhaustion

---

### TC-WS-002: Chat Message Sanitization (NEW)

| Field | Value |
|-------|-------|
| Test ID | TC-WS-002 |
| Category | WebSocket |
| Priority | Critical |
| Location | `server/src/websocket/server.ts:174-201` |

**Steps:**
1. Implement chat sanitization (P1 requirement)
2. Send chat message: `<script>alert('xss')</script>`
3. Observe message processing and broadcast

**Expected Result:**
- Message rejected OR sanitized
- Script tag removed
- No JavaScript execution possible in receiving clients

---

### TC-WS-003: Chat Message Length Limit

| Field | Value |
|-------|-------|
| Test ID | TC-WS-003 |
| Category | WebSocket |
| Priority | High |
| Location | `server/src/services/validation.ts:144-158` |

**Steps:**
1. Send message longer than 500 characters
2. Observe result

**Expected Result:**
- Message rejected
- Error: "Message too long"

---

### TC-WS-004: Heartbeat Functionality

| Field | Value |
|-------|-------|
| Test ID | TC-WS-004 |
| Category | WebSocket |
| Priority | Medium |
| Location | `server/src/websocket/server.ts:216-218` |

**Steps:**
1. Establish WebSocket connection
2. Send heartbeat message
3. Observe response

**Expected Result:**
- Heartbeat acknowledged
- Round-trip time measured

---

## Game Action Tests

### TC-GAME-001: Valid TicTacToe Move

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-001 |
| Category | Game Action |
| Priority | Critical |
| Location | `server/src/game/tictactoe-engine.ts:135-148` |

**Steps:**
1. Start TicTacToe game
2. Send valid move: { type: 'place', row: 0, col: 0 }
3. Verify board update

**Expected Result:**
- Move accepted
- Position updated in game state
- Turn passed to other player

---

### TC-GAME-002: Invalid TicTacToe Move Position

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-002 |
| Category | Game Action |
| Priority | Critical |
| Location | `server/src/game/tictactoe-engine.ts:141-143` |

**Steps:**
1. Start TicTacToe game
2. Send move with position outside 0-2 range: { type: 'place', row: 5, col: 5 }
3. Observe result

**Expected Result:**
- Move rejected
- Error: "Invalid position"
- Position unchanged

---

### TC-GAME-003: Occupied Cell Rejection

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-003 |
| Category | Game Action |
| Priority | High |
| Location | `server/src/game/tictactoe-engine.ts:146-148` |

**Steps:**
1. Start TicTacToe game
2. Player 1 places X at (0, 0)
3. Player 2 attempts to place O at (0, 0)
4. Observe result

**Expected Result:**
- Second move rejected
- Error: "Cell is already occupied"
- Board unchanged

---

### TC-GAME-004: Babel Card Play Validation

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-004 |
| Category | Game Action |
| Priority | Critical |
| Location | `server/src/game/babel-engine.ts` |

**Steps:**
1. Start Babel game
2. Attempt to play another player's card
3. Observe result

**Expected Result:**
- Action rejected
- Error: "Card not in hand"

---

### TC-GAME-005: Babel Action Cooldown (NEW)

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-005 |
| Category | Game Action |
| Priority | Critical |
| Location | `server/src/game/server.ts` |

**Steps:**
1. Implement action cooldown (P1 requirement)
2. Send 5 card play actions within 100ms
3. Observe result

**Expected Result:**
- First action processed
- Actions 2-5 rejected with cooldown error
- No state corruption

---

### TC-GAME-006: Not Your Turn Rejection

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-006 |
| Category | Game Action |
| Priority | High |

**Steps:**
1. Start game with 2 players
2. Player 1 makes valid move
3. Player 1 immediately attempts another move
4. Observe result

**Expected Result:**
- Second move rejected
- Error: "Not your turn"

---

## Game Session Tests

### TC-SESSION-001: Create Game Session

| Field | Value |
|-------|-------|
| Test ID | TC-SESSION-001 |
| Category | Game Session |
| Priority | Critical |

**Steps:**
1. Send WebSocket message: { type: 'game:create', config: { gameType: 'tictactoe' } }
2. Receive response
3. Verify session created

**Expected Result:**
- Response: { type: 'game:created', gameId: "uuid" }
- Session status: 'waiting'
- Creator added as player

---

### TC-SESSION-002: Join Existing Game

| Field | Value |
|-------|-------|
| Test ID | TC-SESSION-002 |
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

---

### TC-SESSION-003: Game Full Rejection

| Field | Value |
|-------|-------|
| Test ID | TC-SESSION-003 |
| Category | Game Session |
| Priority | High |

**Steps:**
1. Create game with maxPlayers: 2
2. Add 2 players
3. Attempt 3rd player to join

**Expected Result:**
- Join rejected
- Error: "Game session is full"

---

## Security Tests

### TC-SEC-001: SQL Injection Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-001 |
| Category | Security |
| Priority | Critical |

**Steps:**
1. Send player name: `'; DROP TABLE players; --`
2. Attempt to create/update player

**Expected Result:**
- Input sanitized/rejected
- No database error exposed
- Safe error message returned

---

### TC-SEC-002: Brute Force Protection

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-002 |
| Category | Security |
| Priority | High |

**Steps:**
1. Attempt 15 failed authentication requests from same IP
2. Observe response

**Expected Result:**
- After 10 failures, rate limiting activates
- Subsequent requests blocked
- Error: "Too many attempts"

---

### TC-SEC-003: Token Replay Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-003 |
| Category | Security |
| Priority | High |

**Steps:**
1. Use valid token from previous session with different IP
2. Attempt to connect

**Expected Result:**
- Token rejected (IP mismatch)
- No unauthorized access

---

### TC-SEC-004: Session Hijacking Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-004 |
| Category | Security |
| Priority | Critical |

**Steps:**
1. Player A authenticates
2. Attacker copies token (simulated)
3. Attacker attempts to use token from different IP

**Expected Result:**
- Attack fails (IP/User-Agent mismatch)
- Legitimate session remains valid
- Security alert generated

---

### TC-SEC-005: Command Injection Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-005 |
| Category | Security |
| Priority | Critical |

**Steps:**
1. Send game action with injection attempt
2. Observe result

**Expected Result:**
- Input rejected at validation
- No system command execution
- Safe error returned

---

## Edge Case Tests

### TC-EDGE-001: Simultaneous Disconnect/Reconnect

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-001 |
| Category | Edge Case |
| Priority | Medium |

**Steps:**
1. Player loses network connection
2. Player immediately reconnects (different network)
3. Verify behavior

**Expected Result:**
- Old connection cleaned up
- New connection established
- No duplicate state

---

### TC-EDGE-002: Invalid Message Format

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-002 |
| Category | Edge Case |
| Priority | High |

**Steps:**
1. Send malformed message: { type: undefined }
2. Send non-JSON message
3. Send message with wrong structure

**Expected Result:**
- Messages rejected gracefully
- No server crash
- Client receives error

---

## Test Case Summary

| Category | Critical | High | Medium | Total |
|----------|----------|------|--------|-------|
| Authentication | 5 | 0 | 0 | 5 |
| WebSocket | 2 | 1 | 1 | 4 |
| Game Action | 4 | 2 | 0 | 6 |
| Game Session | 1 | 1 | 0 | 2 |
| Security | 3 | 1 | 0 | 4 |
| Edge Case | 0 | 1 | 1 | 2 |
| **Total** | **15** | **6** | **2** | **23** |

---

*Test Cases Version: 2.0*
*Last Updated: 2026-01-19*
*JungleSecurity - Based on verified code and P1 requirements*
