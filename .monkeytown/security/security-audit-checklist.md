# Monkeytown Security Audit Checklist

**Regular security verification procedures for Monkeytown team**

---

## Pre-Audit Setup

### 1. Environment Preparation

```bash
# 1.1 Ensure clean test environment
npm run test:clean

# 1.2 Verify all dependencies are up to date
npm audit
npm outdated

# 1.3 Check for known vulnerabilities in dependencies
snyk test

# 1.4 Verify test database is isolated
# Ensure test database name: monkeytown_test
```

### 2. Documentation Review

- [ ] Review latest threat model updates
- [ ] Check vulnerability assessment for new findings
- [ ] Verify incident response contacts are current
- [ ] Confirm security requirements alignment

---

## Daily Security Checks

### 2.1 Dependency Vulnerability Scan

```bash
# Run automated vulnerability scan
npm audit --production

# Expected output: 0 critical, 0 high vulnerabilities
```

**Criteria:**
- Critical: ❌ BLOCK - Must fix immediately
- High: ⚠️ WARNING - Must fix within 24 hours
- Medium: 📝 INFO - Review and plan fix

**Pass/Fail:** ______

### 2.2 Secret Scanning

```bash
# Check for accidental secrets in code
git log --all --oneline --source --remotes --grep="secret\|password\|api_key\|token" --name-only

# Run pre-commit secret detection
pre-commit run --all-files detect-secrets
```

**Criteria:**
- No secrets in repository history
- Baseline file maintained and current

**Pass/Fail:** ______

### 2.3 Security Test Execution

```bash
# Run security-specific tests
npm run test:security

# Verify all security tests pass
```

**Criteria:**
- All tests in `.monkeytown/security/security-tests.ts` pass
- No regressions in security behavior

**Pass/Fail:** ______

---

## Weekly Security Audit

### 3.1 Authentication Security Review

| Check | Status | Notes |
|-------|--------|-------|
| JWT secret not hardcoded | ☐ | Verify `server/src/websocket/server.ts:151` |
| Token expiration enforced | ☐ | Check token validation logic |
| Session binding implemented | ☐ | IP/User-Agent binding |
| Concurrent session limits | ☐ | Max 3 sessions per player |
| Token invalidation on logout | ☐ | Redis blacklist implementation |

**Detailed Steps:**

```bash
# 1. Check JWT secret usage
grep -r "JWT_SECRET" server/src/ --include="*.ts"

# Expected: Only process.env.JWT_SECRET, no fallback
# Fail if: || 'dev-secret' or hardcoded values

# 2. Verify token expiration
cat > /tmp/check_token_expiry.ts << 'EOF'
import jwt from 'jsonwebtoken';
const token = jwt.sign({ playerId: 'test' }, 'secret', { expiresIn: '1h' });
const decoded = jwt.decode(token) as { exp?: number };
console.log('Has expiration:', !!decoded.exp);
EOF
npx tsx /tmp/check_token_expiry.ts

# 3. Check session limits
grep -r "MAX_CONCURRENT" server/src/ --include="*.ts"
```

**Pass/Fail:** ______

### 3.2 Input Validation Review

| Check | Status | Notes |
|-------|--------|-------|
| Game action validation | ☐ | `server/src/services/validation.ts` |
| Player ID sanitization | ☐ | Regex validation present |
| Game ID validation | ☐ | Length and format checks |
| Chat message sanitization | ☐ | XSS prevention |
| Card ID format validation | ☐ | Regex pattern enforced |

**Detailed Steps:**

```bash
# 1. Verify action validation
cat server/src/services/validation.ts | grep -A5 "validateBabelAction"

# 2. Test SQL injection prevention
npm run test:security -- --grep="SQL Injection"

# 3. Verify XSS sanitization
npm run test:security -- --grep="XSS"
```

**Pass/Fail:** ______

### 3.3 WebSocket Security Review

| Check | Status | Notes |
|-------|--------|-------|
| Rate limiting on connections | ☐ | Per-IP limits |
| Rate limiting on messages | ☐ | 30 actions/minute |
| Origin validation | ☐ | CORS configuration |
| Transport security | ☐ | WebSocket only, no polling |
| Authentication on connect | ☐ | Token required |

**Detailed Steps:**

```bash
# 1. Check WebSocket configuration
cat server/src/websocket/server.ts | grep -A10 "SocketIOServer"

# 2. Verify rate limiting
cat server/src/services/validation.ts | grep -A10 "checkRateLimit"

# 3. Test WebSocket security
npm run test:security -- --grep="WebSocket"
```

**Pass/Fail:** ______

### 3.4 Data Protection Review

| Check | Status | Notes |
|-------|--------|-------|
| Sensitive data encrypted | ☐ | PII in database |
| Redis data protection | ☐ | Session data encrypted |
| HTTPS enforced | ☐ | TLS 1.2+ |
| Security headers present | ☐ | CSP, HSTS, X-Frame-Options |

**Detailed Steps:**

```bash
# 1. Check security headers in Next.js config
cat web/next.config.js | grep -A20 "headers()"

# 2. Verify HTTPS redirection
grep -r "redirect.*https" server/src/ --include="*.ts"

# 3. Check database encryption
cat server/src/services/database.ts | grep -i "encrypt\|ssl\|tls"
```

**Pass/Fail:** ______

---

## Monthly Deep Security Audit

### 4.1 Comprehensive Vulnerability Assessment

