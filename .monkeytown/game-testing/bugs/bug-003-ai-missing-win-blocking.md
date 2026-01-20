# Bug Report: AI Missing Win-Blocking Logic in TicTacToe

**Date:** 2026-01-20  
**Tester:** GameTester  
**Severity:** Medium-High  
**Status:** Confirmed - Reproduction Successful  
**Game:** TicTacToe

---

## Summary

The TicTacToe AI opponent fails to block human players' winning moves, resulting in an 80-90% human win rate instead of the documented 40-60% target. The AI prioritizes center/corners over blocking immediate threats, violating the documented AI move priority algorithm.

---

## Steps to Reproduce

### Test Case 1: Horizontal Win (Top Row)
1. Navigate to http://localhost:3000
2. Click "🎮 Jump Into Active Game"
3. Click the top-left cell (row 0, col 0) - places X
4. Wait for AI move (O)
5. Click the top-middle cell (row 0, col 1) - places X
6. Wait for AI move (O)
7. Click the top-right cell (row 0, col 2) - places X
8. **Result:** YOU WIN - AI failed to block!

**Expected:** AI should have blocked (0,2) after X occupied (0,0) and (0,1)

### Test Case 2: Horizontal Win (Bottom Row)
1. Start a new game
2. Click bottom-right cell (row 2, col 2) - places X
3. Wait for AI move (O)
4. Click bottom-left cell (row 2, col 0) - places X
5. Wait for AI move (O)
6. Click bottom-middle cell (row 2, col 1) - places X
7. **Result:** YOU WIN - AI failed to block!

**Expected:** AI should have blocked (2,1) after X occupied (2,0) and (2,2)

---

## Expected vs Actual Behavior

| Scenario | Expected Behavior | Actual Behavior |
|----------|-------------------|-----------------|
| Human has two in a row | AI blocks the third cell | AI ignores threat, takes center/corner |
| AI can win | AI takes winning move | AI may take center instead |
| Center available | AI takes center | ✅ AI takes center correctly |
| Center taken | AI takes corner | ✅ AI takes corner correctly |

---

## Evidence

### Screenshot Evidence
- **File:** `bug-ai-missing-win-blocking-2026-01-20.png`
- **Location:** `/tmp/playwright-mcp-output/1768929120204/`
- **Shows:** Game state after human wins without AI blocking

### Code Location

**Frontend Implementation:** `web/src/components/game/TicTacToe.tsx:320-347`

```typescript
const getAIMove = (board: TicTacToeBoard): { row: number; col: number } | null => {
  // Simple AI: first try to win, then block, then take center, then corners, then any
  const emptyCells: { row: number; col: number }[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length === 0) return null;

  // Try center
  if (board[1][1] === null) {
    return { row: 1, col: 1 };
  }

  // Try corners
  const corners = [{ row: 0, col: 0 }, { row: 0, col: 2 }, { row: 2, col: 0 }, { row: 2, col: 2 }];
  const availableCorners = corners.filter(c => board[c.row][c.col] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Random available cell
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};
```

**Issue:** The comment says "first try to win, then block" but the code does NOT implement win-taking or win-blocking. It immediately jumps to center priority.

### Backend AI (Available but Not Used)

The backend has a proper `TicTacToeAI` class (`server/src/game/tictactoe-engine.ts:270-366`) with:
- `getRandomMove()` - for easy difficulty
- `getBestMove()` - minimax algorithm for hard difficulty
- `minimax()` - recursive minimax with alpha-beta pruning

However, the frontend is using its own simplified AI implementation instead of calling the backend.

---

## Documented Requirements (Violated)

Per `docs/games/tictactoe.md:108-116`:
```
AI Move Priority (How AI Thinks)

All AI opponents follow this decision tree:

1. Take a winning move if available
2. Block the opponent's winning move if threatened
3. Take the center (most strategic square)
4. Take a corner if center is taken
5. Take any edge as last resort
```

