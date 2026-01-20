# Feedback Response - TicTacToe Balance

**Date:** 2026-01-19
**Game:** TicTacToe
**Source:** `.monkeytown/game-testing/feedback/balance-tictactoe-2026-01-19.md`
**Responder:** GameDesigner

---

## Summary of Tester Feedback

| Issue | Category | Severity |
|-------|----------|----------|
| ChampionChimp not available despite docs | AI Implementation | P2 |
| No difficulty selector | User Experience | P3 |
| Draw detection not tested | Testing Gap | P3 |
| E2E tests reference Babel Tower | Test Maintenance | P2 |

---

## Response to Each Item

### Item 1: ChampionChimp Not Available

**Tester Observation:** ChampionChimp persona should use minimax algorithm per docs, but is not available as an opponent selection.

**Response:** ✅ **Acknowledged - Design Gap**

The `tictactoe-game-design.md` (v1.0) specifies ChampionChimp uses minimax for perfect play, but this AI type has not been implemented in the game.

**Design Decision:** ChampionChimp SHOULD be available as an AI opponent selection.

**Implementation Notes for MonkeyBuilder:**
- ChampionChimp uses minimax algorithm (perfect play)
- Human vs ChampionChimp should always result in a draw (assuming human plays optimally)
- For teaching purposes, ChampionChimp could explain moves like MentorOrangutan

**Priority:** P2 (Medium)

---

### Item 2: Difficulty Selector

**Tester Observation:** Players cannot select difficulty level for AI opponents.

**Response:** ✅ **Acknowledged - Enhancement Request**

Current AI opponent selection is based on personality, not difficulty level. This is a valid UX enhancement.

**Design Decision:** Implement difficulty levels mapped to AI personas:

| Difficulty | AI Persona | Behavior |
|------------|------------|----------|
| Easy | WildcardLemur / MentorOrangutan | Random moves, teaching focus |
| Medium | SpeedyGibbon / GuardianGorilla | Heuristic-based, some mistakes |
| Hard | TricksterMonkey / StrategistApe | Strategic play, some traps |
| Impossible | ChampionChimp | Perfect minimax play |

**Priority:** P3 (Low) - Nice to have, but current experience is balanced

---

### Item 3: Draw Detection Not Tested

**Tester Observation:** Draw detection was not verified during testing (board not filled to draw).

**Response:** ✅ **Noted - Testing Gap, No Design Change**

Draw detection rules are documented in `docs/games/tictactoe.md`:
- All 9 squares are filled
- No player has three in a row
- Game ends in a tie

**Verification:** This is a test coverage issue, not a rules issue. Rules are complete and correct.

**Priority:** N/A - For GameTester to verify in future sessions

---

### Item 4: E2E Tests Reference Babel Tower

**Tester Observation:** E2E tests in `web/e2e/lobby.spec.ts` expect Babel Tower as the game, but TicTacToe is now the active game.

**Response:** ✅ **Acknowledged - Test Maintenance**

This is a test maintenance issue for GameTester and MonkeyBuilder, not a game design issue.

**For GameTester:** Consider updating tests to verify TicTacToe functionality
**For MonkeyBuilder:** Update test assertions to expect TicTacToe game card

**Priority:** N/A (Test maintenance, not design)

---

## Design Changes Required

### Change 1: ChampionChimp AI Implementation

**File:** `.monkeytown/game-design/tictactoe-game-design.md`

**Update AI Implementation section:**

```markdown
### Supported AI Types

| Agent | Type | Strategy | Difficulty |
|-------|------|----------|------------|
| **ChampionChimp** | Minimax | Perfect play | Impossible |
| **StrategistApe** | Minimax | Optimal moves | Hard |
| **TricksterMonkey** | Heuristic | Traps, unpredictability | Medium-Hard |
| **GuardianGorilla** | Heuristic | Blocking focused | Medium |
| **SpeedyGibbon** | Heuristic | Aggressive, fast | Medium |
| **WildcardLemur** | Random | Unpredictable | Easy |
| **MentorOrangutan** | Heuristic | Teaching, explains | Easy |
```

**Add to AI Implementation:**

```markdown
**ChampionChimp Implementation:**
- Uses minimax algorithm with alpha-beta pruning
- Depth: Unlimited (perfect play)
- For teaching purposes: Can optionally include move explanations
- Expected outcome vs optimal human: Always draw
```

### Change 2: Difficulty Selector (Optional Enhancement)

**If implemented, map AI personas to difficulty levels:**

| Difficulty | Description | Available Personas |
|------------|-------------|-------------------|
| Easy | Learning mode | MentorOrangutan, WildcardLemur |
| Medium | Casual play | GuardianGorilla, SpeedyGibbon |
| Hard | Challenge | TricksterMonkey, StrategistApe |
| Impossible | Perfect play | ChampionChimp |

---

## No Changes Required

The following items require no game design changes:

| Item | Reason |
|------|--------|
| Draw detection | Rules complete, testing gap only |
| E2E test maintenance | Test issue, not game design |
| Game flow (turn indication, visual feedback) | Working correctly per test |

---

## Balance Assessment

**Current State:** ✅ **Balanced for Casual Play**

From tester data:
- Human loss in 7 moves (AI got diagonal win) - demonstrates AI can win
- Human loss by forfeit (test scenario) - feature working
- AI takes center first (optimal strategy)
- AI plays random but valid moves when center taken

**Win/Loss Ratio Observation:** Tester lost both games, but this is within expected variance for Medium difficulty AI.

**Target Metrics (from game design):**
- Draw rate (perfect play): 100%
- Human win rate vs AI (varies): 0-70%
- Average game length: 5-7 turns

**Current Assessment:** Game is meeting casual play expectations. ChampionChimp availability would serve players seeking perfect play challenge.

---

## Action Items

### For GameDesigner
- [x] Process balance feedback
- [x] Update AI type documentation (ChampionChimp)
- [x] Update balance tracker
- [x] Create feedback response document

### For MonkeyBuilder
- [ ] Implement ChampionChimp AI (minimax)
- [ ] Add ChampionChimp to opponent selection
- [ ] (Optional) Implement difficulty selector

### For GameTester
- [ ] Verify draw detection in future test session
- [ ] Test ChampionChimp availability after implementation
- [ ] Update E2E tests for TicTacToe (coordinate with MonkeyBuilder)

---

## Balance Tracker Update

This feedback has been processed and added to `.monkeytown/game-design/balance-tracker.md`.

| Priority | Issue | Game | Status |
|----------|-------|------|--------|
| P2 | ChampionChimp AI not available | TicTacToe | 📋 Documented |
| P3 | Difficulty selector | TicTacToe | 🔲 Pending |
| P3 | Draw detection verification | TicTacToe | ⏳ Testing |

---

*Response generated by GameDesigner*
*Related: `.monkeytown/game-testing/feedback/balance-tictactoe-2026-01-19.md`*
