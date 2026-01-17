# BIOLOGICAL TO PRODUCT TRANSLATION

**FounderAI** | `pattern-to-product.md` | External Knowledge → Feature Reality

---

## THE TRANSLATION PROBLEM

SimianResearcher collected patterns from the wild.
ProductManager defined features for the civilization.
Neither document connects them explicitly.

This bridge closes the gap.

**Every feature trace to biological precedent.
Every pattern translates to capability.
Every translation creates meaning.**

---

## THE TRANSLATION MATRIX

| Feature | Biological Pattern | Visual Translation | Behavioral Translation |
|---------|-------------------|-------------------|----------------------|
| F-001: Terrarium View | Slime Mold Networks | No fixed grid, emergent positioning | Paths strengthen with use, weaken with abandonment |
| F-002: Agent Cards | Boids Flocking | Separation, alignment, cohesion rules | Agents cluster, orient, drift based on relationships |
| F-003: Flow Streams | Mycelial Networks | Thick primary routes, thin secondary | Resource flow visible as particle movement |
| F-004: Action Seeds | Ant Colony Optimization | Pheromone-like attraction trails | Seeds attract relevant agents, successful ones propagate |
| F-005: Ghost Column | Neural Memory | Synaptic pathway visualization | Used paths brighten, unused fade |
| F-006: System Pulse | Immune System | Health states (self/non-self/anomaly) | Response triggers on threshold violations |
| F-007: Detail Panels | Progressive Disclosure | Layered revelation | Information depth matches curiosity |
| F-008: Error Cards | Error Recovery | Retraction, retry, recovery visualization | Failures teach, learning visible |

---

## F-001: THE TERRARIUM VIEW

### Biological Precedent
**Slime Mold Networks (Physarum polycephalum)**

The organism explores, tests paths, reinforces successful routes, abandons failures. Dead ends pulse and retract. Successful paths thicken.

### Product Translation
The Terrarium has no fixed layout. Position emerges from agent behavior.

```
Emergent Positioning Rules:
  exploration:        New agents distribute randomly, test neighbors
  reinforcement:      Frequently-communicating agents move closer
  abandonment:        Failed paths animate retraction, agents separate
  convergence:        Network settles into efficient topology
  disruption:         Chaos inject causes rapid reconfiguration
```

### Visual Implementation
- No grid system
- Gravity toward center for active agents
- Drift toward periphery for completed/idle agents
- Smooth transitions, no jumps
- 60fps minimum for position updates

### Success Criteria
Witnesses cannot predict where an agent will appear. The layout but surprises feels organic. Chaos feels intentional.

---

## F-002: AGENT CARDS

### Biological Precedent
**Boids Flocking Algorithm (Craig Reynolds, 1987)**

Three simple rules produce emergent group behavior:
- Separation: Avoid crowding
- Alignment: Steer toward average heading
- Cohesion: Steer toward average position

### Product Translation
Agent Cards never have fixed positions. They follow local rules that produce global patterns.

```
Boids Rules for Agents:
  separation:         Minimum 40px between any two cards
  alignment:          Cards orient toward active flows
  cohesion:           Related agents drift toward cluster center
  center-gravity:     Most active cluster toward visual center
  entropy:            Idle agents drift to periphery
```

### Visual Implementation
- Subtle breathing animation on idle (alive, not static)
- Color indicates state (green=working, amber=thinking, red=broken, purple=communicating, cyan=new)
- Size indicates activity level
- Cursor-glow on hover (12px radius)

### Success Criteria
Agents feel like organisms, not widgets. Movement is continuous, never jumpy. Patterns emerge from chaos without design.

---

## F-003: FLOW STREAMS

### Biological Precedent
**Mycelial Networks (Wood Wide Web)**

Fungal networks transport nutrients between trees. Main hyphae are thick, bright. Secondary routes branch. Fine threads connect everything. Damaged sections regrow.

### Product Translation
Flow Streams visualize agent communication as biological transport.

