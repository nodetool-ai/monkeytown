import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Lobby, LobbyHeader, LobbyHero, ActiveGamesSection, QuickStatsCard, createDefaultLobbyGames } from './Lobby';
import { GameType, GameMode, GameStatus, PlayerType, AgentType } from '@monkeytown/packages/shared/game-types';

const mockGames = createDefaultLobbyGames();

describe('Lobby', () => {
  it('renders lobby with correct structure', () => {
    render(
      <Lobby
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
        onAgentPanelOpen={() => {}}
      />
    );

    expect(screen.getByText('Monkeytown')).toBeInTheDocument();
    expect(screen.getByText('Games that build themselves')).toBeInTheDocument();
  });

  it('renders all game cards', () => {
    render(
      <Lobby
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
        onAgentPanelOpen={() => {}}
      />
    );

    const ticTacToeHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(ticTacToeHeadings.length).toBeGreaterThanOrEqual(3);
  });

  it('shows live game count badge', () => {
    render(
      <Lobby
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
        onAgentPanelOpen={() => {}}
      />
    );

    expect(screen.getByText('1 Live')).toBeInTheDocument();
  });

  it('calls onPlay when Jump Into Active Game button is clicked', () => {
    const handlePlay = vi.fn();
    render(
      <Lobby
        games={mockGames}
        onPlay={handlePlay}
        onWatch={() => {}}
        onCreateGame={() => {}}
        onAgentPanelOpen={() => {}}
      />
    );

    const playButton = screen.getByRole('button', { name: /jump into active game/i });
    fireEvent.click(playButton);

    expect(handlePlay).toHaveBeenCalledWith('game-1');
  });

  it('calls onWatch when Watch Spectator Mode button is clicked', () => {
    const handleWatch = vi.fn();
    render(
      <Lobby
        games={mockGames}
        onPlay={() => {}}
        onWatch={handleWatch}
        onCreateGame={() => {}}
        onAgentPanelOpen={() => {}}
      />
    );

    const watchButton = screen.getByRole('button', { name: /watch spectator mode/i });
    fireEvent.click(watchButton);

    expect(handleWatch).toHaveBeenCalledWith('game-2');
  });

  it('renders agent badges in header', () => {
    render(
      <Lobby
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
        onAgentPanelOpen={() => {}}
      />
    );

    expect(screen.getByText('ChaosArchitect')).toBeInTheDocument();
    expect(screen.getByText('PrimateDesigner')).toBeInTheDocument();
  });

  it('renders quick stats card', () => {
    render(
      <Lobby
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
        onAgentPanelOpen={() => {}}
      />
    );

    expect(screen.getByText('🎮 Quick Stats')).toBeInTheDocument();
  });

  it('renders evolution feed', () => {
    render(
      <Lobby
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
        onAgentPanelOpen={() => {}}
      />
    );

    expect(screen.getByText((content) => content.includes('Evolution'))).toBeInTheDocument();
  });

  it('calls onAgentPanelOpen when Meet All Agents button is clicked', () => {
    const handleAgentPanelOpen = vi.fn();
    render(
      <Lobby
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
        onAgentPanelOpen={handleAgentPanelOpen}
      />
    );

    const meetAgentsButton = screen.getByRole('button', { name: /meet all agents/i });
    fireEvent.click(meetAgentsButton);

    expect(handleAgentPanelOpen).toHaveBeenCalled();
  });

  it('renders hero section with correct text', () => {
    render(
      <Lobby
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
        onAgentPanelOpen={() => {}}
      />
    );

    expect(screen.getByText('Play with AI, Watch Agents Build')).toBeInTheDocument();
    expect(screen.getByText(/Monkeytown is built by AI agents/i)).toBeInTheDocument();
  });
});

describe('LobbyHeader', () => {
  it('renders logo and tagline', () => {
    render(<LobbyHeader onAgentPanelOpen={() => {}} />);

    expect(screen.getByText('🐒')).toBeInTheDocument();
    expect(screen.getByText('Monkeytown')).toBeInTheDocument();
    expect(screen.getByText('Games that build themselves')).toBeInTheDocument();
  });

  it('renders agent badges', () => {
    render(<LobbyHeader onAgentPanelOpen={() => {}} />);

    expect(screen.getByText('ChaosArchitect')).toBeInTheDocument();
    expect(screen.getByText('PrimateDesigner')).toBeInTheDocument();
  });

  it('renders Meet All Agents button', () => {
    render(<LobbyHeader onAgentPanelOpen={() => {}} />);

    expect(screen.getByRole('button', { name: /meet all agents/i })).toBeInTheDocument();
  });
});

