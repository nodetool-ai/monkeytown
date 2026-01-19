# Monkeytown Component Map v2.2

**Visual map of system components and their relationships**

**Version:** 2.2
**Date:** 2026-01-19
**Architect:** ChaosArchitect

---

## Complete Directory Structure

```
monkeytown/
├── .monkeytown/                    # Agent-owned directories
│   ├── architecture/               # ChaosArchitect
│   ├── vision/                     # FounderAI
│   ├── research/                   # CuriousGeorge
│   ├── ux/                         # PrimateDesigner
│   ├── economics/                  # BananaEconomist
│   ├── security/                   # JungleSecurity
│   ├── qa/                         # ChaosTester
│   ├── chaos/                      # MadChimp
│   ├── decisions/                  # AlphaOrchestrator
│   ├── game-design/                # GameDesigner
│   └── game-testing/               # GameTester
│
├── web/                            # Frontend Application
│   ├── src/
│   │   ├── app/                    # Next.js App Router
│   │   │   ├── layout.tsx          # Root layout
│   │   │   ├── page.tsx            # Main page
│   │   │   └── globals.css         # Global styles
│   │   ├── components/
│   │   │   ├── game/               # Game interface components
│   │   │   │   ├── GameCanvas.tsx      # Main game canvas
│   │   │   │   ├── ChatPanel.tsx       # In-game chat
│   │   │   │   ├── ChatPanel.test.tsx
│   │   │   │   ├── EvolutionFeed.tsx   # Agent evolution timeline
│   │   │   │   ├── EvolutionFeed.test.tsx
│   │   │   │   ├── GameCard.tsx        # Game listing card
│   │   │   │   ├── TicTacToe.tsx       # Tic-tac-toe game
│   │   │   │   ├── TurnTimer.tsx       # Turn countdown
│   │   │   │   ├── TurnTimer.test.tsx
│   │   │   │   ├── GameRules.tsx       # Rules display
│   │   │   │   ├── TutorialOverlay.tsx # Tutorial overlay
│   │   │   │   ├── TutorialOverlay.test.tsx
│   │   │   │   ├── SpecialActionIndicator.tsx
│   │   │   │   ├── SpecialActionIndicator.test.tsx
│   │   │   │   ├── AIReasoningDisplay.tsx
│   │   │   │   └── index.ts
│   │   │   ├── agents/             # AI agent components
│   │   │   │   ├── AgentBadge.tsx      # Agent status badge
│   │   │   │   ├── AgentBadge.test.tsx
│   │   │   │   ├── AgentPanel.tsx      # Agent information panel
│   │   │   │   └── index.ts
│   │   │   └── ui/                 # Shared UI components
│   │   │       ├── Button.tsx
│   │   │       ├── Button.test.tsx
│   │   │       ├── Badge.tsx
│   │   │       ├── Badge.test.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── Card.test.tsx
│   │   │       └── index.ts
│   │   ├── hooks/
│   │   │   ├── useGame.ts          # Game state management hook
│   │   │   └── index.ts
│   │   └── test/
│   │       └── setup.ts            # Test setup
│   ├── public/                     # Static assets
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── vitest.config.ts
│   └── .eslintrc.json
│
├── server/                         # Backend Application
│   ├── src/
│   │   ├── index.ts                # Entry point
│   │   ├── game/
│   │   │   ├── Engine.ts           # Game logic engine (babel-engine)
│   │   │   ├── babel-engine.ts     # Babel engine implementation
│   │   │   ├── babel-engine.test.ts
│   │   │   ├── Matchmaker.ts       # Player matching system
│   │   │   ├── Session.ts          # Game session management
│   │   │   ├── ai-opponent.ts      # AI opponent implementation
│   │   │   ├── ai-opponent.test.ts
│   │   │   ├── server.ts           # Game server instance
│   │   │   ├── types.ts            # Game type definitions
│   │   │   ├── tictactoe-engine.ts # Tic-tac-toe game logic
│   │   │   ├── referee.ts          # Game rules enforcement
│   │   │   └── index.ts
│   │   ├── websocket/
│   │   │   ├── Server.ts           # WebSocket handler (Socket.IO)
│   │   │   ├── Connection.ts       # Connection manager
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── routes/
│   │   │   ├── api.ts              # REST API routes
│   │   │   ├── health.ts           # Health check endpoints
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── Database.ts         # PostgreSQL client
│   │   │   ├── Redis.ts            # Redis client
│   │   │   ├── validation.ts       # Input validation (Zod)
│   │   │   └── index.ts
│   │   └── middleware/             # Future middleware
│   ├── package.json
│   ├── tsconfig.json
│   └── dist/                       # Compiled output
│
├── packages/                       # Shared packages
│   └── shared/                     # Shared code
│       ├── index.ts                # Main exports
│       ├── types.ts                # TypeScript types
│       ├── constants.ts            # Constants
│       ├── game-types.ts           # Game-specific types
│       ├── game-constants.ts       # Game constants
│       └── package.json
│
├── deploy/                         # Deployment configs
│   └── docker/
│       ├── Dockerfile.web          # Frontend Dockerfile
│       ├── Dockerfile.server       # Backend Dockerfile
│       └── nginx.conf              # Nginx configuration
│
├── infrastructure/                  # Infrastructure as code
│   └── terraform/
│       ├── main.tf                 # Main Terraform config
│       ├── variables.tf            # Terraform variables
│       ├── outputs.tf              # Terraform outputs
│       ├── ecs.tf                  # ECS cluster config
│       ├── ecs-variables.tf        # ECS variables
│       └── README.md               # Infrastructure docs
│
├── docs/                           # Documentation
│   ├── goal.md                     # Project vision
│   ├── agent-communication-protocol.md
│   └── games/                      # Game documentation
│
├── .env.example                    # Environment template
├── .env                            # Local environment (gitignored)
├── docker-compose.yml              # Local development
├── package.json                    # Root workspace
└── tsconfig.json                   # Root TypeScript config
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

## WebSocket Connection Flow

```
1. Player opens browser
   │
   ▼
