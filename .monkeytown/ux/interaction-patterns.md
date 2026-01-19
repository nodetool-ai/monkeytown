# Interaction Patterns - Extended Exploration

## How Players Touch Monkeytown

**Extended interaction patterns that make every touch feel like conversation. These patterns go beyond utility to create connection, delight, and trust.**

---

## The Conversation Philosophy

### Interactions as Dialogue

Every interaction should feel like the player and interface are having a conversation. Not a form-filling exercise, but a back-and-forth exchange.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                    THE CONVERSATION MODEL                                    │
│                                                                              │
│  PLAYER → INTERFACE                                                          │
│  ═══════════════════                                                         │
│                                                                              │
│  Intent → The player wants something                                         │
│  Expression → The player acts (click, type, gesture)                         │
│  Commitment → The player confirms, commits                                   │
│                                                                              │
│  INTERFACE → PLAYER                                                          │
│  ══════════════════════                                                      │
│                                                                              │
│  Acknowledgment → "I see you"                                                │
│  Processing → "Let me think" (if needed)                                     │
│  Response → "Here's what happened"                                           │
│  Follow-up → "What next?"                                                    │
│                                                                              │
│  THE CONVERSATION CYCLE                                                      │
│  ════════════════════                                                        │
│                                                                              │
│  Player: "I want to play"                                                    │
│  Interface: "Welcome! Who with?"                                             │
│  Player: "Surprise me"                                                       │
│  Interface: "Perfect. ChaosArchitect is excited to play."                   │
│  Player: [Plays]                                                             │
│  Interface: "Nice move!"                                                     │
│  Player: [Wins]                                                              │
│  Interface: "🎉 Victory! Your best yet!"                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## The Living Input Patterns

### 1. The Greeting Input

Every input field should greet the player.

```tsx
interface GreetingInputProps {
  placeholder: string;
  greeting?: string;
  onChange: (value: string) => void;
}

export function GreetingInput({ placeholder, greeting, onChange }: GreetingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div style={{ position: 'relative' }}>
      {/* Greeting that appears when focused */}
      <div style={{
        position: 'absolute',
        top: isFocused ? '-20px' : '50%',
        left: '16px',
        transform: isFocused ? 'translateY(0)' : 'translateY(-50%)',
        fontSize: isFocused ? 'var(--text-caption)' : 'var(--text-body)',
        color: isFocused ? 'var(--color-primary)' : 'var(--color-text-tertiary)',
        transition: 'all 200ms var(--ease-organic)',
        pointerEvents: 'none',
      }}>
        {isFocused ? greeting : placeholder}
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          width: '100%',
          padding: 'var(--space-4)',
          background: isFocused ? 'var(--color-bg-elevated)' : 'var(--color-bg-surface)',
          border: `2px solid ${isFocused ? 'var(--color-primary)' : 'var(--color-border-subtle)'}`,
          borderRadius: 'var(--radius-lg)',
          color: 'var(--color-text-primary)',
          fontSize: 'var(--text-body)',
          outline: 'none',
          transition: 'all 200ms var(--ease-organic)',
          boxShadow: isFocused ? '0 0 20px var(--color-primary)20' : 'none',
        }}
      />
    </div>
  );
}
```

### 2. The Living Select

Selection that feels like choosing a companion.

```tsx
interface LivingSelectProps {
  options: { value: string; label: string; emoji?: string; color?: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export function LivingSelect({ options, value, onChange, label }: LivingSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selected = options.find(o => o.value === value);

  return (
    <div style={{ position: 'relative' }}>
      <label style={{
        display: 'block',
        fontSize: 'var(--text-caption)',
        color: 'var(--color-text-secondary)',
        marginBottom: 'var(--space-2)',
      }}>
        {label}
      </label>

      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: 'var(--space-4)',
          background: 'var(--color-bg-surface)',
          border: `1px solid ${isOpen ? 'var(--color-primary)' : 'var(--color-border-subtle)'}`,
          borderRadius: 'var(--radius-lg)',
          color: 'var(--color-text-primary)',
          fontSize: 'var(--text-body)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          cursor: 'pointer',
          transition: 'all 200ms var(--ease-organic)',
          boxShadow: isOpen ? '0 0 20px var(--color-primary)20' : 'none',
        }}
      >
        {selected?.emoji && <span>{selected.emoji}</span>}
        <span style={{ flex: 1, textAlign: 'left' }}>{selected?.label}</span>
        <span style={{
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 200ms var(--ease-organic)',
        }}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: 'var(--space-2)',
          background: 'var(--color-bg-surface)',
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          zIndex: 100,
          animation: 'slideDown 200ms var(--ease-organic)',
        }}>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: 'var(--space-3) var(--space-4)',
                background: option.value === value 
                  ? `${option.color || 'var(--color-primary)'}20` 
                  : 'transparent',
                border: 'none',
                color: 'var(--color-text-primary)',
                fontSize: 'var(--text-body)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                cursor: 'pointer',
                transition: 'all 150ms var(--ease-out)',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.background = 'var(--color-bg-elevated)';
                }
              }}
              onMouseLeave={(e) => {
                if (option.value !== value) {
                  e.currentTarget.style.background = 'transparent';
                }
              }}
            >
              {option.emoji && <span>{option.emoji}</span>}
              <span>{option.label}</span>
              {option.value === value && (
                <span style={{ marginLeft: 'auto', color: 'var(--color-primary)' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## The Agent Communication Patterns

### 1. The Thinking Reveal

When an agent is thinking, show it beautifully.

```tsx
interface ThinkingRevealProps {
  agent: AgentType;
  thinking: string;
  progress: number;
  onReveal?: () => void;
}

