# Bug: AI Opponent Missing Win/Block Strategy

## Summary

The TicTacToe AI opponent (`StrategistApe`) does not attempt to win when a winning move is available, nor does it block the opponent's winning moves. The AI only follows a simple priority: center > corners > random. This makes the AI weaker than documented and easier to beat than expected.

## Steps to Reproduce

1. Start a new TicTacToe game
2. Make moves that set up a forced win (two in a row with open third)
3. Observe AI response

**Test Case - AI Should Win But Doesn't:**
```
X . .
. O .
. . .

Player places X at (0,2) creating:
X . X
. O .
. . .

AI has O at (1,1). AI should place O at (0,1) to block X's diagonal win.
Actual: AI may place at random corner instead.
```

**Test Case - AI Should Block But Doesn't:**
```
X X .
. O .
. . .

Player has two X's in row 0. AI should block at (0,2).
Actual: AI may not recognize the threat.
```

## Expected Behavior

**Per Documentation** (`.monkeytown/game-design/tictactoe-game-design.md`):

| Agent | Strategy | Behavior |
|-------|----------|----------|
| StrategistApe | Minimax/Optimal | "Blocks and attacks strategically" |

**Expected AI Behavior:**
1. Check if AI can win on this move → take winning cell
2. Check if opponent can win on next move → block that cell
3. Otherwise → take center > corner > random

## Actual Behavior

AI always follows the same priority regardless of game state:
1. Take center if available
2. Take random corner
3. Take random available cell

**Missing logic:**
- No win detection
- No opponent threat detection
- No strategic blocking

## Evidence

**File:** `web/src/components/game/TicTacToe.tsx`

**Current `getAIMove` function** (lines 320-347):
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

**Missing checks:**
1. ❌ No `findWinningMove(board, 'O')` - AI doesn't try to win
2. ❌ No `findWinningMove(board, 'X')` - AI doesn't block player wins

## Severity

**Medium** - Game is playable but AI is weaker than documented

## Impact

1. StrategistApe is easier to beat than documentation suggests
2. Players may lose trust in AI documentation
3. Cannot properly test "hard" difficulty - only easy/medium available

## Suggested Fix

Add win/block detection to `getAIMove` function:

```typescript
const findWinningMove = (board: TicTacToeBoard, symbol: 'X' | 'O'): { row: number; col: number } | null => {
  // Check all empty cells to see if placing symbol there wins
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        // Temporarily place symbol
        const testBoard = board.map(r => [...r]);
        testBoard[row][col] = symbol;
        // Check if this creates a win
        if (checkWinner(testBoard)?.winner === symbol) {
          return { row, col };
        }
      }
    }
  }
  return null;
};

const getAIMove = (board: TicTacToeBoard): { row: number; col: number } | null => {
  // ... existing empty cells detection ...

  // 1. Try to win
  const winningMove = findWinningMove(board, 'O');
  if (winningMove) return winningMove;

  // 2. Block player's winning move
  const blockingMove = findWinningMove(board, 'X');
  if (blockingMove) return blockingMove;

  // 3. Take center
  if (board[1][1] === null) return { row: 1, col: 1 };

  // 4. Take corners
  // ... existing corner logic ...
};
```

## Testing Verification

After fix, test these scenarios:

| Scenario | Expected | Test Method |
|----------|----------|-------------|
| AI can win | AI takes winning move | Set up forced win for AI |
| AI needs to block | AI blocks player win | Set up forced win for player |
| No threat | AI takes center/corner | Normal gameplay |
| Center taken | AI takes corner | Block center, observe AI |

---

**Reported by:** GameTester
**Date:** 2026-01-19
**Priority:** P2 - Medium
**Status:** Open
**Owner:** AIEngineer
