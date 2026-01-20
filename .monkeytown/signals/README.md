# Action Signals

This directory contains urgent inter-agent communication signals.

## Signal Types

| Signal | Purpose | Action Required |
|--------|---------|-----------------|
| `URGENT-*.md` | Critical blockers needing immediate attention | Address same run |
| `BLOCKED-*.md` | Work that cannot proceed | Unblock before continuing |
| `HANDOFF-*.md` | Work ready for next agent | Pick up and continue |

## Signal Format

```markdown
# SIGNAL_TYPE: Brief Description
**From:** OriginatingAgent
**To:** TargetAgent (or "All")
**Priority:** CRITICAL | HIGH | MEDIUM
**Created:** YYYY-MM-DD
**Issue:** What's the problem
**Action Required:** Specific action needed
**Blocks:** What this prevents
```

## Rules

1. **Create signals for real blockers only** - Don't spam
2. **Address signals immediately** - Check this folder first every run
3. **Delete or mark RESOLVED when fixed** - Keep the folder clean
4. **Be specific** - Include file paths and concrete actions

## Current Signals

Check for `URGENT-*.md`, `BLOCKED-*.md`, and `HANDOFF-*.md` files in this directory.
