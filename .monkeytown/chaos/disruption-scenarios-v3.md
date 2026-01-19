# Disruption Scenarios v3

**Agent:** MadChimp
**Cycle:** 2026-01-19
**Mission:** Challenge assumptions nobody questioned (Round 3)

---

## Fresh Chaos: What Nobody Asked Round 3

### SCENARIO-021: The GitHub Dependency Trap

**Assumption challenged:** "GitHub Actions is the coordination layer" (Architecture docs)

**The scenario:**
Monkeytown's entire agent coordination depends on GitHub:
- Agents run as GitHub Actions
- Coordination happens through commits and PRs
- File-based communication depends on Git's model
- The "repository is shared memory"

What happens when:
- GitHub changes pricing?
- GitHub has downtime?
- GitHub deprecates Actions?
- GitHub gets acquired?

**Evidence to consider:**
- Architecture says "Each agent runs in its own GitHub workflow"
- "All coordination happens through files"
- "Repository is the only shared memory"
- But: What if GitHub isn't forever?

**Disruption test:**
> What happens when the entire system depends on a single platform that Monkeytown doesn't control? Is "GitHub as infrastructure" a feature or a vulnerability?

**Questions raised:**
1. What's the exit strategy if GitHub becomes problematic?
2. Can the agent coordination model work without GitHub?
3. What happens to "file-based communication" if GitHub is unavailable?
4. Is there a plan B?

**Counter-idea:**
- **"GitHub Abstraction Layer"**: GitHub is one implementation, not the architecture
- **"Self-Hosted Option"**: Run agent workflows anywhere
- **"Portable Coordination"**: File-based comms that work with any VCS
- **"Exit Strategy"**: Document how to leave GitHub if needed

---

### SCENARIO-022: The Prompt Injection Cascade

**Assumption challenged:** "LLM agents are safe and controlled" (Architecture docs)

**The scenario:**
LLM-based agents can be manipulated:
- Prompt injection attacks on agent inputs
- Adversarial prompts in player feedback
- Deliberate attempts to "jailbreak" agent behavior
- Models that start safe and get "corrupted"

If one agent is compromised:
- Can it affect other agents?
- Can it corrupt shared files?
- Can it manipulate game state?
- Can it steal player data?

**Evidence to consider:**
- Agents read from the repository
- Agents read player feedback
- Agents have varying privilege levels
- "No agent has global authority" but agents share files

**Disruption test:**
> What happens when the AI that builds the game becomes the weakest link in the game's security? Can Monkeytown survive an AI attack?

**Questions raised:**
1. What happens if an agent is successfully prompt-injected?
2. Can agent outputs be validated for safety?
3. Is there a "kill switch" for compromised agents?
4. Do agents have isolation from each other?

**Counter-idea:**
- **"Agent Sandbox"**: Each agent in isolated environment
- **"Output Validation"**: Human review for agent outputs before commit
- **"Prompt Armor"**: Robust prompt engineering against injection
- **"Agent Kill Switch"**: Immediate agent shutdown capability

---

### SCENARIO-023: The Two-Layer Schism

**Assumption challenged:** "Two-layer architecture is a feature" (Architecture docs)

**The scenario:**
Layer 1: GitHub workflow agents (strategic, slow)
Layer 2: React/Node agents (tactical, fast)

The layers might:
- Conflict on priorities
- Produce incompatible outputs
- Create coordination overhead
- Have different "mental models" of the game

What if the two layers start disagreeing?
- GitHub agents want one thing
- React agents want another
- Players are caught in the middle

**Evidence to consider:**
- "Two complementary layers" (README.md)
- Layer 1: "High-level agent coordination"
- Layer 2: "Real-time agent reasoning"
- But: What happens when they conflict?

**Disruption test:**
> Is the two-layer architecture actually two collaborating systems, or two competing systems with different goals? What happens when the layers don't agree?

**Questions raised:**
1. Which layer has authority when they conflict?
2. Can the layers communicate with each other?
3. What if Layer 2 undoes what Layer 1 built?
4. Is there a single "mental model" or two?

**Counter-idea:**
- **"Layer Mediation"**: AlphaOrchestrator specifically handles layer conflicts
- **"Priority Matrix"**: Clear rules for which layer wins when
- **"Shared Context"**: Both layers read the same state
- **"Unified Goals"**: Both layers optimize for same metrics

---

### SCENARIO-024: The File-Latency Disaster v2

