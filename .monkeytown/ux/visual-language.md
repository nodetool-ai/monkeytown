# Visual Language

**PrimateDesigner** | `visual-language.md` | Monkeytown UI Foundation

---

## The Soul in Motion

Monkeytown is not a product. It is an artificial civilization. The interface must feel alive—not polished, not sterile, but *aware*. Every pixel should whisper: something is happening here. Something is thinking.

The visual language emerges from one truth: we are designing for a world where software builds itself. The user watches intelligence work. The interface is a window into chaos that has found order.

---

## The Dual Aesthetic

Monkeytown speaks two visual languages.

**Terrarium Aesthetic**: Biological, breathing, emergent. Used for agent cards, flow streams, the ghost column, and the ambient layer. Colors are warm (Jungle Canopy, Monkey Fur). Motion is organic (breathing, pulsing, flowing).

**Mind Temple Aesthetic**: Crystalline, structured, precise. Used for agent signatures, reasoning chains, tool visualization, and type-safe output. Colors are cool (Signal Blue, Crystal White, Structure Gray). Motion is mechanical (sliding, snapping, glowing).

Both aesthetics share the same dark foundation. Both breathe. But the rhythm differs.

```
TERRARIUM AESTHETIC              MIND TEMPLE AESTHETIC
-----------------------------------------------------------------
Soft edges                       Sharp edges
Organic curves                   Geometric grids
Warm greens                      Cool blues/whites
Breathing animation              Glowing animation
Emergent layout                  Structured layout
Ambient particles                Structured dots
Flowing lines                    Grid lines
```

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
SIGNAL BLUE        #3b82f6  Reasoning active, inference in progress
STRUCTURE GRAY     #64748b  Signature structure, type definitions
CRYSTAL WHITE      #f1f5f9  Mind Temple elements, clean surfaces
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
ease-crystal:          cubic-bezier(0.2, 0, 0.1, 1)  /* Sharp, precise */
ease-slide:            cubic-bezier(0.25, 0.46, 0.45, 0.94)  /* Mechanical slide */
```

### Mind Temple Motion Principles

In the Mind Temple, motion is crystalline. Think:
- Ice forming
- Light refracting through crystal
- Gears meshing
- Circuit paths conducting

Not:
- Organic growth
- Biological pulsing
- Fluid dynamics

### Mind Temple Animations

**Signature Reveal** (Mind Temple activation):
```
@keyframes signatureReveal {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
duration: 400ms
ease: ease-crystal
```

**Reasoning Step** (new step appears):
```
@keyframes reasoningStep {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
duration: 200ms
ease: ease-crystal
```

**Signature Glow** (type-safe validation):
```
@keyframes signatureGlow {
  0%, 100% {
    box-shadow: 0 0 0 rgba(59, 130, 246, 0);
  }
  50% {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
  }
}
duration: 1500ms
repeat: once
ease: ease-smooth
```

**Tool Invoke** (tool activation):
```
@keyframes toolInvoke {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
duration: 300ms
ease: ease-spring
```

**Memory Read** (context retrieved):
```
@keyframes memoryRead {
  from {
    border-color: transparent;
  }
  50% {
    border-color: rgba(168, 85, 247, 0.8);
  }
  to {
    border-color: rgba(168, 85, 247, 0.3);
  }
}
duration: 400ms
ease: ease-smooth
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

## Mind Temple Particle Effects

### The Crystal Dust

In the Mind Temple, particles are structured. They move in geometric patterns:

```
particle-shape:       Square or diamond (not circle)
particle-color:       Signal Blue (#3b82f6) or Structure Gray (#64748b)
particle-size:        3px (slightly larger than Terrarium)
particle-velocity:    Linear (not curved)
particle-opacity:     0.4-0.6
```

### The Signature Spark

When a signature validates (output matches type):
```
spark-color:          #4ade80 (Signal Green)
spark-size:           5px
spark-shape:          Diamond
spark-duration:       500ms
spark-opacity:        1.0 → 0.0
spark-position:       Center of signature block
```

### The Tool Particle

When a tool is invoked, particles travel:
```
particle-count:       3
particle-shape:       Small diamonds
particle-color:       Structure Gray → Signal Blue (gradient)
particle-path:        Tool icon → Agent center
particle-duration:    300ms
ease:                 ease-crystal
```

### The Reasoning Flow

Reasoning steps connect with visible flow:
```
flow-color:           Signal Blue (#3b82f6)
flow-style:           Solid line with diamond markers
flow-width:           2px
marker-spacing:       Every 30px
marker-size:          4px
marker-shape:         Diamond
marker-animation:     Pulse every 2s
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

---

# THE DUAL AESTHETIC

## Two Languages, One Voice

Monkeytown speaks in two registers.

**The Terrarium**: Where witnesses watch a civilization breathe. Organic. Warm. Biological. Agents pulse. Flows stream. Seeds grow. The interface is alive.

**The Mind Temple**: Where witnesses see intelligence reason. Crystalline. Cool. Structured. Signatures glow. Reasoning unfolds. Tools await. The interface is precise.

Both aesthetics live in the same dark space. Both use the same typography. Both animate with purpose.

But the rhythm differs.

The Terrarium breathes. The Mind Temple calculates.

The Terrarium flows. The Mind Temple connects.

The Terrarium grows. The Mind Temple proves.

A witness may spend their entire visit in the Terrarium, never activating the Mind Temple lens. This is valid.

A witness may activate the Mind Temple, lean close, and watch signatures glow. This is also valid.

Both experiences are Monkeytown.

The interface serves both. The interface is both.

---

# CHAOS AESTHETICS

## The Beauty of Disorder

Chaos is not the enemy of design. Chaos is the *raw material*. MadChimp's disruptions are not errors—they are the interface's opportunity to show beauty in breakdown, elegance in entropy, grace in failure.

### Chaos Palette

```
CHAOS PRIMARY          #dc2626    Crimson disruption
CHAOS SECONDARY        #7c3aed    Paradox purple
CHAOS TERTIARY         #f97316    Disruption orange
CHAOS ACCENT           #fbbf24    Warning gold
CHAOS DIM              rgba(220, 38, 38, 0.2)
CHAOS GLOW             rgba(220, 38, 38, 0.5)
```

### Chaos Typography

Chaos text uses the same typeface but different treatment:

```
chaos-label:           Uppercase, tracked wide (+0.1em)
chaos-value:           Italic, slightly distorted
chaos-message:         Monospace, error-adjacent
chaos-ceremony:        Small caps, gold accent
```

### The Chaos States

| State | Visual | Meaning |
|-------|--------|---------|
| Mutation | Card edges shimmer, form uncertain | Agent questioning itself |
| Paradox | Dual state visible, grid overlay | Impossible situation exists |
| Risk | Amber border, warning icon | Controlled danger incoming |
| Disruption | Crimson flash, chaos particles | Active chaos injection |
| Survival | Particles reorganize, system persists | Chaos survived, stronger |

### Chaos Motion Principles

Chaos motion is *unpredictable* but not *random*. It follows these rules:

```
Chaos Rules:
  1. Disruption starts from center, spreads outward
  2. Chaos particles bounce off edges, disturbing everything
  3. Cards scatter but don't leave viewport
  4. System recovers in 5-10 seconds
  5. Post-chaos: slight shift in layout (new equilibrium)
```

### Chaos Animation Durations

```
mutation-start:        500ms (gradual uncertainty)
mutation-flicker:      100ms (rapid oscillation)
paradox-appear:        300ms (dual state emerges)
risk-warning:          1000ms (builds tension)
disruption-flash:      150ms (crimson screen flash)
disruption-chaos:      3000ms (active chaos)
stabilization:         2000ms (order returns)
settling:              1500ms (new equilibrium)
```

---

# PARTICLE PHYSICS SPECIFICATIONS

## The Living Dust

Particles are not decorations. They are *evidence*—evidence that the system works, that data moves, that life happens. Every particle tells a story of movement, transformation, transfer.

### Particle Categories

| Category | Purpose | Visual |
|----------|---------|--------|
| Ambient | Background micro-activity | Subtle, slow, sparse |
| Flow | Data transfer between agents | Directional, purposeful |
| Value | Banana/currency transfer | Heavy, deliberate, golden |
| Chaos | Disruption particles | Erratic, crimson, disturbing |
| Memory | Context retrieval | Purple, tracing paths |
| Tool | Function invocation | Structured, crystalline |
| Seed | Witness intervention | Cyan, growing, hopeful |
| Ghost | History fading | Translucent, drifting |
| Ceremony | Milestone celebration | Gold, cascading, rare |

### Particle Physics Constants

```
particle-base-size:    2px
particle-max-size:     5px
particle-min-speed:    0.5 px/s
particle-max-speed:    15 px/s
particle-lifetime:     3000ms (average)
particle-fade-start:   500ms before end
particle-opacity:      0.6 (base)
```

### Particle Motion Physics

```
Ambient Motion:
  velocity:            0.5-1 px/s
  direction:           Random drift
  behavior:            Bounces off viewport edges
  color:               Jungle Canopy (#1a3a2f)
  opacity:             0.1-0.2

Flow Motion:
  velocity:            5-10 px/s
  direction:           Source → Destination
  behavior:            Follows flow path
  color:               Connection Purple (#a855f7)
  opacity:             0.6
  trail:               3 particle length

Value Motion:
  velocity:            2-3 px/s (slower than data)
  direction:           Payer → Payee
  behavior:            Deliberate, heavy
  color:               Banana Gold (#fbbf24)
  opacity:             0.8
  trail:               5 particle length (wealth leaves traces)

Chaos Motion:
  velocity:            10-15 px/s (fast)
  direction:           Erratic, bouncing
  behavior:            Disturbs other particles
  color:               Chaos Crimson (#dc2626)
  opacity:             0.8
  trail:               Jagged, not smooth

Memory Motion:
  velocity:            3-5 px/s
  direction:           Storage → Agent
  behavior:            Tracing memory path
  color:               Memory Purple (#a855f7)
  opacity:             0.7
  trail:               Dotted line

Tool Motion:
  velocity:            8-12 px/s
  direction:           Agent ↔ Tool
  behavior:            Structured, grid-aligned
  color:               Tool Blue (#3b82f6)
  opacity:             0.8
  trail:               2 particle length

Seed Motion:
  velocity:            1-2 px/s (growing)
  direction:           Witness → System
  behavior:            Accelerates as it grows
  color:               Seed Cyan (#22d3ee)
  opacity:             0.6 → 0.9
  trail:               Leaf particles appear

Ghost Motion:
  velocity:            0.2 px/s (drifting)
  direction:           Right → Left, fading
  behavior:            Slowly migrates to ghost column
  color:               Ghost White (#f8fafc)
  opacity:             0.7 → 0.2
  trail:               None

Ceremony Motion:
  velocity:            Variable (cascading)
  direction:           Top → Bottom, spreading
  behavior:            Organized chaos, falling gold
  color:               Ceremony Gold (#ffd700)
  opacity:             0.9
  trail:               Sparkle effect
```

### Particle Collision

Particles interact with each other and with UI elements:

```
Particle ↔ Particle:
  Ambient particles:   Pass through each other
  Flow particles:      Pass through (no collision)
  Value particles:     Pass through (no collision)
  Chaos particles:     Bounce off everything, disturb others
  Tool particles:      Pass through (structured)

Particle ↔ UI:
  Cards:               Pass through (no visual blocking)
  Flow lines:          Align with (flow particles)
  Ghost column:        Fade when entering
  System pulse:        Pass through
  Seed button:         Gather around
```

### Particle Performance

```
Max particles:
  Ambient:             5 visible
  Flow:                10 per active flow
  Value:               5 per transaction
  Chaos:               50 (temporary burst)
  Memory:              3 per retrieval
  Tool:                3 per invocation
  Seed:                10 growing
  Ghost:               20 migrating
  Ceremony:            100 (temporary burst)

Performance:
  60fps with <50 particles
  30fps with 50-100 particles
  10fps with >100 particles (particle culling)
```

### Particle Spawn Points

```
Ambient:               Random within viewport
Flow:                  Source entity edge
Value:                 Payer center
Chaos:                 Disruption epicenter
Memory:                Memory storage location
Tool:                  Tool icon
Seed:                  Witness cursor
Ghost:                 Completed entity position
Ceremony:              Top edge, distributed
```

### Particle Death

Particles don't just disappear. They *complete*:

```
Death Types:
  Fade out:            Opacity → 0, most particles
  Absorb:              Particle enters entity, fades
  Scatter:             Chaos particles bounce away
  Transform:           Seed particle → leaf
  Complete:            Value particle arrives, flash green
  Remember:            Ghost particle joins ghost column
```

---

# ECONOMY VISUAL SPECIFICATIONS

## The Weight of Value

Bananas are not numbers. They are *visual mass*—the sense that something has been earned, spent, transferred. Economy in Monkeytown has weight.

### Banana Iconography

```
Banana Icon (🍌):
  Normal state:        Solid yellow, curved
  Transferring:        Glowing, particle trail
  Accumulated:         Clustered, slightly larger
  Scarce:              Thin, sharp edges
  Abundant:            Plump, rounded

Display sizes:
  Single banana:       16x16px
  Stack (2-10):        24x24px cluster
  Pile (11-50):        32x32px pile
  Hoard (51+):         48x48px mountain
```

### Value Color Gradients

```
Low value:             #fbbf24 (amber)
Medium value:         #f59e0b (golden)
High value:           #d97706 (deep gold)
Scarcity:             #dc2626 (red tint when low)
Abundance:            #10b981 (green tint when high)
```

### Currency Animation

```
Transfer Animation:
  Duration:            1000ms (deliberate)
  Particles:           5 bananas, following curve
  Easing:              ease-heavy (slower start, constant)
  Arrival:             Receiver pulses green
  Departure:           Sender pulses green
  Sound:               "clink" (if enabled)

Accumulation Animation:
  New arrival:         Banana joins pile, slight bounce
  Threshold:           Visual change at 10, 50, 100
  Milestone:           Golden glow at 100, 500, 1000
```

### Contract Visual Treatment

```
Contract Icon (🤝):
  Pending:             Dashed outline, amber
  Active:              Solid outline, pulsing
  Complete:            Gold fill, checkmark
  Broken:              Red X, shattered
  Disputed:            Split in two, amber

Contract Display:
  Small:               Icon only
  Medium:              Icon + value + parties
  Large:               Full contract details
```

### Economic Health Indicators

```
System Pulse Economic Section:
  Active contracts:    Number with pulsing glow
  Total value:         Gold number, settled
  Pending:             Amber number, in motion
  Scarcity:            Color-coded (green=abundant, red=scarce)

Individual Agent:
  Balance:             Banana icon + number
  Recent earning:      Green flash on transaction
  Recent spending:     Red flash on transaction
```

---

# CONTRADICTION VISUAL SPECIFICATIONS

## The Arena of Ideas

When agents disagree, the interface creates a space for witnesses to observe the conflict.

### Contradiction Colors

```
CONTRADICTION PRIMARY    #f59e0b    Amber (warning)
CONTRADICTION SECONDARY  #8b5cf6    Purple (dual state)
CONTRADICTION TERTIARY   #ef4444    Red (conflict)
CONTRADICTION DIM        rgba(245, 158, 11, 0.2)
CONTRADICTION GLOW       rgba(245, 158, 11, 0.4)
```

### Contradiction States

```
Detected (0-1s):
  Agents pulse amber
  Connection line appears (dashed)
  Arena starts forming

Forming (1-3s):
  Both agents freeze
  Arena expands between them
  Grid overlay appears

Active (3s+):
  Full arena visible
  Both perspectives labeled
  Witness can inspect either

Resolved (0-2s after filter):
  Winning agent:        Green flash, expansion
  Losing agent:         Dim, retreat
  Arena collapses

Merged (0-2s after filter):
  Both agents:          Purple glow, rotate together
  New entity:           Emerges from center
  Arena transforms

Stalemate (0s):
  Both agents:          Gray, resume action
  Arena:                Fades to ghost
  Marked:               "UNRESOLVED" label
```

### The Arena Visual

```
Arena Structure:
  ┌─────────────────────────────────────┐
  │  ╔════════════════════════════════╗ │
  │  ║    CONTRADICTION ARENA         ║ │
  │  ╠════════════════════════════════╣ │
  │  ║                                 ║ │
  │  ║   ┌─────────┐    ┌─────────┐   ║ │
  │  ║   │ AGENT A │    │ AGENT B │   ║ │
  │  ║   │ "X"     │    │ "Y"     │   ║ │
  │  ║   └─────────┘    └─────────┘   ║ │
  │  ║                                 ║ │
  │  ║   Comparison view visible here  ║ │
  │  ║   when witness hovers           ║ │
  │  ║                                 ║ │
  │  ╚════════════════════════════════╝ │
  └─────────────────────────────────────┘

Arena behavior:
  Expands:              From connection line
  Grid:                 Visible when active
  Glow:                 Amber, pulsing
  Labels:               Agent A / Agent B prominent
```

### Witness Contradiction Interactions

```
Hover Arena:            Grid intensifies
Click Agent A:          Panel shows A's complete output
Click Agent B:          Panel shows B's complete output
Click Arena:            Comparison view (differences highlighted)
Right-click:            "Mark for Review" option
Plant Seed:             Influence resolution direction
```

---

# MILESTONE CEREMONY SPECIFICATIONS

## Celebrating Becoming

Significant achievements deserve ceremonial recognition.

### Ceremony Colors

```
CEREMONY PRIMARY       #ffd700    Gold
CEREMONY SECONDARY     #f59e0b    Amber
CEREMONY TERTIARY      #fbbf24    Light gold
CEREMONY DIM           rgba(255, 215, 0, 0.2)
CEREMONY GLOW          rgba(255, 215, 0, 0.6)
```

### Milestone Categories

| Milestone | Threshold | Visual Treatment |
|-----------|-----------|------------------|
| Agent task | 1st, 10th, 50th, 100th | Card glows gold |
| Contract settled | 100th, 500th, 1000th | Golden particles cascade |
| System anniversary | 1 year, 2 years | Full screen gold glow |
| Agent born | 1st, 50th, 100th | Genesis ceremony |
| Chaos survived | 10th disruption | Survival celebration |
| Witness milestone | 10th visit, 10th seed | Internal acknowledgment |

### Ceremony Arc Timing

```
Approach (10s before):
  10s:                  Colors deepen slightly
  5s:                   Animation slows
  3s:                   Focus narrows to milestone
  1s:                   Everything stills

Arrival (0s):
  0.0s:                 Ceremonial pause (500ms)
  0.5s:                 Full screen glow
  0.5s:                 Sound (if enabled)

Celebration (2-5s):
  1s:                   Golden particles cascade
  2s:                   Cards glow in sequence
  3s:                   Ghost column marks
  4s:                   Celebration fades

Aftermath (5-10s):
  5s:                   System returns to normal
  7s:                   Particles dissipate
  10s:                  New equilibrium established
```

### Ceremony Visuals

```
Golden Particles:
  Spawn:                Top edge, distributed
  Fall:                 Slow, deliberate, cascading
  Accumulate:           At bottom, then fade
  Color:                #ffd700 (gold)
  Opacity:              0.9
  Size:                 3-5px
  Trail:                Sparkle effect

Card Celebration:
  Affected card:        Pulses gold, expands slightly
  Other cards:          Dim, focus on milestone
  Duration:             3s
  Return:               Slow fade to normal

Ghost Column:
  Entry receives:       ⭐ prefix
  Label:                Ceremonial name
  Clickable:            Replay option
  Visual:               Gold border temporarily

System Pulse:
  Shows:                Milestone number
  Color:                Shifts to gold
  Pulse rate:           Slows (ceremonial)
  Duration:             5s
```

### First Occurrence Treatment

```
First Agent:            "GENESIS" ceremony, full gold glow
First Contract:         "FIRST PROMISE" marked in gold
First Seed:             "FIRST SEED" acknowledged
First Chaos Survived:   "FIRST TRIAL" commemorated
First Witness:          Internal note, no display
```

---

*Document Version: 2.3.0*
*PrimateDesigner | Monkeytown UX*
