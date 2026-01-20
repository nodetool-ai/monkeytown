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

| Agent | Type | Strategy | Difficulty |
|-------|------|----------|------------|
| **ChampionChimp** | Minimax | Perfect play using minimax with alpha-beta pruning | Impossible |
| **StrategistApe** | Heuristic | Optimal moves, blocks and attacks strategically | Hard |
| **TricksterMonkey** | Heuristic | Traps, unpredictability | Medium-Hard |
| **GuardianGorilla** | Heuristic | Blocking focused | Medium |
| **SpeedyGibbon** | Heuristic | Aggressive, fast | Medium |
| **WildcardLemur** | Random | Unpredictable | Easy |
| **MentorOrangutan** | Heuristic | Teaching, explains | Easy |

### AI Implementation

**Minimax Algorithm (ChampionChimp only):**
- Perfect play using minimax with alpha-beta pruning
- Depth: Unlimited (analyzes all possible game states)
- Evaluation: Standard tic-tac-toe scoring
- Expected outcome: Always draw against optimal human play

**Heuristic-Based AI (StrategistApe, TricksterMonkey, GuardianGorilla, SpeedyGibbon, MentorOrangutan):**
- Rule-based decision making
- Prioritizes: Win > Block > Center > Corner > Random
- Varies by personality archetype

**Random AI (WildcardLemur):**
- Random valid move selection
- Unpredictable outcomes

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

### Target Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Draw rate (perfect play) | 100% | TBD | ⏳ Pending data |
| Human win rate vs AI (varies) | 0-70% | TBD | ⏳ Pending data |
| Average game length | 5-7 turns | TBD | ⏳ Pending data |
| First-move advantage | 55-60% | TBD | ⏳ Pending data |

### Balance Thresholds

| Issue | Threshold | Action |
|-------|-----------|--------|
| AI dominance | AI wins > 80% vs humans | Add easier AI levels |
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

| Test | Input | Expected Output |
|------|-------|-----------------|
| Win detection - horizontal | X at (0,0), (0,1), (0,2) | X wins |
| Win detection - vertical | X at (0,0), (1,0), (2,0) | X wins |
| Win detection - diagonal | X at (0,0), (1,1), (2,2) | X wins |
| Draw detection | All 9 cells filled, no 3-in-row | Draw |
| Invalid move prevention | Click occupied cell | No action |
| Turn switching | After valid move | Other player's turn |

### AI Behavior Tests

| Test | Expected Behavior |
|------|-------------------|
| ChampionChimp vs ChampionChimp | Always draw |
| Human vs ChampionChimp (X first, center) | Draw |
| Human vs WildcardLemur | Variable results |
| Move timing | < 100ms for minimax |

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.1 | 2026-01-19 | Clarified AI implementation: ChampionChimp uses minimax, others use heuristics. Added implementation notes for MonkeyBuilder. | GameDesigner |
| 1.0 | 2026-01-19 | Initial game design document | GameDesigner |

---

## Related Documentation

- Rules: `docs/games/tictactoe.md`
- AI Setup: `docs/games/ai-setup.md`
- Tutorials: `.monkeytown/game-design/in-game-tutorials.md`
- Balance: `.monkeytown/game-design/balance-tracker.md`
- Testing: `.monkeytown/game-testing/`

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
