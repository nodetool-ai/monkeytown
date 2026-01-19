# Monkeytown Test Strategy v2.0

**Comprehensive quality assurance approach for multiplayer game platform**

**Version:** 2.0
**Date:** 2026-01-19
**Agent:** JungleSecurity

---

## Quality Objectives

| Objective | Target | Measurement |
|-----------|--------|-------------|
| Game functionality | 99% of features working | Automated test pass rate |
| Security vulnerabilities | Zero critical/high | Vulnerability scan results |
| Performance | 60fps, <100ms latency | Performance benchmarks |
| Availability | 99.9% uptime | Monitoring metrics |
| Test coverage | >80% overall | Coverage reports |

---

## Test Pyramid

```
                    ▲
                   /█\        E2E Tests (Playwright)
                  / █ \       (10%)
                 /  █  \
                /───█───\     Integration Tests
               /    █    \    (30%)
              /     █     \
             /──────█──────\  Unit Tests (Vitest)
            /       █       \ (60%)
           /        █        \
          ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
```

### Unit Tests (60%)

**Framework:** Vitest (`server/src/game/*.test.ts`, `web/src/test/`)

**Coverage Targets:**
- Game logic: 95%
- Authentication: 95%
- Data validation: 90%
- Utility functions: 85%

**Current Implementation:**
```typescript
// server/src/game/babel-engine.test.ts (verified)
import { describe, it, expect } from 'vitest';
import { BabelGameEngine, createBabelDeck, dealInitialHands } from './babel-engine.js';

describe('BabelGameEngine', () => {
  describe('Deck Creation', () => {
    it('should create a deck with 100 cards (4 suits × 25 values)', () => {
      const deck = createBabelDeck();
      expect(deck).toHaveLength(100);
    });
  });
});
```

### Integration Tests (30%)

**Test Categories:**
1. API endpoint tests
2. Database operation tests
3. WebSocket communication tests
4. Redis cache integration tests
5. Multi-service flow tests

**Example:**
```typescript
// server/src/websocket/server.test.ts (example pattern)
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
    const client = ioSocket('http://localhost', { auth: { token } });
    
    client.on('connect', () => {
      expect(client.connected).toBe(true);
      done();
    });
  });
});
```

### End-to-End Tests (10%)

**Framework:** Playwright (`web/e2e/`)

**Configuration:** `.github/workflows/ci-cd.yml:68-111`

**Test Scenarios:**
1. Player registration and login
2. Game creation and joining
3. Gameplay interactions
4. Player disconnect and reconnect
5. Multiplayer synchronization

---

## Actual CI/CD Pipeline

**File:** `.github/workflows/ci-cd.yml` (verified)

```
┌─────────────────────────────────────────────────────────────────┐
│  CI/CD Pipeline                                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Build   │→ │  Lint    │→ │  Type    │→ │  Test    │        │
│  │          │  │          │  │  Check   │  │ (Vitest) │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                              │                  │
│                                              ▼                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Deploy  │← │ Security │← │   E2E    │← │  Build   │        │
│  │Production│  │  Scan    │  │(Playwright)│ │  Docker │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Pipeline Jobs (Verified)

| Job | Dependencies | Purpose |
|-----|--------------|---------|
| `lint` | - | `npm run lint` |
| `test` | lint | `npm test` (Vitest) |
| `e2e-tests` | test | Playwright on PR |
| `build-web` | test, e2e-tests | Docker build web |
| `build-server` | test | Docker build server |
| `deploy-staging` | build-web, build-server | AWS ECS |
| `deploy-production` | build-web, build-server | On release |

---

## Security Testing

### Authentication Tests

```typescript
// server/src/test/security/auth.test.ts (example)
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

### Input Validation Tests

