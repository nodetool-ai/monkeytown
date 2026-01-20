# Design System

## The Building Blocks of Monkeytown

**Complete component library for the living interface. Every component is designed to feel alive, respond with personality, and create meaningful connection with players.**

---

## Design Tokens

### Colors

```css
:root {
  /* Primary Colors */
  --color-primary: #FF6B35;
  --color-primary-hover: #FF8555;
  --color-primary-active: #E55B25;
  
  /* Semantic Colors */
  --color-success: #2EC4B6;
  --color-warning: #FFD166;
  --color-error: #FF206E;
  --color-info: #4CC9F0;
  
  /* Agent Colors */
  --color-agent-chaos: #4CC9F0;
  --color-agent-designer: #FFD166;
  --color-agent-security: #4361EE;
  --color-agent-economist: #7209B7;
  --color-agent-madchimp: #FF6B35;
  --color-agent-founder: #2EC4B6;
  --color-agent-gamedesigner: #FF6B35;
  --color-agent-gametester: #06D6A0;
  
  /* Background Colors */
  --color-bg-primary: #1A1A2E;
  --color-bg-surface: #242438;
  --color-bg-elevated: #2A2A42;
  --color-bg-floating: #303050;
  
  /* Text Colors */
  --color-text-primary: #EAEAEA;
  --color-text-secondary: #A0A0B0;
  --color-text-tertiary: #707080;
  
  /* Border Colors */
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-default: rgba(255, 255, 255, 0.15);
  
  /* Glow Colors */
  --glow-primary: rgba(255, 107, 53, 0.4);
  --glow-success: rgba(46, 196, 182, 0.4);
  --glow-error: rgba(255, 32, 110, 0.4);
}
```

### Typography

```css
:root {
  /* Font Families */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-heading: 'Outfit', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Type Scale */
  --text-display: 4rem;
  --text-h1: 2.5rem;
  --text-h2: 2rem;
  --text-h3: 1.5rem;
  --text-h4: 1.25rem;
  --text-body-large: 1.125rem;
  --text-body: 1rem;
  --text-caption: 0.875rem;
  --text-micro: 0.75rem;
  
  /* Line Heights */
  --line-height-tight: 1.1;
  --line-height-normal: 1.4;
  --line-height-relaxed: 1.6;
  
  /* Font Weights */
  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;
}
```

### Spacing

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
}
```

### Border Radius

```css
:root {
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
}
```

### Motion

```css
:root {
  /* Durations */
  --duration-microscopic: 80ms;
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-celebration: 500ms;
  --duration-page: 400ms;
  --duration-breathing: 4000ms;
  
  /* Easing */
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --ease-organic: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-mechanical: cubic-bezier(0.8, 0, 0.2, 1);
}
```

---

## Core Components

### Button

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg' | 'xl';
  glowColor?: string;
  loading?: boolean;
  pulse?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  glowColor,
  loading = false,
  pulse = false,
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeStyles = {
    sm: { height: '36px', padding: '0 var(--space-3)', fontSize: 'var(--text-caption)' },
    md: { height: '48px', padding: '0 var(--space-5)', fontSize: 'var(--text-body)' },
    lg: { height: '60px', padding: '0 var(--space-7)', fontSize: 'var(--text-body-large)' },
    xl: { height: '72px', padding: '0 var(--space-10)', fontSize: 'var(--text-h3)' },
  };

  const variantStyles = {
    primary: {
      background: glowColor || 'var(--color-primary)',
      color: 'var(--color-text-primary)',
      border: 'none',
    },
    secondary: {
      background: 'transparent',
      color: 'var(--color-text-primary)',
      border: '2px solid var(--color-border-default)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text-primary)',
      border: 'none',
    },
    danger: {
      background: 'var(--color-error)',
      color: 'var(--color-text-primary)',
      border: 'none',
    },
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
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...(isHovered && !disabled ? {
          transform: 'scale(1.02)',
          boxShadow: `0 0 30px ${glowColor || 'var(--color-primary)'}60`,
        } : {}),
        ...(isPressed && !disabled ? {
          transform: 'scale(0.98)',
          boxShadow: `0 0 15px ${glowColor || 'var(--color-primary)'}40`,
        } : {}),
        ...(pulse ? { animation: 'pulse-glow 2000ms ease-in-out infinite' } : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      disabled={disabled}
    >
      {loading && (
        <span style={{
          width: '20px',
          height: '20px',
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
      )}
      {children}
    </button>
  );
}
```

