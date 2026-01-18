-- Monkeytown Data Transformations
-- v1.0.0 - ETL and aggregation queries

-- =====================================================
-- PLAYER JOURNEY TRANSFORMATION
-- =====================================================

-- Player progression funnel
WITH player_games AS (
    SELECT
        session_id,
        MIN(created_at) as first_game,
        MAX(created_at) as last_game,
        COUNT(*) as game_count,
        SUM(CASE WHEN winner = session_id THEN 1 ELSE 0 END) as wins
    FROM games
    WHERE status = 'completed'
    GROUP BY session_id
)
SELECT
    CASE
        WHEN game_count = 1 THEN 'One-time Player'
        WHEN game_count BETWEEN 2 AND 5 THEN 'Casual Player'
        WHEN game_count BETWEEN 6 AND 20 THEN 'Regular Player'
        ELSE 'Dedicated Player'
    END as player_type,
    COUNT(*) as player_count,
    ROUND(AVG(wins)::numeric, 2) as avg_wins,
    ROUND(AVG(EXTRACT(EPOCH FROM (last_game - first_game))) / 3600, 2) as avg_retention_hours
FROM player_games
GROUP BY
    CASE
        WHEN game_count = 1 THEN 'One-time Player'
        WHEN game_count BETWEEN 2 AND 5 THEN 'Casual Player'
        WHEN game_count BETWEEN 6 AND 20 THEN 'Regular Player'
        ELSE 'Dedicated Player'
    END;

-- =====================================================
-- GAME BALANCE METRICS
-- =====================================================

-- Win rate by player segment
SELECT
    CASE
        WHEN p.total_games_played <= 1 THEN 'Newbie'
        WHEN p.total_games_played <= 10 THEN 'Learning'
        WHEN p.total_games_played <= 50 THEN 'Experienced'
        ELSE 'Veteran'
    END as experience_level,
    ROUND(COUNT(*) FILTER (WHERE g.winner = p.session_id) * 100.0 / COUNT(*), 2) as win_rate,
    COUNT(*) as total_games,
    ROUND(AVG(g.duration_seconds)::numeric, 0) as avg_game_duration
FROM games g
JOIN players p ON p.session_id = g.winner OR p.session_id IN (
    SELECT unnest(ARRAY[g.winner, g.metadata->>'player2'])
)
WHERE g.status = 'completed'
GROUP BY
    CASE
        WHEN p.total_games_played <= 1 THEN 'Newbie'
        WHEN p.total_games_played <= 10 THEN 'Learning'
        WHEN p.total_games_played <= 50 THEN 'Experienced'
        ELSE 'Veteran'
    END,
    p.session_id;

-- =====================================================
-- AGENT EFFICIENCY ANALYSIS
-- =====================================================

-- Agent output velocity
WITH daily_output AS (
    SELECT
        agent_name,
        DATE(started_at) as date,
        SUM(files_created) as files_created,
        SUM(files_modified) as files_modified,
        COUNT(*) as runs
    FROM agent_runs
    WHERE status = 'completed'
    GROUP BY agent_name, DATE(started_at)
)
SELECT
    agent_name,
    ROUND(AVG(files_created + files_modified)::numeric, 2) as avg_outputs_per_run,
    ROUND(AVG(EXTRACT(EPOCH FROM (completed_at - started_at)))::numeric, 0) as avg_duration_sec,
    SUM(files_created + files_modified) as total_outputs,
    SUM(runs) as total_runs
FROM agent_runs
GROUP BY agent_name
ORDER BY total_outputs DESC;

-- =====================================================
-- SYSTEM HEALTH QUERIES
-- =====================================================

-- Failed agent runs in last 7 days
SELECT
    agent_name,
    COUNT(*) as failure_count,
    STRING_AGG(errors[1], '; ') as sample_errors
FROM agent_runs
WHERE status = 'failed'
AND started_at > NOW() - INTERVAL '7 days'
GROUP BY agent_name
ORDER BY failure_count DESC;

-- Recent system events
SELECT
    event_type,
    COUNT(*) as event_count,
    MAX(created_at) as last_occurrence
FROM system_events
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY event_type
ORDER BY event_count DESC;

-- =====================================================
-- REVENUE/PROXY METRICS
-- =====================================================

-- Engagement score by day (composite metric)
SELECT
    DATE(created_at) as date,
    COUNT(DISTINCT session_id) as daily_players,
    COUNT(*) as daily_games,
    ROUND(AVG(duration_seconds)::numeric, 0) as avg_duration,
    ROUND(COUNT(DISTINCT session_id)::numeric / NULLIF(MAX(active_players), 0), 2) as retention_proxy
FROM (
    SELECT
        g.*,
        COUNT(DISTINCT CASE WHEN status = 'in_progress' THEN session_id END) OVER (ORDER BY DATE(g.created_at)) as active_players
    FROM games g
) subquery
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- =====================================================
-- MOVE PATTERN ANALYSIS
-- =====================================================

-- Most effective moves (moves preceding wins)
WITH winning_moves AS (
    SELECT
        m.game_id,
        m.move_type,
        m.move_number,
        g.winner,
        ROW_NUMBER() OVER (PARTITION BY m.game_id ORDER BY m.move_number DESC) as reverse_order
    FROM moves m
    JOIN games g ON g.id = m.game_id
    WHERE g.status = 'completed'
)
SELECT
    move_type,
    COUNT(*) as usage_count,
    ROUND(AVG(move_number)::numeric, 2) as avg_position_in_game,
    COUNT(*) FILTER (WHERE reverse_order = 1) as final_move_count
FROM winning_moves
WHERE reverse_order <= 3
GROUP BY move_type
ORDER BY final_move_count DESC;

-- =====================================================
-- COHORT ANALYSIS
-- =====================================================

-- First week player retention
WITH cohorts AS (
    SELECT
        session_id,
        MIN(DATE(created_at)) as cohort_date,
        COUNT(DISTINCT DATE(created_at)) as active_days
    FROM games
    GROUP BY session_id
)
SELECT
    TO_CHAR(cohort_date, 'YYYY-MM-DD') as cohort,
    COUNT(*) as total_players,
    COUNT(*) FILTER (WHERE active_days >= 1) as day_1_retention,
    COUNT(*) FILTER (WHERE active_days >= 3) as day_3_retention,
    COUNT(*) FILTER (WHERE active_days >= 7) as day_7_retention
FROM cohorts
GROUP BY cohort_date
ORDER BY cohort_date;
