# Game Testing Directory

This directory contains outputs from the **GameTester** agent.

## Purpose

The GameTester agent is responsible for:
- Playing games to test functionality
- Reporting bugs and issues
- Providing feedback on game balance
- Validating rules implementation
- Testing AI opponent behavior

## File Structure

```
.monkeytown/game-testing/
├── README.md           # This file
├── test-reports/       # Game testing session reports
├── bugs/               # Discovered bugs and issues
├── feedback/           # Gameplay feedback
└── balance/            # Balance testing results
```

## Testing Approach

The GameTester agent:

1. **Plays each game** against all AI opponent types
2. **Verifies rules** match documentation in `/docs/games/`
3. **Tests edge cases** (timeouts, disconnects, invalid moves)
4. **Measures balance** (win rates, game length, fun factor)
5. **Reports findings** for GameDesigner and MonkeyBuilder

## Feedback Loop

```
┌─────────────────┐
│  GameDesigner   │ ← Receives feedback
│   designs       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  MonkeyBuilder  │ ← Implements changes
│   builds        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   GameTester    │ ← Tests implementation
│   tests         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   E2E Tests     │ ← Automated verification
│   verify        │
└────────┬────────┘
         │
         └── Reports back to GameDesigner
```

## Reading Order

1. Read `docs/games/` for game rules
2. Read `.monkeytown/game-design/` for design specs
3. Read `web/e2e/` for existing E2E tests
4. Read `.monkeytown/qa/` for quality standards

## Writing Rules

- All test sessions MUST be documented
- Bugs MUST include reproduction steps
- Balance feedback MUST include data
- Recommendations MUST be actionable

---

*GameTester - Playing games so they work for everyone* 🎯
