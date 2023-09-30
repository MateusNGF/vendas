import { join } from 'path';
import { Server } from 'http';
import { readdirSync } from 'fs';
import express, { Express, json, Router } from 'express';

import { iDatabase, iDatabaseCached } from '../../infra/database/contracts';
import { MongoDB } from '../../infra/database/mongodb';
import { RedisDB } from '../../infra/database/redis';

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
          console.log(this.makePathOverview(layer, prefix_route));
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
    this.app.use(json());
  }

  private async setupDatabase() {
    if (!this.database) {

      this.database = MongoDB
      this.memoryCache = RedisDB

      try {
        await this.memoryCache.connect();
      } catch (e) {
        console.error("MemoryCache not started : ", e.message)
      }

      try {
        await this.database.connect();
      } catch (e) {
        throw new Error('Database not has configurated or database is down.');
      }
    }
  }

  public async start(): Promise<void> {
    this.server = this.app.listen(process.env.PORT, () => {
      console.log(`Server Running at ${process.env.PORT}`);
    });
  }

  public async close(): Promise<void> {
    this.server && this.server.close();
    this.database && this.database.close();
  }
}

export default new AppExpress();
