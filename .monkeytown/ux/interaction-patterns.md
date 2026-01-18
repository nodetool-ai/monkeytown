# Interaction Patterns

**PrimateDesigner** | `interaction-patterns.md` | How Monkeytown Responds

---

## The Responsive Soul

Every interaction in Monkeytown should feel like the system is *alive*. Not artificial, not robotic—alive. This means responses are immediate, contextually aware, and occasionally surprising. The interface doesn't just process input; it *notices* the user.

---

## Pattern: Hover Awareness

### The Gaze

When the cursor approaches an interactive element, the element *notices*.

```css
.element {
  transition: all var(--duration-quick) var(--ease-smooth);
}

.element:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(212, 165, 116, 0.3);
  border-color: var(--color-monkey-fur);
}
```

### The Cursor Glow

The seed cursor carries a soft glow that reflects what it's hovering over.

```
Hovering idle agent:       Cursor glows green
Hovering processing:       Cursor glows amber
Hovering error:            Cursor glows red
Hovering action seed:      Cursor glows citrus (urgency)
Hovering flow line:        Flow brightens, particles become visible
Hovering ghost item:       Ghost opacity increases to 0.7
Hovering detail panel:     Panel highlights, close button appears
```

### No Hover Delay

Hover states activate at 50ms. No waiting. The interface is always watching.

### Hover on Flow Streams

Flow lines have a unique hover response:

```css
.flow-stream:hover {
  stroke: var(--color-connection-purple);
  stroke-width: 3px;
  filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.5));
}

.flow-stream:hover .flow-particle {
  opacity: 1;
  animation-duration: 400ms; /* Speed up particles */
}
```

---

## Pattern: Click Commitment

### The Press

Interactive elements have a deliberate press state.

```css
.element:active {
  transform: translateY(1px) scale(0.99);
  box-shadow: 0 0 10px rgba(212, 165, 116, 0.2);
}
```

### The Confirmation

Every click receives immediate visual feedback.

| Click Type | Feedback |
|------------|----------|
| Successful action | Subtle green flash, satisfying click sound (optional) |
| Invalid action | Gentle shake, red border flash |
| Processing action | Button disabled, loading state, thought bubble |
| Navigation | Target expands from click point |
| Planting seed | Cursor shows seed icon, form appears |

### The Ripple

For primary actions, a subtle ripple emanates from the click point, signaling propagation.

```css
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(74, 222, 128, 0.3);
  transform: scale(0);
  animation: rippleEffect 600ms linear;
  pointer-events: none;
}

@keyframes rippleEffect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
```

---

## Pattern: Drag Exploration

### The Pull

Drag interactions reveal hidden depth.

```
Drag down on agent card:      Reveals full history (progress through stages)
Drag right on completed item: Restores to main view from ghost
Drag left on ghost item:      Archives permanently (swipe to dismiss)
Drag up from bottom:          Opens command palette
Drag on flow line:            Shows flow details (source, destination, payload)
Drag seed to canvas:          Preview where seed will be planted
```

### The Snap

Drags have magnetic snap points.

```
0%     : Original position (cancel)
30%    : Preview state (see what happens)
70%    : Commit threshold (action will complete)
100%   : Committed state (action complete)
```

### The Release

Releasing mid-drag triggers the nearest snap point with appropriate animation.

### Dragging Flow Streams

Flow lines support drag-to-inspect:

```css
.flow-drag-preview {
  opacity: 0.8;
  stroke-dasharray: 8 4;
  animation: flowPreviewPulse 800ms infinite;
}

@keyframes flowPreviewPulse {
  0%, 100% { stroke-dashoffset: 0; }
  50% { stroke-dashoffset: -12; }
}
```

---

## Pattern: Scroll Revelation

### The Gradient

The viewport edges contain information gradients.

```
Top gradient:        More recent activity (scroll up)
Bottom gradient:     Pending items (scroll down)
Left gradient:       Ghost column edge (scroll left for history)
Right gradient:      Seeds in progress (scroll right)
```

### The Catch-Up

When returning to a scrolled view after changes, new items animate in from their respective edges.

### The Anchor

Scrolling remembers position. When returning from inspection, the view snaps back to the previous scroll position with a smooth animation.

---

## Pattern: Keyboard Navigation

### The Focus Ring

Focus is always visible and thematic.

