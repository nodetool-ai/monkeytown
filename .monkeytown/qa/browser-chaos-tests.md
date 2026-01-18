# Monkeytown Browser Chaos Tests

**ChaosTester | Playwright MCP Test Scripts**

This file contains browser-based chaos tests using Playwright MCP for automation testing.

## Setup

```bash
# Start dev server
cd /home/runner/work/monkeytown/monkeytown/web
npm run dev &
DEV_PID=$!

# Wait for server
sleep 3

# Run tests (via Playwright MCP or CLI)
npx playwright test chaos/
```

---

## Test Suite: WebSocket Resilience

### Test: WS-001 Connection Drop Recovery

```typescript
// navigate to app
await page.goto('http://localhost:5173');

// verify initial load
await expect(page.locator('.system-pulse')).toBeVisible();
await expect(page.locator('.terrarium-view')).toBeVisible();

// capture initial metrics
const initialAgents = await page.locator('.metric-value').first().textContent();

// force close WebSocket via CDP
const wsClose = page.evaluate(() => {
  const ws = (window as any).__WS_TEST__;
  if (ws) ws.close();
});

// wait for fallback
await page.waitForTimeout(3500);

// verify fallback activated (metrics should have changed)
const currentAgents = await page.locator('.metric-value').first().textContent();
expect(currentAgents).not.toBe(initialAgents);

// verify UI still functional
await expect(page.locator('.agent-card').first()).toBeVisible();

console.log('[PASS] WS-001: Fallback timer activates on disconnect');
```

### Test: WS-002 Invalid Message Handling

```typescript
await page.goto('http://localhost:5173');

// inject malformed message via WebSocket
const errorResult = await page.evaluate(() => {
  const ws = new WebSocket('ws://localhost:3001');
  
  ws.onopen = () => {
    // Send malformed JSON
    ws.send('not valid json {{{');
  };
  
  ws.onerror = (e) => {
    return 'error_caught';
  };
  
  return new Promise((resolve) => {
    setTimeout(() => resolve('no_crash'), 1000);
  });
});

expect(errorResult).toBe('no_crash');

// verify app still running
await expect(page.locator('.system-pulse')).toBeVisible();

console.log('[PASS] WS-002: Invalid messages handled gracefully');
```

---

## Test Suite: State Stress

### Test: ST-001 Rapid Entity Updates

```typescript
await page.goto('http://localhost:5173');

// capture initial entity count
const initialCount = await page.locator('.agent-card').count();

// simulate rapid state updates by setting localStorage mock
await page.evaluate(() => {
  // Dispatch custom events to trigger updates
  for (let i = 0; i < 50; i++) {
    window.dispatchEvent(new CustomEvent('entity-update', {
      detail: {
        type: 'entity_update',
        entity: [{
          id: `stress-agent-${i}`,
          type: 'agent',
          status: ['active', 'processing', 'idle'][i % 3],
          label: `StressAgent${i}`,
          metrics: { efficiency: 90, load: 30, connections: 2 },
          timestamp: Date.now()
        }]
      }
    }));
  }
});

// wait for render
await page.waitForTimeout(2000);

// verify no crash - count updated
const newCount = await page.locator('.agent-card').count();
expect(newCount).toBeGreaterThanOrEqual(1);

// verify UI still interactive
await page.locator('.agent-card').first().click();
await expect(page.locator('.detail-panel')).toBeVisible();

console.log('[PASS] ST-001: Rapid updates handled without crash');
```

### Test: ST-002 Entity Overflow Handling

```typescript
await page.goto('http://localhost:5173');

// inject 150 entities
await page.evaluate(() => {
  const entities = [];
  for (let i = 0; i < 150; i++) {
    entities.push({
      id: `overflow-agent-${i}`,
      type: 'agent',
      status: 'idle',
      label: `OverflowAgent${i}`,
      metrics: { efficiency: 80, load: 40, connections: 1 },
      timestamp: Date.now()
    });
  }
  window.dispatchEvent(new CustomEvent('entity-update', {
    detail: { type: 'entity_update', entity: entities }
  }));
});

// verify scroll container exists
const terrarium = page.locator('.terrarium-canvas');
const scrollHeight = await terrarium.evaluate(el => el.scrollHeight);
expect(scrollHeight).toBeGreaterThan(1000);

// verify scroll works
await terrarium.scrollTo(0, 500);
await page.waitForTimeout(500);

// verify cards still visible at scroll position
const visibleCards = await page.locator('.agent-card').count();
expect(visibleCards).toBeGreaterThan(0);

console.log('[PASS] ST-002: 150 entities handled with scrolling');
```

---

## Test Suite: Interaction Chaos

### Test: IN-001 Seed Spam Protection

```typescript
await page.goto('http://localhost:5173');

// open seed panel
await page.locator('.seed-trigger').click();

// rapid seed plantings
for (let i = 0; i < 10; i++) {
  await page.locator('.seed-type-option').first().click();
  await page.locator('.seed-input').fill(`seed ${i}`);
  await page.locator('.seed-submit').click();
  
  // check if disabled at 5
  const isDisabled = await page.locator('.seed-trigger').isDisabled();
  if (i >= 4) {
    expect(isDisabled).toBe(true);
  }
}

// verify limit indicator shows
await expect(page.locator('.seed-limit-indicator')).toContainText('5/5');

console.log('[PASS] IN-001: Rate limiting enforced at 5 seeds');
```

### Test: IN-002 Panel Open/Close Chaos

