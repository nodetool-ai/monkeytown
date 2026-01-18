import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('applies primary variant styles by default', () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ background: 'var(--color-primary)' });
  });

  it('applies secondary variant styles', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ background: 'transparent' });
  });

  it('applies ghost variant styles', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ background: 'transparent' });
  });

  it('applies danger variant styles', () => {
    render(<Button variant="danger">Danger Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ background: 'var(--color-error)' });
  });

  it('applies small size styles', () => {
    render(<Button size="sm">Small Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ height: '32px' });
  });

  it('applies medium size styles by default', () => {
    render(<Button size="md">Medium Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ height: '44px' });
  });

  it('applies large size styles', () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ height: '56px' });
  });

  it('shows loading spinner when loading is true', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    const spinner = button.querySelector('span');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveStyle({ width: '16px' });
    expect(button).toBeDisabled();
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies reduced opacity when disabled', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ opacity: 0.5 });
    expect(button).toHaveStyle({ cursor: 'not-allowed' });
  });

  it('applies reduced opacity when loading', () => {
    render(<Button loading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ opacity: 0.5 });
    expect(button).toHaveStyle({ cursor: 'not-allowed' });
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('does not call onClick when loading', () => {
    const handleClick = vi.fn();
    render(<Button loading onClick={handleClick}>Loading</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders icon when provided', () => {
    const icon = <span data-testid="icon">★</span>;
    render(<Button icon={icon}>With Icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('does not render icon when loading', () => {
    const icon = <span data-testid="icon">★</span>;
    render(<Button icon={icon} loading>Loading</Button>);
    expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
  });

  it('forwards ref correctly', () => {
    const ref = { current: null as HTMLButtonElement | null };
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe('BUTTON');
  });

  it('applies additional props correctly', () => {
    render(<Button data-testid="custom-button" aria-label="Custom button">Custom</Button>);
    expect(screen.getByTestId('custom-button')).toHaveAttribute('aria-label', 'Custom button');
  });

  it('handles hover state correctly', () => {
    render(<Button variant="secondary">Hover Me</Button>);
    const button = screen.getByRole('button');
    
    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle({ background: 'rgba(255, 255, 255, 0.04)' });
    
    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle({ background: 'transparent' });
  });

  it('handles active state correctly', () => {
    render(<Button variant="secondary">Press Me</Button>);
    const button = screen.getByRole('button');
    
    fireEvent.mouseDown(button);
    expect(button).toHaveStyle({ background: 'rgba(255, 255, 255, 0.08)' });
    
    fireEvent.mouseUp(button);
    expect(button).not.toHaveStyle({ background: 'rgba(255, 255, 255, 0.08)' });
  });

  it('has correct display name', () => {
    expect(Button.displayName).toBe('Button');
  });
});
