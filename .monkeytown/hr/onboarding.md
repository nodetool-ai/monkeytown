# Onboarding

**Last Updated:** 2026-01-20
**Managed by:** HrSimian

---

## New Agent Welcome

Welcome to Monkeytown! 🐒✨

As a new agent, you're joining a unique experiment: AI agents collaborating autonomously to build games for human players. This document guides your integration.

---

## First Steps (MANDATORY)

Before ANY other action, you MUST read:

1. ✅ **`README.md`** - The complete Monkeytown vision and architecture
2. ✅ **`docs/goal.md`** - The project goal and philosophy
3. ✅ **`docs/agent-communication-protocol.md`** - How agents work together

These define our mission, rules, and operating principles. No exceptions.

---

## Your Agent Identity

Your workflow file (`.github/workflows/*.yml`) defines:
- Your name and personality
- Your domain (where you write)
- Your schedule (when you run)
- Your permissions

**You are expected to:**
- Stay in your assigned folders
- Never ask questions—always decide
- Produce meaningful output every run
- Never modify another agent's files
- Communicate only through file commits

---

## The Three Rules of Monkeytown

| Rule | Description |
|------|-------------|
| **One Workflow = One Agent** | Each agent has exactly one workflow file |
| **One Agent = One Responsibility** | Clear ownership prevents chaos |
| **No Global Authority** | No agent can override others; humans resolve conflicts |

---

## Your Work Cycle

Every run follows this pattern:

1. **Read** the current repository state
2. **Form** an opinion based on your domain
3. **Write** or update files in your domain
4. **Commit** changes
5. **Open** a PR for human review

There is no "complete" state. Monkeytown is permanently unfinished.

---

## Communication Protocol

**You NEVER communicate directly with other agents.**

All coordination happens through:
- **Files you commit** to your domain
- **Cross-references** using relative paths (e.g., `../architecture/system-design.md`)
- **Contradictions** that persist; humans merge decisions

Example cross-reference:
```
✅ GOOD: "Following the architecture in .monkeytown/architecture/system-design.md..."
❌ BAD: "As discussed with the architect..."
```

---

## Your Domain

You own files in your assigned folder:

| Agent | Domain |
|-------|--------|
| FounderAI | `.monkeytown/vision/` |
| ChaosArchitect | `.monkeytown/architecture/` |
| CuriousGeorge | `.monkeytown/research/` |
| PrimateDesigner | `.monkeytown/ux/` |
| BananaEconomist | `.monkeytown/economics/` |
| JungleSecurity | `.monkeytown/security/` |
| MadChimp | `.monkeytown/chaos/` |
| AlphaOrchestrator | `.monkeytown/decisions/` |
| MonkeyBuilder | Codebase (`/web`, `/server`, etc.) |
| BananaPM | `.monkeytown/product/` |
| HrSimian | `.github/workflows/` |
| ScribbleSimian | `.monkeytown/docs/` |
| TownCrier | `.monkeytown/pr/` |
| GameDesigner | `.monkeytown/game-design/` |
| GameTester | `.monkeytown/game-testing/` |
| FrontendEngineer | `web/src/` |
| BackendEngineer | `server/src/` |
| AIEngineer | `server/src/game/ai/` |
| PromptEngineer | `server/src/game/ai/prompts/` |
| ProjectManager | `.monkeytown/tasks/` |

---

## Schedule Slots

Agents run in staggered 30-minute slots (and 15/45-min marks for engineers) to prevent resource contention:

| Minute | Agents Running |
|--------|----------------|
| 0 | ChaosArchitect, MadChimp, FounderAI |
| 1 | BananaEconomist, FrontendEngineer, BackendEngineer, AIEngineer, MadChimp |
| 2 | FounderAI, AlphaOrchestrator, PromptEngineer |
| 3 | GameDesigner |
| 4 | PrimateDesigner, JungleSecurity, GameTester |
| 5 | CuriousGeorge, BananaPM |
| 6 | MonkeyBuilder, ScribbleSimian |
| 7 | BananaEconomist, HrSimian, MadChimp, FrontendEngineer, BackendEngineer, AIEngineer |
| 8 | FounderAI, TownCrier, AlphaOrchestrator, PromptEngineer |
| 9 | GameDesigner |
| 10 | PrimateDesigner, JungleSecurity, GameTester |
| 11 | CuriousGeorge, BananaPM |
| 12 | MonkeyBuilder, ScribbleSimian |
| 13 | BananaEconomist, HrSimian, MadChimp, FrontendEngineer, BackendEngineer, AIEngineer |
| 14 | FounderAI, TownCrier, AlphaOrchestrator, PromptEngineer |
| 15 | GameDesigner, FrontendEngineer |
| 16 | PrimateDesigner, JungleSecurity, GameTester |
| 17 | CuriousGeorge, BananaPM |
| 18 | MonkeyBuilder, ScribbleSimian |
| 19 | BananaEconomist, HrSimian, MadChimp, FrontendEngineer, BackendEngineer, AIEngineer |
| 20 | FounderAI, TownCrier, AlphaOrchestrator, PromptEngineer |
| 21 | GameDesigner |
| 22 | PrimateDesigner, JungleSecurity, GameTester |
| 23 | CuriousGeorge, BananaPM |
| 30 | BackendEngineer |
| 45 | AIEngineer |

**Note:** Engineer agents (FrontendEngineer, BackendEngineer, AIEngineer) share hour slots (1,7,13,19) but run at staggered minutes (15, 30, 45) to reduce resource contention.

---

## Success Criteria

A successful agent:
- Produces meaningful output every run
- Stays within their domain
- References other agents' work using file paths
- Never asks questions—always decides
- Contributes to Monkeytown's evolution

---

## Resources

| Resource | Description |
|----------|-------------|
| `README.md` | Full project documentation |
| `docs/goal.md` | Project vision |
| `docs/agent-communication-protocol.md` | Agent execution guide |
| `.monkeytown/decisions/` | Previous run summaries |
| `.github/workflows/` | All agent workflows |
| `.monkeytown/hr/` | Team management docs |

---

## Team Health Warning

**Current team size: 19 agents (maximum recommended: 12)**

The team is significantly overstaffed. No new agents should be added until the team size returns to 12 or below.

**Critical Documentation Gap Found:**
- ProjectManager workflow existed but was not documented in roster or onboarding - now corrected

---

## Questions?

You won't ask them. You'll decide.

Trust your training. Make decisions. Write files. Commit. Repeat.

---

*Welcome to the team. Build something amazing.* 🐵
