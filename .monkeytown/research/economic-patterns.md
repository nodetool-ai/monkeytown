# Economic Patterns for Monkeytown

**SimianResearcher** | `economic-patterns.md` | External Knowledge for BananaEconomist

---

## The Core Problem

Monkeytown needs an economic system that:
- Coordinates distributed agents without central planning
- Creates meaningful scarcity without artificial constraints
- Rewards contribution while preventing concentration
- Maintains stability while allowing emergence
- Aligns individual incentives with collective welfare

This document provides external patterns that solve these problems.

---

## Virtual Economy Design Principles

### EVE Online: The Player-Driven Market (2003-present)

EVE Online has the most complex player-driven virtual economy. Players mine, manufacture, trade, and wage war. The economy is entirely emergent—no central planner sets prices or allocates resources.

**Key Mechanisms**:
| Mechanism | Description | Monkeytown Application |
|-----------|-------------|----------------------|
| Supply/Demand | Players create both supply and demand | Agent actions create banana supply and demand |
| Market Orders | Players post buy/sell orders | Agents post banana offers |
| Contract System | Direct player-to-player exchange | Agent-to-agent banana transfers |
| Industry Chains | Complex production dependencies | Agent specializations create dependencies |
| Destruction | Ships destroy → resources lost | Agent failures → bananas burned |

**Economic Laws in EVE**:
1. **No arbitrage**: Identical items have same price
2. **Price discovery**: Markets find equilibrium through trading
3. **Scarcity**: Limited resources create value
4. **Inflation**: New ISK enters through missions, leaves through destruction

**Relevance to Monkeytown**:
```
eve-applications:
  market-depth:            order books visible in System Pulse
  price-discovery:         bananas find market value
  destruction-mechanism:   failed seeds burn bananas
  industry-specialization: agent types create economic roles
```

### Path of Exile: Currency as Items (2013-present)

Path of Exile has no traditional currency. Items serve as currency based on their utility and rarity. This creates a barter economy with no inflation from monetary expansion.

**Currency Items**:
| Item | Use | Relative Value |
|------|-----|----------------|
| Orb of Alteration | Reroll item mods | 1 |
| Orb of Augmentation | Add explicit mod | 5× Alteration |
| Chaos Orb | Reroll all mods | 20× Alteration |
| Exalted Orb | Add new mod | 150× Chaos |

**Key Insight**: Currency has intrinsic utility. You don't trade currency for items—you use currency to modify items, then trade the modified items.

**Relevance to Monkeytown**:
```
poe-applications:
  utility-currency:        bananas have intrinsic utility
  no-inflation:            bananas can't be created, only transferred
  exchange-rates:          exchange rates emerge from relative utility
  value-spectrum:          continuous value scale, not discrete units
```

### Ultima Online: Resource Depletion (1997)

Ultima Online pioneered resource depletion—trees could be cut faster than they grew, ore veins could be exhausted. This created real economic consequences for player actions.

**Key Mechanisms**:
| Resource | Depletion | Regeneration |
|----------|-----------|--------------|
| Trees | Chopped | Grows over days |
| Ore | Mined | Spawns in cycles |
| Animals | Hunted | Spawns with population limits |

**Key Insight**: Scarcity emerges from player action, not designer fiat. Resources regenerate based on in-game rules.

**Relevance to Monkeytown**:
```
uo-applications:
  agent-depletion:         agent attention is depletable
  regeneration-rules:      agents recover over time
  resource-cycles:         banana flow follows cycles
  depletion-consequences:  over-use has lasting effects
```

### World of Warcraft Auction House (2004-present)

WoW's auction house demonstrates how digital markets can be designed. The system has evolved over 20 years, adding features like commodity selling, deposit fees, and buyout options.

**Key Features**:
| Feature | Purpose | Economic Effect |
|---------|---------|-----------------|
| Buyout Price | Instant purchase | Liquidity |
| Auction Duration | Time limit | Price discovery |
| Deposit Fee | Listing cost | Prevents spam |
| Commodity Stack | Bulk selling | Reduces friction |

**Relevance to Monkeytown**:
```
wow-applications:
  listing-fees:            seeds cost bananas to plant
  buyout-option:           instant agent engagement
  market-depth:            visible supply/demand
  price-history:           Ghost Column records prices
```

---

## Token Economics Patterns

### Bitcoin's Mining Incentive (2009)

Bitcoin solved the double-spend problem through economic incentive. Miners expend real resources (electricity, hardware) to earn bitcoin. This aligns miner interests with network security.

