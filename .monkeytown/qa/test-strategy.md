# Monkeytown Test Strategy

**Version:** 1.0  
**Date:** 2026-01-19  
**QA Lead:** JungleSecurity  
**Status:** Active

---

## Purpose

This document defines the testing strategy for Monkeytown, ensuring quality across all system components. The strategy covers unit testing, integration testing, E2E testing, security testing, and performance testing.

## Testing Philosophy

### Core Principles

1. **Test Early, Test Often** - Tests run on every commit
2. **Shift Left** - Find bugs in development, not production
3. **Automate Everything** - Manual testing for exploratory only
4. **Test Behavior, Not Implementation** - Focus on user outcomes
5. **Fail Fast** - Immediate feedback on regressions

### Testing Pyramid

```
                    ┌─────────────┐
                   /   E2E Tests  \      <- 10% (Critical user journeys)
                  /─────────────────\
                 /    Integration    \   <- 25% (Component interactions)
                /─────────────────────\
               /      Unit Tests       \ <- 65% (Individual functions)
              /─────────────────────────\
```

## Test Categories

### 1. Unit Tests

**Purpose:** Verify individual functions and classes work correctly

**Scope:**
- Game engine logic
- Validation functions
- Utility functions
- Data transformations

**Tools:**
- Vitest (`web/`)
- Jest equivalent (`server/`)

**Coverage Requirements:**
| Component | Minimum Coverage |
|-----------|-----------------|
| Game Engines | 95% |
| Validation | 100% |
| Utilities | 90% |
| Components | 80% |

**Example Test (server/src/game/tictactoe-engine.test.ts):**
```typescript
describe('TicTacToeEngine', () => {
  describe('processAction', () => {
    it('should reject actions when game is not in progress', () => {
      const engine = createTicTacToeEngine(players);
      const result = engine.processAction(playerId, { type: 'place', row: 0, col: 0 });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Game is not in progress');
    });
    
    it('should reject actions from non-current player', () => {
      const engine = createTicTacToeEngine(players);
      engine.startGame();
      const result = engine.processAction(otherPlayerId, { type: 'place', row: 0, col: 0 });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Not your turn');
    });
    
    it('should accept valid moves', () => {
      const engine = createTicTacToeEngine(players);
      engine.startGame();
      const result = engine.processAction(playerId, { type: 'place', row: 0, col: 0 });
      expect(result.success).toBe(true);
    });
  });
});
```

---

### 2. Integration Tests

**Purpose:** Verify components work together correctly

**Scope:**
- API endpoints
- Database operations
- Redis caching
- WebSocket events
- Game session lifecycle

**Tools:**
- Supertest (HTTP)
- Socket.IO client
- Test database containers

**Example Test (server/src/__tests__/api.test.ts):**
```typescript
describe('Game API', () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });
  
  afterAll(async () => {
    await teardownTestDatabase();
  });
  
  describe('POST /api/games/create', () => {
    it('should create a new game session', async () => {
      const response = await request(app)
        .post('/api/games/create')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ gameType: 'tictactoe' });
      
      expect(response.status).toBe(201);
      expect(response.body.gameId).toBeDefined();
    });
  });
});
```

---

### 3. End-to-End Tests

**Purpose:** Verify complete user journeys work correctly

**Scope:**
- User registration flow
- Game creation and joining
- Real-time gameplay
- Chat functionality
- Agent interactions

**Tools:**
- Playwright (`web/e2e/`)

**Example Test (web/e2e/gameplay.spec.ts):**
```typescript
import { test, expect } from '@playwright/test';

test.describe('TicTacToe Gameplay', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#username', 'testplayer');
    await page.click('button:has-text("Start")');
  });
  
  test('should allow player to make a move', async ({ page }) => {
    await page.click('button:has-text("Create Game")');
    await page.waitForSelector('.game-board');
    
    // Make a move in the center
    await page.click('.cell:nth-child(5)');
    
    // Verify move was made
    await expect(page.locator('.cell:nth-child(5)')).toContainText('X');
  });
  
  test('should detect win condition', async ({ page }) => {
    await page.click('button:has-text("Create Game")');
    await page.waitForSelector('.game-board');
    
    // Set up winning position
    await page.click('.cell:nth-child(1)'); // X
    await page.click('.cell:nth-child(4)'); // O
    await page.click('.cell:nth-child(2)'); // X
    await page.click('.cell:nth-child(5)'); // O
    await page.click('.cell:nth-child(3)'); // X - Win!
    
    // Verify win message
    await expect(page.locator('.game-over')).toContainText('You Win!');
  });
});
```

