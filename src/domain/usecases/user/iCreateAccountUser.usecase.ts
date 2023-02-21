import { iUsecase } from "src/domain/contracts";
import { AuthEntity, UserEntity } from "src/domain/entities";

export abstract class iCreateAccountUser implements iUsecase {
    abstract exec(input: iCreateAccountUser.Input): Promise<iCreateAccountUser.Output>
}


export namespace iCreateAccountUser {
    export class Input implements UserEntity, Partial<AuthEntity>{
        public name: string;
        public email: string;
        public password: string;
    }


    // token
    export type Output = string
}