'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { Entity, Flow } from '../lib/types';
import { AgentCard } from './AgentCard';
import { FlowStream } from './FlowStream';

interface TerrariumViewProps {
  entities: Entity[];
  flows: Flow[];
  onEntityClick?: (entity: Entity) => void;
}

interface EntityPosition {
  entity: Entity;
  x: number;
  y: number;
}

export function TerrariumView({ entities, flows, onEntityClick }: TerrariumViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

  const positions = useMemo((): Map<string, EntityPosition> => {
    const pos = new Map<string, EntityPosition>();
    const count = entities.length;
    if (count === 0) return pos;

    const padding = 40;
    const cardWidth = 240;
    const cardHeight = 160;
    const gap = 40;

    const containerWidth = dimensions.width - padding * 2 - cardWidth;
    const containerHeight = dimensions.height - padding * 2 - cardHeight;

    entities.forEach((entity, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;

      const x = padding + col * (cardWidth + gap) + (containerWidth % (cardWidth + gap)) / 2;
      const y = padding + row * (cardHeight + gap) + (containerHeight % (cardHeight + gap)) / 2;

      pos.set(entity.id, { entity, x, y });
    });

    return pos;
  }, [entities, dimensions]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const getEntityPosition = (entityId: string) => {
    const pos = positions.get(entityId);
    if (pos) return { x: pos.x + 110, y: pos.y + 40 };
    return { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--color-background)',
      }}
    >
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <radialGradient id="glow-green" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-green)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-green)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="glow-amber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-amber)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-amber)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {flows.map((flow) => {
          const sourcePos = getEntityPosition(flow.sourceId);
          const targetPos = getEntityPosition(flow.targetId);
          if (sourcePos.x === 0 && sourcePos.y === 0) return null;
          return (
            <FlowStream
              key={flow.id}
              flow={flow}
              sourcePosition={sourcePos}
              targetPosition={targetPos}
            />
          );
        })}
      </svg>

      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          pointerEvents: 'auto',
        }}
      >
        {entities.map((entity) => {
          const pos = positions.get(entity.id);
          if (!pos) return null;
          return (
            <div
              key={entity.id}
              style={{
                transform: selectedEntityId === entity.id ? 'scale(1.02)' : 'scale(1)',
                transition: 'transform 0.2s ease',
              }}
            >
              <AgentCard
                entity={entity}
                onClick={(e) => {
                  setSelectedEntityId(selectedEntityId === e.id ? null : e.id);
                  onEntityClick?.(e);
                }}
              />
            </div>
          );
        })}
      </div>

      {entities.length === 0 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'var(--color-text-muted)',
          }}
        >
          <div
            style={{
              fontSize: '48px',
              marginBottom: '16px',
              opacity: 0.5,
            }}
          >
            🐒
          </div>
          <div style={{ fontSize: '14px' }}>Waiting for agents...</div>
          <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
            Start the server to see the simulation
          </div>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '16px',
          padding: '8px 12px',
          background: 'var(--color-surface)',
          borderRadius: '6px',
          fontSize: '10px',
          color: 'var(--color-text-muted)',
          pointerEvents: 'none',
        }}
      >
        {entities.length} entities • {flows.length} active flows
      </div>
    </div>
  );
}
