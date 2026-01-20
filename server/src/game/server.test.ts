import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { GameServer, TicTacToeConfig } from '../game/server.js';
import { RedisService } from '../services/redis.js';
import { DatabaseService } from '../services/database.js';
import type { GameSession, Player, GameEvent } from '../game/types.js';
import type { TicTacToeAction } from '../game/tictactoe-engine.js';

describe('GameServer', () => {
  let gameServer: GameServer;
  let mockRedis: any;
  let mockDb: any;

  beforeEach(() => {
    mockRedis = {
      cacheSession: vi.fn().mockResolvedValue(undefined),
      getCachedSession: vi.fn().mockResolvedValue(null),
      deleteSession: vi.fn().mockResolvedValue(undefined),
      publish: vi.fn().mockResolvedValue(undefined),
    };

    mockDb = {
      saveGameEvent: vi.fn().mockResolvedValue(undefined),
    };

    gameServer = new GameServer(mockRedis as unknown as RedisService, mockDb as unknown as DatabaseService);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('createSession', () => {
    it('should create a new TicTacToe session', async () => {
      const config: TicTacToeConfig = {
        maxPlayers: 2,
        aiDifficulty: 'medium',
      };

      const session = await gameServer.createSession(config, 'tictactoe');

      expect(session.id).toBeDefined();
      expect(session.config.maxPlayers).toBe(2);
      expect(session.config.gameType).toBe('tictactoe');
      expect(session.config.aiDifficulty).toBe('medium');
      expect(session.status).toBe('waiting');
      expect(session.players).toHaveLength(0);
      expect(mockRedis.cacheSession).toHaveBeenCalled();
    });

    it('should create a new Babel session', async () => {
      const config = {
        maxPlayers: 4,
        rounds: 12,
        turnDurationSeconds: 60,
        aiDifficulty: 'hard' as const,
      };

      const session = await gameServer.createSession(config, 'babel');

      expect(session.id).toBeDefined();
      expect(session.config.gameType).toBe('babel');
      expect(session.config.maxPlayers).toBe(4);
      expect(mockRedis.cacheSession).toHaveBeenCalled();
    });

    it('should cache session in Redis', async () => {
      const config: TicTacToeConfig = { maxPlayers: 2, aiDifficulty: 'easy' };

      await gameServer.createSession(config, 'tictactoe');

      expect(mockRedis.cacheSession).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          config: expect.objectContaining({ aiDifficulty: 'easy' }),
        })
      );
    });
  });

  describe('getSession', () => {
    it('should return cached session from Redis', async () => {
      const cachedSession: GameSession = {
        id: 'cached-session',
        config: {
          maxPlayers: 2,
          gameType: 'tictactoe',
          aiDifficulty: 'medium',
          duration: 0,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'elimination',
          },
        },
        state: null,
        players: [],
        status: 'waiting',
        createdAt: Date.now(),
      };
      mockRedis.getCachedSession.mockResolvedValue(cachedSession);

      const session = await gameServer.getSession('cached-session');

      expect(session).toEqual(cachedSession);
      expect(mockRedis.getCachedSession).toHaveBeenCalledWith('cached-session');
    });

    it('should return session from memory when not cached', async () => {
      const inMemorySession: GameSession = {
        id: 'memory-session',
        config: {
          maxPlayers: 2,
          gameType: 'tictactoe',
          aiDifficulty: 'medium',
          duration: 0,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'elimination',
          },
        },
        state: null,
        players: [],
        status: 'waiting',
        createdAt: Date.now(),
      };
      mockRedis.getCachedSession.mockResolvedValue(null);
      (gameServer as any).sessions.set('memory-session', inMemorySession);

      const session = await gameServer.getSession('memory-session');

      expect(session).toEqual(inMemorySession);
    });

    it('should return null when session not found', async () => {
      mockRedis.getCachedSession.mockResolvedValue(null);

      const session = await gameServer.getSession('non-existent');

      expect(session).toBeNull();
    });
  });

  describe('joinSession', () => {
    it('should add player to session', async () => {
      const session: GameSession = {
        id: 'test-session',
        config: {
          maxPlayers: 2,
          gameType: 'tictactoe',
          aiDifficulty: 'medium',
          duration: 0,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'elimination',
          },
        },
        state: null,
        players: [],
        status: 'waiting',
        createdAt: Date.now(),
      };
      mockRedis.getCachedSession.mockResolvedValue(session);

      const player: Player = {
        id: 'player-1',
        name: 'TestPlayer',
        type: 'human',
        score: 0,
        isConnected: true,
      };

      const result = await gameServer.joinSession('test-session', player);

      expect(result?.players).toHaveLength(1);
      expect(result?.players[0]).toEqual(player);
      expect(mockRedis.cacheSession).toHaveBeenCalled();
    });

    it('should reject when session is full', async () => {
      const fullSession: GameSession = {
        id: 'full-session',
        config: {
          maxPlayers: 2,
          gameType: 'tictactoe',
          aiDifficulty: 'medium',
          duration: 0,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'elimination',
          },
        },
        state: null,
        players: [
          { id: 'p1', name: 'Player 1', type: 'human', score: 0, isConnected: true },
          { id: 'p2', name: 'Player 2', type: 'human', score: 0, isConnected: true },
        ],
        status: 'waiting',
        createdAt: Date.now(),
      };
      mockRedis.getCachedSession.mockResolvedValue(fullSession);

      const player: Player = {
        id: 'player-3',
        name: 'TestPlayer',
        type: 'human',
        score: 0,
        isConnected: true,
      };

      await expect(gameServer.joinSession('full-session', player)).rejects.toThrow('Session is full');
    });

    it('should return null for non-existent session', async () => {
      mockRedis.getCachedSession.mockResolvedValue(null);

      const player: Player = {
        id: 'player-1',
        name: 'TestPlayer',
        type: 'human',
        score: 0,
        isConnected: true,
      };

      const result = await gameServer.joinSession('non-existent', player);

      expect(result).toBeNull();
    });
  });

  describe('startSession', () => {
    it('should start TicTacToe session', async () => {
      const session: GameSession = {
        id: 'test-session',
        config: {
          maxPlayers: 2,
          gameType: 'tictactoe',
          aiDifficulty: 'medium',
          duration: 0,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'elimination',
          },
        },
        state: null,
        players: [
          { id: 'p1', name: 'Player 1', type: 'human', score: 0, isConnected: true },
          { id: 'p2', name: 'Player 2', type: 'human', score: 0, isConnected: true },
        ],
        status: 'waiting',
        createdAt: Date.now(),
      };
      mockRedis.getCachedSession.mockResolvedValue(session);

      await gameServer.startSession('test-session');

      expect(mockRedis.cacheSession).toHaveBeenCalled();
    });

    it('should start Babel session', async () => {
      const session: GameSession = {
        id: 'test-session',
        config: {
          maxPlayers: 4,
          gameType: 'babel',
          aiDifficulty: 'medium',
          duration: 720000,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'score',
          },
        },
        state: null,
        players: [
          { id: 'p1', name: 'Player 1', type: 'human', score: 0, isConnected: true },
          { id: 'p2', name: 'Player 2', type: 'human', score: 0, isConnected: true },
        ],
        status: 'waiting',
        createdAt: Date.now(),
      };
      mockRedis.getCachedSession.mockResolvedValue(session);

      await gameServer.startSession('test-session');

      expect(mockRedis.cacheSession).toHaveBeenCalled();
    });

    it('should throw error for non-existent session', async () => {
      mockRedis.getCachedSession.mockResolvedValue(null);

      await expect(gameServer.startSession('non-existent')).rejects.toThrow('Session not found');
    });
  });

  describe('endSession', () => {
    it('should complete session and cleanup engines', async () => {
      const session: GameSession = {
        id: 'test-session',
        config: {
          maxPlayers: 2,
          gameType: 'tictactoe',
          aiDifficulty: 'medium',
          duration: 0,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'elimination',
          },
        },
        state: null,
        players: [],
        status: 'active',
        createdAt: Date.now(),
      };
      mockRedis.getCachedSession.mockResolvedValue(session);

      await gameServer.endSession('test-session');

      expect(session.status).toBe('completed');
      expect(mockRedis.cacheSession).toHaveBeenCalled();
    });

    it('should do nothing for non-existent session', async () => {
      mockRedis.getCachedSession.mockResolvedValue(null);

      await gameServer.endSession('non-existent');

      expect(mockRedis.cacheSession).not.toHaveBeenCalled();
    });
  });

  describe('processTicTacToeAction', () => {
    it('should return null for non-existent session', async () => {
      mockRedis.getCachedSession.mockResolvedValue(null);

      const action: TicTacToeAction = {
        type: 'place',
        row: 0,
        col: 0,
      };

      const event = await gameServer.processTicTacToeAction('non-existent', 'p1', action);

      expect(event).toBeNull();
    });
  });

  describe('cleanup', () => {
    it('should remove old completed sessions', async () => {
      const oldCompletedSession: GameSession = {
        id: 'old-session',
        config: {
          maxPlayers: 2,
          gameType: 'tictactoe',
          aiDifficulty: 'medium',
          duration: 0,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'elimination',
          },
        },
        state: null,
        players: [],
        status: 'completed',
        createdAt: Date.now() - 7200000,
      };
      (gameServer as any).sessions.set('old-session', oldCompletedSession);

      const recentSession: GameSession = {
        id: 'recent-session',
        config: {
          maxPlayers: 2,
          gameType: 'tictactoe',
          aiDifficulty: 'medium',
          duration: 0,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'elimination',
          },
        },
        state: null,
        players: [],
        status: 'completed',
        createdAt: Date.now(),
      };
      (gameServer as any).sessions.set('recent-session', recentSession);

      await gameServer.cleanup();

      expect((gameServer as any).sessions.has('old-session')).toBe(false);
      expect((gameServer as any).sessions.has('recent-session')).toBe(true);
    });
  });
});
