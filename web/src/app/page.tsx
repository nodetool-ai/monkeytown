'use client';

import React, { CSSProperties } from 'react';
import { GameType, GameMode, GameStatus, PlayerType, AgentType, AGENT_COLORS } from '@monkeytown/packages/shared/game-types';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AgentBadge, AgentPanel, useAgentPanel } from '../components/agents';
import { GameCard, EvolutionFeed, useEvolutionFeed, TicTacToeDemo, ChatPanel } from '../components/game';

interface LobbyPlayer {
  id: string;
  type: PlayerType;
  name: string;
  agentType?: AgentType;
}

interface LobbyGame {
  id: string;
  gameType: GameType;
  mode: GameMode;
  status: GameStatus;
  players: LobbyPlayer[];
  maxPlayers: number;
}

export default function LobbyPage() {
  const agentPanel = useAgentPanel();
  const { events: evolutionEvents } = useEvolutionFeed();

  // Updated games list to feature TicTacToe as the primary game
  const [games] = React.useState<LobbyGame[]>([
    {
      id: 'game-1',
      gameType: 'babel',
      mode: 'casual',
      status: 'waiting',
      players: [
        { id: 'player-1', type: 'human', name: 'You' },
        { id: 'agent-1', type: 'agent', name: 'ChaosArchitect', agentType: 'chaos' },
        { id: 'agent-2', type: 'agent', name: 'PrimateDesigner', agentType: 'designer' },
        { id: 'player-2', type: 'human', name: 'Player2' },
        { id: 'player-3', type: 'human', name: 'Player3' },
      ],
      maxPlayers: 5,
    },
    {
      id: 'game-2',
      gameType: 'chess',
      mode: 'fast',
      status: 'live',
      players: [
        { id: 'player-4', type: 'human', name: 'Player1' },
        { id: 'agent-3', type: 'agent', name: 'StrategistApe', agentType: 'strategist' },
      ],
      maxPlayers: 2,
    },
    {
      id: 'game-3',
      gameType: 'words',
      mode: 'social',
      status: 'live',
      players: [
        { id: 'player-5', type: 'human', name: 'PlayerA' },
        { id: 'player-6', type: 'human', name: 'PlayerB' },
        { id: 'player-7', type: 'human', name: 'PlayerC' },
        { id: 'player-8', type: 'human', name: 'PlayerD' },
        { id: 'player-9', type: 'human', name: 'PlayerE' },
      ],
      maxPlayers: 5,
    },
  ]);

  const [currentView, setCurrentView] = React.useState<'lobby' | 'game'>('lobby');
  const [currentGame, setCurrentGame] = React.useState<LobbyGame | null>(null);

  const containerStyles: CSSProperties = {
    minHeight: '100vh',
    background: 'var(--color-bg-primary)',
    padding: 'var(--space-6)',
  };

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

  const rightColumnStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  };

  if (currentView === 'game') {
    return (
      <div style={containerStyles}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Button variant="ghost" onClick={() => setCurrentView('lobby')} style={{ marginBottom: 'var(--space-4)' }}>
            ← Back to Lobby
          </Button>
          <GameDemo game={currentGame} onBack={() => setCurrentView('lobby')} />
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyles}>
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
            onClick={() => agentPanel.open()}
          />
          <AgentBadge
            agent="designer"
            status="online"
            size="md"
            showEmoji={true}
            showName={true}
            onClick={() => agentPanel.open()}
          />
          <Button variant="secondary" size="md" onClick={() => agentPanel.open()}>
            Meet All Agents
          </Button>
        </nav>
      </header>

      <main style={mainContentStyles}>
        <div style={leftColumnStyles}>
          <section>
            <div style={heroSectionStyles}>
              <h2 style={heroTitleStyles}>Play with AI, Watch Agents Build</h2>
              <p style={heroDescriptionStyles}>
                Monkeytown is built by AI agents who work together to make your experience better.
                Jump into a game, watch live matches, or see development happen in real-time.
              </p>
              <div style={heroActionsStyles}>
                <Button variant="primary" size="lg" onClick={() => setCurrentView('game')}>
                  🎮 Jump Into Active Game
                </Button>
                <Button variant="secondary" size="lg">
                  👁️ Watch Spectator Mode
                </Button>
              </div>
            </div>
          </section>

          <section>
            <div style={sectionHeaderStyles}>
              <h2 style={sectionTitleStyles}>🎯 Active Games</h2>
              <Badge variant="info">{games.filter(g => g.status === 'live').length} Live</Badge>
            </div>

            <div style={gamesGridStyles} data-testid="games-grid">
              {games.map(game => (
                <GameCard
                  key={game.id}
                  gameId={game.id}
                  gameType={game.gameType}
                  mode={game.mode}
                  status={game.status}
                  players={game.players}
                  maxPlayers={game.maxPlayers}
                  onPlay={() => { setCurrentGame(game); setCurrentView('game'); }}
                  onWatch={game.status === 'live' ? () => { setCurrentGame(game); setCurrentView('game'); } : undefined}
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
                onClick={() => {}}
              >
                <div style={{ fontSize: '2rem', marginBottom: 'var(--space-2)' }}>+</div>
                <div style={{ fontWeight: 500 }}>Create New Game</div>
                <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
                  Start a new game with AI opponents
                </div>
              </Card>
            </div>
          </section>
        </div>

        <div style={rightColumnStyles}>
          <EvolutionFeed events={evolutionEvents} maxItems={5} />

          <Card variant="elevated" padding="lg">
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>
              🎮 Quick Stats
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Active Players</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-primary)' }}>127</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Live Games</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-success)' }}>8</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Online Agents</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--color-info)' }}>5</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Features Shipped</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>24</span>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <AgentPanel
        agents={[
          { type: 'chaos', status: 'online', winRate: 67, gamesPlayed: 243, recentDecisions: ['Chose Redis for real-time state', 'Implemented WebSocket sync', 'Refactored game loop for 60Hz'] },
          { type: 'curious', status: 'online', winRate: 52, gamesPlayed: 189, recentDecisions: ['Researched player engagement patterns', 'Analyzed competitor features', 'Identified new trends'] },
          { type: 'designer', status: 'online', winRate: 58, gamesPlayed: 156, recentDecisions: ['Designed new game UI', 'Improved accessibility', 'Created animation system'] },
          { type: 'security', status: 'busy', winRate: 71, gamesPlayed: 312, recentDecisions: ['Implemented rate limiting', 'Added input validation', 'Security audit passed'] },
          { type: 'economist', status: 'away', winRate: 64, gamesPlayed: 198, recentDecisions: ['Designed reward system', 'Balanced economy', 'Created incentives'] },
          { type: 'madchimp', status: 'online', winRate: 45, gamesPlayed: 87, recentDecisions: ['Proposed chaos mode', 'Stress tested systems', 'Found edge cases'] },
          { type: 'founder', status: 'offline', winRate: 33, gamesPlayed: 12, recentDecisions: ['Defined vision', 'Set principles', 'Guided roadmap'] },
        ]}
        isOpen={agentPanel.isOpen}
        onClose={agentPanel.close}
      />
    </div>
  );
}

