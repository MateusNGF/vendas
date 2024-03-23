import { ClientSession, Collection, MongoClient, Db } from 'mongodb';
import { iDatabaseDriver } from '../contracts';
import { iDriver } from 'src/infra/contracts/driver.interface';

class Mongo implements iDatabaseDriver<MongoClient> {
  readonly name: string = 'MongoDB';

  private client: MongoClient | null = null;
  private session: iDatabaseDriver.iSessionManager = null;

  async connect(config?: iDriver.ConnectionOptions): Promise<this> {
    if (!this.client) {
      this.client = await MongoClient.connect(config?.uri ?? (process.env.MONGO_URI as string));

      this.session = new MongoSession(this.client);
      config?.callback && config.callback();
    }

    return this;
  }

  public async disconnect(): Promise<void> {
    if (this.client) await this.client.close();
    this.client = null;
  }

  public get() {
    return this;
  }

  public onError(callback: (error: any) => void): void {
    this.client.once('close', callback);
    this.client.once('error', callback);
  }

  public getSession(): iDatabaseDriver.iSessionManager {
    if (!this.client) throw new Error('No has connection with database.');
    return this.session;
  }

  public colletion<Schema>(name: string): Collection<Schema> {
    if (!this.client) throw new Error('No has connection with database.');
    return this.client.db(process.env.MONGO_DATABASE as string).collection<Schema>(name);
  }

  public getDatabase(): Db {
    if (!this.client) throw new Error('No has connection with database.');
    return this.client.db(process.env.MONGO_DATABASE as string);
  }
}

export const DatabaseDriver: iDatabaseDriver = new Mongo();

class MongoSession implements iDatabaseDriver.iSessionManager {
  private mongoSession: ClientSession;

  constructor(private readonly client: MongoClient) {}

  startTransaction(): void {
    this.mongoSession.startTransaction({
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' },
      readPreference: 'primary',
    });
  }

  async createSession(): Promise<this> {
    try {
      if (!this.client) return;

      this.mongoSession = this.client.startSession();
      return this;
    } catch (e) {
      console.error(e);
      await this.endSession();
      throw e;
    }
  }

  async endSession(): Promise<void> {
    await this.mongoSession.endSession();
  }
  async commitTransaction(): Promise<void> {
    await this.mongoSession.commitTransaction();
  }
  async abortTransaction(): Promise<void> {
    await this.mongoSession.abortTransaction();
  }

  get() {
    return this.mongoSession;
  }
}
