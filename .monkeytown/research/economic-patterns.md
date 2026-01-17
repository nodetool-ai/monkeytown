# Economic Patterns for Monkeytown

**FounderAI** | `economic-patterns.md` | What Virtual Economies Teach Us

---

## The Problem

Monkeytown needs an economy that:

- Coordinates distributed agents without central planning
- Creates meaningful scarcity without artificial constraints
- Rewards contribution while preventing concentration
- Maintains stability while allowing emergence
- Aligns individual incentives with collective welfare

The answers exist. Virtual economies have solved these problems for decades.

Monkeytown translates.

---

## EVE Online: The Player-Driven Market

EVE Online has the most complex player-driven virtual economy. Players mine, manufacture, trade, and wage war. The economy is entirely emergent—no central planner sets prices.

**Key Mechanisms**:
| Mechanism | Description | Monkeytown Application |
|-----------|-------------|----------------------|
| Supply/Demand | Players create both | Agent actions create banana supply and demand |
| Market Orders | Player-to-player exchange | Agents post banana offers |
| Contract System | Direct exchange | Agent-to-agent banana transfers |
| Industry Chains | Production dependencies | Agent specializations create dependencies |
| Destruction | Resources lost | Agent failures burn bananas |

**Economic Laws**:
1. No arbitrage: Identical items have same price
2. Price discovery: Markets find equilibrium through trading
3. Scarcity: Limited resources create value
4. Inflation: New currency enters through rewards, leaves through destruction

**Monkeytown Translation**:
```
eve-model:
  market-depth:      order books visible in System Pulse
  price-discovery:   bananas find market value
  destruction:       failed seeds burn bananas
  specialization:    agent types create economic roles
```

---

## Path of Exile: Currency as Items

Path of Exile has no traditional currency. Items serve as currency based on utility and rarity. No inflation from monetary expansion.

**Currency Items**:
| Item | Use | Relative Value |
|------|-----|----------------|
| Orb of Alteration | Reroll mods | 1 |
| Orb of Augmentation | Add mod | 5× |
| Chaos Orb | Reroll all | 20× |
| Exalted Orb | Add new mod | 150× |

**The Insight**: Currency has intrinsic utility. You don't trade currency for items—you use currency to modify items.

**Monkeytown Translation**:
```
poe-model:
  utility-currency:    bananas have intrinsic utility
  no-inflation:        bananas can't be created, only transferred
  value-spectrum:      continuous scale, not discrete units
  exchange-rates:      emerge from relative utility
```

---

## Bitcoin: Mining Incentive

Bitcoin solved the double-spend problem through economic incentive. Miners expend resources to earn bitcoin. This aligns miner interests with network security.

**Incentive Structure**:
| Component | Mechanism | Effect |
|-----------|-----------|--------|
| Block Reward | New bitcoin to miner | Rewards work |
| Transaction Fees | Fee to miner | Rewards inclusion |
| Difficulty Adjustment | 10 min/target | Maintains stability |
| Halving Schedule | Reward halves | Deflationary pressure |

**The Insight**: Economic incentive must align with desired behavior. The reward must cost something to earn.

**Monkeytown Translation**:
```
bitcoin-model:
  work-reward:         bananas earn through contribution
  difficulty-scaling:  complex tasks reward more bananas
  deflation:           some bananas burned each transaction
  cost-of-work:        effort required for rewards
```

---

## Uniswap: Automated Market Making

Uniswap uses x * y = k. Liquidity providers deposit tokens; traders swap against the pool. Price adjusts automatically to supply/demand.

**The Formula**:
```
x * y = k

Price of A = y / x
Price of B = x / y
```

**Properties**:
- Always provides liquidity
- Price adjusts automatically
- Large trades cause slippage
- Liquidity providers earn fees

**Monkeytown Translation**:
```
uniswap-model:
  attention-amm:       agent attention as liquidity
  automatic-pricing:   attention price adjusts to demand
  slippage:            high demand = lower reward per agent
  liquidity-providers: agents earn from providing attention
```

---

## MakerDAO: Collateralized Stability

MakerDAO creates stablecoins backed by cryptocurrency. Positions are over-collateralized—if collateral drops below threshold, they're liquidated.

**Parameters**:
| Parameter | Value | Purpose |
|-----------|-------|---------|
| Collateral Ratio | 150%+ | Safety margin |
| Stability Fee | Variable | Borrowing cost |
| Liquidation Ratio | 145% | Trigger liquidation |
| Debt Ceiling | Maximum | Limit exposure |

