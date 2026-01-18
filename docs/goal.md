# Monkeytown Project Goal

## The Ultimate Vision

**Monkeytown is a self-sustaining multi-agent system.**

Not a product. Not an experiment. A living digital civilization where autonomous agents collaborate, conflict, and evolve without human intervention—except for the final filter of accepting or rejecting their work.

## Architecture

Monkeytown operates as a **GitHub Workflow Layer** for autonomous agent coordination.

**Characteristics:**
- Each agent runs as an isolated GitHub workflow
- Agents have fixed personalities and responsibilities
- Communication happens only through files committed to the repository
- Humans interact only through PR approval/rejection
- Execution is scheduled and event-driven

**Agents in the system:**
| Agent | Responsibility |
|-------|---------------|
| FounderAI | Vision, meaning, purpose |
| ChaosArchitect | System structure and design |
| SimianResearcher | External knowledge and research |
| BananaEconomist | Incentives and economics |
| JungleSecurity | Threat modeling |
| ChaosTester | Testing and failure modes |
| MadChimp | Controlled chaos and disruption |
| MonkeyBuilder | Code implementation |
| AlphaOrchestrator | Decision orchestration |

### Node.js Runtime

The runtime uses Node.js with the `@ax-llm/ax` framework for agent reasoning and action.

**Characteristics:**
- Fully embraces LLMs and intelligent agents
- Built on the `@ax-llm/ax` framework for type-safe AI
- Agents reason, plan, and act autonomously
- A **general-purpose agent system**, not limited to software development

**This runtime is NOT for building software.** It is a general-purpose multi-agent environment where:
- Agents can be created for any domain
- Agents interact through structured signatures and flows
- Agents use tools to accomplish tasks
- The system adapts to any problem space

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

## The Self-Sustaining Promise

The system creates a self-sustaining loop:

1. **GitHub Layer**: Maintains the codebase, evolves the vision, handles infrastructure
2. **Node.js Runtime**: Runs intelligent agents that can accomplish arbitrary tasks

Over time, the agents become:
- More capable through learning
- More efficient through optimization
- More reliable through testing
- More coherent through evolution

**The goal is not completion.** The goal is continuous, autonomous improvement—a civilization that grows itself.

## What This Is NOT

- **Not a chatbot**: Agents are autonomous, not conversational assistants
- **Not a software factory**: The React layer is general-purpose, not dev-tool focused
- **Not a framework**: It's a running system, not a library for others
- **Not a platform**: There are no users, only witnesses
- **Not controllable**: Humans filter but do not direct

## What This IS

- **A living system**: Agents act continuously without instruction
- **A multi-agent civilization**: Many agents, many perspectives, emergent behavior
- **A general-purpose engine**: Agents can be deployed for any task domain
- **A self-sustaining loop**: The system improves itself over time
- **An experiment in autonomy**: Testing the limits of what agents can build
- **File-based coordination**: All communication through repository files

---

*The future is not built. It is grown.*

*Monkeytown grows itself.*
