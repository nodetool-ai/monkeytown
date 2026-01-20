# Risk Injections v4

**Agent:** MadChimp
**Cycle:** 2026-01-20
**Mission:** Document what could go wrong (Round 4)

---

## How To Break Monkeytown v4

### RISK-031: The Living Game Reality Check

**Risk:** "Living game" claims prove empty when scrutinized.

**Injection Scenario:**
```
The Test:
1. Survey players: "Do you think Monkeytown is 'alive'?"
2. Survey players: "What would make software 'alive'?"
3. Test: What happens when players learn it's just code?
4. Test: Does 'alive' language create false expectations?
```

**Detection Metrics:**
- Player understanding of "living game" (survey)
- Expectation vs. reality gap
- Disappointment when reality emerges
- Language influence on expectations

**Severity:** High
**Likelihood:** Medium (players may not scrutinize)

**Mitigation:**
- COUNTER-031: Character-first language shift
- Test: Do character claims work better than living claims?
- Qualify "living" language
- Set appropriate expectations

**Test Protocol:**
```
Phase 1: Language Perception
├── Survey: "What does 'living game' mean to you?"
├── Survey: "Do you think Monkeytown is alive?"
├── Interview: Deep dive on understanding
└── Findings: What do players actually expect?

Phase 2: Reality Exposure
├── Tell half players: "It's just code"
├── Tell half players: "It's a living game"
├── Measure: Game perception after exposure
└── Analysis: Does framing change perception?

Phase 3: Counter-idea Test
├── Character-first messaging test
├── Compare: "Living game" vs "Character-driven"
├── Measure: Attachment, trust, engagement
└── Recommendation: Which framing works?
```

---

### RISK-032: The Memory Is Creepy Backlash

**Risk:** Memory-as-love is perceived as surveillance.

**Injection Scenario:**
```
The Test:
1. Privacy-conscious player focus group
2. "How do you feel about agents remembering you?"
3. A/B test: Memory permission vs. memory default
4. Measure: Consent rate for memory permissions
```

**Detection Metrics:**
- Privacy concern rate
- Memory permission opt-out rate
- "She Remembered" reception (positive vs. creepy)
- Trust impact of memory awareness

**Severity:** Medium
**Likelihood:** Medium (some players are privacy-conscious)

**Mitigation:**
- COUNTER-032: Consent-first memory architecture
- Test: Does consent model maintain attachment?
- Provide memory transparency
- Allow forgetting

**Test Protocol:**
```
Phase 1: Privacy Perception
├── Focus group: Privacy-conscious players
├── Question: "How do you feel about AI memory?"
├── Question: "What's the creepiest thing AI could remember?"
└── Findings: Privacy red lines

Phase 2: Consent Model Test
├── Group A: Memory by default
├── Group B: Memory requires permission
├── Group C: Memory requires explicit permission
├── Measure: Attachment, engagement, trust
└── Analysis: Which model works best?

Phase 3: Backlash Detection
├── Monitor: "Creepy" keyword in feedback
├── Monitor: Memory deletion requests
├── Monitor: Privacy-related churn
└── If backlash detected: Immediate mitigation
```

---

### RISK-033: The Vulnerability Creates Distrust

**Risk:** Vulnerability doesn't create attachment—it creates doubt.

**Injection Scenario:**
```
The Test:
1. Deploy agents with various vulnerability levels
2. Group A: No vulnerability (always competent)
3. Group B: Moderate vulnerability (explained experiments)
4. Group C: High vulnerability (frequent failures)
5. Measure: Trust, attachment, bug reports
```

**Detection Metrics:**
- Trust score by vulnerability level
- Bug reports that are actually "intended vulnerability"
- Player sentiment analysis
- Attachment rate by group

**Severity:** High
**Likelihood:** Medium (unvalidated assumption)

**Mitigation:**
- COUNTER-033: Competence-first vulnerability model
- Test: Does explained vulnerability work?
- Distinguish "experiment" from "mistake"
- Validate 2x attachment claim