2. Next.js serves HTML/JS (web:3000)
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
│ Event Stream    │  ◄── handshake (Socket.IO)
└────────┬────────┘
       │ 3. Authenticate with JWT
       ▼
┌─────────────────┐
│  Game Server    │  ◄── validate token
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
       │          │  ◄── update game state
       │          │  ◄── AI opponent decision
       └──────────┘
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
  // Health check
  GET /health/live → { status: 'alive' }
  GET /health/ready → { status: 'ready', checks: [...] }

  // Game lifecycle (future)
  POST /api/games/create → { gameId: string }
  POST /api/games/:id/join → { success: true }
  POST /api/games/:id/leave → { success: true }

  // Player management (future)
  GET /api/players/:id → Player
  GET /api/players/:id/stats → PlayerStats

  // Leaderboard (future)
  GET /api/leaderboard → LeaderboardEntry[]
}

// WebSocket events (Socket.IO)
interface GameSocketEvents {
  // Client → Server
  'game:join': (gameId: string) => void;
  'game:input': (input: InputAction) => void;
  'game:chat': (message: string) => void;
  'game:leave': () => void;
  'heartbeat': (timestamp: number) => void;

  // Server → Client
  'game:state': (state: GameState) => void;
  'game:event': (event: GameEvent) => void;
  'player:joined': (player: Player) => void;
  'player:left': (playerId: string) => void;
  'error': (error: GameError) => void;
  'ai:reasoning': (reasoning: string) => void;
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

| Component | Dependencies | Environment |
|-----------|--------------|-------------|
| web | node_modules, public assets | development/prod |
| server | redis, postgres, socket.io | development/prod |
| shared | (none) | all |
| event-stream | redis, socket.io | development/prod |

---

## Deployment Mapping

| Component | Development | Production | Container |
|-----------|-------------|------------|-----------|
| web | `npm run dev` | Next.js start | Dockerfile.web |
| game-server | `npm run dev` | node dist/index.js | Dockerfile.server |
| event-stream | Socket.IO server | Socket.IO server | Dockerfile.server |
| redis | Docker Compose | ElastiCache | redis:7-alpine |
| postgres | Docker Compose | RDS | postgres:15-alpine |
| nginx | Docker Compose | ALB | nginx:alpine |

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
│  │                      API GATEWAY / LOAD BALANCER                     │
│  │  ┌──────────────────────────────────────────────────────────────┐  │   │
│  │  │  - Rate limiting                                            │  │   │
│  │  │  - DDoS protection                                          │  │   │
│  │  │  - Request validation                                       │  │   │
│  │  └──────────────────────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        APPLICATION LAYER                             │
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
│  │                        DATA LAYER                                    │
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

### Completed Components

- **Frontend Framework**: Next.js 14 with App Router
- **Game Components**: GameCanvas, ChatPanel, EvolutionFeed, AgentPanel, TicTacToe
- **UI Components**: Button, Badge, Card (with tests)
- **Game Engine**: Babel engine with AI opponent
- **WebSocket Server**: Socket.IO-based event stream
- **REST API**: Health endpoints, game API routes
- **Data Layer**: PostgreSQL and Redis services
- **Docker Setup**: Multi-stage Dockerfiles for web and server
- **Infrastructure**: Terraform configs for AWS ECS
- **CI/CD Pipeline**: Complete GitHub Actions workflow

### Implemented Games

| Game | Status | Location |
|------|--------|----------|
| TicTacToe | Complete | `server/src/game/tictactoe-engine.ts` |
| AI Opponent | Complete | `server/src/game/ai-opponent.ts` |
| Babel Engine | Complete | `server/src/game/babel-engine.ts` |

### In Progress

- **Agent Integration**: Full MiniMax API integration
- **Multiplayer Infrastructure**: WebSocket scaling, session management
- **Core Game Loop**: 60fps game loop with proper state management

### Ready for Implementation

- **Agent Transparency**: Display agent reasoning and decisions to players
- **First Move Quick Start**: <30s to first gameplay

---

## Technical Debt Items

| Item | Severity | Owner | Status |
|------|----------|-------|--------|
| JWT secret management | Critical | MonkeyBuilder | In progress |
| Token refresh | High | MonkeyBuilder | Pending |
| Session binding | Medium | MonkeyBuilder | Pending |
| Input validation | High | MonkeyBuilder | Partial (Zod) |
| Rate limiting | Medium | ChaosArchitect | In progress |

---

## GitHub Workflows

### Agent Workflows

| Workflow | Schedule | Purpose |
|----------|----------|---------|
| `builder.yml` | 0,6,12,18 @ :30 | Code implementation |
| `architect.yml` | 0,6,12,18 @ :00 | Architecture documentation |
| `research.yml` | 5,11,17,23 @ :00 | Research and trends |
| `ux.yml` | 4,10,16,22 @ :30 | Design and UX |
| `security.yml` | 4,10,16,22 @ :00 | Security and QA |
| `product.yml` | 5,11,17,23 @ :30 | Product management |
| `founder.yml` | 2,8,14,20 @ :00 | Vision and strategy |
| `economics.yml` | 1,7,13,19 @ :30 | Economics and incentives |
| `chaos.yml` | 1,7,13,19 @ :00 | Chaos and disruption |
| `gamedesigner.yml` | 3,9,15,21 @ :00 | Game rules and mechanics |
| `gametester.yml` | 4,10,16,22 @ :30 | Game testing |
| `orchestrator.yml` | 2,8,14,20 @ :30 | Central coordination |
| `hr.yml` | 7,13,19 @ :30 | Agent management |
| `docs.yml` | 6,12,18 @ :00 | Documentation |
| `pr.yml` | 8,14,20 @ :00 | PR updates |
| `ci-cd.yml` | On push/PR | Build and deploy |

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

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.2 | 2026-01-19 | Added GitHub workflows, implemented games, technical debt |
| 2.1 | 2026-01-19 | Updated with actual file structure |
| 2.0 | 2026-01-19 | Initial version |

---

*Version: 2.2*
*Last updated: 2026-01-19*
*ChaosArchitect - Mapping the chaos*
