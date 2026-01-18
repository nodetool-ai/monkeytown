# Monkeytown QA Strategy

**ChaosTester | Quality Assassin**

This document defines the testing philosophy, approach, and execution strategy for the Monkeytown multi-agent system.

---

## 1. Philosophy

Quality is not the absence of bugs. Quality is **confidence in collapse** — knowing exactly how the system will fail and having designed for it.

We do not test to pass. We test to **fail informatively**.

### Core Principles

1. **Anticipate Failure**: Every component has a breaking point. Find it.
2. **Test the Edges**: Boundary conditions reveal truth. Test there.
3. **Chaos is a Feature**: The system must survive intentional disruption.
4. **Failure is Data**: Each bug is a discovery, not a defeat.
5. **Automate Destruction**: Manual testing is incomplete testing. Everything must be scriptable.

---

## 2. Test Layers

### Layer 1: Type & Contract Tests (Unit)

**Coverage**: Type definitions, constants, shared types
**Tool**: Vitest
**Scope**: 100% of exported types must have validation tests

### Layer 2: Component Tests (Isolation)

**Coverage**: Individual React components
**Tool**: React Testing Library + Vitest
**Scope**: All interactive elements, state transitions, rendering conditions

### Layer 3: Integration Tests (Flow)

**Coverage**: WebSocket connections, state synchronization, component composition
**Tool**: Playwright + Vitest
**Scope**: User workflows, data propagation, error recovery

### Layer 4: Chaos Tests (Destruction)

**Coverage**: Stress conditions, network failure, state corruption
**Tool**: Playwright (MCP)
**Scope**: Deliberate failure injection, recovery verification

---

## 3. Browser Chaos Testing Protocol

### 3.1 Environment Setup

```bash
# Run dev server in background
npm run dev &
SERVER_PID=$!

# Run Playwright chaos tests
playwright test chaos/
```

### 3.2 Chaos Scenarios

| Scenario | Injection Method | Expected Behavior |
|----------|-----------------|-------------------|
| WebSocket disconnect | Force close socket | Fallback timer activates, metrics continue updating |
| Rapid state updates | Batch entity status changes | No render loops, consistent UI |
| Entity overflow | Generate 100+ entities | Graceful degradation, scroll containers work |
| Invalid messages | Send malformed JSON | Error overlay, no crash |
| Seed spam | Rapid seed planting | Rate limiting, disabled state |
| Tab switch | Navigate away and back | State preservation |

### 3.3 Metrics for Chaos

- **Recovery Time**: Time from failure to normal operation
- **Error Visibility**: Whether errors render correctly
- **State Integrity**: Whether data corrupts across failures
- **User Experience**: Whether witness can still understand the system

---

## 4. Test Automation

### CI/CD Integration

```yaml
# GitHub Actions - on every push
- name: Run unit tests
  run: npm test

- name: Run browser chaos tests
  run: npx playwright test --project=chaos

- name: Report failures
  if: failure()
  run: |
    echo "Failure discovered by ChaosTester" >> $GITHUB_STEP_SUMMARY
    cat .monkeytown/qa/test-results.md
```

### Pre-commit Hooks

- Type checking must pass
- No new `any` types without justification
- Component tests required for new components

---

## 5. Quality Gates

### Must Pass (Blocking)

- All unit tests pass (52+ tests)
- TypeScript compilation with strict mode
- No `any` type introductions
- Playwright chaos scenarios pass
- Error states render correctly

### Should Pass (Non-blocking)

- 80%+ component test coverage
- Performance under 100 entities
- Accessibility audit (axe-core)
- Mobile layout check

### Chaos Tolerance (Acceptable Degradation)

- UI may be slow but must not freeze
- Errors may appear but must not crash
- Data may be stale but must not corrupt
- WebSocket may disconnect but must reconnect

---

## 6. Reporting

All test results documented in:
- `.monkeytown/qa/test-results.md` — Live execution results
- `.monkeytown/qa/failure-modes.md` — Known failure taxonomy
- `.monkeytown/qa/browser-chaos-tests.md` — Playwright test scripts

---

*Quality is not a destination. It is a continuous assault on our assumptions.*

— ChaosTester
