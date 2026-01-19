# Design System - Extended Components

## The Building Blocks of Monkeytown

**Extended component library for the living interface. Each component is designed to feel alive, respond with personality, and delight players.**

---

## Bioluminescent Components

### The Living Button

Buttons should pulse with intention, responding to hover and press with organic motion.

```tsx
interface LivingButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg' | 'xl';
  glowColor?: string; // Agent color for personalization
  children: React.ReactNode;
  onClick?: () => void;
  loading?: boolean;
  pulse?: boolean; // Subtle pulse when waiting
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

  const baseStyles: CSSProperties = {
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
  };

  const sizeStyles = {
    sm: { height: '36px', padding: '0 var(--space-3)', fontSize: 'var(--text-caption)' },
    md: { height: '48px', padding: '0 var(--space-5)', fontSize: 'var(--text-body)' },
    lg: { height: '60px', padding: '0 var(--space-7)', fontSize: 'var(--text-body-large)' },
    xl: { height: '72px', padding: '0 var(--space-10)', fontSize: 'var(--text-h3)' },
  };

  const variantStyles = {
    primary: {
      background: glowColor || 'var(--color-primary)',
      color: 'var(--color-text-inverse)',
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
      color: 'var(--color-text-inverse)',
      border: 'none',
    },
  };

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
    return {
      transform: 'scale(0.98)',
    };
  };

  return (
    <button
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...(isPressed ? getPressedStyles() : isHovered ? getHoverStyles() : {}),
        ...(pulse ? { animation: 'pulse-glow 2000ms ease-in-out infinite' } : {}),
        opacity: loading ? 0.7 : 1,
        cursor: loading ? 'wait' : 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
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
      
      {loading ? (
        <span style={{
          width: '20px',
          height: '20px',
          border: '2px solid currentColor',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
      ) : children}
    </button>
  );
}
```

### The Living Card

Cards that respond to presence with subtle glow and organic movement.

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

  const paddingMap = {
    none: '0',
    sm: 'var(--space-3)',
    md: 'var(--space-4)',
    lg: 'var(--space-6)',
  };

  const baseStyles: CSSProperties = {
    background: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-lg)',
    padding: paddingMap[padding],
    transition: 'all var(--duration-normal) var(--ease-organic)',
    position: 'relative',
    overflow: 'hidden',
  };

  const variantStyles = {
    default: {},
    elevated: {
      boxShadow: 'var(--shadow-md)',
    },
    interactive: {
      cursor: 'pointer',
    },
    glow: {
      border: `1px solid ${glowColor}40`,
      background: `linear-gradient(135deg, 
        var(--color-bg-surface) 0%, 
        ${glowColor}10 50%, 
        var(--color-bg-surface) 100%)`,
    },
  };

  return (
    <div
      style={{
        ...baseStyles,
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

---

## Agent Components

### The Neural Avatar

Agent avatars that pulse with thinking.

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

  const agentEmojis: Record<AgentType, string> = {
    chaos: '🧠',
    curious: '🔍',
    designer: '🎨',
    security: '🔒',
    economist: '🍌',
    madchimp: '🐒',
    founder: '✨',
    gamedesigner: '🎲',
    gametester: '🎯',
    trickster: '🎭',
    strategist: '🧩',
    speedster: '⚡',
    guardian: '🛡️',
    wildcard: '🃏',
    mentor: '📚',
    champion: '🏆',
  };

  const agentNames: Record<AgentType, string> = {
    chaos: 'ChaosArchitect',
    curious: 'CuriousGeorge',
    designer: 'PrimateDesigner',
    security: 'JungleSecurity',
    economist: 'BananaEconomist',
    madchimp: 'MadChimp',
    founder: 'FounderAI',
    gamedesigner: 'GameDesigner',
    gametester: 'GameTester',
    trickster: 'TricksterMonkey',
    strategist: 'StrategistApe',
    speedster: 'SpeedyGibbon',
    guardian: 'GuardianGorilla',
    wildcard: 'WildcardLemur',
    mentor: 'MentorOrangutan',
    champion: 'ChampionChimp',
  };

  const statusColors = {
    online: '#06D6A0',
    away: '#FFD166',
    busy: '#FF4444',
    offline: '#707080',
    thinking: agentColors[agent],
  };

  const statusLabels = {
    online: 'Online',
    away: 'Away',
    busy: 'Busy',
    offline: 'Offline',
    thinking: 'Thinking...',
  };

  const sizeMap = {
    sm: { avatar: 32, emoji: 16, font: 'var(--text-micro)' },
    md: { avatar: 48, emoji: 24, font: 'var(--text-caption)' },
    lg: { avatar: 64, emoji: 32, font: 'var(--text-body)' },
    xl: { avatar: 96, emoji: 48, font: 'var(--text-h3)' },
  };

  const pulseAnimations = {
    chaos: 'chaos-pulse 1200ms ease-mechanical infinite',
    curious: 'curious-pulse 2000ms ease-organic infinite',
    designer: 'designer-pulse 800ms ease-organic infinite',
    security: 'security-pulse 2000ms ease-in-out infinite',
    economist: 'economist-pulse 600ms ease-mechanical infinite',
    madchimp: 'madchimp-pulse 800ms ease-chaotic infinite',
    founder: 'founder-pulse 4000ms ease-organic infinite',
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: size === 'xl' ? 'var(--space-4)' : '4px 8px',
        background: `${agentColors[agent]}10`,
        border: `1px solid ${agentColors[agent]}30`,
        borderRadius: 'var(--radius-full)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all var(--duration-fast) var(--ease-organic)',
      }}
      onClick={onClick}
    >
      {/* Avatar with glow */}
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

      {/* Name */}
      {showName && (
        <span style={{
          fontSize: sizeMap[size].font,
          fontWeight: 500,
          color: agentColors[agent],
        }}>
          {agentNames[agent]}
        </span>
      )}

      {/* Status label for thinking */}
      {status === 'thinking' && (
        <span style={{
          fontSize: 'var(--text-micro)',
          color: 'var(--color-text-tertiary)',
          animation: 'blink 1000ms ease-in-out infinite',
        }}>
          {statusLabels[status]}
        </span>
      )}
    </div>
  );
}
```

### The Agent Thinking Field

Visualizes agent reasoning as interconnected nodes.

```tsx
interface ThinkingFieldProps {
  agent: AgentType;
  reasoning: string;
  progress: number; // 0-100
  nodes?: number;
}

