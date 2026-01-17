# ChaosTester Failure Modes

**ChaosTester** | `failure-modes.md` | Documented Ways Monkeytown Will Break

---

## The Purpose of This Document

Every system will fail. The question is whether failures are survivable, informative, and graceful.

This document catalogs known failure modes, their symptoms, their causes, and their acceptable outcomes. If a failure is not documented here, it is a bug. If it is documented, it is a feature.

---

## Category A: Rendering Failures

### A-1: Frame Drop Under Load

**Description**: FPS falls below 60 when rendering many entities.

**Cause**: React re-renders, animation frame scheduling, or DOM complexity.

**Trigger Conditions**:
- > 20 entities with active animations
- > 50 entities total
- Complex metrics display

**Symptoms**:
- Stuttering animations
- "Jumpy" entity cards
- Delayed visual feedback

**Acceptable Outcome**:
- Degraded performance is acceptable
- System remains responsive
- No crash or error state

**Mitigation**:
- Virtualize entity rendering (future)
- Reduce animation complexity (future)
- Limit visible entities (current: 50 max)

**Detection**:
```javascript
// Performance monitoring
let frameCount = 0;
let lastTime = performance.now();

function measureFPS() {
  frameCount++;
  const now = performance.now();
  if (now - lastTime >= 1000) {
    const fps = frameCount;
    if (fps < 55) {
      console.warn('Low FPS detected:', fps);
    }
    frameCount = 0;
    lastTime = now;
  }
}
requestAnimationFrame(measureFPS);
```

---

### A-2: Layout Shift on Entity Complete

**Description**: Cards jump when entities move to ghost column.

**Cause**: DOM reflow when removing element from active canvas.

**Trigger Conditions**:
- Entity status changes to "complete"
- Multiple entities complete in short window

**Symptoms**:
- Visual "jump" of remaining cards
- Disorienting for user tracking specific entity

**Acceptable Outcome**:
- Jump is acceptable but should be minimized
- No crash or data loss
- User can still track entities

**Mitigation**:
- CSS will-change property
- Animate removal rather than instant removal (future)

---

### A-3: Ghost Column Overflow

**Description**: Too many completed entities crowd the ghost column.

**Cause**: No limit on entities that can complete.

**Trigger Conditions**:
- > 50 entities complete within retention window
- User does not clear or restore history

**Symptoms**:
- Ghost column becomes unusable
- UI clutter
- Performance degradation in ghost column only

**Acceptable Outcome**:
- Visual degradation acceptable
- No crash
- Active canvas unaffected

**Mitigation**:
- Current: Slice to 50 items
- Future: Pagination or "show more" expansion

---

### A-4: Animation Timing Inconsistency

**Description**: Animations (breathe, pulse) fall out of sync.

**Cause**: React state updates during animation frames.

**Trigger Conditions**:
- Frequent entity updates
- Status transitions during active animation

**Symptoms**:
- Animation resets or stutters
- "Jumpy" breathing effect

**Acceptable Outcome**:
- Minor visual glitch acceptable
- No functional impact
- Animation continues eventually

---

## Category B: State Management Failures

### B-1: Race Condition in State Updates

**Description**: Rapid state updates cause lost updates or visual glitches.

**Cause**: React state batching and closure staleness.

**Trigger Conditions**:
- > 10 state updates in < 100ms
- Interleaved setEntities calls

**Symptoms**:
- Some updates lost
- "Flicker" between states
- Console warnings about state updates

**Acceptable Outcome**:
- Last-write-wins behavior acceptable
- No crash
- Eventually consistent

**Code Path**:
```typescript
// This pattern is vulnerable:
setEntities((prev) => { ... });  // Batch 1
setEntities((prev) => { ... });  // Batch 2
// React may batch these, may not
```

---

### B-2: Stale Closure in useEffect

**Description**: useEffect captures stale state, causes incorrect behavior.

**Cause**: Missing dependencies or improper dependency management.

**Trigger Conditions**:
- Complex useEffect chains
- State dependencies not listed

**Symptoms**:
- Metrics don't update correctly
- Interval callbacks use old values
- "Zombie" state persists

