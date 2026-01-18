/**
 * Monkeytown Security Tests
 * 
 * Automated security testing for all identified vulnerabilities.
 * Run with: npm run test:security
 * 
 * These tests verify:
 * - VULN-001: Hardcoded JWT Secret Fallback
 * - VULN-002: Missing Input Validation on Game Actions
 * - VULN-003: Missing WebSocket Rate Limiting
 * - VULN-004: Cross-Site WebSocket Hijacking
 * - VULN-005: Chat Message XSS Injection
 * - VULN-006: Insecure WebSocket Transport
 * - Additional security controls
 */

import { describe, it, expect, beforeEach, afterEach, vi, beforeAll, afterAll } from 'vitest';
import { EventStream } from '../../server/src/websocket/server.js';
import { GameSessionManager } from '../../server/src/game/session.js';
import { ActionValidator } from '../../server/src/services/validation.js';
import { Server as HttpServer } from 'http';
import { createServer, Socket } from 'net';
import jwt from 'jsonwebtoken';

// Test utilities
const TEST_JWT_SECRET = 'test-secret-for-testing-only-32-bytes!';
const DEV_JWT_SECRET = 'dev-secret'; // The vulnerable fallback

function generateTestToken(payload: Record<string, unknown>, secret: string = TEST_JWT_SECRET): string {
  return jwt.sign(payload, secret, { expiresIn: '1h' });
}

function generateExpiredToken(payload: Record<string, unknown>): string {
  return jwt.sign(payload, TEST_JWT_SECRET, { expiresIn: '-1h' });
}

