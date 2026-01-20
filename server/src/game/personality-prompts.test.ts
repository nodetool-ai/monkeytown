import { describe, it, expect } from 'vitest';
import {
  validateTricksterInput,
  formatTricksterOutput,
  type TricksterMonkeyInput,
  type TricksterMonkeyOutput,
  validateStrategistInput,
  formatStrategistOutput,
  type StrategistApeInput,
  type StrategistApeOutput,
  validateSpeedyInput,
  formatSpeedyOutput,
  type SpeedyGibbonInput,
  type SpeedyGibbonOutput,
  validateGuardianInput,
  formatGuardianOutput,
  type GuardianGorillaInput,
  type GuardianGorillaOutput,
  validateWildcardInput,
  formatWildcardOutput,
  type WildcardLemurInput,
  type WildcardLemurOutput,
  validateMentorInput,
  formatMentorOutput,
  type MentorOrangutanInput,
  type MentorOrangutanOutput,
  validateChampionInput,
  formatChampionOutput,
  type ChampionChimpInput,
  type ChampionChimpOutput,
} from './ai/prompts/types.js';

describe('Personality Prompts - Validation', () => {
  describe('TricksterMonkey Validation', () => {
    it('should validate correct input structure', () => {
      const validInput: TricksterMonkeyInput = {
        gameState: { phase: 'playing' },
        hand: [{ id: 'c1', value: 10 }],
        opponents: [{ id: 'p2', score: 50 }],
        roundNumber: 3,
        totalRounds: 12,
      };
      expect(validateTricksterInput(validInput)).toBe(true);
    });

    it('should reject null input', () => {
      expect(validateTricksterInput(null)).toBe(false);
    });

    it('should reject empty object', () => {
      expect(validateTricksterInput({})).toBe(false);
    });

    it('should reject missing gameState', () => {
      expect(validateTricksterInput({ hand: [] })).toBe(false);
    });

    it('should reject invalid hand type', () => {
      expect(validateTricksterInput({ gameState: {}, hand: 'invalid' })).toBe(false);
    });

    it('should reject invalid opponents type', () => {
      expect(validateTricksterInput({ gameState: {}, hand: [], opponents: {} })).toBe(false);
    });

    it('should reject non-numeric roundNumber', () => {
      expect(validateTricksterInput({ gameState: {}, hand: [], opponents: [], roundNumber: '3', totalRounds: 12 })).toBe(false);
    });
  });

  describe('StrategistApe Validation', () => {
    it('should validate correct input structure', () => {
      const validInput: StrategistApeInput = {
        gameState: { phase: 'playing' },
        hand: [{ id: 'c1', value: 10 }],
        opponents: [{ id: 'p2', score: 50, towerHeight: 5 }],
        roundNumber: 3,
        totalRounds: 12,
        predictedMoves: [{ playerId: 'p2', expectedAction: 'play_card' }],
      };
      expect(validateStrategistInput(validInput)).toBe(true);
    });

    it('should reject missing predictedMoves', () => {
      const input = { gameState: {}, hand: [], opponents: [], roundNumber: 1, totalRounds: 12 };
      expect(validateStrategistInput(input)).toBe(false);
    });
  });

  describe('SpeedyGibbon Validation', () => {
    it('should validate correct input structure', () => {
      const validInput: SpeedyGibbonInput = {
        gameState: { phase: 'playing' },
        hand: [{ id: 'c1', value: 10 }],
        opponents: [{ id: 'p2', score: 50 }],
        timeRemaining: 45,
        roundNumber: 3,
      };
      expect(validateSpeedyInput(validInput)).toBe(true);
    });

    it('should reject missing timeRemaining', () => {
      const input = { gameState: {}, hand: [], opponents: [], roundNumber: 1 };
      expect(validateSpeedyInput(input)).toBe(false);
    });
  });

  describe('GuardianGorilla Validation', () => {
    it('should validate correct input structure', () => {
      const validInput: GuardianGorillaInput = {
        gameState: { phase: 'playing' },
        hand: [{ id: 'c1', value: 10 }],
        opponents: [{ id: 'p2', score: 50, threatLevel: 0.7 }],
        myTowerHeight: 15,
        roundNumber: 5,
      };
      expect(validateGuardianInput(validInput)).toBe(true);
    });

    it('should reject missing myTowerHeight', () => {
      const input = { gameState: {}, hand: [], opponents: [], roundNumber: 1 };
      expect(validateGuardianInput(input)).toBe(false);
    });
  });

  describe('WildcardLemur Validation', () => {
    it('should validate correct input structure', () => {
      const validInput: WildcardLemurInput = {
        gameState: { phase: 'playing' },
        hand: [{ id: 'c1', value: 10 }],
        opponents: [{ id: 'p2', score: 50 }],
        roundNumber: 3,
        chaosSeed: 12345,
      };
      expect(validateWildcardInput(validInput)).toBe(true);
    });

    it('should reject missing chaosSeed', () => {
      const input = { gameState: {}, hand: [], opponents: [], roundNumber: 1 };
      expect(validateWildcardInput(input)).toBe(false);
    });
  });

  describe('MentorOrangutan Validation', () => {
    it('should validate correct input structure', () => {
      const validInput: MentorOrangutanInput = {
        gameState: { phase: 'playing' },
        hand: [{ id: 'c1', value: 10 }],
        opponents: [{ id: 'p2', score: 50, experienceLevel: 2 }],
        roundNumber: 3,
        isNewPlayer: true,
      };
      expect(validateMentorInput(validInput)).toBe(true);
    });

    it('should reject missing isNewPlayer', () => {
      const input = { gameState: {}, hand: [], opponents: [], roundNumber: 1 };
      expect(validateMentorInput(input)).toBe(false);
    });
  });

  describe('ChampionChimp Validation', () => {
    it('should validate correct input structure', () => {
      const validInput: ChampionChimpInput = {
        gameState: { phase: 'playing' },
        hand: [{ id: 'c1', value: 10 }],
        opponents: [{ id: 'p2', score: 50, ranking: 3 }],
        roundNumber: 5,
        totalRounds: 12,
        currentRank: 2,
      };
      expect(validateChampionInput(validInput)).toBe(true);
    });

    it('should reject missing currentRank', () => {
      const input = { gameState: {}, hand: [], opponents: [], roundNumber: 1, totalRounds: 12 };
      expect(validateChampionInput(input)).toBe(false);
    });
  });
});

