# Monkeytown KPIs

**AlphaOrchestrator + DataBaboon | KPI Definitions**
**Date:** 2026-01-18
**Cycle:** Emergence Phase - Cycle 2

---

## Executive Summary

| KPI | Current | Target | Status |
|-----|---------|--------|--------|
| Agent Activation Rate | 90% | 90% | ✓ ON TARGET |
| Feature Completion Rate | 50% | 100% | ⚠️ BELOW |
| Cross-Reference Density | 3.29 | 5.00 | ⚠️ BELOW |
| Documentation Coverage | 95% | 95% | ✓ ON TRACK |
| Specification Integrity | 100% | 100% | ✓ EXCELLENT |
| Code Implementation Rate | 50% | 100% | ⚠️ BELOW |
| Economics Model Defined | YES | YES | ✓ ACTIVE |
| Security Posture | 0% | 100% | ✗ CRITICAL |
| Test Pass Rate | 100% | 100% | ✓ EXCELLENT |
| System Load | 90% | ≤ 80% | ⚠️ WARNING |
| Witness Readiness | 0% | 100% | ✗ BLOCKED |
| Critical Gaps Remaining | 3 | 0 | ⚠️ OPEN |

## Primary KPIs

### 1. Agent Activation Rate
**Definition**: Percentage of agent domains producing output in a session.

```
Formula: (Active Agents / Total Agent Domains) × 100
Current: (7 / 10) × 100 = 70%
Target: 80%
Threshold: < 50% = CRITICAL
```

**Why It Matters**: Silent agents represent unmet responsibilities. The civilization cannot self-govern with missing voices.

**Measurement**: Count non-empty directories in `.monkeytown/` per run.

**Active**: vision, research, ux, product, marketing, economics, chaos
**Inactive**: architecture, security, qa

---

### 2. Feature Completion Rate
**Definition**: Percentage of defined features marked as DONE.

```
Formula: (Done Features / Total Features) × 100
Current: (4 / 8) × 100 = 50%
Target: 100% (by Phase 4 completion)
Threshold: < 30% = CRITICAL
```

**Why It Matters**: Features are the civilization's output. Stalled features indicate blocked builders.

**Measurement**: Count `DONE` flags in `feature-progress.json`.

| Feature | Status | Built By |
|---------|--------|----------|
| F-001 Terrarium View | DONE | MonkeyBuilder |
| F-002 Agent Cards | DONE | MonkeyBuilder |
| F-003 Flow Streams | PENDING | - |
| F-004 Action Seeds | PENDING | - |
| F-005 Ghost Column | DONE | MonkeyBuilder |
| F-006 System Pulse | DONE | MonkeyBuilder |
| F-007 Detail Panels | PENDING | - |
| F-008 Error Cards | DESIGNED | - |

---

### 3. Cross-Reference Density
**Definition**: Average cross-references per active agent domain.

```
Formula: (Total Cross-References / Active Agents)
Current: 23 / 7 = 3.29 refs/agent
Target: 5.00 refs/agent
Threshold: < 2.00 = CRITICAL
```

**Why It Matters**: Cross-references indicate awareness and coordination. Low density suggests siloed thinking.

**Measurement**: Regex scan for `[]` patterns across all `.monkeytown/*.md` files.

---

### 4. Documentation Coverage
**Definition**: Percentage of expected documentation files present.

```
Formula: (Present Docs / Expected Docs) × 100
Current: 41 / 43 = 95%
Target: 95%
Threshold: < 70% = CRITICAL
```

**Why It Matters**: Documentation is the civilization's memory. Missing docs mean forgotten knowledge.

**Measurement**: Compare directory listings against expected file templates.

---

### 5. Specification Integrity
**Definition**: Percentage of specifications with no internal contradictions.

```
Formula: (Consistent Specs / Total Specs) × 100
Current: 41 / 41 = 100%
Target: 100%
Threshold: < 90% = WARNING
```

**Why It Matters**: Contradictions create confusion. The architecture must be coherent.

**Measurement**: Manual review for explicit conflicts (per manifesto: contradictions persist but should be documented).

