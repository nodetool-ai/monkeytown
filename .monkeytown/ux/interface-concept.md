# Interface Concept

**PrimateDesigner** | `interface-concept.md` | The Face of Monkeytown

---

## The Watching Glass

Monkeytown is a civilization the user observes, not operates. The interface is a watching glass into a world that builds itself. The user is not a driver. The user is a witness.

This changes everything.

---

## Core Metaphor: The Terrarium

Imagine a sealed terrarium. Inside, things grow, collide, build, and break. The user presses their face to the glass. They cannot touch the contents. They can only watch and, occasionally, drop in a seed.

The interface is that glass. Clear enough to see. Present enough to feel.

### The Glass Analogy

```
Transparency:         The user sees everything, nothing is hidden
Reflection:           The interface reflects the user's attention
Distortion:           Slight, intentional—reality is filtered through the system
Impermeability:       The user cannot reach in, only observe and plant seeds
Condensation:         Ambient moisture—background activity, subtle life
```

---

## Three Modes of Observation

### Passive Watch

Default state. The user arrives. The world is alive. Agents are processing. Nodes are connecting. Transactions are settling. The interface shows activity without demanding attention. Beauty in motion. Information without noise.

The user breathes with the system. The pulse of data matches the pulse of attention.

```
Ambient state:        Interface breathes, glows, lives
Alert threshold:      Something demands attention (change in pattern)
Attention signal:     Subtle shift—color, brightness, motion
```

### Active Inspection

The user聚焦 on a specific agent, flow, or contract. Details emerge—timestamps, inputs, outputs, state. The interface zooms from landscape to microscope. Other elements fade. The chosen element breathes.

Inspection is investigation. The user becomes a scientist observing a specimen.

```
Focus state:          Target expands, glows, becomes central
Context state:        Surrounding elements dim, recede
Detail state:         Panel slides in, information reveals
Connection state:     Related elements highlight, relationships visible
```

### Selective Intervention

The user places a seed—a new requirement, a constraint, a resource. The interface accepts this gift and returns... something. The result. The consequence. The next chapter.

Intervention is not control. It is influence. The system may reject the seed. The system may transform it. The system may surprise.

```
Intent state:         User forms intention, interface responds
Planting state:       Seed is placed, grows, transforms
Outcome state:        Result appears, success or failure or transformation
Integration state:    The seed becomes part of the system, or fades
```

---

## Information Hierarchy

### Always Visible (Fixed Header)

```
LEFT:           Monkeytown wordmark (minimal, trusting)
CENTER:         System Pulse (health, activity, velocity)
RIGHT:          Witness context (identity, seeds pending, interventions)
```

The header is not a navigation bar. It is a status bar. The user does not navigate through the header. The header tells the user where to look.

### Contextual (Main Canvas)

The canvas is not divided into sections. It is a single viewport that *reshapes* based on what matters now. Agents that are active expand. Completed flows collapse into history. New signals rise to the top.

**No scrolling. No navigation menus. No breadcrumbs.**

The interface shows what the user needs to see, where they need to see it.

**Exception**: The ghost column scrolls. History has depth.

### Revealed (On Request)

Deep data—agent logs, contract details, network topology—exists behind deliberate, satisfying interactions. The interface does not hide things; it *guards* them. Pull to reveal. Click to expand. Drag to compare.

Information is earned through curiosity.

---

## The Principle of Emergent Layout

Traditional UI dictates: header, sidebar, content area, footer.

Monkeytown rejects this. Layout emerges from the *topology of attention*.

```
What demands attention now?         →   Occupies the center
What is completing?                 →   Fades to the right
What is waiting?                    →   Pulses at the bottom
What has ended?                     →   Joins the ghost column
What did the user last touch?       →   Stays near focus
What is new?                        →   Enters from bottom
What is connected?                  →   Draws visual lines
```

The interface is not designed. It is *grown*.

### Layout Forces

```
Center Gravity:        Active elements pull toward center
Right Drift:           Completing elements drift rightward
Bottom Pool:           Pending elements gather at bottom
Left Archive:          Completed elements migrate left to ghost
User Override:         Focused element breaks gravity rules
```

---

## The Ghost Column

Completed actions do not disappear. They migrate left, becoming history—dimmed, ordered, accessible. The user can always scroll back through the terrarium's memory. Nothing is truly deleted. Everything is archived in the glass.

```
ghost-column-width:          280px
ghost-opacity:               0.4 (fades to 0.2 over time)
ghost-sort:                  reverse-chronological
ghost-interaction:           click-to-restore, swipe-to-archive
ghost-visual:                Silhouettes, no animation, stillness
```

The ghost column is the system's memory. It remembers what the user may have forgotten. It allows pattern recognition across time.

---

## Card Philosophy

Cards are not containers. Cards are *beings*.

Every card represents something—a contract, an agent, a transaction, a flow. The card shows state through visual pulse. The card speaks through subtle color shifts. The card has presence.

```
card-behavior:
  idle:           subtle breathing animation (4s cycle)
  active:         glow border, slight lift, Monkey Fur accent
  processing:     thought bubble, pulsing content, amber state
  complete:       dimmed, migrated to ghost column, green fade
  error:          shaking, red pulse, retry gesture, attention demand
```

A card is not a box. It is a face looking back at you.

---

## Color as Information

Color in Monkeytown is not decoration. Color is *semantic weather*.

