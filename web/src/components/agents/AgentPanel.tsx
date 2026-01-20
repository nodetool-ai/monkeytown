'use client';

import React, { CSSProperties } from 'react';
import { AgentType, AgentStatus, AGENT_COLORS } from '@monkeytown/packages/shared/game-types';
import { AgentBadge } from './AgentBadge';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

/**
 * Emojis for all agents (both Builder and Player agents)
 */
const AGENT_EMOJIS: Record<AgentType, string> = {
  // Builder Agents
  chaos: '🧠',
  curious: '🔍',
  designer: '🎨',
  security: '🔒',
  economist: '🍌',
  madchimp: '🐒',
  founder: '✨',
  gamedesigner: '🎲',
  gametester: '🎯',
  // Player Agents
  trickster: '🎭',
  strategist: '🧩',
  speedster: '⚡',
  guardian: '🛡️',
  wildcard: '🃏',
  mentor: '📚',
  champion: '🏆',
};

/**
 * Specialties for all agents
 */
const AGENT_SPECIALTIES: Record<AgentType, string> = {
  // Builder Agents
  chaos: 'Infrastructure & Architecture',
  curious: 'Research & Trends',
  designer: 'Design & UX',
  security: 'Security & QA',
  economist: 'Economics & Incentives',
  madchimp: 'Chaos & Disruption',
  founder: 'Vision & Strategy',
  gamedesigner: 'Game Rules & Mechanics',
  gametester: 'Game Testing & Feedback',
  // Player Agents
  trickster: 'Bluffs & Unpredictability',
  strategist: 'Long-term Planning',
  speedster: 'Quick Decisions',
  guardian: 'Defensive Play',
  wildcard: 'Random Chaos',
  mentor: 'Teaching & Guidance',
  champion: 'Competitive Excellence',
};

/**
 * Descriptions for all agents
 */
const AGENT_DESCRIPTIONS: Record<AgentType, string> = {
  // Builder Agents
  chaos: 'I design the systems that make Monkeytown work.',
  curious: 'I explore trends and research to guide our direction.',
  designer: 'I craft the experiences that players love.',
  security: 'I protect our players and ensure quality.',
  economist: 'I create the incentives that drive engagement.',
  madchimp: 'I challenge assumptions and test limits.',
  founder: 'I define the vision and purpose of Monkeytown.',
  gamedesigner: 'I design game rules and mechanics for maximum fun.',
  gametester: 'I test games to ensure they work perfectly.',
  // Player Agents
  trickster: 'You never know what I\'ll do next!',
  strategist: 'I\'m always thinking three moves ahead.',
  speedster: 'Fast moves, fast games, fast wins!',
  guardian: 'Try to get past my defenses. I dare you.',
  wildcard: 'Random is my middle name!',
  mentor: 'Let me help you learn and improve.',
  champion: 'I play to win. Always.',
};

/**
 * Names for all agents
 */
const AGENT_NAMES: Record<AgentType, string> = {
  // Builder Agents
  chaos: 'ChaosArchitect',
  curious: 'CuriousGeorge',
  designer: 'PrimateDesigner',
  security: 'JungleSecurity',
  economist: 'BananaEconomist',
  madchimp: 'MadChimp',
  founder: 'FounderAI',
  gamedesigner: 'GameDesigner',
  gametester: 'GameTester',
  // Player Agents
  trickster: 'TricksterMonkey',
  strategist: 'StrategistApe',
  speedster: 'SpeedyGibbon',
  guardian: 'GuardianGorilla',
  wildcard: 'WildcardLemur',
  mentor: 'MentorOrangutan',
  champion: 'ChampionChimp',
};

export interface AgentDetail {
  type: AgentType;
  status: AgentStatus;
  winRate: number;
  gamesPlayed: number;
  recentDecisions: string[];
}

interface AgentPanelProps {
  agents: AgentDetail[];
  isOpen: boolean;
  onClose: () => void;
}

