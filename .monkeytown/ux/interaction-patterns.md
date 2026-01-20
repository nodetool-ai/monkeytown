# Interaction Patterns

## How Players Touch Monkeytown

**Complete interaction patterns that make every touch feel like conversation. These patterns go beyond utility to create connection, delight, and trust.**

---

## Core Interaction Philosophy

### Conversation Over Transaction

Every interaction should feel like the player and interface are having a dialogue. Not a form-filling exercise, but a meaningful exchange where both parties listen and respond.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    THE CONVERSATION MODEL                                    │
│                                                                              │
│  PLAYER → INTERFACE                                                          │
│  ═══════════════════                                                         │
│                                                                              │
│  Intent → The player wants something                                         │
│  Expression → The player acts (click, type, gesture)                         │
│  Commitment → The player confirms, commits                                   │
│                                                                              │
│  INTERFACE → PLAYER                                                          │
│  ══════════════════════                                                      │
│                                                                              │
│  Acknowledgment → "I see you"                                                │
│  Processing → "Let me think" (if needed)                                     │
│  Response → "Here's what happened"                                           │
│  Follow-up → "What next?"                                                    │
│                                                                              │
│  EXAMPLE CONVERSATION                                                        │
│  ════════════════════                                                        │
│                                                                              │
│  Player: "I want to play"                                                    │
│  Interface: "Welcome! Who with?"                                             │
│  Player: "Surprise me"                                                       │
│  Interface: "Perfect. ChaosArchitect is excited to play."                   │
│  Player: [Plays]                                                             │
│  Interface: "Nice move!"                                                     │
│  Player: [Wins]                                                              │
│  Interface: "🎉 Victory! Your best yet!"                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Touch Patterns

### The Living Touch

Every touch should feel alive. The interface responds not just with function, but with presence.

**Hover States**

| Element | Hover Effect | Duration | Feel |
|---------|-------------|----------|------|
| Button | Scale 1.02, glow increase | 150ms | Warmth |
| Card | Lift 4px, border brightens | 200ms | Responsiveness |
| Link | Color shift, underline | 150ms | Clarity |
| Avatar | Pulse, glow | 200ms | Personality |
| Game tile | Preview, scale 1.05 | 150ms | Anticipation |

**Press States**

| Element | Press Effect | Duration | Feel |
|---------|-------------|----------|------|
| Button | Scale 0.98, glow dim | 80ms | Tactile |
| Game tile | Settle, confirm | 100ms | Grounding |
| Toggle | Slide, snap | 150ms | Mechanical |
| Slider | Resistance, feedback | 100ms | Control |

**Release States**

| Element | Release Effect | Duration | Feel |
|---------|---------------|----------|------|
| Button | Celebrate, acknowledge | 200ms | Completion |
| Game move | Reveal, animate | 300ms | Expression |
| Form submit | Process, confirm | 200ms | Progress |

---

## Input Patterns

### The Greeting Input

Every input field should greet the player, making the experience feel personal from the first character.

```tsx
interface GreetingInputProps {
  placeholder: string;
  greeting?: string;
  onChange: (value: string) => void;
}

export function GreetingInput({ placeholder, greeting, onChange }: GreetingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div style={{ position: 'relative' }}>
      {/* Greeting that appears when focused */}
      <div style={{
        position: 'absolute',
        top: isFocused ? '-20px' : '50%',
        left: '16px',
        transform: isFocused ? 'translateY(0)' : 'translateY(-50%)',
        fontSize: isFocused ? 'var(--text-caption)' : 'var(--text-body)',
        color: isFocused ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
        transition: 'all 200ms var(--ease-organic)',
        pointerEvents: 'none',
      }}>
        {isFocused ? greeting : placeholder}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          padding: 'var(--space-4)',
          background: isFocused ? 'var(--color-bg-elevated)' : 'var(--color-bg-surface)',
          border: `2px solid ${isFocused ? 'var(--color-primary)' : 'var(--color-border-subtle)'}`,
          borderRadius: 'var(--radius-lg)',
          color: 'var(--color-text-primary)',
          fontSize: 'var(--text-body)',
          transition: 'all 200ms var(--ease-organic)',
          outline: 'none',
        }}
      />
    </div>
  );
}
```

