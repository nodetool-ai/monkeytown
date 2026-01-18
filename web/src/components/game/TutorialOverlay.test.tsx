import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    expect(screen.queryByText('Babel Tower Tutorial')).not.toBeInTheDocument();
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
    expect(screen.getByText('Babel Tower Tutorial')).toBeInTheDocument();
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

  it('navigates to next step when next button is clicked', () => {
    render(
      <TutorialOverlay
        gameType="babel"
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isOpen={true}
      />
    );
    expect(screen.getByText('Welcome to Babel Tower!')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next →'));
    expect(screen.getByText('Your Hand')).toBeInTheDocument();
  });

  it('navigates to previous step when previous button is clicked', () => {
    render(
      <TutorialOverlay
        gameType="babel"
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isOpen={true}
      />
    );
    fireEvent.click(screen.getByText('Next →'));
    expect(screen.getByText('Your Hand')).toBeInTheDocument();
    fireEvent.click(screen.getByText('← Previous'));
    expect(screen.getByText('Welcome to Babel Tower!')).toBeInTheDocument();
  });

  it('shows progress bar', () => {
    render(
      <TutorialOverlay
        gameType="babel"
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isOpen={true}
      />
    );
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('pauses and resumes tutorial', () => {
    render(
      <TutorialOverlay
        gameType="babel"
        onComplete={mockOnComplete}
        onSkip={mockOnSkip}
        isOpen={true}
      />
    );
    fireEvent.click(screen.getByText('⏸️'));
    expect(screen.getByText('▶️')).toBeInTheDocument();
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

  it('starts with isOpen false when tutorial not completed', () => {
    const results: Array<ReturnType<typeof useTutorial> | undefined> = [];
    function TestComponent() {
      const tutorial = useTutorial('babel' as GameType);
      results.push(tutorial);
      return null;
    }
    render(<TestComponent />);
    expect(results[0]?.isOpen).toBe(false);
  });

  it('sets completed to true when tutorial was previously completed', () => {
    localStorage.setItem('tutorial_completed_babel', 'true');
    const results: Array<ReturnType<typeof useTutorial> | undefined> = [];
    function TestComponent() {
      const tutorial = useTutorial('babel' as GameType);
      results.push(tutorial);
      return null;
    }
    render(<TestComponent />);
    expect(results[0]?.completed).toBe(true);
  });

  it('shows tutorial when showTutorial is called and not completed', () => {
    const results: Array<ReturnType<typeof useTutorial> | undefined> = [];
    function TestComponent() {
      const tutorial = useTutorial('babel' as GameType);
      results.push(tutorial);
      return null;
    }
    render(<TestComponent />);
    results[0]?.showTutorial();
    expect(results[0]?.isOpen).toBe(true);
  });

  it('does not show tutorial when already completed', () => {
    localStorage.setItem('tutorial_completed_babel', 'true');
    const results: Array<ReturnType<typeof useTutorial> | undefined> = [];
    function TestComponent() {
      const tutorial = useTutorial('babel' as GameType);
      results.push(tutorial);
      return null;
    }
    render(<TestComponent />);
    results[0]?.showTutorial();
    expect(results[0]?.isOpen).toBe(false);
  });

  it('completes tutorial and saves to localStorage', () => {
    const results: Array<ReturnType<typeof useTutorial> | undefined> = [];
    function TestComponent() {
      const tutorial = useTutorial('babel' as GameType);
      results.push(tutorial);
      return null;
    }
    render(<TestComponent />);
    results[0]?.completeTutorial();
    expect(results[0]?.completed).toBe(true);
    expect(results[0]?.isOpen).toBe(false);
    expect(localStorage.getItem('tutorial_completed_babel')).toBe('true');
  });
});
