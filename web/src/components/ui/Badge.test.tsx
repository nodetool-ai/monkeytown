import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Badge content</Badge>);
    expect(screen.getByText('Badge content')).toBeInTheDocument();
  });

  it('renders as span', () => {
    render(<Badge>Badge</Badge>);
    expect(screen.getByText('Badge').tagName).toBe('SPAN');
  });

  it('applies default variant styles', () => {
    render(<Badge>Default Badge</Badge>);
    const badge = screen.getByText('Default Badge');
    expect(badge).toHaveStyle({ display: 'inline-flex' });
  });

  it('applies success variant styles', () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText('Success');
    expect(badge).toHaveStyle({ background: 'rgba(6, 214, 160, 0.15)' });
  });

  it('applies warning variant styles', () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText('Warning');
    expect(badge).toHaveStyle({ background: 'rgba(255, 209, 102, 0.15)' });
  });

  it('applies error variant styles', () => {
    render(<Badge variant="error">Error</Badge>);
    const badge = screen.getByText('Error');
    expect(badge).toHaveStyle({ background: 'rgba(255, 68, 68, 0.15)' });
  });

  it('applies info variant styles', () => {
    render(<Badge variant="info">Info</Badge>);
    const badge = screen.getByText('Info');
    expect(badge).toHaveStyle({ background: 'rgba(17, 138, 178, 0.15)' });
  });

  it('applies small size styles', () => {
    render(<Badge size="sm">Small</Badge>);
    const badge = screen.getByText('Small');
    expect(badge).toHaveStyle({ padding: '2px 6px' });
  });

  it('applies medium size styles by default', () => {
    render(<Badge size="md">Medium</Badge>);
    const badge = screen.getByText('Medium');
    expect(badge).toHaveStyle({ padding: '4px 10px' });
  });

  it('applies large size styles', () => {
    render(<Badge size="lg">Large</Badge>);
    const badge = screen.getByText('Large');
    expect(badge).toHaveStyle({ padding: '6px 14px' });
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Custom</Badge>);
    expect(screen.getByText('Custom')).toHaveClass('custom-badge');
  });

  it('applies custom styles', () => {
    render(<Badge style={{ border: '1px solid red' }}>Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveStyle({ border: '1px solid red' });
  });

  it('handles numeric children', () => {
    render(<Badge variant="success">5</Badge>);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('handles icon and text children', () => {
    render(<Badge variant="info">🔴 Live</Badge>);
    expect(screen.getByText('🔴 Live')).toBeInTheDocument();
  });

  it('has rounded border', () => {
    render(<Badge>Rounded</Badge>);
    const badge = screen.getByText('Rounded');
    expect(badge).toHaveStyle({ display: 'inline-flex' });
  });
});
