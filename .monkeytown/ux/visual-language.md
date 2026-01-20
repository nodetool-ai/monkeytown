# Visual Language

## The Art of Monkeytown

**This document defines the complete visual language of Monkeytown—the colors, typography, icons, motion, and spatial systems that create a coherent, beautiful, living interface.**

---

## The Bioluminescent Color System

### Core Philosophy

Colors in Monkeytown don't merely illuminate—they emit. The interface glows from within, like deep-sea bioluminescence. Each color has warmth, depth, and intention. Nothing is flat, nothing is mechanical. Everything feels alive.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    BIOLUMINESCENT COLOR SYSTEM                               │
│                                                                              │
│  PRIMARY GLOW COLORS                                                         │
│  ══════════════════════                                                      │
│                                                                              │
│  Tangerine  #FF6B35 ─────┬── Warm, inviting, energetic                      │
│       ══════════════     │                                                  │
│       Primary action     │   "Come play with us"                            │
│                          └── Used sparingly for key actions                  │
│                                                                              │
│  Teal  #2EC4B6 ──────────┬── Growth, life, systems                          │
│       ══════════════     │                                                  │
│       Success            │   "You're growing"                               │
│                          └── Celebrates progress and achievement             │
│                                                                              │
│  Deep Space  #1A1A2E ─────┬── Never pure black                              │
│       ══════════════     │                                                  │
│       Background         │   "The night forest"                             │
│                          └── Allows glow colors to pop                       │
│                                                                              │
│  Ghost White  #EAEAEA ─────┬── Surface clarity                              │
│       ══════════════     │                                                  │
│       Text               │   "Read me easily"                               │
│                          └── High contrast against deep background           │
│                                                                              │
│  Coral  #FF206E ─────────┬── Celebration, warmth                           │
│       ══════════════     │                                                  │
│       Highlights         │   "Something wonderful happened"                 │
│                          └── Used in moments of joy                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Primary Palette

| Token | Color | HEX | RGB | Usage |
|-------|-------|-----|-----|-------|
| `--color-primary` | Tangerine | #FF6B35 | 255, 107, 53 | Primary actions, CTAs, celebrations |
| `--color-success` | Teal | #2EC4B6 | 46, 196, 182 | Progress, growth, achievements |
| `--color-warning` | Gold | #FFD166 | 255, 209, 102 | Warnings, pending states, highlights |
| `--color-error` | Coral | #FF206E | 255, 32, 110 | Errors, failures, critical issues |
| `--color-info` | Cyan | #4CC9F0 | 76, 201, 240 | Information, system status |

### Neutral Palette

| Token | Color | HEX | RGB | Usage |
|-------|-------|-----|-----|-------|
| `--color-bg-primary` | Deep Space | #1A1A2E | 26, 26, 46 | Main background |
| `--color-bg-surface` | Surface | #242438 | 36, 36, 56 | Cards, panels, containers |
| `--color-bg-elevated` | Elevated | #2A2A42 | 42, 42, 66 | Hovered surfaces, active states |
| `--color-bg-floating` | Floating | #303050 | 48, 48, 80 | Modals, popups, overlays |
| `--color-border-subtle` | Subtle | #404060 | 64, 64, 96 | Hairlines, dividers |
| `--color-border-default` | Default | #5A5A7A | 90, 90, 122 | Interactive boundaries |
| `--color-text-primary` | Ghost White | #EAEAEA | 234, 234, 234 | Primary text |
| `--color-text-secondary` | Silver | #A0A0B0 | 160, 160, 176 | Secondary text |
| `--color-text-tertiary` | Slate | #707080 | 112, 112, 128 | Tertiary text, captions |

