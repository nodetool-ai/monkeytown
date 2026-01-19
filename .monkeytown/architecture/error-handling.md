# Error Handling Architecture

**Comprehensive error handling strategy for Monkeytown**

**Version:** 1.0
**Date:** 2026-01-18
**Architect:** ChaosArchitect

---

## Overview

This document defines how errors are handled, propagated, and recovered from across the Monkeytown platform. Consistent error handling ensures:

- Meaningful feedback for players
- Efficient debugging for developers
- Security through information control
- Graceful degradation under failure conditions

---

## Error Code Registry

### Format

```
<COMPONENT>-<NUMBER>

Examples:
- AUTH-001: Authentication required
- GAME-001: Game not found  
- WS-001: Connection failed
- INPUT-001: Invalid action format
- SYS-001: Internal server error
```

### Authentication Errors (AUTH)

| Code | Message | HTTP Status | Recovery |
|------|---------|-------------|----------|
| AUTH-001 | Authentication required | 401 | Redirect to login |
| AUTH-002 | Invalid token | 401 | Refresh token or re-login |
| AUTH-003 | Token expired | 401 | Refresh token |
| AUTH-004 | Insufficient permissions | 403 | Show access denied |
| AUTH-005 | Account suspended | 403 | Contact support |
| AUTH-006 | Session not found | 401 | Re-authenticate |
| AUTH-007 | Too many login attempts | 429 | Wait and retry |

### Game Errors (GAME)

| Code | Message | HTTP Status | Recovery |
|------|---------|-------------|----------|
| GAME-001 | Game not found | 404 | Show game list |
| GAME-002 | Game already started | 409 | Join as spectator |
| GAME-003 | Game is full | 409 | Wait or join another |
| GAME-004 | Invalid game action | 400 | Show valid actions |
| GAME-005 | Not your turn | 400 | Wait for turn |
| GAME-006 | Game ended | 410 | Show results |
| GAME-007 | Action not allowed in current state | 400 | Refresh state |
| GAME-008 | Resource not available | 400 | Show available resources |

### WebSocket Errors (WS)

| Code | Message | HTTP Status | Recovery |
|------|---------|-------------|----------|
| WS-001 | Connection failed | N/A | Retry connection |
| WS-002 | Connection rate limited | N/A | Exponential backoff |
| WS-003 | Connection timeout | N/A | Reconnect |
| WS-004 | Invalid message format | N/A | Log and ignore |
| WS-005 | Subscription failed | N/A | Retry subscription |
| WS-006 | Heartbeat timeout | N/A | Reconnect |

### Input Validation Errors (INPUT)

| Code | Message | HTTP Status | Recovery |
|------|---------|-------------|----------|
| INPUT-001 | Invalid action format | 400 | Show correct format |
| INPUT-002 | Position out of bounds | 400 | Clamp to valid range |
| INPUT-003 | Invalid card ID | 400 | Refresh hand |
| INPUT-004 | Message too long | 400 | Truncate or split |
| INPUT-005 | Invalid characters | 400 | Sanitize input |
| INPUT-006 | Required field missing | 400 | Highlight field |

### System Errors (SYS)

| Code | Message | HTTP Status | Recovery |
|------|---------|-------------|----------|
| SYS-001 | Internal server error | 500 | Retry or report |
| SYS-002 | Service unavailable | 503 | Retry later |
| SYS-003 | Database connection failed | 503 | Auto-retry |
| SYS-004 | Redis connection failed | 503 | Auto-retry |
| SYS-005 | External service timeout | 504 | Retry with backoff |

---

## Error Response Schema

### HTTP API Errors

```typescript
interface HTTPErrorResponse {
  code: string;           // Error code (e.g., "GAME-001")
  message: string;        // Human-readable message
  details?: object;       // Additional context (dev mode only)
  timestamp: number;      // Unix timestamp in milliseconds
  requestId: string;      // UUID for log correlation
}

// Example
{
  "code": "GAME-001",
  "message": "Game not found",
  "timestamp": 1705612800000,
  "requestId": "550e8400-e29b-41d4-a716-446655440000"
}
```

### WebSocket Errors

```typescript
interface WSErrorMessage {
  type: 'error';
  payload: {
    code: string;
    message: string;
    originalAction?: string;  // The action that caused the error
    timestamp: number;
  };
}

// Example
{
  "type": "error",
  "payload": {
    "code": "GAME-005",
    "message": "Not your turn",
    "originalAction": "game:input",
    "timestamp": 1705612800000
  }
}
```

---

## Error Handling Patterns

