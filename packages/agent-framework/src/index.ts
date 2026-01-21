// Types
export * from './types/index.js';

// Core
export { TaskManager } from './core/task-manager.js';
export { AgentRegistry } from './core/agent-registry.js';
export { SignalManager } from './core/signal-manager.js';

// GitHub Integration
export { PRManager } from './github/pr-manager.js';
export { WorkflowManager } from './github/workflow-manager.js';

// Coordinator
export { Coordinator } from './coordinator/coordinator.js';

// Helper to create a coordinator with default configuration
import type { CoordinatorConfig } from './types/coordinator.js';
import type { AutoMergeConfig } from './types/pullrequest.js';
import { Coordinator } from './coordinator/coordinator.js';

/**
 * Default auto-merge configuration
 */
export const defaultAutoMergeConfig: AutoMergeConfig = {
  enabled: true,
  requiredChecks: ['Lint & Type Check', 'Run Tests'],
  deleteBranchAfterMerge: true,
  mergeMethod: 'squash',
  blockedLabels: ['do-not-merge', 'wip', 'blocked'],
  autoMergeLabels: ['auto-merge', 'ready-to-merge']
};

/**
 * Create a coordinator with common defaults
 */
export function createCoordinator(
  options: {
    owner: string;
    repo: string;
    githubToken: string;
    metadataPath?: string;
    metadataBranch?: string;
    baseBranch?: string;
    maxAgents?: number;
    autoMerge?: Partial<AutoMergeConfig>;
  }
): Coordinator {
  const config: CoordinatorConfig = {
    owner: options.owner,
    repo: options.repo,
    baseBranch: options.baseBranch ?? 'main',
    metadataBranch: options.metadataBranch ?? 'agent-metadata',
    metadataPath: options.metadataPath ?? '.agents',
    maxAgents: options.maxAgents ?? 12,
    autoMerge: {
      ...defaultAutoMergeConfig,
      ...options.autoMerge
    }
  };

  return new Coordinator(config, options.githubToken);
}

/**
 * Version information
 */
export const VERSION = '1.0.0';
