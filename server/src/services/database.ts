import { Pool } from 'pg';

export class DatabaseService {
  private pool: Pool;

  constructor(url: string) {
    this.pool = new Pool({
      connectionString: url,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on('error', (err: Error) => console.error('[Postgres] Pool error:', err));
  }

  async connect(): Promise<void> {
    const client = await this.pool.connect();
    client.release();
    console.log('[Postgres] Connected');
  }

  async disconnect(): Promise<void> {
    await this.pool.end();
  }

  async query<T>(text: string, params?: unknown[]): Promise<T[]> {
    const result = await this.pool.query(text, params);
    return result.rows as T[];
  }

  // Player operations
  async getPlayer(playerId: string): Promise<Player | null> {
    const rows = await this.query<Player>(
      'SELECT * FROM players WHERE id = $1',
      [playerId]
    );
    return rows[0] || null;
  }

  async getPlayerByUsername(username: string): Promise<Player | null> {
    const rows = await this.query<Player>(
      'SELECT * FROM players WHERE username = $1',
      [username]
    );
    return rows[0] || null;
  }

  async createPlayer(player: CreatePlayerInput): Promise<Player> {
    const rows = await this.query<Player>(
      `INSERT INTO players (id, username, avatar, player_type, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [player.id, player.name, player.avatar, player.type || 'human']
    );
    return rows[0];
  }

  async updatePlayer(playerId: string, updates: Partial<Player>): Promise<Player | null> {
    const setClause = Object.keys(updates)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ');
    
    const values = [playerId, ...Object.values(updates)];
    const rows = await this.query<Player>(
      `UPDATE players SET ${setClause} WHERE id = $1 RETURNING *`,
      values
    );
    return rows[0] || null;
  }

  async listPlayers(limit = 50, offset = 0): Promise<Player[]> {
    return this.query<Player>(
      'SELECT * FROM players ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
  }

  // Agent operations
  async getAgent(agentId: string): Promise<Agent | null> {
    const rows = await this.query<Agent>(
      'SELECT * FROM agents WHERE id = $1',
      [agentId]
    );
    return rows[0] || null;
  }

  async createAgent(agent: CreateAgentInput): Promise<Agent> {
    const rows = await this.query<Agent>(
      `INSERT INTO agents (id, name, agent_type, personality, play_style, difficulty, stats, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       RETURNING *`,
      [
        agent.id,
        agent.name,
        agent.agentType,
        JSON.stringify(agent.personality || {}),
        agent.playStyle || 'balanced',
        agent.difficulty || 'medium',
        JSON.stringify(agent.stats || { wins: 0, losses: 0, draws: 0 }),
      ]
    );
    return rows[0];
  }

  async updateAgent(agentId: string, updates: Partial<Agent>): Promise<Agent | null> {
    const setClause = Object.keys(updates)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ');
    
    const values = [agentId, ...Object.values(updates)];
    const rows = await this.query<Agent>(
      `UPDATE agents SET ${setClause} WHERE id = $1 RETURNING *`,
      values
    );
    return rows[0] || null;
  }

  async listAgents(limit = 50, offset = 0): Promise<Agent[]> {
    return this.query<Agent>(
      'SELECT * FROM agents ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
  }

  // Game operations
  async saveGame(game: Game): Promise<Game> {
    const rows = await this.query<Game>(
      `INSERT INTO games (id, game_type, config, result, started_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [game.id, game.gameType, JSON.stringify(game.config), JSON.stringify(game.result)]
    );
    return rows[0];
  }

  async getGame(gameId: string): Promise<Game | null> {
    const rows = await this.query<Game>(
      'SELECT * FROM games WHERE id = $1',
      [gameId]
    );
    return rows[0] || null;
  }

  async updateGame(gameId: string, updates: Partial<Game>): Promise<Game | null> {
    const setClause = Object.keys(updates)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ');
    
    const values = [gameId, ...Object.values(updates)];
    const rows = await this.query<Game>(
      `UPDATE games SET ${setClause} WHERE id = $1 RETURNING *`,
      values
    );
    return rows[0] || null;
  }

  // Game event operations (Priority 4)
  async saveGameEvent(gameId: string, event: GameEvent): Promise<GameEvent> {
    const rows = await this.query<GameEvent>(
      `INSERT INTO game_events (id, game_id, event_type, player_id, data, created_at)
       VALUES ($1, $2, $3, $4, $5, to_timestamp($6 / 1000.0))
       RETURNING *`,
      [event.id, gameId, event.type, event.playerId, JSON.stringify(event.data), event.timestamp]
    );
    return rows[0];
  }

  async getGameEvents(gameId: string): Promise<GameEvent[]> {
    return this.query<GameEvent>(
      'SELECT * FROM game_events WHERE game_id = $1 ORDER BY created_at ASC',
      [gameId]
    );
  }

  // Chat message operations (Priority 2)
  async saveChatMessage(message: ChatMessage): Promise<ChatMessage> {
    const rows = await this.query<ChatMessage>(
      `INSERT INTO chat_messages (id, game_id, sender_id, sender_name, sender_type, content, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, to_timestamp($7 / 1000.0))
       RETURNING *`,
      [
        message.id,
        message.gameId,
        message.senderId,
        message.senderName,
        message.senderType,
        message.content,
        message.timestamp,
      ]
    );
    return rows[0];
  }

  async getChatMessages(gameId: string, limit = 100): Promise<ChatMessage[]> {
    return this.query<ChatMessage>(
      'SELECT * FROM chat_messages WHERE game_id = $1 ORDER BY created_at DESC LIMIT $2',
      [gameId, limit]
    );
  }

  async getLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
    const rows = await this.query<LeaderboardEntry>(
      `SELECT p.id, p.username, p.avatar, 
              COALESCE(SUM(CASE WHEN g.result->>'winnerId' = p.id::text THEN 1 ELSE 0 END), 0) as wins,
              COUNT(DISTINCT g.id) as games_played
       FROM players p
       LEFT JOIN games g ON p.id::text = ANY(
         SELECT jsonb_array_elements_text(g.config->'playerIds')
       )
       GROUP BY p.id
       ORDER BY wins DESC, games_played DESC
       LIMIT $1`,
      [limit]
    );
    return rows;
  }

  async saveAgentBehavior(behavior: AgentBehavior): Promise<void> {
    await this.query(
      `INSERT INTO agent_behaviors (id, personality, decision_model, version, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       ON CONFLICT (id) DO UPDATE SET
         personality = EXCLUDED.personality,
         decision_model = EXCLUDED.decision_model,
         version = EXCLUDED.version`,
      [behavior.id, JSON.stringify(behavior.personality), behavior.decisionModel, behavior.version]
    );
  }

  async initializeSchema(): Promise<void> {
    // Players table
    await this.query(`
      CREATE TABLE IF NOT EXISTS players (
        id UUID PRIMARY KEY,
        username VARCHAR(64) UNIQUE NOT NULL,
        avatar TEXT,
        player_type VARCHAR(16) DEFAULT 'human',
        stats JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Agents table (Priority 3)
    await this.query(`
      CREATE TABLE IF NOT EXISTS agents (
        id UUID PRIMARY KEY,
        name VARCHAR(64) NOT NULL,
        agent_type VARCHAR(32) NOT NULL,
        personality JSONB DEFAULT '{}',
        play_style VARCHAR(32) DEFAULT 'balanced',
        difficulty VARCHAR(16) DEFAULT 'medium',
        stats JSONB DEFAULT '{"wins": 0, "losses": 0, "draws": 0}',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Games table
    await this.query(`
      CREATE TABLE IF NOT EXISTS games (
        id UUID PRIMARY KEY,
        game_type VARCHAR(32) DEFAULT 'tictactoe',
        config JSONB NOT NULL,
        result JSONB,
        started_at TIMESTAMP,
        ended_at TIMESTAMP
      )
    `);

    // Game events table (Priority 4)
    await this.query(`
      CREATE TABLE IF NOT EXISTS game_events (
        id UUID PRIMARY KEY,
        game_id UUID REFERENCES games(id),
        event_type VARCHAR(32) NOT NULL,
        player_id UUID,
        data JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Chat messages table (Priority 2)
    await this.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id UUID PRIMARY KEY,
        game_id UUID,
        sender_id UUID,
        sender_name VARCHAR(64),
        sender_type VARCHAR(16),
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Agent behaviors table
    await this.query(`
      CREATE TABLE IF NOT EXISTS agent_behaviors (
        id UUID PRIMARY KEY,
        personality JSONB NOT NULL,
        decision_model TEXT NOT NULL,
        version INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Create indexes
    await this.query(`
      CREATE INDEX IF NOT EXISTS idx_game_events_game_id ON game_events(game_id);
      CREATE INDEX IF NOT EXISTS idx_chat_messages_game_id ON chat_messages(game_id);
      CREATE INDEX IF NOT EXISTS idx_agents_type ON agents(agent_type);
    `);

    console.log('[Postgres] Schema initialized');
  }
}

// Types
interface Player {
  id: string;
  username?: string;
  name: string;
  avatar: string;
  player_type?: string;
  type?: 'human' | 'agent';
  stats?: Record<string, unknown>;
}

interface CreatePlayerInput {
  id: string;
  name: string;
  avatar?: string;
  type?: 'human' | 'agent';
}

interface Agent {
  id: string;
  name: string;
  agent_type?: string;
  agentType?: string;
  personality: Record<string, unknown>;
  play_style?: string;
  playStyle?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  stats: { wins: number; losses: number; draws: number };
  created_at?: Date;
}

interface CreateAgentInput {
  id: string;
  name: string;
  agentType: string;
  personality?: Record<string, unknown>;
  playStyle?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  stats?: { wins: number; losses: number; draws: number };
}

interface Game {
  id: string;
  gameType: string;
  config: Record<string, unknown>;
  result?: Record<string, unknown>;
  started_at?: Date;
  ended_at?: Date;
}

interface GameEvent {
  id: string;
  type: string;
  playerId?: string;
  timestamp: number;
  data: Record<string, unknown>;
}

interface ChatMessage {
  id: string;
  gameId: string;
  senderId: string;
  senderName: string;
  senderType: 'human' | 'agent';
  content: string;
  timestamp: number;
}

interface AgentBehavior {
  id: string;
  personality: Record<string, unknown>;
  decisionModel: string;
  version: number;
}

interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  wins: number;
  games_played: number;
}
