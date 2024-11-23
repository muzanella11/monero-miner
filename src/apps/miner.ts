import WebSocket from 'ws';
import { Config } from './config';
import { Logger } from './logger';

/**
 * Class to handle the miner's interactions with the pool
 */
export class Miner {
  private ws: WebSocket;
  private poolConfig: Config;

  constructor(poolConfig: Config) {
    this.poolConfig = poolConfig;
    // Initialize WebSocket connection
    this.ws = this.createWebSocketConnection();
  }

  /**
   * Creates a new WebSocket connection to the pool
   */
  private createWebSocketConnection(): WebSocket {
    const ws = new WebSocket(`ws://${this.poolConfig.host}:${this.poolConfig.port}`);
    ws.on('open', this.onOpen.bind(this));
    ws.on('message', this.onMessage.bind(this));
    ws.on('error', this.onError.bind(this));
    ws.on('close', this.onClose.bind(this));

    return ws;
  }

  /**
   * Called when WebSocket connection is established
   */
  private onOpen(): void {
    Logger.info('Connected to mining pool.');
    this.authenticate();
  }

  /**
   * Sends authentication request to the pool
   */
  private authenticate(): void {
    const authRequest = {
      id: 1,
      jsonrpc: '2.0',
      method: 'login',
      params: {
        login: this.poolConfig.walletAddress,
        pass: this.poolConfig.password || 'x',
        agent: 'MyMiner/1.0',
      },
    };

    Logger.info('Authenticating with pool...');
    this.ws.send(JSON.stringify(authRequest));
  }

  /**
   * Handles the received messages from the pool
   * @param data The received data from the pool
   */
  private onMessage(data: WebSocket.Data): void {
    const message = JSON.parse(data.toString());
    Logger.info(`Received message: ${JSON.stringify(message)}`);

    if (message.method === 'job') {
      Logger.info('Received mining job');
      this.submitWork(message.params);
    }
  }

  /**
   * Simulates the process of submitting mining results back to the pool
   * @param job The mining job
   */
  private submitWork(job: any): void {
    Logger.info('Simulating work submission');
    const result = {
      id: job.id,
      jsonrpc: '2.0',
      method: 'submit',
      params: {
        job_id: job.job_id,
        nonce: '0000000000000000', // Placeholder nonce
        result: 'dummy_result',  // Placeholder result
      },
    };

    this.ws.send(JSON.stringify(result));
  }

  /**
   * Called when there's an error with the WebSocket
   * @param error The error object
   */
  private onError(error: Error): void {
    Logger.error(`WebSocket error: ${error.message}`);
  }

  /**
   * Called when the WebSocket connection is closed
   */
  private onClose(): void {
    Logger.warn('Connection closed. Reconnecting...');
    setTimeout(() => {
      this.ws = this.createWebSocketConnection();  // Recreate the WebSocket
    }, 5000);  // Attempt to reconnect
  }

  /**
   * Starts the miner by creating a WebSocket connection
   */
  public start(): void {
    Logger.info('Starting the miner...');
    // WebSocket is already connected on initialization
  }

  /**
   * Stops the miner by closing the WebSocket connection
   */
  public stop(): void {
    this.ws.close();
    Logger.info('Miner stopped.');
  }
}
