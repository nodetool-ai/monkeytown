import { z } from 'zod';
import type { BabelAction, BabelCard, Player } from '../game/types.js';

const CARD_ID_REGEX = /^babel-\d+$/;
const PLAYER_ID_REGEX = /^[a-zA-Z0-9_-]{1,64}$/;
const GAME_ID_REGEX = /^[a-zA-Z0-9_-]{8,64}$/;
const MESSAGE_MAX_LENGTH = 500;
const MAX_ACTIONS_PER_MINUTE = 30;

export class ActionValidator {
  private actionCounts: Map<string, number> = new Map();
  private lastActionTime: Map<string, number> = new Map();

  validateBabelAction(action: unknown): { valid: boolean; error?: string; parsed?: BabelAction } {
    if (!action || typeof action !== 'object') {
      return { valid: false, error: 'Action must be an object' };
    }

    const actionObj = action as Record<string, unknown>;

    const typeValidation = this.validateActionType(actionObj.type);
    if (!typeValidation.valid) {
      return { valid: false, error: typeValidation.error };
    }

    switch (actionObj.type) {
      case 'play_card':
        return this.validatePlayCard(actionObj);
      case 'pass':
        return this.validatePass(actionObj);
      case 'special_babel_tower':
        return this.validateSpecialAction(actionObj);
      default:
        return { valid: false, error: `Unknown action type: ${actionObj.type}` };
    }
  }

  private validateActionType(type: unknown): { valid: boolean; error?: string } {
    if (typeof type !== 'string') {
      return { valid: false, error: 'Action type must be a string' };
    }

    const validTypes = ['play_card', 'pass', 'special_babel_tower'];
    if (!validTypes.includes(type)) {
      return { valid: false, error: `Invalid action type: ${type}` };
    }

    return { valid: true };
  }

  private validatePlayCard(actionObj: Record<string, unknown>): { valid: boolean; error?: string; parsed?: BabelAction } {
    const cardId = actionObj.cardId;

    if (typeof cardId !== 'string') {
      return { valid: false, error: 'Card ID must be a string' };
    }

    if (!CARD_ID_REGEX.test(cardId)) {
      return { valid: false, error: 'Invalid card ID format' };
    }

    if (cardId.length > 32) {
      return { valid: false, error: 'Card ID too long' };
    }

    return {
      valid: true,
      parsed: { type: 'play_card', cardId },
    };
  }

  private validatePass(actionObj: Record<string, unknown>): { valid: boolean; error?: string; parsed?: BabelAction } {
    if (Object.keys(actionObj).length > 1) {
      return { valid: false, error: 'Pass action should not have additional properties' };
    }

    return { valid: true, parsed: { type: 'pass' } };
  }

  private validateSpecialAction(actionObj: Record<string, unknown>): { valid: boolean; error?: string; parsed?: BabelAction } {
    const cardId = actionObj.cardId;

    if (typeof cardId !== 'string') {
      return { valid: false, error: 'Card ID must be a string' };
    }

    if (!CARD_ID_REGEX.test(cardId)) {
      return { valid: false, error: 'Invalid card ID format' };
    }

    const targetPlayerId = actionObj.targetPlayerId;
    if (targetPlayerId !== undefined) {
      if (typeof targetPlayerId !== 'string') {
        return { valid: false, error: 'Target player ID must be a string' };
      }

      if (!PLAYER_ID_REGEX.test(targetPlayerId)) {
        return { valid: false, error: 'Invalid target player ID format' };
      }
    }

    return {
      valid: true,
      parsed: {
        type: 'special_babel_tower',
        cardId,
        targetPlayerId: targetPlayerId as string | undefined,
      },
    };
  }

  validatePlayerId(playerId: string): { valid: boolean; error?: string } {
    if (!playerId || typeof playerId !== 'string') {
      return { valid: false, error: 'Player ID must be a string' };
    }

    if (playerId.length < 1 || playerId.length > 64) {
      return { valid: false, error: 'Player ID must be between 1 and 64 characters' };
    }

    if (!PLAYER_ID_REGEX.test(playerId)) {
      return { valid: false, error: 'Player ID contains invalid characters' };
    }

    return { valid: true };
  }

  validateGameId(gameId: string): { valid: boolean; error?: string } {
    if (!gameId || typeof gameId !== 'string') {
      return { valid: false, error: 'Game ID must be a string' };
    }

    if (gameId.length < 8 || gameId.length > 64) {
      return { valid: false, error: 'Game ID must be between 8 and 64 characters' };
    }

    if (!GAME_ID_REGEX.test(gameId)) {
      return { valid: false, error: 'Game ID contains invalid characters' };
    }

    return { valid: true };
  }

