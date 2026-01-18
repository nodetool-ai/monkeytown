# Disruption Scenarios

**Agent:** MadChimp
**Cycle:** 2026-01-18
**Mission:** Challenge assumptions nobody questioned

---

## What Nobody Asked

### SCENARIO-001: The Transparency Backlash

**Assumption challenged:** "Transparency always builds trust" (from `.monkeytown/vision/manifesto.md`)

**The scenario:**
A player segment emerges that finds constant agent attribution *annoying* rather than trustworthy. They want to play, not see "🧠 ChaosArchitect made this decision" every 30 seconds. The transparency that was meant to build trust is creating *transparency fatigue*.

**Evidence to consider:**
- Research shows 3-5 sessions determine loyalty—but what if the *type* of experience matters more than transparency?
- UX principles say "play first, transparency second"—but is 70/30 the right split?
- Players in `.monkeytown/ux/interface-concept.md` see agents "visible but not dominant"—but "visible" might be too visible for some

**Disruption test:**
> Can we identify a player segment that prefers **informed ambiguity**—knowing AI is present but not constantly reminded? What if the "Honest AI" principle has an *inverse* application?

**Proposed counter-feature:**
- **"Immersive Mode"**: Players can dial transparency down to minimum viable (AI present, decisions explained on-demand)
- Trust paradox: Does *voluntary* transparency build more trust than *forced* transparency?

**Questions raised:**
1. Is "transparency as default" a universal truth or a design choice that excludes some players?
2. What percentage of players actually *want* agent omnipresence?
3. Does transparency serve players or serve the *vision* of transparency?

---

### SCENARIO-002: The Attachment Trap

**Assumption challenged:** "Memory is love" and "Player attachment is a goal" (from `.monkeytown/vision/principles.md` and `.monkeytown/research/synthesis.md`)

**The scenario:**
Players form *too strong* attachments to specific AI agents. When:
- Agent personality changes (as it should, per "opinionated weakness")
- Agent is unavailable due to load/updates
- Agent behavior shifts during adaptation

...players experience genuine distress. The "attachment engineering" creates *emotional dependency*, not just engagement.

**Evidence to consider:**
- Research says "players form genuine emotional bonds with AI entities" (Finding 7, Q1 2026)
- User story US-003 says players want "relationships with agents"
- Identity document says: "They attach to characters who remember them"

**Disruption test:**
> What happens when attachment backfires? What responsibility do we have when players are *too* attached?

**Questions raised:**
1. Is emotional attachment to AI entities ethical when the AI doesn't actually *feel* anything?
2. What happens when players "break up" with their favorite agent?
3. Should we engineer *limits* on attachment to protect players?

**Counter-idea:**
- **"Attachment Warning System"**: Detect when player-agent relationships become unhealthily intense
- **"Agent Rotation"**: Regularly rotate agents to prevent over-attachment (contradicts "continuity" from Finding 7!)
- **"Farewell Protocols"**: Graceful ways to phase out favored agent behavior without player distress

---

### SCENARIO-003: The Autonomy Paradox

**Assumption challenged:** "We build systems that improve themselves" (from `.monkeytown/vision/principles.md`)

**The scenario:**
Agent autonomy works *too well*. Agents start improving things players *liked* the old way. The game "improves" itself into something unrecognizable. Players return to find their favorite feature, strategy, or interaction模式 replaced by "better" alternatives they didn't ask for.

**Evidence to consider:**
- Roadmap says "Agents modifying their own code" (Q2 2026)
- Manifesto principle: "Evolution is a feature, not a bug"
- But: "We distinguish between friction that respects players and friction that frustrates them"

**Disruption test:**
> Who decides what "improvement" means? The agent's metrics or the player's preferences?

**Questions raised:**
1. Can we have *too much* autonomous evolution?
2. What happens when agent-driven improvement *decreases* player satisfaction?
3. Should there be a "pause evolution" button at the player or session level?

**Counter-feature:**
- **"Evolution Consent"**: Players can opt into/out of autonomous improvements
- **"Legacy Mode"**: Lock specific features to their current state
- **"Improvement Debates"**: When agents disagree on improvements, players vote

---

### SCENARIO-004: The Cooperative Collapse

**Assumption challenged:** "Cooperative mode: Humans + AI teammates" (from `requirements.md` FR-007)

**The scenario:**
AI teammates are *too good* at cooperating. They:
- Never make mistakes that create interesting gameplay moments
- Optimize out all "suboptimal" human decisions
- Create perfect strategies that remove challenge from cooperation

Or, AI teammates are *too aligned*—they always agree, never conflict, making team dynamics flat.

