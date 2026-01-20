import { describe, it, expect, beforeEach } from 'vitest';
import { ActionValidator, actionValidator, validateActionWithSchema } from '../services/validation.js';

describe('ActionValidator', () => {
  let validator: ActionValidator;

  beforeEach(() => {
    validator = new ActionValidator();
  });

  describe('validateBabelAction', () => {
    it('should reject non-object actions', () => {
      const result = validator.validateBabelAction('invalid');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Action must be an object');
    });

    it('should reject actions with missing type', () => {
      const result = validator.validateBabelAction({});
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Action type must be a string');
    });

    it('should reject invalid action types', () => {
      const result = validator.validateBabelAction({ type: 'invalid_type' });
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Invalid action type');
    });

    it('should validate play_card action with valid cardId', () => {
      const result = validator.validateBabelAction({
        type: 'play_card',
        cardId: 'babel-123',
      });
      expect(result.valid).toBe(true);
      expect(result.parsed?.type).toBe('play_card');
      expect(result.parsed?.cardId).toBe('babel-123');
    });

    it('should reject play_card with missing cardId', () => {
      const result = validator.validateBabelAction({
        type: 'play_card',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Card ID must be a string');
    });

    it('should reject play_card with invalid cardId format', () => {
      const result = validator.validateBabelAction({
        type: 'play_card',
        cardId: 'invalid-card',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid card ID format');
    });

    it('should validate pass action', () => {
      const result = validator.validateBabelAction({ type: 'pass' });
      expect(result.valid).toBe(true);
      expect(result.parsed?.type).toBe('pass');
    });

    it('should reject pass action with additional properties', () => {
      const result = validator.validateBabelAction({
        type: 'pass',
        extra: 'data',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Pass action should not have additional properties');
    });

    it('should validate special_babel_tower action', () => {
      const result = validator.validateBabelAction({
        type: 'special_babel_tower',
        cardId: 'babel-456',
        targetPlayerId: 'player-123',
      });
      expect(result.valid).toBe(true);
      expect(result.parsed?.type).toBe('special_babel_tower');
      expect(result.parsed?.cardId).toBe('babel-456');
      expect(result.parsed?.targetPlayerId).toBe('player-123');
    });

    it('should validate special_babel_tower without targetPlayerId', () => {
      const result = validator.validateBabelAction({
        type: 'special_babel_tower',
        cardId: 'babel-456',
      });
      expect(result.valid).toBe(true);
      expect(result.parsed?.targetPlayerId).toBeUndefined();
    });
  });

  describe('validatePlayerId', () => {
    it('should validate valid player IDs', () => {
      expect(validator.validatePlayerId('player-123').valid).toBe(true);
      expect(validator.validatePlayerId('abc').valid).toBe(true);
      expect(validator.validatePlayerId('PLAYER_123').valid).toBe(true);
    });

  it('should reject empty player ID', () => {
    const result = validator.validatePlayerId('');
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Player ID must be a string');
  });

    it('should reject player ID with invalid characters', () => {
      const result = validator.validatePlayerId('player@123');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Player ID contains invalid characters');
    });

    it('should reject player ID that is too long', () => {
      const result = validator.validatePlayerId('a'.repeat(65));
      expect(result.valid).toBe(false);
    });
  });

  describe('validateGameId', () => {
    it('should validate valid game IDs', () => {
      expect(validator.validateGameId('game-1234').valid).toBe(true);
      expect(validator.validateGameId('abcdefgh').valid).toBe(true);
    });

    it('should reject game ID that is too short', () => {
      const result = validator.validateGameId('short');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Game ID must be between 8 and 64 characters');
    });

    it('should reject game ID with invalid characters', () => {
      const result = validator.validateGameId('game@1234');
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Game ID contains invalid characters');
    });
  });

  describe('validateChatMessage', () => {
    it('should validate valid messages', () => {
      const result = validator.validateChatMessage('Hello, world!');
      expect(result.valid).toBe(true);
      expect(result.parsed).toBe('Hello, world!');
    });

    it('should reject non-string messages', () => {
      const result = validator.validateChatMessage(123);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Message must be a string');
    });

    it('should reject empty messages', () => {
      const result = validator.validateChatMessage('');
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Message cannot be empty');
    });

    it('should reject messages that are too long', () => {
      const result = validator.validateChatMessage('a'.repeat(501));
      expect(result.valid).toBe(false);
      expect(result.error).toContain('Message too long');
    });

    it('should sanitize HTML tags', () => {
      const result = validator.validateChatMessage('<script>alert("xss")</script>');
      expect(result.valid).toBe(true);
      expect(result.parsed).not.toContain('<script>');
    });

    it('should sanitize javascript: protocol', () => {
      const result = validator.validateChatMessage('javascript:alert(1)');
      expect(result.valid).toBe(true);
      expect(result.parsed).not.toContain('javascript:');
    });

    it('should sanitize event handlers', () => {
      const result = validator.validateChatMessage('onclick="alert(1)"');
      expect(result.valid).toBe(true);
      expect(result.parsed).not.toContain('onclick');
    });
  });

  describe('checkRateLimit', () => {
    it('should allow actions within rate limit', () => {
      for (let i = 0; i < 10; i++) {
        expect(validator.checkRateLimit('player1').allowed).toBe(true);
      }
    });

    it('should block actions exceeding rate limit', () => {
      for (let i = 0; i < 30; i++) {
        validator.checkRateLimit('player2');
      }
      const result = validator.checkRateLimit('player2');
      expect(result.allowed).toBe(false);
      expect(result.error).toContain('Too many actions');
    });

  it('should track rate limit counts per player', () => {
    const v = new ActionValidator();
    expect(v.checkRateLimit('player-a').allowed).toBe(true);
    expect(v.checkRateLimit('player-b').allowed).toBe(true);
    expect(v.checkRateLimit('player-a').allowed).toBe(true);
    expect(v.checkRateLimit('player-b').allowed).toBe(true);
  });
  });

  describe('validateCard', () => {
    it('should validate valid cards', () => {
      const result = validator.validateCard({
        id: 'babel-123',
        value: 10,
        suit: 'stone',
      });
      expect(result.valid).toBe(true);
      expect(result.parsed?.id).toBe('babel-123');
      expect(result.parsed?.value).toBe(10);
      expect(result.parsed?.suit).toBe('stone');
    });

    it('should validate cards without suit', () => {
      const result = validator.validateCard({
        id: 'babel-123',
        value: 5,
      });
      expect(result.valid).toBe(true);
      expect(result.parsed?.suit).toBeUndefined();
    });

    it('should reject cards with invalid ID', () => {
      const result = validator.validateCard({
        id: 'invalid',
        value: 10,
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid card ID');
    });

    it('should reject cards with invalid value', () => {
      const result = validator.validateCard({
        id: 'babel-123',
        value: 30,
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Card value must be a number between 1 and 25');
    });

    it('should reject cards with invalid suit', () => {
      const result = validator.validateCard({
        id: 'babel-123',
        value: 10,
        suit: 'invalid',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Invalid card suit');
    });
  });

  describe('validatePlayer', () => {
    it('should validate valid players', () => {
      const result = validator.validatePlayer({
        id: 'player-123',
        name: 'TestPlayer',
        type: 'human',
      });
      expect(result.valid).toBe(true);
      expect(result.parsed?.id).toBe('player-123');
      expect(result.parsed?.name).toBe('TestPlayer');
      expect(result.parsed?.type).toBe('human');
    });

    it('should validate agent players with agentType', () => {
      const result = validator.validatePlayer({
        id: 'agent-123',
        name: 'TestAI',
        type: 'agent',
        agentType: 'strategist',
      });
      expect(result.valid).toBe(true);
      expect(result.parsed?.type).toBe('agent');
      expect(result.parsed?.agentType).toBe('strategist');
    });

    it('should reject agent players without agentType', () => {
      const result = validator.validatePlayer({
        id: 'agent-123',
        name: 'TestAI',
        type: 'agent',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Agent player must have agentType');
    });

    it('should reject players with invalid name length', () => {
      const result = validator.validatePlayer({
        id: 'player-123',
        name: '',
        type: 'human',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Player name must be 1-32 characters');
    });

    it('should reject players with invalid type', () => {
      const result = validator.validatePlayer({
        id: 'player-123',
        name: 'TestPlayer',
        type: 'robot',
      });
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Player type must be human or agent');
    });
  });

  describe('cleanup', () => {
    it('should remove stale rate limit entries', () => {
      const v = new ActionValidator();
      v.checkRateLimit('stale-player');
      v.cleanup();
      expect(v.checkRateLimit('stale-player').allowed).toBe(true);
    });
  });
});

describe('validateActionWithSchema', () => {
  it('should validate valid play_card action', () => {
    const result = validateActionWithSchema({
      type: 'play_card',
      cardId: 'babel-123',
    });
    expect(result.valid).toBe(true);
    expect(result.data?.type).toBe('play_card');
  });

  it('should reject play_card without cardId', () => {
    const result = validateActionWithSchema({
      type: 'play_card',
    });
    expect(result.valid).toBe(false);
  });

  it('should validate pass action', () => {
    const result = validateActionWithSchema({
      type: 'pass',
    });
    expect(result.valid).toBe(true);
  });

  it('should validate special_babel_tower with cardId', () => {
    const result = validateActionWithSchema({
      type: 'special_babel_tower',
      cardId: 'babel-456',
    });
    expect(result.valid).toBe(true);
  });

  it('should reject special_babel_tower without cardId', () => {
    const result = validateActionWithSchema({
      type: 'special_babel_tower',
    });
    expect(result.valid).toBe(false);
  });

  it('should reject invalid action type', () => {
    const result = validateActionWithSchema({
      type: 'invalid',
    });
    expect(result.valid).toBe(false);
  });
});

describe('actionValidator singleton', () => {
  it('should be an instance of ActionValidator', () => {
    expect(actionValidator).toBeInstanceOf(ActionValidator);
  });

  it('should have all validation methods', () => {
    expect(typeof actionValidator.validateBabelAction).toBe('function');
    expect(typeof actionValidator.validatePlayerId).toBe('function');
    expect(typeof actionValidator.validateGameId).toBe('function');
    expect(typeof actionValidator.validateChatMessage).toBe('function');
    expect(typeof actionValidator.checkRateLimit).toBe('function');
    expect(typeof actionValidator.validateCard).toBe('function');
    expect(typeof actionValidator.validatePlayer).toBe('function');
  });
});
