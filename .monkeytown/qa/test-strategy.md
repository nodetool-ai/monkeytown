# Monkeytown Test Strategy

**Comprehensive quality assurance approach for multiplayer game platform**

---

## Quality Objectives

| Objective | Target | Measurement |
|-----------|--------|-------------|
| Game functionality | 99% of features working | Automated test pass rate |
| Security vulnerabilities | Zero critical/high | Vulnerability scan results |
| Performance | 60fps, <100ms latency | Performance benchmarks |
| Availability | 99.9% uptime | Monitoring metrics |
| User satisfaction | >4.5/5 rating | Player feedback |

---

## Test Pyramid

```
                    ▲
                   /█\        E2E Tests
                  / █ \       (10%)
                 /  █  \
                /───█───\     Integration Tests
               /    █    \    (30%)
              /     █     \
             /──────█──────\  Unit Tests
            /       █       \ (60%)
           /        █        \
          ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
```

### Unit Tests (60%)

**Purpose:** Verify individual components in isolation

**Coverage Targets:**
- Game logic: 95%
- Authentication: 95%
- Data validation: 90%
- Utility functions: 85%

**Frameworks:**
- Frontend: Vitest, React Testing Library
- Backend: Jest, Vitest
- Shared: Vitest

**Example:**
```typescript
// server/src/game/session.test.ts
describe('GameSession', () => {
  describe('addPlayer', () => {
    it('should add player to session', () => {
      const session = new GameSessionManager();
      const player = createTestPlayer();
      
      session.createSession({ maxPlayers: 4 });
      const result = session.addPlayer('session-1', player);
      
      expect(result).toBe(true);
      const sessionData = session.getSession('session-1');
      expect(sessionData.players).toContain(player);
    });
    
    it('should reject when session is full', () => {
      const session = new GameSessionManager();
      session.createSession({ maxPlayers: 2 });
      session.addPlayer('session-1', createTestPlayer());
      session.addPlayer('session-1', createTestPlayer());
      
      const result = session.addPlayer('session-1', createTestPlayer());
      expect(result).toBe(false);
    });
  });
});
```

---

### Integration Tests (30%)

**Purpose:** Verify component interactions

**Test Categories:**
1. API endpoint tests
2. Database operation tests
3. WebSocket communication tests
4. Redis cache integration tests
5. Multi-service flow tests

**Example:**
```typescript
// server/src/websocket/server.test.ts
describe('EventStream WebSocket', () => {
  let eventStream: EventStream;
  let io: SocketIOServer;
  
  beforeEach(async () => {
    const httpServer = createTestServer();
    const redis = new RedisService();
    const gameServer = new GameServer();
    eventStream = new EventStream(httpServer, redis, gameServer);
    io = eventStream.io;
  });
  
  it('should authenticate valid tokens', (done) => {
    const token = generateTestToken();
    
    const client = ioSocket('http://localhost', {
      auth: { token },
    });
    
    client.on('connect', () => {
      expect(client.connected).toBe(true);
      done();
    });
    
    client.on('connect_error', (err) => {
      done(err);
    });
  });
});
```

---

### End-to-End Tests (10%)

**Purpose:** Verify complete user journeys

**Test Scenarios:**
1. Player registration and login
2. Game creation and joining
3. Gameplay interactions
4. Player disconnect and reconnect
5. Multiplayer synchronization

**Example:**
```typescript
// web/src/e2e/gameplay.test.ts
describe('Gameplay Flow', () => {
  it('should allow player to join and play a game', async () => {
    const { page } = await createBrowser();
    
    // Login
    await page.goto('/login');
    await page.fill('[name=username]', 'testplayer');
    await page.click('button[type=submit]');
    
    // Create game
    await page.click('text=Create Game');
    await page.selectOption('[name=gameType]', 'chess');
    await page.click('text=Start Game');
    
    // Wait for game to start
    await expect(page.locator('.game-board')).toBeVisible();
    
    // Make a move
    await page.click('[data-piece="white-pawn"]');
    await page.click('[data-square="e4"]');
    
    // Verify move
    await expect(page.locator('[data-piece="white-pawn"]')).toHaveAttribute('data-square', 'e4');
  });
});
```

---

## Test Categories

### Functional Tests

| Area | Test Types | Tools |
|------|-----------|-------|
| Game logic | Rules, scoring, win conditions | Unit + Integration |
| Player management | Registration, profiles, stats | E2E + Integration |
| Game sessions | Create, join, leave, end | E2E + Integration |
| Real-time features | WebSocket, state sync | Integration + E2E |

