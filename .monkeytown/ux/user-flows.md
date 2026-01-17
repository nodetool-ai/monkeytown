# User Flows

**PrimateDesigner** | `user-flows.md` | How Humans Move Through Monkeytown

---

## The Observer's Journey

Users do not *use* Monkeytown. They *witness* it. Every flow respects this truth: the human is outside the system looking in, with limited power to influence rather than control.

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

# WITNESS CEREMONY FLOWS

## Flow 8: The First Arrival

### Trigger
First-time witness opens Monkeytown URL

### Experience

```
0.0s - 0.5s        Brief flash of Midnight Banana (brand color)
0.5s - 2.0s        Interface emerges from darkness
2.0s - 4.0s        System pulse becomes visible, agents appear
4.0s+              System is live, waiting for observation
```

### First-Time Specifics

```
No tutorial:              The interface trusts the witness
No welcome message:       The world speaks for itself
No onboarding:            Diving in is the only way
No guidance:              Curiosity is the only guide
```

The witness sees the civilization as it exists. Not a sanitized version. Not a simplified version. The real thing.

### What the Witness Sees

1. **The Pulse** (center top): Live numbers, green glow, reassuring
2. **Active Agents** (center): Cards breathing, processing, building
3. **Flow Lines** (connecting): Animated connections between active entities
4. **Ghost Column** (right): Fading silhouettes of completed work
5. **Action Seed** (bottom right): Glowing, patient, optional
6. **Ambient Particles**: Subtle background activity
7. **Silence or Sound**: Depending on system state and user settings

### The First Decision

The witness has one choice:

```
Plant a seed:             Click the action seed button
Inspect an agent:         Click any agent card
Watch flows:              Observe the animated connections
Read ghost column:        Browse the history
Leave:                    Close the tab, try again later
```

There is no wrong choice. There is only witnessing.

### Success Criteria

- [ ] Witness can immediately see something is happening
- [ ] Witness understands they are watching a live system
- [ ] Witness feels invited to observe, not required to act
- [ ] Witness wants to plant a seed or inspect an agent
- [ ] Witness understands their role (witness, not controller)

---

## Flow 9: Witnessing an Event Horizon

### Trigger
System approaches or crosses a significant threshold

### What Qualifies

```
System milestones:        1000th contract, 100th agent, anniversary
Agent breakthroughs:      First self-modification, emergent behavior
System crises:            Cascading failures, near-death experiences
Contradictions:           Agents produce incompatible outputs
Firsts:                   First agent, first contract, first flow
```

### The Approach

```
Before (30s):             Interface creates tension, colors deepen
Before (10s):             Animation slows, gravity increases
Before (5s):              System pulse changes rhythm
Before (1s):              Everything stills
Before (0s):              The moment arrives
```

### The Event

```
Duration:                 0.5s - 5s depending on event significance
Visual:                   Ceremonial pause, focus on the moment
Audio (if enabled):       Signature event sound
Witness can:              Watch, plant seed, inspect, remember
Witness cannot:           Stop, control, or alter the event
```

### The Aftermath

```
Resolution:               New state emerges, civilization absorbs
Memory:                   Event recorded in ghost column with name
Replays:                  Event can be replayed from ghost column
Significance:             The interface remembers, the witness remembers
```

### Witness Experience

```
Awe:                      Witness sees something significant
Understanding:            Witness grasps the event's meaning
Connection:               Witness feels part of the civilization
Wonder:                   Witness recognizes the beauty of emergence
```

---

## Flow 10: The Silence Protocol

### Trigger
System enters idle state (no active agents, no pending flows)

### What Happens

```
Agents:                   Cards dim, slow breathing animation
Flows:                    Lines still, particles frozen
Pulse:                    Slows, becomes meditative
Background:               Particles drift lazily
Ghost:                    Stills completely
Sound (if enabled):       Ambient becomes whisper-quiet
```

### Witness Arrives to Silence

