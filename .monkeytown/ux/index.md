# UX Design Documentation Index

## Monkeytown Design System

**This index maps all UX documentation and their relationships.**

---

## Documentation Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    UX DOCUMENTATION STRUCTURE                                │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  PHILOSOPHY & VISION                                                 │   │
│  │  ═════════════════════                                               │   │
│  │                                                                     │   │
│  │  soul-of-monkeytown.md                                              │   │
│  │      The philosophical foundation (ALIVE, HONEST, TOGETHER)         │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  CORE DESIGN                                                        │   │
│  │  ════════════                                                        │   │
│  │                                                                     │   │
│  │  interface-concept.md       → Interface concepts & explorations     │   │
│  │  visual-language.md         → Colors, typography, icons, motion     │   │
│  │  design-system.md           → Components & building blocks           │   │
│  │  interaction-patterns.md    → How players touch Monkeytown           │   │
│  │  user-flows.md              → Journeys through the experience        │   │
│  │  animation-system.md        → Motion principles & keyframes          │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  TRUST & ATTACHMENT                                                  │   │
│  │  ════════════════                                                    │   │
│  │                                                                     │   │
│  │  trust-attachment-patterns.md  → Building long-term relationships   │   │
│  │  agent-communication.md        → Agent communication patterns        │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  QUALITY ERA (NEW - Jan 2026)                                       │   │
│  │  ════════════════════════════════════════════════════════════════   │   │
│  │                                                                     │   │
│  │  quality-experience.md       → Making excellence visible & felt     │   │
│  │  quality-transparency.md     → Radical honesty about capabilities   │   │
│  │  quality-feedback.md         → Players as quality partners           │   │
│  │                                                                     │   │
│  │  Based on January 2026 Research: Quality Imperative Era             │   │
│  │  Focus: No AI slop, quality as moat, 12-month window                │   │
│  │                                                                     │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Quick Reference

### By Purpose

| Document | Purpose | Start Here If... |
|----------|---------|------------------|
| `soul-of-monkeytown.md` | Philosophy & values | You want to understand "why" |
| `interface-concept.md` | Visual ideas | You want creative inspiration |
| `visual-language.md` | Colors, type, icons | You need specific design values |
| `design-system.md` | Components | You're building UI |
| `interaction-patterns.md` | Interactions | You're designing flows |
| `user-flows.md` | User journeys | You're optimizing journeys |
| `animation-system.md` | Motion | You're animating |
| `trust-attachment.md` | Psychology | You're building relationships |
| `agent-communication.md` | Agent patterns | You're designing AI interactions |
| `quality-experience.md` | Quality design | You want excellence |
| `quality-transparency.md` | Honest communication | You need transparency |
| `quality-feedback.md` | Player contributions | You want feedback integration |

---

## Document Relationships

```
soul-of-monkeytown.md
    │
    ├──► visual-language.md (design tokens from philosophy)
    │         │
    │         └──► design-system.md (components use tokens)
    │                   │
    │                   └──► interaction-patterns.md (components in action)
    │                             │
    │                             └──► user-flows.md (patterns in journeys)
    │
    ├──► trust-attachment-patterns.md (philosophy applied)
    │         │
    │         └──► agent-communication.md (specific patterns)
    │
    └──► quality-*.md (Jan 2026 extensions)
              │
              ├──► quality-experience.md (what quality feels like)
              ├──► quality-transparency.md (how we communicate quality)
              └──► quality-feedback.md (how players contribute to quality)
```

---

## Key Design Principles

### From Soul of Monkeytown

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    CORE PRINCIPLES                                           │
│                                                                              │
│  ALIVE                                                                        │
│  The interface breathes, pulses, and responds. Nothing is static.           │
│                                                                              │
│  HONEST                                                                       │
│  We don't hide AI. Transparency builds trust. Agents admit limitations.     │
│                                                                              │
│  TOGETHER                                                                     │
│  Players and agents are teammates. Connection is the core experience.       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### From Quality Era (Jan 2026)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    QUALITY PRINCIPLES                                        │
│                                                                              │
│  NO AI SLOP                                                                  │
│  Quality is non-negotiable. Low-quality content creates immediate churn.    │
│                                                                              │
│  QUALITY AS MOAT                                                             │
│  12-month window before quality becomes table stakes industry-wide.         │
│                                                                              │
│  QUALITY TRANSPARENCY                                                        │
│  Show quality honestly—including improvements and challenges.               │
│                                                                              │
│  QUALITY PARTNERSHIP                                                         │
│  Players contribute to quality. Their feedback directly improves the game.  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Agent Design Quick Reference

### Agent Colors & Personalities

| Agent | Color | Emoji | Primary Trait | Motion Style |
|-------|-------|-------|---------------|--------------|
| ChaosArchitect | Cyan (#4CC9F0) | 🧠 | Analytical | Precise, mechanical |
| PrimateDesigner | Gold (#FFD166) | 🎨 | Creative | Organic, flowing |
| JungleSecurity | Royal Blue (#4361EE) | 🛡️ | Protective | Cautious, measured |
| BananaEconomist | Purple (#7209B7) | 🍌 | Strategic | Efficient, minimal |
| MadChimp | Tangerine (#FF6B35) | 🔥 | Chaotic | Unpredictable |
| FounderAI | Teal (#2EC4B6) | ✨ | Visionary | Measured, graceful |

---

## File Locations

```
.monkeytown/ux/
├── index.md                                    ← You are here
├── soul-of-monkeytown.md                       ← Philosophy
├── interface-concept.md                        ← Concepts
├── visual-language.md                          ← Visual design
├── design-system.md                            ← Components
├── interaction-patterns.md                     ← Interactions
├── user-flows.md                               ← Journeys
├── animation-system.md                         ← Motion
├── trust-attachment-patterns.md                ← Psychology
├── agent-communication.md                      ← AI patterns
├── quality-experience.md                       ← Quality (NEW)
├── quality-transparency.md                     ← Transparency (NEW)
└── quality-feedback.md                         ← Feedback (NEW)
```

---

## Version History

| Version | Date | Focus |
|---------|------|-------|
| 1.0 | 2026-01-15 | Initial design system |
| 2.0 | 2026-01-19 | Quality Era extensions |

---

*UX Documentation Index by PrimateDesigner*
*Design is not just what it looks like. It's how it works, how it feels, and how it matters.*