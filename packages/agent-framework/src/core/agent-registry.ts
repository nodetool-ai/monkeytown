import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as yaml from 'yaml';
import type { 
  Agent, 
  AgentFilter, 
  RegisterAgentInput, 
  AgentRegistryConfig,
  AgentStatus 
} from '../types/agent.js';

/**
 * AgentRegistry manages agent registration and queries
 */
export class AgentRegistry {
  private config: AgentRegistryConfig;
  private agents: Map<string, Agent> = new Map();
  private registryFile: string;

  constructor(config: AgentRegistryConfig) {
    this.config = config;
    this.registryFile = path.join(config.metadataPath, 'agent-registry.yaml');
  }

  /**
   * Load agents from the registry file
   */
  async load(): Promise<void> {
    try {
      const content = await fs.readFile(this.registryFile, 'utf-8');
      const data = yaml.parse(content) as { agents: Agent[] };
      
      this.agents.clear();
      for (const agent of data.agents ?? []) {
        this.agents.set(agent.id, agent);
      }
    } catch {
      // File doesn't exist yet, start with empty registry
      this.agents.clear();
    }
  }

  /**
   * Save agents to the registry file
   */
  async save(): Promise<void> {
    const data = {
      version: '1.0',
      updated: new Date().toISOString(),
      agents: Array.from(this.agents.values())
    };
    
    const content = yaml.stringify(data);
    await fs.mkdir(path.dirname(this.registryFile), { recursive: true });
    await fs.writeFile(this.registryFile, content, 'utf-8');
  }

  /**
   * Get all registered agents
   */
  getAll(): Agent[] {
    return Array.from(this.agents.values());
  }

  /**
   * Get an agent by ID
   */
  get(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  /**
   * Register a new agent
   */
  async register(input: RegisterAgentInput): Promise<Agent> {
    if (this.agents.size >= this.config.maxAgents) {
      throw new Error(`Maximum agents (${this.config.maxAgents}) reached. Cannot register new agent.`);
    }

    if (this.agents.has(input.id)) {
      throw new Error(`Agent with ID '${input.id}' already exists.`);
    }

    const agent: Agent = {
      id: input.id,
      name: input.name,
      role: input.role,
      description: input.description,
      status: 'active',
      schedule: input.schedule,
      domains: input.domains ?? [],
      skills: input.skills ?? [],
      outputFolders: input.outputFolders ?? [],
      maxConcurrentTasks: input.maxConcurrentTasks ?? 1,
      assignedTasks: [],
      workflowFile: `${input.id}.yml`
    };

    this.agents.set(agent.id, agent);
    await this.save();
    
    return agent;
  }

  /**
   * Unregister an agent
   */
  async unregister(id: string): Promise<boolean> {
    const deleted = this.agents.delete(id);
    if (deleted) {
      await this.save();
    }
    return deleted;
  }

  /**
   * Update agent status
   */
  async updateStatus(id: string, status: AgentStatus): Promise<Agent | null> {
    const agent = this.agents.get(id);
    if (!agent) {
      return null;
    }

    agent.status = status;
    agent.lastRun = status === 'running' ? new Date().toISOString() : agent.lastRun;
    await this.save();
    
    return agent;
  }

  /**
   * Assign a task to an agent
   */
  async assignTask(agentId: string, taskId: string): Promise<boolean> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      return false;
    }

    if (agent.assignedTasks.length >= agent.maxConcurrentTasks) {
      return false;
    }

    if (!agent.assignedTasks.includes(taskId)) {
      agent.assignedTasks.push(taskId);
      await this.save();
    }

    return true;
  }

  /**
   * Remove a task from an agent
   */
  async removeTask(agentId: string, taskId: string): Promise<boolean> {
    const agent = this.agents.get(agentId);
    if (!agent) {
      return false;
    }

    const index = agent.assignedTasks.indexOf(taskId);
    if (index === -1) {
      return false;
    }

    agent.assignedTasks.splice(index, 1);
    await this.save();
    
    return true;
  }

  /**
   * Filter agents based on criteria
   */
  filter(filter: AgentFilter): Agent[] {
    let agents = Array.from(this.agents.values());

    if (filter.role) {
      const roles = Array.isArray(filter.role) ? filter.role : [filter.role];
      agents = agents.filter(a => roles.includes(a.role));
    }

    if (filter.status) {
      const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
      agents = agents.filter(a => statuses.includes(a.status));
    }

    if (filter.skill) {
      agents = agents.filter(a => a.skills.includes(filter.skill!));
    }

    if (filter.available) {
      agents = agents.filter(a => 
        a.status === 'active' && 
        a.assignedTasks.length < a.maxConcurrentTasks
      );
    }

    return agents;
  }

  /**
   * Get available agents that can take new tasks
   */
  getAvailable(): Agent[] {
    return this.filter({ available: true });
  }

  /**
   * Get blocked agents
   */
  getBlocked(): Agent[] {
    return this.filter({ status: 'blocked' });
  }

  /**
   * Find the best agent for a task based on skills
   */
  findBestForTask(requiredSkills: string[]): Agent | null {
    const available = this.getAvailable();
    
    if (available.length === 0) {
      return null;
    }

    // Score agents by matching skills
    const scored = available.map(agent => {
      const matchingSkills = requiredSkills.filter(skill => 
        agent.skills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
      );
      return { agent, score: matchingSkills.length };
    });

    scored.sort((a, b) => b.score - a.score);
    
    return scored[0]?.score > 0 ? scored[0].agent : available[0];
  }

  /**
   * Get agent statistics
   */
  getStats(): {
    total: number;
    byStatus: Record<AgentStatus, number>;
    available: number;
    blocked: number;
    overloaded: number;
  } {
    const agents = this.getAll();
    
    const byStatus: Record<AgentStatus, number> = {
      active: 0,
      inactive: 0,
      blocked: 0,
      running: 0
    };

    let overloaded = 0;

    for (const agent of agents) {
      byStatus[agent.status]++;
      if (agent.assignedTasks.length >= agent.maxConcurrentTasks) {
        overloaded++;
      }
    }

    return {
      total: agents.length,
      byStatus,
      available: this.getAvailable().length,
      blocked: byStatus.blocked,
      overloaded
    };
  }
}
