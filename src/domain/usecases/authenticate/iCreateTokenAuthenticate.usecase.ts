import { iEntity, iUsecase } from "src/domain/contracts";

export abstract class iCreateTokenAuthenticate implements iUsecase {
    abstract exec(input : iCreateTokenAuthenticate.Input): Promise<iCreateTokenAuthenticate.Output>
}

export namespace iCreateTokenAuthenticate {
    export type Input = {
        id ?: string
        associeted_id : string,
    }

    export type Output = string
}



