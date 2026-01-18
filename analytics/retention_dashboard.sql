-- Monkeytown Player Metrics SQL
-- Version: 1.0
-- Purpose: Track KPIs and player behavior

-- Create metrics schema
CREATE SCHEMA IF NOT EXISTS metrics;

-- Players table (base table)
CREATE TABLE IF NOT EXISTS metrics.players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(64) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_sessions INTEGER DEFAULT 0,
    total_play_time_minutes INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Sessions table
CREATE TABLE IF NOT EXISTS metrics.sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES metrics.players(id),
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    game_mode VARCHAR(32),
    did_submit_feedback BOOLEAN DEFAULT FALSE,
    feedback_category VARCHAR(32),
    agent_played_with UUID,
    outcome VARCHAR(16),
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Game results table
CREATE TABLE IF NOT EXISTS metrics.game_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES metrics.sessions(id),
    game_type VARCHAR(32) NOT NULL,
    player_count INTEGER,
    human_wins INTEGER,
    ai_wins INTEGER,
    duration_seconds INTEGER,
    final_score INTEGER,
    agent_behaviors JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feature adoption tracking
CREATE TABLE IF NOT EXISTS metrics.feature_adoption (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    feature_name VARCHAR(128) NOT NULL,
    player_id UUID REFERENCES metrics.players(id),
    first_used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    usage_count INTEGER DEFAULT 1,
    metadata JSONB DEFAULT '{}'::jsonb
);

