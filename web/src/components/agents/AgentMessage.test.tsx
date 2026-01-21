import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { AgentMessage, AgentDecisionMessage } from './AgentMessage';

describe('AgentMessage', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders agent emoji by default', () => {
    render(<AgentMessage agent="trickster" content="Hello!" />);
    expect(screen.getByText('🎭')).toBeInTheDocument();
  });

  it('renders agent name by default', () => {
    render(<AgentMessage agent="trickster" content="Hello!" />);
    expect(screen.getByText('TricksterMonkey')).toBeInTheDocument();
  });

  it('hides emoji when showEmoji is false', () => {
    render(<AgentMessage agent="trickster" content="Hello!" showEmoji={false} />);
    expect(screen.queryByText('🎭')).not.toBeInTheDocument();
  });

  it('hides name when showName is false', () => {
    render(<AgentMessage agent="trickster" content="Hello!" showName={false} />);
    expect(screen.queryByText('TricksterMonkey')).not.toBeInTheDocument();
  });

  it('shows AI badge', () => {
    render(<AgentMessage agent="trickster" content="Hello!" />);
    expect(screen.getByText('AI')).toBeInTheDocument();
  });

  it('renders content correctly', () => {
    render(<AgentMessage agent="trickster" content="Hello, world!" />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  it('renders bubble variant correctly', () => {
    render(<AgentMessage agent="trickster" content="Hello!" variant="bubble" />);
    const container = screen.getByTestId('agent-message');
    expect(container.style.borderLeft).toBeFalsy();
  });

  it('renders default variant with left border', () => {
    render(<AgentMessage agent="trickster" content="Hello!" variant="default" />);
    const container = screen.getByTestId('agent-message');
    expect(container.style.borderLeftWidth).toBe('3px');
  });

  it('renders compact variant correctly', () => {
    render(<AgentMessage agent="trickster" content="Hello!" variant="compact" />);
    const container = screen.getByTestId('agent-message');
    expect(container).toBeInTheDocument();
  });

  it('shows timestamp when provided', () => {
    render(<AgentMessage agent="trickster" content="Hello!" timestamp={1704067200000} />);
    expect(screen.getByText(/AM|PM/)).toBeInTheDocument();
  });

  it('hides timestamp when showTimestamp is false', () => {
    render(<AgentMessage agent="trickster" content="Hello!" timestamp={1704067200000} showTimestamp={false} />);
    expect(screen.queryByText(/^\d{2}:\d{2}$/)).not.toBeInTheDocument();
  });

  it('truncates long content with show more button', () => {
    const longContent = 'This is a very long message that should be truncated because it exceeds one hundred and fifty characters and needs to be shortened for display purposes.';
    render(<AgentMessage agent="trickster" content={longContent} />);
    expect(screen.getByText('Show more')).toBeInTheDocument();
    expect(screen.queryByText(longContent)).not.toBeInTheDocument();
  });

  it('expands content when show more is clicked', () => {
    const longContent = 'This is a very long message that should be truncated because it exceeds one hundred and fifty characters and needs to be shortened for display purposes.';
    render(<AgentMessage agent="trickster" content={longContent} />);
    fireEvent.click(screen.getByText('Show more'));
    expect(screen.getByText(/This is a very long message/)).toBeInTheDocument();
    expect(screen.getByText('Show less')).toBeInTheDocument();
  });

  it('calls onProfileClick when avatar is clicked', () => {
    const handleProfileClick = vi.fn();
    render(<AgentMessage agent="trickster" content="Hello!" onProfileClick={handleProfileClick} />);
    const avatar = screen.getByText('🎭').closest('div');
    fireEvent.click(avatar!);
    expect(handleProfileClick).toHaveBeenCalledTimes(1);
  });

  it('does not have clickable avatar when onProfileClick is not provided', () => {
    render(<AgentMessage agent="trickster" content="Hello!" />);
    const avatar = screen.getByText('🎭').closest('div');
    expect(avatar).not.toHaveAttribute('role', 'button');
  });

  it('renders all player agent types correctly', () => {
    const agents: Array<'trickster' | 'strategist' | 'speedster' | 'guardian' | 'wildcard' | 'mentor' | 'champion'> = [
      'trickster', 'strategist', 'speedster', 'guardian', 'wildcard', 'mentor', 'champion'
    ];

    agents.forEach(agent => {
      render(<AgentMessage agent={agent} content="Test" />);
      expect(screen.getByTestId('agent-message')).toHaveAttribute('data-agent', agent);
      cleanup();
    });
  });

  it('has correct data-testid attribute', () => {
    render(<AgentMessage agent="trickster" content="Hello!" />);
    expect(screen.getByTestId('agent-message')).toBeInTheDocument();
  });
});

describe('AgentDecisionMessage', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders decision content', () => {
    render(<AgentDecisionMessage agent="trickster" decision="I'll play center square." />);
    expect(screen.getByText("I'll play center square.")).toBeInTheDocument();
  });

  it('renders reasoning when provided', () => {
    render(
      <AgentDecisionMessage
        agent="trickster"
        decision="I'll play center square."
        reasoning="This blocks the opponent's winning strategy."
      />
    );
    expect(screen.getByText(/This blocks the opponent's winning strategy/)).toBeInTheDocument();
  });

  it('hides reasoning section when not provided', () => {
    render(<AgentDecisionMessage agent="trickster" decision="I'll play center square." />);
    expect(screen.queryByText('Reasoning:')).not.toBeInTheDocument();
  });

  it('renders timestamp when provided', () => {
    render(
      <AgentDecisionMessage
        agent="trickster"
        decision="Move made"
        timestamp={1704067200000}
      />
    );
    expect(screen.getByText(/12:/)).toBeInTheDocument();
  });

  it('does not show timestamp when not provided', () => {
    render(<AgentDecisionMessage agent="trickster" decision="Move made" />);
    expect(screen.queryByText(/^\d{2}:\d{2}$/)).not.toBeInTheDocument();
  });

  it('shows Decision Made label', () => {
    render(<AgentDecisionMessage agent="trickster" decision="Move made" />);
    expect(screen.getByText('Decision Made')).toBeInTheDocument();
  });

  it('has correct data-testid attribute', () => {
    render(<AgentDecisionMessage agent="trickster" decision="Move made" />);
    expect(screen.getByTestId('agent-decision-message')).toBeInTheDocument();
  });

  it('has correct data-agent attribute', () => {
    render(<AgentDecisionMessage agent="trickster" decision="Move made" />);
    expect(screen.getByTestId('agent-decision-message')).toHaveAttribute('data-agent', 'trickster');
  });
});
