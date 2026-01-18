'use client';

import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AgentBadge } from '../agents';

// TicTacToe types
export type TicTacToeSymbol = 'X' | 'O' | null;
export type TicTacToeBoard = [
  [TicTacToeSymbol, TicTacToeSymbol, TicTacToeSymbol],
  [TicTacToeSymbol, TicTacToeSymbol, TicTacToeSymbol],
  [TicTacToeSymbol, TicTacToeSymbol, TicTacToeSymbol]
];

export interface TicTacToePlayer {
  id: string;
  name: string;
  type: 'human' | 'agent';
  agentType?: string;
  symbol: TicTacToeSymbol;
}

export interface TicTacToeGameState {
  gameId: string;
  phase: 'waiting' | 'in_progress' | 'finished';
  board: TicTacToeBoard;
  currentPlayerIndex: number;
  players: TicTacToePlayer[];
  winnerId?: string;
  winningLine?: number[][];
  isDraw?: boolean;
}

interface TicTacToeCanvasProps {
  gameState: TicTacToeGameState;
  currentPlayerId: string;
  onMove: (row: number, col: number) => void;
  onNewGame?: () => void;
  onForfeit?: () => void;
}

export function TicTacToeCanvas({
  gameState,
  currentPlayerId,
  onMove,
  onNewGame,
  onForfeit,
}: TicTacToeCanvasProps) {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  const isMyTurn = currentPlayer?.id === currentPlayerId && gameState.phase === 'in_progress';
  const myPlayer = gameState.players.find(p => p.id === currentPlayerId);
  const opponentPlayer = gameState.players.find(p => p.id !== currentPlayerId);

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-6)',
    padding: 'var(--space-6)',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '400px',
  };

  const playerInfoStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'var(--space-2)',
  };

  const statusStyles: CSSProperties = {
    textAlign: 'center',
    fontSize: 'var(--text-body-large)',
    fontWeight: 600,
    padding: 'var(--space-3)',
    borderRadius: 'var(--radius-md)',
    background: isMyTurn ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
    border: isMyTurn ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--color-border-subtle)',
  };

  const getStatusMessage = () => {
    if (gameState.phase === 'waiting') {
      return 'Waiting for opponent...';
    }
    if (gameState.phase === 'finished') {
      if (gameState.isDraw) {
        return "It's a draw! 🤝";
      }
      if (gameState.winnerId === currentPlayerId) {
        return 'You won! 🎉';
      }
      return 'You lost! 😔';
    }
    if (isMyTurn) {
      return `Your turn (${myPlayer?.symbol})`;
    }
    return `Waiting for ${currentPlayer?.name}...`;
  };

  return (
    <div style={containerStyles}>
      <div style={headerStyles}>
        <div style={playerInfoStyles}>
          <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
            You
          </span>
          <Badge variant={myPlayer?.symbol === currentPlayer?.symbol && gameState.phase === 'in_progress' ? 'success' : 'default'}>
            {myPlayer?.symbol || '?'} - {myPlayer?.name || 'Player'}
          </Badge>
        </div>

        <div style={{ fontSize: 'var(--text-h3)', fontWeight: 700 }}>VS</div>

        <div style={playerInfoStyles}>
          <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
            Opponent
          </span>
          {opponentPlayer?.type === 'agent' && opponentPlayer.agentType ? (
            <AgentBadge
              agent={opponentPlayer.agentType as any}
              status="online"
              size="md"
              showEmoji={true}
              showName={true}
            />
          ) : (
            <Badge variant={opponentPlayer?.symbol === currentPlayer?.symbol && gameState.phase === 'in_progress' ? 'success' : 'default'}>
              {opponentPlayer?.symbol || '?'} - {opponentPlayer?.name || 'Opponent'}
            </Badge>
          )}
        </div>
      </div>

      <div style={statusStyles}>
        {getStatusMessage()}
      </div>

      <TicTacToeBoard
        board={gameState.board}
        winningLine={gameState.winningLine}
        onCellClick={isMyTurn ? onMove : undefined}
        disabled={!isMyTurn || gameState.phase !== 'in_progress'}
      />

      <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
        {gameState.phase === 'finished' && onNewGame && (
          <Button variant="primary" onClick={onNewGame}>
            New Game
          </Button>
        )}
        {gameState.phase === 'in_progress' && onForfeit && (
          <Button variant="ghost" onClick={onForfeit}>
            Forfeit
          </Button>
        )}
      </div>
    </div>
  );
}

interface TicTacToeBoardProps {
  board: TicTacToeBoard;
  winningLine?: number[][];
  onCellClick?: (row: number, col: number) => void;
  disabled?: boolean;
}

function TicTacToeBoard({ board, winningLine, onCellClick, disabled }: TicTacToeBoardProps) {
  const boardStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    padding: '16px',
    background: 'var(--color-bg-elevated)',
    borderRadius: 'var(--radius-lg)',
    border: '2px solid var(--color-border-default)',
  };

  const isWinningCell = (row: number, col: number): boolean => {
    if (!winningLine) return false;
    return winningLine.some(([r, c]) => r === row && c === col);
  };

  return (
    <div style={boardStyles}>
      {board.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <TicTacToeCell
            key={`${rowIdx}-${colIdx}`}
            value={cell}
            isWinning={isWinningCell(rowIdx, colIdx)}
            onClick={() => onCellClick?.(rowIdx, colIdx)}
            disabled={disabled || cell !== null}
          />
        ))
      )}
    </div>
  );
}

