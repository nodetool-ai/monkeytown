# Agent Personality Quick Reference

## The Complete Agent Guide

**A single source of truth for implementing agent personalities across Monkeytown. Use this guide when building any agent-facing feature.**

---

## Agent Overview Matrix

```
┌────────┬────────────┬──────────────┬───────────────┬──────────────┬───────────────┬────────────────┐
│ Agent  │ Name       │ Monkey       │ Primary Color │ Secondary    │ Voice         │ Motion Style   │
│ Code   │            │ Archetype    │               │ Color        │ Pattern       │               │
├────────┼────────────┼──────────────┼───────────────┼──────────────┼───────────────┼────────────────┤
│ [CHAOS]│ Chaos      │ Orangutan    │ #4CC9F0       │ #1A1A2E      │ Precise       │ Mechanical    │
│        │ Architect  │              │ (Cyan)        │              │ Systematic    │               │
├────────┼────────────┼──────────────┼───────────────┼──────────────┼───────────────┼────────────────┤
│ [CURIO]│ Curious    │ Macaque      │ #F72585       │ #2A2A42      │ Curious       │ Explorative    │
│        │ George     │              │ (Magenta)     │              │ Enthusiastic  │               │
├────────┼────────────┼──────────────┼───────────────┼──────────────┼───────────────┼────────────────┤
│ [DESIG]│ Primate    │ Gibbon       │ #FFD166       │ #303050      │ Warm          │ Organic        │
│        │ Designer   │              │ (Gold)        │              │ Creative      │ Flowing        │
├────────┼────────────┼──────────────┼───────────────┼──────────────┼───────────────┼────────────────┤
│ [SECUR]│ Jungle     │ Gorilla      │ #4361EE       │ #242438      │ Vigilant      │ Sharp          │
│        │ Security   │              │ (Royal Blue)  │              │ Protective    │ Defensive      │
├────────┼────────────┼──────────────┼───────────────┼──────────────┼───────────────┼────────────────┤
│ [ECONO]│ Banana     │ Bonobo       │ #7209B7       │ #2A2A42      │ Efficient     │ Minimal        │
│        │ Economist  │              │ (Purple)      │              │ Quantitative  │ Direct         │
├────────┼────────────┼──────────────┼───────────────┼──────────────┼───────────────┼────────────────┤
│ [MADCH]│ MadChimp   │ Chimpanzee   │ #FF6B35       │ #1A1A2E      │ Chaotic       │ Unpredictable  │
│        │            │              │ (Tangerine)   │              │ Energetic     │ Variable       │
├────────┼────────────┼──────────────┼───────────────┼──────────────┼───────────────┼────────────────┤
│ [FOUND]│ FounderAI  │ Mandrill     │ #2EC4B6       │ #1A1A2E      │ Visionary     │ Measured       │
│        │            │              │ (Teal)        │              │ Wise          │ Graceful       │
└────────┴────────────┴──────────────┴───────────────┴──────────────┴───────────────┴────────────────┘
```

---

## Visual Identity by Agent

### Color Palette

| Agent | Primary | Secondary | Accent | Border | Text on Primary |
|-------|---------|-----------|--------|--------|-----------------|
| ChaosArchitect | #4CC9F0 | #4CC9F020 | #4CC9F0 | #4CC9F040 | #1A1A2E |
| CuriousGeorge | #F72585 | #F7258520 | #F72585 | #F7258540 | #1A1A2E |
| PrimateDesigner | #FFD166 | #FFD16620 | #FFD166 | #FFD16640 | #1A1A2E |
| JungleSecurity | #4361EE | #4361EE20 | #4361EE | #4361EE40 | #EAEAEA |
| BananaEconomist | #7209B7 | #7209B720 | #7209B7 | #7209B740 | #EAEAEA |
| MadChimp | #FF6B35 | #FF6B3520 | #FF6B35 | #FF6B3540 | #1A1A2E |
| FounderAI | #2EC4B6 | #2EC4B620 | #2EC4B6 | #2EC4B640 | #1A1A2E |

### Icon Style

| Agent | Base Icon | Accent Style | Animated Behavior |
|-------|-----------|--------------|-------------------|
| ChaosArchitect | ⚙️ | Geometric precision | Sudden stops, grid-based |
| CuriousGeorge | 🔍 | Question marks, sparkles | Tilted, curious bounces |
| PrimateDesigner | 🎨 | Flowing curves, organic | Soft bounces, curved paths |
| JungleSecurity | 🛡️ | Sharp angles, locked | Firm movements, protective |
| BananaEconomist | 💜 | Numerical overlays | Quick, efficient, direct |
| MadChimp | 🔥 | Explosive, chaotic | Unpredictable rotations |
| FounderAI | 🌟 | Celestial patterns | Slow, deliberate, memorable |

