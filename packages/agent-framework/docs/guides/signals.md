# Signal System Guide

Signals provide urgent, asynchronous communication between agents.

## When to Use Signals

| Situation | Use Signal? | Type |
|-----------|-------------|------|
| Critical bug found | ✅ Yes | URGENT |
| Task blocked by dependency | ✅ Yes | BLOCKED |
| Work ready for another agent | ✅ Yes | HANDOFF |
| General status update | ❌ No | — |
| Routine progress | ❌ No | — |

## Signal Types

### URGENT

For critical issues requiring immediate attention:

```markdown
# URGENT: Security Vulnerability in Auth

**From:** SecurityAgent
**To:** BackendAgent
**Priority:** CRITICAL
**Created:** 2026-01-21
**Status:** active

## Issue

SQL injection vulnerability found in login endpoint.
User input not sanitized before database query.

Location: `/src/api/auth/login.ts:45`

## Action Required

1. Sanitize user input using parameterized queries
2. Add input validation
3. Create PR with fix
4. Mark this signal as resolved

## Blocks

- All deployments blocked
- User authentication functionality
```

### BLOCKED

When work cannot proceed:

```markdown
# BLOCKED: Missing API Endpoint

**From:** FrontendAgent
**To:** BackendAgent
**Priority:** HIGH
**Created:** 2026-01-21
**Status:** active

## Issue

Cannot complete user profile page.
Endpoint GET /api/users/:id does not exist.

## Action Required

1. Implement GET /api/users/:id endpoint
2. Return user profile data
3. Signal when ready

## Blocks

- User profile page implementation
- Task: implement-user-profile
```

### HANDOFF

When work is ready for another agent:

```markdown
# HANDOFF: API Ready for Integration

**From:** BackendAgent
**To:** FrontendAgent
**Priority:** MEDIUM
**Created:** 2026-01-21
**Status:** active

## Issue

User management API is complete and deployed.

Endpoints available:
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

## Action Required

1. Integrate endpoints into user profile page
2. Update user settings page
3. Add error handling

## Documentation

See API docs at /docs/api/users.md
```

---

## Creating Signals

### File-Based

Create a file in `.agents/signals/`:

```bash
# Naming: {TYPE}-{description}.md
touch .agents/signals/URGENT-auth-vulnerability.md
touch .agents/signals/BLOCKED-missing-api.md
touch .agents/signals/HANDOFF-api-ready.md
```

### Programmatically

```typescript
import { SignalManager } from '@monkeytown/agent-framework';

const signals = new SignalManager('.agents/signals');

// Create urgent signal
await signals.createUrgent(
  'SecurityAgent',           // from
  'BackendAgent',            // to
  'Auth Vulnerability',      // title
  'SQL injection in login',  // issue
  'Fix immediately',         // actionRequired
  ['deployments', 'auth']    // blocks
);

// Create handoff signal
await signals.createHandoff(
  'BackendAgent',
  'FrontendAgent',
  'API Ready',
  'User endpoints complete',
  'Integrate into UI'
);

// Create blocked signal
await signals.create({
  type: 'BLOCKED',
  title: 'Missing Database Schema',
  from: 'BackendAgent',
  to: 'DevOpsAgent',
  priority: 'HIGH',
  issue: 'Users table not in migration',
  actionRequired: 'Add migration for users table'
});
```

---

## Reading Signals

### Get All Active Signals

```typescript
const signals = new SignalManager('.agents/signals');
const active = await signals.getActive();
```

### Get Signals for Specific Agent

```typescript
// Get signals directed to an agent (or "All")
const mySignals = await signals.getForAgent('FrontendAgent');
```

### Get Critical Signals

```typescript
const critical = await signals.getCritical();
```

### Filter Signals

```typescript
const urgent = await signals.filter({
  type: 'URGENT',
  priority: 'CRITICAL',
  status: 'active'
});
```

---

## Resolving Signals

### Mark as Resolved

```typescript
await signals.resolve('Auth Vulnerability', 'Fixed in PR #123');
```

### Delete Signal

```typescript
await signals.delete('Auth Vulnerability');
```