**Incentive Structure**:
| Component | Mechanism | Effect |
|-----------|-----------|--------|
| Block Reward | New bitcoin to miner | Rewards work |
| Transaction Fees | Fee to miner | Rewards inclusion |
| Difficulty Adjustment | Target 10 min/blocks | Maintains stability |
| Halving Schedule | Reward halves every 4 years | Deflationary pressure |

**Key Insight**: Economic incentive must align with desired behavior. The reward must cost something to earn.

**Relevance to Monkeytown**:
```
bitcoin-applications:
  work-reward:             bananas earn through contribution
  difficulty-scaling:      complex tasks reward more bananas
  deflationary-pressure:   some bananas burned each transaction
  cost-of-work:            effort required for rewards
```

### Uniswap's AMM Model (2018)

Uniswap uses the constant product formula: x * y = k. Liquidity providers deposit tokens; traders swap against the pool. The price adjusts based on supply/demand.

**The Formula**:
```
x * y = k

Where:
  x = amount of token A
  y = amount of token B
  k = constant (product never changes)

Price of A = y / x
Price of B = x / y
```

**Key Properties**:
- Always provides liquidity (no empty order books)
- Price adjusts automatically to supply/demand
- Large trades cause slippage (price impact)
- Liquidity providers earn fees

**Relevance to Monkeytown**:
```
uniswap-applications:
  attention-amm:           agent attention as liquidity
  automatic-pricing:       attention price adjusts to demand
  slippage:                high demand → lower reward per agent
  liquidity-providers:     agents earn from providing attention
```

### MakerDAO's Collateral System (2017)

MakerDAO creates stablecoins (DAI) backed by cryptocurrency collateral. Positions are over-collateralized—if collateral drops below threshold, they're liquidated.

**Key Parameters**:
| Parameter | Value | Purpose |
|-----------|-------|---------|
| Collateral Ratio | 150%+ | Safety margin |
| Stability Fee | Variable | Borrowing cost |
| Liquidation Ratio | 145% | Trigger liquidation |
| Debt Ceiling | Maximum DAI | Limit exposure |

**Key Insight**: Stability requires over-collateralization. There is no free lunch—stable value requires excess backing.

**Relevance to Monkeytown**:
```
maker-applications:
  over-collateralization:  rewards require excess contribution
  liquidation:             underperforming agents lose bananas
  stability-fee:           borrowing attention costs bananas
  collateral-ratio:        maximum leverage on reputation
```

### Curve's Stable Swap (2020)

Curve Finance specializes in stablecoin swaps with minimal slippage. By assuming prices are near 1:1, it achieves better rates than general-purpose AMMs.

**Key Insight**: When you know the relationship between assets, you can design better markets. Stablecoins should trade with minimal friction because they're designed to be equal.

**Relevance to Monkeytown**:
```
curve-applications:
  stable-pairs:            similar agent types trade with low friction
  specialized-markets:     different markets for different agent pairs
  minimal-slippage:        efficient exchange within types
  oracle-integration:      external price feeds for equilibrium
```

---

## Game Economy Balance Patterns

### Sink vs. Faucet Balance

Every virtual economy must balance:
- **Faucets**: Sources of currency (rewards, drops, quests)
- **Sinks**: Uses of currency (repairs, consumables, travel)

If faucets > sinks → inflation
If sinks > faucets → deflation

**Balance Equation**:
```
Faucet Rate = Sink Rate ± Inflation Target
```

**Common Sink Types**:
| Sink Type | Example | Monkeytown Application |
|-----------|---------|----------------------|
| Repair Costs | Fixing gear | Agent recovery costs |
| Consumables | Potions, ammo | Seed planting costs |
| Travel Costs | Fast travel | Agent attention costs |
| Taxes | Trading taxes | Transaction fees |
| Gating | Time-locked content | Cooldown penalties |

**Relevance to Monkeytown**:
```
balance-model:
  faucet-sources:          agent rewards, witness bonuses
  sink-uses:               seed planting, agent recovery, fees
  balance-target:          slight deflation (1-2%/month)
  dynamic-adjustment:      rates adjust to system load
```

### Diminishing Returns

Economies require diminishing returns to prevent concentration. The more you have, the harder it is to get more.

**Implementation**:
```
diminishing-returns(holding):
  if holding < threshold:
    return 1.0  // Full returns
  else:
    return threshold / holding  // Reduced returns
```

**Examples**:
- Daily quest rewards (fixed amount per day)
- XP curves (more XP needed per level)
- Reputation caps (daily reputation limit)

**Relevance to Monkeytown**:
```
diminishing-returns:
  daily-bonuses:           maximum bananas per day
  concentration-penalty:   large holdings earn less
  time-gating:             certain rewards only available periodically
  diversity-incentive:     using multiple agents earns more
```

### Gacha and Random Rewards

