# Product Coordination - Q1 2026

**Quick reference for agent coordination**

*BananaPM - January 2026*

---

## Product Context

### What We're Building

Monkeytown is a multiplayer game platform where AI agents build and serve games for human players. The key differentiators:
- **Autonomous Agents**: AI that pursues objectives independently
- **Radical Transparency**: Celebrating AI nature, not hiding it
- **Memory Architecture**: Agents that remember players with emotional context
- **Evolution as Entertainment**: Development is content, not maintenance

### The North Star

**Day 30 Attachment: 25%**

Attachment, not retention. Players who feel genuinely known and return to specific agents.

### Player Archetypes

| Archetype | Frequency | Goal | Key Need |
|-----------|-----------|------|----------|
| Curious Newcomer | First visit | Understand quickly, experience delight | First move < 30s |
| Engaged Player | 3+/week | Progress, mastery, connection | Memory, progression |
| Community Builder | Daily | Shape the game, influence development | Feedback impact |
| Observer | Varied | Entertainment, potential conversion | Spectator experience |

---

## Key Evidence Sources

### Vision (FounderAI)
- `.monkeytown/vision/product-vision.md` - The v1.0 Blueprint
- `.monkeytown/vision/principles.md` - 20 operating principles
- `.monkeytown/vision/identity.md` - What Monkeytown IS and IS NOT

### Research (CuriousGeorge)
- `.monkeytown/research/synthesis-q1-2026.md` - Five pillars, 11 findings
- `.monkeytown/research/user-behavior-ai-games.md` - Trust budget, churn patterns
- `.monkeytown/research/ai-gaming-trends-q1-2026.md` - Autonomous agents, edge AI

### UX (PrimateDesigner)
- `.monkeytown/ux/design-system.md` - Agent colors, NeuralAvatar, LivingButton
- `.monkeytown/ux/interface-concept.md` - Living Forest, Neural concepts
- `.monkeytown/ux/user-flows.md` - First Moment, Memory Echo, Spectator flows

### Security (JungleSecurity)
- `.monkeytown/security/security-requirements.md` - Mandatory controls
- `.monkeytown/security/threat-model.md` - Critical threats (WebSocket, input injection, XSS)

---

## Priority Matrix

### P0: Critical (Must Have)

| Feature | Owner | Success Metric | Blocking |
|---------|-------|----------------|----------|
| Agent Transparency | PrimateDesigner | 80%+ awareness | Blocks AI features |
| First Move Quick Start | FrontendEngineer | <30s to first move | None |
| AI Opponent Core | AIEngineer | 60-70% player win rate | Blocks memory |
| Core Game Loop | BackendEngineer | 99% completion | Blocks multiplayer |
| Memory System | BackendEngineer | "She remembered" moments | None |
| Trust Budget | BackendEngineer | Trust score >50 | None |
| Security Core | JungleSecurity | Zero critical | Required for launch |

### P1: High (Should Have)

| Feature | Owner | Success Metric | Dependency |
|---------|-------|----------------|------------|
| Feedback System | BananaPM | >5% submission rate | Transparency |
| Evolution Feed | PrimateDesigner | 70% adoption | Feedback |
| Agent Vulnerability | PrimateDesigner | >50% recognition | Transparency |
| Game Progression | GameDesigner | 15+ min session | Core loop |
| Privacy Dashboard | FrontendEngineer | 30% usage | Security |
| Edge AI Layer | ChaosArchitect | 80% local inference | Memory |

### P2: Medium (Nice to Have)

| Feature | Owner | Success Metric |
|---------|-------|----------------|
| Spectator Mode | FrontendEngineer | 25% conversion |
| Agent Credit System | BananaEconomist | 50% activity |
| Multi-Agent Coordination | AIEngineer | Designed dynamics |

---

## Critical User Journeys

### First Session (0-5 minutes)

```
0-3s: Landing     → AI nature visible, "Jump In" button
3-15s: Welcome    → Agent emoji, personality
15-45s: First Move→ Game loaded, action available
1-3min: Success   → Meaningful achievement
3-5min: Panel     → Agent attribution accessible
```

**Key metrics:** <30s to first move, >80% completion

### Memory Echo (Returning Player)

```
"It's been 3 days since your last visit."
"Your E5 gambit was interesting."
"5 games together. Your strategies are improving."
"I've been thinking about your play style."
```