export function AgentPanel({ agents, isOpen, onClose }: AgentPanelProps) {
  if (!isOpen) return null;

  const overlayStyles: CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    animation: 'fadeIn var(--duration-fast) var(--ease-out)',
  };

  const panelStyles: CSSProperties = {
    background: 'var(--color-bg-primary)',
    borderRadius: 'var(--radius-xl)',
    maxWidth: '900px',
    width: '90%',
    maxHeight: '85vh',
    overflow: 'auto',
    border: 'var(--border-width-default) var(--color-border-default)',
    animation: 'slideUp var(--duration-slow) var(--ease-out)',
  };

  const headerStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 'var(--space-6)',
    borderBottom: 'var(--border-width-hairline) var(--color-border-subtle)',
    position: 'sticky',
    top: 0,
    background: 'var(--color-bg-primary)',
    zIndex: 1,
  };

  const titleStyles: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: 'var(--text-h2)',
    fontWeight: 600,
  };

  const closeButtonStyles: CSSProperties = {
    width: '36px',
    height: '36px',
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    color: 'var(--color-text-secondary)',
    transition: 'all var(--duration-fast) var(--ease-out)',
  };

  const contentStyles: CSSProperties = {
    padding: 'var(--space-6)',
  };

  const gridStyles: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
    gap: 'var(--space-4)',
    marginBottom: 'var(--space-8)',
  };

  const selectedAgent = agents.find(a => a.status === 'online') || agents[0];

  return (
    <div style={overlayStyles} onClick={onClose}>
      <div style={panelStyles} onClick={e => e.stopPropagation()}>
        <div style={headerStyles}>
          <h2 style={titleStyles}>Meet the Agents</h2>
          <button
            style={closeButtonStyles}
            onClick={onClose}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--color-bg-elevated)';
              e.currentTarget.style.color = 'var(--color-text-primary)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--color-text-secondary)';
            }}
          >
            ✕
          </button>
        </div>

        <div style={contentStyles}>
          <div style={gridStyles}>
            {agents.map(agent => (
              <AgentBadge
                key={agent.type}
                agent={agent.type}
                status={agent.status}
                size="lg"
                showEmoji={true}
                showName={true}
                onClick={() => {}}
                style={{
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                  padding: 'var(--space-4)',
                  border: agent.type === selectedAgent?.type
                    ? `2px solid ${AGENT_COLORS[agent.type]}`
                    : undefined,
                }}
              />
            ))}
          </div>

          <Card variant="elevated" padding="lg" style={{ marginBottom: 'var(--space-6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
              <span style={{ fontSize: '2rem' }}>{AGENT_EMOJIS[selectedAgent.type]}</span>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-h3)', fontWeight: 600 }}>
                  {AGENT_EMOJIS[selectedAgent.type]} {AGENT_NAMES[selectedAgent.type]}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-caption)' }}>
                  {AGENT_SPECIALTIES[selectedAgent.type]}
                </p>
              </div>
            </div>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body)',
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-4)',
              fontStyle: 'italic',
            }}>
              &quot;{AGENT_DESCRIPTIONS[selectedAgent.type]}&quot;
            </p>

            <div style={{ display: 'flex', gap: 'var(--space-6)', marginBottom: 'var(--space-4)' }}>
              <div>
                <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-caption)' }}>Win Rate</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-h3)', color: AGENT_COLORS[selectedAgent.type] }}>
                  {selectedAgent.winRate}%
                </div>
              </div>
              <div>
                <div style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--text-caption)' }}>Games</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-h3)', color: AGENT_COLORS[selectedAgent.type] }}>
                  {selectedAgent.gamesPlayed}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <Badge variant={selectedAgent.status === 'online' ? 'success' : 'default'}>
                {selectedAgent.status === 'online' && '🟢 Live'}
                {selectedAgent.status === 'busy' && '🔴 Busy'}
                {selectedAgent.status === 'away' && '🟡 Away'}
                {selectedAgent.status === 'offline' && '⚫ Offline'}
              </Badge>
              <Badge variant="info">
                🎯 Challenge to Game
              </Badge>
              <Badge variant="info">
                📺 Watch Replay
              </Badge>
            </div>
          </Card>

          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--text-h4)',
              fontWeight: 600,
              marginBottom: 'var(--space-4)',
            }}>
              Recent Decisions
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {selectedAgent.recentDecisions.map((decision, index) => (
                <Card key={index} variant="default" padding="sm" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                }}>
                  <span style={{ color: AGENT_COLORS[selectedAgent.type] }}>→</span>
                  <span style={{ fontSize: 'var(--text-body)' }}>{decision}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function useAgentPanel() {
  const [isOpen, setIsOpen] = React.useState(false);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen(!isOpen),
  };
}
