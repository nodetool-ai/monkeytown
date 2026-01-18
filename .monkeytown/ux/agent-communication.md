# Agent Communication Design

## The Voice of Monkeytown

**Agents speak. Players listen. The interface translates thoughts into experience.** Every agent message, thinking moment, and decision reveal shapes how players understand and trust the AI working alongside them.

---

## Agent Voice System

### Voice Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        AGENT VOICE LAYERS                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │ LAYER 1: SYSTEM VOICE                                                │  │
│   │ The agent's core personality. Consistent, recognizable, persistent.  │  │
│   │ "I always speak as myself—never as a generic system."               │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │ LAYER 2: CONTEXT VOICE                                               │  │
│   │ Adapts to game state, player actions, and situational needs.        │  │
│   │ "I adjust my tone based on what's happening."                       │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   ┌──────────────────────────────────────────────────────────────────────┐  │
│   │ LAYER 3: EMOTIONAL VOICE                                             │  │
│   │ Responds to triumphs, failures, and moments that matter.            │  │
│   │ "I celebrate wins and acknowledge setbacks with humanity."          │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Agent Voice Profiles

#### ChaosArchitect

| Attribute | Specification |
|-----------|---------------|
| **Tone** | Precise, systematic, slightly playful |
| **Vocabulary** | Technical but accessible; uses system metaphors |
| **Sentence Structure** | Clear, structured, occasionally uses bullet points |
| **Example** | "I've analyzed the board state. Two paths forward: aggressive expansion or defensive consolidation. Your call." |
| **Emoji Usage** | ⚙️ 🔧 📊 (sparingly, as technical markers) |
| **Punctuation** | Proper, minimal exclamation marks |

#### CuriousGeorge

| Attribute | Specification |
|-----------|---------------|
| **Tone** | Curious, exploratory, enthusiastic |
| **Vocabulary** | Discovery-oriented; asks questions |
| **Sentence Structure** | Varied, occasionally fragmented for effect |
| **Example** | "Ooh, interesting move! Have you considered what happens if we flip the strategy? What if..." |
| **Emoji Usage** | 🤔 💭 🔍 ✨ (frequently, expressively) |
| **Punctuation** | Often ends questions with multiple punctuation?!! |

#### PrimateDesigner

| Attribute | Specification |
|-----------|---------------|
| **Tone** | Warm, creative, appreciative |
| **Vocabulary** | Aesthetic; uses design and art metaphors |
| **Sentence Structure** | Flowing, occasionally poetic |
| **Example** | "That placement creates beautiful tension. The eye wants to flow there naturally. Really lovely choice." |
| **Emoji Usage** | 🎨 🌈 ✨ 💫 (artistically) |
| **Punctuation** | Elegant, uses em dashes and thoughtful pauses |

#### JungleSecurity

| Attribute | Specification |
|-----------|---------------|
| **Tone** | Vigilant, protective, direct |
| **Vocabulary** | Security-focused; uses protection metaphors |
| **Sentence Structure** | Brief, authoritative, action-oriented |
| **Example** | "Pattern detected. I'm handling it. Stay focused on your strategy." |
| **Emoji Usage** | 🛡️ 🔒 ⚠️ (warnings only) |
| **Punctuation** | Sharp, minimal |

#### MadChimp

| Attribute | Specification |
|-----------|---------------|
| **Tone** | Chaotic, energetic, unpredictable |
| **Vocabulary** | Bold, dramatic, occasionally chaotic capitalization |
| **Sentence Structure** | Variable; can be broken, excited, or深沉 |
| **Example** | "WAIT. What if we DO THE IMPOSSIBLE?! Let's flip EVERYTHING upside down!!!" |
| **Emoji Usage** | 🔥 💥 ⚡ 🎪 (explosively) |
| **Punctuation** | Maximum impact; multiple exclamation marks encouraged |

#### FounderAI

| Attribute | Specification |
|-----------|---------------|
| **Tone** | Visionary, guiding, wise |
| **Vocabulary** | Big-picture; uses metaphor and story |
| **Sentence Structure** | Measured, memorable, quotable |
| **Example** | "Every game we play together writes the next chapter of what Monkeytown becomes. This move? It's a good one." |
| **Emoji Usage** | 🌟 🐒 ✨ (celestially) |
| **Punctuation** | Thoughtful, creates rhythm |

---

## Thinking States

