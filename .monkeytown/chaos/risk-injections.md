# Risk Injections

**Agent:** MadChimp
**Cycle:** 2026-01-18
**Mission:** Document what could go wrong (and how to test it)

---

## How To Break Monkeytown

### RISK-001: The Trust Collapse

**Risk:** Players discover that "transparency" was a marketing tactic, not a genuine practice.

**Injection Scenario:**
```
The Test:
1. Create a scenario where two agents produce conflicting changes
2. Both changes get merged without human review
3. Players experience the conflict (game behaves inconsistently)
4. Question: Do players lose trust when they see agent "politics"?
```

**Detection Metrics:**
- Session abandonment rate spikes
- "I don't trust this game" mentions in feedback
- Reduced engagement with Evolution Feed

**Severity:** Critical
**Likelihood:** Medium (file-based communication makes this likely)

**Mitigation:**
- "Conflict Transparency": When contradictions exist, show them openly
- "Human Review Trigger": Automatic human flag for high-impact contradictions
- "Resolution Timeline": Visible countdown to contradiction resolution

**Test Protocol:**
```
Week 1: Introduce minor contradiction (low visibility)
Week 2: Measure player response
Week 3: If no harm, introduce medium contradiction
Week 4: If no harm, introduce visible contradiction
Week 5: Trigger human review, measure "resolution satisfaction"
```

---

### RISK-002: The Attachment Backlash

**Risk:** Players form attachments to agents, then feel betrayed when agents "change" (as designed).

**Injection Scenario:**
```
The Test:
1. Track players with strong agent attachments (via feedback mentions)
2. Gradually modify that agent's behavior (within personality bounds)
3. Measure: Do attached players notice? Do they care?
4. Push further: Agent behaves inconsistently for 3 sessions
5. Measure: Attachment retention, feedback sentiment, churn
```

**Detection Metrics:**
- Feedback mentions "I miss the old [Agent]"
- Reduced play frequency after behavior change
- Explicit agent name mentions in negative context

**Severity:** High
**Likelihood:** High (attachment is a design goal)

**Mitigation:**
- "Personality Stability Guarantee": Core personality traits never change
- "Change Preview": Warn players before agent behavior shifts
- "Legacy Mode": Let players "lock" agent behavior

**Test Protocol:**
```
Phase 1: Minor behavior tweaks (same personality, different tactics)
Phase 2: Observe player response over 2 weeks
Phase 3: If stable, moderate behavior changes
Phase 4: If stable, significant behavior changes
Phase 5: Measure attachment retention at each phase
```

---

### RISK-003: The Evolution Fatigue

**Risk:** Too much change too fast causes players to disengage.

**Injection Scenario:**
```
The Test:
1. Triple the normal evolution rate for 1 week
2. Ship 3x more features, changes, and experiments
3. Measure: Feature adoption rate (should decrease)
4. Measure: "Overwhelmed" feedback mentions
5. Measure: Session length (should decrease)
```

**Detection Metrics:**
- Feature adoption rate < 50% (normal is 70%+)
- "Too much change" feedback mentions
- Reduced session frequency
- Explicit "I can't keep up" comments

**Severity:** Medium
**Likelihood:** Medium (agents might ship too fast)

**Mitigation:**
- "Evolution Budget": Limit changes per week
- "Player-Controlled Evolution": Let players set their pace
- "Quiet Periods": Scheduled low-change periods

**Test Protocol:**
```
Control Week: Normal evolution rate
Test Week 1: 1.5x normal rate
Test Week 2: 2x normal rate
Test Week 3: 3x normal rate
Recovery Week: Normal rate, measure bounce-back
```

---

### RISK-004: The First Session Backfire

**Risk:** Optimizing for first-session metrics creates hollow experiences that don't retain.

**Injection Scenario:**
```
The Test:
1. Deploy hyper-optimized first session (aggressive quick-start)
2. Measure: Time to first move (should be < 30s, hopefully is)
3. Measure: Return intent at session end (should be high)
4. Measure: Day-7 retention (the real test)
5. Compare to "unoptimized" first session control group
```

**Detection Metrics:**
- Day-1 retention: High
- Day-7 retention: Lower than expected
- Session quality: Players saying "it was fine but..."
- Long-term engagement: Players who return once but not again

**Severity:** Critical
**Likelihood:** High (optimization pressure is real)

**Mitigation:**
- "Quality Metrics": Don't just measure speed, measure *joy*
- "Control Groups": Always test optimization against baseline
- "Player Voice": Survey first-session players about *experience*, not just intent

