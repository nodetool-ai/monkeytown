# Monkeytown Test Cases

**Comprehensive test cases for all system components**

---

## Authentication Tests

### TC-AUTH-001: Valid Token Authentication

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-001 |
| Category | Authentication |
| Priority | Critical |
| Preconditions | JWT_SECRET configured, test token generator available |

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

### TC-AUTH-005: Session Binding Validation

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-005 |
| Category | Authentication |
| Priority | High |

**Steps:**
1. Generate token with IP "192.168.1.1"
2. Connect from IP "10.0.0.1"
3. Observe connection result

**Expected Result:**
- Connection rejected
- Error: "Session context mismatch"
- Token validation fails despite valid signature

---

### TC-AUTH-006: Concurrent Session Limit

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-006 |
| Category | Authentication |
| Priority | Medium |

**Steps:**
1. Create 3 sessions for player (max allowed)
2. Attempt to create 4th session
3. Observe result

**Expected Result:**
- 4th session creation rejected
- Error: "Maximum concurrent sessions reached"
- Existing sessions remain active

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
1. Send WebSocket message: { type: 'game:create', config: { maxPlayers: 4, duration: 600 } }
2. Receive response
3. Verify session created

**Expected Result:**
- Response: { type: 'game:created', gameId: "uuid" }
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

### TC-GAME-004: Leave Game Session

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-004 |
| Category | Game Session |
| Priority | High |

**Steps:**
1. Player joins game session
2. Player sends leave request
3. Observe game state and other players

**Expected Result:**
- Player removed from players list
- Other players receive player_left event
- Game continues if players remain
- Leaving player receives confirmation

---

### TC-GAME-005: Game Session Expiration

| Field | Value |
|-------|-------|
| Test ID | TC-GAME-005 |
| Category | Game Session |
| Priority | Medium |

**Steps:**
1. Create game session
2. Wait for inactivity timeout (30 minutes)
3. Attempt action on session

**Expected Result:**
- Session marked as expired
- Actions rejected
- Error: "Session expired"

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
1. Player in active game sends: { type: 'game:input', action: 'MOVE', position: { x: 100, y: 100 } }
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
1. Player sends move to position outside game bounds: { x: 99999, y: 99999 }
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

### TC-ACTION-004: Action Cooldown Enforcement

| Field | Value |
|-------|-------|
| Test ID | TC-ACTION-004 |
| Category | Game Action |
| Priority | High |

**Steps:**
1. Configure minActionInterval: 500ms
2. Send valid action
3. Immediately send another action (within 500ms)
4. Observe result

**Expected Result:**
- Second action rejected
- Error: "Action cooldown active"
- Cooldown timer included in response

---

### TC-ACTION-005: Unauthorized Action Rejection

| Field | Value |
|-------|-------|
| Test ID | TC-ACTION-005 |
| Category | Game Action |
| Priority | Critical |

**Steps:**
1. Player A in Game 1 sends action for Player B's character
2. Or player not in session sends action
3. Observe result

**Expected Result:**
- Action rejected
- Error: "Unauthorized"
- Security event logged

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

### TC-WS-004: Connection Recovery

| Field | Value |
|-------|-------|
| Test ID | TC-WS-004 |
| Category | WebSocket |
| Priority | High |

**Steps:**
1. Establish connection, authenticate
2. Simulate network disconnect (30 seconds)
3. Reconnect with same token
4. Verify session state

**Expected Result:**
- Reconnection succeeds
- Game state restored
- No duplicate actions
- Other players notified of reconnection

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
| Priority | Critical |

**Steps:**
1. Send chat message: "<script>alert('xss')</script>"
2. Observe message processing

**Expected Result:**
- Message rejected OR sanitized
- HTML entities escaped
- Script tags removed
- No JavaScript execution possible

---

### TC-CHAT-003: Excessive Message Rate

| Field | Value |
|-------|-------|
| Test ID | TC-CHAT-003 |
| Category | Chat |
| Priority | High |

**Steps:**
1. Send 5 chat messages within 1 second
2. Observe result

**Expected Result:**
- First 2 messages processed
- Subsequent messages rejected
- Rate limit error returned

