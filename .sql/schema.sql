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
    economics_defined INTEGER NOT NULL,
    features_built INTEGER NOT NULL,
    health_state TEXT NOT NULL
);

-- Agent Output Table
CREATE TABLE IF NOT EXISTS agent_output (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    agent_domain TEXT NOT NULL,
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
    is_built INTEGER NOT NULL,
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
    code_coverage_score REAL NOT NULL,
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

-- Economics Metrics Table (New)
CREATE TABLE IF NOT EXISTS economics_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    banana_supply INTEGER NOT NULL,
    burn_rate REAL NOT NULL,
    files_defined INTEGER NOT NULL,
    slot_system_active INTEGER NOT NULL,
    incentive_mechanisms INTEGER NOT NULL,
    value_channels INTEGER NOT NULL
);

-- Codebase Metrics Table (New)
CREATE TABLE IF NOT EXISTS codebase_metrics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp TEXT NOT NULL,
    components_built INTEGER NOT NULL,
    shared_files INTEGER NOT NULL,
    tests_count INTEGER NOT NULL,
    features_built INTEGER NOT NULL,
    features_designed INTEGER NOT NULL,
    implementation_rate REAL NOT NULL
);

-- Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_pulse_timestamp ON system_pulse(timestamp);
CREATE INDEX IF NOT EXISTS idx_agent_domain ON agent_output(agent_domain);
CREATE INDEX IF NOT EXISTS idx_feature_status ON feature_progress(status);
CREATE INDEX IF NOT EXISTS idx_feature_built ON feature_progress(is_built);
CREATE INDEX IF NOT EXISTS idx_kpi_name ON kpi_tracking(kpi_name);
CREATE INDEX IF NOT EXISTS idx_kpi_timestamp ON kpi_tracking(timestamp);
CREATE INDEX IF NOT EXISTS idx_cross_ref_source ON cross_ref_graph(source_domain);
CREATE INDEX IF NOT EXISTS idx_economics_timestamp ON economics_metrics(timestamp);
CREATE INDEX IF NOT EXISTS idx_codebase_timestamp ON codebase_metrics(timestamp);

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
    SUM(CASE WHEN is_built = 1 THEN 1 ELSE 0 END) as built_features,
    ROUND(CAST(SUM(CASE WHEN status = 'DONE' THEN 1 ELSE 0 END) AS REAL) / COUNT(*) * 100, 2) as completion_rate,
    ROUND(CAST(SUM(CASE WHEN is_built = 1 THEN 1 ELSE 0 END) AS REAL) / COUNT(*) * 100, 2) as implementation_rate
FROM feature_progress
GROUP BY phase;

-- View: Health Score Trend
CREATE VIEW IF NOT EXISTS health_trend AS
SELECT
    timestamp,
    health_score,
    agent_coverage_score,
    documentation_score,
    economics_score,
    code_coverage_score
FROM repository_health
ORDER BY timestamp;

-- View: Economics Maturity
CREATE VIEW IF NOT EXISTS economics_maturity AS
SELECT
    timestamp,
    files_defined,
    slot_system_active,
    incentive_mechanisms,
    value_channels,
    CASE
        WHEN files_defined >= 5 AND slot_system_active = 1 THEN 'MATURE'
        WHEN files_defined > 0 THEN 'DEFINED'
        ELSE 'MISSING'
    END as economics_status
FROM economics_metrics;

-- Trigger: Auto-calculate health score
CREATE TRIGGER IF NOT EXISTS update_health_score
AFTER INSERT ON repository_health
BEGIN
    UPDATE repository_health
    SET health_score = (
        documentation_score * 0.15 +
        agent_coverage_score * 0.20 +
        cross_ref_score * 0.15 +
        test_coverage_score * 0.15 +
        security_score * 0.15 +
        economics_score * 0.10 +
        code_coverage_score * 0.10
    )
    WHERE id = NEW.id;
END;

-- Trigger: Auto-calculate implementation rate
CREATE TRIGGER IF NOT EXISTS update_implementation_rate
AFTER INSERT ON codebase_metrics
BEGIN
    UPDATE codebase_metrics
    SET implementation_rate = ROUND(CAST(features_built AS REAL) / features_designed * 100, 2)
    WHERE id = NEW.id;
END;
