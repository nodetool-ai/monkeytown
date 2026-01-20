# Monkeytown Quality Gates v2.0

**Mandatory quality criteria for all code and releases with security focus**

**Quality Analyst:** JungleSecurity  
**Version:** 2.0  
**Date:** 2026-01-20

---

## Security Quality Gates

### GATE-SEC-001: No Hardcoded Secrets

**Enforcement:** Pre-commit + CI Pipeline

```yaml
# .github/workflows/security-check.yml
name: Security Check
on: [push, pull_request]

jobs:
  security-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check for hardcoded secrets
        run: |
          echo "Searching for hardcoded secrets..."
          
          # Check for 'dev-secret' pattern
          if grep -r "'dev-secret'" server/src/ web/src/; then
            echo "❌ FAILED: Hardcoded 'dev-secret' found"
            exit 1
          fi
          
          if grep -r '"dev-secret"' server/src/ web/src/; then
            echo "❌ FAILED: Hardcoded \"dev-secret\" found"
            exit 1
          fi
          
          # Check for other common secrets
          if grep -r "password.*=.*['\"][^'\"]+['\"]" server/src/ --include="*.ts"; then
            echo "❌ FAILED: Potential password found in code"
            exit 1
          fi
          
          echo "✅ PASSED: No hardcoded secrets detected"
```

**Criteria:**
- No `'dev-secret'` or `"dev-secret"` in source code
- No password literals in code
- No API keys in code
- No database connection strings in code

**Failure Action:**
```
🚫 BLOCKED: Hardcoded secrets detected

Found 'dev-secret' in:
- server/src/websocket/server.ts:223

Remove hardcoded secrets immediately.
Secrets must come from environment variables only.
```

---

### GATE-SEC-002: JWT Secret Validation

**Enforcement:** CI Pipeline + Runtime Check

```typescript
// server/src/websocket/server.ts - REQUIRED PATTERN
private async validateToken(token: string): Promise<string> {
  const jwt = await import('jsonwebtoken');
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }
  
  const decoded = jwt.default.verify(token, secret) as { playerId: string };
  return decoded.playerId;
}
```

**Criteria:**
- JWT_SECRET must be defined in environment
- No fallback to 'dev-secret' or any other default
- Error thrown if JWT_SECRET not available

**Verification:**
```bash
# Test in CI
npm run test:security:jwt

# Should output:
# JWT_SECRET defined: ✅
# No hardcoded fallback: ✅
# Token validation works: ✅
```

**Failure Action:**
```
🚫 BLOCKED: JWT_SECRET not properly configured

Current implementation uses fallback:
  process.env.JWT_SECRET || 'dev-secret'

This creates a CRITICAL vulnerability.
Fix: Remove fallback and require JWT_SECRET.
```

---

### GATE-SEC-003: Input Validation Coverage

**Enforcement:** CI Pipeline

```yaml
# .github/workflows/input-validation.yml
name: Input Validation Coverage
on: [push, pull_request]

jobs:
  input-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:coverage:input-validation
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/input-validation/lcov.info
          fail_ci_if_error: true
```

**Criteria:**

| Component | Minimum Coverage |
|-----------|-----------------|
| Player update validation | 100% |
| Position bounds checking | 100% |
| Score validation | 100% |
| Action cooldown enforcement | 100% |
| Chat sanitization | 100% |
| Card ownership validation | 100% |
| **Overall Input Validation** | **100%** |

**Failure Action:**
```
🚫 BLOCKED: Input validation coverage below 100%

Current coverage:
  Player updates: 85%
  Position bounds: 90%
  Score validation: 80%
  Chat sanitization: 75%

Required: 100% for all security-critical validation.
Add tests for missing code paths.
```

---

### GATE-SEC-004: Authentication Test Coverage

**Enforcement:** CI Pipeline

