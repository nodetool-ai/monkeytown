import { createHash } from 'crypto';
import { EventEmitter } from 'events';
import {
  BananaEvent,
  BananaEventType,
  Balance,
  TransferRequest,
  RewardRequest,
  IncentiveParameters,
  DEFAULT_INCENTIVE_PARAMS,
} from '../types/economics.js';

export class BananaLedger extends EventEmitter {
  private balances: Map<string, Balance> = new Map();
  private events: Map<string, BananaEvent> = new Map();
  private params: IncentiveParameters;
  private genesisSupply: number = 1000000;
  private genesisWallet: string = 'system-reserve';

  constructor(params: Partial<IncentiveParameters> = {}) {
    super();
    this.params = { ...DEFAULT_INCENTIVE_PARAMS, ...params };
    this.initializeGenesis();
  }

  private initializeGenesis(): void {
    const genesis: BananaEvent = {
      id: this.generateEventId('genesis'),
      type: 'reward',
      from: 'genesis',
      to: this.genesisWallet,
      amount: this.genesisSupply,
      reason: 'Initial supply at genesis',
      timestamp: Date.now(),
    };
    this.recordEvent(genesis);

    this.balances.set(this.genesisWallet, {
      entityId: this.genesisWallet,
      balance: this.genesisSupply,
      lastUpdated: Date.now(),
    });
  }

  private generateEventId(prefix: string): string {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 10);
    const hash = createHash('sha256')
      .update(`${prefix}:${timestamp}:${random}`)
      .digest('hex')
      .substring(0, 16);
    return `${prefix}-${hash}`;
  }

  private generateEventIdFromRequest(request: TransferRequest | RewardRequest): string {
    const data = JSON.stringify(request);
    const hash = createHash('sha256').update(data).digest('hex').substring(0, 16);
    return `evt-${hash}`;
  }

  recordEvent(event: BananaEvent): void {
    this.events.set(event.id, event);

    const fromBalance = this.balances.get(event.from);
    if (fromBalance) {
      fromBalance.balance -= event.amount;
      fromBalance.lastUpdated = event.timestamp;
    }

    const toBalance = this.balances.get(event.to);
    if (toBalance) {
      toBalance.balance += event.amount;
      toBalance.lastUpdated = event.timestamp;
    } else {
      this.balances.set(event.to, {
        entityId: event.to,
        balance: event.amount,
        lastUpdated: event.timestamp,
      });
    }

    this.emit('event', event);
  }

  processTransfer(request: TransferRequest): BananaEvent {
    const fromBalance = this.balances.get(request.from);
    if (!fromBalance || fromBalance.balance < request.amount) {
      throw new Error(`Insufficient balance for transfer from ${request.from}`);
    }

    let amount = request.amount;
    const reason = request.reason;

    if (amount >= 10000) {
      const burnAmount = Math.floor(amount * this.params.burnRate);
      amount -= burnAmount;

      const burnEvent: BananaEvent = {
        id: this.generateEventIdFromRequest(request),
        type: 'burn',
        from: request.from,
        to: 'burn-reserve',
        amount: burnAmount,
        reason: `Transfer burn (0.1%): ${reason}`,
        relatedFlowId: request.relatedFlowId,
        relatedSeedId: request.relatedSeedId,
        timestamp: Date.now(),
        witnessId: request.witnessId,
      };
      this.recordEvent(burnEvent);
    }

    const transferEvent: BananaEvent = {
      id: this.generateEventIdFromRequest(request),
      type: 'transfer',
      from: request.from,
      to: request.to,
      amount,
      reason,
      relatedFlowId: request.relatedFlowId,
      relatedSeedId: request.relatedSeedId,
      timestamp: Date.now(),
      witnessId: request.witnessId,
    };

    this.recordEvent(transferEvent);
    return transferEvent;
  }

  processReward(request: RewardRequest): BananaEvent {
    let amount = request.amount;

    if (request.multipliers) {
      if (request.multipliers.efficiency) {
        amount *= request.multipliers.efficiency;
      }
      if (request.multipliers.novelty) {
        amount *= request.multipliers.novelty;
      }
      if (request.multipliers.cooperation) {
        amount *= 1 + 0.1 * (request.multipliers.cooperation - 1);
      }
      if (request.multipliers.urgency) {
        amount *= request.multipliers.urgency;
      }
    }

    const rewardEvent: BananaEvent = {
      id: this.generateEventIdFromRequest(request),
      type: 'reward',
      from: 'system-reserve',
      to: request.to,
      amount: Math.floor(amount),
      reason: request.reason,
      relatedFlowId: request.relatedFlowId,
      timestamp: Date.now(),
      witnessId: request.witnessId,
    };

    this.recordEvent(rewardEvent);
    return rewardEvent;
  }

  processRefund(seedId: string, witnessId: string, amount: number, reason: string): BananaEvent {
    const refundEvent: BananaEvent = {
      id: this.generateEventId(`refund-${seedId}`),
      type: 'refund',
      from: 'system-reserve',
      to: witnessId,
      amount: Math.floor(amount * 0.8),
      reason: `Seed refund (80%): ${reason}`,
      relatedSeedId: seedId,
      timestamp: Date.now(),
      witnessId,
    };

    this.recordEvent(refundEvent);
    return refundEvent;
  }

  getBalance(entityId: string): number {
    const balance = this.balances.get(entityId);
    return balance?.balance ?? 0;
  }

  getAllBalances(): Map<string, Balance> {
    return new Map(this.balances);
  }

  getEventsByEntity(entityId: string): BananaEvent[] {
    const entityEvents: BananaEvent[] = [];
    for (const event of this.events.values()) {
      if (event.from === entityId || event.to === entityId) {
        entityEvents.push(event);
      }
    }
    return entityEvents.sort((a, b) => b.timestamp - a.timestamp);
  }

  getRecentEvents(limit: number = 50): BananaEvent[] {
    const events = Array.from(this.events.values());
    return events.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
  }

  getParameters(): IncentiveParameters {
    return { ...this.params };
  }

  updateParameters(updates: Partial<IncentiveParameters>): void {
    this.params = { ...this.params, ...updates };
  }
}
