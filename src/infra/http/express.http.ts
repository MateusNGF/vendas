import { join } from 'path';
import { Server } from 'http';
import { readdirSync } from 'fs';
import bodyParser from 'body-parser';
import express, { Express, Router } from 'express';

import { iHttpDriver } from './contracts/iHttp.interface';
import { iDriver } from '../contracts/driver.interface';

class ExpressHttpDriver implements iHttpDriver<Express> {
  readonly name: string = 'Express';

  private app: Express = express();
  private serverInstance: Server = null;

  constructor() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.preperCORS()
  }

  public async connect(config?: iDriver.ConnectionOptions): Promise<this> {
    this.serverInstance = this.app.listen(config?.port, config?.callback);
    return this;
  }

  public async disconnect(): Promise<void> {
    this.serverInstance && this.serverInstance.close();
  }

  public get() {
    return this;
  }

  onError(callback: (error: any) => void): void {
    this.serverInstance.once('error', callback);
    this.serverInstance.once('close', callback);
  }

  use(...args: Array<any>): void {
    this.app.use(...args);
  }

  async setupRoutes(pathRoutes: string = './routes'): Promise<void> {
    const pathToReadPaths = join(__dirname, pathRoutes);

    readdirSync(pathToReadPaths)
      .filter((file) => !file.endsWith('.map'))
      .map(async (file) => {
        const router = Router();
        const prefix_route = file.split('.')[0];
        (await import(`./routes/${file}`)).default(router);

        // router.stack.map((layer) => {
        //     LoggerProvider.info({ message: this.makePathOverview(layer, prefix_route) })
        // });

        this.app.use(`/${prefix_route}`, router);
      });
  }

  private preperCORS(){
    this.app.use((req, res, next) => {
      
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

      if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
      }

      next();
    });
  }

  private makePathOverview(layer: any, prefix: string) {
    const method = Object.keys(layer.route.methods)[0];
    const path = layer.route.path;
    return `[${method.toUpperCase()}] ${process.env.SYSTEM_ADDRESS}:${process.env.PORT}/${prefix}${path}`;
  }
}

export const HTTPDriver: iHttpDriver = new ExpressHttpDriver();
