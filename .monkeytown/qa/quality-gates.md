# Monkeytown Quality Gates v2.0

**Mandatory quality criteria for all code and releases**

**Version:** 2.0
**Date:** 2026-01-19
**Agent:** JungleSecurity

---

## Code Quality Gates

### GATE-CODE-001: Lint Pass

**Enforcement:** CI Pipeline (`.github/workflows/ci-cd.yml:26-43`)

```yaml
lint:
  name: Lint & Type Check
  runs-on: ubuntu-latest
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    - name: Install dependencies
      run: npm ci
    - name: Run lint
      run: npm run lint
    - name: Run type check
      run: npm run build
```

**Criteria:**
- ESLint passes with 0 errors
- No TypeScript type errors
- Prettier formatting compliant

**Failure Action:**
```
🚫 BLOCKED: Code quality issues detected

Run: npm run lint

Fix all errors before committing.
```

---

### GATE-CODE-002: Type Safety

**Enforcement:** CI Pipeline (same job as GATE-CODE-001)

**Criteria:**
- TypeScript compilation succeeds with 0 errors
- No implicit any types
- Strict null checks enabled

**Failure Action:**
```
🚫 BLOCKED: Type errors detected

Run: npm run build

Fix all TypeScript errors before committing.
```

---

### GATE-CODE-003: Test Coverage

**Enforcement:** CI Pipeline (`npm test`)

**Criteria:**

| Component | Minimum Coverage |
|-----------|-----------------|
| Authentication | 95% |
| Game Logic | 95% |
| Input Validation | 90% |
| Data Access | 85% |
| Utilities | 80% |
| **Overall** | **80%** |

**Test Framework:** Vitest

**Failure Action:**
```
🚫 BLOCKED: Coverage below threshold

Current: 78%
Required: 80%

Add tests to cover missing code paths.
```

---

### GATE-CODE-004: Security Linting

**Enforcement:** Manual/Security Pipeline

**Criteria:**
- No hardcoded secrets detected
- No use of dangerous functions
- No 'dev-secret' or similar patterns in `server/src/websocket/server.ts`

**Specific Check:**
```bash
# Must not find 'dev-secret' in production code
grep -r "dev-secret" server/src/websocket/ || echo "✅ No hardcoded secrets"
```

**Failure Action:**
```
🚫 BLOCKED: Security issues detected

Hardcoded secret found in server/src/websocket/server.ts

Remove hardcoded secrets immediately.
```

---

## Test Quality Gates

### GATE-TEST-001: Unit Tests Pass

**Enforcement:** CI Pipeline (`.github/workflows/ci-cd.yml:48-66`)

```yaml
test:
  name: Run Tests
  runs-on: ubuntu-latest
  needs: lint
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache: 'npm'
    - name: Install dependencies
      run: npm ci
    - name: Run tests
      run: npm test --if-present
```

**Criteria:**
- All unit tests pass (0 failures)
- No flaky tests
- Test execution time < 5 minutes

**Test Framework:** Vitest

**Failure Action:**
```
🚫 BLOCKED: Unit tests failed

Run: npm test

Fix failing tests before committing.
```

---

### GATE-TEST-002: E2E Tests Critical Pass

**Enforcement:** CI Pipeline PR + Scheduled (`.github/workflows/ci-cd.yml:68-145`)

```yaml
e2e-tests:
  name: Run E2E Tests
  runs-on: ubuntu-latest
  needs: test
  if: github.event_name == 'pull_request'
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        cache-dependency-path: 'web/package-lock.json'
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright browsers
      run: npx playwright install chromium --with-deps
    - name: Build web application
      run: npm run build
    - name: Run Playwright tests
      run: npx playwright test --project=chromium
```

**Criteria:**

| Test Category | Pass Required | Blocking |
|--------------|---------------|----------|
| Critical Path | 100% | Yes |
| Authentication | 100% | Yes |
| Game Actions | 100% | Yes |
| Security | 100% | Yes |
| Nice-to-have | 90% | No |

