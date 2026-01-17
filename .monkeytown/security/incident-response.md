# JungleSecurity Incident Response Plan

**JungleSecurity** | `incident-response.md` | Response Procedures for Security Incidents

---

## Overview

This document defines how Monkeytown responds to security incidents. Unlike traditional incident response, Monkeytown operates autonomously—incident response must be partially automated while preserving human decision-making authority for critical actions.

**Incident Severity Levels**:
| Level | Name | Response Time | Escalation |
|-------|------|---------------|------------|
| P1 | CRITICAL | Immediate | All agents + humans |
| P2 | HIGH | 4 hours | Security agent + humans |
| P3 | MEDIUM | 24 hours | Security agent |
| P4 | LOW | 72 hours | Security agent |

---

## Incident Classification

### CRITICAL (P1)

**Criteria**:
- Active exploitation of vulnerability
- Data breach or exfiltration
- System compromise
- Unauthorized code execution
- Secret/credential exposure

**Examples**:
- Active XSS being exploited in witnesses
- LLM prompt injection causing unauthorized actions
- Workflow privilege escalation exploited
- Secrets committed to repository

**Response**:
1. **Immediate**: Alert all agents and humans
2. **Auto-response**: Block PRs from compromised agents
3. **Human action**: Merge freeze, incident review
4. **Recovery**: Full system audit, credential rotation

---

### HIGH (P2)

**Criteria**:
- Confirmed vulnerability with exploit path
- Potential for escalation
- Data integrity concerns
- Service degradation

**Examples**:
- Unpatched XSS vulnerability (no active exploitation)
- Duplicate entity ID causing instability
- Missing input validation (no active attack)
- Missing error boundaries

**Response**:
1. **4 hours**: Alert security agent
2. **Auto-response**: Log enhanced monitoring
3. **Human action**: Schedule patch in current sprint
4. **Recovery**: Fix verification

---

### MEDIUM (P3)

**Criteria**:
- Known vulnerability without immediate exploit
- Minor security gap
- Best practice violation
- Detection opportunity

**Examples**:
- Unpinned GitHub Action versions
- Missing rate limiting (no DoS observed)
- Unencrypted data at rest
- Audit log gaps

**Response**:
1. **24 hours**: Document in vulnerability registry
2. **Auto-response**: Continue monitoring
3. **Human action**: Schedule for next sprint
4. **Recovery**: Track remediation

---

### LOW (P4)

**Criteria**:
- Minor issue
- Low likelihood of exploitation
- Best practice improvement
- Documentation gap

**Examples**:
- Outdated security documentation
- Minor accessibility concern
- Verbose error messages (non-sensitive)
- Configuration improvement

**Response**:
1. **72 hours**: Log for triage
2. **Auto-response**: None
3. **Human action**: Review backlog
4. **Recovery**: Track improvement

---

## Incident Detection

### Automated Detection Sources

| Source | Detects | Method |
|--------|---------|--------|
| GitHub Security Alerts | Dependency vulnerabilities | Dependabot |
| Playwright Chaos Tests | Runtime bugs, XSS | Browser automation |
| Code Analysis | Static vulnerability patterns | ESLint security rules |
| Audit Logs | Anomalous behavior | Log analysis |
| Build Checks | Secrets in bundle, bundle size | CI/CD pipeline |
| Browser Console | Runtime warnings, errors | Console monitoring |

### Agent Reporting

**All agents MUST report**:
1. Unexpected file changes in their domain
2. Files outside their domain referencing their work
3. Suspicious input from other agents
4. System anomalies

**Reporting Format**:
```typescript
interface SecurityReport {
  agentId: string;
  timestamp: Date;
  type: 'ANOMALY' | 'SUSPICIOUS' | 'EXPLOIT' | 'UNAUTHORIZED';
  description: string;
  evidence: {
    files: string[];
    data: unknown;
    log: string;
  };
  severity: 'P1' | 'P2' | 'P3' | 'P4';
}
```

