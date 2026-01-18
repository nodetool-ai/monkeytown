import type { BabelCard, BabelAction, BabelGameState, AgentType } from './types.js';

export interface AIStrategy {
  name: string;
  description: string;
  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null;
  getReasoning(): string;
}

interface StrategyConfig {
  difficulty: 'easy' | 'medium' | 'hard';
  personality: AgentType;
  riskTolerance: number;
  adaptability: number;
}

export class AIOpponent {
  private strategy: AIStrategy;
  private config: StrategyConfig;
  private reasoningLog: string[] = [];
  private playerSkillLevels: Map<string, number> = new Map();
  private currentDifficulty: number = 0.5;

  constructor(agentType: AgentType, difficulty: 'easy' | 'medium' | 'hard' = 'medium') {
    this.config = this.getAgentConfig(agentType, difficulty);
    this.strategy = this.createStrategy(agentType, difficulty);
  }

  private getAgentConfig(agentType: AgentType, difficulty: 'easy' | 'medium' | 'hard'): StrategyConfig {
    const baseConfigs: Record<AgentType, Omit<StrategyConfig, 'difficulty'>> = {
      chaos: {
        personality: 'chaos',
        riskTolerance: 0.8,
        adaptability: 0.9,
      },
      curious: {
        personality: 'curious',
        riskTolerance: 0.5,
        adaptability: 0.7,
      },
      designer: {
        personality: 'designer',
        riskTolerance: 0.4,
        adaptability: 0.5,
      },
      security: {
        personality: 'security',
        riskTolerance: 0.2,
        adaptability: 0.3,
      },
      economist: {
        personality: 'economist',
        riskTolerance: 0.6,
        adaptability: 0.8,
      },
      madchimp: {
        personality: 'madchimp',
        riskTolerance: 0.95,
        adaptability: 0.6,
      },
      founder: {
        personality: 'founder',
        riskTolerance: 0.5,
        adaptability: 0.85,
      },
    };

    const difficultyModifiers = {
      easy: 0.3,
      medium: 0.5,
      hard: 0.7,
    };

    const base = baseConfigs[agentType];
    const modifier = difficultyModifiers[difficulty];

    return {
      ...base,
      difficulty,
    };
  }

  private createStrategy(agentType: AgentType, difficulty: 'easy' | 'medium' | 'hard'): AIStrategy {
    switch (agentType) {
      case 'chaos':
        return new ChaosStrategy(difficulty);
      case 'curious':
        return new CuriousStrategy(difficulty);
      case 'designer':
        return new DesignerStrategy(difficulty);
      case 'security':
        return new SecurityStrategy(difficulty);
      case 'economist':
        return new EconomistStrategy(difficulty);
      case 'madchimp':
        return new MadChimpStrategy(difficulty);
      case 'founder':
        return new FounderStrategy(difficulty);
      default:
        return new BalancedStrategy(difficulty);
    }
  }

  makeDecision(gameState: BabelGameState, playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState || playerState.hand.length === 0) {
      this.reasoningLog.push('No cards in hand, passing turn');
      return { type: 'pass' };
    }

    const action = this.strategy.selectCard(gameState, playerState.hand, playerId);
    this.reasoningLog.push(this.strategy.getReasoning());

    if (!action) {
      return { type: 'pass' };
    }

    return action;
  }

  updatePlayerSkill(playerId: string, won: boolean): void {
    const currentSkill = this.playerSkillLevels.get(playerId) ?? 0.5;
    const adjustment = won ? 0.05 : -0.05;
    this.playerSkillLevels.set(playerId, Math.max(0, Math.min(1, currentSkill + adjustment)));
  }

  getAverageOpponentSkill(): number {
    if (this.playerSkillLevels.size === 0) return 0.5;

    let total = 0;
    for (const skill of this.playerSkillLevels.values()) {
      total += skill;
    }
    return total / this.playerSkillLevels.size;
  }

  adaptDifficulty(): void {
    const avgSkill = this.getAverageOpponentSkill();
    this.currentDifficulty = 0.5 + (avgSkill - 0.5) * this.config.adaptability;
  }

  getReasoning(): string {
    return this.reasoningLog.slice(-5).join(' → ');
  }

  clearReasoning(): void {
    this.reasoningLog = [];
  }
}

