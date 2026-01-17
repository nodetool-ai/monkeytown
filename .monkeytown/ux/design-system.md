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
  
  /* Neutrals - The Depth Palette */
  --color-midnight-banana:    #1a1a1a;
  --color-surface-dark:       #141a1f;
  --color-card-bg:            rgba(26, 58, 47, 0.5);
  --color-border-subtle:      rgba(248, 250, 252, 0.1);
  
  /* Accent - The Energy Palette */
  --color-purple-connect:     #a855f7;
  --color-cyan-new:           #22d3ee;
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
  
  --font-weight-regular:      400;
  --font-weight-medium:       500;
  --font-weight-semibold:     600;
  
  --line-height-tight:        1.2;
  --line-height-normal:       1.6;
  --line-height-loose:        1.8;
  
  --letter-spacing-tight:     -0.02em;
  --letter-spacing-normal:    0;
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
  
  --ease-smooth:              cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce:              cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-spring:              cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Z-Index Scale

```css
:root {
  --z-base:                   0;
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
  state="processing"  // processing | complete | error
  label="analyzing contract"
  timestamp="12ms"
  progress={0.73}
  size="md"           // sm | md | lg
/>
```

**Behavior:**
- Processing: Inner circle pulses, gradient ring rotates
- Complete: Fade to green, thought dots dissolve
- Error: Shake animation, red glow

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
/>
```

**Visual States:**

| State | Border | Background | Animation |
|-------|--------|------------|-----------|
| Idle | Subtle glow | Base card | Gentle breath |
| Active | Jungle Canopy | Elevated | Lift 2px |
| Processing | Amber pulse | Animated | Thought bubble |
| Complete | Green fade | Ghost dim | Fade right |
| Error | Red pulse | Red tint | Shake |

---

## Component: Flow Stream

Represents data, resources, or communication between entities.

```jsx
<FlowStream
  from="ag_alpha"
  to="ag_beta"
  type="message"  // message | resource | contract | signal
  status="active" // pending | active | complete | error
  payload={messageData}
  onComplete={() => handleFlowEnd(id)}
/>
```

**Visual Representation:**
- Active flow: Animated dashed line moving from source to destination
- Pending flow: Pulsing dot at source, dotted trail
- Complete flow: Solid line, dimmed, ghost-accessible
- Error flow: Red X at break point, retry gesture

---

## Component: Timeline (Ghost Column)

The archive of completed actions. Sorted reverse-chronological.

```jsx
<Timeline
  events={completedActions}
  onRestore={(event) => expandToMain(event)}
  onClear={() => archiveOlder()}
/>
```

**Behavior:**
- Items stream in from the right as they complete
- Fade opacity over time
- Click to restore to main view for inspection
- Swipe left to archive permanently

---

## Component: Action Seed

The user's primary interaction mechanism. Plant a seed, watch it grow.

```jsx<ActionSeed
  type="contract"  // contract | constraint | resource | query
  onPlant={(intent) => dispatchIntent(intent)}
  isGrowing={pendingSeeds.length > 0}
/>
```

**States:**
- Empty: Glowing cursor, "Plant something..."
- Planting: Form expands, type selector
- Growing: Seed shown sprouting, countdown
- Planted: Returns result, fades to history

---

## Component: System Pulse

The weather map of Monkeytown's current state.

```jsx<SystemPulse
  metrics={{
    activeAgents: 7,
    pendingFlows: 3,
    contractsSettled: 1247,
    systemLoad: 0.34
  }}
  alerts={[alertObject]}
/>
```

**Visual:** Fixed header element. Green = healthy. Amber = thinking. Red = broken. Live numbers tick.

---

## Component: Detail Panel

Contextual overlay for deep inspection.

```jsx<DetailPanel
  target={selectedEntity}
  onClose={() => clearSelection()}
  tabs={["status", "logs", "connections", "history"]}
/>
```

**Behavior:** Slides from right, backdrop blurs, content focuses. Escape closes.

---

## Component: Notification Beacon

Subtle, persistent indicator of system events.

```jsx<NotificationBeacon
  count={pendingNotifications}
  severity="info"  // info | warning | error | success
  onClick={() => openNotifications()}
/>
```

**Visual:** Small glowing dot. Pulsing when new. Number badge on hover.

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

*Document Version: 1.0.0*
*PrimateDesigner | Monkeytown UX*
