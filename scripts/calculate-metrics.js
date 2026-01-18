#!/usr/bin/env node
/**
 * Metrics Calculation Script
 * Aggregates metrics and generates reports
 *
 * Usage: node scripts/calculate-metrics.js [--daily|--weekly]
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = 'metrics';
const DASHBOARDS_DIR = 'dashboards';

function loadSystemPulse() {
  const file = '.monkeytown/data/system-pulse.json';
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return null;
}

function loadAgentOutput() {
  const file = '.monkeytown/data/agent-output.json';
  if (fs.existsSync(file)) {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  }
  return null;
}

function calculateKPIs(pulse, agents) {
  const kpis = {
    timestamp: new Date().toISOString(),
    civilization_health: {},
    agent_performance: {},
    system_state: {}
  };

  // Agent Activity Rate (KPI-001)
  const totalAgents = 10;
  const activeAgents = Object.values(agents.agents || agents)
    .filter(a => a.files > 0 || a.decisions > 0).length;
  kpis.civilization_health.agent_activity_rate = {
    value: Math.round((activeAgents / totalAgents) * 100),
    target: 90,
    status: activeAgents >= 9 ? 'GREEN' : 'AMBER'
  };

  // Feature Completion Rate (KPI-002)
  const featuresBuilt = pulse?.code_status?.features_built?.length || 4;
  const featuresTotal = pulse?.code_status?.features_total || 8;
  kpis.civilization_health.feature_completion_rate = {
    value: Math.round((featuresBuilt / featuresTotal) * 100),
    target: 100,
    status: featuresBuilt >= 8 ? 'GREEN' : 'AMBER'
  };

  // System Load (KPI-005)
  const load = pulse?.metrics?.system_load || 0.90;
  kpis.system_state.system_load = {
    value: Math.round(load * 100),
    target: 80,
    status: load <= 0.80 ? 'GREEN' : load <= 0.90 ? 'AMBER' : 'RED'
  };

  // Security Posture (KPI-006)
  const securityFiles = agents.agents?.security?.files || 0;
  kpis.civilization_health.security_posture = {
    value: Math.round((securityFiles / 6) * 100), // 6 required files
    target: 100,
    status: securityFiles >= 6 ? 'GREEN' : securityFiles > 0 ? 'AMBER' : 'RED'
  };

  // Witness Readiness (KPI-008)
  kpis.civilization_health.witness_readiness = {
    value: 0,
    target: 100,
    status: 'RED',
    blockers: ['Security required before deployment']
  };

  // Agent Output Scores (KPI-009)
  kpis.agent_performance.scores = {};
  for (const [name, agent] of Object.entries(agents.agents || agents)) {
    const score = Math.min(
      1.0,
      (agent.files * 0.20) + (agent.decisions * 0.10) + (agent.cross_refs * 0.05)
    );
    kpis.agent_performance.scores[name] = {
      score: Math.round(score * 100) / 100,
      status: score >= 0.80 ? 'GREEN' : score >= 0.50 ? 'AMBER' : 'RED'
    };
  }

  // Cross-Reference Density (KPI-010)
  const totalRefs = Object.values(agents.agents || agents)
    .reduce((sum, a) => sum + (a.cross_refs || 0), 0);
  const density = totalRefs / activeAgents;
  kpis.agent_performance.cross_reference_density = {
    value: Math.round(density * 100) / 100,
    target: 5.0,
    status: density >= 5.0 ? 'GREEN' : density >= 3.0 ? 'AMBER' : 'RED'
  };

  return kpis;
}

function generateReport(kpis, type = 'daily') {
  const report = {
    type,
    generated_at: new Date().toISOString(),
    period: type === 'daily' ? 'Last 24 hours' : 'Last 7 days',
    kpis,
    summary: {
      green_count: 0,
      amber_count: 0,
      red_count: 0,
      overall_health: 'UNKNOWN'
    }
  };

  // Count status
  const allKPIs = [
    ...Object.values(kpis.civilization_health || {}),
    ...Object.values(kpis.system_state || {}),
    ...Object.values(kpis.agent_performance.scores || {})
  ];

  for (const kpi of allKPIs) {
    if (typeof kpi === 'object' && kpi.status) {
      if (kpi.status === 'GREEN') report.summary.green_count++;
      else if (kpi.status === 'AMBER') report.summary.amber_count++;
      else if (kpi.status === 'RED') report.summary.red_count++;
    }
  }

  // Overall health
  if (report.summary.red_count > 0) {
    report.summary.overall_health = 'CRITICAL';
  } else if (report.summary.amber_count > report.summary.green_count) {
    report.summary.overall_health = 'WARNING';
  } else {
    report.summary.overall_health = 'HEALTHY';
  }

  return report;
}

function main() {
  const args = process.argv.slice(2);
  const type = args.includes('--weekly') ? 'weekly' : 'daily';

  console.log(`Calculating ${type} metrics...`);

  const pulse = loadSystemPulse();
  const agents = loadAgentOutput();

  if (!pulse || !agents) {
    console.error('Error: Missing source data files');
    process.exit(1);
  }

  const kpis = calculateKPIs(pulse, agents);
  const report = generateReport(kpis, type);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write report
  const filename = type === 'daily' ? 'daily-report.json' : 'weekly-report.json';
  const filepath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(report, null, 2));
  console.log(`Written: ${filepath}`);

  // Print summary
  console.log('\n--- Metrics Summary ---');
  console.log(`Type: ${type}`);
  console.log(`Overall Health: ${report.summary.overall_health}`);
  console.log(`Green: ${report.summary.green_count}, Amber: ${report.summary.amber_count}, Red: ${report.summary.red_count}`);
}

main();