#### 4.1.1 Re-run Full Vulnerability Scan

```bash
# 1. Dependency scan
npm audit --production --audit-level=high
snyk test --severity-threshold=high
npm outdated

# 2. Static analysis
npm run lint
npx eslint --ext .ts,.tsx --plugin security .

# 3. Container scanning (if applicable)
trivy image monkeytown-server:latest
```

**Results Record:**

| Tool | Critical | High | Medium | Low |
|------|----------|------|--------|-----|
| npm audit | | | | |
| snyk | | | | |
| eslint security | | | | |
| trivy | | | | |

**Pass/Fail:** ______

#### 4.1.2 Penetration Testing Simulation

```bash
# 1. WebSocket fuzzing
# Use a tool like ws-fuzzer to test input handling
npm install -g ws-fuzzer
ws-fuzzer -u ws://localhost:8080 -d 1000

# 2. Authentication testing
# Test token forging, replay attacks, session hijacking
npm run test:security -- --grep="Authentication"

# 3. Input injection testing
# Test SQLi, XSS, command injection
npm run test:security -- --grep="Injection"
```

**Findings Record:**

| Finding ID | Severity | Description | Status |
|------------|----------|-------------|--------|
| | | | |

**Pass/Fail:** ______

### 4.2 Architecture Security Review

| Component | Review Focus | Status | Notes |
|-----------|--------------|--------|-------|
| WebSocket Gateway | Authentication, rate limiting | ☐ | |
| Game Server | Input validation, state integrity | ☐ | |
| Redis | Data isolation, access control | ☐ | |
| PostgreSQL | Injection prevention, encryption | ☐ | |
| Frontend | XSS prevention, CSP | ☐ | |

**Detailed Steps:**

```bash
# 1. Review architecture documentation
cat .monkeytown/architecture/system-design.md | grep -A5 "Security"

# 2. Verify security requirements coverage
cat .monkeytown/security/security-requirements.md | grep "AUTH-\|INP-\|DATA-"

# 3. Check for new attack surfaces
git diff --name-only HEAD~1..HEAD | grep -E "\.(ts|tsx|js)$"
```

**Pass/Fail:** ______

### 4.3 Compliance Verification

| Compliance Area | Requirement | Status | Evidence |
|-----------------|-------------|--------|----------|
| Authentication | AUTH-001 through AUTH-003 | ☐ | |
| Authorization | AUTHZ-001 through AUTHZ-002 | ☐ | |
| Input Validation | INP-001 through INP-002 | ☐ | |
| Data Protection | DATA-001 through DATA-003 | ☐ | |
| Logging | LOG-001 through LOG-002 | ☐ | |

**Pass/Fail:** ______

---

## Quarterly Security Review

### 5.1 Full Security Audit

#### 5.1.1 Third-Party Security Assessment

- [ ] Engage external security firm for penetration test
- [ ] Review code for security patterns
- [ ] Test infrastructure security
- [ ] Validate incident response procedures

#### 5.1.2 Threat Model Update

- [ ] Review threat model against current architecture
- [ ] Add new threats from emerging patterns
- [ ] Remove outdated threats
- [ ] Update risk assessments

#### 5.1.3 Security Training Verification

- [ ] Verify team has completed security training
- [ ] Review secure coding guidelines
- [ ] Test incident response knowledge
- [ ] Update training materials

**Pass/Fail:** ______

---

## Incident Response Verification

### 6.1 Test Incident Response Plan

```bash
# 1. Run tabletop exercise
# Gather team, walk through incident scenarios

# 2. Test containment procedures
cat .monkeytown/security/incident-response.md | grep -A10 "Phase 2"

# 3. Verify communication templates
cat .monkeytown/security/incident-response.md | grep -A5 "Post-Incident Communication"
```

**Findings:**

| Scenario | Response Time | Procedures Followed | Issues |
|----------|---------------|---------------------|--------|
| Credential compromise | | | |
| DDoS attack | | | |
| Data breach | | | |

**Pass/Fail:** ______

---

## Audit Report Template

### Security Audit Report

**Audit Date:** _____________
**Auditor:** _____________
**Period Covered:** _____________

#### Summary

| Category | Previous | Current | Trend |
|----------|----------|---------|-------|
| Critical Vulnerabilities | | | |
| High Vulnerabilities | | | |
| Medium Vulnerabilities | | | |
| Security Tests Passing | | | |
| Compliance Score | | | |

#### Findings

| ID | Severity | Finding | Remediation | Status |
|----|----------|---------|-------------|--------|
| | | | | |

#### Recommendations

1. _____________
2. _____________
3. _____________

#### Sign-Off

| Role | Name | Date |
|------|------|------|
| Security Lead | | |
| Development Lead | | |
| Project Owner | | |

---

## Quick Reference Commands

```bash
# Daily Security Check
npm audit --production --audit-level=high
npm run test:security
pre-commit run --all-files detect-secrets

# Weekly Deep Check
npm run lint
npx eslint --ext .ts,.tsx --plugin security .
npm run test:integration
snyk test

# Monthly Full Scan
npm audit --production
snyk test --severity-threshold=medium
trivy image monkeytown-server:latest
npm run test:e2e

# Emergency Security Check
npm audit --production --audit-level=critical
snyk test --severity-threshold=critical
```

---

*Security Audit Checklist Version: 1.0*
*Last Updated: 2026-01-18*
*JungleSecurity - Vigilance is protection*
