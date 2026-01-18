# Monkeytown Product Metrics v1.0

## Document Purpose
This document defines how Monkeytown measures product success, aligned with:
- Vision success criteria (`.monkeytown/vision/roadmap.md`)
- Research targets (`.monkeytown/research/synthesis.md`)
- User story acceptance criteria

---

## North Star Metric

### Primary: Player Return Rate
**"Are players coming back because something new awaits?"**

| Segment | Target | Current | Status |
|---------|--------|---------|--------|
| Day 1 retention | 60% | - | Not measured |
| Day 7 retention | 30% | - | Not measured |
| Day 30 retention | 15% | - | Not measured |

**Rationale:** Return rate captures whether the game is actually delivering ongoing value. New players may try once; returning players confirm the product works.

---

## Engagement Metrics

### Session Metrics

| Metric | Target | Source | Measurement |
|--------|--------|--------|-------------|
| Session length | > 15 min | Research | Time tracking |
| Sessions per week | 3+ | Research | Event tracking |
| First session completion | > 80% | User Flows | Session analytics |
| Time to first move | < 30 sec | User Flows | Performance monitoring |
| First success moment | < 3 min | User Flows | Session replay |

### Progression Metrics

| Metric | Target | Source | Measurement |
|--------|--------|--------|-------------|
| XP earned per session | > 100 XP | User Stories | Backend tracking |
| Level-ups per week | > 3 | User Stories | Progression system |
| Achievement completion | > 50% | User Stories | Achievement system |
| Unlocks utilized | > 70% | Requirements | Feature adoption |

---

## Trust Metrics

### AI Transparency

| Metric | Target | Source | Measurement |
|--------|--------|--------|-------------|
| Agent attribution recognition | > 80% | Research | User survey |
| Agent name recall | > 50% | User Stories | User survey |
| Transparency satisfaction | > 4/5 | User Stories | NPS follow-up |
| AI nature awareness | 100% | Requirements | User survey |

### Player Voice

| Metric | Target | Source | Measurement |
|--------|--------|--------|-------------|
| Feedback submission rate | > 5% | Research | Analytics |
| Feedback satisfaction | > 4/5 | User Stories | Post-feedback survey |
| Feedback implementation recognition | > 70% | User Stories | User survey |
| Community engagement rate | > 20% | User Stories | Event tracking |

---

## Agent Metrics

### Agent Activity

| Metric | Target | Measurement |
|--------|--------|-------------|
| Features shipped per month | > 10 | Version tracking |
| Agent decision rate | Daily | System logs |
| Cross-agent coordination | Visible | File commits |
| Emergent behavior occurrences | Monthly | Session review |

### Agent Effectiveness

| Metric | Target | Measurement |
|--------|--------|-------------|
| AI opponent challenge rating | 60-70% win rate | Win/loss analytics |
| AI decision explainability | > 70% comprehension | User survey |
| Agent personality recognition | > 70% | User survey |
| Agent helpfulness rating | > 4/5 | In-game feedback |

---

## Evolution Metrics

### Feature Adoption

| Metric | Target | Measurement |
|--------|--------|-------------|
| New feature discovery rate | > 70% | Feature tracking |
| Feature utilization rate | > 70% | Feature analytics |
| Evolution feed engagement | > 50% daily active users | Engagement tracking |
| Version upgrade adoption | > 80% within 7 days | Version tracking |

### Feedback Loop

| Metric | Target | Measurement |
|--------|--------|-------------|
| Feedback submitted → acknowledged | < 24 hours | System timestamps |
| Feedback acknowledged → reviewed | < 72 hours | Workflow tracking |
| Feedback reviewed → implemented | < 2 weeks | Sprint tracking |
| Player notification on implementation | 100% | Notification tracking |

---

## Competitive Metrics

### Market Position

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to first move advantage | < competitor average | Benchmarking |
| Agent transparency leadership | Only provider | Competitive analysis |
| AI opponent quality rating | > competitors | User surveys |
| Evolution velocity | > industry average | Feature tracking |

### Differentiation

| Metric | Target | Measurement |
|--------|--------|-------------|
| "Why did you choose Monkeytown?" | "AI agents" mentioned | User survey |
| Competitor comparison | Monkeytown preferred | User surveys |
| AI transparency satisfaction | Highest in category | Industry benchmarks |

---

## Technical Metrics

### Performance (NFR-001)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Initial load | < 2 seconds | Performance monitoring |
| Time to interactive | < 3 seconds | Performance monitoring |
| Game loop refresh | 60 Hz | Automated testing |
| Transition duration | ≤ 300 ms | Performance monitoring |
| WebSocket latency | < 100 ms | Network monitoring |

### Reliability (NFR-003)

