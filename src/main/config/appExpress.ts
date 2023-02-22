import { join } from 'path';
import { Server } from 'http';
import { readdirSync } from 'fs';
import express, { Express, json, Router } from 'express';

import { iDatabase } from '../../infra/database/contracts';
import { MongoDB } from '../../infra/database/mongodb';

class AppExpress {
  private app: Express = express();
  private server: Server | null = null;
  private database: iDatabase | null = null;

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
        this.app.use(`/${prefix_route}`, router);
      });
  }

  private setupMiddlewares(): void {
    this.app.use(json());
  }

  private async setupDatabase() {
    if (!this.database) {
      try {
        this.database = MongoDB;
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
