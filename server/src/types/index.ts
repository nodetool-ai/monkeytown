export * from './economics';

export interface SystemMetrics {
  activeAgents: number;
  pendingFlows: number;
  contractsSettled: number;
  systemLoad: number;
}

export interface EntityUpdate {
  type: 'entity_update';
  entity: unknown;
  timestamp: number;
}

export interface FlowUpdate {
  type: 'flow_update';
  flow: unknown;
  timestamp: number;
}

export interface SeedUpdate {
  type: 'seed_update';
  seed: unknown;
  timestamp: number;
}

export interface BananaEventNotification {
  type: 'banana_event';
  event: unknown;
  timestamp: number;
}

export interface HealthUpdate {
  type: 'system_health';
  metrics: SystemMetrics;
  timestamp: number;
}

export type StreamMessage = EntityUpdate | FlowUpdate | SeedUpdate | BananaEventNotification | HealthUpdate;
