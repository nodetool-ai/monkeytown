# TicTacToe Game Design Document

**Game:** TicTacToe
**Status:** Active (Primary Game)
**Version:** 1.0
**Last Updated:** 2026-01-19
**Designer:** GameDesigner

---

## Overview

TicTacToe is the flagship game of Monkeytown - a simple yet deep strategy game where two players take turns placing X or O on a 3×3 grid. The first to get three in a row wins.

### Design Goals

| Goal | Implementation |
|------|----------------|
| **Accessibility** | Simple rules, intuitive UI, quick games (2-5 min) |
| **Strategy Depth** | Multiple skill levels from beginner to perfect play |
| **AI Variety** | 7 distinct AI personalities for diverse experiences |
| **Learning Curve** | Easy to learn, lifetime to master |

---

## Core Mechanics

### Board

- 3×3 grid (9 cells)
- Rows: 0, 1, 2 (top to bottom)
- Cols: 0, 1, 2 (left to right)

### Players

| Role | Symbol | Advantage |
|------|--------|-----------|
| First Player | X | Goes first, ~58% with optimal play |
| Second Player | O | Goes second, ~42% with optimal play |

### Turn Flow

```
1. Current player selects empty cell
2. Symbol placed in cell
3. Check for win condition
4. If no win: switch to other player
5. If win or draw: end game
```

---

## Win Conditions

### Win (Three in a Row)

```
Horizontal:  (0,0)-(0,1)-(0,2), (1,0)-(1,1)-(1,2), (2,0)-(2,1)-(2,2)
Vertical:    (0,0)-(1,0)-(2,0), (0,1)-(1,1)-(2,1), (0,2)-(1,2)-(2,2)
Diagonal:    (0,0)-(1,1)-(2,2), (0,2)-(1,1)-(2,0)
```

### Draw

- All 9 cells filled
- No player has three in a row

### Forfeit

- Player voluntarily ends game
- Other player wins by default

---

## AI Opponent System

### Supported AI Types

| Agent | Type | Strategy | Difficulty | Status |
|-------|------|----------|------------|--------|
| **ChampionChimp** | Minimax | Perfect play using minimax with alpha-beta pruning | Impossible | 🔴 Not Implemented |
| **StrategistApe** | Heuristic | Optimal moves, blocks and attacks strategically | Hard | 🔴 Not Implemented |
| **TricksterMonkey** | Heuristic | Traps, unpredictability | Medium-Hard | 🔴 Not Implemented |
| **GuardianGorilla** | Heuristic | Blocking focused | Medium | 🔴 Not Implemented |
| **SpeedyGibbon** | Heuristic | Aggressive, fast | Medium | 🔴 Not Implemented |
| **WildcardLemur** | Random | Unpredictable | Easy | 🔴 Not Implemented |
| **MentorOrangutan** | Heuristic | Teaching, explains | Easy | 🔴 Not Implemented |

**Current Implementation:** Only 1 generic AI exists. None of the 7 documented personalities are implemented.

### AI Implementation Order (Required)

| Priority | AI Type | Implementation Requirements | Target Win Rate |
|----------|---------|-----------------------------|-----------------|
| **P1** | Basic AI | Win-blocking + Win-taking + Center/Corner priority | 40-60% human wins |
| **P2** | ChampionChimp | Minimax algorithm with alpha-beta pruning | 0% human wins, 100% draws |
| **P3** | StrategistApe | Heuristic: Optimal > Block > Center > Corner | 5-10% human wins |
| **P3** | WildcardLemur | Random valid moves | 50-60% human wins |
| **P4** | TricksterMonkey | Heuristic with trap probability | 20-30% human wins |
| **P4** | GuardianGorilla | Heuristic: Block > Win > Center > Corner | 30-40% human wins |
| **P4** | SpeedyGibbon | Heuristic: Win > Block > Random valid | 40-50% human wins |
| **P4** | MentorOrangutan | StrategistApe + teaching messages | 60-70% human wins |

### AI Move Priority Algorithm

All heuristic-based AIs MUST follow this priority order:

```
1. WIN: If AI can win this move, take it
2. BLOCK: If opponent can win next move, block that cell
3. CENTER: If center (1,1) is available, take it
4. CORNER: If any corner (0,0), (0,2), (2,0), (2,2) is available, take random corner
5. EDGE: Take random available edge cell
```

**For ChampionChimp only:** Use minimax with alpha-beta pruning for perfect play.

---

## Strategy Guide

### Beginner Strategy

| Priority | Action | Rationale |
|----------|--------|-----------|
| 1 | Take center (1,1) first | Controls most lines (4) |
| 2 | Block opponent's two-in-a-row | Prevents immediate loss |
| 3 | Create forks when possible | Forces opponent to block one |

### Optimal Play (Perfect Strategy)

**First Move Rankings:**
1. Center (1,1) - 58% win rate
2. Corners (0,0), (0,2), (2,0), (2,2) - 31% win rate
3. Edges (0,1), (1,0), (1,2), (2,1) - 0% win rate (with perfect opponent)

**Key Patterns:**
- Center first → Corner second → Can force win
- Center first → Edge second → Draw with perfect play
- Corner first → Center response → Draw with perfect play

---

## Game Balance Metrics

### Current Balance Status: 🔴 CRITICAL

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Human win rate | 40-60% | 80-90% | ❌ Critical |
| Draw rate | 30-50% | 10-15% | ❌ High |
| AI win rate | 10-20% | 0-5% | ❌ High |
| Win-blocking | 100% | 0% | ❌ Critical |
| Average game length | 5-7 turns | ~6-7 turns | ✅ On target |

