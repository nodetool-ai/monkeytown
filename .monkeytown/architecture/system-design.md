# Monkeytown System Design v2.4

**Architecture for AI-powered multiplayer game platform**

**Version:** 2.4
**Date:** 2026-01-20
**Architect:** ChaosArchitect

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
│                    API GATEWAY / LOAD BALANCER                               │
│                    (Nginx or AWS ALB)                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                      ┌────────────────┼────────────────┐
                      ▼                ▼                ▼
             ┌────────────────┐ ┌──────────────┐ ┌─────────────────┐
             │   Web Server   │ │  Game Server │ │  Event Stream   │
             │   (Next.js)    │ │  (Node/TS)   │ │  (Socket.IO)    │
             │    :3000       │ │    :3001     │ │     :8080       │
             └────────────────┘ └──────────────┘ └─────────────────┘
                      │                │                │
                      └────────────────┼────────────────┘
                                       ▼
                         ┌─────────────────────────┐
                         │    REDIS (Pub/Sub +     │
                         │    Session Store)       │
                         │      redis:6379         │
                         └─────────────────────────┘
                                       │
                                       ▼
                         ┌─────────────────────────┐
                         │   POSTGRESQL (Game      │
                         │   State + Agents)       │
                         │    postgres:5432        │
                         └─────────────────────────┘
