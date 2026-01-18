import { useState, useRef, useEffect } from 'react';
import { SeedType, ActionSeedProps, SeedIntent } from '@monkeytown/shared/types';
import './ActionSeed.css';

const SEED_TYPE_CONFIG: Record<SeedType, { label: string; icon: string; placeholder: string }> = {
  contract: { label: 'Contract', icon: '📋', placeholder: 'What would you like to see?' },
  constraint: { label: 'Constraint', icon: '🔒', placeholder: 'Set a guideline...' },
  resource: { label: 'Resource', icon: '📦', placeholder: 'What do you need?' },
  query: { label: 'Query', icon: '🔍', placeholder: 'Ask the agents...' },
};

export function ActionSeed({ onPlant, isGrowing = false, pendingCount = 0 }: ActionSeedProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<SeedType | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const maxPendingSeeds = 5;
  const canPlant = pendingCount < maxPendingSeeds;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isOpen) {
        setMousePos({ x: e.clientX, y: e.clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, selectedType]);

  const handleOpen = () => {
    if (canPlant && !isGrowing) {
      setIsOpen(true);
    }
  };

  const handleTypeSelect = (type: SeedType) => {
    setSelectedType(type);
  };

  const handleSubmit = () => {
    if (selectedType && inputValue.trim()) {
      const intent: SeedIntent = {
        type: selectedType,
        payload: { content: inputValue.trim() },
      };
      onPlant(intent);
      setSelectedType(null);
      setInputValue('');
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    setSelectedType(null);
    setInputValue('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div ref={containerRef} className={`action-seed ${isOpen ? 'open' : ''} ${isGrowing ? 'growing' : ''} ${!canPlant ? 'disabled' : ''}`}>
      {!isOpen && !isGrowing && (
        <button className="seed-trigger" onClick={handleOpen} disabled={!canPlant}>
          <span className="seed-icon">🌱</span>
          <span className="seed-label">share an idea</span>
          {pendingCount > 0 && (
            <span className="seed-count">{pendingCount}</span>
          )}
        </button>
      )}

      {isGrowing && (
        <div className="seed-growing">
          <div className="growing-indicator">
            <div className="growing-seed">🌱</div>
            <div className="growing-bar">
              <div className="growing-progress" />
            </div>
          </div>
          <span className="growing-text">agents are reviewing your idea...</span>
        </div>
      )}

      {isOpen && !isGrowing && (
        <div className="seed-form-container">
          <div className="seed-form">
            <div className="seed-form-header">
              <span className="seed-form-label">share your idea with the agents</span>
              <button className="seed-form-close" onClick={handleCancel}>×</button>
            </div>

            {!selectedType ? (
              <div className="seed-type-selector">
                {(Object.keys(SEED_TYPE_CONFIG) as SeedType[]).map((type) => (
                  <button
                    key={type}
                    className="seed-type-option"
                    onClick={() => handleTypeSelect(type)}
                  >
                    <span className="seed-type-icon">{SEED_TYPE_CONFIG[type].icon}</span>
                    <span className="seed-type-label">{SEED_TYPE_CONFIG[type].label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="seed-input-section">
                <button className="seed-back" onClick={() => setSelectedType(null)}>←</button>
                <div className="seed-input-wrapper">
                  <span className="seed-type-icon">{SEED_TYPE_CONFIG[selectedType].icon}</span>
                  <textarea
                    ref={inputRef}
                    className="seed-input"
                    placeholder={SEED_TYPE_CONFIG[selectedType].placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={3}
                  />
                </div>
                <button
                  className="seed-submit"
                  onClick={handleSubmit}
                  disabled={!inputValue.trim()}
                >
                  share
                </button>
              </div>
            )}
          </div>

          <div
            className="seed-cursor"
            style={{
              left: mousePos.x,
              top: mousePos.y,
            }}
          />
        </div>
      )}

      {(!canPlant || pendingCount > 0) && (
        <div className="seed-limit-indicator">
          {pendingCount}/{maxPendingSeeds} pending
        </div>
      )}
    </div>
  );
}
