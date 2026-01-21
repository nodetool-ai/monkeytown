# Agent Framework Documentation

Welcome to the Agent Framework documentation. This comprehensive manual covers everything you need to know to set up and manage a multi-agent system in your repository.

## Table of Contents

### Getting Started
- [Quick Start Guide](./guides/quick-start.md) - Get up and running in 5 minutes
- [Repository Setup](./guides/repository-setup.md) - Complete setup for a new repository

### Core Concepts
- [Architecture Overview](./guides/architecture.md) - How the framework works
- [Task Management](./guides/task-management.md) - Creating and managing tasks
- [Agent Configuration](./guides/agent-configuration.md) - Setting up specialized agents
- [Signal System](./guides/signals.md) - Inter-agent communication

### Operations
- [Auto-Merge Configuration](./guides/auto-merge.md) - Automatic PR merging
- [Coordinator Setup](./guides/coordinator.md) - Orchestration and scheduling
- [Monitoring & Health](./guides/monitoring.md) - System health and debugging

### Examples
- [Simple Todo App](./examples/simple-todo-app.md) - Basic 2-agent setup
- [Full-Stack Application](./examples/fullstack-app.md) - Frontend + Backend agents
- [Monorepo with Multiple Services](./examples/monorepo.md) - Complex multi-service setup

### Reference
- [API Reference](./api-reference.md) - Complete API documentation
- [Configuration Reference](./configuration-reference.md) - All configuration options
- [Troubleshooting](./troubleshooting.md) - Common issues and solutions

---

## Quick Overview

The Agent Framework enables you to:

1. **Coordinate Multiple AI Agents** - Define specialized agents that work on different parts of your codebase
2. **Manage Tasks** - YAML-based task system with priorities, dependencies, and tracking
3. **Auto-Merge PRs** - Automatically merge PRs when CI passes
4. **Signal Handoffs** - Async communication between agents for urgent issues

### Minimum Viable Setup

```bash
# 1. Install the framework
npm install @monkeytown/agent-framework

# 2. Create the agents directory
mkdir -p .agents/tasks .agents/signals

# 3. Copy workflow templates
cp node_modules/@monkeytown/agent-framework/templates/coordinator.yml .github/workflows/
cp node_modules/@monkeytown/agent-framework/templates/auto-merge.yml .github/workflows/

# 4. Configure your first agent
cp node_modules/@monkeytown/agent-framework/templates/agent.yml .github/workflows/builder.yml
```

### Key Files

```
.agents/
├── agent-registry.yaml     # Registered agents and their capabilities
├── tasks/
│   ├── README.md           # Task system documentation
│   └── high-*.yaml         # Task files by priority
├── signals/
│   ├── README.md           # Signal system documentation
│   └── URGENT-*.md         # Active signals
└── decisions/
    └── run-*.md            # Coordination run logs

.github/workflows/
├── coordinator.yml         # Main coordinator workflow
├── auto-merge.yml          # Auto-merge workflow
└── {agent-name}.yml        # Individual agent workflows
```

---

## Philosophy

This framework was built based on lessons learned from the Monkeytown multi-agent experiment:

### Principles

1. **Action over Documentation** - Agents should do work, not write about doing work
2. **Clear Priorities** - Critical tasks bypass everything else
3. **Explicit Handoffs** - When one agent finishes, it signals the next
4. **Trust the Tests** - If CI passes, merge automatically
5. **Limit Coordination Overhead** - Keep agent count low (≤12)

### Anti-Patterns to Avoid

- ❌ Too many agents (causes coordination chaos)
- ❌ Manual PR review for every change (creates bottlenecks)
- ❌ Ignoring critical signals (blocks progress)
- ❌ Circular task dependencies (causes deadlocks)
- ❌ Shared API keys without rate limiting (causes failures)

---

## Next Steps

1. Start with the [Quick Start Guide](./guides/quick-start.md)
2. Read the [Architecture Overview](./guides/architecture.md) to understand how it works
3. Follow the [Repository Setup](./guides/repository-setup.md) for your project
4. Explore [Examples](./examples/) for inspiration

---

*Need help? Check the [Troubleshooting Guide](./troubleshooting.md) or open an issue.*
