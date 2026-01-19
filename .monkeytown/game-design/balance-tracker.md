# Game Balance Tracker

Track balance issues, player feedback, and planned improvements for each game.

---

## Tic-Tac-Toe

### Balance Status: ✅ VERIFIED - PLAYABLE

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Draw rate with optimal play | 100% | ~80-90% | ✅ Within range |
| First-move advantage | 55-65% | ~60% | ✅ Within range |
| Average game length | 5-9 moves | 5-7 moves | ✅ Within range |
| AI win rate vs humans | 40-50% | Varies by AI | ✅ Varies by opponent |

### Known Considerations
- With perfect play, game always ends in draw
- First player (X) has slight advantage if opponent makes mistakes
- Different AI opponents provide varied difficulty levels
- ChampionChimp uses minimax for perfect play (draws with optimal human)

### Action Items
- [x] Rules documented in docs/games/tictactoe.md
- [x] In-game tutorial spec created
- [x] All 7 AI personalities implemented with distinct strategies
- [ ] Collect win rate data by AI opponent
- [ ] Monitor for player frustration with unavoidable draws

### AI Opponent Balance

| AI Agent | Strategy | Expected Win Rate | Notes |
|----------|----------|-------------------|-------|
| 🎭 TricksterMonkey | Unpredictable | 35-45% | Trap-setting, can be beaten |
| 🧩 StrategistApe | Optimal play | 40-50% | Blocks and attacks strategically |
| ⚡ SpeedyGibbon | Aggressive | 30-40% | Quick moves, may make mistakes |
| 🛡️ GuardianGorilla | Defensive | 35-45% | Focuses on blocking |
| 🃏 WildcardLemur | Random | 25-40% | Highly variable performance |
| 📚 MentorOrangutan | Teaching | 20-35% | Explains moves, less competitive |
| 🏆 ChampionChimp | Minimax | 45-55% | Near-perfect play, most challenging |

---

## Babel Tower

### Balance Status: ✅ VERIFIED

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

### Action Items
- [ ] Collect win rate data from initial playtests
- [ ] Monitor for "snowball effect" where early leaders dominate
- [ ] Track frequency of all 7 tiles bonus usage
- [x] **UI Fix Required:** Add suit indicators to cards (reported 2026-01-18)
- [x] **UI Fix Required:** Display round multiplier in UI (reported 2026-01-18)
- [x] **UI Fix Required:** Add special action tooltips/highlighting (reported 2026-01-18)
- [x] **Clarification:** Timer is 60s as documented, display shows elapsed time

---

## Word Builder

### Balance Status: ✅ VERIFIED

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

### Action Items
- [ ] Monitor if tile distribution feels fair
- [ ] Track challenge abuse (challenging valid words)
- [ ] Collect data on most-played word lengths

---

## Chess

### Balance Status: ✅ VERIFIED

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

### Action Items
- [ ] Monitor AI opponent ELO appropriateness
- [ ] Track draw rates vs checkmate rates
- [ ] Collect data on opening preferences

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
| P2 | UI: Missing suit indicators | Babel Tower | 🔧 Spec Created |
| P2 | UI: Round multiplier not visible | Babel Tower | 🔧 Spec Created |
| P2 | UI: Special action tooltips missing | Babel Tower | 🔧 Spec Created |
| P2 | Clarify: Timer displays remaining time | Babel Tower | ✅ Documented |
| P1 | Navigation bug: All games route to Babel Tower | All | ⏳ Blocked |
| P1 | None reported | - | ✅ Awaiting data |

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
