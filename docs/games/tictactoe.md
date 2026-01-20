# ❌ Tic-Tac-Toe ⭕

**The classic game of strategy**

## Quick Overview

| Aspect | Details |
|--------|---------|
| Players | 2 |
| Duration | 2-5 minutes |
| Type | Board Game |
| Difficulty | Variable (7 AI opponents) |
| Luck Factor | None |
| Strategy | Medium |

---

## 🎯 Objective

Get **three in a row** - place three of your symbols (X or O) in a horizontal, vertical, or diagonal line to win!

---

## 📦 Components

### The Board
- 3×3 grid (9 squares)
- Rows: 0, 1, 2 (top to bottom)
- Cols: 0, 1, 2 (left to right)

### The Symbols

| Symbol | Player |
|--------|--------|
| X | First player (you) |
| O | Second player (AI opponent) |

---

## 🎮 How to Play

### Game Flow
1. X moves first (you)
2. Players alternate turns
3. Game ends on win or draw

### Making Your Move
**Click any empty square to place your symbol.**

Each turn:
1. Click an empty cell
2. Your symbol (X or O) appears
3. Check for three in a row
4. If no winner, next player's turn

---

## 🏁 Winning the Game

### Three Ways to End

#### Win ⚔️
- Get three of your symbols in a row
- Can be horizontal, vertical, or diagonal
- First to three in a row wins!

**Winning Lines:**
```
Horizontal: Row 0, Row 1, Row 2
Vertical:   Col 0, Col 1, Col 2
Diagonal:   (0,0)-(1,1)-(2,2), (0,2)-(1,1)-(2,0)
```

#### Draw 🤝
- All 9 squares are filled
- No player has three in a row
- Game ends in a tie

#### Forfeit 🏳️
- A player can forfeit at any time
- Other player automatically wins

---

## 🤖 AI Opponent Strategies

Monkeytown offers 7 distinct AI personalities with different difficulty levels:

| Agent | Emoji | Strategy | Difficulty | Win Rate Target |
|-------|-------|----------|------------|-----------------|
| **ChampionChimp** | 🏆 | Perfect play using minimax | Impossible | 0% human wins |
| **StrategistApe** | 🧩 | Optimal moves, blocks attacks | Hard | 5-10% human wins |
| **TricksterMonkey** | 🎭 | Traps and unpredictability | Medium-Hard | 20-30% human wins |
| **GuardianGorilla** | 🛡️ | Defensive, blocks opponents | Medium | 30-40% human wins |
| **SpeedyGibbon** | ⚡ | Aggressive, fast decisions | Medium | 40-50% human wins |
| **WildcardLemur** | 🃏 | Random strategies | Easy | 50-60% human wins |
| **MentorOrangutan** | 📚 | Teaching, explains moves | Easy | 60-70% human wins |

### Current Implementation Status

⚠️ **Not all AI opponents are currently available.** Only one generic AI exists.

**Coming Soon:**
- ChampionChimp with minimax algorithm (perfect play)
- StrategistApe with optimal heuristics
- WildcardLemur for casual random play

### AI Move Priority (How AI Thinks)

All AI opponents follow this decision tree:

1. **Take a winning move** if available
2. **Block the opponent's winning move** if threatened
3. **Take the center** (most strategic square)
4. **Take a corner** if center is taken
5. **Take any edge** as last resort

---

## 📊 Strategy Tips

### Beginner Tips
1. **Take the center** - The middle square controls 4 lines
2. **Watch for two in a row** - Block your opponent's winning moves
3. **Create forks** - Set up two winning moves at once

### Intermediate Tips
1. **Corner strategy** - Corners are stronger than edges
2. **Respond to center** - If opponent takes center, take a corner
3. **Think ahead** - Plan your second move while making your first

### Advanced Tips
1. **Force draws** - Perfect play from both sides always results in a draw
2. **Opening moves** - Center or corner are best first moves
3. **Pattern recognition** - Learn common winning patterns

---

## 📜 Complete Rules Summary

```
TIC-TAC-TOE - COMPLETE RULES

OBJECTIVE:
Get three of your symbols in a row (horizontal, vertical, or diagonal)

SETUP:
- 3×3 grid board
- Two players: X and O
- X goes first (you)
- O is the AI opponent

TURN:
- Click an empty cell to place your symbol
- No time limit (but please don't keep opponents waiting!)

WINNING:
- Three in a row: Win
- Board full, no three in a row: Draw
- Player forfeits: Other player wins

STRATEGIC VALUE:
- Center square: Controls 4 lines (best)
- Corner squares: Control 3 lines each
- Edge squares: Control 2 lines each (weakest)

AI DIFFICULTY (from easiest to hardest):
1. WildcardLemur: Random moves
2. MentorOrangutan: Teaching mode
3. SpeedyGibbon: Aggressive
4. GuardianGorilla: Defensive
5. TricksterMonkey: Tricky
6. StrategistApe: Smart
7. ChampionChimp: Perfect (minimax)
```

---

## ❓ FAQ

**Q: Can I always win if I go first?**
A: No. With perfect play from both players, the game always ends in a draw. ChampionChimp will always force a draw.

**Q: What's the best first move?**
A: Center or any corner. Avoid edge squares as your first move.

**Q: How long does a game take?**
A: Usually 2-5 minutes. With fast players, under a minute!

**Q: Can I undo a move?**
A: Not in competitive play. Choose carefully!

**Q: Why does the AI sometimes let me win?**
A: The AI is still learning! We're improving AI strategies to make games more challenging.

**Q: When will all 7 AI opponents be available?**
A: ChampionChimp with minimax is coming soon. Other personalities will follow.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.2 | 2026-01-20 | Added AI strategy table with difficulty levels. Clarified implementation status. Added FAQ about AI availability. |
| 1.1 | 2026-01-19 | Clarified AI opponent strategies: ChampionChimp uses minimax, others use heuristic-based play |
| 1.0 | 2026-01-19 | Initial rules documentation |

**See also:**
- [In-Game Tutorial Specs](../../.monkeytown/game-design/in-game-tutorials.md)
- [Balance Tracker](../../.monkeytown/game-design/balance-tracker.md)
- [Game Design Document](../../.monkeytown/game-design/tictactoe-game-design.md)

---

*Part of the Monkeytown game collection. Classic rules, modern AI opponents.*