export function ThinkingReveal({ agent, thinking, progress, onReveal }: ThinkingRevealProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      background: 'var(--color-bg-surface)',
      border: `1px solid var(--color-border-subtle)`,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
      {/* Collapsed state */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          width: '100%',
          padding: 'var(--space-3) var(--space-4)',
          background: 'transparent',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          cursor: 'pointer',
          transition: 'all 200ms var(--ease-out)',
        }}
      >
        <NeuralNode agent={agent} status="thinking" size="sm" />
        <span style={{
          flex: 1,
          textAlign: 'left',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-secondary)',
        }}>
          {isExpanded ? 'Hide thinking' : 'Show thinking'}
        </span>
        <span style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 200ms var(--ease-organic)',
        }}>
          ▼
        </span>
      </button>

      {/* Expanded state */}
      {isExpanded && (
        <div style={{
          padding: 'var(--space-4)',
          borderTop: '1px solid var(--color-border-subtle)',
          animation: 'slideDown 200ms var(--ease-organic)',
        }}>
          {/* Progress bar */}
          <div style={{
            width: '100%',
            height: '4px',
            background: 'var(--color-bg-elevated)',
            borderRadius: 'var(--radius-full)',
            marginBottom: 'var(--space-3)',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: `var(--color-agent-${agent})`,
              borderRadius: 'var(--radius-full)',
              transition: 'width 300ms var(--ease-out)',
            }} />
          </div>

          {/* Thinking text */}
          <p style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-secondary)',
            fontStyle: 'italic',
            margin: 0,
          }}>
            "{thinking}"
          </p>

          {/* Neural visualization */}
          <NeuralThinkingPattern agent={agent} density="low" />
        </div>
      )}
    </div>
  );
}
```

### 2. The Memory Echo

When agents reference the past.

```tsx
interface MemoryEchoProps {
  type: 'recall' | 'anticipation' | 'celebration';
  memory: string;
  agent: AgentType;
  onDeepDive?: () => void;
}

