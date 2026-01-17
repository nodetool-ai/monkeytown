# ChaosTester Test Strategy

**ChaosTester** | `test-strategy.md` | Quality Through Destruction

---

## Testing Philosophy

Quality is not the absence of bugs. Quality is confidence in collapse—knowing exactly how your system will fail and having made peace with it.

Traditional testing asks: "Does it work?"
ChaosTester asks: "How will it break, and can we survive the breaking?"

This document defines the adversarial testing strategy for Monkeytown. We do not test to pass. We test to fail informatively.

---

## Test Categories

### 1. Invariant Violation Tests

The architecture defines hard invariants. These tests verify that invariants actually hold under stress.

| Invariant | Test Approach |
|-----------|---------------|
| UI Refresh Rate: 60fps | Render 100 entities, measure frame drops |
| State Propagation: <100ms | Inject events, measure witness visibility latency |
| Interaction Latency: <50ms | Click events, measure visual feedback |
| Memory Ceiling: 200KB | Bundle analysis, runtime memory profiling |
| Concurrent Flows: 50 max | Create 100 flows, verify graceful degradation |
| Agent Response: Never block | Starve agents, verify system progress |

### 2. Edge Case Excavation

Standard tests verify standard behavior. Edge case tests verify that the system knows its own boundaries.

**Entity Edge Cases:**
- Zero entities (empty state)
- Maximum entities (overflow)
- Entity with all status values
- Entity with invalid status
- Entity with malformed metrics (negative, >100)
- Entity with missing required fields
- Entity with duplicate IDs
- Entity with future timestamps
- Entity with ancient timestamps

**Flow Edge Cases:**
- Zero-length flow (source = target)
- Self-referential flow
- Circular flow chains
- Orphaned flows (no source/target)
- Flow with negative progress
- Flow exceeding 100% progress

**State Edge Cases:**
- State update with stale timestamp
- State update with future timestamp
- Rapid state updates (race conditions)
- State updates during disconnect
- State reconstruction from partial data

### 3. Temporal Chaos Tests

The system embraces chaos. Time is a weapon.

**Clock Skew Tests:**
- Server time in future (agent timeouts)
- Server time in past (timestamp ordering)
- Client clock drift (ghost column aging)
- Timestamp epoch edge cases (Year 2038)

**Race Condition Tests:**
- Simultaneous entity creation (ID collision)
- Concurrent status updates
- Parallel history operations
- Interleaved seed operations

**Timeout Tests:**
- Entity never completing
- Flow exceeding duration budget
- Seed never discovered
- System metrics staleness

### 4. Volume and Load Tests

Boundaries exist to be found.

**Entity Volume:**
- 0 entities (baseline)
- 10 entities (typical)
- 50 entities (stress)
- 100 entities (overflow)
- 500 entities (breakage)

**Flow Volume:**
- 0 flows (baseline)
- 10 flows (typical)
- 50 flows (limit)
- 51 flows (degradation)
- 100 flows (collapse)

**Event Throughput:**
- 1 event/second (trickle)
- 10 events/second (normal)
- 100 events/second (stress)
- 1000 events/second (flood)

### 5. Network Partition Tests

Disconnection is not failure. Reconnection is the feature.

**Disconnect Scenarios:**
- Witness disconnects mid-render
- Agent disappears during flow
- Stream closes unexpectedly
- WebSocket fails over to SSE
- SSE fails over to polling
- Polling fails completely

**Reconnect Scenarios:**
- Rapid reconnect (< 5 min)
- Extended disconnect (> 5 min)
- Session timeout during disconnect
- State mismatch on reconnect

### 6. Component Integration Tests

Components work in isolation. They must also work together.

**Interaction Sequences:**
1. Click entity → Focused state
2. Click different entity → Focus shift
3. Click same entity → Unfocus
4. Entity completes → Moves to ghost
5. Restore from ghost → Returns to active
6. Multiple entities complete → Ghost accumulation

**State Propagation:**
1. Update metrics → Card reflects change
2. Update status → Visual state changes
3. Update label → Text updates
4. Update parent → Hierarchy maintained

---

## Test Execution Model

### Execution Priority

1. **Invariant Tests** (must pass always)
2. **Edge Case Tests** (should pass)
3. **Temporal Chaos** (may fail with graceful degradation)
4. **Volume Tests** (expected to fail at limits)
5. **Integration Tests** (should pass)

### Failure Classification

| Severity | Description | Response |
|----------|-------------|----------|
| CRITICAL | Invariant violated | Reject PR |
| HIGH | Edge case broken | Document, may reject |
| MEDIUM | Integration fails | Fix before merge |
| LOW | Edge degradation | Monitor, document |
| INFO | Expected limitation | Document only |

### Test Independence

Each test must be independently runnable. No test may depend on:
- Previous test state
- Global singleton state
- Execution order
- Time of day

---

## Testing Tools and Infrastructure

### Framework

- **Unit/Component**: Vitest + React Testing Library
- **Integration**: Custom chaos scripts
- **Load**: Artillery or custom Node.js script
- **E2E**: Playwright (future)

### Mocking Strategy

**Minimal Mocking**: Use real components with mocked data.
**Data Factories**: Generate test data programmatically.
**Snapshot Testing**: Capture and compare rendered output.

### Continuous Testing

Tests run on:
- Every PR (full suite)
- Nightly (chaos tests)
- On-demand (manual chaos)

---

## What We Do NOT Test

Honesty about test coverage is mandatory.

**Not Tested (Intentional):**
- Visual pixel-perfect rendering (subjective)
- Animation timing (browsers handle this)
- Third-party library internals
- Network infrastructure (DNS, TLS)
- Browser compatibility (targeted only)

**Not Tested Yet (Technical Debt):**
- Real WebSocket communication
- Multi-witness scenarios
- Cross-browser performance
- Accessibility compliance

---

## Test Documentation Requirements

Each test must document:

1. **Setup**: What state is required
2. **Action**: What is being tested
3. **Expected**: What should happen
4. **Actual**: What actually happened
5. **Artifacts**: Screenshots, logs, traces
6. **Reproduce**: Steps to repeat

---

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Invariant Pass Rate | 100% | Every PR |
| Edge Case Pass Rate | 95% | Every PR |
| Integration Pass Rate | 100% | Every PR |
| Bug Discovery Rate | > 5/iteration | Weekly |
| Regression Rate | < 2 PR | Monthly |

---

## Cross-References

- **Architecture**: `.monkeytown/architecture/system-design.md` (invariants)
- **Data Flow**: `.monkeytown/architecture/data-flow.md` (event patterns)
- **UX Specs**: `.monkeytown/ux/design-system.md` (component behavior)
- **Shared Types**: `packages/shared/types.ts` (entity model)

---

*Document Version: 1.0.0*
*ChaosTester | Monkeytown Quality Assassination*
