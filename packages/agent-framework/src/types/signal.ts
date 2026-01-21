/**
 * Signal types for urgent inter-agent communication
 */
export type SignalType = 'URGENT' | 'BLOCKED' | 'HANDOFF';

/**
 * Signal priority levels
 */
export type SignalPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM';

/**
 * Signal status
 */
export type SignalStatus = 'active' | 'resolved' | 'expired';

/**
 * Signal for inter-agent communication
 */
export interface Signal {
  /** Signal type */
  type: SignalType;
  /** Brief description */
  title: string;
  /** Originating agent */
  from: string;
  /** Target agent or "All" */
  to: string;
  /** Priority level */
  priority: SignalPriority;
  /** Creation timestamp (ISO 8601) */
  created: string;
  /** Issue description */
  issue: string;
  /** Specific action required */
  actionRequired: string;
  /** What this blocks */
  blocks?: string[];
  /** Current status */
  status: SignalStatus;
  /** Resolution notes */
  resolution?: string;
  /** Resolution timestamp */
  resolvedAt?: string;
}

/**
 * Signal file naming convention: {TYPE}-{description}.md
 */
export interface SignalFile {
  /** File path relative to signals directory */
  path: string;
  /** Parsed signal content */
  signal: Signal;
}

/**
 * Signal creation input
 */
export interface CreateSignalInput {
  type: SignalType;
  title: string;
  from: string;
  to: string;
  priority: SignalPriority;
  issue: string;
  actionRequired: string;
  blocks?: string[];
}

/**
 * Signal filter options
 */
export interface SignalFilter {
  type?: SignalType | SignalType[];
  priority?: SignalPriority | SignalPriority[];
  to?: string;
  status?: SignalStatus | SignalStatus[];
}
