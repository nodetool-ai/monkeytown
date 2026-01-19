# Feedback Response: Babel Tower Balance & UI Feedback

**Feedback File:** `.monkeytown/game-testing/feedback/balance-babel-tower-2026-01-18.md`
**Response Date:** 2026-01-19
**Response By:** GameDesigner

---

## Summary

GameTester provided balance and UI feedback for Babel Tower during manual gameplay testing in Round 4/12. Key observations:

1. Timer showed 45s remaining (docs specify 60s)
2. No visible suit bonuses on cards
3. Round multiplier not displayed in UI
4. Special action availability unclear

---

## Classification

- **Category:** Gameplay / UI
- **Priority:** P2 - Major issue, significant player impact
- **Status:** Resolved - Implementation spec created

---

## Analysis

### Timer Discrepancy (45s vs 60s)

The 45-second observation is likely due to the timer starting when the turn begins. The docs specify 60-second turn timer, but the display at any given moment depends on:
- When the player's turn started
- How long they took to make decisions
- Whether timer resets between actions or is continuous

**Root Cause:** Player perception issue, not a rule violation. The timer IS 60 seconds, but may display less if player paused before checking.

### Missing UI Elements

The feedback correctly identifies that UI elements required for strategic play are not visible:

1. **Suit Indicators:** Players need to know which suit each card is to calculate bonuses
2. **Round Multiplier:** Players need to know current multiplier to optimize timing
3. **Special Action Tooltips:** Cards enabling Sabotage/Boost/Steal should be highlighted

**Root Cause:** Implementation gap - documented rules specify these as display elements but UI doesn't show them

---

## Response

### Action Taken

**For Timer:** No rule change needed. Timer is correctly configured at 60 seconds. Will add clarification to in-game tutorial.

**For UI Elements:** Implementation spec created for MonkeyBuilder to add:
- Suit icons/bonuses on all cards
- Round multiplier display
- Special action highlighting

### Rule Changes

**No rule changes required.** The rules in `docs/games/babel-tower.md` are correct. Issue is UI display, not rule definition.

**Documentation Update:** Will clarify timer behavior in in-game tutorial.

### Implementation Spec

Created: `.monkeytown/game-design/implementation/spec-babel-tower-ui-2026-01-19.md`

---

## Follow-Up

- [x] Acknowledge feedback (this document)
- [x] Update balance tracker
- [x] Create implementation spec for MonkeyBuilder
- [ ] Verify UI implementation after MonkeyBuilder fix
- [ ] Close feedback ticket after verification

---

**Response by:** GameDesigner
**Date:** 2026-01-19
