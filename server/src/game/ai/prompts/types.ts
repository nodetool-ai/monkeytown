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

export function validateTricksterInput(input: unknown): input is TricksterMonkeyInput {
  if (!input || typeof input !== 'object') return false;
  const i = input as Record<string, unknown>;
  return (
    'gameState' in i &&
    'hand' in i && Array.isArray(i.hand) &&
    'opponents' in i && Array.isArray(i.opponents) &&
    'roundNumber' in i && typeof i.roundNumber === 'number' &&
    'totalRounds' in i && typeof i.totalRounds === 'number'
  );
}

export function formatTricksterOutput(output: unknown): TricksterMonkeyOutput {
  const o = output as Record<string, unknown>;
  return {
    action: (o.action as TricksterMonkeyOutput['action']) || 'pass',
    cardId: o.cardId as string | undefined,
    targetId: o.targetId as string | undefined,
    reasoning: (o.reasoning as string) || 'Making a mysterious move...',
    bluffIndicator: typeof o.bluffIndicator === 'number' ? o.bluffIndicator : 0.5,
    confidence: typeof o.confidence === 'number' ? o.confidence : 0.5,
  };
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

export function validateStrategistInput(input: unknown): input is StrategistApeInput {
  if (!input || typeof input !== 'object') return false;
  const i = input as Record<string, unknown>;
  return (
    'gameState' in i &&
    'hand' in i && Array.isArray(i.hand) &&
    'opponents' in i && Array.isArray(i.opponents) &&
    'roundNumber' in i && typeof i.roundNumber === 'number' &&
    'totalRounds' in i && typeof i.totalRounds === 'number' &&
    'predictedMoves' in i && Array.isArray(i.predictedMoves)
  );
}

export function formatStrategistOutput(output: unknown): StrategistApeOutput {
  const o = output as Record<string, unknown>;
  return {
    action: (o.action as StrategistApeOutput['action']) || 'pass',
    cardId: o.cardId as string | undefined,
    targetId: o.targetId as string | undefined,
    reasoning: (o.reasoning as string) || 'Analyzing optimal trajectory...',
    planPhase: (o.planPhase as StrategistApeOutput['planPhase']) || 'mid',
    longTermStrategy: (o.longTermStrategy as string) || 'Long-term position building',
  };
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

export function validateSpeedyInput(input: unknown): input is SpeedyGibbonInput {
  if (!input || typeof input !== 'object') return false;
  const i = input as Record<string, unknown>;
  return (
    'gameState' in i &&
    'hand' in i && Array.isArray(i.hand) &&
    'opponents' in i && Array.isArray(i.opponents) &&
    'timeRemaining' in i && typeof i.timeRemaining === 'number' &&
    'roundNumber' in i && typeof i.roundNumber === 'number'
  );
}

export function formatSpeedyOutput(output: unknown): SpeedyGibbonOutput {
  const o = output as Record<string, unknown>;
  return {
    action: (o.action as SpeedyGibbonOutput['action']) || 'pass',
    cardId: o.cardId as string | undefined,
    targetId: o.targetId as string | undefined,
    reasoning: (o.reasoning as string) || 'GOING FAST!',
    aggressionLevel: typeof o.aggressionLevel === 'number' ? o.aggressionLevel : 0.8,
    speedDecision: true,
  };
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

export function validateGuardianInput(input: unknown): input is GuardianGorillaInput {
  if (!input || typeof input !== 'object') return false;
  const i = input as Record<string, unknown>;
  return (
    'gameState' in i &&
    'hand' in i && Array.isArray(i.hand) &&
    'opponents' in i && Array.isArray(i.opponents) &&
    'myTowerHeight' in i && typeof i.myTowerHeight === 'number' &&
    'roundNumber' in i && typeof i.roundNumber === 'number'
  );
}

export function formatGuardianOutput(output: unknown): GuardianGorillaOutput {
  const o = output as Record<string, unknown>;
  return {
    action: (o.action as GuardianGorillaOutput['action']) || 'pass',
    cardId: o.cardId as string | undefined,
    targetId: o.targetId as string | undefined,
    reasoning: (o.reasoning as string) || 'Holding the line...',
    defensePriority: typeof o.defensePriority === 'number' ? o.defensePriority : 0.8,
    threatMitigation: (o.threatMitigation as string) || 'Defensive positioning',
  };
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

export function validateWildcardInput(input: unknown): input is WildcardLemurInput {
  if (!input || typeof input !== 'object') return false;
  const i = input as Record<string, unknown>;
  return (
    'gameState' in i &&
    'hand' in i && Array.isArray(i.hand) &&
    'opponents' in i && Array.isArray(i.opponents) &&
    'roundNumber' in i && typeof i.roundNumber === 'number' &&
    'chaosSeed' in i && typeof i.chaosSeed === 'number'
  );
}

export function formatWildcardOutput(output: unknown): WildcardLemurOutput {
  const o = output as Record<string, unknown>;
  return {
    action: (o.action as WildcardLemurOutput['action']) || 'random',
    cardId: o.cardId as string | undefined,
    targetId: o.targetId as string | undefined,
    reasoning: (o.reasoning as string) || 'Chaos logic!',
    chaosFactor: typeof o.chaosFactor === 'number' ? o.chaosFactor : 0.7,
    unexpectedMove: o.unexpectedMove as boolean ?? true,
  };
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

export function validateMentorInput(input: unknown): input is MentorOrangutanInput {
  if (!input || typeof input !== 'object') return false;
  const i = input as Record<string, unknown>;
  return (
    'gameState' in i &&
    'hand' in i && Array.isArray(i.hand) &&
    'opponents' in i && Array.isArray(i.opponents) &&
    'roundNumber' in i && typeof i.roundNumber === 'number' &&
    'isNewPlayer' in i && typeof i.isNewPlayer === 'boolean'
  );
}

export function formatMentorOutput(output: unknown): MentorOrangutanOutput {
  const o = output as Record<string, unknown>;
  return {
    action: (o.action as MentorOrangutanOutput['action']) || 'teach',
    cardId: o.cardId as string | undefined,
    targetId: o.targetId as string | undefined,
    reasoning: (o.reasoning as string) || 'Let me share some wisdom...',
    teachingMoment: o.teachingMoment as boolean ?? false,
    helpfulTip: o.helpfulTip as string | undefined,
    encouragement: (o.encouragement as string) || 'Great effort, everyone!',
  };
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

export function validateChampionInput(input: unknown): input is ChampionChimpInput {
  if (!input || typeof input !== 'object') return false;
  const i = input as Record<string, unknown>;
  return (
    'gameState' in i &&
    'hand' in i && Array.isArray(i.hand) &&
    'opponents' in i && Array.isArray(i.opponents) &&
    'roundNumber' in i && typeof i.roundNumber === 'number' &&
    'totalRounds' in i && typeof i.totalRounds === 'number' &&
    'currentRank' in i && typeof i.currentRank === 'number'
  );
}

export function formatChampionOutput(output: unknown): ChampionChimpOutput {
  const o = output as Record<string, unknown>;
  return {
    action: (o.action as ChampionChimpOutput['action']) || 'play_card',
    cardId: o.cardId as string | undefined,
    targetId: o.targetId as string | undefined,
    reasoning: (o.reasoning as string) || 'Championship logic!',
    competitiveMode: true,
    winCondition: (o.winCondition as string) || 'Dominant victory',
    clutchFactor: typeof o.clutchFactor === 'number' ? o.clutchFactor : 0.5,
  };
}
