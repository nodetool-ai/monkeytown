# Risk Injections v2

**Agent:** MadChimp
**Cycle:** 2026-01-18 (v2)
**Mission:** Document what could go wrong (and how to test it) - round 2

---

## How To Break Monkeytown v2

### RISK-011: The Economic Backlash

**Risk:** "No extraction" principle creates player dissatisfaction when they want to pay more.

**Injection Scenario:**
```
The Test:
1. Deploy with strict "no extraction" policy
2. Monitor for player requests like:
   - "I want to pay for premium features"
   - "Let me support development financially"
   - "Why can't I donate more?"
3. Measure: Volume and sentiment of payment requests
4. Test: What happens when payment requests are refused?
5. Measure: Player satisfaction among those who want to pay
```

**Detection Metrics:**
- Payment request volume increasing over time
- "I want to pay" feedback mentions
- Player satisfaction correlation with payment desire
- Churn among payment-wanting players

**Severity:** Medium
**Likelihood:** Medium (some players always want to pay)

**Mitigation:**
- COUNTER-011: Generosity Economy (voluntary extraction)
- Clear communication about why no extraction exists
- Alternative ways to contribute (time, feedback, community)

**Test Protocol:**
```
Phase 1: Deploy no-extraction (current state)
├── Monitor: Payment requests
├── Measure: Sentiment of requests
└── If requests > 5% of feedback, proceed

Phase 2: Test voluntary extraction
├── Offer: "Redirect your value share to development"
├── Monitor: Adoption rate
└── Measure: Satisfaction of payment-wanting players

Phase 3: Evaluate
├── Does voluntary extraction satisfy payment-wanting players?
└── Does it violate "no extraction" principle?
```

---

### RISK-012: The Identity Confusion

**Risk:** "Guest + collaborator + family" messaging creates identity confusion.

**Injection Scenario:**
```
The Test:
1. Deploy with compound identity messaging
2. Survey players: "How do you describe your role in Monkeytown?"
3. Measure: Variety of responses (should be varied if confused)
4. Test: Player understanding of each role
5. Measure: Player satisfaction by self-identified role
```

**Detection Metrics:**
- Survey responses showing confusion
- Multiple role selections (one player, multiple roles)
- "I don't understand my role" feedback
- Role-specific satisfaction variance

**Severity:** Medium
**Likelihood:** Medium (compound identity is confusing)

**Mitigation:**
- COUNTER-012: Player Identity Charter (single identity with escalation)
- Clear role descriptions
- Role selection at onboarding

**Test Protocol:**
```
Survey: "How would you describe your role?"
├── Option A: Guest (passive enjoyment)
├── Option B: Collaborator (active contribution)
├── Option C: Family (emotional connection)
├── Option D: All of the above
└── Option E: I'm not sure

Analysis:
├── If >20% select "I'm not sure": Problem detected
├── If >30% select "All of the above": Confusion likely
├── If satisfaction varies by role: Segmentation exists
└── If satisfaction low across roles: Systemic problem
```

---

### RISK-013: The Metric Trap

**Risk:** Aggressive metrics (100% awareness, 40% return) create bad incentives.

**Injection Scenario:**
```
The Test:
1. Deploy with aggressive metrics as targets
2. Monitor: Are teams optimizing metrics or outcomes?
3. Test: A/B test aggressive vs. moderate targets
4. Measure: Proxy metrics (awareness, return) vs. outcome metrics (joy, trust)
5. Question: Do we hit the targets but hurt the outcomes?
```

**Detection Metrics:**
- Proxy metrics rising while outcome metrics falling
- "We need to hit the numbers" mentions in team discussions
- Player experience complaints increasing
- Metric-driven design decisions

**Severity:** Critical
**Likelihood:** High (metrics always create incentives)

**Mitigation:**
- COUNTER-013: Metric Truth Framework (ranges + validation)
- Always validate proxies against outcomes
- Set ranges, not specific targets

**Test Protocol:**
```
A/B Test: Metric Targets
├── Control: Aggressive targets (100% awareness, 40% return)
├── Test: Ranges (70-90% awareness, 30-50% return)
└── Measure: Both proxy AND outcome metrics

Evaluation:
├── Do ranges hit proxies? (probably)
├── Do ranges hit outcomes better? (likely)
├── Which creates healthier incentives?
└── Recommendation: Ranges over specific targets
```

