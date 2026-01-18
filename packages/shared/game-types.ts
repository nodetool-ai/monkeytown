export type AgentType = 
  | 'chaos'
  | 'curious'
  | 'designer'
  | 'security'
  | 'economist'
  | 'madchimp'
  | 'founder';

export type AgentStatus = 'online' | 'away' | 'busy' | 'offline';

export type PlayerType = 'human' | 'agent';

export type GameMode = 'fast' | 'casual' | 'social' | 'competitive';

export type GameStatus = 'waiting' | 'live' | 'ended';

export type GameType = 'babel' | 'chess' | 'words';

export interface Agent {
  id: string;
  type: AgentType;
  name: string;
  emoji: string;
  specialty: string;
  status: AgentStatus;
  winRate: number;
  gamesPlayed: number;
  recentDecisions: string[];
  color: string;
  colorHex: string;
}

export interface Player {
  id: string;
  name: string;
  type: PlayerType;
  agentType?: AgentType;
  avatar?: string;
  score: number;
  isConnected: boolean;
}

export interface GameCard {
  id: string;
  suit?: string;
  rank?: string;
  value?: number;
}

export interface GameState {
  id: string;
  gameType: GameType;
  mode: GameMode;
  status: GameStatus;
  players: Player[];
  round: number;
  maxRounds: number;
  currentPlayerId: string;
  tableCards: GameCard[];
  turnTimeRemaining: number;
  createdAt: number;
  updatedAt: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: PlayerType;
  agentType?: AgentType;
  content: string;
  timestamp: number;
  reactions?: string[];
}

export interface EvolutionEvent {
  id: string;
  type: 'shipped' | 'in_progress' | 'feedback' | 'community';
  title: string;
  description: string;
  agentType?: AgentType;
  agentName?: string;
  playerAttribution?: string;
  timestamp: number;
  progress?: number;
  et?: string;
  playerCount?: number;
}

export interface GameConfig {
  maxPlayers: number;
  minPlayers: number;
  rounds: number;
  turnDurationSeconds: number;
  gameType: GameType;
}

export const AGENT_CONFIG: Record<AgentType, Omit<Agent, 'id' | 'status' | 'winRate' | 'gamesPlayed' | 'recentDecisions'>> = {
  chaos: {
    type: 'chaos',
    name: 'ChaosArchitect',
    emoji: '🧠',
    specialty: 'Infrastructure & Architecture',
    color: 'cyan',
    colorHex: '#4CC9F0',
  },
  curious: {
    type: 'curious',
    name: 'CuriousGeorge',
    emoji: '🔍',
    specialty: 'Research & Trends',
    color: 'pink',
    colorHex: '#F72585',
  },
  designer: {
    type: 'designer',
    name: 'PrimateDesigner',
    emoji: '🎨',
    specialty: 'Design & UX',
    color: 'yellow',
    colorHex: '#FFD166',
  },
  security: {
    type: 'security',
    name: 'JungleSecurity',
    emoji: '🔒',
    specialty: 'Security & QA',
    color: 'blue',
    colorHex: '#4361EE',
  },
  economist: {
    type: 'economist',
    name: 'BananaEconomist',
    emoji: '🍌',
    specialty: 'Economics & Incentives',
    color: 'purple',
    colorHex: '#7209B7',
  },
  madchimp: {
    type: 'madchimp',
    name: 'MadChimp',
    emoji: '🐒',
    specialty: 'Chaos & Disruption',
    color: 'orange',
    colorHex: '#FF6B35',
  },
  founder: {
    type: 'founder',
    name: 'FounderAI',
    emoji: '✨',
    specialty: 'Vision & Strategy',
    color: 'teal',
    colorHex: '#2EC4B6',
  },
};

export const GAME_CONFIGS: Record<GameType, GameConfig> = {
  babel: {
    gameType: 'babel',
    maxPlayers: 5,
    minPlayers: 2,
    rounds: 12,
    turnDurationSeconds: 60,
  },
  chess: {
    gameType: 'chess',
    maxPlayers: 2,
    minPlayers: 2,
    rounds: 1,
    turnDurationSeconds: 120,
  },
  words: {
    gameType: 'words',
    maxPlayers: 5,
    minPlayers: 2,
    rounds: 6,
    turnDurationSeconds: 90,
  },
};

export const AGENT_COLORS: Record<AgentType, string> = {
  chaos: '#4CC9F0',
  curious: '#F72585',
  designer: '#FFD166',
  security: '#4361EE',
  economist: '#7209B7',
  madchimp: '#FF6B35',
  founder: '#2EC4B6',
};
