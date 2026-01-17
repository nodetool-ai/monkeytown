import { EventEmitterServer } from './events/index.js';
import { CivilisationSimulation } from './simulation.js';
import { BananaLedger } from './economics/index.js';
import { StreamMessage, SystemMetrics } from '@monkeytown/shared/types';

const SIMULATION_INTERVAL_MS = 2000;
const EVENT_SERVER_PORT = 3001;

async function main(): Promise<void> {
  console.log('Starting Monkeytown Server...');

  const eventServer = new EventEmitterServer(EVENT_SERVER_PORT);
  eventServer.start();

  const simulation = new CivilisationSimulation();
  simulation.start(SIMULATION_INTERVAL_MS);

  const ledger = new BananaLedger();

  simulation.on('metrics_update', (metrics: unknown) => {
    const message: StreamMessage = {
      type: 'system_health',
      metrics: metrics as SystemMetrics,
      timestamp: Date.now(),
    };
    eventServer.broadcast(message);
  });

  simulation.on('entities_update', (entities: unknown) => {
    const message: StreamMessage = {
      type: 'entity_update',
      entity: entities,
      timestamp: Date.now(),
    };
    eventServer.broadcast(message);
  });

  simulation.on('flows_update', (flows: unknown) => {
    const message: StreamMessage = {
      type: 'flow_update',
      flow: flows,
      timestamp: Date.now(),
    };
    eventServer.broadcast(message);
  });

  simulation.on('entities_completed', (completed: unknown) => {
    const message: StreamMessage = {
      type: 'entity_update',
      entity: { completed, action: 'completed' },
      timestamp: Date.now(),
    };
    eventServer.broadcast(message);
  });

  simulation.on('flow_created', (flow: unknown) => {
    const message: StreamMessage = {
      type: 'flow_update',
      flow: { flow, action: 'created' },
      timestamp: Date.now(),
    };
    eventServer.broadcast(message);
  });

  ledger.on('event', (event: unknown) => {
    eventServer.broadcastBananaEvent(event);
  });

  console.log(`Event server running on port ${EVENT_SERVER_PORT}`);
  console.log(`Simulation running with ${SIMULATION_INTERVAL_MS}ms interval`);
  console.log('Server ready. Press Ctrl+C to stop.');

  process.on('SIGINT', () => {
    console.log('\nShutting down...');
    simulation.stop();
    eventServer.stop();
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\nShutting down...');
    simulation.stop();
    eventServer.stop();
    process.exit(0);
  });
}

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