---

### TC-CHAT-004: Long Message Truncation

| Field | Value |
|-------|-------|
| Test ID | TC-CHAT-004 |
| Category | Chat |
| Priority | Medium |

**Steps:**
1. Send message longer than 500 characters
2. Observe result

**Expected Result:**
- Message truncated to 500 characters
- No error thrown
- Remaining content discarded

---

## Security Tests

### TC-SEC-001: SQL Injection Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-001 |
| Category | Security |
| Priority | Critical |

**Steps:**
1. Send player name: "'; DROP TABLE players; --"
2. Attempt to create player

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
- Temporary IP block

---

### TC-SEC-003: Token Replay Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-003 |
| Category | Security |
| Priority | High |

**Steps:**
1. Use valid token from previous session
2. Attempt to connect

**Expected Result:**
- Token rejected (context mismatch)
- No unauthorized access
- Security event logged

---

### TC-SEC-004: Session Hijacking Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-004 |
| Category | Security |
| Priority | Critical |

**Steps:**
1. Player A authenticates
2. Attacker copies token (via XSS or MITM)
3. Attacker attempts to use token

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
1. Send game action with injection: { command: "move; rm -rf /" }
2. Observe result

**Expected Result:**
- Input rejected at validation
- No system command execution
- Safe error returned

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

### TC-PERF-003: Large Game Session Handling

| Field | Value |
|-------|-------|
| Test ID | TC-PERF-003 |
| Category | Performance |
| Priority | Medium |

**Steps:**
1. Create game with 50 players
2. Run continuous activity for 5 minutes
3. Monitor system resources

**Expected Result:**
- No memory leaks
- CPU usage stable
- No dropped connections
- Response times consistent

---

### TC-PERF-004: Reconnection Under Load

| Field | Value |
|-------|-------|
| Test ID | TC-PERF-004 |
| Category | Performance |
| Priority | Medium |

**Steps:**
1. Create busy game (10+ players, high activity)
2. Disconnect and reconnect player
3. Measure reconnection time

**Expected Result:**
- Reconnection within 2 seconds
- State restored correctly
- No impact on other players

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
- Other players see single reconnection

---

### TC-EDGE-002: Last Player Leaves Active Game

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-002 |
| Category | Edge Case |
| Priority | High |

**Steps:**
1. Create game with 2 players
2. Both players leave
3. Observe game state

**Expected Result:**
- Game marked as completed
- Resources cleaned up
- No dangling sessions
- Proper cleanup timeout

---

### TC-EDGE-003: Invalid Message Format

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-003 |
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
- Connection maintained (if possible)

---

### TC-EDGE-004: Rapid Session Creation/Deletion

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-004 |
| Category | Edge Case |
| Priority | Medium |

**Steps:**
1. Create game session
2. Immediately delete it
3. Repeat 10 times rapidly

**Expected Result:**
- All operations succeed
- No resource leaks
- No orphaned sessions

---

### TC-EDGE-005: Unicode and Emoji Support

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-005 |
| Category | Edge Case |
| Priority | Low |

**Steps:**
1. Send chat message with emojis: "Hello 🐒🎮"
2. Send player name with unicode: "玩家"
3. Send game action with unicode data

**Expected Result:**
- All unicode handled correctly
- No encoding errors
- Display works properly
- Security sanitization applied

---

## Test Case Summary

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Authentication | 4 | 1 | 1 | 0 | 6 |
| Game Session | 2 | 2 | 1 | 0 | 5 |
| Game Action | 3 | 1 | 0 | 0 | 4 |
| WebSocket | 0 | 3 | 1 | 0 | 4 |
| Chat | 1 | 2 | 1 | 0 | 4 |
| Security | 3 | 2 | 0 | 0 | 5 |
| Performance | 0 | 3 | 3 | 0 | 6 |
| Edge Case | 0 | 2 | 3 | 1 | 6 |
| **Total** | **13** | **16** | **10** | **1** | **40** |

---

*Test Cases Version: 1.0*
*Last Updated: 2026-01-18*
*JungleSecurity - Testing everything, trusting nothing*
