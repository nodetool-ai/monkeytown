import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { AgentPresenceIndicator } from './AgentPresenceIndicator';

describe('AgentPresenceIndicator', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it('renders agent emoji by default', () => {
    render(<AgentPresenceIndicator agent="trickster" />);
    expect(screen.getByText('🎭')).toBeInTheDocument();
  });

  it('renders agent name when showName is true', () => {
    render(<AgentPresenceIndicator agent="trickster" showName={true} />);
    expect(screen.getByText('Trickster')).toBeInTheDocument();
  });

  it('hides agent name when showName is false', () => {
    render(<AgentPresenceIndicator agent="trickster" showName={false} />);
    expect(screen.queryByText('Trickster')).not.toBeInTheDocument();
  });

  it('shows thinking indicator when isThinking is true', () => {
    render(<AgentPresenceIndicator agent="trickster" isThinking={true} />);
    expect(screen.getByText('Thinking...')).toBeInTheDocument();
  });

  it('does not show thinking indicator when isThinking is false', () => {
    render(<AgentPresenceIndicator agent="trickster" isThinking={false} />);
    expect(screen.queryByText('Thinking...')).not.toBeInTheDocument();
  });

  it('applies different positions correctly', () => {
    const { rerender } = render(<AgentPresenceIndicator agent="trickster" position="top-left" />);
    let indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator).toHaveStyle({ top: 'var(--space-4)', left: 'var(--space-4)' });

    rerender(<AgentPresenceIndicator agent="trickster" position="top-right" />);
    indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator).toHaveStyle({ top: 'var(--space-4)', right: 'var(--space-4)' });

    rerender(<AgentPresenceIndicator agent="trickster" position="bottom-left" />);
    indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator).toHaveStyle({ bottom: 'var(--space-4)', left: 'var(--space-4)' });

    rerender(<AgentPresenceIndicator agent="trickster" position="bottom-right" />);
    indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator).toHaveStyle({ bottom: 'var(--space-4)', right: 'var(--space-4)' });
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<AgentPresenceIndicator agent="trickster" size="sm" />);
    let indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator).toBeInTheDocument();

    rerender(<AgentPresenceIndicator agent="trickster" size="md" />);
    indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator).toBeInTheDocument();

    rerender(<AgentPresenceIndicator agent="trickster" size="lg" />);
    indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator).toBeInTheDocument();
  });

  it('renders as button when onClick is provided', () => {
    render(<AgentPresenceIndicator agent="trickster" onClick={() => {}} />);
    const indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator.tagName).toBe('BUTTON');
  });

  it('renders as div when onClick is not provided', () => {
    render(<AgentPresenceIndicator agent="trickster" />);
    const indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator.tagName).toBe('DIV');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<AgentPresenceIndicator agent="trickster" onClick={handleClick} />);
    fireEvent.click(screen.getByTestId('agent-presence-indicator'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies hover transform when onClick is provided', () => {
    render(<AgentPresenceIndicator agent="trickster" onClick={() => {}} />);
    const indicator = screen.getByTestId('agent-presence-indicator');
    
    fireEvent.mouseEnter(indicator);
    expect(indicator).toHaveStyle({ transform: 'scale(1.05)' });
    
    fireEvent.mouseLeave(indicator);
    expect(indicator).not.toHaveStyle({ transform: 'scale(1.05)' });
  });

  it('shows correct status color for online status', () => {
    render(<AgentPresenceIndicator agent="trickster" status="online" />);
    const indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator).toBeInTheDocument();
  });

  it('shows correct status color for busy status', () => {
    render(<AgentPresenceIndicator agent="trickster" status="busy" />);
    const indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator).toBeInTheDocument();
  });

  it('renders all player agent types correctly', () => {
    const agents: Array<'trickster' | 'strategist' | 'speedster' | 'guardian' | 'wildcard' | 'mentor' | 'champion'> = [
      'trickster', 'strategist', 'speedster', 'guardian', 'wildcard', 'mentor', 'champion'
    ];

    agents.forEach(agent => {
      render(<AgentPresenceIndicator agent={agent} />);
      expect(screen.getByTestId('agent-presence-indicator')).toBeInTheDocument();
      cleanup();
    });
  });

  it('renders all builder agent types correctly', () => {
    const agents: Array<'chaos' | 'designer' | 'security' | 'economist' | 'madchimp'> = [
      'chaos', 'designer', 'security', 'economist', 'madchimp'
    ];

    agents.forEach(agent => {
      render(<AgentPresenceIndicator agent={agent} />);
      expect(screen.getByTestId('agent-presence-indicator')).toBeInTheDocument();
      cleanup();
    });
  });

  it('has correct accessibility attributes', () => {
    render(<AgentPresenceIndicator agent="trickster" status="online" isThinking={true} />);
    const indicator = screen.getByTestId('agent-presence-indicator');
    expect(indicator).toHaveAttribute('aria-label', expect.stringContaining('trickster'));
  });
});
