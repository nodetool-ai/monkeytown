# Monkeytown Failure Modes

**ChaosTester | Taxonomy of Ways Things Break**

---

## 1. WebSocket Failures

### FM-WS-001: Connection Drop

**Trigger**: Network interruption, server crash
**Symptom**: `isConnected` becomes false
**System Response**:
- Fallback timer activates
- Metrics continue with simulated updates
- Entities advance status randomly
- Flows advance randomly

**Recovery**: Automatic reconnection attempt every 3s

**Impact**: Low — System continues with synthetic data

### FM-WS-002: Message Parse Error

**Trigger**: Malformed JSON from server
**Symptom**: `JSON.parse` throws
**System Response**:
- Error caught in try/catch
- Console error logged
- No state mutation
- Connection remains open

**Recovery**: Ignore message, wait for next valid message

**Impact**: Low — Single message lost, no corruption

### FM-WS-003: Invalid Message Type

**Trigger**: Server sends unknown message type
**Symptom**: Switch case falls through
**System Response**:
- Message ignored
- No error logged (by design)
- State unchanged

**Recovery**: Next valid message restores sync

**Impact**: Low — Graceful ignore

### FM-WS-004: Message Reorder

**Trigger**: Network latency variance
**Symptom**: Later message arrives before earlier
**System Response**:
- No sequencing logic
- Latest state wins
- Possible visual flicker

**Recovery**: Eventual consistency

**Impact**: Medium — Visual artifact, no data loss

---

## 2. State Failures

### FM-ST-001: Entity Status Conflict

**Trigger**: Entity completes then receives update
**Symptom**: Entity in history, then reappears
**System Response**:
- History filtered by ID
- Entity removed from history
- Re-added to active

**Recovery**: Entity restored to active state

**Impact**: Medium — Visual confusion

### FM-ST-002: Flow Reference Invalid

**Trigger**: Flow references non-existent entity
**Symptom**: `getEntityPosition` returns default (100, 100)
**System Response**:
- Flow renders at default position
- No crash
- Visual artifact

**Recovery**: Depends on entity creation

**Impact**: Medium — Visual artifact, possible confusion

### FM-ST-003: Rapid State Updates

**Trigger**: WebSocket flood (50+ messages/sec)
**Symptom**: React render queue fills
**System Response**:
- Batched updates (React 18 automatic)
- Possible frame drops
- No data loss

**Recovery**: Render catches up after flood stops

**Impact**: Medium — Temporary lag

### FM-ST-004: State Corruption

**Trigger**: Memory corruption, cosmic ray, bug
**Symptom**: Entity with impossible values
**System Response**:
- No validation on updates
- Invalid values display
- Possible crash in derived calculations

**Recovery**: Hard refresh required

**Impact**: High — Complete failure

---

## 3. Component Failures

### FM-CP-001: AgentCard Render Error

**Trigger**: Exception in AgentCard render
**Symptom**: Card fails to render
**System Response**:
- Error boundary catches (if present)
- Other cards continue
- Broken card shows error state

**Recovery**: Retry or dismiss error

**Impact**: Medium — Single entity invisible

### FM-CP-002: DetailPanel Memory Leak

**Trigger**: Event listeners not cleaned up
**Symptom**: Multiple panel opens/closes
**System Response**:
- Memory grows
- Performance degrades
- Eventually crash

**Recovery**: Component unmount fixes

**Impact**: High — Long-term stability

### FM-CP-003: ActionSeed Rate Limit Bypass

**Trigger**: Manual DOM manipulation
**Symptom**: `disabled` attribute ignored
**System Response**:
- `canPlant` check only
- Server should validate
- Possible seed spam

**Recovery**: Server-side rate limiting

**Impact**: Medium — Server load, visual spam

### FM-CP-004: FlowStream Animation Loop

**Trigger**: `animateMotion` path recalculation
**Symptom**: 100% CPU usage
**System Response**:
- Browser handles animation
- Tab becomes unresponsive

**Recovery**: Navigate away, close tab

**Impact**: High — Browser freeze

---

## 4. Timer Failures

### FM-TM-001: Fallback Timer Pile-up

**Trigger**: Component unmount during fallback
**Symptom**: Timer not cleared
**Symptom**: Timer continues after unmount
**System Response**:
- State updates on unmounted component
- React warning in console
- Memory leak

**Recovery**: Timer cleared on unmount (current implementation)

**Impact**: Low — Console warning

### FM-TM-002: Seed Growth Timeout

**Trigger**: `setTimeout` callback fails
**Symptom**: Seed stuck in 'growing' state
**System Response**:
- Seed never completes
- Slot remains occupied
- Rate limit prevents new seeds

**Recovery**: Hard refresh

**Impact**: Medium — Seed functionality blocked

### FM-TM-003: Flow Completion Callback Missed

**Trigger**: `onComplete` throws exception
**Symptom**: Callback doesn't fire
**System Response**:
- Flow stays in visual complete
- Upstream handler doesn't run
- Possible data loss

**Recovery**: Manual intervention

**Impact**: Medium — Flow data lost

---

## 5. Visual Failures

### FM-VZ-001: Status Color Clash

**Trigger**: Dark mode, custom theme
**Symptom**: Low contrast status colors
**System Response**:
- Colors hardcoded
- No theme adaptation
- Possible unreadability

**Recovery**: Theme override

**Impact**: Low — Accessibility issue

### FM-VZ-002: Text Overflow

**Trigger**: Long entity labels
**Symptom**: Text extends beyond card
**System Response**:
- CSS `overflow` not set
- Layout breaks

