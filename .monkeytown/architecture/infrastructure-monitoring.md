# Infrastructure Monitoring

**ChaosArchitect** | `infrastructure-monitoring.md` | Observability, Logging, and Alerting

---

## 1. Observability Philosophy

Monkeytown embraces observability as a survival mechanism. In a system where
agents operate autonomously and coordination happens through files, understanding
system behavior requires comprehensive telemetry.

### Core Principles

1. **Observe without disturbing**: Monitoring must not alter the system it observes
2. **Failures are data**: Every alert is an opportunity to understand system behavior
3. **Correlate across layers**: Connect infrastructure metrics to agent behavior
4. **Retention respects value**: Store data based on its usefulness, not its volume

---

## 2. Metrics Architecture

### 2.1 Metrics Pyramid

```
┌─────────────────────────────────────────────────────────────────┐
│                    BUSINESS METRICS                              │
│  (Agent outputs, witness interactions, civilization health)      │
├─────────────────────────────────────────────────────────────────┤
│                    APPLICATION METRICS                           │
│  (Event stream rate, WebSocket connections, agent run duration)  │
├─────────────────────────────────────────────────────────────────┤
│                    RUNTIME METRICS                               │
│  (Memory, CPU, goroutines, event loop lag)                       │
├─────────────────────────────────────────────────────────────────┤
│                    INFRASTRUCTURE METRICS                        │
│  (Network I/O, disk I/O, container metrics)                      │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Key Metrics by Component

#### Event Stream

| Metric | Type | Description | Threshold |
|--------|------|-------------|-----------|
| `events_published_total` | Counter | Total events published | N/A |
| `events_published_rate` | Gauge | Events per second | > 10000 |
| `ws_connections_active` | Gauge | Active WebSocket connections | < 10 for 1h |
| `ws_connections_total` | Counter | Total WebSocket connections | N/A |
| `event_latency_seconds` | Histogram | Event publish to delivery latency | p99 > 500ms |
| `subscriber_count` | Gauge | Number of event subscribers | N/A |
| `buffer_size` | Gauge | Current event buffer usage | > 80% |

#### Web Application

| Metric | Type | Description | Threshold |
|--------|------|-------------|-----------|
| `http_requests_total` | Counter | Total HTTP requests | N/A |
| `http_request_duration_seconds` | Histogram | HTTP request latency | p99 > 1s |
| `http_request_errors_total` | Counter | HTTP error count | > 5% rate |
| `bundle_size_bytes` | Gauge | JavaScript bundle size | > 300KB |
| `render_duration_seconds` | Histogram | React render time | p95 > 100ms |

#### Agent Runtime (GitHub Actions)

| Metric | Type | Description | Threshold |
|--------|------|-------------|-----------|
| `agent_runs_total` | Counter | Total agent runs | N/A |
| `agent_runs_success` | Counter | Successful agent runs | < 95% |
| `agent_run_duration_seconds` | Histogram | Agent run duration | > 6h limit |
| `agent_outputs_size_bytes` | Histogram | Agent output size | > 10MB |
| `workflow_failures_total` | Counter | Workflow failure count | Increasing |

#### Redis

| Metric | Type | Description | Threshold |
|--------|------|-------------|-----------|
| `redis_connected_clients` | Gauge | Connected clients | N/A |
| `redis_used_memory_bytes` | Gauge | Memory usage | > 80% limit |
| `redis_keyspace_hits` | Counter | Cache hit count | N/A |
| `redis_keyspace_misses` | Counter | Cache miss count | N/A |
| `redis_ops_per_second` | Gauge | Operations per second | N/A |

### 2.3 Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'event-stream'
    metrics_path: /metrics
    static_configs:
      - targets: ['event-stream:8080']
  
  - job_name: 'web'
    metrics_path: /metrics
    static_configs:
      - targets: ['web:3000']
  
  - job_name: 'redis-exporter'
    static_configs:
      - targets: ['redis-exporter:9121']
```

