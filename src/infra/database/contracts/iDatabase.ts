import { iDriver } from '../../../infra/contracts/driver.interface';

export interface iDatabaseDriver<type_driver = any>
  extends iDriver<type_driver>,
    iDriver.iConnection {
  readonly name: string;

  getSession(): iDatabaseDriver.iSessionManager;
  getDatabase(): any;
}

export namespace iDatabaseDriver {
  export interface iSessionManager {
    startTransaction(): void;
    commitTransaction(): Promise<void>;
    abortTransaction(): Promise<void>;
    createSession(): Promise<this>;
    endSession(): Promise<void>;
    get(): any;
  }
}

export interface iMemoryCachedDriver<TypeMemmoryCached = any>
  extends iDriver,
    iDriver.iConnection {
  readonly name: string;

  client: TypeMemmoryCached;
}

export namespace iMemoryCachedDriver {
  export abstract class iManager {
    abstract get<type = any>(key: string): Promise<type>;
    abstract set(key: string, data: any): Promise<void>;
    abstract del(key: string): Promise<boolean>;
  }

  export interface iConfiguration {
    context: string;
  }
}
