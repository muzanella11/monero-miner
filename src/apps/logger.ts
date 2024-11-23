export class Logger {
  /**
   * Logs info messages
   * @param message The message to log
   */
  public static info(message: string): void {
    console.log(`[INFO]: ${message}`);
  }

  /**
   * Logs warning messages
   * @param message The message to log
   */
  public static warn(message: string): void {
    console.warn(`[WARN]: ${message}`);
  }

  /**
   * Logs error messages
   * @param message The message to log
   */
  public static error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }
}
