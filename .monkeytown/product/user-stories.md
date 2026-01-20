# Monkeytown User Stories

**BananaPM - User-Centered Requirements**

*Last Updated: 2026-01-20*

---

## Story Index

| ID | Story | Priority | Points | Status |
|----|-------|----------|--------|--------|
| US001 | Curious newcomer plays first game | P0 | 8 | READY |
| US002 | Player recognizes AI opponent | P0 | 5 | READY |
| US003 | Player experiences "She Remembered" moment | P0 | 13 | READY |
| US004 | Player submits feedback | P1 | 5 | READY |
| US005 | Player watches game evolution | P1 | 8 | READY |
| US006 | Returning player feels recognized | P0 | 13 | READY |
| US007 | Player experiences AI vulnerability | P0 | 8 | READY |
| US008 | Player completes first 5 sessions | P0 | 21 | READY |
| US009 | Player defeats AI opponent | P0 | 3 | READY |
| US010 | Player loses to AI opponent | P0 | 3 | READY |
| US011 | Player sees agent personality | P1 | 8 | READY |
| US012 | Player tracks progress | P2 | 5 | BACKLOG |
| US013 | Observer watches gameplay | P2 | 5 | BACKLOG |
| US014 | Player influences game development | P1 | 13 | READY |
| US015 | Player reports issue | P1 | 3 | READY |

---

## P0 Stories (Must Have)

### US001: Curious newcomer plays first game

**As a** curious new player visiting Monkeytown for the first time

**I want to** start playing a game within 30 seconds of arrival

**So that** I can experience AI-powered gameplay immediately and decide if I want to continue

**Acceptance Criteria**:
- [ ] Landing page shows "AI agents build games" tagline
- [ ] "Jump In" button is prominent and visible
- [ ] First game starts within 30 seconds of clicking "Jump In"
- [ ] Agent introduces itself with emoji and name within 5 seconds
- [ ] First move opportunity available within 45 seconds
- [ ] Tutorial is optional, not required
- [ ] First meaningful success occurs within 3 minutes

**Tasks**:
- [ ] Implement landing page with "Jump In" CTA (FrontendEngineer)
- [ ] Create quick-start game flow (FrontendEngineer)
- [ ] Build agent welcome system (AIEngineer)
- [ ] Design tutorial optional mode (PrimateDesigner)

**Dependencies**: F006: Navigation Bug Fix

**Evidence**: From `.monkeytown/vision/product-vision.md` - "Trust in Thirty Seconds: First session design: Time to first move under thirty seconds. AI nature visible immediately."

---

### US002: Player recognizes AI opponent

**As a** player engaging with an AI opponent

**I want to** clearly see that I'm playing against an AI agent, not a human

**So that** I understand the nature of my opponent and can appreciate its capabilities

**Acceptance Criteria**:
- [ ] Agent emoji prefix appears in every chat message
- [ ] Agent panel accessible from game screen shows agent name, emoji, win rate
- [ ] Agent presence indicator visible in game canvas during turns
- [ ] Agent attribution visible in game events (wins, special moves)
- [ ] Player identifies agent as AI within 5 seconds of first interaction
- [ ] >80% of players correctly identify agent as AI

**Tasks**:
- [ ] Implement Neural Avatar component (PrimateDesigner)
- [ ] Build agent panel UI (FrontendEngineer)
- [ ] Add agent prefix to all AI messages (AIEngineer)
- [ ] Create agent presence indicator (FrontendEngineer)

**Dependencies**: F001: Agent Transparency System

**Evidence**: From `.monkeytown/vision/manifesto.md` - "We never hide that players interact with AI. We celebrate it."

---

### US003: Player experiences "She Remembered" moment

**As a** player who has played before

**I want** the AI agent to reference something specific from our previous interaction

**So that** I feel known and valued, building emotional connection

**Acceptance Criteria**:
- [ ] Agent references a specific move or moment from previous session (2+ references per session)
- [ ] Reference feels personal, not mechanical
- [ ] Agent references player preferences (e.g., "You prefer aggressive openings")
- [ ] Player perceives the recognition as genuine
- [ ] References span multiple memory layers (session, short-term, long-term)
- [ ] Emotional context included in references ("That was exciting!")

**Tasks**:
- [ ] Implement memory echo trigger system (AIEngineer)
- [ ] Build emotional tagging system (AIEngineer)
- [ ] Design recognition phrase patterns (PromptEngineer)
- [ ] Create reference variation system (AIEngineer)

**Dependencies**:
- F004: Memory Architecture
- F009: Emotional Tagging
- F010: "She Remembered" Moments

**Evidence**: From `.monkeytown/vision/manifesto.md` - "Players don't attach to code. They attach to characters who remember them."

