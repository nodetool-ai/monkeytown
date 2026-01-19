# Agent Communication Protocol
**The Logical Flow for Product Development**

---

## 🌟 Universal First Step (MANDATORY)

**EVERY agent MUST begin by reading these foundational documents:**

1. **`README.md`** - The complete Monkeytown vision and architecture
2. **`docs/goal.md`** - The project goal and what this IS and IS NOT
3. **`.monkeytown/tasks/`** - Check for assigned tasks (Engineer Agents)

These define the mission, rules, and context for all work. No exceptions.

---

## 📝 Task-Based Scheduling

Engineer agents pick up work from `.monkeytown/tasks/*.yaml`. Each task file contains:
- `assignee`: Which engineer picks it up (FrontendEngineer, BackendEngineer, AIEngineer, PromptEngineer)
- `dependencies`: Tasks that must complete first
- `priority`: critical, high, medium, low
- `status`: open, in_progress, blocked, completed

**Workflow:**
1. Agent reads all task files in `.monkeytown/tasks/`
2. Finds tasks where `assignee` matches their role
3. Checks that all `dependencies` are completed
4. Implements the task
5. Updates task `status` to `completed`

---

## 📋 The Agent Reading Order

Agents execute in a carefully orchestrated sequence. Each agent reads outputs from agents that ran before them, then adds their own contributions.

### **Phase 1: Foundation** (Runs at top of hour)

#### 1. **MonkeyBuilder** (30 min past: 0,6,12,18)
**Reads:**
- `README.md`
- `docs/goal.md`
- Previous code commits and PRs
- Current codebase state

**Writes:** Code implementations, features, fixes

---

#### 2. **ChaosArchitect** (0 min past: 0,6,12,18)
**Reads:**
- `README.md`
- `docs/goal.md`
- Current code state from MonkeyBuilder
- Infrastructure configs

**Writes:** Architecture decisions, system design, infrastructure

---

#### 3. **CuriousGeorge** (0 min past: 5,11,17,23)
**Reads:**
- `README.md`
- `docs/goal.md`
- Architecture outputs from ChaosArchitect
- Research from previous runs

**Writes:** Research findings, trends, competitor analysis, insights

---

#### 4. **PrimateDesigner** (30 min past: 4,10,16,22)
**Reads:**
- `README.md`
- `docs/goal.md`
- Research from CuriousGeorge
- Architecture from ChaosArchitect
- Current code from MonkeyBuilder

**Writes:** UX concepts, UI designs, interaction patterns

---

#### 5. **JungleSecurity** (0 min past: 4,10,16,22)
**Reads:**
- `README.md`
- `docs/goal.md`
- Architecture from ChaosArchitect
- Code from MonkeyBuilder
- UX from PrimateDesigner

**Writes:** Security requirements, threat models, QA tests

---

#### 6. **BananaPM** (30 min past: 5,11,17,23)
**Reads:**
- `README.md`
- `docs/goal.md`
- Vision from FounderAI (if available)
- Research from CuriousGeorge
- UX from PrimateDesigner
- Security requirements from JungleSecurity

**Writes:** Product requirements, user stories, backlog

---

#### 7. **FounderAI** (0 min past: 2,8,14,20)
**Reads:**
- `README.md`
- `docs/goal.md`
- Product insights from BananaPM
- Research from CuriousGeorge
- All agent outputs from previous runs

**Writes:** Vision updates, roadmap, principles, manifesto

---

### **Phase 2: Synthesis** (Runs 30 min past the hour)

#### 8. **BananaEconomist** (30 min past: 1,7,13,19)
**Reads:**
- `README.md`
- `docs/goal.md`
- Vision from FounderAI
- Product from BananaPM
- Research from CuriousGeorge

**Writes:** Economic models, token systems, incentive structures

---

#### 9. **MadChimp** (0 min past: 1,7,13,19)
**Reads:**
- `README.md`
- `docs/goal.md`
- ALL previous agent outputs
- Looks for assumptions to challenge

**Writes:** Disruption scenarios, counter-ideas, chaos tests

---

#### 10. **GameDesigner** (0 min past: 3,9,15,21) 🎲 **GAME RULES SPECIALIST**
**Reads:**
- `README.md`
- `docs/goal.md`
- `docs/games/` for current game rules
- `.monkeytown/game-testing/` for tester feedback
- Player feedback from analytics

**Writes:** Game rules, mechanics documentation, balance changes, in-game tutorials

**Special Responsibilities:**
- Ensure ALL games have documented rules
- Design mechanics that are testable
- Create in-game explanations
- Respond to GameTester feedback

---

#### 11. **GameTester** (30 min past: 4,10,16,22) 🎯 **GAME TESTING SPECIALIST**
**Reads:**
- `README.md`
- `docs/goal.md`
- `docs/games/` for game rules to verify
- `.monkeytown/game-design/` for design specs
- `web/e2e/` for existing E2E tests
- Current game implementation

**Writes:** Test reports, bug reports, balance feedback, E2E test recommendations

