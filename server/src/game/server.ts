import { RedisService } from '../services/redis.js';
import { DatabaseService } from '../services/database.js';
import type { BabelGameState, TicTacToeGameState, GameSession, BabelGameConfig, Player, BabelAction, GameEvent } from './types.js';
import { BabelGameEngine } from './babel-engine.js';
import { TicTacToeEngine, TicTacToeAction, TicTacToeAI } from './tictactoe-engine.js';
import { TicTacToeBoard } from '@monkeytown/packages/shared';

export interface TicTacToeConfig {
  maxPlayers: number;
  aiDifficulty: 'easy' | 'medium' | 'hard';
}

export class GameServer {
  private sessions: Map<string, GameSession> = new Map();
  private babelEngines: Map<string, BabelGameEngine> = new Map();
  private tictactoeEngines: Map<string, TicTacToeEngine> = new Map();
  private tictactoeAIs: Map<string, TicTacToeAI> = new Map();
  private redis: RedisService;
  private db: DatabaseService;

  constructor(redis: RedisService, db: DatabaseService) {
    this.redis = redis;
    this.db = db;
  }

  async createSession(config: BabelGameConfig | TicTacToeConfig, gameType: 'tictactoe' | 'babel' | 'chess' | 'words'): Promise<GameSession> {
    const session: GameSession = {
      id: crypto.randomUUID(),
      config: {
        maxPlayers: config.maxPlayers,
        gameType,
        duration: 'rounds' in config ? config.rounds * 60 * 1000 : 0,
        rules: {
          allowChat: true,
          allowSpectators: true,
          friendlyFire: false,
          winCondition: gameType === 'tictactoe' ? 'elimination' : 'score',
        },
        aiDifficulty: config.aiDifficulty,
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

  // TicTacToe action processing
  async processTicTacToeAction(sessionId: string, playerId: string, action: TicTacToeAction): Promise<GameEvent | null> {
    const session = await this.getSession(sessionId);
    if (!session) return null;

    let engine = this.tictactoeEngines.get(sessionId);
    if (!engine) {
      engine = this.createTicTacToeEngine(session);
      this.tictactoeEngines.set(sessionId, engine);
    }

    const result = engine.processAction(playerId, action);

    if (result.success && result.newState) {
      session.state = result.newState;
      await this.redis.cacheSession(sessionId, session);

      // Persist event to database
      const event: GameEvent = {
        id: crypto.randomUUID(),
        type: action.type,
        playerId,
        timestamp: Date.now(),
        data: { action, result: result.newState },
      };

      await this.persistGameEvent(sessionId, event);

      // Check if it's AI's turn and process AI move
      const currentPlayer = result.newState.players[result.newState.currentPlayerIndex];
      if (result.newState.phase === 'in_progress' && currentPlayer?.type === 'agent') {
        await this.processAIMove(sessionId, currentPlayer.id);
      }

      return event;
    }

    return null;
  }

  private async processAIMove(sessionId: string, aiPlayerId: string): Promise<void> {
    const engine = this.tictactoeEngines.get(sessionId);
    if (!engine) return;

    const state = engine.getState();
    if (state.phase !== 'in_progress') return;

    // Get or create AI for this game
    let ai = this.tictactoeAIs.get(sessionId);
    if (!ai) {
      const session = await this.getSession(sessionId);
      const difficulty = session?.config.aiDifficulty || 'medium';
      ai = new TicTacToeAI(difficulty, state.currentSymbol);
      this.tictactoeAIs.set(sessionId, ai);
    }

    // Add a small delay to make it feel more natural
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

    const move = ai.getMove(state.board as TicTacToeBoard);
    if (move) {
      await this.processTicTacToeAction(sessionId, aiPlayerId, {
        type: 'place',
        row: move.row,
        col: move.col,
      });
    }
  }

  private createTicTacToeEngine(session: GameSession): TicTacToeEngine {
    const engine = new TicTacToeEngine(session.players, {
      aiDifficulty: session.config.aiDifficulty,
    });

    engine.setOnStateChange(async (state) => {
      session.state = state;
      await this.redis.cacheSession(session.id, session);
    });

    engine.setOnEvent(async (event) => {
      await this.persistGameEvent(session.id, event);
    });

    return engine;
  }

  async processBabelAction(sessionId: string, playerId: string, action: BabelAction): Promise<GameEvent | null> {
    const session = await this.getSession(sessionId);
    if (!session) return null;

    let engine = this.babelEngines.get(sessionId);
    if (!engine) {
      engine = this.createBabelEngine(session);
      this.babelEngines.set(sessionId, engine);
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

      await this.persistGameEvent(sessionId, event);

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

    if (session.config.gameType === 'tictactoe') {
      let engine = this.tictactoeEngines.get(sessionId);
      if (!engine) {
        engine = this.createTicTacToeEngine(session);
        this.tictactoeEngines.set(sessionId, engine);
      }

      engine.startGame();
      session.state = engine.getState();
      session.status = 'active';

      // If first player is AI, make their move
      const currentPlayer = session.state.players[session.state.currentPlayerIndex];
      if (currentPlayer?.type === 'agent') {
        await this.processAIMove(sessionId, currentPlayer.id);
      }
    } else if (session.config.gameType === 'babel') {
      let engine = this.babelEngines.get(sessionId);
      if (!engine) {
        engine = this.createBabelEngine(session);
        this.babelEngines.set(sessionId, engine);
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
    this.babelEngines.delete(sessionId);
    this.tictactoeEngines.delete(sessionId);
    this.tictactoeAIs.delete(sessionId);
  }

  private async persistGameEvent(gameId: string, event: GameEvent): Promise<void> {
    try {
      await this.db.saveGameEvent(gameId, event);
    } catch (error) {
      console.error('[GameServer] Failed to persist game event:', error);
    }
  }

  async cleanup(): Promise<void> {
    for (const [id, session] of this.sessions) {
      if (session.status === 'completed' && Date.now() - session.createdAt > 3600000) {
        this.sessions.delete(id);
        this.babelEngines.delete(id);
        this.tictactoeEngines.delete(id);
        this.tictactoeAIs.delete(id);
        await this.redis.deleteSession(id);
      }
    }
  }
}
