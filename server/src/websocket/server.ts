import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { RedisService } from '../services/redis.js';
import { GameServer } from '../game/server.js';
import { DatabaseService } from '../services/database.js';
import type { GameEvent, Player, BabelAction } from '../game/types.js';
import type { TicTacToeAction } from '../game/tictactoe-engine.js';

interface ConnectionInfo {
  socketId: string;
  playerId: string;
  playerName: string;
  connectedAt: number;
  subscriptions: Set<string>;
}

interface ConnectionStats {
  totalConnections: number;
  connectionsById: string[];
}

export interface GameActionMessage {
  gameId: string;
  action: {
    type: string;
    row?: number;
    col?: number;
    cardId?: string;
    targetPlayerId?: string;
  };
}

export interface PlayerMoveMessage {
  gameId: string;
  move: {
    type: string;
    [key: string]: unknown;
  };
}

export interface GameStateSyncMessage {
  gameId: string;
  fullState?: boolean;
}

export class EventStream {
  private io: SocketIOServer;
  private connections: Map<string, ConnectionInfo> = new Map();
  private redis: RedisService;
  private gameServer: GameServer;
  private db: DatabaseService;

  constructor(httpServer: HttpServer, redis: RedisService, gameServer: GameServer, db?: DatabaseService) {
    this.redis = redis;
    this.gameServer = gameServer;
    this.db = db || new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');

    this.io = new SocketIOServer(httpServer, {
      cors: {
        origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
        credentials: true,
      },
      pingInterval: 25000,
      pingTimeout: 20000,
      transports: ['websocket', 'polling'],
    });

    this.setupMiddleware();
    this.setupEventHandlers();
    this.startHealthMonitor();
  }

