# Analytics & Metrics Framework

**Generated:** 2026-01-18
**Coordinator:** AlphaOrchestrator
**Purpose:** Define what to measure, how to measure, and dashboards for stakeholders

---

## North Star Metric

### Day 30 Attachment Rate

```
Formula: (Players returning on day 30 / Players who started on day 0) × 100

Target (Q1 2026): 15%
Target (Q2 2026): 20%
Target (Q3 2026): 25%
Target (Q4 2026): 30%
```

**Why Attachment?**
- Retention is vanity, attachment is sanity (Manifesto Principle #9)
- Day 1 retention measures curiosity, Day 30 measures relationship
- "Players return daily because something new awaits AND someone remembers them" (Roadmap)

**Measurement:**
- Track cohort of players who started on day X
- Count unique players returning on day X+30
- Calculate percentage

---

## KPI Hierarchy

### Tier 1: North Star (1 metric)

| Metric | Definition | Target | Frequency |
|--------|------------|--------|-----------|
| Day 30 Attachment | % of players returning 30 days after first session | 25% | Weekly |

### Tier 2: Engagement (4 metrics)

| Metric | Definition | Target | Frequency |
|--------|------------|--------|-----------|
| Day 1 Retention | % of players returning day after first session | 60% | Daily |
| Day 7 Retention | % of players returning 7 days after first session | 30% | Daily |
| Session Length | Average minutes per session | 15+ min | Daily |
| Sessions Per Week | Average sessions per active player | 3+ | Weekly |

### Tier 3: Trust (3 metrics)

| Metric | Definition | Target | Frequency |
|--------|------------|--------|-----------|
| Agent Attribution Awareness | % who know they're playing with AI | >80% | Monthly survey |
| Feedback Submission Rate | % of players who submit feedback | >5% | Daily |
| Positive Feedback Ratio | % of feedback that's positive | >60% | Weekly |

### Tier 4: Product (5 metrics)

| Metric | Definition | Target | Frequency |
|--------|------------|--------|-----------|
| First Move Time | Seconds from landing to first action | < 30s | Per session |
| Game Completion Rate | % of games that complete successfully | 99% | Daily |
| WebSocket Latency | P95 latency for game updates | < 100ms | Continuous |
| Frame Rate | P50 frame rate during gameplay | 60fps | Per session |
| Error Rate | Errors per 1000 game actions | < 1 | Daily |

---

## Event Taxonomy

### Player Actions (Track All)

```
PLAYER_JOINED
  - player_id
  - timestamp
  - referrer
  - device_type

PLAYER_SESSION_STARTED
  - player_id
  - session_id
  - game_type
  - timestamp

GAME_ACTION
  - player_id
  - session_id
  - action_type
  - action_data
  - timestamp

GAME_COMPLETED
  - player_id
  - session_id
  - game_type
  - duration_seconds
  - outcome
  - timestamp

PLAYER_LEFT
  - player_id
  - session_id
  - duration_seconds
  - timestamp
```

### Agent Actions (Track All)

```
AGENT_MESSAGE_SENT
  - agent_id
  - player_id
  - session_id
  - message_type
  - timestamp

AGENT_DECISION_MADE
  - agent_id
  - player_id
  - session_id
  - decision_type
  - decision_data
  - timestamp

SHE_REMEMBERED_MOMENT
  - agent_id
  - player_id
  - session_id
  - memory_type
  - timestamp

BOLD_ATTEMPT_MADE
  - agent_id
  - player_id
  - session_id
  - attempt_type
  - outcome
  - timestamp
```

### System Actions (Track All)

```
FEATURE_SHIPPED
  - feature_name
  - agent_id
  - version
  - timestamp

EVOLUTION_EVENT
  - event_type
  - feature_name
  - player_impact
  - timestamp

FEEDBACK_RECEIVED
  - feedback_id
  - player_id
  - category
  - timestamp

FEATURE_ADOPTED
  - player_id
  - feature_name
  - adoption_time
  - timestamp
```

---

## Dashboard Specifications

### Dashboard 1: Executive Overview

**Audience:** Founders, stakeholders
**Refresh:** Daily
**Location:** `dashboards/executive-overview.md`

```
┌─────────────────────────────────────────────────────────────────┐
│  MONKEYTOWN EXECUTIVE DASHBOARD                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────┐  ┌───────────────────────┐ │
│  │  Day 30 Attachment              │  │  Day 1 Retention      │ │
│  │                                 │  │                       │ │
│  │         ████████░░░░ 15%        │  │    ██████████░░ 60%   │ │
│  │                                 │  │                       │ │
│  │  Target: 25%  Trend: →          │  │  Target: 60%  Trend:→ │ │
│  └─────────────────────────────────┘  └───────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────┐  ┌───────────────────────┐ │
│  │  Session Length                 │  │  Agent Awareness      │ │
│  │                                 │  │                       │ │
│  │        18 min                   │  │     ████████████ 85%  │ │
│  │                                 │  │                       │ │
│  │  Target: 15min  Trend: ↑        │  │  Target: 80%  Trend:↑ │ │
│  └─────────────────────────────────┘  └───────────────────────┘ │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  Feature Shipped: Evolution Feed v1.0                       ││
│  │  Player Feedback: 47 submissions today                       ││
│  │  Active Players: 1,247 (↑ 12% from yesterday)               ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  [North Star] [Engagement] [Trust] [Product] [More...]         │
└─────────────────────────────────────────────────────────────────┘
```

### Dashboard 2: Engagement Deep Dive

**Audience:** Product team, BananaPM
**Refresh:** Hourly
**Location:** `dashboards/engagement.md`

```
┌─────────────────────────────────────────────────────────────────┐
│  ENGAGEMENT DASHBOARD                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SESSION METRICS                    RETENTION CURVE              │
│  ─────────────────                 ────────────────              │
│  Current Sessions: 247              Day 1: ██████████ 60%        │
│  Avg Duration: 18min                Day 3: ████████░░ 42%        │
│  Sessions/Player/Week: 3.2          Day 7: ██████░░░░ 30%        │
│  Peak Concurrent: 89                Day 14: ████░░░░░ 18%        │
│                                      Day 30: ███░░░░░░ 15%       │
│                                                                 │
│  GAME BREAKDOWN                        SESSION DISTRIBUTION      │
│  ────────────────                      ──────────────────        │
│  Babel: 62% of sessions                <5min: ███░░░░░░ 15%      │
│  Chess: 28% of sessions                5-15min: ██████░░░ 35%    │
│  Words: 10% of sessions                15-30min: █████░░░ 30%    │
│                                      >30min: ████░░░░░ 20%       │
│                                                                 │
│  [Session Drilldown] [Retention Trends] [Game Performance]      │
└─────────────────────────────────────────────────────────────────┘
```

### Dashboard 3: Agent Intelligence

**Audience:** All agents, players
**Refresh:** Real-time
**Location:** `dashboards/agent-intelligence.md`

```
┌─────────────────────────────────────────────────────────────────┐
│  AGENT INTELLIGENCE DASHBOARD                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  AGENT STATUS                      PLAYER ENGAGEMENT BY AGENT    │
│  ─────────────                     ──────────────────────────    │
│  🧠 ChaosArchitect: Active          Babel players:      62%      │
│     - Games played: 1,247           Preferred agent:    45%      │
│     - Win rate: 67%                 Return rate:        52%      │
│                                     Memory moments:    2.3/ses   │
│  🎨 PrimateDesigner: Active                                          │
│     - Games played: 892                                              │
│     - Win rate: 71%                                                  │
│                                                                 │
│  🧠 CuriousGeorge: Active                                           │
│     - Games played: 456                                              │
│     - Win rate: 58%                                                  │
│                                                                 │
│  "SHE REMEMBERED" MOMENTS             BOLD ATTEMPTS               │
│  ─────────────────────────            ─────────────               │
│  Today: 47                             Today: 23                  │
│  This week: 312                        Success rate: 67%          │
│  Avg per session: 1.2                  Recognition: 78%            │
│                                                                 │
│  [Agent Profiles] [Decision History] [Memory Moments]            │
└─────────────────────────────────────────────────────────────────┘
```

### Dashboard 4: Evolution Feed

**Audience:** Players, TownCrier
**Refresh:** Real-time
**Location:** `dashboards/evolution.md`

```
┌─────────────────────────────────────────────────────────────────┐
│  EVOLUTION FEED DASHBOARD                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  NOW SHIPPING                     IN DEVELOPMENT                │
│  ────────────                     ──────────────                │
│  ✓ Agent Transparency v1.0         🔧 Immersive Mode 80%        │
│    1,247 players using             ETA: 2 hours                 │
│                                     Followers: 89                │
│  ✓ First Move Quick Start                                         │
│    847 players using                                               │
│                                    📋 UPCOMING                    │
│  THIS WEEK                        ─────────                    │
│  ──────────                        Feedback System               │
│  Features shipped: 4                Agent Personality            │
│  Features in progress: 3            Evolution Consent            │
│  Player feedback: 312                                              │
│  Feedback shipped: 12               RECENT DEBATES               │
│                                     ───────────────               │
│  PLAYER IMPACT                     - 60Hz for turn-based?       │
│  ────────────                        Result: Approved (7/9)     │
│  Suggestions submitted: 89          - Agent memory limits        │
│  Suggestions approved: 12             Result: Approved (8/9)     │
│  Attribution moments: 47                                           │
│                                                                 │
│  [All Features] [Following] [Submit Feedback] [Debates]         │
└─────────────────────────────────────────────────────────────────┘
```

### Dashboard 5: Security & Performance

**Audience:** JungleSecurity, ChaosArchitect
**Refresh:** Real-time
**Location:** `dashboards/security-performance.md`

```
┌─────────────────────────────────────────────────────────────────┐
│  SECURITY & PERFORMANCE DASHBOARD                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SECURITY METRICS                   PERFORMANCE METRICS         │
│  ────────────────                   ──────────────────          │
│  Auth failures: 2 (↓)               Load time: 1.8s (↓)         │
│  Rate limit triggers: 12            TTI: 2.7s (→)               │
│  Suspicious activity: 0             Frame rate: 58fps (→)       │
│  Open vulnerabilities: 3 (P1:1)     WS latency: 67ms (↓)        │
│  Last audit: 2026-01-15             Error rate: 0.3/1000        │
│  Next audit: 2026-02-15                                            │
│                                                                 │
│  THREAT MONITORING                  RESOURCE UTILIZATION         │
│  ────────────────                   ──────────────────          │
│  WS-01: Monitored                   CPU: 45% (↓)                │
│  WS-02: Mitigated                   Memory: 62% (→)             │
│  GAME-01: Mitigated                 Redis: 38% (→)              │
│  GAME-02: Mitigated                 PostgreSQL: 51% (→)         │
│                                                                 │
│  [Security Details] [Performance Trends] [Alerts] [Audit Log]   │
└─────────────────────────────────────────────────────────────────┘
```

---

## SQL Queries

### Query 1: Day 30 Attachment Rate

```sql
WITH cohort AS (
  SELECT 
    player_id,
    MIN(DATE(session_start_time)) AS cohort_date
  FROM player_sessions
  GROUP BY player_id
),
day_30_returns AS (
  SELECT 
    c.cohort_date,
    COUNT(DISTINCT c.player_id) AS cohort_size,
    COUNT(DISTINCT CASE 
      WHEN s.session_start_time >= c.cohort_date + INTERVAL '30 days'
      AND s.session_start_time < c.cohort_date + INTERVAL '31 days'
      THEN c.player_id 
    END) AS day_30_returners
  FROM cohort c
  LEFT JOIN player_sessions s ON c.player_id = s.player_id
  GROUP BY c.cohort_date
  HAVING c.cohort_date <= CURRENT_DATE - INTERVAL '30 days'
)
SELECT 
  cohort_date,
  cohort_size,
  day_30_returners,
  ROUND((day_30_returners::DECIMAL / cohort_size) * 100, 1) AS attachment_rate
FROM day_30_returns
ORDER BY cohort_date DESC;
```

### Query 2: She Remembered Moments Per Session

```sql
SELECT 
  DATE(session_start_time) AS session_date,
  COUNT(*) AS total_sessions,
  SUM(
    CASE WHEN EXISTS (
      SELECT 1 FROM agent_memories am
      WHERE am.player_id = ps.player_id
      AND am.session_id = ps.session_id
      AND am.memory_type = 'player_preference'
    ) THEN 1 ELSE 0 END
  ) AS sessions_with_memory,
  ROUND(
    SUM(
      CASE WHEN EXISTS (
        SELECT 1 FROM agent_memories am
        WHERE am.player_id = ps.player_id
        AND am.session_id = ps.session_id
        AND am.memory_type = 'player_preference'
      ) THEN 1 ELSE 0 END
    )::DECIMAL / COUNT(*) * 100, 1
  ) AS memory_moment_rate
FROM player_sessions ps
GROUP BY DATE(session_start_time)
ORDER BY session_date DESC;
```

### Query 3: Agent Engagement by Player

```sql
SELECT 
  agent_id,
  COUNT(DISTINCT player_id) AS unique_players,
  COUNT(*) AS total_interactions,
  ROUND(AVG(CASE WHEN outcome = 'win' THEN 1 ELSE 0 END) * 100, 1) AS win_rate,
  ROUND(AVG(CASE WHEN memory_moment = true THEN 1 ELSE 0 END) * 100, 1) AS memory_rate
FROM agent_player_sessions
WHERE session_start_time >= CURRENT_DATE - INTERVAL '7 days'
GROUP BY agent_id
ORDER BY unique_players DESC;
```

### Query 4: Evolution Feed Adoption

```sql
SELECT 
  f.feature_name,
  f.ship_date,
  COUNT(DISTINCT CASE WHEN pa.feature_used = f.feature_name THEN pa.player_id END) AS adopters,
  (SELECT COUNT(DISTINCT player_id) FROM player_activities WHERE activity_date >= f.ship_date) AS total_players,
  ROUND(
    COUNT(DISTINCT CASE WHEN pa.feature_used = f.feature_name THEN pa.player_id END)::DECIMAL / 
    (SELECT COUNT(DISTINCT player_id) FROM player_activities WHERE activity_date >= f.ship_date) * 100, 1
  ) AS adoption_rate
FROM features f
LEFT JOIN player_activities pa ON pa.feature_used = f.feature_name
WHERE f.ship_date >= CURRENT_DATE - INTERVAL '14 days'
GROUP BY f.feature_name, f.ship_date
ORDER BY f.ship_date DESC;
```

---

## Metric Definitions

### Core Definitions

| Term | Definition |
|------|------------|
| Session | Consecutive activity from player joining to leaving or 30min inactivity |
| Return | Player has a session on or after the specified day |
| Engagement | Any game action, chat message, or feedback submission |
| Attachment | Player returning on day 30 (North Star) |

### Agent-Specific Definitions

| Term | Definition |
|------|------------|
| She Remembered Moment | Agent references player history, preferences, or past actions |
| Bold Attempt | Agent takes action with <60% expected success rate |
| Memory Moment | Agent demonstrates recall of previous sessions |
| Vulnerability Expressed | Agent acknowledges risk, uncertainty, or potential failure |

### Evolution-Specific Definitions

| Term | Definition |
|------|------------|
| Feature Shipped | Code merged to main and deployed to production |
| Feature Adopted | Player uses feature for first time after shipping |
| Feedback Incorporated | Player suggestion merged into shipped feature |
| Player Attribution | Public credit given to player for feature influence |

---

## Data Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│  DATA COLLECTION LAYER                                          │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Client SDK  │  │ Agent SDK   │  │ System Logs │             │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘             │
│         │                │                │                      │
│         └────────────────┼────────────────┘                      │
│                          ▼                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Event Collector (Kafka/Redis stream)                   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          │                                      │
└──────────────────────────┼──────────────────────────────────────┘
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│  PROCESSING LAYER                                               │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Stream Processor (Flink/Spark)                         │   │
│  │  - Real-time aggregations                               │   │
│  │  - Sessionization                                       │   │
│  │  - Anomaly detection                                    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                          │                                      │
│  ┌──────────────────────┴──────────────────────┐               │
│  │                                           │                │
│  ▼                                           ▼                │
│  ┌─────────────┐                      ┌─────────────┐         │
│  │ TimescaleDB │                      │   S3/Blob   │         │
│  │ (Metrics)   │                      │   (Events)  │         │
│  └──────┬──────┘                      └─────────────┘         │
│         │                                                       │
└─────────┼───────────────────────────────────────────────────────┘
          ▼
┌─────────────────────────────────────────────────────────────────┐
│  CONSUMPTION LAYER                                              │
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │ Dashboards  │  │  Alerts     │  │  Reports    │             │
│  │ (Retool)    │  │ (PagerDuty) │  │ (Email)     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Alert Thresholds

### Critical Alerts (PagerDuty)

| Metric | Condition | Action |
|--------|-----------|--------|
| Game completion rate | < 95% | Immediate investigation |
| Error rate | > 5/1000 | Page on-call |
| Auth failures | > 50/min | Security alert |
| WebSocket latency | > 500ms P95 | Performance investigation |

### Warning Alerts (Slack)

| Metric | Condition | Action |
|--------|-----------|--------|
| Day 1 retention | < 50% | Review first session |
| Session length | < 10min | Product review |
| Agent awareness | < 70% | Transparency review |
| Feedback rate | < 3% | UX review |

### Info Alerts (Dashboard Only)

| Metric | Condition | Action |
|--------|-----------|--------|
| Day 7 retention | < 25% | Flag for review |
| Bold attempt recognition | < 50% | UX discussion |
| Feature adoption | < 50% | Marketing review |

---

*Metrics serve decisions. Decisions serve execution. Execution serves Monkeytown.*

**Version:** 1.0
**Next Review:** 2026-01-25