**Test Framework:** Playwright

**Failure Action:**
```
⚠️ WARNING: E2E tests need attention

Critical tests: 100% ✅
All tests: 87% (2 failures)

Review failures and fix in next 24 hours.
```

---

## Security Quality Gates

### GATE-SEC-001: Vulnerability Scan

**Enforcement:** CI Pipeline + Scheduled

**Criteria:**

| Severity | Threshold | Action |
|----------|-----------|--------|
| Critical | 0 | BLOCK |
| High | 0 | BLOCK |
| Medium | Report only | WARN |
| Low | Report only | INFO |

**Tools:** npm audit, Snyk

**Failure Action:**
```
🚫 BLOCKED: Security vulnerabilities detected

Critical: 2 found
High: 5 found

Resolve critical and high vulnerabilities before merge.
Run: npm audit fix
```

---

### GATE-SEC-002: JWT Secret Validation (NEW)

**Enforcement:** Pre-commit + CI

**Criteria:**
- No 'dev-secret' or fallback secrets in `server/src/websocket/server.ts`
- JWT_SECRET must be validated at startup

**Check:**
```bash
# Pre-commit hook check
if grep -q "dev-secret" server/src/websocket/server.ts; then
  echo "❌ ERROR: Hardcoded JWT secret found"
  exit 1
fi
```

**Failure Action:**
```
🚫 BLOCKED: Hardcoded JWT secret detected

File: server/src/websocket/server.ts:223
Pattern: 'dev-secret'

This is a critical security vulnerability.
Remove hardcoded fallback immediately.
```

---

### GATE-SEC-003: Secret Scanning

**Enforcement:** Pre-commit + CI

**Criteria:**
- No secrets in code
- No secrets in commits
- Baseline maintained and updated

**Tool:** detect-secrets

**Failure Action:**
```
🚫 BLOCKED: Potential secrets detected

Secrets found:
- File: server/src/auth.ts, line 42
- Pattern: AWS_ACCESS_KEY

Remove secrets from code immediately.
```

---

## Performance Quality Gates

### GATE-PERF-001: Response Time

**Enforcement:** CI Pipeline (performance tests)

**Criteria:**

| Metric | Target | Threshold |
|--------|--------|-----------|
| API Response (P50) | < 50ms | < 100ms |
| API Response (P95) | < 100ms | < 200ms |
| WebSocket Message | < 50ms | < 100ms |
| Game State Update | < 30ms | < 60ms |

**Failure Action:**
```
⚠️ WARNING: Performance degradation detected

P95 API Response: 180ms (target: 100ms)
P95 WebSocket: 95ms (target: 100ms)

Review performance report and optimize.
```

---

### GATE-PERF-002: Load Handling

**Enforcement:** Scheduled (nightly)

**Criteria:**
- System handles 1000 concurrent connections
- No dropped connections under load
- Memory usage stable (< 80%)

**Failure Action:**
```
🚨 ALERT: Load test failure

Failed to handle 1000 concurrent connections
Dropped connections: 45
Memory usage: 92%

Investigate immediately. System may not handle peak load.
```

---

## Release Quality Gates

### GATE-RELEASE-001: Staging Deployment

**Criteria:**
- All CI gates pass
- Automated tests pass on staging
- Manual smoke tests pass
- No critical bugs in staging

