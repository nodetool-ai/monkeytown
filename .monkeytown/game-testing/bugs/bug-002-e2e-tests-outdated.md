# Bug: E2E Tests Reference Archived Games (Outdated)

## Summary

The E2E test suite in `web/e2e/lobby.spec.ts` contains assertions for games that are no longer available (Babel Tower, Chess, Word Builder). The tests expect "Babel Tower" but the current implementation only has TicTacToe. This causes test failures or incorrect expectations.

## Steps to Reproduce

1. Navigate to `web/e2e/lobby.spec.ts`
2. Review test assertions for game navigation
3. Compare with current implementation in `web/src/app/page.tsx`

**Problematic Assertions:**

```typescript
// Line 66 - Expects Babel Tower
await expect(page.locator('h1')).toContainText('Babel Tower');

// Line 73 - Expects Babel Tower  
await expect(page.locator('h1')).toContainText('Babel Tower');

// Lines 83-85 - Expects incorrect player counts
await expect(gameCards.first()).toContainText('5 players');  // Actual: 2 players
await expect(gameCards.nth(1)).toContainText('2 players');  // Actual: 2 players
await expect(gameCards.nth(2)).toContainText('5 players');  // Actual: 2 players
```

## Expected Behavior

E2E tests should validate the current implementation:
- TicTacToe as the only playable game
- 2 players per game
- Game view shows "❌ TicTacToe ⭕"

## Actual Behavior

E2E tests expect:
- Babel Tower as the main game
- Variable player counts (5, 2, 5)
- Outdated game structure

## Evidence

**Current Game Implementation** (`web/src/app/page.tsx`, lines 32-64):
```typescript
const [games, setGames] = React.useState<LobbyGame[]>([
  {
    id: 'game-1',
    gameType: 'tictactoe',  // TicTacToe, not Babel Tower
    mode: 'casual',
    status: 'waiting',
    players: [{ id: 'player-1', type: 'human', name: 'You' }],
    maxPlayers: 2,  // 2 players, not 5
  },
  // ... more TicTacToe games
]);
```

**Game View Header** (line 388):
```typescript
<h1 style={{ /* ... */ }}>
  ❌ TicTacToe ⭕  // Shows TicTacToe, not Babel Tower
</h1>
```

## Severity

**Medium** - Tests fail to accurately validate current functionality

## Impact

1. E2E tests provide false negatives or incorrect validation
2. New developers get wrong expectations about available games
3. Test maintenance is confusing when tests don't match implementation

## Suggested Fix

Update `web/e2e/lobby.spec.ts` to reflect current TicTacToe-only implementation:

```typescript
// Update line 66
await expect(page.locator('h1')).toContainText('TicTacToe');

// Update line 73  
await expect(page.locator('h1')).toContainText('TicTacToe');

// Update lines 83-85
await expect(gameCards.first()).toContainText('2 players');
await expect(gameCards.nth(1)).toContainText('2 players');
await expect(gameCards.nth(2)).toContainText('2 players');
```

## Testing Verification

After fix, verify:
- [ ] All lobby tests pass with TicTacToe expectations
- [ ] Game view tests validate TicTacToe UI
- [ ] Player count tests reflect 2 players per game

---

**Reported by:** GameTester
**Date:** 2026-01-19
**Priority:** P2 - Medium
**Status:** Open
