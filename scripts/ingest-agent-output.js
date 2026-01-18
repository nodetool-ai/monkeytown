#!/usr/bin/env node
/**
 * Agent Output Ingestion Script
 * ETL process to ingest agent output data into metrics pipeline
 *
 * Usage: node scripts/ingest-agent-output.js
 *
 * Reads: .monkeytown/data/agent-output.json
 * Writes: metrics/agent-output.csv, metrics/agent-stats.json
 */

const fs = require('fs');
const path = require('path');

const SOURCE_FILE = '.monkeytown/data/agent-output.json';
const OUTPUT_DIR = 'metrics';

function loadAgentOutput() {
  const data = fs.readFileSync(SOURCE_FILE, 'utf8');
  return JSON.parse(data);
}

function calculateOutputScore(agent) {
  // Formula: min(1.0, (files × 0.2) + (decisions × 0.1) + (cross_refs × 0.05))
  const score = Math.min(
    1.0,
    (agent.files * 0.20) + (agent.decisions * 0.10) + (agent.cross_refs * 0.05)
  );
  return Math.round(score * 100) / 100;
}

function getStatus(score) {
  if (score >= 0.80) return 'GREEN';
  if (score >= 0.50) return 'AMBER';
  return 'RED';
}

function generateStats(data) {
  const stats = {
    timestamp: new Date().toISOString(),
    summary: {
      active_domains: 0,
      inactive_domains: 0,
      total_files: 0,
      total_decisions: 0,
      total_cross_refs: 0,
      avg_output_score: 0,
      missing_domain: null
    },
    agents: [],
    critical_gaps: []
  };

  const agentList = Object.entries(data.agents || data);
  let totalScore = 0;
  let agentCount = 0;

  for (const [name, agent] of agentList) {
    const score = calculateOutputScore(agent);
    agentCount++;
    totalScore += score;

    stats.agents.push({
      name,
      files: agent.files,
      decisions: agent.decisions,
      cross_refs: agent.cross_refs,
      output_score: score,
      status: agent.status || getStatus(score)
    });

    if (agent.files > 0 || agent.decisions > 0 || agent.cross_refs > 0) {
      stats.summary.active_domains++;
    } else {
      stats.summary.inactive_domains++;
      stats.summary.missing_domain = name;
    }

    stats.summary.total_files += agent.files;
    stats.summary.total_decisions += agent.decisions;
    stats.summary.total_cross_refs += agent.cross_refs;
  }

  stats.summary.avg_output_score = Math.round((totalScore / agentCount) * 100) / 100;

  if (stats.summary.missing_domain === 'security') {
    stats.critical_gaps.push({
      domain: 'security',
      impact: 'CRITICAL',
      description: 'No threat model, trust model, or defenses defined',
      action: 'JungleSecurity must produce output'
    });
  }

  return stats;
}

function generateCSV(stats) {
  const headers = ['Agent', 'Files', 'Decisions', 'Cross-Refs', 'Output Score', 'Status'];
  const rows = stats.agents.map(a => [
    a.name,
    a.files,
    a.decisions,
    a.cross_refs,
    a.output_score,
    a.status
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(r => r.join(','))
  ].join('\n');

  return csv;
}

function main() {
  console.log('Ingesting agent output data...');

  const data = loadAgentOutput();
  const stats = generateStats(data);

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write JSON stats
  const jsonPath = path.join(OUTPUT_DIR, 'agent-stats.json');
  fs.writeFileSync(jsonPath, JSON.stringify(stats, null, 2));
  console.log(`Written: ${jsonPath}`);

  // Write CSV
  const csvPath = path.join(OUTPUT_DIR, 'agent-output.csv');
  fs.writeFileSync(csvPath, generateCSV(stats));
  console.log(`Written: ${csvPath}`);

  // Print summary
  console.log('\n--- Agent Output Summary ---');
  console.log(`Active Domains: ${stats.summary.active_domains}`);
  console.log(`Inactive Domains: ${stats.summary.inactive_domains}`);
  console.log(`Total Files: ${stats.summary.total_files}`);
  console.log(`Total Decisions: ${stats.summary.total_decisions}`);
  console.log(`Total Cross-Refs: ${stats.summary.total_cross_refs}`);
  console.log(`Avg Output Score: ${stats.summary.avg_output_score}`);

  if (stats.critical_gaps.length > 0) {
    console.log('\n--- Critical Gaps ---');
    for (const gap of stats.critical_gaps) {
      console.log(`[${gap.impact}] ${gap.domain}: ${gap.description}`);
    }
  }
}

main();
