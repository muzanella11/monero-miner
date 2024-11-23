export class Config {
  public host: string;
  public port: number;
  public walletAddress: string;
  public password?: string;

  constructor(
    host: string,
    port: number,
    walletAddress: string,
    password?: string
  ) {
    this.host = host;
    this.port = port;
    this.walletAddress = walletAddress;
    this.password = password;
  }
}
