export interface EventHandler {
  (event: string, data: unknown): Promise<void> | void;
}

export interface ConnectionInfo {
  socketId: string;
  playerId: string;
  connectedAt: number;
  subscriptions: Set<string>;
}

export interface ConnectionStats {
  totalConnections: number;
  connectionsById: string[];
}
