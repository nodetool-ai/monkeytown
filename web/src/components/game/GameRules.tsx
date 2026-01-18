'use client';

import React, { CSSProperties, useState } from 'react';
import { GameType } from '@monkeytown/packages/shared';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

/**
 * Game rules data for in-game display
 * Each game has quick tips and detailed rules
 */
export const GAME_RULES: Record<GameType, GameRulesData> = {
  babel: {
    name: 'Babel Tower',
    emoji: '🗼',
    objective: 'Build the tallest tower by playing cards strategically. Highest score wins!',
    quickTips: [
      'Play cards to add their value to your tower',
      'Higher value cards (15+) can sabotage opponents',
      'Cards with value 10+ can boost your tower by +5',
      'Glass suit gives +6 bonus, use it wisely',
      'Round multiplier increases each round',
    ],
    actions: [
      { name: 'Play Card', description: 'Add card value + suit bonus + round bonus to tower' },
      { name: 'Sabotage (15+)', description: 'Reduce opponent tower by card value ÷ 2' },
      { name: 'Boost (10+)', description: 'Add +5 bonus to your tower' },
      { name: 'Steal (8+)', description: 'Take a card from the table' },
      { name: 'Pass', description: 'Skip your turn, keep your cards' },
    ],
    suitBonuses: [
      { suit: '🪨 Stone', bonus: '+0' },
      { suit: '🧱 Brick', bonus: '+2' },
      { suit: '🪵 Wood', bonus: '+4' },
      { suit: '🪟 Glass', bonus: '+6' },
    ],
    tips: 'Save high-value cards for late rounds when the multiplier is higher!',
  },
  chess: {
    name: 'Chess',
    emoji: '♟️',
    objective: 'Checkmate your opponent\'s King - put it in a position where it cannot escape capture.',
    quickTips: [
      'Control the center of the board (e4, d4, e5, d5)',
      'Develop your pieces early (knights, bishops)',
      'Castle to protect your king',
      'Don\'t move the same piece twice in opening',
      'Connect your rooks on the back rank',
    ],
    actions: [
      { name: 'Move', description: 'Move a piece according to its rules' },
      { name: 'Capture', description: 'Take an opponent\'s piece' },
      { name: 'Castle', description: 'Move King + Rook together for safety' },
      { name: 'En Passant', description: 'Special pawn capture' },
      { name: 'Promote', description: 'Pawn reaches end, becomes any piece' },
    ],
    pieceMovements: [
      { piece: '♔ King', movement: 'One square any direction' },
      { piece: '♕ Queen', movement: 'Any distance, any direction' },
      { piece: '♖ Rook', movement: 'Any distance, straight lines' },
      { piece: '♗ Bishop', movement: 'Any distance, diagonals' },
      { piece: '♘ Knight', movement: 'L-shape (2+1), can jump' },
      { piece: '♙ Pawn', movement: 'Forward 1-2, captures diagonal' },
    ],
    tips: 'Think about your opponent\'s threats before making your move!',
  },
  words: {
    name: 'Word Builder',
    emoji: '📝',
    objective: 'Create the highest-scoring words from your letter tiles. Highest total score wins!',
    quickTips: [
      'Longer words score more (×1.5 for 5 letters, ×2 for 6, ×3 for 7+)',
      'Use all 7 tiles for +50 bonus points',
      'Swap tiles if you have a bad hand',
      'Q, Z, X, J are high value but hard to use',
      'Learn common 2-letter words (QI, XI, ZA)',
    ],
    actions: [
      { name: 'Create Word', description: 'Arrange tiles to spell a valid word (3+ letters)' },
      { name: 'Swap Tiles', description: 'Exchange tiles with the pool' },
      { name: 'Pass', description: 'Skip your turn' },
      { name: 'Challenge', description: 'Challenge opponent\'s word validity' },
    ],
    letterValues: [
      { letters: 'E, A, I, O, N, R, T, L, S, U', points: '1 pt' },
      { letters: 'D, G', points: '2 pts' },
      { letters: 'B, C, M, P', points: '3 pts' },
      { letters: 'F, H, V, W, Y', points: '4 pts' },
      { letters: 'K', points: '5 pts' },
      { letters: 'J, X', points: '8 pts' },
      { letters: 'Q, Z', points: '10 pts' },
    ],
    tips: 'Save your S tiles - they\'re great for making plurals!',
  },
};

interface GameRulesData {
  name: string;
  emoji: string;
  objective: string;
  quickTips: string[];
  actions: { name: string; description: string }[];
  suitBonuses?: { suit: string; bonus: string }[];
  pieceMovements?: { piece: string; movement: string }[];
  letterValues?: { letters: string; points: string }[];
  tips: string;
}

interface GameRulesProps {
  gameType: GameType;
  variant?: 'compact' | 'full';
  showTitle?: boolean;
}

/**
 * GameRules component - displays in-game rules and tips
 * Use variant="compact" for sidebar, variant="full" for modal/page
 */
