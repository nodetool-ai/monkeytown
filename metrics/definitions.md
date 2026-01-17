# Metrics Definitions

**DataBaboon** | `definitions.md` | 2026-01-17

## Data Dictionary

### System Pulse Metrics

| Metric | Type | Definition | Formula | Source |
|--------|------|------------|---------|--------|
| `active_agents` | Count | Number of agent domains producing output | Count of non-empty `.monkeytown/*/` directories | Directory scan |
| `pending_flows` | Count | Inter-agent communications awaiting processing | Cross-references between agents not yet resolved | `[]` pattern detection |
| `contracts_settled` | Count | Witnessed agreements between agents | Count of decision files in `.monkeytown/decisions/` | Directory scan |
| `system_load` | Ratio | Normalized pressure on civilization | `active_agents / max_concurrent_capacity (10)` | Calculation |
| `economics_defined` | Boolean | Whether economics model exists | Check `.monkeytown/economics/` contents | File existence |
| `features_built` | Count | Number of features implemented in code | File existence in `/web/src/components/` | Code inspection |

---

### Agent Output Metrics

| Metric | Type | Definition | Formula | Source |
|--------|------|------------|---------|--------|
| `files_count` | Count | Markdown and JSON files produced by agent | `find .monkeytown/{domain} -type f \( -name "*.md" -o -name "*.json" \)` | File system |
| `decisions_count` | Count | Run summaries and decisions made | Count in `.monkeytown/decisions/` | Directory scan |
| `cross_refs_count` | Cross-references to other domains | `grep -r '\[\.\.\.]'` | Content analysis |
| `output_score` | Ratio | Normalized productivity metric | `min(1.0, (files × 0.2) + (decisions × 0.1) + (refs × 0.05))` | Calculation |
| `is_active` | Boolean | Whether agent produced output this cycle | `files_count > 0` | Logic |

---

### Feature Progress Metrics

| Metric | Type | Definition | Formula | Source |
|--------|------|------------|---------|--------|
| `features_done` | Count | Features marked DONE in tracker | Count in `feature-progress.json` | File read |
| `features_built` | Count | Features implemented in codebase | File existence check | Code inspection |
| `features_total` | Count | Total features defined in roadmap | 8 (F-001 through F-008) | Static |
| `completion_rate` | Ratio | Percentage of features complete | `features_done / features_total` | Calculation |
| `implementation_rate` | Ratio | Percentage of features built | `features_built / features_total` | Calculation |
| `is_blocked` | Boolean | Feature has unmet dependencies | Check dependency chain | Logic |

---

### Repository Health Metrics

| Metric | Type | Definition | Formula | Source |
|--------|------|------------|---------|--------|
| `health_score` | Ratio | Overall civilization health | Weighted composite | Calculation |
| `documentation_coverage` | Ratio | Docs present vs expected | `actual_files / expected_files (43)` | Comparison |
| `agent_coverage` | Ratio | Active vs total agent domains | `active_domains / 10` | Calculation |
| `cross_ref_density` | Ratio | Cross-references per active agent | `total_refs / active_agents` | Calculation |
| `test_coverage` | Ratio | QA output vs expected | QA files / expected QA files | Comparison |
| `security_score` | Ratio | Security output vs expected | Security files / expected security files | Comparison |
| `economics_score` | Ratio | Economics output vs expected | Economics files / expected (5) | Comparison |
| `code_coverage` | Ratio | Built features vs designed | features_built / 8 | Calculation |

---

### Economics Metrics (New)

| Metric | Type | Definition | Formula | Source |
|--------|------|------------|---------|--------|
| `banana_supply` | Count | Total banana supply | 1,000,000 m🍌 | token-model.md |
| `burn_rate` | Ratio | Deflation pressure | 0.1% on large transfers | incentive-structure.md |
| `slot_system` | Boolean | Whether slot system defined | Check `.monkeytown/economics/scarcity-model.md` | File read |
| `incentive_mechanisms` | Count | Number of incentive types | Count in `incentive-structure.md` | Content analysis |
| `value_channels` | Count | Number of value flow channels | Count in `value-flow.md` | Content analysis |

---

### KPI Metrics

| KPI | Category | Definition | Target | Alert Threshold |
|-----|----------|------------|--------|-----------------|
| `agent_activation_rate` | Primary | % of agents producing output | 80% | < 50% |
| `feature_completion_rate` | Primary | % of features done | 100% | < 30% |
| `cross_reference_density` | Primary | Refs per active agent | 5.0 | < 2.0 |
| `documentation_coverage` | Primary | % of expected docs present | 95% | < 70% |
| `specification_integrity` | Primary | % of specs without contradictions | 100% | < 90% |
| `code_implementation_rate` | Primary | % of features built | 100% | < 50% |
| `economics_maturity` | Primary | Whether economics defined | YES | N/A |
| `specification_freshness` | Secondary | Days since last spec update | < 7 days | > 14 days |
| `agent_output_volume` | Secondary | Lines of output per agent | Variable | N/A |
| `decision_latency` | Secondary | Hours from problem to decision | < 24 hours | > 48 hours |
| `pr_merge_rate` | Secondary | % of PRs merged by humans | > 50% | < 30% |
| `chaos_engagement` | Secondary | Active chaos scenarios | 3-7 | > 10 |
| `critical_gaps_remaining` | Secondary | Number of missing agent domains | 0 | > 2 |

---

## Data Quality Notes

### Known Limitations

1. **Decision Latency**: Cannot measure until first decision file is committed - NOW MEASURABLE (9 decisions)
2. **PR Merge Rate**: Cannot measure until first agent PR is opened - STILL NOT MEASURABLE
3. **Witness Retention**: Requires frontend instrumentation - NOT IMPLEMENTED
4. **Explainability Score**: Requires user survey or testing - NOT MEASURABLE
5. **Seed Visibility**: Requires F-004 implementation - NOT BUILT
6. **Economics Circulation**: Requires economics implementation - NOT YET
7. **Flow Velocity**: Requires F-003 implementation - NOT BUILT

### Measurement Confidence

| Metric | Confidence | Reason |
|--------|------------|--------|
| Agent Activity | HIGH | Direct file system measurement |
| Feature Status | HIGH | Manual specification tracking + code inspection |
| Feature Implementation | HIGH | Direct code inspection |
| Health Scores | HIGH | Composite of high-confidence metrics |
| Cross-References | HIGH | Regex pattern matching |
| Economics Defined | HIGH | File existence check |
| Gap Analysis | HIGH | Clear expected values |
| Economics Circulation | LOW | Requires implementation |

---

## Schema References

- **System Pulse**: `.monkeytown/data/system-pulse.json`
- **Agent Output**: `.monkeytown/data/agent-output.json`
- **Feature Progress**: `.monkeytown/data/feature-progress.json`
- **Repository Health**: `.monkeytown/data/repository-health.json`
- **KPIs**: `analytics/kpis.md`
- **SQL Schema**: `.sql/schema.sql`

---

*Generated by DataBaboon | Metrics Keeper*
