import type { TicTacToeBoard, TicTacToeSymbol, PlayerAgentType } from '../types.js';

export interface TicTacToeAIMove {
  row: number;
  col: number;
  reasoning: string;
  confidence: number;
  personality: PlayerAgentType;
}

export interface TicTacToeAIConfig {
  personality: PlayerAgentType;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface WinningLine {
  winner: TicTacToeSymbol;
  line: [number, number][];
}

export class TicTacToeAIAgent {
  private personality: PlayerAgentType;
  private difficulty: 'easy' | 'medium' | 'hard';
  private reasoning: string = '';
  private confidence: number = 0.5;

  constructor(config: Partial<TicTacToeAIConfig> = {}) {
    this.personality = config.personality || 'champion';
    this.difficulty = config.difficulty || 'medium';
  }

  getMove(board: TicTacToeBoard, mySymbol: TicTacToeSymbol): TicTacToeAIMove {
    const opponentSymbol = mySymbol === 'X' ? 'O' : 'X';
    const emptyCells = this.getEmptyCells(board);

    if (emptyCells.length === 0) {
      return { row: -1, col: -1, reasoning: 'Board is full', confidence: 0, personality: this.personality };
    }

    const difficultyModifier = this.getDifficultyModifier();
    const randomFactor = Math.random();

    if (this.difficulty === 'easy' && randomFactor < difficultyModifier) {
      return this.getRandomMove(emptyCells, board, mySymbol, opponentSymbol);
    }

    if (this.difficulty === 'medium' && randomFactor < difficultyModifier) {
      return this.getMediumMove(board, emptyCells, mySymbol, opponentSymbol);
    }

    return this.getStrategicMove(board, emptyCells, mySymbol, opponentSymbol);
  }

  private getDifficultyModifier(): number {
    switch (this.difficulty) {
      case 'easy': return 0.6;
      case 'medium': return 0.35;
      case 'hard': return 0.1;
      default: return 0.5;
    }
  }

