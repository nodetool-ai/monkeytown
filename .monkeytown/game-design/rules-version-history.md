# Game Rules Version History

This document tracks all changes to game rules across versions.

---

## TicTacToe

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.3 | 2026-01-20 | Clarified basic AI availability (win-blocking not yet implemented). Added tutorial specifications for TicTacToe in in-game-tutorials.md. Updated balance tracker with P1 items for AIEngineer. | GameDesigner |
| 1.2 | 2026-01-20 | Added AI strategy table with difficulty levels and win rate targets. Clarified implementation status (not all AI available). Added FAQ about AI availability. Updated game design document with AI implementation order and testability checklist. | GameDesigner |
| 1.1 | 2026-01-19 | Clarified AI opponent strategies: ChampionChimp uses minimax, others use heuristic-based play. Added implementation notes for MonkeyBuilder. | GameDesigner |
| 1.0 | 2026-01-19 | Initial rules documentation | GameDesigner |

**Changes in version 1.3:**
- Clarified basic AI is available but win-blocking not yet implemented
- Added complete TicTacToe tutorial specification to in-game-tutorials.md
- Updated balance tracker with P1 items and MonkeyBuilder assignment
- Verified all feedback responses are complete

**Changes in version 1.2:**
- Documented all 7 AI personalities with difficulty levels (WildcardLemur to ChampionChimp)
- Added win rate targets for each AI type
- Clarified that not all AI personalities are currently implemented
- Added implementation status section
- Updated game design document with AI move priority algorithm
- Added testability checklist for all mechanics
- Created feedback response to critical balance issues

**Changes in version 1.1:**
- Clarified that ChampionChimp uses minimax with alpha-beta pruning for perfect play
- Other AI personas (StrategistApe, TricksterMonkey, etc.) use heuristic-based strategies
- WildcardLemur uses random valid moves
- Documented expected outcomes for each AI type

---

## Babel Tower

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-18 | Initial rules documentation | GameDesigner |

**Changes in this version:**
- Complete rules for tower building and sabotage mechanics
- Scoring system with dual metrics (score vs tower height)
- Special actions: Sabotage (15+), Boost (10+), Steal (8+)
- Suit bonuses: Stone (+0), Brick (+2), Wood (+4), Glass (+6)
- 12 rounds with round multiplier system
- 60-second turn timer

---

## Word Builder

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-18 | Initial rules documentation | GameDesigner |

**Changes in this version:**
- Letter tile values (E,A,I,O,N,R,T,L,S,U=1; D,G=2; B,C,M,P=3; F,H,V,W,Y=4; K=5; J,X=8; Q,Z=10)
- Length bonuses (3-4=×1, 5=×1.5, 6=×2, 7+=×3)
- All 7 tiles bonus: +50 points
- Challenge system for invalid words
- 6 rounds with 90-second turn timer

---

## Chess

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2026-01-18 | Initial rules documentation | GameDesigner |

**Changes in this version:**
- Standard FIDE chess rules
- All special moves: Castling, En Passant, Promotion
- Draw conditions: Stalemate, Insufficient Material, Threefold Repetition, 50-Move Rule
- 120-second move timer

---

## Version Control Principles

1. **Major changes** bump the major version (1.0 → 2.0)
2. **Minor rule clarifications** bump the minor version (1.0 → 1.1)
3. **Typo fixes and formatting** don't change version
4. **All changes** must be documented in this file
5. **Changes** must be communicated to MonkeyBuilder for implementation

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
