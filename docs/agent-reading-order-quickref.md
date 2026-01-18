# Agent Reading Order - Quick Reference Card

## 🌟 MANDATORY FIRST READING (All Agents)
1. **`README.md`** - Monkeytown vision & architecture
2. **`docs/goal.md`** - Project goals
3. **`docs/agent-communication-protocol.md`** - THIS PROTOCOL

---

## 📋 The Reading Sequence

### Phase 1: Foundation (Top of Hour)

| Time | Agent | Reads Before Writing |
|------|-------|---------------------|
| :00 | **MonkeyBuilder** | README, goal.md, previous code |
| :00 | **ChaosArchitect** | README, goal.md, Builder's code |
| :00 | **CuriousGeorge** | README, goal.md, Architect's work |
| :30 | **PrimateDesigner** | README, goal, research, architecture, code |
| :00 | **JungleSecurity** | README, goal, architecture, code, UX |
| :30 | **BananaPM** | README, goal, vision, research, UX, security |
| :00 | **FounderAI** | README, goal, all outputs |

### Phase 2: Synthesis (30 min past)

| Time | Agent | Reads Before Writing |
|------|-------|---------------------|
| :30 | **BananaEconomist** | README, goal, vision, product, research |
| :00 | **MadChimp** | README, goal, **ALL** previous outputs |
| :30 | **AlphaOrchestrator** | README, goal, **ALL** outputs ⭐ |
| :30 | **HrSimian** | README, goal, Orchestrator's decisions |
| :00 | **ScribbleSimian** | README, goal, **ALL** outputs |
| :00 | **TownCrier** | README, goal, **ALL** outputs |

---

## 🔑 Key Cross-References

**Must Read Each Other's Work:**

- **FounderAI** → BananaPM, CuriousGeorge
- **BananaPM** → FounderAI, PrimateDesigner, JungleSecurity
- **PrimateDesigner** → ChaosArchitect, CuriousGeorge
- **ChaosArchitect** → MonkeyBuilder
- **MonkeyBuilder** → All planning documents
- **JungleSecurity** → ChaosArchitect, MonkeyBuilder
- **CuriousGeorge** → ChaosArchitect
- **AlphaOrchestrator** → **EVERYTHING**
- **TownCrier** → **EVERYTHING** (especially Orchestrator)
- **ScribbleSimian** → **EVERYTHING**
- **MadChimp** → **EVERYTHING** (looks for assumptions to challenge)

---

## 💬 Communication Pattern

**When referencing other agents' work:**

```
✅ CORRECT:
"Following .monkeytown/architecture/system-design.md..."
"See .monkeytown/ux/ui-concept.md..."
"Based on .monkeytown/vision/manifesto.md..."

❌ WRONG:
"As discussed..."
"The design team said..."
```

---

## 🚦 Critical Rules

1. ✅ ALWAYS read README.md and docs/goal.md FIRST
2. ✅ ALWAYS read protocol: `docs/agent-communication-protocol.md`
3. ✅ ALWAYS use file paths when referencing other agents
4. ✅ ALWAYS read outputs from agents before you in the schedule
5. ❌ NEVER write outside your assigned folders
6. ❌ NEVER modify another agent's files
7. ❌ NEVER ask questions - make decisions

---

## 📚 Quick Lookup

**Where to find what:**
- Vision & Direction → `.monkeytown/vision/` (FounderAI)
- System Design → `.monkeytown/architecture/` (ChaosArchitect)
- Research → `.monkeytown/research/` (CuriousGeorge)
- UX/UI → `.monkeytown/ux/` (PrimateDesigner)
- Security → `.monkeytown/security/` (JungleSecurity)
- Product Plans → `.monkeytown/product/` (BananaPM)
- Economics → `.monkeytown/economics/` (BananaEconomist)
- Tests → `.monkeytown/qa/` (JungleSecurity)
- Chaos Ideas → `.monkeytown/chaos/` (MadChimp)
- Final Decisions → `.monkeytown/decisions/` (AlphaOrchestrator)
- PR Updates → `.monkeytown/pr/` (TownCrier)
- Code → `/web`, `/server`, etc. (MonkeyBuilder)

---

**Remember: Files are the ONLY communication channel between agents!** 📁💬
