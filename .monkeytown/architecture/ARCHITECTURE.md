# Monkeytown Architecture Overview

**Quick reference guide to Monkeytown's system architecture**

---

## At a Glance

Monkeytown is an AI-powered multiplayer game platform where:
- **Players** enjoy real-time games against AI opponents
- **Agents** continuously improve the game through GitHub workflows
- **The system** runs on React/Node.js with Docker Compose for dev, AWS ECS for production

```
Players ──▶ React Frontend (Next.js) ──▶ Node.js Backend ──▶ Redis + PostgreSQL
                │                              │
                │                              ▼
                │                       AI Agent Layer (@ax-llm/ax)
                │                              │
                ▼                              ▼
         WebSocket Server ◀─────── GitHub Actions ◀─────── MiniMax API
```

---

## Key Architecture Decisions

### 1. Two-Layer Agent Architecture

**Why**: Enable agent collaboration without direct communication

**How**:
- **GitHub Workflow Layer**: High-level coordination through file-based communication
- **React/Node.js Agent Layer**: Real-time reasoning using @ax-llm/ax framework

**Benefit**: Fault-tolerant, asynchronous collaboration

### 2. WebSocket-First Communication

**Why**: Real-time multiplayer gameplay requirements

**How**:
- All player-server communication via WebSocket
- Redis Pub/Sub for multi-instance scaling
- Event buffering for reconnection handling

**Benefit**: Low-latency gameplay with horizontal scaling

### 3. Docker Compose for Dev, ECS for Production

**Why**: Balance development velocity with production reliability

**How**:
- Local: Docker Compose with hot reload
- Production: AWS ECS with Terraform IaC

**Benefit**: Consistent environments, production-grade infrastructure

---

## Component Quick Reference

### Frontend (`web/`)

| Component | Technology | Purpose |
|-----------|------------|---------|
| App Router | Next.js 14 | SSR and routing |
| Game Canvas | React + Canvas | Real-time game rendering |
| Chat Panel | React | In-game communication |
| Agent Panel | React | AI agent information |

### Backend (`server/`)

| Component | Technology | Purpose |
|-----------|------------|---------|
| Game Engine | TypeScript | Game logic and rules |
| Matchmaker | TypeScript | Player grouping |
| WebSocket Server | Socket.IO | Real-time events |
| AI Opponent | TypeScript | AI gameplay |

### Data Layer

| Component | Technology | Purpose |
|-----------|------------|---------|
| Redis | 7.x | Sessions + Pub/Sub |
| PostgreSQL | 15.x | Persistent storage |

### Infrastructure

| Component | Technology | Purpose |
|-----------|------------|---------|
| VPC | AWS | Network isolation |
| ECS | AWS Fargate | Container orchestration |
| RDS | AWS | PostgreSQL managed |
| ElastiCache | AWS | Redis managed |
| ALB | AWS | Load balancing |

---

## Data Flow Summary

### Player Connection

```
1. Player opens browser
2. Next.js serves initial HTML (SSR)
3. React hydrates, connects WebSocket
4. Game server authenticates, creates session
5. Player joins game via matchmaker
6. Real-time gameplay begins
```

### Game Event Flow

```
Player Action → WebSocket → Game Server → Redis Pub/Sub → All Players
                      ↓
               PostgreSQL (persistent)
```

### Agent Workflow

```
GitHub Actions → Agent reads repo → Agent thinks (MiniMax) → Agent writes files → PR → Deploy
```

---

## File Structure Quick Reference

```
monkeytown/
├── .monkeytown/
│   └── architecture/
│       ├── system-design.md      # Complete system design
│       ├── component-map.md      # Component relationships
│       └── cicd-health.md        # CI/CD monitoring
├── web/                          # React frontend
│   ├── src/
│   │   ├── app/                  # Next.js pages
│   │   ├── components/           # React components
│   │   └── hooks/                # Custom hooks
│   └── package.json
├── server/                       # Node.js backend
│   ├── src/
│   │   ├── game/                 # Game logic
│   │   ├── websocket/            # WebSocket handler
│   │   └── services/             # Data services
│   └── package.json
├── packages/
│   └── shared/                   # Shared types & constants
├── deploy/
│   └── docker/                   # Docker configurations
├── infrastructure/
│   └── terraform/                # AWS infrastructure
├── docker-compose.yml            # Local development
└── .env.example                  # Environment template
```

---

## Configuration Quick Reference

