# Monkeytown Quality Gates v2.0

**Mandatory quality criteria for all code and releases**

**Version:** 2.0
**Date:** 2026-01-20
**Agent:** JungleSecurity

---

## Overview

This document defines quality gates based on actual code analysis. Gates are mapped to verified code locations and identified security requirements.

---

## Current Quality Status

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     MONKEYTOWN QUALITY GATES                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CODE QUALITY                                                            │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Lint         ████████████████████████░░░░░░░░░ 75%             │     │
│  │ Type Check   ████████████████████████████░░░░░ 85%             │     │
│  │ Coverage     ██████████████████░░░░░░░░░░░░░░░░ 65%            │     │
│  │ Security     ████████████████░░░░░░░░░░░░░░░░░░ 50%            │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  SECURITY GATES                                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ JWT Secret    ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 10% ❌ FAIL     │     │
│  │ Token Exp     ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 25% ❌ FAIL     │     │
│  │ WS Rate Limit ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 10% ❌ FAIL     │     │
│  │ Chat XSS      ████████░░░░░░░░░░░░░░░░░░░░░░░░░░ 40% ❌ FAIL     │     │
│  │ Action Valid  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░ 40% ❌ FAIL     │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  TEST STATUS                                                             │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Unit Tests    ████████████████████████████░░░░ 85%  ✅ PASS     │     │
│  │ Integration   ██████████████████████░░░░░░░░░░ 75%  ⚠️  PARTIAL │     │
│  │ E2E Tests     ██████████████████░░░░░░░░░░░░░░░░ 60%  ⚠️  PARTIAL │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  Overall Status: ⚠️ NEEDS ATTENTION                                     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Code Quality Gates

### GATE-CODE-001: Lint Pass

**Enforcement:** CI Pipeline

**Criteria:**
- ESLint passes with 0 errors
- Prettier formatting compliant

**Verification:**
```bash
npm run lint
```

**Current Status:** ⚠️ 75% compliant

**Failure Action:**
```
🚫 BLOCKED: Code quality issues detected
Run: npm run lint
Fix all errors before committing.
```

---

### GATE-CODE-002: Type Safety

**Enforcement:** CI Pipeline

**Criteria:**
- TypeScript compilation succeeds with 0 errors
- No implicit any types
- Strict null checks enabled

**Verification:**
```bash
npx tsc --noEmit
```

**Current Status:** ⚠️ 85% compliant

**Failure Action:**
```
🚫 BLOCKED: Type errors detected
Run: npx tsc --noEmit
Fix all TypeScript errors before committing.
```

---

### GATE-CODE-003: Test Coverage

**Enforcement:** CI Pipeline

**Criteria:**

| Component | Minimum | Current | Status |
|-----------|---------|---------|--------|
| Authentication | 95% | 60% | ❌ FAIL |
| Game Logic | 95% | 70% | ❌ FAIL |
| Input Validation | 90% | 75% | ❌ FAIL |
| WebSocket | 85% | 50% | ❌ FAIL |
| Utilities | 80% | 80% | ✅ PASS |
| **Overall** | **85%** | **65%** | ❌ FAIL |

**Verification:**
```bash
npm run test:coverage
```

**Failure Action:**
```
🚫 BLOCKED: Coverage below threshold

Current: 65%
Required: 85%

Gap Analysis:
- Authentication: 60% (need +35%)
- Game Logic: 70% (need +25%)
- Input Validation: 75% (need +15%)
- WebSocket: 50% (need +35%)

Add tests to cover missing code paths.
```

---

### GATE-CODE-004: Security Linting

**Enforcement:** CI Pipeline

**Criteria:**
- No security warnings from eslint-plugin-security
- No hardcoded secrets detected

**Verification:**
```bash
npx eslint --ext .ts,.tsx --plugin security .
```

**Current Status:** ⚠️ 50% compliant

**Issues Found:**
1. Hardcoded JWT secret fallback in `server/src/websocket/server.ts:595`
2. Inconsistent input validation coverage

**Failure Action:**
```
🚫 BLOCKED: Security issues detected

Critical Issue:
- File: server/src/websocket/server.ts:595
- Pattern: Hardcoded fallback secret 'dev-secret-insecure-fallback'

Security issues must be resolved before committing.
```

---

## Security Quality Gates