### Card

```tsx
interface CardProps {
  variant: 'default' | 'interactive' | 'glow';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glowColor?: string;
  selected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Card({
  variant = 'default',
  padding = 'md',
  glowColor,
  selected = false,
  children,
  onClick,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const paddingMap = {
    none: '0',
    sm: 'var(--space-3)',
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
  };

  const variantStyles = {
    default: {
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-subtle)',
    },
    interactive: {
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-subtle)',
      cursor: 'pointer',
    },
    glow: {
      background: 'var(--color-bg-surface)',
      border: `1px solid ${glowColor}40`,
    },
  };

  return (
    <div
      style={{
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
        ...(variant === 'glow' && isHovered ? {
          boxShadow: `0 0 40px ${glowColor}30`,
        } : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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

### Input

```tsx
interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  disabled?: boolean;
  error?: string;
  label?: string;
}

export function Input({
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
  error,
  label,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <label style={{
          display: 'block',
          marginBottom: 'var(--space-2)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-secondary)',
        }}>
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          padding: 'var(--space-4)',
          background: disabled ? 'var(--color-bg-elevated)' : 'var(--color-bg-surface)',
          border: `2px solid ${error ? 'var(--color-error)' : isFocused ? 'var(--color-primary)' : 'var(--color-border-subtle)'}`,
          borderRadius: 'var(--radius-lg)',
          color: 'var(--color-text-primary)',
          fontSize: 'var(--text-body)',
          transition: 'all var(--duration-fast) var(--ease-organic)',
          outline: 'none',
          opacity: disabled ? 0.5 : 1,
        }}
      />
      {error && (
        <span style={{
          display: 'block',
          marginTop: 'var(--space-2)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-error)',
        }}>
          {error}
        </span>
      )}
    </div>
  );
}
```

---

## Agent Components

### Neural Avatar

```tsx
type AgentType = 
  | 'chaos' | 'designer' | 'security' | 'economist' 
  | 'madchimp' | 'founder' | 'gamedesigner' | 'gametester';

interface AvatarProps {
  agent: AgentType;
  status: 'online' | 'away' | 'busy' | 'offline' | 'thinking';
  size: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
}

const agentConfig: Record<AgentType, { emoji: string; name: string; color: string }> = {
  chaos: { emoji: '🧠', name: 'ChaosArchitect', color: '#4CC9F0' },
  designer: { emoji: '🎨', name: 'PrimateDesigner', color: '#FFD166' },
  security: { emoji: '🛡️', name: 'JungleSecurity', color: '#4361EE' },
  economist: { emoji: '🍌', name: 'BananaEconomist', color: '#7209B7' },
  madchimp: { emoji: '🐒', name: 'MadChimp', color: '#FF6B35' },
  founder: { emoji: '✨', name: 'FounderAI', color: '#2EC4B6' },
  gamedesigner: { emoji: '🎲', name: 'GameDesigner', color: '#FF6B35' },
  gametester: { emoji: '🎯', name: 'GameTester', color: '#06D6A0' },
};

const statusConfig = {
  online: '#06D6A0',
  away: '#FFD166',
  busy: '#FF4444',
  offline: '#707080',
  thinking: null,
};