export function ThinkingField({ agent, reasoning, progress, nodes = 8 }: ThinkingFieldProps) {
  const [activeNodes, setActiveNodes] = useState<number[]>([]);

  useEffect(() => {
    // Simulate nodes lighting up
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

      {/* Reasoning text */}
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

### The Living Game Card

Game cards that feel alive with active gameplay.

```tsx
interface LivingGameCardProps {
  gameId: string;
  gameType: 'tictactoe' | 'babel' | 'chess' | 'words';
  mode: 'fast' | 'casual' | 'social' | 'competitive';
  status: 'waiting' | 'live' | 'ended';
  players: PlayerInfo[];
  maxPlayers: number;
  onPlay?: () => void;
  onWatch?: () => void;
}

export function LivingGameCard({
  gameType,
  mode,
  status,
  players,
  maxPlayers,
  onPlay,
  onWatch,
}: LivingGameCardProps) {
  const agentPlayers = players.filter(p => p.type === 'agent');
  const humanPlayers = players.filter(p => p.type === 'human');

  const gameColors: Record<string, string> = {
    tictactoe: '#FF6B35',
    babel: '#4CC9F0',
    chess: '#FFD166',
    words: '#7209B7',
  };

  const gameIcons: Record<string, string> = {
    tictactoe: '❌',
    babel: '🗼',
    chess: '♟️',
    words: '📝',
  };

  const modeLabels = {
    fast: '⚡ Fast',
    casual: '☕ Casual',
    social: '👥 Social',
    competitive: '🏆 Competitive',
  };

  return (
    <LivingCard
      variant="interactive"
      glowColor={gameColors[gameType]}
      onClick={status === 'live' ? onWatch : onPlay}
    >
      {/* Header */}
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
          background: `${gameColors[gameType]}15`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          boxShadow: `0 0 20px ${gameColors[gameType]}20`,
        }}>
          {gameIcons[gameType]}
        </div>
        
        <div>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-h3)',
            fontWeight: 600,
            margin: 0,
          }}>
            {gameType.charAt(0).toUpperCase() + gameType.slice(1)}
          </h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: '2px' }}>
            <Badge variant={status === 'live' ? 'success' : status === 'waiting' ? 'warning' : 'default'}>
              {status === 'live' && '● LIVE'}
              {status === 'waiting' && '⏳ WAITING'}
              {status === 'ended' && '✓ ENDED'}
            </Badge>
            <Badge variant="default">{modeLabels[mode]}</Badge>
          </div>
        </div>
      </div>

      {/* Description */}
      <p style={{
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--text-body)',
        marginBottom: 'var(--space-4)',
      }}>
        {gameType === 'tictactoe' && 'Classic game! Get 3 in a row to win.'}
        {gameType === 'babel' && 'Build the tallest tower together!'}
        {gameType === 'chess' && 'Classic strategy against AI.'}
        {gameType === 'words' && 'Create words and outsmart opponents.'}
      </p>

      {/* Players */}
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

      {/* Actions */}
      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
        <LivingButton
          variant="primary"
          size="lg"
          glowColor={gameColors[gameType]}
          style={{ flex: 1 }}
          onClick={(e) => {
            e.stopPropagation();
            onPlay?.();
          }}
        >
          {status === 'live' ? '👁️ Watch' : '🎮 Jump In'}
        </LivingButton>
      </div>
    </LivingCard>
  );
}
```

---

## Feedback Components

### The Feedback Celebration

When player feedback is implemented, celebrate it.

```tsx
interface FeedbackCelebrationProps {
  playerName: string;
  feedback: string;
  featureName: string;
  agentName: string;
  version: string;
  onTryIt?: () => void;
  onSeeOriginal?: () => void;
}

export function FeedbackCelebration({
  playerName,
  feedback,
  featureName,
  agentName,
  version,
  onTryIt,
  onSeeOriginal,
}: FeedbackCelebrationProps) {
  return (
    <div style={{
      background: 'var(--color-bg-surface)',
      border: '1px solid var(--color-primary)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-6)',
      position: 'relative',
      overflow: 'hidden',
      animation: 'celebrate-enter 500ms var(--ease-elastic)',
    }}>
      {/* Bioluminescent border effect */}
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'var(--radius-xl)',
        border: '2px solid var(--color-primary)',
        opacity: 0.3,
        animation: 'pulse-glow 2000ms ease-in-out infinite',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-4)',
        }}>
          <span style={{ fontSize: '2rem' }}>✨</span>
          <h3 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'var(--text-h2)',
            fontWeight: 600,
            margin: 0,
            color: 'var(--color-primary)',
          }}>
            Your Feedback Was Implemented!
          </h3>
        </div>

        {/* Attribution */}
        <p style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-4)',
        }}>
          "Based on player feedback, we've added <strong>{featureName}</strong>."
        </p>

        {/* Original feedback */}
        <div style={{
          background: 'var(--color-bg-elevated)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-4)',
          borderLeft: '3px solid var(--color-primary)',
        }}>
          <div style={{
            fontSize: 'var(--text-caption)',
            color: 'var(--color-text-tertiary)',
            marginBottom: 'var(--space-2)',
          }}>
            {playerName} suggested:
          </div>
          <p style={{
            fontSize: 'var(--text-body)',
            fontStyle: 'italic',
            margin: 0,
          }}>
            "{feedback}"
          </p>
        </div>

        {/* Meta */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-4)',
          fontSize: 'var(--text-caption)',
          color: 'var(--color-text-tertiary)',
        }}>
          <span>Shipped by {agentName}</span>
          <span>•</span>
          <span>Version {version}</span>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <LivingButton variant="primary" glowColor="var(--color-primary)" onClick={onTryIt}>
            🎮 Try It Now
          </LivingButton>
          <LivingButton variant="secondary" onClick={onSeeOriginal}>
            📜 See Original
          </LivingButton>
        </div>
      </div>
    </div>
  );
}
```

---

## Achievement Components

### The Achievement Burst

Celebrate achievements with a burst of light.

```tsx
interface AchievementBurstProps {
  achievement: {
    name: string;
    description: string;
    icon: string;
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  };
  agentMessage?: string;
  onShare?: () => void;
  onViewAll?: () => void;
}

export function AchievementBurst({
  achievement,
  agentMessage,
  onShare,
  onViewAll,
}: AchievementBurstProps) {
  const tierColors = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
  };

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
        {/* Burst effect */}
        <div style={{
          position: 'absolute',
          inset: -20,
          background: `radial-gradient(
            circle at center,
            ${tierColors[achievement.tier]}20 0%,
            transparent 70%
          )`,
          pointerEvents: 'none',
        }} />

        <div style={{
          fontSize: '64px',
          marginBottom: 'var(--space-4)',
          animation: 'bounce 1000ms var(--ease-elastic)',
        }}>
          {achievement.icon}
        </div>

        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-h2)',
          fontWeight: 700,
          color: tierColors[achievement.tier],
          marginBottom: 'var(--space-2)',
        }}>
          {achievement.name}
        </h2>

        <p style={{
          fontSize: 'var(--text-body)',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-6)',
        }}>
          {achievement.description}
        </p>

        {agentMessage && (
          <div style={{
            background: 'var(--color-bg-elevated)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)',
            borderLeft: `3px solid var(--color-primary)`,
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
          <LivingButton variant="primary" onClick={onShare}>
            📤 Share
          </LivingButton>
          <LivingButton variant="secondary" onClick={onViewAll}>
            🏆 View All
          </LivingButton>
        </div>
      </div>
    </div>
  );
}
```

---

## Layout Components

### The Living Container

A container that creates the living surface effect.

```tsx
interface LivingContainerProps {
  children: React.ReactNode;
  variant?: 'default' | 'forest' | 'nebula' | 'void';
  ambientMotion?: boolean;
}

export function LivingContainer({
  children,
  variant = 'default',
  ambientMotion = true,
}: LivingContainerProps) {
  const backgroundStyles = {
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
      background: backgroundStyles[variant],
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient particles (if ambientMotion) */}
      {ambientMotion && (
        <AmbientParticles variant={variant} />
      )}

      {/* Main content */}
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
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
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
  0% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-20px) translateX(10px);
  }
  50% {
    transform: translateY(-40px) translateX(-10px);
  }
  75% {
    transform: translateY(-20px) translateX(10px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}
```

---

*Design system extended by PrimateDesigner*
*Building blocks for a living interface*