  private setupMiddleware(): void {
    this.io.use(async (socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) {
          return next(new Error('Authentication required'));
        }

        const { playerId, playerName } = await this.validateToken(token);
        (socket as Socket & { playerId: string; playerName: string }).playerId = playerId;
        (socket as Socket & { playerName: string }).playerName = playerName || 'Anonymous';
        next();
      } catch (error) {
        next(error as Error);
      }
    });
  }

  private setupEventHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      const playerId = (socket as Socket & { playerId: string }).playerId;
      const playerName = (socket as Socket & { playerName: string }).playerName || 'Anonymous';
      const socketId = socket.id;

      console.log(`[EventStream] Player connected: ${playerId} (${playerName})`);

      this.connections.set(playerId, {
        socketId,
        playerId,
        playerName,
        connectedAt: Date.now(),
        subscriptions: new Set(),
      });

      this.setupSocketListeners(socket, playerId, playerName);

      socket.on('disconnect', (reason: string) => {
        console.log(`[EventStream] Player disconnected: ${playerId}, reason: ${reason}`);
        this.handlePlayerDisconnect(playerId, reason);
      });

      socket.on('error', (error: Error) => {
        console.error(`[EventStream] Socket error for ${playerId}:`, error);
      });
    });
  }

  private handlePlayerDisconnect(playerId: string, reason: string): void {
    const conn = this.connections.get(playerId);
    if (!conn) return;

    for (const subscription of conn.subscriptions) {
      const gameId = subscription.replace('game:', '');
      this.broadcastPlayerLeft(gameId, playerId, reason);
    }

    this.connections.delete(playerId);
  }

  private setupSocketListeners(socket: Socket, playerId: string, playerName: string): void {
    this.setupGameEventHandlers(socket, playerId, playerName);
    this.setupMoveEventHandlers(socket, playerId);
    this.setupStateSyncHandlers(socket, playerId);
    this.setupChatHandlers(socket, playerId, playerName);
    this.setupSystemHandlers(socket, playerId);
  }

  private setupGameEventHandlers(socket: Socket, playerId: string, playerName: string): void {
    socket.on('join_game', async (data: { gameId: string }) => {
      await this.handleJoinGame(socket, playerId, playerName, data.gameId);
    });

    socket.on('game:join', async (data: { gameId: string }) => {
      await this.handleJoinGame(socket, playerId, playerName, data.gameId);
    });

    socket.on('leave_game', async (data: { gameId: string }) => {
      await this.handleLeaveGame(socket, playerId, data.gameId);
    });

    socket.on('game:leave', async (data: { gameId: string }) => {
      await this.handleLeaveGame(socket, playerId, data.gameId);
    });

    socket.on('start_game', async (data: { gameId: string }) => {
      await this.handleStartGame(socket, playerId, data.gameId);
    });

    socket.on('game:start', async (data: { gameId: string }) => {
      await this.handleStartGame(socket, playerId, data.gameId);
    });
  }

  private setupMoveEventHandlers(socket: Socket, playerId: string): void {
    socket.on('player_input', async (data: PlayerMoveMessage) => {
      await this.handlePlayerMove(socket, playerId, data.gameId, data.move);
    });

    socket.on('game:action', async (data: GameActionMessage) => {
      await this.handleGameAction(socket, playerId, data);
    });

    socket.on('game:move', async (data: PlayerMoveMessage) => {
      await this.handlePlayerMove(socket, playerId, data.gameId, data.move);
    });
  }

  private setupStateSyncHandlers(socket: Socket, playerId: string): void {
    socket.on('game:state:sync', async (data: GameStateSyncMessage) => {
      await this.handleStateSync(socket, playerId, data.gameId, data.fullState);
    });

    socket.on('get_game_state', async (data: { gameId: string }) => {
      await this.handleStateSync(socket, playerId, data.gameId, false);
    });
  }

  private setupChatHandlers(socket: Socket, playerId: string, playerName: string): void {
    socket.on('chat_message', async (data: { gameId: string; message: string }) => {
      await this.handleChatMessage(socket, playerId, playerName, data.gameId, data.message);
    });

    socket.on('game:chat', async (data: { gameId: string; message: string }) => {
      await this.handleChatMessage(socket, playerId, playerName, data.gameId, data.message);
    });

    socket.on('game:chat:history', async (data: { gameId: string; limit?: number }) => {
      await this.handleChatHistory(socket, data.gameId, data.limit);
    });

    socket.on('get_chat_history', async (data: { gameId: string; limit?: number }) => {
      await this.handleChatHistory(socket, data.gameId, data.limit);
    });
  }

  private setupSystemHandlers(socket: Socket, playerId: string): void {
    socket.on('heartbeat', () => {
      socket.emit('heartbeat:ack', { timestamp: Date.now(), playerId });
    });

    socket.on('ping', () => {
      socket.emit('pong', { timestamp: Date.now() });
    });

    socket.on('get_connection_stats', () => {
      const stats = this.getConnectionStats();
      socket.emit('connection_stats', stats);
    });

    socket.on('get_lobby_games', async () => {
      await this.handleGetLobbyGames(socket);
    });
  }

  private async handleJoinGame(socket: Socket, playerId: string, playerName: string, gameId: string): Promise<void> {
    try {
      const session = await this.gameServer.getSession(gameId);
      if (!session) {
        socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
        return;
      }

      const player: Player = {
        id: playerId,
        name: playerName,
        type: 'human',
        score: 0,
        isConnected: true,
      };

      const joinedSession = await this.gameServer.joinSession(gameId, player);
      if (!joinedSession) {
        socket.emit('error', { code: 'JOIN_FAILED', message: 'Failed to join game session' });
        return;
      }

      socket.join(`game:${gameId}`);
      const conn = this.connections.get(playerId);
      if (conn) {
        conn.subscriptions.add(`game:${gameId}`);
      }

      socket.emit('game:joined', {
        gameId,
        state: joinedSession.state,
        player: {
          id: playerId,
          name: playerName,
        },
      });

      this.broadcastPlayerJoined(gameId, playerId, playerName);

      console.log(`[EventStream] Player ${playerName} (${playerId}) joined game ${gameId}`);
    } catch (error) {
      console.error('[EventStream] Join game error:', error);
      socket.emit('error', { code: 'JOIN_FAILED', message: 'Failed to join game' });
    }
  }

  private async handleLeaveGame(socket: Socket, playerId: string, gameId: string): Promise<void> {
    try {
      socket.leave(`game:${gameId}`);
      const conn = this.connections.get(playerId);
      if (conn) {
        conn.subscriptions.delete(`game:${gameId}`);
      }

      await this.gameServer.endSession(gameId);

      socket.emit('game:left', { gameId });
      this.broadcastPlayerLeft(gameId, playerId, 'player_left');

      console.log(`[EventStream] Player ${playerId} left game ${gameId}`);
    } catch (error) {
      console.error('[EventStream] Leave game error:', error);
      socket.emit('error', { code: 'LEAVE_FAILED', message: 'Failed to leave game' });
    }
  }

  private async handleStartGame(socket: Socket, playerId: string, gameId: string): Promise<void> {
    try {
      const session = await this.gameServer.getSession(gameId);
      if (!session) {
        socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
        return;
      }

      if (session.players.length < 2) {
        socket.emit('error', { code: 'NOT_ENOUGH_PLAYERS', message: 'At least 2 players required to start' });
        return;
      }

      const isPlayerInGame = session.players.some(p => p.id === playerId);
      if (!isPlayerInGame) {
        socket.emit('error', { code: 'NOT_IN_GAME', message: 'You are not in this game' });
        return;
      }

      await this.gameServer.startSession(gameId);
      const updatedSession = await this.gameServer.getSession(gameId);

      if (updatedSession?.state) {
        this.io.to(`game:${gameId}`).emit('game:started', {
          gameId,
          state: updatedSession.state,
          startedAt: Date.now(),
        });

        this.io.to(`game:${gameId}`).emit('game:state', {
          gameId,
          state: updatedSession.state,
          event: {
            type: 'game_started',
            playerId,
            timestamp: Date.now(),
          },
        });

        console.log(`[EventStream] Game ${gameId} started`);
      }
    } catch (error) {
      console.error('[EventStream] Start game error:', error);
      socket.emit('error', { code: 'START_FAILED', message: 'Failed to start game' });
    }
  }

  private async handlePlayerMove(socket: Socket, playerId: string, gameId: string, move: { type: string; [key: string]: unknown }): Promise<void> {
    try {
      const session = await this.gameServer.getSession(gameId);
      if (!session) {
        socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
        return;
      }

      if (session.status !== 'active') {
        socket.emit('error', { code: 'GAME_NOT_ACTIVE', message: 'Game is not currently active' });
        return;
      }

      let event: GameEvent | null = null;

      if (session.config.gameType === 'tictactoe') {
        const tictactoeAction: TicTacToeAction = {
          type: move.type as 'place' | 'forfeit',
          row: move.row as number | undefined,
          col: move.col as number | undefined,
        };
        event = await this.gameServer.processTicTacToeAction(gameId, playerId, tictactoeAction);
      } else if (session.config.gameType === 'babel') {
        const babelAction: BabelAction = {
          type: move.type as 'play_card' | 'pass' | 'special_babel_tower',
          cardId: move.cardId as string | undefined,
          targetPlayerId: move.targetPlayerId as string | undefined,
        };
        event = await this.gameServer.processBabelAction(gameId, playerId, babelAction);
      } else {
        socket.emit('error', { code: 'UNSUPPORTED_GAME', message: 'Game type not supported' });
        return;
      }

      if (event) {
        const updatedSession = await this.gameServer.getSession(gameId);

        this.io.to(`game:${gameId}`).emit('player_moved', {
          gameId,
          playerId,
          move: {
            eventType: event.type,
            ...move,
          },
          state: updatedSession?.state,
        });

        this.io.to(`game:${gameId}`).emit('game:state', {
          gameId,
          state: updatedSession?.state,
          event,
        });

        if (updatedSession?.status === 'completed') {
          this.handleGameEnd(gameId, updatedSession.state);
        }
      } else {
        socket.emit('error', { code: 'INVALID_MOVE', message: 'Invalid move' });
      }
    } catch (error) {
      console.error('[EventStream] Player move error:', error);
      socket.emit('error', { code: 'MOVE_FAILED', message: 'Failed to process move' });
    }
  }

  private async handleGameAction(socket: Socket, playerId: string, data: GameActionMessage): Promise<void> {
    try {
      const session = await this.gameServer.getSession(data.gameId);
      if (!session) {
        socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
        return;
      }

      let event: GameEvent | null = null;

      if (session.config.gameType === 'tictactoe') {
        event = await this.gameServer.processTicTacToeAction(data.gameId, playerId, {
          type: data.action.type as 'place' | 'forfeit',
          row: data.action.row,
          col: data.action.col,
        });
      } else if (session.config.gameType === 'babel') {
        event = await this.gameServer.processBabelAction(data.gameId, playerId, data.action as BabelAction);
      } else {
        socket.emit('error', { code: 'UNSUPPORTED_GAME', message: 'Game type not supported yet' });
        return;
      }

      if (event) {
        const updatedSession = await this.gameServer.getSession(data.gameId);
        this.io.to(`game:${data.gameId}`).emit('game:state', {
          gameId: data.gameId,
          state: updatedSession?.state,
          event,
        });
      } else {
        socket.emit('error', { code: 'INVALID_ACTION', message: 'Invalid action' });
      }
    } catch (error) {
      console.error('[EventStream] Game action error:', error);
      socket.emit('error', { code: 'ACTION_FAILED', message: 'Failed to process action' });
    }
  }

  private async handleStateSync(socket: Socket, playerId: string, gameId: string, fullState?: boolean): Promise<void> {
    try {
      const session = await this.gameServer.getSession(gameId);
      if (!session) {
        socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
        return;
      }

      const syncData = fullState ? {
        gameId,
        session: {
          id: session.id,
          config: session.config,
          status: session.status,
          createdAt: session.createdAt,
        },
        state: session.state,
        players: session.players,
      } : {
        gameId,
        state: session.state,
      };

      socket.emit('game_state', syncData);

      if (session.status === 'completed' && session.state) {
        const gameEndData = {
          gameId,
          state: session.state,
          endedAt: Date.now(),
        };
        socket.emit('game_ended', gameEndData);
      }
    } catch (error) {
      console.error('[EventStream] State sync error:', error);
      socket.emit('error', { code: 'SYNC_FAILED', message: 'Failed to sync game state' });
    }
  }

  private async handleChatMessage(socket: Socket, playerId: string, playerName: string, gameId: string, message: string): Promise<void> {
    try {
      if (!message || message.trim().length === 0) {
        socket.emit('error', { code: 'EMPTY_MESSAGE', message: 'Message cannot be empty' });
        return;
      }

      if (message.length > 500) {
        socket.emit('error', { code: 'MESSAGE_TOO_LONG', message: 'Message exceeds 500 characters' });
        return;
      }

      const session = await this.gameServer.getSession(gameId);
      const player = session?.players.find(p => p.id === playerId);

      const chatMessage = {
        id: crypto.randomUUID(),
        gameId,
        senderId: playerId,
        senderName: player?.name || playerName,
        senderType: (player?.type || 'human') as 'human' | 'agent',
        content: message.trim(),
        timestamp: Date.now(),
      };

      try {
        await this.db.saveChatMessage(chatMessage);
      } catch (dbError) {
        console.error('[EventStream] Failed to persist chat message:', dbError);
      }

      this.io.to(`game:${gameId}`).emit('chat_message', chatMessage);
      this.io.to(`game:${gameId}`).emit('game:chat', chatMessage);
    } catch (error) {
      console.error('[EventStream] Chat error:', error);
      socket.emit('error', { code: 'CHAT_FAILED', message: 'Failed to send chat message' });
    }
  }

  private async handleChatHistory(socket: Socket, gameId: string, limit?: number): Promise<void> {
    try {
      const messages = await this.db.getChatMessages(gameId, limit || 100);
      socket.emit('chat_history', { gameId, messages });
      socket.emit('game:chat:history', { gameId, messages });
    } catch (error) {
      console.error('[EventStream] Chat history error:', error);
      socket.emit('error', { code: 'CHAT_HISTORY_FAILED', message: 'Failed to get chat history' });
    }
  }

  private async handleGetLobbyGames(socket: Socket): Promise<void> {
    try {
      socket.emit('lobby_games', {
        games: [],
        timestamp: Date.now(),
      });
    } catch (error) {
      console.error('[EventStream] Get lobby games error:', error);
      socket.emit('error', { code: 'LOBBY_FAILED', message: 'Failed to get lobby games' });
    }
  }

  private broadcastPlayerJoined(gameId: string, playerId: string, playerName: string): void {
    const joinEvent = {
      type: 'player_joined',
      playerId,
      playerName,
      timestamp: Date.now(),
    };

    this.io.to(`game:${gameId}`).emit('player_joined', joinEvent);
    this.io.to(`game:${gameId}`).emit('game:event', joinEvent);
    this.redis.publish(`game:${gameId}:events`, joinEvent);
  }

  private broadcastPlayerLeft(gameId: string, playerId: string, reason: string): void {
    const leaveEvent = {
      type: 'player_left',
      playerId,
      reason,
      timestamp: Date.now(),
    };

    this.io.to(`game:${gameId}`).emit('player_left', leaveEvent);
    this.io.to(`game:${gameId}`).emit('game:event', leaveEvent);
    this.redis.publish(`game:${gameId}:events`, leaveEvent);
  }

  private handleGameEnd(gameId: string, state: unknown): void {
    const endEvent = {
      type: 'game_ended',
      gameId,
      state,
      endedAt: Date.now(),
    };

    this.io.to(`game:${gameId}`).emit('game_ended', endEvent);
    this.io.to(`game:${gameId}`).emit('game:event', endEvent);
    this.redis.publish(`game:${gameId}:events`, endEvent);

    console.log(`[EventStream] Game ${gameId} ended`);
  }

  private async validateToken(token: string): Promise<{ playerId: string; playerName: string }> {
    const jwt = await import('jsonwebtoken');
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment variable is required');
    }
    const decoded = jwt.default.verify(token, jwtSecret) as { playerId: string; playerName?: string };
    return {
      playerId: decoded.playerId,
      playerName: decoded.playerName || 'Anonymous',
    };
  }

  private startHealthMonitor(): void {
    setInterval(() => {
      const now = Date.now();
      for (const [playerId, conn] of this.connections) {
        if (now - conn.connectedAt > 300000) {
          console.log(`[EventStream] Cleaning up stale connection: ${playerId}`);
          const socket = this.io.sockets.sockets.get(conn.socketId);
          if (socket) {
            socket.disconnect();
          }
          this.handlePlayerDisconnect(playerId, 'stale_connection');
        }
      }
    }, 60000);
  }

  async broadcast(gameId: string, event: unknown): Promise<void> {
    this.io.to(`game:${gameId}`).emit('game:event', event);
    await this.redis.publish(`game:${gameId}:events`, event);
  }

  getConnectionStats(): ConnectionStats {
    return {
      totalConnections: this.connections.size,
      connectionsById: Array.from(this.connections.keys()),
    };
  }

  getConnectionInfo(playerId: string): ConnectionInfo | undefined {
    return this.connections.get(playerId);
  }

  getAllConnections(): Map<string, ConnectionInfo> {
    return new Map(this.connections);
  }
}
