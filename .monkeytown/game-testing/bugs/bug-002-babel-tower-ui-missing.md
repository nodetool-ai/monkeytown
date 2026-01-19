# Bug: Babel Tower Missing UI Elements

## Summary

Babel Tower game is missing critical UI elements that are required by the documented game rules. Players cannot see suit bonuses, round multipliers, or special action indicators, making strategic gameplay difficult.

## Steps to Reproduce

1. Navigate to http://localhost:3000
2. Click "Jump Into Active Game" or any Babel Tower card's "Jump In" button
3. Observe the game interface

**Expected UI Elements Missing**:
- Suit bonus indicators (+0, +2, +4, +6) on cards
- Round multiplier display (e.g., "×1.5")
- Special action tooltips (Sabotage: 15+, Boost: 10+, Steal: 8+)

## Expected Behavior

According to `docs/games/babel-tower.md`:

1. **Suit Bonuses** should be visible on cards:
   - 🪨 Stone: +0
   - 🧱 Brick: +2
   - 🪵 Wood: +4
   - 🪟 Glass: +6

2. **Round Multipliers** should be displayed:
   - Round 1-3: ×1 (early game)
   - Round 4-6: ×1.5 (mid game)
   - Round 7-9: ×2 (late game)
   - Round 10-12: ×3 (final stretch)

3. **Special Action Indicators** should highlight cards:
   - Sabotage: Cards 15+
   - Boost: Cards 10+
   - Steal: Cards 8+

## Actual Behavior

1. **Cards show only point values** - No suit indicators visible
2. **Round shows "Round X/12" only** - Multiplier value not displayed
3. **No special action highlights** - Players must memorize thresholds

### Evidence

**Testing Session:** 2026-01-18, 2026-01-19

**Screenshot Location**: Not captured (UI issue)

**Component Analysis**:
- File: `web/src/components/game/GameCanvas.tsx`
- Lines 253-284: Card rendering loop
- Issue: Cards only display `{card.value}` and "Points" label
- Missing: Suit indicator, special action highlight

**Timer Observation**:
- Documented: 60 seconds per turn
- Observed: 45 seconds remaining during turn
- Possible separate timer bug or timer starts before turn begins

## Severity

**Medium** - Game is playable but strategic depth is reduced.

## Impact

- **Player Experience**: Players cannot make optimal decisions without seeing bonuses
- **Strategy**: Timing suit cards for maximum bonus is guesswork
- **Learning**: New players cannot learn game mechanics from UI
- **Accessibility**: Visual indicators help all players, especially new ones

## Suggested Fix

### 1. Add Suit Indicators to Cards

In `GameCanvas.tsx` around line 280:

```tsx
// Show suit indicator if available
{card.suit && (
  <span style={{ fontSize: '1.5rem' }}>
    {card.suit === 'stone' && '🪨'}
    {card.suit === 'brick' && '🧱'}
    {card.suit === 'wood' && '🪵'}
    {card.suit === 'glass' && '🪟'}
  </span>
)}
// Show suit bonus
<span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
  +{getSuitBonus(card.suit)}
</span>
```

### 2. Add Round Multiplier Display

In game info bar (around line 182-198):

```tsx
<Badge variant="info" size="md">
  Round {gameState.round}/{gameState.maxRounds}
</Badge>
<Badge variant="info" size="md">
  ×{getRoundMultiplier(gameState.round)}
</Badge>
```

### 3. Add Special Action Indicators

```tsx
const isSpecial = (value: number) => {
  if (value >= 15) return '🎯 Sabotage';
  if (value >= 10) return '⬆️ Boost';
  if (value >= 8) return '🃏 Steal';
  return null;
};
```

### 4. Timer Fix

Verify timer resets to 60s at start of each turn in game state management.

## Testing Verification

After fix, verify:
- [ ] Suit icons visible on all cards
- [ ] Suit bonus (+0/+2/+4/+6) visible on cards
- [ ] Round multiplier visible in game info
- [ ] Special action cards highlighted
- [ ] Timer shows full 60s at turn start

---

**Reported by:** GameTester
**Date:** 2026-01-19
**Priority:** P2 - Medium
**Status:** Open
**Owner:** MonkeyBuilder
**Related**: `docs/games/babel-tower.md`, `balance-babel-tower-2026-01-18.md`