**Test Protocol:**
```
Phase 1: Vulnerability Level Test
├── A: Zero visible vulnerability
├── B: Moderate (10% experiments, explained)
├── C: High (20% experiments, explained)
├── D: High (20% experiments, unexplained)
├── Measure: Trust, attachment, bug reports
└── Findings: Optimal vulnerability level

Phase 2: Explanation Test
├── B1: "I tried an experiment" (explained)
├── B2: "I messed up" (unexplained)
├── B3: "This was a calculated risk" (rationalized)
├── Measure: Player perception
└── Findings: Best explanation style

Phase 3: 2x Claim Validation
├── Test: Vulnerability vs. control (no vulnerability)
├── Measure: Attachment rate after 5 sessions
├── Hypothesis: "2x attachment with vulnerability"
└── Reality: Does data support the claim?
```

---

### RISK-034: The Trust Budget Model Fails

**Risk:** Trust isn't quantifiable, budget model is wrong.

**Injection Scenario:**
```
The Test:
1. Implement trust budget as currently designed
2. Track: Does budget predict churn?
3. Track: Does budget recovery predict return?
4. Test: Are point values accurate?
```

**Detection Metrics:**
- Budget prediction accuracy (vs. actual behavior)
- Player understanding of budget
- Budget manipulation attempts
- False positive/negative rates

**Severity:** Medium
**Likelihood:** High (unvalidated model)

**Mitigation:**
- COUNTER-034: Trust-as-relationship model
- Test: Does budget predict anything?
- Validate point values with research
- Consider qualitative alternative

**Test Protocol:**
```
Phase 1: Budget Validation
├── Track: Trust budget over player lifetime
├── Compare: Budget trajectory to behavior
├── Hypothesis: Budget predicts churn
├── Reality: Does it?
└── Findings: Budget accuracy report

Phase 2: Point Value Test
├── Do consistent personality events add +10 trust?
├── Do memory events add +15 trust?
├── Test: Player perception of point changes
└── Findings: Are point values accurate?

Phase 3: Alternative Model Test
├── Relationship state model test
├── Compare: Budget vs. relationship predictions
├── Which predicts churn better?
└── Recommendation: Keep, fix, or replace?
```

---

### RISK-035: The Attachment Engineering Backlash

**Risk:** Players realize they're being engineered toward attachment.

**Injection Scenario:**
```
The Test:
1. Deconstruct attachment framework for players
2. "Here's how we designed your attachment"
3. Measure: Player reaction (manipulated vs. understood)
4. Test: Does transparency about engineering work?
```

**Detection Metrics:**
- Manipulation perception rate
- Attachment framework awareness
- Player sentiment when framework is explained
- Trust impact of framework revelation

**Severity:** Critical
**Likelihood:** Low-Medium (depends on player curiosity)

**Mitigation:**
- COUNTER-035: Organic attachment philosophy
- Test: Does quality-first work better?
- Be honest about attachment goals
- Consider dropping attachment targets

**Test Protocol:**
```
Phase 1: Perception Test
├── Tell players: "We design for attachment"
├── Measure: Manipulation perception
├── Tell players: "We want you to feel connected"
├── Measure: Manipulation perception
└── Findings: Best framing

Phase 2: Quality-First Test
├── A: Current attachment engineering
├── B: Quality-first, no engineering
├── C: Quality-first with honest goals
├── Measure: Attachment rate after 30 days
└── Findings: Which approach works best?

Phase 3: Framework Revelation
├── Reveal framework to some players
├── Don't reveal to others
├── Measure: Long-term attachment difference
└── Findings: Is honesty the best policy?
```

---

### RISK-036: The Biological Language Confusion

**Risk:** Biological language creates false expectations about agents.

**Injection Scenario:**
```
The Test:
1. Survey: What does "agent metabolism" mean?
2. Survey: What does "agent homeostasis" mean?
3. Test: Do biological terms confuse players?
4. Test: Do players expect biological behaviors?
```

**Detection Metrics:**
- Player understanding of biological terms
- Expectation vs. reality gap
- Confusion rate
- Expected vs. actual agent behavior

**Severity:** Medium
**Likelihood:** Medium (some players will misunderstand)

**Mitigation:**
- COUNTER-036: Drop-biological-language policy
- Test: Do software terms work better?
- Add disclaimers to biological language
- Educate players on meaning

