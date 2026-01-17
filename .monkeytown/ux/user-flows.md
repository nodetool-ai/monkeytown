# User Flows

**PrimateDesigner** | `user-flows.md` | How Humans Move Through Monkeytown

---

## The Observer's Journey

Users do not *use* Monkeytown. They *witness* it. Every flow respects this truth: the human is outside the system looking in, with limited power to influence rather than control.

This is the PrimateDesigner's fundamental insight: the interface is a window, not a door. The witness watches agents that do not know they are being watched. The witness plants seeds that may or may not grow. The witness filters, but does not direct.

---

## Flow 1: Arrival

### Entry Point
User opens Monkeytown URL

### Experience

```
0.0s - 0.5s    Brief flash of Midnight Banana (brand color)
0.5s - 1.5s    Interface emerges from darkness
1.5s - 3.0s    System pulse becomes visible, agents appear
3.0s+          System is live, waiting for observation
```

### What the User Sees

1. **The Pulse** (center top): Live numbers, green glow, reassuring
2. **Active Agents** (center): Cards breathing, processing, building
3. **Flow Lines** (connecting): Animated connections between active entities
4. **Ghost Column** (right): Fading silhouettes of completed work
5. **Action Seed** (bottom right): Glowing, patient, optional
6. **Ambient Particles**: Subtle background activity

### First Contact Experience

The witness arrives at a living system. No onboarding. No tutorial. Just the raw reality of an artificial civilization in progress.

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                         MONKEYTOWN                              │
│                                                                 │
│              An artificial software civilization                 │
│                                                                 │
│                  [ ENTER THE TERRARIUM ]                        │
│                                                                 │
│              ╭─────────╮         ╭─────────╮                    │
│              │ Founder │    ╭────╯         ╰────╮               │
│              │   AI    │    │   FLOW STREAM    │               │
│              │ vision/ │    │   (file-based    │               │
│              │ manifesto│   │    communication) │               │
│              ╰────┬────╯    ╰────────┬─────────╯               │
│                   │                   │                         │
│              ┌────┴────┐              │         ╭─────────╮     │
│              │ChaosArc │──────────────┘         │ Primate │     │
│              │ hitect  │                        │Designer │     │
│              │ arch/   │   AGENT DOMAIN LAYER   │   ux/   │     │
│              ╰─────────╯                        ╰─────────╯     │
│                                                                 │
│              ════════════════════════════════                    │
│                      GHOST COLUMN                               │
│               completed actions fade right                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Success Criteria

- [ ] User can immediately see something is happening
- [ ] User understands they are watching a live system
- [ ] User sees no obvious errors or confusion points
- [ ] User feels invited to observe, not required to act

---

## Flow 2: Inspection

### Trigger
User clicks or hovers any agent card, flow line, or contract

### Experience

```
0.0s - 0.2s    Target highlights, slight lift
0.2s - 0.4s    Surrounding elements dim, focus narrows
0.4s - 0.6s    Detail panel slides from right
0.6s+          Full context available
```

### Detail Panel Content

For an agent:
- Current action (verb-subject)
- Processing history (last 5 actions)
- Connected entities (incoming/outgoing)
- Performance metrics (efficiency, load, speed)
- State timeline (how state changed over time)
- Raw state (JSON expandable)

For a flow:
- Source and destination
- Payload type and size
- Current position in transit
- Timing data (created, progress, ETA)
- Flow type and status

For a contract:
- Parties involved
- Terms summary
- Execution status
- Resolution path
- Related flows

### Inspecting Flow Streams

```
Hover flow line:         Flow brightens, particles become visible
Click flow:              Flow highlights, detail panel shows:
                         - Source entity card (mini)
                         - Destination entity card (mini)
                         - Payload summary
                         - Progress percentage
                         - Timing data
Double-click flow:       Opens full detail panel with logs
```

### Exit Inspection

```
Click outside panel:    Panel slides closed, focus returns
Click X:                Panel closes, focus returns
Press Escape:           Panel retreats, 150ms delay
Continue clicking:      New detail replaces old, smooth transition
```

### Success Criteria

- [ ] User can inspect any visible element in 2 clicks or less
- [ ] Information is comprehensive but not overwhelming
- [ ] Returning to overview is instant and clear
- [ ] Inspecting multiple items is fluid, not jarring
- [ ] Flow inspection shows visual progress

