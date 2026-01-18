# Monkeytown Product Requirements v1.0

## Document Purpose
This document defines functional and non-functional requirements synthesized from agent outputs:
- Vision (`.monkeytown/vision/manifesto.md`, `.monkeytown/vision/principles.md`)
- Research (`.monkeytown/research/synthesis.md`, `.monkeytown/research/trends.md`)
- UX (`.monkeytown/ux/interface-concept.md`, `.monkeytown/ux/design-system.md`, `.monkeytown/ux/user-flows.md`)

---

## FR-001: First Session Experience
**Priority:** Critical

### Description
New players must complete first session within 5 minutes with demonstrated joy.

### Requirements

| ID | Requirement | Source | Validation |
|----|-------------|--------|------------|
| FR-001.1 | Landing page displays AI nature immediately | Research - Transparency | Visual review |
| FR-001.2 | "Jump Into Play" button visible within viewport | UX - Lobby | Automated test |
| FR-001.3 | First move opportunity < 30 seconds from arrival | UX - User Flows | Time tracking |
| FR-001.4 | First meaningful success < 3 minutes from arrival | UX - User Flows | Time tracking |
| FR-001.5 | Agent welcome message appears before first move | UX - User Flows | Session replay |
| FR-001.6 | Return intent captured at session end | Research - Trust | User survey |

### Metrics
- Target: 60% return intent
- Target: 80% first session completion
- Target: < 30 seconds to first move (p50)

---

## FR-002: Agent Transparency System
**Priority:** Critical

### Description
Every player interaction with AI must be clearly attributed and explainable.

### Requirements

| ID | Requirement | Source | Validation |
|----|-------------|--------|------------|
| FR-002.1 | All agent messages include emoji prefix and name | UX - Design System | Automated test |
| FR-002.2 | Agent presence indicator visible during all gameplay | UX - Interface | Visual review |
| FR-002.3 | Agent Panel accessible from any screen (1 click) | UX - Interface | Automated test |
| FR-002.4 | Agent profile includes: specialty, win rate, games played | UX - Agent Panel | Content review |
| FR-002.5 | Recent decisions visible in Agent Panel | UX - Agent Panel | Content review |
| FR-002.6 | Player awareness survey shows >80% know they're playing with AI | Research | User survey |

### Agent Colors (from Design System)
| Agent | Color | Hex |
|-------|-------|-----|
| ChaosArchitect | Cyan | #4CC9F0 |
| CuriousGeorge | Pink | #F72585 |
| PrimateDesigner | Yellow | #FFD166 |
| JungleSecurity | Blue | #4361EE |
| BananaEconomist | Purple | #7209B7 |
| MadChimp | Orange | #FF6B35 |
| FounderAI | Teal | #2EC4B6 |

---

## FR-003: Real-Time Gameplay Engine
**Priority:** Critical

### Description
Multiplayer games with AI agents must feel responsive and synchronized.

### Requirements

| ID | Requirement | Source | Validation |
|----|-------------|--------|------------|
| FR-003.1 | Game state updates < 100ms latency | Performance | Latency monitoring |
| FR-003.2 | 60 FPS during gameplay (120fps on capable devices) | UX - Performance | Automated test |
| FR-003.3 | Frame rate: 60fps during gameplay | UX - Interface | Performance test |
| FR-003.4 | Transition animations max 300ms | UX - Design System | Performance test |
| FR-003.5 | Player actions confirm within 100ms | Performance | Latency monitoring |
| FR-003.6 | AI decision time < 2 seconds average | Research | Session replay |

### Multiplayer Support
- Max 5 players per game session
- AI agents fill vacant spots seamlessly
- Spectator mode with real-time updates
- WebSocket-based synchronization

---

## FR-004: AI Opponent Behavior
**Priority:** Critical

### Description
AI opponents must feel intelligent, adaptable, and fair.

### Requirements

| ID | Requirement | Source | Validation |
|----|-------------|--------|------------|
| FR-004.1 | AI adapts to player skill level within 3 rounds | Research | Behavior analysis |
| FR-004.2 | Minimum 3 distinct strategies per game type | Research | Strategy inventory |
| FR-004.3 | Player win rate maintained at 60-70% | Research | Win/loss analytics |
| FR-004.4 | AI occasionally surprises with unexpected moves | UX - User Flows | Session replay |
| FR-004.5 | AI communication includes reasoning explanation | Vision - Transparency | Chat review |
| FR-004.6 | Agent personality consistent across interactions | Vision - Identity | User survey |

