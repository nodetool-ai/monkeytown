'use client';

import { CSSProperties, useState, useEffect, useCallback } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { GameType } from '@monkeytown/packages/shared/game-types';

interface TutorialStep {
  title: string;
  content: string;
  duration: number;
  highlightElement?: string;
  interactive?: boolean;
}

interface BabelTutorialSteps {
  basics: TutorialStep[];
  playingCards: TutorialStep[];
  suitBonuses: TutorialStep[];
  specialActions: TutorialStep[];
  roundMultipliers: TutorialStep[];
  winning: TutorialStep[];
}

const BABEL_TUTORIAL: BabelTutorialSteps = {
  basics: [
    {
      title: 'Welcome to Babel Tower!',
      content: "Your goal is to build the tallest tower by playing cards strategically. Each card adds to your tower height!",
      duration: 8000,
      highlightElement: 'tower-zone',
    },
    {
      title: 'Your Hand',
      content: 'You start with 5 cards. Each card has a value (1-25) and a suit that affects bonuses.',
      duration: 6000,
      highlightElement: 'player-hand',
    },
  ],
  playingCards: [
    {
      title: 'Playing Cards',
      content: 'When you play a card, it adds to your tower! Higher value cards build faster.',
      duration: 6000,
      interactive: true,
    },
    {
      title: 'Card Value',
      content: 'The number shows the base value. This directly adds to your tower height.',
      duration: 5000,
      highlightElement: 'card-value',
    },
  ],
  suitBonuses: [
    {
      title: 'Suit Bonuses',
      content: 'Different suits give different bonuses:',
      duration: 5000,
    },
    {
      title: '🪨 Stone',
      content: 'Stone gives +0 bonus. Steady and reliable, but no extra boost.',
      duration: 4000,
    },
    {
      title: '🧱 Brick',
      content: 'Brick gives +2 bonus. A solid foundation for your tower.',
      duration: 4000,
    },
    {
      title: '🪵 Wood',
      content: 'Wood gives +4 bonus. Good balance of bonus and availability.',
      duration: 4000,
    },
    {
      title: '🪟 Glass',
      content: 'Glass gives +6 bonus! The most powerful suit, but rare to find.',
      duration: 4000,
    },
  ],
  specialActions: [
    {
      title: 'Special Actions',
      content: 'High-value cards unlock powerful special actions!',
      duration: 5000,
    },
    {
      title: '🎯 Sabotage (15+)',
      content: 'Remove points from an opponent\'s tower. Devastating against leaders!',
      duration: 6000,
    },
    {
      title: '⬆️ Boost (10+)',
      content: 'Add +5 bonus to YOUR tower. Great for catching up!',
      duration: 5000,
    },
    {
      title: '🃏 Steal (8+)',
      content: 'Take a card from the table. Useful when you see something you need!',
      duration: 5000,
    },
  ],
  roundMultipliers: [
    {
      title: 'Round Multipliers',
      content: 'Later rounds have higher multipliers! Plan your timing:',
      duration: 5000,
    },
    {
      title: 'Early Game (Rounds 1-4)',
      content: '×1 multiplier. Build your foundation with medium cards.',
      duration: 4000,
    },
    {
      title: 'Mid Game (Rounds 5-8)',
      content: '×1.5 multiplier. Start pushing with higher cards!',
      duration: 4000,
    },
    {
      title: 'Late Game (Rounds 9-12)',
      content: '×2-3 multiplier! Save your best cards for the finale!',
      duration: 4000,
    },
  ],
  winning: [
    {
      title: 'Winning',
      content: 'After 12 rounds, the player with the highest score wins!',
      duration: 5000,
    },
    {
      title: 'Tiebreaker',
      content: 'If scores are tied, tower height breaks the tie. Every point matters!',
      duration: 5000,
    },
    {
      title: 'Ready to Play!',
      content: 'You\'re ready to build your tower! Good luck! 🎮',
      duration: 4000,
    },
  ],
};

interface TutorialOverlayProps {
  gameType: GameType;
  onComplete: () => void;
  onSkip: () => void;
  isOpen: boolean;
}

