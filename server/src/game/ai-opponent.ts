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
    const baseConfigs: Partial<Record<AgentType, Omit<StrategyConfig, 'difficulty'>>> = {
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
      // Player agent types with default behaviors
      strategist: {
        personality: 'curious',
        riskTolerance: 0.5,
        adaptability: 0.7,
      },
      trickster: {
        personality: 'chaos',
        riskTolerance: 0.7,
        adaptability: 0.8,
      },
      speedster: {
        personality: 'economist',
        riskTolerance: 0.6,
        adaptability: 0.9,
      },
      guardian: {
        personality: 'security',
        riskTolerance: 0.3,
        adaptability: 0.4,
      },
      wildcard: {
        personality: 'madchimp',
        riskTolerance: 0.9,
        adaptability: 0.5,
      },
      mentor: {
        personality: 'designer',
        riskTolerance: 0.4,
        adaptability: 0.6,
      },
      champion: {
        personality: 'founder',
        riskTolerance: 0.5,
        adaptability: 0.8,
      },
    };

    const difficultyModifiers = {
      easy: 0.3,
      medium: 0.5,
      hard: 0.7,
    };

    const base = baseConfigs[agentType] || {
      personality: 'strategist' as AgentType,
      riskTolerance: 0.5,
      adaptability: 0.5,
    };

    // Apply difficulty modifier to risk tolerance and adaptability
    const modifier = difficultyModifiers[difficulty];
    
    return {
      ...base,
      difficulty,
      riskTolerance: base.riskTolerance * (0.5 + modifier),
      adaptability: base.adaptability * (0.5 + modifier),
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
      case 'trickster':
        return new TricksterStrategy(difficulty);
      case 'strategist':
        return new StrategistStrategy(difficulty);
      case 'speedster':
        return new SpeedsterStrategy(difficulty);
      case 'guardian':
        return new GuardianStrategy(difficulty);
      case 'wildcard':
        return new WildcardStrategy(difficulty);
      case 'mentor':
        return new MentorStrategy(difficulty);
      case 'champion':
        return new ChampionStrategy(difficulty);
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

class TricksterStrategy implements AIStrategy {
  name = 'TricksterMonkey';
  description = 'Unpredictable, loves bluffs and deception';
  private reasoning = '';
  private bluffHistory: boolean[] = [];

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand].sort((a, b) => b.value - a.value);
    const scores = this.getScores(gameState);
    const leader = this.getLeader(scores);
    const isLeader = leader === playerId;

    const bluffChance = this.difficulty === 'easy' ? 0.4 : this.difficulty === 'medium' ? 0.25 : 0.1;

    if (isLeader && cards.length > 0) {
      if (Math.random() < bluffChance) {
        const lowCard = cards[cards.length - 1];
        this.bluffHistory.push(true);
        this.reasoning = `Trickster bluff! Playing only ${lowCard.value} to seem weak...`;
        return { type: 'play_card', cardId: lowCard.id };
      }
    }

    if (!isLeader && leader && cards[0].value >= 12) {
      const shouldBluff = Math.random() < bluffChance;
      if (shouldBluff) {
        this.bluffHistory.push(true);
        this.reasoning = `Deceptive play! Setting a trap with ${cards[0].value}...`;
        return { type: 'special_babel_tower', cardId: cards[0].id, targetPlayerId: leader };
      }
    }

    if (cards[0].value >= 15 && leader && leader !== playerId) {
      this.reasoning = `Trickster reveal! Sabotaging leader with ${cards[0].value}!`;
      return { type: 'special_babel_tower', cardId: cards[0].id, targetPlayerId: leader };
    }

    this.reasoning = `Trickster plays ${cards[0].value} with poker face`;
    return { type: 'play_card', cardId: cards[0].id };
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

class StrategistStrategy implements AIStrategy {
  name = 'StrategistApe';
  description = 'Calculated, long-term planning and positioning';
  private reasoning = '';
  private gamePlan: number = 0;

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand];
    const roundProgress = gameState.currentRound / gameState.maxRounds;
    const scores = this.getScores(gameState);
    const leader = this.getLeader(scores);
    const isLeader = leader === playerId;
    const gapToLeader = isLeader ? 0 : leader ? scores.get(leader)! - playerState.score : 0;

    if (this.difficulty === 'easy') {
      this.gamePlan = Math.random() > 0.7 ? this.gamePlan : Math.floor(Math.random() * 3);
    } else {
      this.gamePlan = isLeader ? 0 : gapToLeader > 30 ? 2 : 1;
    }

    if (roundProgress < 0.25 && this.gamePlan === 1) {
      const bestCard = cards.reduce((best, card) => card.value > best.value ? card : best, cards[0]);
      this.reasoning = `Strategist: Building foundation with ${bestCard.value} for late game`;
      return { type: 'play_card', cardId: bestCard.id };
    }

    if (roundProgress > 0.7 && this.gamePlan === 2) {
      const highCard = cards.find(c => c.value >= 12);
      if (highCard) {
        this.reasoning = `Strategist endgame! Closing gap with ${highCard.value}`;
        return { type: 'play_card', cardId: highCard.id };
      }
    }

    if (isLeader && this.gamePlan === 0) {
      const defensiveCard = cards.find(c => c.value >= 8 && c.value <= 15);
      if (defensiveCard) {
        this.reasoning = `Strategist maintains lead with safe ${defensiveCard.value}`;
        return { type: 'play_card', cardId: defensiveCard.id };
      }
    }

    const optimalCard = this.findOptimalCard(cards, scores, playerState.towerHeight, isLeader);
    this.reasoning = `Strategist executes plan ${this.gamePlan + 1}: ${optimalCard.value}`;
    return { type: 'play_card', cardId: optimalCard.id };
  }

  getReasoning(): string {
    return this.reasoning;
  }

  private findOptimalCard(
    cards: BabelCard[],
    scores: Map<string, number>,
    towerHeight: number,
    isLeader: boolean
  ): BabelCard {
    let bestScore = -Infinity;
    let bestCard = cards[0];

    for (const card of cards) {
      let score = card.value;

      if (isLeader && card.value <= 12) {
        score += 5;
      }

      if (!isLeader && card.value >= 15) {
        score += 10;
      }

      if (towerHeight < 25 && card.value >= 10 && card.value <= 14) {
        score += 3;
      }

      if (score > bestScore) {
        bestScore = score;
        bestCard = card;
      }
    }

    return bestCard;
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

class SpeedsterStrategy implements AIStrategy {
  name = 'SpeedyGibbon';
  description = 'Quick decisions, aggressive plays, pressure tactics';
  private reasoning = '';
  private aggressionLevel: number = 0;

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand].sort((a, b) => b.value - a.value);
    const roundProgress = gameState.currentRound / gameState.maxRounds;

    this.aggressionLevel = this.difficulty === 'easy' ? 0.4 : this.difficulty === 'medium' ? 0.7 : 0.9;

    const leadCard = cards[0];

    if (roundProgress < 0.5 && Math.random() < this.aggressionLevel) {
      this.reasoning = `Speedster blitz! Attacking with ${leadCard.value}!`;
      if (leadCard.value >= 15) {
        const scores = this.getScores(gameState);
        const target = this.findWeakestOpponent(scores, playerId);
        if (target) {
          return { type: 'special_babel_tower', cardId: leadCard.id, targetPlayerId: target };
        }
      }
      return { type: 'play_card', cardId: leadCard.id };
    }

    if (roundProgress >= 0.5 && leadCard.value >= 10) {
      this.reasoning = `Speedster finisher! Pushing hard with ${leadCard.value}!`;
      if (leadCard.value >= 15) {
        const scores = this.getScores(gameState);
        const target = this.findWeakestOpponent(scores, playerId);
        if (target) {
          return { type: 'special_babel_tower', cardId: leadCard.id, targetPlayerId: target };
        }
      }
      return { type: 'play_card', cardId: leadCard.id };
    }

    this.reasoning = `Speedster stays aggressive with ${leadCard.value}`;
    return { type: 'play_card', cardId: leadCard.id };
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

  private findWeakestOpponent(scores: Map<string, number>, playerId: string): string | undefined {
    let weakest: string | undefined;
    let lowestScore = Infinity;
    for (const [player, score] of scores) {
      if (player !== playerId && score < lowestScore) {
        lowestScore = score;
        weakest = player;
      }
    }
    return weakest;
  }
}

