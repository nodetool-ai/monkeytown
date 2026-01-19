'use client';

import { useState, useCallback, useEffect } from 'react';
import type { TrustBudgetState, TrustEventType } from '@monkeytown/packages/shared';
import { getTrustStateColor, getTrustStateLabel } from '@monkeytown/packages/shared';

export function useTrustBudget(playerId: string) {
  const [trustState, setTrustState] = useState<TrustBudgetState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrustBudget = useCallback(async () => {
    try {
      const response = await fetch(`/api/trust/${playerId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch trust budget');
      }
      const data = await response.json();
      setTrustState(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [playerId]);

  const recordTrustEvent = useCallback(async (eventType: TrustEventType, agentId?: string) => {
    try {
      const response = await fetch('/api/trust/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ playerId, eventType, agentId }),
      });
      if (!response.ok) {
        throw new Error('Failed to record trust event');
      }
      const newState = await response.json();
      setTrustState(newState);
      return newState;
    } catch (err) {
      console.error('Failed to record trust event:', err);
      throw err;
    }
  }, [playerId]);

  useEffect(() => {
    fetchTrustBudget();
  }, [fetchTrustBudget]);

  return {
    trustState,
    loading,
    error,
    recordTrustEvent,
    refresh: fetchTrustBudget,
  };
}
