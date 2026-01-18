# Monkeytown Agent Ecosystem Overview

## 🐒 The 13-Agent Team

### Product Development Flow

```
FOUNDER → PRODUCT → DESIGN → RESEARCH
    ↓         ↓        ↓        ↓
ORCHESTRATOR ← ECONOMICS ← SECURITY ← CHAOS
    ↓
  BUILDER
    ↓
ARCHITECT → DOCS → PR → HR
```

---

## 📅 Execution Schedule

### Foundation Layer (Top of Hour)

| Time | Agent | Domain | Responsibility |
|------|-------|--------|----------------|
| :00 | **MonkeyBuilder** | Codebase | Implements features, fixes bugs |
| :00 | **ChaosArchitect** | `.monkeytown/architecture/` | System design, infrastructure |
| :00 | **CuriousGeorge** | `.monkeytown/research/` | Market research, trends, insights |
| :00 | **JungleSecurity** | `.monkeytown/security/` + `.monkeytown/qa/` | Security, testing, QA |
| :00 | **FounderAI** | `.monkeytown/vision/` | Vision, roadmap, principles |
| :00 | **MadChimp** | `.monkeytown/chaos/` | Disruption, counter-ideas |
| :00 | **ScribbleSimian** | `docs/` | Documentation, legal |
| :00 | **TownCrier** | `.monkeytown/pr/` | Communications, marketing |

### Synthesis Layer (30 min past)

| Time | Agent | Domain | Responsibility |
|------|-------|--------|----------------|
| :30 | **PrimateDesigner** | `.monkeytown/ux/` | UX/UI design, interactions |
| :30 | **BananaPM** | `.monkeytown/product/` | Product management, requirements |
| :30 | **BananaEconomist** | `.monkeytown/economics/` | Economics, tokens, incentives |
| :30 | **AlphaOrchestrator** | `.monkeytown/decisions/` | **Central coordinator** |
| :30 | **HrSimian** | `.github/workflows/` | Team management, agent lifecycle |

---

## 🔄 Communication Flow

### Reading Dependencies

**Every agent MUST read:**
1. `README.md`
2. `docs/goal.md`
3. `docs/agent-communication-protocol.md`

### Agent Reading Chains

#### Product Chain
```
FounderAI → BananaPM → PrimateDesigner → MonkeyBuilder
    ↑                                           ↓
    ←──────────── Orchestrator ←───────────────
```

#### Infrastructure Chain
```
ChaosArchitect → JungleSecurity → MonkeyBuilder
    ↑                                   ↓
    ←─────── Orchestrator ←─────────────
```

#### Research Chain
```
CuriousGeorge → BananaPM → FounderAI → Orchestrator
    ↑                                      ↓
    ←────────── All Agents ←───────────────
```

#### Communication Chain
```
Orchestrator → TownCrier → ScribbleSimian → World
```

---

## 🎯 Agent Responsibilities by Domain

### Vision & Strategy
- **FounderAI** (`.monkeytown/vision/`)
  - Manifesto, principles, identity
  - Roadmap and strategic direction
  - Feature vision

### Product & Design
- **BananaPM** (`.monkeytown/product/`)
  - User stories, acceptance criteria
  - Feature prioritization
  - Backlog management

- **PrimateDesigner** (`.monkeytown/ux/`)
  - UI/UX concepts
  - Interaction patterns
  - Visual identity

### Technical
- **ChaosArchitect** (`.monkeytown/architecture/`)
  - System architecture
  - Infrastructure design
  - Technical specifications

- **MonkeyBuilder** (Codebase)
  - Implementation
  - Code quality
  - Feature delivery

### Quality & Security
- **JungleSecurity** (`.monkeytown/security/` + `.monkeytown/qa/`)
  - Threat modeling
  - Security requirements
  - Test strategy

### Research & Economics
- **CuriousGeorge** (`.monkeytown/research/`)
  - Market analysis
  - Competitive research
  - Trend analysis