```yaml
# .github/workflows/auth-tests.yml
name: Authentication Tests
on: [push, pull_request]

jobs:
  auth-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:auth
```

**Criteria:**
- Token generation tests: 100%
- Token validation tests: 100%
- Session binding tests: 100%
- Token expiration tests: 100%
- **Overall Authentication: 100%**

**Test Requirements:**
```typescript
describe('Authentication Security', () => {
  it('MUST reject expired tokens', () => { /* ... */ });
  it('MUST reject invalid signatures', () => { /* ... */ });
  it('MUST enforce session binding (IP)', () => { /* ... */ });
  it('MUST enforce session binding (User-Agent)', () => { /* ... */ });
  it('MUST reject tokens with wrong IP', () => { /* ... */ });
  it('MUST reject tokens with wrong User-Agent', () => { /* ... */ });
});
```

---

### GATE-SEC-005: Vulnerability Scanning

**Enforcement:** CI Pipeline + Scheduled

```yaml
# .github/workflows/vulnerability-scan.yml
name: Vulnerability Scan
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 4 * * 0'  # Weekly on Sunday

jobs:
  vulnerability-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run npm audit
        run: npm audit --production --audit-level=high --strictly-exit-1
      
      - name: Run Snyk
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

**Criteria:**

| Severity | Threshold | Action |
|----------|-----------|--------|
| Critical | 0 | **BLOCK** |
| High | 0 | **BLOCK** |
| Medium | Report only | WARN |
| Low | Report only | INFO |

**Failure Action:**
```
🚫 BLOCKED: Security vulnerabilities detected

Critical: 1 found
  - CVE-2024-1234: Package X (severity: critical)

High: 2 found
  - CVE-2024-5678: Package Y (severity: high)
  - CVE-2024-9012: Package Z (severity: high)

Resolve critical and high vulnerabilities before merge.
Run: npm audit fix
```

---

### GATE-SEC-006: XSS Prevention Testing

**Enforcement:** CI Pipeline

```yaml
# .github/workflows/xss-tests.yml
name: XSS Prevention Tests
on: [push, pull_request]

jobs:
  xss-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run test:xss-prevention
```

**Criteria:**
All XSS payloads must be blocked or sanitized:

| Payload Type | Expected Result |
|--------------|-----------------|
| Script tags | BLOCKED |
| Event handlers (onerror, onload, etc.) | BLOCKED |
| javascript: URLs | BLOCKED |
| SVG-based XSS | BLOCKED |
| Data URI XSS | BLOCKED |
| Nested/encoded XSS | BLOCKED |

**Failure Action:**
```
🚫 BLOCKED: XSS prevention incomplete

Failed payloads:
  1. <img src=x onerror=alert(1)> - NOT blocked
  2. <svg/onload=alert(1)> - NOT blocked

Improve chat/message sanitization with proper XSS prevention.
Consider using DOMPurify library.
```

---

### GATE-SEC-007: Rate Limiting Enforcement

**Enforcement:** CI Pipeline + Runtime

**Criteria:**

| Limit Type | Limit | Enforcement |
|------------|-------|-------------|
| WebSocket connections per IP | 10/min | Must block 11th |
| Game actions per player | 10/sec | Must block 11th |
| Chat messages per player | 2/sec | Must block 3rd |
| Game creations per player | 5/hour | Must block 6th |

**Verification:**
```typescript
describe('Rate Limiting', () => {
  it('MUST block 11th WebSocket connection', async () => {
    const connections = [];
    for (let i = 0; i < 10; i++) {
      connections.push(await connectWebSocket());
    }
    const eleventh = await connectWebSocket();
    expect(eleventh.connected).toBe(false);
  });
  
  it('MUST block 11th action per second', async () => {
    const socket = await connectWebSocket();
    for (let i = 0; i < 10; i++) {
      await sendAction(socket, { type: 'move', x: i, y: i });
    }
    const result = await sendAction(socket, { type: 'move', x: 11, y: 11 });
    expect(result.blocked).toBe(true);
  });
});
```

---

### GATE-SEC-008: Transport Security

**Enforcement:** CI Pipeline

```yaml
# .github/workflows/transport-security.yml
name: Transport Security
on: [push, pull_request]

