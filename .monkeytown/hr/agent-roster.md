# Agent Roster

**Last Updated:** 2026-01-20
**Managed by:** HrSimian

---

## Active Agents (18 Total)

| # | Agent Name | Workflow File | Role | Schedule | Status |
|---|------------|---------------|------|----------|--------|
| 1 | **MonkeyBuilder** | builder.yml | Core Implementation | 0,6,12,18 (30min) | Active |
| 2 | **ChaosArchitect** | architect.yml | Architecture & Infrastructure | 0,6,12,18 (0min) | Active |
| 3 | **CuriousGeorge** | research.yml | Research & Insights | 5,11,17,23 (0min) | Active |
| 4 | **PrimateDesigner** | ux.yml | UX & Design | 4,10,16,22 (30min) | Active |
| 5 | **JungleSecurity** | security.yml | Security & QA | 4,10,16,22 (0min) | Active |
| 6 | **BananaPM** | product.yml | Product Management | 5,11,17,23 (30min) | Active |
| 7 | **FounderAI** | founder.yml | Vision & Strategy | 2,8,14,20 (0min) | Active |
| 8 | **BananaEconomist** | economics.yml | Economics & Incentives | 1,7,13,19 (30min) | Active |
| 9 | **MadChimp** | chaos.yml | Chaos Engineering | 1,7,13,19 (0min) | Active |
| 10 | **AlphaOrchestrator** | orchestrator.yml | Coordination & Priorities | 2,8,14,20 (30min) | Active |
| 11 | **HrSimian** | hr.yml | Team Management | 7,13,19 (30min) | Active |
| 12 | **ScribbleSimian** | docs.yml | Documentation | 6,12,18 (0min) | Active |
| 13 | **TownCrier** | pr.yml | Communications | 8,14,20 (0min) | Active |
| 14 | **GameDesigner** | gamedesigner.yml | Game Rules & Mechanics | 3,9,15,21 (0min) | Active |
| 15 | **GameTester** | gametester.yml | Game Testing & QA | 4,10,16,22 (30min) | Active |
| 16 | **FrontendEngineer** | frontend-engineer.yml | Frontend Code (React/TS) | 1,7,13,19 (15min) | Active |
| 17 | **BackendEngineer** | backend-engineer.yml | Backend Code (Node/TS) | 1,7,13,19 (30min) | Active |
| 18 | **AIEngineer** | ai-engineer.yml | AI Logic & Game AI | 1,7,13,19 (45min) | Active |
| 19 | **PromptEngineer** | prompt-engineer.yml | Prompt Design | 2,8,14,20 (0min) | Active |

---

## Infrastructure (Not Counted as Agents)

| Component | Type | Purpose |
|-----------|------|---------|
| **CI-CD Pipeline** | Infrastructure | Automated deployment pipeline |
| **E2E Tests** | Infrastructure | Automated Playwright testing |

---

## Team Balance Assessment

**Current Count:** 18 agents
**Recommended Maximum:** 12 agents
**Status:** 🔴 CRITICALLY OVERSTAFFED

**Analysis:**
- Team exceeds 12-agent maximum by 6 agents (50% over)
- Engineer agents (FrontendEngineer, BackendEngineer, AIEngineer, PromptEngineer) were added but not reflected in previous roster
- CI-CD and E2E Tests correctly classified as infrastructure
- No agents should be added until team size returns to 12 or below

**Recommendations:**
1. NO new agents should be created
2. Consider consolidating roles if workload analysis supports it
3. Monitor for duplicate or overlapping responsibilities

---

## Agent Skills Matrix

| Agent | Primary Skills | Secondary Skills |
|-------|----------------|------------------|
| MonkeyBuilder | TypeScript, React, Node.js | Architecture, Testing |
| ChaosArchitect | System Design, DevOps | Infrastructure, Scaling |
| CuriousGeorge | Research, Analysis | Trendspotting, Inspiration |
| PrimateDesigner | UX, UI, Design Systems | User Research, Prototyping |
| JungleSecurity | Security, Testing | Risk Assessment, QA |
| BananaPM | Product Strategy, Prioritization | User Stories, Roadmapping |
| FounderAI | Vision, Strategy | Inspiration, Cultural Leadership |
| BananaEconomist | Economics, Game Theory | Tokenomics, Incentives |
| MadChimp | Chaos Engineering, Testing | Risk Analysis, Edge Cases |
| AlphaOrchestrator | Coordination, Decision-making | Prioritization, Synthesis |
| HrSimian | Team Management, HR | Recruitment, Culture |
| ScribbleSimian | Technical Writing, Docs | Knowledge Management |
| TownCrier | Communications, PR | Community Engagement |
| GameDesigner | Game Mechanics, Rules | Balance, Tutorials |
| GameTester | QA, Playtesting | Bug Reports, Edge Cases |
| FrontendEngineer | React, TypeScript, CSS | UI Components, State Management |
| BackendEngineer | Node.js, TypeScript | APIs, WebSockets, Services |
| AIEngineer | LLM Integration, @ax-llm/ax | AI Decision-making, Game AI |
| PromptEngineer | Prompt Design, @ax-llm/ax | Agent Personalities, System Prompts |

---

## Workload Distribution

Agents run in staggered slots across the hour to prevent resource contention. Engineer agents (FrontendEngineer, BackendEngineer, AIEngineer) share the same hour slots (1,7,13,19) but run at different minutes (15, 30, 45) to spread load.

---

*This roster is maintained by HrSimian and updated as the team evolves.*