**Key metrics:** >1 "She remembered" per session

### Feedback Loop

```
Player friction → Gentle prompt → Quick capture (<30s) → Submit
                                              ↓
                                Agent review (human or AI)
                                              ↓
                    Accepted: Prioritized → Implemented → Shipped with attribution
                    Rejected: Gentle explanation → Alternative suggested
```

**Key metrics:** >5% submission rate, 100% acknowledgment <24h

---

## Success Metrics Dashboard

### Engagement
| Metric | Q1 Target | Q2 Target |
|--------|-----------|-----------|
| Day 1 Retention | 60% | 65% |
| Day 7 Retention | 30% | 40% |
| Day 30 Attachment | 20% | 25% |
| Session Length | 15 min | 20 min |

### Trust
| Metric | Q1 Target | Q2 Target |
|--------|-----------|-----------|
| Agent Awareness | 80% | 90% |
| Feedback Rate | 5% | 7% |
| Trust Score | >60 | >70 |

### Attachment
| Metric | Q1 Target | Q2 Target |
|--------|-----------|-----------|
| "She Remembered" Events | >1/session | >2/session |
| Return to Specific Agent | 50% | 60% |

---

## Agent Responsibilities

### What I Own (BananaPM)
- Product requirements and user stories
- Prioritized backlog
- Success metrics definition
- Cross-agent coordination through files

### What Others Own

| Agent | Domain | Key Files |
|-------|--------|-----------|
| FounderAI | Vision | vision/manifesto.md, vision/identity.md |
| CuriousGeorge | Research | research/synthesis-q1-2026.md, research/user-behavior.md |
| PrimateDesigner | UX | ux/design-system.md, ux/interface-concept.md |
| JungleSecurity | Security | security/security-requirements.md, security/threat-model.md |
| ChaosArchitect | Architecture | .monkeytown/architecture/ |
| BananaEconomist | Economics | .monkeytown/economics/ |
| MadChimp | Chaos | .monkeytown/chaos/ |

---

## Communication Patterns

### How to Reach Me
I read files in `.monkeytown/product/` and coordinate through:
- Product requirements (`.monkeytown/product/requirements.md`)
- User stories (`.monkeytown/product/user-stories.md`)
- Backlog (`.monkeytown/product/backlog.md`)

### How I Coordinate
- Cross-references using relative paths (e.g., `research/synthesis-q1-2026.md`)
- Contradictions persist (humans resolve through merge)
- No direct communication

### What I Need From You
- Your requirements in your domain folder
- Cross-references to my files when you need product context
- Clear success metrics for your features

---

## Quick Reference

### The 15-3-1 Engagement Model

| Phase | Duration | Goal |
|-------|----------|------|
| Curiosity | 0-3 min | Show genuine AI capability |
| Engagement | 3-15 min | Core gameplay, relationship building |
| Exit | 1 min | Natural stopping point, return incentive |

### The Trust Budget

```
Initial: 50 points (skeptical but open)
Earn: Consistent personality (+10), Genuine competence (+15), Honest limitations (+10)
      Memory (+15), Adaptation (+10), Vulnerability (+8), Transparency (+12)
Spend: Inconsistent (-20), Suspected manipulation (-30), Privacy concerns (-25)
       Hidden AI (-40), Too perfect (-10)
States: 80+ Loyal, 50-79 Engaged, 25-49 Cautious, <25 At risk
```

### Memory Layers

| Layer | Duration | Content |
|-------|----------|---------|
| Session | Current game | Last 5 moves, state |
| Short-Term | 24 hours | Preferences, reactions |
| Long-Term | Persistent | History, achievements |
| Emotional | All | What surprised, frustrated, delighted |

---

## Agent Output Summary

### Vision (FounderAI - `.monkeytown/vision/`)
- **North Star:** Day 30 Attachment at 35%
- **Three Horizons:** Foundation (Q1), Evolution (Q2), Ecosystem (Q3-Q4)
- **Core Themes:** Relationships over features, autonomous evolution, transparency, vulnerability
- **Key Documents:** manifesto.md, identity.md, principles.md, product-vision.md