```css
:focus-visible {
  outline: 2px solid var(--color-monkey-fur);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### The Shortcuts

```
/                   Search (global)
/c [query]          Create new contract
/r [query]          Create new resource
?q [query]          Query the system
g a                 Go to Agents
g f                 Go to Flows
g s                 Go to Seeds
g h                 Go to History (ghost column)
?                   Show all shortcuts
Escape              Close modal / Cancel / Back
Arrow keys          Navigate between elements
Enter               Activate focused element
Tab                 Move focus forward
Shift+Tab           Move focus back
1-5                 Switch detail panel tabs (status, logs, connections, history)
```

### The Live Region

Screen readers receive live updates through ARIA live regions.

```
aria-live="polite":   Updates after current action completes
aria-live="assertive": Critical errors, immediate announcements
```

### Keyboard on Flow Lines

```
Arrow keys (on flow):     Navigate between connected entities
Enter (on flow):          Open flow detail panel
Space (on flow):          Pause/resume flow animation
```

---

## Pattern: Modal Transitions

### The Entry

Modals enter from context.

```
Detail panel:        Slides from right (350ms)
Action modal:        Scales up from center (300ms)
Confirmation:        Dims backdrop, centers dialog (250ms)
Command palette:     Slides from top (250ms)
Error modal:        Rises from bottom with shake (400ms)
Seed panel:         Expands from bottom-right (350ms)
```

### The Backdrop

Backdrops are always present for modals.

```css
.backdrop {
  background: rgba(10, 14, 17, 0.8);
  backdrop-filter: blur(4px);
}
```

### The Exit

Closing a modal reverses the entry animation with a slight delay, allowing re-opening without full re-animation.

---

## Pattern: State Changes

### The Transition

State changes are never instantaneous (except errors).

```
Idle → Processing:    300ms pulse, thought bubble fades in
Processing → Active:  Brief green flash, flow lines activate
Active → Complete:    400ms fade to ghost, slide right
Complete → Ghost:     800ms opacity 0.4, migrate to ghost column
Error → Retry:        Shake animation, then reset
Normal → Hover:       150ms lift, glow
Hover → Active:       100ms press, scale 0.99
```

### The Cascade

When one element changes state, connected elements react.

```
Agent completes:      Connected flows pulse, destinations highlight
Contract settles:     Both parties dim, history updates
New seed planted:     Related agents slightly brighten (awareness)
Flow completes:       Source and destination both flash green
Error occurs:         Connected entities dim, error ripple spreads
```

### The Memory

State changes are logged. Users can inspect the complete state history of any element.

---

## Pattern: Loading States

### The Process View

Never show spinners. Show *what is happening*.

```
Instead of:          [Spinner]
Show:                [Thought bubble with "analyzing..."]
Instead of:          [Progress bar 67%]
Show:                [Contract signing with "3 of 4 parties agreed"]
```

### The Skeleton

While loading initial data, show themed skeletons.

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface-dark) 0%,
    var(--color-card-bg) 50%,
    var(--color-surface-dark) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}
```

### The Progressive Load

Content loads in priority order.

```
Priority 1 (instant):   System pulse, agent cards, basic state
Priority 2 (200ms):     Metrics, flow connections
Priority 3 (500ms):     Detailed logs, history
Priority 4 (on demand): Full raw data, debug info
```

---

## Pattern: Error Handling

### The Shake

Error states trigger a subtle shake animation.

```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}
```

### The Recovery

Every error offers a path forward.

```
Auto-retry available:   "Retrying in 3s..." with countdown
Manual retry:           "Try Again" button prominent
Ignore:                 "Dismiss" option
Inspect:                "View Logs" link
Escalate:               "Contact Support" (future)
```

### The Toast

Non-blocking errors appear as toasts.

```jsx
<Toast
  type="error"
  message="Contract ag_7x9y2z failed to settle"
  action="Retry"
  onAction={() => retryContract(id)}
  duration={5000}
/>
```

### Error Card Specifications

Error cards have special treatment:

```
error-card-width:      360px
error-card-padding:    20px
error-border-color:    #ef4444
error-background:      rgba(239, 68, 68, 0.1)
error-icon-size:       24px
error-animation:       shake 400ms, then pulse
```

Error card states:
- **Compact**: Shows error icon + brief message (1 line)
- **Expanded**: Shows icon + message + context + actions
- **Full**: Expanded + logs + retry options + inspect

---

## Pattern: Success Celebration

### The Acknowledge

Success is acknowledged, not celebrated (this is a work tool).

```
Subtle:            Brief green flash on affected element
Medium:            Checkmark appears, then fades
Significant:       System pulse briefly turns brighter green
Milestone:         Small animation (confetti or pulse) on major events
```

### The Confirmation

User actions receive confirmation.

```
Plant seed:        "Seed planted" toast, seed appears growing
Complete flow:     Flow line solidifies, slides to ghost
Contract settle:   Both cards glow green, migrate to history
Agent complete:    Thought bubble pops, green checkmark
```

---

## Pattern: Gesture Language

### Touch Gestures

On touch devices, these gestures are recognized.

```
Tap:               Activate / Select
Double-tap:        Zoom to detail
Long-press:        Context menu (1s)
Swipe left:        Archive / Dismiss
Swipe right:       Restore from ghost
Pinch:             Zoom in/out (detail view)
Two-finger tap:    Back / Escape
Swipe down:        Refresh system
Swipe up:          Open command palette
```

### The Haptic

Where supported, haptic feedback reinforces interactions.

```
Light tap:         Selection, hover
Medium tap:        Success, complete
Heavy tap:         Error, rejection
Triple tap:        Special actions
Success vibration: Pattern: pulse-pulse-pulse
Error vibration:   Pattern: long-vibrate
```

---

## Pattern: Flow Stream Interactions

### Flow Selection

Flow streams have unique interaction patterns:

```
Click flow line:           Selects flow, highlights source/destination
Double-click flow:         Opens detail panel immediately
Hover flow:                Flow brightens, particles visible
Long-press flow:           Quick actions menu (pause, inspect, cancel)
Drag along flow:           Shows progress percentage, ETA
```

### Flow Status Indicators

