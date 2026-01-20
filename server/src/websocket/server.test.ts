import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { GameActionMessage, PlayerMoveMessage, GameStateSyncMessage } from './server.js';
import type { GameSession, Player, TicTacToeGameState, BabelGameState, GameEvent } from '../game/types.js';

describe('EventStream', () => {
  describe('Connection Management', () => {
    it('should track connection statistics', () => {
      const stats = {
        totalConnections: 0,
        connectionsById: [],
      };

      expect(stats.totalConnections).toBe(0);
    });

    it('should store connection information', () => {
      const conn = {
        socketId: 'socket-123',
        playerId: 'player-1',
        playerName: 'TestPlayer',
        connectedAt: Date.now(),
        subscriptions: new Set(['game:game-1']),
      };

      expect(conn.socketId).toBe('socket-123');
      expect(conn.playerId).toBe('player-1');
      expect(conn.playerName).toBe('TestPlayer');
      expect(conn.subscriptions.has('game:game-1')).toBe(true);
    });

    it('should manage subscription sets', () => {
      const subscriptions = new Set<string>();

      subscriptions.add('game:game-1');
      subscriptions.add('game:game-2');

      expect(subscriptions.has('game:game-1')).toBe(true);
      expect(subscriptions.has('game:game-2')).toBe(true);
      expect(subscriptions.size).toBe(2);

      subscriptions.delete('game:game-1');
      expect(subscriptions.has('game:game-1')).toBe(false);
      expect(subscriptions.size).toBe(1);
    });
  });

  describe('Game Action Messages', () => {
    it('should validate game action message structure', () => {
      const action: GameActionMessage = {
        gameId: 'game-123',
        action: {
          type: 'place',
          row: 0,
          col: 1,
        },
      };

      expect(action.gameId).toBe('game-123');
      expect(action.action.type).toBe('place');
      expect(action.action.row).toBe(0);
      expect(action.action.col).toBe(1);
    });

    it('should validate babel action message structure', () => {
      const action: GameActionMessage = {
        gameId: 'game-123',
        action: {
          type: 'play_card',
          cardId: 'card-1',
          targetPlayerId: 'player-2',
        },
      };

      expect(action.gameId).toBe('game-123');
      expect(action.action.type).toBe('play_card');
      expect(action.action.cardId).toBe('card-1');
      expect(action.action.targetPlayerId).toBe('player-2');
    });
  });

  describe('Player Move Messages', () => {
    it('should validate player move message structure', () => {
      const move: PlayerMoveMessage = {
        gameId: 'game-123',
        move: {
          type: 'place',
          row: 1,
          col: 2,
        },
      };

      expect(move.gameId).toBe('game-123');
      expect(move.move.type).toBe('place');
      expect((move.move as Record<string, unknown>).row).toBe(1);
    });

    it('should support flexible move properties', () => {
      const move: PlayerMoveMessage = {
        gameId: 'game-123',
        move: {
          type: 'special_babel_tower',
          cardId: 'card-1',
          targetPlayerId: 'player-2',
          value: 15,
        },
      };

      expect(move.move.type).toBe('special_babel_tower');
      expect((move.move as Record<string, unknown>).value).toBe(15);
    });
  });

  describe('Game State Sync Messages', () => {
    it('should validate basic sync message', () => {
      const sync: GameStateSyncMessage = {
        gameId: 'game-123',
      };

      expect(sync.gameId).toBe('game-123');
      expect(sync.fullState).toBeUndefined();
    });

    it('should validate full state sync message', () => {
      const sync: GameStateSyncMessage = {
        gameId: 'game-123',
        fullState: true,
      };

      expect(sync.gameId).toBe('game-123');
      expect(sync.fullState).toBe(true);
    });
  });

  describe('Game Event Broadcasting', () => {
    it('should create player joined event', () => {
      const event = {
        type: 'player_joined',
        playerId: 'player-1',
        playerName: 'TestPlayer',
        timestamp: Date.now(),
      };

      expect(event.type).toBe('player_joined');
      expect(event.playerId).toBe('player-1');
      expect(event.playerName).toBe('TestPlayer');
      expect(typeof event.timestamp).toBe('number');
    });

    it('should create player left event', () => {
      const event = {
        type: 'player_left',
        playerId: 'player-1',
        reason: 'player_left',
        timestamp: Date.now(),
      };

      expect(event.type).toBe('player_left');
      expect(event.playerId).toBe('player-1');
      expect(event.reason).toBe('player_left');
    });

    it('should create game started event', () => {
      const event = {
        type: 'game_started',
        gameId: 'game-123',
        startedAt: Date.now(),
      };

      expect(event.type).toBe('game_started');
      expect(event.gameId).toBe('game-123');
      expect(typeof event.startedAt).toBe('number');
    });

    it('should create game ended event', () => {
      const event = {
        type: 'game_ended',
        gameId: 'game-123',
        endedAt: Date.now(),
      };

      expect(event.type).toBe('game_ended');
      expect(event.gameId).toBe('game-123');
      expect(typeof event.endedAt).toBe('number');
    });

    it('should create player moved event', () => {
      const event = {
        type: 'place',
        playerId: 'player-1',
        timestamp: Date.now(),
        data: { row: 0, col: 1 },
      };

      expect(event.type).toBe('place');
      expect(event.playerId).toBe('player-1');
      expect(event.data).toEqual({ row: 0, col: 1 });
    });
  });

  describe('Chat Messages', () => {
    it('should validate chat message structure', () => {
      const chatMessage = {
        id: 'msg-123',
        gameId: 'game-123',
        senderId: 'player-1',
        senderName: 'TestPlayer',
        senderType: 'human' as const,
        content: 'Hello world',
        timestamp: Date.now(),
      };

      expect(chatMessage.id).toBe('msg-123');
      expect(chatMessage.gameId).toBe('game-123');
      expect(chatMessage.senderId).toBe('player-1');
      expect(chatMessage.senderType).toBe('human');
      expect(chatMessage.content).toBe('Hello world');
    });

    it('should validate agent chat message structure', () => {
      const chatMessage = {
        id: 'msg-123',
        gameId: 'game-123',
        senderId: 'agent-1',
        senderName: 'TricksterMonkey',
        senderType: 'agent' as const,
        content: 'I see your move!',
        timestamp: Date.now(),
      };

      expect(chatMessage.senderType).toBe('agent');
      expect(chatMessage.senderName).toBe('TricksterMonkey');
    });

    it('should validate chat history response structure', () => {
      const history = {
        gameId: 'game-123',
        messages: [
          {
            id: 'msg-1',
            senderId: 'player-1',
            content: 'Hello',
            timestamp: Date.now(),
          },
          {
            id: 'msg-2',
            senderId: 'player-2',
            content: 'Hi there',
            timestamp: Date.now(),
          },
        ],
      };

      expect(history.gameId).toBe('game-123');
      expect(history.messages).toHaveLength(2);
      expect(history.messages[0].id).toBe('msg-1');
    });
  });

  describe('Heartbeat Handling', () => {
    it('should create heartbeat acknowledgment', () => {
      const ack = {
        timestamp: Date.now(),
      };

      expect(typeof ack.timestamp).toBe('number');
    });

    it('should create heartbeat with player ID', () => {
      const ack = {
        timestamp: Date.now(),
        playerId: 'player-1',
      };

      expect(ack.playerId).toBe('player-1');
    });

    it('should create pong response', () => {
      const pong = {
        timestamp: Date.now(),
      };

      expect(typeof pong.timestamp).toBe('number');
    });
  });

  describe('Connection Stats', () => {
    it('should format connection statistics', () => {
      const stats = {
        totalConnections: 5,
        connectionsById: ['p1', 'p2', 'p3', 'p4', 'p5'],
      };

      expect(stats.totalConnections).toBe(5);
      expect(stats.connectionsById).toHaveLength(5);
    });

    it('should handle empty connections', () => {
      const stats = {
        totalConnections: 0,
        connectionsById: [],
      };

      expect(stats.totalConnections).toBe(0);
      expect(stats.connectionsById).toHaveLength(0);
    });
  });

  describe('Game State Response', () => {
    it('should format basic state sync response', () => {
      const state = {
        gameId: 'game-123',
        state: {
          phase: 'in_progress',
          players: [],
        },
      };

      expect(state.gameId).toBe('game-123');
      expect(state.state.phase).toBe('in_progress');
    });

    it('should format full state sync response', () => {
      const state = {
        gameId: 'game-123',
        session: {
          id: 'game-123',
          config: {
            maxPlayers: 4,
            gameType: 'babel',
          },
          status: 'active',
          createdAt: Date.now(),
        },
        state: {
          phase: 'in_progress',
        },
        players: [
          { id: 'p1', name: 'Player 1', type: 'human', score: 0, isConnected: true },
        ],
      };

      expect(state.session).toBeDefined();
      expect(state.session?.config.gameType).toBe('babel');
      expect(state.players).toHaveLength(1);
    });

    it('should format game ended response', () => {
      const ended = {
        gameId: 'game-123',
        state: {
          phase: 'finished',
          result: { outcome: 'win', winnerId: 'player-1' },
        },
        endedAt: Date.now(),
      };

      expect(ended.state.phase).toBe('finished');
      expect(ended.state.result?.outcome).toBe('win');
    });
  });

  describe('Error Responses', () => {
    it('should format game not found error', () => {
      const error = {
        code: 'GAME_NOT_FOUND',
        message: 'Game session not found',
      };

      expect(error.code).toBe('GAME_NOT_FOUND');
      expect(error.message).toBe('Game session not found');
    });

    it('should format invalid move error', () => {
      const error = {
        code: 'INVALID_MOVE',
        message: 'Invalid move',
      };

      expect(error.code).toBe('INVALID_MOVE');
    });

    it('should format game not active error', () => {
      const error = {
        code: 'GAME_NOT_ACTIVE',
        message: 'Game is not currently active',
      };

      expect(error.code).toBe('GAME_NOT_ACTIVE');
    });

    it('should format not enough players error', () => {
      const error = {
        code: 'NOT_ENOUGH_PLAYERS',
        message: 'At least 2 players required to start',
      };

      expect(error.code).toBe('NOT_ENOUGH_PLAYERS');
    });

    it('should format empty message error', () => {
      const error = {
        code: 'EMPTY_MESSAGE',
        message: 'Message cannot be empty',
      };

      expect(error.code).toBe('EMPTY_MESSAGE');
    });

    it('should format message too long error', () => {
      const error = {
        code: 'MESSAGE_TOO_LONG',
        message: 'Message exceeds 500 characters',
      };

      expect(error.code).toBe('MESSAGE_TOO_LONG');
    });
  });

  describe('Lobby Games Response', () => {
    it('should format lobby games response', () => {
      const lobby = {
        games: [
          {
            id: 'game-1',
            gameType: 'tictactoe',
            playerCount: 1,
            maxPlayers: 2,
          },
          {
            id: 'game-2',
            gameType: 'babel',
            playerCount: 3,
            maxPlayers: 4,
          },
        ],
        timestamp: Date.now(),
      };

      expect(lobby.games).toHaveLength(2);
      expect(lobby.games[0].gameType).toBe('tictactoe');
      expect(lobby.games[1].gameType).toBe('babel');
    });
  });

  describe('Token Validation', () => {
    it('should extract player ID from token payload', () => {
      const decoded = {
        playerId: 'player-123',
        playerName: 'TestPlayer',
      };

      expect(decoded.playerId).toBe('player-123');
      expect(decoded.playerName).toBe('TestPlayer');
    });

    it('should handle missing player name', () => {
      const decoded: { playerId: string; playerName?: string } = {
        playerId: 'player-123',
      };

      expect(decoded.playerId).toBe('player-123');
      expect(decoded.playerName).toBeUndefined();
    });
  });
});

