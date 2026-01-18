# Monkeytown Security Coverage Matrix

**Complete mapping of vulnerabilities, tests, and remediation status**

---

## Overview

This document provides a comprehensive view of Monkeytown's security posture, mapping:
- Documented vulnerabilities to their corresponding tests
- Remediation status for each vulnerability
- Test coverage verification
- Gap analysis for remaining security work

---

## Vulnerability to Test Mapping

### Critical Vulnerabilities (CVSS 9.0-10.0)

| Vulnerability | Location | CVSS | Test File | Test IDs | Status |
|---------------|----------|------|-----------|----------|--------|
| VULN-001: Hardcoded JWT Secret | `server/src/websocket/server.ts:151` | 9.1 | `security-tests.ts` | JWT-001 through JWT-003 | **Unpatched** |
| VULN-002: Missing Input Validation | `server/src/game/session.ts:70` | 8.1 | `security-tests.ts` | INP-001 through INP-005 | **Unpatched** |

### High Vulnerabilities (CVSS 7.0-8.9)

| Vulnerability | Location | CVSS | Test File | Test IDs | Status |
|---------------|----------|------|-----------|----------|--------|
| VULN-003: Missing WebSocket Rate Limiting | `server/src/websocket/server.ts:73-116` | 7.5 | `security-tests.ts` | RATE-001, RATE-002 | **Partial** |
| VULN-004: Cross-Site WebSocket Hijacking | `server/src/websocket/server.ts:17-25` | 7.4 | `security-tests.ts` | CORS-001, CORS-002 | **Unpatched** |
| VULN-005: Chat Message XSS | `server/src/websocket/server.ts:105-111` | 7.1 | `security-tests.ts` | XSS-001 through XSS-003 | **Partial** |
| VULN-006: Insecure WebSocket Transport | `server/src/websocket/server.ts:17-25` | 7.0 | `security-tests.ts` | WS-001 | **Unpatched** |

### Medium Vulnerabilities (CVSS 4.0-6.9)

| Vulnerability | Location | CVSS | Test File | Test IDs | Status |
|---------------|----------|------|-----------|----------|--------|
| VULN-007: Redis Key Space Exhaustion | `server/src/services/redis.ts:35-40` | 5.8 | `test-cases.md` | TC-SEC-002 | **Unpatched** |
| VULN-008: Missing Security Headers | `web/src/app/layout.tsx` | 5.3 | `test-cases.md` | Manual review | **Unpatched** |
| VULN-009: No Session Invalidation | `server/src/websocket/server.ts:62-65` | 5.5 | `security-tests.ts` | SESS-001 | **Unpatched** |

### Low Vulnerabilities (CVSS 0.1-3.9)

| Vulnerability | Location | CVSS | Test File | Test IDs | Status |
|---------------|----------|------|-----------|----------|--------|
| VULN-010: Verbose Error Messages | `server/src/websocket/server.ts:44` | 3.7 | `test-cases.md` | Manual review | **Unpatched** |
| VULN-011: Missing Request Size Limits | `server/src/index.ts` | 3.5 | `test-cases.md` | TC-EDGE-003 | **Unpatched** |

---

## Test Coverage by Security Category

### 1. Authentication Security

**Requirements:** AUTH-001, AUTH-002, AUTH-003

| Test | Test ID | Purpose | Automated | Status |
|------|---------|---------|-----------|--------|
| Token generation uniqueness | JWT-001 | Ensure tokens are cryptographically unique | ✅ | Passing |
| Token expiration validation | JWT-002 | Verify expired tokens rejected | ✅ | Passing |
| Invalid signature rejection | JWT-003 | Tokens with wrong secret rejected | ✅ | Passing |
| Missing token rejection | TC-AUTH-004 | Connections without token fail | ✅ | Passing |
| Session binding enforcement | TC-AUTH-005 | Token rejected if IP/UA mismatch | ❌ | **Not Implemented** |
| Concurrent session limits | TC-AUTH-006 | Max 3 sessions per player | ❌ | **Not Implemented** |

**Coverage:** 4/6 tests implemented (67%)

### 2. Input Validation Security

**Requirements:** INP-001, INP-002

| Test | Test ID | Purpose | Automated | Status |
|------|---------|---------|-----------|--------|
| Action type validation | INP-001 | Invalid action types rejected | ✅ | Passing |
| Player ID validation | INP-002 | Malicious player IDs blocked | ✅ | Passing |
| Game ID validation | INP-003 | Invalid game IDs rejected | ✅ | Passing |
| Card ID format validation | INP-004 | Card ID regex enforcement | ✅ | Passing |
| Player update validation | VULN-002-TEST | Arbitrary updates blocked | ❌ | **Not Implemented** |
| SQL injection prevention | TC-SEC-001 | SQL injection blocked | ✅ | Passing |
| XSS in chat | TC-CHAT-002 | XSS payloads sanitized | ✅ | Partial |

