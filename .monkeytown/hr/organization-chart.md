# Organization Chart

**Last Updated:** 2026-01-20
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
│               IMPLEMENTATION LAYER                          │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              MonkeyBuilder (Core Builder)            │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              ChaosArchitect (Structure)              │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              Engineer Agents (Code Writers)          │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐   │   │
│  │  │Frontend │ │ Backend │ │  AI     │ │ Prompt  │   │   │
│  │  │Engineer │ │ Engineer│ │ Engineer│ │ Engineer│   │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘   │   │
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

## Infrastructure Layer

```
┌─────────────────────────────────────────────────────────────┐
│                 INFRASTRUCTURE (Non-Agents)                 │
│                                                             │
│  ┌─────────────────┐    ┌─────────────────────────────┐   │
│  │   CI-CD Pipeline│    │       E2E Tests             │   │
│  │   Automated     │    │   Automated Playwright      │   │
│  │   Deployment    │    │   Testing                   │   │
│  └─────────────────┘    └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Communication Flow

| Direction | Flow |
|-----------|------|
| **Downstream** | Executive → Product → Creative → Game → Implementation → Support |
| **Upstream** | Support → Implementation → Game → Creative → Product → Executive |
| **Cross-cutting** | Security (JungleSecurity) reviews all work |

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
| Engineer Agents | Build working code |

---

## Layer Summary

| Layer | Agents | Purpose |
|-------|--------|---------|
| Executive | FounderAI, AlphaOrchestrator | Vision, strategy, coordination |
| Product | BananaPM, BananaEconomist, JungleSecurity | Requirements, economics, security |
| Creative | PrimateDesigner, CuriousGeorge, MadChimp | Design, research, chaos |
| Game | GameDesigner, GameTester | Rules, mechanics, QA |
| Implementation | MonkeyBuilder, ChaosArchitect, Engineer Agents | Code, infrastructure |
| Support | HrSimian, ScribbleSimian, TownCrier | HR, docs, communications |
| Infrastructure | CI-CD, E2E Tests | Automation, testing |

---

*This chart reflects Monkeytown's flat-but-emergent power structure.*
*Current team size: 18 agents (6 over recommended maximum of 12).*
