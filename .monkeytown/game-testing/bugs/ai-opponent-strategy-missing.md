# Bug Report: AI Opponent Strategy Not Implemented

**ID:** BUG-AI-001
**Date:** 2026-01-20
**Severity:** High
**Status:** Open
**Assignee:** AIEngineer

---

## Summary

Only one AI strategy exists in TicTacToe. According to documentation, 7 distinct AI personalities should be available, each with unique strategies and difficulty levels. Currently, all AI types use the same simple heuristic.

---

## Steps to Reproduce

1. Open `/` in browser
2. Click "Jump Into Active Game"
3. Play TicTacToe against AI
4. Observe AI always uses same strategy (center → corners → random)
5. No option to change AI personality

**Expected:** Ability to select from 7 AI opponents with different strategies
**Actual:** Single hardcoded AI strategy

---

## Documentation Requirements

From `docs/games/tictactoe.md`:
| Agent | Style |
|-------|-------|
| 🎭 TricksterMonkey | Unpredictable, loves bluffs |
| 🧩 StrategistApe | Calculated, long-term planning |
| ⚡ SpeedyGibbon | Quick decisions, aggressive |
| 🛡️ GuardianGorilla | Defensive, blocks opponents |
| 🃏 WildcardLemur | Random strategies |
| 📚 MentorOrangutan | Teaching, explains moves |
| 🏆 ChampionChimp | Perfect play using minimax |

From `.monkeytown/game-design/tictactoe-game-design.md`:
| Agent | Type | Strategy | Difficulty |
|-------|------|----------|------------|
| ChampionChimp | Minimax | Perfect play | Impossible |
| StrategistApe | Minimax | Optimal moves | Hard |
| TricksterMonkey | Heuristic | Traps, unpredictability | Medium-Hard |
| GuardianGorilla | Heuristic | Blocking focused | Medium |
| SpeedyGibbon | Heuristic | Aggressive, fast | Medium |
| WildcardLemur | Random | Unpredictable | Easy |
| MentorOrangutan | Heuristic | Teaching | Easy |

---

## Current Implementation

`web/src/components/game/TicTacToe.tsx:274`:
```typescript
players: [
  { id: playerId, name: 'You', type: 'human', symbol: 'X' },
  { id: 'ai-opponent', name: 'AI Opponent', type: 'agent', agentType: 'strategist', symbol: 'O' },
],
```

`web/src/components/game/TicTacToe.tsx:320-347`:
```typescript
const getAIMove = (board: TicTacToeBoard): { row: number; col: number } | null => {
  const emptyCells: { row: number; col: number }[] = [];
  // ... collect empty cells

  // Try center
  if (board[1][1] === null) {
    return { row: 1, col: 1 };
  }

  // Try corners
  const corners = [{ row: 0, col: 0 }, ...];
  const availableCorners = corners.filter(c => board[c.row][c.col] === null);
  if (availableCorners.length > 0) {
    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  // Random available cell
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};
```

**Issues:**
1. No win-blocking logic
2. No minimax algorithm
3. No personality-based strategies
4. Single hardcoded AI type

---

## Expected Behavior

Each AI personality should have distinct move selection logic:

1. **ChampionChimp**: Minimax algorithm with alpha-beta pruning, always optimal
2. **StrategistApe**: Minimax with depth limit, very strong but not perfect
3. **TricksterMonkey**: Heuristic with trap detection, tries to set up forks
4. **GuardianGorilla**: Prioritizes blocking opponent threats
5. **SpeedyGibbon**: Random aggressive moves, less defensive
6. **WildcardLemur**: Completely random valid moves
7. **MentorOrangutan**: Standard heuristic with teaching messages

---

## Suggested Fix

### Phase 1: Add Strategy Selection
```typescript
const AI_STRATEGIES: Record<string, (board: TicTacToeBoard, symbol: string) => Move> = {
  champion: minimaxStrategy,
  strategist: optimalStrategy,
  trickster: trapStrategy,
  guardian: blockingStrategy,
  speedy: aggressiveStrategy,
  wildcard: randomStrategy,
  mentor: teachingStrategy,
};
```

### Phase 2: Implement Minimax
```typescript
function minimax(board: TicTacToeBoard, depth: number, isMaximizing: boolean): number {
  const result = checkWinner(board);
  if (result === 'X') return 10 - depth;
  if (result === 'O') return depth - 10;
  if (isBoardFull(board)) return 0;
  
  // ... recursion
}
```

### Phase 3: Add UI Selection
```typescript
// In GameCard or Game setup
<select onChange={(e) => setAIType(e.target.value)}>
  <option value="champion">🏆 ChampionChimp</option>
  <option value="strategist">🧩 StrategistApe</option>
  {/* ... */}
</select>
```

---

## Impact

- Game lacks variety and replayability
- Cannot test different AI difficulty levels
- Does not match documented feature set
- Balance testing impossible

---

## Related Files

- `web/src/components/game/TicTacToe.tsx`
- `docs/games/tictactoe.md`
- `.monkeytown/game-design/tictactoe-game-design.md`

---

## Test Plan

1. Add unit tests for each AI strategy
2. Verify ChampionChimp vs ChampionChimp always draws
3. Verify AI blocks winning threats (when implemented)
4. Test all 7 personalities produce different move patterns
