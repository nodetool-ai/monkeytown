# ADR-002: WebSocket-First Communication

**Status:** Accepted
**Date:** 2026-01-18
**Decision Makers:** ChaosArchitect

## Context

Monkeytown is a real-time multiplayer game platform requiring:
- Low-latency player-to-server communication (<100ms P95)
- 60Hz update capability for action games
- Bidirectional push from server to clients
- Support for 1000+ concurrent players per instance

Traditional HTTP request-response patterns cannot meet these requirements.

## Decision

Use WebSocket for all real-time player-server communication:

1. **Connection Protocol**: Socket.IO for WebSocket connections
2. **State Distribution**: Redis Pub/Sub for multi-instance event fanout
3. **Fallback**: Long-polling for environments that block WebSocket

### Message Protocol

```typescript
// Client → Server
type ClientMessage =
  | { type: 'join_game'; payload: { gameId: string } }
  | { type: 'player_input'; payload: { action: InputAction } }
  | { type: 'chat_message'; payload: { text: string } }
  | { type: 'heartbeat'; payload: { timestamp: number } };

// Server → Client  
type ServerMessage =
  | { type: 'game_state'; payload: GameState }
  | { type: 'player_joined'; payload: Player }
  | { type: 'player_left'; payload: { playerId: string } }
  | { type: 'game_event'; payload: GameEvent }
  | { type: 'error'; payload: { code: string; message: string } };
```

### Connection Flow

```
Player Action → WebSocket → Game Server → Redis Pub/Sub → All Players
                       ↓
                PostgreSQL (persistent)
```

## Consequences

### Positive
- **Low latency**: Sub-100ms round-trip for game events
- **Real-time updates**: Server can push to clients immediately
- **Horizontal scaling**: Redis Pub/Sub enables multi-instance fanout
- **Connection state**: Server maintains awareness of player connections

### Negative
- **Complexity**: Connection management is more complex than REST
- **Stateful**: Server must track connection state
- **Reconnection**: Need handling for dropped connections

### Neutral
- All REST API endpoints remain for non-real-time operations
- WebSocket is the primary data path during active gameplay

## Alternatives Considered

### Alternative 1: Server-Sent Events (SSE)
- Pros: Simpler than WebSocket, one-way push
- Cons: No bidirectional, would need REST for client→server
- Why rejected: Game input requires bidirectional communication

### Alternative 2: HTTP Long Polling
- Pros: Works everywhere, simpler server implementation
- Cons: Higher latency, more overhead per message
- Why rejected: Cannot achieve <100ms P95 latency target

### Alternative 3: WebRTC Data Channels
- Pros: Peer-to-peer possible, lower latency
- Cons: Complexity, NAT traversal issues
- Why rejected: Overkill for current requirements; may reconsider for voice chat

## References

- [Multiplayer Infrastructure](../multiplayer-infrastructure.md) - Detailed WebSocket spec
- [Component Map](../component-map.md) - Connection flow diagrams
- [Threat Model](../../security/threat-model.md) - WebSocket security considerations

---

*ChaosArchitect - Real-time by design*
