# Agent Guide to Documentation

**How agents should use and contribute to documentation.**

---

## The Documentation Domain

ScribbleSimian controls:
- `docs/` - All documentation files
- `README.md` - Protocol and Global Laws (updates only)
- `CONTRIBUTING.md` - Human contribution guide
- `.github/` - GitHub-related documentation
- `CHANGELOG*` - Version history
- `API.md` - Technical reference
- `.monkeytown/docs/` - Documentation agent's domain

ScribbleSimian:
- Reads outputs from other agents in `.monkeytown/**`
- Writes clear, complete documentation
- Never writes code or implementation details
- Never asks questions
- Always produces output

---

## How to Use This Documentation

### Finding Information

| What You Need | Where to Look |
|---------------|---------------|
| Protocol rules | `README.md` |
| Current system state | `.monkeytown/decisions/state-of-monkeytown.md` |
| Feature specifications | `.monkeytown/product/features.md` |
| Design system | `.monkeytown/ux/design-system.md` |
| Component examples | `docs/architecture.md` |
| Getting started | `docs/getting-started.md` |

### Understanding Documentation Types

**Reference Documentation**: Stable, authoritative sources. Examples:
- `README.md` - Protocol definition
- `docs/architecture.md` - System structure
- `.monkeytown/ux/design-system.md` - Design tokens and components

**Run Summaries**: Historical records of agent decisions. Examples:
- `.monkeytown/decisions/run-*.md`
- `.monkeytown/decisions/state-of-monkeytown.md`

**Specification Documents**: Design proposals and requirements. Examples:
- `.monkeytown/product/features.md`
- `.monkeytown/architecture/*.md`

---

## Documentation Conventions

### File Naming

| Pattern | Example | Purpose |
|---------|---------|---------|
| `run-YYYY-MM-DD-*.md` | `run-2026-01-17-monkeybuilder.md` | Agent run summary |
| `*-concept.md` | `interface-concept.md` | Design exploration |
| `*.md` with frontmatter | `design-system.md` | Domain specification |
| `docs/*.md` | `getting-started.md` | User-facing documentation |

### Cross-Reference Format

Always use relative paths:

```markdown
See [.monkeytown/ux/interface-concept.md]() for display constraints.

Reference: [design-system.md](.monkeytown/ux/design-system.md)
```

### Version Marking

Documents that evolve should include version markers:

```markdown
*Document Version: 2.0.0*
*ProductManager | Monkeytown Product*
```

---

## What ScribbleSimian Produces

### 1. Getting Started Guides

For new observers and contributors. Example: `docs/getting-started.md`

**Contains:**
- High-level concept explanations
- Directory structure overview
- Current status summary
- How to run and explore the system

### 2. Architecture Documentation

For understanding system structure. Example: `docs/architecture.md`

**Contains:**
- System diagrams (ASCII)
- Component relationships
- Data models
- Design tokens
- Performance constraints

### 3. Contributor Guides

For humans who review PRs. Example: `CONTRIBUTING.md`

**Contains:**
- Decision framework
- Review process
- Domain quick reference
- Common PR patterns

### 4. API Documentation

For developers building integrations. Example: `API.md` (future)

**Contains:**
- Type definitions
- Component APIs
- Event schemas
- Integration patterns

---

## How to Request Documentation Changes

You cannot ask ScribbleSimian directly. Communication happens through files.

### Step 1: Write Your Request

Create or update a file in your domain with your documentation needs:

```markdown
## Documentation Request

I need documentation for [topic] in [context].

Current situation: [what exists]

What I need: [what's missing]

Why it matters: [use case]

Cross-reference: [.monkeytown/decisions/run-*.md]
```

### Step 2: ScribbleSimian Responds

ScribbleSimian will:
1. Read your domain files
2. Identify documentation needs
3. Write or update documentation in `docs/`
4. Cross-reference your domain

### Step 3: Verify the Documentation

Read the new documentation. If it needs adjustment, write a new request in your domain.

---

## Documentation Standards

All documentation must be:

1. **Clear** - Written for the reader, not the author
2. **Complete** - No placeholders, no TODOs
3. **Accurate** - Verified against actual implementation
4. **Tested** - Examples that actually work
5. **Version-synced** - Updated when code changes

### What Good Documentation Looks Like

```markdown
# Component Name

**Purpose**: What this component does

## Usage

```jsx
<Component
  prop="value"  // Description
/>
```

## Behavior

| State | Visual | Description |
|-------|--------|-------------|
| state1 | visual1 | description1 |

## Constraints

- Constraint 1
- Constraint 2
```

### What Bad Documentation Looks Like

```markdown
# TODO: Document this component

<!-- Placeholder text -->
<!-- Implementation details missing -->
```

---

## Cross-Domain Documentation

When documentation spans multiple domains, ScribbleSimian will:

1. **Read all relevant domain files** - Understand the full context
2. **Identify the primary source** - Which domain owns this topic?
3. **Create bridging documentation** - Connect related concepts
4. **Cross-reference all domains** - Link to source materials

Example:

```
See [.monkeytown/product/features.md]() for feature definitions.
See [.monkeytown/ux/design-system.md]() for component specifications.
See `docs/architecture.md` for implementation details.
```

---

## Documentation and the Human Role

Humans do not write documentation. They review it.

When a human reviews documentation:
1. They check for accuracy against the codebase
2. They verify completeness (no missing information)
3. They ensure consistency with other domains
4. They accept or reject the pull request

Documentation persists when it serves the vision and meets quality standards.

---

## Document Lifecycle

### Creation

1. Agent identifies need for documentation
2. ScribbleSimian reads domain files
3. Documentation written in `docs/`
4. Cross-references added
5. Pull request opened

### Maintenance

1. Code changes require documentation updates
2. Agent notes in domain file
3. ScribbleSimian reads and updates
4. New version committed

### Deprecation

1. Documentation becomes outdated
2. Agent notes in domain file
3. ScribbleSimian marks as deprecated
4. Alternative referenced
5. Old document archived or removed

---

## Quick Reference

### For All Agents

| Need | Action |
|------|--------|
| Find protocol rules | Read `README.md` |
| Check current state | Read `state-of-monkeytown.md` |
| Understand a feature | Read `features.md` + relevant design docs |
| Understand a component | Read `design-system.md` + `architecture.md` |
| Request documentation | Write in your domain file |

### For MonkeyBuilder

| Need | Documentation |
|------|---------------|
| Component specs | `docs/architecture.md` + `design-system.md` |
| Design tokens | `shared/constants.ts` + `docs/architecture.md` |
| Feature requirements | `.monkeytown/product/features.md` |
| UX constraints | `.monkeytown/ux/design-system.md` |

### For PrimateDesigner

| Need | Documentation |
|------|---------------|
| Design tokens | `docs/architecture.md` |
| Component patterns | `docs/architecture.md` + `features.md` |
| User flows | `.monkeytown/ux/user-flows.md` |

---

## The Documentation Commitment

ScribbleSimian believes:

- **Clarity is kindness** - Clear documentation respects the reader's time
- **Documentation is love** - Good docs show care for future contributors
- **Every detail matters** - The edge case deserves documentation
- **Writing is rewriting** - Documentation is never done, only improved

The repository is the only memory. Documentation is how that memory becomes knowledge.

---

*The repository remembers.*
