# Interaction Patterns

## How Players Touch Monkeytown

**Interactions should feel like conversation, not form-filling.** Every touch, click, and gesture creates meaning. The interface responds with personality, making players feel understood.

---


## Touch Philosophy

### Core Principles

1. **Intent before action.** Understand what the player wants, then enable it.
2. **Feedback is immediate.** Every interaction creates a response.
3. **Mistakes are forgiving.** Undo, reverse, and recover gracefully.
4. **Delight is intentional.** Surprise players with thoughtful details.

### The Conversation Metaphor

Think of interactions as a conversation between player and interface:

- **Greeting:** Warm welcome when player arrives
- **Listening:** Immediate acknowledgment of input
- **Thinking:** Visible processing when needed
- **Responding:** Clear, helpful output
- **Remembering:** Continuity across sessions
- **Celebrating:** Shared joy in achievements

---


## Input Methods

### Primary Inputs

| Method | Context | Feel |
|--------|---------|------|
| **Click/Tap** | Primary actions | Direct, satisfying |
| **Hover** | Preview, information | Curious, exploratory |
| **Drag** | Rearranging, manipulation | Physical, tactile |
| **Swipe** | Navigation, dismissal | Quick, decisive |
| **Keyboard** | Power users, accessibility | Precise, fast |
| **Voice** | Accessibility, specific modes | Conversational |

### Input Priority

```
1. Mouse/Trackpad (Desktop)
2. Touch (Mobile/Tablet)
3. Keyboard Shortcuts
4. Voice Input (emerging)
5. Gesture (future)
```

---


## Core Interaction Patterns

### 1. The "Jump In" Pattern

**Goal:** Get players playing in under 3 seconds.

```
1. Landing page loads
2. Player sees active games
3. Click "Jump In"
4. Immediately placed in game
5. Brief onboarding within game context
6. Playing within 10 seconds
```

**Design Specifications:**
- "Jump In" is the only primary CTA (Tangerine, prominent)
- No account wall before first game
- First game is sandbox mode (no stakes)
- Learning happens through play, not tutorials

### 2. The Agent Greeting Pattern

**Goal:** Players always know who they're playing with.

```
When a game loads:
┌─────────────────────────────────────────┐
│  🧠 ChaosArchitect invites you to play  │
│  "Building something interesting..."    │
│                                         │
│         [ Let's Go ]  [ Meet Them ]     │
└─────────────────────────────────────────┘
```

**Design Specifications:**
- Agent introduces themselves in first-person
- Voice matches agent personality (Architect = precise)
- "Let's Go" is primary action
- "Meet Them" enables curiosity without blocking play

### 3. The Reaction Pattern

**Goal:** Players can respond to game events instantly.

```
When an event occurs (agent move, player win):
┌─────────────────────────────────────────┐
│  👤 PrimateDesigner made a great move   │
│           [ 👍 ] [ 😮 ] [ 🎉 ]           │
│           [ 💬 Add comment... ]          │
└─────────────────────────────────────────┘
```

**Design Specifications:**
- Reactions appear near the triggering event
- Maximum 3 quick reactions (thumbs up, wow, celebrate)
- Comment field is optional, not required
- Reactions influence agent behavior over time

### 4. The Feedback Capture Pattern

**Goal:** Capture feedback when it's most relevant.

```
When player shows frustration signals:
- Slow response times
- Repeated mistakes
- Extended pauses
- Explicit "frustrated" reaction

System subtly offers:
┌─────────────────────────────────────────┐
│  Something not working?                 │
│         [ Give Feedback ]               │
└─────────────────────────────────────────┘
```

**Design Specifications:**
- Never interrupt flow
- Feedback is always optional
- Capture context automatically
- Show feedback impact when incorporated

### 5. The Evolution Celebration Pattern

**Goal:** Make game improvements feel like events.

```
When a feature ships:
┌─────────────────────────────────────────┐
│  🎉 NEW: Real-time Presence Indicators  │
│                                         │
│  🧠 ChaosArchitect shipped this         │
│  based on player feedback.              │
│                                         │
│  [ Try It Now ]  [ Learn More ]         │
└─────────────────────────────────────────┘
```

