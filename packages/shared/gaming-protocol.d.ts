/**
 * Gaming Protocol - Core definitions for agent-based game refereeing
 *
 * This module defines the protocol for player interactions in games,
 * where a referee (can be an AI agent) evaluates moves using prompts.
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
    agentId?: string;
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
    boardState: unknown;
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
    gameRules: string;
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
    evaluator: 'local' | 'agent';
    agentPrompt?: string;
}
/**
 * Event types for game events that will be persisted
 */
export type GameEventType = 'game_created' | 'player_joined' | 'player_left' | 'game_started' | 'move_made' | 'move_rejected' | 'game_finished' | 'chat_message';
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
    [
        TicTacToeSymbol,
        TicTacToeSymbol,
        TicTacToeSymbol
    ],
    [
        TicTacToeSymbol,
        TicTacToeSymbol,
        TicTacToeSymbol
    ],
    [
        TicTacToeSymbol,
        TicTacToeSymbol,
        TicTacToeSymbol
    ]
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
export declare function createEmptyTicTacToeBoard(): TicTacToeBoard;
/**
 * Check if a TicTacToe board position is valid
 */
export declare function isValidTicTacToeMove(board: TicTacToeBoard, row: number, col: number): boolean;
/**
 * Check for a winner in TicTacToe
 */
export declare function checkTicTacToeWinner(board: TicTacToeBoard): {
    winner: TicTacToeSymbol;
    line?: number[][];
} | null;
/**
 * Check if the board is full (draw condition)
 */
export declare function isTicTacToeBoardFull(board: TicTacToeBoard): boolean;
//# sourceMappingURL=gaming-protocol.d.ts.map