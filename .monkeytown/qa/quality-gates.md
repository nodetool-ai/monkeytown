# ChaosTester Quality Gates

**ChaosTester** | `quality-gates.md` | Definition of "Working"

---

## The Problem with "Working"

Most projects define "working" as "tests pass." This is insufficient. Tests pass when the test is written correctly. Quality gates define when the system is acceptable for human use.

These are the gates that must pass before Monkeytown is considered working.

---

## Gate 1: Structural Integrity

**Question**: Does the system hold together?

### Criteria

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| Type Safety | 0 TypeScript errors | `tsc --noEmit` |
| Build Success | Compiles without error | `npm run build` |
| Bundle Size | ≤ 200KB gzipped | Vite build output |
| Dependency Security | 0 critical vulnerabilities | npm audit |
| Import Cycles | 0 circular dependencies | eslint or circular dependency detector |

### Verification Commands
```bash
npm run build          # Must pass
npm run typecheck      # Must pass (if exists)
npm run lint           # Must pass (if exists)
```

### Failure Response
- **Build failure**: Reject PR immediately
- **Bundle size exceeded**: Investigate, may require architecture change
- **Security vulnerability**: Reject PR until fixed

---

## Gate 2: Visual Consistency

**Question**: Does the system look correct?

### Criteria

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| All visual states render | 100% coverage | Manual verification |
| Animation smoothness | No dropped frames | 60fps target |
| Color contrast | WCAG AA minimum | Manual or automated |
| Layout stability | No layout shift after render | CLS measurement |

### Visual States Required

**AgentCard must show:**
- [ ] idle state (cyan border, breathing animation)
- [ ] active state (green border, no animation)
- [ ] processing state (amber border, thought bubble)
- [ ] complete state (green fade, moves to ghost)
- [ ] error state (red border, error icon)

**SystemPulse must show:**
- [ ] wordmark "monkeytown"
- [ ] 4 metrics (agents, flows, settled, load)
- [ ] color coding (green/amber/red based on load)

**TerrariumView must show:**
- [ ] active entities in canvas
- [ ] completing indicator when entities complete
- [ ] waiting state when empty

**GhostColumn must show:**
- [ ] history header when items exist
- [ ] item count
- [ ] opacity at 40%

### Verification
- Visual regression tests (if exists)
- Manual review by human
- Screenshot comparison

### Failure Response
- **Missing visual state**: Reject PR
- **Animation glitch**: Fix before merge
- **Layout shift**: Fix before merge

---

## Gate 3: Behavioral Correctness

**Question**: Does the system do the right thing?

### Criteria

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| User interactions work | 100% of documented interactions | Manual testing |
| State transitions correct | All 5 status transitions work | Automated tests |
| History behavior correct | Restore moves item back | Automated tests |
| No uncaught exceptions | 0 runtime errors | Console monitoring |
| No React warnings | 0 duplicate key warnings | Browser console |

### Interaction Requirements

1. **Click entity** → Focus state activates
2. **Click focused entity** → Focus may toggle off
3. **Entity completes** → Moves to ghost column, focus cleared if on that entity
4. **Restore from ghost** → Returns to active view
5. **Metrics update** → Display reflects new values

### Verification
- Unit tests cover all interactions
- Integration tests cover user flows
- Manual testing for complex interactions
- **Browser console check for warnings**

### Failure Response
- **Interaction broken**: Reject PR
- **State incorrect**: Reject PR
- **Uncaught exception**: Reject PR
- **React warnings**: Fix before merge

---

## Gate 4: Performance Envelope

**Question**: Is the system fast enough?

### Criteria

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| First Contentful Paint | < 1s | Lighthouse |
| Time to Interactive | < 2s | Lighthouse |
| Bundle download | < 300ms on 3G | Lighthouse |
| Interaction response | < 50ms | Manual measurement |
| Frame rate | 60fps minimum | Chrome DevTools |

### Performance Budget

```
Bundle Size:     ≤ 200 KB gzipped (invariant)
First Paint:     ≤ 1000 ms
Interactive:     ≤ 2000 ms
Interaction:     ≤ 50 ms
Frame Rate:      ≥ 60 fps
Memory:          ≤ 50 MB baseline
```

### Verification
```bash
npm run build -- --analyze  # Bundle analysis
# Chrome DevTools Performance tab
# Lighthouse CI
```

### Failure Response
- **Bundle size**: Architecture review required
- **Paint time**: Investigate blocking code
- **Frame rate**: Investigate animations or excessive renders

---

## Gate 5: Error Resilience

**Question**: Does the system handle errors gracefully?

### Criteria

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| Invalid data doesn't crash | No console errors | Test with malformed data |
| Network failure doesn't crash | Graceful degradation | Simulate disconnect |
| Component unmount cleanup | No memory leaks | React DevTools |
| Error boundary catches errors | No uncaught exceptions | Test error boundaries |

### Error Scenarios to Test

1. **Invalid entity status** - Should not crash
2. **Missing entity fields** - Should not crash
3. **Duplicate entity IDs** - Should not crash (may warn)
4. **Rapid state updates** - Should not crash
5. **Click during animation** - Should not crash
6. **Restore duplicate entity** - Should not crash

### Verification
- Chaos tests with malformed data
- Error boundary tests
- Memory leak detection

### Failure Response
- **Any crash**: Reject PR
- **Memory leak**: Fix before merge

---

## Gate 6: Accessibility Baseline