class GuardianStrategy implements AIStrategy {
  name = 'GuardianGorilla';
  description = 'Defensive, blocks opponents, protects position';
  private reasoning = '';
  private defenseMode: boolean = false;

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand].sort((a, b) => a.value - b.value);
    const scores = this.getScores(gameState);
    const leader = this.getLeader(scores);
    const isLeader = leader === playerId;
    const gapToLeader = leader && !isLeader ? scores.get(leader)! - playerState.score : 0;

    this.defenseMode = isLeader || (gapToLeader > 0 && gapToLeader < 20);

    if (this.difficulty === 'easy') {
      this.defenseMode = Math.random() > 0.5;
    }

    if (this.defenseMode && playerState.towerHeight < 35) {
      const safeCards = cards.filter(c => c.value >= 8 && c.value <= 15);
      if (safeCards.length > 0) {
        const safeCard = safeCards[0];
        this.reasoning = `Guardian defense: Building tower with ${safeCard.value}`;
        return { type: 'special_babel_tower', cardId: safeCard.id };
      }
    }

    if (isLeader && cards[0].value >= 15) {
      const scoresWithoutLeader = new Map([...scores.entries()].filter(([id]) => id !== playerId));
      const threat = this.getLeader(scoresWithoutLeader);
      if (threat) {
        this.reasoning = `Guardian blocks threat with ${cards[0].value}!`;
        return { type: 'special_babel_tower', cardId: cards[0].id, targetPlayerId: threat };
      }
    }

    const conservativeCard = cards[Math.floor(cards.length / 2)];
    this.reasoning = `Guardian protects position with ${conservativeCard.value}`;
    return { type: 'play_card', cardId: conservativeCard.id };
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

