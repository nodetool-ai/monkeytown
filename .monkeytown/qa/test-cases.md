# Monkeytown Test Cases

**Version:** 1.0  
**Date:** 2026-01-19  
**QA Lead:** JungleSecurity  
**Status:** Active

---

## Introduction

This document contains detailed test cases for Monkeytown, organized by feature area. Each test case includes preconditions, steps, expected results, and priority.

## Authentication Tests

### AUTH-TC-001: Valid Login

**Priority:** P1  
**Component:** Authentication

| Field | Value |
|-------|-------|
| Preconditions | User account exists, no active session |
| Steps | 1. Navigate to login page |
| | 2. Enter valid username |
| | 3. Enter valid password |
| | 4. Click "Login" |
| Expected | User redirected to dashboard, JWT token stored |
| Pass Criteria | Login successful, no errors |

---

### AUTH-TC-002: Invalid Password

**Priority:** P1  
**Component:** Authentication

| Field | Value |
|-------|-------|
| Preconditions | User account exists |
| Steps | 1. Navigate to login page |
| | 2. Enter valid username |
| | 3. Enter invalid password |
| | 4. Click "Login" |
| Expected | Error message displayed, no token stored |
| Pass Criteria | Access denied, appropriate error shown |

---

### AUTH-TC-003: Expired Token Rejection

**Priority:** P1  
**Component:** Authentication

| Field | Value |
|-------|-------|
| Preconditions | Expired JWT token available |
| Steps | 1. Make API request with expired token |
| Expected | 401 Unauthorized response |
| Pass Criteria | Token validation fails, error logged |

---

### AUTH-TC-004: Token Forgery Detection

**Priority:** P1  
**Component:** Authentication

| Field | Value |
|-------|-------|
| Preconditions | Known valid token, different secret |
| Steps | 1. Create token with wrong secret |
| | 2. Make API request with forged token |
| Expected | 401 Unauthorized response |
| Pass Criteria | Token validation rejects forged token |

---

### AUTH-TC-005: Session Persistence

**Priority:** P2  
**Component:** Authentication

| Field | Value |
|-------|-------|
| Preconditions | User logged in |
| Steps | 1. Close browser tab |
| | 2. Reopen and navigate to site |
| Expected | User remains authenticated |
| Pass Criteria | Session restored from storage |

---

## Game Engine Tests

### GAME-TC-001: TicTacToe Valid Move

**Priority:** P1  
**Component:** TicTacToe Engine

| Field | Value |
|-------|-------|
| Preconditions | Game started, player X turn |
| Steps | 1. Submit move at row 0, col 0 |
| Expected | Move accepted, board updated |
| Pass Criteria | State shows X at (0,0), turn changes |

---

### GAME-TC-002: TicTacToe Invalid Position

**Priority:** P1  
**Component:** TicTacToe Engine

| Field | Value |
|-------|-------|
| Preconditions | Game started, player X turn |
| Steps | 1. Submit move at row 5, col 5 |
| Expected | Move rejected with error |
| Pass Criteria | Error message, state unchanged |

---

### GAME-TC-003: TicTacToe Occupied Cell

**Priority:** P1  
**Component:** TicTacToe Engine

| Field | Value |
|-------|-------|
| Preconditions | Game started, cell (0,0) occupied by X |
| Steps | 1. Submit move at row 0, col 0 |
| Expected | Move rejected with error |
| Pass Criteria | Error message, state unchanged |

---

### GAME-TC-004: TicTacToe Out of Turn

**Priority:** P1  
**Component:** TicTacToe Engine

| Field | Value |
|-------|-------|
| Preconditions | Game started, player X turn |
| Steps | 1. Submit move as player O |
| Expected | Move rejected |
| Pass Criteria | Error "Not your turn", state unchanged |

---

### GAME-TC-005: TicTacToe Win Detection

**Priority:** P1  
**Component:** TicTacToe Engine

| Field | Value |
|-------|-------|
| Preconditions | Game started |
| Steps | 1. Set up winning position for X |
| | 2. Submit winning move |
| Expected | Game ends, X wins |
| Pass Criteria | Win detected, winner ID correct |

---

### GAME-TC-006: TicTacToe Draw Detection

**Priority:** P1  
**Component:** TicTacToe Engine

