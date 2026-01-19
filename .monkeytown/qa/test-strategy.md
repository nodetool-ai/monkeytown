# Monkeytown Test Strategy v2.1

**Comprehensive quality assurance approach for multiplayer game platform**

**Version:** 2.1
**Date:** 2026-01-19
**QA Lead:** JungleSecurity
**Status:** ACTIVE

---

## Executive Summary

This test strategy defines the quality assurance approach for Monkeytown, covering all testing levels from unit tests to end-to-end validation. The strategy is derived from security requirements and vulnerability assessments, ensuring comprehensive coverage of critical functionality.

**Key Updates in v2.1:**
- Added security-specific test requirements based on new vulnerabilities (VULN-001, VULN-002, VULN-003)
- Enhanced game action validation testing
- Added WebSocket security testing
- Updated test coverage targets for security-critical modules

---

## Quality Objectives

| Objective | Target | Measurement |
|-----------|--------|-------------|
| Game functionality | 99% of features working | Automated test pass rate |
| Security vulnerabilities | Zero critical/high | Vulnerability scan results |
| Performance | 60fps, <100ms latency | Performance benchmarks |
| Availability | 99.9% uptime | Monitoring metrics |
| User satisfaction | >4.5/5 rating | Player feedback |
| Security test coverage | 95% for critical modules | Code coverage report |

---

## Test Pyramid

```
                     ▲
                    /█\        E2E Tests (10%)
                   / █ \       Critical path validation
                  /  █  \
                 /───█───\     Integration Tests (30%)
                /    █    \    Service interactions
               /     █     \
              /──────█──────\  Unit Tests (60%)
             /       █       \ Component validation
            /        █        \
           ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
```

### Unit Tests (60%)

**Purpose:** Verify individual components in isolation

**Coverage Targets:**
- Authentication: **95%** (CRITICAL)
- Game Logic: **95%** (CRITICAL)
- Input Validation: **95%** (CRITICAL)
- Authorization: **95%** (HIGH)
- Data Validation: **90%** (HIGH)
- Utility Functions: **85%** (MEDIUM)

**Frameworks:**
- Frontend: Vitest, React Testing Library
- Backend: Jest, Vitest
- Shared: Vitest

**Example - Authentication Tests:**
```typescript
// server/src/auth/token-service.test.ts
describe('TokenService', () => {
  describe('generateToken', () => {
    it('should generate unique tokens', () => {
      const token1 = tokenService.generateToken({
        playerId: 'player-1',
        sessionId: 'session-1',
        ip: '192.168.1.1',
        userAgent: 'TestAgent/1.0',
      });
      
      const token2 = tokenService.generateToken({
        playerId: 'player-2',
        sessionId: 'session-2',
        ip: '192.168.1.2',
        userAgent: 'TestAgent/1.0',
      });
      
      expect(token1).not.toEqual(token2);
    });
    
    it('should include required claims', () => {
      const token = tokenService.generateToken({
        playerId: 'player-1',
        sessionId: 'session-1',
        ip: '192.168.1.1',
        userAgent: 'TestAgent/1.0',
      });
      
      const decoded = jwt.decode(token) as TokenPayload;
      expect(decoded.playerId).toBe('player-1');
      expect(decoded.sessionId).toBe('session-1');
      expect(decoded.ip).toBe('192.168.1.1');
      expect(decoded.exp).toBeDefined();
      expect(decoded.iat).toBeDefined();
    });
  });
  
  describe('validateToken', () => {
    it('should reject tokens with wrong secret', () => {
      const token = jwt.sign(
        { playerId: 'player-1' },
        'wrong-secret'
      );
      
      expect(() => tokenService.validateToken(token))
        .toThrow('Token validation failed');
    });
    
    it('should reject expired tokens', () => {
      const token = jwt.sign(
        { 
          playerId: 'player-1',
          exp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
        },
        process.env.JWT_SECRET!
      );
      
      expect(() => tokenService.validateToken(token))
        .toThrow('Token validation failed');
    });
  });
});
```