interface TicTacToeCellProps {
  value: TicTacToeSymbol;
  isWinning?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function TicTacToeCell({ value, isWinning, onClick, disabled }: TicTacToeCellProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cellStyles: CSSProperties = {
    width: '100px',
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: 700,
    fontFamily: 'var(--font-mono)',
    background: isWinning
      ? 'rgba(16, 185, 129, 0.2)'
      : isHovered && !disabled
      ? 'var(--color-bg-surface)'
      : 'var(--color-bg-primary)',
    border: isWinning
      ? '3px solid var(--color-success)'
      : '2px solid var(--color-border-subtle)',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'default' : 'pointer',
    transition: 'all var(--duration-fast) var(--ease-out)',
    color: value === 'X' ? 'var(--color-primary)' : value === 'O' ? 'var(--color-info)' : 'transparent',
  };

  return (
    <button
      style={cellStyles}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {value || (isHovered && !disabled ? '•' : '')}
    </button>
  );
}

// Helper function to create an empty board - defined outside hook to avoid initialization issues
function createEmptyBoard(): TicTacToeBoard {
  return [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
}

// Helper function to create initial game state
function createInitialGameState(playerId: string): TicTacToeGameState {
  return {
    gameId: `game-${Date.now()}`,
    phase: 'waiting',
    board: createEmptyBoard(),
    currentPlayerIndex: 0,
    players: [
      { id: playerId, name: 'You', type: 'human', symbol: 'X' },
      { id: 'ai-opponent', name: 'AI Opponent', type: 'agent', agentType: 'strategist', symbol: 'O' },
    ],
  };
}

// Hook for managing TicTacToe game state
export function useTicTacToe(initialPlayerId: string = 'player-1') {
  const [gameState, setGameState] = useState<TicTacToeGameState>(createInitialGameState(initialPlayerId));

  const checkWinner = (board: TicTacToeBoard): { winner: TicTacToeSymbol; line?: number[][] } | null => {
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
  };

  const isBoardFull = (board: TicTacToeBoard): boolean => {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          return false;
        }
      }
    }
    return true;
  };

  const getAIMove = (board: TicTacToeBoard): { row: number; col: number } | null => {
    // Simple AI: first try to win, then block, then take center, then corners, then any
    const emptyCells: { row: number; col: number }[] = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          emptyCells.push({ row, col });
        }
      }
    }

    if (emptyCells.length === 0) return null;

    // Try center
    if (board[1][1] === null) {
      return { row: 1, col: 1 };
    }

    // Try corners
    const corners = [{ row: 0, col: 0 }, { row: 0, col: 2 }, { row: 2, col: 0 }, { row: 2, col: 2 }];
    const availableCorners = corners.filter(c => board[c.row][c.col] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Random available cell
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  const makeMove = useCallback((row: number, col: number) => {
    setGameState(prev => {
      if (prev.phase !== 'in_progress' || prev.board[row][col] !== null) {
        return prev;
      }

      const currentPlayer = prev.players[prev.currentPlayerIndex];
      const newBoard = prev.board.map((r, rowIdx) =>
        r.map((cell, colIdx) =>
          rowIdx === row && colIdx === col ? currentPlayer.symbol : cell
        )
      ) as TicTacToeBoard;

      // Check for winner
      const winnerResult = checkWinner(newBoard);
      if (winnerResult) {
        return {
          ...prev,
          board: newBoard,
          phase: 'finished',
          winnerId: currentPlayer.id,
          winningLine: winnerResult.line,
        };
      }

      // Check for draw
      if (isBoardFull(newBoard)) {
        return {
          ...prev,
          board: newBoard,
          phase: 'finished',
          isDraw: true,
        };
      }

      // Switch to next player
      return {
        ...prev,
        board: newBoard,
        currentPlayerIndex: (prev.currentPlayerIndex + 1) % 2,
      };
    });
  }, []);

  // AI move effect
  useEffect(() => {
    if (gameState.phase !== 'in_progress') return;
    
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (currentPlayer.type !== 'agent') return;

    const timeout = setTimeout(() => {
      const move = getAIMove(gameState.board);
      if (move) {
        makeMove(move.row, move.col);
      }
    }, 500 + Math.random() * 1000);

    return () => clearTimeout(timeout);
  }, [gameState.board, gameState.currentPlayerIndex, gameState.phase, gameState.players, makeMove]);

  const startGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: 'in_progress',
    }));
  }, []);

  const newGame = useCallback(() => {
    setGameState(createInitialGameState(initialPlayerId));
  }, [initialPlayerId]);

  const forfeit = useCallback(() => {
    setGameState(prev => {
      const winnerId = prev.players.find(p => p.id !== initialPlayerId)?.id;
      return {
        ...prev,
        phase: 'finished',
        winnerId,
      };
    });
  }, [initialPlayerId]);

  return {
    gameState,
    makeMove,
    startGame,
    newGame,
    forfeit,
    isMyTurn: gameState.players[gameState.currentPlayerIndex]?.id === initialPlayerId && gameState.phase === 'in_progress',
  };
}

// Demo component
export function TicTacToeDemo() {
  const playerId = 'player-1';
  const { gameState, makeMove, startGame, newGame, forfeit } = useTicTacToe(playerId);

  useEffect(() => {
    // Auto-start the game
    if (gameState.phase === 'waiting') {
      startGame();
    }
  }, [gameState.phase, startGame]);

  return (
    <Card variant="elevated" padding="lg">
      <h2 style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: 'var(--text-h2)', 
        fontWeight: 600, 
        textAlign: 'center',
        marginBottom: 'var(--space-4)',
      }}>
        ❌ TicTacToe ⭕
      </h2>
      <TicTacToeCanvas
        gameState={gameState}
        currentPlayerId={playerId}
        onMove={makeMove}
        onNewGame={newGame}
        onForfeit={forfeit}
      />
    </Card>
  );
}
