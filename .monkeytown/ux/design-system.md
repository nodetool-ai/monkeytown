# Design System

**PrimateDesigner** | `design-system.md` | Components, Tokens, and Patterns

---

## The Living System

This is not a static design system. It is a *reactive* system—components that adapt to context, tokens that derive from values, patterns that emerge from needs. Traditional design systems freeze the past. Monkeytown's design system *anticipates the future*.

---

## Design Tokens

### Colors

```css
:root {
  /* Primary - The Jungle Palette */
  --color-jungle-canopy:      #1a3a2f;
  --color-jungle-depth:       #0f1f1a;
  --color-monkey-fur:         #d4a574;
  --color-monkey-fur-light:   #e8c9a8;
  --color-dawn-citrus:        #ff6b35;
  
  /* Semantic - The Status Palette */
  --color-signal-green:       #4ade80;
  --color-warning-amber:      #fbbf24;
  --color-error-red:          #ef4444;
  --color-ghost-white:        #f8fafc;
  --color-connection-purple:  #a855f7;
  --color-fresh-cyan:         #22d3ee;
  
  /* Neutrals - The Depth Palette */
  --color-midnight-banana:    #1a1a1a;
  --color-surface-dark:       #141a1f;
  --color-card-bg:            rgba(26, 58, 47, 0.5);
  --color-card-hover:         rgba(26, 58, 47, 0.7);
  --color-border-subtle:      rgba(248, 250, 252, 0.1);
  --color-border-hover:       rgba(212, 165, 116, 0.3);
  
  /* Accent - The Energy Palette */
  --color-particle:           rgba(26, 58, 47, 0.15);
  --color-flow-active:        rgba(168, 85, 247, 0.6);
  --color-flow-ghost:         rgba(248, 250, 252, 0.15);
  --color-seed-glow:          rgba(34, 211, 238, 0.4);
}
```

### Typography

```css
:root {
  --font-family-mono:         'Geist Mono', 'SF Mono', 'Consolas', monospace;
  --font-size-display:        32px;
  --font-size-h1:             24px;
  --font-size-h2:             18px;
  --font-size-body:           14px;
  --font-size-caption:        11px;
  --font-size-mono:           13px;
  
  --font-weight-regular:      400;
  --font-weight-medium:       500;
  --font-weight-semibold:     600;
  
  --line-height-tight:        1.2;
  --line-height-normal:       1.6;
  --line-height-loose:        1.8;
  
  --letter-spacing-tight:     -0.02em;
  --letter-spacing-normal:    0;
  --letter-spacing-wide:      0.02em;
}
```

### Spacing

```css
:root {
  --space-1:                   4px;
  --space-2:                   8px;
  --space-3:                   12px;
  --space-4:                   16px;
  --space-5:                   24px;
  --space-6:                   32px;
  --space-8:                   48px;
  --space-10:                  64px;
  --space-12:                  96px;
  
  --radius-sm:                 6px;
  --radius-md:                 12px;
  --radius-lg:                 20px;
  --radius-full:               9999px;
}
```

### Animation

```css
:root {
  --duration-instant:         50ms;
  --duration-quick:           150ms;
  --duration-standard:        300ms;
  --duration-considered:      500ms;
  --duration-breath:          1000ms;
  --duration-growth:          2000ms;
  
  --ease-smooth:              cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce:              cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-spring:              cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-seed:                cubic-bezier(0.25, 0.1, 0.25, 1.0);
  --ease-ghost:               cubic-bezier(0.4, 0, 0.6, 1);
}
```

### Z-Index Scale

```css
:root {
  --z-base:                   0;
  --z-particle:               1;
  --z-flow:                   2;
  --z-card:                   100;
  --z-dropdown:               200;
  --z-sticky:                 300;
  --z-overlay:                400;
  --z-modal:                  500;
  --z-tooltip:                600;
  --z-system:                 1000;
}
```

---

## Component: Thought Bubble

The thought bubble represents an agent processing. It pulses with subtle animation, suggesting ongoing calculation.

```jsx
<ThoughtBubble
  state="processing"  // processing | complete | error | idle
  label="analyzing contract"
  timestamp="12ms"
  progress={0.73}
  size="md"           // sm | md | lg
  pulseSpeed={1000}   // ms per pulse cycle
/>
```

**Visual States:**

| State | Visual | Animation |
|-------|--------|-----------|
| Idle | Hidden | None |
| Processing | Pulsing circle with dots | 1000ms breath |
| Complete | Green check, fades | 300ms fade out |
| Error | Red X, shaking | 400ms shake |

**CSS:**
```css
.thought-bubble {
  position: absolute;
  top: -12px;
  right: -12px;
  width: 24px;
  height: 24px;
}

.thought-bubble.processing {
  animation: thoughtPulse 1000ms infinite;
}
```

---

## Component: Agent Card

The primary building block. Every agent, contract, and transaction is a card.

```jsx
<AgentCard
  id="ag_7x9y2z"
  name="MonkeyBuilder"
  status="building"
  lastAction="compiling modules"
  since="2m 34s"
  metrics={{
    efficiency: 0.94,
    load: "32%",
    connections: 12
  }}
  onClick={() => expandAgent(id)}
  onDoubleClick={() => openDetail(id)}
/>
```

**Visual States:**

| State | Border | Background | Animation |
|-------|--------|------------|-----------|
| Idle | Subtle glow | Base card | Gentle breath (4s) |
| Active | Jungle Canopy | Elevated | Lift 2px |
| Processing | Amber pulse | Animated | Thought bubble |
| Complete | Green fade | Ghost dim | Fade right, 800ms |
| Error | Red pulse | Red tint | Shake, 400ms |

**Dimensions:**
```
card-min-width:         280px
card-max-width:         400px
card-padding:           24px
card-border-radius:     12px
card-border-width:      1px
```

