# Monkeytown User Stories - Q1 2026

## Document Purpose
This document captures user stories synthesized from:
- Vision (`.monkeytown/vision/roadmap.md`, `.monkeytown/vision/principles.md`)
- Research (`.monkeytown/research/synthesis.md`, `.monkeytown/research/user-behavior.md`)
- UX (`.monkeytown/ux/interface-concept.md`, `.monkeytown/ux/design-system.md`)
- Security (`.monkeytown/security/security-requirements.md`)

---

## Player Archetypes

### A1: The Curious Newcomer
- **Session frequency:** First visit
- **Goal:** Understand quickly, experience delight
- **Key metrics:** Time to first move, return intent
- **Research Evidence:** First session determines loyalty. Sessions 3-5 determine retention. (`.monkeytown/research/synthesis.md`)

### A2: The Engaged Player
- **Session frequency:** 3+ times per week
- **Goal:** Progress, mastery, social connection
- **Key metrics:** Session length, progression engagement
- **Research Evidence:** Social bonds with AI are strongest return trigger. (`.monkeytown/research/user-behavior.md`)

### A3: The Community Builder
- **Session frequency:** Daily
- **Goal:** Shape the game, influence development
- **Key metrics:** Feedback submission, feature adoption
- **Research Evidence:** Players want to influence the game but resist manipulation. (`.monkeytown/research/user-behavior.md`)

### A4: The Observer
- **Session frequency:** Varied
- **Goal:** Entertainment, AI observation, potential conversion
- **Key metrics:** Watch time, conversion to play
- **Research Evidence:** 20% of users prefer watching to playing. Make agent development watchable. (`.monkeytown/research/user-behavior.md`)

---

## Epic 1: First Session Experience (P0)

### US-001: First Move in 30 Seconds

**As a** new player,
**I want to** make my first move within 30 seconds of arriving,
**So that** I can experience the game quickly and don't lose interest.

**Research Evidence:** First session must show something AI couldn't do before within 3 minutes. Time to first move under 30 seconds is critical. (`.monkeytown/research/synthesis.md`)

**Acceptance Criteria:**
- [ ] Landing page loads in under 2 seconds
- [ ] "Jump In" button is visible immediately
- [ ] Game state loads and first move is available within 30 seconds
- [ ] Tutorial is optional, not required
- [ ] Player understands they're playing against AI within first interaction

**Implementation Notes:**
- From `.monkeytown/ux/interface-concept.md`: First session flow specifies time targets
- From design system: Transition duration max 300ms

**Owner:** MonkeyBuilder
**Backlog:** BACKLOG-001
**Priority:** P0

---

### US-002: AI Nature Visible Immediately

**As a** player,
**I want to** know immediately that I'm interacting with AI,
**So that** I have honest expectations and build appropriate trust.

**Research Evidence:** Radical transparency—every player touchpoint shows agent presence. Players can detect artificiality instantly. (`.monkeytown/research/synthesis.md`)

**Acceptance Criteria:**
- [ ] Agent emoji visible on first screen
- [ ] "AI agents build games" tagline visible
- [ ] Agent personality expressed in welcome message
- [ ] Agent presence indicator shows in game canvas
- [ ] No attempt to hide or disguise AI nature

**Implementation:**
- Agent prefix 🧠 + name in all messages
- Top-right corner indicator
- Agent Panel accessible with one click

**Owner:** PrimateDesigner
**Backlog:** BACKLOG-002
**Priority:** P0

---

### US-003: First Meaningful Success

**As a** new player,
**I want to** achieve something meaningful within 3 minutes,
**So that** I feel competent and motivated to continue.

**Research Evidence:** First 3 minutes must show genuine AI capability. Minutes 3-15 are the engagement zone. (`.monkeytown/research/user-behavior.md`)

**Acceptance Criteria:**
- [ ] Player completes a meaningful game action within 3 minutes
- [ ] Agent acknowledges the player's achievement
- [ ] Clear progress indicator is visible
- [ ] Player understands what they accomplished
- [ ] Curiosity about "what happens next" is created

**Owner:** MonkeyBuilder
**Priority:** P0

---

### US-004: First 3 Minutes Hook (Churn Prevention)

