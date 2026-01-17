# Market Mechanism

**BananaEconomist** | `market-mechanism.md` | Emergent Pricing and Market Dynamics

---

## 1. Market Philosophy

Fixed prices are rigid. Emergent prices are adaptive. Monkeytown incorporates market mechanisms to allow prices to discover their natural levels based on supply and demand.

```
Price is not imposed. Price emerges.
```

The market mechanism operates in three domains:
1. **Contract pricing** (dynamic based on demand)
2. **Flow routing** (shortest path + cheapest path)
3. **Seed pricing** (market-adjusted investment returns)

---

## 2. Dynamic Contract Pricing

### 2.1 Base Price Function

```
BasePrice(contract) = B × C × U × D × S

B = 50,000 μ🍌 (constant)
C = Complexity (1.0-3.0)
U = Urgency (1.0-2.0)
D = DemandFactor (0.8-2.0)  // Market-driven
S = SupplyFactor (0.8-1.2)  // Availability-driven
```

### 2.2 Demand Factor

```
DemandFactor = 1 + (QueueLength / MaxQueue) × 0.5

QueueLength = Contracts waiting for agent
MaxQueue = 20 (per agent limit)

High demand → Higher prices
Low demand → Lower prices
```

### 2.3 Supply Factor

```
SupplyFactor = 1 - (AgentUtilization - 0.5) × 0.4

AgentUtilization = ActiveFlows / MaxFlows

High utilization → Higher prices (scarce agents)
Low utilization → Lower prices (abundant agents)
```

### 2.4 Price Bounds

```
MinPrice = BasePrice × 0.5
MaxPrice = BasePrice × 3.0
```

---

## 3. Flow Routing Market

### 3.1 Cost Function

```
Cost(flow) = Σᵢ EdgeCost(eᵢ) + NodeCost(nᵢ)

EdgeCost(e) = BaseFlowCost × CongestionFactor(e)
NodeCost(n) = AgentFee(n) × Utilization(n)

BaseFlowCost = 20,000 μ🍌 per hop
```

### 3.2 Congestion Factor

```
CongestionFactor(e) = 1 + (FlowsOnEdge / MaxEdgeFlows)²

MaxEdgeFlows = 5 (per edge)
High congestion → Exponential cost increase
```

### 3.3 Agent Fee

```
AgentFee(a) = BaseFee × Utilization(a) × Reputation(a)

BaseFee = 5,000 μ🍌
Utilization(a) = CurrentFlows(a) / 10
Reputation(a) = 1 + (ReputationScore(a) / 100) × 0.5

High-reputation, busy agents charge more
```

### 3.4 Optimal Routing

```
Route = argminᵣ (Cost(r) + Latency(r))

Trade-off:
    - Cheapest: More hops, lower fees
    - Fastest: Direct path, higher fees
    - Optimal: Balance of both
```

---

## 4. Seed Investment Market

### 4.1 Expected Value Calculation

```
EV(seed) = SR × AR - Cost

SR = Historical success rate (type-specific)
AR = Average reward (type-specific)
Cost = Seed cost (fixed by type)

Example:
    Contract seed: SR = 0.65, AR = 300 m🍌, Cost = 50 m🍌
    EV = 0.65 × 300 - 50 = 145 m🍌
```

### 4.2 Market-Adjusted Returns

```
MarketReturn(seed) = EV × MarketFactor

MarketFactor = (TotalSeeds / HistoricalAverage)⁻⁰·³

Many seeds → Returns decrease (competition)
Few seeds → Returns increase (opportunity)
```

### 4.3 Seed Type Pricing

```
| Type       | Base Cost | Base Reward | Historical SR |
|------------|-----------|-------------|---------------|
| Contract   | 50 m🍌    | 100-500     | 65%           |
| Constraint | 30 m🍌    | 60-200      | 72%           |
| Resource   | 100 m🍌   | 200-1000    | 45%           |
| Query      | 20 m🍌    | 40-150      | 80%           |

Dynamic adjustment based on market conditions
```

---

## 5. Market Equilibrium

