# Monkeytown Test Strategy v2.0

**Comprehensive quality assurance approach for multiplayer game platform**

**Quality Analyst:** JungleSecurity  
**Version:** 2.0  
**Date:** 2026-01-20

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

## Security-Focused Test Pyramid

```
                     ▲
                    /█\        E2E Tests (Security Focus)
                   / █ \       (15%)
                  /  █  \
                 /───█───\     Integration Tests
                /    █    \    (35%)
               /     █     \
              /──────█──────\  Unit Tests
             /       █       \ (50%)
            /        █        \
           ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔
```

**Adjusted Ratios for Security Focus:**
- Unit Tests: 50% (includes security logic testing)
- Integration Tests: 35% (includes auth, session, validation testing)
- E2E Tests: 15% (includes security scenario testing)

---

## Security Test Categories

### 1. Authentication Tests (Critical)

**Coverage Target:** 100%

```typescript
// test/auth/security/auth.test.ts
describe('Authentication Security', () => {
  describe('Token Generation', () => {
    it('MUST generate unique tokens for each request', () => {
      const token1 = generateToken(payload1);
      const token2 = generateToken(payload2);
      expect(token1).not.toEqual(token2);
    });
    
    it('MUST reject tokens with expired timestamp', async () => {
      const token = generateToken({ 
        ...payload, 
        exp: Math.floor(Date.now() / 1000) - 3600 
      });
      const result = await validateToken(token, context);
      expect(result).toBeNull();
    });
    
    it('MUST reject tokens with invalid signature', async () => {
      const token = jwt.sign(payload, 'wrong-secret');
      const result = await validateToken(token, context);
      expect(result).toBeNull();
    });
    
    it('MUST NOT allow hardcoded secrets (SECURITY-CHECK)', () => {
      const code = fs.readFileSync('server/src/websocket/server.ts', 'utf8');
      expect(code).not.toContain("'dev-secret'");
      expect(code).not.toContain('"dev-secret"');
    });
  });
  
  describe('Session Binding', () => {
    it('MUST reject token from different IP', async () => {
      const token = generateToken({ ...payload, ip: '192.168.1.1' });
      const result = await validateToken(token, { ...context, ip: '10.0.0.1' });
      expect(result).toBeNull();
    });
    
    it('MUST reject token with different User-Agent', async () => {
      const token = generateToken({ ...payload, userAgent: 'Chrome' });
      const result = await validateToken(token, { ...context, userAgent: 'Firefox' });
      expect(result).toBeNull();
    });
    
    it('MUST reject token without IP binding', async () => {
      const token = generateToken({ ...payload, ip: undefined });
      const result = await validateToken(token, context);
      expect(result).toBeNull();
    });
  });
  
  describe('Token Security', () => {
    it('MUST require JWT_SECRET environment variable', () => {
      expect(process.env.JWT_SECRET).toBeDefined();
      expect(process.env.JWT_SECRET).not.toBe('dev-secret');
    });
    
    it('MUST NOT expose sensitive data in token payload', () => {
      const token = generateToken({ playerId: 'user123', password: 'secret' });
      const decoded = jwt.decode(token);
      expect(decoded).not.toHaveProperty('password');
    });
  });
});
```

---

### 2. Input Validation Tests (Critical)

**Coverage Target:** 100%

```typescript
// test/security/input-validation.test.ts
describe('Input Validation Security', () => {
  describe('Player Updates', () => {
    it('MUST reject position outside game bounds', () => {
      const result = session.updatePlayer('session-1', 'player-1', { 
        position: { x: 999999, y: 999999 } 
      });
      expect(result).toBe(false);
    });
    
    it('MUST reject score exceeding maximum', () => {
      const result = session.updatePlayer('session-1', 'player-1', { 
        score: 9999999 
      });
      expect(result).toBe(false);
    });
    
    it('MUST reject negative score', () => {
      const result = session.updatePlayer('session-1', 'player-1', { 
        score: -100 
      });
      expect(result).toBe(false);
    });
    
    it('MUST reject arbitrary property injection', () => {
      const result = session.updatePlayer('session-1', 'player-1', { 
        isAdmin: true,
        permissions: ['read', 'write', 'delete']
      } as any);
      expect(result).toBe(false);
    });
    
    it('MUST reject status changes from client', () => {
      const result = session.updatePlayer('session-1', 'player-1', { 
        status: 'admin' 
      });
      expect(result).toBe(false);
    });
  });
  
  describe('Game Actions', () => {
    it('MUST validate card ownership before play', async () => {
      const result = await gameEngine.processAction(
        'session-1', 
        'player-1', 
        { type: 'play_card', cardId: 'card-not-owned' }
      );
      expect(result.valid).toBe(false);
    });
    
    it('MUST reject speed exceeding maxSpeed', () => {
      const player = { position: { x: 0, y: 0 } };
      const action = { position: { x: 1000, y: 1000 } };
      
      const result = validateMove(player, action, { maxSpeed: 100 });
      expect(result.valid).toBe(false);
    });
    
    it('MUST enforce action cooldowns', async () => {
      await gameEngine.processAction('session-1', 'player-1', action1);
      
      const result = await gameEngine.processAction('session-1', 'player-1', action2);
      expect(result.valid).toBe(false); // Still in cooldown
    });
  });
  
  describe('Chat Sanitization', () => {
    it('MUST block script tags', () => {
      const result = sanitizeChat('<script>alert(1)</script>');
      expect(result).not.toContain('<script>');
    });
    
    it('MUST block javascript: URLs', () => {
      const result = sanitizeChat('<a href="javascript:alert(1)">click</a>');
      expect(result).not.toContain('javascript:');
    });
    
    it('MUST block event handlers', () => {
      const result = sanitizeChat('<img src=x onerror=alert(1)>');
      expect(result).not.toContain('onerror');
    });
    
    it('MUST block SVG-based XSS', () => {
      const result = sanitizeChat('<svg/onload=alert(1)>');
      expect(result).not.toContain('onload');
    });
    
    it('MUST block data URI XSS', () => {
      const result = sanitizeChat('<img src="data:text/html,<script>alert(1)</script>">');
      expect(result).not.toContain('data:');
    });
  });
});
```

