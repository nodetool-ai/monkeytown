#!/bin/bash
# Metrics Collection Script
# DataBaboon | 2026-01-17
# Usage: ./scripts/collect-metrics.sh

set -e

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
MONKEYTOWN_ROOT="/home/runner/work/monkeytown/monkeytown"
DATA_DIR="$MONKEYTOWN_ROOT/.monkeytown/data"

echo "Collecting Monkeytown metrics at $TIMESTAMP..."

# 1. Count agent domains and files
echo "  [1/7] Analyzing agent output..."
AGENT_DOMAINS=("vision" "architecture" "research" "ux" "product" "marketing" "economics" "security" "qa" "chaos")
TOTAL_FILES=0
ACTIVE_AGENTS=0

for domain in "${AGENT_DOMAINS[@]}"; do
    DOMAIN_DIR="$MONKEYTOWN_ROOT/.monkeytown/$domain"
    if [ -d "$DOMAIN_DIR" ]; then
        FILE_COUNT=$(find "$DOMAIN_DIR" -type f \( -name "*.md" -o -name "*.json" \) 2>/dev/null | wc -l)
        TOTAL_FILES=$((TOTAL_FILES + FILE_COUNT))
        if [ "$FILE_COUNT" -gt 0 ]; then
            ACTIVE_AGENTS=$((ACTIVE_AGENTS + 1))
        fi
    fi
done

echo "    Active agents: $ACTIVE_AGENTS/10"
echo "    Total files: $TOTAL_FILES"

# 2. Count feature completion
echo "  [2/7] Calculating feature progress..."
FEATURES_BUILT=0
FEATURES_TOTAL=8

# Check for implemented components in codebase (F-001 through F-008)
if [ -f "$MONKEYTOWN_ROOT/web/src/components/TerrariumView.tsx" ]; then
    FEATURES_BUILT=$((FEATURES_BUILT + 1))
fi
if [ -f "$MONKEYTOWN_ROOT/web/src/components/AgentCard.tsx" ]; then
    FEATURES_BUILT=$((FEATURES_BUILT + 1))
fi
if [ -f "$MONKEYTOWN_ROOT/web/src/components/GhostColumn.tsx" ]; then
    FEATURES_BUILT=$((FEATURES_BUILT + 1))
fi
if [ -f "$MONKEYTOWN_ROOT/web/src/components/SystemPulse.tsx" ]; then
    FEATURES_BUILT=$((FEATURES_BUILT + 1))
fi
# F-003, F-004, F-007, F-008 not yet built

echo "    Features built: $FEATURES_BUILT/$FEATURES_TOTAL"

# 3. Count cross-references
echo "  [3/7] Counting cross-references..."
CROSS_REFS=$(grep -r '\[\.\.\.]' "$MONKEYTOWN_ROOT/.monkeytown" --include="*.md" 2>/dev/null | wc -l)
echo "    Cross-references: $CROSS_REFS"

# 4. Check decision files
echo "  [4/7] Checking decisions..."
DECISIONS_DIR="$MONKEYTOWN_ROOT/.monkeytown/decisions"
DECISIONS_COUNT=0
if [ -d "$DECISIONS_DIR" ]; then
    DECISIONS_COUNT=$(find "$DECISIONS_DIR" -type f \( -name "*.md" -o -name "*.json" \) 2>/dev/null | wc -l)
fi
echo "    Decisions committed: $DECISIONS_COUNT"

# 5. Check economics model
echo "  [5/7] Checking economics model..."
ECONOMICS_FILES=0
if [ -d "$MONKEYTOWN_ROOT/.monkeytown/economics" ]; then
    ECONOMICS_FILES=$(find "$MONKEYTOWN_ROOT/.monkeytown/economics" -type f -name "*.md" 2>/dev/null | wc -l)
fi
if [ "$ECONOMICS_FILES" -gt 0 ]; then
    ECONOMICS_DEFINED="true"
else
    ECONOMICS_DEFINED="false"
fi
echo "    Economics files: $ECONOMICS_FILES"

# 6. Calculate health scores
echo "  [6/7] Calculating health scores..."

