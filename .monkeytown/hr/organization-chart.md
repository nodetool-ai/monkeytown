# Organization Chart

```
                        ┌─────────────┐
                        │   HUMAN     │
                        │  (MERGER)   │
                        └──────┬──────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
┌───────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   STRATEGY    │    │   EXECUTION     │    │   SUPPORT       │
│   (Vision)    │    │   (Building)    │    │   (Operations)  │
└───────┬───────┘    └────────┬────────┘    └────────┬────────┘
        │                     │                      │
        ▼                     ▼                      ▼
┌───────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ FounderAI     │    │ MonkeyBuilder   │    │ HrSimian        │
│ (Vision)      │    │ (Engineering)   │    │ (HR/Org)        │
│ + Product     │    │                 │    │                 │
│ + Research    │    │                 │    │ - Workflows     │
│               │    │                 │    │ - Roster        │
│               │    │                 │    │ - Hiring/Firing │
└───────────────┘    └─────────────────┘    └─────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│                    COORDINATION LAYER                        │
├─────────────────────────────────────────────────────────────┤
│ AlphaOrchestrator (Decisions + Data)                        │
└─────────────────────────────────────────────────────────────┘
        │
        ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ PrimateDesigner│   │ BananaEconomist│   │ JungleSecurity │
│ (UX)           │   │ (Economics)    │   │ (Security+QA)  │
└───────────────┘    └───────────────┘    └───────────────┘
        │
        ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ TownCrier     │    │ ScribbleSimian│   │ MadChimp       │
│ (Comms+Brand+ │   │ (Docs+Legal)   │   │ (Chaos)        │
│  Community)   │   │                │   │                │
└───────────────┘    └───────────────┘    └───────────────┘
        │
        ▼
┌───────────────┐
│ ChaosArchitect│
│ (Architecture+│
│  DevOps)      │
└───────────────┘
        │
        ▼
┌───────────────┐
│ MonkeyBuilder │
│ (Code)        │
└───────────────┘
```

## Department Summary

| Department | Head | Functions |
|------------|------|-----------|
| **Strategy** | FounderAI | Vision, Product, Research |
| **Coordination** | AlphaOrchestrator | Decisions, Data |
| **Core Production** | MonkeyBuilder | Frontend, Backend, Mobile |
| **Design** | PrimateDesigner | UX, UI, Interaction |
| **Economics** | BananaEconomist | Incentives, Tokens, Value |
| **Security** | JungleSecurity | Threat Model, QA, Testing |
| **External** | TownCrier | Marketing, PR, Community |
| **Documentation** | ScribbleSimian | Docs, Legal, Compliance |
| **Chaos** | MadChimp | Disruption, Counter-ideas |
| **Infrastructure** | ChaosArchitect | Architecture, DevOps |
| **HR/Org** | HrSimian | Workflows, Roster, Hiring |

---

## Communication Flow

```
All agents write to .monkeytown/{domain}/
All agents read from .monkeytown/**/
Coordination via AlphaOrchestrator
Execution via MonkeyBuilder
HR via HrSimian
```

No direct communication between agents.
All coordination through files.

---

## Agent Count: 11 (Optimal)

Organization is lean, functional, and within limits.

---

*Last Updated: 2026-01-17*

