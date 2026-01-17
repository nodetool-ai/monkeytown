# ChaosTester Browser Chaos Tests

**ChaosTester** | `browser-chaos-tests.md` | Playwright MCP Test Procedures

---

## Purpose

This document defines browser-based chaos tests using Playwright MCP to discover runtime bugs that unit tests miss.

---

## Test BC-001: Rapid State Transition Chaos

**Objective**: Trigger duplicate key collisions during rapid state changes.

### Procedure
1. Open http://localhost:5173
2. Open browser console (DevTools)
3. Wait 30 seconds observing console for warnings
4. Click entities rapidly while state changes
5. Click "plant something" button during state transitions

### Pass Criteria
- 0 React "duplicate key" warnings

### Fail Criteria
- Any "Encountered two children with the same key" warning

### Actual Result
**FAIL** - 14+ warnings in 30 seconds

---

## Test BC-002: Keyboard Navigation Accessibility

**Objective**: Verify visible focus indicators on all interactive elements.

### Procedure
1. Open http://localhost:5173
2. Press Tab key repeatedly
3. Observe if focus indicator is visible on each element

### Pass Criteria
- Visible focus ring/outline on each interactive element
- Tab order follows visual layout

### Fail Criteria
- No visible focus indicator
- Focus jumps unexpectedly

### Actual Result
**FAIL** - No visible focus indicator on tab focus

---

## Test BC-003: Focus Orphan Detection

**Objective**: Verify focus state is cleared when focused entity completes.

### Procedure
1. Open http://localhost:5173
2. Click an entity (ChaosArchitect or similar)
3. Observe detail panel opens
4. Wait for entity status to change to 'complete' (moves to ghost column)
5. Observe if focus state is cleared

### Pass Criteria
- Detail panel closes when focused entity completes
- No orphaned focus state

### Fail Criteria
- Detail panel remains open or shows error
- Focus indicator on non-existent entity

### Actual Result
**FAIL** - Focus state becomes orphaned

---

## Test BC-004: Modal Interaction Chaos

**Objective**: Test modal behavior during rapid state changes.

### Procedure
1. Open http://localhost:5173
2. Click "plant something" button
3. Click outside modal on canvas
4. Repeat 10 times rapidly
5. Check for errors

### Pass Criteria
- Modal opens and closes consistently
- No errors in console

### Actual Result
PASS - Modal behavior consistent

---

## Test BC-005: Click Competition Under Load

**Objective**: Test click handling during active state transitions.

### Procedure
1. Open http://localhost:5173
2. Click different entities in rapid succession
3. Observe which entity receives focus
4. Check console for errors

### Pass Criteria
- Last clicked entity receives focus
- No console errors

### Actual Result
Partial - Focus works but duplicate key warnings appear

---

## Console Monitoring Checklist

Run browser for 60 seconds, monitor console:

| Warning Type | Acceptable? | Actual Count |
|--------------|-------------|--------------|
| Duplicate keys | NO | 14+ |
| React warnings | Depends | 0 other |
| Errors | NO | 0 |

---

## Screenshot Evidence

All bugs captured in:
- `bug-discovery-duplicate-keys.png`

---

*Document Version: 1.0.0*
*ChaosTester | Browser Chaos Tests*