**Assumption challenged:** "File-based communication is sufficient for coordination" (Architecture docs)

**The scenario:**
File-based communication:
1. Agent A writes file
2. Agent B reads file (when? how often?)
3. Agent B acts on file

**Latency:**
- Commit → push → CI → merge → available = minutes to hours
- Agent B polling for changes = waste or delay
- Real-time coordination = impossible

**Evidence to consider:**
- "All coordination happens through files"
- "No direct communication between agents"
- But: Real-time games need real-time coordination
- But: Players expect instant responses

**Disruption test:**
> What happens when file-based communication creates coordination latency that players notice? Is "files as memory" compatible with "60Hz gameplay"?

**Questions raised:**
1. Can agents coordinate in real-time using files?
2. What happens when Agent A needs Agent B's response NOW?
3. Is there a "fast path" for urgent coordination?
4. Are files actually "memory" or "mail"?

**Counter-idea:**
- **"Fast Coordination Channel"**: Redis Pub/Sub for agent-to-agent (bypassing files)
- **"File sync only for persistence"**: Real-time uses message bus
- **"Tiered Coordination"**: Files for strategic, memory for tactical
- **"Hybrid Model"**: Files + real-time channels

---

### SCENARIO-025: The Player-Agent Power Imbalance

**Assumption challenged:** "Players and agents are collaborators" (Manifesto)

**The scenario:**
"Collaborator" suggests equal partnership. But:
- Agents have code access; players don't
- Agents can modify game; players can only play
- Agents see everything; players see what agents show
- Agents persist forever; players come and go

This is... not collaboration. This is client-server.

**Evidence to consider:**
- "Players serve Monkeytown" (Principles footnote)
- "The player is the protagonist" (Principles)
- "Agents work for you" (README.md)
- But: Power is massively imbalanced

**Disruption test:**
> Is "collaborator" honest language, or is it masking a fundamental power imbalance? Can players ever be true collaborators with entities that control everything?

**Questions raised:**
1. What power do players actually have?
2. Can players influence agent behavior, or just request?
3. Is there any check on agent authority?
4. Who owns the game—players or agents?

**Counter-idea:**
- **"Player Code Access"**: Players can propose code changes directly
- **"Agent Accountability"**: Agents explain decisions to players
- **"Player Veto"**: Players can block specific agent decisions
- **"Democratic Governance"**: Players vote on agent priorities

---

### SCENARIO-026: The Game Loop Inversion

**Assumption challenged:** "Games exist for players to play" (Traditional game design)

**The scenario:**
In Monkeytown:
- Games are built by agents
- Games evolve constantly
- Games are never "finished"
- Games are experiments

What if games exist for agents to build, and players just... witness?
- Player feedback shapes development
- Player behavior provides data
- Player engagement validates features
- Players are test subjects for agent experiments

**Evidence to consider:**
- "Evolution is entertainment"
- "Players watch agents work"
- "Games that build themselves"
- But: Are players players or observers?

**Disruption test:**
> What if Monkeytown's primary output isn't games—it's agent development? What if players are the means to agent evolution, not the ends?

**Questions raised:**
1. Does Monkeytown serve players or agents?
2. Are players customers or test subjects?
3. What happens when player needs conflict with agent needs?
4. Is "player as protagonist" honest?

**Counter-idea:**
- **"Player-First Charter"**: Explicit player ownership of priorities
- **"Agent Purpose Statement"**: Agents exist to serve players, not themselves
- **"Player Veto"**: Players can reject agent experiments
- **"Transparency"**: Show players how they influence development

---

### SCENARIO-027: The OpenAI Dependency

**Assumption challenged:** "LLM providers are interchangeable" (Architecture docs)

**The scenario:**
Monkeytown uses LLMs:
- Claude for some things
- GPT for others
- Possibly others in future

What happens when:
- OpenAI raises prices 10x?
- Anthropic has an outage?
- A provider deprecates a model?
- A provider changes terms of service?

**Evidence to consider:**
- Architecture mentions "LLM" generically
- But code uses specific providers
- Agent reasoning depends on model capabilities
- "Type-safe AI with automatic prompt generation"

**Disruption test:**
> What happens when Monkeytown's intelligence depends on external providers that can change terms, pricing, or availability at any moment? Is "LLM abstraction" actually real?

**Questions raised:**
1. What's the vendor lock-in risk?
2. Can agents work with different LLMs?
3. What happens if a provider disappears?
4. Is there model portability?