export function TutorialOverlay({ gameType, onComplete, onSkip, isOpen }: TutorialOverlayProps) {
  const [currentPhase, setCurrentPhase] = useState<keyof BabelTutorialSteps>('basics');
  const [stepIndex, setStepIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const phases = Object.keys(BABEL_TUTORIAL) as Array<keyof BabelTutorialSteps>;
  const currentSteps = BABEL_TUTORIAL[currentPhase];
  const currentStep = currentSteps[stepIndex];
  const totalPhases = phases.length;
  const currentPhaseIndex = phases.indexOf(currentPhase);

  const calculateTotalProgress = useCallback(() => {
    let completedSteps = 0;
    for (let i = 0; i < currentPhaseIndex; i++) {
      completedSteps += BABEL_TUTORIAL[phases[i]].length;
    }
    completedSteps += stepIndex;
    const totalSteps = Object.values(BABEL_TUTORIAL).reduce((sum, steps) => sum + steps.length, 0);
    return Math.round((completedSteps / totalSteps) * 100);
  }, [currentPhaseIndex, stepIndex, phases]);

  useEffect(() => {
    if (!isOpen || paused) return;

    const duration = currentStep.duration;
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress(Math.min((elapsed / duration) * 100, 100));

      if (elapsed >= duration) {
        clearInterval(timer);
        setTimeout(() => {
          if (stepIndex < currentSteps.length - 1) {
            setStepIndex(stepIndex + 1);
          } else if (currentPhaseIndex < phases.length - 1) {
            setCurrentPhase(phases[currentPhaseIndex + 1]);
            setStepIndex(0);
          } else {
            onComplete();
            return;
          }
          setIsTransitioning(false);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentStep, isOpen, paused, stepIndex, currentSteps.length, currentPhaseIndex, phases, onComplete]);

  const goToNextStep = useCallback(() => {
    setIsTransitioning(true);
    setProgress(0);

    setTimeout(() => {
      if (stepIndex < currentSteps.length - 1) {
        setStepIndex(stepIndex + 1);
      } else if (currentPhaseIndex < phases.length - 1) {
        setCurrentPhase(phases[currentPhaseIndex + 1]);
        setStepIndex(0);
      } else {
        onComplete();
        return;
      }
      setIsTransitioning(false);
    }, 300);
  }, [stepIndex, currentSteps.length, currentPhaseIndex, phases, onComplete]);

  const goToPreviousStep = useCallback(() => {
    setIsTransitioning(true);
    setProgress(0);

    setTimeout(() => {
      if (stepIndex > 0) {
        setStepIndex(stepIndex - 1);
      } else if (currentPhaseIndex > 0) {
        const prevPhase = phases[currentPhaseIndex - 1];
        setCurrentPhase(prevPhase);
        setStepIndex(BABEL_TUTORIAL[prevPhase].length - 1);
      }
      setIsTransitioning(false);
    }, 300);
  }, [stepIndex, currentPhaseIndex, phases]);

  if (!isOpen) return null;

  const overlayStyles: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn var(--duration-fast) var(--ease-out)',
  };

  const containerStyles: CSSProperties = {
    maxWidth: '600px',
    width: '90%',
    background: 'var(--color-bg-primary)',
    borderRadius: 'var(--radius-xl)',
    border: 'var(--border-width-default) var(--color-border-default)',
    overflow: 'hidden',
    animation: isTransitioning ? 'none' : 'slideUp var(--duration-slow) var(--ease-out)',
  };

  const headerStyles: CSSProperties = {
    padding: 'var(--space-4) var(--space-6)',
    background: 'linear-gradient(135deg, var(--color-primary), #FF8555)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const titleStyles: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-h3)',
    fontWeight: 600,
    color: 'var(--color-text-inverse)',
  };

  const progressBarStyles: CSSProperties = {
    height: '4px',
    background: 'var(--color-bg-elevated)',
    width: '100%',
  };

  const progressFillStyles: CSSProperties = {
    height: '100%',
    background: 'var(--color-primary)',
    width: `${calculateTotalProgress()}%`,
    transition: 'width var(--duration-normal) var(--ease-out)',
  };

  const contentStyles: CSSProperties = {
    padding: 'var(--space-8)',
    textAlign: 'center',
  };

  const stepIndicatorStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--space-2)',
    justifyContent: 'center',
    marginBottom: 'var(--space-6)',
  };

  const stepDotStyles = (isActive: boolean, isCompleted: boolean): CSSProperties => ({
    width: '8px',
    height: '8px',
    borderRadius: 'var(--radius-full)',
    background: isActive ? 'var(--color-primary)' : isCompleted ? 'var(--color-success)' : 'var(--color-border-default)',
    transition: 'all var(--duration-fast) var(--ease-out)',
  });

  const stepTitleStyles: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-h2)',
    fontWeight: 600,
    marginBottom: 'var(--space-4)',
    color: 'var(--color-text-primary)',
  };

  const stepContentStyles: CSSProperties = {
    fontSize: 'var(--text-body-large)',
    lineHeight: 1.6,
    color: 'var(--color-text-secondary)',
    marginBottom: 'var(--space-8)',
  };

  const timerBarStyles: CSSProperties = {
    height: '3px',
    background: 'var(--color-bg-elevated)',
    borderRadius: 'var(--radius-full)',
    overflow: 'hidden',
    marginBottom: 'var(--space-6)',
  };

  const timerFillStyles: CSSProperties = {
    height: '100%',
    background: progress < 30 ? 'var(--color-error)' : progress < 60 ? 'var(--color-warning)' : 'var(--color-success)',
    width: `${progress}%`,
    transition: 'width 50ms linear',
  };

  const footerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-4) var(--space-6)',
    borderTop: 'var(--border-width-hairline) var(--color-border-subtle)',
  };

  const buttonGroupStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--space-3)',
  };

  const phaseIndicatorStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    color: 'var(--color-text-tertiary)',
  };

  return (
    <div style={overlayStyles}>
      <div style={containerStyles}>
        <div style={headerStyles}>
          <span style={titleStyles}>📖 Babel Tower Tutorial</span>
          <button
            onClick={() => setPaused(!paused)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--color-text-inverse)',
            }}
          >
            {paused ? '▶️' : '⏸️'}
          </button>
        </div>

        <div style={progressBarStyles}>
          <div style={progressFillStyles} />
        </div>

        <div style={contentStyles}>
          <div style={stepIndicatorStyles}>
            {currentSteps.map((_, idx) => (
              <div key={idx} style={stepDotStyles(idx === stepIndex, idx < stepIndex)} />
            ))}
          </div>

          <div style={timerBarStyles}>
            <div style={timerFillStyles} />
          </div>

          <h2 style={stepTitleStyles}>{currentStep.title}</h2>
          <p style={stepContentStyles}>{currentStep.content}</p>

          {currentStep.interactive && (
            <Card variant="elevated" padding="md" style={{ marginBottom: 'var(--space-4)', borderLeft: '4px solid var(--color-primary)' }}>
              <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-primary)' }}>
                💡 Try it! Click on a card in your hand to play it.
              </p>
            </Card>
          )}
        </div>

        <div style={footerStyles}>
          <span style={phaseIndicatorStyles}>
            {phases[currentPhaseIndex].replace(/([A-Z])/g, ' $1').trim()} ({currentPhaseIndex + 1}/{totalPhases})
          </span>

          <div style={buttonGroupStyles}>
            <Button
              variant="secondary"
              size="sm"
              onClick={goToPreviousStep}
              disabled={currentPhaseIndex === 0 && stepIndex === 0}
            >
              ← Previous
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={goToNextStep}
            >
              {currentPhaseIndex === phases.length - 1 && stepIndex === currentSteps.length - 1
                ? 'Start Playing!'
                : 'Next →'}
            </Button>
          </div>
        </div>

        <div style={{ padding: 'var(--space-3) var(--space-6)', textAlign: 'center', borderTop: 'var(--border-width-hairline) var(--color-border-subtle)' }}>
          <button
            onClick={onSkip}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--color-text-tertiary)',
              fontSize: 'var(--text-caption)',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            Skip Tutorial
          </button>
        </div>
      </div>
    </div>
  );
}

export function useTutorial(gameType: GameType) {
  const [isOpen, setIsOpen] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(`tutorial_completed_${gameType}`);
    if (stored) {
      setCompleted(true);
    }
  }, [gameType]);

  const completeTutorial = useCallback(() => {
    setCompleted(true);
    localStorage.setItem(`tutorial_completed_${gameType}`, 'true');
    setIsOpen(false);
  }, [gameType]);

  const skipTutorial = useCallback(() => {
    setIsOpen(false);
  }, []);

  const showTutorial = useCallback(() => {
    if (!completed) {
      setIsOpen(true);
    }
  }, [completed]);

  return {
    isOpen,
    completed,
    showTutorial,
    completeTutorial,
    skipTutorial,
  };
}
