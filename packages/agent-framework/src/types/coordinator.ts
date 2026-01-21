/**
 * Coordinator configuration
 */
export interface CoordinatorConfig {
  /** Repository owner */
  owner: string;
  /** Repository name */
  repo: string;
  /** Base branch (usually 'main') */
  baseBranch: string;
  /** Metadata branch for agent data */
  metadataBranch: string;
  /** Path to metadata directory */
  metadataPath: string;
  /** Auto-merge configuration */
  autoMerge: import('./pullrequest.js').AutoMergeConfig;
  /** Maximum agents */
  maxAgents: number;
  /** Coordinator run interval (cron format) */
  schedule?: string;
}

/**
 * Coordinator state snapshot
 */
export interface CoordinatorState {
  /** Timestamp of state snapshot */
  timestamp: string;
  /** Total registered agents */
  totalAgents: number;
  /** Active agents (running or available) */
  activeAgents: number;
  /** Blocked agents */
  blockedAgents: number;
  /** Total tasks */
  totalTasks: number;
  /** Open tasks */
  openTasks: number;
  /** In-progress tasks */
  inProgressTasks: number;
  /** Blocked tasks */
  blockedTasks: number;
  /** Completed tasks (last 7 days) */
  completedTasks: number;
  /** Open PRs */
  openPRs: number;
  /** PRs pending CI */
  pendingCIPRs: number;
  /** PRs ready to merge */
  readyToMergePRs: number;
  /** Active signals */
  activeSignals: number;
  /** Critical signals */
  criticalSignals: number;
  /** System health status */
  health: 'healthy' | 'degraded' | 'critical';
  /** Blocking issues */
  blockers: string[];
}

/**
 * Coordination action types
 */
export type CoordinationAction = 
  | 'assign_task'
  | 'unblock_agent'
  | 'merge_pr'
  | 'create_signal'
  | 'resolve_signal'
  | 'escalate'
  | 'schedule_task';

/**
 * Coordination decision
 */
export interface CoordinationDecision {
  /** Action to take */
  action: CoordinationAction;
  /** Target (agent ID, task ID, or PR number) */
  target: string;
  /** Reasoning for the decision */
  reason: string;
  /** Priority of the action */
  priority: 'immediate' | 'normal' | 'deferred';
  /** Related context */
  context?: Record<string, unknown>;
}

/**
 * Coordination run result
 */
export interface CoordinationRunResult {
  /** Run timestamp */
  timestamp: string;
  /** Duration in milliseconds */
  duration: number;
  /** Decisions made */
  decisions: CoordinationDecision[];
  /** Actions executed */
  actionsExecuted: number;
  /** Actions failed */
  actionsFailed: number;
  /** PRs merged */
  prsMerged: number;
  /** Tasks assigned */
  tasksAssigned: number;
  /** Signals created */
  signalsCreated: number;
  /** Errors encountered */
  errors: string[];
  /** State after run */
  state: CoordinatorState;
}

/**
 * Health check result
 */
export interface HealthCheckResult {
  /** Overall health status */
  status: 'healthy' | 'degraded' | 'critical';
  /** Individual component health */
  components: {
    name: string;
    status: 'healthy' | 'degraded' | 'critical';
    message?: string;
  }[];
  /** Timestamp */
  timestamp: string;
  /** Action recommendations */
  recommendations: string[];
}
