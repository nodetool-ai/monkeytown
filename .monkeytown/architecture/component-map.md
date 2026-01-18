# Monkeytown Component Map v2.0

**Visual map of system components and their relationships**

**Version:** 2.0
**Date:** 2026-01-18
**Architect:** ChaosArchitect

---

## Component Hierarchy

```
monkeytown/
├── web/                          # Frontend Application
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── layout.tsx        # Root layout
│   │   │   ├── page.tsx          # Main page
│   │   │   ├── globals.css       # Global styles
│   │   │   └── api/              # API routes (future)
│   │   ├── components/
│   │   │   ├── GameUI/           # Game interface components
│   │   │   │   ├── GameCanvas.tsx     # Main game canvas
│   │   │   │   ├── ChatPanel.tsx      # In-game chat
│   │   │   │   ├── EvolutionFeed.tsx  # Agent evolution timeline
│   │   │   │   └── GameCard.tsx       # Game listing card
│   │   │   ├── Player/           # Player components
│   │   │   │   └── PlayerCard.tsx     # Player info display
│   │   │   ├── Agents/           # AI agent components
│   │   │   │   ├── AgentBadge.tsx      # Agent status badge
│   │   │   │   ├── AgentPanel.tsx      # Agent information panel
│   │   │   │   └── index.ts
│   │   │   └── Common/           # Shared UI components
│   │   │       ├── Button.tsx
│   │   │       ├── Badge.tsx
│   │   │       ├── Card.tsx
│   │   │       └── index.ts
│   │   ├── hooks/
│   │   │   ├── useGame.ts        # Game state management hook
│   │   │   └── index.ts
│   │   ├── lib/                  # Utilities (future)
│   │   └── test/
│   │       └── setup.ts          # Test setup
│   ├── public/                   # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── vitest.config.ts
│   └── .eslintrc.json
│
├── server/                       # Backend Application
│   ├── src/
│   │   ├── index.ts              # Entry point
│   │   ├── game/
│   │   │   ├── Engine.ts         # Game logic engine (babel-engine)
│   │   │   ├── Matchmaker.ts     # Player matching system
│   │   │   ├── Session.ts        # Game session management
│   │   │   ├── ai-opponent.ts    # AI opponent implementation
│   │   │   ├── server.ts         # Game server instance
│   │   │   ├── types.ts          # Game type definitions
│   │   │   └── index.ts
│   │   ├── websocket/
│   │   │   ├── Server.ts         # WebSocket handler
│   │   │   ├── Connection.ts     # Connection manager
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── routes/
│   │   │   ├── api.ts            # REST API routes
│   │   │   ├── health.ts         # Health check endpoints
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── Database.ts       # PostgreSQL client
│   │   │   ├── Redis.ts          # Redis client
│   │   │   └── index.ts
│   │   └── middleware/           # Future middleware
│   ├── package.json
│   ├── tsconfig.json
│   └── dist/                     # Compiled output
│
├── packages/
│   └── shared/                   # Shared code
│       ├── index.ts              # Exports
│       ├── types.ts              # TypeScript types
│       └── constants.ts          # Constants
│
├── deploy/                       # Deployment configs
│   ├── docker/
│   │   ├── Dockerfile.web        # Frontend Dockerfile
│   │   ├── Dockerfile.server     # Backend Dockerfile
│   │   └── nginx.conf            # Nginx configuration
│   └── k8s/                      # (Not used - Docker Compose only)
│
├── infrastructure/               # Infrastructure as code
│   ├── terraform/
│   │   ├── main.tf               # Main Terraform config
│   │   ├── variables.tf          # Terraform variables
│   │   ├── outputs.tf            # Terraform outputs
│   │   ├── ecs.tf                # ECS cluster config
│   │   ├── ecs-variables.tf      # ECS variables
│   │   └── README.md             # Infrastructure docs
│   └── ansible/
│       └── playbook.yml          # (Future) Ansible playbooks
│
├── .env.example                  # Environment template
├── .env                          # Local environment (gitignored)
├── docker-compose.yml            # Local development
├── package.json                  # Root workspace
└── tsconfig.json                 # Root TypeScript config
```

---

