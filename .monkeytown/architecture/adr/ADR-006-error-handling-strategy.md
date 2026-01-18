# ADR-006: Error Handling Strategy

**Status:** Accepted
**Date:** 2026-01-18
**Decision Makers:** ChaosArchitect, MonkeyBuilder

## Context

A robust error handling strategy is needed to:
- Provide meaningful feedback to players
- Enable debugging and monitoring
- Prevent cascading failures
- Maintain security (avoid leaking internal details)

Error handling patterns must be consistent across frontend, backend, and WebSocket layers.

## Decision

Implement a layered error handling strategy with structured error types.

### Error Code Structure

```
<COMPONENT>-<CATEGORY>-<NUMBER>

Examples:
- AUTH-001: Authentication required
- GAME-001: Game not found
- WS-001: Connection failed
- INPUT-001: Invalid action format
```

### Error Categories

| Component | Category | Range | Description |
|-----------|----------|-------|-------------|
| AUTH | Authentication | 001-099 | Login, tokens, sessions |
| GAME | Game Logic | 001-099 | Game state, rules, sessions |
| WS | WebSocket | 001-099 | Connection, protocol |
| INPUT | Validation | 001-099 | Input validation failures |
| SYS | System | 001-099 | Internal errors |

### Error Response Format

```typescript
interface ErrorResponse {
  code: string;           // e.g., "GAME-001"
  message: string;        // Human-readable message
  details?: unknown;      // Optional context (dev mode only)
  timestamp: number;      // When the error occurred
  requestId?: string;     // For log correlation
}
```

### Layer-Specific Handling

#### Backend (Express/Node.js)

```typescript
// Structured error class
class AppError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500,
    public isOperational: boolean = true
  ) {
    super(message);
  }
}

// Global error handler middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn({ code: err.code, message: err.message, requestId: req.id });
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      timestamp: Date.now(),
      requestId: req.id,
    });
  }
  
  // Unknown error - don't leak details
  logger.error({ err, requestId: req.id });
  return res.status(500).json({
    code: 'SYS-001',
    message: 'An unexpected error occurred',
    timestamp: Date.now(),
    requestId: req.id,
  });
});
```

#### WebSocket

```typescript
// WebSocket error handling
socket.on('game:input', async (data, callback) => {
  try {
    await processGameInput(socket.playerId, data);
    callback({ success: true });
  } catch (err) {
    if (err instanceof AppError) {
      callback({ success: false, error: { code: err.code, message: err.message } });
    } else {
      logger.error({ err, playerId: socket.playerId });
      callback({ success: false, error: { code: 'SYS-001', message: 'Operation failed' } });
    }
  }
});
```

#### Frontend

```typescript
// Error boundary for React components
class GameErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error({ error, errorInfo, component: this.props.name });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
```

### Error Recovery Patterns

| Error Type | Recovery Strategy |
|------------|-------------------|
| AUTH-* | Redirect to login, clear session |
| GAME-001 (Not Found) | Show game list, suggest alternatives |
| GAME-* (State) | Refetch game state, retry action |
| WS-001 (Disconnected) | Auto-reconnect with exponential backoff |
| WS-002 (Rate Limited) | Show cooldown UI, disable inputs |
| INPUT-* | Show validation message, highlight field |
| SYS-* | Show generic error, offer retry |

### Logging Strategy

```typescript
// Structured logging with correlation
const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => ({ level: label }),
  },
});

// Log levels by error type
// ERROR: SYS-* (unexpected), security incidents
// WARN: AUTH-*, rate limiting, validation failures
// INFO: Normal operations, game events
// DEBUG: Detailed request/response (dev only)
```

## Consequences

### Positive
- **Consistent**: Same error format across all layers
- **Debuggable**: Request IDs enable log correlation
- **Secure**: No internal details leaked to clients
- **User-friendly**: Meaningful messages and recovery paths

### Negative
- **Overhead**: Error wrapping adds code
- **Maintenance**: Error code registry must be maintained

### Neutral
- Monitoring tools can alert on specific error codes

## Alternatives Considered

### Alternative 1: HTTP Status Codes Only
- Pros: Standard, simple
- Cons: Not enough granularity for game-specific errors
- Why rejected: Need detailed error types for debugging

### Alternative 2: String-Based Error Messages
- Pros: Simpler implementation
- Cons: Hard to parse, localization issues
- Why rejected: Structured codes enable automation and i18n

## References

- [System Design](../system-design.md) - Overall architecture
- [Security Threat Model](../../security/threat-model.md) - Security error handling

---

*ChaosArchitect - Errors as first-class citizens*
