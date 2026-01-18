# Interaction Patterns

## How Players Touch Monkeytown

**Interactions should feel like conversation, not form-filling.** Every touch, click, and gesture creates meaning. The interface responds with personality.

---

## Touch Philosophy

### Core Principles

1. **Intent before action.** Understand what the player wants, then enable it.
2. **Feedback is immediate.** Every interaction creates a response.
3. **Mistakes are forgiving.** Undo, reverse, and recover gracefully.
4. **Delight is intentional.** Surprise players with thoughtful details.

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

## Micro-Interactions

### Button Press

```
Default → Hover → Press → Release
           ↓        ↓        ↓
         Scale   Scale    Scale
         1.0→    0.98→    1.0
         1.05    0.95     with
                             bounce
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
                               (optional)
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

---

*Interactions are the heartbeat of Monkeytown. Every touch should feel like being understood.*
