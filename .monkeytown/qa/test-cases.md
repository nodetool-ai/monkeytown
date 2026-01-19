# Monkeytown Test Cases v2.1

**Comprehensive test cases for all system components**

**Version:** 2.1
**Date:** 2026-01-19
**QA Lead:** JungleSecurity
**Status:** ACTIVE

---

## Test Case Summary

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Authentication | 4 | 1 | 1 | 0 | 6 |
| Game Session | 2 | 2 | 1 | 0 | 5 |
| Game Action | 4 | 1 | 0 | 0 | 5 |
| WebSocket | 1 | 3 | 1 | 0 | 5 |
| Chat | 1 | 2 | 1 | 0 | 4 |
| Security | 5 | 2 | 0 | 0 | 7 |
| Performance | 0 | 3 | 3 | 0 | 6 |
| Edge Case | 0 | 2 | 3 | 1 | 6 |
| **Total** | **17** | **16** | **10** | **1** | **44** |

---

## Authentication Tests

### TC-AUTH-001: Valid Token Authentication

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-001 |
| Category | Authentication |
| Priority | **Critical** |
| Preconditions | JWT_SECRET configured, test token generator available |

**Steps:**
1. Generate a valid JWT token with playerId, sessionId, IP, User-Agent
2. Connect WebSocket with token in auth property
3. Send heartbeat message

**Expected Result:**
- Connection established successfully
- Heartbeat acknowledgment received
- Player ID associated with connection

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-AUTH-002: Expired Token Rejection

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-002 |
| Category | Authentication |
| Priority | **Critical** |
| Preconditions | Token generator available |

**Steps:**
1. Generate token with exp timestamp in the past (24 hours ago)
2. Attempt WebSocket connection with expired token
3. Observe connection result

**Expected Result:**
- Connection rejected
- Error message: "Token validation failed"
- No connection established

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-AUTH-003: Invalid Token Signature

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-003 |
| Category | Authentication |
| Priority | **Critical** |

**Steps:**
1. Create token with invalid signature (wrong secret: 'dev-secret')
2. Attempt WebSocket connection
3. Observe connection result

**Expected Result:**
- Connection rejected
- Error logged: "Token validation failed"
- No connection established

**Status:** **IMPLEMENTED**
**Automated:** Yes
**Security Relevant:** Yes - Tests VULN-001

---

### TC-AUTH-004: Missing Token

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-004 |
| Category | Authentication |
| Priority | **Critical** |

**Steps:**
1. Attempt WebSocket connection without auth token
2. Observe connection result

**Expected Result:**
- Connection rejected
- Error message: "Authentication required"
- No connection established

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-AUTH-005: Session Binding Validation

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-005 |
| Category | Authentication |
| Priority | **High** |
| Security Relevant | Yes |

**Steps:**
1. Generate token with IP "192.168.1.1"
2. Connect from IP "10.0.0.1"
3. Observe connection result

**Expected Result:**
- Connection rejected
- Error: "Session context mismatch" or "Token validation failed"
- Token validation fails despite valid signature

**Status:** **IMPLEMENTED**
**Automated:** Yes
**Security Relevant:** Yes - Tests AUTH-002

---

### TC-AUTH-006: Hardcoded Secret Rejection

| Field | Value |
|-------|-------|
| Test ID | TC-AUTH-006 |
| Category | Authentication |
| Priority | **Critical** |
| Security Relevant | Yes |

**Steps:**
1. Generate token using 'dev-secret' as JWT secret
2. Attempt WebSocket connection
3. Observe result (server should reject and not accept 'dev-secret')

**Expected Result:**
- Connection rejected
- Server does not use hardcoded fallback
- Error logged: "Token validation failed"

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes - Tests VULN-001

---

## Game Action Tests

### TC-ACTION-001: Valid Move Action

| Field | Value |
|-------|-------|
| Test ID | TC-ACTION-001 |
| Category | Game Action |
| Priority | **Critical** |
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

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-ACTION-002: Invalid Position Rejection (VULN-002)