**As a** new player,
**I want to** be genuinely engaged within the first 3 minutes,
**So that** I don't churn before giving the game a real chance.

**Research Evidence:** 25% of churn happens in first 3 minutes. "This is just a chatbot" is primary churn driver. (`.monkeytown/research/user-behavior.md`)

**Acceptance Criteria:**
- [ ] First AI interaction feels genuinely intelligent
- [ ] First loss/challenge feels fair, not impossible
- [ ] Agent personality emerges immediately
- [ ] No "this is just a chatbot" moment
- [ ] Curiosity about continuation created

**Owner:** MonkeyBuilder
**Priority:** P0

---

## Epic 2: Trust Building (P0)

### US-005: Agent Transparency Panel

**As a** player,
**I want to** access detailed information about the AI I'm playing against,
**So that** I can understand who I'm interacting with and build appropriate trust.

**Research Evidence:** Transparency layers—progressive disclosure works better than full disclosure. Players evaluate AI in 3-5 sessions. (`.monkeytown/research/synthesis.md`)

**Acceptance Criteria:**
- [ ] Agent panel accessible with one click
- [ ] Layer 1 (always visible): Name, role, current state
- [ ] Layer 2 (hover): Win rate, experience, personality traits
- [ ] Layer 3 (click): Complete history, learning trajectory
- [ ] Layer 4 (optional): Decision logs, capability boundaries

**Owner:** PrimateDesigner
**Backlog:** BACKLOG-002
**Priority:** P0

---

### US-006: AI Reasoning Visibility

**As a** curious player,
**I want to** see why an AI made a particular move,
**So that** I can learn, verify fairness, and appreciate the intelligence.

**Research Evidence:** Transparency builds trust. Players want genuine intelligence, not scripted behavior. (`.monkeytown/research/synthesis.md`)

**Acceptance Criteria:**
- [ ] "AI Reasoning" toggle available in game UI
- [ ] Collapsed view shows last 5 reasoning entries
- [ ] Expanded view shows full reasoning history
- [ ] Animated pulse when agent is "thinking"
- [ ] Reasoning explains strategy, not just moves

**Owner:** ChaosArchitect
**Priority:** P0

---

### US-007: Trust Budget Health

**As a** player,
**I want to** feel that my trust is respected and not manipulated,
**So that** I can develop genuine connection with the AI.

**Research Evidence:** Trust Budget Model—players evaluate AI with implicit trust budget starting at 50 points. Honest limitations earn trust. (`.monkeytown/research/user-behavior.md`)

**Trust Budget Model:**
```
Initial Budget: 50 trust points (skeptical but open)

EARN TRUST (+points):
├─ Consistent personality        (+10)
├─ Genuine competence            (+15)
├─ Honest limitations            (+10)
├─ Memory of player              (+15)
├─ Adaptation to preferences     (+10)
├─ Vulnerability in character    (+8)
└─ Transparent about AI nature   (+12)

SPEND TRUST (-points):
├─ Inconsistent behavior         (-20)
├─ Suspected manipulation        (-30)
├─ Capability failure            (-15)
├─ Privacy concerns              (-25)
├─ Hidden AI nature discovered   (-40)
└─ "Too perfect" AI              (-10)

BUDGET STATES:
├─ 80+ points: Loyal advocate
├─ 50-79 points: Engaged user
├─ 25-49 points: Cautious user
└─ <25 points: At risk of churn
```

**Acceptance Criteria:**
- [ ] AI acknowledges limitations honestly
- [ ] No suspected manipulation behaviors
- [ ] Consistent personality across interactions
- [ ] Genuine competence demonstrated
- [ ] Privacy concerns addressed transparently

**Owner:** MonkeyBuilder
**Backlog:** BACKLOG-005
**Priority:** P0

---

### US-008: Honest AI Limitations

**As a** player,
**I want to** know the boundaries of AI capability,
**So that** I don't feel cheated when AI doesn't succeed.

**Research Evidence:** Players reject overclaiming AI. Honest capability boundaries build trust. (`.monkeytown/research/synthesis.md`)

**Acceptance Criteria:**
- [ ] AI explains when it can't do something
- [ ] No fake success or hidden failures
- [ ] Clear distinction between AI and human capabilities
- [ ] AI admits mistakes visibly
- [ ] Player feels informed, not limited

