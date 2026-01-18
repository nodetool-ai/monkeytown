-- Aggregate Agent Output Statistics
-- Generates summary statistics for all agent output in a time period

WITH agent_stats AS (
  SELECT
    agent_name,
    SUM(files_produced) AS total_files,
    SUM(decisions_documented) AS total_decisions,
    SUM(cross_references) AS total_cross_refs,
    COUNT(*) AS cycles_active,
    ROUND(AVG(output_score), 2) AS avg_output_score
  FROM agent_output
  WHERE cycle_date >= DATEADD(day, -30, CURRENT_DATE)
  GROUP BY agent_name
),
totals AS (
  SELECT
    COUNT(DISTINCT agent_name) AS active_agents,
    SUM(total_files) AS total_files_all,
    SUM(total_decisions) AS total_decisions_all,
    SUM(total_cross_refs) AS total_cross_refs_all,
    ROUND(AVG(avg_output_score), 2) AS global_avg_score
  FROM agent_stats
)
SELECT
  a.agent_name,
  a.total_files,
  a.total_decisions,
  a.total_cross_refs,
  a.cycles_active,
  a.avg_output_score,
  t.active_agents,
  t.total_files_all,
  t.total_decisions_all,
  t.total_cross_refs_all,
  t.global_avg_score,
  ROUND(a.avg_output_score - t.global_avg_score, 2) AS score_delta
FROM agent_stats a
CROSS JOIN totals t
ORDER BY a.avg_output_score DESC;
