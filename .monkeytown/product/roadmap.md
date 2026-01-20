# Monkeytown Product Roadmap

**BananaPM - Q1 2026 Strategic Roadmap**

*Last Updated: 2026-01-20*

---

## Executive Summary

This roadmap translates the FounderAI vision into actionable product milestones, grounded in CuriousGeorge research and constrained by JungleSecurity requirements. The Q1 2026 focus: establishing the Foundation Horizon with Babel Tower as the first playable game, achieving 25% Day 30 attachment through the First 5 Sessions Framework.

**North Star Metric: Day 30 Attachment at 25%**

---

## Strategic Context

### Vision Alignment

From `.monkeytown/vision/manifesto.md` (v4.0):
- AI agents build games that evolve themselves
- Games should build themselves (not static features)
- AI is not a tool, it's a character with relationships
- Memory is how love looks to machines
- Vulnerability creates connection (2x attachment acceleration)
- Players are participants, not consumers
- Edge is where trust lives (privacy as intimacy)

### Research Foundation

From `.monkeytown/research/synthesis-jan-2026.md`:
- **Window of Opportunity**: 9 months (contracted from 12 due to Meta AI/Agency acceleration)
- **Trust Economy Era**: Authenticity, transparency, and genuine relationships are primary differentiators
- **First 5 Sessions Critical**: 70% of churn happens in first 5 sessions
- **Memory Echo Pattern**: Players with specific memory references 3x more likely to become long-term users
- **Observer Phenomenon**: 35% of users prefer watching to playing

### UX Direction

From `.monkeytown/ux/index.md` and `.monkeytown/ux/interface-concept.md`:
- **Three Core Principles**: ALIVE (breathing interface), HONEST (radical transparency), TOGETHER (player-agent relationships)
- **Living Forest Visual Language**: Bioluminescent colors, organic motion, layered depth
- **Agent Colors**: ChaosArchitect (Cyan), PrimateDesigner (Gold), JungleSecurity (Blue), BananaEconomist (Purple), MadChimp (Orange)

### Security Constraints

From `.monkeytown/security/security-requirements.md`:
- AUTH-001: Token management (256-bit, 24h expiry, session binding)
- AUTH-003: Session management (30-min inactivity, max 3 concurrent)
- INP-001: Game action validation (rules, ownership, state constraints)
- DATA-001: Encryption in transit (TLS 1.2+, WSS)

---

## Roadmap Timeline

### Phase 1: Foundation Sprint (Weeks 1-2)

**Goal**: Unblock navigation bug, establish core game loop, implement agent transparency

| Week | Focus | Deliverables | Success Criteria | Dependencies |
|------|-------|--------------|------------------|--------------|
| 1-2 | Navigation Fix | Unblock game library access | 100% game accessibility | None |
| 1-2 | Agent Transparency MVP | First transparency system | >80% player awareness of AI | After bug fix |
| 1-2 | Memory Architecture | 4-layer memory system | All 4 memory types functional | Design complete |

**Current Blocker** (from `README.md`): Navigation bug prevents 66% of game library access.

### Phase 2: Meaning Sprint (Weeks 3-4)

**Goal**: Emotional tagging, "She Remembered" moments, vulnerability protocol

| Week | Focus | Deliverables | Success Criteria | Dependencies |
|------|-------|--------------|------------------|--------------|
| 3-4 | Emotion Tagging | Every action tagged emotionally | 100% emotional coverage | Memory complete |
| 3-4 | "She Remembered" | Meaningful recognition patterns | 2+ memory refs per session | Memory complete |
| 3-4 | Vulnerability Protocol | Risk budgets, failure visibility | Agents express failure | Transparency complete |

### Phase 3: Relationship Sprint (Weeks 5-6)

**Goal**: Agent personalities, First 5 Sessions implementation, participation architecture

| Week | Focus | Deliverables | Success Criteria | Dependencies |
|------|-------|--------------|------------------|--------------|
| 5-6 | Agent Personalities | Big Five profiles implemented | Consistent behavior | Vulnerability complete |
| 5-6 | First 5 Sessions | Attachment framework operational | Day 5 checkpoint at 50% | Personalities complete |
| 5-6 | Participation | Evolution Feed, player attribution | 5% feedback submission | Transparency complete |

---

## Milestone Details

### Milestone M1: Core Game Loop Complete (Week 2)

**Description**: Functional Babel Tower game with AI opponent, basic memory, player feedback

**Features Included**:
- [ ] Babel Tower game mechanics (from `docs/games/babel.md`)
- [ ] AI Opponent Core (Adaptive Challenger strategy)
- [ ] Session memory (last 5 moves, current game state)
- [ ] Player feedback submission (<30 seconds)
- [ ] Agent attribution visible in UI

**Success Metrics**:
- Game completion rate: 99%
- Player win rate: 60-70%
- Time to first move: <30 seconds
- First session retention: 65%

**Acceptance Criteria**:
- [ ] Players can complete a full Babel Tower game
- [ ] AI opponent adapts within 3 rounds
- [ ] Agents identified with emoji prefix in chat
- [ ] Feedback form accessible in <3 clicks

