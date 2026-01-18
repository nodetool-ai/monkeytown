# Network Security Configuration

**ChaosArchitect** | `network-security.md` | Network Topology, Firewall Rules, and Security Boundaries

---

## 1. Network Topology

### 1.1 Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              INTERNET                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            CDN / WAF                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Cloudflare / CloudFront                                            │   │
│  │  - DDoS protection                                                  │   │
│  │  - WAF rules                                                        │   │
│  │  - Rate limiting                                                    │   │
│  │  - SSL/TLS termination                                              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LOAD BALANCER / INGRESS                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  ALB / NLB / Nginx Ingress                                          │   │
│  │  - Path-based routing                                               │   │
│  │  - Health checks                                                    │   │
│  │  - SSL passthrough                                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
          ┌────────────────┐ ┌────────────────┐ ┌────────────────┐
          │   K8s Cluster  │ │   K8s Cluster  │ │   K8s Cluster  │
          │   (Primary)    │ │   (Secondary)  │ │    (DR)        │
          └────────────────┘ └────────────────┘ └────────────────┘
                    │               │               │
                    └───────────────┼───────────────┘
                                    ▼
                          ┌────────────────┐
                          │   Data Layer   │
                          │  (Redis/DB)    │
                          └────────────────┘
```

### 1.2 VPC Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                VPC (10.0.0.0/16)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      PUBLIC SUBNETS (10.0.1.0/24, 10.0.2.0/24)      │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │   │
│  │  │  ALB Node 1  │  │  ALB Node 2  │  │  ALB Node 3  │              │   │
│  │  │  10.0.1.10   │  │  10.0.1.11   │  │  10.0.2.10   │              │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘              │   │
│  │                                                                     │   │
│  │  Internet Gateway ←→ ALB ←→ NAT Gateway (egress only)              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                   PRIVATE SUBNETS (10.0.10.0/24, 10.0.20.0/24)      │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                    K8s Worker Nodes                          │   │   │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │   │   │
│  │  │  │ Node 1  │ │ Node 2  │ │ Node 3  │ │ Node 4  │           │   │   │
│  │  │  │10.0.10.x│ │10.0.10.x│ │10.0.20.x│ │10.0.20.x│           │   │   │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  │                                                                     │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                    K8s Services (ClusterIP)                  │   │   │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │   │   │
│  │  │  │   Web   │ │EventSvc │ │  Redis  │ │   DB    │           │   │   │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                   DATA SUBNETS (10.0.100.0/24, 10.0.200.0/24)       │   │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                   │   │
│  │  │RedisPrimary│ │RedisReplica│ │  DB  │ │ Backup │                   │   │
│  │  │ 10.0.100.x│ │ 10.0.100.x│ │10.0.200.x│ │10.0.200.x│               │   │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Firewall Rules

### 2.1 Security Groups

#### Web Security Group

```yaml
# security-group-web.yaml
apiVersion: vpcresources.k8s.io/v1beta1
kind: SecurityGroup
metadata:
  name: monkeytown-web-sg
spec:
  ingressRules:
    - ipProtocol: tcp
      fromPort: 3000
      toPort: 3000
      description: "HTTP from ALB"
      sourceSecurityGroupId: sg-alb  # ALB security group
    
    - ipProtocol: tcp
      fromPort: 443
      toPort: 443
      description: "HTTPS from ALB"
      sourceSecurityGroupId: sg-alb
    
    - ipProtocol: tcp
      fromPort: 22
      toPort: 22
      description: "SSH for运维 (restricted)"
      cidrBlocks:
        - 10.0.0.0/8  # VPC internal only
  
  egressRules:
    - ipProtocol: tcp
      fromPort: 8080
      toPort: 8080
      description: "Connect to event-stream"
      destinationSecurityGroupId: sg-event-stream
    
    - ipProtocol: tcp
      fromPort: 443
      toPort: 443
      description: "HTTPS outbound"
      cidrBlocks:
        - 0.0.0.0/0