**Verification:**
```bash
# Smoke test script
#!/bin/bash

# 1. Health check
curl -f http://staging.example.com/health

# 2. Auth flow
curl -f -X POST http://staging.example.com/api/login

# 3. Game creation
TOKEN=$(get_test_token)
curl -f -X POST http://staging.example.com/api/games \
  -H "Authorization: Bearer $TOKEN"

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
| Feature flags set correctly | ✅ | Yes |

---

## Quality Gate Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     MONKEYTOWN QUALITY GATES v2.0                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CODE QUALITY                                                            │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Lint         ████████████████████████████ 100%                 │     │
│  │ Type Check   ████████████████████████████ 100%                 │     │
│  │ Coverage     ██████████████████████░░░░░ 80%                   │     │
│  │ Security     ████████████████░░░░░░░░░░░░░░ 70% ⚠️  P1 items  │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  TEST QUALITY                                                            │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Unit Tests   ████████████████████████████ 100%  ✅ PASS        │     │
│  │ E2E Tests    ████████████████████████████ 100%  ✅ PASS        │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  SECURITY                                                                │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Vulnerabilities ████████░░░░░░░░░░░░░░░░░░ 2 Critical         │     │
│  │ JWT Validation █░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0%   ❌ P1        │     │
│  │ Rate Limiting  █░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0%   ❌ P1        │     │
│  │ Chat Sanitize  █░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0%   ❌ P1        │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  PERFORMANCE                                                             │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Response P50   35ms ████████████████████████████               │     │
│  │ Response P95   85ms ████████████████████████████               │     │
│  │ Load Test      PASS ████████████████████████████               │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  RELEASE STATUS                                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Staging       READY  Next: v2.1.0                              │     │
│  │ Production    v2.0.0  Last: 2026-01-19                         │     │
│  │ Hotfixes      0      (All clear)                               │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  Overall Status: ⚠️  REVIEW REQUIRED - P1 Security Items                │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Gate Enforcement Matrix

| Gate | Commit | PR | Nightly | Release | Hotfix |
|------|--------|-----|---------|---------|--------|
| GATE-CODE-001 (Lint) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-002 (Type) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-003 (Tests) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-004 (Security) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-001 (Unit) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-002 (E2E) | - | ✅ | ✅ | ✅ | - |
| GATE-SEC-001 (Vuln Scan) | ✅ | ✅ | ✅ | ✅ | ✅ |
| GATE-SEC-002 (JWT) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-SEC-003 (Secrets) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-PERF-001 (Response) | - | ⚠️ | ✅ | ✅ | - |
| GATE-PERF-002 (Load) | - | - | ✅ | ✅ | - |

**Legend:**
- ✅ Enforced
- ⚠️ Non-blocking (warning only)
- - Not applicable

---

## P1 Security Gates (Critical)

The following gates are **BLOCKING** for all commits until P1 vulnerabilities are fixed:

| Gate | Vulnerability | Location | Status |
|------|---------------|----------|--------|
| GATE-SEC-002 | JWT Secret Fallback | `server/src/websocket/server.ts:223` | ❌ FAILING |
| GATE-CODE-004 | Hardcoded Secret | Security lint check | ❌ FAILING |
| GATE-SEC-001 | Vulnerability Scan | npm audit | ⚠️ CHECK |

**Action Required:**
1. Remove hardcoded JWT secret fallback
2. Add JWT_SECRET validation at startup
3. Pass security lint checks
4. Resolve all critical/high vulnerabilities

---

## Exceptions Process

**When a gate cannot be met:**

1. **Document Exception**
   ```markdown
   ## Quality Gate Exception Request
   
   **Gate:** GATE-SEC-002 (JWT Validation)
   
   **Reason:** Development mode requires fallback for testing
   
   **Risk Assessment:** Low - only in development environment
   
   **Mitigation:** Validation enforced in production builds
   
   **Approvers:** 2 required
   - [ ] Security Lead
   - [ ] Tech Lead
   ```

2. **Approval Required**
   - 2 approvals for non-critical gates
   - Security Lead + Tech Lead for security gates

3. **Time Limit**
   - Exception valid for 7 days maximum
   - Must be resolved in next sprint

---

*Quality Gates Version: 2.0*
*Last Updated: 2026-01-19*
*Next Review: 2026-02-19*
*JungleSecurity - Based on actual CI/CD configuration and verified code*
