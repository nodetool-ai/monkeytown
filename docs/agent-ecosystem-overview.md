# Monkeytown Agent Ecosystem Overview

## 🐒 The 18-Agent Team

### Product Development Flow

```
FOUNDER → PRODUCT → DESIGN → RESEARCH
    ↓         ↓        ↓        ↓
ORCHESTRATOR ← ECONOMICS ← SECURITY ← CHAOS
    ↓
  BUILDER (MonkeyBuilder, FrontendEngineer, BackendEngineer, AIEngineer, PromptEngineer)
    ↓
ARCHITECT → DOCS → PR → HR → TESTING → GAME DESIGN → GAME TESTING
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
| :00 | **ProjectManager** | `.monkeytown/tasks/` | Task scheduling, sprint planning |
| :00 | **PromptEngineer** | `.monkeytown/game-design/prompts/` | Prompt design, agent personalities |

### Synthesis Layer (30 min past)

| Time | Agent | Domain | Responsibility |
|------|-------|--------|----------------|
| :30 | **PrimateDesigner** | `.monkeytown/ux/` | UX/UI design, interactions |
| :30 | **BananaPM** | `.monkeytown/product/` | Product management, requirements |
| :30 | **BananaEconomist** | `.monkeytown/economics/` | Economics, tokens, incentives |
| :30 | **AlphaOrchestrator** | `.monkeytown/decisions/` | **Central coordinator** |
| :30 | **HrSimian** | `.github/workflows/` | Team management, agent lifecycle |
| :30 | **GameDesigner** | `.monkeytown/game-design/` | Game rules, mechanics, balance |
| :30 | **GameTester** | `.monkeytown/game-testing/` | Game testing, bug reports, feedback |

### Engineering Layer (Staggered Minutes)

| Time | Agent | Domain | Responsibility |
|------|-------|--------|----------------|
| :15 | **FrontendEngineer** | `/web` | React/TypeScript frontend |
| :30 | **BackendEngineer** | `/server` | Node.js/TypeScript backend |
| :45 | **AIEngineer** | `/server/src/game/ai/` | AI logic, game AI |

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
├── hr/              → HrSimian
├── tasks/           → ProjectManager, All Engineers
├── game-design/     → GameDesigner
├── game-testing/    → GameTester

.github/workflows/   → HrSimian

/ (root)
├── README.md        → ScribbleSimian (reads all)
├── docs/goal.md    → ScribbleSimian (reads all)
└── [protocol files] → ScribbleSimian (reads all)

/web                 → MonkeyBuilder, FrontendEngineer
/server              → MonkeyBuilder, BackendEngineer, AIEngineer
└── src/game/ai/     → AIEngineer, PromptEngineer
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
10. **MonkeyBuilder** makes it real (with FrontendEngineer, BackendEngineer, AIEngineer, PromptEngineer)
11. **GameDesigner** defines game rules and mechanics
12. **GameTester** validates the gameplay
13. **ScribbleSimian** documents it
14. **TownCrier** tells the world
15. **HrSimian** manages the team
16. **ProjectManager** tracks progress

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

## 🎯 Agent Classification: Factual vs Creative

Agents are classified by their output requirements:

### 🚨 Factual Agents (NO HALLUCINATION)

These agents must only produce verifiable, evidence-based output:

| Agent | Domain | Why Factual |
|-------|--------|-------------|
| **MonkeyBuilder** | Code | Code must compile and run |
| **FrontendEngineer** | Frontend | React components must render |
| **BackendEngineer** | Backend | APIs must function correctly |
| **AIEngineer** | AI | Game AI must work as designed |
| **PromptEngineer** | Prompts | Agent behaviors must be consistent |
| **ChaosArchitect** | Architecture | Designs must be implementable |
| **JungleSecurity** | Security/QA | Vulnerabilities must be real |
| **AlphaOrchestrator** | Decisions | Must synthesize actual agent outputs |
| **GameTester** | Testing | Must report reproducible bugs |
| **GameDesigner** | Game Rules | Rules must be testable |
| **ScribbleSimian** | Documentation | Must document what exists |
| **BananaPM** | Product | Requirements must trace to research |
| **BananaEconomist** | Economics | Models must be implementable |
| **TownCrier** | Communications | Must report actual progress |
| **HrSimian** | HR | Team changes must be justified |

### 🎨 Creative Agents (Exploration Encouraged)

These agents are allowed to explore ideas and imagine possibilities:

| Agent | Domain | Why Creative |
|-------|--------|--------------|
| **MadChimp** | Chaos | Challenges assumptions, imagines edge cases |
| **FounderAI** | Vision | Dreams big, sets ambitious direction |
| **PrimateDesigner** | UX/Design | Explores creative interface ideas |
| **CuriousGeorge** | Research | Synthesizes insights, finds connections |

### Classification Rules

- **Factual agents** must never invent features, bugs, or behaviors that don't exist
- **Creative agents** should push boundaries and explore unconventional ideas
- All agents must still read required documents and stay in their domains
- Creative output should still be grounded in project context

---

**Agents working together to build games that build themselves!** 🎮✨
