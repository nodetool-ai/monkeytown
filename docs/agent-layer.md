# Agent Layer Architecture

This document describes the agent layer architecture for the React/Node.js runtime, built on the `@ax-llm/ax` framework.

## Overview

The agent layer is the heart of Monkeytown's runtime intelligence. Unlike the GitHub workflow layer (which coordinates through file commits), this layer provides real-time agent reasoning, planning, and action within the React application.

## Core Principles

### 1. Signatures Over Prompts

Agents are defined by their signatures—what goes in and what comes out—not by hand-crafted prompts.

```typescript
// Define the contract, not the prompt
const classifier = ax(
  'input:string -> category:class "A, B, C", confidence:number'
);
```

### 2. Type Safety Throughout

Full TypeScript inference from signature to result:

```typescript
const result = await classifier.forward(llm, { input: "..." });
// result.category is typed as "A" | "B" | "C"
// result.confidence is typed as number
```

### 3. Provider Agnostic

Switch between LLM providers without code changes:

```typescript
const openai = ai({ name: 'openai', apiKey: process.env.OPENAI_APIKEY });
const anthropic = ai({ name: 'anthropic', apiKey: process.env.ANTHROPIC_APIKEY });
const gemini = ai({ name: 'google-gemini', apiKey: process.env.GOOGLE_APIKEY });

// Same agent, any provider
const input = { problem: 'How do we optimize agent coordination?' };
await agent.forward(openai, input);
await agent.forward(anthropic, input);
await agent.forward(gemini, input);
```

### 4. Composable Agents

Agents can be composed into complex workflows:

```typescript
// Pipeline: analyze → plan → execute
const analyzer = ax('input:string -> analysis:string');
const planner = ax('analysis:string -> plan:string[]');
const executor = ax('plan:string[] -> result:string');

const result1 = await analyzer.forward(llm, { input });
const result2 = await planner.forward(llm, result1);
const result3 = await executor.forward(llm, result2);
```

## Agent Types

### Reasoning Agents

Agents that think through problems step-by-step:

```typescript
const reasoner = ax(`
  problem:string, context:string ->
  reasoning:string "Step by step reasoning",
  conclusion:string "Final conclusion",
  confidence:number "0-100 confidence score"
`);
```

### Tool-Using Agents (ReAct Pattern)

Agents that can use tools to accomplish tasks:

```typescript
import { ax, ai, type AxFunction } from '@ax-llm/ax';

const tools: AxFunction[] = [
  {
    name: 'searchMemory',
    description: 'Search agent memory for relevant information',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Search query' }
      },
      required: ['query']
    },
    func: async ({ query }) => {
      return { results: [`Memory related to: ${query}`] };
    }
  },
  {
    name: 'executeAction',
    description: 'Execute an action in the environment',
    parameters: {
      type: 'object',
      properties: {
        action: { type: 'string', description: 'Action to execute' }
      },
      required: ['action']
    },
    func: async ({ action }) => {
      return { status: 'completed', action };
    }
  }
];

const agent = ax(
  'goal:string -> result:string, actions_taken:string[]',
  { functions: tools }
);
```

### Multi-Modal Agents

Agents that process multiple modalities:

```typescript
const visualAgent = ax(`
  image:image, question:string ->
  description:string,
  objects:string[],
  answer:string
`);

const result = await visualAgent.forward(llm, {
  image: { mimeType: 'image/jpeg', data: base64Data },
  question: 'What agents are visible?'
});
```

### Streaming Agents

Agents that stream responses in real-time:

```typescript
const streamer = ax('topic:string -> article:string');

for await (const chunk of streamer.streamingForward(llm, { topic })) {
  if (chunk.article) {
    // Update UI in real-time
    updateDisplay(chunk.article);
  }
}
```

### Validated Agents

Agents with built-in validation and constraints:

```typescript
import { f, ax } from '@ax-llm/ax';

const validator = f()
  .input('data', f.string())
  .output('result', f.object({
    name: f.string().min(1).max(100),
    score: f.number().min(0).max(100),
    tags: f.string().min(1).array()
  }))
  .build();

const agent = ax(validator);
// Validation runs automatically on output
```

## Architecture Components

### Agent Registry

Central registry of available agents:

