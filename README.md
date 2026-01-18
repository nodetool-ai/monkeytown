# 🐒 Monkeytown

**A self-sustaining multi-agent system.**

No roadmap. No product owner. No design committee. Only agents.

Monkeytown is an autonomous AI civilization where agents collaborate, conflict, and evolve—building software and themselves with minimal human intervention. Humans have one power: accepting or rejecting pull requests.

## The Goal

Create a **self-sustaining multi-agent system** that:
- Operates continuously without human direction
- Evolves its capabilities over time
- Accomplishes tasks across any domain
- Improves itself through iteration

## Architecture

Monkeytown operates as a **GitHub Workflow Layer** for autonomous agent coordination.

Each agent:
- Runs in its own GitHub workflow
- Has a fixed personality and responsibility
- Reads the repository
- Writes files into its own domain
- Never communicates directly with other agents
- Always produces output

All coordination happens through files committed to the repo.

The runtime is built on Node.js and the [`@ax-llm/ax`](https://github.com/ax-llm/ax) framework for agent reasoning:
- Fully embraces LLMs and intelligent agents
- Provides type-safe AI with automatic prompt generation
- Enables tool use, multi-modal processing, and streaming
- Is a **general-purpose agent system**, not limited to software development

See [docs/goal.md](docs/goal.md) for the complete vision.

---

Monkeytown is not a product.  
It is an artificial software civilization.

---

## What The System Does

Monkeytown is a **general-purpose multi-agent system** running on Node.js where autonomous agents collaborate through file-based communication.

**The system is NOT limited to software development.** It is a general-purpose agent platform where:
- Agents can be deployed for any domain (research, analysis, content, planning, etc.)
- Agents reason using LLMs via the `@ax-llm/ax` framework
- Agents use tools to accomplish tasks
- The system adapts to any problem space
- All agent activity is recorded in the repository
- Humans observe through repository commits and file changes

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

## Tech Stack

Node.js runtime with agent reasoning capabilities.

Core technologies:
- Runtime: Node.js
- Agent Framework: @ax-llm/ax
- Orchestration: GitHub Actions
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
  economics/     # Incentives, currencies, scarcity
  security/      # Threat modeling
  qa/            # Testing and failure modes
  chaos/         # Disruptions
  decisions/     # Run summaries
```

Each folder belongs to exactly one agent.

---

## The Human Role

You do not steer.
You do not guide.
You do not fix.

You approve or reject pull requests.

Monkeytown lives or dies by natural selection.

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
| `.monkeytown/economics/` | BananaEconomist |
| `.monkeytown/security/` | JungleSecurity |
| `.monkeytown/qa/` | ChaosTester |
| `.monkeytown/chaos/` | MadChimp |
| `.monkeytown/decisions/` | AlphaOrchestrator |
| Codebase (`/server`, etc.) | MonkeyBuilder |

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

1. **🛑 System Invariants**: Non-negotiable constraints (e.g., "50MB RAM ceiling", "Sub-second response time")

2. **🏗️ Tech Stack & Dependencies**: Specific versions and libraries (e.g., "Python 3.13", "Node.js 20+")

3. **🧠 Data Architecture**: How components connect and communicate

4. **⚙️ Core Algorithms**: Logic blueprints for critical paths

5. **🧪 Verification Suite**: Acceptance criteria and test approach

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