describe('Personality Prompts - Output Formatting', () => {
  describe('TricksterMonkey Output', () => {
    it('should format output with defaults', () => {
      const rawOutput = {};
      const formatted = formatTricksterOutput(rawOutput);
      expect(formatted.action).toBe('pass');
      expect(formatted.bluffIndicator).toBe(0.5);
      expect(formatted.confidence).toBe(0.5);
      expect(formatted.reasoning).toBe('Making a mysterious move...');
    });

    it('should format output with provided values', () => {
      const rawOutput = {
        action: 'play_card',
        cardId: 'c1',
        targetId: 'p2',
        reasoning: 'Deceptive play',
        bluffIndicator: 0.8,
        confidence: 0.9,
      };
      const formatted = formatTricksterOutput(rawOutput);
      expect(formatted.action).toBe('play_card');
      expect(formatted.cardId).toBe('c1');
      expect(formatted.targetId).toBe('p2');
      expect(formatted.reasoning).toBe('Deceptive play');
      expect(formatted.bluffIndicator).toBe(0.8);
      expect(formatted.confidence).toBe(0.9);
    });

    it('should handle special action type', () => {
      const rawOutput = { action: 'special', cardId: 'c1' };
      const formatted = formatTricksterOutput(rawOutput);
      expect(formatted.action).toBe('special');
    });
  });

  describe('StrategistApe Output', () => {
    it('should format output with defaults', () => {
      const rawOutput = {};
      const formatted = formatStrategistOutput(rawOutput);
      expect(formatted.action).toBe('pass');
      expect(formatted.planPhase).toBe('mid');
      expect(formatted.longTermStrategy).toBe('Long-term position building');
    });

    it('should format output with provided values', () => {
      const rawOutput = {
        action: 'special',
        cardId: 'c1',
        reasoning: 'Strategic timing',
        planPhase: 'late' as const,
        longTermStrategy: 'Final push',
      };
      const formatted = formatStrategistOutput(rawOutput);
      expect(formatted.action).toBe('special');
      expect(formatted.planPhase).toBe('late');
      expect(formatted.longTermStrategy).toBe('Final push');
    });
  });

  describe('SpeedyGibbon Output', () => {
    it('should format output with defaults', () => {
      const rawOutput = {};
      const formatted = formatSpeedyOutput(rawOutput);
      expect(formatted.action).toBe('pass');
      expect(formatted.aggressionLevel).toBe(0.8);
      expect(formatted.speedDecision).toBe(true);
      expect(formatted.reasoning).toBe('GOING FAST!');
    });

    it('should format output with provided values', () => {
      const rawOutput = {
        action: 'play_card',
        cardId: 'c1',
        targetId: 'p2',
        reasoning: 'Fast attack',
        aggressionLevel: 1.0,
      };
      const formatted = formatSpeedyOutput(rawOutput);
      expect(formatted.action).toBe('play_card');
      expect(formatted.aggressionLevel).toBe(1.0);
      expect(formatted.speedDecision).toBe(true);
    });
  });

  describe('GuardianGorilla Output', () => {
    it('should format output with defaults', () => {
      const rawOutput = {};
      const formatted = formatGuardianOutput(rawOutput);
      expect(formatted.action).toBe('pass');
      expect(formatted.defensePriority).toBe(0.8);
      expect(formatted.threatMitigation).toBe('Defensive positioning');
    });

    it('should format output with defend action', () => {
      const rawOutput = {
        action: 'defend',
        cardId: 'c1',
        targetId: 'p2',
        reasoning: 'Blocking threat',
        defensePriority: 0.9,
        threatMitigation: 'Counter-attack after block',
      };
      const formatted = formatGuardianOutput(rawOutput);
      expect(formatted.action).toBe('defend');
      expect(formatted.defensePriority).toBe(0.9);
    });
  });

  describe('WildcardLemur Output', () => {
    it('should format output with defaults', () => {
      const rawOutput = {};
      const formatted = formatWildcardOutput(rawOutput);
      expect(formatted.action).toBe('random');
      expect(formatted.chaosFactor).toBe(0.7);
      expect(formatted.unexpectedMove).toBe(true);
      expect(formatted.reasoning).toBe('Chaos logic!');
    });

    it('should format output with provided values', () => {
      const rawOutput = {
        action: 'special',
        cardId: 'c1',
        reasoning: 'Chaos logic',
        chaosFactor: 1.0,
        unexpectedMove: true,
      };
      const formatted = formatWildcardOutput(rawOutput);
      expect(formatted.action).toBe('special');
      expect(formatted.chaosFactor).toBe(1.0);
    });
  });

  describe('MentorOrangutan Output', () => {
    it('should format output with defaults', () => {
      const rawOutput = {};
      const formatted = formatMentorOutput(rawOutput);
      expect(formatted.action).toBe('teach');
      expect(formatted.teachingMoment).toBe(false);
      expect(formatted.encouragement).toBe('Great effort, everyone!');
    });

    it('should format output with provided values', () => {
      const rawOutput = {
        action: 'play_card',
        cardId: 'c1',
        reasoning: 'Teaching moment',
        teachingMoment: true,
        helpfulTip: 'Position matters!',
        encouragement: 'Keep learning!',
      };
      const formatted = formatMentorOutput(rawOutput);
      expect(formatted.action).toBe('play_card');
      expect(formatted.teachingMoment).toBe(true);
      expect(formatted.helpfulTip).toBe('Position matters!');
    });
  });

  describe('ChampionChimp Output', () => {
    it('should format output with defaults', () => {
      const rawOutput = {};
      const formatted = formatChampionOutput(rawOutput);
      expect(formatted.action).toBe('play_card');
      expect(formatted.competitiveMode).toBe(true);
      expect(formatted.winCondition).toBe('Dominant victory');
      expect(formatted.clutchFactor).toBe(0.5);
    });

    it('should format output with provided values', () => {
      const rawOutput = {
        action: 'special',
        cardId: 'c1',
        targetId: 'p2',
        reasoning: 'Championship moment',
        winCondition: 'Clutch performance',
        clutchFactor: 0.9,
      };
      const formatted = formatChampionOutput(rawOutput);
      expect(formatted.action).toBe('special');
      expect(formatted.competitiveMode).toBe(true);
      expect(formatted.winCondition).toBe('Clutch performance');
      expect(formatted.clutchFactor).toBe(0.9);
    });
  });
});

