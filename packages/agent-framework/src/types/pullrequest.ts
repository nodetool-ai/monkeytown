/**
 * PR status
 */
export type PRStatus = 'open' | 'merged' | 'closed';

/**
 * CI check status
 */
export type CIStatus = 'pending' | 'running' | 'success' | 'failure' | 'cancelled';

/**
 * Pull request information
 */
export interface PullRequest {
  /** PR number */
  number: number;
  /** PR title */
  title: string;
  /** PR description body */
  body: string;
  /** Head branch (source) */
  headBranch: string;
  /** Base branch (target, usually main) */
  baseBranch: string;
  /** Current status */
  status: PRStatus;
  /** CI check status */
  ciStatus: CIStatus;
  /** Creating agent */
  createdBy?: string;
  /** Creation timestamp */
  createdAt: string;
  /** Last update timestamp */
  updatedAt: string;
  /** Associated task ID */
  taskId?: string;
  /** Whether auto-merge is enabled */
  autoMergeEnabled: boolean;
  /** Mergeable state */
  mergeable: boolean;
  /** Labels */
  labels: string[];
}

/**
 * PR creation input
 */
export interface CreatePRInput {
  title: string;
  body: string;
  headBranch: string;
  baseBranch?: string;
  taskId?: string;
  labels?: string[];
  autoMerge?: boolean;
}

/**
 * PR filter options
 */
export interface PRFilter {
  status?: PRStatus | PRStatus[];
  ciStatus?: CIStatus | CIStatus[];
  taskId?: string;
  autoMergeEnabled?: boolean;
  mergeable?: boolean;
}

/**
 * CI check result
 */
export interface CICheck {
  /** Check name */
  name: string;
  /** Check status */
  status: CIStatus;
  /** Conclusion if completed */
  conclusion?: 'success' | 'failure' | 'neutral' | 'cancelled' | 'skipped' | 'timed_out';
  /** Check URL */
  url?: string;
  /** Started at timestamp */
  startedAt?: string;
  /** Completed at timestamp */
  completedAt?: string;
}

/**
 * Merge result
 */
export interface MergeResult {
  /** Whether merge was successful */
  success: boolean;
  /** Merge commit SHA if successful */
  sha?: string;
  /** Error message if failed */
  error?: string;
  /** PR that was merged */
  pullRequest: PullRequest;
}

/**
 * Auto-merge configuration
 */
export interface AutoMergeConfig {
  /** Enable auto-merge globally */
  enabled: boolean;
  /** Required CI checks to pass */
  requiredChecks: string[];
  /** Delete branch after merge */
  deleteBranchAfterMerge: boolean;
  /** Merge method */
  mergeMethod: 'merge' | 'squash' | 'rebase';
  /** Labels that prevent auto-merge */
  blockedLabels: string[];
  /** Labels that enable auto-merge */
  autoMergeLabels: string[];
}