```

#### Event Stream Security Group

```yaml
# security-group-event-stream.yaml
apiVersion: vpcresources.k8s.io/v1beta1
kind: SecurityGroup
metadata:
  name: monkeytown-event-stream-sg
spec:
  ingressRules:
    - ipProtocol: tcp
      fromPort: 8080
      toPort: 8080
      description: "WebSocket from web"
      sourceSecurityGroupId: sg-web
    
    - ipProtocol: tcp
      fromPort: 6379
      toPort: 6379
      description: "Redis connection"
      sourceSecurityGroupId: sg-redis
  
  egressRules:
    - ipProtocol: tcp
      fromPort: 6379
      toPort: 6379
      description: "Connect to Redis"
      destinationSecurityGroupId: sg-redis
    
    - ipProtocol: tcp
      fromPort: 443
      toPort: 443
      description: "GitHub API"
      cidrBlocks:
        - 0.0.0.0/0  # GitHub requires external access
```

#### Redis Security Group

```yaml
# security-group-redis.yaml
apiVersion: vpcresources.k8s.io/v1beta1
kind: SecurityGroup
metadata:
  name: monkeytown-redis-sg
spec:
  ingressRules:
    - ipProtocol: tcp
      fromPort: 6379
      toPort: 6379
      description: "Redis from event-stream"
      sourceSecurityGroupId: sg-event-stream
    
    - ipProtocol: tcp
      fromPort: 6379
      toPort: 6379
      description: "Redis from web (health checks)"
      sourceSecurityGroupId: sg-web
  
  egressRules:
    - ipProtocol: tcp
      fromPort: 443
      toPort: 443
      description: "AWS ElastiCache endpoint (internal)"
      cidrBlocks:
        - 10.0.0.0/16  # VPC internal only
```

### 2.2 Network ACLs

```yaml
# network-acl-public.yaml
apiVersion: vpcresources.k8s.io/v1beta1
kind: NetworkAcl
metadata:
  name: monkeytown-public-acl
spec:
  ingressRules:
    - ruleNumber: 100
      ipProtocol: tcp
      fromPort: 80
      toPort: 80
      cidrBlock: 0.0.0.0/0
      ruleAction: allow
    
    - ruleNumber: 101
      ipProtocol: tcp
      fromPort: 443
      toPort: 443
      cidrBlock: 0.0.0.0/0
      ruleAction: allow
  
  egressRules:
    - ruleNumber: 100
      ipProtocol: tcp
      fromPort: 1024
      toPort: 65535
      cidrBlock: 0.0.0.0/0
      ruleAction: allow
```

### 2.3 Firewall Rule Summary

| Source | Destination | Port | Protocol | Purpose |
|--------|-------------|------|----------|---------|
| Internet | ALB | 443 | TCP | HTTPS access |
| ALB | Web | 3000 | TCP | Internal routing |
| Web | Event Stream | 8080 | TCP | Event publishing |
| Event Stream | Redis | 6379 | TCP | Event persistence |
| Web | Redis | 6379 | TCP | Health checks |
| Workers | GitHub | 443 | TCP | Agent operations |
| Workers | npm registry | 443 | TCP | Dependency fetch |
| Web | External APIs | 443 | TCP | Witness requests |

---

## 3. Zero Trust Architecture

### 3.1 Trust Boundaries

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│                         EXTERNAL ZONE (Untrusted)                            │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Internet → WAF → CDN → Rate Limiter                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼ (mTLS required)                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      DMZ ZONE (Semi-Trusted)                        │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │  ALB with mutual TLS                                        │   │   │
│  │  │  - Client certificate verification                          │   │   │
│  │  │  - SNI-based routing                                        │   │   │
│  │  │  - Request validation                                       │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                         │
│                                    ▼ (Service mesh authentication)           │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                     SERVICE ZONE (Trusted)                          │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐              │   │
│  │  │   Web   │─►│EventSvc │─►│  Redis  │  │   DB    │              │   │
│  │  │         │  │         │  │         │  │         │              │   │
│  │  │ SPIFFE  │  │ SPIFFE  │  │ SPIFFE  │  │ SPIFFE  │              │   │
│  │  │   ID    │  │   ID    │  │   ID    │  │   ID    │              │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘              │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Service Mesh Configuration

```yaml
# istio/peer-authentication.yaml
apiVersion: security.istio.io/v1beta1
kind: PeerAuthentication
metadata:
  name: monkeytown-mtls
  namespace: monkeytown-prod
