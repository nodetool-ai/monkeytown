# Design System

## The Building Blocks of Monkeytown

**A design system is a shared language. These are the words we use to speak to players.**

---

## Design Tokens

### Colors

```css
:root {
  /* Primary */
  --color-primary: #FF6B35;
  --color-primary-hover: #FF8555;
  --color-primary-active: #E55A25;

  /* Semantic */
  --color-success: #06D6A0;
  --color-warning: #FFD166;
  --color-error: #FF4444;
  --color-info: #118AB2;

  /* Agent Colors */
  --color-agent-chaos: #4CC9F0;
  --color-agent-curious: #F72585;
  --color-agent-designer: #FFD166;
  --color-agent-security: #4361EE;
  --color-agent-economist: #7209B7;
  --color-agent-madchimp: #FF6B35;
  --color-agent-founder: #2EC4B6;

  /* Surfaces */
  --color-bg-primary: #1A1A2E;
  --color-bg-surface: #242438;
  --color-bg-elevated: #2A2A42;
  --color-bg-overlay: #303050;
  --color-bg-floating: #3A3A5A;

  /* Text */
  --color-text-primary: #EAEAEA;
  --color-text-secondary: #A0A0B0;
  --color-text-tertiary: #707080;
  --color-text-inverse: #1A1A2E;

  /* Borders */
  --color-border-subtle: rgba(255, 255, 255, 0.08);
  --color-border-default: rgba(255, 255, 255, 0.12);
  --color-border-strong: rgba(255, 255, 255, 0.20);

  /* Status */
  --color-online: #06D6A0;
  --color-away: #FFD166;
  --color-busy: #FF4444;
  --color-offline: #707080;
}
```

### Typography

```css
:root {
  /* Font Families */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-heading: 'Outfit', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Font Sizes */
  --text-display: 4rem;
  --text-h1: 2.5rem;
  --text-h2: 2rem;
  --text-h3: 1.5rem;
  --text-body-large: 1.125rem;
  --text-body: 1rem;
  --text-caption: 0.875rem;
  --text-micro: 0.75rem;

  /* Line Heights */
  --leading-tight: 1.2;
  --leading-normal: 1.6;
  --leading-loose: 1.8;

  /* Letter Spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.02em;

  /* Font Weights */
  --weight-light: 300;
  --weight-normal: 400;
  --weight-medium: 500;
  --weight-bold: 700;
}
```

### Spacing

```css
:root {
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
}
```

### Motion

```css
:root {
  /* Duration */
  --duration-fast: 150ms;
  --duration-normal: 200ms;
  --duration-slow: 300ms;
  --duration-celebration: 500ms;
  --duration-page: 400ms;

  /* Easing */
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

@keyframes celebrate {
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(-5deg); }
  50% { transform: scale(0.95) rotate(5deg); }
  75% { transform: scale(1.05) rotate(-3deg); }
  100% { transform: scale(1) rotate(0deg); }
}
```

### Borders & Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  --border-width-hairline: 1px;
  --border-width-thin: 1.5px;
  --border-width-default: 2px;
  --border-width-thick: 3px;
}
```

### Shadows (Minimal Usage)

```css
:root {
  /* Only for temporary elevation differentiation */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.2);
}
```

---

## Component Library

### Button

```tsx
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'danger';
  size: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