---

### Integration Tests (30%)

**Purpose:** Verify component interactions and service integration

**Test Categories:**
1. API endpoint tests (Express routes)
2. WebSocket communication tests (Socket.IO)
3. Database operation tests (PostgreSQL)
4. Redis cache integration tests
5. Multi-service flow tests

**Example - WebSocket Integration Tests:**
```typescript
// server/src/websocket/event-stream.test.ts
describe('EventStream WebSocket', () => {
  let eventStream: EventStream;
  let httpServer: http.Server;
  let redisService: RedisService;
  let gameServer: GameServer;
  
  beforeEach(async () => {
    httpServer = createTestServer();
    redisService = new RedisService();
    gameServer = new GameServer();
    eventStream = new EventStream(httpServer, redisService, gameServer);
  });
  
  afterEach(async () => {
    await eventStream.close();
    httpServer.close();
  });
  
  describe('Authentication', () => {
    it('should accept valid tokens', (done) => {
      const token = generateValidTestToken();
      
      const client = ioClient('http://localhost:8080', {
        auth: { token },
      });
      
      client.on('connect', () => {
        expect(client.connected).toBe(true);
        client.disconnect();
        done();
      });
      
      client.on('connect_error', (err) => {
        done(err);
      });
    });
    
    it('should reject missing tokens', (done) => {
      const client = ioClient('http://localhost:8080');
      
      client.on('connect', () => {
        done(new Error('Should not have connected'));
      });
      
      client.on('connect_error', (err) => {
        expect(err.message).toContain('Authentication required');
        client.disconnect();
        done();
      });
    });
    
    it('should reject expired tokens', (done) => {
      const token = generateExpiredTestToken();
      
      const client = ioClient('http://localhost:8080', {
        auth: { token },
      });
      
      client.on('connect', () => {
        done(new Error('Should not have connected'));
      });
      
      client.on('connect_error', (err) => {
        expect(err.message).toContain('Authentication failed');
        client.disconnect();
        done();
      });
    });
  });
  
  describe('Rate Limiting', () => {
    it('should limit game:input messages', async () => {
      const token = generateValidTestToken();
      const client = ioClient('http://localhost:8080', {
        auth: { token },
      });
      
      await new Promise<void>((resolve) => {
        client.on('connect', resolve);
      });
      
      // Send 15 messages rapidly
      for (let i = 0; i < 15; i++) {
        client.emit('game:input', { position: { x: i, y: i } });
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Count rate limit errors
      const rateLimitErrors = getReceivedEvents()
        .filter(e => e.type === 'error' && e.payload.code === 'RATE_LIMIT_EXCEEDED');
      
      expect(rateLimitErrors.length).toBeGreaterThanOrEqual(5);
      
      client.disconnect();
    });
  });
});
```

---

### End-to-End Tests (10%)

**Purpose:** Verify complete user journeys from browser to server

**Test Scenarios:**
1. Player registration and login
2. Game creation and joining
3. Gameplay interactions (moves, actions)
4. Player disconnect and reconnect
5. Multiplayer synchronization
6. Security attack scenarios

**Example - E2E Security Tests:**
```typescript
// web/src/e2e/security.test.ts
import { test, expect } from '@playwright/test';

test.describe('Security E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  
  test('should not allow XSS in chat', async ({ page }) => {
    // Login first
    await loginAsTestPlayer(page);
    
    // Join a game
    await page.click('[data-testid="join-game"]');
    await expect(page.locator('.game-board')).toBeVisible();
    
    // Send XSS payload in chat
    await page.fill('[data-testid="chat-input"]', '<script>alert("xss")</script>');
    await page.click('[data-testid="send-chat"]');
    
    // Verify no alert was triggered (page should not have JS error)
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));
    
    // Wait a moment for any potential execution
    await page.waitForTimeout(1000);
    
    // Verify message was sanitized or rejected
    const chatMessage = page.locator('[data-testid="chat-message"]').last();
    await expect(chatMessage).not.toContain('<script>');
    
    // Verify no JS errors occurred
    expect(errors.filter(e => e.includes('alert') || e.includes('xss'))).toHaveLength(0);
  });
  
  test('should enforce action rate limits', async ({ page }) => {
    await loginAsTestPlayer(page);
    await page.click('[data-testid="join-game"]');
    await expect(page.locator('.game-board')).toBeVisible();
    
    // Rapidly send game actions
    for (let i = 0; i < 15; i++) {
      await page.locator('.game-board').click({ position: { x: 100 + i, y: 100 + i } });
    }
    
    // Wait for rate limiting to kick in
    await page.waitForTimeout(500);
    
    // Verify rate limit notification appeared
    const toast = page.locator('[data-testid="rate-limit-toast"]');
    await expect(toast).toBeVisible();
  });
});
```

