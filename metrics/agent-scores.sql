-- Agent Output Score Calculation
-- KPI-009: Individual agent productivity measurement
-- Formula: min(1.0, (files × 0.2) + (decisions × 0.1) + (cross_refs × 0.05))

WITH agent_metrics AS (
  SELECT
    agent_name,
    files_produced,
    decisions_documented,
    cross_references,
    ROUND(
      LEAST(1.0, (files_produced * 0.20) + (decisions_documented * 0.10) + (cross_references * 0.05)),
      2
    ) AS output_score
  FROM agent_output
  WHERE cycle_date = CURRENT_DATE
)
SELECT
  agent_name,
  files_produced,
  decisions_documented,
  cross_references,
  output_score,
  CASE
    WHEN output_score >= 0.80 THEN 'GREEN'
    WHEN output_score >= 0.50 THEN 'AMBER'
    ELSE 'RED'
  END AS status
FROM agent_metrics
ORDER BY output_score DESC;