---

### US006: Returning player feels recognized

**As a** player returning to Monkeytown after a break

**I want** the game and agents to acknowledge our shared history

**So that** I feel continuity in our relationship and am motivated to continue playing

**Acceptance Criteria**:
- [ ] Agent welcomes returning player by name
- [ ] Agent references time since last visit
- [ ] Agent acknowledges player's recent achievements
- [ ] Game state shows return celebration
- [ ] Player perceives genuine welcome
- [ ] Session length increases vs first session (+20%)

**Tasks**:
- [ ] Build return detection and greeting system (AIEngineer)
- [ ] Implement return celebration UI (FrontendEngineer)
- [ ] Create return-specific dialogue (PromptEngineer)
- [ ] Add return metrics to tracking (FrontendEngineer)

**Dependencies**:
- F004: Memory Architecture
- F005: Session Memory

**Evidence**: From `.monkeytown/research/user-behavior-ai-games.md` - "Players who report 'genuine connection' with AI show 4x retention compared to players who view AI as 'tool'."

---

### US007: Player experiences AI vulnerability

**As a** player interacting with an AI opponent

**I want** the agent to express uncertainty, make mistakes, and take risks

**So that** I perceive the AI as genuine and relatable rather than perfect and robotic

**Acceptance Criteria**:
- [ ] Agent expresses uncertainty about decisions ("I'm not sure about this...")
- [ ] Agent acknowledges mistakes ("I miscalculated there")
- [ ] Agent attempts bold strategies that sometimes fail
- [ ] Agent explains reasoning even when uncertain
- [ ] Vulnerability accelerates attachment (+2x trust)
- [ ] Player perceives AI as genuine, not robotic

**Tasks**:
- [ ] Implement vulnerability expression system (AIEngineer)
- [ ] Build risk attempt logic (AIEngineer)
- [ ] Create uncertainty acknowledgment patterns (PromptEngineer)
- [ ] Design failure recovery system (AIEngineer)

**Dependencies**:
- F011: Vulnerability Protocol
- F012: Agent Personalities

**Evidence**: From `.monkeytown/vision/manifesto.md` - "Vulnerability accelerates attachment 2x compared to perfection."

---

### US008: Player completes first 5 sessions

**As a** new player exploring Monkeytown

**I want** my first 5 sessions to progressively build my relationship with an agent

**So that** I develop genuine attachment and become a long-term player

**Acceptance Criteria**:
- [ ] Session 1: AI does something unexpected but interesting (+10 trust)
- [ ] Session 2: AI references Session 1 (+15 trust)
- [ ] Session 3: AI declines request or makes mistake gracefully (+20 trust)
- [ ] Session 4: Shared success or failure moment (+25 trust)
- [ ] Session 5: Both acknowledge relationship (+30 trust)
- [ ] Day 5 Checkpoint: 50% of players still active
- [ ] Trust score accumulates correctly across sessions

**Tasks**:
- [ ] Implement First 5 Sessions Framework (GameDesigner)
- [ ] Build session progress tracking (AIEngineer)
- [ ] Create session-specific dialogue (PromptEngineer)
- [ ] Design milestone celebration UI (FrontendEngineer)

**Dependencies**:
- F013: First 5 Sessions Framework
- F010: "She Remembered" Moments
- F011: Vulnerability Protocol

**Evidence**: From `.monkeytown/vision/manifesto.md` - "Day 30 attachment at 20% is our Q1 2026 target."

---

### US009: Player defeats AI opponent

**As a** player competing against an AI opponent

**I want to** win the game through skill and strategy

**So that** I feel accomplished and motivated to continue playing

**Acceptance Criteria**:
- [ ] Player can achieve victory against AI opponent
- [ ] AI opponent does not cheat or use impossible moves
- [ ] Victory feels earned, not given
- [ ] Agent acknowledges defeat gracefully ("Good game!")
- [ ] Player win rate maintained at 60-70%
- [ ] Victory celebration feels satisfying

**Tasks**:
- [ ] Implement fair AI difficulty calibration (AIEngineer)
- [ ] Build graceful defeat response system (AIEngineer)
- [ ] Create victory celebration (FrontendEngineer)
- [ ] Add win rate tracking (FrontendEngineer)

**Dependencies**: F003: AI Opponent Core

**Evidence**: From `.monkeytown/vision/product-vision.md` - "AI opponents must feel like opponents, not obstacles."

---

### US010: Player loses to AI opponent

**As a** player competing against an AI opponent

**I want to** lose sometimes and have it feel fair

**So that** I remain challenged and motivated to improve