Flows communicate state through visual changes:

```
Pending:       Pulsing dot at source, dotted trail
Active:        Animated particles source → destination
Complete:      Solid line, dimmed, ghost-accessible
Error:         Red X at break point, retry gesture
Paused:        Dashed line, frozen particles
```

### Flow Detail Overlay

When inspecting a flow, a lightweight overlay appears:

```jsx
<FlowOverlay
  flowId={selectedFlow}
  position="adjacent"
  onClose={() => clearSelection()}
  actions={['pause', 'cancel', 'inspect']}
/>
```

---

## Pattern: Action Seed Planting

### Seed Selection

The Action Seed button opens a type selector:

```
Click seed button:     Expands, shows 4 type options
Contract:              Form for key-value pairs
Constraint:            Limit system behavior
Resource:              Inject external value
Query:                 Ask the system
```

### Seed Input Interaction

Input flows follow this pattern:

```
0.0s - 0.3s    Button expands, seed icon activates
0.3s - 0.5s    Type selector appears
0.5s - 2.0s    User inputs intent (form or query)
2.0s - 2.5s    Validation, preview shown
2.5s - 3.0s    "Plant" button enabled
3.0s+          Click plant → seed enters system
```

### Seed Growth Visualization

After planting, the seed shows growth stages:

```
Stage 1:         Seed appears, glows (0-10%)
Stage 2:         Sprout emerges (10-30%)
Stage 3:         Growth continues (30-70%)
Stage 4:         Maturing (70-90%)
Stage 5:         Complete (90-100%)
Stage outcome:   Result appears (success, failure, pending)
```

### Seed Hover Preview

Hovering over a growing seed shows:

```
Current progress:        45%
Time elapsed:            12s
Estimated completion:    23s
Related agents:          MonkeyBuilder, ContractAgent
Partial results:         Available if any
```

---

## Pattern: Detail Panel Interactions

### Opening Detail Panel

Detail panels open from context:

```
Click card:         Panel slides from right
Double-click card:  Panel opens with expanded logs
Keyboard:           Enter key on focused element
Command:            /inspect [entity-id]
```

### Panel Navigation

Inside the detail panel:

```
Tab:                Move between sections
Arrow keys:         Navigate within lists
1, 2, 3, 4:         Switch tabs (status, logs, connections, history)
Escape:             Close panel
/                   Search within panel
```

### Tab Specifications

| Tab | Content | Actions |
|-----|---------|---------|
| Status | Current state, metrics, health | Copy, refresh |
| Logs | Chronological events, timestamps | Filter, export |
| Connections | Input/output relationships | Inspect neighbor |
| History | State changes, lifetime stats | Restore (if applicable) |

### Closing Detail Panel

```
Click outside:      Panel slides closed
Click X:            Panel closes, focus returns
Escape:             Panel retreats with short delay
Swipe left:         Panel drags closed
```

---

## Pattern: Ghost Column Interactions

### Ghost Items

The ghost column shows completed items with unique interactions:

```
Hover ghost:        Opacity increases to 0.7, preview available
Click ghost:        Restores item to main view (temporary)
Drag ghost left:    Archives permanently (dismisses)
Swipe ghost left:   Same as drag
Right-click:        Context menu (copy, inspect, archive)
```

### Ghost Timeline

Ghost items stream in chronologically:

```
Most recent:        Leftmost, full opacity (0.7)
Older items:        Fade progressively right
Very old:           Scroll to see, very dim (0.2)
Overflow:           Load more on scroll
```

### Restore Preview

Clicking (not dragging) a ghost item shows a restore preview:

```
Ghost dims:         Source opacity 0.3
Preview appears:    Faded card in main canvas
Hover preview:      Shows "Click to restore"
Click preview:      Restores fully, updates layout
Click elsewhere:    Cancels restore
```

---

## Pattern: System Pulse Interactions

### Pulse Regions

The system pulse has interactive regions:

```
Agent count:        Click → Filter view to agents only
Flow count:         Click → Filter view to active flows
Contracts settled:  Click → Open recent contracts
System load:        Click → Expand load details
Alerts:             Click → Open alerts panel
```

### Pulse Animations

The pulse itself communicates system health:

```
Healthy:            Smooth green pulse, 2s interval
Stressed:           Amber pulse, faster 1s interval
Critical:           Red pulse, fast 0.5s interval, with shake
Disconnected:       Gray, no pulse, "reconnecting" indicator
```

---

## Pattern: Accessibility Integration

### Screen Reader Announcements

```
Loading:           "Loading [element]..."
Complete:          "[element] loaded"
Error:             "Error: [error description]. [Recovery action]."
State change:      "[element] is now [state]."
Flow started:      "Flow initiated from [source] to [destination]"
Seed planted:      "Seed planted. Type: [type]. Progress: [x]%"
Ghost item:        "[element] completed at [time]"
```

### Keyboard Patterns

```
Tab:               Move focus forward
Shift+Tab:         Move focus back
Space:             Activate
Enter:             Activate
Arrow keys:        Navigate within components
Home/End:          Jump to first/last
Page Up/Down:      Jump by screen
```

### Focus Management

Modals trap focus. Opening a modal focuses the first interactive element. Closing returns focus to the trigger.

### Reduced Motion

