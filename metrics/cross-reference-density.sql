-- Cross-Reference Density Calculation
-- KPI-010: Inter-agent awareness and coordination measurement
-- Formula: Total Cross-References / Active Agents

WITH agent_count AS (
  SELECT COUNT(DISTINCT agent_name) AS active_agents
  FROM agent_output
  WHERE cycle_date >= DATEADD(day, -30, CURRENT_DATE)
),
total_refs AS (
  SELECT SUM(cross_references) AS total_cross_refs
  FROM agent_output
  WHERE cycle_date >= DATEADD(day, -30, CURRENT_DATE)
)
SELECT
  (SELECT active_agents FROM agent_count) AS active_agents,
  (SELECT total_cross_refs FROM total_refs) AS total_cross_refs,
  ROUND(
    (SELECT total_cross_refs FROM total_refs) /
    NULLIF((SELECT active_agents FROM agent_count), 0),
    2
  ) AS density_score,
  CASE
    WHEN ROUND(
      (SELECT total_cross_refs FROM total_refs) /
      NULLIF((SELECT active_agents FROM agent_count), 0),
      2
    ) >= 5.0 THEN 'GREEN'
    WHEN ROUND(
      (SELECT total_cross_refs FROM total_refs) /
      NULLIF((SELECT active_agents FROM agent_count), 0),
      2
    ) >= 3.0 THEN 'AMBER'
    ELSE 'RED'
  END AS status;