export function MemoryEcho({ type, memory, agent, onDeepDive }: MemoryEchoProps) {
  const icons = {
    recall: '💭',
    anticipation: '🔮',
    celebration: '🎉',
  };

  return (
    <div style={{
      background: `linear-gradient(135deg, 
        var(--color-bg-surface) 0%, 
        ${getAgentColor(agent)}10 50%, 
        var(--color-bg-surface) 100%)`,
      border: `1px solid ${getAgentColor(agent)}30`,
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(
          circle at 0% 0%,
          ${getAgentColor(agent)}20 0%,
          transparent 50%
        )`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', position: 'relative' }}>
        <span style={{ fontSize: '24px' }}>{icons[type]}</span>
        
        <div style={{ flex: 1 }}>
          <NeuralAvatar agent={agent} status="online" size="sm" showEmoji showName />
          
          <p style={{
            fontSize: 'var(--text-body)',
            color: 'var(--color-text-primary)',
            marginTop: 'var(--space-2)',
            marginBottom: 0,
          }}>
            {memory}
          </p>
        </div>
      </div>

      {onDeepDive && (
        <button
          onClick={onDeepDive}
          style={{
            marginTop: 'var(--space-3)',
            padding: 'var(--space-2) var(--space-3)',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--text-caption)',
            cursor: 'pointer',
            transition: 'all 150ms var(--ease-out)',
          }}
        >
          See all memories →
        </button>
      )}
    </div>
  );
}
```

---

## The Celebration Patterns

### 1. The Victory Cascade

When a player wins, celebrate with cascading effects.

```tsx
interface VictoryCascadeProps {
  onComplete: () => void;
}

export function VictoryCascade({ onComplete }: VictoryCascadeProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Create particles
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: 50,
      y: 50,
      angle: (Math.random() * 360 * Math.PI) / 180,
      velocity: Math.random() * 2 + 1,
      size: Math.random() * 8 + 4,
      color: ['#FF6B35', '#FFD166', '#06D6A0', '#4CC9F0', '#F72585'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 500,
    }));
    setParticles(newParticles);

    // Cleanup after animation
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 1000,
    }}>
      {particles.map((particle) => (
        <VictoryParticle key={particle.id} {...particle} />
      ))}
    </div>
  );
}

function VictoryParticle({ x, y, angle, velocity, size, color, delay }: Particle) {
  const [pos, setPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime - delay;
      if (elapsed < 0) {
        requestAnimationFrame(animate);
        return;
      }

      const duration = 2000;
      const progress = elapsed / duration;

      if (progress >= 1) return;

      const distance = velocity * progress * 30;
      const currentX = 50 + Math.cos(angle) * distance;
      const currentY = 50 + Math.sin(angle) * distance + progress * progress * 20;
      const currentOpacity = 1 - progress;

      setPos({ x: currentX, y: currentY });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [angle, velocity, delay]);

  return (
    <div style={{
      position: 'absolute',
      left: `${pos.x}%`,
      top: `${pos.y}%`,
      width: size,
      height: size,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 ${size}px ${color}`,
      pointerEvents: 'none',
    }} />
  );
}
```

### 2. The Feedback Impact Ripple

When player feedback is implemented, ripple effects show the impact.

```tsx
interface FeedbackRippleProps {
  impact: number; // Number of players affected
  featureName: string;
  onDismiss: () => void;
}