// Usage Examples:
// <Button variant="primary" size="md">Jump In</Button>
// <Button variant="secondary" icon={<AgentIcon />}>Meet Agents</Button>
// <Button variant="ghost" size="sm">Cancel</Button>
```

**Button Variants:**

| Variant | Background | Text | Border |
|---------|------------|------|--------|
| Primary | --color-primary | --color-text-inverse | none |
| Secondary | transparent | --color-text-primary | --color-border-default |
| Ghost | transparent | --color-text-primary | none |
| Danger | --color-error | --color-text-inverse | none |

**Button Sizes:**

| Size | Height | Padding | Text |
|------|--------|---------|------|
| sm | 32px | 0 12px | --text-caption |
| md | 44px | 0 20px | --text-body |
| lg | 56px | 0 28px | --text-body-large |

---

### Card

```tsx
interface CardProps {
  variant: 'default' | 'elevated' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

// Usage Examples:
// <Card variant="default">Content</Card>
// <Card variant="interactive" onClick={handleClick}>Clickable</Card>
```

**Card Styles:**

```css
.card-default {
  background: var(--color-bg-surface);
  border: var(--border-width-hairline) var(--color-border-subtle);
  border-radius: var(--radius-lg);
}

.card-interactive {
  composes: card-default;
  cursor: pointer;
  transition: transform var(--duration-fast) var(--ease-out);
}

.card-interactive:hover {
  transform: translateY(-2px);
  border-color: var(--color-border-default);
}
```

---

### Agent Badge

```tsx
interface AgentBadgeProps {
  agent: AgentType;
  status?: 'online' | 'away' | 'busy' | 'offline';
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

// AgentType: 'chaos' | 'curious' | 'designer' | 'security' | 'economist' | 'madchimp' | 'founder'
```

**Agent Badge Colors:**

| Agent | Color Variable | Hex |
|-------|----------------|-----|
| ChaosArchitect | --color-agent-chaos | #4CC9F0 |
| CuriousGeorge | --color-agent-curious | #F72585 |
| PrimateDesigner | --color-agent-designer | #FFD166 |
| JungleSecurity | --color-agent-security | #4361EE |
| BananaEconomist | --color-agent-economist | #7209B7 |
| MadChimp | --color-agent-madchimp | #FF6B35 |
| FounderAI | --color-agent-founder | #2EC4B6 |

---

### Game Card
Game cards represent playable cards in games like Babel.

```tsx
interface GameCardProps {
  gameId: string;
  title: string;
  agents: AgentType[];
  players: number;
  maxPlayers: number;
  status: 'live' | 'waiting' | 'ended';
  mode: 'fast' | 'casual' | 'social' | 'competitive';
  onPlay: () => void;
  onWatch: () => void;
}
```

---

### AI Reasoning Display

Based on research showing transparency builds trust (`.monkeytown/research/synthesis.md`), this component makes AI decision-making visible to players.

```tsx
interface AIReasoningDisplayProps {
  reasoningHistory: ReasoningEntry[];
  currentThinking?: {
    agentType: PlayerAgentType;
    reasoning: string;
  };
  isExpanded: boolean;
  onToggleExpand: () => void;
  maxVisible?: number;
}

interface ReasoningEntry {
  id: string;
  agentType: PlayerAgentType;
  reasoning: string;
  timestamp: number;
  action?: string;
  cardValue?: number;
}
```

**Visual Behavior:**
- Collapsed: Shows only most recent reasoning (default 5 entries)
- Expanded: Shows all reasoning history
- Thinking: Animated pulse when agent is "thinking"
- Empty state: Invitation to watch AI strategy

**Usage Context:**
- Right sidebar during active gameplay
- Optional: players can toggle visibility
- Respects `prefers-reduced-motion` for thinking animation

---

### Chat Message

```tsx
interface ChatMessageProps {
  sender: 'human' | 'agent';
  agentType?: AgentType;
  content: string;
  timestamp: Date;
  reactions?: ReactionType[];
}
```

**Chat Message Styling:**

| Sender | Background | Text | Icon |
|--------|------------|------|------|
| Human | --color-bg-elevated | --color-text-primary | 👤 |
| Agent | [Agent Color, 0.15 opacity] | --color-text-primary | 🧠 |

---

### Feedback Modal

```tsx
interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: GameContext;
}
```

---

### Evolution Feed

Following the research insight that "evolution is entertainment" (`.monkeytown/research/synthesis.md`), this component transforms game updates into content.

```tsx
interface EvolutionFeedProps {
  events: EvolutionEvent[];
  maxItems?: number;
}

interface EvolutionEvent {
  id: string;
  type: 'shipped' | 'in_progress' | 'feedback' | 'community';
  title: string;
  description: string;
  agentType?: AgentType;
  agentName?: string;
  playerAttribution?: string;
  timestamp: number;
  progress?: number;
  et?: string;
  playerCount?: number;
}
```

**Event Types:**

| Type | Icon | Color | Meaning |
|------|------|-------|---------|
| shipped | 🎉 | Success green | Feature just released |
| in_progress | 🔧 | Info blue | Currently being built |
| feedback | 💬 | Warning amber | Player feedback incorporated |
| community | 👤 | Agent color | Community request fulfilled |

---

### Toast Notification

```tsx
interface ToastProps {
  type: 'success' | 'warning' | 'error' | 'info' | 'celebration';
  title: string;
  message?: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}
```

**Toast Variants:**

| Type | Icon | Color |
|------|------|-------|
| Success | ✓ | --color-success |
| Warning | ⚠ | --color-warning |
| Error | ✕ | --color-error |
| Info | ℹ | --color-info |
| Celebration | 🎉 | --color-primary |

---

### Progress Indicator

```tsx
interface ProgressProps {
  value: number; // 0-100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  variant?: 'default' | 'success' | 'agent';
}
```

---

## Layout Components

### Page Layout

```tsx
<PageLayout
  header={<Header />}
  sidebar={<Sidebar />}
  main={<MainContent />}
  footer={<Footer />}
/>
```

### Game Layout

```tsx
<GameContainer>
  <GameCanvas />
  <GameControls>
    <PlayerHand />
    <GameState />
  </GameControls>
  <ChatPanel />
  <AgentSidebar />
</GameContainer>
```

---

## Form Patterns

### Input Field

```tsx
<InputField
  label="Player Name"
  placeholder="Enter your name"
  error={error}
  helperText="This name will be visible to other players"
/>
```

### Quick Feedback

```
[ 👍 ] [ 😮 ] [ 🎉 ]  [ 💬 ]
```

---

## Icon System

```tsx
import { Icon } from './Icon';

// Usage:
<Icon name="agent" agent="chaos" size="md" />
<Icon name="game" size="sm" />
<Icon name="feedback" animated />
```

**Icon Sizes:**

| Size | Pixels | Usage |
|------|--------|-------|
| sm | 16px | Inline text, micro |
| md | 24px | Standard |
| lg | 32px | Emphasis |
| xl | 48px | Hero |
| 2xl | 64px | Display |

---

## Responsive Breakpoints

```css
:root {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}

/* Usage: @media (min-width: --breakpoint-md) */
```

---

## Accessibility Checklist

- [ ] All interactive elements have focus indicators
- [ ] Color is not the only way to convey information
- [ ] Touch targets meet minimum 44x44px
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Keyboard navigation works for all interactions
- [ ] Screen reader announcements are meaningful
- [ ] Animation can be disabled via `prefers-reduced-motion`
- [ ] Form inputs have associated labels
- [ ] Error messages are descriptive
- [ ] Status updates are announced

---

## Usage Guidelines

### DO

- Use design tokens for all styling
- Compose from existing components
- Test at all breakpoints
- Follow accessibility guidelines
- Use agent colors for agent-related elements

### DON'T

- Hardcode color values
- Create one-off styles
- Use shadows for elevation
- Mix font families arbitrarily
- Animate without purpose

---

*The design system is living documentation. Update it as the product evolves.*
