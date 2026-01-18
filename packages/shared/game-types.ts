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

export const BABEL_DECK_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

export interface BabelCard {
  id: string;
  value: number;
  suit?: 'stone' | 'brick' | 'wood' | 'glass';
}

export interface BabelPlayerState {
  playerId: string;
  hand: BabelCard[];
  score: number;
  towerHeight: number;
  cardsPlayed: number;
}

export interface BabelGameState {
  id: string;
  gameType: 'babel';
  mode: GameMode;
  status: 'waiting' | 'playing' | 'round_end' | 'game_end';
  players: Player[];
  currentRound: number;
  maxRounds: number;
  currentPlayerIndex: number;
  deck: BabelCard[];
  tableCards: BabelCard[];
  playerStates: Map<string, BabelPlayerState>;
  turnStartTime: number;
  turnDurationSeconds: number;
  turnTimerActive: boolean;
  createdAt: number;
  updatedAt: number;
  winnerId?: string;
  gameLog: BabelGameLogEntry[];
}

export interface BabelGameLogEntry {
  id: string;
  timestamp: number;
  type: 'card_played' | 'turn_skipped' | 'round_complete' | 'game_complete' | 'tower_collapse' | 'special_action';
  playerId: string;
  card?: BabelCard;
  details: Record<string, unknown>;
}

export interface BabelAction {
  type: 'play_card' | 'pass' | 'special_babel_tower';
  cardId?: string;
  targetPlayerId?: string;
}

export const BABEL_SPECIAL_ACTIONS = {
  SABOTAGE: {
    name: 'Sabotage',
    description: 'Remove one card from another player\'s tower',
    minValue: 15,
    actionType: 'sabotage',
  },
  BOOST: {
    name: 'Boost',
    description: 'Add +5 to your tower height',
    minValue: 10,
    actionType: 'boost',
  },
  STEAL: {
    name: 'Steal',
    description: 'Take a card from the table',
    minValue: 8,
    actionType: 'steal',
  },
} as const;

export type BabelSpecialActionType = keyof typeof BABEL_SPECIAL_ACTIONS;

export function isBabelCard(card: unknown): card is BabelCard {
  return typeof card === 'object' && card !== null &&
    'id' in card && 'value' in card &&
    typeof (card as BabelCard).value === 'number';
}

export function createBabelDeck(): BabelCard[] {
  const deck: BabelCard[] = [];
  const suits: Array<'stone' | 'brick' | 'wood' | 'glass'> = ['stone', 'brick', 'wood', 'glass'];
  let cardId = 0;

  for (const suit of suits) {
    for (const value of BABEL_DECK_VALUES) {
      deck.push({
        id: `babel-${cardId++}`,
        value,
        suit,
      });
    }
  }

  return shuffleDeck(deck);
}

function shuffleDeck<T>(deck: T[]): T[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function dealInitialHands(deck: BabelCard[], playerCount: number): BabelCard[][] {
  const hands: BabelCard[][] = Array.from({ length: playerCount }, () => []);
  const cardsPerPlayer = 5;

  for (let i = 0; i < cardsPerPlayer; i++) {
    for (const hand of hands) {
      if (deck.length > 0) {
        hand.push(deck.pop()!);
      }
    }
  }

  return hands;
}
