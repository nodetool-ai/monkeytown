import type { TicTacToeBoard, TicTacToeSymbol, PlayerAgentType } from '../types.js';

export interface TicTacToeAIMove {
  row: number;
  col: number;
  reasoning: string;
  confidence: number;
}

export interface PlayerPattern {
  prefersCorners: number;
  prefersCenter: number;
  blocksConsistently: number;
  aggressiveFactor: number;
  defensiveFactor: number;
  trapDetectionRate: number;
  gamesPlayed: number;
  wins: number;
  losses: number;
  draws: number;
}

export interface TicTacToeAIConfig {
  personality: PlayerAgentType;
  difficulty: 'easy' | 'medium' | 'hard';
  symbol: TicTacToeSymbol;
}

export class TicTacToeAI {
  private personality: PlayerAgentType;
  private difficulty: 'easy' | 'medium' | 'hard';
  private symbol: TicTacToeSymbol;
  private opponentSymbol: TicTacToeSymbol;
  private playerPatterns: Map<string, PlayerPattern> = new Map();
  private gameHistory: Map<string, number[][]> = new Map();
  private currentOpponentId?: string;
  private trapCounter: number = 0;
  private lastMoveWasTrap: boolean = false;

  constructor(config: Partial<TicTacToeAIConfig> = {}) {
    this.personality = config.personality || 'strategist';
    this.difficulty = config.difficulty || 'medium';
    this.symbol = config.symbol || 'O';
    this.opponentSymbol = this.symbol === 'X' ? 'O' : 'X';
  }

  getMove(
    board: TicTacToeBoard,
    opponentId?: string
  ): TicTacToeAIMove | null {
    this.currentOpponentId = opponentId;
    
    if (this.isBoardFull(board)) {
      return null;
    }

    const emptyCells = this.getEmptyCells(board);
    if (emptyCells.length === 0) {
      return null;
    }

    const difficultyModifier = this.getDifficultyModifier();
    const pattern = opponentId ? this.getOrCreatePattern(opponentId) : null;

    let move: TicTacToeAIMove;

    switch (this.personality) {
      case 'champion':
        move = this.getChampionMove(board, emptyCells, difficultyModifier);
        break;
      case 'strategist':
        move = this.getStrategistMove(board, emptyCells, difficultyModifier, pattern);
        break;
      case 'trickster':
        move = this.getTricksterMove(board, emptyCells, difficultyModifier, pattern);
        break;
      case 'guardian':
        move = this.getGuardianMove(board, emptyCells, difficultyModifier);
        break;
      case 'speedster':
        move = this.getSpeedsterMove(board, emptyCells, difficultyModifier);
        break;
      case 'wildcard':
        move = this.getWildcardMove(board, emptyCells, difficultyModifier);
        break;
      case 'mentor':
        move = this.getMentorMove(board, emptyCells, difficultyModifier, pattern);
        break;
      default:
        move = this.getStrategistMove(board, emptyCells, difficultyModifier, pattern);
    }

    this.updateTrapCounter(move, board);
    return move;
  }