  private getEmptyCells(board: TicTacToeBoard): { row: number; col: number }[] {
    const cells: { row: number; col: number }[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          cells.push({ row, col });
        }
      }
    }
    return cells;
  }

  private getWinningMove(board: TicTacToeBoard, symbol: TicTacToeSymbol): { row: number; col: number } | null {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          const testBoard = board.map(r => [...r]) as TicTacToeBoard;
          testBoard[row][col] = symbol;
          if (this.checkWinner(testBoard)?.winner === symbol) {
            return { row, col };
          }
        }
      }
    }
    return null;
  }

  private getBlockingMove(board: TicTacToeBoard, opponentSymbol: TicTacToeSymbol): { row: number; col: number } | null {
    return this.getWinningMove(board, opponentSymbol);
  }

  private getCenterMove(emptyCells: { row: number; col: number }[]): { row: number; col: number } | null {
    const center = emptyCells.find(c => c.row === 1 && c.col === 1);
    if (center) return center;
    return null;
  }

  private getCornerMoves(emptyCells: { row: number; col: number }[]): { row: number; col: number }[] {
    const corners = [{ row: 0, col: 0 }, { row: 0, col: 2 }, { row: 2, col: 0 }, { row: 2, col: 2 }];
    return emptyCells.filter(c => corners.some(corner => corner.row === c.row && corner.col === c.col));
  }

  private getRandomMove(
    emptyCells: { row: number; col: number }[],
    board: TicTacToeBoard,
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): TicTacToeAIMove {
    const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    this.reasoning = `${this.getPersonalityPrefix()}Random choice! Sometimes chaos is the best strategy.`;
    this.confidence = 0.3 + Math.random() * 0.2;
    return { ...move, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
  }

  private getMediumMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): TicTacToeAIMove {
    const winningMove = this.getWinningMove(board, mySymbol);
    if (winningMove) {
      this.reasoning = `${this.getPersonalityPrefix()}Taking the obvious win! Why wait?`;
      this.confidence = 0.9;
      return { ...winningMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const blockingMove = this.getBlockingMove(board, opponentSymbol);
    if (blockingMove) {
      this.reasoning = `${this.getPersonalityPrefix()}Can't let you have all the fun!`;
      this.confidence = 0.8;
      return { ...blockingMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const center = this.getCenterMove(emptyCells);
    if (center) {
      this.reasoning = `${this.getPersonalityPrefix()}Center control - classic strategy.`;
      this.confidence = 0.7;
      return { ...center, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const corners = this.getCornerMoves(emptyCells);
    if (corners.length > 0) {
      const corner = corners[Math.floor(Math.random() * corners.length)];
      this.reasoning = `${this.getPersonalityPrefix()}Corner play - keeping options open.`;
      this.confidence = 0.6;
      return { ...corner, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    return this.getRandomMove(emptyCells, board, mySymbol, opponentSymbol);
  }

  private getStrategicMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): TicTacToeAIMove {
    switch (this.personality) {
      case 'champion':
        return this.getChampionMove(board, emptyCells, mySymbol, opponentSymbol);
      case 'strategist':
        return this.getStrategistMove(board, emptyCells, mySymbol, opponentSymbol);
      case 'trickster':
        return this.getTricksterMove(board, emptyCells, mySymbol, opponentSymbol);
      case 'guardian':
        return this.getGuardianMove(board, emptyCells, mySymbol, opponentSymbol);
      case 'speedster':
        return this.getSpeedsterMove(board, emptyCells, mySymbol, opponentSymbol);
      case 'wildcard':
        return this.getWildcardMove(board, emptyCells, mySymbol, opponentSymbol);
      case 'mentor':
        return this.getMentorMove(board, emptyCells, mySymbol, opponentSymbol);
      default:
        return this.getChampionMove(board, emptyCells, mySymbol, opponentSymbol);
    }
  }

  private getChampionMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): TicTacToeAIMove {
    const winningMove = this.getWinningMove(board, mySymbol);
    if (winningMove) {
      this.reasoning = 'Champion: Victory is certain. No hesitation.';
      this.confidence = 1.0;
      return { ...winningMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const blockingMove = this.getBlockingMove(board, opponentSymbol);
    if (blockingMove) {
      this.reasoning = 'Champion: Your threat is noted and neutralized.';
      this.confidence = 0.95;
      return { ...blockingMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const bestMove = this.getMinimaxMove(board, mySymbol, opponentSymbol, 4);
    if (bestMove) {
      return { ...bestMove, reasoning: 'Champion: Perfect play leads to inevitable victory.', confidence: 0.95, personality: this.personality };
    }

    return this.getMediumMove(board, emptyCells, mySymbol, opponentSymbol);
  }

  private getStrategistMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): TicTacToeAIMove {
    const winningMove = this.getWinningMove(board, mySymbol);
    if (winningMove) {
      this.reasoning = 'Strategist: Calculated win - optimal move executed.';
      this.confidence = 0.9;
      return { ...winningMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const blockingMove = this.getBlockingMove(board, opponentSymbol);
    if (blockingMove) {
      this.reasoning = 'Strategist: Threat neutralized through logical blocking.';
      this.confidence = 0.85;
      return { ...blockingMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const center = this.getCenterMove(emptyCells);
    if (center) {
      this.reasoning = 'Strategist: Center control maximizes strategic options.';
      this.confidence = 0.8;
      return { ...center, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const corners = this.getCornerMoves(emptyCells);
    if (corners.length > 0) {
      const corner = corners[Math.floor(Math.random() * corners.length)];
      this.reasoning = 'Strategist: Corner position preserves future opportunities.';
      this.confidence = 0.7;
      return { ...corner, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    return this.getRandomMove(emptyCells, board, mySymbol, opponentSymbol);
  }

  private getTricksterMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): TicTacToeAIMove {
    const bluffChance = this.difficulty === 'easy' ? 0.4 : this.difficulty === 'medium' ? 0.25 : 0.1;
    const shouldBluff = Math.random() < bluffChance;

    const winningMove = this.getWinningMove(board, mySymbol);
    const blockingMove = this.getBlockingMove(board, opponentSymbol);

    if (shouldBluff && !winningMove && !blockingMove) {
      const center = this.getCenterMove(emptyCells);
      if (center) {
        this.reasoning = 'Trickster: I\'m totally taking the center... or am I? Just kidding, I totally am.';
        this.confidence = 0.6;
        return { ...center, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
      }

      const corners = this.getCornerMoves(emptyCells);
      if (corners.length > 0) {
        const corner = corners[Math.floor(Math.random() * corners.length)];
        this.reasoning = 'Trickster: Playing the corner... nothing to see here, move along...';
        this.confidence = 0.5;
        return { ...corner, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
      }
    }

    if (winningMove) {
      this.reasoning = 'Trickster: A win\'s a win, even if it\'s not very tricky!';
      this.confidence = 0.9;
      return { ...winningMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    if (blockingMove) {
      this.reasoning = 'Trickster: Nice try! But I saw that coming from a mile away.';
      this.confidence = 0.8;
      return { ...blockingMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const center = this.getCenterMove(emptyCells);
    if (center) {
      this.reasoning = 'Trickster: Taking the center - the classic move that never fails to bore opponents!';
      this.confidence = 0.7;
      return { ...center, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const corners = this.getCornerMoves(emptyCells);
    if (corners.length > 0) {
      const corner = corners[Math.floor(Math.random() * corners.length)];
      this.reasoning = 'Trickster: Corner play - subtle and misunderstood, just the way I like it.';
      this.confidence = 0.6;
      return { ...corner, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    return this.getRandomMove(emptyCells, board, mySymbol, opponentSymbol);
  }

  private getGuardianMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): TicTacToeAIMove {
    const blockingMove = this.getBlockingMove(board, opponentSymbol);
    if (blockingMove) {
      this.reasoning = 'Guardian: I protect my position and block your advances.';
      this.confidence = 0.9;
      return { ...blockingMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const winningMove = this.getWinningMove(board, mySymbol);
    if (winningMove) {
      this.reasoning = 'Guardian: When defense fails, offense becomes necessary.';
      this.confidence = 0.85;
      return { ...winningMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const center = this.getCenterMove(emptyCells);
    if (center) {
      this.reasoning = 'Guardian: Center position allows maximum defensive coverage.';
      this.confidence = 0.75;
      return { ...center, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const corners = this.getCornerMoves(emptyCells);
    if (corners.length > 0) {
      const corner = corners[Math.floor(Math.random() * corners.length)];
      this.reasoning = 'Guardian: Corner defense - maintaining a solid perimeter.';
      this.confidence = 0.65;
      return { ...corner, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    return this.getRandomMove(emptyCells, board, mySymbol, opponentSymbol);
  }

  private getSpeedsterMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): TicTacToeAIMove {
    const winningMove = this.getWinningMove(board, mySymbol);
    if (winningMove) {
      this.reasoning = 'Speedster: WIN! Lightning fast victory!';
      this.confidence = 0.95;
      return { ...winningMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const blockingMove = this.getBlockingMove(board, opponentSymbol);
    if (blockingMove) {
      this.reasoning = 'Speedster: Blocked! Can\'t let you steal my thunder!';
      this.confidence = 0.85;
      return { ...blockingMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    this.reasoning = 'Speedster: Speed over strategy! Sometimes you just gotta go!';
    this.confidence = 0.5;
    return { ...randomMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
  }

  private getWildcardMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): TicTacToeAIMove {
    const chaosThreshold = this.difficulty === 'easy' ? 0.5 : this.difficulty === 'medium' ? 0.35 : 0.15;
    const shouldChaos = Math.random() < chaosThreshold;

    if (shouldChaos) {
      const randomIndex = Math.floor(Math.random() * emptyCells.length);
      const randomCell = emptyCells[randomIndex];
      this.reasoning = 'Wildcard: Who knows? Who cares? This looked fun!';
      this.confidence = 0.3;
      return { ...randomCell, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const winningMove = this.getWinningMove(board, mySymbol);
    if (winningMove) {
      this.reasoning = 'Wildcard: Wait, I actually have a plan? Winning? Okay sure!';
      this.confidence = 0.8;
      return { ...winningMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const blockingMove = this.getBlockingMove(board, opponentSymbol);
    if (blockingMove) {
      this.reasoning = 'Wildcard: Blocking? I suppose that makes sense... sometimes.';
      this.confidence = 0.7;
      return { ...blockingMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const center = this.getCenterMove(emptyCells);
    if (center) {
      this.reasoning = 'Wildcard: Center? Edges? Corners? I pick this one because... reasons!';
      this.confidence = 0.4;
      return { ...center, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex];
    this.reasoning = 'Wildcard: Pure chaos! No strategy here!';
    this.confidence = 0.2;
    return { ...randomCell, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
  }

  private getMentorMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): TicTacToeAIMove {
    const winningMove = this.getWinningMove(board, mySymbol);
    if (winningMove) {
      this.reasoning = 'Mentor: When you can win, take it! But remember - winning isn\'t everything.';
      this.confidence = 0.85;
      return { ...winningMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const blockingMove = this.getBlockingMove(board, opponentSymbol);
    if (blockingMove) {
      this.reasoning = 'Mentor: Always watch for your opponent\'s threats. Blocking teaches patience.';
      this.confidence = 0.8;
      return { ...blockingMove, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const center = this.getCenterMove(emptyCells);
    if (center) {
      this.reasoning = 'Mentor: The center is powerful because it controls more lines. This is great for beginners to learn!';
      this.confidence = 0.75;
      return { ...center, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    const corners = this.getCornerMoves(emptyCells);
    if (corners.length > 0) {
      const corner = corners[Math.floor(Math.random() * corners.length)];
      this.reasoning = 'Mentor: Corners are good second choices. They offer flexibility without demanding center control.';
      this.confidence = 0.65;
      return { ...corner, reasoning: this.reasoning, confidence: this.confidence, personality: this.personality };
    }

    return this.getRandomMove(emptyCells, board, mySymbol, opponentSymbol);
  }

  private getMinimaxMove(
    board: TicTacToeBoard,
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol,
    depth: number
  ): { row: number; col: number } | null {
    let bestScore = -Infinity;
    let bestMove: { row: number; col: number } | null = null;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          const newBoard = board.map(r => [...r]) as TicTacToeBoard;
          newBoard[row][col] = mySymbol;
          const score = this.minimax(newBoard, depth - 1, false, mySymbol, opponentSymbol);
          if (score > bestScore) {
            bestScore = score;
            bestMove = { row, col };
          }
        }
      }
    }

    return bestMove;
  }

  private minimax(
    board: TicTacToeBoard,
    depth: number,
    isMaximizing: boolean,
    mySymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): number {
    const winner = this.checkWinner(board);
    if (winner?.winner === mySymbol) return 10 - (4 - depth);
    if (winner?.winner === opponentSymbol) return depth - 10;
    if (this.isBoardFull(board)) return 0;
    if (depth === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            const newBoard = board.map(r => [...r]) as TicTacToeBoard;
            newBoard[row][col] = mySymbol;
            const score = this.minimax(newBoard, depth - 1, false, mySymbol, opponentSymbol);
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            const newBoard = board.map(r => [...r]) as TicTacToeBoard;
            newBoard[row][col] = opponentSymbol;
            const score = this.minimax(newBoard, depth - 1, true, mySymbol, opponentSymbol);
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  private checkWinner(board: TicTacToeBoard): WinningLine | null {
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
        return { winner: cellA, line: line as [number, number][] };
      }
    }

    return null;
  }

  private isBoardFull(board: TicTacToeBoard): boolean {
    return board.every(row => row.every(cell => cell !== null));
  }

  private getPersonalityPrefix(): string {
    switch (this.personality) {
      case 'champion': return 'Champion:';
      case 'strategist': return 'Strategist:';
      case 'trickster': return 'Trickster:';
      case 'guardian': return 'Guardian:';
      case 'speedster': return 'Speedster:';
      case 'wildcard': return 'Wildcard:';
      case 'mentor': return 'Mentor:';
      default: return '';
    }
  }

  getReasoning(): string {
    return this.reasoning;
  }

  getConfidence(): number {
    return this.confidence;
  }
}

export function createTicTacToeAIAgent(config?: Partial<TicTacToeAIConfig>): TicTacToeAIAgent {
  return new TicTacToeAIAgent(config);
}