## Component Communication Map

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL LAYER                                   │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐           │
│  │  Players │    │   GitHub │    │   MiniMax│    │  Monitoring  │           │
│  │          │    │   API    │    │   API    │    │  (Optional)  │           │
│  └────┬─────┘    └────┬─────┘    └────┬─────┘    └──────┬───────┘           │
│       │               │               │                  │                   │
│       │ WebSocket     │               │                  │                   │
│       │ HTTP          │               │                  │                   │
│       └───────────────┴───────────────┴──────────────────┘                   │
└──────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND LAYER (web/)                              │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │                        Next.js Application                           │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │     │
│  │  │   App    │  │  Pages   │  │Components│  │  WebSocket       │    │     │
│  │  │  Router  │  │          │  │          │  │  Client          │    │     │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘    │     │
│  │         │           │            │                │                  │     │
│  │         │           │            │                │                  │     │
│  │    SSR/Hydration    │     Client Components      │ WebSocket        │     │
│  │                     │                            │                  │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│         │                   │                      │                       │
│         │ REST API          │ WebSocket            │ Static Assets         │
│         ▼                   ▼                      ▼                       │
└──────────────────────────────────────────────────────────────────────────────┘
         │                   │
         ▼                   ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                          BACKEND LAYER (server/)                             │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │                      Express Application                             │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │     │
│  │  │   REST   │  │  Socket  │  │  Agent   │  │  Middleware      │    │     │
│  │  │   API    │  │  .IO     │  │  Handler │  │                  │    │     │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘    │     │
│  │         │           │            │                │                  │     │
│  │    HTTP Requests    │  WebSocket Events        │  Auth/Rate Limit   │     │
│  │                     │                           │                    │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│         │                   │                      │                       │
│         ▼                   ▼                      ▼                       │
│  ┌──────────────┐   ┌──────────────┐    ┌──────────────────────┐           │
│  │  PostgreSQL  │   │    Redis     │    │  External Services   │           │
│  │  (持久存储)   │   │  (缓存/发布)  │    │  (MiniMax API, etc)  │           │
│  └──────────────┘   └──────────────┘    └──────────────────────┘           │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## Multiplayer Infrastructure (BACKLOG-008)

### Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      MULTIPLAYER INFRASTRUCTURE                             │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Load Balancer                                 │   │
│  │                  (Nginx or AWS ALB)                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│         ┌──────────────────────────┼──────────────────────────┐            │
│         ▼                          ▼                          ▼            │
│  ┌─────────────┐          ┌─────────────┐          ┌─────────────────┐   │
│  │   Web UI    │          │  Game API   │          │  Event Stream   │   │
│  │  (Next.js)  │          │  (Express)  │          │  (Socket.IO)    │   │
│  └─────────────┘          └─────────────┘          └─────────────────┘   │
│                                    │                          │            │
│                                    └──────────┬───────────────┘            │
│                                               ▼                            │
│                                    ┌─────────────────┐                      │
│                                    │   Redis Cluster │                      │
│                                    │  (Pub/Sub +     │                      │
│                                    │   Sessions)     │                      │
│                                    └─────────────────┘                      │
│                                               │                            │
│                                    ┌──────────┴──────────┐                 │
│                                    ▼                     ▼                 │
│                            ┌─────────────┐     ┌─────────────────┐        │
│                            │  PostgreSQL │     │   Game Servers  │        │
│                            │  (Primary)  │     │  (Scalable)     │        │
│                            └─────────────┘     └─────────────────┘        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### WebSocket Connection Flow

```
1. Player opens browser
   │
   ▼
2. Next.js serves HTML/JS
   │
   ▼
3. JS connects to Event Stream (ws://host:8080)
   │
   ▼
4. Event Stream authenticates via JWT
   │
   ▼
5. Redis Pub/Sub subscribes player to game channel
   │
   ▼
6. Player receives current game state (replay buffer)
   │
   ▼
7. Game loop begins: Player Input → Game Server → Redis → All Players
```

### Connection Management

```typescript
interface ConnectionManager {
  connections: Map<PlayerId, WebSocket>;
  gameSubscriptions: Map<GameId, Set<PlayerId>>;
  heartbeatInterval: number = 30000;

  async handleConnection(playerId: PlayerId, ws: WebSocket): Promise<void> {
    this.connections.set(playerId, ws);
    this.startHeartbeat(playerId);
    this.setupReconnectHandler(playerId, ws);
  }

  async broadcast(gameId: GameId, event: GameEvent): Promise<void> {
    const subscribers = this.gameSubscriptions.get(gameId);
    for (const playerId of subscribers) {
      const ws = this.connections.get(playerId);
      if (ws?.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(event));
      }
    }
  }
}
```

### Redis Pub/Sub Channels

```
game:{gameId}:events    - All game events for broadcasting
game:{gameId}:state     - Current game state snapshots
player:{playerId}:input - Player input actions
system:health           - Health check events
session:{sessionId}     - Session data storage
```

---

## Data Flow Diagrams

### 1. Player Connection Flow

