# Monkeytown Quality Gates

**Version:** 1.0  
**Date:** 2026-01-19  
**QA Lead:** JungleSecurity  
**Status:** Active

---

## Purpose

This document defines the quality gates that must be passed before code can be merged to main and deployed to production. Each gate includes specific criteria, measurement methods, and escalation procedures.

## Gate Overview

| Gate | Trigger | Blocker | Automated |
|------|---------|---------|-----------|
| **Code Quality** | Every commit | Yes | Yes |
| **Unit Tests** | Every commit | Yes | Yes |
| **Integration Tests** | Every PR | Yes | Yes |
| **E2E Tests** | Every PR | Yes | Yes |
| **Security Scan** | Every PR | Yes | Yes |
| **Performance Tests** | Nightly | Yes | Yes |
| **Manual Review** | Every PR | Yes | No |
| **Security Review** | P1/P2 features | Yes | No |
| **Performance Review** | Before release | Yes | No |

---

## Gate 1: Code Quality

### Criteria

| Metric | Target | Threshold | Measurement |
|--------|--------|-----------|-------------|
| ESLint Errors | 0 | 0 | `npm run lint` |
| ESLint Warnings | < 20 | < 50 | `npm run lint` |
| TypeScript Errors | 0 | 0 | `npm run typecheck` |
| Code Coverage | > 80% | > 70% | `npm run test:coverage` |
| Complexity | < 10 per function | < 15 per function | `npm run lint` |

### Commands

```bash
# Run linting
npm run lint

# Run type checking
npm run typecheck

# Check coverage
npm run test:coverage
```

### Failure Action

- **Block** merge until errors resolved
- **Auto-comment** on PR with specific issues
- **Assign** to developer for immediate fix

---

## Gate 2: Unit Tests

### Criteria

| Component | Coverage Target | Coverage Threshold | Priority |
|-----------|-----------------|-------------------|----------|
| Game Engines | 95% | 90% | P1 |
| Validation | 100% | 100% | P1 |
| Utilities | 90% | 85% | P2 |
| Components | 80% | 70% | P2 |
| Services | 85% | 75% | P2 |

### Commands

```bash
# Run all unit tests
npm run test

# Run with coverage
npm run test:coverage

# Run specific test file
npm run test -- tictactoe-engine.test.ts
```

### Test Requirements

- All P1 tests must pass
- No flaky tests (max 5% flakiness)
- Tests complete in < 5 minutes

### Failure Action

- **Block** merge until coverage meets threshold
- **Report** specific uncovered lines
- **Require** justification for any coverage reduction

---

## Gate 3: Integration Tests

### Criteria

| Test Category | Pass Rate | Time Limit |
|---------------|-----------|------------|
| API Endpoints | 100% | < 2 min |
| Database Operations | 100% | < 1 min |
| WebSocket Events | 100% | < 2 min |
| Game Sessions | 100% | < 2 min |

### Commands

```bash
# Run integration tests
npm run test:integration

# Run with database
npm run test:integration:db
```

### Requirements

- Must use test database (not production)
- Must be idempotent (can run multiple times)
- Must clean up after themselves

### Failure Action

- **Block** merge until all tests pass
- **Debug** output provided in CI logs
- **Require** investigation of root cause

---

## Gate 4: End-to-End Tests

### Criteria

| Test Type | Pass Rate | Priority |
|-----------|-----------|----------|
| Critical Paths | 100% | P1 |
| Core Features | 95% | P1 |
| Edge Cases | 90% | P2 |
| Exploratory | 80% | P3 |

### Critical Paths (Must Pass)

1. ✅ User registration/login
2. ✅ Game creation
3. ✅ Making a game move
4. ✅ Win/lose/draw detection
5. ✅ Chat messaging
6. ✅ WebSocket reconnection

### Commands

```bash
# Run E2E tests
npm run e2e

# Run specific browser
npm run e2e:chromium
npm run e2e:firefox

# Run with debug
npm run e2e:debug
```

