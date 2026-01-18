import type { GameSession, GameState, Player, GameEvent } from './types.js';
import { v4 as uuid } from 'uuid';

export class GameSessionManager {
  private sessions: Map<string, GameSession> = new Map();
  private sessionCallbacks: Map<string, Set<SessionCallback>> = new Map();

  createSession(config: GameConfig): GameSession {
    const session: GameSession = {
      id: uuid(),
      config,
      state: this.createInitialState(),
      players: [],
      status: 'waiting',
      createdAt: Date.now(),
    };

    this.sessions.set(session.id, session);
    this.sessionCallbacks.set(session.id, new Set());

    return session;
  }

  getSession(sessionId: string): GameSession | undefined {
    return this.sessions.get(sessionId);
  }

  addPlayer(sessionId: string, player: Player): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    if (session.players.length >= session.config.maxPlayers) {
      return false;
    }

    session.players.push(player);
    this.notifySession(sessionId, { type: 'player_joined', player });
    return true;
  }

  removePlayer(sessionId: string, playerId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    const index = session.players.findIndex(p => p.id === playerId);
    if (index === -1) return false;

    session.players.splice(index, 1);
    this.notifySession(sessionId, { type: 'player_left', playerId });
    return true;
  }

  updatePlayer(sessionId: string, playerId: string, updates: Partial<Player>): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    const player = session.players.find(p => p.id === playerId);
    if (!player) return false;

    Object.assign(player, updates);
    return true;
  }

  getGameState(sessionId: string): GameState | undefined {
    return this.sessions.get(sessionId)?.state;
  }

  onSessionEvent(sessionId: string, callback: SessionCallback): () => void {
    const callbacks = this.sessionCallbacks.get(sessionId);
    if (!callbacks) return () => {};

    callbacks.add(callback);
    return () => callbacks.delete(callback);
  }

  private notifySession(sessionId: string, event: SessionEvent): void {
    const callbacks = this.sessionCallbacks.get(sessionId);
    if (!callbacks) return;

    for (const callback of callbacks) {
      callback(event);
    }
  }

  private createInitialState(): GameState {
    return {
      entities: new Map(),
      timestamp: Date.now(),
      tick: 0,
    };
  }

  cleanupInactiveSessions(maxAge = 3600000): void {
    const now = Date.now();
    for (const [id, session] of this.sessions) {
      if (session.status === 'completed' && now - session.createdAt > maxAge) {
        this.sessions.delete(id);
        this.sessionCallbacks.delete(id);
      }
    }
  }
}

type SessionCallback = (event: SessionEvent) => void;

interface SessionEvent {
  type: 'player_joined' | 'player_left' | 'game_started' | 'game_ended' | 'state_update';
  playerId?: string;
  player?: Player;
  state?: GameState;
}

interface GameConfig {
  maxPlayers: number;
  duration: number;
  rules: GameRules;
  aiDifficulty: 'easy' | 'medium' | 'hard';
}

interface GameRules {
  allowChat: boolean;
  allowSpectators: boolean;
  friendlyFire: boolean;
  winCondition: 'score' | 'survival' | 'elimination';
}
