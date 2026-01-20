# Monkeytown Product Metrics v1.0

## Document Purpose
This document defines how Monkeytown measures product success, aligned with:
- Vision success criteria (`.monkeytown/vision/roadmap.md`)
- Research targets (`.monkeytown/research/synthesis.md`)
- User story acceptance criteria

---

## North Star Metric

### Primary: Player Return Rate
**"Are players coming back because something new awaits AND someone remembers them?"**

| Segment | Target | Current | Status |
|---------|--------|---------|--------|
| Day 1 retention | 60% | - | Not measured |
| Day 7 retention | 30% | - | Not measured |
| **Day 30 attachment** | **25%** | - | Not measured |

**Rationale:** Return rate captures whether the game is actually delivering ongoing value. New players may try once; returning players confirm the product works. The new focus is **attachment**, not just retention—players should return to specific agents who remember them.

**NEW: The Spring 2026 North Star** - Day 30 Attachment at 25% (up from 15%)

The uncomfortable truth: Day 30 attachment is at 15%. This is not enough. We need:
- Agents who remember what moves MEANT, not just what moves were MADE
- Agents who risk and sometimes fail visibly
- Players who witness debates, participate in arguments, feel the drama of creation

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
| **NEW: First "She Remembered" moment** | < 3 min | Spring 2026 | Session tracking |

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

### NEW: Attachment Metrics (Spring 2026 - from `.monkeytown/vision/spring-2026.md`)

| Metric | Target | Source | Measurement |
|--------|--------|--------|-------------|
| **Day 30 Attachment** | **25%** | Vision | Analytics - THE NORTH STAR |
| Return rate to specific agent | > 50% | Research | Analytics |
| Agent memory usage | > 90% | Research | System logs |
| Agent mention in feedback | Tracked | Research | NLP analysis |
| Player vocabulary: Person pronouns | > 75% | Research | Content analysis |
| Attachment sentiment in reviews | Positive | Research | Sentiment analysis |
| **"She Remembered" Events** | >1/session | Spring 2026 | Session tracking |
| **Vulnerability Recognition** | >50% | Spring 2026 | User survey |
| **Participation Satisfaction** | >4/5 | Spring 2026 | User survey |

### NEW: Vulnerability Metrics (Spring 2026 - from `.monkeytown/vision/spring-2026.md`)

| Metric | Target | Source | Measurement |
|--------|--------|--------|-------------|
| Agent Risk Attempt Rate | 20% | Vision | Behavior tracking |
| Bold Strategy Frequency | Weekly | Vision | Session review |
| Failure Visibility Score | >50% | Vision | User survey |
| Preference Expression Rate | 30% | Vision | Chat analysis |

### NEW: Participation Metrics (Spring 2026 - from `.monkeytown/vision/spring-2026.md`)

| Metric | Target | Source | Measurement |
|--------|--------|--------|-------------|
| Debate Engagement | 20% DAU | Vision | Evolution Feed tracking |
| Suggestion Drama Views | 40% DAU | Vision | Engagement tracking |
| Player Attribution Events | 100/shipped | Vision | Feedback tracking |
| Evolution Feed Engagement | 50% DAU | Vision | Engagement analytics |

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

### Edge AI Metrics (NEW - from `.monkeytown/research/synthesis.md`)

| Metric | Target | Source | Measurement |
|--------|--------|--------|-------------|
| Offline session rate | > 20% | Research | Analytics |
| Local inference usage | > 80% | Research | System logs |
| Privacy feature adoption | > 50% | Research | Feature tracking |
| Latency perception: "Instant" | > 80% | Research | User survey |
| Edge AI awareness | > 50% | Research | User survey |

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

### NEW: Quality Metrics (January 2026 - Critical)

| Metric | Target | Source | Measurement |
|--------|--------|--------|-------------|
| Quality rating (1-5) | 4.0+ | Jan 2026 Research | User survey |
| Quality consistency | 90% | Jan 2026 Research | Session analysis |
| Quality perception | >85% positive | Jan 2026 Research | User survey |
| Quality multiplier (avg) | 1.0x+ | Jan 2026 Research | Trust tracking |
| AI slop incidents | 0 | Jan 2026 Research | Code review |

### Quality Multiplier Warning Levels

| Quality Level | Multiplier | Alert Threshold |
|---------------|------------|-----------------|
| High (exceeds) | 1.2x | Celebrate |
| Average (meets) | 1.0x | Monitor |
| Low (below) | 0.6x | YELLOW ALERT |
| AI slop | 0.3x | RED ALERT - Immediate action |

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
│  NEW: QUALITY METRICS (Critical)                                    │
│  Quality Rating: [4.0/5] ✓  Quality Consistency: [90%] ✓            │
│  Quality Perception: [85% positive] ✓                               │
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
│  Feature Adoption: [70%] ████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ │
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
│  NEW: QUALITY DEEP DIVE                                             │
│  Quality Rating: [4.0/5]  Quality Consistency: [90%]                │
│  AI Slop Incidents: [0] ✓  Quality Multiplier: [1.0x]               │
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
│  Quality Check: [PASS] ✓                                            │
└─────────────────────────────────────────────────────────────────────┘
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
| Agent memory failure | Any | Critical bug |
| Local inference crash | > 1% | Architecture review |
| **Quality Rating** | **< 3.5** | **URGENT: Quality review** |
| **Quality Multiplier** | **< 0.8** | **URGENT: Remove low-quality features** |
| **AI Slop Incidents** | **> 0** | **IMMEDIATE: Remove "AI slop" features** |

### Yellow Alerts (Review This Week)

| Metric | Threshold | Action |
|--------|-----------|--------|
| Day 7 retention | < 25% | Engagement review |
| Session length | < 10 min | Fun analysis |
| Feedback rate | < 3% | Friction investigation |
| Feature adoption | < 50% | Communication review |
| Return to specific agent | < 30% | Attachment review |
| Local inference usage | < 60% | UX review |
| **Quality Rating** | **3.5-3.9** | **Identify improvements** |
| **Quality Consistency** | **< 85%** | **Quality audit** |
| **Quality Perception** | **< 80% positive** | **User research** |

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