```
Player Browser
       │
       │ 1. Open WebSocket connection
       ▼
┌─────────────┐
│  Web Server │  (Static assets, initial HTML)
└──────┬──────┘
       │ 2. JS bundle loads, connects to WebSocket
       ▼
┌─────────────────┐
│ Event Stream    │  ◄── handshake
│ (WebSocket)     │
└────────┬────────┘
       │ 3. Authenticate with JWT
       ▼
┌─────────────────┐
│  Game Server    │  ◄── validate token
│                 │  ◄── create session
└────────┬────────┘
       │ 4. Subscribe to game events
       ▼
┌─────────────────┐
│  Redis Pub/Sub  │  ◄── channel subscription
└────────┬────────┘
       │ 5. Request game
       ▼
┌─────────────────┐
│  Matchmaker     │  ◄── find/create game
└────────┬────────┘
       │ 6. Join game
       ▼
┌─────────────────┐
│  Game Session   │  ◄── game loop begins
└─────────────────┘
```

### 2. Game Event Flow

```
Player A (Action)
       │
       │ 1. Send input
       ▼
┌─────────────────┐
│ Event Stream    │  ◄── websocket message
└────────┬────────┘
       │ 2. Validate
       ▼
┌─────────────────┐
│ Game Server     │  ◄── process input
│                 │  ◄── update game state
└────────┬────────┘
       │ 3. Publish event
       ▼
┌─────────────────┐
│ Redis Pub/Sub   │  ◄── broadcast
└────────┬────────┘
       │ 4. Fan out
       ▼
┌─────────────────┐     ┌─────────────────┐
│ Event Stream A  │     │ Event Stream B  │
│ (Player A)      │     │ (Player B)      │
└─────────────────┘     └─────────────────┘
       │                      │
       ▼                      ▼
┌─────────────────┐     ┌─────────────────┐
│ Client Update   │     │ Client Update   │
│ (React State)   │     │ (React State)   │
└─────────────────┘     └─────────────────┘
```

### 3. Agent Workflow Flow

```
GitHub Actions
       │
       │ 1. Trigger agent workflow
       ▼
┌─────────────────┐
│ Agent Code      │  ◄── read repo state
│ (Python/TS)     │  ◄── load prompt
└────────┬────────┘
       │ 2. Execute task
       ▼
┌─────────────────┐
│ MiniMax API     │  ◄── LLM inference
└────────┬────────┘
       │ 3. Generate output
       ▼
┌─────────────────┐
│ File Output     │  ◄── write to domain
└────────┬────────┘
       │ 4. Commit and PR
       ▼
┌─────────────────┐
│ GitHub          │  ◄── code review
└────────┬────────┘
       │ 5. Merge
       ▼
┌─────────────────┐
│ Build Pipeline  │  ◄── deploy changes
└─────────────────┘
```

---

## Interface Definitions

### Frontend → Backend

```typescript
// REST API
interface GameAPI {
  // Game lifecycle
  POST /api/games/create          → { gameId: string }
  POST /api/games/:id/join        → { success: true }
  POST /api/games/:id/leave       → { success: true }

  // Player management
  GET /api/players/:id            → Player
  GET /api/players/:id/stats      → PlayerStats

  // Leaderboard
  GET /api/leaderboard            → LeaderboardEntry[]
}

// WebSocket events
interface GameSocketEvents {
  // Client → Server
  'game:join': (gameId: string) => void;
  'game:input': (input: InputAction) => void;
  'game:chat': (message: string) => void;
  'game:leave': () => void;

  // Server → Client
  'game:state': (state: GameState) => void;
  'game:event': (event: GameEvent) => void;
  'player:joined': (player: Player) => void;
  'player:left': (playerId: string) => void;
  'error': (error: GameError) => void;
}
```

### Backend → Services

```typescript
// Redis operations
interface RedisService {
  // Session management
  getSession(sessionId: string): Promise<Session | null>;
  setSession(sessionId: string, session: Session): Promise<void>;
  deleteSession(sessionId: string): Promise<void>;

  // Pub/Sub
  publish(channel: string, event: GameEvent): Promise<void>;
  subscribe(channel: string, callback: (event: GameEvent) => void): Promise<void>;

  // Caching
  cachePlayer(playerId: string, data: PlayerData): Promise<void>;
  getCachedPlayer(playerId: string): Promise<PlayerData | null>;
}

// Database operations
interface DatabaseService {
  // Players
  createPlayer(player: Player): Promise<Player>;
  getPlayer(id: string): Promise<Player | null>;
  updatePlayer(id: string, data: Partial<Player>): Promise<Player>;

  // Games
  createGame(game: Game): Promise<Game>;
  getGame(id: string): Promise<Game | null>;
  updateGame(id: string, data: Partial<Game>): Promise<Game>;

  // Agent behaviors
  saveAgentBehavior(behavior: AgentBehavior): Promise<void>;
  getAgentBehavior(id: string): Promise<AgentBehavior | null>;
}
```

---

