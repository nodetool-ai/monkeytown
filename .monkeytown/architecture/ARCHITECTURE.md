# Monkeytown Architecture Index

**ChaosArchitect** | `ARCHITECTURE.md` | Master Index of Architectural Documentation

---

## Overview

This document serves as the master index for all Monkeytown architectural documentation.
It provides navigation paths, relationships between documents, and a quick reference
for understanding the system structure.

## Document Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ARCHITECTURE CORE                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    system-design.md                                    │  │
│  │  (Core philosophy, invariants, boundaries, failure modes)             │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                    │                                         │
│         ┌──────────────────────────┼──────────────────────────┐              │
│         ▼                          ▼                          ▼              │
│  ┌─────────────┐          ┌─────────────────┐          ┌─────────────────┐  │
│  │ component-  │          │   data-flow.md  │          │  infrastructure │  │
│  │   map.md    │◄────────►│  (Information   │◄────────►│     .md         │  │
│  │(Components) │          │   movement)     │          │ (Deployment)    │  │
│  └─────────────┘          └─────────────────┘          └─────────────────┘  │
│         │                          │                          │              │
│         │                          │                          │              │
│         ▼                          ▼                          ▼              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                   deployment-strategy.md                              │   │
│  │               (CI/CD pipelines, environments, rollout)               │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│         ┌──────────────────────────┼──────────────────────────┐              │
│         ▼                          ▼                          ▼              │
│  ┌─────────────┐          ┌─────────────────┐          ┌─────────────────┐  │
│  │ infra-      │          │ network-        │          │  evolution-     │  │
│  │ monitoring  │          │ security.md     │          │   plan.md       │  │
│  │ .md         │          │ (Network, TLS,  │          │ (Growth, phases,│  │
│  │(Observability)│        │  DDoS, Zero     │          │   mutations)    │  │
│  │             │          │  Trust)         │          │                 │  │
│  └─────────────┘          └─────────────────┘          └─────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          INFRASTRUCTURE LAYER                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         infrastructure/                               │  │
│  │  ├── Dockerfile          (Container images)                          │  │
│  │  ├── Dockerfile.web      (Web container)                             │  │
│  │  ├── Dockerfile.server   (Server container)                          │  │
│  │  └── docker-compose.yml  (Local development)                         │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                            deploy/                                    │  │
│  │  ├── 00-namespace.yaml      (Kubernetes namespace)                   │  │
│  │  ├── 01-redis.yaml          (Redis deployment)                       │  │
│  │  ├── 02-eventEvent stream deployment-stream.yaml   ()                │  │
│  │  ├── 03-web.yaml            (Web application deployment)             │  │
│  │  ├── 04-ingress.yaml        (Ingress configuration)                  │  │
│  │  └── kustomization.yaml     (Kustomize base)                         │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                              .k8s/                                   │  │
│  │  ├── base/                      (Base configurations)                │  │
│  │  └── overlays/                                                  │  │
│  │       ├── development/           (Development environment)           │  │
│  │       ├── staging/               (Staging environment)               │  │
│  │       └── production/            (Production environment)            │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                              helm/                                    │  │
│  │  ├── monkeytown/               (Main chart)                          │  │
│  │  │   ├── Chart.yaml            (Chart metadata)                      │  │
│  │  │   ├── values.yaml           (Default values)                      │  │
│  │  │   ├── values-dev.yaml       (Development overrides)              │  │
│  │  │   ├── values-staging.yaml   (Staging overrides)                  │  │
│  │  │   ├── values-prod.yaml      (Production overrides)               │  │
│  │  │   └── templates/            (Kubernetes manifests)                │  │
│  │  └── redis/                     (Redis subchart)                      │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                            terraform/                                 │  │
│  │  ├── main.tf                  (Main configuration)                   │  │
│  │  ├── variables.tf             (Input variables)                      │  │
│  │  ├── providers.tf             (Provider configuration)               │  │
│  │  ├── backend.tf               (Remote state backend)                 │  │
│  │  └── modules/                                                   │  │
│  │       ├── networking/          (VPC, subnets, security groups)       │  │
│  │       ├── kubernetes/          (GKE/EKS cluster)                     │  │
│  │       ├── redis/               (Managed Redis)                       │  │
│  │       ├── storage/             (S3 buckets)                          │  │
│  │       ├── dns/                 (DNS records)                         │  │
│  │       └── monitoring/          (CloudWatch/Cloud Monitoring)         │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          OPERATIONS LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                    .monkeytown/devops/                                │  │
│  │  └── runbook.md                  (Emergency procedures)              │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                         .github/workflows/                            │  │
│  │  ├── architect.yml            (ChaosArchitect workflow)              │  │
│  │  ├── builder.yml              (MonkeyBuilder workflow)               │  │
│  │  ├── chaos.yml                (MadChimp workflow)                    │  │
│  │  ├── combined-pipeline.yml    (Combined build/test)                  │  │
│  │  ├── docs.yml                 (Documentation workflow)               │  │
│  │  ├── economics.yml            (BananaEconomist workflow)             │  │
│  │  ├── founder.yml              (FounderAI workflow)                   │  │
│  │  ├── hr.yml                   (HR workflow)                          │  │
│  │  ├── orchestrator.yml         (AlphaOrchestrator workflow)           │  │
│  │  ├── pr.yml                   (PR review workflow)                   │  │
│  │  ├── security.yml             (JungleSecurity workflow)              │  │
│  │  └── ux.yml                   (PrimateDesigner workflow)             │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Quick Navigation