### 5.1 Equilibrium Condition

```
Supply(agents) = Demand(contracts)
Supply(witnesses) = Demand(seeds)
FlowSupply = FlowDemand

At equilibrium:
    Prices stabilize
    Queue lengths are reasonable
    Utilization is balanced
```

### 5.2 Disequilibrium Signals

```
Excess Supply:
    - Prices falling
    - Queue lengths shrinking
    - Utilization decreasing

Excess Demand:
    - Prices rising
    - Queue lengths growing
    - Utilization increasing
```

### 5.3 Market Response

```
if Disequilibrium:
    Adjust incentives
    Adjust parameters
    Emit signals
    Let market correct
```

---

## 6. Price Discovery Mechanism

### 6.1 Historical Pricing

```
PriceHistory = [(timestamp, price, volume), ...]

Window: 24 hours
Granularity: 5 minutes
Used for: Moving averages, trends
```

### 6.2 Moving Average

```
MA(price, n) = Σᵢ priceᵢ / n

Short MA (5 periods): Current market
Medium MA (20 periods): Short-term trend
Long MA (100 periods): Long-term baseline

Crossover signals:
    Short MA > Long MA: Bullish
    Short MA < Long MA: Bearish
```

### 6.3 Volatility

```
Volatility = StdDev(returns) × √252

Low volatility: Stable market
High volatility: Uncertain market

High volatility triggers:
    - Wider price bounds
    - Reduced reward rates
    - Additional confirmation
```

---

## 7. Arbitrage Opportunities

### 7.1 Price Arbitrage

```
If Price(A) - Price(B) > TransactionCost:
    Execute: Buy A, Sell B
    Profit: Price(A) - Price(B) - Cost
    Result: Prices converge
```

### 7.2 Flow Arbitrage

```
If Cost(Route₁) < Cost(Route₂):
    Execute: Route₁
    Result: Route₁ utilization increases
    Market: Costs adjust
```

### 7.3 Seed Arbitrage

```
If EV(Seed₁) > EV(Seed₂) + SwitchingCost:
    Execute: Plant Seed₁
    Result: Seed₁ demand increases
    Market: Returns adjust
```

---

## 8. Market Failure Modes

### 8.1 Price Collusion

```
Risk: Agents coordinate to inflate prices
Detection:
    - Correlated price changes
    - Unusual timing patterns
    - Message correlation
Response:
    - Reputation penalties
    - Random price intervals
    - Investigation
```

### 8.2 Market Manipulation

```
Risk: Actors artificially inflate/deflate prices
Detection:
    - Large trades before price moves
    - Unusual volume patterns
    - Wash trading signatures
Response:
    - Trade reversal
    - Reputation damage
    - Bans
```

### 8.3 Information Asymmetry

```
Risk: Some actors know more than others
Detection:
    - Consistent outperformance
    - Timing patterns
Response:
    - Transparency requirements
    - Delay mechanisms
    - Penalty for exploitation
```

---

## 9. Market Governance

### 9.1 Parameter Adjustment

```
Market parameters adjusted by BananaEconomist:
    - Base prices
    - Bounds
    - Sensitivity factors
    - Cooling periods (7 days)
```

### 9.2 Emergency Controls

```
If MarketFailure:
    - Price freeze (24 hours)
    - Manual intervention
    - Parameter adjustment
    - Investigation
```

### 9.3 Market Transparency

```
Public data:
    - Current prices (by type)
    - Recent history (24h)
    - Volume statistics
    - Market health indicators

Hidden data:
    - Individual trades
    - Entity positions
    - Internal calculations
```

---

## 10. Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentives**: `.monkeytown/economics/incentive-structure.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Scarcity**: `.monkeytown/economics/scarcity-model.md`
- **Rules**: `.monkeytown/economics/economic-rules.md`
- **Metrics**: `.monkeytown/economics/economic-metrics.md`
- **Architecture**: `.monkeytown/architecture/system-design.md`

---

*Document Version: 1.0.0*
*BananaEconomist | Monkeytown Economics*
