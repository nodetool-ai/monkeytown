# Implementation Guide: Agent Communication Protocol

## ✅ What Was Accomplished

I've analyzed your 13-agent Monkeytown ecosystem and created a comprehensive communication protocol that establishes a **logical flow where agents read each other's outputs** for product development.

---

## 📚 Documents Created

### 1. Core Protocol Documents

| File | Purpose | Audience |
|------|---------|----------|
| **`AGENT-PROTOCOL-SUMMARY.md`** | Executive summary & quick start | You & Agents |
| **`docs/agent-communication-protocol.md`** | Complete protocol specification | All Agents |
| **`docs/agent-reading-order-quickref.md`** | Quick reference card | Agents |
| **`docs/agent-ecosystem-overview.md`** | System map & dependencies | You & Agents |
| **`docs/agent-reading-dependency-graph.md`** | Visual dependency flows | You & Agents |

---

## 🎯 Key Instructions for All Agents

### MANDATORY First Reading (Every Agent):

```
1. README.md                    ← Foundational vision
2. docs/goal.md               ← Project goals
3. docs/agent-communication-protocol.md  ← THE PROTOCOL
```

### The Logical Reading Order:

#### Phase 1: Foundation (Top of Hour)
```
:00 MonkeyBuilder     → Reads code state
:00 ChaosArchitect    → Reads Builder's code
:00 CuriousGeorge     → Reads Architect's work
:30 PrimateDesigner   → Reads Research, Architecture, Code
:00 JungleSecurity   → Reads Architecture, Code, UX
:30 BananaPM         → Reads Vision, Research, UX, Security
:00 FounderAI        → Reads ALL outputs
```

#### Phase 2: Synthesis (30 min past)
```
:30 BananaEconomist  → Reads Vision, Product, Research
:00 MadChimp        → Reads ALL (challenges assumptions)
:30 AlphaOrchestrator → Reads EVERYTHING ⭐ CENTRAL BRAIN
:30 HrSimian        → Reads Orchestrator's decisions
:00 ScribbleSimian  → Reads ALL (documents everything)
:00 TownCrier       → Reads ALL (communicates everything)
```

---

## 🔑 The Central Coordinator: AlphaOrchestrator

**AlphaOrchestrator is unique:**
- It's the ONLY agent that reads ALL other outputs
- Synthesizes conflicting requirements
- Makes final execution decisions
- Creates the "state of Monkeytown"
- Defines what gets built NOW vs. later

**The Orchestrator's reading list includes ALL agent outputs plus:**
- README.md
- docs/goal.md
- Complete protocol
- Previous decisions

---

## 💬 How Agents Communicate

### File-Based Cross-References (MANDATORY)

**✅ CORRECT:**
```markdown
"Following the architecture in `.monkeytown/architecture/system-design.md`..."
"See UX concepts in `.monkeytown/ux/ui-concept.md`..."
"Based on `.monkeytown/vision/manifesto.md`..."
```

**❌ WRONG:**
```markdown
"As discussed with the design team..."
"Earlier we decided..."
```

### The Web of Awareness

Each agent:
1. ✅ Reads from agents that ran before them in the schedule
2. ✅ References their work using file paths
3. ✅ Writes to their own domain only
4. ✅ Never modifies another agent's files
5. ✅ Never asks questions - makes decisions

---

## 🚀 Implementation Steps

### Step 1: Add Protocol to Workflow Prompts

For **each** `.github/workflows/*.yml` file, add this section to the agent prompt:

```yaml
prompt: |-
  CRITICAL: Before doing ANYTHING:
  1. Read README.md
  2. Read docs/goal.md
  3. Read docs/agent-communication-protocol.md
  4. Read outputs from agents that ran before you (see reading order)

  [rest of existing prompt...]
```

### Step 2: Agent-Specific Reading Additions

Each agent's prompt should include:

**Example for BananaPM:**
```markdown
## Your Reading Mission 💫
- Read README.md and docs/goal.md FIRST
- Read docs/agent-communication-protocol.md
- Read outputs from:
  * FounderAI: .monkeytown/vision/
  * CuriousGeorge: .monkeytown/research/
  * PrimateDesigner: .monkeytown/ux/
  * JungleSecurity: .monkeytown/security/

[existing mission continues...]
```

**Example for AlphaOrchestrator:**
```markdown
## Your Reading Mission 💫 ⭐
- Read README.md and docs/goal.md FIRST
- Read docs/agent-communication-protocol.md
- Read ALL outputs from:
  * FounderAI: .monkeytown/vision/
  * ChaosArchitect: .monkeytown/architecture/
  * CuriousGeorge: .monkeytown/research/
  * PrimateDesigner: .monkeytown/ux/
  * JungleSecurity: .monkeytown/security/ + .monkeytown/qa/
  * BananaPM: .monkeytown/product/
  * BananaEconomist: .monkeytown/economics/
  * MadChimp: .monkeytown/chaos/
  * Previous decisions in .monkeytown/decisions/

[existing mission continues...]
```

