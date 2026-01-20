export { tricksterMonkeyPrompt, type TricksterMonkeyInput } from './trickster-monkey.js';
export { strategistApePrompt, type StrategistApeInput } from './strategist-ape.js';
export { speedyGibbonPrompt, type SpeedyGibbonInput } from './speedy-gibbon.js';
export { guardianGorillaPrompt, type GuardianGorillaInput } from './guardian-gorilla.js';
export { wildcardLemurPrompt, type WildcardLemurInput } from './wildcard-lemur.js';
export { mentorOrangutanPrompt, type MentorOrangutanInput } from './mentor-orangutan.js';
export { championChimpPrompt, type ChampionChimpInput } from './champion-chimp.js';

export interface PersonalityPrompt<TInput, TOutput> {
  name: string;
  description: string;
  systemPrompt: string;
  signature: string;
  formatOutput: (output: unknown) => TOutput;
  validateInput: (input: TInput) => input is TInput;
}

export type PlayerAgentPrompt = 
  | PersonalityPrompt<TricksterMonkeyInput, TricksterMonkeyOutput>
  | PersonalityPrompt<StrategistApeInput, StrategistApeOutput>
  | PersonalityPrompt<SpeedyGibbonInput, SpeedyGibbonOutput>
  | PersonalityPrompt<GuardianGorillaInput, GuardianGorillaOutput>
  | PersonalityPrompt<WildcardLemurInput, WildcardLemurOutput>
  | PersonalityPrompt<MentorOrangutanInput, MentorOrangutanOutput>
  | PersonalityPrompt<ChampionChimpInput, ChampionChimpOutput>;

export interface TricksterMonkeyInput {
  gameState: Record<string, unknown>;
  hand: Array<{ id: string; value: number }>;
  opponents: Array<{ id: string; score: number }>;
  roundNumber: number;
  totalRounds: number;
}

export interface TricksterMonkeyOutput {
  action: 'play_card' | 'pass' | 'special';
  cardId?: string;
  targetId?: string;
  reasoning: string;
  bluffIndicator: number;
  confidence: number;
}

export interface StrategistApeInput {
  gameState: Record<string, unknown>;
  hand: Array<{ id: string; value: number }>;
  opponents: Array<{ id: string; score: number; towerHeight: number }>;
  roundNumber: number;
  totalRounds: number;
  predictedMoves: Array<{ playerId: string; expectedAction: string }>;
}

export interface StrategistApeOutput {
  action: 'play_card' | 'pass' | 'special';
  cardId?: string;
  targetId?: string;
  reasoning: string;
  planPhase: 'early' | 'mid' | 'late';
  longTermStrategy: string;
}

export interface SpeedyGibbonInput {
  gameState: Record<string, unknown>;
  hand: Array<{ id: string; value: number }>;
  opponents: Array<{ id: string; score: number }>;
  timeRemaining: number;
  roundNumber: number;
}

export interface SpeedyGibbonOutput {
  action: 'play_card' | 'pass' | 'special';
  cardId?: string;
  targetId?: string;
  reasoning: string;
  aggressionLevel: number;
  speedDecision: boolean;
}

export interface GuardianGorillaInput {
  gameState: Record<string, unknown>;
  hand: Array<{ id: string; value: number }>;
  opponents: Array<{ id: string; score: number; threatLevel: number }>;
  myTowerHeight: number;
  roundNumber: number;
}

export interface GuardianGorillaOutput {
  action: 'play_card' | 'pass' | 'special' | 'defend';
  cardId?: string;
  targetId?: string;
  reasoning: string;
  defensePriority: number;
  threatMitigation: string;
}

export interface WildcardLemurInput {
  gameState: Record<string, unknown>;
  hand: Array<{ id: string; value: number }>;
  opponents: Array<{ id: string; score: number }>;
  roundNumber: number;
  chaosSeed: number;
}

export interface WildcardLemurOutput {
  action: 'play_card' | 'pass' | 'special' | 'random';
  cardId?: string;
  targetId?: string;
  reasoning: string;
  chaosFactor: number;
  unexpectedMove: boolean;
}

export interface MentorOrangutanInput {
  gameState: Record<string, unknown>;
  hand: Array<{ id: string; value: number }>;
  opponents: Array<{ id: string; score: number; experienceLevel: number }>;
  roundNumber: number;
  isNewPlayer: boolean;
}

export interface MentorOrangutanOutput {
  action: 'play_card' | 'pass' | 'special' | 'teach';
  cardId?: string;
  targetId?: string;
  reasoning: string;
  teachingMoment: boolean;
  helpfulTip?: string;
  encouragement: string;
}

export interface ChampionChimpInput {
  gameState: Record<string, unknown>;
  hand: Array<{ id: string; value: number }>;
  opponents: Array<{ id: string; score: number; ranking: number }>;
  roundNumber: number;
  totalRounds: number;
  currentRank: number;
}

export interface ChampionChimpOutput {
  action: 'play_card' | 'pass' | 'special';
  cardId?: string;
  targetId?: string;
  reasoning: string;
  competitiveMode: boolean;
  winCondition: string;
  clutchFactor: number;
}
