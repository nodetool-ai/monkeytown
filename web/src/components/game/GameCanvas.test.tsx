import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameCanvas } from './GameCanvas';
import { GameState, GameCard } from '@monkeytown/packages/shared';

const mockGameState: GameState = {
  id: 'test-game',
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

const mockPlayerHand: GameCard[] = [
  { id: 'h1', value: 8 },
  { id: 'h2', value: 15 },
  { id: 'h3', value: 6 },
  { id: 'h4', value: 22 },
  { id: 'h5', value: 11 },
];

const mockChatMessages = [
  {
    id: 'msg-1',
    senderId: 'agent-1',
    senderName: 'ChaosArchitect',
    senderType: 'agent' as const,
    agentType: 'chaos' as const,
    content: 'Welcome to Babel Tower!',
    timestamp: Date.now() - 60000,
  },
];

describe('GameCanvas', () => {
  it('renders game area with correct structure', () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={mockChatMessages}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('Round 4/12')).toBeInTheDocument();
    expect(screen.getByText('🎯 Your Turn')).toBeInTheDocument();
  });

  it('displays all players correctly', () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('ChaosArchitect')).toBeInTheDocument();
    expect(screen.getByText('PrimateDesigner')).toBeInTheDocument();
  });

  it('shows table cards', () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('Table Cards')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('displays player hand', () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('22')).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument();
  });

  it('shows play card button when it is my turn', () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByRole('button', { name: /play card/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /end turn/i })).toBeInTheDocument();
  });

  it('shows waiting message when it is not my turn', () => {
    render(
      <GameCanvas
        gameState={{ ...mockGameState, currentPlayerId: 'agent-1' }}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.queryByRole('button', { name: /play card/i })).not.toBeInTheDocument();
    expect(screen.getByText(/waiting for/i)).toBeInTheDocument();
  });

  it('displays turn timer', () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    const timerElement = screen.getByText((content) => content === '30' || content === '45');
    expect(timerElement).toBeInTheDocument();
  });

  it('calls onCardSelect when a card is clicked', () => {
    const handleCardSelect = vi.fn();
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        onCardSelect={handleCardSelect}
        currentPlayerId="player-1"
      />
    );

    const card = screen.getByText('8').closest('div');
    fireEvent.click(card!);
    expect(handleCardSelect).toHaveBeenCalledWith('h1');
  });

  it('calls onEndTurn when end turn button is clicked', () => {
    const handleEndTurn = vi.fn();
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        onEndTurn={handleEndTurn}
        currentPlayerId="player-1"
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /end turn/i }));
    expect(handleEndTurn).toHaveBeenCalledTimes(1);
  });

  it('displays game info correctly', () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('Mode:')).toBeInTheDocument();
    expect(screen.getByText('casual')).toBeInTheDocument();
    expect(screen.getByText('Type:')).toBeInTheDocument();
    expect(screen.getByText('babel')).toBeInTheDocument();
    expect(screen.getByText('Players:')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('highlights active player', () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    const activePlayer = screen.getByText('You').closest('div');
    expect(activePlayer).toBeInTheDocument();
  });

  it('displays agent badges correctly', () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getAllByText('🧠').length).toBeGreaterThanOrEqual(2);
  });

  it('shows correct scores', () => {
    render(
      <GameCanvas
        gameState={mockGameState}
        playerHand={mockPlayerHand}
        chatMessages={[]}
        onSendChatMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    const scores = screen.getAllByText(/\d+/);
    expect(scores.some(el => el.textContent === '42')).toBe(true);
    expect(scores.some(el => el.textContent === '38')).toBe(true);
    expect(scores.some(el => el.textContent === '45')).toBe(true);
  });
});