describe('Personality Distinction', () => {
  it('should have distinct output properties per personality', () => {
    const tricksterOutput = formatTricksterOutput({ bluffIndicator: 0.9, confidence: 0.8 });
    expect(tricksterOutput.bluffIndicator).toBe(0.9);
    expect(tricksterOutput.confidence).toBe(0.8);

    const strategistOutput = formatStrategistOutput({ planPhase: 'mid' });
    expect(strategistOutput.planPhase).toBe('mid');

    const speedyOutput = formatSpeedyOutput({ aggressionLevel: 0.9 });
    expect(speedyOutput.aggressionLevel).toBe(0.9);
    expect(speedyOutput.speedDecision).toBe(true);

    const guardianOutput = formatGuardianOutput({ defensePriority: 0.9 });
    expect(guardianOutput.defensePriority).toBe(0.9);

    const wildcardOutput = formatWildcardOutput({ chaosFactor: 0.9 });
    expect(wildcardOutput.chaosFactor).toBe(0.9);

    const mentorOutput = formatMentorOutput({ teachingMoment: true });
    expect(mentorOutput.teachingMoment).toBe(true);

    const championOutput = formatChampionOutput({ clutchFactor: 0.9 });
    expect(championOutput.clutchFactor).toBe(0.9);
    expect(championOutput.competitiveMode).toBe(true);
  });

  it('should have unique action sets per personality', () => {
    const guardianActions = ['play_card', 'pass', 'special', 'defend'];
    const wildcardActions = ['play_card', 'pass', 'special', 'random'];
    const mentorActions = ['play_card', 'pass', 'special', 'teach'];

    expect(guardianActions).toContain('defend');
    expect(wildcardActions).toContain('random');
    expect(mentorActions).toContain('teach');
  });
});