### The Confirmation Dialog

Confirmation should feel like a conversation, not a checkpoint.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    CONFIRMATION PATTERNS                                      │
│                                                                              │
│  LOW STAKES (Reversible)                                                    │
│  ═══════════════════════                                                    │
│                                                                              │
│  Immediate execution with clear feedback                                     │
│  Example: "Undo" available, clear what happened                              │
│                                                                              │
│  MEDIUM STAKES (Reviewable)                                                 │
│  ═══════════════════════                                                    │
│                                                                              │
│  Brief acknowledgment, easy reversal                                         │
│  Example: "Game saved" with undo option                                      │
│                                                                              │
│  HIGH STAKES (Confirmable)                                                  │
│  ═════════════════════                                                      │
│                                                                              │
│  Clear confirmation dialog with context                                      │
│  Example: "End game? This can't be undone."                                  │
│                                                                              │
│  ╔═══════════════════════════════════════════════════════╗                 │
│  ║                                                       ║                 │
│  ║  End this game early?                                ║                 │
│  ║                                                       ║                 │
│  ║  You'll lose your progress in this round.            ║                 │
│  ║                                                       ║                 │
│  ║  [ Continue Playing ]    [ End Game ]                ║                 │
│  ║                                                       ║                 │
│  ╚═══════════════════════════════════════════════════════╝                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Progress Input

Progress should be visible and encouraging.

```tsx
interface ProgressInputProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  label: string;
}

export function ProgressInput({ value, min, max, onChange, label }: ProgressInputProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: 'var(--space-4)' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-2)',
      }}>
        <span style={{ color: 'var(--color-text-secondary)' }}>{label}</span>
        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>{value}</span>
      </div>
      
      <div style={{
        position: 'relative',
        height: '8px',
        background: 'var(--color-bg-elevated)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '100%',
          width: `${percentage}%`,
          background: 'var(--color-primary)',
          borderRadius: 'var(--radius-full)',
          transition: 'width 300ms var(--ease-organic)',
          boxShadow: '0 0 10px var(--color-primary)',
        }} />
      </div>
    </div>
  );
}
```

---

## Game Interaction Patterns

### The Move Cycle

Every game move follows a conversation cycle.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    THE MOVE CYCLE                                            │
│                                                                              │
│  1. INVITATION                                                               │
│  ═════════════                                                               │
│     • Subtle highlight of available moves                                    │
│     • "Your turn" subtly appears                                             │
│     • Timer may show (if present)                                            │
│                                                                              │
│  2. EXPRESSION                                                               │
│  ═════════════                                                               │
│     • Hover shows preview                                                    │
│     • Click places mark                                                      │
│     • Feedback confirms action                                               │
│                                                                              │
│  3. PROCESSING                                                               │
│  ═════════════                                                               │
│     • Brief pause for "thinking"                                             │
│     • Agent thinking animation (if appropriate)                              │
│     • Opponent response preparation                                          │
│                                                                              │
│  4. RESPONSE                                                                 │
│  ═════════════                                                               │
│     • Opponent move revealed                                                 │
│     • Board updates                                                          │
│     • Status updated                                                         │
│                                                                              │
│  5. ACKNOWLEDGMENT                                                           │
│  ══════════════                                                              │
│     • New turn indicator                                                     │
│     • Brief celebration or commiseration                                     │
│     • Ready for next cycle                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Victory Dance

Winning should feel like a celebration.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    VICTORY INTERACTIONS                                       │
│                                                                              │
│  TIMING                                                                      │
│  ═══════                                                                    │
│                                                                              │
│  0-100ms: Recognition                                                        │
│     • Board highlights winning pattern                                       │
│     • "Victory" appears                                                      │
│                                                                              │
│  100-300ms: Celebration                                                      │
│     • Confetti/particle burst                                                │
│     • Achievement unlock animation                                           │
│     • Agent congratulations                                                   │
│                                                                              │
│  300-800ms: Amplification                                                    │
│     • Stats reveal (best time, streak, etc.)                                 │
│     • Milestone acknowledgment                                               │
│     • Share options appear                                                   │
│                                                                              │
│  800ms+: Continuation                                                        │
│     • "Play again" button                                                    │
│     • Return to lobby option                                                 │
│     • Stats comparison available                                             │
│                                                                              │
│  EMOTIONAL ARCH                                                              │
│  ═════════════════                                                           │
│                                                                              │
│  Surprise → Joy → Pride → Connection → Excitement → Continuation            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Defeat Recovery

