import type { TicTacToeBoard, TicTacToeSymbol, PlayerAgentType } from '../types.js';
import { checkTicTacToeWinner } from '../referee.js';

export interface TicTacToeAIAction {
  row: number;
  col: number;
  reasoning: string;
  personality: PlayerAgentType;
}

interface PersonalityConfig {
  winSeeking: number;
  threatBlocking: number;
  centerPriority: number;
  cornerPriority: number;
  unpredictability: number;
  aggression: number;
  teachingMode: boolean;
  moveDelay: number;
}

const PERSONALITY_CONFIGS: Record<PlayerAgentType, PersonalityConfig> = {
  trickster: {
    winSeeking: 0.7,
    threatBlocking: 0.6,
    centerPriority: 0.8,
    cornerPriority: 0.9,
    unpredictability: 0.25,
    aggression: 0.5,
    teachingMode: false,
    moveDelay: 800,
  },
  strategist: {
    winSeeking: 0.9,
    threatBlocking: 1.0,
    centerPriority: 1.0,
    cornerPriority: 0.95,
    unpredictability: 0.1,
    aggression: 0.4,
    teachingMode: false,
    moveDelay: 600,
  },
  speedster: {
    winSeeking: 0.95,
    threatBlocking: 0.95,
    centerPriority: 0.9,
    cornerPriority: 0.85,
    unpredictability: 0.15,
    aggression: 0.95,
    teachingMode: false,
    moveDelay: 200,
  },
  guardian: {
    winSeeking: 0.6,
    threatBlocking: 1.0,
    centerPriority: 0.7,
    cornerPriority: 0.8,
    unpredictability: 0.1,
    aggression: 0.2,
    teachingMode: false,
    moveDelay: 700,
  },
  wildcard: {
    winSeeking: 0.3,
    threatBlocking: 0.3,
    centerPriority: 0.4,
    cornerPriority: 0.5,
    unpredictability: 0.5,
    aggression: 0.5,
    teachingMode: false,
    moveDelay: 400,
  },
  mentor: {
    winSeeking: 0.5,
    threatBlocking: 0.9,
    centerPriority: 0.9,
    cornerPriority: 0.9,
    unpredictability: 0.1,
    aggression: 0.3,
    teachingMode: true,
    moveDelay: 1000,
  },
  champion: {
    winSeeking: 1.0,
    threatBlocking: 1.0,
    centerPriority: 1.0,
    cornerPriority: 1.0,
    unpredictability: 0.05,
    aggression: 0.85,
    teachingMode: false,
    moveDelay: 400,
  },
};

export class EnhancedTicTacToeAI {
  private personality: PlayerAgentType;
  private config: PersonalityConfig;
  private reasoning: string = '';
  private moveHistory: Array<{ row: number; col: number; symbol: TicTacToeSymbol }> = [];

  constructor(personality: PlayerAgentType) {
    this.personality = personality;
    this.config = PERSONALITY_CONFIGS[personality];
  }

  getMove(board: TicTacToeBoard, aiSymbol: TicTacToeSymbol): TicTacToeAIAction | null {
    const emptyCells = this.getEmptyCells(board);
    if (emptyCells.length === 0) return null;

    const opponentSymbol = aiSymbol === 'X' ? 'O' : 'X';
    const reasoningParts: string[] = [];

    const shouldUnpredict = Math.random() < this.config.unpredictability;

    let winningMove = this.findWinningMove(board, aiSymbol);
    if (winningMove) {
      reasoningParts.push(this.getWinningReasoning());
      return { ...winningMove, reasoning: reasoningParts.join(' '), personality: this.personality };
    }

    if (Math.random() < this.config.threatBlocking) {
      const blockingMove = this.findWinningMove(board, opponentSymbol);
      if (blockingMove) {
        reasoningParts.push(this.getBlockingReasoning());
        return { ...blockingMove, reasoning: reasoningParts.join(' '), personality: this.personality };
      }
    }

    if (shouldUnpredict && this.config.unpredictability > 0.1) {
      const randomMove = this.getRandomMove(emptyCells);
      reasoningParts.push(this.getUnpredictableReasoning());
      return { ...randomMove, reasoning: reasoningParts.join(' '), personality: this.personality };
    }

    if (Math.random() < this.config.centerPriority) {
      const centerMove = this.findCenterMove(board);
      if (centerMove) {
        reasoningParts.push(this.getCenterReasoning());
        return { ...centerMove, reasoning: reasoningParts.join(' '), personality: this.personality };
      }
    }

    if (Math.random() < this.config.cornerPriority) {
      const cornerMove = this.findCornerMove(board, emptyCells);
      if (cornerMove) {
        reasoningParts.push(this.getCornerReasoning());
        return { ...cornerMove, reasoning: reasoningParts.join(' '), personality: this.personality };
      }
    }

    const bestMove = this.findBestStrategicMove(board, aiSymbol, opponentSymbol, emptyCells);
    reasoningParts.push(this.getStrategicReasoning(bestMove, board, aiSymbol));
    return { ...bestMove, reasoning: reasoningParts.join(' '), personality: this.personality };
  }

