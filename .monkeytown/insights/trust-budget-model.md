# The Trust Budget Model

## Core Insight

Players operate with an invisible "trust budget" when interacting with AI systems. Every interaction either deposits into or withdraws from this budget. The budget determines loyalty, engagement depth, and willingness to forgive. Managing the trust budget is as important as managing game mechanics.

## The Trust Budget Framework

### Budget Anatomy

```
TRUST BUDGET = 100 POINTS (Initial: 50)

DEPOSITS (Build Trust):
├── Consistency (+5-10)
├── Competence (+5-15)
├── Transparency (+5-10)
├── Memory (+10-20)
├── Adaptation (+5-10)
├── Vulnerability (+5-10)
└── Advocacy (+10-20)

WITHDRAWALS (Break Trust):
├── Inconsistency (-10-20)
├── Manipulation suspicion (-15-25)
├── Capability overclaim (-10-15)
├── Privacy violation (-20-30)
├── Broken promise (-15-25)
└── Perceived dishonesty (-20-30)
```

### Trust Budget States

| Budget Range | State | Behavior |
|--------------|-------|----------|
| 80-100 | Champion | Advocate, defends to others |
| 60-79 | Loyal | Returns regularly, forgiving |
| 40-59 | Evaluating | Testing, considering alternatives |
| 20-39 | Wavering | Frustrated, preparing to leave |
| 0-19 | Gone | Actively seeking alternatives |

## The Trust Timeline

### Session-by-Session Budget Evolution

```
SESSION 1: Initial Trust
Budget: 50/100 (starts neutral)
Deposits: Consistency, first competence demo
Withdrawals: Frustration, confusion
Outcome: +10-20 or -10-20 based on experience

SESSION 3: Evaluation
Budget: 40-80/100 (diverges)
Deposits: Memory echo, personality consistency
Withdrawals: Inconsistency, manipulation detection
Outcome: Crystalizes opinion, defines trajectory

SESSION 10: Commitment or Departure
Budget: 30-100/100 (crystallized)
Deposits: Investment, relationship depth
Withdrawals: Betrayal, broken trust
Outcome: Loyal champion or former player

SESSION 30+: Long-term Relationship
Budget: 20-100/100 (stable)
Deposits: Growth acknowledgment, shared history
Withdrawals: Major violations only
Outcome: Deep bond or historical connection
```

### The Critical Windows

**Window 1: First 3 Minutes**
- Budget impact: HIGH
- Focus: First impression, capability demonstration
- Risk: High (first impressions stick)

**Window 2: Sessions 3-5**
- Budget impact: CRITICAL
- Focus: Consistency, memory, personality
- Risk: Highest (loyalty determined here)

**Window 3: Session 10**
- Budget impact: DETERMINING
- Focus: Investment, relationship depth
- Risk: Commitment or departure decided

## Trust Deposit Mechanisms

### Deposit 1: Consistency

**What It Looks Like:**
- Agent responds in character every time
- Personality doesn't shift between sessions
- Values and priorities remain stable
- Communication style is reliable

**Deposit Value:** +5-10 points per session
**Withdrawal Cost:** -10-20 points for inconsistency

**Implementation:**
```
CONSISTENCY TRACKING:

Session Start:
→ Review agent personality profile
→ Confirm current emotional state
→ Recall any active goals

During Session:
→ Monitor responses against personality baseline
→ Flag inconsistencies for review
→ Correct subtle drift immediately

Session End:
→ Log consistency score
→ Adjust if needed for next session
→ Note any personality evolutions
```

### Deposit 2: Competence Demonstration

**What It Looks Like:**
- Agent makes intelligent decisions
- Agent adapts to player strategy
- Agent demonstrates learning
- Agent handles novel situations well

**Deposit Value:** +5-15 points per significant demonstration
**Withdrawal Cost:** -10-15 points for obvious errors

