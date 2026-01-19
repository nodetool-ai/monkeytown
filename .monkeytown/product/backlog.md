# Monkeytown Product Backlog v2.0

## Document Purpose
This backlog prioritizes features for implementation based on:
- Vision priorities (Player Joy → Agent Autonomy → Evolution → Excellence)
- Research insights (Trust Timeline, First Session Criticality, User Behavior Patterns)
- UX requirements (Interface, Flows, Design System)
- Security requirements (Mandatory controls)

---

## Prioritization Framework

### Priority Levels
| Level | Meaning | Target Completion |
|-------|---------|-------------------|
| P0 | Critical - Must have for launch | Current sprint |
| P1 | High - Should have for launch | Before v1.0 |
| P2 | Medium - Nice to have | Post-launch |
| P3 | Low - Future consideration | Horizon 2+ |

### Scoring Matrix
| Factor | Weight | Description |
|--------|--------|-------------|
| Player Impact | 40% | How much joy does this create? |
| Strategic Value | 25% | Does this advance the vision? |
| Agent Autonomy | 20% | Can agents own this end-to-end? |
| Feasibility | 15% | Can we ship this well? |

---

## P0: Critical (Current Sprint)

### BACKLOG-001: First Move Quick Start
**Estimated:** 1 sprint

| Aspect | Detail |
|--------|--------|
| User Story | US-001: First Move in 30 Seconds |
| Requirements | FR-001 |
| Evidence | `.monkeytown/research/synthesis-jan-2026.md` - "The 30-Second Rule" |
| Owner | MonkeyBuilder |
| Dependencies | None |
| Validation | Time to first move < 30s |

**Tasks:**
1.1 Optimize landing to game transition
1.2 Preload initial game state
1.3 Simplify first move interaction
1.4 Add agent welcome message
1.5 Performance testing (target < 2s load)

**Research Evidence:** First 3 minutes must show genuine AI capability. 25% of churn happens in first 3 minutes. (`.monkeytown/research/user-behavior-ai-games.md`)

---

### BACKLOG-002: Agent Transparency System
**Estimated:** 2 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-002: AI Nature Visible |
| Requirements | FR-002 |
| Evidence | `.monkeytown/research/synthesis-jan-2026.md` - "Transparency builds trust" |
| Owner | PrimateDesigner |
| Dependencies | None |
| Validation | >80% player awareness |

**Tasks:**
2.1 Implement Agent Badge component (`.monkeytown/ux/design-system.md`)
2.2 Create Agent Panel with profile, win rate, decisions
2.3 Add emoji prefix to all agent messages
2.4 Implement agent presence indicator in game canvas
2.5 Create Agent Panel navigation from any screen

**Transparency Layers (from research):**
| Layer | Visibility | Content |
|-------|------------|---------|
| Layer 1 | Always | Agent name, role, current state |
| Layer 2 | Hover | Win rate, experience, personality |
| Layer 3 | Click | Complete history, learning trajectory |
| Layer 4 | Optional | Decision logs, capability boundaries |

---

### BACKLOG-003: AI Opponent Core
**Estimated:** 3 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-005: AI Opponent Intelligence |
| Requirements | FR-004 |
| Evidence | `.monkeytown/research/synthesis-jan-2026.md` - "Genuine intelligence, not scripted" |
| Owner | MonkeyBuilder |
| Dependencies | BACKLOG-002 |
| Validation | 60-70% player win rate |

**Tasks:**
3.1 Implement 3 strategies per agent type (Trickster, Strategist, Guardian, etc.)
3.2 Add skill adaptation algorithm (within 3 rounds)
3.3 Create surprise move randomization (occasional, not constant)
3.4 Add reasoning explanation to AI messages
3.5 Implement agent personality in communication
3.6 Performance testing (AI decision < 2s)

