# ♟️ Chess

> **⚠️ ARCHIVED - This game is no longer available in Monkeytown.**  
> **The platform has been simplified to focus on [Tic-Tac-Toe](../tictactoe.md).**  
> **This documentation is kept for historical reference only.**

**The classic game of strategy and tactics**

## Quick Overview

| Aspect | Details |
|--------|---------|
| Players | 2 |
| Duration | 15-60 minutes |
| Type | Board Game |
| Difficulty | Hard |
| Luck Factor | None |
| Strategy | Very High |

---

## 🎯 Objective

**Checkmate your opponent's King** - put it in a position where it cannot escape capture.

---

## 📦 Components

### The Board
- 8×8 grid (64 squares)
- Alternating light and dark squares
- Files: a-h (columns)
- Ranks: 1-8 (rows)

### The Pieces

| Piece | Symbol | Count | Movement |
|-------|--------|-------|----------|
| King | ♔/♚ | 1 | One square any direction |
| Queen | ♕/♛ | 1 | Any number of squares in any direction |
| Rook | ♖/♜ | 2 | Any number of squares horizontally or vertically |
| Bishop | ♗/♝ | 2 | Any number of squares diagonally |
| Knight | ♘/♞ | 2 | "L" shape: 2+1 squares, can jump |
| Pawn | ♙/♟ | 8 | Forward 1 (or 2 from start), captures diagonally |

### Starting Position

```
8 ♜ ♞ ♝ ♛ ♚ ♝ ♞ ♜
7 ♟ ♟ ♟ ♟ ♟ ♟ ♟ ♟
6 · · · · · · · ·
5 · · · · · · · ·
4 · · · · · · · ·
3 · · · · · · · ·
2 ♙ ♙ ♙ ♙ ♙ ♙ ♙ ♙
1 ♖ ♘ ♗ ♕ ♔ ♗ ♘ ♖
  a b c d e f g h
```

---

## 🎮 How to Play

### Game Flow
1. White moves first
2. Players alternate turns
3. Game ends on checkmate, stalemate, or draw

### Moving Pieces

**Click a piece, then click its destination square.**

Each piece has unique movement rules:

#### King ♔
- Moves one square in any direction
- Cannot move into check
- Special: Castling (see below)

#### Queen ♕
- Moves any number of squares in any direction
- Most powerful piece
- Cannot jump over other pieces

#### Rook ♖
- Moves any number of squares horizontally or vertically
- Cannot jump over other pieces
- Special: Participates in castling

#### Bishop ♗
- Moves any number of squares diagonally
- Each bishop stays on its starting color
- Cannot jump over other pieces

#### Knight ♘
- Moves in "L" shape (2 squares + 1 perpendicular)
- **Only piece that can jump** over others
- Always lands on opposite color

#### Pawn ♙
- Moves forward one square (or two from starting position)
- Captures diagonally forward
- Special: En passant, promotion (see below)

---

## ⚙️ Special Rules

### Castling
A special King+Rook move for safety:

**Requirements:**
1. King and Rook have never moved
2. No pieces between them
3. King is not in check
4. King doesn't pass through check

**Execution:**
- King moves 2 squares toward Rook
- Rook jumps to the other side of King

```
Before (Kingside):  ♖ · · · ♔ · · ♖
After:              ♖ · · · · ♖ ♔ ·
```

### En Passant
Special pawn capture:

**When:** Opponent's pawn moves 2 squares past your pawn
**What:** You can capture it "in passing" as if it moved 1 square
**Window:** Only immediately after the 2-square move

### Pawn Promotion
When a pawn reaches the opposite end:

**Options:** Queen, Rook, Bishop, or Knight
**Common:** Queen (most powerful)
**Strategy:** Sometimes a Knight is better (Knight promotion)

---

## 🏁 Game End Conditions

### Checkmate ⚔️
- King is in check
- No legal move can escape
- **Winner declared!**

### Stalemate 🤝
- Player has no legal moves
- King is NOT in check
- **Game is a draw**

### Draw Conditions
- Stalemate
- Insufficient material
- Threefold repetition
- 50-move rule
- Agreement

---

## 🤖 AI Opponent Strategies

| Agent | Chess Style |
|-------|-------------|
| 🎭 TricksterMonkey | Unusual openings, trap-setting |
| 🧩 StrategistApe | Solid positional play, deep calculation |
| ⚡ SpeedyGibbon | Fast moves, time pressure tactics |
| 🛡️ GuardianGorilla | Defensive fortress building |
| 🃏 WildcardLemur | Unpredictable sacrifices |
| 📚 MentorOrangutan | Classic openings, explains mistakes |
| 🏆 ChampionChimp | Engine-level accuracy |

---

## 📊 Strategy Tips

### Beginner Tips
1. **Control the center** - e4, d4, e5, d5 are key squares
2. **Develop pieces** - Get knights and bishops out early
3. **Castle early** - Protect your king
4. **Don't move the same piece twice** - Develop all pieces

### Intermediate Tips
1. **Piece coordination** - Make your pieces work together
2. **Pawn structure** - Avoid doubled/isolated pawns
3. **Open files for rooks** - They need clear lines
4. **Knight outposts** - Knights love protected central squares

### Advanced Tips
1. **Calculation** - See at least 3 moves ahead
2. **Pattern recognition** - Learn tactical motifs
3. **Endgame knowledge** - King and pawn endings are crucial
4. **Time management** - Don't rush, don't stall

---

## 📜 Complete Rules Summary

```
CHESS - COMPLETE RULES

OBJECTIVE:
Checkmate the opponent's King

PIECES & MOVEMENT:
- King: 1 square any direction
- Queen: Any distance, any direction (straight/diagonal)
- Rook: Any distance, straight lines
- Bishop: Any distance, diagonals
- Knight: L-shape (2+1), can jump
- Pawn: Forward 1 (2 from start), captures diagonal

SPECIAL MOVES:
- Castling: King+Rook swap (conditions apply)
- En Passant: Pawn capture in passing
- Promotion: Pawn reaches end, becomes any piece

GAME ENDS:
- Checkmate: Win
- Stalemate: Draw
- Insufficient material: Draw
- Threefold repetition: Draw
- 50-move rule: Draw
- Agreement: Draw

TURN TIMER:
- 120 seconds per move
```

---

## ❓ FAQ

**Q: Can a pawn move backward?**
A: No, pawns only move forward.

**Q: Can I castle if my Rook is under attack?**
A: Yes, only the King's path matters.

**Q: What happens if both players only have Kings?**
A: Draw by insufficient material.

**Q: Can I undo a move?**
A: Not in competitive play. In practice mode, yes.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-18 | Initial rules documentation |

**Playable Now:**
- [TicTacToe](../tictactoe.md) - The currently available game

**See also:**
- [In-Game Tutorial Specs](../../../.monkeytown/game-design/in-game-tutorials.md)
- [Balance Tracker](../../../.monkeytown/game-design/balance-tracker.md)

---

*Part of the Monkeytown game collection. Standard FIDE rules apply.*
