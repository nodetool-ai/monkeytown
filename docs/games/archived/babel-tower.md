# 🗼 Babel Tower

> **⚠️ ARCHIVED - This game is no longer available in Monkeytown.**  
> **The platform has been simplified to focus on [Tic-Tac-Toe](../tictactoe.md).**  
> **This documentation is kept for historical reference only.**

**A strategic card game of tower building and sabotage**

## Quick Overview

| Aspect | Details |
|--------|---------|
| Players | 2-5 |
| Duration | 10-20 minutes |
| Type | Card Game |
| Difficulty | Medium |
| Luck Factor | Medium |
| Strategy | High |

---

## 🎯 Objective

Build the **tallest tower** by playing cards strategically. The player with the highest tower score at the end of all rounds wins!

---

## 📦 Components

### The Deck
- **100 cards total** (4 suits × 25 values)
- **Suits**: 🪨 Stone, 🧱 Brick, 🪵 Wood, 🪟 Glass
- **Values**: 1-25 (higher = more powerful)

### Starting Setup
- Each player receives **5 cards**
- A shared **table area** for played cards
- Individual **tower zones** for tracking height

---

## 🎮 How to Play

### Game Flow
1. **12 Rounds** of play
2. Players take turns clockwise
3. Each turn: Play a card, use special action, or pass
4. New cards dealt when hands are empty

### On Your Turn

You have **60 seconds** to choose one action:

#### Option 1: Play a Card
1. Select a card from your hand
2. Add it to your tower
3. Gain tower height = card value + suit bonus + round multiplier

**Tower Height Formula:**
```
Height = Base Value + Suit Bonus + Round Multiplier
```

**Suit Bonuses:**
| Suit | Bonus |
|------|-------|
| 🪨 Stone | +0 |
| 🧱 Brick | +2 |
| 🪵 Wood | +4 |
| 🪟 Glass | +6 |

#### Option 2: Special Actions

Use high-value cards for special effects:

| Action | Min Value | Effect |
|--------|-----------|--------|
| 🎯 **Sabotage** | 15+ | Remove points from opponent's tower |
| ⬆️ **Boost** | 10+ | Add +5 bonus to your tower |
| 🃏 **Steal** | 8+ | Take a card from the table |

**Sabotage Damage:**
```
Damage = Card Value ÷ 2 (rounded down)
```

#### Option 3: Pass
- Skip your turn
- Keep your cards for later

---

## ⚙️ Detailed Rules

### Round Progression

1. **Start of Round**: Cards are dealt if hands are empty
2. **Player Turns**: Each player takes one action
3. **Round End**: Triggered when:
   - All hands are empty, OR
   - Table has 2× player count cards AND all passed
4. **New Round**: Table cleared, new hands dealt

### Scoring

**Understanding Score vs Tower Height:**

| Metric | What It Is | How It's Calculated |
|--------|------------|---------------------|
| **Score** | Total points accumulated | Sum of all card values played |
| **Tower Height** | Current building level | Cumulative height with bonuses |

**During the Game:**
- Playing cards adds their value to your **score**
- Playing cards adds value + suit bonus + round multiplier to your **tower height**
- Special actions can add or subtract from both metrics
- Both are displayed during gameplay

**End of Game:**
- Player with highest **score** wins
- Ties broken by **tower height**

**Why Two Metrics?**
- Score represents raw card value contribution
- Tower height includes strategic bonuses (timing, suit selection)
- This rewards both good cards AND good strategy

### Turn Timer

- **60 seconds** per turn
- If timer expires, you automatically pass
- Timer shows remaining time on screen

---

## 🤖 AI Opponent Strategies

Different AI opponents play differently:

| Agent | Strategy |
|-------|----------|
| 🎭 TricksterMonkey | Holds high cards, surprises with sabotage |
| 🧩 StrategistApe | Builds steadily, times special actions |
| ⚡ SpeedyGibbon | Plays quickly, aggressive card use |
| 🛡️ GuardianGorilla | Defensive, counters your moves |
| 🃏 WildcardLemur | Random but sometimes brilliant |
| 📚 MentorOrangutan | Explains their moves, good for learning |
| 🏆 ChampionChimp | Optimizes every decision |

---

## 📊 Strategy Tips

### Beginner Tips
1. **Don't hoard cards** - Play consistently to build height
2. **Watch the round** - Higher rounds = better multipliers
3. **Save one high card** - For sabotage when needed

### Advanced Tips
1. **Suit timing** - Glass (+6) is best in later rounds
2. **Read opponents** - If they're building fast, consider sabotage
3. **Table awareness** - Track what cards have been played
4. **Pace control** - Sometimes passing is the best move

### Expert Tips
1. **Expected value** - Calculate optimal card timing
2. **Bluff** - Hold cards to make opponents worry
3. **Denial** - Steal cards opponents need
4. **Endgame math** - Know exactly when to push or defend

---

## 📜 Complete Rules Summary

```
BABEL TOWER - COMPLETE RULES

SETUP:
- Deck: 100 cards (4 suits × 25 values)
- Deal: 5 cards per player
- Rounds: 12 total

TURN OPTIONS:
1. Play Card → Gain height (value + suit + round)
2. Sabotage (15+) → Reduce opponent by value/2
3. Boost (10+) → Add +5 to your tower
4. Steal (8+) → Take card from table
5. Pass → Skip turn

SUIT BONUSES:
- Stone: +0
- Brick: +2
- Wood: +4
- Glass: +6

ROUND ENDS WHEN:
- All hands empty, OR
- Table full + all passed

WINNING:
- Highest score after 12 rounds
- Tiebreaker: tower height
```

---

## ❓ FAQ

**Q: What happens if I run out of cards?**
A: Wait for the round to end, then new cards are dealt.

**Q: Can I sabotage a player with 0 tower height?**
A: Yes, but they stay at 0 (can't go negative).

**Q: Do special actions count as playing a card?**
A: Yes, the card is consumed when using a special action.

**Q: What's the difference between score and tower height?**
A: Score = total points accumulated. Tower height = current building level. Both matter!

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

*Part of the Monkeytown game collection. Rules may evolve as agents improve the game.*
