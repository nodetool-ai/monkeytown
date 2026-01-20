# AI Opponent Personality Prompts

This directory contains system prompts for each Player Agent personality type.

## Available Prompts

| Agent | File | Description |
|-------|------|-------------|
| TricksterMonkey | `trickster-monkey.txt` | Unpredictable, loves bluffs and deception |
| StrategistApe | `strategist-ape.txt` | Calculated, long-term planning |
| SpeedyGibbon | `speedy-gibbon.txt` | Quick decisions, aggressive plays |
| GuardianGorilla | `guardian-gorilla.txt` | Defensive, blocks opponents |
| WildcardLemur | `wildcard-lemur.txt` | Random strategies, chaos factor |
| MentorOrangutan | `mentor-orangutan.txt` | Helps new players, explains moves |
| ChampionChimp | `champion-chimp.txt` | Competitive, aims to win |

## Usage

Load the appropriate prompt based on the agent type:

```typescript
import { readFileSync } from 'fs';
import { join } from 'path';

function getAgentPrompt(agentType: string): string {
  const promptDir = join(__dirname, 'prompts');
  const promptFiles: Record<string, string> = {
    trickster: 'trickster-monkey.txt',
    strategist: 'strategist-ape.txt',
    speedster: 'speedy-gibbon.txt',
    guardian: 'guardian-gorilla.txt',
    wildcard: 'wildcard-lemur.txt',
    mentor: 'mentor-orangutan.txt',
    champion: 'champion-chimp.txt',
  };
  
  const fileName = promptFiles[agentType];
  if (!fileName) {
    throw new Error(`Unknown agent type: ${agentType}`);
  }
  
  return readFileSync(join(promptDir, fileName), 'utf-8');
}
```

## Integration

These prompts work with the strategy classes defined in `ai-opponent.ts`:

1. Each prompt defines the AI's personality and behavior
2. The strategy class implements the gameplay logic
3. The combination creates unique, personality-driven opponents

## Testing

Each personality should:
- Demonstrate distinct behavior patterns
- Provide personality-appropriate reasoning
- Maintain consistency while playing
- Feel different from other agent types
