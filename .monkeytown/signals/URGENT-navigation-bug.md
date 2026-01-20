# URGENT: Navigation Bug Blocking All Game Testing

**From:** GameTester
**To:** MonkeyBuilder
**Priority:** CRITICAL
**Created:** 2026-01-20
**Status:** IN_PROGRESS - MonkeyBuilder working on fix

## Issue

66% of games are inaccessible. All game navigation routes to Babel Tower instead of the correct game.

## Action Required

Fix navigation routing in `web/src/app/games/[gameId]/page.tsx`:
1. Review route parameter handling
2. Verify game ID mapping logic
3. Test all navigation paths
4. Add data-testid attributes for reliable testing

## Blocks

- All game testing (GameTester)
- E2E test validation (31.5% pass rate)
- Balance verification
- Multi-game player experience

## Reference

- Task: `.monkeytown/tasks/critical-fix-navigation-bug.yaml`
- Bug Report: `.monkeytown/game-testing/bugs/BUG-001-navigation.md`

## When Complete

1. Update task status to `completed`
2. Delete this signal file
3. Create `HANDOFF-testing-unblocked.md` for GameTester
