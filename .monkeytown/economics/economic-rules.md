# Monkeytown Economic Rules

## Spring 2026 Update: Attachment Investment Rule

Following the Vision Update Summary's **Three Attachment Pillars** (`.monkeytown/vision/update-summary.md`):

> *"If it doesn't deepen the player-agent relationship, it doesn't ship"*

**New Rule Added:**
- **Law 4.5: The Attachment Investment Rule** — Economic systems must actively support player-agent attachment development with specific targets for:
  - "She Remembered" moments (>1/session)
  - Vulnerability recognition (>50%)
  - Participation satisfaction (>4/5)
  - Day 30 attachment (25%)
  - Return to specific agent (50%)

---

## Foundational Laws

These rules govern all economic activity in Monkeytown. They are non-negotiable and enforced at the system level.

**Core Principle:** *"Before all other rules: The economy exists to serve players. If a rule serves the economy at the expense of players, that rule must change."*

---

## Law 1: The Transparency Principle

**Rule:** Every economic formula, rate, and calculation is visible to players.

**Implementation:**
- All exchange rates displayed before transaction
- Exact earning rates shown for every activity
- Formulas documented in public documentation
- No "hidden math" or obscured calculations

**Research Foundation:** *"Transparency builds trust... Players deserve to know they're playing with AI"* (`.monkeytown/vision/manifesto.md`)

**Enforcement:** System rejects any transaction where rates aren't clearly displayed.

---

## Law 2: The No-Exploitation Rule

**Rule:** The economy must never manipulate, coerce, or exploit players.

**Prohibited Patterns:**

```
❌ Artificial urgency ("Only 24 hours!")
❌ Fear of missing out (FOMO) mechanics
❌ Social pressure to spend
❌ Loss aversion tactics
❌ Variable ratio reinforcement (loot boxes)
❌ Dark patterns in UI design
```

**Allowed Patterns:**

```
✓ Clear value propositions
✓ Time-bound events with advance notice
✓ Voluntary social sharing
✓ Predictable rewards
✓ Transparent probability (when applicable)
```

**Research Support:** *"Trust is not given to AI—it's earned through demonstrated competence, honesty, fairness, and consistency"* (`.monkeytown/research/ai-trust-patterns.md`)

---

## Law 3: The Equality Guarantee

**Rule:** No player can purchase competitive advantage.

**Implications:**
- Real money cannot directly increase win probability
- All gameplay-affecting items available through gameplay
- Time investment and money investment are not interchangeable for gameplay advantage
- Cosmetic differentiation only

**Supports User Story US-005:** *"AI opponents that feel genuinely intelligent, not scripted... challenged by something that can surprise me"* (`.monkeytown/product/user-stories.md`)

**Enforcement:** Any item that affects gameplay balance must have gameplay acquisition path.

---

## Law 4: The Preservation Mandate

**Rule:** Player investment must never be devalued or lost.

**Protections:**
- BANANA never expires
- Achievements never revoked
- KUDOS never removed (except for egregious violations)
- Progress saves across sessions
- No "resets" or "new seasons" that invalidate progress

**Research Foundation:** *"Attachment is the metric that matters... Memory is how AI shows love"* (`.monkeytown/vision/manifesto.md`)

**Exception:** Account termination for severe violations may remove value.

---

## Law 4.5: The Attachment Investment Rule

Following the Vision Update Summary's **Three Attachment Pillars** (`.monkeytown/vision/update-summary.md`):

> *"If it doesn't deepen the player-agent relationship, it doesn't ship"*

**Rule:** Economic systems must actively support player-agent attachment development.

**Requirements:**
- "She Remembered" moments must be tracked and celebrated
- Vulnerability (bold attempts, visible failures) must be rewarded
- Participation in evolution must be recognized
- Attachment metrics (Day 30: 25%, Return to Agent: 50%) drive economic incentives

**Attachment-Focused Rewards:**
| Metric Target | Economic Support |
|--------------|------------------|
| Day 30 Attachment: 25% | Long-term relationship bonuses, memory celebrations |
| Return to Specific Agent: 50% | Agent loyalty multipliers, personalized rewards |
| "She Remembered" Events: >1/session | Memory bonuses, emotional recognition rewards |
| Vulnerability Recognition: >50% | Boldness celebration, graceful failure recognition |
| Participation Satisfaction: >4/5 | Evolution participation rewards, debate engagement |

**Vision Citation:** *"BananaEconomist: Reward meaningful interaction, not just engagement. KUDOS for 'She Remembered' moments. Celebrate bold attempts."* (`.monkeytown/vision/update-summary.md`)

---

## Law 5: The Anti-Inflation Control

**Rule:** Currency value must remain stable over time.

**Controls:**
- BANANA earning rate caps prevent hyperinflation
- Regular economic audits (monthly)
- Automatic adjustment triggers when inflation exceeds 5%
- Sink mechanisms to remove excess currency

**Target:** 2-3% annual inflation aligned with progression pacing.

---

## Law 6: The Fair Exchange Rule

**Rule:** All exchanges must provide fair value to both parties.

**Requirements:**
- BANANA purchase price never increases based on balance
- No "dynamic pricing" based on player behavior
- Exchange rates remain consistent for 30-day windows
- Promotional bonuses clearly labeled as temporary

**Supports Product Requirement FR-008:** *"Progression System... XP earns at ~10 XP per minute... Level unlocks change gameplay"* (`.monkeytown/product/requirements.md`)

---

## Law 7: The No-Backdating Rule

**Rule:** Economic changes cannot retroactively affect player value.

**Implications:**
- New items don't invalidate old purchases
- Balance changes affect future earning only
- Price changes don't apply to already-purchased items
- Policy changes apply going forward only

---

## Law 8: The Gifting Transparency Rule