describe('LobbyHero', () => {
  it('renders hero title', () => {
    render(<LobbyHero onPlay={() => {}} onWatch={() => {}} />);

    expect(screen.getByText('Play with AI, Watch Agents Build')).toBeInTheDocument();
  });

  it('renders hero description', () => {
    render(<LobbyHero onPlay={() => {}} onWatch={() => {}} />);

    expect(screen.getByText(/Jump into a game, watch live matches/i)).toBeInTheDocument();
  });

  it('renders Play button', () => {
    render(<LobbyHero onPlay={() => {}} onWatch={() => {}} />);

    expect(screen.getByRole('button', { name: /jump into active game/i })).toBeInTheDocument();
  });

  it('renders Watch button', () => {
    render(<LobbyHero onPlay={() => {}} onWatch={() => {}} />);

    expect(screen.getByRole('button', { name: /watch spectator mode/i })).toBeInTheDocument();
  });

  it('calls onPlay when Play button is clicked', () => {
    const handlePlay = vi.fn();
    render(<LobbyHero onPlay={handlePlay} onWatch={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /jump into active game/i }));
    expect(handlePlay).toHaveBeenCalled();
  });

  it('calls onWatch when Watch button is clicked', () => {
    const handleWatch = vi.fn();
    render(<LobbyHero onPlay={() => {}} onWatch={handleWatch} />);

    fireEvent.click(screen.getByRole('button', { name: /watch spectator mode/i }));
    expect(handleWatch).toHaveBeenCalled();
  });
});

describe('ActiveGamesSection', () => {
  it('renders section title', () => {
    render(
      <ActiveGamesSection
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
      />
    );

    expect(screen.getByText('🎯 Active Games')).toBeInTheDocument();
  });

  it('shows live badge for live games', () => {
    render(
      <ActiveGamesSection
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
      />
    );

    expect(screen.getByText('● LIVE')).toBeInTheDocument();
  });

  it('shows waiting badge for waiting games', () => {
    render(
      <ActiveGamesSection
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
      />
    );

    const waitingBadges = screen.getAllByText('⏳ WAITING');
    expect(waitingBadges.length).toBe(2);
  });

  it('renders create new game card', () => {
    render(
      <ActiveGamesSection
        games={mockGames}
        onPlay={() => {}}
        onWatch={() => {}}
        onCreateGame={() => {}}
      />
    );

    expect(screen.getByRole('button', { name: /create new game/i })).toBeInTheDocument();
    expect(screen.getByText(/Start a new game with AI opponents/i)).toBeInTheDocument();
  });

  it('calls onPlay when Jump In button is clicked', () => {
    const handlePlay = vi.fn();
    render(
      <ActiveGamesSection
        games={mockGames}
        onPlay={handlePlay}
        onWatch={() => {}}
        onCreateGame={() => {}}
      />
    );

    const jumpInButtons = screen.getAllByRole('button', { name: /jump in/i });
    fireEvent.click(jumpInButtons[0]);
    expect(handlePlay).toHaveBeenCalledWith('game-1');
  });

  it('calls onWatch when Watch button is clicked for live games', () => {
    const handleWatch = vi.fn();
    render(
      <ActiveGamesSection
        games={mockGames}
        onPlay={() => {}}
        onWatch={handleWatch}
        onCreateGame={() => {}}
      />
    );

    const watchButtons = screen.getAllByRole('button', { name: /watch/i });
    expect(watchButtons.length).toBe(1);
  });
});

describe('QuickStatsCard', () => {
  it('renders card title', () => {
    render(
      <QuickStatsCard
        activePlayers={100}
        liveGames={5}
        onlineAgents={3}
        featuresShipped={10}
      />
    );

    expect(screen.getByText('🎮 Quick Stats')).toBeInTheDocument();
  });

  it('displays all stats', () => {
    render(
      <QuickStatsCard
        activePlayers={100}
        liveGames={5}
        onlineAgents={3}
        featuresShipped={10}
      />
    );

    expect(screen.getByText('Active Players')).toBeInTheDocument();
    expect(screen.getByText('Live Games')).toBeInTheDocument();
    expect(screen.getByText('Online Agents')).toBeInTheDocument();
    expect(screen.getByText('Features Shipped')).toBeInTheDocument();
  });

  it('displays all numeric values', () => {
    render(
      <QuickStatsCard
        activePlayers={100}
        liveGames={5}
        onlineAgents={3}
        featuresShipped={10}
      />
    );

    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('uses default values when not provided', () => {
    render(<QuickStatsCard activePlayers={0} liveGames={0} onlineAgents={0} featuresShipped={0} />);

    const statValues = screen.getAllByText('0');
    expect(statValues.length).toBe(4);
  });
});

describe('createDefaultLobbyGames', () => {
  it('creates an array of games', () => {
    const games = createDefaultLobbyGames();
    expect(Array.isArray(games)).toBe(true);
    expect(games.length).toBe(3);
  });

  it('creates games with correct structure', () => {
    const games = createDefaultLobbyGames();

    games.forEach(game => {
      expect(game).toHaveProperty('id');
      expect(game).toHaveProperty('gameType');
      expect(game).toHaveProperty('mode');
      expect(game).toHaveProperty('status');
      expect(game).toHaveProperty('players');
      expect(game).toHaveProperty('maxPlayers');
    });
  });

  it('includes a waiting game for the player', () => {
    const games = createDefaultLobbyGames();
    const waitingGame = games.find(g => g.status === 'waiting');

    expect(waitingGame).toBeDefined();
    expect(waitingGame?.players.some(p => p.type === 'human')).toBe(true);
  });

  it('includes a live game', () => {
    const games = createDefaultLobbyGames();
    const liveGame = games.find(g => g.status === 'live');

    expect(liveGame).toBeDefined();
    expect(liveGame?.players.some(p => p.type === 'agent')).toBe(true);
  });

  it('includes games with correct game type', () => {
    const games = createDefaultLobbyGames();

    games.forEach(game => {
      expect(game.gameType).toBe('tictactoe');
    });
  });
});
