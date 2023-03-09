import { iDatabase } from "src/infra/database/contracts";

export interface iUsecase {
  exec(input: any, settings ?: iUsecase.Configuration): Promise<any>;
}


export namespace iUsecase {
  export interface  Configuration {
    session ?: iDatabase.iSession
  }
}