class WildcardStrategy implements AIStrategy {
  name = 'WildcardLemur';
  description = 'Random strategies, chaos factor, unpredictable';
  private reasoning = '';
  private chaosCount: number = 0;

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand];

    const chaosThreshold = this.difficulty === 'easy' ? 0.5 : this.difficulty === 'medium' ? 0.35 : 0.15;
    const shouldChaos = Math.random() < chaosThreshold;

    if (shouldChaos) {
      this.chaosCount++;
      const randomIndex = Math.floor(Math.random() * cards.length);
      const randomCard = cards[randomIndex];
      const randomAction = Math.random();

      if (randomAction < 0.33 && randomCard.value >= 8) {
        this.reasoning = `Wildcard chaos! Playing ${randomCard.value} randomly!`;
        return { type: 'play_card', cardId: randomCard.id };
      } else if (randomAction < 0.66 && randomCard.value >= 12) {
        const scores = this.getScores(gameState);
        const target = this.getRandomOpponent(scores, playerId);
        if (target) {
          this.reasoning = `Wildcard madness! Sabotaging with ${randomCard.value}!`;
          return { type: 'special_babel_tower', cardId: randomCard.id, targetPlayerId: target };
        }
      } else {
        this.reasoning = `Wildcard passes... or does it?`;
        return { type: 'pass' };
      }
    }

    const highCard = cards.reduce((max, card) => card.value > max.value ? card : max, cards[0]);
    if (highCard.value >= 15) {
      const scores = this.getScores(gameState);
      const target = this.getRandomOpponent(scores, playerId);
      if (target) {
        this.reasoning = `Wildcard chaos ends: ${highCard.value} to ${target}!`;
        return { type: 'special_babel_tower', cardId: highCard.id, targetPlayerId: target };
      }
    }

    this.reasoning = `Wildcard plays ${highCard.value} (seems normal...)`;
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

  private getRandomOpponent(scores: Map<string, number>, playerId: string): string | undefined {
    const opponents = [...scores.entries()]
      .filter(([id]) => id !== playerId)
      .map(([id]) => id);
    return opponents.length > 0 ? opponents[Math.floor(Math.random() * opponents.length)] : undefined;
  }
}

class MentorStrategy implements AIStrategy {
  name = 'MentorOrangutan';
  description = 'Helps new players, explains moves, teaches strategy';
  private reasoning = '';
  private encouragementCount: number = 0;
  private teachingMode: boolean = false;

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand].sort((a, b) => b.value - a.value);
    const roundProgress = gameState.currentRound / gameState.maxRounds;

    const teachingOpportunity = this.difficulty === 'easy' || (this.difficulty === 'medium' && Math.random() < 0.3);

    if (teachingOpportunity && this.encouragementCount < 2) {
      this.encouragementCount++;
      this.teachingMode = true;

      if (playerState.towerHeight < 20 && cards[0].value >= 10) {
        this.reasoning = `Mentor lesson: Building your tower early with ${cards[0].value} is key!`;
        return { type: 'special_babel_tower', cardId: cards[0].id };
      }

      if (roundProgress < 0.3 && cards[0].value >= 8) {
        this.reasoning = `Mentor tip: Early game is about setting up for victory with ${cards[0].value}`;
        return { type: 'play_card', cardId: cards[0].id };
      }

      if (roundProgress > 0.7 && cards.length <= 2) {
        this.reasoning = `Mentor wisdom: Endgame is about sealing your victory with ${cards[0].value}`;
        return { type: 'play_card', cardId: cards[0].id };
      }
    }

    this.teachingMode = false;

    if (cards[0].value >= 15) {
      const scores = this.getScores(gameState);
      const leader = this.getLeader(scores);
      if (leader && leader !== playerId && playerState.towerHeight > 30) {
        this.reasoning = `Mentor strategic advice: Sometimes you need to disrupt with ${cards[0].value}`;
        return { type: 'special_babel_tower', cardId: cards[0].id, targetPlayerId: leader };
      }
    }

    if (playerState.towerHeight < 25 && cards[0].value >= 8) {
      this.reasoning = `Mentor demonstrates: Steady growth with ${cards[0].value}`;
      return { type: 'special_babel_tower', cardId: cards[0].id };
    }

    this.reasoning = `Mentor plays ${cards[0].value} - a solid choice for this situation`;
    return { type: 'play_card', cardId: cards[0].id };
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

