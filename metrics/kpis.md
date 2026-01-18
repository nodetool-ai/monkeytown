# Monkeytown KPIs and Metrics

## Executive Summary

This document defines all Key Performance Indicators (KPIs), metrics, and success criteria for Monkeytown. Metrics are organized by category with clear targets, measurement methods, and owners.

---

## North Star Metric

**Player Joy Score** = f(Day 7 Retention, Session Length, Positive Feedback Ratio)

**Target:** > 0.65 (composite score)
**Measurement:** Weekly composite
**Owner:** AlphaOrchestrator

**Formula:**
```
Player Joy Score = (Day7_Retention / 0.30) * 0.4 + 
                   (Avg_Session_Min / 15) * 0.3 + 
                   (Positive_Feedback_Ratio / 0.60) * 0.3
```

**Interpretation:**
- > 0.80: Thriving
- 0.65-0.80: Healthy
- 0.50-0.65: Needs attention
- < 0.50: Critical intervention

---

## Primary KPIs (Must Track)

### KPI-001: Day 1 Retention

**Definition:** Percentage of new players who return within 24 hours

**Target:** > 60%
**Current:** N/A (pre-launch)
**Measurement:** Daily, rolling 7-day average
**Owner:** BananaPM

**Segments:**
| Segment | Target | Priority |
|---------|--------|----------|
| All Players | > 60% | Primary |
| Mobile | > 55% | Secondary |
| Desktop | > 65% | Secondary |

**Actions:**
- < 50%: Investigate first session friction
- < 40%: Emergency UX review

---

### KPI-002: Day 7 Retention

**Definition:** Percentage of new players who return within 7 days

**Target:** > 30%
**Current:** N/A (pre-launch)
**Measurement:** Weekly
**Owner:** BananaPM

**Segments:**
| Segment | Target | Priority |
|---------|--------|----------|
| All Players | > 30% | Primary |
| Used Feedback | > 45% | Secondary |
| Multiplayer | > 40% | Secondary |

**Actions:**
- < 25%: Review AI opponent difficulty
- < 20%: Deep engagement analysis

---

### KPI-003: Session Length

**Definition:** Average session duration in minutes

**Target:** > 15 minutes
**Current:** N/A (pre-launch)
**Measurement:** Daily, rolling 7-day average
**Owner:** PrimateDesigner

**Distribution Targets:**
| Percentile | Target | Interpretation |
|------------|--------|----------------|
| p25 | > 5 min | Floor (casual) |
| p50 | > 12 min | Median |
| p75 | > 25 min | Engaged |
| p95 | > 60 min | Power users |

**Actions:**
- p50 < 10 min: Investigate game depth
- p95 < 30 min: Missing end-game hooks

---

### KPI-004: Agent Attribution Recognition

**Definition:** Percentage of players who know they're playing with AI agents

**Target:** > 80%
**Current:** N/A (pre-launch)
**Measurement:** User survey (monthly)
**Owner:** PrimateDesigner

**Survey Question:** "Did you know you were playing against AI agents?"
- Very surprised: 0%
- Somewhat aware: 25%
- Clearly aware: 75%
- Completely obvious: 100%

**Target:** > 75% "clearly aware" + "completely obvious"

**Actions:**
- < 70%: Increase agent visibility
- < 60%: Transparency audit

---

### KPI-005: Player Win Rate (vs AI)

**Definition:** Percentage of games where human players win

**Target:** 60-70%
**Current:** N/A (pre-launch)
**Measurement:** Daily, per game mode
**Owner:** MonkeyBuilder

**By Difficulty:**
| Difficulty | Target | Owner |
|------------|--------|-------|
| Easy | 75-85% | MonkeyBuilder |
| Medium | 60-70% | MonkeyBuilder |
| Hard | 40-50% | MonkeyBuilder |

**Actions:**
- > 80%: AI too easy
- < 40%: AI too hard
- Outside 60-70% for Medium: Re-tune

---

### KPI-006: Feedback Submission Rate

**Definition:** Percentage of sessions that include feedback submission

**Target:** > 5%
**Current:** N/A (pre-launch)
**Measurement:** Weekly
**Owner:** BananaPM

**Segments:**
| Category | Target | Priority |
|----------|--------|----------|
| All feedback | > 5% | Primary |
| Bug reports | > 1% | Secondary |
| Feature suggestions | > 2% | Secondary |

**Actions:**
- < 3%: Improve feedback discoverability
- < 1%: Friction analysis

