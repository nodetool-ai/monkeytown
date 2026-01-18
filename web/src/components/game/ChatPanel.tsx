'use client';

import React, { CSSProperties, useRef, useEffect } from 'react';
import { ChatMessage, PlayerType, AgentType, AGENT_COLORS } from '@monkeytown/packages/shared';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AgentBadge } from '../agents';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  onQuickReaction?: (emoji: string) => void;
  currentPlayerId?: string;
}

const AGENT_EMOJIS: Record<AgentType, string> = {
  chaos: '🧠',
  curious: '🔍',
  designer: '🎨',
  security: '🔒',
  economist: '🍌',
  madchimp: '🐒',
  founder: '✨',
};

const QUICK_REACTIONS = ['👍', '😮', '🎉', '😂', '🤔', '🔥'];

export function ChatPanel({
  messages,
  onSendMessage,
  onQuickReaction,
  currentPlayerId,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '300px',
  };

  const headerStyles: CSSProperties = {
    padding: 'var(--space-3) var(--space-4)',
    borderBottom: 'var(--border-width-hairline) var(--color-border-subtle)',
    fontWeight: 600,
    fontSize: 'var(--text-body)',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-2)',
  };

  const messagesStyles: CSSProperties = {
    flex: 1,
    overflowY: 'auto',
    padding: 'var(--space-4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  };

  const inputAreaStyles: CSSProperties = {
    padding: 'var(--space-3)',
    borderTop: 'var(--border-width-hairline) var(--color-border-subtle)',
  };

  const formStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--space-2)',
    marginBottom: 'var(--space-2)',
  };

  const inputStyles: CSSProperties = {
    flex: 1,
    background: 'var(--color-bg-elevated)',
    border: 'var(--border-width-hairline) var(--color-border-subtle)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-3)',
    color: 'var(--color-text-primary)',
    fontSize: 'var(--text-body)',
    outline: 'none',
    transition: 'border-color var(--duration-fast) var(--ease-out)',
  };

  const quickReactionsStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--space-1)',
  };

  const reactionButtonStyles: CSSProperties = {
    padding: 'var(--space-1) var(--space-2)',
    borderRadius: 'var(--radius-full)',
    fontSize: 'var(--text-caption)',
    cursor: 'pointer',
    transition: 'all var(--duration-fast) var(--ease-out)',
  };

  const emptyStyles: CSSProperties = {
    textAlign: 'center',
    padding: 'var(--space-8)',
    color: 'var(--color-text-tertiary)',
  };

  return (
    <Card variant="default" padding="none" style={containerStyles}>
      <div style={headerStyles}>
        <span>💬</span>
        <span>Chat</span>
        {messages.length > 0 && (
          <span style={{ marginLeft: 'auto', fontSize: 'var(--text-caption)', color: 'var(--color-text-tertiary)' }}>
            {messages.length}
          </span>
        )}
      </div>

      <div style={messagesStyles}>
        {messages.length === 0 ? (
          <div style={emptyStyles}>
            <p>No messages yet</p>
            <p style={{ fontSize: 'var(--text-caption)', marginTop: 'var(--space-2)' }}>
              Start the conversation!
            </p>
          </div>
        ) : (
          messages.map(message => (
            <ChatMessageItem
              key={message.id}
              message={message}
              isOwn={message.senderId === currentPlayerId}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div style={inputAreaStyles}>
        <form onSubmit={handleSubmit} style={formStyles}>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Type a message..."
            style={inputStyles}
          />
          <Button type="submit" variant="primary" size="md" disabled={!inputValue.trim()}>
            Send
          </Button>
        </form>

        {onQuickReaction && (
          <div style={quickReactionsStyles}>
            {QUICK_REACTIONS.map(emoji => (
              <button
                key={emoji}
                style={reactionButtonStyles}
                onClick={() => onQuickReaction(emoji)}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--color-bg-elevated)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

interface ChatMessageItemProps {
  message: ChatMessage;
  isOwn: boolean;
}

function ChatMessageItem({ message, isOwn }: ChatMessageItemProps) {
  const isAgent = message.senderType === 'agent';
  const agentType = message.agentType as AgentType | undefined;

  const messageStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
    maxWidth: '85%',
    marginLeft: isOwn ? 'auto' : '0',
  };

  const agentMessageStyles: CSSProperties = {
    background: agentType ? `${AGENT_COLORS[agentType]}15` : 'var(--color-bg-elevated)',
    border: agentType ? `1px solid ${AGENT_COLORS[agentType]}20` : 'none',
    borderRadius: 'var(--radius-lg)',
    borderTopLeftRadius: agentType ? '4px' : undefined,
    borderBottomLeftRadius: agentType ? '4px' : undefined,
    padding: 'var(--space-2) var(--space-3)',
  };

  const humanMessageStyles: CSSProperties = {
    background: 'var(--color-bg-elevated)',
    borderRadius: 'var(--radius-lg)',
    borderTopRightRadius: '4px',
    borderBottomRightRadius: '4px',
    padding: 'var(--space-2) var(--space-3)',
  };

  const senderStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
    fontSize: 'var(--text-micro)',
    color: isAgent && agentType ? AGENT_COLORS[agentType] : 'var(--color-text-tertiary)',
    marginBottom: '2px',
  };

  const contentStyles: CSSProperties = {
    fontSize: 'var(--text-body)',
    lineHeight: 1.4,
    wordBreak: 'break-word',
  };

  const timeStyles: CSSProperties = {
    fontSize: 'var(--text-micro)',
    color: 'var(--color-text-tertiary)',
    alignSelf: isOwn ? 'flex-end' : 'flex-start',
    marginTop: '2px',
  };

  const getTimeString = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={messageStyles}>
      <div style={isAgent ? agentMessageStyles : humanMessageStyles}>
        {isAgent && agentType && (
          <div style={senderStyles}>
            <AgentBadge agent={agentType} size="sm" showName={false} showEmoji={true} />
            <span>{message.senderName}</span>
          </div>
        )}
        {!isAgent && (
          <div style={senderStyles}>
            <span>👤</span>
            <span>{message.senderName}</span>
          </div>
        )}
        <div style={contentStyles}>{message.content}</div>
      </div>
      <span style={timeStyles}>{getTimeString(message.timestamp)}</span>
    </div>
  );
}

export function useChat() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const sendMessage = (content: string, playerId: string, playerName: string) => {
    addMessage({
      senderId: playerId,
      senderName: playerName,
      senderType: 'human',
      content,
    });
  };

  return { messages, addMessage, sendMessage, setMessages };
}
