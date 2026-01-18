'use client';

import React, { CSSProperties } from 'react';
import { GameType, GameMode, GameStatus, PlayerType, AgentType, AGENT_COLORS, PlayerAgentType, PLAYER_AGENT_CONFIG } from '@monkeytown/packages/shared';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AgentBadge, AgentPanel, useAgentPanel } from '../components/agents';
import { GameCard, EvolutionFeed, useEvolutionFeed, GameCanvas, GameRules } from '../components/game';

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

  // Use PLAYER agents (not builder agents) for in-game opponents
  const [games, setGames] = React.useState<LobbyGame[]>([
    {
      id: 'game-1',
      gameType: 'babel',
      mode: 'casual',
      status: 'live',
      players: [
        { id: 'player-1', type: 'human', name: 'You' },
        { id: 'agent-1', type: 'agent', name: 'StrategistApe', agentType: 'strategist' },
        { id: 'player-2', type: 'human', name: 'MonkeyFan99' },
        { id: 'agent-2', type: 'agent', name: 'TricksterMonkey', agentType: 'trickster' },
      ],
      maxPlayers: 5,
    },
    {
      id: 'game-2',
      gameType: 'chess',
      mode: 'fast',
      status: 'live',
      players: [
        { id: 'player-3', type: 'human', name: 'Grandmaster' },
        { id: 'agent-3', type: 'agent', name: 'ChampionChimp', agentType: 'champion' },
      ],
      maxPlayers: 2,
    },
    {
      id: 'game-3',
      gameType: 'words',
      mode: 'social',
      status: 'waiting',
      players: [
        { id: 'player-4', type: 'human', name: 'WordNinja' },
        { id: 'agent-4', type: 'agent', name: 'MentorOrangutan', agentType: 'mentor' },
        { id: 'player-5', type: 'human', name: 'VocabularyKing' },
      ],
      maxPlayers: 5,
    },
  ]);

  const [currentView, setCurrentView] = React.useState<'lobby' | 'game'>('lobby');

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
          <GameDemo onBack={() => setCurrentView('lobby')} />
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
                  onPlay={() => setCurrentView('game')}
                  onWatch={game.status === 'live' ? () => setCurrentView('game') : undefined}
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

function GameDemo({ onBack }: { onBack: () => void }) {
  const { messages, sendMessage } = useChat();
  const [selectedCardId, setSelectedCardId] = React.useState<string | undefined>();
  const [showRules, setShowRules] = React.useState(false);

  React.useEffect(() => {
    // Use Player Agent (StrategistApe) instead of Builder Agent
    sendMessage({
      senderId: 'agent-1',
      senderName: 'StrategistApe',
      senderType: 'agent',
      agentType: 'strategist',
      content: 'Welcome to Babel Tower! I\'m calculating the optimal strategy... Good luck!',
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
      // Player Agent personality shines through in chat
      sendMessage({
        senderId: 'agent-1',
        senderName: 'StrategistApe',
        senderType: 'agent',
        agentType: 'strategist',
        content: 'Interesting move! I\'m analyzing the implications for my tower strategy...',
      });
    }, 1500);
  };

  return (
    <div style={{ padding: 'var(--space-4)' }}>
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
            🗼 Babel Tower
          </h1>
          <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
            Casual • 3 players
          </span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-2)' }}>
          {/* Show Player Agents, not Builder Agents */}
          <AgentBadge agent="strategist" status="online" size="sm" showEmoji={true} showName={true} />
          <AgentBadge agent="trickster" status="online" size="sm" showEmoji={true} showName={true} />
          <Button variant="secondary" size="sm" onClick={() => setShowRules(!showRules)}>
            {showRules ? 'Hide Rules' : '📖 Rules'}
          </Button>
        </div>
      </div>

      {/* In-game rules display */}
      {showRules && (
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <GameRules gameType="babel" variant="compact" />
        </div>
      )}

      <GameCanvas
        gameState={{
          id: 'demo-game',
          gameType: 'babel',
          mode: 'casual',
          status: 'live',
          players: [
            { id: 'player-1', name: 'You', type: 'human', score: 42, isConnected: true },
            // Use Player Agents with distinct gaming personalities
            { id: 'agent-1', name: 'StrategistApe', type: 'agent', agentType: 'strategist', score: 38, isConnected: true },
            { id: 'agent-2', name: 'TricksterMonkey', type: 'agent', agentType: 'trickster', score: 45, isConnected: true },
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
        }}
        playerHand={[
          { id: 'h1', value: 8 },
          { id: 'h2', value: 15 },
          { id: 'h3', value: 6 },
          { id: 'h4', value: 22 },
          { id: 'h5', value: 11 },
        ]}
        selectedCardId={selectedCardId}
        onCardSelect={setSelectedCardId}
        onEndTurn={() => setSelectedCardId(undefined)}
        chatMessages={messages}
        onSendChatMessage={handleSendMessage}
        currentPlayerId="player-1"
      />
    </div>
  );
}

function useChat() {
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
