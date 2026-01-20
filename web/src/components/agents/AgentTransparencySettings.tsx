'use client';

import React, { CSSProperties, useState, useEffect, useCallback } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export type TransparencyLevel = 'minimum' | 'balanced' | 'maximum';

export interface TransparencySettings {
  level: TransparencyLevel;
  showBadges: boolean;
  showIndicators: boolean;
  showMessages: boolean;
  showDecisions: boolean;
  showHistory: boolean;
}

export interface AgentTransparencySettingsProps {
  onSettingsChange?: (settings: TransparencySettings) => void;
  initialSettings?: Partial<TransparencySettings>;
  variant?: 'modal' | 'panel' | 'dropdown';
  onClose?: () => void;
}

const DEFAULT_SETTINGS: TransparencySettings = {
  level: 'balanced',
  showBadges: true,
  showIndicators: true,
  showMessages: true,
  showDecisions: true,
  showHistory: false,
};

const STORAGE_KEY = 'monkeytown-transparency-settings';

const loadSettings = (): TransparencySettings => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch {
    console.warn('Failed to load transparency settings');
  }
  return DEFAULT_SETTINGS;
};

const saveSettings = (settings: TransparencySettings): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    console.warn('Failed to save transparency settings');
  }
};

export function AgentTransparencySettings({
  onSettingsChange,
  initialSettings,
  variant = 'panel',
  onClose,
}: AgentTransparencySettingsProps) {
  const [settings, setSettings] = useState<TransparencySettings>(() => ({
    ...DEFAULT_SETTINGS,
    ...initialSettings,
  }));

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const loaded = loadSettings();
    setSettings(prev => ({ ...prev, ...loaded, ...initialSettings }));
  }, [initialSettings]);

  const updateSetting = useCallback(<K extends keyof TransparencySettings>(
    key: K,
    value: TransparencySettings[K]
  ) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      setIsDirty(true);
      return newSettings;
    });
  }, []);

  const handleSave = useCallback(() => {
    saveSettings(settings);
    setIsDirty(false);
    onSettingsChange?.(settings);
  }, [settings, onSettingsChange]);

  const handleReset = useCallback(() => {
    const defaults = { ...DEFAULT_SETTINGS };
    setSettings(defaults);
    saveSettings(defaults);
    setIsDirty(false);
    onSettingsChange?.(defaults);
  }, [onSettingsChange]);

  const applyPreset = useCallback((level: TransparencyLevel) => {
    const presets: Record<TransparencyLevel, Partial<TransparencySettings>> = {
      minimum: {
        level: 'minimum',
        showBadges: true,
        showIndicators: false,
        showMessages: false,
        showDecisions: false,
        showHistory: false,
      },
      balanced: {
        level: 'balanced',
        showBadges: true,
        showIndicators: true,
        showMessages: true,
        showDecisions: true,
        showHistory: false,
      },
      maximum: {
        level: 'maximum',
        showBadges: true,
        showIndicators: true,
        showMessages: true,
        showDecisions: true,
        showHistory: true,
      },
    };

    const newSettings = { ...settings, ...presets[level] };
    setSettings(newSettings);
    setIsDirty(true);
  }, [settings]);

  const containerStyles: CSSProperties = {
    padding: variant === 'modal' ? 'var(--space-6)' : '0',
  };

  const titleStyles: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: variant === 'dropdown' ? 'var(--text-body)' : 'var(--text-h3)',
    fontWeight: 600,
    marginBottom: 'var(--space-4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const presetContainerStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: variant === 'dropdown' ? '1fr' : 'repeat(3, 1fr)',
    gap: 'var(--space-3)',
    marginBottom: 'var(--space-6)',
  };

  const presetButtonStyles = (level: TransparencyLevel): CSSProperties => ({
    padding: 'var(--space-3)',
    borderRadius: 'var(--radius-md)',
    border: `2px solid ${settings.level === level ? 'var(--color-primary)' : 'var(--color-border-subtle)'}`,
    background: settings.level === level ? `${getPresetColor(level)}15` : 'transparent',
    cursor: 'pointer',
    textAlign: 'center' as const,
    transition: 'all var(--duration-fast) var(--ease-out)',
  });

  const getPresetColor = (level: TransparencyLevel): string => {
    switch (level) {
      case 'minimum': return 'var(--color-text-tertiary)';
      case 'balanced': return 'var(--color-primary)';
      case 'maximum': return 'var(--color-info)';
    }
  };

  const presetLabels: Record<TransparencyLevel, string> = {
    minimum: 'Minimal',
    balanced: 'Balanced',
    maximum: 'Maximum',
  };

  const presetDescriptions: Record<TransparencyLevel, string> = {
    minimum: 'Basic agent identification only',
    balanced: 'Full agent awareness with key info',
    maximum: 'Complete transparency with history',
  };

  const sectionStyles: CSSProperties = {
    marginBottom: 'var(--space-6)',
  };

  const sectionTitleStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 'var(--space-3)',
  };

  const toggleRowStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-3) 0',
    borderBottom: '1px solid var(--color-border-subtle)',
  };

  const toggleLabelStyles: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--space-1)',
  };

  const toggleNameStyles: CSSProperties = {
    fontSize: 'var(--text-body)',
    color: 'var(--color-text-primary)',
  };

  const toggleDescStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    color: 'var(--color-text-tertiary)',
  };

  const toggleSwitchStyles = (enabled: boolean): CSSProperties => ({
    width: '48px',
    height: '26px',
    borderRadius: 'var(--radius-full)',
    background: enabled ? 'var(--color-primary)' : 'var(--color-bg-elevated)',
    position: 'relative' as const,
    cursor: 'pointer',
    transition: 'background var(--duration-fast) var(--ease-out)',
  });

  const toggleKnobStyles = (enabled: boolean): CSSProperties => ({
    position: 'absolute' as const,
    top: '3px',
    left: enabled ? '25px' : '3px',
    width: '20px',
    height: '20px',
    borderRadius: 'var(--radius-full)',
    background: 'white',
    transition: 'left var(--duration-fast) var(--ease-out)',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  });

  const buttonRowStyles: CSSProperties = {
    display: 'flex',
    gap: 'var(--space-3)',
    justifyContent: 'flex-end',
    marginTop: 'var(--space-6)',
    paddingTop: 'var(--space-4)',
    borderTop: '1px solid var(--color-border-subtle)',
  };

  const infoBoxStyles: CSSProperties = {
    padding: 'var(--space-4)',
    background: `${getPresetColor(settings.level)}10`,
    borderRadius: 'var(--radius-md)',
    border: `1px solid ${getPresetColor(settings.level)}30`,
    marginBottom: 'var(--space-6)',
  };

  const infoTextStyles: CSSProperties = {
    fontSize: 'var(--text-caption)',
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-relaxed)',
  };

  return (
    <div style={containerStyles} data-testid="transparency-settings">
      <div style={titleStyles}>
        <span>Agent Transparency</span>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '1.5rem',
              padding: 0,
              lineHeight: 1,
            }}
          >
            ×
          </button>
        )}
      </div>

      <div style={infoBoxStyles}>
        <p style={infoTextStyles}>
          Transparency helps you understand when you&apos;re playing against AI agents.
          Choose how much information you want to see about AI players.
        </p>
      </div>

      <div style={sectionStyles}>
        <h4 style={sectionTitleStyles}>Transparency Presets</h4>
        <div style={presetContainerStyles}>
          {(Object.keys(presetLabels) as TransparencyLevel[]).map(level => (
            <button
              key={level}
              style={presetButtonStyles(level)}
              onClick={() => applyPreset(level)}
            >
              <div style={{ marginBottom: 'var(--space-2)' }}>
                <Badge
                  variant={settings.level === level ? 'info' : 'default'}
                  size="sm"
                >
                  {presetLabels[level]}
                </Badge>
              </div>
              <div style={{ fontSize: 'var(--text-caption)', color: 'var(--color-text-secondary)' }}>
                {presetDescriptions[level]}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div style={sectionStyles}>
        <h4 style={sectionTitleStyles}>Display Options</h4>

        <div style={toggleRowStyles}>
          <div style={toggleLabelStyles}>
            <span style={toggleNameStyles}>Agent Badges</span>
            <span style={toggleDescStyles}>Show AI labels on agent profiles</span>
          </div>
          <button
            style={toggleSwitchStyles(settings.showBadges)}
            onClick={() => updateSetting('showBadges', !settings.showBadges)}
          >
            <div style={toggleKnobStyles(settings.showBadges)} />
          </button>
        </div>

        <div style={toggleRowStyles}>
          <div style={toggleLabelStyles}>
            <span style={toggleNameStyles}>Presence Indicators</span>
            <span style={toggleDescStyles}>Show agent status in game canvas</span>
          </div>
          <button
            style={toggleSwitchStyles(settings.showIndicators)}
            onClick={() => updateSetting('showIndicators', !settings.showIndicators)}
          >
            <div style={toggleKnobStyles(settings.showIndicators)} />
          </button>
        </div>

        <div style={toggleRowStyles}>
          <div style={toggleLabelStyles}>
            <span style={toggleNameStyles}>Agent Messages</span>
            <span style={toggleDescStyles}>Prefix AI messages with emoji</span>
          </div>
          <button
            style={toggleSwitchStyles(settings.showMessages)}
            onClick={() => updateSetting('showMessages', !settings.showMessages)}
          >
            <div style={toggleKnobStyles(settings.showMessages)} />
          </button>
        </div>

        <div style={toggleRowStyles}>
          <div style={toggleLabelStyles}>
            <span style={toggleNameStyles}>Decision Logs</span>
            <span style={toggleDescStyles}>Show agent reasoning for moves</span>
          </div>
          <button
            style={toggleSwitchStyles(settings.showDecisions)}
            onClick={() => updateSetting('showDecisions', !settings.showDecisions)}
          >
            <div style={toggleKnobStyles(settings.showDecisions)} />
          </button>
        </div>

        <div style={toggleRowStyles}>
          <div style={toggleLabelStyles}>
            <span style={toggleNameStyles}>Agent History</span>
            <span style={toggleDescStyles}>Display learning trajectory (Maximum only)</span>
          </div>
          <button
            style={toggleSwitchStyles(settings.showHistory)}
            onClick={() => updateSetting('showHistory', !settings.showHistory)}
            disabled={settings.level !== 'maximum'}
          >
            <div style={toggleKnobStyles(settings.showHistory)} />
          </button>
        </div>
      </div>

      <div style={buttonRowStyles}>
        <Button variant="ghost" onClick={handleReset}>
          Reset to Defaults
        </Button>
        {isDirty && (
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}

export function useAgentTransparency() {
  const [settings, setSettings] = useState<TransparencySettings>(() => loadSettings());

  const updateSetting = useCallback(<K extends keyof TransparencySettings>(
    key: K,
    value: TransparencySettings[K]
  ) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      saveSettings(newSettings);
      return newSettings;
    });
  }, []);

  const setLevel = useCallback((level: TransparencyLevel) => {
    const presets: Record<TransparencyLevel, Partial<TransparencySettings>> = {
      minimum: {
        showBadges: true,
        showIndicators: false,
        showMessages: false,
        showDecisions: false,
        showHistory: false,
      },
      balanced: {
        showBadges: true,
        showIndicators: true,
        showMessages: true,
        showDecisions: true,
        showHistory: false,
      },
      maximum: {
        showBadges: true,
        showIndicators: true,
        showMessages: true,
        showDecisions: true,
        showHistory: true,
      },
    };

    setSettings(prev => {
      const newSettings = { ...prev, level, ...presets[level] };
      saveSettings(newSettings);
      return newSettings;
    });
  }, []);

  return {
    settings,
    updateSetting,
    setLevel,
    resetSettings: () => {
      const defaults = { ...DEFAULT_SETTINGS };
      setSettings(defaults);
      saveSettings(defaults);
    },
  };
}
