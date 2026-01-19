import { v4 as uuid } from 'uuid';
import type {
  TicTacToeGameState,
  Player,
  GameEvent,
  TicTacToeBoard,
  TicTacToeSymbol,
} from './types.js';
import {
  createEmptyTicTacToeBoard,
  isValidTicTacToeMove,
  checkTicTacToeWinner,
  isTicTacToeBoardFull,
} from './referee.js';

export interface TicTacToeAction {
  type: 'place' | 'forfeit';
  row?: number;
  col?: number;
}

export interface TicTacToeConfig {
  aiDifficulty: 'easy' | 'medium' | 'hard';
}

/**
 * TicTacToe Game Engine
 * Implements the core game logic for TicTacToe
 */
export class TicTacToeEngine {
  private state: TicTacToeGameState;
  private config: TicTacToeConfig;
  private onStateChange?: (state: TicTacToeGameState) => void;
  private onEvent?: (event: GameEvent) => void;

  constructor(
    players: Player[],
    config: Partial<TicTacToeConfig> = {}
  ) {
    if (players.length !== 2) {
      throw new Error('TicTacToe requires exactly 2 players');
    }

    this.config = {
      aiDifficulty: config.aiDifficulty || 'medium',
    };

    this.state = {
      id: uuid(),
      gameType: 'tictactoe',
      phase: 'waiting',
      players: players.map(p => ({ ...p, score: 0 })),
      currentPlayerIndex: 0,
      board: createEmptyTicTacToeBoard(),
      currentSymbol: 'X',
      moveCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.emitEvent('game_created', {
      players: players.map(p => ({ id: p.id, name: p.name, type: p.type })),
    });
  }

  setOnStateChange(callback: (state: TicTacToeGameState) => void): void {
    this.onStateChange = callback;
  }

  setOnEvent(callback: (event: GameEvent) => void): void {
    this.onEvent = callback;
  }

  private notifyStateChange(): void {
    this.state.updatedAt = Date.now();
    this.onStateChange?.(this.state);
  }

  private emitEvent(type: string, data: Record<string, unknown>): void {
    const event: GameEvent = {
      id: uuid(),
      type,
      playerId: this.getCurrentPlayer()?.id || 'system',
      timestamp: Date.now(),
      data,
    };
    this.onEvent?.(event);
  }

  getState(): TicTacToeGameState {
    return { ...this.state, board: this.state.board.map(row => [...row]) as TicTacToeBoard };
  }

  getCurrentPlayer(): Player | undefined {
    return this.state.players[this.state.currentPlayerIndex];
  }

  getCurrentPlayerId(): string | undefined {
    return this.getCurrentPlayer()?.id;
  }

  startGame(): void {
    if (this.state.phase !== 'waiting') {
      throw new Error('Game already started');
    }

    this.state.phase = 'in_progress';
    this.emitEvent('game_started', {});
    this.notifyStateChange();
  }

  processAction(
    playerId: string,
    action: TicTacToeAction
  ): { success: boolean; error?: string; newState?: TicTacToeGameState } {
    if (this.state.phase !== 'in_progress') {
      return { success: false, error: 'Game is not in progress' };
    }

    const currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer || currentPlayer.id !== playerId) {
      return { success: false, error: 'Not your turn' };
    }

    switch (action.type) {
      case 'place':
        return this.placeSymbol(playerId, action.row!, action.col!);
      case 'forfeit':
        return this.forfeit(playerId);
      default:
        return { success: false, error: 'Unknown action type' };
    }
  }

  private placeSymbol(
    playerId: string,
    row: number,
    col: number
  ): { success: boolean; error?: string; newState?: TicTacToeGameState } {
    // Validate coordinates
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      return { success: false, error: 'Invalid position: row and col must be 0-2' };
    }

    // Check if cell is empty
    if (!isValidTicTacToeMove(this.state.board as TicTacToeBoard, row, col)) {
      return { success: false, error: 'Cell is already occupied' };
    }

    // Place the symbol
    this.state.board[row][col] = this.state.currentSymbol;
    this.state.moveCount++;

    this.emitEvent('move_made', {
      row,
      col,
      symbol: this.state.currentSymbol,
      moveCount: this.state.moveCount,
    });

    // Check for winner
    const winnerResult = checkTicTacToeWinner(this.state.board as TicTacToeBoard);
    if (winnerResult) {
      this.state.phase = 'finished';
      this.state.winnerId = playerId;
      this.state.winningLine = winnerResult.line;

      // Update winner's score
      const winner = this.state.players.find(p => p.id === playerId);
      if (winner) {
        winner.score = 1;
      }

      this.emitEvent('game_finished', {
        outcome: 'win',
        winnerId: playerId,
        winningLine: winnerResult.line,
      });

      this.notifyStateChange();
      return { success: true, newState: this.getState() };
    }

