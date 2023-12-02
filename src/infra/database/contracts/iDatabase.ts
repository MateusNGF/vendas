import { iDriver } from "../../../infra/contracts/driver.interface";

export abstract class iDatabaseDriver implements iDriver {

  readonly name: string

  abstract connect(): Promise<void>;
  abstract close(): Promise<void>;
  abstract getSession(): iDatabaseDriver.iSessionManager;
  abstract getDatabase(): any;
}

export namespace iDatabaseDriver {
  export interface iSessionManager {
    startTransaction(): void;
    commitTransaction(): Promise<void>;
    abortTransaction(): Promise<void>;
    createSession() : Promise<this>;
    endSession(): Promise<void>;
    get(): any;
  }
}

export abstract class iMemoryCachedDriver<TypeMemmoryCached=any> implements iDriver {
  
  readonly name : string

  client: TypeMemmoryCached
  abstract connect(): Promise<void>
  abstract onError(callback : (error : any) => void) : Promise<void>
}

export namespace iMemoryCachedDriver {
  export abstract class iManager {
    abstract get<type = any>(key: string): Promise<type>
    abstract set(key: string, data: any): Promise<void>
    abstract del(key: string): Promise<boolean>
  }

  export interface iConfiguration {
    context : string
  }
}
