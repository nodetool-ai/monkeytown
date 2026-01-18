export type EntityType = 'agent' | 'contract' | 'transaction' | 'flow';

export type EntityStatus = 'idle' | 'active' | 'processing' | 'complete' | 'error';

export type FlowStatus = 'pending' | 'active' | 'complete' | 'error';

export type FlowType = 'message' | 'resource' | 'contract' | 'signal';

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
  type: FlowType;
  status: FlowStatus;
  timestamp: number;
}

export interface SystemMetrics {
  activeAgents: number;
  pendingFlows: number;
  contractsSettled: number;
  systemLoad: number;
}

export interface StreamMessage {
  type: string;
  entity?: unknown;
  flow?: unknown;
  metrics?: SystemMetrics;
  event?: unknown;
  seed?: unknown;
  timestamp: number;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  level: 'info' | 'warn' | 'error';
  message: string;
}

export interface GhostItem {
  id: string;
  label: string;
  action: string;
  timestamp: number;
  opacity: number;
}
