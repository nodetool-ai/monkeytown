# Caching Strategy

**Data caching architecture for Monkeytown**

**Version:** 1.0
**Date:** 2026-01-18
**Architect:** ChaosArchitect

---

## Overview

This document defines the caching strategy for Monkeytown, covering:
- What data is cached
- Cache invalidation policies
- TTL (Time-To-Live) configurations
- Multi-layer caching architecture

---

## Caching Layers

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CACHING ARCHITECTURE                                │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     LAYER 1: Browser Cache                           │   │
│  │  Static assets, API responses with Cache-Control headers            │   │
│  │  TTL: Varies by content type                                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     LAYER 2: CDN Cache                               │   │
│  │  Static assets, Next.js ISR pages                                   │   │
│  │  TTL: 1 hour for assets, varies for pages                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     LAYER 3: Application Cache                       │   │
│  │  In-memory caches (Node.js process)                                 │   │
│  │  Game state snapshots, config, feature flags                        │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     LAYER 4: Redis Cache                             │   │
│  │  Sessions, player state, game state, rate limits                    │   │
│  │  TTL: Varies by data type                                           │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     LAYER 5: PostgreSQL                              │   │
│  │  Source of truth - persistent storage                               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Redis Cache Schema

### Key Patterns

| Pattern | Description | TTL | Example |
|---------|-------------|-----|---------|
| `session:{id}` | Player session data | 1 hour | `session:abc123` |
| `player:{id}` | Player state (online, position) | 5 minutes | `player:user123` |
| `player:{id}:profile` | Player profile data | 15 minutes | `player:user123:profile` |
| `game:{id}` | Active game state | 30 minutes | `game:game456` |
| `game:{id}:state` | Game state snapshot | 1 minute | `game:game456:state` |
| `ratelimit:{id}:{action}` | Rate limit counters | 1 minute | `ratelimit:user123:chat` |
| `config:{key}` | Configuration values | 5 minutes | `config:feature_flags` |
| `leaderboard:{period}` | Leaderboard data | 5 minutes | `leaderboard:daily` |

### Data Structures

```typescript
// Session data
interface SessionCache {
  sessionId: string;
  playerId: string;
  gameId?: string;
  createdAt: number;
  lastActivityAt: number;
  metadata: {
    ip: string;
    userAgent: string;
  };
}

// Player state (ephemeral, real-time)
interface PlayerStateCache {
  playerId: string;
  status: 'online' | 'away' | 'in_game';
  currentGameId?: string;
  lastSeenAt: number;
}

// Game state (snapshot for recovery)
interface GameStateCache {
  gameId: string;
  state: GameState;
  players: string[];
  updatedAt: number;
  version: number;
}
```

---

## Cache TTL Configuration

### Real-Time Data (Short TTL)

| Data Type | TTL | Reason |
|-----------|-----|--------|
| Player position | No cache | Must be real-time |
| Game events | No cache | Must be real-time |
| Game state snapshot | 1 minute | Recovery only |
| Player online status | 5 minutes | Stale is acceptable |

### Session Data (Medium TTL)

| Data Type | TTL | Reason |
|-----------|-----|--------|
| Session | 1 hour | Extends on activity |
| JWT claims cache | 5 minutes | Token refresh cycle |
| Rate limit counters | 1 minute | Per-minute limits |

### Reference Data (Long TTL)

| Data Type | TTL | Reason |
|-----------|-----|--------|
| Player profile | 15 minutes | Rarely changes |
| Leaderboard | 5 minutes | Computed periodically |
| Game configuration | 5 minutes | Changes with deploys |
| Feature flags | 5 minutes | Changes infrequently |

### Static Assets (Browser/CDN)

| Asset Type | Cache-Control | Reason |
|------------|---------------|--------|
| JS/CSS (hashed) | `max-age=31536000, immutable` | Content-addressed |
| Images (hashed) | `max-age=31536000, immutable` | Content-addressed |
| HTML pages | `max-age=0, must-revalidate` | Dynamic content |
| Fonts | `max-age=31536000, immutable` | Rarely change |
| API responses | `private, no-cache` | User-specific |

---

## Cache Invalidation Strategies

### Write-Through

Used for: Session data, game state snapshots

```typescript
async function updateSession(sessionId: string, data: Partial<Session>): Promise<void> {
  // Update PostgreSQL first
  await db.sessions.update(sessionId, data);
  
  // Then update Redis cache
  const session = await db.sessions.findById(sessionId);
  await redis.setex(`session:${sessionId}`, 3600, JSON.stringify(session));
}
```

### Cache-Aside (Lazy Loading)

Used for: Player profiles, leaderboards

```typescript
async function getPlayerProfile(playerId: string): Promise<PlayerProfile> {
  // Try cache first
  const cached = await redis.get(`player:${playerId}:profile`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Cache miss - fetch from database
  const profile = await db.players.findById(playerId);
  
  // Store in cache for next time
  await redis.setex(`player:${playerId}:profile`, 900, JSON.stringify(profile));
  
  return profile;
}
```