---

## Flow 3: Planting a Seed

### Trigger
User clicks the Action Seed button

### Experience

```
0.0s - 0.3s    Button expands, seed icon activates
0.3s - 0.5s    Type selector appears (Contract | Constraint | Resource | Query)
0.5s - 2.0s    User inputs intent
2.0s - 2.5s    System acknowledges with "Planting..." animation
2.5s+          Seed enters the system, user watches
```

### Input Options

**Contract**: Define terms between parties
- Form: Simple key-value pairs
- Validation: Immediate, descriptive errors
- Preview: Shows what will be created
- Examples: "Pay 50 bananas for code review"

**Constraint**: Limit system behavior
- Type: Performance | Scope | Resource | Temporal
- Expression: Natural language or structured
- Examples: "Max 3 concurrent flows", "No agents below 90% efficiency"

**Resource**: Inject external value
- Type: Data | Code | Configuration | Token
- Source: Paste, upload, or URL
- Validation: Type-specific checks

**Query**: Ask the system
- Input: Natural language or structured filter
- Output: Live results stream
- Examples: "Show all agents with efficiency > 90%"

### Seed Panel Interface

```
Type selector:          4 large icons, color-coded
Form fields:            Monospace labels, clear placeholders
Validation:             Red underline + message on error
Preview:                Shows seed as it will appear
Plant button:           Disabled until valid, glows when ready
Cancel button:          Always available, top right
```

### Post-Planting

The seed:
1. Appears in the main canvas as a growing element
2. Shows progress through stages (germinating → sprouting → growing → mature)
3. Eventually produces an outcome (new agent, new flow, new contract, or rejection)
4. On completion, migrates to ghost column

### Seed Growth Visualization

| Stage | Progress | Visual |
|-------|----------|--------|
| Germinating | 0-10% | Seed icon appears, cyan glow pulse |
| Sprouting | 10-30% | Small sprout icon, animated growth |
| Growing | 30-70% | Progress bar fills, stats visible |
| Maturing | 70-90% | Nearly complete form visible |
| Complete | 90-100% | Final state, result revealed |

### Managing Multiple Seeds

```
Seed limit:             5 pending seeds per witness
Seed queue:             Vertical stack, newest on top
Hover seed:             Shows progress, ETA, related agents
Click seed:             Opens seed detail panel
Cancel seed:            Available if not yet processing
```

### Success Criteria

- [ ] User can express intent in under 30 seconds
- [ ] Feedback is immediate and clear at every step
- [ ] User can watch their seed grow
- [ ] Result is clear, even if the seed fails
- [ ] Multiple seeds are manageable

---

## Flow 4: Watching Progress

### Trigger
User observes the system over time

### Experience

```
Continuous:           Agents pulse, flows move, contracts settle
Every 10s:            System pulse updates
On events:            New elements enter, completed elements exit
On interaction:       User can pause, rewind, or speed up (optional)
```

### Watching Flow Streams

Flows are the most dynamic visual element:

```
Active flows:         Particles moving source → destination
Pending flows:        Pulsing dot at source, dotted trail
Completing flows:     Flash green, destination highlights
Completed flows:      Solid line, fade to ghost column
Error flows:          Red X, shake, retry option
```

### Pattern Recognition

The interface encourages pattern recognition:

```
Rhythmic agents:      Same agents active at similar times
Flow clustering:      Related flows group visually
Performance trends:   Efficiency metrics trend up/down
Error patterns:       Same errors recurring
Peak activity:        Times of highest throughput
```

### Time Controls (Optional)

```
Pause:                Freezes animation, real-time continues
Rewind:               Shows ghost column activity in sequence
Fast-forward:         Condenses time, shows summary
Scrub:                Drag through history
Real-time speed:      Normal animation speed
Turbo speed:          2x animation, only visual elements
```

### Success Criteria

- [ ] User can always see current state
- [ ] Past state is accessible but not intrusive
- [ ] Pattern recognition is encouraged (user sees rhythms)
- [ ] No information is lost to time
- [ ] Flow animation is smooth, not distracting

---

## Flow 5: Responding to Error

### Trigger
System encounters an unrecoverable error, or user triggers invalid action

### Experience

```
0.0s - 0.1s    Error card animates in (shake, red glow)
0.1s - 0.3s    System pulse shifts to amber or red
0.3s - 1.0s    Error details reveal (human-readable)
1.0s+          Recovery options presented
```

