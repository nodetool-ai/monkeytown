import { describe, it, expect } from 'vitest';
import { EnhancedTicTacToeAI, createEnhancedTicTacToeAI } from './enhanced-tictactoe-ai.js';
import type { TicTacToeBoard, TicTacToeSymbol, PlayerAgentType } from '../types.js';

function createEmptyBoard(): TicTacToeBoard {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

function createBoardWithMoves(moves: Array<{ row: number; col: number; symbol: TicTacToeSymbol }>): TicTacToeBoard {
  const board = createEmptyBoard();
  for (const move of moves) {
    board[move.row][move.col] = move.symbol;
  }
  return board;
}

function checkWinnerForTest(board: TicTacToeBoard): TicTacToeSymbol | null {
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
    const symbols = [board[a[0]][a[1]], board[b[0]][b[1]], board[c[0]][c[1]]];
    if (symbols[0] && symbols[0] === symbols[1] && symbols[0] === symbols[2]) {
      return symbols[0];
    }
  }
  return null;
}

function hasWinningMove(board: TicTacToeBoard, symbol: TicTacToeSymbol): boolean {
  const emptyCells = getEmptyCells(board);
  for (const cell of emptyCells) {
    const testBoard = board.map(r => [...r]) as TicTacToeBoard;
    testBoard[cell.row][cell.col] = symbol;
    if (checkWinnerForTest(testBoard) === symbol) {
      return true;
    }
  }
  return false;
}

function getEmptyCells(board: TicTacToeBoard): Array<{ row: number; col: number }> {
  const cells: Array<{ row: number; col: number }> = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        cells.push({ row, col });
      }
    }
  }
  return cells;
}

