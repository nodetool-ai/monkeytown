import pg from 'pg';

const { Pool } = pg;

export class DatabaseService {
  private pool: Pool;

  constructor(url: string) {
    this.pool = new Pool({
      connectionString: url,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    this.pool.on('error', (err) => console.error('[Postgres] Pool error:', err));
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

  async getPlayer(playerId: string): Promise<Player | null> {
    const rows = await this.query<Player>(
      'SELECT * FROM players WHERE id = $1',
      [playerId]
    );
    return rows[0] || null;
  }

  async createPlayer(player: Player): Promise<Player> {
    const rows = await this.query<Player>(
      `INSERT INTO players (id, username, avatar, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [player.id, player.name, player.avatar]
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

  async saveGame(game: Game): Promise<Game> {
    const rows = await this.query<Game>(
      `INSERT INTO games (id, config, result, started_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [game.id, JSON.stringify(game.config), JSON.stringify(game.result)]
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

  async getLeaderboard(limit = 10): Promise<LeaderboardEntry[]> {
    const rows = await this.query<LeaderboardEntry>(
      `SELECT p.id, p.username, p.avatar, 
              COALESCE(SUM(g.result->>'score'), 0) as total_score,
              COUNT(g.id) as games_played
       FROM players p
       LEFT JOIN games g ON p.id = (g.result->>'winnerId')::text
       GROUP BY p.id
       ORDER BY total_score DESC
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
    await this.query(`
      CREATE TABLE IF NOT EXISTS players (
        id UUID PRIMARY KEY,
        username VARCHAR(64) UNIQUE NOT NULL,
        avatar TEXT,
        stats JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await this.query(`
      CREATE TABLE IF NOT EXISTS games (
        id UUID PRIMARY KEY,
        config JSONB NOT NULL,
        result JSONB,
        started_at TIMESTAMP,
        ended_at TIMESTAMP
      )
    `);

    await this.query(`
      CREATE TABLE IF NOT EXISTS agent_behaviors (
        id UUID PRIMARY KEY,
        personality JSONB NOT NULL,
        decision_model TEXT NOT NULL,
        version INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log('[Postgres] Schema initialized');
  }
}

interface Player {
  id: string;
  name: string;
  avatar: string;
  stats?: Record<string, unknown>;
}

interface Game {
  id: string;
  config: Record<string, unknown>;
  result?: Record<string, unknown>;
  started_at?: Date;
  ended_at?: Date;
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
  total_score: number;
  games_played: number;
}