**Coverage:** 6/7 tests implemented (86%)

### 3. WebSocket Security

**Requirements:** Custom (per architecture)

| Test | Test ID | Purpose | Automated | Status |
|------|---------|---------|-----------|--------|
| Connection rate limiting | TC-WS-001 | Max 10 connections/IP/min | ❌ | **Not Implemented** |
| Message rate limiting | TC-WS-002 | Max 30 messages/min | ✅ | Passing |
| Heartbeat functionality | TC-WS-003 | Connection health maintained | ✅ | Passing |
| Connection recovery | TC-WS-004 | Reconnection preserves state | ✅ | Passing |
| Transport security | VULN-006-TEST | WebSocket-only transport | ❌ | **Not Implemented** |
| Origin validation | CORS-001 | Cross-origin restrictions | ❌ | **Not Implemented** |
| Credentials security | CORS-002 | Credentials not leaked | ❌ | **Not Implemented** |

**Coverage:** 3/7 tests implemented (43%)

### 4. Session Security

**Requirements:** AUTH-003

| Test | Test ID | Purpose | Automated | Status |
|------|---------|---------|-----------|--------|
| Session creation | TC-GAME-001 | Valid sessions created | ✅ | Passing |
| Session membership | TC-GAME-002 | Only members can access | ✅ | Passing |
| Session expiration | TC-GAME-005 | Inactive sessions expire | ✅ | Passing |
| Session invalidation | SESS-001 | Logout invalidates session | ❌ | **Not Implemented** |
| Full session rejection | TC-GAME-003 | Over-capacity rejected | ✅ | Passing |

**Coverage:** 4/5 tests implemented (80%)

### 5. Data Protection

**Requirements:** DATA-001, DATA-002, DATA-003

| Check | Requirement | Status | Evidence |
|-------|-------------|--------|----------|
| TLS 1.2+ enforced | DATA-001 | ✅ Verified | Nginx configuration |
| WSS required | DATA-001 | ❌ Not Implemented | Polling still allowed |
| PII encryption | DATA-002 | ❌ Not Implemented | No column encryption |
| Session data encryption | DATA-002 | ❌ Not Implemented | Plain text in Redis |
| Data retention policy | DATA-003 | ✅ Documented | 30-day retention |
| Player data export | DATA-003 | ❌ Not Implemented | No export feature |

**Coverage:** 2/6 requirements met (33%)

---

## Remediation Status Summary

### Immediate Priority (P1 - Fix within 1 week)

| Vulnerability | Status | Estimated Effort | Assigned To | Target Date |
|---------------|--------|------------------|-------------|-------------|
| VULN-001: JWT Secret | Unpatched | 2 hours | | |
| VULN-002: Input Validation | Unpatched | 4 hours | | |
| VULN-003: Rate Limiting | Partial | 2 hours | | |
| VULN-005: Chat XSS | Partial | 1 hour | | |

### Short-term Priority (P2 - Fix within 2 weeks)

| Vulnerability | Status | Estimated Effort | Assigned To | Target Date |
|---------------|--------|------------------|-------------|-------------|
| VULN-004: CORS | Unpatched | 1 hour | | |
| VULN-006: Transport | Unpatched | 1 hour | | |
| VULN-007: Redis Limits | Unpatched | 3 hours | | |
| VULN-008: Security Headers | Unpatched | 2 hours | | |

### Standard Priority (P3 - Fix within 1 month)

| Vulnerability | Status | Estimated Effort | Assigned To | Target Date |
|---------------|--------|------------------|-------------|-------------|
| VULN-009: Session Invalidation | Unpatched | 4 hours | | |
| VULN-010: Error Messages | Unpatched | 1 hour | | |
| VULN-011: Request Limits | Unpatched | 2 hours | | |

---

## Test Execution Status

### Automated Security Tests

| Category | Total Tests | Passing | Failing | Coverage |
|----------|-------------|---------|---------|----------|
| Authentication | 15 | 14 | 1 | 93% |
| Input Validation | 20 | 19 | 1 | 95% |
| WebSocket Security | 10 | 7 | 3 | 70% |
| Session Security | 8 | 8 | 0 | 100% |
| Data Protection | 5 | 2 | 3 | 40% |
| **Total** | **58** | **50** | **8** | **86%** |

