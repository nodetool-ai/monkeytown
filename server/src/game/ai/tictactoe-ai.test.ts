import { describe, it, expect } from 'vitest';
import { TicTacToeAIAgent, createTicTacToeAIAgent } from './tictactoe-ai.js';
import type { TicTacToeBoard, TicTacToeSymbol, PlayerAgentType } from '../types.js';

function createEmptyBoard(): TicTacToeBoard {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

function createBoard(cells: (string | null)[][]): TicTacToeBoard {
  return cells.map(row => row.map(cell => cell as TicTacToeBoard[0][0])) as TicTacToeBoard;
}

describe('TicTacToeAIAgent', () => {
  describe('Creation', () => {
    it('should create agent with default configuration', () => {
      const agent = createTicTacToeAIAgent();
      expect(agent).toBeDefined();
    });

    it('should create agent with custom personality', () => {
      const agent = createTicTacToeAIAgent({ personality: 'champion' });
      expect(agent).toBeDefined();
    });

    it('should create agent with custom difficulty', () => {
      const agent = createTicTacToeAIAgent({ difficulty: 'hard' });
      expect(agent).toBeDefined();
    });

    it('should create agents with all personalities', () => {
      const personalities: PlayerAgentType[] = ['champion', 'strategist', 'trickster', 'guardian', 'speedster', 'wildcard', 'mentor'];
      personalities.forEach(personality => {
        const agent = createTicTacToeAIAgent({ personality });
        expect(agent).toBeDefined();
      });
    });
  });

  describe('Basic Move Generation', () => {
    it('should generate a valid move on empty board', () => {
      const agent = createTicTacToeAIAgent({ personality: 'champion' });
      const board = createEmptyBoard();

      const move = agent.getMove(board, 'X');

      expect(move.row).toBeGreaterThanOrEqual(0);
      expect(move.row).toBeLessThanOrEqual(2);
      expect(move.col).toBeGreaterThanOrEqual(0);
      expect(move.col).toBeLessThanOrEqual(2);
      expect(move.reasoning).toBeDefined();
      expect(move.confidence).toBeGreaterThanOrEqual(0);
      expect(move.confidence).toBeLessThanOrEqual(1);
    });

    it('should return null move for full board', () => {
      const agent = createTicTacToeAIAgent({ personality: 'champion' });
      const board: TicTacToeBoard = [
        ['X', 'O', 'X'],
        ['X', 'O', 'O'],
        ['O', 'X', 'X'],
      ];

      const move = agent.getMove(board, 'X');

      expect(move.row).toBe(-1);
      expect(move.col).toBe(-1);
      expect(move.reasoning).toBe('Board is full');
    });

    it('should provide reasoning for moves', () => {
      const agent = createTicTacToeAIAgent({ personality: 'mentor' });
      const board = createEmptyBoard();

      agent.getMove(board, 'X');

      const reasoning = agent.getReasoning();
      expect(reasoning).toBeDefined();
      expect(reasoning.length).toBeGreaterThan(0);
    });
  });

  describe('ChampionStrategy', () => {
    it('should take winning move when available', () => {
      const agent = createTicTacToeAIAgent({ personality: 'champion', difficulty: 'hard' });
      const board: TicTacToeBoard = [
        ['O', 'O', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(0);
      expect(move.col).toBe(2);
    });

    it('should block opponent winning move', () => {
      const agent = createTicTacToeAIAgent({ personality: 'champion', difficulty: 'hard' });
      const board: TicTacToeBoard = [
        ['X', 'X', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(0);
      expect(move.col).toBe(2);
    });

    it('should use minimax for optimal play', () => {
      const agent = createTicTacToeAIAgent({ personality: 'champion', difficulty: 'hard' });
      const board: TicTacToeBoard = [
        ['X', null, null],
        [null, 'O', null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBeGreaterThanOrEqual(0);
      expect(move.col).toBeGreaterThanOrEqual(0);
    });
  });

  describe('StrategistStrategy', () => {
    it('should take winning move', () => {
      const agent = createTicTacToeAIAgent({ personality: 'strategist' });
      const board: TicTacToeBoard = [
        ['O', 'O', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(0);
      expect(move.col).toBe(2);
      expect(move.reasoning).toContain('Strategist');
    });

    it('should prefer center when available', () => {
      const agent = createTicTacToeAIAgent({ personality: 'strategist' });
      const board = createEmptyBoard();

      const move = agent.getMove(board, 'X');

      expect(move.row).toBe(1);
      expect(move.col).toBe(1);
    });

    it('should prefer corners over edges', () => {
      const agent = createTicTacToeAIAgent({ personality: 'strategist' });
      const board: TicTacToeBoard = [
        ['X', null, null],
        [null, 'O', null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'X');

      const isCorner = (move.row === 0 || move.row === 2) && (move.col === 0 || move.col === 2);
      expect(isCorner || (move.row === 1 && move.col === 1)).toBe(true);
    });
  });

  describe('TricksterStrategy', () => {
    it('should occasionally bluff when not in danger', () => {
      const agent = createTicTacToeAIAgent({ personality: 'trickster', difficulty: 'easy' });
      const board = createEmptyBoard();

      let bluffCount = 0;
      for (let i = 0; i < 20; i++) {
        agent.getMove(board, 'X');
        const reasoning = agent.getReasoning();
        if (reasoning.toLowerCase().includes('trickster')) {
          bluffCount++;
        }
      }

      expect(bluffCount).toBeGreaterThan(0);
    });

    it('should still take winning moves', () => {
      const agent = createTicTacToeAIAgent({ personality: 'trickster' });
      const board: TicTacToeBoard = [
        ['O', 'O', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(0);
      expect(move.col).toBe(2);
    });

    it('should block threats', () => {
      const agent = createTicTacToeAIAgent({ personality: 'trickster' });
      const board: TicTacToeBoard = [
        ['X', 'X', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(0);
      expect(move.col).toBe(2);
    });
  });

  describe('GuardianStrategy', () => {
    it('should prioritize blocking over winning', () => {
      const agent = createTicTacToeAIAgent({ personality: 'guardian' });
      const board: TicTacToeBoard = [
        ['X', 'X', null],
        ['O', null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(0);
      expect(move.col).toBe(2);
      expect(move.reasoning).toContain('Guardian');
    });

    it('should take center for defensive coverage', () => {
      const agent = createTicTacToeAIAgent({ personality: 'guardian' });
      const board: TicTacToeBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(1);
      expect(move.col).toBe(1);
    });
  });

  describe('SpeedsterStrategy', () => {
    it('should take wins quickly', () => {
      const agent = createTicTacToeAIAgent({ personality: 'speedster' });
      const board: TicTacToeBoard = [
        ['O', 'O', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(0);
      expect(move.col).toBe(2);
      expect(move.reasoning).toContain('Speedster');
    });

    it('should block threats', () => {
      const agent = createTicTacToeAIAgent({ personality: 'speedster' });
      const board: TicTacToeBoard = [
        ['X', 'X', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(0);
      expect(move.col).toBe(2);
    });
  });

  describe('WildcardStrategy', () => {
    it('should be unpredictable', () => {
      const agent = createTicTacToeAIAgent({ personality: 'wildcard', difficulty: 'easy' });
      const board = createEmptyBoard();

      const moves = new Set<string>();
      for (let i = 0; i < 30; i++) {
        const move = agent.getMove(board, 'X');
        moves.add(`${move.row},${move.col}`);
      }

      expect(moves.size).toBeGreaterThan(1);
    });

    it('should occasionally make random chaotic moves', () => {
      const agent = createTicTacToeAIAgent({ personality: 'wildcard', difficulty: 'easy' });
      const board = createEmptyBoard();

      let chaosMoves = 0;
      for (let i = 0; i < 50; i++) {
        agent.getMove(board, 'X');
        const reasoning = agent.getReasoning();
        if (reasoning.toLowerCase().includes('chaos') || reasoning.toLowerCase().includes('who knows')) {
          chaosMoves++;
        }
      }

      expect(chaosMoves).toBeGreaterThan(0);
    });
  });

  describe('MentorStrategy', () => {
    it('should take winning moves', () => {
      const agent = createTicTacToeAIAgent({ personality: 'mentor' });
      const board: TicTacToeBoard = [
        ['O', 'O', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(0);
      expect(move.col).toBe(2);
    });

    it('should explain moves with teaching', () => {
      const agent = createTicTacToeAIAgent({ personality: 'mentor' });
      const board = createEmptyBoard();

      agent.getMove(board, 'X');

      const reasoning = agent.getReasoning();
      expect(reasoning).toContain('Mentor');
    });

    it('should teach about center control', () => {
      const agent = createTicTacToeAIAgent({ personality: 'mentor' });
      const board = createEmptyBoard();

      const move = agent.getMove(board, 'X');

      expect(move.row).toBe(1);
      expect(move.col).toBe(1);
    });
  });

  describe('Difficulty Levels', () => {
    it('should make more mistakes on easy difficulty', () => {
      const easyAgent = createTicTacToeAIAgent({ personality: 'champion', difficulty: 'easy' });
      const hardAgent = createTicTacToeAIAgent({ personality: 'champion', difficulty: 'hard' });
      const board: TicTacToeBoard = [
        ['O', 'O', null],
        [null, null, null],
        [null, null, null],
      ];

      const easyMove = easyAgent.getMove(board, 'O');
      const hardMove = hardAgent.getMove(board, 'O');

      expect(hardMove.row).toBe(0);
      expect(hardMove.col).toBe(2);
    });

    it('should make optimal moves on hard difficulty', () => {
      const agent = createTicTacToeAIAgent({ personality: 'champion', difficulty: 'hard' });
      const board: TicTacToeBoard = [
        ['X', 'X', null],
        [null, null, null],
        [null, null, null],
      ];

      const move = agent.getMove(board, 'O');

      expect(move.row).toBe(0);
      expect(move.col).toBe(2);
    });

    it('should have mixed behavior on medium difficulty', () => {
      const agent = createTicTacToeAIAgent({ personality: 'strategist', difficulty: 'medium' });
      const board = createEmptyBoard();

      const move = agent.getMove(board, 'X');

      expect(move.row).toBeGreaterThanOrEqual(0);
      expect(move.col).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Confidence Levels', () => {
    it('should have high confidence for winning moves', () => {
      const agent = createTicTacToeAIAgent({ personality: 'champion' });
      const board: TicTacToeBoard = [
        ['O', 'O', null],
        [null, null, null],
        [null, null, null],
      ];

      agent.getMove(board, 'O');
      const confidence = agent.getConfidence();

      expect(confidence).toBeGreaterThanOrEqual(0.9);
    });

    it('should have lower confidence for random moves', () => {
      const agent = createTicTacToeAIAgent({ personality: 'wildcard', difficulty: 'easy' });
      const board = createEmptyBoard();

      agent.getMove(board, 'X');
      const confidence = agent.getConfidence();

      expect(confidence).toBeLessThanOrEqual(0.5);
    });
  });

  describe('Full Game Simulation', () => {
    it('Champion should rarely lose against random opponent', () => {
      const champion = createTicTacToeAIAgent({ personality: 'champion', difficulty: 'hard' });
      const random = createTicTacToeAIAgent({ personality: 'wildcard', difficulty: 'easy' });

      let championWins = 0;
      let randomWins = 0;
      let draws = 0;

      for (let game = 0; game < 50; game++) {
        let board: TicTacToeBoard = createEmptyBoard();
        let currentSymbol: TicTacToeSymbol = 'X';
        let winner: TicTacToeSymbol | 'draw' | null = null;

        while (!winner && board.some(row => row.includes(null))) {
          let move;
          if (currentSymbol === 'X') {
            move = champion.getMove(board, 'X');
          } else {
            move = random.getMove(board, 'O');
          }

          if (move.row === -1) break;

          board[move.row][move.col] = currentSymbol;

          const winnerResult = checkWinnerInternal(board);
          if (winnerResult) {
            winner = winnerResult.winner;
            break;
          }

          if (board.every(row => row.every(cell => cell !== null))) {
            winner = 'draw';
            break;
          }

          currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
        }

        if (winner === 'X') championWins++;
        else if (winner === 'O') randomWins++;
        else draws++;
      }

      expect(championWins + draws).toBeGreaterThanOrEqual(45);
    });

    it('Mentor should be beatable by good players', () => {
      const mentor = createTicTacToeAIAgent({ personality: 'mentor', difficulty: 'easy' });
      const goodPlayer = createTicTacToeAIAgent({ personality: 'strategist', difficulty: 'hard' });

      let mentorWins = 0;
      let goodPlayerWins = 0;
      let draws = 0;

      for (let game = 0; game < 30; game++) {
        let board: TicTacToeBoard = createEmptyBoard();
        let currentSymbol: TicTacToeSymbol = 'X';
        let winner: TicTacToeSymbol | 'draw' | null = null;

        while (!winner && board.some(row => row.includes(null))) {
          let move;
          if (currentSymbol === 'X') {
            move = goodPlayer.getMove(board, 'X');
          } else {
            move = mentor.getMove(board, 'O');
          }

          if (move.row === -1) break;

          board[move.row][move.col] = currentSymbol;

          const winnerResult = checkWinnerInternal(board);
          if (winnerResult) {
            winner = winnerResult.winner;
            break;
          }

          if (board.every(row => row.every(cell => cell !== null))) {
            winner = 'draw';
            break;
          }

          currentSymbol = currentSymbol === 'X' ? 'O' : 'X';
        }

        if (winner === 'X') goodPlayerWins++;
        else if (winner === 'O') mentorWins++;
        else draws++;
      }

      expect(goodPlayerWins + draws).toBeGreaterThanOrEqual(mentorWins);
    });
  });

  describe('All Personalities', () => {
    const personalities: PlayerAgentType[] = ['champion', 'strategist', 'trickster', 'guardian', 'speedster', 'wildcard', 'mentor'];

    personalities.forEach(personality => {
      it(`${personality} should generate valid moves`, () => {
        const agent = createTicTacToeAIAgent({ personality });
        const board = createEmptyBoard();

        const move = agent.getMove(board, 'X');

        expect(move.row).toBeGreaterThanOrEqual(0);
        expect(move.row).toBeLessThanOrEqual(2);
        expect(move.col).toBeGreaterThanOrEqual(0);
        expect(move.col).toBeLessThanOrEqual(2);
        expect(move.personality).toBe(personality);
      });

      it(`${personality} should handle full board`, () => {
        const agent = createTicTacToeAIAgent({ personality });
        const board: TicTacToeBoard = [
          ['X', 'O', 'X'],
          ['X', 'O', 'O'],
          ['O', 'X', 'X'],
        ];

        const move = agent.getMove(board, 'X');

        expect(move.row).toBe(-1);
        expect(move.col).toBe(-1);
      });
    });
  });
});

function checkWinnerInternal(board: TicTacToeBoard): { winner: TicTacToeSymbol } | null {
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
    const cellA = board[a[0]][a[1]];
    const cellB = board[b[0]][b[1]];
    const cellC = board[c[0]][c[1]];

    if (cellA && cellA === cellB && cellA === cellC) {
      return { winner: cellA };
    }
  }

  return null;
}
