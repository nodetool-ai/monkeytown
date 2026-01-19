/**
 * Gaming Protocol - Core definitions for agent-based game refereeing
 * 
 * This module defines the protocol for player interactions in games,
 * where a referee (can be an AI agent) evaluates moves using prompts.
 * 
 * ARCHITECTURE NOTE: This is the SOURCE OF TRUTH for gaming protocol types.
 * 
 * Due to TypeScript's rootDir constraints in the monorepo, these types are
 * also duplicated in server/src/game/types.ts. If you modify types here,
 * you MUST also update that file to maintain consistency.
 * 
 * Files that should be synchronized:
 * - packages/shared/gaming-protocol.ts (this file - canonical source)
 * - server/src/game/types.ts (server copy)
 * - server/src/game/referee.ts (utility functions)
 * 
 * TODO: Consider implementing TypeScript project references to eliminate
 * this duplication. See docs/architecture.md for migration guide.
 */

/**
 * Player types - either human or AI agent
 */
export type PlayerKind = 'human' | 'agent';

/**
 * Game status
 */
export type GamePhase = 'waiting' | 'in_progress' | 'finished';

/**
 * Result of a game
 */
export type GameResult = 'win' | 'lose' | 'draw' | 'ongoing';

/**
 * A player in the gaming protocol
 */
export interface ProtocolPlayer {
  id: string;
  name: string;
  kind: PlayerKind;
  agentId?: string; // Reference to agent in database
}

/**
 * A move in the game - generic to support any game type
 */
export interface GameMove {
  playerId: string;
  timestamp: number;
  data: Record<string, unknown>;
}

/**
 * Game state - generic structure that works for any game
 */
export interface ProtocolGameState {
  gameId: string;
  gameType: string;
  phase: GamePhase;
  players: ProtocolPlayer[];
  currentPlayerIndex: number;
  moveHistory: GameMove[];
  boardState: unknown; // Game-specific board representation
  result?: {
    outcome: GameResult;
    winnerId?: string;
    reason?: string;
  };
  createdAt: number;
  updatedAt: number;
}

/**
 * Input to the referee for evaluation
 */
export interface RefereeInput {
  gameState: ProtocolGameState;
  proposedMove: GameMove;
  gameRules: string; // Prompt describing the game rules
}

/**
 * Output from the referee evaluation
 */
export interface RefereeOutput {
  isValid: boolean;
  newBoardState?: unknown;
  gameResult?: {
    outcome: GameResult;
    winnerId?: string;
    reason?: string;
  };
  nextPlayerIndex?: number;
  reasoning?: string;
  error?: string;
}

/**
 * Configuration for the game referee
 */
export interface RefereeConfig {
  gameType: string;
  gameRules: string;
  evaluator: 'local' | 'agent'; // local = built-in logic, agent = AI prompt-based
  agentPrompt?: string; // Prompt template for AI-based evaluation
}

/**
 * Event types for game events that will be persisted
 */
export type GameEventType = 
  | 'game_created'
  | 'player_joined'
  | 'player_left'
  | 'game_started'
  | 'move_made'
  | 'move_rejected'
  | 'game_finished'
  | 'chat_message';

/**
 * A game event that can be persisted to the database
 */
export interface GameEvent {
  id: string;
  gameId: string;
  type: GameEventType;
  playerId?: string;
  data: Record<string, unknown>;
  timestamp: number;
}

/**
 * TicTacToe specific types
 */
export type TicTacToeSymbol = 'X' | 'O' | null;
export type TicTacToeBoard = [
  [TicTacToeSymbol, TicTacToeSymbol, TicTacToeSymbol],
  [TicTacToeSymbol, TicTacToeSymbol, TicTacToeSymbol],
  [TicTacToeSymbol, TicTacToeSymbol, TicTacToeSymbol]
];

export interface TicTacToeMove {
  row: number;
  col: number;
}

export interface TicTacToeState {
  board: TicTacToeBoard;
  currentSymbol: TicTacToeSymbol;
}

/**
 * Create an empty TicTacToe board
 */
export function createEmptyTicTacToeBoard(): TicTacToeBoard {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

/**
 * Check if a TicTacToe board position is valid
 */
export function isValidTicTacToeMove(board: TicTacToeBoard, row: number, col: number): boolean {
  if (row < 0 || row > 2 || col < 0 || col > 2) {
    return false;
  }
  return board[row][col] === null;
}

/**
 * Check for a winner in TicTacToe
 */
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

/**
 * Check if the board is full (draw condition)
 */
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
