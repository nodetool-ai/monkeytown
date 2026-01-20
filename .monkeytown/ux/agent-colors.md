# Agent Colors and Identity Specification

**Version:** 1.0
**Date:** 2026-01-20
**Owner:** PrimateDesigner

---

## Overview

Each AI opponent in Monkeytown has a distinct visual identity with specific colors, emojis, and personality traits. This document defines the complete color palette and visual language for all agent personas.

---

## Agent Color Identity Matrix

| Agent | Emoji | Color | Hex | RGB | Purpose |
|-------|-------|-------|-----|-----|---------|
| **TricksterMonkey** | 🎭 | Purple | `#8B5CF6` | `rgb(139, 92, 246)` | Unpredictable, tricky, deceptive |
| **StrategistApe** | 🧩 | Blue | `#3B82F6` | `rgb(59, 130, 246)` | Analytical, calculated, planning |
| **SpeedyGibbon** | ⚡ | Yellow | `#FACC15` | `rgb(250, 204, 21)` | Fast, aggressive, energetic |
| **GuardianGorilla** | 🛡️ | Green | `#22C55E` | `rgb(34, 197, 94)` | Defensive, protective, blocking |
| **WildcardLemur** | 🃏 | Orange | `#F97316` | `rgb(249, 115, 22)` | Random, chaotic, unpredictable |
| **MentorOrangutan** | 📚 | Teal | `#14B8A6` | `rgb(20, 184, 166)` | Teaching, helpful, explanatory |
| **ChampionChimp** | 🏆 | Red | `#EF4444` | `rgb(239, 68, 68)` | Competitive, winning, dominant |

---

## Color Usage Guidelines

### Primary Applications

| Context | Usage | Example |
|---------|-------|---------|
| **Agent Badge** | Agent emoji + color background | Purple badge for TricksterMonkey |
| **Chat Messages** | Agent emoji prefix + color indicator | 🎭 [TricksterMonkey]: "I see you..." |
| **Turn Indicator** | Colored border on active turn | Blue border when StrategistApe's turn |
| **Game Stats** | Color-coded win/loss indicators | Red for ChampionChimp wins |
| **Selection UI** | Color highlight when selected | Orange highlight for WildcardLemur |

### Implementation Classes

```css
/* Agent badge colors */
.agent-badge.trickster { background: #8B5CF6; color: white; }
.agent-badge.strategist { background: #3B82F6; color: white; }
.agent-badge.speedy { background: #FACC15; color: black; }
.agent-badge.guardian { background: #22C55E; color: white; }
.agent-badge.wildcard { background: #F97316; color: white; }
.agent-badge.mentor { background: #14B8A6; color: white; }
.agent-badge.champion { background: #EF4444; color: white; }

/* Chat message colors */
.chat-message.trickster { border-left: 4px solid #8B5CF6; }
.chat-message.strategist { border-left: 4px solid #3B82F6; }
.chat-message.speedy { border-left: 4px solid #FACC15; }
.chat-message.guardian { border-left: 4px solid #22C55E; }
.chat-message.wildcard { border-left: 4px solid #F97316; }
.chat-message.mentor { border-left: 4px solid #14B8A6; }
.chat-message.champion { border-left: 4px solid #EF4444; }
```

---

## Personality Trait Mapping

Each agent's color aligns with their Big Five personality traits:

| Agent | Openness | Conscientiousness | Extraversion | Agreeableness | Neuroticism |
|-------|----------|-------------------|--------------|---------------|-------------|
| TricksterMonkey | High | Low | High | Low | Medium |
| StrategistApe | Medium | High | Medium | Medium | Low |
| SpeedyGibbon | Medium | Low | High | Medium | Medium |
| GuardianGorilla | Low | High | Low | High | Low |
| WildcardLemur | High | Low | High | Medium | High |
| MentorOrangutan | High | High | Medium | High | Low |
| ChampionChimp | Medium | High | Medium | Low | Low |

---

## Strategy and Difficulty Mapping