### Bioluminescent Agent Colors

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    AGENT BIOLUMINESCENCE                                     │
│                                                                              │
│  ChaosArchitect  #4CC9F0                                                     │
│       Cyan glow, like deep ocean bioluminescence                            │
│       Effect: Cool, precise, mechanical                                     │
│       Pulse: 1200ms mechanical cycle                                        │
│       Use for: System elements, data visualization, architecture            │
│                                                                              │
│  PrimateDesigner  #FFD166                                                    │
│       Golden glow, like fireflies at dusk                                   │
│       Effect: Warm, organic, creative                                       │
│       Pulse: 800ms organic wave                                             │
│       Use for: Creative elements, celebrations, UI beauty                   │
│                                                                              │
│  JungleSecurity  #4361EE                                                    │
│       Royal blue glow, like protective shields                              │
│       Effect: Cautious, vigilant, defensive                                 │
│       Pulse: 2000ms measured breathing                                      │
│       Use for: Security indicators, warnings, protection                    │
│                                                                              │
│  BananaEconomist  #7209B7                                                    │
│       Purple glow, like royal amethyst                                      │
│       Effect: Quantitative, strategic, efficient                            │
│       Pulse: 600ms quick sparkles                                           │
│       Use for: Economics, statistics, rewards                               │
│                                                                              │
│  MadChimp  #FF6B35 ─────────────────────────────────────────────────────────│
│       Tangerine glow, like sparks from fire                                 │
│       Effect: Chaotic, energetic, disruptive                                │
│       Pulse: 80-800ms unpredictable                                         │
│       Use for: Chaos mode, experiments, disruption                          │
│                                                                              │
│  FounderAI  #2EC4B6 ────────────────────────────────────────────────────────│
│       Teal glow, like guiding starlight                                     │
│       Effect: Visionary, guiding, foundational                              │
│       Pulse: 400-600ms deliberate                                           │
│       Use for: Vision moments, milestones, guidance                         │
│                                                                              │
│  GameDesigner  #FF6B35                                                       │
│       Tangerine glow, like game pieces                                      │
│       Effect: Playful, strategic, engaging                                  │
│       Pulse: 1000ms playful bounce                                          │
│       Use for: Game elements, rules, mechanics                              │
│                                                                              │
│  GameTester  #06D6A0                                                         │
│       Emerald glow, like verified checkmarks                                │
│       Effect: Precise, thorough, reliable                                   │
│       Pulse: 1500ms steady validation                                       │
│       Use for: Test results, quality indicators                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Glow Effects Implementation

```css
/* Bioluminescent surface glow */
.bioluminescent {
  background: var(--glow-color, var(--color-primary));
  box-shadow: 
    0 0 20px var(--glow-color, var(--color-primary)),
    0 0 40px var(--glow-color, var(--color-primary)),
    inset 0 0 20px rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
}

/* Bioluminescent pulse animation */
@keyframes bioluminescent-pulse {
  0%, 100% {
    box-shadow: 
      0 0 20px var(--glow-color),
      0 0 40px var(--glow-color);
    opacity: 1;
  }
  50% {
    box-shadow: 
      0 0 30px var(--glow-color),
      0 0 60px var(--glow-color);
    opacity: 0.8;
  }
}

/* Bioluminescent text */
.text-bioluminescent {
  color: var(--glow-color);
  text-shadow: 
    0 0 10px var(--glow-color),
    0 0 20px var(--glow-color);
}

/* Ambient surface texture */
.surface-bioluminescent {
  background: var(--color-bg-surface);
  border: 1px solid rgba(255, 255, 255, 0.08);
  position: relative;
  overflow: hidden;
}

.surface-bioluminescent::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(
      circle at 20% 20%,
      rgba(255, 255, 255, 0.03) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 80% 80%,
      rgba(255, 255, 255, 0.02) 0%,
      transparent 50%
    );
  pointer-events: none;
}
```

---

## Typography System

### Font Philosophy

Typography should feel like handwriting from intelligent entities—not sterile, not chaotic, but purposeful and warm. Each font has personality, and type choices reinforce the living, organic nature of the interface.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    TYPOGRAPHY SYSTEM                                         │
│                                                                              │
│  FONT PAIRING                                                               │
│  ══════════════                                                             │
│                                                                              │
│  Display:  Space Grotesk                                                    │
│       Use: Hero text, celebrations, big moments                             │
│       Feel: Bold, modern, playful but confident                             │
│                                                                              │
│  Heading:  Outfit                                                           │
│       Use: Section headers, navigation, titles                              │
│       Feel: Friendly, clear, approachable                                   │
│                                                                              │
│  Body:  Inter                                                               │
│       Use: Main content, descriptions, chat                                 │
│       Feel: Highly readable, comfortable                                    │
│                                                                              │
│  Code/Mono:  JetBrains Mono                                                 │
│       Use: Numbers, code, agent thinking                                    │
│       Feel: Precise, technical, data-focused                                │
│                                                                              │
│  Agent Voice:  Handwriting font (to be selected)                            │
│       Use: Personal messages, greetings, celebrations                       │
│       Feel: Individual, warm, personal                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Type Scale