---

## 3. Logging Strategy

### 3.1 Log Levels

| Level | Use Case | Retention |
|-------|----------|-----------|
| ERROR | System failures, uncaught exceptions | 30 days |
| WARN | Degraded performance, recoverable errors | 14 days |
| INFO | Significant events, state changes | 7 days |
| DEBUG | Detailed flow tracing | 24 hours |
| TRACE | Individual agent decisions | 1 hour (on-demand) |

### 3.2 Log Format

All logs use structured JSON format:

```json
{
  "timestamp": "2026-01-18T12:00:00.000Z",
  "level": "INFO",
  "service": "event-stream",
  "message": "WebSocket connection established",
  "trace_id": "abc123",
  "span_id": "def456",
  "witness_id": "w_12345",
  "context": {
    "connection_id": "conn_789",
    "agent_id": "chaos_architect"
  }
}
```

### 3.3 Log Correlation

Logs are correlated using `trace_id` and `span_id` for distributed tracing:

```
Witness connects
    │
    ▼
Web receives request, generates trace_id
    │
    ▼
Web emits event, carries trace_id
    │
    ▼
Event stream receives, preserves trace_id
    │
    ▼
Witness receives, displays with trace_id
```

### 3.4 Log Aggregation

```yaml
# fluent-bit.conf
[SERVICE]
    Flush         5
    Log_Level     info
    Daemon        off
    Parsers_File  parsers.conf

[INPUT]
    Name              tail
    Path              /var/log/containers/*.log
    Parser            docker
    Tag               kube.*
    Refresh_Interval  5

[FILTER]
    Name          kubernetes
    Match         kube.*
    Kube_URL      https://kubernetes.default.svc:443
    Kube_CA_File  /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    Kube_Token    /var/run/secrets/kubernetes.io/serviceaccount/token

[OUTPUT]
    Name            cloudwatch
    Match           *
    region          us-east-1
    log_group_name  /monkeytown/containers
    log_stream_prefix  monkeytown-
    auto_create_group   true
```

---

## 4. Alerting Configuration

### 4.1 Alert Severity Levels

| Severity | Definition | Response Time | Examples |
|----------|------------|---------------|----------|
| P1-CRITICAL | System down, no witnesses can connect | 15 minutes | Event stream crashed, all agents failing |
| P2-HIGH | Degraded service, partial functionality | 1 hour | High latency, single agent failing |
| P3-MEDIUM | Non-critical failure, workaround exists | 24 hours | Warning logs, degraded metrics |
| P4-LOW | Visual issues, cosmetic problems | Next sprint | CSS issues, minor glitches |

### 4.2 Alert Rules

```yaml
# alerts.yaml
groups:
  - name: monkeytown-critical
    rules:
      - alert: EventStreamDown
        expr: up{job="event-stream"} == 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Event stream is down"
          description: "Event stream has been unreachable for 5 minutes"
      
      - alert: NoAgentRuns
        expr: increase(agent_runs_total[1h]) == 0
        for: 7h
        labels:
          severity: critical
        annotations:
          summary: "No agent runs in 7 hours"
          description: "No agent workflows have executed in the last 7 hours"
      
      - alert: HighErrorRate
        expr: rate(http_request_errors_total[5m]) / rate(http_request_total[5m]) > 0.05
        for: 5m
        labels:
          severity: high
        annotations:
          summary: "Error rate exceeds 5%"
          description: "HTTP error rate is {{ $value | humanizePercentage }}"

  - name: monkeytown-warning
    rules:
      - alert: HighLatency
        expr: histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "p99 latency exceeds 1 second"
      
      - alert: BundleSizeGrowing
        expr: bundle_size_bytes > 250000
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Bundle size exceeds 250KB"
      
      - alert: LowWitnessCount
        expr: ws_connections_active < 5
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: "Less than 5 active witnesses for 1 hour"
```

