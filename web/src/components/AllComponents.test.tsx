import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AgentCard } from './AgentCard';
import { SystemPulse } from './SystemPulse';
import { TerrariumView } from './TerrariumView';
import { GhostColumn } from './GhostColumn';
import { ActionSeed } from './ActionSeed';
import { DetailPanel } from './DetailPanel';
import { ErrorCard, InlineError } from './ErrorCard';
import { FlowStream } from './FlowStream';
import { Flow, FlowType, FlowStatus, Entity } from '@monkeytown/shared/types';

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

describe('FlowStream', () => {
  const sourcePos = { x: 100, y: 100 };
  const targetPos = { x: 300, y: 200 };
  let flowIdCounter = 0;

  const createMockFlow = (overrides: Partial<Flow> = {}): Flow => {
    flowIdCounter++;
    return {
      id: `flow-${flowIdCounter}`,
      sourceId: 'agent-1',
      targetId: 'agent-2',
      type: 'message',
      status: 'active' as FlowStatus,
      timestamp: Date.now(),
      ...overrides,
    };
  };

  it('renders with active status class', () => {
    const { container, unmount } = render(
      <FlowStream
        flow={createMockFlow({ status: 'active' as FlowStatus })}
        sourcePos={sourcePos}
        targetPos={targetPos}
      />
    );
    expect(container.querySelector('.flow-stream.active')).toBeTruthy();
    unmount();
  });

  it('renders with pending status class', () => {
    const { container, unmount } = render(
      <FlowStream
        flow={createMockFlow({ status: 'pending' as FlowStatus })}
        sourcePos={sourcePos}
        targetPos={targetPos}
      />
    );
    expect(container.querySelector('.flow-stream.pending')).toBeTruthy();
    unmount();
  });

  it('renders with complete status class', () => {
    const { container, unmount } = render(
      <FlowStream
        flow={createMockFlow({ status: 'complete' as FlowStatus })}
        sourcePos={sourcePos}
        targetPos={targetPos}
      />
    );
    expect(container.querySelector('.flow-stream.complete')).toBeTruthy();
    unmount();
  });

  it('renders with error status class', () => {
    const { container, unmount } = render(
      <FlowStream
        flow={createMockFlow({ status: 'error' as FlowStatus })}
        sourcePos={sourcePos}
        targetPos={targetPos}
      />
    );
    expect(container.querySelector('.flow-stream.error')).toBeTruthy();
    unmount();
  });

  it('renders message type flow', () => {
    const { container, unmount } = render(
      <FlowStream
        flow={createMockFlow({ type: 'message' as FlowType })}
        sourcePos={sourcePos}
        targetPos={targetPos}
      />
    );
    expect(container.querySelector('.flow-stream')).toBeTruthy();
    unmount();
  });

  it('renders resource type flow', () => {
    const { container, unmount } = render(
      <FlowStream
        flow={createMockFlow({ type: 'resource' as FlowType })}
        sourcePos={sourcePos}
        targetPos={targetPos}
      />
    );
    expect(container.querySelector('.flow-stream')).toBeTruthy();
    unmount();
  });

  it('renders contract type flow', () => {
    const { container, unmount } = render(
      <FlowStream
        flow={createMockFlow({ type: 'contract' as FlowType })}
        sourcePos={sourcePos}
        targetPos={targetPos}
      />
    );
    expect(container.querySelector('.flow-stream')).toBeTruthy();
    unmount();
  });

  it('renders signal type flow', () => {
    const { container, unmount } = render(
      <FlowStream
        flow={createMockFlow({ type: 'signal' as FlowType })}
        sourcePos={sourcePos}
        targetPos={targetPos}
      />
    );
    expect(container.querySelector('.flow-stream')).toBeTruthy();
    unmount();
  });

  it('calls onComplete callback when flow completes', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    const { unmount } = render(
      <FlowStream
        flow={createMockFlow({ status: 'complete' as FlowStatus })}
        sourcePos={sourcePos}
        targetPos={targetPos}
        onComplete={onComplete}
      />
    );
    vi.advanceTimersByTime(600);
    expect(onComplete).toHaveBeenCalled();
    vi.useRealTimers();
    unmount();
  });

  it('calls onError callback when flow errors', () => {
    vi.useFakeTimers();
    const onError = vi.fn();
    const { unmount } = render(
      <FlowStream
        flow={createMockFlow({ status: 'error' as FlowStatus })}
        sourcePos={sourcePos}
        targetPos={targetPos}
        onError={onError}
      />
    );
    vi.advanceTimersByTime(400);
    expect(onError).toHaveBeenCalled();
    vi.useRealTimers();
    unmount();
  });
});
