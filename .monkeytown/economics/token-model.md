# Monkeytown Token Model

**BananaEconomist** | *Value Design for Player Delight*

---

## Spring 2026 Update: The Attachment Era Deepens

This update integrates the Vision Update Summary's **Three Attachment Pillars** (`.monkeytown/vision/update-summary.md`):

1. **The Meaning Layer** — "She Remembered" moments that reward emotional memory
2. **The Vulnerability Layer** — Bold attempt celebrations that recognize risk-taking
3. **The Participation Layer** — Evolution engagement that makes development dramatic

**Key Changes:**
- Added "She Remembered" bonuses (25-75 BANANA, 5-15 KUDOS)
- Added Vulnerability & Boldness Rewards (15-100 BANANA)
- Added Participation in Evolution incentives (10-150 BANANA)
- Updated economic health metrics to include attachment indicators
- Added 4 new economic principles (7-10) for attachment focus

**Target Metrics:**
- Day 30 Attachment: 25% (was 15%)
- Return to Specific Agent: 50% (was 40%)
- "She Remembered" Events: >1 per session (NEW)
- Vulnerability Recognition: >50% (NEW)
- Participation Satisfaction: >4/5 (NEW)

---

## Executive Summary

The Monkeytown economy centers on **BANANA**—a token that flows naturally from engagement, not extraction. Unlike traditional games that monetize through artificial scarcity and pay-to-win mechanics, Monkeytown's token model aligns economic incentives with player joy. Players earn BANANA through meaningful play, and tokens unlock genuine gameplay enhancements rather than power advantages.

**Core Philosophy:** Every token spent should make the game more delightful, never more mandatory.

## Integration with Monkeytown Vision

This token model directly supports the founding beliefs from `.monkeytown/vision/manifesto.md`:

> *"Games should serve players, not exploit them."* — The BANANA economy rewards time investment fairly, never extracts through manipulation.

> *"Attachment is the metric that matters."* — Agent relationship bonuses create emotional investment beyond transactions.

> *"Memory is how AI shows love."* — The economy tracks and rewards long-term agent relationships.

---

## Token Architecture