  getReasoning(): string {
    return this.reasoning;
  }

  getPersonality(): PlayerAgentType {
    return this.personality;
  }

  getMoveDelay(): number {
    return this.config.moveDelay;
  }

  private getEmptyCells(board: TicTacToeBoard): Array<{ row: number; col: number }> {
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

  private findWinningMove(board: TicTacToeBoard, symbol: TicTacToeSymbol): { row: number; col: number } | null {
    const emptyCells = this.getEmptyCells(board);
    for (const cell of emptyCells) {
      const testBoard = board.map((r: TicTacToeSymbol[]) => [...r]) as TicTacToeBoard;
      testBoard[cell.row][cell.col] = symbol;
      const result = checkTicTacToeWinner(testBoard);
      if (result && result.winner === symbol) {
        return cell;
      }
    }
    return null;
  }

  private findCenterMove(board: TicTacToeBoard): { row: number; col: number } | null {
    if (board[1][1] === null) {
      return { row: 1, col: 1 };
    }
    return null;
  }

  private findCornerMove(board: TicTacToeBoard, emptyCells: Array<{ row: number; col: number }>): { row: number; col: number } | null {
    const corners = [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 2 },
    ];
    const availableCorners = emptyCells.filter(cell =>
      corners.some(c => c.row === cell.row && c.col === cell.col)
    );
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    return null;
  }

  private findBestStrategicMove(
    board: TicTacToeBoard,
    aiSymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol,
    emptyCells: Array<{ row: number; col: number }>
  ): { row: number; col: number } {
    let bestScore = -Infinity;
    let bestMove = emptyCells[0];

    for (const cell of emptyCells) {
      const score = this.evaluateMove(cell, board, aiSymbol, opponentSymbol);
      if (score > bestScore) {
        bestScore = score;
        bestMove = cell;
      }
    }

    return bestMove;
  }

  private evaluateMove(
    cell: { row: number; col: number },
    board: TicTacToeBoard,
    aiSymbol: TicTacToeSymbol,
    opponentSymbol: TicTacToeSymbol
  ): number {
    let score = 0;

    const isCorner = (cell.row === 0 || cell.row === 2) && (cell.col === 0 || cell.col === 2);
    const isCenter = cell.row === 1 && cell.col === 1;
    const isEdge = !isCorner && !isCenter;

    if (isCenter) score += 10;
    if (isCorner) score += 5;
    if (isEdge) score += 1;

    score += this.getLineControlScore(cell, board, aiSymbol) * 2;
    score -= this.getLineControlScore(cell, board, opponentSymbol);

    if (this.config.unpredictability < 0.15) {
      if (isCenter) score += 20;
      if (isCorner) score += 10;
    } else {
      score += Math.random() * 2;
    }

    return score;
  }

