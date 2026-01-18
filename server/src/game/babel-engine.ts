import { v4 as uuid } from 'uuid';
import type {
  BabelGameState,
  BabelCard,
  BabelPlayerState,
  BabelAction,
  BabelGameLogEntry,
  Player,
  AgentType,
  BabelGameConfig,
} from './types.js';

const BABEL_DECK_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

interface BabelSpecialAction {
  name: string;
  description: string;
  minValue: number;
  actionType: 'sabotage' | 'boost' | 'steal';
}

const BABEL_SPECIAL_ACTIONS: Record<string, BabelSpecialAction> = {
  SABOTAGE: {
    name: 'Sabotage',
    description: 'Remove one card from another player\'s tower',
    minValue: 15,
    actionType: 'sabotage',
  },
  BOOST: {
    name: 'Boost',
    description: 'Add +5 to your tower height',
    minValue: 10,
    actionType: 'boost',
  },
  STEAL: {
    name: 'Steal',
    description: 'Take a card from the table',
    minValue: 8,
    actionType: 'steal',
  },
};

export function createBabelDeck(): BabelCard[] {
  const deck: BabelCard[] = [];
  const suits: Array<'stone' | 'brick' | 'wood' | 'glass'> = ['stone', 'brick', 'wood', 'glass'];
  let cardId = 0;

  for (const suit of suits) {
    for (const value of BABEL_DECK_VALUES) {
      deck.push({
        id: `babel-${cardId++}`,
        value,
        suit,
      });
    }
  }

  return shuffleDeck(deck);
}

