export type EntityType = 'agent' | 'contract' | 'transaction' | 'flow';

export type EntityStatus = 'idle' | 'active' | 'processing' | 'complete' | 'error';

export type StatusColor = 'green' | 'amber' | 'red' | 'purple' | 'cyan';

export const STATUS_CONFIG: Record<EntityStatus, StatusColor> = {
  idle: 'cyan',
  active: 'green',
  processing: 'amber',
  complete: 'green',
  error: 'red',
};

export interface EntityMetrics {
  efficiency: number;
  load: number;
  connections: number;
}

export interface Entity {
  id: string;
  type: EntityType;
  status: EntityStatus;
  label: string;
  metrics: EntityMetrics;
  timestamp: number;
  parentId?: string;
}

export interface Flow {
  id: string;
  sourceId: string;
  targetId: string;
  status: EntityStatus;
  timestamp: number;
}

export interface SystemMetrics {
  activeAgents: number;
  pendingFlows: number;
  contractsSettled: number;
  systemLoad: number;
}

export interface Seed {
  id: string;
  type: 'contract' | 'constraint' | 'resource' | 'query';
  status: 'pending' | 'growing' | 'complete' | 'error';
  timestamp: number;
}