---

## Test Categories

### Functional Tests

| Area | Test Types | Tools | Coverage Target |
|------|-----------|-------|-----------------|
| Game logic | Rules, scoring, win conditions | Unit + Integration | 95% |
| Player management | Registration, profiles, stats | E2E + Integration | 90% |
| Game sessions | Create, join, leave, end | E2E + Integration | 95% |
| Real-time features | WebSocket, state sync | Integration + E2E | 95% |
| Authentication | Login, logout, token management | All levels | 95% |

### Security Tests

**Input Validation Tests:**
```typescript
describe('Input Validation Security', () => {
  describe('Position Validation', () => {
    it('should reject positions outside game bounds', () => {
      const validator = new GameActionValidator({
        maxPositionX: 1000,
        maxPositionY: 1000,
        maxMoveSpeed: 100,
        minActionIntervalMs: 500,
      });
      
      const result = validator.validateMoveAction(
        mockPlayer,
        { position: { x: 99999, y: 99999 } }
      );
      
      expect(result.valid).toBe(false);
      expect(result.error).toBe('POSITION_OUT_OF_BOUNDS');
    });
    
    it('should reject teleportation attempts', () => {
      const validator = new GameActionValidator({
        maxPositionX: 1000,
        maxPositionY: 1000,
        maxMoveSpeed: 100,
        minActionIntervalMs: 500,
      });
      
      // Player at (0,0), trying to move to (500, 500) - distance ~707 > 100
      const result = validator.validateMoveAction(
        { ...mockPlayer, position: { x: 0, y: 0 } },
        { position: { x: 500, y: 500 } }
      );
      
      expect(result.valid).toBe(false);
      expect(result.error).toBe('SPEED_VIOLATION');
    });
  });
  
  describe('SQL Injection Prevention', () => {
    it('should reject SQL injection in player names', async () => {
      const response = await request(app)
        .post('/api/player')
        .send({ name: "'; DROP TABLE players; --" });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toContain('invalid');
    });
    
    it('should sanitize special characters in input', () => {
      const sanitizer = new InputSanitizer();
      const result = sanitizer.sanitizePlayerName(
        "Robert'; DROP TABLE players; --"
      );
      
      expect(result.sanitized).not.toContain("'");
      expect(result.sanitized).not.toContain(';');
    });
  });
  
  describe('XSS Prevention', () => {
    it('should sanitize XSS in chat messages', () => {
      const sanitizer = new InputSanitizer();
      const result = sanitizer.sanitizeChatMessage(
        '<script>alert("xss")</script>'
      );
      
      expect(result.sanitized).not.toContain('<script>');
      expect(result.sanitized).not.toContain('</script>');
    });
  });
});
```

