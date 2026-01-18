import { useState, useEffect, useCallback } from 'react';
import { COLORS } from '@monkeytown/shared/constants';
import { STATUS_CONFIG, DetailPanelProps, DetailTab, LogEntry, ConnectionInfo, EntityHistory } from '@monkeytown/shared/types';
import './DetailPanel.css';

const DEFAULT_TABS: DetailTab[] = [
  { id: 'status', label: 'status', icon: '📊' },
  { id: 'logs', label: 'logs', icon: '📋' },
  { id: 'connections', label: 'connections', icon: '🔗' },
  { id: 'history', label: 'history', icon: '🕐' },
];

const SAMPLE_LOGS: LogEntry[] = [
  { id: 'log-1', timestamp: Date.now() - 5000, level: 'info', message: 'initialized with 4 agents' },
  { id: 'log-2', timestamp: Date.now() - 4000, level: 'info', message: 'connected to event stream' },
  { id: 'log-3', timestamp: Date.now() - 3000, level: 'warn', message: 'latency spike detected (120ms)' },
  { id: 'log-4', timestamp: Date.now() - 2000, level: 'info', message: 'processed contract commit-3f8a2d' },
  { id: 'log-5', timestamp: Date.now() - 1000, level: 'info', message: 'metrics updated' },
];

const SAMPLE_CONNECTIONS: ConnectionInfo[] = [
  { id: 'conn-1', label: 'ChaosArchitect', type: 'agent', status: 'active' },
  { id: 'conn-2', label: 'BrandBarketeer', type: 'agent', status: 'active' },
  { id: 'conn-3', label: 'commit-3f8a2d', type: 'contract', status: 'complete' },
];

const SAMPLE_HISTORY: EntityHistory[] = [
  { id: 'hist-1', timestamp: Date.now() - 5000, action: 'created', details: 'initialization' },
  { id: 'hist-2', timestamp: Date.now() - 3000, action: 'updated', details: 'status change' },
  { id: 'hist-3', timestamp: Date.now() - 1000, action: 'processed', details: 'contract settlement' },
];

export function DetailPanel({ entity, tabs = DEFAULT_TABS, logs = SAMPLE_LOGS, connections = SAMPLE_CONNECTIONS, history = SAMPLE_HISTORY, onClose, onOpenMindTemple }: DetailPanelProps & { onOpenMindTemple?: () => void }) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const formatTimestamp = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 1000) return 'just now';
    if (diff < 60000) return `${Math.floor(diff / 1000)}s ago`;
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    return new Date(timestamp).toLocaleString();
  };

  const getLogIcon = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return '❌';
      case 'warn': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const statusColor = COLORS[STATUS_CONFIG[entity.status]];

  return (
    <div className="detail-backdrop" onClick={handleBackdropClick}>
      <div className={`detail-panel ${isVisible ? 'visible' : ''}`}>
        <div className="detail-header">
          <div className="detail-header-top">
            <span className="detail-type">{entity.type}</span>
            <button className="detail-close" onClick={onClose}>×</button>
          </div>
          <h2 className="detail-label">{entity.label}</h2>
          <div className="detail-meta">
            <span className="detail-id">{entity.id}</span>
            <span className="detail-status" style={{ color: statusColor }}>{entity.status}</span>
          </div>
          {onOpenMindTemple && entity.type === 'agent' && (
            <button className="detail-mind-temple" onClick={onOpenMindTemple}>
              <span className="mind-temple-icon">◆</span>
              <span className="mind-temple-label">show signature</span>
              <span className="mind-temple-key">T</span>
            </button>
          )}
        </div>

        <div className="detail-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`detail-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="detail-content">
          {activeTab === 'status' && (
            <div className="detail-section">
              <div className="metrics-grid">
                <MetricCard label="efficiency" value={`${entity.metrics.efficiency}%`} />
                <MetricCard label="load" value={`${entity.metrics.load}%`} />
                <MetricCard label="connections" value={entity.metrics.connections} />
              </div>
              <div className="timestamp-info">
                <span className="info-label">active since</span>
                <span className="info-value">{formatTimestamp(entity.timestamp)}</span>
              </div>
              {entity.parentId && (
                <div className="timestamp-info">
                  <span className="info-label">parent</span>
                  <span className="info-value">{entity.parentId}</span>
                </div>
              )}
            </div>
          )}

          {activeTab === 'logs' && (
            <div className="detail-section">
              <div className="logs-list">
                {logs.map((log) => (
                  <div key={log.id} className="log-entry">
                    <span className="log-icon">{getLogIcon(log.level)}</span>
                    <div className="log-content">
                      <span className="log-message">{log.message}</span>
                      <span className="log-time">{formatTimestamp(log.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'connections' && (
            <div className="detail-section">
              <div className="connections-list">
                {connections.map((conn) => (
                  <div key={conn.id} className="connection-entry">
                    <span className="connection-icon">{conn.type === 'agent' ? '🐒' : '📋'}</span>
                    <div className="connection-content">
                      <span className="connection-label">{conn.label}</span>
                      <span className="connection-status" style={{ color: COLORS[STATUS_CONFIG[conn.status]] }}>{conn.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="detail-section">
              <div className="history-timeline">
                {history.map((hist) => (
                  <div key={hist.id} className="history-entry">
                    <div className="history-marker" />
                    <div className="history-content">
                      <span className="history-action">{hist.action}</span>
                      <span className="history-details">{hist.details}</span>
                      <span className="history-time">{formatTimestamp(hist.timestamp)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string | number;
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="metric-card">
      <span className="metric-card-label">{label}</span>
      <span className="metric-card-value">{value}</span>
    </div>
  );
}
