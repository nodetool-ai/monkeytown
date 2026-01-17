import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AgentCard } from './AgentCard';
import { SystemPulse } from './SystemPulse';
import { TerrariumView } from './TerrariumView';
import { GhostColumn } from './GhostColumn';
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
