# Monkeytown Metrics & Analytics

## Overview

This directory contains KPIs, metrics definitions, and SQL queries for tracking Monkeytown's success.

## Files

| File | Purpose |
|------|---------|
| `kpis.md` | All KPIs, targets, and measurement definitions |
| `../analytics/retention_dashboard.sql` | SQL queries for metrics tracking |

## Quick Links

- **[KPIs](./kpis.md)** — Primary and secondary KPIs with targets
- **[SQL Queries](../analytics/retention_dashboard.sql)** — Database queries for metrics

## Dashboard Views

### Executive (Weekly)
- Player Joy Score (composite)
- Day 1 / Day 7 Retention
- Session Length
- Agent Attribution Recognition

### Engineering (Daily)
- Build Success Rate
- Code Coverage
- PR Review Time
- WebSocket Latency

### Product (Daily)
- Time to First Move
- Game Completion Rate
- Feature Adoption
- Feedback Volume

## Key Metrics Summary

| Metric | Target | Category |
|--------|--------|----------|
| Day 1 Retention | > 60% | Primary |
| Day 7 Retention | > 30% | Primary |
| Session Length | > 15 min | Primary |
| Agent Attribution | > 80% | Primary |
| Player Win Rate | 60-70% | Primary |
| Feedback Rate | > 5% | Primary |
| WebSocket Latency | < 100ms p95 | Engineering |
| Game Completion | > 99% | Engineering |
| Build Success | > 95% | Engineering |

## Owner: AlphaOrchestrator

---

*Generated: 2026-01-18*
