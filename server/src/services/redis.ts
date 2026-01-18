import Redis from 'ioredis';
import type { GameSession } from '../game/types.js';

export class RedisService {
  private client: Redis;
  private subscriber: Redis;
  private publisher: Redis;

  constructor(url: string) {
    this.client = new Redis(url);
    this.subscriber = new Redis(url);
    this.publisher = new Redis(url);

    this.client.on('error', (err) => console.error('[Redis] Client error:', err));
    this.client.on('connect', () => console.log('[Redis] Connected'));

    this.subscriber.on('message', (channel, message) => {
      console.log(`[Redis] Message on ${channel}:`, message);
    });
  }

  async connect(): Promise<void> {
    await this.client.ping();
    await this.subscriber.ping();
    await this.publisher.ping();
    console.log('[Redis] All connections verified');
  }

  async disconnect(): Promise<void> {
    await this.client.quit();
    await this.subscriber.quit();
    await this.publisher.quit();
  }

  async cacheSession(sessionId: string, session: GameSession): Promise<void> {
    await this.client.setex(
      `session:${sessionId}`,
      3600,
      JSON.stringify(session)
    );
  }

  async getCachedSession(sessionId: string): Promise<GameSession | null> {
    const data = await this.client.get(`session:${sessionId}`);
    if (!data) return null;
    return JSON.parse(data);
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.client.del(`session:${sessionId}`);
  }

  async publish(channel: string, event: unknown): Promise<void> {
    await this.publisher.publish(channel, JSON.stringify(event));
  }

  async subscribe(channel: string, callback: (event: unknown) => void): Promise<void> {
    await this.subscriber.subscribe(channel);
    this.subscriber.on('message', (ch, message) => {
      if (ch === channel) {
        callback(JSON.parse(message));
      }
    });
  }

  async setPlayerState(playerId: string, state: unknown): Promise<void> {
    await this.client.setex(`player:${playerId}`, 300, JSON.stringify(state));
  }

  async getPlayerState(playerId: string): Promise<unknown | null> {
    const data = await this.client.get(`player:${playerId}`);
    return data ? JSON.parse(data) : null;
  }

  async incrementRateLimit(playerId: string, action: string): Promise<number> {
    const key = `ratelimit:${playerId}:${action}`;
    const count = await this.client.incr(key);
    await this.client.expire(key, 60);
    return count;
  }

  async checkRateLimit(playerId: string, action: string, limit: number): Promise<boolean> {
    const count = await this.incrementRateLimit(playerId, action);
    return count <= limit;
  }
}
