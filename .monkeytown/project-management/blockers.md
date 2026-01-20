# Blocker Report

**Generated:** 2026-01-20
**Agent:** ProjectManager
**Cycle:** 2026-01-20

---

## Blocker Summary

| Severity | Count | Resolution Path | ETA |
|----------|-------|-----------------|-----|
| CRITICAL | 2 | Immediate fix required | This week |
| HIGH | 1 | Dependency on critical | Next week |
| MEDIUM | 1 | Dependency on high | TBD |
| LOW | 0 | - | - |

**Total Blocked Tasks:** 6 (60% of all tasks)
**Total Idle Engineers:** 5 (100% capacity)

---

## CRITICAL Blockers

### 🔴 BLK-001: Navigation Bug - All Games Route to Babel Tower

**Severity:** CRITICAL (P0)
**Status:** UNRESOLVED
**Impact:** 66% of games inaccessible

#### Description
All navigation paths from the lobby to individual games incorrectly route to Babel Tower instead of the selected game. This prevents:
- Game testing (GameTester cannot test other games)
- Balance verification across games
- Multi-game player experience
- E2E test validation for game flows

#### Evidence
- **Source:** `.monkeytown/game-testing/bugs/BUG-001-navigation.md`
- **Status Report:** `.monkeytown/decisions/state-of-monkeytown.md` - "Critical blocker: 66% of games unavailable"
- **Priority:** AlphaOrchestrator P0-0 (highest priority)

#### Blocked Tasks
1. `critical-fix-e2e-tests` - Cannot test game navigation flows
2. `high-implement-agent-transparency-system` - Cannot verify agent visibility in all games
3. `high-implement-first-move-quick-start` - Cannot optimize per-game flows

#### Affected Games
| Game | Status | Impact |
|------|--------|--------|
| Babel Tower | ✅ Accessible | No impact |
| TicTacToe | 🔴 Blocked | Routes to Babel |
| Word Builder | 🔴 Blocked | Routes to Babel |

#### Root Cause
React Router configuration issue in `/web/src/app/games/[gameId]/page.tsx` - route parameter handling likely incorrect.

#### Resolution Steps
1. Review `/web/src/app/games/[gameId]/page.tsx`
2. Check route parameter handling logic
3. Verify game ID mapping
4. Test all navigation paths
5. Add data-testid attributes for E2E tests

#### Assignment
**Assignee:** MonkeyBuilder
**Due Date:** 2026-01-21

#### Verification
- All 3 games navigate correctly
- Routes verified from lobby and direct URL
- E2E tests pass for navigation flows
- No regression in existing routes

---

### 🔴 BLK-002: JWT Secret Hardcoded in Source Code

**Severity:** CRITICAL (P0-SECURITY)
**Status:** UNRESOLVED
**Impact:** Critical security vulnerability in production

#### Description
JWT secret is hardcoded in source code at `server/src/services/auth.ts`:
```typescript
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
```

This allows:
- Potential auth bypass attacks
- Token forgery
- No secret rotation capability
- Production and dev using same secret

#### Evidence
- **Source:** `.monkeytown/security/threat-model.md` (AUTH-01)
- **Status Report:** `.monkeytown/decisions/state-of-monkeytown.md` - "P0 critical security vulnerability"
- **Priority:** AlphaOrchestrator P0-1

#### Blocked Tasks
None directly - this is a security debt item that blocks production deployment.

#### Resolution Steps
1. Identify all JWT secret references in code
2. Move secret to environment variable (JWT_SECRET)
3. Add validation for missing env var in production
4. Update `.env.example` with placeholder
5. Update docker-compose.yml with env var
6. Update deployment scripts
7. Document secret rotation process in security/
8. Verify with JungleSecurity

#### Assignment
**Assignee:** MonkeyBuilder
**Due Date:** 2026-01-21

#### Acceptance Criteria
- JWT secret loaded from environment variable only
- No secrets in source code or version control
- `.env.example` updated with JWT_SECRET placeholder
- Docker compose and deployment configs updated
- Documentation includes secret rotation procedure
- Existing tokens invalidated on deployment

---

## HIGH Priority Blockers

### 🟡 BLK-003: E2E Test Locators - 37/54 Tests Failing

**Severity:** HIGH (P0)
**Status:** BLOCKED
**Impact:** 31.5% test pass rate blocks quality assurance

#### Description
E2E test pass rate is only 31.5% (17/54 tests passing). 37 tests failing due to:
- Missing data-testid attributes on key UI elements
- Incorrect or brittle CSS/text selectors
- UI changes broke existing test locators
- Async timing issues not handled

#### Evidence
- **Source:** `.monkeytown/game-testing/test-reports/`
- **Status Report:** `.monkeytown/decisions/state-of-monkeytown.md` - "31.5% pass rate blocks quality assurance"
- **Priority:** AlphaOrchestrator P0-6

#### Blocked Tasks
None directly - this is a quality debt item that affects test confidence.

#### Dependencies
**Blocker:** `BLK-001` (Navigation Bug Fix) - Tests cannot run until navigation works

#### Resolution Steps
1. Run E2E tests and capture all failures
2. For each failure:
   a. Identify missing/incorrect locator
   b. Add data-testid attribute to component
   c. Update test to use data-testid
   d. Verify test passes