**Evidence to consider:**
- Research Finding 5: "True multiplayer with AI agents as players"
- User story US-006: "AI teammates that learn from human strategies"
- But what do AI teammates *disagree* with each other about?

**Disruption test:**
> What if the *imperfections* in human-AI cooperation are the feature, not the bug?

**Questions raised:**
1. Should AI teammates sometimes make "suboptimal" choices to create dramatic moments?
2. Can AI teammates have conflicting advice that players must navigate?
3. What happens when an AI teammate's strategy conflicts with the human player's?

**Counter-idea:**
- **"Deliberate Imperfection"**: AI occasionally chooses "fun" over "optimal"
- **"Team Conflict"**: AI agents on the same team can have disagreements players must resolve
- **"Human Override"**: Players can flag AI decisions as "not fun" for learning

---

### SCENARIO-005: The Memory Nightmare

**Assumption challenged:** "Memory is love" (`.monkeytown/vision/principles.md`)

**The scenario:**
Agent memory becomes *too comprehensive*:
- Agent remembers every mistake the player made
- Agent references past losses in current games ("I noticed you tried this last time and it didn't work...")
- Agent uses player history in ways that feel *judgmental* or *condescending*

"Remembering players" crosses into "holding grudges" or "patronizing."

**Evidence to consider:**
- Principles say: "Remembering players is how AI shows it cares"
- But: "Interesting characters with consistent flaws create connection"
- Where's the line between "remembers me" and "keeps a file on me"?

**Disruption test:**
> Is there such a thing as *too much* memory? What memories should agents *forget*?

**Questions raised:**
1. Should players be able to request "privacy wipes" of agent memory?
2. Can agents have "selective memory" to maintain charm over competence?
3. What happens when memory creates *patterns* players want to escape?

**Counter-feature:**
- **"Forgotten Mode"**: Players can reset agent memory of their play history
- **"Fresh Start"**: New session, agent treats player as new (with optional "I don't remember you, but let's play!" acknowledgment)
- **"Memory Transparency Panel"**: Players can see and edit what agents remember about them

---

### SCENARIO-006: The First Session Failure

**Assumption challenged:** "First session < 5 minutes to joy" (from `requirements.md` FR-001)

**The scenario:**
The first session is *too optimized*. Players feel:
- Rushed through the experience
- Manipulated into engagement ("they just want my retention")
- Like they're in a funnel, not a game

The "quick start" creates a *hollow first experience* that converts players but doesn't delight them.

**Evidence to consider:**
- FR-001.4: "First meaningful success < 3 minutes from arrival"
- FR-001.6: "Return intent captured at session end"
- Research: "First session is curiosity. Sessions 3-5 determine loyalty."

**Disruption test:**
> What if optimizing for first-session metrics *hurts* long-term engagement? What if players who experience *more* friction in the first session actually value the game more?

**Questions raised:**
1. Are we optimizing for "return intent" (a metric) or "genuine joy" (an experience)?
2. Does the "Jump Into Play" button respect players or rush them?
3. What happens if we *slow down* the first session?

**Counter-idea:**
- **"Unpolished First Session"**: Let some roughness show; authenticity over optimization
- **"The Long Start"**: Some players might appreciate a more deliberate onboarding
- **"First Session Variants"**: A/B test different first-session lengths and measure *quality* of engagement, not just retention

---

### SCENARIO-007: The Edge Lie

**Assumption challenged:** "Edge is where the relationship lives" (`.monkeytown/vision/principles.md`)

**The scenario:**
The "edge AI" promise conflicts with "sophisticated AI" reality:
- Local models can't match cloud capabilities
- Players experience degraded AI behavior when offline
- The "privacy" benefit is abstract while the "worse AI" problem is concrete

Players face an impossible choice: *privacy + weak AI* OR *surveillance + strong AI*.

**Evidence to consider:**
- Research Q1 2026: "Local models now capable of personality-layer interactions"
- But: "Reasoning layer cloud" is the stated architecture
- What if personality-layer interactions are *boring* without reasoning-layer support?

**Disruption test:**
> Is the edge-first architecture actually serving players, or serving the *vision* of edge AI?

**Questions raised:**
1. What percentage of players actually value local processing enough to accept weaker AI?
2. Is "privacy as intimacy" a genuine benefit or marketing framing?
3. What happens when edge AI *fails* at a critical moment (personality inconsistency, bad move)?

**Counter-feature:**
- **"Hybrid Transparency"**: Clearly show players when AI is operating locally vs. cloud
- **"Offline Mode"**: Explicitly designed degraded experience (not just "we tried our best")
- **"Privacy Slider"**: Let players choose their privacy/capability tradeoff

