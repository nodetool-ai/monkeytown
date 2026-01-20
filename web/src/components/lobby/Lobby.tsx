import React, { CSSProperties } from 'react';
import { GameType, GameMode, GameStatus, PlayerType, AgentType } from '@monkeytown/packages/shared/game-types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AgentBadge } from '../agents';
import { EvolutionFeed, useEvolutionFeed, GameCard } from '../game';

export interface LobbyPlayer {
  id: string;
  type: PlayerType;
  name: string;
  agentType?: AgentType;
}

export interface LobbyGame {
  id: string;
  gameType: GameType;
  mode: GameMode;
  status: GameStatus;
  players: LobbyPlayer[];
  maxPlayers: number;
}

export interface LobbyHeaderProps {
  onAgentPanelOpen: () => void;
}

export function LobbyHeader({ onAgentPanelOpen }: LobbyHeaderProps) {
  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--space-8)',
    paddingBottom: 'var(--space-4)',
    borderBottom: 'var(--border-width-hairline) var(--color-border-subtle)',
  };

  const logoStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
  };

  const logoEmojiStyles: CSSProperties = {
    fontSize: '2.5rem',
  };

  const logoTextStyles: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-h1)',
    fontWeight: 700,
    background: 'linear-gradient(135deg, var(--color-primary), #FF8555)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const taglineStyles: CSSProperties = {
    fontSize: 'var(--text-body)',
    color: 'var(--color-text-secondary)',
    marginTop: 'var(--space-1)',
  };

  const navStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
  };

  return (
    <header style={headerStyles}>
      <div>
        <div style={logoStyles}>
          <span style={logoEmojiStyles}>🐒</span>
          <div>
            <h1 style={logoTextStyles}>Monkeytown</h1>
            <p style={taglineStyles}>Games that build themselves</p>
          </div>
        </div>
      </div>

      <nav style={navStyles}>
        <AgentBadge
          agent="chaos"
          status="online"
          size="md"
          showEmoji={true}
          showName={true}
          onClick={onAgentPanelOpen}
        />
        <AgentBadge
          agent="designer"
          status="online"
          size="md"
          showEmoji={true}
          showName={true}
          onClick={onAgentPanelOpen}
        />
        <Button variant="secondary" size="md" onClick={onAgentPanelOpen}>
          Meet All Agents
        </Button>
      </nav>
    </header>
  );
}

export interface LobbyHeroProps {
  onPlay: () => void;
  onWatch: () => void;
}

export function LobbyHero({ onPlay, onWatch }: LobbyHeroProps) {
  const heroSectionStyles: CSSProperties = {
    background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.1), rgba(76, 201, 240, 0.1))',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-8)',
    marginBottom: 'var(--space-6)',
    border: 'var(--border-width-hairline) var(--color-border-subtle)',
  };

  const heroTitleStyles: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-h1)',
    fontWeight: 700,
    marginBottom: 'var(--space-2)',
  };

  const heroDescriptionStyles: CSSProperties = {
    fontSize: 'var(--text-body-large)',
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--space-6)',
    maxWidth: '600px',
    lineHeight: 1.6,
  };

  const heroActionsStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--space-4)',
    flexWrap: 'wrap',
  };

  return (
    <section>
      <div style={heroSectionStyles}>
        <h2 style={heroTitleStyles}>Play with AI, Watch Agents Build</h2>
        <p style={heroDescriptionStyles}>
          Monkeytown is built by AI agents who work together to make your experience better.
          Jump into a game, watch live matches, or see development happen in real-time.
        </p>
        <div style={heroActionsStyles}>
          <Button variant="primary" size="lg" onClick={onPlay}>
            🎮 Jump Into Active Game
          </Button>
          <Button variant="secondary" size="lg" onClick={onWatch}>
            👁️ Watch Spectator Mode
          </Button>
        </div>
      </div>
    </section>
  );
}

export interface ActiveGamesSectionProps {
  games: LobbyGame[];
  onPlay: (gameId: string) => void;
  onWatch: (gameId: string) => void;
  onCreateGame: () => void;
}