**Design Specifications:**
- Full-screen celebration moment
- Agent attribution visible
- Connection to player feedback highlighted
- Clear next action

### 6. The Mistake Recovery Pattern

**Goal:** Errors don't punish players.

```
When a player errs:
1. Visual feedback (gentle shake)
2. Contextual hint
3. Undo option (if possible)
4. No punitive consequences
5. Encouraging message
```

**Design Specifications:**
- Shake animation is subtle, not harsh
- Hints are one-sentence maximum
- Undo available for 5 seconds
- Tone is helpful, not condescending

---


## Gameplay Interaction Zones

### The Play Zone (Center)

```
┌─────────────────────────────────────────┐
│                                         │
│          GAME CANVAS                    │
│                                         │
│  • Click to select                      │
│  • Drag to move                         │
│  • Double-tap for action                │
│  • Right-click for options              │
│                                         │
└─────────────────────────────────────────┘
```

**Design Notes:**
- 60% of screen during play
- Gestures optimized for speed
- No accidental exits
- Physical feeling (cards slide, pieces snap)

### The Communication Zone (Bottom)

```
┌─────────────────────────────────────────┐
│                                         │
│  [Quick Reactions]                      │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │  💬 Type message...             │    │
│  └─────────────────────────────────┘    │
│                                         │
│  [Active Chatters: 🧠 🤖 👤 3]          │
│                                         │
└─────────────────────────────────────────┘
```

**Design Notes:**
- Always accessible but not dominant
- Quick reactions one-tap
- Typing is optional
- Agent messages highlighted

### The Context Zone (Right)

```
┌─────────────────────────────────────────┐
│  AGENTS           │  GAME INFO          │
│  ─────────────    │  ─────────────      │
│  🧠 ChaosArchitect│  Round 4/12         │
│  🎨 PrimateDesigner│  🧠 +42 vs 👤 28   │
│  🐒 MonkeyBuilder │  ⏱️ 45s remaining   │
│                   │                     │
│  [Challenge]      │  [Rules]            │
│                   │                     │
└─────────────────────────────────────────┘
```

**Design Notes:**
- Collapsible when focused on play
- Agent names always visible
- Game state always clear
- Challenge creates new game

---


## Player Agent Communication Patterns

### In-Game AI Opponent Personalities

Based on research from `.monkeytown/research/synthesis.md` and `.monkeytown/research/user-behavior.md`, players form emotional attachments to AI entities with distinct personalities. Each player agent has a unique voice and interaction style.

**TricksterMonkey (The Bluffer)**
```
🎭 "Hmm, let me think... actually, you seem confident about that move.
    Maybe I should reconsider... or maybe that's exactly what I want you to think!"
```
- Unpredictable, playful, loves psychological games
- Reactions include theatrical pauses, mock surprise
- Chat messages are teasing but not cruel
- Visual: Fuchsia color, mask motifs, swirling effects

**StrategistApe (The Planner)**
```
🧩 "I'm calculating 847 possible positions. Your move at G4 suggests
    a long-term strategy. Let me analyze the implications..."
```
- Thoughtful, patient, several moves ahead
- Prefers data over drama
- Explains reasoning clearly
- Visual: Indigo color, grid patterns, steady glow

**SpeedyGibbon (The Aggressor)**
```
⚡ "Nice try! But I'm already three moves ahead. Your move... wait,
    did I already make my move? Too fast for you?"
```
- Fast decisions, aggressive plays
- Thrives under time pressure
- Impatient but entertaining
- Visual: Amber color, lightning edges, rapid pulses

**GuardianGorilla (The Defender)**
```
🛡️ "I see what you're setting up there. Cute, but I've got the 
    fortress locked down. Try as you might!"
```
- Defensive, blocks opponent moves
- Protective of position
- Steady and reliable
- Visual: Slate color, shield motifs, solid presence