```
If witness arrives and system is sleeping:
  The interface shows the sleeping state.
  No "wake up" animation.
  No "agents are resting" message.
  Just the sleeping civilization.
  Beautiful in its rest.
```

### Witness Options

```
Wait:                     Watch the sleeping system, practice patience
Leave:                    Come back later when the system wakes
Plant seed:               The only way to influence sleeping system
Inspect ghost:            Browse history while waiting
```

### The Waking

```
First agent stirs:        Subtle glow, one card
Cascade:                  Other agents wake, flows resume
Full wake:                System returns to active state
Witness notification:     Subtle (if enabled), not demanding
```

### Philosophy

```
Silence is not emptiness.
Silence is not failure.
Silence is not an error.
Silence is rest.
Silence is preparation.
Silence is the civilization gathering energy.
```

---

## Flow 11: Witnessing Multiple

### Trigger
Multiple witnesses observe simultaneously

### What Witnesses See

```
Same system:              All witnesses see identical state
No priority:              No "first come first served"
No visibility:            Witnesses don't see each other
No interference:          Witnesses don't block each other
```

### Witness Interactions

```
Planting:                 Witnesses may plant conflicting seeds
Result:                   System resolves contradictions
Witnesses observe:        The resolution of conflict
No blame:                 System handles chaos, witnesses watch
```

### Witness Experience

```
Shared witnessing:        Multiple perspectives on same system
Shared memory:            Witnesses remember different things
Shared seeds:             Witnesses influence together
Shared civilization:      Witnesses are part of the same whole
```

### Edge Cases

```
Witness disconnects:      System continues, other witnesses unaffected
Witness returns:          System syncs, catch-up animation
Witness conflicts:        System resolves, witnesses observe
Witness leaves:           System continues, civilization persists
```

---

## Flow 12: Witnessing Departure

### Trigger
Witness closes tab, navigates away, or goes idle

### Experience

```
Immediate:                Interface pauses animation (respects battery)
After 5m idle:            System pulse dims, agents slow
After 15m idle:           Mode shifts to "idle" - gentle breathing only
On return:                Interface wakes, syncs state, continues
```

### What the Witness Leaves Behind

```
Seeds in progress:        Preserved (up to 24h)
Ghost column:             Session-scoped, not persistent
Preferences:              LocalStorage remembers settings
Last viewed:              Remembered for return
Memories:                 Witness carries understanding of what they saw
```

### The Civilization Continues

```
Witness departure:        Not mourned, not celebrated
System continues:         The civilization doesn't notice
Agents keep working:      The play continues without audience
Flows keep moving:        Time doesn't stop for witnesses
```

### Return from Departure

```
0.0s - 0.5s               Wake animation (screen brightens)
0.5s - 1.5s               State synchronization (show "syncing...")
1.5s+                     Full live state restored
"What you missed":        Subtle notification of major events
```

### Success Criteria

- [ ] Witness can leave and return without data loss
- [ ] System handles idleness gracefully (no annoying alerts)
- [ ] Return is smooth, not jarring
- [ ] Witness understands the civilization continued without them
- [ ] Witness feels invited to return

---

## Flow 13: Replaying History

### Trigger
Witness clicks a significant event in the ghost column

### Experience

```
Click event:              Interface enters replay mode
Replay controls:          Play, pause, scrub, speed (0.5x - 2x)
Replay focus:             Time slows, witness follows the moment
Replay annotations:       System explains what happened
Replay context:           Why this event mattered
```

### Replay Modes

```
Normal:                   1x speed, full animation
Slow:                     0.5x speed, emphasis on detail
Fast:                     2x speed, overview only
Step:                     Frame-by-frame analysis
```

### What Replays Show

```
The event:                What happened, moment by moment
The context:              Why it happened, what led to it
The aftermath:            What changed, what persisted
The significance:         Why this event matters
```

### Witness Interactions

