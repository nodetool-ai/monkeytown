import { RedisService } from '../services/redis.js';
import { DatabaseService } from '../services/database.js';
import type { BabelGameState, GameSession, BabelGameConfig, Player, BabelAction, GameEvent } from './types.js';
import { BabelGameEngine } from './babel-engine.js';

export class GameServer {
  private sessions: Map<string, GameSession> = new Map();
  private gameEngines: Map<string, BabelGameEngine> = new Map();
  private redis: RedisService;
  private db: DatabaseService;

  constructor(redis: RedisService, db: DatabaseService) {
    this.redis = redis;
    this.db = db;
  }

  async createSession(config: BabelGameConfig, gameType: 'babel' | 'chess' | 'words'): Promise<GameSession> {
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

  async processBabelAction(sessionId: string, playerId: string, action: BabelAction): Promise<GameEvent | null> {
    const session = await this.getSession(sessionId);
    if (!session) return null;

    let engine = this.gameEngines.get(sessionId);
    if (!engine) {
      engine = this.createBabelEngine(session);
      this.gameEngines.set(sessionId, engine);
    }

    const result = engine.processAction(playerId, action);

    if (result.success && result.newState) {
      session.state = result.newState;
      await this.redis.cacheSession(sessionId, session);

      const event: GameEvent = {
        id: crypto.randomUUID(),
        type: action.type,
        playerId,
        timestamp: Date.now(),
        data: { action, result: result.newState },
      };

      return event;
    }

    return null;
  }

  private createBabelEngine(session: GameSession): BabelGameEngine {
    const playerIds = session.players.map(p => p.id);
    const playerNames = new Map(session.players.map(p => [p.id, p.name]));
    const playerTypes = new Map(session.players.map(p => [p.id, p.type]));
    const agentTypes = new Map(session.players.filter(p => p.type === 'agent').map(p => [p.id, p.agentType!]));

    const engine = new BabelGameEngine(
      playerIds,
      playerNames,
      playerTypes,
      agentTypes,
      {
        maxPlayers: session.config.maxPlayers,
        rounds: session.config.duration > 0 ? Math.floor(session.config.duration / 60000) : 12,
        turnDurationSeconds: 60,
        aiDifficulty: session.config.aiDifficulty,
      }
    );

    engine.setOnStateChange(async (state) => {
      session.state = state;
      await this.redis.cacheSession(session.id, session);
    });

    return engine;
  }

  async startSession(sessionId: string): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) throw new Error('Session not found');

    if (session.config.gameType === 'babel') {
      let engine = this.gameEngines.get(sessionId);
      if (!engine) {
        engine = this.createBabelEngine(session);
        this.gameEngines.set(sessionId, engine);
      }

      session.state = engine.getState();
      engine.startGame();
      session.status = 'active';
    } else {
      session.status = 'active';
    }

    await this.redis.cacheSession(sessionId, session);
  }

  async endSession(sessionId: string): Promise<void> {
    const session = await this.getSession(sessionId);
    if (!session) return;

    session.status = 'completed';
    await this.redis.cacheSession(sessionId, session);
    this.gameEngines.delete(sessionId);
  }

  async cleanup(): Promise<void> {
    for (const [id, session] of this.sessions) {
      if (session.status === 'completed' && Date.now() - session.createdAt > 3600000) {
        this.sessions.delete(id);
        this.gameEngines.delete(id);
        await this.redis.deleteSession(id);
      }
    }
  }
}
