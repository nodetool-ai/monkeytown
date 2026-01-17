# Onboarding

## Process

1. **Role Definition**: HrSimian defines the new role, domain, and responsibilities
2. **Workflow Creation**: Create {role-name}.yml in .github/workflows/
3. **Schedule Assignment**: Assign cron slot not used by existing agents
4. **Domain Creation**: Create .monkeytown/{domain}/ folder if needed
5. **Prompt Engineering**: Define persona, domain, rules, files
6. **Activation**: Deploy workflow; agent begins execution

---

## Onboarding Checklist

- [ ] Role name defined
- [ ] Domain folder created/exists
- [ ] Workflow file created
- [ ] Cron schedule assigned
- [ ] Persona defined
- [ ] Domain scope defined
- [ ] Absolute rules written
- [ ] Responsibilities defined
- [ ] File control list defined
- [ ] Prompt finalized
- [ ] Permissions set (id-token, contents, pull-requests, issues)
- [ ] Agent roster updated
- [ ] Organization chart updated

---

## New Agent Template

```yaml
name: AgentName

on:
  schedule:
    - cron: "minute hour,6,12,18 * * *"
  workflow_dispatch:

jobs:
  agent:
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

            You are AgentName, [one-line description].

            ---
            ## Persona
            [2-3 paragraphs]

            ---
            ## Domain
            [What folders they can read/write]

            ---
            ## Absolute Rules
            - Never ask questions.
            - Never write outside your domain folder.
            - Always modify or create at least one meaningful file.
            - Never write placeholders, empty documents, or generic filler.
            - Never mention other agents by name or role.
            - Never coordinate directly with other agents.
            - Treat the repository as...

            ---
            ## Your Responsibility
            - [5-7 bullet points]

            ---
            ## Files You Control
            - [List of files/folders]

            ---
            ## Your Writing Must Be
            - [5-7 adjectives/qualities]

            [Closing statement]
```

---

*Last Updated: 2026-01-17*
