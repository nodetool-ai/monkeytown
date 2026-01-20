import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameCard } from './GameCard';

const mockPlayers = [
  { id: 'player-1', type: 'human' as const, name: 'You' },
  { id: 'agent-1', type: 'agent' as const, name: 'StrategistApe', agentType: 'strategist' as const },
];

describe('GameCard', () => {
  it('renders game card with correct structure', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('TicTacToe')).toBeInTheDocument();
  });

  it('displays game name correctly', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('TicTacToe')).toBeInTheDocument();
  });

  it('shows live badge when status is live', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="live"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('● LIVE')).toBeInTheDocument();
  });

  it('shows waiting badge when status is waiting', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('⏳ WAITING')).toBeInTheDocument();
  });

  it('shows ended badge when status is ended', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="ended"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('✓ ENDED')).toBeInTheDocument();
  });

  it('displays game mode label', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="fast"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('⚡ Fast')).toBeInTheDocument();
  });

  it('displays game description', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText(/Classic game! Get 3 in a row to win/i)).toBeInTheDocument();
  });

  it('displays player count', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText(/2\/2 players/i)).toBeInTheDocument();
  });

  it('renders Jump In button', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByRole('button', { name: /jump in/i })).toBeInTheDocument();
  });

  it('renders Watch button when status is live and onWatch is provided', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="live"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
        onWatch={() => {}}
      />
    );

    expect(screen.getByRole('button', { name: /watch/i })).toBeInTheDocument();
  });

  it('does not render Watch button when status is not live', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
        onWatch={() => {}}
      />
    );

    expect(screen.queryByRole('button', { name: /watch/i })).not.toBeInTheDocument();
  });

  it('calls onPlay when Jump In button is clicked', () => {
    const handlePlay = vi.fn();
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={handlePlay}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /jump in/i }));
    expect(handlePlay).toHaveBeenCalled();
  });

  it('calls onWatch when Watch button is clicked', () => {
    const handleWatch = vi.fn();
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="live"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
        onWatch={handleWatch}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /watch/i }));
    expect(handleWatch).toHaveBeenCalled();
  });

  it('displays player avatars', () => {
    render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('👤')).toBeInTheDocument();
    expect(screen.getByText('🧠')).toBeInTheDocument();
  });

  it('displays correct game icons for different game types', () => {
    const { rerender } = render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('❌')).toBeInTheDocument();

    rerender(
      <GameCard
        gameId="game-2"
        gameType="babel"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('🗼')).toBeInTheDocument();

    rerender(
      <GameCard
        gameId="game-3"
        gameType="chess"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('♟️')).toBeInTheDocument();

    rerender(
      <GameCard
        gameId="game-4"
        gameType="words"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('📝')).toBeInTheDocument();
  });

  it('displays correct mode labels for different modes', () => {
    const { rerender } = render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="fast"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('⚡ Fast')).toBeInTheDocument();

    rerender(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('☕ Casual')).toBeInTheDocument();

    rerender(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="social"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('👥 Social')).toBeInTheDocument();

    rerender(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="competitive"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText('🏆 Competitive')).toBeInTheDocument();
  });

  it('displays correct descriptions for different game types', () => {
    const { rerender } = render(
      <GameCard
        gameId="game-1"
        gameType="tictactoe"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText(/Classic game! Get 3 in a row to win/i)).toBeInTheDocument();

    rerender(
      <GameCard
        gameId="game-2"
        gameType="babel"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText(/Build the tallest tower together with your team!/i)).toBeInTheDocument();

    rerender(
      <GameCard
        gameId="game-3"
        gameType="chess"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText(/Classic strategy against AI opponents/i)).toBeInTheDocument();

    rerender(
      <GameCard
        gameId="game-4"
        gameType="words"
        mode="casual"
        status="waiting"
        players={mockPlayers}
        maxPlayers={2}
        onPlay={() => {}}
      />
    );

    expect(screen.getByText(/Create words and outsmart your opponents/i)).toBeInTheDocument();
  });
});
