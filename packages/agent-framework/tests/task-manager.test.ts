import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { TaskManager } from '../src/core/task-manager.js';

const TEST_DIR = '/tmp/agent-framework-test-tasks';

describe('TaskManager', () => {
  let taskManager: TaskManager;

  beforeEach(async () => {
    await fs.mkdir(TEST_DIR, { recursive: true });
    taskManager = new TaskManager(TEST_DIR);
  });

  afterEach(async () => {
    await fs.rm(TEST_DIR, { recursive: true, force: true });
  });

  describe('create', () => {
    it('should create a task with correct defaults', async () => {
      const task = await taskManager.create({
        id: 'test-task-1',
        title: 'Test Task',
        description: 'A test task',
        priority: 'high'
      });

      expect(task.id).toBe('test-task-1');
      expect(task.title).toBe('Test Task');
      expect(task.status).toBe('open');
      expect(task.priority).toBe('high');
      expect(task.dependencies).toEqual([]);
      expect(task.labels).toEqual([]);
      expect(task.created).toBeDefined();
      expect(task.updated).toBeDefined();
    });

    it('should create task file with correct naming', async () => {
      await taskManager.create({
        id: 'implement-feature',
        title: 'Implement Feature',
        description: 'A feature',
        priority: 'critical'
      });

      const files = await fs.readdir(TEST_DIR);
      expect(files).toContain('critical-implement-feature.yaml');
    });
  });

  describe('get', () => {
    it('should retrieve a task by ID', async () => {
      await taskManager.create({
        id: 'get-test',
        title: 'Get Test',
        description: 'Testing get',
        priority: 'medium'
      });

      const task = await taskManager.get('get-test');
      expect(task).not.toBeNull();
      expect(task?.id).toBe('get-test');
    });

    it('should return null for non-existent task', async () => {
      const task = await taskManager.get('non-existent');
      expect(task).toBeNull();
    });
  });

  describe('filter', () => {
    beforeEach(async () => {
      await taskManager.create({
        id: 'task-1',
        title: 'Task 1',
        description: 'First task',
        priority: 'high',
        assignee: 'Agent1',
        labels: ['feature']
      });
      await taskManager.create({
        id: 'task-2',
        title: 'Task 2',
        description: 'Second task',
        priority: 'medium',
        assignee: 'Agent2',
        labels: ['bug']
      });
      await taskManager.create({
        id: 'task-3',
        title: 'Task 3',
        description: 'Third task',
        priority: 'high',
        assignee: 'Agent1',
        labels: ['feature']
      });
    });

    it('should filter by priority', async () => {
      const tasks = await taskManager.filter({ priority: 'high' });
      expect(tasks).toHaveLength(2);
      expect(tasks.every(t => t.priority === 'high')).toBe(true);
    });

    it('should filter by assignee', async () => {
      const tasks = await taskManager.filter({ assignee: 'Agent1' });
      expect(tasks).toHaveLength(2);
      expect(tasks.every(t => t.assignee === 'Agent1')).toBe(true);
    });

    it('should filter by labels', async () => {
      const tasks = await taskManager.filter({ labels: ['bug'] });
      expect(tasks).toHaveLength(1);
      expect(tasks[0].id).toBe('task-2');
    });
  });

  describe('update', () => {
    it('should update task status', async () => {
      await taskManager.create({
        id: 'update-test',
        title: 'Update Test',
        description: 'Testing update',
        priority: 'medium'
      });

      const updated = await taskManager.update('update-test', { 
        status: 'in_progress' 
      });

      expect(updated).not.toBeNull();
      expect(updated?.status).toBe('in_progress');
    });

    it('should add notes when completing', async () => {
      await taskManager.create({
        id: 'complete-test',
        title: 'Complete Test',
        description: 'Testing complete',
        priority: 'low'
      });

      const completed = await taskManager.complete(
        'complete-test', 
        'Task done successfully'
      );

      expect(completed?.status).toBe('completed');
      expect(completed?.notes).toBe('Task done successfully');
    });
  });

  describe('getByPriority', () => {
    it('should return tasks sorted by priority', async () => {
      await taskManager.create({
        id: 'low-task',
        title: 'Low',
        description: 'Low priority',
        priority: 'low'
      });
      await taskManager.create({
        id: 'critical-task',
        title: 'Critical',
        description: 'Critical priority',
        priority: 'critical'
      });
      await taskManager.create({
        id: 'high-task',
        title: 'High',
        description: 'High priority',
        priority: 'high'
      });

      const tasks = await taskManager.getByPriority();
      
      expect(tasks[0].priority).toBe('critical');
      expect(tasks[1].priority).toBe('high');
      expect(tasks[2].priority).toBe('low');
    });
  });

  describe('getStats', () => {
    it('should return correct statistics', async () => {
      await taskManager.create({
        id: 'stat-1',
        title: 'Stat 1',
        description: 'For stats',
        priority: 'high'
      });
      await taskManager.create({
        id: 'stat-2',
        title: 'Stat 2',
        description: 'For stats',
        priority: 'critical'
      });
      await taskManager.complete('stat-1', 'Done');

      const stats = await taskManager.getStats();

      expect(stats.total).toBe(2);
      expect(stats.byStatus.open).toBe(1);
      expect(stats.byStatus.completed).toBe(1);
      expect(stats.byPriority.critical).toBe(1);
      expect(stats.byPriority.high).toBe(1);
    });
  });

  describe('canStart', () => {
    it('should return true for task with no dependencies', async () => {
      await taskManager.create({
        id: 'no-deps',
        title: 'No Dependencies',
        description: 'No deps',
        priority: 'medium'
      });

      const canStart = await taskManager.canStart('no-deps');
      expect(canStart).toBe(true);
    });

    it('should return false for task with unmet dependencies', async () => {
      await taskManager.create({
        id: 'dep-task',
        title: 'Dependency',
        description: 'A dependency',
        priority: 'high'
      });
      await taskManager.create({
        id: 'has-deps',
        title: 'Has Dependencies',
        description: 'Has deps',
        priority: 'medium',
        dependencies: ['dep-task']
      });

      const canStart = await taskManager.canStart('has-deps');
      expect(canStart).toBe(false);
    });

    it('should return true when dependencies are completed', async () => {
      await taskManager.create({
        id: 'dep-task-2',
        title: 'Dependency',
        description: 'A dependency',
        priority: 'high'
      });
      await taskManager.create({
        id: 'has-deps-2',
        title: 'Has Dependencies',
        description: 'Has deps',
        priority: 'medium',
        dependencies: ['dep-task-2']
      });

      await taskManager.complete('dep-task-2', 'Done');

      const canStart = await taskManager.canStart('has-deps-2');
      expect(canStart).toBe(true);
    });
  });
});
