import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

import { GameServer } from './game/server.js';
import { EventStream } from './websocket/server.js';
import { RedisService } from './services/redis.js';
import { DatabaseService } from './services/database.js';
import { healthRouter } from './routes/health.js';
import { apiRouter } from './routes/api.js';

dotenv.config();

const app = express();
const server = createServer(app);

const PORT = process.env.PORT || 3001;
const ENV = process.env.NODE_ENV || 'development';

async function main() {
  console.log(`[Server] Starting Monkeytown Game Server (${ENV})`);

  const redis = new RedisService(process.env.REDIS_URL || 'redis://localhost:6379');
  await redis.connect();

  const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
  await db.connect();

  const gameServer = new GameServer(redis, db);
  const eventStream = new EventStream(server, redis, gameServer);

  app.use(helmet());
  app.use(compression());
  app.use(cors({
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
    credentials: true,
  }));

  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: { error: 'Too many requests' },
  });
  app.use('/api/', limiter);

  app.use(express.json());

  app.use('/health', healthRouter);
  app.use('/api', apiRouter(gameServer));

  server.listen(PORT, () => {
    console.log(`[Server] Listening on port ${PORT}`);
    console.log(`[Server] WebSocket endpoint: ws://localhost:${PORT}`);
  });

  process.on('SIGTERM', async () => {
    console.log('[Server] Shutting down...');
    await redis.disconnect();
    await db.disconnect();
    server.close();
    process.exit(0);
  });

  process.on('SIGINT', async () => {
    console.log('[Server] Interrupted...');
    await redis.disconnect();
    await db.disconnect();
    server.close();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error('[Server] Fatal error:', error);
  process.exit(1);
});
