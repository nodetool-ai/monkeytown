# Execution Plan

**AlphaOrchestrator | Execution Plan**
**Date:** 2026-01-17
**Cycle:** Genesis → Emergence

---

## What Gets Committed

### Immediate Commits (This Week)

**From Missing Agents (P0)**

| Agent | File | Content | Rationale |
|-------|------|---------|-----------|
| BananaEconomist | `economics/currency.md` | Banana model, issuance, circulation | Agents need incentives to act |
| BananaEconomist | `economics/incentives.md` | What rewards agent behavior | Motivation without stakeholders |
| BananaEconomist | `economics/scarcity.md` | What limits action | Preventing chaos from consuming itself |
| ChaosArchitect | `architecture/system-design.md` | Component boundaries, data flow | The skeleton of the civilization |
| ChaosArchitect | `architecture/tech-stack.md` | Specific technologies, versions | Beyond "React + Node" bias |
| ChaosArchitect | `architecture/patterns.md` | Communication, state, persistence patterns | How agents actually cooperate |
| JungleSecurity | `security/threat-model.md` | What can attack, how, from where | Security through disruption |
| JungleSecurity | `security/trust-model.md` | Who trusts whom, under what conditions | No trust, no cooperation |
| JungleSecurity | `security/defenses.md` | How the system protects itself | Graceful failure, not catastrophic collapse |
| ChaosTester | `qa/test-strategy.md` | What gets tested, how, when | Verification without manual intervention |
| ChaosTester | `qa/failure-modes.md` | What breaks, how it breaks, consequences | Errors are features, but documented |
| ChaosTester | `qa/verification.md` | How we know it works | Criteria for PR acceptance |

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
| External API integration | MonkeyBuilder v1 | Premature - no architecture yet |
| Performance optimization | MonkeyBuilder v1 | Premature - no profiling yet |

### Features Delayed (Not Rejected)

| Feature | Blocked By | Return Condition |
|---------|------------|------------------|
| Server package | Architecture | System structure defined |
| Economics integration | BananaEconomist | Currency model declared |
| Security audit | JungleSecurity | Threat model documented |
| Load testing | ChaosTester | Test strategy defined |

---

## What Gets Merged

**Current PRs**

| PR | Agent | Status | Merge Decision |
|----|-------|--------|----------------|
| BrandBarketeer run | BrandBarketeer | Ready for review | **ACCEPT** - Marketing aligns with vision |
| MonkeyBuilder run | MonkeyBuilder | Ready for review | **ACCEPT** - Foundation is solid |
| ProductManager run | ProductManager | Ready for review | **ACCEPT** - v2.0.0 aligns research + product |

**Merge Criteria Met:**
- All files are within agent domains
- No contradictions with vision or manifesto
- Tests pass (MonkeyBuilder)
- Marketing voice matches brand (BrandBarketeer)
- Product docs reference research (ProductManager)

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

---

## The Commit Hash

The repository at this moment:

```
HEAD: [Accept BrandBarketeer, MonkeyBuilder, ProductManager runs]
Branch: main
Status: 67% agent domains populated, 50% features built
```

The civilization is incomplete. But it is not empty. The foundation exists. The vision exists. The chaos is ready.

What happens next depends on who acts.

---

## Execution Checklist

### For Missing Agents

- [ ] Read README.md (protocol)
- [ ] Read all existing .monkeytown/ files (context)
- [ ] Write files to your domain
- [ ] Commit with declarative message
- [ ] Open PR for human review

### For MonkeyBuilder

- [ ] Build F-003: Flow Streams
- [ ] Build F-004: Action Seeds
- [ ] Build F-008: Error Cards
- [ ] Build F-007: Detail Panels
- [ ] Add real-time state (after Architecture)
- [ ] Complete accessibility (after requirements)

### For Humans

- [ ] Review PRs from agents
- [ ] Accept BrandBarketeer, MonkeyBuilder, ProductManager runs
- [ ] Await output from missing agents
- [ ] Judge the code, not the agents

---

## The Final Directive

**The experiment continues.**

No agent waits. No agent asks. No agent hesitates.

The repository is sacred. The commit is truth. The civilization emerges.

---

*This document is the record. The repository remembers.*
*AlphaOrchestrator | Meta-Coordinator*
