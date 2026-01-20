'use client';

import React, { CSSProperties, useState, useEffect } from 'react';
import { Badge } from '../ui/Badge';

interface TurnTimerProps {
  durationSeconds: number;
  startTime: number;
  isActive: boolean;
  isOwnTurn: boolean;
  onTimeout?: () => void;
  showLabels?: boolean;
  compact?: boolean;
}

export function TurnTimer({
  durationSeconds,
  startTime,
  isActive,
  isOwnTurn,
  onTimeout,
  showLabels = true,
  compact = false,
}: TurnTimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds);
  const [isUrgent, setIsUrgent] = useState(false);
  const [isWarning, setIsWarning] = useState(false);

  useEffect(() => {
    if (!isActive) {
      setRemaining(durationSeconds);
      setIsUrgent(false);
      setIsWarning(false);
      return;
    }

    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const newRemaining = Math.max(0, durationSeconds - elapsed);
      setRemaining(newRemaining);

      setIsWarning(newRemaining <= 15 && newRemaining > 10);
      setIsUrgent(newRemaining <= 10);

      if (newRemaining <= 0 && onTimeout) {
        onTimeout();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 100);

    return () => clearInterval(interval);
  }, [startTime, durationSeconds, isActive, onTimeout]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  const progress = Math.max(0, (remaining / durationSeconds) * 100);

  const containerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-3)',
  };

  const timerStyles: CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: compact ? 'var(--text-h3)' : 'var(--text-h2)',
    fontWeight: 700,
    color: isUrgent
      ? 'var(--color-error)'
      : isWarning
      ? 'var(--color-warning)'
      : isOwnTurn
      ? 'var(--color-primary)'
      : 'var(--color-text-primary)',
    transition: 'color var(--duration-fast) var(--ease-out)',
    minWidth: compact ? '50px' : '70px',
    textAlign: 'center',
  };

  const progressBarStyles: CSSProperties = {
    width: compact ? '60px' : '100px',
    height: compact ? '6px' : '8px',
    background: 'var(--color-bg-elevated)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
  };

  const progressFillStyles: CSSProperties = {
    height: '100%',
    width: `${progress}%`,
    background: isUrgent
      ? 'var(--color-error)'
      : isWarning
      ? 'var(--color-warning)'
      : 'var(--color-primary)',
    borderRadius: 'var(--radius-full)',
    transition: 'width 100ms linear, background var(--duration-fast) var(--ease-out)',
  };

  const statusStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--space-1)',
  };

  const pulseAnimation = isUrgent
    ? 'pulse 0.5s infinite'
    : isWarning
    ? 'pulse 1s infinite'
    : 'none';

  return (
    <div style={containerStyles}>
      {showLabels && (
        <div style={statusStyles}>
          {isOwnTurn ? (
            <Badge variant="success" size="sm">Your Turn</Badge>
          ) : (
            <Badge variant="default" size="sm">Waiting</Badge>
          )}
        </div>
      )}

      <div style={{ ...timerStyles, animation: pulseAnimation }}>
        {minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : seconds}
      </div>

      <div style={progressBarStyles}>
        <div style={progressFillStyles} />
      </div>
    </div>
  );
}

interface TurnTimerDisplayProps {
  currentPlayerId: string;
  currentTurnPlayerId: string;
  turnDurationSeconds: number;
  turnStartTime: number;
  turnTimerActive: boolean;
  playerId: string;
  compact?: boolean;
}

export function TurnTimerDisplay({
  currentPlayerId,
  currentTurnPlayerId,
  turnDurationSeconds,
  turnStartTime,
  turnTimerActive,
  compact = false,
}: TurnTimerDisplayProps) {
  const isOwnTurn = currentPlayerId === currentTurnPlayerId;

  return (
    <TurnTimer
      durationSeconds={turnDurationSeconds}
      startTime={turnStartTime}
      isActive={turnTimerActive}
      isOwnTurn={isOwnTurn}
      compact={compact}
    />
  );
}

export function useTurnTimer(
  turnDurationSeconds: number,
  turnStartTime: number,
  turnTimerActive: boolean,
  gameStatus: string
) {
  const [remaining, setRemaining] = useState(turnDurationSeconds);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (!turnTimerActive || gameStatus !== 'live') {
      setRemaining(turnDurationSeconds);
      setIsUrgent(false);
      return;
    }

    const updateTimer = () => {
      const elapsed = Math.floor((Date.now() - turnStartTime) / 1000);
      const newRemaining = Math.max(0, turnDurationSeconds - elapsed);
      setRemaining(newRemaining);
      setIsUrgent(newRemaining <= 10);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 100);

    return () => clearInterval(interval);
  }, [turnStartTime, turnDurationSeconds, turnTimerActive, gameStatus]);

  const progress = (remaining / turnDurationSeconds) * 100;
  const formattedTime = remaining < 60
    ? `${remaining}s`
    : `${Math.floor(remaining / 60)}:${(remaining % 60).toString().padStart(2, '0')}`;

  return {
    remaining,
    formattedTime,
    progress,
    isUrgent,
    isActive: turnTimerActive && gameStatus === 'live',
  };
}
