# ❌ Tic-Tac-Toe ⭕

**The classic game of strategy**

## Quick Overview

| Aspect | Details |
|--------|---------|
| Players | 2 |
| Duration | 2-5 minutes |
| Type | Board Game |
| Difficulty | Easy |
| Luck Factor | None |
| Strategy | Medium |

---

## 🎯 Objective

Get **three in a row** - place three of your symbols (X or O) in a horizontal, vertical, or diagonal line to win!

---

## 📦 Components

### The Board
- 3×3 grid (9 squares)
- Simple layout with clear cells

### The Symbols

| Symbol | Player |
|--------|--------|
| X | First player (usually you) |
| O | Second player (AI opponent) |

---

## 🎮 How to Play

### Game Flow
1. X moves first
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

#### Draw 🤝
- All 9 squares are filled
- No player has three in a row
- Game ends in a tie

#### Forfeit 🏳️
- A player can forfeit at any time
- Other player automatically wins

---

## 🤖 AI Opponent Strategies

Different AI opponents play with different styles:

| Agent | Tic-Tac-Toe Style |
|-------|-------------------|
| 🎭 TricksterMonkey | Unpredictable moves, tries to trap you |
| 🧩 StrategistApe | Optimal play, blocks and attacks strategically |
| ⚡ SpeedyGibbon | Quick aggressive moves |
| 🛡️ GuardianGorilla | Defensive blocking style |
| 🃏 WildcardLemur | Random but sometimes brilliant moves |
| 📚 MentorOrangutan | Teaches strategy, explains moves |
| 🏆 ChampionChimp | Perfect play using minimax algorithm |

### AI Implementation Options

Monkeytown supports two AI implementations:

1. **Built-in Minimax** (default): Perfect algorithmic play, no external dependencies
2. **LLM AI Agent**: Dynamic, personality-driven play using Anthropic-compatible APIs

**For builders:** See the [AI Setup Guide](./ai-setup.md) for instructions on implementing LLM-powered AI opponents.

---

## 📊 Strategy Tips

### Beginner Tips
1. **Take the center** - The middle square controls the most lines
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
- X goes first

TURN:
- Click an empty cell to place your symbol
- No time limit (but please don't keep opponents waiting!)

WINNING:
- Three in a row: Win
- Board full, no three in a row: Draw
- Player forfeits: Other player wins

STRATEGY:
- Center square controls 4 lines
- Corner squares control 3 lines
- Edge squares control 2 lines
```

---

## ❓ FAQ

**Q: Can I always win if I go first?**
A: No, with perfect play from both players, the game always ends in a draw.

**Q: What's the best first move?**
A: Center or any corner. Avoid edge squares as your first move.

**Q: How long does a game take?**
A: Usually 2-5 minutes. With fast players, under a minute!

**Q: Can I undo a move?**
A: Not in competitive play. Choose carefully!

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-19 | Initial rules documentation |

**See also:**
- [In-Game Tutorial Specs](../../.monkeytown/game-design/in-game-tutorials.md)
- [Balance Tracker](../../.monkeytown/game-design/balance-tracker.md)

---

*Part of the Monkeytown game collection. Classic rules, modern AI opponents.*