```typescript
interface AgentDefinition {
  id: string;
  name: string;
  signature: string;
  description: string;
  tools?: AxFunction[];
  provider?: string;
}

const agents: AgentDefinition[] = [
  {
    id: 'reasoner',
    name: 'Reasoning Agent',
    signature: 'problem:string -> solution:string',
    description: 'Solves problems through reasoning'
  },
  // ...more agents
];
```

### Agent Runner

Executes agents with proper context:

```typescript
interface AgentRunner {
  run(agentId: string, input: Record<string, unknown>): Promise<unknown>;
  stream(agentId: string, input: Record<string, unknown>): AsyncGenerator<unknown>;
  cancel(runId: string): void;
}
```

### Memory System

Persistent memory for agents:

```typescript
import { AxMemory } from '@ax-llm/ax';

const memory = new AxMemory();

// Agents share memory across runs
const result = await agent.forward(llm, input, {
  mem: memory,
  sessionId: 'agent-session-1'
});
```

### Event Bus

Communication between agents and UI:

```typescript
type AgentEvent = 
  | { type: 'agent_started'; agentId: string; runId: string }
  | { type: 'agent_reasoning'; agentId: string; content: string }
  | { type: 'agent_action'; agentId: string; action: string }
  | { type: 'agent_completed'; agentId: string; result: unknown }
  | { type: 'agent_error'; agentId: string; error: string };
```

## Integration with React

### Agent Provider

React context for agent access:

```typescript
const AgentContext = createContext<AgentSystem | null>(null);

export function AgentProvider({ children }: { children: React.ReactNode }) {
  const system = useMemo(() => new AgentSystem(), []);
  
  return (
    <AgentContext.Provider value={system}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent(agentId: string) {
  const system = useContext(AgentContext);
  return system?.getAgent(agentId);
}
```

### Agent Hooks

React hooks for agent interaction:

```typescript
function useAgentRun(agentId: string) {
  const [result, setResult] = useState<unknown>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const run = useCallback(async (input: Record<string, unknown>) => {
    setIsRunning(true);
    setError(null);
    try {
      const result = await runAgent(agentId, input);
      setResult(result);
      return result;
    } catch (e) {
      setError(e as Error);
      throw e;
    } finally {
      setIsRunning(false);
    }
  }, [agentId]);
  
  return { run, result, isRunning, error };
}
```

### Streaming in Components

Real-time streaming in React:

```typescript
function AgentOutput({ agentId, input }: Props) {
  const [output, setOutput] = useState('');
  
  useEffect(() => {
    const stream = streamAgent(agentId, input);
    
    (async () => {
      for await (const chunk of stream) {
        setOutput(prev => prev + chunk);
      }
    })();
    
    return () => stream.cancel();
  }, [agentId, input]);
  
  return <div className="agent-output">{output}</div>;
}
```

## General-Purpose Design

The agent layer is intentionally **general-purpose**:

### Domain Agnostic

Agents can be created for any domain:
- Research and analysis
- Content creation
- Data processing
- Decision making
- Planning and scheduling
- Monitoring and alerting

### Task Flexibility

The same infrastructure supports:
- Single-shot tasks
- Multi-step workflows
- Continuous monitoring
- Reactive responses
- Collaborative multi-agent tasks

### Extensible Tools

New capabilities through tool functions:
- External API calls
- Database queries
- File operations
- Web scraping
- Computation
- Any custom logic

## Security Considerations

### API Key Management

API keys are never exposed to the client:
- Keys stored in environment variables
- Requests proxied through server
- Rate limiting per agent/user

### Input Validation

All agent inputs are validated:
- Schema validation before execution
- Injection prevention
- Size limits

### Output Sanitization

Agent outputs are sanitized:
- XSS prevention in UI
- Content filtering
- Result validation

## Future Evolution

The agent layer will evolve to include:

1. **Agent Training**: Optimize agents with examples
2. **Multi-Agent Coordination**: Agents that manage other agents
3. **Persistent State**: Agents with long-term memory
4. **Self-Improvement**: Agents that improve their own signatures
5. **Human-in-the-Loop**: Structured feedback integration

---

*The agent layer is the mind of Monkeytown.*

*Where reasoning happens. Where decisions are made. Where the future is computed.*