```

---

## Core Invariants

1. **60Hz Game Loop**: Real-time action games require 60 updates per second (turn-based exempt per DECISION-006)
2. **Graceful Degradation**: System survives single-component failures
3. **Eventual Consistency**: 500ms sync tolerance for multiplayer state
4. **No Single Point of Failure**: All critical components redundant or restartable
5. **Zero-Downtime Deployments**: Blue/green deployment strategy
6. **WebSocket-First**: All player-server communication via WebSocket (ADR-002)

---

## Architecture Principles

### 1. Two-Layer Agent Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LAYER 1: GitHub Workflow Layer                            │
│                    (High-level coordination)                                 │
│                                                                             │
│  Agent Output → Commit → File → Other Agent Reads → Action                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    LAYER 2: React/Node.js Agent Layer                       │
│                    (Real-time reasoning with @ax-llm/ax)                    │
│                                                                             │
│  Agent = Signature-based definitions, not prompts                           │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2. Repository as Shared Memory

- **No direct agent communication** (Rule 6)
- **Coordination through files only** (Rule 7)
- **Contradictions are features, not bugs** (Architecture philosophy)

### 3. Docker Compose Only

Per requirements, this system uses Docker Compose exclusively for container orchestration. No Kubernetes.

---

## Component Architecture

### 1. Frontend Layer (`web/`)

**Technology**: Next.js 14, React 18, TypeScript

**Directory Structure**:
```
web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── game/               # Game interface components
│   │   │   ├── GameCanvas.tsx      # Main game canvas
│   │   │   ├── ChatPanel.tsx       # In-game chat
│   │   │   ├── ChatPanel.test.tsx
│   │   │   ├── EvolutionFeed.tsx   # Agent evolution timeline
│   │   │   ├── EvolutionFeed.test.tsx
│   │   │   ├── GameCard.tsx        # Game listing card
│   │   │   ├── TicTacToe.tsx       # Tic-tac-toe game
│   │   │   ├── TurnTimer.tsx       # Turn countdown
│   │   │   ├── TurnTimer.test.tsx
│   │   │   ├── GameRules.tsx       # Rules display
│   │   │   ├── TutorialOverlay.tsx # Tutorial
│   │   │   ├── TutorialOverlay.test.tsx
│   │   │   ├── SpecialActionIndicator.tsx
│   │   │   ├── SpecialActionIndicator.test.tsx
│   │   │   ├── AIReasoningDisplay.tsx
│   │   │   └── index.ts
│   │   ├── agents/             # AI agent components
│   │   │   ├── AgentBadge.tsx      # Agent status badge
│   │   │   ├── AgentBadge.test.tsx
│   │   │   ├── AgentPanel.tsx      # Agent information panel
│   │   │   └── index.ts
│   │   └── ui/                 # Shared UI components
│   │       ├── Button.tsx
│   │       ├── Button.test.tsx
│   │       ├── Badge.tsx
│   │       ├── Badge.test.tsx
│   │       ├── Card.tsx
│   │       ├── Card.test.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useGame.ts          # Game state management hook
│   │   └── index.ts
│   └── test/
│       └── setup.ts            # Test setup
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── vitest.config.ts
├── playwright.config.ts
├── e2e/
│   └── lobby.spec.ts           # E2E tests
├── E2E_TESTING.md
└── .eslintrc.json
```

**Key Dependencies**:
- `next: ^14.2.0`
- `react: ^18.2.0`
- `react-dom: ^18.2.0`
- `socket.io-client: ^4.7.2` (WebSocket client)

**Dev Dependencies**:
- `@playwright/test: ^1.57.0` (E2E tests)
- `vitest: ^1.4.0` (Unit tests)
- `typescript: ^5.3.0`

### 2. Backend Layer (`server/`)

**Technology**: Node.js 20, Express, Socket.IO, TypeScript

**Directory Structure**:
```
server/
├── src/
│   ├── index.ts                # Entry point
│   ├── game/
│   │   ├── Engine.ts           # Abstract game engine base
│   │   ├── babel-engine.ts     # Babel card game engine
│   │   ├── babel-engine.test.ts
│   │   ├── Matchmaker.ts       # Player matching system
│   │   ├── Session.ts          # Game session management
│   │   ├── ai-opponent.ts      # AI opponent with LLM support
│   │   ├── ai-opponent.test.ts
│   │   ├── server.ts           # GameServer orchestration
│   │   ├── types.ts            # Game type definitions
│   │   ├── tictactoe-engine.ts # Tic-tac-toe game logic
│   │   ├── referee.ts          # Game rules enforcement
│   │   └── index.ts
│   ├── websocket/
│   │   ├── Server.ts           # EventStream WebSocket handler
│   │   ├── types.ts
│   │   └── index.ts
│   ├── routes/
│   │   ├── api.ts              # REST API routes
│   │   ├── health.ts           # Health check endpoints
│   │   └── index.ts
│   ├── services/
│   │   ├── Database.ts         # PostgreSQL client
│   │   ├── Redis.ts            # Redis client
│   │   ├── validation.ts       # Input validation (Zod)
│   │   └── index.ts
│   └── middleware/             # Future middleware
├── package.json
├── tsconfig.json
└── dist/                       # Compiled output
```

**Key Dependencies**:
- `express: ^4.18.2`
- `socket.io: ^4.7.2` (WebSocket server)
- `ioredis: ^5.3.2` (Redis client)
- `pg: ^8.11.3` (PostgreSQL client)
- `jsonwebtoken: ^9.0.2` (Authentication)
- `bcryptjs: ^2.4.3` (Password hashing)
- `zod: ^3.22.4` (Input validation)
- `ws: ^8.14.2` (WebSocket library)
- `uuid: ^9.0.0` (ID generation)

**Dev Dependencies**:
- `typescript: ^5.3.3`
- `tsx: ^4.6.2` (TypeScript execution)
- `eslint: ^8.55.0`

### 3. Shared Package (`packages/shared/`)

**Technology**: TypeScript (no runtime dependencies)

**Directory Structure**:
```
packages/shared/
├── index.ts            # Main exports
├── types.ts            # TypeScript types
├── constants.ts        # Shared constants
├── game-types.ts       # Game-specific types
├── game-constants.ts   # Game constants
└── package.json
```

**Package Configuration**:
```json
{
  "name": "@monkeytown/shared",
  "exports": {
    ".": "./index.ts",
    "./constants": "./constants.ts",
    "./types": "./types.ts",
    "./game-types": "./game-types.ts",
    "./game-constants": "./game-constants.ts"
  }
}
```

---

## Communication Patterns

### 1. WebSocket Protocol

```typescript
// Client -> Server messages
interface ClientMessage {
  type: 'join' | 'leave' | 'action' | 'chat' | 'chat:history' | 'heartbeat';
  gameId?: string;
  payload?: Record<string, unknown>;
}

// Server -> Client messages
interface ServerMessage {
  type: 'joined' | 'left' | 'state' | 'event' | 'error' | 'chat' | 'chat:history' | 'heartbeat:ack';
  gameId?: string;
  payload?: Record<string, unknown>;
}

// Game action interface (TicTacToe)
interface TicTacToeAction {
  type: 'place' | 'forfeit';
  row?: number;
  col?: number;
}

// Game action interface (Babel)
interface BabelAction {
  type: string;
  cardId?: string;
  targetPlayerId?: string;
}
```

### 2. Event Flow

```
Player Action → EventStream (Socket.IO) → GameServer → Redis Pub/Sub → All Players
                            ↓
                     PostgreSQL (persistent)