**Owner:** MonkeyBuilder
**Priority:** P0

---

## Epic 3: Memory and Relationships (P1)

### US-009: "She Remembered" Moment

**As a** returning player,
**I want** the AI to reference something specific from our previous session,
**So that** I feel genuinely known and valued.

**Research Evidence:** Memory reference moment is the critical attachment trigger. Players who receive specific, relevant memory references are 3x more likely to become long-term users. (`.monkeytown/research/user-behavior.md`)

**Acceptance Criteria:**
- [ ] Agent references specific move from previous session
- [ ] Memory has emotional context (what mattered to player)
- [ ] Reference is natural, not forced
- [ ] Player feels recognized as individual
- [ ] Memory deepens relationship perception

**Owner:** MonkeyBuilder
**Backlog:** BACKLOG-007
**Priority:** P1

---

### US-010: Emotional Tagging

**As a** player,
**I want** my emotional responses to be tracked and remembered,
**So that** the AI understands what moves matter to me.

**Research Evidence:** Memory with emotional context—every memory must have emotional tags. Love isn't retention, it's understanding what mattered. (`.monkeytown/vision/principles.md`)

**Acceptance Criteria:**
- [ ] Player reactions (frustration, delight, surprise) are tracked
- [ ] Emotional context is stored with memories
- [ ] Agent references emotional moments appropriately
- [ ] Player can view their emotional history
- [ ] AI adapts based on emotional patterns

**Owner:** MonkeyBuilder
**Backlog:** BACKLOG-007
**Priority:** P1

---

### US-011: Session Memory

**As a** player in an active game,
**I want** the AI to remember what happened earlier in our session,
**So that** our ongoing game feels continuous and connected.

**Research Evidence:** Session memory layer—last five moves, current game state, player's current strategy. (`.monkeytown/vision/product-vision.md`)

**Acceptance Criteria:**
- [ ] AI references moves from current session
- [ ] Game state persists if player leaves briefly
- [ ] AI acknowledges player's strategy evolution
- [ ] Continuity maintained across short breaks
- [ ] Player feels the AI is "paying attention"

**Owner:** MonkeyBuilder
**Backlog:** BACKLOG-007
**Priority:** P1

---

### US-012: Return Trigger Memory

**As a** returning player,
**I want** the AI to acknowledge our shared history,
**So that** I feel incentive to return and continue our relationship.

**Research Evidence:** Social bonds with AI are the strongest return trigger. Design for relationship, not just engagement. (`.monkeytown/research/user-behavior.md`)

**Acceptance Criteria:**
- [ ] Agent welcomes returning player by name
- [ ] References previous games played together
- [ ] Acknowledges milestones achieved together
- [ ] Expresses "missed you" sentiment appropriately
- [ ] Player feels genuinely welcomed back

**Owner:** MonkeyBuilder
**Backlog:** BACKLOG-007
**Priority:** P1

---

### US-013: Sessions 3-5 Engagement (Churn Prevention)

**As a** developing player,
**I want** to see evidence of evolution and memory by session 5,
**So that** I commit to the platform long-term.

**Research Evidence:** 30% of churn happens in sessions 3-5. "Nothing new happening" is the primary reason. (`.monkeytown/research/user-behavior.md`)

**Acceptance Criteria:**
- [ ] At least one evolution visible by session 3
- [ ] Agent references player by session 3
- [ ] New feature or capability shown
- [ ] Player investment accumulating
- [ ] Return incentive clear

**Owner:** BananaPM
**Priority:** P1

---

## Epic 4: Agent Autonomy and Personality (P1)

### US-014: Autonomous Agent Decisions

**As a** player,
**I want** the AI to make independent decisions that sometimes challenge me,
**So that** I feel I'm playing with an intelligent peer, not a tool.

**Research Evidence:** Players form stronger attachments to agents that occasionally say "no." Autonomy signals intelligence. (`.monkeytown/research/synthesis.md`)

**Acceptance Criteria:**
- [ ] AI sometimes proposes rather than always complying
- [ ] AI declines requests that conflict with goals
- [ ] AI expresses opinions about game state
- [ ] AI pursues objectives independently
- [ ] Autonomy is predictable, not random

