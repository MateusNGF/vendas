import { iDatabase, iDatabaseCached } from '../../infra/database/contracts';
import { LoggerProvider } from '../../infra/logger';
import { iApplication } from './app.interface';
import { iHttp } from 'src/infra/http/contracts/iHttp.interface';

export class AplicationDrive implements iApplication {

  constructor(
    private httpDriver : iHttp,
    private database: iDatabase,
    private memoryCache: iDatabaseCached,
  ){}

  async init(callback ?: Function): Promise<this> {

    await this.setupDatabase();
    await this.setupRoutes();

    callback && callback(this);
    return this
  }

  public async start(): Promise<void> {
    this.httpDriver.start(process.env.PORT, () => {
      LoggerProvider.info({ message : `STARTED : MODULE HTTP -> ${process.env.PORT}`});
    });
  }

  public async stop(): Promise<void> {
    this.httpDriver && this.httpDriver.stop();
    this.database && this.database.close();
  }

  private async setupDatabase() {
    if (this.database) {

      const observingAttemptsConnectionWithCached = observingAttempts('Try Connection with MemoryCache');
      try {

        await this.memoryCache.connect();

        // this.memoryCache.onError((...args : Array<any>) => {
        //   LoggerProvider.warn({ message : `MemoryCache error listing : ${args}`})
        // })

        LoggerProvider.info({ message : 'CONNECTED : MODULE MEMORYCACHE;'})
        
      } catch (e) {
        LoggerProvider.warn({ message : `NOT CONNECTED : MODULE MEMORYCACHE -> ${e.message}`})
      } finally {
        clearInterval(observingAttemptsConnectionWithCached);
      }

      

      const observerConnectionWithDatabase = observingAttempts('Try Connection with Database');
      try {

        await this.database.connect();
        LoggerProvider.info({ message : 'CONNECTED : MODULE DATABASE;'});

      } catch (e) {

        // we threw an error because the system doesn't work without the database
        throw new Error(`NOT CONNECT : MODULE DATABASE  -> ${e.message}`);

      } finally {
        clearInterval(observerConnectionWithDatabase);
      }
    }
  }

  private async setupRoutes(){
    return this.httpDriver.setupRoutes();
  }

}





function observingAttempts(message : string) {
  let time = 0
  return setInterval( () => {
    LoggerProvider.warn({ message : ` ${time}s : ${message}`});
    time++
  }, 1000)
}