function GameDemo({ game, onBack }: { game: LobbyGame | null; onBack: () => void }) {
  const { messages, sendMessage } = useLocalChat();

  const GAME_TITLES: Record<string, string> = {
    tictactoe: '❌ TicTacToe ⭕',
    babel: '🗼 Babel Tower',
    chess: '♟️ Monkey Chess',
    words: '📝 Word Builder',
  };

  const GAME_WELCOME_MESSAGES: Record<string, string> = {
    tictactoe: "Welcome to TicTacToe! I'm ready to play. Good luck! 🎮",
    babel: 'Welcome to Babel Tower! Let\'s build the tallest tower together! 🗼',
    chess: 'Welcome to Monkey Chess! Prepare for a strategic battle! ♟️',
    words: 'Welcome to Word Builder! Let\'s create some words! 📝',
  };

  const gameType = game?.gameType || 'tictactoe';

  React.useEffect(() => {
    sendMessage({
      senderId: 'ai-opponent',
      senderName: 'StrategistApe',
      senderType: 'agent',
      agentType: 'strategist',
      content: GAME_WELCOME_MESSAGES[gameType],
    });
  }, []);

  const handleSendMessage = (content: string) => {
    sendMessage({
      senderId: 'player-1',
      senderName: 'You',
      senderType: 'human',
      content,
    });

    setTimeout(() => {
      // AI responds to chat
      sendMessage({
        senderId: 'ai-opponent',
        senderName: 'StrategistApe',
        senderType: 'agent',
        agentType: 'strategist',
        content: 'Great game so far! I\'m thinking about my next move... 🤔',
      });
    }, 1500);
  };

  return (
    <div style={{ padding: 'var(--space-4)' }} data-testid="game-canvas">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-4)',
        paddingBottom: 'var(--space-4)',
        borderBottom: 'var(--border-width-hairline) var(--color-border-subtle)',
      }}>
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600 }}>
            {GAME_TITLES[gameType]}
          </h1>
          <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
            Play against AI
          </span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-2)' }}>
          <AgentBadge agent="strategist" status="online" size="sm" showEmoji={true} showName={true} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 'var(--space-6)' }}>
        <TicTacToeDemo />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            currentPlayerId="player-1"
          />
          
          <Card variant="elevated" padding="md">
            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-3)' }}>
              Game Rules
            </h3>
            <ul style={{ 
              fontSize: 'var(--text-caption)', 
              color: 'var(--color-text-secondary)',
              paddingLeft: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
            }}>
              <li>Get 3 in a row to win</li>
              <li>X always goes first</li>
              <li>Click an empty cell to place your symbol</li>
              <li>Block your opponent or they win!</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function useLocalChat() {
  const [messages, setMessages] = React.useState<any[]>([]);

  const addMessage = (message: any) => {
    const newMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = (messageData: any) => {
    addMessage(messageData);
  };

  return { messages, addMessage, sendMessage, setMessages };
}
