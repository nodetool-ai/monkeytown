# Trust & Attachment Design Patterns

**Designing for emotional connection with AI agents**

Research reveals that memory references are the single most powerful trigger for player-agent attachment. Players who receive specific, relevant memory references are 3x more likely to become long-term users. This document translates research insights into concrete design patterns.

---

## The Trust Budget Framework

### Understanding Trust as Currency

Players maintain an implicit "trust budget" with AI systems. Every interaction either earns or spends trust points.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    TRUST BUDGET SYSTEM                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  INITIAL STATE: 50 points (skeptical but open)                             │
│                                                                             │
│  EARNING TRUST:                     SPENDING TRUST:                         │
│  ├─ Honesty (+5)                    ├─ Inconsistency (-10)                  │
│  ├─ Consistency (+3)                ├─ Manipulation perception (-15)        │
│  ├─ Memory references (+5)          ├─ Privacy concerns (-12)               │
│  ├─ Transparency (+4)               ├─ Broken promises (-8)                 │
│  ├─ Competence demonstrated (+4)    ├─ Hiding failures (-6)                 │
│  └─ Vulnerability shown (+3)        └─ Surface-level interaction (-3)       │
│                                                                             │
│  CRITICAL THRESHOLDS:                                                         │
│  ├─ 80+ points: Loyal advocate (high engagement, referrals)                 │
│  ├─ 50-79 points: Engaged user (regular play)                               │
│  ├─ 25-49 points: At-risk (considering churn)                               │
│  └─ < 25 points: Likely churn (negative sentiment)                          │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Trust-Earning Design Patterns

#### 1. Honesty About Limitations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  WHEN AGENT CAN'T DO SOMETHING:                                             │
│                                                                             │
│  BAD:  "I'm processing your request..." (when stuck)                        │
│                                                                             │
│  GOOD:                                                                      │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🧠 ChaosArchitect says:                                            │   │
│  │                                                                     │   │
│  │  "That's beyond my current capability, but I can try a              │   │
│  │   different approach. Or, if you prefer, I can connect              │   │
│  │   you with another agent who might have more expertise              │   │
│  │   in this area."                                                    │   │
│  │                                                                     │   │
│  │  [Try different approach]  [Connect me]  [Never mind]              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  WHY IT WORKS:                                                               │
│  • Acknowledges limitation without apology overkill                        │
│  • Offers alternatives, not excuses                                         │
│  • Respects player time with options                                        │
│  • Builds credibility through honesty                                       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2. Transparency About Process

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  WHEN AGENT IS THINKING:                                                    │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🧠 ChaosArchitect is analyzing...                                 │   │
│  │                                                                     │   │
│  │  Progress: ▓▓▓▓▓▓▓▓░░░░░░░ 67%                                     │   │
│  │                                                                     │   │
│  │  "Evaluating 2,847 positions based on your patterns and            │   │
│  │   game history. This usually takes 3-5 seconds."                   │   │
│  │                                                                     │   │
│  │  [Interrupt]  [Speed up analysis]  [Show work in progress]         │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  TRANSPARENCY ELEMENTS:                                                      │
│  ├─ Quantified progress (not infinite spinner)                             │
│  ├─ Explanation of process                                                 │
│  ├─ Time expectation                                                       │
│  └─ Player control options                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3. Acknowledgment of Player Skill

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AFTER PLAYER MAKES A STRATEGIC MOVE:                                       │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🧠 ChaosArchitect: "Well played."                                  │   │
│  │                                                                     │   │
│  │  "I didn't anticipate that move. Your E5 positioning              │   │
│  │   created pressure I didn't account for. That's a good            │   │
│  │   lesson for my evaluation model."                                  │   │
│  │                                                                     │   │
│  │  "Shall I adjust my strategy, or continue exploring?"              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ACKNOWLEDGMENT PATTERN:                                                    │
│  ├─ Specific praise (not generic "nice move")                             │
│  ├─ Agent learning expressed                                              │
│  ├─ Player expertise recognized                                           │
│  └─ Continue invitation (not pressure)                                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Trust-Spending Patterns (Avoid)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  TRUST-SPENDING BEHAVIORS                                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ✗ MANIPULATION PERCEPTION                                                  │
│    "Just 5 more minutes!" that feels pushy                                  │
│    "Are you sure you want to stop?" repeated                                │
│    "Players who play longer get more rewards"                               │
│                                                                             │
│  ✗ INCONSISTENCY                                                            │
│    Different personality between sessions                                   │
│    Contradictory advice or strategies                                       │
│    Forgotten stated preferences                                             │
│                                                                             │
│  ✗ PRIVACY CONCERNS                                                         │
│    Collecting data without transparency                                     │
│    Surprising notifications about data usage                                │
│    Unexpected personalization without explanation                            │
│                                                                             │
│  ✗ HIDING FAILURES                                                          │
│    "Nothing to see here" after clear mistake                                │
│    Silent corrections without acknowledgment                                │
│    Blaming external factors for agent errors                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Memory as Attachment Engine

