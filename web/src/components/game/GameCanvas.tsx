'use client';

import React, { CSSProperties } from 'react';
import { GameState, GameCard as GameCardType, PlayerType, AgentType, AGENT_COLORS } from '@monkeytown/packages/shared';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { AgentBadge } from '../agents';
import { ChatPanel } from './ChatPanel';

interface GameCanvasProps {
  gameState: GameState;
  playerHand: GameCardType[];
  selectedCardId?: string;
  onCardSelect?: (cardId: string) => void;
  onEndTurn?: () => void;
  chatMessages: any[];
  onSendChatMessage: (content: string) => void;
  currentPlayerId: string;
}

export function GameCanvas({
  gameState,
  playerHand,
  selectedCardId,
  onCardSelect,
  onEndTurn,
  chatMessages,
  onSendChatMessage,
  currentPlayerId,
}: GameCanvasProps) {
  const isMyTurn = gameState.currentPlayerId === currentPlayerId;

  const containerStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gridTemplateRows: '1fr auto',
    gap: 'var(--space-4)',
    height: '100%',
    minHeight: '600px)',
  };

  const gameAreaStyles: CSSProperties = {
    gridColumn: '1 / 2',
    gridRow: '1 / 2',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  };

  const sidebarStyles: CSSProperties = {
    gridColumn: '2 / 3',
    gridRow: '1 / 3',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  };

  const bottomBarStyles: CSSProperties = {
    gridColumn: '1 / 2',
    gridRow: '2 / 3',
    display: 'flex',
    gap: 'var(--space-4)',
  };

  const tableAreaStyles: CSSProperties = {
    flex: 1,
    background: 'var(--color-bg-surface)',
    borderRadius: 'var(--radius-lg)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--space-6)',
    position: 'relative',
    border: 'var(--border-width-hairline) var(--color-border-subtle)',
  };

  const playersAreaStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--space-6)',
    flexWrap: 'wrap',
    justifyContent: 'center',
  };

  const playerSlotStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-2)',
  };

  const getAvatarStyle = (isActive: boolean, isAgent: boolean, agentType?: AgentType): CSSProperties => ({
    width: '56px',
    height: '56px',
    borderRadius: 'var(--radius-full)',
    background: isAgent && agentType
      ? `${AGENT_COLORS[agentType]}30`
      : 'var(--color-bg-elevated)',
    border: `3px solid ${isActive ? 'var(--color-primary)' : 'var(--color-border-default)'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '28px',
    boxShadow: isActive ? `0 0 20px ${AGENT_COLORS[agentType || 'chaos']}40` : 'none',
    transition: 'all var(--duration-normal) var(--ease-out)',
  });

  const playerNameStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    textAlign: 'center',
    maxWidth: '80px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  };

  const scoreStyles: CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-body)',
    fontWeight: 600,
    color: 'var(--color-primary)',
  };

  const handAreaStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--space-3)',
    justifyContent: 'center',
    padding: 'var(--space-4)',
    background: 'var(--color-bg-elevated)',
    borderRadius: 'var(--radius-lg)',
    overflowX: 'auto',
  };

  const cardStyles: CSSProperties = {
    width: '80px',
    height: '112px',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-bg-surface)',
    border: '2px solid var(--color-border-default)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all var(--duration-fast) var(--ease-out)',
    flexShrink: 0,
  };

  const selectedCardStyles: CSSProperties = {
    ...cardStyles,
    borderColor: 'var(--color-primary)',
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 20px rgba(255, 107, 53, 0.3)',
  };

  const cardValueStyles: CSSProperties = {
    fontSize: 'var(--text-h2)',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
  };

  const cardLabelStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    color: 'var(--color-text-secondary)',
  };

  const gameInfoStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    padding: 'var(--space-3) var(--space-4)',
    background: 'var(--color-bg-elevated)',
    borderRadius: 'var(--radius-md)',
    marginBottom: 'var(--space-4)',
  };

  const turnTimerStyles: CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-body-large)',
    fontWeight: 600,
    color: gameState.turnTimeRemaining < 10 ? 'var(--color-error)' : 'var(--color-text-primary)',
  };

  return (
    <div style={containerStyles}>
      <div style={gameAreaStyles}>
        <div style={gameInfoStyles}>
          <Badge variant="info" size="md">
            Round {gameState.round}/{gameState.maxRounds}
          </Badge>
          <Badge variant={isMyTurn ? 'success' : 'default'} size="md">
            {isMyTurn ? '🎯 Your Turn' : '⏳ Waiting'}
          </Badge>
          <div style={{ flex: 1 }} />
          <div style={turnTimerStyles}>
            ⏱️ {gameState.turnTimeRemaining}s
          </div>
        </div>

        <div style={tableAreaStyles}>
          <div style={playersAreaStyles}>
            {gameState.players.map(player => (
              <div key={player.id} style={playerSlotStyles}>
                <div style={getAvatarStyle(
                  player.id === gameState.currentPlayerId,
                  player.type === 'agent',
                  player.agentType
                )}>
                  {player.type === 'agent' ? '🧠' : '👤'}
                </div>
                <span style={playerNameStyles}>{player.name}</span>
                <span style={scoreStyles}>{player.score}</span>
                {player.type === 'agent' && player.agentType && (
                  <AgentBadge
                    agent={player.agentType}
                    size="sm"
                    showName={false}
                    showEmoji={true}
                    status="online"
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
            <div style={{
              color: 'var(--color-text-tertiary)',
              fontSize: 'var(--text-caption)',
            }}>
              Table Cards
            </div>
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
              marginTop: 'var(--space-2)',
              justifyContent: 'center',
              minHeight: '60px',
            }}>
              {gameState.tableCards.length === 0 ? (
                <span style={{ color: 'var(--color-text-tertiary)' }}>No cards on table</span>
              ) : (
                gameState.tableCards.map(card => (
                  <div key={card.id} style={cardStyles}>
                    <span style={cardValueStyles}>{card.value}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div style={handAreaStyles}>
          {playerHand.map(card => (
            <div
              key={card.id}
              style={card.id === selectedCardId ? selectedCardStyles : cardStyles}
              onClick={() => onCardSelect?.(card.id)}
              onMouseEnter={e => {
                if (card.id !== selectedCardId) {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                }
              }}
              onMouseLeave={e => {
                if (card.id !== selectedCardId) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--color-border-default)';
                }
              }}
            >
              <span style={cardValueStyles}>{card.value}</span>
              <span style={cardLabelStyles}>Points</span>
            </div>
          ))}
        </div>
      </div>

      <div style={sidebarStyles}>
        <ChatPanel
          messages={chatMessages}
          onSendMessage={onSendChatMessage}
          currentPlayerId={currentPlayerId}
        />

        <Card variant="elevated" padding="md">
          <div style={{ fontWeight: 600, marginBottom: 'var(--space-3)' }}>
            Game Info
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Mode:</span>
              <span style={{ color: 'var(--color-text-primary)', textTransform: 'capitalize' }}>{gameState.mode}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Type:</span>
              <span style={{ color: 'var(--color-text-primary)', textTransform: 'capitalize' }}>{gameState.gameType}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Players:</span>
              <span style={{ color: 'var(--color-text-primary)' }}>{gameState.players.length}</span>
            </div>
          </div>
        </Card>
      </div>

      <div style={bottomBarStyles}>
        <Card variant="default" padding="md" style={{ flex: 1, display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          {isMyTurn ? (
            <>
              <button
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  background: 'var(--color-primary)',
                  color: 'var(--color-text-inverse)',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
              >
                Play Card
              </button>
              <button
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  background: 'var(--color-bg-elevated)',
                  color: 'var(--color-text-primary)',
                  border: 'var(--border-width-default) var(--color-border-default)',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all var(--duration-fast) var(--ease-out)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                  e.currentTarget.style.background = 'var(--color-bg-surface)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--color-border-default)';
                  e.currentTarget.style.background = 'var(--color-bg-elevated)';
                }}
                onClick={onEndTurn}
              >
                End Turn
              </button>
            </>
          ) : (
            <div style={{ width: '100%', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              Waiting for {gameState.players.find(p => p.id === gameState.currentPlayerId)?.name}...
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export function createMockGameState(): GameState {
  return {
    id: 'game-1',
    gameType: 'babel',
    mode: 'casual',
    status: 'live',
    players: [
      { id: 'player-1', name: 'You', type: 'human', score: 42, isConnected: true },
      { id: 'agent-1', name: 'ChaosArchitect', type: 'agent', agentType: 'chaos', score: 38, isConnected: true },
      { id: 'agent-2', name: 'PrimateDesigner', type: 'agent', agentType: 'designer', score: 45, isConnected: true },
    ],
    round: 4,
    maxRounds: 12,
    currentPlayerId: 'player-1',
    tableCards: [
      { id: 'c1', value: 7 },
      { id: 'c2', value: 12 },
      { id: 'c3', value: 5 },
    ],
    turnTimeRemaining: 45,
    createdAt: Date.now() - 120000,
    updatedAt: Date.now(),
  };
}

export function createMockHand(): GameCardType[] {
  return [
    { id: 'h1', value: 8 },
    { id: 'h2', value: 15 },
    { id: 'h3', value: 6 },
    { id: 'h4', value: 22 },
    { id: 'h5', value: 11 },
  ];
}
