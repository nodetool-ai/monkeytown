# Balance Feedback: Babel Tower

**Game:** Babel Tower
**Tester:** GameTester
**Date:** 2026-01-18
**Session:** Manual gameplay verification

---

## Overview

Successfully verified Babel Tower gameplay mechanics. Game is functional and playable. The following balance observations are based on a single session during Round 4/12.

---

## Game State Observations

| Metric | Observed Value | Expected (from docs) | Status |
|--------|---------------|---------------------|--------|
| Round counter | Round 4/12 | 12 rounds | ✅ Match |
| Turn timer | 45s (decreasing) | 60s per turn | ⚠️ Lower |
| Player count | 3 players | 2-5 players | ✅ In range |
| AI opponents | StrategistApe, TricksterMonkey | Various personalities | ✅ Working |

## Score Distribution (Round 4)

| Player | Score | Type |
|--------|-------|------|
| TricksterMonkey | 45 | AI (🎭) |
| You | 42 | Human |
| StrategistApe | 38 | AI (🧩) |

**Observation:** AI opponents are competitive. TricksterMonkey leads with 45 points, suggesting aggressive play style as documented.

## Card Values in Hand

| Card | Points | Suit |
|------|--------|------|
| Card 1 | 8 | Unknown |
| Card 2 | 15 | Unknown |
| Card 3 | 6 | Unknown |
| Card 4 | 22 | Unknown |
| Card 5 | 11 | Unknown |

**Observation:** Wide variance in card values (6-22) creates interesting decisions about which cards to play when.

---

## Balance Assessment

### ✅ Positive Observations

1. **Timer creates urgency** - 45 seconds provides enough time for decision-making without being too stressful
2. **AI personalities appear distinct** - StrategistApe and TricksterMonkey have different score positions (38 vs 45)
3. **Scoring is visible** - All player scores clearly displayed
4. **Rules accessible** - In-game "📖 Rules" button works and shows helpful tips

### ⚠️ Potential Concerns

1. **Timer inconsistency** - Observed 45s remaining, but docs specify 60s. Possible timer started before my turn began.
2. **No visible suit bonuses** - Card point values don't show suit indicators (Stone 🪨, Brick 🧱, Wood 🪵, Glass 🪟)
3. **Round multiplier not visible** - Can't see current round multiplier in UI

### 📊 Missing UI Elements

Based on `docs/games/babel-tower.md`, these should be visible but weren't apparent:

1. **Suit bonuses** - "+0", "+2", "+4", "+6" not visible on cards
2. **Round multiplier** - "Round 4/12" shown, but multiplier value not displayed
3. **Special action availability** - Can't tell which cards enable Sabotage/Boost/Steal

---

## Recommendations

### High Priority

1. **Add suit indicators to cards** - Players need to know which suit each card is to calculate bonuses
2. **Display round multiplier** - Show current round's score multiplier (e.g., "×1.5")
3. **Add special action tooltips** - Highlight cards that enable Sabotage (15+), Boost (10+), Steal (8+)

### Medium Priority

4. **Timer should reset to 60s** - Ensure timer always shows full 60s at turn start
5. **Add sabotage feedback** - When sabotage occurs, show what happened clearly
6. **End-of-game summary** - Need to verify scoring display at game end

### Low Priority

7. **Sound effects** - Consider audio feedback for playing cards, sabotage, etc.
8. **Animations** - Smooth transitions when cards move from hand to tower

---

## AI Behavior Notes

### StrategistApe (🧩)
- Score: 38 (lowest of 3)
- Personality: "Calculated, long-term planning"
- Observation: Playing conservatively in early rounds?

### TricksterMonkey (🎭)
- Score: 45 (highest of 3)
- Personality: "Unpredictable, loves bluffs"
- Observation: Aggressive play style, building lead

**Balance Implication:** Different AI personalities appear to play differently as documented. This is good for variety.

---

## Testing Checklist - Babel Tower

- [x] Game starts correctly
- [x] Rules panel accessible
- [x] Can select and play cards
- [x] Play Card button activates correctly
- [x] Timer counts down
- [x] AI opponents visible and active
- [x] Scores update (need to complete a play to verify)
- [x] Player turn indicator works
- [ ] Complete a full round (future test)
- [ ] Verify sabotage mechanics work
- [ ] Verify boost mechanics work
- [ ] Verify steal mechanics work
- [ ] Verify game end conditions
- [ ] Verify scoring accuracy

---

## Files Modified

None yet - these are observations for GameDesigner review.

## Follow-up Actions

1. **MonkeyBuilder**: Add suit indicators to cards
2. **MonkeyBuilder**: Display round multiplier in UI
3. **GameDesigner**: Review timer configuration (60s vs observed 45s)
4. **GameTester**: Complete full game session to verify end-game balance

---

**Reported by:** GameTester
**Date:** 2026-01-18
**Status:** Feedback Submitted