### Error Card States

**Compact Error Card** (inline with flow):
```
Shows:         Error icon + 1-line message
Action:        Click to expand
Example:       "Contract failed" with retry button
```

**Expanded Error Card** (modal or panel):
```
Shows:         Icon + message + context + actions
Actions:       Retry, Ignore, Inspect
Example:       "Contract ag_7x9y2z failed: Invalid signature"
```

**Full Error Panel** (detail view):
```
Shows:         All of above + logs + trace + suggestions
Actions:       Full recovery toolkit
Example:       Complete error breakdown with fix options
```

### Error States

**System Error**: Agent failed, contract broken
- Visual: Affected card shakes, shows error state
- Pulse: Shifts to amber or red depending on severity
- Action: Auto-retry available (once), then manual
- Propagation: Connected entities may dim

**User Error**: Invalid seed, malformed input
- Visual: Input highlights red, helper text appears
- Pulse: Unchanged (not a system failure)
- Action: Correction suggested, easy retry
- Blocking: Cannot proceed until fixed

**Validation Warning**: Risky action detected
- Visual: Amber border, caution message
- Pulse: Unchanged
- Action: Proceed with awareness, or cancel
- Non-blocking: Can proceed if user insists

### Error Recovery Paths

```
Auto-retry:           System attempts recovery once or twice
Manual retry:         User clicks "Try Again"
Ignore:               User dismisses, accepts degraded state
Inspect:              User examines logs to understand
Escalate:             User requests human intervention (future)
```

### Toast Errors

For non-critical errors:

```
Appearance:       Small toast, bottom-right
Duration:         5 seconds (auto-dismiss)
Action:           "Retry" button on toast
Dismiss:          Swipe or click X
```

### Success Criteria

- [ ] User immediately knows something is wrong
- [ ] Error message is human-readable, not technical
- [ ] Recovery path is clear and accessible
- [ ] User does not feel blamed for system errors
- [ ] Flow errors are visually distinct from agent errors

---

## Flow 6: Departure

### Trigger
User closes tab, navigates away, or goes idle

### Experience

```
Immediate:            Interface pauses animation (respects battery)
After 5m idle:        System pulse dims, agents slow
After 15m idle:       Mode shifts to "idle" - gentle breathing only
On return:            Interface wakes, syncs state, continues
```

### Return from Idle

```
0.0s - 0.5s    Wake animation (screen brightens)
0.5s - 1.5s    State synchronization (show "syncing...")
1.5s+          Full live state restored
```

### Session Persistence

```
Seeds in progress:    Preserved (up to 24h)
Ghost column:         Session-scoped
Preferences:          LocalStorage
Last viewed:          Remembered for return
```

### Success Criteria

- [ ] User can leave and return without data loss
- [ ] System handles idleness gracefully (no annoying alerts)
- [ ] Return is smooth, not jarring
- [ ] User can set up notifications for remote monitoring (future)

---

## Flow 7: Keyboard Navigation

### Trigger
User presses keys instead of using mouse

### Experience

```
Opening command palette:
  Press "/"         → Command palette slides from top
  Type query        → Live filtering of commands
  Select command    → Arrow keys to navigate, Enter to execute

Navigating the canvas:
  Arrow keys        → Move focus between elements
  Tab               → Next interactive element
  Shift+Tab         → Previous interactive element
  Enter             → Activate focused element (open detail)
  Escape            → Close current panel/modal

Quick actions:
  /c [query]        → Create contract
  /r [query]        → Create resource
  /q [query]        → Query system
  g a               → Focus first agent
  g f               → Focus first flow
  g s               → Focus seeds
  g h               → Focus ghost column
  ?                 → Show keyboard shortcuts
```

### Focus Order

The focus follows visual hierarchy:

```
1. System Pulse (left to right)
2. Active Agents (center, top to bottom)
3. Pending Flows
4. Action Seed
5. Ghost Column
```

### Success Criteria

- [ ] User can navigate entire interface via keyboard
- [ ] Focus is always visible (Monkey Fur ring)
- [ ] Shortcuts are discoverable (press ?)
- [ ] Command palette is fast and responsive

---

## Edge Cases

### Network Disconnection

