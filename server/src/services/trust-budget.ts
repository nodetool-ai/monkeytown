import { RedisService } from './redis.js';

const TRUST_BUDGET_KEY = 'trust:';
const TRUST_EVENTS_KEY = 'trust:events:';

export type TrustEventType = 
  | 'consistent_personality'
  | 'genuine_competence'
  | 'honest_limitations'
  | 'memory_of_player'
  | 'adaptation_to_preferences'
  | 'vulnerability_in_character'
  | 'transparent_about_ai'
  | 'inconsistent_behavior'
  | 'suspected_manipulation'
  | 'capability_failure'
  | 'privacy_concerns'
  | 'hidden_ai_nature'
  | 'too_perfect_ai';

export interface TrustEvent {
  type: TrustEventType;
  playerId: string;
  agentId?: string;
  timestamp: number;
  description: string;
  points: number;
}

export interface TrustBudgetState {
  playerId: string;
  currentScore: number;
  initialScore: number;
  events: TrustEvent[];
  state: 'loyal_advocate' | 'engaged_user' | 'cautious_user' | 'at_risk';
  lastUpdated: number;
  sessionStart: number;
}

const TRUST_EVENT_CONFIG: Record<TrustEventType, { points: number; description: string }> = {
  consistent_personality: { points: 10, description: 'Agent showed consistent personality' },
  genuine_competence: { points: 15, description: 'Agent demonstrated genuine competence' },
  honest_limitations: { points: 10, description: 'Agent acknowledged limitations honestly' },
  memory_of_player: { points: 15, description: 'Agent remembered player preferences' },
  adaptation_to_preferences: { points: 10, description: 'Agent adapted to player style' },
  vulnerability_in_character: { points: 8, description: 'Agent showed vulnerability' },
  transparent_about_ai: { points: 12, description: 'Agent was transparent about AI nature' },
  inconsistent_behavior: { points: -20, description: 'Agent behaved inconsistently' },
  suspected_manipulation: { points: -30, description: 'Player suspected manipulation' },
  capability_failure: { points: -15, description: 'Agent failed to deliver' },
  privacy_concerns: { points: -25, description: 'Privacy concerns raised' },
  hidden_ai_nature: { points: -40, description: 'AI nature was hidden from player' },
  too_perfect_ai: { points: -10, description: 'AI was too perfect (unnatural)' },
};

function getTrustState(score: number): TrustBudgetState['state'] {
  if (score >= 80) return 'loyal_advocate';
  if (score >= 50) return 'engaged_user';
  if (score >= 25) return 'cautious_user';
  return 'at_risk';
}

const INITIAL_TRUST_BUDGET = 50;

export class TrustBudgetService {
  private redis: RedisService;

  constructor(redis: RedisService) {
    this.redis = redis;
  }

  async getTrustBudget(playerId: string): Promise<TrustBudgetState> {
    const budgetData = await this.redis.get(`${TRUST_BUDGET_KEY}${playerId}`);
    
    if (!budgetData) {
      const initialState: TrustBudgetState = {
        playerId,
        currentScore: INITIAL_TRUST_BUDGET,
        initialScore: INITIAL_TRUST_BUDGET,
        events: [],
        state: getTrustState(INITIAL_TRUST_BUDGET),
        lastUpdated: Date.now(),
        sessionStart: Date.now(),
      };
      return initialState;
    }

    return JSON.parse(budgetData);
  }

  async recordTrustEvent(
    playerId: string,
    eventType: TrustEventType,
    agentId?: string
  ): Promise<TrustBudgetState> {
    const currentState = await this.getTrustBudget(playerId);
    const eventConfig = TRUST_EVENT_CONFIG[eventType];

    const newEvent: TrustEvent = {
      type: eventType,
      playerId,
      agentId,
      timestamp: Date.now(),
      description: eventConfig.description,
      points: eventConfig.points,
    };

    const newScore = Math.max(0, Math.min(100, currentState.currentScore + eventConfig.points));
    const newState: TrustBudgetState = {
      ...currentState,
      currentScore: newScore,
      events: [newEvent, ...currentState.events].slice(0, 100),
      state: getTrustState(newScore),
      lastUpdated: Date.now(),
    };

    await this.redis.set(`${TRUST_BUDGET_KEY}${playerId}`, JSON.stringify(newState));
    await this.redis.lpush(`${TRUST_EVENTS_KEY}${playerId}`, JSON.stringify(newEvent));

    return newState;
  }

  async getTrustEvents(playerId: string, limit = 50): Promise<TrustEvent[]> {
    const events = await this.redis.lrange(`${TRUST_EVENTS_KEY}${playerId}`, 0, limit - 1);
    return events.map((e: string) => JSON.parse(e));
  }

  async resetTrustBudget(playerId: string): Promise<TrustBudgetState> {
    const newState: TrustBudgetState = {
      playerId,
      currentScore: INITIAL_TRUST_BUDGET,
      initialScore: INITIAL_TRUST_BUDGET,
      events: [],
      state: getTrustState(INITIAL_TRUST_BUDGET),
      lastUpdated: Date.now(),
      sessionStart: Date.now(),
    };

    await this.redis.set(`${TRUST_BUDGET_KEY}${playerId}`, JSON.stringify(newState));
    return newState;
  }

  async updateTrustFromGameAction(
    playerId: string,
    action: string,
    agentId?: string
  ): Promise<void> {
    let eventType: TrustEventType | null = null;

    switch (action) {
      case 'agent_adapted':
        eventType = 'adaptation_to_preferences';
        break;
      case 'agent_remembered':
        eventType = 'memory_of_player';
        break;
      case 'agent_honest':
        eventType = 'honest_limitations';
        break;
      case 'agent_won_fairly':
        eventType = 'genuine_competence';
        break;
    }

    if (eventType) {
      await this.recordTrustEvent(playerId, eventType, agentId);
    }
  }
}

export function createTrustBudgetService(redis: RedisService): TrustBudgetService {
  return new TrustBudgetService(redis);
}
