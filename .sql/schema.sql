-- Monkeytown Metrics Schema
-- DataBaboon | 2026-01-17

-- System Pulse Table
CREATE TABLE IF NOT EXISTS system_pulse (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    active_agents INTEGER NOT NULL,
    pending_flows INTEGER NOT NULL,
    contracts_settled INTEGER NOT NULL,
    system_load REAL NOT NULL,
    health_state TEXT NOT NULL
);

-- Agent Output Table
CREATE TABLE IF NOT EXISTS agent_output (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    agent_domain TEXT NOT NULL UNIQUE,
    files_count INTEGER NOT NULL,
    decisions_count INTEGER NOT NULL,
    cross_refs_count INTEGER NOT NULL,
    output_score REAL NOT NULL,
    is_active INTEGER NOT NULL
);

-- Feature Progress Table
CREATE TABLE IF NOT EXISTS feature_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    feature_id TEXT NOT NULL,
    feature_name TEXT NOT NULL,
    status TEXT NOT NULL,
    is_testable INTEGER NOT NULL,
    dependencies TEXT,
    phase INTEGER NOT NULL
);

-- Phase Status Table
CREATE TABLE IF NOT EXISTS phase_status (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    phase_number INTEGER NOT NULL UNIQUE,
    phase_name TEXT NOT NULL,
    status TEXT NOT NULL,
    features_done INTEGER NOT NULL,
    features_total INTEGER NOT NULL,
    completion_rate REAL NOT NULL
);

-- Repository Health Table
CREATE TABLE IF NOT EXISTS repository_health (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    health_score REAL NOT NULL,
    documentation_score REAL NOT NULL,
    agent_coverage_score REAL NOT NULL,
    cross_ref_score REAL NOT NULL,
    test_coverage_score REAL NOT NULL,
    security_score REAL NOT NULL,
    economics_score REAL NOT NULL,
    total_monkeytown_files INTEGER NOT NULL,
    total_code_files INTEGER NOT NULL,
    empty_agent_domains INTEGER NOT NULL
);

-- KPI Tracking Table
CREATE TABLE IF NOT EXISTS kpi_tracking (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    kpi_name TEXT NOT NULL,
    kpi_value REAL NOT NULL,
    kpi_target REAL NOT NULL,
    kpi_status TEXT NOT NULL,
    kpi_category TEXT NOT NULL
);

-- Cross-Reference Graph Table
CREATE TABLE IF NOT EXISTS cross_ref_graph (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    source_domain TEXT NOT NULL,
    target_domain TEXT NOT NULL,
    ref_count INTEGER NOT NULL
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_pulse_timestamp ON system_pulse(timestamp);
CREATE INDEX IF NOT EXISTS idx_agent_domain ON agent_output(agent_domain);
CREATE INDEX IF NOT EXISTS idx_feature_status ON feature_progress(status);
CREATE INDEX IF NOT EXISTS idx_kpi_name ON kpi_tracking(kpi_name);
CREATE INDEX IF NOT EXISTS idx_kpi_timestamp ON kpi_tracking(timestamp);
CREATE INDEX IF NOT EXISTS idx_cross_ref_source ON cross_ref_graph(source_domain);

-- View: Active Agent Summary
CREATE VIEW IF NOT EXISTS active_agents_summary AS
SELECT
    COUNT(*) as total_domains,
    SUM(is_active) as active_count,
    ROUND(CAST(SUM(is_active) AS REAL) / COUNT(*) * 100, 2) as activation_rate
FROM agent_output;

-- View: Feature Completion Summary
CREATE VIEW IF NOT EXISTS feature_completion_summary AS
SELECT
    phase,
    COUNT(*) as total_features,
    SUM(CASE WHEN status = 'DONE' THEN 1 ELSE 0 END) as done_features,
    ROUND(CAST(SUM(CASE WHEN status = 'DONE' THEN 1 ELSE 0 END) AS REAL) / COUNT(*) * 100, 2) as completion_rate
FROM feature_progress
GROUP BY phase;

-- Trigger: Auto-calculate health score
CREATE TRIGGER IF NOT EXISTS update_health_score
AFTER INSERT ON repository_health
BEGIN
    UPDATE repository_health
    SET health_score = (
        documentation_score * 0.20 +
        agent_coverage_score * 0.25 +
        cross_ref_score * 0.20 +
        test_coverage_score * 0.15 +
        security_score * 0.10 +
        economics_score * 0.10
    )
    WHERE id = NEW.id;
END;