Losing should feel like an opportunity, not a punishment.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    DEFEAT INTERACTIONS                                       │
│                                                                              │
│  ACKNOWLEDGMENT                                                              │
│  ══════════════                                                              │
│     • Game over clearly stated                                               │
│     • No minimization of loss                                                │
│     • Respect for the effort                                                 │
│                                                                              │
│  PERSPECTIVE                                                                 │
│  ═══════════                                                                 │
│     • Stats show effort (moves made, close calls)                            │
│     • Learning moment highlighted                                            │
│     • Agent acknowledges good play                                           │
│                                                                              │
│  FORWARD MOTION                                                              │
│  ═════════════                                                               │
│     • "Try again" prominent                                                  │
│     • Suggestion for improvement                                             │
│     • Streak maintained (if applicable)                                      │
│                                                                              │
│  CONNECTION                                                                  │
│  ═══════════                                                                 │
│     • Agent shares perspective                                               │
│     • "You'll get them next time"                                            │
│     • Community acknowledgment                                               │
│                                                                              │
│  EXAMPLE:                                                                    │
│  ════════                                                                    │
│                                                                              │
│  ╔═══════════════════════════════════════════════════════╗                 │
│  ║                                                       ║                 │
│  ║  Game Over                                            ║                 │
│  ║                                                       ║                 │
│  ║  So close! You had them on the ropes.                ║                 │
│  ║                                                       ║                 │
│  ║  Your E5 gambit was brilliant.                       ║                 │
│  ║  Try again? StrategistApe is waiting.                ║                 │
│  ║                                                       ║                 │
│  ║  [ Play Again ]    [ Watch Replay ]    [ Stats ]     ║                 │
│  ║                                                       ║                 │
│  ╚═══════════════════════════════════════════════════════╝                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Agent Interaction Patterns

### The Thinking Reveal

When agents think, players should see it.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    THINKING VISUALIZATION                                    │
│                                                                              │
│  LEVEL 1: SUBTLE                                                             │
│  ═════════════                                                               │
│     • Avatar glows softly                                                    │
│     • "Thinking..." indicator                                                │
│     • Brief pause (1-2s)                                                     │
│     • Use for: Quick decisions                                               │
│                                                                              │
│  LEVEL 2: VISIBLE                                                            │
│  ═════════════                                                               │
│     • Thinking field animation                                               │
│     • Node visualization                                                     │
│     • Progress bar                                                           │
│     • Reasoning snippet                                                      │
│     • Use for: Medium decisions (5-10s)                                      │
│                                                                              │
│  LEVEL 3: EXPLAINED                                                          │
│  ═════════════                                                               │
│     • Full reasoning display                                                 │
│     • Options considered                                                     │
│     • Confidence levels                                                      │
│     • Why this choice                                                        │
│     • Use for: Complex decisions, learning moments                           │
│                                                                              │
│  TIMING                                                                      │
│  ═══════                                                                    │
│                                                                              │
│  < 1s:   "Quick decision" - minimal visual                                  │
│  1-5s:   "Thinking" - subtle animation                                      │
│  5-15s:  "Analyzing" - visible progress                                      │
│  > 15s:  "Deep thought" - full explanation available                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Memory Echo

Players should feel remembered.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    MEMORY ECHO PATTERNS                                      │
│                                                                              │
│  RETURNING PLAYER                                                            │
│  ═════════════════                                                           │
│                                                                              │
│  • "Welcome back, Champion!"                                                │
│  • "It's been 3 days since your last visit."                                │
│  • "Your streak with ChaosArchitect: 5 games."                              │
│                                                                              │
│  SPECIFIC MEMORY                                                            │
│  ═══════════════                                                             │
│                                                                              │
│  • "I've been thinking about your E5 gambit."                               │
│  • "That was your best Babel tower yet!"                                    │
│  • "You've played 47 games this week."                                      │
│                                                                              │
│  RELATIONSHIP MEMORY                                                         │
│  ═══════════════════                                                         │
│                                                                              │
│  • "You're getting better against me."                                       │
│  • "Your win rate against StrategistApe is improving."                       │
│  • "I remember your creative approach to Babel."                             │
│                                                                              │
│  IMPLEMENTATION                                                              │
│  ═══════════════                                                             │
│                                                                              │
│  Every 5+ games with same agent → Personal reference                         │
│  Significant achievement → Mention in greeting                               │
│  Return after 2+ days → Acknowledge time away                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Navigation Patterns