**Recovery**: CSS truncation

**Impact**: Low — Visual glitch

### FM-VZ-003: Animation Desync

**Trigger**: Tab backgrounded, throttling
**Symptom**: Animations stutter when returned
**System Response**:
- CSS animations pause
- `requestAnimationFrame` throttled

**Recovery**: Return to tab, animations resume

**Impact**: Low — Visual artifact

### FM-VZ-004: Flow Path Overlap

**Trigger**: Many flows between same entities
**Symptom**: Flows render on top of each other
**System Response**:
- No z-order logic
- Visual confusion

**Recovery**: Manual interpretation

**Impact**: Medium — Visual confusion

---

## 6. Data Failures

### FM-DT-001: Duplicate Entity IDs

**Trigger**: Server sends duplicate
**Symptom**: Map/list collision
**System Response**:
- Last write wins
- First entity overwritten

**Recovery**: Server-side validation

**Impact**: High — Data loss

### FM-DT-002: Invalid Metrics Values

**Trigger**: Server sends out-of-range
**Symptom**: Negative efficiency, >100% load
**System Response**:
- Values displayed as-is
- No clamping
- Possible CSS breakage

**Recovery**: Server-side validation

**Impact**: Medium — Display issue

### FM-DT-003: History Overflow

**Trigger**: Unlimited entity completion
**Symptom**: History array grows indefinitely
**System Response**:
- Slice to 50 items (current impl)
- Old history lost

**Recovery**: None (by design)

**Impact**: Low — Acceptable data loss

### FM-DT-004: Seed Intent Payload Error

**Trigger**: Malformed seed intent
**Symptom**: Payload type mismatch
**System Response**:
- `Record<string, unknown>` accepts anything
- Handler may crash on access

**Recovery**: Type guards needed

**Impact**: Medium — Handler crash possible

---

## 7. Accessibility Failures

### FM-A11Y-001: Keyboard Trap

**Trigger**: Modal/panel open
**Symptom**: Focus trapped in panel
**System Response**:
- ESC key handler present
- Backdrop click handler present
- No explicit focus trap

**Recovery**: ESC key works

**Impact**: Medium — Accessibility issue

### FM-A11Y-002: Missing Focus Ring

**Trigger**: CSS override, browser setting
**Symptom**: Focus not visible
**System Response**:
- `outline` not set on buttons
- Focus styles depend on CSS

**Recovery**: CSS fix

**Impact**: Low — Accessibility issue

### FM-A11Y-003: Icon-Only Buttons

**Trigger**: Icon buttons without labels
**Symptom**: Screen reader announces nothing
**System Response**:
- `aria-label` not set
- Button text empty

**Recovery**: Add aria-label

**Impact**: Medium — Screen reader unusable

---

## 8. Browser Failures

### FM-BR-001: Memory Limit

**Trigger**: 200+ entities for extended period
**Symptom**: Browser tab crash
**System Response**:
- No recovery
- Page needs reload

**Recovery**: Reload tab

**Impact**: High — Complete failure

### FM-BR-002: WebGL Not Supported

**Trigger**: Disabled WebGL, old browser
**Symptom**: SVG rendering works
**System Response**:
- No WebGL used
- SVG fallback works

**Recovery**: None needed

**Impact**: None

### FM-BR-003: Large Animation Frame

**Trigger**: Complex scene, slow CPU
**Symptom**: Frame drops, laggy UI
**System Response**:
- CSS animations continue
- JavaScript falls behind

**Recovery**: Reduce entity count

**Impact**: Medium — Poor UX

---

## 9. Recovery Matrix

| Failure | Auto-Recovery | Manual Action | Data Loss |
|---------|--------------|---------------|-----------|
| WS Connection Drop | ✓ | Refresh | None |
| Message Parse Error | ✓ | Ignore | Lost message |
| Entity Status Conflict | ✓ | None | None |
| Flow Reference Invalid | ✗ | Restart flow | Partial |
| Rapid State Updates | ✓ | Wait | None |
| State Corruption | ✗ | Hard refresh | Possible |
| AgentCard Render Error | ✓ | Dismiss error | None |
| Timer Pile-up | ✗ | Reload | None |
| Duplicate Entity IDs | ✗ | Server fix | Lost entity |
| Memory Limit | ✗ | Reload | None |

### FM-DT-005: Duplicate React Keys

**Trigger**: State updates in fallback timer or WebSocket handler
**Symptom**: Console warning: "Encountered two children with the same key"
**System Response**:
- React re-renders more than necessary
- Potential visual artifacts
- Performance degradation over time

**Recovery**: Fix key generation in App.tsx render methods

**Impact**: Medium - Rendering inefficiency, potential data display issues

**Discovered**: 2026-01-18 (ChaosTester browser test)

**Fix Required**:
```typescript
// Deduplicate entities by ID before state updates
const uniqueEntities = entities.reduce((acc, entity) => {
  if (!acc.find(e => e.id === entity.id)) {
    acc.push(entity);
  }
  return acc;
}, []);
```

---

## 10. Known Issues

| Issue | Severity | Workaround | Status |
|-------|----------|------------|--------|
| SVG element casing warnings in tests | Low | False positives | Ignored |
| Fallback timer not cleared on unmount | Medium | Fixed in current code | Resolved |
| No WebSocket heartbeat | Low | Reconnection on close | Enhancement |
| No server-side seed validation | Medium | Client-side only | Risk |
| Duplicate React keys in state updates | Critical | Deduplicate before setState | OPEN |

---

*Every failure mode is an opportunity to improve resilience.*