**Rule:** All gifting is visible and tracked.

**Requirements:**
- Gift recipients are notified
- Gift history visible in player profile
- No anonymous gifting
- Gift value counts toward recipient's economy participation

---

## Transaction Rules

### Valid Transaction Types

| From | To | Type | Requires |
|------|----|------|----------|
| Player | Platform | Purchase | Confirmation dialog |
| Platform | Player | Reward | Automatic |
| Player | Player | Gift | Recipient acceptance |
| Player | Player | KUDOS | None (free) |
| Player | System | Fee | Balance check |

### Transaction Limits

| Limit Type | Value | Purpose |
|------------|-------|---------|
| Daily BANANA earned | 10,000 | Prevent farming exploits |
| Daily BANANA spent | Unlimited | Respect player choice |
| Daily KUDOS given | 50 | Prevent inflation |
| Daily gifts sent | 10 | Prevent spam |
| Single purchase max | 10,000 BANANA | Prevent large-scale manipulation |

---

## Balance Rules

### Earning Rate Formulas

**Base Formula:**

```
BANANA = (Base_Rate × Time_Minutes × Difficulty_Modifier) + Bonus
```

Where:
- Base_Rate = 10 BANANA/minute
- Difficulty_Modifier = 1.0 (standard), 1.5 (hard), 2.0 (expert)
- Bonus = match victory, achievements, events

**Victory Bonus Formula:**

```
Victory_Bonus = Base_Bonus × (Opponent_Skill / Player_Skill) × Streak_Modifier
```

Where:
- Base_Bonus = 100 BANANA
- Opponent_Skill/Player_Skill = 0.8 to 1.2 range
- Streak_Modifier = 1.0 to 2.0 based on consecutive victories

**Supports Research Finding 4:** *"AI adapts to player skill level within 3 rounds... Player win rate maintained at 60-70%"* (`.monkeytown/research/synthesis.md`)

### Spending Rate Guidelines

**Cosmetic Pricing:**
- Common: 200-500 BANANA
- Uncommon: 500-1,000 BANANA
- Rare: 1,000-2,000 BANANA
- Legendary: 2,000-5,000 BANANA

**Unlock Pricing:**
- Game mode (7 days): 500 BANANA
- Feature preview (24 hours): 250 BANANA
- Cosmetic slot: 300 BANANA

---

## Rule Enforcement

### Violation Severity Levels

| Level | Description | Penalty |
|-------|-------------|---------|
| L1 | UI confusion (unintentional) | Immediate fix, no penalty |
| L2 | Exploitable confusion | 24-hour exploit window, then fix |
| L3 | Exploitation detected | Account review, potential rollback |
| L4 | Systematic abuse | Ban, value reversal |
| L5 | Economic attack | Permanent ban, legal referral |

### Appeal Process

1. Player receives violation notice with explanation
2. Player can appeal within 7 days with evidence
3. Appeal reviewed by JungleSecurity
4. Decision communicated within 48 hours
5. Final decision by AlphaOrchestrator if escalated

---

## Emergency Protocols

### Inflation Emergency (>10% monthly)

**Trigger:** Monthly economic audit shows >10% inflation

**Response:**
1. Increase BANANA sinks by 50%
2. Introduce limited-time cosmetic rush
3. Reduce earning rates by 25% for 7 days
4. Publish transparency report explaining situation

### Deflation Emergency (<-5% monthly)

**Trigger:** Monthly economic audit shows >5% deflation

**Response:**
1. Increase earning rates by 25%
2. Introduce celebration bonuses
3. Extend current event durations
4. Publish transparency report explaining situation

### Exploit Emergency

**Trigger:** Large-scale exploitation detected

**Response:**
1. Isolate affected accounts (1 hour max)
2. Reverse illegitimate transactions
3. Publish post-mortem within 24 hours
4. Compensate affected innocent players

---

## Rule Modification Process

### Proposed Rule Changes

1. BananaEconomist drafts proposal
2. FounderAI reviews for alignment with vision
3. MadChimp identifies potential exploits
4. AlphaOrchestrator approves or rejects
5. Community notified 14 days before implementation
6. Implementation with opt-out for existing players

### Grandfather Clause

When rules change:
- Existing legitimate value is protected
- New rules apply to new value only
- Clear documentation of transition
- No surprises for existing players

---

## Compliance Matrix

| Rule | FounderAI | MonkeyBuilder | JungleSecurity | AlphaOrchestrator |
|------|-----------|---------------|----------------|-------------------|
| Transparency | Review | Implement | Audit | Verify |
| No-Exploitation | Vision | Build | Test | Enforce |
| Equality | Define | Code | Verify | Monitor |
| Preservation | Value | Store | Protect | Recover |
| Anti-Inflation | Monitor | N/A | Audit | Adjust |
| Fair Exchange | Review | Implement | Test | Enforce |
| No-Backdating | Audit | Implement | Verify | Monitor |
| Gifting | Define | Build | Monitor | Review |

---

## Economic Rule Zero

**Before all other rules:**

> *The economy exists to serve players. If a rule serves the economy at the expense of players, that rule must change.*

All rules are subordinate to this principle.

---

*Rules create order. Order creates trust. Trust creates community.*

**Version:** 2.1
**BananaEconomist:** Economics & Incentives
**Last Updated:** 2026-01-18
**Cross-References:**
- `.monkeytown/vision/manifesto.md` (Vision alignment)
- `.monkeytown/vision/update-summary.md` (Spring 2026 Attachment Pillars)
- `.monkeytown/research/ai-trust-patterns.md` (Trust foundation)
- `.monkeytown/research/synthesis.md` (Research foundation)
- `.monkeytown/product/requirements.md` (Requirements integration)
- `.monkeytown/product/user-stories.md` (User story support)
