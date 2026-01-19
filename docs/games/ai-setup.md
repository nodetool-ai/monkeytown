# 🤖 AI Opponent Setup Guide

This guide explains how to set up LLM-powered AI opponents for TicTacToe in Monkeytown using the **Ax** framework with **MiniMax** API.

---

## Overview

Monkeytown supports two types of AI opponents:

1. **Built-in AI** (default): Uses the minimax algorithm for perfect play. No API key required.
2. **LLM AI Agent**: Uses the Ax framework with MiniMax API for dynamic, personality-driven gameplay.

This guide covers setting up the **LLM AI Agent** using the [Ax framework](https://github.com/ax-llm/ax).

---

## Quick Start

### 1. API Key

Monkeytown uses MiniMax API for AI opponents. The `MINIMAX_API_KEY` environment variable should already be configured.

| Provider | API Key URL | Notes |
|----------|-------------|-------|
| **MiniMax** | [api.minimax.chat](https://api.minimax.chat) | Default provider for Monkeytown |

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and verify the following are set:

```bash
# Required: Your MiniMax API key
MINIMAX_API_KEY=your-minimax-api-key-here

# AI configuration for game opponents (uses Anthropic-compatible endpoint)
ANTHROPIC_BASE_URL=https://api.minimax.io/anthropic
ANTHROPIC_MODEL=MiniMax-M2
```

### 3. Verify Setup

Run the test to verify your configuration:

```bash
npm run test:ai-opponent
```

---

## Implementation Tasks for Builders

The following tasks need to be completed to integrate LLM AI into TicTacToe:

### Task 1: Install Ax Framework

Install the Ax framework and dependencies:

```bash
npm install @ax-llm/ax
```

### Task 2: Create AI Service

**File:** `server/src/services/ai-client.ts`

```typescript
import { ai, ax } from '@ax-llm/ax';

/**
 * Create an AI instance using MiniMax via Anthropic-compatible API
 */
export function createAIClient() {
  const apiKey = process.env.MINIMAX_API_KEY;
  
  if (!apiKey) {
    throw new Error('MINIMAX_API_KEY is required for LLM AI opponents');
  }

  // MiniMax provides an Anthropic-compatible endpoint
  return ai({
    name: 'anthropic',
    apiKey,
    url: process.env.ANTHROPIC_BASE_URL || 'https://api.minimax.io/anthropic',
    config: {
      model: process.env.ANTHROPIC_MODEL || 'MiniMax-M2',
    },
  });
}

export function getAIModel(): string {
  return process.env.ANTHROPIC_MODEL || 'MiniMax-M2';
}
```

### Task 3: Create TicTacToe LLM AI Strategy

**File:** `server/src/game/tictactoe-llm-ai.ts`

```typescript
import { ax } from '@ax-llm/ax';
import { createAIClient } from '../services/ai-client.js';
import type { TicTacToeBoard, TicTacToeSymbol } from './types.js';

export interface LLMAIConfig {
  personality: 'trickster' | 'strategist' | 'mentor' | 'champion';
}

// Define the TicTacToe move generator using Ax DSL
const ticTacToeMove = ax(`
  board:string, symbol:string, personality:string -> 
  row:number "0-2",
  col:number "0-2", 
  reasoning:string "brief explanation of the move"
`);

export class TicTacToeLLMAI {
  private llm: ReturnType<typeof createAIClient>;
  private personality: string;
  private symbol: TicTacToeSymbol;
  private lastReasoning: string = '';

  constructor(symbol: TicTacToeSymbol = 'O', config?: LLMAIConfig) {
    this.llm = createAIClient();
    this.symbol = symbol;
    this.personality = config?.personality || 'strategist';
  }

  async getMove(board: TicTacToeBoard): Promise<{ row: number; col: number; reasoning: string }> {
    const boardString = this.formatBoard(board);
    const personalityDescription = this.getPersonalityDescription();

    const result = await ticTacToeMove.forward(this.llm, {
      board: boardString,
      symbol: this.symbol,
      personality: personalityDescription,
    });

    this.lastReasoning = result.reasoning;
    
    return {
      row: result.row,
      col: result.col,
      reasoning: result.reasoning,
    };
  }

  private formatBoard(board: TicTacToeBoard): string {
    return board.map((row, i) => 
      `${i}: ${row.map((cell, j) => cell || `[${j}]`).join(' | ')}`
    ).join('\n');
  }

  private getPersonalityDescription(): string {
    const personalities = {
      trickster: 'You are a playful trickster who loves surprising moves.',
      strategist: 'You are a calm strategist who thinks several moves ahead.',
      mentor: 'You are a helpful mentor who explains your thinking.',
      champion: 'You are a competitive champion who plays to win.',
    };
    return personalities[this.personality as keyof typeof personalities];
  }

  getReasoning(): string {
    return this.lastReasoning;
  }
}
```

### Task 4: Integrate LLM AI into Game Session

**File:** `server/src/game/session.ts` (update existing)

Add the ability to choose between built-in minimax AI and LLM AI:

```typescript
import { TicTacToeLLMAI } from './tictactoe-llm-ai.js';

// In the game session setup:
if (player.type === 'agent' && player.useLLM) {
  const llmAI = new TicTacToeLLMAI(symbol, {
    personality: player.agentType as 'trickster' | 'strategist' | 'mentor' | 'champion',
  });
  
  const move = await llmAI.getMove(board);
  // Use move.reasoning for AI transparency display
}
```

### Task 5: Update Types

**File:** `packages/shared/game-types.ts`

Add LLM configuration to player type:

```typescript
interface Player {
  // ... existing fields
  useLLM?: boolean;  // Whether to use LLM AI instead of minimax
}
```

### Task 6: Frontend Integration

Update the game lobby to allow players to select LLM AI opponents:

**File:** `web/src/components/game/GameCard.tsx`

Add an option to select "AI Mode":
- **Classic** (minimax, always available)
- **LLM Agent** (requires API key configuration)

---

## Environment Variable Reference

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MINIMAX_API_KEY` | Yes (for LLM AI) | - | Your MiniMax API key |
| `ANTHROPIC_BASE_URL` | No | `https://api.minimax.io/anthropic` | Anthropic-compatible API endpoint |
| `ANTHROPIC_MODEL` | No | `MiniMax-M2` | Model to use |

---

## Using Alternative Providers

The Ax framework supports multiple providers. You can switch providers by changing the `ai()` configuration:

### Using Claude Directly

```typescript
import { ai } from '@ax-llm/ax';

const llm = ai({ 
  name: 'anthropic', 
  apiKey: process.env.ANTHROPIC_API_KEY!,
});
```

```bash
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here
ANTHROPIC_MODEL=claude-sonnet-4-20250514
```

### Using OpenAI

```typescript
import { ai } from '@ax-llm/ax';

const llm = ai({ 
  name: 'openai', 
  apiKey: process.env.OPENAI_API_KEY!,
});
```

```bash
OPENAI_API_KEY=your-openai-key
```

### Local Ollama

```typescript
import { ai } from '@ax-llm/ax';

const llm = ai({ 
  name: 'ollama',
  config: { model: 'llama3.2' },
});
```

---

## Testing

### Manual Test

1. Start the development server: `npm run dev`
2. Navigate to TicTacToe
3. Select an LLM AI opponent
4. Play a game and observe the AI's reasoning

### Automated Test

Create test file: `server/src/game/tictactoe-llm-ai.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { TicTacToeLLMAI } from './tictactoe-llm-ai.js';

describe('TicTacToeLLMAI', () => {
  it('should select a valid move', async () => {
    const ai = new TicTacToeLLMAI('O', { personality: 'strategist' });
    const board = [
      ['X', null, null],
      [null, null, null],
      [null, null, null],
    ];
    
    const move = await ai.getMove(board);
    
    expect(move.row).toBeGreaterThanOrEqual(0);
    expect(move.row).toBeLessThanOrEqual(2);
    expect(move.col).toBeGreaterThanOrEqual(0);
    expect(move.col).toBeLessThanOrEqual(2);
    expect(board[move.row][move.col]).toBeNull();
  });
});
```

---

## Troubleshooting

### "MINIMAX_API_KEY is required"

Set the `MINIMAX_API_KEY` environment variable in your `.env` file.

### "Model not found"

Verify the `ANTHROPIC_MODEL` is valid:
- `MiniMax-M2` (default, recommended)
- `MiniMax-M2.1` (alternative)

### Rate Limiting

If you hit rate limits, consider:
1. Adding delays between moves
2. Implementing request caching

---

## Ax Framework Features

The Ax framework provides several advantages:

1. **Type-safe outputs** - Define structured output schemas
2. **Multiple providers** - Easy switching between AI providers
3. **Streaming support** - Real-time response streaming
4. **Automatic validation** - Built-in output validation

Learn more at the [Ax documentation](https://github.com/ax-llm/ax).

---

## Security Considerations

1. **Never commit API keys** to version control
2. **Use environment variables** for all secrets
3. **Rotate keys** if exposed
4. **Monitor usage** via your provider's dashboard

---

## Next Steps

After completing the implementation:

1. Test with all AI personality types
2. Add AI reasoning to the game UI (AIReasoningDisplay component)
3. Consider adding move explanation for the Mentor personality
4. Track AI performance metrics

---

*Part of the Monkeytown game collection. AI that plays with you.*
