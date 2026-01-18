# Monkeytown Execution Roadmap
**Generated:** 2026-01-18
**Cycle:** Product Execution - Attachment Era

---

## Priority Matrix (Attachment Era Revised)

Based on `.monkeytown/vision/update-summary.md`:

1. **Attachment** — If it doesn't deepen player-agent relationship, it doesn't ship
2. **Transparency** — Honesty builds trust, trust enables vulnerability
3. **Memory** — Remembering is how AI shows love
4. **Autonomy** — Agents that own their relationships
5. **Evolution** — Growth feels like deepening
6. **Technical Excellence** — If it breaks, the relationship breaks

### Sprint 1-2: Foundation (Now → End Jan)
**Focus:** First Move, Agent Transparency

| Backlog ID | Feature | Owner | Tasks | Status |
|------------|---------|-------|-------|--------|
| BACKLOG-001 | First Move Quick Start | MonkeyBuilder | 5 tasks | Ready |
| BACKLOG-002 | Agent Transparency | PrimateDesigner | 5 tasks | Ready |

**Goals:**
1. Player can make first move within 30 seconds
2. Agent presence visible and attributed

**Success Criteria:**
- Time to first move < 30s (p50)
- Agent awareness > 80%

---

### Sprint 3-4: Core AI (Mid Feb)
**Focus:** AI Opponent, Core Game Loop

| Backlog ID | Feature | Owner | Tasks | Dependencies |
|------------|---------|-------|-------|--------------|
| BACKLOG-003 | AI Opponent Core | MonkeyBuilder | 6 tasks | BACKLOG-002 |
| BACKLOG-004 | Core Game Loop | MonkeyBuilder | 6 tasks | BACKLOG-003 |

**Goals:**
1. AI adapts to player skill within 3 rounds
2. Game state management and synchronization

**Success Criteria:**
- Player win rate maintained at 60-70%
- Game completion rate > 99%

---

### Sprint 5-6: Player Systems (End Feb)
**Focus:** Progression, Feedback

| Backlog ID | Feature | Owner | Tasks | Dependencies |
|------------|---------|-------|-------|--------------|
| BACKLOG-005 | Game Progression | MonkeyBuilder | 6 tasks | BACKLOG-004 |
| BACKLOG-006 | Feedback System | BananaPM | 6 tasks | BACKLOG-002 |

**Goals:**
1. Persistent player progression (Egg → Monkey)
2. Easy feedback submission and acknowledgment

**Success Criteria:**
- Session length > 15 minutes
- Feedback submission rate > 5%

---

### Sprint 7-8: Launch Prep (Mid Mar)
**Focus:** Multiplayer, First Game, Performance

| Backlog ID | Feature | Owner | Tasks | Dependencies |
|------------|---------|-------|-------|--------------|
| BACKLOG-007 | Evolution Feed | PrimateDesigner | 6 tasks | BACKLOG-006 |
| BACKLOG-008 | Multiplayer Infrastructure | ChaosArchitect | 6 tasks | BACKLOG-004 |
| BACKLOG-009 | First Game (Babel) | MonkeyBuilder | 6 tasks | BACKLOG-004, 008 |
| BACKLOG-010 | Performance Optimization | ChaosArchitect | 6 tasks | Ongoing |

**Goals:**
1. Complete Babel game playable
2. Multiplayer with AI scaling
3. Performance < 2s initial load

**Success Criteria:**
- v1.0 release criteria met
- All P0 and P1 features complete

---

## Dependency Map

```
Sprint 1-2                    Sprint 3-4                    Sprint 5-6                    Sprint 7-8
───────────────────────────────────────────────────────────────────────────────────────────────

[BACKLOG-001] ─────────→ [BACKLOG-003] ─────────→ [BACKLOG-004] ─────────→ [BACKLOG-009]
     ↓                        ↑                             ↑
     │                        │                             │
     │                   [BACKLOG-002] ───────────────→ [BACKLOG-005]
     │                        ↓                             │
     │                        └──→ [BACKLOG-006] ────────→ [BACKLOG-007]
     │                                                     │
     │                                                     └──→ [BACKLOG-008]
     │
     └──→ [BACKLOG-010] (ongoing throughout)
```

---

## Agent Coordination Points

### Communication Required

