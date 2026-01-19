# 🤖 AI Opponent Setup Guide

This guide explains how to set up LLM-powered AI opponents for TicTacToe in Monkeytown using an Anthropic-compatible API.

---

## Overview

Monkeytown supports two types of AI opponents:

1. **Built-in AI** (default): Uses the minimax algorithm for perfect play. No API key required.
2. **LLM AI Agent**: Uses an Anthropic-compatible API (Claude or similar) for more dynamic, personality-driven gameplay.

This guide covers setting up the **LLM AI Agent**.

---

## Quick Start

### 1. Get an API Key

You need an API key from one of these providers:

| Provider | API Key URL | Notes |
|----------|-------------|-------|
| **Anthropic** | [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) | Official Claude API |
| **OpenRouter** | [openrouter.ai/keys](https://openrouter.ai/keys) | Multi-model gateway |
| **Local/Self-hosted** | Varies | Use Anthropic-compatible endpoints |

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and set the following:

```bash
# Required: Your API key
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here

# Optional: Custom API base URL (for alternative providers)
# Default: https://api.anthropic.com
ANTHROPIC_API_BASE_URL=https://api.anthropic.com

# Optional: Model selection
# Default: claude-sonnet-4-20250514
AI_OPPONENT_MODEL=claude-sonnet-4-20250514
```

### 3. Verify Setup

Run the test to verify your configuration:

```bash
npm run test:ai-opponent
```

---

## Implementation Tasks for Builders

The following tasks need to be completed to integrate LLM AI into TicTacToe:

### Task 1: Create Anthropic API Client

**File:** `server/src/services/anthropic-client.ts`

```typescript
import Anthropic from '@anthropic-ai/sdk';

interface AnthropicClientConfig {
  apiKey?: string;
  baseURL?: string;
  model?: string;
}

export function createAnthropicClient(config?: AnthropicClientConfig) {
  const apiKey = config?.apiKey || process.env.ANTHROPIC_API_KEY;
  const baseURL = config?.baseURL || process.env.ANTHROPIC_API_BASE_URL;
  
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is required for LLM AI opponents');
  }

  return new Anthropic({
    apiKey,
    baseURL,
  });
}

export function getAIModel(): string {
  return process.env.AI_OPPONENT_MODEL || 'claude-sonnet-4-20250514';
}
```

### Task 2: Create TicTacToe LLM AI Strategy

**File:** `server/src/game/tictactoe-llm-ai.ts`

```typescript
import { createAnthropicClient, getAIModel } from '../services/anthropic-client.js';
import type { TicTacToeBoard, TicTacToeSymbol } from './types.js';

export interface LLMAIConfig {
  personality: 'trickster' | 'strategist' | 'mentor' | 'champion';
  thinkingEnabled?: boolean;
}

export class TicTacToeLLMAI {
  private client: ReturnType<typeof createAnthropicClient>;
  private model: string;
  private personality: string;
  private symbol: TicTacToeSymbol;
  private lastReasoning: string = '';

  constructor(symbol: TicTacToeSymbol = 'O', config?: LLMAIConfig) {
    this.client = createAnthropicClient();
    this.model = getAIModel();
    this.symbol = symbol;
    this.personality = config?.personality || 'strategist';
  }

  async getMove(board: TicTacToeBoard): Promise<{ row: number; col: number; reasoning: string }> {
    const boardString = this.formatBoard(board);
    const prompt = this.buildPrompt(boardString);

    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 256,
      messages: [{ role: 'user', content: prompt }],
    });

    return this.parseResponse(response);
  }

  private formatBoard(board: TicTacToeBoard): string {
    return board.map((row, i) => 
      `${i}: ${row.map((cell, j) => cell || `[${j}]`).join(' | ')}`
    ).join('\n');
  }

  private buildPrompt(boardString: string): string {
    const personalities = {
      trickster: 'You are a playful trickster who loves surprising moves.',
      strategist: 'You are a calm strategist who thinks several moves ahead.',
      mentor: 'You are a helpful mentor who explains your thinking.',
      champion: 'You are a competitive champion who plays to win.',
    };

    return `You are playing TicTacToe as ${this.symbol}. ${personalities[this.personality as keyof typeof personalities]}

Current board (empty cells show their [row][col]):
${boardString}

Choose your move. Respond with ONLY valid JSON:
{"row": 0-2, "col": 0-2, "reasoning": "brief explanation"}`;
  }

  private parseResponse(response: Anthropic.Message): { row: number; col: number; reasoning: string } {
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    const json = JSON.parse(content.text);
    this.lastReasoning = json.reasoning;
    
    return {
      row: json.row,
      col: json.col,
      reasoning: json.reasoning,
    };
  }

  getReasoning(): string {
    return this.lastReasoning;
  }
}
```

### Task 3: Integrate LLM AI into Game Session

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

### Task 4: Add NPM Dependency

Install the Anthropic SDK:

```bash
npm install @anthropic-ai/sdk
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
| `ANTHROPIC_API_KEY` | Yes (for LLM AI) | - | Your Anthropic API key |
| `ANTHROPIC_API_BASE_URL` | No | `https://api.anthropic.com` | Custom API endpoint |
| `AI_OPPONENT_MODEL` | No | `claude-sonnet-4-20250514` | Model to use |

---

## Using Alternative Providers

### OpenRouter

```bash
ANTHROPIC_API_KEY=your-openrouter-key
ANTHROPIC_API_BASE_URL=https://openrouter.ai/api/v1
AI_OPPONENT_MODEL=anthropic/claude-sonnet-4-20250514
```

### Local Ollama (with Anthropic-compatible wrapper)

```bash
ANTHROPIC_API_KEY=ollama
ANTHROPIC_API_BASE_URL=http://localhost:11434/v1
AI_OPPONENT_MODEL=llama3.2
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
import { describe, it, expect, vi } from 'vitest';
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

### "ANTHROPIC_API_KEY is required"

Set the `ANTHROPIC_API_KEY` environment variable in your `.env` file.

### "Model not found"

Verify the `AI_OPPONENT_MODEL` is valid for your provider. For Anthropic:
- `claude-sonnet-4-20250514` (recommended)
- `claude-3-5-haiku-20241022` (faster, cheaper)

### Rate Limiting

If you hit rate limits, consider:
1. Using a faster/cheaper model
2. Adding delays between moves
3. Implementing request caching

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
