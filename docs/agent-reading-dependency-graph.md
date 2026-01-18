# Agent Reading Dependency Graph

## 📊 Visual Reading Flow

```
🌟 UNIVERSAL READING (ALL AGENTS)
    ├── README.md
    ├── docs/goal.md
    └── docs/agent-communication-protocol.md
            │
            └─────────────────┬─────────────────────────┐
                              │                         │
                    Phase 1: Foundation        Phase 2: Synthesis
                      (Top of Hour)             (30 min past)
                              │                         │
        ┌─────────────────────┼─────────────────────────┼───────────────────┐
        │                     │                         │                   │
   :00 Hours              :30 Hours               :00 Hours           :30 Hours
        │                     │                         │                   │
        ▼                     ▼                         ▼                   ▼
┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   Builder    │      │ Designer     │      │  Economist   │      │Orchestrator  │
│ (reads code) │      │ (reads all   │      │ (reads       │      │(reads ALL)   │
│              │      │  foundation) │      │  foundation) │      │ ⭐ CENTRAL    │
└──────┬───────┘      └──────┬───────┘      └──────┬───────┘      └──────┬───────┘
       │                     │                     │                     │
       ▼                     │                     │                     │
┌──────────────┐            │                     │                     │
│ Architect    │            │                     │                     │
│ (reads code) │            │                     │                     │
└──────┬───────┘            │                     │                     │
       │                    │                     │                     │
       ▼                    │                     │                     │
┌──────────────┐            │                     │                     │
│ Researcher   │            │                     │                     │
│ (reads arch) │            │                     │                     │
└──────┬───────┘            │                     │                     │
       │                    │                     │                     │
       └────────┬───────────┼─────────────────────┼─────────────────────┘
                │           │                     │
                ▼           │                     │
        ┌──────────────┐    │                     │
        │ Product Mgr  │────┘                     │
        │ (reads all  │                          │
        │  foundation) │                          │
        └──────┬───────┘                          │
               │                                  │
               ▼                                  │
        ┌──────────────┐                          │
        │  Founder     │──────────────────────────┘
        │ (reads all)  │
        └──────┬───────┘
               │
               └────────────────────────────────┐
                                                │
        ┌──────────────┐                        │
        │   Chaos      │                        │
        │ (reads ALL)  │                        │
        └──────┬───────┘                        │
               │                                │
               └────────────────────────────────┼──────┐
                                                │      │
        ┌──────────────┐                        │      │
        │   HR        │                        │      │
        │ (reads      │                        │      │
        │  decisions) │                        │      │
        └──────┬───────┘                        │      │
               │                                │      │
               └────────────────────────────────┼──────┘
                                                │
        ┌──────────────┐                        │
        │    Docs      │                        │
        │ (reads ALL)  │                        │
        └──────┬───────┘                        │
               │                                │
               └────────────────────────────────┼──────┐
                                                │      │
        ┌──────────────┐                        │      │
        │     PR       │                        │      │
        │ (reads ALL)  │────────────────────────┘      │
        └──────────────┘                                │
                                                        │
        ┌──────────────┐                                │
        │  Security    │                                │
        │ (reads arch,│                                │
        │  code, UX)  │                                │
        └──────────────┘                                │
                                                        │
        ┌────────────────────────────────────────────────┘
        │
        ▼
    EVERYTHING
    FEEDS INTO
    ORCHESTRATOR
```

---

## 🔗 Detailed Dependency Chains

### Chain 1: Product Development
```
FounderAI
    ↑ (reads all)
    ↑
BananaPM (Product Manager)
    ↑ (reads: Founder, Research, UX, Security)
    ↑
PrimateDesigner (UX)
    ↑ (reads: Research, Architecture, Code)
    ↑
MonkeyBuilder (Code)
    ↑ (reads: Architecture, Infrastructure)
    ↑
ChaosArchitect (Architecture)
    ↑ (reads: Code, Infrastructure)
    ↑
    [reads from codebase]
```

### Chain 2: Research & Economics
```
BananaEconomist (Economics)
    ↑ (reads: Founder, Product, Research)
    ↑
CuriousGeorge (Research)
    ↑ (reads: Architecture)
    ↑
ChaosArchitect
```

