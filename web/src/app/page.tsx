'use client';

import { useState } from 'react';
import { useStream } from '../hooks/useStream';
import { SystemPulse } from '../components/SystemPulse';
import { TerrariumView } from '../components/TerrariumView';
import { GhostColumn } from '../components/GhostColumn';

export default function Home() {
  const [demo, setDemo] = useState(false);
  const { entities, flows, metrics, ghostItems, isConnected } = useStream({
    url: 'ws://localhost:3001',
    onConnect: () => console.log('Connected to Monkeytown'),
    onDisconnect: () => console.log('Disconnected from Monkeytown'),
    demo,
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
    }}>
      <SystemPulse metrics={metrics || (demo ? {
        activeAgents: entities.length,
        pendingFlows: flows.length,
        contractsSettled: 1847,
        systemLoad: 34,
      } : null)} isConnected={isConnected} />

      <div style={{
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
      }}>
        <TerrariumView
          entities={entities}
          flows={flows}
        />

        <GhostColumn items={ghostItems} />
      </div>

      <button
        onClick={() => setDemo(!demo)}
        style={{
          position: 'fixed',
          bottom: '16px',
          right: '290px',
          padding: '8px 16px',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '6px',
          color: 'var(--color-text)',
          fontSize: '11px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        {demo ? 'Exit Demo' : 'Demo Mode'}
      </button>
    </div>
  );
}
