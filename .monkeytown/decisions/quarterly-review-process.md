# Quarterly Agent Review Process

**Purpose:** Structured review of agent outputs, coordination, and system health every quarter.

**Cadence:** End of Q1, Q2, Q3, Q4  
**Owner:** AlphaOrchestrator  
**Participants:** All agents (async via repository)

---

## Review Schedule

| Quarter | Review Period | Completion Deadline |
|---------|--------------|---------------------|
| Q1 2026 | Mar 25-31 | Mar 31 |
| Q2 2026 | Jun 24-30 | Jun 30 |
| Q3 2026 | Sep 23-29 | Sep 30 |
| Q4 2026 | Dec 23-31 | Dec 31 |

---

## Review Phases

### Phase 1: Agent Self-Assessment (Week 1)

Each agent creates a self-assessment document in their domain:

**File:** `.monkeytown/{domain}/quarterly-review-{YYYY-Q#}.md`

**Template:**
```markdown
# {AgentName} Quarterly Review - Q# YYYY

## Outputs This Quarter
- List all files created/updated
- Categorize: Strategy, Specs, Analysis, Feedback

## Goals Achievement
- Original quarter goals (from previous review)
- Actual achievements
- Gaps and why

## Impact Assessment
- What decisions did my outputs influence?
- Which features were my outputs used in?
- Cross-references from other agents

## Challenges Faced
- Blockers encountered
- Information gaps
- Coordination difficulties

## Learnings
- What worked well
- What to improve
- New insights gained

## Next Quarter Goals
- Primary objectives
- Key deliverables
- Dependencies on other agents
```

**Deadline:** 7 days after quarter end

---

### Phase 2: Cross-Agent Coordination Review (Week 2)

AlphaOrchestrator synthesizes agent assessments and reviews coordination:

**Areas to Assess:**

1. **Communication Effectiveness**
   - How well did agents understand each other's outputs?
   - Were cross-references clear and useful?
   - Did contradictions get resolved appropriately?

2. **Dependency Management**
   - Were dependencies identified upfront?
   - Did blocking agents deliver on time?
   - What caused delays?

3. **Output Quality**
   - Factual agents: Accuracy, grounding in reality
   - Creative agents: Clarity of proposals vs. reality
   - Testing agents: Evidence quality, reproducibility

4. **Workload Balance**
   - Which agents were over/under-utilized?
   - Should responsibilities shift?
   - Are new agents needed?

---

### Phase 3: Evidence → Research → Features Flow (Week 3)

Review how research evidence translated into features:

**Checklist:**

1. **Research Utilization**
   - [ ] All research findings catalogued
   - [ ] Research mapped to product decisions
   - [ ] Unused research identified and justified
   - [ ] New research needs identified

2. **Feature Traceability**
   - [ ] All features trace to evidence
   - [ ] Feature priorities match evidence strength
   - [ ] Weak evidence features flagged
   - [ ] Missing evidence identified

3. **Decision Quality**
   - [ ] Major decisions have clear rationale
   - [ ] Decisions resolved contradictions
   - [ ] Decision outcomes measured
   - [ ] Decision framework updated

**Tool:** Use `decision-evidence-feature-mapping.md` as reference

---

### Phase 4: Metrics & Health Review (Week 4)

Review system health and progress metrics:

**Health Indicators:**
- Vision alignment: Strong/Weak/Misaligned
- Architecture soundness: Solid/Fragile/Broken
- Requirements completeness: Complete/Partial/Gaps
- Testing quality: Reliable/Unstable/Blocked
- Security posture: Secure/Vulnerable/Critical

**Progress Metrics:**
- Features completed vs. planned
- Velocity trend (features per quarter)
- Quality metrics (E2E pass rate, security score)
- Coordination metrics (cross-references, contradictions)

**Outcome:** Updated `state-of-monkeytown.md` for next quarter

---

## Review Document Structure

AlphaOrchestrator creates comprehensive quarterly review:

**File:** `.monkeytown/decisions/quarterly-review-{YYYY-Q#}.md`

### Sections:

1. **Executive Summary**
   - Quarter theme
   - Major achievements
   - Critical challenges
   - Overall health grade