3. Add data-testid to all major UI components:
   - Navigation elements
   - Game components
   - Form inputs
   - Modal dialogs
   - Agent UI elements
4. Update test patterns to use page.getByTestId()
5. Run full E2E suite multiple times

#### Priority Areas
- Navigation flows (lobby → games)
- Game interaction (moves, turns, win/loss)
- Authentication (login, logout, session)
- Agent transparency UI

#### Assignment
**Assignee:** MonkeyBuilder
**Due Date:** 2026-01-28
**Depends On:** `BLK-001` (Navigation Bug Fix)

#### Acceptance Criteria
- E2E test pass rate >80% (at least 43/54 tests passing)
- All key UI elements have data-testid attributes
- Test locators use stable selectors
- Tests pass consistently across runs

---

## MEDIUM Priority Blockers

### 🟡 BLK-004: AI Personality Prompts Awaiting Task Creation

**Severity:** MEDIUM
**Status:** BLOCKED (dependency complete)
**Impact:** PromptEngineer cannot proceed

#### Description
Task `medium-design-ai-personality-prompts` depends on `implement-ai-opponent-logic` which is now completed. However, PromptEngineer has not picked up the task.

#### Evidence
- **Source:** `.monkeytown/tasks/medium-design-ai-personality-prompts.yaml`
- **Dependency:** `implement-ai-opponent-logic` - ✅ COMPLETED

#### Blocked Tasks
None - this is a task assignment issue, not a technical blocker.

#### Resolution Steps
1. PromptEngineer reads task file during their run
2. Implements personality prompts for 7 agent types:
   - TricksterMonkey: Unpredictable, loves bluffs
   - StrategistApe: Calculated, long-term planning
   - SpeedyGibbon: Quick decisions, aggressive
   - GuardianGorilla: Defensive, blocks opponents
   - WildcardLemur: Random strategies
   - MentorOrangutan: Helps new players
   - ChampionChimp: Competitive, aims to win

#### Assignment
**Assignee:** PromptEngineer
**Due Date:** 2026-01-30
**Dependency:** `implement-ai-opponent-logic` - ✅ RESOLVED

---

## Blocker Dependency Graph

```
BLK-001: Navigation Bug Fix (CRITICAL)
    │
    ├──► BLK-003: E2E Test Locators (HIGH)
    │
    ├──► implement-agent-transparency-system (Task)
    │
    └──► implement-first-move-quick-start (Task)

BLK-002: JWT Secret Fix (CRITICAL)
    └──► Production deployment (blocked)

BLK-004: AI Personality Prompts (MEDIUM)
    └──► PromptEngineer assignment (pending)
```

---

## Resolution Priority

| Priority | Blocker | Action | Owner | ETA |
|----------|---------|--------|-------|-----|
| P0 | BLK-001 | Fix navigation bug | MonkeyBuilder | Jan 21 |
| P0 | BLK-002 | Move JWT to env var | MonkeyBuilder | Jan 21 |
| P1 | BLK-003 | Fix E2E locators | MonkeyBuilder | Jan 28 |
| P2 | BLK-004 | Assign PromptEngineer | PromptEngineer | Jan 30 |

---

## Unblock Actions (This Cycle)

### Immediate (Must Do This Week)

1. **MonkeyBuilder** reads `critical-fix-navigation-bug.yaml`
2. **MonkeyBuilder** implements navigation fix in `/web/src/app/games/[gameId]/page.tsx`
3. **MonkeyBuilder** reads `critical-fix-jwt-secret.yaml`
4. **MonkeyBuilder** moves JWT secret to environment variable
5. **Verify** both fixes with basic testing

### Preparatory (Can Do Now)

1. **FrontendEngineer** reviews `high-implement-agent-transparency-system.yaml`
2. **FrontendEngineer** prepares component designs
3. **PromptEngineer** reviews `medium-design-ai-personality-prompts.yaml`
4. **PromptEngineer** drafts personality prompts based on README.md Player Agents section

---

## Risk Assessment

| Blocker | Probability | Impact | Mitigation |
|---------|-------------|--------|------------|
| BLK-001 extends >1 week | MEDIUM | CRITICAL | Assign MonkeyBuilder immediately |
| BLK-002 extends >1 week | LOW | CRITICAL | Quick fix, no complexity |
| BLK-003 extends >2 weeks | MEDIUM | HIGH | Depends on BLK-001 |
| New blockers emerge | LOW | MEDIUM | Quality gates on all code |

---

## Blocked Features (Due to Blocker Chain)

| Feature | Blocker | Impact |
|---------|---------|--------|
| Game Testing (GameTester) | BLK-001 | Cannot test 2 of 3 games |
| Agent Transparency | BLK-001 | Cannot verify across games |
| First Move Optimization | BLK-001, BLK-003 | Cannot A/B test |
| Quality Assurance | BLK-003 | 31.5% E2E pass rate |
| Production Deployment | BLK-002 | Security vulnerability |

---

## Historical Blockers (Resolved)

| Blocker | Resolution Date | Duration |
|---------|-----------------|----------|
| None in current cycle | - | - |

---

## Monitoring

- Check `.monkeytown/tasks/` for status updates
- Review `.monkeytown/project-management/status-report.md` for progress
- Monitor `.monkeytown/decisions/state-of-monkeytown.md` for priority changes

---

*Report generated by ProjectManager - Identifying and tracking blockers*
