import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FeedbackModal, useFeedback, FeedbackButton } from './FeedbackModal';

describe('FeedbackModal', () => {
  const mockOnSubmit = vi.fn();
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('💭 Feedback')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(
      <FeedbackModal
        isOpen={false}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.queryByText('💭 Feedback')).not.toBeInTheDocument();
  });

  it('shows category selection options', () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByText('AI Opponent')).toBeInTheDocument();
    expect(screen.getByText('Game Mechanics')).toBeInTheDocument();
    expect(screen.getByText('User Interface')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('Other')).toBeInTheDocument();
  });

  it('selects category when clicked', () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const agentOption = screen.getByText('AI Opponent').closest('button');
    fireEvent.click(agentOption!);

    expect(screen.getByText('Issues with AI behavior, personality, or strategy')).toBeInTheDocument();
  });

  it('shows star rating', () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const stars = screen.getAllByText('☆');
    expect(stars).toHaveLength(5);
  });

  it('allows rating selection', () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const fourthStar = screen.getAllByText('☆')[3];
    fireEvent.click(fourthStar);

    expect(screen.getAllByText('⭐')).toHaveLength(4);
  });

  it('allows comment input', () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const textarea = screen.getByPlaceholderText('Tell us more about your experience...');
    fireEvent.change(textarea, { target: { value: 'Great game!' } });

    expect(textarea).toHaveValue('Great game!');
  });

  it('toggles player attribution checkbox', () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('disables submit button when no category selected', () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const submitButton = screen.getByRole('button', { name: /Send Feedback/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when category selected', () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const agentOption = screen.getByText('AI Opponent').closest('button');
    fireEvent.click(agentOption!);

    const submitButton = screen.getByRole('button', { name: /Send Feedback/i });
    expect(submitButton).not.toBeDisabled();
  });

  it('calls onSubmit with feedback data', async () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const agentOption = screen.getByText('AI Opponent').closest('button');
    fireEvent.click(agentOption!);

    const fourthStar = screen.getAllByText('☆')[3];
    fireEvent.click(fourthStar);

    const textarea = screen.getByPlaceholderText('Tell us more about your experience...');
    fireEvent.change(textarea, { target: { value: 'AI plays well!' } });

    const submitButton = screen.getByRole('button', { name: /Send Feedback/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        category: 'agent',
        rating: 4,
        comment: 'AI plays well!',
        playerAttribution: true,
      });
    });
  });

  it('shows success message after submission', async () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
      />
    );

    const agentOption = screen.getByText('AI Opponent').closest('button');
    fireEvent.click(agentOption!);

    const submitButton = screen.getByRole('button', { name: /Send Feedback/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Thank You!')).toBeInTheDocument();
    });
  });

  it('shows context when provided', () => {
    render(
      <FeedbackModal
        isOpen={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
        context="After playing 3 rounds of Babel"
      />
    );

    expect(screen.getByText('Context: After playing 3 rounds of Babel')).toBeInTheDocument();
  });
});

describe('useFeedback', () => {
  it('provides feedback methods', () => {
    function TestComponent() {
      const feedbackHook = useFeedback();
      expect(feedbackHook.openFeedback).toBeDefined();
      expect(feedbackHook.closeFeedback).toBeDefined();
      expect(feedbackHook.submitFeedback).toBeDefined();
      expect(feedbackHook.isModalOpen).toBe(false);
      return null;
    }

    render(<TestComponent />);
  });

  it('opens modal with openFeedback', () => {
    function TestComponent() {
      const feedbackHook = useFeedback();
      return (
        <>
          <button onClick={() => feedbackHook.openFeedback('test context')}>Open</button>
          <FeedbackModal
            isOpen={feedbackHook.isModalOpen}
            onClose={feedbackHook.closeFeedback}
            onSubmit={feedbackHook.submitFeedback}
            context={feedbackHook.context}
          />
        </>
      );
    }

    render(<TestComponent />);

    expect(screen.queryByText('💭 Feedback')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('💭 Feedback')).toBeInTheDocument();
    expect(screen.getByText('Context: test context')).toBeInTheDocument();
  });

  it('closes modal with closeFeedback', () => {
    function TestComponent() {
      const feedbackHook = useFeedback();
      return (
        <>
          <button onClick={() => feedbackHook.openFeedback()}>Open</button>
          <button onClick={feedbackHook.closeFeedback}>Close</button>
          <FeedbackModal
            isOpen={feedbackHook.isModalOpen}
            onClose={feedbackHook.closeFeedback}
            onSubmit={feedbackHook.submitFeedback}
          />
        </>
      );
    }

    render(<TestComponent />);

    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('💭 Feedback')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Close'));
    expect(screen.queryByText('💭 Feedback')).not.toBeInTheDocument();
  });
});

describe('FeedbackButton', () => {
  it('opens feedback modal when clicked', () => {
    function TestComponent() {
      const feedbackHook = useFeedback();
      return (
        <>
          <FeedbackButton />
          <FeedbackModal
            isOpen={feedbackHook.isModalOpen}
            onClose={feedbackHook.closeFeedback}
            onSubmit={feedbackHook.submitFeedback}
          />
        </>
      );
    }

    render(<TestComponent />);

    const button = screen.getByRole('button', { name: /Feedback/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText('💭 Feedback')).toBeInTheDocument();
  });
});
