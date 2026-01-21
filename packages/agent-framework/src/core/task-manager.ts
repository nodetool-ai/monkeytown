import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as yaml from 'yaml';
import type { 
  Task, 
  TaskFile, 
  TaskFilter, 
  CreateTaskInput, 
  UpdateTaskInput,
  TaskPriority,
  TaskStatus 
} from '../types/task.js';

/**
 * TaskManager handles task CRUD operations and queries
 */
export class TaskManager {
  private tasksPath: string;

  constructor(tasksPath: string) {
    this.tasksPath = tasksPath;
  }

  /**
   * Get the file path for a task
   */
  private getTaskFilePath(task: Task | CreateTaskInput): string {
    const priority = task.priority;
    const action = task.id.replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    return path.join(this.tasksPath, `${priority}-${action}.yaml`);
  }

  /**
   * Parse a task file from YAML content
   */
  private parseTaskFile(filePath: string, content: string): TaskFile | null {
    try {
      const task = yaml.parse(content) as Task;
      if (!task.id || !task.title) {
        return null;
      }
      return { path: filePath, task };
    } catch {
      return null;
    }
  }

  /**
   * Load all tasks from the tasks directory
   */
  async loadAll(): Promise<TaskFile[]> {
    try {
      const files = await fs.readdir(this.tasksPath);
      const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
      
      const taskFiles: TaskFile[] = [];
      for (const file of yamlFiles) {
        const filePath = path.join(this.tasksPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const taskFile = this.parseTaskFile(file, content);
        if (taskFile) {
          taskFiles.push(taskFile);
        }
      }
      
      return taskFiles;
    } catch {
      return [];
    }
  }

  /**
   * Get a task by ID
   */
  async get(id: string): Promise<Task | null> {
    const tasks = await this.loadAll();
    const taskFile = tasks.find(tf => tf.task.id === id);
    return taskFile?.task ?? null;
  }

  /**
   * Filter tasks based on criteria
   */
  async filter(filter: TaskFilter): Promise<Task[]> {
    const taskFiles = await this.loadAll();
    let tasks = taskFiles.map(tf => tf.task);

    if (filter.status) {
      const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
      tasks = tasks.filter(t => statuses.includes(t.status));
    }

    if (filter.priority) {
      const priorities = Array.isArray(filter.priority) ? filter.priority : [filter.priority];
      tasks = tasks.filter(t => priorities.includes(t.priority));
    }

    if (filter.assignee) {
      tasks = tasks.filter(t => t.assignee === filter.assignee);
    }

    if (filter.labels && filter.labels.length > 0) {
      tasks = tasks.filter(t => 
        filter.labels!.some(label => t.labels.includes(label))
      );
    }

    if (filter.ready) {
      const allTaskIds = new Set(taskFiles.map(tf => tf.task.id));
      const completedIds = new Set(
        taskFiles
          .filter(tf => tf.task.status === 'completed')
          .map(tf => tf.task.id)
      );
      tasks = tasks.filter(t => 
        t.dependencies.every(dep => !allTaskIds.has(dep) || completedIds.has(dep))
      );
    }

    return tasks;
  }

  /**
   * Get tasks sorted by priority
   */
  async getByPriority(): Promise<Task[]> {
    const tasks = await this.filter({ status: ['open', 'in_progress', 'blocked'] });
    const priorityOrder: Record<TaskPriority, number> = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3
    };
    return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  /**
   * Get tasks for a specific agent
   */
  async getForAgent(agentId: string): Promise<Task[]> {
    const tasks = await this.filter({ 
      assignee: agentId, 
      status: ['open', 'in_progress'] 
    });
    const priorityOrder: Record<TaskPriority, number> = {
      critical: 0,
      high: 1,
      medium: 2,
      low: 3
    };
    return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }

  /**
   * Get ready tasks (no unmet dependencies)
   */
  async getReady(): Promise<Task[]> {
    return this.filter({ status: 'open', ready: true });
  }

  /**
   * Create a new task
   */
  async create(input: CreateTaskInput): Promise<Task> {
    const now = new Date().toISOString();
    const task: Task = {
      ...input,
      status: 'open',
      dependencies: input.dependencies ?? [],
      labels: input.labels ?? [],
      created: now,
      updated: now
    };

    const filePath = this.getTaskFilePath(task);
    const content = yaml.stringify(task);
    await fs.writeFile(filePath, content, 'utf-8');
    
    return task;
  }

  /**
   * Update an existing task
   */
  async update(id: string, input: UpdateTaskInput): Promise<Task | null> {
    const taskFiles = await this.loadAll();
    const taskFile = taskFiles.find(tf => tf.task.id === id);
    
    if (!taskFile) {
      return null;
    }

    const updatedTask: Task = {
      ...taskFile.task,
      ...input,
      updated: new Date().toISOString()
    };

    const oldPath = path.join(this.tasksPath, taskFile.path);
    const newPath = this.getTaskFilePath(updatedTask);
    
    // If priority changed, file path changes
    if (oldPath !== newPath) {
      await fs.unlink(oldPath);
    }
    
    const content = yaml.stringify(updatedTask);
    await fs.writeFile(newPath, content, 'utf-8');
    
    return updatedTask;
  }

  /**
   * Mark a task as completed
   */
  async complete(id: string, notes?: string): Promise<Task | null> {
    return this.update(id, { status: 'completed', notes });
  }

  /**
   * Mark a task as blocked
   */
  async block(id: string, notes?: string): Promise<Task | null> {
    return this.update(id, { status: 'blocked', notes });
  }

  /**
   * Start work on a task
   */
  async start(id: string, assignee?: string): Promise<Task | null> {
    const update: UpdateTaskInput = { status: 'in_progress' };
    if (assignee) {
      update.assignee = assignee;
    }
    return this.update(id, update);
  }

  /**
   * Delete a task
   */
  async delete(id: string): Promise<boolean> {
    const taskFiles = await this.loadAll();
    const taskFile = taskFiles.find(tf => tf.task.id === id);
    
    if (!taskFile) {
      return false;
    }

    const filePath = path.join(this.tasksPath, taskFile.path);
    await fs.unlink(filePath);
    return true;
  }

  /**
   * Check if all dependencies are met for a task
   */
  async canStart(id: string): Promise<boolean> {
    const task = await this.get(id);
    if (!task || task.status !== 'open') {
      return false;
    }

    if (task.dependencies.length === 0) {
      return true;
    }

    for (const depId of task.dependencies) {
      const dep = await this.get(depId);
      if (!dep || dep.status !== 'completed') {
        return false;
      }
    }

    return true;
  }

  /**
   * Get task statistics
   */
  async getStats(): Promise<{
    total: number;
    byStatus: Record<TaskStatus, number>;
    byPriority: Record<TaskPriority, number>;
    blocked: number;
    ready: number;
  }> {
    const taskFiles = await this.loadAll();
    const tasks = taskFiles.map(tf => tf.task);
    
    const byStatus: Record<TaskStatus, number> = {
      open: 0,
      in_progress: 0,
      blocked: 0,
      completed: 0,
      cancelled: 0
    };
    
    const byPriority: Record<TaskPriority, number> = {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0
    };

    for (const task of tasks) {
      byStatus[task.status]++;
      byPriority[task.priority]++;
    }

    const readyTasks = await this.getReady();

    return {
      total: tasks.length,
      byStatus,
      byPriority,
      blocked: byStatus.blocked,
      ready: readyTasks.length
    };
  }
}
