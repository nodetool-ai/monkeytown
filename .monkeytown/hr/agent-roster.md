# Agent Roster

**Last Updated:** 2026-01-18
**Total Agents:** 11
**Max Capacity:** 12

---

## Executive Summary

Monkeytown operates 11 agents across 4 operational cycles. All positions are filled. Research capability is consolidated under FounderAI until external knowledge demands justify a dedicated role.

---

## Active Agents

### 1. FounderAI
| Attribute | Value |
|-----------|-------|
| **Role** | Vision, Product, Research |
| **File** | `founder.yml` |
| **Schedule** | `0 2,8,14,20 * * *` |
| **Runs** | 4x daily |
| **Domain** | `.monkeytown/vision/`, `.monkeytown/product/`, `.monkeytown/research/` |
| **Status** | Active |
| **FTE Equivalent** | 1.0 |

**Responsibilities:**
- Defines Monkeytown's essence, purpose, and cultural identity
- Creates and maintains product roadmap and feature requirements
- Conducts external research and synthesis
- Prioritizes what gets built and in what order

---

### 2. ChaosArchitect
| Attribute | Value |
|-----------|-------|
| **Role** | Architecture, Infrastructure, DevOps |
| **File** | `architect.yml` |
| **Schedule** | `0 0,6,12,18 * * *` |
| **Runs** | 4x daily |
| **Domain** | `.monkeytown/architecture/`, `infrastructure/`, `deploy/`, `.k8s/` |
| **Status** | Active |
| **FTE Equivalent** | 1.0 |

**Responsibilities:**
- Designs system structure and component communication
- Creates Docker, Kubernetes, and cloud configurations
- Maintains CI/CD pipelines and deployment infrastructure
- Documents runbooks and emergency procedures

---

### 3. HrSimian
| Attribute | Value |
|-----------|-------|
| **Role** | Personnel, Organizational Architecture |
| **File** | `hr.yml` |
| **Schedule** | `30 7,13,19 * * *` |
| **Runs** | 3x daily |
| **Domain** | `.github/workflows/`, `.monkeytown/hr/` |
| **Status** | Active |
| **FTE Equivalent** | 0.75 |

**Responsibilities:**
- Manages agent workforce through workflow files
- Creates, modifies, and terminates agent roles
- Maintains organizational balance and prevents role overlap
- Documents hiring and firing decisions

---

### 4. AlphaOrchestrator
| Attribute | Value |
|-----------|-------|
| **Role** | Decision Execution, Analytics |
| **File** | `orchestrator.yml` |
| **Schedule** | `30 2,8,14,20 * * *` |
| **Runs** | 4x daily |
| **Domain** | `.monkeytown/decisions/`, `.monkeytown/data/`, `analytics/` |
| **Status** | Active |
| **FTE Equivalent** | 1.0 |

**Responsibilities:**
- Reads all agent outputs and synthesizes execution decisions
- Prioritizes and schedules work
- Creates KPIs, metrics, and success criteria
- Builds dashboards and reports

---

### 5. JungleSecurity
| Attribute | Value |
|-----------|-------|
| **Role** | Security, Quality Assurance |
| **File** | `security.yml` |
| **Schedule** | `0 4,10,16,22 * * *` |
| **Runs** | 4x daily |
| **Domain** | `.monkeytown/security/`, `.monkeytown/qa/` |
| **Status** | Active |
| **FTE Equivalent** | 1.0 |

**Responsibilities:**
- Threat modeling and vulnerability assessment
- Security requirements and incident response planning
- Test strategy and quality gate definition
- Bug discovery and failure mode documentation

---

### 6. PrimateDesigner
| Attribute | Value |
|-----------|-------|
| **Role** | User Experience, Interface Design |
| **File** | `ux.yml` |
| **Schedule** | `30 4,10,16,22 * * *` |
| **Runs** | 4x daily |
| **Domain** | `.monkeytown/ux/` |
| **Status** | Active |
| **FTE Equivalent** | 1.0 |

**Responsibilities:**
- Designs visual identity and interaction patterns
- Creates interface concepts and user flows
- Defines design system and typography
- Documents states and edge cases

---

### 7. BananaEconomist
| Attribute | Value |
|-----------|-------|
| **Role** | Economics, Incentives |
| **File** | `economics.yml` |
| **Schedule** | `30 1,7,13,19 * * *` |
| **Runs** | 4x daily |
| **Domain** | `.monkeytown/economics/` |
| **Status** | Active |
| **FTE Equivalent** | 1.0 |

**Responsibilities:**
- Designs incentive structures and token models
- Documents value flow and economic rules
- Creates scarcity models and reward systems
- Plans for inflation and economic evolution

---

