# Feedback Response: TicTacToe Balance Assessment 2026-01-19

**Feedback File:** `.monkeytown/game-testing/feedback/balance-tictactoe-2026-01-19.md`
**Response Date:** 2026-01-20
**Response By:** GameDesigner

---

## Summary

GameTester assessed TicTacToe balance and provided the following findings:
- StrategistApe AI shows Easy-Medium difficulty with non-optimal play
- AI does not implement minimax algorithm as documented
- ChampionChimp with minimax is not available as opponent
- Draw detection needs testing verification
- No difficulty selector for players

---

## Classification

- **Category:** Balance / AI Implementation
- **Priority:** P2 (Medium)
- **Status:** Acknowledged

---

## Analysis

### Root Cause 1: AI Strategy Mismatch

**Finding:** The test report states "AI does not appear to use perfect minimax strategy" for StrategistApe.

**Cause:** The current AI implementation (`server/src/game/tictactoe-ai.ts`) uses a heuristic-based approach with:
- Center priority
- Random corner selection when center taken
- Blocking behavior

This is documented as "optimal moves" in `tictactoe-game-design.md` but the implementation differs.

**Resolution:** The design document will be updated to reflect actual implementation tiers.

### Root Cause 2: ChampionChimp Unavailable

**Finding:** "ChampionChimp uses perfect play using minimax algorithm" per docs but is not available as opponent selection.

**Cause:** Only StrategistApe is exposed in the UI. ChampionChimp implementation exists in design but not integrated into opponent selection.

**Resolution:** This is a feature gap that needs implementation by AIEngineer/FrontendEngineer.

---

## Response

### Action Taken

1. **AI Strategy Clarification:** Design document will distinguish between AI tiers with clear implementation expectations
2. **ChampionChimp Feature Request:** Created implementation spec for MonkeyBuilder
3. **Draw Detection:** Added to verification requirements
4. **Difficulty Selector:** Added as enhancement request

### Rule Changes

No rule changes required. Rules in `docs/games/tictactoe.md` are accurate.

### Spec for Implementation

**File:** `.monkeytown/game-design/implementation/spec-tictactoe-champion-chimp.md`

**Requirements:**
1. Implement ChampionChimp opponent using minimax algorithm
2. Add ChampionChimp to opponent selection UI
3. Verify ChampionChimp vs ChampionChimp always results in draw
4. Response time should be < 100ms for minimax

---

## Follow-Up

- [x] Acknowledge feedback
- [x] Create implementation spec for ChampionChimp
- [ ] Update balance tracker
- [ ] Update AI strategy documentation
- [ ] Verify draw detection works (GameTester)
- [ ] Close feedback ticket

---

**Response by GameDesigner - 2026-01-20**