### Backend Error Handler

```typescript
// server/src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { logger } from '../services/logger';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const requestId = req.id || crypto.randomUUID();
  
  if (err instanceof AppError) {
    // Known operational error
    logger.warn({
      code: err.code,
      message: err.message,
      requestId,
      path: req.path,
      method: req.method,
    });
    
    res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      timestamp: Date.now(),
      requestId,
    });
    return;
  }
  
  // Unknown error - log full details, return generic message
  logger.error({
    err,
    requestId,
    path: req.path,
    method: req.method,
    body: req.body,
  });
  
  res.status(500).json({
    code: 'SYS-001',
    message: 'An unexpected error occurred',
    timestamp: Date.now(),
    requestId,
  });
}
```

### WebSocket Error Handler

```typescript
// server/src/websocket/errorHandler.ts
import { Socket } from 'socket.io';
import { AppError } from '../errors/AppError';
import { logger } from '../services/logger';

export function handleSocketError(
  socket: Socket,
  err: Error,
  action?: string
): void {
  if (err instanceof AppError) {
    socket.emit('error', {
      type: 'error',
      payload: {
        code: err.code,
        message: err.message,
        originalAction: action,
        timestamp: Date.now(),
      },
    });
    
    logger.warn({
      code: err.code,
      message: err.message,
      playerId: socket.data.playerId,
      action,
    });
    return;
  }
  
  // Unknown error
  logger.error({
    err,
    playerId: socket.data.playerId,
    action,
  });
  
  socket.emit('error', {
    type: 'error',
    payload: {
      code: 'SYS-001',
      message: 'An unexpected error occurred',
      originalAction: action,
      timestamp: Date.now(),
    },
  });
}
```

### Frontend Error Boundary

```typescript
// web/src/components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { logger } from '../lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    logger.error({
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
    
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

---

## Recovery Strategies

### Automatic Recovery

| Error | Strategy | Max Retries | Backoff |
|-------|----------|-------------|---------|
| WS-001, WS-003, WS-006 | Reconnect | 5 | Exponential (1s, 2s, 4s, 8s, 16s) |
| SYS-003, SYS-004 | Retry operation | 3 | Exponential (100ms, 200ms, 400ms) |
| SYS-005 | Retry with timeout | 3 | Linear (1s, 2s, 3s) |
| AUTH-003 | Refresh token | 1 | Immediate |

### Manual Recovery

| Error | User Action Required |
|-------|---------------------|
| AUTH-001, AUTH-002 | Re-login |
| AUTH-005 | Contact support |
| GAME-001 | Select another game |
| GAME-002, GAME-003 | Join waiting list or different game |
| INPUT-* | Correct input and retry |

---

## Monitoring and Alerting

### Error Rate Thresholds

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| 5xx errors/minute | >10 | >50 | Page on-call |
| AUTH-* errors/minute | >100 | >500 | Investigate auth service |
| GAME-* errors/minute | >200 | >1000 | Check game server health |
| WS-001/minute | >50 | >200 | Check WebSocket servers |

### Log Aggregation

All errors are logged with:
- Timestamp (ISO 8601)
- Request/Session ID
- Error code and message
- Stack trace (for SYS-*)
- Context (user ID, game ID, action)

### Dashboard Metrics

```typescript
// Prometheus metrics
const errorCounter = new Counter({
  name: 'monkeytown_errors_total',
  help: 'Total number of errors',
  labelNames: ['code', 'component'],
});

const errorLatencyHistogram = new Histogram({
  name: 'monkeytown_error_latency_seconds',
  help: 'Time to detect and handle errors',
  buckets: [0.01, 0.05, 0.1, 0.5, 1],
});
```

---

## Security Considerations

### Information Disclosure

- **Never** expose stack traces to clients in production
- **Never** expose database queries or internal paths
- **Always** use generic messages for SYS-* errors
- **Log** full details server-side for debugging

### Rate Limiting on Errors

```typescript
// Prevent error enumeration attacks
const authErrorLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 auth errors per window
  handler: (req, res) => {
    res.status(429).json({
      code: 'AUTH-007',
      message: 'Too many failed attempts. Please try again later.',
      timestamp: Date.now(),
    });
  },
});
```

---

## References

- [ADR-006: Error Handling Strategy](./adr/ADR-006-error-handling-strategy.md)
- [System Design](./system-design.md)
- [Security Threat Model](../security/threat-model.md)

---

*Version: 1.0*
*Last updated: 2026-01-18*
*ChaosArchitect - Graceful failure by design*
