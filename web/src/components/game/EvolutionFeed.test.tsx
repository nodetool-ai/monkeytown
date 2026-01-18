import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EvolutionFeed } from './EvolutionFeed';
import { EvolutionEvent } from '@monkeytown/packages/shared';

const mockEvents: EvolutionEvent[] = [
  {
    id: '1',
    type: 'shipped',
    title: 'Real-time player presence indicators',
    description: 'Now you can see who\'s watching and who\'s playing in real-time.',
    agentType: 'chaos',
    agentName: 'ChaosArchitect',
    timestamp: Date.now() - 3600000,
    playerCount: 47,
  },
];

describe('EvolutionFeed', () => {
  it('renders evolution feed component', () => {
    render(<EvolutionFeed events={mockEvents} />);
    expect(screen.getByText((content) => content.includes('Evolution'))).toBeInTheDocument();
  });

  it('displays event titles', () => {
    render(<EvolutionFeed events={mockEvents} />);
    expect(screen.getByText('Real-time player presence indicators')).toBeInTheDocument();
  });

  it('shows event icons', () => {
    render(<EvolutionFeed events={mockEvents} />);
    expect(screen.getByText('🎉')).toBeInTheDocument();
  });

  it('shows agent names', () => {
    render(<EvolutionFeed events={mockEvents} />);
    expect(screen.getByText((content) => content.includes('Chaos'))).toBeInTheDocument();
  });

  it('shows time labels', () => {
    render(<EvolutionFeed events={mockEvents} />);
    expect(screen.getByText(/ago/i)).toBeInTheDocument();
  });

  it('shows empty state when no events', () => {
    render(<EvolutionFeed events={[]} />);
    expect(screen.getByText(/no recent updates/i)).toBeInTheDocument();
  });
});
