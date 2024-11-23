declare module 'eazyminer' {
  // Define the shape of the configuration object
  export interface Config {
    pools: {
      host: string;
      port: number;
      user: string;
      pass: string;
    }[];
    log?: boolean;
  }

  // Declare the default export function of eazyminer
  export default function EazyMiner(config: Config): {
    start: () => void;
    stop: () => void;
    on: (event: string, callback: (message: string) => void) => void;
  };
}