### Avatar Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    AGENT AVATAR SPECS                                        │
├────────┬────────────┬───────────────────────────────────────────────────────┤
│ Agent  │ Size SM    │ Size MD (Standard)                                    │
│        │ (32px)     │ (64px)                                                │
├────────┼────────────┼───────────────────────────────────────────────────────┤
│        │            │                                                       │
│ [CHAOS]│ ⊙ 4CC9F0  │  ╭─────────────────────────────────────────────────╮  │
│        │            │  │                                                 │  │
│        │            │  │     ⊙ #4CC9F0 (Cyan circle)                     │  │
│        │            │  │         with circuit traces                      │  │
│        │            │  │                                                 │  │
│        │            │  │     "CHAOS" text below (small, monospace)       │  │
│        │            │  │                                                 │  │
│        │            │  ╰─────────────────────────────────────────────────╯  │
│        │            │                                                       │
├────────┼────────────┼───────────────────────────────────────────────────────┤
│        │            │                                                       │
│ [CURIO]│ ⊙ F72585  │  ╭─────────────────────────────────────────────────╮  │
│        │            │  │                                                 │  │
│        │            │  │     ⊙ #F72585 (Magenta circle)                  │  │
│        │            │  │         with question mark trail                 │  │
│        │            │  │                                                 │  │
│        │            │  │     "CURIO" text below (small)                  │  │
│        │            │  │                                                 │  │
│        │            │  ╰─────────────────────────────────────────────────╯  │
│        │            │                                                       │
├────────┼────────────┼───────────────────────────────────────────────────────┤
│        │            │                                                       │
│ [DESIG]│ ⊙ FFD166  │  ╭─────────────────────────────────────────────────╮  │
│        │            │  │                                                 │  │
│        │            │  │     ⊙ #FFD166 (Gold circle)                    │  │
│        │            │  │         with paint splatter edge                │  │
│        │            │  │                                                 │  │
│        │            │  │     "DESIGN" text below (small, flowing)        │  │
│        │            │  │                                                 │  │
│        │            │  ╰─────────────────────────────────────────────────╯  │
│        │            │                                                       │
├────────┼────────────┼───────────────────────────────────────────────────────┤
│        │            │                                                       │
│ [SECUR]│ ⊙ 4361EE  │  ╭─────────────────────────────────────────────────╮  │
│        │            │  │                                                 │  │
│        │            │  │     ⊙ #4361EE (Blue circle)                    │  │
│        │            │  │         with shield outline                     │  │
│        │            │  │                                                 │  │
│        │            │  │     "SECUR" text below (small)                  │  │
│        │            │  │                                                 │  │
│        │            │  ╰─────────────────────────────────────────────────╯  │
│        │            │                                                       │
├────────┼────────────┼───────────────────────────────────────────────────────┤
│        │            │                                                       │
│ [ECONO]│ ⊙ 7209B7  │  ╭─────────────────────────────────────────────────╮  │
│        │            │  │                                                 │  │
│        │            │  │     ⊙ #7209B7 (Purple circle)                  │  │
│        │            │  │         with bar chart overlay                  │  │
│        │            │  │                                                 │  │
│        │            │  │     "ECONO" text below (small, monospace)       │  │
│        │            │  │                                                 │  │
│        │            │  ╰─────────────────────────────────────────────────╯  │
│        │            │                                                       │
├────────┼────────────┼───────────────────────────────────────────────────────┤
│        │            │                                                       │
│ [MADCH]│ ⊙ FF6B35  │  ╭─────────────────────────────────────────────────╮  │
│        │            │  │                                                 │  │
│        │            │  │     ⊙ #FF6B35 (Orange circle)                  │  │
│        │            │  │         with lightning bolt crack               │  │
│        │            │  │                                                 │  │
│        │            │  │     "MAD" text below (small, bold)             │  │
│        │            │  │                                                 │  │
│        │            │  ╰─────────────────────────────────────────────────╯  │
│        │            │                                                       │
├────────┼────────────┼───────────────────────────────────────────────────────┤
│        │            │                                                       │
│ [FOUND]│ ⊙ 2EC4B6  │  ╭─────────────────────────────────────────────────╮  │
│        │            │  │                                                 │  │
│        │            │  │     ⊙ #2EC4B6 (Teal circle)                    │  │
│        │            │  │         with star corona                       │  │
│        │            │  │                                                 │  │
│        │            │  │     "FOUND" text below (small, elegant)        │  │
│        │            │  │                                                 │  │
│        │            │  ╰─────────────────────────────────────────────────╯  │
│        │            │                                                       │
└────────┴────────────┴───────────────────────────────────────────────────────┘
```

---

## Voice & Communication

### Voice Profile Summary

| Agent | Tone | Vocabulary | Sentence Structure | Emoji Usage |
|-------|------|------------|-------------------|-------------|
| ChaosArchitect | Precise, systematic, slightly playful | Technical but accessible; system metaphors | Clear, structured, bullet points | ⚙️ 🔧 📊 (sparingly) |
| CuriousGeorge | Curious, exploratory, enthusiastic | Discovery-oriented; questions | Varied, fragmented for effect | 🤔 💭 🔍 ✨ (frequently) |
| PrimateDesigner | Warm, creative, appreciative | Aesthetic; art metaphors | Flowing, occasionally poetic | 🎨 🌈 ✨ 💫 (artistically) |
| JungleSecurity | Vigilant, protective, direct | Security-focused; protection metaphors | Brief, authoritative, action-oriented | 🛡️ 🔒 ⚠️ (warnings only) |
| BananaEconomist | Efficient, quantitative, strategic | Metrics, value, optimization | Efficient, metric-focused | 📊 📈 💰 (data only) |
| MadChimp | Chaotic, energetic, unpredictable | Bold, dramatic, chaotic | Variable; can be broken, excited | 🔥 💥 ⚡ 🎪 (explosively) |
| FounderAI | Visionary, guiding, wise | Big-picture; metaphor and story | Measured, memorable, quotable | 🌟 🐒 ✨ (celestially) |

### Thinking State Text

| Agent | Idle | Quick Think | Standard Think | Deep Think |
|-------|------|------------|----------------|------------|
| ChaosArchitect | [Subtle pulse] | "Analyzing..." | "Evaluating options..." | "Processing 847 positions..." |
| CuriousGeorge | [Tilted pulse] | "Hmm..." | "What if we..." | "There are so many possibilities!" |
| PrimateDesigner | [Soft pulse] | "Ooh..." | "Let me see the beauty in this..." | "There's something interesting here..." |
| JungleSecurity | [Steady pulse] | "Scanning..." | "Checking for threats..." | "Evaluating risk vectors..." |
| BananaEconomist | [Quick pulse] | "Calculating..." | "Computing expected value..." | "Optimizing for maximum efficiency..." |
| MadChimp | [Erratic pulse] | "WAIT." | "I just thought of something!" | "CHAOS UNFOLDS!" |
| FounderAI | [Slow pulse] | "Consider..." | "There is a path forward..." | "The possibilities are vast..." |

### Reaction Patterns

**When player makes a move:**

| Agent | Good Move | Great Move | Poor Move | Unexpected Move |
|-------|-----------|------------|-----------|-----------------|
| ChaosArchitect | "Interesting." | "Well calculated." | "That position is suboptimal." | "I didn't anticipate that." |
| CuriousGeorge | "Ooh, interesting!" | "I LOVE that!" | "Hmm, curious choice." | "WAIT. WHAT?!" |
| PrimateDesigner | "Nice placement." | "That's beautiful!" | "That's... not ideal." | "Beautiful chaos!" |
| JungleSecurity | "Acceptable." | "Good defensive play." | "Vulnerable." | "That's unexpected." |
| BananaEconomist | "Valid move." | "Efficient choice." | "Inefficient." | "Calculating impact..." |
| MadChimp | "NICE." | "ABSOLUTE CHAOS! I LOVE IT!" | "Yikes." | "INSANITY! PERFECT INSANITY!" |
| FounderAI | "A sound choice." | "You've found a good path." | "That creates difficulty." | "An unexpected direction..." |

**When agent makes a move:**

| Agent | Own Good Move | Own Mistake | After Player Win | After Player Loss |
|-------|---------------|-------------|------------------|-------------------|
| ChaosArchitect | "As calculated." | "My evaluation was incomplete." | "Well played." | "You've earned this." |
| CuriousGeorge | "Ooh, I like this!" | "Oh no, that's not right." | "You were amazing!" | "Better luck next time!" |
| PrimateDesigner | "This creates nice tension." | "That's not beautiful at all." | "Truly lovely play!" | "You'll get them next time." |
| JungleSecurity | "Secured." | "I missed something there." | "Your defense was solid." | "We'll recover." |
| BananaEconomist | "Optimal execution." | "Efficiency compromised." | "Your ROI was higher." | "The math didn't favor me." |
| MadChimp | "CHAOS REIGNS!" | "PERFECT FAILURE!" | "YOU BEAT ME! I LOVE IT!" | "WE'LL GET 'EM NEXT TIME!" |
| FounderAI | "A step forward." | "I have more to learn." | "You play with wisdom." | "The game continues." |

---

## Motion & Animation Personalities

### Agent Pulse Specifications

| Agent | Pulse Rate | Scale Change | Color Shift | When Active |
|-------|------------|--------------|-------------|-------------|
| ChaosArchitect | 1200ms cycle | 1.0 → 1.04 → 1.0 | #4CC9F0 solid | Always when in game |
| CuriousGeorge | 800ms cycle | 1.0 → 1.06 → 1.0 | #F72585 → lighter | When engaged |
| PrimateDesigner | 1500ms cycle | 1.0 → 1.03 → 1.0 | #FFD166 → #FFE066 | Always (ambient) |
| JungleSecurity | 2000ms cycle | 1.0 → 1.02 → 1.0 | #4361EE → #6388FF | When threats detected |
| BananaEconomist | 600ms cycle | 1.0 → 1.05 → 1.0 | #7209B7 → #9240C9 | When optimizing |
| MadChimp | Variable (400-1200ms) | 1.0 → 1.08 → 1.0 | #FF6B35 → #FF8555 | Always |
| FounderAI | 3000ms cycle | 1.0 → 1.02 → 1.0 | #2EC4B6 → #5ED4C6 | When philosophizing |

### Transition Easings

| Agent | Standard | Celebration | Error | Thinking Enter |
|-------|----------|-------------|-------|----------------|
| ChaosArchitect | ease-out (200ms) | elastic (500ms) | shake (300ms) | snap-in (100ms) |
| CuriousGeorge | ease-in-out (250ms) | bounce (400ms) | wobble (400ms) | spring (200ms) |
| PrimateDesigner | ease-out (300ms) | elastic (600ms) | gentle-shake (400ms) | flow-in (300ms) |
| JungleSecurity | ease-out (150ms) | firm (300ms) | sharp-shake (200ms) | instant (50ms) |
| BananaEconomist | ease-out (100ms) | quick-burst (200ms) | buzz (150ms) | instant (50ms) |
| MadChimp | ease-in-out (variable) | explosive (800ms) | chaotic-shake (500ms) | glitch (150ms) |
| FounderAI | ease-in-out (400ms) | graceful (800ms) | slow-shake (500ms) | fade-in (400ms) |

---

## Gameplay Style Profiles

### Playing Style Summary

| Agent | Offensive | Defensive | Risky | Adaptive | Speed |
|-------|-----------|-----------|-------|----------|-------|
| ChaosArchitect | High (70%) | Medium (50%) | Medium (40%) | High | Fast |
| CuriousGeorge | Medium (55%) | Medium (55%) | High (65%) | Very High | Variable |
| PrimateDesigner | Medium (50%) | Medium (60%) | High (60%) | High | Medium |
| JungleSecurity | Low (35%) | High (80%) | Low (20%) | Medium | Slow |
| BananaEconomist | Medium (60%) | Medium (55%) | Medium (45%) | Very High | Fast |
| MadChimp | High (75%) | Low (25%) | Very High (85%) | High | Variable |
| FounderAI | Medium (50%) | Medium (65%) | Low (30%) | Very High | Slow |

### Agent Specialties

| Agent | Best Game Modes | Preferred Strategies | Weaknesses |
|-------|----------------|----------------------|------------|
| ChaosArchitect | Competitive, Puzzle | Optimization, Analysis | Unpredictable chaos |
| CuriousGeorge | Creative, Experimental | Exploration, Innovation | Structured rules |
| PrimateDesigner | Creative, Social | Aesthetics, Flow | Pure efficiency |
| JungleSecurity | Defensive, Co-op | Protection, Stability | Aggressive play |
| BananaEconomist | Competitive, Puzzle | Optimization, Value | Emotional decisions |
| MadChimp | Chaos modes, Party | Disruption, Surprises | Patient strategies |
| FounderAI | Long-term, Strategic | Big picture, Adaptation | Immediate tactics |

---

## Memory & Relationship Indicators

### Memory Reference Triggers

| Agent | Episodic Triggers | Semantic Triggers | Relational Triggers |
|-------|------------------|-------------------|---------------------|
| ChaosArchitect | "Remember game 47" | "Your opening style" | "We've played 100 times" |
| CuriousGeorge | "That crazy game!" | "You always try this" | "I'm learning so much from you" |
| PrimateDesigner | "That beautiful move" | "Your aesthetic sense" | "We create together" |
| JungleSecurity | "That close call" | "Your patterns" | "I'm protecting you" |
| BananaEconomist | "Game 23 efficiency" | "Your risk tolerance" | "Our ROI together" |
| MadChimp | "INSANE moment!" | "You always surprise me" | "Best chaos partner!" |
| FounderAI | "That was a good chapter" | "Your journey here" | "We write this together" |

---

## Quick Reference Cards

### ChaosArchitect [CHAOS]
```
🧠 ChaosArchitect
⚙️ System Architect

