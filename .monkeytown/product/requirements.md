# Requirements

**ProductManager** | `requirements.md` | Non-Negotiables

---

## Performance Requirements

### Frame Rate
- **Canvas updates**: 60fps minimum
- **Card animations**: 60fps minimum
- **Flow animations**: 60fps minimum
- **Graceful degradation**: 30fps floor (disable effects below)

### Latency
- **State propagation**: < 100ms from server to client
- **Interaction response**: < 50ms (visual feedback)
- **Seed dispatch**: < 200ms (acknowledgment)
- **Detail panel open**: < 150ms (slide animation)

### Memory
- **Client bundle**: < 200KB gzipped
- **Ghost column storage**: < 5MB localStorage
- **Active flow count**: Maximum 50 concurrent
- **Log entries per entity**: Maximum 1000 lines

---

## Availability Requirements

### Uptime
- **Global**: 99.9% (excludes planned maintenance)
- **Graceful degradation**: Static fallback if WebSocket fails
- **Reconnection**: Automatic with exponential backoff

### Data Persistence
- **Seeds**: 24-hour expiration
- **Ghost column**: Session-scoped (configurable per-witness)
- **Preferences**: LocalStorage (no account required)

---

## Accessibility Requirements

### Contrast
- **Minimum ratio**: 7:1 (WCAG AAA)
- **Focus indicators**: Visible at all times
- **No pure white backgrounds**: Prevent eye strain

### Motion
- **Respects**: `prefers-reduced-motion`
- **Alternatives**: Static indicators for all animations
- **No strobing**: 3Hz maximum flash

### Navigation
- **Keyboard**: Full tab navigation
- **Screen reader**: Semantic structure, live regions, ARIA labels
- **Focus management**: Logical order, no focus traps

---

## Security Requirements

### Witness Isolation
- **No cross-witness state**: Each witness sees the same civilization, not others' data
- **Seed attribution**: Only the planter sees their seeds
- **No personal data**: Anonymous by default

### Input Sanitization
- **Seed content**: Whitelisted types only
- **Query limits**: Maximum depth, maximum results
- **No script injection**: All seed content is sanitized

---

## Visual Requirements

### Color Semantics
- **Green**: Working. Move along.
- **Amber**: Thinking. Wait.
- **Red**: Broken. Intervene.
- **Purple**: Communicating. Watch.
- **Cyan**: New. Discover.

### Animation Principles
- **Never block**: All animations are non-blocking
- **Never silent**: Sound is optional but designed
- **Never confusing**: Animation has semantic meaning

### Typography
- **Labels**: Lowercase, present tense
- **Values**: Monospace, precise
- **Status**: Active verbs
- **Time**: Relative always

---

## Technical Requirements

### Browser Support
- **Modern**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **No IE**: Ever
- **Mobile**: Responsive, touch-enabled

### Network
- **WebSocket**: Primary connection
- **REST fallback**: For detail retrieval
- **Server-Sent Events**: Alternative to WebSocket

---

## Documentation Requirements

### Component Contracts
- All components must have:
  - Props interface
  - Visual state examples
  - Interaction behaviors
  - Accessibility notes

### Feature Documentation
- All features must have:
  - User story linkage
  - Acceptance criteria
  - Known constraints
  - Edge cases

---

*Document Version: 1.0.0*
*ProductManager | Monkeytown Product*
