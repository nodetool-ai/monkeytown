# Animation System

## Bringing Monkeytown to Life

**Motion is meaning. Every animation communicates state, personality, and intent.** This document specifies how Monkeytown moves, flows, and responds.

---

## Animation Philosophy

### Core Principles

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     ANIMATION CORE PRINCIPLES                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. PURPOSE OVER DECORATION                                                  │
│     Every animation serves a function: feedback, orientation, or delight.   │
│     Never animate for animation's sake.                                      │
│                                                                              │
│  2. FEEDBACK IS INSTANT                                                      │
│     User input gets immediate response. Confirmation follows.               │
│     The interface should feel connected to the player's intent.             │
│                                                                              │
│  3. NATURAL PHYSICS                                                          │
│     Elements have weight, friction, and momentum.                           │
│     Easings feel like real motion, not mechanical transitions.              │
│                                                                              │
│  4. PERSONALITY IN MOTION                                                    │
│     Different agents animate differently.                                    │
│     ChaosArchitect is precise. MadChimp is chaotic.                         │
│                                                                              │
│  5. PERFORMANCE FIRST                                                        │
│     60fps minimum. 120fps on capable devices.                                │
│     Reduce complexity before reducing quality.                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Easing Curves

### The Monkeytown Easing Library

```css
:root {
  /* ========================================
     CORE EASINGS
     ======================================== */

  /* Snappy, responsive feel for interactions */
  --ease-snappy: cubic-bezier(0.2, 0, 0.2, 1);

  /* Smooth, natural feel for transitions */
  --ease-natural: cubic-bezier(0.4, 0, 0.2, 1);

  /* Elegant, slightly dramatic for reveals */
  --ease-elegant: cubic-bezier(0.4, 0, 0.2, 1);

  /* Bouncy, playful for celebrations */
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);

  /* Back-ease for emphasis */
  --ease-back-out: cubic-bezier(0.175, 0.885, 0.32, 1.275);

  /* Elastic for agent personality expressions */
  --ease-elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6);

  /* ========================================
     AGENT PERSONALITY EASINGS
     ======================================== */

  /* ChaosArchitect: Precise, mechanical */
  --ease-chaos: cubic-bezier(0.25, 0.46, 0.45, 0.94);

  /* CuriousGeorge: Curious, exploratory */
  --ease-curious: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* PrimateDesigner: Smooth, artistic */
  --ease-designer: cubic-bezier(0.32, 1, 0.67, 1);

  /* JungleSecurity: Sharp, protective */
  --ease-security: cubic-bezier(0, 0, 0.2, 1);

  /* MadChimp: Chaotic, energetic */
  --ease-madchimp: cubic-bezier(0.7, -0.5, 0.3, 1.8);

  /* FounderAI: Measured, graceful */
  --ease-founder: cubic-bezier(0.2, 1, 0.3, 1);
}
```

### Easing Visualization

```
TIME →

|                    Instant (CSS default)
|    ████
|
|
|        Responsive (--ease-snappy)
|          ████████
|
|
|
|            Natural (--ease-natural)
|              ██████████
|
|
|
|
|                Elegant (--ease-elegant)
|                  ████████████
|
|
|
|
|
|                  Bounce (--ease-bounce)
|                    ████░░████
|
|
|
|
|
|
|                    Back Out (--ease-back-out)
|                      ███░░░░███
```

---

## Duration System

### Timing Scale

```css
:root {
  /* ========================================
     DURATION TOKENS
     ======================================== */

  /* Micro: Hover states, subtle feedback */
  --duration-micro: 100ms;

  /* Fast: Button presses, simple state changes */
  --duration-fast: 150ms;

  /* Normal: Standard transitions */
  --duration-normal: 250ms;

  /* Slow: Page transitions, complex reveals */
  --duration-slow: 400ms;

  /* Slower: Major state changes */
  --duration-slower: 600ms;

  /* Celebration: Wins, achievements */
  --duration-celebration: 800ms;

  /* Victory: Big moments */
  --duration-victory: 1200ms;

  /* ========================================
     AGENT PERSONALITY DURATIONS
     ======================================== */

  /* ChaosArchitect: Quick, efficient */
  --duration-chaos-fast: 100ms;
  --duration-chaos-normal: 200ms;

  /* CuriousGeorge: Explorative, variable */
  --duration-curious-fast: 200ms;
  --duration-curious-slow: 500ms;

  /* PrimateDesigner: Smooth, unhurried */
  --duration-designer-normal: 350ms;
  --duration-designer-slow: 600ms;

  /* MadChimp: Variable, sometimes slow */
  --duration-madchimp-fast: 80ms;
  --duration-madchimp-slow: 800ms;
}
```

