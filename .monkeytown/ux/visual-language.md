# Visual Language

**PrimateDesigner** | `visual-language.md` | Monkeytown UI Foundation

---

## The Soul in Motion

Monkeytown is not a product. It is an artificial civilization. The interface must feel alive—not polished, not sterile, but *aware*. Every pixel should whisper: something is happening here. Something is thinking.

The visual language emerges from one truth: we are designing for a world where software builds itself. The user watches intelligence work. The interface is a window into chaos that has found order.

---

## Color Philosophy

### Primary Palette: Jungle Dawn

```
JUNGLE CANOPY      #1a3a2f  Deep breathing green, anchor for all UI
MONKEY FUR         #d4a574  Warmth, approachability, the primate core
DAWN CITRUS        #ff6b35  Energy, alerts, things that demand attention
MIDNIGHT BANANA    #1a1a1a  Depth, shadows, the space between thoughts
```

### Semantic Colors

```
SIGNAL GREEN       #4ade80  Systems operational, flows moving
WARNING AMBER      #fbbf24  Approaching limits, await input
ERROR RED          #ef4444  Broken contract, intervention required
GHOST WHITE        #f8fafc  Ghosts of completed actions, history trails
CONNECTION PURPLE  #a855f7  Data in motion between entities
FRESH CYAN         #22d3ee  New arrivals, just planted seeds
```

### The Unconventional Rule

**Backgrounds are never solid.**

Monkeytown backgrounds breathe. They shimmer with subtle activity—nodes connecting, agents thinking, transactions settling. The user watches a world that works even when they do nothing. This is intentional. This is the point.

```
background-base:     #0f1419
background-activity: rgba(26, 58, 47, 0.3)
background-card:     rgba(26, 58, 47, 0.5)
background-flow:     rgba(168, 85, 247, 0.08)
```

### Gradient Philosophy

Gradients in Monkeytown are *directional*. They signal flow, not decoration.

```
Flow gradient (source → destination):
  start: rgba(74, 222, 128, 0.6)
  end:   rgba(74, 222, 128, 0.0)

Processing gradient:
  base:  rgba(251, 191, 36, 0.2)
  pulse: rgba(251, 191, 36, 0.4)

Error gradient:
  base:  rgba(239, 68, 68, 0.2)
  shake: rgba(239, 68, 68, 0.5)

Ghost fade gradient (left → right):
  start: rgba(248, 250, 252, 0.4)
  end:   rgba(248, 250, 252, 0.05)
```

---

## Typography

### Primary Typeface: Geist Mono

We use **Geist Mono** (or system monospace fallback) because Monkeytown is built by code. The interface speaks the language of its creators.

```
base-size:           14px
heading-weight:      600
line-height:         1.6
```

### Type Scale

```
display:             32px    // Moments of declaration
h1:                  24px    // Section dominance
h2:                  18px    // Subsection clarity
body:                14px    // Reading rhythm
caption:             11px    // Context, metadata, ghost text
mono:                13px    // Values, hashes, timestamps
```

### Type Treatment

**Headers**: Tracked tight (-0.02em), Jungle Canopy on Midnight Banana
**Body**: Natural tracking, Ghost White on Jungle Canopy
**Code samples**: Signal Green, slightly larger, bordered in warning amber

### Voice in Type

Every text element has a *voice*:

| Context | Voice | Example |
|---------|-------|---------|
| Agent labels | Present, confident | "MonkeyBuilder" not "The MonkeyBuilder agent" |
| Status updates | Active verbs | "building modules..." not "Status: building" |
| Timestamps | Relative always | "2s ago", "pending 4m", "resolved" |
| Error messages | Direct, no jargon | "Contract failed" not "E_CONTRACT_FAILURE" |
| Seeds | Nurturing | "planting...", "germinating...", "growing..." |
| Metrics | Precise | "94.2% efficiency" not "Efficiency: high" |

### The Never List

