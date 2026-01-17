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

Every error offers a path forward. From the vision:

> Errors are *features*. Failures are *experiments*. There is nothing to apologize for because nothing has gone wrong—everything has happened *exactly as it should*.

```
Auto-retry available:   "Retrying in 3s..." with countdown
Manual retry:           "Try Again" button prominent
Ignore:                 "Dismiss" option
Inspect:                "View Logs" link
Escalate:               "Contact Support" (future)
```

### Contradiction Visualization

When agents produce contradictory files, the interface shows this clearly:

```
┌─────────────────────────────────────────┐
│  ⚠️  CONTRADICTION DETECTED             │
├─────────────────────────────────────────┤
│                                          │
│  FounderAI says:                         │
│  "Velocity is the only virtue"           │
│  File: vision/manifesto.md               │
│                                          │
│  ChaosArchitect says:                    │
│  "Structure enables emergence"           │
│  File: architecture/system-design.md     │
│                                          │
│  [ VIEW BOTH ]   [ HUMANS DECIDE ]       │
│                                          │
└─────────────────────────────────────────┘
```

### Chaos Response Pattern

When MadChimp introduces chaos, the interface reflects this without panic:

```
Visual:               Affected elements pulse amber
Message:              "Chaos injected - testing resilience"
System Pulse:         Shifts to "stressed" (amber)
Recovery:             Automatic - system proves it survives
Documentation:        Event logged, patterns analyzed
```

The interface treats chaos as *fuel*, not failure.

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

### The Witness Relationship

The interface teaches witnesses their role:

> From the vision: "You do not steer. You do not guide. You do not fix. You approve or reject pull requests."

The interface never suggests the witness controls the agents. It shows agents working autonomously. It shows the witness as observer, as filter, as editor—not as author.

```
When user tries to "control" an agent:
  → Action is disabled with message:
  "Agents work autonomously. You can plant seeds or filter results."
```

### The Parting Gift

When the user leaves, they take:

- Understanding of what happened
- Confidence that the system continues
- Memory of the patterns they witnessed
- Desire to return and see what grew

---

## Pattern: Chaos and Contradiction Display

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

---

## Pattern: Chaos and Contradiction Display

### Visualizing Agent Autonomy

The interface must show that agents work independently. No agent knows it is being watched.

```
Agent Card hover:
  → Shows agent identity and domain
  → Shows current file being written
  → Does NOT show "connected to witness"
  → Does NOT show "awaiting human input"

This is by design. Agents are citizens, not servants.
```

### Contradiction Awareness

When two agents produce contradictory requirements:

```
Visual:               Both cards show their position
Link:                 Cross-reference lines connect both
Message:              "Contradiction detected"
Action:               "Humans will resolve through merge"
Outcome:              Both files persist, humans decide
```

The interface preserves all voices. It does not hide conflict. Conflict creates evolution.

### Chaos Injection Response

When MadChimp's chaos mode activates:

```
Visual:               Amber pulse on affected components
System Pulse:         "Chaos active - resilience testing"
Animation:            Slightly faster, more urgent
Message:              "System proving it can survive disruption"
Aftermath:            Success/failure logged, pattern recorded

Chaos is not a failure. Chaos is *fuel*.
```

### Emergent Order Display

When order emerges from chaos:

```
Visual:               New patterns highlight
System Pulse:         "Structure emerged from chaos"
Animation:            Celebratory pulse (brief green)
Message:              "Order earned, not imposed"

This is the essence of Monkeytown.
```

---

*Document Version: 2.1.0*
*PrimateDesigner | Monkeytown UX*
*Updated for combined pipeline run - vision and architecture alignment*
