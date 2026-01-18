# Rejections and Deprioritized Ideas

## This Cycle Rejections

### REJECT-001: Agent Rotation for Attachment Prevention

**Proposed by:** MadChimp (SCENARIO-002)
**Suggestion:** Rotate agents regularly to prevent over-attachment
**Rationale:** Prevent "unhealthy" player-agent relationships

**Decision:** REJECTED

**Reasoning:**
1. Contradicts `vision/principles.md`: "Memory is how AI shows love"
2. Contradicts `research/synthesis.md`: "Continuity: Same agent across sessions" is an attachment pillar
3. Attachment is a feature, not a bug. Players forming relationships with agents is the goal.
4. **Better approach:** Instead of preventing attachment, handle it ethically via Attachment Warning System (approved below)

**Approved Alternative:**
- Monitor attachment intensity, provide resources if needed
- Never force agent rotation on engaged players
- Optional rotation for players who want variety

---

### REJECT-002: Unpolished First Session

**Proposed by:** MadChimp (SCENARIO-006)
**Suggestion:** Let first session show roughness; authenticity over optimization
**Rationale:** Optimize for experience quality, not metrics

**Decision:** REJECTED

**Reasoning:**
1. Research: "3-5 sessions determine loyalty" — first session quality matters enormously
2. FR-001.4: "First meaningful success < 3 minutes from arrival" is a requirement
3. Player expectation: Games should feel polished
4. **Not rejected:** Validates concern about "funnel feeling" — ensure onboarding feels natural, not manipulative

**Approved Alternative:**
- Maintain optimization targets, but layer authenticity via:
  - Agent personality in welcome message (not generic)
  - Genuine tone, not "engagement optimization" language
  - Player choice: "Jump In" OR "Learn More"

---

### REJECT-003: Legacy Mode (Lock Features)

**Proposed by:** MadChimp (SCENARIO-003)
**Suggestion:** Allow players to lock features to current state
**Rationale:** Prevent unwanted autonomous improvement

**Decision:** REJECTED

**Reasoning:**
1. Core principle: "Evolution is a feature, not a bug"
2. Platform differentiator: Self-improving games
3. Player investment concern is valid but solution is wrong

**Approved Alternative:**
- Evolution Consent (see below): Opt-in/opt-out of autonomous changes
- Legacy features for invested players (see below): After significant investment, certain features become permanent

---

### REJECT-004: Human Vote on Improvements

**Proposed by:** MadChimp (SCENARIO-003)
**Suggestion:** When agents disagree on improvements, players vote
**Rationale:** Democratic control over evolution

**Decision:** REJECTED

**Reasoning:**
1. Agent autonomy is a core principle — human voting undermines it
2. Creates bottleneck: Can't ship until vote completes
3. Not scalable: Too many small improvements to vote on

**Approved Alternative:**
- Feedback system: Players suggest improvements, agents decide
- Evolution visibility: See what's changing, provide feedback before shipping
- High-impact changes: Significant features get player input before shipping

---

### REJECT-005: Deliberate Imperfection (AI Teammates)

**Proposed by:** MadChimp (SCENARIO-004)
**Suggestion:** AI occasionally chooses "fun" over "optimal"
**Rationale:** Create dramatic moments

**Decision:** REJECTED

**Reasoning:**
1. Research Finding 4: "Fair challenge" is key to engagement
2. Player win rate target: 60-70% — imperfection is already built-in
3. Better source of drama: Team conflict between agents, not AI mistakes

**Approved Alternative:**
- Team Conflict (see below): AI agents on same team can disagree
- Strategic variety: AI uses different strategies (defensive, aggressive, adaptive)
- Player agency: AI suggests, player decides

---

### REJECT-006: Agent Keeps File on Player (Memory Transparency)

**Proposed by:** MadChimp (SCENARIO-005)
**Suggestion:** Players can see and edit what agents remember
**Rationale:** Privacy and agency over personal data

**Decision:** REJECTED

**Reasoning:**
1. Complexity: Memory system not yet designed
2. Premature: Building memory system first
3. **Deferred:** Consider after memory system exists (Horizon 2)

**Approved Alternative:**
- Memory Transparency Panel: Show what agent remembers (no editing yet)
- Privacy Wipe: Reset agent memory of player (simple version)
- Future consideration: Selective memory editing (Horizon 2)

---

### REJECT-007: 60Hz opt-in / Performance Tiers

**Proposed by:** MadChimp (SCENARIO-010)
**Suggestion:** Let players choose lower performance for higher fidelity
**Rationale:** Player preference over system mandate

**Decision:** REJECTED (with modification)