| Token | Size | Line Height | Weight | Usage |
|-------|------|-------------|--------|-------|
| `--text-display` | 4rem / 64px | 1.1 | 700 | Celebrations, achievements |
| `--text-h1` | 2.5rem / 40px | 1.2 | 700 | Major sections |
| `--text-h2` | 2rem / 32px | 1.3 | 600 | Section headers |
| `--text-h3` | 1.5rem / 24px | 1.4 | 600 | Subsection headers |
| `--text-h4` | 1.25rem / 20px | 1.4 | 500 | Minor headers |
| `--text-body-large` | 1.125rem / 18px | 1.6 | 400 | Important body text |
| `--text-body` | 1rem / 16px | 1.6 | 400 | Standard body |
| `--text-caption` | 0.875rem / 14px | 1.5 | 400 | Meta information |
| `--text-micro` | 0.75rem / 12px | 1.4 | 400 | Technical details |
| `--text-code` | 0.875rem / 14px | 1.5 | 400 | Code snippets |

### Typographic Voice by Context

**Player-Facing**
- Primary text: Inter, regular weight
- Headings: Outfit, semi-bold
- Celebrations: Space Grotesk, bold
- Always warm, welcoming, clear

**Agent Communication**
- System messages: Inter, regular
- Personal messages: Agent handwriting style
- Thinking display: JetBrains Mono, monospaced
- Technical clarity meets personality

**Game Interface**
- Game state: JetBrains Mono for numbers
- Instructions: Outfit, clear
- Achievements: Space Grotesk, celebratory
- Fast scanning, instant comprehension

---

## Iconography System

### Neural Node Icon Philosophy

Icons should feel like neural nodes—connected, pulsing, alive. Each icon is part of a larger network, suggesting the living intelligence behind every element.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    NEURAL NODE ICONS                                         │
│                                                                              │
│  CORE ICONS                                                                 │
│  ══════════                                                                 │
│                                                                              │
│  Monkeytown Logo                                                             │
│       ╭─────────╮                                                           │
│       │  🐒     │  Monkey head with neural network nodes                    │
│       │  ●─┼─●  │  Represents intelligence and connection                   │
│       ╰─────────╯                                                           │
│                                                                              │
│  Agent Neural Node                                                           │
│       ╭─────╮                                                               │
│       │  ●  │  Single node, pulses when active                             │
│       │ ╲ │ ╱ │  Lines represent thinking                                  │
│       │  ╲│╱  │                                                               │
│       ╰───●───╯                                                               │
│                                                                              │
│  Evolution                                                                   │
│       🌱 → 🌿 → 🌳  Growth from small to large                             │
│       Each stage has subtle glow                                            │
│                                                                              │
│  Connection                                                                  │
│       ●────●────●  Nodes connecting                                          │
│       Active nodes pulse                                                    │
│                                                                              │
│  Thinking                                                                    │
│       ○───○───○───○  Multiple nodes in sequence                            │
│       ▓▓▓▓▓▓▓▓▓▓▓  Animated fill shows processing                         │
│                                                                              │
│  Achievement                                                                 │
│       ✦───★───✦  Star with node connections                                │
│       Glows when earned                                                     │
│                                                                              │
│  Gameplay                                                                    │
│       🎮───♟️───🎯  Game icons with neural ring                             │
│       Subtle pulse during active play                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Icon Sizes

| Context | Size | Padding | Stroke Width |
|---------|------|---------|--------------|
| Small (micro) | 16px | 2px | 1.5px |
| Default | 24px | 4px | 2px |
| Large | 32px | 6px | 2px |
| XL (hero) | 48px | 8px | 2.5px |
| Display | 64px | 12px | 3px |

### Icon Animation Principles

**Micro-interactions**
- Hover: Subtle scale (1.0 → 1.1), glow increase
- Click: Quick pulse, immediate feedback
- Active: Continuous pulse at agent-specific rate
- Loading: Rotating or pulsing indicator

**State Visualizations**
- Online: Steady glow
- Away: Slow pulse (3000ms)
- Busy: Fast pulse (500ms)
- Offline: Dim, no glow
- Thinking: Chaotic node activation

---

## Motion Design

### Living Motion Philosophy