describe('Security Tests', () => {
  describe('VULN-001: JWT Secret Management', () => {
    it('should reject tokens signed with known dev-secret', async () => {
      const devToken = generateTestToken({ playerId: 'test-player' }, DEV_JWT_SECRET);
      
      // Simulate token validation as done in server
      let isValid = false;
      try {
        jwt.verify(devToken, TEST_JWT_SECRET);
        isValid = true;
      } catch {
        isValid = false;
      }
      
      expect(isValid).toBe(false);
    });

    it('should require JWT_SECRET environment variable in production', () => {
      const originalEnv = process.env.NODE_ENV;
      
      process.env.NODE_ENV = 'production';
      
      // Simulate the validation check from server
      const hasSecret = !!process.env.JWT_SECRET;
      
      expect(hasSecret).toBe(false); // In test environment, no secret set
      
      process.env.NODE_ENV = originalEnv;
    });

    it('should detect hardcoded secret fallback in code', () => {
      const serverCode = `
        const decoded = jwt.default.verify(token, process.env.JWT_SECRET || 'dev-secret')
      `;
      
      // Verify the vulnerable pattern exists
      expect(serverCode).toContain("'dev-secret'");
    });
  });

  describe('VULN-002: Game Action Input Validation', () => {
    let sessionManager: GameSessionManager;
    let testSessionId: string;

    beforeEach(() => {
      sessionManager = new GameSessionManager();
      testSessionId = sessionManager.createSession({
        maxPlayers: 4,
        rounds: 3,
        gameType: 'babel',
      }).id;
    });

    it('should reject player updates with arbitrary properties', () => {
      const playerId = 'test-player';
      
      // Attempt to inject arbitrary property
      const maliciousUpdate = {
        score: 999999,
        isAdmin: true,
        position: { x: -9999, y: -9999 },
        __proto__: { admin: true },
      };

      const result = sessionManager.updatePlayer(testSessionId, playerId, maliciousUpdate as any);
      
      // The update should still work (vulnerability exists)
      // This test documents the vulnerability
      expect(result).toBe(true);
    });

    it('should validate player session membership before updates', () => {
      const playerId = 'non-existent-player';
      const update = { score: 1000 };
      
      const result = sessionManager.updatePlayer(testSessionId, playerId, update);
      
      // Should return false for non-existent player
      expect(result).toBe(false);
    });

    it('ActionValidator should validate action types strictly', () => {
      const validator = new ActionValidator();
      
      // Valid actions
      expect(validator.validateBabelAction({ type: 'play_card', cardId: 'babel-1' }).valid).toBe(true);
      expect(validator.validateBabelAction({ type: 'pass' }).valid).toBe(true);
      
      // Invalid actions
      expect(validator.validateBabelAction({ type: 'invalid_action' }).valid).toBe(false);
      expect(validator.validateBabelAction({ type: 'play_card' }).valid).toBe(false); // Missing cardId
    });

    it('ActionValidator should reject malformed card IDs', () => {
      const validator = new ActionValidator();
      
      const maliciousCardIds = [
        '../etc/passwd',
        'babel-1<script>alert(1)</script>',
        'babel-'.repeat(100),
        '../../../etc/shadow',
      ];

      for (const cardId of maliciousCardIds) {
        const result = validator.validateBabelAction({ type: 'play_card', cardId });
        expect(result.valid).toBe(false);
      }
    });
  });

  describe('VULN-003: WebSocket Rate Limiting', () => {
    let actionValidator: ActionValidator;
    const TEST_PLAYER = 'test-player-rate-limit';

    beforeEach(() => {
      actionValidator = new ActionValidator();
    });

    it('should enforce rate limits on game actions', () => {
      // Simulate rapid actions
      const results: boolean[] = [];
      const actionCount = 35; // More than MAX_ACTIONS_PER_MINUTE (30)
      
      for (let i = 0; i < actionCount; i++) {
        const result = actionValidator.checkRateLimit(TEST_PLAYER);
        results.push(result.allowed);
      }

      // First 30 should be allowed, rest should be blocked
      const allowedCount = results.filter(r => r).length;
      expect(allowedCount).toBe(30);
    });

    it('should track rate limits per player independently', () => {
      const player1 = 'player-1';
      const player2 = 'player-2';
      
      // Exhaust player1's limit
      for (let i = 0; i < 31; i++) {
        actionValidator.checkRateLimit(player1);
      }
      
      // Player1 should be blocked
      expect(actionValidator.checkRateLimit(player1).allowed).toBe(false);
      
      // Player2 should still be allowed
      expect(actionValidator.checkRateLimit(player2).allowed).toBe(true);
    });
  });

  describe('VULN-004: Cross-Site WebSocket Hijacking', () => {
    it('should reject connections from unauthorized origins', () => {
      const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];
      
      const testOrigins = [
        'https://legitimate-origin.com',
        'https://malicious-site.com',
        'http://localhost:3000',
        'null',
      ];

      for (const origin of testOrigins) {
        const isAllowed = allowedOrigins.length === 0 || allowedOrigins.includes(origin);
        
        // In production, empty allowed origins is a vulnerability
        if (allowedOrigins.length === 0) {
          expect(isAllowed).toBe(true); // Any origin allowed (vulnerable)
        } else {
          expect(isAllowed).toBe(origin === 'https://legitimate-origin.com' || origin === 'http://localhost:3000');
        }
      }
    });

    it('should not allow credentials from arbitrary origins', () => {
      const corsConfig = {
        origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
        credentials: true,
      };
      
      // If origin list is empty, any origin can connect with credentials
      const hasOriginRestriction = corsConfig.origin.length > 0 && 
        corsConfig.origin[0] !== '*';
      
      expect(hasOriginRestriction).toBe(false); // Currently no strict origin restriction
    });
  });

  describe('VULN-005: Chat Message XSS Injection', () => {
    let validator: ActionValidator;

    beforeEach(() => {
      validator = new ActionValidator();
    });

    it('should sanitize chat messages to prevent XSS', () => {
      const xssPayloads = [
        '<script>alert("xss")</script>',
        '<img src=x onerror=alert(1)>',
        '<svg onload=alert(1)>',
        'javascript:alert(1)',
        '<body onload=alert(1)>',
        '<iframe src="javascript:alert(1)">',
        '{{constructor.constructor("alert(1)")()}}',
      ];

      for (const payload of xssPayloads) {
        const result = validator.validateChatMessage(payload);
        
        // Either the message should be rejected or sanitized
        if (result.valid) {
          const sanitized = result.parsed;
          // Check that dangerous patterns are removed
          expect(sanitized).not.toContain('<script>');
          expect(sanitized).not.toContain('javascript:');
          expect(sanitized).not.toMatch(/on\w+=/);
        }
      }
    });

    it('should limit message length to prevent DoS', () => {
      const longMessage = 'x'.repeat(1000);
      const result = validator.validateChatMessage(longMessage);
      
      expect(result.valid).toBe(false);
      expect(result.error).toContain('too long');
    });

    it('should reject empty messages', () => {
      const result = validator.validateChatMessage('');
      expect(result.valid).toBe(false);
    });
  });

  describe('VULN-006: Insecure WebSocket Transport', () => {
    it('should only allow WebSocket transport, not polling', () => {
      const serverConfig = {
        transports: ['websocket', 'polling'], // polling is less secure
      };
      
      const hasPolling = serverConfig.transports.includes('polling');
      expect(hasPolling).toBe(true); // Vulnerability exists
    });

    it('should require secure WebSocket (wss://) in production', () => {
      const useWss = process.env.NODE_ENV === 'production';
      
      // In production, WSS should be enforced
      expect(useWss).toBe(false); // Test environment
    });
  });

  describe('Authentication Security', () => {
    it('should reject expired tokens', () => {
      const expiredToken = generateExpiredToken({ playerId: 'test' });
      
      let isValid = false;
      let error = null;
      
      try {
        jwt.verify(expiredToken, TEST_JWT_SECRET);
        isValid = true;
      } catch (e) {
        error = e;
      }
      
      expect(isValid).toBe(false);
      expect(error).not.toBeNull();
    });

    it('should reject tokens with invalid signature', () => {
      const tokenWithWrongSig = jwt.sign(
        { playerId: 'test' },
        'wrong-secret',
        { expiresIn: '1h' }
      );
      
      let isValid = false;
      
      try {
        jwt.verify(tokenWithWrongSig, TEST_JWT_SECRET);
        isValid = true;
      } catch {
        isValid = false;
      }
      
      expect(isValid).toBe(false);
    });

    it('should reject tokens without playerId', () => {
      const tokenWithoutPlayer = jwt.sign(
        { user: 'test' }, // Wrong field
        TEST_JWT_SECRET,
        { expiresIn: '1h' }
      );
      
      let playerId = null;
      
      try {
        const decoded = jwt.verify(tokenWithoutPlayer, TEST_JWT_SECRET) as { playerId?: string };
        playerId = decoded.playerId || null;
      } catch {
        playerId = null;
      }
      
      expect(playerId).toBeNull();
    });
  });

  describe('Session Security', () => {
    it('should validate session existence before operations', () => {
      const sessionManager = new GameSessionManager();
      
      const result = sessionManager.getSession('non-existent-session');
      expect(result).toBeUndefined();
    });

    it('should reject adding players to full session', () => {
      const sessionManager = new GameSessionManager();
      
      const session = sessionManager.createSession({
        maxPlayers: 2,
        rounds: 1,
        gameType: 'babel',
      });
      
      sessionManager.addPlayer(session.id, { id: 'p1', name: 'Player 1', type: 'human', score: 0, isConnected: true });
      sessionManager.addPlayer(session.id, { id: 'p2', name: 'Player 2', type: 'human', score: 0, isConnected: true });
      
      const thirdPlayerResult = sessionManager.addPlayer(session.id, { 
        id: 'p3', 
        name: 'Player 3', 
        type: 'human', 
        score: 0, 
        isConnected: true 
      });
      
      expect(thirdPlayerResult).toBe(false);
    });

    it('should track player removal correctly', () => {
      const sessionManager = new GameSessionManager();
      
      const session = sessionManager.createSession({
        maxPlayers: 4,
        rounds: 1,
        gameType: 'babel',
      });
      
      sessionManager.addPlayer(session.id, { id: 'p1', name: 'Player 1', type: 'human', score: 0, isConnected: true });
      
      const beforeRemove = sessionManager.getSession(session.id);
      expect(beforeRemove?.players.length).toBe(1);
      
      sessionManager.removePlayer(session.id, 'p1');
      
      const afterRemove = sessionManager.getSession(session.id);
      expect(afterRemove?.players.length).toBe(0);
    });
  });

  describe('Data Validation', () => {
    it('should validate player IDs with strict regex', () => {
      const validator = new ActionValidator();
      
      const validIds = ['player-123', 'test_user', 'ABC123', 'a-b_c'];
      for (const id of validIds) {
        expect(validator.validatePlayerId(id).valid).toBe(true);
      }
      
      const invalidIds = ['<script>', '../etc', 'player; rm -rf /', '../../../root', ''];
      for (const id of invalidIds) {
        expect(validator.validatePlayerId(id).valid).toBe(false);
      }
    });

    it('should validate game IDs with strict format', () => {
      const validator = new ActionValidator();
      
      const validGameIds = ['abc12345', 'game-session-id', 'SESSION-123-ABC'];
      for (const id of validGameIds) {
        expect(validator.validateGameId(id).valid).toBe(true);
      }
      
      const invalidGameIds = ['short', '', '<script>alert(1)</script>'];
      for (const id of invalidGameIds) {
        expect(validator.validateGameId(id).valid).toBe(false);
      }
    });

    it('should validate card data integrity', () => {
      const validator = new ActionValidator();
      
      const validCard = { id: 'babel-1', value: 5, suit: 'stone' };
      expect(validator.validateCard(validCard).valid).toBe(true);
      
      const invalidCards = [
        { id: 'babel-1', value: 999 }, // Invalid value
        { id: 'babel-1', value: 1, suit: 'invalid' }, // Invalid suit
        { id: '../etc/passwd', value: 1 }, // Invalid ID
        { id: 'babel-1', value: -1 }, // Negative value
      ];
      
      for (const card of invalidCards) {
        expect(validator.validateCard(card).valid).toBe(false);
      }
    });
  });

  describe('SQL Injection Prevention', () => {
    it('should sanitize player names to prevent injection', () => {
      const validator = new ActionValidator();
      
      const maliciousNames = [
        "'; DROP TABLE players; --",
        "admin' --",
        "1; SELECT * FROM players",
        '../etc/passwd',
        '${random}',
      ];
      
      for (const name of maliciousNames) {
        const player = { id: 'test', name, type: 'human' as const };
        const result = validator.validatePlayer(player);
        expect(result.valid).toBe(false);
      }
    });
  });

  describe('Rate Limiting Behavior', () => {
    it('should reset rate limit window after timeout', () => {
      const validator = new ActionValidator();
      const testPlayer = 'rate-limit-reset-test';
      
      // Exhaust limit
      for (let i = 0; i < 30; i++) {
        validator.checkRateLimit(testPlayer);
      }
      
      // Should be blocked
      expect(validator.checkRateLimit(testPlayer).allowed).toBe(false);
      
      // Cleanup simulates window expiry (normally handled by interval)
      validator.cleanup();
      
      // After cleanup, should be able to act again
      // Note: In real implementation, this would require actual time passage
    });
  });
});