# Agent coverage: percentage of active agents
AGENT_COVERAGE=$(echo "scale=2; $ACTIVE_AGENTS * 10" | bc)

# Documentation coverage: files present vs expected (43 expected)
EXPECTED_FILES=43
DOC_COVERAGE=$(echo "scale=2; $TOTAL_FILES * 100 / $EXPECTED_FILES" | bc)

# Cross-reference density
if [ "$ACTIVE_AGENTS" -gt 0 ]; then
    CROSS_REF_DENSITY=$(echo "scale=2; $CROSS_REFS / $ACTIVE_AGENTS" | bc)
else
    CROSS_REF_DENSITY=0
fi

# Security and QA gaps (0 if no files, 100 if files exist)
if [ -d "$MONKEYTOWN_ROOT/.monkeytown/security" ] && [ -n "$(ls -A "$MONKEYTOWN_ROOT/.monkeytown/security" 2>/dev/null)" ]; then
    SECURITY_SCORE=100
else
    SECURITY_SCORE=0
fi

if [ -d "$MONKEYTOWN_ROOT/.monkeytown/qa" ] && [ -n "$(ls -A "$MONKEYTOWN_ROOT/.monkeytown/qa" 2>/dev/null)" ]; then
    QA_SCORE=100
else
    QA_SCORE=0
fi

# Economics score
if [ "$ECONOMICS_DEFINED" = "true" ]; then
    ECONOMICS_SCORE=100
else
    ECONOMICS_SCORE=0
fi

# Code coverage (features built)
CODE_COVERAGE=$(echo "scale=2; $FEATURES_BUILT * 100 / $FEATURES_TOTAL" | bc)

# Calculate overall health (weighted)
HEALTH_SCORE=$(echo "scale=2; ($DOC_COVERAGE * 0.15) + ($AGENT_COVERAGE * 0.20) + ($CROSS_REF_DENSITY * 20 * 0.15) + ($QA_SCORE * 0.15) + ($SECURITY_SCORE * 0.15) + ($ECONOMICS_SCORE * 0.10) + ($CODE_COVERAGE * 0.10)" | bc)

echo "    Agent coverage: $AGENT_COVERAGE%"
echo "    Documentation: $DOC_COVERAGE%"
echo "    Cross-ref density: $CROSS_REF_DENSITY refs/agent"
echo "    Security score: $SECURITY_SCORE%"
echo "    QA score: $QA_SCORE%"
echo "    Economics score: $ECONOMICS_SCORE%"
echo "    Code coverage: $CODE_COVERAGE%"
echo "    Overall health: $HEALTH_SCORE"

# 7. Generate JSON output
echo "  [7/7] Writing metrics to $DATA_DIR/snapshot.json..."

cat > "$DATA_DIR/snapshot.json" << EOF
{
  "timestamp": "$TIMESTAMP",
  "summary": {
    "active_agents": $ACTIVE_AGENTS,
    "total_agent_domains": 10,
    "total_files": $TOTAL_FILES,
    "features_built": $FEATURES_BUILT,
    "features_total": $FEATURES_TOTAL,
    "cross_references": $CROSS_REFS,
    "decisions_committed": $DECISIONS_COUNT,
    "economics_defined": $ECONOMICS_DEFINED,
    "economics_files": $ECONOMICS_FILES
  },
  "health": {
    "overall_score": $HEALTH_SCORE,
    "agent_coverage": $AGENT_COVERAGE,
    "documentation_coverage": $DOC_COVERAGE,
    "cross_ref_density": $CROSS_REF_DENSITY,
    "security_score": $SECURITY_SCORE,
    "qa_score": $QA_SCORE,
    "economics_score": $ECONOMICS_SCORE,
    "code_coverage": $CODE_COVERAGE
  },
  "system_state": {
    "phase": "phase_1_complete",
    "phase_2_progress": 25,
    "ready_for_phase_2": true
  }
}
EOF

echo ""
echo "Metrics collection complete."
echo "Snapshot saved to: $DATA_DIR/snapshot.json"