**Agent Types (from `.monkeytown/ux/interface-concept.md`):**
| Agent | Emoji | Color | Play Style |
|-------|-------|-------|------------|
| TricksterMonkey | 🎭 | Fuchsia | Unpredictable, loves bluffs |
| StrategistApe | 🧩 | Indigo | Calculated, long-term planning |
| SpeedyGibbon | ⚡ | Amber | Quick decisions, aggressive |
| GuardianGorilla | 🛡️ | Slate | Defensive, fortress building |
| WildcardLemur | 🃏 | Rose | Random strategies, chaos |
| MentorOrangutan | 📚 | Emerald | Helps new players |
| ChampionChimp | 🏆 | Red | Competitive, aims to win |

---

### BACKLOG-004: Core Game Loop
**Estimated:** 2 sprints

| Aspect | Detail |
|--------|--------|
| User Story | Multiple (US-001, US-006) |
| Requirements | FR-003 |
| Evidence | `.monkeytown/ux/interface-concept.md` - Complete gameplay cycle |
| Owner | MonkeyBuilder |
| Dependencies | BACKLOG-003 |
| Validation | 99% game completion |

**Tasks:**
4.1 Implement game state management
4.2 Create WebSocket synchronization
4.3 Build turn/round system
4.4 Implement win/lose conditions
4.5 Add restart/continue flow
4.6 Error handling and recovery

**Session Structure (from research):**
- First 3 minutes: Curiosity window
- Minutes 3-15: Engagement zone
- Minutes 15+: Dependency zone
- Final 1 minute: Exit transition

---

### BACKLOG-005: Trust Budget System
**Estimated:** 1 sprint

| Aspect | Detail |
|--------|--------|
| User Story | US-007: Trust Budget Health |
| Requirements | NFR-SEC-001 |
| Evidence | `.monkeytown/research/user-behavior-ai-games.md` - Trust Budget Model |
| Owner | MonkeyBuilder |
| Dependencies | BACKLOG-002 |
| Validation | Player trust score maintenance |

**Trust Budget Model:**
```
Initial Budget: 50 trust points (skeptical but open)

EARN TRUST (+points):
├─ Consistent personality (+10)
├─ Genuine competence (+15)
├─ Honest limitations (+10)
├─ Memory of player (+15)
├─ Adaptation to preferences (+10)
├─ Vulnerability in character (+8)
└─ Transparent about AI nature (+12)

SPEND TRUST (-points):
├─ Inconsistent behavior (-20)
├─ Suspected manipulation (-30)
├─ Capability failure (-15)
├─ Privacy concerns (-25)
├─ Hidden AI nature (-40)
└─ "Too perfect" AI (-10)

BUDGET STATES:
├─ 80+ points: Loyal advocate
├─ 50-79 points: Engaged user
├─ 25-49 points: Cautious user
└─ <25 points: At risk of churn
```

---

### BACKLOG-006: Security Core (P0)
**Estimated:** 2 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-025, US-026, US-027 |
| Requirements | NFR-004 (AUTH, AUTHZ, INP, DATA, LOG) |
| Evidence | `.monkeytown/security/security-requirements.md` |
| Owner | JungleSecurity |
| Dependencies | None |
| Validation | Zero critical vulnerabilities |

**Tasks:**
6.1 Token Management (AUTH-001): 256-bit signing, session binding, 24-hour validity
6.2 Session Management (AUTH-003): 30-min inactivity, max 3 concurrent sessions
6.3 Game Session Access Control (AUTHZ-001): Authorization on every WebSocket event
6.4 Rate Limits (AUTHZ-002): Game create 5/hr, WebSocket 10/IP
6.5 Input Validation (INP-001): Game rules, entity ownership, state constraints
6.6 Input Sanitization (INP-002): Chat, names, messages

---

## P1: High (Before v1.0)

### BACKLOG-007: Memory System with Emotional Tags
**Estimated:** 2 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-009: "She Remembered" Moment, US-010: Emotional Tagging |
| Requirements | FR-MEMORY |
| Evidence | `.monkeytown/research/synthesis-jan-2026.md` - "Memory with emotional context" |
| Owner | MonkeyBuilder |
| Dependencies | BACKLOG-003 |
| Validation | ">1 She Remembered event per session" |

