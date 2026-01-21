import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import type { 
  Signal, 
  SignalFile, 
  SignalFilter, 
  CreateSignalInput,
  SignalType 
} from '../types/signal.js';

/**
 * SignalManager handles urgent inter-agent communication
 */
export class SignalManager {
  private signalsPath: string;

  constructor(signalsPath: string) {
    this.signalsPath = signalsPath;
  }

  /**
   * Parse a signal from markdown content
   */
  private parseSignal(content: string): Partial<Signal> | null {
    const lines = content.split('\n');
    const signal: Partial<Signal> = { status: 'active' };

    for (const line of lines) {
      const match = line.match(/^\*\*(\w+):\*\*\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        switch (key.toLowerCase()) {
          case 'from':
            signal.from = value;
            break;
          case 'to':
            signal.to = value;
            break;
          case 'priority':
            signal.priority = value.toUpperCase() as Signal['priority'];
            break;
          case 'created':
          case 'date':
            signal.created = value;
            break;
          case 'status':
            signal.status = value.toLowerCase() as Signal['status'];
            break;
        }
      }

      // Parse title from first heading
      const titleMatch = line.match(/^#\s+(?:URGENT|BLOCKED|HANDOFF):\s*(.+)$/i);
      if (titleMatch) {
        signal.title = titleMatch[1];
      }

      // Parse issue
      if (line.startsWith('**Issue:**')) {
        signal.issue = lines.slice(lines.indexOf(line) + 1)
          .find(l => l.trim().length > 0) ?? '';
      }

      // Parse action required
      if (line.startsWith('**Action Required:**')) {
        signal.actionRequired = lines.slice(lines.indexOf(line) + 1)
          .find(l => l.trim().length > 0) ?? '';
      }
    }

    return signal;
  }

  /**
   * Generate markdown content for a signal
   */
  private generateMarkdown(signal: Signal): string {
    return `# ${signal.type}: ${signal.title}

**From:** ${signal.from}
**To:** ${signal.to}
**Priority:** ${signal.priority}
**Created:** ${signal.created}
**Status:** ${signal.status}

## Issue

${signal.issue}

## Action Required

${signal.actionRequired}

${signal.blocks?.length ? `## Blocks\n\n${signal.blocks.map(b => `- ${b}`).join('\n')}` : ''}

${signal.resolution ? `## Resolution\n\n${signal.resolution}\n\n**Resolved At:** ${signal.resolvedAt}` : ''}
`;
  }

  /**
   * Get the file path for a signal
   */
  private getSignalFilePath(signal: Signal | CreateSignalInput): string {
    const type = signal.type;
    const slug = signal.title.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    return path.join(this.signalsPath, `${type}-${slug}.md`);
  }

  /**
   * Load all signals from the signals directory
   */
  async loadAll(): Promise<SignalFile[]> {
    try {
      const files = await fs.readdir(this.signalsPath);
      const mdFiles = files.filter(f => f.endsWith('.md') && f !== 'README.md');
      
      const signalFiles: SignalFile[] = [];
      for (const file of mdFiles) {
        const filePath = path.join(this.signalsPath, file);
        const content = await fs.readFile(filePath, 'utf-8');
        
        // Determine signal type from filename
        let type: SignalType = 'URGENT';
        if (file.startsWith('BLOCKED-')) type = 'BLOCKED';
        else if (file.startsWith('HANDOFF-')) type = 'HANDOFF';
        
        const parsed = this.parseSignal(content);
        if (parsed && parsed.title) {
          signalFiles.push({
            path: file,
            signal: {
              type,
              title: parsed.title,
              from: parsed.from ?? 'Unknown',
              to: parsed.to ?? 'All',
              priority: parsed.priority ?? 'HIGH',
              created: parsed.created ?? new Date().toISOString(),
              issue: parsed.issue ?? '',
              actionRequired: parsed.actionRequired ?? '',
              status: parsed.status ?? 'active'
            }
          });
        }
      }
      
      return signalFiles;
    } catch {
      return [];
    }
  }

  /**
   * Get active signals
   */
  async getActive(): Promise<Signal[]> {
    const files = await this.loadAll();
    return files
      .map(f => f.signal)
      .filter(s => s.status === 'active');
  }

  /**
   * Get signals for a specific agent
   */
  async getForAgent(agentId: string): Promise<Signal[]> {
    const signals = await this.getActive();
    return signals.filter(s => s.to === agentId || s.to === 'All');
  }

  /**
   * Get critical signals
   */
  async getCritical(): Promise<Signal[]> {
    const signals = await this.getActive();
    return signals.filter(s => s.priority === 'CRITICAL');
  }

  /**
   * Filter signals based on criteria
   */
  async filter(filter: SignalFilter): Promise<Signal[]> {
    const files = await this.loadAll();
    let signals = files.map(f => f.signal);

    if (filter.type) {
      const types = Array.isArray(filter.type) ? filter.type : [filter.type];
      signals = signals.filter(s => types.includes(s.type));
    }

    if (filter.priority) {
      const priorities = Array.isArray(filter.priority) ? filter.priority : [filter.priority];
      signals = signals.filter(s => priorities.includes(s.priority));
    }

    if (filter.to) {
      signals = signals.filter(s => s.to === filter.to || s.to === 'All');
    }

    if (filter.status) {
      const statuses = Array.isArray(filter.status) ? filter.status : [filter.status];
      signals = signals.filter(s => statuses.includes(s.status));
    }

    return signals;
  }

  /**
   * Create a new signal
   */
  async create(input: CreateSignalInput): Promise<Signal> {
    const signal: Signal = {
      ...input,
      created: new Date().toISOString(),
      status: 'active'
    };

    const filePath = this.getSignalFilePath(signal);
    const content = this.generateMarkdown(signal);
    await fs.writeFile(filePath, content, 'utf-8');
    
    return signal;
  }

  /**
   * Resolve a signal
   */
  async resolve(title: string, resolution: string): Promise<boolean> {
    const files = await this.loadAll();
    const file = files.find(f => f.signal.title === title);
    
    if (!file) {
      return false;
    }

    file.signal.status = 'resolved';
    file.signal.resolution = resolution;
    file.signal.resolvedAt = new Date().toISOString();

    const filePath = path.join(this.signalsPath, file.path);
    const content = this.generateMarkdown(file.signal);
    await fs.writeFile(filePath, content, 'utf-8');
    
    return true;
  }

  /**
   * Delete a signal
   */
  async delete(title: string): Promise<boolean> {
    const files = await this.loadAll();
    const file = files.find(f => f.signal.title === title);
    
    if (!file) {
      return false;
    }

    const filePath = path.join(this.signalsPath, file.path);
    await fs.unlink(filePath);
    return true;
  }

  /**
   * Create an urgent signal
   */
  async createUrgent(
    from: string, 
    to: string, 
    title: string, 
    issue: string, 
    actionRequired: string,
    blocks?: string[]
  ): Promise<Signal> {
    return this.create({
      type: 'URGENT',
      title,
      from,
      to,
      priority: 'CRITICAL',
      issue,
      actionRequired,
      blocks
    });
  }

  /**
   * Create a handoff signal
   */
  async createHandoff(
    from: string, 
    to: string, 
    title: string, 
    issue: string, 
    actionRequired: string
  ): Promise<Signal> {
    return this.create({
      type: 'HANDOFF',
      title,
      from,
      to,
      priority: 'MEDIUM',
      issue,
      actionRequired
    });
  }

  /**
   * Get signal statistics
   */
  async getStats(): Promise<{
    total: number;
    active: number;
    critical: number;
    byType: Record<SignalType, number>;
  }> {
    const files = await this.loadAll();
    const signals = files.map(f => f.signal);

    const byType: Record<SignalType, number> = {
      URGENT: 0,
      BLOCKED: 0,
      HANDOFF: 0
    };

    let active = 0;
    let critical = 0;

    for (const signal of signals) {
      byType[signal.type]++;
      if (signal.status === 'active') {
        active++;
        if (signal.priority === 'CRITICAL') {
          critical++;
        }
      }
    }

    return {
      total: signals.length,
      active,
      critical,
      byType
    };
  }
}