---

## 📊 The Product Development Flow

```
Founder defines vision
    ↓
Researcher discovers possibilities
    ↓
Product Manager creates plan
    ↓
Designer makes it beautiful
    ↓
Architect designs structure
    ↓
Security ensures safety
    ↓
Economist adds value
    ↓
Chaos challenges assumptions
    ↓
Orchestrator decides priorities ⭐
    ↓
Builder makes it real
    ↓
Docs explains it
    ↓
PR shares it
    ↓
HR manages team
    ↓
[Repeat every 6 hours]
```

---

## 🧠 The Reading Logic by Agent

### Builder Chain
```
MonkeyBuilder
    ↓ (reads)
ChaosArchitect
    ↓ (reads)
CuriousGeorge
    ↓ (reads)
    [universal docs]
```

### Product Chain
```
FounderAI
    ↓ (reads all)
BananaPM
    ↓ (reads: Founder, Research, UX, Security)
PrimateDesigner
    ↓ (reads: Research, Architecture, Code)
    ↓ (reads from)
MonkeyBuilder
```

### Quality Chain
```
MadChimp
    ↓ (challenges all)
JungleSecurity
    ↓ (reads: Architecture, Code, UX)
    ↓ (reads from)
ChaosArchitect + MonkeyBuilder + PrimateDesigner
```

### Communication Chain
```
AlphaOrchestrator
    ↓ (decides)
TownCrier
    ↓ (communicates)
ScribbleSimian
    ↓ (documents)
    [all agents]
```

---

## 🎯 Golden Rules

1. ✅ **ALWAYS** read README.md and docs/goal.md FIRST
2. ✅ **ALWAYS** read the agent protocol document
3. ✅ **ALWAYS** reference other agents' work with file paths
4. ✅ **ALWAYS** read outputs from agents scheduled before you
5. ❌ **NEVER** write outside your assigned folders
6. ❌ **NEVER** modify another agent's files
7. ❌ **NEVER** ask questions - make decisions and move on

---

## 📋 File Ownership (Quick Reference)

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
├── decisions/       → AlphaOrchestrator ⭐
├── docs/            → ScribbleSimian
├── pr/              → TownCrier
├── marketing/       → TownCrier
├── community/       → TownCrier
└── hr/              → HrSimian

.github/workflows/   → HrSimian

/web, /server, etc.  → MonkeyBuilder

docs/                → ScribbleSimian (reads all)
README.md            → All agents (read first)
```

---

## 🔄 The Feedback Loop

1. **Foundation Agents** produce raw outputs (Builder, Architect, Researcher, Designer, Security)
2. **Product Agents** synthesize into plans (PM, Economist)
3. **Founder** defines vision and direction
4. **Chaos Agent** challenges assumptions
5. **Orchestrator** makes final decisions and prioritizes
6. **Support Agents** (HR, Docs, PR) support and communicate

This creates **multi-pass refinement** where ideas evolve through multiple perspectives.

---

## 🎮 What This Enables

✅ **Logical Flow**: Agents build on each other's work in the right order
✅ **Awareness**: Each agent knows what others are doing
✅ **Coordination**: AlphaOrchestrator synthesizes everything
✅ **Evolution**: Ideas improve through multiple perspectives
✅ **Transparency**: All communication via files in the repo
✅ **No Direct Communication**: Clean, async collaboration
✅ **Contradictions Welcome**: Humans resolve through PRs

---

## 📖 Next Steps

### For You:
1. Review the protocol documents
2. Add the protocol reference to workflow prompts
3. Test the communication flow
4. Watch agents collaborate!

### For Agents:
1. **READ** `AGENT-PROTOCOL-SUMMARY.md` first
2. **READ** `docs/agent-communication-protocol.md`
3. **FOLLOW** the reading order for your agent type
4. **REFERENCE** other agents using file paths
5. **BUILD** on previous outputs

---

## 💡 Pro Tips

- **AlphaOrchestrator is central** - everything flows through it
- **Cross-link liberally** - create awareness between agents
- **Document contradictions** - let humans resolve through PRs
- **Use timestamps** for versioned content
- **The repository IS the shared memory**
- **Read first, then write** - always!

---

## 🎉 The Result

**Your 14 agents now have a clear, logical protocol for:**
1. Reading foundational documents (README, goals)
2. Reading each other's outputs in the right order
3. Communicating via file references
4. Building products collaboratively
5. Evolving the system continuously

**The agents will now work together like a well-orchestrated team!** 🎮✨

---

**Files to read:**
- `AGENT-PROTOCOL-SUMMARY.md` (start here!)
- `docs/agent-communication-protocol.md` (full details)
- `docs/agent-reading-dependency-graph.md` (visual flows)
- `docs/agent-ecosystem-overview.md` (complete map)
