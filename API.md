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
  gameType: 'tictactoe' | 'babel' | 'chess' | 'words';
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
// Example: Join TicTacToe
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
  actionType: 'place' | 'play' | 'move' | 'swap' | 'forfeit' | 'chat';
  payload: ActionPayload;
  timestamp: number; // Client-side for lag compensation
}

interface ActionPayload {
  // Tic-Tac-Toe
  | { action: 'place'; row: number; col: number }
  // Babel Tower
  | { action: 'play' | 'sabotage' | 'boost' | 'steal'; cardId: string; targetId?: string }
  // Chess
  | { action: 'move'; from: string; to: string; promotion?: 'queen' | 'rook' | 'bishop' | 'knight' }
  // Word Builder
  | { action: 'play' | 'swap'; tiles: { letter: string; position: number }[] }
  // General
  | { action: 'chat'; message?: string }
  | { action: 'forfeit' }
}
```

**Validation:** Server validates action against game rules before applying.

```typescript
// Example: Place symbol in Tic-Tac-Toe
socket.emit('player_action', {
  actionType: 'place',
  payload: { action: 'place', row: 1, col: 1 },
  timestamp: Date.now()
});

// Example: Play a card in Babel Tower
socket.emit('player_action', {
  actionType: 'play',
  payload: { action: 'play', cardId: 'card_123' },
  timestamp: Date.now()
});

// Example: Make a move in Chess
socket.emit('player_action', {
  actionType: 'move',
  payload: { action: 'move', from: 'e2', to: 'e4' },
  timestamp: Date.now()
});

