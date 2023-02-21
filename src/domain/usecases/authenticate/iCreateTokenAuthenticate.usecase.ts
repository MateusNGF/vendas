import { iEntity, iUsecase } from "src/domain/contracts";
import { AuthEntity } from "src/domain/entities/auth.entity";

export abstract class iCreateTokenAuthenticate implements iUsecase {
    abstract exec(input : iCreateTokenAuthenticate.Input): Promise<iCreateTokenAuthenticate.Output>
}

export namespace iCreateTokenAuthenticate {
    export class Input implements Partial<AuthEntity> {
        public id?: any;
        public associeted_id?: any;
        public email?: any;
        public password?: any;
    }

    export type Output = string
}