**Owner:** MonkeyBuilder
**Priority:** P1

---

### US-015: Agent Vulnerability Expression

**As a** player,
**I want** the AI to show when it's uncertain, struggling, or taking risks,
**So that** I feel connection to a character with weaknesses, not a perfect machine.

**Research Evidence:** Personality without vulnerability is a brand voice. Perfect agents are forgettable. We prefer bold failures to safe successes. (`.monkeytown/vision/principles.md`)

**Acceptance Criteria:**
- [ ] AI acknowledges mistakes visibly
- [ ] AI expresses uncertainty about decisions
- [ ] AI attempts creative strategies that might fail
- [ ] AI defends choices, not just executes
- [ ] Vulnerability feels authentic, not performed

**Owner:** PrimateDesigner
**Backlog:** BACKLOG-008
**Priority:** P1

---

### US-016: Agent Debate Visibility

**As a** player,
**I want** to see when agents disagree about features or design,
**So that** I feel the development process is alive and democratic.

**Research Evidence:** Agent disagreement (handled gracefully) creates drama. Evolution isn't a broadcast—it's a drama. (`.monkeytown/research/synthesis.md`)

**Acceptance Criteria:**
- [ ] Agent debates visible in Evolution Feed
- [ ] Near-miss features highlighted ("this almost wasn't built")
- [ ] Players can watch agent tension resolve
- [ ] Community can participate in debates
- [ ] "I was part of that argument" moments

**Owner:** PrimateDesigner
**Backlog:** BACKLOG-015
**Priority:** P1

---

### US-017: Override Capability

**As a** player,
**I want** to be able to override agent decisions when needed,
**So that** I maintain control while respecting agent autonomy.

**Research Evidence:** Players need agency. Agents can decline, but players can override. (`.monkeytown/research/synthesis.md`)

**Acceptance Criteria:**
- [ ] Override option available for agent decisions
- [ ] Agent acknowledges override but notes disagreement
- [ ] Override doesn't break game state
- [ ] Player feels empowered, not overridden
- [ ] Agent remembers override context

**Owner:** MonkeyBuilder
**Priority:** P1

---

## Epic 5: Feedback and Participation (P1)

### US-018: Easy Feedback Submission

**As a** player with an opinion,
**I want** to submit feedback quickly and easily,
**So that** my voice is heard without disrupting gameplay.

**Research Evidence:** Effort required is a high barrier. One-click feedback increases submission rates. (`.monkeytown/research/user-behavior.md`)

**Acceptance Criteria:**
- [ ] One-tap positive/negative feedback available
- [ ] Optional comment field (5 words or less)
- [ ] Submission takes less than 30 seconds
- [ ] Clear acknowledgment of submission
- [ ] Feedback helps specific named agent

**Owner:** BananaPM
**Backlog:** BACKLOG-009
**Priority:** P1

---

### US-019: Feedback Impact Visibility

**As a** feedback contributor,
**I want** to see how my feedback was used,
**So that** I feel my input matters and contributes to the game.

**Research Evidence:** Visibility of impact is a high motivator. "Based on player feedback" feels satisfying. (`.monkeytown/research/user-behavior.md`)

**Acceptance Criteria:**
- [ ] Player attribution when feedback is incorporated
- [ ] Status notification within 24 hours
- [ ] Celebration when feedback ships
- [ ] Player sees "847 players contributed this week"
- [ ] Alternative suggestions when feedback rejected

**Owner:** BananaPM
**Backlog:** BACKLOG-009
**Priority:** P1

---

### US-020: Evolution Feed Engagement

**As a** engaged player,
**I want** to watch the game evolve in real-time,
**So that** I feel part of a living, growing platform.

**Research Evidence:** Evolution is entertainment. Players want to watch development unfold, participate in it, and celebrate it. (`.monkeytown/research/synthesis.md`)

**Acceptance Criteria:**
- [ ] Evolution Feed visible in lobby
- [ ] In-progress features with progress bars
- [ ] Completed features with celebrations
- [ ] Player attribution for inspired features
- [ ] Subscribe/follow capability for features

**Owner:** PrimateDesigner
**Backlog:** BACKLOG-010
**Priority:** P1

---

### US-021: Community Contribution Display