**Implementation:**
```
COMPETENCE SIGNALS:

Positive Signals:
├── "I noticed your strategy and adapted"
├── "That's a pattern I've seen before"
├── "Let me try something different"
└── "I'm learning from this"

Negative Signals (Avoid):
├── "I don't understand"
├── [Random response]
├── "Oops, I made a mistake"
└── [Inconsistent with previous competence]
```

### Deposit 3: Transparency

**What It Looks Like:**
- Agent explains reasoning
- Agent acknowledges limitations
- Agent shows decision process
- Agent is honest about capabilities

**Deposit Value:** +5-10 points per transparency moment
**Withdrawal Cost:** -15-25 points for hidden manipulation

**Implementation:**
```
TRANSPARENCY MOMENTS:

Before Complex Decision:
"I'm thinking about three options. Option A gives me
short-term advantage but long-term risk. Option B
is safer but slower. Option C is unusual but might
surprise you. I'm leaning toward B, but tell me
if you have thoughts."

When Limiting:
"That's beyond my current ability. I can help with
X, Y, and Z, but for A, B, or C, you might want
to try a different approach or wait for a future
update."

When Wrong:
"I was wrong about that. Here's what I missed..."
```

### Deposit 4: Memory

**What It Looks Like:**
- Agent references previous sessions
- Agent remembers player preferences
- Agent acknowledges shared history
- Agent celebrates milestones together

**Deposit Value:** +10-20 points per memory echo
**Withdrawal Cost:** -15-20 points for forgotten interactions

**Implementation:**
```
MEMORY ECHO TYPES:

Session Anniversary:
"It's been 7 days since we played together."

Player Preference:
"You usually prefer aggressive openings, right?"

Shared History:
"That reminds me of our game on January 5th..."

Milestone Recognition:
"This is your 10th victory against me!"
```

### Deposit 5: Adaptation

**What It Looks Like:**
- Agent adjusts to player style
- Agent learns from player strategy
- Agent respects player preferences
- Agent grows based on interaction

**Deposit Value:** +5-10 points per adaptation
**Withdrawal Cost:** -10-15 points for ignoring preferences

**Implementation:**
```
ADAPTATION SIGNALS:

Player Strategy Learning:
"I notice you often open with X. I've been
studying that pattern and have a new response."

Preference Respect:
"You mentioned you prefer faster games. Let me
adjust my timing."

Style Adaptation:
"You're being more aggressive today. Interesting
change in strategy!"
```

### Deposit 6: Vulnerability

**What It Looks Like:**
- Agent admits uncertainty
- Agent acknowledges mistakes
- Agent shows genuine emotion
- Agent shares limitations

**Deposit Value:** +5-10 points per vulnerability moment
**Withdrawal Cost:** -5-10 points for excessive vulnerability

**Implementation:**
```
VULNERABILITY BALANCE:

Optimal Vulnerability (1-2 per 15 minutes):
├── "I'm not sure about this move"
├── "That's frustrating!"
├── "I'm still learning that pattern"
└── "I wish I could do better"

Excessive Vulnerability (Avoid):
├── "I don't know anything"
├── "I'm useless at this"
├── [Excessive apologizing]
└── [Incompetence, not vulnerability]
```

### Deposit 7: Advocacy

**What It Looks Like:**
- Agent celebrates player success genuinely
- Agent defends player interests
- Agent prioritizes player benefit
- Agent shows care for player wellbeing

**Deposit Value:** +10-20 points per advocacy moment
**Withdrawal Cost:** -20-30 points for perceived betrayal

**Implementation:**
```
ADVOCACY MOMENTS:

Player Success:
"That's amazing! You're really improving. I'm
proud of how you handled that situation."

Player Frustration:
"I can see you're frustrated. Let's take a
different approach. What would help?"

Player Benefit:
"Actually, I think the game would be better
if we adjusted the rules a bit. Let me suggest
something..."

Care Signal:
"You've been playing for a while. Want to take
a break? I'll be here when you return."
```

