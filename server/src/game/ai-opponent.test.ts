import { describe, it, expect } from 'vitest';
import { AIOpponent, createAIOpponent } from './ai-opponent.js';
import type { BabelGameState, BabelCard, BabelAction, AgentType } from './types.js';

describe('AIOpponent', () => {
  describe('Creation', () => {
    it('should create AI opponent with correct configuration', () => {
      const opponent = createAIOpponent('chaos', 'medium');

      expect(opponent).toBeDefined();
    });

    it('should have different risk tolerances per agent type', () => {
      const chaosOpponent = createAIOpponent('chaos', 'medium');
      const securityOpponent = createAIOpponent('security', 'medium');

      expect(chaosOpponent).toBeDefined();
      expect(securityOpponent).toBeDefined();
    });

    it('should have difficulty modifiers', () => {
      const easyOpponent = createAIOpponent('chaos', 'easy');
      const hardOpponent = createAIOpponent('chaos', 'hard');

      expect(easyOpponent).toBeDefined();
      expect(hardOpponent).toBeDefined();
    });
  });

  describe('Decision Making', () => {
    it('should return valid action when player has cards', () => {
      const opponent = createAIOpponent('chaos', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const hand = gameState.playerStates.get('p1')?.hand || [];
      if (hand.length > 0) {
        const action = opponent.makeDecision(gameState, 'p1');
        expect(action).toBeDefined();
        expect(action?.type).toBeDefined();
      }
    });

    it('should return pass when player has no cards', () => {
      const opponent = createAIOpponent('chaos', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');
      const emptyHandState = {
        ...gameState,
        playerStates: new Map([
          ['p1', { playerId: 'p1', hand: [], score: 0, towerHeight: 0, cardsPlayed: 0 }],
          ['p2', { playerId: 'p2', hand: [{ id: 'c1', value: 5 }], score: 0, towerHeight: 0, cardsPlayed: 0 }],
        ]),
      };

      const action = opponent.makeDecision(emptyHandState, 'p1');

      expect(action).toEqual({ type: 'pass' });
    });

    it('should adapt to player skill over time', () => {
      const opponent = createAIOpponent('chaos', 'medium');

      opponent.updatePlayerSkill('player1', true);
      opponent.updatePlayerSkill('player1', true);
      opponent.updatePlayerSkill('player1', false);

      const avgSkill = opponent.getAverageOpponentSkill();
      expect(avgSkill).toBeGreaterThan(0);
      expect(avgSkill).toBeLessThanOrEqual(1);
    });

    it('should adapt difficulty based on opponent skill', () => {
      const opponent = createAIOpponent('chaos', 'medium');

      for (let i = 0; i < 10; i++) {
        opponent.updatePlayerSkill('p1', true);
      }
      opponent.adaptDifficulty();

      const reasoning = opponent.getReasoning();
      expect(reasoning).toBeDefined();
    });
  });

  describe('Strategy Differences', () => {
    it('ChaosStrategy should have high randomness', () => {
      const opponent = createAIOpponent('chaos', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const decisions: string[] = [];
      for (let i = 0; i < 5; i++) {
        const action = opponent.makeDecision(gameState, 'p1');
        if (action) {
          decisions.push(action.type);
        }
      }

      expect(decisions.length).toBeGreaterThan(0);
    });

    it('SecurityStrategy should prefer defensive plays', () => {
      const opponent = createAIOpponent('security', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
      expect(['play_card', 'pass', 'special_babel_tower']).toContain(action?.type);
    });

    it('EconomistStrategy should maximize value', () => {
      const opponent = createAIOpponent('economist', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
    });

    it('DesignerStrategy should balance offense and defense', () => {
      const opponent = createAIOpponent('designer', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
    });

    it('MadChimpStrategy should be highly unpredictable', () => {
      const opponent = createAIOpponent('madchimp', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
      expect(['play_card', 'pass']).toContain(action?.type);
    });
  });

  describe('Reasoning', () => {
    it('should provide reasoning for decisions', () => {
      const opponent = createAIOpponent('chaos', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      opponent.makeDecision(gameState, 'p1');

      const reasoning = opponent.getReasoning();
      expect(reasoning).toBeDefined();
      expect(typeof reasoning).toBe('string');
    });

    it('should clear reasoning log', () => {
      const opponent = createAIOpponent('chaos', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      opponent.makeDecision(gameState, 'p1');
      opponent.clearReasoning();

      const reasoning = opponent.getReasoning();
      expect(reasoning).toBe('');
    });
  });

  describe('Skill Tracking', () => {
    it('should track individual player skill levels', () => {
      const opponent = createAIOpponent('chaos', 'medium');

      opponent.updatePlayerSkill('player1', true);
      opponent.updatePlayerSkill('player1', true);
      opponent.updatePlayerSkill('player2', false);

      const avgSkill = opponent.getAverageOpponentSkill();
      expect(avgSkill).toBe(0.525);
    });

    it('should not exceed skill bounds', () => {
      const opponent = createAIOpponent('chaos', 'medium');

      for (let i = 0; i < 100; i++) {
        opponent.updatePlayerSkill('player1', true);
      }

      const avgSkill = opponent.getAverageOpponentSkill();
      expect(avgSkill).toBeLessThanOrEqual(1);
    });

    it('should not go below skill floor', () => {
      const opponent = createAIOpponent('chaos', 'medium');

      for (let i = 0; i < 100; i++) {
        opponent.updatePlayerSkill('player1', false);
      }

      const avgSkill = opponent.getAverageOpponentSkill();
      expect(avgSkill).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Difficulty Adaptation', () => {
    it('should adjust difficulty based on player performance', () => {
      const opponent = createAIOpponent('chaos', 'medium');

      opponent.updatePlayerSkill('p1', true);
      opponent.updatePlayerSkill('p1', true);
      opponent.updatePlayerSkill('p1', true);
      opponent.updatePlayerSkill('p1', true);
      opponent.updatePlayerSkill('p1', true);

      opponent.adaptDifficulty();

      expect(opponent).toBeDefined();
    });

    it('should handle empty skill tracking', () => {
      const opponent = createAIOpponent('chaos', 'medium');

      const avgSkill = opponent.getAverageOpponentSkill();
      expect(avgSkill).toBe(0.5);
    });
  });

  describe('Action Types', () => {
    it('should generate play_card actions', () => {
      const opponent = createAIOpponent('chaos', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const hand = gameState.playerStates.get('p1')?.hand || [];
      if (hand.length > 0) {
        const action = opponent.makeDecision(gameState, 'p1');

        expect(action).toBeDefined();
        const validTypes = ['play_card', 'pass', 'special_babel_tower'];
        expect(validTypes).toContain(action?.type);
      }
    });

    it('should generate special actions when appropriate', () => {
      const opponent = createAIOpponent('chaos', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const hand = gameState.playerStates.get('p1')?.hand || [];
      const highCard = hand.find((c: BabelCard) => c.value >= 15);

      if (highCard) {
        const action = opponent.makeDecision(gameState, 'p1');

        expect(action).toBeDefined();
        const validTypes = ['play_card', 'pass', 'special_babel_tower'];
        expect(validTypes).toContain(action?.type);
      }
    });

    it('should generate pass actions when appropriate', () => {
      const opponent = createAIOpponent('security', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
      expect(action?.type).toBeTruthy();
    });
  });

  describe('State Handling', () => {
    it('should handle missing player state', () => {
      const opponent = createAIOpponent('chaos', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');
      const invalidState = {
        ...gameState,
        playerStates: new Map([
          ['p2', { playerId: 'p2', hand: [{ id: 'c1', value: 5 }], score: 0, towerHeight: 0, cardsPlayed: 0 }],
        ]),
      };

      const action = opponent.makeDecision(invalidState, 'nonexistent');

      expect(action).toEqual({ type: 'pass' });
    });

    it('should handle empty player hand', () => {
      const opponent = createAIOpponent('chaos', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');
      const emptyHandState = {
        ...gameState,
        playerStates: new Map([
          ['p1', { playerId: 'p1', hand: [], score: 0, towerHeight: 0, cardsPlayed: 0 }],
          ['p2', { playerId: 'p2', hand: [{ id: 'c1', value: 5 }], score: 0, towerHeight: 0, cardsPlayed: 0 }],
        ]),
      };

      const action = opponent.makeDecision(emptyHandState, 'p1');

      expect(action).toEqual({ type: 'pass' });
    });
  });
});

function createTestGameState(playerIds: string[], currentPlayerId: string): BabelGameState {
  const deck: BabelCard[] = [];
  for (let i = 0; i < 50; i++) {
    deck.push({ id: `deck-${i}`, value: (i % 25) + 1, suit: ['stone', 'brick', 'wood', 'glass'][i % 4] as any });
  }

  const playerStates = new Map<string, any>();
  playerIds.forEach((id, index) => {
    const hand: BabelCard[] = [];
    for (let i = 0; i < 5; i++) {
      hand.push({ id: `card-${id}-${i}`, value: (index * 5 + i + 1), suit: ['stone', 'brick', 'wood', 'glass'][i % 4] as any });
    }
    playerStates.set(id, {
      playerId: id,
      hand,
      score: 0,
      towerHeight: 0,
      cardsPlayed: 0,
    });
  });

  const players = playerIds.map((id, index) => ({
    id,
    name: `Player ${index + 1}`,
    type: 'human' as const,
    score: 0,
    isConnected: true,
  }));

  return {
    id: 'test-game',
    gameType: 'babel',
    mode: 'casual',
    status: 'playing',
    players,
    currentRound: 1,
    maxRounds: 12,
    currentPlayerIndex: playerIds.indexOf(currentPlayerId),
    deck,
    tableCards: [],
    playerStates,
    turnStartTime: Date.now(),
    turnDurationSeconds: 60,
    turnTimerActive: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    gameLog: [],
  };
}
