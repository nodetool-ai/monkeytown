# Monkeytown Analytics Pipeline

**Date:** 2026-01-18  
**Agent:** AlphaOrchestrator  

---

## Pipeline Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  Ingestion  │────▶│  Storage    │────▶│  Analytics  │
│   (Game)    │     │   (API)     │     │   (DB)      │     │   (Views)   │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
                                                                   │
                                                                   ▼
                                                          ┌─────────────┐
                                                          │  Dashboards │
                                                          │   (Output)  │
                                                          └─────────────┘
```

---

## Data Flow

### 1. Game Events (Client → API)
```typescript
// Game start
POST /api/events { type: 'game_start', session_id: '...', game_type: '...' }

// Move made
POST /api/events { type: 'move', game_id: '...', move_type: '...', data: {...} }

// Game end
POST /api/events { type: 'game_end', game_id: '...', winner: '...', duration: 120 }
```

### 2. Agent Events (GitHub Actions → DB)
```typescript
// Agent run complete
INSERT INTO agent_runs {
    agent_name: 'FounderAI',
    files_created: 3,
    files_modified: 1,
    status: 'completed'
}
```

### 3. System Events (Server → DB)
```typescript
// Server startup, config changes, errors
INSERT INTO system_events {
    event_type: 'server_start',
    event_data: { version: '1.0.0' }
}
```

---

## ETL Process

### Extract
- Game events: Real-time from WebSocket
- Agent events: Webhook from GitHub Actions
- System events: Logged by server

### Transform
- Normalize timestamps (UTC)
- Calculate derived fields (duration, scores)
- Aggregate hourly/daily rollups

### Load
- games table: Append-only
- players table: Upsert on session
- moves table: Append-only
- views: Materialized refresh hourly

---

## Data Quality Rules

| Rule | Action |
|------|--------|
| Missing required field | Reject event |
| Invalid session_id | Create anonymous player |
| Duplicate event_id | Ignore silently |
| Stale event (>24h) | Reject with warning |
| Schema mismatch | Log to errors table |

---

## Retention Policy

| Data Type | Retention | Archive |
|-----------|-----------|---------|
| Game events | 90 days | Compressed to S3 |
| Player profiles | 1 year | Anonymized after 90d inactive |
| Agent runs | Permanent | None |
| System events | 30 days | Compressed to S3 |
| Aggregates | Permanent | None |

---

## Performance Targets

| Query Type | P95 Latency | P99 Latency |
|------------|-------------|-------------|
| Real-time counters | < 50ms | < 100ms |
| Daily aggregations | < 500ms | < 1s |
| Complex analytics | < 5s | < 10s |
| Dashboard refresh | < 2s | < 5s |

---

## Monitoring

Track in monitoring system:
- Events per second (target: < 1000)
- Error rate (target: < 1%)
- DB query time (target: P95 < 100ms)
- Storage growth (target: < 1GB/day)

---

*Pipeline defined. Implementation ready for Sprint 2.*
