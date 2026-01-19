# Monkeytown API Documentation

**Last Updated:** 2026-01-19
**Version:** 1.0

This document describes the Monkeytown game platform API, including WebSocket events, game state models, and player interactions.

---

## Overview

Monkeytown uses a WebSocket-first architecture for real-time multiplayer gameplay. All player-server communication happens over WebSocket connections, with HTTP used only for initial page load and authentication.

```
Player Browser ───▶ WebSocket (Socket.IO) ───▶ Game Server
                        │
                        ▼
                 Redis Pub/Sub ──▶ All Players
```

### Connection Endpoint

```typescript
// Development
const wsUrl = 'ws://localhost:3001';

// Production (WSS required)
const wsUrl = 'wss://api.monkeytown.example.com';
```

### Authentication

WebSocket connections require JWT authentication via query parameter:

```typescript
const token = await getAuthToken();
const socket = io(wsUrl, {
  auth: { token },
  transports: ['websocket']
});
```

---

## WebSocket Events

### Client → Server Events

#### `join_game`

Joins a player to a game lobby.

```typescript
interface JoinGamePayload {
  gameType: 'tictactoe';
  playerCount: 2;
  aiOpponents?: string[]; // Agent IDs
  settings?: GameSettings;
}

interface GameSettings {
  difficulty?: 'easy' | 'medium' | 'hard';
  timeLimit?: number; // minutes, 0 = unlimited
  ranked?: boolean;
}
```

**Response:** `game_state` event with initial state

```typescript
// Example
socket.emit('join_game', {
  gameType: 'tictactoe',
  playerCount: 2,
  aiOpponents: ['StrategistApe']
});
```

#### `player_action`

Sends a player action to the game server.

```typescript
interface PlayerAction {
  actionType: 'place' | 'forfeit' | 'chat';
  payload: ActionPayload;
  timestamp: number; // Client-side for lag compensation
}

interface ActionPayload {
  // Tic-Tac-Toe
  | { row: number; col: number }
  // General
  | { message?: string }
}
```

**Validation:** Server validates action against game rules before applying.

```typescript
// Example: Place symbol in Tic-Tac-Toe
socket.emit('player_action', {
  actionType: 'place',
  payload: { row: 1, col: 1 },
  timestamp: Date.now()
});
```

#### `chat_message`

Sends a chat message in the game lobby or during play.

```typescript
interface ChatMessage {
  content: string;
  recipient?: string; // Player ID, or 'all' for broadcast
  type: 'public' | 'private' | 'emote';
}
```

**Agent Prefixing:** AI agent messages are prefixed with their emoji:

```typescript
// From TricksterMonkey
{ content: "I see what you're doing there...", type: 'public' }
// Displayed as: 🎭 I see what you're doing there...
```

#### `feedback`

Submits player feedback about the game or specific features.

```typescript
interface FeedbackPayload {
  category: 'gameplay' | 'ai_behavior' | 'ui_ux' | 'performance' | 'general';
  rating: 1 | 2 | 3 | 4 | 5;
  comment?: string;
  context?: {
    gameType?: string;
    featureId?: string;
    timestamp?: number;
  };
}
```

#### `evolution_consent`

Controls whether the player wants to receive game evolution updates.

```typescript
interface EvolutionConsent {
  enabled: boolean;
  notifyOnMajorUpdates: boolean;
  notifyOnMinorUpdates: boolean;
}
```

---

### Server → Client Events

#### `game_state`

Sent on connection and after every state change.

```typescript
interface GameState {
  gameId: string;
  gameType: 'tictactoe';
  phase: 'lobby' | 'playing' | 'finished';
  players: PlayerState[];
  currentTurn: number; // Player index
  gameData: GameData; // Game-specific data
  metadata: GameMetadata;
}

interface PlayerState {
  playerId: string;
  name: string;
  isAi: boolean;
  agentId?: string; // If isAi
  avatar?: string;
  score: number;
  status: 'connected' | 'disconnected' | 'ready' | 'playing';
  memoryScore?: number; // Attachment metric
}

interface GameMetadata {
  startedAt?: number;
  lastActionAt: number;
  turnNumber: number;
  round?: number;
}
```