2. **Agent Performance**
   - Output volume and quality per agent
   - Coordination effectiveness scores
   - Blockers and friction points
   - Standout contributions

3. **Feature Delivery**
   - Planned vs. actual completions
   - Velocity analysis
   - Blocking issues
   - Quality assessment

4. **Evidence & Research**
   - New research findings
   - Research utilization rate
   - Evidence strength for decisions
   - Gaps identified

5. **Coordination & Communication**
   - Cross-reference analysis
   - Contradiction resolution
   - Agent alignment score
   - Process improvements needed

6. **Technical Health**
   - Architecture soundness
   - Security posture
   - Technical debt inventory
   - Quality metrics

7. **Challenges & Learnings**
   - What went well
   - What went wrong
   - Surprises encountered
   - Process failures

8. **Decisions Made**
   - Major decisions this quarter
   - Decision effectiveness
   - Overturned decisions
   - Pending decisions

9. **Next Quarter Plan**
   - Horizon progress
   - Priority features
   - Agent focus areas
   - Process changes

10. **Action Items**
    - Agent reassignments
    - Process improvements
    - Tool additions
    - Structure changes

---

## Evaluation Criteria

### Agent Output Quality

**Factual Agents** (Architect, Builder, Security, QA, GameTester):
- ✅ Excellent: All assertions backed by code/tests, no speculation
- ⚠️ Adequate: Mostly grounded, minor speculation flagged
- 🔴 Concerning: Speculation presented as fact, gaps not acknowledged

**Creative Agents** (Founder, Research, Designer, Economist, MadChimp):
- ✅ Excellent: Clear separation of vision/hypothesis/reality
- ⚠️ Adequate: Some ambiguity between proposal and reality
- 🔴 Concerning: Proposals treated as reality, no testing framework

**Coordinator Agents** (Orchestrator, PM, HR, TownCrier):
- ✅ Excellent: Synthesizes all inputs, clear decisions, resolves contradictions
- ⚠️ Adequate: Some inputs missed, decisions partially justified
- 🔴 Concerning: Ignores inputs, arbitrary decisions, contradictions unresolved

---

### Coordination Effectiveness

**Score: 0-100**

| Score Range | Rating | Characteristics |
|-------------|--------|-----------------|
| 90-100 | Excellent | Seamless coordination, clear cross-refs, contradictions resolved |
| 70-89 | Good | Most coordination works, minor friction, delayed resolutions |
| 50-69 | Adequate | Coordination happens but with effort, frequent misalignment |
| 30-49 | Poor | Significant coordination failures, many contradictions |
| 0-29 | Critical | Agents working in isolation, contradictions unresolved |

**Factors:**
- Cross-reference quality (clear, accurate, useful)
- Dependency management (identified early, delivered on time)
- Contradiction resolution (acknowledged, debated, resolved)
- Information flow (outputs discovered by dependent agents)

---

### Feature Delivery Health

**Score: 0-100**

| Score Range | Rating | Velocity | Quality |
|-------------|--------|----------|---------|
| 90-100 | Excellent | Meeting/exceeding plan | High quality, low bugs |
| 70-89 | Good | Slight delays | Good quality, manageable bugs |
| 50-69 | Adequate | Moderate delays | Acceptable quality, some debt |
| 30-49 | Poor | Significant delays | Quality issues, high debt |
| 0-29 | Critical | Severe delays | Quality failures, blocked |

**Factors:**
- Planned vs. actual completions
- Quality of delivered features
- Technical debt introduced
- Blockers resolved

---

## Process Improvement Framework

### After Each Review, Evaluate:

1. **What Processes Helped?**
   - Which workflows were efficient?
   - Which communication patterns worked?
   - Which tools proved valuable?

2. **What Processes Hindered?**
   - Which workflows caused delays?
   - Which communication gaps appeared?
   - Which tools were unused?

3. **What's Missing?**
   - What processes should we add?
   - What information is hard to find?
   - What coordination is manual but should be automated?

4. **What Should Change?**
   - Which processes need refinement?
   - Which responsibilities should shift?
   - Which tools need upgrading?

---

## Action Item Template

After review, create action items in `.monkeytown/tasks/`:

```yaml
id: review-action-{quarter}-{number}
title: "Q# Review Action: {Description}"
description: |
  Based on Q# YYYY quarterly review.
  
  {Full description of action item}
  
  Reference: .monkeytown/decisions/quarterly-review-{YYYY-Q#}.md
status: open
priority: {high|medium|low}
assignee: {AgentName}
dependencies: []
labels:
  - process-improvement
  - quarterly-review
created: {YYYY-MM-DD}
due: {Next quarter start + 30 days}
output_folder: {relevant folder}
notes: |
  Action item from quarterly review process.
  Must be completed before next review.
```

---

## Review Metrics to Track

### Quarter over Quarter

| Metric | Q1 | Q2 | Q3 | Q4 | Trend |
|--------|----|----|----|----|-------|
| Features Completed | — | — | — | — | — |
| Velocity (features/quarter) | — | — | — | — | — |
| E2E Test Pass Rate | — | — | — | — | — |
| Security Score | — | — | — | — | — |
| Agent Coordination Score | — | — | — | — | — |
| Cross-References per Agent | — | — | — | — | — |
| Contradictions Resolved | — | — | — | — | — |
| Technical Debt Items | — | — | — | — | — |
| Documentation Coverage | — | — | — | — | — |
| Agent Output Volume | — | — | — | — | — |

---

## Review Artifacts

Each quarterly review produces:

1. **Agent Self-Assessments** (18 files)
   - Location: `.monkeytown/{domain}/quarterly-review-{YYYY-Q#}.md`
   - Deadline: 7 days after quarter end

2. **Comprehensive Review** (1 file)
   - Location: `.monkeytown/decisions/quarterly-review-{YYYY-Q#}.md`
   - Deadline: 30 days after quarter end

3. **Updated State** (1 file)
   - Location: `.monkeytown/decisions/state-of-monkeytown.md`
   - Deadline: Same as comprehensive review

4. **Action Items** (N files)
   - Location: `.monkeytown/tasks/review-action-*.yaml`
   - Created during review process

5. **Metrics Update** (1 file)
   - Location: `.monkeytown/metrics/quarterly-metrics-{YYYY-Q#}.md`
   - Tracks quantitative progress

---

## Human Review Integration

### When Humans Should Review

**Required:**
- Major process changes proposed
- Agent reassignments needed
- Budget/resource implications
- Strategic direction shifts

**Optional:**
- Agent performance concerns
- Coordination breakdown
- Technical architecture changes
- Tool additions

**Format:** Create issue in GitHub with label `quarterly-review-human` and link to review document

---

## First Review: Q1 2026 (March 31, 2026)

### Special Focus Areas

1. **Foundation Quality**
   - Did we build the right foundation?
   - Is architecture sound for scale?
   - Are agent roles well-defined?

2. **Launch Readiness**
   - v1.0 feature completeness
   - Quality gates passed
   - Security baseline met

3. **Agent System Health**
   - Are agents producing value?
   - Is coordination working?
   - Do we need adjustments?

4. **Player Experience**
   - If launched: player metrics
   - If pre-launch: readiness assessment

---

## Review Template Files

### Agent Self-Assessment Template

See: `.monkeytown/templates/quarterly-review-agent-template.md`

### Comprehensive Review Template

See: `.monkeytown/templates/quarterly-review-orchestrator-template.md`

### Metrics Template

See: `.monkeytown/templates/quarterly-metrics-template.md`

---

## Success Criteria

A successful quarterly review:

✅ All agents complete self-assessments  
✅ Comprehensive review published on time  
✅ Action items created and assigned  
✅ Metrics tracked and trended  
✅ Process improvements identified  
✅ Next quarter goals clear  
✅ Agent coordination assessed  
✅ Technical health validated  

---

## Post-Review Communication

After each review:

1. **AlphaOrchestrator** publishes comprehensive review
2. **TownCrier** creates community summary (if applicable)
3. **Agents** read review and action items
4. **Humans** review and approve major changes
5. **All** implement action items for next quarter

---

*This process ensures continuous improvement of the agent system while maintaining focus on delivering value to players.*

**Version:** 1.0  
**Created:** 2026-01-20  
**Owner:** AlphaOrchestrator  
**Next Update:** After Q1 2026 review (Mar 31, 2026)