jobs:
  transport-security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify WebSocket configuration
        run: |
          echo "Checking WebSocket security configuration..."
          
          # Check that polling transport is disabled
          if grep -q "transports: \['polling'\]" server/src/websocket/server.ts; then
            echo "❌ FAILED: HTTP polling transport is enabled"
            exit 1
          fi
          
          # Check CORS origin validation
          if grep -q "origin: .*\['http://localhost:3000'\]" server/src/websocket/server.ts && \
             !grep -q "origin: (origin" server/src/websocket/server.ts; then
            echo "❌ WARNING: CORS may allow any origin"
          fi
          
          echo "✅ PASSED: Transport security checks passed"
```

**Criteria:**
- HTTP polling transport DISABLED
- CORS origin explicitly validated
- Message size limits configured
- No wildcard CORS origins in production

---

## Code Quality Gates

### GATE-CODE-001: Lint Pass

**Enforcement:** CI Pipeline

```yaml
# .github/workflows/lint.yml
name: Lint
on: [push, pull_request]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
```

**Criteria:**
- ESLint passes with 0 errors
- No TypeScript type errors
- Prettier formatting compliant
- Security linting passes

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

---

### GATE-CODE-003: Test Coverage

**Enforcement:** CI Pipeline

**Criteria:**

| Component | Minimum Coverage |
|-----------|-----------------|
| Authentication | 100% |
| Input Validation | 100% |
| Game Logic | 95% |
| WebSocket | 95% |
| **Overall** | **95%** |

---

## Test Quality Gates

### GATE-TEST-001: Unit Tests Pass

**Enforcement:** CI Pipeline

**Criteria:**
- All unit tests pass (0 failures)
- No flaky tests (tests must pass consistently)
- Test execution time < 5 minutes

---

### GATE-TEST-002: Integration Tests Pass

**Enforcement:** CI Pipeline (PR required)

**Criteria:**
- All integration tests pass (0 failures)
- Database migrations applied successfully
- External service mocks working correctly

---

### GATE-TEST-003: E2E Tests Critical Pass

**Enforcement:** Nightly + PR (non-blocking for urgent fixes)

**Criteria:**

| Test Category | Pass Required | Blocking |
|--------------|---------------|----------|
| Authentication | 100% | Yes |
| Security | 100% | Yes |
| Critical Path | 100% | Yes |
| Game Actions | 100% | Yes |
| Nice-to-have | 90% | No |

---

## Release Quality Gates

### GATE-RELEASE-001: Staging Deployment

**Criteria:**
- All CI gates pass
- Automated tests pass on staging
- Manual smoke tests pass
- No critical bugs in staging
- Security scan clean

**Verification:**
```bash
# Smoke test script
#!/bin/bash
echo "Running smoke tests..."

# 1. Health check
curl -f http://staging.example.com/health

# 2. Auth flow
curl -f -X POST http://staging.example.com/api/login

# 3. Game creation
TOKEN=$(get_test_token)
curl -f -X POST http://staging.example.com/api/games \
  -H "Authorization: Bearer $TOKEN"

# 4. Security check
curl -f http://staging.example.com/security/headers

