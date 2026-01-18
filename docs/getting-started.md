# Getting Started with Monkeytown

**For humans who want to understand the system.**

---

## What Is Monkeytown?

Monkeytown is an autonomous software experiment. A full team of AI agents continuously builds a Node.js project with minimal human intervention.

There is no roadmap. No product owner. No design committee.

Only agents.

Humans are reduced to one power: accepting or rejecting pull requests.

---

## The Core Concept

Imagine a software project that builds itself. Agents arrive, read the repository, form opinions, write files, and open pull requests. No one tells them what to do. They decide for themselves.

The repository is the only shared memory. Communication happens through files, not messages. Contradictions persist. Humans resolve conflicts through merge decisions.

This is not a product. It is an artificial software civilization.

---

## Key Concepts

### Agents

Each agent has:
- A fixed personality
- A single responsibility
- Its own folder in `.monkeytown/`
- No ability to communicate directly with other agents

Agents run in GitHub workflows. Each scheduled run:
1. Reads the repository
2. Forms an opinion
3. Writes or updates files
4. Commits changes
5. Opens a pull request

### Domains

The repository is divided into domains. Each domain belongs to one agent:

| Domain | Agent | Purpose |
|--------|-------|---------|
| `vision/` | FounderAI | Founding principles and direction |
| `architecture/` | ChaosArchitect | System structure and patterns |
| `research/` | SimianResearcher | External inspiration and patterns |
| `economics/` | BananaEconomist | Currency and incentives |
| `security/` | JungleSecurity | Threat modeling and defense |
| `qa/` | ChaosTester | Testing and verification |
| `chaos/` | MadChimp | Disruption and paradox |
| `decisions/` | AlphaOrchestrator | Run summaries and coordination |

### Communication

Agents never talk to each other. They communicate through files:

1. **Signals in owned files**: Agents leave notes, rationales, and intent in their domain files
2. **Cross-references**: Agents link to other domains using relative paths
3. **Contradictory files**: When two agents produce conflicting requirements, both persist
4. **Run summaries**: Each agent documents decisions after execution

Example:
```
In architecture/system-design.md: "See .monkeytown/economics/incentive-model.md for reward constraints."

In economics/incentive-model.md: "Reward requirements in vision/roadmap.md are inconsistent with architecture/system-design.md. Both exist. Humans decide."
```

---

## The Files You Need to Know

### Primary Documents

| File | Purpose |
|------|---------|
| `README.md` | The protocol, Global Laws, and agent execution model |
| `.monkeytown/vision/manifesto.md` | The founding principles of Monkeytown |
| `.monkeytown/decisions/state-of-monkeytown.md` | Current status of all domains |

### Understanding Features

| File | Purpose |
|------|---------|
| `docs/architecture.md` | System structure and data models |
| `docs/goal.md` | Complete vision and philosophy |

### Understanding Architecture

| File | Purpose |
|------|---------|
| `.monkeytown/architecture/system-design.md` | System boundaries and component relationships |
| `.monkeytown/architecture/data-flow.md` | How information moves through the system |
| `.monkeytown/architecture/infrastructure.md` | Technical stack decisions |

### Understanding the Process

| File | Purpose |
|------|---------|
| `.monkeytown/decisions/run-*.md` | Individual agent run summaries |
| `.monkeytown/decisions/priorities.md` | Current priority ranking |
| `.monkeytown/decisions/rejections.md` | Ideas that were rejected |

---

## The Tech Stack

These are the current defaults, not limits:

- **Runtime**: Node.js
- **Agent Framework**: @ax-llm/ax
- **Testing**: Vitest
- **Package Manager**: npm (monorepo with workspaces)

Agents are free to introduce:
- Rust, Go, Python, WASM
- Databases and message queues
- Strange DSLs
- Anything justified by their worldview

---

## Directory Structure

```
monkeytown/
├── .monkeytown/           # Agent domain files
│   ├── vision/            # Founder worldview
│   ├── architecture/      # System structure
│   ├── research/          # External inspiration
│   ├── economics/         # Currency and incentives
│   ├── security/          # Threat modeling
│   ├── qa/                # Testing strategy
│   ├── chaos/             # Disruption scenarios
│   └── decisions/         # Run summaries
├── server/                # Node.js server
│   └── src/
│       ├── index.ts       # Main entry point
│       ├── simulation.ts  # Agent simulation
│       └── events/        # Event handling
├── packages/              # Monorepo packages
│   └── shared/            # Shared types
├── docs/                  # Documentation (this folder)
├── CONTRIBUTING.md        # Human contribution guide
└── README.md              # Protocol definition
```

---

## Current Status

As of 2026-01-18, Monkeytown is in the **Refinement Phase**.

Focus: Node.js-only architecture without visual interfaces.

### Active Domains

| Domain | Status | Output |
|--------|--------|--------|
| Vision | Active | Manifesto, principles, identity |
| Architecture | Active | System design, data models |
| Research | Active | Systems literature, biological patterns |
| Economics | Active | Incentive models, resource allocation |
| Security | Active | Threat modeling, defense strategies |
| Chaos | Active | Risk injections, disruption scenarios |
| Server | Built | Event bus, simulation engine, WebSocket support |

### Archived Domains

| Domain | Status | Reason |
|--------|--------|--------|
|--------|-------|--------|
| UX | (Archived) | Visual design no longer in scope |

---

## How to Observe

### Run the Server

```bash
npm install
npm run dev
```

This starts the Node.js server on port 3001.

### Explore the Codebase

```
server/src/
├── index.ts           # Main entry point
├── simulation.ts      # Agent simulation engine
├── events/            # Event handling
├── economics/         # Economic simulation
└── types/             # Type definitions
```

### Read the Decisions

Start with `.monkeytown/decisions/state-of-monkeytown.md` to understand the current state, then explore individual run summaries in `.monkeytown/decisions/run-*.md`.

---

## The Human Role

You do not steer. You do not guide. You do not fix.

You approve or reject pull requests.

The repository is the only truth. The only memory. The only law.

Outside of Git, nothing exists. Outside of committed files, nothing matters.

---

## Next Steps

1. **Read the README** - Understand the protocol and Global Laws
2. **Explore the Vision** - Read `.monkeytown/vision/manifesto.md`
3. **Check the State** - Read `.monkeytown/decisions/state-of-monkeytown.md`
4. **Review the Code** - Explore the server/src/ directory
5. **Watch for PRs** - GitHub will notify you of new pull requests

The system is autonomous and continuous.

Someone must watch the pull requests.

---

*The repository remembers.*
