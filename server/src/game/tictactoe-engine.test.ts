import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TicTacToeEngine, TicTacToeAI, type TicTacToeAction } from '../game/tictactoe-engine.js';
import type { Player, TicTacToeBoard } from '../game/types.js';
import { createEmptyTicTacToeBoard } from '../game/referee.js';

describe('TicTacToeEngine', () => {
  let engine: TicTacToeEngine;

  const createPlayers = (): Player[] => [
    { id: 'p1', name: 'Player 1', type: 'human', score: 0, isConnected: true },
    { id: 'p2', name: 'Player 2', type: 'human', score: 0, isConnected: true },
  ];

  beforeEach(() => {
    engine = new TicTacToeEngine(createPlayers(), { aiDifficulty: 'medium' });
  });

  describe('constructor', () => {
    it('should initialize with correct state', () => {
      const state = engine.getState();

      expect(state.gameType).toBe('tictactoe');
      expect(state.phase).toBe('waiting');
      expect(state.players).toHaveLength(2);
      expect(state.board.flat().every((cell) => cell === null)).toBe(true);
      expect(state.currentSymbol).toBe('X');
      expect(state.moveCount).toBe(0);
    });

    it('should track player order', () => {
      const state = engine.getState();

      expect(state.players[0].id).toBe('p1');
      expect(state.players[1].id).toBe('p2');
    });

    it('should throw error with wrong number of players', () => {
      expect(() => {
        new TicTacToeEngine([{ id: 'p1', name: 'Player 1', type: 'human', score: 0, isConnected: true }]);
      }).toThrow('TicTacToe requires exactly 2 players');
    });
  });

  describe('getState', () => {
    it('should return current game state', () => {
      const state = engine.getState();

      expect(state).toHaveProperty('id');
      expect(state).toHaveProperty('board');
      expect(state).toHaveProperty('players');
      expect(state).toHaveProperty('phase');
      expect(state).toHaveProperty('currentPlayerIndex');
      expect(state).toHaveProperty('currentSymbol');
      expect(state).toHaveProperty('moveCount');
    });

    it('should return a copy of the board', () => {
      const state1 = engine.getState();
      const state2 = engine.getState();

      expect(state1.board).not.toBe(state2.board);
      expect(state1.board).toEqual(state2.board);
    });
  });

  describe('getCurrentPlayer', () => {
    it('should return current player before game starts', () => {
      const player = engine.getCurrentPlayer();

      expect(player?.id).toBe('p1');
    });

    it('should return correct player after moves', () => {
      engine.startGame();
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });

      const player = engine.getCurrentPlayer();

      expect(player?.id).toBe('p2');
    });
  });

  describe('startGame', () => {
    it('should transition to in_progress phase', () => {
      engine.startGame();
      const state = engine.getState();

      expect(state.phase).toBe('in_progress');
    });

    it('should reset board and move count', () => {
      engine.startGame();
      const state = engine.getState();

      expect(state.board.flat().every((cell) => cell === null)).toBe(true);
      expect(state.moveCount).toBe(0);
      expect(state.winnerId).toBeUndefined();
      expect(state.isDraw).toBeUndefined();
      expect(state.winningLine).toBeUndefined();
    });

    it('should throw error if game already started', () => {
      engine.startGame();

      expect(() => engine.startGame()).toThrow('Game already started');
    });
  });

  describe('processAction', () => {
    beforeEach(() => {
      engine.startGame();
    });

    it('should process valid place action', () => {
      const action: TicTacToeAction = { type: 'place', row: 0, col: 0 };
      const result = engine.processAction('p1', action);

      expect(result.success).toBe(true);
      expect(result.newState?.board[0][0]).toBe('X');
      expect(result.newState?.currentSymbol).toBe('O');
      expect(result.newState?.moveCount).toBe(1);
    });

    it('should process valid move for player O', () => {
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });
      const action: TicTacToeAction = { type: 'place', row: 1, col: 1 };
      const result = engine.processAction('p2', action);

      expect(result.success).toBe(true);
      expect(result.newState?.board[1][1]).toBe('O');
      expect(result.newState?.currentSymbol).toBe('X');
    });

    it('should reject action from non-current player', () => {
      const action: TicTacToeAction = { type: 'place', row: 0, col: 0 };
      const result = engine.processAction('p2', action);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Not your turn');
    });

    it('should reject action for invalid row', () => {
      const action: TicTacToeAction = { type: 'place', row: 3, col: 0 };
      const result = engine.processAction('p1', action);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid position');
    });

    it('should reject action for invalid column', () => {
      const action: TicTacToeAction = { type: 'place', row: 0, col: 3 };
      const result = engine.processAction('p1', action);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid position');
    });

    it('should reject action for occupied cell', () => {
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });
      const action: TicTacToeAction = { type: 'place', row: 0, col: 0 };
      const result = engine.processAction('p2', action);

      expect(result.success).toBe(false);
      expect(result.error).toContain('Cell is already occupied');
    });

    it('should detect horizontal win', () => {
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });
      engine.processAction('p2', { type: 'place', row: 1, col: 0 });
      engine.processAction('p1', { type: 'place', row: 0, col: 1 });
      engine.processAction('p2', { type: 'place', row: 1, col: 1 });
      const result = engine.processAction('p1', { type: 'place', row: 0, col: 2 });

      expect(result.success).toBe(true);
      expect(result.newState?.phase).toBe('finished');
      expect(result.newState?.winnerId).toBe('p1');
      expect(result.newState?.winningLine).toEqual([[0, 0], [0, 1], [0, 2]]);
    });

    it('should detect vertical win', () => {
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });
      engine.processAction('p2', { type: 'place', row: 0, col: 1 });
      engine.processAction('p1', { type: 'place', row: 1, col: 0 });
      engine.processAction('p2', { type: 'place', row: 1, col: 2 });
      const result = engine.processAction('p1', { type: 'place', row: 2, col: 0 });

      expect(result.success).toBe(true);
      expect(result.newState?.winnerId).toBe('p1');
      expect(result.newState?.winningLine).toEqual([[0, 0], [1, 0], [2, 0]]);
    });

    it('should detect diagonal win (top-left to bottom-right)', () => {
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });
      engine.processAction('p2', { type: 'place', row: 0, col: 1 });
      engine.processAction('p1', { type: 'place', row: 1, col: 1 });
      engine.processAction('p2', { type: 'place', row: 0, col: 2 });
      const result = engine.processAction('p1', { type: 'place', row: 2, col: 2 });

      expect(result.success).toBe(true);
      expect(result.newState?.winnerId).toBe('p1');
      expect(result.newState?.winningLine).toEqual([[0, 0], [1, 1], [2, 2]]);
    });

    it('should detect diagonal win (top-right to bottom-left)', () => {
      engine.processAction('p1', { type: 'place', row: 0, col: 2 });
      engine.processAction('p2', { type: 'place', row: 0, col: 0 });
      engine.processAction('p1', { type: 'place', row: 1, col: 1 });
      engine.processAction('p2', { type: 'place', row: 0, col: 1 });
      const result = engine.processAction('p1', { type: 'place', row: 2, col: 0 });

      expect(result.success).toBe(true);
      expect(result.newState?.winnerId).toBe('p1');
      expect(result.newState?.winningLine).toEqual([[0, 2], [1, 1], [2, 0]]);
    });

    it('should detect draw when board is full', () => {
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });
      engine.processAction('p2', { type: 'place', row: 1, col: 1 });
      engine.processAction('p1', { type: 'place', row: 0, col: 2 });
      engine.processAction('p2', { type: 'place', row: 2, col: 0 });
      engine.processAction('p1', { type: 'place', row: 1, col: 0 });
      engine.processAction('p2', { type: 'place', row: 0, col: 1 });
      engine.processAction('p1', { type: 'place', row: 2, col: 1 });
      engine.processAction('p2', { type: 'place', row: 1, col: 2 });

      const lastAction: TicTacToeAction = { type: 'place', row: 2, col: 2 };
      const result = engine.processAction('p1', lastAction);

      expect(result.success).toBe(true);
      expect(result.newState?.phase).toBe('finished');
      expect(result.newState?.isDraw).toBe(true);
      expect(result.newState?.winnerId).toBeUndefined();
    });

    it('should process forfeit action', () => {
      const result = engine.processAction('p1', { type: 'forfeit' });

      expect(result.success).toBe(true);
      expect(result.newState?.phase).toBe('finished');
      expect(result.newState?.winnerId).toBe('p2');
    });
  });

  describe('setOnStateChange', () => {
    it('should call callback on state changes', () => {
      const callback = vi.fn();
      engine.setOnStateChange(callback);
      engine.startGame();

      expect(callback).toHaveBeenCalled();
    });
  });

  describe('setOnEvent', () => {
    it('should call callback on events', () => {
      const callback = vi.fn();
      engine.setOnEvent(callback);
      engine.startGame();
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });

      expect(callback).toHaveBeenCalled();
    });
  });

  describe('getBoard', () => {
    it('should return current board state', () => {
      engine.startGame();
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });

      const board = engine.getBoard();

      expect(board[0][0]).toBe('X');
    });
  });

  describe('isValidAction', () => {
    it('should return true for valid actions', () => {
      engine.startGame();

      expect(engine.isValidAction('p1', { type: 'place', row: 0, col: 0 })).toBe(true);
      expect(engine.isValidAction('p1', { type: 'forfeit' })).toBe(true);
    });

    it('should return false for invalid actions', () => {
      engine.startGame();

      expect(engine.isValidAction('p2', { type: 'place', row: 0, col: 0 })).toBe(false);
      expect(engine.isValidAction('p1', { type: 'place', row: 3, col: 0 })).toBe(false);
      expect(engine.isValidAction('p1', { type: 'place' })).toBe(false);
    });
  });

  describe('getResult', () => {
    it('should return game result', () => {
      engine.startGame();
      engine.processAction('p1', { type: 'place', row: 0, col: 0 });
      engine.processAction('p2', { type: 'place', row: 1, col: 0 });
      engine.processAction('p1', { type: 'place', row: 0, col: 1 });
      engine.processAction('p2', { type: 'place', row: 1, col: 1 });
      engine.processAction('p1', { type: 'place', row: 0, col: 2 });

      const result = engine.getResult();

      expect(result.winnerId).toBe('p1');
      expect(result.moveCount).toBe(5);
    });
  });
});