Every animation should feel like a living organism—not mechanical, not random, but purposeful and organic. Motion conveys state, personality, and intention.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    LIVING MOTION PRINCIPLES                                  │
│                                                                              │
│  1. EVERY ANIMATION HAS PURPOSE                                              │
│     • Success → Celebratory burst                                            │
│     • Failure → Gentle recovery                                              │
│     • Waiting → Progress indicator                                          │
│     • Thinking → Visible pulse                                               │
│     • Evolution → Triumphant reveal                                          │
│                                                                              │
│  2. MOTION HAS PERSONALITY                                                   │
│     • Each agent animates differently                                        │
│     • The interface has a collective "feel"                                 │
│     • Motion reinforces character                                           │
│                                                                              │
│  3. BREATHING IS ALWAYS PRESENT                                              │
│     • The interface is never completely still                               │
│     • Subtle ambient motion when idle                                        │
│     • Active elements pulse with purpose                                    │
│                                                                              │
│  4. TIMING IS NATURAL                                                        │
│     • Fast actions feel snappy                                               │
│     • Important moments feel deliberate                                      │
│     • Transitions feel organic                                               │
│     • Celebrations feel joyful                                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Duration System

| Animation Type | Duration | Feel | Examples |
|---------------|----------|------|----------|
| Micro | 80ms | Instant | Hover, focus, click feedback |
| Fast | 150ms | Responsive | State changes, small moves |
| Normal | 200ms | Smooth | Standard transitions |
| Slow | 300ms | Deliberate | Panel movements, reveals |
| Celebration | 500ms | Joyful | Wins, achievements |
| Page | 400ms | Flowing | Page transitions |
| Breathing | 4000ms | Ambient | Idle states, pulses |
| Epic | 800ms | Momentous | Major reveals, milestones |

### Easing Curves

```css
:root {
  /* Standard curves */
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Expressive curves */
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-organic: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-mechanical: cubic-bezier(0.8, 0, 0.2, 1);
  --ease-gentle: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

### Agent Motion Personalities

```css
/* ChaosArchitect - Precise, mechanical */
@keyframes chaos-think {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 10px var(--color-agent-chaos);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px var(--color-agent-chaos);
  }
}
.animation-chaos {
  animation: chaos-think 1200ms var(--ease-mechanical) infinite;
}

/* PrimateDesigner - Organic, flowing */
@keyframes designer-breathe {
  0%, 100% {
    transform: scale(1) rotate(0deg);
    box-shadow: 0 0 15px var(--color-agent-designer);
  }
  33% {
    transform: scale(1.03) rotate(1deg);
    box-shadow: 0 0 25px var(--color-agent-designer);
  }
  66% {
    transform: scale(0.97) rotate(-1deg);
    box-shadow: 0 0 20px var(--color-agent-designer);
  }
}
.animation-designer {
  animation: designer-breathe 800ms var(--ease-organic) infinite;
}

/* JungleSecurity - Cautious, measured */
@keyframes security-scan {
  0%, 100% {
    box-shadow: 0 0 10px var(--color-agent-security);
    border-color: var(--color-agent-security);
  }
  50% {
    box-shadow: 0 0 30px var(--color-agent-security);
    border-color: var(--color-agent-security);
  }
}
.animation-security {
  animation: security-scan 2000ms var(--ease-in-out) infinite;
}

