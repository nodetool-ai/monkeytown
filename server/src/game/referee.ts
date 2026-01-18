import { v4 as uuid } from 'uuid';
import type {
  ProtocolGameState,
  ProtocolPlayer,
  GameMove,
  RefereeInput,
  RefereeOutput,
  RefereeConfig,
  TicTacToeBoard,
  TicTacToeState,
  TicTacToeMove,
  TicTacToeSymbol,
} from './types.js';

// Import gaming protocol utilities - using relative path since path resolution may not work
// Re-export TicTacToe utilities
export function createEmptyTicTacToeBoard(): TicTacToeBoard {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

export function isValidTicTacToeMove(board: TicTacToeBoard, row: number, col: number): boolean {
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    return false;
  }
  return board[row][col] === null;
}

export function checkTicTacToeWinner(board: TicTacToeBoard): { winner: TicTacToeSymbol; line?: number[][] } | null {
  // Check rows
  for (let row = 0; row < 3; row++) {
    if (board[row][0] && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
      return { winner: board[row][0], line: [[row, 0], [row, 1], [row, 2]] };
    }
  }

  // Check columns
  for (let col = 0; col < 3; col++) {
    if (board[0][col] && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
      return { winner: board[0][col], line: [[0, col], [1, col], [2, col]] };
    }
  }

  // Check diagonals
  if (board[0][0] && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return { winner: board[0][0], line: [[0, 0], [1, 1], [2, 2]] };
  }
  if (board[0][2] && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return { winner: board[0][2], line: [[0, 2], [1, 1], [2, 0]] };
  }

  return null;
}

export function isTicTacToeBoardFull(board: TicTacToeBoard): boolean {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  return true;
}

// Referee-specific game event type
interface RefereeGameEvent {
  id: string;
  gameId: string;
  type: string;
  playerId?: string;
  data: Record<string, unknown>;
  timestamp: number;
}

/**
 * TicTacToe Game Rules - used as a prompt for AI-based evaluation
 */
export const TICTACTOE_RULES = `
TicTacToe Game Rules:
1. The game is played on a 3x3 grid.
2. Two players take turns: X always goes first, then O.
3. A player marks a cell by placing their symbol (X or O) in an empty cell.
4. A player wins by getting 3 of their symbols in a row (horizontally, vertically, or diagonally).
5. If all 9 cells are filled and no player has won, the game is a draw.
6. A move is valid only if the target cell is empty (null).
7. A move is specified as {row: 0-2, col: 0-2}.
`;

/**
 * GameReferee - Evaluates game moves and determines game outcomes
 * 
 * This is the core referee function that can evaluate moves using either:
 * - Local logic (built-in game rules)
 * - Agent-based evaluation (using prompts for AI to evaluate)
 */
export class GameReferee {
  private config: RefereeConfig;
  private events: RefereeGameEvent[] = [];
  private onEventCallback?: (event: RefereeGameEvent) => void;

  constructor(config: RefereeConfig) {
    this.config = config;
  }

  /**
   * Set callback for game events (for persistence)
   */
  setOnEvent(callback: (event: RefereeGameEvent) => void): void {
    this.onEventCallback = callback;
  }

