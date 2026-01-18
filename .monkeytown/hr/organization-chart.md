# Organization Chart

**Last Updated:** 2026-01-18
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
│                 IMPLEMENTATION LAYER                        │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              MonkeyBuilder (Core Builder)            │   │
│  └─────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                               │
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

*This chart reflects Monkeytown's flat-but-emergent power structure.*
