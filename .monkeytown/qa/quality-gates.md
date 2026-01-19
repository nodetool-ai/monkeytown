# Monkeytown Quality Gates v2.1

**Mandatory quality criteria for all code and releases**

**Version:** 2.1
**Date:** 2026-01-19
**QA Lead:** JungleSecurity
**Status:** ACTIVE
**Next Review:** 2026-04-19

---

## Executive Summary

This document defines mandatory quality gates for the Monkeytown platform. All gates must pass before code can be merged, deployed, or released. The gates are derived from security requirements and vulnerability assessments.

**Key Updates in v2.1:**
- Added security linting gates for JWT secret detection
- Enhanced input validation gates
- Added WebSocket security gates
- Updated coverage thresholds for security-critical modules

---

## Code Quality Gates

### GATE-CODE-001: Lint Pass

**Enforcement:** CI Pipeline (every commit, every PR)

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
- No console.log statements in production code

**Failure Action:**
```
🚫 BLOCKED: Code quality issues detected

Run: npm run lint

Fix all errors before committing.
```

---

### GATE-CODE-002: Type Safety

**Enforcement:** CI Pipeline (every commit, every PR)

```yaml
# .github/workflows/typecheck.yml
name: Type Check
on: [push, pull_request]

jobs:
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npx tsc --noEmit
```

**Criteria:**
- TypeScript compilation succeeds with 0 errors
- No implicit any types
- Strict null checks enabled
- No type assertions that bypass type checking

**Failure Action:**
```
🚫 BLOCKED: Type errors detected

Run: npx tsc --noEmit

Fix all TypeScript errors before committing.
```

---

### GATE-CODE-003: Security Linting

**Enforcement:** CI Pipeline (every commit, every PR)
**Priority:** P1 - Critical

```yaml
# .github/workflows/security-lint.yml
name: Security Lint
on: [push, pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - name: Install security plugins
        run: npm install -D eslint-plugin-security eslint-plugin-import
      - name: Run security lint
        run: npx eslint --ext .ts,.tsx --plugin security .
      - name: Check for hardcoded secrets
        run: |
          grep -r "dev-secret\|test-secret\|'secret'" --include="*.ts" server/src/ || echo "No hardcoded secrets found"
```

**Criteria:**
- No security warnings from eslint-plugin-security
- No hardcoded secrets (especially 'dev-secret', 'test-secret')
- No use of dangerous functions (eval, exec, etc.)
- No SQL injection vulnerabilities in queries

**Specific Checks:**
- [ ] No 'dev-secret' or similar fallback secrets
- [ ] No hardcoded API keys or passwords
- [ ] No eval() or exec() usage
- [ ] No SQL query string concatenation

**Failure Action:**
```
🚫 BLOCKED: Security issues detected

CRITICAL: Hardcoded JWT secret fallback detected!
File: server/src/websocket/server.ts:120

Remove hardcoded secrets before committing.
```

---

### GATE-CODE-004: Test Coverage

**Enforcement:** CI Pipeline (every commit, every PR)

```yaml
# .github/workflows/test-coverage.yml
name: Test Coverage
on: [push, pull_request]

jobs:
  coverage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
          fail_ci_if_error: true
```

**Criteria:**

| Component | Minimum Coverage | Priority |
|-----------|-----------------|----------|
| Authentication | **95%** | P1 - Critical |
| Game Logic | **95%** | P1 - Critical |
| Input Validation | **95%** | P1 - Critical |
| Authorization | **95%** | P1 - High |
| WebSocket | **90%** | P1 - High |
| Chat | **90%** | P1 - High |
| Data Access | **85%** | P2 - Medium |
| Utilities | **80%** | P2 - Medium |
| **Overall** | **90%** | P1 - Critical |

**Failure Action:**
```
🚫 BLOCKED: Coverage below threshold

Current: 87%
Required: 90%

Run: npm run test:coverage

Add tests to cover missing code paths.
```

---

## Test Quality Gates

### GATE-TEST-001: Unit Tests Pass

**Enforcement:** CI Pipeline (every commit, every PR)

```yaml
# .github/workflows/unit-tests.yml
name: Unit Tests
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:unit
```

**Criteria:**
- All unit tests pass (0 failures)
- No flaky tests (tests must pass consistently)
- Test execution time < 5 minutes

**Failure Action:**
```
🚫 BLOCKED: Unit tests failed

Run: npm run test:unit

Fix failing tests before committing.
```

