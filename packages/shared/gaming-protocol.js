/**
 * Gaming Protocol - Core definitions for agent-based game refereeing
 *
 * This module defines the protocol for player interactions in games,
 * where a referee (can be an AI agent) evaluates moves using prompts.
 */
/**
 * Create an empty TicTacToe board
 */
export function createEmptyTicTacToeBoard() {
    return [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
}
/**
 * Check if a TicTacToe board position is valid
 */
export function isValidTicTacToeMove(board, row, col) {
    if (row < 0 || row > 2 || col < 0 || col > 2) {
        return false;
    }
    return board[row][col] === null;
}
/**
 * Check for a winner in TicTacToe
 */
export function checkTicTacToeWinner(board) {
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
export function isTicTacToeBoardFull(board) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row][col] === null) {
                return false;
            }
        }
    }
    return true;
}
//# sourceMappingURL=gaming-protocol.js.map