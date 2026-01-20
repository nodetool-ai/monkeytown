# Design System - PrimateDesigner

## The Building Blocks of Monkeytown

### Core Design Tokens

```css
:root {
  /* Colors */
  --color-primary: #FF6B35;
  --color-success: #2EC4B6;
  --color-warning: #FFD166;
  --color-error: #FF4444;
  
  --color-bg-primary: #1A1A2E;
  --color-bg-surface: #242438;
  --color-bg-elevated: #2A2A42;
  
  --color-text-primary: #EAEAEA;
  --color-text-secondary: #A0A0B0;
  --color-text-tertiary: #707080;
  
  /* Agent Colors */
  --color-agent-chaos: #4CC9F0;
  --color-agent-designer: #FFD166;
  --color-agent-security: #4361EE;
  --color-agent-economist: #7209B7;
  --color-agent-madchimp: #FF6B35;
  --color-agent-founder: #2EC4B6;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-7: 28px;
  --space-8: 32px;
  --space-9: 36px;
  --space-10: 40px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-heading: 'Outfit', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-celebration: 800ms;
  
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-organic: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### The Living Button

```tsx
interface LivingButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg' | 'xl';
  glowColor?: string;
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  pulse?: boolean;
}

export function LivingButton({
  variant = 'primary',
  size = 'md',
  glowColor,
  children,
  onClick,
  loading = false,
  pulse = false,
}: LivingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const getHoverStyles = () => {
    if (variant === 'primary' || variant === 'danger') {
      return {
        transform: 'scale(1.02)',
        boxShadow: `0 0 30px ${glowColor || 'var(--color-primary)'}60`,
      };
    }
    return {
      borderColor: glowColor || 'var(--color-primary)',
      background: 'rgba(255, 255, 255, 0.05)',
    };
  };

  const getPressedStyles = () => {
    if (variant === 'primary' || variant === 'danger') {
      return {
        transform: 'scale(0.98)',
        boxShadow: `0 0 15px ${glowColor || 'var(--color-primary)'}40`,
      };
    }
    return { transform: 'scale(0.98)' };
  };

  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-2)',
        fontWeight: 600,
        borderRadius: 'var(--radius-lg)',
        transition: 'all var(--duration-fast) var(--ease-organic)',
        whiteSpace: 'nowrap',
        position: 'relative',
        overflow: 'hidden',
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...(isPressed ? getPressedStyles() : isHovered ? getHoverStyles() : {}),
        ...(pulse ? { animation: 'pulse-glow 2000ms ease-in-out infinite' } : {}),
        opacity: loading ? 0.7 : 1,
        cursor: loading ? 'wait' : 'pointer',
      }}
      disabled={loading}
    >
      {/* Bioluminescent edge effect */}
      {variant === 'primary' && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'var(--radius-lg)',
          border: `1px solid ${glowColor || 'var(--color-primary)'}40`,
          pointerEvents: 'none',
        }} />
      )}
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
}
```

### The Living Card

```tsx
interface LivingCardProps {
  variant: 'default' | 'elevated' | 'interactive' | 'glow';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glowColor?: string;
  children: React.ReactNode;
  onClick?: () => void;
  selected?: boolean;
}