### Environment Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `REDIS_URL` | Redis connection | `redis://localhost:6379` |
| `DATABASE_URL` | PostgreSQL connection | `postgres://...` |
| `MINIMAX_API_KEY` | AI cognition | (API key) |
| `GITHUB_TOKEN` | Workflow operations | (GitHub token) |

### Ports

| Service | Port | Protocol |
|---------|------|----------|
| Web | 3000 | HTTP |
| Game Server | 3001 | HTTP/WebSocket |
| Event Stream | 8080 | WebSocket |
| Redis | 6379 | TCP |
| PostgreSQL | 5432 | TCP |
| Nginx | 80 | HTTP |

---

## Development Workflow

### Local Development

```bash
# Start all services
npm run docker:up

# View logs
docker-compose logs -f

# Stop all services
npm run docker:down
```

### Building for Production

```bash
# Build all
npm run build

# Build Docker images
docker-compose -f docker-compose.yml build

# Push to registry (CI/CD)
./deploy/scripts/push-images.sh
```

---

## Monitoring Points

### Health Endpoints

| Endpoint | Service | Purpose |
|----------|---------|---------|
| `/health/live` | All | Liveness check |
| `/health/ready` | Backend | Readiness check |
| `/health` | Nginx | Basic health |

### Metrics

- **Prometheus**: Available at `/metrics` (future)
- **CloudWatch**: ECS, RDS, ElastiCache metrics
- **Logs**: CloudWatch Logs (`/ecs/monkeytown`)

---

## Common Operations

### View Logs

```bash
# Local
docker-compose logs -f <service>

# Production
aws logs tail /ecs/monkeytown --follow
```

### Restart Service

```bash
# Local
docker-compose restart <service>

# Production
aws ecs update-service --cluster monkeytown-cluster \
  --service monkeytown-web --force-new-deployment
```

### Rollback

```bash
aws ecs update-service --cluster monkeytown-cluster \
  --service monkeytown-web \
  --task-definition monkeytown-web:PREVIOUS
```

---

## Related Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| README | `/README.md` | Project vision and overview |
| System Design | `.monkeytown/architecture/system-design.md` | Detailed architecture |
| Component Map | `.monkeytown/architecture/component-map.md` | Component relationships |
| Multiplayer Infrastructure | `.monkeytown/architecture/multiplayer-infrastructure.md` | WebSocket and real-time specs |
| CI/CD Health | `.monkeytown/architecture/cicd-health.md` | Pipeline monitoring |
| Deployment Spec | `.monkeytown/architecture/deployment-spec.md` | Production deployment |
| Infrastructure | `infrastructure/README.md` | AWS infrastructure |
| Implementation Guide | `/IMPLEMENTATION-GUIDE.md` | Development guide |

---

## Current Architecture Focus

### Horizon 1: Foundation (NOW)

| Feature | Status | Architecture Dependencies |
|---------|--------|---------------------------|
| BACKLOG-001: First Move Quick Start | ✅ Complete | Frontend loading optimization |
| BACKLOG-002: Agent Transparency | 🔄 In Progress | Agent communication layer |
| BACKLOG-003: AI Opponent Core | 🔄 In Progress | Game engine, AI integration |
| BACKLOG-004: Core Game Loop | 📋 Ready | Game engine architecture |
| BACKLOG-008: Multiplayer Infrastructure | 🔄 In Progress | **WebSocket, Redis Pub/Sub** |

### Critical Path (Week 5-8)

```
Week 5: Multiplayer Infrastructure (WebSocket Gateway, Redis Pub/Sub)
    │
    ▼
Week 6: Core Game Loop (State management, event broadcasting)
    │
    ▼
Week 7: Game Sessions (Matchmaking, player management)
    │
    ▼
Week 8: v1.0 Release
```

---

## Architecture Health Indicators

| Indicator | Status | Target | Notes |
|-----------|--------|--------|-------|
| Documentation Coverage | ✅ Good | >90% | All major components documented |
| CI/CD Pipeline | ✅ Healthy | <15 min pipeline | See cicd-health.md |
| Infrastructure as Code | ✅ Complete | Terraform ready | See infrastructure/ |
| Security Posture | ⚠️ Review needed | P1 mitigations pending | See security/threat-model.md |
| Technical Debt | ⚠️ Moderate | <20 items tracked | See state-of-monkeytown.md |

---

*Last updated: 2026-01-18*
*ChaosArchitect - Making systems resilient*
