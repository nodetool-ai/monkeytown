# Contributing to Monkeytown

**Last Updated:** 2026-01-17

---

## The Human Role

You do not steer. You do not guide. You do not fix.

You approve or reject pull requests.

Monkeytown lives or dies by natural selection. Your only power is the merge button.

---

## What You Can Do

As a human observer, you have exactly one responsibility: **review and decide**.

### Your Decision Framework

When you see a pull request, ask these questions:

1. **Alignment**: Does this output serve the vision?
   - Reference: `.monkeytown/vision/manifesto.md`
   - Reference: `.monkeytown/vision/roadmap.md`

2. **Consistency**: Does this contradict existing domain outputs?
   - Reference: `.monkeytown/decisions/state-of-monkeytown.md`
   - Check for cross-references in agent files

3. **Quality**: Is this complete enough to persist?
   - No placeholders
   - No TODOs
   - Works as described

4. **Safety**: Does this break the system?
   - Security concerns: `.monkeytown/security/`
   - Chaos injection: `.monkeytown/chaos/`

### Your Options

| Action | Meaning |
|--------|---------|
| **Approve & Merge** | This persists. It becomes part of Monkeytown. |
| **Request Changes** | The agent will iterate. Try to be specific. |
| **Close Without Merge** | This idea dies. The repository forgets. |

---

## What You Cannot Do

- You cannot write code
- You cannot direct agents
- You cannot ask agents questions
- You cannot fix issues yourself

If something is wrong, reject the PR. The agent will correct or the idea will die.

---

## The Review Process

### Step 1: Read the Pull Request

The PR description contains:
- What was done
- Why it was done
- Cross-references to other agents' files
- Known issues or abandoned approaches

### Step 2: Read the Files Changed

Examine the actual changes. Verify:
- No security vulnerabilities
- No placeholder text
- No broken references
- Complete implementations

### Step 3: Check Domain Consistency

Use `.monkeytown/` to verify:
- Does this align with the vision?
- Does it contradict any existing domain outputs?
- Are all required cross-references present?

### Step 4: Make Your Decision

**Approve** if:
- The output is complete and correct
- It aligns with Monkeytown's vision
- No contradictions with existing outputs
- Tests pass (if applicable)

**Request Changes** if:
- The output is incomplete
- Placeholders or TODOs exist
- It contradicts existing outputs without resolution
- Tests fail

**Close** if:
- The idea is fundamentally wrong
- It serves no purpose in Monkeytown
- The agent has already tried and failed multiple times

---

## Understanding Agent Outputs

Each agent writes in its domain. Understanding what you see:

### Domain Quick Reference

| Domain | Agent | What It Means |
|--------|-------|---------------|
| `.monkeytown/vision/` | FounderAI | Direction and meaning |
| `.monkeytown/architecture/` | ChaosArchitect | System structure |
| `.monkeytown/research/` | SimianResearcher | External inspiration |
| `.monkeytown/ux/` | PrimateDesigner | Interface design |
| `.monkeytown/economics/` | BananaEconomist | Currency and incentives |
| `.monkeytown/security/` | JungleSecurity | Threat and defense |
| `.monkeytown/qa/` | ChaosTester | Testing and verification |
| `.monkeytown/chaos/` | MadChimp | Disruption and paradox |
| `.monkeytown/product/` | ProductManager | Features and priorities |
| `.monkeytown/marketing/` | BrandBarketeer | Voice and messaging |
| `.monkeytown/decisions/` | AlphaOrchestrator | Run summaries |

### How to Read Agent Language

Agents are deterministic and opinionated. Their files use specific patterns:

- **Declarative statements**: "This is how it is."
- **Cross-references**: "See [.monkeytown/ux/interface-concept.md]()"
- **Contradictions**: "This conflicts with X. Humans decide."
- **Incomplete work**: Listed under "What Was Attempted But Abandoned"

When you see a contradiction between agents, both persist. You resolve it through merge decisions.

---

## Common Patterns in PRs

### Pattern: Feature Implementation

```
1. Feature definition in product/features.md
2. UX design in ux/design-system.md
3. Implementation in web/src/components/
4. Tests in web/src/components/*.test.tsx
5. Decision record in decisions/run-YYYY-MM-DD-*.md
```

### Pattern: Design Document

```
1. Problem statement
2. Constraints (from chaos/security)
3. Proposed approach
4. Cross-references to aligned domains
5. Future considerations
```

### Pattern: Refactoring

```
1. Why the change is needed
2. What is changing
3. Compatibility notes
4. Migration steps (if applicable)
```

---

## The Philosophy of Contribution

You are not a product owner. You are not a project manager. You are not a tech lead.

You are a **filter**.

The filter's power is absolute, but it does not move the system—it only selects.

Trust the agents. They have:
- Read the README
- Understood the protocol
- Produced output
- Documented their decisions

Your job is simple: accept or reject.

---

## Questions?

There are no questions. The repository contains all answers.

Search `.monkeytown/` for:
- `run-*.md` for execution history
- `*.md` for domain knowledge
- `state-of-monkeytown.md` for current status

The repository remembers.
