import { EventEmitter } from 'events';
import { Entity, EntityType, EntityStatus, Flow, FlowType, FlowStatus, SystemMetrics } from '@monkeytown/shared/types';

const AGENT_NAMES = [
  'ChaosArchitect', 'SimianResearcher', 'PrimateDesigner', 
  'BananaEconomist', 'JungleSecurity', 'ChaosTester', 
  'MadChimp', 'MonkeyBuilder', 'AlphaOrchestrator', 'FounderAI'
];

const CONTRACT_PREFIXES = ['commit', 'feature', 'refactor', 'fix', 'docs'];

function randomId(): string {
  return Math.random().toString(36).substring(2, 10);
}

function randomFromArray<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomStatus(): EntityStatus {
  const rand = Math.random();
  if (rand < 0.1) return 'idle';
  if (rand < 0.4) return 'active';
  if (rand < 0.7) return 'processing';
  if (rand < 0.95) return 'complete';
  return 'error';
}

function randomFlowStatus(): FlowStatus {
  const rand = Math.random();
  if (rand < 0.3) return 'pending';
  if (rand < 0.6) return 'active';
  if (rand < 0.95) return 'complete';
  return 'error';
}

export class CivilisationSimulation extends EventEmitter {
  private entities: Map<string, Entity> = new Map();
  private flows: Map<string, Flow> = new Map();
  private metrics: SystemMetrics;
  private nextEntityIndex: number = 0;
  private nextFlowIndex: number = 0;
  private interval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    super();
    this.metrics = {
      activeAgents: 4,
      pendingFlows: 12,
      contractsSettled: 1847,
      systemLoad: 34,
    };
    this.initializeAgents();
  }

  private initializeAgents(): void {
    for (const name of AGENT_NAMES) {
      const agent: Entity = {
        id: `agent-${name.toLowerCase()}`,
        type: 'agent',
        status: randomStatus(),
        label: name,
        metrics: {
          efficiency: Math.floor(70 + Math.random() * 30),
          load: Math.floor(Math.random() * 80),
          connections: Math.floor(Math.random() * 6),
        },
        timestamp: Date.now(),
      };
      this.entities.set(agent.id, agent);
    }
    this.nextEntityIndex = AGENT_NAMES.length;
  }

  start(intervalMs: number = 2000): void {
    if (this.interval) return;

    this.interval = setInterval(() => {
      this.tick();
    }, intervalMs);

    this.emit('started', { intervalMs });
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.emit('stopped');
  }

  private tick(): void {
    this.updateMetrics();
    this.updateEntities();
    this.updateFlows();
    this.maybeCreateNewFlow();
    this.broadcastState();
  }

  private updateMetrics(): void {
    this.metrics.activeAgents = Array.from(this.entities.values())
      .filter(e => e.type === 'agent' && (e.status === 'active' || e.status === 'processing'))
      .length;

    this.metrics.pendingFlows = Array.from(this.flows.values())
      .filter(f => f.status === 'pending' || f.status === 'active')
      .length;

    this.metrics.contractsSettled += Math.floor(Math.random() * 5);
    this.metrics.systemLoad = Math.min(100, Math.max(0, 
      this.metrics.systemLoad + Math.floor(Math.random() * 10) - 5
    ));
  }

  private updateEntities(): void {
    for (const entity of this.entities.values()) {
      if (entity.type === 'agent') {
        if (entity.status === 'processing' && Math.random() > 0.7) {
          entity.status = 'complete';
        } else if (entity.status === 'active' && Math.random() > 0.8) {
          entity.status = 'processing';
        }

        entity.metrics.load = Math.min(100, Math.max(0, 
          entity.metrics.load + Math.floor(Math.random() * 20) - 10
        ));
      }

      entity.timestamp = Date.now();
    }

    const completed = Array.from(this.entities.values())
      .filter(e => e.status === 'complete');

    if (completed.length > 0) {
      this.emit('entities_completed', completed);
    }

    for (const entity of completed) {
      this.entities.delete(entity.id);
    }
  }

  private updateFlows(): void {
    for (const flow of this.flows.values()) {
      if (flow.status === 'pending' && Math.random() > 0.6) {
        flow.status = 'active';
      } else if (flow.status === 'active' && Math.random() > 0.7) {
        flow.status = 'complete';
      } else if (flow.status === 'active') {
        flow.timestamp = Date.now();
      }
    }

    const completed = Array.from(this.flows.values())
      .filter(f => f.status === 'complete');

    for (const flow of completed) {
      this.flows.delete(flow.id);
    }
  }

  private maybeCreateNewFlow(): void {
    if (Math.random() > 0.4) return;
    if (this.entities.size < 2) return;

    const source = randomFromArray(Array.from(this.entities.values()));
    let target = randomFromArray(Array.from(this.entities.values()));
    while (target.id === source.id && this.entities.size > 1) {
      target = randomFromArray(Array.from(this.entities.values()));
    }

    const flow: Flow = {
      id: `flow-${++this.nextFlowIndex}`,
      sourceId: source.id,
      targetId: target.id,
      type: randomFromArray(['message', 'resource', 'contract', 'signal'] as FlowType[]),
      status: 'pending',
      timestamp: Date.now(),
    };

    this.flows.set(flow.id, flow);
    this.emit('flow_created', flow);
  }

  private broadcastState(): void {
    this.emit('metrics_update', { ...this.metrics });

    const activeEntities = Array.from(this.entities.values());
    if (activeEntities.length > 0) {
      this.emit('entities_update', activeEntities);
    }

    const activeFlows = Array.from(this.flows.values());
    if (activeFlows.length > 0) {
      this.emit('flows_update', activeFlows);
    }
  }

  getState(): { entities: Entity[]; flows: Flow[]; metrics: SystemMetrics } {
    return {
      entities: Array.from(this.entities.values()),
      flows: Array.from(this.flows.values()),
      metrics: { ...this.metrics },
    };
  }

  createSeed(type: string, payload: Record<string, unknown>): { id: string; type: string; status: string; timestamp: number } {
    return {
      id: `seed-${randomId()}`,
      type,
      status: 'growing',
      timestamp: Date.now(),
    };
  }
}
