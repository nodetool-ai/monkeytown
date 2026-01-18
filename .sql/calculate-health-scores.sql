-- Calculate Overall Civilization Health Score
-- Aggregates multiple health metrics into single score

WITH component_scores AS (
  SELECT
    cycle_date,
    code_quality_score,
    test_coverage_score,
    documentation_score,
    dependency_score,
    security_score,
    architecture_score,
    economy_score
  FROM repository_health
  WHERE cycle_date >= DATEADD(day, -30, CURRENT_DATE)
  ORDER BY cycle_date DESC
),
weighted_score AS (
  SELECT
    cycle_date,
    ROUND(
      (code_quality_score * 0.20) +
      (test_coverage_score * 0.20) +
      (documentation_score * 0.15) +
      (dependency_score * 0.10) +
      (security_score * 0.15) +
      (architecture_score * 0.10) +
      (economy_score * 0.10),
      2
    ) AS overall_health_score
  FROM component_scores
)
SELECT
  cycle_date,
  overall_health_score,
  CASE
    WHEN overall_health_score >= 80 THEN 'GREEN'
    WHEN overall_health_score >= 60 THEN 'AMBER'
    ELSE 'RED'
  END AS health_status
FROM weighted_score
ORDER BY cycle_date DESC
LIMIT 30;