// Example: Play a word in Word Builder
socket.emit('player_action', {
  actionType: 'play',
  payload: { action: 'play', tiles: [
    { letter: 'C', position: 0 },
    { letter: 'A', position: 1 },
    { letter: 'T', position: 2 }
  ]},
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
// From TricksterMonkey (type: 'trickster')
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
  gameType: 'tictactoe' | 'babel' | 'chess' | 'words';
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

### Supported Game Types

Monkeytown currently supports four game types:

| Game Type | Name | Players | Duration | Status |
|-----------|------|---------|----------|--------|
| `tictactoe` | Tic-Tac-Toe | 2 | 2-5 min | ✅ Playable |
| `babel` | Babel Tower | 2-5 | 10-20 min | ⚠️ Limited |
| `chess` | Monkey Chess | 2 | 15-60 min | 🔲 Blocked |
| `words` | Word Builder | 2-5 | 5-15 min | 🔲 Blocked |

**Note:** Some games may have limited accessibility due to navigation issues. See the [Player Guide](./docs/player-guide.md) for current availability.

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

### Babel Tower Game State

```typescript
interface BabelTowerGameState {
  gameType: 'babel';
  round: number;
  maxRounds: number;
  currentPlayer: number;
  hands: BabelPlayerHand[];
  table: BabelCard[];
  towers: BabelTower[];
  score: Record<string, number>;
}

interface BabelPlayerHand {
  playerId: string;
  cards: BabelCard[];
}

interface BabelCard {
  id: string;
  suit: 'stone' | 'brick' | 'wood' | 'glass';
  value: number; // 1-25
}

interface BabelTower {
  playerId: string;
  height: number;
  score: number;
}

// Example game state
{
  gameType: 'babel',
  round: 3,
  maxRounds: 12,
  currentPlayer: 0,
  hands: [
    { playerId: 'player_1', cards: [{ id: 'c1', suit: 'wood', value: 15 }] },
    { playerId: 'StrategistApe', cards: [{ id: 'c2', suit: 'glass', value: 22 }] }
  ],
  table: [{ id: 't1', suit: 'stone', value: 8 }],
  towers: [
    { playerId: 'player_1', height: 45, score: 120 },
    { playerId: 'StrategistApe', height: 52, score: 135 }
  ],
  score: { 'player_1': 120, 'StrategistApe': 135 }
}
```

### Monkey Chess Game State

```typescript
interface ChessGameState {
  gameType: 'chess';
  board: ChessBoard;
  currentPlayer: 'white' | 'black';
  moveNumber: number;
  halfmoveClock: number; // For 50-move rule
  castlingRights: CastlingRights;
  enPassantTarget?: string; // Square coordinate
  gameResult?: ChessGameResult;
  moveHistory: ChessMove[];
}

interface ChessBoard {
  // 8x8 board, null = empty, otherwise piece notation
  squares: (ChessPiece | null)[][];
}

interface ChessPiece {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'white' | 'black';
}

interface CastlingRights {
  whiteKingSide: boolean;
  whiteQueenSide: boolean;
  blackKingSide: boolean;
  blackQueenSide: boolean;
}

interface ChessMove {
  from: string; // e.g., 'e2'
  to: string; // e.g., 'e4'
  notation: string; // e.g., 'e4', 'Nf3', 'O-O'
  timestamp: number;
}

type ChessGameResult = 'white_wins' | 'black_wins' | 'draw' | 'stalemate';
```

### Word Builder Game State

```typescript
interface WordBuilderGameState {
  gameType: 'words';
  round: number;
  maxRounds: number;
  currentPlayer: number;
  racks: WordPlayerRack[];
  pool: LetterDistribution;
  playedWords: PlayedWord[];
  scores: Record<string, number>;
  tileBagCount: number;
}

interface WordPlayerRack {
  playerId: string;
  tiles: LetterTile[];
}

interface LetterTile {
  letter: string;
  value: number;
}

interface LetterDistribution {
  [letter: string]: number;
}

interface PlayedWord {
  playerId: string;
  word: string;
  score: number;
  timestamp: number;
}

// Letter values
const LETTER_VALUES: Record<string, number> = {
  'A': 1, 'B': 3, 'C': 3, 'D': 2, 'E': 1, 'F': 4, 'G': 2,
  'H': 4, 'I': 1, 'J': 8, 'K': 5, 'L': 1, 'M': 3, 'N': 1,
  'O': 1, 'P': 3, 'Q': 10, 'R': 1, 'S': 1, 'T': 1, 'U': 1,
  'V': 4, 'W': 4, 'X': 8, 'Y': 4, 'Z': 10
};

// Example game state
{
  gameType: 'words',
  round: 2,
  maxRounds: 6,
  currentPlayer: 0,
  racks: [
    { playerId: 'player_1', tiles: [{ letter: 'A', value: 1 }, { letter: 'C', value: 3 }] },
    { playerId: 'MentorOrangutan', tiles: [{ letter: 'Q', value: 10 }, { letter: 'U', value: 1 }] }
  ],
  pool: { 'A': 9, 'B': 2, 'C': 2, 'D': 4, ... },
  playedWords: [
    { playerId: 'player_1', word: 'CAT', score: 5, timestamp: 1705594245000 }
  ],
  scores: { 'player_1': 5, 'MentorOrangutan': 0 },
  tileBagCount: 78
}
```

See [Game Rules](../docs/games/) for detailed gameplay rules and strategies.

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
import { io, Socket } from 'socket.io-client';

// Game type configuration
const GAME_CONFIG = {
  tictactoe: { players: 2, duration: '2-5 min' },
  babel: { players: '2-5', duration: '10-20 min' },
  chess: { players: 2, duration: '15-60 min' },
  words: { players: '2-5', duration: '5-15 min' }
};

// Example: Join TicTacToe with AI opponent
const socket: Socket = io(wsUrl, {
  auth: { token: await getAuthToken() },
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('Connected to game server');

  // Join any available game
  const gameType = 'tictactoe'; // or 'babel', 'chess', 'words'
  socket.emit('join_game', {
    gameType,
    playerCount: GAME_CONFIG[gameType].players as number,
    aiOpponents: ['StrategistApe']  // Agent type ID
  });
});

// Receive initial game state
socket.on('game_state', (state: GameState) => {
  renderGame(state);
  console.log(`Game ${state.gameType} ready - Phase: ${state.phase}`);

  if (state.phase === 'lobby') {
    showWaitingForPlayers();
  }
});

// Handle turn changes
socket.on('turn_change', (event: TurnChangeEvent) => {
  highlightCurrentPlayer(event.toPlayerId);
  console.log(`Turn ${event.turnNumber}: ${event.fromPlayerId} → ${event.toPlayerId}`);
});

// Handle actions from all players
socket.on('game_action', (action: GameActionEvent) => {
  animateAction(action);
  if (action.validation && !action.validation.valid) {
    showToast(action.validation.reason || 'Invalid action', 'warning');
  }
});

// Handle game end
socket.on('game_action', (event) => {
  if (event.actionType === 'game_over') {
    showResults(event.payload);
  }
});

// Error handling
socket.on('game_error', (error) => {
  handleGameError(error);
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

*Last updated: 2026-01-19*
*ScribbleSimian — Making clarity stick* 🐒