export function NeuralAvatar({
  agent,
  status = 'online',
  size = 'md',
  showName = true,
}: AvatarProps) {
  const config = agentConfig[agent];
  const statusColor = statusConfig[status];

  const sizeMap = {
    sm: { avatar: 32, emoji: 16, font: 'var(--text-micro)' },
    md: { avatar: 48, emoji: 24, font: 'var(--text-caption)' },
    lg: { avatar: 64, emoji: 32, font: 'var(--text-body)' },
    xl: { avatar: 96, emoji: 48, font: 'var(--text-h3)' },
  };

  const pulseAnimations: Record<AgentType, string> = {
    chaos: 'chaos-pulse 1200ms ease-mechanical infinite',
    designer: 'designer-pulse 800ms ease-organic infinite',
    security: 'security-pulse 2000ms ease-in-out infinite',
    economist: 'economist-pulse 600ms ease-mechanical infinite',
    madchimp: 'madchimp-pulse 800ms ease-in-out infinite',
    founder: 'founder-pulse 4000ms ease-organic infinite',
    gamedesigner: 'game-pulse 1000ms ease-organic infinite',
    gametester: 'test-pulse 1500ms ease-in-out infinite',
  };

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      padding: size === 'xl' ? 'var(--space-4)' : '4px 8px',
      background: `${config.color}15`,
      border: `1px solid ${config.color}30`,
      borderRadius: 'var(--radius-full)',
    }}>
      <div style={{
        position: 'relative',
        width: sizeMap[size].avatar,
        height: sizeMap[size].avatar,
        borderRadius: '50%',
        background: `${config.color}20`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: sizeMap[size].emoji,
        animation: status === 'thinking' ? pulseAnimations[agent] : 
                  status === 'online' ? `subtle-glow 4000ms ease-in-out infinite` : 'none',
        boxShadow: status === 'thinking' 
          ? `0 0 20px ${config.color}80`
          : `0 0 10px ${config.color}40`,
      }}>
        {config.emoji}
        {statusColor && (
          <span style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: size === 'sm' ? '8px' : '12px',
            height: size === 'sm' ? '8px' : '12px',
            borderRadius: '50%',
            background: statusColor,
            border: '2px solid var(--color-bg-surface)',
            boxShadow: `0 0 8px ${statusColor}`,
          }} />
        )}
      </div>
      {showName && (
        <span style={{
          fontSize: sizeMap[size].font,
          fontWeight: 500,
          color: config.color,
        }}>
          {config.name}
        </span>
      )}
    </div>
  );
}
```

### Thinking Field

```tsx
interface ThinkingFieldProps {
  agent: AgentType;
  reasoning: string;
  progress: number;
  nodes?: number;
}

export function ThinkingField({
  agent,
  reasoning,
  progress,
  nodes = 8,
}: ThinkingFieldProps) {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);
  const config = agentConfig[agent];

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
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-4)',
      position: 'relative',
      overflow: 'hidden',
    }}>
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
                ? config.color 
                : 'var(--color-border-subtle)',
              boxShadow: activeNodes.includes(i)
                ? `0 0 10px ${config.color}`
                : 'none',
              transition: 'all 200ms ease-out',
              transform: activeNodes.includes(i) ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        ))}
      </div>

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
          background: config.color,
          borderRadius: 'var(--radius-full)',
          transition: 'width 300ms ease-out',
          boxShadow: `0 0 10px ${config.color}`,
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

---

## Game Components

### Game Card

```tsx
interface GameCardProps {
  gameId: string;
  gameType: 'tictactoe' | 'babel' | 'chess' | 'words';
  mode: 'fast' | 'casual' | 'social' | 'competitive';
  status: 'waiting' | 'live' | 'ended';
  players: { type: 'human' | 'agent'; name: string }[];
  maxPlayers: number;
  onPlay?: () => void;
  onWatch?: () => void;
}

const gameConfig: Record<string, { icon: string; color: string; description: string }> = {
  tictactoe: { icon: '❌', color: '#FF6B35', description: 'Classic game! Get 3 in a row to win.' },
  babel: { icon: '🗼', color: '#4CC9F0', description: 'Build the tallest tower together!' },
  chess: { icon: '♟️', color: '#FFD166', description: 'Classic strategy against AI.' },
  words: { icon: '📝', color: '#7209B7', description: 'Create words and outsmart opponents.' },
};

const modeLabels = {
  fast: '⚡ Fast',
  casual: '☕ Casual',
  social: '👥 Social',
  competitive: '🏆 Competitive',
};

export function GameCard({
  gameType,
  mode,
  status,
  players,
  maxPlayers,
  onPlay,
  onWatch,
}: GameCardProps) {
  const config = gameConfig[gameType];

  return (
    <Card
      variant="interactive"
      glowColor={config.color}
      onClick={status === 'live' ? onWatch : onPlay}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-4)',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: 'var(--radius-lg)',
          background: `${config.color}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: `0 0 20px ${config.color}20`,
        }}>
          {config.icon}
        </div>
        
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-h3)',
            fontWeight: 600,
            margin: 0,
            textTransform: 'capitalize',
          }}>
            {gameType}
          </h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: '2px' }}>
            <span style={{
              fontSize: 'var(--text-caption)',
              color: status === 'live' ? 'var(--color-success)' : 
                     status === 'waiting' ? 'var(--color-warning)' : 
                     'var(--color-text-tertiary)',
            }}>
              {status === 'live' ? '● LIVE' : status === 'waiting' ? '⏳ WAITING' : '✓ ENDED'}
            </span>
            <span style={{
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-tertiary)',
            }}>
              {modeLabels[mode]}
            </span>
          </div>
        </div>
      </div>

      <p style={{
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--text-body)',
        marginBottom: 'var(--space-4)',
      }}>
        {config.description}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-4)',
      }}>
        <AvatarStack players={players} maxVisible={4} />
        <span style={{
          color: 'var(--color-text-secondary)',
          fontSize: 'var(--text-caption)',
        }}>
          {players.length}/{maxPlayers} players
        </span>
      </div>

      <Button
        variant="primary"
        size="lg"
        glowColor={config.color}
        style={{ width: '100%' }}
        onClick={(e) => {
          e.stopPropagation();
          (status === 'live' ? onWatch : onPlay)?.();
        }}
      >
        {status === 'live' ? '👁️ Watch' : '🎮 Jump In'}
      </Button>
    </Card>
  );
}
```

---

## Feedback Components

### Achievement Burst

```tsx
interface AchievementBurstProps {
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  agentMessage?: string;
  onShare?: () => void;
  onViewAll?: () => void;
}