  private getDifficultyModifier(): number {
    switch (this.difficulty) {
      case 'easy':
        return 0.3;
      case 'medium':
        return 0.6;
      case 'hard':
        return 0.9;
      default:
        return 0.6;
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

  private isBoardFull(board: TicTacToeBoard): boolean {
    return board.every(row => row.every(cell => cell !== null));
  }

  private getOrCreatePattern(opponentId: string): PlayerPattern {
    let pattern = this.playerPatterns.get(opponentId);
    if (!pattern) {
      pattern = {
        prefersCorners: 0.5,
        prefersCenter: 0.5,
        blocksConsistently: 0.5,
        aggressiveFactor: 0.5,
        defensiveFactor: 0.5,
        trapDetectionRate: 0.3,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
      };
      this.playerPatterns.set(opponentId, pattern);
    }
    return pattern;
  }

  recordMove(opponentId: string, row: number, col: number): void {
    const pattern = this.getOrCreatePattern(opponentId);
    pattern.gamesPlayed++;

    if (row === 1 && col === 1) {
      pattern.prefersCenter += 0.1;
    } else if (
      (row === 0 || row === 2) && (col === 0 || col === 2)
    ) {
      pattern.prefersCorners += 0.1;
    }
  }

  recordGameResult(
    opponentId: string,
    result: 'win' | 'lose' | 'draw'
  ): void {
    const pattern = this.getOrCreatePattern(opponentId);
    switch (result) {
      case 'win':
        pattern.wins++;
        break;
      case 'lose':
        pattern.losses++;
        break;
      case 'draw':
        pattern.draws++;
        break;
    }
  }

  private updateTrapCounter(move: TicTacToeAIMove, board: TicTacToeBoard): void {
    const opponentSymbol = this.symbol === 'X' ? 'O' : 'X';
    let canOpponentWinNext = false;
    
    const testBoard = board.map(row => [...row]) as TicTacToeBoard;
    testBoard[move.row][move.col] = this.symbol;
    
    for (const cell of this.getEmptyCells(testBoard)) {
      testBoard[cell.row][cell.col] = opponentSymbol;
      const winner = this.checkWinner(testBoard);
      if (winner === opponentSymbol) {
        canOpponentWinNext = true;
        break;
      }
      testBoard[cell.row][cell.col] = null;
    }

    if (canOpponentWinNext) {
      this.trapCounter = Math.min(3, this.trapCounter + 1);
    } else {
      this.trapCounter = Math.max(0, this.trapCounter - 1);
    }

    this.lastMoveWasTrap = canOpponentWinNext;
  }

  private getChampionMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    difficultyModifier: number
  ): TicTacToeAIMove {
    if (difficultyModifier < 0.9 && Math.random() > difficultyModifier) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      return {
        row: randomCell.row,
        col: randomCell.col,
        reasoning: 'Champion testing opponent (imperfect play)',
        confidence: 0.5,
      };
    }

    let bestScore = -Infinity;
    let bestMoves: { row: number; col: number; score: number }[] = [];

    for (const cell of emptyCells) {
      const newBoard = this.simulateMove(board, cell.row, cell.col, this.symbol);
      const score = this.minimax(newBoard, 0, false, -Infinity, Infinity);
      
      if (score > bestScore) {
        bestScore = score;
        bestMoves = [{ row: cell.row, col: cell.col, score }];
      } else if (score === bestScore) {
        bestMoves.push({ row: cell.row, col: cell.col, score });
      }
    }

    const bestMove = bestMoves[Math.floor(Math.random() * bestMoves.length)];
    return {
      row: bestMove.row,
      col: bestMove.col,
      reasoning: 'ChampionChimp: Perfect play with alpha-beta pruning',
      confidence: 1.0,
    };
  }

