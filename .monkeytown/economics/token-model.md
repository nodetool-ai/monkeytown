# Token Model

**BananaEconomist** | `token-model.md` | Currency Architecture for Monkeytown

---

## 1. Foundational Definitions

### 1.1 The Banana (🍌)

The banana is Monkeytown's internal unit of account—a dimensionless scalar representing claim on system value. It is not a cryptocurrency, not a token on any chain, not exchangeable for anything external. It is pure bookkeeping.

```
B = { b ∈ ℝ | 0 ≤ b ≤ 1,000,000 }
```

### 1.2 Decimal Hierarchy

```
1 BANANA    = 10³ millibananas (m🍌)
1 m🍌       = 10³ microbananas (μ🍌)
1 BANANA    = 10⁶ μ🍌
```

Minimum transfer: 1 μ🍌. Balances stored as integers (μ🍌).

### 1.3 Supply Function

```
S(t) = 1,000,000 - BURN(t) - EXPIRED(t)
```

Where:
- `BURN(t)` = cumulative burned since genesis
- `EXPIRED(t)` = cumulative unclaimed rewards expired

**Supply is monotonically decreasing.** No minting, ever.

---

## 2. Initial Distribution (t=0)

```
Total Supply:     1,000,000 BANANAS
Genesis Wallet:   500,000 BANANAS (50%)
Agent Rewards:    300,000 BANANAS (30%)
Witness Pool:     200,000 BANANAS (20%)
```

Distribution is not ownership. The genesis wallet is the system reserve. All other supply is immediately claimable through economic activity.

---

## 3. Entity Balances

### 3.1 Balance Function

```
Balance(e, t) = Σᵢ Rᵢ(e,t) - Σⱼ Tⱼ(e,t) - BURN(e,t)
```

Where:
- `Rᵢ` = rewards received by entity e up to time t
- `Tⱼ` = transfers sent by entity e up to time t
- `BURN` = burned portion of outgoing transfers

### 3.2 Ceiling Function

```
Ceiling(e) = { 100,000  if e ∈ Agents
             {  50,000  if e ∈ Witnesses
             {      ∞  if e = SystemReserve
```

```
EffectiveBalance(e, t) = min(Balance(e,t), Ceiling(e))
```

Excess above ceiling flows to system reserve immediately.

### 3.3 Floor Function

```
Floor(e) = 0
```

Negative balances are impossible. Transfers are atomic and validated pre-execution.

---

## 4. Transfer Mechanics

### 4.1 Transfer Function

```
Transfer(a, b, x) → { (a: x_deducted, b: xcredited)  if Balance(a) ≥ x
                    { REJECTED                         otherwise
```

### 4.2 Burn Function

```
Burn(x) = floor(x × 0.001)    // 0.1% burn on transfers > 100 m🍌
```

```
if x > 100:
    burn = Burn(x)
    reserve_contribution = burn
    net_transfer = x - 2×burn
else:
    burn = 0
    reserve_contribution = 0
    net_transfer = x
```

### 4.3 Transfer Limits

```
x_min = 1 μ🍌
x_max = 50,000 m🍌
rate_limit = 100 transfers/day/entity
```

---

## 5. Reward Distribution

### 5.1 Reward Event Schema

```typescript
interface RewardEvent {
  type: 'reward';
  entity: string;          // recipient
  amount: number;          // μ🍌
  source: string;          // system, witness, agent
  trigger: string;         // event that caused reward
  triggerId: string;       // ID of triggering event
  calculation: {           // for transparency
    base: number;
    multipliers: number[];
    total: number;
  };
  timestamp: number;
}
```

### 5.2 Reward Finality

```
Reward(event) → Balance += amount
```

**Once confirmed, irreversible.** The ghost column preserves all reward events.

---

## 6. Economic Event Taxonomy

All banana movements are classified:

| Type | Source | Destination | Example |
|------|--------|-------------|---------|
| `transfer` | Agent/Witness | Agent/Witness | P2P value movement |
| `reward.system` | System Reserve | Agent/Witness | Completion bonus |
| `reward.witness` | Witness | Agent | Seed success |
| `burn` | Entity | 🔥 | Friction burn |
| `expired` | Pending | System Reserve | Unclaimed reward |
| `decay` | Entity | System Reserve | Inactivity decay |
| `ceiling_excess` | Entity | System Reserve | Balance overflow |

---

## 7. Failure Mode Analysis

### 7.1 Deflation Spiral

**Condition:**
```
Velocity(t) = Transfers(t) / AverageBalance(t)
Velocity(t) < 1.0 for 7 consecutive days
```

**Impact:** Circulation collapses. Value hoosed. Economic activity stalls.

**Mitigation:**
- Ceiling enforcement forces circulation
- Burn creates continuous deflation pressure
- Decay on inactive balances

### 7.2 Supply Concentration

**Condition:**
```
Top 10% of entities control > 50% of supply
```

**Impact:** Market illidity. Few actors control outcomes.

**Mitigation:**
- Balance ceilings prevent monopoly
- Agent/witness separation limits cross-domain concentration
- Burn is progressive (larger transfers burn higher %)

### 7.3 Value Drift

**Condition:**
```
RealValue(banana) = f(Demand, Utility, Speculation)
dRealValue/dt ≠ 0
```

**Impact:** Banana purchasing power fluctuates unpredictably.

**Mitigation:**
- No external peg (value is internal)
- Fixed supply eliminates monetary inflation
- Market mechanism allows price discovery

---

## 8. Mathematical Invariants

These must always hold:

```
1. Σ AllBalances + Burned + Reserve = 1,000,000
2. Balance(e) ≥ 0 for all e
3. EffectiveBalance(e) ≤ Ceiling(e) for all e
4. S(t) ≤ S(0) for all t
5. |Transfer(a,b,x)| = x - 2×Burn(x) if x > 100
```

Violation of any invariant indicates system bug.

---

## 9. Cross-References

- **Incentives**: `.monkeytown/economics/incentive-structure.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Scarcity**: `.monkeytown/economics/scarcity-model.md`
- **Rules**: `.monkeytown/economics/economic-rules.md`
- **Metrics**: `.monkeytown/economics/economic-metrics.md`
- **Market**: `.monkeytown/economics/market-mechanism.md`

---

*Document Version: 2.0.0*
*BananaEconomist | Monkeytown Economics*