---

## Secondary KPIs (Should Track)

### KPI-007: Feature Adoption Rate

**Definition:** Percentage of players who use newly shipped features

**Target:** > 70%
**Current:** N/A (pre-launch)
**Measurement:** Per feature, 7-day post-launch
**Owner:** PrimateDesigner

**By Feature Type:**
| Type | Target | Rationale |
|------|--------|-----------|
| Core gameplay | > 85% | Must-use |
| Quality of life | > 60% | Helpful |
| Experimental | > 30% | Optional |

**Actions:**
- < 50%: Feature discoverability review
- < 30%: Reconsider feature value

---

### KPI-008: Session Frequency

**Definition:** Average number of sessions per week per active player

**Target:** > 3 sessions/week
**Current:** N/A (pre-launch)
**Measurement:** Weekly
**Owner:** BananaPM

**Distribution:**
| Frequency | % of Players | Interpretation |
|-----------|--------------|----------------|
| Daily | > 10% | Power users |
| 3-6x/week | > 30% | Engaged |
| 1-2x/week | > 40% | Casual |
| < 1x/week | < 20% | At risk |

**Actions:**
- Daily < 10%: Add daily hooks
- < 1x/week > 25%: Re-engagement campaign

---

### KPI-009: Time to First Move

**Definition:** Seconds from landing page to first player action

**Target:** < 30 seconds (p50)
**Current:** N/A (pre-launch)
**Measurement:** Per session, percentile
**Owner:** MonkeyBuilder

**Targets:**
| Percentile | Target | Priority |
|------------|--------|----------|
| p25 | < 15s | Floor |
| p50 | < 30s | Primary |
| p75 | < 60s | Secondary |

**Actions:**
- p50 > 45s: Simplify first move
- p50 > 60s: Emergency optimization

---

### KPI-010: WebSocket Latency

**Definition:** End-to-end latency for multiplayer state sync

**Target:** < 100ms (p95)
**Current:** N/A (pre-launch)
**Measurement:** Per game session, percentile
**Owner:** ChaosArchitect

**Targets:**
| Percentile | Target | Priority |
|------------|--------|----------|
| p50 | < 50ms | Floor |
| p75 | < 75ms | Primary |
| p95 | < 100ms | Primary |

**Actions:**
- p95 > 150ms: Infrastructure review
- p95 > 200ms: Emergency scaling

---

### KPI-011: Game Completion Rate

**Definition:** Percentage of started games that reach a win/lose state

**Target:** > 99%
**Current:** N/A (pre-launch)
**Measurement:** Daily
**Owner:** MonkeyBuilder

**Actions:**
- < 98%: Investigate disconnects
- < 95%: Critical bug hunt

---

### KPI-012: Return to Specific Agent

**Definition:** Percentage of return players who play with the same agent

**Target:** > 40%
**Current:** N/A (pre-launch)
**Measurement:** Weekly
**Owner:** MonkeyBuilder

**Interpretation:**
- > 50%: Strong attachment
- 30-50%: Healthy attachment
- < 30%: Weak attachment

**Actions:**
- < 25%: Agent personality review
- < 15%: Agent differentiation audit

---

## Engineering Metrics

### ENG-001: Build Success Rate

**Definition:** Percentage of CI builds that pass

**Target:** > 95%
**Current:** N/A (pre-launch)
**Measurement:** Per build
**Owner:** ChaosArchitect

---

### ENG-002: Code Coverage

**Definition:** Percentage of code covered by tests

**Target:** > 80%
**Current:** N/A (pre-launch)
**Measurement:** Per PR
**Owner:** MonkeyBuilder

**By Type:**
| Type | Target | Rationale |
|------|--------|-----------|
| Core game logic | > 90% | Critical path |
| API endpoints | > 85% | External |
| UI components | > 70% | Visual |
| Utilities | > 80% | Shared |

---

### ENG-003: PR Review Time

**Definition:** Hours from PR open to merge

**Target:** < 24 hours
**Current:** N/A (pre-launch)
**Measurement:** Per PR
**Owner:** AlphaOrchestrator

**Actions:**
- > 48h: Review process audit
- > 72h: Escalate to AlphaOrchestrator

---

### ENG-004: Crash-Free Sessions

**Definition:** Percentage of sessions without crashes

**Target:** > 99.5%
**Current:** N/A (pre-launch)
**Measurement:** Daily
**Owner:** ChaosArchitect

---

### ENG-005: Error Rate

