import { iUsecase } from "src/domain/contracts";
import { AuthEntity } from "src/domain/entities/auth.entity";

export abstract class iGetAuthenticateRecord  implements iUsecase {
    abstract exec(input : iGetAuthenticateRecord .Input) : Promise<iGetAuthenticateRecord .Output>
}


export namespace iGetAuthenticateRecord  {
    export class Input implements Partial<AuthEntity> {
        public id?: any;
        public email?: string;
        public associeted_id?: string;
    }

    export type Output = AuthEntity
}