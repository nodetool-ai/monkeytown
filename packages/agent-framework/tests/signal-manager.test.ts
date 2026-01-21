import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'node:fs/promises';
import { SignalManager } from '../src/core/signal-manager.js';

const TEST_DIR = '/tmp/agent-framework-test-signals';

describe('SignalManager', () => {
  let signalManager: SignalManager;

  beforeEach(async () => {
    await fs.mkdir(TEST_DIR, { recursive: true });
    signalManager = new SignalManager(TEST_DIR);
  });

  afterEach(async () => {
    await fs.rm(TEST_DIR, { recursive: true, force: true });
  });

  describe('create', () => {
    it('should create an urgent signal', async () => {
      const signal = await signalManager.createUrgent(
        'AgentA',
        'AgentB',
        'Test Issue',
        'Something is broken',
        'Fix it immediately',
        ['deployments']
      );

      expect(signal.type).toBe('URGENT');
      expect(signal.from).toBe('AgentA');
      expect(signal.to).toBe('AgentB');
      expect(signal.priority).toBe('CRITICAL');
      expect(signal.status).toBe('active');
    });

    it('should create a handoff signal', async () => {
      const signal = await signalManager.createHandoff(
        'AgentA',
        'AgentB',
        'Work Ready',
        'API is complete',
        'Integrate with frontend'
      );

      expect(signal.type).toBe('HANDOFF');
      expect(signal.priority).toBe('MEDIUM');
    });

    it('should create signal file with correct naming', async () => {
      await signalManager.create({
        type: 'BLOCKED',
        title: 'Test Block',
        from: 'AgentA',
        to: 'AgentB',
        priority: 'HIGH',
        issue: 'Blocked',
        actionRequired: 'Unblock'
      });

      const files = await fs.readdir(TEST_DIR);
      const signalFile = files.find(f => f.startsWith('BLOCKED-'));
      expect(signalFile).toBeDefined();
    });
  });

  describe('getActive', () => {
    it('should return only active signals', async () => {
      await signalManager.create({
        type: 'URGENT',
        title: 'Active Signal',
        from: 'A',
        to: 'B',
        priority: 'HIGH',
        issue: 'Active',
        actionRequired: 'Do something'
      });

      const active = await signalManager.getActive();
      expect(active.length).toBeGreaterThan(0);
      expect(active.every(s => s.status === 'active')).toBe(true);
    });
  });

  describe('getForAgent', () => {
    beforeEach(async () => {
      await signalManager.create({
        type: 'URGENT',
        title: 'For Agent1',
        from: 'System',
        to: 'Agent1',
        priority: 'HIGH',
        issue: 'Issue for Agent1',
        actionRequired: 'Fix'
      });
      await signalManager.create({
        type: 'HANDOFF',
        title: 'For All',
        from: 'System',
        to: 'All',
        priority: 'MEDIUM',
        issue: 'For everyone',
        actionRequired: 'Review'
      });
      await signalManager.create({
        type: 'BLOCKED',
        title: 'For Agent2',
        from: 'System',
        to: 'Agent2',
        priority: 'HIGH',
        issue: 'Issue for Agent2',
        actionRequired: 'Unblock'
      });
    });

    it('should return signals for specific agent', async () => {
      const signals = await signalManager.getForAgent('Agent1');
      expect(signals.length).toBe(2); // Direct + All
    });

    it('should include All signals', async () => {
      const signals = await signalManager.getForAgent('Agent3');
      expect(signals.length).toBe(1);
      expect(signals[0].to).toBe('All');
    });
  });

  describe('getCritical', () => {
    it('should return only critical priority signals', async () => {
      await signalManager.create({
        type: 'URGENT',
        title: 'Critical One',
        from: 'A',
        to: 'B',
        priority: 'CRITICAL',
        issue: 'Critical',
        actionRequired: 'Immediate'
      });
      await signalManager.create({
        type: 'HANDOFF',
        title: 'High One',
        from: 'A',
        to: 'B',
        priority: 'HIGH',
        issue: 'High',
        actionRequired: 'Soon'
      });

      const critical = await signalManager.getCritical();
      expect(critical.length).toBe(1);
      expect(critical[0].priority).toBe('CRITICAL');
    });
  });

  describe('filter', () => {
    beforeEach(async () => {
      await signalManager.create({
        type: 'URGENT',
        title: 'Urgent 1',
        from: 'A',
        to: 'B',
        priority: 'CRITICAL',
        issue: 'Issue',
        actionRequired: 'Action'
      });
      await signalManager.create({
        type: 'BLOCKED',
        title: 'Blocked 1',
        from: 'C',
        to: 'D',
        priority: 'HIGH',
        issue: 'Blocked',
        actionRequired: 'Unblock'
      });
      await signalManager.create({
        type: 'HANDOFF',
        title: 'Handoff 1',
        from: 'E',
        to: 'F',
        priority: 'MEDIUM',
        issue: 'Ready',
        actionRequired: 'Take over'
      });
    });

    it('should filter by type', async () => {
      const urgent = await signalManager.filter({ type: 'URGENT' });
      expect(urgent.length).toBe(1);
      expect(urgent[0].type).toBe('URGENT');
    });

    it('should filter by priority', async () => {
      const high = await signalManager.filter({ priority: 'HIGH' });
      expect(high.length).toBe(1);
    });

    it('should filter by multiple types', async () => {
      const signals = await signalManager.filter({ 
        type: ['URGENT', 'BLOCKED'] 
      });
      expect(signals.length).toBe(2);
    });
  });

  describe('resolve', () => {
    it('should mark signal as resolved', async () => {
      await signalManager.create({
        type: 'URGENT',
        title: 'To Resolve',
        from: 'A',
        to: 'B',
        priority: 'HIGH',
        issue: 'Issue',
        actionRequired: 'Fix'
      });

      const result = await signalManager.resolve('To Resolve', 'Fixed the issue');
      expect(result).toBe(true);

      const active = await signalManager.getActive();
      expect(active.find(s => s.title === 'To Resolve')).toBeUndefined();
    });

    it('should return false for non-existent signal', async () => {
      const result = await signalManager.resolve('Non-existent', 'Resolution');
      expect(result).toBe(false);
    });
  });

  describe('delete', () => {
    it('should delete a signal', async () => {
      await signalManager.create({
        type: 'HANDOFF',
        title: 'To Delete',
        from: 'A',
        to: 'B',
        priority: 'MEDIUM',
        issue: 'Done',
        actionRequired: 'None'
      });

      const result = await signalManager.delete('To Delete');
      expect(result).toBe(true);

      const all = await signalManager.loadAll();
      expect(all.find(f => f.signal.title === 'To Delete')).toBeUndefined();
    });
  });

  describe('getStats', () => {
    it('should return correct statistics', async () => {
      await signalManager.create({
        type: 'URGENT',
        title: 'Urgent',
        from: 'A',
        to: 'B',
        priority: 'CRITICAL',
        issue: 'Issue',
        actionRequired: 'Fix'
      });
      await signalManager.create({
        type: 'HANDOFF',
        title: 'Handoff',
        from: 'A',
        to: 'B',
        priority: 'MEDIUM',
        issue: 'Ready',
        actionRequired: 'Take'
      });

      const stats = await signalManager.getStats();

      expect(stats.total).toBe(2);
      expect(stats.active).toBe(2);
      expect(stats.critical).toBe(1);
      expect(stats.byType.URGENT).toBe(1);
      expect(stats.byType.HANDOFF).toBe(1);
    });
  });
});
