import { describe, it, expect } from 'vitest';
import {
  Entity,
  EntityStatus,
  Flow,
  FlowType,
  FlowStatus,
  SystemMetrics,
  Seed,
  SeedType,
  SeedStatus,
  SeedIntent,
  FlowPosition,
  StreamMessage,
} from '@monkeytown/shared/types';

describe('Shared Types', () => {
  describe('Entity', () => {
    it('creates a valid entity', () => {
      const entity: Entity = {
        id: 'agent-1',
        type: 'agent',
        status: 'active',
        label: 'TestAgent',
        metrics: { efficiency: 94, load: 23, connections: 5 },
        timestamp: Date.now(),
      };
      expect(entity.id).toBe('agent-1');
      expect(entity.type).toBe('agent');
      expect(entity.status).toBe('active');
    });

    it('allows optional parentId', () => {
      const entity: Entity = {
        id: 'contract-1',
        type: 'contract',
        status: 'idle',
        label: 'commit-123',
        metrics: { efficiency: 100, load: 0, connections: 0 },
        timestamp: Date.now(),
        parentId: 'agent-1',
      };
      expect(entity.parentId).toBe('agent-1');
    });
  });

  describe('EntityStatus', () => {
    it('accepts all valid status values', () => {
      const statuses: EntityStatus[] = ['idle', 'active', 'processing', 'complete', 'error'];
      statuses.forEach((status) => {
        const entity: Entity = {
          id: 'test',
          type: 'agent',
          status,
          label: 'Test',
          metrics: { efficiency: 100, load: 0, connections: 0 },
          timestamp: Date.now(),
        };
        expect(entity.status).toBe(status);
      });
    });
  });

  describe('Flow', () => {
    it('creates a valid flow', () => {
      const flow: Flow = {
        id: 'flow-1',
        sourceId: 'agent-1',
        targetId: 'agent-2',
        type: 'message',
        status: 'pending',
        timestamp: Date.now(),
      };
      expect(flow.id).toBe('flow-1');
      expect(flow.type).toBe('message');
      expect(flow.status).toBe('pending');
    });

    it('accepts all flow types', () => {
      const types: FlowType[] = ['message', 'resource', 'contract', 'signal'];
      types.forEach((type) => {
        const flow: Flow = {
          id: 'test',
          sourceId: 'a',
          targetId: 'b',
          type,
          status: 'active',
          timestamp: Date.now(),
        };
        expect(flow.type).toBe(type);
      });
    });

    it('accepts all flow statuses', () => {
      const statuses: FlowStatus[] = ['pending', 'active', 'complete', 'error'];
      statuses.forEach((status) => {
        const flow: Flow = {
          id: 'test',
          sourceId: 'a',
          targetId: 'b',
          type: 'message',
          status,
          timestamp: Date.now(),
        };
        expect(flow.status).toBe(status);
      });
    });
  });

  describe('SystemMetrics', () => {
    it('creates valid metrics', () => {
      const metrics: SystemMetrics = {
        activeAgents: 4,
        pendingFlows: 12,
        contractsSettled: 1847,
        systemLoad: 34,
      };
      expect(metrics.activeAgents).toBe(4);
      expect(metrics.contractsSettled).toBe(1847);
    });
  });

  describe('Seed', () => {
    it('creates a valid seed', () => {
      const seed: Seed = {
        id: 'seed-1',
        type: 'contract',
        status: 'growing',
        timestamp: Date.now(),
      };
      expect(seed.id).toBe('seed-1');
      expect(seed.type).toBe('contract');
      expect(seed.status).toBe('growing');
    });

    it('accepts all seed types', () => {
      const types: SeedType[] = ['contract', 'constraint', 'resource', 'query'];
      types.forEach((type) => {
        const seed: Seed = {
          id: 'test',
          type,
          status: 'pending',
          timestamp: Date.now(),
        };
        expect(seed.type).toBe(type);
      });
    });

    it('accepts all seed statuses', () => {
      const statuses: SeedStatus[] = ['pending', 'growing', 'complete', 'error'];
      statuses.forEach((status) => {
        const seed: Seed = {
          id: 'test',
          type: 'contract',
          status,
          timestamp: Date.now(),
        };
        expect(seed.status).toBe(status);
      });
    });
  });

  describe('SeedIntent', () => {
    it('creates a valid seed intent', () => {
      const intent: SeedIntent = {
        type: 'query',
        payload: { question: 'What is the system status?' },
      };
      expect(intent.type).toBe('query');
      expect(intent.payload.question).toBe('What is the system status?');
    });
  });

  describe('FlowPosition', () => {
    it('creates valid positions', () => {
      const pos: FlowPosition = { x: 100, y: 200 };
      expect(pos.x).toBe(100);
      expect(pos.y).toBe(200);
    });
  });

  describe('StreamMessage', () => {
    it('accepts entity_update messages', () => {
      const message: StreamMessage = {
        type: 'entity_update',
        entity: { id: 'test' },
        timestamp: Date.now(),
      };
      expect(message.type).toBe('entity_update');
    });

    it('accepts flow_update messages', () => {
      const message: StreamMessage = {
        type: 'flow_update',
        flow: { id: 'flow-1' },
        timestamp: Date.now(),
      };
      expect(message.type).toBe('flow_update');
    });

    it('accepts system_health messages', () => {
      const message: StreamMessage = {
        type: 'system_health',
        metrics: {
          activeAgents: 4,
          pendingFlows: 12,
          contractsSettled: 1847,
          systemLoad: 34,
        },
        timestamp: Date.now(),
      };
      expect(message.type).toBe('system_health');
    });

    it('accepts banana_event messages', () => {
      const message: StreamMessage = {
        type: 'banana_event',
        event: { type: 'transfer', amount: 100 },
        timestamp: Date.now(),
      };
      expect(message.type).toBe('banana_event');
    });
  });
});

describe('Type Guards', () => {
  it('STATUS_CONFIG maps entity statuses to colors correctly', () => {
    const STATUS_CONFIG: Record<EntityStatus, string> = {
      idle: 'cyan',
      active: 'green',
      processing: 'amber',
      complete: 'green',
      error: 'red',
    };
    expect(STATUS_CONFIG.idle).toBe('cyan');
    expect(STATUS_CONFIG.active).toBe('green');
    expect(STATUS_CONFIG.complete).toBe('green');
    expect(STATUS_CONFIG.error).toBe('red');
  });
});