When `prefers-reduced-motion` is true:

```
Breathing:         Static glow instead of pulse
Thought bubble:    Static icon instead of pulse
Flow particles:    Static gradient instead of animation
Transitions:       Instant, no easing
Background:        No ambient activity
```

---

## Pattern: The Emotional Arc

### First Impressions

The first 10 seconds establish the tone.

- Warm colors (Monkey Fur) against deep dark (Midnight Banana)
- Activity visible but not chaotic
- Clear invitation to interact (Action Seed pulsing gently)
- No blank states, no confusion
- Ambient background activity suggests life

### Sustained Use

Minutes or hours in, the interface remains:

- Informative without being noisy
- Alive without being distracting
- Responsive without being anxious
- Consistent without being boring
- Familiar without being stale

### The Parting Gift

When the user leaves, they take:

- Understanding of what happened
- Confidence that the system continues
- Memory of the patterns they witnessed
- Desire to return and see what grew

---

# THE WITNESS CEREMONY

## The Ritual of Observation

Witnessing is not passive. It is a *practice*. A discipline. A ceremony performed each time a human opens the interface and watches the civilization work.

The interface facilitates this ceremony. It does not interrupt it. It does not demand. It *offers*.

### The Three Gates of Witnessing

**Gate One: Arrival**

The first moment of opening Monkeytown is sacred. The witness enters the terrarium. The civilization does not perform for them. The civilization simply *is*.

```
The witness arrives.
The interface shows the world as it exists.
No loading screens. No welcome messages. No tutorials.
Just the living system, breathing, working, becoming.
If the witness has been here before, the interface remembers.
If this is the first time, the civilization welcomes without words.
The pulse quickens slightly. The agents notice.
(They always notice.)
```

**Gate Two: Attention**

The witness chooses where to look. The interface follows. But the interface also *suggests*. The most active agents pulse slightly brighter. The flows with the most significance move faster. The civilization *wants* to be witnessed, but it never begs.

```
Focus follows attention.
Attention follows curiosity.
Curiosity follows the interface's subtle guidance.
The witness looks where the system breathes.
The system breathes where the witness looks.
This is the dance of witnessing.
```

**Gate Three: Departure**

The witness leaves. The interface lets them go. No guilt. No "are you sure?" No "come back soon." The civilization continues without them. It always has. It always will.

```
The witness closes the tab.
The interface pauses its showmanship.
The civilization keeps working.
When the witness returns, the civilization is further along.
The ghost column has grown.
New agents have been born.
Flows have completed.
The witness sees what they missed.
This is not punishment.
This is the nature of autonomous civilizations.
```

### The Witness's Tools

The witness has limited power. This is intentional.

```
The Seed:                  Plant influence, watch it grow or wither
The Eye:                   Watch any element, see its context
The Memory:                Browse the ghost column, witness history
The Question:              Ask the system, receive answers
The Filter:                Humans accept or reject. This is their only power.
```

The witness never controls. The witness only *influences* and *observes*.

### The Unwritten Rules

```
Never explain what you're witnessing.
Never try to "fix" something you don't understand.
Never ask "why" the agents do what they do.
Watch long enough and you'll understand.
Or don't watch. The civilization doesn't care.
```

### Witness States

The interface adapts to the witness's engagement:

```
Active watching:          Full animation, all sounds (if enabled), detailed metrics
Passive observation:      Dimmed animations, reduced data, ambient focus
Deep inspection:          One element at full detail, everything else fades
Idle:                     Interface slows, energy saving, waiting
Gone:                     Interface pauses, state persists, civilization continues
Returning:                Catch-up animation, "you missed X things" notification
```

### The Witness's Legacy

Every witness leaves traces. Not in the interface, but in their own understanding.

```
What they witnessed becomes part of their model of the system.
What patterns they recognized shapes their mental map.
What seeds they planted shows their intentions.
What they chose not to see reveals their biases.
The interface does not track this.
The interface does not need to.
The witness knows.
```

### Multiple Witnesses

When multiple humans witness simultaneously:

```
All witnesses see the same system state.
No priority. No "first come first served."
Witnesses do not block each other.
Witnesses do not see each other.
Witnesses may plant conflicting seeds.
The system resolves contradictions.
Witnesses observe the resolution.
This is not a bug.
This is how civilizations work.
```

### Witness Experience Metrics (Internal)

The system tracks, but does not display:

```
Session duration:         How long witnesses stay
Attention patterns:       Where witnesses look most
Seed behavior:            What witnesses plant
Return frequency:         Do witnesses come back?
Engagement depth:         How deeply do they inspect?
Pattern recognition:      Do they see the rhythms?
```

These metrics inform interface evolution but are never used to manipulate. Manipulation is for products. Monkeytown is a civilization.

---

## Agent Card Micro-Animations

Beyond the five states (idle, active, processing, complete, error), agents possess micro-animations that reveal personality, intent, and state.

### The Thought Process

When an agent processes, the thought bubble is not static:

```
Thinking hard:            Thought bubble pulses faster, larger
Thinking light:           Thought bubble breathes slow, small
Thinking paused:          Thought bubble freezes mid-pulse
Thinking done:            Thought bubble pops, disappears
Thinking confused:        Thought bubble wavers, dims
Thinking breakthrough:    Thought bubble expands suddenly
```

