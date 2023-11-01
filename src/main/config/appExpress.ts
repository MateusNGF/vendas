import { join } from 'path';
import { Server } from 'http';
import { readdirSync } from 'fs';
import express, { Express, Router } from 'express';
import bodyParser from 'body-parser'

import { iDatabase, iDatabaseCached } from '../../infra/database/contracts';
import { MongoDB } from '../../infra/database/mongodb';
import { RedisDB } from '../../infra/database/redis';
import { LoggerProvider } from '../../infra/logger';

class AppExpress {
  private app: Express = express();
  private server: Server | null = null;
  private database: iDatabase = null;
  private memoryCache: iDatabaseCached = null

  async init(): Promise<Express> {
    await this.setupDatabase();
    this.setupMiddlewares();
    this.setupRoutes();
    return this.app;
  }

  private setupRoutes(): void {
    readdirSync(join(__dirname, '../routes'))
      .filter((file) => !file.endsWith('.map'))
      .map(async (file) => {
        const router = Router();
        const prefix_route = file.split('.')[0];
        (await import(`../routes/${file}`)).default(router);

        router.stack.map((layer) => {
          LoggerProvider.info({message : this.makePathOverview(layer, prefix_route)});
        });

        this.app.use(`/${prefix_route}`, router);
      });
  }

  private makePathOverview(layer: any, prefix: string) {
    const method = Object.keys(layer.route.methods)[0];
    const path = layer.route.path;
    return `[${method.toUpperCase()}] ${process.env.SYSTEM_ADDRESS}:${process.env.PORT}/${prefix}${path}`;
  }

  private setupMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private async setupDatabase() {
    if (!this.database) {

      this.database = MongoDB
      this.memoryCache = RedisDB

      try {
        await this.memoryCache.connect();

        this.memoryCache.onError((...args : Array<any>) => {
          LoggerProvider.warn({ message : `MemoryCache error listing : ${args}`})
        })
        
      } catch (e) {
        LoggerProvider.warn({ message : `MemoryCache not started : ${e.message}`})
      }

      try {
        await this.database.connect();

        this.database.onError((...args : Array<any>) => {
          LoggerProvider.warn({ message : `Database Error Connection : ${args}`})
        })
      } catch (e) {
        throw new Error('Database not has configurated or database is down.');
      }
    }
  }

  public async start(): Promise<void> {
    this.server = this.app.listen(process.env.PORT, () => {
      LoggerProvider.info({ message : `Server Running at ${process.env.PORT}`});
    });
  }

  public async close(): Promise<void> {
    this.server && this.server.close();
    this.database && this.database.close();
  }
}

export default new AppExpress();