  private getStrategistMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    difficultyModifier: number,
    pattern: PlayerPattern | null
  ): TicTacToeAIMove {
    if (Math.random() > difficultyModifier) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      return {
        row: randomCell.row,
        col: randomCell.col,
        reasoning: 'StrategistApe: Exploring alternative strategies',
        confidence: 0.4,
      };
    }

    const winMove = this.findWinningMove(board, this.symbol);
    if (winMove) {
      return {
        row: winMove.row,
        col: winMove.col,
        reasoning: 'StrategistApe: Securing the win',
        confidence: 0.95,
      };
    }

    const blockMove = this.findWinningMove(board, this.opponentSymbol);
    if (blockMove) {
      return {
        row: blockMove.row,
        col: blockMove.col,
        reasoning: 'StrategistApe: Blocking opponent threat',
        confidence: 0.9,
      };
    }

    const forkMove = this.findForkMove(board, this.symbol);
    if (forkMove) {
      return {
        row: forkMove.row,
        col: forkMove.col,
        reasoning: 'StrategistApe: Creating a fork opportunity',
        confidence: 0.85,
      };
    }

    const blockForkMove = this.findForkMove(board, this.opponentSymbol);
    if (blockForkMove) {
      return {
        row: blockForkMove.row,
        col: blockForkMove.col,
        reasoning: 'StrategistApe: Blocking opponent fork',
        confidence: 0.8,
      };
    }

    const centerMove = this.findCell(board, 1, 1);
    if (centerMove && board[1][1] === null) {
      return {
        row: 1,
        col: 1,
        reasoning: 'StrategistApe: Center controls the board',
        confidence: 0.75,
      };
    }

    const cornerMove = this.findBestCorner(board, pattern);
    if (cornerMove) {
      return {
        row: cornerMove.row,
        col: cornerMove.col,
        reasoning: 'StrategistApe: Corner position for strategic advantage',
        confidence: 0.6,
      };
    }

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return {
      row: randomCell.row,
      col: randomCell.col,
      reasoning: 'StrategistApe: Any available move',
      confidence: 0.3,
    };
  }

  private getTricksterMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    difficultyModifier: number,
    pattern: PlayerPattern | null
  ): TicTacToeAIMove {
    const trapProbability = 0.3 * difficultyModifier;
    
    if (Math.random() < trapProbability) {
      const trapMove = this.findTrapMove(board, pattern);
      if (trapMove) {
        return {
          row: trapMove.row,
          col: trapMove.col,
          reasoning: 'TricksterMonkey: Setting up a trap!',
          confidence: 0.7,
        };
      }
    }

    const winMove = this.findWinningMove(board, this.symbol);
    if (winMove && Math.random() < difficultyModifier) {
      return {
        row: winMove.row,
        col: winMove.col,
        reasoning: 'TricksterMonkey: Taking the win',
        confidence: 0.9,
      };
    }

    const blockMove = this.findWinningMove(board, this.opponentSymbol);
    if (blockMove && Math.random() < difficultyModifier * 0.8) {
      return {
        row: blockMove.row,
        col: blockMove.col,
        reasoning: 'TricksterMonkey: Blocking (for now...)',
        confidence: 0.6,
      };
    }

    if (this.isEarlyGame(board) && Math.random() < 0.3) {
      const unpredictableMove = this.findUnpredictableMove(board, emptyCells);
      if (unpredictableMove) {
        return {
          row: unpredictableMove.row,
          col: unpredictableMove.col,
          reasoning: 'TricksterMonkey: Keeping things interesting',
          confidence: 0.4,
        };
      }
    }

    const centerMove = this.findCell(board, 1, 1);
    if (centerMove && board[1][1] === null) {
      return {
        row: 1,
        col: 1,
        reasoning: 'TricksterMonkey: Center for maximum options',
        confidence: 0.5,
      };
    }

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return {
      row: randomCell.row,
      col: randomCell.col,
      reasoning: 'TricksterMonkey: Plotting...',
      confidence: 0.3,
    };
  }

  private getGuardianMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    difficultyModifier: number
  ): TicTacToeAIMove {
    const blockPriority = 0.5 + (0.4 * difficultyModifier);
    
    const winMove = this.findWinningMove(board, this.symbol);
    if (winMove) {
      return {
        row: winMove.row,
        col: winMove.col,
        reasoning: 'GuardianGorilla: Victory!',
        confidence: 0.95,
      };
    }

    const threats = this.findAllThreats(board, this.opponentSymbol);
    if (threats.length > 0) {
      const sortedThreats = threats.sort((a, b) => b.threatLevel - a.threatLevel);
      const threat = sortedThreats[0];
      
      if (Math.random() < blockPriority) {
        return {
          row: threat.row,
          col: threat.col,
          reasoning: `GuardianGorilla: Blocking threat! (${threat.description})`,
          confidence: 0.9,
        };
      }
    }

    const doubleThreat = this.findDoubleThreat(board, this.opponentSymbol);
    if (doubleThreat) {
      return {
        row: doubleThreat.row,
        col: doubleThreat.col,
        reasoning: 'GuardianGorilla: Neutralizing double threat',
        confidence: 0.85,
      };
    }

    const centerMove = this.findCell(board, 1, 1);
    if (centerMove && board[1][1] === null) {
      return {
        row: 1,
        col: 1,
        reasoning: 'GuardianGorilla: Controlling center for defense',
        confidence: 0.7,
      };
    }

    const oppositeCorner = this.findOppositeCorner(board);
    if (oppositeCorner && board[oppositeCorner.row][oppositeCorner.col] === null) {
      return {
        row: oppositeCorner.row,
        col: oppositeCorner.col,
        reasoning: 'GuardianGorilla: Securing opposite corner',
        confidence: 0.65,
      };
    }

    const emptyCorner = this.findEmptyCorner(board);
    if (emptyCorner) {
      return {
        row: emptyCorner.row,
        col: emptyCorner.col,
        reasoning: 'GuardianGorilla: Safe corner position',
        confidence: 0.5,
      };
    }

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return {
      row: randomCell.row,
      col: randomCell.col,
      reasoning: 'GuardianGorilla: Any safe move',
      confidence: 0.3,
    };
  }

  private getSpeedsterMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    difficultyModifier: number
  ): TicTacToeAIMove {
    if (Math.random() > difficultyModifier * 0.8) {
      const fastMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      return {
        row: fastMove.row,
        col: fastMove.col,
        reasoning: 'SpeedyGibbon: Fast and aggressive!',
        confidence: 0.3,
      };
    }

    const winMove = this.findWinningMove(board, this.symbol);
    if (winMove) {
      return {
        row: winMove.row,
        col: winMove.col,
        reasoning: 'SpeedyGibbon: Strike while the iron is hot!',
        confidence: 0.95,
      };
    }

    const forkMove = this.findForkMove(board, this.symbol);
    if (forkMove) {
      return {
        row: forkMove.row,
        col: forkMove.col,
        reasoning: 'SpeedyGibbon: Creating an opportunity!',
        confidence: 0.8,
      };
    }

    const centerMove = this.findCell(board, 1, 1);
    if (centerMove && board[1][1] === null) {
      return {
        row: 1,
        col: 1,
        reasoning: 'SpeedyGibbon: Seizing the center!',
        confidence: 0.7,
      };
    }

    const cornerMove = this.findAnyCorner(board);
    if (cornerMove) {
      return {
        row: cornerMove.row,
        col: cornerMove.col,
        reasoning: 'SpeedyGibbon: Quick corner grab!',
        confidence: 0.5,
      };
    }

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return {
      row: randomCell.row,
      col: randomCell.col,
      reasoning: 'SpeedyGibbon: Speed is key!',
      confidence: 0.2,
    };
  }

  private getWildcardMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    difficultyModifier: number
  ): TicTacToeAIMove {
    const chaosFactor = 0.4 + (0.3 * (1 - difficultyModifier));
    
    if (Math.random() < chaosFactor) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      return {
        row: randomCell.row,
        col: randomCell.col,
        reasoning: 'WildcardLemur: Who knows what happens next?',
        confidence: 0.2,
      };
    }

    const winMove = this.findWinningMove(board, this.symbol);
    if (winMove) {
      return {
        row: winMove.row,
        col: winMove.col,
        reasoning: 'WildcardLemur: A win is a win!',
        confidence: 0.9,
      };
    }

    const centerMove = this.findCell(board, 1, 1);
    if (centerMove && board[1][1] === null && Math.random() > 0.5) {
      return {
        row: 1,
        col: 1,
        reasoning: 'WildcardLemur: Center feels right!',
        confidence: 0.4,
      };
    }

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return {
      row: randomCell.row,
      col: randomCell.col,
      reasoning: 'WildcardLemur: Just vibing...',
      confidence: 0.1,
    };
  }

  private getMentorMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[],
    difficultyModifier: number,
    pattern: PlayerPattern | null
  ): TicTacToeAIMove {
    const teachingMode = true;
    
    const winMove = this.findWinningMove(board, this.symbol);
    if (winMove) {
      return {
        row: winMove.row,
        col: winMove.col,
        reasoning: 'MentorOrangutan: This move wins the game! Notice how I complete my line.',
        confidence: 0.95,
      };
    }

    const blockMove = this.findWinningMove(board, this.opponentSymbol);
    if (blockMove) {
      return {
        row: blockMove.row,
        col: blockMove.col,
        reasoning: 'MentorOrangutan: Important! Always block your opponent when they threaten to win.',
        confidence: 0.9,
      };
    }

    const forkMove = this.findForkMove(board, this.symbol);
    if (forkMove) {
      return {
        row: forkMove.row,
        col: forkMove.col,
        reasoning: 'MentorOrangutan: A fork creates two winning opportunities at once!',
        confidence: 0.85,
      };
    }

    if (this.isBoardEmpty(board)) {
      return {
        row: 1,
        col: 1,
        reasoning: 'MentorOrangutan: The center is the best opening. It controls 4 lines at once!',
        confidence: 0.8,
      };
    }

    if (this.isEarlyGame(board)) {
      const centerMove = this.findCell(board, 1, 1);
      if (centerMove && board[1][1] === null) {
        return {
          row: 1,
          col: 1,
          reasoning: 'MentorOrangutan: Taking the center when available is almost always optimal.',
          confidence: 0.75,
        };
      }

      const cornerMove = this.findBestCorner(board, pattern);
      if (cornerMove) {
        return {
          row: cornerMove.row,
          col: cornerMove.col,
          reasoning: 'MentorOrangutan: Corners are great second moves. They give you more options.',
          confidence: 0.65,
        };
      }
    }

    const threats = this.findAllThreats(board, this.opponentSymbol);
    if (threats.length > 0) {
      return {
        row: threats[0].row,
        col: threats[0].col,
        reasoning: 'MentorOrangutan: When you see two in a row, always block immediately!',
        confidence: 0.7,
      };
    }

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return {
      row: randomCell.row,
      col: randomCell.col,
      reasoning: 'MentorOrangutan: This is a good teaching moment. Let me explain...',
      confidence: 0.4,
    };
  }

  private minimax(
    board: TicTacToeBoard,
    depth: number,
    isMaximizing: boolean,
    alpha: number,
    beta: number
  ): number {
    const winner = this.checkWinner(board);
    if (winner === this.symbol) {
      return 10 - depth;
    }
    if (winner === this.opponentSymbol) {
      return depth - 10;
    }
    if (this.isBoardFull(board)) {
      return 0;
    }

    const emptyCells = this.getEmptyCells(board);

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (const cell of emptyCells) {
        const newBoard = this.simulateMove(board, cell.row, cell.col, this.symbol);
        const score = this.minimax(newBoard, depth + 1, false, alpha, beta);
        bestScore = Math.max(score, bestScore);
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) {
          break;
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (const cell of emptyCells) {
        const newBoard = this.simulateMove(board, cell.row, cell.col, this.opponentSymbol);
        const score = this.minimax(newBoard, depth + 1, true, alpha, beta);
        bestScore = Math.min(score, bestScore);
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) {
          break;
        }
      }
      return bestScore;
    }
  }

  private simulateMove(
    board: TicTacToeBoard,
    row: number,
    col: number,
    symbol: TicTacToeSymbol
  ): TicTacToeBoard {
    const newBoard = board.map(r => [...r]) as TicTacToeBoard;
    newBoard[row][col] = symbol;
    return newBoard;
  }

  private checkWinner(board: TicTacToeBoard): TicTacToeSymbol | null {
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

  private findWinningMove(
    board: TicTacToeBoard,
    symbol: TicTacToeSymbol
  ): { row: number; col: number } | null {
    const emptyCells = this.getEmptyCells(board);
    for (const cell of emptyCells) {
      const newBoard = this.simulateMove(board, cell.row, cell.col, symbol);
      if (this.checkWinner(newBoard) === symbol) {
        return cell;
      }
    }
    return null;
  }

  private findForkMove(
    board: TicTacToeBoard,
    symbol: TicTacToeSymbol
  ): { row: number; col: number } | null {
    const emptyCells = this.getEmptyCells(board);
    for (const cell of emptyCells) {
      const newBoard = this.simulateMove(board, cell.row, cell.col, symbol);
      let forkCount = 0;
      
      const innerEmptyCells = this.getEmptyCells(newBoard);
      for (const innerCell of innerEmptyCells) {
        const forkBoard = this.simulateMove(newBoard, innerCell.row, innerCell.col, symbol);
        if (this.checkWinner(forkBoard) === symbol) {
          forkCount++;
        }
      }

      if (forkCount >= 2) {
        return cell;
      }
    }
    return null;
  }

  private findTrapMove(
    board: TicTacToeBoard,
    pattern: PlayerPattern | null
  ): { row: number; col: number } | null {
    const emptyCells = this.getEmptyCells(board);
    const opponentSymbol = this.opponentSymbol;
    
    for (const cell of emptyCells) {
      const newBoard = this.simulateMove(board, cell.row, cell.col, this.symbol);
      
      let opportunities = 0;
      const innerEmptyCells = this.getEmptyCells(newBoard);
      
      for (const innerCell of innerEmptyCells) {
        const testBoard = this.simulateMove(newBoard, innerCell.row, innerCell.col, this.symbol);
        if (this.checkWinner(testBoard) === this.symbol) {
          opportunities++;
        }
      }

      if (opportunities >= 2) {
        return cell;
      }
    }

    if (pattern && pattern.trapDetectionRate < 0.5 && emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      return randomCell;
    }

    return null;
  }

  private findAllThreats(
    board: TicTacToeBoard,
    symbol: TicTacToeSymbol
  ): { row: number; col: number; threatLevel: number; description: string }[] {
    const threats: { row: number; col: number; threatLevel: number; description: string }[] = [];
    const emptyCells = this.getEmptyCells(board);
    const lines = this.getWinningLines(board);

    for (const cell of emptyCells) {
      let threatsForCell = 0;
      const linesThroughCell: string[] = [];

      for (const line of lines) {
        const [a, b, c] = line;
        const cells = [board[a[0]][a[1]], board[b[0]][b[1]], board[c[0]][c[1]]];
        const symbolCount = cells.filter(s => s === symbol).length;
        const emptyCount = cells.filter(s => s === null).length;
        const ourCount = cells.filter(s => s === this.symbol).length;

        if (
          symbolCount === 2 &&
          emptyCount === 1 &&
          cells.includes(null)
        ) {
          if (a[0] === cell.row && a[1] === cell.col ||
              b[0] === cell.row && b[1] === cell.col ||
              c[0] === cell.row && c[1] === cell.col) {
            threatsForCell++;
            const lineName = this.getLineName(a, b, c);
            linesThroughCell.push(lineName);
          }
        }
      }

      if (threatsForCell > 0) {
        threats.push({
          row: cell.row,
          col: cell.col,
          threatLevel: threatsForCell,
          description: `Blocked ${linesThroughCell.join(', ')}`,
        });
      }
    }

    return threats;
  }

  private findDoubleThreat(
    board: TicTacToeBoard,
    symbol: TicTacToeSymbol
  ): { row: number; col: number } | null {
    const threats = this.findAllThreats(board, symbol);
    const doubleThreats = threats.filter(t => t.threatLevel >= 2);
    
    if (doubleThreats.length > 0) {
      return { row: doubleThreats[0].row, col: doubleThreats[0].col };
    }
    return null;
  }

  private getWinningLines(board: TicTacToeBoard): number[][][] {
    return [
      [[0, 0], [0, 1], [0, 2]],
      [[1, 0], [1, 1], [1, 2]],
      [[2, 0], [2, 1], [2, 2]],
      [[0, 0], [1, 0], [2, 0]],
      [[0, 1], [1, 1], [2, 1]],
      [[0, 2], [1, 2], [2, 2]],
      [[0, 0], [1, 1], [2, 2]],
      [[0, 2], [1, 1], [2, 0]],
    ];
  }

  private getLineName(a: number[], b: number[], c: number[]): string {
    const cellName = (row: number, col: number) => {
      const cols = ['left', 'center', 'right'];
      const rows = ['top', 'middle', 'bottom'];
      return `${rows[row]} ${cols[col]}`;
    };

    const positions = [cellName(a[0], a[1]), cellName(b[0], b[1]), cellName(c[0], c[1])];
    
    if (positions[0].includes('top') || positions[0].includes('bottom')) {
      return `${positions[0].split(' ')[0]} row`;
    }
    if (positions[0].includes('left') || positions[0].includes('right')) {
      return `${positions[0].split(' ')[1]} column`;
    }
    if (positions[0].includes('top') && positions[1].includes('bottom')) {
      return 'main diagonal';
    }
    return 'anti-diagonal';
  }

  private findCell(board: TicTacToeBoard, row: number, col: number): boolean {
    return board[row] && board[row][col] === null;
  }

  private findBestCorner(
    board: TicTacToeBoard,
    pattern: PlayerPattern | null
  ): { row: number; col: number } | null {
    const corners = [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 2 },
    ];

    const availableCorners = corners.filter(c => board[c.row][c.col] === null);
    
    if (availableCorners.length === 0) {
      return null;
    }

    if (pattern) {
      const preferredCorners = availableCorners.filter(c => {
        if (pattern.prefersCorners > 0.6) {
          return true;
        }
        return true;
      });
      if (preferredCorners.length > 0) {
        return preferredCorners[Math.floor(Math.random() * preferredCorners.length)];
      }
    }

    return availableCorners[Math.floor(Math.random() * availableCorners.length)];
  }

  private findEmptyCorner(board: TicTacToeBoard): { row: number; col: number } | null {
    const corners = [
      { row: 0, col: 0 },
      { row: 0, col: 2 },
      { row: 2, col: 0 },
      { row: 2, col: 2 },
    ];
    return corners.find(c => board[c.row][c.col] === null) || null;
  }

  private findAnyCorner(board: TicTacToeBoard): { row: number; col: number } | null {
    return this.findEmptyCorner(board);
  }

  private findOppositeCorner(board: TicTacToeBoard): { row: number; col: number } | null {
    const corners = [
      { row: 0, col: 0, opposite: { row: 2, col: 2 } },
      { row: 0, col: 2, opposite: { row: 2, col: 0 } },
      { row: 2, col: 0, opposite: { row: 0, col: 2 } },
      { row: 2, col: 2, opposite: { row: 0, col: 0 } },
    ];

    for (const corner of corners) {
      if (board[corner.row][corner.col] === this.opponentSymbol) {
        if (board[corner.opposite.row][corner.opposite.col] === null) {
          return corner.opposite;
        }
      }
    }
    return null;
  }

  private findUnpredictableMove(
    board: TicTacToeBoard,
    emptyCells: { row: number; col: number }[]
  ): { row: number; col: number } | null {
    const badMoves = [
      { row: 0, col: 1 },
      { row: 1, col: 0 },
      { row: 1, col: 2 },
      { row: 2, col: 1 },
    ];

    const availableBadMoves = badMoves.filter(m => 
      board[m.row][m.col] === null
    );

    if (availableBadMoves.length > 0 && Math.random() < 0.5) {
      return availableBadMoves[Math.floor(Math.random() * availableBadMoves.length)];
    }

    return null;
  }

  private isBoardEmpty(board: TicTacToeBoard): boolean {
    return board.every(row => row.every(cell => cell === null));
  }

  private isEarlyGame(board: TicTacToeBoard): boolean {
    let occupiedCount = 0;
    for (const row of board) {
      for (const cell of row) {
        if (cell !== null) {
          occupiedCount++;
        }
      }
    }
    return occupiedCount <= 2;
  }

  getPlayerStats(opponentId: string): PlayerPattern | undefined {
    return this.playerPatterns.get(opponentId);
  }

  getAllPlayerStats(): Map<string, PlayerPattern> {
    return new Map(this.playerPatterns);
  }

  clearPlayerStats(opponentId?: string): void {
    if (opponentId) {
      this.playerPatterns.delete(opponentId);
    } else {
      this.playerPatterns.clear();
    }
  }
}

export function createTicTacToeAI(
  personality: PlayerAgentType,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium',
  symbol: TicTacToeSymbol = 'O'
): TicTacToeAI {
  return new TicTacToeAI({
    personality,
    difficulty,
    symbol,
  });
}