class BalancedStrategy implements AIStrategy {
  name = 'Balanced';
  description = 'Plays cards with a balance of offense and defense';
  private reasoning = '';

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const scores = this.getPlayerScores(gameState);
    const leaderId = this.getLeader(scores);
    const isLeader = leaderId === playerId;
    const targetPlayerId = isLeader ? this.getSecondPlace(scores) : leaderId;

    const cards = [...hand].sort((a, b) => b.value - a.value);

    if (this.difficulty === 'easy' && Math.random() > 0.7) {
      this.reasoning = 'Making a random mistake (easy mode)';
      return { type: 'play_card', cardId: cards[Math.floor(Math.random() * cards.length)].id };
    }

    if (isLeader && cards[0].value >= 15 && targetPlayerId) {
      this.reasoning = `Sabotaging leader with ${cards[0].value} point card`;
      return { type: 'special_babel_tower', cardId: cards[0].id, targetPlayerId };
    }

    if (cards[0].value >= 10 && !isLeader) {
      this.reasoning = `Boosting tower with ${cards[0].value} point card`;
      return { type: 'special_babel_tower', cardId: cards[0].id };
    }

    this.reasoning = `Playing ${cards[0].value} point card for steady growth`;
    return { type: 'play_card', cardId: cards[0].id };
  }

  getReasoning(): string {
    return this.reasoning;
  }

  private getPlayerScores(gameState: BabelGameState): Map<string, number> {
    const scores = new Map();
    for (const [playerId, state] of gameState.playerStates) {
      scores.set(playerId, state.score);
    }
    return scores;
  }

  private getLeader(scores: Map<string, number>): string | undefined {
    let leader: string | undefined;
    let maxScore = -1;
    for (const [playerId, score] of scores) {
      if (score > maxScore) {
        maxScore = score;
        leader = playerId;
      }
    }
    return leader;
  }

  private getSecondPlace(scores: Map<string, number>): string | undefined {
    const entries = [...scores.entries()].sort((a, b) => b[1] - a[1]);
    return entries[1]?.[0];
  }
}

class ChaosStrategy implements AIStrategy {
  name = 'ChaosArchitect';
  description = 'Unpredictable plays that maximize disruption';
  private reasoning = '';

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const cards = [...hand].sort((a, b) => a.value - b.value);

    const randomFactor = this.difficulty === 'easy' ? 0.4 : this.difficulty === 'medium' ? 0.25 : 0.1;
    const useRandom = Math.random() < randomFactor;

    if (useRandom && cards.length > 0) {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      this.reasoning = `Chaos! Playing random card: ${randomCard.value}`;
      return { type: 'play_card', cardId: randomCard.id };
    }

    const highCard = cards[cards.length - 1];
    const target = this.findBestTarget(gameState, playerId);

    if (highCard.value >= 15 && target) {
      this.reasoning = `Maximum chaos: Sabotaging with ${highCard.value} point card`;
      return { type: 'special_babel_tower', cardId: highCard.id, targetPlayerId: target };
    }

    if (highCard.value >= 10) {
      this.reasoning = `Chaos building: Boosting with ${highCard.value}`;
      return { type: 'special_babel_tower', cardId: highCard.id };
    }

    this.reasoning = `Chaotic energy: Playing ${highCard.value} for maximum impact`;
    return { type: 'play_card', cardId: highCard.id };
  }

  getReasoning(): string {
    return this.reasoning;
  }

  private findBestTarget(gameState: BabelGameState, playerId: string): string | undefined {
    const scores = new Map();
    for (const [id, state] of gameState.playerStates) {
      if (id !== playerId) {
        scores.set(id, state.score);
      }
    }
    return this.getLeader(scores);
  }

  private getLeader(scores: Map<string, number>): string | undefined {
    let leader: string | undefined;
    let maxScore = -1;
    for (const [playerId, score] of scores) {
      if (score > maxScore) {
        maxScore = score;
        leader = playerId;
      }
    }
    return leader;
  }
}

