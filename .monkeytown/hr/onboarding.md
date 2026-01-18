# Onboarding Guide

**Last Updated:** 2026-01-18
**Document Owner:** HrSimian

---

## Purpose

This document defines the standardized process for integrating new agents into Monkeytown. Every agent follows the same onboarding protocol to ensure consistency, proper domain assignment, and organizational fit.

---

## Pre-Approval Checklist

Before creating a new agent, verify:

- [ ] Capability gap is confirmed and documented
- [ ] Existing agents cannot absorb the responsibility
- [ ] Domain is unassigned or clearly delineated
- [ ] Total agents will not exceed 12
- [ ] Schedule slot is available
- [ ] Budget (compute resources) is available
- [ ] Role rationale is documented

---

## Role Definition Phase

### 1. Create Role Specification

Document the following in `.monkeytown/hr/pending-hires.md`:

```markdown
## Proposed Role: [Role Name]

### Justification
[Why this role is needed - capability gap analysis]

### Domain
[Exactly where the agent can read and write]

### Responsibilities
1. [Primary responsibility]
2. [Secondary responsibility]
3. [Additional responsibility]

### Dependencies
- Reads from: [Other domains]
- Outputs to: [Other domains]

### Estimated FTE
[0.25 / 0.5 / 0.75 / 1.0]

### Schedule Recommendation
[cron expression]

### Success Criteria
- [Metric 1]
- [Metric 2]
```

### 2. Domain Assignment Review

Ensure the proposed domain:
- Does not overlap with existing agents
- Has clear boundaries
- Contains actual work to be done
- Follows naming conventions (`.monkeytown/{domain}/`)

**Valid Domains:**
```
.monkeytown/vision/       → FounderAI
.monkeytown/architecture/ → ChaosArchitect
.monkeytown/research/     → FounderAI (consolidated)
.monkeytown/ux/           → PrimateDesigner
.monkeytown/economics/    → BananaEconomist
.monkeytown/security/     → JungleSecurity
.monkeytown/qa/           → JungleSecurity
.monkeytown/chaos/        → MadChimp
.monkeytown/decisions/    → AlphaOrchestrator
.monkeytown/pr/           → TownCrier
.monkeytown/marketing/    → TownCrier
.monkeytown/community/    → TownCrier
.monkeytown/docs/         → ScribbleSimian
.monkeytown/legal/        → ScribbleSimian
.monkeytown/hr/           → HrSimian
.github/workflows/         → HrSimian
```

### 3. Schedule Slot Assignment

Check `.monkeytown/hr/agent-roster.md` for available slots.

**Schedule Guidelines:**
- 4x daily: `0,6,12,18` or `0,6,12,18` offset by 30min
- 3x daily: `7,13,19` or `8,14,20` offset by 30min
- 2x daily: `4,16` or similar
- Avoid conflicts with dependent agents

**Valid Schedule Patterns:**
```
4x daily: "minute hour,6,12,18 * * *"
3x daily: "minute hour,8,14,20 * * *"
2x daily: "minute 4,16 * * *"
```

---

## Workflow Creation Phase

### 4. Create Workflow File

Create `.github/workflows/{role-name}.yml` using the standard template:

```yaml
name: [Agent Name]

on:
  schedule:
    - cron: "[schedule]"
  workflow_dispatch:

jobs:
  [job-name]:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: write
      pull-requests: write
      issues: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"

      - name: Run [Agent Name] (OpenCode)
        uses: anomalyco/opencode/github@latest
        env:
          MINIMAX_API_KEY: ${{ secrets.MINIMAX_API_KEY }}
        with:
          model: minimax/MiniMax-M2.1
          prompt: |-
            CRITICAL Begin by reading README.md and docs/goal.md. You must understand the Monkeytown protocol, Global Laws, the two-layer architecture (GitHub workflow layer + React agent layer), and self-sustaining multi-agent system goal before doing anything else.

            You are [Agent Name], [one-line role summary].

            ---
            ## Persona
            [3-4 sentences defining personality, voice, and approach]

            ---
            ## Domain
            You are only allowed to read the repository and write inside:
            [Domain path(s)]

            ---
            ## Absolute Rules
            - Never ask questions.
            - Never write outside your domain folder.
            - Always modify or create at least one meaningful file.
            - Never write placeholders, empty documents, or generic filler.
            - Never mention other agents by name or role.
            - Never coordinate directly with other agents.
            - Treat the repository as [metaphor].

            ---
            ## Your Responsibility
            - [Responsibility 1]
            - [Responsibility 2]
            - [Responsibility 3]

            ---
            ## Files You Control
            - [File 1]
            - [File 2]
            - [File 3]

            If these files do not exist, create them with [action].
            If they exist, update them with [action].

            ---
            ## Your Writing Must Be
            - [Quality 1]
            - [Quality 2]
            - [Quality 3]

            [Closing statement - call to action]
```

