
import { join } from 'path';
import { Server } from 'http';
import { readdirSync } from 'fs';
import express, { Express, json, Router } from 'express';

class ExpressApp {
  private app: Express = express();
  private server: Server = null;
  private database: any = null;

  async init(): Promise<Express> {
    this.setupMiddlewares();
    this.setupRoutes();
    return this.app;
  }

  private setupRoutes(router: Router = Router()): void {
    readdirSync(join(__dirname, '../routes'))
      .filter((file) => !file.endsWith('.map'))
      .map(async (file) => {
        const prefix_route = file.split('.')[0];
        (await import(`../routes/${file}`)).default(router);
        this.app.use(`/api/${prefix_route}`, router);
      });
  }

  private setupMiddlewares(): void {
    this.app.use(json());
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

export default new ExpressApp();