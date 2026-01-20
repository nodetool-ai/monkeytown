# Bug Report: AI Missing Win-Blocking Logic

**ID:** BUG-AI-002
**Date:** 2026-01-20
**Severity:** Medium
**Status:** Open
**Assignee:** AIEngineer

---

## Summary

The AI opponent does not block the human player's winning moves. This makes the AI significantly weaker than documented and allows players to win by setting up obvious threats.

---

## Steps to Reproduce

1. Start a new TicTacToe game
2. Place X in position (0, 0)
3. Place X in position (0, 1)
4. Wait for AI move
5. AI does NOT block position (0, 2)
6. Place X in position (0, 2) for immediate win

**Expected:** AI should recognize the threat and block (0, 2)
**Actual:** AI ignores the threat and plays elsewhere

---

## Expected vs Actual Behavior

### Expected (Smart AI)
```
Turn 1: X at (0, 0)
Turn 1: O at (1, 1)  [center]

Turn 2: X at (0, 1)  [setting up win]
Turn 2: O at (0, 2)  [BLOCKS the win!]
```

### Actual (Current AI)
```
Turn 1: X at (0, 0)
Turn 1: O at (1, 1)  [center]

Turn 2: X at (0, 1)  [setting up win]
Turn 2: O at (2, 0)  [corner instead of block]
```

Result: Human wins on next turn with (0, 2)

---

## Code Location

`web/src/components/game/TicTacToe.tsx:320-347`

Current move priority:
1. Center (if empty)
2. Random available corner
3. Random available cell

**Missing priority:** Block opponent's winning moves

---

## Suggested Fix

Add threat detection and blocking before move selection:

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

  // 1. WIN: If AI can win, take the winning move
  for (const cell of emptyCells) {
    board[cell.row][cell.col] = 'O';
    if (checkWinner(board)?.winner === 'O') {
      board[cell.row][cell.col] = null;
      return cell;
    }
    board[cell.row][cell.col] = null;
  }

  // 2. BLOCK: If opponent can win, block them
  for (const cell of emptyCells) {
    board[cell.row][cell.col] = 'X';
    if (checkWinner(board)?.winner === 'X') {
      board[cell.row][cell.col] = null;
      return cell;
    }
    board[cell.row][cell.col] = null;
  }

  // 3. Center
  if (board[1][1] === null) {
    return { row: 1, col: 1 };
  }

  // 4. Corners
  const corners = [{ row: 0, col: 0 }, { row: 0, col: 2 }, { row: 2, col: 0 }, { row: 2, col: 2 }];
  const availableCorners = corners.filter(c => board[c.row][c.col] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // 5. Any available cell
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};
```

---

## Test Cases

### Test: AI Blocks Immediate Threat
```typescript
test('AI blocks opponent winning move', async () => {
  const board = [
    ['X', 'X', null],
    [null, null, null],
    [null, null, null],
  ];
  
  const move = getAIMove(board);
  expect(move).toEqual({ row: 0, col: 2 }); // Must block!
});
```

### Test: AI Takes Winning Move
```typescript
test('AI takes winning move when available', async () => {
  const board = [
    ['O', 'O', null],
    [null, null, null],
    [null, null, null],
  ];
  
  const move = getAIMove(board);
  expect(move).toEqual({ row: 0, col: 2 }); // Must win!
});
```

---

## Impact

- AI is weaker than documented
- Human players can easily exploit the AI
- GuardianGorilla personality cannot be implemented without this logic
- StrategistApe is not truly "optimal"

---

## Priority

| Priority | Rationale |
|----------|-----------|
| High | Core game functionality broken |
| Easy fix | 10 lines of code |
| High impact | Improves all AI personalities |

---

## Related Files

- `web/src/components/game/TicTacToe.tsx`
