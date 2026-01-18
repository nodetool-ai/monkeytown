export interface WebSocket {
  send(data: string): void;
  close(): void;
  onmessage: ((event: { data: string }) => void) | null;
  onclose: ((event: { code: number; reason: string }) => void) | null;
}

export interface EventHandler {
  (event: string, data: unknown): Promise<void> | void;
}

export interface ConnectionManager {
  socket: WebSocket;
  connectedAt: number;
  subscriptions: Set<string>;
}
