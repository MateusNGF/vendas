import { ClientSession, Collection, MongoClient, Db } from 'mongodb';
import { iDatabaseDriver } from '../contracts';

class Mongo implements iDatabaseDriver {
  
  name: string = 'MongoDB';

  private client: MongoClient | null = null;

  public async connect(): Promise<void> {
    if (!this.client) {
      this.client = await MongoClient.connect(process.env.MONGO_URI as string);
    }
  }

  public async close(): Promise<void> {
    if (this.client) await this.client.close();
    this.client = null;
  }

  public createSession(): iDatabaseDriver.iSession {
    if (!this.client) throw new Error('No has connection with database.');
    return new MongoSession(this.client.startSession());
  }

  public colletion<Schema>(name: string): Collection<Schema> {
    if (!this.client) throw new Error('No has connection with database.');
    return this.client
      .db(process.env.MONGO_DATABASE as string)
      .collection<Schema>(name);
  }

  public getDatabase(): Db {
    if (!this.client) throw new Error('No has connection with database.');
    return this.client.db(process.env.MONGO_DATABASE as string);
  }
}

export const DatabaseDriver : iDatabaseDriver = new Mongo();

class MongoSession implements iDatabaseDriver.iSession {
  constructor(private readonly mongoSession: ClientSession) {}
  startTransaction(): void {
    this.mongoSession.startTransaction();
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
