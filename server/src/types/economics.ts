export type EntityType = 'agent' | 'witness' | 'contract' | 'flow' | 'seed' | 'system';

export interface Entity {
  id: string;
  type: EntityType;
  label: string;
  createdAt: number;
  metadata: Record<string, unknown>;
}

export type BananaEventType = 'transfer' | 'reward' | 'penalty' | 'refund' | 'burn';

export interface BananaEvent {
  id: string;
  type: BananaEventType;
  from: string;
  to: string;
  amount: number;
  reason: string;
  relatedFlowId?: string;
  relatedSeedId?: string;
  timestamp: number;
  witnessId?: string;
}

export interface Balance {
  entityId: string;
  balance: number;
  lastUpdated: number;
}

export interface TransferRequest {
  from: string;
  to: string;
  amount: number;
  reason: string;
  relatedFlowId?: string;
  relatedSeedId?: string;
  witnessId?: string;
}

export interface RewardRequest {
  to: string;
  amount: number;
  reason: string;
  relatedFlowId?: string;
  witnessId?: string;
  multipliers?: {
    efficiency?: number;
    novelty?: number;
    cooperation?: number;
    urgency?: number;
  };
}

export interface IncentiveParameters {
  baseContractReward: number;
  baseFlowReward: number;
  chaosAbsorptionBonus: number;
  efficiencyThreshold: number;
  efficiencyMultiplier: number;
  noveltyMultiplier: number;
  observationRewardRate: number;
  maxDailyObservation: number;
  chaosBudgetMonthly: number;
  burnRate: number;
}

export const DEFAULT_INCENTIVE_PARAMS: IncentiveParameters = {
  baseContractReward: 50,
  baseFlowReward: 20,
  chaosAbsorptionBonus: 100,
  efficiencyThreshold: 0.10,
  efficiencyMultiplier: 1.5,
  noveltyMultiplier: 3.0,
  observationRewardRate: 1,
  maxDailyObservation: 50,
  chaosBudgetMonthly: 10000,
  burnRate: 0.001,
};