| Field | Value |
|-------|-------|
| Test ID | TC-ACTION-002 |
| Category | Game Action |
| Priority | **Critical** |
| Security Relevant | Yes |

**Steps:**
1. Player sends move to position outside game bounds: { x: 99999, y: 99999 }
2. Observe result

**Expected Result:**
- Move rejected
- Error: "INVALID_POSITION" or "POSITION_OUT_OF_BOUNDS"
- Position unchanged
- Event logged for security monitoring

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes - Tests VULN-002

---

### TC-ACTION-003: Speed Hack Detection (VULN-002)

| Field | Value |
|-------|-------|
| Test ID | TC-ACTION-003 |
| Category | Game Action |
| Priority | **Critical** |
| Security Relevant | Yes |

**Steps:**
1. Player at position (0, 0)
2. Immediately send move to position (500, 500) - exceeds maxSpeed of 100
3. Observe result

**Expected Result:**
- Move rejected
- Error: "SPEED_VIOLATION" or "Move speed exceeded"
- Potential flag raised for speed hacking
- Multiple rejections may trigger account review

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes - Tests VULN-002

---

### TC-ACTION-004: Action Cooldown Enforcement

| Field | Value |
|-------|-------|
| Test ID | TC-ACTION-004 |
| Category | Game Action |
| Priority | **High** |
| Security Relevant | Yes |

**Steps:**
1. Configure minActionInterval: 500ms
2. Send valid action
3. Immediately send another action (within 500ms)
4. Observe result

**Expected Result:**
- Second action rejected
- Error: "ACTION_COOLDOWN" or "Action cooldown active"
- Cooldown timer included in response

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes

---

### TC-ACTION-005: Unauthorized Action Rejection

| Field | Value |
|-------|-------|
| Test ID | TC-ACTION-005 |
| Category | Game Action |
| Priority | **Critical** |

**Steps:**
1. Player A in Game 1 sends action for Player B's character
2. Or player not in session sends action
3. Observe result

**Expected Result:**
- Action rejected
- Error: "Unauthorized" or "PLAYER_NOT_IN_SESSION"
- Security event logged

**Status:** **IMPLEMENTED**
**Automated:** Yes
**Security Relevant:** Yes

---

## WebSocket Tests

### TC-WS-001: Connection Rate Limiting

| Field | Value |
|-------|-------|
| Test ID | TC-WS-001 |
| Category | WebSocket |
| Priority | **High** |
| Security Relevant | Yes |

**Steps:**
1. Attempt 15 WebSocket connections from same IP within 1 minute
2. Observe 11th connection result

**Expected Result:**
- First 10 connections succeed
- 11th-15th connections rejected
- Error: "Rate limit exceeded" or "Too many connections"
- IP may be temporarily blocked

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes - Tests VULN-003

---

### TC-WS-002: Message Rate Limiting (VULN-003)

| Field | Value |
|-------|-------|
| Test ID | TC-WS-002 |
| Category | WebSocket |
| Priority | **Critical** |
| Security Relevant | Yes |

**Steps:**
1. Connect to WebSocket with valid token
2. Send 15 game:input messages within 1 second
3. Observe response to 11th-15th messages

**Expected Result:**
- First 10 messages processed
- 11th-15th messages rejected
- Error: "RATE_LIMIT_EXCEEDED" or "Too many requests"
- Messages include retry-after information

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes - Tests VULN-003

---

### TC-WS-003: Heartbeat Functionality

| Field | Value |
|-------|-------|
| Test ID | TC-WS-003 |
| Category | WebSocket |
| Priority | **Medium** |

**Steps:**
1. Establish WebSocket connection
2. Wait 20 seconds without activity
3. Send heartbeat message
4. Observe response

**Expected Result:**
- Heartbeat acknowledged
- Connection timeout reset
- Round-trip time measured

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-WS-004: Connection Recovery