-- Agent attribution recognition surveys
CREATE TABLE IF NOT EXISTS metrics.surveys (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    player_id UUID REFERENCES metrics.players(id),
    survey_type VARCHAR(32) NOT NULL,
    response JSONB NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_sessions_player ON metrics.sessions(player_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started ON metrics.sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_sessions_game_mode ON metrics.sessions(game_mode);
CREATE INDEX IF NOT EXISTS idx_game_results_session ON metrics.game_results(session_id);
CREATE INDEX IF NOT EXISTS idx_game_results_type ON metrics.game_results(game_type);
CREATE INDEX IF NOT EXISTS idx_feature_adoption_player ON metrics.feature_adoption(player_id);
CREATE INDEX IF NOT EXISTS idx_feature_adoption_name ON metrics.feature_adoption(feature_name);
CREATE INDEX IF NOT EXISTS idx_surveys_player ON metrics.surveys(player_id);
CREATE INDEX IF NOT EXISTS idx_surveys_type ON metrics.surveys(survey_type);

-- Function: Update session duration on end
CREATE OR REPLACE FUNCTION metrics.finish_session()
RETURNS TRIGGER AS $$
BEGIN
    NEW.ended_at = NOW();
    NEW.duration_seconds = EXTRACT(EPOCH FROM (NOW() - NEW.started_at))::INTEGER;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger: Auto-calculate duration
CREATE TRIGGER trigger_session_end
    BEFORE UPDATE ON metrics.sessions
    FOR EACH ROW
    WHEN (NEW.ended_at IS NOT NULL AND OLD.ended_at IS NULL)
    EXECUTE FUNCTION metrics.finish_session();

-- Function: Calculate day 1 retention
CREATE OR REPLACE FUNCTION metrics.day1_retention(target_date DATE)
RETURNS FLOAT AS $$
DECLARE
    new_players INTEGER;
    returning_players INTEGER;
BEGIN
    -- Count new players from target date
    SELECT COUNT(*) INTO new_players
    FROM metrics.players
    WHERE created_at::DATE = target_date;

    -- Count returning players (seen within 24h)
    SELECT COUNT(DISTINCT s.player_id) INTO returning_players
    FROM metrics.sessions s
    INNER JOIN metrics.players p ON s.player_id = p.id
    WHERE p.created_at::DATE = target_date
    AND s.started_at > p.created_at + INTERVAL '1 hour'
    AND s.started_at < p.created_at + INTERVAL '24 hours';

    IF new_players = 0 THEN RETURN 0; END IF;
    RETURN returning_players::FLOAT / new_players::FLOAT;
END;
$$ LANGUAGE plpgsql;

-- Function: Calculate day 7 retention
CREATE OR REPLACE FUNCTION metrics.day7_retention(target_date DATE)
RETURNS FLOAT AS $$
DECLARE
    new_players INTEGER;
    returning_players INTEGER;
BEGIN
    SELECT COUNT(*) INTO new_players
    FROM metrics.players
    WHERE created_at::DATE = target_date;

    SELECT COUNT(DISTINCT s.player_id) INTO returning_players
    FROM metrics.sessions s
    INNER JOIN metrics.players p ON s.player_id = p.id
    WHERE p.created_at::DATE = target_date
    AND s.started_at > p.created_at + INTERVAL '1 day'
    AND s.started_at < p.created_at + INTERVAL '8 days';

    IF new_players = 0 THEN RETURN 0; END IF;
    RETURN returning_players::FLOAT / new_players::FLOAT;
END;
$$ LANGUAGE plpgsql;

-- Function: Average session length
CREATE OR REPLACE FUNCTION metrics.avg_session_length(days INTEGER DEFAULT 7)
RETURNS FLOAT AS $$
BEGIN
    RETURN (
        SELECT AVG(duration_seconds)::FLOAT / 60
        FROM metrics.sessions
        WHERE started_at > NOW() - (days || ' days')::INTERVAL
        AND duration_seconds IS NOT NULL
    );
END;
$$ LANGUAGE plpgsql;

-- Function: Player win rate vs AI
CREATE OR REPLACE FUNCTION metrics.player_win_rate(game_mode VARCHAR DEFAULT NULL)
RETURNS FLOAT AS $$
DECLARE
    human_wins INTEGER;
    total_games INTEGER;
BEGIN
    IF game_mode IS NULL THEN
        SELECT COUNT(*), COUNT(*) FILTER (WHERE human_wins > 0)
        INTO total_games, human_wins
        FROM metrics.game_results;
    ELSE
        SELECT COUNT(*), COUNT(*) FILTER (WHERE human_wins > 0)
        INTO total_games, human_wins
        FROM metrics.game_results
        WHERE game_type = game_mode;
    END IF;

    IF total_games = 0 THEN RETURN 0; END IF;
    RETURN human_wins::FLOAT / total_games::FLOAT;
END;
$$ LANGUAGE plpgsql;

-- Function: Agent attribution recognition rate
CREATE OR REPLACE FUNCTION metrics.agent_attribution_rate()
RETURNS FLOAT AS $$
DECLARE
    aware_players INTEGER;
    total_players INTEGER;
BEGIN
    SELECT COUNT(*), COUNT(*) FILTER (
        WHEN (response->>'awareness') IN ('clearly_aware', 'completely_obvious')
    ) INTO total_players, aware_players
    FROM metrics.surveys
    WHERE survey_type = 'agent_attribution'
    AND submitted_at > NOW() - INTERVAL '30 days';

    IF total_players = 0 THEN RETURN 0; END IF;
    RETURN aware_players::FLOAT / total_players::FLOAT;
END;
$$ LANGUAGE plpgsql;

-- Function: Feedback submission rate
CREATE OR REPLACE FUNCTION metrics.feedback_submission_rate(days INTEGER DEFAULT 7)
RETURNS FLOAT AS $$
DECLARE
    total_sessions INTEGER;
    feedback_sessions INTEGER;
BEGIN
    SELECT COUNT(*), COUNT(*) FILTER (WHERE did_submit_feedback)
    INTO total_sessions, feedback_sessions
    FROM metrics.sessions
    WHERE started_at > NOW() - (days || ' days')::INTERVAL;

    IF total_sessions = 0 THEN RETURN 0; END IF;
    RETURN feedback_sessions::FLOAT / total_sessions::FLOAT;
END;
$$ LANGUAGE plpgsql;

-- Function: Feature adoption rate
CREATE OR REPLACE FUNCTION metrics.feature_adoption_rate(feature_name VARCHAR)
RETURNS FLOAT AS $$
DECLARE
    feature_users INTEGER;
    total_players INTEGER;
BEGIN
    SELECT COUNT(DISTINCT player_id), (SELECT COUNT(*) FROM metrics.players)
    INTO feature_users, total_players
    FROM metrics.feature_adoption
    WHERE feature_name = feature_name
    AND first_used_at > NOW() - INTERVAL '30 days';

    IF total_players = 0 THEN RETURN 0; END IF;
    RETURN feature_users::FLOAT / total_players::FLOAT;
END;
$$ LANGUAGE plpgsql;

-- Function: Time to first move (requires client instrumentation)
CREATE OR REPLACE FUNCTION metrics.time_to_first_move_p50()
RETURNS FLOAT AS $$
BEGIN
    -- This requires client to send first_move_latency_ms
    RETURN (
        SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY (metadata->>'first_move_ms')::INTEGER)
        FROM metrics.sessions
        WHERE metadata->>'first_move_ms' IS NOT NULL
        AND started_at > NOW() - INTERVAL '7 days'
    );
END;
$$ LANGUAGE plpgsql;

-- Function: Return to specific agent
CREATE OR REPLACE FUNCTION metrics.return_to_agent_rate(agent_id UUID)
RETURNS FLOAT AS $$
DECLARE
    return_players INTEGER;
    total_players INTEGER;
BEGIN
    SELECT COUNT(DISTINCT player_id),
           COUNT(DISTINCT player_id) FILTER (WHERE sessions_count > 1)
    INTO total_players, return_players
    FROM (
        SELECT player_id, COUNT(*) as sessions_count
        FROM metrics.sessions
        WHERE agent_played_with = agent_id
        AND started_at > NOW() - INTERVAL '30 days'
        GROUP BY player_id
    ) sub;

    IF total_players = 0 THEN RETURN 0; END IF;
    RETURN return_players::FLOAT / total_players::FLOAT;
END;
$$ LANGUAGE plpgsql;

-- View: Daily metrics summary
CREATE OR REPLACE VIEW metrics.daily_summary AS
SELECT
    DATE(started_at) as date,
    COUNT(*) as total_sessions,
    COUNT(DISTINCT player_id) as unique_players,
    AVG(duration_seconds)::INTEGER as avg_session_seconds,
    COUNT(*) FILTER (WHERE did_submit_feedback) as feedback_submissions,
    COUNT(*) FILTER (WHERE outcome = 'win') as player_wins,
    COUNT(*) FILTER (WHERE outcome = 'loss') as player_losses
FROM metrics.sessions
GROUP BY DATE(started_at)
ORDER BY date DESC;

-- View: Player engagement tiers
CREATE OR REPLACE VIEW metrics.player_tiers AS
SELECT
    id,
    username,
    total_sessions,
    total_play_time_minutes,
    level,
    CASE
        WHEN total_sessions >= 21 THEN 'Power User'
        WHEN total_sessions >= 7 THEN 'Engaged'
        WHEN total_sessions >= 3 THEN 'Casual'
        ELSE 'New'
    END as engagement_tier
FROM metrics.players
ORDER BY total_sessions DESC;

-- View: Game mode performance
CREATE OR REPLACE VIEW metrics.game_mode_performance AS
SELECT
    game_type,
    COUNT(*) as total_games,
    AVG(duration_seconds)::INTEGER as avg_duration_seconds,
    COUNT(*) FILTER (WHERE human_wins > 0)::FLOAT / COUNT(*)::FLOAT as human_win_rate,
    COUNT(DISTINCT session_id) as unique_sessions
FROM metrics.game_results
GROUP BY game_type
ORDER BY total_games DESC;

-- Function: Player joy score calculation
CREATE OR REPLACE FUNCTION metrics.player_joy_score()
RETURNS FLOAT AS $$
DECLARE
    d1_retention FLOAT;
    d7_retention FLOAT;
    avg_session FLOAT;
    feedback_rate FLOAT;
BEGIN
    d1_retention := metrics.day1_retention(CURRENT_DATE - 1);
    d7_retention := metrics.day7_retention(CURRENT_DATE - 7);
    avg_session := metrics.avg_session_length(7);
    feedback_rate := metrics.feedback_submission_rate(7);

    RETURN (
        COALESCE(d1_retention, 0) / 0.30 * 0.4 +
        COALESCE(d7_retention, 0) / 0.30 * 0.3 +
        COALESCE(avg_session, 0) / 15 * 0.3 +
        COALESCE(feedback_rate, 0) / 0.05 * 0.0  -- Feedback not in v1
    );
END;
$$ LANGUAGE plpgsql;

-- Grant access (adjust as needed)
GRANT SELECT ON ALL TABLES IN SCHEMA metrics TO metrics_reader;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA metrics TO metrics_reader;