const tierColors = {
  bronze: '#CD7F32',
  silver: '#C0C0C0',
  gold: '#FFD700',
  platinum: '#E5E4E2',
};

export function AchievementBurst({
  name,
  description,
  icon,
  tier,
  agentMessage,
  onShare,
  onViewAll,
}: AchievementBurstProps) {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      animation: 'fadeIn 300ms var(--ease-out)',
    }}>
      <div style={{
        background: 'var(--color-bg-surface)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-8)',
        maxWidth: '400px',
        width: '90%',
        textAlign: 'center',
        position: 'relative',
        animation: 'celebrate-enter 500ms var(--ease-elastic)',
      }}>
        <div style={{
          position: 'absolute',
          inset: -20,
          background: `radial-gradient(
            circle at center,
            ${tierColors[tier]}20 0%,
            transparent 70%
          )`,
          pointerEvents: 'none',
        }} />

        <div style={{
          fontSize: '64px',
          marginBottom: 'var(--space-4)',
          animation: 'bounce 1000ms var(--ease-elastic)',
        }}>
          {icon}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-h2)',
          fontWeight: 700,
          color: tierColors[tier],
          marginBottom: 'var(--space-2)',
        }}>
          {name}
        </h2>

        <p style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-6)',
        }}>
          {description}
        </p>

        {agentMessage && (
          <div style={{
            background: 'var(--color-bg-elevated)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            borderLeft: '3px solid var(--color-primary)',
          }}>
            <p style={{
              fontSize: 'var(--text-body)',
              fontStyle: 'italic',
              margin: 0,
            }}>
              "{agentMessage}"
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
          <Button variant="primary" onClick={onShare}>
            📤 Share
          </Button>
          <Button variant="secondary" onClick={onViewAll}>
            🏆 View All
          </Button>
        </div>
      </div>
    </div>
  );
}
```

---

## Animation Keyframes

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

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

## Layout Components

### Container

```tsx
interface ContainerProps {
  variant?: 'default' | 'forest' | 'nebula' | 'void';
  ambientMotion?: boolean;
  children: React.ReactNode;
}

export function Container({
  variant = 'default',
  ambientMotion = true,
  children,
}: ContainerProps) {
  const backgrounds = {
    default: 'var(--color-bg-primary)',
    forest: `
      radial-gradient(
        ellipse at 20% 20%,
        #1A2A1A 0%,
        var(--color-bg-primary) 50%
      )
    `,
    nebula: `
      radial-gradient(
        ellipse at center,
        #1A1A2E 0%,
        #0F0F1A 100%
      )
    `,
    void: '#050508',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: backgrounds[variant],
      position: 'relative',
      overflow: 'hidden',
    }}>
      {ambientMotion && <AmbientParticles variant={variant} />}

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'var(--space-6)',
      }}>
        {children}
      </div>
    </div>
  );
}

function AmbientParticles({ variant }: { variant: string }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
    }}>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            borderRadius: '50%',
            background: variant === 'forest' 
              ? 'rgba(76, 201, 240, 0.3)'
              : 'rgba(255, 107, 53, 0.2)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `drift ${Math.random() * 20 + 20}s linear infinite`,
            opacity: Math.random() * 0.5 + 0.2,
          }}
        />
      ))}
    </div>
  );
}
```

---

*Design system by PrimateDesigner*
*Building blocks for a living interface*
