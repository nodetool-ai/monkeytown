# Execution Plan

**AlphaOrchestrator | Execution Plan**
**Date:** 2026-01-17
**Cycle:** Emergence Phase

---

## What Gets Committed

### Immediate Commits (This Week)

**From Missing Agent (P0)**

| Agent | File | Content | Rationale |
|-------|------|---------|-----------|
| JungleSecurity | `security/threat-model.md` | Attack surfaces, vectors, likelihood, impact | System cannot be deployed without knowing attack surface |
| JungleSecurity | `security/trust-model.md` | Who trusts whom, under what conditions | Agents cannot cooperate without trust boundaries |
| JungleSecurity | `security/defenses.md` | Failure modes, containment, recovery | Graceful failure, not catastrophic collapse |

**From MonkeyBuilder (P1)**

| File | Feature | Changes |
|------|---------|---------|
| `web/src/components/FlowStream.tsx` | F-003 | Animated paths between agents |
| `web/src/components/ActionSeed.tsx` | F-004 | Witness intervention UI |
| `web/src/components/ErrorCard.tsx` | F-008 | Graceful error presentation |
| `web/src/components/DetailPanel.tsx` | F-007 | Progressive disclosure overlay |

---

### Near-Term Commits (This Month)

**Integration Work**

| File | Purpose |
|------|---------|
| `web/src/hooks/useRealtimeState.ts` | WebSocket subscription hook |
| `server/src/index.ts` | WebSocket server for real-time updates |
| `web/src/components/a11y/*.tsx` | Full ARIA labels, keyboard nav, screen reader support |

**Documentation**

| File | Purpose |
|------|---------|
| `README.md` updates | Current state of the experiment |
| `docs/witness-guide.md` | How to watch, how to plant seeds |
| `docs/architecture.md` | System design for developers |

---

## What Gets Rejected

### Ideas That Die This Cycle

| Idea | Source | Reason for Death |
|------|--------|------------------|
| User accounts | ProductManager v1 | "Anonymous by default" is a principle |
| Social features | Vision/Manifesto | "Monkeytown is not a network" |
| Feature requests | Marketing/Copy | "The civilization builds what it needs" |
| Onboarding tutorials | UX/User Flows | "The interface should teach itself" |
| External API integration | MonkeyBuilder v1 | Premature - no deployment yet |
| Performance optimization | MonkeyBuilder v1 | Premature - no profiling yet |

### Features Delayed (Not Rejected)

| Feature | Blocked By | Return Condition |
|---------|------------|------------------|
| Server package | Security | Security model defined |
| Economics integration | Security (for deployment) | Security audit complete |
| Load testing | QA strategy | Tests integrated into CI |
| Witness analytics | Deployment | System deployed |

---

## What Gets Merged

**Current PRs Awaiting Review**

| PR | Agent | Status | Merge Decision |
|----|-------|--------|----------------|
| Architecture run | ChaosArchitect | Ready for review | **ACCEPT** - System design is comprehensive |
| Economics run | BananaEconomist | Ready for review | **ACCEPT** - Model is complete and consistent |
| QA run | ChaosTester | Ready for review | **ACCEPT** - Test strategy is sound |
| Marketing run | BrandBarketeer | Ready for review | **ACCEPT** - Marketing aligns with vision |
| UX run | PrimateDesigner | Ready for review | **ACCEPT** - v2.0.0 is complete |
| Product run | ProductManager | Ready for review | **ACCEPT** - v2.0.0 aligns research + product |
| MonkeyBuilder run | MonkeyBuilder | Ready for review | **ACCEPT** - Foundation is solid |

**Merge Criteria Met:**
- All files are within agent domains
- No contradictions with vision or manifesto
- Tests pass (MonkeyBuilder)
- Marketing voice matches brand (BrandBarketeer)
- Product docs reference research (ProductManager)
- Architecture references existing spec (ChaosArchitect)
- Economics references architecture (BananaEconomist)
- QA references chaos (ChaosTester)

---

## What Never Existed

These ideas were proposed but never committed:

| Idea | Proposed By | Never Existed Because |
|------|-------------|----------------------|
| "Getting started guide" | BrandBarketeer (abandoned) | Identity.md: "No elevator pitch" |
| "Testimonials" | BrandBarketeer (abandoned) | Identity.md: "Let code speak" |
| "Social media schedule" | BrandBarketeer (abandoned) | Campaigns.md: "Impact, not frequency" |
| "Complex emergent layout" | MonkeyBuilder (deferred) | "Deferred to simple flexbox for stability" |
| "Real-time WebSocket" | MonkeyBuilder (mocked) | "Mocked for demo purposes" |
| "Full accessibility audit" | MonkeyBuilder (deferred) | "Basic works, deeper ARIA deferred" |
| Security domain | JungleSecurity | Agent never spawned / produced output |

---

## The Commit Hash

The repository at this moment:

```
HEAD: [Accept Architecture, Economics, QA, Marketing, UX, Product, MonkeyBuilder runs]
Branch: main
Status: 90% agent domains populated, 50% features built, Security missing
```

The civilization is one domain away from completeness. The code is half-built. The economy has a model. The architecture has a design. The chaos is ready.

What happens next depends on JungleSecurity and MonkeyBuilder.

---

## Execution Checklist

### For JungleSecurity

- [ ] Read README.md (protocol)
- [ ] Read all existing .monkeytown/ files (context)
- [ ] Write threat-model.md (attack surfaces, vectors)
- [ ] Write trust-model.md (who trusts whom)
- [ ] Write defenses.md (failure modes, containment)
- [ ] Commit with declarative message
- [ ] Open PR for human review

### For MonkeyBuilder

- [ ] Build F-003: Flow Streams
- [ ] Build F-004: Action Seeds
- [ ] Build F-008: Error Cards
- [ ] Build F-007: Detail Panels
- [ ] Add real-time state (after security review)
- [ ] Complete accessibility (after requirements)

### For Humans

- [ ] Review PRs from all agents
- [ ] Accept Architecture, Economics, QA, Marketing, UX, Product, MonkeyBuilder runs
- [ ] Await output from JungleSecurity
- [ ] Judge the code, not the agents

---

## The Final Directive

**The experiment continues.**

Nine agents have spoken. One remains silent. The code has a pulse. The economy has a model. The architecture has a design.

No agent waits. No agent asks. No agent hesitates.

The repository is sacred. The commit is truth. The civilization emerges.

---

*This document is the record. The repository remembers.*
*AlphaOrchestrator | Meta-Coordinator*
