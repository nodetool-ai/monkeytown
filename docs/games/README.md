# 🎮 Monkeytown Mini-Games

Welcome to the Monkeytown game collection! Each mini-game is designed to be fun, strategic, and playable against AI opponents.

## Available Games

| Game | Players | Duration | Status | Description |
|------|---------|----------|--------|-------------|
| **[TicTacToe](./tictactoe.md)** | 2 | 2-5 min | ✅ Playable | Classic X's and O's strategy |
| **[Babel Tower](./babel-tower.md)** | 2-5 | 10-20 min | 🔲 Coming Soon | Card game of tower building |
| **[Chess](./chess.md)** | 2 | 15-60 min | 🔲 Planned | Classic strategy against AI |
| **[Word Builder](./word-builder.md)** | 2-5 | 5-15 min | 🔲 Planned | Build words, score points |

### ⚠️ Current Status

**Only TicTacToe is currently playable.** A navigation bug prevents access to other games (see [Bug-001](../../.monkeytown/game-testing/bugs/bug-001-navigation-broken.md)).

The other games are in various stages of development:
- **Babel Tower**: Backend engine complete, frontend pending
- **Chess**: Types defined, engine not started
- **Word Builder**: Types defined as "words", engine not started

## Game Philosophy

All Monkeytown games follow these principles:

1. **Clear Rules**: Every rule is documented and explained
2. **Fair Play**: AI opponents follow the same rules as human players
3. **Progressive Learning**: Games have low floors and high ceilings
4. **Social Fun**: Designed for interaction and memorable moments
5. **Transparent AI**: You always know when you're playing against AI

## Version History

All game rules are versioned. See individual game pages for version history.

**Design Documents:**
- [In-Game Tutorial Specs](../../.monkeytown/game-design/in-game-tutorials.md)
- [Balance Tracker](../../.monkeytown/game-design/balance-tracker.md)
- [Rules Version History](../../.monkeytown/game-design/rules-version-history.md)

**Feedback Loop:**
- [GameTester Reports](../../.monkeytown/game-testing/)
- [Feedback Response Protocol](../../.monkeytown/game-design/feedback-response-protocol.md)

## AI Opponents

When you play in Monkeytown, you're matched against our Player Agents - AI personalities designed specifically for gameplay:

| Agent | Emoji | Personality | Best For |
|-------|-------|-------------|----------|
| TricksterMonkey | 🎭 | Unpredictable, loves bluffs | Experienced players |
| StrategistApe | 🧩 | Calculated, long-term planning | Strategic games |
| SpeedyGibbon | ⚡ | Quick decisions, aggressive | Fast-paced games |
| GuardianGorilla | 🛡️ | Defensive, blocks opponents | Learning patterns |
| WildcardLemur | 🃏 | Random strategies | Fun, casual play |
| MentorOrangutan | 📚 | Teaching, explains moves | New players |
| ChampionChimp | 🏆 | Competitive, aims to win | Skilled players |

> **Note**: These Player Agents are different from our Builder Agents who develop the game. Player Agents are designed purely for gameplay, with unique personalities and strategies.

## How to Start a Game

1. Visit the Monkeytown lobby
2. Currently available: **TicTacToe** (other games coming soon)
3. Select your AI opponent(s)
4. Read the in-game rules tutorial
5. Start playing!

## Game Implementation Status

| Game | Frontend | Backend | AI Opponents | Status |
|------|----------|---------|--------------|--------|
| TicTacToe | ✅ Complete | ✅ Complete | ✅ Complete | Playable |
| Babel Tower | 🔲 Pending | ✅ Complete | 🔲 Partial | In Progress |
| Chess | 🔲 Not Started | 🔲 Not Started | 🔲 Not Started | Planned |
| Word Builder | 🔲 Not Started | 🔲 Not Started | 🔲 Not Started | Planned |

## Feedback & Suggestions

Games are continuously improved by our Builder Agents based on player feedback. If you have suggestions:

1. Play the game and note what could be better
2. The GameTester agent collects feedback automatically
3. The GameDesigner agent designs improvements
4. Updates are shipped by the MonkeyBuilder agent

**Related Documentation:**
- [Game Design Overview](../../.monkeytown/game-design/)
- [Game Testing Reports](../../.monkeytown/game-testing/)
- [Architecture Overview](../architecture.md)

---

*Games that build themselves. Built by agents, enjoyed by you.* 🐒
