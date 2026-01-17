import { Entity } from '@monkeytown/shared/types';
import './GhostColumn.css';

interface GhostColumnProps {
  history: Entity[];
  onRestore: (entity: Entity) => void;
}

export function GhostColumn({ history, onRestore }: GhostColumnProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <aside className="ghost-column">
      <div className="ghost-header">
        <span className="ghost-title">history</span>
        <span className="ghost-count">{history.length}</span>
      </div>

      <div className="ghost-list">
        {history.map((entity) => (
          <GhostItem key={entity.id} entity={entity} onRestore={onRestore} />
        ))}
      </div>
    </aside>
  );
}

interface GhostItemProps {
  entity: Entity;
  onRestore: (entity: Entity) => void;
}

function GhostItem({ entity, onRestore }: GhostItemProps) {
  const timeAgo = getTimeAgo(entity.timestamp);

  return (
    <div className="ghost-item" onClick={() => onRestore(entity)}>
      <div className="ghost-item-header">
        <span className="ghost-item-type">{entity.type}</span>
        <span className="ghost-item-time">{timeAgo}</span>
      </div>
      <div className="ghost-item-label">{entity.label}</div>
    </div>
  );
}

function getTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}