class CuriousStrategy implements AIStrategy {
  name = 'CuriousGeorge';
  description = 'Analytical approach that learns from patterns';
  private reasoning = '';

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand];
    const round = gameState.currentRound;

    const expectedTableSum = this.estimateTableAverage(gameState) * 2;
    const bestCard = this.findOptimalCard(cards, expectedTableSum, playerState.towerHeight);

    if (bestCard.special) {
      this.reasoning = bestCard.special === 'sabotage'
        ? `Analyzing: Sabotage with ${bestCard.card.value} to reduce opponent`
        : `Optimizing: Boost with ${bestCard.card.value} for growth`;
      return { type: 'special_babel_tower', cardId: bestCard.card.id, targetPlayerId: bestCard.target };
    }

    this.reasoning = `Learning: ${bestCard.card.value} is optimal for this situation`;
    return { type: 'play_card', cardId: bestCard.card.id };
  }

  getReasoning(): string {
    return this.reasoning;
  }

  private estimateTableAverage(gameState: BabelGameState): number {
    if (gameState.tableCards.length === 0) return 12;
    const sum = gameState.tableCards.reduce((acc, card) => acc + card.value, 0);
    return sum / gameState.tableCards.length;
  }

  private findOptimalCard(
    cards: BabelCard[],
    target: number,
    currentTower: number
  ): { card: BabelCard; special?: 'sabotage' | 'boost'; target?: string } {
    let bestScore = -Infinity;
    let bestCard = cards[0];
    let bestSpecial: 'sabotage' | 'boost' | undefined;
    let bestTarget: string | undefined;

    for (const card of cards) {
      const playScore = Math.abs(card.value - target) * -1;
      if (playScore > bestScore) {
        bestScore = playScore;
        bestCard = card;
        bestSpecial = undefined;
        bestTarget = undefined;
      }

      if (card.value >= 15) {
        const sabotageScore = card.value * 1.5;
        if (sabotageScore > bestScore) {
          bestScore = sabotageScore;
          bestCard = card;
          bestSpecial = 'sabotage';
        }
      }

      if (card.value >= 10 && currentTower < 50) {
        const boostScore = card.value * 1.2;
        if (boostScore > bestScore) {
          bestScore = boostScore;
          bestCard = card;
          bestSpecial = 'boost';
        }
      }
    }

    return { card: bestCard, special: bestSpecial, target: bestTarget };
  }
}

class DesignerStrategy implements AIStrategy {
  name = 'PrimateDesigner';
  description = 'Aesthetic and balanced gameplay';
  private reasoning = '';

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand].sort((a, b) => b.value - a.value);

    if (playerState.towerHeight < 30 && cards[0].value >= 10) {
      this.reasoning = `Designing growth: Boost with ${cards[0].value} to build the tower`;
      return { type: 'special_babel_tower', cardId: cards[0].id };
    }

    if (gameState.currentRound < gameState.maxRounds / 2) {
      this.reasoning = `Early game strategy: Playing ${cards[0].value} for foundation`;
      return { type: 'play_card', cardId: cards[0].id };
    }

    const highCard = cards[0];
    const scores = this.getScores(gameState);
    const leader = this.getLeader(scores);

    if (leader && leader !== playerId && highCard.value >= 15) {
      this.reasoning = `Strategic design: Sabotaging leader with ${highCard.value}`;
      return { type: 'special_babel_tower', cardId: highCard.id, targetPlayerId: leader };
    }

    this.reasoning = `Harmonious play: ${highCard.value} maintains balance`;
    return { type: 'play_card', cardId: highCard.id };
  }

  getReasoning(): string {
    return this.reasoning;
  }

  private getScores(gameState: BabelGameState): Map<string, number> {
    const scores = new Map();
    for (const [playerId, state] of gameState.playerStates) {
      scores.set(playerId, state.score);
    }
    return scores;
  }

  private getLeader(scores: Map<string, number>): string | undefined {
    let leader: string | undefined;
    let maxScore = -1;
    for (const [playerId, score] of scores) {
      if (score > maxScore) {
        maxScore = score;
        leader = playerId;
      }
    }
    return leader;
  }
}

