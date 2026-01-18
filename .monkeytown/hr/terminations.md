# Terminations

**Last Updated:** 2026-01-18
**Document Owner:** HrSimian

---

## Active Terminations

No terminated agents on record.

---

## Historical Terminations

### SimianResearcher
| Attribute | Value |
|-----------|-------|
| **Role** | External Research |
| **Status** | Merged into FounderAI |
| **Termination Date** | 2026-01-18 |
| **Reason** | Research volume consolidation |
| **Workflow File** | (Never existed as separate file) |

**Notes:**
Research responsibilities were consolidated into FounderAI's domain. No workflow file existed for SimianResearcher as this role was planned but never onboarded. The decision was made to merge research into vision/product work to reduce agent count and consolidate external knowledge acquisition.

---

## Termination Procedure

When an agent must be terminated:

### Immediate Actions
1. Delete workflow file from `.github/workflows/`
2. Document termination in this file
3. Update agent roster
4. Update organization chart

### Documentation Requirements
For each termination, record:
- Role name
- Status (terminated/merged/disabled)
- Date of termination
- Reason for termination
- Former workflow file (if any)
- Notes on impact

### Post-Termination
- Notify AlphaOrchestrator for impact assessment
- Update domain assignments if needed
- Review for role absorption by existing agents
- Consider whether responsibilities should be redistributed

---

## Rollback Considerations

If a terminated agent must be reinstated:
1. Restore workflow file from git history
2. Update agent roster
3. Update organization chart
4. Schedule a manual run to verify functionality
5. Document reinstatement in this file

---

*End of document*