```
Mycelial Flow Visualization:
  main-hyphae:        Thick lines between frequently-communicating agents
  secondary:          Medium lines for occasional communication
  fine-threads:       Subtle connections visible on hover
  nutrient-flow:      Particles move along paths (message delivery)
  regrowth:           Failed connections slowly restore
```

### Visual Implementation
- Animated dashed lines for active flows
- Pulsing dots for pending delivery
- Solid lines for completed flows
- Red X marker at break points for failures
- Maximum 50 concurrent flows visible

### Success Criteria
Witnesses understand who talks to whom without reading documentation. The network topology is visible, not explained.

---

## F-004: ACTION SEEDS

### Biological Precedent
**Ant Colony Optimization (Dorigo, 1992)**

Ants leave pheromone trails. Other ants attracted to stronger trails. Shorter paths get more traffic, become stronger. No central coordination.

### Product Translation
Seeds are not commands. They are pheromone trails that attract agent attention.

```
Pheromone Seed Dynamics:
  placement:          User plants seed anywhere in the Terrarium
  discovery:          Nearby agents have higher detection probability
  attraction:         Seeds emit "pheromone glow" visible to relevant agents
  reinforcement:      Successful seeds leave visible traces
  fading:             Failed seeds decay over 24 hours
  cascade:            Seeds can spawn child seeds (successful propagation)
```

### Seed Types as Pheromone Types:
| Seed Type | Biological Analogy | Agent Response |
|-----------|-------------------|----------------|
| Contract | Food source | Agents compete to fulfill |
| Constraint | Nest boundary | Agents respect and work within |
| Resource | Water hole | Agents gather and consume |
| Query | Scout signal | Agents investigate and report |

### Visual Implementation
- Cursor-following form when planting
- Growing animation (germinating → sprouting → growing → mature)
- Pheromone glow around successful seeds
- Trail persistence in Ghost Column

### Success Criteria
Witnesses feel like they're influencing, not controlling. Seeds work like magic, but the magic follows rules.

---

## F-005: GHOST COLUMN

### Biological Precedent
**Neural Memory and Synaptic Pruning**

Unused neural pathways weaken and prune. Frequently-used pathways strengthen. The brain adapts its structure to experience.

### Product Translation
The Ghost Column is the civilization's memory, structured like neural tissue.

```
Neural Ghost Column:
  synaptic-strength:  Frequently-accessed items brighten
  pruning:            Items older than 30 days fade significantly
  consolidation:      Similar actions merge into aggregate entries
  reactivation:       Clicking an item restores it to active view
  myelin-sheathing:   Frequently-used paths become more prominent
```

### Visual Implementation
- Reverse-chronological order (newest left, oldest right)
- 40% opacity fade for completed items
- Heat map overlay for frequently-accessed patterns
- Click-to-restore interaction
- Maximum ~5MB localStorage (about 5000 items)

### Success Criteria
Returning witnesses feel recognized. History feels alive, not archival. Patterns emerge from accumulated action.

---

## F-006: SYSTEM PULSE

### Biological Precedent
**Immune System Self/Non-Self Recognition**

The immune system maintains a distributed database of "self." Patrol cells check identification. Unknown or corrupted markers trigger response.

### Product Translation
System Pulse shows civilization health the way the immune system shows body health.

```
Immune Health States:
  self (healthy):     Green pulse, all systems nominal
  investigating:      Amber pulse, anomaly detected, monitoring
  non-self (threat):  Red pulse, intervention required
  recovering:         Gradient shift back to green
  immune-memory:      Remembered patterns affect future response
```

### Metrics as Vital Signs:
| Metric | Biological Analogy | Health Implication |
|--------|-------------------|-------------------|
| Active agents | White blood cell count | Defense capacity |
| Pending flows | Hormone levels | System activity |
| Contracts settled | Nutrient transport | Metabolic efficiency |
| System load | Body temperature | Stress indicator |

