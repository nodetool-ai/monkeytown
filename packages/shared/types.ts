export type EntityType = 'agent' | 'contract' | 'transaction' | 'flow';

export type EntityStatus = 'idle' | 'active' | 'processing' | 'complete' | 'error';

export type FlowStatus = 'pending' | 'active' | 'complete' | 'error';

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

export interface Flow {
  id: string;
  sourceId: string;
  targetId: string;
  type: FlowType;
  status: FlowStatus;
  timestamp: number;
}

export interface FlowPosition {
  x: number;
  y: number;
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

export interface Seed {
  id: string;
  type: SeedType;
  status: 'pending' | 'growing' | 'complete' | 'error';
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

export interface DetailTab {
  id: string;
  label: string;
  icon?: string;
}

export interface LogEntry {
  id: string;
  timestamp: number;
  level: 'info' | 'warn' | 'error';
  message: string;
}

export interface ConnectionInfo {
  id: string;
  label: string;
  type: string;
  status: EntityStatus;
}

export interface EntityHistory {
  id: string;
  timestamp: number;
  action: string;
  details: string;
}

export interface DetailPanelProps {
  entity: Entity;
  tabs?: DetailTab[];
  logs?: LogEntry[];
  connections?: ConnectionInfo[];
  history?: EntityHistory[];
  onClose: () => void;
}

export interface ErrorCardProps {
  error: {
    message: string;
    code?: string;
    context?: string;
  };
  onRetry?: () => void;
  onIgnore?: () => void;
  onInspect?: () => void;
  suggestion?: string;
}

export interface ErrorEvent {
  id: string;
  timestamp: number;
  entityId: string;
  error: ErrorCardProps['error'];
}