### Performance Tests

**Load Testing:**
```typescript
// server/src/test/load.test.ts
describe('Performance', () => {
  it('should handle 1000 concurrent connections', async () => {
    const connections: Socket[] = [];
    const target = 1000;
    
    for (let i = 0; i < target; i++) {
      const socket = await connectWebSocket();
      connections.push(socket);
    }
    
    // Verify all connected
    expect(eventStream.getConnectionStats().totalConnections).toBe(target);
    
    // Simulate activity
    await simulateGameActivity(connections.slice(0, 100));
    
    // Measure latency
    const latencies = await measureLatency(100);
    expect(average(latencies)).toBeLessThan(100);  // < 100ms
  });
});
```

**Stress Testing:**
```typescript
describe('Stress Tests', () => {
  it('should recover from database connection loss', async () => {
    // Simulate database failure
    await database.disconnect();
    
    // Verify graceful degradation
    expect(api.healthCheck()).toMatchObject({ status: 'degraded' });
    
    // Verify recovery
    await database.reconnect();
    await waitForRecovery();
    
    expect(api.healthCheck()).toMatchObject({ status: 'healthy' });
  });
});
```

### Security Tests

**Authentication Tests:**
```typescript
// server/src/test/security/auth.test.ts
describe('Authentication Security', () => {
  it('should reject expired tokens', async () => {
    const expiredToken = generateToken({ exp: Date.now() / 1000 - 3600 });
    
    const response = await request(app)
      .get('/api/player')
      .set('Authorization', `Bearer ${expiredToken}`);
    
    expect(response.status).toBe(401);
  });
  
  it('should reject tokens with invalid signature', async () => {
    const invalidToken = generateInvalidToken();
    
    const response = await request(app)
      .get('/api/player')
      .set('Authorization', `Bearer ${invalidToken}`);
    
    expect(response.status).toBe(401);
  });
});
```

**Input Validation Tests:**
```typescript
describe('Input Validation', () => {
  it('should reject SQL injection in player name', async () => {
    const maliciousInput = "'; DROP TABLE players; --";
    
    const response = await request(app)
      .post('/api/player')
      .send({ name: maliciousInput });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('invalid');
  });
  
  it('should reject XSS in chat messages', async () => {
    const xssPayload = '<script>alert("xss")</script>';
    
    const response = await request(app)
      .post('/api/chat')
      .send({ message: xssPayload });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toContain('sanitized');
  });
});
```

**Rate Limiting Tests:**
```typescript
describe('Rate Limiting', () => {
  it('should block excessive requests from single IP', async () => {
    const requests = [];
    for (let i = 0; i < 101; i++) {
      requests.push(
        request(app).get('/api/leaderboard')
      );
    }
    
    const responses = await Promise.all(requests);
    const tooManyResponses = responses.filter(r => r.status === 429);
    
    expect(tooManyResponses.length).toBeGreaterThan(0);
  });
});
```

### Game-Specific Tests

**Game State Consistency:**
```typescript
describe('Game State Consistency', () => {
  it('should synchronize state across all players', async () => {
    const players = await createGameWithPlayers(4);
    
    // Player 1 makes a move
    await players[0].makeMove('e2', 'e4');
    
    // Verify all players see the same state
    for (const player of players) {
      const state = await player.getGameState();
      expect(state.board[52]).toEqual({ piece: 'white-pawn', to: 'e4' });
    }
  });
  
  it('should prevent illegal moves', async () => {
    const player = await createGameWithPlayer();
    
    const result = await player.makeMove('invalid');
    
    expect(result.success).toBe(false);
    expect(result.error).toContain('illegal');
  });
});
```

**Reconnection Handling:**
```typescript
describe('Reconnection', () => {
  it('should restore game state after disconnect', async () => {
    const player = await createGameWithPlayer();
    
    // Play some moves
    await player.makeMove('e2', 'e4');
    await player.makeMove('e7', 'e5');
    
    // Simulate disconnect
    await player.disconnect();
    await waitFor(5000);  // 5 second disconnect
    
    // Reconnect
    await player.reconnect();
    
    // Verify state restored
    const state = await player.getGameState();
    expect(state.board).toMatchSnapshot();
  });
});
```

---

## Test Environment Strategy

### Environment Matrix

| Environment | Purpose | Data | Isolation |
|-------------|---------|------|-----------|
| Local | Development | Synthetic | Per developer |
| CI | Automated testing | Synthetic | Per build |
| Staging | Pre-production | Anonymized prod | Shared |
| Production | Live monitoring | Real | N/A |

