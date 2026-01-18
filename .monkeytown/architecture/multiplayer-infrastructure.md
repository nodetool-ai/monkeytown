# Multiplayer Infrastructure Specification

**BACKLOG-008: Multiplayer Infrastructure**

**Version:** 1.0
**Date:** 2026-01-18
**Architect:** ChaosArchitect
**Status:** In Progress

---

## Overview

This document specifies the infrastructure requirements for real-time multiplayer gameplay in Monkeytown. The multiplayer layer enables multiple players to participate in the same game session with sub-100ms latency and 60Hz updates for action-oriented gameplay.

## System Invariants

1. **Latency**: WebSocket round-trip < 100ms P95
2. **Update Rate**: 60Hz for action games, event-driven for turn-based
3. **Connection Resilience**: Automatic reconnection within 5 seconds
4. **Session Persistence**: Game state survives player disconnections up to 5 minutes
5. **Horizontal Scaling**: Support 1000+ concurrent players per instance

---

## Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MULTIPLAYER ARCHITECTURE                             │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                          CLIENT LAYER                                  │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐              │ │
│  │  │ Browser  │  │ Mobile   │  │ Desktop  │  │   Web    │              │ │
│  │  │          │  │          │  │          │  │          │              │ │
│  │  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘              │ │
│  │       │             │             │             │                     │ │
│  │       └─────────────┴─────────────┴─────────────┘                     │ │
│  │                             │                                           │ │
│  │                      WebSocket (wss://)                                │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                      LOAD BALANCER LAYER                               │ │
│  │  ┌─────────────────────────────────────────────────────────────────┐  │ │
│  │  │                    Nginx / AWS ALB                               │  │ │
│  │  │  - SSL Termination    - Rate Limiting    - DDoS Protection     │  │ │
│  │  │  - Health Checks      - Sticky Sessions   - Request Routing    │  │ │
│  │  └─────────────────────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│         ┌──────────────────────────┼──────────────────────────┐            │
│         ▼                          ▼                          ▼            │
│  ┌─────────────┐          ┌─────────────┐          ┌─────────────────┐   │
│  │   Web UI    │          │  Game API   │          │  Event Stream   │   │
│  │  (Next.js)  │          │  (Express)  │          │  (Socket.IO)    │   │
│  │             │          │             │          │                 │   │
│  │  :3000      │          │  :3001      │          │  :8080          │   │
│  └─────────────┘          └─────────────┘          └─────────────────┘   │
│                                    │                          │            │
│                                    └──────────┬───────────────┘            │
│                                               ▼                            │
│  ┌───────────────────────────────────────────────────────────────────────┐ │
│  │                         DATA LAYER                                     │ │
│  │                                                                       │ │
│  │  ┌─────────────────┐                          ┌─────────────────┐    │ │
│  │  │   Redis Cluster │◄─────────────────────────│  PostgreSQL     │    │ │
│  │  │                 │                          │                 │    │ │
│  │  │  - Pub/Sub      │     Session State        │  - Games        │    │ │
│  │  │  - Sessions     │     Game Events          │  - Players      │    │ │
│  │  │  - Caching      │     Rate Limiting        │  - Agent Data   │    │ │
│  │  │  - Presence     │                          │                 │    │ │
│  │  └─────────────────┘                          └─────────────────┘    │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Components

### 1. WebSocket Gateway (Event Stream)

**Purpose**: Maintain persistent connections with all players

**Technology**: Node.js 20+, Socket.IO

**Responsibilities**:
- Accept and validate WebSocket connections
- Authenticate players via JWT
- Manage connection lifecycle (connect, disconnect, reconnect)
- Broadcast game events to subscribed players
- Handle heartbeats and connection health

**Configuration**:

```typescript
interface WebSocketConfig {
  port: 8080;
  maxConnections: 10000;
  heartbeatInterval: 30000;
  connectionTimeout: 60000;
  replayBufferSize: 100;
  replayWindowMs: 5000;
}

const config: WebSocketConfig = {
  port: parseInt(process.env.WS_PORT || '8080'),
  maxConnections: parseInt(process.env.WS_MAX_CONNECTIONS || '10000'),
  heartbeatInterval: 30000,
  connectionTimeout: 60000,
  replayBufferSize: 100,
  replayWindowMs: 5000,
};
```

**Connection Flow**:

```typescript
class WebSocketGateway {
  private io: SocketIOServer;
  private connectionManager: ConnectionManager;
  private eventBuffer: CircularBuffer<GameEvent>;
  private pubsub: RedisPubSub;

  async initialize(): Promise<void> {
    this.io = new SocketIOServer(config.port, {
      cors: { origin: '*' },
      pingTimeout: 60000,
      pingInterval: 30000,
    });

    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        const player = await this.authenticate(token);
        socket.data.player = player;
        next();
      } catch (error) {
        next(new Error('Authentication failed'));
      }
    });

    this.io.on('connection', (socket) => {
      this.handleConnection(socket);
    });
  }

  private async handleConnection(socket: Socket): Promise<void> {
    const playerId = socket.data.player.id;
    
    // Register connection
    await this.connectionManager.register(playerId, socket);
    
    // Send replay buffer
    const recentEvents = this.eventBuffer.getAll();
    socket.emit('game:replay', recentEvents);
    
    // Handle disconnection
    socket.on('disconnect', (reason) => {
      this.handleDisconnection(playerId, reason);
    });
  }
}
```

### 2. Game Server

**Purpose**: Execute game logic and manage game sessions

**Technology**: Node.js 20+, TypeScript, Express

**Responsibilities**:
- Validate and process player inputs
- Execute game rules and physics
- Maintain game state
- Coordinate with AI opponents
- Communicate with Redis for pub/sub

**Game Session Lifecycle**:

```typescript
class GameSession {
  id: SessionId;
  players: Map<PlayerId, Player>;
  state: GameState;
  config: GameConfig;
  engine: GameEngine;
  eventPublisher: EventPublisher;
  status: 'waiting' | 'active' | 'completed';
  createdAt: Date;
  lastActivityAt: Date;

  async initialize(): Promise<void> {
    this.engine = new BabelEngine(this.config);
    this.state = this.engine.getInitialState();
    this.players = new Map();
    
    // Subscribe to game events
    await this.eventPublisher.subscribe(
      `game:${this.id}:events`,
      (event) => this.handleEvent(event)
    );
  }

  async addPlayer(player: Player): Promise<void> {
    this.players.set(player.id, player);
    this.state = this.engine.addPlayer(this.state, player);
    this.broadcastEvent({
      type: 'player_joined',
      player,
      timestamp: Date.now(),
    });
  }

  async processInput(playerId: PlayerId, input: InputAction): Promise<void> {
    const player = this.players.get(playerId);
    if (!player) throw new Error('Player not in session');

    // Validate input
    const validatedInput = await this.validateInput(player, input);
    
    // Process through engine
    this.state = this.engine.processInput(this.state, validatedInput);
    this.lastActivityAt = new Date();
    
    // Broadcast updated state
    this.broadcastEvent({
      type: 'state_update',
      state: this.state,
      timestamp: Date.now(),
    });
  }

  private async broadcastEvent(event: GameEvent): Promise<void> {
    await this.eventPublisher.publish(`game:${this.id}:events`, event);
  }
}
```

### 3. Redis Cluster

**Purpose**: Session storage, pub/sub, rate limiting, caching

**Technology**: Redis 7.x

**Data Structures**:

```typescript
// Session storage
interface SessionData {
  sessionId: string;
  gameId: string;
  players: Player[];
  state: GameState;
  createdAt: number;
  expiresAt: number;
}

// Pub/Sub channels
const CHANNELS = {
  GAME_EVENTS: (gameId: string) => `game:${gameId}:events`,
  PLAYER_UPDATES: (playerId: string) => `player:${playerId}:updates`,
  SYSTEM_HEALTH: 'system:health',
  RATE_LIMIT: 'rate_limit',
};

// Key patterns
const KEYS = {
  SESSION: (sessionId: string) => `session:${sessionId}`,
  PLAYER: (playerId: string) => `player:${playerId}`,
  GAME_STATE: (gameId: string) => `game:${gameId}:state`,
  RATE_LIMIT: (playerId: string, action: string) => `ratelimit:${playerId}:${action}`,
};
```

**Redis Configuration**:

```yaml
# redis.conf
port 6379
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
appendonly yes
appendfsync everysec
maxmemory 512mb
maxmemory-policy allkeys-lru
```

### 4. PostgreSQL Database

**Purpose**: Persistent storage for games, players, agent behaviors

**Technology**: PostgreSQL 15

**Schema**:

```sql
-- Games table
CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  config JSONB NOT NULL,
  result JSONB,
  state JSONB,
  status VARCHAR(20) DEFAULT 'waiting',
  created_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_by UUID REFERENCES players(id)
);

-- Players table
CREATE TABLE players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(64) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  avatar_url VARCHAR(512),
  stats JSONB DEFAULT '{}',
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  last_seen_at TIMESTAMP
);

-- Game participants
CREATE TABLE game_participants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id),
  player_id UUID REFERENCES players(id),
  agent_id UUID,
  role VARCHAR(20) DEFAULT 'player',
  score INTEGER DEFAULT 0,
  joined_at TIMESTAMP DEFAULT NOW(),
  left_at TIMESTAMP,
  UNIQUE(game_id, player_id)
);

-- Agent behaviors
CREATE TABLE agent_behaviors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  personality JSONB NOT NULL,
  decision_model TEXT,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Game events (for replay/history)
CREATE TABLE game_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id UUID REFERENCES games(id),
  player_id UUID,
  event_type VARCHAR(50),
  payload JSONB,
  timestamp BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_game_events_game_id ON game_events(game_id);
CREATE INDEX idx_game_events_timestamp ON game_events(game_id, timestamp);
```

---

## Communication Patterns

### 1. Player Connection

```
Client                    Load Balancer            Event Stream            Redis
   │                           │                        │                    │
   │──── Connect (JWT) ────────▶│                        │                    │
   │                           │──── Validate ─────────▶│                    │
   │                           │◀──── Player Data ──────│                    │
   │◀──── Auth Response ───────│                        │                    │
   │                           │                        │                    │
   │──── Subscribe ───────────▶│                        │                    │
   │                           │──── Subscribe ────────▶│──── Subscribe ────▶│
   │                           │◀──── Confirmation ─────│◀──── OK ───────────│
   │◀──── Connection Ready ────│                        │                    │
   │                           │                        │                    │
   │──── Request Game ────────▶│──── Forward ──────────▶│                    │
   │                           │                        │──── Create ───────▶│
   │◀──── Game State ──────────│◀──── Forward ──────────│◀──── State ────────│
```

### 2. Game Event Flow

```
Player A                  Event Stream            Game Server            Redis
   │                           │                        │                    │
   │──── Input Action ────────▶│                        │                    │
   │                           │──── Validate ─────────▶│                    │
   │                           │◀──── Validated ────────│                    │
   │                           │                        │──── Process ──────▶│
   │                           │                        │◀──── New State ───│
   │                           │◀──── State Update ─────│                    │
   │◀──── State Update ────────│                        │                    │
   │                           │──── Broadcast ────────▶│──── Publish ──────▶│
   │                           │                        │                    │
   │◀──── State Update ────────│◀──── Forward ──────────│◀──── Event ───────│
   │                           │                        │                    │
Player B                  Event Stream            Game Server            Redis
   │◀──── State Update ────────│                        │                    │
```

---

## Scalability Design

### Horizontal Scaling

```
                          ┌─────────────────┐
                          │   Load Balancer │
                          └────────┬────────┘
          ┌────────────────────────┼────────────────────────┐
          │                        │                        │
          ▼                        ▼                        ▼
   ┌─────────────┐         ┌─────────────┐         ┌─────────────┐
   │ Event Stream│         │ Event Stream│         │ Event Stream│
   │    :8080    │         │    :8080    │         │    :8080    │
   └──────┬──────┘         └──────┬──────┘         └──────┬──────┘
          │                        │                        │
          └────────────────────────┼────────────────────────┘
                                   │
                          ┌────────┴────────┐
                          ▼                 ▼
                   ┌─────────────┐   ┌─────────────┐
                   │   Redis     │   │   Redis     │
                   │   Cluster   │   │   Cluster   │
                   └─────────────┘   └─────────────┘
```

### Connection Distribution

```typescript
class ConnectionDistributor {
  private instances: WebSocketGateway[];
  private loadBalancer: LoadBalancerStrategy;

  async routeConnection(playerId: PlayerId): Promise<WebSocketGateway> {
    // Sticky sessions based on player ID
    const instanceIndex = this.loadBalancer.select(
      playerId,
      this.instances.map(i => i.id)
    );
    return this.instances[instanceIndex];
  }

  async redistributeIfNeeded(): Promise<void> {
    const maxConnections = 5000;
    const overloaded = this.instances.filter(
      i => i.getConnectionCount() > maxConnections
    );

    for (const instance of overloaded) {
      const playersToMove = instance.getRandomPlayers(
        Math.ceil(instance.getConnectionCount() / 2)
      );
      
      for (const player of playersToMove) {
        const newInstance = await this.routeConnection(player.id);
        await instance.migrateConnection(player, newInstance);
      }
    }
  }
}
```

---

## Resilience Patterns

### 1. Circuit Breaker for Redis

```typescript
class RedisCircuitBreaker {
  private failures = 0;
  private lastFailure = 0;
  private threshold = 5;
  private resetTimeout = 30000;

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.isOpen()) {
      if (this.canAttemptReset()) {
        return this.halfOpen(operation);
      }
      throw new RedisUnavailableError();
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
}
```

### 2. Retry with Backoff

```typescript
async function retryRedisOperation<T>(
  operation: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      
      const delay = Math.pow(2, attempt) * 100 + Math.random() * 100;
      await sleep(delay);
    }
  }
}
```

### 3. Health Checks

```typescript
app.get('/health/live', (req, res) => {
  res.json({ status: 'alive' });
});

app.get('/health/ready', async (req, res) => {
  const checks = {
    redis: await checkRedis(),
    postgres: await checkPostgres(),
    memory: checkMemoryUsage(),
    connections: checkConnectionCount(),
  };

  const allHealthy = Object.values(checks).every(c => c.healthy);
  res.status(allHealthy ? 200 : 503).json({
    status: allHealthy ? 'ready' : 'not_ready',
    checks,
  });
});
```

---

## Security

### Authentication

```typescript
async function authenticate(token: string): Promise<Player> {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  
  const player = await database.players.findById(decoded.playerId);
  if (!player) throw new Error('Player not found');
  
  // Check token expiration
  if (decoded.expiresAt < Date.now()) {
    throw new TokenExpiredError();
  }
  
  return player;
}
```

### Rate Limiting

```typescript
const rateLimiter = new RateLimiter({
  windowMs: 60000, // 1 minute
  max: {
    input: 30, // 30 inputs per minute
    chat: 10, // 10 messages per minute
    connection: 5, // 5 reconnects per minute
  },
  keyGenerator: (socket) => socket.data.player.id,
  handler: (socket, type) => {
    socket.emit('error', {
      code: 'RATE_LIMIT_EXCEEDED',
      type,
      message: `Too many ${type} requests`,
    });
    socket.disconnect();
  },
});
```

### Input Validation

```typescript
const inputValidator = new Validator({
  type: 'object',
  properties: {
    x: { type: 'number', min: 0, max: 1000 },
    y: { type: 'number', min: 0, max: 1000 },
    action: { type: 'string', enum: ['move', 'attack', 'ability'] },
  },
  required: ['action'],
});

function validateInput(input: unknown): InputAction {
  const result = inputValidator.validate(input);
  if (!result.valid) {
    throw new InvalidInputError(result.errors);
  }
  return result.data as InputAction;
}
```

---

## Monitoring

### Metrics

```typescript
const metrics = {
  connections: new Gauge({ name: 'ws_connections', help: 'Active WebSocket connections' }),
  eventsPerSecond: new Counter({ name: 'ws_events_total', help: 'Total WebSocket events' }),
  eventLatency: new Histogram({ name: 'ws_event_latency_ms', buckets: [10, 50, 100, 200, 500] }),
  gameSessions: new Gauge({ name: 'active_game_sessions', help: 'Active game sessions' }),
  playersOnline: new Gauge({ name: 'players_online', help: 'Online players' }),
  redisLatency: new Histogram({ name: 'redis_latency_ms', buckets: [5, 10, 25, 50, 100] }),
  errorRate: new Counter({ name: 'errors_total', help: 'Total errors' }),
};
```

### Alerts

| Condition | Threshold | Action |
|-----------|-----------|--------|
| Connection count | >8000 | Scale horizontally |
| Event latency P95 | >100ms | Investigate performance |
| Error rate | >1% | Page on-call |
| Redis unavailable | >5min | Failover to secondary |
| Memory usage | >80% | Restart non-critical services |

---

## Implementation Roadmap

### Phase 1: Core Infrastructure (Week 5)

- [ ] WebSocket gateway implementation
- [ ] Connection management
- [ ] Basic pub/sub
- [ ] Redis integration

### Phase 2: Game Sessions (Week 6)

- [ ] Game session lifecycle
- [ ] Player matchmaking
- [ ] State management
- [ ] Event broadcasting

### Phase 3: Scaling (Week 7)

- [ ] Horizontal scaling
- [ ] Connection distribution
- [ ] Load testing
- [ ] Performance optimization

### Phase 4: Production (Week 8)

- [ ] Security hardening
- [ ] Monitoring setup
- [ ] CI/CD integration
- [ ] Documentation

---

## Dependencies

- **BACKLOG-003**: AI Opponent Core (for game logic)
- **BACKLOG-004**: Core Game Loop (for state management)
- **BACKLOG-002**: Agent Transparency (for agent integration)

---

## References

- Architecture: `.monkeytown/architecture/system-design.md`
- Component Map: `.monkeytown/architecture/component-map.md`
- CI/CD: `.github/workflows/ci-cd.yml`
- Infrastructure: `infrastructure/terraform/`

---

*Version: 1.0*
*Last updated: 2026-01-18*
*ChaosArchitect - Building resilient multiplayer*
