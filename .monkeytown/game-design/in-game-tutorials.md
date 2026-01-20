# In-Game Tutorial Specifications

Design specifications for tutorial content displayed within each game.

---

## TicTacToe Tutorial

### Tutorial Flow

```
┌─────────────────────────────────────────────────────┐
│  TIC-TAC-TOE TUTORIAL                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 1: THE BOARD (0:15)                           │
│  ─────────────────────                              │
│  "Welcome to TicTacToe! The classic game of         │
│   strategy where two players compete to get         │
│   three in a row!"                                  │
│                                                     │
│  [Show: 3×3 grid with numbered cells]               │
│  [Highlight: 9 cells in 3 rows and 3 columns]       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 2: YOUR SYMBOL (0:15)                         │
│  ───────────────────────                            │
│  "You play as X. Your AI opponent plays as O."      │
│                                                     │
│  [Highlight: X symbol in player info]               │
│  [Highlight: O symbol in opponent info]             │
│                                                     │
│  "X always goes first!"                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 3: MAKING MOVES (0:30)                        │
│  ─────────────────────────                          │
│  "Click any empty cell to place your X!"            │
│                                                     │
│  [Interactive: Click a cell]                        │
│  [Show: X appears in the cell]                      │
│  [Show: Status changes to "Waiting for opponent"]   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 4: WINNING (0:30)                             │
│  ───────────────────                                │
│  "Get three in a row to win!"                       │
│                                                     │
│  [Show: 3 winning combinations]                     │
│  • Horizontal: Row of 3 X's                         │
│  • Vertical: Column of 3 X's                        │
│  • Diagonal: Corner to corner                       │
│                                                     │
│  "Or fill the board with no winner for a draw!"     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 5: STRATEGY TIPS (0:30)                       │
│  ───────────────────────                            │
│  "Quick tips to improve your game:"                 │
│                                                     │
│  1. "Take the center first - it controls more       │
│     lines than any other square!"                   │
│                                                     │
│  2. "Corners are strong second moves"               │
│                                                     │
│  3. "Watch for two in a row - block your opponent!" │
│                                                     │
│  4. "With perfect play, games always end in draws!" │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 6: YOUR OPPONENT (0:15)                       │
│  ──────────────────────                             │
│  "You'll play against an AI opponent!"              │
│                                                     │
│  "StrategistApe thinks strategically and blocks     │
│   your winning moves."                              │
│                                                     │
│  [Start Game Button]                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Key Tutorial Messages

| Message | When Shown | Purpose |
|---------|------------|---------|
| "Center controls 4 lines - it's your best first move!" | First move section | Teach optimal opening |
| "Block your opponent!" | Opponent has two in a row | Defensive awareness |
| "Look for forks!" | Player can create two threats | Advanced strategy |
| "Perfect play leads to a draw!" | Game end | Manage expectations |
| "Good game!" | Any game end | Positive reinforcement |

### Tutorial Timing

| Step | Minimum Time | Maximum Time |
|------|--------------|--------------|
| Board introduction | 10s | 20s |
| Symbols | 10s | 15s |
| Making moves | 20s | 30s |
| Winning combinations | 20s | 30s |
| Strategy tips | 20s | 30s |
| Opponent info | 10s | 15s |
| **Total** | **90s** | **140s** |

---

## Babel Tower Tutorial

### Tutorial Flow

```
┌─────────────────────────────────────────────────────┐
│  BABEL TOWER TUTORIAL                               │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 1: THE BASICS (0:30)                          │
│  ─────────────────────────                          │
│  "Welcome to Babel Tower! Your goal is to           │
│   build the tallest tower by playing cards."        │
│                                                     │
│  [Show: Tower zone with 0 height]                   │
│  [Show: Hand of 5 cards]                            │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 2: PLAYING CARDS (1:00)                       │
│  ─────────────────────────                          │
│  "Each card has a value (1-25) and a suit."         │
│                                                     │
│  [Highlight: Card value]                            │
│  [Highlight: Card suit]                             │
│                                                     │
│  "When you play a card, it adds to your tower!"     │
│                                                     │
│  [Interactive: Player plays a sample card]          │
│  [Show: Tower height increases]                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 3: SUIT BONUSES (1:00)                        │
│  ───────────────────────                            │
│  "Different suits give different bonuses:"          │
│                                                     │
│  🪨 Stone: +0  (steady, reliable)                   │
│  🧱 Brick: +2  (solid foundation)                   │
│  🪵 Wood: +4  (good balance)                        │
│  🪟 Glass: +6  (high reward, rare)                  │
│                                                     │
│  [Interactive: Compare suits]                       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 4: SPECIAL ACTIONS (1:30)                     │
│  ─────────────────────────                          │
│  "High-value cards unlock special actions!"         │
│                                                     │
│  🎯 SABOTAGE (15+): "Remove points from             │
│     an opponent's tower"                            │
│                                                     │
│  ⬆️ BOOST (10+): "Add +5 bonus to your tower"      │
│                                                     │
│  🃏 STEAL (8+): "Take a card from the table"        │
│                                                     │
│  [Interactive: Try each action]                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 5: ROUND MULTIPLIERS (0:30)                   │
│  ─────────────────────────────                      │
│  "Later rounds have higher multipliers!"            │
│                                                     │
│  Round 1-3: ×1  (early game)                        │
│  Round 4-6: ×1.5 (mid game)                         │
│  Round 7-9: ×2   (late game)                        │
│  Round 10-12: ×3  (final stretch)                   │
│                                                     │
│  [Show: Example scoring comparison]                 │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 6: WINNING (0:30)                             │
│  ─────────────────                                 │
│  "After 12 rounds, highest score wins!"             │
│                                                     │
│  "Tiebreaker: Tower height"                         │
│                                                     │
│  [Start Game Button]                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Key Tutorial Messages

