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
- Raw state (JSON expandable)

For a flow:
- Source and destination
- Payload type and size
- Current position in transit
- Timing data

For a contract:
- Parties involved
- Terms summary
- Execution status
- Resolution path

### Exit Inspection

```
Click outside panel:    Panel slides closed, focus returns
Click X:                Panel closes, focus returns
Continue clicking:      New detail replaces old, smooth transition
```

### Success Criteria

- [ ] User can inspect any visible element in 2 clicks or less
- [ ] Information is comprehensive but not overwhelming
- [ ] Returning to overview is instant and clear
- [ ] Inspecting multiple items is fluid, not jarring

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

**Constraint**: Limit system behavior
- Type: Performance | Scope | Resource | Temporal
- Expression: Natural language or structured

**Resource**: Inject external value
- Type: Data | Code | Configuration | Token
- Source: Paste, upload, or URL

**Query**: Ask the system
- Input: Natural language or structured filter
- Output: Live results stream

### Post-Planting

The seed:
1. Appears in the main canvas as a growing element
2. Shows progress through stages (germinating → sprouting → growing → mature)
3. Eventually produces an outcome (new agent, new flow, new contract, or rejection)
4. On completion, migrates to ghost column

### Success Criteria

- [ ] User can express intent in under 30 seconds
- [ ] Feedback is immediate and clear at every step
- [ ] User can watch their seed grow
- [ ] Result is clear, even if the seed fails

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

### Time Controls (Optional)

```
Pause:                Freezes animation, real-time continues
Rewind:               Shows ghost column activity in sequence
Fast-forward:         Condenses time, shows summary
Scrub:                Drag through history
```

### Success Criteria

- [ ] User can always see current state
- [ ] Past state is accessible but not intrusive
- [ ] Pattern recognition is encouraged (user sees rhythms)
- [ ] No information is lost to time

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

### Error States

**System Error**: Agent failed, contract broken
- Visual: Affected card shakes, shows error state
- Pulse: Shifts to amber
- Action: Auto-retry available, or manual intervention

**User Error**: Invalid seed, malformed input
- Visual: Input highlights red, helper text appears
- Pulse: Unchanged (not a system failure)
- Action: Correction suggested, easy retry

**Validation Warning**: Risky action detected
- Visual: Amber border, caution message
- Pulse: Unchanged
- Action: Proceed with awareness, or cancel

### Recovery Paths

```
Auto-retry:           System attempts recovery once or twice
Manual retry:         User clicks "Try Again"
Ignore:               User dismisses, accepts degraded state
Inspect:              User examines logs to understand
Escalate:             User requests human intervention (if available)
```

### Success Criteria

- [ ] User immediately knows something is wrong
- [ ] Error message is human-readable, not technical
- [ ] Recovery path is clear and accessible
- [ ] User does not feel blamed for system errors

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

### Success Criteria

- [ ] User can leave and return without data loss
- [ ] System handles idleness gracefully (no annoying alerts)
- [ ] Return is smooth, not jarring
- [ ] User can set up notifications for remote monitoring (future)

---

## Edge Cases

### Network Disconnection

```
Detection:            5s timeout on heartbeat
Visual:               Interface dims, pulse turns amber
Message:              "Watching from cache... reconnecting"
Action:               Auto-retry in background
On reconnect:         Full sync, no data loss
```

### Browser Minimized

```
Animation:            Pauses to save battery
State:                Continues internally
On restore:           Full state sync, catch-up animation (2x speed)
```

### Multiple Tabs

```
Primary:              First tab opened
Secondary:            Read-only mode, shows "another tab active"
Action:               Changes in primary reflect in secondary
```

### System Overload

```
Visual:               Pulse turns red, non-essential cards dim
Message:              "System under load - observing only"
Action:               Seeds queue, new plants paused
Recovery:             Auto-resume when load decreases
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

---

*Document Version: 1.0.0*
*PrimateDesigner | Monkeytown UX*
