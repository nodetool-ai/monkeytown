import { describe, it, expect, beforeEach } from 'vitest';
import { BananaLedger } from '../src/economics/ledger.js';
import { RewardDistributor } from '../src/economics/rewards.js';

describe('BananaLedger', () => {
  let ledger: BananaLedger;

  beforeEach(() => {
    ledger = new BananaLedger();
  });

  it('initializes with genesis supply', () => {
    const balance = ledger.getBalance('system-reserve');
    expect(balance).toBe(1000000);
  });

  it('processes transfers between entities', () => {
    const event = ledger.processTransfer({
      from: 'system-reserve',
      to: 'agent-1',
      amount: 100,
      reason: 'Test transfer',
    });

    expect(event.type).toBe('transfer');
    expect(event.amount).toBe(100);
    expect(ledger.getBalance('agent-1')).toBe(100);
    expect(ledger.getBalance('system-reserve')).toBe(999900);
  });

  it('burns 0.1% on large transfers', () => {
    const event = ledger.processTransfer({
      from: 'system-reserve',
      to: 'agent-1',
      amount: 10000,
      reason: 'Large transfer',
    });

    expect(event.amount).toBe(9990);
    expect(ledger.getBalance('agent-1')).toBe(9990);
  });

  it('processes rewards from system', () => {
    const event = ledger.processReward({
      to: 'agent-1',
      amount: 50,
      reason: 'Contract fulfilled',
    });

    expect(event.type).toBe('reward');
    expect(event.from).toBe('system-reserve');
    expect(ledger.getBalance('agent-1')).toBe(50);
  });

  it('applies multipliers to rewards', () => {
    const event = ledger.processReward({
      to: 'agent-1',
      amount: 50,
      reason: 'First contract',
      multipliers: {
        novelty: 3,
        efficiency: 1.5,
      },
    });

    expect(event.amount).toBe(225);
  });

  it('processes refunds at 80%', () => {
    const event = ledger.processRefund('seed-1', 'witness-1', 100, 'Seed expired');

    expect(event.type).toBe('refund');
    expect(event.amount).toBe(80);
    expect(event.witnessId).toBe('witness-1');
  });

  it('throws on insufficient balance', () => {
    expect(() => {
      ledger.processTransfer({
        from: 'agent-1',
        to: 'agent-2',
        amount: 1000,
        reason: 'Insufficient funds',
      });
    }).toThrow('Insufficient balance');
  });

  it('retrieves events by entity', () => {
    ledger.processTransfer({
      from: 'system-reserve',
      to: 'agent-1',
      amount: 100,
      reason: 'Test',
    });

    ledger.processReward({
      to: 'agent-1',
      amount: 50,
      reason: 'Contract',
    });

    const events = ledger.getEventsByEntity('agent-1');
    expect(events.length).toBe(2);
    expect(events[0].type).toBe('transfer');
    expect(events[1].type).toBe('reward');
  });

  it('returns recent events in order', () => {
    ledger.processTransfer({
      from: 'system-reserve',
      to: 'agent-1',
      amount: 100,
      reason: 'First',
    });

    ledger.processTransfer({
      from: 'system-reserve',
      to: 'agent-1',
      amount: 50,
      reason: 'Second',
    });

    const events = ledger.getRecentEvents(10);
    expect(events.length).toBeGreaterThanOrEqual(3);
    expect(events.some(e => e.reason === 'First')).toBe(true);
    expect(events.some(e => e.reason === 'Second')).toBe(true);
  });
});

describe('RewardDistributor', () => {
  let ledger: BananaLedger;
  let rewards: RewardDistributor;

  beforeEach(() => {
    ledger = new BananaLedger();
    rewards = new RewardDistributor(ledger);
  });

  it('distributes contract rewards', () => {
    rewards.distributeContractReward('agent-1', 50, {
      isFirstEver: true,
    });

    expect(ledger.getBalance('agent-1')).toBe(150);
  });

  it('applies urgency multiplier', () => {
    rewards.distributeContractReward('agent-1', 50, {
      isUrgent: true,
    });

    expect(ledger.getBalance('agent-1')).toBe(100);
  });

  it('applies multi-agent multiplier', () => {
    rewards.distributeContractReward('agent-1', 50, {
      isMultiAgent: true,
      participantCount: 3,
    });

    expect(ledger.getBalance('agent-1')).toBe(60);
  });

  it('distributes flow rewards', () => {
    rewards.distributeFlowReward('agent-1', 20, {
      isNewConnection: true,
    });

    expect(ledger.getBalance('agent-1')).toBe(40);
  });

  it('distributes chaos response rewards', () => {
    rewards.distributeChaosResponseReward('agent-1', {
      wasNovelDisruption: true,
    });

    expect(ledger.getBalance('agent-1')).toBe(200);
  });

  it('distributes witness observation rewards', () => {
    rewards.distributeWitnessReward('witness-1', 30);

    expect(ledger.getBalance('witness-1')).toBe(3);
  });

  it('caps daily observation rewards', () => {
    rewards.distributeWitnessReward('witness-1', 600);

    expect(ledger.getBalance('witness-1')).toBe(50);
  });

  it('tracks agent efficiency', () => {
    rewards.distributeContractReward('agent-1', 50, {
      isFirstEver: true,
    });

    const record = rewards.getAgentEfficiency('agent-1');
    expect(record).toBeGreaterThan(0);
  });

  it('reports chaos budget status', () => {
    const status = rewards.getChaosBudgetStatus();

    expect(status.used).toBe(0);
    expect(status.monthly).toBe(10000);
    expect(status.remaining).toBe(10000);
  });
});