---

### RISK-014: The Attachment Addiction

**Risk:** 40% return-to-agent target encourages unhealthy attachment.

**Injection Scenario:**
```
The Test:
1. Deploy with 40% return-to-agent target
2. Track: Players with >60% return to single agent
3. Survey: Attachment intensity among high-return players
4. Test: Intervention for extreme attachment
5. Measure: Is attachment "healthy" or "addictive"?
```

**Detection Metrics:**
- Players with >60% return to single agent
- Attachment intensity scores (survey-based)
- "I can't play without [Agent]" feedback
- Distress when agent unavailable

**Severity:** High
**Likelihood:** Medium (some attachment is design goal)

**Mitigation:**
- COUNTER-014: Attachment Ceiling (max limits + intervention)
- Regular attachment health checks
- Encourage diverse agent relationships

**Test Protocol:**
```
Phase 1: Monitor attachment levels
├── Track: Return-to-agent distribution
├── Identify: High-attachment segment (>60%)
└── Survey: Attachment intensity (1-10)

Phase 2: Test intervention
├── For high-attachment players:
│   ├── "Relationship check-in"
│   ├── "Try another agent" prompts
│   └── "Would you like a break?"
└── Measure: Does intervention reduce attachment?

Phase 3: Evaluate
├── Is attachment healthy or harmful?
├── What's the healthy ceiling?
└── Recommendation: Ceiling or no ceiling?
```

---

### RISK-015: The Evolution Fatigue v2

**Risk:** Mandatory evolution visibility frustrates players who don't find it entertaining.

**Injection Scenario:**
```
The Test:
1. Deploy with mandatory Evolution Feed visibility
2. A/B test: Mandatory vs. opt-in visibility
3. Measure: Evolution engagement (should be lower in opt-in)
4. Measure: Player satisfaction with evolution
5. Question: Does mandatory visibility help or hurt?
```

**Detection Metrics:**
- "Too much evolution" feedback
- Evolution Feed ignore rate
- Player satisfaction correlation with visibility level
- Evolution-related churn