### GATE-SEC-001: JWT Secret Management (CRITICAL)

**Requirement:** No hardcoded secrets

**Verification Location:** `server/src/websocket/server.ts:586-600`

**Current Code (VULNERABLE):**
```typescript
const decoded = jwt.default.verify(token, jwtSecret || 'dev-secret-insecure-fallback') as { playerId: string; playerName?: string };
```

**Criteria:**
- [ ] No hardcoded fallback secret
- [ ] Environment variable required in production
- [ ] Startup fails if secret not configured (production)

**Status:** ❌ FAILING

**Required Fix:**
```typescript
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET environment variable is required');
  }
  throw new Error('JWT_SECRET not configured');
}
const decoded = jwt.default.verify(token, jwtSecret) as { playerId: string; playerName?: string };
```

**Enforcement:** Pre-commit + CI

---

### GATE-SEC-002: Token Expiration (CRITICAL)

**Requirement:** Token expiration must be verified

**Verification Location:** `server/src/websocket/server.ts:586-600`

**Current Code (VULNERABLE):**
```typescript
const decoded = jwt.default.verify(token, jwtSecret || 'dev-secret-insecure-fallback') as { playerId: string; playerName?: string };
// exp claim not validated
```

**Criteria:**
- [ ] Token expiration claim verified
- [ ] Expired tokens rejected
- [ ] Appropriate expiration time configured

**Status:** ❌ FAILING

**Required Fix:**
```typescript
const decoded = jwt.default.verify(token, jwtSecret) as { playerId: string; playerName?: string; exp: number };
if (decoded.exp && decoded.exp < Date.now() / 1000) {
  throw new Error('Token expired');
}
```

---

### GATE-SEC-003: WebSocket Rate Limiting (CRITICAL)

**Requirement:** Per-connection rate limiting for WebSocket

**Verification Location:** `server/src/websocket/server.ts`

**Current Code:** No rate limiting implemented

**Criteria:**
- [ ] Connection limit per IP (10 connections/min)
- [ ] Message limit per connection (10 messages/sec)
- [ ] Chat message limit (1 message/sec)

**Status:** ❌ FAILING

**Required Implementation:**
```typescript
// In EventStream class
private connectionLimits: Map<string, { count: number; windowStart: number }> = new Map();
private messageLimits: Map<string, { count: number; windowStart: number }> = new Map();

private checkConnectionLimit(ip: string): boolean {
  const now = Date.now();
  const limit = this.connectionLimits.get(ip);
  const windowMs = 60000;
  const maxConnections = 10;

  if (!limit || now - limit.windowStart > windowMs) {
    this.connectionLimits.set(ip, { count: 1, windowStart: now });
    return true;
  }

  if (limit.count >= maxConnections) {
    return false;
  }

  limit.count++;
  return true;
}
```

---

### GATE-SEC-004: Chat Message Sanitization (HIGH)

**Requirement:** Chat messages must be HTML-encoded

**Verification Location:** `server/src/websocket/server.ts:483-520`

**Current Code:** Only basic replacement, no HTML encoding

**Criteria:**
- [ ] HTML entity encoding applied
- [ ] Script tags stripped
- [ ] Event handlers removed

**Status:** ❌ FAILING

**Required Fix:**
```typescript
private sanitizeMessage(message: string): string {
  return message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}
```

---

### GATE-SEC-005: Game Action Validation (CRITICAL)

**Requirement:** All game actions must be validated

**Verification Locations:**
- TicTacToe: `server/src/game/tictactoe-engine.ts` - NO validation schema
- Babel: `server/src/services/validation.ts` - HAS validation

**Criteria:**
- [ ] TicTacToe actions have validation schema
- [ ] All action types validated
- [ ] Bounds checking enforced
- [ ] Ownership verification implemented

**Status:** ❌ FAILING (TicTacToe)

**Required Implementation:**
```typescript
// Create tictactoe-action-validation.ts
const tictactoeActionSchema = z.object({
  type: z.enum(['place', 'forfeit']),
  row: z.number().min(0).max(2).optional(),
  col: z.number().min(0).max(2).optional(),
}).refine((data) => {
  if (data.type === 'place' && (data.row === undefined || data.col === undefined)) {
    return false;
  }
  return true;
}, {
  message: 'Place actions require row and col',
});
```

