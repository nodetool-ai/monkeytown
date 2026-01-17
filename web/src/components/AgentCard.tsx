import { useEffect, useRef } from 'react';
import { COLORS, ANIMATION } from '@monkeytown/shared/constants';
import { Entity, STATUS_CONFIG } from '@monkeytown/shared/types';
import './AgentCard.css';

interface AgentCardProps {
  entity: Entity;
  isFocused?: boolean;
  onClick?: (entity: Entity) => void;
}

export function AgentCard({ entity, isFocused, onClick }: AgentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const statusColor = COLORS[STATUS_CONFIG[entity.status]];

  useEffect(() => {
    if (entity.status === 'idle' && cardRef.current) {
      const card = cardRef.current;
      card.style.animation = `breathe ${ANIMATION.breatheDuration}ms ease-in-out infinite`;
    }
  }, [entity.status]);

  const handleClick = () => {
    onClick?.(entity);
  };

  return (
    <div
      ref={cardRef}
      className={`agent-card ${entity.status} ${isFocused ? 'focused' : ''}`}
      style={{ '--status-color': statusColor } as React.CSSProperties}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="card-header">
        <span className="card-type">{entity.type}</span>
        <span className="card-status">{entity.status}</span>
      </div>

      <div className="card-body">
        <h3 className="card-label">{entity.label}</h3>
      </div>

      <div className="card-metrics">
        <MetricItem label="eff" value={`${entity.metrics.efficiency}%`} />
        <MetricItem label="load" value={`${entity.metrics.load}%`} />
        <MetricItem label="conn" value={entity.metrics.connections} />
      </div>

      {entity.status === 'processing' && (
        <div className="card-thought">
          <div className="thought-bubble" />
        </div>
      )}

      {entity.status === 'error' && (
        <div className="card-error-indicator">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>
      )}
    </div>
  );
}

interface MetricItemProps {
  label: string;
  value: string | number;
}

function MetricItem({ label, value }: MetricItemProps) {
  return (
    <div className="metric-item">
      <span className="metric-item-label">{label}</span>
      <span className="metric-item-value">{value}</span>
    </div>
  );
}
