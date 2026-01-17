import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AgentCard } from './AgentCard';
import { SystemPulse } from './SystemPulse';
import { TerrariumView } from './TerrariumView';
import { GhostColumn } from './GhostColumn';
import { ActionSeed } from './ActionSeed';
import { DetailPanel } from './DetailPanel';
import { ErrorCard, InlineError } from './ErrorCard';
import { Entity } from '@monkeytown/shared/types';

const mockEntity: Entity = {
  id: 'agent-1',
  type: 'agent',
  status: 'active',
  label: 'TestAgent',
  metrics: { efficiency: 94, load: 23, connections: 5 },
  timestamp: Date.now(),
};

describe('AgentCard', () => {
  it('renders entity label', () => {
    const { unmount } = render(<AgentCard entity={mockEntity} />);
    expect(screen.getByText('TestAgent')).toBeTruthy();
    unmount();
  });

  it('renders processing status', () => {
    const { unmount } = render(
      <AgentCard entity={{ ...mockEntity, status: 'processing' }} />
    );
    expect(screen.getByText('processing')).toBeTruthy();
    unmount();
  });

  it('renders error status', () => {
    const { unmount } = render(
      <AgentCard entity={{ ...mockEntity, status: 'error' }} />
    );
    expect(screen.getByText('error')).toBeTruthy();
    unmount();
  });
});

describe('SystemPulse', () => {
  it('renders wordmark', () => {
    const { unmount } = render(
      <SystemPulse
        metrics={{
          activeAgents: 4,
          pendingFlows: 12,
          contractsSettled: 1847,
          systemLoad: 34,
        }}
      />
    );
    expect(screen.getByText('monkeytown')).toBeTruthy();
    unmount();
  });

  it('renders metrics labels', () => {
    const { unmount } = render(
      <SystemPulse
        metrics={{
          activeAgents: 4,
          pendingFlows: 12,
          contractsSettled: 1847,
          systemLoad: 34,
        }}
      />
    );
    expect(screen.getByText('agents')).toBeTruthy();
    expect(screen.getByText('flows')).toBeTruthy();
    expect(screen.getByText('settled')).toBeTruthy();
    expect(screen.getByText('load')).toBeTruthy();
    unmount();
  });
});

describe('TerrariumView', () => {
  it('shows waiting state when empty', () => {
    const { unmount } = render(
      <TerrariumView entities={[]} focusedEntity={null} onEntityClick={() => {}} />
    );
    expect(screen.getByText('waiting for activity...')).toBeTruthy();
    unmount();
  });

  it('renders active entities', () => {
    const { unmount } = render(
      <TerrariumView
        entities={[mockEntity]}
        focusedEntity={null}
        onEntityClick={() => {}}
      />
    );
    expect(screen.getByText('TestAgent')).toBeTruthy();
    unmount();
  });
});

describe('GhostColumn', () => {
  it('does not render when history is empty', () => {
    const { container, unmount } = render(
      <GhostColumn history={[]} onRestore={() => {}} />
    );
    expect(container.querySelector('.ghost-column')).toBeFalsy();
    unmount();
  });

  it('renders when history has items', () => {
    const { unmount } = render(
      <GhostColumn
        history={[mockEntity]}
        onRestore={() => {}}
      />
    );
    expect(screen.getByText('history')).toBeTruthy();
    expect(screen.getByText('1')).toBeTruthy();
    unmount();
  });
});

describe('ActionSeed', () => {
  it('renders seed trigger button', () => {
    const { unmount } = render(
      <ActionSeed onPlant={() => {}} />
    );
    expect(screen.getByText('plant something')).toBeTruthy();
    unmount();
  });

  it('shows pending count when seeds are growing', () => {
    const { unmount } = render(
      <ActionSeed onPlant={() => {}} isGrowing={true} pendingCount={2} />
    );
    expect(screen.getByText('seed growing...')).toBeTruthy();
    unmount();
  });

  it('disables trigger when max seeds reached', () => {
    const { unmount } = render(
      <ActionSeed onPlant={() => {}} pendingCount={5} />
    );
    expect(screen.getByText('5')).toBeTruthy();
    unmount();
  });
});

describe('DetailPanel', () => {
  it('renders entity label and type', () => {
    const { unmount } = render(
      <DetailPanel
        entity={mockEntity}
        onClose={() => {}}
      />
    );
    expect(screen.getByText('TestAgent')).toBeTruthy();
    expect(screen.getByText('agent')).toBeTruthy();
    unmount();
  });

  it('renders tabs', () => {
    const { unmount } = render(
      <DetailPanel
        entity={mockEntity}
        onClose={() => {}}
      />
    );
    const tabs = screen.getAllByRole('button', { name: /status|logs|connections|history/i });
    expect(tabs.length).toBe(4);
    unmount();
  });

  it('renders metrics', () => {
    const { unmount } = render(
      <DetailPanel
        entity={mockEntity}
        onClose={() => {}}
      />
    );
    const efficiencyValues = screen.getAllByText('94%');
    expect(efficiencyValues.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('23%')).toBeTruthy();
    expect(screen.getByText('5')).toBeTruthy();
    unmount();
  });
});

describe('ErrorCard', () => {
  it('renders error message', () => {
    const { unmount } = render(
      <ErrorCard
        error={{ message: 'Connection failed', context: 'Unable to reach server' }}
        onRetry={() => {}}
      />
    );
    expect(screen.getByText('Connection failed')).toBeTruthy();
    expect(screen.getByText('something broke')).toBeTruthy();
    unmount();
  });

  it('renders retry action', () => {
    const { unmount } = render(
      <ErrorCard
        error={{ message: 'Test error' }}
        onRetry={() => {}}
      />
    );
    expect(screen.getByText('retry')).toBeTruthy();
    unmount();
  });

  it('renders suggestion when provided', () => {
    const { unmount } = render(
      <ErrorCard
        error={{ message: 'Test error' }}
        suggestion="Check your connection"
        onRetry={() => {}}
      />
    );
    expect(screen.getByText('Check your connection')).toBeTruthy();
    unmount();
  });
});

describe('InlineError', () => {
  it('renders error message', () => {
    const { unmount } = render(
      <InlineError error={{ message: 'Something went wrong' }} />
    );
    expect(screen.getByText('Something went wrong')).toBeTruthy();
    unmount();
  });
});