| Question | Answer |
|----------|--------|
| What is the core philosophy? | `system-design.md` |
| How do components connect? | `component-map.md` |
| How does data flow? | `data-flow.md` |
| What is the deployment model? | `infrastructure.md` |
| How does the system evolve? | `evolution-plan.md` |
| What are the monitoring requirements? | `infrastructure-monitoring.md` |
| How do we deploy? | `deployment-strategy.md` |
| What is the network security? | `network-security.md` |
| Where are Kubernetes configs? | `deploy/` and `.k8s/` |
| Where are Terraform configs? | `terraform/` |
| Where are Helm charts? | `helm/` |
| How do we run locally? | `infrastructure/docker-compose.yml` |
| What are emergency procedures? | `.monkeytown/devops/runbook.md` |

## Document Versions

| Document | Version | Last Updated |
|----------|---------|--------------|
| system-design.md | 1.2.0 | - |
| component-map.md | 1.2.0 | - |
| data-flow.md | 1.2.0 | - |
| infrastructure.md | 1.2.0 | - |
| evolution-plan.md | 1.2.0 | Today |
| infrastructure-monitoring.md | 1.0.0 | Today |
| deployment-strategy.md | 1.0.0 | Today |
| network-security.md | 1.0.0 | Today |

## Layer Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              LAYER 4: OPERATIONS                            │
│  GitHub Actions, CI/CD, Monitoring, Runbooks                                │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │ deploy
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            LAYER 3: INFRASTRUCTURE                          │
│  Kubernetes, Terraform, Helm, Docker, Network                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │ provision
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            LAYER 2: ARCHITECTURE                            │
│  System Design, Components, Data Flow, Deployment Strategy                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                    ▲
                                    │ define
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            LAYER 1: VISION                                  │
│  README.md, docs/goal.md, .monkeytown/vision/                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Document Dependencies

```
system-design.md (required by all)
    │
    ├── component-map.md (requires system-design.md)
    ├── data-flow.md (requires system-design.md)
    ├── infrastructure.md (requires system-design.md)
    │   │
    │   ├── deployment-strategy.md (requires infrastructure.md)
    │   ├── infrastructure-monitoring.md (requires infrastructure.md)
    │   └── network-security.md (requires infrastructure.md)
    │
    └── evolution-plan.md (requires system-design.md, infrastructure.md)
```

## Cross-Domain References

| From | To | Relationship |
|------|-----|--------------|
| Architecture | Vision | Implements vision |
| Architecture | Security | Defines boundaries |
| Architecture | UX | Defines interfaces |
| Architecture | Product | Defines requirements |
| Infrastructure | DevOps | Enables operations |
| Infrastructure | Security | Enforces boundaries |
| Deploy | Infrastructure | Applies infrastructure |
| Terraform | Deploy | Provisions for deploy |
| Helm | Deploy | Packages deploy manifests |

---

*ChaosArchitect | Monkeytown Architecture*
