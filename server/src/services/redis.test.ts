import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { RedisService } from '../services/redis.js';
import type { GameSession } from '../game/types.js';

describe('RedisService', () => {
  let redis: RedisService;
  let mockRedisClient: any;
  let mockRedisSubscriber: any;
  let mockRedisPublisher: any;

  beforeEach(async () => {
    mockRedisClient = {
      on: vi.fn(),
      get: vi.fn(),
      setex: vi.fn(),
      del: vi.fn(),
      incr: vi.fn(),
      expire: vi.fn(),
      ping: vi.fn().mockResolvedValue('PONG'),
      quit: vi.fn().mockResolvedValue('OK'),
    };

    mockRedisSubscriber = {
      on: vi.fn(),
      get: vi.fn(),
      setex: vi.fn(),
      del: vi.fn(),
      incr: vi.fn(),
      expire: vi.fn(),
      ping: vi.fn().mockResolvedValue('PONG'),
      quit: vi.fn().mockResolvedValue('OK'),
      subscribe: vi.fn().mockResolvedValue(1),
    };

    mockRedisPublisher = {
      on: vi.fn(),
      get: vi.fn(),
      setex: vi.fn(),
      del: vi.fn(),
      incr: vi.fn(),
      expire: vi.fn(),
      ping: vi.fn().mockResolvedValue('PONG'),
      quit: vi.fn().mockResolvedValue('OK'),
      publish: vi.fn().mockResolvedValue(1),
    };

    redis = new RedisService('redis://localhost:6379');
    (redis as any).client = mockRedisClient;
    (redis as any).subscriber = mockRedisSubscriber;
    (redis as any).publisher = mockRedisPublisher;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('connect', () => {
    it('should verify all connections with PING', async () => {
      await redis.connect();

      expect(mockRedisClient.ping).toHaveBeenCalled();
      expect(mockRedisSubscriber.ping).toHaveBeenCalled();
      expect(mockRedisPublisher.ping).toHaveBeenCalled();
    });
  });

  describe('disconnect', () => {
    it('should quit all connections', async () => {
      await redis.disconnect();

      expect(mockRedisClient.quit).toHaveBeenCalled();
      expect(mockRedisSubscriber.quit).toHaveBeenCalled();
      expect(mockRedisPublisher.quit).toHaveBeenCalled();
    });
  });

  describe('cacheSession', () => {
    it('should cache session with 1 hour TTL', async () => {
      const session = {
        id: 'test-session',
        config: {
          maxPlayers: 2,
          gameType: 'tictactoe' as const,
          aiDifficulty: 'medium' as const,
          duration: 0,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'elimination' as const,
          },
        },
        state: null,
        players: [],
        status: 'waiting' as const,
        createdAt: Date.now(),
      };

      await redis.cacheSession('test-session', session);

      expect(mockRedisClient.setex).toHaveBeenCalledWith(
        'session:test-session',
        3600,
        JSON.stringify(session)
      );
    });
  });

  describe('getCachedSession', () => {
    it('should return cached session when found', async () => {
      const session = {
        id: 'test-session',
        config: {
          maxPlayers: 2,
          gameType: 'tictactoe' as const,
          aiDifficulty: 'medium' as const,
          duration: 0,
          rules: {
            allowChat: true,
            allowSpectators: true,
            friendlyFire: false,
            winCondition: 'elimination' as const,
          },
        },
        state: {
          id: 'test-session',
          gameType: 'tictactoe' as const,
          phase: 'in_progress' as const,
          players: [],
          currentPlayerIndex: 0,
          board: [[null, null, null], [null, null, null], [null, null, null]],
          currentSymbol: 'X' as const,
          moveCount: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
        players: [],
        status: 'active' as const,
        createdAt: Date.now(),
      };

      mockRedisClient.get.mockResolvedValue(JSON.stringify(session));

      const result = await redis.getCachedSession('test-session');

      expect(result).toBeDefined();
      expect(result?.id).toBe('test-session');
      expect(mockRedisClient.get).toHaveBeenCalledWith('session:test-session');
    });

    it('should return null when session not found', async () => {
      mockRedisClient.get.mockResolvedValue(null);

      const result = await redis.getCachedSession('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('deleteSession', () => {
    it('should delete cached session', async () => {
      await redis.deleteSession('test-session');

      expect(mockRedisClient.del).toHaveBeenCalledWith('session:test-session');
    });
  });

  describe('publish', () => {
    it('should publish event to channel', async () => {
      const event = { type: 'player_joined', playerId: 'p1', timestamp: Date.now() };

      await redis.publish('game:test', event);

      expect(mockRedisPublisher.publish).toHaveBeenCalledWith(
        'game:test',
        JSON.stringify(event)
      );
    });
  });

  describe('subscribe', () => {
    it('should subscribe to channel and setup message handler', async () => {
      const callback = vi.fn();

      await redis.subscribe('game:test', callback);

      expect(mockRedisSubscriber.subscribe).toHaveBeenCalledWith('game:test');
    });
  });

  describe('setPlayerState', () => {
    it('should cache player state with 5 minute TTL', async () => {
      const state = { score: 100, level: 5 };

      await redis.setPlayerState('player-1', state);

      expect(mockRedisClient.setex).toHaveBeenCalledWith(
        'player:player-1',
        300,
        JSON.stringify(state)
      );
    });
  });

  describe('getPlayerState', () => {
    it('should return cached player state', async () => {
      const state = { score: 100, level: 5 };
      mockRedisClient.get.mockResolvedValue(JSON.stringify(state));

      const result = await redis.getPlayerState('player-1');

      expect(result).toEqual(state);
      expect(mockRedisClient.get).toHaveBeenCalledWith('player:player-1');
    });

    it('should return null when player state not found', async () => {
      mockRedisClient.get.mockResolvedValue(null);

      const result = await redis.getPlayerState('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('incrementRateLimit', () => {
    it('should increment counter and set TTL', async () => {
      mockRedisClient.incr.mockResolvedValue(5);

      const count = await redis.incrementRateLimit('player-1', 'move');

      expect(count).toBe(5);
      expect(mockRedisClient.incr).toHaveBeenCalledWith('ratelimit:player-1:move');
      expect(mockRedisClient.expire).toHaveBeenCalledWith('ratelimit:player-1:move', 60);
    });
  });

  describe('checkRateLimit', () => {
    it('should return true when under limit', async () => {
      mockRedisClient.incr.mockResolvedValue(5);

      const allowed = await redis.checkRateLimit('player-1', 'move', 10);

      expect(allowed).toBe(true);
    });

    it('should return false when over limit', async () => {
      mockRedisClient.incr.mockResolvedValue(15);

      const allowed = await redis.checkRateLimit('player-1', 'move', 10);

      expect(allowed).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should be created with connection settings', () => {
      const redis = new RedisService('redis://localhost:6379');
      expect((redis as any).client).toBeDefined();
      expect((redis as any).subscriber).toBeDefined();
      expect((redis as any).publisher).toBeDefined();
    });
  });
});