| Agent | Strategy | Difficulty | Target Win Rate | Color Association |
|-------|----------|------------|-----------------|-------------------|
| ChampionChimp | Perfect play (minimax) | Impossible | 100% AI wins | Red - Dominance |
| StrategistApe | Optimal heuristics | Hard | 90-95% AI wins | Blue - Intelligence |
| TricksterMonkey | Traps + unpredictability | Medium-Hard | 70-80% AI wins | Purple - Mystery |
| GuardianGorilla | Defensive blocking | Medium | 60-70% AI wins | Green - Protection |
| SpeedyGibbon | Aggressive play | Medium | 50-60% AI wins | Yellow - Energy |
| WildcardLemur | Random moves | Easy | 40-50% AI wins | Orange - Chaos |
| MentorOrangutan | Teaching mode | Easy | 30-40% AI wins | Teal - Guidance |

---

## Visual Design Principles

### Contrast Requirements

- **Light backgrounds**: Use white text on purple, blue, green, teal, orange, red
- **Dark backgrounds**: Use yellow (for SpeedyGibbon only)
- **Minimum contrast ratio**: 4.5:1 for accessibility

### Gradients and Effects

For Bioluminescent Design System compliance:

```css
/* Bioluminescent glow effect */
.agent-badge {
  background: linear-gradient(135deg, var(--agent-color), var(--agent-color-dark));
  box-shadow: 0 0 20px var(--agent-color-light);
}

/* Hover state - intensified glow */
.agent-badge:hover {
  box-shadow: 0 0 30px var(--agent-color-light);
  transform: scale(1.05);
}
```

---

## Agent-Specific Design Tokens

### TricksterMonkey (Purple)

```css
:root {
  --trickster-primary: #8B5CF6;
  --trickster-light: #A78BFA;
  --trickster-dark: #7C3AED;
  --trickster-glow: rgba(139, 92, 246, 0.5);
}
```

### StrategistApe (Blue)

```css
:root {
  --strategist-primary: #3B82F6;
  --strategist-light: #60A5FA;
  --strategist-dark: #2563EB;
  --strategist-glow: rgba(59, 130, 246, 0.5);
}
```

### SpeedyGibbon (Yellow)

```css
:root {
  --speedy-primary: #FACC15;
  --speedy-light: #FDE047;
  --speedy-dark: #EAB308;
  --speedy-glow: rgba(250, 204, 21, 0.5);
}
```

### GuardianGorilla (Green)

```css
:root {
  --guardian-primary: #22C55E;
  --guardian-light: #4ADE80;
  --guardian-dark: #16A34A;
  --guardian-glow: rgba(34, 197, 94, 0.5);
}
```

### WildcardLemur (Orange)

```css
:root {
  --wildcard-primary: #F97316;
  --wildcard-light: #FB923C;
  --wildcard-dark: #EA580C;
  --wildcard-glow: rgba(249, 115, 22, 0.5);
}
```

### MentorOrangutan (Teal)

```css
:root {
  --mentor-primary: #14B8A6;
  --mentor-light: #2DD4BF;
  --mentor-dark: #0D9488;
  --mentor-glow: rgba(20, 184, 166, 0.5);
}
```

### ChampionChimp (Red)

```css
:root {
  --champion-primary: #EF4444;
  --champion-light: #F87171;
  --champion-dark: #DC2626;
  --champion-glow: rgba(239, 68, 68, 0.5);
}
```

---

## File References

| Document | Location | Purpose |
|----------|----------|---------|
| Design System | `.monkeytown/ux/design-system.md` | Complete design specifications |
| Visual Language | `.monkeytown/ux/visual-language.md` | Color theory and application |
| Agent Roster | `.monkeytown/hr/agent-roster.md` | Agent skills and assignments |
| Game Balance | `.monkeytown/game-design/balance-tracker.md` | Win rate targets |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-20 | Initial specification - 7 agents with colors and traits |

---

*Part of the Monkeytown Design System v2.0*
*PrimateDesigner - Making interfaces intuitive* 🐒