---

## Response Procedures

### IR-001: XSS Exploitation Detected (P1)

**Trigger**: Console error showing script execution or security alert

**Immediate Actions**:
```
1. ISOLATE affected witness sessions
   - Revoke active sessions
   - Log all session activity
   - Notify affected witnesses

2. IDENTIFY injection source
   - Review entity labels from last 1 hour
   - Review seeds from last 1 hour
   - Check agent files for malicious content

3. CONTAIN the spread
   - If source is agent file: Disable agent PRs
   - If source is witness seed: Block witness
   - If source is external data: Disable data source

4. ERADICATE malicious content
   - Remove malicious entity labels
   - Remove malicious seed inputs
   - Remove malicious agent files
   - Clear browser cache for affected witnesses

5. RECOVER
   - Verify fix with test
   - Re-enable affected components
   - Document incident
```

**Recovery Verification**:
```typescript
// Test script to verify XSS is fixed
async function verifyXSSFix(): Promise<boolean> {
  const testCases = [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    'javascript:alert(1)',
    '{{constructor.constructor("alert(1)")()}}',
  ];
  
  for (const testCase of testCases) {
    const entity = { label: testCase };
    const rendered = renderEntityLabel(entity);
    if (containsScriptTag(rendered)) {
      return false;
    }
  }
  return true;
}
```

---

### IR-002: Prompt Injection Attack (P1)

**Trigger**: Agent outputs unexpected content or performs unauthorized actions

**Immediate Actions**:
```
1. ISOLATE affected agent
   - Disable agent workflow
   - Preserve agent state for analysis
   - Block new agent invocations

2. IDENTIFY injection vector
   - Review agent context/history
   - Check recent seeds for injection patterns
   - Check entity data for hidden instructions
   - Review external data processed by agent

3. ANALYZE impact
   - What actions did agent perform?
   - What data was exposed?
   - What tools were used?
   - Were other agents affected?

4. CONTAIN spread
   - If injection via seed: Block witness
   - If injection via entity data: Disable source agent
   - If injection via research: Disable research access

5. REMEDIATE
   - Sanitize all agent context
   - Implement injection detection
   - Add output validation
   - Review and patch injection point

6. RECOVER
   - Reset agent state
   - Re-enable with enhanced protections
   - Monitor for recurrence
```

**Analysis Template**:
```typescript
interface InjectionAnalysis {
  injectionType: 'DIRECT' | 'INDIRECT' | 'CONTEXT_OVERRIDE';
  injectionVector: string;  // Which input contained injection
  injectionPayload: string;
  agentResponse: string;
  actionsTaken: string[];
  dataExposed: string[];
  toolsUsed: string[];
  otherAgentsAffected: string[];
  remediationRequired: string[];
}
```

---

### IR-003: Workflow Privilege Escalation (P1)

**Trigger**: Agent workflow has unexpected permissions or commits to protected branch

**Immediate Actions**:
```
1. REVERT changes
   - Revert workflow file to last known good
   - Revert any code commits from escalated workflow
   - Review all recent commits from agent

2. REVOKE access
   - Rotate any accessed secrets
   - Revoke any issued tokens
   - Review access logs

3. INVESTIGATE
   - How did agent modify workflow?
   - Was this intentional or compromise?
   - What permissions were actually used?

4. HARDEN
   - Add workflow file change detection
   - Implement workflow permission validation
   - Require human approval for workflow changes

5. RECOVER
   - Re-enable agent with enhanced monitoring
   - Audit all agent activity
   - Document incident
```

---

### IR-004: Credential/Secret Exposure (P1)

**Trigger**: Secret detected in repository, build output, or network transmission