**State Updates:** Client should merge `game_state` updates, not replace entirely, for smooth rendering.

#### `game_action`

Notifies all players of an action that occurred.

```typescript
interface GameActionEvent {
  playerId: string;
  actionType: string;
  payload: unknown;
  timestamp: number;
  validation?: {
    valid: boolean;
    reason?: string;
  };
}
```

```typescript
// Example: Card played
{
  playerId: 'player_123',
  actionType: 'play_card',
  payload: { cardId: 'tower_5', towerId: 2 },
  timestamp: 1705594245000,
  validation: { valid: true }
}
```

#### `turn_change`

Notifies when turn passes to another player.

```typescript
interface TurnChangeEvent {
  fromPlayerId: string;
  toPlayerId: string;
  turnNumber: number;
  phase?: string; // For complex games
}
```

#### `player_event`

Player-related events (join, leave, connection status).

```typescript
type PlayerEventType = 'joined' | 'left' | 'connected' | 'disconnected' | 'ready';

interface PlayerEvent {
  type: PlayerEventType;
  playerId: string;
  playerName?: string;
  isAi?: boolean;
  agentId?: string;
  reason?: string;
  timestamp: number;
}
```

#### `game_error`

Error events that require player attention.

```typescript
interface GameError {
  code: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  actionable?: boolean;
  suggestedAction?: string;
}
```

**Error Codes:**

| Code | Meaning | Action |
|------|---------|--------|
| `INVALID_ACTION` | Action violated game rules | See message for details |
| `TIMEOUT` | Action took too long | Try again |
| `NOT_YOUR_TURN` | Tried to act out of turn | Wait for your turn |
| `GAME_FULL` | Lobby is full | Find another lobby |
| `PLAYER_DISCONNECTED` | Player lost connection | Waiting for reconnect |
| `GAME_ABORTED` | Game ended unexpectedly | Start new game |

#### `achievement`

Player achievement notification.

```typescript
interface AchievementEvent {
  achievementId: string;
  name: string;
  description: string;
  points?: number;
  icon?: string;
  playerId: string;
}
```

#### `agent_transparency`

AI agent decision transparency data.

```typescript
interface AgentTransparencyEvent {
  agentId: string;
  agentName: string;
  personality: string;
  decision?: {
    action: string;
    reasoning: string; // Plain English explanation
    confidence: number; // 0-1
    factors: string[]; // What influenced the decision
  };
  memory?: {
    turnsSinceLastInteraction: number;
    playerInteractions: number;
    positiveSentiment: number;
  };
}
```

#### `evolution_update`

Game evolution event notification.

```typescript
interface EvolutionUpdateEvent {
  updateType: 'feature' | 'fix' | 'balance' | 'experiment';
  title: string;
  description: string;
  impact: 'major' | 'minor' | 'experimental';
  changelog?: string;
  liveAt: number;
}
```

---

## Game State Models

### Tic-Tac-Toe Game State

```typescript
interface TicTacToeGameState {
  gameType: 'tictactoe';
  board: TicTacToeBoard;
  currentPlayer: number;
  currentSymbol: 'X' | 'O';
  moveCount: number;
  winnerId?: string;
  winningLine?: number[][];
  isDraw?: boolean;
}

interface TicTacToeBoard {
  // 3x3 grid where each cell is 'X', 'O', or null
  cells: (('X' | 'O' | null))[][];
}

// Example game state
{
  gameType: 'tictactoe',
  board: {
    cells: [
      ['X', 'O', null],
      [null, 'X', null],
      ['O', null, null]
    ]
  },
  currentPlayer: 0,
  currentSymbol: 'X',
  moveCount: 4,
  winnerId: undefined,
  winningLine: undefined,
  isDraw: false
}
```

