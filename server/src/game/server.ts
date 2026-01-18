import { RedisService } from '../services/redis.js';
import { DatabaseService } from '../services/database.js';
import { v4 as uuid } from 'uuid';
import type { GameState, GameSession, GameConfig, Player, InputAction, GameEvent } from './types.js';

export class GameServer {
  private sessions: Map<string, GameSession> = new Map();
  private redis: RedisService;
  private db: DatabaseService;

  constructor(redis: RedisService, db: DatabaseService) {
    this.redis = redis;
    this.db = db;
  }

  async createSession(config: GameConfig): Promise<GameSession> {
    const session: GameSession = {
      id: uuid(),
      config,
      state: this.createInitialState(),
      players: [],
      status: 'waiting',
      createdAt: Date.now(),
    };

    this.sessions.set(session.id, session);
    await this.redis.cacheSession(session.id, session);

    return session;
  }

  async getSession(sessionId: string): Promise<GameSession | null> {
    const cached = await this.redis.getCachedSession(sessionId);
    if (cached) return cached;

    const session = this.sessions.get(sessionId);
    if (session) return session;

    return null;
  }

  async joinSession(sessionId: string, player: Player): Promise<GameSession | null> {
    const session = await this.getSession(sessionId);
    if (!session) return null;

    if (session.players.length >= session.config.maxPlayers) {
      throw new Error('Session is full');
    }

    session.players.push(player);
    await this.redis.cacheSession(sessionId, session);

    return session;
  }

  async processInput(sessionId: string, playerId: string, input: InputAction): Promise<GameEvent | null> {
    const session = await this.getSession(sessionId);
    if (!session) return null;

    const event = this.applyInput(session, playerId, input);
    await this.redis.cacheSession(sessionId, session);

    return event;
  }

  private createInitialState(): GameState {
    return {
      entities: new Map(),
      timestamp: Date.now(),
      tick: 0,
    };
  }

  private applyInput(session: GameSession, playerId: string, input: InputAction): GameEvent {
    const player = session.players.find(p => p.id === playerId);
    if (!player) {
      throw new Error('Player not found in session');
    }

    const event: GameEvent = {
      id: uuid(),
      type: input.type,
      playerId,
      timestamp: Date.now(),
      data: input.data,
    };

    switch (input.type) {
      case 'move':
        player.position = input.data.position;
        break;
      case 'action':
        this.processAction(session, player, input.data);
        break;
    }

    session.state.tick++;
    session.state.timestamp = Date.now();

    return event;
  }

  private processAction(session: GameSession, player: Player, action: Record<string, unknown>): void {
    console.log(`[GameServer] Processing action for player ${player.id}:`, action);
  }

  async startSession(sessionId: string): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) throw new Error('Session not found');

    session.status = 'active';
    await this.redis.cacheSession(sessionId, session);
  }

  async endSession(sessionId: string): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) return;

    session.status = 'completed';
    await this.redis.cacheSession(sessionId, session);
  }

  async cleanup(): Promise<void> {
    for (const [id, session] of this.sessions) {
      if (session.status === 'completed' && Date.now() - session.createdAt > 3600000) {
        this.sessions.delete(id);
        await this.redis.deleteSession(id);
      }
    }
  }
}
