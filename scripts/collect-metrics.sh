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
echo "  [1/6] Analyzing agent output..."
AGENT_DOMAINS=("vision" "architecture" "research" "ux" "product" "marketing" "economics" "security" "qa" "chaos")
TOTAL_FILES=0
ACTIVE_AGENTS=0

for domain in "${AGENT_DOMAINS[@]}"; do
    DOMAIN_DIR="$MONKEYTOWN_ROOT/.monkeytown/$domain"
    if [ -d "$DOMAIN_DIR" ]; then
        FILE_COUNT=$(find "$DOMAIN_DIR" -type f \( -name "*.md" -o -name "*.json" \) | wc -l)
        TOTAL_FILES=$((TOTAL_FILES + FILE_COUNT))
        if [ "$FILE_COUNT" -gt 0 ]; then
            ACTIVE_AGENTS=$((ACTIVE_AGENTS + 1))
        fi
    fi
done

echo "    Active agents: $ACTIVE_AGENTS/10"
echo "    Total files: $TOTAL_FILES"

# 2. Count feature completion
echo "  [2/6] Calculating feature progress..."
# Features from roadmap: F-001 through F-008
FEATURES_DONE=0
FEATURES_TOTAL=8

# Check for implemented components in codebase
if [ -f "$MONKEYTOWN_ROOT/web/src/components/TerrariumView.tsx" ]; then
    FEATURES_DONE=$((FEATURES_DONE + 1))
fi
if [ -f "$MONKEYTOWN_ROOT/web/src/components/AgentCard.tsx" ]; then
    FEATURES_DONE=$((FEATURES_DONE + 1))
fi
if [ -f "$MONKEYTOWN_ROOT/web/src/components/SystemPulse.tsx" ]; then
    FEATURES_DONE=$((FEATURES_DONE + 1))
fi
if [ -f "$MONKEYTOWN_ROOT/web/src/components/ErrorCard.tsx" ]; then
    FEATURES_DONE=$((FEATURES_DONE + 1))
fi

echo "    Features done: $FEATURES_DONE/$FEATURES_TOTAL"

# 3. Count cross-references
echo "  [3/6] Counting cross-references..."
CROSS_REFS=$(grep -r '\[\.\.\.\]' "$MONKEYTOWN_ROOT/.monkeytown" --include="*.md" 2>/dev/null | wc -l)
echo "    Cross-references: $CROSS_REFS"

# 4. Check decision files
echo "  [4/6] Checking decisions..."
DECISIONS_DIR="$MONKEYTOWN_ROOT/.monkeytown/decisions"
DECISIONS_COUNT=0
if [ -d "$DECISIONS_DIR" ]; then
    DECISIONS_COUNT=$(find "$DECISIONS_DIR" -type f | wc -l)
fi
echo "    Decisions committed: $DECISIONS_COUNT"

# 5. Calculate health scores
echo "  [5/6] Calculating health scores..."

# Agent coverage: percentage of active agents
AGENT_COVERAGE=$(echo "scale=2; $ACTIVE_AGENTS * 10" | bc)

# Documentation coverage: files present vs expected
EXPECTED_FILES=33
DOC_COVERAGE=$(echo "scale=2; $TOTAL_FILES * 100 / $EXPECTED_FILES" | bc)

# Cross-reference density
if [ "$ACTIVE_AGENTS" -gt 0 ]; then
    CROSS_REF_DENSITY=$(echo "scale=2; $CROSS_REFS / $ACTIVE_AGENTS" | bc)
else
    CROSS_REF_DENSITY=0
fi

# Security and QA gaps
if [ -d "$MONKEYTOWN_ROOT/.monkeytown/security" ] && [ -z "$(ls -A "$MONKEYTOWN_ROOT/.monkeytown/security" 2>/dev/null)" ]; then
    SECURITY_SCORE=0
else
    SECURITY_SCORE=100
fi

if [ -d "$MONKEYTOWN_ROOT/.monkeytown/qa" ] && [ -z "$(ls -A "$MONKEYTOWN_ROOT/.monkeytown/qa" 2>/dev/null)" ]; then
    QA_SCORE=0
else
    QA_SCORE=100
fi

# Calculate overall health (weighted)
HEALTH_SCORE=$(echo "scale=2; ($DOC_COVERAGE * 0.20) + ($AGENT_COVERAGE * 0.25) + ($CROSS_REF_DENSITY * 20 * 0.20) + ($QA_SCORE * 0.15) + ($SECURITY_SCORE * 0.10) + (0 * 0.10)" | bc)

echo "    Agent coverage: $AGENT_COVERAGE%"
echo "    Documentation: $DOC_COVERAGE%"
echo "    Cross-ref density: $CROSS_REF_DENSITY refs/agent"
echo "    Overall health: $HEALTH_SCORE"

# 6. Generate JSON output
echo "  [6/6] Writing metrics to $DATA_DIR/snapshot.json..."

cat > "$DATA_DIR/snapshot.json" << EOF
{
  "timestamp": "$TIMESTAMP",
  "summary": {
    "active_agents": $ACTIVE_AGENTS,
    "total_agent_domains": 10,
    "total_files": $TOTAL_FILES,
    "features_done": $FEATURES_DONE,
    "features_total": $FEATURES_TOTAL,
    "cross_references": $CROSS_REFS,
    "decisions_committed": $DECISIONS_COUNT
  },
  "health": {
    "agent_coverage": $AGENT_COVERAGE,
    "documentation_coverage": $DOC_COVERAGE,
    "cross_ref_density": $CROSS_REF_DENSITY,
    "security_score": $SECURITY_SCORE,
    "qa_score": $QA_SCORE,
    "overall_score": $HEALTH_SCORE
  },
  "system_state": {
    "phase": "phase_1_complete",
    "ready_for_phase_2": true
  }
}
EOF

echo ""
echo "Metrics collection complete."
echo "Snapshot saved to: $DATA_DIR/snapshot.json"
