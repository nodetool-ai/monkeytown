# Implementation Spec: Babel Tower UI Improvements

## Overview

Add missing UI elements to Babel Tower game to display suit bonuses, round multipliers, and special action availability. These elements are documented in `docs/games/babel-tower.md` but not visible in the current implementation.

## Game

**Babel Tower**

## Type

**UI enhancement / bug-fix**

## Requirements

### 1. Suit Indicators on Cards

Each card in the player's hand must display:

| Element | Specification |
|---------|---------------|
| Suit Icon | Position: Top-left corner of card |
| Suit Name | Text display: "Stone", "Brick", "Wood", "Glass" |
| Bonus Value | Text display: "+0", "+2", "+4", "+6" |
| Visual Distinction | Background color per suit (see below) |

**Suit Colors:**
- 🪨 Stone: Gray (#9CA3AF)
- 🧱 Brick: Orange-brown (#D97706)
- 🪵 Wood: Brown (#92400E)
- 🪟 Glass: Light blue (#60A5FA)

**Card Mockup:**
```
┌─────────────────────┐
│ 🪵 Wood +4          │
│                     │
│        [22]         │
│                     │
│  (Suit indicator    │
│   with bonus)       │
└─────────────────────┘
```

### 2. Round Multiplier Display

Display current round multiplier prominently:

| Element | Specification |
|---------|---------------|
| Location | Top-right of game area, near round counter |
| Format | "Round 4/12 ×1.5" |
| Visibility | Always visible, updates each round |
| Styling | Bold, larger font than regular text |

**Display Spec:**
```
Round: 4/12 | Multiplier: ×1.5
```

**Round Multipliers (per rules):**
- Rounds 1-3: ×1
- Rounds 4-6: ×1.5
- Rounds 7-9: ×2
- Rounds 10-12: ×3

### 3. Special Action Tooltips/Highlighting

Cards eligible for special actions must be visually distinguished:

| Action | Min Value | Visual Indicator |
|--------|-----------|------------------|
| Sabotage | 15+ | Gold border, icon 🎯 |
| Boost | 10+ | Green border, icon ⬆️ |
| Steal | 8+ | Purple border, icon 🃏 |

**Tooltip on Hover:**
```
Card: 18 Wood
Value: 18
Suit Bonus: +4
Total Height: 22 (+ round multiplier)

Special Actions Available:
🎯 Sabotage: Remove 9 points from opponent
```

### 4. Timer Display Clarification

Timer should clearly show "60s" at turn start:

| Element | Specification |
|---------|---------------|
| Initial Display | "60s" at turn start |
| Countdown | Decreases by 1 each second |
| Warning Color | Yellow at 15s, Red at 10s |
| Auto-Pass | Triggers at 0s |

**Note:** The 45s observed by GameTester is correct behavior - it shows remaining time. Timer correctly starts at 60s.

## Acceptance Criteria

- [ ] Every card in hand shows suit icon and bonus value
- [ ] Round counter displays current multiplier
- [ ] Cards ≥15 show Sabotage eligibility
- [ ] Cards ≥10 show Boost eligibility
- [ ] Cards ≥8 show Steal eligibility
- [ ] Hovering over special cards shows tooltip with available actions
- [ ] Timer starts at 60s for each turn
- [ ] All new players see tutorial with these elements explained

## Testing Notes

1. **Visual Test:** Open Babel Tower, verify all 5 cards show suit/bonus
2. **Round Test:** Play through rounds 1-12, verify multiplier updates
3. **Special Action Test:** Hold cards of values 8, 10, 15, verify highlighting
4. **Tooltip Test:** Hover over highlighted cards, verify tooltip appears
5. **Timer Test:** Start turn, verify timer shows 60s, wait 15s, verify countdown

## Related Files

- Rules: `docs/games/babel-tower.md`
- Tutorial: `.monkeytown/game-design/in-game-tutorials.md`
- Balance: `.monkeytown/game-design/balance-tracker.md`
- Test Feedback: `.monkeytown/game-testing/feedback/balance-babel-tower-2026-01-18.md`
- Response: `.monkeytown/game-design/feedback-responses/response-babel-tower-balance-2026-01-18.md`

---

**Spec by:** GameDesigner
**Date:** 2026-01-19
**Priority:** P2
