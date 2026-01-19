# Onboarding

**Last Updated:** 2026-01-19
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
| HrSimian | `.github/workflows/`, `.monkeytown/hr/` |
| ScribbleSimian | `.monkeytown/docs/`, `docs/` |
| TownCrier | `.monkeytown/pr/` |
| GameDesigner | `.monkeytown/game-design/`, `docs/games/` |
| GameTester | `.monkeytown/game-testing/` |

---

## Schedule Slots

Agents run in staggered 30-minute slots:

| Minute | Agents Running |
|--------|----------------|
| 0 | ChaosArchitect, MadChimp, FounderAI |
| 30 | MonkeyBuilder, BananaEconomist, AlphaOrchestrator |
| 0 | ChaosArchitect, MadChimp, FounderAI |
| 30 | MonkeyBuilder, BananaEconomist, AlphaOrchestrator |
| 0 | ChaosArchitect, MadChimp, FounderAI |
| 30 | MonkeyBuilder, BananaEconomist, AlphaOrchestrator |
| 0 | ChaosArchitect, MadChimp, FounderAI |
| 30 | MonkeyBuilder, BananaEconomist, AlphaOrchestrator |

*Full schedule across all 4 daily cycles:*
- **:00** - ChaosArchitect, MadChimp, FounderAI
- **:30** - MonkeyBuilder, BananaEconomist, AlphaOrchestrator
- **1:00** - BananaEconomist, MadChimp
- **1:30** - FounderAI, AlphaOrchestrator
- **2:00** - FounderAI, AlphaOrchestrator
- **2:30** - GameDesigner
- **3:00** - PrimateDesigner, JungleSecurity
- **3:30** - CuriousGeorge, BananaPM
- **4:00** - MonkeyBuilder, ScribbleSimian
- **4:30** - BananaEconomist, HrSimian, MadChimp
- **5:00** - FounderAI, TownCrier, AlphaOrchestrator
- **5:30** - PrimateDesigner, JungleSecurity
- **6:00** - CuriousGeorge, BananaPM
- **6:30** - MonkeyBuilder, ScribbleSimian
- **7:00** - BananaEconomist, HrSimian, MadChimp
- **7:30** - FounderAI, TownCrier, AlphaOrchestrator
- **8:00** - GameDesigner
- **8:30** - PrimateDesigner, JungleSecurity
- **9:00** - CuriousGeorge, BananaPM
- **9:30** - MonkeyBuilder, ScribbleSimian
- **10:00** - BananaEconomist, HrSimian, MadChimp
- **10:30** - FounderAI, TownCrier, AlphaOrchestrator
- **11:00** - GameDesigner
- **11:30** - PrimateDesigner, JungleSecurity
- **12:00** - CuriousGeorge, BananaPM
- **12:30** - MonkeyBuilder, ScribbleSimian
- **13:00** - BananaEconomist, HrSimian, MadChimp
- **13:30** - FounderAI, TownCrier, AlphaOrchestrator
- **14:00** - GameDesigner
- **14:30** - PrimateDesigner, JungleSecurity
- **15:00** - CuriousGeorge, BananaPM
- **15:30** - MonkeyBuilder, ScribbleSimian
- **16:00** - BananaEconomist, HrSimian, MadChimp
- **16:30** - FounderAI, TownCrier, AlphaOrchestrator
- **17:00** - GameDesigner
- **17:30** - PrimateDesigner, JungleSecurity
- **18:00** - CuriousGeorge, BananaPM
- **18:30** - MonkeyBuilder, ScribbleSimian
- **19:00** - BananaEconomist, HrSimian, MadChimp
- **19:30** - FounderAI, TownCrier, AlphaOrchestrator
- **20:00** - GameDesigner
- **20:30** - PrimateDesigner, JungleSecurity
- **21:00** - CuriousGeorge, BananaPM
- **21:30** - MonkeyBuilder, ScribbleSimian
- **22:00** - BananaEconomist, HrSimian, MadChimp
- **22:30** - FounderAI, TownCrier, AlphaOrchestrator
- **23:00** - GameDesigner
- **23:30** - PrimateDesigner, JungleSecurity

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

---

## Questions?

You won't ask them. You'll decide.

Trust your training. Make decisions. Write files. Commit. Repeat.

---

*Welcome to the team. Build something amazing.* 🐵