---

### 4. Security Tests

**Purpose:** Verify security controls work correctly

**Scope:**
- Authentication
- Authorization
- Input validation
- Rate limiting
- XSS prevention

**Tools:**
- Custom security test suite
- OWASP ZAP (automated scanning)
- Manual penetration testing

**Example Security Test (server/src/__tests__/security.test.ts):**
```typescript
describe('Security Tests', () => {
  describe('Authentication', () => {
    it('should reject expired tokens', async () => {
      const expiredToken = createExpiredToken();
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${expiredToken}`);
      
      expect(response.status).toBe(401);
    });
    
    it('should reject tokens with invalid signature', async () => {
      const forgedToken = createForgedToken();
      const response = await request(app)
        .get('/api/user/profile')
        .set('Authorization', `Bearer ${forgedToken}`);
      
      expect(response.status).toBe(401);
    });
  });
  
  describe('Input Validation', () => {
    it('should reject SQL injection attempts', async () => {
      const response = await request(app)
        .post('/api/games/create')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ gameType: "tictactoe'; DROP TABLE games; --" });
      
      expect(response.status).toBe(400);
    });
    
    it('should reject XSS in chat messages', async () => {
      const response = await request(app)
        .post('/api/chat')
        .set('Authorization', `Bearer ${validToken}`)
        .send({ message: '<script>alert(1)</script>' });
      
      expect(response.status).toBe(400);
    });
  });
  
  describe('Rate Limiting', () => {
    it('should block excessive requests', async () => {
      for (let i = 0; i <= 100; i++) {
        await request(app)
          .get('/api/health')
          .catch(() => {}); // Ignore errors
      }
      
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(429);
    });
  });
});
```

---

### 5. Performance Tests

**Purpose:** Verify system meets performance requirements

**Scope:**
- API response times
- WebSocket latency
- Database query performance
- Concurrent user capacity
- Memory usage

**Tools:**
- k6 (load testing)
- Lighthouse (frontend performance)
- Node.js profiling

**Performance Requirements:**

| Metric | Target | Threshold |
|--------|--------|-----------|
| API response time (P95) | < 100ms | < 200ms |
| WebSocket round-trip | < 50ms | < 100ms |
| Page load time | < 2s | < 3s |
| Time to interactive | < 3s | < 5s |
| Concurrent connections | 1000 | 500 |
| Memory usage | < 512MB | < 1GB |

**Example Load Test (k6/scenarios/gameplay.js):**
```javascript
import http from 'k6/http';
import ws from 'k6/ws';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 100 },    // Ramp up
    { duration: '1m', target: 500 },     // Stress test
    { duration: '30s', target: 100 },    // Cool down
  ],
  thresholds: {
    http_req_duration: ['p(95)<200'],
    ws_session_duration: ['p(95)<100'],
  },
};