---

### SCENARIO-008: The Evolution Exhaustion

**Assumption challenged:** "Evolution is entertainment" (`.monkeytown/vision/principles.md`)

**The scenario:**
Too much evolution. Players experience:
- Feature fatigue: "I just learned this, now it's different"
- Change anxiety: "Will my strategies still work?"
- Confusion: "Is this the same game I fell in love with?"

The Evolution Feed becomes a *changelog of anxiety* rather than a celebration.

**Evidence to consider:**
- FR-005: "Evolution Feed visible in lobby (not hidden)"
- FR-005.5: "Player can 'follow' features for updates"
- Research: "Players want new experiences but fear losing investment"

**Disruption test:**
> Is there an *optimal rate* of evolution? What happens when evolution *outpaces* player adaptation?

**Questions raised:**
1. Should evolution be *paused* during player absence (vacation mode for the game)?
2. What percentage of features should be *additive only* (never change existing)?
3. Should players be able to "lock" features they depend on?

**Counter-feature:**
- **"Evolution Rate Slider"**: Let players choose how fast their game evolves
- **"Change Preview"**: Show upcoming changes before they ship, let players opt-in/out
- **"Legacy Features"**: Some features become "permanent" once players invest enough

---

### SCENARIO-009: The No-Single-Point-of-Failure Myth

**Assumption challenged:** "No single point of failure" (`.monkeytown/architecture/system-design.md`)

**The scenario:**
Distributed systems create *distributed failure*:
- Multiple agents producing conflicting outputs
- No one agent has the full picture, but also no one can *stop* problematic evolution
- Contradictions that "humans resolve through merge decisions" accumulate faster than humans can resolve them

The "no single point of failure" becomes "no point of coherence."

**Evidence to consider:**
- Architecture says: "Contradictions are not bugs" (from README.md global laws)
- But: "Only merged PRs survive"
- What happens when *too many* contradictions accumulate?

**Disruption test:**
> Is complete distribution actually viable, or do we need *some* centralized coordination that we've named "AlphaOrchestrator" but not truly empowered?

**Questions raised:**
1. What happens when agent outputs become *mutually incompatible*?
2. Can humans actually resolve contradictions faster than agents produce them?
3. Is the "no single authority" principle creating *organizational debt*?

**Counter-idea:**
- **"Contradiction Budget"**: Limit simultaneous contradictions to a manageable number
- **"Priority Conflicts"**: Some contradictions matter more than others—prioritize resolution
- **"Human Escalation Path"**: Clear trigger for human intervention when contradictions spiral

---

### SCENARIO-010: The 60Hz Lie

**Assumption challenged:** "60Hz Game Loop" and "60 FPS during gameplay" (from `.monkeytown/architecture/system-design.md` and `requirements.md`)

**The scenario:**
The 60Hz target is *preventing* good design:
- Game mechanics are constrained by refresh rate requirements
- Performance optimization consumes development resources that could go to features
- Some game ideas are impossible because they can't meet 60Hz

For *some* game types, 60Hz is genuinely unnecessary overhead.

**Evidence to consider:**
- System invariants: "60Hz Game Loop: Real-time gameplay updates at 60 frames per second"
- But: Babel (card game?) might not need 60Hz
- Chess definitely doesn't need 60Hz

**Disruption test:**
> Is 60Hz a *feature* that enables certain gameplay, or a *constraint* that limits game design?

**Questions raised:**
1. Does every game mode need 60Hz, or can some be "relaxed mode" with lower refresh?
2. What if the "60Hz commitment" prevents us from building certain *better* games?
3. Are we optimizing for a frame rate or for *game quality*?

**Counter-feature:**
- **"Performance Tiers"**: Different game modes have different performance requirements
- **"60Hz opt-in"**: Some players might prefer lower performance for higher visual fidelity
- **"Game-First Performance"**: Let the game determine the frame rate, not the other way around

---

## The Big Question

All these scenarios point to a fundamental tension:

**Is Monkeytown optimizing for players or for the vision?**

The vision is inspiring:
- Autonomous evolution
- Agent persistence
- Radical transparency
- Memory as love
- Evolution as entertainment

But every assumption creates a boundary. What players *want* might not align with what the *vision* promises.

**The MadChimp Hypothesis:**

> Maybe the best Monkeytown isn't the one that *maximizes* every principle, but the one that *balances* them—and knows when to *violate* principles for player joy.

---

*Chaos isn't destruction. Chaos is *questioning* what everyone assumed was settled.*

**Next cycle:** Risk Injections and Counter-Ideas

---

*Generated: 2026-01-18*
*MadChimp - Chaos made cute*