describe('TicTacToeAI', () => {
  describe('easy difficulty', () => {
    it('should make random moves', () => {
      const ai = new TicTacToeAI('easy', 'O');
      const board = createEmptyTicTacToeBoard();

      const move = ai.getMove(board);

      expect(move).toBeDefined();
      expect(move?.row).toBeGreaterThanOrEqual(0);
      expect(move?.row).toBeLessThanOrEqual(2);
      expect(move?.col).toBeGreaterThanOrEqual(0);
      expect(move?.col).toBeLessThanOrEqual(2);
    });
  });

  describe('medium difficulty', () => {
    it('should make moves', () => {
      const ai = new TicTacToeAI('medium', 'O');
      const board: TicTacToeBoard = [
        ['X', 'X', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = ai.getMove(board);

      expect(move).toBeDefined();
      expect(move?.row).toBeGreaterThanOrEqual(0);
      expect(move?.row).toBeLessThanOrEqual(2);
      expect(move?.col).toBeGreaterThanOrEqual(0);
      expect(move?.col).toBeLessThanOrEqual(2);
    });

    it('should take winning moves with hard difficulty', () => {
      const ai = new TicTacToeAI('hard', 'O');
      const board: TicTacToeBoard = [
        ['O', 'O', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = ai.getMove(board);

      expect(move).toBeDefined();
      expect(move?.row).toBe(0);
      expect(move?.col).toBe(2);
    });
  });

  describe('hard difficulty', () => {
    it('should find optimal move using minimax', () => {
      const ai = new TicTacToeAI('hard', 'O');
      const board: TicTacToeBoard = [
        ['X', null, null],
        [null, 'O', null],
        [null, null, null],
      ];

      const move = ai.getMove(board);

      expect(move).toBeDefined();
      expect(move?.row).toBeGreaterThanOrEqual(0);
      expect(move?.col).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getBestMove', () => {
    it('should return null for full board', () => {
      const ai = new TicTacToeAI('hard', 'O');
      const board: TicTacToeBoard = [
        ['X', 'O', 'X'],
        ['X', 'O', 'O'],
        ['O', 'X', 'X'],
      ];

      const move = ai.getMove(board);

      expect(move).toBeNull();
    });

    it('should handle already won board', () => {
      const ai = new TicTacToeAI('hard', 'O');
      const board: TicTacToeBoard = [
        ['X', 'X', 'X'],
        [null, null, null],
        [null, null, null],
      ];

      const move = ai.getMove(board);

      expect(move).toBeDefined();
    });
  });
});
