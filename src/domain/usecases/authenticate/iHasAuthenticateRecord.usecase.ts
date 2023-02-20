import { iUsecase } from "src/domain/contracts";
import { AuthEntity } from "src/domain/entities/auth.entity";

export abstract class iHasAuthenticateRecord implements iUsecase {
    abstract exec(input : iHasAuthenticateRecord.Input) : Promise<iHasAuthenticateRecord.Output>
}


export namespace iHasAuthenticateRecord {
    export class Input implements Partial<AuthEntity> {
        public readonly email: string;
        public readonly password?: string;
    }

    export type Output = {
        token : string
    }
}