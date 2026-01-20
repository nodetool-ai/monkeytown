'use client';

import React, { CSSProperties } from 'react';
import { GameType, GameMode, GameStatus, PlayerType, AGENT_COLORS, AgentType } from '@monkeytown/packages/shared/game-types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

const GAME_ICONS: Record<GameType, string> = {
  tictactoe: '❌',
  babel: '🗼',
  chess: '♟️',
  words: '📝',
};

const GAME_NAMES: Record<GameType, string> = {
  tictactoe: 'TicTacToe',
  babel: 'Babel Tower',
  chess: 'Monkey Chess',
  words: 'Word Builder',
};

const GAME_DESCRIPTIONS: Record<GameType, string> = {
  tictactoe: 'Classic game! Get 3 in a row to win.',
  babel: 'Build the tallest tower together with your team!',
  chess: 'Classic strategy against AI opponents.',
  words: 'Create words and outsmart your opponents.',
};

const MODE_LABELS: Record<GameMode, string> = {
  fast: '⚡ Fast',
  casual: '☕ Casual',
  social: '👥 Social',
  competitive: '🏆 Competitive',
};

interface PlayerInfo {
  id: string;
  type: PlayerType;
  name: string;
  agentType?: AgentType;
}

interface GameCardProps {
  gameId: string;
  gameType: GameType;
  mode: GameMode;
  status: GameStatus;
  players: PlayerInfo[];
  maxPlayers: number;
  onPlay: () => void;
  onWatch?: () => void;
}

export function GameCard({
  gameId,
  gameType,
  mode,
  status,
  players,
  maxPlayers,
  onPlay,
  onWatch,
}: GameCardProps) {
  const agentPlayers = players.filter(p => p.type === 'agent');
  const humanPlayers = players.filter(p => p.type === 'human');

  const statusVariant: 'success' | 'warning' | 'default' = status === 'live' ? 'success' : status === 'waiting' ? 'warning' : 'default';

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '280px',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    marginBottom: 'var(--space-4)',
  };

  const iconStyles: CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-lg)',
    background: `${AGENT_COLORS[gameType === 'tictactoe' ? 'strategist' : gameType === 'babel' ? 'chaos' : gameType === 'chess' ? 'designer' : 'economist']}15`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  };

  const titleStyles: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-h3)',
    fontWeight: 600,
  };

  const descriptionStyles: CSSProperties = {
    color: 'var(--color-text-secondary)',
    fontSize: 'var(--text-body)',
    marginBottom: 'var(--space-4)',
    flex: 1,
  };

  const playersSectionStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    marginBottom: 'var(--space-4)',
  };

  const avatarStackStyles: CSSProperties = {
    display: 'flex',
    marginRight: 'var(--space-2)',
  };

  const getAvatarStyle = (isAgent: boolean, index: number, agentType?: AgentType): CSSProperties => ({
    width: '28px',
    height: '28px',
    borderRadius: 'var(--radius-full)',
    background: isAgent && agentType
      ? `${AGENT_COLORS[agentType]}30`
      : 'var(--color-bg-elevated)',
    border: '2px solid var(--color-bg-surface)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    marginLeft: index > 0 ? '-8px' : 0,
    zIndex: 10 - index,
  });

  const extraPlayersStyle: CSSProperties = {
    ...getAvatarStyle(false, 3),
    background: 'var(--color-bg-elevated)',
    fontSize: '10px',
    fontWeight: 600,
  };

  const actionsStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--space-2)',
    marginTop: 'auto',
  };

  return (
    <Card variant="interactive" padding="lg" style={containerStyles} data-testid={`game-card-${gameId}`}>
      <div style={headerStyles}>
        <div style={iconStyles}>
          {GAME_ICONS[gameType]}
        </div>
        <div>
          <h3 style={titleStyles}>{GAME_NAMES[gameType]}</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: '2px' }}>
            <Badge variant={statusVariant} size="sm">
              {status === 'live' && '● LIVE'}
              {status === 'waiting' && '⏳ WAITING'}
              {status === 'ended' && '✓ ENDED'}
            </Badge>
            <Badge variant="default" size="sm">
              {MODE_LABELS[mode]}
            </Badge>
          </div>
        </div>
      </div>

      <p style={descriptionStyles}>
        {GAME_DESCRIPTIONS[gameType]}
      </p>

      <div style={playersSectionStyles}>
        <div style={avatarStackStyles}>
          {humanPlayers.slice(0, 3).map((player, index) => (
            <div key={player.id} style={getAvatarStyle(false, index)}>
              👤
            </div>
          ))}
          {humanPlayers.length > 3 && (
            <div style={extraPlayersStyle}>
              +{humanPlayers.length - 3}
            </div>
          )}
          {agentPlayers.slice(0, 3).map((player, index) => (
            <div key={player.id} style={getAvatarStyle(true, index, player.agentType)}>
              🧠
            </div>
          ))}
        </div>
        <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-caption)' }}>
          {players.length}/{maxPlayers} players
        </span>
      </div>

      <div style={actionsStyles}>
        <Button
          variant="primary"
          size="lg"
          style={{ flex: 1 }}
          onClick={onPlay}
          data-testid="play-button"
        >
          🎮 Jump In
        </Button>
        {onWatch && status === 'live' && (
          <Button
            variant="secondary"
            size="lg"
            onClick={onWatch}
            data-testid="watch-button"
          >
            👁️ Watch
          </Button>
        )}
      </div>
    </Card>
  );
}