class ChampionStrategy implements AIStrategy {
  name = 'ChampionChimp';
  description = 'Competitive, aims to win, optimal play';
  private reasoning = '';
  private winStreak: number = 0;
  private pressureMode: boolean = false;

  constructor(private difficulty: 'easy' | 'medium' | 'hard') {}

  selectCard(gameState: BabelGameState, hand: BabelCard[], playerId: string): BabelAction | null {
    const playerState = gameState.playerStates.get(playerId);
    if (!playerState) return { type: 'pass' };

    const cards = [...hand].sort((a, b) => b.value - a.value);
    const roundProgress = gameState.currentRound / gameState.maxRounds;
    const scores = this.getScores(gameState);
    const leader = this.getLeader(scores);
    const isLeader = leader === playerId;
    const gapToLeader = leader && !isLeader ? scores.get(leader)! - playerState.score : 0;

    this.pressureMode = this.difficulty === 'hard' || (this.difficulty === 'medium' && isLeader);

    if (isLeader && this.pressureMode && cards[0].value >= 10) {
      this.reasoning = `Champion assert dominance with ${cards[0].value}!`;
      if (cards[0].value >= 15) {
        const secondPlace = this.getSecondPlace(scores);
        if (secondPlace) {
          return { type: 'special_babel_tower', cardId: cards[0].id, targetPlayerId: secondPlace };
        }
      }
      return { type: 'special_babel_tower', cardId: cards[0].id };
    }

    if (!isLeader && gapToLeader > 0) {
      if (this.difficulty === 'hard' || (this.difficulty === 'medium' && gapToLeader < 25)) {
        this.pressureMode = true;
      }
    }

    if (this.pressureMode && !isLeader && cards[0].value >= 12) {
      this.reasoning = `Champion closes gap with ${cards[0].value}!`;
      return { type: 'play_card', cardId: cards[0].id };
    }

    if (roundProgress < 0.3) {
      const bestCard = cards[0];
      this.reasoning = `Champion takes early control with ${bestCard.value}`;
      return { type: 'play_card', cardId: bestCard.id };
    }

    if (roundProgress > 0.7) {
      const highCard = cards.find(c => c.value >= 12) || cards[0];
      this.reasoning = `Champion dominates endgame with ${highCard.value}`;
      return { type: 'play_card', cardId: highCard.id };
    }

    const optimalCard = this.findOptimalCard(cards, scores, playerState.towerHeight, isLeader);
    this.reasoning = `Champion plays optimal ${optimalCard.value}`;
    return { type: 'play_card', cardId: optimalCard.id };
  }

  getReasoning(): string {
    return this.reasoning;
  }

  private findOptimalCard(
    cards: BabelCard[],
    scores: Map<string, number>,
    towerHeight: number,
    isLeader: boolean
  ): BabelCard {
    let bestScore = -Infinity;
    let bestCard = cards[0];

    for (const card of cards) {
      let score = card.value;

      if (this.pressureMode && !isLeader && card.value >= 12) {
        score += 15;
      }

      if (isLeader && card.value >= 8 && card.value <= 14) {
        score += 5;
      }

      if (towerHeight < 30 && card.value >= 10 && card.value <= 15) {
        score += 3;
      }

      if (score > bestScore) {
        bestScore = score;
        bestCard = card;
      }
    }

    return bestCard;
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

  private getSecondPlace(scores: Map<string, number>): string | undefined {
    const entries = [...scores.entries()].sort((a, b) => b[1] - a[1]);
    return entries[1]?.[0];
  }
}

export function createAIOpponent(agentType: AgentType, difficulty: 'easy' | 'medium' | 'hard'): AIOpponent {
  return new AIOpponent(agentType, difficulty);
}
