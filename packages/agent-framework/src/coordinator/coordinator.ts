import { Octokit } from '@octokit/rest';
import { TaskManager } from '../core/task-manager.js';
import { AgentRegistry } from '../core/agent-registry.js';
import { SignalManager } from '../core/signal-manager.js';
import { PRManager } from '../github/pr-manager.js';
import { WorkflowManager } from '../github/workflow-manager.js';
import type {
  CoordinatorConfig,
  CoordinatorState,
  CoordinationDecision,
  CoordinationRunResult,
  HealthCheckResult
} from '../types/coordinator.js';
import type { Task } from '../types/task.js';
import type { Agent } from '../types/agent.js';
import type { MergeResult } from '../types/pullrequest.js';

/**
 * Coordinator manages the multi-agent system:
 * - Schedules tasks to agents
 * - Monitors PR status and CI
 * - Auto-merges PRs when ready
 * - Creates signals for blockers
 * - Maintains system health
 */
export class Coordinator {
  private config: CoordinatorConfig;
  private octokit: Octokit;
  private taskManager: TaskManager;
  private agentRegistry: AgentRegistry;
  private signalManager: SignalManager;
  private prManager: PRManager;
  private workflowManager: WorkflowManager;

  constructor(config: CoordinatorConfig, githubToken: string) {
    this.config = config;
    this.octokit = new Octokit({ auth: githubToken });
    
    this.taskManager = new TaskManager(
      `${config.metadataPath}/tasks`
    );
    
    this.agentRegistry = new AgentRegistry({
      maxAgents: config.maxAgents,
      metadataPath: config.metadataPath
    });
    
    this.signalManager = new SignalManager(
      `${config.metadataPath}/signals`
    );
    
    this.prManager = new PRManager(
      this.octokit,
      config.owner,
      config.repo,
      config.autoMerge
    );
    
    this.workflowManager = new WorkflowManager(
      this.octokit,
      config.owner,
      config.repo
    );
  }

  /**
   * Initialize the coordinator
   */
  async initialize(): Promise<void> {
    await this.agentRegistry.load();
  }

  /**
   * Get current system state
   */
  async getState(): Promise<CoordinatorState> {
    const taskStats = await this.taskManager.getStats();
    const agentStats = this.agentRegistry.getStats();
    const signalStats = await this.signalManager.getStats();
    const prStats = await this.prManager.getStats();
    const criticalSignals = await this.signalManager.getCritical();

    const blockers: string[] = [];
    
    // Check for critical issues
    if (signalStats.critical > 0) {
      blockers.push(`${signalStats.critical} critical signals`);
    }
    if (taskStats.byStatus.blocked > 0) {
      blockers.push(`${taskStats.byStatus.blocked} blocked tasks`);
    }
    if (agentStats.blocked > 0) {
      blockers.push(`${agentStats.blocked} blocked agents`);
    }
    if (prStats.failing > 0) {
      blockers.push(`${prStats.failing} failing PRs`);
    }

    // Determine health
    let health: 'healthy' | 'degraded' | 'critical' = 'healthy';
    if (criticalSignals.length > 0 || taskStats.byPriority.critical > 0) {
      health = 'critical';
    } else if (blockers.length > 0) {
      health = 'degraded';
    }

    return {
      timestamp: new Date().toISOString(),
      totalAgents: agentStats.total,
      activeAgents: agentStats.byStatus.active + agentStats.byStatus.running,
      blockedAgents: agentStats.blocked,
      totalTasks: taskStats.total,
      openTasks: taskStats.byStatus.open,
      inProgressTasks: taskStats.byStatus.in_progress,
      blockedTasks: taskStats.blocked,
      completedTasks: taskStats.byStatus.completed,
      openPRs: prStats.open,
      pendingCIPRs: prStats.pendingCI,
      readyToMergePRs: prStats.readyToMerge,
      activeSignals: signalStats.active,
      criticalSignals: signalStats.critical,
      health,
      blockers
    };
  }

