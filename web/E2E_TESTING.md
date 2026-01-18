# E2E Testing with Playwright

This document describes the end-to-end (E2E) testing setup for the Monkeytown web application using Playwright.

## 📋 Overview

E2E tests verify that the application works correctly from a user's perspective, testing the complete flow through the browser.

## 🛠️ Setup

### Prerequisites

```bash
# Install dependencies
npm install

# Install Playwright browsers (one-time setup)
npx playwright install
# or with dependencies
npx playwright install --with-deps
```

### Configuration

The Playwright configuration is in `playwright.config.ts`:

- **Test Directory**: `./e2e`
- **Browsers**: Chromium, Firefox, Safari
- **Reporters**: HTML, JSON, JUnit
- **Artifacts**: Screenshots, videos, and traces on failure
- **Base URL**: Configurable via `PLAYWRIGHT_TEST_BASE_URL`

## 🚀 Running Tests

### Local Development

```bash
# Run all tests (may show Vitest warnings - this is expected)
npm run e2e

# Run tests in headed mode (see browser)
npm run e2e:headed

# Run tests with UI
npm run e2e:ui

# View last test report
npm run e2e:report

# Run specific test file
npx playwright test lobby.spec.ts

# Run tests for specific browser
npx playwright test --project=chromium

# Run tests in debug mode
npx playwright test --debug
```

### ⚠️ Vitest Conflict Warning

If you see warnings about `Symbol($$jest-matchers-object)`, this is a known conflict between Vitest and Playwright when both are installed in the same project. These warnings can be safely ignored - the tests will still run correctly. The CI environment doesn't have this issue as each workflow runs in isolation.

**To suppress warnings locally:**
```bash
# Run tests with warnings suppressed
npx playwright test 2>/dev/null
```

### CI/CD

Tests run automatically in GitHub Actions:

1. **Pull Request**: Runs Chromium tests for fast feedback
2. **Main Branch**: Runs full multi-browser suite
3. **Manual Trigger**: Can be run on-demand

## 📊 Test Artifacts

When tests fail, the following artifacts are captured:

- **Screenshots**: Visual captures at the point of failure
- **Videos**: Complete recording of test execution
- **Traces**: Interactive trace viewer files for debugging
- **Console Logs**: Browser console output
- **Network Logs**: HTTP requests and responses

### Viewing Artifacts

1. Navigate to the GitHub Actions tab
2. Select the workflow run
3. Click on the job
4. Download artifacts from the "Artifacts" section

## 📝 Writing Tests

### Test Structure

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup before each test
    await page.goto('/');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
    await page.click('button');
    await expect(page.locator('h1')).toContainText('Expected');
  });
});
```

### Best Practices

1. **Use `data-testid` attributes** for reliable element selection
2. **Mock external services** to avoid flakiness
3. **Clean up state** in `afterEach` or `afterAll`
4. **Use expect assertions** for verifying outcomes
5. **Avoid hardcoded waits**, use proper waiting strategies

## 🔍 Debugging Failed Tests

### 1. View Trace

```bash
# Download trace.zip from artifacts
# View trace in browser
npx playwright show-trace trace.zip
```

### 2. Replay Video

Download the video artifact from GitHub Actions and play it to see the test execution.

### 3. Check Screenshots

Screenshots are captured at the point of failure and available in artifacts.

### 4. Debug Locally

```bash
# Run test in debug mode
npx playwright test --debug test-name.spec.ts

# Run with browser open
npx playwright test --headed test-name.spec.ts
```

## 📂 File Structure

```
web/
├── e2e/
│   ├── lobby.spec.ts          # Lobby page tests
│   └── game.spec.ts           # Game view tests
├── playwright.config.ts       # Playwright configuration
├── package.json               # Scripts and dependencies
└── E2E_TESTING.md            # This file
```

## 🎯 Current Test Coverage

### Lobby Page Tests

- ✅ Page renders correctly
- ✅ Agent badges display
- ✅ Hero section displays
- ✅ Game cards show correct info
- ✅ Navigation works
- ✅ Agent panel interactions
- ✅ Responsive layout

### Game View Tests

- ✅ Game canvas renders
- ✅ Chat functionality
- ✅ Player scores display
- ✅ Navigation back to lobby

## 🔧 CI Workflow Integration

### Pull Request Flow

1. Code pushed to PR branch
2. CI runs unit tests
3. E2E tests run on Chromium
4. Results posted as PR comment
5. Artifacts uploaded for review
6. Build proceeds if all tests pass

### Main Branch Flow

1. Code merged to main
2. Full CI pipeline runs
3. E2E tests run on all browsers (Chromium, Firefox, Safari)
4. Artifacts uploaded
5. Deploy to staging if successful

## 📈 Continuous Improvement

To add more tests:

1. Create new test file in `e2e/` directory
2. Follow naming convention: `feature.spec.ts`
3. Add appropriate selectors using `data-testid` attributes
4. Run tests locally to verify
5. Commit and push to trigger CI

## 🆘 Troubleshooting

### Tests Timeout

- Increase timeout in `playwright.config.ts`
- Check if the application starts correctly
- Verify `baseURL` is correct

### Browser Issues

```bash
# Reinstall browsers
npx playwright install --with-deps

# Clean install
npx playwright install-deps
```

### Flaky Tests

- Add proper waits instead of `sleep()`
- Use `waitForSelector` instead of `waitForTimeout`
- Ensure deterministic state

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)

## 🤝 Contributing

When adding new features:

1. Write E2E tests for user-facing functionality
2. Use `data-testid` for critical elements
3. Test across different browsers
4. Update this documentation

---

For questions or issues, check the GitHub Actions logs or Playwright documentation.
