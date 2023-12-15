import { iDatabaseDriver } from "src/infra/database/contracts";

export interface iUsecase {
  exec(input: any, ...args: Array<any>): Promise<any>;
}


export namespace iUsecase {
  export interface Options {
    session?: iDatabaseDriver.iSessionManager
  }
}
