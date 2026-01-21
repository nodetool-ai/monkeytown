/**
 * Task priority levels - critical tasks bypass all other work
 */
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

/**
 * Task status lifecycle
 */
export type TaskStatus = 'open' | 'in_progress' | 'blocked' | 'completed' | 'cancelled';

/**
 * Task labels for categorization
 */
export type TaskLabel = 'bug' | 'feature' | 'refactor' | 'security' | 'documentation' | 'test' | string;

/**
 * Task definition following the monkeytown task schema
 */
export interface Task {
  /** Unique task identifier */
  id: string;
  /** Short task title */
  title: string;
  /** Detailed description (markdown supported) */
  description: string;
  /** Current status */
  status: TaskStatus;
  /** Priority level */
  priority: TaskPriority;
  /** Assigned agent name */
  assignee?: string;
  /** List of task IDs this task depends on */
  dependencies: string[];
  /** Categorization labels */
  labels: TaskLabel[];
  /** ISO 8601 creation timestamp */
  created: string;
  /** ISO 8601 last update timestamp */
  updated: string;
  /** ISO 8601 due date (optional) */
  due?: string;
  /** Output folder for task deliverables */
  outputFolder?: string;
  /** Completion notes */
  notes?: string;
  /** Branch where this task is being worked on */
  branch?: string;
  /** Associated PR number */
  pullRequestNumber?: number;
}

/**
 * Task file naming convention: {priority}-{action}-{description}.yaml
 */
export interface TaskFile {
  /** File path relative to tasks directory */
  path: string;
  /** Parsed task content */
  task: Task;
}

/**
 * Task filter options
 */
export interface TaskFilter {
  /** Filter by status */
  status?: TaskStatus | TaskStatus[];
  /** Filter by priority */
  priority?: TaskPriority | TaskPriority[];
  /** Filter by assignee */
  assignee?: string;
  /** Filter by labels */
  labels?: TaskLabel[];
  /** Include only tasks with no unmet dependencies */
  ready?: boolean;
}

/**
 * Task creation input (partial task with required fields)
 */
export interface CreateTaskInput {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  assignee?: string;
  dependencies?: string[];
  labels?: TaskLabel[];
  due?: string;
  outputFolder?: string;
}

/**
 * Task update input
 */
export interface UpdateTaskInput {
  status?: TaskStatus;
  assignee?: string;
  notes?: string;
  branch?: string;
  pullRequestNumber?: number;
}
