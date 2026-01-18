'use client';

import { SystemMetrics } from '../lib/types';

interface SystemPulseProps {
  metrics: SystemMetrics | null;
  isConnected: boolean;
}

export function SystemPulse({ metrics, isConnected }: SystemPulseProps) {
  const getHealthColor = () => {
    if (!metrics) return 'var(--color-amber)';
    if (metrics.systemLoad > 80) return 'var(--color-red)';
    if (metrics.systemLoad > 50) return 'var(--color-amber)';
    return 'var(--color-green)';
  };

  const getHealthStatus = () => {
    if (!metrics) return 'connecting';
    if (metrics.systemLoad > 80) return 'stressed';
    if (metrics.systemLoad > 50) return 'active';
    return 'healthy';
  };

  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 24px',
      background: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h1 style={{
          fontSize: '18px',
          fontWeight: 600,
          margin: 0,
          letterSpacing: '0.5px',
        }}>
          🐒 MONKEYTOWN
        </h1>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '4px 12px',
          background: 'var(--color-surface-light)',
          borderRadius: '9999px',
          fontSize: '12px',
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isConnected ? 'var(--color-green)' : 'var(--color-amber)',
            animation: 'pulse 1s ease-in-out infinite',
          }} />
          <span style={{ color: 'var(--color-text-muted)' }}>
            {isConnected ? 'connected' : 'connecting...'}
          </span>
        </div>
      </div>

      {metrics && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          fontSize: '13px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Agents</span>
            <span style={{
              color: 'var(--color-cyan)',
              fontWeight: 600,
              minWidth: '24px',
            }}>
              {metrics.activeAgents}
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Flows</span>
            <span style={{
              color: 'var(--color-purple)',
              fontWeight: 600,
              minWidth: '24px',
            }}>
              {metrics.pendingFlows}
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Settled</span>
            <span style={{
              color: 'var(--color-green)',
              fontWeight: 600,
              minWidth: '48px',
            }}>
              {metrics.contractsSettled.toLocaleString()}
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Load</span>
            <div style={{
              width: '60px',
              height: '6px',
              background: 'var(--color-surface-light)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div style={{
                width: `${metrics.systemLoad}%`,
                height: '100%',
                background: getHealthColor(),
                transition: 'width 0.3s ease',
              }} />
            </div>
            <span style={{
              color: getHealthColor(),
              fontWeight: 600,
              minWidth: '32px',
            }}>
              {metrics.systemLoad}%
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            background: `${getHealthColor()}15`,
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 500,
            color: getHealthColor(),
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            <span style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'currentColor',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            {getHealthStatus()}
          </div>
        </div>
      )}
    </header>
  );
}
