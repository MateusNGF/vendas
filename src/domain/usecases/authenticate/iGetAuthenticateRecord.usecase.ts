import { iUsecase } from "src/domain/contracts";
import { AuthEntity } from "src/domain/entities/auth.entity";

export abstract class iGetAuthenticateRecordUsecase  implements iUsecase {
    abstract exec(input : iGetAuthenticateRecordUsecase .Input) : Promise<iGetAuthenticateRecordUsecase .Output>
}


export namespace iGetAuthenticateRecordUsecase  {
    export class Input implements Partial<AuthEntity> {
        public id?: any;
        public email?: string;
        public associeted_id?: string;
    }

    export type Output = AuthEntity
}