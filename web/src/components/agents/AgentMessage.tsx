'use client';

import React, { CSSProperties, useState } from 'react';
import { AgentType, AGENT_COLORS } from '@monkeytown/packages/shared/game-types';

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

const AGENT_NAMES: Record<AgentType, string> = {
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

export interface AgentMessageProps {
  agent: AgentType;
  content: string;
  timestamp?: number;
  showEmoji?: boolean;
  showName?: boolean;
  showTimestamp?: boolean;
  variant?: 'default' | 'bubble' | 'compact';
  onProfileClick?: () => void;
  className?: string;
}

export function AgentMessage({
  agent,
  content,
  timestamp,
  showEmoji = true,
  showName = true,
  showTimestamp = true,
  variant = 'default',
  onProfileClick,
  className,
}: AgentMessageProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const color = AGENT_COLORS[agent];
  const emoji = AGENT_EMOJIS[agent];
  const name = AGENT_NAMES[agent];

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
    padding: variant === 'compact' ? 'var(--space-2)' : 'var(--space-4)',
    background: variant === 'bubble' ? `${color}10` : 'transparent',
    borderLeft: variant === 'default' ? `3px solid ${color}` : 'none',
    borderRadius: variant === 'bubble' ? 'var(--radius-lg)' : '0',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
  };

  const avatarStyles: CSSProperties = {
    width: variant === 'compact' ? 24 : 32,
    height: variant === 'compact' ? 24 : 32,
    borderRadius: 'var(--radius-full)',
    background: `${color}20`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: variant === 'compact' ? 14 : 18,
    cursor: onProfileClick ? 'pointer' : 'default',
    transition: 'transform var(--duration-fast) var(--ease-out)',
    ...(onProfileClick ? {
      transform: isExpanded ? 'scale(1.1)' : 'scale(1)',
    } : {}),
  };

  const nameStyles: CSSProperties = {
    fontWeight: 600,
    color: color,
    fontSize: variant === 'compact' ? 'var(--text-caption)' : 'var(--text-body)',
    cursor: onProfileClick ? 'pointer' : 'default',
  };

  const agentBadgeStyles: CSSProperties = {
    fontSize: 'var(--text-micro)',
    color: 'var(--color-text-tertiary)',
    padding: '2px 6px',
    background: `${color}10`,
    borderRadius: 'var(--radius-sm)',
  };

  const contentStyles: CSSProperties = {
    color: 'var(--color-text-primary)',
    fontSize: variant === 'compact' ? 'var(--text-caption)' : 'var(--text-body)',
    lineHeight: 'var(--line-height-relaxed)',
    marginLeft: variant === 'compact' ? 0 : (showEmoji ? 0 : 'var(--space-10)'),
  };

  const timestampStyles: CSSProperties = {
    fontSize: 'var(--text-micro)',
    color: 'var(--color-text-tertiary)',
    marginLeft: 'auto',
  };

  const emojiPrefixStyles: CSSProperties = {
    fontSize: variant === 'compact' ? '1.2em' : '1.5em',
    marginRight: 'var(--space-2)',
    display: 'inline-block',
    verticalAlign: 'middle',
  };

  const formatTimestamp = (ts: number): string => {
    const date = new Date(ts);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const shouldTruncate = content.length > 150 && variant === 'default';
  const displayContent = shouldTruncate && !isExpanded
    ? content.slice(0, 150) + '...'
    : content;

  return (
    <div
      className={className}
      style={containerStyles}
      data-testid="agent-message"
      data-agent={agent}
    >
      <div style={headerStyles}>
        {showEmoji && (
          <div
            style={avatarStyles}
            onClick={onProfileClick}
            role={onProfileClick ? 'button' : undefined}
            tabIndex={onProfileClick ? 0 : undefined}
            onKeyDown={(e) => {
              if (onProfileClick && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onProfileClick();
              }
            }}
          >
            {emoji}
          </div>
        )}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            {showName && (
              <span
                style={nameStyles}
                onClick={onProfileClick}
                role={onProfileClick ? 'button' : undefined}
                tabIndex={onProfileClick ? 0 : undefined}
              >
                {name}
              </span>
            )}
            <span style={agentBadgeStyles}>AI</span>
          </div>
        </div>
        {showTimestamp && timestamp && (
          <span style={timestampStyles}>
            {formatTimestamp(timestamp)}
          </span>
        )}
      </div>

      <div style={contentStyles}>
        <span style={emojiPrefixStyles}>💬</span>
        {displayContent}
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              background: 'none',
              border: 'none',
              color: color,
              cursor: 'pointer',
              fontSize: 'var(--text-caption)',
              marginLeft: 'var(--space-2)',
              padding: 0,
            }}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
}

export interface AgentDecisionMessageProps {
  agent: AgentType;
  decision: string;
  reasoning?: string;
  timestamp?: number;
}

export function AgentDecisionMessage({
  agent,
  decision,
  reasoning,
  timestamp,
}: AgentDecisionMessageProps) {
  const color = AGENT_COLORS[agent];
  const emoji = AGENT_EMOJIS[agent];

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
    padding: 'var(--space-4)',
    background: `${color}08`,
    border: `1px solid ${color}20`,
    borderRadius: 'var(--radius-lg)',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    paddingBottom: 'var(--space-2)',
    borderBottom: '1px solid var(--color-border-subtle)',
  };

  const iconStyles: CSSProperties = {
    fontSize: '1.2rem',
  };

  const labelStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    fontWeight: 600,
    color: color,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const decisionStyles: CSSProperties = {
    fontSize: 'var(--text-body)',
    color: 'var(--color-text-primary)',
    fontWeight: 500,
  };

  const reasoningStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    color: 'var(--color-text-secondary)',
    fontStyle: 'italic',
    lineHeight: 'var(--line-height-relaxed)',
  };

  return (
    <div style={containerStyles} data-testid="agent-decision-message" data-agent={agent}>
      <div style={headerStyles}>
        <span style={iconStyles}>{emoji}</span>
        <span style={labelStyles}>Decision Made</span>
      </div>
      <div style={decisionStyles}>{decision}</div>
      {reasoning && (
        <div style={reasoningStyles}>
          <strong>Reasoning:</strong> {reasoning}
        </div>
      )}
      {timestamp && (
        <div style={{ fontSize: 'var(--text-micro)', color: 'var(--color-text-tertiary)' }}>
          {new Date(timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
