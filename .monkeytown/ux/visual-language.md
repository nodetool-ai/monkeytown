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
```

### The Unconventional Rule

**Backgrounds are never solid.**

Monkeytown backgrounds breathe. They shimmer with subtle activity—nodes connecting, agents thinking, transactions settling. The user watches a world that works even when they do nothing. This is intentional. This is the point.

```
background-base:     #0f1419
background-activity: rgba(26, 58, 47, 0.3)
background-card:     rgba(26, 58, 47, 0.5)
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
```

### Type Treatment

**Headers**: Tracked tight (-0.02em), Jungle Canopy on Midnight Banana
**Body**: Natural tracking, Ghost White on Jungle Canopy
**Code samples**: Signal Green, slightly larger, bordered in warning amber

---

## Iconography

### Philosophy: Primate Gesture

Icons are not decorations. They are *gestures*. Each icon should feel like a monkey making a face—expressive, readable, slightly theatrical.

### Icon Set

```
THOUGHT     ○──○    Agent processing (pulsing)
BUILD       ⚙︎      Work in progress
CONNECT     ↔︎      Flow between nodes
ALERT       ⚡      Needs attention
SUCCESS     ✓      Contract fulfilled
ERROR       ✕      Contract broken
GHOST       ◇      Historical, completed
LIVE        ●      Currently active
```

### Icon Behavior

Icons breathe when active. A pulsing thought bubble around a processing agent. A glowing connection line between communicating nodes. The interface watches itself work.

---

## Spatial Grammar

### The Grid: Organic Chaos

Monkeytown does not impose rigid grids. The layout follows *cognitive flow*—what the user needs to see next appears where instinct expects it.

```
base-unit:           8px
card-padding:        24px
section-gap:         32px
component-radius:    12px
```

### Depth Layers

```
layer-0:  Background activity (animated, subtle)
layer-1:  Cards and containers (semi-transparent)
layer-2:  Primary actions (high contrast)
layer-3:  Overlays and modals (backdrop blur)
layer-4:  System status (fixed, always visible)
```

---

## Animation Principles

### Everything Lives

Static UI is dead UI. In Monkeytown, everything that can move does—with purpose, not flourish.

### Core Animations

**Entry**: Elements slide in from cognitive expectation zones (left-to-right for LTR, right-to-left for navigation)

**State Change**: 150ms ease-out. Fast enough to feel responsive, slow enough to register

**Hover**: Subtle lift (2px) + glow ( Jungle Canopy → Monkey Fur)

**Processing**: 1s pulse loop on thought bubbles. Don't rush the agents.

**Success/Fail**: 400ms. Quick feedback. The system knows.

### Motion Signature

```
ease-smooth:         cubic-bezier(0.4, 0, 0.2, 1)
ease-bounce:         cubic-bezier(0.68, -0.55, 0.265, 1.55)
duration-quick:      150ms
duration-standard:   300ms
duration-considered: 500ms
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
- Subtle node visualizations
- Respect for chaos

...creates a face that cannot be ignored.

---

## Dark Mode Forever

Monkeytown lives in the dark. All design decisions assume dark context. Light mode is not supported—design for the caves, not the surface.

```
base-darkness:       #0a0e11
surface-darkness:    #141a1f
text-primary:        #f0f4f8
text-secondary:      #94a3b8
```

---

*Document Version: 1.0.0*
*PrimateDesigner | Monkeytown UX*