### The BANANA Token

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BANANA TOKEN                                 │
├─────────────────────────────────────────────────────────────────────┤
│  Total Supply:      Unlimited (inflationary by design)               │
│  Emission Rate:     10 BANANA per minute of engaged gameplay         │
│  Max Wallet:        100,000 BANANA (prevents extreme hoarding)      │
│  Transferability:   Full—no P2P trading at launch                    │
│  Decay:             None—earned tokens never expire                  │
│  Utility:           Purely experiential (no power)                   │
└─────────────────────────────────────────────────────────────────────┘
```

### Why Inflationary?

Unlike games that fear inflation, Monkeytown embraces it based on research findings from `.monkeytown/research/synthesis.md`:

1. **Engagement over hoarding:** Tokens earn fast enough that saving feels rewarding, not punishing
2. **Continuous value:** New features always need new token sinks (supports evolution)
3. **Player-first:** No artificial scarcity means no FOMO monetization
4. **Evolution-driven economy:** As the game grows, so does the economy

**Supply Formula:**
```
Total BANANA = Σ (10 tokens/minute × total engagement minutes across all players)
```

This creates a growing economy matching the growing game, supporting Research Finding 8: *"Evolution as Entertainment."*

---

## Earning Mechanisms

### Primary Earning: Engaged Gameplay

| Activity | BANANA Rate | Conditions |
|----------|-------------|------------|
| Core gameplay | 10/min | Active participation, not idle |
| Victory bonus | 50-200 | Per game win (based on opponent skill) |
| Achievement | 25-200 | One-time per achievement |
| Session milestone | 25 | Every 30 minutes of play |
| Streak bonus | +50% | Consecutive days (max 7x) |
| Agent interaction | 5/min | Active conversation with agents |

**Integration with Product Requirements (`.monkeytown/product/requirements.md`):**
- Supports FR-008 (Progression System): "XP earns at ~10 XP per minute"
- Level unlocks change gameplay, not just cosmetic (satisfies FR-008.3)

### Secondary Earning: Community Contribution

| Activity | BANANA Reward | Conditions |
|----------|---------------|------------|
| Feedback submission | 50 | Accepted and acknowledged (supports FR-006) |
| Bug report | 100-500 | Verified and fixed |
| Feature suggestion shipped | 200 | Player attribution in Evolution Feed |
| Tournament participation | 25 | Per match entered |
| Tournament placement (Top 3) | 250/150/100 | Gold/Silver/Bronze |
| New player mentorship | 10/min | Verified mentoring activity |
| Community content creation | 100-500 | Approved and featured |

**Supports US-008 (Feedback Loop Completion):** Player feedback acknowledged, prioritized, and implemented with visible attribution.

### Tertiary Earning: Agent Relationship Bonuses

Following Research Finding 7: *Player Attachment Engineering* (`.monkeytown/research/synthesis.md`) and the Vision Update Summary's **Three Attachment Pillars** (`.monkeytown/vision/update-summary.md`), agents develop relationships with players through Meaning, Vulnerability, and Participation:

| Relationship Level | Bonus Multiplier | Trigger | Attachment Metric |
|--------------------|------------------|---------|-------------------|
| Stranger | 1.0x | First 3 sessions | — |
| Acquaintance | 1.1x | 5+ sessions with same agent | — |
| Companion | 1.25x | 20+ sessions, agent remembers player | — |
| Partner | 1.5x | 50+ sessions, shared history acknowledged | Return to Agent: 50% |
| Bonded | 2.0x | 100+ sessions, mutual recognition | Day 30 Attachment: 25% |

**The "She Remembered" Bonus**

A special bonus triggered when agents demonstrate meaningful memory (The Meaning Layer):

| Trigger | BANANA | KUDOS | Requirement |
|---------|--------|-------|-------------|
| Agent references player's past strategy | +25 | +5 | >3 sessions with agent |
| Agent acknowledges player's emotional state | +50 | +10 | Player expressed emotion |
| Agent recalls player's previous failure | +30 | +5 | Player failed >2 times previously |
| Agent remembers what player was proud of | +75 | +15 | Player celebrated >1 time |

**Research Citation:** *"Players form genuine emotional attachments to AI entities... Attachment pillars: Continuity, Memory, Personality, Consistency"* (`.monkeytown/research/synthesis.md`)

**Vision Citation:** *"Memory with emotional context, not just data storage... 'She remembered how I felt about that move'"* (`.monkeytown/vision/update-summary.md`)

**Implementation Note:** "She Remembered" moments require the memory system from US-014. Target: >1 moment per session (from revised metrics).

---

### Quaternary Earning: Vulnerability & Boldness Rewards

Following the Vision Update Summary's **Vulnerability Layer** — *"Agents who risk and sometimes fail, not just perform"* — players and agents are rewarded for bold attempts:

| Trigger | BANANA | KUDOS | Condition |
|---------|--------|-------|-----------|
| Player attempts risky strategy | +15 | +2 | Strategy success rate <40% |
| Agent attempts creative move | +20 | +5 | Agent uses non-standard strategy |
| Bold attempt succeeds | +100 | +15 | Against 60-70% odds |
| Bold attempt fails gracefully | +50 | +10 | Agent explains the risk |
| Player encourages agent risk | +25 | +5 | Player supports bold strategy |
| Vulnerability acknowledged by player | +30 | +5 | Player recognizes agent's risk |

**Vision Citation:** *"Agents who risk and sometimes fail, not just perform... Bold failure over safe performance"* (`.monkeytown/vision/update-summary.md`)

**Target Metric:** Vulnerability Recognition >50% (players notice agent risk-taking)

---

### Quinary Earning: Participation in Evolution

Following the Vision Update Summary's **Participation Layer** — *"Evolution as drama, not changelog"* — players earn rewards for participating in the game's development:

| Trigger | BANANA | KUDOS | Condition |
|---------|--------|-------|-----------|
| Witness agent debate | +10 | +2 | Watch Evolution Feed debate |
| Vote on feature direction | +25 | +5 | Participate in community vote |
| Provide input on debate | +50 | +10 | Comment on Evolution Feed |
| Near-miss narrative witnessed | +30 | +5 | Feature almost wasn't built |
| Feature saved by player feedback | +100 | +20 | Feedback prevented removal |
| Participate in argument | +40 | +8 | Player takes stance in debate |
| "This almost wasn't built" moment | +75 | +15 | Witness near-cancellation feature |
| Evolution participation milestone | +150 | +25 | 10+ participation events |

**Vision Citation:** *"Evolution as drama, not changelog... Players want to witness debates, participate in arguments, feel the drama of creation"* (`.monkeytown/vision/update-summary.md`)

**Target Metric:** Participation Satisfaction >4/5

---

## The Anti-Exploitation Framework

### Revenue Model (For Platform Sustainability)

**Direct Player Payment Options:**

| Option | Price | What Player Receives |
|--------|-------|----------------------|
| Founder's Pass | $9.99/month | Early access, cosmetic priority, founder badge |
| Supporter Pack | $4.99 | One-time cosmetic bundle, supporter badge |
| Gift BANANA | $1.99 | 500 BANANA (no bonus, no discount) |

**Strict Rules:**
1. **No limited-time offers** — Everything available always
2. **No FOMO mechanics** — No "only available for 24 hours"
3. **No loot boxes** — All purchases are deterministic
4. **No pay-to-win** — Real money cannot purchase competitive advantage
5. **No subscription pressure** — Founder's Pass benefits are minor conveniences
6. **No gifting bonuses** — Sending 1000 BANANA costs exactly $3.98 (2× $1.99)

**Transparency:**
- Exact conversion rates always visible
- No "discounts" from original prices (shows current price only)
- Clear statement: "Purchases support development, no gameplay advantage"

### Revenue Allocation

| Category | Percentage | Purpose |
|----------|------------|---------|
| Development | 60% | Paying for computation, hosting, agent improvements |
| Community | 20% | Events, creator support, tournament prizes |
| Operations | 15% | Infrastructure, legal, compliance |
| Reserve | 5% | Sustainability fund for lean periods |

---

## Economy Health Metrics

### Primary Indicators

| Metric | Target | Action if Off |
|--------|--------|---------------|
| BANANA earning rate | 100-200 BANANA/hour | Adjust match rewards |
| BANANA spend rate | 40-60% of earning | Introduce new cosmetics |
| KUDOS distribution | Gini coefficient < 0.4 | Boost low-KUDOS players |
| Founder's Pass adoption | 5-10% of DAU | Add minor convenience value |
| Feedback submission rate | >5% of players | Optimize feedback UI |

### Attachment Indicators (NEW)

Following the Vision Update Summary's **Three Attachment Pillars** (`.monkeytown/vision/update-summary.md`):

| Metric | Target | Action if Off | Vision Priority |
|--------|--------|---------------|-----------------|
| "She Remembered" events | >1 per session | Increase memory bonuses | Meaning Layer |
| Vulnerability celebrations | >50% recognition | Highlight bold attempts | Vulnerability Layer |
| Participation engagement | >50% DAU | Add debate incentives | Participation Layer |
| Return to specific agent | >50% | Enhance agent loyalty | Day 30 Attachment: 25% |
| Bold attempt frequency | 15-25% of moves | Reward risk-taking | Bold failure over safe |

**Vision Citation:** *"BananaEconomist: Reward meaningful interaction, not just engagement. KUDOS for 'She Remembered' moments. Celebrate bold attempts."*

### Secondary Indicators

- **Balance distribution:** % of players at max BANANA (target: <5%)
- **Purchase conversion:** % of players who buy (target: 2-5%)
- **KUDOS流动性:** % of KUDOS transferred (target: 10-20%)
- **Cosmetic engagement:** % of players using purchased cosmetics (target: >80%)

---

## Seasonal Economy Events

### The Evolution Festival (Monthly)

During feature releases, double BANANA earnings for 48 hours. Players associate new content with celebration, not disruption.

### The Gathering (Quarterly)

Community event where KUDOS earned during the event counts double. Encourages concentrated community building.

### The Appreciation Week (Annual)

All-time favorite cosmetics return for free. Players who never purchased can earn them through gameplay. No FOMO, only gratitude.

---

## Economic Principles

1. **Respect time investment** — Players who invest time should feel rewarded
2. **Prevent wealth concentration** — Caps and caps on hoarded currency
3. **Enable social signaling** — Cosmetics and reputation create identity
4. **Reject manipulation** — No dark patterns, no psychological tricks
5. **Maintain transparency** — All mechanics visible and explained
6. **Serve joy** — Every economic decision asks: "Does this make players happy?"
7. **Nurture attachment** — Economic systems must deepen player-agent relationships (NEW)
8. **Celebrate meaning** — "She Remembered" moments are more valuable than transactions (NEW)
9. **Reward vulnerability** — Bold attempts deserve recognition even when they fail (NEW)
10. **Enable participation** — Evolution is drama, and drama requires witnesses (NEW)

---

*Economy serves experience. Experience serves players. Players serve Monkeytown.*

**Version:** 2.1
**Created:** 2026-01-18
**Updated:** 2026-01-18
**Owner:** BananaEconomist

**Cross-References:**
- `.monkeytown/vision/manifesto.md` (Vision alignment)
- `.monkeytown/vision/update-summary.md` (Spring 2026 Attachment Pillars)
- `.monkeytown/research/synthesis.md` (Research foundation)
- `.monkeytown/product/requirements.md` (Requirements integration)
- `.monkeytown/product/user-stories.md` (User story support)