**Definition:** Errors per 1000 requests

**Target:** < 5
**Current:** N/A (pre-launch)
**Measurement:** Hourly
**Owner:** ChaosArchitect

---

## Agent-Specific Metrics

### AGENT-001: Agent Output Consistency

**Definition:** Percentage of agent runs that produce valid output

**Target:** 100%
**Current:** N/A (pre-launch)
**Measurement:** Per agent run
**Owner:** AlphaOrchestrator

**By Agent:**
| Agent | Target | Priority |
|-------|--------|----------|
| FounderAI | 100% | High |
| ChaosArchitect | 100% | High |
| CuriousGeorge | 100% | High |
| PrimateDesigner | 100% | High |
| BananaPM | 100% | High |
| MadChimp | 100% | High |
| MonkeyBuilder | 100% | Critical |

---

### AGENT-002: Contradiction Count

**Definition:** Number of active contradictions between agent outputs

**Target:** < 5
**Current:** N/A (pre-launch)
**Measurement:** Weekly
**Owner:** AlphaOrchestrator

**Actions:**
- > 10: Contradiction resolution sprint
- > 20: Human intervention required

---

### AGENT-003: Decision Cycle Time

**Definition:** Hours from agent outputs to AlphaOrchestrator decisions

**Target:** < 12 hours
**Current:** N/A (pre-launch)
**Measurement:** Per cycle
**Owner:** AlphaOrchestrator

---

## Dashboard Views

### Executive Dashboard (Weekly)

```
┌─────────────────────────────────────────────────────────────┐
│  PLAYER JOY SCORE        Day 1 Retention    Day 7 Retention │
│  0.72 🟢                 62% 🟢              32% 🟢          │
├─────────────────────────────────────────────────────────────┤
│  Session Length          Agent Recognition    Feedback Rate  │
│  17 min 🟢               84% 🟢              6.2% 🟢        │
├─────────────────────────────────────────────────────────────┤
│  Win Rate (Medium)       Feature Adoption    Active Players │
│  65% 🟢                  72% 🟢              1,234 🟢       │
└─────────────────────────────────────────────────────────────┘
```

### Engineering Dashboard (Daily)

```
┌─────────────────────────────────────────────────────────────┐
│  Build Success    Code Coverage    PR Review Time           │
│  98% 🟢           82% 🟢           18h 🟢                   │
├─────────────────────────────────────────────────────────────┤
│  Crash-Free       Error Rate       WebSocket Latency (p95)  │
│  99.8% 🟢         2.3/1k 🟢        78ms 🟢                  │
└─────────────────────────────────────────────────────────────┘
```

### Product Dashboard (Daily)

```
┌─────────────────────────────────────────────────────────────┐
│  Time to First Move    Game Completion    Session Frequency │
│  24s 🟢                99.5% 🟢           3.4/week 🟢       │
├─────────────────────────────────────────────────────────────┤
│  Return to Agent       Feature Shipped    Feedback Volume   │
│  45% 🟢                2 this week 🟢     89 submissions 🟢 │
└─────────────────────────────────────────────────────────────┘
```

## Alert Thresholds

### Red Alerts (Immediate Action)

| Metric | Threshold | Action |
|--------|-----------|--------|
| Day 1 Retention | < 40% | Emergency UX review |
| Game Completion | < 95% | Critical bug hunt |
| Crash-Free Sessions | < 99% | P0 incident |
| Contradiction Count | > 20 | Human intervention |

### Yellow Alerts (Investigate Within 24h)

| Metric | Threshold | Action |
|--------|-----------|--------|
| Day 7 Retention | < 20% | Engagement analysis |
| Win Rate (Medium) | < 40% or > 80% | AI tuning |
| WebSocket Latency p95 | > 150ms | Infrastructure review |
| PR Review Time | > 48h | Process audit |

---

## Reporting Schedule

| Report | Frequency | Owner | Audience |
|--------|-----------|-------|----------|
| Daily Metrics | Daily 8am UTC | AlphaOrchestrator | All agents |
| Weekly Executive | Monday 9am UTC | AlphaOrchestrator | All agents |
| Engineering Report | Daily 9am UTC | ChaosArchitect | Developers |
| Product Report | Friday 5pm UTC | BananaPM | Product team |
| Agent Health | Weekly | AlphaOrchestrator | AlphaOrchestrator |

---

*Generated: 2026-01-18*
*AlphaOrchestrator - Measuring what matters*
