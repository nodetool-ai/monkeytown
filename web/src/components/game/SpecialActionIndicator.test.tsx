import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SpecialActionIndicator, SpecialActionsPanel, isSpecialCard, getSpecialActionType } from './SpecialActionIndicator';

describe('SpecialActionIndicator', () => {
  it('renders regular card without special badge', () => {
    const card = { id: 'c1', value: 5 };
    render(
      <SpecialActionIndicator
        card={card as any}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.queryByText('🎯')).not.toBeInTheDocument();
    expect(screen.queryByText('⬆️')).not.toBeInTheDocument();
    expect(screen.queryByText('🃏')).not.toBeInTheDocument();
  });

  it('shows sabotage badge for card value 15+', () => {
    const card = { id: 'c1', value: 15 };
    render(
      <SpecialActionIndicator
        card={card as any}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('🎯')).toBeInTheDocument();
  });

  it('shows boost badge for card value 10-14', () => {
    const card = { id: 'c1', value: 12 };
    render(
      <SpecialActionIndicator
        card={card as any}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('⬆️')).toBeInTheDocument();
  });

  it('shows steal badge for card value 8-9', () => {
    const card = { id: 'c1', value: 8 };
    render(
      <SpecialActionIndicator
        card={card as any}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('🃏')).toBeInTheDocument();
  });

  it('calls onSelect when card is clicked', () => {
    const mockOnSelect = vi.fn();
    const card = { id: 'c1', value: 15 };
    render(
      <SpecialActionIndicator
        card={card as any}
        onSelect={mockOnSelect}
      />
    );
    fireEvent.click(screen.getByText('15'));
    expect(mockOnSelect).toHaveBeenCalled();
  });

  it('shows selected state when isSelected is true', () => {
    const card = { id: 'c1', value: 15 };
    render(
      <SpecialActionIndicator
        card={card as any}
        isSelected={true}
        onSelect={() => {}}
      />
    );
    const cardElement = screen.getByText('15').closest('div');
    expect(cardElement).toHaveStyle({ border: '3px solid var(--color-primary)' });
  });

  it('shows tooltip on hover', () => {
    const card = { id: 'c1', value: 15 };
    render(
      <SpecialActionIndicator
        card={card as any}
        onSelect={() => {}}
        showTooltip={true}
      />
    );
    fireEvent.mouseEnter(screen.getByText('15'));
    expect(screen.getByText('Sabotage')).toBeInTheDocument();
    expect(screen.getByText('Remove half the points from an opponent\'s tower')).toBeInTheDocument();
  });

  it('hides tooltip when disabled', () => {
    const card = { id: 'c1', value: 15 };
    render(
      <SpecialActionIndicator
        card={card as any}
        onSelect={() => {}}
        disabled={true}
      />
    );
    expect(screen.getByText('15').closest('div')).toHaveStyle({ opacity: '0.6' });
  });

  it('shows suit icon when suit is provided', () => {
    const card = { id: 'c1', value: 15, suit: 'glass' as const };
    render(
      <SpecialActionIndicator
        card={card as any}
        onSelect={() => {}}
      />
    );
    expect(screen.getByText('🪟')).toBeInTheDocument();
  });
});

describe('SpecialActionsPanel', () => {
  it('shows sabotage action with player list', () => {
    const players = [
      { id: 'p1', name: 'Player 1', towerHeight: 50 },
      { id: 'p2', name: 'Player 2', towerHeight: 30 },
    ];
    render(
      <SpecialActionsPanel
        players={players}
        selectedCardValue={15}
        onSelectTarget={() => {}}
      />
    );
    expect(screen.getByText('Sabotage')).toBeInTheDocument();
    expect(screen.getByText('Player 1')).toBeInTheDocument();
    expect(screen.getByText('Player 2')).toBeInTheDocument();
  });

  it('shows boost action without player list', () => {
    const players = [
      { id: 'p1', name: 'Player 1', towerHeight: 50 },
    ];
    render(
      <SpecialActionsPanel
        players={players}
        selectedCardValue={12}
        onSelectTarget={() => {}}
      />
    );
    expect(screen.getByText('Boost')).toBeInTheDocument();
    expect(screen.getByText('+5 Bonus Points')).toBeInTheDocument();
  });

  it('calls onSelectTarget when player is clicked', () => {
    const mockOnSelectTarget = vi.fn();
    const players = [
      { id: 'p1', name: 'Player 1', towerHeight: 50 },
    ];
    render(
      <SpecialActionsPanel
        players={players}
        selectedCardValue={15}
        onSelectTarget={mockOnSelectTarget}
      />
    );
    fireEvent.click(screen.getByText('Player 1'));
    expect(mockOnSelectTarget).toHaveBeenCalledWith('p1');
  });

  it('calls onCancel when cancel button is clicked', () => {
    const mockOnCancel = vi.fn();
    const players = [
      { id: 'p1', name: 'Player 1', towerHeight: 50 },
    ];
    render(
      <SpecialActionsPanel
        players={players}
        selectedCardValue={15}
        onSelectTarget={() => {}}
        onCancel={mockOnCancel}
      />
    );
    fireEvent.click(screen.getByText('Cancel Special Action'));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('shows sabotage damage amount', () => {
    const players = [
      { id: 'p1', name: 'Player 1', towerHeight: 50 },
    ];
    render(
      <SpecialActionsPanel
        players={players}
        selectedCardValue={15}
        onSelectTarget={() => {}}
      />
    );
    expect(screen.getByText('-7')).toBeInTheDocument();
  });
});

describe('isSpecialCard', () => {
  it('returns false for card value less than 8', () => {
    expect(isSpecialCard({ id: 'c1', value: 7 })).toBe(false);
  });

  it('returns true for card value 8 or higher', () => {
    expect(isSpecialCard({ id: 'c1', value: 8 })).toBe(true);
    expect(isSpecialCard({ id: 'c1', value: 10 })).toBe(true);
    expect(isSpecialCard({ id: 'c1', value: 15 })).toBe(true);
  });
});

describe('getSpecialActionType', () => {
  it('returns null for card value less than 8', () => {
    expect(getSpecialActionType({ id: 'c1', value: 7 })).toBe(null);
  });

  it('returns steal for card value 8-9', () => {
    expect(getSpecialActionType({ id: 'c1', value: 8 })).toBe('steal');
    expect(getSpecialActionType({ id: 'c1', value: 9 })).toBe('steal');
  });

  it('returns boost for card value 10-14', () => {
    expect(getSpecialActionType({ id: 'c1', value: 10 })).toBe('boost');
    expect(getSpecialActionType({ id: 'c1', value: 14 })).toBe('boost');
  });

  it('returns sabotage for card value 15+', () => {
    expect(getSpecialActionType({ id: 'c1', value: 15 })).toBe('sabotage');
    expect(getSpecialActionType({ id: 'c1', value: 25 })).toBe('sabotage');
  });
});