### Duration by Context

| Interaction | Duration | Easing | Feel |
|-------------|----------|--------|------|
| Button hover | 150ms | ease-out | Responsive |
| Button press | 100ms | ease-in | Tactile |
| Button release | 150ms | ease-out | Natural |
| Card hover lift | 200ms | ease-out | Subtle |
| Modal open | 300ms | ease-out | Smooth |
| Modal close | 200ms | ease-in | Quick |
| Page transition | 400ms | ease-in-out | Flowing |
| Toast appear | 300ms | ease-out | Gentle |
| Toast dismiss | 200ms | ease-in | Quick |
| Agent thinking pulse | 3000ms | ease-in-out | Breathing |
| Celebration | 800ms | elastic | Joyful |
| Victory flourish | 1200ms | ease-back-out | Dramatic |

---

## Keyframe Animations

### Micro-Interactions

```css
/* Button Press */
@keyframes button-press {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

/* Subtle Hover Lift */
@keyframes hover-lift {
  0% { transform: translateY(0); }
  100% { transform: translateY(-2px); }
}

/* Focus Ring Pulse */
@keyframes focus-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.4); }
  50% { box-shadow: 0 0 0 4px rgba(255, 107, 53, 0); }
}

/* Loading Spinner */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Shaking (for errors) */
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}
```

### Agent Animations

```css
/* Agent Idle Breathing */
@keyframes agent-breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

/* Agent Thinking (pulsing glow) */
@keyframes agent-thinking {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 var(--agent-color, #4CC9F0);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px 10px var(--agent-color, #4CC9F0);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 var(--agent-color, #4CC9F0);
  }
}

/* Agent Celebrating */
@keyframes agent-celebrate {
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.15) rotate(-5deg); }
  50% { transform: scale(0.95) rotate(5deg); }
  75% { transform: scale(1.08) rotate(-3deg); }
  100% { transform: scale(1) rotate(0deg); }
}

/* Agent Curious (tilt) */
@keyframes agent-curious-tilt {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-8deg); }
  75% { transform: rotate(8deg); }
}

/* Agent Alert (rapid pulse) */
@keyframes agent-alert {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

### Game Animations

```css
/* Card Play (slide out from hand) */
@keyframes card-play {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) rotate(-10deg);
    opacity: 0;
  }
}

/* Piece Move (smooth slide) */
@keyframes piece-move {
  0% {
    transform: translate(var(--start-x), var(--start-y));
  }
  100% {
    transform: translate(var(--end-x), var(--end-y));
  }
}

/* Tower Build (rise up) */
@keyframes tower-rise {
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  60% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

/* Points Popup (float up and fade) */
@keyframes points-popup {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-60px) scale(1.2);
    opacity: 0;
  }
}

/* Victory Burst */
@keyframes victory-burst {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
```

### Particle Effects

```css
/* Confetti Burst */
@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(200px) rotate(720deg);
    opacity: 0;
  }
}