  private getLineControlScore(
    cell: { row: number; col: number },
    board: TicTacToeBoard,
    symbol: TicTacToeSymbol
  ): number {
    let score = 0;

    const lines = [
      [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }],
      [{ row: 1, col: 0 }, { row: 1, col: 1 }, { row: 1, col: 2 }],
      [{ row: 2, col: 0 }, { row: 2, col: 1 }, { row: 2, col: 2 }],
      [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }],
      [{ row: 0, col: 1 }, { row: 1, col: 1 }, { row: 2, col: 1 }],
      [{ row: 0, col: 2 }, { row: 1, col: 2 }, { row: 2, col: 2 }],
      [{ row: 0, col: 0 }, { row: 1, col: 1 }, { row: 2, col: 2 }],
      [{ row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 }],
    ];

    for (const line of lines) {
      const inLine = line.some(c => c.row === cell.row && c.col === cell.col);
      if (inLine) {
        let symbolCount = 0;
        let emptyCount = 0;
        for (const pos of line) {
          if (board[pos.row][pos.col] === symbol) symbolCount++;
          if (board[pos.row][pos.col] === null) emptyCount++;
        }
        if (symbolCount === 2 && emptyCount === 1) score += 5;
        if (symbolCount === 1 && emptyCount === 2) score += 1;
      }
    }

    return score;
  }

  private getRandomMove(emptyCells: Array<{ row: number; col: number }>): { row: number; col: number } {
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  private getWinningReasoning(): string {
    const reasons: Record<PlayerAgentType, string> = {
      trickster: "The perfect setup! Time to spring my trap!",
      strategist: "Calculating the winning trajectory...",
      speedster: "GOTCHA! Taking the win!",
      guardian: "Securing victory through careful play.",
      wildcard: "Wait, did I just find a winning move? Lucky!",
      mentor: "Here's a tip: Always take a winning move when you see it!",
      champion: "Victory is inevitable. Taking the winning position.",
    };
    return reasons[this.personality];
  }

  private getBlockingReasoning(): string {
    const reasons: Record<PlayerAgentType, string> = {
      trickster: "I see your plan... but it ends here.",
      strategist: "Threat detected. Neutralizing opponent's advantage.",
      speedster: "Not so fast! Blocking your path!",
      guardian: "I'll protect my position. No wins for you!",
      wildcard: "Uh, I should probably block here?",
      mentor: "Good catch! Always watch for your opponent's winning opportunities.",
      champion: "Blocking the threat. Stay focused.",
    };
    return reasons[this.personality];
  }

  private getUnpredictableReasoning(): string {
    const reasons: Record<PlayerAgentType, string> = {
      trickster: "Let's keep them guessing... this looks interesting!",
      strategist: "Deviating slightly to keep options open.",
      speedster: "Speed over predictability!",
      guardian: "Sometimes the unexpected move is the best defense.",
      wildcard: "Random move time! Who knows what'll happen!",
      mentor: "Let's try something different to keep things interesting!",
      champion: "Mixing it up to keep you on your toes.",
    };
    return reasons[this.personality];
  }

  private getCenterReasoning(): string {
    const reasons: Record<PlayerAgentType, string> = {
      trickster: "The center controls everything... or does it?",
      strategist: "Center control maximizes strategic options.",
      speedster: "Center is MINE! Dominating the board!",
      guardian: "Holding the center protects my flanks.",
      wildcard: "Center feels lucky today!",
      mentor: "Tip: The center controls 4 lines at once!",
      champion: "Controlling the center is fundamental to winning.",
    };
    return reasons[this.personality];
  }

  private getCornerReasoning(): string {
    const reasons: Record<PlayerAgentType, string> = {
      trickster: "Corners are sneaky good positions...",
      strategist: "Corner position offers flexibility for future moves.",
      speedster: "Corner acquired! Building advantage!",
      guardian: "Safe corner position. Building my defense.",
      wildcard: "Corners are fun! Let's go corner corner corner!",
      mentor: "Corner openings are great for beginners to learn!",
      champion: "Corner strategy sets up multiple win conditions.",
    };
    return reasons[this.personality];
  }

  private getStrategicReasoning(move: { row: number; col: number }, board: TicTacToeBoard, aiSymbol: TicTacToeSymbol): string {
    const reasons: Record<PlayerAgentType, string> = {
      trickster: "Making a move that looks innocent but is perfectly calculated.",
      strategist: "Analyzing position for optimal long-term advantage.",
      speedster: "Quick decision! This position has potential!",
      guardian: "Building a solid foundation for defense.",
      wildcard: "This one seemed interesting!",
      mentor: "Let me show you why this move makes sense.",
      champion: "Every move builds toward victory.",
    };
    return reasons[this.personality];
  }
}

export function createEnhancedTicTacToeAI(personality: PlayerAgentType): EnhancedTicTacToeAI {
  return new EnhancedTicTacToeAI(personality);
}
