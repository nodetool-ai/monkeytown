# Architecture Overview

**Current as of:** 2026-01-19
**Derived from agent decisions and codebase analysis.**

---

## System Philosophy

Monkeytown is a multiplayer game platform where AI agents build and operate games for human players. The architecture prioritizes real-time gameplay with AI opponents that have visible personalities and transparent decision-making.

---

## High-Level Structure

```
┌─────────────────────────────────────────────────────┐
│                   Player Browser                     │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │              React Application               │  │
│  │  ┌────────────────────────────────────────┐  │  │
│  │  │            Game Components             │  │  │
│  │  │  ┌──────────┐  ┌──────────────────┐   │  │  │
│  │  │  │GameCanvas│  │    ChatPanel     │   │  │  │
│  │  │  └──────────┘  └──────────────────┘   │  │  │
│  │  │  ┌──────────┐  ┌──────────────────┐   │  │  │
│  │  │  │Evolution │  │  AI Reasoning    │   │  │  │
│  │  │  │  Feed    │  │    Display       │   │  │  │
│  │  │  └──────────┘  └──────────────────┘   │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │              Next.js Frontend                 │  │
│  └──────────────────────────────────────────────┘  │
│                         │                          │
│              WebSocket (Socket.IO)                  │
│                         │                          │
│                         ▼                          │
┌─────────────────────────────────────────────────────┐
│              Node.js Game Server                    │
│                                                      │
│  ┌──────────────────────────────────────────────┐  │
│  │              Game Engines                    │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐     │  │
│  │  │TicTacToe│  │  Babel  │  │  Chess  │     │  │
│  │  │ Engine  │  │ Engine  │  │  (WIP)  │     │  │
│  │  └────┬────┘  └────┬────┘  └─────────┘     │  │
│  │       │            │                       │  │
│  │       └────────────┼───────────────────────┘  │
│  │                    ▼                          │
│  │            ┌──────────────┐                   │
│  │            │    AI        │                   │
│  │            │  Opponents   │                   │
│  │            └──────┬───────┘                   │
│  │                   │                           │
│  │         ┌─────────┴─────────┐                 │
│  │         ▼                   ▼                 │
│  │  ┌─────────────┐    ┌─────────────┐          │
│  │  │   Redis     │    │  Session    │          │
│  │  │   Pub/Sub   │    │   Store     │          │
│  │  └─────────────┘    └─────────────┘          │
│  └──────────────────────────────────────────────┘  │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Frontend (React + Next.js 14)

The frontend follows a component-based architecture with game-specific and shared components:

```
web/src/
├── app/
│   ├── page.tsx              # Main landing/lobby
│   └── layout.tsx            # App shell
│
├── components/
│   ├── game/
│   │   ├── GameCanvas.tsx    # Main game container
│   │   ├── TicTacToe.tsx     # TicTacToe game UI
│   │   ├── GameRules.tsx     # Rules display
│   │   ├── ChatPanel.tsx     # Game chat
│   │   ├── EvolutionFeed.tsx # Updates from agents
│   │   ├── TurnTimer.tsx     # Countdown timer
│   │   ├── TutorialOverlay.tsx # Tutorial system
│   │   ├── SpecialActionIndicator.tsx # Action feedback
│   │   ├── AIReasoningDisplay.tsx # AI decision transparency
│   │   ├── GameCard.tsx      # Lobby game selection
│   │   └── index.ts          # Export all
│   │
│   └── shared/
│       └── (shared components)
│
├── styles/
│   └── (global styles)
└── types/
    └── (type definitions)
```

### Backend (Node.js + Socket.IO)

The server handles real-time game state and AI opponent logic:

```
server/src/
├── game/
│   ├── index.ts              # Game exports
│   ├── server.ts             # Socket.IO server setup
│   ├── session.ts            # Game session management
│   ├── matchmaker.ts         # Player matching
│   ├── referee.ts            # Game rule enforcement
│   ├── types.ts              # Game types
│   │
│   ├── tictactoe-engine.ts   # TicTacToe game logic
│   ├── babel-engine.ts       # Babel Tower game logic
│   └── ai-opponent.ts        # AI player implementation
│
├── routes/
│   └── api.ts                # REST endpoints
│
├── services/
│   └── database.ts           # Data persistence
│
├── websocket/
│   └── server.ts             # WebSocket handlers
│
└── index.ts                  # Server entry point
```

### Shared Layer

Shared types and utilities between frontend and backend:

```
packages/shared/
├── index.ts                  # Public exports
├── game-types.ts             # Core type definitions
│   ├── GameType              # tictactoe | babel | chess | words
│   ├── Player                # Player state
│   ├── GameState             # Game state interface
│   ├── Agent                 # AI agent definitions
│   ├── ChatMessage           # Chat interface
│   ├── EvolutionEvent        # Evolution feed events
│   └── GAME_CONFIGS          # Per-game configurations
│
├── gaming-protocol.ts        # WebSocket protocol types
└── constants.ts              # Shared constants
```

---

## Game Implementation Status

| Game | Status | Location | Notes |
|------|--------|----------|-------|
| **TicTacToe** | ✅ Implemented | `web/src/components/game/TicTacToe.tsx`, `server/src/game/tictactoe-engine.ts` | Main game, fully playable |
| **Babel Tower** | ⚠️ Partial | `server/src/game/babel-engine.ts` | Backend complete, frontend pending |
| **Chess** | 🔲 Defined | `packages/shared/game-types.ts` | Types defined, engine not started |
| **Word Builder** | 🔲 Defined | `packages/shared/game-types.ts` | Types defined as "words", engine not started |

**Critical Issue:** Navigation bug prevents access to 66% of documented games. Only TicTacToe is currently playable. See `.monkeytown/game-testing/bugs/bug-001-navigation-broken.md`.

---

## Data Architecture

### Game Type Model

```typescript
type GameType = 'tictactoe' | 'babel' | 'chess' | 'words';

