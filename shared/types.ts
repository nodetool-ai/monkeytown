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

export type FlowType = 'message' | 'resource' | 'contract' | 'signal';

export type FlowStatus = EntityStatus;

export interface FlowPosition {
  x: number;
  y: number;
}

export interface Flow {
  id: string;
  sourceId: string;
  targetId: string;
  type: FlowType;
  status: FlowStatus;
  timestamp: number;
}

export interface FlowStreamProps {
  flow: Flow;
  sourcePos: FlowPosition;
  targetPos: FlowPosition;
  onComplete?: (flowId: string) => void;
  onError?: (flowId: string) => void;
}

export interface SystemMetrics {
  activeAgents: number;
  pendingFlows: number;
  contractsSettled: number;
  systemLoad: number;
}

export type SeedType = 'contract' | 'constraint' | 'resource' | 'query';

export type SeedStatus = 'pending' | 'growing' | 'complete' | 'error';

export interface Seed {
  id: string;
  type: SeedType;
  status: SeedStatus;
  timestamp: number;
}

export interface SeedIntent {
  type: SeedType;
  payload: Record<string, unknown>;
}

export interface ActionSeedProps {
  onPlant: (intent: SeedIntent) => void;
  isGrowing?: boolean;
  pendingCount?: number;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  level: 'error' | 'warn' | 'info';
  message: string;
}

export interface ConnectionInfo {
  id: string;
  label: string;
  type: 'agent' | 'contract';
  status: EntityStatus;
}

export interface EntityHistory {
  id: string;
  timestamp: number;
  action: string;
  details: string;
}

export interface DetailTab {
  id: string;
  label: string;
  icon: string;
}

export interface DetailPanelProps {
  entity: Entity;
  tabs?: DetailTab[];
  logs?: LogEntry[];
  connections?: ConnectionInfo[];
  history?: EntityHistory[];
  onClose: () => void;
}

export interface ErrorPayload {
  message: string;
  context?: string;
  code?: string;
}

export interface ErrorCardProps {
  error: ErrorPayload;
  onRetry?: () => void;
  onIgnore?: () => void;
  onInspect?: () => void;
  suggestion?: string;
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