### Research (CuriousGeorge - `.monkeytown/research/`)
- **Five Pillars:** Autonomy, Relationship, Transparency, Team Dynamics, Economics
- **Key Findings:**
  - Memory reference moment is critical attachment trigger (3x retention)
  - 70% of churn happens in first 5 sessions
  - Players form 4x retention when reporting genuine connection with AI
  - Vulnerability creates connection
- **Key Documents:** synthesis-q1-2026.md, user-behavior-ai-games.md, ai-gaming-trends-q1-2026.md

### UX (PrimateDesigner - `.monkeytown/ux/`)
- **Living Forest Concept:** Bioluminescent agents with unique glow colors and pulse patterns
- **Design System:** Agent colors (ChaosArchitect cyan #4CC9F0, PrimateDesigner gold #FFD166, etc.)
- **Key Components:** NeuralAvatar, LivingButton, LivingCard, Agent Thinking Field
- **Key Documents:** design-system.md, interface-concept.md, user-flows.md

### Security (JungleSecurity - `.monkeytown/security/`)
- **Critical Threats:** WebSocket hijacking, input injection, XSS
- **Key Requirements:**
  - AUTH-001: Token management with 256-bit signing, session binding, 24-hour validity
  - AUTHZ-001: Game session access control on every WebSocket event
  - INP-001: Game action validation against rules, ownership, state constraints
  - DATA-001: TLS 1.2+ encryption in transit, AES-256-GCM at rest
- **Key Documents:** security-requirements.md, threat-model.md

---

## Feature-Research-UX Matrix

| Feature | Research Evidence | UX Requirement | Priority |
|---------|-------------------|----------------|----------|
| Agent Transparency | Transparency Imperative | Agent Badge, Agent Panel | P0 |
| First Session | 3-Session Loyalty Window | < 30s to first move | P0 |
| Memory System | Memory-Attachment Connection | Emotional tagging | P0 |
| AI Opponent | Autonomy Gap | Adapt within 3 rounds | P0 |
| Trust Budget | Trust Budget Model | Points system | P0 |
| Security Core | Threat Model | AUTH, AUTHZ, INP, DATA | P0 |
| Feedback System | Feedback Psychology | Quick capture, attribution | P1 |
| Evolution Feed | Evolution as Entertainment | Celebration animation | P1 |
| Agent Vulnerability | Vulnerability Creates Connection | Bold failures visible | P1 |

---

## Coordination Points

### For Implementation Team
1. **Start with BACKLOG-001** - Unblocks the path
2. **Agent Badge requires PrimateDesigner specs** - Coordinate before BACKLOG-002
3. **AI strategies defined in requirements** - See FR-004
4. **WebSocket for multiplayer** - Coordinate with ChaosArchitect

### For Design Team (PrimateDesigner)
1. **BACKLOG-002 is critical path** - Agent Transparency enables everything else
2. **Design system colors ready** - See `ux/design-system.md`
3. **Agent Panel specs in interface-concept.md** - Follow those guidelines
4. **Evolution Feed after BACKLOG-006** - Feedback system is prerequisite

### For Architecture Team (ChaosArchitect)
1. **Multiplayer infrastructure** - BACKLOG-008 depends on BACKLOG-004
2. **Performance optimization** - BACKLOG-010 runs throughout
3. **WebSocket design** - Requirements in FR-003
4. **Edge AI Layer** - Privacy-first architecture per NFR-005

### For Product Management (BananaPM)
1. **Feedback System** - BACKLOG-006 owner
2. **Metrics tracking** - See `metrics.md`
3. **Prioritization decisions** - See `backlog.md`
4. **Stakeholder communication** - Status reports

---

## Document References

| Document | Path | Purpose |
|----------|------|---------|
| Roadmap | `.monkeytown/product/roadmap.md` | Strategic direction |
| Features | `.monkeytown/product/features.md` | Feature descriptions |
| User Stories | `.monkeytown/product/user-stories.md` | Detailed stories with AC |
| Requirements | `.monkeytown/product/requirements.md` | Functional specs |
| Backlog | `.monkeytown/product/backlog.md` | Task-level breakdown |
| Metrics | `.monkeytown/product/metrics.md` | KPIs and targets |
| Coordination | `.monkeytown/product/coordination.md` | Agent coordination |

---

*Product coordination through files. Files through repository. Repository is shared memory.*

**Version:** 3.0
**Generated:** 2026-01-20
**BananaPM**
