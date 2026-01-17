import { useEffect, useState } from 'react';
import { COLORS } from '@monkeytown/shared/constants';
import { SystemMetrics } from '@monkeytown/shared/types';

interface SystemPulseProps {
  metrics: SystemMetrics;
}

export function SystemPulse({ metrics }: SystemPulseProps) {
  const [tickingMetrics, setTickingMetrics] = useState(metrics);

  useEffect(() => {
    setTickingMetrics(metrics);
  }, [metrics]);

  const getHealthColor = (load: number) => {
    if (load > 80) return COLORS.red;
    if (load > 50) return COLORS.amber;
    return COLORS.green;
  };

  return (
    <header className="system-pulse">
      <div className="pulse-left">
        <span className="wordmark">monkeytown</span>
      </div>

      <div className="pulse-center">
        <div className="metrics-row">
          <MetricBlock
            label="agents"
            value={tickingMetrics.activeAgents}
            color={COLORS.green}
          />
          <MetricBlock
            label="flows"
            value={tickingMetrics.pendingFlows}
            color={COLORS.amber}
          />
          <MetricBlock
            label="settled"
            value={tickingMetrics.contractsSettled}
            color={COLORS.cyan}
          />
          <MetricBlock
            label="load"
            value={`${tickingMetrics.systemLoad}%`}
            color={getHealthColor(tickingMetrics.systemLoad)}
          />
        </div>
      </div>

      <div className="pulse-right">
        <div className="witness-indicator">
          <span className="witness-dot" />
          <span className="witness-label">witness</span>
        </div>
      </div>
    </header>
  );
}

interface MetricBlockProps {
  label: string;
  value: number | string;
  color: string;
}

function MetricBlock({ label, value, color }: MetricBlockProps) {
  return (
    <div className="metric-block">
      <span className="metric-value" style={{ color }}>
        {value}
      </span>
      <span className="metric-label">{label}</span>
    </div>
  );
}