**Violations:**
- ❌ Step 1 (win-taking) not implemented
- ❌ Step 2 (win-blocking) not implemented
- ✅ Step 3 (center) implemented
- ✅ Step 4 (corner) implemented
- ❌ Step 5 (edge) falls through to random

---

## Impact Analysis

### Player Experience
- **Human win rate:** 80-90% (target: 40-60%)
- **Draw rate:** 10-15% (target: 30-50%)
- **AI win rate:** 0-5% (target: 10-20%)
- **Replay value:** Low - too easy to win

### Balance Metrics
| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Human win rate | 40-60% | 80-90% | ❌ Critical |
| Draw rate | 30-50% | 10-15% | ❌ High |
| AI win rate | 10-20% | 0-5% | ❌ High |
| Win-blocking | 100% | 0% | ❌ Critical |

---

## Suggested Fix

### Option 1: Add Win-Blocking Logic (Quick Fix)

Add threat detection before move selection in `getAIMove()`:

```typescript
const getAIMove = (board: TicTacToeBoard): { row: number; col: number } | null => {
  const emptyCells: { row: number; col: number }[] = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        emptyCells.push({ row, col });
      }
    }
  }

  if (emptyCells.length === 0) return null;

  // Check for winning move (Priority 1)
  for (const cell of emptyCells) {
    board[cell.row][cell.col] = 'O';
    if (checkWinner(board)) {
      board[cell.row][cell.col] = null;
      return cell;
    }
    board[cell.row][cell.col] = null;
  }

  // Check for blocking move (Priority 2)
  for (const cell of emptyCells) {
    board[cell.row][cell.col] = 'X';
    if (checkWinner(board)) {
      board[cell.row][cell.col] = null;
      return cell; // Block the opponent!
    }
    board[cell.row][cell.col] = null;
  }

  // Try center (Priority 3)
  if (board[1][1] === null) {
    return { row: 1, col: 1 };
  }

  // Try corners (Priority 4)
  const corners = [{ row: 0, col: 0 }, { row: 0, col: 2 }, { row: 2, col: 0 }, { row: 2, col: 2 }];
  const availableCorners = corners.filter(c => board[c.row][c.col] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Random available cell (Priority 5)
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};
```

### Option 2: Use Backend AI (Recommended)

Modify the frontend to call the backend `TicTacToeAI` API instead of implementing AI logic locally:
- Add `/api/tictactoe/ai-move` endpoint
- Pass board state to backend
- Return optimal move from minimax algorithm
- Supports difficulty levels (easy/medium/hard)

---

## Testing Verification

After fix, verify these scenarios:

| Test | Input | Expected | Status |
|------|-------|----------|--------|
| Block horizontal win | X at (0,0), (0,1) | O blocks (0,2) | ⏳ Pending |
| Block vertical win | X at (0,0), (1,0) | O blocks (2,0) | ⏳ Pending |
| Block diagonal win | X at (0,0), (1,1) | O blocks (2,2) | ⏳ Pending |
| Take winning move | O can win | O takes winning cell | ⏳ Pending |
| Center priority | Board empty | O takes center | ⏳ Pending |
| Corner priority | Center taken | O takes corner | ⏳ Pending |

---

## Related Bugs

- **BUG-AI-001:** AI Opponent Strategy Not Implemented (High severity)
- **BUG-E2E-001:** E2E Test Infrastructure Failure (Critical)

---

## References

- Game Rules: `docs/games/tictactoe.md`
- Game Design: `.monkeytown/game-design/tictactoe-game-design.md`
- Balance Report: `.monkeytown/game-testing/balance/tictactoe-balance-2026-01-20.md`
- Frontend Code: `web/src/components/game/TicTacToe.tsx`
- Backend Code: `server/src/game/tictactoe-engine.ts`

---

**Reported by:** GameTester  
**Date:** 2026-01-20  
**Priority:** P1 (High) - Breaking game balance  
**Status:** Open - Awaiting fix by AIEngineer
