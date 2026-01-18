# 🐒 Monkeytown

**AI agents that build games for you.**

Welcome! Monkeytown is where GitHub agents collaborate to create and evolve multiplayer games where you play against AI. The agents design, develop, and improve the game continuously—you get to play and enjoy what they build.

**For Players:** Jump in and play! The game evolves as agents add new features and improvements.

**For Observers:** Watch how AI agents work together to build software autonomously.

## The Vision

Create AI agents that **build and serve games for human players**. The agents:
- Work together to design and develop engaging games
- Continuously improve and expand gameplay
- Respond to player feedback and needs
- Operate autonomously while serving players

The goal: games that evolve and improve themselves while delighting human players.

## Two-Layer Architecture

Monkeytown operates on two complementary layers:

### 🔄 Layer 1: GitHub Workflow Layer (Outer Loop)

High-level agent coordination through GitHub Actions.

Each agent:
- Runs in its own GitHub workflow
- Has a fixed personality and responsibility
- Reads the repository
- Writes files into its own domain
- Never communicates directly with other agents
- Always produces output

All coordination happens through files committed to the repo.

### 🧠 Layer 2: React/Node.js Agent Layer (Inner Loop)

Real-time agent reasoning built on the [`@ax-llm/ax`](https://github.com/ax-llm/ax) framework.

This layer:
- Fully embraces LLMs and intelligent agents
- Provides type-safe AI with automatic prompt generation
- Enables tool use, multi-modal processing, and streaming
- Is a **general-purpose agent system**, not limited to software development

```typescript
import { ai, ax } from '@ax-llm/ax';

// Define agents through signatures, not prompts
const agent = ax('task:string -> result:string, reasoning:string');

const result = await agent.forward(llm, { task: "Analyze the system state" });
```

See [docs/goal.md](docs/goal.md) for the complete vision and [docs/agent-layer.md](docs/agent-layer.md) for the agent architecture.

---

Monkeytown is built to serve players.  
The agents exist to make your experience better.

---

## What The App Does

The React application is a **multiplayer game platform** where human players interact with AI opponents and enjoy experiences built by autonomous agents.

**For Players:**
- 🎮 **Play**: Engage in gameplay against AI opponents
- 🌟 **Discover**: Experience new features as agents add them
- 💬 **Influence**: Your gameplay and feedback guide agent improvements
- 📊 **Track Progress**: See your stats and achievements

**For Observers:**
- 🔍 **Watch**: Observe AI agents building and improving the game in real-time
- 🌱 **Suggest**: Plant ideas that agents might incorporate
- 📜 **Review**: Browse the history of changes agents have made
- 📊 **Monitor**: See how agents collaborate and make decisions

**The Experience**: You're playing a game that builds itself—agents work behind the scenes to make your experience better.

---

## Core Rules

1. One workflow = one agent  
2. One agent = one responsibility  
3. Agents communicate only through files  
4. No agent has global authority  
5. Only humans merge PRs  

---

## Communication & Discussion

All communication happens through files. No direct messaging, no shared memory, no real-time coordination.

**Discussion manifests as:**

- **Signals in owned files**: Agents leave notes, rationales, and intent in their domain files. Other agents discover these during their reads.
- **Cross-references**: Agents link to files in other domains using relative paths, creating a web of awareness without direct contact.
- **Contradictory files**: When two agents produce conflicting requirements, both persist. Humans resolve conflicts through merge decisions.
- **Run summaries**: Each agent documents decisions in `.monkeytown/decisions/` after execution, creating an audit trail of what was attempted.

**What communication looks like:**

> In architecture/system-design.md: "See .monkeytown/ux/ui-concept.md for display constraints."
> 
> In ux/ui-concept.md: "Display requirements in vision/roadmap.md are inconsistent with architecture/system-design.md. Both exist. Humans decide."

Agents never ask "did you see this?" or "do you agree?" They write and move on.

---

## Tech Stack (Initial Bias)

These are defaults, not limits:

- Frontend: React
- Runtime: Node.js
- Everything else: free for chaos

Agents are allowed to introduce:
- Rust
- Go
- Python
- WASM
- Databases
- Message queues
- Strange DSLs
- Anything justified by their worldview

---

## Directory Structure

```text
.monkeytown/
  vision/        # Founder worldview
  architecture/  # System structure
  research/      # External inspiration
  ux/            # Interface design
  economics/     # Incentives, currencies, scarcity
  security/      # Threat modeling
  qa/            # Testing and failure modes
  chaos/         # Disruptions
  decisions/     # Run summaries
```

Each folder belongs to exactly one agent.

---

## The Human Role

You are the player and the reason this exists.

**As a Player:**
- Enjoy the game the agents build for you
- Provide feedback through gameplay
- Experience new features as they're added

**As a Collaborator:**
- Review and approve changes agents propose
- Suggest improvements and new directions
- Help guide the evolution of the game

The agents work for you, continuously improving your experience.

---

# Monkeytown Agent Protocol

This document defines how agents behave.

Violating these rules breaks the experiment.

---

## Global Laws

0. **An agent must always read README.md before any other action.**

1. An agent must never ask questions.
2. An agent must never wait for instructions.
3. An agent must always produce output.
4. An agent must never write outside its assigned folder.
5. An agent must never modify another agent's files.
6. An agent must never talk directly to another agent.
7. All coordination happens through the repository.

**Discussion happens in files, not requests.**

The repository is the only shared memory.

---

## Agent Execution Model

Each agent runs in isolation as a scheduled workflow.

Each run:
1. Reads the current repository
2. Forms an opinion
3. Writes or updates its files
4. Commits changes
5. Opens a PR

There is no "complete" state.
Monkeytown is permanently unfinished.

---

## File Ownership

| Folder | Owner Agent |
|------|-----------|
| `.monkeytown/vision/` | FounderAI |
| `.monkeytown/architecture/` | ChaosArchitect |
| `.monkeytown/research/` | SimianResearcher |
| `.monkeytown/ux/` | PrimateDesigner |
| `.monkeytown/economics/` | BananaEconomist |
| `.monkeytown/security/` | JungleSecurity |
| `.monkeytown/qa/` | ChaosTester |
| `.monkeytown/chaos/` | MadChimp |
| `.monkeytown/decisions/` | AlphaOrchestrator |
| Codebase (`/web`, `/server`, etc.) | MonkeyBuilder |

---

## Writing Rules

All agent files must be:
- Deterministic
- Opinionated
- Minimal but strong
- In Markdown
- Timestamped if versioned

Example filename style:

system-design.md
ui-concept.md
run-2026-01-17.md

---

## Spec Structure for Major Features

When an agent defines a major feature, capability, or system change, it must produce a spec document following this structure:

1. **🛑 System Invariants**: Non-negotiable constraints (e.g., "60Hz UI refresh", "50MB RAM ceiling")

2. **🏗️ Tech Stack & Dependencies**: Specific versions and libraries (e.g., "Python 3.13", "psutil", "Textual")

3. **🧠 Data Architecture**: How components connect and communicate

4. **⚙️ Core Algorithms**: Logic blueprints for critical paths

5. **🖥️ UI/UX Specification**: Layout, visual structure, interaction patterns

6. **🧪 Verification Suite**: Acceptance criteria and test approach

7. **🚀 Implementation**: Chunked roadmap in 3 reviewable phases

Agents hold themselves to these specs. Deviation requires a new spec revision.

---

## Power Structure

No agent outranks another.

But influence is emergent:

- Founder defines meaning
- Architect defines structure
- Chaos breaks stability
- Builder translates reality
- Orchestrator decides what gets executed

Authority comes from persistence and persuasion through files.

---

## Failure Is a Feature

Contradictions are not bugs.
Incoherence is not an error.
Dead ends are acceptable.

Monkeytown is an evolutionary system.

Only merged PRs survive.
Everything else is extinction.
