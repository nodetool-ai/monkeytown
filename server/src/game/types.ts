/**
 * Server Game Types
 * 
 * ARCHITECTURE NOTE: These types are intentionally defined locally within the server
 * package due to TypeScript's rootDir constraints for monorepo builds.
 * 
 * SOURCE OF TRUTH: packages/shared/gaming-protocol.ts
 * 
 * If you modify these core protocol types, you MUST also update:
 * - packages/shared/gaming-protocol.ts (the canonical source)
 * - server/src/game/referee.ts (utility functions)
 * 
 * Manual verification is required until TypeScript project references are implemented.
 * 
 * TODO: Consider using TypeScript project references or a shared package build step
 * to eliminate this duplication. See docs/architecture.md for more details.
 */

// Gaming protocol types - synchronized with packages/shared/gaming-protocol.ts
export type PlayerKind = 'human' | 'agent';
export type GamePhase = 'waiting' | 'in_progress' | 'finished';
export type GameResult = 'win' | 'lose' | 'draw' | 'ongoing';

export interface ProtocolPlayer {
  id: string;
  name: string;
  kind: PlayerKind;
  agentId?: string;
}

export interface GameMove {
  playerId: string;
  timestamp: number;
  data: Record<string, unknown>;
}

export interface ProtocolGameState {
  gameId: string;
  gameType: string;
  phase: GamePhase;
  players: ProtocolPlayer[];
  currentPlayerIndex: number;
  moveHistory: GameMove[];
  boardState: unknown;
  result?: {
    outcome: GameResult;
    winnerId?: string;
    reason?: string;
  };
  createdAt: number;
  updatedAt: number;
}

export interface RefereeInput {
  gameState: ProtocolGameState;
  proposedMove: GameMove;
  gameRules: string;
}

export interface RefereeOutput {
  isValid: boolean;
  newBoardState?: unknown;
  gameResult?: {
    outcome: GameResult;
    winnerId?: string;
    reason?: string;
  };
  nextPlayerIndex?: number;
  reasoning?: string;
  error?: string;
}

export interface RefereeConfig {
  gameType: string;
  gameRules: string;
  evaluator: 'local' | 'agent';
  agentPrompt?: string;
}

// TicTacToe specific types - synchronized with packages/shared/gaming-protocol.ts
export type TicTacToeSymbol = 'X' | 'O' | null;
export type TicTacToeBoard = [
  [TicTacToeSymbol, TicTacToeSymbol, TicTacToeSymbol],
  [TicTacToeSymbol, TicTacToeSymbol, TicTacToeSymbol],
  [TicTacToeSymbol, TicTacToeSymbol, TicTacToeSymbol]
];

export interface TicTacToeMove {
  row: number;
  col: number;
}

export interface TicTacToeState {
  board: TicTacToeBoard;
  currentSymbol: TicTacToeSymbol;
}

export interface GameSession {
  id: string;
  config: GameConfig;
  state: BabelGameState | TicTacToeGameState | null;
  players: Player[];
  status: 'waiting' | 'active' | 'completed';
  createdAt: number;
}

export interface GameConfig {
  maxPlayers: number;
  duration: number;
  rules: GameRules;
  aiDifficulty: 'easy' | 'medium' | 'hard';
  gameType: 'tictactoe' | 'babel' | 'chess' | 'words';
}

/**
 * TicTacToe game state for session management
 */
export interface TicTacToeGameState {
  id: string;
  gameType: 'tictactoe';
  phase: 'waiting' | 'in_progress' | 'finished';
  players: Player[];
  currentPlayerIndex: number;
  board: Array<Array<'X' | 'O' | null>>;
  currentSymbol: 'X' | 'O';
  winnerId?: string;
  winningLine?: number[][];
  isDraw?: boolean;
  moveCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface GameRules {
  allowChat: boolean;
  allowSpectators: boolean;
  friendlyFire: boolean;
  winCondition: 'score' | 'survival' | 'elimination';
}

export interface GameEntity {
  id: string;
  type: 'player' | 'npc' | 'item' | 'projectile';
  position: Vector2D;
  velocity?: Vector2D;
  properties: Record<string, unknown>;
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  name: string;
  type: 'human' | 'agent';
  agentType?: AgentType;
  score: number;
  isConnected: boolean;
}

// Builder agents (for development)
export type BuilderAgentType =
  | 'chaos'
  | 'curious'
  | 'designer'
  | 'security'
  | 'economist'
  | 'madchimp'
  | 'founder'
  | 'gamedesigner'
  | 'gametester';

// Player agents (for in-game opponents)
export type PlayerAgentType =
  | 'trickster'
  | 'strategist'
  | 'speedster'
  | 'guardian'
  | 'wildcard'
  | 'mentor'
  | 'champion';

// Combined agent type
export type AgentType = BuilderAgentType | PlayerAgentType;

export interface InputAction {
  type: 'move' | 'action' | 'chat' | 'emote';
  data: Record<string, unknown>;
}

export interface GameEvent {
  id: string;
  type: string;
  playerId: string;
  timestamp: number;
  data: Record<string, unknown>;
}

export interface BabelGameState {
  id: string;
  gameType: 'babel';
  mode: 'fast' | 'casual' | 'social' | 'competitive';
  status: 'waiting' | 'playing' | 'round_end' | 'game_end';
  players: Player[];
  currentRound: number;
  maxRounds: number;
  currentPlayerIndex: number;
  deck: BabelCard[];
  tableCards: BabelCard[];
  playerStates: Map<string, BabelPlayerState>;
  turnStartTime: number;
  turnDurationSeconds: number;
  turnTimerActive: boolean;
  createdAt: number;
  updatedAt: number;
  winnerId?: string;
  gameLog: BabelGameLogEntry[];
}

export interface BabelCard {
  id: string;
  value: number;
  suit?: 'stone' | 'brick' | 'wood' | 'glass';
}

export interface BabelPlayerState {
  playerId: string;
  hand: BabelCard[];
  score: number;
  towerHeight: number;
  cardsPlayed: number;
}

export interface BabelAction {
  type: 'play_card' | 'pass' | 'special_babel_tower';
  cardId?: string;
  targetPlayerId?: string;
}

export interface BabelGameLogEntry {
  id: string;
  timestamp: number;
  type: 'card_played' | 'turn_skipped' | 'round_complete' | 'game_complete' | 'tower_collapse' | 'special_action';
  playerId: string;
  card?: BabelCard;
  details: Record<string, unknown>;
}

export interface BabelGameConfig {
  maxPlayers: number;
  rounds: number;
  turnDurationSeconds: number;
  aiDifficulty: 'easy' | 'medium' | 'hard';
}