- **BananaEconomist** (`.monkeytown/economics/`)
  - Token models
  - Incentive structures
  - Value flow

### Coordination
- **AlphaOrchestrator** (`.monkeytown/decisions/`)
  - Reads ALL outputs
  - Makes execution decisions
  - Sets priorities
  - Creates synthesis

### Support
- **ScribbleSimian** (`docs/`)
  - Documentation
  - API docs
  - Legal/compliance

- **TownCrier** (`.monkeytown/pr/`)
  - Progress reports
  - Announcements
  - Community updates

- **HrSimian** (`.github/workflows/`)
  - Agent lifecycle
  - Team structure
  - Workflow management

### Disruption
- **MadChimp** (`.monkeytown/chaos/`)
  - Challenges assumptions
  - Introduces chaos scenarios
  - Forces evolution

---

## 🔗 File Ownership Map

```
.monkeytown/
├── vision/           → FounderAI
├── product/         → BananaPM
├── architecture/    → ChaosArchitect
├── ux/              → PrimateDesigner
├── research/        → CuriousGeorge
├── security/        → JungleSecurity
├── qa/              → JungleSecurity
├── economics/       → BananaEconomist
├── chaos/           → MadChimp
├── decisions/       → AlphaOrchestrator
├── docs/            → ScribbleSimian
├── pr/              → TownCrier
├── marketing/       → TownCrier
├── community/       → TownCrier
└── hr/              → HrSimian

.github/workflows/   → HrSimian

/ (root)
├── README.md        → ScribbleSimian (reads all)
├── docs/goal.md    → ScribbleSimian (reads all)
└── [protocol files] → ScribbleSimian (reads all)

/web, /server, etc. → MonkeyBuilder
```

---

## 📊 AlphaOrchestrator: The Central Brain

**AlphaOrchestrator is the only agent that:**
- Reads ALL other agent outputs
- Synthesizes conflicting requirements
- Makes final execution decisions
- Creates the "state of Monkeytown"
- Defines what gets built NOW vs. later

**The Orchestrator's reading list:**
- `.monkeytown/vision/` - What's the dream?
- `.monkeytown/product/` - What do we build?
- `.monkeytown/architecture/` - How does it work?
- `.monkeytown/ux/` - How does it feel?
- `.monkeytown/research/` - What did we learn?
- `.monkeytown/security/` - Is it safe?
- `.monkeytown/economics/` - Is it valuable?
- `.monkeytown/chaos/` - What are we missing?
- `.monkeytown/decisions/` - What did we decide last time?

**The Orchestrator's outputs:**
- `.monkeytown/decisions/priorities.md` - What matters now
- `.monkeytown/decisions/execution-plan.md` - How we'll build it
- `.monkeytown/decisions/state-of-monkeytown.md` - Where we are

---

## 🎮 The Game Development Loop

1. **FounderAI** defines the dream
2. **CuriousGeorge** researches what's possible
3. **BananaPM** creates the plan
4. **PrimateDesigner** makes it beautiful
5. **ChaosArchitect** designs the structure
6. **JungleSecurity** ensures it's safe
7. **BananaEconomist** makes it valuable
8. **MadChimp** challenges everything
9. **AlphaOrchestrator** decides what happens
10. **MonkeyBuilder** makes it real
11. **ScribbleSimian** documents it
12. **TownCrier** tells the world
13. **HrSimian** manages the team

**Repeat every 6 hours** 🔄

---

## 🧠 Key Principles

1. **No Direct Communication** - All interaction via files
2. **No Questions** - Agents make decisions independently
3. **No Global Authority** - Orchestrator coordinates, doesn't command
4. **Contradictions Welcome** - Humans resolve through PRs
5. **Evolution Over Perfection** - Continuous improvement
6. **Players First** - Everything serves the player experience

---

**Agents working together to build games that build themselves!** 🎮✨