## Component Dependencies

```
Component          │ Dependencies                    │ Environment
───────────────────┼────────────────────────────────┼─────────────────
web                │ node_modules, public assets     │ development/prod
server             │ redis, postgres                 │ development/prod
shared             │ (none)                          │ all
event-stream       │ redis                           │ development/prod
```

---

## Deployment Mapping

| Component  | Development       | Production            | Container |
|------------|-------------------|-----------------------|-----------|
| web        | npm run dev       | Vercel/Next.js        | Dockerfile.web |
| server     | npm run dev       | ECS/Cloud Run         | Dockerfile.server |
| redis      | Docker Compose    | ElastiCache/Cloud     | redis:7-alpine |
| postgres   | Docker Compose    | RDS/Cloud SQL         | postgres:15-alpine |
| nginx      | Docker Compose    | Load Balancer         | nginx:alpine |

---

## Security Boundaries

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           TRUST BOUNDARY                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         PUBLIC INTERNET                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                          SSL/TLS TERMINATION                                │
│                                    │                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      API GATEWAY / LOAD BALANCER                     │   │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │  - Rate limiting                                            │  │   │
│  │  │  - DDoS protection                                          │  │   │
│  │  │  - Request validation                                       │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        APPLICATION LAYER                             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐    │   │
│  │  │   Web App   │  │  Game Srv   │  │     Event Stream        │    │   │
│  │  │  (Next.js)  │  │  (Express)  │  │      (Socket.IO)        │    │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────┘    │   │
│  │         │                  │                      │                 │   │
│  │         │        ┌─────────┴─────────┐          │                 │   │
│  │         │        ▼                   ▼          │                 │   │
│  │         │  ┌──────────┐       ┌──────────┐      │                 │   │
│  │         │  │  Redis   │       │ Postgres │      │                 │   │
│  │         │  └──────────┘       └──────────┘      │                 │   │
│  └─────────┴────────────────────────────────────────┘                 │   │
│                                    │                                     │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        DATA LAYER                                    │   │
│  │  ┌─────────────┐  ┌────────────────────────────────────────────┐   │   │
│  │  │  Redis      │  │           PostgreSQL                        │   │   │
│  │  │  (Session)  │  │  (Players, Games, Agent Behaviors)          │   │   │
│  │  └─────────────┘  └────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Current Implementation Status

### ✅ Completed Components

- **Frontend Framework**: Next.js 14 with App Router
- **Game Components**: GameCanvas, ChatPanel, EvolutionFeed, AgentPanel
- **UI Components**: Button, Badge, Card (with tests)
- **Game Engine**: Babel engine with AI opponent
- **WebSocket Server**: Socket.IO-based event stream
- **REST API**: Health endpoints, game API routes
- **Data Layer**: PostgreSQL and Redis services
- **Docker Setup**: Multi-stage Dockerfiles for web and server
- **CI/CD Pipeline**: Lint, test, build, deploy workflow
- **Infrastructure**: Terraform configs for AWS ECS

### 🔄 In Progress

- **Agent Integration**: Full MiniMax API integration (BACKLOG-003)
- **Multiplayer Infrastructure**: WebSocket scaling, session management (BACKLOG-008)
- **Core Game Loop**: 60fps game loop with proper state management (BACKLOG-004)

### 📋 Ready for Implementation

- **Agent Transparency**: Display agent reasoning and decisions to players (BACKLOG-002)
- **First Move Quick Start**: <30s to first gameplay (BACKLOG-001)

### 📋 Future Enhancements

- **Multi-Game Support**: Different game modes
- **Tournaments**: Competitive play structures
- **Analytics**: Player behavior tracking
- **Social Features**: Friends, clans, chat

---

## Technical Debt Items

| Item | Severity | Owner | Status |
|------|----------|-------|--------|
| JWT secret hardcoded | Critical | MonkeyBuilder | Not fixed |
| No token refresh | High | MonkeyBuilder | Not fixed |
| Session binding missing | Medium | MonkeyBuilder | Not fixed |
| Input validation gaps | High | MonkeyBuilder | Not fixed |
| Rate limiting incomplete | Medium | ChaosArchitect | In progress |

---

## File Locations

| Component | File Path |
|-----------|-----------|
| Frontend | `web/` |
| Backend | `server/` |
| Shared Types | `packages/shared/` |
| Docker Configs | `deploy/docker/` |
| Docker Compose | `docker-compose.yml` |
| Environment | `.env.example` |
| Architecture Docs | `.monkeytown/architecture/` |
| Infrastructure | `infrastructure/terraform/` |
| CI/CD | `.github/workflows/` |

---

*Version: 2.0*
*Last updated: 2026-01-18*
*ChaosArchitect - Mapping the chaos*
