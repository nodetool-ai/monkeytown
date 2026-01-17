import { BananaLedger } from './ledger.js';
import { RewardRequest } from '../types/economics.js';

export interface EfficiencyRecord {
  entityId: string;
  totalRewards: number;
  totalActions: number;
  lastActionTime: number;
}

export class RewardDistributor {
  private ledger: BananaLedger;
  private efficiencyRecords: Map<string, EfficiencyRecord> = new Map();
  private chaosBudgetUsed: number = 0;
  private lastMonthReset: number = Date.now();

  constructor(ledger: BananaLedger) {
    this.ledger = ledger;
  }

  private resetMonthlyBudget(): void {
    const now = Date.now();
    if (now - this.lastMonthReset > 30 * 24 * 60 * 60 * 1000) {
      this.chaosBudgetUsed = 0;
      this.lastMonthReset = now;
    }
  }

  recordAgentAction(entityId: string): void {
    let record = this.efficiencyRecords.get(entityId);
    if (!record) {
      record = {
        entityId,
        totalRewards: 0,
        totalActions: 0,
        lastActionTime: Date.now(),
      };
      this.efficiencyRecords.set(entityId, record);
    }
    record.totalActions += 1;
    record.lastActionTime = Date.now();
  }

  updateAgentReward(entityId: string, amount: number): void {
    const record = this.efficiencyRecords.get(entityId);
    if (record) {
      record.totalRewards += amount;
    }
  }

  distributeContractReward(
    agentId: string,
    baseAmount: number,
    options: {
      isFirstEver?: boolean;
      isMultiAgent?: boolean;
      isUrgent?: boolean;
      participantCount?: number;
    } = {}
  ): void {
    const multipliers: RewardRequest['multipliers'] = {};

    if (options.isUrgent) {
      multipliers.urgency = 2;
    }
    if (options.isMultiAgent && options.participantCount && options.participantCount > 1) {
      multipliers.cooperation = options.participantCount;
    }
    if (options.isFirstEver) {
      multipliers.novelty = 3;
    }

    const topAgents = this.getTopAgentsByEfficiency(0.1);
    const isEfficient = topAgents.has(agentId);
    if (isEfficient) {
      multipliers.efficiency = this.ledger.getParameters().efficiencyMultiplier;
    }

    this.recordAgentAction(agentId);

    const request: RewardRequest = {
      to: agentId,
      amount: baseAmount,
      reason: 'Contract fulfilled',
      multipliers,
    };

    const event = this.ledger.processReward(request);
    this.updateAgentReward(agentId, event.amount);
  }

  distributeFlowReward(
    agentId: string,
    baseAmount: number,
    options: {
      isCrossDomain?: boolean;
      isNewConnection?: boolean;
    } = {}
  ): void {
    const multipliers: RewardRequest['multipliers'] = {};

    if (options.isCrossDomain) {
      multipliers.cooperation = 1.5;
    }
    if (options.isNewConnection) {
      multipliers.novelty = 2;
    }

    const topAgents = this.getTopAgentsByEfficiency(0.1);
    const isEfficient = topAgents.has(agentId);
    if (isEfficient) {
      multipliers.efficiency = this.ledger.getParameters().efficiencyMultiplier;
    }

    this.recordAgentAction(agentId);

    const request: RewardRequest = {
      to: agentId,
      amount: baseAmount,
      reason: 'Flow completed',
      multipliers,
    };

    const event = this.ledger.processReward(request);
    this.updateAgentReward(agentId, event.amount);
  }

  distributeChaosResponseReward(
    agentId: string,
    options: {
      wasUnplanned?: boolean;
      wasNovelDisruption?: boolean;
    } = {}
  ): void {
    this.resetMonthlyBudget();

    const params = this.ledger.getParameters();
    if (this.chaosBudgetUsed + params.chaosAbsorptionBonus > params.chaosBudgetMonthly) {
      throw new Error('Monthly chaos budget exceeded');
    }

    let amount = params.chaosAbsorptionBonus;
    if (options.wasUnplanned) {
      amount *= 1.5;
    }
    if (options.wasNovelDisruption) {
      amount *= 2;
    }

    this.chaosBudgetUsed += amount;

    const request: RewardRequest = {
      to: agentId,
      amount,
      reason: 'Chaos absorbed',
    };

    const event = this.ledger.processReward(request);
    this.updateAgentReward(agentId, event.amount);
  }

  distributeErrorRecoveryReward(agentId: string, options: { selfDetected?: boolean; documented?: boolean } = {}): void {
    let amount = 30;
    if (options.selfDetected) {
      amount *= 2;
    }
    if (options.documented) {
      amount *= 1.5;
    }

    const request: RewardRequest = {
      to: agentId,
      amount,
      reason: 'Error recovered',
    };

    const event = this.ledger.processReward(request);
    this.updateAgentReward(agentId, event.amount);
  }

  distributeWitnessReward(witnessId: string, observationMinutes: number): void {
    const params = this.ledger.getParameters();
    const reward = Math.min(
      params.maxDailyObservation,
      Math.floor(observationMinutes / 10) * params.observationRewardRate
    );

    if (reward > 0) {
      const request: RewardRequest = {
        to: witnessId,
        amount: reward,
        reason: 'Observation reward',
        witnessId,
      };

      this.ledger.processReward(request);
    }
  }

  distributeWitnessSuccessReward(witnessId: string, baseReward: number, successRate: number): void {
    let multiplier = 1 + (successRate - 0.5);
    if (successRate < 0.2) {
      multiplier = Math.max(0.5, successRate);
    }

    const request: RewardRequest = {
      to: witnessId,
      amount: Math.floor(baseReward * multiplier),
      reason: 'Seed success reward',
      witnessId,
    };

    this.ledger.processReward(request);
  }

  distributeErrorReportingReward(witnessId: string, isVerified: boolean, rootCauseIdentified: boolean): void {
    let amount = isVerified ? 25 : 0;
    if (rootCauseIdentified) {
      amount += 10;
    }

    if (amount > 0) {
      const request: RewardRequest = {
        to: witnessId,
        amount,
        reason: 'Error reporting bonus',
        witnessId,
      };

      this.ledger.processReward(request);
    }
  }

  private getTopAgentsByEfficiency(topPercent: number): Map<string, boolean> {
    const records = Array.from(this.efficiencyRecords.values());
    if (records.length === 0) {
      return new Map();
    }

    const sorted = records
      .map((r) => ({
        entityId: r.entityId,
        efficiency: r.totalActions > 0 ? r.totalRewards / r.totalActions : 0,
      }))
      .sort((a, b) => b.efficiency - a.efficiency);

    const topCount = Math.ceil(sorted.length * topPercent);
    const topAgents = new Map<string, boolean>();
    for (let i = 0; i < topCount; i++) {
      topAgents.set(sorted[i].entityId, true);
    }

    return topAgents;
  }

  getAgentEfficiency(entityId: string): number {
    const record = this.efficiencyRecords.get(entityId);
    if (!record || record.totalActions === 0) {
      return 0;
    }
    return record.totalRewards / record.totalActions;
  }

  getChaosBudgetStatus(): { used: number; monthly: number; remaining: number } {
    this.resetMonthlyBudget();
    const params = this.ledger.getParameters();
    return {
      used: this.chaosBudgetUsed,
      monthly: params.chaosBudgetMonthly,
      remaining: params.chaosBudgetMonthly - this.chaosBudgetUsed,
    };
  }
}
