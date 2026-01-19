# Bug: Game Navigation Routes All Games to Babel Tower

## Summary

All navigation paths from the lobby to individual games (Monkey Chess, Word Builder) incorrectly route to Babel Tower instead of the selected game. This prevents players from accessing Monkey Chess and Word Builder games.

## Steps to Reproduce

1. Navigate to http://localhost:3000
2. Locate "Monkey Chess" game card (♟️)
3. Click "Jump In" button on Monkey Chess card
4. Observe: Game loads as "🗼 Babel Tower" instead of Monkey Chess

**Additional Test Cases:**

| Button Clicked | Expected Game | Actual Game |
|----------------|---------------|-------------|
| Jump In (Monkey Chess) | Monkey Chess | Babel Tower |
| Jump In (Word Builder) | Word Builder | Babel Tower |
| Jump Into Active Game | First available | Babel Tower |

## Expected Behavior

Each game card should navigate to its respective game:
- Babel Tower card → Babel Tower game
- Monkey Chess card → Monkey Chess game
- Word Builder card → Word Builder game

## Actual Behavior

All navigation paths load the Babel Tower game interface regardless of which game was selected.

## Evidence

**Testing Session:** 2026-01-18
**Environment:** Local development (localhost:3000)

### Console Errors Observed

```
Warning: %s a style property during rerender (%s) when a conflicting property is set (%s) ca...
```

This React warning appears during game navigation, suggesting state management issues.

### UI State Verification

After navigating to "Monkey Chess":
- Heading shows: "🗼 Babel Tower" (should be "♟️ Monkey Chess")
- Game type shows: "babel" (should be "chess")
- Players: 3 players (Monkey Chess should have 2 players)
- Rounds: Round 4/12 (Babel Tower uses 12 rounds, Chess uses standard game)

## Severity

**Critical** - This bug completely blocks access to 2 of 3 games (66% of game library unavailable).

## Impact

- Players cannot access Monkey Chess (chess game with AI)
- Players cannot access Word Builder (word game with AI)
- Only Babel Tower is playable
- "Jump Into Active Game" button always loads Babel Tower

## Verification Evidence

**Testing Session:** 2026-01-19

**Code Review Confirmed Root Cause**:

File: `web/src/app/page.tsx`

1. **Line 271** - GameCard onPlay handler doesn't pass gameType:
```tsx
onPlay={() => setCurrentView('game')}  // No gameType parameter!
```

2. **Line 193** - GameDemo always renders Babel Tower:
```tsx
<GameDemo onBack={() => setCurrentView('lobby')} />
// GameDemo hardcoded to show "🗼 Babel Tower" at line 395
```

**Test Results**:
| Action | Expected | Actual |
|--------|----------|--------|
| Click Babel Tower "Jump In" | Babel Tower loads | ✅ Babel Tower loads |
| Click Monkey Chess "Jump In" | Monkey Chess loads | ❌ Babel Tower loads |
| Click Word Builder "Jump In" | Word Builder loads | ❌ Babel Tower loads |
| Click "Jump Into Active Game" | First available game | ✅ Babel Tower loads |

**Verified By**: GameTester (code review + manual testing)

## Suggested Fix

Check the game selection/routing logic in the navigation handlers:

1. **Verify game ID is passed correctly** from game card to navigation
2. **Check route parameter handling** for `/game/[gameId]` or similar
3. **Debug game selection state** - ensure clicking different cards updates the selected game ID

### Likely Code Locations

- `web/src/components/GameCard.tsx` - Check onClick handler
- `web/src/pages/index.tsx` or `web/src/app/page.tsx` - Check navigation logic
- `web/src/utils/game-router.ts` or similar - Check routing logic

### Quick Fix Attempt

```typescript
// In GameCard component, verify the onClick handler:
const handleJumpIn = (gameId: string) => {
  console.log('Navigating to game:', gameId); // Debug log
  router.push(`/game/${gameId}`);
};
```

Add console.log to verify the correct gameId is being passed when clicking different game cards.

## Testing Verification

After fix, test these paths:
- [ ] Babel Tower card → Babel Tower loads
- [ ] Monkey Chess card → Monkey Chess loads
- [ ] Word Builder card → Word Builder loads
- [ ] Jump Into Active Game → First available game loads correctly

---

**Reported by:** GameTester
**Date:** 2026-01-18
**Verified by:** GameTester (2026-01-19)
**Priority:** P0 - Critical
**Status:** VERIFIED - OPEN
**Owner:** MonkeyBuilder
