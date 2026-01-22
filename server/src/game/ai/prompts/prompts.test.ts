import { describe, it, expect } from 'vitest';
import {
  validateGuardianInput,
  formatGuardianOutput,
} from './guardian-gorilla.js';
import {
  validateLemurInput,
  formatLemurOutput,
} from './wildcard-lemur.js';
import {
  validateMentorInput,
  formatMentorOutput,
} from './mentor-orangutan.js';
import {
  validateChampionInput,
  formatChampionOutput,
} from './champion-chimp.js';

describe('GuardianGorilla Prompt', () => {
  it('should validate correct input', () => {
    const validInput = {
      gameState: { phase: 'playing' },
      hand: [{ id: 'card1', value: 5 }],
      opponents: [{ id: 'player1', score: 10, threatLevel: 7 }],
      myTowerHeight: 15,
      roundNumber: 3,
    };
    expect(validateGuardianInput(validInput)).toBe(true);
  });

  it('should reject invalid input', () => {
    expect(validateGuardianInput(null)).toBe(false);
    expect(validateGuardianInput({})).toBe(false);
    expect(validateGuardianInput({ gameState: {} })).toBe(false);
  });

  it('should format output correctly', () => {
    const output = {
      action: 'defend',
      cardId: 'card1',
      targetId: 'player1',
      reasoning: 'Blocking the threat',
      defensePriority: 0.9,
      threatMitigation: 'High threat opponent',
    };
    const formatted = formatGuardianOutput(output);
    expect(formatted.action).toBe('defend');
    expect(formatted.defensePriority).toBe(0.9);
  });

  it('should handle missing output fields', () => {
    const formatted = formatGuardianOutput({});
    expect(formatted.action).toBe('pass');
    expect(formatted.defensePriority).toBe(0.8);
    expect(formatted.threatMitigation).toBe('General defense');
  });
});

describe('WildcardLemur Prompt', () => {
  it('should validate correct input', () => {
    const validInput = {
      gameState: { phase: 'playing' },
      hand: [{ id: 'card1', value: 3 }],
      opponents: [{ id: 'player1', score: 5 }],
      roundNumber: 2,
      chaosSeed: 12345,
    };
    expect(validateLemurInput(validInput)).toBe(true);
  });

  it('should reject invalid input', () => {
    expect(validateLemurInput(null)).toBe(false);
    expect(validateLemurInput({ roundNumber: 1 })).toBe(false);
  });

  it('should format output with unexpectedMove always true', () => {
    const output = {
      action: 'random',
      cardId: 'card1',
      reasoning: 'Chaos choice',
      chaosFactor: 0.95,
    };
    const formatted = formatLemurOutput(output);
    expect(formatted.action).toBe('random');
    expect(formatted.chaosFactor).toBe(0.95);
    expect(formatted.unexpectedMove).toBe(true);
  });
});

describe('MentorOrangutan Prompt', () => {
  it('should validate correct input', () => {
    const validInput = {
      gameState: { phase: 'playing' },
      hand: [{ id: 'card1', value: 4 }],
      opponents: [{ id: 'player1', score: 8, experienceLevel: 2 }],
      roundNumber: 1,
      isNewPlayer: true,
    };
    expect(validateMentorInput(validInput)).toBe(true);
  });

  it('should reject invalid input', () => {
    expect(validateMentorInput(null)).toBe(false);
    expect(validateMentorInput({ isNewPlayer: false })).toBe(false);
  });

  it('should format output with teaching fields', () => {
    const output = {
      action: 'teach',
      cardId: 'card1',
      targetId: 'player1',
      reasoning: 'Good learning moment',
      teachingMoment: true,
      helpfulTip: 'Try counting your cards!',
      encouragement: 'Great effort!',
    };
    const formatted = formatMentorOutput(output);
    expect(formatted.action).toBe('teach');
    expect(formatted.teachingMoment).toBe(true);
    expect(formatted.helpfulTip).toBe('Try counting your cards!');
    expect(formatted.encouragement).toBe('Great effort!');
  });
});

describe('ChampionChimp Prompt', () => {
  it('should validate correct input', () => {
    const validInput = {
      gameState: { phase: 'playing' },
      hand: [{ id: 'card1', value: 6 }],
      opponents: [{ id: 'player1', score: 12, ranking: 2 }],
      roundNumber: 5,
      totalRounds: 10,
      currentRank: 1,
    };
    expect(validateChampionInput(validInput)).toBe(true);
  });

  it('should reject invalid input', () => {
    expect(validateChampionInput(null)).toBe(false);
    expect(validateChampionInput({ currentRank: 1 })).toBe(false);
  });

  it('should format output with competitive fields', () => {
    const output = {
      action: 'play_card',
      cardId: 'card1',
      targetId: 'player1',
      reasoning: 'Clutch play to maintain lead',
      winCondition: 'Dominant victory',
      clutchFactor: 0.85,
    };
    const formatted = formatChampionOutput(output);
    expect(formatted.action).toBe('play_card');
    expect(formatted.competitiveMode).toBe(true);
    expect(formatted.winCondition).toBe('Dominant victory');
    expect(formatted.clutchFactor).toBe(0.85);
  });

  it('should have competitiveMode always true', () => {
    const formatted = formatChampionOutput({});
    expect(formatted.competitiveMode).toBe(true);
  });
});
