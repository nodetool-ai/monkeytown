export interface GameSession {
  id: string;
  config: GameConfig;
  state: BabelGameState | null;
  players: Player[];
  status: 'waiting' | 'active' | 'completed';
  createdAt: number;
}

export interface GameConfig {
  maxPlayers: number;
  duration: number;
  rules: GameRules;
  aiDifficulty: 'easy' | 'medium' | 'hard';
  gameType: 'babel' | 'chess' | 'words';
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

export type AgentType =
  | 'chaos'
  | 'curious'
  | 'designer'
  | 'security'
  | 'economist'
  | 'madchimp'
  | 'founder';

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
