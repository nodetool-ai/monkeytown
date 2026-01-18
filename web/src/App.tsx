import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import { SystemPulse, TerrariumView, GhostColumn, ActionSeed, DetailPanel, ErrorCard, FlowStream, MindTemple } from './components';
import { Entity, SystemMetrics, Flow, FlowStatus, Seed, SeedIntent, FlowPosition, StreamMessage } from '@monkeytown/shared/types';

const WS_URL = 'ws://localhost:3001';

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

interface UseWebSocketReturn {
  metrics: SystemMetrics | null;
  entities: Entity[];
  flows: Flow[];
  isConnected: boolean;
}

function useWebSocket(url: string): UseWebSocketReturn {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);
  const [flows, setFlows] = useState<Flow[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const entitiesRef = useRef<Entity[]>([]);
  const flowsRef = useRef<Flow[]>([]);

  useEffect(() => {
    const connect = () => {
      try {
        wsRef.current = new WebSocket(url);

        wsRef.current.onopen = () => {
          setIsConnected(true);
        };

        wsRef.current.onmessage = (event) => {
          try {
            const message: StreamMessage = JSON.parse(event.data);

            switch (message.type) {
              case 'system_health':
                setMetrics(message.metrics);
                break;
              case 'entity_update':
                if (message.entity && typeof message.entity === 'object' && !('action' in message.entity)) {
                  const newEntities = Array.isArray(message.entity) ? message.entity as Entity[] : [message.entity as Entity];
                  setEntities(newEntities);
                  entitiesRef.current = newEntities;
                } else if (message.entity && typeof message.entity === 'object' && 'action' in message.entity) {
                  const data = message.entity as { action: string; completed: Entity[] };
                  if (data.action === 'completed' && data.completed) {
                    entitiesRef.current = entitiesRef.current.filter(
                      e => !data.completed.some(c => c.id === e.id)
                    );
                    setEntities([...entitiesRef.current]);
                  }
                }
                break;
              case 'flow_update':
                if (message.flow && typeof message.flow === 'object' && !('action' in message.flow)) {
                  const newFlows = Array.isArray(message.flow) ? message.flow as Flow[] : [message.flow as Flow];
                  setFlows(newFlows);
                  flowsRef.current = newFlows;
                } else if (message.flow && typeof message.flow === 'object' && 'action' in message.flow) {
                  const data = message.flow as { action: string; flow: Flow };
                  if (data.action === 'created' && data.flow) {
                    flowsRef.current = [...flowsRef.current, data.flow];
                    setFlows([...flowsRef.current]);
                  }
                }
                break;
            }
          } catch (err) {
            console.error('Failed to parse WebSocket message:', err);
          }
        };

        wsRef.current.onclose = () => {
          setIsConnected(false);
          setTimeout(connect, 3000);
        };

        wsRef.current.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      } catch (err) {
        console.error('Failed to connect to WebSocket:', err);
        setTimeout(connect, 3000);
      }
    };

    connect();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  return { metrics, entities, flows, isConnected };
}

function App() {
  const { metrics: wsMetrics, entities: wsEntities, flows: wsFlows, isConnected } = useWebSocket(WS_URL);
  const [metrics, setMetrics] = useState<SystemMetrics>(INITIAL_METRICS);
  const [entities, setEntities] = useState<Entity[]>(INITIAL_ENTITIES);
  const [flows, setFlows] = useState<Flow[]>(INITIAL_FLOWS);
  const [history, setHistory] = useState<Entity[]>([]);
  const [focusedEntity, setFocusedEntity] = useState<Entity | null>(null);
  const [mindTempleEntity, setMindTempleEntity] = useState<Entity | null>(null);
  const [seeds, setSeeds] = useState<Seed[]>([]);
  const [isSeedGrowing, setIsSeedGrowing] = useState(false);
  const [error, setError] = useState<{ message: string; context?: string; code?: string } | null>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hasWsDataRef = useRef(false);

  useEffect(() => {
    if (wsMetrics && !hasWsDataRef.current) {
      hasWsDataRef.current = true;
      setMetrics(wsMetrics);
    }
  }, [wsMetrics]);

  useEffect(() => {
    if (wsEntities.length > 0 && !hasWsDataRef.current) {
      hasWsDataRef.current = true;
      setEntities(wsEntities);
    }
  }, [wsEntities]);

  useEffect(() => {
    if (wsFlows.length > 0 && !hasWsDataRef.current) {
      hasWsDataRef.current = true;
      setFlows(wsFlows);
    }
  }, [wsFlows]);

  useEffect(() => {
    if (!isConnected && !hasWsDataRef.current) {
      fallbackTimerRef.current = setInterval(() => {
        setMetrics((prev) => ({
          activeAgents: prev.activeAgents + Math.floor(Math.random() * 3) - 1,
          pendingFlows: Math.max(0, prev.pendingFlows + Math.floor(Math.random() * 5) - 2),
          contractsSettled: prev.contractsSettled + Math.floor(Math.random() * 10),
          systemLoad: Math.min(100, Math.max(0, prev.systemLoad + Math.floor(Math.random() * 10) - 5)),
        }));

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
    }

    return () => {
      if (fallbackTimerRef.current) {
        clearInterval(fallbackTimerRef.current);
      }
    };
  }, [isConnected]);

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

  const handleOpenMindTemple = useCallback((entity: Entity) => {
    setMindTempleEntity(entity);
    setFocusedEntity(null);
  }, []);

  const handleCloseMindTemple = useCallback(() => {
    setMindTempleEntity(null);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 't' || e.key === 'T') {
        if (focusedEntity?.type === 'agent') {
          setMindTempleEntity(focusedEntity);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedEntity]);

  const getEntityPosition = useCallback((entityId: string): FlowPosition => {
    const index = entities.findIndex((e) => e.id === entityId);
    if (index === -1) return { x: 100, y: 100 };
    const col = index % 4;
    const row = Math.floor(index / 4);
    return { x: 100 + col * 180, y: 100 + row * 120 };
  }, [entities]);

  const displayMetrics = wsMetrics || metrics;

  return (
    <div className="app">
      <SystemPulse metrics={displayMetrics} />

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
          onOpenMindTemple={focusedEntity.type === 'agent' ? () => handleOpenMindTemple(focusedEntity) : undefined}
        />
      )}

      {mindTempleEntity && (
        <MindTemple
          agentId={mindTempleEntity.id}
          agentLabel={mindTempleEntity.label}
          signature="context:string, task:string -> result:string, reasoning:string"
          agentType={mindTempleEntity.type}
          status={mindTempleEntity.status}
          onClose={handleCloseMindTemple}
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