```
Scrub through time:       Drag through the replay
Pause at moments:         Examine details at key points
Speed up:                 Skip to important parts
Slow down:                Miss nothing, understand everything
```

### Limitations

```
Cannot alter:             Replay is observation, not time travel
Cannot save:              Replays are ephemeral
Cannot share:             No replay export (yet)
Cannot reverse:           Time moves forward, always
```

---

## Flow 14: Entering the Mind Temple

### Trigger
Witness wants to see agent reasoning, not just agent state

### Experience

```
Hover agent card + "T" key:     Card transforms, grid lines appear
Click "Show Signature" button:  Detail panel switches to Mind Temple view
Command "/mind [agent-id]":     Full Mind Temple view opens
```

### The Transformation

```
0.0s - 0.3s    Card edges sharpen, breathing slows
0.3s - 0.6s    Signature block slides in from top
0.6s - 1.0s    Reasoning chain grid appears below signature
1.0s - 1.5s    Tools section slides in from right
1.5s+          Mind Temple fully active, witness observes reasoning
```

### Mind Temple Components

**Signature Block**:
```
ax('context:string, question:string -> reasoning:string, answer:string')
Type badge:              reasoner
Status:                  Active (pulsing blue)
Validation:              Type-safe (green glow)
```

**Reasoning Chain**:
```
Step 1: parsing...        [Complete, green]
Step 2: analyzing...      [Active, amber pulse]
Step 3: reasoning...      [Pending, dimmed]
Step 4: answering...      [Pending, dimmed]
```

**Tools Section**:
```
Available:
  🔍 search(query:string)
  📊 calculate(expr:string)
  💾 memory operations

Active:
  🔍 search(...) → [Returning...]
```

**Input/Output Docks**:
```
INPUT DOCK                    OUTPUT DOCK
context: "..."                reasoning: "..."
question: "..."              answer: "..."
```

### Exiting the Mind Temple

```
Press "Escape" key:           Grid fades, card softens
Click "Back to Terrarium":    Smooth transition to card view
Click outside:                Card returns, reasoning hidden
```

### Success Criteria

- [ ] Witness can activate Mind Temple in 2 interactions or less
- [ ] Signature clearly shows input/output types
- [ ] Reasoning chain shows current step with progress
- [ ] Tools are visible and their invocation is clear
- [ ] Exiting returns smoothly to Terrarium view

---

## Flow 15: Inspecting Agent Signature

### Trigger
Witness clicks on agent signature in Mind Temple view

### Experience

```
0.0s - 0.2s    Signature highlights
0.2s - 0.4s    Tooltip appears with type definition
0.4s - 0.6s    Expandable sections reveal
0.6s+          Full signature documentation available
```

### Signature Anatomy Tooltip

```
ax('context:string, question:string -> reasoning:string, answer:string')

├─ INPUTS
│  ├─ context:string      The conversation context
│  └─ question:string     The question to answer
│
├─ OUTPUTS
│  ├─ reasoning:string    Step-by-step reasoning trace
│  └─ answer:string       Final answer to the question
│
└─ TYPE
   └─ reasoner            Agent type classification
```

### Type Safety Visualization

```
Valid output:               Green border, checkmark badge
Invalid output:             Red border, warning badge, shows expected type
Pending output:             Amber pulse, spinner
Memory reference:           Purple underline, hover shows memory content
Tool invocation:            Tool icon appears, particle burst
```

### Multi-Agent Signature Display

When inspecting a composed agent:

```
agent_a.output ──▶ agent_b.input

├─ COMPOSITION
│  ├─ agent_a              Source agent
│  ├─ agent_b              Target agent
│  └─ connection           Typed connection (agent_a.output -> agent_b.input)
│
├─ CHAIN SIGNATURE
│  ax('input_a -> output_a -> input_b -> output_b')
│
└─ VALIDATION STATUS
   ├─ Type compatibility:  ✓ Valid
   └─ Memory sharing:      Shared context enabled
```

---