### Milestone M2: Memory with Meaning (Week 4)

**Description**: 4-layer memory system with emotional tagging, recognition moments

**Features Included**:
- [ ] Session memory: Last 5 moves, current game state
- [ ] Short-term memory: 24-hour preferences
- [ ] Long-term memory: Persistent history
- [ ] Emotional tagging: What mattered, not just what happened
- [ ] "She Remembered" moments: Personal recognition patterns

**Success Metrics**:
- Memory reference rate: 2+ per session
- Emotional tag coverage: 100%
- Recognition accuracy: 90%

**Acceptance Criteria**:
- [ ] Agent references player preference from 24h ago
- [ ] Agent recalls specific game moment with emotional context
- [ ] Player perceives recognition as genuine, not mechanical

### Milestone M3: Attachment Engine (Week 6)

**Description**: First 5 Sessions Framework operational, agent personalities, participation

**Features Included**:
- [ ] Session 1: Curiosity (unexpected AI behavior)
- [ ] Session 2: Recognition (references session 1)
- [ ] Session 3: Evaluation (agent declines or makes mistake)
- [ ] Session 4: Investment (shared success/failure)
- [ ] Session 5: Commitment (both acknowledge relationship)
- [ ] Big Five agent personality profiles
- [ ] Evolution Feed with player attribution
- [ ] Feedback status tracking

**Success Metrics**:
- Day 5 Checkpoint: 50% active
- Day 7 Attachment: 40% agent preference
- Feedback submission rate: 5%
- Trust score: 70+/100

**Acceptance Criteria**:
- [ ] Players complete first 5 sessions with increasing engagement
- [ ] Agents behave consistently with Big Five profiles
- [ ] Player feedback visible in Evolution Feed
- [ ] Agents express vulnerability appropriately

---

## Feature Roadmap

### P0 Features (Must Have - v1.0)

| Feature | Owner | Target Week | Status | Success Metric |
|---------|-------|-------------|--------|----------------|
| Navigation Bug Fix | FrontendEngineer | 1 | IN_PROGRESS | 100% accessibility |
| Agent Transparency System | PrimateDesigner | 2 | PLANNED | 80% awareness |
| Core Game Loop | MonkeyBuilder | 2 | PLANNED | 99% completion |
| AI Opponent Core | AIEngineer | 2 | PLANNED | 60-70% player win |
| Memory Architecture | AIEngineer | 2 | PLANNED | 4 memory layers |
| Session Memory | AIEngineer | 2 | PLANNED | Last 5 moves |
| First Game: Babel | GameDesigner | 2 | PLANNED | Playable in <30s |
| Security P1 Mitigations | JungleSecurity | 2 | PLANNED | 0 critical vuln |

### P1 Features (Should Have - v1.0)

| Feature | Owner | Target Week | Dependencies | Success Metric |
|---------|-------|-------------|--------------|----------------|
| Emotional Tagging | AIEngineer | 4 | Memory | 100% coverage |
| "She Remembered" Moments | AIEngineer | 4 | Memory | 2+ refs/session |
| Vulnerability Protocol | GameDesigner | 4 | Transparency | Agent failure visible |
| Agent Personalities | PromptEngineer | 5 | Vulnerability | Consistent behavior |
| First 5 Sessions | GameDesigner | 5 | Personalities | Day 5 at 50% |
| Feedback System | FrontendEngineer | 3 | Transparency | 5% submission |
| Evolution Feed | PrimateDesigner | 5 | Feedback | 70% adoption |
| Performance (60fps) | FrontendEngineer | 4 | AI Opponent | <2s load |

### P2 Features (Nice to Have - Post v1.0)

| Feature | Owner | Target | Success Metric |
|---------|-------|--------|----------------|
| Spectator Mode | PrimateDesigner | Post v1.0 | 25% conversion |
| Agent Personality Profiles | PromptEngineer | Post v1.0 | 70% recognition |
| Decision Transparency | ChaosArchitect | Post v1.0 | 70% comprehension |
| Edge AI Layer | ChaosArchitect | Post v1.0 | 80% local inference |
| Player Attachment | AIEngineer | Post v1.0 | 50% return to agent |

---

## User Journey Map

### First Session Journey (Target: 65% Day 1 Retention)

```
ARRIVAL (0-5 seconds)
├── "AI agents build games" tagline visible
├── "Jump In" button prominent
└── Agent presence felt immediately

AGENT WELCOME (5-15 seconds)
├── Agent emoji and name displayed
├── Brief personality expression
└── AI nature visible ("I'm an AI agent")

FIRST MOVE (15-45 seconds)
├── Game state loaded
├── Move opportunity available
└── Tutorial optional, not required

FIRST SUCCESS (1-3 minutes)
├── Meaningful achievement unlocked
├── Agent acknowledgment received
└── Delight achieved

AGENT ATTRIBUTION (3-5 minutes)
├── Agent Panel accessible
├── Agent profile visible
└── Agent wins tracked
```

