import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { SystemPulse, TerrariumView, GhostColumn, ActionSeed, DetailPanel, ErrorCard, FlowStream } from './components';
import { Entity, SystemMetrics, Flow, FlowStatus, Seed, SeedIntent, FlowPosition } from '@monkeytown/shared/types';

const INITIAL_METRICS: SystemMetrics = {
  activeAgents: 4,
  pendingFlows: 12,
  contractsSettled: 1847,
  systemLoad: 34,
};

const INITIAL_ENTITIES: Entity[] = [
  {
    id: 'agent-1',
    type: 'agent',
    status: 'active',
    label: 'ChaosArchitect',
    metrics: { efficiency: 94, load: 23, connections: 5 },
    timestamp: Date.now() - 5000,
  },
  {
    id: 'agent-2',
    type: 'agent',
    status: 'processing',
    label: 'SimianResearcher',
    metrics: { efficiency: 87, load: 67, connections: 3 },
    timestamp: Date.now() - 2000,
  },
  {
    id: 'contract-1',
    type: 'contract',
    status: 'idle',
    label: 'commit-3f8a2d',
    metrics: { efficiency: 100, load: 0, connections: 0 },
    timestamp: Date.now() - 1000,
  },
  {
    id: 'agent-3',
    type: 'agent',
    status: 'active',
    label: 'BrandBarketeer',
    metrics: { efficiency: 91, load: 45, connections: 2 },
    timestamp: Date.now() - 8000,
  },
];

const INITIAL_FLOWS: Flow[] = [
  {
    id: 'flow-1',
    sourceId: 'agent-1',
    targetId: 'agent-2',
    type: 'message',
    status: 'active',
    timestamp: Date.now() - 3000,
  },
  {
    id: 'flow-2',
    sourceId: 'agent-2',
    targetId: 'contract-1',
    type: 'contract',
    status: 'pending',
    timestamp: Date.now() - 1000,
  },
];

function App() {
  const [metrics, setMetrics] = useState<SystemMetrics>(INITIAL_METRICS);
  const [entities, setEntities] = useState<Entity[]>(INITIAL_ENTITIES);
  const [flows, setFlows] = useState<Flow[]>(INITIAL_FLOWS);
  const [history, setHistory] = useState<Entity[]>([]);
  const [focusedEntity, setFocusedEntity] = useState<Entity | null>(null);
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [isSeedGrowing, setIsSeedGrowing] = useState(false);
  const [error, setError] = useState<{ message: string; context?: string; code?: string } | null>(null);

  const handleEntityClick = useCallback((entity: Entity) => {
    setFocusedEntity(entity);
  }, []);

  const handleRestoreFromHistory = useCallback((entity: Entity) => {
    setEntities((prev) => [...prev, entity]);
    setHistory((prev) => prev.filter((e) => e.id !== entity.id));
    setFocusedEntity(entity);
  }, []);

  const handlePlantSeed = useCallback((intent: SeedIntent) => {
    const newSeed: Seed = {
      id: `seed-${Date.now()}`,
      type: intent.type,
      status: 'growing',
      timestamp: Date.now(),
    };
    setSeeds((prev) => [...prev, newSeed]);
    setIsSeedGrowing(true);

    setTimeout(() => {
      setSeeds((prev) =>
        prev.map((s) => (s.id === newSeed.id ? { ...s, status: 'complete' } : s))
      );
      setIsSeedGrowing(false);
    }, 3000);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setFocusedEntity(null);
  }, []);

  const handleRetryError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        activeAgents: prev.activeAgents + Math.floor(Math.random() * 3) - 1,
        pendingFlows: Math.max(0, prev.pendingFlows + Math.floor(Math.random() * 5) - 2),
        contractsSettled: prev.contractsSettled + Math.floor(Math.random() * 10),
        systemLoad: Math.min(100, Math.max(0, prev.systemLoad + Math.floor(Math.random() * 10) - 5)),
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setEntities((prev) => {
        const updated = prev.map((entity) => {
          if (entity.status === 'processing' && Math.random() > 0.7) {
            return { ...entity, status: 'complete' as const };
          }
          if (entity.status === 'active' && Math.random() > 0.8) {
            return { ...entity, status: 'processing' as const };
          }
          return entity;
        });

        const completed = updated.filter(
          (e) => e.status === 'complete' && !prev.find((p) => p.id === e.id && p.status === 'complete')
        );

        if (completed.length > 0) {
          setHistory((h) => [...completed, ...h].slice(0, 50));
        }

        return updated.filter((e) => e.status !== 'complete');
      });

        setFlows((prev) => {
        const updated = prev.map((flow) => {
          if (flow.status === 'pending' && Math.random() > 0.6) {
            return { ...flow, status: 'active' as FlowStatus };
          }
          if (flow.status === 'active' && Math.random() > 0.7) {
            return { ...flow, status: 'complete' as FlowStatus };
          }
          return flow;
        });

        return updated.filter((f) => f.status !== 'complete');
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getEntityPosition = useCallback((entityId: string): FlowPosition => {
    const index = entities.findIndex((e) => e.id === entityId);
    if (index === -1) return { x: 100, y: 100 };
    const col = index % 4;
    const row = Math.floor(index / 4);
    return { x: 100 + col * 180, y: 100 + row * 120 };
  }, [entities]);

  return (
    <div className="app">
      <SystemPulse metrics={metrics} />

      <div className="main-layout">
        <TerrariumView
          entities={entities}
          focusedEntity={focusedEntity}
          onEntityClick={handleEntityClick}
        />

        <GhostColumn history={history} onRestore={handleRestoreFromHistory} />
      </div>

      {entities.length > 0 && flows.length > 0 && (
        <svg className="flow-overlay">
          {flows.map((flow) => {
            const sourcePos = getEntityPosition(flow.sourceId);
            const targetPos = getEntityPosition(flow.targetId);
            return (
              <FlowStream
                key={flow.id}
                flow={flow}
                sourcePos={sourcePos}
                targetPos={targetPos}
              />
            );
          })}
        </svg>
      )}

      <ActionSeed
        onPlant={handlePlantSeed}
        isGrowing={isSeedGrowing}
        pendingCount={seeds.filter((s) => s.status === 'growing').length}
      />

      {focusedEntity && (
        <DetailPanel
          entity={focusedEntity}
          onClose={handleCloseDetail}
        />
      )}

      {error && (
        <div className="error-overlay">
          <ErrorCard
            error={error}
            onRetry={handleRetryError}
            onIgnore={() => setError(null)}
            onInspect={() => console.log('Inspect error:', error)}
            suggestion="check the agent logs for details"
          />
        </div>
      )}
    </div>
  );
}

export default App;