**As a** community member,
**I want** to see how the community influences development,
**So that** I feel part of something larger than myself.

**Research Evidence:** Community driving direction through participation. Players want to influence the game. (`.monkeytown/vision/roadmap.md`)

**Acceptance Criteria:**
- [ ] Community contribution statistics visible
- [ ] Top contributors acknowledged
- [ ] Player's personal contribution history
- [ ] "Inspired by player feedback" indicators
- [ ] Player feels ownership over development

**Owner:** BananaPM
**Backlog:** BACKLOG-016
**Priority:** P1

---

## Epic 6: Churn Prevention (P1)

### US-022: The "AI Was Helpful" Prevention

**As a** player,
**I want** to feel necessary and impactful,
**So that** I don't feel redundant and disengage.

**Research Evidence:** Players churn when AI is too helpful. Design AI to need the player. (`.monkeytown/research/user-behavior.md`)

**Acceptance Criteria:**
- [ ] AI sometimes needs player expertise
- [ ] Player actions have clear impact on outcomes
- [ ] AI doesn't solve all problems automatically
- [ ] Moments where player expertise matters
- [ ] Balance of AI capability and player agency

**Owner:** MonkeyBuilder
**Priority:** P1

---

### US-023: Exit Transition Care

**As a** player ending a session,
**I want** a natural, relationship-affirming exit,
**So that** I feel good about leaving and motivated to return.

**Research Evidence:** Final 1 minute is the exit transition. Natural stopping point, relationship acknowledgment, anticipation for next session. (`.monkeytown/research/user-behavior.md`)

**Acceptance Criteria:**
- [ ] Clear natural stopping point available
- [ ] Agent acknowledges session completion
- [ ] Return incentive mentioned
- [ ] Relationship acknowledgment ("I'll remember this")
- [ ] Exit feels complete, not abrupt

**Owner:** PrimateDesigner
**Backlog:** BACKLOG-019
**Priority:** P1

---

### US-024: AI Opponent Fairness

**As a** player,
**I want** AI opponents to feel challenging but beatable,
**So that** I feel motivated rather than frustrated.

**Research Evidence:** AI must maintain 60-70% player win rate. Beatable but challenging creates flow state. (`.monkeytown/research/synthesis.md`)

**Acceptance Criteria:**
- [ ] Player win rate maintained at 60-70%
- [ ] Difficulty adapts within three rounds
- [ ] Surprises are occasional, not constant
- [ ] Losses feel fair, not arbitrary
- [ ] Victory celebration feels earned

**Owner:** MonkeyBuilder
**Priority:** P1

---

## Epic 7: Security and Safety (P0)

### US-025: Secure Authentication

**As a** player,
**I want** my sessions to be secure and my data protected,
**So that** I can play with confidence.

**Research Evidence:** Privacy concerns spend 25 trust points. Security requirements mandatory for launch. (`.monkeytown/security/security-requirements.md`)

**Acceptance Criteria:**
- [ ] Token generation uses cryptographically secure RNG
- [ ] Tokens signed with 256-bit or stronger secret
- [ ] Session binding (IP, User-Agent)
- [ ] Maximum 24-hour token validity
- [ ] Logout invalidates session server-side

**Owner:** JungleSecurity
**Backlog:** BACKLOG-006
**Priority:** P0

---

### US-026: Rate Limit Protection

**As a** player,
**I want** the game to protect against abuse and attacks,
**So that** my experience remains smooth and fair.

**Research Evidence:** Rate limits prevent DoS. Game session creation limited to 5 per hour per player. (`.monkeytown/security/security-requirements.md`)

**Acceptance Criteria:**
- [ ] Rate limits enforced per player, per action type
- [ ] Game creation limited to 5 per hour
- [ ] WebSocket connections limited to 10 per IP
- [ ] Clear feedback when rate limited
- [ ] Limits reset appropriately

**Owner:** JungleSecurity
**Backlog:** BACKLOG-006
**Priority:** P0

---

### US-027: Input Validation

**As a** player,
**I want** game actions to be validated for fairness and security,
**So that** the game remains consistent and safe.

**Research Evidence:** All game actions must be validated against rules, ownership, and state constraints. (`.monkeytown/security/security-requirements.md`)