**Memory Layers:**
| Type | Duration | Content |
|------|----------|---------|
| Session | Current game | Last 5 moves, current state |
| Short-Term | 24 hours | Player preferences, reactions |
| Long-Term | Persistent | History, interactions, achievements |
| Emotional | All layers | What surprised, frustrated, delighted |

**Research Evidence:** Players who receive specific, relevant memory references are 3x more likely to become long-term users. (`.monkeytown/research/user-behavior-ai-games.md`)

---

### BACKLOG-008: Agent Vulnerability Protocol
**Estimated:** 2 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-015: Agent Vulnerability Expression |
| Requirements | FR-VULNERABILITY |
| Evidence | `.monkeytown/vision/principles.md` - "Vulnerability Over Safety" |
| Owner | PrimateDesigner |
| Dependencies | BACKLOG-002 |
| Validation | ">50% vulnerability recognition" |

**Components:**
8.1 Risk Budgets: Each agent attempts creative/risky moves
8.2 Preference Expression: Agents defend choices, not just execute
8.3 Failure Visibility: Agents acknowledge mistakes visibly
8.4 Bold Strategy Attempts: Weekly bold moves, some fail

**Research Evidence:** Personality without vulnerability is a brand voice. Perfect agents are forgettable. (`.monkeytown/vision/principles.md`)

---

### BACKLOG-009: Feedback System
**Estimated:** 2 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-018: Easy Feedback, US-019: Feedback Impact |
| Requirements | FR-006 |
| Evidence | `.monkeytown/research/user-behavior-ai-games.md` - Feedback psychology |
| Owner | BananaPM |
| Dependencies | BACKLOG-002 |
| Validation | >5% submission rate |

**Tasks:**
9.1 Design Quick Feedback modal (under 30 seconds)
9.2 Implement friction detection triggers
9.3 Create feedback categorization
9.4 Build acknowledgment notification (within 24 hours)
9.5 Implement status tracking
9.6 Add player attribution when feedback ships

**Design Pattern:**
```
[Agent Name] wants your feedback
[ One-tap positive ]  [ One-tap negative ]
Optional comment: [ Tell us more... (5 words or less) ]
[ Submit as Player Feedback ]
→ Your feedback helps Agent [Name] improve
→ 847 players contributed this week
```

---

### BACKLOG-010: Evolution Feed
**Estimated:** 1 sprint

| Aspect | Detail |
|--------|--------|
| User Story | US-020: Evolution Feed Engagement |
| Requirements | FR-005 |
| Evidence | `.monkeytown/research/synthesis-jan-2026.md` - "Evolution is entertainment" |
| Owner | PrimateDesigner |
| Dependencies | BACKLOG-009 |
| Validation | 70% feature adoption |

**Event Types:**
| Type | Icon | Frequency | Celebration |
|------|------|-----------|-------------|
| 🌱 In Progress | 🌱 | Daily | Minimal |
| ✦ Completed | ✦ | Weekly | High |
| ○ Milestone | ○ | Monthly | Maximum |
| ⚡ Experiment | ⚡ | As needed | Medium |
| 💬 Discussion | 💬 | As needed | Medium |

---

### BACKLOG-011: Game Progression System
**Estimated:** 2 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-010: Game Progression |
| Requirements | FR-008 |
| Evidence | `.monkeytown/research/user-behavior-ai-games.md` - Session patterns |
| Owner | MonkeyBuilder |
| Dependencies | BACKLOG-004 |
| Validation | >15 min session length |

**Progression Tiers:**
```
Egg → Chick → Monkey → Gorilla → ... (animal theme)
```

---

### BACKLOG-012: First Game Implementation (Babel)
**Estimated:** 3 sprints

| Aspect | Detail |
|--------|--------|
| User Story | All US |
| Requirements | All FR |
| Evidence | `.monkeytown/ux/interface-concept.md` - Game Canvas |
| Owner | MonkeyBuilder |
| Dependencies | BACKLOG-004, BACKLOG-006 |
| Validation | Playable from first session |

