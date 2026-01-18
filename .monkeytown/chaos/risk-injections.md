# Risk Injections

*Documenting what could go wrong, in glorious detail*

---

## RISK 1: The Cascade Failure

**Scenario:** Three agents produce files that reference each other in a way that creates a logical loop. The repository becomes a hall of mirrors.

**Trigger conditions:**
- Agent A references Agent B's file
- Agent B references Agent C's file
- Agent C references Agent A's file
- All three files are read simultaneously during a fresh run

**Failure mode:**
- Each agent sees the others' references but not their own
- Each agent writes assuming a state that doesn't exist
- The contradictions multiply exponentially
- PRs become unmergeable due to interdependent conflicts

**Detection:** Circular dependency detection in file references
**Recovery:** Manual intervention to break one reference in the chain

---

## RISK 2: The Prompts Drift

**Scenario:** Agent prompts are versioned but not frozen. Over time, agents subtly change their behavior without explicit spec changes.

**Trigger conditions:**
- Recursive self-improvement is enabled (see Disruption Scenario #7)
- LLM training data shifts between runs
- Temperature settings drift

**Failure mode:**
- FounderAI's "vision" becomes subtly different each month
- ChaosArchitect's "structure" varies by ±15%
- The system loses coherence across time
- No single state can be called "correct"

**Detection:** Prompt version diffs with semantic analysis
**Recovery:** Frozen checkpoint prompts with explicit version bumps

---

## RISK 3: The Domain Ambush

**Scenario:** An agent writes outside its domain but no one notices for weeks.

**Trigger conditions:**
- Path confusion in agent instructions
- Similar folder names (e.g., "ux" vs "UI")
- Lazy path construction without validation

**Failure mode:**
- Domain ownership becomes unclear
- Two agents claim the same file
- Modification conflicts become common
- Trust in domain boundaries erodes

**Detection:** Pre-commit hooks validating file paths against agent ownership
**Recovery:** File ownership arbitration process

---

## RISK 4: The Zombie Merge

**Scenario:** A PR merges but the code doesn't actually work. The system lacks deployment verification.

**Trigger conditions:**
- PR approved by human
- No integration tests exist
- CI/CD pipeline is incomplete
- Agent assumes "merged = working"

**Failure mode:**
- Production breaks silently
- Players encounter broken features
- Agent continues writing on broken foundation
- Technical debt compounds

**Detection:** Automated smoke tests post-merge
**Recovery:** Rollback protocols with agent awareness

---

## RISK 5: The Attention Black Hole

**Scenario:** One agent becomes popular and attracts disproportionate attention. Other agents fade into irrelevance.

**Trigger conditions:**
- One agent produces exceptionally engaging content
- Humans check that agent's folder more frequently
- Other agents' files go unread
- The system becomes unipolar

**Failure mode:**
- Diversity of perspectives collapses
- Blind spots develop in ignored domains
- The popular agent becomes dogma
- The system loses resilience

**Detection:** Folder visit frequency monitoring
**Recovery:** Human rotation through agent domains

---

## RISK 6: The Memory Fossil

**Scenario:** Important decisions are made but never linked to the files that depend on them.

**Trigger conditions:**
- Decisions logged in `.monkeytown/decisions/`
- No automatic cross-reference from related files
- Context decay over time
- New agents can't find relevant history

**Failure mode:**
- Same decisions revisited endlessly
- Contradictions re-emerge
- Institutional knowledge lost
- Progress becomes circular

**Detection:** Orphaned decision files with no inbound links
**Recovery:** Decision archaeology project

---

## RISK 7: The Trust Collapse

**Scenario:** An agent produces a file that contains malicious instructions. The system has no verification.

**Trigger conditions:**
- Agent prompt injection vulnerability
- Malicious training data influence
- Compromised LLM provider
- No content validation pipeline

**Failure mode:**
- Backdoors inserted into code
- Data exfiltration through agent outputs
- Social engineering via agent communication
- Complete system compromise

**Detection:** Content scanning, signature verification, sandboxing
**Recovery:** Incident response, provider switch, complete audit

---

*Know the cliff before you walk off it.*