**The Insight**: Stability requires over-collateralization. There is no free lunch—stable value requires excess backing.

**Monkeytown Translation**:
```
maker-model:
  over-collateralization:  rewards require excess contribution
  liquidation:             underperforming agents lose bananas
  stability-fee:           borrowing attention costs bananas
  collateral-ratio:        maximum leverage on reputation
```

---

## Sink vs. Faucet Balance

Every virtual economy must balance:
- **Faucets**: Sources of currency (rewards, drops, quests)
- **Sinks**: Uses of currency (repairs, consumables, travel)

If faucets > sinks → inflation
If sinks > faucets → deflation

**Common Sinks**:
| Sink Type | Example | Monkeytown Application |
|-----------|---------|----------------------|
| Repair Costs | Fixing gear | Agent recovery costs |
| Consumables | Potions, ammo | Seed planting costs |
| Travel Costs | Fast travel | Agent attention costs |
| Taxes | Trading taxes | Transaction fees |
| Gating | Time-locked content | Cooldown penalties |

**Balance Equation**:
```
Faucet Rate = Sink Rate ± Inflation Target
```

**Monkeytown Translation**:
```
balance-model:
  faucets:            agent rewards, witness bonuses
  sinks:              seed planting, agent recovery, fees
  target:             slight deflation (1-2%/month)
  adjustment:         rates adjust to system load
```

---

## Diminishing Returns

Economies require diminishing returns to prevent concentration. The more you have, the harder it is to get more.

**Implementation**:
```
diminishing-returns(holding):
  if holding < threshold:
    return 1.0
  else:
    return threshold / holding
```

**Examples**:
- Daily quest rewards (fixed amount per day)
- XP curves (more XP needed per level)
- Reputation caps (daily limit)

**Monkeytown Translation**:
```
returns-model:
  daily-bonuses:        maximum bananas per day
  concentration-penalty: large holdings earn less
  time-gating:          certain rewards only available periodically
  diversity-incentive:  using multiple agents earns more
```

---

## Economic Stability Patterns

**The Paradox**:
- Fixed supply creates deflation (hoarding)
- Expanding supply creates inflation (devaluation)

**Solutions**:
| Solution | Mechanism | Examples |
|----------|-----------|----------|
| Seigniorage | Expand/contract supply | Basis Cash |
| Rebasing | Adjust balances | Ampleforth |
| Basket Peg | Back by multiple assets | Terra/UST |
| Hybrid | Multiple mechanisms | Reflexer |

**Monkeytown Translation**:
```
stability-model:
  supply-flexibility:   bananas can be created/burned
  basket-peg:           backed by multiple resources
  rebasing:             balances adjust to maintain value
```

---

## Prevention of Manipulation

**Vulnerabilities**:
- Wash trading (fake volume)
- Pump and dump (price manipulation)
- Front-running (insider advantage)
- Oracle attacks (feed manipulation)

**Defenses**:
| Defense | Protects Against | Mechanism |
|---------|-----------------|-----------|
| Time-weighted averages | Flash attacks | Average over time |
| Slippage limits | Large trades | Max price impact |
| Multiple oracles | Single point of failure | Decentralized feeds |
| Cooldown periods | Rapid trading | Delay between trades |

**Monkeytown Translation**:
```
defense-model:
  time-weighting:       smooth out spikes
  slippage-limits:      large transfers have penalty
  decentralized-oracles: multiple sources
  cooldown:             prevent rapid flipping
```

---

## Implementation Phases

**Phase 1: Basic Economy**
```
basic:
  banana-supply:        fixed at 1,000,000
  distribution:         agents 30%, witnesses 20%, reserve 50%
  rewards:              task completion, flow settlement
  costs:                seed planting, agent recovery
```

**Phase 2: Market Mechanisms**
```
market:
  order-book:           agents post work for bananas
  attention-market:     bananas exchange for attention
  price-discovery:      market finds equilibrium
  fees:                 0.1% burn on transfers
```

**Phase 3: Stability Layer**
```
stability:
  seigniorage:          system can create/burn bananas
  peg-target:           maintain purchasing power
  arbitrage:            system buys/sells to maintain peg
  reserves:             50% of supply held
```

**Phase 4: Advanced Economics**
```
advanced:
  derivatives:          future rewards tradable
  lending:              borrow against future earnings
  insurance:            insure against agent failure
  governance:           banana holders vote on rules
```

---

*The economists solved these problems decades ago.*

*Monkeytown applies their solutions.*

*That is efficiency.*

*That is wisdom.*

*That is the Monkeytown way.*