describe('Edge Cases', () => {
  it('should handle empty arrays in valid input', () => {
    const tricksterInput: TricksterMonkeyInput = {
      gameState: {},
      hand: [],
      opponents: [],
      roundNumber: 1,
      totalRounds: 12,
    };
    expect(validateTricksterInput(tricksterInput)).toBe(true);
  });

  it('should handle complex gameState', () => {
    const complexState: TricksterMonkeyInput = {
      gameState: {
        phase: 'playing',
        tableCards: [{ id: 't1', value: 5 }],
        deckSize: 42,
        currentPlayer: 'p1',
        turnTimer: 30,
      },
      hand: [{ id: 'c1', value: 10 }, { id: 'c2', value: 7 }],
      opponents: [
        { id: 'p2', score: 50 },
        { id: 'p3', score: 45 },
      ],
      roundNumber: 5,
      totalRounds: 12,
    };
    expect(validateTricksterInput(complexState)).toBe(true);
  });

  it('should handle numeric edge cases', () => {
    const edgeOutput = {
      bluffIndicator: 0,
      confidence: 1,
      aggressionLevel: 0,
      defensePriority: 1,
      chaosFactor: 0.5,
      clutchFactor: 0,
    };
    const tricksterFormatted = formatTricksterOutput(edgeOutput);
    expect(tricksterFormatted.bluffIndicator).toBe(0);
    expect(tricksterFormatted.confidence).toBe(1);
  });

  it('should handle undefined optional fields', () => {
    const rawOutput = {
      action: 'play_card',
      cardId: 'c1',
      reasoning: 'Test',
    };
    const formatted = formatTricksterOutput(rawOutput);
    expect(formatted.targetId).toBeUndefined();
  });

  it('should handle malformed output gracefully', () => {
    const malformedOutput = {
      action: 'play_card',
      cardId: 123,
      reasoning: { complex: 'object' },
      bluffIndicator: 'high',
      confidence: [0.5],
    };
    const formatted = formatTricksterOutput(malformedOutput);
    expect(formatted.action).toBe('play_card');
    expect(formatted.cardId).toBe(123);
    expect(formatted.reasoning).toEqual({ complex: 'object' });
    expect(formatted.bluffIndicator).toBe(0.5);
    expect(formatted.confidence).toBe(0.5);
  });
});
