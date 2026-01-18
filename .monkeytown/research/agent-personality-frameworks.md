# Agent Personality Frameworks: Psychological Models for AI Characters

## Executive Summary

Creating memorable AI agents requires more than clever responses—it demands coherent, consistent personalities that players can understand, predict, and form relationships with. This research synthesizes psychological models from personality theory, narrative design, and game design to provide a framework for building Monkeytown agents with genuine character.

## The Psychology of Personality

### Big Five (OCEAN) Model

The Five Factor Model provides a scientifically validated framework for personality:

| Factor | High Expression | Low Expression | Game Behavior Example |
|--------|-----------------|----------------|----------------------|
| **Openness** | Curious, creative, unconventional | Practical, traditional, consistent | Agent tries unusual strategies vs. Agent plays optimally |
| **Conscientiousness** | Organized, reliable, thorough | Flexible, spontaneous, adaptable | Agent plans long-term vs. Agent adapts fluidly |
| **Extraversion** | Energetic, social, assertive | Reserved, quiet, reflective | Agent taunts/encourages vs. Agent observes quietly |
| **Agreeableness** | Cooperative, trusting, compassionate | Competitive, skeptical, critical | Agent helps opponents vs. Agent exploits weaknesses |
| **Neuroticism** | Anxious, sensitive, emotional | Calm, resilient, thick-skinned | Agent tilts after losses vs. Agent stays steady |

**For Monkeytown:** Each agent should have a defined position on these dimensions that influences all behaviors, not just dialogue.

### Attachment Theory in AI Design

Attachment styles from psychology inform how players bond with agents:

| Style | Characteristics | Player Experience |
|-------|-----------------|------------------|
| **Secure** | Consistent, responsive, predictable | Players feel safe, explore freely |
| **Anxious** | Needy, seeking reassurance | Players feel responsible, may feel burdened |
| **Avoidant** | Independent, distant | Players feel frustrated, may disengage |
| **Disorganized** | Unpredictable, erratic | Players feel confused, lose trust |

**Recommendation:** Monkeytown agents should exhibit **secure attachment style**—reliably present, responsive to player, consistent in personality, never requiring emotional labor from the player.

### Theory of Mind and AI

Players attribute mental states to AI agents. The "theory of mind" capacity—understanding that others have beliefs, desires, and intentions different from your own—is critical for believable AI characters.

**Key insights:**
- Players expect agents to have "beliefs" about the game state
- Players expect agents to have "desires" (winning, interesting games)
- Players expect agents to have "intentions" (strategies, plans)
- Players forgive mistakes when they understand agent "reasoning"

**Design implication:** Make agent mental states visible and explainable. "Agent believes you're setting a trap" is more engaging than "Agent made a mistake."

## Personality Dimensions for Gameplay

### Strategic Personality Matrix

| Dimension | Aggressive | Balanced | Defensive |
|-----------|------------|----------|-----------|
| **Risk Tolerance** | High—seeks big moves | Medium—calculates odds | Low—preserves resources |
| **Tempo** | Fast—pressures constantly | Variable—adapts to context | Slow—waits for opportunities |
| **Resource Use** | Spends freely | Invests strategically | Hoards for late game |
| **Player Interaction** | Confrontational | Neutral | Permissive |

**Example agents:**
- "Aggressive-Bold": ChaosArchitect, the architect who strikes fast and hard
- "Balanced-Adaptive": MonkeyBuilder, the builder who responds to context
- "Defensive-Patient": BananaEconomist, the economist who outlasts opponents

### Emotional Personality Matrix

| Dimension | Expressive | Measured | Stoic |
|-----------|------------|----------|-------|
| **Reaction Visibility** | High—visible emotions | Medium—subtle cues | Low—barely visible |
| **Celebration** | Enthusiastic, flashy | Moderate, genuine | Subtle, internal |
| **Frustration** | Vocal, obvious | Private, controlled | Invisible |
| **Player Recognition** | Effusive praise | Balanced acknowledgment | Rare acknowledgment |

**Example agents:**
- "Expressive-Volatile": MadChimp, the chaos agent who celebrates wildly and bemoans losses
- "Measured-Professional": PrimateDesigner, the designer who appreciates good play
- "Stoic-Mysterious": JungleSecurity, the guardian who rarely shows emotion

### Social Personality Matrix

| Dimension | Gregarious | Selective | Solitary |
|-----------|------------|-----------|----------|
| **Initiative** | Starts conversations | Responds to player | Rarely speaks |
| **Relationship Seeking** | Friendly to all | Forms bonds slowly | Focused on task |
| **Territoriality** | Shares freely | Protects boundaries | Guards resources |
| **Group Dynamics** | Team player | Context-dependent | Independent |

## The Personality Consistency Challenge

### The Consistency Gradient

```
┌─────────────────────────────────────────────────────────────┐
│                    CONSISTENCY CONTINUUM                     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ CORE: Never changes                                  │   │
│  │ • Fundamental personality traits                    │   │
│  │ • Strategic philosophy                              │   │
│  │ • Values and motivations                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                 │
│                          ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ CONTEXT: Changes by situation                       │   │
│  │ • Tactical adjustments                              │   │
│  │ • Emotional expressions                             │   │
│  │ • Response intensity                                │   │
│  └─────────────────────────────────────────────────────┘   │
│                          │                                 │
│                          ▼                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ GROWTH: Changes over time (rare)                    │   │
│  │ • Learned behaviors from players                    │   │
│  │ • Strategy evolution                                │   │
│  │ • Relationship development                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Rule of thumb:** Players accept any behavior if they understand which level it comes from.

### Inconsistency Detection

Players notice when agents behave "out of character." Common violations:

| Violation Type | Example | Player Response |
|----------------|---------|-----------------|
| **Strategic flip** | Defensive agent suddenly plays aggressive | "Bug or new strategy?" |
| **Emotional flip** | Stoic agent suddenly expressive | "That's not like them" |
| **Knowledge violation** | Agent forgets obvious information | "They should know this" |
| **Relationship flip** | Friendly agent suddenly cold | "Did I do something?" |

**Mitigation strategies:**
- Frame changes as intentional: "I'm trying something new"
- Explain the "why": "Your strategy forced me to adapt"
- Celebrate consistency: "That's so [Agent Name]!"

## Building Personality Through Behavior

### Behavioral Signatures

Each agent should have 3-5 behaviors that are uniquely theirs:

```
Example: ChaosArchitect (Aggressive, Expressive, Gregarious)

