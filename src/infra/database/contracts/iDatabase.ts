export abstract class iDatabase {
  abstract connect(): Promise<void>;
  abstract close(): Promise<void>;
  abstract createSession(): iDatabase.iSession;
  abstract getDatabase(): any;
}

export namespace iDatabase {
  export interface iSession {
    startTransaction(): void;
    commitTransaction(): Promise<void>;
    abortTransaction(): Promise<void>;
    endSession(): Promise<void>;
    get(): any;
  }
}

export abstract class iDatabaseCached<TypeMemmoryCached=any> {
  client: TypeMemmoryCached
  abstract connect(): Promise<void>
}

export namespace iDatabaseCached {
  export abstract class iManager {
    abstract get<type = any>(key: string): Promise<type>
    abstract set(key: string, data: any): Promise<void>
    abstract del(key: string): Promise<boolean>
  }

  export interface iConfiguration {
    context : string
  }
}