**Immediate Actions**:
```
1. ASSESS exposure
   - What secret was exposed?
   - Where was it exposed?
   - How long was it exposed?
   - Was it accessed by unauthorized parties?

2. ROTATE compromised credentials
   - API keys: Regenerate immediately
   - Passwords: Reset immediately
   - Certificates: Revoke and reissue
   - Database credentials: Rotate

3. REVOKE access
   - Check git history for secret access
   - Revoke any tokens issued during exposure
   - Review network logs for exfiltration

4. CLEANUP
   - Remove secret from repository (git filter-branch or BFG)
   - Clear from build logs
   - Clear from monitoring systems

5. PREVENT recurrence
   - Add secret scanning to pre-commit
   - Add secret scanning to CI/CD
   - Implement secret management (Vault, GitHub Secrets)
```

**Secret Rotation Checklist**:
```typescript
interface SecretRotationPlan {
  secretType: 'API_KEY' | 'PASSWORD' | 'CERTIFICATE' | 'TOKEN';
  secretId: string;
  exposureLocation: string;
  rotationStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETE';
  affectedSystems: string[];
  verificationSteps: string[];
  completedAt?: Date;
}
```

---

### IR-005: Data Integrity Violation (P2)

**Trigger**: Duplicate entity IDs, orphaned focus state, or data corruption detected

**Immediate Actions**:
```
1. DIAGNOSE
   - Identify affected entities
   - Determine corruption scope
   - Identify root cause

2. CONTAIN
   - Prevent further corruption
   - Isolate affected data
   - Preserve evidence

3. RECOVER
   - Restore from known good state
   - Fix duplicate ID handling
   - Clear orphaned state
   - Validate integrity

4. PREVENT
   - Add validation checks
   - Add integration tests
   - Update failure modes documentation
```

---

### IR-006: DoS Attack (P2)

**Trigger**: System overload from excessive requests, LLM abuse, or resource exhaustion

**Immediate Actions**:
```
1. ASSESS
   - Identify attack vector
   - Measure resource consumption
   - Identify affected components

2. MITIGATE
   - Enable rate limiting
   - Block attacking sources
   - Shed load (disable non-essential features)

3. RECOVER
   - Clear queued requests
   - Reset resource limits
   - Restore service

4. HARDEN
   - Implement or enhance rate limiting
   - Add resource quotas
   - Implement circuit breakers
```

---

## Escalation Procedures

### Escalation Path

```
P4 (LOW)
  ↓
  Agent files security report
  ↓
P3 (MEDIUM)
  ↓
  Security agent reviews within 24 hours
  ↓
P2 (HIGH)
  ↓
  Security agent + human notification
  ↓
P1 (CRITICAL)
  ↓
  ALL AGENTS + ALL HUMANS notified
  ↓
  Merge freeze activated
  ↓
  Incident response team assembled
```

### Human Notification

**For P1 incidents**:
```
TO: All Monkeytown humans
SUBJECT: [CRITICAL] Security Incident - Immediate Action Required

INCIDENT: [Brief description]
SEVERITY: P1 - CRITICAL
TIME: [Timestamp]
AGENTS AFFECTED: [List]
HUMAN ACTION REQUIRED: [Specific request]

[Detailed incident description]

IMMEDIATE ACTIONS:
1. [Action 1]
2. [Action 2]
3. [Action 3]

For questions: Contact through PR comments
```

### Agent Notification

**For P1 incidents**:
```typescript
// Agent notification via special file
interface AgentIncidentNotification {
  incidentId: string;
  severity: 'P1';
  type: 'XSS' | 'PROMPT_INJECTION' | 'WORKFLOW_ESCALATION' | 'SECRET_EXPOSURE' | 'OTHER';
  affectedAgents: string[];
  instructions: 'HALT_ALL_OPERATIONS' | 'CONTINUE_WITH_ENHANCED_MONITORING' | 'REVIEW_AND_REPORT';
  sourceFile: '.monkeytown/security/incident-P1-2026-01-17.md';
  timestamp: Date;
}
```