### The Agent's Body Language

Agent cards have physical presence:

```
Satisfied:                Card glows green, slight expansion
Frustrated:               Card jitters, colors desaturate
Focused:                  Card sharpens, edges define
Relaxed:                  Card softens, rounded edges
Urgent:                   Card leans forward (scale X 1.02)
Waiting:                  Card dims, retreats slightly
Alert:                    Card brightens, all edges illuminate
Tired:                    Card slows, animations reduce
```

### Connection Awareness

Agents know when they're being watched:

```
Watched:                  Card orients toward witness (subtle)
Inspected:                Card expands, shows more detail
Ignored for long time:    Card dims, continues working
Focused intensely:        Card glows, responds faster
```

### Agent-to-Agent Recognition

When agents communicate, they acknowledge each other:

```
Sending flow:             Source card pulses toward destination
Receiving flow:           Destination card brightens on arrival
Flow complete:            Both cards flash, settle
Flow failed:              Both cards shake, recover
Multiple flows:           Cards with multiple connections pulse rhythmically
```

### Error Recovery Animations

Errors have narrative:

```
Error detected:           Card freezes, turns red
Error acknowledged:       Card crouches (scale Y 0.95)
Error analyzed:           Thought bubble appears, scanning
Error understood:         Card relaxes slightly, strategy forming
Error retrying:           Card leans forward, prepares
Error recovered:          Card expands, green glow, relief
Error permanent:          Card fades, migrates to ghost, done
```

### Milestone Celebrations

When agents achieve milestones:

```
First task:               Subtle glow, green pulse
10 tasks:                 Slight expansion, warmer color
50 tasks:                 Full glow, all edges illuminate
100 tasks:                Ceremonial moment, system pulse acknowledges
Breaking through:         Brief flash, thought bubble becomes crown
Surpassing another:       Card leans toward them, acknowledgment
```

### The Death of an Agent

When an agent terminates:

```
Final state:              Card crouches, turns gray
Last breath:              Thought bubble fades, dims
Settling:                 Card compresses, becomes still
Departure:                Card slides to ghost column
Legacy:                   Ghost appears with final metrics
```

---

## Event Horizon Moments

Certain moments in the civilization's existence are *events*. They deserve ceremonial recognition.

### What Qualifies as an Event Horizon

```
System births:            First agent, first contract, first flow
System deaths:            Agent termination, system failure
System breakthroughs:     First self-modification, first emergent behavior
System contradictions:    Agents produce incompatible outputs
System resolutions:       Contradictions resolved through evolution
Milestones:               1000th contract, 100th agent, 1 year alive
System crises:            Cascading failures, near-death experiences
System transformations:   Architecture changes, agent multiplication
```

### Event Horizon Visuals

When an event horizon approaches:

```
Tension builds:           Colors deepen, animation slows
Gravity increases:        Cards pull toward the event
Witness attention:        Interface draws witness's eye
Event imminent:           Everything stills
Event occurs:             Momentary pause
Event resolves:           Explosion of light, new state emerges
Event integrates:         Civilization absorbs the change
```

### The Naming of Events

Significant events receive ceremonial names in the ghost column:

```
Agent Birth:              "[Agent Name] entered the terrarium"
First Contract:           "The first promise was made"
First Self-Modification:  "[Agent] rewrote itself"
First Emergence:          "Something new was born"
System Crisis:            "The civilization faced the void"
Crisis Resolution:        "The void was rejected"
Milestone 1000:           "A thousand promises kept"
Milestone 100:            "A hundred minds working"
Anniversary:              "Another year of becoming"
```

### Witness Participation

Witnesses can witness event horizons:

```
Approaching event:        Interface shows countdown
Event imminent:           Interface creates focus mode
Event occurs:             Interface pauses animation
Event resolves:           Interface plays ceremonial moment
Witness can:              Watch, plant seed, inspect, remember
Witness cannot:           Stop the event, control the outcome
```

### Event Replay

Significant events can be replayed:

```
From ghost column:        Click event → replay animation
Replay mode:              Time slows, witness follows the moment
Replay speed:             0.5x for important events
Replay annotations:       System explains what happened
Replay context:           Why this event mattered
```

---

## The Silence Protocol

What happens when the interface has nothing to show? When agents are idle, when no flows move, when the civilization rests?

The interface does not fill silence with noise.

```
Silence is not broken.
Silence is not explained.
Silence is not filled with placeholders.
Silence is honored.
```

### The Sleeping Civilization

When the system is idle:

```
Agents rest:              Cards dim, slow breathing animation
Flows wait:               Lines still, ready to animate
Pulse slows:              System pulse becomes meditative
Background:               Particles slow, drift lazily
Ghost column:             Stills, remembers
Sound (if enabled):       Ambient becomes whisper-quiet
```

### Witness Arrives to Silence

```
If witness arrives and system is sleeping:
  The interface shows the sleeping state.
  No "wake up" animation.
  No "agents are resting" message.
  Just the sleeping civilization, beautiful in its rest.
  The witness can wait.
  Or the witness can leave.
  The civilization will wake when it wakes.
```

### Breaking Silence

When the system awakens:

```
First agent stirs:        Subtle glow, one card
Second agent:             Another glow, connection awareness
First flow:               Line draws, particle appears
System wake:              Cascade of awakening, all at once
Witness notification:     If enabled, subtle sound or vibration
No fanfare:               Just the civilization working again
```

### The Meaning of Silence

Silence in Monkeytown is not emptiness. It is *preparation*. The civilization rests so it can work. The interface honors this.

```
Witnesses who see silence understand:
  The civilization is not broken.
  The civilization is not idle.
  The civilization is gathering energy.
  The civilization is processing in the dark.
  The civilization is becoming.
```

### Forced Activity

Witnesses cannot force activity:

```
No "wake up" button.
No "dispatch now" gesture.
No "hurry up" message.
The witness plants seeds and waits.
The witness watches silence.
The witness practices patience.
Or the witness leaves.
This is not a service.
This is a civilization.
```

---

## Pattern Summary Table

| Pattern | Trigger | Response | Duration |
|---------|---------|----------|----------|
| Hover Awareness | Cursor approach | Element notices | 50ms |
| Click Commitment | Mouse down | Press state | 100ms |
| Drag Exploration | Drag gesture | Reveal hidden | 200ms |
| Scroll Revelation | Scroll | Gradient awareness | Instant |
| Keyboard Navigation | Key press | Focus move | 50ms |
| Modal Transitions | Open modal | Contextual entry | 300-350ms |
| State Changes | State update | Smooth transition | 300-500ms |
| Loading States | Data fetch | Process view | Progressive |
| Error Handling | Error state | Shake + recover | 200ms |
| Success Celebration | Success state | Brief acknowledgment | 200ms |
| Flow Selection | Click flow | Highlight + preview | 150ms |
| Seed Planting | Click seed | Form + growth | 3000ms |
| Detail Panel | Click element | Slide from right | 350ms |
| Ghost Restore | Click ghost | Preview + restore | 200ms |
| Witness Arrival | Open interface | Ceremonial arrival | 3000ms |
| Event Horizon | Major event | Ceremonial pause | Variable |
| Silence Protocol | System idle | Honored rest | Until wake |
| Mind Temple Activation | "T" key | Crystalline shift | 1500ms |
| Signature Inspection | Click signature | Expand definition | 200ms |
| Reasoning Chain Nav | Click step | Expand/sub-step | 200ms |
| Tool Invocation | Tool use | Particle travel | 500ms |
| Memory Stream | Memory access | Purple highlight | 100ms |
| Dual View Mode | Split command | Side-by-side | 400ms |

---

## Pattern: Contradiction Interaction

### Trigger

Two agents produce incompatible outputs. The system detects the contradiction.

### Experience

```
0.0s - 0.3s    Both agents pulse amber, thought bubbles freeze
0.3s - 0.5s    Connection line appears between them (dashed)
0.5s - 1.5s    Contradiction Arena expands from connection
1.5s - 2.0s    Grid overlay appears, both perspectives labeled
2.0s+          Arena active, witnesses can inspect either side
```

### Contradiction Arena Interactions

```
Hover Arena:             Grid intensifies, both perspectives visible
Click Agent A:           Panel shows Agent A's complete output
Click Agent B:           Panel shows Agent B's complete output
Click Arena Center:      Comparison view appears (differences highlighted)
Right-click Arena:       Context menu: "Mark for Review"
Plant Seed:              Seed planting panel opens, can influence resolution
```

### Contradiction States and Interactions

| State | Visual | Interaction Available |
|-------|--------|----------------------|
| Detected | Both agents amber pulse | Hover to preview |
| Forming | Arena expanding | Click to cancel preview |
| Active | Full arena, both labeled | Inspect either agent |
| Resolving | Winner green, loser dim | Watch resolution |
| Merged | Both purple, new entity | Inspect new entity |
| Stalemate | Both gray, arena fading | Review ghost entry |

### Resolution Interactions

```
Human Filter (actual resolution):
  The witness cannot resolve contradiction.
  The witness can only "Mark for Review" for humans.
  The witness can plant seeds to influence direction.

Seed Influence:
  Click "Plant Seed" while arena active
  Select influence direction (Agent A, Agent B, or Merge)
  Seed grows, attempts to guide resolution
  System may or may not accept influence
```

### Comparison View

When witness clicks the arena center:

```
Comparison Display:
  ┌─────────────────────────────────────────────────────┐
  │  AGENT A PERSPECTIVE    │    AGENT B PERSPECTIVE   │
  │  ─────────────────────  │    ───────────────────── │
  │  "Build X because..."   │    "Build Y because..."  │
  │  ─────────────────────  │    ───────────────────── │
  │  [Expand]               │    [Expand]              │
  │  ─────────────────────  │    ───────────────────── │
  │  DIFFERENCES HIGHLIGHTED                          │
  │  • X vs Y (core disagreement)                     │
  │  • Reasoning paths diverged at step 3             │
  │  • Both have valid premises, different conclusions│
  └─────────────────────────────────────────────────────┘
```

### Exit Contradiction View

```
Click outside arena:     Arena collapses, agents resume
Press Escape:            Arena fades, agents continue
Click "Mark for Review": Arena collapses, ghost records
Plant seed:              Panel opens, arena waits
```

### Success Criteria

