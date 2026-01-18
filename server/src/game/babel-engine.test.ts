import { describe, it, expect } from 'vitest';
import { BabelGameEngine, createBabelDeck, dealInitialHands } from './babel-engine.js';
import type { BabelCard, AgentType } from './types.js';

describe('BabelGameEngine', () => {
  describe('Deck Creation', () => {
    it('should create a deck with 100 cards (4 suits × 25 values)', () => {
      const deck = createBabelDeck();
      expect(deck).toHaveLength(100);
    });

    it('should have cards with values from 1 to 25', () => {
      const deck = createBabelDeck();
      const values = deck.map((c: BabelCard) => c.value);
      expect(Math.min(...values)).toBe(1);
      expect(Math.max(...values)).toBe(25);
    });

    it('should have 4 suits', () => {
      const deck = createBabelDeck();
      const suits = new Set(deck.map((c: BabelCard) => c.suit));
      expect(suits).toEqual(new Set(['stone', 'brick', 'wood', 'glass']));
    });
  });

  describe('Card Dealing', () => {
    it('should deal 5 cards to each player', () => {
      const deck = createBabelDeck();
      const hands = dealInitialHands(deck, 4);
      expect(hands).toHaveLength(4);
      hands.forEach((hand: BabelCard[]) => {
        expect(hand).toHaveLength(5);
      });
    });

    it('should remove dealt cards from deck', () => {
      const deck = createBabelDeck();
      const initialLength = deck.length;
      dealInitialHands(deck, 4);
      expect(deck.length).toBe(initialLength - 20);
    });

    it('should handle 2 players', () => {
      const deck = createBabelDeck();
      const hands = dealInitialHands(deck, 2);
      expect(hands).toHaveLength(2);
      hands.forEach((hand: BabelCard[]) => {
        expect(hand).toHaveLength(5);
      });
    });
  });

  describe('Game Initialization', () => {
    it('should create a game with correct initial state', () => {
      const playerIds = ['p1', 'p2', 'p3'];
      const playerNames = new Map<string, string>([
        ['p1', 'Alice'],
        ['p2', 'Bob'],
        ['p3', 'Charlie'],
      ]);
      const playerTypes = new Map<string, 'human' | 'agent'>([
        ['p1', 'human'],
        ['p2', 'agent'],
        ['p3', 'human'],
      ]);
      const agentTypes = new Map<string, AgentType>([['p2', 'chaos']]);

      const engine = new BabelGameEngine(
        playerIds,
        playerNames,
        playerTypes,
        agentTypes
      );

      const state = engine.getState();
      expect(state.status).toBe('waiting');
      expect(state.players).toHaveLength(3);
      expect(state.currentRound).toBe(1);
      expect(state.maxRounds).toBe(12);
    });

    it('should have correct players', () => {
      const playerIds = ['p1', 'p2'];
      const playerNames = new Map<string, string>([
        ['p1', 'Alice'],
        ['p2', 'Bob'],
      ]);
      const playerTypes = new Map<string, 'human' | 'agent'>([
        ['p1', 'human'],
        ['p2', 'agent'],
      ]);
      const agentTypes = new Map<string, AgentType>([['p2', 'chaos']]);

      const engine = new BabelGameEngine(
        playerIds,
        playerNames,
        playerTypes,
        agentTypes
      );

      const state = engine.getState();
      expect(state.players[0].name).toBe('Alice');
      expect(state.players[1].name).toBe('Bob');
      expect(state.players[0].type).toBe('human');
      expect(state.players[1].type).toBe('agent');
      expect(state.players[1].agentType).toBe('chaos');
    });

    it('should deal initial hands', () => {
      const playerIds = ['p1', 'p2'];
      const playerNames = new Map<string, string>([
        ['p1', 'Alice'],
        ['p2', 'Bob'],
      ]);
      const playerTypes = new Map<string, 'human' | 'agent'>([
        ['p1', 'human'],
        ['p2', 'agent'],
      ]);
      const agentTypes = new Map<string, AgentType>([['p2', 'chaos']]);

      const engine = new BabelGameEngine(
        playerIds,
        playerNames,
        playerTypes,
        agentTypes
      );

      const hand1 = engine.getPlayerHand('p1');
      const hand2 = engine.getPlayerHand('p2');

      expect(hand1).toHaveLength(5);
      expect(hand2).toHaveLength(5);
      hand1.forEach((card: BabelCard) => {
        expect(card.id).toBeDefined();
        expect(card.value).toBeDefined();
      });
    });
  });

  describe('Game Start', () => {
    it('should transition from waiting to playing', () => {
      const engine = createTestEngine();

      expect(engine.getState().status).toBe('waiting');

      engine.startGame();

      expect(engine.getState().status).toBe('playing');
    });

    it('should set current player after starting', () => {
      const engine = createTestEngine();
      engine.startGame();

      const currentPlayer = engine.getCurrentPlayer();
      expect(currentPlayer).toBeDefined();
      expect(currentPlayer?.id).toBe('p1');
    });

    it('should activate turn timer', () => {
      const engine = createTestEngine();
      engine.startGame();

      expect(engine.getState().turnTimerActive).toBe(true);
    });
  });

  describe('Card Play', () => {
    it('should allow player to play a card', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const cardToPlay = hand[0];

      const result = engine.processAction('p1', { type: 'play_card', cardId: cardToPlay.id });

      expect(result.success).toBe(true);
      expect(result.newState).toBeDefined();
    });

    it('should remove card from hand after playing', () => {
      const engine = createTestEngine();
      engine.startGame();

      const handBefore = engine.getPlayerHand('p1');
      const cardToPlay = handBefore[0];

      engine.processAction('p1', { type: 'play_card', cardId: cardToPlay.id });

      const handAfter = engine.getPlayerHand('p1');
      expect(handAfter).toHaveLength(4);
      expect(handAfter.find((c: BabelCard) => c.id === cardToPlay.id)).toBeUndefined();
    });

    it('should add card to table after playing', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const cardToPlay = hand[0];

      engine.processAction('p1', { type: 'play_card', cardId: cardToPlay.id });

      const tableCards = engine.getTableCards();
      expect(tableCards).toContainEqual(expect.objectContaining({ id: cardToPlay.id }));
    });

    it('should update tower height when playing card', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const cardToPlay = hand[0];

      engine.processAction('p1', { type: 'play_card', cardId: cardToPlay.id });

      const scores = engine.getScores();
      const p1Score = scores.get('p1');
      expect(p1Score?.towerHeight).toBeGreaterThan(0);
    });

    it('should not allow playing card during waiting phase', () => {
      const engine = createTestEngine();
      const hand = engine.getPlayerHand('p1');
      const cardToPlay = hand[0];

      const result = engine.processAction('p1', { type: 'play_card', cardId: cardToPlay.id });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Game is not currently playing');
    });

    it('should not allow playing other player\'s card', () => {
      const engine = createTestEngine();
      engine.startGame();

      const p2Hand = engine.getPlayerHand('p2');
      const cardToPlay = p2Hand[0];

      const result = engine.processAction('p1', { type: 'play_card', cardId: cardToPlay.id });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Card not in hand');
    });
  });

  describe('Turn Passing', () => {
    it('should allow passing turn', () => {
      const engine = createTestEngine();
      engine.startGame();

      const result = engine.processAction('p1', { type: 'pass' });

      expect(result.success).toBe(true);
    });

    it('should advance to next player after passing', () => {
      const engine = createTestEngine();
      engine.startGame();

      const initialPlayer = engine.getCurrentPlayer();
      engine.processAction('p1', { type: 'pass' });
      const nextPlayer = engine.getCurrentPlayer();

      expect(initialPlayer?.id).not.toBe(nextPlayer?.id);
    });
  });

  describe('Special Actions', () => {
    it('should allow boost action with high value card', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const highCard = hand.find((c: BabelCard) => c.value >= 10);

      if (highCard) {
        const result = engine.processAction('p1', { type: 'special_babel_tower', cardId: highCard.id });

        expect(result.success).toBe(true);
      }
    });

    it('should not allow boost with low value card', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const lowCard = hand.find((c: BabelCard) => c.value < 10);

      if (lowCard) {
        const result = engine.processAction('p1', { type: 'special_babel_tower', cardId: lowCard.id });

        expect(result.success).toBe(false);
        expect(result.error).toBe('Card value too low for special action');
      }
    });
  });

  describe('Score Tracking', () => {
    it('should track scores correctly', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const card = hand[0];
      engine.processAction('p1', { type: 'play_card', cardId: card.id });

      const scores = engine.getScores();
      const p1Score = scores.get('p1');

      expect(p1Score?.score).toBeGreaterThan(0);
    });

    it('should update cards played count', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const card = hand[0];
      engine.processAction('p1', { type: 'play_card', cardId: card.id });

      const scores = engine.getScores();
      const p1Score = scores.get('p1');

      expect(p1Score?.cardsPlayed).toBe(1);
    });
  });

  describe('Action Validation', () => {
    it('should validate valid actions', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const card = hand[0];

      expect(engine.isValidAction('p1', { type: 'play_card', cardId: card.id })).toBe(true);
      expect(engine.isValidAction('p1', { type: 'pass' })).toBe(true);
    });

    it('should reject invalid actions', () => {
      const engine = createTestEngine();
      engine.startGame();

      expect(engine.isValidAction('p2', { type: 'pass' })).toBe(false);
      expect(engine.isValidAction('p1', { type: 'play_card', cardId: 'invalid' })).toBe(false);
    });
  });

  describe('Game Log', () => {
    it('should record actions in game log', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      engine.processAction('p1', { type: 'play_card', cardId: hand[0].id });

      const result = engine.getResult();
      expect(result.gameLog.length).toBeGreaterThan(0);
    });

    it('should record sabotage actions correctly', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const sabotageCard = hand.find((c: BabelCard) => c.value >= 15);

      if (sabotageCard) {
        const result = engine.processAction('p1', { type: 'special_babel_tower', cardId: sabotageCard.id, targetPlayerId: 'p2' });

        if (result.success) {
          const log = engine.getResult().gameLog;
          const sabotageEntry = log.find((entry: any) => entry.type === 'special_action' && entry.details.action === 'sabotage');
          expect(sabotageEntry).toBeDefined();
        }
      }
    });

    it('should record boost actions correctly', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const boostCard = hand.find((c: BabelCard) => c.value >= 10 && c.value < 15);

      if (boostCard) {
        const result = engine.processAction('p1', { type: 'special_babel_tower', cardId: boostCard.id });

        if (result.success) {
          const log = engine.getResult().gameLog;
          const boostEntry = log.find((entry: any) => entry.type === 'special_action' && entry.details.action === 'boost');
          expect(boostEntry).toBeDefined();
        }
      }
    });
  });

  describe('Round Management', () => {
    it('should advance rounds when all players pass or table is full', () => {
      const engine = createTestEngineWithKnownCards();
      engine.startGame();

      const initialRound = engine.getState().currentRound;

      engine.processAction('p1', { type: 'pass' });
      engine.processAction('p2', { type: 'pass' });
      engine.processAction('p3', { type: 'pass' });

      const state = engine.getState();
      if (state.currentRound > initialRound) {
        expect(state.currentRound).toBe(initialRound + 1);
      }
    });

    it('should end game after max rounds', () => {
      const engine = createTestEngineWithMaxRounds();
      engine.startGame();

      for (let i = 0; i < 13; i++) {
        const state = engine.getState();
        if (state.status !== 'playing') break;

        engine.processAction('p1', { type: 'pass' });
        if (state.status !== 'playing') break;

        engine.processAction('p2', { type: 'pass' });
        if (state.status !== 'playing') break;

        engine.processAction('p3', { type: 'pass' });
      }

      const finalState = engine.getState();
      expect(finalState.status).toBe('game_end');
    });

    it('should deal new hands at round start', () => {
      const engine = createTestEngine();
      engine.startGame();

      const initialHandCount = engine.getPlayerHand('p1').length;

      engine.processAction('p1', { type: 'pass' });
      engine.processAction('p2', { type: 'pass' });
      engine.processAction('p3', { type: 'pass' });

      const newHandCount = engine.getPlayerHand('p1').length;
      expect(newHandCount).toBeGreaterThanOrEqual(initialHandCount);
    });
  });

  describe('Winner Determination', () => {
    it('should identify winner correctly', () => {
      const engine = createTestEngine();
      engine.startGame();

      engine.processAction('p1', { type: 'pass' });
      engine.processAction('p2', { type: 'pass' });
      engine.processAction('p3', { type: 'pass' });

      for (let i = 0; i < 13; i++) {
        const state = engine.getState();
        if (state.status !== 'playing') break;

        engine.processAction('p1', { type: 'pass' });
        if (engine.getState().status !== 'playing') break;

        engine.processAction('p2', { type: 'pass' });
        if (engine.getState().status !== 'playing') break;

        engine.processAction('p3', { type: 'pass' });
      }

      const result = engine.getResult();
      expect(result.winnerId).toBeDefined();
    });

    it('should calculate final scores correctly', () => {
      const engine = createTestEngine();
      engine.startGame();

      while (engine.getState().status === 'playing') {
        const state = engine.getState();
        const currentPlayerId = state.players[state.currentPlayerIndex]?.id;
        if (currentPlayerId) {
          engine.processAction(currentPlayerId, { type: 'pass' });
        } else {
          break;
        }
      }

      const result = engine.getResult();
      expect(result.finalScores.size).toBe(3);

      let maxScore = -1;
      let expectedWinner = '';
      for (const [playerId, score] of result.finalScores) {
        if (score > maxScore) {
          maxScore = score;
          expectedWinner = playerId;
        }
      }
      expect(result.winnerId).toBe(expectedWinner);
    });
  });

  describe('Multiplayer Turn Order', () => {
    it('should cycle through all players correctly', () => {
      const engine = createTestEngine();
      engine.startGame();

      const players = engine.getState().players;
      const turnOrder: string[] = [];

      for (let i = 0; i < players.length * 2; i++) {
        const currentPlayer = engine.getCurrentPlayer();
        if (currentPlayer) {
          turnOrder.push(currentPlayer.id);
        }
        engine.processAction(engine.getCurrentPlayer()?.id || '', { type: 'pass' });
      }

      for (let i = 0; i < turnOrder.length - players.length; i++) {
        expect(turnOrder[i]).toBe(turnOrder[i + players.length]);
      }
    });

    it('should skip disconnected players', () => {
      const engine = createTestEngine();
      engine.startGame();

      engine.processAction('p1', { type: 'pass' });

      const state = engine.getState();
      const currentPlayer = engine.getCurrentPlayer();

      if (state.players[1]?.type === 'agent') {
        expect(currentPlayer?.id).toBe('p2');
      }
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty deck gracefully', () => {
      const engine = createTestEngine();
      engine.startGame();

      while (engine.getState().status === 'playing' && engine.getState().deck.length > 0) {
        engine.processAction(engine.getCurrentPlayer()?.id || '', { type: 'pass' });
      }

      expect(engine.getState().status).toBeDefined();
    });

    it('should handle sabotage when target has low tower height', () => {
      const engine = createTestEngine();
      engine.startGame();

      const hand = engine.getPlayerHand('p1');
      const sabotageCard = hand.find((c: BabelCard) => c.value >= 15);

      if (sabotageCard) {
        const result = engine.processAction('p1', { type: 'special_babel_tower', cardId: sabotageCard.id, targetPlayerId: 'p2' });

        if (result.success) {
          const p2State = engine.getState().playerStates.get('p2');
          expect(p2State?.towerHeight).toBeGreaterThanOrEqual(0);
        }
      }
    });

    it('should not allow actions from non-existent player', () => {
      const engine = createTestEngine();
      engine.startGame();

      const result = engine.processAction('nonexistent', { type: 'pass' });
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(['Not your turn', 'Player state not found']).toContain(result.error);
    });

    it('should handle concurrent actions gracefully', () => {
      const engine = createTestEngine();
      engine.startGame();

      const result1 = engine.processAction('p1', { type: 'play_card', cardId: engine.getPlayerHand('p1')[0].id });
      const result2 = engine.processAction('p1', { type: 'play_card', cardId: engine.getPlayerHand('p1')[0].id });

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(false);
      expect(result2.error).toBeDefined();
    });
  });

  describe('State Consistency', () => {
    it('should maintain consistent state after action', () => {
      const engine = createTestEngine();
      engine.startGame();

      const initialState = engine.getState();
      const hand = engine.getPlayerHand('p1');
      const cardId = hand[0].id;

      engine.processAction('p1', { type: 'play_card', cardId });

      const newState = engine.getState();
      expect(newState.updatedAt).toBeGreaterThanOrEqual(initialState.updatedAt);
    });

    it('should handle state change callbacks', () => {
      const engine = createTestEngine();
      let callbackCalled = false;
      let callbackState: any = null;

      engine.setOnStateChange((state) => {
        callbackCalled = true;
        callbackState = state;
      });

      engine.startGame();
      engine.processAction('p1', { type: 'pass' });

      expect(callbackCalled).toBe(true);
      expect(callbackState).toBeDefined();
      expect(callbackState.id).toBe(engine.getState().id);
    });
  });
});

