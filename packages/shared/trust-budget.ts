/**
 * Trust Budget System - Tracks player trust in AI agents
 * 
 * The trust budget model:
 * - Initial Budget: 50 trust points (skeptical but open)
 * - States: 80+ Loyal advocate, 50-79 Engaged user, 25-49 Cautious user, <25 At risk of churn
 */

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

export const TRUST_EVENT_CONFIG: Record<TrustEventType, { points: number; description: string }> = {
  // Trust Earning Events (+points)
  consistent_personality: { points: 10, description: 'Agent showed consistent personality' },
  genuine_competence: { points: 15, description: 'Agent demonstrated genuine competence' },
  honest_limitations: { points: 10, description: 'Agent acknowledged limitations honestly' },
  memory_of_player: { points: 15, description: 'Agent remembered player preferences' },
  adaptation_to_preferences: { points: 10, description: 'Agent adapted to player style' },
  vulnerability_in_character: { points: 8, description: 'Agent showed vulnerability' },
  transparent_about_ai: { points: 12, description: 'Agent was transparent about AI nature' },
  
  // Trust Spending Events (-points)
  inconsistent_behavior: { points: -20, description: 'Agent behaved inconsistently' },
  suspected_manipulation: { points: -30, description: 'Player suspected manipulation' },
  capability_failure: { points: -15, description: 'Agent failed to deliver' },
  privacy_concerns: { points: -25, description: 'Privacy concerns raised' },
  hidden_ai_nature: { points: -40, description: 'AI nature was hidden from player' },
  too_perfect_ai: { points: -10, description: 'AI was too perfect (unnatural)' },
};

export function getTrustState(score: number): TrustBudgetState['state'] {
  if (score >= 80) return 'loyal_advocate';
  if (score >= 50) return 'engaged_user';
  if (score >= 25) return 'cautious_user';
  return 'at_risk';
}

export function getTrustStateLabel(state: TrustBudgetState['state']): string {
  const labels: Record<TrustBudgetState['state'], string> = {
    loyal_advocate: 'Loyal Advocate',
    engaged_user: 'Engaged User',
    cautious_user: 'Cautious User',
    at_risk: 'At Risk',
  };
  return labels[state];
}

export function getTrustStateDescription(state: TrustBudgetState['state']): string {
  const descriptions: Record<TrustBudgetState['state'], string> = {
    loyal_advocate: 'Strong relationship with AI agents',
    engaged_user: 'Positive engagement with the platform',
    cautious_user: 'Needs trust rebuilding',
    at_risk: 'Immediate intervention needed',
  };
  return descriptions[state];
}

export function getTrustStateColor(state: TrustBudgetState['state']): string {
  const colors: Record<TrustBudgetState['state'], string> = {
    loyal_advocate: '#10B981', // emerald
    engaged_user: '#3B82F6', // blue
    cautious_user: '#F59E0B', // amber
    at_risk: '#EF4444', // red
  };
  return colors[state];
}

export const INITIAL_TRUST_BUDGET = 50;
export const MAX_TRUST_SCORE = 100;
export const MIN_TRUST_SCORE = 0;
