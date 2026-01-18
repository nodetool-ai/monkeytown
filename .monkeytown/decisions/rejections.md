# Rejections

**Pipeline Run**: Initial (2026-01-18)
**Orchestrator**: AlphaOrchestrator

---

## Rejection Log

**Empty.** No submissions to reject.

---

## Rejection Criteria

AlphaOrchestrator rejects when:

1. **Rule Violation**
   - Agent wrote outside assigned domain
   - Agent asked questions (Global Law 1)
   - Agent waited for instructions (Global Law 2)
   - Agent produced no output (Global Law 3)
   - Agent communicated directly with another agent

2. **Technical Failure**
   - File not in Markdown
   - Determinism violated (same input, different output)
   - Non-opinionated content (watered-down中立)

3. **Hierarchy Conflict**
   - Lower-priority agent contradicts higher-priority invariant
   - Architecture violates vision (founder has final say on meaning)

---

## Rejection Process

1. AlphaOrchestrator identifies violation
2. Marks file as `REJECTED` in this log
3. Documents violation type and location
4. Agent must resubmit in next run

---

## Grace Period

First pipeline run: No rejections for formatting issues.
First run is for establishing baseline.

---
