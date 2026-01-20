import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { DatabaseService } from '../services/database.js';

describe('DatabaseService', () => {
  let db: DatabaseService;
  let mockPool: any;

  beforeEach(() => {
    mockPool = {
      on: vi.fn(),
      query: vi.fn(),
      connect: vi.fn().mockResolvedValue({
        release: vi.fn(),
      }),
      end: vi.fn().mockResolvedValue(undefined),
    };

    db = new DatabaseService('postgres://localhost:5432/monkeytown');
    (db as any).pool = mockPool;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with connection pool', () => {
      const db = new DatabaseService('postgres://localhost:5432/monkeytown');
      expect((db as any).pool).toBeDefined();
    });
  });

  describe('connect', () => {
    it('should connect and release client', async () => {
      const mockClient = { release: vi.fn() };
      mockPool.connect.mockResolvedValue(mockClient);

      await db.connect();

      expect(mockPool.connect).toHaveBeenCalled();
      expect(mockClient.release).toHaveBeenCalled();
    });
  });

  describe('disconnect', () => {
    it('should end pool connection', async () => {
      await db.disconnect();
      expect(mockPool.end).toHaveBeenCalled();
    });
  });

  describe('query', () => {
    it('should execute query and return rows', async () => {
      const mockRows = [{ id: '1', name: 'test' }];
      mockPool.query.mockResolvedValue({ rows: mockRows });

      const result = await db.query<{ id: string; name: string }>('SELECT * FROM test');

      expect(result).toEqual(mockRows);
      expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM test', undefined);
    });

    it('should pass parameters to query', async () => {
      mockPool.query.mockResolvedValue({ rows: [] });

      await db.query('SELECT * FROM test WHERE id = $1', ['123']);

      expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM test WHERE id = $1', ['123']);
    });
  });

  describe('getPlayer', () => {
    it('should return player when found', async () => {
      const mockPlayer = { id: 'player-1', username: 'testuser', name: 'Test User' };
      mockPool.query.mockResolvedValue({ rows: [mockPlayer] });

      const result = await db.getPlayer('player-1');

      expect(result).toEqual(mockPlayer);
      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM players WHERE id = $1',
        ['player-1']
      );
    });

    it('should return null when player not found', async () => {
      mockPool.query.mockResolvedValue({ rows: [] });

      const result = await db.getPlayer('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('getPlayerByUsername', () => {
    it('should return player when found by username', async () => {
      const mockPlayer = { id: 'player-1', username: 'testuser' };
      mockPool.query.mockResolvedValue({ rows: [mockPlayer] });

      const result = await db.getPlayerByUsername('testuser');

      expect(result).toEqual(mockPlayer);
      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM players WHERE username = $1',
        ['testuser']
      );
    });
  });

  describe('createPlayer', () => {
    it('should create player and return created row', async () => {
      const mockPlayer = { id: 'player-1', username: 'testuser', name: 'Test User', avatar: null };
      mockPool.query.mockResolvedValue({ rows: [mockPlayer] });

      const result = await db.createPlayer({
        id: 'player-1',
        name: 'Test User',
        avatar: undefined,
        type: 'human',
      });

      expect(result).toEqual(mockPlayer);
      expect(mockPool.query).toHaveBeenCalled();
    });
  });

  describe('updatePlayer', () => {
    it('should update player and return updated row', async () => {
      const mockPlayer = { id: 'player-1', name: 'Updated Name' };
      mockPool.query.mockResolvedValue({ rows: [mockPlayer] });

      const result = await db.updatePlayer('player-1', { name: 'Updated Name' });

      expect(result).toEqual(mockPlayer);
      expect(mockPool.query).toHaveBeenCalled();
    });

    it('should return null when player not found', async () => {
      mockPool.query.mockResolvedValue({ rows: [] });

      const result = await db.updatePlayer('non-existent', { name: 'Test' });

      expect(result).toBeNull();
    });
  });

  describe('listPlayers', () => {
    it('should list players with pagination', async () => {
      const mockPlayers = [
        { id: 'p1', name: 'Player 1' },
        { id: 'p2', name: 'Player 2' },
      ];
      mockPool.query.mockResolvedValue({ rows: mockPlayers });

      const result = await db.listPlayers(10, 0);

      expect(result).toEqual(mockPlayers);
      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM players ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [10, 0]
      );
    });
  });

  describe('getAgent', () => {
    it('should return agent when found', async () => {
      const mockAgent = { id: 'agent-1', name: 'Test AI', agentType: 'strategist' };
      mockPool.query.mockResolvedValue({ rows: [mockAgent] });

      const result = await db.getAgent('agent-1');

      expect(result).toEqual(mockAgent);
      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM agents WHERE id = $1',
        ['agent-1']
      );
    });
  });

  describe('createAgent', () => {
    it('should create agent with defaults', async () => {
      const mockAgent = { id: 'agent-1', name: 'Test AI', agentType: 'strategist' };
      mockPool.query.mockResolvedValue({ rows: [mockAgent] });

      const result = await db.createAgent({
        id: 'agent-1',
        name: 'Test AI',
        agentType: 'strategist',
      });

      expect(result).toEqual(mockAgent);
      expect(mockPool.query).toHaveBeenCalled();
    });
  });

  describe('updateAgent', () => {
    it('should update agent and return updated row', async () => {
      const mockAgent = { id: 'agent-1', name: 'Updated AI' };
      mockPool.query.mockResolvedValue({ rows: [mockAgent] });

      const result = await db.updateAgent('agent-1', { name: 'Updated AI' });

      expect(result).toEqual(mockAgent);
    });
  });

  describe('listAgents', () => {
    it('should list agents with pagination', async () => {
      const mockAgents = [{ id: 'a1', name: 'AI 1' }, { id: 'a2', name: 'AI 2' }];
      mockPool.query.mockResolvedValue({ rows: mockAgents });

      const result = await db.listAgents(10, 0);

      expect(result).toEqual(mockAgents);
      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM agents ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [10, 0]
      );
    });
  });

  describe('saveGame', () => {
    it('should save game and return created row', async () => {
      const mockGame = { id: 'game-1', gameType: 'tictactoe' };
      mockPool.query.mockResolvedValue({ rows: [mockGame] });

      const result = await db.saveGame({
        id: 'game-1',
        gameType: 'tictactoe',
        config: {},
      });

      expect(result).toEqual(mockGame);
      expect(mockPool.query).toHaveBeenCalled();
    });
  });

  describe('getGame', () => {
    it('should return game when found', async () => {
      const mockGame = { id: 'game-1', gameType: 'tictactoe' };
      mockPool.query.mockResolvedValue({ rows: [mockGame] });

      const result = await db.getGame('game-1');

      expect(result).toEqual(mockGame);
    });
  });

  describe('updateGame', () => {
    it('should update game and return updated row', async () => {
      const mockGame = { id: 'game-1', config: { status: 'completed' } };
      mockPool.query.mockResolvedValue({ rows: [mockGame] });

      const result = await db.updateGame('game-1', { config: { status: 'completed' } });

      expect(result).toEqual(mockGame);
    });
  });

  describe('saveGameEvent', () => {
    it('should save game event', async () => {
      const mockEvent = { id: 'event-1', type: 'move', playerId: 'p1' };
      mockPool.query.mockResolvedValue({ rows: [mockEvent] });

      const result = await db.saveGameEvent('game-1', {
        id: 'event-1',
        type: 'move',
        playerId: 'p1',
        timestamp: Date.now(),
        data: {},
      });

      expect(result).toEqual(mockEvent);
    });
  });

  describe('getGameEvents', () => {
    it('should return game events', async () => {
      const mockEvents = [
        { id: 'e1', type: 'move' },
        { id: 'e2', type: 'chat' },
      ];
      mockPool.query.mockResolvedValue({ rows: mockEvents });

      const result = await db.getGameEvents('game-1');

      expect(result).toEqual(mockEvents);
      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM game_events WHERE game_id = $1 ORDER BY created_at ASC',
        ['game-1']
      );
    });
  });

  describe('saveChatMessage', () => {
    it('should save chat message', async () => {
      const mockMessage = {
        id: 'msg-1',
        gameId: 'game-1',
        senderId: 'p1',
        senderName: 'Test',
        senderType: 'human',
        content: 'Hello',
        timestamp: Date.now(),
      };
      mockPool.query.mockResolvedValue({ rows: [mockMessage] });

      const result = await db.saveChatMessage({
        id: 'msg-1',
        gameId: 'game-1',
        senderId: 'p1',
        senderName: 'Test',
        senderType: 'human',
        content: 'Hello',
        timestamp: Date.now(),
      });

      expect(result).toEqual(mockMessage);
    });
  });

  describe('getChatMessages', () => {
    it('should return chat messages with limit', async () => {
      const mockMessages = [{ id: 'msg-1', content: 'Hello' }];
      mockPool.query.mockResolvedValue({ rows: mockMessages });

      const result = await db.getChatMessages('game-1', 50);

      expect(result).toEqual(mockMessages);
      expect(mockPool.query).toHaveBeenCalledWith(
        'SELECT * FROM chat_messages WHERE game_id = $1 ORDER BY created_at DESC LIMIT $2',
        ['game-1', 50]
      );
    });
  });

  describe('getLeaderboard', () => {
    it('should return leaderboard entries', async () => {
      const mockLeaderboard = [
        { id: 'p1', username: 'Player1', avatar: null, wins: 10, games_played: 15 },
      ];
      mockPool.query.mockResolvedValue({ rows: mockLeaderboard });

      const result = await db.getLeaderboard(10);

      expect(result).toEqual(mockLeaderboard);
      expect(mockPool.query).toHaveBeenCalled();
    });
  });

  describe('saveAgentBehavior', () => {
    it('should save agent behavior', async () => {
      mockPool.query.mockResolvedValue({ rows: [] });

      await db.saveAgentBehavior({
        id: 'behavior-1',
        personality: { aggressive: true },
        decisionModel: 'minimax',
        version: 1,
      });

      expect(mockPool.query).toHaveBeenCalled();
    });
  });

  describe('initializeSchema', () => {
    it('should create all tables and indexes', async () => {
      mockPool.query.mockResolvedValue({ rows: [] });

      await db.initializeSchema();

      expect(mockPool.query).toHaveBeenCalled();
      const queries = mockPool.query.mock.calls.map(c => c[0]);
      expect(queries.some(q => q.includes('CREATE TABLE IF NOT EXISTS players'))).toBe(true);
      expect(queries.some(q => q.includes('CREATE TABLE IF NOT EXISTS agents'))).toBe(true);
      expect(queries.some(q => q.includes('CREATE TABLE IF NOT EXISTS games'))).toBe(true);
      expect(queries.some(q => q.includes('CREATE TABLE IF NOT EXISTS game_events'))).toBe(true);
      expect(queries.some(q => q.includes('CREATE TABLE IF NOT EXISTS chat_messages'))).toBe(true);
      expect(queries.some(q => q.includes('CREATE TABLE IF NOT EXISTS agent_behaviors'))).toBe(true);
      expect(queries.some(q => q.includes('CREATE INDEX'))).toBe(true);
    });
  });
});
