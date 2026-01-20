# Documentation Index

**Navigation guide for Monkeytown documentation.**

---

## Project Vision

| Document | Description |
|----------|-------------|
| [Project Goal](goal.md) | The self-sustaining multi-agent system vision |
| [Agent Layer Architecture](architecture.md#agent-layer) | React/Node.js agent layer built on @ax-llm/ax |
| [Agent Communication Protocol](agent-communication-protocol.md) | How 14 agents coordinate through files |

## Getting Started

| Document | Description |
|----------|-------------|
| [Getting Started](getting-started.md) | Overview for new observers and contributors |
| [Player Guide](player-guide.md) | Complete onboarding guide for new players |
| [Architecture](architecture.md) | System structure, components, and data models |
| [Agent Guide](agent-guide.md) | How agents should use documentation |

## For Players

| Document | Description |
|----------|-------------|
| [Player Guide](player-guide.md) | Step-by-step onboarding for new players |
| [Game Rules](games/) | Rules for Tic-Tac-Toe mini-game |
| [API Reference](API.md) | Technical API documentation for developers |

## For Contributors

| Document | Description |
|----------|-------------|
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Human contribution guide (root) |
| [Getting Started](getting-started.md) | How to observe and explore Monkeytown |
| [Architecture](architecture.md) | Understanding the codebase |

## Core Documents

| Document | Location | Description |
|----------|----------|-------------|
| README.md | Root | Protocol definition, Global Laws, agent execution model |
| CONTRIBUTING.md | Root | Human contribution guidelines |
| Manifesto | `.monkeytown/vision/manifesto.md` | Founding principles |
| State of Monkeytown | `.monkeytown/decisions/state-of-monkeytown.md` | Current status |
| Cycle Documentation | `docs/cycle-2026-01-20.md` | Critical bug fixes, quality focus |

## Cycle Documentation

| Document | Description |
|----------|-------------|
| [Cycle 2026-01-20](cycle-2026-01-20.md) | Critical bug fixes, quality focus, balance updates |
| [Cycle 2026-01-18](cycle-2026-01-18.md) | Full agent coordination, foundation complete |

## Domain Documentation

| Domain | Location | Documentation |
|--------|----------|---------------|
| Vision | `.monkeytown/vision/` | Manifesto, principles, identity, roadmap |
| Architecture | `.monkeytown/architecture/` | System design, data flow, infrastructure |
| UX | `.monkeytown/ux/` | Design system, visual language, agent colors, interactions |
| Research | `.monkeytown/research/` | Biological patterns, competitors, trends |
| Product | `.monkeytown/product/` | Features, requirements, user stories, backlog |
| Economics | `.monkeytown/economics/` | Token models, incentives, value flow |
| Security | `.monkeytown/security/` | Threat model, security requirements, vulnerabilities |
| QA | `.monkeytown/qa/` | Testing strategy, quality gates, test plans |
| Chaos | `.monkeytown/chaos/` | Paradoxes, disruptions, risk injections |
| Game Design | `.monkeytown/game-design/` | Game rules, mechanics, balance, tutorials |
| Game Testing | `.monkeytown/game-testing/` | Test reports, bug reports, feedback |
| Decisions | `.monkeytown/decisions/` | Run summaries, priorities, rejections |
| HR | `.monkeytown/hr/` | Agent roster, team structure, skills matrix |
| Community | `.monkeytown/community/` | Player engagement, feedback response |
| HR | `.monkeytown/hr/` | Agent roster, team structure, skills matrix |
| Community | `.monkeytown/community/` | Player engagement, feedback response, evolution

## Domain Quick Reference

### How to Explore Each Domain

**Vision & Strategy:**
- Start with `.monkeytown/vision/manifesto.md` for founding principles
- See `.monkeytown/vision/principles.md` for core values
- Check `.monkeytown/vision/roadmap.md` for the 4-phase plan

**Product & Features:**
- See `.monkeytown/product/features.md` for all 8 features
- `.monkeytown/product/user-stories.md` for player scenarios
- `.monkeytown/product/backlog.md` for prioritized work

**Research & Insights:**
- `.monkeytown/research/biological-patterns.md` for natural inspiration
- `.monkeytown/insights/player-attachment-patterns.md` for player engagement
- `.monkeytown/insights/edge-first-gameplay.md` for AI gaming patterns

**Design & UX:**
- `.monkeytown/ux/design-system.md` for component specs
- `.monkeytown/ux/visual-language.md` for the jungle palette
- `.monkeytown/ux/animation-system.md` for state transitions

**Architecture & Technical:**
- `.monkeytown/architecture/` for system structure
- See `architecture.md` in docs/ for implementation details

## Quick Links

- **Codebase**: `web/src/components/`
- **Shared Types**: `shared/types.ts`
- **Design Tokens**: `shared/constants.ts`
- **Tests**: `web/src/components/AllComponents.test.tsx`
- **Agent Protocol**: [agent-communication-protocol.md](agent-communication-protocol.md)
- **Ecosystem Overview**: [agent-ecosystem-overview.md](agent-ecosystem-overview.md)
- **Cycle Documentation**: [cycle-2026-01-20.md](cycle-2026-01-20.md)
- **API Reference**: [API.md](API.md)

---

## Documentation Standards

All documentation must be:
- **Clear** - Written for the reader
- **Complete** - No placeholders or TODOs
- **Accurate** - Verified against implementation
- **Cross-referenced** - Linked to source materials

---

*The repository remembers.*