function shuffleDeck<T>(deck: T[]): T[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealInitialHands(deck: BabelCard[], playerCount: number): BabelCard[][] {
  const hands: BabelCard[][] = Array.from({ length: playerCount }, () => []);
  const cardsPerPlayer = 5;

  for (let i = 0; i < cardsPerPlayer; i++) {
    for (const hand of hands) {
      if (deck.length > 0) {
        hand.push(deck.pop()!);
      }
    }
  }

  return hands;
}

export class BabelGameEngine {
  private state: BabelGameState;
  private config: BabelGameConfig;
  private onStateChange?: (state: BabelGameState) => void;

  constructor(
    playerIds: string[],
    playerNames: Map<string, string>,
    playerTypes: Map<string, 'human' | 'agent'>,
    agentTypes: Map<string, AgentType>,
    config: Partial<BabelGameConfig> = {}
  ) {
    this.config = {
      maxPlayers: Math.max(2, playerIds.length),
      rounds: 12,
      turnDurationSeconds: 60,
      aiDifficulty: 'medium',
      ...config,
    };

    const deck = createBabelDeck();
    const hands = dealInitialHands(deck, playerIds.length);

    const players: Player[] = playerIds.map((id, index) => ({
      id,
      name: playerNames.get(id) || `Player ${index + 1}`,
      type: playerTypes.get(id) || 'human',
      agentType: playerTypes.get(id) === 'agent' ? agentTypes.get(id) : undefined,
      score: 0,
      isConnected: true,
    }));

    const playerStates = new Map<string, BabelPlayerState>();
    playerIds.forEach((id, index) => {
      playerStates.set(id, {
        playerId: id,
        hand: hands[index],
        score: 0,
        towerHeight: 0,
        cardsPlayed: 0,
      });
    });

    this.state = {
      id: uuid(),
      gameType: 'babel',
      mode: 'casual',
      status: 'waiting',
      players,
      currentRound: 1,
      maxRounds: this.config.rounds,
      currentPlayerIndex: 0,
      deck,
      tableCards: [],
      playerStates,
      turnStartTime: 0,
      turnDurationSeconds: this.config.turnDurationSeconds,
      turnTimerActive: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      gameLog: [],
    };

    this.addLog({
      type: 'game_complete',
      playerId: 'system',
      details: {
        message: 'Babel Tower game initialized',
        playerCount: players.length,
        rounds: this.config.rounds,
      },
    });
  }

  setOnStateChange(callback: (state: BabelGameState) => void): void {
    this.onStateChange = callback;
  }

  private notifyStateChange(): void {
    this.state.updatedAt = Date.now();
    this.onStateChange?.(this.state);
  }

  private addLog(entry: Omit<BabelGameLogEntry, 'id' | 'timestamp'>): void {
    this.state.gameLog.push({
      id: uuid(),
      timestamp: Date.now(),
      ...entry,
    });
  }

  getState(): BabelGameState {
    return { ...this.state };
  }

  getCurrentPlayer(): Player | undefined {
    if (this.state.currentPlayerIndex >= this.state.players.length) {
      return undefined;
    }
    return this.state.players[this.state.currentPlayerIndex];
  }

  getCurrentPlayerId(): string | undefined {
    const player = this.getCurrentPlayer();
    return player?.id;
  }

  startGame(): void {
    if (this.state.status !== 'waiting') {
      throw new Error('Game already started');
    }

    this.state.status = 'playing';
    this.state.turnTimerActive = true;
    this.state.turnStartTime = Date.now();

    this.addLog({
      type: 'round_complete',
      playerId: 'system',
      details: {
        message: 'Game started',
        round: 1,
      },
    });

    this.notifyStateChange();
  }

  processAction(playerId: string, action: BabelAction): { success: boolean; error?: string; newState?: BabelGameState } {
    if (this.state.status !== 'playing') {
      return { success: false, error: 'Game is not currently playing' };
    }

    const currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer || currentPlayer.id !== playerId) {
      return { success: false, error: 'Not your turn' };
    }

    const playerState = this.state.playerStates.get(playerId);
    if (!playerState) {
      return { success: false, error: 'Player state not found' };
    }

    try {
      switch (action.type) {
        case 'play_card':
          return this.playCard(playerId, action.cardId!);
        case 'pass':
          return this.passTurn(playerId);
        case 'special_babel_tower':
          return this.playSpecialAction(playerId, action);
        default:
          return { success: false, error: 'Unknown action type' };
      }
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }

  private playCard(playerId: string, cardId: string): { success: boolean; error?: string; newState?: BabelGameState } {
    const playerState = this.state.playerStates.get(playerId);
    if (!playerState) {
      return { success: false, error: 'Player state not found' };
    }

    const cardIndex = playerState.hand.findIndex((c: BabelCard) => c.id === cardId);
    if (cardIndex === -1) {
      return { success: false, error: 'Card not in hand' };
    }

    const card = playerState.hand[cardIndex];
    playerState.hand.splice(cardIndex, 1);

    const towerHeight = this.calculateTowerHeight(playerId, card);
    playerState.towerHeight = towerHeight;
    playerState.score += card.value;
    playerState.cardsPlayed++;

    this.state.tableCards.push(card);

    this.addLog({
      type: 'card_played',
      playerId,
      card,
      details: {
        cardValue: card.value,
        newTowerHeight: towerHeight,
        tableCardsCount: this.state.tableCards.length,
      },
    });

    this.advanceTurn();

    return { success: true, newState: this.getState() };
  }

  private calculateTowerHeight(playerId: string, card: BabelCard): number {
    const playerState = this.state.playerStates.get(playerId);
    if (!playerState) return card.value;

    const suits = ['stone', 'brick', 'wood', 'glass'];
    const suitBonus = card.suit ? suits.indexOf(card.suit) * 2 : 0;
    const roundMultiplier = this.state.currentRound;

    return playerState.towerHeight + card.value + suitBonus + roundMultiplier;
  }

  private passTurn(playerId: string): { success: boolean; error?: string; newState?: BabelGameState } {
    this.addLog({
      type: 'turn_skipped',
      playerId,
      details: {
        message: 'Player passed',
        cardsRemaining: this.state.playerStates.get(playerId)?.hand.length ?? 0,
      },
    });

    this.advanceTurn();

    return { success: true, newState: this.getState() };
  }

  private playSpecialAction(
    playerId: string,
    action: BabelAction
  ): { success: boolean; error?: string; newState?: BabelGameState } {
    const playerState = this.state.playerStates.get(playerId);
    if (!playerState) {
      return { success: false, error: 'Player state not found' };
    }

    const cardId = action.cardId;
    if (!cardId) {
      return { success: false, error: 'Card ID required for special action' };
    }

    const cardIndex = playerState.hand.findIndex((c: BabelCard) => c.id === cardId);
    if (cardIndex === -1) {
      return { success: false, error: 'Card not in hand' };
    }

    const card = playerState.hand[cardIndex];

    const actionType = action.targetPlayerId ? 'sabotage' as const : 'boost' as const;

    const actionConfig = Object.values(BABEL_SPECIAL_ACTIONS).find(
      (a: BabelSpecialAction) => a.actionType === actionType && card.value >= a.minValue
    );

    if (!actionConfig) {
      return { success: false, error: 'Card value too low for special action' };
    }

    playerState.hand.splice(cardIndex, 1);

    switch (actionType) {
      case 'sabotage':
        return this.applySabotage(playerId, action.targetPlayerId!, card);
      case 'boost':
        return this.applyBoost(playerId, card);
      default:
        return { success: false, error: 'Invalid special action' };
    }
  }

  private applySabotage(
    playerId: string,
    targetPlayerId: string,
    card: BabelCard
  ): { success: boolean; error?: string; newState?: BabelGameState } {
    const targetState = this.state.playerStates.get(targetPlayerId);
    if (!targetState) {
      return { success: false, error: 'Target player not found' };
    }

    const sabotageAmount = Math.floor(card.value / 2);
    targetState.towerHeight = Math.max(0, targetState.towerHeight - sabotageAmount);

    this.addLog({
      type: 'special_action',
      playerId,
      card,
      details: {
        action: 'sabotage',
        targetPlayerId,
        sabotageAmount,
        targetNewHeight: targetState.towerHeight,
      },
    });

    this.advanceTurn();

    return { success: true, newState: this.getState() };
  }

  private applyBoost(playerId: string, card: BabelCard): { success: boolean; error?: string; newState?: BabelGameState } {
    const playerState = this.state.playerStates.get(playerId);
    if (!playerState) {
      return { success: false, error: 'Player state not found' };
    }

    const boostAmount = 5;
    playerState.towerHeight += boostAmount;
    playerState.score += boostAmount;

    this.addLog({
      type: 'special_action',
      playerId,
      card,
      details: {
        action: 'boost',
        boostAmount,
        newTowerHeight: playerState.towerHeight,
      },
    });

    this.advanceTurn();

    return { success: true, newState: this.getState() };
  }

  private advanceTurn(): void {
    this.state.currentPlayerIndex++;

    const allPlayersPassed = this.checkAllPlayersPassed();
    const allHandsEmpty = this.checkAllHandsEmpty();

    if (allHandsEmpty || (this.state.tableCards.length >= this.state.players.length * 2 && allPlayersPassed)) {
      this.endRound();
      return;
    }

    if (this.state.currentPlayerIndex >= this.state.players.length) {
      this.state.currentPlayerIndex = 0;
      this.state.currentRound++;
    }

    if (this.state.currentRound > this.state.maxRounds) {
      this.endGame();
      return;
    }

    this.state.turnStartTime = Date.now();
    this.notifyStateChange();
  }

  private checkAllPlayersPassed(): boolean {
    for (const playerState of this.state.playerStates.values()) {
      if (playerState.hand.length > 0) {
        return false;
      }
    }
    return true;
  }

  private checkAllHandsEmpty(): boolean {
    for (const playerState of this.state.playerStates.values()) {
      if (playerState.hand.length > 0) {
        return false;
      }
    }
    return true;
  }

  private endRound(): void {
    this.addLog({
      type: 'round_complete',
      playerId: 'system',
      details: {
        message: `Round ${this.state.currentRound} complete`,
        round: this.state.currentRound,
        tableCardsCount: this.state.tableCards.length,
      },
    });

    this.state.tableCards = [];

    if (this.state.deck.length >= this.state.players.length) {
      const hands = dealInitialHands(this.state.deck, this.state.players.length);
      let index = 0;
      for (const player of this.state.players) {
        const playerState = this.state.playerStates.get(player.id);
        if (playerState) {
          playerState.hand = hands[index++];
        }
      }
    }

    this.state.currentRound++;
    this.state.currentPlayerIndex = 0;
    this.state.turnStartTime = Date.now();

    this.addLog({
      type: 'round_complete',
      playerId: 'system',
      details: {
        message: `Round ${this.state.currentRound} started`,
        round: this.state.currentRound,
      },
    });

    if (this.state.currentRound > this.state.maxRounds) {
      this.endGame();
      return;
    }

    this.notifyStateChange();
  }

  private endGame(): void {
    this.state.status = 'game_end';

    let maxScore = -1;
    let winnerId: string | undefined;

    for (const [playerId, playerState] of this.state.playerStates) {
      if (playerState.score > maxScore) {
        maxScore = playerState.score;
        winnerId = playerId;
      }
    }

    this.state.winnerId = winnerId;

    for (const player of this.state.players) {
      const playerState = this.state.playerStates.get(player.id);
      if (playerState) {
        player.score = playerState.score;
      }
    }

    this.addLog({
      type: 'game_complete',
      playerId: winnerId || 'system',
      details: {
        message: 'Game complete',
        winnerId,
        maxScore,
        roundsPlayed: this.state.currentRound,
      },
    });

    this.notifyStateChange();
  }

  getResult(): { winnerId: string; finalScores: Map<string, number>; gameLog: BabelGameLogEntry[]; roundsPlayed: number } {
    const finalScores = new Map<string, number>();
    for (const [playerId, playerState] of this.state.playerStates) {
      finalScores.set(playerId, playerState.score);
    }

    return {
      winnerId: this.state.winnerId || '',
      finalScores,
      gameLog: this.state.gameLog,
      roundsPlayed: this.state.currentRound,
    };
  }

  isValidAction(playerId: string, action: BabelAction): boolean {
    if (this.state.status !== 'playing') return false;

    const currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer || currentPlayer.id !== playerId) return false;

    const playerState = this.state.playerStates.get(playerId);
    if (!playerState) return false;

    switch (action.type) {
      case 'play_card':
        return playerState.hand.some(c => c.id === action.cardId);
      case 'pass':
        return true;
      case 'special_babel_tower':
        return playerState.hand.some(c => c.id === action.cardId);
      default:
        return false;
    }
  }

  getPlayerHand(playerId: string): BabelCard[] {
    return this.state.playerStates.get(playerId)?.hand || [];
  }

  getTableCards(): BabelCard[] {
    return this.state.tableCards;
  }

  getScores(): Map<string, { score: number; towerHeight: number; cardsPlayed: number }> {
    const scores = new Map();
    for (const [playerId, playerState] of this.state.playerStates) {
      scores.set(playerId, {
        score: playerState.score,
        towerHeight: playerState.towerHeight,
        cardsPlayed: playerState.cardsPlayed,
      });
    }
    return scores;
  }
}
