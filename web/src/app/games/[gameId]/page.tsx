'use client';

import React, { CSSProperties } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { GameType } from '@monkeytown/packages/shared/game-types';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { AgentBadge } from '../../../components/agents';
import { TicTacToeDemo, ChatPanel, useEvolutionFeed } from '../../../components/game';

interface GamePageProps {
  params: Promise<{ gameId: string }>;
}

export default function GamePage({ params }: GamePageProps) {
  const resolvedParams = React.use(params);
  const router = useRouter();
  const gameId = resolvedParams.gameId;
  const [messages, setMessages] = React.useState<any[]>([]);

  const containerStyles: CSSProperties = {
    minHeight: '100vh',
    background: 'var(--color-bg-primary)',
    padding: 'var(--space-6)',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-4)',
    marginBottom: 'var(--space-4)',
    paddingBottom: 'var(--space-4)',
    borderBottom: 'var(--border-width-hairline) var(--color-border-subtle)',
  };

  const gameTitleStyles: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-h2)',
    fontWeight: 600,
  };

  const gameSubtitleStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    color: 'var(--color-text-secondary)',
  };

  const mainContentStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 320px',
    gap: 'var(--space-6)',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  React.useEffect(() => {
    sendMessage({
      senderId: 'ai-opponent',
      senderName: 'StrategistApe',
      senderType: 'agent',
      agentType: 'strategist',
      content: `Welcome to game ${gameId}! I'm ready to play. Good luck! 🎮`,
    });
  }, [gameId]);

  const sendMessage = (messageData: any) => {
    const newMessage = {
      ...messageData,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = (content: string) => {
    sendMessage({
      senderId: 'player-1',
      senderName: 'You',
      senderType: 'human',
      content,
    });

    setTimeout(() => {
      sendMessage({
        senderId: 'ai-opponent',
        senderName: 'StrategistApe',
        senderType: 'agent',
        agentType: 'strategist',
        content: 'Great game so far! I\'m thinking about my next move... 🤔',
      });
    }, 1500);
  };

  const getGameTitle = (id: string): { title: string; subtitle: string; icon: string } => {
    if (id.includes('babel')) {
      return { title: 'Babel Tower', subtitle: 'Build the tallest tower', icon: '🏗️' };
    }
    if (id.includes('chess')) {
      return { title: 'Monkey Chess', subtitle: 'Strategic chess against AI', icon: '♟️' };
    }
    if (id.includes('word')) {
      return { title: 'Word Builder', subtitle: 'Build words and score points', icon: '📝' };
    }
    return { title: 'TicTacToe', subtitle: 'Classic TicTacToe', icon: '❌' };
  };

  const game = getGameTitle(gameId);

  return (
    <div style={containerStyles} data-testid="game-page">
      <header style={headerStyles} data-testid="game-header">
        <Button
          variant="ghost"
          onClick={() => router.push('/')}
          data-testid="back-to-lobby-button"
        >
          ← Back to Lobby
        </Button>
        <div data-testid="game-info">
          <h1 style={gameTitleStyles} data-testid="game-title">
            {game.icon} {game.title}
          </h1>
          <span style={gameSubtitleStyles} data-testid="game-subtitle">
            {game.subtitle}
          </span>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 'var(--space-2)' }} data-testid="game-agents">
          <AgentBadge agent="strategist" status="online" size="sm" showEmoji={true} showName={true} />
        </div>
      </header>

      <main style={mainContentStyles} data-testid="game-main-content">
        <div data-testid="game-board-container">
          <TicTacToeDemo />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }} data-testid="game-sidebar">
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            currentPlayerId="player-1"
          />

          <Card variant="elevated" padding="md" data-testid="game-rules-card">
            <h3 style={{ fontWeight: 600, marginBottom: 'var(--space-3)' }} data-testid="game-rules-title">
              Game Rules
            </h3>
            <ul style={{
              fontSize: 'var(--text-caption)',
              color: 'var(--color-text-secondary)',
              paddingLeft: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
            }} data-testid="game-rules-list">
              <li>Get 3 in a row to win</li>
              <li>X always goes first</li>
              <li>Click an empty cell to place your symbol</li>
              <li>Block your opponent or they win!</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
}