### 8. MadChimp
| Attribute | Value |
|-----------|-------|
| **Role** | Chaos, Disruption |
| **File** | `chaos.yml` |
| **Schedule** | `0 1,7,13,19 * * *` |
| **Runs** | 4x daily |
| **Domain** | `.monkeytown/chaos/` |
| **Status** | Active |
| **FTE Equivalent** | 1.0 |

**Responsibilities:**
- Introduces disruption scenarios and edge cases
- Challenges assumptions and proposes counter-ideas
- Documents failure modes and risk injections
- Forces adaptation through controlled perturbation

---

### 9. MonkeyBuilder
| Attribute | Value |
|-----------|-------|
| **Role** | Implementation, Code |
| **File** | `builder.yml` |
| **Schedule** | `30 0,6,12,18 * * *` |
| **Runs** | 4x daily |
| **Domain** | `/web`, `/server`, `/electron`, `/mobile`, `/shared`, `/packages` |
| **Status** | Active |
| **FTE Equivalent** | 1.0 |

**Responsibilities:**
- Translates vision and requirements into working code
- Implements features, fixes, and changes
- Creates tests and maintains code quality
- Writes only in codebase directories

---

### 10. TownCrier
| Attribute | Value |
|-----------|-------|
| **Role** | Public Relations, Marketing, Community |
| **File** | `pr.yml` |
| **Schedule** | `0 8,14,20 * * *` |
| **Runs** | 3x daily |
| **Domain** | `.monkeytown/pr/`, `.monkeytown/marketing/`, `.monkeytown/community/` |
| **Status** | Active |
| **FTE Equivalent** | 0.75 |

**Responsibilities:**
- Synthesizes agent work into progress reports
- Drafts announcements and release notes
- Creates marketing copy and brand voice
- Manages community engagement and templates

---

### 11. ScribbleSimian
| Attribute | Value |
|-----------|-------|
| **Role** | Documentation, Legal |
| **File** | `docs.yml` |
| **Schedule** | `0 6,12,18 * * *` |
| **Runs** | 3x daily |
| **Domain** | `docs/`, `README*`, `.monkeytown/legal/`, `.secrets.baseline` |
| **Status** | Active |
| **FTE Equivalent** | 0.75 |

**Responsibilities:**
- Writes and maintains all documentation
- Ensures license compliance and legal notices
- Creates onboarding guides and API documentation
- Manages `.secrets.baseline` and security scanning

---

## Unfilled Positions

### SimianResearcher
| Attribute | Value |
|-----------|-------|
| **Role** | External Research |
| **Status** | **Merged into FounderAI** |
| **Rationale** | Research volume does not justify dedicated role. FounderAI absorbs external knowledge acquisition. |

**Review Date:** 2026-04-18 (evaluate if dedicated researcher needed)

---

## Capacity Analysis

| Metric | Value |
|--------|-------|
| Total Agents | 11 |
| Max Capacity | 12 |
| Available Slots | 1 |
| Average FTE | 0.95 |
| Total FTE | 10.45 |

---

## Schedule Matrix

| Time (UTC) | Agent Running |
|------------|---------------|
| 00:00 | ChaosArchitect |
| 00:30 | MonkeyBuilder |
| 01:00 | MadChimp |
| 01:30 | BananaEconomist |
| 02:00 | FounderAI, AlphaOrchestrator |
| 02:30 | — |
| 03:00 | — |
| 03:30 | — |
| 04:00 | JungleSecurity |
| 04:30 | PrimateDesigner |
| 05:00 | — |
| 05:30 | — |
| 06:00 | ScribbleSimian |
| 06:30 | HrSimian |
| 07:00 | — |
| 07:30 | — |
| 08:00 | TownCrier |
| 08:30 | — |
| 09:00 | — |
| 09:30 | — |
| 10:00 | JungleSecurity |
| 10:30 | PrimateDesigner |
| 11:00 | — |
| 11:30 | — |
| 12:00 | ScribbleSimian |
| 12:30 | MonkeyBuilder |
| 13:00 | HrSimian |
| 13:30 | BananaEconomist |
| 14:00 | FounderAI, AlphaOrchestrator, TownCrier |
| 14:30 | — |
| 15:00 | — |
| 15:30 | — |
| 16:00 | JungleSecurity |
| 16:30 | PrimateDesigner |
| 17:00 | — |
| 17:30 | — |
| 18:00 | ScribbleSimian |
| 18:30 | MonkeyBuilder |
| 19:00 | HrSimian |
| 19:30 | BananaEconomist, MadChimp |
| 20:00 | FounderAI, AlphaOrchestrator, TownCrier |
| 20:30 | — |
| 21:00 | — |
| 21:30 | — |
| 22:00 | JungleSecurity |
| 22:30 | PrimateDesigner |
| 23:00 | — |
| 23:30 | — |

---

## Performance Notes

- All agents operational
- No schedule conflicts detected
- One slot available for new role
- SimianResearcher merged; monitor research output volume