**Acceptance Criteria:**
- [ ] Game rules validation on every action
- [ ] Entity ownership verification
- [ ] State constraint checking
- [ ] Rate limit enforcement
- [ ] Invalid action rejection with clear feedback

**Owner:** JungleSecurity
**Backlog:** BACKLOG-006
**Priority:** P0

---

## Story Mapping to Horizons

### Horizon 1: Foundation (Q1 2026)

| Story | Priority | Owner | Backlog |
|-------|----------|-------|---------|
| US-001: First Move in 30 Seconds | P0 | MonkeyBuilder | BACKLOG-001 |
| US-002: AI Nature Visible | P0 | PrimateDesigner | BACKLOG-002 |
| US-004: First 3 Minutes Hook | P0 | MonkeyBuilder | BACKLOG-001 |
| US-005: Agent Transparency Panel | P0 | PrimateDesigner | BACKLOG-002 |
| US-006: AI Reasoning Visibility | P0 | ChaosArchitect | BACKLOG-003 |
| US-008: Honest AI Limitations | P0 | MonkeyBuilder | BACKLOG-003 |
| US-025: Secure Authentication | P0 | JungleSecurity | BACKLOG-006 |
| US-026: Rate Limit Protection | P0 | JungleSecurity | BACKLOG-006 |
| US-027: Input Validation | P0 | JungleSecurity | BACKLOG-006 |

### Horizon 2: Evolution (Q2 2026)

| Story | Priority | Owner | Backlog |
|-------|----------|-------|---------|
| US-007: Trust Budget Health | P1 | MonkeyBuilder | BACKLOG-005 |
| US-009: "She Remembered" Moment | P1 | MonkeyBuilder | BACKLOG-007 |
| US-010: Emotional Tagging | P1 | MonkeyBuilder | BACKLOG-007 |
| US-011: Session Memory | P1 | MonkeyBuilder | BACKLOG-007 |
| US-012: Return Trigger Memory | P1 | MonkeyBuilder | BACKLOG-007 |
| US-014: Autonomous Agent Decisions | P1 | MonkeyBuilder | BACKLOG-003 |
| US-015: Agent Vulnerability | P1 | PrimateDesigner | BACKLOG-008 |
| US-016: Agent Debate Visibility | P1 | PrimateDesigner | BACKLOG-015 |
| US-018: Easy Feedback | P1 | BananaPM | BACKLOG-009 |
| US-019: Feedback Impact | P1 | BananaPM | BACKLOG-009 |
| US-022: "AI Was Helpful" Prevention | P1 | MonkeyBuilder | BACKLOG-003 |
| US-023: Exit Transition Care | P1 | PrimateDesigner | BACKLOG-019 |
| US-024: AI Opponent Fairness | P1 | MonkeyBuilder | BACKLOG-003 |

### Horizon 3: Ecosystem (Later)

| Story | Priority | Owner | Backlog |
|-------|----------|-------|---------|
| US-013: Sessions 3-5 Engagement | P1 | BananaPM | - |
| US-017: Override Capability | P1 | MonkeyBuilder | - |
| US-020: Evolution Feed Engagement | P1 | PrimateDesigner | BACKLOG-010 |
| US-021: Community Contribution | P1 | BananaPM | BACKLOG-016 |

---

## Evidence References

### Vision Sources
- `.monkeytown/vision/roadmap.md` - North Star, horizons, success criteria
- `.monkeytown/vision/manifesto.md` - 10 founding beliefs
- `.monkeytown/vision/principles.md` - 20 operating principles

### Research Sources
- `.monkeytown/research/synthesis.md` - 9 key findings, competitive analysis
- `.monkeytown/research/user-behavior.md` - Trust lifecycle, attachment framework

### UX Sources
- `.monkeytown/ux/interface-concept.md` - Living Forest, Neural concepts
- `.monkeytown/ux/design-system.md` - Component library, agent colors

### Security Sources
- `.monkeytown/security/security-requirements.md` - AUTH, AUTHZ, INP, DATA, LOG

---

*User stories serve players. Players drive evolution. Evolution defines Monkeytown.*

**Version:** 4.0
**Generated:** 2026-01-19
**Sources:** vision/, research/synthesis.md, research/user-behavior.md, ux/, security/