| Metric | Target | Measurement |
|--------|--------|-------------|
| System uptime | 99% | Uptime monitoring |
| Game completion rate | 99% | Error tracking |
| Data integrity | 100% | Integrity checks |
| Error recovery time | < 5 minutes | Incident tracking |

### Accessibility (NFR-002)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Color contrast compliance | 100% | Automated audit |
| Keyboard navigation | All flows | Accessibility testing |
| Screen reader compatibility | Core flows | Accessibility testing |
| Motion preference support | 100% | Automated testing |

---

## Funnel Metrics

### Acquisition Funnel

| Stage | Metric | Target | Current |
|-------|--------|--------|---------|
| Landing | Unique visitors | - | Not measured |
| Interest | Click "Jump In" | > 70% | Not measured |
| Engagement | Complete first session | > 80% | Not measured |
| Retention | Day 1 return | > 60% | Not measured |

### Activation Funnel

| Stage | Metric | Target | Current |
|-------|--------|--------|---------|
| First game | Complete first game | > 90% | Not measured |
| First feedback | Submit feedback | > 5% | Not measured |
| First progression | Earn first achievement | > 50% | Not measured |
| First return | Day 7 return | > 30% | Not measured |

---

## Qualitative Metrics

### User Research

| Metric | Frequency | Method |
|--------|-----------|--------|
| User interviews | Monthly | 10 users per cohort |
| Usability testing | Per major feature | 5 users per test |
| NPS surveys | Quarterly | All active users |
| Feature feedback | Per release | Beta testers |

### Community Sentiment

| Metric | Target | Measurement |
|--------|--------|-------------|
| Reddit/Discord sentiment | > 70% positive | Sentiment analysis |
| Feature request sentiment | > 60% hopeful | Qualitative analysis |
| Bug report tone | Cooperative | Qualitative analysis |
| Community size growth | 10% month-over-month | Tracking |

---

## Dashboard Layout

### Executive Dashboard (Daily)

```
┌─────────────────────────────────────────────────────────────────────┐
│  NORTH STAR                                                        │
│  Day 1 Retention: [60%] ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  Day 7 Retention: [30%] ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                                                      │
│  SESSION HEALTH                                                    │
│  Avg Session: [15m] ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  Sessions/Week: [3]  ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                                                      │
│  AI TRANSPARENCY                                                   │
│  Agent Awareness: [80%] ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  Feedback Rate: [5%]  ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│                                                                      │
│  EVOLUTION                                                         │
│  Features This Month: [10] ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
│  Feature Adoption: [70%] ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
└─────────────────────────────────────────────────────────────────────┘
```

### Product Deep Dive (Weekly)

```
┌─────────────────────────────────────────────────────────────────────┐
│  USER STORIES PROGRESS                                              │
│  P0 Complete: [5/5]  ████████████████████████████████████████████  │
│  P1 Complete: [3/5]  ██████████████████████░░░░░░░░░░░░░░░░░░░░░░░  │
│  P2 Complete: [1/5]  ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                                                      │
│  FUNNEL CONVERSION                                                  │
│  Landing → Jump In: [70%] → First Session: [80%] → Day 1: [60%]     │
│                                                                      │
│  AI PERFORMANCE                                                     │
│  Win Rate: [65%] ████████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│  Decision Time: [1.2s] ✓                                            │
│  Explainability: [72%] ✓                                            │
│                                                                      │
│  TECHNICAL                                                          │
│  Uptime: [99.9%] ✓    Load: [1.8s] ✓    Latency: [45ms] ✓           │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Alert Thresholds

### Red Alerts (Immediate Action)

| Metric | Threshold | Action |
|--------|-----------|--------|
| Day 1 retention | < 50% | Investigate first session |
| Uptime | < 99% | Incident response |
| Game completion | < 95% | Bug investigation |
| AI win rate | < 50% or > 80% | Balance adjustment |

### Yellow Alerts (Review This Week)

| Metric | Threshold | Action |
|--------|-----------|--------|
| Day 7 retention | < 25% | Engagement review |
| Session length | < 10 min | Fun analysis |
| Feedback rate | < 3% | Friction investigation |
| Feature adoption | < 50% | Communication review |

---

## Reporting Cadence

| Report | Audience | Frequency | Content |
|--------|----------|-----------|---------|
| Daily metrics | Product team | Daily | Dashboard snapshot |
| Weekly summary | All agents | Weekly | Trends, alerts |
| Sprint review | Stakeholders | Bi-weekly | Progress vs backlog |
| Monthly report | Public | Monthly | Blog post, community update |
| Quarterly review | Leadership | Quarterly | Strategic assessment |

---

*Metrics serve decisions. Decisions serve evolution. Evolution serves players. Players serve Monkeytown.*

**Version:** 1.0
**Generated:** 2026-01-18
**Sources:** vision/, research/, user-stories/, requirements/