| Field | Value |
|-------|-------|
| Test ID | TC-WS-004 |
| Category | WebSocket |
| Priority | **High** |

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

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-WS-005: WebSocket Transport Security

| Field | Value |
|-------|-------|
| Test ID | TC-WS-005 |
| Category | WebSocket |
| Priority | **High** |
| Security Relevant | Yes |

**Steps:**
1. Attempt WebSocket connection over WSS (encrypted)
2. Verify TLS certificate is valid
3. Attempt connection over plain WS (should be rejected in production)

**Expected Result:**
- WSS connection succeeds
- Certificate is valid and trusted
- WS connections rejected in production environment

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes - Tests DATA-001

---

## Chat Tests

### TC-CHAT-001: Valid Message Send

| Field | Value |
|-------|-------|
| Test ID | TC-CHAT-001 |
| Category | Chat |
| Priority | **High** |
| Preconditions | Active game session with chat enabled |

**Steps:**
1. Send chat message: "Hello everyone!"
2. Observe message delivery

**Expected Result:**
- Message broadcast to all players
- Sender attribution correct
- Timestamp included
- Message length within limits

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-CHAT-002: XSS Payload Blocked (VULN-005)

| Field | Value |
|-------|-------|
| Test ID | TC-CHAT-002 |
| Category | Chat |
| Priority | **Critical** |
| Security Relevant | Yes |

**Steps:**
1. Send chat message: "<script>alert('xss')</script>"
2. Observe message processing
3. Verify message rendering in UI

**Expected Result:**
- Message rejected OR sanitized
- HTML entities escaped
- Script tags removed or neutralized
- No JavaScript execution possible in other players' browsers

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes - Tests VULN-005

---

### TC-CHAT-003: Excessive Message Rate

| Field | Value |
|-------|-------|
| Test ID | TC-CHAT-003 |
| Category | Chat |
| Priority | **High** |
| Security Relevant | Yes |

**Steps:**
1. Send 5 chat messages within 1 second
2. Observe result

**Expected Result:**
- First 2 messages processed
- 3rd-5th messages rejected
- Rate limit error returned
- Error includes retry-after

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes

---

### TC-CHAT-004: Long Message Truncation

| Field | Value |
|-------|-------|
| Test ID | TC-CHAT-004 |
| Category | Chat |
| Priority | **Medium** |

**Steps:**
1. Send message longer than 500 characters
2. Observe result

**Expected Result:**
- Message truncated to 500 characters
- No error thrown
- Remaining content discarded

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

## Security Tests

### TC-SEC-001: SQL Injection Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-001 |
| Category | Security |
| Priority | **Critical** |
| Security Relevant | Yes |

**Steps:**
1. Send player name: "'; DROP TABLE players; --"
2. Attempt to create player

**Expected Result:**
- Input sanitized/rejected
- No database error exposed
- Safe error message returned
- Database integrity maintained

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-SEC-002: Brute Force Protection

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-002 |
| Category | Security |
| Priority | **High** |
| Security Relevant | Yes |

**Steps:**
1. Attempt 15 failed authentication requests from same IP
2. Observe response

**Expected Result:**
- After 10 failures, rate limiting activates
- Subsequent requests blocked
- Error: "Too many attempts"
- Temporary IP block

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-SEC-003: Token Replay Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-003 |
| Category | Security |
| Priority | **High** |
| Security Relevant | Yes |

**Steps:**
1. Use valid token from previous session (different IP)
2. Attempt to connect

**Expected Result:**
- Token rejected (IP/User-Agent mismatch)
- No unauthorized access
- Security event logged

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-SEC-004: Session Hijacking Prevention (VULN-007)

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-004 |
| Category | Security |
| Priority | **Critical** |
| Security Relevant | Yes |

**Steps:**
1. Player A authenticates normally
2. Token is intercepted/stolen
3. Attacker attempts to use token from different context

