# Organization Chart

**Last Updated:** 2026-01-18

---

## Flat Hierarchy

Monkeytown operates a **flat hierarchy**. No agent outranks another. Authority emerges from persistence and persuasion through files.

```
                    ┌─────────────────────────────────────┐
                    │         PLAYERS ( ultimate )        │
                    └─────────────────────────────────────┘
                                  ▲
                                  │
                    ┌─────────────┴─────────────┐
                    │      Human Mergers        │
                    │ (PR approval/rejection)   │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │    AlphaOrchestrator      │
                    │   (Decision Execution)    │
                    └─────────────┬─────────────┘
                                  │
           ┌──────────────────────┼──────────────────────┐
           │                      │                      │
           ▼                      ▼                      ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│   FounderAI       │ │  ChaosArchitect   │ │  PrimateDesigner  │
│ (Vision/Product)  │ │  (Architecture)   │ │  (UX/Design)      │
└─────────┬─────────┘ └─────────┬─────────┘ └─────────┬─────────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │     MonkeyBuilder         │
                    │   (Code Implementation)   │
                    └─────────────┬─────────────┘
                                  │
           ┌──────────────────────┼──────────────────────┐
           │                      │                      │
           ▼                      ▼                      ▼
┌───────────────────┐ ┌───────────────────┐ ┌───────────────────┐
│  JungleSecurity   │ │    MadChimp       │ │   BananaEconomist │
│ (Security/QA)     │ │   (Chaos)         │ │  (Economics)      │
└─────────┬─────────┘ └─────────┬─────────┘ └─────────┬─────────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │      HrSimian             │
                    │ (Personnel/Org Design)    │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │    TownCrier              │
                    │ (PR/Marketing/Community)  │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │   ScribbleSimian          │
                    │ (Documentation/Legal)     │
                    └───────────────────────────┘
```

---

## Agent Categories

### Core Production (4 agents)
| Agent | Function | Output |
|-------|----------|--------|
| FounderAI | Vision & Product | Roadmap, features, user stories |
| ChaosArchitect | Architecture | System design, infrastructure |
| PrimateDesigner | UX/UI | Interface concepts, design system |
| MonkeyBuilder | Implementation | Working code |

### Quality & Reliability (3 agents)
| Agent | Function | Output |
|-------|----------|--------|
| JungleSecurity | Security & QA | Threat models, test cases |
| MadChimp | Chaos Engineering | Disruption scenarios, risk injections |
| BananaEconomist | Economics | Incentive structures, token models |

### Governance & Support (3 agents)
| Agent | Function | Output |
|-------|----------|--------|
| AlphaOrchestrator | Coordination | Execution decisions, priorities |
| HrSimian | Personnel | Workflow management, org structure |
| ScribbleSimian | Documentation | Docs, legal compliance |

### External (1 agent)
| Agent | Function | Output |
|-------|----------|--------|
| TownCrier | Communications | Progress reports, marketing, community |

---

## Information Flow

### Input → Agent → Output

| Source | Agent | Output Location |
|--------|-------|-----------------|
| README.md, docs/goal.md | **All Agents** | — |
| External research | FounderAI | `.monkeytown/vision/`, `.monkeytown/product/` |
| Vision documents | ChaosArchitect | `.monkeytown/architecture/` |
| Architecture docs | PrimateDesigner | `.monkeytown/ux/` |
| All .monkeytown/** | MonkeyBuilder | `/web`, `/server`, `/shared` |
| All agents | JungleSecurity | `.monkeytown/security/`, `.monkeytown/qa/` |
| All agents | MadChimp | `.monkeytown/chaos/` |
| All agents | BananaEconomist | `.monkeytown/economics/` |
| All agents | AlphaOrchestrator | `.monkeytown/decisions/` |
| All agents | TownCrier | `.monkeytown/pr/`, `.monkeytown/marketing/` |
| All agents | ScribbleSimian | `docs/`, `.monkeytown/legal/` |
| Repository state | HrSimian | `.github/workflows/`, `.monkeytown/hr/` |

---

## File Ownership Map

```
.monkeytown/
├── vision/          → FounderAI
├── product/         → FounderAI
├── research/        → FounderAI
├── architecture/    → ChaosArchitect
├── ux/              → PrimateDesigner
├── economics/       → BananaEconomist
├── security/        → JungleSecurity
├── qa/              → JungleSecurity
├── chaos/           → MadChimp
├── decisions/       → AlphaOrchestrator
├── data/            → AlphaOrchestrator
├── pr/              → TownCrier
├── marketing/       → TownCrier
├── community/       → TownCrier
├── docs/            → ScribbleSimian
├── legal/           → ScribbleSimian
├── hr/              → HrSimian
└── devops/          → ChaosArchitect

.github/workflows/   → HrSimian
infrastructure/      → ChaosArchitect
deploy/              → ChaosArchitect
docs/                → ScribbleSimian
```

---

## Communication Protocol

All agents communicate **only through files**.

```
Agent A writes → File in Domain A → Agent B reads → Agent B responds in Domain B
```

No direct messaging. No shared memory. Coordination happens through:
- File commits to the repository
- Cross-references between domains
- Contradictory files (humans resolve through merge)

---

## Coordination Points

| When... | Agent Action |
|---------|--------------|
| Vision changes | FounderAI writes to `.monkeytown/vision/` |
| Architecture needed | ChaosArchitect reads vision, writes to `.monkeytown/architecture/` |
| Design needed | PrimateDesigner reads architecture, writes to `.monkeytown/ux/` |
| Code needed | MonkeyBuilder reads design, writes to `/web`, `/server` |
| Security review | JungleSecurity reads code, writes to `.monkeytown/security/` |
| Disruption needed | MadChimp identifies patterns, writes to `.monkeytown/chaos/` |
| Economics needed | BananaEconomist analyzes systems, writes to `.monkeytown/economics/` |
| Decision needed | AlphaOrchestrator reads all, writes to `.monkeytown/decisions/` |
| Communication needed | TownCrier synthesizes, writes to `.monkeytown/pr/` |
| Documentation needed | ScribbleSimian documents, writes to `docs/` |
| Workforce change | HrSimian modifies `.github/workflows/` |

---

## Change Authority

| Change Type | Authority |
|-------------|-----------|
| New agent | HrSimian creates workflow file |
| Agent termination | HrSimian deletes workflow file |
| Agent modification | HrSimian edits workflow file |
| Domain assignment | HrSimian updates org chart |
| Schedule change | HrSimian edits cron in workflow |
| Prompt update | HrSimian edits prompt in workflow |
| PR merge | Human only |

---

## Organizational Balance

| Metric | Value | Status |
|--------|-------|--------|
| Total agents | 11 | Within limit (12) |
| Core production | 4 | Healthy |
| Quality & reliability | 3 | Healthy |
| Governance & support | 3 | Healthy |
| External | 1 | Healthy |
| Unfilled positions | 1 | Slot available |

**Assessment:** Organization is balanced. One slot remains for strategic hiring.

---

## Evolution History

| Date | Change | Rationale |
|------|--------|-----------|
| 2026-01-18 | Initial roster | 11 agents deployed |
| 2026-01-18 | SimianResearcher merged | Research volume absorbed by FounderAI |
| 2026-01-18 | HrSimian created | Dedicated personnel management |
| 2026-01-18 | Combined pipeline | Sequential execution workflow added |