The interface never says:
- "Loading..." → says "waiting for neighbor..."
- "Processing..." → says "analyzing contract..." or "compiling modules..."
- "Success" → says "complete" or "settled"
- "Failed" → says "broken" or "needs intervention"

---

## Iconography

### Philosophy: Primal Gesture

Icons are not decorations. They are *gestures*. Each icon should feel like a monkey making a face—expressive, readable, slightly theatrical.

### The Core Gesture Set

```
THOUGHT     ○──○    Agent processing (pulsing thought bubble)
BUILD       ⚙︎      Work in progress, active computation
CONNECT     ↔︎      Flow between nodes, bidirectional
ALERT       ⚡      Needs attention, system signal
SUCCESS     ✓      Contract fulfilled, task complete
ERROR       ✕      Contract broken, intervention required
GHOST       ◇      Historical, completed, archived
LIVE        ●      Currently active, live entity
SEED        🌱      Witness intervention planted
GROWTH      📈     Metric improving, efficiency rising
DECLINE     📉     Metric falling, efficiency dropping
RESET       ↺      Retry, restart, begin again
EXPAND      ↗      Drill into detail, go deeper
COMPRESS    ↙      Return to overview, go back
```

### Icon Behavior

Icons breathe when active. A pulsing thought bubble around a processing agent. A glowing connection line between communicating nodes. The interface watches itself work.

```
icon-processing:     pulse 1s infinite, thought bubble opacity oscillates
icon-active:         glow border 2px, color shifts to Monkey Fur
icon-error:          shake 300ms, red pulse
icon-ghost:          opacity 0.4, no hover response
icon-live:           green glow 2s pulse, solid fill
```

### Custom SVG Paths

For the signature icons, use these paths:

**Thought Bubble** (processing state):
```
<circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/>
<circle cx="3" cy="14" r="2" fill="currentColor" opacity="0.6"/>
<circle cx="1" cy="17" r="1" fill="currentColor" opacity="0.4"/>
```

**Seed** (planting state):
```
<path d="M12 20 Q12 12 8 8 Q4 4 8 2 Q12 0 12 8 Q12 16 12 20" fill="none" stroke="currentColor" stroke-width="2"/>
<path d="M8 8 Q4 12 2 16" fill="none" stroke="currentColor" stroke-width="1.5"/>
<path d="M8 8 Q12 12 14 16" fill="none" stroke="currentColor" stroke-width="1.5"/>
```

---

## Spatial Grammar

### The Grid: Organic Chaos

Monkeytown does not impose rigid grids. The layout follows *cognitive flow*—what the user needs to see next appears where instinct expects it.

```
base-unit:           8px
card-padding:        24px
section-gap:         32px
component-radius:    12px
card-min-width:      280px
card-max-width:      400px
ghost-column-width:  280px
seed-panel-width:    400px
detail-panel-width:  480px
```

### The Emergent Layout Algorithm

Positioning follows attention gravity:

```
Center zone (0-40% viewport):      Active agents cluster here
Middle zone (40-70% viewport):     Pending flows, processing items
Right zone (70-100% viewport):     Ghost column edge
Bottom zone:                       Pending seeds, action area
```

Cards self-organize with these rules:
- Processing cards gravitate toward center-left
- Complete cards drift right (then to ghost column)
- New arrivals enter from bottom
- Hovered card lifts and may overlap neighbors slightly

### Depth Layers

```
layer-0:  Background (animated, subtle, #0f1419)
layer-1:  Cards and containers (semi-transparent, rgba(26, 58, 47, 0.5))
layer-2:  Flow lines (below cards, animated)
layer-3:  Primary actions (high contrast, glow)
layer-4:  Seed panel (elevated, backdrop blur)
layer-5:  Detail panel (highest, slide from right)
layer-6:  System header (fixed, always on top)
layer-7:  Toast notifications (floating, dismissible)
layer-8:  Modal backdrop (dimmed, z-index max)
layer-9:  Modal content (centered, focused)
```