### Environment Configuration

```yaml
# docker-compose.test.yml
services:
  web-test:
    build: ./web
    environment:
      - NODE_ENV=test
      - API_URL=http://server-test:3001
    depends_on:
      - server-test
      - redis-test
      - postgres-test

  server-test:
    build: ./server
    environment:
      - NODE_ENV=test
      - REDIS_URL=redis://redis-test:6379
      - DATABASE_URL=postgresql://test@postgres-test/monkeytown_test
      - JWT_SECRET=test-secret
    depends_on:
      - redis-test
      - postgres-test

  redis-test:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  postgres-test:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=test
      - POSTGRES_PASSWORD=test
      - POSTGRES_DB=monkeytown_test
    ports:
      - "5432:5432"
```

---

## CI/CD Pipeline Integration

### Pipeline Stages

```
┌─────────────────────────────────────────────────────────────────┐
│  CI/CD Pipeline                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Build   │→ │  Lint    │→ │  Type    │→ │  Unit    │        │
│  │          │  │          │  │  Check   │  │  Tests   │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                              │                  │
│                                              ▼                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Deploy  │← │ Security │← │ Integ    │← │  E2E     │        │
│  │  Staging │  │  Scan    │  │  Tests   │  │  Tests   │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                              │                  │
│                                              ▼                  │
│                                        ┌──────────┐            │
│                                        │  Deploy  │            │
│                                        │Production│            │
│                                        └──────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Test Execution Commands

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run E2E tests only
npm run test:e2e

# Run tests with coverage
npm run test:coverage

# Run security tests
npm run test:security

# Run performance tests
npm run test:performance
```

### Quality Gates

| Gate | Criteria | Action on Fail |
|------|----------|----------------|
| Lint | No warnings | Block |
| Type Check | No errors | Block |
| Unit Tests | >80% coverage, all pass | Block |
| Integration Tests | All pass | Block |
| Security Scan | No critical/high | Block |
| E2E Tests | All critical pass | Block |
| Performance | <100ms latency | Warn |

---

## Test Data Management

### Data Factories

```typescript
// test/factories/player.ts
function createTestPlayer(overrides: Partial<Player> = {}): Player {
  return {
    id: uuid(),
    name: `TestPlayer_${Math.random().toString(36).slice(2)}`,
    avatar: 'default_avatar',
    position: { x: 0, y: 0 },
    score: 0,
    status: 'connected',
    isAI: false,
    ...overrides,
  };
}

// test/factories/game.ts
function createTestSession(overrides: Partial<GameSession> = {}): GameSession {
  return {
    id: uuid(),
    config: {
      maxPlayers: 4,
      duration: 600,
      rules: {
        allowChat: true,
        allowSpectators: true,
        friendlyFire: false,
        winCondition: 'score',
      },
      aiDifficulty: 'medium',
    },
    state: {
      entities: new Map(),
      timestamp: Date.now(),
      tick: 0,
    },
    players: [],
    status: 'waiting',
    createdAt: Date.now(),
    ...overrides,
  };
}
```

### Test Data Cleanup

```typescript
afterEach(async () => {
  // Clean up test data
  await database.cleanup();
  await redis.flushall();
  
  // Close connections
  await browser.close();
  
  // Clean up files
  await fs.remove(testArtifactsDir);
});
```

---

## Reporting and Metrics

### Test Reports

| Report Type | Generation | Audience |
|-------------|-----------|----------|
| Unit Test | Every commit | Developers |
| Integration Test | Every PR | Developers |
| E2E Test | Daily | QA + Developers |
| Security Scan | Weekly | Security Lead |
| Performance Report | Weekly | All team |

### Key Metrics Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  Test Quality Dashboard                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Test Coverage: ████████████████████░░░░ 85%                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Unit Tests: 245 passed, 3 failed                          │   │
│  │ Integration: 78 passed, 2 failed                          │   │
│  │ E2E Tests: 32 passed, 1 failed                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Performance:                                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Avg Response: 45ms  ████████████████████░░░░             │   │
│  │ P95 Response: 120ms ████████████████████░░░░             │   │
│  │ Error Rate: 0.1%   █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Security:                                                       │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Critical: 0  High: 2  Medium: 5  Low: 12                  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

*Test Strategy Version: 1.0*
*Last Updated: 2026-01-18*
*JungleSecurity - Quality through testing*
