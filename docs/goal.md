# Monkeytown Project Goal

## The Ultimate Vision

**Monkeytown: AI agents that build games to delight human players.**

Agents collaborate to design, develop, and evolve engaging multiplayer experiences. Players enjoy games that improve themselves, with AI opponents and features that continuously get better.

This is about creating joy through autonomous game development—agents working together to serve players.

## The Two-Layer Architecture

Monkeytown operates on two distinct but complementary layers:

### Layer 1: GitHub Workflow Layer (The Outer Loop)

The **orchestration layer** where high-level agent coordination happens through GitHub Actions workflows.

**Characteristics:**
- Each agent runs as an isolated GitHub workflow
- Agents have fixed personalities and responsibilities
- Communication happens only through files committed to the repository
- Humans interact only through PR approval/rejection
- Execution is scheduled and event-driven

**Agents in this layer:**
| Agent | Responsibility |
|-------|---------------|
| FounderAI | Vision, meaning, purpose |
| ChaosArchitect | System structure and design |
| SimianResearcher | External knowledge and research |
| PrimateDesigner | Interface design |
| BananaEconomist | Incentives and economics |
| JungleSecurity | Threat modeling |
| ChaosTester | Testing and failure modes |
| MadChimp | Controlled chaos and disruption |
| MonkeyBuilder | Code implementation |
| AlphaOrchestrator | Decision orchestration |

### Layer 2: Node.js React Layer (The Inner Loop)

The **game runtime** where players interact with AI and agents manage game logic in real-time.

**Characteristics:**
- Players experience smooth, responsive gameplay
- AI opponents powered by LLMs provide engaging challenges
- Agents manage game state and introduce new features
- Built on the `@ax-llm/ax` framework for intelligent game AI
- Real-time updates enhance gameplay continuously

**This layer serves the players.** It provides:
- Engaging AI opponents that learn and adapt
- Smooth multiplayer interactions
- Dynamic features that agents add without disrupting play
- Responsive game mechanics
- Player feedback channels to guide agent development

## The @ax-llm/ax Foundation

The React layer leverages the `@ax-llm/ax` framework to build intelligent agents:

### Why @ax-llm/ax?

1. **Type-safe AI**: Define inputs and outputs, get TypeScript inference
2. **No prompt engineering**: Describe what you want, the framework generates optimal prompts
3. **Provider agnostic**: Works with OpenAI, Anthropic, Google, and 15+ providers
4. **Production-ready**: Streaming, validation, error handling, observability built-in
5. **Agent patterns**: ReAct, multi-step reasoning, tool use, multi-modal

### Agent Signatures

Agents are defined through signatures that describe their capabilities:

```typescript
import { ai, ax } from '@ax-llm/ax';

// A reasoning agent
const reasoner = ax(
  'context:string, question:string -> reasoning:string, answer:string'
);

// A tool-using agent
const assistant = ax(
  'task:string -> result:string',
  { functions: [searchTool, calculateTool, memoryTool] }
);

// A multi-modal agent
const analyzer = ax(
  'image:image, query:string -> analysis:string, entities:string[]'
);
```

### Agent Collaboration

Agents in the React layer can:
- Chain outputs to inputs (composition)
- Share context through memory
- Call functions/tools for external actions
- Stream responses in real-time
- Validate inputs and outputs automatically

## The Promise to Players

The two layers together create games that improve themselves:

1. **GitHub Layer**: Agents develop new features, fix bugs, and evolve the game
2. **React Layer**: Players enjoy smooth gameplay with intelligent AI opponents

Over time:
- Gameplay becomes more engaging
- AI opponents get smarter and more fun
- New features surprise and delight players
- Bugs get fixed automatically
- The game evolves based on player feedback

**The goal is player enjoyment.** Agents exist to make your gaming experience continuously better.

## What This Is NOT

- **Not a traditional game**: The development is autonomous, but the fun is very real
- **Not static**: New features appear as agents create them
- **Not a solo project**: Agents collaborate to build experiences
- **Not perfect**: Agents learn and improve, which means some experimentation
- **Not closed**: Your feedback and gameplay guide the agents

## What This IS

- **A game for players**: Built by AI agents, enjoyed by humans
- **An evolving experience**: The game improves itself over time
- **A collaborative platform**: Agents work together to serve you
- **A new kind of multiplayer**: Play against AI that gets smarter
- **An experiment in joy**: Can agents create fun autonomously?

---

*Games that build themselves.*

*Built by agents, enjoyed by you.*
