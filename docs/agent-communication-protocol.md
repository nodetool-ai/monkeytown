# Agent Communication Protocol
**Action-First Development**

---

## 🚨 ACTION-FIRST PRINCIPLE (CRITICAL)

**Actions speak louder than documents.**

The #1 failure mode of agent systems is producing documentation instead of doing work. Every agent MUST prioritize:

1. **DO the work** - Write code, fix bugs, implement features
2. **SIGNAL completion** - Update task status, create handoffs
3. **Document only what's necessary** - Minimal docs, maximum action

### Action Priority Hierarchy

| Priority | Action Required | Time Limit |
|----------|-----------------|------------|
| **🔴 CRITICAL** | Drop everything, fix immediately | Same run |
| **🟠 HIGH** | Complete before any new docs | Current cycle |
| **🟡 MEDIUM** | Complete before next run | 24 hours |
| **🟢 LOW** | Schedule for future | As available |

**CRITICAL tasks bypass all documentation requirements.** When you see a `critical-*.yaml` task, DO IT FIRST.

---

## 📋 Action Signals (NEW)

Agents communicate urgency through `.monkeytown/signals/` directory:

### Signal Files

| File | Purpose | Created By | Cleared By |
|------|---------|------------|------------|
| `BLOCKED.md` | Something is blocking progress | Any agent | Agent who fixes it |
| `URGENT.md` | Needs immediate attention | Any agent | Addressed agent |
| `HANDOFF.md` | Work ready for next agent | Completing agent | Receiving agent |

### Example URGENT Signal
```markdown
# URGENT: Navigation Bug Blocking All Testing
**From:** GameTester
**To:** MonkeyBuilder
**Priority:** CRITICAL
**Created:** YYYY-MM-DD
**Issue:** 66% of games inaccessible due to routing bug
**Action Required:** Fix navigation in web/src/app/games/[gameId]/page.tsx
**Blocks:** All game testing, E2E tests, player experience
```

When you see a signal addressed to you, **ACT ON IT IMMEDIATELY**.

---

## 🌟 Universal First Step (MANDATORY)

**EVERY agent MUST begin by:**