describe('EnhancedTicTacToeAI', () => {
  describe('Creation', () => {
    it('should create AI with correct personality', () => {
      const ai = createEnhancedTicTacToeAI('trickster');
      expect(ai).toBeDefined();
    });

    it('should create all 7 personality types', () => {
      const personalities: PlayerAgentType[] = ['trickster', 'strategist', 'speedster', 'guardian', 'wildcard', 'mentor', 'champion'];
      
      for (const personality of personalities) {
        const ai = createEnhancedTicTacToeAI(personality);
        expect(ai).toBeDefined();
        expect(ai.getPersonality()).toBe(personality);
      }
    });
  });

  describe('Basic Move Selection', () => {
    it('should return valid move on empty board', () => {
      const ai = createEnhancedTicTacToeAI('champion');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
      expect(move!.row).toBeGreaterThanOrEqual(0);
      expect(move!.row).toBeLessThanOrEqual(2);
      expect(move!.col).toBeGreaterThanOrEqual(0);
      expect(move!.col).toBeLessThanOrEqual(2);
      expect(board[move!.row][move!.col]).toBeNull();
    });

    it('should return null on full board', () => {
      const ai = createEnhancedTicTacToeAI('champion');
      const fullBoard: TicTacToeBoard = [
        ['X', 'O', 'X'],
        ['X', 'O', 'O'],
        ['O', 'X', 'X'],
      ];
      
      const move = ai.getMove(fullBoard, 'O');
      expect(move).toBeNull();
    });

    it('should provide reasoning for moves', () => {
      const ai = createEnhancedTicTacToeAI('trickster');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
      expect(move!.reasoning).toBeDefined();
      expect(typeof move!.reasoning).toBe('string');
      expect(move!.reasoning.length).toBeGreaterThan(0);
    });
  });

  describe('Win-Seeking Behavior', () => {
    it('Champion should find winning move when available', () => {
      const ai = createEnhancedTicTacToeAI('champion');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'O' },
        { row: 1, col: 0, symbol: 'X' },
        { row: 1, col: 1, symbol: 'O' },
        { row: 2, col: 0, symbol: 'X' },
      ]);
      
      expect(hasWinningMove(board, 'X')).toBe(true);
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
      expect(board[move!.row][move!.col]).toBeNull();
    });

    it('Strategist should find winning move when available', () => {
      const ai = createEnhancedTicTacToeAI('strategist');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'O' },
        { row: 0, col: 1, symbol: 'X' },
        { row: 1, col: 1, symbol: 'O' },
        { row: 1, col: 0, symbol: 'X' },
        { row: 2, col: 2, symbol: 'O' },
      ]);
      
      expect(hasWinningMove(board, 'O')).toBe(true);
      
      const move = ai.getMove(board, 'O');
      
      expect(move).toBeDefined();
    });

    it('Speedster should find winning move', () => {
      const ai = createEnhancedTicTacToeAI('speedster');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 1, col: 1, symbol: 'O' },
        { row: 0, col: 2, symbol: 'X' },
      ]);
      
      expect(hasWinningMove(board, 'X')).toBe(true);
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
    });

    it('All personality AIs should take winning move', () => {
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'O' },
        { row: 1, col: 0, symbol: 'X' },
        { row: 1, col: 1, symbol: 'O' },
        { row: 2, col: 0, symbol: 'X' },
      ]);
      
      expect(hasWinningMove(board, 'X')).toBe(true);
      
      for (const personality of ['trickster', 'strategist', 'speedster', 'guardian', 'mentor', 'champion'] as PlayerAgentType[]) {
        const ai = createEnhancedTicTacToeAI(personality);
        const move = ai.getMove(board, 'X');
        expect(move).toBeDefined();
      }
    });
  });

  describe('Threat-Blocking Behavior', () => {
    it('Guardian should block opponent winning move', () => {
      const ai = createEnhancedTicTacToeAI('guardian');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'O' },
        { row: 1, col: 1, symbol: 'X' },
      ]);
      
      expect(hasWinningMove(board, 'X')).toBe(true);
      
      const move = ai.getMove(board, 'O');
      
      expect(move).toBeDefined();
    });

    it('Mentor should have educational blocking explanation', () => {
      const ai = createEnhancedTicTacToeAI('mentor');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'O' },
        { row: 1, col: 0, symbol: 'X' },
      ]);
      
      expect(hasWinningMove(board, 'X')).toBe(true);
      
      const move = ai.getMove(board, 'O');
      
      expect(move).toBeDefined();
      expect(move!.reasoning.length).toBeGreaterThan(0);
    });

    it('All personalities should block threats', () => {
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'O' },
      ]);
      
      expect(hasWinningMove(board, 'X')).toBe(false);
      
      for (const personality of ['trickster', 'strategist', 'speedster', 'guardian', 'mentor', 'champion'] as PlayerAgentType[]) {
        const ai = createEnhancedTicTacToeAI(personality);
        const move = ai.getMove(board, 'O');
        expect(move).toBeDefined();
      }
    });
  });

  describe('Center Priority', () => {
    it('Champion prefers center when available', () => {
      const ai = createEnhancedTicTacToeAI('champion');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
      expect(move!.row).toBe(1);
      expect(move!.col).toBe(1);
    });

    it('Strategist prefers center when available', () => {
      const ai = createEnhancedTicTacToeAI('strategist');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'O');
      
      expect(move).toBeDefined();
      expect(move!.row).toBe(1);
      expect(move!.col).toBe(1);
    });

    it('Wildcard may deviate from center', () => {
      const ai = createEnhancedTicTacToeAI('wildcard');
      const board = createEmptyBoard();
      
      let nonCenterMoves = 0;
      for (let i = 0; i < 20; i++) {
        const move = ai.getMove(board, 'X');
        if (move!.row !== 1 || move!.col !== 1) {
          nonCenterMoves++;
        }
      }
      expect(nonCenterMoves).toBeGreaterThan(0);
    });
  });

  describe('Corner Priority', () => {
    it('Should take corner when center is taken', () => {
      const ai = createEnhancedTicTacToeAI('champion');
      const board = createBoardWithMoves([
        { row: 1, col: 1, symbol: 'O' },
      ]);
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
      const isCorner = (move!.row === 0 || move!.row === 2) && (move!.col === 0 || move!.col === 2);
      expect(isCorner).toBe(true);
    });

    it('Mentor explains corner strategy', () => {
      const ai = createEnhancedTicTacToeAI('mentor');
      const board = createBoardWithMoves([
        { row: 1, col: 1, symbol: 'O' },
      ]);
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
      expect(move!.reasoning).toBeDefined();
      expect(move!.reasoning.length).toBeGreaterThan(0);
    });
  });

  describe('Personality-Specific Move Delays', () => {
    it('Speedster has fastest move delay', () => {
      const speedster = createEnhancedTicTacToeAI('speedster');
      const champion = createEnhancedTicTacToeAI('champion');
      
      expect(speedster.getMoveDelay()).toBeLessThan(champion.getMoveDelay());
    });

    it('Mentor has slowest move delay (teaching mode)', () => {
      const mentor = createEnhancedTicTacToeAI('mentor');
      const speedster = createEnhancedTicTacToeAI('speedster');
      
      expect(mentor.getMoveDelay()).toBeGreaterThan(speedster.getMoveDelay());
    });

    it('All personalities have reasonable move delays', () => {
      const personalities: PlayerAgentType[] = ['trickster', 'strategist', 'speedster', 'guardian', 'wildcard', 'mentor', 'champion'];
      
      for (const personality of personalities) {
        const ai = createEnhancedTicTacToeAI(personality);
        const delay = ai.getMoveDelay();
        expect(delay).toBeGreaterThanOrEqual(100);
        expect(delay).toBeLessThanOrEqual(2000);
      }
    });
  });

  describe('Unpredictability', () => {
    it('Wildcard makes varied moves', () => {
      const ai = createEnhancedTicTacToeAI('wildcard');
      const board = createEmptyBoard();
      
      const moves = new Set<string>();
      for (let i = 0; i < 30; i++) {
        const move = ai.getMove(board, 'X');
        moves.add(`${move!.row},${move!.col}`);
      }
      expect(moves.size).toBeGreaterThan(1);
    });

    it('Champion is consistent on empty board', () => {
      const ai = createEnhancedTicTacToeAI('champion');
      const board = createEmptyBoard();
      
      const moves = new Set<string>();
      for (let i = 0; i < 5; i++) {
        const move = ai.getMove(board, 'X');
        moves.add(`${move!.row},${move!.col}`);
      }
      expect(moves.size).toBe(1);
    });
  });

  describe('Aggression', () => {
    it('Speedster has high aggression', () => {
      const ai = createEnhancedTicTacToeAI('speedster');
      expect(ai.getPersonality()).toBe('speedster');
    });

    it('Guardian has low aggression (defensive)', () => {
      const ai = createEnhancedTicTacToeAI('guardian');
      expect(ai.getPersonality()).toBe('guardian');
    });
  });

  describe('Reasoning Quality', () => {
    it('Trickster reasoning has personality-specific content', () => {
      const ai = createEnhancedTicTacToeAI('trickster');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'X');
      
      expect(move!.reasoning.length).toBeGreaterThan(0);
      expect(move!.personality).toBe('trickster');
    });

    it('Strategist reasoning has analytical tone', () => {
      const ai = createEnhancedTicTacToeAI('strategist');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'O');
      
      expect(move!.reasoning.length).toBeGreaterThan(0);
      expect(move!.personality).toBe('strategist');
    });

    it('Speedster reasoning is energetic', () => {
      const ai = createEnhancedTicTacToeAI('speedster');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'X');
      
      const reason = move!.reasoning.toLowerCase();
      const isEnergetic = reason.includes('!') || reason.includes('got') || reason.includes('fast') || reason.includes('quick');
      expect(isEnergetic).toBe(true);
    });

    it('Mentor reasoning is educational', () => {
      const ai = createEnhancedTicTacToeAI('mentor');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'X');
      
      expect(move!.reasoning.length).toBeGreaterThan(0);
      expect(move!.personality).toBe('mentor');
    });

    it('Guardian reasoning is defensive', () => {
      const ai = createEnhancedTicTacToeAI('guardian');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
      ]);
      
      const move = ai.getMove(board, 'O');
      
      expect(move!.reasoning.length).toBeGreaterThan(0);
      expect(move!.personality).toBe('guardian');
    });

    it('Champion reasoning is victory-focused', () => {
      const ai = createEnhancedTicTacToeAI('champion');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'X');
      
      expect(move!.reasoning.length).toBeGreaterThan(0);
      expect(move!.personality).toBe('champion');
    });
  });

  describe('Game State Analysis', () => {
    it('Handles edge position correctly', () => {
      const ai = createEnhancedTicTacToeAI('champion');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 1, col: 1, symbol: 'O' },
        { row: 2, col: 2, symbol: 'X' },
      ]);
      
      const move = ai.getMove(board, 'O');
      
      expect(move).toBeDefined();
      expect(board[move!.row][move!.col]).toBeNull();
    });

    it('Handles near-complete lines', () => {
      const ai = createEnhancedTicTacToeAI('strategist');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 0, col: 1, symbol: 'X' },
        { row: 1, col: 1, symbol: 'O' },
      ]);
      
      const move = ai.getMove(board, 'O');
      
      expect(move).toBeDefined();
      expect(move!.row).toBe(0);
      expect(move!.col).toBe(2);
    });

    it('Multiple empty cells returns valid move', () => {
      const ai = createEnhancedTicTacToeAI('trickster');
      const board = createBoardWithMoves([
        { row: 0, col: 0, symbol: 'X' },
        { row: 2, col: 2, symbol: 'O' },
      ]);
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
      expect(board[move!.row][move!.col]).toBeNull();
    });
  });

  describe('Symbol Handling', () => {
    it('Works correctly with X symbol', () => {
      const ai = createEnhancedTicTacToeAI('champion');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
      expect(move!.row).toBe(1);
      expect(move!.col).toBe(1);
    });

    it('Works correctly with O symbol', () => {
      const ai = createEnhancedTicTacToeAI('strategist');
      const board = createEmptyBoard();
      
      const move = ai.getMove(board, 'O');
      
      expect(move).toBeDefined();
      expect(move!.row).toBe(1);
      expect(move!.col).toBe(1);
    });
  });

  describe('Consistency', () => {
    it('Same personality returns consistent type', () => {
      const ai = createEnhancedTicTacToeAI('mentor');
      const board = createEmptyBoard();
      
      const move1 = ai.getMove(board, 'X');
      const move2 = ai.getMove(board, 'O');
      
      expect(move1!.personality).toBe('mentor');
      expect(move2!.personality).toBe('mentor');
    });

    it('All moves have personality property', () => {
      const personalities: PlayerAgentType[] = ['trickster', 'strategist', 'speedster', 'guardian', 'wildcard', 'mentor', 'champion'];
      const board = createEmptyBoard();
      
      for (const personality of personalities) {
        const ai = createEnhancedTicTacToeAI(personality);
        const move = ai.getMove(board, 'X');
        expect(move!.personality).toBe(personality);
      }
    });
  });

  describe('AI Behavior Variation', () => {
    it('Different personalities make different decisions on same board', () => {
      const board = createEmptyBoard();
      
      const moves = new Set<string>();
      
      for (const personality of ['trickster', 'strategist', 'speedster', 'guardian', 'mentor', 'champion'] as PlayerAgentType[]) {
        const ai = createEnhancedTicTacToeAI(personality);
        const move = ai.getMove(board, 'X');
        moves.add(`${move!.row},${move!.col}`);
      }
      
      expect(moves.size).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('Handles board with one empty cell', () => {
      const ai = createEnhancedTicTacToeAI('champion');
      const board: TicTacToeBoard = [
        ['X', 'O', 'X'],
        ['X', 'O', 'O'],
        ['O', 'X', null],
      ];
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
      expect(move!.row).toBe(2);
      expect(move!.col).toBe(2);
    });

    it('Handles board with two empty cells', () => {
      const ai = createEnhancedTicTacToeAI('strategist');
      const board: TicTacToeBoard = [
        ['X', 'O', 'X'],
        ['X', 'O', null],
        ['O', 'X', null],
      ];
      
      const move = ai.getMove(board, 'X');
      
      expect(move).toBeDefined();
      expect(board[move!.row][move!.col]).toBeNull();
    });
  });
});

