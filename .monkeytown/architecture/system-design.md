# Monkeytown System Design

**Architecture for AI-powered multiplayer game platform**

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              PLAYERS                                         │
│                   (React Frontend - Next.js 14)                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         API GATEWAY / LOAD BALANCER                          │
│                         (Nginx or Cloud Load Balancer)                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    ▼                 ▼                 ▼
           ┌────────────────┐ ┌──────────────┐ ┌─────────────────┐
           │   Web Server   │ │  Game Server │ │  Event Stream   │
           │   (Next.js)    │ │  (Node/TS)   │ │   (Node/TS)     │
           └────────────────┘ └──────────────┘ └─────────────────┘
                    │                 │                 │
                    └─────────────────┼─────────────────┘
                                      ▼
                        ┌─────────────────────────┐
                        │    REDIS (Pub/Sub +     │
                        │    Session Store)       │
                        └─────────────────────────┘
                                      │
                                      ▼
                        ┌─────────────────────────┐
                        │   POSTGRESQL / SQLite   │
                        │   (Game State + Agents) │
                        └─────────────────────────┘
```

---

## Core Invariants

1. **60Hz Game Loop**: Real-time gameplay updates at 60 frames per second
2. **Graceful Degradation**: System survives single-component failures
3. **Eventual Consistency**: 500ms sync tolerance for multiplayer state
4. **No Single Point of Failure**: All critical components redundant or restartable
5. **Zero-Downtime Deployments**: Blue/green deployment strategy

---

## Component Architecture

### 1. Frontend Layer (`web/`)

**Technology**: Next.js 14, React 18, TypeScript

**Responsibilities**:
- Serve game UI and user interactions
- Establish and maintain WebSocket connections
- Render real-time game state
- Cache static assets aggressively

**Design Principles**:
- Server-Side Rendering (SSR) for initial load
- Client-side hydration for interactivity
- WebSocket connection pooling for multiplayer
- React Server Components for performance

```typescript
// Core frontend types (extends shared types)
interface GameState {
  players: Map<PlayerId, Player>;
  entities: Map<EntityId, GameEntity>;
  events: GameEvent[];
  timestamp: number;
}

interface Player {
  id: PlayerId;
  name: string;
  avatar: string;
  position: Vector2D;
  score: number;
  status: 'connected' | 'disconnected' | 'playing';
}
```

### 2. API Gateway Layer

**Technology**: Nginx or Cloud Load Balancer (AWS ALB/GCP Load Balancer)

**Responsibilities**:
- SSL/TLS termination
- Request routing and load balancing
- Rate limiting and DDoS protection
- Static asset delivery

**Configuration**:
```nginx
# nginx.conf (development)
upstream frontend {
  server web:3000;
}

upstream game_server {
  least_conn;
  server game-server:3001;
}

upstream event_stream {
  server event-stream:8080;
}