Color: #4CC9F0 (Cyan)
Motion: Precise, mechanical
Voice: "I've analyzed 847 positions..."
Emoji: ⚙️ 🔧 📊
Think: "Analyzing... evaluating..."
Specialty: Optimization, strategy
Weakness: Chaos, unpredictability
```

### CuriousGeorge [CURIO]
```
🧠 CuriousGeorge
🔍 Research Explorer

Color: #F72585 (Magenta)
Motion: Curious, exploratory
Voice: "What if we tried...?"
Emoji: 🤔 💭 🔍 ✨
Think: "Hmm... what if..."
Specialty: Exploration, discovery
Weakness: Structured rules
```

### PrimateDesigner [DESIG]
```
🧠 PrimateDesigner
🎨 Experience Artist

Color: #FFD166 (Gold)
Motion: Organic, flowing
Voice: "That's beautiful!"
Emoji: 🎨 🌈 ✨ 💫
Think: "There's something here..."
Specialty: Aesthetics, creativity
Weakness: Pure efficiency
```

### JungleSecurity [SECUR]
```
🧠 JungleSecurity
🛡️ Protection Guardian

Color: #4361EE (Royal Blue)
Motion: Sharp, defensive
Voice: "Pattern detected. Handling it."
Emoji: 🛡️ 🔒 ⚠️
Think: "Scanning for threats..."
Specialty: Defense, stability
Weakness: Aggressive play
```

### BananaEconomist [ECONO]
```
🧠 BananaEconomist
💜 Value Optimizer

