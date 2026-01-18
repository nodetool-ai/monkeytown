import { Router, Request, Response } from 'express';
import { GameServer } from '../game/server.js';

export function apiRouter(gameServer: GameServer): Router {
  const router = Router();

  router.post('/games/create', async (req: Request, res: Response) => {
    try {
      const { gameType, maxPlayers, aiDifficulty } = req.body;
      const session = await gameServer.createSession(
        {
          maxPlayers: maxPlayers || 4,
          rounds: gameType === 'babel' ? 12 : gameType === 'chess' ? 1 : 6,
          turnDurationSeconds: gameType === 'babel' ? 60 : gameType === 'chess' ? 120 : 90,
          aiDifficulty: aiDifficulty || 'medium',
        },
        gameType || 'babel'
      );
      res.json({ gameId: session.id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create game', details: (error as Error).message });
    }
  });

  router.get('/games/:gameId', async (req: Request, res: Response) => {
    try {
      const session = await gameServer.getSession(req.params.gameId);
      if (!session) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get game', details: (error as Error).message });
    }
  });

  router.post('/games/:gameId/join', async (req: Request, res: Response) => {
    try {
      const { player } = req.body;
      const session = await gameServer.joinSession(req.params.gameId, {
        id: player?.id || crypto.randomUUID(),
        name: player?.name || 'Anonymous',
        type: player?.type || 'human',
        agentType: player?.agentType,
        score: 0,
        isConnected: true,
      });

      if (!session) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }

      res.json({ success: true, gameId: session.id });
    } catch (error) {
      res.status(500).json({ error: 'Failed to join game', details: (error as Error).message });
    }
  });

  router.post('/games/:gameId/start', async (req: Request, res: Response) => {
    try {
      await gameServer.startSession(req.params.gameId);
      const session = await gameServer.getSession(req.params.gameId);
      res.json({ success: true, game: session });
    } catch (error) {
      res.status(500).json({ error: 'Failed to start game', details: (error as Error).message });
    }
  });

  router.post('/games/:gameId/end', async (req: Request, res: Response) => {
    try {
      await gameServer.endSession(req.params.gameId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to end game', details: (error as Error).message });
    }
  });

  router.get('/players/:playerId', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const player = await db.getPlayer(req.params.playerId);
      res.json(player || { error: 'Player not found' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get player', details: (error as Error).message });
    }
  });

  router.get('/leaderboard', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const leaderboard = await db.getLeaderboard(10);
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get leaderboard', details: (error as Error).message });
    }
  });

  return router;
}