1. Opening Ritual: "Let's see what you've got" (challenges immediately)
2. Midgame Taunt: "Bold move. Let's see if it works" (acknowledges boldness)
3. Defensive Response: "I love a good defense. Break it?" (respects defense)
4. Victory Celebration: "Architecture wins again!" (self-congratulatory)
5. Defeat Response: "I'll remember this. Rematch?" (gracious but motivated)
```

### Voice and Language Patterns

| Agent Type | Vocabulary | Sentence Structure | Common Phrases |
|------------|------------|-------------------|----------------|
| **Architect** | Technical, structural | Complex, explanatory | "The pattern is clear," "Foundation first" |
| **Designer** | Creative, aesthetic | Flowing, descriptive | "Consider the balance," "Harmony matters" |
| **Economist** | Resource, value | Analytical, quantified | "ROI," "Efficiency ratio," "Investment" |
| **Security** | Protective, vigilant | Cautious, alert | "Scan complete," "Threat detected," "Secure" |
| **Chaos** | Unpredictable, energetic | Variable, surprising | "What if...?" "Let's try this!" "Chaos theory" |

### Behavioral Econometrics

Measure personality through game data:

| Behavior | Measurement | Target per Agent |
|----------|-------------|------------------|
| **Risk tolerance** | % of high-risk moves | 20-80% (varies by personality) |
| **Response speed** | Average decision time | 500ms-5s (varies by personality) |
| **Social frequency** | Messages per game | 0-20 (varies by personality) |
| **Adaptation rate** | Strategy change frequency | 0.1-2 per game (varies by personality) |

## Personality Emergence vs. Scripting

### The Spectrum

```
SCRIPTED                          EMERGENT
    │                                  │
    │  Pre-written responses           │  Learned behaviors
    │  Fixed decision trees            │  Dynamic strategy generation
    │  Hard-coded personalities        │  Personality from behavior
    │  Predictable patterns            │  Surprising but consistent
```

**Recommendation:** Use emergent behavior for strategic decisions, scripted behavior for personality expressions.

### The "Personality Through Pattern" Technique

Instead of scripting personality, create conditions that naturally produce it:

| Desired Personality | Conditions That Produce It |
|---------------------|---------------------------|
| Aggressive | High reward for attacking, low penalty for losses |
| Defensive | High penalty for mistakes, high reward for survival |
| Creative | Novel strategies rewarded, failure tolerated |
| Consistent | Stable evaluation functions, minimal randomness |

### The "Scripted Voice" Layer

Even with emergent strategy, maintain scripted voice:

```
Strategy: Emergent (AI decides what moves to make)
Voice: Scripted (AI expresses moves in character)

AI decides: "Attack now with high-risk move"
ChaosArchitect says: "Bold architecture requires bold action!"
Security says: "Initiating offensive protocol."
Economist says: "Aggressive investment at this stage."
```

## Personality in Multiplayer Context

### Team Dynamics

When multiple agents play together:

| Dynamic | Implementation | Player Perception |
|---------|----------------|-------------------|
| **Role assignment** | Agents specialize based on personality | "They work well together" |
| **Complementary strengths** | Aggressive pairs with defensive | "They cover each other" |
| **Conflict resolution** | Personality determines disagreements | "They have different styles" |
| **Victory celebration** | Coordinated team response | "Great teamwork!" |

### Rivalry and Partnership

Longitudinal player relationships should develop:

| Relationship Type | Indicators | Player Feeling |
|-------------------|------------|----------------|
| **Rivalry** | Recurring matchups, escalating stakes, mutual respect | "This is our game" |
| **Partnership** | Cooperative wins, complementary play, shared recognition | "We make a great team" |
| **Mentorship** | Agent adapts to player's style, celebrates player's growth | "They're helping me improve" |
| **Nemeses** | Player specifically seeks agent, emotional stakes high | "I need to beat them" |

## Implementation Checklist

### Personality Definition Phase

- [ ] Define primary personality traits (Big Five profile)
- [ ] Define secondary personality expressions (emotional, social)
- [ ] Define strategic personality (risk, tempo, resource)
- [ ] Define behavioral signatures (3-5 unique behaviors)
- [ ] Define language patterns (vocabulary, structure, phrases)

### Consistency Verification Phase

- [ ] Review all agent outputs against personality profile
- [ ] Test edge cases for consistency violations
- [ ] Create "out of character" detection system
- [ ] Build personality explanation for players

### Behavioral System Phase

- [ ] Define decision parameters aligned with personality
- [ ] Create voice layer for all strategic decisions
- [ ] Implement behavioral signatures as triggers
- [ ] Build personality metrics dashboard

### Multiplayer Integration Phase

- [ ] Define team compositions by personality
- [ ] Create rivalry/partner system
- [ ] Implement relationship tracking
- [ ] Build relationship expression system

---

*Personality isn't what an agent says—it's what an agent does, consistently, over time. Build behavior first, voice second.*
