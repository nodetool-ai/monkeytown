import { useEffect, useState } from 'react';
import { COLORS } from '@monkeytown/shared/constants';
import './ReasoningChain.css';

interface ReasoningStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  timestamp: number;
  details?: string;
}

interface ReasoningChainProps {
  steps: ReasoningStep[];
  currentStep?: ReasoningStep;
  onStepClick?: (step: ReasoningStep) => void;
}

export function ReasoningChain({ steps, currentStep, onStepClick }: ReasoningChainProps) {
  const [animatedSteps, setAnimatedSteps] = useState<Set<string>>(new Set());

  useEffect(() => {
    steps.forEach(step => {
      if (step.status === 'complete' && !animatedSteps.has(step.id)) {
        setAnimatedSteps(prev => new Set([...prev, step.id]));
      }
    });
  }, [steps, animatedSteps]);

  const formatTimestamp = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    if (diff < 1000) return 'now';
    if (diff < 60000) return `${Math.floor(diff / 1000)}s`;
    return `${Math.floor(diff / 60000)}m`;
  };

  const getStatusIcon = (status: ReasoningStep['status']) => {
    switch (status) {
      case 'complete': return '✓';
      case 'active': return '●';
      case 'error': return '✕';
      default: return '○';
    }
  };

  const getStatusColor = (status: ReasoningStep['status']) => {
    switch (status) {
      case 'complete': return COLORS.green;
      case 'active': return COLORS.amber;
      case 'error': return COLORS.red;
      default: return COLORS.textMuted;
    }
  };

  return (
    <div className="reasoning-chain">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`reasoning-step ${step.status} ${animatedSteps.has(step.id) ? 'animated' : ''} ${currentStep?.id === step.id ? 'current' : ''}`}
          onClick={() => onStepClick?.(step)}
        >
          <div className="step-connector">
            {index < steps.length - 1 && (
              <div className="step-line" style={{
                backgroundColor: step.status === 'complete' ? COLORS.green : COLORS.border
              }} />
            )}
            <div
              className="step-indicator"
              style={{
                backgroundColor: step.status === 'active' ? COLORS.amber : 'transparent',
                borderColor: getStatusColor(step.status)
              }}
            >
              {getStatusIcon(step.status)}
            </div>
          </div>

          <div className="step-content">
            <span className="step-label">{step.label}</span>
            <span className="step-time">{formatTimestamp(step.timestamp)}</span>
          </div>

          {currentStep?.id === step.id && (
            <div className="step-active-indicator" style={{ backgroundColor: COLORS.amber }} />
          )}
        </div>
      ))}
    </div>
  );
}
