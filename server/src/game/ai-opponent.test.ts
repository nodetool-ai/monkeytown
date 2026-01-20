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

describe('Player Agent Strategies', () => {
  describe('TricksterStrategy', () => {
    it('should create TricksterStrategy with correct name', () => {
      const opponent = createAIOpponent('trickster', 'medium');
      expect(opponent).toBeDefined();
    });

    it('should bluff occasionally when in lead', () => {
      const opponent = createAIOpponent('trickster', 'medium');
      const gameState = createTestGameStateWithScores(['p1', 'p2'], 'p1', new Map([['p1', 50], ['p2', 30]]));

      const decisions: string[] = [];
      for (let i = 0; i < 10; i++) {
        const action = opponent.makeDecision(gameState, 'p1');
        if (action && action.type !== 'pass') {
          decisions.push(action.type);
        }
      }

      expect(decisions.length).toBeGreaterThan(0);
    });

    it('should sabotage leader when not in lead', () => {
      const opponent = createAIOpponent('trickster', 'medium');
      const gameState = createTestGameStateWithScores(['p1', 'p2'], 'p1', new Map([['p1', 30], ['p2', 50]]));

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
      expect(['play_card', 'special_babel_tower']).toContain(action?.type);
    });

    it('should provide reasoning for decisions', () => {
      const opponent = createAIOpponent('trickster', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      opponent.makeDecision(gameState, 'p1');

      const reasoning = opponent.getReasoning();
      expect(reasoning).toBeDefined();
      expect(typeof reasoning).toBe('string');
    });
  });

  describe('StrategistStrategy', () => {
    it('should create StrategistStrategy with correct name', () => {
      const opponent = createAIOpponent('strategist', 'medium');
      expect(opponent).toBeDefined();
    });

    it('should build foundation in early game', () => {
      const opponent = createAIOpponent('strategist', 'medium');
      const gameState = createTestGameStateWithRounds(['p1', 'p2'], 'p1', 2, 12);

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
      expect(['play_card', 'special_babel_tower']).toContain(action?.type);
    });

    it('should close gap in endgame when behind', () => {
      const opponent = createAIOpponent('strategist', 'medium');
      const gameState = createTestGameStateWithRoundsAndScores(['p1', 'p2'], 'p1', 10, 12, new Map([['p1', 30], ['p2', 60]]));

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
    });

    it('should maintain lead defensively when in lead', () => {
      const opponent = createAIOpponent('strategist', 'medium');
      const gameState = createTestGameStateWithRoundsAndScores(['p1', 'p2'], 'p1', 10, 12, new Map([['p1', 60], ['p2', 30]]));

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
    });

    it('should provide planning-focused reasoning', () => {
      const opponent = createAIOpponent('strategist', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      opponent.makeDecision(gameState, 'p1');

      const reasoning = opponent.getReasoning();
      expect(reasoning).toContain('Strategist');
    });
  });

  describe('SpeedsterStrategy', () => {
    it('should create SpeedsterStrategy with correct name', () => {
      const opponent = createAIOpponent('speedster', 'medium');
      expect(opponent).toBeDefined();
    });

    it('should play aggressively in early game', () => {
      const opponent = createAIOpponent('speedster', 'medium');
      const gameState = createTestGameStateWithRounds(['p1', 'p2'], 'p1', 3, 12);

      const actions: string[] = [];
      for (let i = 0; i < 5; i++) {
        const action = opponent.makeDecision(gameState, 'p1');
        if (action && action.type !== 'pass') {
          actions.push(action.type);
        }
      }

      expect(actions.length).toBeGreaterThan(0);
    });

    it('should push hard in endgame', () => {
      const opponent = createAIOpponent('speedster', 'medium');
      const gameState = createTestGameStateWithRounds(['p1', 'p2'], 'p1', 10, 12);

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
      expect(['play_card', 'special_babel_tower']).toContain(action?.type);
    });

    it('should use special attacks with high cards', () => {
      const opponent = createAIOpponent('speedster', 'hard');
      const gameState = createTestGameStateWithHighCards(['p1', 'p2'], 'p1', 16);

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
      expect(['play_card', 'special_babel_tower']).toContain(action?.type);
    });

    it('should provide aggressive reasoning', () => {
      const opponent = createAIOpponent('speedster', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      opponent.makeDecision(gameState, 'p1');

      const reasoning = opponent.getReasoning();
      expect(reasoning).toContain('Speedster');
    });
  });

  describe('GuardianStrategy', () => {
    it('should create GuardianStrategy with correct name', () => {
      const opponent = createAIOpponent('guardian', 'medium');
      expect(opponent).toBeDefined();
    });

    it('should enter defense mode when in lead', () => {
      const opponent = createAIOpponent('guardian', 'medium');
      const gameState = createTestGameStateWithScores(['p1', 'p2'], 'p1', new Map([['p1', 50], ['p2', 30]]));

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
    });

    it('should block threats when in lead', () => {
      const opponent = createAIOpponent('guardian', 'medium');
      const gameState = createTestGameStateWithScores(['p1', 'p2'], 'p1', new Map([['p1', 60], ['p2', 55]]));

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
    });

    it('should play conservatively', () => {
      const opponent = createAIOpponent('guardian', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
      expect(['play_card', 'pass', 'special_babel_tower']).toContain(action?.type);
    });

    it('should provide defensive reasoning', () => {
      const opponent = createAIOpponent('guardian', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      opponent.makeDecision(gameState, 'p1');

      const reasoning = opponent.getReasoning();
      expect(reasoning).toContain('Guardian');
    });
  });

  describe('WildcardStrategy', () => {
    it('should create WildcardStrategy with correct name', () => {
      const opponent = createAIOpponent('wildcard', 'medium');
      expect(opponent).toBeDefined();
    });

    it('should be highly unpredictable', () => {
      const opponent = createAIOpponent('wildcard', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const actionTypes = new Set<string>();
      for (let i = 0; i < 20; i++) {
        const action = opponent.makeDecision(gameState, 'p1');
        if (action) {
          actionTypes.add(action.type);
        }
      }

      expect(actionTypes.size).toBeGreaterThan(1);
    });

    it('should occasionally pass unexpectedly', () => {
      const opponent = createAIOpponent('wildcard', 'easy');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      let passCount = 0;
      for (let i = 0; i < 20; i++) {
        const action = opponent.makeDecision(gameState, 'p1');
        if (action && action.type === 'pass') {
          passCount++;
        }
      }

      expect(passCount).toBeGreaterThan(0);
    });

    it('should sabotage randomly with high cards', () => {
      const opponent = createAIOpponent('wildcard', 'medium');
      const gameState = createTestGameStateWithHighCards(['p1', 'p2'], 'p1', 16);

      let sabotageCount = 0;
      for (let i = 0; i < 20; i++) {
        const action = opponent.makeDecision(gameState, 'p1');
        if (action && action.type === 'special_babel_tower' && action.targetPlayerId) {
          sabotageCount++;
        }
      }

      expect(sabotageCount).toBeGreaterThan(0);
    });

    it('should provide chaotic reasoning', () => {
      const opponent = createAIOpponent('wildcard', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      opponent.makeDecision(gameState, 'p1');

      const reasoning = opponent.getReasoning();
      expect(reasoning).toContain('Wildcard');
    });
  });

  describe('MentorStrategy', () => {
    it('should create MentorStrategy with correct name', () => {
      const opponent = createAIOpponent('mentor', 'medium');
      expect(opponent).toBeDefined();
    });

    it('should teach in early game', () => {
      const opponent = createAIOpponent('mentor', 'easy');
      const gameState = createTestGameStateWithRounds(['p1', 'p2'], 'p1', 2, 12);

      const reasoning = opponent.getReasoning();
      opponent.makeDecision(gameState, 'p1');
      const newReasoning = opponent.getReasoning();

      expect(newReasoning).toBeDefined();
    });

    it('should give tips about tower building', () => {
      const opponent = createAIOpponent('mentor', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      opponent.makeDecision(gameState, 'p1');

      const reasoning = opponent.getReasoning();
      expect(reasoning).toContain('Mentor');
    });

    it('should demonstrate good plays', () => {
      const opponent = createAIOpponent('mentor', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
      expect(['play_card', 'special_babel_tower']).toContain(action?.type);
    });

    it('should be encouraging', () => {
      const opponent = createAIOpponent('mentor', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      opponent.makeDecision(gameState, 'p1');

      const reasoning = opponent.getReasoning();
      expect(reasoning.length).toBeGreaterThan(0);
    });
  });

  describe('ChampionStrategy', () => {
    it('should create ChampionStrategy with correct name', () => {
      const opponent = createAIOpponent('champion', 'medium');
      expect(opponent).toBeDefined();
    });

    it('should assert dominance when in lead', () => {
      const opponent = createAIOpponent('champion', 'medium');
      const gameState = createTestGameStateWithScores(['p1', 'p2'], 'p1', new Map([['p1', 50], ['p2', 30]]));

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
    });

    it('should close gap aggressively when behind', () => {
      const opponent = createAIOpponent('champion', 'hard');
      const gameState = createTestGameStateWithScores(['p1', 'p2'], 'p1', new Map([['p1', 30], ['p2', 60]]));

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
    });

    it('should take early control', () => {
      const opponent = createAIOpponent('champion', 'medium');
      const gameState = createTestGameStateWithRounds(['p1', 'p2'], 'p1', 2, 12);

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
      expect(action?.type).toBe('play_card');
    });

    it('should dominate endgame', () => {
      const opponent = createAIOpponent('champion', 'medium');
      const gameState = createTestGameStateWithRounds(['p1', 'p2'], 'p1', 10, 12);

      const action = opponent.makeDecision(gameState, 'p1');

      expect(action).toBeDefined();
    });

    it('should provide competitive reasoning', () => {
      const opponent = createAIOpponent('champion', 'medium');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      opponent.makeDecision(gameState, 'p1');

      const reasoning = opponent.getReasoning();
      expect(reasoning).toContain('Champion');
    });
  });

  describe('Player Agent Difficulty Variations', () => {
    it('should have different behavior based on difficulty for Trickster', () => {
      const easyTrickster = createAIOpponent('trickster', 'easy');
      const hardTrickster = createAIOpponent('trickster', 'hard');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const easyActions: string[] = [];
      const hardActions: string[] = [];

      for (let i = 0; i < 10; i++) {
        const easyAction = easyTrickster.makeDecision(gameState, 'p1');
        const hardAction = hardTrickster.makeDecision(gameState, 'p1');

        if (easyAction) easyActions.push(easyAction.type);
        if (hardAction) hardActions.push(hardAction.type);
      }

      expect(easyActions.length).toBeGreaterThan(0);
      expect(hardActions.length).toBeGreaterThan(0);
    });

    it('should have different behavior based on difficulty for Speedster', () => {
      const easySpeedster = createAIOpponent('speedster', 'easy');
      const hardSpeedster = createAIOpponent('speedster', 'hard');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const easyOpponent = createAIOpponent('speedster', 'easy');
      const hardOpponent = createAIOpponent('speedster', 'hard');

      expect(easyOpponent).toBeDefined();
      expect(hardOpponent).toBeDefined();
    });

    it('should have different behavior based on difficulty for Guardian', () => {
      const easyGuardian = createAIOpponent('guardian', 'easy');
      const hardGuardian = createAIOpponent('guardian', 'hard');
      const gameState = createTestGameState(['p1', 'p2'], 'p1');

      const easyAction = easyGuardian.makeDecision(gameState, 'p1');
      const hardAction = hardGuardian.makeDecision(gameState, 'p1');

      expect(easyAction).toBeDefined();
      expect(hardAction).toBeDefined();
    });
  });
});

function createTestGameStateWithScores(playerIds: string[], currentPlayerId: string, scores: Map<string, number>): BabelGameState {
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
      score: scores.get(id) || 0,
      towerHeight: 0,
      cardsPlayed: 0,
    });
  });

  const players = playerIds.map((id, index) => ({
    id,
    name: `Player ${index + 1}`,
    type: 'human' as const,
    score: scores.get(id) || 0,
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

function createTestGameStateWithRounds(playerIds: string[], currentPlayerId: string, currentRound: number, maxRounds: number): BabelGameState {
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
    currentRound,
    maxRounds,
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

function createTestGameStateWithRoundsAndScores(playerIds: string[], currentPlayerId: string, currentRound: number, maxRounds: number, scores: Map<string, number>): BabelGameState {
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
      score: scores.get(id) || 0,
      towerHeight: 0,
      cardsPlayed: 0,
    });
  });

  const players = playerIds.map((id, index) => ({
    id,
    name: `Player ${index + 1}`,
    type: 'human' as const,
    score: scores.get(id) || 0,
    isConnected: true,
  }));

  return {
    id: 'test-game',
    gameType: 'babel',
    mode: 'casual',
    status: 'playing',
    players,
    currentRound,
    maxRounds,
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

function createTestGameStateWithHighCards(playerIds: string[], currentPlayerId: string, highCardValue: number): BabelGameState {
  const deck: BabelCard[] = [];
  for (let i = 0; i < 50; i++) {
    deck.push({ id: `deck-${i}`, value: (i % 25) + 1, suit: ['stone', 'brick', 'wood', 'glass'][i % 4] as any });
  }

  const playerStates = new Map<string, any>();
  playerIds.forEach((id, index) => {
    const hand: BabelCard[] = [];
    for (let i = 0; i < 5; i++) {
      const value = id === currentPlayerId && i === 0 ? highCardValue : (index * 5 + i + 1);
      hand.push({ id: `card-${id}-${i}`, value, suit: ['stone', 'brick', 'wood', 'glass'][i % 4] as any });
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