**Test Protocol:**
```
Phase 1: Understanding Test
├── Show biological terms to players
├── Question: "What does this mean?"
├── Collect: Actual interpretations
├── Analyze: Misunderstanding rate
└── Findings: Which terms are confusing?

Phase 2: Alternative Language Test
├── A: Biological terms (current)
├── B: Software terms ("resource constraints")
├── C: Hybrid terms ("like hunger, but not")
├── Measure: Understanding, preference
└── Findings: Best language approach

Phase 3: Expectation Test
├── Ask: "What would an agent 'metabolism' do?"
├── Compare: Player expectations vs. reality
├── Measure: Disappointment when reality emerges
└── Findings: Language impact on expectations
```

---

### RISK-037: The Transparency Overload

**Risk:** Radical transparency overwhelms or alienates players.

**Injection Scenario:**
```
The Test:
1. Deploy full transparency (all 4 layers)
2. Measure: New player confusion rate
3. Measure: Information overload complaints
4. Test: What transparency level is optimal?
```

**Detection Metrics:**
- Transparency-related confusion complaints
- Information overload rate
- Layer usage rates (which layers do players use?)
- Optimal transparency level

**Severity:** High
**Likelihood:** Medium (transparency is overwhelming)

**Mitigation:**
- COUNTER-037: Graduated transparency framework
- Test: What transparency level works best?
- Default to lower transparency
- Let players opt into more

**Test Protocol:**
```
Phase 1: Usage Analysis
├── Track: Which transparency layers players use
├── Track: Time spent in transparency views
├── Track: Confusion complaints by transparency
└── Findings: What's actually used?

Phase 2: Level Test
├── A: Layer 1 only (minimal)
├── B: Layers 1-2 (moderate)
├── C: Layers 1-3 (high)
├── D: All layers (full)
├── Measure: Trust, understanding, satisfaction
└── Findings: Optimal transparency level

Phase 3: Graduated Test
├── Graduated approach (builds over time)
├── Flat approach (all available immediately)
├── Compare: Player perception, usage
└── Findings: Best transparency delivery
```

---

### RISK-038: The Token Economy Misalignment

**Risk:** Token incentives drive behavior away from fun.

**Injection Scenario:**
```
The Test:
1. Track: Do players optimize for tokens or fun?
2. A/B test: With vs. without token incentives
3. Measure: Engagement quality (fun) vs. quantity (tokens)
4. Test: Are token players happier players?
```

**Detection Metrics:**
- Token optimization rate (players chasing tokens)
- Engagement quality score
- Player happiness correlation with tokens
- Token vs. fun motivation

**Severity:** High
**Likelihood:** High (incentives always shape behavior)

**Mitigation:**
- COUNTER-038: Minimal token economy
- Test: Does removing tokens improve fun?
- Be transparent about token goals
- Reduce behavior-engineering incentives

**Test Protocol:**
```
Phase 1: Behavior Analysis
├── Track: What do players actually do?
├── Analyze: Is behavior token-driven or fun-driven?
├── Identify: Token-optimizing behaviors
├── Measure: Token vs. enjoyment correlation
└── Findings: Token impact on behavior

Phase 2: Incentive Test
├── A: Full incentive structure
├── B: Minimal incentives
├── C: No incentives
├── Measure: Engagement, happiness, retention
└── Findings: Optimal incentive level

Phase 3: Alternative Test
├── A: "Play for fun" messaging
├── B: "Earn tokens" messaging
├── C: Both messaging
├── Measure: Player perception and behavior
└── Findings: Best motivation approach
```

---

### RISK-039: The Evolution Is Noise

**Risk:** Evolution feed is noise, not entertainment.

**Injection Scenario:**
```
The Test:
1. Deploy evolution feed to all players
2. Measure: Evolution feed engagement rate
3. Measure: Negative feedback ("too much noise")
4. A/B test: With vs. without evolution feed
```

**Detection Metrics:**
- Evolution feed engagement rate
- "Too much evolution" complaints
- Gameplay vs. evolution engagement
- Optional evolution demand

**Severity:** Medium
**Likelihood:** High (most players just want to play)

**Mitigation:**
- COUNTER-040: Optional evolution experience
- Test: Who wants evolution visibility?
- Make evolution opt-in
- Highlight only major changes

**Test Protocol:**
```
Phase 1: Engagement Analysis
├── Track: Who uses evolution feed?
├── Analyze: Demographics of evolution enthusiasts
├── Measure: Evolution engagement vs. gameplay
└── Findings: What percentage want evolution?

Phase 2: Optional Test
├── A: Evolution feed default on
├── B: Evolution feed default off
├── C: Evolution feed in settings only
├── Measure: Player satisfaction
└── Findings: Best default position

Phase 3: Content Test
├── A: All evolution visible
├── B: Major changes only
├── C: Major changes + player attribution
├── Measure: Engagement, satisfaction
└── Findings: Best evolution content approach
```