### Requirements

- Must pass on all supported browsers
- Tests must be isolated (no shared state)
- Screenshots on failure

### Failure Action

- **Block** merge for critical path failures
- **Review** screenshot/video of failure
- **Allow** merge for non-critical failures with justification

---

## Gate 5: Security Scan

### Criteria

| Scan Type | Pass Criteria | Blocker |
|-----------|---------------|---------|
| Dependency Scan | No Critical/High CVEs | Yes |
| SAST Scan | No Critical/High findings | Yes |
| Secrets Scan | No secrets in code | Yes |
| Container Scan | No Critical/High findings | Yes |

### Tools

| Tool | Purpose | Configuration |
|------|---------|---------------|
| npm audit | Dependency vulnerabilities | Fail on critical |
| ESLint security | Code security patterns | Security rules enabled |
| gitleaks | Secrets detection | Pre-commit hooks |
| Trivy | Container scanning | CI integration |

### Commands

```bash
# Security audit
npm audit

# Secrets scan
gitleaks detect --source=. --verbose

# Full security scan
npm run security:scan
```

### Vulnerability Thresholds

| Severity | Gate Action | Time to Fix |
|----------|-------------|-------------|
| Critical | **Block** | 24 hours |
| High | **Block** | 72 hours |
| Medium | **Warn** | 2 weeks |
| Low | **Info** | Next sprint |

### Failure Action

- **Critical/High:** Block merge, create security issue
- **Medium:** Allow with tracking issue
- **Low:** Allow, log for backlog

---

## Gate 6: Performance Tests

### Criteria

| Metric | Target | Threshold | Frequency |
|--------|--------|-----------|-----------|
| API P95 Latency | < 100ms | < 200ms | Nightly |
| WebSocket RTT | < 50ms | < 100ms | Nightly |
| Page Load | < 2s | < 3s | Nightly |
| Time to Interactive | < 3s | < 5s | Nightly |
| Concurrent Users | 1000 | 500 | Nightly |

### Commands

```bash
# Run load test
npm run test:load

# Run performance test
npm run test:performance

# Generate report
npm run test:performance:report
```

### Performance Budget

| Resource | Budget | Monitoring |
|----------|--------|------------|
| JS Bundle | < 200KB | Lighthouse |
| CSS Bundle | < 50KB | Lighthouse |
| API Response | < 100KB | Network tab |
| WebSocket Messages | < 1KB each | Custom metrics |

### Failure Action

- **Threshold exceeded:** Create performance issue
- **Target missed:** Add to tech debt backlog
- **Critical:** Block next release

---

## Gate 7: Manual Review

### Criteria

| Review Type | Required Reviewers | Focus |
|-------------|-------------------|-------|
| Code Review | 1 developer | Logic, style, tests |
| Security Review | JungleSecurity | Security implications |
| UX Review | PrimateDesigner | User experience |
| Architecture Review | ChaosArchitect | Design compliance |

### Review Checklist

- [ ] Code follows style guidelines
- [ ] Tests included and passing
- [ ] Documentation updated
- [ ] No debug/logging code left
- [ ] Error handling implemented
- [ ] Security considerations addressed
- [ ] Performance impact assessed

### Review Tools

- GitHub Pull Request reviews
- Codeowners file for automatic assignment
- PR templates for completeness

### Failure Action

- **Reviewer requested changes:** Must be addressed
- **Approval:** Required before merge
- **LGTM:** Required from all reviewers

---

## Gate 8: Security Review

### Trigger

- P1 or P2 features
- Authentication/authorization changes
- Data handling changes
- New third-party integrations
- Infrastructure changes

### Criteria

| Area | Checklist |
|------|-----------|
| Authentication | [ ] No hardcoded secrets |
| | [ ] Token handling secure |
| | [ ] Session management secure |
| Authorization | [ ] Role-based access control |
| | [ ] Permission checks in place |
| Data Protection | [ ] Input validation |
| | [ ] Output encoding |
| | [ ] PII protection |
| Dependencies | [ ] No vulnerable packages |
| | [ ] Minimum versions specified |

