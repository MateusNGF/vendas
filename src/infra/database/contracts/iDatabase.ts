export abstract class iDatabase {
  abstract connect(): Promise<void>;
  abstract close(): Promise<void>;
  abstract createSession() : iDatabase.iSession
  abstract getDatabase() : any
}


export namespace iDatabase {
  export interface iSession {
     startTransaction() : void
     commitTransaction() : Promise<void>
     abortTransaction() : Promise<void>
     endSession() : Promise<void>
     get() : any
  }
}