**Rate Limiting Tests:**
```typescript
describe('Rate Limiting Security', () => {
  it('should block excessive WebSocket connections from same IP', async () => {
    const connections: Socket[] = [];
    
    // Attempt 15 connections from same IP
    for (let i = 0; i < 15; i++) {
      const socket = ioClient('http://localhost:8080', {
        auth: { token: generateValidTestToken() },
      });
      connections.push(socket);
    }
    
    // Allow connection attempts
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Count successful connections
    const successfulConnections = connections.filter(s => s.connected);
    
    // Should be limited to 10
    expect(successfulConnections.length).toBeLessThanOrEqual(10);
    
    // Cleanup
    connections.forEach(s => s.disconnect());
  });
  
  it('should track rate limits per action type', async () => {
    const socket = ioClient('http://localhost:8080', {
      auth: { token: generateValidTestToken() },
    });
    
    await new Promise<void>((resolve) => {
      socket.on('connect', resolve);
    });
    
    // Send chat messages (limit is 2 per second)
    for (let i = 0; i < 5; i++) {
      socket.emit('game:chat', { message: `Test ${i}` });
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const errors = getReceivedEvents().filter(
      e => e.type === 'error' && e.payload.code === 'RATE_LIMIT_EXCEEDED'
    );
    
    expect(errors.length).toBeGreaterThanOrEqual(3);
    
    socket.disconnect();
  });
});
```

### Performance Tests

```typescript
describe('Performance Tests', () => {
  it('should handle 1000 concurrent WebSocket connections', async () => {
    const connections: Socket[] = [];
    const target = 1000;
    
    // Connect 1000 clients
    for (let i = 0; i < target; i++) {
      const socket = ioClient('http://localhost:8080', {
        auth: { token: generateValidTestToken() },
      });
      connections.push(socket);
    }
    
    // Wait for all connections
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const connectedCount = connections.filter(s => s.connected).length;
    expect(connectedCount).toBeGreaterThanOrEqual(target * 0.95); // 95% success
    
    // Cleanup
    connections.forEach(s => s.disconnect());
  });
  
  it('should maintain <100ms latency under load', async () => {
    // Create 100 connected clients
    const clients = await createConnectedClients(100);
    
    // Measure latency for state updates
    const latencies: number[] = [];
    
    for (const client of clients) {
      const start = Date.now();
      
      // Wait for next state update
      await new Promise<void>((resolve) => {
        client.once('game:state', () => {
          latencies.push(Date.now() - start);
          resolve();
        });
        
        // Trigger state update
        client.emit('game:input', { position: { x: 100, y: 100 } });
      });
      
      if (latencies.length >= 50) break;
    }
    
    const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length;
    expect(avgLatency).toBeLessThan(100);
    
    // Cleanup
    clients.forEach(s => s.disconnect());
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

### CI/CD Pipeline Integration

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
| Unit Tests | >90% coverage, all pass | Block |
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
    lastActionTime: null,
    ...overrides,
  };
}

// test/factories/game-session.ts
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
      maxMoveSpeed: 100,
      minActionInterval: 500,
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

### Quality Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  Test Quality Dashboard                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Test Coverage: ████████████████████████░░░░ 92%                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Authentication: 97%  ████████████████████████████░░░     │   │
│  │ Game Logic: 95%     ████████████████████████████░░░     │   │
│  │ Input Validation: 96% ████████████████████████████░░░    │   │
│  │ Authorization: 94%   ███████████████████████████░░░░     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Test Results (Last Run):                                        │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Unit Tests: 312 passed, 0 failed                         │   │
│  │ Integration: 87 passed, 1 failed                         │   │
│  │ E2E Tests: 42 passed, 2 failed (non-critical)            │   │
│  │ Security: 15 passed, 0 vulnerabilities                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Performance:                                                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Avg Response: 45ms  ████████████████████████░░░░         │   │
│  │ P95 Response: 85ms  ██████████████████████░░░░░░         │   │
│  │ Error Rate: 0.05%  █░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## References

- Vulnerability Assessment: `.monkeytown/security/vulnerability-assessment.md`
- Security Requirements: `.monkeytown/security/security-requirements.md`
- Quality Gates: `.monkeytown/qa/quality-gates.md`
- Test Cases: `.monkeytown/qa/test-cases.md`

---

*Test Strategy Version: 2.1*
*Last Updated: 2026-01-19*
*JungleSecurity - Quality through testing*