### Target Win Rates by AI Type

| AI Opponent | Human Win Rate | Draw Rate | AI Win Rate |
|-------------|----------------|-----------|-------------|
| ChampionChimp | 0% | 100% | 0% |
| StrategistApe | 5-10% | 85-90% | 5-10% |
| TricksterMonkey | 20-30% | 60-70% | 10-20% |
| GuardianGorilla | 30-40% | 50-60% | 10-20% |
| SpeedyGibbon | 40-50% | 40-50% | 10-20% |
| WildcardLemur | 50-60% | 30-40% | 10-20% |
| MentorOrangutan | 60-70% | 25-35% | 5-15% |

### Balance Thresholds

| Issue | Threshold | Action |
|-------|-----------|--------|
| AI dominance | AI wins > 70% vs humans | Reduce AI difficulty |
| Human dominance | Human wins > 70% vs AI | Add win-blocking |
| Draw rate | < 80% at high difficulty | Review implementation |
| Game length | < 3 turns or > 9 turns | Investigate abnormal play |

---

## In-Game Tutorial

### Tutorial Flow

```
┌─────────────────────────────────────┐
│  TIC-TAC-TOE TUTORIAL               │
├─────────────────────────────────────┤
│  STEP 1: THE BOARD (0:15)           │
│  ───────────────────────            │
│  "The game board is a 3×3 grid."    │
│  [Show: 3×3 grid with labels]       │
├─────────────────────────────────────┤
│  STEP 2: YOUR SYMBOL (0:15)         │
│  ─────────────────────              │
│  "You play as X, AI plays as O."    │
│  [Highlight: X symbol]              │
├─────────────────────────────────────┤
│  STEP 3: MAKING MOVES (0:30)        │
│  ─────────────────────────          │
│  "Click any empty cell to play."    │
│  [Interactive: Click a cell]        │
│  [Show: X appears]                  │
├─────────────────────────────────────┤
│  STEP 4: WINNING (0:30)             │
│  ───────────────────                │
│  "Get three in a row to win!"       │
│  [Show: Winning combinations]       │
│  [Show: Draw condition]             │
├─────────────────────────────────────┤
│  STEP 5: STRATEGY (0:30)            │
│  ───────────────────                │
│  "Center is best. Corners are good."│
│  "Edges are weakest first move."    │
├─────────────────────────────────────┤
│  Ready to play!                     │
│  [Start Game Button]                │
└─────────────────────────────────────┘
```

### Tutorial Messages

| Message | Trigger | Purpose |
|---------|---------|---------|
| "Center controls the most lines!" | First move section | Teach optimal opening |
| "Block your opponent!" | Threat detection | Defensive awareness |
| "Look for forks!" | Opportunity detection | Advanced strategy |
| "Perfect play leads to a draw!" | Game end | Manage expectations |

---

## Testing Requirements

### Rule Verification Tests

| Test | Input | Expected Output | Status |
|------|-------|-----------------|--------|
| Win detection - horizontal | X at (0,0), (0,1), (0,2) | X wins | ✅ Implemented |
| Win detection - vertical | X at (0,0), (1,0), (2,0) | X wins | ✅ Implemented |
| Win detection - diagonal | X at (0,0), (1,1), (2,2) | X wins | ✅ Implemented |
| Draw detection | All 9 cells filled, no 3-in-row | Draw | ✅ Implemented |
| Invalid move prevention | Click occupied cell | No action | ✅ Implemented |
| Turn switching | After valid move | Other player's turn | ✅ Implemented |
| Forfeit | Click forfeit button | Other player wins | ✅ Implemented |

### AI Behavior Tests

| Test | Expected Behavior | Status |
|------|-------------------|--------|
| AI takes winning move | AI selects winning cell | ❌ Not Implemented |
| AI blocks winning threat | AI blocks human's winning cell | ❌ Not Implemented |
| AI takes center first | If center available, AI takes (1,1) | ✅ Implemented |
| AI takes corner second | If center taken, AI takes corner | ❌ Not Implemented |
| ChampionChimp vs ChampionChimp | Always draw | ❌ Not Implemented |
| Human vs ChampionChimp (X first, center) | Draw | ❌ Not Implemented |
| Human vs WildcardLemur | Variable results | ❌ Not Implemented |

### Testability Checklist

Every mechanic MUST have a test:

- [x] 3x3 grid rendering
- [x] X/O symbol placement
- [x] Win detection (8 patterns)
- [x] Draw detection
- [x] Turn alternation
- [x] Forfeit functionality
- [x] Invalid move rejection
- [ ] AI win-seeking (P1)
- [ ] AI threat-blocking (P1)
- [ ] AI center priority (P1)
- [ ] AI corner priority (P2)
- [ ] Minimax algorithm (P1)
- [ ] AI personality variety (P2)
- [ ] Move timing per personality (P3)

### Verification Commands

```bash
# Run unit tests
npm test -- --testPathPattern=tictactoe

# Run AI behavior tests
npm test -- --testPathPattern=ai

# Run E2E tests
npm run test:e2e
```

---

## Related Documentation

- Rules: `docs/games/tictactoe.md`
- AI Setup: `docs/games/ai-setup.md`
- Tutorials: `.monkeytown/game-design/in-game-tutorials.md`
- Balance: `.monkeytown/game-design/balance-tracker.md`
- Testing: `.monkeytown/game-testing/`
- Feedback Response: `.monkeytown/game-design/feedback-responses/response-tictactoe-balance-2026-01-20.md`

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