export function ActiveGamesSection({ games, onPlay, onWatch, onCreateGame }: ActiveGamesSectionProps) {
  const sectionHeaderStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--space-4)',
  };

  const sectionTitleStyles: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-h2)',
    fontWeight: 600,
  };

  const gamesGridStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 'var(--space-4)',
  };

  return (
    <section>
      <div style={sectionHeaderStyles}>
        <h2 style={sectionTitleStyles}>🎯 Active Games</h2>
        <Badge variant="info">{games.filter(g => g.status === 'live').length} Live</Badge>
      </div>

      <div style={gamesGridStyles}>
        {games.map(game => (
          <GameCard
            key={game.id}
            gameId={game.id}
            gameType={game.gameType}
            mode={game.mode}
            status={game.status}
            players={game.players}
            maxPlayers={game.maxPlayers}
            onPlay={() => onPlay(game.id)}
            onWatch={game.status === 'live' ? () => onWatch(game.id) : undefined}
          />
        ))}

        <Card
          variant="interactive"
          padding="lg"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '280px',
            border: '2px dashed var(--color-border-default)',
            background: 'transparent',
          }}
          onClick={onCreateGame}
        >
          <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>+</div>
          <div style={{ fontWeight: 500 }}>Create New Game</div>
          <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
            Start a new game with AI opponents
          </div>
        </Card>
      </div>
    </section>
  );
}

export interface QuickStatsCardProps {
  activePlayers: number;
  liveGames: number;
  onlineAgents: number;
  featuresShipped: number;
}

export function QuickStatsCard({ activePlayers, liveGames, onlineAgents, featuresShipped }: QuickStatsCardProps) {
  return (
    <Card variant="elevated" padding="lg">
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
        🎮 Quick Stats
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Active Players</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-primary)' }}>{activePlayers}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Live Games</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-success)' }}>{liveGames}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Online Agents</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-info)' }}>{onlineAgents}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'var(--color-text-secondary)' }}>Features Shipped</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{featuresShipped}</span>
        </div>
      </div>
    </Card>
  );
}

export interface LobbyProps {
  games: LobbyGame[];
  onPlay: (gameId: string) => void;
  onWatch: (gameId: string) => void;
  onCreateGame: () => void;
  onAgentPanelOpen: () => void;
  activePlayers?: number;
  liveGames?: number;
  onlineAgents?: number;
  featuresShipped?: number;
}

export function Lobby({
  games,
  onPlay,
  onWatch,
  onCreateGame,
  onAgentPanelOpen,
  activePlayers = 127,
  liveGames = 8,
  onlineAgents = 5,
  featuresShipped = 24,
}: LobbyProps) {
  const { events: evolutionEvents } = useEvolutionFeed();

  const firstLiveGame = games.find(g => g.status === 'live');
  const firstGame = games[0];

  const containerStyles: CSSProperties = {
    minHeight: '100vh',
    background: 'var(--color-bg-primary)',
    padding: 'var(--space-6)',
  };

  const mainContentStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 360px',
    gap: 'var(--space-6)',
  };

  const leftColumnStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-6)',
  };

  const rightColumnStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  };

  return (
    <div style={containerStyles}>
      <LobbyHeader onAgentPanelOpen={onAgentPanelOpen} />

      <main style={mainContentStyles}>
        <div style={leftColumnStyles}>
          <LobbyHero
            onPlay={() => firstGame ? onPlay(firstGame.id) : onCreateGame()}
            onWatch={() => firstLiveGame ? onWatch(firstLiveGame.id) : onPlay(games[0]?.id || 'game-1')}
          />
          <ActiveGamesSection games={games} onPlay={onPlay} onWatch={onWatch} onCreateGame={onCreateGame} />
        </div>

        <div style={rightColumnStyles}>
          <EvolutionFeed events={evolutionEvents} maxItems={5} />
          <QuickStatsCard
            activePlayers={activePlayers}
            liveGames={liveGames}
            onlineAgents={onlineAgents}
            featuresShipped={featuresShipped}
          />
        </div>
      </main>
    </div>
  );
}

export function createDefaultLobbyGames(): LobbyGame[] {
  return [
    {
      id: 'game-1',
      gameType: 'tictactoe',
      mode: 'casual',
      status: 'waiting',
      players: [
        { id: 'player-1', type: 'human', name: 'You' },
      ],
      maxPlayers: 2,
    },
    {
      id: 'game-2',
      gameType: 'tictactoe',
      mode: 'fast',
      status: 'live',
      players: [
        { id: 'player-3', type: 'human', name: 'Player1' },
        { id: 'agent-3', type: 'agent', name: 'StrategistApe', agentType: 'strategist' },
      ],
      maxPlayers: 2,
    },
    {
      id: 'game-3',
      gameType: 'tictactoe',
      mode: 'competitive',
      status: 'waiting',
      players: [
        { id: 'player-4', type: 'human', name: 'ChampionPlayer' },
      ],
      maxPlayers: 2,
    },
  ];
}