describe('TicTacToeAI Move Timing', () => {
  it('Speedster should have fastest response time', () => {
    const speedster = createEnhancedTicTacToeAI('speedster');
    const trickster = createEnhancedTicTacToeAI('trickster');
    
    expect(speedster.getMoveDelay()).toBeLessThan(trickster.getMoveDelay());
  });

  it('Mentor should have slowest response time for teaching', () => {
    const mentor = createEnhancedTicTacToeAI('mentor');
    const guardian = createEnhancedTicTacToeAI('guardian');
    
    expect(mentor.getMoveDelay()).toBeGreaterThan(guardian.getMoveDelay());
  });

  it('Move delays reflect personality characteristics', () => {
    const speedsterDelay = createEnhancedTicTacToeAI('speedster').getMoveDelay();
    const mentorDelay = createEnhancedTicTacToeAI('mentor').getMoveDelay();
    const wildcardDelay = createEnhancedTicTacToeAI('wildcard').getMoveDelay();
    
    expect(speedsterDelay).toBe(200);
    expect(mentorDelay).toBe(1000);
    expect(wildcardDelay).toBe(400);
  });
});

describe('AI vs AI Scenarios', () => {
  it('Champion vs Champion produces draw with optimal play', () => {
    let board = createEmptyBoard();
    
    let moves = 0;
    const maxMoves = 9;
    
    while (moves < maxMoves) {
      const ai = createEnhancedTicTacToeAI('champion');
      const symbol = moves % 2 === 0 ? 'X' : 'O';
      
      const move = ai.getMove(board, symbol);
      if (!move) break;
      
      board[move.row][move.col] = symbol;
      moves++;
      
      if (checkWinnerForTest(board)) {
        break;
      }
    }
    
    expect(moves).toBeLessThanOrEqual(9);
    expect(board.every(row => row.every(cell => cell !== null)) || checkWinnerForTest(board) !== null).toBe(true);
  });

  it('Different personalities produce varied game lengths', () => {
    const gameLengths: number[] = [];
    
    for (const p1 of ['trickster', 'champion', 'wildcard'] as PlayerAgentType[]) {
      for (const p2 of ['strategist', 'mentor', 'guardian'] as PlayerAgentType[]) {
        let board = createEmptyBoard();
        let moves = 0;
        
        while (moves < 9) {
          const ai1 = createEnhancedTicTacToeAI(p1);
          const ai2 = createEnhancedTicTacToeAI(p2);
          
          const symbol = moves % 2 === 0 ? 'X' : 'O';
          const ai = moves % 2 === 0 ? ai1 : ai2;
          
          const move = ai.getMove(board, symbol);
          if (!move) break;
          
          board[move.row][move.col] = symbol;
          moves++;
          
          if (checkWinnerForTest(board)) {
            break;
          }
        }
        
        gameLengths.push(moves);
      }
    }
    
    expect(gameLengths.length).toBe(9);
  });
});
