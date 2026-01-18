# Monkeytown Test Cases

**ChaosTester | Test Scenarios and Edge Conditions**

---

## 1. Entity State Transitions

### TC-001: Entity Status Color Mapping

**Component**: AgentCard, SystemPulse
**Input**: Entity with each status type
**Expected**: Correct color mapping

| Status | Expected Color | Display |
|--------|---------------|---------|
| idle | cyan (#22d3ee) | Calm, waiting |
| active | green (#4ade80) | Working |
| processing | amber (#fbbf24) | Thinking |
| complete | green (#4ade80) | Done |
| error | red (#f87171) | Failed |

**Edge Cases**:
- Status transitions mid-animation
- Multiple entities with same status
- Rapid status cycling

### TC-002: Entity Metrics Display

**Component**: AgentCard, DetailPanel
**Input**: Entity with various metric values
**Expected**: Correct formatting

| Metric | Range | Display |
|--------|-------|---------|
| efficiency | 0-100 | `${value}%` |
| load | 0-100 | `${value}%` |
| connections | 0+ | Integer |

**Edge Cases**:
- Efficiency at 0 or 100
- Load exceeding 100 (should clamp)
- Zero connections

### TC-003: Entity Filtering

**Component**: TerrariumView
**Input**: Entity list with various statuses
**Expected**: Correct separation

```
Active Canvas: status !== 'complete'
Completing Canvas: status === 'complete'
Waiting State: entities.length === 0
```

**Edge Cases**:
- All entities complete
- Empty entity list
- Rapid additions/removals

---

## 2. Flow Visualization

### TC-004: Flow Type Rendering

**Component**: FlowStream
**Input**: Flow with each type
**Expected**: Correct dash array and icon

| Type | Dash Array | Icon |
|------|-----------|------|
| message | 5,5 | 💬 |
| resource | 10,5 | 📦 |
| contract | 3,3 | 📋 |
| signal | 8,4 | 📡 |

### TC-005: Flow Status Animation

**Component**: FlowStream
**Input**: Flow with each status
**Expected**: Correct visual state

| Status | Dash Animation | Marker | Particle |
|--------|---------------|--------|----------|
| pending | static | pulse | none |
| active | flowing | pulse | moving |
| complete | static | solid | none |
| error | red X | X marker | none |

### TC-006: Flow Path Calculation

**Component**: FlowStream
**Input**: Source and target positions
**Expected**: Bezier curve between points

**Algorithm**:
```
controlPoint1 = source + (target - source) * 0.3
controlPoint2 = target - (target - source) * 0.3
```

**Edge Cases**:
- Same source and target
- Zero distance
- Negative coordinates

---

## 3. System Pulse

### TC-007: Health Color Calculation

**Component**: SystemPulse
**Input**: System load values
**Expected**: Correct color threshold

| Load | Color |
|------|-------|
| 0-50% | green |
| 51-80% | amber |
| 81-100% | red |

### TC-008: Metric Display

**Component**: SystemPulse
**Input**: SystemMetrics object
**Expected**: All metrics render

```
activeAgents: integer
pendingFlows: integer
contractsSettled: integer
systemLoad: ${value}%
```

---

## 4. Ghost Column (History)

### TC-009: Visibility Condition

**Component**: GhostColumn
**Input**: History array
**Expected**: Hidden when empty, visible when populated

```typescript
history.length === 0 ? null : <aside class="ghost-column">
```

### TC-010: Time Calculation

**Component**: GhostColumn
**Input**: Timestamp
**Expected**: Correct human-readable format

| Delta | Format |
|-------|--------|
| < 60s | `${seconds}s ago` |
| < 3600s | `${minutes}m ago` |
| < 86400s | `${hours}h ago` |
| >= 86400s | `${days}d ago` |

### TC-011: Restore Function

**Component**: GhostColumn
**Input**: Entity from history
**Expected**: Entity moved back to active

```typescript
onRestore(entity):
  - Remove from history
  - Add to entities
  - Set as focused
```

---

## 5. Action Seed

### TC-012: Seed Type Selection

**Component**: ActionSeed
**Input**: Click on seed type
**Expected**: Form opens with correct config

| Type | Icon | Placeholder |
|------|------|-------------|
| contract | 📋 | Define terms... |
| constraint | 🔒 | Set limits... |
| resource | 📦 | Allocate resources... |
| query | 🔍 | Ask a question... |

### TC-013: Seed Limit Enforcement

**Component**: ActionSeed
**Input**: pendingCount values
**Expected**: Disabled at max

| pendingCount | State |
|--------------|-------|
| 0-4 | Enabled |
| 5 | Disabled |

### TC-014: Seed Submission

**Component**: ActionSeed
**Input**: Valid seed intent
**Expected**: Callback fired, form reset

```typescript
onPlant(intent):
  - Create Seed with new ID
  - Set status to 'growing'
  - After 3s: set status to 'complete'
```

### TC-015: Keyboard Navigation

**Component**: ActionSeed
**Input**: Keyboard events
**Expected**: Correct handlers

| Key | Context | Action |
|-----|---------|--------|
| Enter | Input field | Submit |
| Escape | Any | Cancel |
| Back | Type selector | Go back |

---

## 6. Detail Panel

### TC-016: Tab Navigation

**Component**: DetailPanel
**Input**: Tab clicks
**Expected**: Correct content switch

| Tab | Content |
|-----|---------|
| status | Metrics grid, timestamp, parentId |
| logs | Log entries with icons |
| connections | Connection list |
| history | Timeline entries |

### TC-017: Log Level Icons

**Component**: DetailPanel
**Input**: Log entries
**Expected**: Correct icons

| Level | Icon |
|-------|------|
| error | ❌ |
| warn | ⚠️ |
| info | ℹ️ |

### TC-018: Backdrop Close

**Component**: DetailPanel
**Input**: Click on backdrop
**Expected**: Panel closes

```typescript
handleBackdropClick(e):
  if e.target === e.currentTarget:
    onClose()
```

---

## 7. Error Handling

### TC-019: Error Card Rendering

**Component**: ErrorCard
**Input**: Error object
**Expected**: Message, suggestion, actions all render

```typescript
error: { message, code?, context? }
onRetry?: () => void
onIgnore?: () => void
onInspect?: () => void
suggestion?: string
```

### TC-020: Error State Persistence

**Component**: App
**Input**: Error state
**Expected**: Error overlay remains until dismissed

---

## 8. WebSocket Resilience

### TC-021: Connection Fallback

**Component**: App (useWebSocket)
**Input**: isConnected = false
**Expected**: Fallback timer activates

```typescript
setInterval(3000ms):
  - Update metrics with random variation
  - Advance entity statuses
  - Advance flow statuses
```

### TC-022: Message Parsing

**Component**: App (useWebSocket)
**Input**: Various StreamMessage types
**Expected**: Correct state updates

| Type | Handler |
|------|---------|
| system_health | setMetrics |
| entity_update | setEntities |
| flow_update | setFlows |

### TC-023: State Consistency

**Component**: App (useWebSocket + fallback)
**Input**: Rapid state updates (50+ ops)
**Expected**: Final state matches expected

```typescript
// No duplicate entity IDs
const entityIds = entities.map(e => e.id);
const uniqueIds = new Set(entityIds);
expect(uniqueIds.size).toBe(entityIds.length);
```

### TC-024: No Duplicate React Keys

**Component**: All list renders
**Input**: State updates over 30 seconds
**Expected**: No console warnings

```typescript
// Monitor console for duplicate key warnings
const warnings = consoleWarnings.filter(w => 
  w.includes('Encountered two children with the same key')
);
expect(warnings.length).toBe(0);
```

---

## 9. Browser Chaos Scenarios (Playwright)

### TC-100: WebSocket Disconnect

**Setup**: Connect, then force close
**Assert**:
- Error overlay appears
- Fallback timer takes over
- Metrics continue updating

### TC-101: Rapid State Updates

**Setup**: Batch 50 entity status changes
**Assert**:
- No React render errors
- Final state consistent
- No memory leaks

### TC-102: Entity Overflow

**Setup**: Generate 150 entities
**Assert**:
- Scroll container handles overflow
- No visual glitches
- Performance acceptable (< 500ms render)

### TC-103: Invalid WebSocket Messages

**Setup**: Send malformed JSON
**Assert**:
- Error caught gracefully
- Error overlay displays
- Connection remains open

### TC-104: Seed Spam

**Setup**: Click plant button 10 times rapidly
**Assert**:
- Rate limiting works
- Button disables at 5
- No crashes

### TC-105: Tab Switch

**Setup**: Navigate to different tab, wait 5s, return
**Assert**:
- State preserved
- No duplicate entities
- Metrics still ticking

### TC-106: Memory Pressure

**Setup**: Generate entities, let run for 60s
**Assert**:
- No memory leak growth
- GC keeps heap stable
- UI remains responsive

### TC-107: Scroll Performance

**Setup**: 200 entities, rapid scroll
**Assert**:
- 60fps scroll
- No dropped frames
- Entity cards render correctly

### TC-108: Network Throttling

**Setup**: Throttle to 3G
**Assert**:
- Fallback activates
- UI shows stale but valid data
- No crashes

---

## 10. Accessibility

### TC-200: Keyboard Navigation

**Setup**: Tab through entire UI
**Assert**:
- All interactive elements reachable
- Focus visible
- No focus traps

### TC-201: ARIA Labels

**Setup**: Inspect DOM
**Assert**:
- Buttons have labels
- Icon-only buttons have aria-label
- Regions have aria-label

---

*Every test case is an opportunity to discover how things break.*