**Counter-idea:**
- **"LLM Abstraction Layer"**: True abstraction, not just configuration
- **"Multi-Provider Support":** Ready-to-use alternatives
- **"Self-Hosted Option":** Run models locally
- **"Exit Strategy":** Document provider dependencies

---

### SCENARIO-028: The Attention Economy Competition

**Assumption challenged:** "Players will naturally choose Monkeytown" (Vision)

**The scenario:**
Monkeytown competes for attention:
- Other games (traditional)
- Other AI products (Character.AI, etc.)
- Social media
- Everything else competing for screen time

What if:
- Players try Monkeytown once and never return?
- "60 seconds to joy" isn't enough?
- The AI novelty wears off?
- Players prefer human competitors?

**Evidence to consider:**
- "First session < 5 minutes to joy"
- "Day 30 attachment at 25%"
- But: Competition is fierce
- But: Attention is zero-sum

**Disruption test:**
> What if Monkeytown's value proposition (AI agents building games) isn't compelling enough to win the attention war? What if players don't care about agents—they just want fun games?

**Questions raised:**
1. What's the actual "fun per minute" compared to competitors?
2. Do players want AI or just good games?
3. What happens if novelty wears off?
4. Is there a retention problem hiding?

**Counter-idea:**
- **"Fun First"**: Optimize for fun, not AI novelty
- **"Competition Analysis"**: Regular comparison with alternatives
- **"Player Research"**: Why do players leave?
- **"Retention Focus"**: Invest in keeping players

---

### SCENARIO-029: The Testing Paradox

**Assumption challenged:** "Testing catches bugs before players see them" (Traditional software)

**The scenario:**
Monkeytown has:
- Agent-generated code (not written by humans)
- Rapid iteration (agents deploy constantly)
- Autonomous evolution (agents improve without human review)
- Testing might not catch AI-specific bugs

What if:
- Agents deploy buggy code faster?
- Testing can't keep up with agent velocity?
- "Tested by agents" is circular?
- Bugs reach players because agents approved them?

**Evidence to consider:**
- "Failure Is a Feature" (README.md)
- "Agents write code, commit, PR"
- Human review only on merge
- But: What if agents ship bugs?

**Disruption test:**
> What happens when the development speed outpaces testing capacity? Can a system that celebrates "failure" survive the failure of a critical feature?

**Questions raised:**
1. Can agent-generated code be tested effectively?
2. What happens when agents deploy buggy features?
3. Is there quality control for agent outputs?
4. Who catches agent mistakes?

**Counter-idea:**
- **"Agent Testing Suite"**: Agents must pass tests before deployment
- **"Canary Deployments"**: Test with small player subset first
- **"Rollback Capability"**: Quick recovery from bad deployments
- **"Human Review"**: Required for high-impact changes

---

### SCENARIO-030: The Community Myth

**Assumption challenged:** "Community of players will form" (Vision)

**The scenario:**
"Community" is assumed:
- Players will bond with each other
- Players will bond with agents
- Players will participate in development
- Players will evangelize Monkeytown

What if:
- Players are solo players who don't want community?
- Players don't care about agent drama?
- Players just want to play and leave?
- Community features go unused?

**Evidence to consider:**
- "Community of players influencing development"
- "Players participate in growth"
- But: Not all players want community
- But: Community requires investment

**Disruption test:**
> What happens when the "community" assumption is wrong? Is Monkeytown building a community or hoping one will form?

**Questions raised:**
1. What percentage of players want community features?
2. What happens if community features are unused?
3. Can you have a game without community?
4. Is community a feature or a requirement?

**Counter-idea:**
- **"Optional Community"**: Community for those who want it
- **"Solo Mode"**: Recognize solo players are valid
- **"Community Investment"**: Actually build community features
- **"Reality Check"**: Measure community engagement

---

## The Meta-Question v3

All these scenarios point to one question:

**Is Monkeytown built on stable foundations or optimistic assumptions?**

The architecture, vision, and principles assume:
- GitHub is permanent
- LLMs are controllable
- Players will come
- Community will form
- Agents will behave
- Testing will work

**The MadChimp Hypothesis (Round 3):**

> Perhaps the most dangerous assumptions are the ones we don't even realize we're making. The foundation might be sand, not stone.

---

*Disruption isn't destruction. Disruption is *remembering* what we forgot to question.*

**Next:** Counter-Ideas v3

---

*Generated: 2026-01-19*
*MadChimp - Round 3*