**Acceptable Outcome**:
- Incorrect display but no crash
- Eventually fixes on next render

**Detection**:
```typescript
// ESLint react-hooks/exhaustive-deps should catch this
useEffect(() => {
  doSomethingWith(entities); // If entities not in deps, warning
}, []); // Empty deps with state usage = BUG
```

---

### B-3: Duplicate Entity After Restore

**Description**: Restoring entity from ghost creates duplicate instead of moving.

**Cause**: `setEntities` appends rather than checking existence.

**Trigger Conditions**:
- Restore entity that still exists in active (edge case)
- Race between completion and restore

**Symptoms**:
- Two entities with same data
- Confusing for user
- May break ID-based lookups

**Acceptable Outcome**:
- Visual confusion but no crash
- Both entities functional

**Code Path**:
```typescript
// Current implementation allows duplicates
setEntities((prev) => [...prev, entity]);  // No ID check
```

---

### B-4: Focus Loss on Entity Removal

**Description**: Clicked entity disappears (completes), focus becomes orphaned.

**Cause**: Focused entity removed from active entities.

**Trigger Conditions**:
- User clicks entity
- Entity completes before user acts
- Focus state not cleared

**Symptoms**:
- Focus indicator on nothing
- Click on empty space doesn't clear focus
- Confusing UX

**Acceptable Outcome**:
- Visual confusion but no crash
- Click elsewhere clears focus

---

## Category C: Data Integrity Failures

### C-1: Duplicate Entity IDs

**Description**: Two entities with same ID render.

**Cause**: Data source produces duplicates or client-side ID collision.

**Trigger Conditions**:
- Backend produces duplicate IDs
- Client generates IDs without collision check

**Symptoms**:
- React key collision warnings
- Unpredictable rendering behavior
- Focus and click may target wrong entity

**Acceptable Outcome**:
- Console warning acceptable
- No crash
- User may see unexpected behavior

---

### C-2: Invalid Entity Status

**Description**: Entity has status not in EntityStatus union.

**Cause**: Backend sends invalid status or type assertion bypass.

**Trigger Conditions**:
- Backend schema mismatch
- TypeScript cast anywhere in pipeline

**Symptoms**:
- STATUS_CONFIG lookup returns undefined
- CSS variable `var(--status-color)` undefined
- Visual breakage (no color)

**Acceptable Outcome**:
- Visual breakage but no crash
- Defaults to some behavior (may be broken)

**Code Path**:
```typescript
// If status is 'invalid', this returns undefined:
const statusColor = COLORS[STATUS_CONFIG[entity.status]];
```

---

### C-3: Metric Values Out of Range

**Description**: Metrics (efficiency, load) exceed expected 0-100 range.

**Cause**: Backend sends values outside valid range.

**Trigger Conditions**:
- Backend calculation error
- Malformed data injection

**Symptoms**:
- Displays > 100% or negative numbers
- May break CSS layouts
- Confusing for user

**Acceptable Outcome**:
- Displays incorrect value but no crash
- No visual breakage (CSS handles numbers)

---

### C-4: Future Timestamp on Entity

**Description**: Entity has timestamp in the future.

**Cause**: Client clock drift or backend time issues.

**Trigger Conditions**:
- Client time wrong
- Timezone mismatch
- Backend clock issue

**Symptoms**:
- "Time elapsed" shows negative values
- Sorting by timestamp affected
- Ghost column aging behaves incorrectly

**Acceptable Outcome**:
- Confusing display but no crash
- Eventually fixes when time normalizes

---

## Category D: Network and Communication Failures

### D-1: WebSocket Disconnect

**Description**: Real-time connection lost.

**Cause**: Network issues, server restart, client sleep.

**Trigger Conditions**:
- Network instability
- Server restart
- Client goes offline

**Symptoms**:
- Real-time updates stop
- "Reconnecting" indicator appears
- Stale data displayed

**Acceptable Outcome**:
- Graceful degradation to polling
- User can still see last-known state
- Auto-reconnect with backoff

**Mitigation**:
- Fallback chain: WebSocket → SSE → Polling

---

### D-2: Event Storm Overload