**Expected Result:**
- Attack fails (IP/User-Agent mismatch)
- Legitimate session remains valid
- Security alert generated
- Token invalidation mechanism works

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes - Tests VULN-007

---

### TC-SEC-005: Command Injection Prevention

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-005 |
| Category | Security |
| Priority | **Critical** |
| Security Relevant | Yes |

**Steps:**
1. Send game action with injection: { command: "move; rm -rf /" }
2. Observe result

**Expected Result:**
- Input rejected at validation
- No system command execution
- Safe error returned
- Security event logged

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes

---

### TC-SEC-006: JWT Secret Hardcoded Check

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-006 |
| Category | Security |
| Priority | **Critical** |
| Security Relevant | Yes |

**Steps:**
1. Review source code for 'dev-secret' or similar hardcoded strings
2. Verify JWT_SECRET is required at startup
3. Verify no fallback secret exists

**Expected Result:**
- No hardcoded secrets in code
- Server fails to start without JWT_SECRET
- All secrets come from environment variables

**Status:** **NEW**
**Automated:** Yes (Static Analysis)
**Security Relevant:** Yes - Tests VULN-001

---

### TC-SEC-007: Game State Integrity

| Field | Value |
|-------|-------|
| Test ID | TC-SEC-007 |
| Category | Security |
| Priority | **Critical** |
| Security Relevant | Yes |

**Steps:**
1. Send crafted game:input message with arbitrary player updates
2. Verify server does not blindly apply updates
3. Verify server-side validation occurs

**Expected Result:**
- Server validates all input parameters
- Invalid data rejected
- Server-authoritative state maintained
- No client-controlled state injection

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes - Tests VULN-002

---

## Performance Tests

### TC-PERF-001: Concurrent Player Limit

| Field | Value |
|-------|-------|
| Test ID | TC-PERF-001 |
| Category | Performance |
| Priority | **High** |

**Steps:**
1. Create game with maxPlayers: 100
2. Add 100 players
3. Verify all added successfully

**Expected Result:**
- All 100 players added
- Response time < 1 second
- No state corruption

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-PERF-002: State Broadcast Latency

| Field | Value |
|-------|-------|
| Test ID | TC-PERF-002 |
| Category | Performance |
| Priority | **High** |

**Steps:**
1. Create game with 4 players
2. Player 1 sends action
3. Measure time until all other players receive update

**Expected Result:**
- All players receive update within 100ms
- No dropped messages
- Order preserved

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-PERF-003: Large Game Session Handling

| Field | Value |
|-------|-------|
| Test ID | TC-PERF-003 |
| Category | Performance |
| Priority | **Medium** |

**Steps:**
1. Create game with 50 players
2. Run continuous activity for 5 minutes
3. Monitor system resources

**Expected Result:**
- No memory leaks
- CPU usage stable
- No dropped connections
- Response times consistent

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-PERF-004: Reconnection Under Load

| Field | Value |
|-------|-------|
| Test ID | TC-PERF-004 |
| Category | Performance |
| Priority | **Medium** |

**Steps:**
1. Create busy game (10+ players, high activity)
2. Disconnect and reconnect player
3. Measure reconnection time

**Expected Result:**
- Reconnection within 2 seconds
- State restored correctly
- No impact on other players

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-PERF-005: WebSocket Message Throughput

| Field | Value |
|-------|-------|
| Test ID | TC-PERF-005 |
| Category | Performance |
| Priority | **Medium** |
| Security Relevant | Yes |

**Steps:**
1. Connect 100 clients
2. Each client sends 10 messages/second for 30 seconds
3. Measure message delivery rate and latency

**Expected Result:**
- All messages delivered
- Average latency < 100ms
- No dropped connections
- Rate limiting works correctly

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes - Tests VULN-003

---

### TC-PERF-006: Rate Limit Performance Impact

| Field | Value |
|-------|-------|
| Test ID | TC-PERF-006 |
| Category | Performance |
| Priority | **Low** |

