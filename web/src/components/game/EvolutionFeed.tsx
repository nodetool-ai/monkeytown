'use client';

import React, { CSSProperties } from 'react';
import { EvolutionEvent, AgentType, AGENT_COLORS } from '@monkeytown/packages/shared';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

const EVENT_ICONS: Record<EvolutionEvent['type'], string> = {
  shipped: '🎉',
  in_progress: '🔧',
  feedback: '💬',
  community: '👤',
};

const EVENT_LABELS: Record<EvolutionEvent['type'], string> = {
  shipped: 'Feature Shipped',
  in_progress: 'In Progress',
  feedback: 'Feedback Incorporated',
  community: 'Community Request',
};

const AGENT_EMOJIS: Record<AgentType, string> = {
  chaos: '🧠',
  curious: '🔍',
  designer: '🎨',
  security: '🔒',
  economist: '🍌',
  madchimp: '🐒',
  founder: '✨',
};

interface EvolutionFeedProps {
  events: EvolutionEvent[];
  maxItems?: number;
}

export function EvolutionFeed({ events, maxItems = 5 }: EvolutionFeedProps) {
  const displayEvents = events.slice(0, maxItems);

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-4)',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 'var(--space-2)',
  };

  const titleStyles: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-h3)',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
  };

  const moreLinkStyles: CSSProperties = {
    color: 'var(--color-primary)',
    fontSize: 'var(--text-caption)',
    cursor: 'pointer',
    fontWeight: 500,
  };

  const emptyStyles: CSSProperties = {
    textAlign: 'center',
    padding: 'var(--space-8)',
    color: 'var(--color-text-tertiary)',
  };

  if (events.length === 0) {
    return (
      <Card variant="default" padding="lg">
        <div style={headerStyles}>
          <h3 style={titleStyles}>
            🚀 Evolution Feed
          </h3>
        </div>
        <div style={emptyStyles}>
          <p>No recent updates. The agents are building something amazing...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card variant="default" padding="lg">
      <div style={headerStyles}>
        <h3 style={titleStyles}>
          🚀 Evolution Feed
        </h3>
        <span style={moreLinkStyles}>View All →</span>
      </div>

      <div style={containerStyles}>
        {displayEvents.map(event => (
          <EvolutionItem key={event.id} event={event} />
        ))}
      </div>
    </Card>
  );
}

function EvolutionItem({ event }: { event: EvolutionEvent }) {
  const itemStyles: CSSProperties = {
    padding: 'var(--space-4)',
    background: 'var(--color-bg-elevated)',
    borderRadius: 'var(--radius-md)',
    borderLeft: `3px solid ${event.agentType ? AGENT_COLORS[event.agentType] : 'var(--color-primary)'}`,
  };

  const typeBadgeStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    marginBottom: 'var(--space-2)',
  };

  const titleStyles: CSSProperties = {
    fontWeight: 600,
    marginBottom: 'var(--space-2)',
    fontSize: 'var(--text-body)',
  };

  const descriptionStyles: CSSProperties = {
    color: 'var(--color-text-secondary)',
    fontSize: 'var(--text-caption)',
    marginBottom: 'var(--space-3)',
    lineHeight: 1.5,
  };

  const metaStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    fontSize: 'var(--text-micro)',
    color: 'var(--color-text-tertiary)',
  };

  const progressBarStyles: CSSProperties = {
    marginTop: 'var(--space-3)',
    height: '4px',
    background: 'var(--color-bg-surface)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  };

  const progressFillStyles: CSSProperties = {
    height: '100%',
    background: event.agentType ? AGENT_COLORS[event.agentType] : 'var(--color-primary)',
    borderRadius: 'var(--radius-full)',
    width: event.progress ? `${event.progress}%` : '0%',
    transition: 'width var(--duration-slow) var(--ease-out)',
  };

  const getTimeAgo = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div style={itemStyles}>
      <div style={typeBadgeStyles}>
        <span>{EVENT_ICONS[event.type]}</span>
        <Badge
          variant={event.type === 'shipped' ? 'success' : event.type === 'in_progress' ? 'info' : 'default'}
          size="sm"
        >
          {EVENT_LABELS[event.type]}
        </Badge>
        {event.agentType && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: AGENT_COLORS[event.agentType] }}>
            {AGENT_EMOJIS[event.agentType]}
            {event.agentName}
          </span>
        )}
      </div>

      <h4 style={titleStyles}>{event.title}</h4>

      <p style={descriptionStyles}>{event.description}</p>

      {event.type === 'in_progress' && event.progress !== undefined && (
        <div style={progressBarStyles}>
          <div style={progressFillStyles} />
        </div>
      )}

      {event.playerAttribution && (
        <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-micro)', color: 'var(--color-text-tertiary)' }}>
          💡 Inspired by player feedback
        </div>
      )}

      <div style={metaStyles}>
        <span>{getTimeAgo(event.timestamp)}</span>
        {event.playerCount && (
          <>
            <span>•</span>
            <span>👥 {event.playerCount} players using</span>
          </>
        )}
      </div>
    </div>
  );
}

export function useEvolutionFeed() {
  const [events, setEvents] = React.useState<EvolutionEvent[]>([]);

  React.useEffect(() => {
    const mockEvents: EvolutionEvent[] = [
      {
        id: '1',
        type: 'shipped',
        title: 'Real-time player presence indicators',
        description: 'Now you can see who\'s watching and who\'s playing in real-time. Players show as 👤, agents as 🧠.',
        agentType: 'chaos',
        agentName: 'ChaosArchitect',
        timestamp: Date.now() - 3600000,
        playerCount: 47,
      },
      {
        id: '2',
        type: 'in_progress',
        title: 'Animating agent decision reveal',
        description: 'Making AI decision-making more transparent with animated reveals.',
        agentType: 'designer',
        agentName: 'PrimateDesigner',
        timestamp: Date.now() - 7200000,
        progress: 80,
        et: '2 hours',
      },
      {
        id: '3',
        type: 'feedback',
        title: 'Keyboard shortcuts for quick reactions',
        description: 'Added keyboard shortcuts for common game actions.',
        agentType: 'chaos',
        agentName: 'ChaosArchitect',
        playerAttribution: 'MonkeyMaster42',
        timestamp: Date.now() - 10800000,
      },
      {
        id: '4',
        type: 'shipped',
        title: 'New Babel Tower game mode',
        description: 'Cooperative tower building with up to 5 players.',
        agentType: 'madchimp',
        agentName: 'MadChimp',
        timestamp: Date.now() - 86400000,
        playerCount: 123,
      },
    ];

    setEvents(mockEvents);
  }, []);

  return { events };
}
