# Monkeytown Quality Gates

**Mandatory quality criteria for all code and releases**

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
      
# Quality Gate: Must pass with no warnings
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

**Enforcement:** CI Pipeline

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

**Failure Action:**
```
🚫 BLOCKED: Type errors detected

Run: npx tsc --noEmit

Fix all TypeScript errors before committing.
```

---

### GATE-CODE-003: Test Coverage

**Enforcement:** CI Pipeline

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

| Component | Minimum Coverage |
|-----------|-----------------|
| Authentication | 95% |
| Game Logic | 95% |
| Input Validation | 90% |
| Data Access | 85% |
| Utilities | 80% |
| **Overall** | **85%** |

**Failure Action:**
```
🚫 BLOCKED: Coverage below threshold

Current: 82%
Required: 85%

Run: npm run test:coverage

Add tests to cover missing code paths.
```

---

### GATE-CODE-004: Security Linting

**Enforcement:** CI Pipeline

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
      - run: npm install -D eslint-plugin-security
      - run: npx eslint --ext .ts,.tsx --plugin security .
```

**Criteria:**
- No security warnings from eslint-plugin-security
- No hardcoded secrets detected
- No use of dangerous functions

**Failure Action:**
```
🚫 BLOCKED: Security issues detected

Run: npx eslint --ext .ts,.tsx --plugin security .

Security issues must be resolved before committing.
```

---

## Test Quality Gates

### GATE-TEST-001: Unit Tests Pass

**Enforcement:** CI Pipeline

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

### GATE-TEST-002: Integration Tests Pass

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

**Failure Action:**
```
🚫 BLOCKED: Integration tests failed

Run: npm run test:integration

Fix failing integration tests before merge.
```

---

### GATE-TEST-003: E2E Tests Critical Pass

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
| Critical | 0 | BLOCK |
| High | 0 | BLOCK |
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

### GATE-SEC-002: Dependency Update

**Enforcement:** Weekly

**Criteria:**
- No dependency more than 6 months behind latest
- Security patches applied within 7 days
- No known vulnerable dependencies

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

```bash
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
echo "Running smoke tests..."

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

**Release Checklist:**
```markdown
## Production Release Checklist

### Pre-Release
- [ ] Code review completed
- [ ] All CI gates passing
- [ ] Security review completed
- [ ] Performance benchmarks met
- [ ] Database migrations tested
- [ ] Rollback plan ready

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
│  │ Coverage     ██████████████████████░░░░░ 85%                   │     │
│  │ Security     ████████████████████████████ 100%                 │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  TEST QUALITY                                                            │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Unit Tests   ████████████████████████████ 100%  ✅ PASS        │     │
│  │ Integration  ██████████████████████████░░░ 95%  ✅ PASS        │     │
│  │ E2E Tests    ████████████████████████████ 100%  ⚠️ 1 FAIL      │     │
│  └────────────────────────────────────────────────────────────────┘     │
│                                                                          │
│  SECURITY                                                                │
│  ┌────────────────────────────────────────────────────────────────┐     │
│  │ Vulnerabilities ████████████████████████████ 0 Critical        │     │
│  │ Dependencies   ████████████████████████░░░░░ 2 Updates         │     │
│  │ Secrets        ████████████████████████████ 0 Found            │     │
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
| GATE-CODE-001 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-002 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-003 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-CODE-004 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-001 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-002 | - | ✅ | - | ✅ | ⚠️ |
| GATE-TEST-003 | - | ⚠️ | ✅ | ✅ | - |
| GATE-SEC-001 | ✅ | ✅ | ✅ | ✅ | ✅ |
| GATE-SEC-002 | - | - | ✅ | ✅ | - |
| GATE-SEC-003 | ✅ | ✅ | - | ✅ | ⚠️ |
| GATE-PERF-001 | - | ⚠️ | ✅ | ✅ | - |
| GATE-PERF-002 | - | - | ✅ | ✅ | - |
| GATE-RELEASE-001 | - | - | - | ✅ | - |
| GATE-RELEASE-002 | - | - | - | ✅ | - |

**Legend:**
- ✅ Enforced
- ⚠️ Non-blocking (warning only)
- - Not applicable

---

## Exceptions Process

**When a gate cannot be met:**

1. **Document Exception**
   ```markdown
   ## Quality Gate Exception Request
   
   **Gate:** GATE-CODE-003 (Test Coverage)
   
   **Reason:** New code path has no test (simple utility function)
   
   **Risk Assessment:** Low - pure function with obvious behavior
   
   **Mitigation:** Will add test in follow-up PR
   
   **Approvers:** 2 required
   - [ ] Technical Lead
   - [ ] QA Lead
   ```

2. **Approval Required**
   - 2 approvals for non-critical gates
   - Team lead approval for critical gates

3. **Time Limit**
   - Exception valid for 7 days maximum
   - Must be resolved in next sprint

---

*Quality Gates Version: 1.0*
*Last Updated: 2026-01-18*
*Next Review: 2026-04-18*
*JungleSecurity - Never compromise on quality*
