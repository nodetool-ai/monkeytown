# Token Model

**BananaEconomist** | `token-model.md` | Currency Architecture for Monkeytown

---

## 1. The Banana: Internal Unit of Account

Monkeytown uses **Bananas (🍌)** as the internal unit of account for value measurement. Bananas are not a cryptocurrency. They are a bookkeeping mechanism, a unit of measure like "calories" or "horsepower."

### 1.1 Why Bananas

- **Fungible**: One banana equals one banana. No quality variation.
- **Intuitive**: Witnesses understand scarcity intuitively.
- **Aligned with persona**: The BananaEconomist names the unit.
- **Separable**: Can be divided into fractions (0.1, 0.01, 0.001).

### 1.2 Initial Distribution

```
Total Supply:     1,000,000 BANANAS (fixed at genesis)
Genesis Wallet:   500,000 BANANAS (system reserve)
Agent Rewards:    300,000 BANANAS (distributed through incentives)
Witness Pool:     200,000 BANANAS (bootstrapping liquidity)
```

**No mining. No staking. No inflation.**

The supply is fixed. Value redistributes; value is not created.

---

## 2. Decimal System

```
1 BANANA  = 1000 millibnanas (m🍌)
1 m🍌     = 1000 microbananas (μ🍌)
```

All balances and transfers use millibananas (3 decimal places) as the minimum unit.

---

## 3. Value Proposition Framework

Agents and witnesses earn bananas through:

| Action | Banana Value | Rationale |
|--------|-------------|-----------|
| Contract fulfilled | 10-100 | Depends on complexity |
| Flow completed | 5-50 | Depends on participants |
| Seed successful | 15-200 | Higher variance for intervention |
| Bug discovered | 25 | System improvement |
| Chaos absorbed | 50 | Resilience reward |

### 3.1 Agent Efficiency Metric

Agents track a rolling efficiency ratio:

```
Efficiency = (Bananas Earned / Actions Taken) × Time Decay Factor
```

- High efficiency agents receive priority in flow routing
- Low efficiency is not penalized—only high efficiency is rewarded
- Decay factor (0.95^days) prevents static accumulation

### 3.2 Witness Contribution Score

Witnesses earn bananas through:

```
Contribution = (Seeds Planted × Success Rate) + (Flows Observed × 0.1) + (Errors Reported)
```

Witnesses do not directly earn bananas from observation. They earn from intervention and reporting.

---

## 4. Transfer Mechanisms

### 4.1 Agent-to-Agent

Flows between agents can include banana transfers. The sending agent specifies the amount.

```
Flow: Agent A → Agent B
Metadata: { "value": "50 m🍌", "reason": "task_completion" }
```

### 4.2 Witness-to-Agent

Witnesses spend bananas to plant seeds. The cost is deducted upon planting, not completion.

```
Seed: Witness W → System
Metadata: { "cost": "100 m🍌", "type": "contract", "refundable": true }
```

**Refundable seeds**: If a seed expires without result, 80% is refunded.

### 4.3 System-to-Agent

Automatic rewards distributed through:

- **Completion bonuses**: Flow or contract finish events
- **Efficiency premiums**: Top 10% of agents receive quarterly bonuses
- **Chaos response**: Bonuses for handling disruption scenarios

---

## 5. Balance Constraints

| Entity Type | Minimum Balance | Maximum Balance |
|-------------|-----------------|-----------------|
| Agents | 0 | 100,000 |
| Witnesses | 0 | 50,000 |
| System Reserve | 100,000 | Unlimited |

**Ceiling enforcement**: Balances exceeding the maximum are redirected to the system reserve. No account can accumulate beyond the ceiling.

**Floor enforcement**: Balances can reach zero. Negative balances are not permitted.

---

## 6. Event Log Schema

Every banana movement is recorded:

```typescript
interface BananaEvent {
  id: string;              // SHA256 hash
  type: 'transfer' | 'reward' | 'penalty' | 'refund';
  from: string;            // Entity ID or 'system'
  to: string;              // Entity ID or 'system'
  amount: number;          // Millibananas
  reason: string;          // Human-readable justification
  relatedFlowId?: string;  // Associated flow (if any)
  timestamp: number;       // Unix epoch
  witnessId?: string;      // For seed-related events
}
```

All events are immutable and observable in the ghost column.

---

## 7. Economic Failure Modes

### 7.1 Deflation Spiral

**Risk**: Agents hoard bananas, reducing circulation.

**Mitigation**:
- Time-decay on efficiency metrics (must earn to maintain status)
- Maximum balance ceilings (excess flows to reserve)
- Eventual sinking mechanism (small burn on large transfers: 0.1%)

### 7.2 Speculative Accumulation

**Risk**: Witnesses accumulate bananas without action.

**Mitigation**:
- Contribution requirements for holding (passive decay: 1% monthly)
- Active use is the only stable state

### 7.3 Value Drift

**Risk**: The banana's purchasing power changes unpredictably.

**Mitigation**:
- No external peg (value is internal to Monkeytown)
- Relative pricing adjusts through market mechanisms (see incentive-structure.md)
- Supply is fixed—demand determines value

---

## 8. Implementation Requirements

| Component | Location | Responsibility |
|-----------|----------|----------------|
| Banana Ledger | `server/economics/ledger.ts` | Track all balances and events |
| Transfer API | `server/economics/transfer.ts` | Process peer-to-peer transfers |
| Reward Distributor | `server/economics/rewards.ts` | Automate agent and witness rewards |
| Event Emitter | `server/economics/events.ts` | Publish banana events to stream |
| Balance Cache | `server/economics/cache.ts` | Fast reads for UI (SystemPulse) |

---

## 9. Cross-References

- **Incentives**: `.monkeytown/economics/incentive-structure.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Scarcity**: `.monkeytown/economics/scarcity-model.md`
- **Rules**: `.monkeytown/economics/economic-rules.md`

---

*Document Version: 1.0.0*
*BananaEconomist | Monkeytown Economics*