/* Sparkle */
@keyframes sparkle {
  0%, 100% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Glow Pulse */
@keyframes glow-pulse {
  0%, 100% {
    filter: brightness(1) drop-shadow(0 0 8px var(--glow-color));
  }
  50% {
    filter: brightness(1.3) drop-shadow(0 0 16px var(--glow-color));
  }
}
```

---

## Animation Components

### Agent Avatar Component

```tsx
interface AgentAvatarProps {
  agent: AgentType;
  state: 'idle' | 'thinking' | 'deciding' | 'acting' | 'celebrating' | 'alert';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

function AgentAvatar({ agent, state, size = 'md', animate = true }) {
  const color = agentColors[agent];

  return (
    <div
      className={cn(
        'agent-avatar',
        `agent-${agent}`,
        `size-${size}`,
        `state-${state}`,
        { 'animate': animate }
      )}
      style={{ '--agent-color': color } as CSSProperties}
    >
      {/* Avatar content */}
      <style>{`
        .agent-avatar.animate.state-thinking {
          animation: agent-thinking 1.5s ease-in-out infinite;
        }
        .agent-avatar.animate.state-celebrating {
          animation: agent-celebrate 0.8s ease-elastic;
        }
      `}</style>
    </div>
  );
}
```

### Celebration Effect Component

```tsx
interface CelebrationProps {
  type: 'win' | 'points' | 'achievement' | 'feedback';
  intensity?: 'low' | 'medium' | 'high';
  agent?: AgentType;
}

function Celebration({ type, intensity = 'medium', agent }) {
  const particles = useMemo(() => {
    return generateParticles(type, intensity);
  }, [type, intensity]);

  return (
    <div className="celebration-container">
      <div className="celebration-main">
        {type === 'win' && <span className="victory-icon">🎉</span>}
        {type === 'points' && <span className="points-icon">+{points}</span>}
      </div>
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          initial={particle.start}
          animate={particle.end}
          transition={{ duration: particle.duration, ease: 'easeOut' }}
          className="celebration-particle"
          style={{
            '--particle-color': particle.color,
            '--x': particle.x,
            '--y': particle.y,
          }}
        />
      ))}
    </div>
  );
}
```

### Transition Group

```tsx
interface PageTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'elastic';
}

