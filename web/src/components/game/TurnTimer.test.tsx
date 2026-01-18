import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { TurnTimer, TurnTimerDisplay, useTurnTimer } from './TurnTimer';

describe('TurnTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders with correct initial time', () => {
    render(
      <TurnTimer
        durationSeconds={60}
        startTime={Date.now()}
        isActive={false}
        isOwnTurn={true}
      />
    );
    expect(screen.getByText('60')).toBeInTheDocument();
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

  it('displays progress bar', () => {
    render(
      <TurnTimer
        durationSeconds={60}
        startTime={Date.now()}
        isActive={true}
        isOwnTurn={true}
      />
    );
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  it('counts down when active', async () => {
    render(
      <TurnTimer
        durationSeconds={60}
        startTime={Date.now()}
        isActive={true}
        isOwnTurn={true}
      />
    );

    expect(screen.getByText('60')).toBeInTheDocument();

    vi.advanceTimersByTime(2000);

    await waitFor(() => {
      expect(screen.getByText('58')).toBeInTheDocument();
    });
  });

  it('shows warning color when time is low', () => {
    render(
      <TurnTimer
        durationSeconds={60}
        startTime={Date.now() - 50000}
        isActive={true}
        isOwnTurn={true}
      />
    );

    const timer = screen.getByText('10');
    expect(timer).toHaveStyle({ color: expect.stringContaining('rgb') });
  });

  it('shows urgent color when time is critical', () => {
    render(
      <TurnTimer
        durationSeconds={60}
        startTime={Date.now() - 52000}
        isActive={true}
        isOwnTurn={true}
      />
    );

    const timer = screen.getByText('8');
    expect(timer).toHaveStyle({ color: expect.stringContaining('rgb') });
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

    vi.advanceTimersByTime(100);

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

  it('calculates progress correctly', () => {
    const results: Array<ReturnType<typeof useTurnTimer> | undefined> = [];
    function TestComponent() {
      const timer = useTurnTimer(60, Date.now() - 30000, true, 'live');
      results.push(timer);
      return null;
    }
    render(<TestComponent />);

    expect(results[0]?.progress).toBe(50);
    expect(results[0]?.remaining).toBe(30);
  });

  it('formats time correctly for seconds only', () => {
    const results: Array<ReturnType<typeof useTurnTimer> | undefined> = [];
    function TestComponent() {
      const timer = useTurnTimer(60, Date.now() - 45000, true, 'live');
      results.push(timer);
      return null;
    }
    render(<TestComponent />);

    expect(results[0]?.formattedTime).toBe('15s');
  });

  it('formats time correctly for minutes and seconds', () => {
    const results: Array<ReturnType<typeof useTurnTimer> | undefined> = [];
    function TestComponent() {
      const timer = useTurnTimer(120, Date.now() - 90000, true, 'live');
      results.push(timer);
      return null;
    }
    render(<TestComponent />);

    expect(results[0]?.formattedTime).toBe('0:30');
  });

  it('sets isUrgent when time is low', () => {
    const results: Array<ReturnType<typeof useTurnTimer> | undefined> = [];
    function TestComponent() {
      const timer = useTurnTimer(60, Date.now() - 52000, true, 'live');
      results.push(timer);
      return null;
    }
    render(<TestComponent />);

    expect(results[0]?.isUrgent).toBe(true);
  });
});