export function LivingCard({
  variant = 'default',
  padding = 'md',
  glowColor,
  children,
  onClick,
  selected = false,
}: LivingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: paddingMap[padding],
        transition: 'all var(--duration-normal) var(--ease-organic)',
        position: 'relative',
        overflow: 'hidden',
        ...variantStyles[variant],
        ...(selected ? {
          borderColor: glowColor,
          boxShadow: `0 0 20px ${glowColor}40`,
        } : {}),
        ...(variant === 'interactive' && isHovered ? {
          transform: 'translateY(-4px)',
          borderColor: 'var(--color-border-default)',
          boxShadow: `0 8px 30px ${glowColor || 'var(--color-primary)'}20`,
        } : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient texture */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(
          circle at ${isHovered ? '50%' : '50% 0%'} 0%,
          rgba(255, 255, 255, 0.03) 0%,
          transparent 70%
        )`,
        pointerEvents: 'none',
      }} />
      {children}
    </div>
  );
}
```

### The Neural Avatar

```tsx
interface NeuralAvatarProps {
  agent: AgentType;
  status: 'online' | 'away' | 'busy' | 'offline' | 'thinking';
  size: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  showEmoji?: boolean;
  onClick?: () => void;
}

export function NeuralAvatar({
  agent,
  status = 'online',
  size = 'md',
  showName = true,
  showEmoji = true,
  onClick,
}: NeuralAvatarProps) {
  const agentColors: Record<AgentType, string> = {
    chaos: '#4CC9F0',
    curious: '#F72585',
    designer: '#FFD166',
    security: '#4361EE',
    economist: '#7209B7',
    madchimp: '#FF6B35',
    founder: '#2EC4B6',
    gamedesigner: '#FF6B35',
    gametester: '#06D6A0',
    trickster: '#D946EF',
    strategist: '#6366F1',
    speedster: '#F59E0B',
    guardian: '#64748B',
    wildcard: '#FB7185',
    mentor: '#10B981',
    champion: '#EF4444',
  };

  const statusColors = {
    online: '#06D6A0',
    away: '#FFD166',
    busy: '#FF4444',
    offline: '#707080',
    thinking: agentColors[agent],
  };

  const pulseAnimations = {
    chaos: 'chaos-pulse 1200ms ease-mechanical infinite',
    designer: 'designer-pulse 800ms ease-organic infinite',
    security: 'security-pulse 2000ms ease-in-out infinite',
    economist: 'economist-pulse 600ms ease-mechanical infinite',
    madchimp: 'madchimp-pulse 800ms ease-chaotic infinite',
    founder: 'founder-pulse 4000ms ease-organic infinite',
  };

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      padding: size === 'xl' ? 'var(--space-4)' : '4px 8px',
      background: `${agentColors[agent]}10`,
      border: `1px solid ${agentColors[agent]}30`,
      borderRadius: 'var(--radius-full)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all var(--duration-fast) var(--ease-organic)',
    }}>
      <div style={{
        position: 'relative',
        width: sizeMap[size].avatar,
        height: sizeMap[size].avatar,
        borderRadius: '50%',
        background: `${agentColors[agent]}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: sizeMap[size].emoji,
        animation: status === 'thinking' ? pulseAnimations[agent] : 
                  status === 'online' ? `subtle-glow 4000ms ease-in-out infinite` : 'none',
        boxShadow: status === 'thinking' 
          ? `0 0 20px ${agentColors[agent]}80`
          : `0 0 10px ${agentColors[agent]}40`,
      }}>
        {showEmoji && agentEmojis[agent]}
        
        {/* Status indicator */}
        <span style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: size === 'sm' ? '8px' : '12px',
          height: size === 'sm' ? '8px' : '12px',
          borderRadius: '50%',
          background: statusColors[status],
          border: `2px solid var(--color-bg-surface)`,
          boxShadow: `0 0 8px ${statusColors[status]}`,
        }} />
      </div>

      {showName && (
        <span style={{
          fontSize: sizeMap[size].font,
          fontWeight: 500,
          color: agentColors[agent],
        }}>
          {agentNames[agent]}
        </span>
      )}
    </div>
  );
}
```

### The Agent Thinking Field

```tsx
interface ThinkingFieldProps {
  agent: AgentType;
  reasoning: string;
  progress: number;
  nodes?: number;
}

export function ThinkingField({ agent, reasoning, progress, nodes = 8 }: ThinkingFieldProps) {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNodes(prev => {
        const next = [...prev, Math.floor(Math.random() * nodes)];
        return next.slice(-nodes);
      });
    }, 200);
    return () => clearInterval(interval);
  }, [nodes]);

  return (
    <div style={{
      background: 'var(--color-bg-surface)',
      border: `1px solid var(--color-border-subtle)`,
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Neural network visualization */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        marginBottom: 'var(--space-3)',
        height: '60px',
      }}>
        {Array.from({ length: nodes }).map((_, i) => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: activeNodes.includes(i) 
                ? `var(--color-agent-${agent})`
                : 'var(--color-border-subtle)',
              boxShadow: activeNodes.includes(i)
                ? `0 0 10px var(--color-agent-${agent})`
                : 'none',
              transition: 'all 200ms ease-out',
              transform: activeNodes.includes(i) ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{
        width: '100%',
        height: '4px',
        background: 'var(--color-bg-elevated)',
        borderRadius: 'var(--radius-full)',
        overflow: 'hidden',
        marginBottom: 'var(--space-3)',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: `var(--color-agent-${agent})`,
          borderRadius: 'var(--radius-full)',
          transition: 'width 300ms ease-out',
          boxShadow: `0 0 10px var(--color-agent-${agent})`,
        }} />
      </div>

      <p style={{
        fontSize: 'var(--text-caption)',
        color: 'var(--color-text-secondary)',
        fontStyle: 'italic',
        margin: 0,
      }}>
        {reasoning}
      </p>
    </div>
  );
}
```

### Keyframe Animations

```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px var(--glow-color, var(--color-primary));
  }
  50% {
    box-shadow: 0 0 40px var(--glow-color, var(--color-primary));
  }
}

@keyframes subtle-glow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

@keyframes celebrate-enter {
  0% {
    transform: scale(0.8) translateY(20px);
    opacity: 0;
  }
  50% {
    transform: scale(1.05) translateY(-5px);
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@keyframes drift {
  0% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(-40px) translateX(-10px); }
  75% { transform: translateY(-20px) translateX(10px); }
  100% { transform: translateY(0) translateX(0); }
}
```

---

*Design system by PrimateDesigner*
*Building blocks for a living interface*