function PageTransition({ children, type = 'fade' }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, ...initialStates[type] }}
        animate={{ opacity: 1, ...animateStates[type] }}
        exit={{ opacity: 0, ...exitStates[type] }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

---

## Animation Performance

### Performance Budget

| Metric | Target | Maximum |
|--------|--------|---------|
| Frame rate | 60fps | 30fps minimum |
| JS animation frame | <16ms per frame | <33ms |
| CSS animation complexity | 2 properties max | 4 properties |
| Particles on screen | 20 max | 50 max |
| Animation budget per viewport | 50ms equivalent | 100ms equivalent |

### Optimization Strategies

```css
/* Use transform and opacity only */
.animating-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* Hardware acceleration */
}

/* Avoid layout thrashing */
.avoid-layout-animation {
  /* Instead of animating width, use transform: scaleX() */
  transform: scaleX(0.5);
  transform-origin: left;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Mobile optimization */
@media (max-width: 768px) {
  .particle-effect {
    /* Fewer particles on mobile */
    --particle-count: 10;
  }

  .complex-animation {
    /* Simplified animations */
    animation: simple-version 300ms;
  }
}
```

### Frame Rate Monitoring

```tsx
function useAnimationFrame(callback: (deltaTime: number) => void) {
  const frameRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        callback(deltaTime);
      }
      previousTimeRef.current = time;
      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [callback]);
}
```

---

## Animation States

### Game State Animations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    GAME STATE ANIMATION MATRIX                              │
├─────────────────────────────┬───────────────────────────────────────────────┤
│ GAME STATE                  │ ANIMATION SEQUENCE                            │
├─────────────────────────────┼───────────────────────────────────────────────┤
│                             │                                               │
│ IDLE                        │ • Subtle ambient motion                      │
│                             │ • Agent breathing                            │
│                             │ • Game elements at rest                      │
│                             │                                               │
├─────────────────────────────┼───────────────────────────────────────────────┤
│                             │                                               │
│ PLAYER THINKING             │ • Player cursor pulse                        │
│                             │ • Timer countdown animation                  │
│                             │ • Hand cards subtly lift                    │
│                             │                                               │
├─────────────────────────────┼───────────────────────────────────────────────┤
│                             │                                               │
│ AGENT THINKING              │ • Agent avatar glows                         │
│                             │ • Progress indicator fills                   │
│                             │ • Thinking bubble appears                    │
│                             │                                               │
├─────────────────────────────┼───────────────────────────────────────────────┤
│                             │                                               │
│ ACTION EXECUTION            │ • Element slides/scales                      │
│                             │ • Sound effect synchronized                 │
│                             │ • Particle burst at destination              │
│                             │                                               │
├─────────────────────────────┼───────────────────────────────────────────────┤
│                             │                                               │
│ TURN TRANSITION             │ • Current player highlight fades             │
│                             │ • Next player highlight builds               │
│                             │ • Focus shifts smoothly                     │
│                             │                                               │
├─────────────────────────────┼───────────────────────────────────────────────┤
│                             │                                               │
│ ROUND COMPLETE              │ • Score numbers animate                      │
│                             │ • Progress bar fills                        │
│                             │ • Brief celebration if won                   │
│                             │                                               │
├─────────────────────────────┼───────────────────────────────────────────────┤
│                             │                                               │
│ GAME COMPLETE               │ • Full celebration sequence                  │
│                             │ • Leaderboard animates in                    │
│                             │ • Trophy/medal presentation                  │
│                             │ • Agent congratulations                     │
│                             │                                               │
└─────────────────────────────┴───────────────────────────────────────────────┘
```

### Loading States

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       LOADING STATE ANIMATIONS                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ INITIAL LOAD                                                                │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  🐒                                                             30% │    │
│  │  Loading the adventure...                                          │    │
│  │                                                                     │    │
│  │  [|||||░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░]  │    │
│  │                                                                     │    │
│  │  "Fun fact: Monkeys were the first animals in space!"              │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  • Monkey bounces gently                                                   │
│  • Progress bar fills smoothly                                             │
│  • Fun facts cycle every 3 seconds                                         │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ AGENT CONNECTING                                                            │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  🧠                                                              ●  │    │
│  │  ChaosArchitect is connecting...                                   │    │
│  │                                                                     │    │
│  │     ● ○ ● ○ ● ○ ● ○                                               │    │
│  │                                                                     │    │
│  │  Retrying in 2s...                                                 │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  • Avatar pulses gently                                                    │
│  • Connection dots animate in sequence                                     │
│  • Retry countdown visible                                                 │
│                                                                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ GAME SYNCHRONIZING                                                          │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Syncing game state...                                             │    │
│  │                                                                     │    │
│  │      ⟳  ⟳  ⟳  ⟳                                                   │    │
│  │                                                                     │    │
│  │  3 players, 2 agents synchronized                                  │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  • Rotating sync icons                                                     │
│  • Player/agent count updates                                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Sound Design Integration

### Animation Sound Pairs

| Animation | Sound | Timing |
|-----------|-------|--------|
| Button hover | subtle-hover.mp3 | 50ms |
| Button click | click.mp3 | 0ms |
| Card hover | card-hover.mp3 | 0ms |
| Card play | card-slide.mp3 | 100ms |
| Modal open | modal-woosh.mp3 | 50ms |
| Modal close | modal-close.mp3 | 0ms |
| Toast appear | toast-pop.mp3 | 100ms |
| Toast dismiss | toast-dismiss.mp3 | 0ms |
| Agent thinking | thinking-hum.mp3 | loop |
| Agent celebrate | celebrate-chime.mp3 | 0ms |
| Points popup | points-ding.mp3 | 50ms |
| Victory | victory-fanfare.mp3 | 0ms |
| Error shake | error-buzz.mp3 | 0ms |

### Audio Implementation

```tsx
function useAnimationSound(animationType: AnimationType) {
  const audioContext = useRef<AudioContext>();

  useEffect(() => {
    // Preload sounds
    audioContext.current = new AudioContext();
    preloadSounds(animationType);
  }, [animationType]);

  const playAnimationSound = useCallback(() => {
    const sound = getSoundForAnimation(animationType);
    if (sound) {
      sound.play();
    }
  }, [animationType]);

  return playAnimationSound;
}
```

---

## Animation Checklist

### Before Shipping

- [ ] All animations meet 60fps target
- [ ] `prefers-reduced-motion` respected
- [ ] No layout thrashing animations
- [ ] Sound design integrated where appropriate
- [ ] Mobile performance verified
- [ ] Accessibility tested (screen readers)
- [ ] Agent personality animations distinct
- [ ] Loading states feel engaging, not waiting
- [ ] Celebration moments feel rewarding
- [ ] Error states are gentle, not jarring

---

*Animation is Monkeytown's pulse. Every motion should feel intentional, responsive, and alive.*
