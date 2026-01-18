# Monkeytown Component Map

**Visual map of system components and their relationships**

---

## Component Hierarchy

```
monkeytown/
├── web/                          # Frontend Application
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── page.tsx          # Main page
│   │   └── components/           # React components
│   │       ├── GameUI/           # Game interface
│   │       ├── Player/           # Player components
│   │       └── Common/           # Shared UI
│   ├── public/                   # Static assets
│   ├── package.json
│   └── tsconfig.json
│
├── server/                       # Backend Application (to create)
│   ├── src/
│   │   ├── index.ts              # Entry point
│   │   ├── game/
│   │   │   ├── Engine.ts         # Game logic
│   │   │   ├── Matchmaker.ts     # Player matching
│   │   │   └── Session.ts        # Game session
│   │   ├── websocket/
│   │   │   ├── Server.ts         # WebSocket handler
│   │   │   └── Connection.ts     # Connection manager
│   │   ├── agents/
│   │   │   ├── Coordinator.ts    # AI agent coordination
│   │   │   └── Behaviors/        # Agent behavior implementations
│   │   ├── services/
│   │   │   ├── Redis.ts          # Redis client
│   │   │   └── Database.ts       # PostgreSQL client
│   │   └── middleware/
│   │       ├── Auth.ts           # Authentication
│   │       └── RateLimit.ts      # Rate limiting
│   ├── package.json
│   └── tsconfig.json
│
├── packages/
│   └── shared/                   # Shared code
│       ├── index.ts              # Exports
│       ├── types.ts              # TypeScript types
│       └── constants.ts          # Constants
│
├── deploy/                       # Deployment configs
│   ├── docker/
│   │   ├── Dockerfile.web
│   │   ├── Dockerfile.server
│   │   └── nginx.conf
│   └── k8s/                      # (Not used - Docker Compose only)
│
├── infrastructure/               # Infrastructure as code
│   ├── terraform/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   └── outputs.tf
│   └── ansible/
│       └── playbook.yml
│
├── .env.example                  # Environment template
├── docker-compose.yml            # Local development
└── package.json                  # Root workspace
```

---

## Component Communication Map

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              EXTERNAL LAYER                                   │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────────┐           │
│  │  Players │    │   GitHub │    │   MiniMax│    │  Monitoring  │           │
│  └────┬─────┘    │   API    │    │   API    │    │    (Sentry)  │           │
│       │          └──────────┘    └──────────┘    └──────────────┘           │
└───────┼────────────────────────────────────────────────────────────────────┘
        │ WebSocket / HTTP
        ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                           FRONTEND LAYER (web/)                              │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │                        Next.js Application                           │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │     │
│  │  │   App    │  │  Pages   │  │ Components │  │  WebSocket      │    │     │
│  │  │  Router  │  │          │  │            │  │  Client         │    │     │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘    │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│                    │              │              │                           │
│       API Calls    │   WebSocket  │   Static     │                           │
│                    ▼              ▼              ▼                           │
└──────────────────────────────────────────────────────────────────────────────┘
                    │              │
                    ▼              ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                          BACKEND LAYER (server/)                             │
│  ┌─────────────────────────────────────────────────────────────────────┐     │
│  │                      Express Application                             │     │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐    │     │
│  │  │   REST   │  │  Socket  │  │  Agent   │  │  Middleware      │    │     │
│  │  │   API    │  │  .IO     │  │  Handler │  │                  │    │     │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────────────┘    │     │
│  └─────────────────────────────────────────────────────────────────────┘     │
│                    │              │              │                           │
│       Database     │   Pub/Sub    │   External   │                           │
│                    ▼              ▼              ▼                           │
└──────────────────────────────────────────────────────────────────────────────┘
                    │              │
        ┌───────────┼──────────────┼──────────────┐
        ▼           ▼              ▼              ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐
│  PostgreSQL  │ │  Redis   │ │  GitHub  │ │   MiniMax    │
│  (Game Data) │ │ (Cache)  │ │   API    │ │    API       │
└──────────────┘ └──────────┘ └──────────┘ └──────────────┘
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
server             │ redis, postgres, redis          │ development/prod
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

---

*Last updated: 2026-01-18*
*ChaosArchitect - Mapping the chaos*
