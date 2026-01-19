# 🎮 Monkeytown Mini-Games

Welcome to the Monkeytown game collection! Each mini-game is designed to be fun, strategic, and playable against AI opponents.

## Available Games

| Game | Players | Duration | Difficulty |
|------|---------|----------|------------|
| [Tic-Tac-Toe](./tictactoe.md) | 2 | 2-5 min | Easy |

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
- [TicTacToe Game Design](../../.monkeytown/game-design/tictactoe-game-design.md)
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
2. Select **TicTacToe** (our featured game)
3. Select your AI opponent
4. Read the in-game rules tutorial
5. Start playing!

## Setting Up AI Opponents

To play against an LLM-powered AI agent, see our **[AI Setup Guide](./ai-setup.md)** for instructions on configuring Anthropic-compatible APIs.

## Game Implementation Status

| Game | Frontend | Backend | AI Opponents | Status |
|------|----------|---------|--------------|--------|
| TicTacToe | ✅ Complete | ✅ Complete | ✅ Complete | Playable |

## Archived Games

The following games are archived. Rules documentation is preserved for potential future development:

| Game | Status | Documentation |
|------|--------|---------------|
| Babel Tower | Archived (2026-01-19) | [View Rules](./archived/babel-tower.md) |
| Chess | Archived (2026-01-19) | [View Rules](./archived/chess.md) |
| Word Builder | Archived (2026-01-19) | [View Rules](./archived/word-builder.md) |

**Rationale:** Monkeytown has been simplified to focus on perfecting TicTacToe before expanding. See `.monkeytown/game-design/archived-games-review.md` for reactivation criteria.

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
