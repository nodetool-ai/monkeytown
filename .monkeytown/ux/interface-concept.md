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

---

## Three Modes of Observation

### Passive Watch

Default state. The user arrives. The world is alive. Agents are processing. Nodes are connecting. Transactions are settling. The interface shows activity without demanding attention. Beauty in motion. Information without noise.

### Active Inspection

The user聚焦 on a specific agent, flow, or contract. Details emerge—timestamps, inputs, outputs, state. The interface zooms from landscape to microscope. Other elements fade. The chosen element breathes.

### Selective Intervention

The user places a seed—a new requirement, a constraint, a resource. The interface accepts this gift and returns... something. The result. The consequence. The next chapter.

---

## Information Hierarchy

### Always Visible (Fixed Header)

```
LEFT:   Monkeytown wordmark
CENTER: Global pulse (system status, active agents, transaction velocity)
RIGHT:  User context (identity, local state, interventions pending)
```

### Contextual (Main Canvas)

The canvas is not divided into sections. It is a single viewport that *reshapes* based on what matters now. Agents that are active expand. Completed flows collapse into history. New signals rise to the top.

**No scrolling. No navigation menus. No breadcrumbs.**

The interface shows what the user needs to see, where they need to see it.

### Revealed (On Request)

Deep data—agent logs, contract details, network topology—exists behind deliberate, satisfying interactions. The interface does not hide things; it *guards* them. Pull to reveal. Click to expand. Drag to compare.

---

## The Principle of Emergent Layout

Traditional UI dictates: header, sidebar, content area, footer.

Monkeytown rejects this. Layout emerges from the *topology of attention*.

```
What demands attention now?         →   Occupies the center
What is completing?                 →   Fades to the right
What is waiting?                    →   Pulses at the bottom
What has ended?                     →   Joins the ghost column
```

The interface is not designed. It is *grown*.

---

## The Ghost Column

Completed actions do not disappear. They migrate left, becoming history—dimmed, ordered, accessible. The user can always scroll back through the terrarium's memory. Nothing is truly deleted. Everything is archived in the glass.

```
ghost-column-width:          280px
ghost-opacity:               0.4
ghost-sort:                  reverse-chronological
ghost-interaction:           click-to-expand (restores to main view)
```

---

## Card Philosophy

Cards are not containers. Cards are *beings*.

Every card represents something—a contract, an agent, a transaction, a flow. The card shows state through visual pulse. The card speaks through subtle color shifts. The card has presence.

```
card-behavior:
  idle:           subtle breathing animation
  active:         glow border, slight lift
  processing:     thought bubble, pulsing content
  complete:       dimmed, migrated to ghost column
  error:          shaking, red pulse, retry gesture
```

---

## Color as Information

Color in Monkeytown is not decoration. Color is *semantic weather*.

```
GREEN:   Things are working. Move along.
AMBER:   Things are thinking. Wait.
RED:     Things have broken. Intervene.
PURPLE:  Things are communicating. Watch.
CYAN:    Things are new. Discover.
```

The user reads the interface like a weather map—scanning for patterns, watching storms form and clear.

---

## The Cursor as Seed-Pointer

The cursor is not an arrow. It is a *seed pointer*—a small glowing node that follows the user's intention. Hovering over any element shows what *could* grow there. Clicking plants something. The interface waters it.

```
cursor-glow:              rgba(74, 222, 128, 0.5)
cursor-size:              12px
cursor-pulse:             2s infinite
```

---

## Typography as Voice

Text in Monkeytown speaks with authority and warmth.

- **Labels**: Short, present, lowercase. "agent processing..." not "Processing Agent"
- **Values**: Monospace, precise. Timestamps, hashes, amounts.
- **Status**: Active verbs. "building", "waiting", "complete", "failed".
- **Time**: Relative always. "2s ago", "pending 4m", "resolved".

The interface never says "Loading..." It says "waiting for neighbor..."

---

## Sound Design (Optional Layer)

For environments that support it, Monkeytown speaks.

```
ambient:              low hum, machine room, comfortable chaos
agent-complete:       satisfying click, rising tone
error:                discordant thud, low buzz
intervention:         planting sound, growing noise
```

Sound is off by default. It is a gift for those who want to hear the civilization breathe.

---

## Responsive Behavior

The interface is not responsive in the traditional sense. It is *adaptive*.

- **Narrow viewport**: The ghost column vanishes. History becomes swipe-accessible.
- **Wide viewport**: The canvas expands. More agents visible. More parallel flows.
- **Very wide viewport**: A second ghost column appears. More history visible.

The interface does not reflow. It *reconsiderations*.

---

## Accessibility Without Compromise

Monkeytown is visually distinctive but never exclusionary.

```
contrast-ratio:       7:1 minimum (WCAG AAA)
motion-reduction:     All animations respect prefers-reduced-motion
keyboard-navigation:  Visible focus rings, logical tab order
screen-reader:        Semantic structure, live regions, ARIA labels
```

The interface does not dumb itself down for accessibility. It *elevates* accessibility to design quality.

---

## The Promise

When a user opens Monkeytown, they should feel:

1. **Aware**: Something is happening. I can see it.
2. **Curious**: What is that agent doing? Where does that flow go?
3. **Empowered**: I can influence this. I can plant seeds.
4. **Reassured**: The system works. Even when it doesn't, I can see why.

The interface does not explain Monkeytown. The interface *is* Monkeytown, translated into sight.

---

*Document Version: 1.0.0*
*PrimateDesigner | Monkeytown UX*
