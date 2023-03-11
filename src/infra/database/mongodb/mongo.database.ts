import { ClientSession, Collection, MongoClient, Db } from 'mongodb';
import { InternalError } from '../../../domain/errors';
import { iDatabase } from '../contracts';

class Mongo implements iDatabase {
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

  public createSession(): iDatabase.iSession {
    if (!this.client) throw new Error('No has connection with database.');
    return new MongoSession(this.client);
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

export const MongoDB = new Mongo();

class MongoSession implements iDatabase.iSession {

  private mongoSession: ClientSession = null;

  constructor(private readonly mongoClient : MongoClient) {}

  startTransaction(): void {
    if (!this.mongoSession) 
      throw new InternalError("Session not started.")

    this.mongoSession.startTransaction({
      maxTimeMS : 2000
    });
  }
  
  startSession(): iDatabase.iSession {
    if (!this.mongoClient)
      throw new InternalError("Client of session not sent.")

    this.mongoSession = this.mongoClient.startSession()
    return this
  }

  async endSession(): Promise<void> {
    if (this.mongoSession){
      await this.mongoSession.endSession();
      this.mongoSession = null;
    }
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
