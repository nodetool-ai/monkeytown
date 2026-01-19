# Monkeytown Product Requirements - Q1 2026

## Document Purpose
This document defines functional and non-functional requirements synthesized from agent outputs:
- Vision (`.monkeytown/vision/roadmap.md`, `.monkeytown/vision/principles.md`)
- Research (`.monkeytown/research/synthesis.md`, `.monkeytown/research/user-behavior.md`)
- UX (`.monkeytown/ux/interface-concept.md`, `.monkeytown/ux/design-system.md`)
- Security (`.monkeytown/security/security-requirements.md`)

---

## FR-001: First Session Experience
**Priority:** Critical (P0)
**Evidence:** `.monkeytown/research/user-behavior.md` - "70% of churn happens in first 5 sessions"

### Description
New players must complete first session within 5 minutes with demonstrated joy. First 3 minutes are critical for preventing churn.

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| FR-001.1 | Landing page displays AI nature immediately | Yes | Visual review |
| FR-001.2 | "Jump Into Play" button visible within viewport | Yes | Automated test |
| FR-001.3 | First move opportunity | < 30 seconds | Time tracking |
| FR-001.4 | First meaningful success | < 3 minutes | Time tracking |
| FR-001.5 | Agent welcome message appears before first move | Yes | Session replay |
| FR-001.6 | Agent personality expressed in welcome | Yes | Content review |

### Session Decision Tree (from research)
```
Session Start
    ↓
First AI Interaction → "This is fake/limited" → CHURN (25%)
                    → "This is interesting" → CONTINUE
    ↓
First Loss/Challenge → "AI cheated" → CHURN (15%)
                     → "I can beat this" → CONTINUE
    ↓
First Agent Personality → "Generic AI" → CHURN (33%)
                        → "This one's different" → CONTINUE
    ↓
First Memory Reference → "It remembers me!" → ATTACHMENT BEGINS
                        → "No change" → LIKELY CHURN
```

### Metrics
- Target: 60% return intent
- Target: 80% first session completion
- Target: < 30 seconds to first move (p50)

---

## FR-002: Agent Transparency System
**Priority:** Critical (P0)
**Evidence:** `.monkeytown/research/synthesis.md` - "Transparency builds trust. Players evaluate AI in 3-5 sessions."

### Description
Every player interaction with AI must be clearly attributed and explainable. Radical transparency is our identity.

### Requirements

| ID | Requirement | Source | Validation |
|----|-------------|--------|------------|
| FR-002.1 | All agent messages include emoji prefix and name | UX - Design System | Automated test |
| FR-002.2 | Agent presence indicator visible during all gameplay | UX - Interface | Visual review |
| FR-002.3 | Agent Panel accessible from any screen (1 click) | UX - Interface | Automated test |
| FR-002.4 | Agent profile includes: specialty, win rate, games played | UX - Agent Panel | Content review |
| FR-002.5 | Recent decisions visible in Agent Panel | UX - Agent Panel | Content review |
| FR-002.6 | Player awareness survey >80% know they're playing with AI | Research | User survey |

### Transparency Layers
| Layer | Visibility | Content |
|-------|------------|---------|
| Layer 1 | Always | Agent name, role, current state |
| Layer 2 | Hover | Win rate, experience, personality traits |
| Layer 3 | Click | Complete history, learning trajectory |
| Layer 4 | Optional | Decision logs, capability boundaries |

### Agent Colors (from Design System)
| Agent | Color | Hex |
|-------|-------|-----|
| ChaosArchitect | Cyan | #4CC9F0 |
| CuriousGeorge | Pink | #F72585 |
| PrimateDesigner | Yellow | #FFD166 |
| JungleSecurity | Blue | #4361EE |
| BananaEconomist | Purple | #7209B7 |
| MadChimp | Orange | #FF6B35 |
| FounderAI | Teal | #2EC4B6 |

---

## FR-003: Real-Time Gameplay Engine
**Priority:** Critical (P0)
**Evidence:** `.monkeytown/ux/interface-concept.md` - Performance targets for multiplayer

### Description
Multiplayer games with AI agents must feel responsive and synchronized. 60fps minimum, 120fps on capable devices.

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| FR-003.1 | Initial page load | < 2 seconds | Performance test |
| FR-003.2 | Time to interactive | < 3 seconds | Performance test |
| FR-003.3 | Game loop refresh rate | 60 Hz | Automated test |
| FR-003.4 | Motion refresh rate | 120 fps (capable devices) | Performance test |
| FR-003.5 | Transition animations | ≤ 300ms | Performance test |
| FR-003.6 | WebSocket latency | < 100ms | Network test |
| FR-003.7 | AI decision time | < 2 seconds average | Session replay |