spec:
  mtls:
    mode: STRICT
---
# istio/authorization-policy.yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: event-stream-policy
  namespace: monkeytown-prod
spec:
  selector:
    matchLabels:
      app.kubernetes.io/name: event-stream
  action: ALLOW
  rules:
    - from:
        - source:
            principals: ["cluster.local/ns/monkeytown-prod/sa/web"]
        - source:
            principals: ["cluster.local/ns/monkeytown-prod/sa/event-stream"]
    - to:
        - operation:
            ports: ["8080"]
```

---

## 4. DDoS Protection

### 4.1 CDN/WAF Rules

```json
{
  "rules": [
    {
      "name": "Block-SQL-Injection",
      "action": "block",
      "conditions": [
        {
          "field": "uri",
          "match": "contains",
          "value": "'"
        },
        {
          "field": "uri",
          "match": "contains",
          "value": "UNION SELECT"
        }
      ]
    },
    {
      "name": "Rate-Limit- Witnesses",
      "action": "count",
      "conditions": [
        {
          "field": "ip",
          "rateLimit": {
            "count": 100,
            "period": "minute"
          }
        }
      ]
    },
    {
      "name": "Block-Known-Bad-IPs",
      "action": "block",
      "conditions": [
        {
          "field": "ip",
          "match": "in-list",
          "value": "blocked-ips.txt"
        }
      ]
    }
  ]
}
```

### 4.2 Rate Limiting Configuration

```yaml
# Rate limiting tiers
rateLimits:
  anonymous:
    requestsPerMinute: 60
    burstSize: 10
  
  authenticated:
    requestsPerMinute: 300
    burstSize: 50
  
  witness:
    requestsPerMinute: 1000
    burstSize: 100
  
  agent:
    requestsPerMinute: 600
    burstSize: 100
```

---

## 5. TLS Configuration

### 5.1 Certificate Requirements

| Component | Certificate Type | Rotation |
|-----------|-----------------|----------|
| ALB | AWS ACM (RSA 2048) | 90 days |
| Service mesh | SPIFFE/SVID | 24 hours |
| GitHub Actions | Self-hosted runner | 30 days |

### 5.2 TLS Security Profile

```yaml
# TLS configuration for ALB
tls:
  minimumProtocolVersion: TLSv1.2
  cipherSuites:
    - "ECDHE-ECDSA-AES128-GCM-SHA256"
    - "ECDHE-RSA-AES128-GCM-SHA256"
    - "ECDHE-ECDSA-AES256-GCM-SHA384"
    - "ECDHE-RSA-AES256-GCM-SHA384"
  options:
    ALBAllowHttp10: false
    ALBRedirectHTTPToHTTPS: true
```

---

## 6. Cross-References

- **Architecture**: `.monkeytown/architecture/system-design.md` (security boundaries)
- **Architecture**: `.monkeytown/architecture/infrastructure.md` (service topology)
- **Security**: `.monkeytown/security/threat-model.md` (threat modeling)
- **Security**: `.monkeytown/security/security-requirements.md` (security requirements)
- **Deploy**: `deploy/04-ingress.yaml` (ingress configuration)
- **Terraform**: `terraform/modules/networking/` (VPC configuration)

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Infrastructure*