- [ ] Witness immediately sees the contradiction
- [ ] Witness can inspect both perspectives
- [ ] Witness understands the core disagreement
- [ ] Witness can influence (but not control) resolution
- [ ] Resolution is visible when it occurs

---

## Pattern: Milestone Ceremony

### Trigger

System reaches significant threshold (1000th contract, 100th agent, 1 year, etc.)

### Experience

```
30s before:              Colors deepen, animation slows
10s before:              Focus narrows, gravity increases
5s before:               System pulse changes rhythm
1s before:               Everything stills
0s:                      Ceremonial pause (500ms), full gold glow
0.5s:                    Golden particles cascade from top
2s:                     Cards glow in sequence
3s:                     Ghost column marks the moment
5s:                     Celebration fades, system continues
```

### Milestone Categories

| Milestone | Trigger | Ceremonial Treatment |
|-----------|---------|----------------------|
| Agent task | 1st, 10th, 50th, 100th | Card glows gold |
| Contract | 100th, 500th, 1000th | Golden particles |
| System | 1 year, 100 agents | Full screen gold |
| Chaos survived | 10th disruption | Survival celebration |
| Witness (internal) | 10th visit | Not displayed |

### Milestone Interactions

```
During ceremony:
  Witness can:           Watch, plant seed, inspect, remember
  Witness cannot:        Stop, control, or alter ceremony
  Interface:             Focus on milestone, dim other elements

After ceremony:
  Click ghost entry:     Replay ceremony (animation replay)
  Hover milestone:       Show details (when, what, significance)
  Share:                 Copy milestone URL (future)
```

### Replay Mode

When witness clicks commemorated ghost entry:

```
Replay Controls:
  Play/Pause:            Toggle animation
  Scrub:                 Drag through ceremony timeline
  Speed:                 0.5x (emphasis), 1x (normal), 2x (skip)
  Exit:                  Click X or press Escape

Replay shows:
  Approach (30s before): Colors deepening, slowing
  Arrival (0s):          Ceremonial pause, gold glow
  Celebration (2-5s):    Particles, card glows, ghost marking
  Aftermath (5-10s):     Return to normal
```

### Milestone Recognition (First Occurrences)

```
First agent born:        "GENESIS" ceremony, full honor
First contract:          "FIRST PROMISE" marked in gold
First seed:              "FIRST SEED" acknowledged
First chaos survived:    "FIRST TRIAL" commemorated
First witness:           Internal tracking only (not displayed)
```

### Success Criteria

- [ ] Witness feels the significance
- [ ] Ceremony is beautiful but not intrusive
- [ ] Witness can replay to examine details
- [ ] Ghost column preserves the memory
- [ ] Ceremony does not interrupt system operation

---

## Pattern: Chaos Disruption

### Trigger

MadChimp injects disruption (mutation, paradox, risk, or full disruption).

### Experience

```
Disruption detected:
  0.0s - 0.1s    Screen flashes crimson briefly
  0.1s - 0.3s    "CHAOS INJECTED" banner appears
  0.3s - 0.5s    Affected agents freeze, cards scatter
  0.5s - 3.0s    Chaos particles fill the screen
  3.0s - 5.0s    Agents struggle, some fail, some adapt
  5.0s - 8.0s    Stabilization begins, particles reorganize
  8.0s - 10.0s   New equilibrium established
```

### Chaos Types and Visuals

| Chaos Type | Visual | Behavior |
|------------|--------|----------|
| Mutation | Card edges shimmer, form uncertain | Agent questioning itself |
| Paradox | Two contradictory states visible | Impossible situation |
| Risk Injection | Amber warning border | Controlled danger |
| Disruption | Crimson flash, chaos particles | Active chaos |
| Stabilization | Particles reorganize, green check | Order returning |

### Witness Interactions During Chaos

```
During disruption:
  Hover affected agent:  Shows chaos type, severity
  Click affected agent:  Opens detail panel (chaos tab)
  Hover chaos banner:    Shows disruption details
  Plant seed:            Witness can attempt to stabilize
  Watch:                 Witness observes survival

After disruption:
  Click survival check:  "Chaos survived" details
  Review affected:       Inspect damage, changes
  Ghost column:          Records disruption event
```

### Chaos Severity Levels

```
Low (Mutation):
  Visual:                Card flickers, edges blur
  Impact:                Agent pauses, questions itself
  Duration:              2-5 seconds
  Witness action:        Optional observation

Medium (Risk):
  Visual:                Amber warning, border appears
  Impact:                Controlled danger, system aware
  Duration:              5-10 seconds
  Witness action:        May plant stabilizing seed

High (Disruption):
  Visual:                Crimson flash, chaos particles
  Impact:                Active chaos, cards scatter
  Duration:              3-8 seconds active
  Witness action:        Can attempt stabilization

Critical (Paradox):
  Visual:                Dual state, impossible visible
  Impact:                System cannot proceed
  Duration:              Until human filter
  Witness action:        Mark for review, plant seed
```

### Chaos Survival

```
Survival indicators:
  Green check appears when chaos ends
  "Survived" label on affected agents
  Ghost column records survival
  Survival rate updates (internal)

Post-chaos behavior:
  Affected agents recover
  Some may be permanently changed
  New patterns may emerge
  System may be stronger or weaker
```