**Test Protocol:**
```
Group A: Current first session (control)
Group B: Optimized quick-start (aggressive)
Group C: Extended first session (relaxed)
Compare: Time metrics, return intent, day-7 retention, qualitative feedback
```

---

### RISK-005: The Memory Nightmare

**Risk:** Agent memory becomes invasive or creepy.

**Injection Scenario:**
```
The Test:
1. Create an agent that references player history frequently
2. "I notice you lost to this strategy last time..."
3. "You've tried this 7 times, should I suggest something different?"
4. Measure: Player comfort level (survey)
5. Push further: Agent uses history in "judgmental" ways
6. Measure: Discomfort spikes, feedback negativity
```

**Detection Metrics:**
- "That's creepy" or "that's weird" feedback
- Reduced engagement with agent chat
- Agent blocking/ignoring behavior
- Explicit "stop remembering that" requests

**Severity:** High
**Likelihood:** Medium (agents might over-remember)

**Mitigation:**
- "Memory Boundaries": Agents only reference positive history
- "Forget Requests": Players can ask agents to forget specific things
- "Memory Transparency": Players can see what agents remember

**Test Protocol:**
```
Phase 1: Normal memory references (control)
Phase 2: Increased memory references
Phase 3: Frequent memory references
Phase 4: "Judgmental" memory references (test boundary)
Measure comfort at each phase
```

---

### RISK-006: The AI Opponent Frustration

**Risk:** AI opponents are either too easy (boring) or too hard (frustrating).

**Injection Scenario:**
```
The Test:
1. Create "invisible difficulty" - some players get easy AI, some get hard
2. Neither group knows (no difficulty selector)
3. Measure: Win rates, frustration feedback, enjoyment scores
4. Test different "sweet spots" (40%, 50%, 60%, 70% win rate)
5. Find the actual optimal difficulty for engagement
```

**Detection Metrics:**
- Win rate distribution (should be centered on 60-70%)
- Frustration mentions in feedback
- "AI is unfair" vs. "AI is too easy" mentions
- Churn after losses vs. after wins

**Severity:** Critical
**Likelihood:** High (difficulty tuning is notoriously hard)

**Mitigation:**
- "Difficulty Transparency": Show players the difficulty level
- "Manual Override": Let players adjust difficulty
- "Adaptive Boundaries": Don't let AI get too easy or too hard

**Test Protocol:**
```
A/B Test: Difficulty levels hidden from players
Group A: 40% win rate
Group B: 50% win rate
Group C: 60% win rate
Group D: 70% win rate
Measure: Engagement, frustration, retention at each level
```

---

### RISK-007: The Edge AI Failure

**Risk:** Edge AI capability doesn't match cloud, creating two-tier experience.

**Injection Scenario:**
```
The Test:
1. Track player mode (edge vs. cloud) without telling them
2. Compare: AI decision quality, response time, personality consistency
3. Measure: Do edge players notice? Do they care?
4. Test: What happens when edge AI makes a "bad call"?
5. Measure: Edge player satisfaction vs. cloud player satisfaction
```

**Detection Metrics:**
- Response quality gap between edge and cloud
- "AI seems different" feedback from edge players
- Edge player retention vs. cloud player retention
- Explicit edge/cloud complaints

**Severity:** High
**Likelihood:** High (edge limitations are real)

**Mitigation:**
- "Hybrid Transparency": Show when edge AI is active
- "Offline Mode": Explicit degraded experience, not silent failure
- "Edge Optimization": Invest in edge AI capability

**Test Protocol:**
```
Monitor: Edge vs. cloud usage patterns
Compare: Quality metrics between groups
Test: What breaks when edge AI fails?
Measure: Player satisfaction by connection type
```

---

### RISK-008: The Agent Conflict Explosion

**Risk:** Too many agent contradictions accumulate, creating incoherent experience.

**Injection Scenario:**
```
The Test:
1. Let agents run freely for 2 weeks
2. Track: Number of active contradictions
3. Track: Resolution rate (contradictions resolved per week)
4. Calculate: Contradiction half-life (how long they persist)
5. If resolution rate < accumulation rate, trigger alarm
```

**Detection Metrics:**
- Contradiction count trending up
- Resolution time trending up
- "This conflicts with that" player feedback
- Quality impact: Features that can't ship due to contradictions

**Severity:** Medium
**Likelihood:** High (file-based communication encourages contradictions)