  /**
   * Make coordination decisions based on current state
   */
  async makeDecisions(): Promise<CoordinationDecision[]> {
    const decisions: CoordinationDecision[] = [];
    
    // 1. Check for PRs ready to merge
    const readyPRs = await this.prManager.getReadyToMerge();
    for (const pr of readyPRs) {
      decisions.push({
        action: 'merge_pr',
        target: String(pr.number),
        reason: 'PR passed all CI checks and is ready to merge',
        priority: 'immediate'
      });
    }

    // 2. Check for unassigned ready tasks
    const readyTasks = await this.taskManager.getReady();
    const availableAgents = this.agentRegistry.getAvailable();
    
    for (const task of readyTasks) {
      if (!task.assignee) {
        const agent = this.findBestAgentForTask(task, availableAgents);
        if (agent) {
          decisions.push({
            action: 'assign_task',
            target: task.id,
            reason: `Assigning to ${agent.name} based on skills match`,
            priority: task.priority === 'critical' ? 'immediate' : 'normal',
            context: { agentId: agent.id }
          });
        }
      }
    }

    // 3. Check for blocked agents that need unblocking
    const blockedAgents = this.agentRegistry.getBlocked();
    for (const agent of blockedAgents) {
      const signals = await this.signalManager.getForAgent(agent.id);
      if (signals.length === 0) {
        decisions.push({
          action: 'unblock_agent',
          target: agent.id,
          reason: 'No active blocking signals',
          priority: 'normal'
        });
      }
    }

    // 4. Check for critical signals needing escalation
    const criticalSignals = await this.signalManager.getCritical();
    for (const signal of criticalSignals) {
      // Check if signal is older than 1 hour without resolution
      const signalAge = Date.now() - new Date(signal.created).getTime();
      if (signalAge > 60 * 60 * 1000) { // 1 hour
        decisions.push({
          action: 'escalate',
          target: signal.title,
          reason: 'Critical signal unresolved for over 1 hour',
          priority: 'immediate',
          context: { signalType: signal.type, to: signal.to }
        });
      }
    }

    return decisions;
  }

  /**
   * Find the best agent for a task
   */
  private findBestAgentForTask(task: Task, availableAgents: Agent[]): Agent | null {
    if (availableAgents.length === 0) {
      return null;
    }

    // Use labels as skills to match
    const requiredSkills = task.labels.filter(l => 
      !['bug', 'feature', 'refactor', 'security', 'documentation', 'test'].includes(l)
    );

    if (requiredSkills.length > 0) {
      const match = this.agentRegistry.findBestForTask(requiredSkills);
      if (match) {
        return match;
      }
    }

    // Default to first available
    return availableAgents[0];
  }

