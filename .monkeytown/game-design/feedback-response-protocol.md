# Feedback Response Protocol

Process for responding to GameTester agent feedback and improving games.

---

## Feedback Categories

### 🐛 Bug Reports

**Format:**
```
File: .monkeytown/game-testing/bugs/[game]-[YYYY-MM-DD]-[index].md
```

**Required Fields:**
- Title: Brief bug summary
- Severity: Critical / High / Medium / Low
- Reproduction: Step-by-step instructions
- Expected: What should happen
- Actual: What actually happens
- Environment: Browser, device, game state
- Screenshots: If applicable

**Response Timeline:**
| Severity | Response By | Fix Target |
|----------|-------------|------------|
| Critical | 24 hours | 48 hours |
| High | 48 hours | 1 week |
| Medium | 1 week | 2 weeks |
| Low | 2 weeks | Next cycle |

---

### ⚖️ Balance Feedback

**Format:**
```
File: .monkeytown/game-testing/balance/[game]-[YYYY-MM-DD]-[index].md
```

**Required Fields:**
- Metric: What was measured
- Target: Expected value
- Actual: Measured value
- Deviation: % from target
- Impact: Player experience effect
- Recommendation: Suggested fix

**Metrics to Track:**
- Win rate distribution (should be balanced)
- Game length (should match target)
- Feature usage (should be reasonable)
- Player satisfaction scores

---

### 📝 Gameplay Feedback

**Format:**
```
File: .monkeytown/game-testing/feedback/[game]-[YYYY-MM-DD]-[index].md
```

**Required Fields:**
- Category: Rules / UI / Mechanics / Tutorial / Other
- Summary: Brief description
- Details: Full explanation
- Player Impact: How it affects experience
- Frequency: How often reported

---

### ✅ Test Reports

**Format:**
```
File: .monkeytown/game-testing/test-reports/[game]-[YYYY-MM-DD].md
```

**Required Fields:**
- Test Date
- Tester Agent
- Games Played
- Duration
- AI Opponents Tested
- Results Summary
- Issues Found
- Recommendations

---

## Response Workflow

```
┌─────────────────────────────────────────────────────────┐
│                    GAME TESTER                          │
│            Reports issue to designated folder           │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│                   GAME DESIGNER                         │
│         Reads feedback, categorizes, prioritizes        │
└─────────────────────┬───────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│   DESIGN FIX    │     │   NO ACTION     │
│   REQUIRED      │     │   NEEDED        │
└───────┬─────────┘     └─────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────┐
│            1. ACKNOWLEDGE FEEDBACK                      │
│            Response file in game-design/responses/      │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│            2. ANALYZE ROOT CAUSE                        │
│            Document findings                            │
└─────────────────────┬───────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│   RULE CHANGE   │     │   CLARIFICATION │
│   NEEDED        │     │   NEEDED        │
└───────┬─────────┘     └───────┬─────────┘
        │                       │
        ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│ Update rules    │     │ Update tutorial │
│ in docs/games/  │     │ in in-game-     │
│                 │     │ tutorials.md    │
└───────┬─────────┘     └───────┬─────────┘
        │                       │
        └───────────┬───────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────┐
│            3. SPECIFY CHANGES                           │
│            Write spec for MonkeyBuilder                 │
│            (see Spec Structure below)                   │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│            4. UPDATE TRACKER                            │
│            Log issue in balance-tracker.md              │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────┐
│            5. VERIFY FIX                                │
│            Wait for GameTester verification             │
└─────────────────────────────────────────────────────────┘
```

---

## Response Template

```markdown
# Feedback Response: [Title]

**Feedback File:** `.monkeytown/game-testing/[category]/[file].md`
**Response Date:** YYYY-MM-DD
**Response By:** GameDesigner

## Summary

[Brief restatement of the feedback]

## Classification

- **Category:** Bug / Balance / Gameplay / Rules / Other
- **Priority:** P1 / P2 / P3 / P4
- **Status:** Acknowledged / Investigating / Resolved / No Action

## Analysis

[Root cause analysis - why is this happening?]

## Response

### Action Taken

[What will be done - or why no action is needed]

### Rule Changes (if applicable)

[Link to updated rules in docs/games/]

### Spec for Implementation (if applicable)

[Link to MonkeyBuilder spec]

## Follow-Up

- [ ] Update game rules documentation
- [ ] Update in-game tutorial (if needed)
- [ ] Update balance tracker
- [ ] Verify fix with GameTester
- [ ] Close feedback ticket

---

*Response by GameDesigner - [YYYY-MM-DD]*
```

---

## Spec Structure for MonkeyBuilder

When GameDesigner requests implementation changes:

```markdown
# Implementation Spec: [Title]

## Overview

[Brief description of what needs to be built/changed]

## Game

[ babel-tower | word-builder | chess ]

## Type

[ bug-fix | rule-change | new-feature | balance-tweak | tutorial-update ]

## Requirements

1. [Specific, testable requirement]
2. [Specific, testable requirement]
3. [Specific, testable requirement]

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Testing Notes

[How to verify the fix works]

## Related Files

- Rules: `docs/games/[game].md`
- Design: `.monkeytown/game-design/[document].md`
- Test: `.monkeytown/game-testing/[feedback-file].md`
```

---

## Priority Levels

| Priority | Definition | Example |
|----------|------------|---------|
| **P1** | Game-breaking, blocks play | Crash on move, impossible to win |
| **P2** | Major issue, significant impact | Scoring error, broken rule |
| **P3** | Minor issue, moderate impact | UI confusion, slow pacing |
| **P4** | Enhancement, low impact | Nice-to-have feature |

---

## Escalation Path

1. **GameDesigner** handles all feedback
2. **P1 issues** get immediate attention
3. **Repeated issues** get prioritized higher
4. **Controversial changes** documented with both perspectives

---

*GameDesigner - Making games fun, fair, and understandable* 🎲
