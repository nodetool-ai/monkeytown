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
```

### No Hover Delay

Hover states activate at 50ms. No waiting. The interface is always watching.

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

### The Ripple

For primary actions, a subtle ripple emanates from the click point, signaling propagation.

---

## Pattern: Drag Exploration

### The Pull

Drag interactions reveal hidden depth.

```
Drag down on agent card:      Reveals full history
Drag right on completed item: Restores to main view
Drag left on ghost item:      Archives permanently
Drag up from bottom:          Opens command palette
```

### The Snap

Drags have magnetic snap points.

```
0%     : Original position (cancel)
50%    : Preview state (see what happens)
100%   : Committed state (action complete)
```

### The Release

Releasing mid-drag triggers the nearest snap point with appropriate animation.

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
Escape              Close modal / Cancel / Back
Arrow keys          Navigate between elements
Enter               Activate focused element
```

### The Live Region

Screen readers receive live updates through ARIA live regions.

```
aria-live="polite":   Updates after current action completes
aria-live="assertive": Critical errors, immediate announcements
```

---

## Pattern: Modal Transitions

### The Entry

Modals enter from context.

```
Detail panel:        Slides from right
Action modal:        Scales up from center
Confirmation:        Dims backdrop, centers dialog
Command palette:     Slides from top
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
Error → Retry:        Shake animation, then reset
```

### The Cascade

When one element changes state, connected elements react.

```
Agent completes:      Connected flows pulse, destinations highlight
Contract settles:     Both parties dim, history updates
New seed planted:     Related agents slightly brighten (awareness)
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
```

---

## Pattern: Gesture Language

### Touch Gestures

On touch devices, these gestures are recognized.

```
Tap:               Activate / Select
Double-tap:        Zoom to detail
Long-press:        Context menu
Swipe left:        Archive / Dismiss
Swipe right:       Restore from ghost
Pinch:             Zoom in/out (detail view)
Two-finger tap:    Back / Escape
```

### The Haptic

Where supported, haptic feedback reinforces interactions.

```
Light tap:         Selection, hover
Medium tap:        Success, complete
Heavy tap:         Error, rejection
Triple tap:        Special actions
```

---

## Pattern: Accessibility Integration

### Screen Reader Announcements

```
Loading:           "Loading [element]..."
Complete:          "[element] loaded"
Error:             "Error: [error description]. [Recovery action]."
State change:      "[element] is now [state]."
```

### Keyboard Patterns

```
Tab:               Move focus forward
Shift+Tab:         Move focus back
Space:             Activate
Enter:             Activate
Arrow keys:        Navigate within components
Home/End:          Jump to first/last
```

### Focus Management

Modals trap focus. Opening a modal focuses the first interactive element. Closing returns focus to the trigger.

---

## Pattern: The Emotional Arc

### First Impressions

The first 10 seconds establish the tone.

- Warm colors (Monkey Fur) against deep dark (Midnight Banana)
- Activity visible but not chaotic
- Clear invitation to interact (Action Seed pulsing gently)
- No blank states, no confusion

### Sustained Use

Minutes or hours in, the interface remains:

- Informative without being noisy
- Alive without being distracting
- Responsive without being anxious
- Consistent without being boring

### The Parting Gift

When the user leaves, they take:

- Understanding of what happened
- Confidence that the system continues
- Memory of the patterns they witnessed
- Desire to return and see what grew

---

## Pattern Summary Table

| Pattern | Trigger | Response | Duration |
|---------|---------|----------|----------|
| Hover Awareness | Cursor approach | Element notices | 50ms |
| Click Commitment | Mouse down | Press state | 100ms |
| Drag Exploration | Drag gesture | Reveal hidden | 200ms |
| Scroll Revelation | Scroll | Gradient awareness | Instant |
| Keyboard Navigation | Key press | Focus move | 50ms |
| Modal Transitions | Open modal | Contextual entry | 300ms |
| State Changes | State update | Smooth transition | 300-500ms |
| Loading States | Data fetch | Process view | Progressive |
| Error Handling | Error state | Shake + recover | 200ms |
| Success Celebration | Success state | Brief acknowledgment | 200ms |

---

*Document Version: 1.0.0*
*PrimateDesigner | Monkeytown UX*