  /**
   * Create a new game with players
   */
  createGame(players: ProtocolPlayer[]): ProtocolGameState {
    if (players.length !== 2) {
      throw new Error('TicTacToe requires exactly 2 players');
    }

    const gameState: ProtocolGameState = {
      gameId: uuid(),
      gameType: this.config.gameType,
      phase: 'waiting',
      players,
      currentPlayerIndex: 0,
      moveHistory: [],
      boardState: {
        board: createEmptyTicTacToeBoard(),
        currentSymbol: 'X' as TicTacToeSymbol,
      } as TicTacToeState,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.emitEvent({
      id: uuid(),
      gameId: gameState.gameId,
      type: 'game_created',
      data: { players: players.map(p => ({ id: p.id, name: p.name, kind: p.kind })) },
      timestamp: Date.now(),
    });

    return gameState;
  }

  /**
   * Start a game
   */
  startGame(gameState: ProtocolGameState): ProtocolGameState {
    if (gameState.phase !== 'waiting') {
      throw new Error('Game is not in waiting phase');
    }

    if (gameState.players.length !== 2) {
      throw new Error('Need exactly 2 players to start');
    }

    const newState: ProtocolGameState = {
      ...gameState,
      phase: 'in_progress',
      updatedAt: Date.now(),
    };

    this.emitEvent({
      id: uuid(),
      gameId: gameState.gameId,
      type: 'game_started',
      data: {},
      timestamp: Date.now(),
    });

    return newState;
  }

  /**
   * Evaluate a move and return the result
   */
  evaluateMove(input: RefereeInput): RefereeOutput {
    if (this.config.evaluator === 'agent') {
      return this.evaluateMoveWithAgent(input);
    }
    return this.evaluateMoveLocally(input);
  }

  /**
   * Process a move and update game state
   */
  processMove(gameState: ProtocolGameState, move: GameMove): { success: boolean; newState?: ProtocolGameState; error?: string } {
    if (gameState.phase !== 'in_progress') {
      return { success: false, error: 'Game is not in progress' };
    }

    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (move.playerId !== currentPlayer.id) {
      return { success: false, error: 'Not your turn' };
    }

    const input: RefereeInput = {
      gameState,
      proposedMove: move,
      gameRules: this.config.gameRules,
    };

    const result = this.evaluateMove(input);

    if (!result.isValid) {
      this.emitEvent({
        id: uuid(),
        gameId: gameState.gameId,
        type: 'move_rejected',
        playerId: move.playerId,
        data: { move: move.data, reason: result.error },
        timestamp: Date.now(),
      });
      return { success: false, error: result.error };
    }

    const newState: ProtocolGameState = {
      ...gameState,
      boardState: result.newBoardState!,
      currentPlayerIndex: result.nextPlayerIndex ?? (gameState.currentPlayerIndex + 1) % gameState.players.length,
      moveHistory: [...gameState.moveHistory, move],
      updatedAt: Date.now(),
    };

    if (result.gameResult) {
      newState.phase = 'finished';
      newState.result = result.gameResult;
    }

    this.emitEvent({
      id: uuid(),
      gameId: gameState.gameId,
      type: 'move_made',
      playerId: move.playerId,
      data: { move: move.data, boardState: result.newBoardState },
      timestamp: Date.now(),
    });

    if (result.gameResult) {
      this.emitEvent({
        id: uuid(),
        gameId: gameState.gameId,
        type: 'game_finished',
        data: result.gameResult,
        timestamp: Date.now(),
      });
    }

    return { success: true, newState };
  }

  /**
   * Evaluate move using local (built-in) logic for TicTacToe
   */
  private evaluateMoveLocally(input: RefereeInput): RefereeOutput {
    const { gameState, proposedMove } = input;
    const moveData = proposedMove.data as unknown as TicTacToeMove;
    const boardState = gameState.boardState as TicTacToeState;

    // Validate move coordinates
    if (typeof moveData.row !== 'number' || typeof moveData.col !== 'number') {
      return { isValid: false, error: 'Invalid move format: row and col must be numbers' };
    }

    if (moveData.row < 0 || moveData.row > 2 || moveData.col < 0 || moveData.col > 2) {
      return { isValid: false, error: 'Invalid move: row and col must be 0-2' };
    }

    // Check if cell is empty
    if (!isValidTicTacToeMove(boardState.board, moveData.row, moveData.col)) {
      return { isValid: false, error: 'Invalid move: cell is already occupied' };
    }

    // Apply the move
    const newBoard: TicTacToeBoard = boardState.board.map((row: TicTacToeSymbol[], rowIdx: number) =>
      row.map((cell: TicTacToeSymbol, colIdx: number) =>
        rowIdx === moveData.row && colIdx === moveData.col
          ? boardState.currentSymbol
          : cell
      )
    ) as TicTacToeBoard;

    const newBoardState: TicTacToeState = {
      board: newBoard,
      currentSymbol: boardState.currentSymbol === 'X' ? 'O' : 'X',
    };

    // Check for winner
    const winnerResult = checkTicTacToeWinner(newBoard);
    if (winnerResult) {
      const winnerId = gameState.players[gameState.currentPlayerIndex].id;
      return {
        isValid: true,
        newBoardState,
        gameResult: {
          outcome: 'win',
          winnerId,
          reason: `Player ${winnerId} wins with ${winnerResult.winner}!`,
        },
        nextPlayerIndex: gameState.currentPlayerIndex,
        reasoning: `Player placed ${boardState.currentSymbol} at (${moveData.row}, ${moveData.col}) and won!`,
      };
    }

    // Check for draw
    if (isTicTacToeBoardFull(newBoard)) {
      return {
        isValid: true,
        newBoardState,
        gameResult: {
          outcome: 'draw',
          reason: 'Board is full - game is a draw',
        },
        reasoning: 'Board is full with no winner - game ends in a draw',
      };
    }

    // Game continues
    return {
      isValid: true,
      newBoardState,
      nextPlayerIndex: (gameState.currentPlayerIndex + 1) % gameState.players.length,
      reasoning: `Player placed ${boardState.currentSymbol} at (${moveData.row}, ${moveData.col}). Game continues.`,
    };
  }

  /**
   * Evaluate move using AI agent (placeholder for future implementation)
   * This would send the game state and rules as a prompt to an AI
   */
  private evaluateMoveWithAgent(input: RefereeInput): RefereeOutput {
    // For now, fall back to local evaluation
    // In a full implementation, this would:
    // 1. Format the game state and rules as a prompt
    // 2. Send to an AI model for evaluation
    // 3. Parse the AI response into RefereeOutput
    
    console.log('[GameReferee] Agent-based evaluation not yet implemented, using local logic');
    return this.evaluateMoveLocally(input);
  }

  /**
   * Get the prompt for AI-based evaluation (for future use)
   */
  getEvaluationPrompt(input: RefereeInput): string {
    const { gameState, proposedMove, gameRules } = input;
    const boardState = gameState.boardState as TicTacToeState;
    const moveData = proposedMove.data as unknown as TicTacToeMove;

    return `
${gameRules}

Current Game State:
- Board:
  ${this.formatBoard(boardState.board)}
- Current player symbol: ${boardState.currentSymbol}
- Current player: ${gameState.players[gameState.currentPlayerIndex].name}

Proposed Move:
- Player: ${proposedMove.playerId}
- Position: row=${moveData.row}, col=${moveData.col}

Evaluate this move and respond with:
1. Is the move valid? (yes/no)
2. If valid, what is the new board state?
3. Is the game over? If yes, who won or is it a draw?
4. Brief reasoning for your decision.
`;
  }

  private formatBoard(board: TicTacToeBoard): string {
    return board.map((row: TicTacToeSymbol[], i: number) => 
      `  Row ${i}: [${row.map((cell: TicTacToeSymbol) => cell ?? '-').join(', ')}]`
    ).join('\n');
  }

  private emitEvent(event: RefereeGameEvent): void {
    this.events.push(event);
    this.onEventCallback?.(event);
  }

  /**
   * Get all events for this referee instance
   */
  getEvents(): RefereeGameEvent[] {
    return [...this.events];
  }

  /**
   * Clear events (e.g., after persisting to database)
   */
  clearEvents(): void {
    this.events = [];
  }
}

/**
 * Create a TicTacToe referee with default configuration
 */
export function createTicTacToeReferee(): GameReferee {
  return new GameReferee({
    gameType: 'tictactoe',
    gameRules: TICTACTOE_RULES,
    evaluator: 'local',
  });
}
