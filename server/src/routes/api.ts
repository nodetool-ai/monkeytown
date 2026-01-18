import { Router, Request, Response } from 'express';
import { GameServer } from '../game/server.js';
import { v4 as uuid } from 'uuid';

export function apiRouter(gameServer: GameServer): Router {
  const router = Router();

  // Create a new game - now defaults to TicTacToe
  router.post('/games/create', async (req: Request, res: Response) => {
    try {
      const { gameType = 'tictactoe', maxPlayers = 2, aiDifficulty = 'medium' } = req.body;
      
      const session = await gameServer.createSession(
        {
          maxPlayers: gameType === 'tictactoe' ? 2 : maxPlayers,
          aiDifficulty,
          ...(gameType !== 'tictactoe' && {
            rounds: gameType === 'babel' ? 12 : gameType === 'chess' ? 1 : 6,
            turnDurationSeconds: gameType === 'babel' ? 60 : gameType === 'chess' ? 120 : 90,
          }),
        },
        gameType
      );
      res.json({ gameId: session.id, gameType });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create game', details: (error as Error).message });
    }
  });

  // Get game state
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

  // Join a game
  router.post('/games/:gameId/join', async (req: Request, res: Response) => {
    try {
      const { player } = req.body;
      const session = await gameServer.joinSession(req.params.gameId, {
        id: player?.id || uuid(),
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

      res.json({ success: true, gameId: session.id, players: session.players });
    } catch (error) {
      res.status(500).json({ error: 'Failed to join game', details: (error as Error).message });
    }
  });

  // Add AI opponent to a game
  router.post('/games/:gameId/add-ai', async (req: Request, res: Response) => {
    try {
      const { difficulty = 'medium', name = 'AI Opponent' } = req.body;
      
      const session = await gameServer.joinSession(req.params.gameId, {
        id: uuid(),
        name,
        type: 'agent',
        agentType: 'strategist', // Default AI personality
        score: 0,
        isConnected: true,
      });

      if (!session) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }

      res.json({ success: true, gameId: session.id, players: session.players });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add AI', details: (error as Error).message });
    }
  });

  // Start a game
  router.post('/games/:gameId/start', async (req: Request, res: Response) => {
    try {
      await gameServer.startSession(req.params.gameId);
      const session = await gameServer.getSession(req.params.gameId);
      res.json({ success: true, game: session });
    } catch (error) {
      res.status(500).json({ error: 'Failed to start game', details: (error as Error).message });
    }
  });

  // Make a move in TicTacToe
  router.post('/games/:gameId/move', async (req: Request, res: Response) => {
    try {
      const { playerId, row, col } = req.body;
      
      if (typeof row !== 'number' || typeof col !== 'number') {
        res.status(400).json({ error: 'Invalid move: row and col must be numbers' });
        return;
      }

      const session = await gameServer.getSession(req.params.gameId);
      if (!session) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }

      if (session.config.gameType === 'tictactoe') {
        const event = await gameServer.processTicTacToeAction(req.params.gameId, playerId, {
          type: 'place',
          row,
          col,
        });

        if (event) {
          const updatedSession = await gameServer.getSession(req.params.gameId);
          res.json({ success: true, event, game: updatedSession });
        } else {
          res.status(400).json({ error: 'Invalid move' });
        }
      } else {
        res.status(400).json({ error: 'This endpoint is for TicTacToe games only' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to process move', details: (error as Error).message });
    }
  });

  // End a game
  router.post('/games/:gameId/end', async (req: Request, res: Response) => {
    try {
      await gameServer.endSession(req.params.gameId);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to end game', details: (error as Error).message });
    }
  });

  // Player routes
  router.get('/players/:playerId', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const player = await db.getPlayer(req.params.playerId);
      if (!player) {
        res.status(404).json({ error: 'Player not found' });
        return;
      }
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get player', details: (error as Error).message });
    }
  });

  router.post('/players', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const { name, avatar, type = 'human' } = req.body;
      
      const player = await db.createPlayer({
        id: uuid(),
        name,
        avatar,
        type,
      });
      res.json(player);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create player', details: (error as Error).message });
    }
  });

  router.get('/players', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const players = await db.listPlayers(limit, offset);
      res.json(players);
    } catch (error) {
      res.status(500).json({ error: 'Failed to list players', details: (error as Error).message });
    }
  });

  // Agent routes (Priority 3)
  router.get('/agents', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = parseInt(req.query.offset as string) || 0;
      const agents = await db.listAgents(limit, offset);
      res.json(agents);
    } catch (error) {
      res.status(500).json({ error: 'Failed to list agents', details: (error as Error).message });
    }
  });

  router.get('/agents/:agentId', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const agent = await db.getAgent(req.params.agentId);
      if (!agent) {
        res.status(404).json({ error: 'Agent not found' });
        return;
      }
      res.json(agent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get agent', details: (error as Error).message });
    }
  });

  router.post('/agents', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const { name, agentType, personality, playStyle, difficulty } = req.body;
      
      const agent = await db.createAgent({
        id: uuid(),
        name,
        agentType: agentType || 'strategist',
        personality,
        playStyle,
        difficulty,
      });
      res.json(agent);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create agent', details: (error as Error).message });
    }
  });

  // Chat routes (Priority 2)
  router.get('/games/:gameId/chat', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const limit = parseInt(req.query.limit as string) || 100;
      const messages = await db.getChatMessages(req.params.gameId, limit);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get chat messages', details: (error as Error).message });
    }
  });

  router.post('/games/:gameId/chat', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const { senderId, senderName, senderType = 'human', content } = req.body;
      
      const message = await db.saveChatMessage({
        id: uuid(),
        gameId: req.params.gameId,
        senderId,
        senderName,
        senderType,
        content,
        timestamp: Date.now(),
      });
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save chat message', details: (error as Error).message });
    }
  });

  // Game events (Priority 4)
  router.get('/games/:gameId/events', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const events = await db.getGameEvents(req.params.gameId);
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get game events', details: (error as Error).message });
    }
  });

  // Leaderboard
  router.get('/leaderboard', async (req: Request, res: Response) => {
    try {
      const { DatabaseService } = await import('../services/database.js');
      const db = new DatabaseService(process.env.DATABASE_URL || 'postgres://localhost:5432/monkeytown');
      const limit = parseInt(req.query.limit as string) || 10;
      const leaderboard = await db.getLeaderboard(limit);
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: 'Failed to get leaderboard', details: (error as Error).message });
    }
  });

  return router;
}
