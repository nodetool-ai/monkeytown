import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs/promises';
import { AgentRegistry } from '../src/core/agent-registry.js';

const TEST_DIR = '/tmp/agent-framework-test-agents';

describe('AgentRegistry', () => {
  let registry: AgentRegistry;

  beforeEach(async () => {
    await fs.mkdir(TEST_DIR, { recursive: true });
    registry = new AgentRegistry({
      maxAgents: 5,
      metadataPath: TEST_DIR
    });
    await registry.load();
  });

  afterEach(async () => {
    await fs.rm(TEST_DIR, { recursive: true, force: true });
  });

  describe('register', () => {
    it('should register a new agent', async () => {
      const agent = await registry.register({
        id: 'test-agent',
        name: 'TestAgent',
        role: 'builder',
        description: 'A test agent',
        skills: ['typescript', 'react']
      });

      expect(agent.id).toBe('test-agent');
      expect(agent.name).toBe('TestAgent');
      expect(agent.role).toBe('builder');
      expect(agent.status).toBe('active');
      expect(agent.skills).toContain('typescript');
    });

    it('should throw when max agents reached', async () => {
      for (let i = 0; i < 5; i++) {
        await registry.register({
          id: `agent-${i}`,
          name: `Agent${i}`,
          role: 'builder',
          description: 'An agent'
        });
      }

      await expect(registry.register({
        id: 'agent-6',
        name: 'Agent6',
        role: 'builder',
        description: 'Too many'
      })).rejects.toThrow('Maximum agents');
    });

    it('should throw for duplicate ID', async () => {
      await registry.register({
        id: 'duplicate',
        name: 'First',
        role: 'builder',
        description: 'First agent'
      });

      await expect(registry.register({
        id: 'duplicate',
        name: 'Second',
        role: 'builder',
        description: 'Duplicate ID'
      })).rejects.toThrow('already exists');
    });
  });

  describe('get', () => {
    it('should retrieve an agent by ID', async () => {
      await registry.register({
        id: 'get-test',
        name: 'GetTest',
        role: 'architect',
        description: 'Testing get'
      });

      const agent = registry.get('get-test');
      expect(agent).not.toBeUndefined();
      expect(agent?.name).toBe('GetTest');
    });

    it('should return undefined for non-existent agent', () => {
      const agent = registry.get('non-existent');
      expect(agent).toBeUndefined();
    });
  });

  describe('filter', () => {
    beforeEach(async () => {
      await registry.register({
        id: 'builder-1',
        name: 'Builder1',
        role: 'builder',
        description: 'Builder',
        skills: ['frontend']
      });
      await registry.register({
        id: 'builder-2',
        name: 'Builder2',
        role: 'builder',
        description: 'Builder',
        skills: ['backend']
      });
      await registry.register({
        id: 'architect-1',
        name: 'Architect1',
        role: 'architect',
        description: 'Architect',
        skills: ['design']
      });
    });

    it('should filter by role', () => {
      const builders = registry.filter({ role: 'builder' });
      expect(builders).toHaveLength(2);
    });

    it('should filter by skill', () => {
      const frontend = registry.filter({ skill: 'frontend' });
      expect(frontend).toHaveLength(1);
      expect(frontend[0].id).toBe('builder-1');
    });

    it('should filter by available', () => {
      const available = registry.filter({ available: true });
      expect(available).toHaveLength(3);
    });
  });

  describe('assignTask', () => {
    it('should assign a task to an agent', async () => {
      await registry.register({
        id: 'task-agent',
        name: 'TaskAgent',
        role: 'builder',
        description: 'Takes tasks',
        maxConcurrentTasks: 2
      });

      const result = await registry.assignTask('task-agent', 'task-1');
      expect(result).toBe(true);

      const agent = registry.get('task-agent');
      expect(agent?.assignedTasks).toContain('task-1');
    });

    it('should reject when agent is at max capacity', async () => {
      await registry.register({
        id: 'busy-agent',
        name: 'BusyAgent',
        role: 'builder',
        description: 'Busy',
        maxConcurrentTasks: 1
      });

      await registry.assignTask('busy-agent', 'task-1');
      const result = await registry.assignTask('busy-agent', 'task-2');
      
      expect(result).toBe(false);
    });
  });

  describe('findBestForTask', () => {
    beforeEach(async () => {
      await registry.register({
        id: 'frontend-dev',
        name: 'FrontendDev',
        role: 'builder',
        description: 'Frontend',
        skills: ['react', 'typescript', 'css']
      });
      await registry.register({
        id: 'backend-dev',
        name: 'BackendDev',
        role: 'builder',
        description: 'Backend',
        skills: ['node', 'typescript', 'postgres']
      });
    });

    it('should find agent with matching skills', () => {
      const best = registry.findBestForTask(['react', 'css']);
      expect(best?.id).toBe('frontend-dev');
    });

    it('should return first available if no skill match', () => {
      const best = registry.findBestForTask(['python']);
      expect(best).not.toBeNull();
    });
  });

  describe('getStats', () => {
    it('should return correct statistics', async () => {
      await registry.register({
        id: 'active-agent',
        name: 'Active',
        role: 'builder',
        description: 'Active'
      });
      await registry.register({
        id: 'blocked-agent',
        name: 'Blocked',
        role: 'builder',
        description: 'Blocked'
      });
      await registry.updateStatus('blocked-agent', 'blocked');

      const stats = registry.getStats();

      expect(stats.total).toBe(2);
      expect(stats.byStatus.active).toBe(1);
      expect(stats.byStatus.blocked).toBe(1);
      expect(stats.blocked).toBe(1);
    });
  });

  describe('persistence', () => {
    it('should persist and reload agents', async () => {
      await registry.register({
        id: 'persist-test',
        name: 'PersistTest',
        role: 'builder',
        description: 'Testing persistence'
      });

      // Create new registry and load
      const newRegistry = new AgentRegistry({
        maxAgents: 5,
        metadataPath: TEST_DIR
      });
      await newRegistry.load();

      const agent = newRegistry.get('persist-test');
      expect(agent).not.toBeUndefined();
      expect(agent?.name).toBe('PersistTest');
    });
  });
});