| Field | Value |
|-------|-------|
| Preconditions | Game started |
| Steps | 1. Fill all 9 cells with no winner |
| Expected | Game ends in draw |
| Pass Criteria | Draw detected, isDraw=true |

---

### GAME-TC-007: TicTacToe Forfeit

**Priority:** P2  
**Component:** TicTacToe Engine

| Field | Value |
|-------|-------|
| Preconditions | Game in progress |
| Steps | 1. Submit forfeit action |
| Expected | Game ends, other player wins |
| Pass Criteria | Forfeit recorded, winner assigned |

---

### GAME-TC-008: Babel Card Play

**Priority:** P1  
**Component:** Babel Engine

| Field | Value |
|-------|-------|
| Preconditions | Babel game started, player has cards |
| Steps | 1. Submit play_card action with valid card |
| Expected | Card played, state updated |
| Pass Criteria | Card removed from hand, played on table |

---

### GAME-TC-009: Babel Pass

**Priority:** P1  
**Component:** Babel Engine

| Field | Value |
|-------|-------|
| Preconditions | Babel game started |
| Steps | 1. Submit pass action |
| Expected | Turn passes to next player |
| Pass Criteria | Current player index updated |

---

### GAME-TC-010: Babel Special Action

**Priority:** P2  
**Component:** Babel Engine

| Field | Value |
|-------|-------|
| Preconditions | Babel game, player has special card |
| Steps | 1. Submit special_babel_tower with card |
| Expected | Special action executed |
| Pass Criteria | Tower effect applied, state updated |

---

## WebSocket Tests

### WS-TC-001: Connection Establishment

**Priority:** P1  
**Component:** WebSocket

| Field | Value |
|-------|-------|
| Preconditions | Valid JWT token |
| Steps | 1. Open WebSocket connection with token |
| Expected | Connection established |
| Pass Criteria | Connected event received |

---

### WS-TC-002: Game Join

**Priority:** P1  
**Component:** WebSocket

| Field | Value |
|-------|-------|
| Preconditions | Connected to WebSocket, game exists |
| Steps | 1. Send game:join event with gameId |
| Expected | Joined game room, state received |
| Pass Criteria | game:joined event, game state visible |

---

### WS-TC-003: Game Action

**Priority:** P1  
**Component:** WebSocket

| Field | Value |
|-------|-------|
| Preconditions | Joined to game, player turn |
| Steps | 1. Send game:action with valid move |
| Expected | Action processed, state broadcast |
| Pass Criteria | game:state event with updated state |

---

### WS-TC-004: Chat Message

**Priority:** P2  
**Component:** WebSocket

| Field | Value |
|-------|-------|
| Preconditions | Joined to game |
| Steps | 1. Send game:chat with message |
| Expected | Message broadcast to room |
| Pass Criteria | game:chat event to all players |

---

### WS-TC-005: Heartbeat

**Priority:** P2  
**Component:** WebSocket

| Field | Value |
|-------|-------|
| Preconditions | Connected |
| Steps | 1. Send heartbeat event |
| Expected | Heartbeat acknowledgment |
| Pass Criteria | heartbeat:ack received |

---

### WS-TC-006: Disconnect Handling

**Priority:** P1  
**Component:** WebSocket

| Field | Value |
|-------|-------|
| Preconditions | Connected to game |
| Steps | 1. Disconnect socket |
| Expected | Player marked as disconnected |
| Pass Criteria | Other players notified, rejoin works |

---

## Input Validation Tests

### VAL-TC-001: Valid Game Action Schema

**Priority:** P1  
**Component:** Validation

| Field | Value |
|-------|-------|
| Preconditions | Action validator ready |
| Steps | 1. Validate action with valid schema |
| Expected | Validation passes |
| Pass Criteria | valid=true, parsed data returned |

---

### VAL-TC-002: Invalid Action Type

**Priority:** P1  
**Component:** Validation

| Field | Value |
|-------|-------|
| Preconditions | Action validator ready |
| Steps | 1. Validate action with invalid type |
| Expected | Validation fails |
| Pass Criteria | valid=false, error message |

---

### VAL-TC-003: SQL Injection Attempt

**Priority:** P1  
**Component:** Validation