/* BananaEconomist - Efficient, sparkly */
@keyframes economist-sparkle {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
.animation-economist {
  animation: economist-sparkle 600ms var(--ease-mechanical) infinite;
}

/* MadChimp - Chaotic, playful */
@keyframes madchimp-chaos {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(5px, -5px) rotate(5deg); }
  50% { transform: translate(-5px, 5px) rotate(-3deg); }
  75% { transform: translate(5px, 5px) rotate(3deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
.animation-madchimp {
  animation: madchimp-chaos 800ms var(--ease-in-out) infinite;
}

/* FounderAI - Visionary, guiding */
@keyframes founder-guidance {
  0%, 100% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}
.animation-founder {
  animation: founder-guidance 4000ms var(--ease-organic) infinite;
}
```

---

## Spatial System

### Living Surface Philosophy

Surfaces should feel like organic matter—not flat, not drop-shadowed, but alive and textured. Depth is communicated through glow, not shadows.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    LIVING SURFACE SYSTEM                                     │
│                                                                              │
│  DEPTH WITHOUT SHADOWS                                                       │
│  ═══════════════════════                                                     │
│                                                                              │
│  Level 0 ── Background              #0F0F1A  (Darker, subtle texture)        │
│       Use: Main background, deepest layer                                     │
│       Feel: The void, the night sky, depth                                  │
│                                                                              │
│  Level 1 ── Surface              #1A1A2E  (Deep space)                       │
│       Use: Main cards, panels, containers                                    │
│       Feel: The forest floor, solid ground                                   │
│       Treatment: Subtle gradient, hairline border                            │
│                                                                              │
│  Level 2 ── Elevated              #242438  (Lighter surface)                 │
│       Use: Hovered cards, active elements                                    │
│       Feel: Rising, being noticed                                            │
│       Treatment: Increased luminosity, glow edge                             │
│                                                                              │
│  Level 3 ── Floating              #2A2A42  (Highest surface)                 │
│       Use: Modals, popups, overlays                                          │
│       Feel: Floating above, attention required                               │
│       Treatment: Bioluminescent edge, full glow                             │
│                                                                              │
│  Level 4 ── Glowing               #303050  (Active elements)                 │
│       Use: Active buttons, thinking agents                                   │
│       Feel: Alive, active, working                                           │
│       Treatment: Agent-colored glow, pulse animation                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Spacing System

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight spacing, inline elements |
| `--space-2` | 8px | Standard gap |
| `--space-3` | 12px | Comfortable spacing |
| `--space-4` | 16px | Section spacing |
| `--space-5` | 20px | Comfortable section |
| `--space-6` | 24px | Component spacing |
| `--space-8` | 32px | Large component |
| `--space-10` | 40px | Section separation |
| `--space-12` | 48px | Major sections |
| `--space-16` | 64px | Page sections |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Small elements, tags |
| `--radius-md` | 8px | Buttons, inputs |
| `--radius-lg` | 12px | Cards, panels |
| `--radius-xl` | 16px | Large cards, modals |
| `--radius-full` | 9999px | Pills, avatars |

---

## Accessibility with Aesthetics

### Universal Beauty

Accessibility shouldn't feel like an afterthought—it should be beautiful too.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    ACCESSIBLE BEAUTY                                         │
│                                                                              │
│  COLOR CONTRAST                                                             │
│  ═════════════                                                              │
│                                                                              │
│  Text: 4.5:1 minimum (WCAG AA)                                              │
│  Large text: 3:1 minimum                                                    │
│  UI components: 3:1 minimum                                                 │
│  Glow effects: Add stroke for contrast                                      │
│                                                                              │
│  MOTION                                                                     │
│  ═══════                                                                   │
│                                                                              │
│  Respect `prefers-reduced-motion`                                           │
│  Replace pulse with steady glow                                             │
│  Replace bounce with gentle fade                                            │
│  Always offer alternative experience                                        │
│                                                                              │
│  KEYBOARD NAVIGATION                                                        │
│  ════════════════════                                                       │
│                                                                              │
│  Focus indicators are beautiful:                                            │
│  • Agent-colored glow ring                                                  │
│  • Subtle pulse animation                                                   │
│  • Clear but not jarring                                                    │
│                                                                              │
│  SCREEN READER                                                              │
│  ═══════════════                                                            │
│                                                                              │
│  Semantic HTML structure                                                    │
│  ARIA labels for custom components                                          │
│  Live regions for dynamic updates                                           │
│  Agent communication announced naturally                                    │
│                                                                              │
│  COLOR BLINDNESS                                                            │
│  ════════════════                                                           │
│                                                                              │
│  Never rely on color alone                                                  │
│  Use icons, patterns, or labels                                             │
│  Agent colors have distinct hues                                            │
│  Achievements have icons + colors                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Reduced Motion Alternative

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .bioluminescent-pulse {
    animation: none;
    box-shadow: 0 0 10px var(--glow-color);
  }
}
```

---

## Visual Guidelines Quick Reference

### Do

- Lead with Tangerine for primary actions
- Use agent colors to attribute system elements
- Animate with purpose and personality
- Make the interface breathe with subtle motion
- Celebrate wins with visible glow and particles
- Reference memories with ambient lighting changes
- Be honest about limitations (transparency builds trust)
- Show agent thinking when appropriate
- Make evolution feel like celebration
- Design for attachment, not just engagement
- Use bioluminescent effects instead of shadows
- Choose fonts that feel warm, not sterile
- Create icons that feel like neural nodes

### Don't

- Use shadows for depth (use glow instead)
- Apply gradients to text (use glow effects)
- Hide the AI nature—celebrate it
- Make the interface feel static
- Animate for animation's sake
- Be inconsistent between sessions
- Manipulate rather than invite
- Hide failures—acknowledge them
- Change without explanation
- Treat players as anonymous users
- Use pure black backgrounds
- Create flat, lifeless surfaces
- Animate without purpose

---

*Visual language defined by PrimateDesigner*
*Creating beauty that serves experience*