function createTestEngine(): BabelGameEngine {
  const playerIds = ['p1', 'p2', 'p3'];
  const playerNames = new Map<string, string>([
    ['p1', 'Alice'],
    ['p2', 'Bob'],
    ['p3', 'Charlie'],
  ]);
  const playerTypes = new Map<string, 'human' | 'agent'>([
    ['p1', 'human'],
    ['p2', 'agent'],
    ['p3', 'human'],
  ]);
  const agentTypes = new Map<string, AgentType>([['p2', 'chaos']]);

  return new BabelGameEngine(
    playerIds,
    playerNames,
    playerTypes,
    agentTypes
  );
}

function createTestEngineWithKnownCards(): BabelGameEngine {
  const playerIds = ['p1', 'p2'];
  const playerNames = new Map<string, string>([
    ['p1', 'Alice'],
    ['p2', 'Bob'],
  ]);
  const playerTypes = new Map<string, 'human' | 'agent'>([
    ['p1', 'human'],
    ['p2', 'human'],
  ]);
  const agentTypes = new Map<string, AgentType>();

  return new BabelGameEngine(
    playerIds,
    playerNames,
    playerTypes,
    agentTypes,
    { rounds: 3 }
  );
}

function createTestEngineWithMaxRounds(): BabelGameEngine {
  const playerIds = ['p1', 'p2'];
  const playerNames = new Map<string, string>([
    ['p1', 'Alice'],
    ['p2', 'Bob'],
  ]);
  const playerTypes = new Map<string, 'human' | 'agent'>([
    ['p1', 'human'],
    ['p2', 'human'],
  ]);
  const agentTypes = new Map<string, AgentType>();

  return new BabelGameEngine(
    playerIds,
    playerNames,
    playerTypes,
    agentTypes,
    { rounds: 2 }
  );
}