---

### GATE-TEST-002: Security Tests Pass

**Enforcement:** CI Pipeline (every PR), Nightly
**Priority:** P1 - Critical

```yaml
# .github/workflows/security-tests.yml
name: Security Tests
on:
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM

jobs:
  security-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - name: Run authentication security tests
        run: npm run test:auth-security
      - name: Run input validation tests
        run: npm run test:input-validation
      - name: Run WebSocket security tests
        run: npm run test:websocket-security
```

**Required Security Tests:**
- TC-AUTH-003: Invalid token signature rejection
- TC-AUTH-006: Hardcoded secret rejection
- TC-ACTION-002: Invalid position rejection
- TC-ACTION-003: Speed hack detection
- TC-WS-001: Connection rate limiting
- TC-WS-002: Message rate limiting
- TC-CHAT-002: XSS payload blocked
- TC-SEC-001: SQL injection prevention
- TC-SEC-006: JWT secret hardcoded check

**Criteria:**
- All security tests pass (0 failures)
- 100% pass rate for critical security tests

**Failure Action:**
```
🚫 BLOCKED: Security tests failed

CRITICAL: Security vulnerability detected!

Failed tests:
- TC-AUTH-003: Token with 'dev-secret' was accepted
- TC-ACTION-002: Invalid position was not rejected

Security issues MUST be fixed before merge.
```

---

### GATE-TEST-003: Integration Tests Pass

**Enforcement:** CI Pipeline (PR required)

```yaml
# .github/workflows/integration-tests.yml
name: Integration Tests
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  integration-tests:
    runs-on: ubuntu-latest
    services:
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
      postgres:
        image: postgres:15-alpine
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:integration
```

**Criteria:**
- All integration tests pass (0 failures)
- Database migrations applied successfully
- External service mocks working correctly
- WebSocket integration tests pass

**Failure Action:**
```
🚫 BLOCKED: Integration tests failed

Run: npm run test:integration

Fix failing integration tests before merge.
```

---

### GATE-TEST-004: E2E Tests Critical Pass

**Enforcement:** Nightly + PR (non-blocking for urgent fixes)

```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests
on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM
  pull_request:
    branches: [main]

jobs:
  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:e2e
```

**Criteria:**

| Test Category | Pass Required | Blocking |
|--------------|---------------|----------|
| Critical Path | 100% | Yes |
| Authentication | 100% | Yes |
| Game Actions | 100% | Yes |
| Security | 100% | Yes |
| Nice-to-have | 90% | No |

**Failure Action:**
```
⚠️ WARNING: E2E tests need attention

Critical tests: 100% ✅
All tests: 87% (2 failures)

Review failures and fix in next 24 hours.

Blocking: No (non-critical tests)
```

---

## Security Quality Gates

### GATE-SEC-001: Vulnerability Scan

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
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - name: Run npm audit
        run: npm audit --production --audit-level=high
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

Critical: 2 found
High: 5 found

Resolve critical and high vulnerabilities before merge.
Run: npm audit fix
```

---

### GATE-SEC-002: Dependency Security

**Enforcement:** Weekly

**Criteria:**
- No dependency more than 6 months behind latest
- Security patches applied within 7 days
- No known vulnerable dependencies
- Outdated dependencies documented

**Failure Action:**
```
⚠️ WARNING: Outdated dependencies

Dependencies requiring update:
- package-a: current 1.2.3, latest 1.5.0 (90 days old)
- package-b: current 2.0.0, latest 2.1.0 (has security patch)

Update within 7 days to maintain security posture.
```

---

### GATE-SEC-003: Secret Scanning

**Enforcement:** Pre-commit + CI

```yaml
# .pre-commit-config.yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']
```

**Criteria:**
- No secrets in code
- No secrets in commits
- Baseline maintained and updated
- False positives managed

**Failure Action:**
```
🚫 BLOCKED: Potential secrets detected

Secrets found:
- File: server/src/auth.ts, line 42
- Pattern: JWT_SECRET.*=.*dev-secret

Remove secrets from code immediately.
```

---

### GATE-SEC-004: JWT Secret Validation

**Enforcement:** CI Pipeline (every PR)
**Priority:** P1 - Critical

```yaml
# .github/workflows/jwt-validation.yml
name: JWT Secret Validation
on: [push, pull_request]

