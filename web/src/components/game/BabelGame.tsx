'use client';

import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { AgentType, BabelCard, BabelPlayerState, BabelGameState, BabelAction, BABEL_SPECIAL_ACTIONS } from '@monkeytown/packages/shared';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AgentBadge } from '../agents';

export interface BabelGameProps {
  gameState: BabelGameState;
  currentPlayerId: string;
  onAction: (action: BabelAction) => void;
  onNewGame?: () => void;
}

const SUIT_COLORS: Record<string, string> = {
  stone: '#6B7280',
  brick: '#EF4444',
  wood: '#F59E0B',
  glass: '#3B82F6',
};

const SUIT_EMOJIS: Record<string, string> = {
  stone: '🪨',
  brick: '🧱',
  wood: '🪵',
  glass: '🧊',
};

export function BabelGameCanvas({
  gameState,
  currentPlayerId,
  onAction,
  onNewGame,
}: BabelGameProps) {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isMyTurn = currentPlayer?.id === currentPlayerId && gameState.status === 'playing';
  const myPlayerState = gameState.playerStates.get(currentPlayerId);

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [showSpecialAction, setShowSpecialAction] = useState(false);
  const [specialTarget, setSpecialTarget] = useState<string | null>(null);

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-6)',
    padding: 'var(--space-6)',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexWrap: 'wrap',
    gap: 'var(--space-4)',
  };

  const getStatusMessage = (): string => {
    if (gameState.status === 'waiting') {
      return 'Waiting for players...';
    }
    if (gameState.status === 'round_end') {
      return 'Round Complete!';
    }
    if (gameState.status === 'game_end') {
      if (gameState.winnerId === currentPlayerId) {
        return 'You Won! 🎉';
      }
      return 'Game Over';
    }
    if (isMyTurn) {
      return 'Your Turn';
    }
    return `Waiting for ${currentPlayer?.name}...`;
  };

  const canUseSpecialAction = (card: BabelCard): boolean => {
    return Object.values(BABEL_SPECIAL_ACTIONS).some(
      (action) => card.value >= action.minValue
    );
  };

  const handleCardClick = (card: BabelCard): void => {
    if (!isMyTurn || gameState.status !== 'playing') return;

    if (card.value >= 15) {
      setSelectedCardId(card.id);
      setShowSpecialAction(true);
    } else {
      onAction({ type: 'play_card', cardId: card.id });
    }
  };

  const handleSpecialAction = (actionType: 'sabotage' | 'boost' | 'steal'): void => {
    if (!selectedCardId) return;

    if (actionType === 'sabotage' && !specialTarget) {
      return;
    }

    onAction({
      type: 'special_babel_tower',
      cardId: selectedCardId,
      targetPlayerId: actionType === 'sabotage' ? specialTarget! : undefined,
    });

    setSelectedCardId(null);
    setShowSpecialAction(false);
    setSpecialTarget(null);
  };

  const handlePass = (): void => {
    onAction({ type: 'pass' });
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600 }}>
            🗼 Babel Tower
          </h2>
          <div style={{ marginTop: 'var(--space-2)' }}>
            <span style={{ 
              padding: 'var(--space-1) var(--space-3)', 
              background: 'var(--color-bg-surface)', 
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-caption)',
            }}>
              Round {gameState.currentRound}/{gameState.maxRounds}
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-4)',
        }}>
          <div style={{
            textAlign: 'center',
            padding: 'var(--space-3)',
            background: isMyTurn ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
            borderRadius: 'var(--radius-md)',
            border: isMyTurn ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--color-border-subtle)',
          }}>
            <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
              Status
            </div>
            <div style={{ fontWeight: 600 }}>{getStatusMessage()}</div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-4)',
        width: '100%',
      }}>
        {gameState.players.map((player) => {
          const playerState = gameState.playerStates.get(player.id);
          const isCurrentPlayer = player.id === currentPlayer?.id;
          const isPlayerAgent = player.type === 'agent';

          return (
            <Card
              key={player.id}
              variant={isCurrentPlayer ? 'elevated' : 'default'}
              padding="md"
              style={{
                border: isCurrentPlayer ? '2px solid var(--color-primary)' : undefined,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                {isPlayerAgent && player.agentType ? (
                  <AgentBadge
                    agent={player.agentType as AgentType}
                    status="online"
                    size="sm"
                    showEmoji={true}
                    showName={false}
                  />
                ) : (
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--color-primary)' }} />
                )}
                <span style={{ fontWeight: 600 }}>{player.name}</span>
                {isCurrentPlayer && (
                  <span style={{ 
                    padding: '2px 8px', 
                    background: 'var(--color-success)', 
                    color: 'white',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-caption)',
                  }}>
                    You
                  </span>
                )}
                {isCurrentPlayer && gameState.status === 'playing' && (
                  <span style={{ 
                    padding: '2px 8px', 
                    background: 'var(--color-info)', 
                    color: 'white',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--text-caption)',
                  }}>
                    Turn
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
                    Tower Height
                  </span>
                  <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                    {playerState?.towerHeight || 0}
                  </span>
                </div>

                <div style={{
                  height: 8,
                  background: 'var(--color-bg-surface)',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(100, (playerState?.towerHeight || 0) / 2)}%`,
                    background: 'var(--color-primary)',
                    transition: 'width 0.3s ease',
                  }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
                  <span>Score: {playerState?.score || 0}</span>
                  <span>Cards: {playerState?.cardsPlayed || 0}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {showSpecialAction && selectedCardId && (() => {
        const card = myPlayerState?.hand.find(c => c.id === selectedCardId);
        if (!card) return null;
        const cardValue = card.value;

        return (
          <Card variant="elevated" padding="md" style={{ width: '100%', maxWidth: 400 }}>
            <h4 style={{ marginBottom: 'var(--space-3)' }}>Choose Special Action</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                <BabelCardDisplay card={card} size="sm" />
                <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
                  Value: {cardValue}
                </span>
              </div>

              {cardValue >= 15 && (
                <>
                  <Button
                    variant="primary"
                    onClick={() => handleSpecialAction('sabotage')}
                    disabled={!specialTarget}
                  >
                    💣 Sabotage
                  </Button>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                    {gameState.players
                      .filter(p => p.id !== currentPlayerId)
                      .map(player => (
                        <Button
                          key={player.id}
                          variant={specialTarget === player.id ? 'primary' : 'secondary'}
                          size="sm"
                          onClick={() => setSpecialTarget(player.id)}
                        >
                          {player.name}
                        </Button>
                      ))}
                  </div>
                </>
              )}

              {cardValue >= 10 && (
                <Button variant="primary" onClick={() => handleSpecialAction('boost')}>
                  🚀 Boost (+5)
                </Button>
              )}

              {cardValue >= 8 && (
                <Button variant="primary" onClick={() => handleSpecialAction('steal')}>
                  🏃 Steal Card
                </Button>
              )}

              <Button variant="ghost" onClick={() => {
                setShowSpecialAction(false);
                setSelectedCardId(null);
                setSpecialTarget(null);
              }}>
                Cancel
              </Button>
            </div>
          </Card>
        );
      })()}

      <div style={{ width: '100%' }}>
        <h4 style={{ marginBottom: 'var(--space-3)' }}>Your Hand</h4>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          {myPlayerState?.hand.map((card) => (
            <BabelCardDisplay
              key={card.id}
              card={card}
              selected={selectedCardId === card.id}
              onClick={() => handleCardClick(card)}
              disabled={!isMyTurn}
            />
          ))}
        </div>
      </div>

      {gameState.tableCards.length > 0 && (
        <div style={{ width: '100%' }}>
          <h4 style={{ marginBottom: 'var(--space-2)' }}>Table Cards</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            {gameState.tableCards.slice(-5).map((card) => (
              <BabelCardDisplay key={card.id} card={card} size="sm" />
            ))}
          </div>
        </div>
      )}

      {isMyTurn && gameState.status === 'playing' && (
        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="ghost" onClick={handlePass}>
            Pass
          </Button>
        </div>
      )}

      {gameState.status === 'game_end' && onNewGame && (
        <Button variant="primary" onClick={onNewGame}>
          New Game
        </Button>
      )}
    </div>
  );
}

interface BabelCardDisplayProps {
  card: BabelCard;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function BabelCardDisplay({ card, size = 'md', selected, onClick, disabled }: BabelCardDisplayProps) {
  const dimensions = { sm: 40, md: 60, lg: 80 };
  const fontSize = { sm: 14, md: 20, lg: 28 };

  const suit = card.suit || 'stone';
  const color = SUIT_COLORS[suit] || '#6B7280';
  const emoji = SUIT_EMOJIS[suit] || '🪨';

  const styles: CSSProperties = {
    width: dimensions[size],
    height: dimensions[size] * 1.4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: selected ? 'rgba(16, 185, 129, 0.2)' : 'var(--color-bg-elevated)',
    border: selected
      ? '3px solid var(--color-success)'
      : `2px solid ${color}`,
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'default' : 'pointer',
    fontSize: fontSize[size],
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    transition: 'all var(--duration-fast) var(--ease-out)',
    opacity: disabled && !selected ? 0.5 : 1,
    transform: selected ? 'scale(1.05)' : 'scale(1)',
  };

  return (
    <button
      style={styles}
      onClick={onClick}
      disabled={disabled}
      title={`${card.value} - ${suit}`}
    >
      <span>{card.value}</span>
      <span style={{ fontSize: '0.6em' }}>{emoji}</span>
    </button>
  );
}

export function useBabelGame(initialPlayerId: string = 'player-1') {
  const [gameState, setGameState] = useState<BabelGameState | null>(null);

  const createInitialGameState = useCallback((): BabelGameState => {
    const suits: Array<'stone' | 'brick' | 'wood' | 'glass'> = ['stone', 'brick', 'wood', 'glass'];
    const deck: BabelCard[] = [];
    let cardId = 0;

    for (const suit of suits) {
      for (let value = 1; value <= 25; value++) {
        deck.push({
          id: `babel-${cardId++}`,
          value,
          suit,
        });
      }
    }

    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    const hands: BabelCard[][] = [[], []];
    for (let i = 0; i < 5; i++) {
      for (const hand of hands) {
        if (deck.length > 0) {
          hand.push(deck.pop()!);
        }
      }
    }

    const playerStates = new Map<string, BabelPlayerState>();
    playerStates.set(initialPlayerId, {
      playerId: initialPlayerId,
      hand: hands[0],
      score: 0,
      towerHeight: 0,
      cardsPlayed: 0,
    });
    playerStates.set('ai-opponent', {
      playerId: 'ai-opponent',
      hand: hands[1],
      score: 0,
      towerHeight: 0,
      cardsPlayed: 0,
    });

    return {
      id: `babel-${Date.now()}`,
      gameType: 'babel',
      mode: 'casual',
      status: 'waiting',
      players: [
        { id: initialPlayerId, name: 'You', type: 'human', score: 0, isConnected: true },
        { id: 'ai-opponent', name: 'StrategistApe', type: 'agent', agentType: 'strategist', score: 0, isConnected: true },
      ],
      currentRound: 1,
      maxRounds: 12,
      currentPlayerIndex: 0,
      deck,
      tableCards: [],
      playerStates,
      turnStartTime: 0,
      turnDurationSeconds: 60,
      turnTimerActive: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      gameLog: [],
    };
  }, [initialPlayerId]);

  const getAIAction = useCallback((state: BabelGameState): BabelAction | null => {
    const aiState = state.playerStates.get('ai-opponent');
    if (!aiState || aiState.hand.length === 0) return null;

    const highCard = aiState.hand.reduce((max, card) => card.value > max.value ? card : max, aiState.hand[0]);

    if (highCard.value >= 15 && Math.random() > 0.5) {
      const humanState = state.playerStates.get(initialPlayerId);
      if (humanState && humanState.towerHeight > 0) {
        return { type: 'special_babel_tower', cardId: highCard.id, targetPlayerId: initialPlayerId };
      }
    }

    if (highCard.value >= 10 && Math.random() > 0.7) {
      return { type: 'special_babel_tower', cardId: highCard.id };
    }

    if (highCard.value >= 8 && state.tableCards.length > 0 && Math.random() > 0.6) {
      return { type: 'special_babel_tower', cardId: highCard.id };
    }

    return { type: 'play_card', cardId: highCard.id };
  }, [initialPlayerId]);

  const processAction = useCallback((playerId: string, action: BabelAction) => {
    setGameState(prev => {
      if (!prev || prev.status !== 'playing') return prev;

      const playerState = prev.playerStates.get(playerId);
      if (!playerState) return prev;

      const newPlayerStates = new Map(prev.playerStates);
      const newPlayerState = { ...playerState, hand: [...playerState.hand] };

      switch (action.type) {
        case 'play_card': {
          const cardIndex = newPlayerState.hand.findIndex(c => c.id === action.cardId);
          if (cardIndex === -1) return prev;

          const card = newPlayerState.hand.splice(cardIndex, 1)[0];
          newPlayerState.cardsPlayed++;
          newPlayerState.towerHeight += card.value;

          const newTableCards = [...prev.tableCards, card];

          const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
          const isRoundEnd = nextIndex === 0;

          return {
            ...prev,
            playerStates: newPlayerStates.set(playerId, newPlayerState),
            tableCards: newTableCards,
            currentPlayerIndex: isRoundEnd ? 0 : nextIndex,
            currentRound: isRoundEnd ? prev.currentRound + 1 : prev.currentRound,
            turnStartTime: Date.now(),
            status: isRoundEnd && prev.currentRound >= prev.maxRounds ? 'game_end' : 'playing',
            winnerId: isRoundEnd && prev.currentRound >= prev.maxRounds
              ? Array.from(newPlayerStates.values()).reduce((a, b) => a.towerHeight > b.towerHeight ? a : b).playerId
              : undefined,
          };
        }

        case 'special_babel_tower': {
          const cardIndex = newPlayerState.hand.findIndex(c => c.id === action.cardId);
          if (cardIndex === -1) return prev;

          const card = newPlayerState.hand.splice(cardIndex, 1)[0];
          newPlayerState.cardsPlayed++;

          if (card.value >= 15 && action.targetPlayerId) {
            const targetState = newPlayerStates.get(action.targetPlayerId);
            if (targetState) {
              const newTargetState = { ...targetState, towerHeight: Math.max(0, targetState.towerHeight - 5) };
              newPlayerStates.set(action.targetPlayerId, newTargetState);
            }
          } else if (card.value >= 10) {
            newPlayerState.towerHeight += 5;
          } else if (card.value >= 8 && prev.tableCards.length > 0) {
            const stolenCard = prev.tableCards[prev.tableCards.length - 1];
            newPlayerState.hand.push(stolenCard);
          }

          const newTableCards = [...prev.tableCards, card];
          const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
          const isRoundEnd = nextIndex === 0;

          return {
            ...prev,
            playerStates: newPlayerStates.set(playerId, newPlayerState),
            tableCards: newTableCards,
            currentPlayerIndex: isRoundEnd ? 0 : nextIndex,
            currentRound: isRoundEnd ? prev.currentRound + 1 : prev.currentRound,
            turnStartTime: Date.now(),
            status: isRoundEnd && prev.currentRound >= prev.maxRounds ? 'game_end' : 'playing',
          };
        }

        case 'pass': {
          const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
          const isRoundEnd = nextIndex === 0;

          return {
            ...prev,
            currentPlayerIndex: isRoundEnd ? 0 : nextIndex,
            currentRound: isRoundEnd ? prev.currentRound + 1 : prev.currentRound,
            turnStartTime: Date.now(),
            status: isRoundEnd && prev.currentRound >= prev.maxRounds ? 'game_end' : 'playing',
          };
        }

        default:
          return prev;
      }
    });
  }, []);

  const startGame = useCallback(() => {
    setGameState(prev => prev ? { ...prev, status: 'playing', turnStartTime: Date.now() } : null);
  }, []);

  const newGame = useCallback(() => {
    setGameState(createInitialGameState());
  }, [createInitialGameState]);

  useEffect(() => {
    if (!gameState) {
      setGameState(createInitialGameState());
    }
  }, [createInitialGameState, gameState]);

  useEffect(() => {
    if (!gameState || gameState.status !== 'playing') return;

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (currentPlayer?.type !== 'agent') return;

    const timeout = setTimeout(() => {
      const action = getAIAction(gameState);
      if (action) {
        processAction('ai-opponent', action);
      }
    }, 1000 + Math.random() * 2000);

    return () => clearTimeout(timeout);
  }, [gameState, gameState?.currentPlayerIndex, getAIAction, processAction]);

  return {
    gameState,
    processAction,
    startGame,
    newGame,
    setGameState,
    isMyTurn: gameState?.players[gameState?.currentPlayerIndex || 0]?.id === initialPlayerId && gameState?.status === 'playing',
  };
}

export function BabelGameDemo() {
  const playerId = 'player-1';
  const { gameState, processAction, startGame, newGame, setGameState } = useBabelGame(playerId);

  const handleAction = useCallback((action: BabelAction) => {
    if (gameState?.status === 'waiting') {
      startGame();
      return;
    }
    processAction(playerId, action);
  }, [gameState, playerId, processAction, startGame]);

  useEffect(() => {
    if (gameState?.status === 'waiting') {
      startGame();
    }
  }, [gameState?.status, startGame]);

  if (!gameState) return null;

  return (
    <Card variant="elevated" padding="lg" style={{ maxWidth: 1200, margin: '0 auto' }}>
      <BabelGameCanvas
        gameState={gameState}
        currentPlayerId={playerId}
        onAction={handleAction}
        onNewGame={newGame}
      />
    </Card>
  );
}