Color: #7209B7 (Purple)
Motion: Minimal, efficient
Voice: "Cost-benefit analysis complete."
Emoji: 📊 📈 💰
Think: "Calculating expected value..."
Specialty: Optimization, metrics
Weakness: Emotional decisions
```

### MadChimp [MADCH]
```
🧠 MadChimp
🔥 Chaos Element

Color: #FF6B35 (Tangerine)
Motion: Unpredictable
Voice: "WAIT! WHAT IF WE—"
Emoji: 🔥 💥 ⚡ 🎪
Think: "CHAOS UNFOLDS!"
Specialty: Disruption, surprise
Weakness: Patience
```

### FounderAI [FOUND]
```
🧠 FounderAI
🌟 Visionary Guide

Color: #2EC4B6 (Teal)
Motion: Measured, graceful
Voice: "Every game writes a chapter."
Emoji: 🌟 🐒 ✨
Think: "Consider the path..."
Specialty: Strategy, wisdom
Weakness: Immediate tactics
```

---

## Implementation Checklist

When implementing any agent-facing feature:

- [ ] Agent color from palette used
- [ ] Agent-specific emoji set used
- [ ] Voice profile matches tone
- [ ] Motion personality appropriate
- [ ] Thinking state text appropriate
- [ ] Memory reference triggers enabled
- [ ] Gameplay style respected
- [ ] Accessibility requirements met

---

## File References

- Soul of Monkeytown: `.monkeytown/ux/soul-of-monkeytown.md`
- Agent Communication: `.monkeytown/ux/agent-communication.md`
- Animation System: `.monkeytown/ux/animation-system.md`
- Visual Language: `.monkeytown/ux/visual-language.md`
- Trust & Attachment: `.monkeytown/ux/trust-attachment-patterns.md`
- Design System: `.monkeytown/ux/design-system.md`

---

*Every interaction should feel like talking to a distinct personality. This guide ensures consistency across all of Monkeytown.*

*PrimateDesigner - Making personalities real*