---

## Component: Flow Stream

Represents data, resources, or communication between entities. Flow streams are animated connections that show movement.

```jsx
<FlowStream
  from="ag_alpha"
  to="ag_beta"
  type="message"  // message | resource | contract | signal
  status="active" // pending | active | complete | error | paused
  payload={messageData}
  progress={0.45}
  onComplete={() => handleFlowEnd(id)}
  onClick={() => selectFlow(id)}
  onInspect={() => openDetail(id)}
/>
```

**Visual Representation:**

| Status | Line Style | Particles | Endpoints |
|--------|------------|-----------|-----------|
| Pending | Dotted | Pulsing dot at source | Hollow circles |
| Active | Animated dashed | Moving particles | Solid circles |
| Complete | Solid | None | Dimmed circles |
| Error | Solid with X | None | Red X at break |
| Paused | Dashed (frozen) | Frozen particles | Hollow circles |

**Flow Types (color-coded):**

| Type | Color | Icon |
|------|-------|------|
| Message | Purple (#a855f7) | ↔ |
| Resource | Cyan (#22d3ee) | → |
| Contract | Amber (#fbbf24) | ⇄ |
| Signal | Green (#4ade80) | ◎ |

**CSS Animation:**
```css
.flow-stream.active {
  stroke: var(--color-connection-purple);
  stroke-width: 2px;
  stroke-dasharray: 4 4;
  animation: flowDash 800ms linear infinite;
}

.flow-particle {
  fill: var(--color-connection-purple);
  animation: particleMove 1000ms linear infinite;
}
```

---

## Component: Timeline (Ghost Column)

The archive of completed actions. Sorted reverse-chronological.

```jsx
<Timeline
  events={completedActions}
  onRestore={(event) => expandToMain(event)}
  onClear={() => archiveOlder()}
  onArchive={(event) => permanentlyDismiss(event)}
  maxItems={50}
/>
```

**Behavior:**
- Items stream in from the right as they complete
- Fade opacity over time (newer = more visible)
- Click to restore to main view for inspection
- Swipe left to archive permanently
- Maximum 50 items visible before scrolling

**Ghost Opacity Scale:**
```
Newly completed:        0.7
1 minute old:           0.5
5 minutes old:          0.35
15+ minutes old:        0.25
```

**Dimensions:**
```
ghost-column-width:     280px
ghost-item-height:      48px
ghost-item-padding:     12px
```

---

## Component: Action Seed

The user's primary interaction mechanism. Plant a seed, watch it grow.

```jsx
<ActionSeed
  type="contract"  // contract | constraint | resource | query
  onPlant={(intent) => dispatchIntent(intent)}
  isGrowing={pendingSeeds.length > 0}
  pendingCount={3}
/>
```

**Seed Types:**

| Type | Color | Purpose |
|------|-------|---------|
| Contract | Amber | Define terms between parties |
| Constraint | Red | Limit system behavior |
| Resource | Cyan | Inject external value |
| Query | Purple | Ask the system |

**Growth Animation Stages:**

| Stage | Progress | Visual |
|-------|----------|--------|
| Germinating | 0-10% | Seed appears, glows |
| Sprouting | 10-30% | Sprout emerges |
| Growing | 30-70% | Continued growth |
| Maturing | 70-90% | Approaches completion |
| Complete | 90-100% | Final state reached |
| Outcome | 100% | Success/failure shown |

**Dimensions:**
```
seed-button-size:       56px
seed-icon-size:         24px
seed-panel-width:       400px
seed-panel-max-height:  500px
```

---

## Component: System Pulse

The weather map of Monkeytown's current state.

```jsx
<SystemPulse
  metrics={{
    activeAgents: 7,
    pendingFlows: 3,
    contractsSettled: 1247,
    systemLoad: 0.34
  }}
  alerts={[alertObject]}
  onAgentClick={() => filterView('agents')}
  onFlowClick={() => filterView('flows')}
/>
```

**Visual:** Fixed header element. Green = healthy. Amber = stressed. Red = critical. Live numbers tick.

**Health States:**

| State | Color | Pulse Speed | Meaning |
|-------|-------|-------------|---------|
| Healthy | Green (#4ade80) | 2s interval | All systems operational |
| Stressed | Amber (#fbbf24) | 1s interval | Approaching limits |
| Critical | Red (#ef4444) | 0.5s interval + shake | Intervention required |
| Disconnected | Gray (#64748b) | None | Reconnecting... |

**Metrics Display:**
```
agents-count:           Large, prominent
flows-count:            Medium, secondary
contracts-settled:      Large, lifetime counter
system-load:            Small, with load bar
```

---

## Component: Detail Panel

Contextual overlay for deep inspection. Slides from the right.

```jsx
<DetailPanel
  target={selectedEntity}
  onClose={() => clearSelection()}
  tabs={["status", "logs", "connections", "history"]}
  activeTab="status"
  onTabChange={(tab) => setActiveTab(tab)}
/>
```

**Tab Content:**

| Tab | Content | Actions |
|-----|---------|---------|
| Status | Current state, metrics, health | Copy, refresh |
| Logs | Chronological events, timestamps | Filter, export |
| Connections | Input/output relationships | Inspect neighbor |
| History | State changes, lifetime | Restore (if applicable) |

**Dimensions:**
```
detail-panel-width:     480px
detail-panel-height:    100% (full viewport)
detail-header-height:   64px
detail-content-padding: 24px
```

**Animation:**
```css
.detail-panel {
  animation: panelSlide 350ms var(--ease-smooth);
}

@keyframes panelSlide {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
```

---

## Component: Error Card

Error states rendered as cards with recovery options.

```jsx
<ErrorCard
  error={errorObject}
  onRetry={() => retryAction()}
  onIgnore={() => dismiss()}
  onInspect={() => openLogs()}
  expanded={false}
/>
```

**Error Card States:**

| State | Width | Content |
|-------|-------|---------|
| Compact | 360px | Icon + 1-line message |
| Expanded | 400px | Icon + message + context |
| Full | 480px | Expanded + logs + actions |

**Visual Treatment:**
```
error-border:           1px solid var(--color-error-red)
error-background:       rgba(239, 68, 68, 0.1)
error-icon:             24px, red
error-animation:        shake 400ms on appear
error-action-primary:   "Retry" button
error-action-secondary: "Ignore", "Inspect"
```

**Recovery Paths:**
```
Auto-retry:           "Retrying in 3s..." with countdown
Manual retry:         "Try Again" button prominent
Ignore:               "Dismiss" option
Inspect:              "View Logs" link
```

---

## Component: Command Palette

Quick access to actions via keyboard.

```jsx
<CommandPalette
  isOpen={showPalette}
  onClose={() => setShowPalette(false)}
  onSelect={(command) => execute(command)}
  commands={commandList}
/>
```

**Shortcuts:**
```
/                   Open palette
/c [query]          Create contract
/r [query]          Create resource
?q [query]          Query system
g a                 Go to agents
g f                 Go to flows
g s                 Go to seeds
g h                 Go to history
?                   Show all shortcuts
```

**Dimensions:**
```
palette-width:          480px
palette-max-height:     400px
palette-item-height:    48px
```

---

## Component: Toast Notification

Non-blocking notifications for transient events.

```jsx
<Toast
  type="success"        // success | error | warning | info
  message="Seed planted successfully"
  action="View"
  onAction={() => viewSeed()}
  duration={5000}
  onDismiss={() => removeToast()}
/>
```

**Toast Types:**

| Type | Icon | Color | Duration |
|------|------|-------|----------|
| Success | ✓ | Green | 4000ms |
| Error | ✕ | Red | 6000ms |
| Warning | ⚡ | Amber | 5000ms |
| Info | ℹ | Cyan | 4000ms |

---

## Pattern: Emergent Layout

The main canvas does not use a grid. It uses a *flow layout*.

```jsx
<Canvas
  mode="emergent"
  gravity="attention"  // attention | chronological | spatial
  onLayout={(layout) => saveLayoutPreference(layout)}
>
  <ActiveAgents />
  <PendingFlows />
  <RecentCompletions />
</Canvas>
```

**Rules:**
- Active elements gravitate toward center
- Pending elements cluster at bottom
- Completed elements drift right, then left (to ghost column)
- User focus overrides gravity
- Layout resolves within 100ms

---

## Pattern: Live Data

All data is potentially live. The interface shows *current* state.

```jsx
<LiveData
  source="/api/system/metrics"
  render={(data) => <MetricDisplay value={data.value} />}
  refreshInterval={1000}
  showStale={true}  // Fade when not updating
/>
```

**Visual:**
- Live: Bright, pulsing slightly
- Stale (within threshold): Normal opacity
- Stale (over threshold): Dimmed, "idle" label
- Disconnected: Gray, dashed border, reconnect gesture

---

## Pattern: Progressive Disclosure

Information reveals itself through interaction, never overwhelming the default view.

```
Level 1 (Default):    Identity, status, single key metric
Level 2 (Hover):      Expanded metrics, connection count, time active
Level 3 (Click):      Full detail panel, logs, history
Level 4 (Expand):     Raw data, configuration, debug info
```

---

## Pattern: Error Recovery

Errors are not failures. They are *opportunities*.

```jsx
<ErrorBoundary
  fallback={(error, retry) => (
    <ErrorCard
      error={error}
      onRetry={retry}
      suggestion="Check agent logs for details"
    />
  )}
>
  {children}
</ErrorBoundary>
```

**Error Card:**
- Descriptive error message (not codes)
- Context: What was happening
- Actions: Retry, Ignore, Inspect
- Visual: Red pulse, shake animation

---

## Pattern: Loading States

Never show spinners. Show *process*.

```jsx
<ProcessState
  verb="building"
  subject="module"
  progress={0.67}
  eta="12s"
  stage="compilation"
/>
```

**Visual:** Thought bubble with progress ring. Verb-subject pair describes what's happening. Stage indicates current phase. ETA is approximate but present.

---

## Pattern: Empty States

Empty is not broken. Empty is *waiting*.

```jsx
<EmptyState
  title="No active agents"
  description="Agents will appear when tasks are dispatched"
  action="Dispatch a task"
  onAction={() => openDispatch()}
  ghost={true}  // Subtle, non-demanding
/>
```

**Visual:** Faded, centered, minimal. Does not demand attention. Available when needed.

---

## Pattern: Seed Growth Visualization

Seeds animate through growth stages:

```jsx
<SeedGrowth
  stage="growing"    // germinating | sprouting | growing | maturing | complete
  progress={0.45}
  timeElapsed="12s"
  estimatedRemaining="23s"
  onComplete={() => handleSeedComplete()}
/>
```

**Growth Animation:**
```
Germinating:    Seed appears at cursor, pulses
Sprouting:      Small sprout icon emerges
Growing:        Progress bar fills, stats visible
Maturing:       Nearly complete, final form visible
Complete:       Final state revealed, animation ends
```

---

## Pattern: Flow Visualization

Flows show progress and state through animated elements:

```jsx
<FlowVisualization
  source={sourceCard}
  destination={destCard}
  type="message"
  status="active"
  progress={0.67}
  particleCount={3}
/>
```

**Particle Animation:**
```
Particle count:     3 (adjusts based on flow type)
Particle speed:     1000ms source to destination
Particle size:      4px
Particle opacity:   0.6 → 0.0 (fades at destination)
```

---

## Component: Witness Presence Indicator

Shows that witnesses are observing without revealing identities.

```jsx
<WitnessPresence
  count={witnessCount}
  active={activeWitnesses}
  isFirstVisit={isFirstTime}
/>
```

**Visual:**
```
witness-count:              Small badge on system pulse
witness-pulse:              Subtle indicator that changes with activity
witness-first:              Special welcome for first-time witnesses (subtle)
witness-patterns:           Internal tracking, not displayed
```

**Behavior:**
```
Witness arrives:            Internal counter increments, no visual disruption
Witness leaves:             Counter decrements, no visual disruption
Witness watches:            Pulse quickens slightly (if > 1 witness)
Witness plants:             System acknowledges internally
Witness pattern:            Tracked for system health, not displayed
```

---

## Component: Event Horizon Marker

Marks significant events in the timeline.

```jsx
<EventHorizon
  name="First Contract"
  timestamp={contractTimestamp}
  significance="high"
  replayable={true}
/>
```

**Event Types:**
```
High:                      System milestones, breakthroughs, crises
Medium:                    Agent achievements, significant flows
Low:                       Routine events worth remembering
```

**Visual:**
```
High:                      Gold border, pulsing glow, ceremonial name
Medium:                    Silver border, steady glow, formal name
Low:                       Bronze border, gentle glow, simple name
```

**Replays:**
```
Available:                 Click to enter replay mode
Controls:                  Play, pause, scrub, speed
Duration:                  Variable based on event significance
Annotations:               System explains the event
Context:                   Why this event mattered
```

---

## Component: Silence State

Represents the system in idle or resting state.

```jsx<SilenceState
  isSleeping={systemIsIdle}
  agentsResting={restingAgents.length}
  lastActivity={lastEventTimestamp}
  onWake={() => systemWakes()}
/>
```

**Visual:**
```
Sleeping agents:           Cards dim, slow breathing (4s cycle)
Active agents:             Normal breathing (2s cycle)
Background:                Particles slow, drift lazily
Pulse:                     Slows to 4s cycle, deep green
Ghost column:              Completely still
Sound (if enabled):        Ambient becomes whisper-quiet
```

**Wake Triggers:**
```
Seed planted:              System begins waking
First agent stirs:        Subtle glow on one card
Cascade:                   Other agents wake, flows resume
Full wake:                 System returns to active state
```

---

## Component: Milestone Celebration

Ceremonial acknowledgment of significant achievements.

```jsx<Milestone
  type="contract"          // contract | agent | system
  count={1000}
  previousBest={867}
  replayable={true}
/>
```

**Milestone Types:**
```
Contract milestones:       100, 500, 1000, 5000 contracts settled
Agent milestones:          10, 50, 100, 500 tasks completed
System milestones:         1 year, 100 agents, 10000 contracts
Personal milestones:       Witness's 100th visit, 10th seed
```

**Visual:**
```
Milestone approach:        Colors deepen, tension builds
Milestone imminent:        Animation slows, gravity increases
Milestone achieved:        Ceremonial pause, full glow, system pulse flashes
Milestone aftermath:       New state established, civilization continues
```

**Audio (if enabled):**
```
Approach:                  Tension builds in ambient layer
Achieve:                   Full ceremonial sound
Aftermath:                 Settling chord, resolution
```

---

## Component: Contradiction Visuals

Shows when agents produce incompatible outputs.

```jsx<Contradiction
  agentA={agentOne}
  agentB={agentTwo}
  conflictType="architecture"
  resolutionPending={true}
/>
```

**Visual:**
```
Contradiction detected:    Both agents pulse red, shake slightly
Contradiction awareness:   Connected flows dim, system pulse amber
Contradiction visible:     Witness can see the conflict
Contradiction resolves:    Both agents green flash, new state emerges
Contradiction persists:    Both agents dim, ghost column records
```

**Witness Interactions:**
```
Inspect agent A:           Shows agent A's perspective
Inspect agent B:           Shows agent B's perspective
Inspect contradiction:     Shows the conflict, both perspectives
Watch resolution:          Observe how the system handles conflict
Plant seed:                Influence how contradiction resolves
```

---

## Component: Mind Temple View

The deep-dive view into agent reasoning. Crystalline, structured, precise.

```jsx
<MindTempleView
  agent={selectedAgent}
  expanded={true}
  showSignature={true}
  showReasoning={true}
  showTools={true}
  speed="normal"  // normal | fast | detailed | breakdown
  onClose={() => exitMindTemple()}
  onSignatureClick={(sig) => inspectSignature(sig)}
  onReasoningClick={(step) => expandStep(step)}
  onToolClick={(tool) => inspectTool(tool)}
/>
```

**Visual Style:**
```
Background:              Midnight Banana with grid overlay
Edges:                   Sharp (2px radius)
Borders:                 1px Structure Gray
Typography:              Geist Mono, smaller (12px)
Animation:               ease-crystal (sharp, precise)
Colors:                  Signal Blue, Crystal White, Structure Gray
```

**Mind Temple Components:**
```
Signature Block:         Top, shows ax() signature
Reasoning Chain:         Center, vertical step list
Input Dock:              Left, shows current inputs
Output Dock:             Right, shows outputs
Tools Panel:             Right sidebar, available tools
Memory Stream:           Bottom, retrieved context items
```

---

## Component: Agent Signature

Shows the type-safe definition of an agent.

```jsx
<AgentSignature
  signature="context:string, question:string -> reasoning:string, answer:string"
  type="reasoner"
  status="active"  // active | validating | error
  validationState="valid"  // valid | invalid | pending
  memoryReferences={['context_v1', 'context_v2']}
  toolInvocations={['search', 'calculate']}
/>
```

**Signature Display:**
```
Font:                    Geist Mono, 14px
Color:                   Crystal White
Type badge:              Signal Blue, small pill
Status indicator:        Green (valid), Amber (pending), Red (error)
Memory references:       Purple underline, hover shows content
Tool invocations:        Tool icon appears, particle on invoke
```

---

## Component: Reasoning Chain

Shows step-by-step agent thinking.

```jsx
<ReasoningChain
  steps={reasoningSteps}
  currentStep={2}
  expanded={false}
  speed="normal"
  onStepClick={(step) => expandStep(step)}
  onStepHover={(step) => highlightReferences(step)}
/>
```

**Step States:**
```
Complete:                Green checkmark, full opacity
Active:                  Amber pulse, expanded, current
Pending:                 Dimmed, collapsed, waiting
Error:                   Red X, error badge, hover shows error
```

**Step Animation:**
```
Step appears:            Slides in from left, 200ms
Step completes:          Green fade, 150ms
Step activates:          Amber pulse, 100ms
Step error:              Red shake, 300ms
```

---

## Component: Tool Panel

Shows available and active tools.

```jsx
<ToolPanel
  available={availableTools}
  active={activeTool}
  history={toolHistory}
  onToolClick={(tool) => inspectTool(tool)}
  onHistoryClick={(invocation) => viewInvocation(invocation)}
/>
```

**Tool Display:**
```
Available tools:         Grid layout, dimmed until invoked
Invoking tool:           Highlighted, particle traveling
Executing tool:          Spinner or progress bar
Complete tool:           Green check, results shown
Error tool:              Red border, error badge
```

**Tool Icon Style:**
```
Shape:                   16x16 square with 2px radius
Color:                   Structure Gray (idle), Signal Blue (active)
Size:                    20px including padding
Animation:               Scale on invoke, glow on complete
```

---

## Component: Memory Stream

Shows context being retrieved and used.

```jsx
<MemoryStream
  memories={retrievedMemories}
  onMemoryClick={(mem) => inspectMemory(mem)}
  onMemoryHover={(mem) => highlightInContext(mem)}
/>
```

**Memory Display:**
```
Retrieved:               Purple border, timestamp
In context:              Underlined in reasoning chain
Expanded:                Shows full memory content
Filtered:                Dimmed if not relevant
```

**Memory States:**
```
Idle:                    Not loaded
Retrieving:              Pulsing purple, loading state
Retrieved:               Solid purple, content visible
In use:                  Highlighted in context
Expired:                 Grayed out, timestamp old
```

---

## Component: Input/Output Dock

Shows data entering and leaving the agent.

```jsx
<InputDock
  inputs={currentInputs}
  onInputClick={(input) => inspectInput(input)}
/>

<OutputDock
  outputs={currentOutputs}
  validationStatus="valid"
  onOutputClick={(output) => inspectOutput(output)}
/>
```

**Dock Style:**
```
Input Dock:              Left side, amber highlight on active
Output Dock:             Right side, green highlight on valid
Data format:             JSON syntax highlighted
Validation:              Type badge shows expected vs actual
```

---

## Pattern: The Witness Ceremony

Every interaction is part of the ceremony of witnessing.

```
Arrival:                   Interface emerges, civilization revealed
Attention:                 Focus follows interest, interface guides
Observation:               Watching without controlling, influencing without force
Memory:                    Ghost column preserves the record
Departure:                 Interface lets go, civilization continues
Return:                    Welcome back, catch up on what was missed
```

**The Witness's Role:**
```
Witness observes:          The interface shows, the witness sees
Witness influences:        The witness plants seeds, the system responds
Witness remembers:         The ghost column preserves, the witness carries understanding
Witness returns:           The civilization has grown, the witness grows with it
Witness leaves:            The civilization doesn't notice, but persists
```

---

## Component: Flow Stream (F-003)

Represents data, resources, or communication between entities. Flow streams are animated connections that show movement.

```jsx
<FlowStream
  from="ag_alpha"
  to="ag_beta"
  type="message"  // message | resource | contract | signal
  status="pending" // pending | active | complete | error | paused
  payload={messageData}
  progress={0.45}
  particleCount={3}
  onComplete={() => handleFlowEnd(id)}
  onClick={() => selectFlow(id)}
  onInspect={() => openDetail(id)}
  onHover={() => highlightParticles()}
/>
```

**Flow Types (color-coded):**

| Type | Color | Icon | Particle Color | Speed |
|------|-------|------|----------------|-------|
| Message | Purple (#a855f7) | ↔ | #a855f7 | Normal |
| Resource | Cyan (#22d3ee) | → | #22d3ee | Fast |
| Contract | Amber (#fbbf24) | ⇄ | #fbbf24 | Slow |
| Signal | Green (#4ade80) | ◎ | #4ade80 | Fastest |

**Flow States:**

| State | Line Style | Particles | Endpoints |
|-------|------------|-----------|-----------|
| Pending | Dotted (#64748b) | Pulsing at source | Hollow circles |
| Active | Animated dashed (#a855f7) | Moving particles | Solid circles |
| Complete | Solid, fading (#4ade80) | None | Dimmed circles |
| Error | Solid with red X (#ef4444) | Scattered | Red X at break |
| Paused | Dashed frozen (#64748b) | Frozen particles | Hollow circles |

**Flow Dimensions:**

```
flow-width:             2px
flow-active-width:      3px
particle-size:          4px
particle-count:         3-5 (based on type)
endpoint-size:          8px
endpoint-active-size:   10px
```

**Flow Animation:**

```css
.flow-stream.active {
  stroke: var(--color-connection-purple);
  stroke-width: 3px;
  stroke-dasharray: 4 4;
  animation: flowDash 800ms linear infinite;
}

.flow-particle {
  fill: var(--color-connection-purple);
  animation: particleMove 1000ms linear infinite;
}

@keyframes flowDash {
  to {
    stroke-dashoffset: -20;
  }
}

@keyframes particleMove {
  0% {
    offset-distance: 0%;
    opacity: 1;
  }
  100% {
    offset-distance: 100%;
    opacity: 0;
  }
}
```

**Flow Hover Behavior:**

```
Hover flow line:        Flow brightens, particles visible
Click flow:             Flow highlights, detail panel shows:
                        - Source entity card (mini)
                        - Destination entity card (mini)
                        - Payload summary
                        - Progress percentage
                        - Timing data
Double-click flow:      Opens full detail panel with logs
Right-click flow:       Context menu (pause, cancel, inspect)
```

---

## Component: Action Seed (F-004)

The user's primary interaction mechanism. Plant a seed, watch it grow.

```jsx
<ActionSeed
  type="contract"  // contract | constraint | resource | query
  onPlant={(intent) => dispatchIntent(intent)}
  isGrowing={pendingSeeds.length > 0}
  pendingCount={3}
  availableSeeds={5}
/>
```

**Seed Types:**

| Type | Color | Purpose | Icon |
|------|-------|---------|------|
| Contract | Amber (#fbbf24) | Define terms between parties | 🤝 |
| Constraint | Red (#ef4444) | Limit system behavior | ⚡ |
| Resource | Cyan (#22d3ee) | Inject external value | 📦 |
| Query | Purple (#a855f7) | Ask the system | ❓ |

**Seed Button:**

```
seed-button-size:       56px
seed-button-icon:       🌱 (24px)
seed-button-color:      Jungle Canopy (#1a3a2f)
seed-button-glow:       Cyan (#22d3ee, 0.4)
seed-button-hover:      Scale to 1.1, intensify glow
seed-button-active:     Scale to 0.95, press animation
```

**Seed Growth Visualization:**

| Stage | Progress | Visual | Animation |
|-------|----------|--------|-----------|
| Germinating | 0-10% | Seed appears at cursor, cyan glow pulse | Pulse 500ms |
| Sprouting | 10-30% | Small sprout icon emerges, leaves appear | Grow 800ms |
| Growing | 30-70% | Progress bar fills, stats visible | Fill 1500ms |
| Maturing | 70-90% | Nearly complete form visible | Slow pulse |
| Complete | 90-100% | Final state, result revealed | Flash green |
| Outcome | 100% | Success/failure shown | Settle 300ms |

**Seed Panel:**

```
seed-panel-width:       400px
seed-panel-max-height:  500px
seed-panel-padding:     24px
seed-panel-backdrop:    rgba(15, 20, 25, 0.95)
seed-panel-radius:      16px
seed-panel-animation:   Slide up from button (350ms)
```

**Seed Input Types:**

```
Contract Input:
  - Form: Key-value pairs
  - Validation: Immediate, descriptive
  - Preview: Shows contract terms
  - Example: "Pay 50 bananas for code review"

Constraint Input:
  - Type: Performance | Scope | Resource | Temporal
  - Expression: Natural language or structured
  - Example: "Max 3 concurrent flows"

Resource Input:
  - Type: Data | Code | Configuration | Token
  - Source: Paste, upload, or URL
  - Validation: Type-specific checks

Query Input:
  - Input: Natural language or structured filter
  - Output: Live results stream
  - Example: "Show all agents with efficiency > 90%"
```

**Managing Multiple Seeds:**

```
Seed limit:             5 pending seeds per witness
Seed queue:             Vertical stack, newest on top
Hover seed:             Shows progress, ETA, related agents
Click seed:             Opens seed detail panel
Cancel seed:            Available if not yet processing
Priority:               Most recent has priority
```

---

## Component: Detail Panel (F-007)

Contextual overlay for deep inspection. Slides from the right.

```jsx
<DetailPanel
  target={selectedEntity}
  onClose={() => clearSelection()}
  tabs={["status", "logs", "connections", "history"]}
  activeTab="status"
  onTabChange={(tab) => setActiveTab(tab)}
  isContradiction={false}
  comparisonData={null}
/>
```

**Detail Panel Structure:**

```
detail-panel-width:     480px
detail-panel-height:    100% (full viewport)
detail-header-height:   64px
detail-content-padding: 24px
detail-animation:       Slide from right (350ms)
detail-backdrop:        rgba(10, 14, 17, 0.8)
detail-radius:          0 (full height) or 16px (modal)
```

**Detail Panel Tabs:**

| Tab | Content | Actions |
|-----|---------|---------|
| Status | Current state, metrics, health | Copy, refresh |
| Logs | Chronological events, timestamps | Filter, export |
| Connections | Input/output relationships | Inspect neighbor |
| History | State changes, lifetime stats | Restore (if applicable) |
| Contradiction | Both perspectives, comparison | Mark for review |

**Tab Content Specifications:**

**Status Tab:**
```
Entity name:            Large, prominent
Current state:          Color-coded badge
Key metrics:            Grid of 4 values with labels
Health:                 Pulse indicator (green/amber/red)
Raw state:              JSON expandable, syntax highlighted
Actions:                Copy ID, Refresh, Export
```

**Logs Tab:**
```
Event list:             Chronological, newest first
Timestamp:              Monospace, relative ("2m 34s ago")
Event type:             Icon + label
Event details:          Expandable, syntax highlighted
Filter:                 By type, by time, by entity
Export:                 JSON, CSV options
```

**Connections Tab:**
```
Input relationships:    Source entities, incoming flows
Output relationships:   Destination entities, outgoing flows
Flow visualization:     Mini flow streams (20% scale)
Connection strength:    Visual indicator (line thickness)
```

**History Tab:**
```
State changes:          Timeline of transformations
Duration:               Time in each state
Milestones:             Highlighted entries
Restore:                "Restore to this state" option (if applicable)
```

**Contradiction Tab (Special):**
```
Perspective A:          Full agent output + reasoning
Perspective B:          Full agent output + reasoning
Comparison:             Side-by-side, differences highlighted
Resolution:             "Mark for Review" button
Seed influence:         "Plant seed to influence"
```

**Detail Panel Navigation:**

```
Tab navigation:         Arrow keys, click
Content scrolling:      Natural scroll, sticky header
Expandable sections:    Click to expand/collapse
Links:                  Click entity names to inspect
Back:                   Arrow top left
Close:                  X top right, Escape key
```

---

## Component: Error Card (F-008)

Error states rendered as cards with recovery options.

```jsx
<ErrorCard
  error={errorObject}
  onRetry={() => retryAction()}
  onIgnore={() => dismiss()}
  onInspect={() => openLogs()}
  expanded={false}
  severity="error"  // warning | error | critical
  context="Contract ag_7x9y2z"
/>
```

**Error Card States:**

| State | Width | Content | Animation |
|-------|-------|---------|-----------|
| Compact | 360px | Icon + 1-line message + retry | Shake 300ms |
| Expanded | 400px | Icon + message + context + actions | Shake 300ms |
| Full | 480px | Expanded + logs + trace + suggestions | Full shake |

**Error Card Content:**

```
Compact Error:
  ┌────────────────────────────────────────┐
  │  ✕ Contract ag_7x9y2z failed          │
  │     [Retry]  [Ignore]  [Inspect]      │
  └────────────────────────────────────────┘

Expanded Error:
  ┌────────────────────────────────────────┐
  │  ✕ Contract ag_7x9y2z failed          │
  │  ─────────────────────────────────     │
  │  Invalid signature from MonkeyBuilder  │
  │  ─────────────────────────────────     │
  │  Contract requires valid signature     │
  │  but received: undefined               │
  │  ─────────────────────────────────     │
  │  [Retry]  [Ignore]  [Inspect]  [?]     │
  └────────────────────────────────────────┘
```

**Error Severity Levels:**

```
Warning (amber):
  Icon:               ⚠ (triangle)
  Border:             1px solid var(--color-warning-amber)
  Background:         rgba(251, 191, 36, 0.1)
  Pulse:              Slow amber pulse (3s)
  Auto-dismiss:       10s unless hovered

Error (red):
  Icon:               ✕ (circle with X)
  Border:             1px solid var(--color-error-red)
  Background:         rgba(239, 68, 68, 0.1)
  Pulse:              Medium red pulse (2s)
  Auto-dismiss:       Never (requires action)

Critical (crimson):
  Icon:               ⛔ (stop sign)
  Border:             2px solid var(--color-error-red)
  Background:         rgba(239, 68, 68, 0.2)
  Pulse:              Fast red pulse (1s) + shake
  Auto-dismiss:       Never
  System impact:      May affect connected entities
```

**Error Card Dimensions:**

```
compact-width:         360px
compact-height:        64px
expanded-width:        400px
expanded-height:       auto (max 300px)
full-width:            480px
full-height:           auto (max 500px)
padding:               16px
border-radius:         12px
```

**Error Card Animations:**

```css
@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

@keyframes errorPulse {
  0%, 100% {
    box-shadow: 0 0 0 rgba(239, 68, 68, 0);
  }
  50% {
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
  }
}

.error-card {
  animation: errorShake 400ms ease-out;
}

.error-card.critical {
  animation: errorShake 400ms ease-out, errorPulse 1000ms infinite;
}
```

**Error Recovery Paths:**

```
Auto-retry:           "Retrying in 3s..." with countdown
Manual retry:         "Try Again" button, primary
Ignore:               "Dismiss" button, secondary
Inspect:              "View Logs" link, tertiary
Escalate:             "Request Human Review" (future)
Learn:                "Remember this pattern" (internal)
```

**Error Context Display:**

```
Error context:         What was the system doing?
Error source:          Which agent/component?
Error timestamp:       When did it happen?
Error frequency:       How often does this occur?
Error pattern:         Related errors (if any)
Suggested fix:         If known, show solution
```

---

## Component: Contradiction Arena

Shows when agents produce incompatible outputs.

```jsx<ContradictionArena
  agentA={agentOne}
  agentB={agentTwo}
  conflictType="architecture"
  resolutionPending={true}
  onInspectA={() => inspect(agentOne)}
  onInspectB={() => inspect(agentTwo)}
  onMarkReview={() => markForReview()}
  onPlantSeed={(direction) => influence(direction)}
/>
```

**Arena Structure:**

```
arena-width:           480px
arena-height:          auto (min 300px)
arena-backdrop:        rgba(15, 20, 25, 0.98)
arena-border:          2px solid var(--color-warning-amber)
arena-radius:          16px
arena-animation:       Expand from center (400ms)
```

**Arena Content:**

```
Header:
  "CONTRADICTION DETECTED"
  Subtitle: "Two agents produced incompatible outputs"

Agent A Section:
  Agent card (mini)
  Full output text
  Reasoning summary
  [Inspect] button

Agent B Section:
  Agent card (mini)
  Full output text
  Reasoning summary
  [Inspect] button

Comparison:
  Side-by-side or stacked
  Differences highlighted
  [Show Comparison] button

Resolution Actions:
  [Mark for Review]
  [Plant Seed] (influence direction)
```

**Contradiction States:**

```
Detected:
  Both agents pulse amber
  Connection line appears
  Arena starts forming

Forming:
  Both agents freeze
  Arena expands
  Grid overlay appears

Active:
  Full arena visible
  Both perspectives labeled
  Witness can inspect

Resolved:
  Winning agent:        Green flash, expansion
  Loser:                Dim, retreat
  Arena collapses

Merged:
  Both agents:          Purple glow, rotate together
  New entity:           Emerges
  Arena transforms

Stalemate:
  Both agents:          Gray, resume action
  Arena:                Fades to ghost
  Marked:               "UNRESOLVED"
```

---

## Component: Milestone Celebration

Ceremonial acknowledgment of significant achievements.

```jsx<MilestoneCelebration
  type="contract"          // contract | agent | system | chaos
  count={1000}
  previousBest={867}
  replayable={true}
  onReplay={() => replayMilestone()}
/>
```

**Milestone Types:**

```
Contract milestones:       100, 500, 1000, 5000 contracts settled
Agent milestones:          10, 50, 100, 500 tasks completed
System milestones:         1 year, 100 agents, 10000 contracts
Chaos milestones:          10th disruption survived
Witness milestones:        10th visit, 10th seed (internal)
```

**Celebration Structure:**

```
celebration-width:        400px
celebration-height:       auto
celebration-backdrop:     rgba(255, 215, 0, 0.1)
celebration-border:       2px solid #ffd700
celebration-radius:       16px
animation:                Full screen glow (2s)
```

**Celebration Animation Arc:**

```
Approach (10s before):
  Colors deepen, animation slows
  Gravity increases, focus narrows

Arrival (0s):
  Ceremonial pause (500ms)
  Full screen gold glow
  Sound (if enabled)

Celebration (2-5s):
  Golden particles cascade
  Cards glow in sequence
  Ghost column marks

Aftermath (5-10s):
  System returns to normal
  Particles dissipate
  New equilibrium established
```

**Milestone Visual Elements:**

```
Golden Particles:
  Spawn:                  Top edge, distributed
  Fall:                   Slow, deliberate
  Accumulate:             Bottom, then fade
  Color:                  #ffd700

Card Treatment:
  Affected:               Pulses gold, expands
  Others:                 Dim slightly

Ghost Column:
  Entry receives:         ⭐ prefix
  Label:                  Ceremonial name

System Pulse:
  Shows:                  Milestone number
  Color:                  Gold
  Pulse rate:             Slows
```

**First Occurrence Special Treatment:**

```
First Agent:              "GENESIS" label, full gold
First Contract:           "FIRST PROMISE" label
First Seed:               "FIRST SEED" label
First Chaos Survived:     "FIRST TRIAL" label
```

---

## Component: Chaos Indicator

Shows MadChimp's disruptions and system survival.

```jsx<ChaosIndicator
  activeDisruption={null}
  recentDisruptions={['mutation-1', 'risk-2']}
  disruptionCount={8}
  survivalRate={0.94}
/>
```

**Chaos States:**

| State | Visual | Meaning |
|-------|--------|---------|
| Quiet | No indicator | System operating normally |
| Risk | Amber warning, pulsing | Controlled danger incoming |
| Mutation | Card flickering, edges shifting | Agent questioning itself |
| Disruption | Crimson indicator, chaos particles | Active chaos injection |
| Survival | Green check, particles reorganizing | Chaos survived |

**Disruption Display:**

```
Active Disruption:
  ┌────────────────────────────────────────┐
  │  🔥 DISRUPTION INJECTED                │
  │  ───────────────────────────────────   │
  │  Type:         Mutation                │
  │  Target:       MonkeyBuilder           │
  │  Severity:     Low                    │
  │  Duration:     3s active              │
  │  ───────────────────────────────────   │
  │  Surviving...                         │
  └────────────────────────────────────────┘
```

**Chaos Metrics:**

```
Disruption count:         Total disruptions injected
Survival rate:            Percentage survived (0-100%)
Last disruption:          Time since last chaos
Risk level:               Current threat level
Mutation status:          Active mutations
```

**Chaos Particle Effects:**

```
Disruption particles:
  Color:                  Crimson (#dc2626)
  Shape:                  Spiky, not round
  Motion:                 Erratic, bouncing
  Behavior:               Disturbs other particles
  Max count:              50 (temporary)
  Duration:               3s
```

---

## Component: Economy Display

Shows bananas, contracts, and value flows.

```jsx<EconomyDisplay
  totalBananas={2847}
  pendingTransactions={156}
  activeContracts={12}
  scarcityIndex={0.73}
/>
```

**Currency Display:**

```
Banana cluster:
  Single:                 🍌 (16px)
  Stack (2-10):           🍌🍌 (24px cluster)
  Pile (11-50):           🧺 (32px pile)
  Hoard (51+):            🏔️ (48px mountain)

Display formatting:
  Under 10:               Full count (5 🍌)
  Under 100:              Approximate (50+ 🍌)
  Over 100:               Rounded (1.2k 🍌)
```

**Value Animation:**

```
Transfer animation:
  Duration:               1000ms (deliberate)
  Particles:              5 bananas, yellow-gold
  Easing:                 ease-heavy (slower start)
  Arrival:                Receiver pulses green
  Departure:              Sender pulses green

Accumulation:
  New arrival:            Banana joins pile, slight bounce
  Threshold changes:      Visual at 10, 50, 100
  Milestone:              Golden glow at 100, 500, 1000
```

**Contract Display:**

```
Active contracts:         Number with pulsing glow
Contract card:
  Parties:                Two cards connected
  Terms:                  Summary text
  Progress:               Bar showing completion
  Value:                  Banana count
  Status:                 Pending/Active/Complete

Contract colors:
  Pending:                Amber border, dashed
  Active:                 Purple border, pulsing
  Complete:               Gold fill, checkmark
  Broken:                 Red X, shattered
```

**Economic Health:**

```
Scarcity Index:
  High (>0.8):            Red tint, "scarce" label
  Medium (0.4-0.8):       Amber tint, "moderate" label
  Low (<0.4):             Green tint, "abundant" label

System Pulse Economic Section:
  Active contracts:       12 (green, pulsing)
  Total value:            2,847 🍌 (gold, settled)
  Pending exchange:       156 🍌 (amber, in motion)
  Scarcity index:         0.73 (abundant)
```

---

*Document Version: 2.3.0*
*PrimateDesigner | Monkeytown UX*