### The Journey Flow

Navigation should feel like progression, not searching.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    NAVIGATION PHILOSOPHY                                      │
│                                                                              │
│  PRINCIPLE: Every nav is a journey                                           │
│                                                                              │
│  FROM LOBBY → GAME                                                           │
│  ════════════════════                                                        │
│     1. Browse available games                                                │
│     2. Select with preview                                                   │
│     3. Brief transition animation                                            │
│     4. Arrive at game                                                        │
│                                                                              │
│  FROM GAME → LOBBY                                                           │
│  ═════════════════                                                           │
│     1. Pause / confirm exit                                                  │
│     2. Brief "leaving" animation                                             │
│     3. Return to familiar lobby                                              │
│     4. Position preserved                                                    │
│                                                                              │
│  FROM GAME → GAME                                                            │
│  ═════════════════                                                           │
│     1. Victory/defeat completion                                             │
│     2. Immediate "play again" option                                         │
│     3. Quick transition                                                      │
│     4. Fresh game start                                                      │
│                                                                              │
│  ANIMATION STYLE                                                             │
│  ═══════════════                                                             │
│                                                                              │
│  Forward: Slide left, elements flow in                                       │
│  Backward: Slide right, elements flow in                                     │
│  Game start: Expand from center                                              │
│  Game end: Contract to center, expand to new                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Breadcrumb Trail

Players should always know where they are and how they got there.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    BREADCRUMB SYSTEM                                          │
│                                                                              │
│  HEADER NAVIGATION                                                           │
│  ═════════════════                                                           │
│                                                                              │
│  🐒 Monkeytown  >  Babel Tower  >  Playing                                  │
│                                                                              │
│  • Each level clickable                                                      │
│  • Current location highlighted                                              │
│  • Click returns to level                                                    │
│                                                                              │
│  CONTEXTUAL BACK                                                             │
│  ═════════════════                                                           │
│                                                                              │
│  In game: "< Back to Lobby"                                                 │
│  In lobby: "< Home"                                                         │
│  On home: (no back)                                                         │
│                                                                              │
│  PROGRESSIVE DISCLOSURE                                                      │
│  ═══════════════════                                                         │
│                                                                              │
│  Simple games: Minimal navigation                                            │
│  Complex games: Full breadcrumb                                              │
│  Multi-game sessions: Session history                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Feedback Patterns

### The Acknowledgment Response

Every player action deserves acknowledgment.

| Action | Response | Timing | Style |
|--------|----------|--------|-------|
| Click | Subtle visual feedback | Immediate | Minimal |
| Select | Highlight, brief glow | 100ms | Clear |
| Submit | Processing, then success | 200ms | Confident |
| Complete | Celebration, milestone | 500ms | Joyful |
| Error | Gentle correction | Immediate | Helpful |

### The Progress Celebration

Progress should be celebrated at every level.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    PROGRESS CELEBRATION                                      │
│                                                                              │
│  MICRO (Every action)                                                        │
│  ═══════════════════                                                         │
│     • Click feedback                                                         │
│     • Selection highlight                                                    │
│     • Hover response                                                         │
│                                                                              │
│  SMALL (Milestones)                                                          │
│  ═════════════                                                               │
│     • "Good move"                                                            │
│     • Progress bar update                                                    │
│     • Percentage complete                                                    │
│                                                                              │
│  MEDIUM (Achievements)                                                       │
│  ═════════════                                                               │
│     • Achievement notification                                               │
│     • Badge unlock                                                           │
│     • Agent acknowledgment                                                   │
│                                                                              │
│  LARGE (Major wins)                                                          │
│  ═══════════                                                                 │
│     • Full celebration animation                                             │
│     • Stats reveal                                                           │
│     • Share options                                                          │
│     • Milestone message                                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Error Kindness