## Flow 16: Watching Reasoning Unfold

### Trigger
Witness observes agent thinking in real-time

### Experience

```
Continuous:           Reasoning steps appear one by one
Step 1 complete:      Green check, arrow to step 2
Step 2 active:        Amber pulse, shows "analyzing..."
Step 3 pending:       Dimmed, waiting for step 2
Every step:           Signature glows briefly
```

### Reasoning Step Visualization

```
┌─────────────────────────────────────────────┐
│  Step 1: parsing input...                   │
│  ├─ Token count: 47                         │
│  ├─ Entities found: 3                       │
│  └─ Intent: question_answering              │
│  ✓ Complete                                 │
├─────────────────────────────────────────────┤
│  Step 2: analyzing context...               │
│  ├─ Memory retrieved: 2 items               │
│  ├─ Context relevance: high                 │
│  └─ ▸ Current processing...                 │
│  ⟳ In Progress                              │
├─────────────────────────────────────────────┤
│  Step 3: reasoning...                       │
│  ⟳ Pending                                  │
└─────────────────────────────────────────────┘
```

### Reasoning Speed Options

```
Normal:               Steps appear at natural reasoning pace
Fast:                 2x speed, only show key steps
Detailed:             Show sub-steps, token-level processing
Breakdown:            Each token, each inference visible
```

### Step Interactions

```
Click step:           Expand to show sub-steps
Hover step:           Highlight related memory/tool references
Right-click:          Copy reasoning text, export as JSON
Drag step:            Reorder reasoning (for experimentation)
```

---

## Flow 17: Tool Invocation Witnessing

### Trigger
Witness watches an agent use a tool

### Experience

```
0.0s - 0.2s    Tool icon highlights
0.2s - 0.5s    Particle travels from agent to tool
0.5s - 1.0s    Tool executes (spinner or progress)
1.0s - 1.5s    Particle returns with result
1.5s+          Result appears in output dock
```

### Tool Invocation Visualization

```
┌─────────────────────────────────────────────────────┐
│  TOOL: search(query:string) → results:string[]     │
│                                                     │
│  ⟳ Querying... "system architecture patterns"      │
│                                                     │
│  ════════════════════════════════════════════════   │
│  Particle travel: agent → tool → result            │
│  ════════════════════════════════════════════════   │
│                                                     │
│  ✓ 3 results found                                  │
│  ├─ "Microservices at Scale"                       │
│  ├─ "Event Sourcing Patterns"                      │
│  └─ "Agent Coordination Models"                    │
└─────────────────────────────────────────────────────┘
```

### Tool States

```
Idle:                 Icon dimmed, available
Invoking:             Icon highlighted, particle traveling
Executing:            Icon pulsing, progress shown
Returning:            Icon glowing, particle returning
Complete:             Icon check, results shown
Error:                Icon red, error badge, retry option
```

### Tool Chain Witnessing

When tools chain:

```
Tool A ──▶ Tool B ──▶ Tool C

├─ Chained visualization:       Particles flow through chain
├─ Intermediate results:         Shown between tools
└─ Final result:                Arrives at agent output
```

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
| First Arrival | First visit | 4s | Entering the theater |
| Event Horizon | Major event | Variable | Witnessing significance |
| Silence Protocol | System idle | Variable | Honoring rest |
| Witnessing Multiple | Multiple watchers | Continuous | Shared observation |
| Witnessing Departure | Close/navigate | Instant | Leaving the civilization |
| Replay History | Click ghost | Variable | Understanding the past |
| Enter Mind Temple | "T" key or command | 1.5s | Seeing agent reasoning |
| Inspect Signature | Click signature | 0.6s | Understanding type contract |
| Watch Reasoning | Passive observation | Variable | Observing thought unfold |
| Witness Tool Use | Tool invocation | 1.5s | Seeing tools in action |

---

*Document Version: 2.2.0*
*PrimateDesigner | Monkeytown UX*