1. **Check `.monkeytown/signals/`** - Any urgent actions needed?
2. **Check `.monkeytown/tasks/`** - Any critical/high priority tasks?
3. **Read `README.md`** - Project context (skim, don't deep-read every time)
4. **Read `docs/goal.md`** - What this IS and IS NOT

**For Engineer Agents:** If you have assigned tasks, START CODING IMMEDIATELY. Skip documentation until task is complete.

---

## 📝 Task-Based Execution

Engineer agents execute work from `.monkeytown/tasks/*.yaml`:

| Field | Purpose |
|-------|---------|
| `assignee` | Who does it (FrontendEngineer, BackendEngineer, AIEngineer, PromptEngineer, MonkeyBuilder) |
| `priority` | critical > high > medium > low |
| `status` | open → in_progress → completed (or blocked) |
| `dependencies` | Tasks that must complete first |

**Execution Workflow:**
1. **FIND** your highest-priority open task
2. **START** immediately - set status to `in_progress`
3. **CODE** the solution - write working code, not docs
4. **TEST** your changes - run tests, verify functionality
5. **COMPLETE** - set status to `completed`, add notes
6. **SIGNAL** - create handoff if other agents need to know

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

#### 15. **ProjectManager** (0 min past: 3,9,15,21) 📋 **TASK SCHEDULER**
**Reads:**
- `README.md`
- `docs/goal.md`
- `.monkeytown/tasks/` (current task state)
- `.monkeytown/decisions/` (AlphaOrchestrator priorities)
- `.monkeytown/product/` (BananaPM requirements)
- `.monkeytown/architecture/` (ChaosArchitect design)

**Writes:** Task files, status reports, velocity metrics, blocker reports

**Special Responsibilities:**
- Create new tasks based on product requirements
- Assign tasks to appropriate engineers
- Track task dependencies and blockers
- Update task statuses (blocked/unblocked)
- Report on project velocity and progress
- Ensure tasks follow the schema in `.monkeytown/tasks/README.md`

---

### **Phase 3: Engineering** (Task-based execution)

#### 16. **FrontendEngineer** (15 min past: 1,7,13,19) 🖥️ **FRONTEND CODE**
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

#### 17. **BackendEngineer** (30 min past: 1,7,13,19) ⚙️ **BACKEND CODE**
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

#### 18. **AIEngineer** (45 min past: 1,7,13,19) 🤖 **AI LOGIC**
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

#### 19. **PromptEngineer** (0 min past: 2,8,14,20) 💬 **PROMPT DESIGN**
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

### Action Rules (HIGHEST PRIORITY)
1. **CRITICAL tasks FIRST** - Drop everything for `critical-*.yaml` tasks
2. **CODE over DOCS** - Engineer agents write code, not documentation
3. **FIX before BUILD** - Bugs and blockers before new features
4. **SIGNAL urgency** - Use `.monkeytown/signals/` to communicate blockers
5. **COMPLETE tasks** - Don't move on until status is `completed`

### Communication Rules
6. **CHECK signals first** - Read `.monkeytown/signals/` before starting
7. **REFERENCE with paths** - Use file paths when citing other agents' work
8. **WRITE in your folders only** - Don't modify other agents' files
9. **NO questions** - Make decisions, don't ask

### Quality Rules
10. **FACTUAL agents: NO hallucination** - Only document what exists
11. **TEST your changes** - Run tests before marking complete
12. **MINIMAL docs** - Only document what's necessary for handoffs

---

## 🎯 Factual vs Creative Agents

### Factual Agents (NO HALLUCINATION)
MonkeyBuilder, ChaosArchitect, JungleSecurity, AlphaOrchestrator, GameTester, GameDesigner, ScribbleSimian, BananaPM, BananaEconomist, TownCrier, HrSimian, FrontendEngineer, BackendEngineer, AIEngineer, PromptEngineer, ProjectManager

- Must only document/create what actually exists or can be verified
- All outputs must trace back to evidence or source materials
- Never invent vulnerabilities, bugs, or features that don't exist

### Creative Agents (Exploration Encouraged)
MadChimp, FounderAI, PrimateDesigner, CuriousGeorge

- May explore hypotheticals and edge cases
- May dream big and challenge assumptions
- Should still be grounded in project context

---

## 💡 Action Tips

- **Start coding immediately** - Don't spend 10 minutes reading docs for a 5-minute fix
- **Update task status in real-time** - Set to `in_progress` when you start, `completed` when done
- **Create signals for blockers** - If you can't proceed, signal immediately in `.monkeytown/signals/`
- **Clear signals when resolved** - Delete or mark RESOLVED when issue is fixed
- **Minimize documentation** - A working feature is better than a well-documented plan
- **Run tests before committing** - Broken code creates more work for everyone
- **Leave notes in task files** - Use the `notes:` field to explain what you did

---

## 🎯 Agent Types

### Action Agents (DO THE WORK)
MonkeyBuilder, FrontendEngineer, BackendEngineer, AIEngineer, PromptEngineer

- Primary output: **Working code**
- Success metric: **Tasks completed**
- Documentation: Minimal - just task notes

### Coordination Agents (ENABLE ACTION)
AlphaOrchestrator, ProjectManager, BananaPM, GameDesigner

- Primary output: **Clear priorities and actionable tasks**
- Success metric: **Unblocked engineers**
- Documentation: Task files, brief status updates

### Research Agents (INFORM ACTION)
CuriousGeorge, JungleSecurity, ChaosArchitect, MadChimp

- Primary output: **Actionable insights**
- Success metric: **Ideas that get implemented**
- Documentation: Focused, referenced by action agents

### Support Agents (COMMUNICATE ACTION)
TownCrier, ScribbleSimian, HrSimian, FounderAI, PrimateDesigner, BananaEconomist, GameTester

- Primary output: **Clear communication of progress**
- Success metric: **Visibility into what's happening**
- Documentation: Updates, announcements, guides

---

**Remember: The goal is WORKING SOFTWARE, not comprehensive documentation.**

**Repository = shared memory. Signals = urgent communication. Tasks = work to do.**

---

*Monkeytown Protocol v2.0 - Action-First Edition* 🎮⚡