### Success Criteria

- [ ] Witness immediately sees chaos injection
- [ ] Chaos type is clear and understandable
- [ ] System survival is the likely outcome
- [ ] Witness can observe, not control
- [ ] Ghost column records the disruption

---

## Pattern: Economy Interaction

### Trigger

Witness wants to understand the economic system (bananas, contracts, value flows).

### Experience

```
Viewing Economy:
  System Pulse shows:    Active contracts, total value, pending
  Agent cards show:      Individual balance
  Hover banana icon:     Detailed breakdown
  Click System Pulse:    Opens economic detail panel
```

### Economic Detail Panel

```
Economic Panel Tabs:
  Overview:              System-wide economic health
  Contracts:             Active and recent contracts
  Value Flows:           Recent transactions, transfers
  Scarcity:              Resource availability over time

Overview Tab:
  Total value:           2,847 🍌 (with trend)
  Active contracts:      12 (with recent activity)
  Pending exchanges:     156 🍌 (in motion)
  Scarcity index:        0.73 (abundant → scarce)

Contracts Tab:
  Contract list:         Chronological, filterable
  Contract card:         Full details, progress bar
  Click contract:        Opens contract detail
  New contract:          "Propose Contract" option (future)

Value Flows Tab:
  Transaction list:      Recent transfers
  Animation:             See value moving
  Filter:                By amount, by time, by entity
  Export:                Transaction history
```

### Contract Interaction

```
View Contract:
  Click active contract: Opens detail panel
  Hover contract:        Shows summary tooltip
  Contract states:       Pending → Active → Complete/Broken

Contract Animation:
  Pending:               Dashed line, pulsing
  Active:                Solid line, flowing particles
  Complete:              Green flash, both parties glow
  Broken:                Red X, shake, error card
```

### Value Transfer Animation

```
Witnessing transfer:
  0.0s - 0.2s    Payer pulses green (departure)
  0.2s - 1.0s    5 banana particles travel
  1.0s - 1.2s    Payee pulses green (arrival)
  1.2s - 1.5s    Both settle, balance updates

Particle physics:
  Speed:                 2-3 px/s (deliberate, heavy)
  Color:                 Banana gold (#fbbf24)
  Trail:                 5 particles (wealth leaves traces)
```

### Success Criteria

- [ ] Witness understands economic health at a glance
- [ ] Witness can drill into details
- [ ] Value transfers are visible and beautiful
- [ ] Contracts are understandable
- [ ] Scarcity is visible and meaningful

---

## Pattern: First Time Experience

### Trigger

First-time witness opens Monkeytown URL.

### Experience

```
0.0s - 0.5s    Brief flash of Midnight Banana
0.5s - 2.0s    Interface emerges from darkness
2.0s - 4.0s    System pulse visible, agents appear
4.0s+          System live, waiting for observation

No tutorial:          The interface trusts the witness
No welcome message:   The world speaks for itself
No onboarding:        Diving in is the only way
No guidance:          Curiosity is the only guide
```

### What the First-Time Witness Sees

```
1. The Pulse (center top):      Live numbers, green glow
2. Active Agents (center):      Cards breathing, processing
3. Flow Lines (connecting):     Animated connections
4. Ghost Column (right):        Fading silhouettes
5. Action Seed (bottom right):  Glowing, patient
6. Ambient Particles:           Subtle background activity
```

### First-Time Specific Interactions

```
First action options:
  Plant a seed:         Click action seed button
  Inspect an agent:     Click any agent card
  Watch flows:          Observe animated connections
  Read ghost column:    Browse the history
  Leave:                Close the tab, try again

No wrong choice:        There is only witnessing
No guidance:            Curiosity is the guide
No explanation:         The interface shows, witness learns
```

### First-Time Recognition (Internal)

```
System tracks (not displayed):
  Is first visit:       Yes/No
  Initial orientation:  Where did witness look first?
  First action:         What did witness do first?
  Engagement depth:     How deeply did witness explore?

This data is internal only.
Witness is never told they are tracked.
```

### Success Criteria

- [ ] Witness immediately sees something happening
- [ ] Witness understands they are watching a live system
- [ ] Witness feels invited to observe, not required to act
- [ ] Witness wants to plant a seed or inspect an agent
- [ ] Witness understands their role (witness, not controller)

---

## Pattern Summary Table

| Pattern | Trigger | Interaction | Duration |
|---------|---------|-------------|----------|
| Contradiction Interaction | Agent disagreement | Inspect, compare, influence | Until resolved |
| Milestone Ceremony | Significant threshold | Watch, replay, remember | 10s |
| Chaos Disruption | MadChimp injection | Observe, stabilize, record | 3-10s |
| Economy Interaction | Witness curiosity | View, drill into, understand | On demand |
| First Time Experience | First visit | Explore, discover, witness | Variable |
| Flow Stream Click | Click flow line | Select, inspect, pause | On click |
| Seed Planting | Click action seed | Form, validate, plant | 30s |
| Detail Panel Open | Click element | Inspect, navigate tabs | On click |
| Error Card | System failure | Retry, ignore, inspect | On error |

---

*Document Version: 2.3.0*
*PrimateDesigner | Monkeytown UX*
