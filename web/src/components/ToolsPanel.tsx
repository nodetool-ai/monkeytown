import { useState } from 'react';
import { COLORS } from '@monkeytown/shared/constants';
import './ToolsPanel.css';

interface ToolInvocation {
  id: string;
  name: string;
  status: 'idle' | 'invoking' | 'complete' | 'error';
  result?: string;
}

interface ToolsPanelProps {
  tools: ToolInvocation[];
  onToolClick?: (tool: ToolInvocation) => void;
  onToggle?: () => void;
}

export function ToolsPanel({ tools, onToolClick, onToggle }: ToolsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getStatusColor = (status: ToolInvocation['status']) => {
    switch (status) {
      case 'invoking': return COLORS.amber;
      case 'complete': return COLORS.green;
      case 'error': return COLORS.red;
      default: return COLORS.textMuted;
    }
  };

  const parseToolName = (name: string) => {
    const match = name.match(/^(\w+)\(([^)]*)\)/);
    if (match) {
      return {
        functionName: match[1],
        params: match[2],
      };
    }
    return { functionName: name, params: '' };
  };

  return (
    <div className={`tools-panel ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="tools-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span className="tools-label">tools available</span>
        <div className="tools-header-actions">
          <button className="tools-toggle" onClick={(e) => { e.stopPropagation(); onToggle?.(); }}>×</button>
        </div>
      </div>

      {isExpanded && (
        <div className="tools-list">
          {tools.map((tool) => {
            const { functionName, params } = parseToolName(tool.name);
            return (
              <div
                key={tool.id}
                className={`tool-item ${tool.status}`}
                onClick={() => onToolClick?.(tool)}
              >
                <div className="tool-icon" style={{ color: getStatusColor(tool.status) }}>
                  {tool.status === 'invoking' ? '◉' : tool.status === 'complete' ? '✓' : '○'}
                </div>
                <div className="tool-content">
                  <code className="tool-name">{functionName}</code>
                  {params && <code className="tool-params">({params})</code>}
                </div>
                {tool.result && (
                  <span className="tool-result">→ {tool.result}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
