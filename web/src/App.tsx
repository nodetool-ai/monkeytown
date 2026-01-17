import { useState, useEffect, useCallback } from 'react';
import './App.css';
import { SystemPulse, TerrariumView, GhostColumn } from './components';
import { Entity, SystemMetrics } from '@monkeytown/shared/types';

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
  {
    id: 'flow-1',
    type: 'flow',
    status: 'processing',
    label: 'data-sync',
    metrics: { efficiency: 78, load: 12, connections: 2 },
    timestamp: Date.now() - 3000,
  },
];

function App() {
  const [metrics, setMetrics] = useState<SystemMetrics>(INITIAL_METRICS);
  const [entities, setEntities] = useState<Entity[]>(INITIAL_ENTITIES);
  const [history, setHistory] = useState<Entity[]>([]);
  const [focusedEntity, setFocusedEntity] = useState<Entity | null>(null);

  const handleEntityClick = useCallback((entity: Entity) => {
    setFocusedEntity(entity);
  }, []);

  const handleRestoreFromHistory = useCallback((entity: Entity) => {
    setEntities((prev) => [...prev, entity]);
    setHistory((prev) => prev.filter((e) => e.id !== entity.id));
    setFocusedEntity(entity);
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
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
    </div>
  );
}

export default App;