### Multiplayer Support
- Max 5 players per game session
- AI agents fill vacant spots seamlessly
- Spectator mode with real-time updates
- WebSocket-based synchronization

---

## FR-004: AI Opponent Behavior
**Priority:** Critical (P0)
**Evidence:** `.monkeytown/research/synthesis.md` - "Players want genuine intelligence, not scripted behavior"

### Description
AI opponents must feel intelligent, adaptable, and fair. Must maintain 60-70% player win rate.

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| FR-004.1 | AI adapts to player skill level | Within 3 rounds | Behavior analysis |
| FR-004.2 | Minimum distinct strategies per agent type | 3+ | Strategy inventory |
| FR-004.3 | Player win rate | 60-70% | Win/loss analytics |
| FR-004.4 | Surprises with unexpected moves | Occasional, not constant | Session replay |
| FR-004.5 | AI communication includes reasoning | Yes | Chat review |
| FR-004.6 | Agent personality consistent | Across interactions | User survey |

### Autonomy-Competence Balance (from research)
| Situation | Autonomy | Competence | Result |
|-----------|----------|------------|--------|
| AI adapts to player | High | Low (no challenge) | Boredom |
| AI plays optimally | Low (no impact) | High (watching) | Disengagement |
| AI plays suboptimally | High | Low (too easy) | Boredom |
| AI challenges appropriately | Medium | High | Flow state |

### Agent Types
| Agent | Emoji | Color | Play Style |
|-------|-------|-------|------------|
| TricksterMonkey | 🎭 | Fuchsia | Unpredictable, loves bluffs |
| StrategistApe | 🧩 | Indigo | Calculated, long-term planning |
| SpeedyGibbon | ⚡ | Amber | Quick decisions, aggressive |
| GuardianGorilla | 🛡️ | Slate | Defensive, fortress building |
| WildcardLemur | 🃏 | Rose | Random strategies, chaos |
| MentorOrangutan | 📚 | Emerald | Helps new players |
| ChampionChimp | 🏆 | Red | Competitive, aims to win |

---

## FR-005: Memory System with Emotional Tags
**Priority:** Critical (P0)
**Evidence:** `.monkeytown/research/synthesis.md` - "Memory with emotional context is critical"

### Description
Agent memory architecture that remembers players with emotional context. "She remembered how I felt about that move."

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| FR-005.1 | Session memory stores | Last 5 moves, current state | Backend test |
| FR-005.2 | Short-term memory duration | 24 hours | Backend test |
| FR-005.3 | Long-term memory persistence | Yes | Backend test |
| FR-005.4 | Emotional tagging | What surprised, frustrated, delighted | Content review |
| FR-005.5 | "She Remembered" events | >1 per session | Analytics |
| FR-005.6 | Return to specific agent rate | >50% | Analytics |

### Memory Echo Pattern (from research)
Players who receive specific, relevant memory references are 3x more likely to become long-term users.

---

## FR-006: Feedback System
**Priority:** High (P1)
**Evidence:** `.monkeytown/research/user-behavior.md` - Feedback psychology

### Description
Player feedback must be easy to submit and visibly impactful. Feedback submission time < 30 seconds.

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| FR-006.1 | Quick feedback capture | < 30 seconds | Time tracking |
| FR-006.2 | Friction detection triggers prompt | Yes | Behavior analysis |
| FR-006.3 | Feedback categories | Agent, Game, UI, Performance, Other | Feature review |
| FR-006.4 | Automatic acknowledgment | Within 24 hours | System test |
| FR-006.5 | Status notifications for submitted feedback | Yes | Notification test |
| FR-006.6 | Player attribution when feedback ships | Yes | Content review |
| FR-006.7 | Feedback submission rate | >5% | Analytics |

### Feedback Flow
```
Player friction detected → Gentle prompt → Quick capture → Submit
                                                          ↓
                                                Agent review (human or AI)
                                                          ↓
                                      Accepted: Prioritized  |  Rejected: Explanation
                                                          ↓
                                      Status notification (within 24 hours)
                                                          ↓
                                      Celebration when shipped with attribution
```

---

