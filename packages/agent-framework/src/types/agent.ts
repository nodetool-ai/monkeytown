/**
 * Agent role types
 */
export type AgentRole = 
  | 'coordinator'    // Orchestrates other agents
  | 'builder'        // Implements code
  | 'architect'      // Designs systems
  | 'researcher'     // Gathers information
  | 'designer'       // UX/UI design
  | 'security'       // Security analysis
  | 'product'        // Product management
  | 'qa'             // Quality assurance
  | 'custom';        // Custom role

/**
 * Agent status
 */
export type AgentStatus = 'active' | 'inactive' | 'blocked' | 'running';

/**
 * Agent definition
 */
export interface Agent {
  /** Unique agent identifier (matches workflow filename without extension) */
  id: string;
  /** Display name */
  name: string;
  /** Agent role */
  role: AgentRole;
  /** Brief description of responsibilities */
  description: string;
  /** Current status */
  status: AgentStatus;
  /** Cron schedule (GitHub Actions format) */
  schedule?: string;
  /** Domain folders this agent owns */
  domains: string[];
  /** Skills/capabilities */
  skills: string[];
  /** Output directories */
  outputFolders: string[];
  /** Last run timestamp (ISO 8601) */
  lastRun?: string;
  /** Associated workflow file */
  workflowFile?: string;
  /** Maximum concurrent tasks */
  maxConcurrentTasks: number;
  /** Current assigned task IDs */
  assignedTasks: string[];
}

/**
 * Agent registration input
 */
export interface RegisterAgentInput {
  id: string;
  name: string;
  role: AgentRole;
  description: string;
  schedule?: string;
  domains?: string[];
  skills?: string[];
  outputFolders?: string[];
  maxConcurrentTasks?: number;
}

/**
 * Agent filter options
 */
export interface AgentFilter {
  role?: AgentRole | AgentRole[];
  status?: AgentStatus | AgentStatus[];
  skill?: string;
  available?: boolean;
}

/**
 * Agent registry configuration
 */
export interface AgentRegistryConfig {
  /** Maximum total agents allowed */
  maxAgents: number;
  /** Path to agent metadata files */
  metadataPath: string;
}
