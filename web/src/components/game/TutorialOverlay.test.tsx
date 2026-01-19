import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TutorialOverlay, useTutorial } from './TutorialOverlay';
import { GameType } from '@monkeytown/packages/shared';

describe('TutorialOverlay', () => {
  const mockOnComplete = vi.fn();
  const mockOnSkip = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not render when isOpen is false', () => {
    render(
      <TutorialOverlay
        gameType="babel"
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isOpen={false}
      />
    );
    expect(screen.queryByText(/Tutorial$/)).not.toBeInTheDocument();
  });

  it('renders when isOpen is true', () => {
    render(
      <TutorialOverlay
        gameType="babel"
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isOpen={true}
      />
    );
    expect(screen.getByText((content) => content.includes('Babel') && content.includes('Tutorial'))).toBeInTheDocument();
  });

  it('shows the first tutorial step', () => {
    render(
      <TutorialOverlay
        gameType="babel"
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isOpen={true}
      />
    );
    expect(screen.getByText('Welcome to Babel Tower!')).toBeInTheDocument();
  });

  it('skips tutorial when skip button is clicked', () => {
    render(
      <TutorialOverlay
        gameType="babel"
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isOpen={true}
      />
    );
    fireEvent.click(screen.getByText('Skip Tutorial'));
    expect(mockOnSkip).toHaveBeenCalled();
  });

  it('shows progress bar element', () => {
    render(
      <TutorialOverlay
        gameType="babel"
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isOpen={true}
      />
    );
    const progressBar = screen.getByTestId('tutorial-progress');
    expect(progressBar).toBeInTheDocument();
  });
});

describe('useTutorial', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns an object with expected methods', () => {
    function TestComponent() {
      const tutorial = useTutorial('babel' as GameType);
      return (
        <div>
          <span data-testid="isOpen">{tutorial.isOpen.toString()}</span>
          <span data-testid="completed">{tutorial.completed.toString()}</span>
        </div>
      );
    }
    render(<TestComponent />);
    expect(screen.getByTestId('isOpen')).toHaveTextContent('false');
  });

  it('reads completed status from localStorage', () => {
    localStorage.setItem('tutorial_completed_babel', 'true');
    function TestComponent() {
      const tutorial = useTutorial('babel' as GameType);
      return (
        <div>
          <span data-testid="completed">{tutorial.completed.toString()}</span>
        </div>
      );
    }
    render(<TestComponent />);
    expect(screen.getByTestId('completed')).toHaveTextContent('true');
  });
});