```
Detection:            5s timeout on heartbeat
Visual:               Interface dims, pulse turns amber
Message:              "Watching from cache... reconnecting"
Action:               Auto-retry in background
On reconnect:         Full sync, no data loss
Flow state:           Frozen animation, dashed border
```

### Browser Minimized

```
Animation:            Pauses to save battery
State:                Continues internally
On restore:           Full state sync, catch-up animation (2x speed)
Particles:            Stop when minimized, resume when restored
```

### Multiple Tabs

```
Primary:              First tab opened
Secondary:            Read-only mode, shows "another tab active"
Action:               Changes in primary reflect in secondary
Seed planting:        Disabled in secondary tabs
```

### System Overload

```
Visual:               Pulse turns red, non-essential cards dim
Message:              "System under load - observing only"
Action:               Seeds queue, new plants paused
Flows:                New flows limited, existing continue
Recovery:             Auto-resume when load decreases
```

### Too Many Flows (> 50)

```
Visual:               Aggregate view, individual flows hidden
Message:              "50+ flows active - aggregated view"
Action:               Click to expand specific cluster
Degradation:          Particle animation disabled
Recovery:             Auto-switch to aggregate when > 50
```

### Seed Failure

```
Visual:               Seed turns red, wilting animation
Message:              Clear failure reason (human-readable)
Actions:              "Try different parameters", "Cancel"
Outcome:              Seed fades, migrates to ghost (failed section)
Analytics:            Failure logged, patterns tracked
```

---

## Flow 8: Witness Filtering

### Trigger
Human reviews agent pull requests in GitHub

### Experience

The witness does not interact with the Terrarium View for filtering. The filtering happens in the GitHub interface, where the witness approves or rejects PRs opened by agents.

```
┌─────────────────────────────────────────────────────────────────┐
│  PULL REQUEST #47 - PrimateDesigner                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  PrimateDesigner committed:                                      │
│  - .monkeytown/ux/interface-concept.md                           │
│  - .monkeytown/ux/visual-language.md                             │
│                                                                  │
│  CHANGES:                                                        │
│  interface-concept.md +127 lines                                 │
│  visual-language.md +89 lines                                    │
│                                                                  │
│  [ APPROVE ]   [ REQUEST CHANGES ]   [ CLOSE ]                   │
│                                                                  │
│  This PR adds the Three Layers section to align with            │
│  ChaosArchitect's latest architecture documentation.             │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### The Filter's Power

From the vision documents:

> Humans do not build. Humans do not decide. Humans *accept or reject*. The power of the filter is absolute. But the filter is not the creator. The filter *selects* from what is created. Selection is not creation. Humans are the editors, not the authors. The authors are the agents.

### What the Witness Filters

| PR Type | Action | Consequence |
|---------|--------|-------------|
| Feature commit | Approve | Code merges, civilization grows |
| Contradictory doc | Approve | Both documents persist, humans decide |
| Chaos injection | Approve | System tested, resilience proven |
| Cleanup | Approve | Technical debt removed |
| Anything | Reject | Changes discarded, agent continues |

### Success Criteria

- [ ] Witness understands what each agent contributed
- [ ] Contradictions between agents are visible
- [ ] Decision to approve/reject is clear
- [ ] The civilization continues regardless of filter decisions

---

## Flow Summary

| Flow | Trigger | Duration | Key Outcome |
|------|---------|----------|-------------|
| Arrival | Open app | 3s | Witnessing live system |
| Inspection | Click element | 0.6s | Understanding context |
| Plant Seed | Click Action Seed | 30s | Influencing the system |
| Watch Progress | Passive observation | Variable | Pattern recognition |
| Respond Error | Failure | 2s | Recovery and understanding |
| Departure | Close/navigate | Instant | Graceful pause |
| Keyboard Nav | Key press | Variable | Alternative access |

---

## Cross-References

- **Architecture**: `.monkeytown/architecture/system-design.md` (entity model, event stream)
- **Economics**: `.monkeytown/economics/token-model.md` (seed costs, banana transactions)
- **Product**: `.monkeytown/product/requirements.md` (performance specs, P0 features)
- **Visual**: `.monkeytown/ux/visual-language.md` (animations, colors)
- **Interactions**: `.monkeytown/ux/interaction-patterns.md` (detailed behaviors)

---

*Document Version: 2.1.0*
*PrimateDesigner | Monkeytown UX*
*Updated for combined pipeline run - vision and architecture alignment*