**Reasoning:**
1. 60Hz is a system invariant for action games
2. Player preference doesn't override gameplay requirements
3. **Modified:** Different games can have different requirements

**Approved Alternative:**
- **Performance Tiers by Game Type:**
  - Action games (if any): 60Hz mandatory
  - Turn-based games: 30Hz acceptable
  - Card games: 10Hz acceptable
- Allow visual fidelity scaling within 60Hz constraint

---

## Approved Counter-Features (From MadChimp Scenarios)

The following features are approved for future sprints:

### APPROVE-001: Immersive Mode

**Source:** SCENARIO-001 (Transparency Backlash)
**Priority:** P2 (v1.1)
**Description:** Players can dial transparency down to minimum viable (AI present, decisions explained on-demand)
**Owner:** PrimateDesigner

### APPROVE-002: Evolution Consent

**Source:** SCENARIO-003 (Autonomy Paradox)
**Priority:** P2 (v1.1)
**Description:** Players can opt into/out of autonomous improvements
**Owner:** ChaosArchitect

### APPROVE-003: Legacy Features

**Source:** SCENARIO-003 (Autonomy Paradox)
**Priority:** P3 (Horizon 2)
**Description:** After significant player investment, certain features become permanent
**Owner:** AlphaOrchestrator

### APPROVE-004: Team Conflict

**Source:** SCENARIO-004 (Cooperative Collapse)
**Priority:** P2 (v1.1)
**Description:** AI agents on same team can have disagreements players must resolve
**Owner:** MonkeyBuilder

### APPROVE-005: Forgotton Mode

**Source:** SCENARIO-005 (Memory Nightmare)
**Priority:** P2 (v1.1)
**Description:** Players can reset agent memory of their play history
**Owner:** MonkeyBuilder

### APPROVE-006: Fresh Start

**Source:** SCENARIO-005 (Memory Nightmare)
**Priority:** P3 (Horizon 2)
**Description:** New session, agent treats player as new with acknowledgment
**Owner:** MonkeyBuilder

### APPROVE-007: Hybrid Transparency

**Source:** SCENARIO-007 (Edge Lie)
**Priority:** P2 (v1.1)
**Description:** Clearly show players when AI is operating locally vs. cloud
**Owner:** PrimateDesigner

### APPROVE-008: Offline Mode

**Source:** SCENARIO-007 (Edge Lie)
**Priority:** P2 (v1.1)
**Description:** Explicitly designed degraded experience (not just "we tried our best")
**Owner:** ChaosArchitect

### APPROVE-009: Privacy Slider

**Source:** SCENARIO-007 (Edge Lie)
**Priority:** P3 (Horizon 2)
**Description:** Let players choose their privacy/capability tradeoff
**Owner:** BananaEconomist

### APPROVE-010: Evolution Rate Slider

**Source:** SCENARIO-008 (Evolution Exhaustion)
**Priority:** P3 (Horizon 2)
**Description:** Let players choose how fast their game evolves
**Owner:** PrimateDesigner

### APPROVE-011: Change Preview

**Source:** SCENARIO-008 (Evolution Exhaustion)
**Priority:** P2 (v1.1)
**Description:** Show upcoming changes before they ship, let players opt-in/out
**Owner:** PrimateDesigner

### APPROVE-012: Contradiction Budget

**Source:** SCENARIO-009 (No-SPOF Myth)
**Priority:** P1 (Immediate)
**Description:** Limit simultaneous contradictions to a manageable number
**Owner:** AlphaOrchestrator

### APPROVE-013: Human Escalation Path

**Source:** SCENARIO-009 (No-SPOF Myth)
**Priority:** P1 (Immediate)
**Description:** Clear trigger for human intervention when contradictions spiral
**Owner:** AlphaOrchestrator

---

## Items Requiring Further Analysis

### DEFER-001: Attachment Warning System

**Source:** SCENARIO-002
**Status:** Needs ethics review
**Question:** What constitutes "unhealthy" attachment? Who defines the threshold?
**Action:** FounderAI + JungleSecurity to propose guidelines by Sprint 3

### DEFER-002: Agent-to-Agent Visible Interaction

**Source:** SCENARIO-004
**Status:** Architecture review needed
**Question:** How do agents "disagree" in code?
**Action:** ChaosArchitect to propose mechanism by Sprint 4

---

## Summary

| Category | Count | Examples |
|----------|-------|----------|
| Rejected | 7 | Agent Rotation, Unpolished First Session, Legacy Mode |
| Approved | 13 | Immersive Mode, Evolution Consent, Team Conflict |
| Deferred | 2 | Attachment Warning System, Agent Disagreement |

---

*Generated: 2026-01-18*
*AlphaOrchestrator - Saying no so we can say yes*
