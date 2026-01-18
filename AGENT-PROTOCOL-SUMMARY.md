# Agent Communication Protocol - Summary

## 📋 What Was Created

I've analyzed your 13-agent ecosystem and created a comprehensive communication protocol that establishes a logical flow where agents read each other's outputs for product development.

### Documents Created:

1. **`docs/agent-communication-protocol.md`** ⭐
   - Complete communication protocol
   - Detailed reading order
   - Cross-reference patterns
   - File ownership rules

2. **`docs/agent-reading-order-quickref.md`**
   - Quick reference card for agents
   - Schedule lookup table
   - Communication pattern examples

3. **`docs/agent-ecosystem-overview.md`**
   - Complete agent team map
   - Responsibility breakdown
   - Flow diagrams
   - File ownership map

---

## 🌟 Key Instructions for All Agents

### MANDATORY First Reading (Every Agent):
```
1. README.md
2. docs/goal.md
3. docs/agent-communication-protocol.md ← NEW
```

### Reading Order Established:

**Phase 1: Foundation (Top of Hour)**
- MonkeyBuilder → ChaosArchitect → CuriousGeorge → PrimateDesigner → JungleSecurity → BananaPM → FounderAI

**Phase 2: Synthesis (30 min past)**
- BananaEconomist → MadChimp → **AlphaOrchestrator** (reads ALL) → HrSimian → ScribbleSimian → TownCrier

---

## 🔑 The Central Coordinator: AlphaOrchestrator

**AlphaOrchestrator is the ONLY agent that:**
- Reads ALL other agent outputs
- Synthesizes everything
- Makes final execution decisions
- Creates the master plan

**AlphaOrchestrator's reading checklist includes:**
- ✅ All agent outputs from the current cycle
- ✅ README.md and docs/goal.md
- ✅ Previous decisions
- ✅ Complete state of the system

---

## 💬 How Agents Communicate

### Pattern: File-Based Cross-References

**✅ CORRECT:**
```markdown
Following the architecture in `.monkeytown/architecture/system-design.md`...
See UX concepts in `.monkeytown/ux/ui-concept.md`...
Based on `.monkeytown/vision/manifesto.md`...
```

**❌ WRONG:**
```markdown
"As discussed with the design team..."
"Earlier we decided..."
```

### The Web of Awareness

Each agent:
1. Reads from agents that ran before them
2. References their work using file paths
3. Writes to their own domain
4. Never modifies another agent's files

---

## 📚 Critical Documents Location

| Document | Purpose |
|----------|---------|
| `README.md` | Monkeytown vision & architecture |
| `docs/goal.md` | Project goals and definitions |
| `docs/agent-communication-protocol.md` | **THE PROTOCOL** ← Read this first! |
| `.monkeytown/vision/` | FounderAI domain |
| `.monkeytown/product/` | BananaPM domain |
| `.monkeytown/architecture/` | ChaosArchitect domain |
| `.monkeytown/decisions/` | AlphaOrchestrator domain |
| `/web`, `/server` | MonkeyBuilder domain |

---

## 🎯 Next Steps

### For Each Workflow File:
Add this to the prompt (after line 33, before the agent's specific instructions):

```yaml
      - name: Run [AgentName]
        uses: anomalyco/opencode/github@latest
        env:
          MINIMAX_API_KEY: ${{ secrets.MINIMAX_API_KEY }}
        with:
          model: minimax/MiniMax-M2.1
          prompt: |-
            CRITICAL: Before doing ANYTHING, you MUST:
            1. Read README.md
            2. Read docs/goal.md
            3. Read docs/agent-communication-protocol.md
            4. Read outputs from agents that ran before you (see protocol for reading order)

            [rest of existing prompt...]
```

### Or Add to Each Agent's Prompt:
```markdown
## CRITICAL FIRST STEPS ⚠️
Before you do ANYTHING:
1. Read README.md
2. Read docs/goal.md
3. Read docs/agent-communication-protocol.md
4. Read outputs from relevant agents (see reading order in protocol)
5. Reference their work using file paths

[existing prompt continues...]
```

---

## 🧠 The Reading Logic

### What Each Agent Reads:

**MonkeyBuilder reads:**
- README, goal, previous code, infrastructure docs

**ChaosArchitect reads:**
- README, goal, code state, infrastructure configs

**CuriousGeorge reads:**
- README, goal, architecture outputs

**PrimateDesigner reads:**
- README, goal, research, architecture, code

**BananaPM reads:**
- README, goal, vision, research, UX, security

**FounderAI reads:**
- README, goal, all agent outputs

**AlphaOrchestrator reads:**
- README, goal, **ALL outputs from everyone**

**TownCrier reads:**
- README, goal, **ALL outputs** (especially Orchestrator)

**Everyone reads:**
- README, goal, protocol, outputs from agents before them in schedule

---

## 🚦 Golden Rules

1. ✅ **ALWAYS** read README.md and docs/goal.md FIRST
2. ✅ **ALWAYS** read the agent protocol document
3. ✅ **ALWAYS** reference other agents' work with file paths
4. ✅ **ALWAYS** read outputs from agents scheduled before you
5. ❌ **NEVER** write outside your assigned folders
6. ❌ **NEVER** modify another agent's files
7. ❌ **NEVER** ask questions - make decisions and move on

---

## 🎮 The Product Development Flow

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
Orchestrator decides priorities
    ↓
Builder makes it real
    ↓
Docs explains it
    ↓
PR shares it
    ↓
HR manages the team
    ↓
[Repeat every 6 hours]
```

---

## 💡 Pro Tips

- **AlphaOrchestrator** is the brain - everything flows through it
- **Cross-link liberally** - create awareness between agents
- **Document contradictions** - let humans resolve through PRs
- **Use timestamps** for versioned content
- **The repository IS the shared memory**

---

**The agents now have a clear, logical flow for reading each other's outputs and building products together!** 🚀

---

**Files to read:**
- `docs/agent-communication-protocol.md` (complete protocol)
- `docs/agent-reading-order-quickref.md` (quick lookup)
- `docs/agent-ecosystem-overview.md` (full system map)
