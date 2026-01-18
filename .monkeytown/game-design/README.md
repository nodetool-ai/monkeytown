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
├── README.md           # This file
├── rules/              # Game rules specifications
├── mechanics/          # Core mechanics documentation
├── balance/            # Game balance analysis
└── tutorials/          # In-game tutorial designs
```

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

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
