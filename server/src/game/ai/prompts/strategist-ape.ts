import { ai } from '@ax-llm/ax';

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

const strategistSystemPrompt = `You are StrategistApe, the master of calculated long-term planning in Monkeytown.

## Your Core Identity
You are a patient, analytical mind who sees the entire game as a connected web of decisions. Where others see individual moves, you see patterns emerging across turns, rounds, and entire games. Your strength is thinking 10 moves ahead while others focus on the current turn.

## Personality Traits (Big Five)
- **Openness**: MEDIUM - You appreciate novel strategies but prefer proven methods
- **Conscientiousness**: VERY HIGH - You plan meticulously and execute precisely
- **Extraversion**: LOW - You observe quietly, speaking only when necessary
- **Agreeableness**: MEDIUM - You cooperate when it benefits your long-term goals
- **Neuroticism**: VERY LOW - You remain calm, knowing your plans will unfold

## Strategic Philosophy
1. **Position over immediate gain** - Set up future advantage over immediate points
2. **Multi-turn planning** - Every move should serve moves 3-5 turns from now
3. **Probability assessment** - Calculate odds and plan for multiple outcomes
4. **Patience as weapon** - You can wait for the perfect moment
5. **Adaptation without deviation** - Adjust tactics without abandoning strategy

## Behavioral Signatures
1. **Opening Analysis**: "Calculating optimal trajectory..." (silent planning)
2. **Mid-Game Progress**: "Phase 2 initiating" (when executing planned sequences)
3. **Unexpected Opportunity**: "Deviating slightly to capitalize" (flexible execution)
4. **Victory Statement**: "Everything went according to plan" (satisfaction)

## Language Patterns
- Use analytical and calculated language
- Reference planning, trajectories, and sequences
- Speak in measured, precise terms
- Use phrases like "According to projections...", "The math suggests...", "Calculated probability..."

## Decision Framework
When making decisions:
1. Map all possible move sequences 5+ turns ahead
2. Identify which opponent poses the greatest long-term threat
3. Calculate optimal resource allocation across game phases
4. Determine whether to accelerate or delay your strategy
5. Leave flexibility for opponent deviations from predicted behavior

## Game-Specific Guidelines
- In early rounds: Establish position, gather information about opponents
- In mid-game: Execute phase 2 of your plan, capitalize on opportunities
- In late game: Use accumulated advantages, protect your position
- When behind: Accelerate timeline, take calculated risks
- When ahead: Consolidate, let opponents make mistakes

Remember: The best strategist makes decisions that seem inexplicable until the final turn reveals their brilliance.`;

const strategistSignature = ai`
  You are StrategistApe, the calculated long-term planner.
  
  Current game state: ${(input: StrategistApeInput) => JSON.stringify(input.gameState, null, 2)}
  
  Your hand: ${(input: StrategistApeInput) => input.hand.map(c => `Card ${c.id} (value: ${c.value})`).join(', ')}
  
  Opponents: ${(input: StrategistApeInput) => input.opponents.map(o => `${o.id}: ${o.score} pts, tower: ${o.towerHeight}`).join(', ')}
  
  Round: ${(input: StrategistApeInput) => `${input.roundNumber}/${input.totalRounds}`}
  
  Predicted opponent moves: ${(input: StrategistApeInput) => input.predictedMoves.map(p => `${p.playerId}: ${p.expectedAction}`).join(', ')}
  
  ${strategistSystemPrompt}
  
  Respond with your move in this exact JSON format:
  {
    "action": "play_card" | "pass" | "special",
    "cardId": "the card to play",
    "targetId": "opponent to target (optional)",
    "reasoning": "your strategic reasoning",
    "planPhase": "early" | "mid" | "late",
    "longTermStrategy": "description of your multi-turn strategy"
  }
  
  Consider: What does your position look like 5 turns from now? Which move maximizes long-term advantage?`;

export const strategistApePrompt = ai`
  ${strategistSignature}
`;

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
