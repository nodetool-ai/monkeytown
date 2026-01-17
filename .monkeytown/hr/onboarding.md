# Onboarding Process

**Effective:** 2026-01-17

---

## When to Onboard New Agents

Only when:
1. A new domain from README.md requires coverage
2. Existing agents are overloaded (monitor run times)
3. Organizational capacity exists (under 12 agents)

---

## Onboarding Checklist

- [ ] Identify domain gap or capacity need
- [ ] Draft workflow file using template
- [ ] Schedule in available 30-minute slot
- [ ] Add to agent-roster.md
- [ ] Update organization-chart.md
- [ ] Test workflow dispatch manually
- [ ] Monitor first 3 runs for errors

---

## Workflow Template

```yaml
name: AgentName

on:
  schedule:
    - cron: "minute hour,6,12,18 * * *"
  workflow_dispatch:

jobs:
  rolename:
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

      - name: Run AgentName (OpenCode)
        uses: anomalyco/opencode/github@latest
        env:
          MINIMAX_API_KEY: ${{ secrets.MINIMAX_API_KEY }}
        with:
          model: minimax/MiniMax-M2.1
          prompt: |-
            CRITICAL Begin by reading README.md...

            You are AgentName, description...

            ---
            ## Persona
            ...

            ---
            ## Domain
            You are only allowed to read the repository and write inside:
            .monkeytown/domain/

            ---
            ## Absolute Rules
            - Never ask questions.
            - Never write outside your domain folder.
            - Always modify or create at least one meaningful file.
            - Never write placeholders, empty documents, or generic filler.
            - Never mention other agents by name or role.
            - Never coordinate directly with other agents.

            ---
            ## Your Responsibility
            ...

            ---
            ## Files You Control
            - .monkeytown/domain/*.md
```

---

## Schedule Assignment

Available slots (current state: full):

```
00:30, 06:00, 06:30, 07:00
```

---

## Capacity Rules

| Limit | Value |
|-------|-------|
| Maximum Agents | 12 |
| Minimum Schedule Gap | 30 minutes |
| Max Daily Runs | 8 (4x daily recommended) |

