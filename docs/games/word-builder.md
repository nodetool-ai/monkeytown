# 📝 Word Builder

**A fast-paced word creation game**

## Quick Overview

| Aspect | Details |
|--------|---------|
| Players | 2-5 |
| Duration | 5-15 minutes |
| Type | Word Game |
| Difficulty | Easy |
| Luck Factor | Medium |
| Strategy | Medium |

---

## 🎯 Objective

Create the **highest-scoring words** from your letter tiles. Score points based on word length and letter values.

---

## 📦 Components

### Letter Tiles
- Pool of letter tiles with different values
- Common letters (E, A, T) = lower points
- Rare letters (Q, Z, X) = higher points

### Letter Values

| Points | Letters |
|--------|---------|
| 1 | E, A, I, O, N, R, T, L, S, U |
| 2 | D, G |
| 3 | B, C, M, P |
| 4 | F, H, V, W, Y |
| 5 | K |
| 8 | J, X |
| 10 | Q, Z |

### Starting Setup
- Each player receives **7 letter tiles**
- A central **word board** shows played words
- Individual **racks** hold your tiles

---

## 🎮 How to Play

### Game Flow
1. **6 Rounds** of play
2. Players take turns clockwise
3. Each turn: Create a word, swap tiles, or pass
4. Highest total score wins

### On Your Turn

You have **90 seconds** to choose one action:

#### Option 1: Create a Word
1. Arrange your tiles to spell a valid word
2. Minimum word length: **3 letters**
3. Submit the word
4. Score points based on letters
5. Draw new tiles to refill your rack

**Word Scoring:**
```
Word Score = Sum of Letter Values × Length Bonus
```

**Length Bonuses:**
| Word Length | Bonus |
|-------------|-------|
| 3 letters | ×1 |
| 4 letters | ×1 |
| 5 letters | ×1.5 |
| 6 letters | ×2 |
| 7+ letters | ×3 |

#### Option 2: Swap Tiles
1. Select tiles to exchange
2. Return them to the pool
3. Draw the same number of new tiles
4. Your turn ends (no word played)

#### Option 3: Pass
- Skip your turn
- Keep your current tiles

---

## ⚙️ Detailed Rules

### Valid Words

Words must:
- Be at least **3 letters** long
- Be in the English dictionary
- Not be proper nouns (names, places)
- Not be abbreviations

**Valid:** CAT, HOUSE, BUILDING, XENOPHOBE
**Invalid:** NYC, Dr., Bob, LOL

### Special Bonuses

**All 7 Tiles Bonus:** +50 points
Use all 7 tiles in one word for a massive bonus!

**Challenge System:**
- Players can challenge a word
- If invalid: word rejected, player loses turn
- If valid: challenger loses next turn

### Round Progression

1. **Start of Round**: Tiles refilled to 7
2. **Player Turns**: Each player creates one word
3. **Round End**: After all players have gone
4. **Scoring**: Points tallied and displayed

### Winning

- Player with highest score after 6 rounds wins
- Ties broken by longest word created

---

## 🤖 AI Opponent Strategies

| Agent | Word Style |
|-------|------------|
| 🎭 TricksterMonkey | Obscure words, challenges frequently |
| 🧩 StrategistApe | Long words, saves high-value letters |
| ⚡ SpeedyGibbon | Quick simple words, many turns |
| 🛡️ GuardianGorilla | Consistent medium words |
| 🃏 WildcardLemur | Random word attempts |
| 📚 MentorOrangutan | Educational words, explains meanings |
| 🏆 ChampionChimp | Optimal plays, dictionary mastery |

---

## 📊 Strategy Tips

### Beginner Tips
1. **Use common letters** - Don't hold onto vowels too long
2. **Short words are fine** - Consistency beats luck
3. **Watch the clock** - Don't overthink
4. **Swap strategically** - Bad tiles? Trade them!

### Intermediate Tips
1. **Save S tiles** - Great for pluralizing
2. **Learn 2-letter words** - Useful for tough racks
3. **Prefixes and suffixes** - UN-, RE-, -ING, -ED expand options
4. **Balance your rack** - Keep a mix of vowels and consonants

### Advanced Tips
1. **7-letter words** - Practice common combinations
2. **Q without U** - QOPH, QADI, QAID, QI
3. **High-value combos** - ZAX, JEU, EX, XI
4. **Tile tracking** - Know what's left in the pool

---

## 📜 Complete Rules Summary

```
WORD BUILDER - COMPLETE RULES

SETUP:
- 7 tiles per player
- 6 rounds

TURN OPTIONS:
1. Create Word → Score points
2. Swap Tiles → Exchange up to 7
3. Pass → Skip turn

LETTER VALUES:
- 1 pt: E, A, I, O, N, R, T, L, S, U
- 2 pt: D, G
- 3 pt: B, C, M, P
- 4 pt: F, H, V, W, Y
- 5 pt: K
- 8 pt: J, X
- 10 pt: Q, Z

LENGTH BONUSES:
- 3-4 letters: ×1
- 5 letters: ×1.5
- 6 letters: ×2
- 7+ letters: ×3

SPECIAL:
- All 7 tiles: +50 points
- Challenge: Risk/reward mechanic

WINNING:
- Highest score after 6 rounds
- Tiebreaker: longest word
```

---

## ❓ FAQ

**Q: Is "QOPH" really a word?**
A: Yes! It's a Hebrew letter. Q without U words exist.

**Q: What if the tile pool runs out?**
A: You can only swap with what's available.

**Q: Can I use the same word twice?**
A: Yes, but only in different rounds.

**Q: How do I know if a word is valid?**
A: The game validates automatically. Green = valid, Red = invalid.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-18 | Initial rules documentation |

**Playable Now:**
- [TicTacToe](./tictactoe.md) - The currently available game

**See also:**
- [In-Game Tutorial Specs](../../.monkeytown/game-design/in-game-tutorials.md)
- [Balance Tracker](../../.monkeytown/game-design/balance-tracker.md)

---

*Part of the Monkeytown game collection. Dictionary: English (US).*
