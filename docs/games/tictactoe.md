# ❌ TicTacToe

**The classic game of X's and O's against AI opponents**

## Quick Overview

| Aspect | Details |
|--------|---------|
| Players | 2 |
| Duration | 2-5 minutes |
| Type | Classic Strategy |
| Difficulty | Easy to Master |
| Luck Factor | None |

---

## 🎯 Objective

Be the first player to place three of your marks (X or O) in a horizontal, vertical, or diagonal row. The game ends when one player wins or all nine squares are filled (resulting in a draw).

---

## 📦 Components

- **3×3 Grid** - Nine squares for placing marks
- **Two marks** - X and O
- **Turn timer** - 30 seconds per move

---

## 🎮 How to Play

### Game Flow

1. Players take turns placing their mark on an empty square
2. First player to get three in a row wins
3. If all squares are filled with no winner, the game is a draw

### On Your Turn

You have **30 seconds** to place your mark:

1. Click or tap an empty square
2. Your mark (X or O) appears
3. Turn passes to the opponent

### Winning Conditions

| Condition | Description |
|-----------|-------------|
| **Row** | Three marks in a horizontal line |
| **Column** | Three marks in a vertical line |
| **Diagonal** | Three marks in a diagonal line |
| **Draw** | All nine squares filled with no winner |

---

## 🤖 AI Opponent Personalities

Different AI opponents play with different strategies:

| Agent | Emoji | Personality | Strategy |
|-------|-------|-------------|----------|
| **TricksterMonkey** | 🎭 | Unpredictable | May set traps or make unusual moves |
| **StrategistApe** | 🧩 | Calculated | Plays optimally, hard to beat |
| **SpeedyGibbon** | ⚡ | Quick | Fast moves, aggressive positioning |
| **GuardianGorilla** | 🛡️ | Defensive | Blocks your winning moves |
| **WildcardLemur** | 🃏 | Random | Unpredictable, sometimes brilliant |
| **MentorOrangutan** | 📚 | Teaching | Good for learning basics |
| **ChampionChimp** | 🏆 | Competitive | Plays to win |

---

## 📊 Strategy Tips

### Beginner Tips

1. **Take the center** - The center square is the most valuable
2. **Block threats** - Always block opponent's two-in-a-row
3. **Create forks** - Set up moves with two winning possibilities

### Advanced Tips

1. **Force the win** - Create situations where opponent must let you win
2. **Opposite corners** - Taking opposite corners when opponent is in center can be powerful
3. **Edge strategy** - Taking edges first is usually not optimal

### Expert Tips

1. **Perfect play knowledge** - With optimal play, TicTacToe always ends in a draw
2. **Traps** - Set up double threats that opponent cannot block
3. **Reading opponents** - Predict opponent's strategy and counter

---

## 📜 Complete Rules Summary

```
TIC TAC TOE - COMPLETE RULES

SETUP:
- 3×3 grid
- Player X goes first
- 30 seconds per turn

PLAY:
1. Place your mark on an empty square
2. Opponent takes their turn
3. Repeat until win or draw

WINNING:
- Three in a row (horizontal, vertical, diagonal)
- First to achieve this wins

DRAW:
- All nine squares filled
- No three in a row for either player
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-18 | Initial implementation |

**See also:**
- [AI Opponent Implementation](../../server/src/game/ai-opponent.ts)
- [TicTacToe Engine](../../server/src/game/tictactoe-engine.ts)
- [Frontend Component](../../web/src/components/game/TicTacToe.tsx)

---

*Part of the Monkeytown game collection.*
