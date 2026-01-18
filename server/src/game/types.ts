import type { GameState, Player, InputAction } from './types.js';

export interface GameSession {
  id: string;
  config: GameConfig;
  state: GameState;
  players: Player[];
  status: 'waiting' | 'active' | 'completed';
  createdAt: number;
}

export interface GameConfig {
  maxPlayers: number;
  duration: number;
  rules: GameRules;
  aiDifficulty: 'easy' | 'medium' | 'hard';
}

export interface GameRules {
  allowChat: boolean;
  allowSpectators: boolean;
  friendlyFire: boolean;
  winCondition: 'score' | 'survival' | 'elimination';
}

export interface GameState {
  entities: Map<string, GameEntity>;
  timestamp: number;
  tick: number;
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
  avatar: string;
  position: Vector2D;
  score: number;
  status: 'connected' | 'disconnected' | 'playing';
  isAI: boolean;
}

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