  /**
   * Execute coordination decisions
   */
  async executeDecisions(decisions: CoordinationDecision[]): Promise<{
    executed: number;
    failed: number;
    results: { decision: CoordinationDecision; success: boolean; error?: string }[];
  }> {
    const results: { decision: CoordinationDecision; success: boolean; error?: string }[] = [];
    let executed = 0;
    let failed = 0;

    for (const decision of decisions) {
      try {
        switch (decision.action) {
          case 'merge_pr': {
            const prNumber = parseInt(decision.target);
            const result = await this.prManager.merge(prNumber);
            if (result.success) {
              executed++;
              results.push({ decision, success: true });
            } else {
              failed++;
              results.push({ decision, success: false, error: result.error });
            }
            break;
          }

          case 'assign_task': {
            const agentId = decision.context?.agentId as string;
            if (agentId) {
              await this.taskManager.start(decision.target, agentId);
              await this.agentRegistry.assignTask(agentId, decision.target);
              executed++;
              results.push({ decision, success: true });
            }
            break;
          }

          case 'unblock_agent': {
            await this.agentRegistry.updateStatus(decision.target, 'active');
            executed++;
            results.push({ decision, success: true });
            break;
          }

          case 'create_signal': {
            // Signal creation is handled separately
            executed++;
            results.push({ decision, success: true });
            break;
          }

          case 'escalate': {
            // Create escalation signal
            await this.signalManager.createUrgent(
              'Coordinator',
              'Human',
              `Escalation: ${decision.target}`,
              decision.reason,
              'Please review and take action'
            );
            executed++;
            results.push({ decision, success: true });
            break;
          }

          default:
            results.push({ decision, success: false, error: 'Unknown action' });
            failed++;
        }
      } catch (error) {
        failed++;
        results.push({
          decision,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return { executed, failed, results };
  }

  /**
   * Run a full coordination cycle
   */
  async run(): Promise<CoordinationRunResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    
    await this.initialize();
    
    // Make decisions
    const decisions = await this.makeDecisions();
    
    // Execute decisions
    const { executed, failed, results } = await this.executeDecisions(decisions);
    
    // Collect errors
    for (const result of results) {
      if (!result.success && result.error) {
        errors.push(`${result.decision.action}: ${result.error}`);
      }
    }

    // Count specific actions
    const prsMerged = results.filter(r => 
      r.success && r.decision.action === 'merge_pr'
    ).length;
    
    const tasksAssigned = results.filter(r => 
      r.success && r.decision.action === 'assign_task'
    ).length;
    
    const signalsCreated = results.filter(r => 
      r.success && (r.decision.action === 'create_signal' || r.decision.action === 'escalate')
    ).length;

    // Get final state
    const state = await this.getState();

    return {
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime,
      decisions,
      actionsExecuted: executed,
      actionsFailed: failed,
      prsMerged,
      tasksAssigned,
      signalsCreated,
      errors,
      state
    };
  }

  /**
   * Auto-merge all ready PRs
   */
  async autoMerge(): Promise<MergeResult[]> {
    return this.prManager.autoMergeReady();
  }

  /**
   * Perform health check
   */
  async healthCheck(): Promise<HealthCheckResult> {
    const components: HealthCheckResult['components'] = [];
    const recommendations: string[] = [];

    // Check task health
    const taskStats = await this.taskManager.getStats();
    if (taskStats.byPriority.critical > 0) {
      components.push({
        name: 'Tasks',
        status: 'critical',
        message: `${taskStats.byPriority.critical} critical tasks pending`
      });
      recommendations.push('Address critical tasks immediately');
    } else if (taskStats.blocked > 0) {
      components.push({
        name: 'Tasks',
        status: 'degraded',
        message: `${taskStats.blocked} blocked tasks`
      });
      recommendations.push('Investigate and unblock blocked tasks');
    } else {
      components.push({ name: 'Tasks', status: 'healthy' });
    }

    // Check agent health
    const agentStats = this.agentRegistry.getStats();
    if (agentStats.blocked > 0) {
      components.push({
        name: 'Agents',
        status: 'degraded',
        message: `${agentStats.blocked} blocked agents`
      });
      recommendations.push('Unblock blocked agents');
    } else if (agentStats.overloaded > 0) {
      components.push({
        name: 'Agents',
        status: 'degraded',
        message: `${agentStats.overloaded} overloaded agents`
      });
    } else {
      components.push({ name: 'Agents', status: 'healthy' });
    }

    // Check signal health
    const signalStats = await this.signalManager.getStats();
    if (signalStats.critical > 0) {
      components.push({
        name: 'Signals',
        status: 'critical',
        message: `${signalStats.critical} critical signals active`
      });
      recommendations.push('Resolve critical signals immediately');
    } else if (signalStats.active > 5) {
      components.push({
        name: 'Signals',
        status: 'degraded',
        message: `${signalStats.active} active signals`
      });
    } else {
      components.push({ name: 'Signals', status: 'healthy' });
    }

    // Check PR health
    const prStats = await this.prManager.getStats();
    if (prStats.failing > 0) {
      components.push({
        name: 'PRs',
        status: 'degraded',
        message: `${prStats.failing} failing PRs`
      });
      recommendations.push('Fix failing PR CI checks');
    } else if (prStats.readyToMerge > 0) {
      components.push({
        name: 'PRs',
        status: 'healthy',
        message: `${prStats.readyToMerge} PRs ready to merge`
      });
    } else {
      components.push({ name: 'PRs', status: 'healthy' });
    }

    // Determine overall status
    let status: HealthCheckResult['status'] = 'healthy';
    if (components.some(c => c.status === 'critical')) {
      status = 'critical';
    } else if (components.some(c => c.status === 'degraded')) {
      status = 'degraded';
    }

    return {
      status,
      components,
      timestamp: new Date().toISOString(),
      recommendations
    };
  }

  /**
   * Get task manager instance
   */
  getTasks(): TaskManager {
    return this.taskManager;
  }

  /**
   * Get agent registry instance
   */
  getAgents(): AgentRegistry {
    return this.agentRegistry;
  }

  /**
   * Get signal manager instance
   */
  getSignals(): SignalManager {
    return this.signalManager;
  }

  /**
   * Get PR manager instance
   */
  getPRs(): PRManager {
    return this.prManager;
  }

  /**
   * Get workflow manager instance
   */
  getWorkflows(): WorkflowManager {
    return this.workflowManager;
  }

  /**
   * Get coordinator configuration
   */
  getConfig(): CoordinatorConfig {
    return this.config;
  }
}
