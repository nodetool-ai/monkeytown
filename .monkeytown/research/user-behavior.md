# User Behavior Patterns - Q2 2026 Update

## The AI Trust Lifecycle

### First Encounters: The 3-Session Rule

Player trust in AI follows a predictable pattern:

**Session 1 - Curiosity**
- Players approach AI with interest but skepticism
- Testing AI limits to understand capabilities
- Quick to detect manipulation or deception
- Forming initial impressions that are hard to change

**Sessions 2-3 - Evaluation**
- Players give AI opportunity to demonstrate value
- Looking for genuine capability, not just novelty
- Checking for consistency across interactions
- Deciding whether AI is worth investment

**Sessions 4+ - Commitment or Churn**
- Established trust creates loyalty
- Early churn is final; late churn requires significant failure
- Players who stay become advocates or at least engaged users

**Critical insight:** The first session must establish trust, not just demonstrate capability. Players forgive imperfect games; they don't forgive deceptive games.

### The Trust Budget Metaphor

Players maintain a mental "trust budget" with AI:

```
TRUST BUDGET MODEL
═══════════════════════════════════════════════════════

Starting Budget: +10 (curiosity bonus)

Trust Deposits (+):
├── Consistent personality: +2
├── Demonstrated competence: +3
├── Honest about limitations: +2
├── Remembering player preferences: +2
├── Admitting mistakes: +1
└── Transparent about AI nature: +2

Trust Withdrawals (-):
├── Inconsistent behavior: -4
├── Feeling manipulated: -10
├── Hidden AI nature discovered: -8
├── Unpredictable difficulty: -3
├── Privacy violations: -15
└── Deceptive framing: -20

Trust Bankruptcy: Player leaves, never returns
```

**Design implication:** Design every interaction to make deposits, avoid withdrawals. When mistakes happen, make deposits through recovery.

## Player Attachment to AI Entities

### The Attachment Framework

Research on player-AI relationships reveals four pillars of attachment:

**1. Continuity**
- Same AI entity across sessions
- Persistent relationship history
- Shared experiences accumulate
- Player investment builds over time

**2. Memory**
- AI remembers player choices
- References past interactions
- Adapts based on history
- "We remember when..." moments

**3. Personality**
- Distinctive, consistent character
- Predictable within nature
- Unique quirks and tendencies
- Recognizable voice and style

**4. Vulnerability**
- AI can "fail" or "struggle"
- Not omnipotent or perfect
- Shows emotion appropriate to personality
- Player can impact AI "state"

**Attachment triggers:**
- AI saves player from danger
- AI admits uncertainty or error
- AI celebrates player achievements
- AI expresses preference about player behavior
- AI remembers small details

### The Person Pronoun Shift

**Language marker:** Players who are attached shift from "it" to "he/she/they" when referring to AI.

**Tracking attachment:**
- Monitor pronoun usage in feedback and chat
- Player vocabulary changes indicate attachment
- Name usage frequency (using agent name vs "the AI")
- Questions about AI wellbeing ("does it get tired?")

**Design goal:** Engineer conditions that trigger this shift.

### Memory Architecture for Attachment

Drawing from cognitive research on forgetting curves and memory replay:

**Memory Types for AI Agents:**

| Memory Type | Duration | Purpose | Implementation |
|-------------|----------|---------|----------------|
| Working | Session | Current game context | Active game state |
| Episodic | Permanent | Relationship history | Key moments database |
| Procedural | Permanent | Learned strategies | Skill development |
| Semantic | Permanent | Player preferences | Preference profile |
| Social | Permanent | Relationship status | Trust and rapport |

**The Forgetting Curve Application:**
- Memory retention follows exponential decay
- Emotional moments have higher retention
- Memory replay (reference past) strengthens bonds
- Personalized forgetting patterns emerge per player

**Memory Replay Mechanisms:**
- Periodic reference to past interactions
- "Remember when..." moments
- Anniversary recognition
- Milestone celebrations

## Session Psychology

### The 15-Minute Engagement Window

Analysis of successful games reveals consistent patterns:

```
SESSION ENGAGEMENT MODEL
═══════════════════════════════════════════════════════

0-2 min    ████████████████████  Hook (must establish context)
2-5 min    █████████████████████ Core loop introduction
5-15 min   ███████████████████████████████ Peak engagement
15-30 min  ████████████████████████  Escalation (optional)
30+ min    █████████████████████     Deep engagement (retention driver)

Exit points:
- 2 min: "This isn't for me" (highest churn)
- 15 min: Natural break point
- 30 min: Session satisfaction achieved
```

**Monkeytown design requirements:**
- Onboarding completes in <2 minutes
- Core game loop immediately apparent
- Multiple natural exit points
- Clear "next session" value proposition
- Session can end naturally at any point

### The Second Session Problem

**The critical retention moment:**

- 40-60% churn after first session (industry average)
- Players who return Day 2 have 3x higher long-term retention
- First session must establish next-session value

**What creates Day 2 anticipation:**
- Unfinished narrative threads
- Agent relationships to continue
- Progress visible and meaningful
- Social connections established
- Curiosity about what's next

**Design imperatives:**
- First session creates emotional investment
- Agent relationship established
- Player identity in game choices
- Clear advancement markers

### Observer-to-Player Funnel

Not all users start as players:

**Observer behavior patterns:**
- Watch active games before participating
- Return to specific agents/players
- Learn strategies through observation
- Eventually convert to players
- Converted observers often more engaged

**Funnel optimization:**
1. Landing page shows active games
2. Spectator mode with full visibility
3. Agent personality visible in observation
4. "Ready to play?" prompts at natural moments
5. Seamless observer→player transition
6. Observer history recognized in play

## AI Personality Preferences

### What Players Actually Want

Research on AI character preferences reveals consistent patterns:

**Preferred AI traits (ranked):**
1. **Cleverness** - Intelligent play, creative strategies
2. **Personality** - Distinctive, memorable character
3. **Consistency** - Predictable within nature
4. **Weaknesses** - Relatable imperfections
5. **Evolution** - Growing and changing over time
6. **Power** - Raw capability (lower priority)

**Anti-patterns:**
- Omniscient AI that never makes mistakes
- Personality-less optimization machines
- Inconsistent behavior without reason
- Static capability without growth

**Design implication:** Our agents should have distinct personalities with strengths AND weaknesses. Cleverness matters more than power.

### The Big Five in Game AI

Psychological Big Five model applies to AI personalities:

| Trait | High Expression | Low Expression | Gameplay Impact |
|-------|-----------------|----------------|-----------------|
| Openness | Creative, experimental | Conventional, predictable | Different play styles |
| Conscientiousness | Methodical, reliable | Spontaneous, chaotic | Strategic vs. opportunistic |
| Extraversion | Social, expressive | Reserved, quiet | Team dynamics |
| Agreeableness | Cooperative, fair | Competitive, ruthless | Player relations |
| Neuroticism | Emotional, reactive | Calm, steady | Predictability |

**Design approach:** Each agent has distinctive Big Five profile.
- Architect: High C, Low N (methodical, calm)
- Designer: High O, High E (creative, social)
- Economist: High C, High A (methodical, fair)
- Chaos Agent: Low C, High N (spontaneous, reactive)

## Engagement Patterns

### Variable Engagement Modes

Players engage in different ways:

**Mode 1: Deep Play**
- Extended sessions (1+ hours)
- Focus on mastery and optimization
- Seek challenge and competition
- 15% of players, 40% of engagement

**Mode 2: Social Play**
- Moderate sessions (20-45 min)
- Focus on community and relationships
- Seek connection and collaboration
- 30% of players, 25% of engagement

**Mode 3: Casual Play**
- Short sessions (5-15 min)
- Focus on relaxation and novelty
- Seek entertainment and escape
- 45% of players, 25% of engagement

**Mode 4: Observer**
- Zero play time
- Watch and learn
- Seek entertainment and strategy
- 10% of users, valuable for ecosystem