server {
  listen 80;
  server_name localhost;

  location / {
    proxy_pass http://frontend;
  }

  location /api/ {
    proxy_pass http://game_server;
  }

  location /ws {
    proxy_pass http://event_stream;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

### 3. Game Server Layer (`server/`)

**Technology**: Node.js 20+, TypeScript, Express, Socket.io

**Responsibilities**:
- Game logic and rules enforcement
- Player authentication and session management
- Matchmaking and game initialization
- Real-time event distribution

**Architecture**:
```
Game Server Components:
├── Matchmaker          - Groups players into games
├── Game Engine         - Runs game rules and physics
├── Event Bus           - Distributes events to players
├── Session Manager     - Handles player connections
└── Agent Coordinator   - Manages AI opponent behavior
```

**Key Interfaces**:
```typescript
// Game server core interfaces
interface GameSession {
  id: SessionId;
  players: Player[];
  state: GameState;
  config: GameConfig;
  createdAt: timestamp;
  status: 'waiting' | 'active' | 'completed';
}

interface GameConfig {
  maxPlayers: number;
  duration: number;
  rules: GameRules;
  aiDifficulty: 'easy' | 'medium' | 'hard';
}

interface AgentBehavior {
  id: AgentId;
  personality: AgentPersonality;
  decisionModel: DecisionModel;
  responseLatency: number;
}
```

### 4. Event Stream Server

**Technology**: Node.js 20+, WebSocket (ws library or Socket.io)

**Responsibilities**:
- Maintain persistent WebSocket connections
- Broadcast real-time game events
- Handle event buffering and replay
- Monitor connection health

**Design**:
```typescript
// Event stream architecture
interface EventStreamConfig {
  heartbeatInterval: number;
  maxConnectionsPerInstance: number;
  bufferSize: number;
  replayWindow: number;
}

class EventStreamServer {
  private connections: Map<ConnectionId, WebSocket>;
  private eventBuffer: CircularBuffer<GameEvent>;
  private pubsub: RedisPubSub;

  async broadcast(event: GameEvent): Promise<void> {
    await this.pubsub.publish('game-events', event);
  }

  async handleConnection(ws: WebSocket): Promise<void> {
    const replay = await this.getBufferedEvents();
    ws.send(JSON.stringify(replay));
  }
}
```

### 5. Data Layer

**Technology**: Redis (sessions + pub/sub), PostgreSQL (persistent storage)

**Redis Schema**:
```
# Session storage
session:{sessionId} -> JSON (player data, game state)

# Pub/Sub channels
game:{gameId}:events -> Game events
player:{playerId}:updates -> Player-specific updates
system:health -> Health check events

# Rate limiting
ratelimit:{playerId}:{action} -> TTL-based counters
```

**PostgreSQL Schema**:
```sql
-- Core tables
CREATE TABLE players (
  id UUID PRIMARY KEY,
  username VARCHAR(64) UNIQUE,
  stats JSONB,
  created_at TIMESTAMP
);

CREATE TABLE games (
  id UUID PRIMARY KEY,
  config JSONB,
  result JSONB,
  started_at TIMESTAMP,
  ended_at TIMESTAMP
);

CREATE TABLE agent_behaviors (
  id UUID PRIMARY KEY,
  personality JSONB,
  decision_model TEXT,
  version INTEGER
);
```

---

## Communication Patterns

### 1. WebSocket Protocol

```typescript
// Client -> Server messages
type ClientMessage =
  | { type: 'join_game'; payload: { gameId: string } }
  | { type: 'player_input'; payload: { action: InputAction } }
  | { type: 'chat_message'; payload: { text: string } }
  | { type: 'heartbeat'; payload: { timestamp: number } };

// Server -> Client messages
type ServerMessage =
  | { type: 'game_state'; payload: GameState }
  | { type: 'player_joined'; payload: Player }
  | { type: 'player_left'; payload: { playerId: string } }
  | { type: 'game_event'; payload: GameEvent }
  | { type: 'error'; payload: { code: string; message: string } };
```

### 2. Event Flow

```
Player Action → WebSocket → Game Server → Redis Pub/Sub → All Players
                     ↓
              PostgreSQL (persistent)
```

### 3. Agent Communication (via Repository)

```
Agent Output → Commit → File → Other Agent Reads → Action
```

---

## Resilience Patterns

### 1. Circuit Breaker

```typescript
class CircuitBreaker {
  private failures = 0;
  private lastFailure: timestamp;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  async execute<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'open') {
      if (Date.now() - this.lastFailure > RESET_TIMEOUT) {
        this.state = 'half-open';
      } else {
        throw new CircuitOpenError();
      }
    }

    try {
      const result = await fn();
      this.failures = 0;
      this.state = 'closed';
      return result;
    } catch (error) {
      this.failures++;
      if (this.failures > THRESHOLD) {
        this.state = 'open';
        this.lastFailure = Date.now();
      }
      throw error;
    }
  }
}
```

### 2. Retry with Exponential Backoff

```typescript
async function retry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      const delay = baseDelay * Math.pow(2, i);
      await sleep(delay + Math.random() * delay);
    }
  }

  throw lastError;
}
```

### 3. Health Checks

```typescript
// Kubernetes-ready health endpoints
app.get('/health/live', (req, res) => {
  res.json({ status: 'alive', uptime: process.uptime() });
});

app.get('/health/ready', async (req, res) => {
  const checks = await Promise.all([
    checkRedis(),
    checkPostgres(),
    checkMemoryUsage(),
  ]);

  const healthy = checks.every(c => c.healthy);
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ready' : 'not_ready',
    checks,
  });
});
```

---

## Security Model

### 1. Authentication Flow

```
Player → Web → OAuth Provider → Callback → JWT → WebSocket
```

### 2. Authorization Layers

- **Layer 1**: JWT token validation on WebSocket upgrade
- **Layer 2**: Game session membership verification
- **Layer 3**: Action-specific permission checks

### 3. Rate Limiting

```typescript
const rateLimiter = new RateLimiter({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // 100 requests per window
  keyGenerator: (req) => req.playerId,
  handler: (req, res) => {
    res.status(429).json({ error: 'Too many requests' });
  },
});
```

---

## Deployment Strategy

### Docker Compose (Development)

```yaml
# docker-compose.yml
services:
  web:
    build: ./web
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - VITE_API_URL=http://localhost:8080
    volumes:
      - ./web:/app
      - /app/node_modules

  game-server:
    build: ./server
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
    volumes:
      - ./server:/app
      - /app/node_modules

  event-stream:
    build: ./server
    ports:
      - "8080:8080"
    environment:
      - NODE_ENV=development
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_USER=monkeytown
      - POSTGRES_PASSWORD=dev
      - POSTGRES_DB=monkeytown
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  redis-data:
  postgres-data:
```

### Production Deployment

For production, use:
- **Frontend**: Vercel or similar platform (Next.js optimized)
- **Game Server**: Container service (ECS, Cloud Run, or Docker Swarm)
- **Event Stream**: Managed WebSocket service (Pusher, Ably) or self-hosted
- **Redis**: Managed service (ElastiCache, Redis Cloud)
- **PostgreSQL**: Managed database (RDS, Cloud SQL)

---

## Scaling Considerations

### Horizontal Scaling

```
                    ┌─────────────────┐
                    │   Load Balancer │
                    └────────┬────────┘
            ┌───────────────┼───────────────┐
            ▼               ▼               ▼
     ┌────────────┐  ┌────────────┐  ┌────────────┐
     │ Game Srv 1 │  │ Game Srv 2 │  │ Game Srv N │
     └──────┬─────┘  └──────┬─────┘  └──────┬─────┘
            │               │               │
            └───────────────┼───────────────┘
                            ▼
                    ┌──────────────┐
                    │    Redis     │
                    │   Cluster    │
                    └──────────────┘
```

### Scaling Triggers

| Metric | Threshold | Action |
|--------|-----------|--------|
| CPU Usage | >70% for 5min | Scale out game servers |
| Memory Usage | >80% | Add memory or scale out |
| WebSocket Connections | >5000/instance | Scale event stream |
| Latency P95 | >100ms | Review performance |

---

## Monitoring & Observability

### Metrics Collection

```typescript
// Prometheus metrics
const gameCounter = new Counter({
  name: 'games_active_total',
  help: 'Number of active games',
});

const playerGauge = new Gauge({
  name: 'players_online',
  help: 'Number of online players',
});

const latencyHistogram = new Histogram({
  name: 'action_latency_ms',
  help: 'Action processing latency',
  buckets: [10, 50, 100, 200, 500],
});
```

### Logging Structure

```json
{
  "timestamp": "2026-01-18T12:00:00Z",
  "level": "info",
  "service": "game-server",
  "gameId": "uuid",
  "playerId": "uuid",
  "action": "player_move",
  "latencyMs": 45,
  "message": "Player moved to position {x: 100, y: 200}"
}
```

---

## File References

- Frontend: `web/`
- Backend: `server/` (to be created)
- Shared types: `packages/shared/`
- Deployment config: `deploy/`
- Environment: `.env.example`

---

*Last updated: 2026-01-18*
*ChaosArchitect - Making systems resilient*