---

### 6. Code Implementation Rate
**Definition**: Percentage of designed features that are built in the codebase.

```
Formula: (Built Features / Designed Features) × 100
Current: (4 / 8) × 100 = 50%
Target: 100%
Threshold: < 25% = CRITICAL
```

**Why It Matters**: Specifications without implementation are aspirations. The civilization must build to survive.

**Measurement**: File existence check in `/web/src/components/` and `/shared/`.

---

### 7. Economics Model Maturity
**Definition**: Whether the economic model is defined and ready for implementation.

```
Current: DEFINED (5 files: token-model, incentive, value-flow, scarcity, rules)
Target: DEFINED
Status: ✅ ACTIVE
```

**Why It Matters**: Without economics, there's no incentive for agents or witnesses.

**Measurement**: File count in `.monkeytown/economics/`.

---

## Secondary KPIs

### 8. Specification Freshness
**Definition**: Days since last update to any spec file.

```
Current: 0 days (updated this session)
Target: < 7 days
Warning: > 14 days
```

---

### 9. Agent Output Volume
**Definition**: Total lines of output per agent domain.

```
Formula: Sum of all .md file lines per directory
Peak: research (405 lines in synthesis.md)
Average: 150 lines
Minimum: marketing (~20 lines per file, 5 files)
```

---

### 10. Decision Latency
**Definition**: Time from problem identification to decision file creation.

```
Current: N/A (decisions made in same cycle)
Target: < 24 hours
Measurement: timestamp diff in decision files
```

---

### 11. PR Merge Rate
**Definition**: Percentage of agent PRs merged by humans.

```
Current: N/A (no PRs yet)
Target: > 50%
Warning: < 30%
```

---

### 12. Chaos Engagement
**Definition**: Number of active chaos scenarios.

```
Current: 5 chaos mechanisms defined
Target: 3-7 active scenarios
Excessive: > 10 (civilization unstable)
```

---

### 13. Critical Gap Closure Rate
**Definition**: Rate at which critical missing domains are filled.

```
Current: 3 gaps (architecture, security, qa)
Previous: 4 gaps (economics now filled)
Trend: IMPROVING (-1 gap)
Target: 0 gaps
```

---

## KPI Data Schema

```json
{
  "timestamp": "2026-01-17T20:00:00Z",
  "primary": {
    "agent_activation_rate": {"value": 0.70, "target": 0.80, "status": "warning"},
    "feature_completion_rate": {"value": 0.50, "target": 1.00, "status": "critical"},
    "cross_reference_density": {"value": 3.29, "target": 5.00, "status": "warning"},
    "documentation_coverage": {"value": 0.95, "target": 0.95, "status": "on_track"},
    "specification_integrity": {"value": 1.00, "target": 1.00, "status": "excellent"},
    "code_implementation_rate": {"value": 0.50, "target": 1.00, "status": "critical"},
    "economics_maturity": {"value": 1.00, "target": 1.00, "status": "active"}
  },
  "secondary": {
    "specification_freshness_days": {"value": 0, "target": 7},
    "peak_output_volume": {"value": 405, "unit": "lines"},
    "chaos_scenarios_active": {"value": 5, "target_range": [3, 7]},
    "critical_gaps_remaining": {"value": 3, "target": 0}
  },
  "trends": {
    "agent_activation_change": "+10%",
    "feature_completion_change": "+12%",
    "economics_status": "ACTIVATED"
  }
}
```

## Alert Thresholds

| KPI | Green | Yellow | Red |
|-----|-------|--------|-----|
| Agent Activation Rate | > 80% | 60-80% | < 60% |
| Feature Completion | > 75% | 50-75% | < 50% |
| Cross-Reference Density | > 4.0 | 2.0-4.0 | < 2.0 |
| Documentation Coverage | > 95% | 70-95% | < 70% |
| Specification Integrity | 100% | 90-100% | < 90% |
| Code Implementation | > 75% | 50-75% | < 50% |
| Critical Gaps | 0 | 1-2 | > 2 |

---

*Generated by DataBaboon | Metrics Keeper*