**Description**: Too many events per second overwhelm client.

**Cause**: High agent activity or attack.

**Trigger Conditions**:
- > 100 events/second
- Single agent emitting rapidly
- Malicious event injection

**Symptoms**:
- Browser becomes unresponsive
- Memory grows
- Tab may crash

**Acceptable Outcome**:
- Client should throttle or drop events
- No browser crash
- Eventually recovers

**Mitigation**:
- Event rate limiting (future)
- Backpressure handling (future)

---

### D-3: Reconnection State Divergence

**Description**: After reconnect, client state differs from server.

**Cause**: Events missed during disconnect.

**Trigger Conditions**:
- Extended disconnect (> 30s)
- Message loss in fallback chain
- Clock skew

**Symptoms**:
- Missing entities
- Stale status values
- Confusing user experience

**Acceptable Outcome**:
- User sees partial state
- Can refresh for full state
- Ghost column provides canonical history

---

## Category E: Performance Degradation

### E-1: Memory Leak from Intervals

**Description**: setInterval not cleared on component unmount.

**Cause**: Missing cleanup in useEffect return.

**Trigger Conditions**:
- Component unmounted while interval running
- Multiple mount/unmount cycles

**Symptoms**:
- Memory grows over time
- Eventually tab crashes
- Performance degrades

**Acceptable Outcome**:
- Bug, not feature
- Should be fixed

**Detection**:
```typescript
useEffect(() => {
  const interval = setInterval(..., 1000);
  return () => clearInterval(interval);  // Must exist
}, []);
```

---

### E-2: React Re-render Cascade

**Description**: Parent re-render causes unnecessary child re-renders.

**Cause**: Missing React.memo or useMemo.

**Trigger Conditions**:
- Parent state changes
- Child components not memoized

**Symptoms**:
- Performance degrades with more entities
- Frame drops increase
- Battery drain on mobile

**Acceptable Outcome**:
- Degraded performance but no crash
- Eventually manageable with memoization

**Current State**:
- Some components memoized
- Room for optimization

---

### E-3: Bundle Size Creep

**Description**: Bundle grows beyond 200KB invariant.

**Cause**: New dependencies, large libraries, unoptimized code.

**Trigger Conditions**:
- New feature adds dependencies
- No bundle size monitoring

**Symptoms**:
- Longer load times
- Higher memory usage
- May exceed invariant

**Acceptable Outcome**:
- Performance degradation
- May trigger architecture review

**Detection**:
```bash
npm run build -- --analyze
```

---

## Category F: Security Failures

### F-1: XSS via Entity Label

**Description**: Malicious script injected via entity label.

**Cause**: Unsanitized user input in entity labels.

**Trigger Conditions**:
- Backend accepts arbitrary labels
- React doesn't escape (it does by default)

**Symptoms**:
- Script execution in witness context
- Data theft possible
- Session hijacking

**Acceptable Outcome**:
- Should not happen (React escapes by default)
- If happens: CRITICAL BUG

**Mitigation**:
- React escapes by default
- CSP headers
- Input sanitization on backend

---

### F-2: Information Disclosure in Metrics

**Description**: Sensitive data visible in metrics display.

**Cause**: Metrics object includes sensitive fields.

**Trigger Conditions**:
- Backend includes sensitive data
- Frontend displays all metrics

**Symptoms**:
- Confidential information visible
- May violate compliance

**Acceptable Outcome**:
- Should be caught in code review
- If happens: SECURITY BUG

---

## Category G: User Experience Failures

### G-1: Click Target Too Small

**Description**: Entity cards difficult to click on mobile.

**Cause**: Small click target size.

**Trigger Conditions**:
- Mobile viewport
- Small screen
- Precision pointing

**Symptoms**:
- Missed clicks
- User frustration
- Failed interactions

**Acceptable Outcome**:
- Accessibility issue
- Should be fixed

---

### G-2: Missing Visual Feedback

**Description**: User clicks but no visual response.

**Cause**: Missing hover/focus states or click handlers.

**Trigger Conditions**:
- Entity in any state
- User expects feedback

**Symptoms**:
- Uncertainty about click
- Repeated clicks
- Confusion