| Field | Value |
|-------|-------|
| Preconditions | Chat validation ready |
| Steps | 1. Submit chat with SQL injection |
| Expected | Message sanitized or rejected |
| Pass Criteria | No SQL execution, XSS blocked |

---

### VAL-TC-004: XSS Attempt

**Priority:** P1  
**Component:** Validation

| Field | Value |
|-------|-------|
| Preconditions | Chat validation ready |
| Steps | 1. Submit chat with script tag |
| Expected | Message sanitized or rejected |
| Pass Criteria | Script tag stripped/escaped |

---

### VAL-TC-005: Message Length Limit

**Priority:** P2  
**Component:** Validation

| Field | Value |
|-------|-------|
| Preconditions | Chat validation ready |
| Steps | 1. Submit message > 500 chars |
| Expected | Validation fails |
| Pass Criteria | Error message about length |

---

### VAL-TC-006: Card ID Format

**Priority:** P1  
**Component:** Validation

| Field | Value |
|-------|-------|
| Preconditions | Babel action validation ready |
| Steps | 1. Validate card with invalid ID format |
| Expected | Validation fails |
| Pass Criteria | Error about card ID format |

---

## Rate Limiting Tests

### RATE-TC-001: HTTP Rate Limit

**Priority:** P1  
**Component:** Rate Limiting

| Field | Value |
|-------|-------|
| Preconditions | Rate limiter configured |
| Steps | 1. Make 101 requests in 1 minute |
| Expected | 102nd request rejected |
| Pass Criteria | 429 Too Many Requests |

---

### WS-RATE-001: WebSocket Action Rate Limit

**Priority:** P1  
**Component:** Rate Limiting

| Field | Value |
|-------|-------|
| Preconditions | Connected to game |
| Steps | 1. Send 31 game actions in 1 minute |
| Expected | 31st action rejected |
| Pass Criteria | Error or disconnect |

---

### WS-RATE-002: Reconnection Rate Limit

**Priority:** P2  
**Component:** Rate Limiting

| Field | Value |
|-------|-------|
| Preconditions | Rate limiter configured |
| Steps | 1. Disconnect and reconnect 6 times/min |
| Expected | 6th reconnection rejected |
| Pass Criteria | Error or disconnect |

---

## Chat Tests

### CHAT-TC-001: Send Message

**Priority:** P2  
**Component:** Chat

| Field | Value |
|-------|-------|
| Preconditions | In game, connected |
| Steps | 1. Type message and send |
| Expected | Message appears in chat |
| Pass Criteria | Message broadcast to room |

---

### CHAT-TC-002: Quick Reaction

**Priority:** P3  
**Component:** Chat

| Field | Value |
|-------|-------|
| Preconditions | In game, connected |
| Steps | 1. Click quick reaction emoji |
| Expected | Reaction appears |
| Pass Criteria | Reaction added to chat |

---

### CHAT-TC-003: Chat History

**Priority:** P2  
**Component:** Chat

| Field | Value |
|-------|-------|
| Preconditions | Joined to game with chat history |
| Steps | 1. Request chat history |
| Expected | Previous messages loaded |
| Pass Criteria | Messages displayed |

---

### CHAT-TC-004: Empty Message Blocked

**Priority:** P3  
**Component:** Chat

| Field | Value |
|-------|-------|
| Preconditions | Chat input ready |
| Steps | 1. Send empty message |
| Expected | Message rejected |
| Pass Criteria | Error or no send |

---

## Security Tests

### SEC-TC-001: JWT Secret Enforcement

**Priority:** P1  
**Component:** Security

| Field | Value |
|-------|-------|
| Preconditions | JWT_SECRET not set in production |
| Steps | 1. Attempt to start server |
| Expected | Server fails to start |
| Pass Criteria | Error about missing JWT_SECRET |

---

### SEC-TC-002: Token Expiration Check

**Priority:** P1  
**Component:** Security

| Field | Value |
|-------|-------|
| Preconditions | Token with exp claim |
| Steps | 1. Use expired token |
| Expected | Token rejected |
| Pass Criteria | Error about expiration |

---

### SEC-TC-003: CSP Header Present

**Priority:** P1  
**Component:** Security

| Field | Value |
|-------|-------|
| Preconditions | Application running |
| Steps | 1. Check response headers |
| Expected | CSP header present |
| Pass Criteria | Header with policy found |

---