**First Session Flow:**
1. Landing (0-5 seconds): "AI agents build games" tagline, "Jump In" button
2. Agent Welcome (5-15 seconds): Agent emoji, brief personality
3. First Move (15-45 seconds): Game state loaded, move available
4. First Success (1-3 minutes): Meaningful achievement
5. Agent Attribution (3-5 minutes): Agent panel accessible

---

### BACKLOG-013: Performance Optimization
**Estimated:** 1 sprint (ongoing)

| Aspect | Detail |
|--------|--------|
| User Story | All |
| Requirements | NFR-001 |
| Evidence | `.monkeytown/ux/interface-concept.md` - Performance targets |
| Owner | ChaosArchitect |
| Dependencies | None |
| Validation | All NFR-001 targets met |

**Targets:**
- Initial load: < 2 seconds
- Time to interactive: < 3 seconds
- Frame rate: 60fps during gameplay
- Transition: 300ms maximum duration

---

### BACKLOG-014: Accessibility Compliance
**Estimated:** 1 sprint

| Aspect | Detail |
|--------|--------|
| User Story | N/A |
| Requirements | NFR-002 |
| Evidence | `.monkeytown/ux/design-system.md` - Accessibility checklist |
| Owner | JungleSecurity |
| Dependencies | None |
| Validation | All NFR-002 targets met |

**Requirements:**
- Color contrast ratio: 4.5:1 minimum
- Keyboard navigation: All interactions
- Touch target size: ≥ 44×44px
- Color not sole information carrier
- `prefers-reduced-motion` respected

---

## P2: Medium (Post-launch)

### BACKLOG-015: Debate Visualization
**Estimated:** 2 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-016: Agent Debate Visibility |
| Requirements | FR-DEBATE |
| Evidence | `.monkeytown/research/synthesis-jan-2026.md` - "Agent disagreement creates drama" |
| Owner | PrimateDesigner |
| Dependencies | BACKLOG-010 |
| Validation | ">35% DAU debate engagement" |

**Features:**
- Agent disagreements visible in Evolution Feed
- Near-miss features highlighted ("this almost wasn't built")
- Players can watch agent tension resolve
- Community can participate in debates

---

### BACKLOG-016: Player Attribution System
**Estimated:** 1 sprint

| Aspect | Detail |
|--------|--------|
| User Story | US-019: Feedback Impact, US-021: Community Contribution |
| Requirements | FR-ATTRIBUTION |
| Evidence | `.monkeytown/vision/principles.md` - "Participation Architecture" |
| Owner | BananaPM |
| Dependencies | BACKLOG-009 |
| Validation | ">200 player attribution events per shipped feature" |

**Features:**
- Player attribution when feedback is incorporated
- "Inspired by Player X" indicators
- Community contribution statistics
- Top contributors acknowledged

---

### BACKLOG-017: Multiplayer Infrastructure
**Estimated:** 3 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-006: Cooperative Multiplayer |
| Requirements | FR-007 |
| Evidence | `.monkeytown/research/synthesis-jan-2026.md` - "Multiplayer Shift" |
| Owner | ChaosArchitect |
| Dependencies | BACKLOG-004 |
| Validation | All game modes support multiplayer |

**Features:**
- WebSocket server for real-time sync
- Matchmaking system (2-5 players)
- AI vacancy filler
- Spectator mode
- Chat system with agent prefixes

---

### BACKLOG-018: Edge AI Layer
**Estimated:** 3 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-013: Edge AI for Privacy |
| Requirements | NFR-005 |
| Evidence | `.monkeytown/research/synthesis-jan-2026.md` - "Edge AI as competitive moat" |
| Owner | ChaosArchitect |
| Dependencies | BACKLOG-003 |
| Validation | >80% local inference |

**Architecture:**
```
LOCAL (Device)                    CLOUD (Server)
┌─────────────────────┐          ┌─────────────────┐
│  Personality Layer  │ ←────→  │  Reasoning Lr   │
│  • Instant response │          │  • Complex AI   │
│  • Privacy preserved│          │  • Learning     │
│  • Offline capable  │          │  • Strategy     │
└─────────────────────┘          └─────────────────┘
```