### Chain 3: Quality & Chaos
```
MadChimp (Chaos)
    ↑ (reads: ALL agents - challenges everything)
    ↑
JungleSecurity (Security/QA)
    ↑ (reads: Architecture, Code, UX)
    ↑
ChaosArchitect + MonkeyBuilder + PrimateDesigner
```

### Chain 4: Communication
```
TownCrier (PR)
    ↑ (reads: ALL agents)
    ↑
ScribbleSimian (Docs)
    ↑ (reads: ALL agents)
    ↑
AlphaOrchestrator (decides priorities)
    ↑
    [reads from ALL agents]
```

### Chain 5: Team Management
```
HrSimian (HR)
    ↑ (reads: Orchestrator decisions)
    ↑
AlphaOrchestrator
```

---

## ⭐ The Orchestrator at the Center

```
                    ┌─────────────┐
                    │  Orchestrator│ ← READS EVERYTHING
                    │ ⭐ CENTRAL   │
                    │   BRAIN     │
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   Decision              Priority          Execution
        │                  │                  │
        ▼                  ▼                  ▼
    ┌────────┐        ┌─────────┐        ┌─────────┐
    │  WHAT  │        │  WHEN   │        │   HOW   │
    │ matters│        │ matters │        │ matters │
    └────────┘        └─────────┘        └─────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ MonkeyBuilder│
                    │   BUILDS IT  │
                    └──────────────┘
```

---

## 📋 Reading Checklist by Agent

### Universal (All Agents)
- [ ] README.md
- [ ] docs/goal.md
- [ ] docs/agent-communication-protocol.md
- [ ] Previous decisions in `.monkeytown/decisions/`

### By Agent

#### MonkeyBuilder
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] Previous code commits
- [ ] Architecture docs (`.monkeytown/architecture/`)
- [ ] Product requirements (`.monkeytown/product/`)

#### ChaosArchitect
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] Current code state (from MonkeyBuilder)
- [ ] Infrastructure configs

#### CuriousGeorge
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] Architecture outputs (`.monkeytown/architecture/`)
- [ ] Previous research runs

#### PrimateDesigner
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] Research (`.monkeytown/research/`)
- [ ] Architecture (`.monkeytown/architecture/`)
- [ ] Code (from MonkeyBuilder)

#### JungleSecurity
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] Architecture (`.monkeytown/architecture/`)
- [ ] Code (from MonkeyBuilder)
- [ ] UX (`.monkeytown/ux/`)

#### BananaPM
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] Vision (`.monkeytown/vision/`)
- [ ] Research (`.monkeytown/research/`)
- [ ] UX (`.monkeytown/ux/`)
- [ ] Security (`.monkeytown/security/`)

#### FounderAI
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] Product outputs (`.monkeytown/product/`)
- [ ] Research (`.monkeytown/research/`)
- [ ] All agent outputs from previous runs

#### BananaEconomist
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] Vision (`.monkeytown/vision/`)
- [ ] Product (`.monkeytown/product/`)
- [ ] Research (`.monkeytown/research/`)

#### MadChimp
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] **ALL agent outputs** (looks for assumptions to challenge)

#### AlphaOrchestrator ⭐
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] **EVERYTHING from ALL agents** ⭐

#### HrSimian
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] Orchestrator's decisions
- [ ] Current agent roster

#### ScribbleSimian
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] **ALL agent outputs** (to document everything)

#### TownCrier
- [ ] README.md
- [ ] docs/goal.md
- [ ] Protocol document
- [ ] **ALL agent outputs** (especially Orchestrator's decisions)

---

## 🎯 The Critical Path

```
1. FounderAI declares vision
2. CuriousGeorge researches possibilities
3. BananaPM creates product plan
4. PrimateDesigner designs UX
5. ChaosArchitect designs architecture
6. JungleSecurity secures the system
7. BananaEconomist creates value model
8. MadChimp challenges assumptions
9. AlphaOrchestrator decides priorities ⭐
10. MonkeyBuilder implements
11. ScribbleSimian documents
12. TownCrier communicates
13. HrSimian manages team
```

**All agents read from earlier stages, building on each other's work!** 🔄

---

**The reading graph ensures logical flow and maximum collaboration!** 🚀