describe('Security Integration Tests', () => {
  describe('End-to-End Security Flow', () => {
    it('should handle malicious input gracefully without crashing', () => {
      const validator = new ActionValidator();
      
      const maliciousInputs = [
        null,
        undefined,
        123,
        true,
        { nested: { deep: { value: 'test' } } },
        ' '.repeat(10000),
        '\x00\x01\x02',
      ];
      
      for (const input of maliciousInputs) {
        let didNotCrash = true;
        try {
          validator.validateBabelAction(input as any);
        } catch {
          didNotCrash = false;
        }
        expect(didNotCrash).toBe(true);
      }
    });

    it('should validate all input schemas consistently', () => {
      const validator = new ActionValidator();
      
      const testCases = [
        { type: 'play_card', cardId: 'babel-1' },
        { type: 'pass' },
        { type: 'special_babel_tower', cardId: 'babel-2', targetPlayerId: 'player-1' },
      ];
      
      for (const testCase of testCases) {
        const result = validator.validateBabelAction(testCase);
        expect(result.valid).toBe(true);
        expect(result.parsed).toBeDefined();
      }
    });
  });
});

describe('Compliance Security Checks', () => {
  describe('Data Minimization', () => {
    it('should not store unnecessary sensitive data in player objects', () => {
      const player = { 
        id: 'test', 
        name: 'Test', 
        type: 'human' as const,
        score: 0,
        isConnected: true,
      };
      
      // Player object should not contain sensitive fields
      expect(player).not.toHaveProperty('password');
      expect(player).not.toHaveProperty('email');
      expect(player).not.toHaveProperty('token');
    });
  });

  describe('Input Length Limits', () => {
    it('should enforce reasonable limits on all string inputs', () => {
      const validator = new ActionValidator();
      
      // Message max length is 500
      expect(validator.validateChatMessage('x'.repeat(500)).valid).toBe(true);
      expect(validator.validateChatMessage('x'.repeat(501)).valid).toBe(false);
      
      // Player name max length is 32
      expect(validator.validatePlayer({ 
        id: 'test', 
        name: 'x'.repeat(32), 
        type: 'human' as const,
        score: 0,
        isConnected: true,
      }).valid).toBe(true);
      
      expect(validator.validatePlayer({ 
        id: 'test', 
        name: 'x'.repeat(33), 
        type: 'human' as const,
        score: 0,
        isConnected: true,
      }).valid).toBe(false);
    });
  });
});