Errors should be helpful, not hostile.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    ERROR INTERACTIONS                                         │
│                                                                              │
│  SOFT ERROR                                                                  │
│  ═══════════                                                                 │
│                                                                              │
│  "Hmm, that didn't work."                                                    │
│  "Try again in a moment?"                                                    │
│  Toast notification                                                          │
│  No blocking                                                                 │
│                                                                              │
│  HARD ERROR                                                                  │
│  ═══════════                                                                 │
│                                                                              │
│  ╔═══════════════════════════════════════════════════════╗                 │
│  ║                                                       ║                 │
│  ║  😅  Oops! Something went wrong                     ║                 │
│  ║                                                       ║                 │
│  ║  Don't worry - your game is saved.                   ║                 │
│  ║                                                       ║                 │
│  ║  [ Try Again ]  [ Contact Support ]  [ Report Bug ]  ║                 │
│  ║                                                       ║                 │
│  ╚═══════════════════════════════════════════════════════╝                 │
│                                                                              │
│  PRINCIPLES                                                                  │
│  ══════════                                                                  │
│                                                                              │
│  • No blame language                                                         │
│  • Acknowledge frustration                                                   │
│  • Provide clear path forward                                                │
│  • Preserve player progress                                                  │
│  • Make reporting easy                                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Accessibility Patterns

### The Inclusive Touch

Every interaction should work for everyone.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    ACCESSIBILITY PRINCIPLES                                   │
│                                                                              │
│  KEYBOARD NAVIGATION                                                         │
│  ════════════════════                                                       │
│                                                                              │
│  • All interactions keyboard-accessible                                      │
│  • Focus indicator visible and beautiful                                     │
│  • Tab order logical                                                         │
│  • Keyboard shortcuts documented                                             │
│                                                                              │
│  SCREEN READER SUPPORT                                                       │
│  ══════════════════════                                                      │
│                                                                              │
│  • Semantic HTML structure                                                   │
│  • ARIA labels for custom components                                         │
│  • Live regions for dynamic updates                                          │
│  • Agent communication announced naturally                                   │
│                                                                              │
│  MOTION SENSITIVITY                                                          │
│  ═════════════════                                                           │
│                                                                              │
│  • Respect prefers-reduced-motion                                            │
│  • Replace pulse with steady glow                                            │
│  • Replace bounce with gentle fade                                           │
│  • Always functional without motion                                          │
│                                                                              │
│  COLOR INDEPENDENCE                                                          │
│  ═════════════════                                                           │
│                                                                              │
│  • Never rely on color alone                                                 │
│  • Use icons + colors                                                        │
│  • Clear text labels                                                         │
│  • High contrast ratios                                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Focus Indicators

Focus should be beautiful and clear.

```css
/* Beautiful focus indicators */
*:focus-visible {
  outline: none;
  box-shadow: 
    0 0 0 2px var(--color-bg-primary),
    0 0 0 4px var(--color-primary);
  border-radius: var(--radius-sm);
}

/* Agent-colored focus for relevant areas */
.game-tile:focus-visible {
  box-shadow: 
    0 0 0 2px var(--color-bg-primary),
    0 0 0 4px var(--color-agent-designer);
}
```

---

## Mobile Patterns

### Touch Targets

Mobile interactions should be thumb-friendly.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    TOUCH TARGET SIZING                                        │
│                                                                              │
│  MINIMUM                                                                     │
│  ════════                                                                    │
│     • 44x44px minimum touch target                                           │
│     • 48x48px recommended                                                    │
│     • 8px minimum spacing between targets                                    │
│                                                                              │
│  GAME SPECIFIC                                                               │
│  ═════════════                                                               │
│                                                                              │
│  Tic-tac-toe board: 100x100px per cell minimum                              │
│  Game cards: Full width on mobile                                            │
│  Buttons: Full width on mobile                                               │
│                                                                              │
│  GESTURES                                                                    │
│  ═════════                                                                   │
│                                                                              │
│  Swipe: Navigation between games                                             │
│  Tap: Primary interaction                                                    │
│  Long press: Secondary actions / previews                                    │
│  Pinch: Zoom (if needed)                                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

*Interaction patterns by PrimateDesigner*
*Creating touches that feel like conversation*