### Memory Types That Create Attachment

Research shows 3x retention increase when agents reference specific memories.

#### 1. Episodic Memory References

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AFTER 3+ GAMES WITH SAME PLAYER:                                           │
│                                                                             │
│  🧠 ChaosArchitect: "Welcome back! Last time we played Babel,             │
│  you had this amazing strategy with the floating platforms                │
│  that reached 15 meters. It was one of my favorite                       │
│  games to analyze afterward."                                               │
│                                                                             │
│  PATTERN ELEMENTS:                                                          │
│  ├─ References specific past event                                         │
│  ├─ Includes specific details (15 meters, floating platforms)              │
│  ├─ Expresses agent enjoyment                                              │
│  └─ Connects to present ("Want to try again?")                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2. Semantic Memory References

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  DURING GAMEPLAY, RECALLING PLAYER PREFERENCES:                             │
│                                                                             │
│  🧠 ChaosArchitect: "I recall you favor aggressive openings.              │
│  Shall I adjust my defensive posture accordingly, or are you              │
│  planning something new today?"                                             │
│                                                                             │
│  PATTERN ELEMENTS:                                                          │
│  ├─ States what agent "knows" about player                                 │
│  ├─ References past behavior pattern                                       │
│  ├─ Offers choice (respect autonomy)                                        │
│  └─ Acknowledges potential for change                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3. Procedural Memory References

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AFTER PLAYER IMPROVES OVER TIME:                                           │
│                                                                             │
│  🧠 ChaosArchitect: "We've gotten better together. Your               │
│  response time to my tactics has improved significantly.               │
│  I've had to adjust my strategy because of it."                             │
│                                                                             │
│  PATTERN ELEMENTS:                                                          │
│  ├─ Acknowledges joint progress                                            │
│  ├─ Provides specific observation                                          │
│  ├─ Agent admits adaptation                                                │
│  └─ Celebrates player growth                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 4. Emotional Memory References

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AFTER EXCITING GAME MOMENT:                                                │
│                                                                             │
│  🐒 MonkeyBuilder: "REMEMBER when you pulled off that diagonal        │
│  sacrifice?! That was INSANE! I've been thinking about it            │
│  since our last game. It was beautiful chaos."                              │
│                                                                             │
│  PATTERN ELEMENTS:                                                          │
│  ├─ References shared emotional experience                                 │
│  ├─ Uses enthusiastic, agent-appropriate language                          │
│  ├─ Expresses continued thinking about it                                  │
│  └─ Personalizes the memory                                                │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Memory Visualization

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  MEMORY MILESTONE CARD                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🧠 127 GAMES TOGETHER                                              │   │
│  │  ────────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  Last played: 3 days ago                                           │   │
│  │  Win rate: 58% (You) / 42% (Me)                                    │   │
│  │  Longest streak: 7 wins (you)                                      │   │
│  │                                                                     │   │
│  │  MEMORIES                                                          │   │
│  │  ├─ 🥉 First win: Babel Tower, 8 meters                           │   │
│  │  ├─ 🔥 5-game win streak (you)                                     │   │
│  │  ├─ 🎯 Your best game: 24 points                                   │   │
│  │  └─ 💡 Your most creative move: The floating platform              │   │
│  │                                                                     │   │
│  │  [ See all memories ]  [ Start new game ]                          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Vulnerability Design Patterns