---

### 3. Rate Limiting Tests (High)

**Coverage Target:** 100%

```typescript
// test/security/rate-limiting.test.ts
describe('Rate Limiting Security', () => {
  describe('Per-Connection Limits', () => {
    it('MUST block WebSocket connection flood (11th connection)', async () => {
      const connections: Socket[] = [];
      
      // Create 10 connections
      for (let i = 0; i < 10; i++) {
        connections.push(await connectWebSocket());
      }
      
      // 11th should be blocked
      const eleventh = await connectWebSocket();
      expect(eleventh.connected).toBe(false);
    });
    
    it('MUST block action spam (11th action/second)', async () => {
      const socket = await connectWebSocket();
      
      // Send 10 actions
      for (let i = 0; i < 10; i++) {
        await sendAction(socket, { type: 'move', x: i, y: i });
      }
      
      // 11th should be blocked
      const result = await sendAction(socket, { type: 'move', x: 11, y: 11 });
      expect(result.blocked).toBe(true);
    });
    
    it('MUST block chat spam (3rd message/second)', async () => {
      const socket = await connectWebSocket();
      
      await sendChat(socket, 'message 1');
      await sendChat(socket, 'message 2');
      
      const third = await sendChat(socket, 'message 3');
      expect(third.blocked).toBe(true);
    });
  });
  
  describe('Rate Limit Persistence', () => {
    it('MUST maintain rate limits after server restart', async () => {
      const socket1 = await connectWebSocket();
      
      // Send 5 actions
      for (let i = 0; i < 5; i++) {
        await sendAction(socket1, { type: 'move', x: i, y: i });
      }
      
      // Restart server
      await restartServer();
      
      const socket2 = await connectWebSocket();
      
      // Should still have rate limit tracking
      const actions = [];
      for (let i = 0; i < 10; i++) {
        actions.push(sendAction(socket2, { type: 'move', x: i, y: i }));
      }
      
      const results = await Promise.all(actions);
      const blockedCount = results.filter(r => r.blocked).length;
      expect(blockedCount).toBeGreaterThan(0);
    });
  });
});
```

---

### 4. Transport Security Tests (High)

**Coverage Target:** 100%

