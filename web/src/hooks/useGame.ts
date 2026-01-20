import { useState, useEffect, useCallback, useRef } from 'react';
import type { GameState, ChatMessage, AgentType, GameStatus } from '@monkeytown/packages/shared/game-types';

export interface BabelCard {
  id: string;
  value: number;
  suit?: 'stone' | 'brick' | 'wood' | 'glass';
}

export interface BabelPlayerState {
  playerId: string;
  hand: BabelCard[];
  score: number;
  towerHeight: number;
  cardsPlayed: number;
}

export interface BabelAction {
  type: 'play_card' | 'pass' | 'special_babel_tower';
  cardId?: string;
  targetPlayerId?: string;
}

interface TurnTimerData {
  turnStartTime: number;
  turnDurationSeconds: number;
  turnTimerActive: boolean;
}

function isBabelGameState(state: unknown): state is GameState & { turnStartTime: number; turnDurationSeconds: number; turnTimerActive: boolean; playerStates: Map<string, BabelPlayerState> } {
  return typeof state === 'object' && state !== null &&
    'turnStartTime' in state &&
    'turnDurationSeconds' in state &&
    'turnTimerActive' in state;
}

export function useGameSocket(gameId: string, playerId: string) {
  const [isConnected, setIsConnected] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [turnTimer, setTurnTimer] = useState<TurnTimerData | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number>();

  const connect = useCallback(() => {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}`;

    try {
      socketRef.current = new WebSocket(`${wsUrl}/ws?playerId=${playerId}&gameId=${gameId}`);

      socketRef.current.onopen = () => {
        setIsConnected(true);
        setError(null);
      };

      socketRef.current.onclose = () => {
        setIsConnected(false);
        reconnectTimeoutRef.current = window.setTimeout(() => {
          connect();
        }, 3000);
      };

      socketRef.current.onerror = (event) => {
        console.error('WebSocket error:', event);
        setError('Connection error');
      };

      socketRef.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          switch (data.type) {
            case 'game:state':
              if (isBabelGameState(data.state)) {
                setGameState(data.state);
                setTurnTimer({
                  turnStartTime: data.state.turnStartTime,
                  turnDurationSeconds: data.state.turnDurationSeconds,
                  turnTimerActive: data.state.turnTimerActive,
                });
              } else {
                setGameState(data.state);
              }
              break;
            case 'game:event':
              if (data.event.type === 'card_played' || data.event.type === 'special_action') {
                setGameState((prev) => prev ? { ...prev, ...data.result } : null);
              }
              break;
            case 'game:chat':
              setChatMessages((prev) => [...prev, data.message]);
              break;
            case 'game:error':
              setError(data.message);
              break;
          }
        } catch (e) {
          console.error('Failed to parse message:', e);
        }
      };
    } catch (e) {
      setError('Failed to connect');
    }
  }, [gameId, playerId]);

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connect]);

  const sendAction = useCallback((action: BabelAction) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'game:action',
        gameId,
        action,
      }));
    }
  }, [gameId]);

  const sendChatMessage = useCallback((content: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({
        type: 'game:chat',
        gameId,
        message: content,
      }));
    }
  }, [gameId]);

  return {
    isConnected,
    gameState,
    chatMessages,
    error,
    turnTimer,
    sendAction,
    sendChatMessage,
  };
}

export function useGameActions(gameState: GameState | null, sendAction: (action: BabelAction) => void, currentPlayerId: string) {
  const isMyTurn = gameState?.status === 'live' &&
    gameState.currentPlayerId === currentPlayerId;

  const playCard = useCallback((cardId: string) => {
    if (!isMyTurn) return;
    sendAction({ type: 'play_card', cardId });
  }, [isMyTurn, sendAction]);

  const passTurn = useCallback(() => {
    if (!isMyTurn) return;
    sendAction({ type: 'pass' });
  }, [isMyTurn, sendAction]);

  const playSpecialAction = useCallback((cardId: string, targetPlayerId?: string) => {
    if (!isMyTurn) return;
    sendAction({ type: 'special_babel_tower', cardId, targetPlayerId });
  }, [isMyTurn, sendAction]);

  return {
    isMyTurn,
    playCard,
    passTurn,
    playSpecialAction,
  };
}

export function useGameStats(gameState: GameState | null, playerId: string) {
  const [stats, setStats] = useState({
    myScore: 0,
    myTowerHeight: 0,
    myCardsPlayed: 0,
    opponentCount: 0,
    myRank: 0,
    totalPlayers: 0,
  });

  useEffect(() => {
    if (!gameState) {
      setStats({
        myScore: 0,
        myTowerHeight: 0,
        myCardsPlayed: 0,
        opponentCount: 0,
        myRank: 0,
        totalPlayers: 0,
      });
      return;
    }

    const players = gameState.players || [];
    const aiPlayers = players.filter((p) => p.type === 'agent');

    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const myIndex = sortedPlayers.findIndex((p) => p.id === playerId);

    setStats({
      myScore: gameState.players.find((p) => p.id === playerId)?.score || 0,
      myTowerHeight: 0,
      myCardsPlayed: 0,
      opponentCount: aiPlayers.length,
      myRank: myIndex + 1,
      totalPlayers: players.length,
    });
  }, [gameState, playerId]);

  return stats;
}

export function useTurnTimer(turnTimer: TurnTimerData | null, gameStatus: GameStatus | undefined) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!turnTimer || !turnTimer.turnTimerActive || gameStatus !== 'live') {
      setRemaining(0);
      return;
    }

    const updateTimer = () => {
      const elapsed = Date.now() - turnTimer.turnStartTime;
      const remainingSeconds = Math.max(0, turnTimer.turnDurationSeconds - Math.floor(elapsed / 1000));
      setRemaining(remainingSeconds);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [turnTimer, gameStatus]);

  return remaining;
}

export function useAIIndicator(gameState: GameState | null) {
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [thinkingAgent, setThinkingAgent] = useState<AgentType | null>(null);

  useEffect(() => {
    if (!gameState || gameState.status !== 'live') {
      setIsAIThinking(false);
      setThinkingAgent(null);
      return;
    }

    const currentPlayer = gameState.players.find((p) => p.id === gameState.currentPlayerId);
    if (currentPlayer && currentPlayer.type === 'agent' && currentPlayer.agentType) {
      setIsAIThinking(true);
      setThinkingAgent(currentPlayer.agentType);
    } else {
      setIsAIThinking(false);
      setThinkingAgent(null);
    }
  }, [gameState]);

  return { isAIThinking, thinkingAgent };
}
