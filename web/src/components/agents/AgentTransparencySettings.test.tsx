import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { AgentTransparencySettings, useAgentTransparency, TransparencyLevel } from './AgentTransparencySettings';

describe('AgentTransparencySettings', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('renders with default settings', () => {
    render(<AgentTransparencySettings />);
    expect(screen.getByTestId('transparency-settings')).toBeInTheDocument();
  });

  it('renders title correctly', () => {
    render(<AgentTransparencySettings />);
    expect(screen.getByText('Agent Transparency')).toBeInTheDocument();
  });

  it('renders preset buttons', () => {
    render(<AgentTransparencySettings />);
    expect(screen.getByText('Minimal')).toBeInTheDocument();
    expect(screen.getByText('Balanced')).toBeInTheDocument();
    expect(screen.getByText('Maximum')).toBeInTheDocument();
  });

  it('applies minimum preset when clicked', () => {
    render(<AgentTransparencySettings />);
    fireEvent.click(screen.getByText('Minimal'));
    expect(screen.getByText('Minimal')).toBeInTheDocument();
  });

  it('applies balanced preset when clicked', () => {
    render(<AgentTransparencySettings />);
    fireEvent.click(screen.getByText('Balanced'));
    expect(screen.getByText('Balanced')).toBeInTheDocument();
  });

  it('applies maximum preset when clicked', () => {
    render(<AgentTransparencySettings />);
    fireEvent.click(screen.getByText('Maximum'));
    expect(screen.getByText('Maximum')).toBeInTheDocument();
  });

  it('renders toggle switches', () => {
    render(<AgentTransparencySettings />);
    expect(screen.getByText('Agent Badges')).toBeInTheDocument();
    expect(screen.getByText('Presence Indicators')).toBeInTheDocument();
    expect(screen.getByText('Agent Messages')).toBeInTheDocument();
    expect(screen.getByText('Decision Logs')).toBeInTheDocument();
    expect(screen.getByText('Agent History')).toBeInTheDocument();
  });

  it('toggles Agent Badges when clicked', () => {
    render(<AgentTransparencySettings />);
    const toggle = screen.getByText('Agent Badges').closest('div')?.nextElementSibling as HTMLElement;
    fireEvent.click(toggle);
    expect(toggle).toBeInTheDocument();
  });

  it('toggles Presence Indicators when clicked', () => {
    render(<AgentTransparencySettings />);
    const toggle = screen.getByText('Presence Indicators').closest('div')?.nextElementSibling as HTMLElement;
    fireEvent.click(toggle);
    expect(toggle).toBeInTheDocument();
  });

  it('toggles Agent Messages when clicked', () => {
    render(<AgentTransparencySettings />);
    const toggle = screen.getByText('Agent Messages').closest('div')?.nextElementSibling as HTMLElement;
    fireEvent.click(toggle);
    expect(toggle).toBeInTheDocument();
  });

  it('toggles Decision Logs when clicked', () => {
    render(<AgentTransparencySettings />);
    const toggle = screen.getByText('Decision Logs').closest('div')?.nextElementSibling as HTMLElement;
    fireEvent.click(toggle);
    expect(toggle).toBeInTheDocument();
  });

  it('shows save button when settings are changed', () => {
    render(<AgentTransparencySettings />);
    const toggle = screen.getByText('Agent Badges').closest('div')?.nextElementSibling as HTMLElement;
    fireEvent.click(toggle);
    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  it('shows reset button', () => {
    render(<AgentTransparencySettings />);
    expect(screen.getByText('Reset to Defaults')).toBeInTheDocument();
  });

  it('calls onSettingsChange when save is clicked', () => {
    const handleSettingsChange = vi.fn();
    render(<AgentTransparencySettings onSettingsChange={handleSettingsChange} />);
    
    const toggle = screen.getByText('Agent Badges').closest('div')?.nextElementSibling as HTMLElement;
    fireEvent.click(toggle);
    fireEvent.click(screen.getByText('Save Changes'));
    
    expect(handleSettingsChange).toHaveBeenCalledTimes(1);
  });

  it('closes when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<AgentTransparencySettings onClose={handleClose} />);
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('renders modal variant', () => {
    render(<AgentTransparencySettings variant="modal" />);
    const container = screen.getByTestId('transparency-settings');
    expect(container).toBeInTheDocument();
  });

  it('renders panel variant', () => {
    render(<AgentTransparencySettings variant="panel" />);
    const container = screen.getByTestId('transparency-settings');
    expect(container).toBeInTheDocument();
  });

  it('renders dropdown variant', () => {
    render(<AgentTransparencySettings variant="dropdown" />);
    const container = screen.getByTestId('transparency-settings');
    expect(container).toBeInTheDocument();
  });

  it('applies initial settings', () => {
    render(<AgentTransparencySettings initialSettings={{ level: 'minimum' }} />);
    expect(screen.getByText('Minimal')).toBeInTheDocument();
  });

  it('disables Agent History toggle when not maximum level', () => {
    render(<AgentTransparencySettings initialSettings={{ level: 'balanced' }} />);
    const toggle = screen.getByText('Agent History').closest('div')?.nextElementSibling as HTMLElement;
    expect(toggle).toBeInTheDocument();
  });
});

describe('useAgentTransparency', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('returns default settings', () => {
    const { result } = renderHook(() => useAgentTransparency());
    expect(result.current.settings.level).toBe('balanced');
    expect(result.current.settings.showBadges).toBe(true);
    expect(result.current.settings.showIndicators).toBe(true);
    expect(result.current.settings.showMessages).toBe(true);
    expect(result.current.settings.showDecisions).toBe(true);
    expect(result.current.settings.showHistory).toBe(false);
  });

  it('updates setting', () => {
    const { result } = renderHook(() => useAgentTransparency());
    
    act(() => {
      result.current.updateSetting('showBadges', false);
    });
    
    expect(result.current.settings.showBadges).toBe(false);
  });

  it('sets level', () => {
    const { result } = renderHook(() => useAgentTransparency());
    
    act(() => {
      result.current.setLevel('minimum');
    });
    
    expect(result.current.settings.level).toBe('minimum');
    expect(result.current.settings.showIndicators).toBe(false);
    expect(result.current.settings.showMessages).toBe(false);
    expect(result.current.settings.showDecisions).toBe(false);
  });

  it('resets settings', () => {
    const { result } = renderHook(() => useAgentTransparency());
    
    act(() => {
      result.current.updateSetting('showBadges', false);
      result.current.resetSettings();
    });
    
    expect(result.current.settings.showBadges).toBe(true);
  });
});

import { act } from 'react';
import { renderHook } from '@testing-library/react';
