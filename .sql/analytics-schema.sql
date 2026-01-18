-- Monkeytown Analytics Schema
-- v1.0.0 - Initial analytics infrastructure

-- Games table: tracks each game session
CREATE TABLE IF NOT EXISTS games (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    game_type VARCHAR(50) NOT NULL,
    player_count INTEGER DEFAULT 1,
    duration_seconds INTEGER,
    status VARCHAR(20) DEFAULT 'in_progress',
    winner VARCHAR(50),
    metadata JSONB DEFAULT '{}'
);

-- Players table: tracks player sessions
CREATE TABLE IF NOT EXISTS players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_id VARCHAR(100) UNIQUE,
    games_played INTEGER DEFAULT 0,
    total_wins INTEGER DEFAULT 0,
    total_losses INTEGER DEFAULT 0,
    total_score INTEGER DEFAULT 0,
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Moves table: tracks individual game moves
CREATE TABLE IF NOT EXISTS moves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_id UUID REFERENCES games(id),
    player_id UUID REFERENCES players(id),
    move_number INTEGER NOT NULL,
    move_type VARCHAR(50) NOT NULL,
    move_data JSONB NOT NULL,
    move_duration_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent runs table: tracks agent execution
CREATE TABLE IF NOT EXISTS agent_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_name VARCHAR(50) NOT NULL,
    run_date DATE DEFAULT CURRENT_DATE,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    files_created INTEGER DEFAULT 0,
    files_modified INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'running',
    summary TEXT,
    errors TEXT[]
);

-- Agent outputs table: tracks individual files created by agents
CREATE TABLE IF NOT EXISTS agent_outputs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_run_id UUID REFERENCES agent_runs(id),
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    content_hash VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System events table: tracks important system events
CREATE TABLE IF NOT EXISTS system_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_games_created ON games(created_at);
CREATE INDEX IF NOT EXISTS idx_games_status ON games(status);
CREATE INDEX IF NOT EXISTS idx_moves_game ON moves(game_id);
CREATE INDEX IF NOT EXISTS idx_moves_player ON moves(player_id);
CREATE INDEX IF NOT EXISTS idx_agent_runs_agent ON agent_runs(agent_name, run_date);
CREATE INDEX IF NOT EXISTS idx_agent_outputs_path ON agent_outputs(file_path);
CREATE INDEX IF NOT EXISTS idx_system_events_type ON system_events(event_type, created_at);

-- Views for analytics

-- Daily game stats
CREATE OR REPLACE VIEW daily_game_stats AS
SELECT
    DATE(created_at) as date,
    COUNT(*) as total_games,
    COUNT(*) FILTER (WHERE status = 'completed') as completed_games,
    COUNT(*) FILTER (WHERE status = 'in_progress') as active_games,
    AVG(duration_seconds) FILTER (WHERE status = 'completed') as avg_duration_sec,
    COUNT(DISTINCT winner) as unique_winners
FROM games
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Player engagement stats
CREATE OR REPLACE VIEW player_engagement AS
SELECT
    DATE(created_at) as date,
    COUNT(DISTINCT session_id) as unique_players,
    SUM(games_played) as total_games_played,
    AVG(games_played) as avg_games_per_player,
    AVG(total_score) as avg_total_score
FROM players
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Agent productivity
CREATE OR REPLACE VIEW agent_productivity AS
SELECT
    agent_name,
    run_date,
    COUNT(*) as total_runs,
    SUM(files_created) as total_files_created,
    SUM(files_modified) as total_files_modified,
    AVG(EXTRACT(EPOCH FROM (completed_at - started_at))) as avg_duration_sec,
    COUNT(*) FILTER (WHERE status = 'completed') as successful_runs,
    COUNT(*) FILTER (WHERE status = 'failed') as failed_runs
FROM agent_runs
GROUP BY agent_name, run_date
ORDER BY run_date DESC, agent_name;

-- Move analysis
CREATE OR REPLACE VIEW move_analysis AS
SELECT
    game_type,
    move_type,
    COUNT(*) as move_count,
    AVG(move_duration_ms) as avg_move_duration_ms
FROM moves
GROUP BY game_type, move_type
ORDER BY game_type, move_count DESC;

-- Functions

-- Update player stats after game
CREATE OR REPLACE FUNCTION update_player_stats(
    p_session_id VARCHAR,
    p_won BOOLEAN,
    p_score INTEGER
) RETURNS void AS $$
BEGIN
    INSERT INTO players (session_id, games_played, total_wins, total_losses, total_score)
    VALUES (p_session_id, 1, CASE WHEN p_won THEN 1 ELSE 0 END, CASE WHEN NOT p_won THEN 1 ELSE 0 END, p_score)
    ON CONFLICT (session_id) DO UPDATE SET
        games_played = players.games_played + 1,
        total_wins = players.total_wins + CASE WHEN p_won THEN 1 ELSE 0 END,
        total_losses = players.total_losses + CASE WHEN NOT p_won THEN 1 ELSE 0 END,
        total_score = players.total_score + p_score,
        last_seen_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- Record system event
CREATE OR REPLACE FUNCTION record_system_event(
    p_event_type VARCHAR,
    p_event_data JSONB DEFAULT '{}'
) RETURNS void AS $$
BEGIN
    INSERT INTO system_events (event_type, event_data)
    VALUES (p_event_type, p_event_data);
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON TABLE games IS 'Tracks each game session played';
COMMENT ON TABLE players IS 'Tracks anonymous player sessions and stats';
COMMENT ON TABLE moves IS 'Records individual moves in each game';
COMMENT ON TABLE agent_runs IS 'Tracks AI agent execution runs';
COMMENT ON TABLE agent_outputs IS 'Records files created by agents';
COMMENT ON TABLE system_events IS 'General system event log';
COMMENT ON VIEW daily_game_stats IS 'Aggregated daily game statistics';
COMMENT ON VIEW player_engagement IS 'Daily player engagement metrics';
COMMENT ON VIEW agent_productivity IS 'AI agent productivity metrics';
COMMENT ON VIEW move_analysis IS 'Move type analysis by game type';