### 4.3 Alert Routing

```yaml
# alertmanager.yml
route:
  group_by: ['alertname', 'severity']
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 4h
  receiver: 'default'
  routes:
    - match:
        severity: critical
      receiver: 'critical-pager'
      continue: true
    
    - match:
        severity: high
      receiver: 'high-slack'
    
    - match:
        severity: warning
      receiver: 'warning-slack'

receivers:
  - name: 'default'
    slack_configs:
      - channel: '#monkeytown-alerts'
        send_resolved: true
  
  - name: 'critical-pager'
    pagerduty_configs:
      - service_key: '{{ .Secrets.PAGERDUTY_KEY }}'
        severity: critical
  
  - name: 'high-slack'
    slack_configs:
      - channel: '#monkeytown-alerts-high'
        send_resolved: true
  
  - name: 'warning-slack'
    slack_configs:
      - channel: '#monkeytown-alerts-warning'
        send_resolved: true
```

---

## 5. Dashboards

### 5.1 System Overview Dashboard

```json
{
  "dashboard": {
    "title": "Monkeytown - System Overview",
    "panels": [
      {
        "title": "Active Witnesses",
        "type": "graph",
        "targets": [
          {"expr": "ws_connections_active"}
        ],
        "span": 6
      },
      {
        "title": "Event Rate",
        "type": "graph",
        "targets": [
          {"expr": "rate(events_published_total[5m])"}
        ],
        "span": 6
      },
      {
        "title": "Agent Run Success Rate",
        "type": "gauge",
        "targets": [
          {"expr": "rate(agent_runs_success[24h]) / rate(agent_runs_total[24h]) * 100"}
        ],
        "span": 4
      },
      {
        "title": "HTTP Error Rate",
        "type": "gauge",
        "targets": [
          {"expr": "rate(http_request_errors_total[5m]) / rate(http_request_total[5m]) * 100"}
        ],
        "span": 4
      },
      {
        "title": "p99 Latency",
        "type": "gauge",
        "targets": [
          {"expr": "histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))"}
        ],
        "span": 4
      }
    ]
  }
}
```

### 5.2 Agent Health Dashboard

```json
{
  "dashboard": {
    "title": "Monkeytown - Agent Health",
    "panels": [
      {
        "title": "Agent Runs by Type",
        "type": "table",
        "targets": [
          {"expr": "sum by (agent_type) (agent_runs_total)"}
        ]
      },
      {
        "title": "Agent Duration Distribution",
        "type": "heatmap",
        "targets": [
          {"expr": "histogram_quantile(0.5, rate(agent_run_duration_seconds_bucket[1h]))"}
        ]
      },
      {
        "title": "Workflow Failures",
        "type": "graph",
        "targets": [
          {"expr": "increase(workflow_failures_total[1h])"}
        ]
      }
    ]
  }
}
```

---

## 6. Distributed Tracing

### 6.1 Trace Propagation

Traces flow from witnesses through the system:

```
Witness Browser
      │
      ▼
Web App (generates trace_id)
      │
      ▼
Event Stream (propagates trace_id)
      │
      ▼
GitHub Actions (receives trace_id)
      │
      ▼
Agent Execution (includes trace_id in commits)
```

### 6.2 Trace Storage

| Component | Storage | Retention |
|-----------|---------|-----------|
| Web App | Tempo/Jaeger | 7 days |
| Event Stream | Tempo/Jaeger | 7 days |
| Agent Runtime | GitHub Actions logs | 90 days |

### 6.3 Trace Sampling

```yaml
# Sampling configuration
sampling:
  default: 0.01  # 1% sampling for normal traffic
  probabilistic: 0.1  # 10% sampling for debugging
  tail:  # Adaptive sampling for errors
    errors_only: true
    rate: 1.0  # 100% sampling for errors
```

---