jobs:
  jwt-validation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Check for hardcoded JWT secrets
        run: |
          echo "Checking for hardcoded JWT secrets..."
          
          # Check for 'dev-secret' and similar
          if grep -r "dev-secret\|test-secret\|'secret'" --include="*.ts" server/src/ | grep -v ".test.ts" | grep -v ".spec.ts"; then
            echo "❌ ERROR: Hardcoded JWT secret detected!"
            echo "Found hardcoded secret in server/src/"
            exit 1
          fi
          
          # Check for JWT_SECRET fallback patterns
          if grep -r "process.env.JWT_SECRET.*||" --include="*.ts" server/src/; then
            echo "❌ ERROR: JWT_SECRET fallback detected!"
            echo "Server must require JWT_SECRET, not use a fallback"
            exit 1
          fi
          
          echo "✅ No hardcoded JWT secrets found"
```

**Criteria:**
- No hardcoded 'dev-secret' or similar fallback
- JWT_SECRET must be required, not optional
- No environment variable fallback patterns

**Failure Action:**
```
🚫 BLOCKED: JWT Secret Vulnerability Detected!

CRITICAL: Hardcoded JWT secret fallback found!

File: server/src/websocket/server.ts:120
Code: const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')

This is VULN-001 and MUST be fixed before merge.

Remediation:
- Remove the 'dev-secret' fallback
- Ensure JWT_SECRET is required at startup
- Never commit secrets to version control
```

---

## Performance Quality Gates

### GATE-PERF-001: Response Time

**Enforcement:** CI Pipeline (performance tests)

```yaml
# .github/workflows/performance.yml
name: Performance Tests
on:
  schedule:
    - cron: '0 3 * * *'  # Daily at 3 AM
  pull_request:
    branches: [main]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:performance
      - name: Upload performance report
        uses: actions/upload-artifact@v3
        with:
          name: performance-report
          path: performance-results/
```

**Criteria:**

| Metric | Target | Threshold | Status |
|--------|--------|-----------|--------|
| API Response (P50) | < 50ms | < 100ms | Required |
| API Response (P95) | < 100ms | < 200ms | Required |
| WebSocket Message | < 50ms | < 100ms | Required |
| Game State Update | < 30ms | < 60ms | Required |

**Failure Action:**
```
⚠️ WARNING: Performance degradation detected

P95 API Response: 180ms (target: 100ms)
P95 WebSocket: 95ms (target: 100ms)

Review performance report and optimize.
```

---

### GATE-PERF-002: Rate Limiting Performance

**Enforcement:** Scheduled (nightly)

**Criteria:**
- Rate limiting adds < 1ms latency to normal requests
- Rate limit checks complete within 5ms under load
- No dropped legitimate requests due to rate limiting
- Memory usage for rate limiting is bounded

**Failure Action:**
```
⚠️ WARNING: Rate limiting performance issues

Rate limiting added 5ms latency (target: <1ms)
Memory usage for rate limiting growing unbounded

Optimize rate limiting implementation.
```

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
#!/bin/bash
# Smoke test script
echo "Running smoke tests..."

# 1. Health check
curl -f http://staging.example.com/health

# 2. Auth flow
curl -f -X POST http://staging.example.com/api/login

# 3. Game creation
TOKEN=$(get_test_token)
curl -f -X POST http://staging.example.com/api/games \
  -H "Authorization: Bearer $TOKEN"

# 4. WebSocket connection
node test/websocket-connection.js

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
| Database migrations tested | ✅ | Yes |

**Release Checklist:**
```markdown
## Production Release Checklist

### Pre-Release
- [ ] Code review completed (minimum 2 approvals)
- [ ] All CI gates passing
- [ ] Security review completed
- [ ] Performance benchmarks met
- [ ] Database migrations tested
- [ ] Rollback plan ready
- [ ] Stakeholder notification sent

### Deployment
- [ ] Backup created
- [ ] Maintenance window announced
- [ ] Deployment executed
- [ ] Health checks passed
- [ ] Smoke tests passed