---

## AI Agent Communication

### Agent Identification

All AI players are identified by their agent ID:

```typescript
interface AgentInfo {
  agentId: string; // e.g., 'TricksterMonkey'
  name: string; // e.g., 'TricksterMonkey'
  emoji: string; // e.g., '🎭'
  personality: AgentPersonality;
  stats: AgentStats;
}

interface AgentPersonality {
  traits: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  style: 'aggressive' | 'defensive' | 'balanced' | 'unpredictable' | 'teaching';
  specialAbilities?: string[];
}

interface AgentStats {
  gamesPlayed: number;
  wins: number;
  winRate: number;
  averageScore: number;
  favoriteGames: string[];
  learningProgress?: number;
}
```

### Agent Decision Transparency

Players can request transparency data from AI opponents:

```typescript
// Request transparency data for a specific agent
socket.emit('request_agent_transparency', {
  agentId: 'TricksterMonkey'
});

// Response: agent_transparency event
```

---

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| `join_game` | 10 | per minute |
| `player_action` | 30 | per minute |
| `chat_message` | 10 | per minute |
| `feedback` | 5 | per minute |

Exceeding limits triggers `game_error` with code `RATE_LIMITED`.

---

## Connection Handling

### Reconnection

Clients should implement exponential backoff reconnection:

```typescript
socket.on('connect_error', (error) => {
  console.log('Connection error:', error.message);
  setTimeout(() => {
    socket.connect();
  }, Math.pow(2, attempt) * 1000);
});

socket.on('disconnect', (reason) => {
  if (reason === 'io server disconnect') {
    // Server initiated disconnect, need manual reconnect
    socket.connect();
  }
});
```

### Heartbeat

Server sends `ping` every 30 seconds. Client must respond with `pong`:

```typescript
socket.on('ping', () => {
  socket.emit('pong');
});
```

Connection timeout: 60 seconds without activity.

---

## Error Handling

### Client-Side Error Handler

```typescript
socket.on('game_error', (error: GameError) => {
  switch (error.severity) {
    case 'critical':
      // Game cannot continue
      showModal(error.message);
      break;
    case 'error':
      // Action failed
      showToast(error.message, 'error');
      break;
    case 'warning':
      // Caution advised
      showToast(error.message, 'warning');
      break;
    case 'info':
      // Informational
      console.log(error.message);
  }
});
```

---

## Example: Complete Game Session

```typescript
// 1. Connect and authenticate
const socket = io(wsUrl, {
  auth: { token: await getAuthToken() }
});

// 2. Wait for connection
socket.on('connect', () => {
  console.log('Connected to game server');
  
  // 3. Join a game
  socket.emit('join_game', {
    gameType: 'babel',
    playerCount: 4,
    aiOpponents: ['TricksterMonkey', 'StrategistApe']
  });
});

// 4. Receive initial game state
socket.on('game_state', (state: GameState) => {
  renderGame(state);
  if (state.phase === 'lobby') {
    showWaitingForPlayers();
  }
});

// 5. Handle turn changes
socket.on('turn_change', (event: TurnChangeEvent) => {
  highlightCurrentPlayer(event.toPlayerId);
});

// 6. Handle actions
socket.on('game_action', (action: GameActionEvent) => {
  animateAction(action);
});

// 7. Handle game end
socket.on('game_action', (event) => {
  if (event.actionType === 'game_over') {
    showResults(event.payload);
  }
});
```

---

## Related Documentation

| Document | Description |
|----------|-------------|
| [Architecture](../docs/architecture.md) | System architecture overview |
| [Agent Communication Protocol](../docs/agent-communication-protocol.md) | How agents coordinate |
| [Game Rules](../docs/games/) | Individual game rules |
| [Security Requirements](../.monkeytown/security/security-requirements.md) | Security specifications |

---

*Last updated: 2026-01-18*
*ScribbleSimian — Making clarity stick* 🐒
