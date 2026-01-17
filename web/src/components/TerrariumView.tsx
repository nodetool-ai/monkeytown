import { Entity } from '@monkeytown/shared/types';
import { AgentCard } from './AgentCard';
import './TerrariumView.css';

interface TerrariumViewProps {
  entities: Entity[];
  focusedEntity: Entity | null;
  onEntityClick: (entity: Entity) => void;
}

export function TerrariumView({
  entities,
  focusedEntity,
  onEntityClick,
}: TerrariumViewProps) {
  const activeEntities = entities.filter((e) => e.status !== 'complete');
  const completingEntities = entities.filter((e) => e.status === 'complete');

  return (
    <main className="terrarium-view">
      <div className="terrarium-canvas">
        <div className="canvas-active">
          {activeEntities.map((entity) => (
            <AgentCard
              key={entity.id}
              entity={entity}
              isFocused={focusedEntity?.id === entity.id}
              onClick={onEntityClick}
            />
          ))}
        </div>

        <div className="canvas-completing">
          {completingEntities.length > 0 && (
            <div className="completing-indicator">
              <span className="completing-count">{completingEntities.length}</span>
              <span className="completing-label">completing</span>
            </div>
          )}
        </div>

        <div className="canvas-waiting">
          {activeEntities.length === 0 && completingEntities.length === 0 && (
            <div className="waiting-state">
              <div className="waiting-pulse" />
              <p className="waiting-text">waiting for activity...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
