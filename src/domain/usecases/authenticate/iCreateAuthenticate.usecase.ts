import { iUsecase } from "src/domain/contracts";
import { AuthEntity } from "src/domain/entities/auth.entity";

export abstract class iCreateAuthentication implements iUsecase {
    abstract exec(input:iCreateAuthentication.Input) : Promise<iCreateAuthentication.Output>
}

export namespace iCreateAuthentication {
    export class Input implements Partial<AuthEntity> {
        public readonly associeted_id: string;
        public readonly email: string;
        public readonly password: string;
    }

    export type Output = {
        token :string
    }
}