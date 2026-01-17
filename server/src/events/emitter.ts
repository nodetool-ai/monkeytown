import { WebSocketServer, WebSocket } from 'ws';
import { StreamMessage } from '@monkeytown/shared/types';

export class EventEmitterServer {
  private wss: WebSocketServer | null = null;
  private clients: Set<WebSocket> = new Set();
  private bananaEventListeners: Set<(event: unknown) => void> = new Set();

  constructor(private port: number = 3001) {}

  start(): void {
    this.wss = new WebSocketServer({ port: this.port });

    this.wss.on('connection', (ws: WebSocket) => {
      this.clients.add(ws);
      console.log(`Client connected. Total clients: ${this.clients.size}`);

      ws.on('close', () => {
        this.clients.delete(ws);
        console.log(`Client disconnected. Total clients: ${this.clients.size}`);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });

    console.log(`Event emitter server running on port ${this.port}`);
  }

  broadcast(message: StreamMessage): void {
    const data = JSON.stringify(message);
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
  }

  broadcastBananaEvent(event: unknown): void {
    const message: StreamMessage = {
      type: 'banana_event',
      event,
      timestamp: Date.now(),
    };
    this.broadcast(message);

    for (const listener of this.bananaEventListeners) {
      listener(event);
    }
  }

  onBananaEvent(listener: (event: unknown) => void): () => void {
    this.bananaEventListeners.add(listener);
    return () => {
      this.bananaEventListeners.delete(listener);
    };
  }

  stop(): void {
    if (this.wss) {
      this.wss.close();
      this.wss = null;
    }
    this.clients.clear();
  }

  getClientCount(): number {
    return this.clients.size;
  }
}
