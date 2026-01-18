'use client';

import { Entity } from '../lib/types';

interface AgentCardProps {
  entity: Entity;
  onClick?: (entity: Entity) => void;
}

const STATUS_CONFIG: Record<string, { color: string; bgColor: string; animation: string }> = {
  idle: {
    color: 'var(--color-cyan)',
    bgColor: 'var(--color-surface-light)',
    animation: 'breathe 3s ease-in-out infinite',
  },
  active: {
    color: 'var(--color-green)',
    bgColor: '#1a3a2f',
    animation: 'pulse 2s ease-in-out infinite',
  },
  processing: {
    color: 'var(--color-amber)',
    bgColor: '#3d2a0a',
    animation: 'pulse 1s ease-in-out infinite',
  },
  complete: {
    color: 'var(--color-green)',
    bgColor: 'var(--color-surface-light)',
    animation: 'breathe 4s ease-in-out infinite',
  },
  error: {
    color: 'var(--color-red)',
    bgColor: '#3d0a0a',
    animation: 'pulse 0.5s ease-in-out infinite',
  },
};

export function AgentCard({ entity, onClick }: AgentCardProps) {
  const config = STATUS_CONFIG[entity.status] || STATUS_CONFIG.idle;
  const metrics = entity.metrics || { efficiency: 0, load: 0, connections: 0 };

  return (
    <div
      onClick={() => onClick?.(entity)}
      style={{
        padding: '16px',
        background: config.bgColor,
        border: `1px solid ${config.color}40`,
        borderRadius: '12px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        animation: config.animation,
        minWidth: '220px',
        maxWidth: '280px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = `0 8px 24px ${config.color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
      }}>
        <span style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text)',
        }}>
          {entity.label}
        </span>
        <span style={{
          fontSize: '10px',
          padding: '3px 8px',
          borderRadius: '9999px',
          background: `${config.color}20`,
          color: config.color,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 500,
        }}>
          {entity.status}
        </span>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', width: '48px' }}>
            EFFICIENCY
          </span>
          <div style={{
            flex: 1,
            height: '4px',
            background: 'var(--color-surface)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${metrics.efficiency}%`,
              height: '100%',
              background: config.color,
              transition: 'width 0.3s ease',
            }} />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text)', minWidth: '32px', textAlign: 'right' }}>
            {metrics.efficiency}%
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', width: '48px' }}>
            LOAD
          </span>
          <div style={{
            flex: 1,
            height: '4px',
            background: 'var(--color-surface)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${metrics.load}%`,
              height: '100%',
              background: metrics.load > 80 ? 'var(--color-red)' : config.color,
              transition: 'width 0.3s ease',
            }} />
          </div>
          <span style={{ fontSize: '11px', color: 'var(--color-text)', minWidth: '32px', textAlign: 'right' }}>
            {metrics.load}%
          </span>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', width: '48px' }}>
            CONNECTIONS
          </span>
          <span style={{ fontSize: '12px', color: 'var(--color-purple)' }}>
            {'●'.repeat(Math.min(metrics.connections, 6))}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>
            {metrics.connections}
          </span>
        </div>
      </div>

      <div style={{
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10px',
        color: 'var(--color-text-muted)',
      }}>
        <span>ID: {entity.id?.slice(-8) ?? 'unknown'}</span>
        <span>{new Date(entity.timestamp).toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
