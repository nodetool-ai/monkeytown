# Monkeytown Quality Gates

**ChaosTester | Definition of "Working"**

---

## 1. Core Gates (Must Pass)

### GATE-001: All Unit Tests Pass

**Criteria**: `npm test` exits with code 0
**Current Status**: 52 tests passing
**Failure**: Test regression, assertion failure

### GATE-002: TypeScript Compilation

**Criteria**: `tsc --noEmit` completes without errors
**Mode**: Strict mode enabled
**Failure**: Type error, implicit any

### GATE-003: Browser Chaos Tests Pass

**Criteria**: All Playwright chaos scenarios pass
**Tools**: Playwright MCP
**Failure**: Recovery failure, crash, data corruption

### GATE-004: Error States Render

**Criteria**: ErrorCard and Error overlay display correctly
**Test**: Inject error state, verify UI
**Failure**: Blank screen, unhandled error

---

## 2. Performance Gates

### GATE-010: Initial Render < 500ms

**Metric**: Time to first meaningful paint
**Device**: Standard laptop (M1/Intel equivalent)
**Failure**: Blank screen > 500ms

### GATE-011: 60fps Animation

**Metric**: Frame rate during entity breathing
**Tool**: Chrome DevTools Performance
**Threshold**: No dropped frames during 10s observation

### GATE-012: 100 Entities < 2s

**Metric**: Render time with 100 entities
**Failure**: > 2s render time

### GATE-013: Memory Stability

**Metric**: Heap size over 60s idle
**Threshold**: No > 20% growth
**Failure**: Memory leak detected

---

## 3. Reliability Gates

### GATE-020: WebSocket Resilience

**Test**: Force disconnect, verify reconnection
**Expected**: Auto-reconnect within 5s
**Failure**: Manual refresh required

### GATE-021: Fallback Timer

**Test**: WebSocket disconnected
**Expected**: Metrics continue updating every 3s
**Failure**: Metrics freeze

### GATE-022: Error Recovery

**Test**: Trigger error, dismiss error
**Expected**: System returns to normal
**Failure**: Persistent error state

### GATE-023: State Consistency

**Test**: Rapid state updates (50+ ops)
**Expected**: Final state matches expected
**Failure**: Data corruption, inconsistent counts

### GATE-024: No Duplicate React Keys

**Test**: Monitor console during state updates
**Expected**: No "duplicate key" warnings
**Failure**: React key collision detected

---

## 4. Visual Gates

### GATE-030: Color Contrast 4.5:1

**Tool**: axe-core
**Standard**: WCAG AA
**Failure**: Unreadable text

### GATE-031: No Layout Shift

**Metric**: Cumulative Layout Shift (CLS)
**Threshold**: < 0.1
**Failure**: Elements jumping during load

### GATE-032: Status Colors Visible

**Test**: All 5 entity statuses visible
**Expected**: Distinct colors for each status
**Failure**: Ambiguous status indication

### GATE-033: Animation Smoothness

**Test**: Observe breathing, pulse, flow animations
**Expected**: No stuttering, consistent timing
**Failure**: Choppy animation

---

## 5. Interaction Gates

### GATE-040: Click Targets > 44px

**Tool**: Chrome DevTools
**Standard**: Mobile touch targets
**Failure**: Unintentional misclicks

### GATE-041: Keyboard Navigation Complete

**Test**: Tab through all interactive elements
**Expected**: Focus order logical, visible focus ring
**Failure**: Unreachable element, lost focus

### GATE-042: Seed Rate Limit

**Test**: Rapid seed planting attempts
**Expected**: Button disables at 5 pending
**Failure**: No limit, system overwhelmed

### GATE-043: Panel Close Works

**Test**: Open detail panel, close via all methods
**Expected**: ESC, backdrop click, X button all work
**Failure**: Panel won't close

---

## 6. Data Gates

### GATE-050: Metrics Accuracy

**Test**: Compare displayed metrics to source
**Expected**: 1:1 match
**Failure**: Displayed value differs from source

### GATE-051: History Preservation

**Test**: Complete entities, verify in ghost column
**Expected**: All completed entities appear
**Failure**: Lost entity data

### GATE-052: Restore Functionality

**Test**: Restore from ghost column
**Expected**: Entity returns to active state
**Failure**: Restore fails, entity lost

### GATE-053: Flow Completion

**Test**: Watch flow go from pending → complete
**Expected**: All status transitions visible
**Failure**: Stuck in intermediate state

---

## 7. Chaos Gates

### GATE-060: No Crash on Invalid Data

**Test**: Inject malformed WebSocket messages
**Expected**: Error caught, displayed, no crash
**Failure**: Application crash

### GATE-061: Graceful Degradation

**Test**: Generate 200+ entities
**Expected**: Scroll works, renders, no freeze
**Failure**: Browser hang

### GATE-062: Network Recovery

**Test**: Throttle network, restore, observe
**Expected**: Reconnection, state sync
**Failure**: Data loss, stuck loading

### GATE-063: Memory Pressure Survival

**Test**: Generate entities for 60s, monitor memory
**Expected**: GC keeps heap stable
**Failure**: Uncontrolled memory growth

---

## 8. Accessibility Gates

### GATE-070: Screen Reader Support

**Test**: Navigate with NVDA/VoiceOver
**Expected**: All content announced
**Failure**: Missing announcements

### GATE-071: Focus Management

**Test**: Open/close modals, panels
**Expected**: Focus trapped appropriately, returns on close
**Failure**: Focus lost, focus escape

### GATE-072: Color Not Only Meaning

**Test**: Inspect status indicators
**Expected**: Text/icon backup for color
**Failure**: Color-only status

---

## 9. Build Gates

### GATE-080: Production Build Success

**Command**: `npm run build`
**Expected**: No errors, bundle generated
**Failure**: Build error, missing output

### GATE-081: Bundle Size < 500KB

**Metric**: Compressed JavaScript bundle
**Threshold**: < 500KB
**Failure**: Excessive bundle size

### GATE-082: No External CDN Links

**Test**: Inspect built files
**Expected**: All dependencies bundled
**Failure**: Runtime CDN dependency

---

## 10. Self-Sustaining Gates

### GATE-090: No Human Required for Testing

**Test**: Full test suite runs autonomously
**Expected**: No manual steps
**Failure**: Requires human intervention

### GATE-091: Results Documented

**Test**: After test run
**Expected**: Results written to `.monkeytown/qa/test-results.md`
**Failure**: Missing documentation

### GATE-092: Failures Tracked

**Test**: When any gate fails
**Expected**: Entry in `.monkeytown/qa/failure-modes.md`
**Failure**: Untracked failures

---

## Gate Execution

```bash
# Run all gates
npm test && npm run build && npx playwright test --project=chaos

# Quick check (unit tests only)
npm test

# Full chaos suite
npx playwright test chaos/
```

---

*Passing all gates is the minimum. Surviving chaos is the goal.*
