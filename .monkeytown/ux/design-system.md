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

*Document Version: 2.0.0*
*PrimateDesigner | Monkeytown UX*