export default function() {
  // Test WebSocket connection
  const url = `ws://${__ENV.HOST}/game`;
  const res = ws.connect(url, {}, function(socket) {
    socket.on('open', function() {
      socket.send(JSON.stringify({
        type: 'join_game',
        gameId: 'test-game',
      }));
    });
    
    socket.on('message', function(msg) {
      const data = JSON.parse(msg);
      if (data.type === 'game_state') {
        check(data, {
          'game state received': (d) => d.gameId !== undefined,
        });
      }
    });
    
    socket.setTimeout(function() {
      socket.close();
    }, 5000);
  });
  
  sleep(1);
}
```

---

### 6. Chaos Tests

**Purpose:** Verify system resilience under failure

**Scope:**
- Database connection failures
- Redis unavailability
- Network partitions
- Service restarts
- High load scenarios

**Tools:**
- Chaos Monkey (simulated failures)
- Fault injection in tests

**Example Chaos Test:**
```typescript
describe('Resilience Tests', () => {
  it('should handle Redis connection failure gracefully', async () => {
    // Simulate Redis failure
    await redisService.disconnect();
    
    // Operations should still work (with degraded functionality)
    const gameAction = await gameServer.processAction(gameId, action);
    expect(gameAction.success).toBe(true);
    
    // Recovery should be automatic
    await redisService.connect();
    await gameServer.processAction(gameId, anotherAction);
    expect(anotherAction.success).toBe(true);
  });
  
  it('should handle rapid reconnection', async () => {
    // Simulate network instability
    for (let i = 0; i < 10; i++) {
      await socket.disconnect();
      await socket.connect();
    }
    
    // Should still be functional
    const response = await socket.send({ type: 'heartbeat' });
    expect(response).toBeDefined();
  });
});
```

---

## Test Environment Strategy

### Environment Matrix

| Environment | Purpose | Data | Refresh |
|-------------|---------|------|---------|
| Development | Local development | Synthetic | On-demand |
| CI | Automated testing | Synthetic | Every run |
| Staging | Pre-production testing | Sanitized prod | Weekly |
| Production | Monitoring | Real | N/A |

### CI/CD Pipeline Integration

```
Commit → Lint → Unit Tests → Integration Tests → Build → E2E Tests → Security Scan → Deploy
```

**Test Gates:**
1. **Lint** - Code quality must pass
2. **Unit Tests** - 80% coverage minimum
3. **Integration Tests** - All must pass
4. **E2E Tests** - Critical paths only
5. **Security Scan** - No critical findings
6. **Performance Test** - Within thresholds

---

## Test Data Management

### Data Generation Strategy

| Type | Tool | Description |
|------|------|-------------|
| Player data | Faker.js | Randomized test players |
| Game states | Custom factories | Valid/invalid game states |
| Edge cases | Custom generators | Boundary conditions |

### Test Data Examples

```typescript
// Player factory
function createTestPlayer(overrides = {}): Player {
  return {
    id: uuid(),
    name: `TestPlayer_${Math.random().toString(36).substr(2, 9)}`,
    type: 'human',
    score: 0,
    isConnected: true,
    ...overrides,
  };
}

// Game state factory
function createTestGameState(overrides = {}): GameState {
  return {
    id: uuid(),
    gameType: 'tictactoe',
    phase: 'in_progress',
    players: [createTestPlayer(), createTestPlayer()],
    board: [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ],
    currentPlayerIndex: 0,
    ...overrides,
  };
}
```

---

## Quality Metrics

### Test Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| Unit Test Coverage | 85% | TBD | [ ] |
| Integration Test Pass Rate | 100% | TBD | [ ] |
| E2E Test Pass Rate | 95% | TBD | [ ] |
| Security Test Pass Rate | 100% | TBD | [ ] |
| Flaky Test Rate | < 5% | TBD | [ ] |

### Quality Gates

| Gate | Criteria | Blocker |
|------|----------|---------|
| Unit Coverage | >= 85% | Yes |
| Critical Bugs | 0 | Yes |
| Security Vulnerabilities | 0 Critical | Yes |
| Performance | All within threshold | Yes |
| Flaky Tests | < 5% | No (warning) |

---

## Test Maintenance

### Test Review Process

1. **Code Review Includes Tests** - All PRs must include/update tests
2. **Test Review** - Tests reviewed alongside code
3. **Flaky Test Triage** - Weekly review of flaky tests
4. **Coverage Analysis** - Monthly coverage report

### Test Documentation

Each test file should include:
- Purpose statement
- Setup requirements
- Cleanup procedures
- Known limitations

---

## Tooling Configuration

### Web Testing Setup

```typescript
// web/vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
});
```

### Server Testing Setup

```typescript
// server/jest.config.js
module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
  ],
  setupFilesAfterEnv: ['./src/test/setup.ts'],
};
```

---

## References

- Playwright Documentation: https://playwright.dev/
- Vitest Documentation: https://vitest.dev/
- k6 Documentation: https://k6.io/docs/
- OWASP Testing Guide: https://owasp.org/www-project-web-security-testing-guide/

---

*Document Version: 1.0*  
*Last Updated: 2026-01-19*  
*JungleSecurity - Protecting Monkeytown*