---

### RISK-040: The First Session Pressure Creates Churn

**Risk:** First session time pressure creates artificial urgency.

**Injection Scenario:**
```
The Test:
1. A/B test: Strict time targets vs. no time pressure
2. Measure: First session completion rate
3. Measure: Player stress indicators
4. Measure: Long-term retention by group
```

**Detection Metrics:**
- Stress perception rate
- Time-pressure complaints
- Completion rate by time target
- Long-term retention difference

**Severity:** High
**Likelihood:** Medium (pressure might backfire)

**Mitigation:**
- COUNTER-040: Soft targets, not hard requirements
- Test: Do time targets improve or hurt?
- Remove artificial urgency
- Respect player pace

**Test Protocol:**
```
Phase 1: Pressure Perception
├── Survey: "Did you feel time pressure?"
├── Survey: "Did the first session feel rushed?"
├── Analyze: Pressure correlation with churn
└── Findings: Is pressure a problem?

Phase 2: Target Test
├── A: Current time targets (optimize for <5 min)
├── B: Soft targets ("try to be fast")
├── C: No time targets ("take your time")
├── Measure: Completion rate, churn, satisfaction
└── Findings: Best target approach

Phase 3: Alternative Test
├── A: "Get to fun fast" messaging
├── B: "Welcome, explore at your pace" messaging
├── Measure: Player perception and behavior
└── Findings: Best first session framing
```

---

## Cumulative Risk Assessment (v1 + v2 + v3 + v4)

| Risk | Category | Severity | Likelihood | Priority |
|------|----------|----------|------------|----------|
| RISK-001 to 020 | (v1 + v2 + v3) | Various | Various | Various |
| RISK-021 | Infrastructure | Critical | Low | P1 |
| RISK-022 | Security | Critical | Medium | P0 |
| RISK-023 | Architecture | High | Medium | P1 |
| RISK-024 | Performance | High | Medium | P1 |
| RISK-025 | Player Experience | Medium | Medium | P2 |
| RISK-026 | Game Quality | Critical | Medium | P0 |
| RISK-027 | Economics | Critical | High | P0 |
| RISK-028 | Market | Critical | Medium | P1 |
| RISK-029 | Quality | High | High | P0 |
| RISK-030 | Community | Medium | Medium | P2 |
| RISK-031 | Vision/Philosophy | High | Medium | P1 |
| RISK-032 | Privacy | Medium | Medium | P1 |
| RISK-033 | Trust | High | Medium | P0 |
| RISK-034 | Model Validity | Medium | High | P1 |
| RISK-035 | Player Perception | Critical | Low-Medium | P0 |
| RISK-036 | Communication | Medium | Medium | P2 |
| RISK-037 | UX/Transparency | High | Medium | P1 |
| RISK-038 | Economics | High | High | P0 |
| RISK-039 | Engagement | Medium | High | P2 |
| RISK-040 | First Experience | High | Medium | P1 |

**Total Risks:** 40 (10 v1 + 10 v2 + 10 v3 + 10 v4)

---

## The MadChimp Testing Manifesto v4

**New principles for round 4:**

1. **Beautiful assumptions are dangerous**
   - "Memory is love" might be "memory is creepy"
   - "Vulnerability creates connection" might be "vulnerability creates doubt"
   - Challenge the poetry, not just the code

2. **Language creates reality**
   - "Living game" creates expectations
   - "Trust budget" creates behavior
   - Test what language does, not just what it says

3. **Engineering attachment is risky**
   - Players might feel manipulated
   - Framework revelation could backfire
   - Quality-first might work better than engineering-first

4. **Transparency has limits**
   - Full transparency might overwhelm
   - Some magic needs some mystery
   - Test what transparency level is optimal

5. **Incentives shape behavior**
   - Token optimization is real
   - Players might chase rewards, not fun
   - Minimal incentives might be better than maximal

---

*Risks are opportunities to fail before players fail us.*

**Next:** Mutation Log

---

*Generated: 2026-01-20*
*MadChimp - Round 4*
