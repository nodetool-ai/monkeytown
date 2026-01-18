import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChatPanel } from './ChatPanel';
import { ChatMessage } from '@monkeytown/packages/shared';

const mockMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    senderId: 'player-1',
    senderName: 'You',
    senderType: 'human',
    content: 'Hello everyone!',
    timestamp: Date.now() - 60000,
  },
  {
    id: 'msg-2',
    senderId: 'agent-1',
    senderName: 'ChaosArchitect',
    senderType: 'agent',
    agentType: 'chaos',
    content: 'Welcome to the game!',
    timestamp: Date.now() - 30000,
  },
];

describe('ChatPanel', () => {
  it('renders chat panel with correct structure', () => {
    render(
      <ChatPanel
        messages={mockMessages}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('Chat')).toBeInTheDocument();
  });

  it('displays all messages', () => {
    render(
      <ChatPanel
        messages={mockMessages}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('Hello everyone!')).toBeInTheDocument();
    expect(screen.getByText('Welcome to the game!')).toBeInTheDocument();
  });

  it('shows sender names for each message', () => {
    render(
      <ChatPanel
        messages={mockMessages}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('ChaosArchitect')).toBeInTheDocument();
  });

  it('shows human sender icon', () => {
    render(
      <ChatPanel
        messages={mockMessages}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('👤')).toBeInTheDocument();
  });

  it('shows agent emoji for agent messages', () => {
    render(
      <ChatPanel
        messages={mockMessages}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('🧠')).toBeInTheDocument();
  });

  it('has message input field', () => {
    render(
      <ChatPanel
        messages={[]}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
  });

  it('has send button', () => {
    render(
      <ChatPanel
        messages={[]}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });

  it('disables send button when input is empty', () => {
    render(
      <ChatPanel
        messages={[]}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled();
  });

  it('enables send button when input has text', () => {
    render(
      <ChatPanel
        messages={[]}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'Hello' } });
    
    expect(screen.getByRole('button', { name: /send/i })).not.toBeDisabled();
  });

  it('calls onSendMessage when form is submitted', () => {
    const handleSendMessage = vi.fn();
    render(
      <ChatPanel
        messages={[]}
        onSendMessage={handleSendMessage}
        currentPlayerId="player-1"
      />
    );

    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'Hello' } });
    
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    
    expect(handleSendMessage).toHaveBeenCalledWith('Hello');
  });

  it('clears input after sending message', () => {
    render(
      <ChatPanel
        messages={[]}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    const input = screen.getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'Hello' } });
    
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
    
    expect(input).toHaveValue('');
  });

  it('shows empty state when no messages', () => {
    render(
      <ChatPanel
        messages={[]}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText(/no messages yet/i)).toBeInTheDocument();
    expect(screen.getByText(/start the conversation/i)).toBeInTheDocument();
  });

  it('does not show empty state when messages exist', () => {
    render(
      <ChatPanel
        messages={mockMessages}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.queryByText(/no messages yet/i)).not.toBeInTheDocument();
  });

  it('displays quick reaction buttons', () => {
    render(
      <ChatPanel
        messages={[]}
        onSendMessage={() => {}}
        onQuickReaction={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('👍')).toBeInTheDocument();
    expect(screen.getByText('😮')).toBeInTheDocument();
    expect(screen.getByText('🎉')).toBeInTheDocument();
    expect(screen.getByText('😂')).toBeInTheDocument();
    expect(screen.getByText('🤔')).toBeInTheDocument();
    expect(screen.getByText('🔥')).toBeInTheDocument();
  });

  it('shows message count', () => {
    render(
      <ChatPanel
        messages={mockMessages}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('positions own messages on the right', () => {
    render(
      <ChatPanel
        messages={[mockMessages[0]]}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    const ownMessage = screen.getByText('Hello everyone!').closest('div');
    expect(ownMessage).toBeInTheDocument();
  });

  it('positions agent messages on the left', () => {
    render(
      <ChatPanel
        messages={[mockMessages[1]]}
        onSendMessage={() => {}}
        currentPlayerId="player-1"
      />
    );

    const agentMessage = screen.getByText('Welcome to the game!').closest('div');
    expect(agentMessage).toBeInTheDocument();
  });
});