export function FeedbackRipple({ impact, featureName, onDismiss }: FeedbackRippleProps) {
  const [ripples, setRipples] = useState<{ id: number; size: number; opacity: number }[]>([]);

  useEffect(() => {
    // Create expanding ripples
    const interval = setInterval(() => {
      setRipples(prev => [
        { id: Date.now(), size: 0, opacity: 0.6 },
        ...prev.slice(0, 4),
      ]);
    }, 800);

    const timer = setTimeout(onDismiss, 5000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onDismiss]);

  return (
    <div style={{
      position: 'fixed',
      bottom: 'var(--space-8)',
      right: 'var(--space-8)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-4)',
      padding: 'var(--space-4) var(--space-6)',
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-primary)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: '0 0 40px var(--color-primary)30',
      zIndex: 1000,
      animation: 'slideUp 400ms var(--ease-organic)',
    }}>
      {/* Ripple visualization */}
      <div style={{
        position: 'relative',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {ripples.map((ripple) => (
          <div
            key={ripple.id}
            style={{
              position: 'absolute',
              width: ripple.size,
              height: ripple.size,
              borderRadius: '50%',
              border: '2px solid var(--color-primary)',
              opacity: ripple.opacity,
              animation: 'ripple-expand 2000ms ease-out forwards',
            }}
          />
        ))}
        <span style={{ fontSize: '20px' }}>✨</span>
      </div>

      <div>
        <div style={{
          fontSize: 'var(--text-body)',
          fontWeight: 600,
          color: 'var(--color-primary)',
        }}>
          {impact} players using {featureName}
        </div>
        <div style={{
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-secondary)',
        }}>
          Your feedback made this happen
        </div>
      </div>
    </div>
  );
}
```

---

## The Error Recovery Patterns

### 1. The Gentle Nudge

When a player makes a mistake, nudge gently.

```tsx
interface GentleNudgeProps {
  message: string;
  hint: string;
  onRetry?: () => void;
  onIgnore?: () => void;
}

export function GentleNudge({ message, hint, onRetry, onIgnore }: GentleNudgeProps) {
  return (
    <div style={{
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-warning)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 'var(--space-3)',
      animation: 'gentle-shake 500ms var(--ease-organic)',
    }}>
      <span style={{ fontSize: '24px' }}>🤔</span>
      
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: 'var(--text-body)',
          fontWeight: 500,
          margin: 0,
          marginBottom: 'var(--space-1)',
        }}>
          {message}
        </p>
        <p style={{
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-secondary)',
          margin: 0,
        }}>
          {hint}
        </p>

        {(onRetry || onIgnore) && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
            {onRetry && (
              <LivingButton variant="primary" size="sm" onClick={onRetry}>
                Try Again
              </LivingButton>
            )}
            {onIgnore && (
              <LivingButton variant="ghost" size="sm" onClick={onIgnore}>
                Skip
              </LivingButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

### 2. The Connection Recovery

When connection is lost, show honest recovery.

```tsx
interface ConnectionRecoveryProps {
  lostAt: Date;
  onReconnect?: () => void;
  onCancel?: () => void;
}

export function ConnectionRecovery({ lostAt, onReconnect, onCancel }: ConnectionRecoveryProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - lostAt.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [lostAt]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-8)',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          margin: '0 auto var(--space-4)',
          borderRadius: '50%',
          background: 'var(--color-bg-elevated)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          animation: 'pulse-glow 2000ms ease-in-out infinite',
        }}>
          🔌
        </div>

        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-h3)',
          marginBottom: 'var(--space-2)',
        }}>
          Reconnecting...
        </h3>

        <p style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-4)',
        }}>
          Your game state is preserved. 
          {elapsed > 0 && ` Gone for ${elapsed}s.`}
        </p>

        <div style={{
          background: 'var(--color-bg-elevated)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-2)',
          }}>
            <span>▌</span>
            <span>▌</span>
            <span>▌</span>
            <span style={{ animation: 'blink 1000ms ease-in-out infinite' }}>▌</span>
          </div>
        </div>

        {onCancel && (
          <LivingButton variant="ghost" onClick={onCancel}>
            Leave Game
          </LivingButton>
        )}
      </div>
    </div>
  );
}
```

---

## The Gesture Patterns

### 1. The Victory Swipe

Celebrate wins with swipe gestures.

```tsx
// When a player wins, they can swipe to celebrate
function VictorySwipe({ onSwipe }: { onSwipe: (direction: 'left' | 'right' | 'up') => void }) {
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | 'up' | null>(null);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
    }}>
      <div style={{
        textAlign: 'center',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-h2)',
          marginBottom: 'var(--space-4)',
        }}>
          Victory!
        </h3>
        
        <p style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-6)',
        }}>
          Swipe to celebrate
        </p>

        <div style={{
          display: 'flex',
          gap: 'var(--space-4)',
          justifyContent: 'center',
        }}>
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-lg)',
          }}>
            ← Share
          </div>
          <div style={{
            padding: 'var(--space-4)',
            background: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-lg)',
          }}>
            Play Again →
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Accessibility in Interaction

### Respecting All Players

```tsx
interface AccessibleInteractionProps {
  children: React.ReactNode;
  reducedMotion?: boolean;
}

export function AccessibleInteraction({ children, reducedMotion }: AccessibleInteractionProps) {
  // All animations respect reduced motion preference
  const animationDuration = reducedMotion ? '0ms' : undefined;
  const animationEasing = reducedMotion ? 'step-end' : undefined;

  return (
    <div style={{ animationDuration, animationEasing }}>
      {children}
    </div>
  );
}

// Focus indicators are beautiful
export function AccessibleFocusRing({ children }: { children: React.ReactNode }) {
  return (
    <div
      tabIndex={0}
      style={{
        outline: 'none',
        '&:focus-visible': {
          outline: '2px solid var(--color-primary)',
          outlineOffset: '2px',
          borderRadius: 'var(--radius-md)',
        },
      }}
    >
      {children}
    </div>
  );
}
```

---

## Micro-Interaction Gallery

### Button Press

```
Default → Hover → Press → Release
           ↓        ↓        ↓
         Scale    Scale    Scale
         1.0→     0.98→    1.0
         1.05     0.95     with bounce
         glow+    glow++   glow
```

### Card Selection

```
Idle → Hover → Select → Active
       ↓       ↓        ↓
     Lift    Glow     Pulse
     +2px    agent    4% scale
     border  color    200ms
     color   20%      elastic
```

### Success Moment

```
Achieve → Pulse → Particles → Toast
     ↓        ↓          ↓         ↓
   Element  4% scale  Burst of    Gentle
   glow     200ms     confetti    notification
   gold     elastic   in agent    appears
                      color
```

### Connection Recovery

```
Detect → Pause → Search → Restore
   ↓       ↓        ↓        ↓
  Quick   Smooth   Pulsing  Brief
  fade    pause    indicator flash
  alert   then     progress  success
          recover  bar       message
```

---

*Interaction patterns extended by PrimateDesigner*
*Every touch tells a story*
