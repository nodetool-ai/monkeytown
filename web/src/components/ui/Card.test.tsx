import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders as div by default', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content').tagName).toBe('DIV');
  });

  it('renders as button when onClick is provided', () => {
    render(<Card onClick={() => {}}>Clickable card</Card>);
    expect(screen.getByText('Clickable card').tagName).toBe('BUTTON');
  });

  it('applies default variant styles', () => {
    render(<Card>Default Card</Card>);
    const card = screen.getByText('Default Card');
    expect(card).toHaveStyle({ background: 'var(--color-bg-surface)' });
  });

  it('applies elevated variant styles', () => {
    render(<Card variant="elevated">Elevated Card</Card>);
    const card = screen.getByText('Elevated Card');
    expect(card).toHaveStyle({ background: 'var(--color-bg-surface)' });
  });

  it('applies interactive variant styles', () => {
    render(<Card variant="interactive">Interactive Card</Card>);
    const card = screen.getByText('Interactive Card');
    expect(card).toHaveStyle({ cursor: 'pointer' });
  });

  it('applies default padding', () => {
    render(<Card>Card with padding</Card>);
    const card = screen.getByText('Card with padding');
    expect(card).toHaveStyle({ padding: 'var(--space-4)' });
  });

  it('applies none padding', () => {
    render(<Card padding="none">No padding</Card>);
    const card = screen.getByText('No padding');
    expect(card).toHaveStyle({ padding: '0' });
  });

  it('applies small padding', () => {
    render(<Card padding="sm">Small padding</Card>);
    const card = screen.getByText('Small padding');
    expect(card).toHaveStyle({ padding: 'var(--space-3)' });
  });

  it('applies large padding', () => {
    render(<Card padding="lg">Large padding</Card>);
    const card = screen.getByText('Large padding');
    expect(card).toHaveStyle({ padding: 'var(--space-6)' });
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Click me</Card>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies hover styles for interactive variant', () => {
    render(<Card variant="interactive" onClick={() => {}}>Hover me</Card>);
    const card = screen.getByRole('button');
    
    fireEvent.mouseEnter(card);
    expect(card).toHaveStyle({ cursor: 'pointer' });
    
    fireEvent.mouseLeave(card);
    expect(card).not.toHaveStyle({ cursor: 'not-allowed' });
  });

  it('applies custom styles', () => {
    render(<Card style={{ border: '2px solid blue' }}>Custom style</Card>);
    const card = screen.getByText('Custom style');
    expect(card).toHaveStyle({ border: '2px solid blue' });
  });

  it('applies custom className', () => {
    render(<Card className="custom-card">Custom class</Card>);
    expect(screen.getByText('Custom class')).toHaveClass('custom-card');
  });

  it('handles nested children correctly', () => {
    render(
      <Card>
        <span>Child 1</span>
        <span>Child 2</span>
      </Card>
    );
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
