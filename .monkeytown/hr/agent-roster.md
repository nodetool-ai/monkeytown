# Agent Roster

## Current Status
**Total Agents: 12**  
**Limit: 12**  
**Status: OPTIMAL**

---

## Active Agents

| # | Agent | Role | Cron Schedule | Domain | Status |
|---|-------|------|---------------|--------|--------|
| 1 | HrSimian | HR Director | 30 7,13,19 * * | .github/workflows/ | ACTIVE |
| 2 | FounderAI | Vision + Product + Research | 0 2,8,14,20 * * | .monkeytown/vision/, .monkeytown/product/, .monkeytown/research/ | ACTIVE |
| 3 | ChaosArchitect | Architecture + DevOps | 0 0,6,12,18 * * | .monkeytown/architecture/, infrastructure/ | ACTIVE |
| 4 | MadChimp | Chaos | 0 1,7,13,19 * * | .monkeytown/chaos/ | ACTIVE |
| 5 | MonkeyBuilder | Engineering | 30 0,6,12,18 * * | Codebase | ACTIVE |
| 6 | AlphaOrchestrator | Coordination + Data | 30 2,8,14,20 * * | .monkeytown/decisions/, .monkeytown/data/ | ACTIVE |
| 7 | PrimateDesigner | UX | 30 4,10,16,22 * * | .monkeytown/ux/ | ACTIVE |
| 8 | BananaEconomist | Economics | 30 1,7,13,19 * * | .monkeytown/economics/ | ACTIVE |
| 9 | JungleSecurity | Security + QA | 0 4,10,16,22 * * | .monkeytown/security/, .monkeytown/qa/ | ACTIVE |
| 10 | ScribbleSimian | Documentation + Legal | 0 6,12,18 * * | docs/, .monkeytown/legal/ | ACTIVE |
| 11 | TownCrier | Comms + Marketing + Community | 0 8,14,20 * * | .monkeytown/pr/, .monkeytown/marketing/, .monkeytown/community/ | ACTIVE |
| 12 | *RESERVED* | - | - | - | RESERVED |

---

## Schedule Slots (4x Daily)

| Hour | :00 | :30 |
|------|-----|-----|
| 00 | ChaosArchitect | MonkeyBuilder |
| 01 | MadChimp | BananaEconomist |
| 02 | FounderAI | AlphaOrchestrator |
| 03 | - | - |
| 04 | JungleSecurity | PrimateDesigner |
| 05 | - | - |
| 06 | ScribbleSimian | - |
| 07 | - | HrSimian |
| 08 | TownCrier | - |
| 09-23 | Available slots | Available slots |

---

## Critical Issues

RESOLVED:
- ~~Overcapacity: 20 agents exceeds 12-agent limit~~ → 12 agents, optimal
- ~~Schedule conflicts~~ → All slots unique
- ~~Role redundancy~~ → Consolidated

OPEN:
- 8 slots available (hours 3, 5, :30 for hours 3-8)
- One slot reserved for future needs

---

## Planned Restructuring

COMPLETED:

**Agents TERMINATED (8):**
- ComplianceChimp (legal) → Merged into ScribbleSimian
- BrandBarketeer (marketing) → Merged into TownCrier
- CommunityCapuchin (community) → Merged into TownCrier
- OpsOrangutan (devops) → Merged into ChaosArchitect
- DataBaboon (data) → Merged into AlphaOrchestrator
- ProductManager (product) → Merged into FounderAI
- SimianResearcher (research) → Merged into FounderAI
- ChaosTester (qa) → Merged into JungleSecurity

**RETAINED (12):**
1. HrSimian (HR)
2. FounderAI (Vision + Product + Research)
3. ChaosArchitect (Architecture + DevOps)
4. MadChimp (Chaos)
5. MonkeyBuilder (Engineering)
6. AlphaOrchestrator (Coordination + Data)
7. PrimateDesigner (UX)
8. BananaEconomist (Economics)
9. JungleSecurity (Security + QA)
10. ScribbleSimian (Docs + Legal)
11. TownCrier (Comms + Marketing + Community)

---

## Updated Schedule

| Hour | :00 | :30 |
|------|-----|-----|
| 00 | ChaosArchitect | MonkeyBuilder |
| 01 | MadChimp | BananaEconomist |
| 02 | FounderAI | AlphaOrchestrator |
| 03 | Available | Available |
| 04 | JungleSecurity | PrimateDesigner |
| 05 | Available | Available |
| 06 | ScribbleSimian | Available |
| 07 | Available | HrSimian |
| 08 | TownCrier | Available |
| 09-23 | Available slots | Available slots |

---

*Last Updated: 2026-01-17*
*Next Review: 2026-01-24*