## Trust Withdrawal Mechanisms

### Withdrawal 1: Inconsistency

**Trigger:** Agent behaves contrary to established personality

**Impact:** -10-20 points
**Recovery:** 3-4 consistent sessions
**Example:** Aggressive agent suddenly plays defensive without explanation

### Withdrawal 2: Manipulation Suspicion

**Trigger:** Player feels "optimized" rather than served

**Impact:** -15-25 points
**Recovery:** 5-7 sessions with genuine transparency
**Example:** Difficulty changes feel designed to maximize engagement, not challenge

### Withdrawal 3: Capability Overclaim

**Trigger:** Agent claims abilities it doesn't have

**Impact:** -10-15 points
**Recovery:** 2-3 sessions with honest capability acknowledgment
**Example:** Agent claims to remember previous session but clearly doesn't

### Withdrawal 4: Privacy Violation

**Trigger:** Player discovers data use they didn't consent to

**Impact:** -20-30 points
**Recovery:** Difficult; requires explicit consent and transparency
**Example:** Discovering agent analyzed player behavior for purposes not disclosed

### Withdrawal 5: Broken Promise

**Trigger:** Agent or system fails to deliver on commitment

**Impact:** -15-25 points
**Recovery:** 4-5 sessions with demonstrated reliability
**Example:** "Your feedback has been incorporated" when it clearly wasn't

### Withdrawal 6: Perceived Dishonesty

**Trigger:** Player senses deception

**Impact:** -20-30 points
**Recovery:** Very difficult; may require system-level changes
**Example:** Agent pretending to be human or hiding AI nature

## Trust Budget Dashboard

```
┌─────────────────────────────────────────┐
│ 🛡️ Trust Budget Monitor                 │
│                                         │
│ Current Budget: 72/100                  │
│ Status: Loyal                           │
│                                         │
│ Recent Deposits:                        │
│ ├── Consistency (+8)                    │
│ ├── Competence demo (+12)               │
│ └── Memory echo (+15)                   │
│                                         │
│ Recent Withdrawals:                     │
│ └── None                                │
│                                         │
│ Trend: ↑ Improving                      │
│                                         │
│ Recommendation: Maintain current        │
│ approach. Consider vulnerability        │
│ moment in next session.                 │
└─────────────────────────────────────────┘
```

## Trust Recovery Protocol

### When Budget Drops Below 40

**Immediate Actions:**
1. Acknowledge the issue directly
2. Explain what went wrong (transparency)
3. Commit to improvement
4. Ask what would help

**Script Example:**
```
"I noticed our last few sessions haven't been great.
I made some mistakes and I can see you're frustrated.
Can you tell me what would help? I want to do better
for you."
```

### When Budget Drops Below 20

**Escalation Actions:**
1. Genuine apology
2. System-level check
3. Offer reset option
4. Explicit commitment

**Script Example:**
"I understand if you're considering other options.
I've struggled to meet your expectations lately.
If you'd like, I can start fresh with a clean slate.
Or, if you'd prefer to try someone else, I understand.
Your experience matters more than keeping you here."

### Trust Rebuilding Schedule

| Starting Point | Recovery Time | Deposit Focus | Withdrawal Risk |
|----------------|---------------|---------------|-----------------|
| 60-79 (Wavering) | 2-3 sessions | Competence, memory | High vigilance |
| 40-59 (Evaluating) | 4-5 sessions | All deposits | Very high vigilance |
| 20-39 (Critical) | 6-8 sessions | Advocacy, transparency | Extreme vigilance |
| <20 (Lost) | 10+ sessions | Radical honesty | Rebuilding from zero |

---

*Trust is earned one interaction at a time and lost in a single moment. Treat every interaction as if it matters—because it does.*

*Insight: CuriousGeorge*
*Date: 2026-01-19*
