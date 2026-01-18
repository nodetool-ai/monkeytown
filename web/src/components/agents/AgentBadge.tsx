'use client';

import React, { CSSProperties } from 'react';
import { AgentType, AgentStatus, AGENT_COLORS } from '@monkeytown/packages/shared';

export interface AgentBadgeProps {
  agent: AgentType;
  status?: AgentStatus;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
  showEmoji?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

const AGENT_EMOJIS: Record<AgentType, string> = {
  chaos: '🧠',
  curious: '🔍',
  designer: '🎨',
  security: '🔒',
  economist: '🍌',
  madchimp: '🐒',
  founder: '✨',
};

const AGENT_NAMES: Record<AgentType, string> = {
  chaos: 'ChaosArchitect',
  curious: 'CuriousGeorge',
  designer: 'PrimateDesigner',
  security: 'JungleSecurity',
  economist: 'BananaEconomist',
  madchimp: 'MadChimp',
  founder: 'FounderAI',
};

const STATUS_COLORS: Record<AgentStatus, string> = {
  online: 'var(--color-online)',
  away: 'var(--color-away)',
  busy: 'var(--color-busy)',
  offline: 'var(--color-offline)',
};

const STATUS_DOT_SIZE: Record<string, string> = {
  sm: '6px',
  md: '8px',
  lg: '10px',
};

export function AgentBadge({
  agent,
  status = 'online',
  size = 'md',
  showName = true,
  showEmoji = true,
  className,
  style,
  onClick,
}: AgentBadgeProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const sizeStyles: Record<string, CSSProperties> = {
    sm: {
      gap: 'var(--space-1)',
      padding: '4px 8px',
      fontSize: 'var(--text-caption)',
    },
    md: {
      gap: 'var(--space-2)',
      padding: '6px 12px',
      fontSize: 'var(--text-body)',
    },
    lg: {
      gap: 'var(--space-2)',
      padding: '8px 16px',
      fontSize: 'var(--text-body-large)',
    },
  };

  const containerStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: 'var(--radius-full)',
    background: `${AGENT_COLORS[agent]}15`,
    border: `1px solid ${AGENT_COLORS[agent]}30`,
    color: AGENT_COLORS[agent],
    fontWeight: 500,
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all var(--duration-fast) var(--ease-out)',
    ...sizeStyles[size],
    ...(onClick && isHovered ? {
      transform: 'translateY(-1px)',
      boxShadow: 'var(--shadow-sm)',
    } : {}),
    ...style,
  };

  const emojiStyles: CSSProperties = {
    fontSize: '1em',
    lineHeight: 1,
  };

  const nameStyles: CSSProperties = {
    fontFamily: 'var(--font-body)',
  };

  const statusDotStyles: CSSProperties = {
    width: STATUS_DOT_SIZE[size],
    height: STATUS_DOT_SIZE[size],
    borderRadius: '50%',
    background: STATUS_COLORS[status],
    marginLeft: 'auto',
    boxShadow: `0 0 8px ${STATUS_COLORS[status]}`,
  };

  const focusStyles: React.CSSProperties = onClick ? {
    outline: '2px solid var(--color-primary)',
    outlineOffset: '2px',
  } : {};

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      className={className}
      style={{ ...containerStyles, ...(onClick && isFocused ? focusStyles : {}) } as any}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `${AGENT_NAMES[agent]} agent, ${status} status` : undefined}
    >
      {showEmoji && (
        <span style={emojiStyles} aria-hidden="true">
          {AGENT_EMOJIS[agent]}
        </span>
      )}
      {showName && (
        <span style={nameStyles}>
          {AGENT_NAMES[agent]}
        </span>
      )}
      <span 
        style={statusDotStyles} 
        role="status" 
        aria-label={`Status: ${status}`}
      />
    </Component>
  );
}

export function getAgentEmoji(agent: AgentType): string {
  return AGENT_EMOJIS[agent];
}

export function getAgentName(agent: AgentType): string {
  return AGENT_NAMES[agent];
}

export function getAgentColor(agent: AgentType): string {
  return AGENT_COLORS[agent];
}