### Manual Security Tests (Not Yet Automated)

| Test | Description | Frequency | Status |
|------|-------------|-----------|--------|
| Security Headers Review | Verify CSP, HSTS, X-Frame-Options | Weekly | Pending |
| TLS Configuration | Verify TLS 1.2+ and cipher suites | Monthly | Pending |
| Dependency Scan | Check for vulnerable packages | Daily | Automated |
| Secret Scanning | Detect accidental secrets | Per-commit | Automated |

---

## Gap Analysis

### Critical Gaps

1. **Session Binding (AUTH-001)**
   - Missing: IP and User-Agent binding in JWT tokens
   - Risk: Token hijacking via different network
   - Action: Implement context binding in token validation

2. **Transport Security (VULN-006)**
   - Missing: WebSocket-only configuration
   - Risk: Less secure polling transport available
   - Action: Remove 'polling' from allowed transports

3. **Data Encryption (DATA-002)**
   - Missing: Encryption at rest for sensitive data
   - Risk: Data exposure if Redis/DB compromised
   - Action: Implement AES-256-GCM encryption

### High Priority Gaps

4. **CORS Configuration (VULN-004)**
   - Missing: Strict origin validation
   - Risk: Cross-site WebSocket hijacking
   - Action: Whitelist specific origins only

5. **Rate Limiting (VULN-003)**
   - Missing: Per-connection rate limiting at WebSocket layer
   - Risk: DoS via message flooding
   - Action: Implement socket-level rate limiting

### Medium Priority Gaps

6. **Session Invalidation (VULN-009)**
   - Missing: Token blacklist on logout
   - Risk: Stolen tokens remain valid
   - Action: Implement Redis-based token blacklist

7. **Security Headers (VULN-008)**
   - Missing: CSP, HSTS, X-Frame-Options
   - Risk: XSS and clickjacking attacks
   - Action: Configure Next.js security headers

---

## Recommendations

### Immediate Actions

1. **Fix VULN-001 (JWT Secret)**
   ```typescript
   // Before
   jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
   
   // After
   if (!process.env.JWT_SECRET) {
     throw new Error('JWT_SECRET environment variable required');
   }
   jwt.verify(token, process.env.JWT_SECRET)
   ```

2. **Fix VULN-002 (Input Validation)**
   ```typescript
   // Before
   Object.assign(player, updates);
   
   // After
   if (updates.position && !isValidPosition(updates.position)) {
     return false;
   }
   if (typeof updates.score === 'number') {
     updates.score = Math.max(0, Math.min(updates.score, MAX_SCORE));
   }
   player.position = updates.position;
   player.score = updates.score;
   ```

3. **Fix VULN-005 (Chat XSS)**
   ```typescript
   // Before
   message: data.message,
   
   // After
   message: DOMPurify.sanitize(data.message, { ALLOWED_TAGS: [] }),
   ```

### Short-term Actions

4. **Enable WebSocket-only Transport**
   ```typescript
   transports: ['websocket'], // Remove 'polling'
   ```

5. **Implement Session Binding**
   ```typescript
   const decoded = jwt.verify(token, secret) as { playerId, ip, userAgent };
   if (decoded.ip !== currentIp || decoded.userAgent !== currentUa) {
     throw new Error('Session context mismatch');
   }
   ```

6. **Add Rate Limiting at Socket Layer**
   ```typescript
   const RATE_LIMIT = { windowMs: 60000, maxRequests: 30 };
   // Per-socket rate limiting
   ```

### Long-term Actions

7. **Implement Data Encryption**
   - Add AES-256-GCM encryption for sensitive fields
   - Rotate encryption keys quarterly

8. **Add Security Headers**
   - Content-Security-Policy
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - Strict-Transport-Security

---

## Verification Checklist

### Pre-Deployment Security Verification

- [ ] All P1 vulnerabilities fixed
- [ ] Security tests passing (90%+)
- [ ] No critical/high vulnerabilities in dependencies
- [ ] No secrets in repository
- [ ] Security headers configured
- [ ] Rate limiting active
- [ ] Input validation enabled
- [ ] Session binding implemented

### Post-Deployment Verification

- [ ] Health check passes
- [ ] Load testing passes
- [ ] Security monitoring active
- [ ] Alerting configured for security events
- [ ] Logging includes security events

---

*Security Coverage Matrix Version: 1.0*
*Last Updated: 2026-01-18*
*Next Review: 2026-02-18*
*JungleSecurity - Knowing what's protected and what isn't*
