import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { TurnTimer, TurnTimerDisplay, useTurnTimer } from './TurnTimer';

describe('TurnTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with correct initial time format', () => {
    render(
      <TurnTimer
        durationSeconds={60}
        startTime={Date.now()}
        isActive={false}
        isOwnTurn={true}
      />
    );
    expect(screen.getByText(/1:00|60/)).toBeInTheDocument();
  });

  it('shows your turn badge when isOwnTurn is true', () => {
    render(
      <TurnTimer
        durationSeconds={60}
        startTime={Date.now()}
        isActive={true}
        isOwnTurn={true}
      />
    );
    expect(screen.getByText('Your Turn')).toBeInTheDocument();
  });

  it('shows waiting badge when isOwnTurn is false', () => {
    render(
      <TurnTimer
        durationSeconds={60}
        startTime={Date.now()}
        isActive={true}
        isOwnTurn={false}
      />
    );
    expect(screen.getByText('Waiting')).toBeInTheDocument();
  });

  it('displays progress bar element', () => {
    render(
      <TurnTimer
        durationSeconds={60}
        startTime={Date.now()}
        isActive={true}
        isOwnTurn={true}
      />
    );
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('formats minutes and seconds correctly', () => {
    render(
      <TurnTimer
        durationSeconds={90}
        startTime={Date.now() - 30000}
        isActive={true}
        isOwnTurn={true}
      />
    );
    expect(screen.getByText('1:00')).toBeInTheDocument();
  });

  it('calls onTimeout when time expires', () => {
    const mockOnTimeout = vi.fn();
    render(
      <TurnTimer
        durationSeconds={60}
        startTime={Date.now() - 60000}
        isActive={true}
        isOwnTurn={true}
        onTimeout={mockOnTimeout}
      />
    );

    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(mockOnTimeout).toHaveBeenCalled();
  });
});

describe('TurnTimerDisplay', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('displays timer for current turn', () => {
    render(
      <TurnTimerDisplay
        currentPlayerId="player-1"
        currentTurnPlayerId="player-1"
        turnDurationSeconds={60}
        turnStartTime={Date.now()}
        turnTimerActive={true}
        playerId="player-1"
      />
    );
    expect(screen.getByText('Your Turn')).toBeInTheDocument();
  });

  it('shows waiting when not your turn', () => {
    render(
      <TurnTimerDisplay
        currentPlayerId="player-1"
        currentTurnPlayerId="player-2"
        turnDurationSeconds={60}
        turnStartTime={Date.now()}
        turnTimerActive={true}
        playerId="player-1"
      />
    );
    expect(screen.getByText('Waiting')).toBeInTheDocument();
  });
});

describe('useTurnTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns correct initial values', () => {
    const results: Array<ReturnType<typeof useTurnTimer> | undefined> = [];
    function TestComponent() {
      const timer = useTurnTimer(60, Date.now(), false, 'waiting');
      results.push(timer);
      return null;
    }
    render(<TestComponent />);

    expect(results[0]?.remaining).toBe(60);
    expect(results[0]?.progress).toBe(100);
    expect(results[0]?.isActive).toBe(false);
  });

  it('returns expected structure', () => {
    function TestComponent() {
      const timer = useTurnTimer(60, Date.now(), true, 'live');
      return (
        <div>
          <span data-testid="remaining">{timer.remaining}</span>
          <span data-testid="progress">{timer.progress}</span>
          <span data-testid="isUrgent">{timer.isUrgent.toString()}</span>
          <span data-testid="formatted">{timer.formattedTime}</span>
        </div>
      );
    }
    render(<TestComponent />);

    expect(screen.getByTestId('remaining')).toBeInTheDocument();
    expect(screen.getByTestId('progress')).toBeInTheDocument();
    expect(screen.getByTestId('isUrgent')).toBeInTheDocument();
    expect(screen.getByTestId('formatted')).toBeInTheDocument();
  });

  it('formats time with seconds for short durations', () => {
    function TestComponent() {
      const timer = useTurnTimer(30, Date.now(), true, 'live');
      return <span data-testid="time">{timer.formattedTime}</span>;
    }
    render(<TestComponent />);
    expect(screen.getByTestId('time').textContent).toMatch(/^\d+s$/);
  });

  it('formats time with colon for longer durations', () => {
    function TestComponent() {
      const timer = useTurnTimer(120, Date.now(), true, 'live');
      return <span data-testid="time">{timer.formattedTime}</span>;
    }
    render(<TestComponent />);
    expect(screen.getByTestId('time').textContent).toMatch(/^\d+:\d{2}$/);
  });
});
