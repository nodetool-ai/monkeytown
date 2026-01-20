# Interaction Patterns - PrimateDesigner

## How Players Touch Monkeytown

### The Conversation Philosophy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    THE CONVERSATION MODEL                                    │
├─────────────────────────────────────────────────────────────────────────────┤
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
└─────────────────────────────────────────────────────────────────────────────┘
```

### The Living Input Patterns

**1. The Greeting Input**

Every input field greets the player:

```tsx
export function GreetingInput({ placeholder, greeting, onChange }: GreetingInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div style={{ position: 'relative' }}>
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
        onChange={(e) => { setValue(e.target.value); onChange(e.target.value); }}
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

**2. The Living Select**

Selection that feels like choosing a companion:

```tsx
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
              onClick={() => { onChange(option.value); setIsOpen(false); }}
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
                textAlign: 'left',
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

### Agent Communication Patterns

**1. The Thinking Reveal**

```tsx
interface ThinkingRevealProps {
  agent: AgentType;
  thinking: string;
  progress: number;
}

export function ThinkingReveal({ agent, thinking, progress }: ThinkingRevealProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div style={{
      background: 'var(--color-bg-surface)',
      border: `1px solid var(--color-border-subtle)`,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
    }}>
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
        }}
      >
        <NeuralNode agent={agent} status="thinking" size="sm" />
        <span style={{ flex: 1, textAlign: 'left', fontSize: 'var(--text-caption)' }}>
          {isExpanded ? 'Hide thinking' : 'Show thinking'}
        </span>
        <span style={{
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 200ms var(--ease-organic)',
        }}>
          ▼
        </span>
      </button>

      {isExpanded && (
        <div style={{
          padding: 'var(--space-4)',
          borderTop: '1px solid var(--color-border-subtle)',
          animation: 'slideDown 200ms var(--ease-organic)',
        }}>
          <div style={{
            width: '100%',
            height: '4px',
            background: 'var(--color-bg-elevated)',
            borderRadius: 'var(--radius-full)',
            marginBottom: 'var(--space-3)',
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: `var(--color-agent-${agent})`,
              borderRadius: 'var(--radius-full)',
              transition: 'width 300ms var(--ease-out)',
            }} />
          </div>
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
            "{thinking}"
          </p>
        </div>
      )}
    </div>
  );
}
```

**2. The Memory Echo**

```tsx
interface MemoryEchoProps {
  type: 'recall' | 'anticipation' | 'celebration';
  memory: string;
  agent: AgentType;
}

export function MemoryEcho({ type, memory, agent }: MemoryEchoProps) {
  const icons = { recall: '💭', anticipation: '🔮', celebration: '🎉' };

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
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 0% 0%, ${getAgentColor(agent)}20 0%, transparent 50%)`, pointerEvents: 'none' }} />
      
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', position: 'relative' }}>
        <span style={{ fontSize: '24px' }}>{icons[type]}</span>
        <div style={{ flex: 1 }}>
          <NeuralAvatar agent={agent} status="online" size="sm" showEmoji showName />
          <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-primary)', marginTop: 'var(--space-2)' }}>
            {memory}
          </p>
        </div>
      </div>
    </div>
  );
}
```

### Celebration Patterns

**Victory Cascade:**
- 50 particles burst from center
- Agent-specific colors
- 2-second animation
- Achievement badge appears

**Feedback Impact Ripple:**
- Expanding rings show player impact
- "X players using feature" text
- Sticky notification
- 5-second auto-dismiss

### Error Recovery Patterns

**The Gentle Nudge:**
```tsx
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
        <p style={{ fontSize: 'var(--text-body)', fontWeight: 500, margin: 0 }}>{message}</p>
        <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)', margin: 0 }}>{hint}</p>
        {(onRetry || onIgnore) && (
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
            {onRetry && <LivingButton variant="primary" size="sm">Try Again</LivingButton>}
            {onIgnore && <LivingButton variant="ghost" size="sm">Skip</LivingButton>}
          </div>
        )}
      </div>
    </div>
  );
}
```

**The Connection Recovery:**
- Overlay with pulse animation
- "Reconnecting..." text
- Progress indicator
- "Gone for X seconds"
- Leave game option

### Micro-Interaction Gallery

| Interaction | States | Animation |
|-------------|--------|-----------|
| Button Press | Default → Hover → Press → Release | Scale 1.0→1.05→0.98→1.0, glow changes |
| Card Selection | Idle → Hover → Select → Active | Lift +2px, agent glow, 4% scale pulse |
| Success Moment | Achieve → Pulse → Particles → Toast | Element glow, elastic bounce, confetti |
| Connection Recovery | Detect → Pause → Search → Restore | Quick alert, smooth pause, pulsing progress |

### Accessibility in Interaction

- All animations respect `prefers-reduced-motion`
- Focus indicators are beautiful (agent-colored glow ring)
- Semantic HTML structure
- ARIA labels for custom components
- Live regions for dynamic updates

---

*Interaction patterns by PrimateDesigner*
*Every touch tells a story*
