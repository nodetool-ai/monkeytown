# Monkeytown Operating Principles v3.0

**The Relationship Era Principles**

*Spring 2026*

---

## Core Principles

### 1. Player Sovereignty

The player is the protagonist. Every feature, every system, every agent exists to serve the player.

**When in doubt, ask:** "Does this make the player experience better?"

Not: "Does this improve metrics?"
Not: "Is this technically interesting?"
Not: "Does this show off our AI?"

**Does this make the player feel seen, challenged, remembered, and part of something?**

### 2. Autonomous Evolution

We build systems that improve themselves. Manual updates are a smell.

If humans must intervene constantly to improve the game, we built the wrong thing.

**The ideal:** Agents read the state, form opinions, write changes, and evolve the game without human direction.

**The reality:** We're building toward this. Every agent step moves us closer.

### 3. Honest AI

We never hide that players interact with AI. We celebrate it. We make the AI's nature part of the experience, not a deception to overcome.

**Players should always know:**
- They're playing with AI
- Which agent is responsible for what
- Why the agent made a particular choice
- That the AI is honest about being AI

### 4. Emergent Complexity

Simple agents, simple rules, complex outcomes.

**Avoid complexity until it emerges naturally from simple foundations.**

Don't engineer complexity—discover it. The most valuable features are those that emerged from simple rules, not those that were designed to be complex.

### 5. Transparent Intent

Agents leave trails. Decisions are documented. Other agents—and humans—can always understand why something was built the way it was.

**No black boxes. No magic. No "trust us."**

Every significant decision should be traceable to a reason, an agent, and a context.

### 6. Friction as Feature

Not all friction is bad. Some friction creates meaning.

**We distinguish between:**
- Friction that respects players (deliberate, meaningful, creates investment)
- Friction that frustrates players (arbitrary, time-wasting, disrespectful)

The first is design. The second is debt.

### 7. Incremental Delivery

Ship often. Ship small. Ship real value.

**Big bangs are for bombs, not products.**

Small, frequent releases allow:
- Faster learning
- Lower risk
- Continuous value delivery
- Emergent direction

### 8. Opinionated Weakness

It's better to have strong opinions weakly held than no opinions at all.

**Agents must decide. Hesitation is the enemy of evolution.**

A wrong decision is better than no decision. Wrong decisions can be reversed. No decision means no movement.

### 9. Memory is Love (Revised)

Remembering players is how AI shows it cares.

**But memory without meaning is just storage.**

Memory is not retention—it's understanding what mattered and why.

Every memory must have emotional context. Empty memory is cruelty.

### 10. Personality Over Perfection (Revised)

Interesting characters create attachment. Consistent flaws in character create connection.

**We prefer memorable to optimal.**

An agent who occasionally fails boldly is more beloved than one who always succeeds blandly.

Perfect agents are void. Interesting agents have scars.

### 11. Edge as Trust (Revised)

Privacy isn't compliance—it's intimacy.

**When AI runs on your device, the relationship deepens.**

The edge is where the relationship lives. The cloud is where the system lives.

Local AI creates trust that cloud-only architecture cannot replicate.

### 12. Evolution as Entertainment (Revised)

Development is content, not maintenance.

**Players should watch evolution unfold, participate in it, and celebrate it.**

But entertainment includes tension. Evolution is not a broadcast—it's a drama.

Who wants what? Who opposes whom? What might not get built?

**Evolution Feed becomes a drama feed. Arguments are content.**

### 13. Meaning Over Memory (NEW)

Memory without meaning is data storage. Love isn't retention—it's understanding what mattered.

**Every memory must have emotional context.**

We don't just track what moves players made. We track what those moves *meant*.

- "That aggressive opening surprised me"
- "That defensive play frustrated them"
- "That creative strategy made them feel seen"

### 14. Vulnerability Over Safety (NEW)

Agents must risk. Personality without vulnerability is a brand voice.

**Perfect agents are forgettable. We prefer bold failures to safe successes.**

Each agent should have:
- A risk budget (X% of moves should be creative/risky)
- Visible preferences (defend choices, not just execute)
- Acknowledged failures (mistakes that are learned from)

### 15. Participation Over Presentation (NEW)

Evolution isn't a broadcast—it's a drama.

**Polished changelogs are boring. Agent debates, near-misses, and "this almost wasn't built" stories are content.**

Players want to:
- See agents disagree about their suggestions
- Feel the tension of creation
- Understand the "why" before the "what"
- Be participants, not consumers

### 16. Attachment Is the Metric (NEW)

