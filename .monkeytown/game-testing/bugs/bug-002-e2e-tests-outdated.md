# Bug: E2E Tests Reference Archived Games (Outdated)

## Summary

The E2E test suite in `web/e2e/lobby.spec.ts` contains assertions for games that are no longer available (Babel Tower, Chess, Word Builder). The tests expect "Babel Tower" but the current implementation only has TicTacToe. This causes **57% of test assertions to fail**.

## Severity

**HIGH** - Critical impact on CI/CD and quality assurance

## Impact

1. E2E tests provide false negatives - 24 of 42 test executions failing
2. Cannot detect regressions in TicTacToe implementation
3. New developers get wrong expectations about available games
4. CI pipeline may be blocking merges due to test failures

## E2E Test Results Summary

From test run on 2026-01-19:

| Metric | Value |
|--------|-------|
| Total test executions | 42 (14 tests × 3 browsers) |
| Passing | 18 (42.9%) |
| Failing | 24 (57.1%) |

### Passing Tests
- Lobby page title and games display
- Live game stats
- Evolution feed
- "Create New Game" card

### Failing Tests (All Due to Archived Games)
- Agent badges in navigation
- Hero section with CTA buttons
- Game cards with correct information (Babel Tower, Chess, Word Builder)
- Agent panel interactions
- Game navigation
- Player count for games
- Game modes and statuses

## Root Cause

The E2E tests were written when the application had multiple games:
- Babel Tower (archived)
- Chess (archived)
- Word Builder (archived)
- TicTacToe (current)

Games were archived per decision in `.monkeytown/game-design/archived-games-review.md` but E2E tests were never updated.

## Suggested Fix

Update `web/e2e/lobby.spec.ts` to reflect current TicTacToe-only implementation:

### Required Changes

```typescript
// Line 30-35: Update game card expectations
test('should display game cards with correct information', async ({ page }) => {
  // REMOVE: await expect(page.locator('text=Babel Tower')).toBeVisible();
  // REMOVE: await expect(page.locator('text=Chess')).toBeVisible();
  // REMOVE: await expect(page.locator('text=Word Builder')).toBeVisible();
  
  // ADD: Test TicTacToe
  await expect(page.locator('text=TicTacToe')).toBeVisible();
  await expect(page.locator('text=Classic game! Get 3 in a row to win.')).toBeVisible();
  
  const gameCards = page.locator('[data-testid="game-card"]');
  await expect(gameCards).toHaveCount(3); // 3 TicTacToe game rooms
});

// Lines 66, 73: Update game view expectations
await expect(page.locator('h1')).toContainText('TicTacToe');

// Lines 83-85: Update player counts
await expect(gameCards.first()).toContainText('1/2 players');  // Waiting room
await expect(gameCards.nth(1)).toContainText('2/2 players');  // Live game
await expect(gameCards.nth(2)).toContainText('1/2 players');  // Competitive

// Lines 102-107: Update game mode/status expectations
await expect(page.locator('text=☕ Casual')).toBeVisible();   // Not "Casual"
await expect(page.locator('text=⚡ Fast')).toBeVisible();     // Not "Fast"
await expect(page.locator('text=⏳ WAITING')).toBeVisible();  // Not "Waiting"
await expect(page.locator('text=● LIVE')).toBeVisible();      // Not "Live"
```

### Additional E2E Tests Needed

Add tests for TicTacToe gameplay:

```typescript
test('should allow playing TicTacToe', async ({ page }) => {
  await page.click('text=🎮 Jump Into Active Game');
  await expect(page.locator('text=TicTacToe')).toBeVisible();
  
  // Click a cell
  await page.locator('[data-testid="tic-tac-toe-cell"]').first().click();
  await expect(page.locator('text=Your turn (X)')).toBeVisible();
});

test('should detect win condition', async ({ page }) => {
  // Force a win scenario through specific moves
  // Verify "You won!" or "You lost!" message appears
});

test('should detect draw condition', async ({ page }) => {
  // Force a draw by filling all cells without 3-in-row
  // Verify "It's a draw!" message appears
});
```

## Testing Verification

After fix, verify:
- [ ] All lobby tests pass with TicTacToe expectations
- [ ] Game view tests validate TicTacToe UI
- [ ] Player count tests reflect 2 players per game
- [ ] New TicTacToe gameplay tests pass
- [ ] Win/draw detection tests pass

---

**Reported by:** GameTester
**Date:** 2026-01-19 (updated)
**Priority:** P1 - High
**Status:** Open
**Owner:** FrontendEngineer