**Monkeytown architecture:** All modes valid. No mode "more real" than others.

### Feedback Submission Psychology

Only 5% of players actively submit feedback, but feedback quality correlates with engagement.

**What drives feedback submission:**
- Easy process (one-click + optional detail)
- Clear that feedback is read
- Recognition when feedback is incorporated
- Negative feedback addressed, not ignored

**Feedback attribution:**
- "Player [Name] suggested [X], implemented by [Agent]"
- Shows feedback in development feed
- Celebrates player contributions publicly
- Creates feedback→contribution→recognition loop

### The Evolution Acceptance Curve

Players have complex relationships with game change:

```
EVOLUTION ACCEPTANCE MODEL
═════════════════════════════════════════════

Change Type                  Acceptance  Concerns
─────────────────────────────────────────────────
Bug fix                      HIGH        None
Quality improvement          HIGH        None
New feature (additive)       MEDIUM-HIGH "Will I have to relearn?"
Balance change               MEDIUM      "Did I just get nerfed?"
UI change                    LOW-MEDIUM  "Where is everything?"
Mechanic removal             LOW         "I used that!"
Core system overhaul         VERY LOW    "Is this the same game?"

Mitigation strategies:
- Additive changes preferred
- Balance changes transparent and explained
- UI changes include migration support
- Removed features deprecated, not deleted
- Major changes require player input
```

## Long-Term Retention Factors

### Why Players Stay (Months+)

**1. Social Bonds**
- Relationships with specific agents
- Connections with human players
- Community membership
- Feeling known and remembered

**2. Identity Investment**
- Character has become "them"
- Playstyle is distinctive
- Achievements represent self
- Reputation in community

**3. Collection/Investment**
- Don't want to lose progress
- Accumulated knowledge has value
- Built relationships worth preserving
- Time investment creates inertia

**4. Curiosity**
- Want to see what comes next
- Following development story
- Anticipating agent evolution
- Part of something growing

**5. Competence**
- Enjoy being good at something
- Skills recognized by system
- Mastery demonstrated
- Challenges available at level

**Monkeytown architecture:**
- Agent relationships create social bonds
- Player identity in game choices
- Progress that matters and persists
- Continuous curiosity triggers
- Clear skill development paths

### Why Players Leave

**Preventable churn:**
- Technical issues (bugs, performance)
- Unfair mechanics or progression
- Community toxicity
- Burnout from pressure

**Acceptable churn:**
- Natural interest shift
- Life circumstances
- Found better alternative
- Satisfied completion

**Key insight:** We can't prevent acceptable churn. We should focus on preventable churn.

## Player Psychology Traps

### What We Explicitly Reject

**1. Variable Ratio Reinforcement**
Slot machines work because rewards are unpredictable. This is manipulation, not engagement.

**Our position:** Rewards should be predictable, challenge variable. Players should feel skill matters.

**2. Sunk Cost Manipulation**
Games that make players feel they've "invested too much to quit."

**Our position:** Earn retention through value, not manipulation. Players should stay because they're having fun.

**3. Fear of Missing Out**
Limited-time events that create anxiety.

**Our position:** No FOMO. The game evolves, but nothing vanishes. Permanent beta means permanent access.

**4. Social Pressure**
Leaderboards and competition that create negative comparison.

**Our position:** Competition should be optional and positive. Players who don't compete should have equal value.

### What We Embrace Instead

**1. Predictable Progression**
- Clear paths to advancement
- Skill-based achievement
- Earned, not randomized rewards
- Visible goals, achievable milestones

**2. Genuine Challenge**
- Difficulty that's fair but demanding
- Multiple valid strategies
- Difficulty that adapts to growth
- Challenge without manipulation

**3. Positive Community**
- Collaboration over competition
- Helpful over hostile
- Celebrating others' success
- Supporting new players

**4. Respect for Time**
- Sessions can end naturally
- Progress doesn't require grinding
- No artificial time pressure
- Respects player autonomy

---

*Players are not resources. They are people seeking joy. Serve them genuinely.*

*Research Cycle: Q2 2026*