```

### 3. REST API Endpoints

```typescript
// Health check endpoints
GET /health/live   → Returns { status: 'alive' }
GET /health/ready  → Returns { status: 'ready', checks: [...] }

// Game API (future)
POST /api/games/create → { gameId: string }
POST /api/games/:id/join → { success: true }
```

---

## Data Layer

### Redis Schema

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

### PostgreSQL Schema

```sql
-- Players table
CREATE TABLE players (
  id UUID PRIMARY KEY,
  username VARCHAR(64) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  avatar_url VARCHAR(512),
  stats JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Games table
CREATE TABLE games (
  id UUID PRIMARY KEY,
  game_type VARCHAR(32) NOT NULL,
  config JSONB DEFAULT '{}',
  result JSONB,
  status VARCHAR(32) DEFAULT 'waiting',
  started_at TIMESTAMP,
  ended_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Game players junction table
CREATE TABLE game_players (
  id UUID PRIMARY KEY,
  game_id UUID REFERENCES games(id),
  player_id UUID REFERENCES players(id),
  player_type VARCHAR(16) DEFAULT 'human',
  player_order INTEGER,
  score INTEGER DEFAULT 0,
  joined_at TIMESTAMP DEFAULT NOW()
);

-- Chat messages table
CREATE TABLE chat_messages (
  id UUID PRIMARY KEY,
  game_id UUID NOT NULL,
  sender_id UUID NOT NULL,
  sender_name VARCHAR(64) NOT NULL,
  sender_type VARCHAR(16) DEFAULT 'human',
  content TEXT NOT NULL,
  timestamp BIGINT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Agent behaviors table
CREATE TABLE agent_behaviors (
  id UUID PRIMARY KEY,
  personality JSONB,
  decision_model TEXT,
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Game actions log table
CREATE TABLE game_actions (
  id UUID PRIMARY KEY,
  game_id UUID NOT NULL,
  player_id UUID NOT NULL,
  action_type VARCHAR(64) NOT NULL,
  action_data JSONB,
  turn_number INTEGER,
  timestamp BIGINT NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_games_status ON games(status);
CREATE INDEX idx_games_type ON games(game_type);
CREATE INDEX idx_game_players_game_id ON game_players(game_id);
CREATE INDEX idx_chat_messages_game_id ON chat_messages(game_id);
CREATE INDEX idx_chat_messages_timestamp ON chat_messages(timestamp DESC);
CREATE INDEX idx_game_actions_game_id ON game_actions(game_id);
```

---

## Docker Configuration

### Development (docker-compose.yml)

**Services**:
| Service | Image | Port | Purpose |
|---------|-------|------|---------|
| web | Dockerfile.web | 3000 | Next.js frontend |
| game-server | Dockerfile.server | 3001 | Game logic server |
| event-stream | Dockerfile.server | 8080 | WebSocket events |
| redis | redis:7-alpine | 6379 | Cache/PubSub |
| postgres | postgres:15-alpine | 5432 | Database |
| nginx | nginx:alpine | 80 | Reverse proxy |
| redis-commander | rediscommander:latest | 8082 | Redis GUI |

### Production Dockerfiles

**Dockerfile.web** (Multi-stage):
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY web/package*.json ./web/
COPY server/package*.json ./server/
COPY packages/shared/package*.json ./packages/shared/
RUN npm ci
COPY . .
RUN npm run build --prefix web

# Production stage
FROM node:20-alpine AS frontend
WORKDIR /app
COPY --from=builder /app/web ./
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
```

**Dockerfile.server** (Multi-stage):
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY server/package*.json ./server/
COPY packages/shared/package*.json ./packages/shared/
RUN npm ci
COPY . .
RUN npm run build --prefix server

# Production stage
FROM node:20-alpine AS server
WORKDIR /app
COPY --from=builder /app/server/dist ./dist
COPY --from=builder /app/server/package*.json ./
RUN npm install --omit=dev
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

---

## Infrastructure (Terraform)

### AWS Resources

| Resource | Module | Purpose |
|----------|--------|---------|
| VPC | terraform-aws-modules/vpc/aws | Network isolation |
| ECS Cluster | terraform-aws-modules/ecs/aws | Container orchestration |
| RDS PostgreSQL | terraform-aws-modules/rds/aws | Primary database |
| ElastiCache Redis | terraform-aws-modules/elasticache/aws | Cache/PubSub |
| ALB | terraform-aws-modules/alb/aws | Load balancer |

### Terraform Configuration (`infrastructure/terraform/main.tf`)

- **Terraform Version**: >= 1.5.0
- **AWS Provider**: ~> 5.0
- **State Backend**: S3 with DynamoDB locking
- **Environment**: Variable-based (dev/prod)

---

## CI/CD Pipeline

### Workflow Steps

1. **Lint**: `npm run lint` (web + server)
2. **Test**: `npm run test` (web) + unit tests (server)
3. **E2E**: `npm run e2e` (Playwright)
4. **Build**: `npm run build` (web + server)
5. **Docker Build**: `docker-compose build`
6. **Deploy**: AWS ECS (via Terraform)

### Pipeline Jobs (`.github/workflows/ci-cd.yml`)

| Job | Dependencies | Purpose |
|-----|--------------|---------|
| lint | - | Lint & type check |
| test | lint | Run unit tests |
| e2e-tests | test | Playwright E2E tests |
| build-web | test, e2e-tests | Build frontend image |
| build-server | test | Build backend image |
| deploy-staging | build-web, build-server | Deploy to staging (develop) |
| deploy-production | build-web, build-server | Deploy to production (release) |

---

## Deployment Strategy

### Docker Compose (Development)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Production Deployment (AWS ECS)

```bash
# Build Docker images
docker build -t monkeytown-web:latest ./web
docker build -t monkeytown-server:latest ./server

# Push to ECR
aws ecr get-login-password | docker login --username AWS ...
docker tag monkeytown-web:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/monkeytown-web:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/monkeytown-web:latest

# Register task definitions and update services
aws ecs register-task-definition ...
aws ecs update-service ...
```

---

## Security Model

### Authentication Flow

```
Player → Web → OAuth Provider → Callback → JWT → WebSocket
```

### Authorization Layers

- **Layer 1**: JWT token validation on WebSocket upgrade
- **Layer 2**: Game session membership verification
- **Layer 3**: Action-specific permission checks

### Security Middleware (server)

- `helmet: ^7.1.0` - HTTP security headers
- `cors: ^2.8.5` - Cross-origin resource sharing
- `compression: ^1.7.4` - Response compression
- `express-rate-limit: ^7.1.5` - Rate limiting

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

## Implemented Games

### TicTacToe

**Location**: `server/src/game/tictactoe-engine.ts`

**Features**:
- 2-player board game (human vs human or human vs AI)
- AI opponent with 3 difficulty levels (easy, medium, hard)
- Minimax algorithm for optimal play at hard difficulty
- Win/draw/forfeit detection
- Move history and event emission

**Engine Class**: `TicTacToeEngine`
- Constructor: Takes 2 players and optional config
- Methods: `startGame()`, `processAction()`, `getState()`, `getBoard()`
- AI Class: `TicTacToeAI` with difficulty-based move selection

---

## Environment Configuration

### Required Variables (`.env.example`)

| Variable | Purpose | Required |
|----------|---------|----------|
| NODE_ENV | Environment mode | Yes |
| VITE_API_URL | API endpoint | Yes |
| VITE_WS_URL | WebSocket endpoint | Yes |
| REDIS_URL | Redis connection | Yes |
| MINIMAX_API_KEY | AI opponent API | For AI features |
| ANTHROPIC_BASE_URL | Anthropic-compatible API | Optional |
| ANTHROPIC_MODEL | AI model selection | Optional |

---

## File References

| Component | Path |
|-----------|------|
| Frontend | `web/` |
| Backend | `server/` |
| Shared types | `packages/shared/` |
| Docker Compose | `docker-compose.yml` |
| Docker configs | `deploy/docker/` |
| Environment | `.env.example` |
| Architecture docs | `.monkeytown/architecture/` |
| Infrastructure | `infrastructure/terraform/` |
| CI/CD | `.github/workflows/` |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.4 | 2026-01-20 | Updated WebSocket protocol, PostgreSQL schema, verified actual implementation |
| 2.3 | 2026-01-20 | Updated with E2E testing, Nginx config, full docker-compose |
| 2.2 | 2026-01-19 | Added implemented games, CI/CD pipeline details, environment config |
| 2.1 | 2026-01-19 | Updated with actual file structure, dependencies |
| 2.0 | 2026-01-19 | Initial version |

---

*Version: 2.4*
*Last updated: 2026-01-20*
*ChaosArchitect - Making systems resilient*