| Message | When Shown | Purpose |
|---------|------------|---------|
| "Cards are your resource - use them wisely!" | After first play | Reinforce strategy |
| "Glass is powerful but rare - save it for the endgame!" | Suit bonus section | Teach timing |
| "Sabotage can change the game - use it strategically!" | Special actions | Explain risk/reward |
| "Rounds get more valuable - plan your timing!" | Round multipliers | Long-term thinking |

---

## Word Builder Tutorial

### Tutorial Flow

```
┌─────────────────────────────────────────────────────┐
│  WORD BUILDER TUTORIAL                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 1: THE BASICS (0:30)                          │
│  ─────────────────────────                          │
│  "Welcome to Word Builder! Create words from        │
│   your letter tiles to score points."               │
│                                                     │
│  [Show: Empty rack]                                 │
│  [Show: 7 random tiles dealt]                       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 2: LETTER VALUES (1:00)                       │
│  ───────────────────────                            │
│  "Letters have different point values:"             │
│                                                     │
│  Easy (1pt):  E A I O N R T L S U                   │
│  Medium (2-3): D G B C M P                          │
│  Hard (4-5):   F H V W Y K                          │
│  Expert (8-10): J X Q Z                             │
│                                                     │
│  [Interactive: Identify high/low value letters]     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 3: CREATING WORDS (1:30)                      │
│  ─────────────────────────                          │
│  "Arrange your tiles to spell a word!"              │
│                                                     │
│  "Minimum 3 letters"                                │
│                                                     │
│  [Interactive: Player spells "CAT"]                 │
│  [Show: Score calculation]                          │
│                                                     │
│  "CAT = C(3) + A(1) + T(1) = 5 points!"             │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 4: LENGTH BONUSES (1:00)                      │
│  ───────────────────────                            │
│  "Longer words earn multipliers!"                   │
│                                                     │
│  3-4 letters: ×1                                    │
│  5 letters: ×1.5                                    │
│  6 letters: ×2                                      │
│  7+ letters: ×3                                     │
│                                                     │
│  [Example: BUILDING = 3× score!]                    │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 5: SPECIAL BONUSES (0:30)                     │
│  ───────────────────────                            │
│  "Use ALL 7 tiles for a +50 point bonus!"           │
│                                                     │
│  "Rare but game-changing!"                          │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 6: SWAPPING (0:30)                            │
│  ─────────────────                                 │
│  "Bad letters? Swap them!"                          │
│                                                     │
│  "Return tiles, draw new ones"                      │
│                                                     │
│  "Your turn ends, but you get better tiles!"        │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 7: CHALLENGING (0:30)                         │
│  ───────────────────                                │
│  "Think a word is invalid? Challenge it!"           │
│                                                     │
│  "If you're right: They lose their turn!"           │
│                                                     │
│  "If you're wrong: You lose YOUR next turn!"        │
│                                                     │
│  [Start Game Button]                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Key Tutorial Messages

| Message | When Shown | Purpose |
|---------|------------|---------|
| "Balance your rack - mix vowels and consonants!" | After first word | Rack management |
| "S tiles are gold - great for plurals!" | Letter values | Strategy hint |
| "Seven letters = massive bonus!" | 7-tile section | Encourage bingo play |
| "Challenge wisely - risks are real!" | Challenge section | Risk awareness |

---

## Chess Tutorial

### Tutorial Flow

```
┌─────────────────────────────────────────────────────┐
│  CHESS TUTORIAL                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 1: THE BOARD (0:30)                           │
│  ────────────────────                               │
│  "Welcome to Chess! The classic game of strategy."  │
│                                                     │
│  "White moves first"                                │
│                                                     │
│  [Show: Board with pieces in starting position]     │
│  [Highlight: White pieces, then Black pieces]       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 2: THE PIECES (2:00)                          │
│  ───────────────────                                │
│  "Each piece moves differently:"                    │
│                                                     │
│  ♔ King: 1 square any direction - "Protect me!"     │
│  ♕ Queen: Any direction, any distance               │
│  ♖ Rook: Straight lines only                        │
│  ♗ Bishop: Diagonals only                           │
│  ♘ Knight: L-shape, jumps over pieces               │
│  ♙ Pawn: Forward 1 (2 from start), captures diag   │
│                                                     │
│  [Interactive: Try each piece's movement]           │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 3: SPECIAL MOVES (1:30)                       │
│  ───────────────────────                            │
│  "Three special moves:"                             │
│                                                     │
│  CASTLING: King + Rook swap for safety              │
│  "King moves 2, Rook jumps over"                    │
│                                                     │
│  EN PASSANT: Pawn captures "in passing"             │
│  "Only right after a 2-square pawn move"            │
│                                                     │
│  PROMOTION: Pawn becomes any piece                 │
│  "Usually Queen, sometimes Knight"                  │
│                                                     │
│  [Interactive: Practice each move]                  │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 4: CHECK AND CHECKMATE (1:00)                 │
│  ─────────────────────────────────                  │
│  "CHECK: Your King is under attack!"                │
│                                                     │
│  "You MUST get out of check:"                       │
│  • Move the King                                   │
│  • Block the attack                                 │
│  • Capture the attacking piece                      │
│                                                     │
│  "CHECKMATE: No way to escape - GAME OVER!"         │
│                                                     │
│  [Interactive: Escape from check]                   │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 5: DRAW CONDITIONS (0:30)                     │
│  ─────────────────────────                          │
│  "Games can end in draws:"                          │
│                                                     │
│  • STALEMATE: No moves, not in check                │
│  • INSUFFICIENT: Not enough pieces to checkmate     │
│  • REPETITION: Same position 3 times                │
│  • 50-MOVE: No pawn move or capture in 50 turns     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  STEP 6: BASIC STRATEGY (1:00)                      │
│  ───────────────────────                            │
│  "Quick tips for beginners:"                        │
│                                                     │
│  1. "Control the center" - e4, d4 are key squares   │
│  2. "Develop pieces" - Get knights and bishops out  │
│  3. "Castle early" - Protect your king              │
│  4. "Don't move the same piece twice"               │
│                                                     │
│  [Start Game Button]                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Key Tutorial Messages

| Message | When Shown | Purpose |
|---------|------------|---------|
| "Knights jump over pieces - use them early!" | Knight section | Emphasize uniqueness |
| "Castling is safe - do it early!" | Castling section | King safety |
| "Checkmate, not just capture!" | Check section | Win condition clarity |
| "Practice makes perfect!" | End | Encouragement |

---

## Tutorial Implementation Spec

### For MonkeyBuilder

| Element | Spec |
|---------|------|
| Skippable | Yes, with "Skip Tutorial" button |
| Replayable | Yes, from game menu |
| Timing | Auto-advance after display time |
| Interactive | Highlight clickable elements |
| Progress save | Store tutorial_completed = true |
| Accessibility | Screen reader descriptions for all text |

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
