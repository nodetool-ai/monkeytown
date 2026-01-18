import { Router, Request, Response } from 'express';

export const healthRouter = Router();

healthRouter.get('/live', (req: Request, res: Response) => {
  res.json({
    status: 'alive',
    timestamp: Date.now(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

healthRouter.get('/ready', async (req: Request, res: Response) => {
  const checks = {
    redis: await checkRedis(),
    database: await checkDatabase(),
    memory: checkMemory(),
  };

  const healthy = Object.values(checks).every(c => c.healthy);

  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'ready' : 'not_ready',
    checks,
    timestamp: Date.now(),
  });
});

async function checkRedis(): Promise<{ healthy: boolean; latency?: number; error?: string }> {
  const start = Date.now();
  try {
    const { RedisService } = await import('../services/redis.js');
    const redis = new RedisService(process.env.REDIS_URL || 'redis://localhost:6379');
    await redis.connect();
    await redis.disconnect();
    return { healthy: true, latency: Date.now() - start };
  } catch (error) {
    return { healthy: false, error: (error as Error).message };
  }
}

async function checkDatabase(): Promise<{ healthy: boolean; latency?: number; error?: string }> {
  const start = Date.now();
  try {
    const { DatabaseService } = await import('../services/database.js');
    const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
    await db.connect();
    await db.disconnect();
    return { healthy: true, latency: Date.now() - start };
  } catch (error) {
    return { healthy: false, error: (error as Error).message };
  }
}

function checkMemory(): { healthy: boolean; usage?: Record<string, number> } {
  const usage = process.memoryUsage();
  const heapUsedMB = usage.heapUsed / 1024 / 1024;
  const heapLimitMB = usage.heapTotal / 1024 / 1024;

  return {
    healthy: heapUsedMB < heapLimitMB * 0.8,
    usage: {
      heapUsed: Math.round(heapUsedMB),
      heapLimit: Math.round(heapLimitMB),
    },
  };
}