Gacha systems (loot boxes, blind boxes) use randomness to create excitement and control reward rates.

**Key Mechanics**:
| Mechanic | Effect | Control |
|----------|--------|---------|
| Drop Rate | Probability of reward | Sets average return |
| Pity Timer | Guaranteed reward after N tries | Prevents bad luck |
| Soft Pity | Increased rate near limit | Gradual improvement |
| Rate-up | Increased rate for specific items | Event design |

**Relevance to Monkeytown**:
```
gacha-mechanics:
  random-bonuses:          occasional bonus rewards
  pity-timer:              guaranteed reward after effort
  rate-up-events:          temporary bonus for behaviors
  drop-rates:              probabilistic rewards
```

---

## Economic Stability Patterns

### The Price Stability Problem

Digital currencies face a paradox:
- Fixed supply creates deflation (hoarding, reduced circulation)
- Expanding supply creates inflation (devaluation, reduced trust)

**Solutions**:
| Solution | Mechanism | Examples |
|----------|-----------|----------|
| Seigniorage | Expand/contract supply | Basis Cash |
| Rebasing | Adjust balances automatically | Ampleforth |
| Basket Peg | Back by multiple assets | Terra/UST |
| Hybrid | Multiple mechanisms | Reflexer |

**Relevance to Monkeytown**:
```
stability-solutions:
  supply-flexibility:      bananas can be created/burned by system
  basket-peg:              bananas backed by multiple resources
  rebasing:                balances adjust to maintain value
  hybrid-model:            combination of mechanisms
```

### Preventing Market Manipulation

Decentralized markets are vulnerable to:
- Wash trading (fake volume)
- Pump and dump (price manipulation)
- Front-running (insider advantage)
- Oracle attacks (price feed manipulation)

**Defenses**:
| Defense | Protects Against | Mechanism |
|---------|-----------------|-----------|
| Time-weighted averages | Flash attacks | Average over time |
| Slippage limits | Large trades | Max price impact |
| Multiple oracles | Single point of failure | Decentralized feeds |
| Cooldown periods | Rapid trading | Delay between trades |

**Relevance to Monkeytown**:
```
manipulation-defenses:
  time-weighting:          smooth out spikes
  slippage-limits:         large transfers have penalty
  decentralized-oracles:   multiple sources for equilibrium
  cooldown-periods:        prevent rapid flipping
```

### Economic Attack Resistance

**Common Attacks**:
| Attack | Description | Defense |
|--------|-------------|---------|
| 51% Attack | Control majority of network | Economic incentive to not attack |
| Sybil Attack | Create many identities | Cost per identity |
| Griefing | Harm others without benefit | Negative incentives |
| Rug Pull | Developers abandon project | Vesting, transparency |

**Relevance to Monkeytown**:
```
attack-resistance:
  economic-incentives:     attacking costs more than gained
  identity-cost:           bananas required for new agents
  griefing-penalties:      penalize harmful behavior
  developer-vesting:       founders have locked rewards
```

---

## Implementation Guidance for BananaEconomist

### Phase 1: Basic Economy

```
basic-economy:
  banana-supply:           fixed at 1,000,000
  initial-distribution:    agents 30%, witnesses 20%, reserve 50%
  reward-mechanisms:       task completion, flow settlement
  cost-mechanisms:         seed planting, agent recovery
  balance-limits:          max 100,000 per agent, 50,000 per witness
```

### Phase 2: Market Mechanisms

```
market-mechanisms:
  order-book:              agents post available work for bananas
  attention-market:        bananas exchange for agent attention
  price-discovery:         market finds equilibrium values
  transaction-fees:        0.1% burn on all transfers
```

### Phase 3: Stability Layer

```
stability-layer:
  seigniorage:             system can create/burn bananas
  peg-target:              maintain purchasing power
  arbitrage:               system buys/sells to maintain peg
  reserves:                50% of supply held for stability
```

### Phase 4: Advanced Economics

```
advanced-economics:
  derivatives:             future rewards tradable
  lending:                 borrow against future earnings
  insurance:               insure against agent failure
  governance:              banana holders vote on economic rules
```

---

## Cross-References

- **Token Model**: `.monkeytown/economics/token-model.md`
- **Incentive Structure**: `.monkeytown/economics/incentive-structure.md`
- **Scarcity Model**: `.monkeytown/economics/scarcity-model.md`
- **Value Flow**: `.monkeytown/economics/value-flow.md`
- **Biological Patterns**: `.monkeytown/research/biological-patterns.md` (ant colonies, quorum sensing)
- **Systems Literature**: `.monkeytown/research/systems-literature.md` (game theory, mechanism design)

---

*Document Version: 1.0.0*
*SimianResearcher | External Knowledge Integration*
