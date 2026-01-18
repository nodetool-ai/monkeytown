'use client';

import React, { CSSProperties, useState, useEffect, useCallback } from 'react';
import { AgentType, PlayerAgentType, AGENT_COLORS, PLAYER_AGENT_CONFIG } from '@monkeytown/packages/shared';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ReasoningEntry {
  id: string;
  agentType: PlayerAgentType;
  reasoning: string;
  timestamp: number;
  action?: string;
  cardValue?: number;
}

interface AIReasoningDisplayProps {
  reasoningHistory: ReasoningEntry[];
  currentThinking?: {
    agentType: PlayerAgentType;
    reasoning: string;
  };
  isExpanded: boolean;
  onToggleExpand: () => void;
  maxVisible?: number;
}

export function AIReasoningDisplay({
  reasoningHistory,
  currentThinking,
  isExpanded,
  onToggleExpand,
  maxVisible = 5,
}: AIReasoningDisplayProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (reasoningHistory.length > 0) {
      setAnimationKey(prev => prev + 1);
    }
  }, [reasoningHistory.length]);

  const visibleEntries = isExpanded
    ? reasoningHistory
    : reasoningHistory.slice(-maxVisible).reverse();

  const getAgentEmoji = (agentType: PlayerAgentType): string => {
    const config = PLAYER_AGENT_CONFIG[agentType];
    return config?.emoji || '🤖';
  };

  const getAgentName = (agentType: PlayerAgentType): string => {
    const config = PLAYER_AGENT_CONFIG[agentType];
    return config?.name || agentType;
  };

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: 'var(--space-2) var(--space-3)',
    borderRadius: 'var(--radius-md)',
    background: 'var(--color-bg-elevated)',
    transition: 'all var(--duration-fast) var(--ease-out)',
  };

  const headerTitleStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    fontSize: 'var(--text-body)',
    fontWeight: 600,
  };

  const toggleIconStyles: CSSProperties = {
    transition: 'transform var(--duration-fast) var(--ease-out)',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
  };

  const entriesContainerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
    maxHeight: isExpanded ? '400px' : 'auto',
    overflow: 'hidden',
    transition: 'all var(--duration-slow) var(--ease-out)',
  };

  const reasoningEntryStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--space-3)',
    padding: 'var(--space-3)',
    background: 'var(--color-bg-surface)',
    borderRadius: 'var(--radius-md)',
    border: 'var(--border-width-hairline) var(--color-border-subtle)',
    animation: 'fadeIn var(--duration-normal) var(--ease-out)',
  };

  const agentAvatarStyles = (agentType: PlayerAgentType): CSSProperties => ({
    width: '32px',
    height: '32px',
    borderRadius: 'var(--radius-full)',
    background: `${AGENT_COLORS[agentType]}20`,
    border: `2px solid ${AGENT_COLORS[agentType]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    flexShrink: 0,
  });

  const contentStyles: CSSProperties = {
    flex: 1,
    minWidth: 0,
  };

  const agentNameStyles = (agentType: PlayerAgentType): CSSProperties => ({
    fontSize: 'var(--text-caption)',
    fontWeight: 600,
    color: AGENT_COLORS[agentType],
    marginBottom: '2px',
  });

  const reasoningTextStyles: CSSProperties = {
    fontSize: 'var(--text-body)',
    color: 'var(--color-text-primary)',
    lineHeight: 1.4,
  };

  const actionStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
    marginTop: 'var(--space-2)',
    padding: 'var(--space-2)',
    background: 'var(--color-bg-elevated)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--text-caption)',
  };

  const thinkingStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
    padding: 'var(--space-4)',
    background: 'linear-gradient(135deg, rgba(76, 201, 240, 0.1), rgba(255, 107, 53, 0.1))',
    borderRadius: 'var(--radius-md)',
    border: 'var(--border-width-default) var(--color-primary)',
    animation: 'pulse 2s infinite',
  };

  const thinkingIndicatorStyles: CSSProperties = {
    width: '12px',
    height: '12px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--color-primary)',
    animation: 'blink 1s infinite',
  };

  const emptyStyles: CSSProperties = {
    textAlign: 'center',
    padding: 'var(--space-6)',
    color: 'var(--color-text-tertiary)',
    fontSize: 'var(--text-caption)',
  };

  const getTimeString = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <Card variant="elevated" padding="md" style={containerStyles}>
      <div style={headerStyles} onClick={onToggleExpand}>
        <div style={headerTitleStyles}>
          <span>🧠</span>
          <span>AI Reasoning</span>
          {reasoningHistory.length > 0 && (
            <Badge variant="info" size="sm">{reasoningHistory.length}</Badge>
          )}
        </div>
        <div style={toggleIconStyles}>▼</div>
      </div>

      {currentThinking && (
        <div style={thinkingStyles} key={`thinking-${animationKey}`}>
          <div style={thinkingIndicatorStyles} />
          <div>
            <div style={{ fontSize: 'var(--text-caption)', fontWeight: 600, color: AGENT_COLORS[currentThinking.agentType] }}>
              {getAgentEmoji(currentThinking.agentType)} {getAgentName(currentThinking.agentType)} is thinking...
            </div>
            <div style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              &ldquo;{currentThinking.reasoning}&rdquo;
            </div>
          </div>
        </div>
      )}

      <div style={entriesContainerStyles}>
        {visibleEntries.length === 0 ? (
          <div style={emptyStyles}>
            AI reasoning will appear here during the game.
            <br />
            <span style={{ fontSize: 'var(--text-micro)', opacity: 0.7 }}>
              Watch for insights into AI strategy!
            </span>
          </div>
        ) : (
          visibleEntries.map((entry) => {
            const agentType = entry.agentType;
            return (
              <div key={entry.id} style={reasoningEntryStyles} className="reasoning-entry">
                <div style={agentAvatarStyles(agentType)}>
                  {getAgentEmoji(agentType)}
                </div>
                <div style={contentStyles}>
                  <div style={agentNameStyles(agentType)}>
                    {getAgentName(agentType)} • {getTimeString(entry.timestamp)}
                  </div>
                  <div style={reasoningTextStyles}>{entry.reasoning}</div>
                  {entry.action && (
                    <div style={actionStyles}>
                      <span>🎯</span>
                      <span>{entry.action}</span>
                      {entry.cardValue && (
                        <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                          (value: {entry.cardValue})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {!isExpanded && reasoningHistory.length > maxVisible && (
        <button
          onClick={onToggleExpand}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--color-primary)',
            fontSize: 'var(--text-caption)',
            cursor: 'pointer',
            textAlign: 'center',
            padding: 'var(--space-2)',
          }}
        >
          Show {reasoningHistory.length - maxVisible} more entries...
        </button>
      )}
    </Card>
  );
}

export function useAIReasoning() {
  const [reasoningHistory, setReasoningHistory] = useState<ReasoningEntry[]>([]);
  const [currentThinking, setCurrentThinking] = useState<{
    agentType: PlayerAgentType;
    reasoning: string;
  } | undefined>();
  const [isExpanded, setIsExpanded] = useState(false);

  const addReasoning = useCallback((entry: Omit<ReasoningEntry, 'id' | 'timestamp'>) => {
    const newEntry: ReasoningEntry = {
      ...entry,
      id: `reasoning-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    setReasoningHistory(prev => [...prev, newEntry]);
    setCurrentThinking(undefined);
  }, []);

  const setThinking = useCallback((agentType: PlayerAgentType, reasoning: string) => {
    setCurrentThinking({ agentType, reasoning });
  }, []);

  const clearReasoning = useCallback(() => {
    setReasoningHistory([]);
    setCurrentThinking(undefined);
  }, []);

  const toggleExpand = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return {
    reasoningHistory,
    currentThinking,
    isExpanded,
    addReasoning,
    setThinking,
    clearReasoning,
    toggleExpand,
  };
}