**Question**: Can users with disabilities use the system?

### Criteria

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| Keyboard navigation | All interactive elements | Manual testing |
| ARIA attributes | Present and correct | Manual testing |
| Color contrast | 4.5:1 minimum | Manual or automated |
| Focus indicators | Visible on focus | Manual testing |
| Screen reader | Basic compatibility | Manual testing |

### Accessibility Requirements

**AgentCard must have:**
- [ ] `role="button"` (or button)
- [ ] `tabIndex={0}` for keyboard focus
- [ ] `onKeyDown` for Enter key

**TerrariumView must have:**
- [ ] Main landmark (`<main>`)
- [ ] Proper heading hierarchy

### Verification
- Manual keyboard testing
- Lighthouse accessibility audit
- Screen reader testing (NVDA, VoiceOver)

### Failure Response
- **Missing keyboard access**: Fix before merge
- **Missing ARIA**: Fix before merge
- **Contrast issues**: Fix before merge

---

## Gate 7: Testing Coverage

**Question**: Are we confident in our tests?

### Criteria

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| Unit test coverage | ≥ 70% | Coverage tool |
| Integration test coverage | All user flows | Manual verification |
| Edge case tests | ≥ 10 edge cases | Test file review |
| Chaos tests | ≥ 5 failure scenarios | Test file review |

### Required Test Categories

1. [ ] Component rendering tests
2. [ ] User interaction tests
3. [ ] State transition tests
4. [ ] Error handling tests
5. [ ] Edge case tests
6. [ ] Integration tests

### Verification
```bash
npm run test -- --coverage  # Coverage report
```

### Failure Response
- **Coverage below threshold**: Add tests before merge
- **Missing test categories**: Add tests before merge

---

## Gate 8: Cross-Browser Compatibility

**Question**: Does the system work across browsers?

### Criteria

| Criterion | Chrome | Firefox | Safari | Edge |
|-----------|--------|---------|--------|------|
| Core functionality | Required | Required | Required | Required |
| Animations | 60fps | 60fps | 60fps | 60fps |
| No console errors | Required | Required | Required | Required |

### Browser Support Target

- Chrome: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Edge: Latest 2 versions

### Verification
- BrowserStack or manual testing
- CI with multiple browsers (if configured)

### Failure Response
- **Critical browser bug**: Fix before merge
- **Minor rendering difference**: Document, may defer

---

## Gate 9: Security Hardening

**Question**: Is the system secure?

### Criteria

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| No XSS vectors | 0 reflected input | Security review |
| No sensitive data exposure | 0 in client bundle | Bundle inspection |
| CSP compliant | No inline scripts | Security tools |
| Dependency vulnerabilities | 0 critical | npm audit |

### Security Checks

1. **Input sanitization** - User input properly escaped
2. **No eval()** - No dynamic code execution
3. **No inline handlers** - Use addEventListener or React synthetic events
4. **No secrets in bundle** - Environment variables not exposed

### Verification
- npm audit
- Security scanner (Snyk, Dependabot)
- Manual security review

### Failure Response
- **Critical security issue**: Reject PR immediately
- **Medium security issue**: Fix before merge
- **Low security issue**: Document, track for fix

---

## Gate 10: Documentation Coherence

**Question**: Are the docs and code in sync?

### Criteria

| Criterion | Threshold | Measurement |
|-----------|-----------|-------------|
| README matches code | 100% | Manual review |
| Comments match behavior | 100% | Manual review |
| Type definitions complete | 100% | TypeScript check |
| No TODO/FIXME left | 0 critical | Code search |

### Verification
- Readme updated with new features
- Type definitions match implementation
- No outdated comments

### Failure Response
- **Docs out of sync**: Update before merge
- **Missing types**: Add before merge
- **Outdated comments**: Update before merge

---

## Quality Gate Summary

| Gate | Severity | Auto-Verifiable |
|------|----------|-----------------|
| 1. Structural Integrity | CRITICAL | Yes (build, typecheck) |
| 2. Visual Consistency | HIGH | Partial (visual regression) |
| 3. Behavioral Correctness | HIGH | Yes (tests) |
| 4. Performance Envelope | MEDIUM | Partial (bundlesize) |
| 5. Error Resilience | HIGH | Partial (tests) |
| 6. Accessibility | MEDIUM | Partial (tools) |
| 7. Testing Coverage | MEDIUM | Yes (coverage) |
| 8. Cross-Browser | MEDIUM | No (manual) |
| 9. Security | CRITICAL | Yes (audit) |
| 10. Documentation | LOW | No (manual) |

---

## Failure Impact Classification

| Gate Failed | Impact | Action |
|-------------|--------|--------|
| Structural Integrity | Blocks deployment | Reject PR |
| Security | Risk to users | Reject PR immediately |
| Error Resilience | User-facing bugs | Reject PR |
| Behavioral | Wrong behavior | Reject PR |
| Visual Consistency | Poor UX | Fix before merge |
| Performance | Slow experience | Fix before merge |
| Accessibility | Legal risk | Fix before merge |
| Testing | No confidence | Add tests |
| Cross-Browser | Limited reach | Document limitation |
| Documentation | Confusion | Update before merge |

---

## The Final Question

When all gates pass, ask:

> "If a human uses this for 8 hours, will they have a good experience?"

If the answer is not clearly YES, something is missing.

---

*Document Version: 1.0.0*
*ChaosTester | Monkeytown Quality Gates*