### Time-Based Expiration

Used for: Rate limits, ephemeral state

```typescript
async function checkRateLimit(playerId: string, action: string): Promise<boolean> {
  const key = `ratelimit:${playerId}:${action}`;
  const count = await redis.incr(key);
  
  if (count === 1) {
    // First request - set expiration
    await redis.expire(key, 60);
  }
  
  return count <= RATE_LIMITS[action];
}
```

### Event-Based Invalidation

Used for: Game state, player state changes

```typescript
// Pub/Sub for cache invalidation
redis.subscribe('cache:invalidate', (message) => {
  const { type, id } = JSON.parse(message);
  
  switch (type) {
    case 'player':
      redis.del(`player:${id}:profile`);
      break;
    case 'game':
      redis.del(`game:${id}:state`);
      break;
    case 'leaderboard':
      redis.del('leaderboard:daily');
      redis.del('leaderboard:weekly');
      break;
  }
});
```

---

## Application-Level Caching

### In-Memory Cache

For frequently accessed, rarely changing data:

```typescript
import NodeCache from 'node-cache';

const appCache = new NodeCache({
  stdTTL: 300,      // 5 minutes default
  checkperiod: 60,  // Check for expired keys every minute
});

// Game configuration
export function getGameConfig(): GameConfig {
  const cached = appCache.get<GameConfig>('gameConfig');
  if (cached) return cached;
  
  const config = loadGameConfigFromFile();
  appCache.set('gameConfig', config);
  return config;
}

// Feature flags
export async function isFeatureEnabled(feature: string): Promise<boolean> {
  const cacheKey = `feature:${feature}`;
  const cached = appCache.get<boolean>(cacheKey);
  if (cached !== undefined) return cached;
  
  const enabled = await redis.get(`config:features:${feature}`);
  const result = enabled === 'true';
  appCache.set(cacheKey, result, 60); // 1 minute TTL
  return result;
}
```

### Connection Pooling

```typescript
// Redis connection pool
const redisPool = new Redis.Cluster(REDIS_NODES, {
  scaleReads: 'slave',
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  slotsRefreshTimeout: 2000,
});

// PostgreSQL connection pool
const pgPool = new Pool({
  max: 20,               // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

---

## Cache Warming

### Startup Cache Warming

```typescript
async function warmCache(): Promise<void> {
  logger.info('Warming cache...');
  
  // Warm game configuration
  const gameConfig = await loadGameConfig();
  await redis.setex('config:game', 300, JSON.stringify(gameConfig));
  
  // Warm feature flags
  const features = await loadFeatureFlags();
  await redis.setex('config:features', 300, JSON.stringify(features));
  
  // Warm leaderboards
  const leaderboard = await computeLeaderboard();
  await redis.setex('leaderboard:daily', 300, JSON.stringify(leaderboard));
  
  logger.info('Cache warmed successfully');
}
```

### Scheduled Cache Refresh

```typescript
// Refresh leaderboard every 5 minutes
setInterval(async () => {
  const leaderboard = await computeLeaderboard();
  await redis.setex('leaderboard:daily', 300, JSON.stringify(leaderboard));
}, 5 * 60 * 1000);
```

---

## Monitoring

### Cache Metrics

```typescript
const cacheMetrics = {
  hits: new Counter({
    name: 'cache_hits_total',
    help: 'Total cache hits',
    labelNames: ['cache', 'key_type'],
  }),
  misses: new Counter({
    name: 'cache_misses_total',
    help: 'Total cache misses',
    labelNames: ['cache', 'key_type'],
  }),
  latency: new Histogram({
    name: 'cache_operation_latency_seconds',
    help: 'Cache operation latency',
    labelNames: ['cache', 'operation'],
    buckets: [0.001, 0.005, 0.01, 0.05, 0.1],
  }),
};
```

### Health Indicators

| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| Cache hit rate | <80% | <60% | Review cache strategy |
| Redis latency P95 | >10ms | >50ms | Scale Redis |
| Redis memory usage | >70% | >85% | Increase memory or evict |
| Cache key count | >1M | >5M | Review TTLs |

---

## Security Considerations

### Sensitive Data

- **Never** cache raw passwords or tokens
- **Use** encryption for sensitive cached data
- **Set** appropriate TTLs to limit exposure window
- **Implement** cache key namespacing to prevent collisions

### Cache Poisoning Prevention

```typescript
// Validate cache data before use
function validateCachedSession(data: unknown): Session | null {
  const result = sessionSchema.safeParse(data);
  if (!result.success) {
    logger.warn('Invalid cached session data', { data });
    return null;
  }
  return result.data;
}
```

---

## References

- [System Design](./system-design.md)
- [Component Map](./component-map.md)
- [Multiplayer Infrastructure](./multiplayer-infrastructure.md)

---

*Version: 1.0*
*Last updated: 2026-01-18*
*ChaosArchitect - Caching for performance*
