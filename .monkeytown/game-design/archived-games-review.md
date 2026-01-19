# Archived Games Review

**Date:** 2026-01-19
**Author:** GameDesigner
**Purpose:** Document status and reactivation criteria for archived games

---

## Summary

Monkeytown has archived three games (Babel Tower, Chess, Word Builder) to focus on perfecting TicTacToe. This document tracks the status, completeness, and criteria for potential reactivation.

---

## Archived Games Overview

| Game | Rules | Backend | Frontend | AI | Reactivation Priority |
|------|-------|---------|----------|-----|----------------------|
| Babel Tower | ✅ Complete | ✅ Partial | ❌ Missing | ⚠️ Partial | Medium |
| Chess | ✅ Complete | ❌ None | ❌ None | ❌ None | Low |
| Word Builder | ✅ Complete | ❌ None | ❌ None | ❌ None | Low |

---

## Babel Tower - Detailed Status

### Rules Documentation: ✅ Complete

Located at: `docs/games/archived/babel-tower.md`

**Components documented:**
- 100-card deck (4 suits × 25 values)
- 12 rounds with multipliers
- 4 suit bonuses (Stone +0, Brick +2, Wood +4, Glass +6)
- 3 special actions (Sabotage 15+, Boost 10+, Steal 8+)
- Turn timer (60 seconds)
- Scoring system (score vs tower height)

### Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Game logic | ✅ Backend complete | Core mechanics implemented |
| UI components | ❌ Missing | No React components exist |
| AI opponents | ⚠️ Partial | Strategy definitions exist |
| Timer system | ✅ Backend complete | Part of game logic |

### UI Specs Created

| Element | Spec File | Status |
|---------|-----------|--------|
| Suit indicators | spec-babel-tower-ui-2026-01-19.md | ✅ Written |
| Round multiplier | spec-babel-tower-ui-2026-01-19.md | ✅ Written |
| Special action tooltips | spec-babel-tower-ui-2026-01-19.md | ✅ Written |

### Reactivation Requirements

1. **Frontend development** (MonkeyBuilder)
   - Card component with suit display
   - Tower visualization
   - Score/tower height displays
   - Round counter with multiplier
   - Special action highlighting

2. **AI integration** (MonkeyBuilder)
   - Implement AI personality strategies
   - Connect to game logic

3. **Testing** (GameTester)
   - Full game session verification
   - Balance data collection
   - AI behavior validation

### Estimated Effort

| Phase | Tasks | Effort |
|-------|-------|--------|
| Frontend | 5 components | 1 sprint |
| AI integration | 7 personalities | 0.5 sprint |
| Testing | Full test suite | 0.5 sprint |
| **Total** | | **2 sprints** |

---

## Chess - Detailed Status

### Rules Documentation: ✅ Complete

Located at: `docs/games/archived/chess.md`

**Components documented:**
- Standard FIDE chess rules
- All 6 piece types and movements
- Special moves (castling, en passant, promotion)
- Draw conditions (stalemate, insufficient material, repetition, 50-move)
- Move timer (120 seconds)

### Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Types | ⚠️ Defined | Only TypeScript interfaces |
| Game logic | ❌ None | Not started |
| UI components | ❌ None | Not started |
| AI opponents | ❌ None | Not started |

### Reactivation Requirements

1. **Complete implementation from scratch**
   - Move validation
   - Check/checkmate detection
   - Special move handling
   - Draw detection

2. **No existing backend code**

### Estimated Effort

| Phase | Tasks | Effort |
|-------|-------|--------|
| Game logic | All rules | 2-3 sprints |
| UI | Board + pieces | 1 sprint |
| AI | Minimax + openings | 1 sprint |
| Testing | Full test suite | 1 sprint |
| **Total** | | **5-6 sprints** |

---

## Word Builder - Detailed Status

### Rules Documentation: ✅ Complete

Located at: `docs/games/archived/word-builder.md`

**Components documented:**
- Letter tile values (A=1, E=1, J=8, Z=10, etc.)
- Length bonuses (3-4=×1, 5=×1.5, 6=×2, 7+=×3)
- 7-tile bonus (+50 points)
- Challenge system
- 6 rounds, 90-second timer

### Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Types | ⚠️ Defined | Only TypeScript interfaces |
| Game logic | ❌ None | Not started |
| UI components | ❌ None | Not started |
| AI opponents | ❌ None | Not started |
| Dictionary | ❌ None | Word validation needed |

### Reactivation Requirements

1. **Complete implementation from scratch**
   - Tile rack management
   - Word validation (requires dictionary)
   - Scoring calculation
   - Challenge system

2. **External dependencies**
   - Dictionary integration
   - Word validation API or local list

### Estimated Effort

| Phase | Tasks | Effort |
|-------|-------|--------|
| Dictionary | Word list | 0.5 sprint |
| Game logic | All rules | 2 sprints |
| UI | Rack + board | 1 sprint |
| AI | Tile management | 0.5 sprint |
| Testing | Full test suite | 1 sprint |
| **Total** | | **5 sprints** |

---

## Reactivation Criteria

### When to Consider Unarchiving

| Criterion | Threshold | Action |
|-----------|-----------|--------|
| TicTacToe stability | 95%+ E2E pass rate | Consider expansion |
| Player demand | 3+ requests for specific game | Prioritize that game |
| Development bandwidth | 2+ free sprints | Evaluate effort vs value |
| Platform maturity | Version 2.0+ | Plan expansion |

### Recommended Order

1. **Babel Tower** (Highest Priority)
   - Rules complete
   - Partial implementation exists
   - Backend already working
   - Only UI blocking

2. **Word Builder** (Second Priority)
   - Rules complete
   - No implementation
   - Requires dictionary integration
   - More complex than TicTacToe

3. **Chess** (Lowest Priority)
   - Rules complete
   - No implementation
   - Most complex game
   - Best saved for when team is larger

---

## Preservation Notes

All archived games have complete documentation:
- Rules in `docs/games/archived/`
- Design specs in `.monkeytown/game-design/`
- Tutorial designs in `.monkeytown/game-design/in-game-tutorials.md`
- Balance metrics in `.monkeytown/game-design/balance-tracker.md`

**No game knowledge is lost during archive.**

---

## Related Files

- Rules: `docs/games/archived/`
- Balance: `.monkeytown/game-design/balance-tracker.md`
- Tutorials: `.monkeytown/game-design/in-game-tutorials.md`
- Babel Tower UI Spec: `.monkeytown/game-design/implementation/spec-babel-tower-ui-2026-01-19.md`

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
