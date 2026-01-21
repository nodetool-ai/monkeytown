'use client';

import React, { CSSProperties, useState, useEffect } from 'react';
import { AgentType, AgentStatus, AGENT_COLORS } from '@monkeytown/packages/shared/game-types';

const AGENT_EMOJIS: Record<AgentType, string> = {
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

export interface AgentPresenceIndicatorProps {
  agent: AgentType;
  status?: AgentStatus;
  isThinking?: boolean;
  onClick?: () => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

const POSITION_STYLES: Record<string, CSSProperties> = {
  'top-left': { top: 'var(--space-4)', left: 'var(--space-4)' },
  'top-right': { top: 'var(--space-4)', right: 'var(--space-4)' },
  'bottom-left': { bottom: 'var(--space-4)', left: 'var(--space-4)' },
  'bottom-right': { bottom: 'var(--space-4)', right: 'var(--space-4)' },
};

const SIZE_CONFIG: Record<string, { avatar: number; emoji: number; dot: number }> = {
  sm: { avatar: 24, emoji: 12, dot: 6 },
  md: { avatar: 32, emoji: 16, dot: 8 },
  lg: { avatar: 40, emoji: 20, dot: 10 },
};

const PULSE_ANIMATIONS: Record<AgentType, string> = {
  chaos: 'chaos-pulse 1200ms ease-mechanical infinite',
  curious: 'curious-pulse 1500ms ease-in-out infinite',
  designer: 'designer-pulse 800ms ease-organic infinite',
  security: 'security-pulse 2000ms ease-in-out infinite',
  economist: 'economist-pulse 600ms ease-mechanical infinite',
  madchimp: 'madchimp-pulse 800ms ease-in-out infinite',
  founder: 'founder-pulse 4000ms ease-organic infinite',
  gamedesigner: 'game-pulse 1000ms ease-organic infinite',
  gametester: 'test-pulse 1500ms ease-in-out infinite',
  trickster: 'trickster-pulse 900ms ease-in-out infinite',
  strategist: 'strategist-pulse 1300ms ease-in-out infinite',
  speedster: 'speedster-pulse 500ms ease-mechanical infinite',
  guardian: 'guardian-pulse 1800ms ease-in-out infinite',
  wildcard: 'wildcard-pulse 400ms ease-mechanical infinite',
  mentor: 'mentor-pulse 2000ms ease-in-out infinite',
  champion: 'champion-pulse 700ms ease-in-out infinite',
};

export function AgentPresenceIndicator({
  agent,
  status = 'online',
  isThinking = false,
  onClick,
  position = 'bottom-right',
  size = 'md',
  showName = true,
}: AgentPresenceIndicatorProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [pulseState, setPulseState] = useState(0);

  useEffect(() => {
    if (isThinking) {
      const interval = setInterval(() => {
        setPulseState(prev => (prev + 1) % 4);
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isThinking]);

  const config = SIZE_CONFIG[size];
  const color = AGENT_COLORS[agent];
  const emoji = AGENT_EMOJIS[agent];

  const containerStyles: CSSProperties = {
    position: 'absolute',
    ...POSITION_STYLES[position],
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    padding: 'var(--space-2)',
    background: `${color}10`,
    border: `1px solid ${color}30`,
    borderRadius: 'var(--radius-lg)',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all var(--duration-fast) var(--ease-out)',
    zIndex: 100,
    ...(onClick && isHovered ? {
      transform: 'scale(1.05)',
      boxShadow: `0 0 12px ${color}40`,
    } : {}),
  };

  const avatarStyles: CSSProperties = {
    position: 'relative',
    width: config.avatar,
    height: config.avatar,
    borderRadius: 'var(--radius-full)',
    background: `${color}20`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: config.emoji,
    animation: isThinking
      ? PULSE_ANIMATIONS[agent]
      : status === 'online'
      ? `subtle-glow 4000ms ease-in-out infinite`
      : 'none',
    boxShadow: isThinking
      ? `0 0 ${config.avatar}px ${color}80`
      : `0 0 8px ${color}40`,
  };

  const nameStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    maxWidth: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const statusDotStyles: CSSProperties = {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: config.dot,
    height: config.dot,
    borderRadius: '50%',
    background: isThinking
      ? color
      : status === 'online'
      ? 'var(--color-success)'
      : status === 'busy'
      ? 'var(--color-error)'
      : status === 'away'
      ? 'var(--color-warning)'
      : 'var(--color-text-tertiary)',
    border: '2px solid var(--color-bg-surface)',
    boxShadow: `0 0 6px ${isThinking ? color : 'var(--color-success)'}`,
  };

  const thinkingIndicatorStyles: CSSProperties = {
    position: 'absolute',
    inset: -2,
    borderRadius: '50%',
    border: `2px solid ${color}`,
    borderTopColor: 'transparent',
    animation: 'spin 0.8s linear infinite',
  };

  const rippleStyles: CSSProperties = {
    position: 'absolute',
    inset: -4,
    borderRadius: '50%',
    border: `1px solid ${color}60`,
    animation: 'ripple 1.5s ease-out infinite',
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      style={containerStyles}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={onClick ? 'button' : undefined}
      aria-label={`${agent} agent, ${status}${isThinking ? ', thinking' : ''}`}
      data-testid="agent-presence-indicator"
    >
      <div style={avatarStyles}>
        {isThinking && <div style={thinkingIndicatorStyles} />}
        {isThinking && pulseState > 0 && (
          <div
            style={{
              ...rippleStyles,
              animationDelay: '0ms',
              transform: `scale(${1 + pulseState * 0.1})`,
            }}
          />
        )}
        {emoji}
        {!isThinking && <div style={statusDotStyles} />}
      </div>
      {showName && (
        <span style={nameStyles}>
          {agent.charAt(0).toUpperCase() + agent.slice(1)}
        </span>
      )}
      {isThinking && (
        <span
          style={{
            fontSize: 'var(--text-micro)',
            color: color,
            animation: 'blink 1000ms ease-in-out infinite',
          }}
        >
          Thinking...
        </span>
      )}
    </Component>
  );
}
