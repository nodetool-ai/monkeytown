'use client';

import React, { CSSProperties } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GameType, GameMode, GameStatus, PlayerType, AgentType } from '@monkeytown/packages/shared/game-types';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { AgentBadge, AgentPanel, useAgentPanel } from '../../../components/agents';
import { ChatPanel } from '../../../components/game/ChatPanel';
import { TicTacToeDemo } from '../../../components/game/TicTacToe';

const GAME_NAMES: Record<GameType, string> = {
  tictactoe: 'TicTacToe',
  babel: 'Babel Tower',
  chess: 'Monkey Chess',
  words: 'Word Builder',
};

const GAME_ICONS: Record<GameType, string> = {
  tictactoe: '❌',
  babel: '🗼',
  chess: '♟️',
  words: '📝',
};

interface LobbyPlayer {
  id: string;
  type: PlayerType;
  name: string;
  agentType?: AgentType;
}

interface GameInfo {
  id: string;
  gameType: GameType;
  mode: GameMode;
  status: GameStatus;
  players: LobbyPlayer[];
  maxPlayers: number;
}

const GAMES_DATA: Record<string, GameInfo> = {
  'game-1': {
    id: 'game-1',
    gameType: 'tictactoe',
    mode: 'casual',
    status: 'waiting',
    players: [
      { id: 'player-1', type: 'human', name: 'You' },
    ],
    maxPlayers: 2,
  },
  'game-2': {
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
  'game-3': {
    id: 'game-3',
    gameType: 'tictactoe',
    mode: 'competitive',
    status: 'waiting',
    players: [
      { id: 'player-4', type: 'human', name: 'ChampionPlayer' },
    ],
    maxPlayers: 2,
  },
  'game-babel-1': {
    id: 'game-babel-1',
    gameType: 'babel',
    mode: 'social',
    status: 'live',
    players: [
      { id: 'player-5', type: 'human', name: 'TowerBuilder' },
      { id: 'agent-1', type: 'agent', name: 'Chaos', agentType: 'chaos' },
      { id: 'agent-2', type: 'agent', name: 'Designer', agentType: 'designer' },
    ],
    maxPlayers: 4,
  },
  'game-chess-1': {
    id: 'game-chess-1',
    gameType: 'chess',
    mode: 'competitive',
    status: 'live',
    players: [
      { id: 'player-6', type: 'human', name: 'ChessMaster' },
      { id: 'agent-4', type: 'agent', name: 'StrategistApe', agentType: 'strategist' },
    ],
    maxPlayers: 2,
  },
  'game-words-1': {
    id: 'game-words-1',
    gameType: 'words',
    mode: 'casual',
    status: 'waiting',
    players: [
      { id: 'player-7', type: 'human', name: 'WordSmith' },
    ],
    maxPlayers: 4,
  },
};

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const agentPanel = useAgentPanel();
  const gameId = params?.gameId as string;
  const game = GAMES_DATA[gameId];

  const containerStyles: CSSProperties = {
    minHeight: '100vh',
    background: 'var(--color-bg-primary)',
    padding: 'var(--space-6)',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    marginBottom: 'var(--space-6)',
    paddingBottom: 'var(--space-4)',
    borderBottom: 'var(--border-width-hairline) var(--color-border-subtle)',
  };

  if (!game) {
    return (
      <div style={containerStyles}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', padding: 'var(--space-12)' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h1)', marginBottom: 'var(--space-4)' }}>
            Game Not Found
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
            The game you're looking for doesn't exist or has ended.
          </p>
          <Button variant="primary" onClick={() => router.push('/')}>
            Return to Lobby
          </Button>
        </div>
      </div>
    );
  }

  const opponentPlayers = game.players.filter(p => p.type === 'agent');
  const opponentAgent = opponentPlayers[0];

  return (
    <div style={containerStyles} data-testid="game-page">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <header style={headerStyles}>
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            data-testid="back-to-lobby-button"
          >
            ← Back to Lobby
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <span style={{ fontSize: '2rem' }}>{GAME_ICONS[game.gameType]}</span>
            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 700 }}>
                {GAME_NAMES[game.gameType]}
              </h1>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: '2px' }}>
                <Badge variant={game.status === 'live' ? 'success' : 'warning'} size="sm">
                  {game.status === 'live' ? '● LIVE' : '⏳ WAITING'}
                </Badge>
                <Badge variant="default" size="sm">
                  {game.mode}
                </Badge>
              </div>
            </div>
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-2)' }}>
            {opponentAgent && (
              <AgentBadge
                agent={opponentAgent.agentType!}
                status={game.status === 'live' ? 'online' : 'away'}
                size="md"
                showEmoji={true}
                showName={true}
                onClick={() => agentPanel.open()}
                data-testid="opponent-agent-badge"
              />
            )}
          </div>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 'var(--space-6)' }}>
          <div>
            {game.gameType === 'tictactoe' ? (
              <TicTacToeGameWrapper />
            ) : (
              <ComingSoonGamePlaceholder gameType={game.gameType} game={game} />
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Card variant="elevated" padding="lg" data-testid="players-panel">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                🎮 Players
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {game.players.map((player) => (
                  <div
                    key={player.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      background: 'var(--color-bg-surface)',
                      borderRadius: 'var(--radius-md)',
                    }}
                    data-testid={`player-${player.id}`}
                  >
                    <span style={{ fontSize: '1.5rem' }}>
                      {player.type === 'agent' ? '🧠' : '👤'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>{player.name}</div>
                      <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
                        {player.type === 'agent' ? `Agent: ${player.agentType}` : 'Human'}
                      </div>
                    </div>
                    {player.id === 'player-1' && (
                      <Badge variant="info" size="sm">You</Badge>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="elevated" padding="lg" data-testid="game-info-panel">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
                📋 Game Info
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Game ID</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-caption)' }}>{game.id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Mode</span>
                  <span>{game.mode}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>Players</span>
                  <span>{game.players.length}/{game.maxPlayers}</span>
                </div>
              </div>
            </Card>

            <GameChatPanelWrapper gameId={gameId} />
          </div>
        </div>
      </div>

      <AgentPanel
        agents={[
          { type: 'chaos' as AgentType, status: 'online', winRate: 67, gamesPlayed: 243, recentDecisions: ['Chose Redis for real-time state', 'Implemented WebSocket sync'] },
          { type: 'designer' as AgentType, status: 'online', winRate: 58, gamesPlayed: 156, recentDecisions: ['Designed new game UI', 'Improved accessibility'] },
          { type: 'strategist' as AgentType, status: 'online', winRate: 62, gamesPlayed: 201, recentDecisions: ['Analyzed optimal moves', 'Studied opponent patterns'] },
        ]}
        isOpen={agentPanel.isOpen}
        onClose={agentPanel.close}
      />
    </div>
  );
}

function TicTacToeGameWrapper() {
  return (
    <div data-testid="tictactoe-game-container">
      <TicTacToeDemo />
    </div>
  );
}

function ComingSoonGamePlaceholder({ gameType, game }: { gameType: GameType; game: GameInfo }) {
  return (
    <Card variant="elevated" padding="lg" style={{ textAlign: 'center' }} data-testid={`${gameType}-placeholder`}>
      <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>
        {GAME_ICONS[gameType]}
      </div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
        {GAME_NAMES[gameType]}
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', maxWidth: '400px', margin: '0 auto var(--space-6)' }}>
        This game is coming soon! In the meantime, why not try TicTacToe or watch this game?
      </p>
      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
        <Button variant="primary" onClick={() => window.location.href = `/?game=tictactoe`}>
          🎮 Play TicTacToe
        </Button>
        <Button variant="secondary" disabled={game.status !== 'live'}>
          👁️ {game.status === 'live' ? 'Watch Game' : 'Not Live Yet'}
        </Button>
      </div>
    </Card>
  );
}

function GameChatPanelWrapper({ gameId }: { gameId: string }) {
  const [messages, setMessages] = React.useState<any[]>([]);

  React.useEffect(() => {
    setMessages([
      {
        id: 'msg-1',
        senderId: 'system',
        senderName: 'System',
        senderType: 'system',
        content: `Welcome to game ${gameId}!`,
        timestamp: Date.now(),
      },
    ]);
  }, [gameId]);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'player-1',
      senderName: 'You',
      senderType: 'human',
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return <ChatPanel messages={messages} onSendMessage={handleSendMessage} currentPlayerId="player-1" />;
}