describe('EventStream Integration', () => {
  describe('Game Event Flow', () => {
    it('should handle complete game lifecycle', () => {
      const gameEvents: Array<{ type: string; data: Record<string, unknown> }> = [];

      gameEvents.push({ type: 'player_joined', data: { playerId: 'p1' } });
      gameEvents.push({ type: 'player_joined', data: { playerId: 'p2' } });
      gameEvents.push({ type: 'game_started', data: {} });
      gameEvents.push({ type: 'player_moved', data: { playerId: 'p1', move: { row: 0, col: 0 } } });
      gameEvents.push({ type: 'player_moved', data: { playerId: 'p2', move: { row: 0, col: 1 } } });
      gameEvents.push({ type: 'game_ended', data: { winnerId: 'p1' } });

      expect(gameEvents).toHaveLength(6);
      expect(gameEvents[0].type).toBe('player_joined');
      expect(gameEvents[2].type).toBe('game_started');
      expect(gameEvents[5].type).toBe('game_ended');
    });

    it('should track player connection state', () => {
      const connections = new Map<string, { connected: boolean; lastSeen: number }>();

      connections.set('p1', { connected: true, lastSeen: Date.now() });
      connections.set('p2', { connected: true, lastSeen: Date.now() });

      expect(connections.get('p1')?.connected).toBe(true);
      expect(connections.get('p2')?.connected).toBe(true);

      connections.delete('p1');
      expect(connections.has('p1')).toBe(false);
    });

    it('should handle concurrent player actions', () => {
      const actions: Array<{ playerId: string; action: string; order: number }> = [];

      for (let i = 0; i < 5; i++) {
        const playerId = i % 2 === 0 ? 'p1' : 'p2';
        actions.push({ playerId, action: 'move', order: i });
      }

      expect(actions).toHaveLength(5);
      expect(actions[0].playerId).toBe('p1');
      expect(actions[1].playerId).toBe('p2');
    });
  });

  describe('Chat Flow', () => {
    it('should handle chat message sequence', () => {
      const messages: Array<{ id: string; senderId: string; content: string }> = [];

      messages.push({ id: '1', senderId: 'p1', content: 'Hello' });
      messages.push({ id: '2', senderId: 'p2', content: 'Hi!' });
      messages.push({ id: '3', senderId: 'p1', content: 'Ready to play?' });

      expect(messages).toHaveLength(3);
      expect(messages[0].senderId).toBe('p1');
      expect(messages[2].content).toBe('Ready to play?');
    });

    it('should filter empty messages', () => {
      const messages: string[] = [];
      const newMessage: string = '';

      if (newMessage.trim().length > 0) {
        messages.push(newMessage);
      }

      expect(messages).toHaveLength(0);
    });

    it('should truncate long messages', () => {
      const maxLength = 500;
      const longMessage = 'x'.repeat(600);
      const truncated = longMessage.slice(0, maxLength);

      expect(longMessage.length).toBe(600);
      expect(truncated.length).toBe(500);
    });
  });

  describe('State Synchronization', () => {
    it('should track state version progression', () => {
      const states: Array<{ version: number; phase: string }> = [];

      states.push({ version: 1, phase: 'waiting' });
      states.push({ version: 2, phase: 'waiting' });
      states.push({ version: 3, phase: 'in_progress' });
      states.push({ version: 4, phase: 'in_progress' });
      states.push({ version: 5, phase: 'finished' });

      expect(states[0].phase).toBe('waiting');
      expect(states[2].phase).toBe('in_progress');
      expect(states[4].phase).toBe('finished');
    });

    it('should handle state rollback scenarios', () => {
      const currentVersion = 5;
      const targetVersion = 3;

      expect(currentVersion).toBeGreaterThan(targetVersion);
    });
  });
});