    // Check for draw
    if (isTicTacToeBoardFull(this.state.board as TicTacToeBoard)) {
      this.state.phase = 'finished';
      this.state.isDraw = true;

      this.emitEvent('game_finished', {
        outcome: 'draw',
      });

      this.notifyStateChange();
      return { success: true, newState: this.getState() };
    }

    // Game continues - switch player
    this.state.currentPlayerIndex = (this.state.currentPlayerIndex + 1) % 2;
    this.state.currentSymbol = this.state.currentSymbol === 'X' ? 'O' : 'X';

    this.notifyStateChange();
    return { success: true, newState: this.getState() };
  }

  private forfeit(
    playerId: string
  ): { success: boolean; error?: string; newState?: TicTacToeGameState } {
    this.state.phase = 'finished';
    
    // The other player wins
    const winnerId = this.state.players.find(p => p.id !== playerId)?.id;
    this.state.winnerId = winnerId;

    // Update winner's score
    const winner = this.state.players.find(p => p.id === winnerId);
    if (winner) {
      winner.score = 1;
    }

    this.emitEvent('game_finished', {
      outcome: 'forfeit',
      winnerId,
      forfeitedBy: playerId,
    });

    this.notifyStateChange();
    return { success: true, newState: this.getState() };
  }

  getBoard(): TicTacToeBoard {
    return this.state.board.map(row => [...row]) as TicTacToeBoard;
  }

  isValidAction(playerId: string, action: TicTacToeAction): boolean {
    if (this.state.phase !== 'in_progress') return false;

    const currentPlayer = this.getCurrentPlayer();
    if (!currentPlayer || currentPlayer.id !== playerId) return false;

    if (action.type === 'forfeit') return true;

    if (action.type === 'place') {
      const { row, col } = action;
      if (row === undefined || col === undefined) return false;
      if (row < 0 || row > 2 || col < 0 || col > 2) return false;
      return isValidTicTacToeMove(this.state.board as TicTacToeBoard, row, col);
    }

    return false;
  }

  getResult(): {
    winnerId?: string;
    isDraw: boolean;
    moveCount: number;
    board: TicTacToeBoard;
  } {
    return {
      winnerId: this.state.winnerId,
      isDraw: this.state.isDraw || false,
      moveCount: this.state.moveCount,
      board: this.getBoard(),
    };
  }
}

/**
 * AI opponent for TicTacToe
 */
export class TicTacToeAI {
  private difficulty: 'easy' | 'medium' | 'hard';
  private symbol: TicTacToeSymbol;

  constructor(difficulty: 'easy' | 'medium' | 'hard' = 'medium', symbol: TicTacToeSymbol = 'O') {
    this.difficulty = difficulty;
    this.symbol = symbol;
  }

  getMove(board: TicTacToeBoard): { row: number; col: number } | null {
    switch (this.difficulty) {
      case 'easy':
        return this.getRandomMove(board);
      case 'medium':
        return Math.random() > 0.5 ? this.getBestMove(board) : this.getRandomMove(board);
      case 'hard':
        return this.getBestMove(board);
      default:
        return this.getRandomMove(board);
    }
  }

  private getRandomMove(board: TicTacToeBoard): { row: number; col: number } | null {
    const emptyCells: { row: number; col: number }[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length === 0) return null;
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  private getBestMove(board: TicTacToeBoard): { row: number; col: number } | null {
    // Minimax algorithm for optimal play
    let bestScore = -Infinity;
    let bestMove: { row: number; col: number } | null = null;

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          const newBoard = board.map((r: TicTacToeSymbol[]) => [...r]) as TicTacToeBoard;
          newBoard[row][col] = this.symbol;
          const score = this.minimax(newBoard, 0, false);
          if (score > bestScore) {
            bestScore = score;
            bestMove = { row, col };
          }
        }
      }
    }

    return bestMove;
  }

  private minimax(board: TicTacToeBoard, depth: number, isMaximizing: boolean): number {
    const winner = checkTicTacToeWinner(board);
    if (winner) {
      return winner.winner === this.symbol ? 10 - depth : depth - 10;
    }
    if (isTicTacToeBoardFull(board)) {
      return 0;
    }

    const opponentSymbol = this.symbol === 'X' ? 'O' : 'X';

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (board[row][col] === null) {
            const newBoard = board.map((r: TicTacToeSymbol[]) => [...r]) as TicTacToeBoard;
            newBoard[row][col] = this.symbol;
            const score = this.minimax(newBoard, depth + 1, false);
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
            const newBoard = board.map((r: TicTacToeSymbol[]) => [...r]) as TicTacToeBoard;
            newBoard[row][col] = opponentSymbol;
            const score = this.minimax(newBoard, depth + 1, true);
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
}

export function createTicTacToeEngine(players: Player[], config?: Partial<TicTacToeConfig>): TicTacToeEngine {
  return new TicTacToeEngine(players, config);
}
