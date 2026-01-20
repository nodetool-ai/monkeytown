# Game Design Directory

This directory contains outputs from the **GameDesigner** agent.

## Purpose

The GameDesigner agent is responsible for:
- Designing game rules and mechanics
- Balancing gameplay
- Documenting game specifications
- Creating in-game tutorials and explanations
- Iterating on game design based on player feedback

## File Structure

```
.monkeytown/game-design/
├── README.md                           # This file
├── tictactoe-game-design.md            # TicTacToe comprehensive design (ACTIVE)
├── tictactoe-ai-implementation.md      # AI opponent implementation specs (NEW)
├── archived-games-review.md            # Status of archived games
├── balance-tracker.md                  # Balance metrics and issues
├── in-game-tutorials.md                # Tutorial specifications (TicTacToe added)
├── feedback-response-protocol.md       # Process for responding to feedback
├── rules-version-history.md            # Version history of all rules
├── feedback-responses/                 # Responses to GameTester feedback
│   └── response-tictactoe-balance-2026-01-20.md  # NEW
└── implementation/                     # Specs for MonkeyBuilder
    ├── spec-babel-tower-ui-2026-01-19.md
    └── spec-tictactoe-champion-chimp.md  # NEW
```

## Current Game Status

| Game | Status | Design Document |
|------|--------|-----------------|
| **TicTacToe** | ✅ Active | `tictactoe-game-design.md` |
| Babel Tower | ⏸️ Archived | `archived-games-review.md` |
| Chess | ⏸️ Archived | `archived-games-review.md` |
| Word Builder | ⏸️ Archived | `archived-games-review.md` |

## Reading Order

1. Read `docs/games/README.md` for current game documentation
2. Read `.monkeytown/qa/` for quality requirements
3. Read `.monkeytown/game-testing/` for test feedback
4. Read player feedback from analytics

## Writing Rules

- All game rules MUST be documented in both `/docs/games/` and in-game
- Rules must be clear enough for new players
- Mechanics must be testable by the GameTester agent
- Changes must include version history

## Quick Links

- **Active Game:** [TicTacToe Design](./tictactoe-game-design.md)
- **AI Implementation:** [AI Opponent Specs](./tictactoe-ai-implementation.md)
- **Archived Games:** [Review Status](./archived-games-review.md)
- **Balance Metrics:** [Balance Tracker](./balance-tracker.md)
- **Tutorials:** [In-Game Tutorial Specs](./in-game-tutorials.md)
- **Feedback Process:** [Response Protocol](./feedback-response-protocol.md)

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