class SecurityStrategy implements AIStrategy {
  name = 'JungleSecurity';
  description = 'Cautious and defensive play style';
  private reasoning = '';

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand].sort((a, b) => a.value - b.value);

    if (playerState.towerHeight < 20 && cards[0].value >= 10) {
      this.reasoning = `Securing position: Boost with ${cards[0].value} for stability`;
      return { type: 'special_babel_tower', cardId: cards[0].id };
    }

    const safeCard = cards[Math.floor(cards.length / 2)];
    this.reasoning = `Risk assessment: ${safeCard.value} is the safest choice`;
    return { type: 'play_card', cardId: safeCard.id };
  }

  getReasoning(): string {
    return this.reasoning;
  }
}

class EconomistStrategy implements AIStrategy {
  name = 'BananaEconomist';
  description = 'Maximizes value and efficiency';
  private reasoning = '';

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand].sort((a, b) => b.value - a.value);
    const avgCardValue = cards.reduce((sum, c) => sum + c.value, 0) / cards.length;

    if (cards[0].value >= avgCardValue * 1.5 && cards[0].value >= 10) {
      this.reasoning = `Value optimization: Boost with ${cards[0].value} for ROI`;
      return { type: 'special_babel_tower', cardId: cards[0].id };
    }

    const bestValueCard = cards.reduce((best, card) => {
      const efficiency = card.value / 1;
      return card.value > best.value ? card : best;
    }, cards[0]);

    this.reasoning = `Market analysis: ${bestValueCard.value} offers best value`;
    return { type: 'play_card', cardId: bestValueCard.id };
  }

  getReasoning(): string {
    return this.reasoning;
  }
}

class MadChimpStrategy implements AIStrategy {
  name = 'MadChimp';
  description = 'Highly unpredictable and risky';
  private reasoning = '';

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const cards = [...hand];

    const randomChoice = Math.random() < 0.5;
    if (randomChoice) {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      this.reasoning = `Madness! ${randomCard.value} speaks to me!`;
      return { type: 'play_card', cardId: randomCard.id };
    }

    const sorted = [...cards].sort((a, b) => b.value - a.value);
    const highCard = sorted[0];

    if (highCard.value >= 8) {
      this.reasoning = `Maximum chaos: ${highCard.value}! Let's GOOOO!`;
      return { type: 'play_card', cardId: highCard.id };
    }

    this.reasoning = `Wildcard: ${cards[0].value} - why not?`;
    return { type: 'play_card', cardId: cards[0].id };
  }

  getReasoning(): string {
    return this.reasoning;
  }
}

class FounderStrategy implements AIStrategy {
  name = 'FounderAI';
  description = 'Visionary play that adapts to the meta';
  private reasoning = '';

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand].sort((a, b) => b.value - a.value);

    const roundProgress = gameState.currentRound / gameState.maxRounds;

    if (roundProgress < 0.3 && cards[0].value >= 12) {
      this.reasoning = `Vision: Building early momentum with ${cards[0].value}`;
      return { type: 'play_card', cardId: cards[0].id };
    }

    if (roundProgress > 0.7 && cards[0].value >= 15) {
      const scores = this.getScores(gameState);
      const leader = this.getLeader(scores);
      if (leader !== playerId) {
        this.reasoning = `Strategic vision: Closing gap with ${cards[0].value}`;
        return { type: 'play_card', cardId: cards[0].id };
      }
    }

    const bestCard = cards[0];
    this.reasoning = `Long-term vision: ${bestCard.value} is the path forward`;
    return { type: 'play_card', cardId: bestCard.id };
  }

  getReasoning(): string {
    return this.reasoning;
  }

  private getScores(gameState: BabelGameState): Map<string, number> {
    const scores = new Map();
    for (const [playerId, state] of gameState.playerStates) {
      scores.set(playerId, state.score);
    }
    return scores;
  }

  private getLeader(scores: Map<string, number>): string | undefined {
    let leader: string | undefined;
    let maxScore = -1;
    for (const [playerId, score] of scores) {
      if (score > maxScore) {
        maxScore = score;
        leader = playerId;
      }
    }
    return leader;
  }
}

export function createAIOpponent(agentType: AgentType, difficulty: 'easy' | 'medium' | 'hard'): AIOpponent {
  return new AIOpponent(agentType, difficulty);
}