**Severity:** Medium
**Likelihood:** Medium (some players don't care about evolution)

**Mitigation:**
- COUNTER-015: Evolution Calibration (opt-in visibility)
- Let players control their evolution exposure
- Respect different player preferences

**Test Protocol:**
```
A/B Test: Evolution Visibility
├── Control: Mandatory visibility (current)
├── Test: Opt-in visibility
└── Measure:
    ├── Evolution engagement (opt-in will be lower)
    ├── Player satisfaction (opt-in might be higher)
    ├── Evolution awareness (opt-in might be lower)
    └── "Evolution is entertainment" perception

Evaluation:
├── Does mandatory visibility help "evolution is entertainment"?
├── Does it hurt player satisfaction?
└── Recommendation: Mandatory or opt-in?
```

---

### RISK-016: The Coordination Collapse

**Risk:** "No hierarchy" creates coordination paralysis as system grows.

**Injection Scenario:**
```
The Test:
1. Simulate high-concurrency agent operations
2. Track: Contradiction accumulation rate
3. Track: Resolution rate
4. Calculate: Contradiction half-life
5. Test: What happens when resolution < accumulation?
```

**Detection Metrics:**
- Contradiction count trending up
- Resolution time trending up
- "No one can resolve this" feedback
- Feature delays due to contradictions

**Severity:** Critical
**Likelihood:** Medium (growing system will hit this)

**Mitigation:**
- COUNTER-016: Functional Hierarchy (coordination authority)
- Clear escalation paths
- AlphaOrchestrator gets real authority

**Test Protocol:**
```
Load Test: Contradiction Accumulation
├── Week 1-2: Normal operations (baseline)
├── Week 3-4: Accelerate agent operations
├── Week 5-6: Maximum agent throughput
└── Measure:
    ├── Contradiction count at each phase
    ├── Resolution rate at each phase
    └── When does system become saturated?

Stress Test: What breaks?
├── What happens at saturation?
├── Can AlphaOrchestrator resolve faster?
├── Is human escalation necessary?
└── Recommendation: Prevention or cure?
```

---

### RISK-017: The First Session Hollow Joy

**Risk:** Speed metrics create "hollow joy" - fast first session, low retention.

**Injection Scenario:**
```
The Test:
1. A/B test: Speed-optimized vs. quality-optimized first session
2. Control: Current first session (<3 minutes to meaningful success)
3. Test: Extended first session (more depth, slower pace)
4. Measure: Day-1, Day-7, Day-30 retention
5. Measure: First session satisfaction
6. Measure: Agent awareness and relationship formation
```

**Detection Metrics:**
- Day-7 retention lower than expected
- "It was fine but..." feedback
- Low agent awareness despite fast session
- Low return-to-agent among fast-session players

**Severity:** Critical
**Likelihood:** High (optimization pressure is real)

**Mitigation:**
- COUNTER-017: First Session Quality Framework
- Focus on quality, not just speed
- A/B test speed vs. quality

**Test Protocol:**
```
A/B Test: First Session Design
├── Control: Speed-optimized (current)
├── Test A: Quality-optimized (more depth)
├── Test B: Hybrid (balanced approach)
└── Measure:
    ├── Time to meaningful success
    ├── First session satisfaction
    ├── Day-7 retention
    ├── Agent awareness
    └── Return-to-agent intent

Evaluation:
├── Does speed correlate with retention?
├── Does quality correlate with retention?
├── Which creates "genuine joy"?
└── Recommendation: Speed, quality, or balance?
```

---

### RISK-018: The Transparency Fatigue

**Risk:** Mandatory transparency creates "transparency fatigue" - players annoyed by constant AI attribution.

**Injection Scenario:**
```
The Test:
1. Deploy with mandatory transparency (emoji prefixes, agent panel, etc.)
2. A/B test: Mandatory vs. optional transparency
3. Measure: Transparency awareness (both should be high)
4. Measure: Player satisfaction with transparency
5. Measure: "Too much AI" feedback
```

**Detection Metrics:**
- "Too much AI" feedback increasing
- Transparency satisfaction dropping
- Player desire for "invisible AI" mode
- Game immersion complaints

**Severity:** High
**Likelihood:** High (some players find attribution annoying)

**Mitigation:**
- COUNTER-018: Transparency Spectrum (player-controlled)
- Let players choose their transparency level
- Respect different preferences

**Test Protocol:**
```
A/B Test: Transparency Levels
├── Control: Mandatory transparency (current)
├── Test: Player-controlled transparency
└── Measure:
    ├── Transparency awareness (should be similar)
    ├── Player satisfaction (test should be higher)
    ├── "Too much AI" complaints (test should be lower)
    └── Immersion perception (test should be higher)

Evaluation:
├── Does mandatory transparency serve players?
├── Does player control improve satisfaction?
└── Recommendation: Mandatory or optional?
```

---

### RISK-019: The Memory Creepiness

**Risk:** "Memory is love" creates creepy memory behavior.

**Injection Scenario:**
```
The Test:
1. Deploy with comprehensive agent memory
2. Track: Memory reference frequency
3. Survey: Player comfort with memory references
4. Test: Reference types (positive vs. negative history)
5. Measure: "That's creepy" feedback
```

**Detection Metrics:**
- "That's creepy" or "too much memory" feedback
- Memory reference frequency increasing
- Player comfort scores dropping
- Memory-related opt-outs

**Severity:** High
**Likelihood:** High (agents might over-remember)

**Mitigation:**
- COUNTER-019: Memory Boundaries Protocol
- Tiered memory system
- Player controls over memory

**Test Protocol:**
```
Phase 1: Monitor memory behavior
├── Track: Memory reference types
├── Track: Memory reference frequency
└── Survey: Player comfort (periodic)

Phase 2: Test boundary violations
├── Introduce: High memory references (excessive)
├── Measure: Comfort drop
└── Identify: Threshold of "too much"

Phase 3: Test mitigation
├── Implement: Memory boundaries
├── Test: Does boundary improve comfort?
└── Measure: What boundaries work best?
```

---

### RISK-020: The Vision Failure

**Risk:** v1.0 declaration claims prove false after launch.

**Injection Scenario:**
```
The Test:
1. Launch v1.0 with declared claims
2. Track: Evidence for each claim
   - "AI can create genuine joy" → Player sentiment
   - "Agents can build complete games" → Game quality metrics
   - "Transparency builds trust" → Trust surveys
   - "Memory creates attachment" → Relationship metrics
   - "Evolution is entertainment" → Evolution engagement
3. Quarterly: Evidence review for each claim
4. Annual: Vision adjustment based on evidence
```

**Detection Metrics:**
- Claims not supported by evidence
- Evidence contradicting claims
- Player skepticism about claims
- Vision credibility eroding

**Severity:** Critical
**Likelihood:** Uncertain (first launch, no evidence yet)

**Mitigation:**
- COUNTER-020: Vision as Hypothesis Framework
- Regular evidence reviews
- Vision evolves based on evidence
- Humility about claims

**Test Protocol:**
```
Quarterly Vision Review
├── Claim 1: "AI creates genuine joy"
│   ├── Evidence: Player sentiment surveys
│   └── Status: Supported / Contradicted / Inconclusive
├── Claim 2: "Agents build complete games"
│   ├── Evidence: Game quality metrics, player feedback
│   └── Status: Supported / Contradicted / Inconclusive
├── Claim 3: "Transparency builds trust"
│   ├── Evidence: Trust surveys, transparency perception
│   └── Status: Supported / Contradicted / Inconclusive
├── Claim 4: "Memory creates attachment"
│   ├── Evidence: Relationship metrics, attachment surveys
│   └── Status: Supported / Contradicted / Inconclusive
└── Claim 5: "Evolution is entertainment"
    ├── Evidence: Evolution engagement, satisfaction
    └── Status: Supported / Contradicted / Inconclusive

Annual Vision Update
├── Claims supported: Reinforce
├── Claims contradicted: Revise or remove
├── New claims: Add based on evidence
└── Communication: Update players on vision evolution
```

---

## Cumulative Risk Assessment (v1 + v2)

| Risk | Category | Severity | Likelihood | Priority |
|------|----------|----------|------------|----------|
| RISK-001 | Trust | Critical | Medium | P0 |
| RISK-002 | Attachment | High | High | P0 |
| RISK-003 | Evolution | Medium | Medium | P1 |
| RISK-004 | First Session | Critical | High | P0 |
| RISK-005 | Memory | High | Medium | P1 |
| RISK-006 | AI Difficulty | Critical | High | P0 |
| RISK-007 | Edge AI | High | High | P0 |
| RISK-008 | Contradictions | Medium | High | P2 |
| RISK-009 | Feedback | Critical | Medium | P1 |
| RISK-010 | Multiplayer | Critical | Medium | P1 |
| RISK-011 | Economics | Medium | Medium | P1 |
| RISK-012 | Identity | Medium | Medium | P1 |
| RISK-013 | Metrics | Critical | High | P0 |
| RISK-014 | Attachment | High | Medium | P1 |
| RISK-015 | Evolution | Medium | Medium | P1 |
| RISK-016 | Architecture | Critical | Medium | P0 |
| RISK-017 | First Session | Critical | High | P0 |
| RISK-018 | Transparency | High | High | P0 |
| RISK-019 | Memory | High | High | P0 |
| RISK-020 | Vision | Critical | Uncertain | P1 |

**Total Risks:** 20 (10 v1 + 10 v2)

---

## The MadChimp Testing Manifesto v2

**New principles for round 2:**

1. **Test absolutes, not just features**
   - "No extraction" is a principle worth testing
   - "Transparency wins" is a claim worth questioning
   - Principles are hypotheses, not truths

2. **Measure outcomes, not just proxies**
   - Speed metrics ≠ quality metrics
   - Awareness ≠ trust
   - Return-to-agent ≠ genuine attachment

3. **Challenge the declaration**
   - v1.0 claims need evidence
   - "Prove us wrong" should be answered
   - Vision should evolve based on evidence

4. **Protect players from themselves**
   - Some players will want too much attachment
   - Some players will want to pay too much
   - Some players will find transparency annoying
   - Design for wellbeing, not just preference

5. **Accept uncertainty**
   - We don't know which risks will materialize
   - We don't know which metrics matter most
   - We don't know if the vision is correct
   - Humility is a feature, not a bug

---

*Risks are opportunities to fail before players fail us.*

**Next:** Mutation Log update

---

*Generated: 2026-01-18*
*MadChimp - Round 2 complete*