```typescript
describe('Input Validation', () => {
  it('should reject SQL injection in player name', async () => {
    const maliciousInput = "'; DROP TABLE players; --";
    const response = await request(app)
      .post('/api/player')
      .send({ name: maliciousInput });
    expect(response.status).toBe(400);
  });
  
  it('should reject XSS in chat messages', async () => {
    const xssPayload = '<script>alert("xss")</script>';
    const response = await request(app)
      .post('/api/chat')
      .send({ message: xssPayload });
    expect(response.status).toBe(400);
  });
});
```

### Rate Limiting Tests

```typescript
describe('Rate Limiting', () => {
  it('should block excessive requests from single IP', async () => {
    const requests = [];
    for (let i = 0; i < 101; i++) {
      requests.push(request(app).get('/api/leaderboard'));
    }
    const responses = await Promise.all(requests);
    const tooManyResponses = responses.filter(r => r.status === 429);
    expect(tooManyResponses.length).toBeGreaterThan(0);
  });
});
```

---

## Game-Specific Tests

### TicTacToe Engine Tests

**Location:** `server/src/game/tictactoe-engine.test.ts` (referenced)

```typescript
describe('TicTacToeEngine', () => {
  describe('processAction', () => {
    it('should reject move outside board', () => {
      const engine = createTestEngine();
      const result = engine.processAction('p1', { type: 'place', row: 5, col: 5 });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid position');
    });
    
    it('should reject move on occupied cell', () => {
      const engine = createTestEngine();
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });
      const result = engine.processAction('p2', { type: 'place', row: 0, col: 0 });
      expect(result.success).toBe(false);
      expect(result.error).toContain('Cell is already occupied');
    });
  });
});
```

### Babel Engine Tests

**Location:** `server/src/game/babel-engine.test.ts` (verified - 695 lines)

```typescript
describe('BabelGameEngine', () => {
  describe('Card Play', () => {
    it('should not allow playing other player\'s card', () => {
      const engine = createTestEngine();
      engine.startGame();
      
      const p2Hand = engine.getPlayerHand('p2');
      const cardToPlay = p2Hand[0];
      
      const result = engine.processAction('p1', { type: 'play_card', cardId: cardToPlay.id });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Card not in hand');
    });
  });
  
  describe('Action Validation', () => {
    it('should validate valid actions', () => {
      const engine = createTestEngine();
      engine.startGame();
      
      const hand = engine.getPlayerHand('p1');
      expect(engine.isValidAction('p1', { type: 'play_card', cardId: hand[0].id })).toBe(true);
    });
    
    it('should reject invalid actions', () => {
      const engine = createTestEngine();
      engine.startGame();
      
      expect(engine.isValidAction('p2', { type: 'pass' })).toBe(false);
      expect(engine.isValidAction('p1', { type: 'play_card', cardId: 'invalid' })).toBe(false);
    });
  });
});
```

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
    score: 0,
    type: 'human',
    isConnected: true,
    ...overrides,
  };
}

// test/factories/session.ts
function createTestSession(overrides: Partial<GameSession> = {}): GameSession {
  return {
    id: uuid(),
    config: {
      maxPlayers: 4,
      gameType: 'tictactoe',
      aiDifficulty: 'medium',
      rules: {
        allowChat: true,
        allowSpectators: true,
      },
    },
    state: null,
    players: [],
    status: 'waiting',
    createdAt: Date.now(),
    ...overrides,
  };
}
```

---

## Quality Gates

### Current Gates (from `.github/workflows/ci-cd.yml`)

| Gate | Criteria | Action on Fail |
|------|----------|----------------|
| Lint | `npm run lint` passes | Block |
| Type Check | `npm run build` succeeds | Block |
| Unit Tests | `npm test` passes | Block |
| E2E Tests | Playwright tests pass (PR) | Block PR |
| Security Scan | No critical vulnerabilities | Block |

---

## Test Execution Commands

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run E2E tests only (from web directory)
cd web && npx playwright test

# Run tests with coverage
npm run test:coverage

# Run security tests
npm run test:security

# Run performance tests
npm run test:performance
```

---

*Test Strategy Version: 2.0*
*Last Updated: 2026-01-19*
*JungleSecurity - Based on actual CI/CD configuration*
