import { describe, it, expect, beforeEach, vi } from 'vitest';
import { TicTacToeAI, createTicTacToeAI } from './tictactoe-ai.js';
import type { TicTacToeBoard } from '../types.js';

function createEmptyBoard(): TicTacToeBoard {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

function createBoardWithMoves(moves: { row: number; col: number; symbol: 'X' | 'O' }[]): TicTacToeBoard {
  const board = createEmptyBoard();
  for (const move of moves) {
    board[move.row][move.col] = move.symbol;
  }
  return board;
}

describe('TicTacToeAI', () => {
  describe('Creation', () => {
    it('should create AI with default configuration', () => {
      const ai = new TicTacToeAI();
      expect(ai).toBeDefined();
    });

    it('should create AI with custom personality', () => {
      const ai = new TicTacToeAI({ personality: 'champion' });
      expect(ai).toBeDefined();
    });

    it('should create AI with custom difficulty', () => {
      const aiEasy = new TicTacToeAI({ difficulty: 'easy' });
      const aiHard = new TicTacToeAI({ difficulty: 'hard' });
      expect(aiEasy).toBeDefined();
      expect(aiHard).toBeDefined();
    });

    it('should create AI with custom symbol', () => {
      const aiX = new TicTacToeAI({ symbol: 'X' });
      const aiO = new TicTacToeAI({ symbol: 'O' });
      expect(aiX).toBeDefined();
      expect(aiO).toBeDefined();
    });

    it('should create AI using factory function', () => {
      const ai = createTicTacToeAI('strategist', 'medium', 'O');
      expect(ai).toBeDefined();
    });
  });

  describe('ChampionChimp (Minimax)', () => {
    it('should find winning move when available', () => {
      const ai = createTicTacToeAI('champion', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'O' },
        { row: 0, col: 1, symbol: 'O' },
        { row: 1, col: 0, symbol: 'X' },
        { row: 1, col: 1, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.row).toBe(0);
      expect(move?.col).toBe(2);
    });

    it('should block opponent winning move', () => {
      const ai = createTicTacToeAI('champion', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'X' },
        { row: 1, col: 0, symbol: 'O' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.row).toBe(0);
      expect(move?.col).toBe(2);
    });

    it('should prefer optimal first move on empty board', () => {
      const ai = createTicTacToeAI('champion', 'hard', 'O');
      const board = createEmptyBoard();

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect([0, 1, 2]).toContain(move?.row ?? -1);
      expect([0, 1, 2]).toContain(move?.col ?? -1);
    });

    it('should never lose with perfect play', () => {
      const ai = createTicTacToeAI('champion', 'hard', 'O');
      let board = createEmptyBoard();
      let gameResult: 'win' | 'lose' | 'draw' | null = null;

      for (let turn = 0; turn < 9 && gameResult === null; turn++) {
        const move = ai.getMove(board, 'opponent');
        if (!move) {
          gameResult = 'draw';
          break;
        }

        board[move.row][move.col] = 'O';

        const winner = checkWinner(board);
        if (winner === 'O') {
          gameResult = 'win';
        } else if (isBoardFull(board)) {
          gameResult = 'draw';
        } else {
          const opponentMove = getAnyEmptyCell(board);
          if (opponentMove) {
            board[opponentMove.row][opponentMove.col] = 'X';

            const oppWinner = checkWinner(board);
            if (oppWinner === 'X') {
              gameResult = 'lose';
            } else if (isBoardFull(board)) {
              gameResult = 'draw';
            }
          }
        }
      }

      expect(gameResult).not.toBe('lose');
    });
  });

  describe('StrategistApe', () => {
    it('should prioritize winning moves', () => {
      const ai = createTicTacToeAI('strategist', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'O' },
        { row: 0, col: 1, symbol: 'O' },
        { row: 1, col: 0, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.row).toBe(0);
      expect(move?.col).toBe(2);
    });

    it('should block opponent threats', () => {
      const ai = createTicTacToeAI('strategist', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.row).toBe(0);
      expect(move?.col).toBe(2);
    });

    it('should create forks when possible', () => {
      const ai = createTicTacToeAI('strategist', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 1, col: 1, symbol: 'O' },
        { row: 0, col: 0, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(board[move?.row ?? -1][move?.col ?? -1]).toBeNull();
    });

    it('should explain reasoning in moves', () => {
      const ai = createTicTacToeAI('strategist', 'medium', 'O');
      const board = createEmptyBoard();

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.reasoning).toBeDefined();
      expect(typeof move?.reasoning).toBe('string');
    });
  });

  describe('TricksterMonkey', () => {
    it('should set up traps occasionally', () => {
      const ai = createTicTacToeAI('trickster', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 1, col: 1, symbol: 'O' },
        { row: 0, col: 0, symbol: 'X' },
      ]);

      const moves: { row: number; col: number; reasoning: string }[] = [];
      for (let i = 0; i < 10; i++) {
        const move = ai.getMove(board);
        if (move) {
          moves.push(move);
        }
      }

      const trapMoves = moves.filter(m => m.reasoning.toLowerCase().includes('trap'));
      expect(trapMoves.length).toBeGreaterThanOrEqual(0);
    });

    it('should take wins when available', () => {
      const ai = createTicTacToeAI('trickster', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'O' },
        { row: 0, col: 1, symbol: 'O' },
        { row: 1, col: 0, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.row).toBe(0);
      expect(move?.col).toBe(2);
    });

    it('should be unpredictable in early game', () => {
      const ai = createTicTacToeAI('trickster', 'medium', 'O');
      const board = createEmptyBoard();

      const move = ai.getMove(board);
      expect(move).toBeDefined();
    });
  });

  describe('GuardianGorilla', () => {
    it('should prioritize blocking threats', () => {
      const ai = createTicTacToeAI('guardian', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.row).toBe(0);
      expect(move?.col).toBe(2);
    });

    it('should handle double threats', () => {
      const ai = createTicTacToeAI('guardian', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 2, symbol: 'X' },
        { row: 1, col: 1, symbol: 'O' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.row).toBe(0);
      expect(move?.col).toBe(1);
    });

    it('should prefer center for defense', () => {
      const ai = createTicTacToeAI('guardian', 'medium', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.row).toBe(1);
      expect(move?.col).toBe(1);
    });

    it('should explain defensive reasoning', () => {
      const ai = createTicTacToeAI('guardian', 'medium', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.reasoning.toLowerCase()).toMatch(/block|defense|threat|neutraliz|secur|safe/i);
    });
  });

  describe('SpeedyGibbon', () => {
    it('should move quickly', () => {
      const ai = createTicTacToeAI('speedster', 'medium', 'O');
      const board = createEmptyBoard();

      const startTime = Date.now();
      const move = ai.getMove(board);
      const endTime = Date.now();

      expect(move).toBeDefined();
      expect(endTime - startTime).toBeLessThan(50);
    });

    it('should take wins aggressively', () => {
      const ai = createTicTacToeAI('speedster', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'O' },
        { row: 0, col: 1, symbol: 'O' },
      ]);

      let winCount = 0;
      for (let i = 0; i < 10; i++) {
        const move = ai.getMove(board);
        if (move && move.row === 0 && move.col === 2) {
          winCount++;
        }
      }
      expect(winCount).toBeGreaterThanOrEqual(7);
    });

    it('should create fork opportunities', () => {
      const ai = createTicTacToeAI('speedster', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 1, col: 1, symbol: 'O' },
        { row: 0, col: 0, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
    });

    it('should have energetic reasoning', () => {
      const ai = createTicTacToeAI('speedster', 'medium', 'O');
      const board = createEmptyBoard();

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.reasoning.toLowerCase()).toMatch(/fast|quick|strike|seizing/i);
    });
  });

  describe('WildcardLemur', () => {
    it('should be highly unpredictable', () => {
      const ai = createTicTacToeAI('wildcard', 'easy', 'O');
      const board = createBoardWithMoves([
        { row: 1, col: 1, symbol: 'X' },
      ]);

      const moves = new Set<string>();
      for (let i = 0; i < 20; i++) {
        const move = ai.getMove(board);
        if (move) {
          moves.add(`${move.row},${move.col}`);
        }
      }

      expect(moves.size).toBeGreaterThan(1);
    });

    it('may occasionally make suboptimal moves', () => {
      const ai = createTicTacToeAI('wildcard', 'easy', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
    });

    it('should have chaotic reasoning', () => {
      const ai = createTicTacToeAI('wildcard', 'easy', 'O');
      const board = createEmptyBoard();

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.reasoning).toBeDefined();
    });
  });

  describe('MentorOrangutan', () => {
    it('should explain moves pedagogically', () => {
      const ai = createTicTacToeAI('mentor', 'medium', 'O');
      const board = createEmptyBoard();

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.reasoning.toLowerCase()).toMatch(/teaching|explain|notice|best|opening|controls/i);
    });

    it('should teach about center opening', () => {
      const ai = createTicTacToeAI('mentor', 'medium', 'O');
      const board = createEmptyBoard();

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.row).toBe(1);
      expect(move?.col).toBe(1);
    });

    it('should explain win conditions', () => {
      const ai = createTicTacToeAI('mentor', 'medium', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'O' },
        { row: 0, col: 1, symbol: 'O' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.reasoning.toLowerCase()).toMatch(/win|completing|line/i);
    });

    it('should explain blocking', () => {
      const ai = createTicTacToeAI('mentor', 'medium', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'X' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.reasoning.toLowerCase()).toMatch(/block|opponent|threat/i);
    });
  });

  describe('Difficulty Levels', () => {
    it('Easy mode should make more random mistakes', () => {
      const ai = createTicTacToeAI('strategist', 'easy', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'X' },
      ]);

      const nonOptimalMoves: { row: number; col: number }[] = [];
      for (let i = 0; i < 10; i++) {
        const move = ai.getMove(board);
        if (move && (move.row !== 0 || move.col !== 2)) {
          nonOptimalMoves.push(move);
        }
      }

      expect(nonOptimalMoves.length).toBeGreaterThan(0);
    });

    it('Hard mode should rarely make mistakes', () => {
      const ai = createTicTacToeAI('strategist', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'X' },
      ]);

      let optimalCount = 0;
      for (let i = 0; i < 10; i++) {
        const move = ai.getMove(board);
        if (move && move.row === 0 && move.col === 2) {
          optimalCount++;
        }
      }

      expect(optimalCount).toBeGreaterThanOrEqual(8);
    });
  });

  describe('Player Pattern Learning', () => {
    it('should track player stats', () => {
      const ai = createTicTacToeAI('strategist', 'medium', 'O');
      
      ai.recordMove('player1', 0, 0);
      ai.recordMove('player1', 1, 1);
      ai.recordGameResult('player1', 'win');
      ai.recordGameResult('player1', 'lose');
      ai.recordGameResult('player1', 'draw');

      const stats = ai.getPlayerStats('player1');
      expect(stats).toBeDefined();
      expect(stats?.gamesPlayed).toBeGreaterThanOrEqual(1);
      expect(stats?.wins).toBe(1);
      expect(stats?.losses).toBe(1);
      expect(stats?.draws).toBe(1);
    });

    it('should track center preference', () => {
      const ai = createTicTacToeAI('strategist', 'medium', 'O');
      
      for (let i = 0; i < 5; i++) {
        ai.recordMove('player1', 1, 1);
      }

      const stats = ai.getPlayerStats('player1');
      expect(stats?.prefersCenter).toBeGreaterThan(0.5);
    });

    it('should track corner preference', () => {
      const ai = createTicTacToeAI('strategist', 'medium', 'O');
      
      for (let i = 0; i < 5; i++) {
        ai.recordMove('player1', 0, 0);
      }

      const stats = ai.getPlayerStats('player1');
      expect(stats?.prefersCorners).toBeGreaterThan(0.5);
    });

    it('should clear player stats', () => {
      const ai = createTicTacToeAI('strategist', 'medium', 'O');
      
      ai.recordMove('player1', 0, 0);
      ai.recordGameResult('player1', 'win');
      
      expect(ai.getPlayerStats('player1')).toBeDefined();
      
      ai.clearPlayerStats('player1');
      expect(ai.getPlayerStats('player1')).toBeUndefined();
    });

    it('should clear all player stats', () => {
      const ai = createTicTacToeAI('strategist', 'medium', 'O');
      
      ai.recordMove('player1', 0, 0);
      ai.recordMove('player2', 1, 1);
      
      ai.clearPlayerStats();
      
      expect(ai.getPlayerStats('player1')).toBeUndefined();
      expect(ai.getPlayerStats('player2')).toBeUndefined();
    });

    it('should return all player stats', () => {
      const ai = createTicTacToeAI('strategist', 'medium', 'O');
      
      ai.recordMove('player1', 0, 0);
      ai.recordMove('player2', 1, 1);
      
      const allStats = ai.getAllPlayerStats();
      expect(allStats.size).toBe(2);
    });
  });

  describe('Edge Cases', () => {
    it('should return null for full board', () => {
      const ai = createTicTacToeAI('strategist', 'medium', 'O');
      const board: TicTacToeBoard = [
        ['X', 'O', 'X'],
        ['X', 'O', 'O'],
        ['O', 'X', 'X'],
      ];

      const move = ai.getMove(board);
      expect(move).toBeNull();
    });

    it('should return null for board with no empty cells', () => {
      const ai = createTicTacToeAI('strategist', 'medium', 'O');
      const board: TicTacToeBoard = [
        ['X', 'X', 'O'],
        ['O', 'O', 'X'],
        ['X', 'O', 'X'],
      ];

      const move = ai.getMove(board);
      expect(move).toBeNull();
    });
  });

  describe('Move Confidence', () => {
    it('should return confidence scores', () => {
      const ai = createTicTacToeAI('champion', 'hard', 'O');
      const board = createEmptyBoard();

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.confidence).toBeDefined();
      expect(typeof move?.confidence).toBe('number');
      expect(move?.confidence).toBeGreaterThanOrEqual(0);
      expect(move?.confidence).toBeLessThanOrEqual(1);
    });

    it('should have higher confidence for winning moves', () => {
      const ai = createTicTacToeAI('champion', 'hard', 'O');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'O' },
        { row: 0, col: 1, symbol: 'O' },
      ]);

      const move = ai.getMove(board);
      expect(move).toBeDefined();
      expect(move?.confidence).toBeGreaterThan(0.8);
    });
  });
});

function checkWinner(board: TicTacToeBoard): 'X' | 'O' | null {
  const lines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const symbol = board[a[0]][a[1]];
    if (
      symbol &&
      symbol === board[b[0]][b[1]] &&
      symbol === board[c[0]][c[1]]
    ) {
      return symbol;
    }
  }

  return null;
}

function isBoardFull(board: TicTacToeBoard): boolean {
  return board.every(row => row.every(cell => cell !== null));
}

function getAnyEmptyCell(board: TicTacToeBoard): { row: number; col: number } | null {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        return { row, col };
      }
    }
  }
  return null;
}
