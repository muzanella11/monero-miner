// src/index.ts
import { Config } from './apps/config';
import { Miner } from './apps/miner';

// Pool configuration (replace with actual values)
const poolConfig = new Config(
  'xmr.pool.minergate.com', // Host
  3333,                     // Port
  'YOUR_WALLET_ADDRESS',    // Your wallet address
  'x'                       // Password (optional)
);

// Create the miner and start it
const miner = new Miner(poolConfig);

// Start the miner
miner.start();

// Listen for Ctrl+C (SIGINT) to handle stopping the miner
process.on('SIGINT', () => {
  console.clear();
  console.log('Stopping miner...');
  miner.stop();  // Gracefully stop the miner
  process.exit(0);  // Exit the process cleanly
});