interface GameConfig {
  gameType: GameType;
  maxPlayers: number;
  minPlayers: number;
  rounds: number;
  turnDurationSeconds: number;
}
```

### Game State Model

```typescript
interface GameState {
  id: string;
  gameType: GameType;
  mode: GameMode;           // fast | casual | social | competitive
  status: GameStatus;       // waiting | live | ended
  players: Player[];
  round: number;
  maxRounds: number;
  currentPlayerId: string;
  turnTimeRemaining: number;
  createdAt: number;
  updatedAt: number;
}
```

### Player Model

```typescript
interface Player {
  id: string;
  name: string;
  type: 'human' | 'agent';
  agentType?: AgentType;    // Only for AI players
  avatar?: string;
  score: number;
  isConnected: boolean;
}
```

### AI Agent Types

**Player Agents** (in-game opponents):
```typescript
type PlayerAgentType = 
  | 'trickster'    // TricksterMonkey - Unpredictable
  | 'strategist'   // StrategistApe - Long-term planning
  | 'speedster'    // SpeedyGibbon - Quick decisions
  | 'guardian'     // GuardianGorilla - Defensive
  | 'wildcard'     // WildcardLemur - Random
  | 'mentor'       // MentorOrangutan - Teaching
  | 'champion';    // ChampionChimp - Competitive
```

---

## Design Tokens

The visual system uses CSS custom properties for consistency:

### Primary Colors

```css
:root {
  --color-primary: #FF6B35;      /* Tangerine - brand color */
  --color-jungle-canopy: #1a3a2f;
  --color-jungle-depth: #0f1f1a;
  --color-monkey-fur: #d4a574;
  --color-monkey-fur-light: #e8c9a8;
}
```

### Agent Colors

```css
:root {
  --color-trickster: #D946EF;    /* Fuchsia */
  --color-strategist: #6366F1;   /* Indigo */
  --color-speedster: #F59E0B;    /* Amber */
  --color-guardian: #64748B;     /* Slate */
  --color-wildcard: #FB7185;     /* Rose */
  --color-mentor: #10B981;       /* Emerald */
  --color-champion: #EF4444;     /* Red */
}
```

### Typography

```css
:root {
  --font-family-display: 'Space Grotesk', system-ui;
  --font-family-body: 'Inter', system-ui;
  --font-size-display: 32px;
  --font-size-h1: 24px;
  --font-size-h2: 18px;
  --font-size-body: 14px;
}
```

### Animation

```css
:root {
  --duration-instant: 50ms;
  --duration-quick: 150ms;
  --duration-standard: 300ms;
  --duration-considered: 500ms;
}
```

---

## WebSocket Protocol

### Connection

```typescript
// Development
const wsUrl = 'ws://localhost:3001';

// Production
const wsUrl = 'wss://api.monkeytown.example.com';

// Authenticated connection
const socket = io(wsUrl, {
  auth: { token: await getAuthToken() },
  transports: ['websocket']
});
```

### Client → Server Events

| Event | Description |
|-------|-------------|
| `join_game` | Join a game lobby |
| `player_action` | Submit a game move |
| `chat_message` | Send chat message |
| `feedback` | Submit player feedback |

### Server → Client Events

| Event | Description |
|-------|-------------|
| `game_state` | Full game state sync |
| `game_action` | Action notification |
| `turn_change` | Turn progression |
| `game_error` | Error notification |
| `agent_transparency` | AI decision data |
| `evolution_update` | Game evolution events |

See [API.md](API.md) for complete protocol documentation.

---

## Performance Constraints

| Constraint | Limit | Reason |
|------------|-------|--------|
| WebSocket latency | < 100ms | Real-time gameplay |
| Game loop | 60fps | Smooth gameplay |
| Turn timer | 30-120s | Game-specific |
| Max players per game | 5 | Balance and performance |
| Chat rate limit | 10/min | Anti-spam |

---

## Related Documentation

| Document | Description |
|----------|-------------|
| [API.md](API.md) | Complete WebSocket protocol |
| [games/README.md](games/README.md) | Game collection overview |
| [agent-communication-protocol.md](agent-communication-protocol.md) | Agent coordination |
| `.monkeytown/architecture/` | Agent architecture decisions |
| `.monkeytown/decisions/state-of-monkeytown.md` | Current system state |

---

*Document Version: 2.0.0*
*Updated: 2026-01-19*
*Reflects actual implementation, not aspirational architecture*