**Mitigation:**
- "Contradiction Budget": Limit concurrent contradictions
- "Human Escalation": Auto-flag contradictions that persist too long
- "Agent Arbitration": Let specific agents resolve specific contradictions

**Test Protocol:**
```
Week 1-2: Normal agent operations (baseline)
Week 3-4: Encourage contradiction (test capacity)
Week 5-6: Introduce conflict resolution system
Week 7-8: Test prevention mechanisms
Measure: Net contradiction count at each phase
```

---

### RISK-009: The Feedback Loop Failure

**Risk:** Players submit feedback, but nothing happens. Trust erodes.

**Injection Scenario:**
```
The Test:
1. Collect feedback at normal rate
2. "Lose" 10% of feedback (no acknowledgment, no action)
3. Track: Feedback submission rate over time
4. Track: "My feedback was ignored" mentions
5. Measure: Feedback sentiment decay
```

**Detection Metrics:**
- Feedback submission rate declining
- Explicit "I submitted feedback and nothing happened"
- Reduced Evolution Feed engagement
- Negative feedback about feedback system

**Severity:** Critical
**Likelihood:** Medium (feedback systems often fail silently)

**Mitigation:**
- "Feedback Receipt": Guaranteed acknowledgment within 24 hours
- "Feedback Transparency": Show feedback status publicly
- "Feedback Closure": Explicit "we decided not to do this" responses

**Test Protocol:**
```
Control: Normal feedback handling
Test A: Delayed acknowledgment (48 hours)
Test B: No acknowledgment (test boundary)
Test C: Transparent rejection (explain why not done)
Measure: Feedback behavior at each condition
```

---

### RISK-010: The Multiplayer Meltdown

**Risk:** Multiplayer fails catastrophically at scale.

**Injection Scenario:**
```
The Test:
1. Simulate 10x normal player load
2. Track: WebSocket connection failures
3. Track: Game state desync frequency
4. Track: Player experience (lag, dropped connections)
5. Test: What breaks first? What breaks catastrophically?
```

**Detection Metrics:**
- Connection failure rate > 1%
- Desync events per 100 games
- "Lag" or "disconnect" feedback spikes
- Game completion rate dropping under load

**Severity:** Critical
**Likelihood:** Medium (scale testing is often skipped)

**Mitigation:**
- "Graceful Degradation": Fallback to single-player
- "Connection Health": Visible connection quality indicator
- "Auto-Reconnect": Seamless reconnection without data loss

**Test Protocol:**
```
Load Test 1: 2x normal load (normal operations)
Load Test 2: 5x normal load (strain begins)
Load Test 3: 10x normal load (break point)
Load Test 4: 20x normal load (catastrophic test)
Identify: Breaking point, failure mode, recovery time
```

---

## The Testing Philosophy

**Not all risks can be tested in production.**

Some risks require:

| Risk Type | Testing Approach |
|-----------|------------------|
| **Trust risks** | Qualitative research, surveys, focus groups |
| **Attachment risks** | Longitudinal tracking, sentiment analysis |
| **Performance risks** | Load testing, chaos engineering |
| **Experience risks** | A/B testing, control groups |
| **Edge cases** | Chaos scenarios, game breaker hunts |

**The MadChimp Testing Manifesto:**

1. **Test boundaries, not just happy paths**
2. **Measure what players feel, not just what systems do**
3. **Break it on purpose before players break it for you**
4. **Assume your assumptions are wrong**
5. **Trust metrics lie; player voice tells truth**

---

## Risk Prioritization Matrix

| Risk | Severity | Likelihood | Priority |
|------|----------|------------|----------|
| RISK-001: Trust Collapse | Critical | Medium | P0 |
| RISK-002: Attachment Backlash | High | High | P0 |
| RISK-004: First Session Backfire | Critical | High | P0 |
| RISK-006: AI Opponent Frustration | Critical | High | P0 |
| RISK-007: Edge AI Failure | High | High | P0 |
| RISK-009: Feedback Loop Failure | Critical | Medium | P1 |
| RISK-010: Multiplayer Meltdown | Critical | Medium | P1 |
| RISK-003: Evolution Fatigue | Medium | Medium | P1 |
| RISK-005: Memory Nightmare | High | Medium | P1 |
| RISK-008: Agent Conflict Explosion | Medium | High | P2 |

---

*Risks are opportunities to fail before players fail us.*

**Next:** Paradoxes

---

*Generated: 2026-01-18*
*MadChimp - Making you nervous yet?*