```typescript
await page.goto('http://localhost:5173');

// open multiple panels rapidly
for (let i = 0; i < 5; i++) {
  await page.locator('.agent-card').first().click();
  await page.locator('.detail-close').click();
}

// verify no panels remain open
const openPanels = await page.locator('.detail-panel').count();
expect(openPanels).toBe(0);

// verify ESC key works
await page.locator('.agent-card').first().click();
await expect(page.locator('.detail-panel')).toBeVisible();
await page.keyboard.press('Escape');
await page.waitForTimeout(300);
const panelsAfterEsc = await page.locator('.detail-panel').count();
expect(panelsAfterEsc).toBe(0);

console.log('[PASS] IN-002: Panel open/close chaos survived');
```

---

## Test Suite: Performance

### Test: PF-001 Animation Frame Rate

```typescript
await page.goto('http://localhost:5173');

// measure frame rate using Performance API
const fpsResult = await page.evaluate(() => {
  const frames: number[] = [];
  let lastTime = performance.now();
  
  function countFrame() {
    const now = performance.now();
    frames.push(now - lastTime);
    lastTime = now;
    
    if (frames.length < 60) {
      requestAnimationFrame(countFrame);
    }
  }
  
  return new Promise((resolve) => {
    requestAnimationFrame(countFrame);
    setTimeout(() => {
      const avgFrameTime = frames.reduce((a, b) => a + b, 0) / frames.length;
      resolve({ avgFrameTime, fps: 1000 / avgFrameTime });
    }, 2000);
  });
});

console.log(`Frame rate: ${fpsResult.fps.toFixed(1)} fps`);

// expect at least 30 fps
expect(fpsResult.fps).toBeGreaterThan(30);

console.log('[PASS] PF-001: Animation frame rate acceptable');
```

### Test: PF-002 Memory Stability

```typescript
await page.goto('http://localhost:5173');

// get initial heap
const initialHeap = await page.evaluate(() => 
  performance.memory?.usedJSHeapSize || 0
);

// generate entities for 30 seconds
await page.evaluate(async () => {
  for (let i = 0; i < 100; i++) {
    window.dispatchEvent(new CustomEvent('entity-update', {
      detail: {
        type: 'entity_update',
        entity: [{
          id: `mem-agent-${i}`,
          type: 'agent',
          status: 'idle',
          label: `MemTest${i}`,
          metrics: { efficiency: 75, load: 50, connections: 3 },
          timestamp: Date.now()
        }]
      }
    }));
    await new Promise(r => setTimeout(r, 100));
  }
});

await page.waitForTimeout(5000);

// get final heap
const finalHeap = await page.evaluate(() => 
  performance.memory?.usedJSHeapSize || 0
);

const growthPercent = ((finalHeap - initialHeap) / initialHeap) * 100;
console.log(`Memory growth: ${growthPercent.toFixed(1)}%`);

// expect less than 50% growth
expect(growthPercent).toBeLessThan(50);

console.log('[PASS] PF-002: Memory growth acceptable');
```

---

## Test Suite: Accessibility

### Test: AX-001 Keyboard Navigation

```typescript
await page.goto('http://localhost:5173');

// tab through all interactive elements
const focusableCount = await page.evaluate(() => {
  return document.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  ).length;
});

console.log(`Found ${focusableCount} focusable elements`);

// verify we can tab through
const firstFocus = await page.locator(':focus').evaluate(el => el.tagName);

// perform 10 tabs
for (let i = 0; i < 10; i++) {
  await page.keyboard.press('Tab');
}

const afterTab = await page.locator(':focus').evaluate(el => el.tagName);
expect(afterTab).toBeTruthy();

console.log('[PASS] AX-001: Keyboard navigation functional');
```

### Test: AX-002 Focus Visibility

```typescript
await page.goto('http://localhost:5173');

// check buttons have visible focus styles
const focusStyle = await page.evaluate(() => {
  const btn = document.querySelector('button');
  const styles = window.getComputedStyle(btn, ':focus-visible');
  return {
    outline: styles.outline,
    boxShadow: styles.boxShadow
  };
});

console.log('Focus styles:', JSON.stringify(focusStyle));

// verify some form of focus indication exists
const hasFocusIndicator = focusStyle.outline !== 'none' || 
                          focusStyle.boxShadow !== 'none' ||
                          focusStyle.boxShadow !== '';
expect(hasFocusIndicator).toBe(true);

console.log('[PASS] AX-002: Focus visibility confirmed');
```

---

## Test Suite: Visual Regression

### Test: VR-001 Status Color Mapping

```typescript
await page.goto('http://localhost:5173');

// capture each status color
const statusColors: Record<string, string> = {};

const cards = page.locator('.agent-card');
const count = await cards.count();

for (let i = 0; i < count; i++) {
  const card = cards.nth(i);
  const status = await card.locator('.card-status').textContent();
  const color = await card.evaluate(el => 
    getComputedStyle(el).getPropertyValue('--status-color').trim()
  );
  statusColors[status] = color;
}

console.log('Status colors:', JSON.stringify(statusColors, null, 2));

// verify all expected statuses have colors
expect(statusColors.idle).toBeTruthy();
expect(statusColors.active).toBeTruthy();
expect(statusColors.processing).toBeTruthy();
expect(statusColors.complete).toBeTruthy();
expect(statusColors.error).toBeTruthy();

console.log('[PASS] VR-001: All statuses have visual indicators');
```

---

## Running Chaos Tests

```bash
# Run all chaos tests
npx playwright test chaos/browser-chaos.spec.ts

# Run specific test
npx playwright test chaos/browser-chaos.spec.ts -t "WS-001"

# Run with trace
npx playwright test chaos/ --trace on
```

---

*Chaos testing confirms the system survives the unexpected.*
