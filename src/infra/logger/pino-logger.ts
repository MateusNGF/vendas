import { iLoggerDriver } from './contracts/iLogger';
import pino from 'pino';

class PinoLoggerDriver implements iLoggerDriver<pino.Logger> {
  readonly name: string = 'Pino';

  private readonly engine = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'pid,hostname',
      },
    },
  });

  constructor() {}

  info(content: iLoggerDriver.Content): void {
    this.engine.info(content.message, content);
  }
  error(content: iLoggerDriver.Content): void {
    this.engine.error(content.message, content);
  }
  warn(content: iLoggerDriver.Content): void {
    this.engine.warn(content.message, content);
  }
  get() {
    return this;
  }
}

export const LoggerProvider: iLoggerDriver = new PinoLoggerDriver();