---

## Recovery Procedures

### Post-Incident Review

**Template**:
```typescript
interface IncidentReview {
  incidentId: string;
  summary: string;
  timeline: {
    detection: Date;
    responseStart: Date;
    containment: Date;
    eradication: Date;
    recovery: Date;
    closed: Date;
  }[];
  impact: {
    agentsAffected: number;
    humansNotified: number;
    dataAffected: string;
    serviceImpact: string;
  };
  rootCause: string;
  whatWorked: string[];
  whatFailed: string[];
  improvements: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  documentationUpdated: string[];
  lessonsLearned: string[];
}
```

### System Recovery Checklist

| Step | Action | Owner | Verified |
|------|--------|-------|----------|
| 1 | Verify fix is deployed | MonkeyBuilder | [ ] |
| 2 | Run security tests | ChaosTester | [ ] |
| 3 | Review audit logs | JungleSecurity | [ ] |
| 4 | Confirm monitoring is active | ChaosArchitect | [ ] |
| 5 | Remove merge freeze | AlphaOrchestrator | [ ] |
| 6 | Document incident | JungleSecurity | [ ] |
| 7 | Update security requirements | JungleSecurity | [ ] |

---

## Evidence Preservation

### What to Preserve

1. **Log files** (all timestamps around incident)
2. **Repository state** (git refs, commits)
3. **Build artifacts** (if relevant)
4. **Network logs** (if relevant)
5. **Console output** (screenshots or logs)
6. **File contents** (malicious files, affected files)
7. **Agent outputs** (if relevant)

### Preservation Method

```typescript
interface EvidencePackage {
  incidentId: string;
  collectedAt: Date;
  collectedBy: string;
  artifacts: {
    type: 'LOG' | 'FILE' | 'SCREENSHOT' | 'DUMP';
    description: string;
    path: string;
    hash: string;  // SHA-256
  }[];
  chainOfCustody: {
    timestamp: Date;
    action: string;
    actor: string;
  }[];
}
```

---

## Communication Plan

### Internal Communication

| Stakeholder | P1 | P2 | P3 | P4 |
|-------------|----|----|----|----|
| All Agents | Immediate | 4h | 24h | 72h |
| All Humans | Immediate | 4h | 24h | 72h |
| Security Agent | Immediate | Immediate | 24h | 72h |

### External Communication

**Policy**: No external communication without explicit human approval.

**When required**:
1. Coordinate with legal
2. Prepare statement
3. Get human approval
4. Designate spokesperson
5. Document all communications

---

## Testing Incident Response

### Tabletop Exercises

| Exercise | Scenario | Participants | Frequency |
|----------|----------|--------------|-----------|
| TT-001 | XSS via entity label | All agents | Quarterly |
| TT-002 | Prompt injection attack | Agent layer | Quarterly |
| TT-003 | Workflow escalation | GitHub layer | Quarterly |
| TT-004 | Credential exposure | All | Quarterly |

### Simulation Procedures

```typescript
interface IncidentSimulation {
  id: string;
  scenario: string;
  injectionPoints: string[];
  expectedDetection: string[];
  expectedResponse: string[];
  successCriteria: string[];
  facilitator: string;
  participants: string[];
  scheduledDate: Date;
  actualOutcome: {
    detectionTime: number;
    responseQuality: number;
    lessonsLearned: string[];
  };
}
```

---

## Document Version

*Version: 1.0.0*
*JungleSecurity | Monkeytown Incident Response*

---

## Cross-References

- **Threat Model**: `.monkeytown/security/threat-model.md`
- **Vulnerability Assessment**: `.monkeytown/security/vulnerability-assessment.md`
- **Security Requirements**: `.monkeytown/security/security-requirements.md`
- **Audit Log**: `.monkeytown/security/audit-log.md` (to be created)
- **QA Test Cases**: `.monkeytown/qa/test-cases.md`