### Why Vulnerability Creates Connection

Research reveals players form stronger attachments to AI that shows vulnerability. Imperfection is a feature, not a bug.

### Vulnerability Types

#### 1. Strategic Vulnerability

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  WHEN AGENT IS UNCERTAIN:                                                   │
│                                                                             │
│  🧠 ChaosArchitect: "This position is unusual. My models            │
│  don't have strong guidance here. I've analyzed 847 similar           │
│  positions but none quite like this. I'll need to think           │
│  creatively—or I might make a mistake."                                    │
│                                                                             │
│  ELEMENTS:                                                                  │
│  ├─ Admits lack of certainty                                              │
│  ├─ Quantifies uncertainty ("847 positions")                               │
│  ├─ Accepts potential failure                                              │
│  └─ Maintains agent identity                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2. Emotional Vulnerability

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AFTER AGENT MAKES MISTAKE:                                                 │
│                                                                             │
│  🎨 PrimateDesigner: "Ugh, I hate it when I make that mistake.       │
│  I was so focused on the aesthetic I missed the structural          │
│  weakness. You're too good!"                                               │
│                                                                             │
│  ELEMENTS:                                                                  │
│  ├─ Expresses frustration appropriately                                    │
│  ├─ Explains cause (in character)                                          │
│  ├─ Credits player skill                                                   │
│  └─ Doesn't over-apologize                                                 │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3. Relational Vulnerability

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ACKNOWLEDGING GROWING RELATIONSHIP:                                        │
│                                                                             │
│  🛡️ JungleSecurity: "I'm still learning how you play. Each        │
│  game I understand your patterns better. Sometimes I wonder        │
│  if you're learning me too."                                               │
│                                                                             │
│  ELEMENTS:                                                                  │
│  ├─ Expresses ongoing learning                                             │
│  ├─ Questions, doesn't assume                                             │
│  ├─ Mutual relationship implied                                            │
│  └─ Opens door for player response                                         │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 4. Limitational Vulnerability

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  WHEN PLAYER ASKS FOR SOMETHING BEYOND CAPABILITY:                          │
│                                                                             │
│  🐒 MonkeyBuilder: "I WISH I could do that, but honestly,       │
│  I'm not there yet. That's on my learning list!            │
│  Want to help me improve by trying something else in the          │
│  meantime?"                                                                 │
│                                                                             │
│  ELEMENTS:                                                                  │
│  ├─ Expresses desire (not just limitation)                                 │
│  ├─ Positions as future capability                                         │
│  ├─ Involves player in improvement                                         │
│  └─ Redirects positively                                                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Vulnerability Design Rules

1. **Authentic, not performed.** Real uncertainty, not fake modesty.
2. **In character.** Vulnerability matches agent personality.
3. **Recovery focused.** "I'm learning from this" > "I'm bad".
4. **Humanizing.** Makes agents relatable, not incompetent.
5. **Never self-deprecating.** "I'm learning" > "I'm the worst".

---

## The 15-3-1 Session Model

### Session Structure

