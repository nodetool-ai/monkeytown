'use client';

import { Flow } from '../lib/types';

interface FlowStreamProps {
  flow: Flow;
  sourcePosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  onComplete?: (flowId: string) => void;
  onError?: (flowId: string) => void;
}

const FLOW_COLORS: Record<string, string> = {
  message: 'var(--color-cyan)',
  resource: 'var(--color-green)',
  contract: 'var(--color-purple)',
  signal: 'var(--color-amber)',
};

const FLOW_STATUS_CONFIG: Record<string, { dashArray: string; speed: string }> = {
  pending: { dashArray: '4 4', speed: '0s' },
  active: { dashArray: '8 4', speed: '1s' },
  complete: { dashArray: '0', speed: '0s' },
  error: { dashArray: '2 2', speed: '0.3s' },
};

export function FlowStream({
  flow,
  sourcePosition,
  targetPosition,
  onComplete,
  onError,
}: FlowStreamProps) {
  const color = FLOW_COLORS[flow.type] || 'var(--color-cyan)';
  const config = FLOW_STATUS_CONFIG[flow.status] || FLOW_STATUS_CONFIG.pending;

  const midX = (sourcePosition.x + targetPosition.x) / 2;
  const midY = (sourcePosition.y + targetPosition.y) / 2;
  const dx = targetPosition.x - sourcePosition.x;
  const dy = targetPosition.y - sourcePosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const curveOffset = Math.min(distance * 0.2, 60);
  const sourceControlX = sourcePosition.x + dx * 0.3;
  const sourceControlY = sourcePosition.y - curveOffset;
  const targetControlX = targetPosition.x - dx * 0.3;
  const targetControlY = targetPosition.y - curveOffset;

  const pathD = `M ${sourcePosition.x} ${sourcePosition.y} Q ${sourceControlX} ${sourceControlY} ${midX} ${midY} T ${targetPosition.x} ${targetPosition.y}`;

  return (
    <g>
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeOpacity="0.3"
        strokeLinecap="round"
      />
      {flow.status === 'active' && (
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={config.dashArray}
          strokeLinecap="round"
          style={{
            animation: `flow ${config.speed} linear infinite`,
          }}
        />
      )}
      {flow.status === 'pending' && (
        <circle
          cx={sourcePosition.x}
          cy={sourcePosition.y}
          r="4"
          fill={color}
          style={{
            opacity: 0.5,
            animation: 'pulse 1s ease-in-out infinite',
          }}
        />
      )}
      {flow.status === 'complete' && (
        <circle
          cx={targetPosition.x}
          cy={targetPosition.y}
          r="4"
          fill={color}
        />
      )}
      {flow.status === 'error' && (
        <circle
          cx={midX}
          cy={midY}
          r="6"
          fill="var(--color-red)"
          style={{
            animation: 'pulse 0.5s ease-in-out infinite',
          }}
        />
      )}
    </g>
  );
}