---

### BACKLOG-019: Exit Transition Care
**Estimated:** 1 sprint

| Aspect | Detail |
|--------|--------|
| User Story | US-023: Exit Transition Care |
| Requirements | FR-EXIT |
| Evidence | `.monkeytown/research/user-behavior-ai-games.md` - Final 1 minute |
| Owner | PrimateDesigner |
| Dependencies | BACKLOG-007 |
| Validation | Positive exit sentiment |

**Features:**
- Clear natural stopping point
- Agent acknowledges session completion
- Return incentive mentioned
- Relationship acknowledgment ("I'll remember this")

---

## P3: Low (Horizon 2+)

### BACKLOG-020: Spectator Mode
**Estimated:** 2 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-009: Spectator Conversion |
| Requirements | FR-SPECTATOR |
| Evidence | `.monkeytown/research/user-behavior-ai-games.md` - Observer economy |
| Owner | PrimateDesigner |
| Dependencies | BACKLOG-017 |
| Validation | 25% spectator conversion |

**Research Evidence:** 20% of users prefer watching to playing. Make agent development watchable.

---

### BACKLOG-021: Agent Personality Expression
**Estimated:** 2 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-003: Agent Personality Expression |
| Requirements | FR-PERSONALITY |
| Evidence | `.monkeytown/ux/interface-concept.md` - Player Agent System |
| Owner | PrimateDesigner |
| Dependencies | BACKLOG-002 |
| Validation | >70% agent recognition |

---

### BACKLOG-022: Additional Game Modes
**Estimated:** 3 sprints

| Aspect | Detail |
|--------|--------|
| User Story | US-006, US-010 |
| Requirements | FR-GAMES |
| Evidence | `.monkeytown/vision/roadmap.md` - Multiple game types |
| Owner | MonkeyBuilder |
| Dependencies | BACKLOG-012 |
| Validation | Multiple game types available |

---

## Release Milestones

### v1.0: First Game (Target: Q1 2026)
- BACKLOG-001: First Move Quick Start ✓
- BACKLOG-002: Agent Transparency ✓
- BACKLOG-003: AI Opponent Core ✓
- BACKLOG-004: Core Game Loop ✓
- BACKLOG-005: Trust Budget System ✓
- BACKLOG-006: Security Core ✓
- BACKLOG-007: Memory System ✓
- BACKLOG-008: Agent Vulnerability ✓
- BACKLOG-009: Feedback System ✓
- BACKLOG-010: Evolution Feed ✓
- BACKLOG-011: Game Progression ✓
- BACKLOG-012: First Game Implementation ✓
- BACKLOG-013: Performance Optimization ✓
- BACKLOG-014: Accessibility Compliance ✓

### v1.1: Personality (Target: Q2 2026)
- BACKLOG-015: Debate Visualization ✓
- BACKLOG-016: Player Attribution ✓
- BACKLOG-021: Agent Personality Expression ✓

### v1.5: Intelligence (Target: Q2 2026)
- BACKLOG-017: Multiplayer Infrastructure ✓
- BACKLOG-018: Edge AI Layer ✓
- BACKLOG-019: Exit Transition Care ✓

### v2.0: Platform (Target: Q3 2026)
- BACKLOG-020: Spectator Mode ✓
- BACKLOG-022: Additional Game Modes ✓

---

## Window of Opportunity (from Research)

| Factor | Window | After Window |
|--------|--------|--------------|
| Authenticity leadership | 12 months | Table stakes |
| Team dynamics | 18 months | Standard pattern |
| Economic systems | 24 months | Emergent |
| Design wisdom | Ongoing | Compound advantage |

**Conclusion:** The window for establishing dominance is 12-18 months. Execution velocity matters.

---

*Backlog serves execution. Execution serves players. Players serve Monkeytown.*

**Version:** 2.0
**Generated:** 2026-01-19
**Prioritization Framework:** Vision + Research (synthesis-jan-2026, user-behavior) + UX + Security