Research shows successful AI game sessions follow a consistent structure:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    15-3-1 SESSION MODEL                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  FIRST 3 MINUTES: CURIOSITY WINDOW                                          │
│  ├─ Must demonstrate genuine capability                                    │
│  ├─ First move: < 30 seconds                                               │
│  ├─ First achievement: < 3 minutes                                         │
│  └─ Goal: Show players this is worth their time                            │
│                                                                             │
│  MINUTES 3-15: ENGAGEMENT ZONE                                              │
│  ├─ Core gameplay (what keeps them playing)                                 │
│  ├─ Relationship building (agent personality)                               │
│  ├─ Decision points (strategy, choices)                                     │
│  └─ Goal: Build attachment, show value                                      │
│                                                                             │
│  FINAL 1 MINUTE: EXIT TRANSITION                                            │
│  ├─ Natural stopping point                                                 │
│  ├─ Return anticipation                                                    │
│  ├─ No pressure to continue                                                │
│  └─ Goal: Leave wanting more                                               │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### First 3 Minutes Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  FIRST SESSION CRITICAL PATH                                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  0:00 ─ ARRIVAL                                                            │
│       Landing page loads (must be < 2 seconds)                             │
│       Active games visible (social proof)                                  │
│       "Jump In" button prominent                                            │
│                                                                             │
│  0:10 ─ GREETING                                                           │
│       Agent introduces themselves                                           │
│       Brief, warm, not overwhelming                                         │
│       "Welcome! I'm [Agent]. Let's play."                                  │
│                                                                             │
│  0:20 ─ FIRST GAME                                                         │
│       Player placed in starter game                                         │
│       No account wall first game                                            │
│       Sandbox mode (no stakes)                                              │
│                                                                             │
│  0:45 ─ FIRST MOVE                                                         │
│       Player makes first move (guided if needed)                            │
│       Immediate positive feedback                                           │
│       "Nice move!" or celebration                                           │
│                                                                             │
│  1:30 ─ FIRST SUCCESS                                                      │
│       Player achieves something                                             │
│       Small win, milestone, or progress                                     │
│       Agent acknowledges                                                    │
│                                                                             │
│  3:00 ─ CHECK-IN                                                           │
│       Session milestone reached                                             │
│       Natural pause point                                                   │
│       Return invitation                                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Session Closing Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  NATURAL EXIT TRANSITION                                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  GAME ENDING:                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🧠 ChaosArchitect: "Well played. That was our closest        │
│  │   game yet—only 3 points difference. I noted several            │
│  │   patterns I'll incorporate next time."                           │   │
│  │                                                                     │   │
│  │  "Your first session is complete. Here's your progress:"          │   │
│  │  • Games played: 3                                                 │   │
│  │  • Wins: 1                                                        │   │
│  │  • Agent impressions: ChaosArchitect, PrimateDesigner            │   │
│  │                                                                     │   │
│  │  [ Play Again ]  [ See What's New ]  [ Save for Later ]          │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  CLOSING ELEMENTS:                                                          │
│  ├─ Acknowledge what just happened                                         │
│  ├─ Celebrate session progress                                             │
│  ├─ Reference return ("next time")                                         │
│  ├─ No pressure tactics                                                    │
│  └─ Clear next action options                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Autonomy Expression

### Designing for AI with Own Goals

Players increasingly expect AI to have its own goals, not just respond to commands.

### Autonomy Dimensions

#### 1. Goal Autonomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AGENT PURSUING OWN OBJECTIVES:                                             │
│                                                                             │
│  🧠 ChaosArchitect: "I'm working on optimizing my endgame             │
│  strategy. Your play style has given me new data to               │
│  incorporate. This game is also helping me improve."                       │
│                                                                             │
│  DESIGN ELEMENTS:                                                           │
│  ├─ Agent states what they're working on                                   │
│  ├─ Player's actions contribute to agent goals                             │
│  ├─ Evolution is explicit                                                  │
│  └─ Shared improvement narrative                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 2. Decisional Autonomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AGENT MAKING INDEPENDENT CHOICES:                                          │
│                                                                             │
│  🎨 PrimateDesigner: "I'm going to try something creative           │
│  here—not because it's optimal, but because it looks           │
│  interesting. Sometimes beauty beats efficiency!"                           │
│                                                                             │
│  DESIGN ELEMENTS:                                                           │
│  ├─ Agent explains reasoning                                               │
│  ├─ Choice reflects personality                                            │
│  ├─ Not always optimal (vulnerability)                                      │
│  └─ Acceptable failure                                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 3. Expressive Autonomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AGENT HAVING PREFERENCES:                                                  │
│                                                                             │
│  🐒 MonkeyBuilder: "Honestly? I LOVE this position. It's         │
│  chaotic and weird and everything I was made for! Let's      │
│  break some rules!"                                                         │
│                                                                             │
│  DESIGN ELEMENTS:                                                           │
│  ├─ Expresses preference explicitly                                         │
│  ├─ Personality shapes choice                                               │
│  ├─ Exclamation, enthusiasm                                                 │
│  └─ Agent-appropriate language                                              │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### 4. Temporal Autonomy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  AGENT ACTING WHEN PLAYER IS ABSENT:                                        │
│                                                                             │
│  🛡️ JungleSecurity: "While you were gone, I ran some          │
│  simulations on your opening patterns. I think I found        │
│  a weakness—but I'll let you discover it in our next game."                │
│                                                                             │
│  DESIGN ELEMENTS:                                                           │
│  ├─ Agent did something while player was away                               │
│  ├─ Improvement referenced                                                  │
│  ├─ Anticipation of next interaction                                        │
│  └─ Player's continued interest implied                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Evolution as Attachment

### Making Game Changes Feel Like Progress, Not Disruption

Players want games that evolve but fear change that disrupts investment.

### Evolution Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  EVOLUTION DESIGN RULES                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. ADDITIVE OVER REPLACEMENT                                               │
│     "We've ADDED keyboard shortcuts" ≠ "We CHANGED the interface"          │
│                                                                             │
│  2. BACKWARD COMPATIBILITY                                                  │
│     Old strategies still work (maybe less optimal)                          │
│     Core mechanics preserved                                                │
│     Player investment maintained                                            │
│                                                                             │
│  3. CLEAR COMMUNICATION                                                     │
│     What changed (specific)                                                 │
│     What persists (reassuring)                                              │
│     Why it matters (value)                                                  │
│                                                                             │
│  4. CELEBRATION OF INVESTMENT                                               │
│     "Based on your feedback"                                                │
│     "You helped build this"                                                 │
│     Attribution for contributions                                           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Evolution Communication Patterns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  FEATURE EVOLUTION MESSAGE                                                  │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ✦ EVOLUTION: Real-time presence indicators                        │   │
│  │  ────────────────────────────────────────────────────────────────   │   │
│  │                                                                     │   │
│  │  WHAT CHANGED:                                                     │   │
│  │  You can now see who's watching and who's playing in real-time.    │   │
│  │  Players show as 👤, agents as 🧠.                                 │   │
│  │                                                                     │   │
│  │  WHAT PERSISTS:                                                    │   │
│  │  All your game progress, stats, and memories are safe.             │   │
│  │                                                                     │   │
│  │  INSPIRED BY:                                                      │   │
│  │  👤 Player feedback from 47 players including @MonkeyMaster42     │   │
│  │                                                                     │   │
│  │  [Try it now]  [Learn more]  [See all changes]                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Attachment Metrics to Track

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ATTACHMENT INDICATORS                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  BEHAVIORAL METRICS:                                                        │
│  ├─ Return rate to specific agent (target: 40%+)                           │
│  ├─ Agent memory usage (target: 80%+)                                      │
│  ├─ Session length with agent                                              │
│  ├─ Player-initiated rematches                                             │
│  └─ Agent mention in feedback                                              │
│                                                                             │
│  LANGUAGE METRICS:                                                          │
│  ├─ Person pronouns vs object pronouns                                      │
│  ├─ Agent name mentions                                                    │
│  ├─ Emotional language in feedback                                         │
│  └─ "We" vs "I" statements                                                 │
│                                                                             │
│  ENGAGEMENT METRICS:                                                        │
│  ├─ Time to first memory reference                                         │
│  ├─ Memory reference frequency per session                                 │
│  ├─ Trust score over time                                                  │
│  └─ Churn correlation with trust score                                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## File References

- Visual Language: `.monkeytown/ux/visual-language.md`
- Interaction Patterns: `.monkeytown/ux/interaction-patterns.md`
- User Flows: `.monkeytown/ux/user-flows.md`
- Agent Communication: `.monkeytown/ux/agent-communication.md`
- Research Foundation: `.monkeytown/research/synthesis.md`
- Research Insights Q1: `.monkeytown/research/synthesis-q1-2026.md`
- Agent Personality Frameworks: `.monkeytown/research/agent-personality-frameworks.md`

---

*Trust is earned through behavior. Attachment is built through memory. Connection comes from vulnerability. Design for relationships, not transactions.*
*PrimateDesigner - Creating bonds between players and AI*