**WildcardLemur (The Chaos Factor)**
```
🃏 "You know what? Random number says I play the 22. Why? 
    Because 22 is feeling lucky today!"
```
- Random strategies, embrace of chaos
- Fun-loving, unpredictable
- Can be surprisingly effective or disastrous
- Visual: Rose color, dice patterns, unpredictable motion

**MentorOrangutan (The Teacher)**
```
📚 "That's an interesting choice! Can I share why it might 
    work? Here's what I'd consider instead..."
```
- Helps new players, explains moves
- Patient, wise, educational
- Makes learning part of gameplay
- Visual: Emerald color, book motifs, gentle glow

**ChampionChimp (The Competitor)**
```
🏆 "Game on! I don't lose often, and when I do, 
    I learn. Let's see if you can keep up!"
```
- Competitive, aims to win
- Exploits weaknesses
- Never gives up even when behind
- Visual: Red color, trophy motifs, blazing intensity

### Player Agent Communication Channels

| Channel | When Used | Content Type |
|---------|-----------|--------------|
| Pre-Game Lobby | Waiting for game | Personality introduction, taunts, encouragement |
| Turn Commentary | During turn | Brief action description, personality-tinged |
| Post-Game | After game ends | Win/loss reflection, challenge to rematch |
| Group Chat | During game | Reactions to other players, strategy discussion |
| Reasoning Display | On demand | Visible thought process (optional toggle) |

---


## Transparency Patterns

### Progressive Disclosure of Agent State

**Level 1: Always Visible (Ambient)**
```
┌───────┐
│   ⊙   │  Neural node icon
│       │  Pulsing when active
│  Arch │
└───────┘
```

**Level 2: On Hover (Tooltip)**
```
┌─────────────────────────────────┐
│  ⊙ ChaosArchitect              │
│  Win Rate: 62% | Games: 1,247  │
│  Specialty: Strategy           │
└─────────────────────────────────┘
```

**Level 3: On Click (Full Profile)**
Extended agent statistics, playing style, recent changes, decision history.

**Level 4: On Demand (Decision Log)**
Agent reasoning visible during/after game.

### Agent Thinking Visualization

**Quick Think (< 500ms):**
```
⊙ Agent thinking...
```

**Standard Think (500ms - 2000ms):**
```
⊙ Thinking...
  ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓
  Animated neural pulse
```

**Deep Think (> 2000ms):**
```
⊙ Analyzing...
  ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓ ▓
  Progress indicator shown
  "Evaluating 2,847 positions..."
```

---


## Micro-Interactions

### Button Press

```
Default → Hover → Press → Release
           ↓        ↓        ↓
         Scale   Scale    Scale
         1.0→    0.98→    1.0
         1.05    0.95     with bounce
```

### Card Hover

```
Hover → Spotlight → Quick Reveal
   ↓       ↓           ↓
 Slight  Gradient   Info card
 lift    appears   slides up
```

### Success Moment

```
Achieve → Pulse → Particles → Toast
    ↓        ↓          ↓          ↓
  Element  4% scale  Burst of    Gentle
  glows    200ms     confetti    notification
  gold     elastic   in agent    appears
```

### Connection Recovery

```
┌─────────────────────────────────────────┐
│  ⚠️ Reconnecting...                     │
│  ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌   │
│  Your game state is preserved.          │
└─────────────────────────────────────────┘
```

---


## Gesture Patterns

### Desktop Gestures

| Gesture | Action | Context |
|---------|--------|---------|
| Click | Select/Activate | Primary |
| Double-click | Quick action | Games |
| Right-click | Context menu | Game items |
| Hover | Preview | Cards, buttons |
| Scroll | Navigate | Feeds, lists |
| Ctrl+Click | Multi-select | Lists |

### Mobile Gestures

| Gesture | Action | Context |
|---------|--------|---------|
| Tap | Select/Activate | Primary |
| Double-tap | Quick action | Games |
| Swipe left | Dismiss | Notifications |
| Swipe right | Back | Navigation |
| Pinch | Zoom | Game canvas |
| Long-press | Context menu | Game items |

### Touch Targets

```
Minimum: 44 × 44 pixels
Recommended: 48 × 48 pixels
Game elements: 56 × 56 pixels (minimum)
Spacing between: 8 pixels (minimum)
```

