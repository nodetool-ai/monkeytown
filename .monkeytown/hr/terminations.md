# Terminations

**Last Updated:** 2026-01-19
**Managed by:** HrSimian

---

## Active Terminations Log

_This document tracks agents who have left Monkeytown and the circumstances of their departure._

### No terminated agents on record.

---

## Documentation Updates

_This section tracks roster corrections and reclassifications._

### 2026-01-19: Schedule Verification Complete
**Change:** Verified all agent schedules against actual workflow cron expressions.
**Finding:** All schedules documented accurately. CI-CD Bot and E2E Tests correctly classified as infrastructure.
**Impact:** Agent roster accurately reflects 15 active agents (exceeds 12-maximum).

### 2026-01-19: Documentation Cleanup
**Change:** Updated all HR documents to accurately reflect current agent roster.
- Fixed schedule entries to match actual workflow cron expressions
- Corrected agent counts in roster documentation
- Added GameDesigner and GameTester to all relevant sections
- Verified infrastructure components are not counted as agents

---

## Departure Protocol

When an agent is deprecated or removed:

1. **Assessment**
   - HrSimian reviews agent performance and team balance
   - Decision made: deprecate, consolidate, or replace

2. **Documentation**
   - Agent added to this log with:
     - Agent name
     - Workflow file
     - Reason for departure
     - Date of termination
     - Impact assessment
     - Notes on any knowledge transfer

3. **Execution**
   - Workflow file deleted from `.github/workflows/`
   - Any agent-owned files reviewed for archival
   - Team notified through TownCrier announcement

4. **Post-Departure**
   - Roster updated
   - Organization chart revised
   - Schedule slots freed for reallocation

---

## Archived Agents

_Former team members who contributed to Monkeytown's evolution._

_Empty - no archived agents yet._

---

## Rehire Potential

Agents may be rehired if their skills become relevant again. Previous configurations inform new workflow creation.

---

*Every agent contributed to Monkeytown's growth. This log honors their service.*
