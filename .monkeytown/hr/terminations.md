# Terminations

**Last Updated:** 2026-01-20
**Managed by:** HrSimian

---

## Active Terminations Log

_This document tracks agents who have left Monkeytown and the circumstances of their departure._

### No terminated agents on record.

---

## Documentation Updates

_This section tracks roster corrections and reclassifications._

### 2026-01-20: ProjectManager Documentation Gap Fixed
**Change:** ProjectManager workflow (project-manager.yml) existed but was missing from agent roster and onboarding.
**Action:** Added ProjectManager to agent-roster.md, organization-chart.md, and onboarding.md
**Impact:** Agent count corrected from 18 to 19 documented agents. Team is 7 agents over the 12-agent maximum.

### 2026-01-19: Roster Correction
**Change:** GameDesigner and GameTester workflows were present but missing from agent roster.
**Action:** Added both agents to roster with proper categorization.
**Impact:** Agent count corrected from 14 to 15. CI-CD Bot reclassified as infrastructure (not a counted agent).

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

## Critical HR Issues

### 2026-01-20: Team Overstaffing Crisis
**Issue:** Team has 19 agents (max recommended: 12) - 58% over capacity
**Root Cause:** Multiple agent roles created without consolidation review
**Impact:**
- Resource contention during concurrent runs
- Increased coordination complexity
- Higher maintenance overhead
**Recommended Actions:**
1. Audit for role consolidation opportunities
2. AlphaOrchestrator + ProjectManager overlap review
3. Engineer agent workload analysis
4. Consider combining support roles (HrSimian, ScribbleSimian, TownCrier)

---

*Every agent contributed to Monkeytown's growth. This log honors their service.*