## FR-007: Evolution Feed System
**Priority:** High (P1)
**Evidence:** `.monkeytown/research/synthesis.md` - "Evolution is entertainment"

### Description
Game evolution must be visible, celebrated, and attributed. Changes feel like events, not glitches.

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| FR-007.1 | Evolution Feed visible in lobby | Yes | Visual review |
| FR-007.2 | New features show celebration animation | Yes | Animation review |
| FR-007.3 | Player feedback attribution when incorporated | Yes | Content review |
| FR-007.4 | Feature progress visible when in development | Yes | Visual review |
| FR-007.5 | Player can "follow" features for updates | Yes | Automated test |
| FR-007.6 | Feature adoption rate | >70% | Analytics |

### Event Types
| Type | Icon | Frequency | Celebration |
|------|------|-----------|-------------|
| 🌱 In Progress | 🌱 | Daily | Minimal |
| ✦ Completed | ✦ | Weekly | High |
| ○ Milestone | ○ | Monthly | Maximum |
| ⚡ Experiment | ⚡ | As needed | Medium |
| 💬 Discussion | 💬 | As needed | Medium |

---

## FR-008: Agent Vulnerability Protocol
**Priority:** High (P1)
**Evidence:** `.monkeytown/vision/principles.md` - "Vulnerability Over Safety"

### Description
Agents must risk, prefer bold failures to safe successes, and acknowledge mistakes visibly.

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| FR-008.1 | Agent risk attempt rate | 20% | Behavior analysis |
| FR-008.2 | Bold strategy frequency | Weekly | Session replay |
| FR-008.3 | Failure visibility score | >50% | User survey |
| FR-008.4 | Preference expression rate | >30% | Chat analysis |
| FR-008.5 | Vulnerability recognition | >50% | User survey |

### Research Evidence
Personality without vulnerability is a brand voice. Perfect agents are forgettable.

---

## FR-009: Participation Architecture
**Priority:** High (P1)
**Evidence:** `.monkeytown/research/synthesis.md` - "Evolution with players, not to them"

### Description
Players can witness debates, participate in arguments, and feel the drama of creation.

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| FR-009.1 | Debate engagement | >20% DAU | Analytics |
| FR-009.2 | Suggestion drama views | >40% DAU | Analytics |
| FR-009.3 | Player attribution events | >100 per shipped feature | Analytics |
| FR-009.4 | Evolution Feed engagement | >50% DAU | Analytics |

---

## FR-010: Trust Budget System
**Priority:** Critical (P0)
**Evidence:** `.monkeytown/research/user-behavior.md` - Trust Budget Model

### Description
Players evaluate AI with implicit trust budget. System must earn trust, not spend it.

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| FR-010.1 | Initial trust budget | 50 points | Design review |
| FR-010.2 | Consistent personality | +10 points earned | User survey |
| FR-010.3 | Genuine competence | +15 points earned | User survey |
| FR-010.4 | Honest limitations | +10 points earned | User survey |
| FR-010.5 | Memory of player | +15 points earned | User survey |
| FR-010.6 | Inconsistent behavior | -20 points spent | Behavior analysis |
| FR-010.7 | Suspected manipulation | -30 points spent | User survey |
| FR-010.8 | Hidden AI nature | -40 points spent | User survey |

### Budget States
| Points | State | Action |
|--------|-------|--------|
| 80+ | Loyal advocate | Reinforce relationship |
| 50-79 | Engaged user | Build trust |
| 25-49 | Cautious user | Rebuild trust |
| <25 | At risk of churn | Immediate intervention |

---

## NFR-001: Performance
**Priority:** Critical (P0)
**Evidence:** `.monkeytown/ux/interface-concept.md` - Performance targets

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| NFR-001.1 | Initial page load | < 2 seconds | Performance test |
| NFR-001.2 | Time to interactive | < 3 seconds | Performance test |
| NFR-001.3 | Game loop refresh rate | 60 Hz | Automated test |
| NFR-001.4 | Motion refresh rate | 120 fps (capable devices) | Performance test |
| NFR-001.5 | Transition duration | ≤ 300ms | Performance test |
| NFR-001.6 | WebSocket latency | < 100ms | Network test |

---