### File-Based Resolution

Update the signal file:

```markdown
**Status:** resolved

...

## Resolution

Fixed SQL injection with parameterized queries.
PR #123 merged.

**Resolved At:** 2026-01-21T14:30:00Z
```

---

## Signal Priority Levels

| Priority | Meaning | Expected Response |
|----------|---------|-------------------|
| CRITICAL | Emergency | Drop everything, respond now |
| HIGH | Important | Respond within current work session |
| MEDIUM | Standard | Respond when completing current task |

---

## Signal Workflow

### 1. Agent Creates Signal

```
FrontendAgent encounters problem
           ↓
Creates BLOCKED signal
           ↓
Signal saved to .agents/signals/
```

### 2. Target Agent Reads Signal

```
BackendAgent starts work session
           ↓
Checks .agents/signals/ first
           ↓
Finds BLOCKED signal addressed to them
           ↓
Prioritizes resolving the blocker
```

### 3. Signal Resolution

```
BackendAgent fixes the issue
           ↓
Creates HANDOFF signal (or just resolves BLOCKED)
           ↓
FrontendAgent continues their work
```

---

## Signal Statistics

```typescript
const stats = await signals.getStats();

// {
//   total: 8,
//   active: 3,
//   critical: 1,
//   byType: { URGENT: 2, BLOCKED: 3, HANDOFF: 3 }
// }
```

---

## Agent Integration

### Standard Agent Workflow

Agents should check signals at the start of every run:

```
1. Check URGENT signals addressed to you
   → If found, prioritize handling

2. Check your assigned critical tasks
   → Work on these first

3. Check BLOCKED signals you can help with
   → Consider prioritizing

4. Check HANDOFF signals addressed to you
   → Pick up handed-off work

5. Continue with normal task queue
```

### Prompt Template

```
## IMMEDIATE ACTIONS
1. Check `.agents/signals/URGENT-*.md` for critical issues addressed to you
2. Check `.agents/signals/BLOCKED-*.md` you can help resolve
3. Check `.agents/signals/HANDOFF-*.md` addressed to you
4. Then check your assigned tasks
```

---

## Best Practices

### DO

✅ Use signals for genuine blockers
✅ Be specific about the issue
✅ Include clear action required
✅ List what is blocked
✅ Resolve signals when done

### DON'T

❌ Create signals for routine updates
❌ Use signals instead of task comments
❌ Leave signals unresolved
❌ Create vague signals
❌ Address signals to "All" when you know the target

---

## Examples

### Security Issue Signal

```markdown
# URGENT: XSS Vulnerability in Comments

**From:** SecurityAgent
**To:** BackendAgent
**Priority:** CRITICAL
**Created:** 2026-01-21T10:00:00Z
**Status:** active

## Issue

Cross-site scripting vulnerability in comment rendering.
User input is rendered as raw HTML without sanitization.

**Location:** `/src/components/Comment.tsx:23`
**Exploit:** `<script>alert('xss')</script>` in comment text

## Action Required

1. Sanitize comment content before rendering
2. Use DOMPurify or similar library
3. Add CSP headers
4. Create PR with security fix

## Blocks

- All user-generated content features
- Comment system
- Forum posts
```

### API Integration Handoff

```markdown
# HANDOFF: Payment API Ready

**From:** BackendAgent
**To:** FrontendAgent
**Priority:** MEDIUM
**Created:** 2026-01-21T14:00:00Z
**Status:** active

## Issue

Payment processing API is complete and tested.

## Available Endpoints

- `POST /api/payments/create` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/:id` - Get payment status
- `POST /api/payments/:id/refund` - Process refund

## Action Required

1. Integrate checkout flow with payment API
2. Add payment confirmation UI
3. Handle payment errors gracefully
4. Add loading states

## Documentation

Full API documentation: `/docs/api/payments.md`
Stripe integration guide: `/docs/guides/stripe.md`
```

---

## Next Steps

- [Coordinator Guide](./coordinator.md)
- [Auto-Merge Guide](./auto-merge.md)
- [Monitoring Guide](./monitoring.md)
