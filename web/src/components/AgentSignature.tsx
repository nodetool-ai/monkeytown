import { useState } from 'react';
import { COLORS } from '@monkeytown/shared/constants';
import './AgentSignature.css';

interface AgentSignatureProps {
  signature: string;
  type: string;
  status: 'idle' | 'active' | 'processing' | 'complete' | 'error';
  onClick?: () => void;
}

export function AgentSignature({ signature, type, status }: AgentSignatureProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusColor = () => {
    switch (status) {
      case 'active': return COLORS.cyan;
      case 'error': return COLORS.red;
      case 'complete': return COLORS.green;
      default: return COLORS.purple;
    }
  };

  const parseSignature = (sig: string) => {
    const parts = sig.split('->');
    if (parts.length === 2) {
      return { inputs: parts[0].trim(), outputs: parts[1].trim() };
    }
    return { inputs: '', outputs: sig };
  };

  const { inputs, outputs } = parseSignature(signature);

  return (
    <div className={`agent-signature ${status}`} onClick={() => setIsExpanded(!isExpanded)}>
      <div className="signature-header">
        <span className="signature-type-badge">{type}</span>
        <div className="signature-status" style={{ backgroundColor: getStatusColor() }} />
      </div>

      <div className="signature-display">
        <div className="signature-inputs">
          <span className="signature-arrow">╭──</span>
          <span className="signature-label">INPUT</span>
          <code className="signature-text">{inputs}</code>
        </div>

        <div className="signature-arrow-row">
          <span className="signature-arrow">│</span>
          <span className="signature-arrow-center">→</span>
          <span className="signature-arrow">│</span>
        </div>

        <div className="signature-outputs">
          <span className="signature-arrow">╰──</span>
          <span className="signature-label">OUTPUT</span>
          <code className="signature-text">{outputs}</code>
        </div>
      </div>

      <div className={`signature-expand ${isExpanded ? 'expanded' : ''}`}>
        <span className="expand-hint">{isExpanded ? 'less' : 'more'}</span>
      </div>
    </div>
  );
}
