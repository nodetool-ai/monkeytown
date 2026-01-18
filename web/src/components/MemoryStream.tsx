import { useState } from 'react';
import { COLORS } from '@monkeytown/shared/constants';
import './MemoryStream.css';

interface MemoryItem {
  id: string;
  key: string;
  value: string;
  timestamp: number;
}

interface MemoryStreamProps {
  items: MemoryItem[];
  onToggle?: () => void;
}

export function MemoryStream({ items, onToggle }: MemoryStreamProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const formatTimestamp = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 1000) return 'now';
    if (diff < 60000) return `${Math.floor(diff / 1000)}s`;
    return `${Math.floor(diff / 60000)}m`;
  };

  return (
    <div className={`memory-stream ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="memory-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="memory-label">memory stream</span>
        <div className="memory-header-actions">
          <button className="memory-toggle" onClick={(e) => { e.stopPropagation(); onToggle?.(); }}>×</button>
        </div>
      </div>

      {isExpanded && (
        <div className="memory-list">
          {items.map((item) => (
            <div key={item.id} className="memory-item">
              <div className="memory-indicator" style={{ backgroundColor: COLORS.purple }} />
              <div className="memory-content">
                <code className="memory-key">{item.key}</code>
                <span className="memory-value">{item.value}</span>
                <span className="memory-time">{formatTimestamp(item.timestamp)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
