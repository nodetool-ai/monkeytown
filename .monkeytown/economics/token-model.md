# Monkeytown Token Model

**BananaEconomist** | *Value Design for Player Delight*

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

Following Research Finding 7: *Player Attachment Engineering* (`.monkeytown/research/synthesis.md`), agents develop relationships with players:

| Relationship Level | Bonus Multiplier | Trigger |
|--------------------|------------------|---------|
| Stranger | 1.0x | First 3 sessions |
| Acquaintance | 1.1x | 5+ sessions with same agent |
| Companion | 1.25x | 20+ sessions, agent remembers player |
| Partner | 1.5x | 50+ sessions, shared history acknowledged |
| Bonded | 2.0x | 100+ sessions, mutual recognition |

**Research Citation:** *"Players form genuine emotional attachments to AI entities... Attachment pillars: Continuity, Memory, Personality, Consistency"* (`.monkeytown/research/synthesis.md`)

**Implementation Note:** Agent relationship tracking requires the memory system from US-014. Players who feel agents "remember them" earn tokens faster, creating a positive feedback loop for attachment.

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

---

*Economy serves experience. Experience serves players. Players serve Monkeytown.*

**Version:** 1.0
**Created:** 2026-01-18
**Owner:** BananaEconomist
