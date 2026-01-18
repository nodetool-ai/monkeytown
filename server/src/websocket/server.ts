import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { RedisService } from '../services/redis.js';
import { GameServer } from '../game/server.js';
import type { EventHandler, ConnectionManager, WebSocket } from './types.js';

export class EventStream {
  private io: SocketIOServer;
  private connections: ConnectionManager = new Map();
  private redis: RedisService;
  private gameServer: GameServer;

  constructor(httpServer: HttpServer, redis: RedisService, gameServer: GameServer) {
    this.redis = redis;
    this.gameServer = gameServer;

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
    this.io.on('connection', (socket) => {
      const playerId = (socket as Socket & { playerId: string }).playerId;
      console.log(`[EventStream] Player connected: ${playerId}`);

      this.connections.set(playerId, {
        socket,
        connectedAt: Date.now(),
        subscriptions: new Set(),
      });

      this.setupSocketListeners(socket, playerId);

      socket.on('disconnect', () => {
        console.log(`[EventStream] Player disconnected: ${playerId}`);
        this.connections.delete(playerId);
      });

      socket.on('error', (error) => {
        console.error(`[EventStream] Socket error for ${playerId}:`, error);
      });
    });
  }

  private setupSocketListeners(socket: Socket, playerId: string): void {
    socket.on('game:join', async (data: { gameId: string }) => {
      try {
        const session = await this.gameServer.getSession(data.gameId);
        if (!session) {
          socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
          return;
        }

        socket.join(`game:${data.gameId}`);
        socket.emit('game:joined', { gameId: data.gameId });
      } catch (error) {
        socket.emit('error', { code: 'JOIN_FAILED', message: 'Failed to join game' });
      }
    });

    socket.on('game:leave', async (data: { gameId: string }) => {
      socket.leave(`game:${data.gameId}`);
      socket.emit('game:left', { gameId: data.gameId });
    });

    socket.on('game:action', async (data: { gameId: string; action: unknown }) => {
      try {
        const session = await this.gameServer.getSession(data.gameId);
        if (!session) {
          socket.emit('error', { code: 'GAME_NOT_FOUND', message: 'Game session not found' });
          return;
        }

        if (session.config.gameType === 'babel') {
          const event = await this.gameServer.processBabelAction(data.gameId, playerId, data.action as any);
          if (event) {
            this.io.to(`game:${data.gameId}`).emit('game:event', event);
          }
        } else {
          socket.emit('error', { code: 'UNSUPPORTED_GAME', message: 'Game type not supported yet' });
        }
      } catch (error) {
        socket.emit('error', { code: 'ACTION_FAILED', message: 'Failed to process action' });
      }
    });

    socket.on('game:chat', (data: { gameId: string; message: string }) => {
      this.io.to(`game:${data.gameId}`).emit('game:chat', {
        playerId,
        message: data.message,
        timestamp: Date.now(),
      });
    });

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
          conn.socket.disconnect();
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

interface ConnectionStats {
  totalConnections: number;
  connectionsById: string[];
}