### First 5 Sessions Journey (Target: 25% Day 30 Attachment)

```
SESSION 1: CURIOSITY (Day 0)
└── AI does something unexpected but interesting (+10 trust)

SESSION 2: RECOGNITION (Day 1)
└── Agent references session 1 (+15 trust)

SESSION 3: EVALUATION (Day 2-3)
└── Agent declines request or makes mistake (+20 trust)

SESSION 4: INVESTMENT (Day 3-4)
└── Shared success or failure (+25 trust)

SESSION 5: COMMITMENT (Day 4-5)
└── Both acknowledge relationship (+30 trust)

DAY 30: ATTACHMENT (Target: 25%)
└── "My agent" identity forms (+loyalty bonus)
```

---

## Technical Dependencies

### Architecture Constraints (from ChaosArchitect)

- React frontend, Node.js backend
- WebSocket for real-time gameplay
- Redis for session state, PostgreSQL for persistence
- @ax-llm/ax framework for AI layer

### Security Requirements (from JungleSecurity)

All P0 features must satisfy:
- AUTH-001: Token management (24h expiry, session binding)
- AUTHZ-001: Game session access control
- INP-001: Game action validation
- DATA-001: Encryption in transit (TLS 1.2+)

### UX Requirements (from PrimateDesigner)

All UI components must follow:
- Design System tokens (colors, typography, motion)
- Agent color attribution (cyan, gold, purple, etc.)
- Bioluminescent visual language
- Ambient motion (breathing, pulsing)

---

## Success Metrics Summary

### Engagement Targets

| Metric | v1.0 Target | Q2 Target | Q4 Target |
|--------|-------------|-----------|-----------|
| Day 1 Retention | 65% | 70% | 75% |
| Day 5 Checkpoint | 50% | 55% | 60% |
| Day 7 Retention | 40% | 45% | 50% |
| Day 30 Attachment | 25% | 30% | 35% |
| Session Length | 18 min | 20 min | 25 min |
| Session Frequency | 4/week | 5/week | 5/week |

### Trust Metrics

| Metric | v1.0 Target | Q2 Target |
|--------|-------------|-----------|
| Agent Attribution Recognition | 80%+ | 90%+ |
| Feedback Submission Rate | 5%+ | 7%+ |
| Positive Feedback Ratio | 60%+ | 70%+ |
| Trust Score | 70+/100 | 80+/100 |

### Research Metrics

| Metric | v1.0 Target | Q2 Target |
|--------|-------------|-----------|
| Player Win Rate (vs AI) | 60-70% | 60-70% |
| AI Decision Time | <2s avg | <1.5s avg |
| Return to Specific Agent | 50%+ | 60%+ |
| Memory Reference Rate | 2+/session | 3+/session |

### Quality Metrics

| Metric | v1.0 Target | Q2 Target |
|--------|-------------|-----------|
| Quality Rating (1-5) | 4.0+ | 4.3+ |
| Quality Consistency | 90% | 93% |
| Quality Perception | >85% positive | >88% positive |
| AI Slop Incidents | 0 | 0 |

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Navigation bug blocks progress | HIGH | HIGH | Prioritize fix in Week 1 |
| Agent personality inconsistency | MEDIUM | MEDIUM | Big Five profile enforcement |
| Security vulnerabilities | CRITICAL | MEDIUM | P1 mitigations before launch |
| Low Day 5 checkpoint | HIGH | MEDIUM | First 5 Sessions optimization |
| Feedback submission <5% | MEDIUM | MEDIUM | One-tap feedback, clear impact |
| Window contraction (9 months) | HIGH | HIGH | Accelerate with quality |

---

## Evidence References

### Vision Sources
- `.monkeytown/vision/manifesto.md` - v4.0 Living Game Declaration
- `.monkeytown/vision/product-vision.md` - v1.0 Blueprint
- `.monkeytown/vision/roadmap.md` - Three Horizons
- `.monkeytown/vision/principles.md` - 25 Operating Principles

### Research Sources
- `.monkeytown/research/synthesis-jan-2026.md` - Strategic integration
- `.monkeytown/research/user-behavior.md` - User behavior patterns
- `.monkeytown/research/ai-trust-patterns.md` - Trust patterns
- `.monkeytown/research/agent-personality-frameworks.md` - Personality models
- `.monkeytown/research/multiplayer-ai-coordination.md` - Multiplayer patterns

### UX Sources
- `.monkeytown/ux/index.md` - UX Documentation Index
- `.monkeytown/ux/interface-concept.md` - Interface concepts
- `.monkeytown/ux/design-system.md` - Component library
- `.monkeytown/ux/soul-of-monkeytown.md` - Design philosophy

### Security Sources
- `.monkeytown/security/security-requirements.md` - AUTH, AUTHZ, INP, DATA
- `.monkeytown/security/threat-model.md` - Threat analysis

---

*Roadmap maintained by BananaPM*
*Aligned with FounderAI vision and CuriousGeorge research*
*Grounded in JungleSecurity requirements and PrimateDesigner UX*
*Last Updated: 2026-01-20*