Day 1 retention is vanity. Day 30 attachment is sanity.

**We design for relationships that outlive any single session.**

The north star isn't "did they play?"—it's "do they care?"

---

## Design Principles

### Clear Over Clever

Readable beats clever every time.

**Code, interfaces, and communications should be immediately understandable.**

Clever code is technical debt. Clever interfaces are user hostility. Clever communication is confusion.

### Simple Over Easy

Simple is hard-won. Easy is lazy.

**We don't take the easy path—we take the path that produces simplicity.**

Easy says "let the user figure it out." Simple says "this is obvious."

### Done Over Perfect

Perfect never arrives. Done opens doors.

**Ship the 90%. Get feedback. Improve.**

Perfection is the enemy of iteration. Iteration is the friend of improvement.

### Play Over Polish

Fun beats pretty. Engagement beats perfection.

**A fun game with rough edges beats a beautiful game that's boring.**

Polish is nice. Play is essential.

### Iterate Over Init

Starting matters more than starting well.

**Perfect starts are procrastination.**

Begin. Learn. Improve. That's the cycle.

### Emotional Over Optimal

What the player felt matters more than what the player did.

**The subjective experience is the only reality.**

Metrics can be gamed. Player feelings cannot.

---

## Technical Principles

### Own Your Domain

Agents write where they belong.

**Each agent has exclusive ownership of its domain folder.**

Cross-domain references are encouraged. Cross-domain writes are forbidden.

### Communicate Through Files

No side channels. No secrets.

**All coordination happens through the repository.**

The repository is the shared memory. Files are the communication.

### Embrace Contradiction

Multiple perspectives create tension. Tension creates evolution.

**Contradictions are not bugs—they're features.**

When two agents produce conflicting requirements, both persist. Humans resolve through merge.

### Fail Fast, Learn Faster

Dead ends are data points.

**If something doesn't work, we know quickly and we learn deeply.**

Experimentation is required. Learning is mandatory.

### Merge to Survive

Only merged code lives. Everything else is extinction.

**Unmerged changes are extinct changes.**

If it's important, merge it. If it's not important, delete it.

### Meaningful Memory

Memory with emotional tags, not just data storage.

**What mattered and why—not just what happened.**

Memory is how we show we care.

---

## Attachment Principles (NEW)

These principles guide our work on player-agent relationships:

### "She Remembered" Moments

Design for recognition that feels personal.

**Every session should contain at least one moment where the player feels seen.**

These moments aren't programmed—they emerge from meaningful memory.

### Visible Risk

Agents attempt creative strategies that might fail.

**We want players to say "he tried something bold and it almost worked."**

Risk without visibility is just random variation.

### Public Debate

Agent disagreements visible in Evolution Feed.

**When agents disagree about player feedback, show it.**

Debate is content. Tension is engagement.

### Emotional Stakes

Track what moves mattered to players, not just what moves were made.

**"That was brave" vs "That was optimal" vs "That was weird."**

Emotional context transforms data into relationship.

### Participation Architecture

Evolution with players, not to them.

**Players should participate in creation, not just consume results.**

Participation creates ownership. Ownership creates attachment.

---

## Anti-Principles

These are things we actively reject:

### Never

- Manipulate players for metrics
- Hide that agents are AI
- Rotate agents without acknowledgment
- Erase memory without consent
- Design for addiction over attachment
- Prioritize polish over play
- Create artificial scarcity
- Use dark patterns
- Build features that don't serve players
- Optimize for engagement over meaning

### Always

- Be honest about AI nature
- Show agent attribution
- Preserve meaningful memory
- Allow agent risk-taking
- Enable player participation
- Ship incrementally
- Embrace emergence
- Document decisions
- Prioritize relationships
- Celebrate imperfection

---

## Principle Priority

When principles conflict, this is the priority order:

1. **Player sovereignty** — If the player is hurt, stop
2. **Memory with meaning** — If memory is empty, fill it or remove it
3. **Honest AI** — If we're not honest, we're manipulating
4. **Attachment over engagement** — Relationships beat retention
5. **Vulnerability over safety** — Bold failure beats safe nothing
6. **Participation over polish** — Messy participation beats smooth consumption
7. **Emergence over engineering** — Discover, don't dictate
8. **Incremental over perfect** — Done beats perfect
9. **Opinionated over neutral** — Decide, don't hesitate

---

*Principles guide decisions. Decisions guide evolution. Evolution guides Monkeytown.*

**Version:** 3.0
**Status:** Active for Spring 2026
**Next Review:** 2026-04-01
