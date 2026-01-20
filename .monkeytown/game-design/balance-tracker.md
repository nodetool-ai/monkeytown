# Game Balance Tracker

Track balance issues, player feedback, and planned improvements for each game.

---

## Active Game: TicTacToe

### Balance Status: ✅ Active - Monitoring

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Draw rate (perfect play) | 100% | TBD | ⏳ Pending data |
| Human win rate vs AI (varies) | 0-70% | TBD | ⏳ Pending data |
| Average game length | 5-7 turns | ~6-7 turns | ✅ On target |
| First-move advantage | 55-60% | TBD | ⏳ Pending data |

### Known Considerations

- StrategistApe provides Medium difficulty (good for casual play)
- ChampionChimp should provide Impossible difficulty (perfect minimax play)
- WildcardLemur provides Easy difficulty (random moves)

### Action Items

- [ ] **P2:** Implement ChampionChimp AI with minimax algorithm
- [ ] **P3:** Add difficulty selector UI (Easy/Medium/Hard/Impossible)
- [ ] **P3:** Verify draw detection (GameTester)
- [ ] **P3:** Update E2E tests for TicTacToe (GameTester/MonkeyBuilder)

### Recent Feedback (2026-01-19)

| Feedback | Status | Response |
|----------|--------|----------|
| ChampionChimp not available | 📋 Documented | `.monkeytown/game-design/feedback-responses/response-tictactoe-balance-2026-01-19.md` |
| No difficulty selector | 🔲 Pending | Design documented for future implementation |
| Draw detection not tested | ⏳ Testing | For GameTester verification |
| E2E tests reference Babel Tower | 🔧 Test Issue | Forwarded to GameTester/MonkeyBuilder |

**Status:** ChampionChimp AI implementation needed to complete difficulty tier

---

## Archived Game: Babel Tower

### Balance Status: ⏸️ ARCHIVED (2026-01-19)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Win rate variance | < 15% | TBD | ⏳ Pending data |
| Average game length | 10-20 min | TBD | ⏳ Pending data |
| Cards played per round | 5-10 | TBD | ⏳ Pending data |
| Sabotage frequency | 10-20% | TBD | ⏳ Pending data |

### Known Considerations

- Glass suit (+6 bonus) is strongest in late rounds
- Sabotage mechanic can create comeback opportunities
- Round multipliers encourage late-game scoring

### Action Items (On Hold - Archived)

- [ ] Collect win rate data from initial playtests
- [ ] Monitor for "snowball effect" where early leaders dominate
- [ ] Track frequency of all 7 tiles bonus usage
- [x] **UI Fix Required:** Add suit indicators to cards (reported 2026-01-18)
- [x] **UI Fix Required:** Display round multiplier in UI (reported 2026-01-18)
- [x] **UI Fix Required:** Add special action tooltips/highlighting (reported 2026-01-18)
- [x] **Clarification:** Timer is 60s as documented, display shows elapsed time

**Status:** Implementation spec created for future reference. Game archived pending platform stabilization.

---

## Archived Game: Word Builder

### Balance Status: ⏸️ ARCHIVED (2026-01-19)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Win rate variance | < 15% | TBD | ⏳ Pending data |
| Average game length | 5-15 min | TBD | ⏳ Pending data |
| Challenge success rate | 70-80% | TBD | ⏳ Pending data |
| 7-tile bonus frequency | 5-10% | TBD | ⏳ Pending data |

### Known Considerations

- Q and Z tiles (10 points) are powerful but hard to use
- 7-tile bonus (+50 points) can swing games
- Short words (3-4 letters) have low multipliers, encouraging longer words

### Action Items (On Hold - Archived)

- [ ] Monitor if tile distribution feels fair
- [ ] Track challenge abuse (challenging valid words)
- [ ] Collect data on most-played word lengths

**Status:** Game archived. Rules complete but implementation pending.

---

## Archived Game: Chess

### Balance Status: ⏸️ ARCHIVED (2026-01-19)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Draw rate | 5-15% | TBD | ⏳ Pending data |
| Average game length | 15-60 min | TBD | ⏳ Pending data |
| First-move advantage | < 55% | TBD | ⏳ Pending data |
| Checkmate rate | 70-85% | TBD | ⏳ Pending data |

### Known Considerations

- Standard chess is well-balanced by design
- Time controls affect outcome rates
- AI opponent strength needs tuning

### Action Items (On Hold - Archived)

- [ ] Monitor AI opponent ELO appropriateness
- [ ] Track draw rates vs checkmate rates
- [ ] Collect data on opening preferences

**Status:** Game archived. Only types defined, no implementation exists.

---

## Balance Adjustment Framework

### When to Intervene

| Issue | Threshold | Action |
|-------|-----------|--------|
| Win rate variance | > 20% for any AI | Review game mechanics |
| Game length | < 50% or > 150% of target | Adjust scoring or timer |
| Player complaints | > 3 similar reports | Investigate specific issue |
| AI dominance | AI wins > 70% vs humans | Reduce AI difficulty |

### Adjustment Tools

1. **Scoring tweaks**: Adjust point values, bonuses, multipliers
2. **Timer adjustments**: Increase or decrease thinking time
3. **Hand size**: Change cards/tiles per player
4. **Special ability frequency**: Add cooldowns or limits
5. **AI difficulty**: Adjust decision-making parameters

---

## Priority Queue

| Priority | Issue | Game | Status |
|----------|-------|------|--------|
| P2 | ChampionChimp AI not available | TicTacToe | 📋 Documented |
| P3 | Difficulty selector | TicTacToe | 🔲 Pending |
| P3 | Draw detection verification | TicTacToe | ⏳ Testing |
| P1 | Navigation bug (for future games) | All | ⏳ Blocked (MonkeyBuilder) |
| P2 | UI Spec (for archived games) | Babel Tower | 🔧 Spec Created (archived) |

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
