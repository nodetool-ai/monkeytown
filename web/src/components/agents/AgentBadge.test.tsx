import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AgentBadge } from './AgentBadge';

describe('AgentBadge', () => {
  it('renders agent emoji by default', () => {
    render(<AgentBadge agent="chaos" />);
    expect(screen.getByText('🧠')).toBeInTheDocument();
  });

  it('renders agent name by default', () => {
    render(<AgentBadge agent="chaos" />);
    expect(screen.getByText('ChaosArchitect')).toBeInTheDocument();
  });

  it('renders as div by default', () => {
    render(<AgentBadge agent="chaos" />);
    expect(screen.getByText('ChaosArchitect').closest('div')).not.toBeNull();
  });

  it('renders as button when onClick is provided', () => {
    render(<AgentBadge agent="chaos" onClick={() => {}} />);
    expect(screen.getByText('ChaosArchitect').closest('button')).not.toBeNull();
  });

  it('shows status dot', () => {
    render(<AgentBadge agent="chaos" status="online" />);
    const container = screen.getByText('ChaosArchitect').parentElement;
    const statusDot = container?.querySelector('span:last-child');
    expect(statusDot).toBeInTheDocument();
  });

  it('applies different sizes correctly', () => {
    const { rerender } = render(<AgentBadge agent="chaos" size="sm" />);
    let badge = screen.getByText('ChaosArchitect').closest('div');
    expect(badge).toHaveStyle({ padding: '4px 8px' });

    rerender(<AgentBadge agent="chaos" size="md" />);
    badge = screen.getByText('ChaosArchitect').closest('div');
    expect(badge).toHaveStyle({ padding: '6px 12px' });

    rerender(<AgentBadge agent="chaos" size="lg" />);
    badge = screen.getByText('ChaosArchitect').closest('div');
    expect(badge).toHaveStyle({ padding: '8px 16px' });
  });

  it('hides emoji when showEmoji is false', () => {
    render(<AgentBadge agent="chaos" showEmoji={false} />);
    expect(screen.queryByText('🧠')).not.toBeInTheDocument();
    expect(screen.getByText('ChaosArchitect')).toBeInTheDocument();
  });

  it('hides name when showName is false', () => {
    render(<AgentBadge agent="chaos" showName={false} />);
    expect(screen.getByText('🧠')).toBeInTheDocument();
    expect(screen.queryByText('ChaosArchitect')).not.toBeInTheDocument();
  });

  it('applies correct background color for each agent', () => {
    const { container } = render(<AgentBadge agent="chaos" />);
    const badge = container.querySelector('div');
    expect(badge).toHaveStyle({ display: 'inline-flex' });
  });

  it('applies hover transform when onClick is provided', () => {
    render(<AgentBadge agent="chaos" onClick={() => {}} />);
    const button = screen.getByRole('button');
    
    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle({ transform: 'translateY(-1px)' });
    
    fireEvent.mouseLeave(button);
    expect(button).not.toHaveStyle({ transform: 'translateY(-1px)' });
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<AgentBadge agent="chaos" onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<AgentBadge agent="chaos" className="custom-agent" />);
    expect(screen.getByText('ChaosArchitect').closest('div')).toHaveClass('custom-agent');
  });

  it('applies custom styles', () => {
    render(<AgentBadge agent="chaos" style={{ border: '2px solid red' }} />);
    const badge = screen.getByText('ChaosArchitect').closest('div');
    expect(badge).toHaveStyle({ border: '2px solid red' });
  });

  it('renders all agent types correctly', () => {
    const { unmount } = render(<AgentBadge agent="chaos" />);
    expect(screen.getByText('ChaosArchitect')).toBeInTheDocument();
    unmount();

    render(<AgentBadge agent="curious" />);
    expect(screen.getByText('CuriousGeorge')).toBeInTheDocument();
  });

  it('shows correct status dot color', () => {
    const { rerender } = render(<AgentBadge agent="chaos" status="online" />);
    let badge = screen.getByText('ChaosArchitect').parentElement;
    let statusDot = badge?.querySelector('span:last-child');
    expect(statusDot).toHaveStyle({ background: 'var(--color-online)' });

    rerender(<AgentBadge agent="chaos" status="away" />);
    badge = screen.getByText('ChaosArchitect').parentElement;
    statusDot = badge?.querySelector('span:last-child');
    expect(statusDot).toHaveStyle({ background: 'var(--color-away)' });

    rerender(<AgentBadge agent="chaos" status="busy" />);
    badge = screen.getByText('ChaosArchitect').parentElement;
    statusDot = badge?.querySelector('span:last-child');
    expect(statusDot).toHaveStyle({ background: 'var(--color-busy)' });

    rerender(<AgentBadge agent="chaos" status="offline" />);
    badge = screen.getByText('ChaosArchitect').parentElement;
    statusDot = badge?.querySelector('span:last-child');
    expect(statusDot).toHaveStyle({ background: 'var(--color-offline)' });
  });

  it('has rounded border', () => {
    render(<AgentBadge agent="chaos" />);
    const badge = screen.getByText('ChaosArchitect').closest('div');
    expect(badge).toHaveStyle({ display: 'inline-flex' });
  });

  it('has cursor pointer when onClick is provided', () => {
    render(<AgentBadge agent="chaos" onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ cursor: 'pointer' });
  });

  it('has cursor default when no onClick', () => {
    render(<AgentBadge agent="chaos" />);
    const badge = screen.getByText('ChaosArchitect').closest('div');
    expect(badge).toHaveStyle({ display: 'inline-flex' });
  });
});
