import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { RedisService } from '../services/redis.js';
import { GameServer } from '../game/server.js';
import { DatabaseService } from '../services/database.js';
import { v4 as uuid } from 'uuid';

interface ConnectionInfo {
  socketId: string;
  playerId: string;
  connectedAt: number;
  subscriptions: Set<string>;
}

interface ConnectionStats {
  totalConnections: number;
  connectionsById: string[];
}

// Game action message interface
interface GameActionMessage {
  gameId: string;
  action: {
    type: string;
    row?: number;
    col?: number;
    cardId?: string;
    targetPlayerId?: string;
  };
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

        const playerId = await this.validateToken(token);
        (socket as Socket & { playerId: string }).playerId = playerId;
        next();
      } catch (error) {
        next(error as Error);
      }
    });
  }

  private setupEventHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      const playerId = (socket as Socket & { playerId: string }).playerId;
      const socketId = socket.id;
      console.log(`[EventStream] Player connected: ${playerId}`);

      this.connections.set(playerId, {
        socketId,
        playerId,
        connectedAt: Date.now(),
        subscriptions: new Set(),
      });

      this.setupSocketListeners(socket, playerId);

      socket.on('disconnect', (reason: string) => {
        console.log(`[EventStream] Player disconnected: ${playerId}, reason: ${reason}`);
        this.connections.delete(playerId);
      });

      socket.on('error', (error: Error) => {
        console.error(`[EventStream] Socket error for ${playerId}:`, error);
      });
    });
  }

  private setupSocketListeners(socket: Socket, playerId: string): void {
    // Join a game room
    socket.on('game:join', async (data: { gameId: string }) => {
      try {
        const session = await this.gameServer.getSession(data.gameId);
        if (!session) {
          socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
          return;
        }

        socket.join(`game:${data.gameId}`);
        const conn = this.connections.get(playerId);
        if (conn) {
          conn.subscriptions.add(`game:${data.gameId}`);
        }
        socket.emit('game:joined', { gameId: data.gameId, state: session.state });
      } catch (error) {
        socket.emit('error', { code: 'JOIN_FAILED', message: 'Failed to join game' });
      }
    });

    // Leave a game room
    socket.on('game:leave', async (data: { gameId: string }) => {
      socket.leave(`game:${data.gameId}`);
      const conn = this.connections.get(playerId);
      if (conn) {
        conn.subscriptions.delete(`game:${data.gameId}`);
      }
      socket.emit('game:left', { gameId: data.gameId });
    });

    // Handle game actions (TicTacToe and Babel)
    socket.on('game:action', async (data: GameActionMessage) => {
      try {
        const session = await this.gameServer.getSession(data.gameId);
        if (!session) {
          socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
          return;
        }

        let event;
        if (session.config.gameType === 'tictactoe') {
          event = await this.gameServer.processTicTacToeAction(data.gameId, playerId, {
            type: data.action.type as 'place' | 'forfeit',
            row: data.action.row,
            col: data.action.col,
          });
        } else if (session.config.gameType === 'babel') {
          event = await this.gameServer.processBabelAction(data.gameId, playerId, data.action as any);
        } else {
          socket.emit('error', { code: 'UNSUPPORTED_GAME', message: 'Game type not supported yet' });
          return;
        }

        if (event) {
          // Get updated session state
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
        console.error('[EventStream] Action error:', error);
        socket.emit('error', { code: 'ACTION_FAILED', message: 'Failed to process action' });
      }
    });

    // Handle chat messages - now persisted to database
    socket.on('game:chat', async (data: { gameId: string; message: string }) => {
      try {
        const session = await this.gameServer.getSession(data.gameId);
        const player = session?.players.find(p => p.id === playerId);
        
        const chatMessage = {
          id: uuid(),
          gameId: data.gameId,
          senderId: playerId,
          senderName: player?.name || 'Anonymous',
          senderType: (player?.type || 'human') as 'human' | 'agent',
          content: data.message,
          timestamp: Date.now(),
        };

        // Persist to database
        try {
          await this.db.saveChatMessage(chatMessage);
        } catch (dbError) {
          console.error('[EventStream] Failed to persist chat message:', dbError);
        }

        // Broadcast to all players in the game
        this.io.to(`game:${data.gameId}`).emit('game:chat', chatMessage);
      } catch (error) {
        console.error('[EventStream] Chat error:', error);
        socket.emit('error', { code: 'CHAT_FAILED', message: 'Failed to send chat message' });
      }
    });

    // Get chat history
    socket.on('game:chat:history', async (data: { gameId: string; limit?: number }) => {
      try {
        const messages = await this.db.getChatMessages(data.gameId, data.limit || 100);
        socket.emit('game:chat:history', { gameId: data.gameId, messages });
      } catch (error) {
        console.error('[EventStream] Chat history error:', error);
        socket.emit('error', { code: 'CHAT_HISTORY_FAILED', message: 'Failed to get chat history' });
      }
    });

    // Heartbeat
    socket.on('heartbeat', () => {
      socket.emit('heartbeat:ack', { timestamp: Date.now() });
    });
  }

  private async validateToken(token: string): Promise<string> {
    const jwt = await import('jsonwebtoken');
    const decoded = jwt.default.verify(token, process.env.JWT_SECRET || 'dev-secret') as { playerId: string };
    return decoded.playerId;
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
          this.connections.delete(playerId);
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
}