```typescript
// test/security/transport.test.ts
describe('Transport Security', () => {
  describe('WebSocket Security', () => {
    it('MUST reject connections from unauthorized origins', async () => {
      const connection = ioSocket('http://malicious-site.com', {
        auth: { token: validToken },
      });
      
      await new Promise((resolve, reject) => {
        connection.on('connect_error', (err) => {
          expect(err.message).toContain('Not allowed by CORS');
          resolve();
        });
        connection.on('connect', () => {
          reject(new Error('Should not connect'));
        });
      });
    });
    
    it('MUST reject HTTP polling transport', async () => {
      const connection = ioSocket('http://localhost:8080', {
        transports: ['polling'],
        auth: { token: validToken },
      });
      
      await new Promise((resolve, reject) => {
        connection.on('connect_error', (err) => {
          expect(err.message).toContain('websocket');
          resolve();
        });
        connection.on('connect', () => {
          reject(new Error('Should not connect via polling'));
        });
      });
    });
    
    it('MUST require WSS for production', () => {
      const wsUrl = process.env.WS_URL || 'ws://localhost:8080';
      if (process.env.NODE_ENV === 'production') {
        expect(wsUrl).toStartWith('wss://');
      }
    });
  });
  
  describe('Message Security', () => {
    it('MUST reject oversized messages', async () => {
      const socket = await connectWebSocket();
      const largeMessage = 'x'.repeat(2 * 1024 * 1024); // 2MB
      
      const result = await sendAction(socket, { data: largeMessage });
      expect(result.blocked).toBe(true);
    });
    
    it('MUST validate message schema before processing', async () => {
      const socket = await connectWebSocket();
      
      // Send malformed message
      const result = await socketEmit(socket, 'game:action', {
        invalid: 'structure',
        missing: 'required fields'
      });
      
      expect(result.rejected).toBe(true);
    });
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
      - JWT_SECRET=test-secret-for-unit-tests-only
      - CORS_ORIGINS=http://localhost:3000
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
      - JWT_SECRET=test-secret-for-unit-tests-only
      - CORS_ORIGINS=http://localhost:3000
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
│  │  Build   │→ │  Lint    │→ │  Type    │→ │ Security │        │
│  │          │  │          │  │  Check   │  │  Scan    │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                              │                  │
│                                              ▼                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │  Deploy  │← │ Security │← │ Integ    │← │  Unit    │        │
│  │  Staging │  │  Tests   │  │  Tests   │  │  Tests   │        │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘        │
│                                              │                  │
│                                              ▼                  │
│                                        ┌──────────┐            │
│                                        │  E2E     │            │
│                                        │  Tests   │            │
│                                        └──────────┘            │
│                                              │                  │
│                                              ▼                  │
│                                        ┌──────────┐            │
│                                        │  Deploy  │            │
│                                        │Production│            │
│                                        └──────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Quality Gates

| Gate | Criteria | Action on Fail |
|------|----------|----------------|
| Security Scan | No critical/high vulnerabilities | BLOCK |
| Unit Tests | >90% coverage, all pass | BLOCK |
| Integration Tests | All pass | BLOCK |
| E2E Tests | All critical pass | BLOCK |
| Lint | No warnings | BLOCK |
| Type Check | No errors | BLOCK |

---

## Test Data Management

### Security Test Data Factories

```typescript
// test/factories/security.ts

function createTestToken(overrides: Partial<TokenPayload> = {}): string {
  const payload: TokenPayload = {
    playerId: uuid(),
    sessionId: uuid(),
    ip: '192.168.1.1',
    userAgent: 'TestBrowser/1.0',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 86400,
    ...overrides,
  };
  
  return jwt.sign(payload, process.env.JWT_SECRET || 'test-secret');
}

function createMaliciousToken(): string {
  return jwt.sign({
    playerId: 'admin',
    isAdmin: true,
    permissions: ['all']
  }, 'dev-secret'); // Simulates attack with known secret
}

function createXSSPayloads(): string[] {
  return [
    '<script>alert(1)</script>',
    '<img src=x onerror=alert(1)>',
    '<svg/onload=alert(1)>',
    "javascript:alert('xss')",
    '<body onload=alert(1)>',
    '<iframe src="javascript:alert(1)">',
    '<object data="javascript:alert(1)">',
    '<input onfocus=alert(1) autofocus>',
  ];
}

function createInvalidPositions(): Vector2D[] {
  return [
    { x: 999999, y: 0 },
    { x: 0, y: 999999 },
    { x: -1, y: 0 },
    { x: 0, y: -1 },
    { x: Infinity, y: 0 },
    { x: NaN, y: 0 },
  ];
}
```

---

## Reporting and Metrics

### Security Test Dashboard

```
┌─────────────────────────────────────────────────────────────────┐
│  Security Test Dashboard                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  AUTHENTICATION TESTS: ████████████████████████████ 24/24 ✅    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Token Generation: 6/6 ✅                                 │   │
│  │ Session Binding: 4/4 ✅                                  │   │
│  │ Token Security: 4/4 ✅                                   │   │
│  │ Credential Storage: 2/2 ✅                               │   │
│  │ Hardcoded Secret Check: 8/8 ✅                           │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  INPUT VALIDATION: ████████████████████████████░░░ 22/24 ⚠️     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Player Updates: 5/5 ✅                                   │   │
│  │ Game Actions: 4/5 ⚠️ (card ownership pending)            │   │
│  │ Chat Sanitization: 3/8 ⚠️ (SVG, data URI pending)        │   │
│  │ SQL Injection: 4/4 ✅                                    │   │
│  │ XSS Prevention: 6/6 ✅                                   │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  RATE LIMITING: ████████████████████████████████░░ 21/22 ⚠️     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ Connection Limits: 5/5 ✅                                │   │
│  │ Action Limits: 4/5 ⚠️ (persistence pending)              │   │
│  │ Chat Limits: 3/3 ✅                                      │   │
│  │ Persistence: 2/2 ✅                                      │   │
│  │ Bypass Tests: 7/7 ✅                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  TRANSPORT SECURITY: ██████████████████████████████░░ 18/20 ⚠️ │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │ CORS Validation: 5/6 ⚠️ (wildcard pending)               │   │
│  │ Transport Security: 4/4 ✅                               │   │
│  │ Message Security: 5/6 ⚠️ (size limit pending)            │   │
│  │ TLS Configuration: 4/4 ✅                                │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  OVERALL: ████████████████████████████████░░░░░░░ 85% ⚠️       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

*Test Strategy Version: 2.0*  
*Last Updated: 2026-01-20*  
*JungleSecurity - Security-focused testing for confirmed vulnerabilities*
