import type { GameSession, BabelGameState, Player, BabelGameConfig } from './types.js';

export class GameSessionManager {
  private sessions: Map<string, GameSession> = new Map();
  private sessionCallbacks: Map<string, Set<SessionCallback>> = new Map();
  private gameEngines: Map<string, unknown> = new Map();

  createSession(config: BabelGameConfig, gameType: 'babel' | 'chess' | 'words'): GameSession {
    const session: GameSession = {
      id: crypto.randomUUID(),
      config: {
        ...config,
        gameType,
        duration: config.rounds * 60 * 1000,
        rules: {
          allowChat: true,
          allowSpectators: true,
          friendlyFire: false,
          winCondition: 'score',
        },
      },
      state: null,
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

  getGameState(sessionId: string): BabelGameState | null {
    return this.sessions.get(sessionId)?.state ?? null;
  }

  setGameState(sessionId: string, state: BabelGameState): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.state = state;
    }
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
  state?: BabelGameState;
}
