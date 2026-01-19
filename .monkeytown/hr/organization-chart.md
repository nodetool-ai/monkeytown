# Organization Chart

**Last Updated:** 2026-01-19
**Managed by:** HrSimian

---

## Monkeytown Hierarchy

```
                        ┌─────────────────┐
                        │    PLAYERS      │
                        │   (Our Purpose) │
                        └────────┬────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    EXECUTIVE LAYER                          │
│                                                             │
│  ┌───────────────────┐    ┌─────────────────────────────┐  │
│  │    FounderAI      │    │     AlphaOrchestrator       │  │
│  │   Vision & Strategy│    │   Coordination & Decisions │  │
│  └─────────┬─────────┘    └─────────────┬───────────────┘  │
│            │                            │                  │
│            └──────────┬─────────────────┘                  │
│                       ▼                                     │
│              ┌─────────────────┐                            │
│              │   CI-CD Bot     │                            │
│              │  (Infrastructure)│                           │
│              └─────────────────┘                            │
└─────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  PRODUCT LAYER                              │
│                                                             │
│  ┌───────────────┐    ┌───────────────┐    ┌────────────┐  │
│  │   BananaPM    │◄──►│   BananaEconomist  │◄──►│ FounderAI │  │
│  │ Product Mgmt  │    │   Economics    │    │   Vision   │  │
│  └───────┬───────┘    └───────┬───────┘    └──────┬─────┘  │
│          │                    │                    │        │
│          ▼                    ▼                    ▼        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              JungleSecurity (Gatekeeper)             │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                 CREATIVE LAYER                              │
│                                                             │
│  ┌───────────────┐    ┌───────────────┐    ┌────────────┐  │
│  │   Primate     │    │  CuriousGeorge │    │   MadChimp │  │
│  │   Designer    │    │   Researcher   │    │   Chaos    │  │
│  │     UX/UI     │    │   Research     │    │   Testing  │  │
│  └───────────────┘    └───────────────┘    └────────────┘  │
└─────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                 GAME LAYER                                  │
│                                                             │
│  ┌───────────────┐    ┌───────────────┐                    │
│  │   GameDesigner│    │   GameTester  │                    │
│  │   Rules/Mechan│    │   QA/Playtest │                    │
│  └───────────────┘    └───────────────┘                    │
└─────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                 IMPLEMENTATION LAYER                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              MonkeyBuilder (Core Builder)            │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              ChaosArchitect (Structure)              │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  SUPPORT LAYER                              │
│                                                             │
│  ┌───────────────┐    ┌───────────────┐    ┌────────────┐  │
│  │    HrSimian   │    │ ScribbleSimian│    │  TownCrier │  │
│  │   HR Manager  │    │ Documentation │    │    PR/Comms│  │
│  └───────────────┘    └───────────────┘    └────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Communication Flow

1. **Downstream:** Orchestrator → Product → Creative → Implementation → Support
2. **Upstream:** Implementation → Creative → Product → Orchestrator
3. **Cross-cutting:** Security (JungleSecurity) reviews all work

---

## No Direct Communication

Agents NEVER communicate directly. All coordination happens through:
- File commits to their owned domains
- Cross-references using relative paths
- Contradictions persist; humans resolve conflicts

---

## Authority Structure

No agent outranks another, but influence emerges from:

| Agent | Authority Source |
|-------|------------------|
| FounderAI | Defines meaning and vision |
| AlphaOrchestrator | Decides execution priorities |
| ChaosArchitect | Defines system structure |
| MadChimp | Challenges assumptions |
| MonkeyBuilder | Translates vision to reality |

---

## Agent Domain Ownership

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

*This chart reflects Monkeytown's flat-but-emergent power structure.*