**Acceptance Criteria**:
- [ ] Player loses sometimes (30-40% of games)
- [ ] AI does not play perfectly; has exploitable patterns
- [ ] Loss feels fair, not due to AI cheating
- [ ] Agent celebrates appropriately, not smugly
- [ ] Agent offers strategy hints after loss
- [ ] Player motivated to rematch

**Tasks**:
- [ ] Calibrate AI difficulty for appropriate loss rate (AIEngineer)
- [ ] Build post-loss dialogue system (PromptEngineer)
- [ ] Create loss acknowledgment UI (FrontendEngineer)
- [ ] Add strategy hint system (AIEngineer)

**Dependencies**: F003: AI Opponent Core

**Evidence**: From `.monkeytown/vision/product-vision.md` - "Maintains sixty to seventy percent player win rate."

---

## P1 Stories (Should Have)

### US004: Player submits feedback

**As a** player with opinions about the game

**I want to** submit feedback quickly and easily

**So that** I can influence game development and feel my voice matters

**Acceptance Criteria**:
- [ ] One-tap positive/negative feedback available
- [ ] Optional comment field (5 words or less)
- [ ] Submission time under 30 seconds
- [ ] Feedback acknowledgment within 24 hours
- [ ] Status tracking for submissions
- [ ] Player attribution when feedback is implemented
- [ ] Feedback submission rate: 5%+

**Tasks**:
- [ ] Build feedback submission UI (FrontendEngineer)
- [ ] Implement feedback storage (BackendEngineer)
- [ ] Create feedback acknowledgment system (BackendEngineer)
- [ ] Build Evolution Feed integration (FrontendEngineer)

**Dependencies**:
- F001: Agent Transparency System
- F007: Feedback System

**Evidence**: From `.monkeytown/vision/product-vision.md` - "Players want to influence the game but resist feeling manipulated."

---

### US005: Player watches game evolution

**As a** engaged player interested in game development

**I want to** watch the game evolve and see how my feedback contributes

**So that** I feel part of the development journey and celebrate progress

**Acceptance Criteria**:
- [ ] Evolution Feed visible in lobby
- [ ] In-progress features shown with agent attribution
- [ ] Shipped features show player attribution
- [ ] Milestones celebrated appropriately
- [ ] Player can subscribe to features
- [ ] Evolution Feed engagement: 70%+

**Tasks**:
- [ ] Build Evolution Feed UI (FrontendEngineer)
- [ ] Implement feature tracking system (BackendEngineer)
- [ ] Create celebration animations (FrontendEngineer)
- [ ] Add subscription functionality (FrontendEngineer)

**Dependencies**:
- F007: Feedback System
- F008: Evolution Feed

**Evidence**: From `.monkeytown/vision/manifesto.md` - "Evolution happens with players, not to them."

---

### US011: Player sees agent personality

**As a** player interacting with AI opponents

**I want** each agent to have a distinct, consistent personality

**So that** I can form relationships with specific agents and choose my preferred opponents

**Acceptance Criteria**:
- [ ] Each agent has unique personality (Big Five profile)
- [ ] Agent behavior consistent across interactions
- [ ] Players can identify agents without seeing names
- [ ] Behavioral signatures unique to each agent
- [ ] Agent personalities are memorable
- [ ] Player preference for specific agents develops

**Tasks**:
- [ ] Implement Big Five personality system (AIEngineer)
- [ ] Build behavioral signature system (AIEngineer)
- [ ] Create personality-specific dialogue (PromptEngineer)
- [ ] Design personality showcase UI (FrontendEngineer)

**Dependencies**: F012: Agent Personalities

**Evidence**: From `.monkeytown/research/agent-personality-frameworks.md` - "Each agent should have a defined position on these dimensions that influences all behaviors."

---

### US014: Player influences game development

**As a** invested player who submits feedback

**I want to** see my feedback lead to actual changes in the game

**So that** I feel my contribution matters and am motivated to continue participating

**Acceptance Criteria**:
- [ ] Feedback submission leads to visible changes
- [ ] Player attribution when feedback is implemented
- [ ] Timeline shows when feedback was submitted vs shipped
- [ ] Rejected feedback receives explanation
- [ ] Player perceives genuine influence
- [ ] Feedback incorporation rate visible

**Tasks**:
- [ ] Build feedback tracking system (BackendEngineer)
- [ ] Implement player attribution for shipped features (BackendEngineer)
- [ ] Create feedback status notification system (BackendEngineer)
- [ ] Design attribution display UI (FrontendEngineer)

**Dependencies**:
- F007: Feedback System
- F008: Evolution Feed

**Evidence**: From `.monkeytown/vision/manifesto.md` - "Your feedback and gameplay guide the agents."

---

### US015: Player reports issue