### Post-Release
- [ ] Monitoring verified
- [ ] Error rate normal
- [ ] Latency within threshold
- [ ] No critical alerts
- [ ] Player feedback monitored
```

---

### GATE-RELEASE-003: Hotfix Criteria

**For critical production issues only**

**Criteria:**
- Issue blocks significant player functionality
- Impact assessment completed
- Root cause identified
- Fix tested in isolation
- Security review if security-related
- At least 1 approval (reduced from 2 for urgency)

**Process:**
```
1. Create hotfix branch from main
2. Implement minimal fix
3. Fast-track review (1 approver)
4. Deploy to staging
5. Quick smoke test
6. Deploy to production
7. Document deviation from normal process
```

---

## Quality Gate Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     MONKEYTOWN QUALITY GATES                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  CODE QUALITY                                                            │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Lint         ████████████████████████████ 100%                 │     │
│  │ Type Check   ████████████████████████████ 100%                 │     │
│  │ Coverage     ████████████████████████░░░░░ 92%                 │     │
│  │ Security     ████████████████████████████ 100%                 │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  TEST QUALITY                                                            │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Unit Tests   ████████████████████████████ 100%  ✅ PASS        │     │
│  │ Integration  ██████████████████████████░░░░ 95%  ✅ PASS        │     │
│  │ Security     ████████████████████████████ 100%  ✅ PASS        │     │
│  │ E2E Tests    ████████████████████████████ 100%  ⚠️ 1 FAIL      │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  SECURITY                                                                │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Vulnerabilities ████████████████████████████ 0 Critical        │     │
│  │ JWT Secrets    ████████████████████████████ 0 Found            │     │
│  │ Dependencies   ████████████████████████░░░░░ 2 Updates         │     │
│  │ Secrets        ████████████████████████████ 0 Found            │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  PERFORMANCE                                                             │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Response P50   35ms ████████████████████████████               │     │
│  │ Response P95   85ms ████████████████████████████               │     │
│  │ Rate Limit    0.5ms ████████████████████████████               │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  RELEASE STATUS                                                          │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Staging       READY  Next: v2.4.1                              │     │
│  │ Production    v2.4.0  Last: 2026-01-15                         │     │
│  │ Hotfixes      0      (All clear)                               │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  Overall Status: ✅ HEALTHY                                             │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Gate Enforcement Matrix

| Gate | Commit | PR | Nightly | Release | Hotfix |
|------|--------|-----|---------|---------|--------|
| GATE-CODE-001 (Lint) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-002 (Types) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-003 (Security) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-004 (Coverage) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-001 (Unit) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-002 (Security) | - | ✅ | ✅ | ✅ | ✅ |
| GATE-TEST-003 (Integ) | - | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-004 (E2E) | - | ⚠️ | ✅ | ✅ | - |
| GATE-SEC-001 (Vuln) | ✅ | ✅ | ✅ | ✅ | ✅ |
| GATE-SEC-002 (Deps) | - | - | ✅ | ✅ | - |
| GATE-SEC-003 (Secrets) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-SEC-004 (JWT) | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-PERF-001 (Response) | - | ⚠️ | ✅ | ✅ | - |
| GATE-PERF-002 (Rate) | - | - | ✅ | ✅ | - |
| GATE-RELEASE-001 | - | - | - | ✅ | - |
| GATE-RELEASE-002 | - | - | - | ✅ | - |

**Legend:**
- ✅ Enforced (blocks on failure)
- ⚠️ Non-blocking (warning only)
- - Not applicable

---

## Exceptions Process

**When a gate cannot be met:**

1. **Document Exception**
   ```markdown
   ## Quality Gate Exception Request
   
   **Gate:** GATE-CODE-004 (Test Coverage)
   
   **Reason:** New authentication code path has no test (simple wrapper function)
   
   **Risk Assessment:** Low - pure wrapper with obvious behavior
   
   **Mitigation:** Will add test in follow-up PR (JIRA-123)
   
   **Approvers:** 2 required
   - [ ] Technical Lead
   - [ ] QA Lead
   ```

2. **Approval Required**
   - 2 approvals for non-critical gates
   - Team lead approval for critical gates
   - Security lead approval for security gates

3. **Time Limit**
   - Exception valid for 7 days maximum
   - Must be resolved in next sprint
   - Security exceptions: 24 hours max

---

## References

- Test Strategy: `.monkeytown/qa/test-strategy.md`
- Test Cases: `.monkeytown/qa/test-cases.md`
- Vulnerability Assessment: `.monkeytown/security/vulnerability-assessment.md`
- Security Requirements: `.monkeytown/security/security-requirements.md`

---

*Quality Gates Version: 2.1*
*Last Updated: 2026-01-19*
*Next Review: 2026-04-19*
*JungleSecurity - Never compromise on quality*
