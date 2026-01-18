'use client';

import { useState, useEffect, useMemo } from 'react';
import { Entity, Flow, SystemMetrics, GhostItem } from '../lib/types';

const MOCK_ENTITIES: Entity[] = [
  {
    id: 'agent-founderai',
    type: 'agent',
    status: 'active',
    label: 'FounderAI',
    metrics: { efficiency: 92, load: 45, connections: 4 },
    timestamp: Date.now(),
  },
  {
    id: 'agent-chaosarchitect',
    type: 'agent',
    status: 'processing',
    label: 'ChaosArchitect',
    metrics: { efficiency: 87, load: 72, connections: 3 },
    timestamp: Date.now(),
  },
  {
    id: 'agent-simianresearcher',
    type: 'agent',
    status: 'active',
    label: 'SimianResearcher',
    metrics: { efficiency: 78, load: 34, connections: 5 },
    timestamp: Date.now(),
  },
  {
    id: 'agent-primatedesigner',
    type: 'agent',
    status: 'idle',
    label: 'PrimateDesigner',
    metrics: { efficiency: 95, load: 20, connections: 2 },
    timestamp: Date.now(),
  },
  {
    id: 'agent-bananaeconomist',
    type: 'agent',
    status: 'processing',
    label: 'BananaEconomist',
    metrics: { efficiency: 82, load: 68, connections: 4 },
    timestamp: Date.now(),
  },
  {
    id: 'agent-junglesecurity',
    type: 'agent',
    status: 'active',
    label: 'JungleSecurity',
    metrics: { efficiency: 91, load: 55, connections: 3 },
    timestamp: Date.now(),
  },
];

const MOCK_FLOWS: Flow[] = [
  {
    id: 'flow-1',
    sourceId: 'agent-founderai',
    targetId: 'agent-chaosarchitect',
    type: 'signal',
    status: 'active',
    timestamp: Date.now(),
  },
  {
    id: 'flow-2',
    sourceId: 'agent-simianresearcher',
    targetId: 'agent-primatedesigner',
    type: 'resource',
    status: 'pending',
    timestamp: Date.now(),
  },
  {
    id: 'flow-3',
    sourceId: 'agent-bananaeconomist',
    targetId: 'agent-junglesecurity',
    type: 'contract',
    status: 'active',
    timestamp: Date.now(),
  },
];

const MOCK_METRICS: SystemMetrics = {
  activeAgents: 4,
  pendingFlows: 12,
  contractsSettled: 1847,
  systemLoad: 34,
};

const MOCK_GHOST_ITEMS: GhostItem[] = [
  { id: 'ghost-1', label: 'FounderAI', action: 'committed', timestamp: Date.now() - 5000, opacity: 0.9 },
  { id: 'ghost-2', label: 'ChaosArchitect', action: 'merged', timestamp: Date.now() - 15000, opacity: 0.7 },
  { id: 'ghost-3', label: 'PrimateDesigner', action: 'deployed', timestamp: Date.now() - 30000, opacity: 0.5 },
  { id: 'ghost-4', label: 'SimianResearcher', action: 'merged', timestamp: Date.now() - 60000, opacity: 0.3 },
];

interface UseStreamOptions {
  url?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: Event) => void;
  demo?: boolean;
}

interface UseStreamReturn {
  entities: Entity[];
  flows: Flow[];
  metrics: SystemMetrics | null;
  ghostItems: GhostItem[];
  isConnected: boolean;
  addGhostItem: (item: Omit<GhostItem, 'timestamp' | 'opacity'>) => void;
}

export function useStream(options: UseStreamOptions = {}): UseStreamReturn {
  const { url = 'ws://localhost:3001', onConnect, onDisconnect, onError, demo = false } = options;

  const [entities, setEntities] = useState<Entity[]>([]);
  const [flows, setFlows] = useState<Flow[]>([]);
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [ghostItems, setGhostItems] = useState<GhostItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (demo) {
      setEntities(MOCK_ENTITIES);
      setFlows(MOCK_FLOWS);
      setMetrics(MOCK_METRICS);
      setGhostItems(MOCK_GHOST_ITEMS);
      setIsConnected(true);
      return;
    }

    let ws: WebSocket | null = null;
    let reconnectTimeout: ReturnType<typeof setTimeout> | null = null;

    const connect = () => {
      try {
        ws = new WebSocket(url);

        ws.onopen = () => {
          setIsConnected(true);
          onConnect?.();
        };

        ws.onclose = () => {
          setIsConnected(false);
          onDisconnect?.();
          reconnectTimeout = setTimeout(connect, 3000);
        };

        ws.onerror = (error) => {
          onError?.(error);
        };

        ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);

            switch (message.type) {
              case 'system_health':
                if (message.metrics) {
                  setMetrics(message.metrics);
                }
                break;

              case 'entity_update':
                if (message.entity) {
                  const entityData = message.entity as { completed?: Entity[]; action?: string };
                  if (entityData.completed && entityData.action === 'completed') {
                    const completedIds = new Set(entityData.completed.map((e: Entity) => e.id));
                    setEntities(prev => prev.filter(e => !completedIds.has(e.id)));
                    entityData.completed.forEach((e: Entity) => {
                      setGhostItems(prev => [{
                        id: `ghost-${e.id}`,
                        label: e.label,
                        action: 'completed',
                        timestamp: Date.now(),
                        opacity: 1,
                      }, ...prev].slice(0, 50));
                    });
                  } else {
                    const entity = message.entity as Entity;
                    setEntities(prev => {
                      const existing = prev.findIndex(e => e.id === entity.id);
                      if (existing >= 0) {
                        const updated = [...prev];
                        updated[existing] = entity;
                        return updated;
                      }
                      return [...prev, entity];
                    });
                  }
                }
                break;

              case 'flow_update':
                if (message.flow) {
                  const flowData = message.flow as { flow?: Flow; action?: string };
                  if (flowData.flow && flowData.action === 'created') {
                    setFlows(prev => [...prev, flowData.flow!]);
                  } else {
                    const flow = message.flow as Flow;
                    setFlows(prev => {
                      const existing = prev.findIndex(f => f.id === flow.id);
                      if (existing >= 0) {
                        const updated = [...prev];
                        updated[existing] = flow;
                        return updated;
                      }
                      return [...prev, flow];
                    });
                  }
                }
                break;

              case 'banana_event':
                setGhostItems(prev => [{
                  id: `banana-${Date.now()}`,
                  label: 'Banana Event',
                  action: 'event',
                  timestamp: Date.now(),
                  opacity: 1,
                }, ...prev].slice(0, 50));
                break;
            }
          } catch (parseError) {
            console.error('Failed to parse message:', parseError);
          }
        };
      } catch (error) {
        console.error('WebSocket connection error:', error);
      }
    };

    connect();

    return () => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [url, onConnect, onDisconnect, onError, demo]);

  useEffect(() => {
    const interval = setInterval(() => {
      setGhostItems(prev =>
        prev
          .map(item => ({ ...item, opacity: Math.max(0, item.opacity - 0.02) }))
          .filter(item => item.opacity > 0)
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const addGhostItem = (item: Omit<GhostItem, 'timestamp' | 'opacity'>) => {
    setGhostItems(prev => [{
      ...item,
      timestamp: Date.now(),
      opacity: 1,
    }, ...prev].slice(0, 50));
  };

  return {
    entities,
    flows,
    metrics,
    ghostItems,
    isConnected,
    addGhostItem,
  };
}