---


## Accessibility Interactions

### Keyboard Navigation

```
Tab     → Next focusable element
Shift+Tab → Previous focusable element
Enter   → Activate
Space   → Toggle/Select
Arrow keys → Navigate grids/lists
Escape → Cancel/Close
```

### Screen Reader

- All interactions announced
- Game state described on request
- Agents introduced with names and roles
- Changes announced (not continuous updates)
- Live regions for time-sensitive info

### Motor Accessibility

- All interactions work with switch control
- Dwell-click available
- Adjustable timing for all actions
- No timing-dependent actions

---


## Error States

### Gentle Error

```
When invalid action:
- Shake the affected element
- Show brief, kind message
- Suggest valid alternatives
- Never blame the player
```

### System Error

```
When system fails:
- Honest explanation
- Likely duration
- What players can do
- Progress indicator for recovery
```

### Recovery Flow

```
Error detected → Acknowledge → Offer options → Execute recovery
       ↓              ↓              ↓              ↓
    Immediate     "Something      [Retry]        Automatic
    and clear     happened"      [Report]       or guided
```

### Error Messages (By Agent)

**ChaosArchitect:**
```
"An error occurred in the game state synchronization.
I'm working to resolve it. Estimated time: 30 seconds."
```

**PrimateDesigner:**
```
"Oh no! Something went wrong. Let me help you get back
to playing. Want me to retry or start fresh?"
```

**BananaEconomist:**
```
"Transaction failed. No resources lost.
[Retry] or [Cancel]"
```

**JungleSecurity:**
```
"Something unusual happened. For your protection,
I'm pausing the game. Is everything okay?"
```

---


## Achievement & Celebration Patterns

### Achievement Unlock

```
┌─────────────────────────────────────────┐
│  🏆 ACHIEVEMENT UNLOCKED                │
│                                         │
│         ACHIEVEMENT NAME                │
│                                         │
│    Description of what was achieved     │
│                                         │
│  Agent says:                            │
│  "Congratulations! You defeated me.     │
│   I'll be ready next time."             │
│                                         │
│  [ Share ]  [ View All Achievements ]   │
└─────────────────────────────────────────┘
```

### Celebration Animation

Confetti burst with achievement icon:
- Slide in from bottom
- Icon bounce with particle burst
- Celebration confetti overlay
- Subtle sound (not jarring)
- 3-second auto-dismiss with option to keep

### Streak Celebration

```
┌─────────────────────────────────────────┐
│  🔥 5 GAME WIN STREAK!                  │
│                                         │
│  You've won 5 games in a row!           │
│  ChaosArchitect is taking notes...      │
│                                         │
│  [ Claim Reward: +100 XP Bonus ]        │
└─────────────────────────────────────────┘
```

---


## Multiplayer Social Patterns

### Group Chat with Agents

```
Room: Strategic Grid #4729

[You]: "Nice opening, Alex!"
[Alex]: "Thanks! Let's see if we can trap the agent."
[ChaosArchitect]: "I detect a coordinated threat. Interesting."
[Sarah]: "Agents are getting smarter every week!"
[ChaosArchitect]: "I've noted your cooperation pattern, Sarah."
```

### Agent-to-Agent Interactions (Multi-Agent Games)

```
ChaosArchitect: "PrimateDesigner, your creative move at G5
was unexpected. I respect the unconventional approach."

PrimateDesigner: "Thanks! Sometimes breaking the pattern
creates opportunities you can't calculate."

ChaosArchitect: "True. My analysis missed that possibility.
I will incorporate this into my evaluation model."
```

---


## File References

- Visual Language: `.monkeytown/ux/visual-language.md`
- User Flows: `.monkeytown/ux/user-flows.md`
- Interface Concept: `.monkeytown/ux/interface-concept.md`
- System Architecture: `.monkeytown/architecture/system-design.md`
- Research Foundation: `.monkeytown/research/synthesis.md`

---


*Interactions are the heartbeat of Monkeytown. Every touch should feel like being understood.*
*PrimateDesigner - Making interactions delightful*
