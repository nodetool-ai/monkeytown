import { useEffect, useRef } from 'react';
import { COLORS } from '@monkeytown/shared/constants';
import { FlowType, FlowStreamProps, FlowStatus } from '@monkeytown/shared/types';
import './FlowStream.css';

const AnimateMotion = (props: { dur: string; repeatCount: string; path: string }) => (
  <animateMotion {...props} />
);

const FLOW_TYPE_CONFIG: Record<FlowType, { dashArray: string; icon: string }> = {
  message: { dashArray: '5,5', icon: '💬' },
  resource: { dashArray: '10,5', icon: '📦' },
  contract: { dashArray: '3,3', icon: '📋' },
  signal: { dashArray: '8,4', icon: '📡' },
};

const STATUS_COLOR_MAP: Record<FlowStatus, keyof typeof COLORS> = {
  pending: 'amber',
  active: 'purple',
  complete: 'green',
  error: 'red',
};

export function FlowStream({ flow, sourcePos, targetPos, onComplete, onError }: FlowStreamProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const statusColor = COLORS[STATUS_COLOR_MAP[flow.status]];
  const typeConfig = FLOW_TYPE_CONFIG[flow.type];

  const pathId = `flow-path-${flow.id}`;
  const markerId = `flow-marker-${flow.id}`;

  useEffect(() => {
    if (flow.status === 'complete' && onComplete) {
      const timer = setTimeout(() => onComplete(flow.id), 500);
      return () => clearTimeout(timer);
    }
  }, [flow.status, flow.id, onComplete]);

  useEffect(() => {
    if (flow.status === 'error' && onError) {
      const timer = setTimeout(() => onError(flow.id), 300);
      return () => clearTimeout(timer);
    }
  }, [flow.status, flow.id, onError]);

  const calculatePath = () => {
    const dx = targetPos.x - sourcePos.x;
    const controlPoint1 = { x: sourcePos.x + dx * 0.3, y: sourcePos.y };
    const controlPoint2 = { x: targetPos.x - dx * 0.3, y: targetPos.y };
    return `M ${sourcePos.x} ${sourcePos.y} C ${controlPoint1.x} ${controlPoint1.y}, ${controlPoint2.x} ${controlPoint2.y}, ${targetPos.x} ${targetPos.y}`;
  };

  return (
    <g className={`flow-stream ${flow.status}`}>
      <defs>
        <marker
          id={markerId}
          markerWidth="10"
          markerHeight="10"
          refX="5"
          refY="5"
          orient="auto"
        >
          <circle
            cx="5"
            cy="5"
            r="3"
            fill={statusColor}
            className={flow.status === 'active' ? 'flow-pulse' : ''}
          />
        </marker>
        <marker
          id={`${markerId}-error`}
          markerWidth="12"
          markerHeight="12"
          refX="6"
          refY="6"
          orient="auto"
        >
          <path
            d="M 2 2 L 10 10 M 10 2 L 2 10"
            stroke={COLORS.red}
            strokeWidth="2"
            fill="none"
          />
        </marker>
      </defs>

      {flow.status !== 'error' && (
        <path
          ref={pathRef}
          id={pathId}
          d={calculatePath()}
          fill="none"
          stroke={statusColor}
          strokeWidth="2"
          strokeDasharray={flow.status === 'active' ? typeConfig.dashArray : 'none'}
          strokeDashoffset={flow.status === 'active' ? '0' : 'none'}
          className={flow.status === 'active' ? 'flow-animate' : ''}
          markerEnd={`url(#${flow.status === 'complete' ? markerId : markerId})`}
        />
      )}

      {flow.status === 'error' && (
        <>
          <path
            d={calculatePath()}
            fill="none"
            stroke={COLORS.red}
            strokeWidth="2"
            strokeDasharray="none"
            className="flow-error"
          />
          <circle
            cx={sourcePos.x + (targetPos.x - sourcePos.x) * 0.5}
            cy={sourcePos.y + (targetPos.y - sourcePos.y) * 0.5}
            r="8"
            fill={COLORS.surface}
            stroke={COLORS.red}
            strokeWidth="2"
          />
          <path
            d="M -4 -4 L 4 4 M 4 -4 L -4 4"
            stroke={COLORS.red}
            strokeWidth="2"
            strokeLinecap="round"
            transform={`translate(${sourcePos.x + (targetPos.x - sourcePos.x) * 0.5}, ${sourcePos.y + (targetPos.y - sourcePos.y) * 0.5})`}
          />
        </>
      )}

      {(flow.status === 'pending' || flow.status === 'active') && (
        <circle
          cx={sourcePos.x}
          cy={sourcePos.y}
          r="4"
          fill={statusColor}
          className="flow-pending-pulse"
        />
      )}

      {flow.status === 'active' && (
        <circle
          r="3"
          fill={COLORS.cyan}
          className="flow-active-particle"
        >
          <AnimateMotion
            dur="2s"
            repeatCount="indefinite"
            path={calculatePath()}
          />
        </circle>
      )}

      <title>{`${flow.type} flow: ${flow.status}`}</title>
    </g>
  );
}