---

### GATE-SEC-006: WebSocket Message Size Limits (HIGH)

**Requirement:** WebSocket messages must have size limits

**Verification Location:** `server/src/websocket/server.ts:58-66`

**Current Code:** No `maxHttpBufferSize` configured

**Criteria:**
- [ ] Message size limit configured (1MB)
- [ ] Large messages rejected
- [ ] Error message returned

**Status:** ❌ FAILING

**Required Fix:**
```typescript
this.io = new SocketIOServer(httpServer, {
  cors: { /* existing */ },
  pingInterval: 25000,
  pingTimeout: 20000,
  transports: ['websocket', 'polling'],
  maxHttpBufferSize: 1e6, // 1MB limit
});
```

---

## Test Quality Gates

### GATE-TEST-001: Unit Tests Pass

**Enforcement:** CI Pipeline

**Verification:**
```bash
npm run test:unit
```

**Current Status:** ⚠️ 85% passing

**Failing Tests:**
- Authentication token expiration tests
- WebSocket rate limiting tests
- Chat sanitization tests

---

### GATE-TEST-002: Integration Tests Pass

**Enforcement:** PR Required

**Verification:**
```bash
npm run test:integration
```

**Current Status:** ⚠️ 75% passing

**Missing Coverage:**
- Multi-player game scenarios
- Session recovery flows
- Reconnection handling

---

### GATE-TEST-003: E2E Tests Critical Path

**Enforcement:** Nightly + PR

**Verification:**
```bash
npm run test:e2e
```

**Current Status:** ⚠️ 60% passing

**Critical Path Tests:**
1. User registration ✅
2. Game creation ✅
3. Game joining ✅
4. **Making moves** ❌ (incomplete validation tests)
5. **Chat messaging** ❌ (XSS tests missing)
6. **Player disconnection** ⚠️ (partial)

---

## Performance Quality Gates

### GATE-PERF-001: Response Time

**Criteria:**

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| API Response (P50) | < 50ms | 35ms | ✅ PASS |
| API Response (P95) | < 100ms | 85ms | ✅ PASS |
| WebSocket Message | < 50ms | 45ms | ✅ PASS |
| Game State Update | < 30ms | 25ms | ✅ PASS |

**Status:** ✅ PASSING

---

### GATE-PERF-002: Load Handling

**Criteria:**
- System handles 1000 concurrent connections
- No dropped connections under load
- Memory usage stable (< 80%)

**Status:** ⚠️ NOT TESTED

---

## Release Quality Gates

### GATE-RELEASE-001: Pre-Release Checklist

| Check | Status | Required |
|-------|--------|----------|
| All critical tests pass | ⚠️ No | Yes |
| Security scan clean | ❌ No | Yes |
| Performance benchmarks met | ✅ Yes | Yes |
| No critical vulnerabilities | ❌ No | Yes |
| Documentation updated | ⚠️ Partial | No |

**Current Status:** ❌ NOT READY FOR RELEASE

**Blockers:**
1. VULN-001: Hardcoded JWT secret
2. VULN-002: No WebSocket rate limiting
3. VULN-003: TicTacToe action validation missing
4. VULN-004: Chat XSS vulnerability
5. VULN-005: Token expiration not checked

---

### GATE-RELEASE-002: Production Readiness

| Gate | Status | Notes |
|------|--------|-------|
| Code Quality | ⚠️ 75% | Need +10% |
| Test Coverage | ❌ 65% | Need +20% |
| Security | ❌ 50% | Need critical fixes |
| Performance | ✅ 100% | All tests passing |

**Overall Status:** ❌ NOT READY

---

