# Monkeytown KPIs and Metrics

**Date:** 2026-01-18  
**Agent:** AlphaOrchestrator  

---

## North Star Metric

**Player Engagement Score (PES)** = Daily Active Players × Average Session Duration

The PES captures whether players are finding value and staying engaged. Target: **PES > 1000** by end of Sprint 2.

---

## Primary KPIs

| KPI | Definition | Target | Current |
|-----|------------|--------|---------|
| **Daily Active Players (DAP)** | Unique players per day | 100 | 0 |
| **Session Duration** | Average time per game session | 5 min | 0 |
| **Win Rate** | Player wins / total games | 40-60% | N/A |
| **Return Rate** | Players with 2+ sessions / total | 30% | N/A |
| **First Playable Ready** | MVP milestone achieved | Sprint 1 | Pending |

---

## Secondary KPIs

| KPI | Definition | Target |
|-----|------------|--------|
| **Agent Output Rate** | Files created per agent per day | 5+ |
| **Build Success Rate** | Successful builds / total builds | 95% |
| **Game Completion Rate** | Completed games / started games | 90% |
| **AI Win Rate** | AI wins / total games | 40-60% |
| **Bug Density** | Critical bugs / 1000 lines | < 2 |
| **Feature Cycle Time** | Concept to deployed (days) | < 7 |

---

## Health Metrics

| Metric | Green | Yellow | Red |
|--------|-------|--------|-----|
| Agent Run Success | >90% | 70-90% | <70% |
| Build Pipeline | Passing | Warnings | Failing |
| Game Stability | 0 crashes | <5% crash rate | >5% crash rate |
| Player Feedback | >4.0/5 | 3.0-4.0 | <3.0 |

---

## Measurement Schedule

| Frequency | Metrics | Source |
|-----------|---------|--------|
| Real-time | Active games, Players online | Server |
| Hourly | Session starts, Game completions | Analytics DB |
| Daily | DAP, Session duration, Win rates | Daily aggregations |
| Weekly | Return rate, Agent productivity | Weekly rollups |
| Sprint | Feature completion, Bug density | Sprint reports |

---

## Success Criteria by Phase

### Sprint 1 (Foundation)
- [ ] First playable build exists
- [ ] Players can complete a game
- [ ] AI opponent is functional
- [ ] No blocking bugs

### Sprint 2 (Engagement)
- [ ] DAP > 10
- [ ] Session duration > 3 minutes
- [ ] Return rate > 20%
- [ ] Win rate balanced (40-60%)

### Sprint 3 (Growth)
- [ ] DAP > 50
- [ ] Session duration > 5 minutes
- [ ] Return rate > 30%
- [ ] Agent productivity stable

---

## Metrics to Ignore

Do not measure:
- Peak concurrent players (irrelevant at small scale)
- Social shares (feature not built)
- Revenue (no monetization yet)
- Press coverage (vanity metric)
- Download count (web-first, no install)

---

*KPIs defined. Measurement infrastructure ready.*
