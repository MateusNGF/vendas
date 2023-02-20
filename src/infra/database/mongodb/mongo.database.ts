import { ClientSession, Collection, MongoClient, Db } from 'mongodb';
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

  public makeSession() : ClientSession {
    return this.client.startSession();
  }

  public colletion<Schema>(name: string): Collection<Schema> {
    if (!this.client) throw new Error('No has connection with database.');
    return this.client
      .db(process.env.MONGO_DATABASE as string)
      .collection<Schema>(name);
  }

  public getDatabase(): Db {
    if (!this.client) throw new Error('No has connection with database.');
    return this.client.db(process.env.MONGO_DATABASE as string)
  }
}

export const MongoDB = new Mongo();