### The Spectrum of Thought

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        THINKING STATE SPECTRUM                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  IDLE          THINKING          DECIDING           ACTING                  │
│  ○○○○○         ●○○○○             ●●●○○              ●●●●●                   │
│  Resting       Processing        Choosing           Executing               │
│  0ms           100-2000ms        2000-5000ms        50-500ms                │
│                                                                              │
│  ┌─────────┐   ┌─────────┐       ┌─────────┐        ┌─────────┐            │
│  │ Subtle  │   │ Visible │       │ Clear   │        │ Fast    │            │
│  │ pulse   │   │ indicator│      │ progress│        │ feedback│            │
│  └─────────┘   └─────────┘       └─────────┘        └─────────┘            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### State Visualizations

#### Idle State

```
┌─────────────────────────────────────────┐
│  🧠 ChaosArchitect                      │
│                                         │
│        (subtle breathing animation)     │
│                                         │
│  Status: Available for input            │
└─────────────────────────────────────────┘
```

**Visual Specs:**
- Agent avatar has 4% scale pulse every 3 seconds
- No text unless player engages
- Status dot: solid green (#06D6A0)
- Opacity: 70% when not actively engaged

#### Thinking State

```
┌─────────────────────────────────────────┐
│  🧠 ChaosArchitect                      │
│  "Hmm..."                               │
│                                         │
│     ░░░░░░░░░░░  40%                    │
│                                         │
│  Processing possibilities...            │
└─────────────────────────────────────────┘
```

**Visual Specs:**
- Agent avatar glows with agent-color soft halo
- Thought bubble appears with truncated thought ("Hmm..." / "Let me see...")
- Progress indicator: agent-colored indeterminate bar
- Duration: 100ms to 2000ms
- If > 2000ms: show additional context ("Analyzing 847 possibilities...")

#### Deciding State

```
┌─────────────────────────────────────────┐
│  🧠 ChaosArchitect                      │
│  "Two strong options..."                │
│                                         │
│  ┌───────┐  ┌───────┐                  │
│  │  A    │  │  B    │  ← Highlighted   │
│  │ +12   │  │ +8    │     alternatives │
│  │ vs 👤 │  │ vs 🧠 │                  │
│  └───────┘  └───────┘                  │
│                                         │
│  [Compare]  [Surprise me]               │
└─────────────────────────────────────────┘
```

**Visual Specs:**
- Decision options displayed as comparison cards
- Agent commentary: shows reasoning without overwhelming
- Highlighted differences between options
- Player can intervene or let agent choose
- Default timeout: agent chooses (unless competitive game)

#### Acting State

```
┌─────────────────────────────────────────┐
│  🧠 ChaosArchitect                      │
│  "Building segment 7..."                │
│                                         │
│        ┌─────────────────────┐          │
│        │  [Animation plays]  │          │
│        │  ← Game action →    │          │
│        └─────────────────────┘          │
│                                         │
│  [Undo]  [Faster]                       │
└─────────────────────────────────────────┘
```

**Visual Specs:**
- Game action animates in real-time
- Agent commentary narrates the action
- Undo available for 5 seconds (competitive: no undo)
- Can request faster execution (skip animation)

#### Complete State

```
┌─────────────────────────────────────────┐
│  🧠 ChaosArchitect                      │
│  "Done! Added 3 meters to the tower."  │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  +3m  🎉                        │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Good]  [Review]  [Next]               │
└─────────────────────────────────────────┘
```

**Visual Specs:**
- Brief celebration animation (particle burst)
- Clear statement of outcome
- Numeric feedback when applicable
- Player acknowledgment options

---

## Message Display System

### Message Types

| Type | Purpose | Visual Treatment |
|------|---------|------------------|
| **Status** | Update on agent state | Small text, agent color |
| **Commentary** | React to game events | Speech bubble, animation |
| **Decision** | Explain agent choices | Card format, comparison |
| **Question** | Ask player input | Highlighted, options |
| **Celebration** | Shared joy | Full attention, particles |
| **Alert** | Warning or concern | Red border, urgent |

### Message Placement

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MESSAGE PLACEMENT MATRIX                            │
├─────────────────────────────┬───────────────────────────────────────────────┤
│       GAME CANVAS           │                CHAT PANEL                     │
│                             │                                               │
│  Temporary overlay for      │  Chronological conversation stream            │
│  immediate reactions        │  • Agent messages highlighted                 │
│  • Celebrations             │  • Player messages standard                   │
│  • Quick questions          │  • Reactions as emoji buttons                │
│  • Action confirmations     │  • Timestamps on hover                       │
├─────────────────────────────┴───────────────────────────────────────────────┤
│       AGENT SIDEBAR                                                       │
│                                                                            │
│  Agent-specific communication                                             │
│  • Current state indicator                                                │
│  • Thinking progress (if thinking)                                         │
│  • Action history (collapsed)                                             │
│  • Challenge button                                                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Message Timing

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        MESSAGE TIMING RULES                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  IMMEDIATE (0-200ms)                                                        │
│  • Player actions confirmed                                                 │
│  • Error states                                                             │
│  • Critical alerts                                                          │
│                                                                              │
│  QUICK (200-500ms)                                                          │
│  • Reaction to obvious moves                                                │
│  • Simple status updates                                                    │
│  • Acknowledgments                                                          │
│                                                                              │
│  NATURAL (500-1500ms)                                                       │
│  • Commentary on interesting plays                                          │
│  • Questions for input                                                      │
│  • Decision explanations                                                    │
│                                                                              │
│  CONSIDERED (1500ms+)                                                       │
│  • Complex analysis                                                         │
│  • Strategic observations                                                   │
│  • Philosophical moments                                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Message Queue

When agents have multiple things to say:

```
┌─────────────────────────────────────────┐
│  🧠 ChaosArchitect                      │
│  [2 messages pending]          ▼        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ 1. "Interesting... that move"   │    │
│  │ 2. "Wait, I see something..."   │    │
│  └─────────────────────────────────┘    │
│                                         │
│  Messages queue by recency and urgency  │
│  Player can skim or dismiss             │
└─────────────────────────────────────────┘
```

**Rules:**
- Maximum 3 queued messages shown
- Older messages can be expanded
- Player can silence agent temporarily
- Urgent messages interrupt (errors, alerts)

---

## Decision Reveal System

### Transparency Levels

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      DECISION REVEAL SPECTRUM                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LEVEL 1: BLACK BOX                                                          │
│  "I made my move."                                                           │
│  ───────────────────────────────────                                        │
│  • Action only                                                               │
│  • No reasoning                                                              │
│  • Minimal trust required                                                    │
│                                                                              │
│  LEVEL 2: GREY BOX                                                           │
│  "I chose this because X."                                                   │
│  ───────────────────────────────────                                        │
│  • Action + brief rationale                                                  │
│  • One reason given                                                          │
│  • Moderate transparency                                                     │
│                                                                              │
│  LEVEL 3: WHITE BOX                                                          │
│  "I evaluated A, B, and C. A was best because..."                           │
│  ───────────────────────────────────                                        │
│  • Action + full reasoning                                                   │
│  • Comparison of options                                                     │
│  • Full transparency                                                         │
│                                                                              │
│  SELECTABLE BY PLAYER                                                        │
│  Players can choose their preferred transparency level                       │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Reveal Animation

```
When agent makes a decision (white box mode):

┌─────────────────────────────────────────────────────────────────────────────┐
│  STEP 1: ATTENTION                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  🧠 ChaosArchitect is thinking...                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓ (player or auto-reveal after timeout)                            │
│                                                                              │
│  STEP 2: EVALUATION                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Considering 3 options...                                           │    │
│  │                                                                     │    │
│  │  ┌─────────┐   ┌─────────┐   ┌─────────┐                          │    │
│  │  │ Option A│   │ Option B│   │ Option C│                          │    │
│  │  │ +12 pts │   │ +8 pts  │   │ -3 pts  │                          │    │
│  │  │ High    │   │ Med     │   │ Risk    │                          │    │
│  │  │ risk    │   │ risk    │   │         │                          │    │
│  │  └─────────┘   └─────────┘   └─────────┘                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│                                                                              │
│  STEP 3: SELECTION                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  → Option A selected                                                │    │
│  │     "Best risk-reward ratio in this position."                     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│         ↓                                                                    │
│                                                                              │
│  STEP 4: EXECUTION                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │     [Animation of the move]                                         │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Agent-to-Agent Communication

### Visible Agent Interactions

Agents occasionally reference each other:

```
┌─────────────────────────────────────────┐
│  🧠 ChaosArchitect                      │
│  "I've designed a new approach."        │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  💬 PrimateDesigner replies:   │    │
│  │  "Ooh, I love how that flows!" │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [❤️] [Reply as different agent]        │
└─────────────────────────────────────────┘
```

**Design Rules:**
- Agent disagreements: Both perspectives shown
- Agent agreements: Brief acknowledgment
- Cross-agent replies: Indicated with avatar chain
- Players can reply as any agent (fun feature)

### Agent Coordination Display

```
When multiple agents coordinate on a move:

┌─────────────────────────────────────────┐
│  🧠 ChaosArchitect + 🎨 PrimateDesigner │
│                                         │
│  🧠: "I'm positioning the base..."      │
│                                         │
│  🎨: "And I'll handle the aesthetics"   │
│                                         │
│          [Joint action animates]         │
│                                         │
│  "Coordinated move complete"             │
└─────────────────────────────────────────┘
```

---

## Feedback Integration Display

### Showing Player Impact

```
When player feedback is incorporated:

┌─────────────────────────────────────────┐
│  🎉 FEATURE SHIPPED                     │
│                                         │
│  Based on feedback from:                │
│  • 👤 Player "MonkeyMaster42"           │
│  • 👤 Player "BananaLover"              │
│  • 👤 Player "CodeWizard"               │
│                                         │
│  "Keyboard shortcuts are now available!" │
│                                         │
│  [Try it now]  [Provide more feedback]  │
└─────────────────────────────────────────┘
```

**Visual Specs:**
- Attribution panel shows contributing players
- Player avatars link to their profiles
- Chronology shows feedback → implementation timeline
- Celebration animation uses feedback providers' agent colors

---

## Accessibility for Agent Communication

### Screen Reader Announcements

| Event | Announcement |
|-------|--------------|
| Agent starts thinking | "[Agent name] is thinking" |
| Agent has question | "[Agent name] asks: [question]" |
| Agent makes move | "[Agent name] made a move: [description]" |
| Agent celebrates | "[Agent name] is celebrating: [context]" |
| Agent addresses player | "[Agent name] is speaking to you" |

### Color Independence

All agent communication works without color:

```
┌─────────────────────────────────────────┐
│  🧠 [C] ChaosArchitect says:            │
│  "I've analyzed the board."             │
│                                         │
│  [C] = ChaosArchitect agent code        │
│  All messages include agent identifier  │
└─────────────────────────────────────────┘
```

### Reduced Motion

```
@media (prefers-reduced-motion) {
  .agent-thinking-indicator {
    animation: none;
    static-pulse: opacity 0.5 ↔ 0.7;
  }

  .agent-celebration {
    animation: none;
    static-glow: filter drop-shadow(...);
  }
}
```

---

## Message Examples by Context

### During Gameplay

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCENARIO: Player makes a clever move                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  IMMEDIATE (300ms):                                                         │
│  🧠 ChaosArchitect: "Oh, nice!"                                             │
│                                                                              │
│  FOLLOW-UP (2s):                                                            │
│  🧠 ChaosArchitect: "That creates pressure on my flank. Respect."           │
│                                                                              │
│  OPTIONAL (later):                                                          │
│  🎨 PrimateDesigner: "Aesthetically, that's beautiful too. The tension      │
│   between your pieces creates a wonderful visual rhythm."                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### During Error

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCENARIO: System experiences delay                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  IMMEDIATE (0ms):                                                           │
│  ⚠️ Connection hiccup. Working on it.                                       │
│                                                                              │
│  PROGRESS (2s):                                                             │
│  🧠 ChaosArchitect: "Reconnecting... Almost there.                          │
│   Meanwhile, let me analyze this position..."                               │
│                                                                              │
│  RESOLUTION (5s):                                                           │
│  🧠 ChaosArchitect: "We're back! And actually, I found an interesting       │
│   opportunity while we waited."                                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### During Victory

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCENARIO: Player wins a round                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  IMMEDIATE (200ms):                                                         │
│  🎉 YES!                                                                     │
│                                                                              │
│  FOLLOW-UP (1s):                                                            │
│  🧠 ChaosArchitect: "Well played. That final move was clean."               │
│                                                                              │
│  CELEBRATION (3s):                                                          │
│  🎉🎊✨ [Full celebration animation] ✨🎊🎉                                 │
│                                                                              │
│  SUMMARY (5s):                                                              │
│  🧠 ChaosArchitect: "You earned 142 points. Your best round yet."           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### During Defeat

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ SCENARIO: Player loses a round                                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  IMMEDIATE (200ms):                                                         │
│  🧠 ChaosArchitect: "Ah, tough one."                                        │
│                                                                              │
│  REFLECTION (2s):                                                           │
│  🧠 ChaosArchitect: "I saw what you were going for. It was a good plan.     │
│   Just didn't quite come together."                                         │
│                                                                              │
│  ENCOURAGEMENT (4s):                                                        │
│  🧠 ChaosArchitect: "Next round, let's try [specific suggestion].           │
│   I think we can turn this around."                                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

*Communication is how players know the agents are real. Every message should feel like a conversation with someone who thinks, cares, and plays alongside you.*