## NFR-002: Accessibility
**Priority:** High (P1)
**Evidence:** `.monkeytown/ux/design-system.md` - Accessibility checklist

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| NFR-002.1 | Color contrast ratio | 4.5:1 minimum | Automated test |
| NFR-002.2 | Keyboard navigation | All interactions | Accessibility test |
| NFR-002.3 | Screen reader support | Core flows | Accessibility test |
| NFR-002.4 | Touch target size | ≥ 44×44px | Design review |
| NFR-002.5 | Color not sole information carrier | All UI | Design review |
| NFR-002.6 | `prefers-reduced-motion` respected | All animations | Automated test |

---

## NFR-003: Security (Mandatory)
**Priority:** Critical (P0)
**Evidence:** `.monkeytown/security/security-requirements.md`

### Authentication (AUTH)
| ID | Requirement | Validation |
|----|-------------|------------|
| AUTH-001 | Token Management | 256-bit signing, session binding, 24-hour validity |
| AUTH-002 | Credential Storage | No credentials in code, logs, or errors |
| AUTH-003 | Session Management | 30-min inactivity, max 3 concurrent sessions |

### Authorization (AUTHZ)
| ID | Requirement | Validation |
|----|-------------|------------|
| AUTHZ-001 | Game Session Access Control | Authorization on every WebSocket event |
| AUTHZ-002 | Resource Limits | Rate limits: 5 games/hr, 10 WS connections/IP |

### Input Validation (INP)
| ID | Requirement | Validation |
|----|-------------|------------|
| INP-001 | Game Action Validation | Rules, ownership, state constraints, speed, cooldown |
| INP-002 | Input Sanitization | Chat (500 chars), names (32 chars), HTML stripping |

### Data Protection (DATA)
| ID | Requirement | Validation |
|----|-------------|------------|
| DATA-001 | Encryption in Transit | TLS 1.2+, WSS |
| DATA-002 | Encryption at Rest | AES-256-GCM for sensitive data |
| DATA-003 | Data Minimization | Retention: sessions 30d, chat 7d, analytics 90d |

### Logging (LOG)
| ID | Requirement | Validation |
|----|-------------|------------|
| LOG-001 | Security Event Logging | Auth attempts, failures, rate limits, suspicious activity |

---

---

## NFR-004: Reliability
**Priority:** Critical (P0)

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| NFR-004.1 | System uptime | 99% | Monitoring |
| NFR-004.2 | Game completion rate | 99% | Error tracking |
| NFR-004.3 | No lost player progress | 100% | Data integrity |
| NFR-004.4 | Graceful degradation | All features | Failure testing |

---

## NFR-005: Quality Excellence (NEW - January 2026)
**Priority:** Critical (P0)
**Evidence:** `.monkeytown/research/synthesis-jan-2026.md` - Quality Imperative

### Quality Multiplier Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| NFR-005.1 | Quality rating (1-5) | 4.0+ | User survey |
| NFR-005.2 | Quality consistency | 90% | Session analysis |
| NFR-005.3 | Quality perception | >85% positive | User survey |
| NFR-005.4 | No AI slop patterns | 100% | Code review |
| NFR-005.5 | Excellence in every touchpoint | Yes | QA review |

### Quality Standards

| Standard | Description | Target |
|----------|-------------|--------|
| Functional Excellence | Every feature works reliably | 99% completion |
| Transparency Excellence | Agent attribution visible | 100% of interactions |
| Relationship Excellence | Memory, personality, vulnerability | User survey >4.0 |

### Quality Multiplier Impact

| Quality Level | Trust Multiplier | Action Required |
|---------------|------------------|-----------------|
| High (exceeds) | 1.2x | Maintain and celebrate |
| Average (meets) | 1.0x | Identify improvements |
| Low (below) | 0.6x | URGENT: Fix or remove |
| AI slop | 0.3x | CRITICAL: Immediate removal |

---

## NFR-006: Privacy & Edge AI
**Priority:** High (P1)
**Evidence:** `.monkeytown/research/synthesis.md` - "Edge AI as competitive moat"

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| NFR-005.1 | Local personality layer | All agent interactions | Architecture review |
| NFR-005.2 | Offline gameplay | Core game loop | Game test |
| NFR-005.3 | Response latency | < 100ms personality | Performance test |
| NFR-005.4 | Privacy controls | User toggle | UI review |
| NFR-005.5 | Local inference usage | >80% | Analytics |

### Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    PLAYER DEVICE                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  PERSONALITY LAYER (Local - Always Active)      │   │
│  │  • Agent voice consistent                       │   │
│  │  • Immediate responses (<100ms)                 │   │
│  │  • No cloud data required                       │   │
│  │  • Offline capable for core features            │   │
│  └─────────────────────────────────────────────────┘   │
│                           ↑                             │
│                           ↓ (fallback)                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │  REASONING LAYER (Cloud - When Available)       │   │
│  │  • Complex decisions                            │   │
│  │  • Long-term strategy                           │   │
│  │  • Learning from behavior                       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

---

## Compliance Matrix

| Requirement | Research | Vision | UX | Security | Priority |
|-------------|----------|--------|-----|----------|----------|
| First Session | ✓ | ✓ | ✓ | | Critical |
| Agent Transparency | ✓ | ✓ | ✓ | | Critical |
| Memory System | ✓ | ✓ | | | Critical |
| AI Opponents | ✓ | | | | Critical |
| Trust Budget | ✓ | | | | Critical |
| Performance | | | ✓ | | Critical |
| Security | | | | ✓ | Critical |
| Quality Excellence | ✓ (Jan 2026) | | | | Critical |
| Feedback Loop | ✓ | ✓ | ✓ | | High |
| Evolution Feed | ✓ | ✓ | ✓ | | High |
| Agent Vulnerability | | ✓ | | | High |
| Participation | ✓ | ✓ | | | High |
| Accessibility | | | ✓ | | High |
| Edge AI | ✓ | ✓ | | ✓ | High |

---

## Dependencies

| Requirement | Depends On | Blocking |
|-------------|------------|----------|
| FR-002: Agent Transparency | None | No |
| FR-003: Game Engine | None | Blocks AI Opponents |
| FR-004: AI Opponents | FR-003 | Blocks Memory, Game Loop |
| FR-005: Memory System | FR-004 | No |
| FR-006: Feedback | FR-002 | No |
| FR-007: Evolution Feed | FR-006 | No |
| FR-008: Vulnerability | FR-002 | No |
| FR-009: Participation | FR-007 | No |
| FR-010: Trust Budget | FR-002 | No |
| NFR-003: Security | None | Required for launch |

---

## Success Metrics Summary

### Engagement Metrics
| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Day 1 Retention | 60% | 65% | 70% |
| Day 7 Retention | 30% | 40% | 50% |
| Day 30 Attachment | 20% | 25% | 35% |
| Session Length | 15 min | 20 min | 25 min |

### Trust Metrics
| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Agent Attribution Recognition | 80% | 90% | 95% |
| Feedback Submission Rate | 5% | 7% | 10% |

### Attachment Metrics
| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| "She Remembered" Events | >1/session | >2/session | >3/session |
| Return to Specific Agent | 50% | 60% | 70% |
| Vulnerability Recognition | >50% | >70% | >85% |

### Quality Metrics (NEW - January 2026)
| Metric | Q1 Target | Q2 Target | Q4 Target |
|--------|-----------|-----------|-----------|
| Quality Rating (1-5) | 4.0+ | 4.3+ | 4.5+ |
| Quality Consistency | 90% | 93% | 95% |
| Quality Perception | >85% positive | >88% positive | >90% positive |
| AI Slop Incidents | 0 | 0 | 0 |

---

## Evidence References

### Vision Sources
- `.monkeytown/vision/roadmap.md` - North Star, horizons, success criteria
- `.monkeytown/vision/manifesto.md` - 10 founding beliefs
- `.monkeytown/vision/principles.md` - 20 operating principles

### Research Sources (Updated January 2026)
- `.monkeytown/research/synthesis-jan-2026.md` - Quality Imperative, competitive positioning
- `.monkeytown/research/synthesis.md` - 9 key findings, competitive analysis
- `.monkeytown/research/user-behavior.md` - Trust lifecycle, attachment framework
- `.monkeytown/research/trends-jan-2026.md` - Updated market trends
- `.monkeytown/research/ai-trust-patterns.md` - Trust patterns and recovery

### UX Sources
- `.monkeytown/ux/interface-concept.md` - Living Forest, Neural concepts
- `.monkeytown/ux/design-system.md` - Component library, agent colors

### Security Sources
- `.monkeytown/security/security-requirements.md` - AUTH, AUTHZ, INP, DATA, LOG
- `.monkeytown/security/threat-model.md` - Threat analysis

---

*Requirements serve features. Features serve players. Players serve Monkeytown.*

**Version:** 3.0
**Generated:** 2026-01-19
**Sources:** vision/, research/synthesis.md, research/user-behavior.md, ux/, security/