export function GameRules({ gameType, variant = 'compact', showTitle = true }: GameRulesProps) {
  const rules = GAME_RULES[gameType];
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const containerStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-3)',
  };

  const sectionHeaderStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: 'var(--space-2) 0',
    borderBottom: '1px solid var(--color-border-subtle)',
  };

  const sectionTitleStyles: CSSProperties = {
    fontWeight: 600,
    fontSize: 'var(--text-caption)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--color-text-secondary)',
  };

  const listStyles: CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-2)',
  };

  const listItemStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    color: 'var(--color-text-primary)',
    display: 'flex',
    gap: 'var(--space-2)',
  };

  const bulletStyles: CSSProperties = {
    color: 'var(--color-primary)',
    fontWeight: 600,
  };

  const tipBoxStyles: CSSProperties = {
    background: 'rgba(255, 107, 53, 0.1)',
    border: '1px solid rgba(255, 107, 53, 0.3)',
    borderRadius: 'var(--radius-md)',
    padding: 'var(--space-3)',
    fontSize: 'var(--text-caption)',
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (variant === 'compact') {
    return (
      <Card variant="elevated" padding="md" style={containerStyles}>
        {showTitle && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <span style={{ fontSize: '1.5rem' }}>{rules.emoji}</span>
            <span style={{ fontWeight: 600 }}>How to Play</span>
          </div>
        )}

        <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
          {rules.objective}
        </div>

        <div style={sectionHeaderStyles} onClick={() => toggleSection('tips')}>
          <span style={sectionTitleStyles}>Quick Tips</span>
          <span>{expandedSection === 'tips' ? '▼' : '▶'}</span>
        </div>
        {expandedSection === 'tips' && (
          <ul style={listStyles}>
            {rules.quickTips.slice(0, 3).map((tip, index) => (
              <li key={index} style={listItemStyles}>
                <span style={bulletStyles}>•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        )}

        <div style={sectionHeaderStyles} onClick={() => toggleSection('actions')}>
          <span style={sectionTitleStyles}>Actions</span>
          <span>{expandedSection === 'actions' ? '▼' : '▶'}</span>
        </div>
        {expandedSection === 'actions' && (
          <ul style={listStyles}>
            {rules.actions.map((action, index) => (
              <li key={index} style={listItemStyles}>
                <span style={{ ...bulletStyles, minWidth: '80px' }}>{action.name}:</span>
                <span style={{ color: 'var(--color-text-secondary)' }}>{action.description}</span>
              </li>
            ))}
          </ul>
        )}

        <div style={tipBoxStyles}>
          💡 <strong>Pro Tip:</strong> {rules.tips}
        </div>
      </Card>
    );
  }

  // Full variant for modals/pages
  return (
    <div style={{ ...containerStyles, gap: 'var(--space-4)' }}>
      {showTitle && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
          <span style={{ fontSize: '2.5rem' }}>{rules.emoji}</span>
          <div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600, margin: 0 }}>
              {rules.name}
            </h2>
            <p style={{ fontSize: 'var(--text-body)', color: 'var(--color-text-secondary)', margin: 0 }}>
              {rules.objective}
            </p>
          </div>
        </div>
      )}

      <Card variant="default" padding="lg">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-3)' }}>
          Quick Tips
        </h3>
        <ul style={{ ...listStyles, gap: 'var(--space-3)' }}>
          {rules.quickTips.map((tip, index) => (
            <li key={index} style={listItemStyles}>
              <span style={bulletStyles}>✓</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card variant="default" padding="lg">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-3)' }}>
          Available Actions
        </h3>
        <div style={{ display: 'grid', gap: 'var(--space-3)' }}>
          {rules.actions.map((action, index) => (
            <div key={index} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
              <span style={{
                background: 'var(--color-primary)',
                color: 'white',
                padding: 'var(--space-1) var(--space-2)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-caption)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}>
                {action.name}
              </span>
              <span style={{ color: 'var(--color-text-secondary)' }}>{action.description}</span>
            </div>
          ))}
        </div>
      </Card>

      {rules.suitBonuses && (
        <Card variant="default" padding="lg">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-3)' }}>
            Suit Bonuses
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
            {rules.suitBonuses.map((sb, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2)', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
                <span>{sb.suit}</span>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{sb.bonus}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {rules.pieceMovements && (
        <Card variant="default" padding="lg">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-3)' }}>
            Piece Movements
          </h3>
          <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
            {rules.pieceMovements.map((pm, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2)', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontWeight: 600 }}>{pm.piece}</span>
                <span style={{ color: 'var(--color-text-secondary)' }}>{pm.movement}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {rules.letterValues && (
        <Card variant="default" padding="lg">
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', marginBottom: 'var(--space-3)' }}>
            Letter Values
          </h3>
          <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
            {rules.letterValues.map((lv, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-2)', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-sm)' }}>
                <span style={{ fontFamily: 'var(--font-mono)' }}>{lv.letters}</span>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{lv.points}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div style={{ ...tipBoxStyles, padding: 'var(--space-4)' }}>
        💡 <strong>Pro Tip:</strong> {rules.tips}
      </div>
    </div>
  );
}

interface GameRulesModalProps {
  gameType: GameType;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * GameRulesModal - modal overlay for viewing full game rules
 */
export function GameRulesModal({ gameType, isOpen, onClose }: GameRulesModalProps) {
  if (!isOpen) return null;

  const overlayStyles: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 'var(--space-6)',
  };

  const modalStyles: CSSProperties = {
    background: 'var(--color-bg-primary)',
    borderRadius: 'var(--radius-xl)',
    maxWidth: '600px',
    maxHeight: '90vh',
    overflow: 'auto',
    padding: 'var(--space-6)',
    position: 'relative',
  };

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div style={modalStyles} onClick={e => e.stopPropagation()}>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          style={{ position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)' }}
        >
          ✕
        </Button>
        <GameRules gameType={gameType} variant="full" />
      </div>
    </div>
  );
}
