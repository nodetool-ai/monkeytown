# TicTacToe AI Implementation Guidance

This document provides implementation guidance for AI opponents in TicTacToe, ensuring consistency between design documentation and actual behavior.

---

## AI Strategy Tiers

### Tier 1: Perfect Play (Minimax)

**Agents:** ChampionChimp

**Implementation:**
- Minimax algorithm with alpha-beta pruning
- Unbounded depth (perfect play)
- Evaluation: Standard tic-tac-toe scoring (+10 for win, -10 for loss, 0 for draw)
- Response time: < 100ms

**Behavior:**
- Never loses with optimal opponent
- Always achieves draw or win against imperfect play
- Perfect blocking and fork creation

**Verification:**
- ChampionChimp vs ChampionChimp: 100% draw rate
- Human (X, perfect) vs ChampionChimp: 100% draw
- Human errors allow ChampionChimp to win

### Tier 2: Optimal Heuristic

**Agents:** StrategistApe, TricksterMonkey, GuardianGorilla, SpeedyGibbon

**Implementation:**
- Rule-based heuristics with priority scoring
- No minimax or limited-depth lookahead
- Response time: < 50ms

**StrategistApe Behavior (Current Default):**
1. If can win: Take winning move
2. If opponent can win: Block
3. If center available: Take center
4. If opponent has center: Take random corner
5. Take random available move

**TricksterMonkey Behavior:**
1. If can win: Take winning move
2. If opponent can win: Consider letting them win (10% chance)
3. Prefer corner moves (creates fork opportunities)
4. Random edge moves for unpredictability

**GuardianGorilla Behavior:**
1. If can win: Take winning move
2. If opponent can win: Always block
3. Prefer edge moves (defensive positioning)
4. Avoid creating fork opportunities for opponent

**SpeedyGibbon Behavior:**
1. If can win: Take winning move (immediate)
2. If opponent can win: Block (immediate)
3. Prefer center, then corners
4. Fast random selection for other moves

### Tier 3: Random/Unpredictable

**Agents:** WildcardLemur, MentorOrangutan

**Implementation:**
- Mostly random selection with light heuristics
- Response time: < 20ms

**WildcardLemur Behavior:**
1. 80% completely random valid move
2. 15% block opponent's immediate win
3. 5% take winning move if available

**MentorOrangutan Behavior:**
1. Random valid move
2. Explains move reasoning in UI
3. Good for teaching new players

---

## Current Implementation Status

| Agent | Strategy | Status | Notes |
|-------|----------|--------|-------|
| ChampionChimp | Minimax | ❌ Not implemented | Spec created, awaiting implementation |
| StrategistApe | Heuristic | ✅ Implemented | Current default opponent |
| TricksterMonkey | Heuristic | ❌ Not implemented | Future enhancement |
| GuardianGorilla | Heuristic | ❌ Not implemented | Future enhancement |
| SpeedyGibbon | Heuristic | ❌ Not implemented | Future enhancement |
| WildcardLemur | Random | ❌ Not implemented | Future enhancement |
| MentorOrangutan | Random+Explain | ❌ Not implemented | Future enhancement |

---

## Algorithm Specifications

### Minimax Algorithm

```typescript
function minimax(board: Board, depth: number, maximizing: boolean): number {
  // Terminal states
  if (checkWin(board, 'O')) return 10 - depth;
  if (checkWin(board, 'X')) return depth - 10;
  if (isDraw(board)) return 0;

  if (maximizing) {
    let maxEval = -Infinity;
    for (let move of getValidMoves(board)) {
      board[move] = 'O';
      const eval = minimax(board, depth + 1, false);
      board[move] = null;
      maxEval = Math.max(maxEval, eval);
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let move of getValidMoves(board)) {
      board[move] = 'X';
      const eval = minimax(board, depth + 1, true);
      board[move] = null;
      minEval = Math.min(minEval, eval);
    }
    return minEval;
  }
}
```

### Alpha-Beta Pruning Addition

```typescript
function minimaxAlphaBeta(board, depth, alpha, beta, maximizing) {
  // Same as minimax but with alpha-beta bounds
  // Cuts off branches that cannot improve current best
}
```

### Heuristic Evaluation Function

```typescript
function evaluateBoard(board) {
  let score = 0;

  // Winning lines
  const lines = [
    [[0,0],[0,1],[0,2]], [[1,0],[1,1],[1,2]], [[2,0],[2,1],[2,2]], // rows
    [[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]], // cols
    [[0,0],[1,1],[2,2]], [[0,2],[1,1],[2,0]] // diagonals
  ];

  for (const line of lines) {
    const values = line.map(([r, c]) => board[r][c]);
    score += evaluateLine(values);
  }

  return score;
}

function evaluateLine(cells) {
  const X = cells.filter(c => c === 'X').length;
  const O = cells.filter(c => c === 'O').length;
  const empty = cells.filter(c => c === null).length;

  if (O === 3) return 100;    // Win
  if (X === 3) return -100;   // Loss
  if (O === 2 && empty === 1) return 10;   // Two O's, one empty
  if (X === 2 && empty === 1) return -10;  // Two X's, one empty
  if (O === 1 && empty === 2) return 1;    // One O, two empty
  if (X === 1 && empty === 2) return -1;   // One X, two empty

  return 0;
}
```

---

## Testing Requirements

### Unit Tests

| Test | Input | Expected Output |
|------|-------|-----------------|
| Minimax win detection | Board with two O's and open third | Minimax selects winning move |
| Minimax blocking | Board with two X's and open third | Minimax selects blocking move |
| Minimax draw | Empty board vs minimax | Draw result |
| Heuristic center priority | Empty board | Center cell selected |
| Heuristic blocking | Opponent has two in a row | Blocks the line |
| Random selection | Any board | Valid empty cell |

### E2E Tests

| Test | Expected Behavior |
|------|-------------------|
| ChampionChimp vs ChampionChimp | All games draw |
| Human vs ChampionChimp (X, perfect) | Draw |
| Human vs ChampionChimp (X, error) | ChampionChimp wins |
| StrategistApe response time | < 2 seconds |
| Invalid move prevention | Click on occupied cell does nothing |

---

## LLM Integration (Optional)

For personality-driven AI via Ax framework, see `docs/games/ai-setup.md`.

**Prompt Structure:**
```
Current board:
0: X | [1] | [2]
[3] |  O  | [5]
[6] | [7] | [8]

You are [personality]. Make your move (O) at row, col with brief reasoning.
```

**Personality Descriptions:**
- Trickster: "You are a playful trickster who loves surprising moves."
- Strategist: "You are a calm strategist who thinks several moves ahead."
- Mentor: "You are a helpful mentor who explains your thinking."
- Champion: "You are a competitive champion who plays to win."

---

## Related Files

- Game Design: `.monkeytown/game-design/tictactoe-game-design.md`
- Balance Tracker: `.monkeytown/game-design/balance-tracker.md`
- AI Setup: `docs/games/ai-setup.md`
- Feedback Response: `.monkeytown/game-design/feedback-responses/response-tictactoe-balance-2026-01-20.md`
- ChampionChimp Spec: `.monkeytown/game-design/implementation/spec-tictactoe-champion-chimp.md`

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