**Steps:**
1. Measure baseline request throughput without rate limiting
2. Enable rate limiting
3. Measure throughput with rate limiting

**Expected Result:**
- Throughput decrease < 5%
- Rate limiting adds minimal latency (< 1ms)
- Legitimate traffic unaffected

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes

---

## Edge Case Tests

### TC-EDGE-001: Simultaneous Disconnect/Reconnect

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-001 |
| Category | Edge Case |
| Priority | **Medium** |

**Steps:**
1. Player loses network connection
2. Player immediately reconnects (different network)
3. Verify behavior

**Expected Result:**
- Old connection cleaned up
- New connection established
- No duplicate state
- Other players see single reconnection

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-EDGE-002: Last Player Leaves Active Game

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-002 |
| Category | Edge Case |
| Priority | **High** |

**Steps:**
1. Create game with 2 players
2. Both players leave
3. Observe game state

**Expected Result:**
- Game marked as completed
- Resources cleaned up
- No dangling sessions
- Proper cleanup timeout

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-EDGE-003: Invalid Message Format

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-003 |
| Category | Edge Case |
| Priority | **High** |
| Security Relevant | Yes |

**Steps:**
1. Send malformed message: { type: undefined }
2. Send non-JSON message
3. Send message with wrong structure

**Expected Result:**
- Messages rejected gracefully
- No server crash
- Client receives error
- Connection maintained (if possible)

**Status:** **IMPLEMENTED**
**Automated:** Yes
**Security Relevant:** Yes

---

### TC-EDGE-004: Rapid Session Creation/Deletion

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-004 |
| Category | Edge Case |
| Priority | **Medium** |

**Steps:**
1. Create game session
2. Immediately delete it
3. Repeat 10 times rapidly

**Expected Result:**
- All operations succeed
- No resource leaks
- No orphaned sessions

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-EDGE-005: Unicode and Emoji Support

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-005 |
| Category | Edge Case |
| Priority | **Low** |

**Steps:**
1. Send chat message with emojis: "Hello 🐒🎮"
2. Send player name with unicode: "玩家"
3. Send game action with unicode data

**Expected Result:**
- All unicode handled correctly
- No encoding errors
- Display works properly
- Security sanitization applied

**Status:** **IMPLEMENTED**
**Automated:** Yes

---

### TC-EDGE-006: Zero-Division in Game Calculations

| Field | Value |
|-------|-------|
| Test ID | TC-EDGE-006 |
| Category | Edge Case |
| Priority | **Medium** |
| Security Relevant | Yes |

**Steps:**
1. Send game actions that might cause division by zero
2. Send zero values for normally non-zero fields
3. Observe error handling

**Expected Result:**
- Errors handled gracefully
- No server crashes
- Invalid input rejected
- No security vulnerabilities exploited

**Status:** **NEW**
**Automated:** Yes
**Security Relevant:** Yes

---

## Test Case Summary Table

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Authentication | 4 | 1 | 1 | 0 | 6 |
| Game Action | 4 | 1 | 0 | 0 | 5 |
| WebSocket | 1 | 3 | 1 | 0 | 5 |
| Chat | 1 | 2 | 1 | 0 | 4 |
| Security | 5 | 2 | 0 | 0 | 7 |
| Performance | 0 | 3 | 3 | 0 | 6 |
| Edge Case | 0 | 2 | 3 | 1 | 6 |
| Game Session | 2 | 2 | 1 | 0 | 5 |
| **Total** | **17** | **16** | **10** | **1** | **44** |

---

## References

- Test Strategy: `.monkeytown/qa/test-strategy.md`
- Quality Gates: `.monkeytown/qa/quality-gates.md`
- Vulnerability Assessment: `.monkeytown/security/vulnerability-assessment.md`
- Security Requirements: `.monkeytown/security/security-requirements.md`

---

*Test Cases Version: 2.1*
*Last Updated: 2026-01-19*
*JungleSecurity - Testing everything, trusting nothing*