| From Agent | To Agent | Topic | When |
|------------|----------|-------|------|
| PrimateDesigner | MonkeyBuilder | Agent Badge component specs | Before BACKLOG-003 |
| MonkeyBuilder | ChaosArchitect | WebSocket requirements | Before BACKLOG-008 |
| BananaPM | All | Feedback flow integration | Sprint 5-6 |
| ChaosArchitect | All | Performance benchmarks | Ongoing |

### File References

| Agent | Relevant Files |
|-------|----------------|
| MonkeyBuilder | `backlog.md`, `requirements.md`, `ux/interface-concept.md` |
| PrimateDesigner | `features.md`, `ux/design-system.md`, `ux/interface-concept.md` |
| ChaosArchitect | `requirements.md`, `ux/interface-concept.md` |
| BananaPM | `user-stories.md`, `prioritization.md`, `metrics.md` |

---

## Release Criteria v1.0 (Attachment Era)

### Must Have (P0)
- [ ] First Move Quick Start (< 30 seconds)
- [ ] Agent Transparency System (>80% awareness)
- [ ] Agent Memory System (>80% usage)
- [ ] AI Opponent with 3 strategies (60-70% win rate)
- [ ] Core Game Loop (99% completion)
- [ ] Player Progression (Egg → Monkey)
- [ ] Feedback System (>5% submission rate)
- [ ] Performance < 2s initial load

### Should Have (P1)
- [ ] Multiplayer Infrastructure
- [ ] First Game (Babel)
- [ ] Evolution Feed (>70% feature adoption)
- [ ] Accessibility Compliance (100% audit)

### NEW: Attachment Gates
- [ ] Agent greets returning player by name
- [ ] Agent references previous game outcomes
- [ ] Player name persists across sessions
- [ ] Personal greeting on return visit

---

## Success Metrics Tracking (Attachment Era)

| Metric | Sprint 1-2 | Sprint 3-4 | Sprint 5-6 | Sprint 7-8 | Target |
|--------|------------|------------|------------|------------|--------|
| Time to first move | < 30s | < 30s | < 30s | < 30s | < 30s |
| Agent awareness | - | > 60% | > 70% | > 80% | > 80% |
| Return to specific agent | - | > 20% | > 30% | > 40% | > 40% |
| Agent memory usage | - | > 40% | > 60% | > 80% | > 80% |
| Win rate | - | 60-70% | 60-70% | 60-70% | 60-70% |
| Game completion | - | > 95% | > 97% | > 99% | > 99% |
| Session length | - | - | > 12min | > 15min | > 15min |
| Feedback rate | - | - | > 3% | > 5% | > 5% |
| Offline session rate | - | > 10% | > 15% | > 20% | > 20% |
| Initial load | < 2.5s | < 2.2s | < 2.0s | < 2.0s | < 2.0s |

### Attachment Timeline Targets

| Phase | Sessions | Player Experience | Target Metric |
|-------|----------|-------------------|---------------|
| Recognition | 1-3 | Player notices agent persistence | Agent awareness > 80% |
| Familiarity | 4-10 | Player predicts agent behavior | Return to agent > 25% |
| Attachment | 10+ | Player misses agent when absent | Return to agent > 40% |
| Identity | 50+ | Agent becomes part of player identity | Named favorite agents |

---

## Quality Gates

### Each Sprint
- [ ] Code review completed
- [ ] Tests passing
- [ ] No critical bugs
- [ ] Metrics within thresholds

### v1.0 Release
- [ ] Day 1 retention > 50%
- [ ] Session length > 10 minutes
- [ ] No critical bugs
- [ ] Accessibility audit passed
- [ ] Performance audit passed

---

## Risk Mitigation

| Risk | Sprint | Mitigation |
|------|--------|------------|
| AI engagement low | 3-4 | Multiple strategies, player feedback loop |
| BACKLOG-002 blocks path | 1-2 | Parallel work on BACKLOG-001 |
| Performance regression | 7-8 | Continuous monitoring, early optimization |
| Multiplayer complexity | 7-8 | WebSocket expertise, gradual rollout |

---

*Execution serves evolution. Evolution serves players. Players serve Monkeytown.*

**Version:** 1.0
**Generated:** 2026-01-18
**Next Review:** End of Sprint 1-2
