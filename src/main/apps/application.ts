import { iQueueDriver } from 'src/infra/queue/contracts/iQueue';
import {
  iDatabaseDriver,
  iMemoryCachedDriver,
} from '../../infra/database/contracts';
import { LoggerProvider } from '../../infra/logger';
import { iApplication } from './app.interface';
import { iHttpDriver } from 'src/infra/http/contracts/iHttp.interface';

export class AplicationDrive implements iApplication {
  constructor(
    private HTTPDriver: iHttpDriver,
    private DatabaseDriver: iDatabaseDriver,
    private MemoryCacheDriver: iMemoryCachedDriver,
    private QueueDriver: iQueueDriver
  ) {}

  async start(callback?: Function): Promise<void> {
    await Promise.all([this.startDatabase(), this.startQueue()]);

    await this.startHTTP();

    callback && callback(this);
  }

  public async stop(): Promise<void> {
    await Promise.all([
      this.HTTPDriver && this.HTTPDriver.disconnect(),
      this.DatabaseDriver && this.DatabaseDriver.disconnect(),
      this.QueueDriver && this.QueueDriver.disconnect(),
      this.MemoryCacheDriver && this.MemoryCacheDriver.disconnect(),
    ]);
  }

  private async startQueue() {
    if (this.QueueDriver) {
      const module_name = `MODULE QUEUE SERVICE (${this.QueueDriver.name})`;
      const observingAttemptsConnectionWithQueueService = observingAttempts(
        `Try Connection with ${module_name.toLowerCase()}`
      );
      try {
        await this.QueueDriver.connect({
          callback: () => {
            LoggerProvider.info({ message: `CONNECTED : ${module_name};` });
          },
        });

        this.QueueDriver.onError((error) => {
          LoggerProvider.error({
            message: ` ${module_name} : ${error.message}`,
          });
        });
      } catch (e) {
        // we threw an error because the system doesn't work without the queue service
        LoggerProvider.error({
          message: `NOT CONNECT : ${module_name}  -> ${e.message}`,
        });
      } finally {
        clearInterval(observingAttemptsConnectionWithQueueService);
      }
    }
  }

  private async startDatabase() {
    if (this.MemoryCacheDriver) {
      const module_name = `MODULE MEMORYCACHE (${this.MemoryCacheDriver.name})`;
      const observingAttemptsConnectionWithCached = observingAttempts(
        `Try Connection with ${module_name.toLocaleLowerCase()}`
      );
      try {
        await this.MemoryCacheDriver.connect({
          callback: () => {
            LoggerProvider.info({ message: `CONNECTED : ${module_name};` });
          },
        });

        this.MemoryCacheDriver.onError((error) => {
          LoggerProvider.error({
            message: ` ${module_name} : ${error.message}`,
          });
        });
      } catch (e) {
        LoggerProvider.warn({
          message: `NOT CONNECTED : ${module_name} -> ${e.message}`,
        });
      } finally {
        clearInterval(observingAttemptsConnectionWithCached);
      }
    }

    if (this.DatabaseDriver) {
      const module_name = `MODULE DATABASE (${this.DatabaseDriver.name})`;
      const observerConnectionWithDatabase = observingAttempts(
        `Try Connection with ${module_name.toLocaleLowerCase()}`
      );
      try {
        await this.DatabaseDriver.connect({
          callback: () => {
            LoggerProvider.info({ message: `CONNECTED : ${module_name};` });
          },
        });

        this.DatabaseDriver.onError((error) => {
          LoggerProvider.error({
            message: ` ${module_name} : ${error.message}`,
          });
        });
      } catch (e) {
        // we threw an error because the system doesn't work without the database
        throw new Error(`NOT CONNECT : ${module_name}  -> ${e.message}`);
      } finally {
        clearInterval(observerConnectionWithDatabase);
      }
    }
  }

  private async startHTTP() {
    await this.HTTPDriver.setupRoutes();

    this.HTTPDriver.connect({
      port: process.env.PORT,
      callback: () => {
        const module_name = `MODULE HTTP (${this.HTTPDriver.name})`;
        LoggerProvider.info({
          message: `CONNECTED : ${module_name}::${process.env.PORT};`,
        });
      },
    });
  }
}

function observingAttempts(message: string) {
  let time = 0;
  return setInterval(() => {
    LoggerProvider.warn({ message: ` ${time}s : ${message}` });
    time++;
  }, 1000);
}