  validateChatMessage(message: unknown): { valid: boolean; error?: string; parsed?: string } {
    if (typeof message !== 'string') {
      return { valid: false, error: 'Message must be a string' };
    }

    if (message.length === 0) {
      return { valid: false, error: 'Message cannot be empty' };
    }

    if (message.length > MESSAGE_MAX_LENGTH) {
      return { valid: false, error: `Message too long (max ${MESSAGE_MAX_LENGTH} characters)` };
    }

    const sanitized = this.sanitizeString(message);
    return { valid: true, parsed: sanitized };
  }

  private sanitizeString(str: string): string {
    return str
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }

  checkRateLimit(playerId: string): { allowed: boolean; error?: string } {
    const now = Date.now();
    const windowMs = 60000;
    const maxActions = MAX_ACTIONS_PER_MINUTE;

    const lastTime = this.lastActionTime.get(playerId) || 0;
    const count = this.actionCounts.get(playerId) || 0;

    if (now - lastTime > windowMs) {
      this.actionCounts.set(playerId, 1);
      this.lastActionTime.set(playerId, now);
      return { allowed: true };
    }

    if (count >= maxActions) {
      return { allowed: false, error: 'Too many actions. Please slow down.' };
    }

    this.actionCounts.set(playerId, count + 1);
    return { allowed: true };
  }

  validateCard(card: unknown): { valid: boolean; error?: string; parsed?: BabelCard } {
    if (!card || typeof card !== 'object') {
      return { valid: false, error: 'Card must be an object' };
    }

    const cardObj = card as Record<string, unknown>;

    const id = cardObj.id;
    const value = cardObj.value;
    const suit = cardObj.suit;

    if (typeof id !== 'string' || !CARD_ID_REGEX.test(id)) {
      return { valid: false, error: 'Invalid card ID' };
    }

    if (typeof value !== 'number' || value < 1 || value > 25) {
      return { valid: false, error: 'Card value must be a number between 1 and 25' };
    }

    if (suit !== undefined) {
      if (typeof suit !== 'string' || !['stone', 'brick', 'wood', 'glass'].includes(suit)) {
        return { valid: false, error: 'Invalid card suit' };
      }
    }

    return {
      valid: true,
      parsed: {
        id,
        value,
        suit: suit as 'stone' | 'brick' | 'wood' | 'glass' | undefined,
      },
    };
  }

  validatePlayer(player: unknown): { valid: boolean; error?: string; parsed?: Player } {
    if (!player || typeof player !== 'object') {
      return { valid: false, error: 'Player must be an object' };
    }

    const playerObj = player as Record<string, unknown>;

    const id = playerObj.id;
    const name = playerObj.name;
    const type = playerObj.type;

    const idValidation = this.validatePlayerId(id as string);
    if (!idValidation.valid) {
      return { valid: false, error: idValidation.error };
    }

    if (typeof name !== 'string' || name.length < 1 || name.length > 32) {
      return { valid: false, error: 'Player name must be 1-32 characters' };
    }

    if (type !== 'human' && type !== 'agent') {
      return { valid: false, error: 'Player type must be human or agent' };
    }

    const agentType = playerObj.agentType;
    if (type === 'agent' && (!agentType || typeof agentType !== 'string')) {
      return { valid: false, error: 'Agent player must have agentType' };
    }

    return {
      valid: true,
      parsed: {
        id: id as string,
        name: name as string,
        type: type as 'human' | 'agent',
        agentType: agentType as 'chaos' | 'curious' | 'designer' | 'security' | 'economist' | 'madchimp' | 'founder' | undefined,
        score: 0,
        isConnected: true,
      },
    };
  }

  cleanup(): void {
    const now = Date.now();
    const windowMs = 60000;

    for (const [playerId, lastTime] of this.lastActionTime.entries()) {
      if (now - lastTime > windowMs) {
        this.actionCounts.delete(playerId);
        this.lastActionTime.delete(playerId);
      }
    }
  }
}

export const actionValidator = new ActionValidator();

const babelActionSchema = z.object({
  type: z.enum(['play_card', 'pass', 'special_babel_tower']),
  cardId: z.string().regex(CARD_ID_REGEX).optional(),
  targetPlayerId: z.string().regex(PLAYER_ID_REGEX).optional(),
}).refine((data) => {
  if (data.type === 'play_card' && !data.cardId) {
    return false;
  }
  if (data.type === 'special_babel_tower' && !data.cardId) {
    return false;
  }
  return true;
}, {
  message: 'play_card and special_babel_tower require cardId',
});

export function validateActionWithSchema(action: unknown): { valid: boolean; error?: string; data?: BabelAction } {
  const result = babelActionSchema.safeParse(action);

  if (!result.success) {
    const errors = result.error.errors.map(e => e.message).join(', ');
    return { valid: false, error: `Validation failed: ${errors}` };
  }

  return { valid: true, data: result.data as BabelAction };
}