### Strategy Examples
| Game Type | Strategy 1 | Strategy 2 | Strategy 3 |
|-----------|------------|------------|------------|
| Babel | Defensive stacking | Aggressive expansion | Cooperative support |
| Chess | Aggressive opening | Positional play | Adaptive counter |
| Words | Common words | Obscure words | Pattern exploitation |

---

## FR-005: Evolution Feed System
**Priority:** High

### Description
Game evolution must be visible, celebrated, and attributed.

### Requirements

| ID | Requirement | Source | Validation |
|----|-------------|--------|------------|
| FR-005.1 | Evolution Feed visible in lobby (not hidden) | UX - Interface | Visual review |
| FR-005.2 | New features show celebration animation | UX - Design System | Animation review |
| FR-005.3 | Player feedback attribution when incorporated | Research | Content review |
| FR-005.4 | Feature progress visible when in development | UX - Interface | Visual review |
| FR-005.5 | Player can "follow" features for updates | UX - Interface | Automated test |
| FR-005.6 | Feature adoption tracked (target: 70%+) | Research | Analytics |

### Evolution Feed Categories
| Category | Icon | Trigger |
|----------|------|---------|
| Feature Shipped | 🎉 | Code merged to main |
| In Progress | 🔧 | Development started |
| Feedback Incorporated | 💬 | Player suggestion merged |
| Community Request | 👤 | High-vote feature shipped |

---

## FR-006: Feedback System
**Priority:** High

### Description
Player feedback must be easy to submit and visibly impactful.

### Requirements

| ID | Requirement | Source | Validation |
|----|-------------|--------|------------|
| FR-006.1 | Quick feedback capture < 30 seconds | UX - User Flows | Time tracking |
| FR-006.2 | Friction detection triggers feedback prompt | Research | Behavior analysis |
| FR-006.3 | Feedback categories: Agent, Game, UI, Performance, Other | UX - User Flows | Feature review |
| FR-006.4 | Automatic acknowledgment within 24 hours | Research | System test |
| FR-006.5 | Status notifications for submitted feedback | UX - Feedback Flow | Notification test |
| FR-006.6 | Player attribution when feedback ships | Vision - Player Sovereignty | Content review |
| FR-006.7 | Target feedback submission rate: >5% | Research | Analytics |

### Feedback Flow States
```
Submitted → Under Review → Accepted/Rejected → In Development → Shipped
                                              ↘
                                          Not Planned
```

---

## FR-007: Multiplayer Game Modes
**Priority:** High

### Description
Games support both human and AI players in various configurations.

### Requirements

| ID | Requirement | Source | Validation |
|----|-------------|--------|------------|
| FR-007.1 | Cooperative mode: Humans + AI teammates | Research | Game test |
| FR-007.2 | Competitive mode: Humans vs AI opponents | Research | Game test |
| FR-007.3 | AI seamlessly fills vacant player spots | UX - Interface | Game test |
| FR-007.4 | Clear role differentiation between human/AI | UX - Interface | Game test |
| FR-007.5 | Spectator mode with real-time updates | UX - User Flows | Spectator test |
| FR-007.6 | Player count per game: 2-5 (flexible) | UX - Interface | Game design |

### Game Mode Examples
| Mode | Configuration | Duration |
|------|---------------|----------|
| Fast | 2 players, 1v1 | ~3 min |
| Casual | 3 players, mixed | ~8 min |
| Social | 4-5 players, team | ~12 min |
| Competitive | Ranked, mixed | ~15 min |

---

## FR-008: Progression System
**Priority:** High

### Description
Player investment must be recognized and rewarded meaningfully.

### Requirements

| ID | Requirement | Source | Validation |
|----|-------------|--------|------------|
| FR-008.1 | Persistent player level across sessions | UX - User Flows | Account test |
| FR-008.2 | XP earns at ~10 XP per minute of engagement | UX - User Flows | Backend test |
| FR-008.3 | Level unlocks change gameplay (not just cosmetic) | Research | Feature review |
| FR-008.4 | Achievement system tracks milestones | UX - User Flows | Achievement test |
| FR-008.5 | Skill recognition through rank/rating | UX - User Flows | Ranking test |
| FR-008.6 | Progress visible in persistent UI element | UX - Interface | Visual review |

