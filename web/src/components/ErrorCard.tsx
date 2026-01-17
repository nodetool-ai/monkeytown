import { useEffect, useRef } from 'react';
import { ErrorCardProps } from '@monkeytown/shared/types';
import './ErrorCard.css';

export function ErrorCard({ error, onRetry, onIgnore, onInspect, suggestion }: ErrorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      cardRef.current.classList.add('error-animate');
      const timer = setTimeout(() => {
        cardRef.current?.classList.remove('error-animate');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div ref={cardRef} className="error-card">
      <div className="error-header">
        <span className="error-icon">⚠️</span>
        <span className="error-title">something broke</span>
      </div>

      <div className="error-body">
        <p className="error-message">{error.message}</p>
        {error.context && (
          <p className="error-context">{error.context}</p>
        )}
        {error.code && (
          <code className="error-code">{error.code}</code>
        )}
      </div>

      {suggestion && (
        <div className="error-suggestion">
          <span className="suggestion-label">suggestion:</span>
          <span className="suggestion-text">{suggestion}</span>
        </div>
      )}

      <div className="error-actions">
        {onRetry && (
          <button className="error-action retry" onClick={onRetry}>
            <span className="action-icon">🔄</span>
            <span className="action-label">retry</span>
          </button>
        )}
        {onIgnore && (
          <button className="error-action ignore" onClick={onIgnore}>
            <span className="action-icon">→</span>
            <span className="action-label">ignore</span>
          </button>
        )}
        {onInspect && (
          <button className="error-action inspect" onClick={onInspect}>
            <span className="action-icon">🔍</span>
            <span className="action-label">inspect</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function InlineError({ error, onDismiss }: { error: ErrorCardProps['error']; onDismiss?: () => void }) {
  return (
    <div className="inline-error">
      <span className="inline-error-icon">!</span>
      <span className="inline-error-message">{error.message}</span>
      {onDismiss && (
        <button className="inline-error-dismiss" onClick={onDismiss}>×</button>
      )}
    </div>
  );
}
