import { iDriver } from '../../../infra/contracts/driver.interface';

export interface iHttpDriver<type_driver = any> extends iDriver<type_driver>, iDriver.iConnection {
  readonly name: string;

  use(...args: Array<any>): void;
  setupRoutes(pathRoutes?: string): Promise<void>;
}
