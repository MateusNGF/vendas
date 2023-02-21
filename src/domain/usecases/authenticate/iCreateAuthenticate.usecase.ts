import { iUsecase } from "src/domain/contracts";
import { AuthEntity } from "src/domain/entities/auth.entity";

export abstract class iCreateAuthentication implements iUsecase {
    abstract exec(input:iCreateAuthentication.Input) : Promise<iCreateAuthentication.Output>
}

export namespace iCreateAuthentication {
    export class Input implements Partial<AuthEntity> {
        public associeted_id: string;
        public email: string;
        public password: string;
    }

    export type Output = {
        id : string
    }
}