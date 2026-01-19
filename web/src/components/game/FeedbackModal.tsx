'use client';

import React, { CSSProperties, useState, useCallback } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export type FeedbackCategory = 'agent' | 'game' | 'ui' | 'performance' | 'other';

export interface FeedbackSubmission {
  category: FeedbackCategory;
  rating: number;
  comment: string;
  playerAttribution: boolean;
}

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: FeedbackSubmission) => void;
  context?: string;
}

const CATEGORY_INFO: Record<FeedbackCategory, { label: string; emoji: string; description: string }> = {
  agent: { label: 'AI Opponent', emoji: '🤖', description: 'Issues with AI behavior, personality, or strategy' },
  game: { label: 'Game Mechanics', emoji: '🎮', description: 'Rules, balance, or gameplay issues' },
  ui: { label: 'User Interface', emoji: '🎨', description: 'Layout, design, or navigation problems' },
  performance: { label: 'Performance', emoji: '⚡', description: 'Slow loading, lag, or crashes' },
  other: { label: 'Other', emoji: '💬', description: 'Anything else you want to share' },
};

export function FeedbackModal({ isOpen, onClose, onSubmit, context }: FeedbackModalProps) {
  const [category, setCategory] = useState<FeedbackCategory | null>(null);
  const [rating, setRating] = useState(3);
  const [comment, setComment] = useState('');
  const [playerAttribution, setPlayerAttribution] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!category) return;

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    onSubmit({
      category,
      rating,
      comment,
      playerAttribution,
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setCategory(null);
      setRating(3);
      setComment('');
    }, 2000);
  }, [category, rating, comment, playerAttribution, onSubmit, onClose]);

  if (!isOpen) return null;

  const overlayStyles: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(4px)',
  };

  const modalStyles: CSSProperties = {
    background: 'var(--color-bg-elevated)',
    borderRadius: 'var(--radius-xl)',
    padding: 'var(--space-6)',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflow: 'auto',
    border: '1px solid var(--color-border-default)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  };

  if (isSubmitted) {
    return (
      <div style={overlayStyles} onClick={onClose}>
        <div style={modalStyles} onClick={e => e.stopPropagation()}>
          <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
            <div style={{ fontSize: '4rem', marginBottom: 'var(--space-4)' }}>🎉</div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', marginBottom: 'var(--space-2)' }}>
              Thank You!
            </h3>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Your feedback helps agents improve Monkeytown.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div style={modalStyles} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h2)', fontWeight: 600 }}>
            💭 Feedback
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--color-text-secondary)',
              padding: 'var(--space-2)',
            }}
          >
            ✕
          </button>
        </div>

        {context && (
          <div style={{
            padding: 'var(--space-3)',
            background: 'var(--color-bg-surface)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-4)',
            fontSize: 'var(--text-caption)',
            color: 'var(--color-text-secondary)',
          }}>
            Context: {context}
          </div>
        )}

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
            What would you like to give feedback about?
          </label>
          <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
            {(Object.keys(CATEGORY_INFO) as FeedbackCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  background: category === cat ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-bg-surface)',
                  border: category === cat ? '2px solid var(--color-success)' : '2px solid transparent',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all var(--duration-fast)',
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{CATEGORY_INFO[cat].emoji}</span>
                <div>
                  <div style={{ fontWeight: 600 }}>{CATEGORY_INFO[cat].label}</div>
                  <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
                    {CATEGORY_INFO[cat].description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
            How was your experience?
          </label>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  transition: 'transform var(--duration-fast)',
                  transform: rating >= star ? 'scale(1.2)' : 'scale(1)',
                }}
              >
                {rating >= star ? '⭐' : '☆'}
              </button>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-2)', color: 'var(--color-text-secondary)', fontSize: 'var(--text-caption)' }}>
            {rating <= 2 ? 'Needs improvement' : rating <= 4 ? 'Good' : 'Excellent!'}
          </div>
        </div>

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
            Additional comments (optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us more about your experience..."
            style={{
              width: '100%',
              minHeight: '100px',
              padding: 'var(--space-3)',
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-body)',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={playerAttribution}
              onChange={(e) => setPlayerAttribution(e.target.checked)}
              style={{ width: 18, height: 18 }}
            />
            <span style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
              Attribute my feedback to my player profile (helps agents personalize future experiences)
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
          <Button variant="ghost" onClick={onClose} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            disabled={!category || isSubmitting}
            style={{ flex: 1 }}
          >
            {isSubmitting ? 'Sending...' : 'Send Feedback'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function useFeedback() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [context, setContext] = useState<string | undefined>(undefined);
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);

  const openFeedback = useCallback((context?: string) => {
    setContext(context);
    setIsModalOpen(true);
  }, []);

  const closeFeedback = useCallback(() => {
    setIsModalOpen(false);
    setContext(undefined);
  }, []);

  const submitFeedback = useCallback((feedback: FeedbackSubmission) => {
    setSubmissions(prev => [...prev, feedback]);
    console.log('[Feedback] Submitted:', feedback);
  }, []);

  return {
    isModalOpen,
    context,
    openFeedback,
    closeFeedback,
    submitFeedback,
    submissions,
  };
}

export function FeedbackButton({ context }: { context?: string }) {
  const { openFeedback } = useFeedback();

  return (
    <Button variant="ghost" size="sm" onClick={() => openFeedback(context)}>
      💭 Feedback
    </Button>
  );
}
