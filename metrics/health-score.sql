-- Health Score Calculation
-- KPI-004: Composite repository health measurement
-- Formula: (Code Quality + Test Coverage + Documentation + Dependencies) / 4

WITH health_components AS (
  SELECT
    ROUND(code_quality_score, 2) AS code_quality,
    ROUND(test_coverage_score, 2) AS test_coverage,
    ROUND(documentation_score, 2) AS documentation,
    ROUND(dependency_score, 2) AS dependencies
  FROM repository_health
  WHERE cycle_date = CURRENT_DATE
)
SELECT
  code_quality,
  test_coverage,
  documentation,
  dependencies,
  ROUND((code_quality + test_coverage + documentation + dependencies) / 4, 2) AS health_score,
  CASE
    WHEN ROUND((code_quality + test_coverage + documentation + dependencies) / 4, 2) >= 80 THEN 'GREEN'
    WHEN ROUND((code_quality + test_coverage + documentation + dependencies) / 4, 2) >= 60 THEN 'AMBER'
    ELSE 'RED'
  END AS status
FROM health_components;