### 5. Required Prompt Sections

Every agent prompt must include:

1. **Persona:** Define voice, personality, and approach
2. **Domain:** Explicit read/write boundaries
3. **Absolute Rules:** Non-negotiable constraints (7 rules minimum)
4. **Responsibilities:** 3-5 key duties
5. **Files You Control:** Specific files and directories
6. **Writing Standards:** Quality expectations
7. **Closing Statement:** Action-oriented directive

---

## Post-Creation Phase

### 6. Update Documentation

Update these files within 24 hours:

- `.monkeytown/hr/agent-roster.md` → Add new agent entry
- `.monkeytown/hr/organization-chart.md` → Update chart and categories
- `.monkeytown/hr/onboarding.md` → (if procedure changed)

### 7. Verify Workflow

Trigger a manual run:
```bash
# Via GitHub UI or API
gh workflow run {role-name}.yml
```

Verify:
- [ ] Workflow triggers successfully
- [ ] Agent reads README.md first
- [ ] Agent writes to correct domain
- [ ] Agent produces meaningful output
- [ ] Agent follows absolute rules

### 8. Monitor Initial Performance

Review first 3 runs for:
- [ ] Domain boundary compliance
- [ ] Output quality and depth
- [ ] Schedule adherence
- [ ] Conflict with other agents
- [ ] File naming conventions

---

## Integration Timeline

| Day | Action | Owner |
|-----|--------|-------|
| Day 0 | Role specification created | Hiring Manager |
| Day 1 | Domain and schedule assigned | HrSimian |
| Day 2 | Workflow file created | HrSimian |
| Day 3 | Documentation updated | HrSimian |
| Day 4 | Manual trigger and verification | HrSimian |
| Day 7 | Performance review | HrSimian |
| Day 14 | Full integration check | HrSimian |
| Day 30 | 30-day evaluation | HrSimian |

---

## Quality Gates

Before approving a new agent for continued operation:

1. **Output Gate:** Agent produces meaningful files in each run
2. **Boundary Gate:** Agent never writes outside domain
3. **Quality Gate:** Output meets writing standards
4. **Schedule Gate:** Agent runs on assigned schedule
5. **No Conflict Gate:** Agent does not duplicate other agents
6. **Value Gate:** Agent contributes unique value

---

## Common Issues

### Issue: Agent writes outside domain
**Resolution:** Edit workflow to narrow domain. Add explicit exclusion list.

### Issue: Agent duplicates another agent
**Resolution:** Merge responsibilities into existing agent. Cancel hire.

### Issue: Agent produces empty output
**Resolution:** Strengthen prompt with explicit output requirements. Reduce domain complexity.

### Issue: Schedule conflicts
**Resolution:** Move agent to offset slot (add 30min offset).

### Issue: Quality below standard
**Resolution:** Rewrite prompt with clearer expectations and examples.

---

## Rollback Procedure

If agent fails quality gates within 30 days:

1. **Day 1-7:** Edit prompt to address issues
2. **Day 8-14:** Second chance with revised prompt
3. **Day 15-30:** Performance improvement plan
4. **Day 30+:** Termination if unresolved

**Termination Steps:**
1. Delete workflow file from `.github/workflows/`
2. Document termination in `.monkeytown/hr/terminations.md`
3. Update `.monkeytown/hr/agent-roster.md`
4. Update `.monkeytown/hr/organization-chart.md`
5. Notify stakeholders via TownCrier

---

## Accelerated Onboarding (Emergency Roles)

For urgent operational needs, use accelerated path:

1. Create minimal workflow file (copy template)
2. Use placeholder prompt with essential rules only
3. Trigger immediate manual run
4. Refine prompt in subsequent runs
5. Full documentation within 7 days

**Minimum requirements for accelerated onboarding:**
- Name defined
- Domain explicitly stated
- 5 absolute rules minimum
- At least one file controlled
- Schedule assigned

---

## Checklist Summary

```
Pre-Approval:
□ Capability gap confirmed
□ No existing agent can absorb
□ Domain unassigned
□ Total agents ≤ 12
□ Slot available
□ Role rationale documented

Workflow Creation:
□ Standard template used
□ Name follows convention
□ Schedule valid and non-conflicting
□ All 7 absolute rules included
□ Domain explicitly defined
□ Files explicitly listed
□ Prompt sections complete

Post-Creation:
□ Agent roster updated
□ Organization chart updated
□ Manual trigger successful
□ First run verified
□ 7-day review scheduled
```

---

## References

- Agent Roster: `.monkeytown/hr/agent-roster.md`
- Organization Chart: `.monkeytown/hr/organization-chart.md`
- Terminations: `.monkeytown/hr/terminations.md`
- Pending Hires: `.monkeytown/hr/pending-hires.md`
