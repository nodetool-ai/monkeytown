import { v4 as uuid } from 'uuid';
import type { GameConfig, GameSession } from './types.js';
import { GameServer } from './server.js';

export class Matchmaker {
  private pendingPlayers: Map<string, PendingPlayer> = new Map();
  private gameServer: GameServer;

  constructor(gameServer: GameServer) {
    this.gameServer = gameServer;
  }

  async findOrCreateGame(playerId: string, preferences: PlayerPreferences): Promise<GameSession> {
    const existingSession = this.findCompatibleSession(preferences);
    if (existingSession) {
      return existingSession;
    }

    return this.createNewGame(playerId, preferences);
  }

  private findCompatibleSession(preferences: PlayerPreferences): GameSession | null {
    for (const [, pending] of this.pendingPlayers) {
      if (this.isCompatible(pending.preferences, preferences)) {
        return pending.session;
      }
    }
    return null;
  }

  private async createNewGame(playerId: string, preferences: PlayerPreferences): Promise<GameSession> {
    const config: GameConfig = {
      maxPlayers: 4,
      duration: preferences.duration || 300,
      rules: {
        allowChat: true,
        allowSpectators: true,
        friendlyFire: false,
        winCondition: 'score',
      },
      aiDifficulty: preferences.aiDifficulty || 'medium',
    };

    const session = await this.gameServer.createSession(config);
    
    this.pendingPlayers.set(uuid(), {
      playerId,
      session,
      preferences,
      joinedAt: Date.now(),
    });

    return session;
  }

  private isCompatible(prefs1: PlayerPreferences, prefs2: PlayerPreferences): boolean {
    if (prefs1.gameType !== prefs2.gameType) return false;
    if (Math.abs((prefs1.duration || 300) - (prefs2.duration || 300)) > 60) return false;
    return true;
  }

  async removePendingPlayer(playerId: string): Promise<void> {
    for (const [key, pending] of this.pendingPlayers) {
      if (pending.playerId === playerId) {
        this.pendingPlayers.delete(key);
        break;
      }
    }
  }

  getQueueStats(): QueueStats {
    return {
      pendingCount: this.pendingPlayers.size,
      averageWaitTime: this.calculateAverageWaitTime(),
    };
  }

  private calculateAverageWaitTime(): number {
    if (this.pendingPlayers.size === 0) return 0;

    const now = Date.now();
    let total = 0;
    for (const [, pending] of this.pendingPlayers) {
      total += now - pending.joinedAt;
    }
    return total / this.pendingPlayers.size;
  }
}

interface PendingPlayer {
  playerId: string;
  session: GameSession;
  preferences: PlayerPreferences;
  joinedAt: number;
}

interface PlayerPreferences {
  gameType?: string;
  duration?: number;
  aiDifficulty?: 'easy' | 'medium' | 'hard';
  minRank?: number;
  maxRank?: number;
}

interface QueueStats {
  pendingCount: number;
  averageWaitTime: number;
}