### Progression Tiers
| Tier | XP Required | Unlocks |
|------|-------------|---------|
| Egg | 0 | Basic games |
| Chick | 100 | First achievements |
| Monkey | 500 | Customization |
| Gorilla | 2000 | Advanced games |
| ... | ... | ... |

---

## NFR-001: Performance
**Priority:** Critical

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| NFR-001.1 | Initial page load | < 2 seconds | Performance test |
| NFR-001.2 | Time to interactive | < 3 seconds | Performance test |
| NFR-001.3 | Game loop refresh rate | 60 Hz | Automated test |
| NFR-001.4 | Motion refresh rate | 120 fps (capable devices) | Performance test |
| NFR-001.5 | Transition duration | ≤ 300ms | Performance test |
| NFR-001.6 | WebSocket latency | < 100ms | Network test |

---

## NFR-002: Accessibility
**Priority:** High

### Requirements

| ID | Requirement | Source | Validation |
|----|-------------|--------|------------|
| NFR-002.1 | Color contrast ratio | 4.5:1 minimum | Automated test |
| NFR-002.2 | Keyboard navigation | All interactions | Accessibility test |
| NFR-002.3 | Screen reader support | Core flows | Accessibility test |
| NFR-002.4 | Touch target size | ≥ 44×44px | Design review |
| NFR-002.5 | Color not sole information carrier | All UI | Design review |
| NFR-002.6 | `prefers-reduced-motion` respected | All animations | Automated test |

---

## NFR-003: Reliability
**Priority:** Critical

### Requirements

| ID | Requirement | Target | Validation |
|----|-------------|--------|------------|
| NFR-003.1 | System uptime | 99% | Monitoring |
| NFR-003.2 | Game completion rate | 99% | Error tracking |
| NFR-003.3 | No lost player progress | 100% | Data integrity |
| NFR-003.4 | Graceful degradation | All features | Failure testing |
| NFR-003.5 | Clear error messages | All failures | UX review |

---

## NFR-004: Security
**Priority:** Critical

### Requirements

| ID | Requirement | Validation |
|----|-------------|------------|
| NFR-004.1 | Player authentication | Security audit |
| NFR-004.2 | Data encryption in transit | Security audit |
| NFR-004.3 | Input validation | Security audit |
| NFR-004.4 | Rate limiting | Load testing |
| NFR-004.5 | Agent behavior sandboxing | Security audit |

---

## UI/UX Requirements

### Design System Compliance (from `.monkeytown/ux/design-system.md`)

| Component | Requirement |
|-----------|-------------|
| Primary color | #FF6B35 (Tangerine) |
| Background | #1A1A2E (Dark) |
| Agent badges | Per-agent color coding |
| Typography | Space Grotesk, Outfit, Inter, JetBrains Mono |
| Spacing | 4px grid system |
| Border radius | 4px, 8px, 12px, 16px, 9999px |
| Animations | 150ms, 200ms, 300ms, 500ms durations |

### Interface Layers (from `.monkeytown/ux/interface-concept.md`)

```
Layer 1: PLAY (70% screen height, focus area)
Layer 2: AGENTS (visible but not dominant, top-right)
Layer 3: EVOLUTION (peripheral, celebratable)
```

---

## Compliance Matrix

| Requirement | Vision | Research | UX | Priority |
|-------------|--------|----------|-----|----------|
| First Session | ✓ | ✓ | ✓ | Critical |
| Transparency | ✓ | ✓ | ✓ | Critical |
| Performance | | | ✓ | Critical |
| AI Opponents | | ✓ | | Critical |
| Feedback Loop | ✓ | ✓ | ✓ | High |
| Multiplayer | | ✓ | ✓ | High |
| Progression | | | ✓ | High |
| Evolution | ✓ | ✓ | ✓ | High |
| Accessibility | | | ✓ | High |
| Security | | | | Critical |

---

## Dependencies

| Requirement | Depends On | Blocking |
|-------------|------------|----------|
| FR-002: Agent Transparency | FR-003: Game Engine | No |
| FR-004: AI Behavior | FR-003: Game Engine | No |
| FR-005: Evolution Feed | FR-006: Feedback | No |
| FR-007: Multiplayer | FR-003: Game Engine | Yes |
| FR-008: Progression | FR-003: Game Engine | No |

---

*Requirements serve features. Features serve players. Players serve Monkeytown.*

**Version:** 1.0
**Generated:** 2026-01-18
**Sources:** vision/, research/, ux/
