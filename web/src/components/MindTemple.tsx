import { useEffect, useState, useCallback } from 'react';
import { COLORS } from '@monkeytown/shared/constants';
import { AgentSignature } from './AgentSignature';
import { ReasoningChain } from './ReasoningChain';
import { ToolsPanel } from './ToolsPanel';
import { MemoryStream } from './MemoryStream';
import './MindTemple.css';

interface ReasoningStep {
  id: string;
  label: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  timestamp: number;
  details?: string;
}

interface MemoryItem {
  id: string;
  key: string;
  value: string;
  timestamp: number;
}

interface ToolInvocation {
  id: string;
  name: string;
  status: 'idle' | 'invoking' | 'complete' | 'error';
  result?: string;
}

interface MindTempleProps {
  agentId: string;
  agentLabel: string;
  signature: string;
  agentType: string;
  status: 'idle' | 'active' | 'processing' | 'complete' | 'error';
  steps?: ReasoningStep[];
  memoryItems?: MemoryItem[];
  tools?: ToolInvocation[];
  onClose: () => void;
  onSignatureClick?: (signature: string) => void;
  onStepClick?: (step: ReasoningStep) => void;
  onToolClick?: (tool: ToolInvocation) => void;
}

const SAMPLE_STEPS: ReasoningStep[] = [
  { id: 'step-1', label: 'parsing input', status: 'complete', timestamp: Date.now() - 4000 },
  { id: 'step-2', label: 'analyzing context', status: 'complete', timestamp: Date.now() - 3000 },
  { id: 'step-3', label: 'reasoning', status: 'active', timestamp: Date.now() - 1000 },
  { id: 'step-4', label: 'generating output', status: 'pending', timestamp: Date.now() },
];

const SAMPLE_MEMORY: MemoryItem[] = [
  { id: 'mem-1', key: 'context_v1', value: 'previous state', timestamp: Date.now() - 5000 },
  { id: 'mem-2', key: 'context_v2', value: 'user preferences', timestamp: Date.now() - 3000 },
];

const SAMPLE_TOOLS: ToolInvocation[] = [
  { id: 'tool-1', name: 'search(query:string) → results:string[]', status: 'idle' },
  { id: 'tool-2', name: 'calculate(expr:string) → result:number', status: 'idle' },
  { id: 'tool-3', name: 'memory.put(key:string, val:any) → void', status: 'idle' },
  { id: 'tool-4', name: 'memory.get(key:string) → value:any', status: 'complete', result: 'retrieved' },
];

export function MindTemple({
  agentId,
  agentLabel,
  signature,
  agentType,
  status,
  steps = SAMPLE_STEPS,
  memoryItems = SAMPLE_MEMORY,
  tools = SAMPLE_TOOLS,
  onClose,
  onSignatureClick,
  onStepClick,
  onToolClick,
}: MindTempleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTools, setShowTools] = useState(true);
  const [showMemory, setShowMemory] = useState(true);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
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

  const currentStep = steps.find(s => s.status === 'active');

  return (
    <div className="mind-temple-backdrop" onClick={handleBackdropClick}>
      <div className={`mind-temple ${isVisible ? 'visible' : ''}`}>
        <div className="mind-temple-header">
          <div className="mind-temple-header-top">
            <span className="mind-temple-type">{agentType}</span>
            <button className="mind-temple-close" onClick={onClose}>×</button>
          </div>
          <h2 className="mind-temple-label">{agentLabel}</h2>
          <div className="mind-temple-meta">
            <span className="mind-temple-id">{agentId}</span>
            <span className="mind-temple-status" style={{ color: COLORS[status === 'active' ? 'cyan' : status === 'error' ? 'red' : 'green'] }}>
              {status}
            </span>
          </div>
        </div>

        <div className="mind-temple-content">
          <div className="mind-temple-main">
            <AgentSignature
              signature={signature}
              type={agentType}
              status={status}
              onClick={() => onSignatureClick?.(signature)}
            />

            <div className="reasoning-section">
              <div className="reasoning-header">
                <span className="reasoning-label">reasoning chain</span>
                <span className="reasoning-progress">
                  {steps.filter(s => s.status === 'complete').length}/{steps.length} complete
                </span>
              </div>
              <ReasoningChain
                steps={steps}
                currentStep={currentStep}
                onStepClick={onStepClick}
              />
            </div>
          </div>

          <div className="mind-temple-sidebar">
            {showTools && (
              <ToolsPanel
                tools={tools}
                onToolClick={onToolClick}
                onToggle={() => setShowTools(false)}
              />
            )}

            {showMemory && (
              <MemoryStream
                items={memoryItems}
                onToggle={() => setShowMemory(false)}
              />
            )}
          </div>
        </div>

        <div className="mind-temple-footer">
          <div className="mind-temple-hint">
            <span className="hint-key">ESC</span>
            <span className="hint-text">to close</span>
          </div>
        </div>
      </div>
    </div>
  );
}