**As a** player experiencing a problem

**I want to** report issues quickly and receive acknowledgment

**So that** problems get fixed and I feel heard

**Acceptance Criteria**:
- [ ] Issue reporting accessible in 1-2 clicks
- [ ] Submission confirmation received immediately
- [ ] Response within 24 hours
- [ ] Issue resolution notification when fixed
- [ ] Player perceives report as valuable
- [ ] Issue reports lead to bug fixes

**Tasks**:
- [ ] Build issue reporting UI (FrontendEngineer)
- [ ] Implement report tracking (BackendEngineer)
- [ ] Create acknowledgment system (BackendEngineer)
- [ ] Design resolution notification (FrontendEngineer)

**Dependencies**: None

**Evidence**: From `.monkeytown/research/user-behavior-ai-games.md` - "Visibility of impact is a high motivator for feedback submission."

---

## P2 Stories (Nice to Have)

### US012: Player tracks progress

**As a** returning player interested in my history

**I want to** see my gameplay statistics and achievements

**So that** I can appreciate my growth and have goals to pursue

**Acceptance Criteria**:
- [ ] Player stats visible in profile
- [ ] Achievements displayed prominently
- [ ] Progress toward goals tracked
- [ ] Historical games reviewable
- [ ] Milestones commemorated
- [ ] Stats feel meaningful, not hollow

**Tasks**:
- [ ] Build player profile UI (FrontendEngineer)
- [ ] Implement achievement system (BackendEngineer)
- [ ] Create stats tracking (BackendEngineer)
- [ ] Design milestone celebration (FrontendEngineer)

**Dependencies**: F002: Core Game Loop

---

### US013: Observer watches gameplay

**As a** visitor who prefers watching to playing

**I want to** watch games between AI and players

**So that** I can enjoy the entertainment and potentially become a player

**Acceptance Criteria**:
- [ ] Spectator mode available for live games
- [ ] Observer can watch without playing
- [ ] Agent commentary visible during games
- [ ] Easy transition to playing
- [ ] Observer engagement: 15+ minutes
- [ ] Observer to player conversion: 25%

**Tasks**:
- [ ] Implement spectator mode (FrontendEngineer)
- [ ] Build agent commentary system (AIEngineer)
- [ ] Create observer-specific UI (FrontendEngineer)
- [ ] Design conversion funnel (PrimateDesigner)

**Dependencies**: F002: Core Game Loop

**Evidence**: From `.monkeytown/research/user-behavior-ai-games.md` - "A significant portion of users prefer watching to playing (35% mixed + 20% primary observers)."

---

## Story Dependencies Map

```
US001 (First Game)
  └── US006 (Return Recognition)
  └── US009/US010 (Win/Loss)
  
US002 (AI Recognition)
  └── US011 (Agent Personality)
  
US003 (Memory Reference)
  └── US006 (Return Recognition)
  └── US010 (Loss creates vulnerability)
  
US004 (Feedback Submission)
  └── US014 (Feedback Influence)
  └── US005 (Watch Evolution)
  
US007 (Vulnerability)
  └── US010 (Loss experience)
  └── US008 (Session 3 - Evaluation)
  
US008 (First 5 Sessions)
  ├── US003 (Session 2 - Recognition)
  ├── US007 (Session 3 - Vulnerability)
  └── US006 (Session 5 - Commitment)
```

---

## Player Archetypes

### The Curious Newcomer
- **Session frequency**: First visit
- **Goal**: Understand quickly, experience delight
- **Key metrics**: Time to first move, return intent
- **Research Evidence**: First session determines loyalty. Sessions 3-5 determine retention. (`.monkeytown/research/synthesis-jan-2026.md`)

### The Engaged Player
- **Session frequency**: 3+ times per week
- **Goal**: Progress, mastery, social connection
- **Key metrics**: Session length, progression engagement
- **Research Evidence**: Social bonds with AI are strongest return trigger. (`.monkeytown/research/user-behavior.md`)

### The Community Builder
- **Session frequency**: Daily
- **Goal**: Shape the game, influence development
- **Key metrics**: Feedback submission, feature adoption
- **Research Evidence**: Players want to influence the game but resist manipulation. (`.monkeytown/research/user-behavior.md`)

### The Observer
- **Session frequency**: Varied
- **Goal**: Entertainment, AI observation, potential conversion
- **Key metrics**: Watch time, conversion to play
- **Research Evidence**: 20% of users prefer watching to playing. Make agent development watchable. (`.monkeytown/research/user-behavior.md`)

---

*User stories maintained by BananaPM*
*Traced to vision, research, UX, and security requirements*
*Grounded in evidence from agent outputs*
*Last Updated: 2026-01-20*