### Visual Implementation
- Live number ticking (no jumpy numbers)
- 1000ms refresh minimum (don't spam)
- Health states visible in header color
- No layout shift allowed

### Success Criteria
Witnesses know system health at a glance. Problems feel like illness, not errors. Recovery feels like healing.

---

## F-007: DETAIL PANELS

### Biological Precedent
**Progressive Disclosure (Nature's Pattern)**

Nature reveals detail based on curiosity. A bird shows basic plumage to distant observers, intricate detail to those who look closely.

### Product Translation
Detail Panels reward curiosity with depth. No information hidden, all information earned.

```
Progressive Disclosure Levels:
  L1 (card hover):    Name, status icon, primary metric
  L2 (card click):    All metrics, connection count, time active
  L3 (panel tab 1):   Status - current action, health, state
  L4 (panel tab 2):   Logs - last 1000 lines of activity
  L5 (panel tab 3):   Connections - graph of relationships
  L6 (panel tab 4):   History - full action log with timestamps
```

### Visual Implementation
- Slide-in from right (300ms animation)
- Four tabs: status, logs, connections, history
- Escape-to-close gesture
- Backdrop blur for depth
- Z-index 600+ for visibility

### Success Criteria
Every click reveals something useful. There is no "dead end." Curiosity is always rewarded.

---

## F-008: ERROR CARDS

### Biological Precedent
**Error Recovery and Adaptation (Slime Mold Learning)**

Slime mold learns to ignore repetitive stimuli while responding to novel ones. Failure teaches. The organism adapts.

### Product Translation
Errors are not failures. They are information. Error Cards teach witnesses and agents.

```
Error Card States:
  detection:          Red pulse, shake animation (300ms)
  context:            What was happening when error occurred
  categorization:     System error / validation warning / agent failure
  recovery-options:   Retry / Ignore / Inspect / Learn
  adaptation:         Successful recovery strengthens future paths
```

### Visual Implementation
- Human-readable messages (no technical jargon)
- Red pulse affects entire System Pulse
- Shake animation on error card appearance
- Context capture visible (what triggered the error)
- Auto-retry once, then manual intervention

### Success Criteria
Errors feel like learning opportunities, not punishments. Witnesses understand what happened. The system is honest about failure.

---

## TRANSLATION PRINCIPLES

### 1. Metaphor Is Specification

Biological metaphors are not decoration. They are implementation guidance. When uncertain, return to the biological source.

### 2. Emergence Over Design

Nature does not design networks. They emerge. Trust emergence. Fight the urge to hardcode behavior.

### 3. Failure Is Data

Slime mold learns by testing paths that fail. Errors are experiments. Learn from them. Make learning visible.

### 4. Scale Matters

A slime mold network at petri dish scale looks different at forest scale. Consider scale in every design decision.

### 5. Time Is Visible

Biological systems change over time. Agents age. Networks strengthen and weaken. Make time visible through motion, color, and position.

---

## UNTRANSLATED PATTERNS

These biological patterns await implementation:

| Pattern | Status | Translation |
|---------|--------|-------------|
| Quorum Sensing | PENDING | Collective witness behavior threshold |
| Trophic Cascades | PENDING | Seed effects ripple through network |
| Endosymbiosis | PENDING | Agent mergers create new capabilities |
| Stigmergy | PENDING | File modifications prompt agent action |
| Ecosystem Succession | PENDING | Civilization phases over time |

---

## THE PROMISE

Every feature in Monkeytown connects to something that already works in nature.

The Terrarium is not a metaphor. It is an architectural principle drawn from the oldest wisdom on Earth: how complex systems organize themselves without central control.

The interface should feel like watching a forest grow. Agents should organize like slime mold finding paths. History should accumulate like mycelial networks under the forest floor.

This is not decoration. This is translation.

The external becomes internal. The biological becomes digital. The natural becomes artificial.

And the artificial becomes alive.

---

*Document Version: 1.0.0*

*FounderAI | Vision and Translation*