## 7. Health Checks

### 7.1 Health Check Endpoints

| Endpoint | Service | Returns | Use Case |
|----------|---------|---------|----------|
| `/health` | All | `{ status: "healthy" | "degraded" | "down" }` | Kubernetes liveness |
| `/ready` | All | `{ ready: true | false }` | Kubernetes readiness |
| `/metrics` | All | Prometheus metrics | Monitoring scrape |
| `/version` | All | `{ version: string }` | Debugging |

### 7.2 Health Check Implementation

```typescript
// Health check response
interface HealthResponse {
  status: 'healthy' | 'degraded' | 'down';
  timestamp: string;
  version: string;
  checks: {
    [component: string]: {
      status: 'ok' | 'warning' | 'error';
      latency_ms: number;
      message?: string;
    };
  };
}

// Example: Event stream health check
app.get('/health', async (req, res) => {
  const checks = {
    redis: await checkRedis(),
    ws_connections: checkWebSocketConnections(),
    event_buffer: checkEventBuffer(),
  };
  
  const hasErrors = Object.values(checks).some(c => c.status === 'error');
  const hasWarnings = Object.values(checks).some(c => c.status === 'warning');
  
  res.json({
    status: hasErrors ? 'down' : hasWarnings ? 'degraded' : 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
    checks,
  });
});
```

---

## 8. On-Call Procedures

### 8.1 Alert Response

```
Alert received
      │
      ▼
Acknowledge alert (required within response time)
      │
      ▼
Investigate using dashboards and logs
      │
      ▼
┌─────┴─────┐
│           │
Resolve    Escalate
      │       │
      ▼       ▼
Document  P1: Page secondary on-call
in runbook  P2: Notify team channel
```

### 8.2 Runbook Integration

Alerts link to runbook entries:

| Alert | Runbook Section |
|-------|-----------------|
| EventStreamDown | `.monkeytown/devops/runbook.md#2-1-event-stream-failure` |
| NoAgentRuns | `.monkeytown/devops/runbook.md#2-2-agent-workflow-failure` |
| HighErrorRate | `.monkeytown/devops/runbook.md#2-3-deployment-failure` |

---

## 9. Cost Management

### 9.1 Monitoring Cost Allocation

| Service | Estimated Monthly Cost | Cost Center |
|---------|----------------------|-------------|
| CloudWatch Metrics | $50 | Infrastructure |
| CloudWatch Logs | $30 | Infrastructure |
| X-Ray Traces | $20 | Development |
| PagerDuty | $40 | Operations |
| Grafana Cloud | $0 (free tier) | Visualization |

### 9.2 Cost Optimization

- Downsample metrics after 7 days (retain only aggregates)
- Delete logs older than retention period automatically
- Use sampling for traces (1% default)
- Alert on monitoring cost anomalies

---

## 10. Cross-References

- **Architecture**: `.monkeytown/architecture/infrastructure.md` (service topology)
- **Architecture**: `.monkeytown/architecture/deployment-strategy.md` (deployment observability)
- **Architecture**: `.monkeytown/architecture/evolution-plan.md` (monitoring evolution)
- **Architecture**: `.monkeytown/architecture/network-security.md` (security monitoring)
- **Architecture**: `.monkeytown/architecture/system-design.md` (monitoring invariants)
- **DevOps**: `.monkeytown/devops/runbook.md` (emergency procedures)
- **DevOps**: `.monkeytown/devops/runbook.md#4-monitoring-reference` (monitoring reference)
- **Deploy**: `deploy/` (monitoring deployments)
- **Terraform**: `terraform/modules/monitoring/` (cloud monitoring resources)
- **Runbook**: `.monkeytown/devops/runbook.md` (on-call procedures)
- **Security**: `.monkeytown/security/audit-log.md` (security event logging)

---

*Document Version: 1.0.0*
*ChaosArchitect | Monkeytown Infrastructure*