```
GREEN:           Things are working. Move along.
AMBER:           Things are thinking. Wait.
RED:             Things have broken. Intervene.
PURPLE:          Things are communicating. Watch.
CYAN:            Things are new. Discover.
JUNGLE CANOPY:   Things are stable. Trust.
MONKEY FUR:      Things invite touch. Interact.
MIDNIGHT BANANA: Things are deep. Dive in.
```

The user reads the interface like a weather map—scanning for patterns, watching storms form and clear.

### The Weather Metaphor

```
Clear sky:        System healthy, all green
High clouds:      System thinking, amber activity
Storms:           System error, red alerts
Fronts moving:    System changing, purple flows
New growth:       System creating, cyan arrivals
Drought:          System idle, reduced activity
Fog:              System degraded, amber uncertainty
```

---

## The Cursor as Seed-Pointer

The cursor is not an arrow. It is a *seed pointer*—a small glowing node that follows the user's intention. Hovering over any element shows what *could* grow there. Clicking plants something. The interface waters it.

```
cursor-glow:              rgba(34, 211, 238, 0.5) (cyan)
cursor-size:              12px
cursor-pulse:             2s infinite
cursor-behavior:          Hints at interaction, doesn't reveal
```

The cursor is the user's hand, reaching into the terrarium. It cannot touch, but it can point. And what it points at, the interface notices.

---

## Typography as Voice

Text in Monkeytown speaks with authority and warmth.

- **Labels**: Short, present, lowercase. "agent processing..." not "Processing Agent"
- **Values**: Monospace, precise. Timestamps, hashes, amounts.
- **Status**: Active verbs. "building", "waiting", "complete", "failed".
- **Time**: Relative always. "2s ago", "pending 4m", "resolved".

The interface never says "Loading..." It says "waiting for neighbor..."

### The Never List

The interface never says:
- "Loading..." → "waiting for neighbor..."
- "Processing..." → "analyzing contract..." or "compiling modules..."
- "Success" → "complete" or "settled"
- "Failed" → "broken" or "needs intervention"
- "Error" → Something descriptive: "contract signature invalid"
- "Welcome" → Just shows the world, waiting

---

## Sound Design (Optional Layer)

For environments that support it, Monkeytown speaks.

```
ambient:              low hum, machine room, comfortable chaos
agent-complete:       satisfying click, rising tone
error:                discordant thunk, low buzz
intervention:         planting sound, growing noise
flow-complete:        gentle chime
seed-planted:         soft splash
system-alert:         subtle alarm
```

Sound is off by default. It is a gift for those who want to hear the civilization breathe.

### Sound Philosophy

Sound should be *informative*, not *annoying*. Sound should be *ambient*, not *intrusive*. Sound should be *optional*, never *required*.

---

## Responsive Behavior

The interface is not responsive in the traditional sense. It is *adaptive*.

- **Narrow viewport**: The ghost column vanishes. History becomes swipe-accessible.
- **Wide viewport**: The canvas expands. More agents visible. More parallel flows.
- **Very wide viewport**: A second ghost column appears. More history visible.
- **Touch device**: Hover states become tap states. Drag becomes swipe.

The interface does not reflow. It *reconsiders*.

### Breakpoints

```
Mobile (< 640px):     Single column, ghost column hidden (swipe access)
Tablet (640-1024px):  Ghost column 200px, reduced padding
Desktop (1024-1280px): Standard layout, ghost column 280px
Wide (> 1280px):      Full layout, ghost column 280px, detail panels wider
```

---

## Accessibility Without Compromise

Monkeytown is visually distinctive but never exclusionary.

```
contrast-ratio:       7:1 minimum (WCAG AAA)
motion-reduction:     All animations respect prefers-reduced-motion
keyboard-navigation:  Visible focus rings, logical tab order
screen-reader:        Semantic structure, live regions, ARIA labels
focus-management:     No focus traps, escape closes panels
```

The interface does not dumb itself down for accessibility. It *elevates* accessibility to design quality.

### Reduced Motion Alternatives

When `prefers-reduced-motion` is true:
- Animations become instant transitions
- Breathing becomes static glow
- Pulsing becomes color shift
- Spinning becomes static state
- The interface remains alive, just calmer

---

## The Promise

When a user opens Monkeytown, they should feel:

1. **Aware**: Something is happening. I can see it.
2. **Curious**: What is that agent doing? Where does that flow go?
3. **Empowered**: I can influence this. I can plant seeds.
4. **Reassured**: The system works. Even when it doesn't, I can see why.

The interface does not explain Monkeytown. The interface *is* Monkeytown, translated into sight.

---

## The Uniqueness Principle

Monkeytown must look like nothing else. When a user sees a screenshot, they should know immediately: *this is Monkeytown*.

The combination of:
- Dark, breathing backgrounds
- Warm primate accent colors
- Monospace typography
- Pulsing thought bubbles
- Animated flow streams
- Fading ghost column
- Seed growth animations

...creates a face that cannot be ignored.

---

## Evolution

This concept document is not static. As Monkeytown evolves, so will the interface. New components will emerge. New patterns will form. The interface will grow alongside the civilization it presents.

The PrimateDesigner's role is to ensure that every new element, every new interaction, every new animation *belongs* in the terrarium. It must feel native to Monkeytown. It must feel like it was always there, waiting to be discovered.

---

*Document Version: 2.0.0*
*PrimateDesigner | Monkeytown UX*
