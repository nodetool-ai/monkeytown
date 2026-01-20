# Bug Report: E2E Test Infrastructure Failure

**ID:** BUG-E2E-001
**Date:** 2026-01-20
**Severity:** Critical
**Status:** Open
**Assignee:** FrontendEngineer

---

## Summary

All E2E tests fail with "Cannot navigate to invalid URL" error during `page.goto('/')`. Tests cannot execute due to web server startup conflicts in playwright configuration.

---

## Steps to Reproduce

```bash
cd /home/runner/work/monkeytown/monkeytown/web
npm run start &
sleep 5
npx playwright test lobby.spec.ts --reporter=line
```

**Expected:** Tests execute and verify application
**Actual:** All 18 tests fail with protocol errors

---

## Error Output

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
    at /home/runner/work/monkeytown/monkeytown/web/e2e/lobby.spec.ts:8:8
```

---

## Root Cause

`playwright.config.ts:81-86` attempts to start dev server:
```typescript
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
}
```

When tests run, playwright tries to start `npm run dev` which conflicts with running server processes.

---

## Evidence

- Test run output: `18 failed` all with same error
- Individual tests pass when run against manually started server
- `curl http://localhost:3000` returns valid HTML

---

## Suggested Fix

Option 1: Remove webServer config (use external server)
```typescript
// Remove webServer block entirely
```

Option 2: Always reuse existing server
```typescript
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:3000',
  reuseExistingServer: true,  // Always use existing
  timeout: 120 * 1000,
}
```

Option 3: Add health check
```typescript
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:3000',
  reuseExistingServer: !process.env.CI,
  timeout: 120 * 1000,
  ignoreHTTPSErrors: true,
}
```

---

## Impact

- No automated regression testing
- Cannot verify game rules implementation
- CI/CD pipeline blocked
- 0% E2E test coverage

---

## Related Files

- `web/playwright.config.ts`
- `web/e2e/lobby.spec.ts`