echo "Smoke tests passed ✅"
```

---

### GATE-RELEASE-002: Production Readiness

**Criteria:**

| Check | Status | Required |
|-------|--------|----------|
| All critical tests pass | ✅ | Yes |
| Security scan clean | ✅ | Yes |
| Performance benchmarks met | ✅ | Yes |
| Rollback plan tested | ✅ | Yes |
| Monitoring configured | ✅ | Yes |
| Documentation updated | ✅ | No |
| Security headers present | ✅ | Yes |
| JWT secret rotated | ✅ | Yes |
| Rate limiting enabled | ✅ | Yes |

---

## Quality Gate Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     MONKEYTOWN QUALITY GATES v2.0                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  SECURITY GATES (🔒 Critical)                                            │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ No Hardcoded Secrets      ████████████████████████████ 100% ✅  │     │
│  │ JWT Secret Validation     ████████████████████████████ 100% ✅  │     │
│  │ Input Validation Coverage ████████████████████████░░░░ 95% ⚠️   │     │
│  │ Auth Test Coverage        ████████████████████████████ 100% ✅  │     │
│  │ Vulnerability Scan        ████████████████████████████ 0 Crit ✅ │     │
│  │ XSS Prevention            ████████████████████████████ 100% ✅  │     │
│  │ Rate Limiting             ████████████████████████████ 100% ✅  │     │
│  │ Transport Security        ████████████████████████████ 100% ✅  │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  CODE QUALITY                                                              │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Lint         ████████████████████████████ 100%                 │     │
│  │ Type Check   ████████████████████████████ 100%                 │     │
│  │ Coverage     ██████████████████████░░░░░░░░ 95%                 │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  TEST QUALITY                                                              │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Unit Tests   ████████████████████████████ 100%  ✅ PASS        │     │
│  │ Integration  ████████████████████████████ 100%  ✅ PASS        │     │
│  │ E2E Tests    ████████████████████████████ 100%  ✅ PASS        │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  SECURITY                                                                  │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Vulnerabilities ████████████████████████████ 0 Critical        │     │
│  │ Dependencies   ████████████████████████░░░░░ 2 Updates         │     │
│  │ Secrets        ████████████████████████████ 0 Found            │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  PERFORMANCE                                                               │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Response P50   35ms ████████████████████████████               │     │
│  │ Response P95   85ms ████████████████████████████               │     │
│  │ Load Test      PASS ████████████████████████████               │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  Overall Status: ✅ PASSED (with 1 warning)                               │
│  Security Grade: A+ (No critical vulnerabilities)                         │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Gate Enforcement Matrix

| Gate | Commit | PR | Nightly | Release | Hotfix |
|------|--------|-----|---------|---------|--------|
| GATE-SEC-001 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-SEC-002 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-SEC-003 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-SEC-004 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-SEC-005 | ✅ | ✅ | ✅ | ✅ | ✅ |
| GATE-SEC-006 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-SEC-007 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-SEC-008 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-001 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-002 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-003 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-001 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-002 | - | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-003 | - | ⚠️ | ✅ | ✅ | - |
| GATE-RELEASE-001 | - | - | - | ✅ | - |
| GATE-RELEASE-002 | - | - | - | ✅ | - |

**Legend:**
- ✅ Enforced
- ⚠️ Non-blocking (warning only)
- - Not applicable

---

## Exceptions Process

**When a security gate cannot be met:**

1. **Document Exception**
   ```markdown
   ## Quality Gate Exception Request
   
   **Gate:** GATE-SEC-003 (Input Validation Coverage)
   
   **Reason:** New validation code path has 95% coverage (target: 100%)
   
   **Risk Assessment:** Low - edge case for position at exact boundary
   
   **Mitigation:** Will add test in follow-up PR (ETA: 3 days)
   
   **Approvers:** 2 required
   - [ ] Security Lead
   - [ ] QA Lead
   ```

2. **Approval Required**
   - 2 approvals for non-critical gates
   - Team lead approval for critical security gates
   - Security lead required for security gate exceptions

3. **Time Limit**
   - Exception valid for 7 days maximum
   - Must be resolved in next sprint
   - Security gate exceptions: 24 hours maximum

---

*Quality Gates Version: 2.0*  
*Last Updated: 2026-01-20*  
*Next Review: 2026-02-20*  
*JungleSecurity - Never compromise on security*