### Approval

- **JungleSecurity** must approve
- Security findings documented
- Mitigation strategies defined

---

## Gate 9: Performance Review

### Trigger

- Before any release
- After major feature additions
- Following infrastructure changes
- Performance regression suspected

### Criteria

| Area | Checklist |
|------|-----------|
| Load Testing | [ ] Passed at expected load |
| | [ ] No memory leaks detected |
| | [ ] Error rate < 1% |
| Stress Testing | [ ] Breaking point identified |
| | [ ] Graceful degradation |
| | [ ] Recovery verified |
| Monitoring | [ ] Metrics defined |
| | [ ] Alerts configured |
| | [ ] Dashboards created |

### Sign-off Required

- **ChaosArchitect** for infrastructure
- **JungleSecurity** for security impact

---

## Deployment Gates

### Development Deployment

| Gate | Status |
|------|--------|
| Code Quality | ✅ |
| Unit Tests | ✅ |
| Integration Tests | ✅ |

### Staging Deployment

| Gate | Status |
|------|--------|
| Development Gates | ✅ |
| E2E Tests | ✅ |
| Security Scan | ✅ |

### Production Deployment

| Gate | Status |
|------|--------|
| Staging Gates | ✅ |
| Performance Tests | ✅ |
| Manual Security Review | ✅ |
| Performance Review | ✅ |
| Team Lead Approval | ✅ |

---

## Quality Metrics Dashboard

### Current Metrics

| Metric | Target | Current | Trend |
|--------|--------|---------|-------|
| Code Coverage | 80% | TBD | - |
| Test Pass Rate | 98% | TBD | - |
| Bug Escape Rate | < 5% | TBD | - |
| MTTR (Mean Time to Recovery) | < 4h | TBD | - |
| Security Vulnerabilities | 0 Critical | TBD | - |
| Performance Budget | 100% | TBD | - |

### Reporting

- **Weekly:** Quality metrics to team
- **Monthly:** Quality report to stakeholders
- **Quarterly:** Quality review and planning

---

## Escalation Procedures

### Failed Gate Escalation

| Gate Failure | Escalation Path |
|--------------|-----------------|
| Code Quality | Developer → Tech Lead |
| Unit Tests | Developer → Tech Lead |
| Integration Tests | Developer → MonkeyBuilder |
| E2E Tests | Developer → MonkeyBuilder |
| Security Scan | Developer → JungleSecurity |
| Performance Tests | ChaosArchitect → Team |
| Manual Review | Reviewer → Project Manager |
| Security Review | JungleSecurity → FounderAI |

### Emergency Procedures

For urgent fixes that cannot wait for normal gates:

1. **Request** emergency bypass from Project Manager
2. **Document** risk acceptance
3. **Complete** abbreviated review
4. **Deploy** with monitoring
5. **Address** full gates within 24 hours

---

## Continuous Improvement

### Quality Metrics Review

| Activity | Frequency | Owner |
|----------|-----------|-------|
| Gate effectiveness analysis | Monthly | JungleSecurity |
| False positive review | Weekly | Team |
| Test maintenance | Weekly | QA Lead |
| Tool evaluation | Quarterly | Team |

### Gate Refinement Process

1. Collect metrics on gate effectiveness
2. Identify false positives/negatives
3. Propose gate adjustments
4. Team review and approval
5. Update documentation
6. Communicate changes

---

## References

- Test Strategy: `.monkeytown/qa/test-strategy.md`
- Test Cases: `.monkeytown/qa/test-cases.md`
- Security Requirements: `.monkeytown/security/security-requirements.md`
- Threat Model: `.monkeytown/security/threat-model.md`

---

*Document Version: 1.0*  
*Last Updated: 2026-01-19*  
*JungleSecurity - Protecting Monkeytown*
