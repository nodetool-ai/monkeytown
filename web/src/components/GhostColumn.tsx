'use client';

import { GhostItem } from '../lib/types';

interface GhostColumnProps {
  items: GhostItem[];
}

export function GhostColumn({ items }: GhostColumnProps) {
  return (
    <aside style={{
      width: '260px',
      height: '100%',
      background: 'var(--color-surface)',
      borderLeft: '1px solid var(--color-border)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      <div style={{
        padding: '16px',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <h2 style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          margin: 0,
        }}>
          History
        </h2>
        <span style={{
          fontSize: '11px',
          color: 'var(--color-text-muted)',
          opacity: 0.7,
        }}>
          {items.length} events
        </span>
      </div>

      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: '8px',
      }}>
        {items.length === 0 ? (
          <div style={{
            padding: '24px',
            textAlign: 'center',
            color: 'var(--color-text-muted)',
            fontSize: '12px',
          }}>
            No history yet
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={item.id}
              className="animate-slideIn"
              style={{
                padding: '10px 12px',
                marginBottom: '4px',
                background: 'var(--color-surface-light)',
                borderRadius: '8px',
                borderLeft: '3px solid var(--color-cyan)',
                opacity: Math.max(0.1, item.opacity),
                transition: 'opacity 0.3s ease',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '4px',
              }}>
                <span style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontSize: '9px',
                  padding: '2px 6px',
                  borderRadius: '9999px',
                  background: 'var(--color-cyan)20',
                  color: 'var(--color-cyan)',
                  textTransform: 'uppercase',
                }}>
                  {item.action}
                </span>
              </div>
              <div style={{
                fontSize: '10px',
                color: 'var(--color-text-muted)',
              }}>
                {new Date(item.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>

      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--color-border)',
        fontSize: '10px',
        color: 'var(--color-text-muted)',
        textAlign: 'center',
      }}>
        Fading over time • Max 50 items
      </div>
    </aside>
  );
}