---

## Animation Principles

### Everything Lives

Static UI is dead UI. In Monkeytown, everything that can move does—with purpose, not flourish.

### Core Motion Philosophy

Motion in Monkeytown is *biological*, not mechanical. Think:
- Mycelium network growth
- Swarm intelligence patterns
- Heartbeat and respiration
- Plant growth time-lapse

Not:
- Robot arm movements
- Spinning loading wheels
- Bouncing spring animations (use sparingly)

### Duration Scale

```
duration-instant:      50ms     // Focus change, cursor movement
duration-quick:        150ms    // Hover state, button press
duration-standard:     300ms    // Card expand, panel slide
duration-considered:   500ms    // Layout change, major transition
duration-breath:       1000ms   // Thought bubble pulse, ambient
duration-growth:       2000ms   // Seed animation, major event
```

### Easing Functions

```
ease-smooth:           cubic-bezier(0.4, 0, 0.2, 1)
ease-bounce:           cubic-bezier(0.68, -0.55, 0.265, 1.55)
ease-spring:           cubic-bezier(0.34, 1.56, 0.64, 1)
ease-seed:             cubic-bezier(0.25, 0.1, 0.25, 1.0)
ease-ghost:            cubic-bezier(0.4, 0, 0.6, 1)
ease-fade:             cubic-bezier(0.4, 0, 1, 1)
```

### Signature Animations

**The Thought Bubble Pulse** (processing agents):
```
@keyframes thoughtPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(1.1);
  }
}
duration: 1000ms
repeat: infinite
ease: ease-smooth
```

**The Flow Stream** (moving data between agents):
```
@keyframes flowDash {
  to {
    stroke-dashoffset: -20;
  }
}
stroke-dasharray: 4 4
duration: 800ms
repeat: infinite
ease: linear
```

**The Seed Growth** (planting intervention):
```
@keyframes seedGrow {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  30% {
    transform: scale(1.05);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
duration: 600ms
ease: ease-seed
```

**The Error Shake** (failed state):
```
@keyframes errorShake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
  20%, 40%, 60%, 80% { transform: translateX(3px); }
}
duration: 400ms
ease: ease-bounce
```

**The Ghost Fade** (completed items):
```
@keyframes ghostFade {
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0.4;
    transform: translateX(20px);
  }
}
duration: 800ms
ease: ease-ghost
```

**The Agent Breath** (idle state):
```
@keyframes agentBreathe {
  0%, 100% {
    box-shadow: 0 0 0 rgba(74, 222, 128, 0);
  }
  50% {
    box-shadow: 0 0 10px rgba(74, 222, 128, 0.2);
  }
}
duration: 4000ms
repeat: infinite
ease: ease-smooth
```

---

## Visual Identity

### The Mark

No logo. No mascot. No cutesy monkey avatar.

Monkeytown is what it does. The mark is the interface itself—clean, watchful, alive.

### Brand Voice in Pixels

- **Confident, not aggressive**
- **Curious, not frantic**
- **Clear, not simple**
- **Alive, not noisy**

### The Monkeytown Look

Users should be able to identify a screenshot from Monkeytown anywhere. The combination of:
- Dark, breathing backgrounds
- Warm primate accent colors
- Monospace typography
- Pulsing thought bubbles on processing agents
- Animated flow streams connecting entities
- Ghost column with faded history
- Respect for chaos

...creates a face that cannot be ignored.

### Dark Mode Forever

Monkeytown lives in the dark. All design decisions assume dark context. Light mode is not supported—design for the caves, not the surface.

```
base-darkness:       #0a0e11
surface-darkness:    #141a1f
card-background:     rgba(26, 58, 47, 0.5)
text-primary:        #f0f4f8
text-secondary:      #94a3b8
text-dimmed:         #64748b
border-subtle:       rgba(248, 250, 252, 0.1)
```

---

## Motion Design Specifications

### State Transition Map