**Special Responsibilities:**
- Play games against all AI opponent types
- Verify rules match implementation
- Report bugs with reproduction steps
- Run and analyze E2E test results

---

#### 12. **AlphaOrchestrator** (30 min past: 2,8,14,20) ⭐ **CENTRAL COORDINATOR**
**Reads:**
- `README.md`
- `docs/goal.md`
- **ALL agent outputs from this cycle**:
  - FounderAI: Vision
  - ChaosArchitect: Architecture
  - CuriousGeorge: Research
  - PrimateDesigner: UX
  - JungleSecurity: Security
  - BananaPM: Product
  - BananaEconomist: Economics
  - MadChimp: Chaos
  - GameDesigner: Game rules
  - GameTester: Game testing
  - Previous decisions

**Writes:** Execution plans, priorities, decisions, state summaries

---

#### 13. **HrSimian** (30 min past: 7,13,19)
**Reads:**
- `README.md`
- `docs/goal.md`
- AlphaOrchestrator's decisions
- Current agent roster

**Writes:** Agent management, team structure, workflow updates

---

#### 14. **ScribbleSimian** (0 min past: 6,12,18)
**Reads:**
- `README.md`
- `docs/goal.md**
- All agent outputs to understand what needs documentation
- Orchestrator's decisions

**Writes:** Documentation, guides, API docs, legal

---

#### 13. **TownCrier** (0 min past: 8,14,20)
**Reads:**
- `README.md`
- `docs/goal.md`
- **ALL agent outputs** (especially Orchestrator's decisions)
- Progress from all agents

**Writes:** PR updates, changelogs, announcements, community updates

---

### **Phase 3: Engineering** (Task-based execution)

#### 15. **FrontendEngineer** (15 min past: 1,7,13,19) 🖥️ **FRONTEND CODE**
**Reads:**
- `README.md`
- `docs/goal.md`
- `.monkeytown/tasks/*.yaml` (tasks assigned to FrontendEngineer)
- `.monkeytown/ux/` (design specs)
- `web/src/` (current code)

**Writes:** React/TypeScript components, pages, hooks, tests

**Special Responsibilities:**
- Pick up tasks from `.monkeytown/tasks/`
- Write working code, not documentation
- Update task status when complete
- Create tests for all components

---

#### 16. **BackendEngineer** (30 min past: 1,7,13,19) ⚙️ **BACKEND CODE**
**Reads:**
- `README.md`
- `docs/goal.md`
- `.monkeytown/tasks/*.yaml` (tasks assigned to BackendEngineer)
- `.monkeytown/architecture/` (system design)
- `server/src/` (current code)

**Writes:** Node.js/TypeScript APIs, services, WebSocket handlers

**Special Responsibilities:**
- Pick up tasks from `.monkeytown/tasks/`
- Write working code, not documentation
- Update task status when complete
- Create tests for all services

---

#### 17. **AIEngineer** (45 min past: 1,7,13,19) 🤖 **AI LOGIC**
**Reads:**
- `README.md`
- `docs/goal.md`
- `.monkeytown/tasks/*.yaml` (tasks assigned to AIEngineer)
- `.monkeytown/game-design/` (game mechanics)
- `server/src/game/` (current AI code)

**Writes:** AI opponent logic, LLM integrations, game AI

**Special Responsibilities:**
- Pick up tasks from `.monkeytown/tasks/`
- Implement AI decision-making
- Use @ax-llm/ax framework
- Create tests for AI logic

---

#### 18. **PromptEngineer** (0 min past: 2,8,14,20) 💬 **PROMPT DESIGN**
**Reads:**
- `README.md`
- `docs/goal.md`
- `.monkeytown/tasks/*.yaml` (tasks assigned to PromptEngineer)
- `.monkeytown/research/agent-personality-frameworks.md`
- `server/src/game/ai/` (current AI code)

**Writes:** AI personality prompts, system prompts, prompt templates

**Special Responsibilities:**
- Pick up tasks from `.monkeytown/tasks/`
- Design distinct AI personalities
- Use @ax-llm/ax signature syntax
- Test prompts for consistency

---

## 🔄 Communication Patterns

### How Agents Leave Signals for Others

#### Cross-References (MANDATORY)
When an agent references work from another agent's domain, they MUST use relative paths:

```
✅ GOOD:
"Based on the architecture in .monkeytown/architecture/system-design.md..."
"See UX concepts in .monkeytown/ux/interface-concept.md..."
"Following the vision in .monkeytown/vision/manifesto.md..."

❌ BAD:
"As discussed earlier..."
"The design team suggested..."
```

#### File Ownership Rules
- Each agent ONLY writes in their assigned folders
- Agents CAN reference other agents' files
- Agents CANNOT modify other agents' files
- Contradictions are OK - humans resolve them

#### Example Communication Flow

**PrimateDesigner writes in `.monkeytown/ux/ui-concept.md`:**
```markdown
## Display Constraints
Following the architecture in `.monkeytown/architecture/system-design.md`,
the UI must support:
- 60Hz refresh rate
- Real-time multiplayer rendering

See also: Product requirements in `.monkeytown/product/user-stories.md`
```

**BananaPM reads this and writes in `.monkeytown/product/requirements.md`:**
```markdown
## UI Requirements
As defined in `.monkeytown/ux/ui-concept.md`:
- Display must support 60Hz for smooth gameplay
- Real-time multiplayer is a core feature

## User Stories
Based on the research insights in `.monkeytown/research/synthesis.md`:
[stories follow...]
```

**AlphaOrchestrator reads both and writes in `.monkeytown/decisions/execution-plan.md`:**
```markdown
## Priority: Real-Time Multiplayer

Based on:
- UX Design: `.monkeytown/ux/ui-concept.md`
- Product Requirements: `.monkeytown/product/requirements.md`
- Architecture: `.monkeytown/architecture/system-design.md`

## Decision: Build real-time multiplayer first

### Rationale
[Synthesized from all inputs]

### Execution Phases
1. Infrastructure (ChaosArchitect)
2. Core Game Loop (MonkeyBuilder)
3. UI Integration (PrimateDesigner)
4. Security Review (JungleSecurity)
```

---

## 📚 Required Reading Checklist

Each agent MUST check for and read these files before writing:

### Universal (ALL agents)
- [ ] `README.md`
- [ ] `docs/goal.md`
- [ ] Previous run summaries in `.monkeytown/decisions/`

### By Agent Type

**Product Development Agents:**
- [ ] `.monkeytown/vision/` (FounderAI)
- [ ] `.monkeytown/product/` (BananaPM)
- [ ] `.monkeytown/architecture/` (ChaosArchitect)
- [ ] `.monkeytown/ux/` (PrimateDesigner)
- [ ] `.monkeytown/research/` (CuriousGeorge)

**Infrastructure Agents:**
- [ ] `.monkeytown/architecture/` (ChaosArchitect)
- [ ] `.monkeytown/security/` (JungleSecurity)
- [ ] `.monkeytown/economics/` (BananaEconomist)

**Quality & Chaos Agents:**
- [ ] `.monkeytown/qa/` (JungleSecurity)
- [ ] `.monkeytown/chaos/` (MadChimp)

**Communication Agents:**
- [ ] `.monkeytown/decisions/` (AlphaOrchestrator)
- [ ] `.monkeytown/pr/` (TownCrier)
- [ ] `.monkeytown/docs/` (ScribbleSimian)

---

## 🎯 The Feedback Loop

1. **Foundation Agents** (Builder, Architect, Researcher, Designer, Security) produce raw outputs
2. **Product Agents** (PM, Economist) synthesize into plans
3. **Founder** defines vision and direction
4. **Chaos Agent** challenges assumptions
5. **Orchestrator** makes final decisions and prioritizes
6. **Team Agents** (HR, Docs, PR) support and communicate
7. **Engineer Agents** (Frontend, Backend, AI, Prompt) pick up tasks and write code

This creates a **multi-pass refinement** where ideas evolve through multiple perspectives.

---

## 🚦 Critical Rules

1. **ALWAYS read README.md and docs/goal.md first**
2. **ALWAYS reference other agents' work using file paths**
3. **ALWAYS read outputs from agents that ran before you**
4. **ALWAYS write in your assigned folders only**
5. **NEVER modify another agent's files**
6. **NEVER ask questions - always make decisions**
7. **ALWAYS produce output, even if it's "no change needed"**
8. **FACTUAL agents: NEVER hallucinate or invent non-existent features/bugs**
9. **CREATIVE agents: Explore boldly but stay grounded in project context**

---

## 🎯 Factual vs Creative Agents

### Factual Agents (NO HALLUCINATION)
MonkeyBuilder, ChaosArchitect, JungleSecurity, AlphaOrchestrator, GameTester, GameDesigner, ScribbleSimian, BananaPM, BananaEconomist, TownCrier, HrSimian, FrontendEngineer, BackendEngineer, AIEngineer, PromptEngineer

- Must only document/create what actually exists or can be verified
- All outputs must trace back to evidence or source materials
- Never invent vulnerabilities, bugs, or features that don't exist

### Creative Agents (Exploration Encouraged)
MadChimp, FounderAI, PrimateDesigner, CuriousGeorge

- May explore hypotheticals and edge cases
- May dream big and challenge assumptions
- Should still be grounded in project context

---

## 💡 Pro Tips

- Use timestamps in filenames for versioned content
- Cross-link liberally - create a web of awareness
- When disagreeing with another agent, document BOTH perspectives
- The Orchestrator is the only agent that "concludes" - everyone else "contributes"
- If you can't find what you need from other agents, write a "signaling" file explaining what you're looking for

---

**Remember: The repository IS the shared memory. File-based communication is the ONLY way agents interact.**

---

*Generated by the Monkeytown Protocol - Agents that build games for players* 🎮✨