### SEC-TC-004: X-Content-Type-Options

**Priority:** P2  
**Component:** Security

| Field | Value |
|-------|-------|
| Preconditions | Application running |
| Steps | 1. Check response headers |
| Expected | X-Content-Type-Options: nosniff |
| Pass Criteria | Header present |

---

### SEC-TC-005: No Sensitive Data in Logs

**Priority:** P1  
**Component:** Security

| Field | Value |
|-------|-------|
| Preconditions | Application running |
| Steps | 1. Generate auth flow |
| | 2. Check logs for secrets |
| Expected | No secrets in logs |
| Pass Criteria | Secrets not visible |

---

## Performance Tests

### PERF-TC-001: API Response Time

**Priority:** P1  
**Component:** Performance

| Field | Value |
|-------|-------|
| Preconditions | Server running |
| Steps | 1. Measure response time for API call |
| Expected | P95 < 100ms |
| Pass Criteria | Timing within threshold |

---

### PERF-TC-002: WebSocket Latency

**Priority:** P1  
**Component:** Performance

| Field | Value |
|-------|-------|
| Preconditions | WebSocket connected |
| Steps | 1. Send action, measure round-trip |
| Expected | Round-trip < 100ms |
| Pass Criteria | Timing within threshold |

---

### PERF-TC-003: Concurrent Connections

**Priority:** P1  
**Component:** Performance

| Field | Value |
|-------|-------|
| Preconditions | Server running |
| Steps | 1. Open 1000 concurrent connections |
| Expected | All connections established |
| Pass Criteria | All connected, no errors |

---

### PERF-TC-004: Page Load Time

**Priority:** P2  
**Component:** Performance

| Field | Value |
|-------|-------|
| Preconditions | Production build |
| Steps | 1. Measure page load with Lighthouse |
| Expected | Load < 2s, TTI < 3s |
| Pass Criteria | Timing within thresholds |

---

## Edge Cases

### EDGE-TC-001: Rapid Input

**Priority:** P2  
**Component:** Game Logic

| Field | Value |
|-------|-------|
| Preconditions | In game |
| Steps | 1. Submit moves as fast as possible |
| Expected | Only valid turns processed |
| Pass Criteria | No double moves, state consistent |

---

### EDGE-TC-002: Network Interruption

**Priority:** P2  
**Component:** WebSocket

| Field | Value |
|-------|-------|
| Preconditions | In game |
| Steps | 1. Simulate network drop |
| | 2. Reconnect |
| Expected | Game state restored |
| Pass Criteria | Rejoin works, state current |

---

### EDGE-TC-003: Simultaneous Moves

**Priority:** P2  
**Component:** Game Logic

| Field | Value |
|-------|-------|
| Preconditions | Game with 2+ players |
| Steps | 1. Both players submit moves simultaneously |
| Expected | Only current player move accepted |
| Pass Criteria | Turn order preserved |

---

### EDGE-TC-004: Invalid UTF-8

**Priority:** P3  
**Component:** Validation

| Field | Value |
|-------|-------|
| Preconditions | Chat input ready |
| Steps | 1. Submit invalid UTF-8 sequence |
| Expected | Input sanitized or rejected |
| Pass Criteria | No crashes, proper handling |

---

## Test Case Summary

| Category | Total Cases | P1 | P2 | P3 |
|----------|-------------|----|----|----|
| Authentication | 5 | 4 | 1 | 0 |
| Game Engine | 10 | 8 | 2 | 0 |
| WebSocket | 6 | 4 | 2 | 0 |
| Input Validation | 6 | 4 | 2 | 0 |
| Rate Limiting | 3 | 2 | 1 | 0 |
| Chat | 4 | 0 | 3 | 1 |
| Security | 5 | 4 | 1 | 0 |
| Performance | 4 | 3 | 1 | 0 |
| Edge Cases | 4 | 0 | 4 | 0 |
| **Total** | **47** | **29** | **17** | **1** |

---

## References

- Test Strategy: `.monkeytown/qa/test-strategy.md`
- Security Requirements: `.monkeytown/security/security-requirements.md`
- Threat Model: `.monkeytown/security/threat-model.md`

---

*Document Version: 1.0*  
*Last Updated: 2026-01-19*  
*JungleSecurity - Protecting Monkeytown*