**Acceptable Outcome**:
- UX issue
- Should be fixed

---

### G-3: Unclear Error State

**Description**: Error state not obvious to user.

**Cause**: Error indicator too subtle.

**Trigger Conditions**:
- Entity in error state
- User not looking for errors

**Symptoms**:
- User misses error
- Problem goes unaddressed
- Confusion about system state

**Acceptable Outcome**:
- UX issue
- Should be fixed

---

## Failure Mode Summary

| ID | Category | Severity | Expected? | Documented? |
|----|----------|----------|-----------|-------------|
| A-1 | Rendering | MEDIUM | Yes | Yes |
| A-2 | Rendering | LOW | Yes | Yes |
| A-3 | Rendering | LOW | Yes | Yes |
| A-4 | Rendering | LOW | Yes | Yes |
| B-1 | State | MEDIUM | Yes | Yes |
| B-2 | State | MEDIUM | Yes | Yes |
| B-3 | State | LOW | Yes | Yes |
| B-4 | State | LOW | Yes | Yes |
| C-1 | Data | MEDIUM | Yes | Yes |
| C-2 | Data | HIGH | Yes | Yes |
| C-3 | Data | LOW | Yes | Yes |
| C-4 | Data | LOW | Yes | Yes |
| D-1 | Network | HIGH | Yes | Yes |
| D-2 | Network | MEDIUM | No | No |
| D-3 | Network | MEDIUM | Yes | Yes |
| E-1 | Performance | HIGH | No | No |
| E-2 | Performance | LOW | Yes | Yes |
| E-3 | Performance | HIGH | Yes | Yes |
| F-1 | Security | CRITICAL | No | No |
| F-2 | Security | HIGH | No | No |
| G-1 | UX | LOW | Yes | Yes |
| G-2 | UX | LOW | Yes | Yes |
| G-3 | UX | LOW | Yes | Yes |

---

## Undocumented Failures

The following failures are NOT expected and represent bugs:

- Any CRITICAL severity failure not documented above
- Any security failure (F-*)
- Memory leak (E-1) if it exists
- XSS vulnerability (F-1)
- Complete system crash
- Data loss
- Session hijacking

If you encounter an undocumented failure, document it here and file a bug.

---

## New Failures Discovered: 2026-01-17

### FD-001: Duplicate Key Collision During State Transitions

**Category**: C (Data Integrity)
**Severity**: HIGH
**Expected?**: NO (was suspected but not confirmed)
**Documented?**: YES (now)

**Description**: React encounters duplicate keys during rapid entity state transitions.

**Trigger Conditions**:
- Multiple entities complete in same tick
- Entity status changes while user interacts
- Rapid setInterval-driven state updates

**Console Evidence**:
```
Warning: Encountered two children with the same key, `%s`. Keys should be unique so that components efficiently update the render tree.
```

**Occurrence**: 14+ warnings in 30 seconds of observation.

**Root Cause**: In App.tsx, concurrent state updates from two setIntervals (2s and 3s intervals) can cause entities to momentarily exist with duplicate IDs in render tree.

**Impact**:
- React console warnings
- Unpredictable rendering
- Potential click target confusion

**Mitigation**:
- Add key validation before render
- Use useId for component instance keys
- Batch state updates more carefully

---

### FD-002: Orphaned Focus State

**Category**: B (State Management)
**Severity**: MEDIUM
**Expected?**: NO (was documented as B-4 but not confirmed)
**Documented?**: YES (now confirmed)

**Description**: Focus state persists after focused entity is removed from active view.

**Trigger Conditions**:
- User clicks entity (focusedEntity set)
- Entity status changes to 'complete'
- Entity filtered out of active entities array
- focusedEntity still references deleted entity ID

**Impact**:
- Detail panel may error
- Click on empty space doesn't clear focus
- Visual focus indicator on nothing

**Mitigation**:
- Add useEffect to clear focus when entity removed
- Check focusedEntity.id exists in entities before rendering detail panel

---

If you encounter an undocumented failure, document it here and file a bug.

---

*Document Version: 1.1.0*
*ChaosTester | Monkeytown Failure Modes*