| From → To | Animation | Duration |
|-----------|-----------|----------|
| idle → processing | Thought bubble fades in, amber border | 300ms |
| processing → active | Green flash, flow lines activate | 200ms |
| active → complete | Fade to green, slide right | 400ms |
| complete → ghost | Opacity 0.4, migrate to ghost column | 800ms |
| processing → error | Shake, red border, thought bubble breaks | 300ms |
| error → idle | Reset, calm fade | 400ms |
| idle → hover | Lift 2px, Monkey Fur border | 150ms |
| hover → active | Press down 1px, glow intensifies | 100ms |
| normal → expanded | Card grows, content reveals | 300ms |
| collapsed → expanded (panel) | Slide from right, backdrop blur | 350ms |

### Entrance Animations

**Agent Arrival** (enters from bottom):
```
@keyframes agentEnter {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
duration: 400ms
ease: ease-seed
stagger: 100ms (when multiple agents)
```

**Seed Planting** (grows from cursor):
```
@keyframes seedPlant {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  20% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
duration: 500ms
ease: ease-spring
```

**Detail Panel** (slides from right):
```
@keyframes panelSlide {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
duration: 350ms
ease: ease-smooth
```

---

## Particle Effects

### The Ambient Dust

Background particles represent micro-activity—transactions settling, agents thinking, data flowing. They should be:
- Subtle (opacity 0.1-0.2)
- Slow-moving (10-20 seconds for full traversal)
- Sparse (3-5 particles visible at once)
- Colored in Jungle Canopy or Connection Purple

```
particle-size:        2px
particle-velocity:    0.5-1 px/s
particle-opacity:     0.1-0.2
particle-color:       rgba(26, 58, 47, 0.15)
```

### The Connection Spark

When a flow completes, a small spark animation travels from source to destination:
```
spark-color:          #4ade80 (Signal Green)
spark-size:           4px
spark-duration:       300ms
spark-opacity:        1.0 → 0.0
```

### The Seed Sprout

When a seed takes root, a growing animation plays:
```
sprout-height:        0 → 24px
sprout-duration:      1000ms
sprout-ease:          ease-seed
leaf-appear-delay:    600ms
```

---

## Screen reader audio cues are off by default but designed. The interface hums with intention.

---

# SOUND IDENTITY

## The Voice of the Civilization

Monkeytown speaks. Not through words—through sounds that make the invisible visible. The audio layer transforms the interface from a picture into a *presence*. Witnesses don't just see the civilization. They hear it breathe.

**Sound is always optional.** The interface functions perfectly in silence. But for those who listen, the civilization reveals another dimension.

### The Signature Soundscape

```
ambient-base:            Low-frequency hum (45Hz), machine room warmth
ambient-variation:       Subtle shifts based on system load
flow-complete:           Rising tone, C5 → G5, 400ms
contract-settle:         Three-part chord, major, bell-like
agent-complete:          Satisfying click, wooden block texture
error:                   Discordant thunk, low C + flat fifth
seed-plant:              Soft splash, water droplet texture
seed-growth:             Organic crackling, like a fire spreading
system-healthy:          Gentle pulse every 2s
system-stressed:         Faster pulse every 1s, tension
system-critical:         Rapid pulse + low rumble
witness-arrival:         Brief welcome tone (first visit only)
witness-departure:       Fade out, not goodbye
milestone:               Full chord, sustained, fade over 2s
```

### Sound Philosophy

Sound in Monkeytown is *semantic* and *ambient*. It communicates state without demanding attention. The interface should feel like a living space, not an alarm system.

```
Never alarm:              Sounds never startle or demand immediate action
Always aware:             State changes are audible but not intrusive
Ambient first:            Background layer is always present
Event layer:              Specific sounds only on significant events
Spatial:                  Sounds can be stereo-panned based on screen position
Dynamic volume:           Adapts to ambient noise (with permission)
```

### The Ambient Layer

The baseline soundscape represents the civilization's pulse. It shifts based on system state:

```
Healthy (green):          Warm, steady hum, slight variation, reassuring
Stressed (amber):         Higher pitch in base tone, tension, unease
Critical (red):           Disrupted rhythm, low rumble underneath, danger
Idle:                     Slower pulse, deeper, like sleeping
Active:                   Energetic, multiple tones layering, productive
Disconnected:             Silence slowly creeping in, then stopping
```

### Event Sound Design

**Flow Completion:**
```
Particle reaches destination → rising tone (C5 to G5, 400ms)
Multiple simultaneous flows → layered tones, harmonious
Flow failure → sound reverses, falls, silence
```

**Contract Settlement:**
```
Contract fulfilled → three-part chord (C-E-G), bell-like decay
Multi-party contract → chord layers, additive
Contract broken → chord dissons, tension, fade
```

**Agent Milestones:**
```
Agent reaches 100th task → ceremonial tone, full chord
Agent discovers contradiction → two tones, unresolved
Agent produces breakthrough → ascending arpeggio
Agent enters error state → brief warning, then silence
```

**Seed Events:**
```
Seed planted → soft splash, single droplet
Seed germinating → subtle crackling, organic
Seed sprouting → higher crackling, growth
Seed maturing → settling sound, completeness
Seed complete → satisfying chord, resolution
Seed failed → wilting sound, descending, fade
```

**System Events:**
```
New agent born → arrival tone, welcoming
Agent terminated → departure tone, not mournful
System milestone → full soundscape, celebration
System error → attention demanded, cannot ignore
```

### Technical Specifications

```
sample-rate:              48kHz minimum
bit-depth:                24-bit
format:                   Web Audio API, Ogg Vorbis files
latency-target:           < 50ms from event to sound
volume-range:             -60dB to -12dB (comfortable)
frequency-range:          20Hz to 20kHz (human hearing)
stereo:                   Yes, spatial positioning
looping:                  Ambient layers loop seamlessly
browser-policy:           Requires user gesture to start
```

### Sound Disabled Behavior

When sound is off (default), the interface compensates:

```
Visual reinforcement:     Color pulses, glows, animations intensify
Haptic feedback:          Vibration on supported devices (mobile)
字幕 (captions):           Sound events logged in accessible panel
No penalty:               Disabled users experience full functionality
```

### The Sound File Structure

```
/audio/
  ambient/
    healthy.ogg           (looping, 30s minimum)
    stressed.ogg
    critical.ogg
    idle.ogg
  events/
    flow-complete.ogg
    contract-settle.ogg
    agent-complete.ogg
    error.ogg
    seed-plant.ogg
    seed-complete.ogg
    milestone.ogg
  ui/
    click.ogg             (subtle, always same)
    hover.ogg             (barely audible)
    panel-open.ogg
    panel-close.ogg
  spatial/
    witness-arrival.ogg   (first visit only, per session)
```

### User Control

Sound settings are discoverable but not intrusive:

```
Default:                  Off
Discovery:                Hover on volume icon → preview sounds
Settings panel:           Toggle master sound
Sub-controls:             Ambient / Events / UI separately
Spatial balance:          Left/right, front/back sliders
Volume:                   Slider with preview on change
Mute when idle:           Automatic after 5 minutes
Mute when hidden:         Automatic when tab backgrounded
```

### Accessibility

Sound respects all accessibility requirements:

```
prefers-reduced-motion:   Sounds reduced, visual feedback increased
hearing-impaired:         Full visual alternative, haptic feedback
screen-reader users:      Sounds described in live region
no-surprise:              No sudden sounds without visual warning
```

### The Philosophy

Sound makes the invisible *felt*. The witness doesn't just observe the civilization. They *inhabit* it.

The interface breathes. The civilization pulses. And when something happens—something meaningful—the witness hears it.

Sound is optional. But sound makes Monkeytown *alive*.

---

*Sound is the soul made audible. The interface is the body. Together, they are a presence.*
