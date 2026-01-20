'use client';

import { CSSProperties, useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface BabelCard {
  id: string;
  value: number;
  suit?: 'stone' | 'brick' | 'wood' | 'glass';
}

interface SpecialActionIndicatorProps {
  card: BabelCard;
  isSelected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  showTooltip?: boolean;
}

export function SpecialActionIndicator({
  card,
  isSelected = false,
  onSelect,
  disabled = false,
  showTooltip = true,
}: SpecialActionIndicatorProps) {
  const [showDetails, setShowDetails] = useState(false);

  const getSpecialAction = (): { type: 'sabotage' | 'boost' | 'steal' | null; name: string; description: string; icon: string } | null => {
    if (card.value >= 15) {
      return {
        type: 'sabotage',
        name: 'Sabotage',
        description: 'Remove half the points from an opponent\'s tower',
        icon: '🎯',
      };
    }
    if (card.value >= 10) {
      return {
        type: 'boost',
        name: 'Boost',
        description: 'Add +5 bonus to your tower',
        icon: '⬆️',
      };
    }
    if (card.value >= 8) {
      return {
        type: 'steal',
        name: 'Steal',
        description: 'Take a card from the table',
        icon: '🃏',
      };
    }
    return null;
  };

  const specialAction = getSpecialAction();

  const containerStyles: CSSProperties = {
    position: 'relative',
    display: 'inline-block',
  };

  const cardStyles: CSSProperties = {
    width: '80px',
    height: '112px',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-bg-surface)',
    border: isSelected
      ? '3px solid var(--color-primary)'
      : `2px solid ${specialAction ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--duration-fast) var(--ease-out)',
    opacity: disabled ? 0.6 : 1,
    transform: isSelected ? 'translateY(-8px)' : 'translateY(0)',
    boxShadow: isSelected
      ? '0 8px 20px rgba(255, 107, 53, 0.3)'
      : specialAction
      ? '0 4px 12px rgba(255, 107, 53, 0.2)'
      : 'none',
    position: 'relative',
  };

  const cardValueStyles: CSSProperties = {
    fontSize: 'var(--text-h2)',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    color: specialAction ? 'var(--color-primary)' : 'var(--color-text-primary)',
  };

  const suitStyles: CSSProperties = {
    fontSize: '1.5rem',
    marginTop: 'var(--space-1)',
  };

  const specialBadgeStyles: CSSProperties = {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: 'var(--color-primary)',
    color: 'var(--color-text-inverse)',
    borderRadius: 'var(--radius-full)',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 700,
    boxShadow: 'var(--shadow-sm)',
    animation: 'pulse 2s infinite',
  };

  const tooltipStyles: CSSProperties = {
    position: 'absolute',
    bottom: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'var(--color-bg-primary)',
    border: 'var(--border-width-default) var(--color-border-default)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-3)',
    minWidth: '200px',
    zIndex: 100,
    boxShadow: 'var(--shadow-lg)',
    animation: 'fadeIn var(--duration-fast) var(--ease-out)',
  };

  const tooltipArrowStyles: CSSProperties = {
    position: 'absolute',
    bottom: '-6px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '0',
    height: '0',
    borderLeft: '6px solid transparent',
    borderRight: '6px solid transparent',
    borderTop: '6px solid var(--color-border-default)',
  };

  const actionTypeStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    fontWeight: 600,
    color: 'var(--color-primary)',
    marginBottom: 'var(--space-1)',
  };

  const actionDescriptionStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.4,
  };

  if (!specialAction) {
    return (
      <div style={containerStyles}>
        <div
          style={cardStyles}
          onClick={disabled ? undefined : onSelect}
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        >
          <span style={cardValueStyles}>{card.value}</span>
          {card.suit && (
            <span style={suitStyles}>
              {card.suit === 'stone' && '🪨'}
              {card.suit === 'brick' && '🧱'}
              {card.suit === 'wood' && '🪵'}
              {card.suit === 'glass' && '🪟'}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
      <div
        style={cardStyles}
        onClick={disabled ? undefined : onSelect}
        onMouseEnter={() => setShowDetails(true)}
        onMouseLeave={() => setShowDetails(false)}
      >
        <div style={specialBadgeStyles}>{specialAction.icon}</div>
        <span style={cardValueStyles}>{card.value}</span>
        {card.suit && (
          <span style={suitStyles}>
            {card.suit === 'stone' && '🪨'}
            {card.suit === 'brick' && '🧱'}
            {card.suit === 'wood' && '🪵'}
            {card.suit === 'glass' && '🪟'}
          </span>
        )}
      </div>

      {showTooltip && showDetails && (
        <div style={tooltipStyles}>
          <div style={tooltipArrowStyles} />
          <div style={actionTypeStyles}>
            <span>{specialAction.icon}</span>
            <span>{specialAction.name}</span>
          </div>
          <div style={actionDescriptionStyles}>{specialAction.description}</div>
          <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-micro)', color: 'var(--color-text-tertiary)' }}>
            Click to use this special action
          </div>
        </div>
      )}
    </div>
  );
}

interface SpecialActionsPanelProps {
  players: Array<{
    id: string;
    name: string;
    towerHeight: number;
  }>;
  onSelectTarget?: (playerId: string) => void;
  onCancel?: () => void;
  selectedCardValue: number;
}

export function SpecialActionsPanel({
  players,
  onSelectTarget,
  onCancel,
  selectedCardValue,
}: SpecialActionsPanelProps) {
  const getActionType = (): { type: 'sabotage' | 'boost' | 'steal' | null; name: string; description: string; icon: string } | null => {
    if (selectedCardValue >= 15) {
      return {
        type: 'sabotage',
        name: 'Sabotage',
        description: 'Choose a player to reduce their tower height',
        icon: '🎯',
      };
    }
    if (selectedCardValue >= 10) {
      return {
        type: 'boost',
        name: 'Boost',
        description: 'Your tower will receive +5 bonus',
        icon: '⬆️',
      };
    }
    return null;
  };

  const action = getActionType();

  const containerStyles: CSSProperties = {
    background: 'var(--color-bg-surface)',
    border: 'var(--border-width-default) var(--color-primary)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    minWidth: '280px)',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    marginBottom: 'var(--space-4)',
    paddingBottom: 'var(--space-3)',
    borderBottom: 'var(--border-width-hairline) var(--color-border-subtle)',
  };

  const titleStyles: CSSProperties = {
    fontWeight: 600,
    fontSize: 'var(--text-body)',
  };

  const playerListStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
  };

  const playerItemStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-3)',
    background: 'var(--color-bg-elevated)',
    borderRadius: 'var(--radius-md)',
    cursor: 'pointer',
    transition: 'all var(--duration-fast) var(--ease-out)',
  };

  const playerInfoStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
  };

  const playerNameStyles: CSSProperties = {
    fontWeight: 500,
  };

  const towerHeightStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    color: 'var(--color-text-secondary)',
  };

  if (!action) return null;

  const sabotageAmount = Math.floor(selectedCardValue / 2);

  return (
    <Card variant="elevated" padding="md" style={containerStyles}>
      <div style={headerStyles}>
        <span style={{ fontSize: '1.25rem' }}>{action.icon}</span>
        <span style={titleStyles}>{action.name}</span>
        <Badge variant="warning" size="sm">{selectedCardValue} pts</Badge>
      </div>

      <p style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
        {action.description}
      </p>

      {action.type === 'sabotage' && (
        <>
          <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-primary)', marginBottom: 'var(--space-3)' }}>
            💥 Damage: -{sabotageAmount} points
          </div>
          <div style={playerListStyles}>
            {players.map(player => (
              <div
                key={player.id}
                style={playerItemStyles}
                onClick={() => onSelectTarget?.(player.id)}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-primary)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={playerInfoStyles}>
                  <span>🎯</span>
                  <div>
                    <div style={playerNameStyles}>{player.name}</div>
                    <div style={towerHeightStyles}>Tower: {player.towerHeight} pts</div>
                  </div>
                </div>
                <span style={{ color: 'var(--color-error)', fontSize: 'var(--text-caption)' }}>
                  -{sabotageAmount}
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {action.type === 'boost' && (
        <Card variant="default" padding="md" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.5rem', marginBottom: 'var(--space-2)' }}>⬆️</div>
          <div style={{ fontWeight: 600, color: 'var(--color-success)', marginBottom: 'var(--space-1)' }}>
            +5 Bonus Points
          </div>
          <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
            Added to your tower height automatically
          </div>
        </Card>
      )}

      {onCancel && (
        <button
          onClick={onCancel}
          style={{
            marginTop: 'var(--space-4)',
            width: '100%',
            padding: 'var(--space-2)',
            background: 'transparent',
            border: 'var(--border-width-hairline) var(--color-border-subtle)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontSize: 'var(--text-caption)',
          }}
        >
          Cancel Special Action
        </button>
      )}
    </Card>
  );
}

export function isSpecialCard(card: BabelCard): boolean {
  return card.value >= 8;
}

export function getSpecialActionType(card: BabelCard): 'sabotage' | 'boost' | 'steal' | null {
  if (card.value >= 15) return 'sabotage';
  if (card.value >= 10) return 'boost';
  if (card.value >= 8) return 'steal';
  return null;
}