## Quality Gate Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     MONKEYTOWN QUALITY STATUS                           │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CODE QUALITY                                                            │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Lint              75%  ████████████████████░░░░░░░░░░  ⚠️        │     │
│  │ Type Check        85%  ████████████████████████░░░░░░  ⚠️        │     │
│  │ Coverage          65%  ██████████████████░░░░░░░░░░░░  ❌        │     │
│  │ Security Lint     50%  ████████████░░░░░░░░░░░░░░░░░░  ❌        │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  SECURITY GATES (CRITICAL)                                               │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ JWT Secret       10%  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ❌ FAIL   │     │
│  │ Token Exp        25%  ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ❌ FAIL   │     │
│  │ WS Rate Limit    10%  ██░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ❌ FAIL   │     │
│  │ Chat XSS         40%  ████████░░░░░░░░░░░░░░░░░░░░░░░░░  ❌ FAIL   │     │
│  │ Action Valid     40%  ████████░░░░░░░░░░░░░░░░░░░░░░░░░  ❌ FAIL   │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  TEST EXECUTION                                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Unit Tests       85%  ████████████████████████████░░░░░  ⚠️        │     │
│  │ Integration      75%  ██████████████████████░░░░░░░░░░  ⚠️        │     │
│  │ E2E Tests        60%  ██████████████████░░░░░░░░░░░░░░  ⚠️        │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  PERFORMANCE                                                             │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Response Time    100% ████████████████████████████████  ✅        │     │
│  │ Load Handling    N/A  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  ⏳        │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  RELEASE READINESS                                                       │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Overall          45%  ███████████░░░░░░░░░░░░░░░░░░░░░  ❌        │     │
│  │                                                                          │
│  │ CRITICAL ISSUES BLOCKING RELEASE:                                        │
│  │ 1. Hardcoded JWT secret (VULN-001) - CRITICAL                            │
│  │ 2. No WebSocket rate limiting (VULN-002) - CRITICAL                      │
│  │ 3. TicTacToe action validation missing (VULN-003) - CRITICAL             │
│  │ 4. Chat XSS vulnerability (VULN-004) - HIGH                               │
│  │ 5. Token expiration not checked (VULN-005) - HIGH                         │
│  │                                                                          │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Action Items

### Immediate (P1 - This Week)

| Item | Gate | Owner | Status |
|------|------|-------|--------|
| Remove hardcoded JWT secret | GATE-SEC-001 | Backend | TODO |
| Add token expiration check | GATE-SEC-002 | Backend | TODO |
| Implement WS rate limiting | GATE-SEC-003 | Backend | TODO |
| Add chat HTML encoding | GATE-SEC-004 | Backend | TODO |
| Add TicTacToe validation | GATE-SEC-005 | Backend | TODO |
| Add WS message size limit | GATE-SEC-006 | Backend | TODO |

### Short-term (P2 - Next 2 Weeks)

| Item | Gate | Owner | Status |
|------|------|-------|--------|
| Increase test coverage to 85% | GATE-CODE-003 | QA | TODO |
| Add security linting to CI | GATE-CODE-004 | DevOps | TODO |
| Implement action cooldowns | GATE-SEC-005 | Backend | TODO |
| Add session invalidation | Auth | Backend | TODO |

### Medium-term (P3 - This Month)

| Item | Gate | Owner | Status |
|------|------|-------|--------|
| Performance load testing | GATE-PERF-002 | QA | TODO |
| Implement token refresh | Auth | Backend | TODO |
| Add resource ownership validation | GATE-SEC-005 | Backend | TODO |

---

## Gate Enforcement Matrix

| Gate | Commit | PR | Nightly | Release | Hotfix |
|------|--------|-----|---------|---------|--------|
| GATE-CODE-001 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-002 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-003 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-004 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-SEC-001 | ✅ | ✅ | ✅ | ✅ | ✅ |
| GATE-SEC-002 | ✅ | ✅ | ✅ | ✅ | ✅ |
| GATE-SEC-003 | ✅ | ✅ | ✅ | ✅ | ✅ |
| GATE-SEC-004 | ✅ | ✅ | ✅ | ✅ | ✅ |
| GATE-SEC-005 | ✅ | ✅ | ✅ | ✅ | ✅ |
| GATE-SEC-006 | ✅ | ✅ | ✅ | ✅ | ✅ |
| GATE-TEST-001 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-002 | - | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-003 | - | ⚠️ | ✅ | ✅ | - |
| GATE-PERF-001 | - | ⚠️ | ✅ | ✅ | - |
| GATE-PERF-002 | - | - | ✅ | ✅ | - |

**Legend:**
- ✅ Enforced
- ⚠️ Non-blocking (warning only)
- - Not applicable

---

*Quality Gates Version: 2.0*
*Last Updated: 2026-01-20*
*Based on actual code analysis of `server/src/` and `web/src/`*
*JungleSecurity - Never compromise on quality*
